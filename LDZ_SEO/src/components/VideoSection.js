import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../../src/assets/css/video.css";
import { useApiData } from "../../src/common/ApiContext";
import arrowIcon from '../assets/WebCommonImages/up-arrow-white.png'

// const arrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/up-arrow.png";

const VideoSection = () => {
  const isClient = typeof window !== "undefined";

  // Use full page navigation so each page gets its own SSR data from the server.
  // React Router's navigate() does client-side SPA routing which skips the server,
  // leaving window.__INITIAL_DATA__ stale with the home page payload.
  const goTo = (path) => {
    if (isClient && path) {
      window.location.href = path;
    }
  };

  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();

  const [arrowSrc, setArrowSrc] = useState('');

  useEffect(() => {
    setArrowSrc(arrowIcon?.default || arrowIcon || '');
  }, []);

  return (
    <>
      {homeVideoSettings?.eventDetailBackImage && (
        <Helmet>
          <link
            rel="preload"
            as="image"
            href={homeVideoSettings.eventDetailBackImage}
            fetchpriority="high"
          />
        </Helmet>
      )}
      <div className="home-banner-container custom-style-header">
        <div className="videoContainer">
          <div>
            <div className="overlay"></div>
            {homeVideoSettings?.videoLinkwebm && (
              <video
                className="video"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={homeVideoSettings.videoReplaceImage}
              >
                <source
                  src={homeVideoSettings.videoLinkwebm}
                  type="video/webm"
                />
                <source
                  src={homeVideoSettings.videoLinkmp4}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        <div className="innerContainer custom-style-header-innerContainer">
          <div className="upper custom-style-header-upper">
            <div className="graphic custom-style-header-graphic">
              <div
                className="text custom-style-header-text"
                style={{
                  "--header-image": `url(${homeVideoSettings?.eventDetailBackImage})`,
                }}
              >
                <div>
                  {/* Annual code */}
                  {/* <span>
                    4
                    <sup>th</sup>
                    Annual
                  </span> */}
                  <h1 dangerouslySetInnerHTML={{
                    __html: themeSettings?.headerContent
                  }}>
                  </h1>
                </div>
                <p className="HeaderTextLg">
                  {eventDetails?.eventDate} | {eventDetails?.eventLocation}
                </p>
                <p className="HeaderTextSm">
                  {eventDetails?.eventDate}
                  <br />
                  {eventDetails?.eventLocation}
                </p>
              </div>
            </div>
          </div>

          <div className="lower">
            <div className="lowerContainer">
              <div className="buttonContainer">
                <div className="button" onClick={() => goTo("/agenda-page")}>
                  <h4>
                    view program
                    {arrowSrc && <img
                      src={arrowSrc}
                      alt="arrow icon"
                      width={15}
                      loading="lazy"
                    />}
                  </h4>
                  <p>Discover the highlights of the event</p>
                </div>

                <div className="button" onClick={() => goTo("/contact-us")}>
                  <h4>
                    connect with us
                    {arrowSrc && <img
                      src={arrowSrc}
                      alt="arrow icon"
                      width={15}
                      loading="lazy"
                    />}
                  </h4>
                  <p>Get your questions answered by our team</p>
                </div>

                <div className="button" onClick={() => goTo("/sponsors")}>
                  <h4>
                    become a partner
                    {arrowSrc && <img
                      src={arrowSrc}
                      alt="arrow icon"
                      width={15}
                      loading="lazy"
                    />}
                  </h4>
                  <p>Join as a sponsor and reserve your booth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoSection;