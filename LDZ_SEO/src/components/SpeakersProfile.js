import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../../src/assets/css/speakerProfile.css";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import LogoCarousel from "./LogoCarousel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error404 from "./Error404";
import { Helmet } from "react-helmet-async";
import { useSSRData } from "../common/useSSRData";
import "../../src/assets/css/form.css";
const SpeakerProfile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // ✅ SSR data — pre-fetched by server.js before renderToString
  const ssrSpeakerProfile = useSSRData("speakerProfile");
  const ssrSpeakers = useSSRData("speakers");

  const [speakerData, setSpeakerData] = useState(ssrSpeakerProfile || []);
  const [isNotFound, setIsNotFound] = useState(false);

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

  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");
  const [companyErrorMessage, setCompanyNameErrorMessage] = useState("");
  const [proposedTitleErrorMessage, setProposedTitleErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Reset for every navigation so stale data never shows
    setSpeakerData([]);
    setIsNotFound(false);

    // Client-side navigation always has state.id — use it directly
    if (state?.id) {
      fetchSpeakerById(state.id);
      return;
    }

    // Direct URL / refresh: trust SSR data only if it matches the current slug
    if (ssrSpeakerProfile && ssrSpeakerProfile.length > 0) {
      const ssrSlug = ssrSpeakerProfile[0]?.eventSpeakerName
        ?.toLowerCase()
        .replace(/\s+/g, "-");
      if (ssrSlug === slug) {
        setSpeakerData(ssrSpeakerProfile);
        return;
      }
    }

    // Fallback: resolve from SSR speakers list or full fetch
    if (ssrSpeakers && ssrSpeakers.length > 0) {
      const matched = ssrSpeakers.find(
        (s) => s.eventSpeakerName?.toLowerCase().replace(/\s+/g, "-") === slug
      );
      if (matched) {
        fetchSpeakerById(matched.id);
      } else {
        setIsNotFound(true);
      }
    } else {
      fetchSpeakerBySlug(slug);
    }
  }, [state, slug]);

  const fetchSpeakerById = async (speakerId) => {
    try {
      const formData = new FormData();
      formData.append("speakerId", speakerId);

      const response = await fetch(
        `https://www.australia.lithium-downstream-summit.com/admin1/speakerbyid`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data?.status && data?.speakerData?.length > 0) {
        setSpeakerData(data.speakerData);
      } else {
        setIsNotFound(true); // ✅ No data found
      }
    } catch (error) {
      console.error("Error fetching speaker:", error);
      setIsNotFound(true);
    }
  };

  const fetchSpeakerBySlug = async (slug) => {
    try {
      const response = await fetch(
        `https://www.australia.lithium-downstream-summit.com/admin1/eventspeakers`
      );
      const data = await response.json();

      if (data?.status && Array.isArray(data?.eventSpeakersList)) {
        const matchedSpeaker = data.eventSpeakersList.find((speaker) => {
          const speakerSlug = speaker.eventSpeakerName
            ?.toLowerCase()
            ?.replace(/\s+/g, "-");
          return speakerSlug === slug;
        });

        if (matchedSpeaker) {
          fetchSpeakerById(matchedSpeaker.id);
        } else {
          setIsNotFound(true);
        }
      } else {
        setIsNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching speakers:", error);
      setIsNotFound(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isNotFound) {
    return <Error404 />;
  }

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

  const submitBtnClk = (e) => {
    e.preventDefault();

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

    setSuccessMessage(<p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>Submitted Successfully</p>)
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);

    const finalData = new FormData();
    finalData.append("requesterName", fullName);
    finalData.append("requesterCompanyName", companyName);
    finalData.append("proposedTitle", proposedTitle);
    finalData.append("requesterEmail", email);
    if (message?.length > 0) {
      finalData.append("requesterMessage", JSON.stringify(message));
    }

    const requestOptions = {
      method: "POST",
      body: finalData,
    };
    fetch(
      "https://www.australia.lithium-downstream-summit.com/admin1/addquickproposalrequest",
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
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
        } else {
          // toast.error(data?.message);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const speaker = speakerData[0];

  // ✅ STRICT: derive SEO fields ONLY from backend data — no fallbacks
  const seoTitle = speaker?.eventSpeakerMetaTitle;
  const seoDesc = speaker?.eventSpeakerMetaDescription;
  const canonicalUrl = slug
    ? `https://www.australia.lithium-downstream-summit.com/speaker/${slug}`
    : "https://www.australia.lithium-downstream-summit.com/featured-speakers";

  return (
    <>
      {seoTitle && (
        <Helmet>
          <title>{seoTitle}</title>
          {seoDesc && <meta name="description" content={seoDesc} />}
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:title" content={seoTitle} />
          {seoDesc && <meta property="og:description" content={seoDesc} />}
          <meta property="og:type" content="profile" />
          <meta property="og:url" content={canonicalUrl} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          {seoDesc && <meta name="twitter:description" content={seoDesc} />}
        </Helmet>
      )}
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <article className="SpeakerBio_container__4uadj">
            <div className="DetailsContainer_wholeContainer__385Iv">
              <div className="DetailsContainer_container__JrWjX">
                <div
                  className="DetailsContainer_imageContainer__ncJwH"
                  style={{
                    backgroundImage: `url(${speakerData[0]?.eventSpeakerProfilePageImage})`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <div className="DetailsContainer_textContainer__D8Ukb">
                  <h2>Speaker's profile</h2>
                  <div className="DetailsContainer_innerContent__6NQGR">
                    <div>
                      <h1 className="speaker-h1-name">
                        {speakerData[0]?.eventSpeakerName}
                      </h1>
                      <span style={{ fontSize: "20px", fontWeight: 600 }}>
                        {speakerData[0]?.eventSpeakerCompany}
                      </span>
                      <h3 style={{ fontSize: "23px", margin: "40px 0 32px" }}>
                        <span>BIOGRAPHY</span>
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: speakerData[0]?.eventSpeakerDescription
                            ?.replace(/^"(.*)"$/, "$1")
                            ?.replace(/<p>(\s|&nbsp;)*<\/p>/g, ""),
                        }}
                      ></div>
                    </div>
                  </div>
                  <a className="DetailsContainer_cstom_btn__+cVfU" href="/agenda-page" target="_self">
                    view program
                  </a>
                </div>
              </div>
            </div>
            <div className="Form_container__jwPCR">
              <div>
                <div>
                  <h2>BECOME A SPEAKER & JOIN THE CONVERSATION</h2>
                  <form
                    id="LDZ-(become a speaker & join the conversation 2026)"
                    method="POST"
                    data-hs-cf-bound="true"
                    onSubmit={submitBtnClk}
                  >
                    <div className="LDZ_2026_quick_proposal Form_form__nhNBc form_LDZ">
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
                      <button type="submit">get back to me</button>
                    </div>
                  </form>
                  {successMessage}
                </div>
              </div>
            </div>
            <LogoCarousel />
            <SubscribeForm />
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpeakerProfile;
