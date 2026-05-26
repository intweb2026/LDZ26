import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/assets/css/ExhibitorPackages.css";
import Navbar from "./Navbar";
import LogoCarousel from "./LogoCarousel";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../src/assets/css/logoslider.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestimonialCarousel from "./TestimonialCarousel";
import { Helmet } from "react-helmet-async";
import { useApiData } from "../common/ApiContext";
import { usePageSeo } from "../common/usePageSeo";
const leftArrowIcon = "/images/WebCommonImages/icon-arrow-left.png";
const rightArrowIcon = "/images/WebCommonImages/icon-arrow-right.png";
const emailIcon = "/images/WebCommonImages/msg.png";
const phoneIcon = "/images/WebCommonImages/phone-call.png";
const tickImg = "/images/WebCommonImages/tick.png";
const arrowUp = "/images/WebCommonImages/accordion-arrow-up-white.png";
const arrowDown = "/images/WebCommonImages/accordion-arrow-down-white.png";

const ExhibitorPackages = () => {
  const navigate = useNavigate();
  const [silverActiveTab, setSilverActiveTab] = useState(false);
  const [goldActiveTab, setGoldActiveTab] = useState(false);
  const [platinumActiveTab, setPlatinumActiveTab] = useState(false);

  const [sponsorPackageList, setSponsorPackageList] = useState([]);
  const [sponsorCardsList, setSponsorCardsList] = useState([]);
  const [sponsorPageData, setSponsorPageData] = useState([]);
  const [mediaPageHelpersList, setMediaPageHelpersList] = useState([]);
  const [paraDes, setParaDes] = useState("");
  const [logoList, setLogoList] = useState([]);

  useEffect(() => {
    callLogoListApi();
    callSponsorCardsListApi();
    // eslint-disable-next-line
  }, []);

  const callLogoListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/homepagecompanieslogo`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setLogoList(data["homePageCompaniesList"]);
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

  const callSponsorCardsListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.linq-staging-site.com/admin1/sponsorcards`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setSponsorCardsList(data["sponsorCardsList"]);
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

  const silverToggleBox = () => {
    setSilverActiveTab((prev) => !prev);
  };

  const goldToggleBox = () => {
    setGoldActiveTab((prev) => !prev);
  };

  const platinumToggleBox = () => {
    setPlatinumActiveTab((prev) => !prev);
  };

  useEffect(() => {
    callSponsorPackageListApi();
    callSponsorPageDataApi();
    callMediaHelperListApi();
    // eslint-disable-next-line
  }, []);

  const exhibitorPackageSectionRef = useRef(null);

  const scrollToExhibitPackage = (e) => {
    e.preventDefault();
    if (exhibitorPackageSectionRef.current) {
      const navbarHeight = 0;
      const elementPosition = exhibitorPackageSectionRef.current.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const cleanHtml = (html) => {
    if (!html) return "";

    // Remove outer quotes and unescape HTML
    let cleaned = html.replace(/^"(.*)"$/, "$1");

    // Unescape quotes
    cleaned = cleaned.replace(/\\"/g, '"');

    // Ensure all external links have proper attributes
    cleaned = cleaned.replace(
      /<a\s+href=["']([^"']+)["'][^>]*>/gi,
      (match, url) => {
        // Check if URL is external (starts with http/https)
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">`;
        }
        return match;
      },
    );

    return cleaned;
  };

  const callMediaHelperListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/mediapagehelpers`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setMediaPageHelpersList(data["mediaPageHelpers"]);
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

  const callSponsorPackageListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/sponsorpackages`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setSponsorPackageList(data["sponsorPackageTypes"]);
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

  const callSponsorPageDataApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/getsponsorpagedata`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setSponsorPageData(data["sponsorPageStaticData"]);
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

  useEffect(() => {
    if (sponsorPageData?.length > 0) {
      setParaDes(
        sponsorPageData[0]?.introParaDescription?.replace(/^"(.*)"$/, "$1"),
      );
    }
    // eslint-disable-next-line
  }, [sponsorPageData]);

  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1180,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 799,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 599,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 420,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 991) {
        setSilverActiveTab(true);
        setGoldActiveTab(false);
        setPlatinumActiveTab(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPrice = (cardPrice) => {
    const position = eventGeneralSettings?.currencyPosition;
    const symbol = eventGeneralSettings?.currencySymbol;
    const price = cardPrice;

    if (position === "Top-Left") {
      return (
        <>
          <sup>{symbol}</sup>
          {price}
        </>
      );
    }

    if (position === "Top-Right") {
      return (
        <>
          {price}
          <sup>{symbol}</sup>
        </>
      );
    }

    if (position === "Bottom-Left") {
      return (
        <>
          <sup style={{ verticalAlign: "sub", marginTop: "18px" }}>
            {symbol}
          </sup>
          {price}
        </>
      );
    }

    if (position === "Bottom-Right") {
      return (
        <>
          {price}
          <sup style={{ verticalAlign: "sub", marginTop: "18px" }}>
            {symbol}
          </sup>
        </>
      );
    }

    // fallback
    return (
      <>
        <sup>{symbol}</sup>
        {price}
      </>
    );
  };

  const pageSeo = usePageSeo("sponsor-packages");
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
        <link
          rel="canonical"
          href="https://www.linq-staging-site.com/sponsor-packages"
        />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <article className="SponsorLanding_container__bsWcn">
            <div className="DetailsContainer_wholeContainer__385Iv">
              <div className="DetailsContainer_container__JrWjX">
                <div
                  className="DetailsContainer_imageContainer__ncJwH"
                  style={{
                    backgroundImage: `url(https://www.desalination-resource-recovery.com/images/sponsor-landing.png)`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="DetailsContainer_textContainer__D8Ukb">
                  <h1>Exhibit your services at {eventDetails?.eventName}</h1>
                  <div className="DetailsContainer_innerContent__6NQGR">
                    <div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: cleanHtml(paraDes),
                        }}
                      ></p>
                    </div>
                  </div>
                  <a className="DetailsContainer_cstom_btn__+cVfU" href="/sponsor-packages" target="_self" onClick={scrollToExhibitPackage}>
                    SPONSOR NOW
                  </a>
                </div>
              </div>
            </div>
            <div
              className="SponsorLanding_packagesCotainer__QBljc"
              ref={exhibitorPackageSectionRef}
              style={{
                transition: "margin-top 0.3s ease",
              }}
            >
              <div>
                <h2>exhibitor packages</h2>
                <p>
                  A cost-effective path to helping you get your message out to
                  existing or new target clients.
                </p>
                <div className="SponsorLanding_packageTableContainer__C2Yxs">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>{sponsorPackageList[0]?.sponsorPackageType}</th>
                        <th>{sponsorPackageList[1]?.sponsorPackageType}</th>
                        <th>{sponsorPackageList[2]?.sponsorPackageType}</th>
                      </tr>
                      <tr>
                        <th>Benefits</th>
                        <th>
                          <h2>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[0]?.sponsorPackagePrice} */}
                            {renderPrice(
                              sponsorPackageList[0]?.sponsorPackagePrice,
                            )}
                          </h2>
                          <h3>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[0]?.sponsorPackageCuttingPrice} */}
                            {renderPrice(
                              sponsorPackageList[0]?.sponsorPackageCuttingPrice,
                            )}
                          </h3>
                        </th>
                        <th>
                          <h2>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[1]?.sponsorPackagePrice} */}
                            {renderPrice(
                              sponsorPackageList[1]?.sponsorPackagePrice,
                            )}
                          </h2>
                          <h3>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[1]?.sponsorPackageCuttingPrice} */}
                            {renderPrice(
                              sponsorPackageList[1]?.sponsorPackageCuttingPrice,
                            )}
                          </h3>
                        </th>
                        <th>
                          <h2>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[2]?.sponsorPackagePrice} */}
                            {renderPrice(
                              sponsorPackageList[2]?.sponsorPackagePrice,
                            )}
                          </h2>
                          <h3>
                            {/* <sup>USD</sup>
                            {sponsorPackageList[2]?.sponsorPackageCuttingPrice} */}
                            {renderPrice(
                              sponsorPackageList[2]?.sponsorPackageCuttingPrice,
                            )}
                          </h3>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span>Premium Delegate Passes</span>
                        </td>
                        <td>
                          <div>{sponsorPackageList[0]?.delegatePassQty}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[1]?.delegatePassQty}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[2]?.delegatePassQty}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Full access to all conference activities
                            <i>
                              Including drinks reception, post-event
                              presentations viewer
                            </i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Your Logo on Conference Website
                            <i>which attracts thousands of unique visitors</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Exhibit Space
                            <i>Includes draped table (approx. 6ft), 2 chairs</i>
                          </span>
                        </td>
                        <td>
                          <div>{sponsorPackageList[0]?.exhibitSpace}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[1]?.exhibitSpace}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[2]?.exhibitSpace}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Invite Colleagues or Guests at a Discount</span>
                        </td>
                        <td>
                          <div>{sponsorPackageList[0]?.inviteDiscount}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[1]?.inviteDiscount}</div>
                        </td>
                        <td>
                          <div>{sponsorPackageList[2]?.inviteDiscount}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Sponsorship level branding on event days
                            <br></br>
                            <i>Logo on signage and holding slides</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>Your Logo on Delegate Packs</span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Literature Distribution in Delegate Packs
                            <br></br>
                            <i>(materials supplied by you)</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Speaking Slot: 30-minute presentation
                            <i>(subject to editorial approval)</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Conference Chair: Opportunity to Chair the
                            Conference
                            <i>(full scripts will be provided to assist)</i>
                          </span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            Press Release Email Blast Announcement as Sponsor
                          </span>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span>-</span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <img src={tickImg} alt=""></img>
                          </div>
                        </td>
                      </tr>
                      <tr></tr>
                      <tr>
                        <td></td>
                        <td>
                          <a
                            href="/sponsor-booking"
                            onClick={(e) => { e.preventDefault(); navigate("/sponsor-booking", { state: { selectedPackage: sponsorPackageList[0] } }); }}
                          >
                            Book your booth
                          </a>
                        </td>
                        <td>
                          <a
                            href="/sponsor-booking"
                            onClick={(e) => { e.preventDefault(); navigate("/sponsor-booking", { state: { selectedPackage: sponsorPackageList[1] } }); }}
                          >
                            Book your booth
                          </a>
                        </td>
                        <td>
                          <a
                            href="/sponsor-booking"
                            onClick={(e) => { e.preventDefault(); navigate("/sponsor-booking", { state: { selectedPackage: sponsorPackageList[2] } }); }}
                          >
                            Book your booth
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="SponsorLanding_packageCardContainer__m+YQm">
                  <div
                    className="SponsorLanding_card__HxPS8"
                    onClick={silverToggleBox}
                  >
                    <h4
                      style={{
                        borderBottomLeftRadius: silverActiveTab ? "0px" : "",
                        borderBottomRightRadius: silverActiveTab ? "0px" : "",
                      }}
                    >
                      {sponsorPackageList[0]?.sponsorPackageType}
                      <img src={silverActiveTab ? arrowUp : arrowDown}></img>
                    </h4>
                    {silverActiveTab && (
                      <div className="SponsorLanding_body__rHcET">
                        <div className="SponsorLanding_pricing__l1LD7">
                          <h2>
                            <sup>{eventGeneralSettings?.currencySymbol}</sup>
                            {sponsorPackageList[0]?.sponsorPackagePrice}
                          </h2>
                          <h3>
                            <sup>{eventGeneralSettings?.currencySymbol}</sup>
                            {sponsorPackageList[0]?.sponsorPackageCuttingPrice}
                          </h3>
                        </div>
                        <h2>Benefits</h2>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Premium Delegate Passes</p>
                          <span>{sponsorPackageList[0]?.delegatePassQty}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Full access to all conference activities
                            <span>
                              Including drinks reception, post-event
                              presentations viewer
                            </span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Your Logo on Conference Website
                            <span>
                              which attracts thousands of unique visitors
                            </span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Exhibit Space
                            <span>
                              Includes draped table (approx. 6ft), 2 chairs
                            </span>
                          </p>
                          <span>{sponsorPackageList[0]?.exhibitSpace}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Invite Colleagues or Guests at a Discount</p>
                          <span>{sponsorPackageList[0]?.inviteDiscount}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Sponsorship level branding on event days
                            <span>Logo on signage and holding slides</span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Your Logo on Delegate Packs</p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Literature Distribution in Delegate Packs
                            <span>(materials supplied by you)</span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Speaking Slot: 30-minute presentation
                            <span>(subject to editorial approval)</span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Conference Chair: Opportunity to Chair the
                            Conference
                            <span>
                              (full scripts will be provided to assist)
                            </span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Press Release Email Blast Announcement as Sponsor
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_btn__QNo2m">
                          <a
                            href="/sponsor-booking"
                            onClick={(e) => { e.preventDefault(); navigate("/sponsor-booking", { state: { selectedPackage: sponsorPackageList[0] } }); }}
                          >
                            book your booth
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="SponsorLanding_card__HxPS8"
                    onClick={goldToggleBox}
                  >
                    <h4
                      style={{
                        backgroundColor: "#f5ae32",
                        borderBottomLeftRadius: silverActiveTab ? "0px" : "",
                        borderBottomRightRadius: silverActiveTab ? "0px" : "",
                      }}
                    >
                      {sponsorPackageList[1]?.sponsorPackageType}
                      <img src={goldActiveTab ? arrowUp : arrowDown}></img>
                    </h4>
                    {goldActiveTab && (
                      <div className="SponsorLanding_body__rHcET">
                        <div className="SponsorLanding_pricing__l1LD7">
                          <h2>
                            <sup>{eventGeneralSettings?.currencySymbol}</sup>
                            {sponsorPackageList[1]?.sponsorPackagePrice}
                          </h2>
                          <h3>
                            <sup>{eventGeneralSettings?.currencySymbol}</sup>
                            {sponsorPackageList[1]?.sponsorPackageCuttingPrice}
                          </h3>
                        </div>
                        <h2>Benefits</h2>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Premium Delegate Passes</p>
                          <span>{sponsorPackageList[1]?.delegatePassQty}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Full access to all conference activities
                            <span>
                              Including drinks reception, post-event
                              presentations viewer
                            </span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Your Logo on Conference Website
                            <span>
                              which attracts thousands of unique visitors
                            </span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Exhibit Space
                            <span>
                              Includes draped table (approx. 6ft), 2 chairs
                            </span>
                          </p>
                          <span>{sponsorPackageList[1]?.exhibitSpace}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Invite Colleagues or Guests at a Discount</p>
                          <span>{sponsorPackageList[1]?.inviteDiscount}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Sponsorship level branding on event days
                            <span>Logo on signage and holding slides</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Your Logo on Delegate Packs</p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Literature Distribution in Delegate Packs
                            <span>(materials supplied by you)</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Speaking Slot: 30-minute presentation
                            <span>(subject to editorial approval)</span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Conference Chair: Opportunity to Chair the
                            Conference
                            <span>
                              (full scripts will be provided to assist)
                            </span>
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Press Release Email Blast Announcement as Sponsor
                          </p>
                          <span>–</span>
                        </div>
                        <div className="SponsorLanding_btn__QNo2m">
                          <a
                            href="/sponsor-booking"
                            onClick={(e) => { e.preventDefault(); navigate("/sponsor-booking", { state: { selectedPackage: sponsorPackageList[1] } }); }}
                          >
                            book your booth
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="SponsorLanding_card__HxPS8"
                    onClick={platinumToggleBox}
                  >
                    <h4
                      style={{
                        backgroundColor: "#4e4e4e",
                        borderBottomLeftRadius: silverActiveTab ? "0px" : "",
                        borderBottomRightRadius: silverActiveTab ? "0px" : "",
                      }}
                    >
                      {sponsorPackageList[2]?.sponsorPackageType}
                      <img src={platinumActiveTab ? arrowUp : arrowDown}></img>
                    </h4>
                    {platinumActiveTab && (
                      <div className="SponsorLanding_body__rHcET">
                        <div className="SponsorLanding_pricing__l1LD7">
                          <h2>
                            <sup>{eventGeneralSettings?.currencySymbol}</sup>
                            {sponsorPackageList[2]?.sponsorPackagePrice}
                          </h2>
                          <h3>
                            <sup>{eventGeneralSettings?.currencySymbol}</sup>
                            {sponsorPackageList[2]?.sponsorPackageCuttingPrice}
                          </h3>
                        </div>
                        <h2>Benefits</h2>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Premium Delegate Passes</p>
                          <span>{sponsorPackageList[2]?.delegatePassQty}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Full access to all conference activities
                            <span>
                              Including drinks reception, post-event
                              presentations viewer
                            </span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Your Logo on Conference Website
                            <span>
                              which attracts thousands of unique visitors
                            </span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Exhibit Space
                            <span>
                              Includes draped table (approx. 6ft), 2 chairs
                            </span>
                          </p>
                          <span>{sponsorPackageList[2]?.exhibitSpace}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Invite Colleagues or Guests at a Discount</p>
                          <span>{sponsorPackageList[2]?.inviteDiscount}</span>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Sponsorship level branding on event days
                            <span>Logo on signage and holding slides</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>Your Logo on Delegate Packs</p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Literature Distribution in Delegate Packs
                            <span>(materials supplied by you)</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Speaking Slot: 30-minute presentation
                            <span>(subject to editorial approval)</span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Conference Chair: Opportunity to Chair the
                            Conference
                            <span>
                              (full scripts will be provided to assist)
                            </span>
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_detail__xSebI">
                          <p>
                            Press Release Email Blast Announcement as Sponsor
                          </p>
                          <img src={tickImg} alt=""></img>
                        </div>
                        <div className="SponsorLanding_btn__QNo2m">
                          <a
                            href="/sponsor-booking"
                            onClick={(e) => { e.preventDefault(); navigate("/sponsor-booking", { state: { selectedPackage: sponsorPackageList[2] } }); }}
                          >
                            book your booth
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="LogoSlider_container__KG1H5">
              <h2>INDUSTRY-LEADING PARTICIPANTS AT OUR SHOWS</h2>
              <div className="LogoSlider_innerContainer__Z+wZ7 logo-slider">
                {/* Left Button */}
                <button
                  aria-label="Move slider to left"
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  <img
                    src={leftArrowIcon}
                    alt="left arrow icon"
                    loading="lazy"
                    width="20"
                    height="20"
                  />
                </button>

                {/* Slider */}
                <div>
                  <Slider ref={sliderRef} {...settings}>
                    {logoList.map((logo, index) => (
                      <img
                        key={index}
                        src={logo?.logoLink}
                        alt="Sponsor's Logo"
                        loading="lazy"
                        width="200"
                        height="90"
                        style={{
                          width: "100%",
                          display: "inline-block",
                        }}
                      />
                    ))}
                  </Slider>
                </div>

                {/* Right Button */}
                <button
                  aria-label="Move slider to left"
                  onClick={() => sliderRef.current.slickNext()}
                >
                  <img
                    src={rightArrowIcon}
                    alt="right arrow icon"
                    loading="lazy"
                    width="20"
                    height="20"
                  />
                </button>
              </div>
            </div>

            <div className="SponsorLanding_sponsorshipOptions__DX3F6">
              <h2>BRanding Add-ons</h2>
              <p>
                Boost your visibility with a range of branding add-ons such as
                lanyards, name badges, banner placements, delegate pack inserts,
                and logo placement on event materials. Available to all
                exhibitors, attendees, and partners.
              </p>
              <div>
                {sponsorCardsList.map((pkg, index) => {
                  const subject = encodeURIComponent(
                    `I'm interested in Sponsorship – ${pkg.title} – LDZ`,
                  );

                  return (
                    <div
                      className="SponsorshipCard_container__ORwTn"
                      key={index}
                    >
                      <div className="SponsorshipCard_col__PW1v-">
                        <h3 className="SponsorshipCard_title__wzsXt">
                          {pkg.title}
                        </h3>
                      </div>

                      <div className="SponsorshipCard_col__PW1v-">
                        <p className="SponsorshipCard_price__T0xxu">
                          {eventGeneralSettings?.currencySymbol || ""}{" "}
                          {pkg.price}
                        </p>
                      </div>

                      <div className="SponsorshipCard_col__PW1v-">
                        <p className="SponsorshipCard_description__0NABR">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="SponsorshipCard_button-wrapper__68ouN">
                        <a
                          href={`mailto:vince.rojas@iq-hub.com?subject=${subject}`}
                          className="SponsorshipCard_button__3kvwB"
                        >
                          I'M INTERESTED
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <TestimonialCarousel />
            </div>

            <section className="SponsorLanding_contactContainer__hipqh">
              <h2>Get in touch to Book Your Trade Show Booth</h2>
              <div>
                {mediaPageHelpersList.map((item, index) => (
                  <div className="SponsorLanding_contactCard__E6LJD">
                    <h5>{item?.companyPersonName}</h5>
                    <p>
                      <img src={emailIcon} alt="emil icon"></img>
                      <a
                        href={`mailto:${item?.companyPersonEmail}?subject=Lithium &amp; Downstream Summit 2026`}
                        className="MediaScreen_email__vpDbe"
                      >
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
            </section>
          </article>
        </div>
      </div>
      <SubscribeForm />
      <Footer />
    </>
  );
};
export default ExhibitorPackages;
