import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/SubscribeForm.css"
import { useApiData } from "../../src/common/ApiContext";
const SubscribeForm = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberNameError, setSubscriberNameError] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscriberEmailError, setSubscriberEmailError] = useState("");
  const [subscriberErrorMessage, setSubscriberErrorMessage] = useState("");
  const [subscriberSuccessMessage, setSubscriberSuccessMessage] = useState("");
  const { eventDetails, eventGeneralSettings, navLogos } = useApiData();
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const checkOnChange = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setSubscriberErrorMessage(<p className="SubscribeforUpdates_error__kzSBx">Email address is required</p>);
      setSubscriberEmailError(true);
    } else if (!emailRegex.test(email)) {
      setSubscriberErrorMessage(<p className="SubscribeforUpdates_error__kzSBx">Invalid email address</p>);
      setSubscriberEmailError(true);
    } else {
      setSubscriberErrorMessage("");
      setSubscriberEmailError(false);
    }
  };

  async function sendSubscriptionEmail(email) {
    const htmlContent = `
  <p><strong>Thank you for subscribing!</strong></p>
  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
  <p><u><strong>Quick Access</strong></u><br/>
  Link: <a href="https://www.linq-staging-site.com">https://www.linq-staging-site.com</a></p>
`;

    const emailPayload = {
      toemail: subscriberEmail,
      cc: "",
      subject: `SUBSCRIPTION: ${eventDetails?.eventName}`,
      html: htmlContent,
    };

    try {
      const emailResponse = await fetch(
        "https://www.linq-staging-site.com/admin1/sendmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailPayload),
        }
      );
      const emailResult = await emailResponse.json();
      if (emailResult.status === "success") {
        console.log("✅ Subscription email sent successfully");
      } else {
        console.error("❌ Subscription email sending failed:", emailResult.message);
      }
    } catch (error) {
      console.error("❌ Error sending subscription email:", error);
    }
  }

  const submitBtnClk = async (e) => {   // 👈 made async
    e.preventDefault();

    let hasError = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setSubscriberEmailError(false);
    setSubscriberNameError(false);
    setSubscriberErrorMessage("");

    if (!subscriberEmail || subscriberEmail.trim() === "") {
      setSubscriberErrorMessage(<p className="SubscribeforUpdates_error__kzSBx">Email address is required</p>);
      setSubscriberEmailError(true);
      hasError = true;
    } else if (!emailRegex.test(subscriberEmail)) {
      setSubscriberErrorMessage(<p className="SubscribeforUpdates_error__kzSBx">Invalid email address</p>);
      setSubscriberEmailError(true);
      hasError = true;
    } else {
      setSubscriberErrorMessage("");
    }

    if (hasError) return;

    const finalData = new FormData();
    finalData.append("subscriberName", subscriberName);
    finalData.append("subscriberEmail", subscriberEmail);

    try {
      const response = await fetch("https://www.linq-staging-site.com/admin1/addsubscriber", {
        method: "POST",
        body: finalData,
      });
      const data = await response.json();

      if (data.status) {
        // ✅ Send confirmation email only on successful subscription
        await sendSubscriptionEmail(subscriberEmail);

        setSubscriberSuccessMessage(<p style={{ color: 'green' }}>Subscribed Successfully</p>);
        setTimeout(() => setSubscriberSuccessMessage(""), 5000);

        setSubscriberEmail("");
        setSubscriberName("");
      } else {
        // toast.error(data?.message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="SubscribeforUpdates_updatesContainer__DD3wT">
      <div>
        <div>
          <h2>SUBSCRIBE FOR UPDATES</h2>
          <p>By submitting, you agree to receive email communications from the event organizers, including upcoming promotions and discounted tickets, new, and access to related events.</p>
          <form id="LDZ-(Subscribe For Updates 2026)" encType="multipart/form-data" method="POST" data-hs-cf-bound="true" onSubmit={submitBtnClk}>
            <div className="SubscribeforUpdates_from__REPoW">
              <input
                name="name"
                placeholder="Name"
                value={subscriberName}
                onChange={(e) => {
                  setSubscriberName(e.target.value);
                  setSubscriberNameError(false);
                }}
              />
              <div>
                <input
                  name="email"
                  placeholder="Email address"
                  value={subscriberEmail}
                  onChange={(e) => {
                    setSubscriberEmail(e.target.value);
                    if (subscriberErrorMessage) checkOnChange(e.target.value);
                    setSubscriberEmailError(false);
                    setSubscriberErrorMessage("");
                  }}
                />
                {subscriberErrorMessage}
              </div>
              <button type="submit">Join</button>
            </div>
          </form>
          {subscriberSuccessMessage}
        </div>
      </div>
    </div>
  );
};

export default SubscribeForm;