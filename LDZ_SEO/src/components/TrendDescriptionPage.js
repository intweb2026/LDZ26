// src/components/TrendDescriptionPage.js
import { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import FeaturedSpeaker from "./FeaturedSpeaker";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import Error404 from "./Error404";
import "../../src/assets/css/TrendDescriptionPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { useSSRData } from "../common/useSSRData";
import { useApiData } from "../common/ApiContext";
import API_BASE_URL from '../config/apiConfig';
const leftArrowIcon = "/images/WebCommonImages/icon-arrow-left.png";
const rightArrowIcon = "/images/WebCommonImages/icon-arrow-right.png";

const allTopics = [
  {
    id: 1,
    title:
      "DECENTRALISING FINANCE: BITCOIN'S ROLE IN THE EVOLUTION OF GLOBAL MONEY",
    day: "Day 1",
    date: "WEDNESDAY, 1 JULY, 2026",
    time: "11:30 - 11:55",
    speaker: "Speaker A",
    category: "Market Dynamics",
  },
  {
    id: 2,
    title:
      "FROM CODE TO CAPITAL: HOW BITCOIN INNOVATION IS RESHAPING FINANCIAL MARKETS",
    day: "Day 1",
    date: "WEDNESDAY, 1 JULY, 2026",
    time: "13:30 - 13:55",
    speaker: "Speaker B",
    category: "Mining Security",
  },
  {
    id: 3,
    title:
      "BITCOIN BEYOND CURRENCY: DRIVING INNOVATION ACROSS GLOBAL FINANCIAL SYSTEMS",
    day: "Day 1",
    date: "WEDNESDAY, 1 JULY, 2026",
    time: "14:00 - 14:25",
    speaker: "Speaker C",
    category: "Blockchain Technology",
  },
];

const TrendDescriptionPage = () => {
  const sliderRef = useRef(null);
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ SSR data — no client-side fetches
  const ssrTrends = useSSRData("trends");
  const trendList = ssrTrends || [];
  const ssrTrendDetail = useSSRData("trendDetail");
  const trendDetailData = ssrTrendDetail || [];
  const ssrSponsors = useSSRData("sponsors");
  const initialSponsors = ssrSponsors || [];

  // Resolve which trend is active from slug
  const matchedTrend = trendList.find(
    (t) => t.trendTitle.replace(/\s+/g, "-").toLowerCase() === slug,
  );

  const [currentTrendId, setCurrentTrendId] = useState(
    location.state?.id || matchedTrend?.id || null,
  );
  const [trendData, setTrendData] = useState(trendDetailData);
  const [activeTab, setActiveTab] = useState(trendDetailData?.[0]?.slug || "");
  const [isExpanded, setIsExpanded] = useState(false);
  const [sponsorList, setSponsorList] = useState(initialSponsors);
  const [settings, setSettings] = useState({});
  const [chunkedSponsors, setChunkedSponsors] = useState([]);
  const [isArrayDisplay, setIsArrayDisplay] = useState('none');
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [loading, setLoading] = useState(false); // ✅ SSR pre-renders, no loading needed
  const [validSlug, setValidSlug] = useState(!!matchedTrend);
  const contentRef = useRef(null);

  const [agendaList, setAgendaList] = useState(null);

  const {
    eventDetails,
  } = useApiData();
  const agendaVersion = eventDetails?.agendaVersion;

  useEffect(() => {
    callAgendaListApi();
  }, []);

  const callAgendaListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `${API_BASE_URL}/admin1/getagenda`,
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

  const dayItem = Array.isArray(agendaList)
    ? agendaList.find((item) => item.status === "Day")
    : null;

  const updatedAgendaList = Array.isArray(agendaList)
    ? agendaList.filter((item) => item.status === "Speaker").slice(0, 3)
    : [];

  // ✅ On slug change (client navigation), fetch only trendDetail client-side
  // Everything else (trendList, sponsors) is already in SSR data
  useEffect(() => {
    const resolved = trendList.find(
      (t) => t.trendTitle.replace(/\s+/g, "-").toLowerCase() === slug,
    );
    if (!resolved) {
      setValidSlug(false);
      return;
    }
    setValidSlug(true);
    setCurrentTrendId(resolved.id);
    fetchTrendDetailClient(resolved.id); // ✅ always fetch — SSR data only valid for initial load
  }, [slug, ssrTrends]);

  const fetchTrendDetailClient = (id) => {
    const formData = new FormData();
    formData.append("trendId", id);
    fetch(`${API_BASE_URL}/admin1/trendbyid`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          setTrendData(data.trendData);
          setActiveTab(data.trendData?.[0]?.slug || ""); // ✅ reset activeTab to first tab of new data
          setIsExpanded(false);
        } else {
          toast.error(data?.message);
        }
      })
      .catch(() => toast.error("There was an error, Please try again later."));
  };

  // Scroll to content on trend change
  useEffect(() => {
    if (contentRef.current && trendData.length > 0) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentTrendId, trendData]);

  function chunkArray(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size),
    );
  }

  function padToFill(array, totalItems) {
    const result = [...array];
    let i = 0;
    while (result.length < totalItems) {
      result.push(array[i % array.length]);
      i++;
    }
    return result;
  }

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      let itemsPerSlide = 6;
      let gridColumns = 3;
      let gridRows = 2;

      if (width <= 640) {
        itemsPerSlide = 2;
        gridColumns = 2;
        gridRows = 1;
      } else if (width <= 1230) {
        itemsPerSlide = 4;
        gridColumns = 2;
        gridRows = 2;
      }

      const sponsorImg = sponsorList.map((sponsor) => sponsor);
      const totalSlides = Math.ceil(sponsorImg.length / itemsPerSlide);
      const totalNeeded = totalSlides * itemsPerSlide;
      const padded = padToFill(sponsorImg, totalNeeded);
      const chunked = chunkArray(padded, itemsPerSlide);
      const hasEnoughSlides = sponsorImg.length > itemsPerSlide;
      const autoplayOn = hasEnoughSlides || width <= 1230;

      setIsArrayDisplay(sponsorList.length > 6 ? 'block' : 'none')
      if (width <= 850) setIsArrayDisplay('none');

      setSettings({
        dots: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: autoplayOn,
        autoplaySpeed: 4000,
        infinite: autoplayOn && hasEnoughSlides,
        cssEase: "linear",
        centerPadding: "0px",
      });

      setChunkedSponsors(
        chunked.map((group, idx) => ({
          id: idx,
          items: group,
          gridColumns,
          gridRows,
        })),
      );
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, [ssrSponsors]);

  const handleTrendListClick = (trend) => {
    const trendSlug = trend.trendTitle.replace(/\s+/g, "-").toLowerCase();
    navigate(`/trend/${trendSlug}`, {
      state: trend,
      replace: false,
    });
    setCurrentTrendId(trend.id);
    setIsExpanded(false);
  };

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  const getCurrentTabData = () =>
    trendData.find((tab) => tab.slug === activeTab) || trendData[0];

  const currentTab = getCurrentTabData();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>Loading...</div>
    );
  }

  if (!validSlug) {
    return <Error404 />;
  }

  // ✅ Dynamic SEO from backend data — works for SSR (Helmet injects into <head> server-side)
  const activeTrend = trendList.find((t) => t.id === currentTrendId);
  const seoTitle =
    activeTrend?.trendMetaTitle ||
    activeTrend?.trendTitle ||
    "Bitcoin Conference 2026";
  const seoDesc = activeTrend?.trendMetaDescription || "";
  const canonicalUrl = `${API_BASE_URL}/trend/${slug}`;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        <article className="IndustryTrends_container__TcST0">
          {/* <FeaturedSpeaker title={"MEET OUR FEATURED SPEAKERS"} /> */}
          <FeaturedSpeaker title={"HIGHLIGHTS FROM OUR LAST SHOW"} />
          <div
            className="IndustryTrends_tabsContainer__akAHa trend-scroll-anchor"
            ref={contentRef}
          >
            <div>
              {trendList.map((tab) => (
                <a
                  href={`/trend/${tab.trendTitle.replace(/\s+/g, "-").toLowerCase()}`}
                  key={tab.id}
                  style={{
                    backgroundColor:
                      currentTrendId === tab.id ? "var(--secondary-color)" : "",
                    color: currentTrendId === tab.id ? "#fff" : "",
                    boxShadow:
                      currentTrendId === tab.id
                        ? "rgba(0, 0, 0, 0.2) 0px 9px 10px -5px"
                        : "",
                  }}
                >
                  {tab.trendTitle}
                </a>
              ))}
            </div>
          </div>

          <div
            className="IndustryTrends_contentContainer__LSMa-"
            style={{
              paddingBottom:
                windowWidth > 961
                  ? isExpanded
                    ? "58px"
                    : ""
                  : "" || windowWidth < 639
                    ? isExpanded
                      ? "1px"
                      : ""
                    : "",
            }}
          >
            {currentTab && (
              <>
                <div>
                  <h2>{currentTab.trendTitle}</h2>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: currentTab.trendShortDescription,
                    }}
                  />
                  <p
                    onClick={toggleExpansion}
                    style={{ color: isExpanded ? "#868686" : "" }}
                  >
                    {isExpanded ? "SHOW LESS" : "SHOW MORE"}
                    {!isExpanded && (
                      <svg
                        width="24"
                        height="16"
                        viewBox="0 0 24 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.2071 8.70711C23.5976 8.31658 23.5976 7.68342 23.2071 7.29289L16.8431 0.928932C16.4526 0.538408 15.8195 0.538408 15.4289 0.928932C15.0384 1.31946 15.0384 1.95262 15.4289 2.34315L21.0858 8L15.4289 13.6569C15.0384 14.0474 15.0384 14.6805 15.4289 15.0711C15.8195 15.4616 16.4526 15.4616 16.8431 15.0711L23.2071 8.70711ZM0 9H22.5V7H0V9Z"
                          style={{ fill: "var(--primary-color)" }}
                        />
                      </svg>
                    )}
                  </p>
                </div>
                <div style={{ display: !isExpanded ? "none" : "" }}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: currentTab.trendLongDescription,
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {/* SPONSORS */}
          <div className="SponsorCards_container__o3uWn">
            <div className="SponsorCards_AttendeesContainer__PLZ7L">
              <h2>OUR SPONSORS</h2>
              <div>
                <img
                  src={leftArrowIcon}
                  alt="left arrow icon"
                  loading="lazy"
                  width="16"
                  onClick={() => sliderRef.current.slickPrev()}
                  style={{ display: isArrayDisplay }}
                />
                <div className="SponsorCards_cardContainerOuter__yj9ca operatorSlider">
                  <div>
                    <Slider ref={sliderRef} {...settings}>
                      {chunkedSponsors.map((group) => (
                        <div
                          key={group.id}
                          className="SponsorCards_cardContainerInner__BPPEL"
                        >
                          {group.items.map((item, i) => {
                            if (item?.sponsorType === "Dummy") {
                              return (
                                <a
                                  key={i}
                                  className={`SponsorCards_card__8eNkT ${item?.sponsorType !== "Dummy"
                                    ? "clickable"
                                    : ""
                                    }`}
                                  style={{
                                    cursor:
                                      item?.sponsorType !== "Dummy"
                                        ? "pointer"
                                        : "default",
                                  }}
                                >
                                  <img
                                    src={item?.sponsorComapnyLogo}
                                    alt={`Sponsor ${i + 1}`}
                                  />
                                  {item?.sponsorType !== "Dummy" && (
                                    <a className="SponsorCards_overlay__7MT16">
                                      <h4>{item?.sponsorComapnyName}</h4>
                                      <h4>{item?.sponsorType} Sponsor</h4>
                                    </a>
                                  )}
                                </a>
                              );
                            } else {
                              return (
                                <a
                                  key={i}
                                  href={(() => {
                                    const slug = item.sponsorComapnyName
                                      .toLowerCase()
                                      .replace(/[^a-z0-9\s-]/g, "")
                                      .replace(/\s+/g, "-")
                                      .replace(/-+/g, "-");
                                    return `/sponsor/${slug}`;
                                  })()}
                                  className={`SponsorCards_card__8eNkT ${item?.sponsorType !== "Dummy"
                                    ? "clickable"
                                    : ""
                                    }`}
                                  style={{
                                    cursor:
                                      item?.sponsorType !== "Dummy"
                                        ? "pointer"
                                        : "default",
                                  }}
                                >
                                  <img
                                    src={item?.sponsorComapnyLogo}
                                    alt={`Sponsor ${i + 1}`}
                                  />
                                  {item?.sponsorType !== "Dummy" && (
                                    <a className="SponsorCards_overlay__7MT16">
                                      <h4>{item?.sponsorComapnyName}</h4>
                                      <h4>{item?.sponsorType} Sponsor</h4>
                                    </a>
                                  )}
                                </a>
                              );
                            }
                          })}
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
                <img
                  src={rightArrowIcon}
                  alt="right arrow icon"
                  loading="lazy"
                  width="16"
                  onClick={() => sliderRef.current.slickNext()}
                  style={{ display: isArrayDisplay }}
                />
              </div>
            </div>
          </div>

          {/* TOPICS */}
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
                  <a href="/agenda-page">view more topics</a>                </div>
              </div>
            </div>
          ) : null}
        </article>
      </div>
      <SubscribeForm />
      <Footer />
    </>
  );
};

export default TrendDescriptionPage;
