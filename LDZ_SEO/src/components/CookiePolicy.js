import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";
import "../assets/css/CookiePolicy.css";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
// import CookieBanner from "./cookieBanner";

const CookiePolicy = () => {
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

  const pageSeo = usePageSeo("cookie-policy");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDesc = pageSeo.pageMetaDescription;
  const seoImage = pageSeo.pageOgImage || null;
  const canonicalUrl = "https://www.australia.lithium-downstream-summit.com/cookie-policy";

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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        <Navbar forceScrolled />
        <div className="PrivacyPolicy_container__9i2D-">
          <div className="PrivacyPolicy_innerContainer__F1+CV">
            <h1>Cookie Policy</h1>
            <div className="PrivacyPolicy_section__7mnwT">
              <p>
                This Cookie Policy explains how IQ International Pte. Ltd ("IQ
                Hub," "we," "us," or "our") uses cookies and similar tracking
                technologies on our website.
              </p>
            </div>
            <div className="PrivacyPolicy_section__7mnwT">
              <h4>What Are Cookies?</h4>
              <p>
                Cookies are small text files that are stored on your device
                (computer, tablet, or mobile) when you visit a website. They
                help the website remember your actions and preferences over
                time.
              </p>
            </div>
            <div className="PrivacyPolicy_section__7mnwT">
              <h4>Types of Cookies We Use</h4>
              <ul className="PrivacyPolicy_firstUL__lliwo">
                <li>
                  <h5>Essential Cookies</h5>
                  <p>
                    These cookies are necessary for the website to function
                    properly. They enable basic features like page navigation
                    and access to secure areas. The website cannot function
                    properly without these cookies.
                  </p>
                </li>
                <li>
                  <h5>Analytics Cookies</h5>
                  <p>
                    These cookies help us understand how visitors interact with
                    our website by collecting and reporting information
                    anonymously. This helps us improve the website's performance
                    and user experience.
                  </p>
                </li>
                <li>
                  <h5>Functional Cookies</h5>
                  <p>
                    These cookies allow the website to remember choices you make
                    (such as your language preference) and provide enhanced,
                    personalized features.
                  </p>
                </li>
                <li>
                  <h5>Marketing Cookies</h5>
                  <p>
                    These cookies are used to track visitors across websites.
                    They are used to display ads that are relevant and engaging
                    for the individual user.
                  </p>
                </li>
              </ul>
            </div>
            <div className="PrivacyPolicy_section__7mnwT">
              <h4>Managing Your Cookie Preferences</h4>
              <p>
                Most web browsers allow you to control cookies through their
                settings. You can:
              </p>
              <ul>
                <li>Delete all cookies from your browser</li>
                <li>Block all cookies from being set</li>
                <li>Allow only certain cookies</li>
                <li>
                  Set your browser to notify you when a cookie is being set
                </li>
              </ul>
              <p>
                Please note that blocking certain cookies may impact your
                experience on our website.
              </p>
            </div>
            <div className="PrivacyPolicy_section__7mnwT">
              <h4>Your Consent</h4>
              <p>
                By continuing to use our website, you consent to our use of
                cookies as described in this policy. You can withdraw your
                consent at any time by adjusting your browser settings.
              </p>
            </div>
            <div className="PrivacyPolicy_section__7mnwT">
              <h4>Third-Party Cookies</h4>
              <p>
                Some cookies on our site are set by third-party services that
                appear on our pages. We do not control the dissemination of
                these cookies.
              </p>
            </div>
            <div className="PrivacyPolicy_section__7mnwT">
              <h4>Changes to This Policy</h4>
              <p>
                We may update this Cookie Policy from time to time. Any changes
                will be posted on this page.
              </p>
            </div>
            <div className="PrivacyPolicy_section__7mnwT">
              <h4>Contact Us</h4>
              <i>
                <p>
                  If you have questions about our use of cookies, please contact
                  us at <a href="mailto:info@iq-hub.com">info@iq-hub.com</a>.
                </p>
                <p>
                  IQ International Pte. Ltd
                  <br />
                  8 Marina View, #07-04 Asia Square Tower 1
                  <br />
                  Singapore 018960
                </p>
              </i>
            </div>
            <div className="PrivacyPolicy_section__7mnwT">
              <i>
                <p>This Privacy Policy was last updated on 01/02/2026</p>
              </i>
            </div>
            <div className="PrivacyPolicy_section__7mnwT"></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default CookiePolicy;
