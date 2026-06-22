// src/components/FeaturedSpeaker.js
// Data now comes from SSR (window.__INITIAL_DATA__.speakers). No client-side fetch.
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/FeaturedSpeaker.css";
import { useSSRData } from "../common/useSSRData";
import API_BASE_URL, { mediaUrl } from '../config/apiConfig';
const leftArrowIcon = "/images/WebCommonImages/icon-arrow-left.png";
const rightArrowIcon = "/images/WebCommonImages/icon-arrow-right.png";

// const leftArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";
// const rightArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-right.png";

const FeaturedSpeaker = ({ title }) => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const ssrSpeakerList = useSSRData("speakers");
  const [speakerList, setSpeakerList] = useState(ssrSpeakerList || []);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Client-side fallback: fetch speakers when arriving via React Router navigation
  // (window.__INITIAL_DATA__ is not updated on SPA route changes, so SSR data may be empty)
  useEffect(() => {
    if (ssrSpeakerList?.length > 0) return;
    fetch(`${API_BASE_URL}/admin1/eventspeakers`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.status && Array.isArray(data.eventSpeakersList)) {
          setSpeakerList(data.eventSpeakersList);
        }
      })
      .catch(() => {});
  }, [ssrSpeakerList]);

  const slidesToShow = 6;
  const settings = {
    infinite: speakerList.length > slidesToShow,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1620, settings: { slidesToShow: 5, slidesToScroll: 1, infinite: speakerList.length > 5 } },
      { breakpoint: 1230, settings: { slidesToShow: 4, slidesToScroll: 1, infinite: speakerList.length > 4 } },
      { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: speakerList.length > 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: speakerList.length > 2 } },
      { breakpoint: 440, settings: { slidesToShow: 1, slidesToScroll: 1, infinite: speakerList.length > 1 } },
    ],
  };

  const handleClick = (member) => {
    const speakerName = member.eventSpeakerName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/speaker/${speakerName}`, { state: member });
  };

  return (
    <article
      className="SpeakersSection_speakerSection__UNPkB"
      style={{
        backgroundColor: "#f1f1f1ff",
        padding: windowWidth > 940 ? "100px 0px" : "",
        paddingBottom: windowWidth < 940 ? "22px" : "",
      }}
    >
      {/* <h1>{!title ? "MEET OUR FEATURED SPEAKERS" : title}</h1> */}
      <h1>{!title ? "HIGHLIGHTS FROM OUR LAST SHOW" : title}</h1>
      <div className="SpeakersSection_speakersSliderContainer__sW0Qj speaker-slick">
        <button onClick={() => sliderRef.current.slickPrev()}>
          <img src={leftArrowIcon} alt="left arrow icon" loading="lazy" width="20" height="20" />
        </button>
        <div>
          <Slider ref={sliderRef} {...settings}>
            {speakerList?.map((member) => (
              <div
                key={member.id}
                className="SpeakersSection_speakerImageContainer__dwWJ1"
                onClick={() => handleClick(member)}
              >
                <img
                  src={mediaUrl(member.eventSpeakerFeaturedPageImage) || "/placeholder.svg"}
                  alt={member.eventSpeakerName}
                  loading="lazy"
                  width="200"
                  height="200"
                />
                <div className="SpeakersSection_text__FLalV">
                  <p>{member.eventSpeakerName}</p>
                  <p>{member.eventSpeakerCompany}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <button onClick={() => sliderRef.current.slickNext()}>
          <img src={rightArrowIcon} alt="right arrow icon" loading="lazy" width="20" height="20" />
        </button>
      </div>
    </article>
  );
};

export default FeaturedSpeaker;
