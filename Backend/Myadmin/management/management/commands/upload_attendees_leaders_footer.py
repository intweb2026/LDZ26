"""
Parse 2 sections from the mapping Google Doc and upload to DB:

  Event Leaders        -> eventLeaders      (leaderName, leaderLogo from Drive)
  Event Past Attendees -> eventPastAttandees (pastAttandeeName, pastAttandeeLogo from Drive)

Drive subfolders:
  LDZ-26 Meet The Leaders  -> leaderLogo       (filename = leaderName)
  LDZ-26 Past Attendees    -> pastAttandeeLogo (filename = pastAttandeeName)

Usage:
    python manage.py upload_attendees_leaders_footer
    python manage.py upload_attendees_leaders_footer --dry-run
    python manage.py upload_attendees_leaders_footer --base-url http://127.0.0.1:8000
"""

import os
import re
import tempfile
import urllib.request

import requests as http_requests
from bs4 import BeautifulSoup
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from Event.models import eventLeaders, eventPastAttandees

from ._drive_utils import build_drive_service, download_drive_file, list_drive_folder

DOC_URL = (
    "https://docs.google.com/document/d/"
    "12qxtOc-npzjKFnOK29WOT4doDhNR5C5GLf27IpaQWRE/export?format=html"
)
DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/17JrbWlrsZlFfkMCMiIj_CkzGDuwDZTw5"

DEFAULT_EVENT_CODE      = "LDZ-26"
LEADERS_SUBFOLDER_TPL   = "{code} Meet The Leaders"
ATTENDEES_SUBFOLDER_TPL = "{code} Past Attendees"
DEFAULT_SA_PATH         = r"D:\GCC Data\service_account.json"

# ── Helpers ────────────────────────────────────────────────────────────────────

def _clean(text: str) -> str:
    return re.sub(r"[^\x20-\x7E]", "", text).strip()


def _normalise(name: str) -> str:
    return re.sub(r"\s+", " ", name).strip().lower()


def _upload_file(file_path: str, upload_api_url: str) -> str:
    with open(file_path, "rb") as fh:
        resp = http_requests.post(
            upload_api_url,
            files={"media": (os.path.basename(file_path), fh)},
            timeout=60,
        )
    resp.raise_for_status()
    return resp.json()["uploadedURL"]


def _get_or_upload(filename: str, source_dir: str, base_url: str, upload_api: str, dry_run: bool):
    media_root = settings.MEDIA_ROOT
    media_url  = settings.MEDIA_URL.rstrip("/")
    media_name = f"media{filename}"
    media_path = os.path.join(media_root, media_name)

    if os.path.exists(media_path):
        return f"{base_url}{media_url}/{media_name}", "existing"

    src_path = os.path.join(source_dir, filename)
    if not os.path.exists(src_path):
        return None, None

    if dry_run:
        return f"{base_url}{media_url}/{media_name}", "dry-run"

    url = _upload_file(src_path, upload_api)
    return url, "uploaded"


def _find_file_for_name(name: str, source_dir: str):
    """Find a file in source_dir whose stem matches name (case-insensitive)."""
    target = _normalise(name)
    for fname in os.listdir(source_dir):
        if not os.path.isfile(os.path.join(source_dir, fname)):
            continue
        stem = _normalise(os.path.splitext(fname)[0])
        if stem == target:
            return fname
    return None


# ── Doc parsers ────────────────────────────────────────────────────────────────

def _parse_name_list(soup: BeautifulSoup, section_keyword: str) -> list:
    """Find the h5 whose text contains section_keyword, return li text list."""
    for h in soup.find_all("h5"):
        if section_keyword.lower() in _clean(h.get_text(strip=True)).lower():
            ol = h.find_next_sibling("ol")
            if ol:
                return [_clean(li.get_text(strip=True)) for li in ol.find_all("li") if _clean(li.get_text(strip=True))]
    return []


# ── Management command ─────────────────────────────────────────────────────────

