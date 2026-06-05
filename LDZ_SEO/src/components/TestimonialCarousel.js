import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../assets/css/TestimonialCarousel.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const testimonialImg1 = "/images/WebImages/testimonial-top-1.webp";
const testimonialImg2 = "/images/WebImages/testimonial-top-2.webp";
const testimonialImg3 = "/images/WebImages/testimonial-center-left-1.webp";
const testimonialImg4 = "/images/WebImages/testimonial-center-left-2.webp";
const testimonialImg5 = "/images/WebImages/testimonial-center-right-1.webp";
const testimonialImg6 = "/images/WebImages/testimonial-center-right-2.webp";
const testimonialImg7 = "/images/WebImages/testimonial-bottom-1.webp";
const testimonialImg8 = "/images/WebImages/testimonial-bottom-2.webp";
const quotationIcon = "/images/WebCommonImages/icon-quotation.png";

// const testimonialImg1 = "https://www.desalination-resource-recovery.com/static/media/top%201.ddc129db141f72b2086a.webp"
// const testimonialImg2 = "https://www.desalination-resource-recovery.com/static/media/top%202.3c8b10699a330d7a8730.webp"
// const testimonialImg3 = "https://www.desalination-resource-recovery.com/static/media/left%201.8afe8718c2500c380549.webp"
// const testimonialImg4 = "https://www.desalination-resource-recovery.com/static/media/left%202.3622f016046c8ff0d1c9.webp"
// const testimonialImg5 = "https://www.desalination-resource-recovery.com/static/media/right%201.165e3883648ae7b74b04.webp"
// const testimonialImg6 = "https://www.desalination-resource-recovery.com/static/media/right%202.68a2aee52bdcc0ff756d.webp"
// const testimonialImg7 = "https://www.desalination-resource-recovery.com/static/media/bottom%201.9c16202608d4bb1e7e5e.webp"
// const testimonialImg8 = "https://www.desalination-resource-recovery.com/static/media/bottom%202.7b5edc035d7d1802b922.webp"
// const quotationIcon = "https://www.desalination-resource-recovery.com/images/icons/icon-quotation.png"

