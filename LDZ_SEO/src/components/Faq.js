import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import "../assets/css/faq.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
const Faq = () => {
  const [faqList, setFaqList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    callFaqListApi();
    // eslint-disable-next-line
  }, []);

  const callFaqListApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/eventfaqs`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setFaqList(data["faqsList"]);
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

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

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

  const cleanHtml = (html) => {
    if (!html) return "";

    // Remove outer quotes and unescape HTML
    let cleaned = html.replace(/^"(.*)"$/, "$1");

    // Unescape quotes
    cleaned = cleaned.replace(/\\"/g, '"');

    // Ensure all external links have proper attributes
    cleaned = cleaned.replace(
      /<a\s+href=["']([^"']+)["'][^>]*>/gi,
      (match, url) => {
        // Check if URL is external (starts with http/https)
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">`;
        }
        return match;
      }
    );

    return cleaned;
  };

  const pageSeo = usePageSeo("faq");
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
        <link rel="canonical" href="https://www.australia.lithium-downstream-summit.com/faq" />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        <div className="FaqScreen_container__F+V6-">
          <div className="FaqScreen_faqContainer2__PI8bi">
            <div>
              <h1>Knowledge base</h1>
              <p>
                Explore this section for answers to common questions about our
                events. If you have any additional questions or require further
                assistance, our dedicated delegate services team is always here
                to help. Feel free to reach out to us at
                <a
                  href="mailto:delegates@iq-hub.com?subject=Lithium Downstream Summit 2026"
                  style={{ color: "black" }}
                >
                  {" "}
                  delegates@iq-hub.com
                  {" "}
                </a>
                for support.
              </p>
              <div className="FaqScreen_faqBox__d-cP0">
                <div className="FaqsV2_container__Tj1X5">
                  <button
                    className="FaqsV2_dropdownToggle__HMwnB"
                    style={{ borderBottom: "1px solid #5e5e5e" }}
                  >
                    FAQ ({faqList?.length})
                  </button>
                  <ul className="faq-list">
                    {faqList?.map((faq, index) => (
                      <li className="faq-item" key={index}>
                        <button
                          className="FaqsV2_questionToggle__K1jH-"
                          style={{
                            borderBottom:
                              activeIndex === index
                                ? "1px solid #5e5e5e"
                                : "none",
                          }}
                          onClick={() => handleToggle(index)}
                        >
                          Q{index + 1}. {faq.faqQuestion}
                        </button>
                        {
                          activeIndex === index ? <div
                            className="FaqsV2_answer__eDWNg"
                          >
                            <span>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: cleanHtml(faq.faqAnswer),
                                }}
                              ></p>
                            </span>
                          </div> : ""
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="pt-[160px] pb-[110px] bg-[#f8f9fa] min-h-screen font-sans">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#333] mb-10">
              Knowledge Base
            </h1>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#666",
                lineHeight: "1.6",
                marginBottom: "10px",
                textAlign: "center"
              }}
            >
              Explore this section for answers to common questions about our
              events. If you have any additional questions or require further
              assistance, our dedicated delegate services team is always here to
              help. Feel free to reach out to us at{" "}
              <a
                href="mailto:delegates@abcd.com"
                className="text-[#080808] underline"
              >
                delegates@abcd.com
              </a>{" "}
              for support.
            </p>
          </div>

          <div className="bg-[#080808] rounded overflow-hidden align-center">
            <div className="bg-[#080808] px-6 py-4 border-b border-[#1a252f]">
              <h2 className="text-white text-lg font-bold" style={{fontSize: "27px", fontWeight: "700px",padding: "0px 35px", textAlign: "start", width: "100%"}}>
                FAQ ({faqData.length})
              </h2>
            </div>

            <div className="py-8">
              {faqData.map((faq, index) => (
                <div key={faq.id}>
                  <div
                    onClick={() => toggleQuestion(faq.id)}
                    className={`cursor-pointer`} style={{padding: "20px 50px", fontWeight: "700px", textAlign: "start", width: "100%"}}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm sm:text-base font-medium" style={{fontSize: "20px",}}>
                        Q{faq.id}. {faq.question}
                      </span>
                      <span
                        className={`text-white text-xl transform transition-transform duration-300 ${
                          expandedQuestion === faq.id ? "rotate-45" : "rotate-0"
                        }`}
                      ></span>
                    </div>
                  </div>
                  {expandedQuestion === faq.id && (
                    <div className="pb-4 pt-2 mx-12 border-t border-[#1a252f]">
                      <p className="text-[#ffffff] text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <SubscribeForm />
      <Footer />
    </>
  );
};
export default Faq;
