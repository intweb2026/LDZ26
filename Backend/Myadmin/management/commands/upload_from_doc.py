"""
Upload Google Doc content to Django models using section-specific parsers.

The Google Doc HTML is downloaded on-the-fly. The command is idempotent —
running it multiple times updates existing records rather than duplicating.

Usage:
    python manage.py upload_from_doc
    python manage.py upload_from_doc --dry-run
    python manage.py upload_from_doc --doc-url "https://docs.google.com/..."
"""

import re
import urllib.request

from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand, CommandError

from Event.models import (
    eventCoreAttandees,
    eventDetails,
    eventExpertSpeakers,
    eventGeneralSettings,
    eventIndustryTrends,
    eventParticipatedIndustries,
    eventSpeakers,
    eventSponsors,
    eventTestimonials,
    relatedEvents,
)
from Myadmin.models import (
    contactUsHelpData,
    countSectionTopic,
    homePageThirdSection,
    keyPointsSectionPoints,
    mediaPageHelpers,
    pastAttandeeHomeData,
    speakerPageData,
    sponsorPageData,
    themeColorSettings,
    whoShouldAttendPageData,
)

DOC_URL = (
    "https://docs.google.com/document/d/"
    "12qxtOc-npzjKFnOK29WOT4doDhNR5C5GLf27IpaQWRE/export?format=html"
)

# ── CSS class detection (Google Docs regenerates class names on every export) ──

_BOLD_CLASSES: frozenset = frozenset()
_HIGHLIGHT_CLASSES: frozenset = frozenset()   # yellow / orange highlight marks


def _init_css_classes(soup) -> None:
    """Parse the embedded CSS and populate _BOLD_CLASSES and _HIGHLIGHT_CLASSES.
    Google Docs regenerates CSS class names on every export, so this must run
    once after BeautifulSoup parsing."""
    global _BOLD_CLASSES, _HIGHLIGHT_CLASSES
    style_text = " ".join(st.get_text() for st in soup.find_all("style"))
    _BOLD_CLASSES = frozenset(
        re.findall(r"\.(c\d+)\{[^}]*font-weight:700[^}]*\}", style_text)
    )
    hl = set()
    for m in re.finditer(r"\.(c\d+)\{([^}]+)\}", style_text):
        bg = re.search(r"background-color:([^;]+)", m.group(2))
        if bg:
            color = bg.group(1).strip().lower()
            # Capture yellow (#ffff00), orange (#ff9900) and gold (#f1c232)
            if color in ("#ffff00", "#ff9900", "#f1c232"):
                hl.add(m.group(1))
    _HIGHLIGHT_CLASSES = frozenset(hl)


# ── HTML helpers ───────────────────────────────────────────────────────────────

