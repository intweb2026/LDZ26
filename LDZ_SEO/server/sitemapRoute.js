// server/sitemapRoute.js
// Mounts a /sitemap.xml route on the Express app.
// The sitemap is generated fresh on first request and cached for 24 hours.
// Import and use in server.js BEFORE the catch-all SSR route.
//
// Usage in server.js:
//   const { mountSitemapRoute } = require("./sitemapRoute");
//   mountSitemapRoute(app);   // <-- add this before app.get("*", ...)

const { generateSitemap } = require("./generateSitemap");

let cachedXml = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function mountSitemapRoute(app) {
    /* ---------- /sitemap.xml ---------- */
    app.get("/sitemap.xml", async (req, res) => {
        try {
            const now = Date.now();

            // Serve from cache if fresh
            if (cachedXml && now - cacheTimestamp < CACHE_TTL_MS) {
         
                res.setHeader("Content-Type", "application/xml");
                res.setHeader("Cache-Control", "public, max-age=86400"); // 24h browser cache
                return res.send(cachedXml);
            }

            // Regenerate
       
            cachedXml = await generateSitemap();
            cacheTimestamp = now;

            res.setHeader("Content-Type", "application/xml");
            res.setHeader("Cache-Control", "public, max-age=86400");
            res.send(cachedXml);
        } catch (err) {
            console.error("❌ Sitemap generation error:", err);
            res.status(500).send("Error generating sitemap");
        }
    });

    /* ---------- /sitemap-refresh (clears cache so next request regenerates) ---------- */
    app.get("/sitemap-refresh", (req, res) => {
        cachedXml = null;
        cacheTimestamp = 0;
        res.send("Sitemap cache cleared. Next request to /sitemap.xml will regenerate.");
    });

    /* ---------- /sitemap-index.xml (optional - points to main sitemap) ---------- */
    app.get("/sitemap-index.xml", (req, res) => {
        const DOMAIN = "https://www.australia.lithium-downstream-summit.com";
        const today = new Date().toISOString().split("T")[0];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
        res.setHeader("Content-Type", "application/xml");
        res.send(xml);
    });

    /* ---------- /robots.txt ---------- */
    app.get("/robots.txt", (req, res) => {
        const DOMAIN = "https://www.australia.lithium-downstream-summit.com";
        const txt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;
        res.setHeader("Content-Type", "text/plain");
        res.send(txt);
    });
}

module.exports = { mountSitemapRoute };