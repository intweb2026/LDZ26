const DOMAIN = "https://www.australia.lithium-downstream-summit.com";

function toYYYYMMDD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function yyyymmddToDate(s) {
  return new Date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`);
}

// Parses the START date from strings like:
//   "18-19 March, 2026"  "18 & 19 March 2026"  "March 18-19, 2026"  "March 18, 2026"  "2026-03-18"
// Falls back to Jan 1 of eventYear if nothing parses.
function parseEventStartDate(dateStr, yearStr) {
  if (!dateStr) return yearStr ? `${yearStr}0101` : null;

  // Standard parse — handles ISO, "Month D, YYYY", etc.
  const standard = new Date(dateStr);
  if (!isNaN(standard.getTime())) return toYYYYMMDD(standard);

  // "18-19 March, 2026" or "18 & 19 March 2026" — day-first range, capture first day
  const dayFirstRange = dateStr.match(/(\d{1,2})[-\s–&]+\d{1,2}[\s,]+([A-Za-z]+)[,\s]+(\d{4})/);
  if (dayFirstRange) {
    const attempt = new Date(`${dayFirstRange[2]} ${dayFirstRange[1]}, ${dayFirstRange[3]}`);
    if (!isNaN(attempt.getTime())) return toYYYYMMDD(attempt);
  }

  // "18 March, 2026" — single day, day-first
  const dayFirst = dateStr.match(/(\d{1,2})\s+([A-Za-z]+)[,\s]+(\d{4})/);
  if (dayFirst) {
    const attempt = new Date(`${dayFirst[2]} ${dayFirst[1]}, ${dayFirst[3]}`);
    if (!isNaN(attempt.getTime())) return toYYYYMMDD(attempt);
  }

  // "March 18-19, 2026" — month-first range, capture first day
  const monthFirstRange = dateStr.match(/([A-Za-z]+)\s+(\d{1,2})[-–&]+\d{1,2}[,\s]+(\d{4})/);
  if (monthFirstRange) {
    const attempt = new Date(`${monthFirstRange[1]} ${monthFirstRange[2]}, ${monthFirstRange[3]}`);
    if (!isNaN(attempt.getTime())) return toYYYYMMDD(attempt);
  }

  return yearStr ? `${yearStr}0101` : null;
}

// Parses the END date (exclusive per iCal spec = last event day + 1).
function parseEventEndDate(dateStr, yearStr) {
  if (!dateStr) return null;

  // Standard parse — single day, end = start + 1
  const standard = new Date(dateStr);
  if (!isNaN(standard.getTime())) return toYYYYMMDD(addDays(standard, 1));

  // "18-19 March, 2026" or "18 & 19 March 2026" — capture last day
  const dayFirstRange = dateStr.match(/\d{1,2}[-\s–&]+(\d{1,2})[\s,]+([A-Za-z]+)[,\s]+(\d{4})/);
  if (dayFirstRange) {
    const attempt = new Date(`${dayFirstRange[2]} ${dayFirstRange[1]}, ${dayFirstRange[3]}`);
    if (!isNaN(attempt.getTime())) return toYYYYMMDD(addDays(attempt, 1));
  }

  // "18 March, 2026" — single day
  const dayFirst = dateStr.match(/(\d{1,2})\s+([A-Za-z]+)[,\s]+(\d{4})/);
  if (dayFirst) {
    const attempt = new Date(`${dayFirst[2]} ${dayFirst[1]}, ${dayFirst[3]}`);
    if (!isNaN(attempt.getTime())) return toYYYYMMDD(addDays(attempt, 1));
  }

  // "March 18-19, 2026" — month-first range, capture last day
  const monthFirstRange = dateStr.match(/([A-Za-z]+)\s+\d{1,2}[-–&]+(\d{1,2})[,\s]+(\d{4})/);
  if (monthFirstRange) {
    const attempt = new Date(`${monthFirstRange[1]} ${monthFirstRange[2]}, ${monthFirstRange[3]}`);
    if (!isNaN(attempt.getTime())) return toYYYYMMDD(addDays(attempt, 1));
  }

  return null;
}

function generateUID() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "";
  for (let i = 0; i < 21; i++) {
    uid += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return uid;
}

export function generateIcsContent(eventDetails) {
  const name = eventDetails?.eventName || "Event";
  const location = (eventDetails?.eventLocation || eventDetails?.eventShortLocation || "")
    .replace(/,/g, "\\,");

  const dateStr = eventDetails?.eventDate;
  const yearStr = eventDetails?.eventYear;

  const dtstart = parseEventStartDate(dateStr, yearStr);
  const rawDtend = parseEventEndDate(dateStr, yearStr);
  // eslint-disable-next-line no-unused-vars
  const dtend = rawDtend || (dtstart ? toYYYYMMDD(addDays(yyyymmddToDate(dtstart), 1)) : null);

  const dtstamp =
    new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:adamgibbons/ics",
    "METHOD:PUBLISH",
    "X-PUBLISHED-TTL:PT1H",
    "BEGIN:VEVENT",
    `UID:${generateUID()}`,
    `SUMMARY:${name}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${dtstart}`,
    `DESCRIPTION:Please follow ${DOMAIN} for more information.`,
    location ? `LOCATION:${location}` : null,
    "DURATION:PT24H1440M",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function downloadIcsFile(eventDetails) {
  const content = generateIcsContent(eventDetails);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = (eventDetails?.eventName || "event") + ".ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
