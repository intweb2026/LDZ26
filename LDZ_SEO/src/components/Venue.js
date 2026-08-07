// src/components/Venue.js
// All data comes from SSR window.__INITIAL_DATA__. No client-side fetch.
import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { cleanHtml } from "../utils/cleanHtml";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import LogoCarousel from "./LogoCarousel";
import "./../assets/css/venue.css";
import "yet-another-react-lightbox/styles.css";
import { useSSRData } from "../common/useSSRData";
import { usePageSeo } from "../common/usePageSeo";
import API_BASE_URL, { mediaUrl } from '../config/apiConfig';

// yet-another-react-lightbox ships ESM-only (no CommonJS entry point), which
// crashes Node's require() during SSR — load it via dynamic import() instead,
// which Node resolves natively for ESM packages regardless of module system.
const Lightbox = lazy(() => import("yet-another-react-lightbox"));
const bgImage = "/images/WebImages/venue-main-image.webp";
const locationIcon = "/images/WebCommonImages/location-pin.png";
const phoneIcon = "/images/WebCommonImages/icon-phone.png";
const webIcon = "/images/WebCommonImages/icon-web.png";
// const bgImage =
//   "https://www.middleeast.carbon-capture-conference.com/static/media/venue.577468d061be4cf8216b.webp";
// const locationIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/pin.png";
// const phoneIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-phone.png";
// const webIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-web.png";

