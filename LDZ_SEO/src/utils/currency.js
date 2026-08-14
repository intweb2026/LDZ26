// currency.js - Helpers for resolving the ISO currency code used by Stripe.
//
// AdminPanel only stores a display label in eventGeneralSettings.currencyName,
// for example "Australian Dollar (AUD)"; the ISO 4217 code is the part inside
// the trailing parentheses. This pulls it out so payments charge in the
// currency the event is actually configured for, instead of a hard-coded one.

export const getCurrencyCode = (currencyName, fallback = "USD") => {
  if (!currencyName) {
    return fallback;
  }

  const match = String(currencyName).match(/\(([A-Za-z]{3})\)\s*$/);

  if (match) {
    return match[1].toUpperCase();
  }

  return fallback;
};
