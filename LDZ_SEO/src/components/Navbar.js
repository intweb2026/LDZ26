// code upto SSR working
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import "../assets/css/navbar.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const logoWhite =
//   "https://desalination-resource-recovery.com/api/images/logo/1742534509561.png";
// const logoBlack =
//   "https://www.desalination-resource-recovery.com/api/images/logo/1742534509562.png";
// const closeBtn =
//   "https://www.desalination-resource-recovery.com/images/icons/close-white.png";
// const leftArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";

// const Navbar = ({ disableScrollEffect = false, forceScrolled = false }) => {
//   const navigate = useNavigate();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [windowWidth, setWindowWidth] = useState(1200); // ✅ Safe default for SSR
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [navItems, setNavItems] = useState([]);
//   const [getTheCurrentPath, setGetTheCurrentPath] = useState("");
//   const [isHomePage, setIsHomePage] = useState(false);
//   const [activeNavItem, setActiveNavItem] = useState(null);

//   // ✅ Client-side only setup for window values
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setWindowWidth(window.innerWidth);
//       setGetTheCurrentPath(window.location.pathname.split("/").pop().toUpperCase());
//       setIsHomePage(window.location.pathname === "/");

//       const handleResize = () => setWindowWidth(window.innerWidth);
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   const less1024 = windowWidth < 1025;

//   const showWhiteNavbar = isHomePage
//     ? less1024
//       ? false
//       : forceScrolled || (!disableScrollEffect && scrolled)
//     : true;

//   // ✅ Track active nav item (safe)
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const currentPath = window.location.pathname;
//     const activeIndex = navItems.findIndex((item) => {
//       if (item.href === currentPath) return true;
//       if (currentPath === "/" && item.href === "/") return true;
//       if (item.href !== "/" && currentPath.startsWith(item.href)) return true;
//       return false;
//     });

//     if (activeIndex !== -1 && !navItems[activeIndex]?.dropdown) {
//       setActiveNavItem(activeIndex);
//     } else {
//       setActiveNavItem(null);
//     }
//   }, [navItems]);

//   // ✅ Fetch navigation items
//   useEffect(() => {
//     navItemsListApi();
//     // eslint-disable-next-line
//   }, []);

//   const navItemsListApi = () => {
//     const requestOptions = {
//       method: "GET",
//     };
//     fetch(`https://www.australia.lithium-downstream-summit.com/admin1/getnavitems`, requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.status) {
//           setNavItems(data["navItems"]);
//         }
//       })
//       .catch(() => {
//         setTimeout(() => {
//           toast.error("There was an error, Please try again later.", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }, 1000);
//       });
//   };

//   // ✅ Handle scroll safely
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const handleScroll = () => setScrolled(window.scrollY > 40);

//     if (disableScrollEffect || forceScrolled || less1024) {
//       setScrolled(false);
//       return;
//     }

//     handleScroll();
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [disableScrollEffect, forceScrolled, less1024]);

//   // ✅ Handle body overflow safely
//   useEffect(() => {
//     if (typeof document === "undefined") return;
//     document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
//     return () => {
//       if (typeof document !== "undefined") {
//         document.body.style.overflow = "";
//       }
//     };
//   }, [isMobileMenuOpen]);

//   return (
//     <header
//       className={
//         showWhiteNavbar
//           ? "NewNavbar_wholeContainerWhite__QY0eF"
//           : "NewNavbar_wholeContainer__z2zti"
//       }
//       style={{
//         backgroundColor:
//           isMobileMenuOpen && less1024
//             ? "#000000cc"
//             : showWhiteNavbar
//             ? "#fff"
//             : "transparent",
//       }}
//     >
//       <div className="NewNavbar_container__dGANs">
//         <div className="NewNavbar_logo__D1qkF">
//           <a aria-current="page" className="active" href="/">
//             <img
//               src={showWhiteNavbar ? logoBlack : logoWhite}
//               alt="website-logo"
//               height={50}
//               width={200}
//               loading="lazy"
//             />
//           </a>
//         </div>

//         <div
//           className="NewNavbar_hide__g8Glm NewNavbar_navLinksContainer__s15t3"
//           style={{ display: isMobileMenuOpen && less1024 ? "block" : "" }}
//         >
//           <div
//             className="NewNavbar_linksContainer__tbm-r"
//             style={{
//               flexFlow:
//                 activeMobileDropdown === activeIndex && isDropdownOpen
//                   ? "row"
//                   : "",
//             }}
//           >
//             <ul>
//               {navItems.map((item, index) => {
//                 const hasDropdown = !!item?.dropdown;
//                 const isActive = activeMobileDropdown === index;

