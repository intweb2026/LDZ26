// src/components/LogoCarousel.js
// Data now comes from SSR (window.__INITIAL_DATA__.logoCarousel). No client-side fetch.
import React, { useRef } from "react";
import { mediaUrl } from '../config/apiConfig';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../src/assets/css/logoslider.css";
import { useSSRData } from "../common/useSSRData";
const leftArrowIcon = "/images/WebCommonImages/icon-arrow-left.png";
const rightArrowIcon = "/images/WebCommonImages/icon-arrow-right.png";

// const leftArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";
// const rightArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-right.png";

const LogoCarousel = () => {
  const sliderRef = useRef(null);
  // ✅ SSR data — no useEffect fetch
  const ssrLogoCarousel = useSSRData("logoCarousel");
  const logoList = ssrLogoCarousel || [];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1180, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 799, settings: { slidesToShow: 3 } },
      { breakpoint: 599, settings: { slidesToShow: 2 } },
      { breakpoint: 420, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="LogoSlider_container__KG1H5">
      <div className="LogoSlider_innerContainer__Z+wZ7 logo-slider">
        <button
          aria-label="Move slider to left"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <img src={leftArrowIcon} alt="left arrow icon" loading="lazy" width="20" height="20" />
        </button>
        <div>
          <Slider ref={sliderRef} {...settings}>
            {logoList?.map((logo, index) => (
              <img
                key={index}
                src={mediaUrl(logo?.logoLink)}
                alt="Sponsor's Logo"
                loading="lazy"
                width="200"
                height="90"
                style={{ width: "100%", display: "inline-block" }}
              />
            ))}
          </Slider>
        </div>
        <button
          aria-label="Move slider to right"
          onClick={() => sliderRef.current.slickNext()}
        >
          <img src={rightArrowIcon} alt="right arrow icon" loading="lazy" width="20" height="20" />
        </button>
      </div>
    </div>
  );
};

export default LogoCarousel;
