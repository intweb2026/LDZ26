import React, { useState, useEffect, useRef } from "react";
import img from "../../src/assets/images/last.jpg"; // Ensure this path points to your actual image file
import "../../src/assets/css/relatedevent.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
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
  const [relatedEventList, setRelatedEventList] = useState([]);
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

  useEffect(() => {
    // ✅ Only fetch on client side
    if (typeof window !== "undefined") {
      callRelatedEventListApi();
    }
    // eslint-disable-next-line
  }, []);
  const callRelatedEventListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.linq-staging-site.com/admin1/relatedevents`, requestOptions)
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
  return (
    <article className="EventSlider_slider__n4iwF event-slider">
      <h2>related events in the series</h2>
      <div className="EventSlider_sliderContainer__0yNvj sliderContainer">
        <button>
          <img
            src={leftArrowIcon}
            alt="left arrow icon"
            loading="lazy"
            width="20"
            height="20"
            onClick={() => sliderRef.current.slickPrev()}
            style={{ display: lessThen1231 ? "block" : "none" }}
          />
        </button>
        <div>
          <Slider ref={sliderRef} {...settings}>
            {relatedEventList.map((event, index) => (
              <a
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
                          src={event?.eventImage}
                          alt={event?.eventImage}
                          loading="lazy"
                          className={`${
                            hoveredIndex === index
                              ? "EventCard_hidden__YqegG"
                              : ""
                          }`}
                        />
                      )}
                    <img
                      src={event?.eventHoverImage}
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
        <button>
          <img
            src={rightArrowIcon}
            alt="left arrow icon"
            loading="lazy"
            width="20"
            height="20"
            onClick={() => sliderRef.current.slickNext()}
            style={{ display: lessThen1231 ? "block" : "none" }}
          />
        </button>
      </div>
    </article>
  );
};

export default RelatedEventsSection;
