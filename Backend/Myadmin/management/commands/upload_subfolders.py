"""
Upload media from Drive subfolders:

  LDZ-26 Sponsor Photos  -> eventSponsors.sponsorComapnyLogo  (matched by company name)
  LDZ-26 Slider Logo     -> companiesLogoSection.logoLink     (one record per file, no name mapping)

Usage:
    python manage.py upload_subfolders
    python manage.py upload_subfolders --source-dir D:\\path\\to\\extracted
    python manage.py upload_subfolders --dry-run
    python manage.py upload_subfolders --base-url http://127.0.0.1:8000
"""

import os
import re
import tempfile

import requests as http_requests
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from Event.models import eventSponsors
from Myadmin.models import companiesLogoSection

from ._drive_utils import build_drive_service, download_drive_file, list_drive_folder

DEFAULT_EVENT_CODE    = "LDZ-26"
SPONSOR_SUBFOLDER_TPL = "{code} Sponsor Photos"
SLIDER_SUBFOLDER_TPL  = "{code} Slider Logo"
DEFAULT_SA_PATH       = r"D:\GCC Data\service_account.json"


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
    """Return (url, tag). Uploads if not already in MEDIA_ROOT."""
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


def _normalise(name: str) -> str:
    return re.sub(r'\s+', ' ', name).strip().lower()


# ── Management command ─────────────────────────────────────────────────────────

