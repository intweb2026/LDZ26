import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/assets/css/payOnline.css";
import Navbar from "./Navbar";
import SubscribeForm from "./SubscribeForm";
import Footer from "../Footer";
import LogoCarousel from "./LogoCarousel";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SimpleStripeForm from "./PaymentForm";
import { Helmet } from "react-helmet-async";
import { useSSRData } from "../common/useSSRData";
import { useApiData } from "../common/ApiContext";
import { usePageSeo } from "../common/usePageSeo";
import API_BASE_URL from '../config/apiConfig';
const lockIcon = "/images/WebCommonImages/payment-lock.png";
const cardLabel = "/images/WebCommonImages/card-labels.png";

const PayOnline = () => {
  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();

  // ✅ Initialize from SSR data (direct URL load) or fetch client-side (button navigation)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const navigate = useNavigate();
  const paymentFormRef = useRef(null);

  const [payFormData, setPayFormData] = useState({
    amount: "",
    invoiceNumber: "",
    email: "",
  });

  const toEmails = useSSRData("toEmails") || "benny.scott@iq-hub.com";

  const handlePayFormChange = (e) => {
    const { name, value } = e.target;
    setPayFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentClick = () => {
    if (paymentFormRef.current) {
      paymentFormRef.current.submitPayment();
    }
  };

  const handlePaymentSuccess = (data) => {
    // toast.success("Payment Successful!");
    // console.log("Payment Success:", data);
    navigate("/thank-you", { state: { authorized: true } });
  };

  const handlePaymentError = (errorMsg) => {
    toast.error(errorMsg || "Payment Failed");
    console.error("Payment Error:", errorMsg);
  };

  const [showStripeForm, setShowStripeForm] = useState(false);


  const handleInitialPayClick = (e) => {
    e.preventDefault();

    if (!payFormData.amount || parseFloat(payFormData.amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (!payFormData.invoiceNumber || !payFormData.invoiceNumber.trim()) {
      toast.error("Please enter an Invoice Number.");
      return;
    }
    if (!payFormData.email || !emailRegex.test(payFormData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    async function sendPayOnlineEmail() {
      const payOnlineHtml = `
      <h3>Pay Online Request</h3>
      <div style='width: 60%; background-color: transparent; color: black;'>
        <table style='width: 100%; border-collapse: collapse;'>
          <tr><td style='width: 50%; padding: 8px;'>Invoice No:</td><td style='width: 35%; padding: 8px;'>${payFormData?.invoiceNumber}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Amount:</td><td style='width: 35%; padding: 8px;'>${payFormData?.amount}</td></tr>
          <tr><td style='width: 50%; padding: 8px;'>Email:</td><td style='width: 35%; padding: 8px;'>${payFormData?.email}</td></tr>
        </table>
      </div>
    `;

      const emailPayload = {
        // toemail:"sam.razura@iq-hub.com,chris.smith@iq-hub.com,leo.newman@iq-hub.com,arthur.pina@iq-hub.com,ks@iq-hub.com,ken.peters@iq-hub.com,",
        toemail: toEmails,
        cc: "",
        subject: `${eventDetails?.eventShortCode} - Pay Online Request`,
        html: payOnlineHtml,
      };

      try {
        const emailResponse = await fetch(
          `${API_BASE_URL}/admin1/sendmail`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailPayload),
          }
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

    const finalData = new FormData();
    finalData.append("invoiceNo", payFormData?.invoiceNumber);
    finalData.append("totalPayAmount", payFormData?.amount);
    finalData.append("email", payFormData?.email);

    fetch(`${API_BASE_URL}/admin1/addpayonlinerequest`, {
      method: "POST",
      body: finalData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          sendPayOnlineEmail(); // ✅ Only send email on success
          setShowStripeForm(true); // ✅ Only show Stripe form on success
        } else {
          toast.error(data?.message);
        }
      })
      .catch((error) => {
        console.error("error: ", error);
        toast.error("There was an error, Please try again later.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const target = document.getElementById("payOnlineHeading");
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset;
        const offset = 150; // height of your navbar

        window.scrollTo({
          top: top - offset,
          behavior: "smooth",
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const pageSeo = usePageSeo("pay-online");
  const seoTitle = pageSeo.pageMetaTitle;
  const seoDescription = pageSeo.pageMetaDescription;
  const seoImage = pageSeo.pageOgImage || null;


  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
        {seoImage && <meta property="og:image" content={seoImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        {seoImage && <meta name="twitter:image" content={seoImage} />}
        <link rel="canonical" href=`${API_BASE_URL}/pay-online` />
      </Helmet>
      <Navbar forceScrolled />
      <div style={{ marginTop: windowWidth > 1024 ? "120px" : "" }}>
        <article className="PayOnline_container__lSTKr">
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
          <div className="PayOnline_paymentContainer__wFbAP">
            {!showStripeForm ? (
              <div id="payOnlineHeading">
                <h2>pay online</h2>
                <p>We accept all major credit and debit cards.</p>
                <div className="LDZ_2026_payonline_form PayOnline_form__O6V2c form_LDZ">
                  <form id="LDZ-(Pay Online 2026)" data-hs-cf-bound="true">
                    <div className="PayOnline_inputs__r1BVt">
                      <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={payFormData.amount}
                        onChange={handlePayFormChange}
                        style={{ MozAppearance: "textfield" }}
                      />
                      <input
                        type="text"
                        name="invoiceNumber"
                        placeholder="Invoice Number"
                        value={payFormData.invoiceNumber}
                        onChange={handlePayFormChange}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={payFormData.email}
                        onChange={handlePayFormChange}
                      />
                    </div>
                    <div className="PayOnline_submit__GYabM">
                      <p>
                        Should you have any queries, please do not hesitate to contact our delegate support team at{' '}
                        <a href="mailto:delegates@iq-hub.com?subject=Litihium Downstream Summit 2026">delegates@iq-hub.com</a>
                      </p>
                      <button type="button" onClick={handleInitialPayClick}>Pay Now</button>
                    </div>
                    <div className="PayOnline_logos__u4LhC">
                      <div className="image-card-labels">
                        <img src={cardLabel} alt="card label"></img>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div>
                <h1 style={{ marginBottom: '30px' }}>ADD PAYMENT DETAILS</h1>
                <div className="stripe-input-container">
                  <SimpleStripeForm
                    ref={paymentFormRef}
                    amount={parseFloat(payFormData.amount) || 0}
                    userEmail={payFormData.email}
                    companyName={payFormData.invoiceNumber}
                    orderDescription={`Payment for Invoice: ${payFormData.invoiceNumber}`}
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
            )}
          </div>
        </article>
      </div>
      <LogoCarousel />
      <SubscribeForm />
      <Footer />
    </>
  );
};

export default PayOnline;
