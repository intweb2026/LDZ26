"""
Upload key topics from PDF and navbar data from CSV files.

Usage:
    # All three in one go
    python manage.py upload_key_topics_and_nav \
        --pdf path/to/file.pdf \
        --nav-main path/to/NavMainCategories.csv \
        --nav-sub  path/to/NavSubCategories.csv

    # Key topics only
    python manage.py upload_key_topics_and_nav --pdf path/to/file.pdf

    # Navbar only
    python manage.py upload_key_topics_and_nav \
        --nav-main path/to/NavMainCategories.csv \
        --nav-sub  path/to/NavSubCategories.csv

    # Dry run (preview, no DB writes)
    python manage.py upload_key_topics_and_nav --pdf ... --nav-main ... --nav-sub ... --dry-run
"""

import csv
import json
import os

import anthropic
import fitz  # PyMuPDF
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from Myadmin.models import (
    homePageNavMainCategories,
    homePageNavSubCategories,
    keyPointsSectionPoints,
)


# ── Prompt ────────────────────────────────────────────────────────────────────



# ── Helpers ───────────────────────────────────────────────────────────────────

def extract_key_topics_from_pdf(pdf_path: str) -> list[dict]:
    """
    Extract key topics from the PDF by font name + size, matching by column.

    Confirmed PDF structure:
      - Title spans:       Montserrat-ExtraBold,  size 17-20
      - Description spans: Montserrat-Medium,     size 17-20
      - 3-column grid layout: each column has its own x-coordinate range.

    The PDF's internal span ordering does NOT follow reading order — column C
    spans can appear before column A spans in the byte stream. We therefore
    group spans by x-column first, then sort each column by y, so titles are
    always matched to the description that sits below them in the same column.
    """
    doc = fitz.open(pdf_path)

    # Pass 1 — find which pages contain ExtraBold-18 key topic titles
    title_pages: set[int] = set()
    all_raw: list[dict] = []
    for page_num, page in enumerate(doc):
        blocks = page.get_text("dict")["blocks"]
        for block in blocks:
            if block.get("type") != 0:
                continue
            for line in block.get("lines", []):
                for span in line.get("spans", []):
                    text = span.get("text", "").strip()
                    font = span.get("font", "").lower()
                    size = span.get("size", 0)
                    bbox = span.get("bbox", [0, 0, 0, 0])
                    if not text or "montserrat" not in font:
                        continue
                    is_title = "extrabold" in font and 17 <= size <= 20
                    is_desc  = "medium"    in font and 17 <= size <= 20
                    if is_title or is_desc:
                        if is_title:
                            title_pages.add(page_num)
                        all_raw.append({
                            "text": text,
                            "is_title": is_title,
                            "is_desc":  is_desc,
                            "x": bbox[0],
                            "y": bbox[1],
                            "page": page_num,
                        })
    doc.close()

    # Pass 2 — keep only spans that are on pages with titles
    spans = [sp for sp in all_raw if sp["page"] in title_pages]

    if not spans:
        return []

    # ── Cluster spans into columns by x-coordinate ────────────────────────────
    # Find natural x-breaks: sort unique x values, split where gap > 200px.
    xs = sorted(set(round(sp["x"]) for sp in spans))
    col_boundaries: list[float] = []
    prev = xs[0]
    col_boundaries.append(prev)
    for x in xs[1:]:
        if x - prev > 200:
            col_boundaries.append(x)
        prev = x

    def col_of(x: float) -> int:
        """Return the column index for a given x coordinate."""
        best = 0
        best_dist = abs(x - col_boundaries[0])
        for i, bx in enumerate(col_boundaries):
            d = abs(x - bx)
            if d < best_dist:
                best_dist = d
                best = i
        return best

    # Group spans by (page, column), sorted by y within each group
    from collections import defaultdict
    columns: dict = defaultdict(list)
    for sp in spans:
        key = (sp["page"], col_of(sp["x"]))
        columns[key].append(sp)

    for key in columns:
        columns[key].sort(key=lambda s: s["y"])

    # ── Build topics within each column ───────────────────────────────────────
    # Process columns in reading order: page asc, then column asc
    topics: list[dict] = []
    for key in sorted(columns.keys()):
        col_spans = columns[key]
        title_parts: list[str] = []
        desc_parts:  list[str] = []

        def flush_col():
            if title_parts:
                topics.append({
                    "pointLabel":       " ".join(title_parts).strip(),
                    "pointDescription": " ".join(desc_parts).strip(),
                    # Store column key for final sort
                    "_key": key,
                    "_title_y": col_spans[0]["y"] if col_spans else 0,
                })
                title_parts.clear()
                desc_parts.clear()

        for sp in col_spans:
            if sp["is_title"]:
                # New ExtraBold after description = previous topic done
                if desc_parts:
                    flush_col()
                title_parts.append(sp["text"])
            elif sp["is_desc"] and title_parts:
                desc_parts.append(sp["text"])

        flush_col()

    # Sort all collected topics by (page, column, y) for natural reading order
    topics.sort(key=lambda t: (t["_key"][0], t["_title_y"], t["_key"][1]))

    # Strip internal sort keys before returning
    for t in topics:
        t.pop("_key", None)
        t.pop("_title_y", None)

    return topics


