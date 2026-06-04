"""
Auto-upload news articles (with images) from a PDF + Google Drive folder.

Usage:
    # Content only
    python manage.py upload_news_from_pdf --pdf path/to/file.pdf

    # Content + images from Google Drive
    python manage.py upload_news_from_pdf --pdf path/to/file.pdf --drive "https://drive.google.com/drive/folders/FOLDER_ID"

    # Dry run (preview only, no DB writes)
    python manage.py upload_news_from_pdf --pdf path/to/file.pdf --drive "..." --dry-run

    # Mark all as top news
    python manage.py upload_news_from_pdf --pdf path/to/file.pdf --top-news
"""

import json
import os
import re
import shutil
import tempfile

import anthropic
import fitz  # PyMuPDF
import gdown
import requests as http_requests
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.core.management.base import BaseCommand, CommandError

from Myadmin.models import generalNewsPoint, newsCategory


# ── Prompts ──────────────────────────────────────────────────────────────────

LIST_PROMPT = """You are a news data extractor. Read this document and return ONLY a JSON object.

List every news article found with this structure:
{
  "articles": [
    {
      "index": 1,
      "category": "category name (e.g. Market Trends, Partnerships, Investment, Regulatory, Research, Insights, Innovation, Technology)",
      "newsTitle": "full article title",
      "newsShortDescription": "subtitle or short summary line under the title",
      "newsPageUrl": "url-slug (lowercase, hyphens only, no apostrophes or special chars)",
      "newsCreatedDate": "YYYY-MM-DD",
      "newsMetaTitle": "same as newsTitle",
      "newsMetaDescription": "same as newsShortDescription"
    }
  ]
}

Rules:
- Include EVERY article found — do not skip any
- Date format must be YYYY-MM-DD (e.g. "4 Nov 2025" -> "2025-11-04")
- newsPageUrl: lowercase, hyphens, no apostrophes, no special chars
- Return ONLY the JSON object, no markdown fences, no extra text
"""

BODY_PROMPT = """Extract the COMPLETE body text of the article titled: "{title}"

Return ONLY this JSON object:
{{"newsDescription": "<p>paragraph one</p><p>paragraph two</p>"}}

Rules:
- Include every paragraph of the article body
- Wrap each paragraph in <p> tags
- Do NOT include the title, subtitle, date, or category label
- Ensure the JSON is valid — escape any backslashes and control characters
- Return ONLY the JSON object, no markdown fences
"""

BODY_PROMPT_PLAIN = """Extract the COMPLETE body text of the article titled: "{title}"

Return ONLY the article body as plain paragraphs separated by blank lines.
Do NOT include the title, subtitle, date, category, or any JSON syntax.
Do NOT use any formatting markers or code fences.
"""


# ── Helpers ───────────────────────────────────────────────────────────────────

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}


def clean_json(raw: str) -> str:
    raw = raw.strip()
    if raw.startswith("```"):
        raw = raw.split("```", 2)[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.rsplit("```", 1)[0].strip()
    # Trim any trailing garbage after the last closing brace
    last = raw.rfind("}")
    if last != -1:
        raw = raw[: last + 1]
    return raw


def extract_text_from_pdf(pdf_path: str) -> str:
    doc = fitz.open(pdf_path)
    pages = [page.get_text() for page in doc]
    doc.close()
    return "\n\n".join(pages)


def call_claude(client: anthropic.Anthropic, prompt: str, pdf_text: str) -> str:
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=16000,
        messages=[
            {
                "role": "user",
                "content": f"{prompt}\n\n---DOCUMENT TEXT---\n{pdf_text}",
            }
        ],
    )
    return clean_json(message.content[0].text)


def call_claude_plain(client: anthropic.Anthropic, prompt: str, pdf_text: str) -> str:
    """Same as call_claude but returns raw text without JSON cleaning."""
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=16000,
        messages=[
            {
                "role": "user",
                "content": f"{prompt}\n\n---DOCUMENT TEXT---\n{pdf_text}",
            }
        ],
    )
    return message.content[0].text.strip()


def get_or_create_category(name: str) -> newsCategory:
    obj, _ = newsCategory.objects.get_or_create(
        categoryName__iexact=name,
        isDelete="No",
        defaults={
            "categoryName": name,
            "created_by": "Admin",
            "updated_by": "Admin",
        },
    )
    return obj


INVALID_WIN_CHARS = re.compile(r'[<>:"/\\|?*]')


def safe_filename(name: str) -> str:
    """Strip characters that are illegal in Windows filenames."""
    return INVALID_WIN_CHARS.sub("_", name).strip()