//                 // ✅ Mobile dropdown rendering
//                 if (less1024) {
//                   if (isDropdownOpen) {
//                     if (!isActive) return null;
//                     return (
//                       <React.Fragment key={index}>
//                         <li>
//                           <a
//                             aria-current="page"
//                             className="active"
//                             href="/"
//                             style={{
//                               width: "60px",
//                               marginRight: "10px",
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                             }}
//                             onClick={(e) => {
//                               e.preventDefault();
//                               setIsDropdownOpen(false);
//                               setActiveMobileDropdown(null);
//                             }}
//                           >
//                             <img
//                               src={leftArrowIcon}
//                               alt="left icon"
//                               width="12"
//                             />
//                           </a>
//                           <a
//                             aria-current="page"
//                             className="active"
//                             href={item.href}
//                             style={{
//                               width: isActive ? "100%" : "",
//                               display: isActive ? "" : "none",
//                             }}
//                           >
//                             {item.name}
//                             <div className="NewNavbar_resExpansionMenu__5GuSM">
//                               {item.dropdown?.map((subItem, subIndex) => (
//                                 <a
//                                   key={subIndex}
//                                   aria-current="page"
//                                   className="active"
//                                   href={subItem.href}
//                                 >
//                                   {subItem.name}
//                                 </a>
//                               ))}
//                             </div>
//                           </a>
//                         </li>
//                       </React.Fragment>
//                     );
//                   }

//                   return (
//                     <li key={index}>
//                       <a
//                         aria-current="page"
//                         className="active"
//                         href={item.href}
//                         onClick={(e) => {
//                           if (hasDropdown) {
//                             e.preventDefault();
//                             setActiveMobileDropdown(index);
//                             setIsDropdownOpen(true);
//                             setActiveIndex(index);
//                           }
//                         }}
//                       >
//                         {item.name}
//                       </a>
//                     </li>
//                   );
//                 }

//                 // ✅ Desktop version unchanged
//                 return (
//                   <li
//                     key={index}
//                     onMouseEnter={() => {
//                       if (activeNavItem !== index) setHoveredIndex(index);
//                     }}
//                     onMouseLeave={() => {
//                       if (activeNavItem !== index) setHoveredIndex(null);
//                     }}
//                     onClick={() => {
//                       if (!hasDropdown) setActiveNavItem(index);
//                     }}
//                   >
//                     <a
//                       aria-current="page"
//                       href={item.href}
//                       className={`${
//                         getTheCurrentPath === item.name
//                           ? "navbar-active-no-hover"
//                           : ""
//                       }`}
//                     >
//                       {item.name}
//                     </a>
//                     {item?.dropdown && (
//                       <div
//                         className="NewNavbar_expansionMenuOuter__wKpka"
//                         style={{
//                           visibility:
//                             hoveredIndex === index ? "visible" : "hidden",
//                           opacity: hoveredIndex === index ? 1 : 0,
//                         }}
//                       >
//                         <div className="NewNavbar_expansionMenu__KBWXI">
//                           {item.dropdown?.map((subItem, subIndex) => (
//                             <a
//                               key={subIndex}
//                               aria-current="page"
//                               className="active"
//                               href={subItem.href}
//                             >
//                               {subItem.name}
//                             </a>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//             <button
//               style={{
//                 display:
//                   activeMobileDropdown === activeIndex && isDropdownOpen
//                     ? "none"
//                     : "",
//               }}
//               onClick={() => navigate("/booking")}
//             >
//               Register
//             </button>
//           </div>
//         </div>

//         <div className="NewNavbar_register__UET28">
//           <button onClick={() => navigate("/booking")}>Register</button>
//           {less1024 && !isMobileMenuOpen && (
//             <svg
//               width="33"
//               height="28"
//               viewBox="0 0 33 28"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               onClick={() => setIsMobileMenuOpen(true)}
//             >
//               <rect width="33" height="6"></rect>
//               <rect y="11" width="33" height="6"></rect>
//               <rect y="22" width="33" height="6"></rect>
//             </svg>
//           )}
//           {less1024 && isMobileMenuOpen && (
//             <img
//               src={closeBtn}
//               alt="Hamburger icons"
//               className="NewNavbar_close__YvNRt"
//               width="25"
//               height="25"
//               style={{ display: isMobileMenuOpen ? "block" : "none" }}
//               onClick={() => setIsMobileMenuOpen(false)}
//             />
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// code After added Google Translation
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/navbar.css";
import GoogleTranslate from "./GoogleTranslate";
import { useSSRData } from "../common/useSSRData";
const closeBtn = '/images/WebCommonImages/close-white.png';
const hamburger = '/images/WebCommonImages/navbar-toggle.png';
const leftArrowIcon = '/images/WebCommonImages/icon-arrow-left.png';