def read_csv_rows(filepath: str) -> list[list[str]]:
    rows = []
    with open(filepath, newline="", encoding="utf-8-sig") as f:
        reader = csv.reader(f)
        for row in reader:
            if any(cell.strip() for cell in row):
                rows.append(row)
    return rows


# ── Column indices ─────────────────────────────────────────────────────────────
# NavMainCategories.csv:
#   0=id  1=name  2=path  3=created_at  4=updated_at  5=created_by
#   6=updated_by  7=isChecked  8=isDelete

# NavSubCategories.csv:
#   0=id  1=name  2=path  3=created_at  4=updated_at  5=created_by
#   6=updated_by  7=isChecked  8=main_category_id  9=isDelete


# ── Command ───────────────────────────────────────────────────────────────────

class Command(BaseCommand):
    help = "Upload key topics from PDF and navbar categories from CSV files"

    def add_arguments(self, parser):
        parser.add_argument(
            "--pdf",
            default=None,
            help="Path to PDF file — extracts key topics into keyPointsSectionPoints",
        )
        parser.add_argument(
            "--nav-main",
            default=None,
            dest="nav_main",
            help="Path to NavMainCategories CSV file",
        )
        parser.add_argument(
            "--nav-sub",
            default=None,
            dest="nav_sub",
            help="Path to NavSubCategories CSV file (requires --nav-main)",
        )
        parser.add_argument(
            "--api-key",
            default=None,
            help="Anthropic API key (defaults to ANTHROPIC_API_KEY in settings)",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Preview extracted data without writing to the database",
        )

    def handle(self, *args, **options):
        pdf_path = options["pdf"]
        nav_main_path = options["nav_main"]
        nav_sub_path = options["nav_sub"]
        dry_run = options["dry_run"]
        api_key = (
            options["api_key"]
            or os.environ.get("ANTHROPIC_API_KEY", "")
            or getattr(settings, "ANTHROPIC_API_KEY", "")
        )

        if not any([pdf_path, nav_main_path, nav_sub_path]):
            raise CommandError(
                "Provide at least one of: --pdf, --nav-main, --nav-sub"
            )

        if nav_sub_path and not nav_main_path:
            raise CommandError("--nav-sub requires --nav-main to resolve FK relationships")

        if dry_run:
            self.stdout.write(self.style.WARNING("\n[DRY RUN] No database writes will occur.\n"))

        # ── 1. Key topics from PDF ────────────────────────────────────────────
        if pdf_path:
            self._upload_key_topics(pdf_path, api_key, dry_run)  # api_key unused but kept for future use

        # ── 2. Nav main categories ────────────────────────────────────────────
        main_id_map = {}  # {original_csv_id: homePageNavMainCategories instance}
        if nav_main_path:
            main_id_map = self._upload_nav_main(nav_main_path, dry_run)

        # ── 3. Nav sub categories ─────────────────────────────────────────────
        if nav_sub_path:
            self._upload_nav_sub(nav_sub_path, main_id_map, dry_run)

        self.stdout.write(self.style.SUCCESS("\nAll done.\n"))

    # ── Key topics ────────────────────────────────────────────────────────────

    def _upload_key_topics(self, pdf_path: str, api_key: str, dry_run: bool):
        if not os.path.isfile(pdf_path):
            raise CommandError(f"PDF not found: {pdf_path}")

        self.stdout.write(f"\n--- Key Topics ---")
        self.stdout.write(f"Extracting from PDF: {os.path.basename(pdf_path)}")

        topics = extract_key_topics_from_pdf(pdf_path)

        if not topics:
            self.stdout.write(self.style.WARNING("  No key topics found in PDF."))
            return

        self.stdout.write(f"  Found {len(topics)} key topic(s)\n")

        created = skipped = 0
        for i, topic in enumerate(topics, 1):
            label = topic.get("pointLabel", "").strip()
            description = topic.get("pointDescription", "").strip()

            if not label:
                self.stdout.write(self.style.WARNING(f"  [{i:02d}] [skip] empty label"))
                continue

            self.stdout.write(f"  [{i:02d}] {label}")
            self.stdout.write(f"       Description ({len(description)} chars): {description[:150]}{'...' if len(description) > 150 else ''}")

            if dry_run:
                continue

            if keyPointsSectionPoints.objects.filter(
                pointLabel=label, isDelete="No"
            ).exists():
                self.stdout.write(self.style.WARNING("       [skipped] already exists"))
                skipped += 1
                continue

            keyPointsSectionPoints.objects.create(
                pointLabel=label,
                pointDescription=description,
                created_by="Admin",
                updated_by="Admin",
                isDelete="No",
            )
            self.stdout.write(self.style.SUCCESS("       [created]"))
            created += 1

        if not dry_run:
            self.stdout.write(
                self.style.SUCCESS(f"\nKey topics: {created} created, {skipped} skipped.")
            )

    # ── Nav main categories ───────────────────────────────────────────────────

    def _upload_nav_main(self, csv_path: str, dry_run: bool) -> dict:
        """
        Returns {original_csv_id: homePageNavMainCategories instance} for FK resolution.
        """
        if not os.path.isfile(csv_path):
            raise CommandError(f"CSV not found: {csv_path}")

        self.stdout.write(f"\n--- Nav Main Categories ---")
        rows = read_csv_rows(csv_path)
        self.stdout.write(f"  {len(rows)} row(s) found in {os.path.basename(csv_path)}\n")

        created = skipped = 0
        id_map = {}

        for row in rows:
            if len(row) < 9:
                self.stdout.write(self.style.WARNING(f"  [skip] short row: {row}"))
                continue

            original_id   = row[0].strip()
            name          = row[1].strip()
            path          = row[2].strip()
            created_by    = row[5].strip() or "Admin"
            updated_by    = row[6].strip() or "Admin"
            is_delete     = row[7].strip()   # col-8
            is_checked    = row[8].strip()   # col-9

            self.stdout.write(f"  {name}  ({path})  isDelete={is_delete}")

            if dry_run:
                continue

            obj, was_created = homePageNavMainCategories.objects.get_or_create(
                navMainCategoryName=name,
                defaults={
                    "navMainCategoryPath": path,
                    "isChecked": is_checked,
                    "created_by": created_by,
                    "updated_by": updated_by,
                    "isDelete": is_delete,
                },
            )

            if not was_created:
                # Update fields in case they changed
                obj.navMainCategoryPath = path
                obj.isChecked = is_checked
                obj.isDelete = is_delete
                obj.updated_by = updated_by
                obj.save()
                self.stdout.write(self.style.WARNING("       [updated]"))
                skipped += 1
            else:
                self.stdout.write(self.style.SUCCESS("       [created]"))
                created += 1

            id_map[original_id] = obj

        if not dry_run:
            self.stdout.write(
                self.style.SUCCESS(
                    f"\nNav main: {created} created, {skipped} updated/skipped."
                )
            )
        return id_map

    # ── Nav sub categories ────────────────────────────────────────────────────

    def _upload_nav_sub(self, csv_path: str, main_id_map: dict, dry_run: bool):
        if not os.path.isfile(csv_path):
            raise CommandError(f"CSV not found: {csv_path}")

        self.stdout.write(f"\n--- Nav Sub Categories ---")
        rows = read_csv_rows(csv_path)
        self.stdout.write(f"  {len(rows)} row(s) found in {os.path.basename(csv_path)}\n")

        created = skipped = warn = 0

        for row in rows:
            if len(row) < 10:
                self.stdout.write(self.style.WARNING(f"  [skip] short row: {row}"))
                continue

            name          = row[1].strip()
            path          = row[2].strip()
            created_by    = row[5].strip() or "Admin"
            updated_by    = row[6].strip() or "Admin"
            is_delete     = row[7].strip()   # col-8
            main_csv_id   = row[8].strip()   # col-9
            is_checked    = row[9].strip()   # col-10

            # Resolve parent FK
            parent_obj = main_id_map.get(main_csv_id)
            if parent_obj is None and not dry_run:
                # Fall back: look up by original ID in the DB
                try:
                    parent_obj = homePageNavMainCategories.objects.get(pk=int(main_csv_id))
                except (homePageNavMainCategories.DoesNotExist, ValueError):
                    self.stdout.write(
                        self.style.WARNING(
                            f"  [warn] {name}: parent id={main_csv_id} not found — skipping"
                        )
                    )
                    warn += 1
                    continue

            self.stdout.write(
                f"  {name}  ({path})  parent_id={main_csv_id}  isDelete={is_delete}"
            )

            if dry_run:
                continue

            obj, was_created = homePageNavSubCategories.objects.get_or_create(
                navSubCategoryName=name,
                navMainCategoryId=parent_obj,
                defaults={
                    "navSubCategoryPath": path,
                    "isChecked": is_checked,
                    "created_by": created_by,
                    "updated_by": updated_by,
                    "isDelete": is_delete,
                },
            )

            if not was_created:
                obj.navSubCategoryPath = path
                obj.isChecked = is_checked
                obj.isDelete = is_delete
                obj.updated_by = updated_by
                obj.save()
                self.stdout.write(self.style.WARNING("       [updated]"))
                skipped += 1
            else:
                self.stdout.write(self.style.SUCCESS("       [created]"))
                created += 1

        if not dry_run:
            self.stdout.write(
                self.style.SUCCESS(
                    f"\nNav sub: {created} created, {skipped} updated/skipped, {warn} warnings."
                )
            )
