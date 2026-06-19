import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countryList from "react-select-country-list";
import { useNavigate } from "react-router-dom";
import "../assets/css/RemindMe.css";
import TextField from "@mui/material/TextField";
import { getNames } from "country-list";
import Autocomplete from "@mui/material/Autocomplete";
import { MuiTelInput } from "mui-tel-input";
import Button from "@mui/material/Button";
import { FormControl, FormHelperText } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useApiData } from "../common/ApiContext";
import { usePageSeo } from "../common/usePageSeo";
import API_BASE_URL from '../config/apiConfig';
const countries = getNames();

const RemindMeLater = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPackage = location?.state?.selectedCard;
  const selectedQty = location?.state?.quantity;
  const phoneInputRef = useRef(null);
  const createDelegate = (id) => ({
    id,
    firstName: "",
    lastName: "",
    position: "",
    email: "",
    mobile: "",
  });
  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
    navLogos
  } = useApiData();

  // Initialize delegates based on selectedQty
  const initializeDelegates = () => {
    if (selectedQty === 0 || !selectedQty) {
      // If selectedQty is 0 or undefined/null, create one delegate
      return [createDelegate(1)];
    } else {
      // If selectedQty is 1 or greater, create selectedQty number of delegates
      const delegatesArray = [];
      for (let i = 1; i <= selectedQty; i++) {
        delegatesArray.push(createDelegate(i));
      }
      return delegatesArray;
    }
  };

  const [delegates, setDelegates] = useState(initializeDelegates());

  const [delegateCount, setDelegateCount] = useState(
    selectedQty && selectedQty > 0 ? selectedQty : 1
  );

  const portalId = "4000965";
  const formGuid = "1e2e18e4-1877-4d07-9a22-6c2dbca5c2f8";

  useEffect(() => {
    const initialDelegates = initializeDelegates();
    setDelegates(initialDelegates);
    setDelegateCount(selectedQty && selectedQty > 0 ? selectedQty : 1);
  }, [selectedQty]);

  const [companyData, setCompanyData] = useState({
    companyName: "",
    webAddress: "",
    address: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [companyErrors, setCompanyErrors] = useState({
    companyName: false,
    webAddress: false,
    address: false,
    country: false,
    city: false,
    state: false,
    postalCode: false,
  });
  // Delegate validation errors
  const [delegateErrors, setDelegateErrors] = useState({});
  // Terms agreement validation
  const [termsError, setTermsError] = useState(false);
  // Form submission attempted flag
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [termsAgreement, setTermsAgreement] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Get country options from react-select-country-list
  const countryOptions = [
    { value: "", label: "Select a country" },
    ...countryList().getData(),
  ];

  const handleCompanyDataChange = (field, value) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field becomes valid (only if form submission was attempted)
    if (companyErrors[field]) {
      setCompanyErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };
  // Handle delegate data changes
  const handleDelegateChange = (delegateId, field, value) => {
    setDelegates((prev) =>
      prev.map((delegate) =>
        delegate.id === delegateId ? { ...delegate, [field]: value } : delegate
      )
    );

    // Clear validation error for this field (only if form submission was attempted)
    if (submitAttempted) {
      const errorKey = `delegate_${delegateId}_${field}`;
      if (value.trim() !== "" || (field === "email" && isValidEmail(value))) {
        setDelegateErrors((prev) => ({
          ...prev,
          [errorKey]: false,
        }));
      }
    }
  };

  const addDelegate = () => {
    const newDelegateId = delegateCount + 1;
    const newDelegate = createDelegate(newDelegateId);

    setDelegates((prev) => [...prev, newDelegate]);
    setDelegateCount(newDelegateId);
  };

  // Remove delegate
  const removeDelegate = (delegateId) => {
    setDelegates((prev) =>
      prev.filter((delegate) => delegate.id !== delegateId)
    );

    // Remove errors for this delegate
    if (submitAttempted) {
      setDelegateErrors((prev) => {
        const newErrors = { ...prev };
        Object.keys(newErrors).forEach((key) => {
          if (key.startsWith(`delegate_${delegateId}_`)) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });
    }
  };

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newCompanyErrors = {};
    const newDelegateErrors = {};
    let isValid = true;

    // Validate company data
    const requiredCompanyFields = [
      "companyName",
      "address",
      "country",
      "city",
      "postalCode",
    ];

    requiredCompanyFields.forEach((field) => {
      if (!companyData[field] || !companyData[field].trim()) {
        newCompanyErrors[field] = true;
        isValid = false;
      } else {
        newCompanyErrors[field] = false;
      }
    });

    delegates.forEach((delegate) => {
      const requiredDelegateFields = [
        "firstName",
        "lastName",
        "position",
        "email",
        "mobile",
      ];

      requiredDelegateFields.forEach((field) => {
        const errorKey = `delegate_${delegate.id}_${field}`;
        if (!delegate[field] || !delegate[field].trim()) {
          newDelegateErrors[errorKey] = true;
          isValid = false;
        } else if (field === "email" && !isValidEmail(delegate[field])) {
          newDelegateErrors[errorKey] = true;
          isValid = false;
        } else {
          newDelegateErrors[errorKey] = false;
        }
      });
    });

    // Validate terms agreement
    if (!termsAgreement) {
      setTermsError(true);
      isValid = false;
    } else {
      setTermsError(false);
    }

    // Add your delegate validation logic here...
    // (your existing delegate validation code)

    // SET THE STATE - This was missing!
    setCompanyErrors(newCompanyErrors);
    setDelegateErrors(newDelegateErrors); // if you have this state

    return isValid;
  };

  const dispositionKey = eventDetails?.hubspotDisposition; // e.g. "disposition_wdrm_2025"
  const emailStatusKey = eventDetails?.hubspotEmailStatus;


  // Helper function to get delegate field error
  const getDelegateFieldError = (delegateId, field) => {
    const errorKey = `delegate_${delegateId}_${field}`;
    return submitAttempted && delegateErrors[errorKey];
  };

  // Helper function to get delegate field error message
  const getDelegateFieldErrorMessage = (delegateId, field) => {
    const hasError = getDelegateFieldError(delegateId, field);
    if (!hasError) return "";

    switch (field) {
      case "firstName":
        return "First name is required";
      case "lastName":
        return "Last name is required";
      case "position":
        return "Position is required";
      case "email":
        const delegate = delegates.find((d) => d.id === delegateId);
        if (!delegate?.email || !delegate.email.trim()) {
          return "Email address is required";
        } else if (!isValidEmail(delegate.email)) {
          return "Please enter a valid email address";
        }
        return "";
      case "mobile":
        return "Mobile number is required";
      default:
        return "";
    }
  };

  const [showTextarea, setShowTextarea] = useState(false);

  const pageSeo = usePageSeo("remind-me");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDesc = pageSeo.pageMetaDescription;
  const seoImage = pageSeo.pageOgImage || null;

  return (
    <div id="root">
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
        <link rel="canonical" href=`${API_BASE_URL}/remind-me-later` />
      </Helmet>
      <div className="PageForm_container__NA5Wr">
        <div className="PageForm_header__7W2Cz">
          <div
            className="PageForm_headerInner__sdlhn"
            style={{ maxWidth: "1070px" }}
          >
            <img onClick={() => { window.location.href = "/"; }} src={navLogos?.whiteLogo} alt="site logo"></img>
          </div>
        </div>
        <div className="RemindMeLater_container__vWyw0">
          <h1>Remind Me</h1>
          <div className="RemindMeLater_addOns__nEVDz">
            <div className="RemindMeLater_bar__tC12c">
              <h2>Your thoughts on attending?</h2>.
            </div>
            <div className="cmxform" id="developForm">
              <form id="LDZ-(Remind me Later 2026)" data-hs-cf-bound="true">
                <div className="RemindMeLater_addOnsInner__aBNYF">
                  <div>
                    <h2>I have not registered yet, because:</h2>
                    <div>
                      <div>
                        <input type="checkbox" name="checkbox1"></input>
                        <label>I'm checking my diary to see if I am available</label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input type="checkbox" name="checkbox2"></input>
                        <label>I'm waiting on colleagues to confirm their attendance</label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input type="checkbox" name="checkbox3"></input>
                        <label>I'll be booking closer to the time</label>
                      </div>
                    </div>
                    <div className="RemindMeLater_otherContainer__y+rku">
                      <div>
                        <input type="checkbox" name="others" checked={showTextarea} onChange={(e) => setShowTextarea(e.target.checked)}></input>
                        <label>Others</label>
                      </div>
                      {showTextarea && (
                        <textarea name="others"></textarea>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 style={{ marginTop: '20px' }}>I am mostly interested in:</h2>
                    <div>
                      <div>
                        <input type="checkbox" name="checkbox4"></input>
                        <label>Speaking opportunities</label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input type="checkbox" name="checkbox5"></input>
                        <label>Sponsorships and exhibition booths</label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <input type="checkbox" name="checkbox6"></input>
                        <label>Delegate passes only</label>
                      </div>
                    </div>
                  </div>
                  <div className="RemindMeLater_emailContainer__GGz3-">
                    <div>
                      <input type="text" name="email" placeholder="Email Address (Required)"></input>
                    </div>
                    <button type="submit">Remind Me</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="PageForm_footer__hOO1l">
          <div
            className="PageForm_footerInner__5Enax"
            style={{ maxWidth: "1070px" }}
          >
            <p>
              <span onClick={() => window.open("/privacy-policy", "_blank")}>
                Privacy Policy
              </span>
              <span className="PageForm_divide__vwhn0">|</span>
              <span onClick={() => window.open("/cookie-policy", "_blank")}>
                Cookie Policy
              </span>
              <span className="PageForm_divide__vwhn0">|</span>
              <span onClick={() => window.open("https://iq-hub.com/", "_blank")}>
                IQ International PTe.LTD
              </span>
            </p>
            <p>©2026 Litihium Downstream Summit 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemindMeLater;
