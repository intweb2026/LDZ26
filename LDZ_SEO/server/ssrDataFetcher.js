// server/ssrDataFetcher.js
// Centralised SSR data fetcher — fetches ALL page data on the server before React renders.
// No read-only API calls will happen client-side when this data is available.

const fetch = require("node-fetch");
const { BASE_URL, DOMAIN } = require('./config');
// AbortController is a global in Node.js v15+ — no import needed


// How long to wait for a single API call before giving up (ms)
const FETCH_TIMEOUT_MS = 4000;
// How many times to retry a failed/timed-out request
const MAX_RETRIES = 1;
// Backoff between retries in ms (doubles each attempt)
const RETRY_BASE_DELAY_MS = 200;

/* -------- helpers -------- */

/**
 * GET with timeout + retry. Returns parsed JSON or null on failure.
 * PythonAnywhere free tier hibernates and can return HTML on first hit —
 * retries catch the "server waking up" window.
 */
async function get(endpoint, retries = MAX_RETRIES) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!res.ok) {
        console.warn(`⚠️  SSR [${endpoint}] HTTP ${res.status} (attempt ${attempt + 1})`);
        if (attempt < retries) {
          await delay(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
          continue;
        }
        return null;
      }

      // Guard: PythonAnywhere sometimes returns HTML with 200 while waking up
      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("json")) {
        console.warn(`⚠️  SSR [${endpoint}] non-JSON response (${ct}), attempt ${attempt + 1}`);
        await delay(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
        continue;
      }

      return await res.json();
    } catch (e) {
      clearTimeout(timer);
      const isTimeout = e.name === "AbortError";
      console.error(
        `❌ SSR ${isTimeout ? "TIMEOUT" : "ERROR"} [${endpoint}] attempt ${attempt + 1}:`,
        e.message
      );
      if (attempt < retries) {
        await delay(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
      }
    }
  }
  return null;
}

/** Simple promise-based sleep */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchToEmails() {
  const d = await get("toemails");
  return d?.status ? d.toemails : "";
}

/**
 * POST with timeout + retry. Now uses URLSearchParams for maximum compatibility
 * with Django backends when sending simple IDs.
 */
async function post(endpoint, data, retries = MAX_RETRIES) {
  const body = new URLSearchParams();
  for (const [key, val] of Object.entries(data)) {
    body.append(key, String(val));
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
      const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        body: body, // node-fetch automatically sets Content-Type to application/x-www-form-urlencoded
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!res.ok) {
        console.warn(`⚠️  SSR POST [${endpoint}] HTTP ${res.status} (attempt ${attempt + 1})`);
        if (attempt < retries) {
          await delay(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
          continue;
        }
        return null;
      }

      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("json")) {
        console.warn(`⚠️  SSR POST [${endpoint}] non-JSON (${ct}), attempt ${attempt + 1}`);
        await delay(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
        continue;
      }

      return await res.json();
    } catch (e) {
      clearTimeout(timer);
      const isTimeout = e.name === "AbortError";
      console.error(
        `❌ SSR POST ${isTimeout ? "TIMEOUT" : "ERROR"} [${endpoint}] attempt ${attempt + 1}:`,
        e.message
      );
      if (attempt < retries) {
        await delay(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
      }
    }
  }
  return null;
}

