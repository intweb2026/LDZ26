// src/components/HomeSpeakerSlider.js
// Data now comes from SSR (window.__INITIAL_DATA__.speakers). No client-side fetch.
import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../src/assets/css/homeSpeakerSlider.css";
import { useNavigate } from "react-router-dom";
import { useSSRData } from "../common/useSSRData";
import plusIcon from '../assets/WebCommonImages/plus-white.png'
import closeIcon from '../assets/WebCommonImages/close-slider.png'
import arrowRed from '../assets/WebCommonImages/arrow-red.png'

// const plusIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/plus-white.png";
// const closeIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/close-slider.png";
// const arrowRed =
//   "https://www.desalination-resource-recovery.com/images/icons/arrow-red.png";

const HomeSpeakerSlider = () => {
  const navigate = useNavigate();
  // ✅ SSR data — no useEffect fetch
  const ssrSpeakerList = useSSRData("speakers");
  const speakerList = ssrSpeakerList || [];
  const [activeOverlayIndex, setActiveOverlayIndex] = useState(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    if (slider1.current && slider2.current) {
      setNav1(slider1.current);
      setNav2(slider2.current);
    }
  }, []);

  const sliderMagnify = {
    asNavFor: nav2,
    ref: slider1,
    slidesToShow: 1,
    arrows: false,
    className: "magnify-slider",
  };

  const settings = {
    asNavFor: nav1,
    ref: slider2,
    slidesToShow: 5,
    swipeToSlide: false,
    draggable: false,
    focusOnSelect: true,
    centerMode: true,
    arrows: false,
    className: "thumbnail-slider",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5, centerMode: true } },
      { breakpoint: 1024, settings: { slidesToShow: 3, centerMode: true } },
      { breakpoint: 768, settings: { slidesToShow: 3, centerMode: true } },
      { breakpoint: 600, settings: { slidesToShow: 3, centerMode: true } },
      { breakpoint: 400, settings: { slidesToShow: 3, centerMode: true } },
    ],
  };

  const handleClick = (member) => {
    const speakerName = member.eventSpeakerName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/speaker/${speakerName}`, { state: member });
  };

  return (
    <div
      className="container speakerSliderContainer"
      style={{ backgroundColor: "var(--secondary-color)" }}
    >
      <div className="head">
        {/* HIGHLIGHTS FROM OUR LAST SHOW */}
        <h2 style={{ color: "var(--primary-color)" }}>
          highlights
          <span style={{ color: "var(--primary-color)" }}>from our last show</span>
        </h2>
        {/* MEET OUR FEATURED SPEAKERS */}
        {/* <h2 style={{ color: "var(--primary-color)" }}>
          MEET OUR
          <span style={{ color: "var(--primary-color)" }}>FEATURED SPEAKERS</span>
        </h2> */}
        <button
          style={{ color: "var(--primary-color)" }}
          onClick={() => navigate("/featured-speakers")}
        >
          show all speakers
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.2071 8.70711C23.5976 8.31658 23.5976 7.68342 23.2071 7.29289L16.8431 0.928932C16.4526 0.538408 15.8195 0.538408 15.4289 0.928932C15.0384 1.31946 15.0384 1.95262 15.4289 2.34315L21.0858 8L15.4289 13.6569C15.0384 14.0474 15.0384 14.6805 15.4289 15.0711C15.8195 15.4616 16.4526 15.4616 16.8431 15.0711L23.2071 8.70711ZM0 9H22.5V7H0V9Z" style={{ fill: "var(--primary-color)" }} />
          </svg>
        </button>
      </div>
      <div className="inner-container">
        <div className="magnify">
          <Slider {...sliderMagnify}>
            {speakerList.map((speaker, index) => (
              <div key={index} className="magnify-slide with-gradient">
                <img src={speaker.eventSpeakerHomePageImage} alt={speaker.eventSpeakerName} loading="lazy" />
                <div className="speaker-details">
                  <div>
                    <p className="fadeText">{speaker.eventSpeakerName}</p>
                    <p className="fadeAndSlide">{speaker.eventSpeakerCompany}</p>
                  </div>
                  <button onClick={() => setActiveOverlayIndex(index)}>
                    <img className="plus-icon" src={plusIcon} alt="plus-icon" height="20" />
                  </button>
                </div>
                <section className={`maginify-overlay ${activeOverlayIndex === index ? "revealed" : ""}`}>
                  <div className="overlay-details-container">
                    <div className="image-container" onClick={() => setActiveOverlayIndex(null)} style={{ cursor: "pointer" }}>
                      <img src={closeIcon} alt="close-icon" />
                    </div>
                    <h3>{speaker.eventSpeakerName}</h3>
                    <h4>{speaker.eventSpeakerCompany}</h4>
                    <div
                      className="dangerous_text_b"
                      dangerouslySetInnerHTML={{
                        __html: speaker.eventSpeakerShortDescription?.replace(/^"(.*)"$/, "$1"),
                      }}
                    />
                  </div>
                  <div className="overlay-button-container">
                    <button onClick={() => handleClick(speaker)}>
                      view speaker's profile
                      <img src={arrowRed} alt="arrow-red-icon" />
                    </button>
                  </div>
                </section>
              </div>
            ))}
          </Slider>
        </div>
        <div className="slider">
          <Slider {...settings}>
            {speakerList.map((speaker, index) => (
              <div key={index} className="slide-box with-gradient" onClick={() => setActiveOverlayIndex(null)}>
                <img src={speaker.eventSpeakerHomePageImage} alt={speaker.eventSpeakerName} loading="lazy" />
                <div>
                  <p>{speaker.eventSpeakerName}</p>
                  <p>{speaker.eventSpeakerCompany}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomeSpeakerSlider;