export default function TestimonialCarousel() {
  // const testimonialImage = [
  //   Testimonials3,
  //   Testimonials4,
  //   Testimonials5,
  //   Testimonials6,
  // ];
  const [testimonialList, setTestimonialList] = useState([]);

  useEffect(() => {
    callTestimonialListApi();
    // eslint-disable-next-line
  }, []);

  const callTestimonialListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/eventtestimonials`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setTestimonialList(data["eventTestimonials"]);
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

  // const allowedRow1and3Indexes = [0, 3];
  // const allowedRow2Indexes = [1, 2];

  // const [index13, setIndex13] = useState(0);
  // const [row2Left, setRow2Left] = useState(0);
  // const [row2Right, setRow2Right] = useState(1);

  const [row1and3, setRow1and3] = useState(0);
  const [row2, setRow2] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRow1and3((prev) => (prev === 0 ? 1 : 0));
    }, 10000);

    return () => clearTimeout(timeout);
  }, [row1and3]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRow2((prev) => (prev === 0 ? 1 : 0));
    }, 13000);

    return () => clearTimeout(timeout);
  }, [row2]);


  // useEffect(() => {
  //   // Row 1 and 3 update every 5s
  //   const interval13 = setInterval(() => {
  //     setIndex13((prev) => (prev + 1) % allowedRow1and3Indexes.length);
  //   }, 5000);

  //   // Row 2 starts after 5s, then updates every 8s
  //   const timeout2 = setTimeout(() => {
  //     const updateRow2 = () => {
  //       let left = Math.floor(Math.random() * allowedRow2Indexes.length);
  //       let right;
  //       do {
  //         right = Math.floor(Math.random() * allowedRow2Indexes.length);
  //       } while (right === left); // Ensure different images

  //       setRow2Left(left);
  //       setRow2Right(right);
  //     };

  //     updateRow2(); // Initial update at 5s

  //     const interval2 = setInterval(updateRow2, 8000); // Every 8s after that

  //     // Cleanup interval2 only
  //     const cleanup = () => clearInterval(interval2);
  //     window.addEventListener("beforeunload", cleanup);
  //     return cleanup;
  //   }, 5000);

  //   // Cleanup both timers
  //   return () => {
  //     clearInterval(interval13);
  //     clearTimeout(timeout2);
  //   };
  // }, []);

  // const row1Index = allowedRow1and3Indexes[index13];
  // const row3Index =
  //   allowedRow1and3Indexes[(index13 + 1) % allowedRow1and3Indexes.length];

  // const row1 = testimonialList[row1Index];
  // const row3 = testimonialList[row3Index];
  // const row2 = testimonialList[allowedRow2Indexes[row2Left]];

  // const row1Image = testimonialImage[row1Index];
  // const row2ImageLeft = testimonialImage[allowedRow2Indexes[row2Left]];
  // const row2ImageRight = testimonialImage[allowedRow2Indexes[row2Right]];
  // const row3Image = testimonialImage[row3Index];
  // if (testimonialList.length < 4) {
  //   return null; // or show loading UI
  // }

  const testimonialContentRow1 = [testimonialList[0], testimonialList[1]]
  const testimonialContentRow2 = [testimonialList[2], testimonialList[3]]
  const testimonialContentRow3 = [testimonialList[4], testimonialList[5]]

  const settings1 = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear"
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 8000,
    cssEase: "linear"
  };

  const settings3 = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 10000,
    cssEase: "linear"
  };

  return (
    <div>
      <div className="Testimonials_testimonialSection__WG+KU testimonialSliderContainer">
        <h2>they've attended our events</h2>
        <div className="Testimonials_testimonialContainer__qvI9B">
          <div className="Testimonials_grid__DLBzf">
            <div className="Testimonials_Firstrow__Lj6V3">
              <div className="Testimonials_column__LabYB undefined image-container-top">
                <picture>
                  <source srcSet={testimonialImg1}></source>
                  <img className={`image ${row1and3 === 0 ? "active" : ""}`} src={testimonialImg1} alt="img1" height={265} loading="lezy"></img>
                </picture>
                <picture>
                  <source srcSet={testimonialImg2}></source>
                  <img className={`image ${row1and3 === 1 ? "active" : ""}`} src={testimonialImg2} alt="img2" height={265} loading="lezy"></img>
                </picture>
              </div>
              <div className="Testimonials_column__LabYB undefined ">
                <div className="slider-card" style={{ borderTopRightRadius: "2px" }}>
                  <Slider {...settings1}>
                    {testimonialContentRow1.map((testimonialItem) => (
                      <div className="slide">
                        <img src={quotationIcon} alt="Quotation icon"></img>
                        <p>{testimonialItem?.personMessage}</p>
                        <h5>{testimonialItem?.personName}</h5>
                        <h5 style={{ color: "var(--primary-color)" }}>{testimonialItem?.personCompany}</h5>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
            <div className="Testimonials_Midrow__po-vV">
              <div className="Testimonials_column__LabYB undefined image-container-top">
                <picture>
                  <source srcSet={testimonialImg3}></source>
                  <img className={`image ${row2 === 0 ? "active" : ""}`} src={testimonialImg3} alt="img3" height={265} loading="lezy"></img>
                </picture>
                <picture>
                  <source srcSet={testimonialImg4}></source>
                  <img className={`image ${row2 === 1 ? "active" : ""}`} src={testimonialImg4} alt="img4" height={265} loading="lezy"></img>
                </picture>
              </div>
              <div className="Testimonials_column__LabYB undefined ">
                <div className="slider-card" style={{ borderTopRightRadius: "2px" }}>
                  <Slider {...settings2}>
                    {testimonialContentRow2.map((testimonialItem) => (
                      <div className="slide">
                        <img src={quotationIcon} alt="Quotation icon"></img>
                        <p>{testimonialItem?.personMessage}</p>
                        <h5>{testimonialItem?.personName}</h5>
                        <h5 style={{ color: "var(--primary-color)" }}>{testimonialItem?.personCompany}</h5>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="Testimonials_column__LabYB undefined image-container-top">
                <picture>
                  <source srcSet={testimonialImg5}></source>
                  <img className={`image ${row2 === 0 ? "active" : ""}`} src={testimonialImg5} alt="img5" height={265} loading="lezy"></img>
                </picture>
                <picture>
                  <source srcSet={testimonialImg6}></source>
                  <img className={`image ${row2 === 1 ? "active" : ""}`} src={testimonialImg6} alt="img6" height={265} loading="lezy"></img>
                </picture>
              </div>
            </div>
            <div className="Testimonials_Lastrow__x-bQb">
              <div className="Testimonials_column__LabYB undefined ">
                <div className="slider-card" style={{ borderTopRightRadius: "2px" }}>
                  <Slider {...settings3}>
                    {testimonialContentRow3.map((testimonialItem) => (
                      <div className="slide">
                        <img src={quotationIcon} alt="Quotation icon"></img>
                        <p>{testimonialItem?.personMessage}</p>
                        <h5>{testimonialItem?.personName}</h5>
                        <h5 style={{ color: "var(--primary-color)" }}>{testimonialItem?.personCompany}</h5>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="Testimonials_column__LabYB undefined image-container-top">
                <picture>
                  <source srcSet={testimonialImg7}></source>
                  <img className={`image ${row1and3 === 0 ? "active" : ""}`} src={testimonialImg7} alt="img7" height={265} loading="lezy"></img>
                </picture>
                <picture>
                  <source srcSet={testimonialImg8}></source>
                  <img className={`image ${row1and3 === 1 ? "active" : ""}`} src={testimonialImg8} alt="img8" height={265} loading="lezy"></img>
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <section className="networking-section">
    //   <div className="container">
    //     <h2 className="text-black text-[30px] font-extrabold my-12 p-0 text-center uppercase">
    //       they've attended our events
    //     </h2>

    //     {/* ROW 1 */}
    //     <div className="row">
    //       <div className="col-md-8">
    //         <img
    //           src={row1Image}
    //           alt={row1.personName}
    //           className="w-100 h-100"
    //         />
    //       </div>
    //       <div className="col-md-4 p-0">
    //         <div className="testimonial-section w-100 h-100">
    //           <div className="p-5">
    //             <div className="testimonial-text">{row1.personMessage}</div>
    //             <div className="testimonial-author">{row1.personName}</div>
    //             <div className="testimonial-company">{row1.personCompany}</div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* ROW 2 */}
    //     <div className="row">
    //       <div className="col-md-4">
    //         <img src={row2ImageLeft} alt="Left image" className="w-100 h-100" />
    //       </div>
    //       <div className="col-md-4 p-0">
    //         <div className="testimonial-section w-100 h-100">
    //           <div className="p-5">
    //             <div className="testimonial-text">{row2.personMessage}</div>
    //             <div className="testimonial-author">{row2.personName}</div>
    //             <div className="testimonial-company">{row2.personCompany}</div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-md-4">
    //         <img
    //           src={row2ImageRight}
    //           alt="Right image"
    //           className="w-100 h-100"
    //         />
    //       </div>
    //     </div>

    //     {/* ROW 3 */}
    //     <div className="row">
    //       <div className="col-md-4 p-0">
    //         <div className="testimonial-section w-100 h-100">
    //           <div className="p-5">
    //             <div className="testimonial-text">{row3.personMessage}</div>
    //             <div className="testimonial-author">{row3.personName}</div>
    //             <div className="testimonial-company">{row3.personCompany}</div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-md-8">
    //         <img
    //           src={row3Image}
    //           alt={row3.personName}
    //           className="w-100 h-100"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
