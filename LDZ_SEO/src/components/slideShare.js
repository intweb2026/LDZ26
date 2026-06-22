import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import "../assets/css/slideShare.css";
import Footer from "../Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { useApiData } from "../../src/common/ApiContext";
import API_BASE_URL from '../config/apiConfig';
const TOKEN_KEY = "slideShareToken";
const EMAIL_KEY = "slideShareEmail";
const EXPIRY_KEY = "slideShareExpiry";

const SlideShare = () => {
    const navigate = useNavigate();
    const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();

    const [verify, setVerify] = useState("false");
    const [userEmail, setUserEmail] = useState("");
    const [slideShareList, setSlideShareList] = useState([]);
    const [slideShareAttendeesList, setSlideShareAttendeesList] = useState([]);

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAttendees, setIsOpenAttendees] = useState(false);
    const [activePdf, setActivePdf] = useState("");
    const [activePdfTitle, setActivePdfTitle] = useState("");

    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1200
    );

    const expiryTimerRef = useRef(null);

    // ─── helpers ────────────────────────────────────────────────────────────────

    const clearAuthData = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(EMAIL_KEY);
        localStorage.removeItem(EXPIRY_KEY);
        setVerify("false");
        setUserEmail("");
        if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    };

    /**
     * Schedule automatic logout exactly when the JWT expires.
     * @param {string} expiresAt  ISO-8601 string returned by the API / stored in localStorage
     */
    const scheduleAutoLogout = (expiresAt) => {
        if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);

        const msUntilExpiry = new Date(expiresAt).getTime() - Date.now();
        if (msUntilExpiry <= 0) {
            clearAuthData();
            return;
        }

        expiryTimerRef.current = setTimeout(() => {
            clearAuthData();
            toast.info("Your session has expired. Please log in again.", {
                position: "top-right",
                autoClose: 5000,
            });
        }, msUntilExpiry);
    };

    // ─── on mount: restore session if token still valid ─────────────────────────

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        const email = localStorage.getItem(EMAIL_KEY);
        const expiresAt = localStorage.getItem(EXPIRY_KEY);

        if (token && email && expiresAt) {
            const isStillValid = new Date(expiresAt).getTime() > Date.now();
            if (isStillValid) {
                setVerify("true");
                setUserEmail(email);
                scheduleAutoLogout(expiresAt);
            } else {
                // Token already expired while the tab was closed
                clearAuthData();
            }
        }

        callSlideShareListApi();
        callSlideShareAttandeeListApi();

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ─── API calls ───────────────────────────────────────────────────────────────

    const callSlideShareListApi = () => {
        fetch(`${API_BASE_URL}/admin1/getslideShare`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.detail === "The Token is expired" || data?.message === "Invalid token") {
                    navigate("/logout");
                    return;
                }
                if (data?.status) {
                    setSlideShareList(data.slideShares);
                } else {
                    toast.error(data?.message);
                }
            })
            .catch(() => {
                toast.error("There was an error, please try again later.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            });
    };

    const callSlideShareAttandeeListApi = () => {
        fetch(`${API_BASE_URL}/admin1/getslideShareAttandee`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.detail === "The Token is expired" || data?.message === "Invalid token") {
                    navigate("/logout");
                    return;
                }
                if (data?.status) {
                    setSlideShareAttendeesList(data.slideSharesAttandees);
                } else {
                    toast.error(data?.message);
                }
            })
            .catch(() => {
                toast.error("There was an error, please try again later.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            });
    };

    // ─── login ───────────────────────────────────────────────────────────────────

    const handleLogin = async () => {
        setIsLoggingIn(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/admin1/securelogin`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: emailInput.trim(),
                        eventPassword: passwordInput,
                        projectYear: eventDetails?.eventYear,   // adjust if dynamic
                    }),
                }
            );

            const data = await response.json();

            if (data?.success === true) {
                // Persist auth data
                localStorage.setItem(TOKEN_KEY, data.token);
                localStorage.setItem(EMAIL_KEY, data.email);
                localStorage.setItem(EXPIRY_KEY, data.expires_at);

                setVerify("true");
                setUserEmail(data.email);
                scheduleAutoLogout(data.expires_at);

                toast.success("Verified successfully!", { position: "top-right", autoClose: 3000 });
            } else {
                toast.error(data?.message || "Invalid credentials. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        } catch {
            toast.error("There was an error, please try again later.", {
                position: "top-right",
                autoClose: 5000,
            });
        } finally {
            setIsLoggingIn(false);
        }
    };

    // Allow Enter key to submit the form
    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    // ─── logout ──────────────────────────────────────────────────────────────────

    const handleLogout = () => {
        clearAuthData();
        setEmailInput("");
        setPasswordInput("");
        toast.info("You have been logged out.", { position: "top-right", autoClose: 3000 });
    };

    // ─── SEO ─────────────────────────────────────────────────────────────────────

    // const seoTitle = `Bitcoin Innovation & Market Evolution 2026 | Sponsorship`;
    // const seoDesc =
    //     "Exhibit or sponsor at Bitcoin Innovation & Market Evolution 2026 and connect with miners, exchanges, fintechs, regulators and blockchain leaders.";

    // ─── render ──────────────────────────────────────────────────────────────────

    return (
        <div id="root">
            {/* <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDesc} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDesc} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={seoTitle} />
                <link
                    rel="canonical"
                    href={`${API_BASE_URL}/sponsors`}
                />
            </Helmet> */}

            <div style={{ opacity: 1 }}>
                <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
                    <Navbar forceScrolled />

                    <div className="Slideshare_container__TrIvi">
                        {/* ── top / auth section ── */}
                        <div className="Slideshare_topContainer__Yu35o">
                            <div
                                className="Slideshare_authenticate__A8Vrd"
                                style={{
                                    display: verify === "true" ? "flex" : "",
                                    flexDirection: verify === "true" ? "column" : "",
                                    justifyContent: verify === "true" ? "center" : "",
                                }}
                            >
                                {verify === "true" ? (
                                    <>
                                        <p
                                            className="Slideshare_welcomePara__b7Kc2"
                                            style={{ margin: "0px" }}
                                        >
                                            Welcome, <span>{userEmail}</span>
                                        </p>
                                        <div className="Slideshare_logoutContainer__RSKNv">
                                            <p className="Slideshare_authPara3__Nefi0">
                                                <span
                                                    onClick={() => setIsOpenAttendees(true)}
                                                    style={{ textDecoration: "underline", cursor: "pointer" }}
                                                >
                                                    Click here
                                                </span>{" "}
                                                to view a full list of delegates registered to attend{" "}
                                                <span className="Slideshare_authPara3Span__zPzva">
                                                    EV CHARGING UK 2026
                                                </span>
                                            </p>
                                            <button onClick={handleLogout}>Logout</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h1>access the presentations</h1>
                                        <p className="Slideshare_authPara1__ZI+o7">
                                            Please verify below to access the{" "}
                                            <span>presentations</span>.
                                        </p>

                                        {/* ── controlled form — no <form> submit ── */}
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault(); // ← prevents page reload
                                                handleLogin();
                                            }}
                                            data-hs-cf-bound="true"
                                            data-gtm-form-interact-id="0"
                                        >
                                            <div>
                                                <div>
                                                    <input
                                                        type="email"
                                                        placeholder="Email address *"
                                                        value={emailInput}
                                                        onChange={(e) => setEmailInput(e.target.value)}
                                                        data-gtm-form-interact-field-id="0"
                                                        required
                                                    />
                                                    <input
                                                        type="password"
                                                        placeholder="Password *"
                                                        value={passwordInput}
                                                        onChange={(e) => setPasswordInput(e.target.value)}
                                                        data-gtm-form-interact-field-id="1"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <input
                                                className="verify_btn"
                                                type="submit"
                                                value={isLoggingIn ? "Verifying…" : "Verify"}
                                                disabled={isLoggingIn}
                                                style={{
                                                    opacity: isLoggingIn ? 0.7 : 1,
                                                    cursor: isLoggingIn ? "not-allowed" : "pointer"
                                                }}
                                            />
                                        </form>

                                        <p className="Slideshare_authPara2__9QGA2">
                                            If you do not have these details and would like to gain
                                            access please email our delegates team at{" "}
                                            <a href="mailto:delegates@iq-hub.com" style={{ display: "block" }}>
                                                delegates@iq-hub.com
                                            </a>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* ── slides list ── */}
                        <div className="Slideshare_bottomContainer__oejp4">
                            <div className="Slideshare_slidesContainer__jsZ-m">
                                <div className="Slideshare_topSec__EeRby">
                                    <h3>Presentations Viewer</h3>
                                    <p>
                                        The{" "}
                                        <span style={{ fontWeight: 800 }}>
                                            Litihium Downstream Summit 2026{" "}
                                        </span>
                                        is the only event delivering cutting-edge market intelligence
                                        and sector-specific insights into innovative water treatment
                                        technologies that enhance operational efficiency.
                                    </p>
                                </div>

                                {slideShareList.map((slide, index) => (
                                    <div
                                        key={slide.id ?? index}
                                        className="Slideshare_slide__QlPAx"
                                        onClick={() => {
                                            if (verify !== "true") return;
                                            setActivePdf(slide.pptLink);
                                            setActivePdfTitle(slide.heading);
                                            setIsOpen(true);
                                        }}
                                        style={{ cursor: verify === "true" ? "pointer" : "default" }}
                                    >
                                        <div className="Slideshare_slideLeft__428RJ">
                                            <img src={slide.pptImage} alt="thumbnail of the slide" />
                                        </div>
                                        <div className="Slideshare_slideRight__Zch8R">
                                            <h5>{slide.heading}</h5>
                                            <p>
                                                {slide.author}, {slide.authorCompany}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── PDF modal ── */}
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className="ReactModalPortal"
                style={{
                    content: {
                        position: "absolute",
                        inset: "40px 0px",
                        border: "1px solid rgb(204, 204, 204)",
                        background: "rgb(255, 255, 255)",
                        overflow: "hidden",
                        borderRadius: "8px",
                        outline: "none",
                        padding: "20px",
                        width: "95%",
                        maxWidth: "1200px",
                        margin: "auto",
                        maxHeight: "800px",
                    },
                    overlay: { backgroundColor: "rgba(0,0,0,0.55)", zIndex: 9999 },
                }}
            >
                <div
                    onClick={() => setIsOpen(false)}
                    style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}
                >
                    <button
                        style={{
                            border: "none",
                            backgroundColor: "transparent",
                            margin: "0px",
                            padding: "0px",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src="https://www.uk.evcharging-infrastructure.com/images/icons/close-mustard.png"
                            alt="close icon"
                            width="18"
                        />
                    </button>
                </div>
                <div>
                    <iframe title={activePdfTitle} src={activePdf} width="100%" height="700px" />
                </div>
            </Modal>

            {/* ── attendees modal ── */}
            <Modal
                isOpen={isOpenAttendees}
                onRequestClose={() => setIsOpenAttendees(false)}
                className="ReactModalPortal"
                style={{
                    content: {
                        position: "absolute",
                        inset: "40px",
                        border: "1px solid rgb(204, 204, 204)",
                        background: "rgb(255, 255, 255)",
                        overflow: "auto",
                        borderRadius: "4px",
                        outline: "none",
                        padding: "20px",
                        width: "80%",
                        maxWidth: "800px",
                        margin: "auto",
                        maxHeight: "600px",
                    },
                    overlay: { backgroundColor: "rgba(0,0,0,0.55)", zIndex: 9999 },
                }}
            >
                <div
                    onClick={() => setIsOpenAttendees(false)}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    <button
                        style={{
                            border: "none",
                            backgroundColor: "transparent",
                            margin: "0px",
                            padding: "0px",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src="https://www.uk.evcharging-infrastructure.com/images/icons/close-mustard.png"
                            alt="close icon"
                            width="18"
                        />
                    </button>
                </div>
                <div className="Slideshare_tableContainer__J6uzu">
                    <h3>Registered Delegate: EV CHARGING UK 2026</h3>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#181818" }}>
                                <td style={{ fontWeight: "700", color: "#ffffff" }}>Delegate Name</td>
                                <td style={{ fontWeight: "700", color: "#ffffff" }}>Company</td>
                            </tr>
                        </thead>
                        <tbody>
                            {slideShareAttendeesList.map((delegate, index) => (
                                <tr key={delegate.id ?? index}>
                                    <td style={{ paddingTop: index === 0 ? "20px" : "" }}>
                                        {delegate.delegateName}
                                    </td>
                                    <td style={{ paddingTop: index === 0 ? "20px" : "" }}>
                                        {delegate.companyName}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Modal>

            <Footer />
        </div>
    );
};

export default SlideShare;