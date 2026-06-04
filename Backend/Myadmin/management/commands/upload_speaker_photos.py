"""
Upload speaker photos from the 'LDZ-26 Speakers Photos' subfolder in Google Drive
to the eventSpeakers model.

File naming convention in Drive:
  {Speaker Name} - original.png  -> eventSpeakerHomePageImage
  {Speaker Name} - grey.png      -> eventSpeakerProfilePageImage
  {Speaker Name} -White.png      -> eventSpeakerFeaturedPageImage
  {Speaker Name} ( White ).png   -> SKIPPED

Usage:
    python manage.py upload_speaker_photos
    python manage.py upload_speaker_photos --source-dir D:\\path\\to\\photos
    python manage.py upload_speaker_photos --dry-run
    python manage.py upload_speaker_photos --base-url http://127.0.0.1:8000
"""

import os
import re
import tempfile

import requests as http_requests
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from Event.models import eventSpeakers

from ._drive_utils import build_drive_service, download_drive_file, list_drive_folder

DEFAULT_EVENT_CODE  = "LDZ-26"
SPEAKERS_SUBFOLDER_TPL = "{code} Speakers Photos"
DEFAULT_SA_PATH = r"D:\GCC Data\service_account.json"


def _upload_file(file_path: str, upload_api_url: str) -> str:
    """POST a local file to the upload API; return the uploadedURL string."""
    with open(file_path, "rb") as fh:
        resp = http_requests.post(
            upload_api_url,
            files={"media": (os.path.basename(file_path), fh)},
            timeout=60,
        )
    resp.raise_for_status()
    return resp.json()["uploadedURL"]


def _get_or_upload(filename: str, source_dir: str, base_url: str, upload_api: str, dry_run: bool):
    """
    Return (url, tag) for a file:
      - If already in MEDIA_ROOT -> use existing URL
      - Else upload from source_dir -> return new URL
    """
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


def _classify_file(basename: str):
    """
    Return (speaker_name, field_name) or (None, None) if the file should be skipped.

    Patterns (spaces around separators are trimmed):
      {name} - original.png  -> eventSpeakerHomePageImage
      {name} - grey.png      -> eventSpeakerProfilePageImage
      {name} -White.png      -> eventSpeakerFeaturedPageImage
      {name} ( White ).png   -> skip
    """
    # Skip the alternate white format
    if re.search(r'\(\s*White\s*\)', basename, re.IGNORECASE):
        return None, None

    # Match: name <spaces>-<spaces>White.png  (no space between - and White is also valid)
    m = re.match(r'^(.+?)\s*-\s*White\.png$', basename, re.IGNORECASE)
    if m:
        return m.group(1).strip(), "eventSpeakerFeaturedPageImage"

    m = re.match(r'^(.+?)\s*-\s*grey\.png$', basename, re.IGNORECASE)
    if m:
        return m.group(1).strip(), "eventSpeakerProfilePageImage"

    m = re.match(r'^(.+?)\s*-\s*original\.(?:png|jpg)$', basename, re.IGNORECASE)
    if m:
        return m.group(1).strip(), "eventSpeakerHomePageImage"

    return None, None


def _normalise(name: str) -> str:
    return re.sub(r'\s+', ' ', name).strip().lower()


def _find_speaker(raw_name: str, speakers: list):
    """Case-insensitive, whitespace-normalised match against (id, name) list."""
    target = _normalise(raw_name)
    for sp_id, sp_name in speakers:
        if _normalise(sp_name) == target:
            return sp_id
    return None


# ── Management command ─────────────────────────────────────────────────────────