def download_drive_folder(drive_url: str, dest_dir: str, stdout) -> list[tuple[str, str]]:
    """
    Download all image files from a public Google Drive folder.
    Step 1: gdown skip_download=True  -> get file IDs + original names.
    Step 2: requests direct export URL -> download each with a safe Windows filename.
    Returns sorted list of (local_path, original_drive_name).
    """
    stdout.write("  Listing Drive folder contents...")
    try:
        file_list = gdown.download_folder(
            url=drive_url,
            output=dest_dir,
            quiet=True,
            use_cookies=False,
            skip_download=True,
        )
    except Exception as e:
        raise CommandError(f"Google Drive folder listing failed: {e}")

    if not file_list:
        raise CommandError("No files found in the Google Drive folder.")

    image_files = [
        item for item in file_list
        if os.path.splitext(os.path.basename(item.local_path))[1].lower() in IMAGE_EXTENSIONS
    ]
    stdout.write(f"  Found {len(image_files)} image file(s) — downloading...")

    session = http_requests.Session()
    session.headers.update({"User-Agent": "Mozilla/5.0"})

    downloaded = []
    for item in image_files:
        original_name = os.path.basename(item.local_path)
        safe_name = safe_filename(original_name)
        dest_path = os.path.join(dest_dir, safe_name)

        # Google Drive direct export — works for public files without auth
        download_url = f"https://drive.google.com/uc?export=download&id={item.id}"
        try:
            resp = session.get(download_url, stream=True, timeout=60)
            resp.raise_for_status()

            # Handle Google's large-file confirmation page
            if "text/html" in resp.headers.get("Content-Type", ""):
                from bs4 import BeautifulSoup
                soup = BeautifulSoup(resp.text, "html.parser")
                confirm = soup.find("input", {"name": "confirm"})
                if confirm:
                    resp = session.get(
                        f"{download_url}&confirm={confirm.get('value', 't')}",
                        stream=True, timeout=60,
                    )
                    resp.raise_for_status()

            with open(dest_path, "wb") as f:
                for chunk in resp.iter_content(chunk_size=8192):
                    f.write(chunk)

            downloaded.append((dest_path, original_name))
            stdout.write(f"    {original_name}")
        except Exception as e:
            stdout.write(f"    [warn] Could not download {original_name}: {e}")

    if not downloaded:
        raise CommandError(
            "No images downloaded. Try --images-dir with a local folder instead."
        )

    downloaded.sort(key=lambda x: x[1].lower())
    return downloaded


def upload_image_via_api(image_path: str, server_url: str) -> str:
    """
    POST the image to the upload API.
    Returns the uploaded file URL on success, empty string on failure.
    """
    upload_endpoint = server_url.rstrip("/") + "/admin1/upload"
    with open(image_path, "rb") as f:
        resp = http_requests.post(
            upload_endpoint,
            files={"media": (os.path.basename(image_path), f)},
            timeout=30,
        )
    resp.raise_for_status()
    data = resp.json()
    return data.get("uploadedURL", "")


def upload_image_direct(image_path: str) -> str:
    """
    Save image directly using Django FileSystemStorage (no running server needed).
    Returns the full URL.
    """
    fs = FileSystemStorage()
    filename = fs.save("media/" + os.path.basename(image_path), open(image_path, "rb"))
    relative_url = fs.url(filename)
    base = getattr(settings, "SITE_URL", "http://127.0.0.1:8000")
    return base.rstrip("/") + relative_url


def normalize(text: str) -> str:
    """Lowercase, strip non-alphanumeric chars for comparison."""
    return re.sub(r"[^a-z0-9]", "", text.lower())


def match_image_to_article(
    images: list[tuple[str, str]], article_index: int, title: str
) -> tuple[str, str] | None:
    """
    Match an image to an article by title.
    images: list of (local_path, original_drive_name)

    Strategy 1: normalized original name contains normalized title (or vice versa).
    Strategy 2: highest word-overlap score between name and title.
    Strategy 3: positional fallback.
    """
    norm_title = normalize(title)

    # Strategy 1: containment on normalized strings
    for local_path, orig_name in images:
        stem = os.path.splitext(orig_name)[0]
        stem_clean = re.sub(r"^[A-Za-z0-9]+[_\s]", "", stem).strip()
        norm_full = normalize(stem)
        norm_clean = normalize(stem_clean)
        if norm_title in norm_full or norm_full in norm_title:
            return local_path, orig_name
        if norm_title in norm_clean or norm_clean in norm_title:
            return local_path, orig_name

    # Strategy 2: word overlap
    title_words = set(normalize(w) for w in title.split() if len(w) > 3)
    best, best_score = None, 0
    for local_path, orig_name in images:
        stem = re.sub(r"[_\-]", " ", os.path.splitext(orig_name)[0])
        stem_words = set(normalize(w) for w in stem.split() if len(w) > 3)
        score = len(title_words & stem_words)
        if score > best_score:
            best_score = score
            best = (local_path, orig_name)
    if best and best_score >= 3:
        return best

    # Strategy 3: positional fallback
    idx = article_index - 1
    if 0 <= idx < len(images):
        return images[idx]
    return None


