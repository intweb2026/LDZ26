import { useState, useEffect, useRef } from "react";
import "../../src/assets/css/BookingForm.css";
import { useNavigate, useLocation } from "react-router-dom";
import SimpleStripeForm from "./PaymentForm";
import { useApiData } from "../../src/common/ApiContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSSRData } from "../common/useSSRData";
import API_BASE_URL, { mediaUrl } from '../config/apiConfig';
const toggle = "/images/WebCommonImages/toggle.png";
const cardLabel = "/images/WebCommonImages/card-labels.png";
const lockIcon = "/images/WebCommonImages/lock.png";
const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPackage = location?.state?.selectedPackage;
  const delegates = location?.state?.delegates;
  const companyDetails = location?.state?.companyData;
  const invopiceNo = location?.state?.uniqueInvoiceNo;
  const [delegateAddOns, setDelegateAddOns] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountData, setDiscountData] = useState("");
  const paymentFormRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const toEmails = useSSRData("toEmails") || "benny.scott@iq-hub.com";
  const discountInputRef = useRef(null);

  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
    navLogos,
  } = useApiData();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePaymentClick = async () => {
    // Validate amount
    if (!prices.finalTotal || parseFloat(prices.finalTotal) <= 0) {
      // toast.error("Invalid payment amount.");
      console.log("Invalid payment amount.");
      return;
    }

    // Validate delegates
    if (!delegates || delegates.length === 0) {
      // toast.error(
      //   "No delegates found. Please go back and add delegate information.",
      // );
      console.log(
        "No delegates found. Please go back and add delegate information.",
      );

      return;
    }

    // Function to send Step 2 email
    async function sendStep2Email() {
      // Build Step 2 HTML content (pricing details)
      let step2Html = `
      <h3>Booking Form Step 2</h3>
      <div style='width: 60%; background-color: transparent; color: black;'>
        <table style='width: 100%; border-collapse: collapse;'>
          <tr><td style='width: 50%; padding: 8px;'>Delegate pass ${delegates.length}:</td><td style='width: 35%; padding: 8px;'>${eventGeneralSettings?.currencySymbol} ${prices.initialPrice}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Discount:</td><td style='width: 35%; padding: 8px;'>${eventGeneralSettings?.currencySymbol} ${prices.discountAmount}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Taxes and Service Charges:</td><td style='width: 35%; padding: 8px;'>${eventGeneralSettings?.currencySymbol} ${prices.taxAmount}</td></tr>
          <tr><td colspan='2' style='font-weight: bold; padding: 8px;'>Add Ons:</td></tr>
    `;

      // Add selected add-ons
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
          <tr><td style='width: 50%; padding: 8px;'>Company Name:</td><td style='width: 50%; padding: 8px;'>${companyDetails?.companyName || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Web Address:</td><td style='width: 50%; padding: 8px;'>${companyDetails?.webAddress || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Address:</td><td style='width: 50%; padding: 8px;'>${companyDetails?.address || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>City:</td><td style='width: 50%; padding: 8px;'>${companyDetails?.city || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Country:</td><td style='width: 50%; padding: 8px;'>${companyDetails?.country || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Postal Code:</td><td style='width: 50%; padding: 8px;'>${companyDetails?.postalCode || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>State:</td><td style='width: 50%; padding: 8px;'>${companyDetails?.state || ""}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Invoice no:</td><td style='width: 50%; padding: 8px;'>${invopiceNo || ""}</td></tr>
    `;

      // Add all delegates
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

      step2Html += `
        </table>
      </div>
    `;

      // Prepare email payload
      const emailPayload = {
        // toemail: "sam.razura@iq-hub.com,chris.smith@iq-hub.com,leo.newman@iq-hub.com,arthur.pina@iq-hub.com,ks@iq-hub.com,ken.peters@iq-hub.com,",
        toemail: toEmails,
        cc: "",
        subject: `${eventDetails?.eventShortCode} - Booking Form Step 2`,
        html: step2Html,
      };

      try {
        const emailResponse = await fetch(
          `${API_BASE_URL}/admin1/sendmail`,
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
        // Don't block payment even if email fails
      }
    }

    try {
      // Send Step 2 email (don't await - let it run in background)
      sendStep2Email().catch((err) => console.log("Email error:", err));

      // Check if payment form is ready
      if (paymentFormRef.current) {
        // Trigger payment submission
        await paymentFormRef.current.submitPayment();
      } else {
        // toast.error("Payment form is not ready. Please try again.");
        console.log("❌ Error in payment process:");
      }
    } catch (error) {
      console.log("❌ Error in payment process:");
    }
  };
  const handlePaymentSuccess = async (stripeResponse) => {
    console.log("stripeResponse: ", stripeResponse);

    // Function to send Step 3 email (after successful payment)
    async function sendStep3Email() {
      // Build Step 3 HTML content with better styling
      let step3Html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
        }
        h2 {
            color: #333;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        h3 {
            color: #555;
            margin-top: 25px;
            margin-bottom: 15px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        td {
            padding: 10px 8px;
            border-bottom: 1px solid #e0e0e0;
        }
        .label {
            width: 50%;
            color: #666;
            font-weight: 500;
        }
        .value {
            width: 50%;
            color: #333;
        }
        .section-header {
            background-color: #f0f0f0;
            font-weight: bold;
            color: #333;
            padding: 12px 8px !important;
        }
        .total-row {
            font-weight: 700;
            font-size: 16px;
            background-color: #f9f9f9;
        }
        .divider {
            border: none;
            height: 2px;
            background-color: #7c7c7c;
            margin: 30px 0;
        }
        .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #e0e0e0;
        }
        .invoice-label {
            font-weight: 600;
            color: #666;
        }
        .invoice-value {
            font-weight: 700;
            color: #333;
        }
        .success-badge {
            background-color: #4CAF50;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            display: inline-block;
            margin-bottom: 20px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success-badge">✓ Payment Successful</div>
        
        <!-- Booking Form Step 3 -->
        <h2>Booking Form Step 3</h2>
        <div class="invoice-header">
            <span class="invoice-label">Invoice No:</span>
            <span class="invoice-value">${invopiceNo || ""}</span>
        </div>
        <div class="invoice-header">
            <span class="invoice-label">Transaction ID:</span>
            <span class="invoice-value">${stripeResponse.paymentIntentId || ""}</span>
        </div>

        <!-- Booking Form Step 2 -->
        <h2>Booking Form Step 2</h2>
        <table>
            <tr>
                <td class="label">Delegate pass ${delegates.length}:</td>
                <td class="value">${eventGeneralSettings?.currencySymbol} ${prices.initialPrice}</td>
            </tr>
            <tr>
                <td class="label">Discount:</td>
                <td class="value">${eventGeneralSettings?.currencySymbol} ${prices.discountAmount}</td>
            </tr>
            <tr>
                <td class="label">Taxes and Service Charges:</td>
                <td class="value">${eventGeneralSettings?.currencySymbol} ${prices.taxAmount}</td>
            </tr>
            <tr>
                <td colspan="2" class="section-header">Add Ons:</td>
            </tr>
    `;

      // Add selected add-ons
      if (selectedAddOns && selectedAddOns.length > 0) {
        selectedAddOns.forEach((addOn) => {
          step3Html += `
            <tr>
                <td class="label">${addOn.addOnPointName}:</td>
                <td class="value">${eventGeneralSettings?.currencySymbol} ${addOn.additionalPrice}</td>
            </tr>
        `;
        });
      } else {
        step3Html += `
            <tr>
                <td colspan="2" style="padding: 8px; color: #999; font-style: italic;">No add-ons selected</td>
            </tr>
        `;
      }

      step3Html += `
            <tr class="total-row">
                <td class="label">Total Amount Paid:</td>
                <td class="value">${eventGeneralSettings?.currencySymbol} ${prices.finalTotal}</td>
            </tr>
        </table>

        <hr class="divider">

        <!-- Booking Form Step 1 -->
        <h2>Booking Form Step 1</h2>
        
        <h3>Company Details</h3>
        <table>
            <tr>
                <td class="label">Company Name:</td>
                <td class="value">${companyDetails?.companyName || ""}</td>
            </tr>
            <tr>
                <td class="label">Web Address:</td>
                <td class="value">${companyDetails?.webAddress || ""}</td>
            </tr>
            <tr>
                <td class="label">Address:</td>
                <td class="value">${companyDetails?.address || ""}</td>
            </tr>
            <tr>
                <td class="label">City:</td>
                <td class="value">${companyDetails?.city || ""}</td>
            </tr>
            <tr>
                <td class="label">Country:</td>
                <td class="value">${companyDetails?.country || ""}</td>
            </tr>
            <tr>
                <td class="label">Postal Code:</td>
                <td class="value">${companyDetails?.postalCode || ""}</td>
            </tr>
            <tr>
                <td class="label">State:</td>
                <td class="value">${companyDetails?.state || ""}</td>
            </tr>
            <tr>
                <td class="label">Invoice no:</td>
                <td class="value">${invopiceNo || ""}</td>
            </tr>
        </table>
    `;

      // Add all delegates
      delegates.forEach((delegate, index) => {
        step3Html += `
        <h3>Delegate ${index + 1} Details</h3>
        <table>
            <tr>
                <td class="label">Email:</td>
                <td class="value">${delegate.email || ""}</td>
            </tr>
            <tr>
                <td class="label">First Name:</td>
                <td class="value">${delegate.firstName || ""}</td>
            </tr>
            <tr>
                <td class="label">Last Name:</td>
                <td class="value">${delegate.lastName || ""}</td>
            </tr>
            <tr>
                <td class="label">Phone Number:</td>
                <td class="value">${delegate.mobile || ""}</td>
            </tr>
            <tr>
                <td class="label">Position:</td>
                <td class="value">${delegate.position || ""}</td>
            </tr>
        </table>
      `;
      });

      step3Html += `
        <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0; border-radius: 4px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
                Thank you for your booking! If you have any questions, please contact us.
            </p>
        </div>
    </div>
</body>
</html>
    `;

      // Prepare email payload
      const emailPayload = {
        // toemail: "sam.razura@iq-hub.com,chris.smith@iq-hub.com,leo.newman@iq-hub.com,arthur.pina@iq-hub.com,ks@iq-hub.com,ken.peters@iq-hub.com",
        toemail: toEmails,
        cc: "",
        subject: `${eventDetails?.eventShortCode} - Booking Confirmation - Payment Successful`,
        html: step3Html,
      };

      try {
        const emailResponse = await fetch(
          `${API_BASE_URL}/admin1/sendmail`,
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
      finalData.append("companyName", companyDetails?.companyName);
      finalData.append("companyWebsite", companyDetails?.webAddress);
      finalData.append("companyAddress", companyDetails?.address);
      finalData.append("companyCountry", companyDetails?.country);
      finalData.append("companyState", companyDetails?.state);
      finalData.append("companyCity", companyDetails?.city);
      finalData.append("companyPincode", companyDetails.postalCode);
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
      finalData.append("invoiceNo", invopiceNo);


      const requestOptions = {
        method: "POST",
        body: finalData,
      };

      fetch(
        `${API_BASE_URL}/admin1/addnewdelegate`,
        requestOptions,
      )
        .then((response) => response.json())
        .then(async (data) => {
          if (data.status) {
            console.log("Payment successful:", stripeResponse);

            // Send confirmation email after successful payment
            console.log("📧 Sending confirmation email...");
            const emailResult = await sendStep3Email();

            if (emailResult.success) {
              console.log("✅ Confirmation email sent successfully");
            } else {
              console.log(
                "⚠️ Email sending failed, but payment was successful:",
                emailResult.error,
              );
            }

            navigate("/thank-you", { state: { authorized: true } });
          } else {
            // toast.error(data?.message);

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
  // ADD THIS: Error handler
  const handlePaymentError = (error) => {
    console.log("Payment failed:", error);
    // toast.error(`Payment failed: ${error}`);
  };

  useEffect(() => {
    callDelegateAddOnsApi();
    // eslint-disable-next-line
  }, []);

  const callDelegateAddOnsApi = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch(
      `${API_BASE_URL}/admin1/delegatepackageaddons`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          setDelegateAddOns(data["delegateAddOns"]);
          // setTotalCount(data?.paginationDetails?.count);
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

    fetch(`${API_BASE_URL}/admin1/offercouponbycode`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status) {
          const returnedCoupon = data["offerCoupons"]?.[0];

          // ✅ Only apply discount if returned coupon code EXACTLY matches what user typed
          if (
            returnedCoupon?.couponCode?.toUpperCase().trim() ===
            code.toUpperCase().trim()
          ) {
            setDiscountData(data["offerCoupons"]);
            setDiscountPercent(returnedCoupon?.discountAmount);
          } else {
            // Partial match returned — reset discount
            setDiscountData("");
            setDiscountPercent(0);
          }
        } else {
          // API returned no match — reset discount
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

    // Initial price (delegates × package price)
    const initialPrice = numDelegates * packagePrice;

    // Calculate discount amount
    const discountAmount = (initialPrice * discountPercent) / 100;
    const priceAfterDiscount = initialPrice - discountAmount;

    // Calculate add-ons total
    const addOnsTotal = selectedAddOns.reduce((sum, addOn) => {
      return sum + parseFloat(addOn.additionalPrice || 0);
    }, 0);

    // Calculate tax on (price after discount + add-ons)
    const taxableAmount = priceAfterDiscount + addOnsTotal;
    const taxAmount = (taxableAmount * taxPercent) / 100;

    // Calculate final total
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

  const prices = calculatePrices();

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
              // Keep focus on input after state update
              setTimeout(() => discountInputRef.current?.focus(), 0);
            }}
          />
        </div>
      </div>
      <div className="BookingFormV2_summary__t3Eo5">
        <div className="BookingFormV2_toggle__ZtkTL">
          <img
            src={toggle}
            alt="toggle icon"
            style={{ cursor: "pointer", transform: "rotate3D(0deg)" }}
          />
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

  return (
    <div id="root">
      <div className="PageForm_container__NA5Wr">
        <div className="PageForm_header__7W2Cz">
          <div
            className="PageForm_headerInner__sdlhn"
            style={{ maxWidth: "1280px" }}
          >
            <img
              onClick={() => { window.location.href = "/"; }}
              src={mediaUrl(navLogos?.whiteLogo)}
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
                          <div className="BookingFormV2_ticketLogo__wN5Ja">
                            <img src={mediaUrl(navLogos?.whiteLogo)} alt="logo img"></img>
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
                    <img src={cardLabel} alt="credit card logo"></img>
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
                        orderDescription={`Payment for ${delegates?.length || 1
                          } delegate pass(es) - ${selectedPackage?.deligatePackageName ||
                          "Delegate Package"
                          } - Event: ${eventDetails?.eventName || ""}`}
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
                        <img src={lockIcon} alt=""></img>
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
                        <div className="BookingFormV2_ticketLogo__wN5Ja">
                          <img src={mediaUrl(navLogos?.whiteLogo)} alt="logo img"></img>
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
              <span onClick={() => window.open("/privacy-policy", "_blank")}>
                Privacy Policy
              </span>
              <span className="PageForm_divide__vwhn0">|</span>
              <span onClick={() => window.open("/cookie-policy", "_blank")}>
                Cookie Policy
              </span>
              <span className="PageForm_divide__vwhn0">|</span>IQ International PTe.
              LTD
            </p>
            <p>©2026 Lithium Downstream Summit 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
