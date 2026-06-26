import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import "../../src/assets/css/sponsor.css";
import "../../src/assets/css/form.css";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import LogoCarousel from "./LogoCarousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestimonialCarousel from "./TestimonialCarousel";
import { useSSRData } from "../common/useSSRData";
import { usePageSeo } from "../common/usePageSeo";
import { useApiData } from "../common/ApiContext";
import API_BASE_URL, { mediaUrl } from '../config/apiConfig';
const leftArrowIcon = "/images/WebCommonImages/icon-arrow-left.png";
const rightArrowIcon = "/images/WebCommonImages/icon-arrow-right.png";
const emailIcon = "/images/WebCommonImages/msg.png";
const phoneIcon = "/images/WebCommonImages/phone-call.png";

const Sponsors = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // ✅ SSR data — no client-side GET requests
  const ssrSponsorList = useSSRData("sponsors");
  const sponsorList = ssrSponsorList || [];
  const ssrMediaPartners = useSSRData("mediaPartners");
  const mediaPageHelpersList = ssrMediaPartners || [];
  const ssrSponsorPageData = useSSRData("sponsorPageData");
  const sponsorPageData = ssrSponsorPageData || [];
  const paraDes =
    sponsorPageData[0]?.introParaDescription?.replace(/^"(.*)"$/, "$1") || "";

  const [isMobileScreen, setIsMobile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fullNameErr, setFullNameErr] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyNameErr, setCompanyNameErr] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileErr, setMobileErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [message, setMessage] = useState("");

  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");
  const [companyErrorMessage, setCompanyNameErrorMessage] = useState("");
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkOnChange = () => {

    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    setFullNameErr(false);
    setCompanyNameErr(false);
    setEmailErr(false);
    setMobileErr(false);

    if (!fullName || fullName.trim() === "") {
      setFullNameErrorMessage(<p>Full name is required</p>)
      setFullNameErr(true);
      hasError = true;
    } else {
      setFullNameErrorMessage("")
    }

    if (!companyName || companyName.trim() === "") {
      setCompanyNameErrorMessage(<p>Company name is required</p>)
      setCompanyNameErr(true);
      hasError = true;
    } else {
      setCompanyNameErrorMessage("")
    }

    if (!email || email.trim() === "") {
      setEmailErrorMessage(<p>Email address is required</p>)
      setEmailErr(true);
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailErrorMessage(<p>Please enter a valid email address</p>)
      setEmailErr(true);
      hasError = true;
    } else {
      setEmailErrorMessage("")
    }

    if (!mobile || mobile.trim() === "") {
      setMobileErrorMessage(<p>Mobile number is required</p>)
      setMobileErr(true);
      hasError = true;
    } else {
      setMobileErrorMessage("")
    }

    if (hasError) return;
  };

  const submitBtnClk = (e) => {
    e.preventDefault();

    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    setFullNameErr(false);
    setCompanyNameErr(false);
    setEmailErr(false);
    setMobileErr(false);

    if (!fullName || fullName.trim() === "") {
      setFullNameErrorMessage(<p>Full name is required</p>)
      setFullNameErr(true);
      hasError = true;
    } else {
      setFullNameErrorMessage("")
    }

    if (!companyName || companyName.trim() === "") {
      setCompanyNameErrorMessage(<p>Company name is required</p>)
      setCompanyNameErr(true);
      hasError = true;
    } else {
      setCompanyNameErrorMessage("")
    }

    if (!email || email.trim() === "") {
      setEmailErrorMessage(<p>Email address is required</p>)
      setEmailErr(true);
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailErrorMessage(<p>Please enter a valid email address</p>)
      setEmailErr(true);
      hasError = true;
    } else {
      setEmailErrorMessage("")
    }

    if (!mobile || mobile.trim() === "") {
      setMobileErrorMessage(<p>Mobile number is required</p>)
      setMobileErr(true);
      hasError = true;
    } else {
      setMobileErrorMessage("")
    }

    if (hasError) return;

    setSuccessMessage(<p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>Submitted Successfully</p>)
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);

    const finalData = new FormData();
    finalData.append("requesterName", fullName);
    finalData.append("requesterCompanyName", companyName);
    finalData.append("requesterMobile", mobile);
    finalData.append("requesterEmail", email);
    if (message?.length > 0) {
      finalData.append("requesterMessage", JSON.stringify(message));
    }

    const requestOptions = {
      method: "POST",
      body: finalData,
    };
    fetch(`${API_BASE_URL}/admin1/addcrowdformrequest`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setFullName("");
          setFullNameErr(false);
          setCompanyName("");
          setCompanyNameErr(false);
          setMobile("");
          setMobileErr(false);
          setEmail("");
          setEmailErr(false);
          setEmailErrMsg("");
          setMessage("");
        } else {
          // toast.error(data?.message);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 991);
  };

  useEffect(() => {
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cleanHtml = (html) => {
    if (!html) return "";
    let cleaned = html.replace(/^"(.*)"$/, "$1");
    cleaned = cleaned.replace(/\\"/g, '"');
    cleaned = cleaned.replace(
      /<a\s+href=["']([^"']+)["'][^>]*>/gi,
      (match, url) => {
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">`;
        }
        return match;
      },
    );
    return cleaned;
  };

  function chunkArray(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size),
    );
  }

  function padToFill(array, totalItems) {
    const result = [...array];
    let i = 0;
    while (result.length < totalItems) {
      result.push(array[i % array.length]); // repeat to fill blank slots
      i++;
    }
    return result;
  }

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
  }, [ssrSponsorList]);

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const cards = [
    {
      title: "Exposure to Leading Industry Attendees",
      desc: "Maximize your visibility at our state-of-the-art exhibition facilities. Engage with top-tier industry leaders and key decision-makers.",
      points: [
        "Exclusive face-to-face interactions with attendees.",
        "Access to an extensive network of professionals.",
        "Connect with international industry participants.",
        "Trade show stands to showcase your innovative products.",
        "Enhanced exposure from the press and media partners.",
      ],
    },
    {
      title: "Multiple Lead Generation Opportunities",
      desc: "Gain access to meaningful engagement at the event. Our event is a hub for high-level networking and lead generation, attracting decision makers and industry influencers.",
      points: [
        "Special meeting areas for targeted prospect interactions.",
        "Networking events designed for business expansion and partnerships.",
        "A platform to engage with a diverse, international audience.",
        "Dynamic spaces for interactive product and service presentations.",
        "Opportunities for media features and brand amplification.",
      ],
    },
    {
      title: "Spotlight on Innovation",
      desc: "Showcase your products and solutions at the upcoming event. Our event sets the stage for you to impress the industry's most influential leaders and media. Enjoy benefits like:",
      points: [
        "Premium locations for showcasing cutting-edge technologies.",
        "Exposure to attendees looking for new and innovative solutions.",
        "Interactive sessions with potential clients and partners.",
        "Media platforms for gaining worldwide media coverage.",
        "Bespoke exhibition spaces for standout demonstrations.",
      ],
    },
  ];

  const allowedRow1and3Indexes = [0, 3]; // Testimonials3 & Testimonials6
  const allowedRow2Indexes = [1, 2]; // Testimonials4 & Testimonials5

  const [index13, setIndex13] = useState(0); // For row 1 and 3
  const [row2Left, setRow2Left] = useState(0);
  const [row2Right, setRow2Right] = useState(1);

  useEffect(() => {
    // Row 1 and 3 update every 5s
    const interval13 = setInterval(() => {
      setIndex13((prev) => (prev + 1) % allowedRow1and3Indexes.length);
    }, 5000);

    // Row 2 starts after 5s, then updates every 8s
    const timeout2 = setTimeout(() => {
      const updateRow2 = () => {
        let left = Math.floor(Math.random() * allowedRow2Indexes.length);
        let right;
        do {
          right = Math.floor(Math.random() * allowedRow2Indexes.length);
        } while (right === left); // Ensure different images

        setRow2Left(left);
        setRow2Right(right);
      };

      updateRow2(); // Initial update at 5s

      const interval2 = setInterval(updateRow2, 8000); // Every 8s after that

      // Cleanup interval2 only
      const cleanup = () => clearInterval(interval2);
      window.addEventListener("beforeunload", cleanup);
      return cleanup;
    }, 5000);

    // Cleanup both timers
    return () => {
      clearInterval(interval13);
      clearTimeout(timeout2);
    };
  }, []);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sponsorLogoBlack =
    `${API_BASE_URL}/api/images/sponsor/1757675931045-678212680.png`;

  const pageSeo = usePageSeo("sponsors");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDesc = pageSeo.pageMetaDescription;
  const seoImage = pageSeo.pageOgImage || null;
  return (
    <div id="root">
      <>
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDesc} />
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDesc} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={seoTitle} />
          <link rel="canonical" href={`${API_BASE_URL}/sponsors`} />
        </Helmet>
        <Navbar forceScrolled />
        <div style={{ opacity: 1 }}>
          <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
            <article className="SponsorsScreen_container__a4ngc">
              <div
                className="DetailsContainer_wholeContainer__385Iv"
                style={{ backgroundColor: "#e5e5e5" }}
              >
                <div className="DetailsContainer_container__JrWjX">
                  <div
                    className="DetailsContainer_imageContainer__ncJwH"
                    style={{
                      backgroundImage: `url(/images/WebImages/sponsor-image.png)`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="DetailsContainer_textContainer__D8Ukb">
                    <h1>
                      EXHIBIT YOUR SERVICES AT {eventDetails?.eventName}
                    </h1>
                    <div className="DetailsContainer_innerContent__6NQGR">
                      <div>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: cleanHtml(paraDes),
                          }}
                        ></p>
                      </div>
                    </div>
                    <a className="DetailsContainer_cstom_btn__+cVfU" href="/sponsor-packages" target="_self">
                      exhibit now
                    </a>
                  </div>
                </div>
              </div>
              {sponsorList.map(
                (group) =>
                  group?.sponsorType === "Lead" && (
                    <div className="SponsorBanner_container__19tBD">
                      <div className="SponsorBanner_PartnerSponsorContainer__zdVCD">
                        <h2>Lead Sponsor</h2>
                        <div className="SponsorBanner_imageContainer__xHm3Z">
                          <a href="/">
                            <img
                              src={sponsorLogoBlack}
                              loading="lazy"
                              alt="Halliburton"
                            ></img>
                          </a>
                        </div>
                      </div>
                    </div>
                  ),
              )}
              {/* {item?.sponsorType === "Partner" && (
                <div className="SponsorBanner_container__19tBD">
                  <div className="SponsorBanner_PartnerSponsorContainer__zdVCD">
                    <h2>Lead Sponsor</h2>
                    <div className="SponsorBanner_imageContainer__xHm3Z">
                      <a href="/">
                        <img src={sponsorLogoBlack} loading="lazy" alt="Halliburton"></img>
                      </a>
                    </div>
                  </div>
                </div>
              )} */}
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
                            // <div key={group.id}>
                            <div
                              key={group.id}
                              className="SponsorCards_cardContainerInner__BPPEL"
                            >
                              {/* {group.items.map((item, i) => {
                                const handleClick = () => {
                                  if (item?.sponsorType !== "Dummy") {
                                    const sponsorName = item?.sponsorComapnyName
                                      .toLowerCase()
                                      .replace(/[^a-z0-9\s-]/g, "") // remove special characters
                                      .replace(/\s+/g, "-") // replace spaces with hyphens
                                      .replace(/-+/g, "-"); // collapse multiple hyphens

                                    navigate(`/sponsor/${sponsorName}`, {
                                      state: item, // pass full sponsor data to description page
                                    });
                                  }
                                };

                                return (
                                  <div
                                    key={i}
                                    className={`SponsorCards_card__8eNkT ${item?.sponsorType !== "Dummy"
                                      ? "clickable"
                                      : ""
                                      }`}
                                    onClick={
                                      item?.sponsorType !== "Dummy"
                                        ? handleClick
                                        : undefined
                                    }
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
                                    />
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
                                //       if (
                                //         item?.sponsorType === "Dummy" ||
                                //         !item?.sponsorComapnyName
                                //       )
                                //         return "#";
                                //       const slug = item.sponsorComapnyName
                                //         .toLowerCase()
                                //         .replace(/[^a-z0-9\s-]/g, "")
                                //         .replace(/\s+/g, "-")
                                //         .replace(/-+/g, "-");
                                //       return `/sponsor/${slug}`;
                                //     })()}
                                //     className={`SponsorCards_card__8eNkT ${
                                //       item?.sponsorType !== "Dummy"
                                //         ? "clickable"
                                //         : ""
                                //     }`}
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
                                //       <a className="SponsorCards_overlay__7MT16">
                                //         <h4>{item?.sponsorComapnyName}</h4>
                                //         <h4>{item?.sponsorType} Sponsor</h4>
                                //       </a>
                                //     )}
                                //   </a>
                                // );
                              })}
                            </div>
                            // </div>
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
              <div className="SponsorsScreen_exhibitCardContainer__6IHeV">
                <h2>WHY EXHIBIT AT THE SHOW?</h2>

                {isMobileScreen ? (
                  <Slider {...sliderSettings}>
                    {cards.map((card, index) => (
                      // <div key={index}>
                      <div
                        key={index}
                        className="SponsorsScreen_exhibitCard__nXsu2"
                      >
                        <span>
                          <h4>{card.title}</h4>
                          <p>{card.desc}</p>
                          <ul>
                            {card.points.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </span>
                      </div>
                      // </div>
                    ))}
                  </Slider>
                ) : (
                  <div>
                    {cards.map((card, index) => (
                      <div
                        key={index}
                        className="SponsorsScreen_exhibitCard__nXsu2"
                      >
                        <span>
                          <h4>{card.title}</h4>
                          <p>{card.desc}</p>
                          <ul>
                            {card.points.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="SponsorsScreen_sponsorsHelp__-E0Kh">
                <h2>our sponsorship can help you</h2>
                <div>
                  <div class="SponsorsScreen_card__EoH0S">
                    <span>
                      <svg
                        width="27"
                        height="39"
                        viewBox="0 0 27 39"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.2222 23.9571C15.2222 22.7801 15.2222 21.6031 15.2222 20.4262C15.2222 20.1418 15.2279 20.1455 15.5045 20.1299C16.1241 20.0949 16.7461 20.0892 17.3316 19.8254C17.9849 19.5307 18.4924 19.0811 18.8433 18.4622C19.0023 18.1819 19.1925 18.0447 19.5368 18.027C21.2707 17.9387 22.563 16.7362 22.7935 15.0085C22.8744 14.4028 22.8 13.8024 22.5371 13.2435C22.4126 12.9788 22.4282 12.7392 22.5321 12.475C22.9278 11.469 22.9299 10.4712 22.4163 9.50049C22.0728 8.85118 21.5538 8.37365 20.9034 8.04406C20.6647 7.92324 20.5024 7.75187 20.3795 7.51968C19.8146 6.45284 18.9534 5.78668 17.7417 5.62599C17.1837 5.55202 16.6327 5.62517 16.1117 5.84051C15.8134 5.9638 15.5887 5.92681 15.3266 5.71805C14.34 4.93148 13.2339 4.67545 12.0177 5.09833C11.417 5.30709 10.9133 5.67531 10.5197 6.17298C10.3233 6.4212 10.1281 6.489 9.81378 6.41667C8.55279 6.12572 7.42123 6.39942 6.53209 7.35941C5.67705 8.28242 5.373 9.38542 5.69307 10.6282C5.77155 10.9335 5.74484 11.0362 5.49708 11.2314C3.89178 12.4968 3.8852 14.5668 4.78215 15.8711C5.39888 16.7682 6.29172 17.2133 7.35508 17.3337C7.59914 17.3613 7.7372 17.4681 7.81403 17.6982C8.28696 19.1082 9.26074 19.9129 10.7391 20.1007C11.0735 20.143 11.0785 20.1517 11.0785 20.4788C11.0785 22.8052 11.0785 25.1316 11.0785 27.458C11.0785 27.6745 10.9674 27.7828 10.7452 27.7831C9.7879 27.7831 8.83055 27.7831 7.8732 27.7831C7.60325 27.7831 7.58682 27.7716 7.59052 27.5106C7.59709 27.0393 7.60161 26.5675 7.62544 26.0965C7.65174 25.5779 7.46109 25.1719 7.03131 24.8896C6.67713 24.657 6.30405 24.4535 5.94741 24.2246C3.53678 22.6782 1.79835 20.5869 0.836477 17.8741C0.362733 16.5381 0.112097 15.1589 0.025812 13.742C-0.117174 11.3958 0.331096 9.18323 1.44047 7.10955C1.96557 6.12777 2.61887 5.23764 3.36914 4.41409C4.17446 3.53012 5.05539 2.73533 6.05054 2.07369C7.64475 1.01343 9.40824 0.410964 11.2962 0.131925C12.1883 7.60321e-06 13.0836 -0.0304032 13.9743 0.0291855C14.7004 0.0776783 15.4227 0.228909 16.138 0.376853C18.2315 0.810411 20.0829 1.75027 21.6898 3.1545C23.9875 5.16244 25.5164 7.63064 26.076 10.659C26.2855 11.7932 26.3332 12.9365 26.2744 14.0896C26.1808 15.9303 25.7132 17.6637 24.8585 19.2936C24.3219 20.3173 23.6321 21.2304 22.8637 22.0926C21.8575 23.2223 20.6236 24.05 19.3487 24.8267C18.907 25.0959 18.6658 25.439 18.7052 25.9856C18.7426 26.503 18.7093 27.0253 18.7167 27.5452C18.7192 27.7206 18.6584 27.7868 18.4788 27.7856C17.4734 27.7798 16.4684 27.7786 15.463 27.7864C15.2657 27.788 15.2193 27.7067 15.2201 27.5295C15.2247 26.339 15.2226 25.1485 15.2222 23.9575V23.9571Z"></path>
                        <path d="M13.8713 23.3481C13.8713 24.7441 13.8717 26.1401 13.8713 27.5357C13.8713 27.8045 13.8606 27.8148 13.596 27.816C13.2952 27.8172 12.994 27.8123 12.6933 27.8176C12.5441 27.8201 12.4648 27.7757 12.464 27.6093C12.4624 27.3294 12.4348 27.0496 12.4348 26.7697C12.4319 24.4363 12.4328 22.1029 12.4324 19.7695C12.4324 19.6326 12.4356 19.4954 12.425 19.3589C12.3896 18.9106 12.1221 18.6813 11.6735 18.7117C11.551 18.7199 11.4282 18.7343 11.3074 18.7556C10.2321 18.9455 9.2049 18.1433 9.02452 17.0313C8.99494 16.8492 8.98837 16.6631 8.95016 16.4835C8.85442 16.0322 8.60255 15.8584 8.14853 15.9377C7.65835 16.0232 7.18625 15.9948 6.72278 15.798C5.49589 15.2769 5.11953 13.4987 6.05387 12.5461C6.26506 12.3308 6.53911 12.1767 6.7877 11.9987C6.8596 11.9473 6.94465 11.9149 7.01861 11.8664C7.36868 11.6371 7.4451 11.3979 7.29349 11.0083C7.18954 10.7412 7.04367 10.4835 6.9841 10.2069C6.8029 9.36612 7.03258 8.64037 7.71382 8.10037C8.40369 7.5538 9.16505 7.52421 9.95476 7.87476C10.0858 7.93311 10.2136 8.00051 10.3488 8.04736C10.68 8.16243 10.8965 8.09093 11.0896 7.79709C11.2618 7.5349 11.3949 7.24312 11.5905 7.00066C12.2733 6.15532 13.478 6.00573 14.3491 6.65463C14.5537 6.8071 14.73 7.00641 14.8927 7.20614C15.26 7.65737 15.5111 7.71901 15.9984 7.41038C16.3735 7.17285 16.7573 6.96983 17.2113 6.95627C18.1407 6.92792 18.8676 7.38654 19.2119 8.26599C19.3943 8.73201 19.6762 9.02708 20.1528 9.2116C21.3945 9.69242 21.8468 11.0667 21.1434 12.191C20.8435 12.6706 20.8513 13.089 21.1611 13.5583C21.6599 14.3144 21.572 15.0875 21.0834 15.8087C20.6204 16.4925 19.9375 16.7506 19.1248 16.6783C18.9752 16.6651 18.8281 16.6253 18.6785 16.6162C18.347 16.5965 18.1497 16.7239 18.0199 17.0292C17.9427 17.2117 17.8819 17.402 17.7952 17.5799C17.3136 18.5682 16.2938 18.994 15.2461 18.6504C15.0903 18.5995 14.9375 18.535 14.7785 18.5C14.165 18.3661 13.8729 18.5991 13.8721 19.2221C13.8696 20.5975 13.8713 21.973 13.8717 23.3485L13.8713 23.3481Z"></path>
                        <path d="M13.1642 29.2051C14.901 29.2051 16.6378 29.2051 18.3742 29.2051C18.6725 29.2051 18.6745 29.2067 18.6745 29.4997C18.6745 31.6067 18.6745 33.7141 18.6745 35.8211C18.6745 36.1132 18.672 36.1153 18.3737 36.1153C14.8936 36.1153 11.4134 36.1153 7.93289 36.1153C7.62678 36.1153 7.62637 36.1145 7.62596 35.8059C7.62555 35.5457 7.62555 35.286 7.62596 35.0259C7.62623 34.8171 7.73416 34.7124 7.94973 34.7119C9.53614 34.7119 11.1221 34.7119 12.7085 34.7119C14.1306 34.7119 15.5531 34.7119 16.9751 34.7119C17.2677 34.7119 17.2681 34.7107 17.2685 34.4123C17.2685 34.125 17.2656 33.8378 17.2693 33.5501C17.2709 33.4203 17.2192 33.359 17.0873 33.366C17.0191 33.3697 16.9505 33.366 16.8823 33.366C13.9079 33.366 10.9339 33.366 7.95959 33.366C7.73881 33.366 7.62829 33.2574 7.62801 33.0401C7.62801 32.78 7.6276 32.5203 7.62801 32.2601C7.62883 31.9626 7.63212 31.9585 7.92261 31.9585C8.90708 31.9581 9.89196 31.9585 10.8764 31.9585C12.907 31.9585 14.938 31.9585 16.9685 31.9585C17.1671 31.9585 17.2667 31.8611 17.2672 31.6663C17.2677 31.379 17.2631 31.0914 17.2685 30.8041C17.2709 30.6627 17.2122 30.6056 17.0729 30.6105C16.9225 30.6159 16.7721 30.6114 16.6218 30.6114C13.7366 30.6114 10.851 30.6114 7.96576 30.6114C7.73922 30.6114 7.62582 30.4985 7.62555 30.2727C7.62555 30.006 7.62432 29.7389 7.62555 29.4722C7.62678 29.2174 7.63746 29.2055 7.89221 29.2055C9.64954 29.2047 11.4065 29.2055 13.1638 29.2055L13.1642 29.2051Z"></path>
                        <path d="M8.09277 37.5596H18.2509C18.1318 37.802 17.9966 38.005 17.9292 38.2286C17.7579 38.7961 17.407 38.935 16.8215 38.9264C14.2169 38.8878 11.6111 38.9067 9.00616 38.9149C8.77401 38.9157 8.64089 38.852 8.55501 38.6322C8.43832 38.3334 8.29164 38.0461 8.15975 37.7531C8.13551 37.6997 8.12112 37.6422 8.09318 37.56L8.09277 37.5596Z"></path>
                      </svg>
                    </span>
                    <p>
                      Introduce your latest products and services to key
                      industry players.
                    </p>
                  </div>
                  <div class="SponsorsScreen_card__EoH0S">
                    <span>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14.9931 22.945C12.81 22.9226 10.7374 22.4211 8.74211 21.5561C6.64455 20.6466 4.728 19.4482 2.98111 17.9768C1.96735 17.1227 1.0297 16.1898 0.156446 15.1925C-0.0166154 14.9948 -0.0154786 14.9774 0.166671 14.7906C0.800598 14.1418 1.41748 13.4752 2.07602 12.8525C3.47831 11.5261 5.02867 10.394 6.71309 9.44897C8.23731 8.59373 9.83274 7.91196 11.5365 7.50214C12.4449 7.2836 13.3655 7.15482 14.3001 7.1052C16.7828 6.97377 19.1303 7.5048 21.39 8.50094C23.5171 9.43875 25.4666 10.6648 27.2074 12.1995C28.0985 12.9855 28.9054 13.8668 29.7503 14.705C29.7636 14.7183 29.7749 14.7338 29.7878 14.7475C30.0499 15.0221 30.0472 15.0198 29.7848 15.2883C29.3311 15.7527 28.8907 16.2303 28.4279 16.6852C26.7499 18.3343 24.8864 19.7327 22.7964 20.8228C21.2578 21.6254 19.6612 22.2765 17.9549 22.6154C17.2653 22.7526 16.5598 22.8124 15.8603 22.895C15.5733 22.9287 15.2825 22.9294 14.9931 22.945ZM19.3647 15.0035C19.3647 12.5881 17.4281 10.639 15.0253 10.636C12.59 10.6326 10.6337 12.573 10.6322 14.9933C10.6306 17.4196 12.5805 19.3714 15.0056 19.371C17.4236 19.371 19.3651 17.4253 19.3647 15.0035Z"></path>
                        <path d="M2.68699 30.0048C1.88076 30.0048 1.07453 30.0052 0.268295 30.0048C0.016845 30.0048 0.000568035 29.9885 0.000568035 29.7359C-0.000189345 28.1292 -0.000189345 26.5229 0.000568035 24.9162C0.000568035 24.6776 0.0115367 24.667 0.242538 24.6662C0.677273 24.6651 1.11202 24.6723 1.54637 24.6628C1.72852 24.6586 1.78608 24.7241 1.78494 24.9037C1.7785 25.9244 1.78154 26.9448 1.7823 27.9656C1.7823 28.2148 1.78456 28.2167 2.03677 28.2167C3.06339 28.2171 4.09003 28.2167 5.11704 28.2171C5.36167 28.2171 5.37113 28.2265 5.37151 28.4735C5.37265 28.9083 5.36621 29.3431 5.37454 29.7776C5.37795 29.9507 5.31546 30.0086 5.14354 30.0071C4.32481 30.0007 3.50572 30.0044 2.68699 30.0044V30.0048Z"></path>
                        <path d="M29.9964 2.68011C29.9964 3.48687 29.9972 4.29363 29.9964 5.10039C29.9964 5.33371 29.9839 5.34507 29.7499 5.34583C29.3216 5.34696 28.8929 5.34696 28.4646 5.34583C28.2227 5.34545 28.2143 5.33674 28.2139 5.08562C28.2132 4.07092 28.2139 3.05622 28.2136 2.04152C28.2136 1.79116 28.2113 1.78889 27.9602 1.78889C26.9457 1.78851 25.9312 1.78889 24.9167 1.78851C24.6675 1.78851 24.6599 1.78093 24.6596 1.5355C24.6584 1.09424 24.6634 0.652985 24.6573 0.212108C24.655 0.0583308 24.7107 1.72063e-06 24.8667 0.000380481C26.5049 0.00378933 28.1435 0.00416809 29.7817 1.72063e-06C29.9476 -0.00037704 30.0006 0.0617397 29.9999 0.222713C29.9946 1.04197 29.9976 1.86123 29.9976 2.68087L29.9964 2.68011Z"></path>
                        <path d="M29.9967 27.3402C29.9967 28.1465 29.9971 28.9533 29.9967 29.7597C29.9967 29.9934 29.9853 30.0047 29.7498 30.0051C28.1369 30.0059 26.5245 30.0059 24.9116 30.0051C24.6624 30.0051 24.6534 29.9957 24.653 29.7529C24.6522 29.3181 24.659 28.8832 24.6496 28.4488C24.6458 28.2742 24.7105 28.2189 24.8806 28.22C25.9011 28.2253 26.9217 28.2227 27.9423 28.2223C28.21 28.2223 28.2104 28.2215 28.2104 27.9466C28.2104 26.9447 28.2104 25.9429 28.2104 24.9411C28.2104 24.6623 28.2111 24.6619 28.4974 24.6616C28.9132 24.6612 29.3291 24.6608 29.7449 24.6616C29.9876 24.6623 29.9959 24.6707 29.9963 24.921C29.997 25.7274 29.9963 26.5342 29.9963 27.3405L29.9967 27.3402Z"></path>
                        <path d="M0.0288545 2.66513C0.0288545 1.85799 0.0330075 1.05123 0.0254337 0.244092C0.0235403 0.0630448 0.0837542 0.0020644 0.264389 0.00244316C1.87799 0.00698828 3.49159 0.00736704 5.10518 0.00244316C5.28733 0.0020644 5.34679 0.0645599 5.34262 0.24485C5.3324 0.673228 5.33998 1.10198 5.33922 1.53074C5.33884 1.77277 5.33012 1.78148 5.07943 1.78148C4.08347 1.78224 3.08753 1.78148 2.09196 1.78148C1.88797 1.78148 1.78584 1.88652 1.78558 2.09661C1.78558 3.09275 1.78558 4.08889 1.78558 5.08503C1.78558 5.33387 1.77839 5.34107 1.53224 5.34145C1.10357 5.34259 0.674899 5.33653 0.246601 5.3441C0.0822497 5.34713 0.0262022 5.28653 0.0273383 5.12328C0.0330186 4.30365 0.0299824 3.48401 0.0299824 2.66475L0.0288545 2.66513Z"></path>
                        <path d="M15.0102 12.3657C16.3818 12.3305 17.6611 13.463 17.6527 15.0254C17.6448 16.5234 16.4065 17.6566 15.0034 17.6494C13.5227 17.6418 12.37 16.4722 12.3575 14.9708C12.3458 13.5577 13.6011 12.3078 15.0102 12.3657Z"></path>
                      </svg>
                    </span>
                    <p>
                      Boost your brand's visibility and credibility within the
                      market.
                    </p>
                  </div>
                  <div class="SponsorsScreen_card__EoH0S">
                    <span>
                      <svg
                        width="46"
                        height="28"
                        viewBox="0 0 46 28"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M31.8187 23.9575C31.7527 24.0924 31.676 24.2136 31.5685 24.3145C31.4352 24.4395 31.3223 24.5897 31.1592 24.679C31.0023 24.7645 30.845 24.8716 30.6748 24.9061C30.4806 24.9455 30.2772 24.9866 30.073 24.9596C29.9742 24.8745 29.8376 24.9555 29.7326 24.8787C29.645 24.8143 29.5433 24.7687 29.4508 24.7101C29.406 24.6819 29.3649 24.6458 29.3271 24.6084C28.9452 24.2281 28.5492 23.8603 28.1861 23.463C27.4705 22.6792 26.6802 21.9693 25.9596 21.1922C25.572 20.7737 25.1619 20.3789 24.7655 19.97C24.6518 19.8525 24.521 19.7533 24.365 19.6881C24.1309 19.5901 23.986 19.5968 23.7452 19.6927C23.4987 19.7911 23.3256 19.9517 23.209 20.1884C23.1563 20.2955 23.1306 20.4072 23.1081 20.5192C23.0845 20.6376 23.1538 20.7484 23.1708 20.8634C23.197 21.0415 23.3186 21.1606 23.4269 21.2744C24.0395 21.9162 24.663 22.5481 25.2856 23.1799C25.6637 23.5639 26.0501 23.9396 26.4278 24.3245C26.8222 24.7259 27.2082 25.1352 27.6033 25.5359C27.6876 25.6214 27.7083 25.7293 27.7444 25.8306C27.7606 25.8763 27.7253 25.9427 27.7075 25.9979C27.6718 26.1071 27.6585 26.2233 27.5776 26.318C27.497 26.4122 27.4472 26.5301 27.3563 26.6198C27.1654 26.8079 26.9321 26.939 26.679 26.9822C26.4349 27.0237 26.1809 27.0042 25.9405 26.8743C25.765 26.7796 25.584 26.6912 25.4599 26.5409C25.1619 26.1797 24.812 25.8709 24.4874 25.5367C24.1603 25.1996 23.8121 24.882 23.4941 24.5366C22.9674 23.9649 22.4096 23.424 21.865 22.8698C21.7284 22.7307 21.5608 22.6332 21.3873 22.5717C21.2271 22.5153 21.039 22.5364 20.8767 22.6107C20.7281 22.6788 20.5737 22.7461 20.4729 22.8868C20.3815 23.0138 20.2944 23.1413 20.2832 23.3061C20.279 23.37 20.2404 23.4344 20.2462 23.4958C20.2653 23.6972 20.323 23.8894 20.4405 24.0567C20.5057 24.1493 20.5808 24.2369 20.6601 24.3182C20.8672 24.5312 21.0888 24.7309 21.2876 24.9509C21.8691 25.5948 22.4984 26.1914 23.1085 26.8066C23.2368 26.9361 23.3808 27.0503 23.5166 27.1707C23.4684 27.2915 23.3688 27.3185 23.2571 27.3235C22.9168 27.3384 22.6976 27.316 22.3776 27.1944C22.1315 27.1005 21.8754 27.0416 21.628 26.9519C21.2258 26.8062 20.8381 26.6385 20.5023 26.3636C20.2989 26.1972 20.0777 26.0527 19.8698 25.8916C19.7058 25.765 19.5581 25.6168 19.3879 25.5001C19.1758 25.3548 18.9836 25.1846 18.7744 25.0356C18.6246 24.9289 18.4793 24.8085 18.3349 24.6906C18.1659 24.5528 17.9816 24.4324 17.8194 24.2896C17.6679 24.1567 17.5022 24.0451 17.3478 23.9172C17.1913 23.7873 17.0403 23.6486 16.8618 23.544C16.7775 23.4946 16.7086 23.4165 16.6306 23.3534C16.372 23.1459 16.118 22.9333 15.8478 22.739C15.6689 22.6103 15.5137 22.4497 15.336 22.3189C15.1604 22.1898 14.9986 22.0437 14.8197 21.9175C14.6399 21.7904 14.4847 21.6289 14.3075 21.4982C14.1323 21.3686 13.9787 21.2117 13.7903 21.098C13.6998 21.0432 13.6205 20.9676 13.5429 20.8945C13.3437 20.7065 13.1216 20.5479 12.9058 20.381C12.731 20.2461 12.5725 20.0904 12.3948 19.9596C12.2026 19.8181 12.0238 19.6595 11.837 19.5121C11.5805 19.3099 11.341 19.0812 11.1222 18.8387C10.9998 18.703 10.8728 18.5718 10.7507 18.4356C10.6794 18.3559 10.6142 18.2708 10.5449 18.1899C10.4797 18.1139 10.4017 18.052 10.3502 17.9603C10.3079 17.8847 10.2294 17.8287 10.1634 17.7677C10.0148 17.6311 10.0078 17.4617 10.0667 17.2898C10.1995 16.9021 10.312 16.5081 10.4403 16.1187C10.5465 15.7966 10.6445 15.4703 10.7387 15.1444C10.7794 15.0032 10.8167 14.8579 10.8595 14.7164C10.9023 14.5756 10.9068 14.4224 10.9882 14.2933C11.0546 13.9043 11.1978 13.5357 11.2937 13.1542C11.3605 12.8876 11.4182 12.6161 11.5136 12.3554C11.5601 12.2288 11.5846 12.0943 11.6166 11.9627C11.6759 11.7186 11.7257 11.4724 11.8071 11.2333C11.8507 11.1054 11.8768 10.9713 11.9063 10.8393C11.9399 10.687 11.9632 10.5321 12.0009 10.3806C12.0474 10.1934 12.1201 10.0115 12.1508 9.82222C12.1748 9.6736 12.2188 9.52912 12.2487 9.38258C12.2761 9.24848 12.2786 9.09779 12.3633 8.97615C12.3533 8.74201 12.455 8.52821 12.4978 8.30403C12.5359 8.10435 12.5858 7.90134 12.6364 7.70166C12.6763 7.54598 12.7107 7.3849 12.7397 7.22424C12.7688 7.06607 12.7916 6.90541 12.8468 6.75139C12.8776 6.6667 12.89 6.57413 12.9004 6.48362C12.9211 6.30221 12.983 6.13075 13.0241 5.95431C13.0407 5.88291 13.0697 5.84638 13.144 5.84928C13.1714 5.85053 13.1992 5.84928 13.227 5.84928H16.8128C16.7921 5.89246 16.7837 5.92152 16.7667 5.94394C16.6111 6.15109 16.4463 6.35161 16.279 6.54839C16.1105 6.74641 15.9598 6.95689 15.8034 7.1628C15.6307 7.38988 15.4817 7.63523 15.3318 7.87851C15.1538 8.16828 14.9873 8.4647 14.8437 8.77439C14.6877 9.11149 14.554 9.45606 14.4336 9.80686C14.373 9.98329 14.3398 10.1668 14.278 10.3432C14.2435 10.4408 14.2448 10.5504 14.2282 10.6546C14.2157 10.7318 14.1996 10.8086 14.1875 10.8862C14.1763 10.9572 14.2157 11.0378 14.1456 11.0971C14.1626 11.2719 14.112 11.4496 14.1763 11.6231C14.2103 11.7149 14.1979 11.8157 14.2211 11.9141C14.2842 12.1827 14.3901 12.4272 14.5453 12.6514C14.6279 12.7706 14.703 12.9042 14.8122 12.9939C14.9695 13.1226 15.1206 13.2596 15.2953 13.3709C15.5884 13.5573 15.9175 13.6432 16.2363 13.7532C16.3919 13.8068 16.5638 13.8446 16.736 13.8512C16.8207 13.8545 16.9045 13.8769 16.9884 13.8911C17.0722 13.9052 17.1673 13.8549 17.2407 13.9326C17.4155 13.9143 17.5944 13.9708 17.7662 13.8998C17.7899 13.8902 17.8189 13.8911 17.8455 13.8915C18.2112 13.8935 18.5594 13.8005 18.8989 13.6806C19.1521 13.5909 19.3966 13.4792 19.6257 13.3314C19.7838 13.2293 19.9399 13.1222 20.101 13.0271C20.1998 12.969 20.2508 12.8524 20.3704 12.8291C20.614 12.5995 20.8601 12.3729 21.1 12.1396C21.3412 11.9046 21.3088 11.8884 21.7135 11.7257C21.9019 11.6497 22.09 11.5671 22.278 11.4869C22.4129 11.4292 22.5474 11.3682 22.6868 11.323C22.8458 11.2711 22.9969 11.2022 23.1455 11.1291C23.3123 11.0473 23.4842 11.0075 23.6643 11.0344C23.7648 11.0498 23.859 11.1021 23.9358 11.1781C24.1417 11.3827 24.3811 11.5484 24.5941 11.746C24.7551 11.8954 24.9294 12.0337 25.1017 12.1711C25.3204 12.3455 25.5188 12.5443 25.7492 12.705C25.8588 12.7814 25.9547 12.8785 26.0559 12.9669C26.2842 13.167 26.5067 13.3738 26.7416 13.566C27.006 13.7827 27.2688 13.9998 27.5273 14.224C27.7851 14.4478 28.0549 14.657 28.3114 14.8837C28.492 15.0431 28.6821 15.1929 28.8634 15.3524C29.0183 15.4889 29.1806 15.6189 29.3424 15.7472C29.5616 15.9211 29.7583 16.1212 29.9895 16.2819C30.1273 16.3778 30.2431 16.5048 30.3706 16.6156C30.4407 16.6767 30.515 16.7331 30.5876 16.7921C30.6603 16.851 30.7163 16.9237 30.8022 16.9727C30.911 17.0354 30.9998 17.1329 31.0957 17.2172C31.329 17.4219 31.5572 17.6327 31.7959 17.8308C31.9927 17.9939 32.1832 18.1641 32.3791 18.3269C32.6559 18.5569 32.9257 18.7918 33.1776 19.0484C33.352 19.2265 33.5081 19.4191 33.662 19.6146C33.7496 19.7255 33.8476 19.828 33.9393 19.9356C34.2452 20.2942 34.52 20.6762 34.696 21.1141C34.7669 21.2906 34.8396 21.4724 34.8454 21.6763C34.852 21.9091 34.8321 22.1088 34.7238 22.3197C34.5735 22.6124 34.3398 22.7668 34.0182 22.8557C33.6969 22.9441 33.2964 22.7751 33.1021 22.5809C32.2911 21.7688 31.4609 20.9751 30.6731 20.1415C30.0393 19.471 29.3611 18.845 28.7373 18.1662C28.4637 17.8681 28.1753 17.5863 27.8951 17.2957C27.7972 17.1944 27.688 17.1022 27.5747 17.0183C27.5149 16.9743 27.4373 16.9498 27.3638 16.9291C27.0359 16.8365 26.7528 16.9303 26.5025 17.1479C26.2983 17.3251 26.1933 17.5572 26.1763 17.8196C26.1593 18.0799 26.2701 18.3078 26.4453 18.4929C26.8599 18.9321 27.2816 19.3651 27.705 19.7956C28.1122 20.2095 28.5372 20.606 28.9332 21.0295C29.8555 22.0167 30.8325 22.9495 31.7797 23.9118C31.7934 23.9255 31.8042 23.9421 31.8171 23.9579L31.8187 23.9575Z"></path>
                        <path d="M45.9964 11.6965C45.9964 14.6669 45.9955 17.6372 45.9997 20.6072C45.9997 20.74 45.9727 20.8604 45.9042 20.9617C45.8166 21.0921 45.727 21.2245 45.5747 21.3009C45.348 21.4146 45.116 21.4794 44.8599 21.479C43.0701 21.4757 41.2804 21.4773 39.4906 21.4773C39.2993 21.4773 38.9265 21.3839 38.7705 21.2668C38.6314 21.1622 38.4978 21.0418 38.4143 20.8824C38.2881 20.6416 38.2205 20.3818 38.1541 20.119C38.1163 19.9699 38.0798 19.8184 38.0275 19.6743C37.9839 19.5535 37.9449 19.429 37.9175 19.3074C37.8909 19.187 37.8503 19.0691 37.8183 18.952C37.756 18.7237 37.6929 18.4937 37.6124 18.2712C37.5713 18.157 37.551 18.0366 37.5049 17.9224C37.4613 17.8145 37.4331 17.6871 37.4024 17.5696C37.358 17.3985 37.2928 17.2291 37.2393 17.0581C37.1073 16.6367 36.9691 16.217 36.8308 15.7977C36.6906 15.3722 36.5486 14.9475 36.405 14.5232C36.2738 14.1355 36.1344 13.7507 35.9966 13.3658C35.8957 13.0835 35.7932 12.8008 35.6915 12.5185C35.5728 12.1876 35.4342 11.8642 35.3337 11.5263C35.2665 11.3009 35.1577 11.0883 35.0722 10.8683C35.0141 10.7197 34.9639 10.5677 34.9103 10.4175C34.846 10.2369 34.7667 10.0625 34.702 9.88192C34.6011 9.59962 34.4737 9.32687 34.3695 9.04581C34.2545 8.73446 34.1238 8.42891 34.0042 8.11921C33.9146 7.88798 33.8154 7.6584 33.7237 7.42758C33.639 7.2142 33.5526 6.99915 33.4613 6.79034C33.3696 6.58069 33.2878 6.3644 33.1886 6.15641C33.1015 5.97292 33.0218 5.78361 32.9309 5.60053C32.8595 5.45689 32.7727 5.32073 32.6976 5.17875C32.6113 5.0156 32.549 4.84455 32.5598 4.65608C32.5685 4.50164 32.6154 4.36382 32.7279 4.24882C32.8732 4.1002 33.0251 3.9632 33.2202 3.88391C33.6049 3.7274 33.9914 3.57421 34.3873 3.44884C34.6563 3.36373 34.9211 3.26617 35.193 3.18937C35.3146 3.15492 35.4383 3.108 35.5603 3.0806C35.6807 3.05362 35.7973 3.01044 35.916 2.98138C36.102 2.9353 36.2896 2.87801 36.4755 2.83899C36.6407 2.80453 36.808 2.7651 36.9745 2.73354C37.1442 2.70116 37.319 2.68289 37.4858 2.62187C37.595 2.58201 37.7216 2.59156 37.8399 2.57454C37.8972 2.56624 37.9524 2.54465 38.0096 2.5351C38.0673 2.52514 38.1341 2.55669 38.1802 2.49359C38.1852 2.48695 38.2068 2.49234 38.2205 2.49276C38.3205 2.49442 38.4168 2.48446 38.5156 2.45581C38.6019 2.4309 38.6962 2.43713 38.7887 2.41637C38.9572 2.37901 39.1353 2.38399 39.3088 2.36738C39.4072 2.35784 39.5047 2.33874 39.6027 2.32712C39.701 2.31591 39.806 2.35452 39.8965 2.2856C39.9011 2.28228 39.9102 2.2856 39.9169 2.28519C40.1394 2.27149 40.3618 2.24658 40.5839 2.24865C40.6947 2.24948 40.7902 2.19593 40.8985 2.20133C41.0019 2.20672 41.1139 2.22748 41.2077 2.19718C41.3763 2.14238 41.5435 2.176 41.7104 2.16064C41.8154 2.15068 41.92 2.12826 42.025 2.12162C42.135 2.11456 42.2533 2.14445 42.355 2.11456C42.5368 2.06101 42.7215 2.10709 42.8983 2.07388C43.1075 2.03444 43.3208 2.06682 43.523 2.02863C43.6927 1.99625 43.8621 2.02406 44.0248 1.99127C44.2203 1.95183 44.4174 1.97632 44.6084 1.94685C44.7209 1.92941 44.8317 1.91031 44.9446 1.91405C45.2331 1.92277 45.4916 2.0224 45.717 2.19842C45.8436 2.29723 45.9125 2.4446 45.9789 2.58617C46.003 2.63723 45.9939 2.70573 45.9939 2.76634C45.9947 4.08567 45.9943 5.405 45.9943 6.72433V11.6978L45.9964 11.6965Z"></path>
                        <path d="M0.00599765 9.80116C0.00599765 6.94871 0.00599603 4.09625 0.00433576 1.24379C0.00433576 1.14208 0.0317294 1.04784 0.0450115 0.949867C0.0582937 0.851893 0.0537263 0.755162 0.0848564 0.655113C0.174511 0.367002 0.347176 0.163168 0.632328 0.0656093C0.736094 0.0299069 0.849413 0.0145447 0.959821 0.00665696C1.09721 -0.00330651 1.23626 -0.000813923 1.37406 0.00582839C1.47243 0.0108101 1.56956 0.0373787 1.66793 0.044021C1.77128 0.0510784 1.88335 0.0207722 1.97674 0.0510777C2.13156 0.10131 2.28844 0.0589668 2.43704 0.0913481C2.61178 0.129541 2.78985 0.101727 2.95837 0.135353C3.1136 0.166489 3.27049 0.14241 3.41784 0.176037C3.55896 0.208003 3.703 0.183925 3.83582 0.217967C3.97736 0.254499 4.12098 0.225439 4.25421 0.259066C4.38164 0.291032 4.51155 0.269444 4.63067 0.30058C4.75146 0.332131 4.87349 0.312619 4.9868 0.341679C5.10012 0.370324 5.21551 0.355794 5.32218 0.383193C5.42844 0.410593 5.53885 0.395233 5.63597 0.425539C5.73642 0.45709 5.83976 0.435917 5.92982 0.466638C6.02321 0.498189 6.11702 0.481583 6.20377 0.505246C6.46817 0.578727 6.74212 0.593672 7.00859 0.65885C7.17753 0.699949 7.35641 0.726935 7.53033 0.758486C7.68017 0.785885 7.83416 0.810793 7.98317 0.861025C8.10935 0.903785 8.24757 0.926203 8.37998 0.952357C8.65392 1.00633 8.91127 1.10513 9.17442 1.18941C9.50357 1.29485 9.8215 1.42853 10.132 1.57964C10.408 1.71415 10.6823 1.85198 10.9617 1.97901C11.2153 2.09442 11.4448 2.35347 11.4967 2.664C11.5374 2.90852 11.5482 2.97992 11.4946 3.2726C11.4731 3.38967 11.4826 3.51463 11.4482 3.62714C11.3921 3.80814 11.4187 4.00574 11.3278 4.17761C11.351 4.29385 11.3033 4.40179 11.2842 4.51222C11.2609 4.64673 11.2543 4.78331 11.2091 4.91533C11.18 5.00002 11.2016 5.09467 11.1684 5.18849C11.1273 5.30432 11.1485 5.4409 11.1169 5.56171C11.0696 5.74437 11.0596 5.93326 11.0073 6.11593C10.9779 6.2193 10.9771 6.3372 10.9534 6.44679C10.8853 6.76397 10.8596 7.08985 10.7537 7.39997C10.7268 7.47884 10.728 7.56685 10.7114 7.65071C10.6678 7.87365 10.6027 8.08994 10.5499 8.30955C10.5059 8.4918 10.4636 8.67405 10.415 8.85505C10.3652 9.04186 10.3129 9.22785 10.2689 9.41591C10.2141 9.64798 10.1394 9.87464 10.0847 10.1063C10.0402 10.2944 9.98214 10.4783 9.93192 10.6647C9.86841 10.9013 9.81859 11.1421 9.74927 11.3766C9.68701 11.5867 9.63929 11.8001 9.57786 12.0101C9.52182 12.2015 9.46994 12.3937 9.41515 12.5855C9.35538 12.7956 9.30391 13.0082 9.24248 13.2178C9.19018 13.3967 9.13789 13.5752 9.08808 13.7546C9.02582 13.9775 8.96729 14.2017 8.90503 14.425C8.85689 14.5982 8.80292 14.77 8.75644 14.9436C8.69625 15.1677 8.64561 15.3944 8.58169 15.6173C8.52691 15.8091 8.47295 16.0009 8.42315 16.194C8.37832 16.3679 8.32353 16.5398 8.27621 16.7129C8.24218 16.837 8.20689 16.962 8.18033 17.0865C8.14007 17.2767 8.06992 17.4581 8.03672 17.6507C8.0031 17.8462 7.93212 18.0351 7.88273 18.2286C7.80677 18.5267 7.70382 18.8185 7.54859 19.0838C7.4469 19.2577 7.29831 19.4064 7.09493 19.4628C6.97 19.4977 6.84132 19.5297 6.70684 19.5292C5.76007 19.5268 4.81372 19.528 3.86695 19.528C2.92019 19.528 2.05685 19.5259 1.15159 19.5297C0.963562 19.5305 0.783406 19.4994 0.605758 19.445C0.348416 19.3665 0.179488 19.1917 0.0910783 18.9435C0.0632688 18.8654 0.0541495 18.7778 0.0412824 18.6931C-0.0325995 18.2087 0.0172061 17.723 0.00765954 17.2385C-0.00230207 16.7482 0.00557205 16.2579 0.00557205 15.7676V9.80033L0.00599765 9.80116Z"></path>
                        <path d="M36.1974 19.0649C36.1713 19.091 36.1418 19.1205 36.1136 19.1487C36.0796 19.1338 36.0356 19.1276 36.0144 19.1027C35.9542 19.0317 35.8558 18.9918 35.8355 18.8872C35.8334 18.876 35.8168 18.8677 35.8073 18.8577C35.6653 18.7025 35.5171 18.5522 35.3835 18.3903C35.1523 18.1096 34.8742 17.873 34.6397 17.5982C34.4845 17.4159 34.3255 17.2366 34.147 17.0817C33.8619 16.8343 33.6107 16.5528 33.3277 16.3058C33.1845 16.1809 33.0496 16.0476 32.9089 15.9206C32.6577 15.6943 32.4108 15.4631 32.1497 15.2489C31.9629 15.0953 31.7874 14.9284 31.5968 14.781C31.3756 14.6091 31.1784 14.4099 30.9493 14.2471C30.8518 14.1782 30.7696 14.0873 30.6741 14.0122C30.4575 13.8415 30.2578 13.6501 30.0453 13.4745C29.8643 13.3251 29.683 13.1769 29.5061 13.022C29.3144 12.8543 29.1172 12.692 28.9246 12.5243C28.7221 12.3474 28.5158 12.1747 28.3141 11.9962C28.092 11.7994 27.8666 11.6072 27.6446 11.4104C27.4121 11.2045 27.178 11.0015 26.9456 10.7952C26.7086 10.5847 26.4687 10.3767 26.2321 10.165C26.0167 9.97197 25.7863 9.79511 25.5792 9.59128C25.4933 9.507 25.3961 9.43394 25.304 9.3559C25.2118 9.27785 25.1255 9.19191 25.0267 9.12299C24.8362 8.98973 24.6349 8.88553 24.4021 8.82783C24.2173 8.78175 24.0364 8.78756 23.8583 8.80126C23.7023 8.8133 23.5478 8.87931 23.3988 8.93743C23.2204 9.00676 23.0473 9.09269 22.8701 9.16202C22.4421 9.32974 22.0391 9.56056 21.5879 9.6714C21.4675 9.70088 21.3476 9.74654 21.2264 9.74322C21.0628 9.73866 20.9151 9.79885 20.7648 9.83746C20.664 9.86362 20.5764 9.95163 20.4896 10.0205C20.2871 10.1816 20.1588 10.4083 19.997 10.6046C19.9048 10.7163 19.8239 10.8392 19.7255 10.9463C19.6039 11.0783 19.4715 11.2 19.3461 11.3287C19.0705 11.6118 18.7198 11.7637 18.3595 11.8999C18.2175 11.8879 18.0868 11.9638 17.9424 11.9472C17.8332 11.9348 17.7207 11.9526 17.6111 11.9435C17.2467 11.9119 16.8927 11.8451 16.5685 11.6579C16.4581 11.5944 16.383 11.5043 16.3053 11.4133C16.2784 11.3818 16.2667 11.3307 16.2634 11.2871C16.2447 11.0588 16.273 10.8346 16.3452 10.6171C16.4137 10.4108 16.4817 10.204 16.5527 9.99854C16.6241 9.79221 16.6864 9.58215 16.8279 9.40737C16.8586 9.36918 16.8628 9.31106 16.8889 9.26788C17.0433 9.01382 17.1948 8.75767 17.3588 8.50941C17.5173 8.26905 17.685 8.0349 17.8573 7.80408C17.9498 7.68037 18.0652 7.57368 18.1623 7.45287C18.4263 7.12407 18.7107 6.81355 19.0141 6.5217C19.1108 6.42871 19.217 6.34527 19.3187 6.25684C19.42 6.16841 19.5039 6.06379 19.6213 5.98907C19.745 5.91019 19.845 5.7952 19.9592 5.70096C20.082 5.60008 20.2066 5.50127 20.3352 5.40787C20.515 5.27751 20.6976 5.15048 20.8819 5.02677C21.145 4.84992 21.4123 4.67971 21.6888 4.5232C21.9133 4.39616 22.1466 4.29279 22.3931 4.22222C22.555 4.17572 22.7185 4.13711 22.885 4.10473C23.1843 4.0462 23.4827 4.08065 23.7811 4.07193C23.8645 4.06944 23.9501 4.04412 24.0376 4.10349C24.104 4.14832 24.214 4.06861 24.2858 4.15205C24.4336 4.14417 24.5685 4.20104 24.7088 4.22761C24.9267 4.26913 25.1318 4.34676 25.3355 4.42107C25.707 4.55641 26.0798 4.6905 26.4425 4.85075C26.5758 4.9097 26.7152 4.95993 26.8518 5.01265C26.9892 5.06538 27.1233 5.13138 27.2619 5.1729C27.6184 5.27959 27.9525 5.44232 28.3012 5.56894C28.5457 5.65778 28.7852 5.7678 29.0284 5.8637C29.3372 5.98575 29.646 6.10863 29.9548 6.22985C30.2645 6.35191 30.5762 6.46566 30.8912 6.57152C31.0004 6.60805 31.1124 6.63213 31.2212 6.67447C31.5205 6.79071 31.5977 6.84427 31.7724 7.10083C31.8687 7.24239 31.9119 7.40305 31.9758 7.55624C32.0298 7.68576 32.0547 7.82858 32.1161 7.95354C32.1929 8.10921 32.2452 8.27444 32.3033 8.43552C32.3618 8.59742 32.4203 8.76223 32.4826 8.92123C32.5851 9.18278 32.6719 9.45013 32.7852 9.70752C32.857 9.87109 32.9122 10.0417 32.9724 10.2103C33.0197 10.3427 33.0554 10.4801 33.111 10.6088C33.2455 10.9202 33.3542 11.2402 33.4713 11.5578C33.5638 11.8094 33.6651 12.0577 33.7602 12.3084C33.8237 12.4757 33.8826 12.6447 33.9449 12.8124C34.0271 13.0341 34.1105 13.2549 34.1939 13.4762C34.3205 13.8108 34.4475 14.145 34.5749 14.4788C34.7294 14.8844 34.8792 15.292 35.0357 15.6968C35.1178 15.9094 35.1876 16.1331 35.2631 16.3494C35.3428 16.5773 35.4304 16.8048 35.5113 17.0332C35.6649 17.4674 35.811 17.9041 35.9579 18.3404C36.0376 18.5767 36.1132 18.8145 36.1949 19.0657L36.1974 19.0649Z"></path>
                      </svg>
                    </span>
                    <p>
                      Promote your company's recent innovations and strategic
                      vision.
                    </p>
                  </div>
                  <div class="SponsorsScreen_card__EoH0S">
                    <span>
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M27.9985 12.2751C27.9985 16.0299 27.9985 19.7841 27.9985 23.5389C27.9985 24.1298 27.5523 24.5906 27.0207 24.4745C26.7622 24.4175 26.4949 24.2196 26.3167 24.0122C25.2645 22.7888 24.0859 21.71 22.7605 20.7927C20.6917 19.3619 18.4207 18.3978 15.9591 17.8887C15.7772 17.8515 15.7488 17.7777 15.7495 17.6192C15.7524 14.0382 15.7532 10.4565 15.748 6.87546C15.748 6.69068 15.8087 6.63882 15.9854 6.60084C19.971 5.74046 23.3418 3.8152 26.0597 0.764439C26.1868 0.621286 26.3051 0.4701 26.4365 0.331329C26.7176 0.0340676 27.0528 -0.0827921 27.4501 0.0618216C27.7809 0.182333 27.9999 0.543137 27.9999 0.957258C27.9999 4.73036 27.9999 8.50273 27.9999 12.2758L27.9985 12.2751Z"></path>
                        <path d="M3.50058 15.7453C2.63817 15.7453 1.81009 15.7453 0.982729 15.7453C0.343773 15.7453 0.00127791 15.4056 0.000547677 14.7724C-0.000182559 13.0867 -0.000182559 11.4003 0.000547677 9.71458C0.000547677 9.09157 0.340845 8.74829 0.957895 8.74756C1.79475 8.74683 2.63087 8.74756 3.50058 8.74756C3.50058 8.45688 3.49912 8.18664 3.50058 7.9164C3.50423 7.35255 3.85839 6.99832 4.42432 6.99759C7.2036 6.99613 9.9836 6.99978 12.7629 6.99394C13.1623 6.99321 13.561 6.94793 13.9795 6.92236V17.5376H10.8146C10.8475 17.6084 10.8833 17.6888 10.9227 17.7677C11.8289 19.5826 12.7359 21.3976 13.6421 23.2126C14.0926 24.1146 13.9765 24.8194 13.2558 25.5374C12.6227 26.1677 11.9918 26.7987 11.3535 27.4239C10.3334 28.4223 8.87657 28.0878 8.36979 26.7395C7.2445 23.7458 6.11919 20.7512 5.00266 17.7538C4.92599 17.5471 4.83326 17.4682 4.61565 17.4908C4.27901 17.5266 3.96355 17.4755 3.71965 17.1994C3.53782 16.9935 3.48963 16.7546 3.49912 16.4902C3.50788 16.2543 3.50131 16.0184 3.50131 15.7445L3.50058 15.7453Z"></path>
                      </svg>
                    </span>
                    <p>
                      Showcase the success of your projects and attract new
                      investment opportunities.
                    </p>
                  </div>
                  <div class="SponsorsScreen_card__EoH0S">
                    <span>
                      <svg
                        width="37"
                        height="32"
                        viewBox="0 0 37 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.0397 32C16.1085 31.955 13.7236 31.8116 11.3926 31.1892C10.1206 30.85 8.8965 30.3905 7.80388 29.6234C7.66521 29.5261 7.53492 29.4179 7.39865 29.317C6.74953 28.8381 6.43513 28.2424 6.52478 27.3793C6.68856 25.8014 6.7029 24.2064 6.89656 22.6334C7.21215 20.0744 8.50679 18.2011 10.9586 17.3392C12.2114 16.8991 13.5204 16.6208 14.8079 16.284C14.9203 16.2548 15.0996 16.295 15.1845 16.374C16.1515 17.2626 17.3147 17.5678 18.5771 17.5556C19.8143 17.5434 20.9512 17.2249 21.88 16.3327C21.9362 16.2779 22.0534 16.25 22.1323 16.2646C23.7293 16.5588 25.3037 16.9271 26.7801 17.6468C28.5625 18.516 29.6204 19.9638 29.9802 21.9003C30.2109 23.1427 30.303 24.4143 30.4142 25.6774C30.4823 26.4554 30.4883 27.2419 30.4811 28.0236C30.4787 28.2449 30.3819 28.5038 30.2444 28.6776C29.5284 29.5784 28.5529 30.1084 27.5248 30.5449C25.8823 31.2439 24.1537 31.5976 22.3917 31.7702C21.1006 31.8967 19.8012 31.9489 19.0397 31.9988V32Z"></path>
                        <path d="M24.8472 6.69251C24.9225 9.81674 24.2889 12.1982 22.3332 14.0594C19.9746 16.3035 16.5808 16.1576 14.3753 13.7518C12.8355 12.073 12.1804 10.0453 12.1721 7.79511C12.1673 6.44209 12.245 5.08785 12.6479 3.77251C13.3161 1.59649 14.796 0.442834 16.9717 0.11947C18.2221 -0.0665248 19.4606 -0.0434301 20.6955 0.245896C22.8114 0.744314 24.0319 2.14353 24.4957 4.23811C24.7085 5.19726 24.7778 6.18923 24.8472 6.6913V6.69251Z"></path>
                        <path d="M11.5787 1.76176C10.1538 5.76612 9.94694 9.6939 12.0652 13.5694C10.614 14.4277 9.12329 14.5237 7.62781 13.6983C6.08452 12.8449 5.22023 11.4408 4.80542 9.7559C4.39419 8.08681 4.49699 6.39826 4.93571 4.75227C5.44497 2.84247 6.75157 1.79944 8.69534 1.59764C9.68395 1.49553 10.6582 1.5393 11.5799 1.76298L11.5787 1.76176Z"></path>
                        <path d="M24.9639 13.5626C27.0786 9.69804 26.873 5.76904 25.4444 1.7586C26.8957 1.44131 28.3768 1.40485 29.8221 1.98836C30.9039 2.426 31.6439 3.24656 31.9714 4.36375C32.599 6.50451 32.7389 8.6696 31.8758 10.7885C31.2148 12.4102 30.1221 13.6197 28.4031 14.1011C27.185 14.4415 26.0302 14.2324 24.9639 13.5614V13.5626Z"></path>
                        <path d="M9.82639 15.8247C9.14022 16.3 8.41819 16.7207 7.7882 17.2531C6.41705 18.4129 5.69023 19.981 5.39256 21.7279C5.16185 23.0822 5.07578 24.4632 4.94667 25.8344C4.90842 26.2319 4.94069 26.6368 4.94069 27.1048C4.46252 26.9881 4.04412 26.9054 3.63648 26.7838C2.54745 26.458 1.50862 26.0277 0.618029 25.2825C0.206802 24.9385 -0.0466261 24.5641 0.00716806 23.972C0.133883 22.5996 0.150625 21.2161 0.312007 19.8485C0.58576 17.5193 1.94855 16.0873 4.11227 15.4163C4.95983 15.1537 5.83009 14.9689 6.69199 14.7598C6.78523 14.7367 6.92869 14.7477 6.99085 14.806C7.74755 15.5232 8.67042 15.7652 9.6686 15.8053C9.72718 15.8077 9.78455 15.8186 9.82639 15.8235V15.8247Z"></path>
                        <path d="M32.124 27.0897C32.1132 26.9195 32.1084 26.7882 32.0977 26.6569C31.9781 25.1738 31.9303 23.6798 31.7235 22.2101C31.3266 19.38 29.9459 17.2186 27.3279 15.9835C27.2741 15.958 27.2251 15.9251 27.0996 15.8522C27.5371 15.7951 27.9065 15.7598 28.2711 15.6966C28.8999 15.5872 29.4546 15.31 29.9447 14.893C30.0356 14.8165 30.1814 14.7374 30.2842 14.7569C31.4868 14.9891 32.6775 15.2638 33.8071 15.7695C35.5274 16.539 36.4729 17.9212 36.7001 19.763C36.8901 21.3093 36.9224 22.8775 37.0001 24.4371C37.0085 24.6013 36.883 24.8201 36.7515 24.9331C36.3426 25.2893 35.9302 25.6552 35.4688 25.9287C34.4551 26.5305 33.3338 26.8466 32.1264 27.0909L32.124 27.0897Z"></path>
                      </svg>
                    </span>
                    <p>
                      Meet and network with key decision-makers from multiple
                      industry sectors.
                    </p>
                  </div>
                  <div class="SponsorsScreen_card__EoH0S">
                    <span>
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M33.0479 4.95243C32.8886 5.06475 32.7261 5.1734 32.5701 5.29021C31.2393 6.28718 29.9101 7.28578 28.5801 8.28357C27.4077 9.16332 26.2345 10.0423 25.0617 10.9216C23.8947 11.7973 22.7276 12.6729 21.5605 13.5486C21.311 13.7361 21.064 13.9268 20.8104 14.1094C20.349 14.4418 19.8528 14.6991 19.2909 14.8221C18.7364 14.9438 18.1994 14.885 17.6738 14.691C17.1981 14.5154 16.7759 14.2458 16.3688 13.946C15.7182 13.4673 15.0604 12.9985 14.4054 12.5263C14.1963 12.3756 13.9836 12.229 13.7757 12.0766C13.5887 11.9394 13.407 11.9312 13.2126 12.066C12.8561 12.3139 12.4935 12.5533 12.1362 12.8004C11.7621 13.0589 11.3918 13.3232 11.019 13.5837C10.012 14.2879 9.00455 14.992 7.99634 15.6949C7.45037 16.0751 6.90072 16.4505 6.35476 16.8311C5.38002 17.5108 4.40774 18.1932 3.43341 18.8733C3.13817 19.0791 2.84457 19.2882 2.54076 19.481C2.38763 19.5782 2.21938 19.6587 2.04829 19.7183C1.154 20.0312 0.327898 19.4304 0.1862 18.5923C0.0881958 18.0111 0.320554 17.5328 0.784849 17.1857C1.27936 16.8156 1.79307 16.4717 2.29902 16.1172C3.27824 15.4323 4.25746 14.7473 5.23709 14.0636C5.71037 13.7332 6.18571 13.4065 6.65899 13.0761C7.67251 12.3691 8.6844 11.66 9.69793 10.953C10.2272 10.5838 10.7535 10.2109 11.2893 9.85234C11.5706 9.66405 11.8618 9.4868 12.1627 9.33282C12.5854 9.11676 13.0431 9.01138 13.5189 9.02241C14.0211 9.03385 14.4944 9.16741 14.9428 9.39735C15.4295 9.6469 15.8518 9.99039 16.2924 10.3065C16.976 10.7974 17.6546 11.2949 18.3403 11.7834C18.4305 11.8479 18.5444 11.8896 18.6539 11.9145C18.8176 11.9517 18.9573 11.8769 19.0863 11.7793C19.5306 11.444 19.977 11.1115 20.4212 10.7766C20.9631 10.3682 21.5025 9.95649 22.0452 9.54888C23.2115 8.67239 24.379 7.79713 25.5464 6.92146C26.7731 6.00087 28.0002 5.08069 29.2273 4.1605C29.7267 3.78597 30.227 3.41226 30.7268 3.03814C30.7639 3.01037 30.8003 2.98096 30.837 2.95237L30.8183 2.9058C30.748 2.90458 30.6778 2.9054 30.608 2.90254C30.3168 2.88988 30.0224 2.90049 29.7357 2.8572C29.2824 2.78858 28.9223 2.5468 28.703 2.1396C28.271 1.33867 28.627 0.263281 29.6614 0.0423221C29.7733 0.0182249 29.8893 0.00270542 30.0036 0.00229699C31.4108 -0.000153573 32.818 -0.000971226 34.2255 0.00147934C34.5947 0.00229619 34.9373 0.105219 35.2407 0.316784C35.6192 0.581037 35.8606 0.942083 35.9512 1.39544C35.9814 1.54737 35.9953 1.70462 35.9957 1.85982C35.999 3.24031 35.9994 4.62038 35.9966 6.00086C35.9957 6.43543 35.8467 6.81405 35.5208 7.10893C35.1884 7.41035 34.7899 7.51981 34.3509 7.45732C33.5742 7.34664 33.1181 6.7148 33.0977 5.95635C33.0891 5.63124 33.096 5.30572 33.096 4.9802C33.0797 4.97081 33.0634 4.96142 33.047 4.95203L33.0479 4.95243Z"></path>
                        <path d="M22.2996 31.6356C22.296 31.5751 22.2886 31.509 22.2886 31.4428C22.2886 26.6352 22.2861 21.8276 22.2919 17.02C22.2927 16.4837 22.445 15.9814 22.8182 15.5791C23.1086 15.2658 23.4736 15.0861 23.9102 15.0526C24.3312 15.0203 24.7175 15.1273 25.0928 15.2993C25.6175 15.5399 26.1414 15.7829 26.6665 16.0218C27.5073 16.4045 28.3489 16.7843 29.1901 17.1658C29.5058 17.3088 29.8227 17.4488 30.1355 17.5971C30.7337 17.8801 31.147 18.3217 31.2846 18.9849C31.3201 19.1565 31.3434 19.3341 31.3438 19.5089C31.3471 23.4801 31.3462 27.4512 31.3454 31.4224C31.3454 31.4951 31.3389 31.5678 31.3356 31.6352C31.1449 31.6817 22.4879 31.6813 22.3 31.6352L22.2996 31.6356Z"></path>
                        <path d="M18.0247 35.9955C12.5789 35.9955 7.13277 35.9955 1.687 35.9943C1.51141 35.9943 1.33336 35.9886 1.16063 35.9604C0.528501 35.8571 0.147105 35.4593 0.0315417 34.8544C-0.132207 33.9951 0.356585 33.3195 1.15042 33.139C1.30069 33.1047 1.45955 33.0949 1.61472 33.0949C12.4589 33.0933 23.3031 33.0937 34.1472 33.0933C34.4466 33.0933 34.7422 33.1063 35.0321 33.1986C35.6463 33.3939 35.9946 33.9628 35.9999 34.5411C36.0048 35.0876 35.7655 35.4948 35.3204 35.7864C35.1142 35.9216 34.8802 35.9964 34.6279 35.9951C34.5258 35.9947 34.4241 35.996 34.322 35.996C28.8897 35.996 23.4574 35.996 18.0251 35.996L18.0247 35.9955Z"></path>
                        <path d="M19.0971 23.3582C19.0546 23.3696 19.0293 23.3811 19.0036 23.3823C18.692 23.3974 18.3804 23.4195 18.0689 23.4235C17.2616 23.4342 16.5269 23.6584 15.9022 24.1787C15.3574 24.6325 15.0026 25.2125 14.8719 25.9125C14.8188 26.1976 14.7914 26.4912 14.7898 26.7812C14.7812 28.3181 14.7845 29.8551 14.7837 31.392C14.7837 31.472 14.7837 31.5521 14.7837 31.6248C14.6146 31.675 10.6679 31.6848 10.4286 31.6382C10.4245 31.5582 10.416 31.4728 10.416 31.3871C10.4152 29.6394 10.4156 27.8917 10.4156 26.1441C10.4156 24.1109 10.4135 22.0774 10.4176 20.0442C10.4184 19.6975 10.4711 19.3576 10.605 19.0305C10.7753 18.6155 11.071 18.3341 11.4781 18.1671C11.7692 18.0478 12.0743 17.9919 12.392 17.9927C13.9964 17.9955 15.6012 17.9935 17.2056 17.9939C17.6989 17.9939 18.1461 18.1336 18.5177 18.464C18.7725 18.6907 18.9346 18.986 19.015 19.3135C19.0693 19.5353 19.1012 19.7685 19.1032 19.9968C19.1126 21.0371 19.1077 22.0778 19.1073 23.118C19.1073 23.1977 19.1008 23.2769 19.0975 23.3582H19.0971Z"></path>
                        <path d="M8.97894 21.2191V31.6548C8.69432 31.6814 8.41134 31.6634 8.12958 31.6667C7.84414 31.67 7.5587 31.6675 7.27326 31.6675H5.54022C5.25683 31.6675 4.97344 31.6675 4.67535 31.6675C4.66963 31.5736 4.66227 31.5078 4.66227 31.4421C4.66227 28.6823 4.66146 25.9222 4.6635 23.1624C4.6635 22.7462 4.76313 22.3509 4.99222 22.0025C5.22457 21.6492 5.56147 21.418 5.97023 21.3147C6.19155 21.2587 6.42431 21.2273 6.65258 21.2232C7.35249 21.2118 8.05239 21.2191 8.75272 21.2191C8.81969 21.2191 8.88626 21.2191 8.97936 21.2191H8.97894Z"></path>
                        <path d="M20.8396 31.6553H16.2257C16.2187 31.5679 16.2065 31.4834 16.2065 31.3984C16.2048 30.2226 16.2044 29.0471 16.2044 27.8712C16.2044 27.4363 16.1918 27.0009 16.2102 26.5667C16.2302 26.0909 16.3935 25.6625 16.7398 25.3231C17.0322 25.0367 17.3968 24.8922 17.7986 24.8525C18.0747 24.8256 18.3532 24.815 18.6305 24.8129C19.2895 24.8076 19.9486 24.8113 20.6077 24.8113H20.82C20.8715 24.9734 20.8866 31.3617 20.8392 31.6553H20.8396Z"></path>
                      </svg>
                    </span>
                    <p>
                      Strengthen your company's position and recognition in the
                      marketplace.
                    </p>
                  </div>
                </div>
                <a href="/sponsor-packages">
                  view packages
                </a>
              </div>
              <div className="Form_container__jwPCR">
                <div>
                  <div>
                    <h2>stand out from the crowd</h2>
                    <p>
                      Elevate your brand as an industry leader. Take advantage
                      of opportunities to deliver your message directly to our
                      audience, boosting your visibility and standing in the
                      market.
                    </p>
                    <form
                      id="LDZ-(Stand out From the Crowd 2026)"
                      method="POST"
                      data-hs-cf-bound="true"
                      onSubmit={submitBtnClk}
                    >
                      <div className="LDZ_2026_sponsor_form Form_form__nhNBc form_LDZ">
                        <div>
                          <div>
                            <input
                              name="fullname"
                              type="text"
                              placeholder="Full name *"
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                if (fullNameErrorMessage) checkOnChange();
                                setFullNameErr(false);
                              }}
                            ></input>
                            {fullNameErrorMessage}
                          </div>
                          <div>
                            <input
                              name="companyname"
                              type="text"
                              placeholder="Company name *"
                              value={companyName}
                              onChange={(e) => {
                                setCompanyName(e.target.value);
                                if (companyErrorMessage) checkOnChange();
                                setCompanyNameErr(false);
                              }}
                            ></input>
                            {companyErrorMessage}
                          </div>
                        </div>
                        <div>
                          <div>
                            <input
                              name="mobilenumber"
                              type="tel"
                              placeholder="Mobile number *"
                              value={mobile}
                              onChange={(e) => {
                                let value = e.target.value;
                                // allow + only at the start
                                if (value.startsWith("+")) {
                                  value =
                                    "+" + value.slice(1).replace(/[^0-9]/g, "");
                                } else {
                                  value = value.replace(/[^0-9]/g, "");
                                }
                                setMobile(value);
                                setMobileErr(false);
                                if (mobileErrorMessage) checkOnChange();
                              }}
                            ></input>
                            {mobileErrorMessage}
                          </div>
                          <div>
                            <input
                              name="email"
                              type="email"
                              placeholder="Email address *"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailErr(false);
                                setEmailErrMsg("");
                                if (emailErrorMessage) checkOnChange();
                              }}
                            ></input>
                            {emailErrorMessage}
                          </div>
                        </div>
                        <div className="Form_textArea__tsfub">
                          <textarea
                            name="message"
                            cols={30}
                            rows={6}
                            placeholder="Comments"
                            value={message}
                            onChange={(e) => {
                              setMessage(e.target.value);
                            }}
                          ></textarea>
                        </div>
                        <button type="submit">submit</button>
                      </div>
                    </form>
                    {successMessage}
                  </div>
                </div>
              </div>
              <TestimonialCarousel />
              <LogoCarousel />
              <div className="SponsorsScreen_contactContainer__c6iss">
                <h2>GET IN TOUCH TO BOOK YOUR BOOTH</h2>
                {/* <h2>be visible in the room with the decision makers</h2> */}
                <div>
                  {mediaPageHelpersList.map((item, index) => (
                    <div className="SponsorsScreen_contactCard__q2HNX">
                      <h5>{item?.companyPersonName}</h5>
                      <p>
                        <img src={emailIcon} alt="emil icon"></img>
                        <a
                          href={`mailto:${item?.companyPersonEmail}?subject=Lithium Downstream Summit 2026`}
                        >
                          {" "}
                          {item?.companyPersonEmail}
                        </a>
                      </p>
                      <p>
                        <img src={phoneIcon} alt="Phone Icon"></img>
                        <a href={`tel:${item?.companyPersonPhone}`}>
                          {item?.companyPersonPhone}
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <SubscribeForm />
            </article>
          </div>
        </div>
        <Footer />
      </>
    </div>
  );
};
export default Sponsors;
