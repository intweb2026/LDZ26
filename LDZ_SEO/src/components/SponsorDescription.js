import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import "../assets/css/sponsorDescription.css";
import "../assets/css/form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/popUp.css";
import LogoCarousel from "./LogoCarousel";
import Error404 from "./Error404";
import { useSSRData } from "../common/useSSRData";
import { Helmet } from "react-helmet-async";
import API_BASE_URL from '../config/apiConfig';

const toSlug = (str = "") =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
const SponsorDescription = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { state } = useLocation();
  const [isNotFound, setIsNotFound] = useState(false);

  // ✅ SSR data — pre-fetched by server.js before renderToString
  const ssrSponsorProfile = useSSRData("sponsorProfile");
  const ssrSponsors = useSSRData("sponsors");

  const [sponsorData, setSponsorData] = useState(ssrSponsorProfile || ssrSponsors || []);

  const activeSponsor = sponsorData.find((s) => toSlug(s.sponsorComapnyName) === slug);

  const metaTitle = activeSponsor?.eventSponsorMetaTitle?.trim();
  const metaDesc = activeSponsor?.eventSponsorMetaDescription?.trim();

  const canonicalUrl = slug
    ? `${API_BASE_URL}/sponsor/${slug}`
    : `${API_BASE_URL}/sponsors`;
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    // Skip initial fetch if SSR already resolved this sponsor
    if (ssrSponsorProfile && ssrSponsorProfile.length > 0) return;

    if (!state?.id) {
      // Use SSR sponsors list first, fall back to client fetch
      if (ssrSponsors && ssrSponsors.length > 0) {
        const matched = ssrSponsors.find((s) => toSlug(s.sponsorComapnyName) === slug);
        if (matched) {
          fetchSponsorById(matched.id);
        } else {
          setIsNotFound(true);
        }
      } else {
        fetchSponsorBySlug(slug);
      }
    } else {
      fetchSponsorById(state.id);
    }
  }, [state, slug]);

  const fetchSponsorById = async (sponsorId) => {
    try {
      const formData = new FormData();
      formData.append("sponsorId", sponsorId);

      const response = await fetch(`${API_BASE_URL}/admin1/sponsorbyid`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data?.status && data?.sponsorData?.length > 0) {
        setSponsorData(data.sponsorData);
      } else {
        setIsNotFound(true); // ✅ No data found
      }
    } catch (error) {
      console.error("Error fetching speaker:", error);
      setIsNotFound(true);
    }
  };
  const fetchSponsorBySlug = async (slug) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin1/eventsponsors`
      );
      const data = await response.json();

      if (data?.status && Array.isArray(data?.eventSponsors)) {
        const matchedSponsor = data.eventSponsors.find((sponsor) => {
          const sponsorSlug = sponsor.sponsorComapnyName
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // remove special characters
            .replace(/\s+/g, "-") // replace spaces with hyphens
            .replace(/-+/g, "-");
          return sponsorSlug === slug;
        });

        if (matchedSponsor) {
          fetchSponsorById(matchedSponsor.id);
        } else {
          setIsNotFound(true);
        }
      } else {
        setIsNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching sponsor:", error);
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
      `${API_BASE_URL}/admin1/addquickproposalrequest`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          // toast.success("Record Added Successfully.", {
          //   position: "top-right",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
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
        // toast.error("There was an error, Please try again later.", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      });
  };
  // const submitBtnClk = (e) => {
  //   e.preventDefault();
  //   if (fullName === "") {
  //     setFullNameErr(true);
  //   } else if (companyName === "") {
  //     setCompanyNameErr(true);
  //   } else if (proposedTitle === "") {
  //     setProposedTitleErr(true);
  //   } else if (email === "") {
  //     setEmailErr(true);
  //     setEmailErrMsg("Email is required");
  //   } else if (!validateEmail(email)) {
  //     setEmailErr(true);
  //     setEmailErrMsg("Please enter a valid email address");
  //   } else {
  //     const finalData = new FormData();
  //     finalData.append("requesterName", fullName);
  //     finalData.append("requesterCompanyName", companyName);
  //     finalData.append("proposedTitle", proposedTitle);
  //     finalData.append("requesterEmail", email);
  //     if (message?.length > 0) {
  //       finalData.append("requesterMessage", JSON.stringify(message));
  //     }

  //     const requestOptions = {
  //       method: "POST",
  //       body: finalData,
  //     };
  //     fetch(
  //       `${API_BASE_URL}/admin1/addquickproposalrequest`,
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.status) {
  //           toast.success("Record Added Successfully.", {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //           setFullName("");
  //           setFullNameErr(false);
  //           setCompanyName("");
  //           setCompanyNameErr(false);
  //           setProposedTitle("");
  //           setProposedTitleErr(false);
  //           setEmail("");
  //           setEmailErr(false);
  //           setEmailErrMsg("");
  //           setMessage("");
  //         } else {
  //           toast.error(data?.message);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error: ", error);
  //         toast.error("There was an error, Please try again later.", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       });
  //   }
  // };

  if (isNotFound) {
    return <Error404 />;
  }

  return (
    <>
      {/* ✅ STRICT: Render Helmet ONLY if exact backend data is available */}
      {metaTitle && metaDesc && (
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDesc} />
          <link rel="canonical" href={canonicalUrl} />
          {/* Open Graph */}
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDesc} />
          <meta property="og:type" content="profile" />
          <meta property="og:url" content={canonicalUrl} />
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metaTitle} />
          <meta name="twitter:description" content={metaDesc} />
        </Helmet>
      )}
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        <Navbar forceScrolled />
        <article className="SponsorBio_container__pvxrT">
          <div className="SponsorBio_wholeContainer__r-7Lk">
            <div className="SponsorBio_image__1-WuC">
              <div className="SponsorBio_imageContainer__Utz5Q">
                <h1 style={{ position: "absolute", left: "-3e+06px" }}>
                  {sponsorData[0]?.sponsorComapnyName}
                </h1>
                <a
                  href={sponsorData[0]?.sponsorWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={sponsorData[0]?.sponsorComapnyLogo}
                    alt={sponsorData[0]?.sponsorComapnyName}
                    loading="lazy"
                  ></img>
                </a>
              </div>
            </div>
            <div className="SponsorBio_textContainer__YsXyt">
              <div
                dangerouslySetInnerHTML={{
                  __html: sponsorData[0]?.sponsorComapnyBioDescription
                    ?.replace(/^"(.*)"$/, "$1")
                    ?.replace(/<p>(\s|&nbsp;)*<\/p>/g, ""),
                }}
              ></div>
              <button onClick={() => navigate("/agenda-page")}>view program</button>
            </div>
          </div>
          <div className="Form_container__jwPCR">
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
        <Footer />
      </div>
    </>
  );
};

export default SponsorDescription;
