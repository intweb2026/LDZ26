import { useState, useEffect } from "react";
import "../../src/assets/css/MediaPartners.css";
import Footer from "../Footer";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
import API_BASE_URL from '../config/apiConfig';
const mediaImage1 = "/images/WebImages/media1.webp";
const mediaImage2 = "/images/WebImages/media-res2.webp";
const emailIcon = "/images/WebCommonImages/msg.png";
const phoneIcon = "/images/WebCommonImages/phone-call.png";
// const mediaImage1 =
//   "https://www.europe.autonomous-vehicles-conference.com/static/media/media.8d91a0418af8c33f6344.webp"
// const mediaImage2 =
//   "https://www.europe.autonomous-vehicles-conference.com/static/media/media-res.6077ae0e16c49f9f4184.webp";

// const emailIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/msg.png";
// const phoneIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/phone-call.png";

const MediaPartners = () => {
  const [mediaPageHelpersList, setMediaPageHelpersList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    callMediaHelperListApi();
    // eslint-disable-next-line
  }, []);

  const callMediaHelperListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/mediapagehelpers`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setMediaPageHelpersList(data["mediaPageHelpers"]);
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

  const pageSeo = usePageSeo("media-partners");
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
        <meta property="og:type" content="website" />
        {seoImage && <meta property="og:image" content={seoImage} />}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
        <link rel="canonical" href=`${API_BASE_URL}/media-partners` />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <article className="MediaScreen_container__Ypf0i">
            <section className="MediaScreen_pressContainer__C0hGj">
              <div>
                <h1>Members of the press</h1>
                <p>
                  We always welcome approaches from industry members who think
                  they can work with us in a media partnership. We aim to bring
                  you the latest news within the industry and keep you updated
                  with current developments through our event partners.
                </p>
                <h5>Media partner benefits include:</h5>
                <div className="MediaScreen_cardContainer__AgLie">
                  <div className="MediaScreen_card__7H5Ka">
                    <h5>Engage with the industry</h5>
                    <p>
                      An opportunity to be part of a leading industry initiative
                      and associate your media brand with industry leaders.
                    </p>
                  </div>
                  <div className="MediaScreen_card__7H5Ka">
                    <h5>Raise profile and brand awareness</h5>
                    <p>
                      Benefit from valuable exposure and target market reach for
                      your brand, product, or organization.
                    </p>
                  </div>
                  <div className="MediaScreen_card__7H5Ka">
                    <h5>Stay ahead of competitors</h5>
                    <p>
                      Gain knowledge of current developments and challenges
                      direct from industry leaders as and when they happen.
                    </p>
                  </div>
                  <div className="MediaScreen_card__7H5Ka">
                    <h5>Mutually beneficial opportunities</h5>
                    <p>
                      Positive association with content-driven industry leaders.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <div className="MediaScreen_img__bcHc5">
              <img
                src={windowWidth < 769 ? mediaImage2 : mediaImage1}
                alt="media img"
                loading={windowWidth < 769 ? "" : "lazy"}
              ></img>
            </div>
            <section className="MediaScreen_contactContainer__pk8AK">
              <h2>GET IN TOUCH TO BOOK YOUR BOOTH</h2>
              {/* <h2>Get in touch to Book Your Trade Show Booth</h2> */}
              <div>
                {mediaPageHelpersList.map((item, index) => (
                  <div className="MediaScreen_contactCard__9lw-u">
                    <h5>{item?.companyPersonName}</h5>
                    <p>
                      <img src={emailIcon} alt="emil icon"></img>
                      <a
                        href={`mailto:${item?.companyPersonEmail}?subject=Lithium &amp; Downstream Summit 2026`}
                        className="MediaScreen_email__vpDbe"
                      >
                        {item?.companyPersonEmail}
                      </a>
                    </p>
                    <p>
                      <img src={phoneIcon} alt="Phone Icon"></img>
                      <a href={`tel:${item?.companyPersonPhone}`}>
                        {item?.companyPersonPhone}
                      </a>
                    </p>
                  </div>
                ))}
                {/* <div className="MediaScreen_contactCard__9lw-u">
                  <h5>LEE NAVARRO</h5>
                  <p>
                    <img src={emailIcon} alt="emil icon"></img>
                    <a
                      href="mailto:lee.navarro@abcd.com?subject=Desalination &amp; Resource Recovery 2025"
                      className="MediaScreen_email__vpDbe"
                    >
                      lee.navarro@abcd.com
                    </a>
                  </p>
                  <p>
                    <img src={phoneIcon} alt="Phone Icon"></img>
                    <a href="tel:+12065820128">+1 206 582 0128</a>
                  </p>
                </div>
                <div className="MediaScreen_contactCard__9lw-u">
                  <h5>Sean Collins</h5>
                  <p>
                    <img src={emailIcon} alt="emil icon"></img>
                    <a href="mailto:sean.collins@abcd.com?subject=Desalination &amp; Resource Recovery 2025">
                      sean.collins@abcd.com
                    </a>
                  </p>
                  <p>
                    <img src={phoneIcon} alt="Phone Icon"></img>
                    <a href="tel:+12065820128">+1 206 582 0128</a>
                  </p>
                </div> */}
              </div>
            </section>
            <SubscribeForm />
          </article>
        </div>
      </div>
      {/* <div class="pt-[90px]">

                <section class="press-section">
                    <div class="container">
                        <h1 class="section-title_mediaPartbers">MEMBERS OF THE PRESS</h1>

                        <p class="intro-text">
                            We always welcome approaches from industry members who think they can work with us in a media partnership. We aim to bring
                            you the latest news within the industry and keep you updated with current developments through our event partners.
                        </p>

                        <h3 class="benefits-title">Media partner benefits include:</h3>

                        <div class="row">
                            <div class="col-lg-3 col-md-6">
                                <div class="benefit-card">
                                    <h4>Engage with the industry</h4>
                                    <p>An opportunity to be part of a leading industry initiative and associate your media brand with industry leaders.</p>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6">
                                <div class="benefit-card">
                                    <h4>Raise profile and brand awareness</h4>
                                    <p>Benefit from valuable exposure and target market reach for your brand, product, or organization.</p>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6">
                                <div class="benefit-card">
                                    <h4>Stay ahead of competitors</h4>
                                    <p>Gain knowledge of current developments and challenges direct from industry leaders as and when they happen.</p>
                                </div>
                            </div>

                            <div class="col-lg-3 col-md-6">
                                <div class="benefit-card">
                                    <h4>Mutually beneficial opportunities</h4>
                                    <p>Positive association with content-driven industry leaders.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div>
                    <img src={MediaImg} alt="Luxury Hotel Exterior" className='img-fluid w-100' />
                </div>

                <section class="contact-section_mediaPartbers">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-10">
                                <h2 class="contact-heading_mediaPartbers">
                                    GET IN TOUCH TO BOOK YOUR TRADE SHOW BOOTH
                                </h2>

                                <div class="row g-4">
                                    <div class="col-md-6 ">
                                        <div class="contact-card_mediaPartbers">
                                            <h3 class="contact-name_mediaPartbers pb-1 text-capitalize">LEE NAVARRO</h3>
                                            <div class="contact-info_mediaPartbers">
                                                <i class="fas fa-envelope"></i>
                                                <a href="mailto:lee.navarro@big-hub.com">lee.navarro@big-hub.com</a>
                                            </div>
                                            <div class="contact-info_mediaPartbers">
                                                <i class="fas fa-phone"></i>
                                                <a href="tel:+12065820128">+1 206 582 0128</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 ">
                                        <div class="contact-card_mediaPartbers">
                                            <h3 class="contact-name_mediaPartbers pb-1 text-capitalize">Sean Collins</h3>
                                            <div class="contact-info_mediaPartbers">
                                                <i class="fas fa-envelope"></i>
                                                <a href="mailto:lee.navarro@big-hub.com">lee.navarro@big-hub.com</a>
                                            </div>
                                            <div class="contact-info_mediaPartbers">
                                                <i class="fas fa-phone"></i>
                                                <a href="tel:+12065820128">+1 206 582 0128</a>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div> */}
      <Footer />
    </>
  );
};
export default MediaPartners;