const Venue = () => {
  // ✅ SSR data — no client-side API calls
  const ssrVenue = useSSRData("venue");
  const venueData = ssrVenue || [];
  const ssrVenueGallery = useSSRData("venueGallery");
  const venueGalleryData = ssrVenueGallery || [];
  console.log('venueGalleryData: ', venueGalleryData);

  const contactSectionRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Loaded client-side only (see the lazy() import above for why) — the
  // fullscreen button simply won't render until this resolves post-hydration.
  const [FullscreenPlugin, setFullscreenPlugin] = useState(null);
  useEffect(() => {
    import("yet-another-react-lightbox/plugins/fullscreen").then((m) =>
      setFullscreenPlugin(() => m.default),
    );
  }, []);

  const getCleanUrl = (raw) => {
    if (!raw) return "";
    // Directly extract the https?:// URL — ignores all surrounding escape chars and quotes
    const urlMatch = raw.match(/https?:\/\/[^\s"'\\>]*/);
    return urlMatch ? urlMatch[0] : "";
  };

  const getCleanTelLink = (raw) => {
    if (!raw) return "";
    // Directly extract the tel: URI — stops at the closing quote/tag, but
    // (unlike getCleanUrl) allows spaces since phone numbers in the DB
    // contain them, e.g. tel:+6139485 1000
    const telMatch = raw.match(/tel:[^"'\\>]*/i);
    return telMatch ? telMatch[0].trim() : "";
  };

  const venuePlace = venueData[0]?.venueFirstSectionFirstTitle || "";
  const venueDescription =
    venueData[0]?.venueFirstSectionDescription?.replace(/^"(.*)"$/, "$1") || "";
  const venueWebsiteLink = getCleanUrl(venueData[0]?.venueAddressLink);
  const venueWebsiteLinkDisplay =
    venueData[0]?.venueAddressLink
      ?.replace(/<[^>]+>/g, "")
      .replace(/\\"/g, "")
      .replace(/"/g, "")
      .trim() || "";
  const venueLocation =
    venueData[0]?.venueLocation
      ?.replace(/^"(.*)"$/, "$1")
      .replace(/<\/?p>/gi, "") || "";
  const venueContact =
    venueData[0]?.venueContact
      ?.replace(/<[^>]+>/g, "")
      .replace(/\\"/g, "")
      .replace(/"/g, "")
      .trim() || "";
  // Prefer an explicit tel: link embedded in the raw field; some venue
  // records only store the plain number, so fall back to building one from
  // the already-cleaned digits instead of leaving the anchor with no href.
  const venueContactTel =
    getCleanTelLink(venueData[0]?.venueContact) ||
    (venueContact ? `tel:${venueContact.replace(/[^\d+]/g, "")}` : "");
  const venueMapLink = getCleanUrl(venueData[0]?.venueMapLink);
  const venueWebAddress = getCleanUrl(venueData[0]?.venueWebsiteAddress);

  const venueGalleryImg1 = mediaUrl(
    venueGalleryData[0]?.gallerySectionOneBigImage || "",
  );
  console.log('venueGalleryImg1: ', venueGalleryImg1);
  const venueGalleryImg2 = mediaUrl(
    venueGalleryData[0]?.gallerySectionOneSmallImage || "",
  );
  const venueGalleryImg3 = mediaUrl(
    venueGalleryData[0]?.gallerySectionTwoBigImage || "",
  );
  const venueGalleryImg4 = mediaUrl(
    venueGalleryData[0]?.gallerySectionTwoSmallImage || "",
  );
  const venueGalleryImg5 = mediaUrl(
    venueGalleryData[0]?.gallerySectionThreeBigImage || "",
  );
  const venueGalleryImg6 = mediaUrl(
    venueGalleryData[0]?.gallerySectionThreeSmallImage || "",
  );

  const imgArr = [
    venueGalleryImg1,
    venueGalleryImg2,
    venueGalleryImg3,
    venueGalleryImg4,
    venueGalleryImg5,
    venueGalleryImg6,
  ].filter(Boolean);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (!element) return;
      const headerHeight = 120;
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(elementTop - headerHeight, 0),
        behavior: "smooth",
      });
    }, 100);
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    if (contactSectionRef.current) {
      const navbarHeight = 0;
      const elementPosition = contactSectionRef.current.offsetTop;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  const pageSeo = usePageSeo("venue");
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
        <meta property="og:image" content={bgImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <link rel="canonical" href={`${API_BASE_URL}/venue`} />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <article className="Venue_container__Lol8U">
            <div className="DetailsContainer_wholeContainer__385Iv">
              <div className="DetailsContainer_container__JrWjX">
                <div
                  className="DetailsContainer_imageContainer__ncJwH"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "cover",
                  }}
                />
                <div className="DetailsContainer_textVenueContainer__XnUJF">
                  <h1>Venue</h1>
                  <div className="DetailsContainer_innerContent__6NQGR">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(venueDescription),
                      }}
                    />
                  </div>
                  <a className="DetailsContainer_cstom_btn__+cVfU" href="/venue" target="_self" onClick={scrollToContact}>MORE INFORMATION</a>
                </div>
              </div>
            </div>
            <div id="gallery">
              <div className="LightBox_fluid__uvDPj">
                <div className="LightBox_container__pMpod">
                  <div className="LightBox_images__L7242">
                    <h2>Venue Gallery</h2>
                    <div className="LightBox_top__L68+7">
                      <img
                        src={venueGalleryImg1}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(0)}
                      />
                      <img
                        src={venueGalleryImg2}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(1)}
                      />
                    </div>
                    <div className="LightBox_middle__k7r70">
                      <img
                        src={venueGalleryImg3}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(2)}
                      />
                      <img
                        src={venueGalleryImg4}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(3)}
                      />
                    </div>
                    <div className="LightBox_bottom__x1J0A">
                      <img
                        src={venueGalleryImg5}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(4)}
                      />
                      <img
                        src={venueGalleryImg6}
                        alt="Gallery Img"
                        onClick={() => setLightboxIndex(5)}
                      />
                    </div>
                  </div>
                </div>
                <Suspense fallback={null}>
                <Lightbox
                  open={lightboxIndex >= 0}
                  index={lightboxIndex}
                  close={() => setLightboxIndex(-1)}
                  slides={imgArr.map((src) => ({ src }))}
                  plugins={FullscreenPlugin ? [FullscreenPlugin] : []}
                  animation={{ fade: true, swipe: false }}
                  styles={{
                    container: { backgroundColor: "#292929d5" },
                    button: { backgroundColor: "#4d4d4d9a" },
                  }}
                  on={{
                    click: ({ target }) => {
                      if (target.classList.contains("yarl__container"))
                        setLightboxIndex(-1);
                    },
                    view: ({ index }) => setLightboxIndex(index),
                  }}
                  render={{
                    slide: ({ slide, rect }) => (
                      <>
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            padding: "5px 10px",
                            backgroundColor: "rgba(0,0,0,0)",
                            color: "#fff",
                            fontSize: "14px",
                            borderRadius: "4px",
                            zIndex: 1000,
                          }}
                        >
                          {lightboxIndex + 1} / {imgArr.length}
                        </div>
                        <img
                          src={slide.src}
                          style={{
                            maxWidth: rect.width,
                            maxHeight: rect.height,
                            display: "block",
                            margin: "0 auto",
                          }}
                          alt=""
                        />
                      </>
                    ),
                  }}
                />
                </Suspense>
              </div>
            </div>
            <div
              className="Venue_contact__jdZNn"
              ref={contactSectionRef}
              style={{ transition: "margin-top 0.3s ease" }}
            >
              <h2>Contact the venue</h2>
              <div className="Venue_cardsContainer__U8T+R">
                <div>
                  <h5>Location</h5>
                  <p>
                    <img
                      src={locationIcon}
                      alt="location icon"
                      style={{ width: "14px" }}
                    />
                    <a
                      href={venueMapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(venueLocation),
                      }}
                    />
                  </p>
                </div>
                <div>
                  <h5>Contact</h5>
                  <p style={{ marginTop: "auto" }}>
                    <img src={phoneIcon} alt="phone icon" />
                    <a href={venueContactTel}>{venueContact}</a>
                  </p>
                  <p>
                    <img src={webIcon} alt="web icon" />
                    <p style={{ marginLeft: "5px" }}>
                      <p>
                        <a href={getCleanUrl(venueWebsiteLink)}>
                          {venueWebsiteLinkDisplay}
                        </a>
                      </p>
                    </p>
                  </p>
                </div>
              </div>
              <a
                target="_blank"
                href={getCleanUrl(venueMapLink)}
                rel="noopener noreferrer"
              >
                Take me there
              </a>
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

export default Venue;