// const closeBtn =
//   "https://www.desalination-resource-recovery.com/images/icons/close-white.png";
// const hamburger = "https://cdn-icons-png.flaticon.com/512/56/56763.png";
// const leftArrowIcon =
//   "https://www.desalination-resource-recovery.com/images/icons/icon-arrow-left.png";

const Navbar = ({ disableScrollEffect = false, forceScrolled = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Initialize navLogos from SSR window.__INITIAL_DATA__ — persists across route changes
  const [navLogos, setNavLogos] = useState(() => {
    if (typeof window !== "undefined" && window.__INITIAL_DATA__?.navLogos) {
      return window.__INITIAL_DATA__.navLogos;
    }
    return null;
  });

  // ✅ navItems from SSR data
  const ssrNavItems = useSSRData("navItems");

  const ssrSponsorList = useSSRData("sponsors");
  const sponsorList = ssrSponsorList || [];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 40 : false
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  // Memoized so the array reference is stable — prevents useEffect from re-running every render
  const navItems = useMemo(
    () => (ssrNavItems || []).filter(item => item.isChecked === "Yes"),
    [ssrNavItems]
  );

  // ✅ Client-side fallback: fetch navLogos if SSR data is null
  useEffect(() => {
    if (navLogos) return;
    fetch("https://www.australia.lithium-downstream-summit.com/admin1/getnavlogos")
      .then((r) => r.json())
      .then((data) => {
        if (data?.status && data.navLogos) {
          const raw = data.navLogos;
          setNavLogos(Array.isArray(raw) ? raw[0] : raw);
        }
      })
      .catch(() => { });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Client-side only setup for window values
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const less1024 = windowWidth < 1025;
  const greater1024 = windowWidth > 1024;
  const isHomePage = location.pathname === "/";

  const showWhiteNavbar = isHomePage
    ? less1024
      ? false
      : forceScrolled || (!disableScrollEffect && scrolled)
    : true;

  // Track active nav item
  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentPath = window.location.pathname;
    const items = ssrNavItems || [];
    const activeIndex = items.findIndex((item) => {
      if (item.href === currentPath) return true;
      if (currentPath === "/" && item.href === "/") return true;
      if (item.href !== "/" && currentPath.startsWith(item.href)) return true;
      return false;
    });

    const newActive =
      activeIndex !== -1 && !items[activeIndex]?.dropdown
        ? activeIndex
        : null;

    setActiveNavItem((prev) => (prev === newActive ? prev : newActive));
  }, [ssrNavItems]);

  // Handle scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setScrolled(window.scrollY > 40);

    if (disableScrollEffect || forceScrolled || less1024) {
      setScrolled(false);
      return;
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disableScrollEffect, forceScrolled, less1024]);

  // Handle body overflow
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const active = navItems.find(item => {
      if (item?.dropdown?.length) {
        return item.dropdown.some(sub => sub.href === location.pathname);
      }
      return item.href === location.pathname;
    });
    setActiveModule(active ? active.name : null);
  }, [location.pathname, navItems]);

  const sponsorLogoWhite = "https://www.australia.lithium-downstream-summit.com/api/images/sponsor/1760958766497-923906797.png"
  const sponsorLogoBlack = "https://www.australia.lithium-downstream-summit.com/api/images/sponsor/1760958766497-534741386.png"

  return (
    <header
      className={
        showWhiteNavbar
          ? "NewNavbar_wholeContainerWhite__QY0eF NewNavbar_googleTranslateEnabled__6pHnw"
          : "NewNavbar_wholeContainer__z2zti NewNavbar_googleTranslateEnabled__6pHnw"
      }
      style={{
        backgroundColor:
          isMobileMenuOpen && less1024
            ? "#000000cc"
            : showWhiteNavbar
              ? "#fff"
              : "transparent",
      }}
    >
      <div className="NewNavbar_container__dGANs">
        <div className="NewNavbar_logo__D1qkF">
          <a className="notranslate" href="/">
            <span className="sr-only">Home</span>
            {navLogos ? (
              <img
                src={showWhiteNavbar ? navLogos.blackLogo : navLogos.whiteLogo}
                alt="website-logo"
                height={50}
                width={200}
                loading="lazy"
              />
            ) : null}
          </a>
        </div>
        {sponsorList.map((group) => (
          group?.sponsorType === "Lead" && (
            less1024 && (
              <div className={showWhiteNavbar
                ? "NewNavbar_sponsorBarFixed__k-Ba4"
                : "NewNavbar_sponsorBar__+QUFr"}>
                <span>Lead Sponsor</span>
                <div className="NewNavbar_imageContainer__wGvkD">
                  <img src={showWhiteNavbar ? sponsorLogoBlack : sponsorLogoWhite} loading="lazy" alt="Sponsor logo"></img>
                </div>
              </div>
            )
          )
        ))}

        <div
          className="NewNavbar_hide__g8Glm NewNavbar_navLinksContainer__s15t3 navLinksContainer "
          style={{ display: isMobileMenuOpen && less1024 ? "block" : "" }}
        >
          {sponsorList.map((group) => (
            group?.sponsorType === "Lead" && (
              greater1024 && (
                <div className={showWhiteNavbar
                  ? "NewNavbar_sponsorBarFixed__k-Ba4"
                  : "NewNavbar_sponsorBar__+QUFr"}>
                  <span>Lead Sponsor</span>
                  <div className="NewNavbar_imageContainer__wGvkD">
                    <img src={showWhiteNavbar ? sponsorLogoBlack : sponsorLogoWhite} loading="lazy" alt="Sponsor logo"></img>
                  </div>
                </div>
              )
            )
          ))}

          <div className="NewNavbar_linksContainer__tbm-r">
            <ul>
              {navItems.map((item, index) => {
                const hasDropdown = item.dropdown?.length;
                if (less1024) {
                  const isActive = activeMobileDropdown === index;

                  if (isDropdownOpen) {
                    if (!isActive) return null;

                    return (
                      <React.Fragment key={index}>
                        <li>
                          <a
                            aria-current="page"
                            class="active"
                            href="/"
                            style={{
                              width: '60px',
                              marginRight: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              setIsDropdownOpen(false);
                              setActiveMobileDropdown(null);
                            }}
                          >
                            <img src={leftArrowIcon} width="12" alt="back" />
                          </a>
                          <a href={item.href}>{item.name}</a>
                        </li>

                        {item.dropdown
                          .filter(sub => sub.isChecked === "Yes")
                          .map((sub, sIdx) => (
                            <li key={sIdx}>
                              <a href={sub.href}>{sub.name}</a>
                            </li>
                          ))}
                      </React.Fragment>
                    );
                  }

                  return (
                    <li key={index}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          if (hasDropdown) {
                            e.preventDefault();
                            setActiveMobileDropdown(index);
                            setIsDropdownOpen(true);
                          }
                        }}
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                }

                return (
                  <li
                    key={index}
                    onMouseEnter={() =>
                      activeNavItem !== index && setHoveredIndex(index)
                    }
                    onMouseLeave={() =>
                      activeNavItem !== index && setHoveredIndex(null)
                    }
                  >
                    <a className={activeModule === item.name ? "navbar-active-no-hover" : ""} href={item.href}>{item.name}</a>

                    {hasDropdown && (
                      <div
                        className="NewNavbar_expansionMenuOuter__wKpka"
                        style={{
                          visibility:
                            hoveredIndex === index ? "visible" : "hidden",
                          opacity: hoveredIndex === index ? 1 : 0,
                        }}
                      >
                        <div className="NewNavbar_expansionMenu__KBWXI">
                          {item.dropdown
                            .filter(sub => sub.isChecked === "Yes")
                            .map((sub, sIdx) => (
                              <a key={sIdx} href={sub.href}>
                                {sub.name}
                              </a>
                            ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            {!isDropdownOpen && (<button onClick={() => navigate("/booking")}>Register</button>)}
            {/* <button onClick={() => navigate("/booking")}>Register</button> */}
          </div>
        </div>

        <div className="NewNavbar_register__UET28 register_btn">
          {/* <GoogleTranslate
            defaultLang="en"
            showWhiteNavbar={showWhiteNavbar}
            isMobileMenuOpen={isMobileMenuOpen}
            less1024={less1024}
          /> */}

          <button onClick={() => navigate("/booking")}>Register</button>

          {less1024 && isMobileMenuOpen ? (
            <img
              src={closeBtn}
              alt="menu"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ width: 22, cursor: "pointer" }}
            />
          ) : (
            <svg width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setIsMobileMenuOpen(true)}>
              <rect width="33" height="6"></rect>
              <rect y="11" width="33" height="6"></rect>
              <rect y="22" width="33" height="6"></rect>
            </svg>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
