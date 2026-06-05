import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import ".././assets/css/News.css";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import "../../src/assets/css/News.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
import { useApiData } from "../common/ApiContext";
const leftArrowIcon = "/images/WebCommonImages/icon-arrow-left.png";
const rightArrowIcon = "/images/WebCommonImages/icon-arrow-right.png";

const News = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [agendaList, setAgendaList] = useState(null);
  const {
    eventDetails,
  } = useApiData();
  const agendaVersion = eventDetails?.agendaVersion;

  useEffect(() => {
    callNewsListApi();
    callAgendaListApi();
    // eslint-disable-next-line
  }, []);

  const callAgendaListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.australia.lithium-downstream-summit.com/admin1/getagenda`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          localStorage.clear();
          navigate("/logout");
        } else if (data && data.status !== false) {
          // DRF response might be direct array or status wrapped
          setAgendaList(data.agendaList || data);
          // setTotalCount(data?.paginationDetails?.count);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      });
  };

  const callNewsListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/generalnews`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setNewsList(data["generalNews"]);
          // setTotalCount(data?.paginationDetails?.count);
        }
      })
      .catch((error) => {
        setTimeout(() => {
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      });
  };

  const dayItem = Array.isArray(agendaList)
    ? agendaList.find((item) => item.status === "Day")
    : null;

  const updatedAgendaList = Array.isArray(agendaList)
    ? agendaList.filter((item) => item.status === "Speaker").slice(0, 3)
    : [];

  let featuredArticle = null;
  let sidebarItems = [];
  let featuredLatestArticle = null;
  let latestNewsItems = [];

  const topNewsItems = newsList.filter((news) => news.isTopNews === "Yes");
  if (topNewsItems?.length > 0) {
    featuredArticle = topNewsItems[0];
    sidebarItems = topNewsItems.slice(1);
  }

  if (newsList?.length > 0) {
    featuredLatestArticle = newsList[0];
    const remainingItems = newsList.slice(1);
    latestNewsItems =
      remainingItems.length > 5 ? remainingItems.slice(0, 4) : remainingItems;
  }

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = { day: "2-digit", month: "short", year: "numeric" };
  //   return date.toLocaleDateString("en-GB", options);
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleDateString("en-GB", { month: "short" })
      .toUpperCase();
    const year = date.toLocaleDateString("en-GB", { year: "numeric" });

    return `${day} ${month} ${year}`;
  };

  const allTopics = [
    {
      id: 1,
      title:
        "DECENTRALISING FINANCE: BITCOIN’S ROLE IN THE EVOLUTION OF GLOBAL MONEY",
      day: "Day 1",
      date: "WEDNESDAY, 1 JULY, 2026",
      time: "11:30 - 11:55",
      speaker: "Speaker A",
      category: "Market Dynamics",
    },
    {
      id: 2,
      title: "FROM CODE TO CAPITAL: HOW BITCOIN INNOVATION IS RESHAPING FINANCIAL MARKETS",
      day: "Day 1",
      date: "WEDNESDAY, 1 JULY, 2026",
      time: "13:30 - 13:55",
      speaker: "Speaker B",
      category: "Mining Security",
    },
    {
      id: 3,
      title: "BITCOIN BEYOND CURRENCY: DRIVING INNOVATION ACROSS GLOBAL FINANCIAL SYSTEMS",
      day: "Day 1",
      date: "WEDNESDAY, 1 JULY, 2026",
      time: "14:00 - 14:25",
      speaker: "Speaker C",
      category: "Blockchain Technology",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const topRef = useRef(null);
  const shouldScrollRef = useRef(false);
  const totalPages = Math.ceil(newsList?.length / articlesPerPage);

  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = newsList.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (topRef.current && shouldScrollRef.current) {
      const element = topRef.current;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 120;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    // Reset the flag after handling
    shouldScrollRef.current = false;
  }, [currentPage]);

  const handlePageClick = (pageNumber) => {
    shouldScrollRef.current = true;
    setCurrentPage(pageNumber);
  };

  const handlePrev = () => {
    shouldScrollRef.current = true;
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    shouldScrollRef.current = true;
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };



  const getNewsUrl = (item) => {
    if (!item) return "#";
    const slug = item.newsTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return `/news/${slug}`;
  };

  const pageSeo = usePageSeo("news");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDesc = pageSeo.pageMetaDescription;
  const seoImage = pageSeo.pageOgImage || null;
  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />
        {seoImage && <meta property="og:image" content={seoImage} />}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
        <link rel="canonical" href="https://www.australia.lithium-downstream-summit.com/news" />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        <div className="NewsListing_container__44PGn">
          <div className="NewsListing_darkContainer__Pa9P7">
            <div className="NewsListing_topNewsContainerOuter__PGH7l">
              <h1 className="NewsListing_top_news_heding__ffzau">Top News</h1>
              <div className="NewsListing_topNewsContainer__kFBcy">
                <div className="NewsListing_left__JLN1s">
                  <Link
                    to={getNewsUrl(featuredArticle)}
                    state={featuredArticle}
                    className="NewsCard_container__njErT"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="NewsCard_innerContainer__8EUva">
                      <div className="NewsCard_upperContainer__FPKzO">
                        <img
                          src={featuredArticle?.newsImage}
                          alt={featuredArticle?.newsImageAltText}
                        />
                      </div>
                      <div className="NewsCard_lowerContainer__Jsamo">
                        <div className="NewsCard_nameDate__JcfXL NewsListing_left_sub__176br">
                          <p>{featuredArticle?.newsCategoryDetails?.newsCategory}</p>
                          <p>{formatDate(featuredArticle?.newsCreatedDate)}</p>
                        </div>
                        <div className="NewsCard_titleDescContainer__PExXU">
                          <h2>{featuredArticle?.newsTitle}</h2>
                          <p
                            lang="en"
                            dangerouslySetInnerHTML={{
                              __html:
                                featuredArticle?.newsShortDescription.replace(
                                  /^"(.*)"$/,
                                  "$1"
                                ),
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="NewsListing_right__onLH8">
                  <div className="NewsListing_rightTop__K0nYw">
                    {sidebarItems?.map((news, index) => (
                      <Link
                        key={index}
                        to={getNewsUrl(news)}
                        state={news}
                        className="NewsCard_container__njErT"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div className="NewsCard_innerContainer__8EUva">
                          <div className="NewsCard_upperContainer__FPKzO">
                            <img
                              src={news?.newsImage}
                              alt={news?.newsImageAltText}
                              style={{ height: "208px" }}
                              loading="lazy"
                            />
                          </div>
                          <div className="NewsCard_lowerContainer__Jsamo">
                            <div className="NewsCard_nameDate__JcfXL NewsListing_left_sub__176br">
                              <p>{news?.newsCategoryDetails?.newsCategory}</p>
                              <p>{formatDate(news?.newsCreatedDate)}</p>
                            </div>
                            <div className="NewsCard_titleDescContainer__PExXU">
                              <h2 style={{ fontSize: "18px", lineHeight: "24px" }}>
                                {news?.newsTitle}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="NewsListing_latestNewsContainer__Dn5fI">
              <div className="NewsSection_wholeContainer__t5qCK">
                <div className="NewsSection_latestNewsContainer__T48Li">
                  <div className="NewsSection_latestNews__9sDlt">
                    <div className="NewsSection_newsList__tnQsK">
                      <h2>Latest News</h2>
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
                    </div>
                    <div
                      className="NewsSection_featuredNews__ENl3B"
                      style={{ height: "639PX", marginTop: "10px" }}
                    >
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
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              objectFit: "cover",
                            }}
                          />
                          <div className="NewsSection_featuredcategoryAndDate__WZuqu">
                            <p>{featuredLatestArticle?.newsCategoryDetails?.newsCategory}</p>
                            <p>{formatDate(featuredLatestArticle?.newsCreatedDate)}</p>
                          </div>
                          <p
                            lang="en"
                            dangerouslySetInnerHTML={{
                              __html: featuredLatestArticle?.newsShortDescription.replace(/^"(.*)"$/, "$1"),
                            }}
                          ></p>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="NewsListing_lightContainer__7C1Ov" ref={topRef}>
            <div
              className="NewsListing_newsListingContainer__PwNmV  fade-transition"
              key={currentPage}
            >
              {currentArticles.map((article, index) => (
                <Link
                  key={index}
                  to={getNewsUrl(article)}
                  state={article}
                  className="NewsListingCard_container__s0wuY"
                  style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "flex" }}
                >
                  <div className="NewsListingCard_left__qswsn">
                    <img
                      src={article.newsImage}
                      alt={article.newsImageAltText}
                      loading="lazy"
                    ></img>
                  </div>
                  <div className="NewsListingCard_right__RDYVn">
                    <div className="NewsListingCard_categoryContainer__qknlO">
                      <p>{article?.newsCategoryDetails?.newsCategory}</p>
                      <p>{formatDate(article.newsCreatedDate)}</p>
                    </div>
                    <h2>{article.newsTitle}</h2>
                    <p
                      lang="en"
                      dangerouslySetInnerHTML={{
                        __html: article.newsShortDescription.replace(
                          /^"(.*)"$/,
                          "$1"
                        ),
                      }}
                    ></p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="pagination">
              <button
                className="pagination-button-arrow"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                <img src={leftArrowIcon} alt="left arrow icon"></img>
              </button>
              <div className="pagination-inner-container">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`pagination-button ${currentPage === i + 1 ? "active" : ""
                      }`}
                    onClick={() => handlePageClick(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                className="pagination-button-arrow"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                <img src={rightArrowIcon} alt="tight arrow icon"></img>
              </button>
            </div>
          </div>
          {agendaVersion !== 'ReleasedSoon' && agendaVersion !== 'RollingOutSoon' ? (
            <div className="TopicsOnAgenda_container__86lkR">
              <div className="TopicsOnAgenda_agendaContainer__TBsgc">
                <div>
                  <h2>topics on the agenda</h2>
                  <div className="TopicsOnAgenda_cardContainer__r-nhg">
                    {updatedAgendaList.map((topic, index) => (
                      <div key={index} className="TopicsOnAgenda_card__pUjOu">
                        <p>{topic.heading}</p>
                        <div>
                          <p>
                            {topic?.day}: {dayItem?.heading}
                          </p>
                          <p>{topic.startTime} - {topic.endTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a href="/agenda-page">view more topics</a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <SubscribeForm />
      <Footer />
    </>
  );
};
export default News;