class Command(BaseCommand):
    help = "Upload sponsor photos and slider logos from Google Drive subfolders"

    def add_arguments(self, parser):
        parser.add_argument("--drive-folder",    default=None,
                            help="Google Drive parent folder URL")
        parser.add_argument("--source-dir",     default=None,
                            help="Local directory already containing the downloaded files")
        parser.add_argument("--base-url",       default="http://127.0.0.1:8000",
                            help="Django server base URL")
        parser.add_argument("--event-code",     default=DEFAULT_EVENT_CODE,
                            help="Event code prefix for Drive subfolder names (e.g. LDZ-26)")
        parser.add_argument("--service-account", default=DEFAULT_SA_PATH,
                            help="Path to Google service account JSON key file")
        parser.add_argument("--dry-run",        action="store_true",
                            help="Preview only — no DB writes or API calls")

    def handle(self, *args, **options):
        dry_run          = options["dry_run"]
        base_url         = options["base_url"].rstrip("/")
        source_dir       = options.get("source_dir")
        upload_api       = f"{base_url}/admin1/upload"
        code             = options["event_code"]
        sponsor_subfolder = SPONSOR_SUBFOLDER_TPL.format(code=code)
        slider_subfolder  = SLIDER_SUBFOLDER_TPL.format(code=code)

        if dry_run:
            self.stdout.write(self.style.WARNING("DRY RUN — no DB writes or API calls\n"))

        # ── Download from Drive if needed ─────────────────────────────────────
        sponsor_dir = source_dir
        slider_dir  = source_dir

        drive_url = options.get("drive_folder")
        if drive_url and not source_dir:
            self.stdout.write("Listing Google Drive folder contents...")
            _tmpdir = tempfile.mkdtemp(prefix="ldz_subfolders_")

            try:
                service   = build_drive_service(options["service_account"])
                file_list = list_drive_folder(service, drive_url)
                self.stdout.write(f"  Found {len(file_list)} total items")
            except Exception as exc:
                raise CommandError(f"Drive listing failed: {exc}") from exc

            sponsor_dir = os.path.join(_tmpdir, "sponsors")
            slider_dir  = os.path.join(_tmpdir, "sliders")
            os.makedirs(sponsor_dir, exist_ok=True)
            os.makedirs(slider_dir,  exist_ok=True)

            for item in file_list:
                subfolder = os.path.dirname(item.path).strip("\\/")
                basename  = os.path.basename(item.path)

                if subfolder == sponsor_subfolder:
                    out_path = os.path.join(sponsor_dir, basename)
                elif subfolder == slider_subfolder:
                    out_path = os.path.join(slider_dir, basename)
                else:
                    continue

                if os.path.exists(out_path):
                    continue
                try:
                    self.stdout.write(f"  Downloading [{subfolder}] {basename}...")
                    download_drive_file(service, item.id, out_path)
                except Exception as exc:
                    self.stdout.write(self.style.WARNING(f"    Warning: {exc}"))

        if not sponsor_dir or not slider_dir:
            raise CommandError("Provide --drive-folder or --source-dir")

        # ── Sponsor photos ────────────────────────────────────────────────────
        self._upload_sponsors(sponsor_dir, base_url, upload_api, dry_run)

        # ── Slider logos ──────────────────────────────────────────────────────
        self._upload_slider_logos(slider_dir, base_url, upload_api, dry_run)

        self.stdout.write(self.style.SUCCESS("\nAll done."))

    # ── Sponsor photos ────────────────────────────────────────────────────────

    def _upload_sponsors(self, source_dir: str, base_url: str, upload_api: str, dry_run: bool):
        self.stdout.write("\n--- Sponsor Photos ---")

        sponsors = list(
            eventSponsors.objects.filter(isDelete="No")
            .values_list("id", "sponsorComapnyName")
        )
        self.stdout.write(f"  Sponsors in DB: {len(sponsors)}")

        saved = no_match = 0

        for filename in sorted(os.listdir(source_dir)):
            if not os.path.isfile(os.path.join(source_dir, filename)):
                continue

            name_only = os.path.splitext(filename)[0]
            target = _normalise(name_only)

            sponsor_id = None
            for sp_id, sp_name in sponsors:
                if _normalise(sp_name) == target:
                    sponsor_id = sp_id
                    break

            if not sponsor_id:
                self.stdout.write(self.style.WARNING(
                    f"\n  NO MATCH: {filename!r}  (parsed: {name_only!r})"
                ))
                no_match += 1
                continue

            self.stdout.write(f"\n  {filename}  ->  sponsorComapnyLogo  (id={sponsor_id})")
            url, tag = _get_or_upload(filename, source_dir, base_url, upload_api, dry_run)
            if not url:
                self.stdout.write(self.style.WARNING("    file not found — skipping"))
                continue

            self.stdout.write(f"    url ({tag}): ...{url[-70:]}")

            if dry_run:
                continue

            obj = eventSponsors.objects.get(pk=sponsor_id)
            obj.sponsorComapnyLogo = url
            obj.updated_by = "Admin"
            obj.save()
            self.stdout.write(self.style.SUCCESS("    [saved]"))
            saved += 1

        self.stdout.write(self.style.SUCCESS(
            f"\nSponsors: {saved} saved, {no_match} unmatched."
        ))

    # ── Slider logos ──────────────────────────────────────────────────────────

    def _upload_slider_logos(self, source_dir: str, base_url: str, upload_api: str, dry_run: bool):
        self.stdout.write("\n--- Slider Logos ---")

        created = skipped = 0

        for filename in sorted(os.listdir(source_dir)):
            if not os.path.isfile(os.path.join(source_dir, filename)):
                continue

            self.stdout.write(f"\n  {filename}")
            url, tag = _get_or_upload(filename, source_dir, base_url, upload_api, dry_run)
            if not url:
                self.stdout.write(self.style.WARNING("    file not found — skipping"))
                skipped += 1
                continue

            self.stdout.write(f"    url ({tag}): ...{url[-70:]}")

            if dry_run:
                continue

            # Avoid creating duplicate records for the same file
            if companiesLogoSection.objects.filter(logoLink=url, isDelete="No").exists():
                self.stdout.write("    [already exists — skipped]")
                skipped += 1
                continue

            companiesLogoSection.objects.create(
                logoLink=url,
                created_by="Admin",
                updated_by="Admin",
            )
            self.stdout.write(self.style.SUCCESS("    [created]"))
            created += 1

        self.stdout.write(self.style.SUCCESS(
            f"\nSlider logos: {created} created, {skipped} skipped."
        ))
