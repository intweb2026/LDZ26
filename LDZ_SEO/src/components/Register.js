// import { useState, useEffect } from "react";
// import icon from "/images/group-icon.png";
// import lunch from "/images/icon-luncheon.png";
// import fullaccess from "/images/icon-full-access.png";
// import networking from "/images/icon-networking.png";
// import onlineaccess from "/images/icon-online-access.png";
// import "../../src/assets/css/register.css";
// import Navbar from "./Navbar";
// import SubscribeForm from "./SubscribeForm";
// import Footer from "../Footer";
// import LogoCarousel from "./LogoCarousel";
// import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useApiData } from "../../src/common/ApiContext";
// const Register = () => {
//   const navigate = useNavigate();
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [delegatePackageList, setDelegatePackageList] = useState([]);
//   const [countSuperEarlyBird, setCountSuperEarlyBird] = useState(1);
//   const [countEarlyBird, setCountEarlyBird] = useState(1);
//   const [countRegularPrice, setCountRegularPrice] = useState(1);
//   const [cardCounts, setCardCounts] = useState({});
//   const [windowWidth, setWindowWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );
//   const {
//     homeVideoSettings,
//     eventDetails,
//     eventGeneralSettings,
//     themeSettings,
//   } = useApiData();
//   const [formData, setFormData] = useState({
//     name: "",
//     company: "",
//     email: "",
//     countryCode: "+1",
//     phone: "",
//     interest: "",
//     attendees: "",
//     message: "",
//     confirmation: false,
//   });
//   console.log('formData: ', formData);
//   const [errors, setErrors] = useState({});
//   console.log('errors: ', errors);
//   // Email validation regex
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     callDelegatePackageListApi();
//     // eslint-disable-next-line
//   }, []);

//   const callDelegatePackageListApi = () => {
//     const requestOptions = {
//       method: "GET",
//     };
//     fetch(`https://www.linq-staging-site.com/admin1/deligatepackageslist`, requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.status) {
//           setDelegatePackageList(data["delegatePackages"]);
//           // setTotalCount(data?.paginationDetails?.count);
//         }
//       });
//   };

//   const openPopup = () => setIsPopupOpen(true);
//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setFormData({
//       name: "",
//       company: "",
//       email: "",
//       countryCode: "+1",
//       phone: "",
//       interest: "",
//       attendees: "",
//       message: "",
//       confirmation: false,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: newValue,
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Name validation
//     if (!formData.name.trim()) {
//       newErrors.name = "Full name is required";
//     }

//     // Company validation
//     if (!formData.company.trim()) {
//       newErrors.company = "Company name is required";
//     }

//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = "Email address is required";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Enter valid email";
//     }

//     // Phone validation
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Mobile number is required";
//     }

//     // Interest validation
//     if (!formData.interest) {
//       newErrors.interest = "Please select an option";
//     }

//     // Attendees validation
//     if (!formData.attendees.trim()) {
//       newErrors.attendees = "Number of attendees is required";
//     } else if (parseInt(formData.attendees) <= 0) {
//       newErrors.attendees = "Number of attendees must be greater than 0";
//     }

//     // Confirmation validation
//     if (!formData.confirmation) {
//       newErrors.confirmation = "You must confirm this declaration";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//   const isFormValid = () => {
//     return (
//       formData.name.trim() !== "" &&
//       formData.company.trim() !== "" &&
//       formData.email.trim() !== "" &&
//       emailRegex.test(formData.email) &&
//       formData.phone.trim() !== "" &&
//       formData.interest !== "" &&
//       formData.attendees.trim() !== "" &&
//       parseInt(formData.attendees) > 0 &&
//       formData.confirmation
//     );
//   };

//   const handleSubmit = (e) => {
//     console.log('e: ', e);
//     e.preventDefault();

