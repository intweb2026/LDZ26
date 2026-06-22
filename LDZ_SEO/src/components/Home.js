import React, { useState, useEffect, useRef } from "react";
import API_BASE_URL, { mediaUrl } from '../config/apiConfig';
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import CountSection from "./CountSection";
import ForumSection from "./ForumSection";
import HomeSpeakerSlider from "./HomeSpeakerSlider";
import IndustryTrend from "./IndustryTrend";
import KeyTopics from "./KeyTopics";
import LatestNews from "./LatestNews";
import LogoCarousel from "./LogoCarousel";
import Navbar from "./Navbar";
import PastAttandessSection from "./PastAttandessSection";
import RelatedEventsSection from "./RelatedEventsSection";
import TestimonialCarousel from "./TestimonialCarousel";
import VideoSection from "./VideoSection";
import "../../src/assets/css/home.css";
import "../../src/assets/css/sponsor.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useApiData } from "../common/ApiContext";
import { useSSRData } from "../common/useSSRData";
import { usePageSeo } from "../common/usePageSeo";
const leftArrowIcon = "/images/WebCommonImages/icon-arrow-left.png";
const rightArrowIcon = "/images/WebCommonImages/icon-arrow-right.png";
// const leftArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";
// const rightArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-right.png";

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

const Home = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // ✅ SSR data — no client-side API calls
  const ssrSponsorList = useSSRData("sponsors");
  const sponsorList = ssrSponsorList || [];
  const { eventGeneralSettings } = useApiData();
  const eventName =
    eventGeneralSettings?.eventName ||
    "Litihium Downstream Summit 2026";

  const [settings, setSettings] = useState({});
  const [chunkedSponsors, setChunkedSponsors] = useState([]);
  const [isArrayDisplay, setIsArrayDisplay] = useState('none');

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

      const sponsors = ssrSponsorList || [];
      const sponsorImg = sponsors.map((sponsor) => sponsor);
      const totalSlides = Math.ceil(sponsorImg.length / itemsPerSlide);
      const totalNeeded = totalSlides * itemsPerSlide;
      const padded = padToFill(sponsorImg, totalNeeded);
      const chunked = chunkArray(padded, itemsPerSlide);
      const hasEnoughSlides = sponsorImg.length > itemsPerSlide;
      const autoplayOn = hasEnoughSlides || width <= 1230;

      setIsArrayDisplay(sponsors.length > 6 ? 'block' : 'none')
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
  }, [ssrSponsorList]);

  const pageSeo = usePageSeo("home");
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
        <link rel="canonical" href="/" />
      </Helmet>
      <Navbar />
      <article className="HomeScreen_wholeContainer__oE8Au">
        <VideoSection />
        <HomeSpeakerSlider />
        <ForumSection />
        <KeyTopics />
        <CountSection />
        <LogoCarousel />
        <LatestNews />
        <TestimonialCarousel />
        <PastAttandessSection />
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
                        {/* {group.items.map((item, i) => {
                          const handleClick = () => {
                            if (item?.sponsorType !== "Dummy") {
                              const sponsorName = item?.sponsorComapnyName
                                .toLowerCase().replace(/[^a-z0-9\s-]/g, "")
                                .replace(/\s+/g, "-").replace(/-+/g, "-");
                              navigate(`/sponsor/${sponsorName}`, { state: item });
                            }
                          };
                          return (
                            <div key={i}
                              className={`SponsorCards_card__8eNkT ${item?.sponsorType !== "Dummy" ? "clickable" : ""}`}
                              onClick={item?.sponsorType !== "Dummy" ? handleClick : undefined}
                              style={{ cursor: item?.sponsorType !== "Dummy" ? "pointer" : "default" }}
                            >
                              <img src={mediaUrl(item?.sponsorComapnyLogo)} alt={`Sponsor ${i + 1}`} />
                              {item?.sponsorType !== "Dummy" && (
                                <div className="SponsorCards_overlay__7MT16">
                                  <h4>{item?.sponsorComapnyName}</h4>
                                  <h4>{item?.sponsorType} Sponsor</h4>
                                </div>
                              )}
                            </div>
                          );
                        })} */}
                        {group.items.map((item, i) => {
                          // const handleClick = () => {
                          //   if (item?.sponsorType !== "Dummy") {
                          //     const sponsorName = item?.sponsorComapnyName
                          //       .toLowerCase()
                          //       .replace(/[^a-z0-9\s-]/g, "") // remove special characters
                          //       .replace(/\s+/g, "-") // replace spaces with hyphens
                          //       .replace(/-+/g, "-"); // collapse multiple hyphens

                          //     navigate(`/sponsor/${sponsorName}`, {
                          //       state: item, // pass full sponsor data to description page
                          //     });
                          //   }
                          // };
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
                                  src={mediaUrl(item?.sponsorComapnyLogo)}
                                  alt={`Sponsor ${i + 1}`}
                                  loading="lazy"
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
                                  src={mediaUrl(item?.sponsorComapnyLogo)}
                                  alt={`Sponsor ${i + 1}`}
                                  loading="lazy"
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
                          // return (
                          //   <a
                          //     key={i}
                          //     href={(() => {
                          //       if (item?.sponsorType === "Dummy" || !item?.sponsorComapnyName) return "#";
                          //       const slug = item.sponsorComapnyName
                          //         .toLowerCase()
                          //         .replace(/[^a-z0-9\s-]/g, "")
                          //         .replace(/\s+/g, "-")
                          //         .replace(/-+/g, "-");
                          //       return `/sponsor/${slug}`;
                          //     })()}
                          //     className={`SponsorCards_card__8eNkT ${item?.sponsorType !== "Dummy"
                          //       ? "clickable"
                          //       : ""
                          //       }`}
                          //     style={{
                          //       cursor:
                          //         item?.sponsorType !== "Dummy"
                          //           ? "pointer"
                          //           : "default",
                          //     }}
                          //   >
                          //     <img
                          //       src={mediaUrl(item?.sponsorComapnyLogo)}
                          //       alt={`Sponsor ${i + 1}`}
                          //     />
                          //     {item?.sponsorType !== "Dummy" && (
                          //       <div className="SponsorCards_overlay__7MT16">
                          //         <h4>{item?.sponsorComapnyName}</h4>
                          //         <h4>{item?.sponsorType} Sponsor</h4>
                          //       </div>
                          //     )}
                          //   </a>
                          // );
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
        <IndustryTrend />
        {/* SEO internal links — same hidden pattern used in Footer.js; zero visual impact */}
        <div
          style={{
            visibility: "hidden",
            height: 0,
            overflow: "hidden",
            position: "absolute",
          }}
        >
          <a href="/">Lithium &amp; Downstream Summit 2026</a>
          <a href="/">Lithium Downstream trends</a>
          <a href="/">market evolution insights</a>
          <a href="/">crypto innovation analysis</a>
          <a href="/">Litihium Downstream Summit 2026</a>
        </div>
        <RelatedEventsSection />
      </article>
      <Footer />
    </>
  );
};

export default Home;
