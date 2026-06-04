"""
Upload related event images from Google Drive root files named:
  RE_{eventName}.png       -> relatedEvents.eventImage
  RE_{eventName}_hover.png -> relatedEvents.eventHoverImage

Images are matched to DB records by eventName (case-insensitive).

Usage:
    python manage.py upload_related_events
    python manage.py upload_related_events --source-dir D:\\path\\to\\images
    python manage.py upload_related_events --dry-run
    python manage.py upload_related_events --base-url http://127.0.0.1:8000
"""

import os
import re
import tempfile

import requests as http_requests
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from Event.models import relatedEvents

from ._drive_utils import build_drive_service, download_drive_file, list_drive_folder

DEFAULT_SA_PATH = r"D:\GCC Data\service_account.json"


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


def _classify_re_file(basename: str):
    """
    Parse a RE_ filename and return (event_name, field_name) or (None, None).
      RE_{name}_hover.png -> (name, 'eventHoverImage')
      RE_{name}.png       -> (name, 'eventImage')
    """
    # Must start with RE_
    if not basename.upper().startswith("RE_"):
        return None, None

    ext = os.path.splitext(basename)[1]
    stem = os.path.splitext(basename)[0]  # strip extension

    # Check for _hover suffix (case-insensitive)
    hover_match = re.match(r'^RE_(.+)_hover$', stem, re.IGNORECASE)
    if hover_match:
        return hover_match.group(1).strip(), "eventHoverImage"

    plain_match = re.match(r'^RE_(.+)$', stem, re.IGNORECASE)
    if plain_match:
        return plain_match.group(1).strip(), "eventImage"

    return None, None


def _normalise(name: str) -> str:
    return re.sub(r'\s+', ' ', name).strip().lower()


# ── Management command ─────────────────────────────────────────────────────────

class Command(BaseCommand):
    help = "Upload RE_ images from Drive root to relatedEvents model"

    def add_arguments(self, parser):
        parser.add_argument("--drive-folder",    default=None,
                            help="Google Drive parent folder URL")
        parser.add_argument("--source-dir",     default=None,
                            help="Local directory already containing RE_ image files")
        parser.add_argument("--base-url",       default="http://127.0.0.1:8000",
                            help="Django server base URL")
        parser.add_argument("--service-account", default=DEFAULT_SA_PATH,
                            help="Path to Google service account JSON key file")
        parser.add_argument("--dry-run",        action="store_true",
                            help="Preview only — no DB writes or API calls")

    def handle(self, *args, **options):
        dry_run    = options["dry_run"]
        base_url   = options["base_url"].rstrip("/")
        source_dir = options.get("source_dir")
        upload_api = f"{base_url}/admin1/upload"

        if dry_run:
            self.stdout.write(self.style.WARNING("DRY RUN — no DB writes or API calls\n"))

        # ── Download RE_ files from Drive root ────────────────────────────────
        if options.get("drive_folder") and not source_dir:
            drive_url = options["drive_folder"]
            self.stdout.write("Listing Google Drive folder contents...")
            _tmpdir = tempfile.mkdtemp(prefix="ldz_re_")
            source_dir = _tmpdir

            try:
                service   = build_drive_service(options["service_account"])
                file_list = list_drive_folder(service, drive_url)
                self.stdout.write(f"  Found {len(file_list)} total items")
            except Exception as exc:
                raise CommandError(f"Drive listing failed: {exc}") from exc

            # Only download root-level RE_ files
            re_items = [
                item for item in file_list
                if not os.path.dirname(item.path).strip("\\/")
                and os.path.basename(item.path).upper().startswith("RE_")
            ]
            self.stdout.write(f"  RE_ files found: {len(re_items)}")

            for item in re_items:
                basename = os.path.basename(item.path)
                out_path = os.path.join(_tmpdir, basename)
                if os.path.exists(out_path):
                    continue
                try:
                    self.stdout.write(f"  Downloading {basename}...")
                    download_drive_file(service, item.id, out_path)
                except Exception as exc:
                    self.stdout.write(self.style.WARNING(f"    Warning: {exc}"))

        if not source_dir:
            raise CommandError("Provide --drive-folder or --source-dir")

        # ── Load related events from DB ───────────────────────────────────────
        events = list(
            relatedEvents.objects.filter(isDelete="No")
            .values_list("id", "eventName")
        )
        self.stdout.write(f"\nRelated events in DB: {len(events)}")

        # ── Process each RE_ file ─────────────────────────────────────────────
        self.stdout.write("\n--- Related Event Images ---")
        saved = no_match = 0

        for filename in sorted(os.listdir(source_dir)):
            if not os.path.isfile(os.path.join(source_dir, filename)):
                continue

            event_name, field = _classify_re_file(filename)
            if not event_name:
                continue

            target = _normalise(event_name)
            event_id = None
            for ev_id, ev_name in events:
                if _normalise(ev_name) == target:
                    event_id = ev_id
                    break

            if not event_id:
                self.stdout.write(self.style.WARNING(
                    f"\n  NO MATCH: {filename!r}  (parsed name: {event_name!r})"
                ))
                no_match += 1
                continue

            self.stdout.write(f"\n  {filename}")
            self.stdout.write(f"    -> relatedEvents(id={event_id}).{field}")

            url, tag = _get_or_upload(filename, source_dir, base_url, upload_api, dry_run)
            if not url:
                self.stdout.write(self.style.WARNING("    file not found in source_dir — skipping"))
                continue

            self.stdout.write(f"    url ({tag}): ...{url[-70:]}")

            if dry_run:
                continue

            obj = relatedEvents.objects.get(pk=event_id)
            setattr(obj, field, url)
            obj.updated_by = "Admin"
            obj.save()
            self.stdout.write(self.style.SUCCESS("    [saved]"))
            saved += 1

        self.stdout.write(self.style.SUCCESS(
            f"\nDone. {saved} saved, {no_match} unmatched."
        ))