def _download_html(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8")


def _clean(text: str) -> str:
    """Normalise whitespace and non-breaking spaces."""
    text = text.replace("\xa0", " ").replace("&nbsp;", " ")
    return re.sub(r"\s+", " ", text).strip()


def _get_text(elem) -> str:
    return _clean(elem.get_text(separator=" "))


def _is_bold(span) -> bool:
    """True if span has font-weight:700 (detected dynamically from the CSS)."""
    return bool(set(span.get("class") or []) & _BOLD_CLASSES)


def _value_from_p(p) -> str:
    """
    From a paragraph whose first bold span(s) form a KEY, return the VALUE text
    that follows — stripping any leading colon / dash / whitespace.
    """
    spans = p.find_all("span")
    collecting = False
    parts = []
    for span in spans:
        text = _clean(span.get_text())
        if not text:
            continue
        if _is_bold(span):
            collecting = True   # skip the key span itself
            continue
        if collecting:
            parts.append(text)
    raw = " ".join(parts)
    return re.sub(r"^[\s:;\-–—]+", "", raw).strip()


def _bold_key_of_p(p) -> str:
    """Return the concatenated text of all bold spans in paragraph (the key label)."""
    parts = []
    for span in p.find_all("span"):
        if _is_bold(span):
            text = _clean(span.get_text())
            if text:
                parts.append(text)
    raw = " ".join(parts)
    # Strip trailing colon/dash punctuation
    return re.sub(r"[\s:;\-–—]+$", "", raw).strip()


def _p_to_ck(p, include_bold_spans=False) -> str:
    """
    Convert a single <p> element to a CKEditor <p>text</p> fragment.
    Bold spans are wrapped in <strong> when include_bold_spans=True.
    Returns "" for empty paragraphs.
    """
    parts = []
    for child in p.children:
        if child.name == "br":
            parts.append(" ")
            continue
        if child.name in ("span", "a"):
            text = _clean(child.get_text())
            if not text:
                continue
            if include_bold_spans and child.name == "span" and _is_bold(child):
                parts.append(f"<strong>{text}</strong>")
            else:
                parts.append(text)
        elif child.name is None:
            # NavigableString directly inside <p> (no wrapping span)
            text = _clean(str(child))
            if text:
                parts.append(text)
    result = " ".join(parts).strip()
    result = re.sub(r"\s+", " ", result).strip()
    return f"<p>{result}</p>" if result else ""


def _list_to_ck(list_elem) -> str:
    """Convert <ul>/<ol> to CKEditor HTML."""
    tag = list_elem.name  # ul or ol
    items = []
    for li in list_elem.find_all("li", recursive=False):
        text = _clean(li.get_text(separator=" "))
        if text:
            items.append(f"<li>{text}</li>")
    return f"<{tag}>{''.join(items)}</{tag}>" if items else ""


def _elems_to_ck(elements) -> str:
    """Convert a sequence of <p>/<ul>/<ol> elements to CKEditor HTML."""
    parts = []
    for elem in elements:
        if elem.name in ("ul", "ol"):
            parts.append(_list_to_ck(elem))
        elif elem.name == "p":
            parts.append(_p_to_ck(elem, include_bold_spans=True))
    return "".join(p for p in parts if p)


def _is_section_header(p) -> bool:
    """True if the paragraph is a section heading.
    A section header has a bold+highlighted span AND no non-bold/non-highlighted
    value span.  This distinguishes section labels from key:value pairs (whose key
    span is also bold+highlighted but are followed by a plain value span)."""
    has_key_span = False    # bold + highlight
    has_value_span = False  # non-bold + non-highlighted (the value after the key)
    for span in p.find_all("span"):
        text = _clean(span.get_text())
        if not text or text in (":", "-", "–", "—"):
            continue
        classes = set(span.get("class") or [])
        is_b = bool(classes & _BOLD_CLASSES)
        is_h = bool(classes & _HIGHLIGHT_CLASSES)
        if is_b and is_h:
            has_key_span = True
        elif not is_b and not is_h:
            has_value_span = True
    return has_key_span and not has_value_span


def _p_is_empty(p) -> bool:
    return not _clean(p.get_text())


def _a_text(p) -> str:
    """Extract plain-text link value (strips mailto: prefix)."""
    a = p.find("a")
    if a:
        return _clean(a.get_text())
    return _value_from_p(p)


# ── Section-finding utilities ─────────────────────────────────────────────────

def _find_section(soup, *keywords) -> object | None:
    """
    Find first element (p/h3/h5) whose text contains ALL of the given keywords
    (case-insensitive).
    """
    for elem in soup.find_all(["p", "h3", "h5", "h4"]):
        text = _get_text(elem).lower()
        if all(kw.lower() in text for kw in keywords):
            return elem
    return None


def _siblings_until_section(start_elem, stop_keywords=None) -> list:
    """
    Collect next siblings of start_elem until a new section header or one of the
    stop_keywords is found.  stop_keywords is a list of strings; matching any one stops.
    """
    collected = []
    for sib in start_elem.next_siblings:
        if not hasattr(sib, "name") or sib.name is None:
            continue
        if sib.name in ("h3", "h5", "h4", "h2", "h1"):
            break
        if sib.name == "p" and _is_section_header(sib):
            sib_text = _get_text(sib).lower()
            # Only stop if it looks like a NEW section (not just a bold line within content)
            if stop_keywords and any(kw.lower() in sib_text for kw in stop_keywords):
                break
            # Generic: stop if the bold header text doesn't look like a key:value
            bold_text = _bold_key_of_p(sib)
            if bold_text and not re.search(r"[\-:]", _get_text(sib)):
                # It's a standalone header with no colon – stop
                break
        collected.append(sib)
    return collected


# ── Doc section parsers ────────────────────────────────────────────────────────

def parse_direct_kvs(soup) -> dict:
    """
    Extract top-level direct key:value pairs (no section header above them).
    Stops when "Website Theme Colors" section begins.
    """
    kvs = {}
    body = soup.body
    stop = False
    for elem in body.find_all(["p"], recursive=False):
        text_lower = _get_text(elem).lower()
        if "website theme colors" in text_lower:
            break
        # A key-value paragraph has a bold span followed by a value span
        bold = _bold_key_of_p(elem)
        if bold:
            # Normalize: strip trailing colon/dash/space
            key = re.sub(r"[\s:;\-–—]+$", "", bold).strip()
            val = _value_from_p(elem)
            if not val:
                # Value might span the next non-empty paragraph
                continue
            kvs[key] = val
    return kvs


def parse_theme_colors(soup) -> dict:
    start = _find_section(soup, "Website Theme Colors")
    if not start:
        return {}
    kvs = {}
    for sib in start.next_siblings:
        if not hasattr(sib, "name") or sib.name != "p":
            continue
        if _is_section_header(sib) and "website theme colors" not in _get_text(sib).lower():
            break
        bold = _bold_key_of_p(sib)
        val = _value_from_p(sib)
        if bold and val:
            key = re.sub(r"[\s:;\-–—]+$", "", bold).strip()
            kvs[key] = re.sub(r";$", "", val).strip()
    return kvs


def parse_event_tagline_desc(soup) -> str:
    """
    The Event Tagline Description value spans multiple paragraphs.
    Returns CKEditor HTML.
    """
    start = _find_section(soup, "Event Tagline Description")
    if not start:
        return ""
    paras = []
    for sib in start.next_siblings:
        if not hasattr(sib, "name"):
            continue
        if sib.name == "p" and _is_section_header(sib):
            break
        if sib.name == "p" and not _p_is_empty(sib):
            paras.append(sib)
    return _elems_to_ck(paras)


def parse_key_topics(soup) -> list[dict]:
    """
    Parse Topic1/Description1 ... Topic6/Description6 pairs.
    Returns list of {pointLabel, pointDescription}.
    """
    start = _find_section(soup, "Event Key Topics")
    if not start:
        return []
    topics_raw = {}  # {n: {label, desc}}
    for sib in start.next_siblings:
        if not hasattr(sib, "name") or sib.name != "p":
            continue
        if _is_section_header(sib) and "event key topics" not in _get_text(sib).lower():
            break
        bold = _bold_key_of_p(sib)
        val = _value_from_p(sib)
        if not bold:
            continue
        topic_m = re.search(r"topic\s*(\d+)", bold, re.IGNORECASE)
        desc_m  = re.search(r"description\s*(\d+)", bold, re.IGNORECASE)
        if topic_m and desc_m:
            # TopicN and DescriptionN are merged in the same <p> (doc formatting error).
            # Walk spans to split their values correctly.
            n = int(topic_m.group(1))
            topics_raw.setdefault(n, {})
            topic_parts, desc_parts = [], []
            in_topic = in_desc = False
            for sp in sib.find_all("span"):
                sp_text = _clean(sp.get_text())
                if not sp_text:
                    continue
                if _is_bold(sp):
                    sp_lower = re.sub(r"[\s\-:]+", " ", sp_text).strip().lower()
                    if re.search(r"topic\s*\d+", sp_lower):
                        in_topic, in_desc = True, False
                    elif re.search(r"description\s*\d+", sp_lower):
                        in_topic, in_desc = False, True
                elif in_topic:
                    topic_parts.append(sp_text)
                elif in_desc:
                    desc_parts.append(sp_text)
            topic_val = re.sub(r"^[\s:;\-–—]+", "", " ".join(topic_parts)).strip()
            desc_val  = re.sub(r"^[\s:;\-–—]+", "", " ".join(desc_parts)).strip()
            topics_raw[n]["label"] = topic_val
            if desc_val:
                topics_raw[n]["desc"] = f"<p>{desc_val}</p>"
        else:
            # Normal: single key in this paragraph
            m = re.match(r"(topic|description)\s*(\d+)", bold, re.IGNORECASE)
            if m:
                kind = m.group(1).lower()
                n = int(m.group(2))
                topics_raw.setdefault(n, {})
                if kind == "topic":
                    topics_raw[n]["label"] = val
                else:
                    topics_raw[n]["desc"] = f"<p>{val}</p>" if val else ""
    return [
        {"pointLabel": topics_raw[n].get("label", ""),
         "pointDescription": topics_raw[n].get("desc", "")}
        for n in sorted(topics_raw)
    ]


def parse_testimonials(soup) -> list[dict]:
    """
    Parse TestimonialSpeakerN / TestimonialCompanyN / TestimonialN groups.
    Returns list of {personName, personCompany, personMessage}.
    """
    start = _find_section(soup, "Event Testimonials")
    if not start:
        return []
    raw = {}
    for sib in start.next_siblings:
        if not hasattr(sib, "name") or sib.name != "p":
            continue
        if _is_section_header(sib) and "testimonial" not in _get_text(sib).lower():
            break
        bold = _bold_key_of_p(sib)
        val = _value_from_p(sib)
        if not bold:
            continue
        m = re.match(r"(testimonialspeaker|testimonialcompany|testimonial)\s*(\d+)", bold, re.IGNORECASE)
        if m:
            kind = m.group(1).lower()
            n = int(m.group(2))
            raw.setdefault(n, {})
            if kind == "testimonialspeaker":
                raw[n]["name"] = val
            elif kind == "testimonialcompany":
                raw[n]["company"] = val
            else:
                raw[n]["message"] = val
    return [
        {"personName": raw[n].get("name", ""),
         "personCompany": raw[n].get("company", ""),
         "personMessage": raw[n].get("message", "")}
        for n in sorted(raw)
    ]


def parse_expert_speakers(soup) -> list[dict]:
    """
    Parse Expert Name / Expert Company pairs under 'Expert Speakers' section.
    Returns list of {expertSpeakerName, expertSpeakerCompany}.
    """
    start = _find_section(soup, "Expert Speaker")
    if not start:
        return []
    current = {}
    results = []
    for sib in start.next_siblings:
        if not hasattr(sib, "name") or sib.name != "p":
            continue
        if _is_section_header(sib) and "expert speaker" not in _get_text(sib).lower():
            break
        text = _get_text(sib)
        if re.match(r"^\d+\s*\.$", text):
            if current:
                results.append(current)
            current = {}
            continue
        bold = _bold_key_of_p(sib)
        val = _value_from_p(sib)
        if not bold:
            continue
        bold_norm = bold.lower()
        if "expert name" in bold_norm:
            current["expertSpeakerName"] = val
        elif "expert company" in bold_norm:
            current["expertSpeakerCompany"] = val
    if current:
        results.append(current)
    return results


def parse_industry_trends(soup) -> list[dict]:
    """
    Parse 5 industry trends. Each has a h3 header + Short/Long descriptions.
    Long Description can span many paragraphs.
    Returns list of {trendTitle, trendShortDescription, trendLongDescription}.
    """
    results = []
    for h3 in soup.find_all("h3"):
        h3_text = _get_text(h3)
        m = re.match(r"\d+\.\s*Trend Name\s*[:\-–]?\s*(.+)", h3_text, re.IGNORECASE)
        if not m:
            continue
        trend_title = m.group(1).strip()
        trend = {"trendTitle": trend_title, "trendShortDescription": "", "trendLongDescription": ""}
        long_desc_paras = []
        in_long_desc = False

        for sib in h3.next_siblings:
            if not hasattr(sib, "name"):
                continue
            if sib.name == "h3":
                break
            if sib.name == "p":
                sib_text = _get_text(sib)
                if re.search(r"short\s*description\s*[:\-]", sib_text, re.IGNORECASE):
                    val = _value_from_p(sib)
                    trend["trendShortDescription"] = f"<p>{val}</p>" if val else ""
                    in_long_desc = False
                    continue
                if re.search(r"long\s*description\s*[:\-]", sib_text, re.IGNORECASE):
                    inline_val = _value_from_p(sib)
                    if inline_val:
                        long_desc_paras.append(f"<p>{inline_val}</p>")
                    in_long_desc = True
                    continue
                if in_long_desc and not _p_is_empty(sib):
                    long_desc_paras.append(_p_to_ck(sib, include_bold_spans=True))

        trend["trendLongDescription"] = "".join(long_desc_paras)
        results.append(trend)
    return results


def parse_speakers(soup) -> list[dict]:
    """
    Parse all speakers. Each speaker block starts with Speaker:- N header.
    LongBio continues across <p class="c11"> paragraphs until next key or speaker.
    Returns list of {eventSpeakerName, eventSpeakerCompany, eventSpeakerShortDescription,
                     eventSpeakerDescription, eventSpeakerLinkedinFollowers}.
    """
    # Find the first "Event Speakers:" section header
    start = _find_section(soup, "Event Speakers")
    if not start:
        return []

    results = []
    current: dict = {}
    long_bio_paras: list = []
    in_long_bio = False

    def flush_speaker():
        if current:
            if long_bio_paras:
                current["eventSpeakerDescription"] = "".join(long_bio_paras)
            results.append(dict(current))
        current.clear()
        long_bio_paras.clear()

    for sib in start.next_siblings:
        if not hasattr(sib, "name") or sib.name not in ("p", "h3", "h5"):
            continue

        sib_text = _get_text(sib)

        # Detect "Speaker:- N" header
        if re.search(r"speaker\s*[:\-–]+\s*\d+", sib_text, re.IGNORECASE):
            flush_speaker()
            in_long_bio = False
            current.clear()
            long_bio_paras.clear()
            continue

        # Stop at unrelated section
        if _is_section_header(sib) and not re.search(
            r"speaker\s*[:\-–]+\s*\d+", sib_text, re.IGNORECASE
        ):
            if "event speaker" not in sib_text.lower() and sib_text.strip():
                break

        bold = _bold_key_of_p(sib)
        if not bold:
            # Continuation paragraph for LongBio
            if in_long_bio and not _p_is_empty(sib):
                long_bio_paras.append(_p_to_ck(sib))
            continue

        bold_norm = re.sub(r"[\s\-:]+", " ", bold).strip().lower()

        if "name" in bold_norm and "company" not in bold_norm:
            in_long_bio = False
            current["eventSpeakerName"] = _value_from_p(sib)
        elif "companyname" in bold_norm or "company name" in bold_norm:
            in_long_bio = False
            current["eventSpeakerCompany"] = _value_from_p(sib)
        elif "shortbio" in bold_norm or "short bio" in bold_norm:
            in_long_bio = False
            val = _value_from_p(sib)
            current["eventSpeakerShortDescription"] = f"<p>{val}</p>" if val else ""
        elif "longbio" in bold_norm or "long bio" in bold_norm:
            in_long_bio = True
            inline = _value_from_p(sib)
            if inline:
                long_bio_paras.append(f"<p>{inline}</p>")
        elif "linkedinfollowers" in bold_norm or "linkedin followers" in bold_norm:
            in_long_bio = False
            val = _value_from_p(sib)
            try:
                current["eventSpeakerLinkedinFollowers"] = int(val)
            except (ValueError, TypeError):
                current["eventSpeakerLinkedinFollowers"] = 0

    flush_speaker()
    return results


def parse_related_events(soup) -> list[dict]:
    """
    Parse related events. First field is in <li>, rest in following <p> elements.
    Returns list of {eventName, eventDate, eventLocation, eventWebsiteLink}.
    """
    start = _find_section(soup, "Event Related Events")
    if not start:
        return []

    results = []
    current: dict = {}

    def flush():
        if current.get("eventName"):
            results.append(dict(current))
        current.clear()

    for sib in start.next_siblings:
        if not hasattr(sib, "name"):
            continue
        if sib.name in ("h3", "h5") or (sib.name == "p" and _is_section_header(sib)
                                          and "related event" not in _get_text(sib).lower()):
            break
        # Stop before sections that follow related events
        sib_lower = _get_text(sib).lower()
        if re.search(r"core attand|core attendee|industries and compan|past attendee|event statatic", sib_lower):
            break

        if sib.name == "ol":
            for li in sib.find_all("li"):
                flush()
                bold = _bold_key_of_p(li)
                val = _value_from_p(li)
                if not val:
                    val = _clean(li.get_text())
                if bold:
                    current["eventName"] = val
                else:
                    current["eventName"] = val
            continue

        if sib.name == "p":
            bold = _bold_key_of_p(sib)
            val = _value_from_p(sib)
            if not bold:
                continue
            bold_norm = re.sub(r"[\s\-:]+", " ", bold).strip().lower()
            if "related event date" in bold_norm:
                current["eventDate"] = val
            elif "related event location" in bold_norm:
                if "related event website" in bold_norm:
                    # Both fields are in the same <p> — walk spans to split them
                    loc_parts, ws_parts = [], []
                    in_loc = in_ws = False
                    for sp in sib.find_all("span"):
                        sp_text = _clean(sp.get_text())
                        if not sp_text:
                            continue
                        if _is_bold(sp):
                            sp_lower = re.sub(r"[\s\-:]+", " ", sp_text).strip().lower()
                            if "location" in sp_lower:
                                in_loc, in_ws = True, False
                            elif "website" in sp_lower:
                                in_loc, in_ws = False, True
                        elif in_loc:
                            loc_parts.append(sp_text)
                        elif in_ws:
                            ws_parts.append(sp_text)
                    current["eventLocation"] = re.sub(r"^[\s:;\-–—]+", "", " ".join(loc_parts)).strip()
                    a_tag = sib.find("a")
                    ws_text = _clean(a_tag.get_text()) if a_tag else re.sub(r"^[\s:;\-–—]+", "", " ".join(ws_parts)).strip()
                    if ws_text:
                        current["eventWebsiteLink"] = ws_text
                else:
                    current["eventLocation"] = val
            elif "related event website" in bold_norm:
                current["eventWebsiteLink"] = _a_text(sib)

    flush()
    return results


def parse_list_section(soup, section_keyword: str) -> list[str]:
    """
    Parse a simple ordered/unordered list section.
    Returns list of plain strings.
    Handles both a single <ol>/<ul> with many <li> items AND multiple
    separate <ol>/<ul> tags each containing one <li> (as Google Docs
    sometimes produces when the user types a numbered list item per line).
    """
    start = _find_section(soup, section_keyword)
    if not start:
        return []
    items = []
    for sib in start.next_siblings:
        if not hasattr(sib, "name"):
            continue
        if sib.name in ("h3", "h4", "h5"):
            break
        if sib.name == "p" and _is_section_header(sib):
            break
        if sib.name in ("ol", "ul"):
            for li in sib.find_all("li"):
                text = _clean(li.get_text())
                if text:
                    items.append(text)
    return items


def parse_statistics(soup) -> list[dict]:
    """
    Parse Event Statatics. Each stat: Topic (in <li>) + Count (in following <p>).
    Returns list of {topicLabel, topicCount}.
    """
    start = _find_section(soup, "Event Statatics")
    if not start:
        return []

    results = []
    current: dict = {}

    def flush():
        if current.get("topicLabel"):
            results.append(dict(current))
        current.clear()

    for sib in start.next_siblings:
        if not hasattr(sib, "name"):
            continue
        if sib.name in ("h3", "h5") or (
            sib.name == "p" and _is_section_header(sib)
            and "statatic" not in _get_text(sib).lower()
        ):
            break

        if sib.name == "ol":
            for li in sib.find_all("li"):
                flush()
                current["topicLabel"] = _value_from_p(li) or _clean(li.get_text())
            continue

        if sib.name == "p":
            bold = _bold_key_of_p(sib)
            val = _value_from_p(sib)
            if bold and "count" in bold.lower():
                current["topicCount"] = val
            elif bold and "plus icon" in bold.lower():
                current["countIcon"] = val

    flush()
    return results


def parse_media_persons(soup) -> list[dict]:
    """
    Parse Media Page Company Persons List.
    Returns list of {companyPersonName, companyPersonEmail, companyPersonPhone}.
    """
    start = _find_section(soup, "Media Page Company Persons")
    if not start:
        return []

    results = []
    current: dict = {}

    def flush():
        if current.get("companyPersonName"):
            results.append(dict(current))
        current.clear()

    for sib in start.next_siblings:
        if not hasattr(sib, "name"):
            continue
        if sib.name in ("h5", "h3") and "media" not in _get_text(sib).lower():
            break

        if sib.name == "ol":
            for li in sib.find_all("li"):
                flush()
                current["companyPersonName"] = _value_from_p(li) or _clean(li.get_text())
            continue

        if sib.name == "p":
            bold = _bold_key_of_p(sib)
            if not bold:
                continue
            val = _a_text(sib)
            bold_norm = bold.lower()
            if "email" in bold_norm:
                current["companyPersonEmail"] = val
            elif "contact" in bold_norm:
                current["companyPersonPhone"] = val

    flush()
    return results


def parse_contact_persons(soup) -> list[dict]:
    """
    Parse Contact Company Persons List.
    Returns list of {reasonToHelp, helpingPersonName, helpingPersonDesignation, helpingPersonEmail}.
    """
    start = _find_section(soup, "Contact Company Persons")
    if not start:
        return []

    results = []
    current: dict = {}

    def flush():
        if current.get("reasonToHelp"):
            results.append(dict(current))
        current.clear()

    for sib in start.next_siblings:
        if not hasattr(sib, "name"):
            continue
        if sib.name in ("h5", "h3") and "contact" not in _get_text(sib).lower():
            break

        if sib.name == "ol":
            for li in sib.find_all("li"):
                flush()
                current["reasonToHelp"] = _value_from_p(li) or _clean(li.get_text())
            continue

        if sib.name == "p":
            bold = _bold_key_of_p(sib)
            if not bold:
                continue
            val = _a_text(sib)
            bold_norm = bold.lower()
            if "person name" in bold_norm:
                current["helpingPersonName"] = val
            elif "person designation" in bold_norm:
                current["helpingPersonDesignation"] = val
            elif "person email" in bold_norm:
                current["helpingPersonEmail"] = val

    flush()
    return results


def parse_past_attendees(soup) -> list[str]:
    return parse_list_section(soup, "Event Home Page Past Attendees")


def parse_speaker_page(soup) -> dict:
    """
    Parse SPEAKER PAGE Para One and Para Two. Returns CKEditor HTML for each.
    """
    result = {"sectionFirstDescription": "", "sectionSecondDescription": ""}
    start = _find_section(soup, "SPEAKER", "PAGE")
    if not start:
        return result

    para_one_start = None
    para_two_start = None
    for sib in start.next_siblings:
        if not hasattr(sib, "name"):
            continue
        sib_text = _get_text(sib).lower()
        if "para one" in sib_text:
            para_one_start = sib
        elif "para two" in sib_text:
            para_two_start = sib
        elif "sponsor" in sib_text and _is_section_header(sib):
            break

    def collect_para(para_start, stop_keywords):
        if not para_start:
            return ""
        paras = []
        for sib in para_start.next_siblings:
            if not hasattr(sib, "name"):
                continue
            if sib.name in ("h3", "h5"):
                break
            if sib.name == "p" and _is_section_header(sib):
                sib_text = _get_text(sib).lower()
                if any(kw in sib_text for kw in stop_keywords):
                    break
            paras.append(sib)
        return _elems_to_ck(paras)

    result["sectionFirstDescription"] = collect_para(
        para_one_start, ["para two", "sponsor", "speaker page"]
    )
    result["sectionSecondDescription"] = collect_para(
        para_two_start, ["sponsor page", "event speaker"]
    )
    return result


def parse_sponsor_page(soup) -> str:
    """Return CKEditor HTML for the SPONSOR PAGE intro text."""
    start = _find_section(soup, "SPONSOR", "PAGE")
    if not start:
        return ""
    paras = []
    for sib in start.next_siblings:
        if not hasattr(sib, "name"):
            continue
        sib_text = _get_text(sib)
        if _is_section_header(sib) and "sponsor page" not in sib_text.lower():
            break
        if sib.name in ("h3", "h5"):
            break
        if sib.name == "p" and not _p_is_empty(sib):
            paras.append(sib)
    return _elems_to_ck(paras)


def parse_benefits_page(soup) -> dict:
    """
    Parse BENEFITS PAGE sections:
    - First Section Content: full BENEFITS text
    - Second Section Content: not in this doc's data
    - Who Should Attend Content, Core Attendees Content, Industries & Companies Content
    Returns dict with field names as keys and CKEditor HTML as values.
    """
    result = {
        "sectionFirstPoints": "",
        "sectionSecondPoints": "",
        "sectionThreeDescription": "",
        "sectionThreeTabOneDescription": "",
        "sectionThreeTabTwoDescription": "",
    }
    start = _find_section(soup, "BENEFITS PAGE")
    if not start:
        return result

    # Collect everything under "First Section Content" until next list item header
    current_field = None
    paras = []
    for sib in start.next_siblings:
        if not hasattr(sib, "name"):
            continue
        sib_text = _get_text(sib)
        sib_lower = sib_text.lower()

        if "first section content" in sib_lower:
            if current_field and paras:
                result[current_field] = _elems_to_ck(paras)
            current_field = "sectionFirstPoints"
            paras = []
            continue
        if "second section content" in sib_lower:
            if current_field and paras:
                result[current_field] = _elems_to_ck(paras)
            current_field = "sectionSecondPoints"
            paras = []
            continue
        if "who should attend content" in sib_lower:
            if current_field and paras:
                result[current_field] = _elems_to_ck(paras)
            current_field = "sectionThreeDescription"
            paras = []
            continue
        if ("core attand" in sib_lower or "core attendee" in sib_lower) and "content" in sib_lower:
            if current_field and paras:
                result[current_field] = _elems_to_ck(paras)
            current_field = "sectionThreeTabOneDescription"
            paras = []
            continue
        if "industries" in sib_lower and "content" in sib_lower:
            if current_field and paras:
                result[current_field] = _elems_to_ck(paras)
            current_field = "sectionThreeTabTwoDescription"
            paras = []
            continue

        # sectionThreeTabTwoDescription only holds the intro line; stop at
        # the next section header (Core Attendees:, Industries and Companies:, etc.)
        if current_field == "sectionThreeTabTwoDescription" and sib.name == "p" and (
            _is_section_header(sib)
            or re.search(r"core attand|core attendee|industries and compan", sib_lower)
        ):
            result[current_field] = _elems_to_ck(paras)
            break

        # Stop only when the next top-level PAGE section is reached
        if re.search(r"\bspeaker\b.{0,5}\bpage\b|\bsponsor\b.{0,5}\bpage\b", sib_lower) and current_field:
            break

        if current_field and sib.name in ("p", "ul", "ol") and not _p_is_empty(sib):
            paras.append(sib)

    if current_field and paras:
        result[current_field] = _elems_to_ck(paras)
    return result


def parse_sponsors(soup) -> list[dict]:
    """
    Parse Event Sponsors. Each block: Sponsor:- N header + Name/Type fields.
    Returns list of {sponsorComapnyName, sponsorType}.
    """
    start = _find_section(soup, "Event Sponsor")
    if not start:
        return []

    results = []
    current: dict = {}

    def flush():
        if current.get("sponsorComapnyName"):
            results.append(dict(current))
        current.clear()

    for sib in start.next_siblings:
        if not hasattr(sib, "name"):
            continue
        sib_text = _get_text(sib)
        if re.search(r"sponsor\s*[:\-–]+\s*\d+", sib_text, re.IGNORECASE):
            flush()
            continue
        if sib.name in ("h5", "h3") and "sponsor" not in sib_text.lower():
            break
        if sib.name == "p":
            bold = _bold_key_of_p(sib)
            val = _value_from_p(sib)
            if not bold:
                continue
            bold_norm = bold.lower()
            if bold_norm.startswith("name"):
                current["sponsorComapnyName"] = val
            elif bold_norm.startswith("type"):
                current["sponsorType"] = val

    flush()
    return results


# ── Django model upload helpers ────────────────────────────────────────────────

def _upsert_single(model, filter_kwargs, update_kwargs):
    """Get or create a record, then update it. Returns (obj, created)."""
    obj, created = model.objects.get_or_create(**filter_kwargs, defaults=update_kwargs)
    if not created:
        for k, v in update_kwargs.items():
            setattr(obj, k, v)
        obj.save()
    return obj, created


# ── Command ────────────────────────────────────────────────────────────────────

class Command(BaseCommand):
    help = "Upload Google Doc content to Django models"

    def add_arguments(self, parser):
        parser.add_argument(
            "--doc-url",
            default=DOC_URL,
            help="Google Doc HTML export URL",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Parse and preview without writing to DB",
        )

    def handle(self, *args, **options):
        doc_url = options["doc_url"]
        dry_run = options["dry_run"]

        if dry_run:
            self.stdout.write(self.style.WARNING("\n[DRY RUN] No DB writes.\n"))

        self.stdout.write("Downloading Google Doc HTML...")
        try:
            html = _download_html(doc_url)
        except Exception as e:
            raise CommandError(f"Failed to download doc: {e}")
        self.stdout.write(f"  Downloaded {len(html):,} chars")

        soup = BeautifulSoup(html, "html.parser")
        _init_css_classes(soup)
        self.stdout.write("  Parsed HTML\n")

        # ── Parse all sections ─────────────────────────────────────────────────
        direct_kvs      = parse_direct_kvs(soup)
        theme_colors    = parse_theme_colors(soup)
        tagline_desc    = parse_event_tagline_desc(soup)
        key_topics      = parse_key_topics(soup)
        testimonials    = parse_testimonials(soup)
        expert_speakers = parse_expert_speakers(soup)
        industry_trends = parse_industry_trends(soup)
        speakers        = parse_speakers(soup)
        related_evts    = parse_related_events(soup)
        core_attendees  = parse_list_section(soup, "Core Attendees")
        industries      = parse_list_section(soup, "Industries and Companies")
        past_attendees  = parse_past_attendees(soup)
        statistics      = parse_statistics(soup)
        media_persons   = parse_media_persons(soup)
        contact_persons = parse_contact_persons(soup)
        speaker_page    = parse_speaker_page(soup)
        sponsor_page    = parse_sponsor_page(soup)
        benefits_page   = parse_benefits_page(soup)
        sponsors        = parse_sponsors(soup)

        # ── Preview ────────────────────────────────────────────────────────────
        self.stdout.write(f"Direct KVs found:      {len(direct_kvs)}")
        self.stdout.write(f"Theme colors found:    {len(theme_colors)}")
        self.stdout.write(f"Key topics found:      {len(key_topics)}")
        self.stdout.write(f"Testimonials found:    {len(testimonials)}")
        self.stdout.write(f"Expert speakers found: {len(expert_speakers)}")
        self.stdout.write(f"Industry trends found: {len(industry_trends)}")
        self.stdout.write(f"Speakers found:        {len(speakers)}")
        self.stdout.write(f"Related events found:  {len(related_evts)}")
        self.stdout.write(f"Core attendees found:  {len(core_attendees)}")
        self.stdout.write(f"Industries found:      {len(industries)}")
        self.stdout.write(f"Past attendees found:  {len(past_attendees)}")
        self.stdout.write(f"Statistics found:      {len(statistics)}")
        self.stdout.write(f"Media persons found:   {len(media_persons)}")
        self.stdout.write(f"Contact persons found: {len(contact_persons)}")
        self.stdout.write(f"Sponsors found:        {len(sponsors)}")
        self.stdout.write("")

        if dry_run:
            self._print_preview(direct_kvs, theme_colors, tagline_desc, key_topics,
                                testimonials, expert_speakers, industry_trends, speakers,
                                related_evts, core_attendees, industries, past_attendees,
                                statistics, media_persons, contact_persons, speaker_page,
                                sponsor_page, benefits_page, sponsors)
            return

        # ── Upload ─────────────────────────────────────────────────────────────
        self._upload_event_details(direct_kvs)
        self._upload_event_general_settings(direct_kvs)
        self._upload_theme_colors(direct_kvs, theme_colors)
        self._upload_homepage_third_section(direct_kvs, tagline_desc)
        self._upload_key_topics(key_topics)
        self._upload_testimonials(testimonials)
        self._upload_expert_speakers(expert_speakers)
        self._upload_industry_trends(industry_trends)
        self._upload_speakers(speakers)
        self._upload_related_events(related_evts)
        self._upload_core_attendees(core_attendees)
        self._upload_industries(industries)
        self._upload_past_attendees(past_attendees)
        self._upload_statistics(statistics)
        self._upload_media_persons(media_persons)
        self._upload_contact_persons(contact_persons)
        self._upload_speaker_page(speaker_page)
        self._upload_sponsor_page(sponsor_page)
        self._upload_benefits_page(benefits_page)
        self._upload_sponsors(sponsors)

        self.stdout.write(self.style.SUCCESS("\nAll done.\n"))

    # ── Preview ────────────────────────────────────────────────────────────────

    def _print_preview(self, direct_kvs, theme_colors, tagline_desc, key_topics,
                       testimonials, expert_speakers, industry_trends, speakers,
                       related_evts, core_attendees, industries, past_attendees,
                       statistics, media_persons, contact_persons, speaker_page,
                       sponsor_page, benefits_page, sponsors):
        self.stdout.write("\n=== Direct KVs ===")
        for k, v in direct_kvs.items():
            self.stdout.write(f"  {k}: {v}")

        self.stdout.write("\n=== Theme Colors ===")
        for k, v in theme_colors.items():
            self.stdout.write(f"  {k}: {v}")

        self.stdout.write(f"\n=== Tagline Desc ({len(tagline_desc)} chars) ===")
        self.stdout.write(f"  {tagline_desc[:200]}...")

        self.stdout.write("\n=== Key Topics ===")
        for t in key_topics:
            self.stdout.write(f"  {t['pointLabel'][:60]}")
            self.stdout.write(f"    -> {t['pointDescription'][:80]}...")

        self.stdout.write("\n=== Testimonials ===")
        for t in testimonials:
            self.stdout.write(f"  {t['personName']} ({t['personCompany']}): {t['personMessage'][:60]}...")

        self.stdout.write("\n=== Expert Speakers ===")
        for s in expert_speakers:
            self.stdout.write(f"  {s.get('expertSpeakerName')} — {s.get('expertSpeakerCompany')}")

        self.stdout.write("\n=== Industry Trends ===")
        for t in industry_trends:
            self.stdout.write(f"  {t['trendTitle']}")
            self.stdout.write(f"    Short: {t['trendShortDescription'][:80]}...")
            self.stdout.write(f"    Long: {len(t['trendLongDescription'])} chars")

        self.stdout.write("\n=== Speakers ===")
        for s in speakers:
            self.stdout.write(f"  {s.get('eventSpeakerName')} — {s.get('eventSpeakerCompany')}")

        self.stdout.write("\n=== Related Events ===")
        for e in related_evts:
            self.stdout.write(f"  {e.get('eventName')} | {e.get('eventDate')} | {e.get('eventLocation')}")

        self.stdout.write(f"\n=== Core Attendees ({len(core_attendees)}) ===")
        for a in core_attendees[:5]:
            self.stdout.write(f"  {a}")

        self.stdout.write(f"\n=== Industries ({len(industries)}) ===")
        for i in industries[:5]:
            self.stdout.write(f"  {i}")

        self.stdout.write(f"\n=== Past Attendees ({len(past_attendees)}) ===")
        for a in past_attendees:
            self.stdout.write(f"  {a}")

        self.stdout.write("\n=== Statistics ===")
        for s in statistics:
            self.stdout.write(f"  {s.get('topicLabel')}: {s.get('topicCount')}")

        self.stdout.write("\n=== Media Persons ===")
        for p in media_persons:
            self.stdout.write(f"  {p.get('companyPersonName')} <{p.get('companyPersonEmail')}>")

        self.stdout.write("\n=== Contact Persons ===")
        for p in contact_persons:
            self.stdout.write(f"  {p.get('reasonToHelp')} — {p.get('helpingPersonName')}")

        self.stdout.write(f"\n=== Speaker Page Para1 ({len(speaker_page['sectionFirstDescription'])} chars) ===")
        self.stdout.write(f"\n=== Speaker Page Para2 ({len(speaker_page['sectionSecondDescription'])} chars) ===")
        self.stdout.write(f"\n=== Sponsor Page ({len(sponsor_page)} chars) ===")

        self.stdout.write("\n=== Benefits Page ===")
        for k, v in benefits_page.items():
            self.stdout.write(f"  {k}: {len(v)} chars")

        self.stdout.write("\n=== Sponsors ===")
        for s in sponsors:
            self.stdout.write(f"  {s.get('sponsorComapnyName')} [{s.get('sponsorType')}]")

    # ── Upload methods ─────────────────────────────────────────────────────────

    def _log(self, label, created):
        if created:
            self.stdout.write(self.style.SUCCESS(f"  [{label}] [created]"))
        else:
            self.stdout.write(self.style.WARNING(f"  [{label}] [updated]"))

    def _upload_event_details(self, kvs):
        self.stdout.write("\n--- eventDetails ---")
        mapping = {
            "Event Year":           "eventYear",
            "Event Name":           "eventName",
            "Event Date":           "eventDate",
            "Event Location":       "eventLocation",
            "Event Agenda Version": "agendaVersion",
            "SEO Enable":           "isSeoEnable",
            "Event Short Location": "eventShortLocation",
            "Event Short Code":     "eventShortCode",
            "Event City Short Code":"eventCityShortCode",
            "Stripe Mode":          "stripeMode",
        }
        update = {}
        for doc_key, field in mapping.items():
            for k, v in kvs.items():
                if k.lower() == doc_key.lower():
                    update[field] = v
                    break
        if not update:
            self.stdout.write(self.style.WARNING("  No eventDetails data found"))
            return
        try:
            obj = eventDetails.objects.first()
            if obj:
                for f, v in update.items():
                    setattr(obj, f, v)
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("  [updated]"))
            else:
                update["created_by"] = "Admin"
                update["updated_by"] = "Admin"
                eventDetails.objects.create(**update)
                self.stdout.write(self.style.SUCCESS("  [created]"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  [error] {e}"))

    def _upload_event_general_settings(self, kvs):
        self.stdout.write("\n--- eventGeneralSettings ---")
        currency = next((v for k, v in kvs.items() if "event currency symbol" in k.lower()), "")
        tax = next((v for k, v in kvs.items() if "purchase tax" in k.lower()), "")
        if not currency and not tax:
            self.stdout.write(self.style.WARNING("  No data found"))
            return
        try:
            obj = eventGeneralSettings.objects.first()
            if obj:
                if currency:
                    obj.currencySymbol = currency
                if tax:
                    obj.purchaseTaxPercent = tax
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("  [updated]"))
            else:
                eventGeneralSettings.objects.create(
                    currencySymbol=currency, purchaseTaxPercent=tax,
                    created_by="Admin", updated_by="Admin",
                )
                self.stdout.write(self.style.SUCCESS("  [created]"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  [error] {e}"))

    def _upload_theme_colors(self, kvs, theme_kvs):
        self.stdout.write("\n--- themeColorSettings ---")
        header_type = next((v for k, v in kvs.items() if "event header type" in k.lower()), "")
        color_map = {
            "Primary Color":      "primaryColor",
            "Secondary Color":    "secondaryColor",
            "Linear Grdient Color": "gradientColor",
            "Dark Color":         "darkColor",
        }
        update = {}
        if header_type:
            update["headerType"] = header_type
        for doc_key, field in color_map.items():
            for k, v in theme_kvs.items():
                if k.lower() == doc_key.lower():
                    update[field] = v
                    break
        if not update:
            self.stdout.write(self.style.WARNING("  No data found"))
            return
        try:
            obj = themeColorSettings.objects.first()
            if obj:
                for f, v in update.items():
                    setattr(obj, f, v)
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("  [updated]"))
            else:
                update["created_by"] = "Admin"
                update["updated_by"] = "Admin"
                themeColorSettings.objects.create(**update)
                self.stdout.write(self.style.SUCCESS("  [created]"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  [error] {e}"))

    def _upload_homepage_third_section(self, kvs, tagline_desc):
        self.stdout.write("\n--- homePageThirdSection ---")
        tagline = next((v for k, v in kvs.items() if "event tagline" in k.lower()
                        and "description" not in k.lower()), "")
        update = {}
        if tagline:
            update["thirdSectionFirstTitle"] = tagline
        if tagline_desc:
            update["thirdSectionDescription"] = tagline_desc
        if not update:
            self.stdout.write(self.style.WARNING("  No data found"))
            return
        try:
            obj = homePageThirdSection.objects.first()
            if obj:
                for f, v in update.items():
                    setattr(obj, f, v)
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("  [updated]"))
            else:
                update["created_by"] = "Admin"
                update["updated_by"] = "Admin"
                homePageThirdSection.objects.create(**update)
                self.stdout.write(self.style.SUCCESS("  [created]"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  [error] {e}"))

    def _upload_key_topics(self, topics):
        self.stdout.write("\n--- keyPointsSectionPoints ---")
        created = updated = 0
        for t in topics:
            label = t["pointLabel"].strip()
            if not label:
                continue
            self.stdout.write(f"  {label[:60]}")
            obj, was_created = keyPointsSectionPoints.objects.get_or_create(
                pointLabel=label,
                defaults={"pointDescription": t["pointDescription"],
                          "created_by": "Admin", "updated_by": "Admin", "isDelete": "No"},
            )
            if not was_created:
                obj.pointDescription = t["pointDescription"]
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
        self.stdout.write(self.style.SUCCESS(f"keyPointsSectionPoints: {created} created, {updated} updated."))

    def _upload_testimonials(self, testimonials):
        self.stdout.write("\n--- eventTestimonials ---")
        created = updated = 0
        for t in testimonials:
            name = t["personName"].strip()
            if not name:
                continue
            self.stdout.write(f"  {name}")
            obj, was_created = eventTestimonials.objects.get_or_create(
                personName=name,
                defaults={"personCompany": t["personCompany"],
                          "personMessage": t["personMessage"],
                          "created_by": "Admin", "updated_by": "Admin", "isDelete": "No"},
            )
            if not was_created:
                obj.personCompany = t["personCompany"]
                obj.personMessage = t["personMessage"]
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
        self.stdout.write(self.style.SUCCESS(f"eventTestimonials: {created} created, {updated} updated."))

    def _upload_expert_speakers(self, expert_speakers):
        self.stdout.write("\n--- eventExpertSpeakers ---")
        created = updated = 0
        for s in expert_speakers:
            name = s.get("expertSpeakerName", "").strip()
            if not name:
                continue
            self.stdout.write(f"  {name}")
            obj, was_created = eventExpertSpeakers.objects.get_or_create(
                expertSpeakerName=name,
                defaults={"expertSpeakerCompany": s.get("expertSpeakerCompany", ""),
                          "created_by": "Admin", "updated_by": "Admin", "isDelete": "No"},
            )
            if not was_created:
                obj.expertSpeakerCompany = s.get("expertSpeakerCompany", "")
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
        self.stdout.write(self.style.SUCCESS(f"eventExpertSpeakers: {created} created, {updated} updated."))

    def _upload_industry_trends(self, trends):
        self.stdout.write("\n--- eventIndustryTrends ---")
        created = updated = 0
        for t in trends:
            title = t["trendTitle"].strip()
            if not title:
                continue
            self.stdout.write(f"  {title}")
            obj, was_created = eventIndustryTrends.objects.get_or_create(
                trendTitle=title,
                defaults={"trendShortDescription": t["trendShortDescription"],
                          "trendLongDescription": t["trendLongDescription"],
                          "created_by": "Admin", "updated_by": "Admin", "isDelete": "No"},
            )
            if not was_created:
                obj.trendShortDescription = t["trendShortDescription"]
                obj.trendLongDescription = t["trendLongDescription"]
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
        self.stdout.write(self.style.SUCCESS(f"eventIndustryTrends: {created} created, {updated} updated."))

    def _upload_speakers(self, speakers):
        self.stdout.write("\n--- eventSpeakers ---")
        created = updated = 0
        for s in speakers:
            name = s.get("eventSpeakerName", "").strip()
            if not name:
                continue
            self.stdout.write(f"  {name}")
            obj, was_created = eventSpeakers.objects.get_or_create(
                eventSpeakerName=name,
                defaults={
                    "eventSpeakerCompany": s.get("eventSpeakerCompany", ""),
                    "eventSpeakerShortDescription": s.get("eventSpeakerShortDescription", ""),
                    "eventSpeakerDescription": s.get("eventSpeakerDescription", ""),
                    "eventSpeakerLinkedinFollowers": s.get("eventSpeakerLinkedinFollowers", 0),
                    "created_by": "Admin", "updated_by": "Admin", "isDelete": "No",
                },
            )
            if not was_created:
                obj.eventSpeakerCompany = s.get("eventSpeakerCompany", "")
                obj.eventSpeakerShortDescription = s.get("eventSpeakerShortDescription", "")
                obj.eventSpeakerDescription = s.get("eventSpeakerDescription", "")
                obj.eventSpeakerLinkedinFollowers = s.get("eventSpeakerLinkedinFollowers", 0)
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
        self.stdout.write(self.style.SUCCESS(f"eventSpeakers: {created} created, {updated} updated."))

    def _upload_related_events(self, events):
        self.stdout.write("\n--- relatedEvents ---")
        created = updated = 0
        for e in events:
            name = e.get("eventName", "").strip()
            if not name:
                continue
            self.stdout.write(f"  {name}")
            obj, was_created = relatedEvents.objects.get_or_create(
                eventName=name,
                defaults={
                    "eventDate": e.get("eventDate", ""),
                    "eventLocation": e.get("eventLocation", ""),
                    "eventWebsiteLink": e.get("eventWebsiteLink", ""),
                    "created_by": "Admin", "updated_by": "Admin", "isDelete": "No",
                },
            )
            if not was_created:
                obj.eventDate = e.get("eventDate", "")
                obj.eventLocation = e.get("eventLocation", "")
                obj.eventWebsiteLink = e.get("eventWebsiteLink", "")
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
        self.stdout.write(self.style.SUCCESS(f"relatedEvents: {created} created, {updated} updated."))

    def _upload_core_attendees(self, items):
        self.stdout.write("\n--- eventCoreAttandees ---")
        created = updated = 0
        for name in items:
            name = name.strip()
            if not name:
                continue
            self.stdout.write(f"  {name}")
            obj, was_created = eventCoreAttandees.objects.get_or_create(
                corAttandeeName=name,
                defaults={"created_by": "Admin", "updated_by": "Admin", "isDelete": "No"},
            )
            if was_created:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
            else:
                self.stdout.write(self.style.WARNING("    [exists]"))
                updated += 1
        self.stdout.write(self.style.SUCCESS(f"eventCoreAttandees: {created} created, {updated} already exist."))

    def _upload_industries(self, items):
        self.stdout.write("\n--- eventParticipatedIndustries ---")
        created = updated = 0
        for name in items:
            name = name.strip()
            if not name:
                continue
            self.stdout.write(f"  {name}")
            obj, was_created = eventParticipatedIndustries.objects.get_or_create(
                industryName=name,
                defaults={"created_by": "Admin", "updated_by": "Admin", "isDelete": "No"},
            )
            if was_created:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
            else:
                self.stdout.write(self.style.WARNING("    [exists]"))
                updated += 1
        self.stdout.write(self.style.SUCCESS(
            f"eventParticipatedIndustries: {created} created, {updated} already exist."
        ))

    def _upload_past_attendees(self, items):
        self.stdout.write("\n--- pastAttandeeHomeData ---")
        created = updated = 0
        for name in items:
            name = name.strip()
            if not name:
                continue
            self.stdout.write(f"  {name}")
            obj, was_created = pastAttandeeHomeData.objects.get_or_create(
                attandeeName=name,
                defaults={"created_by": "Admin", "updated_by": "Admin", "isDelete": "No"},
            )
            if was_created:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
            else:
                self.stdout.write(self.style.WARNING("    [exists]"))
                updated += 1
        self.stdout.write(self.style.SUCCESS(
            f"pastAttandeeHomeData: {created} created, {updated} already exist."
        ))

    def _upload_statistics(self, stats):
        self.stdout.write("\n--- countSectionTopic ---")
        created = updated = 0
        for s in stats:
            label = s.get("topicLabel", "").strip()
            if not label:
                continue
            self.stdout.write(f"  {label}: {s.get('topicCount')}  plusIcon={s.get('countIcon')}")
            obj, was_created = countSectionTopic.objects.get_or_create(
                topicLabel=label,
                defaults={"topicCount":  s.get("topicCount", ""),
                          "countIcon":   s.get("countIcon", ""),
                          "created_by": "Admin", "updated_by": "Admin", "isDelete": "No"},
            )
            if not was_created:
                obj.topicCount  = s.get("topicCount", "")
                obj.countIcon   = s.get("countIcon", "")
                obj.updated_by  = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
        self.stdout.write(self.style.SUCCESS(f"countSectionTopic: {created} created, {updated} updated."))

    def _upload_media_persons(self, persons):
        self.stdout.write("\n--- mediaPageHelpers ---")
        created = updated = 0
        for p in persons:
            name = p.get("companyPersonName", "").strip()
            if not name:
                continue
            self.stdout.write(f"  {name}")
            obj, was_created = mediaPageHelpers.objects.get_or_create(
                companyPersonName=name,
                defaults={
                    "companyPersonEmail": p.get("companyPersonEmail", ""),
                    "companyPersonPhone": p.get("companyPersonPhone", ""),
                    "created_by": "Admin", "updated_by": "Admin", "isDelete": "No",
                },
            )
            if not was_created:
                obj.companyPersonEmail = p.get("companyPersonEmail", "")
                obj.companyPersonPhone = p.get("companyPersonPhone", "")
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
        self.stdout.write(self.style.SUCCESS(f"mediaPageHelpers: {created} created, {updated} updated."))

    def _upload_contact_persons(self, persons):
        self.stdout.write("\n--- contactUsHelpData ---")
        created = updated = 0
        for p in persons:
            reason = p.get("reasonToHelp", "").strip()
            if not reason:
                continue
            self.stdout.write(f"  {reason}")
            obj, was_created = contactUsHelpData.objects.get_or_create(
                reasonToHelp=reason,
                defaults={
                    "helpingPersonName": p.get("helpingPersonName", ""),
                    "helpingPersonDesignation": p.get("helpingPersonDesignation", ""),
                    "helpingPersonEmail": p.get("helpingPersonEmail", ""),
                    "created_by": "Admin", "updated_by": "Admin", "isDelete": "No",
                },
            )
            if not was_created:
                obj.helpingPersonName = p.get("helpingPersonName", "")
                obj.helpingPersonDesignation = p.get("helpingPersonDesignation", "")
                obj.helpingPersonEmail = p.get("helpingPersonEmail", "")
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
        self.stdout.write(self.style.SUCCESS(f"contactUsHelpData: {created} created, {updated} updated."))

    def _upload_speaker_page(self, data):
        self.stdout.write("\n--- speakerPageData ---")
        if not any(data.values()):
            self.stdout.write(self.style.WARNING("  No data"))
            return
        try:
            obj = speakerPageData.objects.first()
            if obj:
                obj.sectionFirstDescription = data.get("sectionFirstDescription", "")
                obj.sectionSecondDescription = data.get("sectionSecondDescription", "")
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("  [updated]"))
            else:
                speakerPageData.objects.create(
                    sectionFirstDescription=data.get("sectionFirstDescription", ""),
                    sectionSecondDescription=data.get("sectionSecondDescription", ""),
                    created_by="Admin", updated_by="Admin",
                )
                self.stdout.write(self.style.SUCCESS("  [created]"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  [error] {e}"))

    def _upload_sponsor_page(self, html_text):
        self.stdout.write("\n--- sponsorPageData ---")
        if not html_text:
            self.stdout.write(self.style.WARNING("  No data"))
            return
        try:
            obj = sponsorPageData.objects.first()
            if obj:
                obj.introParaDescription = html_text
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("  [updated]"))
            else:
                sponsorPageData.objects.create(
                    introParaDescription=html_text,
                    created_by="Admin", updated_by="Admin",
                )
                self.stdout.write(self.style.SUCCESS("  [created]"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  [error] {e}"))

    def _upload_benefits_page(self, data):
        self.stdout.write("\n--- whoShouldAttendPageData ---")
        if not any(data.values()):
            self.stdout.write(self.style.WARNING("  No data"))
            return
        try:
            obj = whoShouldAttendPageData.objects.first()
            if obj:
                for field, value in data.items():
                    if value:
                        setattr(obj, field, value)
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("  [updated]"))
            else:
                whoShouldAttendPageData.objects.create(
                    **data, created_by="Admin", updated_by="Admin",
                )
                self.stdout.write(self.style.SUCCESS("  [created]"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"  [error] {e}"))

    def _upload_sponsors(self, sponsors):
        self.stdout.write("\n--- eventSponsors ---")
        created = updated = 0
        for s in sponsors:
            name = s.get("sponsorComapnyName", "").strip()
            if not name:
                continue
            self.stdout.write(f"  {name} [{s.get('sponsorType')}]")
            obj, was_created = eventSponsors.objects.get_or_create(
                sponsorComapnyName=name,
                defaults={
                    "sponsorType": s.get("sponsorType", ""),
                    "created_by": "Admin", "updated_by": "Admin", "isDelete": "No",
                },
            )
            if not was_created:
                obj.sponsorType = s.get("sponsorType", "")
                obj.updated_by = "Admin"
                obj.save()
                self.stdout.write(self.style.WARNING("    [updated]"))
                updated += 1
            else:
                self.stdout.write(self.style.SUCCESS("    [created]"))
                created += 1
        self.stdout.write(self.style.SUCCESS(f"eventSponsors: {created} created, {updated} updated."))