class Command(BaseCommand):
    help = "Upload Event Leaders, Past Attendees and Footer Options from doc + Drive"

    def add_arguments(self, parser):
        parser.add_argument("--doc-url",         default=DOC_URL)
        parser.add_argument("--drive-folder",   default=DRIVE_FOLDER_URL)
        parser.add_argument("--base-url",       default="http://127.0.0.1:8000")
        parser.add_argument("--event-code",     default=DEFAULT_EVENT_CODE,
                            help="Event code prefix for Drive subfolder names (e.g. LDZ-26)")
        parser.add_argument("--service-account", default=DEFAULT_SA_PATH,
                            help="Path to Google service account JSON key file")
        parser.add_argument("--dry-run",        action="store_true")

    def handle(self, *args, **options):
        dry_run           = options["dry_run"]
        base_url          = options["base_url"].rstrip("/")
        upload_api        = f"{base_url}/admin1/upload"
        code              = options["event_code"]
        leaders_subfolder  = LEADERS_SUBFOLDER_TPL.format(code=code)
        attendees_subfolder = ATTENDEES_SUBFOLDER_TPL.format(code=code)

        if dry_run:
            self.stdout.write(self.style.WARNING("DRY RUN — no DB writes or API calls\n"))

        # ── Fetch & parse doc ─────────────────────────────────────────────────
        self.stdout.write("Downloading doc...")
        try:
            with urllib.request.urlopen(options["doc_url"]) as r:
                html = r.read().decode("utf-8")
        except Exception as exc:
            raise CommandError(f"Could not fetch doc: {exc}") from exc

        soup = BeautifulSoup(html, "html.parser")

        leader_names   = _parse_name_list(soup, "Event Leaders")
        attendee_names = _parse_name_list(soup, "Event Past Attendees")
        self.stdout.write(f"  Leaders: {len(leader_names)}, Past Attendees: {len(attendee_names)}")

        # ── Download Drive subfolders ─────────────────────────────────────────
        _tmpdir = tempfile.mkdtemp(prefix="ldz_alf_")
        leaders_dir   = os.path.join(_tmpdir, "leaders")
        attendees_dir = os.path.join(_tmpdir, "attendees")
        os.makedirs(leaders_dir,   exist_ok=True)
        os.makedirs(attendees_dir, exist_ok=True)

        self.stdout.write("Listing Drive folder...")
        try:
            service   = build_drive_service(options["service_account"])
            file_list = list_drive_folder(service, options["drive_folder"])
        except Exception as exc:
            raise CommandError(f"Drive listing failed: {exc}") from exc

        self.stdout.write(f"  {len(file_list)} total items found")

        for item in file_list:
            subfolder = os.path.dirname(item.path).strip("\\/")
            basename  = os.path.basename(item.path)

            if subfolder == leaders_subfolder:
                out_path = os.path.join(leaders_dir, basename)
            elif subfolder == attendees_subfolder:
                out_path = os.path.join(attendees_dir, basename)
            else:
                continue

            if os.path.exists(out_path):
                continue
            try:
                self.stdout.write(f"  Downloading [{subfolder}] {basename}...")
                download_drive_file(service, item.id, out_path)
            except Exception as exc:
                self.stdout.write(self.style.WARNING(f"    Warning: {exc}"))

        # ── Upload sections ───────────────────────────────────────────────────
        self._upload_leaders(leader_names,   leaders_dir,   base_url, upload_api, dry_run)
        self._upload_attendees(attendee_names, attendees_dir, base_url, upload_api, dry_run)

        self.stdout.write(self.style.SUCCESS("\nAll done."))

    # ── Event Leaders ─────────────────────────────────────────────────────────

    def _upload_leaders(self, names, source_dir, base_url, upload_api, dry_run):
        self.stdout.write(f"\n--- Event Leaders ({len(names)}) ---")
        created = updated = no_file = 0

        for name in names:
            self.stdout.write(f"\n  {name}")
            filename = _find_file_for_name(name, source_dir)
            if not filename:
                self.stdout.write(self.style.WARNING("    image: NOT FOUND in Drive folder"))
                no_file += 1
                logo_url = None
            else:
                logo_url, tag = _get_or_upload(filename, source_dir, base_url, upload_api, dry_run)
                self.stdout.write(f"    image ({tag}): ...{(logo_url or '')[-70:]}")

            if dry_run:
                continue

            obj, was_created = eventLeaders.objects.get_or_create(
                leaderName=name,
                isDelete="No",
                defaults={"created_by": "Admin", "updated_by": "Admin"},
            )
            if logo_url:
                obj.leaderLogo = logo_url
            obj.updated_by = "Admin"
            obj.save()
            tag = "[created]" if was_created else "[updated]"
            self.stdout.write(self.style.SUCCESS(f"    {tag}"))
            if was_created:
                created += 1
            else:
                updated += 1

        self.stdout.write(self.style.SUCCESS(
            f"\nLeaders: {created} created, {updated} updated, {no_file} no image."
        ))

    # ── Past Attendees ────────────────────────────────────────────────────────

    def _upload_attendees(self, names, source_dir, base_url, upload_api, dry_run):
        self.stdout.write(f"\n--- Event Past Attendees ({len(names)}) ---")
        created = updated = no_file = 0

        for name in names:
            self.stdout.write(f"\n  {name}")
            filename = _find_file_for_name(name, source_dir)
            if not filename:
                self.stdout.write(self.style.WARNING("    image: NOT FOUND in Drive folder"))
                no_file += 1
                logo_url = None
            else:
                logo_url, tag = _get_or_upload(filename, source_dir, base_url, upload_api, dry_run)
                self.stdout.write(f"    image ({tag}): ...{(logo_url or '')[-70:]}")

            if dry_run:
                continue

            obj, was_created = eventPastAttandees.objects.get_or_create(
                pastAttandeeName=name,
                isDelete="No",
                defaults={"created_by": "Admin", "updated_by": "Admin"},
            )
            if logo_url:
                obj.pastAttandeeLogo = logo_url
            obj.updated_by = "Admin"
            obj.save()
            tag = "[created]" if was_created else "[updated]"
            self.stdout.write(self.style.SUCCESS(f"    {tag}"))
            if was_created:
                created += 1
            else:
                updated += 1

        self.stdout.write(self.style.SUCCESS(
            f"\nPast Attendees: {created} created, {updated} updated, {no_file} no image."
        ))