//     if (!validateForm()) {
//       console.log('validateForm: ', validateForm);
//       return;
//     }
//     setIsSubmitting(true);
//     const finalData = new FormData();
//     finalData.append("userName", formData.name);
//     finalData.append("userCompany", formData.company);
//     finalData.append("userEmail", formData.email);
//     finalData.append("userMobile", `${formData.countryCode}${formData.phone}`);
//     finalData.append("userInterest", formData.interest);
//     finalData.append("noOfAttandees", formData.attendees);
//     if (formData?.message.length > 0) {
//       finalData.append("userMessage", JSON.stringify(formData.message));
//     }
//     const requestOptions = {
//       method: "POST",
//       body: finalData,
//     };

//     fetch("https://www.linq-staging-site.com/admin1/adduserpassrequest", requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status) {
//           toast.success("Record Added Successfully.", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//           setFormData({
//             name: "",
//             company: "",
//             email: "",
//             countryCode: "+1",
//             phone: "",
//             interest: "",
//             attendees: "",
//             message: "",
//             confirmation: false,
//           });
//           setErrors({});
//           setIsSubmitting(false);
//         } else {
//           toast.error(data?.message);
//         }
//       })
//       .catch((error) => {
//         console.log("error: ", error);
//         toast.error("There was an error, Please try again later.", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       });
//   };