/* -------- slug helpers -------- */
function toSlug(str = "") {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toTrendSlug(str = "") {
  return str.toLowerCase().replace(/\s+/g, "-");
}

/* -------- individual fetchers -------- */
async function fetchTheme() {
  const d = await get("gettheme");
  return d?.status ? d.themecolors : null;
}

async function fetchNavLogos() {
  // Try the dedicated endpoint first
  const d = await get("getnavlogos");
  if (d?.status && d.navLogos) {
    const raw = d.navLogos;
    return Array.isArray(raw) ? raw[0] : raw;
  }
  // Fallback: extract navLogos from homepagedata (always available)
  const home = await get("homepagedata");
  if (home?.status && home.homePageSettings?.navLogos) {
    const raw = home.homePageSettings.navLogos;
    return Array.isArray(raw) ? raw[0] : raw;
  }
  return null;
}

async function fetchNavItems() {
  const d = await get("getnavitems");
  return d?.status ? d.navItems : [];
}

async function fetchHomeData() {
  const d = await get("homepagedata");
  return d?.status ? d.homePageSettings : null;
}

async function fetchSponsors() {
  const d = await get("eventsponsors");
  return d?.status ? d.eventSponsors : [];
}

async function fetchSpeakers() {
  const d = await get("eventspeakers");
  return d?.status ? d.eventSpeakersList : [];
}

async function fetchSpeakerById(id) {
  const d = await post("speakerbyid", { speakerId: id });
  return d?.status && d.speakerData?.length > 0 ? d.speakerData : null;
}

async function fetchNews() {
  const d = await get("generalnews");
  return d?.status ? d.generalNews : [];
}

async function fetchNewsById(id) {
  const d = await post("newsbyid", { newsId: id });
  return d?.status && d.NewsData?.length > 0 ? d.NewsData : null;
}

async function fetchVenueData() {
  const d = await get("getvenuedata");
  return d?.status ? d.venuePageStaticData : [];
}

async function fetchVenueGallery() {
  const d = await get("venuegalleryimages");
  return d?.status ? d.venueGalleryImages : [];
}

async function fetchFaqs() {
  const d = await get("eventfaqs");
  return d?.status ? d.faqsList : [];
}

async function fetchTrends() {
  const d = await get("eventindustrytrends");
  return d?.status ? d.eventIndustryTrends : [];
}

async function fetchTrendById(id) {
  const d = await post("trendbyid", { trendId: id });
  return d?.status ? d.trendData : null;
}

async function fetchMediaPartners() {
  const d = await get("mediapagehelpers");
  return d?.status ? d.mediaPageHelpers : [];
}

async function fetchLogoCarousel() {
  const d = await get("homepagecompanieslogo");
  return d?.status ? d.homePageCompaniesList : [];
}

async function fetchSponsorById(id) {
  const d = await post("sponsorbyid", { sponsorId: id });
  return d?.status && d.sponsorData?.length > 0 ? d.sponsorData : null;
}

/* ---- WhoShouldAttend / Attendees ---- */
async function fetchWhoShouldAttend() {
  // Use homepagedata which contains whoshouldattend info, or a dedicated endpoint if it exists
  const d = await get("whoshouldattendpagedata");
  return d?.status ? d : null;
}

async function fetchAttendees() {
  const d = await get("eventattendees");
  return d?.status ? d : null;
}

async function fetchContactHelpers() {
  const d = await get("contactushelpers");
  return d?.status ? d.contactUsHelpers : [];
}

async function fetchContactPageData() {
  const d = await get("contactusstaticdata");
  return d?.status ? d.contatusPageStaticData : [];
}

async function fetchSponsorPageData() {
  const d = await get("getsponsorpagedata");
  return d?.status ? d.sponsorPageStaticData : [];
}

async function fetchDelegatePackages() {
  const d = await get("deligatepackageslist");
  return d?.status ? d.delegatePackages : [];
}

/* -------- main export -------- */
/**
 * @param {string} pathname  - req.path e.g. "/", "/venue", "/speaker/john-doe"
 * @returns {Promise<object>} - Structured initial data object keyed by domain
 */
async function fetchSSRData(pathname) {
  // ─── WAKE UP the Django backend ───────────────────────────────────────────
  // PythonAnywhere free tier hibernates. A sequential "ping" before the main
  // parallel fetch burst ensures the server is alive and returning JSON.
  await get("toemails"); // lightweight endpoint, just to wake the process

  // Always fetch theme + logoCarousel + navLogos + navItems + home + toEmails (needed on every page)
  const [theme, logoCarousel, navLogos, navItems, toEmails, home] = await Promise.all([
    fetchTheme(),
    fetchLogoCarousel(),
    fetchNavLogos(),
    fetchNavItems(),
    fetchToEmails(),
    fetchHomeData(),
  ]);

  const base = { theme, logoCarousel, navLogos, navItems, toEmails, home };

  // ---- HOME ----
  if (pathname === "/" || pathname === "") {
    const [home, sponsors, speakers, news, trends] = await Promise.all([
      fetchHomeData(),
      fetchSponsors(),
      fetchSpeakers(),
      fetchNews(),
      fetchTrends(),
    ]);
    return { ...base, home, sponsors, speakers, news, trends };
  }

  // ---- VENUE ----
  if (pathname === "/venue") {
    const [venue, venueGallery] = await Promise.all([
      fetchVenueData(),
      fetchVenueGallery(),
    ]);
    return { ...base, venue, venueGallery };
  }

  // ---- FEATURED SPEAKERS (full page) ----
  if (pathname === "/featured-speakers") {
    const speakers = await fetchSpeakers();
    return { ...base, speakers };
  }

  // ---- CALL FOR PRESENTATION / BECOME A SPEAKER ----
  if (pathname === "/speakers") {
    const speakers = await fetchSpeakers();
    return { ...base, speakers };
  }

  // ---- SPEAKER PROFILE (dynamic) ----
  if (pathname.startsWith("/speaker/")) {
    const slug = pathname.replace("/speaker/", "");
    const [speakers, news, sponsors, trends] = await Promise.all([
      fetchSpeakers(),
      fetchNews(),
      fetchSponsors(),
      fetchTrends(),
    ]);

    const matched = speakers?.find(
      (s) => s.eventSpeakerName?.toLowerCase().replace(/\s+/g, "-") === slug,
    );


    let speakerProfile = null;
    if (matched) {
      speakerProfile = await fetchSpeakerById(matched.id);
     
    }
    return { ...base, speakers, speakerProfile, news, sponsors, trends };
  }

  // ---- SPONSORS ----
  if (pathname === "/sponsors") {
    const [sponsors, sponsorPageData, mediaPartners, news, speakers, trends] =
      await Promise.all([
        fetchSponsors(),
        fetchSponsorPageData(),
        fetchMediaPartners(),
        fetchNews(),
        fetchSpeakers(),
        fetchTrends(),
      ]);
    return {
      ...base,
      sponsors,
      sponsorPageData,
      mediaPartners,
      news,
      speakers,
      trends,
    };
  }

  // ---- SPONSOR DESCRIPTION (dynamic) ----
  if (pathname.startsWith("/sponsor/")) {
    const slug = pathname.replace("/sponsor/", "");
    const [sponsors, news, speakers, trends] = await Promise.all([
      fetchSponsors(),
      fetchNews(),
      fetchSpeakers(),
      fetchTrends(),
    ]);
    const matched = sponsors.find((s) => toSlug(s.sponsorComapnyName) === slug);
    let sponsorProfile = null;
    if (matched) {
      sponsorProfile = await fetchSponsorById(matched.id);
    }
    return { ...base, sponsors, sponsorProfile, news, speakers, trends };
  }

  // ---- EXHIBITOR PACKAGES ----
  if (pathname === "/sponsor-packages") {
    const sponsors = await fetchSponsors();
    return { ...base, sponsors };
  }

  // ---- MEDIA PARTNERS ----
  if (pathname === "/media-partners") {
    const mediaPartners = await fetchMediaPartners();
    return { ...base, mediaPartners };
  }

  // ---- AGENDA (uses homepagedata + custom agenda endpoint) ----
  if (pathname === "/agenda-page") {
    const speakers = await fetchSpeakers();
    return { ...base, speakers };
  }

  // ---- NEWS LIST ----
  if (pathname === "/news") {
    const [news, sponsors, speakers, trends] = await Promise.all([
      fetchNews(),
      fetchSponsors(),
      fetchSpeakers(),
      fetchTrends(),
    ]);
    return { ...base, news, sponsors, speakers, trends };
  }

  // ---- NEWS DESCRIPTION (dynamic) ----
  if (pathname.startsWith("/news/")) {
    const slug = pathname.replace("/news/", "");
    const [news, sponsors, speakers, trends] = await Promise.all([
      fetchNews(),
      fetchSponsors(),
      fetchSpeakers(),
      fetchTrends(),
    ]);
    const matched = news.find((n) => {
      const s = n.newsTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      return s === slug;
    });
    let newsDetail = null;
    if (matched) {
      newsDetail = await fetchNewsById(matched.id);
    }
    return { ...base, news, newsDetail, sponsors, speakers, trends };
  }

  // ---- TREND DESCRIPTION (dynamic) ----
  if (pathname.startsWith("/trend/")) {
    const slug = pathname.replace("/trend/", "");
    const [trends, sponsors, speakers, news] = await Promise.all([
      fetchTrends(),
      fetchSponsors(),
      fetchSpeakers(),
      fetchNews(),
    ]);
    const matched = trends.find((t) => toTrendSlug(t.trendTitle) === slug);
    let trendDetail = null;
    if (matched) {
      trendDetail = await fetchTrendById(matched.id);
    }
    return { ...base, trends, sponsors, trendDetail, speakers, news };
  }

  // ---- FAQ ----
  if (pathname === "/faq") {
    const faqs = await fetchFaqs();
    return { ...base, faqs };
  }

  // ---- WHO SHOULD ATTEND ----
  if (pathname === "/who-should-attend") {
    const whoShouldAttend = await fetchWhoShouldAttend();
    const speakers = await fetchSpeakers();
    return { ...base, whoShouldAttend, speakers };
  }

  // ---- ATTENDEES ----
  if (pathname === "/attendees") {
    const attendees = await fetchAttendees();
    return { ...base, attendees };
  }

  // ---- REGISTER ----
  if (pathname === "/booking") {
    const delegatePackages = await fetchDelegatePackages();
    return { ...base, delegatePackages };
  }

  // ---- BOOKING FORM ----
  if (pathname === "/booking-form") {
    return { ...base };
  }

  // ----SPONSOR BOOKING FORM ----
  if (pathname === "/sponsor-booking") {
    return { ...base };
  }

  // ---- CONTACT US ----
  if (pathname === "/contact-us") {
    const [contactHelpers, contactPageData] = await Promise.all([
      fetchContactHelpers(),
      fetchContactPageData(),
    ]);
    return { ...base, contactHelpers, contactPageData };
  }

  // ---- SPONSORS PAGE ----
  // if (pathname === "/sponsors") {
  //   const [sponsors, sponsorPageData, mediaPartners] = await Promise.all([
  //     fetchSponsors(),
  //     fetchSponsorPageData(),

  //   ]);
  //   return { ...base, sponsors, sponsorPageData, mediaPartners };
  // }

  // ---- Default: all other pages (contact, booking, forms, etc.) — theme only ----

  if (pathname === "/securelogin") {
    return { ...base };
  }

  return { ...base };
}

module.exports = { fetchSSRData };
