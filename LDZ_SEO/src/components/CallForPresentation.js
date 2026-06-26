import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import FeaturedSpeaker from "./FeaturedSpeaker";
import "../assets/css/CallForPresentation.css";
import "../assets/css/form.css";
import Slider from "react-slick";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import "../assets/css/popUp.css";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
import { useApiData } from "../common/ApiContext";
import { useSSRData } from "../common/useSSRData";
import { downloadIcsFile } from "../common/calendarUtils";
import API_BASE_URL from '../config/apiConfig';
const callingSpeakerBg = "/images/WebImages/calling-all-speakers.webp";
const beAPartOfOurBg = "/images/WebImages/be-a-part-of-our-multi-disciplined-agenda.webp";
const iconNetwork = "/images/WebCommonImages/icon-network.png";
const iconLearn = "/images/WebCommonImages/icon-learn.png";
const iconLeadGeneration = "/images/WebCommonImages/icon-lead-generation.png";
const iconAmplify = "/images/WebCommonImages/icon-amplify.png";
const CallForPresentation = () => {
  const { eventDetails } = useApiData();
  const toEmails = useSSRData("toEmails") || "benny.scott@iq-hub.com";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [speakerPageData, setSpeakerPageData] = useState([]);
  const [paraOne, setParaOne] = useState("");
  const [paraTwo, setParaTwo] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameErr, setFullNameErr] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyNameErr, setCompanyNameErr] = useState(false);
  const [proposedTitle, setProposedTitle] = useState("");
  const [proposedTitleErr, setProposedTitleErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [calendarEmail, setCalendarEmail] = useState("");

  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");
  const [companyErrorMessage, setCompanyNameErrorMessage] = useState("");
  const [proposedTitleErrorMessage, setProposedTitleErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [addToCalendarSuccessMessage, setAddToCalendarSuccessMessage] = useState("");


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const features = [
    {
      iconUrl: `${iconNetwork}`,
      title: "NETWORK",
      description:
        "Connect with industry peers and experts to build valuable relationships. An opportunity to build your professional network in an environment fostering growth and collaboration.",
    },
    {
      iconUrl: `${iconLearn}`,
      title: "LEARN",
      description:
        "Engage with leading tech and business leaders in the current landscape. Join industry thought leaders tackling major challenges, and dive into deeper discussions on cutting-edge topics.",
    },
    {
      iconUrl: `${iconLeadGeneration}`,
      title: "LEAD GENERATION",
      description:
        "Discover and connect with key industry players relevant to your business. Generate significant leads and broaden your corporate reach, enhancing your presence in the global market.",
    },
    {
      iconUrl: `${iconAmplify}`,
      title: "AMPLIFY",
      description:
        "Join an exclusive gathering that draws journalists from top media outlets like Bloomberg, Financial Times, Forbes, and CNN Business. Elevate your message to a global audience.",
    },
  ];
  const styles = {
    title: {
      color: "#181818",
      fontSize: "36px",
      fontWeight: "800",
      lineHeight: "30px",
      margin: "0",
      textAlign: "center",
      textTransform: "uppercase",
    },
    swiperContainer: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 40px",
    },
    slide: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    speakerCard: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      padding: "30px 20px",
      textAlign: "center",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer",
      width: "280px",
      margin: "0 auto",
    },
    speakerImage: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      margin: "0 auto 20px",
      border: "4px solid #ffffff",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
    },
    speakerName: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1a1a1a",
      marginBottom: "8px",
      lineHeight: "1.2",
    },
    speakerCompany: {
      fontSize: "1rem",
      color: "#666666",
      fontWeight: "500",
      letterSpacing: "0.5px",
    },
    navigationButton: {
      backgroundColor: "#1a1a1a",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "18px",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
    },
    pagination: {
      marginTop: "40px",
    },
  };

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

  // Responsive breakpoints
  const isXSmall = windowWidth < 480;
  const isSmall = windowWidth >= 480 && windowWidth < 768;
  const isMedium = windowWidth >= 768 && windowWidth < 1024;
  const isLarge = windowWidth >= 1024 && windowWidth < 1440;
  const isXLarge = windowWidth >= 1440;

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Dynamic Styles
  const sectionStyle = {
    paddingTop: isXSmall ? "30px" : isSmall ? "40px" : "50px",
    paddingBottom: isXSmall ? "30px" : isSmall ? "40px" : "50px",
    backgroundColor: "#080808",
    paddingLeft: isXSmall
      ? "15px"
      : isSmall
        ? "20px"
        : isMedium
          ? "30px"
          : "40px",
    paddingRight: isXSmall
      ? "15px"
      : isSmall
        ? "20px"
        : isMedium
          ? "30px"
          : "40px",
  };

  const containerStyle = {
    margin: "0 auto",
    maxWidth: isXSmall
      ? "100%"
      : isSmall
        ? "100%"
        : isMedium
          ? "900px"
          : isLarge
            ? "1200px"
            : "1400px",
    width: "100%",
  };

  const innerContainerStyle = {
    margin: "0 auto",
  };

  const headingStyle = {
    color: "white",
    fontSize: isXSmall
      ? "20px"
      : isSmall
        ? "24px"
        : isMedium
          ? "26px"
          : isLarge
            ? "30px"
            : "32px",
    fontWeight: "800",
    margin: "0",
    padding: "0",
    textAlign: "center",
    textTransform: "uppercase",
    lineHeight: "1.2",
  };

  const paragraphStyle = {
    color: "white",
    fontSize: isXSmall ? "14px" : isSmall ? "15px" : "16px",
    fontWeight: "400",
    paddingTop: isXSmall ? "20px" : isSmall ? "25px" : "32px",
    textAlign: "center",
    lineHeight: "1.6",
    margin: "0",
    maxWidth: isXSmall ? "100%" : isSmall ? "95%" : "90%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: isXSmall
      ? "25px"
      : isSmall
        ? "30px"
        : isMedium
          ? "35px"
          : "42px",
  };

  const formRowStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: isXSmall ? "15px" : isSmall ? "18px" : "23px",
    gap: isMobile ? "15px" : isTablet ? "20px" : "30px",
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: isMobile ? "100%" : "calc(50% - 15px)",
  };

  const inputStyle = {
    backgroundColor: "white",
    border: "none",
    borderRadius: "2px",
    height: isXSmall ? "44px" : "48px",
    outline: "none",
    padding: isXSmall ? "0 15px" : isSmall ? "0 20px" : "0 23px",
    width: "100%",
    fontSize: isXSmall ? "14px" : isSmall ? "15px" : "16px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const textareaContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: isXSmall ? "18px" : "23px",
    width: "100%",
  };

  const textareaStyle = {
    border: "none",
    borderRadius: "2px",
    height: isXSmall
      ? "120px"
      : isSmall
        ? "140px"
        : isMedium
          ? "160px"
          : "185px",
    outline: "none",
    padding: isXSmall ? "15px" : isSmall ? "18px" : "20px 23px",
    resize: "none",
    width: "100%",
    fontSize: isXSmall ? "14px" : isSmall ? "15px" : "16px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const submitButtonStyle = {
    backgroundColor: "transparent",
    border: "1px solid hsla(0,0%,100%,0.753)",
    borderRadius: "2px",
    color: "white",
    cursor: "pointer",
    fontSize: isXSmall ? "14px" : isSmall ? "16px" : isMedium ? "18px" : "20px",
    fontWeight: "800",
    height: isXSmall ? "45px" : "50px",
    marginTop: isXSmall ? "25px" : isSmall ? "35px" : "50px",
    minWidth: isXSmall ? "150px" : isSmall ? "180px" : "230px",
    padding: isXSmall ? "0 30px" : isSmall ? "0 40px" : "0 50px",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
  };

  // Event Handlers
  const handleSubmitHover = (e, isHovering) => {
    if (isHovering) {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "#181818";
    } else {
      e.target.style.backgroundColor = "transparent";
      e.target.style.color = "white";
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const quickProposalSectionRef = useRef(null);

  const scrollToQuickProposal = () => {
    if (quickProposalSectionRef.current) {
      const navbarHeight = 0;
      const elementPosition = quickProposalSectionRef.current.offsetTop;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  useEffect(() => {
    callSpeakerPageDataApi();
    // eslint-disable-next-line
  }, []);

  const callSpeakerPageDataApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/getspeakerpagedata`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setSpeakerPageData(data["speakerPageStaticData"]);
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
    if (speakerPageData?.length > 0) {
      setParaOne(
        speakerPageData[0]?.sectionFirstDescription?.replace(/^"(.*)"$/, "$1"),
      );
      setParaTwo(
        speakerPageData[0]?.sectionSecondDescription?.replace(/^"(.*)"$/, "$1"),
      );
    }
    // eslint-disable-next-line
  }, [speakerPageData]);

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

  const checkOnChange = () => {

    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    setFullNameErr(false);
    setCompanyNameErr(false);
    setEmailErr(false);
    setProposedTitleErr(false);

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

    if (!proposedTitle || proposedTitle.trim() === "") {
      setProposedTitleErrorMessage(<p>Proposed title is required</p>)
      setProposedTitleErr(true);
      hasError = true;
    } else {
      setProposedTitleErrorMessage("")
    }

    if (hasError) return;
  };

  const submitBtnClk = async (e) => {
    e.preventDefault();

    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setFullNameErr(false);
    setCompanyNameErr(false);
    setEmailErr(false);
    setProposedTitleErr(false);

    if (!fullName || fullName.trim() === "") {
      setFullNameErrorMessage(<p>Full name is required</p>);
      setFullNameErr(true);
      hasError = true;
    } else {
      setFullNameErrorMessage("");
    }

    if (!companyName || companyName.trim() === "") {
      setCompanyNameErrorMessage(<p>Company name is required</p>);
      setCompanyNameErr(true);
      hasError = true;
    } else {
      setCompanyNameErrorMessage("");
    }

    if (!email || email.trim() === "") {
      setEmailErrorMessage(<p>Email address is required</p>);
      setEmailErr(true);
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailErrorMessage(<p>Please enter a valid email address</p>);
      setEmailErr(true);
      hasError = true;
    } else {
      setEmailErrorMessage("");
    }

    if (!proposedTitle || proposedTitle.trim() === "") {
      setProposedTitleErrorMessage(<p>Proposed title is required</p>);
      setProposedTitleErr(true);
      hasError = true;
    } else {
      setProposedTitleErrorMessage("");
    }

    if (hasError) return;

    setIsSubmitting(true);

    const finalData = new FormData();
    finalData.append("requesterName", fullName);
    finalData.append("requesterCompanyName", companyName);
    finalData.append("proposedTitle", proposedTitle);
    finalData.append("requesterEmail", email);
    if (message?.length > 0) {
      finalData.append("requesterMessage", JSON.stringify(message));
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin1/addquickproposalrequest`,
        { method: "POST", body: finalData }
      );
      const data = await response.json();
      if (data.status) {
        setFullName("");
        setFullNameErr(false);
        setCompanyName("");
        setCompanyNameErr(false);
        setProposedTitle("");
        setProposedTitleErr(false);
        setEmail("");
        setEmailErr(false);
        setEmailErrMsg("");
        setMessage("");

        const html = `
          <h3>Speaker Proposal:</h3>
          <div style="width:60%;background-color:transparent;color:black;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px;border:1px solid #ddd;"><b>Full Name:</b></td><td style="padding:6px;border:1px solid #ddd;">${fullName}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;"><b>Company Name:</b></td><td style="padding:6px;border:1px solid #ddd;">${companyName}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;"><b>Proposed Title:</b></td><td style="padding:6px;border:1px solid #ddd;">${proposedTitle}</td></tr>
              <tr><td style="padding:6px;border:1px solid #ddd;"><b>Email:</b></td><td style="padding:6px;border:1px solid #ddd;">${email}</td></tr>
              ${message ? `<tr><td style="padding:6px;border:1px solid #ddd;"><b>Brief Outline:</b></td><td style="padding:6px;border:1px solid #ddd;">${message}</td></tr>` : ""}
            </table>
          </div>
          <p style="font-weight: 700">
            <span style="text-decoration: underline">Quick Access</span>
            <br />
            Link: ${'<a style="font-weight: 500" target="_blank" href="' + API_BASE_URL + '">' + API_BASE_URL + '</a>'}
          </p>
        `;

        await fetch(
          `${API_BASE_URL}/admin1/sendmail`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              toemail: toEmails,
              cc: "",
              subject: `SPEAKER PROPOSAL - ${eventDetails?.eventName}`,
              html,
            }),
          }
        );

        setSuccessMessage(
          <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
            Submitted Successfully
          </p>
        );
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageSeo = usePageSeo("speakers");
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
        <meta name="twitter:description" content={seoDesc} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
        <link rel="canonical" href={`${API_BASE_URL}/speakers`} />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        {/* <div
          style={{
            paddingTop: "150px", 
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

        <div className="Speakers_addToCakendar__foKTF">
          <div>
            <div
              className="Speakers_imageContainer__Lv+er"
              style={{
                backgroundImage: `url(${callingSpeakerBg})`,
              }}
            ></div>
            <div className="Speakers_textContainer__UsgLs">
              <h2>calling all speakers</h2>
              <div className="Speakers_innerContent__ZoIKd">
                <span
                  dangerouslySetInnerHTML={{
                    __html: cleanHtml(paraOne),
                  }}
                >
                </span>
              </div>
              <button onClick={scrollToQuickProposal}>
                Submit your proposal
              </button>
            </div>
          </div>
        </div>
        <div className="Speakers_addToCakendar__foKTF">
          <div className="Speakers_reverse__8rkCE">
            <div className="Speakers_textContainer__UsgLs">
              <h2>be a part of our multi-disciplined agenda...</h2>
              <div className="Speakers_innerContent__ZoIKd">
                <span
                  dangerouslySetInnerHTML={{
                    __html: cleanHtml(paraTwo),
                  }}
                >
                </span>
              </div>
              <Popup
                open={open}
                onClose={() => setOpen(false)}
                trigger={
                  <button onClick={() => setOpen(true)}>
                    {" "}
                    add to calendar
                  </button>
                }
                position={windowWidth < 941 ? "bottom center" : "right center"}
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
                          `${API_BASE_URL}/admin1/addcalendersubscriber`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              calenderSubscriber: calendarEmail,
                            }),
                          },
                        );
                        downloadIcsFile(eventDetails);
                      } catch (error) {
                        console.error(
                          "Failed to save calendar subscriber:",
                          error,
                        );
                      }

                      setOpen(false);
                    }}
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
                      value="Submit"
                      style={{ backgroundColor: "var(--secondary-color)" }}
                    />
                    {addToCalendarSuccessMessage}
                  </form>
                </div>
              </Popup>
            </div>
            <div
              className="Speakers_imageContainer__Lv+er"
              style={{
                backgroundImage: `url(${beAPartOfOurBg})`,
              }}
            ></div>
          </div>
        </div>

        {isMobile ? (
          <div className="Speakers_cardsSliderContainer__aDQAp">
            <Slider {...settings}>
              {features.map((feature, index) => (
                <div className="Speakers_sliderCard__vTffg">
                  <img
                    src={feature.iconUrl || "/placeholder.svg"}
                    alt={`${feature.title} icon`}
                  ></img>
                  <h3 style={{ color: "#0c1618" }}>{feature.title}</h3>
                  <p style={{ color: "#0c1618" }}>{feature.description}</p>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="Speakers_cardContain__St8Y1">
            <div className="Speakers_cardsContainer__MajCc">
              {features.map((feature, index) => (
                <div className="Speakers_card__suIM7">
                  <img
                    src={feature.iconUrl || "/placeholder.svg"}
                    alt={`${feature.title} icon`}
                  ></img>
                  <h3 style={{ color: "#0c1618" }}>{feature.title}</h3>
                  <p style={{ color: "#0c1618" }}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className="Form_container__jwPCR"
          ref={quickProposalSectionRef}
          style={{
            transition: "margin-top 0.3s ease",
          }}
        >
          <div>
            <div>
              <h2>quick proposal</h2>
              <form
                id="LDZ-(Quick Proposal 2026)"
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
                        name="proposed"
                        type="text"
                        placeholder="Proposed title *"
                        value={proposedTitle}
                        onChange={(e) => {
                          setProposedTitle(e.target.value);
                          if (proposedTitleErrorMessage) checkOnChange();
                          setProposedTitleErr(false);
                        }}
                      ></input>
                      {proposedTitleErrorMessage}
                    </div>
                    <div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email address *"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailErrorMessage) checkOnChange();
                          setEmailErr(false);
                          setEmailErrMsg("");
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
                      placeholder="Brief outline"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Please Wait" : "get back to me"}</button>
                </div>
              </form>
              {successMessage}
            </div>
          </div>
        </div>
      </div>
      <SubscribeForm />
      <Footer />
    </>
  );
};

export default CallForPresentation;