# ── Command ───────────────────────────────────────────────────────────────────

class Command(BaseCommand):
    help = "Auto-extract and upload news articles (+ images) from a PDF using Claude AI"

    def add_arguments(self, parser):
        parser.add_argument(
            "--pdf",
            required=True,
            help="Path to the PDF file containing news articles",
        )
        parser.add_argument(
            "--drive",
            default=None,
            help="Google Drive folder URL containing news images (folder must be 'Anyone with the link')",
        )
        parser.add_argument(
            "--images-dir",
            default=None,
            help="Local folder path containing news images (alternative to --drive)",
        )
        parser.add_argument(
            "--server-url",
            default="http://127.0.0.1:8000",
            help="Base URL of the running Django server for image uploads (default: http://127.0.0.1:8000)",
        )
        parser.add_argument(
            "--direct-upload",
            action="store_true",
            help="Save images directly via FileSystemStorage (no running server needed)",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Extract and preview without saving anything to the database",
        )
        parser.add_argument(
            "--top-news",
            action="store_true",
            help="Mark all uploaded articles as top news",
        )
        parser.add_argument(
            "--api-key",
            default=None,
            help="Anthropic API key (defaults to ANTHROPIC_API_KEY in settings)",
        )

    def handle(self, *args, **options):
        pdf_path = options["pdf"]
        drive_url = options["drive"]
        images_dir = options["images_dir"]
        server_url = options["server_url"]
        direct_upload = options["direct_upload"]
        dry_run = options["dry_run"]
        is_top_news = "Yes" if options["top_news"] else "No"
        api_key = (
            options["api_key"]
            or os.environ.get("ANTHROPIC_API_KEY", "")
            or getattr(settings, "ANTHROPIC_API_KEY", "")
        )

        if not os.path.isfile(pdf_path):
            raise CommandError(f"PDF not found: {pdf_path}")
        if not api_key:
            raise CommandError(
                "Anthropic API key required. Set ANTHROPIC_API_KEY in settings.py."
            )

        client = anthropic.Anthropic(api_key=api_key)

        # ── Step 1: extract PDF text ──────────────────────────────────────────
        self.stdout.write(f"\nReading PDF: {os.path.basename(pdf_path)}")
        pdf_text = extract_text_from_pdf(pdf_path)
        self.stdout.write(f"  {len(pdf_text):,} characters extracted")

        # ── Step 2: collect images (Drive or local folder) ────────────────────
        tmp_dir = None
        images = []

        if images_dir:
            # Local folder — store as (path, filename) tuples
            if not os.path.isdir(images_dir):
                raise CommandError(f"Images directory not found: {images_dir}")
            for f in sorted(os.listdir(images_dir)):
                if os.path.splitext(f)[1].lower() in IMAGE_EXTENSIONS:
                    images.append((os.path.join(images_dir, f), f))
            self.stdout.write(f"\nLoaded {len(images)} image(s) from local folder: {images_dir}")
            for _, fname in images:
                self.stdout.write(f"    {fname}")

        elif drive_url:
            tmp_dir = tempfile.mkdtemp(prefix="ldz_news_images_")
            try:
                images = download_drive_folder(drive_url, tmp_dir, self.stdout)
            except CommandError as e:
                shutil.rmtree(tmp_dir, ignore_errors=True)
                self.stdout.write(self.style.ERROR(str(e)))
                self.stdout.write(self.style.WARNING(
                    "\nTIP: Open the Drive folder -> Share -> Change to 'Anyone with the link'.\n"
                    "Or download the images locally and use --images-dir instead.\n"
                ))
                raise

        # ── Step 3: get article list from Claude ──────────────────────────────
        self.stdout.write("\nStep 1/2 — Fetching article list from Claude...")
        try:
            list_raw = call_claude(client, LIST_PROMPT, pdf_text)
            list_data = json.loads(list_raw)
            articles = list_data.get("articles", [])
        except json.JSONDecodeError as e:
            raise CommandError(f"Claude returned invalid JSON for article list: {e}")
        except anthropic.APIError as e:
            raise CommandError(f"Claude API error: {e}")

        if not articles:
            self.stdout.write(self.style.WARNING("No articles found in PDF."))
            return

        self.stdout.write(f"  Found {len(articles)} article(s)\n")

        # ── Step 4: process each article ─────────────────────────────────────
        self.stdout.write("Step 2/2 — Fetching body + uploading images...\n")
        created_count = 0
        skipped_count = 0

        for i, article in enumerate(articles, 1):
            title = article.get("newsTitle", "Untitled")
            category_name = article.get("category", "General")
            date_str = article.get("newsCreatedDate", "")
            article_index = article.get("index", i)

            self.stdout.write(f"  [{i:02d}/{len(articles)}] {title}")
            self.stdout.write(f"         Category : {category_name}  |  Date: {date_str}")

            if dry_run:
                if images:
                    matched = match_image_to_article(images, article_index, title)
                    img_name = matched[1] if matched else "NO MATCH"
                    self.stdout.write(f"         Image    : {img_name}")
                continue

            if generalNewsPoint.objects.filter(newsTitle=title, isDelete="No").exists():
                self.stdout.write(self.style.WARNING("         [skipped] already exists\n"))
                skipped_count += 1
                continue

            # ── fetch body ────────────────────────────────────────────────────
            try:
                body_raw = call_claude(client, BODY_PROMPT.format(title=title), pdf_text)
                body_data = json.loads(body_raw)
                news_description = body_data.get("newsDescription", "")
            except json.JSONDecodeError as e:
                self.stdout.write(self.style.WARNING(
                    f"         [warn] JSON body failed ({e}) — retrying as plain text..."
                ))
                try:
                    plain = call_claude_plain(
                        client, BODY_PROMPT_PLAIN.format(title=title), pdf_text
                    )
                    paragraphs = [p.strip() for p in plain.split("\n\n") if p.strip()]
                    news_description = "".join(f"<p>{p}</p>" for p in paragraphs)
                    self.stdout.write(
                        f"         Body     : {len(news_description)} chars "
                        f"({len(paragraphs)} paragraphs) [plain-text fallback]"
                    )
                except Exception as e2:
                    self.stdout.write(self.style.WARNING(
                        f"         [warn] Plain-text fallback also failed: {e2}"
                    ))
                    news_description = ""
            except anthropic.APIError as e:
                self.stdout.write(self.style.WARNING(f"         [warn] Body API error: {e}"))
                news_description = ""

            # ── upload image ──────────────────────────────────────────────────
            news_image_url = ""
            if images:
                match = match_image_to_article(images, article_index, title)
                if match:
                    matched_path, matched_orig_name = match
                    try:
                        if direct_upload:
                            news_image_url = upload_image_direct(matched_path)
                        else:
                            news_image_url = upload_image_via_api(matched_path, server_url)
                        self.stdout.write(f"         Image    : {matched_orig_name}")
                        self.stdout.write(f"         URL      : {news_image_url}")
                    except Exception as e:
                        self.stdout.write(self.style.WARNING(f"         [warn] Image upload failed ({matched_orig_name}): {e}"))
                else:
                    self.stdout.write(self.style.WARNING(f"         [warn] No matching image for article {article_index}"))

            # ── save to DB ────────────────────────────────────────────────────
            cat_obj = get_or_create_category(category_name)
            generalNewsPoint.objects.create(
                newsCategoryId=cat_obj,
                newsTitle=title,
                newsShortDescription=article.get("newsShortDescription", ""),
                newsDescription=news_description,
                newsPageUrl=article.get("newsPageUrl", ""),
                newsCreatedDate=date_str or None,
                isTopNews=is_top_news,
                newsMetaTitle=article.get("newsMetaTitle", title),
                newsMetaDescription=article.get("newsMetaDescription", ""),
                newsImage=news_image_url,
                newsImageAltText="",
                created_by="Admin",
                updated_by="Admin",
                isDelete="No",
            )
            self.stdout.write(self.style.SUCCESS("         [created]\n"))
            created_count += 1

        # ── Cleanup temp images ───────────────────────────────────────────────
        if tmp_dir:
            shutil.rmtree(tmp_dir, ignore_errors=True)

        # ── Summary ───────────────────────────────────────────────────────────
        if dry_run:
            self.stdout.write(
                self.style.WARNING(
                    f"Dry run complete — {len(articles)} articles previewed, nothing saved."
                )
            )
        else:
            self.stdout.write(
                self.style.SUCCESS(
                    f"Done. {created_count} created, {skipped_count} skipped."
                )
            )
