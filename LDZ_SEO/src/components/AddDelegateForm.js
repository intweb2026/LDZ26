import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import "../assets/css/AddDelegateForm.css";
import "../../src/assets/css/BookingTicket.css";
import TextField from "@mui/material/TextField";
import { getNames } from "country-list";
import Autocomplete from "@mui/material/Autocomplete";
import { MuiTelInput } from "mui-tel-input";
import Button from "@mui/material/Button";
import { FormControl, FormHelperText } from "@mui/material";
import { useApiData } from "../../src/common/ApiContext";
import { useSSRData } from "../common/useSSRData";
import "../../src/assets/css/BookingForm.css";
import SimpleStripeForm from "./PaymentForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import plusIcon from "../assets/WebCommonImages/plus.png";
import closeBtn from "../assets/WebCommonImages/del-cross.png";
import toggle from "../assets/WebCommonImages/toggle.png";
import cardLabel from "../assets/WebCommonImages/card-labels.png";
import lockIcon from "../assets/WebCommonImages/lock.png";
import barcodeImage from "../../src/assets/WebCommonImages/hash_code.png";
import { Helmet } from "react-helmet-async";
import { usePageSeo } from "../common/usePageSeo";
const countries = getNames();

const CompanyRegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPackage = location?.state?.selectedCard;
  const selectedQty = location?.state?.quantity;
  const phoneInputRef = useRef(null);
  const toEmails = useSSRData("toEmails") || "benny.scott@iq-hub.com";
  const { eventDetails, eventGeneralSettings, navLogos } = useApiData();

  // ─── Step transition state ─────────────────────────────────────────────────
  const [showStep2, setShowStep2] = useState(false);
  const [step2Data, setStep2Data] = useState(null);

  // ─── Step 3 state ─────────────────────────────────────────────────────────
  const [showStep3, setShowStep3] = useState(false);
  const [step3EngagementOptions, setStep3EngagementOptions] = useState({
    speaker: false,
    discussion: false,
    sponsor: false,
  });

  // ─── Step 2 state (from BookingForm) ──────────────────────────────────────
  const paymentFormRef = useRef(null);
  const discountInputRef = useRef(null);
  const [delegateAddOns, setDelegateAddOns] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountData, setDiscountData] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  const [iconSrcs, setIconSrcs] = useState({
    plusIcon: "",
    closeBtn: "",
    toggle: "",
    cardLabel: "",
    lockIcon: "",
  });
  useEffect(() => {
    setIconSrcs({
      plusIcon: plusIcon?.default || plusIcon || "",
      closeBtn: closeBtn?.default || closeBtn || "",
      toggle: toggle?.default || toggle || "",
      cardLabel: cardLabel?.default || cardLabel || "",
      lockIcon: lockIcon?.default || lockIcon || "",
    });
  }, []);

  const createDelegate = (id) => ({
    id,
    firstName: "",
    lastName: "",
    position: "",
    email: "",
    mobile: "",
  });

  const initializeDelegates = () => {
    if (selectedQty === 0 || !selectedQty) {
      return [createDelegate(1)];
    } else {
      const delegatesArray = [];
      for (let i = 1; i <= selectedQty; i++) {
        delegatesArray.push(createDelegate(i));
      }
      return delegatesArray;
    }
  };

  const [delegates, setDelegates] = useState(initializeDelegates());

  const [delegateCount, setDelegateCount] = useState(
    selectedQty && selectedQty > 0 ? selectedQty : 1,
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

  const [delegateErrors, setDelegateErrors] = useState({});
  const [termsError, setTermsError] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [termsAgreement, setTermsAgreement] = useState(false);
  const [submitBtnCheck, setSubmitBtnCheck] = useState(false);

  const pageSeo = usePageSeo("booking-form");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDesc = pageSeo.pageMetaDescription;
  const seoImage = pageSeo.pageOgImage || null;
  const canonicalUrl = "https://www.linq-staging-site.com/booking-form";

  const handleCompanyDataChange = (field, value) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (companyErrors[field]) {
      setCompanyErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  const handleDelegateChange = (delegateId, field, value) => {
    setDelegates((prev) =>
      prev.map((delegate) =>
        delegate.id === delegateId ? { ...delegate, [field]: value } : delegate,
      ),
    );
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

  const removeDelegate = (delegateId) => {
    setDelegates((prev) =>
      prev.filter((delegate) => delegate.id !== delegateId),
    );
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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newCompanyErrors = {};
    const newDelegateErrors = {};
    let isValid = true;

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

    if (!termsAgreement) {
      setTermsError(true);
      isValid = false;
    } else {
      setTermsError(false);
    }

    setCompanyErrors(newCompanyErrors);
    setDelegateErrors(newDelegateErrors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (validateForm()) {
      const formData = {
        company: companyData,
        delegates: delegates,
        termsAgreement: termsAgreement,
      };

      let invoiceNumber;
      try {
        const invoiceRes = await fetch(
          "https://www.linq-staging-site.com/admin1/generate-invoice-no",
        );
        const invoiceData = await invoiceRes.json();
        invoiceNumber = invoiceData.invoiceNo;
      } catch (error) {
        console.error("❌ Failed to generate invoice number:", error);
        alert("Could not generate invoice number. Please try again.");
        return;
      }

      const disposition = "Confirmed";
      const emailStatus = "Confirmed Old";

      setSubmitBtnCheck(true);

      async function submitCompanyDelegatesToHubSpot(formData) {
        const submissions = formData.delegates.map(async (delegate) => {
          const payload = {
            fields: [
              { name: "company", value: formData.company.companyName },
              { name: "state", value: formData.company.state },
              { name: "address", value: formData.company.address },
              { name: "country", value: formData.company.country },
              { name: "city", value: formData.company.city },
              { name: "zip", value: formData.company.postalCode },
              { name: "website", value: formData.company.webAddress },
              { name: "lastname", value: delegate.lastName },
              { name: "firstname", value: delegate.firstName },
              { name: "booking_form_phone_number", value: delegate.mobile },
              { name: "jobtitle", value: delegate.position },
              { name: "email", value: delegate.email },
              { name: "invoice_number", value: invoiceNumber },
              { name: "disposition_wdrm_2025", value: disposition },
              { name: "email_status_wdrm_2025", value: emailStatus },
            ],
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          };
          try {
            const response = await fetch(
              `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              },
            );
            const result = await response.json();
          } catch (error) {
            console.error(`❌ Error submitting ${delegate.firstName}:`, error);
          }
        });
        await Promise.all(submissions);
      }

      async function sendBookingEmail() {
        let htmlContent = `
        <div style='width: 60%; background-color: transparent; color: black;'>
          <table style='width: 100%; border-collapse: collapse;'>
            <tr><td colspan='2' style='font-weight: bold; padding: 8px; background-color: #f0f0f0;'>Company Details</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Company Name:</td><td style='width: 50%; padding: 8px;'>${companyData.companyName}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Web Address:</td><td style='width: 50%; padding: 8px;'>${companyData.webAddress}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Address:</td><td style='width: 50%; padding: 8px;'>${companyData.address}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>City:</td><td style='width: 50%; padding: 8px;'>${companyData.city}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Country:</td><td style='width: 50%; padding: 8px;'>${companyData.country}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Postal Code:</td><td style='width: 50%; padding: 8px;'>${companyData.postalCode}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>State:</td><td style='width: 50%; padding: 8px;'>${companyData.state}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Invoice no:</td><td style='width: 50%; padding: 8px;'>${invoiceNumber}</td></tr>
      `;
        delegates.forEach((delegate, index) => {
          htmlContent += `
            <tr><td colspan='2' style='font-weight: bold; padding: 8px; background-color: #f0f0f0;'>Delegate ${index + 1} Details:</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Email:</td><td style='width: 50%; padding: 8px;'>${delegate.email}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>First Name:</td><td style='width: 50%; padding: 8px;'>${delegate.firstName}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Last Name:</td><td style='width: 50%; padding: 8px;'>${delegate.lastName}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Phone Number:</td><td style='width: 50%; padding: 8px;'>${delegate.mobile}</td></tr>
            <tr><td style='width: 50%; padding: 8px;'>Position:</td><td style='width: 50%; padding: 8px;'>${delegate.position}</td></tr>
        `;
        });
        htmlContent += `</table></div>`;

        const emailPayload = {
          toemail: toEmails,
          cc: "",
          subject: `${eventDetails?.eventShortCode} - Booking Form Step 1`,
          html: htmlContent,
        };
        try {
          const emailResponse = await fetch(
            "https://www.linq-staging-site.com/admin1/sendmail",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(emailPayload),
            },
          );
          const emailResult = await emailResponse.json();
          if (emailResult.status === "success") {
            console.log("✅ Email sent successfully");
          } else {
            console.error("❌ Email sending failed:", emailResult.message);
          }
        } catch (error) {
          console.error("❌ Error sending email:", error);
        }
      }

      // async function submitToZoho() {
      //   const today = new Date();
      //   const dateFormatted = today.toLocaleDateString("en-US", {
      //     month: "short",
      //     day: "2-digit",
      //     year: "numeric",
      //   });
      //   const pacPrice = selectedPackage?.deligatePackagePrice;
      //   const numDelegates = delegates?.length;
      //   const preTaxAmount = pacPrice * numDelegates;
      //   const taxPercent = parseFloat(
      //     eventGeneralSettings?.purchaseTaxPercent || 0,
      //   );
      //   const taxAmount = (preTaxAmount * taxPercent) / 100;
      //   const totalAmount = preTaxAmount + taxAmount;

      //   const zohoPayload = {
      //     webhookTrigger: {
      //       payload: {
      //         StateRegion: formData.company.state || "",
      //         Discount: "0",
      //         Address: formData.company.address || "-",
      //         DelegateCompanyName: formData.company.companyName || "",
      //         PreTaxAmount: { preTaxAmount },
      //         PostalCode: formData.company.postalCode || "0",
      //         CompanyWebAddress: formData.company.webAddress || "",
      //         City: formData.company.city || "",
      //         DiscountCode: "",
      //         TotalAmount: { totalAmount },
      //         Date: dateFormatted,
      //         TaxAmount: { taxAmount },
      //         Packages: selectedPackage?.deligatePackageName || "",
      //         Currency: "USD",
      //         Eventname: "Litihium Downstream Summit 2026",
      //         Country: formData.company.country || "",
      //         Delegates: formData.delegates.map((delegate) => ({
      //           Email: delegate.email,
      //           Position: delegate.position || "-",
      //           FirstName: delegate.firstName,
      //           PhoneNumber: delegate.mobile,
      //           LastName: delegate.lastName,
      //         })),
      //         TotalAmountFormatted: { totalAmount },
      //         InvoiceNumber: invoiceNumber,
      //         FormName: "Booking Form",
      //         FormURL: "https://www.linq-staging-site.com/booking-form",
      //         AddOnsTotalAmount: "0",
      //         // Eventcode: `${eventDetails?.eventShortCode}`,
      //         Eventcode: "WSE",

      //       },
      //     },
      //   };

      //   try {
      //     const zohoResponse = await fetch(
      //       "https://www.linq-staging-site.com/admin1/sendtozoho",
      //       {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify(zohoPayload),
      //       },
      //     );
      //     const zohoResult = await zohoResponse.json();
      //     console.log("✅ Zoho submission successful:", zohoResult);
      //   } catch (error) {
      //     console.error("❌ Error submitting to Zoho:", error);
      //   }
      // }
      async function submitToZoho() {
        const today = new Date();
        const dateFormatted = today.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });

        const pacPrice = selectedPackage?.deligatePackagePrice || 0;
        const numDelegates = delegates?.length || 0;
        const preTaxAmount = pacPrice * numDelegates;

        const taxPercent = parseFloat(
          eventGeneralSettings?.purchaseTaxPercent || 0,
        );

        const taxAmount = (preTaxAmount * taxPercent) / 100;
        const totalAmount = preTaxAmount + taxAmount;

        const zohoPayload = {
          webhookTrigger: {
            payload: {
              StateRegion: formData.company.state || "",
              Discount: "0",
              Address: formData.company.address || "-",
              DelegateCompanyName: formData.company.companyName || "",
              PreTaxAmount: preTaxAmount,
              PostalCode: formData.company.postalCode || "0",
              CompanyWebAddress: formData.company.webAddress || "",
              City: formData.company.city || "",
              DiscountCode: "",
              TotalAmount: totalAmount,
              Date: dateFormatted,
              TaxAmount: taxAmount,
              Packages: selectedPackage?.deligatePackageName || "",
              Currency: `${eventGeneralSettings?.currencySymbol}`,
              Eventname: `${eventDetails?.eventName}`,
              Country: formData.company.country || "",
              Delegates: formData.delegates.map((delegate) => ({
                Email: delegate.email,
                Position: delegate.position || "-",
                FirstName: delegate.firstName,
                PhoneNumber: delegate.mobile,
                LastName: delegate.lastName,
              })),
              TotalAmountFormatted: totalAmount,
              InvoiceNumber: invoiceNumber,
              FormName: "Booking Form",
              FormURL: "https://www.linq-staging-site.com/booking-form",
              AddOnsTotalAmount: "0",
              Eventcode: `${eventDetails?.eventShortCode}`,
            },
          },
        };

        const CrmPayload = {
          webhookTrigger: {
            payload: {
              StateRegion: formData.company.state || "",
              Discount: "0",
              Address: formData.company.address || "-",
              DelegateCompanyName: formData.company.companyName || "",
              PreTaxAmount: preTaxAmount,
              PostalCode: formData.company.postalCode || "0",
              CompanyWebAddress: formData.company.webAddress || "",
              City: formData.company.city || "",
              DiscountCode: "",
              TotalAmount: totalAmount,
              Date: dateFormatted,
              TaxAmount: taxAmount,
              Packages: selectedPackage?.deligatePackageName === "Super Early Bird" ? "SEB" : selectedPackage?.deligatePackageName === "Early Bird" ? "EB" : selectedPackage?.deligatePackageName === "Regular Price" ? "Regular" : "",
              Currency: `${eventGeneralSettings?.currencySymbol}`,
              Eventname: `${eventDetails?.eventName}`,
              Country: formData.company.country || "",
              Delegates: formData.delegates.map((delegate) => ({
                Email: delegate.email,
                Position: delegate.position || "-",
                FirstName: delegate.firstName,
                PhoneNumber: delegate.mobile,
                LastName: delegate.lastName,
              })),
              TotalAmountFormatted: totalAmount,
              InvoiceNumber: invoiceNumber,
              FormName: "Booking Form",
              FormURL: "https://www.linq-staging-site.com/booking-form",
              AddOnsTotalAmount: "0",
              Eventcode: `${eventDetails?.eventShortCode}`,
            },
          },
        };

        fetch("https://www.linq-staging-site.com/admin1/sendtocrm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(CrmPayload),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Sync Success:", data);
          })
          .catch((error) => {
            console.error("Sync Error:", error);
          });

        try {
          const zohoResponse = await fetch(
            "https://www.linq-staging-site.com/admin1/sendtozoho",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(zohoPayload.webhookTrigger.payload), // 👈 just this
            },
          );

          if (!zohoResponse.ok) {
            throw new Error("Zoho API failed");
          }

          const zohoResult = await zohoResponse.json();
          console.log("✅ Zoho submission successful:", zohoResult);
        } catch (error) {
          console.error("❌ Error submitting to Zoho:", error);
        }
      }

      try {
        await Promise.all([
          submitCompanyDelegatesToHubSpot(formData),
          sendBookingEmail(),
          submitToZoho(),
        ]);

        // ── Instead of navigating, store data and show Step 2 inline ──
        setStep2Data({
          selectedPackage: selectedPackage,
          companyData: companyData,
          delegates: delegates,
          termsAgreement: termsAgreement,
          uniqueInvoiceNo: invoiceNumber,
        });
        setShowStep2(true);
        setSubmitBtnCheck(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        setSubmitBtnCheck(false);
        console.error("❌ Error in submission process:", error);
        alert("There was an error submitting your booking. Please try again.");
      }
    }
  };

  const getDelegateFieldError = (delegateId, field) => {
    const errorKey = `delegate_${delegateId}_${field}`;
    return submitAttempted && delegateErrors[errorKey];
  };

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

  // ─── Step 2 handlers (from BookingForm) ───────────────────────────────────
  useEffect(() => {
    if (showStep2) {
      callDelegateAddOnsApi();
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [showStep2]);

  const callDelegateAddOnsApi = () => {
    fetch(`https://www.linq-staging-site.com/admin1/delegatepackageaddons`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setDelegateAddOns(data["delegateAddOns"]);
        }
      });
  };

  const handleAddOnChange = (addOn, isChecked) => {
    if (isChecked) {
      setSelectedAddOns([...selectedAddOns, addOn]);
    } else {
      setSelectedAddOns(selectedAddOns.filter((item) => item.id !== addOn.id));
    }
  };

  const applyDiscountCode = (codeOverride) => {
    const code = (codeOverride ?? discountCode).trim();
    if (!code) {
      setDiscountData("");
      setDiscountPercent(0);
      return;
    }
    let formData = new FormData();
    formData.append("couponCode", code);
    fetch(`https://www.linq-staging-site.com/admin1/offercouponbycode`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          const returnedCoupon = data["offerCoupons"]?.[0];
          if (
            returnedCoupon?.couponCode?.toUpperCase().trim() ===
            code.toUpperCase().trim()
          ) {
            setDiscountData(data["offerCoupons"]);
            setDiscountPercent(returnedCoupon?.discountAmount);
          } else {
            setDiscountData("");
            setDiscountPercent(0);
          }
        } else {
          setDiscountData("");
          setDiscountPercent(0);
        }
      })
      .catch(() => {
        console.log("There was an error, Please try again later.");
      });
  };

  const calculatePrices = () => {
    const numDelegates = delegates?.length || 1;
    const packagePrice = parseFloat(selectedPackage?.deligatePackagePrice || 0);
    const taxPercent = parseFloat(
      eventGeneralSettings?.purchaseTaxPercent || 0,
    );
    const initialPrice = numDelegates * packagePrice;
    const discountAmount = (initialPrice * discountPercent) / 100;
    const priceAfterDiscount = initialPrice - discountAmount;
    const addOnsTotal = selectedAddOns.reduce((sum, addOn) => {
      return sum + parseFloat(addOn.additionalPrice || 0);
    }, 0);
    const taxableAmount = priceAfterDiscount + addOnsTotal;
    const taxAmount = (taxableAmount * taxPercent) / 100;
    const finalTotal = priceAfterDiscount + addOnsTotal + taxAmount;

    return {
      initialPrice: initialPrice.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      priceAfterDiscount: priceAfterDiscount.toFixed(2),
      addOnsTotal: addOnsTotal.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      finalTotal: finalTotal.toFixed(2),
    };
  };

  const handlePaymentClick = async () => {
    const prices = calculatePrices();

    if (!prices.finalTotal || parseFloat(prices.finalTotal) <= 0) {
      console.log("Invalid payment amount.");
      return;
    }
    if (!delegates || delegates.length === 0) {
      console.log(
        "No delegates found. Please go back and add delegate information.",
      );
      return;
    }

    async function sendStep2Email() {
      const prices = calculatePrices();
      let step2Html = `
      <h3>Booking Form Step 2</h3>
      <div style='width: 60%; background-color: transparent; color: black;'>
        <table style='width: 100%; border-collapse: collapse;'>
          <tr><td style='width: 50%; padding: 8px;'>Delegate pass ${delegates.length}:</td><td style='width: 35%; padding: 8px;'>${eventGeneralSettings?.currencySymbol} ${prices.initialPrice}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Discount:</td><td style='width: 35%; padding: 8px;'>${eventGeneralSettings?.currencySymbol} ${prices.discountAmount}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Taxes and Service Charges:</td><td style='width: 35%; padding: 8px;'>${eventGeneralSettings?.currencySymbol} ${prices.taxAmount}</td></tr>
          <tr><td colspan='2' style='font-weight: bold; padding: 8px;'>Add Ons:</td></tr>
    `;
      if (selectedAddOns && selectedAddOns.length > 0) {
        selectedAddOns.forEach((addOn) => {
          step2Html += `<tr><td style='width: 50%; padding: 8px;'>${addOn.addOnPointName}:</td><td style='width: 35%; padding: 8px;'>${eventGeneralSettings?.currencySymbol} ${addOn.additionalPrice}</td></tr>`;
        });
      }
      step2Html += `
          <tr><td style='width: 50%; padding: 8px; font-weight: 700;'>Total Amount:</td><td style='width: 35%; padding: 8px; font-weight: 700;'>${eventGeneralSettings?.currencySymbol} ${prices.finalTotal}</td></tr>
        </table>
      </div>
      <hr style='border:none; height: 2px; background-color: #7c7c7c; margin: 20px 0;'>
      <h3 style='margin-top: 7px;'>Booking Form Step 1</h3>
      <div style='width: 60%; background-color: transparent; color: black;'>
        <table style='width: 100%; border-collapse: collapse;'>
          <tr><td colspan='2' style='font-weight: bold; padding: 8px; background-color: #f0f0f0;'>Company Details</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Company Name:</td><td style='width: 50%; padding: 8px;'>${companyData?.companyName || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Web Address:</td><td style='width: 50%; padding: 8px;'>${companyData?.webAddress || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Address:</td><td style='width: 50%; padding: 8px;'>${companyData?.address || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>City:</td><td style='width: 50%; padding: 8px;'>${companyData?.city || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Country:</td><td style='width: 50%; padding: 8px;'>${companyData?.country || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Postal Code:</td><td style='width: 50%; padding: 8px;'>${companyData?.postalCode || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>State:</td><td style='width: 50%; padding: 8px;'>${companyData?.state || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Invoice no:</td><td style='width: 50%; padding: 8px;'>${step2Data?.uniqueInvoiceNo || ""}</td></tr>
    `;
      delegates.forEach((delegate, index) => {
        step2Html += `
          <tr><td colspan='2' style='font-weight: bold; padding: 8px; background-color: #f0f0f0;'>Delegate ${index + 1} Details:</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Email:</td><td style='width: 50%; padding: 8px;'>${delegate.email || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>First Name:</td><td style='width: 50%; padding: 8px;'>${delegate.firstName || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Last Name:</td><td style='width: 50%; padding: 8px;'>${delegate.lastName || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Phone Number:</td><td style='width: 50%; padding: 8px;'>${delegate.mobile || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Position:</td><td style='width: 50%; padding: 8px;'>${delegate.position || ""}</td></tr>
      `;
      });
      step2Html += `</table></div>`;

      const emailPayload = {
        toemail: toEmails,
        cc: "",
        subject: `${eventDetails?.eventShortCode} - Booking Form Step 2`,
        html: step2Html,
      };
      try {
        const emailResponse = await fetch(
          "https://www.linq-staging-site.com/admin1/sendmail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailPayload),
          },
        );
        const emailResult = await emailResponse.json();
        if (emailResult.status === "success") {
          console.log("✅ Step 2 Email sent successfully");
        } else {
          console.log("❌ Step 2 Email sending failed:", emailResult.message);
        }
      } catch (error) {
        console.log("❌ Error sending Step 2 email:", error);
      }
    }

    try {
      sendStep2Email().catch((err) => console.log("Email error:", err));
      if (paymentFormRef.current) {
        await paymentFormRef.current.submitPayment();
      } else {
        console.log("❌ Payment form is not ready.");
      }
    } catch (error) {
      console.log("❌ Error in payment process:", error);
    }
  };

  const handlePaymentSuccess = async (stripeResponse) => {
    const prices = calculatePrices();

    async function sendStep3Email() {
      let step3Html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; }
        h2 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        h3 { color: #555; margin-top: 25px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        td { padding: 10px 8px; border-bottom: 1px solid #e0e0e0; }
        .label { width: 50%; color: #666; font-weight: 500; }
        .value { width: 50%; color: #333; }
        .section-header { background-color: #f0f0f0; font-weight: bold; color: #333; padding: 12px 8px !important; }
        .total-row { font-weight: 700; font-size: 16px; background-color: #f9f9f9; }
        .divider { border: none; height: 2px; background-color: #7c7c7c; margin: 30px 0; }
        .invoice-header { display: flex; justify-content: space-between; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #e0e0e0; }
        .invoice-label { font-weight: 600; color: #666; }
        .invoice-value { font-weight: 700; color: #333; }
        .success-badge { background-color: #4CAF50; color: white; padding: 8px 16px; border-radius: 4px; display: inline-block; margin-bottom: 20px; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <div class="success-badge">✓ Payment Successful</div>
        <h2>Booking Form Step 3</h2>
        <div class="invoice-header">
            <span class="invoice-label">Invoice No:</span>
            <span class="invoice-value">${step2Data?.uniqueInvoiceNo || ""}</span>
        </div>
        <div class="invoice-header">
            <span class="invoice-label">Transaction ID:</span>
            <span class="invoice-value">${stripeResponse.paymentIntentId || ""}</span>
        </div>
        <h2>Booking Form Step 2</h2>
        <table>
            <tr><td class="label">Delegate pass ${delegates.length}:</td><td class="value">${eventGeneralSettings?.currencySymbol} ${prices.initialPrice}</td></tr>
            <tr><td class="label">Discount:</td><td class="value">${eventGeneralSettings?.currencySymbol} ${prices.discountAmount}</td></tr>
            <tr><td class="label">Taxes and Service Charges:</td><td class="value">${eventGeneralSettings?.currencySymbol} ${prices.taxAmount}</td></tr>
            <tr><td colspan="2" class="section-header">Add Ons:</td></tr>
    `;
      if (selectedAddOns && selectedAddOns.length > 0) {
        selectedAddOns.forEach((addOn) => {
          step3Html += `<tr><td class="label">${addOn.addOnPointName}:</td><td class="value">${eventGeneralSettings?.currencySymbol} ${addOn.additionalPrice}</td></tr>`;
        });
      } else {
        step3Html += `<tr><td colspan="2" style="padding: 8px; color: #999; font-style: italic;">No add-ons selected</td></tr>`;
      }
      step3Html += `
            <tr class="total-row"><td class="label">Total Amount Paid:</td><td class="value">${eventGeneralSettings?.currencySymbol} ${prices.finalTotal}</td></tr>
        </table>
        <hr class="divider">
        <h2>Booking Form Step 1</h2>
        <h3>Company Details</h3>
        <table>
            <tr><td class="label">Company Name:</td><td class="value">${companyData?.companyName || ""}</td></tr>
            <tr><td class="label">Web Address:</td><td class="value">${companyData?.webAddress || ""}</td></tr>
            <tr><td class="label">Address:</td><td class="value">${companyData?.address || ""}</td></tr>
            <tr><td class="label">City:</td><td class="value">${companyData?.city || ""}</td></tr>
            <tr><td class="label">Country:</td><td class="value">${companyData?.country || ""}</td></tr>
            <tr><td class="label">Postal Code:</td><td class="value">${companyData?.postalCode || ""}</td></tr>
            <tr><td class="label">State:</td><td class="value">${companyData?.state || ""}</td></tr>
            <tr><td class="label">Invoice no:</td><td class="value">${step2Data?.uniqueInvoiceNo || ""}</td></tr>
        </table>
    `;
      delegates.forEach((delegate, index) => {
        step3Html += `
        <h3>Delegate ${index + 1} Details</h3>
        <table>
            <tr><td class="label">Email:</td><td class="value">${delegate.email || ""}</td></tr>
            <tr><td class="label">First Name:</td><td class="value">${delegate.firstName || ""}</td></tr>
            <tr><td class="label">Last Name:</td><td class="value">${delegate.lastName || ""}</td></tr>
            <tr><td class="label">Phone Number:</td><td class="value">${delegate.mobile || ""}</td></tr>
            <tr><td class="label">Position:</td><td class="value">${delegate.position || ""}</td></tr>
        </table>
      `;
      });
      step3Html += `
        <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0; border-radius: 4px;">
            <p style="margin: 0; color: #666; font-size: 14px;">Thank you for your booking! If you have any questions, please contact us.</p>
        </div>
    </div>
</body>
</html>`;

      const emailPayload = {
        toemail: toEmails,
        cc: "",
        subject: `${eventDetails?.eventShortCode} - Booking Confirmation - Payment Successful`,
        html: step3Html,
      };
      try {
        const emailResponse = await fetch(
          "https://www.linq-staging-site.com/admin1/sendmail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailPayload),
          },
        );
        const emailResult = await emailResponse.json();
        if (emailResult.status === "success") {
          console.log("✅ Step 3 Confirmation Email sent successfully");
          return { success: true };
        } else {
          console.log("❌ Step 3 Email sending failed:", emailResult.message);
          return { success: false, error: emailResult.message };
        }
      } catch (error) {
        console.log("❌ Error sending Step 3 email:", error);
        return { success: false, error: error.message };
      }
    }

    try {
      const finalData = new FormData();
      finalData.append("purchasedDelegatePackageId", selectedPackage?.id);
      finalData.append("companyName", companyData?.companyName);
      finalData.append("companyWebsite", companyData?.webAddress);
      finalData.append("companyAddress", companyData?.address);
      finalData.append("companyCountry", companyData?.country);
      finalData.append("companyState", companyData?.state);
      finalData.append("companyCity", companyData?.city);
      finalData.append("companyPincode", companyData?.postalCode);
      finalData.append("delegateList", JSON.stringify(delegates));
      if (selectedAddOns && selectedAddOns.length > 0) {
        finalData.append("addOns", JSON.stringify(selectedAddOns));
      }
      if (discountCode !== "" && discountCode !== null) {
        finalData.append("couponCode", discountCode);
      }
      finalData.append("totalPassAmount", prices.initialPrice);
      finalData.append("discountAmount", prices.discountAmount);
      finalData.append("addOnsAmount", prices.addOnsTotal);
      finalData.append("taxableCharge", prices.taxAmount);
      finalData.append("totalPaidAmount", prices.finalTotal);
      finalData.append("transectionId", stripeResponse.paymentIntentId);

      fetch("https://www.linq-staging-site.com/admin1/addnewdelegate", {
        method: "POST",
        body: finalData,
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.status) {
            console.log("Payment successful:", stripeResponse);
            const emailResult = await sendStep3Email();
            if (emailResult.success) {
              console.log("✅ Confirmation email sent successfully");
            } else {
              console.log(
                "⚠️ Email sending failed, but payment was successful:",
                emailResult.error,
              );
            }
            // ── Show Step 3 screen instead of navigating directly ──
            setShowStep3(true);
            setShowStep2(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            console.log(data?.message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    } catch (err) {
      console.log("Error saving booking:", err);
    }
  };

  const handlePaymentError = (error) => {
    console.log("Payment failed:", error);
  };

  // ─── Step 3: Finish button handler ────────────────────────────────────────
  const handleFinish = () => {
    navigate("/thank-you", { state: { authorized: true } });
  };

  // ─── Step 2 Order Summary & Ticket SVG (from BookingForm) ─────────────────
  const prices = calculatePrices();
  const companyDetails = companyData;

  const OrderSummary = () => (
    <>
      <div className="BookingFormV2_ticket__E2uzJ">
        <p>
          {delegates?.length || 1} Ticket
          {(delegates?.length || 1) > 1 ? "s" : ""}
        </p>
        <p>
          {eventGeneralSettings?.currencySymbol} {prices.initialPrice}
        </p>
      </div>
      <div className="BookingFormV2_inputContainer__UHPNl">
        <div>
          <input
            ref={discountInputRef}
            type="text"
            placeholder="Discount Code"
            value={discountCode}
            onChange={(e) => {
              const upperValue = e.target.value.toUpperCase();
              setDiscountCode(upperValue);
              if (upperValue.trim() === "") {
                setDiscountData("");
                setDiscountPercent(0);
              } else {
                applyDiscountCode(upperValue);
              }
              setTimeout(() => discountInputRef.current?.focus(), 0);
            }}
          />
        </div>
      </div>
      <div className="BookingFormV2_summary__t3Eo5">
        <div className="BookingFormV2_toggle__ZtkTL">
          {iconSrcs.toggle && (
            <img
              src={iconSrcs.toggle}
              alt="toggle icon"
              style={{ cursor: "pointer", transform: "rotate3D(0deg)" }}
            />
          )}
        </div>
        <div className="BookingFormV2_table__yNoVS">
          <div>
            <h3>Total</h3>
            <h3>
              {eventGeneralSettings?.currencySymbol} {prices.finalTotal}
            </h3>
          </div>
          <div>
            <p>Delegate pass x {delegates?.length || 1}</p>
            <p>
              {eventGeneralSettings?.currencySymbol} {prices.initialPrice}
            </p>
          </div>
          <div>
            <p>Discount {discountPercent > 0 && `(${discountPercent}%)`}</p>
            <p>
              {eventGeneralSettings?.currencySymbol} {prices.discountAmount}
            </p>
          </div>
          <div>
            <p>Add-ons</p>
            <p>
              {eventGeneralSettings?.currencySymbol} {prices.addOnsTotal}
            </p>
          </div>
          <div>
            <p>
              Taxes and Service Charges (
              {eventGeneralSettings?.purchaseTaxPercent}%)
            </p>
            <p>
              {eventGeneralSettings?.currencySymbol} {prices.taxAmount}
            </p>
          </div>
        </div>
        <span>
          <h3>Total</h3>
          <h3>
            {eventGeneralSettings?.currencySymbol} {prices.finalTotal}
          </h3>
        </span>
      </div>
    </>
  );

  const TicketSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_2"
      data-name="Layer 2"
      viewBox="0 0 547.3 167.88"
    >
      <defs></defs>
      <g id="_3" data-name="3">
        <g>
          <path
            class="cls-2"
            fill="var(--secondary-color)"
            d="m418.69,10.18v147.51c0,5.62-6.23,10.19-13.89,10.19H13.89c-7.66,0-13.89-4.57-13.89-10.19v-54.29h.12c10.75,0,19.46-8.71,19.46-19.46S10.87,64.47.12,64.47h-.12V10.18C0,4.56,6.23,0,13.89,0h390.91c7.66,0,13.89,4.56,13.89,10.18Z"
          ></path>
          <path
            class="cls-4"
            fill="var(--primary-color)"
            d="m533.41,0h-100.84c-7.66,0-13.89,4.57-13.89,10.19v147.51c0,5.62,6.22,10.19,13.89,10.19h100.84c7.66,0,13.89-4.57,13.89-10.19V10.19c0-5.62-6.22-10.19-13.89-10.19h0Z"
          ></path>
          <path
            class="cls-2"
            fill="var(--secondary-color)"
            d="m470.86,22.07v6.05h37.59v-6.05h-37.59Zm-6.85,120.32c-2.98,0-4.47.91-4.47,2.69s1.49,2.74,4.47,2.74,4.51-.91,4.51-2.74-1.48-2.69-4.51-2.69Zm2.81,3.89c-.53.29-1.49.43-2.81.43s-2.29-.14-2.82-.43c-.53-.29-.8-.67-.8-1.2s.27-.91.8-1.2c.53-.24,1.49-.39,2.82-.39s2.28.15,2.81.39c.53.29.8.67.8,1.2s-.27.91-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.91-4.47,2.74s1.49,2.69,4.47,2.69,4.51-.92,4.51-2.69-1.48-2.74-4.51-2.74Zm2.81,3.94c-.53.24-1.49.38-2.81.38s-2.29-.14-2.82-.38c-.53-.29-.8-.68-.8-1.2s.27-.96.8-1.2c.53-.29,1.49-.44,2.82-.44s2.28.15,2.81.44c.53.24.8.67.8,1.2s-.27.91-.8,1.2Zm-2.81-10.38c-2.98,0-4.47.87-4.47,2.69s1.49,2.69,4.47,2.69,4.51-.86,4.51-2.69-1.48-2.69-4.51-2.69Zm2.81,3.89c-.53.29-1.49.39-2.81.39s-2.29-.1-2.82-.39c-.53-.28-.8-.67-.8-1.2s.27-.91.8-1.2c.53-.24,1.49-.38,2.82-.38s2.28.14,2.81.38c.53.29.8.68.8,1.2s-.27.92-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.92-4.47,2.69s1.49,2.74,4.47,2.74,4.51-.91,4.51-2.74-1.48-2.69-4.51-2.69Zm2.81,3.89c-.53.29-1.49.43-2.81.43s-2.29-.14-2.82-.43c-.53-.24-.8-.67-.8-1.2s.27-.91.8-1.15c.53-.29,1.49-.43,2.82-.43s2.28.14,2.81.43c.53.24.8.62.8,1.15s-.27.96-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.92-4.47,2.74s1.49,2.69,4.47,2.69,4.51-.92,4.51-2.69-1.48-2.74-4.51-2.74Zm2.81,3.94c-.53.24-1.49.38-2.81.38s-2.29-.14-2.82-.38c-.53-.29-.8-.67-.8-1.2s.27-.91.8-1.2,1.49-.43,2.82-.43,2.28.14,2.81.43c.53.29.8.67.8,1.2s-.27.91-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.91-4.47,2.69s1.49,2.73,4.47,2.73,4.51-.91,4.51-2.73-1.48-2.69-4.51-2.69Zm2.81,3.89c-.53.29-1.49.43-2.81.43s-2.29-.14-2.82-.43c-.53-.29-.8-.68-.8-1.2s.27-.91.8-1.2c.53-.24,1.49-.39,2.82-.39s2.28.15,2.81.39c.53.29.8.67.8,1.2s-.27.91-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.91-4.47,2.73s1.49,2.69,4.47,2.69,4.51-.91,4.51-2.69-1.48-2.73-4.51-2.73Zm2.81,3.88c-.53.29-1.49.44-2.81.44s-2.29-.15-2.82-.44c-.53-.23-.8-.67-.8-1.15,0-.53.27-.96.8-1.2.53-.29,1.49-.43,2.82-.43s2.28.14,2.81.43c.53.24.8.67.8,1.2,0,.48-.27.92-.8,1.15Zm-2.81-10.32c-2.98,0-4.47.87-4.47,2.69s1.49,2.69,4.47,2.69,4.51-.86,4.51-2.69-1.48-2.69-4.51-2.69Zm2.81,3.89c-.53.29-1.49.39-2.81.39s-2.29-.1-2.82-.39-.8-.67-.8-1.2s.27-.91.8-1.2c.53-.29,1.49-.38,2.82-.38s2.28.09,2.81.38c.53.29.8.67.8,1.2s-.27.91-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.91-4.47,2.69s1.49,2.74,4.47,2.74,4.51-.91,4.51-2.74-1.48-2.69-4.51-2.69Zm2.81,3.89c-.53.29-1.49.43-2.81.43s-2.29-.14-2.82-.43c-.53-.24-.8-.67-.8-1.2s.27-.91.8-1.15c.53-.29,1.49-.44,2.82-.44s2.28.15,2.81.44c.53.24.8.62.8,1.15s-.27.96-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.91-4.47,2.74s1.49,2.68,4.47,2.68,4.51-.91,4.51-2.68-1.48-2.74-4.51-2.74Zm2.81,3.94c-.53.24-1.49.38-2.81.38s-2.29-.14-2.82-.38c-.53-.29-.8-.68-.8-1.2s.27-.92.8-1.2c.53-.29,1.49-.44,2.82-.44s2.28.15,2.81.44c.53.28.8.67.8,1.2s-.27.91-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.86-4.47,2.68s1.49,2.74,4.47,2.74,4.51-.91,4.51-2.74-1.48-2.68-4.51-2.68Zm2.81,3.88c-.53.29-1.49.44-2.81.44s-2.29-.15-2.82-.44c-.53-.28-.8-.67-.8-1.2s.27-.91.8-1.2c.53-.24,1.49-.38,2.82-.38s2.28.14,2.81.38c.53.29.8.68.8,1.2s-.27.92-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.92-4.47,2.69s1.49,2.74,4.47,2.74,4.51-.91,4.51-2.74-1.48-2.69-4.51-2.69Zm2.81,3.89c-.53.29-1.49.43-2.81.43s-2.29-.14-2.82-.43c-.53-.24-.8-.67-.8-1.2,0-.48.27-.91.8-1.15.53-.29,1.49-.43,2.82-.43s2.28.14,2.81.43c.53.24.8.67.8,1.15,0,.53-.27.96-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.92-4.47,2.74s1.49,2.69,4.47,2.69,4.51-.87,4.51-2.69-1.48-2.74-4.51-2.74Zm2.81,3.94c-.53.24-1.49.38-2.81.38s-2.29-.14-2.82-.38c-.53-.29-.8-.67-.8-1.2s.27-.91.8-1.2c.53-.29,1.49-.39,2.82-.39s2.28.1,2.81.39c.53.29.8.67.8,1.2s-.27.91-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.91-4.47,2.69s1.49,2.73,4.47,2.73,4.51-.91,4.51-2.73-1.48-2.69-4.51-2.69Zm2.81,3.89c-.53.29-1.49.43-2.81.43s-2.29-.14-2.82-.43c-.53-.24-.8-.67-.8-1.2s.27-.92.8-1.2c.53-.24,1.49-.39,2.82-.39s2.28.15,2.81.39c.53.28.8.67.8,1.2s-.27.96-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.91-4.47,2.73s1.49,2.69,4.47,2.69,4.51-.91,4.51-2.69-1.48-2.73-4.51-2.73Zm2.81,3.93c-.53.25-1.49.39-2.81.39s-2.29-.14-2.82-.39c-.53-.28-.8-.67-.8-1.2s.27-.91.8-1.2c.53-.28,1.49-.43,2.82-.43s2.28.15,2.81.43c.53.24.8.67.8,1.2s-.27.92-.8,1.2Zm-2.81-10.37c-2.98,0-4.47.87-4.47,2.69s1.49,2.74,4.47,2.74,4.51-.91,4.51-2.74-1.48-2.69-4.51-2.69Zm2.81,3.89c-.53.29-1.49.39-2.81.39s-2.29-.1-2.82-.39c-.53-.28-.8-.67-.8-1.2s.27-.91.8-1.2c.53-.24,1.49-.38,2.82-.38s2.28.14,2.81.38c.53.29.8.67.8,1.2s-.27.92-.8,1.2Zm-7.12-9.7v1.16h1.22v-1.16h-1.22Zm7.6-8.4c-.85-.77-1.91-1.15-3.29-1.15s-2.4.38-3.25,1.15c-.79.72-1.22,1.68-1.22,2.83s.43,2.16,1.22,2.88c.85.73,1.92,1.11,3.25,1.11s2.44-.38,3.29-1.11c.8-.72,1.22-1.68,1.22-2.88s-.42-2.11-1.22-2.83Zm-.69,4.9c-.64.53-1.49.77-2.6.77s-1.97-.24-2.56-.77c-.63-.53-.95-1.25-.95-2.07s.32-1.49.95-2.01c.59-.53,1.49-.82,2.56-.82s1.96.29,2.6.82c.64.52.9,1.2.9,2.06s-.26,1.49-.9,2.02Zm1.75-14.02h-8.66v1.01h6.86l-6.86,4.37v1.15h8.66v-1.06h-6.85l6.85-4.37v-1.1Zm2.5,104.76v1.54h37.59v-1.54h-37.59Zm0,14.36v3.74h37.59v-3.74h-37.59Zm0,5.28v1.49h37.59v-1.49h-37.59Zm0-17.33v2.26h37.59v-2.26h-37.59Zm0,10.51v.77h37.59v-.77h-37.59Zm0-28.61v2.25h37.59v-2.25h-37.59Zm0,21.84v5.28h37.59v-5.28h-37.59Zm0-13.58v6.05h37.59v-6.05h-37.59Zm0-21.08v7.53h37.59v-7.53h-37.59Zm0-36.2v1.49h37.59v-1.49h-37.59Zm0,55.79v.76h37.59v-.76h-37.59Zm0-27.9v1.49h37.59v-1.49h-37.59Zm0,4.51v2.26h37.59v-2.26h-37.59Zm0-42.2v.72h37.59v-.72h-37.59Zm0-6.82v2.26h37.59v-2.26h-37.59Zm0-12.82v.77h37.59v-.77h-37.59Zm0-2.25v1.49h37.59v-1.49h-37.59Zm0,20.36v.76h37.59v-.76h-37.59Zm0,63.33v1.53h37.59v-1.53h-37.59Zm0-6.78v1.49h37.59v-1.49h-37.59Zm0-42.97v1.49h37.59v-1.49h-37.59Zm0,10.57v2.25h37.59v-2.25h-37.59Zm0-1.54v.77h37.59v-.77h-37.59Zm0,4.56v2.26h37.59v-2.26h-37.59Zm0,8.26v1.54h37.59v-1.54h-37.59Zm0-4.52v3.03h37.59v-3.03h-37.59Zm0-13.58v4.56h37.59v-4.56h-37.59Zm0-14.31v6.77h37.59v-6.77h-37.59Zm0-24.87v.72h37.59v-.72h-37.59Zm0,19.59v1.49h37.59v-1.49h-37.59Zm0-5.28v1.49h37.59v-1.49h-37.59Zm0-8.31v6.82h37.59v-6.82h-37.59Z"
          ></path>
          <path
            class="cls-1"
            d="m418.69,158.14v1.59h.54v-1.59h-.54Zm0-3.26v1.66h.54v-1.66h-.54Zm0-3.25v1.65h.54v-1.65h-.54Zm0-3.2v1.6h.54v-1.6h-.54Zm0-3.26v1.6h.54v-1.6h-.54Zm0-3.25v1.6h.54v-1.6h-.54Zm0-3.26v1.6h.54v-1.6h-.54Zm0-3.25v1.66h.54v-1.66h-.54Zm0-3.25v1.65h.54v-1.65h-.54Zm0-3.2v1.6h.54v-1.6h-.54Zm0-3.25v1.6h.54v-1.6h-.54Zm0-3.26v1.6h.54v-1.6h-.54Zm0-3.25v1.65h.54v-1.65h-.54Zm0-3.25v1.65h.54v-1.65h-.54Zm0-3.26v1.66h.54v-1.66h-.54Zm0-3.19v1.59h.54v-1.59h-.54Zm0-3.26v1.6h.54v-1.6h-.54Zm0-3.26v1.61h.54v-1.61h-.54Zm0-3.25v1.66h.54v-1.66h-.54Zm0-3.25v1.65h.54v-1.65h-.54Zm0-3.26v1.66h.54v-1.66h-.54Zm0-3.2v1.6h.54v-1.6h-.54Zm0-3.25v1.6h.54v-1.6h-.54Zm0-3.25v1.6h.54v-1.6h-.54Zm0-3.25v1.65h.54v-1.65h-.54Zm0-3.26v1.66h.54v-1.66h-.54Zm0-3.2v1.6h.54v-1.6h-.54Zm0-3.25v1.6h.54v-1.6h-.54Zm0-3.25v1.6h.54v-1.6h-.54Zm0-3.26v1.6h.54v-1.6h-.54Zm0-3.25v1.65h.54v-1.65h-.54Zm0-3.26v1.66h.54v-1.66h-.54Zm0-3.2v1.6h.54v-1.6h-.54Zm0-3.25v1.6h.54v-1.6h-.54Zm0-3.25v1.6h.54v-1.6h-.54Zm0-3.26v1.66h.54v-1.66h-.54Zm0-3.25v1.66h.54v-1.66h-.54Zm0-3.25v1.65h.54v-1.65h-.54Zm0-3.2v1.6h.54v-1.6h-.54Zm0-3.25v1.6h.54v-1.6h-.54Zm0-3.26v1.6h.54v-1.6h-.54Zm0-3.25v1.65h.54v-1.65h-.54Zm0-3.26v1.66h.54v-1.66h-.54Zm0-3.25v1.65h.54v-1.65h-.54Zm0-3.2v1.6h.54v-1.6h-.54Zm0-3.25v1.6h.54v-1.6h-.54Zm0-3.26v1.6h.54v-1.6h-.54Z"
          ></path>
        </g>
        <g>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m145.27,122.48h-6.5v13.76h6.5c4.56,0,7.68-2.65,7.68-6.88s-3.12-6.88-7.68-6.88Zm-.16,10.65h-2.46v-7.55h2.46c2.34,0,3.91,1.4,3.91,3.77s-1.57,3.77-3.91,3.77Z"
          ></path>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m160.01,125.41c-3.36,0-5.86,2.28-5.86,5.48s2.46,5.52,6.25,5.52c2.02,0,3.52-.59,4.54-1.73l-1.96-2.04c-.73.63-1.42.92-2.46.92-1.38,0-2.3-.63-2.61-1.71h7.74c.02-.29.06-.65.06-.92,0-3.52-2.55-5.52-5.7-5.52Zm-2.16,4.48c.22-1.12,1.02-1.83,2.18-1.83s1.98.71,2.18,1.83h-4.36Z"
          ></path>
          <rect
            class="cls-3"
            fill="var(--primary-color)"
            x="167.44"
            y="121.65"
            width="3.73"
            height="14.58"
          ></rect>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m178.78,125.41c-3.36,0-5.86,2.28-5.86,5.48s2.46,5.52,6.25,5.52c2.02,0,3.52-.59,4.54-1.73l-1.96-2.04c-.73.63-1.42.92-2.46.92-1.38,0-2.3-.63-2.61-1.71h7.74c.02-.29.06-.65.06-.92,0-3.52-2.55-5.52-5.7-5.52Zm-2.16,4.48c.22-1.12,1.02-1.83,2.18-1.83s1.98.71,2.18,1.83h-4.36Z"
          ></path>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m194.11,126.88c-.73-1-1.87-1.47-3.34-1.47-2.83,0-5.23,2-5.23,5.13s2.4,5.15,5.23,5.15c1.36,0,2.44-.41,3.16-1.26v.35c0,1.67-.85,2.57-2.85,2.57-1.26,0-2.71-.43-3.6-1.14l-1.36,2.61c1.3.92,3.24,1.39,5.29,1.39,3.97,0,6.25-1.91,6.25-5.93v-8.71h-3.56v1.3Zm-2.46,5.84c-1.34,0-2.34-.88-2.34-2.18s1-2.16,2.34-2.16,2.32.86,2.32,2.16-.98,2.18-2.32,2.18Z"
          ></path>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m204.6,125.41c-1.67,0-3.48.43-4.7,1.24l1.26,2.54c.73-.57,1.87-.92,2.89-.92,1.47,0,2.2.61,2.26,1.69h-2.12c-3.3,0-4.74,1.22-4.74,3.18,0,1.85,1.42,3.28,3.97,3.28,1.55,0,2.61-.53,3.14-1.55v1.38h3.48v-5.92c0-3.38-1.98-4.91-5.44-4.91Zm1.71,7.41c-.29.85-1.02,1.24-1.85,1.24-.88,0-1.4-.45-1.4-1.08s.43-1.08,1.63-1.08h1.61v.92Z"
          ></path>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m217.69,133.53c-.67,0-1.12-.43-1.12-1.22v-3.54h2.44v-2.79h-2.44v-2.77h-3.73v2.77h-1.55v2.79h1.55v3.58c0,2.73,1.59,4.07,4.32,4.07.98,0,1.95-.2,2.59-.61l-.92-2.61c-.31.22-.73.33-1.14.33Z"
          ></path>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m226.06,125.41c-3.36,0-5.86,2.28-5.86,5.48s2.46,5.52,6.25,5.52c2.02,0,3.52-.59,4.54-1.73l-1.96-2.04c-.73.63-1.42.92-2.46.92-1.38,0-2.3-.63-2.61-1.71h7.74c.02-.29.06-.65.06-.92,0-3.52-2.55-5.52-5.7-5.52Zm-2.16,4.48c.22-1.12,1.02-1.83,2.18-1.83s1.98.71,2.18,1.83h-4.36Z"
          ></path>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m245.68,122.48h-6.29v13.76h3.89v-3.6h2.4c3.75,0,6.11-1.95,6.11-5.07s-2.36-5.09-6.11-5.09Zm-.24,7.09h-2.16v-4.03h2.16c1.61,0,2.42.75,2.42,2.02s-.81,2-2.42,2Z"
          ></path>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m257.94,125.41c-1.67,0-3.48.43-4.7,1.24l1.26,2.54c.73-.57,1.87-.92,2.89-.92,1.47,0,2.2.61,2.26,1.69h-2.12c-3.3,0-4.74,1.22-4.74,3.18,0,1.85,1.42,3.28,3.97,3.28,1.55,0,2.61-.53,3.14-1.55v1.38h3.48v-5.92c0-3.38-1.99-4.91-5.44-4.91Zm1.71,7.41c-.29.85-1.02,1.24-1.85,1.24-.88,0-1.4-.45-1.4-1.08s.43-1.08,1.63-1.08h1.61v.92Z"
          ></path>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m268.61,128.81c0-.39.45-.75,1.71-.75.94,0,2,.2,3.07.79l1.12-2.54c-1.06-.59-2.71-.9-4.21-.9-3.34,0-5.19,1.53-5.19,3.54,0,4.26,6.29,2.63,6.29,4.07,0,.45-.41.73-1.67.73s-2.73-.37-3.71-.98l-1.12,2.55c1.04.65,2.91,1.1,4.72,1.1,3.46,0,5.27-1.53,5.27-3.5,0-4.23-6.27-2.63-6.27-4.11Z"
          ></path>
          <path
            class="cls-3"
            fill="var(--primary-color)"
            d="m279.36,128.81c0-.39.45-.75,1.71-.75.94,0,2,.2,3.07.79l1.12-2.54c-1.06-.59-2.71-.9-4.21-.9-3.34,0-5.19,1.53-5.19,3.54,0,4.26,6.29,2.63,6.29,4.07,0,.45-.41.73-1.67.73s-2.73-.37-3.71-.98l-1.12,2.55c1.04.65,2.91,1.1,4.72,1.1,3.46,0,5.27-1.53,5.27-3.5,0-4.23-6.27-2.63-6.27-4.11Z"
          ></path>
        </g>
      </g>
      <script xmlns=""></script>
    </svg>
  );

  // ─── Shared Helmet & layout wrappers ──────────────────────────────────────
  const SeoHelmet = () => (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDesc} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDesc} />
      <meta property="og:type" content="website" />
      {seoImage && <meta property="og:image" content={seoImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDesc} />
      {seoImage && <meta name="twitter:image" content={seoImage} />}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );

  const PageFooter = () => (
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
        <p>©2026 Lithium Downstream Summit 2026</p>
      </div>
    </div>
  );

  // ─── Step 3 render (Thank you / registration confirmation screen) ──────────
  if (showStep3) {
    return (
      <>
        <SeoHelmet />
        <div id="root">
          <div className="PageForm_container__NA5Wr">
            <div className="PageForm_header__7W2Cz">
              <div
                className="PageForm_headerInner__sdlhn"
                style={{ maxWidth: "1070px" }}
              >
                <img
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  src={navLogos?.whiteLogo}
                  alt="Site logo"
                ></img>
              </div>
            </div>
            <div className="BookingFormV2_container__XPZAc">
              <div className="BookingFormV2_engagementContainer__-lusk">
                <div>
                  {/* ── Registration confirmation cards ── */}
                  <div className="BookingFormV2_registration__ytui5">
                    <div className="BookingFormV2_bar__KQ2vi">
                      <h2>Thank you for your registration</h2>
                    </div>
                    <div className="BookingFormV2_registrationInner__Bc37L">
                      <p>
                        Your transaction ID:{" "}
                        <span>{step2Data?.uniqueInvoiceNo || ""}</span>
                      </p>

                      {/* Render one card per delegate */}
                      {delegates.map((delegate, index) => (
                        <div
                          key={delegate.id}
                          className="BookingFormV2_cardContainer__YEc1F"
                        >
                          <div className="BookingFormV2_card__nZKbg">
                            <div className="BookingFormV2_cutout__YBhQ4"></div>
                            <div className="BookingFormV2_content__MGbbj">
                              <div className="BookingFormV2_left__9kOyt">
                                <h1>
                                  {delegate.firstName}
                                  <span>{delegate.lastName}</span>
                                </h1>
                                <p>delegate pass</p>
                              </div>
                              <div className="BookingFormV2_right__MCBUi">
                                <div>
                                  <p>
                                    Date:
                                    <span>{eventDetails?.eventDate || ""}</span>
                                  </p>
                                  <p>
                                    Location:
                                    <span>
                                      {eventDetails?.eventShortLocation || ""}
                                    </span>
                                  </p>
                                </div>
                                <div>
                                  <img
                                    src={navLogos?.whiteLogo}
                                    alt="Logo Image"
                                  ></img>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="BookingFormV2_cardBar__1C1Kn">
                            <div className="BookingFormV2_content__MGbbj">
                              <div>
                                <h1>
                                  {delegate.firstName}
                                  <span>{delegate.lastName}</span>
                                </h1>
                                <p>delegate pass</p>
                                <div className="BookingFormV2_barcodeContainer__GZ5As">
                                  <img
                                    src={barcodeImage}
                                    alt="Barcode"
                                    width="90"
                                    height="32"
                                  ></img>
                                </div>
                              </div>
                              <div>
                                <img
                                  src={navLogos?.blackLogo}
                                  alt="Logo Image"
                                ></img>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Enhance your engagement ── */}
                  <div className="BookingFormV2_enhance__kYOq5">
                    <div className="BookingFormV2_bar__KQ2vi">
                      <h2>Enhance your engagement</h2>
                    </div>
                    <div className="BookingFormV2_enhanceInner__Y3fF6">
                      <p>
                        Take your networking experience to the next level with
                        our enhanced engagement. Choose an option, and our team
                        will reach out to explore the opportunities.
                      </p>
                      <div>
                        <div>
                          <input
                            type="checkbox"
                            id="speaker"
                            value="speaker"
                            checked={step3EngagementOptions.speaker}
                            onChange={(e) =>
                              setStep3EngagementOptions((prev) => ({
                                ...prev,
                                speaker: e.target.checked,
                              }))
                            }
                          />
                          <label htmlFor="speaker">Become a Speaker</label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="discussion"
                            value="discussion"
                            checked={step3EngagementOptions.discussion}
                            onChange={(e) =>
                              setStep3EngagementOptions((prev) => ({
                                ...prev,
                                discussion: e.target.checked,
                              }))
                            }
                          />
                          <label htmlFor="discussion">
                            Join a Panel Discussion
                          </label>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            id="sponsor"
                            value="sponsor"
                            checked={step3EngagementOptions.sponsor}
                            onChange={(e) =>
                              setStep3EngagementOptions((prev) => ({
                                ...prev,
                                sponsor: e.target.checked,
                              }))
                            }
                          />
                          <label htmlFor="sponsor">Sponsor the Show</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Finish button ── */}
                  <div className="BookingFormV2_submitbtn__5bU6H">
                    <button onClick={handleFinish}>Finish</button>
                  </div>
                </div>
              </div>
            </div>
            <PageFooter />
          </div>
        </div>
      </>
    );
  }

  // ─── Step 2 render (BookingForm UI) ───────────────────────────────────────
  if (showStep2) {
    return (
      <>
        <SeoHelmet />
        <div id="root">
          <div className="PageForm_container__NA5Wr">
            <div className="PageForm_header__7W2Cz">
              <div
                className="PageForm_headerInner__sdlhn"
                style={{ maxWidth: "1280px" }}
              >
                <img
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  src={navLogos?.whiteLogo}
                  alt="site logo"
                ></img>
              </div>
            </div>
            <div className="BookingFormV2_container__XPZAc">
              <div className="BookingFormV2_outerContainer__Ivyv8">
                <div className="BookingFormV2_leftContainer__ZtzNL">
                  <div className="BookingFormV2_addOns__-ykuL">
                    <div className="BookingFormV2_bar__KQ2vi">
                      <h2>Add-ons</h2>
                    </div>
                    <div className="BookingFormV2_addOnsInner__B37ag">
                      <div>
                        {delegateAddOns && delegateAddOns.length > 0 ? (
                          delegateAddOns.map((item, index) => (
                            <div key={item.id || index}>
                              <div>
                                <input
                                  type="checkbox"
                                  value={item?.additionalPrice}
                                  onChange={(e) =>
                                    handleAddOnChange(item, e.target.checked)
                                  }
                                  id={`addon-${item.id}`}
                                />
                                <label htmlFor={`addon-${item.id}`}>
                                  {item?.addOnPointName}
                                </label>
                              </div>
                              <p>
                                {eventGeneralSettings?.currencySymbol}{" "}
                                {item?.additionalPrice}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>No add-ons available</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {windowWidth <= 991 ? (
                    <div className="BookingFormV2_rightContainer__0senB">
                      <div className="BookingFormV2_order__pNfW4">
                        <div className="BookingFormV2_bar__KQ2vi">
                          <h2>Order Summary</h2>
                        </div>
                        <div className="BookingFormV2_orderInner__uVyCd">
                          <div className="BookingFormV2_cardContainer__YEc1F">
                            <div>
                              <TicketSVG />
                              <div className="BookingFormV2_ticketLogo__wN5Ja">
                                <img
                                  src={navLogos?.whiteLogo}
                                  alt="logo img"
                                ></img>
                              </div>
                            </div>
                          </div>
                          <OrderSummary />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="BookingFormV2_paymentOptions__yJPll">
                    <div className="BookingFormV2_bar__KQ2vi">
                      <h2>Payment options</h2>
                    </div>
                    <div className="BookingFormV2_paymentOptionsInner__YVwZU">
                      <div className="BookingFormV2_imagesContainer__Ko5GY">
                        <p>We accept all major credit and debit cards.</p>
                        {iconSrcs.cardLabel && (
                          <img
                            src={iconSrcs.cardLabel}
                            alt="credit card logo"
                          />
                        )}
                      </div>
                      <div>
                        <div className="stripe-input-container">
                          <SimpleStripeForm
                            ref={paymentFormRef}
                            amount={parseFloat(prices.finalTotal)}
                            userEmail={
                              delegates?.[0]?.email ||
                              delegates?.find((d) => d.email)?.email ||
                              companyDetails?.email ||
                              ""
                            }
                            companyName={companyDetails?.companyName || ""}
                            orderDescription={`Payment for ${delegates?.length || 1} delegate pass(es) - ${selectedPackage?.deligatePackageName || "Delegate Package"} - Event: ${eventDetails?.eventName || ""}`}
                            onPaymentSuccess={handlePaymentSuccess}
                            onPaymentError={handlePaymentError}
                          />
                        </div>
                        <div className="stripeBtnContainer">
                          <button
                            className="paymentButtonStripe"
                            onClick={handlePaymentClick}
                            disabled={paymentFormRef.current?.isProcessing}
                          >
                            {iconSrcs.lockIcon && (
                              <img src={iconSrcs.lockIcon} alt="" />
                            )}
                            {paymentFormRef.current?.isProcessing
                              ? "Processing..."
                              : "Pay Securely Now"}
                          </button>
                          <p>
                            This is a secure AES-256 bit SSL Encrypted payment.
                            You're safe.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {windowWidth >= 991 ? (
                  <div className="BookingFormV2_rightContainer__0senB">
                    <div className="BookingFormV2_order__pNfW4">
                      <div className="BookingFormV2_bar__KQ2vi">
                        <h2>Order Summary</h2>
                      </div>
                      <div className="BookingFormV2_orderInner__uVyCd">
                        <div className="BookingFormV2_cardContainer__YEc1F">
                          <div>
                            <TicketSVG />
                            <div className="BookingFormV2_ticketLogo__wN5Ja">
                              <img
                                src={navLogos?.whiteLogo}
                                alt="logo img"
                              ></img>
                            </div>
                          </div>
                        </div>
                        <OrderSummary />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="PageForm_footer__hOO1l">
              <div
                className="PageForm_footerInner__5Enax"
                style={{ maxWidth: "1280px" }}
              >
                <p>
                  <span
                    onClick={() => window.open("/privacy-policy", "_blank")}
                  >
                    Privacy Policy
                  </span>
                  <span className="PageForm_divide__vwhn0">|</span>
                  <span onClick={() => window.open("/cookie-policy", "_blank")}>
                    Cookie Policy
                  </span>
                  <span className="PageForm_divide__vwhn0">|</span>
                  <span
                    onClick={() => window.open("https://iq-hub.com/", "_blank")}
                  >
                    IQ International PTe.LTD
                  </span>
                </p>
                <p>©2026 Lithium Downstream Summit 2026</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ─── Step 1 render (CompanyRegistrationForm UI) ───────────────────────────
  return (
    <>
      <SeoHelmet />
      <div id="root">
        <div className="PageForm_container__NA5Wr">
          <div className="PageForm_header__7W2Cz">
            <div
              className="PageForm_headerInner__sdlhn"
              style={{ maxWidth: "1070px" }}
            >
              <img
                onClick={() => {
                  window.location.href = "/";
                }}
                src={navLogos?.whiteLogo}
                alt="site logo"
              ></img>
            </div>
          </div>
          <div className="BookingFormV2_container__XPZAc">
            <div>
              <div className="BookingFormV2_companyDetails__gy3Kt">
                <h1>Registration</h1>
                <form
                  action="#"
                  className="LDZ_2026_booking_form form_LDZ"
                  data-hs-cf-bound="true"
                  onSubmit={handleSubmit}
                >
                  <div className="BookingFormV2_companyForm__2HuYv">
                    <div className="BookingFormV2_bar__KQ2vi">
                      <h2>Company details</h2>
                    </div>
                    <div className="BookingFormV2_companyFormInner__pqUBT">
                      <div className="BookingFormV2_formRow__06cJs">
                        <TextField
                          label="Company name"
                          type="companyName"
                          variant="standard"
                          className="BookingFormV2_bottomMargin__NlvW-"
                          sx={{
                            "&.MuiFormControl-root": {
                              margin: "0px 25px 0px 0px",
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: "18px",
                              fontWeight: 600,
                              color: "#5e5e5e !important",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#9d9d9d",
                            },
                            "& .MuiInputLabel-root.Mui-error": {
                              color: "#d32f2f !important",
                            },
                          }}
                          id="companyName"
                          value={companyData.companyName}
                          onChange={(e) =>
                            handleCompanyDataChange(
                              "companyName",
                              e.target.value,
                            )
                          }
                          fullWidth
                          error={submitAttempted && companyErrors.companyName}
                          helperText={
                            submitAttempted && companyErrors.companyName
                              ? "Company name is required"
                              : ""
                          }
                          slotProps={{
                            formHelperText: {
                              sx: {
                                fontSize: "14px",
                                marginLeft: 0,
                                marginTop: "3px",
                                color: "#d32f2f !important",
                              },
                            },
                          }}
                        />
                        <br></br>
                        <TextField
                          label="Web address"
                          type="webAddress"
                          variant="standard"
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "18px",
                              fontWeight: 600,
                              color: "#5e5e5e !important",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#9d9d9d",
                            },
                          }}
                          id="webAddress"
                          value={companyData.webAddress}
                          onChange={(e) =>
                            handleCompanyDataChange(
                              "webAddress",
                              e.target.value,
                            )
                          }
                          fullWidth
                        />
                      </div>
                      <div className="BookingFormV2_formRow__06cJs">
                        <div className="BookingFormV2_formColumn__mzhg0">
                          <TextField
                            label="Address"
                            type="address"
                            variant="standard"
                            className="BookingFormV2_bottomMargin__NlvW-"
                            sx={{
                              "&.MuiFormControl-root": {
                                margin: "0px 25px 0px 0px",
                              },
                              "& .MuiInputLabel-root": {
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#5e5e5e !important",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottomColor: "#9d9d9d",
                              },
                              "& .MuiInputLabel-root.Mui-error": {
                                color: "#d32f2f !important",
                              },
                            }}
                            id="address"
                            value={companyData.address}
                            onChange={(e) =>
                              handleCompanyDataChange("address", e.target.value)
                            }
                            fullWidth
                            error={submitAttempted && companyErrors.address}
                            helperText={
                              submitAttempted && companyErrors.address
                                ? "Address is required"
                                : ""
                            }
                            slotProps={{
                              formHelperText: {
                                sx: {
                                  fontSize: "14px",
                                  marginLeft: 0,
                                  marginTop: "3px",
                                  color: "#d32f2f !important",
                                },
                              },
                            }}
                          />
                        </div>
                        <br></br>
                        <FormControl
                          fullWidth
                          error={submitAttempted && companyErrors.country}
                          variant="standard"
                        >
                          <Autocomplete
                            options={countries}
                            getOptionLabel={(option) => option || ""}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Choose a country"
                                variant="standard"
                                error={submitAttempted && companyErrors.country}
                                sx={{
                                  "& .MuiInputLabel-root": {
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#5e5e5e !important",
                                  },
                                  "& .MuiInputLabel-root.Mui-error": {
                                    color: "#d32f2f !important",
                                  },
                                  "& .MuiInput-underline:after": {
                                    borderBottomColor: "#9d9d9d",
                                  },
                                  "& .MuiInput-underline:before": {
                                    borderBottomColor:
                                      submitAttempted && companyErrors.country
                                        ? "#d32f2f !important"
                                        : "#9d9d9d",
                                  },
                                  "& .MuiInputBase-input": {
                                    color:
                                      submitAttempted && companyErrors.country
                                        ? "#d32f2f"
                                        : "inherit",
                                  },
                                }}
                              />
                            )}
                            id="country"
                            value={companyData.country}
                            onChange={(event, newValue) => {
                              handleCompanyDataChange("country", newValue);
                            }}
                          />
                          {submitAttempted && companyErrors.country && (
                            <FormHelperText
                              sx={{
                                fontSize: "14px",
                                marginLeft: 0,
                                marginTop: "3px",
                                color: "#d32f2f !important",
                              }}
                            >
                              Country is required
                            </FormHelperText>
                          )}
                        </FormControl>
                      </div>
                      <div className="BookingFormV2_formRow__06cJs">
                        <div className="BookingFormV2_formColumn__mzhg0">
                          <TextField
                            label="City"
                            type="city"
                            variant="standard"
                            sx={{
                              "&.MuiFormControl-root": {
                                margin: "0px 25px 0px 0px",
                              },
                              "& .MuiInputLabel-root": {
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#5e5e5e !important",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottomColor: "#9d9d9d",
                              },
                              "& .MuiInputLabel-root.Mui-error": {
                                color: "#d32f2f !important",
                              },
                            }}
                            id="city"
                            value={companyData.city}
                            onChange={(e) =>
                              handleCompanyDataChange("city", e.target.value)
                            }
                            fullWidth
                            error={submitAttempted && companyErrors.city}
                            helperText={
                              submitAttempted && companyErrors.city
                                ? "City is required"
                                : ""
                            }
                            slotProps={{
                              formHelperText: {
                                sx: {
                                  fontSize: "14px",
                                  marginLeft: 0,
                                  marginTop: "3px",
                                  color: "#d32f2f !important",
                                },
                              },
                            }}
                          />
                          <TextField
                            label={
                              <>
                                <span style={{ color: "#5e5e5e" }}>
                                  State
                                  <span
                                    style={{
                                      fontSize: "10px",
                                      fontWeight: 500,
                                      color: "#5e5e5e !important",
                                    }}
                                  >
                                    (Optional)
                                  </span>
                                </span>
                              </>
                            }
                            variant="standard"
                            sx={{
                              "& .MuiInputLabel-root": {
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#5e5e5e !important",
                              },
                              "& .MuiInput-underline:after": {
                                borderBottomColor: "#9d9d9d",
                              },
                            }}
                            id="state"
                            value={companyData.state}
                            onChange={(e) =>
                              handleCompanyDataChange("state", e.target.value)
                            }
                            fullWidth
                          />
                        </div>
                        <TextField
                          label="Postal/Zip code"
                          type="postal/zip code"
                          variant="standard"
                          className="BookingFormV2_bottomMargin__NlvW-"
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "18px",
                              fontWeight: 600,
                              color: "#5e5e5e !important",
                            },
                            "& .MuiInput-underline:after": {
                              borderBottomColor: "#9d9d9d",
                            },
                            "& .MuiInputLabel-root.Mui-error": {
                              color: "#d32f2f !important",
                            },
                          }}
                          id="postalCode"
                          value={companyData.postalCode}
                          onChange={(e) =>
                            handleCompanyDataChange(
                              "postalCode",
                              e.target.value,
                            )
                          }
                          fullWidth
                          error={submitAttempted && companyErrors.postalCode}
                          helperText={
                            submitAttempted && companyErrors.postalCode
                              ? "Postal code is required"
                              : ""
                          }
                          slotProps={{
                            formHelperText: {
                              sx: {
                                fontSize: "14px",
                                marginLeft: 0,
                                marginTop: "3px",
                                color: "#d32f2f !important",
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {delegates.map((delegate, index) => (
                      <div
                        key={delegate.id}
                        className="BookingFormV2_delegateForm__7l3nY"
                      >
                        <div className="BookingFormV2_bar__KQ2vi">
                          <h2>Delegate {index + 1}</h2>
                          {index > 0 && (
                            <div className="BookingFormV2_delbtnContainer__g7D+b">
                              <Button
                                className="BookingFormV2_delBtn__3MPla"
                                onClick={() => removeDelegate(delegate.id)}
                              >
                                {iconSrcs.closeBtn && (
                                  <img src={iconSrcs.closeBtn} alt="closeBtn" />
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                        <div className="BookingFormV2_delegateFormInner__PM9nL">
                          <div>
                            <div>
                              <div className="BookingFormV2_formRow__06cJs">
                                <div className="BookingFormV2_formColumn__mzhg0">
                                  <TextField
                                    label="First name"
                                    type="firstName"
                                    variant="standard"
                                    sx={{
                                      "&.MuiFormControl-root": {
                                        margin: "0px 25px 0px 0px",
                                      },
                                      "& .MuiInputLabel-root": {
                                        fontSize: "18px",
                                        fontWeight: 600,
                                        color: "#5e5e5e !important",
                                      },
                                      "& .MuiInput-underline:after": {
                                        borderBottomColor: "#9d9d9d",
                                      },
                                      "& .MuiInputLabel-root.Mui-error": {
                                        color: "#d32f2f !important",
                                      },
                                    }}
                                    value={delegate.firstName}
                                    onChange={(e) =>
                                      handleDelegateChange(
                                        delegate.id,
                                        "firstName",
                                        e.target.value,
                                      )
                                    }
                                    fullWidth
                                    error={getDelegateFieldError(
                                      delegate.id,
                                      "firstName",
                                    )}
                                    helperText={getDelegateFieldErrorMessage(
                                      delegate.id,
                                      "firstName",
                                    )}
                                    slotProps={{
                                      formHelperText: {
                                        sx: {
                                          fontSize: "14px",
                                          marginLeft: 0,
                                          marginTop: "3px",
                                          color: "#d32f2f !important",
                                        },
                                      },
                                    }}
                                  />
                                  <TextField
                                    label="Last name"
                                    type="lastName"
                                    variant="standard"
                                    sx={{
                                      "& .MuiInputLabel-root": {
                                        fontSize: "18px",
                                        fontWeight: 600,
                                        color: "#5e5e5e !important",
                                      },
                                      "& .MuiInput-underline:before": {
                                        borderBottomColor: "#9d9d9d",
                                      },
                                      "& .MuiInput-underline:after": {
                                        borderBottomColor: "#9d9d9d",
                                      },
                                      "& .MuiInputLabel-root.Mui-error": {
                                        color: "#d32f2f !important",
                                      },
                                    }}
                                    value={delegate.lastName}
                                    onChange={(e) =>
                                      handleDelegateChange(
                                        delegate.id,
                                        "lastName",
                                        e.target.value,
                                      )
                                    }
                                    fullWidth
                                    error={getDelegateFieldError(
                                      delegate.id,
                                      "lastName",
                                    )}
                                    helperText={getDelegateFieldErrorMessage(
                                      delegate.id,
                                      "lastName",
                                    )}
                                    slotProps={{
                                      formHelperText: {
                                        sx: {
                                          fontSize: "14px",
                                          marginLeft: 0,
                                          marginTop: "3px",
                                          color: "#d32f2f !important",
                                        },
                                      },
                                    }}
                                  />
                                </div>
                                <div className="BookingFormV2_inputRow__-6MII">
                                  <MuiTelInput
                                    ref={phoneInputRef}
                                    variant="standard"
                                    label="Mobile"
                                    defaultCountry="US"
                                    sx={{
                                      "& .MuiButtonBase-root": {
                                        outline: "none",
                                        position: "relative",
                                        paddingRight: "16px",
                                      },
                                      "& .MuiButtonBase-root::after": {
                                        content: '""',
                                        position: "absolute",
                                        right: "1px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        borderLeft: "4px solid transparent",
                                        borderRight: "4px solid transparent",
                                        borderTop: "5px solid #5e5e5e",
                                        pointerEvents: "none",
                                      },
                                      "& .MuiInputLabel-root": {
                                        fontSize: "18px",
                                        fontWeight: 600,
                                        color: "#5e5e5e !important",
                                      },
                                      "& .MuiInput-underline:before": {
                                        borderBottomColor: "#9d9d9d",
                                      },
                                      "& .MuiInput-underline:after": {
                                        borderBottomColor: "#9d9d9d",
                                      },
                                      "& .MuiInputLabel-root.Mui-error": {
                                        color: "#d32f2f !important",
                                      },
                                    }}
                                    value={delegate.mobile}
                                    onChange={(value, info) => {
                                      const minValue = "+1";
                                      if (
                                        !value ||
                                        value.length < minValue.length
                                      ) {
                                        handleDelegateChange(
                                          delegate.id,
                                          "mobile",
                                          minValue,
                                        );
                                        return;
                                      }
                                      const nationalNumber =
                                        info?.nationalNumber || "";
                                      const digitsOnly = nationalNumber.replace(
                                        /\D/g,
                                        "",
                                      );
                                      if (digitsOnly.length <= 10) {
                                        handleDelegateChange(
                                          delegate.id,
                                          "mobile",
                                          value,
                                        );
                                      }
                                    }}
                                    onFocus={(event) => {
                                      setTimeout(() => {
                                        const input = event.target;
                                        if (input.selectionStart < 3) {
                                          input.setSelectionRange(3, 3);
                                        }
                                      }, 0);
                                    }}
                                    inputProps={{
                                      onKeyDown: (event) => {
                                        const input = event.target;
                                        const cursorPosition =
                                          input.selectionStart;
                                        if (
                                          (event.key === "Backspace" ||
                                            event.key === "Delete") &&
                                          cursorPosition <= 3
                                        ) {
                                          event.preventDefault();
                                        }
                                        if (
                                          ["ArrowLeft", "Home"].includes(
                                            event.key,
                                          ) &&
                                          cursorPosition <= 3
                                        ) {
                                          event.preventDefault();
                                          input.setSelectionRange(3, 3);
                                        }
                                      },
                                    }}
                                    fullWidth
                                    error={getDelegateFieldError(
                                      delegate.id,
                                      "mobile",
                                    )}
                                    helperText={getDelegateFieldErrorMessage(
                                      delegate.id,
                                      "mobile",
                                    )}
                                    slotProps={{
                                      formHelperText: {
                                        sx: {
                                          fontSize: "14px",
                                          marginLeft: 0,
                                          marginTop: "3px",
                                          color: "#d32f2f !important",
                                        },
                                      },
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="BookingFormV2_formRow__06cJs">
                                <TextField
                                  label="Position"
                                  type="position"
                                  variant="standard"
                                  className="BookingFormV2_bottomMargin__NlvW-"
                                  sx={{
                                    "&.MuiFormControl-root": {
                                      margin: "0px 25px 0px 0px",
                                    },
                                    "& .MuiInputLabel-root": {
                                      fontSize: "18px",
                                      fontWeight: 600,
                                      color: "#5e5e5e !important",
                                    },
                                    "& .MuiInput-underline:after": {
                                      borderBottomColor: "#9d9d9d",
                                    },
                                    "& .MuiInputLabel-root.Mui-error": {
                                      color: "#d32f2f !important",
                                    },
                                  }}
                                  value={delegate.position}
                                  onChange={(e) =>
                                    handleDelegateChange(
                                      delegate.id,
                                      "position",
                                      e.target.value,
                                    )
                                  }
                                  fullWidth
                                  error={getDelegateFieldError(
                                    delegate.id,
                                    "position",
                                  )}
                                  helperText={getDelegateFieldErrorMessage(
                                    delegate.id,
                                    "position",
                                  )}
                                  slotProps={{
                                    formHelperText: {
                                      sx: {
                                        fontSize: "14px",
                                        marginLeft: 0,
                                        marginTop: "3px",
                                        color: "#d32f2f !important",
                                      },
                                    },
                                  }}
                                />
                                <br></br>
                                <TextField
                                  label="Email address"
                                  type="emailAddress"
                                  variant="standard"
                                  sx={{
                                    "& .MuiInputLabel-root": {
                                      fontSize: "18px",
                                      fontWeight: 600,
                                      color: "#5e5e5e !important",
                                    },
                                    "& .MuiInput-underline:after": {
                                      borderBottomColor: "#9d9d9d",
                                    },
                                    "& .MuiInputLabel-root.Mui-error": {
                                      color: "#d32f2f !important",
                                    },
                                  }}
                                  value={delegate.email}
                                  onChange={(e) =>
                                    handleDelegateChange(
                                      delegate.id,
                                      "email",
                                      e.target.value,
                                    )
                                  }
                                  fullWidth
                                  error={getDelegateFieldError(
                                    delegate.id,
                                    "email",
                                  )}
                                  helperText={getDelegateFieldErrorMessage(
                                    delegate.id,
                                    "email",
                                  )}
                                  slotProps={{
                                    formHelperText: {
                                      sx: {
                                        fontSize: "14px",
                                        marginLeft: 0,
                                        marginTop: "3px",
                                        color: "#d32f2f !important",
                                      },
                                    },
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="BookingFormV2_addbtnContainer__AsQQo">
                    <Button
                      variant="contained"
                      className="BookingFormV2_delBtn__3MPla"
                      onClick={addDelegate}
                    >
                      {iconSrcs.plusIcon && (
                        <img src={iconSrcs.plusIcon} alt="plusIcon" />
                      )}
                      Add Delegate
                    </Button>
                  </div>
                  <div className="BookingFormV2_submitContainer__qnA3B">
                    <div>
                      <input
                        type="checkbox"
                        checked={termsAgreement}
                        onChange={(e) => {
                          setTermsAgreement(e.target.checked);
                          if (submitAttempted && e.target.checked) {
                            setTermsError(false);
                          }
                        }}
                      ></input>
                      <label
                        style={{
                          color: submitAttempted && termsError ? "#b00020" : "",
                        }}
                      >
                        Please tick to confirm your agreement to the&nbsp;
                        <a
                          href="/terms-and-conditions"
                          style={{
                            color:
                              submitAttempted && termsError ? "#b00020" : "",
                            borderColor:
                              submitAttempted && termsError ? "#b00020" : "",
                          }}
                        >
                          terms and conditions
                        </a>
                      </label>
                    </div>
                    <input
                      type="submit"
                      className="BookingFormV2_submitBtn__nFF03"
                      value={submitBtnCheck ? "Please Wait" : "Submit"}
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <PageFooter />
        </div>
      </div>
    </>
  );
};

export default CompanyRegistrationForm;
