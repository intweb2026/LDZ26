import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "../Footer";
import '../../src/assets/css/thankYouPage.css'
const checkIcon = "/images/checked.png";
const leftArrowIcon = "/images/WebCommonImages/icon-arrow-left.png";

const ThankYouPage = () => {
    const location = useLocation();
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ✅ Redirect to 404 if not authorized (direct URL access)
    if (!location.state || !location.state.authorized) {
        return <Navigate to="/404" replace />;
    }
    return (
        <>
            <Navbar forceScrolled />
            <div style={{ opacity: 1 }}>
                <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
                    <article class="card" aria-labelledby="thanks-title">
                        <div className="card_svg">
                            <img src={checkIcon}
                                alt="left arrow icon"
                                loading="lazy"
                                width="120"
                            ></img>
                        </div>

                        <h1 id="thanks-title">THANK YOU!</h1>
                        <p class="status">Payment Successful</p>
                        <a class="back" href="/" aria-label="Go back to Homepage">
                            <img
                                src={leftArrowIcon}
                                alt="left arrow icon"
                                loading="lazy"
                                width="6"
                            />
                            Go back to Homepage
                        </a>
                    </article>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default ThankYouPage;
