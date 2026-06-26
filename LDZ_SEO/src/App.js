// src/App.js
import React, { useEffect, Suspense, lazy } from "react";
import "./App.css";
import "./assets/css/navbar.css";
import "./assets/css/footer.css";
import "./assets/css/home.css";
import "./assets/css/video.css";
import "./assets/css/form.css";
import "./assets/css/sponsor.css";
import "./assets/css/speakerProfile.css";
import "./assets/css/contactUs.css";
import "./assets/css/agenda.css";
import "./assets/css/venue.css";
import "./assets/css/speakers.css";
import "./assets/css/register.css";
import "./assets/css/faq.css";
import "./assets/css/News.css";
import "./assets/css/attandees.css";
import "./assets/css/BookingForm.css";
import "./assets/css/AddDelegateForm.css";
import "./assets/css/AddSponsorDelegateForm.css";
import "./assets/css/ExhibitorPackages.css";
import "./assets/css/MediaPartners.css";
import "./assets/css/NewsDescription.css";
import "./assets/css/TrendDescriptionPage.css";
import "./assets/css/sponsorDescription.css";
import "./assets/css/WhoShouldAttend.css";
import "./assets/css/CallForPresentation.css";
import "./assets/css/IndustryTrend.css";
import "./assets/css/keytopics.css";
import "./assets/css/homeSpeakerSlider.css";
import "./assets/css/FeaturedSpeaker.css";
import "./assets/css/LatestNews.css";
import "./assets/css/TestimonialCarousel.css";
import "./assets/css/PastAttandessSection.css";
import "./assets/css/CountSection.css";
import "./assets/css/ForumSection.css";
import "./assets/css/logoslider.css";
import "./assets/css/relatedevent.css";
import "./assets/css/SubscribeForm.css";
import "./assets/css/privacyPolicy.css";
import "./assets/css/CookiePolicy.css";
import "./assets/css/TermsAndConditions.css";
import "./assets/css/thankYouPage.css";
import "./assets/css/RemindMe.css";
import "./assets/css/slideShare.css";
import "./assets/css/payOnline.css";
import "./assets/css/SponsorBookingPay.css";
import "./assets/css/Error404.css";
import "./assets/css/popUp.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ScrollToTop from "./ScrollToTop";
import { ApiDataProvider } from "./common/ApiContext";
import { ToastContainer } from "react-toastify";

// Eagerly loaded – needed on every page
import Home from "./components/Home";

// Lazy-loaded – only downloaded when the user navigates to that route
const ContactUs = lazy(() => import("./components/ContactUs"));
const Register = lazy(() => import("./components/Register"));
const Venue = lazy(() => import("./components/Venue"));
const Sponsor = lazy(() => import("./components/Sponsor"));
const SponsorDescription = lazy(() => import("./components/SponsorDescription"));
const MediaPartners = lazy(() => import("./components/MediaPartners"));
const Agenda = lazy(() => import("./components/Agenda"));
const AgendaPage = lazy(() => import("./components/AgendaPage"));
const WhoShouldAttend = lazy(() => import("./components/WhoShouldAttend"));
const Faq = lazy(() => import("./components/Faq"));
const CallForPresentation = lazy(() => import("./components/CallForPresentation"));
const Speakers = lazy(() => import("./components/Speakers"));
const TrendDescriptionPage = lazy(() => import("./components/TrendDescriptionPage"));
const ExhibitorPackages = lazy(() => import("./components/ExhibitorPackages"));
const NewsDescription = lazy(() => import("./components/NewsDescription"));
const SpeakerProfile = lazy(() => import("./components/SpeakersProfile"));
const Attandees = lazy(() => import("./components/Attandees"));
const AddDelegateForm = lazy(() => import("./components/AddDelegateForm"));
const BookingForm = lazy(() => import("./components/BookingForm"));
const AddSponsorDelegateForm = lazy(() => import("./components/AddSponsorDelegateForm"));
const News = lazy(() => import("./components/News"));
const RemindMeLater = lazy(() => import("./components/RemindMe"));
const PrivacyPolicy = lazy(() => import("./components/privacyPolicy"));
const CookiePolicy = lazy(() => import("./components/CookiePolicy"));
const ThankYouPage = lazy(() => import("./components/thankyouPage"));
const TermsAndConditions = lazy(() => import("./components/TermsAndConditions"));
const Error404 = lazy(() => import("./components/Error404"));
const SlideShare = lazy(() => import("./components/slideShare"));
const PayOnline = lazy(() => import("./components/payOnline"));

function App({ ssrData }) {
  const initialData =
    ssrData ??
    (typeof window !== "undefined" && window.__INITIAL_DATA__
      ? window.__INITIAL_DATA__
      : null);

  const setFavicon = (url) => {
    if (!url) return;
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = url + "?v=" + new Date().getTime();
  };

  useEffect(() => {
    const faviconUrl =
      initialData?.home?.homeVideoSctionEventDetails?.[0]?.favicon;
    if (faviconUrl) {
      setFavicon(faviconUrl);
    }
  }, [initialData]);

  return (
    <>
      <Helmet>
        <link
          rel="icon"
          href={initialData?.home?.homeVideoSctionEventDetails?.[0]?.favicon}
        />
        <link
          rel="apple-touch-icon"
          href={initialData?.home?.homeVideoSctionEventDetails?.[0]?.favicon}
        />
      </Helmet>
      <ApiDataProvider initialData={initialData}>
        <ToastContainer
          theme="light"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ScrollToTop />
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="booking" element={<Register />} />
              <Route path="venue" element={<Venue />} />
              <Route path="sponsors" element={<Sponsor />} />
              <Route path="sponsor/:slug" element={<SponsorDescription />} />
              <Route path="media-partners" element={<MediaPartners />} />
              <Route path="agenda" element={<Agenda />} />
              <Route path="agenda-page" element={<AgendaPage />} />
              <Route path="who-should-attend" element={<WhoShouldAttend />} />
              <Route path="faq" element={<Faq />} />
              <Route path="speakers" element={<CallForPresentation />} />
              <Route path="featured-speakers" element={<Speakers />} />
              <Route path="trend/:slug" element={<TrendDescriptionPage />} />
              <Route path="sponsor-packages" element={<ExhibitorPackages />} />
              <Route path="news/:slug" element={<NewsDescription />} />
              <Route path="speaker/:slug" element={<SpeakerProfile />} />
              <Route path="attendees" element={<Attandees />} />
              <Route path="booking-form" element={<AddDelegateForm />} />
              <Route path="sponsor-booking" element={<AddSponsorDelegateForm />} />
              <Route path="news" element={<News />} />
              <Route path="remind-me-later" element={<RemindMeLater />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="thank-you" element={<ThankYouPage />} />
              <Route path="securelogin" element={<SlideShare />} />
              <Route path="pay-online" element={<PayOnline />} />
              <Route path="pay_online" element={<Navigate to="/pay-online" replace />} />
              <Route path="404" element={<Error404 />} />
              <Route path="*" element={<Error404 />} />
            </Route>
          </Routes>
        </Suspense>
      </ApiDataProvider>
    </>
  );
}

export default App;
