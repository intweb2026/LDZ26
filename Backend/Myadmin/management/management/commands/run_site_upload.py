"""
Master orchestration command - runs all upload steps for one website in sequence.
Designed for high-volume usage (300+ sites/year): just supply the URLs and event code.

Steps executed (in order):
  0. upload_from_csv               - CSV files from AutomationData (FAQs, nav, sidebar, roles, users)
  1. upload_from_doc               - main page content (text, speakers, trends, etc.)
  2. upload_news_from_doc          - news articles + Sheet-2 media file mappings
  3. upload_speaker_photos         - speaker original / grey / white images
  4. upload_subfolders             - sponsor logos + slider logos
  5. upload_related_events         - RE_*.png / RE_*_hover.png images
  6. upload_attendees_leaders_footer - leaders, past attendees, footer options

Usage:
    python manage.py run_site_upload \\
        --event-code   "LDZ-26" \\
        --csv-dir      "D:\\AutomationData" \\
        --main-doc     "https://docs.google.com/document/d/<ID>/export?format=html" \\
        --news-doc     "https://docs.google.com/document/d/<ID>/export?format=html" \\
        --suppl-doc    "https://docs.google.com/document/d/<ID>/export?format=html" \\
        --sheet2       "https://docs.google.com/spreadsheets/d/<ID>/export?format=csv&gid=<GID>" \\
        --drive-folder "https://drive.google.com/drive/folders/<ID>" \\
        --base-url     "http://127.0.0.1:8000"

Dry-run (no DB writes, no API calls):
    python manage.py run_site_upload --dry-run [... same flags ...]
"""

from django.core.management import call_command
from django.core.management.base import BaseCommand

# ── Default URLs (current LDZ project) ────────────────────────────────────────

_MAIN_DOC   = (
    "https://docs.google.com/document/d/"
    "12qxtOc-npzjKFnOK29WOT4doDhNR5C5GLf27IpaQWRE/export?format=html"
)
_NEWS_DOC   = (
    "https://docs.google.com/document/d/"
    "1jbNb8FC6H7s6SnZHhAc-b19XLmYaoiwSJ07JgnkHLKs/export?format=html"
)
_SUPPL_DOC  = (
    "https://docs.google.com/document/d/"
    "12qxtOc-npzjKFnOK29WOT4doDhNR5C5GLf27IpaQWRE/export?format=html"
)
_SHEET2     = (
    "https://docs.google.com/spreadsheets/d/"
    "17Fem1v1rx9VpGF2TLcZCkL66N4yE2hBObuBu_SP9Olc/export?format=csv&gid=1668821478"
)
_DRIVE      = "https://drive.google.com/drive/folders/17JrbWlrsZlFfkMCMiIj_CkzGDuwDZTw5"
_EVENT_CODE = "LDZ-26"
_CSV_DIR    = r"D:\AutomationData"
_SA_PATH    = r"D:\GCC Data\service_account.json"


