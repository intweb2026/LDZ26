import React, { useState, useEffect, useRef } from "react";
import img from "../../src/assets/images/last.jpg"; // Ensure this path points to your actual image file
import "../../src/assets/css/relatedevent.css";
import Slider from "react-slick";
import { mediaUrl } from '../config/apiConfig';
import { useSSRData } from "../common/useSSRData";
const leftArrowIcon = "/images/WebCommonImages/icon-arrow-left.png";
const rightArrowIcon = "/images/WebCommonImages/icon-arrow-right.png";
const calenderIcon = "/images/WebCommonImages/icon-calendar.png";
const locationIcon = "/images/WebCommonImages/icon-location.png";

// const leftArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";
// const rightArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-right.png";
// const calenderIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-calendar.png";
// const locationIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-location.png";

const RelatedEventsSection = () => {
  // ✅ SSR data — no client-side API call
  const ssrRelatedEvents = useSSRData("relatedEvents");
  const relatedEventList = ssrRelatedEvents || [];
  const [hoveredIndex, setIsHovered] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920,
  );
  const sliderRef = useRef(null);

  useEffect(() => {
    // ✅ Set correct width on client mount
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const lessThen1231 = windowWidth < 1231;

  const settings = {
    dots: false,
    arrows: false,
    infinite: relatedEventList.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1231,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: relatedEventList.length > 2,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: relatedEventList.length > 1,
        },
      },
    ],
  };

  return (
    <article className="EventSlider_slider__n4iwF event-slider">
      <h2>related events in the series</h2>
      <div className="EventSlider_sliderContainer__0yNvj sliderContainer">
        <button
          aria-label="Previous slide"
          onClick={() => sliderRef.current.slickPrev()}
          style={{ display: lessThen1231 ? "block" : "none" }}
        >
          <img
            src={leftArrowIcon}
            alt=""
            loading="lazy"
            width="20"
            height="20"
          />
        </button>
        <div>
          <Slider ref={sliderRef} {...settings}>
            {relatedEventList.map((event, index) => (
              <a
                key={event?.id ?? index}
                target="_blank"
                href={event?.eventWebsiteLink}
                style={{ pointerEvents: "auto" }}
              >
                <div className="EventCard_cardContainer__DQO+b">
                  <div
                    className="EventCard_cardImage__TLxwS"
                    onMouseEnter={() =>
                      event?.eventImage && event?.eventImage !== ""
                        ? setIsHovered(index)
                        : null
                    }
                    onMouseLeave={() =>
                      event?.eventImage && event?.eventImage !== ""
                        ? setIsHovered(null)
                        : null
                    }
                  >
                    {event?.eventImage &&
                      event?.eventImage !== "" &&
                      event?.eventImage !== "null" &&
                      event?.eventImage !== null && (
                        <img
                          src={mediaUrl(event?.eventImage)}
                          alt={event?.eventName}
                          loading="lazy"
                          className={`${
                            hoveredIndex === index
                              ? "EventCard_hidden__YqegG"
                              : ""
                          }`}
                        />
                      )}
                    <img
                      src={mediaUrl(event?.eventHoverImage)}
                      alt={event?.eventName}
                      loading="lazy"
                      className={`${
                        hoveredIndex === index &&
                        event?.eventImage &&
                        event?.eventImage !== ""
                          ? "EventCard_visible__BLL1D"
                          : ""
                      }`}
                    />
                    <h3>
                      <span>{event?.eventName}</span>
                    </h3>
                  </div>

                  <div className="EventCard_cardDetails__GSHK5">
                    <div>
                      <img
                        src={calenderIcon}
                        alt="calender icon"
                        height={18}
                        width={14}
                        loading="lazy"
                      ></img>
                      <p>{event?.eventDate}</p>
                    </div>
                    <div>
                      <img
                        src={locationIcon}
                        alt="location icon"
                        height={18}
                        width={14}
                        loading="lazy"
                      ></img>
                      <p>{event?.eventLocation}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </Slider>
        </div>
        <button
          aria-label="Next slide"
          onClick={() => sliderRef.current.slickNext()}
          style={{ display: lessThen1231 ? "block" : "none" }}
        >
          <img
            src={rightArrowIcon}
            alt=""
            loading="lazy"
            width="20"
            height="20"
          />
        </button>
      </div>
    </article>
  );
};

export default RelatedEventsSection;