//   // Handle ESC key press
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === "Escape" && isPopupOpen) {
//         closePopup();
//       }
//     };

//     document.addEventListener("keydown", handleKeyPress);
//     return () => document.removeEventListener("keydown", handleKeyPress);
//   }, [isPopupOpen]);

//   // Prevent background scrolling when popup is open
//   useEffect(() => {
//     if (isPopupOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isPopupOpen]);

//   const increaseQuantity = (cardId) => {
//     setCardCounts((prev) => ({
//       ...prev,
//       [cardId]: (prev[cardId] || 1) + 1,
//     }));
//   };

//   const decreaseQuantity = (cardId) => {
//     setCardCounts((prev) => ({
//       ...prev,
//       [cardId]: Math.max((prev[cardId] || 1) - 1, 1),
//     }));
//   };

//   const increaseQuantityEarlyBird = () => setCountEarlyBird((prev) => prev + 1);
//   const decreaseQuantityEarlyBird = () =>
//     setCountEarlyBird((prev) => (prev > 1 ? prev - 1 : 1));

//   const increaseQuantityRegularPrice = () =>
//     setCountRegularPrice((prev) => prev + 1);
//   const decreaseQuantityRegularPrice = () =>
//     setCountRegularPrice((prev) => (prev > 1 ? prev - 1 : 1));

//   return (
//     <>
//       <Navbar forceScrolled />
//       <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
//         <article>
//           <section className="RegisterNow_container__Hy2rO">
//             <div>
//               <h1>Register Now</h1>
//               <p>
//                 <span>delegate package:</span>
//                 For all single and group delegates passes not part of any
//                 sponsorship or exhibition package. Package Includes:
//               </p>
//               <div className="RegisterNow_registerCards__tVJkv">
//                 <div className="RegisterNow_registerCard__Aryct">
//                   <div>
//                     <img
//                       src={fullaccess}
//                       alt="Full access to all conference days"
//                     ></img>
//                   </div>
//                   <p>Full access to all conference days</p>
//                 </div>
//                 <div className="RegisterNow_registerCard__Aryct">
//                   <div>
//                     <img
//                       src={onlineaccess}
//                       alt="Online access to selected presentation materials"
//                     ></img>
//                   </div>
//                   <p>Online access to selected presentation materials</p>
//                 </div>
//                 <div className="RegisterNow_registerCard__Aryct">
//                   <div>
//                     <img
//                       src={networking}
//                       alt="Access to all networking activities"
//                     ></img>
//                   </div>
//                   <p>Access to all networking activities</p>
//                 </div>
//                 <div className="RegisterNow_registerCard__Aryct">
//                   <div>
//                     <img
//                       src={lunch}
//                       alt="Hosted luncheon and drinks reception"
//                     ></img>
//                   </div>
//                   <p>Hosted luncheon and drinks reception</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           <div className="BookingLanding_discountCards__RBbvs">
//             <div>
//               {delegatePackageList
//                 ?.slice() // create a shallow copy to avoid mutation
//                 .sort(
//                   (a, b) =>
//                     Number(a.deligatePackageShowOrder) -
//                     Number(b.deligatePackageShowOrder)
//                 ) // sort based on numeric value
//                 .map((card, index) => (
//                   <div key={index} className="DiscountCard_card__vmnqL">
//                     <h3
//                       style={{
//                         backgroundColor:
//                           card.deligatePackageStatus === "available"
//                             ? "var(--dark-color)"
//                             : "#7c7c7c",
//                       }}
//                     >
//                       {card?.deligatePackageName}
//                       <svg
//                         fill={
//                           card.deligatePackageStatus === "available"
//                             ? "var(--dark-color)"
//                             : "#808080"
//                         }
//                         height="25px"
//                         width="25px"
//                         viewBox="0 0 386.257 386.257"
//                       >
//                         <polygon points="0,96.879 193.129,289.379 386.257,96.879"></polygon>
//                       </svg>
//                     </h3>
//                     <h2
//                       style={{
//                         backgroundColor:
//                           card.deligatePackageStatus === "available"
//                             ? "var(--primary-color)"
//                             : "#b2b2b2",
//                       }}
//                     >
//                       <sup>{eventGeneralSettings?.currencySymbol}</sup>
//                       {card?.deligatePackagePrice}
//                     </h2>
//                     <div>
//                       <p>Select number of Delegates</p>
//                       <div className="DiscountCard_counter__BHW0i">
//                         <button
//                           disabled={card.deligatePackageStatus !== "available"}
//                           style={{ backgroundColor: card.deligatePackageStatus !== "available" ? "#d1d1d1" : "#b0b0b0" }}
//                           onClick={() => decreaseQuantity(card.id || index)}
//                         >
//                           -
//                         </button>
//                         <p style={{ color: card.deligatePackageStatus !== "available" ? "#808080" : "#000" }}>
//                           {cardCounts[card.id || index] || 0}
//                         </p>
//                         <button
//                           disabled={card.deligatePackageStatus !== "available"}
//                           style={{ backgroundColor: card.deligatePackageStatus !== "available" ? "#d1d1d1" : "#b0b0b0" }}
//                           onClick={() => increaseQuantity(card.id || index)}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <button
//                       disabled={card.deligatePackageStatus !== "available"}
//                       onClick={() => {
//                         if (card.deligatePackageStatus === "available") {
//                           // Navigate with selected card
//                           navigate("/booking-form", {
//                             state: {
//                               selectedCard: card,
//                               quantity: cardCounts[card.id || index] || 1,
//                             },
//                           });
//                         }
//                       }}
//                       className="DiscountCard_btn__PcdQu"
//                       style={{
//                         backgroundColor:
//                           card.deligatePackageStatus === "available"
//                             ? "#000000"
//                             : "#7c7c7c",
//                         borderColor:
//                           card.deligatePackageStatus === "available"
//                             ? "#000000"
//                             : "#525252",
//                         cursor:
//                           card.deligatePackageStatus === "available"
//                             ? "pointer"
//                             : "not-allowed",
//                       }}
//                     >
//                       <svg
//                         fill={
//                           card.deligatePackageStatus === "available"
//                             ? "#000000"
//                             : "#808080"
//                         }
//                         height="25px"
//                         width="25px"
//                         viewBox="0 0 386.257 386.257"
//                       >
//                         <polygon points="0,96.879 193.129,289.379 386.257,96.879"></polygon>
//                       </svg>
//                       {card.deligatePackageStatus === "available"
//                         ? "Register Now"
//                         : card.deligatePackageStatus === "soldOut"
//                           ? "Sold Out"
//                           : "Coming Soon"}
//                     </button>
//                   </div>
//                 ))}
//             </div>
//           </div>
//           <div className="BookingLanding_operators__28yhC">
//             <div>
//               <img src={icon} alt="Operators"></img>
//               <div>
//                 <h2>DISCOUNTS AVAILABLE FOR UTILITIES</h2>
//                 <button onClick={openPopup}>UTILITIES GROUP PASS</button>
//               </div>
//             </div>
//           </div>
//         </article>
//       </div>
//       <LogoCarousel />
//       <SubscribeForm />
//       <Footer />
//       {isPopupOpen && (
//         <div className="ReactModalPortal">
//           <div
//             className="ReactModal__Overlay ReactModal__Overlay--after-open"
//             style={{
//               position: "fixed",
//               inset: "0px",
//               backgroundColor: "rgba(255, 255, 255, 0.75)",
//             }}
//             onClick={(e) => e.target === e.currentTarget && closePopup()}
//           >
//             <div
//               className="ReactModal__Content ReactModal__Content--after-open BookingLanding_modalBox__VQ10Q"
//               tabIndex={-1}
//               role="dialog"
//               aria-label="Example Modal"
//               aria-modal="true"
//             >
//               <div className="BookingLanding_topBar__3rx3v">
//                 <button onClick={closePopup}>
//                   <svg
//                     width="21"
//                     height="21"
//                     viewBox="0 0 21 21"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M12.4037 10.5L20.6054 2.29826C21.1314 1.77231 21.1316 0.920701 20.6054 0.394633C20.0794 -0.131476 19.2279 -0.131599 18.7017 0.394592L10.5 8.59635L2.29826 0.394633C1.77231 -0.131435 0.920664 -0.131599 0.394597 0.394551C-0.131512 0.920619 -0.131553 1.77211 0.394597 2.29821L8.59626 10.5L0.394556 18.7017C-0.130322 19.2266 -0.130322 20.0806 0.394556 20.6054C0.920582 21.1315 1.77215 21.1316 2.29822 20.6054L10.4999 12.4036L18.7016 20.6053C19.2276 21.1314 20.0792 21.1315 20.6052 20.6053C21.1314 20.0793 21.1315 19.2278 20.6053 18.7016L12.4037 10.5Z"></path>
//                   </svg>
//                 </button>
//               </div>
//               <div className="BookingLanding_modalContainer__5foGo end-user-modal-container">
//                 <h2>END-USER PASS REGISTRATION</h2>
//                 <form action="#" data-hs-cf-bound="true" onSubmit={handleSubmit}>
//                   <div>
//                     <div>
//                       <input
//                         name="name"
//                         type="text"
//                         placeholder="Name *"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                       ></input>
//                       {errors.name && <div>{errors.name}</div>}
//                     </div>
//                     <div>
//                       <input
//                         name="company"
//                         type="text"
//                         placeholder="Company *"
//                         value={formData.company}
//                         onChange={handleInputChange}
//                       ></input>
//                       {errors.company && <div>{errors.company}</div>}
//                     </div>
//                   </div>
//                   <div>
//                     <div>
//                       <input
//                         name="email"
//                         type="text"
//                         placeholder="Email *"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                       ></input>
//                       {errors.email && <div>{errors.email}</div>}
//                     </div>
//                     <div className="flagInputContainer">
//                       <PhoneInput
//                         country={"us"}
//                         value={formData.phone}
//                         onChange={(value, country, e, formattedValue) => {
//                           setFormData((prev) => ({
//                             ...prev,
//                             countryCode: `+${country.dialCode}`,
//                             phone: value,
//                           }));
//                         }}
//                         containerClass="flagInput"
//                       />
//                       {errors.phone && <div>{errors.phone}</div>}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="operator_select">
//                       <select
//                         name="interest"
//                         id="interestedIn"
//                         style={{ appearance: "none" }}
//                         value={formData.interest}
//                         onChange={handleInputChange}
//                       >
//                         <option value="" disabled hidden>
//                           Our primary interest
//                         </option>
//                         <option value="Speaking on a topic">
//                           Speaking on a topic
//                         </option>
//                         <option value="Showcasing at the exhibition">
//                           Showcasing at the exhibition
//                         </option>
//                         <option value="Attending the show">
//                           Attending the show
//                         </option>
//                       </select>
//                       {errors.interest && <div>{errors.interest}</div>}
//                     </div>
//                     <div>
//                       <input
//                         className="no-arrows"
//                         name="attendees"
//                         type="number"
//                         placeholder="Number of attendees *"
//                         value={formData.attendees}
//                         onChange={handleInputChange}
//                       ></input>
//                       {errors.attendees && <div>{errors.attendees}</div>}
//                     </div>
//                   </div>
//                   <div>
//                     <textarea
//                       name="message"
//                       cols={30}
//                       rows={6}
//                       placeholder="Message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                     ></textarea>
//                   </div>
//                   <div className="BookingLanding_notice__vNnfd">
//                     <p>
//                       Please note that submitting a registration for a
//                       complimentary pass is subject to review and does not
//                       guarantee a free pass.
//                       <br></br>
//                       Our team will evaluate each application to ensure it meets
//                       the criteria for industry buyers. Thank you for your
//                       cooperation.
//                     </p>
//                   </div>
//                   <div className="BookingLanding_formCheck__vu-QU">
//                     <div>
//                       <input
//                         name="confirmation"
//                         type="checkbox"
//                         id="declare"
//                         checked={formData.confirmation}
//                         onChange={handleInputChange}
//                       ></input>
//                       <label for="confirmation">
//                         I confirm that the organization which I will represent
//                         at this event are end-users for the related industry.
//                       </label>
//                     </div>
//                     {errors.confirmation && <div>{errors.confirmation}</div>}
//                   </div>
//                   <div className="BookingLanding_btnContainer__C+nke">
//                     <button
//                       type="submit"
//                       className="BookingLanding_button__YtJxy"
//                     >
//                       {isSubmitting ? "Submitting..." : "Submit"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default Register;

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "../../src/assets/css/register.css"; // ✅ CSS moved inside src/assets/css/
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import LogoCarousel from "./LogoCarousel";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApiData } from "../../src/common/ApiContext";
import { useSSRData } from "../common/useSSRData";
import { usePageSeo } from "../common/usePageSeo";
const icon = "/images/WebCommonImages/group-icon.png"
const Register = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false);
  const [isSubmittedMessage, setIsSubmittedMessage] = useState(false);
  // ✅ Initialize from SSR data (direct URL load) or fetch client-side (button navigation)
  const [delegatePackageList, setDelegatePackageList] = useState(
    () => (typeof window !== "undefined" && window.__INITIAL_DATA__?.delegatePackages) || []
  );
  const [cardCounts, setCardCounts] = useState({});
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    countryCode: "+1",
    phone: "",
    interest: "",
    attendees: "",
    message: "",
    confirmation: false,
  });

  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Client-side fallback: fetch delegate packages when arriving via button/link click
  // (window.__INITIAL_DATA__ is not updated on React Router client-side navigation)
  useEffect(() => {
    if (delegatePackageList.length > 0) return; // already populated from SSR
    fetch("https://www.linq-staging-site.com/admin1/deligatepackageslist")
      .then((r) => r.json())
      .then((data) => {
        if (data?.status && data.delegatePackages) {
          setDelegatePackageList(data.delegatePackages);
        }
      })
      .catch(() => { });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // openPopup / closePopup
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setFormData({
      name: "",
      company: "",
      email: "",
      countryCode: "+1",
      phone: "",
      interest: "",
      attendees: "",
      message: "",
      confirmation: false,
    });
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Enter valid email";
    if (!formData.phone.trim()) newErrors.phone = "Mobile number is required";
    if (!formData.interest) newErrors.interest = "Please select an option";
    if (!formData.attendees.trim())
      newErrors.attendees = "Number of attendees is required";
    else if (parseInt(formData.attendees) <= 0)
      newErrors.attendees = "Number of attendees must be greater than 0";
    if (!formData.confirmation)
      newErrors.confirmation = "You must confirm this declaration";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setIsSubmittingMessage(true);

    const finalData = new FormData();
    setTimeout(() => {
      finalData.append("userName", formData.name);
      finalData.append("userCompany", formData.company);
      finalData.append("userEmail", formData.email);
      finalData.append("userMobile", `${formData.countryCode}${formData.phone}`);
      finalData.append("userInterest", formData.interest);
      finalData.append("noOfAttandees", formData.attendees);
      if (formData.message.length > 0) {
        finalData.append("userMessage", JSON.stringify(formData.message));
      }
      setIsSubmittingMessage(false);
    }, 2000);

    setTimeout(() => {
      setIsSubmittedMessage(true);
      fetch("https://www.linq-staging-site.com/admin1/adduserpassrequest", {
        method: "POST",
        body: finalData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            // toast.success("Record Added Successfully!");
            closePopup();
          } else {
            // toast.error(data.message || "Submission failed.");
          }
        })
        .catch(() => console.log('Error'))
        .finally(() => { setIsSubmitting(false); setIsSubmittingMessage(false); setIsSubmittedMessage(false); });
    }, 2000)
  };

  // ESC key to close popup
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" && isPopupOpen) closePopup();
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isPopupOpen]);

  // Disable scroll when popup open
  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isPopupOpen]);

  // Quantity controls
  const increaseQuantity = (id) =>
    setCardCounts((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decreaseQuantity = (id) =>
    setCardCounts((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));

  const renderPrice = (card) => {
    const position = eventGeneralSettings?.currencyPosition;
    const symbol = eventGeneralSettings?.currencySymbol;
    const price = card?.deligatePackagePrice;

    if (position === "Top-Left") {
      return (
        <>
          <sup>{symbol}</sup>
          {price}
        </>
      );
    }

    if (position === "Top-Right") {
      return (
        <>
          {price}
          <sup>{symbol}</sup>
        </>
      );
    }

    if (position === "Bottom-Left") {
      return (
        <>
          <sup style={{ verticalAlign: "sub", marginTop: "18px" }}>{symbol}</sup>
          {price}
        </>
      );
    }

    if (position === "Bottom-Right") {
      return (
        <>
          {price}
          <sup style={{ verticalAlign: "sub", marginTop: "18px" }}>{symbol}</sup>
        </>
      );
    }

    // fallback
    return (
      <>
        <sup>{symbol}</sup>
        {price}
      </>
    );
  };

  const pageSeo = usePageSeo("booking");
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
        <link rel="canonical" href="https://www.linq-staging-site.com/booking" />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        <article>
          <section className="RegisterNow_container__Hy2rO">
            <div>
              <h1>Register Now</h1>
              <p>
                <span>delegate package:</span> For all single and group
                delegates passes not part of any sponsorship or exhibition
                package. Package Includes:
              </p>

              {/* Package icons */}
              <div className="RegisterNow_registerCards__tVJkv">
                {[
                  {
                    src: "/images/icon-full-access.png",
                    alt: "Full access",
                    text: "Full access to all conference days",
                  },
                  {
                    src: "/images/icon-online-access.png",
                    alt: "Online access",
                    text: "Online access to presentation materials",
                  },
                  {
                    src: "/images/icon-networking.png",
                    alt: "Networking",
                    text: "Access to all networking activities",
                  },
                  {
                    src: "/images/icon-luncheon.png",
                    alt: "Luncheon",
                    text: "Hosted luncheon and drinks reception",
                  },
                ].map((card, i) => (
                  <div key={i} className="RegisterNow_registerCard__Aryct">
                    <div>
                      <img src={card.src} alt={card.alt} />
                    </div>
                    <p>{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Delegate packages */}
          <div className="BookingLanding_discountCards__RBbvs">
            {" "}
            <div>
              {delegatePackageList
                ?.slice() // create a shallow copy to avoid mutation
                .sort(
                  (a, b) =>
                    Number(a.deligatePackageShowOrder) -
                    Number(b.deligatePackageShowOrder),
                ) // sort based on numeric value
                .map((card, index) => (
                  <div key={index} className="DiscountCard_card__vmnqL">
                    <h3
                      style={{
                        backgroundColor:
                          card.deligatePackageStatus === "available"
                            ? "var(--dark-color)"
                            : "#7c7c7c",
                      }}
                    >
                      {card?.deligatePackageName}
                      <svg
                        fill={
                          card.deligatePackageStatus === "available"
                            ? "var(--dark-color)"
                            : "#808080"
                        }
                        height="25px"
                        width="25px"
                        viewBox="0 0 386.257 386.257"
                      >
                        <polygon points="0,96.879 193.129,289.379 386.257,96.879"></polygon>
                      </svg>
                    </h3>
                    <h2
                      style={{
                        backgroundColor:
                          card.deligatePackageStatus === "available"
                            ? "var(--primary-color)"
                            : "#b2b2b2",
                      }}
                    >
                      {renderPrice(card)}
                    </h2>
                    <div>
                      <p>Select number of Delegates</p>
                      <div className="DiscountCard_counter__BHW0i">
                        <button
                          disabled={card.deligatePackageStatus !== "available"}
                          style={{
                            backgroundColor:
                              card.deligatePackageStatus !== "available"
                                ? "#d1d1d1"
                                : "#b0b0b0",
                          }}
                          onClick={() => decreaseQuantity(card.id || index)}
                        >
                          -
                        </button>
                        <p
                          style={{
                            color:
                              card.deligatePackageStatus !== "available"
                                ? "#808080"
                                : "#000",
                          }}
                        >
                          {cardCounts[card.id || index] || 1}
                        </p>
                        <button
                          disabled={card.deligatePackageStatus !== "available"}
                          style={{
                            backgroundColor:
                              card.deligatePackageStatus !== "available"
                                ? "#d1d1d1"
                                : "#b0b0b0",
                          }}
                          onClick={() => increaseQuantity(card.id || index)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <a
                      href={card.deligatePackageStatus === "available" ? "/booking-form" : '/booking'}
                      onClick={(e) => {
                        if (card.deligatePackageStatus !== "available") return;
                        e.preventDefault();
                        navigate("/booking-form", {
                          state: {
                            selectedCard: card,
                            quantity: cardCounts[card.id || index] || 1,
                          },
                        });
                      }}
                      className={`DiscountCard_btn__PcdQu ${card.deligatePackageStatus !== "available" ? "DiscountCard_disabledBtn__3A6ua" : ""}`}
                    >
                      <svg
                        fill={
                          card.deligatePackageStatus === "available"
                            ? "var(--secondary-color)"
                            : "#7c7c7c"
                        }
                        height="25px"
                        width="25px"
                        viewBox="0 0 386.257 386.257"
                      >
                        <polygon points="0,96.879 193.129,289.379 386.257,96.879"></polygon>
                      </svg>
                      {card.deligatePackageStatus === "available"
                        ? "Register Now"
                        : card.deligatePackageStatus === "soldOut"
                          ? "Sold Out"
                          : "Coming Soon"}
                    </a>
                  </div>
                ))}
            </div>
          </div>
          <div className="BookingLanding_operators__28yhC">
            <div>
              <img src={icon} alt="Operators"></img>
              <div>
                <h2>DISCOUNTS AVAILABLE FOR UTILITIES</h2>
                <button onClick={openPopup}>UTILITIES GROUP PASS</button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <LogoCarousel />
      <SubscribeForm />
      <Footer />
      {/* Popup form */}
      {isPopupOpen && (
        <div className="ReactModalPortal">
          <div
            className="ReactModal__Overlay ReactModal__Overlay--after-open"
            style={{
              position: "fixed",
              inset: "0px",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            }}
            onClick={(e) => e.target === e.currentTarget && closePopup()}
          >
            <div
              className="ReactModal__Content ReactModal__Content--after-open BookingLanding_modalBox__VQ10Q"
              tabIndex={-1}
              role="dialog"
              aria-label="Example Modal"
              aria-modal="true"
            >
              <div className="BookingLanding_topBar__3rx3v">
                <button onClick={closePopup}>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.4037 10.5L20.6054 2.29826C21.1314 1.77231 21.1316 0.920701 20.6054 0.394633C20.0794 -0.131476 19.2279 -0.131599 18.7017 0.394592L10.5 8.59635L2.29826 0.394633C1.77231 -0.131435 0.920664 -0.131599 0.394597 0.394551C-0.131512 0.920619 -0.131553 1.77211 0.394597 2.29821L8.59626 10.5L0.394556 18.7017C-0.130322 19.2266 -0.130322 20.0806 0.394556 20.6054C0.920582 21.1315 1.77215 21.1316 2.29822 20.6054L10.4999 12.4036L18.7016 20.6053C19.2276 21.1314 20.0792 21.1315 20.6052 20.6053C21.1314 20.0793 21.1315 19.2278 20.6053 18.7016L12.4037 10.5Z"></path>
                  </svg>
                </button>
              </div>
              <div className="BookingLanding_modalContainer__5foGo end-user-modal-container">
                <h2>END-USER PASS REGISTRATION</h2>
                <form action="#" data-hs-cf-bound="true" onSubmit={handleSubmit}>
                  <div>
                    <div>
                      <input
                        name="name"
                        type="text"
                        placeholder="Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                      ></input>
                      {errors.name && <div>{errors.name}</div>}
                    </div>
                    <div>
                      <input
                        name="company"
                        type="text"
                        placeholder="Company *"
                        value={formData.company}
                        onChange={handleInputChange}
                      ></input>
                      {errors.company && <div>{errors.company}</div>}
                    </div>
                  </div>
                  <div>
                    <div>
                      <input
                        name="email"
                        type="text"
                        placeholder="Email *"
                        value={formData.email}
                        onChange={handleInputChange}
                      ></input>
                      {errors.email && <div>{errors.email}</div>}
                    </div>
                    <div className="flagInputContainer">
                      <PhoneInput
                        country={"us"}
                        value={formData.phone}
                        onChange={(value, country, e, formattedValue) => {
                          setFormData((prev) => ({
                            ...prev,
                            countryCode: `+${country.dialCode}`,
                            phone: value,
                          }));
                          setErrors((prev) => ({
                            ...prev,
                            phone: "",
                          }));
                        }}
                        containerClass="flagInput"
                      />
                      {errors.phone && <div>{errors.phone}</div>}
                    </div>
                  </div>
                  <div>
                    <div className="operator_select">
                      <select
                        name="interest"
                        id="interestedIn"
                        style={{ appearance: "none" }}
                        value={formData.interest}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled hidden>
                          Our primary interest
                        </option>
                        <option value="Speaking on a topic">
                          Speaking on a topic
                        </option>
                        <option value="Showcasing at the exhibition">
                          Showcasing at the exhibition
                        </option>
                        <option value="Attending the show">
                          Attending the show
                        </option>
                      </select>
                      {errors.interest && <div>{errors.interest}</div>}
                    </div>
                    <div>
                      <input
                        className="no-arrows"
                        name="attendees"
                        type="number"
                        placeholder="Number of attendees *"
                        value={formData.attendees}
                        onChange={handleInputChange}
                      ></input>
                      {errors.attendees && <div>{errors.attendees}</div>}
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="message"
                      cols={30}
                      rows={6}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="BookingLanding_notice__vNnfd">
                    <p>
                      Please note that submitting a registration for a
                      complimentary pass is subject to review and does not
                      guarantee a free pass.
                      <br></br>
                      Our team will evaluate each application to ensure it meets
                      the criteria for industry buyers. Thank you for your
                      cooperation.
                    </p>
                  </div>
                  <div className="BookingLanding_formCheck__vu-QU">
                    <div>
                      <input
                        name="confirmation"
                        type="checkbox"
                        id="declare"
                        checked={formData.confirmation}
                        onChange={handleInputChange}
                      ></input>
                      <label for="confirmation">
                        I confirm that the organization which I will represent
                        at this event are end-users for the related industry.
                      </label>
                    </div>
                    {errors.confirmation && <div>{errors.confirmation}</div>}
                  </div>
                  <div className="BookingLanding_btnContainer__C+nke">
                    <button
                      type="submit"
                      className="BookingLanding_button__YtJxy"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                {isSubmittingMessage && (
                  <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>Submitting...</p>
                )}
                {isSubmittedMessage && (
                  <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>Form Submitted Successfully</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
