export function getHubspotUtk() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "";
}
