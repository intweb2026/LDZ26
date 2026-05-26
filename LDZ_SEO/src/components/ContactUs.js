import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/contactUs.css";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
import "../assets/css/form.css";
const emailImage = "/images/WebCommonImages/icon-email.png";
const emailIcon = "/images/WebCommonImages/msg.png";

const ContactUs = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [helpersList, setHelpersList] = useState([]);
  const [personName, setPersonName] = useState("");
  const [personNameError, setPersonNameError] = useState("");
  const [personCompany, setPersonCompany] = useState("");
  const [personCompanyError, setPersonCompanyError] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personEmailError, setPersonEmailError] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [personMobile, setPersonMobile] = useState("");
  const [personMobileError, setPersonMobileError] = useState("");
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState([]);
  const [contactUsPageData, setContactUsPageData] = useState([]);
  const [emailDes, setEmailDes] = useState("");

  const [personNameErrorMessage, setPersonNameErrorMessage] = useState("");
  const [personCompanyErrorMessage, setPersonCompanyErrorMessage] = useState("");
  const [personEmailErrorMessage, setPersonEmailErrorMessage] = useState("");
  const [personMobileErrorMessage, setPersonMobileErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const subject = encodeURIComponent(
    "Litihium Downstream Summit 2026",
  );
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    callHelperListApi();
    callContactUsPageDataApi();
    // eslint-disable-next-line
  }, []);

  const callHelperListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/contactushelpers`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setHelpersList(data["contactUsHelpers"]);
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

  const callContactUsPageDataApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/contactusstaticdata`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setContactUsPageData(data["contatusPageStaticData"]);
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
    if (contactUsPageData?.length > 0) {
      setEmailDes(
        contactUsPageData[0]?.sectionShortParagraph?.replace(/^"(.*)"$/, "$1"),
      );
    }
    // eslint-disable-next-line
  }, [contactUsPageData]);

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
  const contactFormSectionStyle = {
    paddingTop: isXSmall
      ? "100px"
      : isSmall
        ? "120px"
        : isMedium
          ? "140px"
          : "150px",
    paddingBottom: isXSmall
      ? "50px"
      : isSmall
        ? "60px"
        : isMedium
          ? "80px"
          : "100px",
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

  const headingStyle = {
    color: "white",
    fontSize: isXSmall
      ? "20px"
      : isSmall
        ? "24px"
        : isMedium
          ? "30px"
          : isLarge
            ? "36px"
            : "40px",
    fontWeight: "800",
    margin: "0",
    padding: "0",
    textAlign: "center",
    textTransform: "uppercase",
    lineHeight: "1.2",
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

  const checkboxSectionStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "2px",
    padding: isXSmall
      ? "15px 10px"
      : isSmall
        ? "18px 15px"
        : isMedium
          ? "20px 25px"
          : "20px 40px 20px 20px",
    gap: isMobile ? "12px" : isTablet ? "15px" : "20px",
  };

  const checkboxContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "space-between",
    width: "100%",
    gap: isMobile ? "12px" : isTablet ? "15px" : "20px",
  };

  const checkboxLabelStyle = {
    color: "#777",
    fontSize: isXSmall ? "12px" : isSmall ? "13px" : "15px",
    fontWeight: "bold",
    whiteSpace: isMobile ? "normal" : "nowrap",
    margin: "0",
  };

  const checkboxItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: isXSmall ? "8px" : "10px",
    width: isMobile ? "100%" : "auto",
  };

  const checkboxInputStyle = {
    width: isXSmall ? "14px" : "16px",
    height: isXSmall ? "14px" : "16px",
    cursor: "pointer",
    flexShrink: 0,
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

  const emailSectionStyle = {
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
    paddingTop: isXSmall
      ? "50px"
      : isSmall
        ? "60px"
        : isMedium
          ? "80px"
          : "100px",
    paddingBottom: isXSmall
      ? "40px"
      : isSmall
        ? "50px"
        : isMedium
          ? "65px"
          : "80px",
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

  const emailHeadingStyle = {
    color: "#181818",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    fontSize: isXSmall
      ? "20px"
      : isSmall
        ? "24px"
        : isMedium
          ? "30px"
          : isLarge
            ? "36px"
            : "40px",
    fontWeight: "800",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    padding: "0",
    textAlign: "center",
    textTransform: "uppercase",
    gap: isXSmall ? "10px" : isSmall ? "15px" : "20px",
  };

  const emailImageStyle = {
    height: "auto",
    width: isXSmall
      ? "35px"
      : isSmall
        ? "40px"
        : isMedium
          ? "50px"
          : isLarge
            ? "58px"
            : "65px",
  };

  const emailDescriptionStyle = {
    color: "#181818",
    fontSize: isXSmall ? "13px" : isSmall ? "14px" : isMedium ? "15px" : "16px",
    fontWeight: "600",
    lineHeight: "1.6",
    marginTop: isXSmall
      ? "20px"
      : isSmall
        ? "25px"
        : isMedium
          ? "30px"
          : "38px",
    marginBottom: isXSmall
      ? "25px"
      : isSmall
        ? "30px"
        : isMedium
          ? "35px"
          : "43px",
    textAlign: "center",
    width: isXSmall ? "98%" : isSmall ? "95%" : "91%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const emailCardsContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: "1240px",
    width: "100%",
    gap: isXSmall ? "15px" : isSmall ? "18px" : isMedium ? "20px" : "2%",
  };

  const emailCardStyle = {
    backgroundColor: "#080808",
    borderRadius: "2px",
    marginBottom: isXSmall ? "15px" : "20px",
    padding: isXSmall
      ? "20px 15px"
      : isSmall
        ? "25px 20px"
        : isMedium
          ? "35px 30px"
          : "45px",
    width: isMobile ? "100%" : isTablet ? "48%" : "49%",
    boxSizing: "border-box",
  };

  const cardTitleStyle = {
    color: "#00baff",
    fontSize: isXSmall
      ? "16px"
      : isSmall
        ? "18px"
        : isMedium
          ? "20px"
          : isLarge
            ? "24px"
            : "26px",
    fontWeight: "800",
    marginBottom: isXSmall ? "15px" : isSmall ? "20px" : "30px",
    padding: "0",
    textAlign: "left",
    textTransform: "uppercase",
    lineHeight: "1.2",
  };

  const cardNameStyle = {
    color: "white",
    fontSize: isXSmall
      ? "16px"
      : isSmall
        ? "18px"
        : isMedium
          ? "20px"
          : isLarge
            ? "22px"
            : "24px",
    fontWeight: "800",
    marginBottom: "5px",
    padding: "0",
    textAlign: "left",
    textTransform: "uppercase",
    lineHeight: "1.2",
  };

  const cardPositionStyle = {
    color: "white",
    fontSize: isXSmall ? "14px" : isSmall ? "16px" : isMedium ? "17px" : "18px",
    fontWeight: "bold",
    marginBottom: "18px",
    padding: "0",
    textAlign: "left",
    lineHeight: "1.3",
  };

  const cardEmailStyle = {
    display: "flex",
    alignItems: "center",
    color: "white",
    fontSize: isXSmall ? "13px" : isSmall ? "14px" : isMedium ? "15px" : "16px",
    fontWeight: "500",
    margin: "0",
    padding: "0",
    textDecoration: "underline",
    wordBreak: "break-all",
    lineHeight: "1.4",
  };

  const emailIconStyle = {
    marginRight: isXSmall ? "10px" : "15px",
    height: "12px",
    width: "18px",
    flexShrink: 0,
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

  const checkOnChange = () => {

    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setPersonNameError(false);
    setPersonCompanyError(false);
    setPersonEmailError(false);
    setPersonMobileError(false);


    if (!personName || personName.trim() === "") {
      setPersonNameErrorMessage(<p>Full name is required</p>)
      setPersonNameError(true);
      hasError = true;
    } else {
      setPersonNameErrorMessage("")
    }

    if (!personCompany || personCompany.trim() === "") {
      setPersonCompanyErrorMessage(<p>Company name is required</p>)
      setPersonCompanyError(true);
      hasError = true;
    } else {
      setPersonCompanyErrorMessage("")
    }

    if (!personEmail || personEmail.trim() === "") {
      setPersonEmailErrorMessage(<p>Email address is required</p>)
      setPersonEmailError(true);
      hasError = true;
    } else if (!emailRegex.test(personEmail)) {
      setPersonEmailErrorMessage(<p>Please enter a valid email address</p>)
      setPersonEmailError(true);
      hasError = true;
    } else {
      setPersonEmailErrorMessage("")
    }

    if (!personMobile || personMobile.trim() === "") {
      setPersonMobileErrorMessage(<p>Mobile number is required</p>)
      setPersonMobileError(true);
      hasError = true;
    } else {
      setPersonMobileErrorMessage("")
    }

    if (hasError) return;
  };

  const submitBtnClk = (e) => {
    e.preventDefault();

    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setPersonNameError(false);
    setPersonCompanyError(false);
    setPersonEmailError(false);
    setPersonMobileError(false);


    if (!personName || personName.trim() === "") {
      setPersonNameErrorMessage(<p>Full name is required</p>)
      setPersonNameError(true);
      hasError = true;
    } else {
      setPersonNameErrorMessage("")
    }

    if (!personCompany || personCompany.trim() === "") {
      setPersonCompanyErrorMessage(<p>Company name is required</p>)
      setPersonCompanyError(true);
      hasError = true;
    } else {
      setPersonCompanyErrorMessage("")
    }

    if (!personEmail || personEmail.trim() === "") {
      setPersonEmailErrorMessage(<p>Email address is required</p>)
      setPersonEmailError(true);
      hasError = true;
    } else if (!emailRegex.test(personEmail)) {
      setPersonEmailErrorMessage(<p>Please enter a valid email address</p>)
      setPersonEmailError(true);
      hasError = true;
    } else {
      setPersonEmailErrorMessage("")
    }

    if (!personMobile || personMobile.trim() === "") {
      setPersonMobileErrorMessage(<p>Mobile number is required</p>)
      setPersonMobileError(true);
      hasError = true;
    } else {
      setPersonMobileErrorMessage("")
    }

    if (hasError) return;

    setSuccessMessage(<p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>Submitted Successfully</p>)
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);

    const finalData = new FormData();
    finalData.append("contactPersonName", personName);
    finalData.append("contactPersonCompanyName", personCompany);
    finalData.append("contactPersonEmail", personEmail);
    finalData.append("contactPersonMobile", personMobile);
    finalData.append("contactPersonMessage", message);
    if (reason?.length > 0) {
      finalData.append("contactUsReason", JSON.stringify(reason));
    }

    const requestOptions = {
      method: "POST",
      body: finalData,
    };
    fetch(
      "https://www.linq-staging-site.com/admin1/addcontactusrequest",
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setPersonName("");
          setPersonCompany("");
          setPersonEmail("");
          setPersonMobile("");
          setMessage("");
          setReason([]);
        } else {
          // toast.error(data?.message);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setReason((prev) => [...prev, name]);
    } else {
      setReason((prev) => prev.filter((item) => item !== name));
    }
  };

  const pageSeo = usePageSeo("contact-us");
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
        <link rel="canonical" href="https://www.linq-staging-site.com/contact-us" />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <article className="ContactUs_bg__MKqvU">
            <div className="Form_container__jwPCR">
              <div>
                <div>
                  <h1>request a call back</h1>
                  <form
                    id="LDZ-(Request a call back 2026)"
                    method="POST"
                    data-hs-cf-bound="true"
                    onSubmit={submitBtnClk}
                  >
                    <div className="LDZ_2026_request_a_call_back Form_form__nhNBc form_LDZ">
                      <div>
                        <div>
                          <input
                            name="fullname"
                            type="text"
                            placeholder="Full name *"
                            value={personName}
                            onChange={(e) => {
                              setPersonName(e.target.value);
                              if (personNameErrorMessage) checkOnChange();
                              setPersonNameError(false);
                            }}
                          ></input>
                          {personNameErrorMessage}
                        </div>
                        <div>
                          <input
                            name="companyname"
                            type="text"
                            placeholder="Company name *"
                            value={personCompany}
                            onChange={(e) => {
                              setPersonCompany(e.target.value);
                              if (personCompanyErrorMessage) checkOnChange();
                              setPersonCompanyError(false);
                            }}
                          ></input>
                          {personCompanyErrorMessage}
                        </div>
                      </div>
                      <div>
                        <div>
                          <input
                            name="email"
                            type="email"
                            placeholder="Email address *"
                            value={personEmail}
                            onChange={(e) => {
                              setPersonEmail(e.target.value);
                              if (personEmailErrorMessage) checkOnChange();
                              setPersonEmailError(false);
                              setEmailErrMsg("");
                            }}
                          ></input>
                          {personEmailErrorMessage}
                        </div>
                        <div>
                          <input
                            name="mobilenumber"
                            type="tel"
                            placeholder="Mobile number *"
                            value={personMobile}
                            onChange={(e) => {
                              let value = e.target.value;

                              // allow + only at the start
                              if (value.startsWith("+")) {
                                value =
                                  "+" + value.slice(1).replace(/[^0-9]/g, "");
                              } else {
                                value = value.replace(/[^0-9]/g, "");
                              }

                              setPersonMobile(value);
                              if (personMobileErrorMessage) checkOnChange();
                              setPersonMobileError(false);
                            }}
                            maxLength={16}
                          ></input>
                          {personMobileErrorMessage}
                        </div>
                      </div>
                      <div
                        className="Form_textArea__tsfub"
                        style={{ marginBottom: "23px" }}
                      >
                        <textarea
                          name="message"
                          cols={30}
                          rows={6}
                          placeholder="Message"
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                        ></textarea>
                      </div>
                      <div class="Form_checkboxContainer__UtH6X">
                        <div>
                          <div>
                            <label style={{ margin: "0px" }}>
                              Tell me more about
                            </label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="speaker"
                              name="speaker_opportunities"
                              value="Checked"
                              onChange={handleCheckboxChange}
                              checked={reason.includes("speaker_opportunities")}
                            ></input>
                            <label>Becoming a speaker</label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="sponsorship"
                              name="sponsorship_options"
                              value="Checked"
                              onChange={handleCheckboxChange}
                              checked={reason.includes("sponsorship_options")}
                            ></input>
                            <label>Sponsorship packages</label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              id="attending"
                              name="attending_the_event"
                              value="Checked"
                              onChange={handleCheckboxChange}
                              checked={reason.includes("attending_the_event")}
                            ></input>
                            <label>Attending the show</label>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        onMouseEnter={(e) => handleSubmitHover(e, true)}
                        onMouseLeave={(e) => handleSubmitHover(e, false)}
                      >
                        submit
                      </button>
                    </div>
                  </form>
                  {successMessage}
                </div>
              </div>
            </div>
            <section className="ContactUs_emailContainer__tR-DD">
              <h2>
                <img src={emailImage} alt="email img"></img>
                <span>Email Us</span>
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: cleanHtml(emailDes).replace(/<\/?p>/g, ""),
                }}
              ></p>
              <div className="ContactUs_emailCardContainer__Kg2ym">
                {helpersList.map((helper, index) => (
                  <div className="ContactUs_emailCard__YpEIv">
                    <h5>{helper?.reasonToHelp}:</h5>
                    <h6>{helper?.helpingPersonName}</h6>
                    <p style={{ visibility: helper?.helpingPersonDesignation ? "visible" : "hidden" }}>
                      {!helper?.helpingPersonDesignation ? "Hidden" : helper?.helpingPersonDesignation}
                    </p>
                    <a href={`mailto:${helper?.helpingPersonEmail}?subject=Lithium Downstream Summit 2026`}>
                      <img
                        src={emailIcon}
                        alt="Email Icon"
                        height="12"
                        width="18"
                      ></img>
                      {helper?.helpingPersonEmail}
                    </a>
                  </div>
                ))}
              </div>
            </section>
            <SubscribeForm />
          </article>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
