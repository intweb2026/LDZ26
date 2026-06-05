import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/css/footer.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSSRData } from "./common/useSSRData";
import { useApiData } from "../src/common/ApiContext";
const emailImage =
  "https://www.desalination-resource-recovery.com/images/icons/icon-mail.png";
const linkedInIcon =
  "https://www.desalination-resource-recovery.com/images/icons/icon-linkedin.png";

const Footer = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [relatedEventList, setRelatedEventList] = useState([]);
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");
  const sponsors = useSSRData("sponsors") || [];
  const news = useSSRData("news") || [];
  const speakers = useSSRData("speakers") || [];
  const trends = useSSRData("trends") || [];
  const [footerNavOptions, setFooterNavOptions] = useState([]);
  const { eventDetails, eventGeneralSettings, navLogos } = useApiData();
  const iqHubRef = useRef(null);
  const IQ_HUB_URL = "https://iq-hub.com/";

  useEffect(() => {
    const link = iqHubRef.current;
    if (!link) return;
    const observer = new MutationObserver(() => {
      observer.disconnect();
      link.setAttribute("href", IQ_HUB_URL);
      observer.observe(link, { attributes: true, attributeFilter: ["href"] });
    });
    observer.observe(link, { attributes: true, attributeFilter: ["href"] });
    return () => observer.disconnect();
  }, []);

  const toSlug = (str) => {
    if (!str) return ""; // 🚨 Prevent 'null' stringification
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    callSocialMediaOptionsApi();
    callRelatedEventListApi();
    callFooterOptionsApi();
    // eslint-disable-next-line
  }, []);
  const callSocialMediaOptionsApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.australia.lithium-downstream-summit.com/admin1/footersocialmediaoptions`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          navigate("/logout");
        }
        if (data && data.status) {
          setSocialMediaData(data["footerSocialMediaOptions"]);
        } else {
          toast.error(data?.message);
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

  const callRelatedEventListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/relatedevents`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setRelatedEventList(data["relatedEvents"]);
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

  const callFooterOptionsApi = () => {
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/footeroptions`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          const checked = data.footerOptions.filter(
            (item) => item.isChecked === "Yes",
          );
          setFooterNavOptions(checked);
        } else {
          toast.error(data?.message);
        }
      })
      .catch(() => {
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
    setLinkedin(socialMediaData[0]?.linkedinLink);
    setEmail(socialMediaData[0]?.emailLink);

    // eslint-disable-next-line
  }, [socialMediaData]);

  // Responsive breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const lessThen1023 = windowWidth <= 1023;

  return (
    <footer className="Footer_footer__YOvWG">
      <div className="Footer_Footercontainer__PLGWA">
        <div className="Footer_footerUpperContainer__crT6t">
          <div className="Footer_footerLogo__6mJFB">
            <div className="lazyload-wrapper ">
              <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
                <img
                  src={navLogos?.whiteLogo}
                  alt="LDZ Logo"
                  height={64}
                />
              </a>
            </div>
          </div>
          <div className="Footer_footerNav__ipo0e">
            {Array.from(
              { length: Math.ceil(footerNavOptions.length / 2) },
              (_, colIndex) => {
                const colItems = footerNavOptions.slice(
                  colIndex * 2,
                  colIndex * 2 + 2,
                );

                // On mobile (<= 1023), split paired items into separate divs
                if (lessThen1023 && colItems.length === 2) {
                  return (
                    <React.Fragment key={colIndex}>
                      <div className="Footer_footerNavItem__k2FUW">
                        <a href={colItems[0].footerOptionsPath}>
                          {colItems[0].footerOptionsName}
                        </a>
                      </div>
                      <div className="Footer_footerNavItem__k2FUW">
                        <a href={colItems[1].footerOptionsPath}>
                          {colItems[1].footerOptionsName}
                        </a>
                      </div>
                    </React.Fragment>
                  );
                }

                return (
                  <div className="Footer_footerNavItem__k2FUW" key={colIndex}>
                    {colItems.map((item) => (
                      <a key={item.id} href={item.footerOptionsPath}>
                        {item.footerOptionsName}
                      </a>
                    ))}
                  </div>
                );
              },
            )}
          </div>
        </div>
        <div className="Footer_hr__LZlee"></div>
        <div className="Footer_footerLowerContainer__+0Ffv">
          <div className="Footer_footerIconsContainer__CAONl">
            <a
              target="_blank"
              href={`mailto:${email}?subject=Litihium Downstream Summit 2026`}
            >
              <img
                src={emailImage}
                alt="Email icon"
                width={20}
                height={20}
              ></img>
            </a>
            <a target="blank" href={linkedin}>
              <img
                src={linkedInIcon}
                alt="LinkedIn"
                width={20}
                height={20}
              ></img>
            </a>
          </div>
          <div className="Footer_footerQuickLinksContainer__ToAiG">
            <div className="Footer_footerQuickLinks__dTpfQ undefined">
              <h5>OTHER EVENTS</h5>
              {relatedEventList.map((event, index) => (
                <a
                  target="_blank"
                  href={event?.eventWebsiteLink}
                  style={{ textTransform: "uppercase", pointerEvents: "auto" }}
                >
                  {event?.eventName}
                </a>
              ))}
            </div>
            <div className="Footer_footerQuickLinks__dTpfQ">
              <h5>QUICK LINKS</h5>
              <a href="/booking">Register</a>
              <a href="/who-should-attend">Benefits</a>
              <a href="/remind-me-later">Remind Me</a>
            </div>
            <div className="Footer_footerQuickLinks__dTpfQ">
              <h5>CONTACT US</h5>
              <a href="mailto:delegates@iq-hub.com?subject=Lithium Downstream Summit 2026">
                Email
              </a>
              <a href="/pay-online">Pay Online</a>
              <a href="/terms-and-conditions">Terms and Conditions</a>
            </div>
          </div>
        </div>
        <div className="Footer_hr__LZlee"></div>
        <div className="Footer_footerBottom__ZgyOV">
          <p>
            <a href="/privacy-policy">Privacy Policy</a>
            <span> | </span>
            <a href="/cookie-policy">Cookie Policy</a>
            <span> | </span>
            <a
              ref={iqHubRef}
              href={IQ_HUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => { e.currentTarget.setAttribute("href", IQ_HUB_URL); }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                (window.__originalOpen || window.open)(IQ_HUB_URL, "_blank", "noopener,noreferrer");
              }}
            >
              IQ International PTe. LTD
            </a>
          </p>
          <p>©2026 Lithium Downstream Summit 2026</p>
        </div>
        <div
          style={{
            visibility: "hidden",
            height: 0,
            overflow: "hidden",
            position: "absolute",
          }}
        >
          {/* Universal Hubs */}
          <a href="/news">News Hub</a>
          <a href="/featured-speakers">Featured Speakers Hub</a>
          <a href="/sponsor-packages">Sponsorship Packages Hub</a>
          <a href="/attendees">Attendees Hub</a>
          <a href="/sponsor-booking">Sponsor Booking Hub</a>

          {/* Dynamic Slugs Harvested from SSR Data */}
          {sponsors.filter((s) => s.sponsorType !== "Dummy").map((s, i) => {
            const slug = s.sponsorComapnyName
              ? toSlug(s.sponsorComapnyName)
              : null;
            if (!slug) return null;
            return (
              <a key={`seosp-${i}`} href={`/sponsor/${slug}`}>
                {s.sponsorComapnyName}
              </a>
            );
          })}
          {news.map((n, i) => (
            <a
              key={`seonw-${i}`}
              href={`/news/${toSlug(n.newsTitle)}`}
            >
              {n.newsTitle}
            </a>
          ))}
          {speakers.map((s, i) => (
            <a
              key={`seosk-${i}`}
              href={`/speaker/${(s.eventSpeakerName || "").toLowerCase().replace(/\s+/g, "-")}`}
            >
              {s.eventSpeakerName}
            </a>
          ))}
          {trends.map((t, i) => (
            <a
              key={`seotr-${i}`}
              href={`/trend/${(t.trendTitle || "").toLowerCase().replace(/\s+/g, "-")}`}
            >
              {t.trendTitle}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
