"""
Upload news articles from Google Doc + upload media files listed in Sheet 2
of the mapping Google Spreadsheet.

Steps performed:
  1. Download & parse news articles from the Google Doc
     (HEADLINE -> newsTitle, SUMMARY -> newsShortDescription,
      FULL ARTICLE -> newsDescription, Publishing Date -> newsCreatedDate,
      CATEGORY -> newsCategory)
  2. For each article: find LDZ_{title}.jpg in --source-dir (or fall back to
     an already-uploaded mediaLDZ_{title}.jpg in MEDIA_ROOT), call the upload
     API if the file has not yet been uploaded, and save the returned URL to
     newsImage.
  3. Read Sheet 2 of the mapping spreadsheet (Drive File / DB Key / DB Model)
     and do the same upload-or-reuse logic for every listed file, saving the
     URL to the specified model field.

Usage:
    python manage.py upload_news_from_doc
    python manage.py upload_news_from_doc --source-dir D:\\AutomationData\\images
    python manage.py upload_news_from_doc --dry-run
    python manage.py upload_news_from_doc --base-url http://127.0.0.1:8000
"""

import csv
import datetime
import os
import re
import tempfile
import urllib.request
from io import StringIO

import requests as http_requests
from bs4 import BeautifulSoup
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from Event.models import eventDetails
from Myadmin.models import (
    generalNewsPoint,
    homePageNavLogoData,
    homePageThirdSection,
    homePageVideoSectionInput,
    newsCategory,
)

from ._drive_utils import build_drive_service, download_drive_file, list_drive_folder

# ── Defaults ──────────────────────────────────────────────────────────────────

NEWS_DOC_URL = (
    "https://docs.google.com/document/d/"
    "1jbNb8FC6H7s6SnZHhAc-b19XLmYaoiwSJ07JgnkHLKs/export?format=html"
)

MAPPING_SHEET2_URL = (
    "https://docs.google.com/spreadsheets/d/"
    "17Fem1v1rx9VpGF2TLcZCkL66N4yE2hBObuBu_SP9Olc/export?format=csv&gid=1668821478"
)

DEFAULT_SA_PATH = r"D:\GCC Data\service_account.json"

# ── Model registry (by name string used in Sheet 2) ───────────────────────────

MODEL_REGISTRY = {
    "homePageVideoSectionInput": homePageVideoSectionInput,
    "homePageThirdSection":      homePageThirdSection,
    "homePageNavLogoData":       homePageNavLogoData,
    "eventDetails":              eventDetails,
}

# ── Pure helpers ──────────────────────────────────────────────────────────────

def _slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"['''‘’′]", "", text)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def _parse_date(raw: str):
    """Parse '4 Nov 2025', tolerating non-ASCII junk the doc may insert."""
    cleaned = re.sub(r"[^\x20-\x7E]", "", raw).strip()
    for fmt in ("%d %b %Y", "%d %B %Y"):
        try:
            return datetime.datetime.strptime(cleaned, fmt).date()
        except ValueError:
            pass
    return None


def _to_ck(paragraphs: list) -> str:
    return "".join(f"<p>{p}</p>" for p in paragraphs if p.strip())


# ── Google Doc parser ─────────────────────────────────────────────────────────