class Command(BaseCommand):
    help = "Run all upload steps for one website - supply URLs and event code"

    def add_arguments(self, parser):
        parser.add_argument(
            "--event-code", default=_EVENT_CODE,
            help="Event identifier used to locate Drive subfolders (e.g. LDZ-26)",
        )
        parser.add_argument(
            "--csv-dir", default=_CSV_DIR,
            help="Directory containing AutomationData CSV files (default: D:\\AutomationData)",
        )
        parser.add_argument(
            "--service-account", default=_SA_PATH,
            help="Path to Google service account JSON key file",
        )
        parser.add_argument(
            "--main-doc", default=_MAIN_DOC,
            help="Main content Google Doc HTML export URL",
        )
        parser.add_argument(
            "--news-doc", default=_NEWS_DOC,
            help="News articles Google Doc HTML export URL",
        )
        parser.add_argument(
            "--suppl-doc", default=_SUPPL_DOC,
            help="Supplementary doc URL (leaders / past attendees / footer options)",
        )
        parser.add_argument(
            "--sheet2", default=_SHEET2,
            help="Sheet-2 CSV export URL for media file to DB field mappings",
        )
        parser.add_argument(
            "--drive-folder", default=_DRIVE,
            help="Google Drive parent folder URL containing all image subfolders",
        )
        parser.add_argument(
            "--base-url", default="http://127.0.0.1:8000",
            help="Django server base URL for the upload API",
        )
        parser.add_argument(
            "--news_prefix", default="LDZ",
            help="Filename prefix for news images and Sheet 2 media files (e.g. LDZ or AFS)",
        )
        parser.add_argument(
            "--dry-run", action="store_true",
            help="Preview only - no DB writes, no API calls",
        )
        parser.add_argument(
            "--skip", default="",
            help="Comma-separated list of step numbers to skip (e.g. --skip 3,4)",
        )

    def handle(self, *args, **options):
        dry_run          = options["dry_run"]
        event_code       = options["event_code"]
        csv_dir          = options["csv_dir"]
        main_doc         = options["main_doc"]
        news_doc         = options["news_doc"]
        suppl_doc        = options["suppl_doc"]
        sheet2           = options["sheet2"]
        drive_folder     = options["drive_folder"]
        base_url         = options["base_url"].rstrip("/")
        service_account  = options["service_account"]
        news_prefix      = options["news_prefix"]
        skip_steps       = {s.strip() for s in options["skip"].split(",") if s.strip()}

        self.stdout.write(self.style.SUCCESS("=" * 60))
        self.stdout.write(self.style.SUCCESS(f"  Site Upload - event code: {event_code}"))
        self.stdout.write(self.style.SUCCESS("=" * 60))
        if dry_run:
            self.stdout.write(self.style.WARNING("  DRY RUN - no DB writes or API calls\n"))

        steps = [
            ("0", "CSV data - FAQs, nav, sidebar, roles, users (upload_from_csv)",
             "upload_from_csv", {
                 "dir":     csv_dir,
                 "dry_run": dry_run,
             }),
            ("1", "Main content (upload_from_doc)",
             "upload_from_doc", {
                 "doc_url": main_doc,
                 "dry_run": dry_run,
             }),
            ("2", "News articles + Sheet-2 media (upload_news_from_doc)",
             "upload_news_from_doc", {
                 "doc_url":         news_doc,
                 "mapping_url":     sheet2,
                 "drive_folder":    drive_folder,
                 "base_url":        base_url,
                 "service_account": service_account,
                 "news_prefix":     news_prefix,
                 "dry_run":         dry_run,
             }),
            ("3", "Speaker photos (upload_speaker_photos)",
             "upload_speaker_photos", {
                 "drive_folder":    drive_folder,
                 "base_url":        base_url,
                 "event_code":      event_code,
                 "service_account": service_account,
                 "dry_run":         dry_run,
             }),
            ("4", "Sponsor logos + slider logos (upload_subfolders)",
             "upload_subfolders", {
                 "drive_folder":    drive_folder,
                 "base_url":        base_url,
                 "event_code":      event_code,
                 "service_account": service_account,
                 "dry_run":         dry_run,
             }),
            ("5", "Related event images (upload_related_events)",
             "upload_related_events", {
                 "drive_folder":    drive_folder,
                 "base_url":        base_url,
                 "service_account": service_account,
                 "dry_run":         dry_run,
             }),
            ("6", "Leaders / Past Attendees / Footer (upload_attendees_leaders_footer)",
             "upload_attendees_leaders_footer", {
                 "doc_url":         suppl_doc,
                 "drive_folder":    drive_folder,
                 "base_url":        base_url,
                 "event_code":      event_code,
                 "service_account": service_account,
                 "dry_run":         dry_run,
             }),
        ]

        results = []

        for step_no, label, cmd_name, kwargs in steps:
            if step_no in skip_steps:
                self.stdout.write(self.style.WARNING(f"\n[STEP {step_no}] SKIPPED - {label}"))
                results.append((step_no, label, "skipped", None))
                continue

            self.stdout.write(f"\n{'=' * 60}")
            self.stdout.write(self.style.SUCCESS(f"[STEP {step_no}] {label}"))
            self.stdout.write("=" * 60)

            try:
                call_command(cmd_name, **kwargs)
                results.append((step_no, label, "ok", None))
            except Exception as exc:
                self.stdout.write(self.style.ERROR(f"\n  ERROR in step {step_no}: {exc}"))
                results.append((step_no, label, "error", str(exc)))

        # ── Summary ───────────────────────────────────────────────────────────
        self.stdout.write(f"\n{'=' * 60}")
        self.stdout.write(self.style.SUCCESS("  UPLOAD SUMMARY"))
        self.stdout.write("=" * 60)
        for step_no, label, status, err in results:
            if status == "ok":
                icon = self.style.SUCCESS("  DONE   ")
            elif status == "skipped":
                icon = self.style.WARNING("  SKIPPED")
            else:
                icon = self.style.ERROR("  FAILED ")
            self.stdout.write(f"{icon}  [{step_no}] {label}")
            if err:
                self.stdout.write(self.style.ERROR(f"           {err}"))

        failed = [r for r in results if r[2] == "error"]
        if failed:
            self.stdout.write(self.style.ERROR(
                f"\n{len(failed)} step(s) failed. Fix the errors above and re-run "
                f"with --skip to bypass completed steps."
            ))
        else:
            self.stdout.write(self.style.SUCCESS("\nAll steps completed successfully."))
