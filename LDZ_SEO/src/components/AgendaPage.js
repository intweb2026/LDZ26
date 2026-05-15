import React, { useState, useEffect } from "react";
import "../../src/assets/css/agenda.css";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import FeaturedSpeaker from "./FeaturedSpeaker";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useApiData } from "../common/ApiContext";
import speakerDummy from "../../src/assets/images/Speaker_photos/Speaker_dummy.jpg";
import companyDummy from "../../src/assets/images/Speaker_photos/companyLogo_dummy.png";
import { usePageSeo } from "../common/usePageSeo";
import "../../src/assets/css/form.css";
const Agenda = () => {
  const navigate = useNavigate();
  const [agendaList, setAgendaList] = useState(null);
  const [blockedDomainError, setBlockedDomainError] = useState(false);
  useEffect(() => {
    callAgendaListApi();
  }, []);
  const callAgendaListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.linq-staging-site.com/admin1/getagenda`,
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

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200);
  const [emailVerification, setEmailVerification] = useState("");
  const [emailVerificationError, setEmailVerificationError] = useState("");
  const [agendaVerification, setAgendaVerification] = useState(false);
  const [isVerify, setIsVerify] = useState(false);

  const [isAgendaEmailMessage, setAgendaEmailMessage] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkOnChangeEmail = async () => {
    if (emailVerification === "") {
      setAgendaEmailMessage(<p className="Agenda_errorMsg__IIG4Q">Email Address is Required</p>)
      setEmailVerificationError(true);
      return;
    } else {
      setAgendaEmailMessage("")
    }
  };

  const emailSubmitBtnClk = async (e) => {
    e.preventDefault();

    if (emailVerification === "") {
      setAgendaEmailMessage(<p className="Agenda_errorMsg__IIG4Q">Email Address is Required</p>)
      setEmailVerificationError(true);
      return;
    }

    setIsVerify(true);

    try {
      const response = await fetch(
        "https://www.linq-staging-site.com/admin1/verifyemaildomain",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailVerification }),
        },
      );

      const data = await response.json();

      // ✅ Save entry in DB regardless of blocked or valid
      await fetch(
        "https://www.linq-staging-site.com/admin1/addagendasubscriber",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscriber: emailVerification }),
        },
      );

      if (!data.status) {
        setIsVerify(false);
        setBlockedDomainError(true);
        setAgendaEmailMessage(<p className="Agenda_errorMsg__IIG4Q">{data.message}</p>)
        setEmailVerificationError(true);
        return;
      }
      setAgendaEmailMessage("")
      setBlockedDomainError(false);
      Cookies.set("agendaEmailVerify", emailVerification, { expires: 200 });
      setAgendaVerification(true);
    } catch (error) {
      setIsVerify(false);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const savedEmail = Cookies.get("agendaEmailVerify");
    if (savedEmail) {
      setAgendaVerification(true);
    }
  }, []);

  const pageSeo = usePageSeo("agenda-page");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDesc = pageSeo.pageMetaDescription
  const seoImage = pageSeo.pageOgImage || null;

  return (
    <>
      {/* <CookieBanner /> */}
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
          href="https://www.linq-staging-site.com/agenda-page"
        />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        {agendaVerification ? (
          navigate("/agenda")
        ) : (
          <div className="Agenda_contain__zWX4U">
            <FeaturedSpeaker title={"highlights from our last show"} />
            <div className="Agenda_container__L3EFb">
              <h2>view the program</h2>
              <p>
                To view the event program, please verify your email address
                below.
              </p>
              <form
                id="LDZ-(View the Program 2026)"
                encType="multipart/form-data"
                method="POST"
                data-hs-cf-bound="true"
                onSubmit={emailSubmitBtnClk}
              >
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={emailVerification}
                    onChange={(e) => {
                      setEmailVerification(e.target.value);
                      if (isAgendaEmailMessage) checkOnChangeEmail();
                      setEmailVerificationError(false);
                      setBlockedDomainError(false);
                    }}
                  ></input>
                  {isAgendaEmailMessage}
                </div>
                <input
                  type="submit"
                  value={isVerify ? "verifying" : "verify"}
                ></input>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Agenda;