def parse_news_articles(html: str) -> list:
    """
    Return a list of dicts:
      {date, category, headline, summary, full_article: [str, ...]}
    Articles are separated by a paragraph containing only '.' or whitespace.
    """
    soup = BeautifulSoup(html, "html.parser")
    articles = []
    current: dict = {}
    in_full = False

    def _flush():
        nonlocal current, in_full
        if current.get("headline"):
            articles.append(dict(current))
            current = {}
            in_full = False
        # No headline yet: keep pre-headline fields (date, category) so that
        # empty lines between "Publishing Date:" and "HEADLINE:" don't lose them

    for p in soup.find_all("p"):
        raw = p.get_text(strip=True)
        # Strip non-ASCII chars
        ascii_only = re.sub(r"[^\x20-\x7E]", "", raw).strip()
        # Article separator: a paragraph that is only dots (and whitespace)
        is_separator = bool(ascii_only) and not ascii_only.strip(".")
        cleaned = ascii_only.strip(".")
        if not cleaned:
            if is_separator:
                _flush()
            continue

        lower = cleaned.lower()

        if lower.startswith("publishing date:"):
            current["date"] = cleaned.split(":", 1)[1].strip()
            in_full = False
        elif lower.startswith("category:"):
            current["category"] = cleaned.split(":", 1)[1].strip()
            in_full = False
        elif lower.startswith("headline:"):
            _flush()  # save any previous article not ended by a separator
            current["headline"] = cleaned.split(":", 1)[1].strip()
            in_full = False
        elif lower.startswith("summary:"):
            current["summary"] = cleaned.split(":", 1)[1].strip()
            in_full = False
        elif lower.startswith("full article:"):
            current["full_article"] = []
            inline = cleaned.split(":", 1)[1].strip()
            if inline:
                current["full_article"].append(inline)
            in_full = True
        elif in_full:
            current.setdefault("full_article", []).append(cleaned)

    _flush()
    return articles


# ── File/image URL resolution ─────────────────────────────────────────────────

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


def _get_url(drive_filename: str, source_dir, base_url: str, upload_api: str, dry_run: bool):
    """
    Resolve a file URL:
      - If media{drive_filename} already exists in MEDIA_ROOT  -> use that URL.
      - Else if drive_filename exists in source_dir            -> upload via API.
      - Otherwise returns (None, False).
    Returns (url_or_None, was_uploaded_bool).
    """
    media_root = settings.MEDIA_ROOT
    media_url  = settings.MEDIA_URL.rstrip("/")

    media_name = f"media{drive_filename}"
    media_path = os.path.join(media_root, media_name)
    if os.path.exists(media_path):
        return f"{base_url}{media_url}/{media_name}", False

    if source_dir:
        src_path = os.path.join(source_dir, drive_filename)
        if os.path.exists(src_path):
            if dry_run:
                return f"{base_url}{media_url}/{media_name}", False
            url = _upload_file(src_path, upload_api)
            return url, True

    return None, False


def _get_news_image_url(title: str, source_dir, base_url: str, upload_api: str, dry_run: bool, news_prefix: str = "LDZ"):
    """Convenience wrapper for news images named '{prefix}_{title}.jpg'.
    Tries colon replaced by hyphen (Drive API sanitizer) and underscore (legacy)."""
    for candidate in (title, title.replace(":", "-"), title.replace(":", "_")):
        url, uploaded = _get_url(f"{news_prefix}_{candidate}.jpg", source_dir, base_url, upload_api, dry_run)
        if url:
            return url, uploaded
    return None, False


# ── Management command ────────────────────────────────────────────────────────

