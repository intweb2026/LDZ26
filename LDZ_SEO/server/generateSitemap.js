// server/generateSitemap.js
// Run standalone: node server/index.js --generate-sitemap
// Or use the /sitemap.xml Express route in sitemapRoute.js

const fetch = require("node-fetch");
const { BASE_URL, DOMAIN } = require('./config');


/* -------- helpers -------- */
async function get(endpoint) {
    try {
        const res = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        console.error(`❌ Fetch error [${endpoint}]:`, e.message);
        return null;
    }
}

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

function toSpeakerSlug(name = "") {
    return name.toLowerCase().replace(/\s+/g, "-");
}

function toNewsSlug(title = "") {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

/* -------- static routes -------- */
const STATIC_ROUTES = [
    { url: "/", changefreq: "daily", priority: "1.0" },
    // { url: "/venue", changefreq: "weekly", priority: "0.8" },
    { url: "/sponsors", changefreq: "weekly", priority: "0.8" },
    { url: "/media-partners", changefreq: "monthly", priority: "0.7" },
    { url: "/agenda", changefreq: "weekly", priority: "0.8" },
    { url: "/agenda-page", changefreq: "weekly", priority: "0.8" },
    { url: "/who-should-attend", changefreq: "monthly", priority: "0.7" },
    { url: "/faq", changefreq: "monthly", priority: "0.6" },
    { url: "/speakers", changefreq: "weekly", priority: "0.8" },
    { url: "/featured-speakers", changefreq: "weekly", priority: "0.8" },
    { url: "/sponsor-packages", changefreq: "monthly", priority: "0.7" },
    { url: "/news", changefreq: "daily", priority: "0.8" },
    { url: "/attendees", changefreq: "monthly", priority: "0.6" },
    { url: "/booking", changefreq: "monthly", priority: "0.7" },
    { url: "/booking-form", changefreq: "weekly", priority: "0.7" },
    { url: "/pay-online", changefreq: "weekly", priority: "0.8" },
    { url: "/remind-me-later", changefreq: "monthly", priority: "0.7" },
    { url: "/contact-us", changefreq: "monthly", priority: "0.6" },
    { url: "/sponsor-booking", changefreq: "monthly", priority: "0.6" },
    { url: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
    { url: "/cookie-policy", changefreq: "yearly", priority: "0.3" },
    { url: "/terms-and-conditions", changefreq: "yearly", priority: "0.3" },
];

/* -------- dynamic slug fetchers -------- */
async function fetchSpeakerSlugs() {
    const d = await get("eventspeakers");
    const list = d?.status ? d.eventSpeakersList : [];
    return list.map((s) => ({
        url: `/speaker/${toSpeakerSlug(s.eventSpeakerName)}`,
        changefreq: "weekly",
        priority: "0.7",
    }));
}

async function fetchNewsSlugs() {
    const d = await get("generalnews");
    const list = d?.status ? d.generalNews : [];
    return list.map((n) => ({
        url: `/news/${toNewsSlug(n.newsTitle)}`,
        changefreq: "weekly",
        priority: "0.6",
    }));
}

async function fetchNewsPaginationSlugs() {
    const NEWS_PER_PAGE = 6;
    const d = await get("generalnews");
    const list = d?.status ? d.generalNews : [];
    const totalPages = Math.ceil(list.length / NEWS_PER_PAGE);
    const slugs = [];
    for (let page = 2; page <= totalPages; page++) {
        slugs.push({
            url: `/news?page=${page}`,
            changefreq: "daily",
            priority: "0.5",
        });
    }
    return slugs;
}

async function fetchTrendSlugs() {
    const d = await get("eventindustrytrends");
    const list = d?.status ? d.eventIndustryTrends : [];
    return list.map((t) => ({
        url: `/trend/${toTrendSlug(t.trendTitle)}`,
        changefreq: "monthly",
        priority: "0.6",
    }));
}

async function fetchSponsorSlugs() {
    const d = await get("eventsponsors");
    const list = d?.status ? d.eventSponsors : [];
    return list
        .filter((s) => s.sponsorComapnyName && s.sponsorType !== "Dummy")
        .map((s) => ({
            url: `/sponsor/${toSlug(s.sponsorComapnyName)}`,
            changefreq: "monthly",
            priority: "0.5",
        }));
}

async function fetchNavbarNavigationSlugs() {
    const d = await get("navmaincategories");
    const list = d?.status ? d.navMainategories : [];
    return list
        .filter((s) => s.navMainCategoryName === 'VENUE' && s.isChecked === "Yes")
        .map((s) => ({
            url: `/venue`,
            changefreq: "monthly",
            priority: "0.8",
        }));
}

/* -------- XML builder -------- */
function buildSitemapXml(routes) {
    const today = new Date().toISOString().split("T")[0];

    const urlEntries = routes
        .map(
            ({ url, changefreq, priority }) => `
  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
        )
        .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

/* -------- main -------- */
async function generateSitemap() {

    const [speakerSlugs, newsSlugs, newsPaginationSlugs, trendSlugs, sponsorSlugs, navbarSlugs] =
        await Promise.all([
            fetchSpeakerSlugs(),
            fetchNewsSlugs(),
            fetchNewsPaginationSlugs(),
            fetchTrendSlugs(),
            fetchSponsorSlugs(),
            fetchNavbarNavigationSlugs(),
        ]);

    const allRoutes = [
        ...STATIC_ROUTES,
        ...speakerSlugs,
        ...newsSlugs,
        ...newsPaginationSlugs,
        ...trendSlugs,
        ...sponsorSlugs,
        ...navbarSlugs,
    ];


    const xml = buildSitemapXml(allRoutes);
    return xml;
}

module.exports = { generateSitemap, buildSitemapXml };

// Allow running directly: node server/generateSitemap.js
if (require.main === module) {
    generateSitemap().catch(console.error);
}