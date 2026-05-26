import React from "react";
import { useState, useEffect, useCallback } from "react";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import FeaturedSpeaker from "./FeaturedSpeaker";
import { useNavigate } from "react-router-dom";
import "../assets/css/WhoShouldAttend.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import Popup from "reactjs-popup";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
import "../assets/css/popUp.css";
const benefitsBg = "/images/WebImages/benefits-who-should-attend.webp";
const ketTakewaysBg = "/images/WebImages/keytakeaways-who-should-attend.webp";
const arrowUpIcon = "/images/WebCommonImages/accordion-arrow-up.png";
const arrowDownIcon = "/images/WebCommonImages/arrow-down-black.png";
// const arrowUpIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/accordion-arrow-up.png";
// const arrowDownIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/arrow-down-black.png";

const WhoShouldAttend = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("core");
  const [whoShouldAttendData, setWhoShouldAttendData] = useState([]);
  const [testimonialList, setTestimonialList] = useState([]);
  const [benifits, setBenifits] = useState("");
  const [keyTakeaways, setKeyTakeaways] = useState("");
  const [whoAttend, setWhoAttend] = useState("");
  const [coreAttendeeDes, setCoreAttendeeDes] = useState("");
  const [industriesDes, setIndustriesDes] = useState("");
  const [coreAttandeeList, setCoreAttandeeList] = useState([]);
  const [industriesList, setIndustriesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [calendarEmail, setCalendarEmail] = useState("");
  const [addToCalendarSuccessMessage, setAddToCalendarSuccessMessage] = useState("");

  useEffect(() => {
    callWhoShouldAttendDataApi();
    callTestimonialListApi();
    callCoreAttandeeListApi();
    callIndustriesListApi();

    // eslint-disable-next-line
  }, []);

  const callWhoShouldAttendDataApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/whoshouldattendpagedata`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setWhoShouldAttendData(data["whoShouldAttendPageData"]);
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

  const callTestimonialListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/eventtestimonials`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setTestimonialList(data["eventTestimonials"]);
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
  const callCoreAttandeeListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/eventcoreattandees`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setCoreAttandeeList(data["coreAttandees"]);
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
  const callIndustriesListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/eventparticipatedindustries`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setIndustriesList(data["participatedIndustries"]);
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
    if (whoShouldAttendData?.length > 0) {
      setBenifits(
        whoShouldAttendData[0]?.sectionFirstPoints?.replace(/^"(.*)"$/, "$1"),
      );
      setKeyTakeaways(
        whoShouldAttendData[0]?.sectionSecondPoints?.replace(/^"(.*)"$/, "$1"),
      );
      setWhoAttend(
        whoShouldAttendData[0]?.sectionThreeDescription?.replace(
          /^"(.*)"$/,
          "$1",
        ),
      );
      setCoreAttendeeDes(
        whoShouldAttendData[0]?.sectionThreeTabOneDescription?.replace(
          /^"(.*)"$/,
          "$1",
        ),
      );
      setIndustriesDes(
        whoShouldAttendData[0]?.sectionThreeTabTwoDescription?.replace(
          /^"(.*)"$/,
          "$1",
        ),
      );
    }
    // eslint-disable-next-line
  }, [whoShouldAttendData]);

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

  const coreAttendees = [
    "Water Utility Professionals",
    "O&M Professionals",
    "O&M Professionals",
    "Water Treatment Experts",
    "Desalination Engineers",
    "Circular Economy Strategists",
    "Process Development Managers",
    "Water Quality Managers",
    "Risk Management Experts",
    "Water Resource Managers",
    "Digitalisation Service Providers",
    "R&D Managers",
    "Clean Energy Experts",
    "Energy Recovery Experts",
    "Strategic Water Policy Advisors",
    "Project Managers",
    "Hydrologists",
    "Legal and Compliance Specialists",
    "Water Data Analysts",
    "Watershed Managers",
    "News Reporters and Journalists",
    "Brine Management Experts",
    "Water Infrastructure Experts",
    "Health and Safety Managers",
  ];

  const industriesCompanies = [
    "Water Utilities",
    "Industrial Water Solutions",
    "Associations and Alliances",
    "Desalination Facilities",
    "Regional Water Authorities",
    "Government Agencies",
    "Water Treatment Solutions Providers",
    "Chemical Suppliers",
    "Investors and Venture Capital Firms",
    "Engineering and Design Firms",
    "Public-Private Partnership Firms",
    "Media and Communications Firms",
    "Mineral Recovery Firms",
    "Marine and Coastal Protection Firms",
    "Academic and Research Institutions",
    "Thermal Desalination Providers",
    "Membrane Manufacturers",
    "Sustainability and ESG Consultants",
    "Equipment and Pump Manufacturers",
    "Smart Water Technology Providers",
    "Regulatory and Compliance Services",
    "Renewable Energy Firms",
    "EPC Contractors",
    "Other Professional Services",
  ];

  const currentData = activeTab === "core" ? coreAttandeeList : industriesList;

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

  const isLessThen769 = windowWidth <= 769;
  const isLessThen639 = windowWidth <= 639;

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };
  const pageSeo = usePageSeo("who-should-attend");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDescription = pageSeo.pageMetaDescription;
  const seoImage = pageSeo.pageOgImage || null;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {/* <meta property="og:image" content={bgImage} /> */}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <link
          rel="canonical"
          href="https://www.linq-staging-site.com/who-should-attend"
        />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <article className="BenefitScreen_container__MwDLs">
            {/* <div
          style={{
            paddingTop: "200px",
            paddingBottom: "100px",
            backgroundColor: "rgb(241, 241, 241)",
          }}
        >
          <h1 style={styles.title} className="featured-speakers-title">
            MEET OUR FEATURED SPEAKERS
          </h1>
        </div> */}
            {/* <FeaturedSpeaker title={"MEET OUR FEATURED SPEAKERS"} /> */}
            <FeaturedSpeaker title={"HIGHLIGHTS FROM OUR LAST SHOW"} />
            <div className="BenefitScreen_addToCakendar__LRN4C">
              <div>
                <div
                  className="BenefitScreen_imageContainer__dQ2Lk"
                  style={{
                    backgroundImage: `url(${benefitsBg})`,
                  }}
                ></div>
                <div className="BenefitScreen_textContainer__-wzXh">
                  <h2>benefits</h2>
                  <div className="BenefitScreen_innerContent__igZkD">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(benifits),
                      }}
                    >
                      {/* <p>
                    <strong>The Desalination & Resource Recovery 2025 event provides leading market intelligence and features industry experts discussing the latest advancements in desalination, resource recovery, and sustainable water management.</strong>
                    <br />
                    <br />
                    <strong>Benefits of attending include:</strong>
                  </p>
                  <ul>
                    <li>Across two days of in-depth presentations, industry experts will share the latest market insights, results, and experiences within the desalination sector.</li>
                    <li>This event provides an exclusive networking opportunity for professionals to connect with peers facing similar challenges and sharing insights from past and current projects.</li>
                    <li>Attendees will receive updates on regional projects and research from leading desalination experts, who will share their experiences, findings, and new proposals.</li>
                    <li>Technical presentations by water treatment manufacturers will showcase advancements in resource recovery, efficiency improvements, and cost-reduction strategies.</li>
                    <li>New case studies will present specific examples from water utilities and desalination facilities, providing practical insights.</li>
                    <li>This exclusive opportunity allows participants to connect with a wide range of industry stakeholders and explore innovative techniques to address emerging challenges.</li>
                  </ul> */}
                    </span>
                  </div>
                  <button onClick={() => navigate("/agenda-page")}>
                    view program
                  </button>
                </div>
              </div>
            </div>
            <div className="BenefitScreen_addToCakendar__LRN4C">
              <div className="BenefitScreen_reverse__B1LVk">
                <div className="BenefitScreen_textContainer__-wzXh">
                  <h2>key takeaways</h2>
                  <div className="BenefitScreen_innerContent__igZkD">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(keyTakeaways),
                      }}
                    >
                      {/* <ul>
                    <li>
                      Gain insights into current water management market
                      dynamics and their impact on your business
                    </li>
                    <li>
                      Discover how to develop effective strategies for
                      successful desalination projects
                    </li>
                    <li>
                      Receive insights into the latest trends, including a
                      review of the current year and projections for the future
                    </li>
                    <li>
                      Explore new project innovations and technological
                      advancements shaping the future of the industry
                    </li>
                    <li>
                      Access diverse insights and perspectives from various
                      markets and allied industries, integrating regional
                      experiences for a comprehensive understanding
                    </li>
                  </ul> */}
                    </span>
                  </div>
                  {/* <button>add to calendar</button> */}
                  <Popup
                    open={open}
                    onClose={() => setOpen(false)}
                    trigger={
                      <button onClick={() => setOpen(true)}>
                        {" "}
                        add to calendar
                      </button>
                    }
                    position={
                      windowWidth < 941 ? "bottom center" : "right center"
                    }
                    portal={true}
                    arrow={true}
                    offsetY={windowWidth > 1024 ? -115 : 0}
                  >
                    <div>
                      <form
                        className="row g-3 needs-validation"
                        onSubmit={async (e) => {
                          e.preventDefault();

                          try {
                            setAddToCalendarSuccessMessage(<p style={{ color: 'green' }}>Thank You for Subscribing</p>)
                            setTimeout(() => {
                              setAddToCalendarSuccessMessage("");
                            }, 5000);
                            await fetch(
                              "https://www.linq-staging-site.com/admin1/addcalendersubscriber",
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  calenderSubscriber: calendarEmail,
                                }),
                              },
                            );
                          } catch (error) {
                            console.error(
                              "Failed to save calendar subscriber:",
                              error,
                            );
                          }

                          setOpen(false);
                        }}
                        enctype="multipart/form-data"
                        method="POST"
                        data-hs-cf-bound="true"
                      >
                        <input
                          type="email"
                          placeholder="Email address"
                          required
                          value={calendarEmail}
                          onChange={(e) => setCalendarEmail(e.target.value)}
                        />
                        <input
                          type="submit"
                          placeholder="Submit"
                          style={{ backgroundColor: "var(--secondary-color)" }}
                        ></input>
                        {addToCalendarSuccessMessage}
                      </form>
                    </div>
                  </Popup>
                </div>
                <div
                  className="BenefitScreen_imageContainer__dQ2Lk"
                  style={{
                    backgroundImage: `url(${ketTakewaysBg})`,
                  }}
                ></div>
              </div>
            </div>
            {/* <div className="container-fluid p-0">
          <div className="row no-gutters" style={{ minHeight: "100vh" }}>
            <div
              className="col-lg-6 col-md-6 d-none d-md-block"
              style={{
                backgroundImage:
                  'url("https://www.desalination-resource-recovery.com/static/media/benefits1.f71bdc353409b0e5b816.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
              }}
            >
              <div
                className="w-100 h-100"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              ></div>
            </div>

            <div className="col-lg-6 col-md-6 col-12 bg-white d-flex">
              <div
                style={{ maxWidth: "900px", padding: "95px 100px 95px 150px" }}
              >
                <h1
                  className="font-weight-bold mb-4"
                  style={{
                    fontSize: "2.5rem",
                    letterSpacing: "3px",
                    color: "#333",
                  }}
                >
                  BENEFITS
                </h1>

                <p
                  className="mb-4"
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    color: "#333",
                    fontWeight: "500",
                  }}
                >
                  The <strong>Desalination & Resource Recovery 2025</strong>{" "}
                  event provides leading market intelligence and features
                  industry experts discussing the latest advancements in
                  desalination, resource recovery, and sustainable water
                  management.
                </p>

                <p
                  className="mb-4"
                  style={{ fontSize: "1rem", fontWeight: "600", color: "#333" }}
                >
                  Benefits of attending include:
                </p>

                <ul className="list-unstyled mb-5">
                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      Across two days of in-depth presentations, industry
                      experts will share the latest market insights, results,
                      and experiences within the desalination sector.
                    </span>
                  </li>

                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      This event provides an exclusive networking opportunity
                      for professionals to connect with peers facing similar
                      challenges and sharing insights from past and current
                      projects.
                    </span>
                  </li>

                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      Attendees will receive updates on regional projects and
                      research from leading desalination experts, who will share
                      their experiences, findings, and new proposals.
                    </span>
                  </li>

                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      Technical presentations by water treatment manufacturers
                      will showcase advancements in resource recovery,
                      efficiency improvements, and cost-reduction strategies.
                    </span>
                  </li>

                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      New case studies will present specific examples from water
                      utilities and desalination facilities, providing practical
                      insights.
                    </span>
                  </li>

                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      This exclusive opportunity allows participants to connect
                      with a wide range of industry stakeholders and explore
                      innovative techniques to address emerging challenges.
                    </span>
                  </li>
                </ul>

                <button
                  className="btn btn-dark btn-block font-weight-bold py-3"
                  onClick={() => navigate("/agenda")}
                  style={{
                    backgroundColor: "#2c2c2c",
                    border: "none",
                    letterSpacing: "2px",
                    fontSize: "1rem",
                  }}
                >
                  VIEW PROGRAM
                </button>
              </div>
            </div>
          </div>

          <div className="row no-gutters" style={{ minHeight: "100vh" }}>
            <div className="col-lg-6 col-md-6 col-12 bg-white d-flex align-items-center">
              <div
                style={{ maxWidth: "900px", padding: "95px 100px 95px 150px" }}
              >
                <h1
                  className="font-weight-bold mb-4"
                  style={{
                    fontSize: "2.5rem",
                    letterSpacing: "3px",
                    color: "#333",
                  }}
                >
                  KEY TAKEAWAYS
                </h1>

                <ul className="list-unstyled mb-5">
                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      Gain insights into current water management market
                      dynamics and their impact on the industry
                    </span>
                  </li>

                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      Discover how to develop effective strategies for
                      successful diversification projects
                    </span>
                  </li>

                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      Learn from industry and expert trends, including a review
                      of the current year and projections for the future
                    </span>
                  </li>

                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      Explore new product innovations and technological
                      advancements shaping the future of the industry
                    </span>
                  </li>

                  <li className="mb-3 d-flex">
                    <span
                      className="mr-3"
                      style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    >
                      ■
                    </span>
                    <span
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: "1.6",
                        color: "#333",
                      }}
                    >
                      Access diverse insights and perspectives from subject
                      business and allied industry experts who will share
                      experiences for a comprehensive understanding
                    </span>
                  </li>
                </ul>

                <button
                  className="btn btn-dark btn-block font-weight-bold py-3"
                  style={{
                    backgroundColor: "#2c2c2c",
                    border: "none",
                    letterSpacing: "2px",
                    fontSize: "1rem",
                  }}
                >
                  ADD TO CALENDAR
                </button>
              </div>
            </div>

            <div
              className="col-lg-6 col-md-6 d-none d-md-block"
              style={{
                backgroundImage:
                  'url("https://www.desalination-resource-recovery.com/static/media/benefits2.10516737e5b8b580662d.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
              }}
            >
              <div
                className="w-100 h-100"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              ></div>
            </div>
          </div>
        </div> */}
            <div className="BenefitScreen_attendeesSection__2a94I">
              <h2>who should attend?</h2>
              <span
                dangerouslySetInnerHTML={{
                  __html: cleanHtml(whoAttend),
                }}
              ></span>
              <div className="BenefitScreen_box__v0Eqb">
                {isLessThen769 ? (
                  <>
                    <div className="DropDown_container__ojscJ">
                      <button
                        className={
                          activeTab === "core"
                            ? "DropDown_dropdownToggle__s4C4x"
                            : "DropDown_dropdownToggle__s4C4x DropDown_bgGrey__jhDac"
                        }
                        style={{
                          borderBottom:
                            activeTab === "core" ? "1px solid #5e5e5e" : "",
                        }}
                        onClick={() => setActiveTab("core")}
                      >
                        Core Attendees
                        <img
                          src={
                            activeTab === "core" ? arrowUpIcon : arrowDownIcon
                          }
                          alt="arrow"
                        ></img>
                      </button>
                      {activeTab === "core" ? (
                        <>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: cleanHtml(coreAttendeeDes),
                            }}
                          ></span>
                          <div className="DropDown_linksContainer__VBDsq">
                            <div>
                              {currentData.map((item) => (
                                <a className="DropDown_link__EYiJR" href="/">
                                  {item.corAttandeeName}
                                </a>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="DropDown_container__ojscJ">
                      <button
                        className={
                          activeTab === "industries"
                            ? "DropDown_dropdownToggle__s4C4x"
                            : "DropDown_dropdownToggle__s4C4x DropDown_bgGrey__jhDac"
                        }
                        style={{
                          borderBottom:
                            activeTab === "industries"
                              ? "1px solid #5e5e5e"
                              : "",
                        }}
                        onClick={() => setActiveTab("industries")}
                      >
                        Industries & Companies
                        <img
                          src={
                            activeTab === "industries"
                              ? arrowUpIcon
                              : arrowDownIcon
                          }
                          alt="arrow"
                        ></img>
                      </button>
                      {activeTab === "industries" ? (
                        <>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: cleanHtml(industriesDes),
                            }}
                          ></span>
                          <div className="DropDown_linksContainer__VBDsq">
                            <div>
                              {currentData.map((item) => (
                                <a className="DropDown_link__EYiJR" href="/">
                                  {item.industryName}
                                </a>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="BenefitScreen_btnContainer__8du9I">
                      <button
                        className={
                          activeTab === "core"
                            ? "BenefitScreen_active__MWNpl"
                            : ""
                        }
                        onClick={() => setActiveTab("core")}
                      >
                        Core Attendees
                      </button>
                      <button
                        className={
                          activeTab === "industries"
                            ? "BenefitScreen_active__MWNpl"
                            : ""
                        }
                        onClick={() => setActiveTab("industries")}
                      >
                        Industries & Companies
                      </button>
                    </div>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(
                          activeTab === "core"
                            ? coreAttendeeDes
                            : industriesDes,
                        ),
                      }}
                    ></span>
                    <div className="BenefitScreen_linksContainer__HJyBO">
                      <div>
                        {currentData.map((item) => (
                          <a className="BenefitScreen_link__48IAR" href="/">
                            {activeTab === "core"
                              ? item.corAttandeeName
                              : item.industryName}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* <div
              className="who-should-attend-section"
              style={{ backgroundColor: "#00BFFF", padding: "60px 0" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-12 text-center mb-2">
                    <h2
                      className="text-white mb-4"
                      style={{
                        fontSize: "36px",
                        fontWeight: "800",
                        lineHeight: "36px",
                      }}
                    >
                      WHO SHOULD ATTEND?
                    </h2>
                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: "28px",
                        margin: "40px auto",
                        fontWeight: "500",
                        maxWidth: "1248px",
                        textAlign: "center",
                        width: "58%",
                        color: "#fff",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(whoAttend),
                      }}
                    ></p>
                  </div>
                </div>

                <div className="col-12">
                  <div className="attendees-container bg-white rounded shadow-lg">
                    <div className="d-flex">
                      <div
                        className="col-md-6 d-flex items-center justify-center p-3"
                        style={{
                          backgroundColor:
                            activeTab === "core" ? "#080808" : "#d3d3d3",
                          cursor: "pointer",
                        }}
                        onClick={() => setActiveTab("core")}
                      >
                        <h4
                          className={`mb-0 font-weight-bold ${activeTab === "core" ? "text-white" : "text-dark"
                            }`}
                        >
                          Core Attendees
                        </h4>
                      </div>
                      <div
                        className="col-md-6 d-flex items-center justify-center p-3"
                        style={{
                          backgroundColor:
                            activeTab === "industries" ? "#080808" : "#d3d3d3",
                          cursor: "pointer",
                        }}
                        onClick={() => setActiveTab("industries")}
                      >
                        <h4
                          className={`mb-0 font-weight-bold ${activeTab === "industries" ? "text-white" : "text-dark"
                            }`}
                        >
                          Industries & Companies
                        </h4>
                      </div>
                    </div>

                    <div className="col-12">
                      <p
                        style={{
                          fontSize: "16px",
                          margin: "40px auto",
                          width: "70%",
                          textAlign: "center",
                          fontWeight: "800",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: cleanHtml(
                            activeTab === "core" ? coreAttendeeDes : industriesDes
                          ),
                        }}
                      ></p>
                    </div>

                    <div className="row mx-auto pb-4">
                      {currentData.map((item, index) => (
                        <div
                          key={index}
                          className="col-lg-4 col-md-6 col-sm-6 mb-3"
                        >
                          <div
                            className="attendee-card"
                            style={{
                              backgroundColor: "#eee",
                              borderRadius: "2px",
                              minHeight: "45px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#181818",
                              padding: "10px 20px",
                              border: "none",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                            }}
                          >
                            {item}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <style jsx>{`
            .attendee-card {
              transition: all 0.3s ease;
              border: 1px solid #ddd;
            }

            @media (max-width: 768px) {
              .who-should-attend-section h2 {
                font-size: 2rem !important;
              }

              .attendee-card {
                font-size: 0.9rem !important;
                min-height: 50px !important;
              }
            }

            @media (max-width: 576px) {
              .who-should-attend-section {
                padding: 40px 0 !important;
              }

              .who-should-attend-section h2 {
                font-size: 1.8rem !important;
                letter-spacing: 1px !important;
              }

              .attendee-card {
                font-size: 0.85rem !important;
                padding: 15px 10px !important;
              }
            }
          `}</style>
            </div> */}
            <div className="BenefitScreen_ratingsSection__ZJkXY">
              <h2>they've attended our events</h2>
              <div className="BenefitScreen_ratingCardContainer__0LX-B ratingCard">
                {isLessThen639 ? (
                  <Slider {...settings}>
                    {testimonialList.map((testimonialItem) => (
                      <div className="RatingCard_container__xva8+">
                        <div className="RatingCard_names__7PxKe">
                          <h4>{testimonialItem.personName}</h4>
                          <h4>{testimonialItem.personCompany}</h4>
                        </div>
                        <p>"{testimonialItem.personMessage}"</p>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  testimonialList.map((testimonialItem) => (
                    <div className="RatingCard_container__xva8+">
                      <div className="RatingCard_names__7PxKe">
                        <h4>{testimonialItem.personName}</h4>
                        <h4>{testimonialItem.personCompany}</h4>
                      </div>
                      <p>"{testimonialItem.personMessage}"</p>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* <div className="testimonials-container">
              <div className="container">
                <h2 className="testimonials-title">They've Attended Our Events</h2>

                <div className="testimonials-grid">
                  {testimonialList?.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                      <div className="testimonial-header">
                        <h4 className="testimonial-name">
                          {testimonial.personName}
                        </h4>
                        <h4 className="testimonial-company">
                          {testimonial.personCompany}
                        </h4>
                      </div>
                      <p className="testimonial-quote">
                        "{testimonial.personMessage}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
            <SubscribeForm />
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WhoShouldAttend;