class Command(BaseCommand):
    help = "Upload speaker photos from Google Drive LDZ-26 Speakers Photos subfolder"

    def add_arguments(self, parser):
        parser.add_argument("--drive-folder",    default=None,
                            help="Google Drive parent folder URL")
        parser.add_argument("--source-dir",     default=None,
                            help="Local directory already containing speaker photos")
        parser.add_argument("--base-url",       default="http://127.0.0.1:8000",
                            help="Django server base URL")
        parser.add_argument("--event-code",     default=DEFAULT_EVENT_CODE,
                            help="Event code prefix for Drive subfolder name (e.g. LDZ-26)")
        parser.add_argument("--service-account", default=DEFAULT_SA_PATH,
                            help="Path to Google service account JSON key file")
        parser.add_argument("--dry-run",        action="store_true",
                            help="Preview only — no DB writes, no API calls")

    def handle(self, *args, **options):
        dry_run        = options["dry_run"]
        base_url       = options["base_url"].rstrip("/")
        source_dir     = options.get("source_dir")
        upload_api     = f"{base_url}/admin1/upload"
        drive_subfolder = SPEAKERS_SUBFOLDER_TPL.format(code=options["event_code"])

        if dry_run:
            self.stdout.write(self.style.WARNING("DRY RUN — no DB writes or API calls\n"))

        # ── Download Drive subfolder if needed ────────────────────────────────
        _tmpdir = None
        drive_url = options.get("drive_folder")
        if drive_url and not source_dir:
            self.stdout.write("Listing Google Drive folder contents...")
            _tmpdir = tempfile.mkdtemp(prefix="ldz_speakers_")
            source_dir = _tmpdir

            try:
                service   = build_drive_service(options["service_account"])
                file_list = list_drive_folder(service, drive_url)
                self.stdout.write(f"  Found {len(file_list)} total items in Drive folder")
            except Exception as exc:
                raise CommandError(f"Drive listing failed: {exc}") from exc

            # Filter to speaker photos subfolder only
            speaker_items = [
                item for item in file_list
                if os.path.dirname(item.path).strip("\\/") == drive_subfolder
            ]
            self.stdout.write(f"  Speaker photo items: {len(speaker_items)}")

            for item in speaker_items:
                basename = os.path.basename(item.path)
                out_path = os.path.join(_tmpdir, basename)
                if os.path.exists(out_path):
                    continue
                if re.search(r'\(\s*White\s*\)', basename, re.IGNORECASE):
                    continue
                try:
                    self.stdout.write(f"  Downloading {basename}...")
                    download_drive_file(service, item.id, out_path)
                except Exception as exc:
                    self.stdout.write(self.style.WARNING(f"    Warning: {exc}"))

            downloaded = [f for f in os.listdir(_tmpdir) if os.path.isfile(os.path.join(_tmpdir, f))]
            self.stdout.write(f"  Files ready: {len(downloaded)}")

        if not source_dir:
            raise CommandError("Provide --drive-folder or --source-dir")

        # ── Load speakers from DB ─────────────────────────────────────────────
        speakers = list(
            eventSpeakers.objects.filter(isDelete="No")
            .values_list("id", "eventSpeakerName")
        )
        self.stdout.write(f"\nSpeakers in DB: {len(speakers)}")

        # ── Process each file ─────────────────────────────────────────────────
        self.stdout.write("\n--- Speaker Photos ---")
        updated = skipped = no_match = 0

        for filename in sorted(os.listdir(source_dir)):
            if not os.path.isfile(os.path.join(source_dir, filename)):
                continue

            raw_name, field = _classify_file(filename)
            if not raw_name:
                continue  # skip ( White ) and unrecognised files

            speaker_id = _find_speaker(raw_name, speakers)
            if not speaker_id:
                self.stdout.write(self.style.WARNING(
                    f"  NO MATCH: {filename!r}  (parsed name: {raw_name!r})"
                ))
                no_match += 1
                continue

            self.stdout.write(f"\n  {filename}")
            self.stdout.write(f"    speaker: {raw_name}  |  field: {field}")

            url, tag = _get_or_upload(filename, source_dir, base_url, upload_api, dry_run)
            if not url:
                self.stdout.write(self.style.WARNING("    file not found in source_dir — skipping"))
                skipped += 1
                continue

            self.stdout.write(f"    url ({tag}): ...{url[-70:]}")

            if dry_run:
                continue

            obj = eventSpeakers.objects.get(pk=speaker_id)
            setattr(obj, field, url)
            obj.updated_by = "Admin"
            obj.save()
            self.stdout.write(self.style.SUCCESS("    [saved]"))
            updated += 1

        self.stdout.write(self.style.SUCCESS(
            f"\nDone. {updated} saved, {skipped} skipped, {no_match} unmatched."
        ))
