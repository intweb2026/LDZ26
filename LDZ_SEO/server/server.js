
// server/server.js
const express = require("express");
const React = require("react");
const { renderToPipeableStream } = require("react-dom/server");
const { StaticRouter } = require("react-router-dom/server");
const { HelmetProvider } = require("react-helmet-async");
const { Writable } = require("stream");
const path = require("path");
const fs = require("fs");
const compression = require("compression");

// Renders the React tree to an HTML string, waiting for ALL Suspense
// boundaries (including React.lazy() components) to resolve so that
// react-helmet-async has a fully-populated context before we build the page.
function renderToStringAsync(element) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const { pipe, abort } = renderToPipeableStream(element, {
      onAllReady() {
        const writable = new Writable({
          write(chunk, _enc, cb) { chunks.push(chunk); cb(); },
        });
        writable.on("finish", () => resolve(Buffer.concat(chunks).toString("utf8")));
        writable.on("error", reject);
        pipe(writable);
      },
      onError(err) { reject(err); },
    });
    // Safety valve – prevent the request from hanging forever
    setTimeout(() => { abort(); reject(new Error("SSR render timeout")); }, 10000);
  });
}
const { fetchSSRData } = require("./ssrDataFetcher");

const { mountSitemapRoute } = require("./sitemapRoute");

const App = require("../src/App").default;

const app = express();
const PORT = process.env.PORT || 3001;

/* -------------------- MIDDLEWARE -------------------- */
app.use(compression({ level: 6, threshold: 1024 }));

// ✅ ADD THIS — HSTS header for all responses including redirects
app.use((req, res, next) => {
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  next();
});

/* -------------------- SITEMAP + ROBOTS -------------------- */
// Must be registered BEFORE express.static so the dynamic route
// takes priority over any stale public/sitemap.xml static file.
mountSitemapRoute(app);

app.use(
  express.static(path.resolve(__dirname, "../build"), {
    maxAge: "1y",
    immutable: true,
    index: false,
    setHeaders(res, filePath) {
      // HTML should never be cached — always fetch fresh
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      }
    },
  })
);

app.use(
  express.static(path.resolve(__dirname, "../public"), {
    maxAge: "1y",
    immutable: true,
    index: false,
  })
);

/* -------------------- THEME CSS HELPER -------------------- */
function buildThemeStyle(theme) {
  if (!theme) return "";
  const vars = [];
  if (theme.primaryColor) vars.push(`--primary-color: ${theme.primaryColor}`);
  if (theme.secondaryColor) vars.push(`--secondary-color: ${theme.secondaryColor}`);
  if (theme.darkColor) vars.push(`--dark-color: ${theme.darkColor}`);
  if (theme.lightColor) vars.push(`--light-color: ${theme.lightColor}`);
  if (theme.gradientColor) vars.push(`--linearGradient-color: ${theme.gradientColor}`);
  if (!vars.length) return "";
  return `<style id="ssr-theme">:root { ${vars.join("; ")}; }</style>`;
}

/* -------------------- REDIRECTS -------------------- */
app.get("/featuredSpeaker", (req, res) => {
  res.redirect(301, "/featured-speakers");
});

app.get("/pay_online", (req, res) => {
  res.redirect(301, "/pay-online");
});

/* -------------------- SSR ROUTE -------------------- */
app.get("*", async (req, res) => {
  const staticFileRegex =
    /\.(js|css|map|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|mp4|pdf)$/;
  if (staticFileRegex.test(req.path)) {
    return res.status(404).send("Not Found");
  }

  try {
    const initialData = await fetchSSRData(req.path);
    const helmetContext = {};
    const routerContext = {};

    let appString = "";
    try {
      appString = await renderToStringAsync(
        React.createElement(
          HelmetProvider,
          { context: helmetContext },
          React.createElement(
            StaticRouter,
            { location: req.url, context: routerContext },
            React.createElement(App, { ssrData: initialData })
          )
        )
      );
    } catch (renderError) {
      console.error("❌ React render error:", renderError);
      appString = "<div>Loading...</div>";
    }

    if (routerContext.url) {
      
      return res.redirect(301, routerContext.url);
    }

    const { helmet } = helmetContext;
    const themeStyle = buildThemeStyle(initialData?.theme);

    // Preload hints for LCP and video poster so the browser discovers them
    // in the initial document instead of waiting for JS/CSS evaluation.
    const lcpImageUrl = initialData?.homeVideoSettings?.eventDetailBackImage;
    const posterImageUrl = initialData?.homeVideoSettings?.videoReplaceImage;
    const criticalPreloads = [
      lcpImageUrl
        ? `<link rel="preload" as="image" href="${lcpImageUrl}" fetchpriority="high">`
        : "",
      posterImageUrl
        ? `<link rel="preload" as="image" href="${posterImageUrl}" fetchpriority="low">`
        : "",
    ]
      .filter(Boolean)
      .join("\n          ");

    const indexFile = path.resolve(__dirname, "../build/index.html");

    fs.readFile(indexFile, "utf8", (err, htmlData) => {
      if (err) {
        console.error("❌ Error reading index.html:", err);
        return res.status(500).send("Internal Server Error");
      }

      // ✅ Build the Helmet head tags string (honoring strict backend-only meta)
      let helmetHeadTags = "";
      if (helmet) {
        const titleTag = helmet.title.toString();
        // 🚨 CRITICAL: react-helmet-async emits '<title data-rh="true"></title>' if title is empty.
        // We MUST filter this out to prevent SEO tools from seeing an empty tag as "Missing title".
        const isTitleEmpty = titleTag === '<title data-rh="true"></title>' || titleTag === '<title data-rh="true"> </title>';
        
        helmetHeadTags = [
          isTitleEmpty ? "" : titleTag,
          helmet.meta.toString(),
          helmet.link.toString(),
          helmet.script.toString(),
        ]
          .filter(Boolean)
          .join("\n          ");
      }

      // ✅ KEY FIX: Remove any leftover <title> tag from index.html
      // before injecting Helmet tags, preventing duplicates
      let html = htmlData
        // Remove any static <title>...</title> that may exist in index.html
        .replace(/<title>[^<]*<\/title>/i, "")
        // Also strip any static og:/description meta tags from index.html
        // that would conflict with Helmet-injected ones
        .replace(/<meta\s+(?:property="og:[^"]*"|name="description")[^>]*>/gi, "")
        // Add lang attribute
        .replace("<html", "<html lang='en'")
        // Inject Helmet tags + theme just before </head>
        .replace(
          "</head>",
          `  ${criticalPreloads}
          ${helmetHeadTags}
          <!-- SSR DEBUG:
               Path: ${req.url}
               hasTheme: ${!!initialData?.theme}
               newsDetailCount: ${initialData?.newsDetail?.length || 0}
               newsListCount: ${initialData?.news?.length || 0}
               HelmetTitle: ${helmet?.title?.toString().length || 0}
          -->
          ${themeStyle}
        </head>`
        )
        // Inject rendered React app
        .replace(
          '<div id="root"></div>',
          `<div id="root">${appString}</div>`
        )
        // Inject SSR data
        .replace(
          "</body>",
          `<script>
            window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(
            /</g,
            "\\u003c"
          )};
          </script></body>`
        );

     
      const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
      res.send(html);
    });
  } catch (err) {
    console.error("❌ SSR Fatal Error:", err);
    res.status(500).send("Server Error");
  }
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`\n🚀 SSR Server running at http://localhost:${PORT}\n`);
});