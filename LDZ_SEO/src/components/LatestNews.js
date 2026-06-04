// src/components/LatestNews.js
// Data now comes from SSR (window.__INITIAL_DATA__.news). No client-side fetch.
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/LatestNews.css";
import { useSSRData } from "../common/useSSRData";

const LatestNews = () => {
  const navigate = useNavigate();
  // ✅ SSR data — no useEffect fetch
  const ssrNews = useSSRData("news");
  const newsList = ssrNews || [];

  const getNewsUrl = (item) => {
    const slug = item.newsTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return `/news/${slug}`;
  };

  let featuredLatestArticle = null;
  let latestNewsItems = [];

  if (newsList?.length > 0) {
    featuredLatestArticle = newsList[0];
    const remainingItems = newsList.slice(1);
    latestNewsItems =
      remainingItems.length > 5 ? remainingItems.slice(0, 4) : remainingItems;
  }

  const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
  const month = date
    .toLocaleDateString("en-GB", { month: "short" })
    .toUpperCase();
  const year = date.toLocaleDateString("en-GB", { year: "numeric" });

  return `${day} ${month} ${year}`;
};

  return (
    <div className="HomeScreen_NewsHomeContainer__+EIaN">
      <div className="NewsSection_wholeContainer__t5qCK">
        <div className="NewsSection_latestNewsContainer__T48Li">
          <h2>Latest News</h2>
          <div className="NewsSection_latestNews__9sDlt">
            <div className="NewsSection_newsList__tnQsK">
              <ul>
                {latestNewsItems?.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={getNewsUrl(item)}
                      state={item}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="NewsSection_categoryAndDate__WBz4R">
                        <p>{item?.newsCategoryDetails?.newsCategory}</p>
                        <p>{formatDate(item?.newsCreatedDate)}</p>
                      </div>
                      <div className="NewsSection_newsTitle__1tiob">
                        {item?.newsTitle}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                className="NewsSection_showAllNews__epl41"
                onClick={() => navigate("/news")}
              >
                Show All News
                <svg className="NewsSection_iconArrow__DM6M5" width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.2071 8.70711C23.5976 8.31658 23.5976 7.68342 23.2071 7.29289L16.8431 0.928932C16.4526 0.538408 15.8195 0.538408 15.4289 0.928932C15.0384 1.31946 15.0384 1.95262 15.4289 2.34315L21.0858 8L15.4289 13.6569C15.0384 14.0474 15.0384 14.6805 15.4289 15.0711C15.8195 15.4616 16.4526 15.4616 16.8431 15.0711L23.2071 8.70711ZM0 9H22.5V7H0V9Z" style={{ fill: "#ffffff" }} />
                </svg>
              </button>
            </div>
            <div className="NewsSection_featuredNews__ENl3B" style={{ height: "639PX" }}>
              {featuredLatestArticle && (
                <Link
                  to={getNewsUrl(featuredLatestArticle)}
                  state={featuredLatestArticle}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3>{featuredLatestArticle?.newsTitle}</h3>
                  <img
                    src={featuredLatestArticle?.newsImage}
                    alt={featuredLatestArticle?.newsImageAltText}
                    loading="lazy"
                    style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
                  />
                  <div className="NewsSection_featuredcategoryAndDate__WZuqu">
                    <p>{featuredLatestArticle?.newsCategoryDetails?.newsCategory}</p>
                    <p>{formatDate(featuredLatestArticle?.newsCreatedDate)}</p>
                  </div>
                  <p
                    lang="en"
                    dangerouslySetInnerHTML={{
                      __html: featuredLatestArticle?.newsShortDescription?.replace(/^"(.*)"$/, "$1"),
                    }}
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