class Command(BaseCommand):
    help = "Upload news from Google Doc and upload media files from Sheet 2"

    def add_arguments(self, parser):
        parser.add_argument("--doc-url",         default=NEWS_DOC_URL,
                            help="Google Doc export URL")
        parser.add_argument("--mapping-url",    default=MAPPING_SHEET2_URL,
                            help="Google Spreadsheet Sheet 2 CSV export URL")
        parser.add_argument("--source-dir",     default=None,
                            help="Local directory containing source image/media files")
        parser.add_argument("--drive-folder",   default=None,
                            help="Google Drive folder URL to download source files from")
        parser.add_argument("--base-url",       default="http://127.0.0.1:8000",
                            help="Django server base URL for the upload API")
        parser.add_argument("--service-account", default=DEFAULT_SA_PATH,
                            help="Path to Google service account JSON key file")
        parser.add_argument("--news_prefix",    default="LDZ",
                            help="Filename prefix for news images and Sheet 2 files (e.g. LDZ or AFS)")
        parser.add_argument("--dry-run",        action="store_true",
                            help="Preview only — no DB writes, no API calls")

    def handle(self, *args, **options):
        dry_run      = options["dry_run"]
        base_url     = options["base_url"].rstrip("/")
        source_dir   = options.get("source_dir")
        news_prefix  = options.get("news_prefix", "LDZ")
        upload_api   = f"{base_url}/admin1/upload"

        if dry_run:
            self.stdout.write(self.style.WARNING("DRY RUN — no DB writes or API calls\n"))

        # ── 0. Download Drive folder if requested ─────────────────────────────
        _tmpdir = None
        drive_url = options.get("drive_folder")
        if drive_url and not source_dir:
            self.stdout.write("Listing Google Drive folder contents...")
            _tmpdir = tempfile.mkdtemp(prefix="ldz_drive_")
            source_dir = _tmpdir

            try:
                service   = build_drive_service(options["service_account"])
                file_list = list_drive_folder(service, drive_url)
                self.stdout.write(f"  Found {len(file_list)} files in Drive folder")
            except Exception as exc:
                raise CommandError(f"Drive listing failed: {exc}") from exc

            # Download root-level files only (news images + Sheet 2 files).
            # Subfolder items (speaker photos, RE images, etc.) are skipped.
            for item in file_list:
                if os.path.dirname(item.path):   # skip subfolder items
                    continue
                sname = os.path.basename(item.path)
                out_path = os.path.join(_tmpdir, sname)
                if os.path.exists(out_path):
                    continue
                try:
                    self.stdout.write(f"  Downloading {sname}...")
                    download_drive_file(service, item.id, out_path)
                except Exception as exc:
                    self.stdout.write(self.style.WARNING(f"    Warning: {exc}"))

            downloaded = [f for f in os.listdir(_tmpdir) if os.path.isfile(os.path.join(_tmpdir, f))]
            self.stdout.write(f"  Files ready in temp dir: {len(downloaded)}")

        # ── 1. Download & parse news doc ──────────────────────────────────────
        self.stdout.write("Downloading news Google Doc...")
        try:
            with urllib.request.urlopen(options["doc_url"]) as r:
                html = r.read().decode("utf-8")
        except Exception as exc:
            raise CommandError(f"Could not fetch Google Doc: {exc}") from exc

        articles = parse_news_articles(html)
        self.stdout.write(f"  Downloaded {len(html):,} chars, parsed {len(articles)} articles")

        # ── 2. Download Sheet 2 ───────────────────────────────────────────────
        self.stdout.write("Downloading mapping Sheet 2...")
        try:
            with urllib.request.urlopen(options["mapping_url"]) as r:
                sheet2_csv = r.read().decode("utf-8")
        except Exception as exc:
            raise CommandError(f"Could not fetch mapping sheet: {exc}") from exc

        sheet2_rows = list(csv.DictReader(StringIO(sheet2_csv)))
        self.stdout.write(f"  Found {len(sheet2_rows)} file mapping rows")

        # ── 3. Upload news articles ───────────────────────────────────────────
        self._upload_news(articles, source_dir, base_url, upload_api, dry_run, news_prefix)

        # ── 4. Upload Sheet 2 media files ─────────────────────────────────────
        self._upload_sheet2_files(sheet2_rows, source_dir, base_url, upload_api, dry_run, news_prefix)

        self.stdout.write(self.style.SUCCESS("\nAll done."))

    # ── News upload ───────────────────────────────────────────────────────────

    def _upload_news(self, articles, source_dir, base_url, upload_api, dry_run, news_prefix="LDZ"):
        self.stdout.write("\n--- News Articles ---")
        created = updated = 0

        for article in articles:
            title       = article.get("headline", "").strip()
            summary     = article.get("summary", "").strip()
            cat_raw     = article.get("category", "Insights").strip()
            date_str    = article.get("date", "")
            paras       = article.get("full_article", [])

            if not title:
                continue

            # Normalise category to title-case
            category_name = " ".join(w.capitalize() for w in cat_raw.split())
            pub_date      = _parse_date(date_str)
            description   = _to_ck(paras)
            slug          = _slugify(title)

            self.stdout.write(f"\n  {title[:72]}")

            # Resolve image
            img_url, was_uploaded = _get_news_image_url(
                title, source_dir, base_url, upload_api, dry_run, news_prefix
            )
            if img_url:
                tag = "uploaded" if was_uploaded else "existing"
                self.stdout.write(f"    image ({tag}): ...{img_url[-60:]}")
            else:
                self.stdout.write(self.style.WARNING("    image: NOT FOUND"))

            if dry_run:
                continue

            cat_obj = newsCategory.objects.filter(
                categoryName__iexact=category_name, isDelete="No"
            ).first()
            if not cat_obj:
                cat_obj = newsCategory.objects.create(
                    categoryName=category_name,
                    isDelete="No",
                    created_by="Admin",
                    updated_by="Admin",
                )

            update_fields = {
                "newsCategoryId":       cat_obj,
                "newsShortDescription": summary,
                "newsDescription":      description,
                "newsPageUrl":          slug,
                "newsMetaTitle":        title,
                "newsMetaDescription":  summary,
                "newsImageAltText":     title,
                "updated_by":           "Admin",
            }
            if pub_date:
                update_fields["newsCreatedDate"] = pub_date
            if img_url:
                update_fields["newsImage"] = img_url

            obj = generalNewsPoint.objects.filter(newsTitle=title, isDelete="No").first()
            if obj:
                for k, v in update_fields.items():
                    setattr(obj, k, v)
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                update_fields.update({
                    "newsTitle":  title,
                    "isTopNews":  "No",
                    "isDelete":   "No",
                    "created_by": "Admin",
                    "newsImage":  img_url or "",
                })
                generalNewsPoint.objects.create(**update_fields)
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1

        self.stdout.write(
            self.style.SUCCESS(f"\nNews: {created} created, {updated} updated.")
        )

    # ── Sheet 2 media upload ──────────────────────────────────────────────────

    def _upload_sheet2_files(self, rows, source_dir, base_url, upload_api, dry_run, news_prefix="LDZ"):
        self.stdout.write("\n--- Sheet 2 Media Files ---")

        for row in rows:
            drive_file   = row.get("Drive File", "").strip()
            db_key       = row.get("DB Key", "").strip()
            db_model_str = row.get("DB Model", "").strip()

            if not drive_file or not db_key or not db_model_str:
                continue

            # Replace default LDZ prefix with the event-specific prefix in filenames
            # e.g. "LDZ_Favicon.png" -> "AFS_Favicon.png"
            #      "Final LDZ-26 Event Video..." -> "Final AFS-26 Event Video..."
            if news_prefix != "LDZ":
                drive_file = drive_file.replace("LDZ", news_prefix)

            self.stdout.write(f"\n  {drive_file}")
            self.stdout.write(f"    -> {db_model_str}.{db_key}")

            url, was_uploaded = _get_url(
                drive_file, source_dir, base_url, upload_api, dry_run
            )
            if not url:
                self.stdout.write(self.style.WARNING("    NOT FOUND — skipping"))
                continue

            tag = "uploaded" if was_uploaded else "existing"
            self.stdout.write(f"    url ({tag}): ...{url[-70:]}")

            if dry_run:
                continue

            model_cls = MODEL_REGISTRY.get(db_model_str)
            if not model_cls:
                self.stdout.write(self.style.ERROR(f"    Unknown model: {db_model_str}"))
                continue

            obj = model_cls.objects.first()
            if not obj:
                obj = model_cls.objects.create(created_by="Admin", updated_by="Admin")
                self.stdout.write("    No record existed — created one")

            setattr(obj, db_key, url)
            obj.updated_by = "Admin"
            obj.save()
            self.stdout.write(self.style.SUCCESS("    [saved]"))
