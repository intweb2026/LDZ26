import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../Footer";
import "./../assets/css/Error404.css";
import { Helmet } from "react-helmet-async";
import API_BASE_URL from '../config/apiConfig';

const Error404 = () => {
  const { slug } = useParams();
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

  const seoTitle = '404 - Page Not Found';
  const seoDesc = 'The page you are looking for does not exist.';
  const canonicalUrl = slug
    ? `${API_BASE_URL}/${slug}`
    : `${API_BASE_URL}/404`;


  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={canonicalUrl} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
      </Helmet>
      <div style={{ opacity: 1 }}>
        <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
          <Navbar forceScrolled />
          <section className="NotFound_wrapper__kaIf6">
            <article className="NotFound_container__gxkP1">
              <h1 className="NotFound_heading1__5SPIO">Error 404</h1>
              <h2 className="NotFound_heading2__kSDqo">This page could not be found</h2>
              <p className="NotFound_para__nRriz">
                Sorry, the page you’re looking for wasn’t found. You may be able to find what you need
                <br />
                through&nbsp;the&nbsp;home&nbsp;page.
              </p>
              <a className="NotFound_button__5O4fA" href="/contact-us">Contact Us</a>
              <a className="NotFound_button__5O4fA NotFound_yellow__hkEXr" href="/">Go to home</a>
            </article>
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default Error404;
