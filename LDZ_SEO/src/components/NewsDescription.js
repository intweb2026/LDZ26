import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import "../../src/assets/css/NewsDescription.css";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error404 from "./Error404";
import { Helmet } from "react-helmet-async";
import { useSSRData } from "../common/useSSRData";
import API_BASE_URL from '../config/apiConfig';
const linkedInLogo = "/images/WebCommonImages/share-linkedIn.png";
const whatsappLogo = "/images/WebCommonImages/share-whatsapp.png";
const emailLogo = "/images/WebCommonImages/share-email.png";
const copyLogo = "/images/WebCommonImages/share-copy.png";

const toSlug = (str = "") => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const NewsDescription = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { state } = useLocation();
  const location = useLocation();

  // ✅ SSR data — pre-fetched by server.js before renderToString
  const ssrNewsDetail = useSSRData("newsDetail");
  const ssrNews = useSSRData("news");

  // ✅ Initialize with detail data if available, otherwise fallback to full news list (ssrNews)
  // This ensures meta data is available on the first server render.
  const [newsData, setNewsData] = useState(ssrNewsDetail || ssrNews || []);
  const [newsList, setNewsList] = useState(ssrNews || []);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [isNotFound, setIsNotFound] = useState(false);
  const [loading, setLoading] = useState(!ssrNewsDetail || ssrNewsDetail.length === 0);
  const [validSlug, setValidSlug] = useState(true); // Default to true to avoid flash of 404

  // ✅ Calculate matched item synchronously for SSR and initial render
  const matchedFromSlug = newsList.find((n) => toSlug(n.newsTitle) === slug);

  const [currentTrendId, setCurrentTrendId] = useState(
    location.state?.id || matchedFromSlug?.id || null
  );


  useEffect(() => {
    // Only fetch news list client-side if SSR didn't provide it
    if (!ssrNews || ssrNews.length === 0) {
      callNewsListApi();
    }
  }, []);

  // Update logic to find the correct news based on slug or state
  useEffect(() => {
    if (newsList.length === 0) return;

    const resolved = newsList.find((t) => toSlug(t.newsTitle) === slug);

    if (resolved) {
      setValidSlug(true);
      setCurrentTrendId(resolved.id);
      setIsNotFound(false);
      // Fetch data if not already provided by state or SSR
      if (!ssrNewsDetail || ssrNewsDetail[0]?.id !== resolved.id) {
        fetchNewsData(resolved.id);
      }
    } else {
      // If newsList is loaded and still no match, then it's actually 404
      if (newsList.length > 0) {
        setValidSlug(false);
        setIsNotFound(true);
      }
    }
  }, [slug, newsList, ssrNewsDetail]);


  const fetchNewsData = async (id) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("newsId", id);
    const requestOptions = { method: "POST", body: formData };

    fetch(`${API_BASE_URL}/admin1/newsbyid`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status && data.NewsData?.length > 0) {
          setNewsData(data["NewsData"]);
          setIsNotFound(false);
        } else {
          setIsNotFound(true);
        }
      })
      .catch(() => setIsNotFound(true))
      .finally(() => setLoading(false));
  };

  // Removed redundant effects that were causing race conditions and premature 404s

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const callNewsListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/generalnews`, requestOptions)
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
  let featuredLatestArticle = null;
  let latestNewsItems = [];
  if (newsList?.length > 0) {
    featuredLatestArticle = newsList[0];
    const remainingItems = newsList.slice(1);
    latestNewsItems =
      remainingItems.length > 5 ? remainingItems.slice(0, 4) : remainingItems;
  }
  const subscribeSectionRef = useRef(null);
  const [shareOpen, setShareOpen] = useState(true);

  const scrollToQuickProposal = () => {
    if (subscribeSectionRef.current) {
      const navbarHeight = 0;
      const elementPosition = subscribeSectionRef.current.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const openCloseShare = () => {
    setShareOpen((prev) => !prev);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const handleClick = (member) => {
    const newsSlug = toSlug(member.newsTitle);
    navigate(`/news/${newsSlug}`, { state: member }); // ✅ Pass member object in route state
  };

  const handleLinkedInShare = () => {
    // Get current page URL
    const currentUrl = window.location.href;

    // LinkedIn share URL format
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;

    // Open LinkedIn share dialog in a popup window
    window.open(
      linkedInShareUrl,
      "linkedin-share-dialog",
      "width=626,height=436,toolbar=0,status=0"
    );
  };

  const handleWhatsAppShare = () => {
    const currentUrl = window.location.href;
    const newsTitle = newsData[0]?.newsTitle || "Check out this news";
    const text = `${newsTitle} - ${currentUrl}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleGmailShare = () => {
    if (!newsData || !newsData[0]) return;

    const currentUrl = window.location.href;
    const newsTitle = newsData[0]?.newsTitle || "Interesting News Article";
    const newsDescription =
      newsData[0]?.newsShortDescription
        ?.replace(/<[^>]*>/g, "")
        .substring(0, 150) || "";

    const subject = encodeURIComponent(newsTitle);
    const body = encodeURIComponent(`I thought you might find this interesting:

${newsTitle}

${newsDescription}...

Read the full article: ${currentUrl}`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank", "width=600,height=600");
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        console.log("Link copied to clipboard: ", currentUrl);
      })
      .catch(() => {
        console.log("Failed to copy link");
      });
  };

  if (!validSlug) {
    return <Error404 />;
  }

  // Search for the news item that matches the current URL slug
  const activeNews = newsData.find((news) => {
    const newsSlug = toSlug(news.newsTitle);
    return newsSlug === slug;
  });

  const seoTitle = activeNews?.newsMetaTitle?.trim();
  const seoDesc = activeNews?.newsMetaDescription?.trim();
  const seoImage = activeNews?.newsImage;

  const canonicalUrl = slug
    ? `${API_BASE_URL}/news/${slug}`
    : `${API_BASE_URL}/news`;

  return (
    <>
      {seoTitle && seoDesc && (
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDesc} />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDesc} />
          {seoImage && <meta property="og:image" content={seoImage} />}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={canonicalUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          <meta name="twitter:description" content={seoDesc} />
          {seoImage && <meta name="twitter:image" content={seoImage} />}
        </Helmet>
      )}
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "150px" : "" }}>
          <Navbar forceScrolled />
          <div className="NewsDetails_container__goqTf">
            <div className="NewsDetails_backButtonContainer__hgOHX">
              <div className="NewsDetails_backButtonPartContainer__YHRKV">
                <a href="/news">
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.2227 5.75C13.2227 6.24219 12.8398 6.625 12.375 6.625H3.98047L6.85156 9.52344C7.20703 9.85156 7.20703 10.4258 6.85156 10.7539C6.6875 10.918 6.46875 11 6.25 11C6.00391 11 5.78516 10.918 5.62109 10.7539L1.24609 6.37891C0.890625 6.05078 0.890625 5.47656 1.24609 5.14844L5.62109 0.773438C5.94922 0.417969 6.52344 0.417969 6.85156 0.773438C7.20703 1.10156 7.20703 1.67578 6.85156 2.00391L3.98047 4.875H12.375C12.8398 4.875 13.2227 5.28516 13.2227 5.75Z"
                      fill="#171717"
                    ></path>
                  </svg>
                  Back to all News
                </a>
              </div>
            </div>
            <div className="NewsDetails_upperPartContainer__iGJWB">
              <div className="NewsDetails_upperPart__RvrUr">
                <p>{newsData[0]?.newsCategoryDetails?.newsCategory}</p>
                <h1>{newsData[0]?.newsTitle}</h1>
                <div className="NewsDetails_descriptionText__ifgC7">
                  <p
                    lang="en"
                    dangerouslySetInnerHTML={{
                      __html: newsData[0]?.newsShortDescription.replace(
                        /^"(.*)"$/,
                        "$1"
                      ),
                    }}
                  ></p>
                </div>
                <div className="NewsDetails_categoryContainer__pmy7Y">
                  <p>{formatDate(newsData[0]?.newsCreatedDate)}</p>
                  {shareOpen === true && (
                    <div>
                      <button onClick={scrollToQuickProposal}>Subscribe</button>
                      <button
                        className="NewsDetails_share__laT4U"
                        onClick={openCloseShare}
                      >
                        Share
                      </button>
                    </div>
                  )}
                  {shareOpen === false && (
                    <div className="NewsDetails_sharePopUpContainer__UB1au">
                      <button onClick={openCloseShare}>X</button>
                      <h6>Share</h6>
                      <div className="NewsDetails_shareIconsContainer__ZkpQn">
                        <div className="NewsDetails_shareIconBox__E6cI5">
                          <button
                            class="react-share__ShareButton"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              padding: "0px",
                              font: "inherit",
                              color: "inherit",
                              cursor: "pointer",
                            }}
                            onClick={handleLinkedInShare}
                          >
                            <img src={linkedInLogo} alt="Share on LinkedIn" />
                          </button>
                        </div>
                        <div className="NewsDetails_shareIconBox__E6cI5">
                          <button
                            class="react-share__ShareButton"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              padding: "0px",
                              font: "inherit",
                              color: "inherit",
                              cursor: "pointer",
                            }}
                            onClick={handleWhatsAppShare}
                          >
                            <img src={whatsappLogo} alt="Share via WhatsApp" />
                          </button>
                        </div>
                        <div className="NewsDetails_shareIconBox__E6cI5">
                          <button
                            class="react-share__ShareButton"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              padding: "0px",
                              font: "inherit",
                              color: "inherit",
                              cursor: "pointer",
                            }}
                            onClick={handleGmailShare}
                          >
                            <img src={emailLogo} alt="Share via Email" />
                          </button>
                        </div>
                        <div className="NewsDetails_shareIconBox__E6cI5">
                          <button
                            class="react-share__ShareButton"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              padding: "0px",
                              font: "inherit",
                              color: "inherit",
                              cursor: "pointer",
                            }}
                            onClick={handleCopyLink}
                          >
                            <img src={copyLogo} alt="Copy" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="NewsDetails_lowerPart__F5RRQ">
              <div className="NewsDetails_left__SL1Qe">
                <div className="NewsDetails_content__0+gd8">
                  <img src={newsData[0]?.newsImage} alt={newsData[0]?.newsImageAltText}></img>
                  <p
                    lang="en"
                    dangerouslySetInnerHTML={{
                      __html: newsData[0]?.newsDescription.replace(
                        /^"(.*)"$/,
                        "$1"
                      ),
                    }}
                  ></p>
                </div>
              </div>
              <div className="NewsDetails_right__P72yX">
                <div className="NewsSection_wholeContainer__t5qCK">
                  <div className="NewsSection_latestNewsLightContainer__M19xp">
                    {windowWidth < 1024 && <h2>Latest News</h2>}
                    <div className="NewsSection_latestNews__9sDlt">
                      <div className="NewsSection_newsList__tnQsK">
                        {windowWidth > 1024 && <h2>Latest News</h2>}
                        <ul>
                          {latestNewsItems?.map((item, index) => (
                            <li key={index}>
                              <Link
                                to={`/news/${toSlug(item.newsTitle)}`}
                                state={item}
                                style={{ textDecoration: "none", color: "inherit" }} // keeps original look
                              >
                                <div className="NewsSection_categoryAndDate__WBz4R">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "100%" }}></div>
            <div
              ref={subscribeSectionRef}
              style={{
                transition: "margin-top 0.3s ease",
                width: "100%",
              }}
            >
              <SubscribeForm />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default NewsDescription;
