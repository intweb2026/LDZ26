// src/components/IndustryTrend.js
// Data now comes from SSR (window.__INITIAL_DATA__.trends). No client-side fetch.
import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/IndustryTrend.css";
import { useSSRData } from "../common/useSSRData";

const IndustryTrend = () => {
  const navigate = useNavigate();
  // ✅ SSR data — no useEffect fetch
  const ssrTrends = useSSRData("trends");
  const indutryTrendList = ssrTrends || [];

  const handleClick = (trend) => {
    const trendTitle = trend?.trendTitle.toLowerCase().replace(/\s+/g, "-");
    navigate(`/trend/${trendTitle}`, { state: trend });
  };

  return (
    <article className="HomeScreen_industryTrends__KoD6-">
      <div className="HomeScreen_industryTrendsContainer__+xwuK">
        <h2>Industry Trends</h2>
        <div>
          <>
            <div>
              {indutryTrendList?.map((trend, index) =>
                index < 2 ? (
                  // <p key={index} onClick={() => handleClick(trend)}>
                  //   {trend?.trendTitle}
                  // </p>
                  <a key={index} href={`/trend/${trend?.trendTitle.replace(/\s+/g, "-").toLowerCase()}`}>{trend?.trendTitle}</a>
                ) : null
              )}
            </div>
            <div>
              {indutryTrendList?.map((trend, index) =>
                index >= 2 ? (
                  // <p key={index} onClick={() => handleClick(trend)}>
                  //   {trend?.trendTitle}
                  // </p>
                  <a key={index} href={`/trend/${trend?.trendTitle.replace(/\s+/g, "-").toLowerCase()}`}>{trend?.trendTitle}</a>
                ) : null
              )}
            </div>
          </>
        </div>
      </div>
    </article>
  );
};

export default IndustryTrend;
