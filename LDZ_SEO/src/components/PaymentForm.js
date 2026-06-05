// PaymentForm.js - Fixed version
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../assets/css/SponsorBookingPay.css";

const stripePromise = loadStripe(
  "pk_test_51S3c3THQBCGmReEPZ3J0tA2mP81BvQxY9PptsUir5PYeqjj9XW7GveKj04umPQYxbaYiXix4avRlloUdo3ITsBsz00zfBxr700"
);

const CheckoutForm = forwardRef(
  (
    { amount, userEmail, companyName, orderDescription, onPaymentSuccess, onPaymentError },
    ref
  ) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
      if (!stripe || !elements) {
        setError("Stripe is not loaded yet. Please wait.");
        return;
      }

      // Validate inputs

      if (!amount || amount <= 0) {
        setError("Invalid payment amount.");
        return;
      }

      setIsLoading(true);
      setError("");
      setMessage("");

      try {
        // STEP 1: Create Payment Method from card details
        const cardNumberElement = elements.getElement(CardNumberElement);

        const { error: pmError, paymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card: cardNumberElement,
            billing_details: {
              name: companyName,
            },
          });

        if (pmError) {
          setError(pmError.message);
          setIsLoading(false);
          if (onPaymentError) onPaymentError(pmError.message);
          return;
        }

        // STEP 2: Send payment method to your Django backend
        const response = await fetch(
          "https://www.australia.lithium-downstream-summit.com/admin1/stripe-client-secret",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subTotalAmount: amount,
              paymentMethod: paymentMethod.id,
              currencyCode: "USD",
              // receiptemail: userEmail,
              paymentDescription: orderDescription || `Payment of $${amount}`,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Payment failed");
        }

        // STEP 3: Handle the response
        if (data.success) {
          if (data.status === "requires_action") {
            const { error: confirmError } = await stripe.confirmCardPayment(
              data.clientSecret
            );
            if (confirmError) {
              setError(confirmError.message);
              if (onPaymentError) onPaymentError(confirmError.message);
              return;
            }
          }

          setMessage(
            `Payment successful! Transaction ID: ${data.paymentIntentId}`
          );
          if (onPaymentSuccess) onPaymentSuccess(data); // 🚀 Send Stripe response back to parent
        } else {
          const errorMsg = data.error || "Payment failed";
          setError(errorMsg);
          if (onPaymentError) onPaymentError(errorMsg);
        }
      } catch (err) {
        const errorMsg = err.message || "An error occurred during payment";
        setError(errorMsg);
        console.error("Payment error:", err);
        if (onPaymentError) onPaymentError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    // Expose handleSubmit to parent component
    useImperativeHandle(ref, () => ({
      submitPayment: handleSubmit,
      isProcessing: isLoading,
    }));

    const cardElementOptions = {
      style: {
        base: {
          fontSize: "18px",
          color: "#5e5e5e",
          fontFamily: "Arial, sans-serif",
          "::placeholder": {
            color: "#5e5e5e",
            fontSize: "18px",
            fontWeight: "600",
          },
          padding: "0px",
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
        complete: {
          color: "#32325d",
        },
      },
      hidePostalCode: true,
    };

    return (
      <>
        <div className="stripe-input-top">
          <CardNumberElement id="card-number" options={cardElementOptions} />
        </div>
        <div className="stripe-input-bottom">
          <CardExpiryElement id="card-expiry" options={cardElementOptions} />
          <CardCvcElement id="card-cvc" options={cardElementOptions} />
        </div>

        {/* Display messages */}
        {error && (
          <div style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
            {error}
          </div>
        )}
        {/* {message && (
          <div style={{ color: "green", marginTop: "10px", fontSize: "14px" }}>
            {message}
          </div>
        )} */}
        {isLoading && (
          <div style={{ color: "#666", marginTop: "10px", fontSize: "14px" }}>
            Processing payment...
          </div>
        )}
      </>
    );
  }
);

const SimpleStripeForm = forwardRef(
  (
    {
      amount,
      userEmail,
      companyName,
      orderDescription,
      onPaymentSuccess,
      onPaymentError,
    },
    ref
  ) => {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm
          ref={ref}
          amount={amount}
          userEmail={userEmail}
          companyName={companyName}
          orderDescription={orderDescription}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
        />
      </Elements>
    );
  }
);

export default SimpleStripeForm;
