--
-- PostgreSQL database dump
--

\restrict OJbdHyL4trhcV6cEOtkAFOWt2rOHmJGQ2Sad4i3rjaM3dKByxEfrubgPySI3kHu

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Event_addonshistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_addonshistory" (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "addOnId_id" bigint,
    "relatedCompanyId_id" bigint
);


ALTER TABLE public."Event_addonshistory" OWNER TO postgres;

--
-- Name: Event_addonshistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_addonshistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_addonshistory_id_seq" OWNER TO postgres;

--
-- Name: Event_addonshistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_addonshistory_id_seq" OWNED BY public."Event_addonshistory".id;


--
-- Name: Event_blockedemaildomains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_blockedemaildomains" (
    id integer NOT NULL,
    "domainName" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_blockedemaildomains" OWNER TO postgres;

--
-- Name: Event_blockedemaildomains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_blockedemaildomains_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_blockedemaildomains_id_seq" OWNER TO postgres;

--
-- Name: Event_blockedemaildomains_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_blockedemaildomains_id_seq" OWNED BY public."Event_blockedemaildomains".id;


--
-- Name: Event_delegatesaddons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_delegatesaddons" (
    id integer NOT NULL,
    "addOnPointName" text,
    "additionalPrice" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_delegatesaddons" OWNER TO postgres;

--
-- Name: Event_delegatesaddons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_delegatesaddons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_delegatesaddons_id_seq" OWNER TO postgres;

--
-- Name: Event_delegatesaddons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_delegatesaddons_id_seq" OWNED BY public."Event_delegatesaddons".id;


--
-- Name: Event_delegatetransectiondata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_delegatetransectiondata" (
    id integer NOT NULL,
    "invoiceNo" text,
    "totalPassAmount" text,
    "discountAmount" text,
    "addOnsAmount" text,
    "taxableCharge" text,
    "totalPaidAmount" text,
    "transectionId" text,
    "transectionType" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "relatedCompanyId_id" bigint
);


ALTER TABLE public."Event_delegatetransectiondata" OWNER TO postgres;

--
-- Name: Event_delegatetransectiondata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_delegatetransectiondata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_delegatetransectiondata_id_seq" OWNER TO postgres;

--
-- Name: Event_delegatetransectiondata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_delegatetransectiondata_id_seq" OWNED BY public."Event_delegatetransectiondata".id;


--
-- Name: Event_deligatepackageinclusionpoints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_deligatepackageinclusionpoints" (
    id integer NOT NULL,
    "inclusionPointIcon" text,
    "inclusionPointDescription" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_deligatepackageinclusionpoints" OWNER TO postgres;

--
-- Name: Event_deligatepackageinclusionpoints_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_deligatepackageinclusionpoints_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_deligatepackageinclusionpoints_id_seq" OWNER TO postgres;

--
-- Name: Event_deligatepackageinclusionpoints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_deligatepackageinclusionpoints_id_seq" OWNED BY public."Event_deligatepackageinclusionpoints".id;


--
-- Name: Event_eventagenda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventagenda" (
    id integer NOT NULL,
    "startTime" text,
    "endTime" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "Speaker1AgendaImg" text,
    "Speaker1CompanyImg" text,
    "Speaker1Id" text,
    "Speaker2AgendaImg" text,
    "Speaker2CompanyImg" text,
    "Speaker2Id" text,
    "bulletPoints" text,
    day text,
    heading text,
    "industryTrends" text,
    "panelModerators" text,
    "panelSpeakerIds" text,
    "panelSpeakerImages" text,
    "selectedSpeakers" text,
    "singleSpeakerAgendaImg" text,
    "singleSpeakerId" text,
    "sortOrder" integer,
    "speaker1Bullets" text,
    "speaker2Bullets" text,
    "speakerFormat" text,
    "sponsorBy" text,
    status text,
    "panelSpeakers" text,
    "selectedSpeaker1" text,
    "selectedSpeaker2" text,
    "singleSpeakerCompanyName" text,
    "singleSpeakerName" text,
    "speaker1CompanyName" text,
    "speaker1Name" text,
    "speaker2CompanyName" text,
    "speaker2Name" text,
    "singleSpeakerCompanyImg" text
);


ALTER TABLE public."Event_eventagenda" OWNER TO postgres;

--
-- Name: Event_eventagenda_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventagenda_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventagenda_id_seq" OWNER TO postgres;

--
-- Name: Event_eventagenda_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventagenda_id_seq" OWNED BY public."Event_eventagenda".id;


--
-- Name: Event_eventcoreattandees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventcoreattandees" (
    id integer NOT NULL,
    "corAttandeeName" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_eventcoreattandees" OWNER TO postgres;

--
-- Name: Event_eventcoreattandees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventcoreattandees_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventcoreattandees_id_seq" OWNER TO postgres;

--
-- Name: Event_eventcoreattandees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventcoreattandees_id_seq" OWNED BY public."Event_eventcoreattandees".id;


--
-- Name: Event_eventdeligatepackages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventdeligatepackages" (
    id integer NOT NULL,
    "deligatePackageName" text,
    "deligatePackagePrice" text,
    "deligatePackageStatus" text,
    "deligatePackageShowOrder" text,
    "deligatePackageExpiryDate" date,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_eventdeligatepackages" OWNER TO postgres;

--
-- Name: Event_eventdeligatepackages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventdeligatepackages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventdeligatepackages_id_seq" OWNER TO postgres;

--
-- Name: Event_eventdeligatepackages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventdeligatepackages_id_seq" OWNED BY public."Event_eventdeligatepackages".id;


--
-- Name: Event_eventdetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventdetails" (
    id integer NOT NULL,
    "eventName" text,
    "eventType" text,
    "eventYear" text,
    "eventDate" text,
    "eventLocation" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "eventShortCode" text,
    "isSeoEnable" text,
    "agendaVersion" text,
    "contactHubspotId" text,
    "eventCityShortCode" text,
    "eventColorName" text,
    "eventPostponed" text,
    "eventShortDate" text,
    "eventShortLocation" text,
    favicon text,
    "googleTranslate" text,
    "hubspotDisposition" text,
    "hubspotEmailStatus" text,
    "hubspotId" text,
    "industryName" text,
    "previousAgenda" text,
    "recaptchaKey" text,
    "stripeMode" text
);


ALTER TABLE public."Event_eventdetails" OWNER TO postgres;

--
-- Name: Event_eventdetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventdetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventdetails_id_seq" OWNER TO postgres;

--
-- Name: Event_eventdetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventdetails_id_seq" OWNED BY public."Event_eventdetails".id;


--
-- Name: Event_eventexpertspeakers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventexpertspeakers" (
    id integer NOT NULL,
    "expertSpeakerName" text,
    "expertSpeakerCompany" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_eventexpertspeakers" OWNER TO postgres;

--
-- Name: Event_eventexpertspeakers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventexpertspeakers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventexpertspeakers_id_seq" OWNER TO postgres;

--
-- Name: Event_eventexpertspeakers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventexpertspeakers_id_seq" OWNED BY public."Event_eventexpertspeakers".id;


--
-- Name: Event_eventfaqs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventfaqs" (
    id integer NOT NULL,
    "faqQuestion" text,
    "faqAnswer" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_eventfaqs" OWNER TO postgres;

--
-- Name: Event_eventfaqs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventfaqs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventfaqs_id_seq" OWNER TO postgres;

--
-- Name: Event_eventfaqs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventfaqs_id_seq" OWNED BY public."Event_eventfaqs".id;


--
-- Name: Event_eventgeneralsettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventgeneralsettings" (
    id integer NOT NULL,
    "purchaseTaxPercent" text,
    "currencyName" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "currencySymbol" text,
    "currencyPosition" text
);


ALTER TABLE public."Event_eventgeneralsettings" OWNER TO postgres;

--
-- Name: Event_eventgeneralsettings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventgeneralsettings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventgeneralsettings_id_seq" OWNER TO postgres;

--
-- Name: Event_eventgeneralsettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventgeneralsettings_id_seq" OWNED BY public."Event_eventgeneralsettings".id;


--
-- Name: Event_eventindustrytrends; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventindustrytrends" (
    id integer NOT NULL,
    "trendTitle" text,
    "trendRedirectPath" text,
    "trendShortDescription" text,
    "trendLongDescription" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "trendMetaDescription" text,
    "trendMetaTitle" text
);


ALTER TABLE public."Event_eventindustrytrends" OWNER TO postgres;

--
-- Name: Event_eventindustrytrends_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventindustrytrends_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventindustrytrends_id_seq" OWNER TO postgres;

--
-- Name: Event_eventindustrytrends_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventindustrytrends_id_seq" OWNED BY public."Event_eventindustrytrends".id;


--
-- Name: Event_eventleaders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventleaders" (
    id integer NOT NULL,
    "leaderName" text,
    "leaderLogo" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_eventleaders" OWNER TO postgres;

--
-- Name: Event_eventleaders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventleaders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventleaders_id_seq" OWNER TO postgres;

--
-- Name: Event_eventleaders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventleaders_id_seq" OWNED BY public."Event_eventleaders".id;


--
-- Name: Event_eventparticipatedindustries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventparticipatedindustries" (
    id integer NOT NULL,
    "industryName" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_eventparticipatedindustries" OWNER TO postgres;

--
-- Name: Event_eventparticipatedindustries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventparticipatedindustries_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventparticipatedindustries_id_seq" OWNER TO postgres;

--
-- Name: Event_eventparticipatedindustries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventparticipatedindustries_id_seq" OWNED BY public."Event_eventparticipatedindustries".id;


--
-- Name: Event_eventpastattandees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventpastattandees" (
    id integer NOT NULL,
    "pastAttandeeName" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "pastAttandeeLogo" text
);


ALTER TABLE public."Event_eventpastattandees" OWNER TO postgres;

--
-- Name: Event_eventpastattandees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventpastattandees_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventpastattandees_id_seq" OWNER TO postgres;

--
-- Name: Event_eventpastattandees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventpastattandees_id_seq" OWNED BY public."Event_eventpastattandees".id;


--
-- Name: Event_eventproject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventproject" (
    id integer NOT NULL,
    "projectYear" text,
    password text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_eventproject" OWNER TO postgres;

--
-- Name: Event_eventproject_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventproject_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventproject_id_seq" OWNER TO postgres;

--
-- Name: Event_eventproject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventproject_id_seq" OWNED BY public."Event_eventproject".id;


--
-- Name: Event_eventslideshares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventslideshares" (
    id integer NOT NULL,
    author text,
    "authorCompany" text,
    heading text,
    "pptImage" text,
    "pptLink" text,
    "projectYear" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "projectId_id" bigint
);


ALTER TABLE public."Event_eventslideshares" OWNER TO postgres;

--
-- Name: Event_eventslideshares_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventslideshares_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventslideshares_id_seq" OWNER TO postgres;

--
-- Name: Event_eventslideshares_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventslideshares_id_seq" OWNED BY public."Event_eventslideshares".id;


--
-- Name: Event_eventslidesharesattandees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventslidesharesattandees" (
    id integer NOT NULL,
    "companyName" text,
    "delegateName" text,
    "projectYear" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "projectId_id" bigint
);


ALTER TABLE public."Event_eventslidesharesattandees" OWNER TO postgres;

--
-- Name: Event_eventslidesharesattandees_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventslidesharesattandees_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventslidesharesattandees_id_seq" OWNER TO postgres;

--
-- Name: Event_eventslidesharesattandees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventslidesharesattandees_id_seq" OWNED BY public."Event_eventslidesharesattandees".id;


--
-- Name: Event_eventspeakers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventspeakers" (
    id integer NOT NULL,
    "eventSpeakerName" text,
    "eventSpeakerCompany" text,
    "eventSpeakerDescription" text,
    "viewSpeakerButtonLabel" text,
    "speakerProfilePageLink" text,
    "eventSpeakerHomePageImage" text,
    "eventSpeakerProfilePageImage" text,
    "eventSpeakerEmail" text,
    "eventSpeakerProposedTitle" text,
    "isParticipated" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "eventSpeakerProfilePageDescription" text,
    "eventSpeakerShortDescription" text,
    "eventSpeakerFeaturedPageImage" text,
    "eventSpeakerMetaDescription" text,
    "eventSpeakerMetaTitle" text,
    "eventSpeakerLinkedinFollowers" integer
);


ALTER TABLE public."Event_eventspeakers" OWNER TO postgres;

--
-- Name: Event_eventspeakers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventspeakers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventspeakers_id_seq" OWNER TO postgres;

--
-- Name: Event_eventspeakers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventspeakers_id_seq" OWNED BY public."Event_eventspeakers".id;


--
-- Name: Event_eventsponsors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventsponsors" (
    id integer NOT NULL,
    "sponsorComapnyName" text,
    "sponsorComapnyLogo" text,
    "sponsorType" text,
    "sponsorComapnyBioDescription" text,
    "sponsorComapnyBioLogo" text,
    "sponsorEmail" text,
    "sponsorMobile" text,
    "relateComapnyPersonName" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "sponsorWebsite" text,
    "eventSponsorMetaDescription" text,
    "eventSponsorMetaTitle" text
);


ALTER TABLE public."Event_eventsponsors" OWNER TO postgres;

--
-- Name: Event_eventsponsors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventsponsors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventsponsors_id_seq" OWNER TO postgres;

--
-- Name: Event_eventsponsors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventsponsors_id_seq" OWNED BY public."Event_eventsponsors".id;


--
-- Name: Event_eventtestimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_eventtestimonials" (
    id integer NOT NULL,
    "personName" text,
    "personCompany" text,
    "personMessage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_eventtestimonials" OWNER TO postgres;

--
-- Name: Event_eventtestimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_eventtestimonials_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_eventtestimonials_id_seq" OWNER TO postgres;

--
-- Name: Event_eventtestimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_eventtestimonials_id_seq" OWNED BY public."Event_eventtestimonials".id;


--
-- Name: Event_grouppassregistrationrequestdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_grouppassregistrationrequestdata" (
    id integer NOT NULL,
    "requesterName" text,
    "requesterCompanyName" text,
    "requesterEmail" text,
    "requesterMobile" text,
    "requesterInterest" text,
    "noOfAttandees" text,
    "requesterMessage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_grouppassregistrationrequestdata" OWNER TO postgres;

--
-- Name: Event_grouppassregistrationrequestdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_grouppassregistrationrequestdata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_grouppassregistrationrequestdata_id_seq" OWNER TO postgres;

--
-- Name: Event_grouppassregistrationrequestdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_grouppassregistrationrequestdata_id_seq" OWNED BY public."Event_grouppassregistrationrequestdata".id;


--
-- Name: Event_offercoupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_offercoupon" (
    id integer NOT NULL,
    "couponCode" text,
    "discountType" text,
    "discountAmount" text,
    "couponFor" text,
    "eventSpecialWord" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_offercoupon" OWNER TO postgres;

--
-- Name: Event_offercoupon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_offercoupon_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_offercoupon_id_seq" OWNER TO postgres;

--
-- Name: Event_offercoupon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_offercoupon_id_seq" OWNED BY public."Event_offercoupon".id;


--
-- Name: Event_offercouponhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_offercouponhistory" (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "offerCouponId_id" bigint,
    "relatedCompanyId_id" bigint
);


ALTER TABLE public."Event_offercouponhistory" OWNER TO postgres;

--
-- Name: Event_offercouponhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_offercouponhistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_offercouponhistory_id_seq" OWNER TO postgres;

--
-- Name: Event_offercouponhistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_offercouponhistory_id_seq" OWNED BY public."Event_offercouponhistory".id;


--
-- Name: Event_pageseosettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_pageseosettings" (
    id bigint NOT NULL,
    "pageName" character varying(100),
    "pageMetaTitle" character varying(200),
    "pageMetaDescription" text,
    "pageOgImage" text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by character varying(50) NOT NULL,
    updated_by character varying(50) NOT NULL,
    "isDelete" character varying(10) NOT NULL
);


ALTER TABLE public."Event_pageseosettings" OWNER TO postgres;

--
-- Name: Event_pageseosettings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Event_pageseosettings" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Event_pageseosettings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Event_paymentoptionimage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_paymentoptionimage" (
    id integer NOT NULL,
    "paymentOptionImageLink" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_paymentoptionimage" OWNER TO postgres;

--
-- Name: Event_paymentoptionimage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_paymentoptionimage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_paymentoptionimage_id_seq" OWNER TO postgres;

--
-- Name: Event_paymentoptionimage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_paymentoptionimage_id_seq" OWNED BY public."Event_paymentoptionimage".id;


--
-- Name: Event_payonlinetransectiondata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_payonlinetransectiondata" (
    id integer NOT NULL,
    "invoiceNo" text,
    "totalPayAmount" text,
    email text,
    "transectionId" text,
    "transectionType" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_payonlinetransectiondata" OWNER TO postgres;

--
-- Name: Event_payonlinetransectiondata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_payonlinetransectiondata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_payonlinetransectiondata_id_seq" OWNER TO postgres;

--
-- Name: Event_payonlinetransectiondata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_payonlinetransectiondata_id_seq" OWNED BY public."Event_payonlinetransectiondata".id;


--
-- Name: Event_registeredcompanydetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_registeredcompanydetails" (
    id integer NOT NULL,
    "companyName" text,
    "companyWebsite" text,
    "companyAddress" text,
    "companyCountry" text,
    "companyState" text,
    "companyCity" text,
    "companyPincode" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "purchasedDelegatePackageId_id" bigint
);


ALTER TABLE public."Event_registeredcompanydetails" OWNER TO postgres;

--
-- Name: Event_registeredcompanydetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_registeredcompanydetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_registeredcompanydetails_id_seq" OWNER TO postgres;

--
-- Name: Event_registeredcompanydetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_registeredcompanydetails_id_seq" OWNED BY public."Event_registeredcompanydetails".id;


--
-- Name: Event_registereddelegates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_registereddelegates" (
    id integer NOT NULL,
    "firstName" text,
    "lastName" text,
    mobile text,
    "position" text,
    "delegateEmail" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "relatedCompanyId_id" bigint
);


ALTER TABLE public."Event_registereddelegates" OWNER TO postgres;

--
-- Name: Event_registereddelegates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_registereddelegates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_registereddelegates_id_seq" OWNER TO postgres;

--
-- Name: Event_registereddelegates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_registereddelegates_id_seq" OWNED BY public."Event_registereddelegates".id;


--
-- Name: Event_registeredsponsereddelegates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_registeredsponsereddelegates" (
    id integer NOT NULL,
    "firstName" text,
    "lastName" text,
    mobile text,
    "position" text,
    "delegateEmail" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "relatedSponsorCompanyId_id" bigint
);


ALTER TABLE public."Event_registeredsponsereddelegates" OWNER TO postgres;

--
-- Name: Event_registeredsponsereddelegates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_registeredsponsereddelegates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_registeredsponsereddelegates_id_seq" OWNER TO postgres;

--
-- Name: Event_registeredsponsereddelegates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_registeredsponsereddelegates_id_seq" OWNED BY public."Event_registeredsponsereddelegates".id;


--
-- Name: Event_relatedevents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_relatedevents" (
    id integer NOT NULL,
    "eventName" text,
    "eventLocation" text,
    "eventWebsiteLink" text,
    "eventDate" text,
    "eventImage" text,
    "eventHoverImage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_relatedevents" OWNER TO postgres;

--
-- Name: Event_relatedevents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_relatedevents_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_relatedevents_id_seq" OWNER TO postgres;

--
-- Name: Event_relatedevents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_relatedevents_id_seq" OWNED BY public."Event_relatedevents".id;


--
-- Name: Event_slidesharesaccesspersons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_slidesharesaccesspersons" (
    id integer NOT NULL,
    email text,
    "eventPassword" text,
    "projectYear" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "projectId_id" bigint
);


ALTER TABLE public."Event_slidesharesaccesspersons" OWNER TO postgres;

--
-- Name: Event_slidesharesaccesspersons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_slidesharesaccesspersons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_slidesharesaccesspersons_id_seq" OWNER TO postgres;

--
-- Name: Event_slidesharesaccesspersons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_slidesharesaccesspersons_id_seq" OWNED BY public."Event_slidesharesaccesspersons".id;


--
-- Name: Event_sponseredcompanydetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_sponseredcompanydetails" (
    id integer NOT NULL,
    "companyName" text,
    "companyWebsite" text,
    "companyAddress" text,
    "companyCountry" text,
    "companyState" text,
    "companyCity" text,
    "companyPincode" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "sponsorPackageTypeId_id" bigint
);


ALTER TABLE public."Event_sponseredcompanydetails" OWNER TO postgres;

--
-- Name: Event_sponseredcompanydetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_sponseredcompanydetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_sponseredcompanydetails_id_seq" OWNER TO postgres;

--
-- Name: Event_sponseredcompanydetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_sponseredcompanydetails_id_seq" OWNED BY public."Event_sponseredcompanydetails".id;


--
-- Name: Event_sponsorcompanytransectiondata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_sponsorcompanytransectiondata" (
    id integer NOT NULL,
    "invoiceNo" text,
    "totalPassAmount" text,
    "discountAmount" text,
    "addOnsAmount" text,
    "taxableCharge" text,
    "totalPaidAmount" text,
    "transectionId" text,
    "transectionType" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "relatedSponsorCompanyId_id" bigint,
    "additionalDelegateAmoount" text
);


ALTER TABLE public."Event_sponsorcompanytransectiondata" OWNER TO postgres;

--
-- Name: Event_sponsorcompanytransectiondata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_sponsorcompanytransectiondata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_sponsorcompanytransectiondata_id_seq" OWNER TO postgres;

--
-- Name: Event_sponsorcompanytransectiondata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_sponsorcompanytransectiondata_id_seq" OWNED BY public."Event_sponsorcompanytransectiondata".id;


--
-- Name: Event_sponsoredcompanyaddonsdetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_sponsoredcompanyaddonsdetails" (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "relatedSponsorCompanyId_id" bigint,
    "relatedSponsorAddOnsId_id" bigint
);


ALTER TABLE public."Event_sponsoredcompanyaddonsdetails" OWNER TO postgres;

--
-- Name: Event_sponsoredcompanyaddonsdetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_sponsoredcompanyaddonsdetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_sponsoredcompanyaddonsdetails_id_seq" OWNER TO postgres;

--
-- Name: Event_sponsoredcompanyaddonsdetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_sponsoredcompanyaddonsdetails_id_seq" OWNED BY public."Event_sponsoredcompanyaddonsdetails".id;


--
-- Name: Event_sponsoroffercoupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_sponsoroffercoupon" (
    id integer NOT NULL,
    "couponCode" text,
    "discountType" text,
    "discountAmount" text,
    "couponFor" text,
    "eventSpecialWord" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_sponsoroffercoupon" OWNER TO postgres;

--
-- Name: Event_sponsoroffercoupon_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_sponsoroffercoupon_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_sponsoroffercoupon_id_seq" OWNER TO postgres;

--
-- Name: Event_sponsoroffercoupon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_sponsoroffercoupon_id_seq" OWNED BY public."Event_sponsoroffercoupon".id;


--
-- Name: Event_sponsoroffercouponhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_sponsoroffercouponhistory" (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "offerCouponId_id" bigint,
    "relatedSponsorCompanyId_id" bigint
);


ALTER TABLE public."Event_sponsoroffercouponhistory" OWNER TO postgres;

--
-- Name: Event_sponsoroffercouponhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_sponsoroffercouponhistory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_sponsoroffercouponhistory_id_seq" OWNER TO postgres;

--
-- Name: Event_sponsoroffercouponhistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_sponsoroffercouponhistory_id_seq" OWNED BY public."Event_sponsoroffercouponhistory".id;


--
-- Name: Event_sponsorpackageaddons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_sponsorpackageaddons" (
    id integer NOT NULL,
    "sponsorAddOnName" text,
    "sponsorAddOnPrice" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "sponsorPackageAddOnTypeId_id" bigint
);


ALTER TABLE public."Event_sponsorpackageaddons" OWNER TO postgres;

--
-- Name: Event_sponsorpackageaddons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_sponsorpackageaddons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_sponsorpackageaddons_id_seq" OWNER TO postgres;

--
-- Name: Event_sponsorpackageaddons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_sponsorpackageaddons_id_seq" OWNED BY public."Event_sponsorpackageaddons".id;


--
-- Name: Event_sponsorpackageaddontypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_sponsorpackageaddontypes" (
    id integer NOT NULL,
    "addOnTypeName" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Event_sponsorpackageaddontypes" OWNER TO postgres;

--
-- Name: Event_sponsorpackageaddontypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_sponsorpackageaddontypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_sponsorpackageaddontypes_id_seq" OWNER TO postgres;

--
-- Name: Event_sponsorpackageaddontypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_sponsorpackageaddontypes_id_seq" OWNED BY public."Event_sponsorpackageaddontypes".id;


--
-- Name: Event_sponsorpackagetypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_sponsorpackagetypes" (
    id integer NOT NULL,
    "sponsorPackageType" text,
    "sponsorPackagePrice" text,
    "sponsorPackageCuttingPrice" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "delegatePassQty" text,
    "exhibitSpace" text,
    "inviteDiscount" text,
    "sponsorPackageShowOrder" text
);


ALTER TABLE public."Event_sponsorpackagetypes" OWNER TO postgres;

--
-- Name: Event_sponsorpackagetypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_sponsorpackagetypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_sponsorpackagetypes_id_seq" OWNER TO postgres;

--
-- Name: Event_sponsorpackagetypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_sponsorpackagetypes_id_seq" OWNED BY public."Event_sponsorpackagetypes".id;


--
-- Name: Myadmin_adminrole; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_adminrole" (
    id integer NOT NULL,
    name text,
    detailed_permissions text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_adminrole" OWNER TO postgres;

--
-- Name: Myadmin_adminrole_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_adminrole_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_adminrole_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_adminrole_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_adminrole_id_seq" OWNED BY public."Myadmin_adminrole".id;


--
-- Name: Myadmin_adminrole_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_adminrole_permissions" (
    id integer NOT NULL,
    adminrole_id bigint,
    sidebarsubmodule_id bigint
);


ALTER TABLE public."Myadmin_adminrole_permissions" OWNER TO postgres;

--
-- Name: Myadmin_adminrole_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_adminrole_permissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_adminrole_permissions_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_adminrole_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_adminrole_permissions_id_seq" OWNED BY public."Myadmin_adminrole_permissions".id;


--
-- Name: Myadmin_adminuser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_adminuser" (
    id integer NOT NULL,
    name text,
    username text,
    email text,
    password text,
    detailed_permissions text,
    is_active boolean,
    created_at timestamp without time zone,
    "isDelete" text,
    role_id bigint
);


ALTER TABLE public."Myadmin_adminuser" OWNER TO postgres;

--
-- Name: Myadmin_adminuser_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_adminuser_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_adminuser_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_adminuser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_adminuser_id_seq" OWNED BY public."Myadmin_adminuser".id;


--
-- Name: Myadmin_adminuser_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_adminuser_permissions" (
    id integer NOT NULL,
    adminuser_id bigint,
    sidebarsubmodule_id bigint
);


ALTER TABLE public."Myadmin_adminuser_permissions" OWNER TO postgres;

--
-- Name: Myadmin_adminuser_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_adminuser_permissions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_adminuser_permissions_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_adminuser_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_adminuser_permissions_id_seq" OWNED BY public."Myadmin_adminuser_permissions".id;


--
-- Name: Myadmin_agendasubscriber; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_agendasubscriber" (
    id integer NOT NULL,
    subscriber text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_agendasubscriber" OWNER TO postgres;

--
-- Name: Myadmin_agendasubscriber_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_agendasubscriber_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_agendasubscriber_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_agendasubscriber_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_agendasubscriber_id_seq" OWNED BY public."Myadmin_agendasubscriber".id;


--
-- Name: Myadmin_becomespeakerrequestdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_becomespeakerrequestdata" (
    id integer NOT NULL,
    "requesterName" text,
    "requesterCompanyName" text,
    "proposedTitle" text,
    "requesterEmail" text,
    "requesterMessage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_becomespeakerrequestdata" OWNER TO postgres;

--
-- Name: Myadmin_becomespeakerrequestdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_becomespeakerrequestdata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_becomespeakerrequestdata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_becomespeakerrequestdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_becomespeakerrequestdata_id_seq" OWNED BY public."Myadmin_becomespeakerrequestdata".id;


--
-- Name: Myadmin_calendersubscriber; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_calendersubscriber" (
    id integer NOT NULL,
    "calenderSubscriber" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_calendersubscriber" OWNER TO postgres;

--
-- Name: Myadmin_calendersubscriber_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_calendersubscriber_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_calendersubscriber_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_calendersubscriber_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_calendersubscriber_id_seq" OWNED BY public."Myadmin_calendersubscriber".id;


--
-- Name: Myadmin_companieslogosection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_companieslogosection" (
    id integer NOT NULL,
    "logoLink" text,
    "logoShowOrder" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_companieslogosection" OWNER TO postgres;

--
-- Name: Myadmin_companieslogosection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_companieslogosection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_companieslogosection_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_companieslogosection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_companieslogosection_id_seq" OWNED BY public."Myadmin_companieslogosection".id;


--
-- Name: Myadmin_contactusdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_contactusdata" (
    id integer NOT NULL,
    "contactPersonName" text,
    "contactPersonCompanyName" text,
    "contactPersonEmail" text,
    "contactPersonMobile" text,
    "contactPersonMessage" text,
    "contactUsReason" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_contactusdata" OWNER TO postgres;

--
-- Name: Myadmin_contactusdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_contactusdata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_contactusdata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_contactusdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_contactusdata_id_seq" OWNED BY public."Myadmin_contactusdata".id;


--
-- Name: Myadmin_contactushelpdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_contactushelpdata" (
    id integer NOT NULL,
    "reasonToHelp" text,
    "helpingPersonName" text,
    "helpingPersonDesignation" text,
    "helpingPersonEmail" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_contactushelpdata" OWNER TO postgres;

--
-- Name: Myadmin_contactushelpdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_contactushelpdata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_contactushelpdata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_contactushelpdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_contactushelpdata_id_seq" OWNED BY public."Myadmin_contactushelpdata".id;


--
-- Name: Myadmin_contactuspagedata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_contactuspagedata" (
    id integer NOT NULL,
    "emailLogo" text,
    "sectionTitle" text,
    "sectionShortParagraph" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_contactuspagedata" OWNER TO postgres;

--
-- Name: Myadmin_contactuspagedata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_contactuspagedata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_contactuspagedata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_contactuspagedata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_contactuspagedata_id_seq" OWNED BY public."Myadmin_contactuspagedata".id;


--
-- Name: Myadmin_countsection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_countsection" (
    id integer NOT NULL,
    "countSectionBackgroundImage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_countsection" OWNER TO postgres;

--
-- Name: Myadmin_countsection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_countsection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_countsection_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_countsection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_countsection_id_seq" OWNED BY public."Myadmin_countsection".id;


--
-- Name: Myadmin_countsectiontopic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_countsectiontopic" (
    id integer NOT NULL,
    "topicLabel" text,
    "topicCount" text,
    "countIcon" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_countsectiontopic" OWNER TO postgres;

--
-- Name: Myadmin_countsectiontopic_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_countsectiontopic_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_countsectiontopic_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_countsectiontopic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_countsectiontopic_id_seq" OWNED BY public."Myadmin_countsectiontopic".id;


--
-- Name: Myadmin_enduserpassregistrationrequestdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_enduserpassregistrationrequestdata" (
    id integer NOT NULL,
    "userName" text,
    "userCompany" text,
    "userEmail" text,
    "userMobile" text,
    "userInterest" text,
    "noOfAttandees" text,
    "userMessage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_enduserpassregistrationrequestdata" OWNER TO postgres;

--
-- Name: Myadmin_enduserpassregistrationrequestdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_enduserpassregistrationrequestdata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_enduserpassregistrationrequestdata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_enduserpassregistrationrequestdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_enduserpassregistrationrequestdata_id_seq" OWNED BY public."Myadmin_enduserpassregistrationrequestdata".id;


--
-- Name: Myadmin_footerfirstsectionoptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_footerfirstsectionoptions" (
    id integer NOT NULL,
    "optionName" text,
    "optionRedirectPath" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_footerfirstsectionoptions" OWNER TO postgres;

--
-- Name: Myadmin_footerfirstsectionoptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_footerfirstsectionoptions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_footerfirstsectionoptions_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_footerfirstsectionoptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_footerfirstsectionoptions_id_seq" OWNED BY public."Myadmin_footerfirstsectionoptions".id;


--
-- Name: Myadmin_footeroptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_footeroptions" (
    id integer NOT NULL,
    "footerOptionsName" text,
    "footerOptionsPath" text,
    "isChecked" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_footeroptions" OWNER TO postgres;

--
-- Name: Myadmin_footeroptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_footeroptions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_footeroptions_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_footeroptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_footeroptions_id_seq" OWNED BY public."Myadmin_footeroptions".id;


--
-- Name: Myadmin_footersocialmediaoptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_footersocialmediaoptions" (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "emailLink" text,
    "facebookLink" text,
    "instagramLink" text,
    "linkedinLink" text,
    "twitterLink" text
);


ALTER TABLE public."Myadmin_footersocialmediaoptions" OWNER TO postgres;

--
-- Name: Myadmin_footersocialmediaoptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_footersocialmediaoptions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_footersocialmediaoptions_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_footersocialmediaoptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_footersocialmediaoptions_id_seq" OWNED BY public."Myadmin_footersocialmediaoptions".id;


--
-- Name: Myadmin_generalnewspoint; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_generalnewspoint" (
    id integer NOT NULL,
    "newsTitle" text,
    "newsDescription" text,
    "newsPageUrl" text,
    "newsImage" text,
    "newsCreatedDate" date,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "newsCategoryId_id" bigint,
    "newsShortDescription" text,
    "isTopNews" text,
    "newsImageAltText" text,
    "newsMetaDescription" text,
    "newsMetaTitle" text
);


ALTER TABLE public."Myadmin_generalnewspoint" OWNER TO postgres;

--
-- Name: Myadmin_generalnewspoint_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_generalnewspoint_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_generalnewspoint_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_generalnewspoint_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_generalnewspoint_id_seq" OWNED BY public."Myadmin_generalnewspoint".id;


--
-- Name: Myadmin_homepagenavlogodata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_homepagenavlogodata" (
    id integer NOT NULL,
    "whiteLogoLink" text,
    "blackLogoLink" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_homepagenavlogodata" OWNER TO postgres;

--
-- Name: Myadmin_homepagenavlogodata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_homepagenavlogodata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_homepagenavlogodata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_homepagenavlogodata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_homepagenavlogodata_id_seq" OWNED BY public."Myadmin_homepagenavlogodata".id;


--
-- Name: Myadmin_homepagenavmaincategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_homepagenavmaincategories" (
    id integer NOT NULL,
    "navMainCategoryName" text,
    "navMainCategoryPath" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "isChecked" text
);


ALTER TABLE public."Myadmin_homepagenavmaincategories" OWNER TO postgres;

--
-- Name: Myadmin_homepagenavmaincategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_homepagenavmaincategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_homepagenavmaincategories_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_homepagenavmaincategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_homepagenavmaincategories_id_seq" OWNED BY public."Myadmin_homepagenavmaincategories".id;


--
-- Name: Myadmin_homepagenavsubcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_homepagenavsubcategories" (
    id integer NOT NULL,
    "navSubCategoryName" text,
    "navSubCategoryPath" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "navMainCategoryId_id" bigint,
    "isChecked" text
);


ALTER TABLE public."Myadmin_homepagenavsubcategories" OWNER TO postgres;

--
-- Name: Myadmin_homepagenavsubcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_homepagenavsubcategories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_homepagenavsubcategories_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_homepagenavsubcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_homepagenavsubcategories_id_seq" OWNED BY public."Myadmin_homepagenavsubcategories".id;


--
-- Name: Myadmin_homepagethirdsection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_homepagethirdsection" (
    id integer NOT NULL,
    "thirdSectionFirstTitle" text,
    "thirdSectionSecondTitle" text,
    "thirdSectionDescription" text,
    "thirdSectionVideoLink" text,
    "thirdSectionBackgroundImage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_homepagethirdsection" OWNER TO postgres;

--
-- Name: Myadmin_homepagethirdsection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_homepagethirdsection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_homepagethirdsection_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_homepagethirdsection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_homepagethirdsection_id_seq" OWNED BY public."Myadmin_homepagethirdsection".id;


--
-- Name: Myadmin_homepagevideosectioninput; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_homepagevideosectioninput" (
    id integer NOT NULL,
    "eventDetailBackImage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "videoLinkmp4" text,
    "videoLinkwebm" text,
    "eventExpertSpeakerBackImage" text,
    "eventStataticsBackImage" text,
    "videoReplaceImage" text
);


ALTER TABLE public."Myadmin_homepagevideosectioninput" OWNER TO postgres;

--
-- Name: Myadmin_homepagevideosectioninput_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_homepagevideosectioninput_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_homepagevideosectioninput_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_homepagevideosectioninput_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_homepagevideosectioninput_id_seq" OWNED BY public."Myadmin_homepagevideosectioninput".id;


--
-- Name: Myadmin_keypointssection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_keypointssection" (
    id integer NOT NULL,
    "keyPointSectionLabel" text,
    "keyPointSectionButtonLabel" text,
    "keyPointSectionButtonRedirectPath" text,
    "isKeyPointSectionButtonEnable" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_keypointssection" OWNER TO postgres;

--
-- Name: Myadmin_keypointssection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_keypointssection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_keypointssection_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_keypointssection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_keypointssection_id_seq" OWNED BY public."Myadmin_keypointssection".id;


--
-- Name: Myadmin_keypointssectionpoints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_keypointssectionpoints" (
    id integer NOT NULL,
    "pointLabel" text,
    "pointDescription" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_keypointssectionpoints" OWNER TO postgres;

--
-- Name: Myadmin_keypointssectionpoints_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_keypointssectionpoints_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_keypointssectionpoints_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_keypointssectionpoints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_keypointssectionpoints_id_seq" OWNED BY public."Myadmin_keypointssectionpoints".id;


--
-- Name: Myadmin_latestnews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_latestnews" (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "generalNewsPointId_id" bigint,
    "newsCategoryId_id" bigint
);


ALTER TABLE public."Myadmin_latestnews" OWNER TO postgres;

--
-- Name: Myadmin_latestnews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_latestnews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_latestnews_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_latestnews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_latestnews_id_seq" OWNED BY public."Myadmin_latestnews".id;


--
-- Name: Myadmin_mediapagehelpers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_mediapagehelpers" (
    id integer NOT NULL,
    "companyPersonName" text,
    "companyPersonEmail" text,
    "companyPersonPhone" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_mediapagehelpers" OWNER TO postgres;

--
-- Name: Myadmin_mediapagehelpers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_mediapagehelpers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_mediapagehelpers_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_mediapagehelpers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_mediapagehelpers_id_seq" OWNED BY public."Myadmin_mediapagehelpers".id;


--
-- Name: Myadmin_newscategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_newscategory" (
    id integer NOT NULL,
    "categoryName" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_newscategory" OWNER TO postgres;

--
-- Name: Myadmin_newscategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_newscategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_newscategory_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_newscategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_newscategory_id_seq" OWNED BY public."Myadmin_newscategory".id;


--
-- Name: Myadmin_pastattandeehomedata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_pastattandeehomedata" (
    id integer NOT NULL,
    "attandeeName" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_pastattandeehomedata" OWNER TO postgres;

--
-- Name: Myadmin_pastattandeehomedata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_pastattandeehomedata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_pastattandeehomedata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_pastattandeehomedata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_pastattandeehomedata_id_seq" OWNED BY public."Myadmin_pastattandeehomedata".id;


--
-- Name: Myadmin_pastattandeessection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_pastattandeessection" (
    id integer NOT NULL,
    "pastAttandeesSectionackgroundImage" text,
    "firstSectionLabel" text,
    "firstSectionBottomLabel" text,
    "firstSectionBottomIcon" text,
    "firstSectionBottomRedirectPath" text,
    "secondSectionLabel" text,
    "secondSectionBottomLabel" text,
    "secondSectionBottomIcon" text,
    "secondSectionBottomRedirectPath" text,
    "thirdSectionImage" text,
    "thirdSectionButtonLabel" text,
    "thirdSectionButtonRedirectPath" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_pastattandeessection" OWNER TO postgres;

--
-- Name: Myadmin_pastattandeessection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_pastattandeessection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_pastattandeessection_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_pastattandeessection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_pastattandeessection_id_seq" OWNED BY public."Myadmin_pastattandeessection".id;


--
-- Name: Myadmin_pressmediapageboxdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_pressmediapageboxdata" (
    id integer NOT NULL,
    "boxTitle" text,
    "boxDescription" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_pressmediapageboxdata" OWNER TO postgres;

--
-- Name: Myadmin_pressmediapageboxdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_pressmediapageboxdata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_pressmediapageboxdata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_pressmediapageboxdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_pressmediapageboxdata_id_seq" OWNED BY public."Myadmin_pressmediapageboxdata".id;


--
-- Name: Myadmin_pressmediapagedata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_pressmediapagedata" (
    id integer NOT NULL,
    "pressMediaPageTitle" text,
    "pressMediaPageDescription" text,
    "pressMediaPageSecondTitle" text,
    "pressMediaPageSecondSectionImage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_pressmediapagedata" OWNER TO postgres;

--
-- Name: Myadmin_pressmediapagedata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_pressmediapagedata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_pressmediapagedata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_pressmediapagedata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_pressmediapagedata_id_seq" OWNED BY public."Myadmin_pressmediapagedata".id;


--
-- Name: Myadmin_quickproposalrequestdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_quickproposalrequestdata" (
    id integer NOT NULL,
    "requesterName" text,
    "requesterCompanyName" text,
    "proposedTitle" text,
    "requesterEmail" text,
    "requesterMessage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_quickproposalrequestdata" OWNER TO postgres;

--
-- Name: Myadmin_quickproposalrequestdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_quickproposalrequestdata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_quickproposalrequestdata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_quickproposalrequestdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_quickproposalrequestdata_id_seq" OWNED BY public."Myadmin_quickproposalrequestdata".id;


--
-- Name: Myadmin_registerpagesettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_registerpagesettings" (
    id integer NOT NULL,
    "sectionFirstTitle" text,
    "sectionFirstPackageTitle" text,
    "sectionFirstPackageDescription" text,
    "groupPassSectionTilte" text,
    "groupPassSectionButtonTitle" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_registerpagesettings" OWNER TO postgres;

--
-- Name: Myadmin_registerpagesettings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_registerpagesettings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_registerpagesettings_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_registerpagesettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_registerpagesettings_id_seq" OWNED BY public."Myadmin_registerpagesettings".id;


--
-- Name: Myadmin_sidebarmodule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_sidebarmodule" (
    id integer NOT NULL,
    name text,
    icon text,
    "order" integer,
    "isDelete" text
);


ALTER TABLE public."Myadmin_sidebarmodule" OWNER TO postgres;

--
-- Name: Myadmin_sidebarmodule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_sidebarmodule_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_sidebarmodule_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_sidebarmodule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_sidebarmodule_id_seq" OWNED BY public."Myadmin_sidebarmodule".id;


--
-- Name: Myadmin_sidebarsubmodule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_sidebarsubmodule" (
    id integer NOT NULL,
    name text,
    link text,
    id_attr text,
    "order" integer,
    "isDelete" text,
    module_id bigint
);


ALTER TABLE public."Myadmin_sidebarsubmodule" OWNER TO postgres;

--
-- Name: Myadmin_sidebarsubmodule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_sidebarsubmodule_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_sidebarsubmodule_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_sidebarsubmodule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_sidebarsubmodule_id_seq" OWNED BY public."Myadmin_sidebarsubmodule".id;


--
-- Name: Myadmin_speakerpagedata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_speakerpagedata" (
    id integer NOT NULL,
    "sectionFirstTitle" text,
    "sectionFirstDescription" text,
    "sectionFirstButtonLabel" text,
    "sectionFirstButtonRedirectPath" text,
    "sectionFirstLeftImage" text,
    "sectionSecondTitle" text,
    "sectionSecondDescription" text,
    "sectionSecondButtonLabel" text,
    "sectionSecondButtonRedirectPath" text,
    "sectionSecondRightImage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_speakerpagedata" OWNER TO postgres;

--
-- Name: Myadmin_speakerpagedata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_speakerpagedata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_speakerpagedata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_speakerpagedata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_speakerpagedata_id_seq" OWNED BY public."Myadmin_speakerpagedata".id;


--
-- Name: Myadmin_speakerpagesectionthreepoints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_speakerpagesectionthreepoints" (
    id integer NOT NULL,
    "pointTitle" text,
    "pointDescription" text,
    "pointIcon" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_speakerpagesectionthreepoints" OWNER TO postgres;

--
-- Name: Myadmin_speakerpagesectionthreepoints_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_speakerpagesectionthreepoints_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_speakerpagesectionthreepoints_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_speakerpagesectionthreepoints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_speakerpagesectionthreepoints_id_seq" OWNED BY public."Myadmin_speakerpagesectionthreepoints".id;


--
-- Name: Myadmin_speakersection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_speakersection" (
    id integer NOT NULL,
    "speakerSectionFirstTitle" text,
    "speakerSectionSecondTitle" text,
    "speakerSectionButtonTitle" text,
    "speakerSectionButtonIcon" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_speakersection" OWNER TO postgres;

--
-- Name: Myadmin_speakersection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_speakersection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_speakersection_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_speakersection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_speakersection_id_seq" OWNED BY public."Myadmin_speakersection".id;


--
-- Name: Myadmin_sponsorpackagepagedata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_sponsorpackagepagedata" (
    id integer NOT NULL,
    "firstSectionLeftImage" text,
    "firstSectionButtonTitle" text,
    "secondSectionTitle" text,
    "secondSectionShortPara" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_sponsorpackagepagedata" OWNER TO postgres;

--
-- Name: Myadmin_sponsorpackagepagedata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_sponsorpackagepagedata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_sponsorpackagepagedata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_sponsorpackagepagedata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_sponsorpackagepagedata_id_seq" OWNED BY public."Myadmin_sponsorpackagepagedata".id;


--
-- Name: Myadmin_sponsorpagebulletdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_sponsorpagebulletdata" (
    id integer NOT NULL,
    "pointIcon" text,
    "pointShortDescription" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_sponsorpagebulletdata" OWNER TO postgres;

--
-- Name: Myadmin_sponsorpagebulletdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_sponsorpagebulletdata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_sponsorpagebulletdata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_sponsorpagebulletdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_sponsorpagebulletdata_id_seq" OWNED BY public."Myadmin_sponsorpagebulletdata".id;


--
-- Name: Myadmin_sponsorpagedata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_sponsorpagedata" (
    id integer NOT NULL,
    "introParaHeading" text,
    "introParaDescription" text,
    "introParaButtonLabel" text,
    "introParaButtonRedirectPath" text,
    "exhibitSectionTitle" text,
    "exhibitSectionFirstBoxTitle" text,
    "exhibitSectionFirstBoxShortDescription" text,
    "exhibitSectionFirstBoxPoints" text,
    "exhibitSectionSecondBoxTitle" text,
    "exhibitSectionSecondBoxShortDescription" text,
    "exhibitSectionSecondBoxPoints" text,
    "exhibitSectionThirdBoxTitle" text,
    "exhibitSectionThirdBoxShortDescription" text,
    "exhibitSectionThirdBoxPoints" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "introParaImage" text
);


ALTER TABLE public."Myadmin_sponsorpagedata" OWNER TO postgres;

--
-- Name: Myadmin_sponsorpagedata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_sponsorpagedata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_sponsorpagedata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_sponsorpagedata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_sponsorpagedata_id_seq" OWNED BY public."Myadmin_sponsorpagedata".id;


--
-- Name: Myadmin_sponsorsection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_sponsorsection" (
    id integer NOT NULL,
    "sponsorSectionLabel" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_sponsorsection" OWNER TO postgres;

--
-- Name: Myadmin_sponsorsection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_sponsorsection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_sponsorsection_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_sponsorsection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_sponsorsection_id_seq" OWNED BY public."Myadmin_sponsorsection".id;


--
-- Name: Myadmin_standoutcrowdrequestdata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_standoutcrowdrequestdata" (
    id integer NOT NULL,
    "requesterName" text,
    "requesterCompanyName" text,
    "requesterMobile" text,
    "requesterEmail" text,
    "requesterMessage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_standoutcrowdrequestdata" OWNER TO postgres;

--
-- Name: Myadmin_standoutcrowdrequestdata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_standoutcrowdrequestdata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_standoutcrowdrequestdata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_standoutcrowdrequestdata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_standoutcrowdrequestdata_id_seq" OWNED BY public."Myadmin_standoutcrowdrequestdata".id;


--
-- Name: Myadmin_subscribers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_subscribers" (
    id integer NOT NULL,
    "subscriberName" text,
    "subscriberEmail" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_subscribers" OWNER TO postgres;

--
-- Name: Myadmin_subscribers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_subscribers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_subscribers_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_subscribers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_subscribers_id_seq" OWNED BY public."Myadmin_subscribers".id;


--
-- Name: Myadmin_testimonialsection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_testimonialsection" (
    id integer NOT NULL,
    "testimonialSectionLabel" text,
    "testimonialLogo" text,
    "firstTestimonialFirstImage" text,
    "firstTestimonialSecondImage" text,
    "secondTestimonialRightFirstImage" text,
    "secondTestimonialRightSecondImage" text,
    "secondTestimonialLeftFirstImage" text,
    "secondTestimonialLeftSecondImage" text,
    "lastTestimonialFirstImage" text,
    "lastTestimonialSecondImage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_testimonialsection" OWNER TO postgres;

--
-- Name: Myadmin_testimonialsection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_testimonialsection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_testimonialsection_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_testimonialsection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_testimonialsection_id_seq" OWNED BY public."Myadmin_testimonialsection".id;


--
-- Name: Myadmin_themecolorsettings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_themecolorsettings" (
    id integer NOT NULL,
    "primaryColor" text,
    "secondaryColor" text,
    "lightColor" text,
    "darkColor" text,
    "gradientColor" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "editorStyle" text,
    "headerContent" text,
    "headerType" text
);


ALTER TABLE public."Myadmin_themecolorsettings" OWNER TO postgres;

--
-- Name: Myadmin_themecolorsettings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_themecolorsettings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_themecolorsettings_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_themecolorsettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_themecolorsettings_id_seq" OWNED BY public."Myadmin_themecolorsettings".id;


--
-- Name: Myadmin_toemails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_toemails" (
    id integer NOT NULL,
    toemails text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_toemails" OWNER TO postgres;

--
-- Name: Myadmin_toemails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_toemails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_toemails_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_toemails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_toemails_id_seq" OWNED BY public."Myadmin_toemails".id;


--
-- Name: Myadmin_topnews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_topnews" (
    id integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "generalNewsPointId_id" bigint,
    "newsCategoryId_id" bigint
);


ALTER TABLE public."Myadmin_topnews" OWNER TO postgres;

--
-- Name: Myadmin_topnews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_topnews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_topnews_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_topnews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_topnews_id_seq" OWNED BY public."Myadmin_topnews".id;


--
-- Name: Myadmin_venuepagedata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_venuepagedata" (
    id integer NOT NULL,
    "venueFirstSectionLeftImage" text,
    "venueFirstSectionFirstTitle" text,
    "venueFirstSectionSecondTitle" text,
    "venueFirstSectionDescription" text,
    "venueFirstSectionButtonLabel" text,
    "venueSecondSectionLabel" text,
    "venueMapSectionLabel" text,
    "venueMapSectionBackImage" text,
    "venueLocation" text,
    "venueContact" text,
    "venueWebsiteAddress" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "venueAddressLink" text,
    "venueMapLink" text
);


ALTER TABLE public."Myadmin_venuepagedata" OWNER TO postgres;

--
-- Name: Myadmin_venuepagedata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_venuepagedata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_venuepagedata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_venuepagedata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_venuepagedata_id_seq" OWNED BY public."Myadmin_venuepagedata".id;


--
-- Name: Myadmin_venuepagegallery; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_venuepagegallery" (
    id integer NOT NULL,
    "gallerySectionOneBigImage" text,
    "gallerySectionOneSmallImage" text,
    "gallerySectionTwoBigImage" text,
    "gallerySectionTwoSmallImage" text,
    "gallerySectionThreeBigImage" text,
    "gallerySectionThreeSmallImage" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_venuepagegallery" OWNER TO postgres;

--
-- Name: Myadmin_venuepagegallery_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_venuepagegallery_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_venuepagegallery_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_venuepagegallery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_venuepagegallery_id_seq" OWNED BY public."Myadmin_venuepagegallery".id;


--
-- Name: Myadmin_videosectionuseroptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_videosectionuseroptions" (
    id integer NOT NULL,
    "videoSectionUserOptionName" text,
    "videoSectionUserOptionShortDescription" text,
    "videoSectionUserOptionOrderNo" text,
    "videoSectionUserOptionArrowIcon" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text,
    "videoSectionUserOptionRedirectRoute" text
);


ALTER TABLE public."Myadmin_videosectionuseroptions" OWNER TO postgres;

--
-- Name: Myadmin_videosectionuseroptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_videosectionuseroptions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_videosectionuseroptions_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_videosectionuseroptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_videosectionuseroptions_id_seq" OWNED BY public."Myadmin_videosectionuseroptions".id;


--
-- Name: Myadmin_whoshouldattendpagedata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Myadmin_whoshouldattendpagedata" (
    id integer NOT NULL,
    "sectionFirstTitle" text,
    "sectionFirstBoldDescription" text,
    "sectionFirstPoints" text,
    "sectionFirstButtonLabel" text,
    "sectionFirstButtonRedirectPath" text,
    "sectionFirstLeftImage" text,
    "sectionSecondTitle" text,
    "sectionSecondPoints" text,
    "sectionSecondButtonLabel" text,
    "sectionSecondButtonRedirectPath" text,
    "sectionSecondRightImage" text,
    "sectionThreeTilte" text,
    "sectionThreeDescription" text,
    "sectionThreeTabOneTitle" text,
    "sectionThreeTabOneDescription" text,
    "sectionThreeTabTwoTitle" text,
    "sectionThreeTabTwoDescription" text,
    "sectionFourTilte" text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by text,
    updated_by text,
    "isDelete" text
);


ALTER TABLE public."Myadmin_whoshouldattendpagedata" OWNER TO postgres;

--
-- Name: Myadmin_whoshouldattendpagedata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Myadmin_whoshouldattendpagedata_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Myadmin_whoshouldattendpagedata_id_seq" OWNER TO postgres;

--
-- Name: Myadmin_whoshouldattendpagedata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Myadmin_whoshouldattendpagedata_id_seq" OWNED BY public."Myadmin_whoshouldattendpagedata".id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer,
    permission_id integer
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    content_type_id integer,
    codename text,
    name text
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password text,
    last_login timestamp without time zone,
    is_superuser boolean,
    username text,
    last_name text,
    email text,
    is_staff boolean,
    is_active boolean,
    date_joined timestamp without time zone,
    first_name text
);


ALTER TABLE public.auth_user OWNER TO postgres;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer,
    group_id integer
);


ALTER TABLE public.auth_user_groups OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_user_groups_id_seq OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_user_id_seq OWNER TO postgres;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer,
    permission_id integer
);


ALTER TABLE public.auth_user_user_permissions OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    object_id text,
    object_repr text,
    action_flag smallint,
    change_message text,
    content_type_id integer,
    user_id integer,
    action_time timestamp without time zone
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label text,
    model text
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app text,
    name text,
    applied timestamp without time zone
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key text,
    session_data text,
    expire_date timestamp without time zone
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: Event_addonshistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_addonshistory" ALTER COLUMN id SET DEFAULT nextval('public."Event_addonshistory_id_seq"'::regclass);


--
-- Name: Event_blockedemaildomains id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_blockedemaildomains" ALTER COLUMN id SET DEFAULT nextval('public."Event_blockedemaildomains_id_seq"'::regclass);


--
-- Name: Event_delegatesaddons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_delegatesaddons" ALTER COLUMN id SET DEFAULT nextval('public."Event_delegatesaddons_id_seq"'::regclass);


--
-- Name: Event_delegatetransectiondata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_delegatetransectiondata" ALTER COLUMN id SET DEFAULT nextval('public."Event_delegatetransectiondata_id_seq"'::regclass);


--
-- Name: Event_deligatepackageinclusionpoints id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_deligatepackageinclusionpoints" ALTER COLUMN id SET DEFAULT nextval('public."Event_deligatepackageinclusionpoints_id_seq"'::regclass);


--
-- Name: Event_eventagenda id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventagenda" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventagenda_id_seq"'::regclass);


--
-- Name: Event_eventcoreattandees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventcoreattandees" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventcoreattandees_id_seq"'::regclass);


--
-- Name: Event_eventdeligatepackages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventdeligatepackages" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventdeligatepackages_id_seq"'::regclass);


--
-- Name: Event_eventdetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventdetails" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventdetails_id_seq"'::regclass);


--
-- Name: Event_eventexpertspeakers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventexpertspeakers" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventexpertspeakers_id_seq"'::regclass);


--
-- Name: Event_eventfaqs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventfaqs" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventfaqs_id_seq"'::regclass);


--
-- Name: Event_eventgeneralsettings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventgeneralsettings" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventgeneralsettings_id_seq"'::regclass);


--
-- Name: Event_eventindustrytrends id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventindustrytrends" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventindustrytrends_id_seq"'::regclass);


--
-- Name: Event_eventleaders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventleaders" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventleaders_id_seq"'::regclass);


--
-- Name: Event_eventparticipatedindustries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventparticipatedindustries" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventparticipatedindustries_id_seq"'::regclass);


--
-- Name: Event_eventpastattandees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventpastattandees" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventpastattandees_id_seq"'::regclass);


--
-- Name: Event_eventproject id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventproject" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventproject_id_seq"'::regclass);


--
-- Name: Event_eventslideshares id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventslideshares" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventslideshares_id_seq"'::regclass);


--
-- Name: Event_eventslidesharesattandees id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventslidesharesattandees" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventslidesharesattandees_id_seq"'::regclass);


--
-- Name: Event_eventspeakers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventspeakers" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventspeakers_id_seq"'::regclass);


--
-- Name: Event_eventsponsors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventsponsors" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventsponsors_id_seq"'::regclass);


--
-- Name: Event_eventtestimonials id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventtestimonials" ALTER COLUMN id SET DEFAULT nextval('public."Event_eventtestimonials_id_seq"'::regclass);


--
-- Name: Event_grouppassregistrationrequestdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_grouppassregistrationrequestdata" ALTER COLUMN id SET DEFAULT nextval('public."Event_grouppassregistrationrequestdata_id_seq"'::regclass);


--
-- Name: Event_offercoupon id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_offercoupon" ALTER COLUMN id SET DEFAULT nextval('public."Event_offercoupon_id_seq"'::regclass);


--
-- Name: Event_offercouponhistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_offercouponhistory" ALTER COLUMN id SET DEFAULT nextval('public."Event_offercouponhistory_id_seq"'::regclass);


--
-- Name: Event_paymentoptionimage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_paymentoptionimage" ALTER COLUMN id SET DEFAULT nextval('public."Event_paymentoptionimage_id_seq"'::regclass);


--
-- Name: Event_payonlinetransectiondata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_payonlinetransectiondata" ALTER COLUMN id SET DEFAULT nextval('public."Event_payonlinetransectiondata_id_seq"'::regclass);


--
-- Name: Event_registeredcompanydetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_registeredcompanydetails" ALTER COLUMN id SET DEFAULT nextval('public."Event_registeredcompanydetails_id_seq"'::regclass);


--
-- Name: Event_registereddelegates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_registereddelegates" ALTER COLUMN id SET DEFAULT nextval('public."Event_registereddelegates_id_seq"'::regclass);


--
-- Name: Event_registeredsponsereddelegates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_registeredsponsereddelegates" ALTER COLUMN id SET DEFAULT nextval('public."Event_registeredsponsereddelegates_id_seq"'::regclass);


--
-- Name: Event_relatedevents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_relatedevents" ALTER COLUMN id SET DEFAULT nextval('public."Event_relatedevents_id_seq"'::regclass);


--
-- Name: Event_slidesharesaccesspersons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_slidesharesaccesspersons" ALTER COLUMN id SET DEFAULT nextval('public."Event_slidesharesaccesspersons_id_seq"'::regclass);


--
-- Name: Event_sponseredcompanydetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponseredcompanydetails" ALTER COLUMN id SET DEFAULT nextval('public."Event_sponseredcompanydetails_id_seq"'::regclass);


--
-- Name: Event_sponsorcompanytransectiondata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsorcompanytransectiondata" ALTER COLUMN id SET DEFAULT nextval('public."Event_sponsorcompanytransectiondata_id_seq"'::regclass);


--
-- Name: Event_sponsoredcompanyaddonsdetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsoredcompanyaddonsdetails" ALTER COLUMN id SET DEFAULT nextval('public."Event_sponsoredcompanyaddonsdetails_id_seq"'::regclass);


--
-- Name: Event_sponsoroffercoupon id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsoroffercoupon" ALTER COLUMN id SET DEFAULT nextval('public."Event_sponsoroffercoupon_id_seq"'::regclass);


--
-- Name: Event_sponsoroffercouponhistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsoroffercouponhistory" ALTER COLUMN id SET DEFAULT nextval('public."Event_sponsoroffercouponhistory_id_seq"'::regclass);


--
-- Name: Event_sponsorpackageaddons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsorpackageaddons" ALTER COLUMN id SET DEFAULT nextval('public."Event_sponsorpackageaddons_id_seq"'::regclass);


--
-- Name: Event_sponsorpackageaddontypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsorpackageaddontypes" ALTER COLUMN id SET DEFAULT nextval('public."Event_sponsorpackageaddontypes_id_seq"'::regclass);


--
-- Name: Event_sponsorpackagetypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsorpackagetypes" ALTER COLUMN id SET DEFAULT nextval('public."Event_sponsorpackagetypes_id_seq"'::regclass);


--
-- Name: Myadmin_adminrole id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_adminrole" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_adminrole_id_seq"'::regclass);


--
-- Name: Myadmin_adminrole_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_adminrole_permissions" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_adminrole_permissions_id_seq"'::regclass);


--
-- Name: Myadmin_adminuser id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_adminuser" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_adminuser_id_seq"'::regclass);


--
-- Name: Myadmin_adminuser_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_adminuser_permissions" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_adminuser_permissions_id_seq"'::regclass);


--
-- Name: Myadmin_agendasubscriber id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_agendasubscriber" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_agendasubscriber_id_seq"'::regclass);


--
-- Name: Myadmin_becomespeakerrequestdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_becomespeakerrequestdata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_becomespeakerrequestdata_id_seq"'::regclass);


--
-- Name: Myadmin_calendersubscriber id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_calendersubscriber" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_calendersubscriber_id_seq"'::regclass);


--
-- Name: Myadmin_companieslogosection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_companieslogosection" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_companieslogosection_id_seq"'::regclass);


--
-- Name: Myadmin_contactusdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_contactusdata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_contactusdata_id_seq"'::regclass);


--
-- Name: Myadmin_contactushelpdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_contactushelpdata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_contactushelpdata_id_seq"'::regclass);


--
-- Name: Myadmin_contactuspagedata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_contactuspagedata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_contactuspagedata_id_seq"'::regclass);


--
-- Name: Myadmin_countsection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_countsection" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_countsection_id_seq"'::regclass);


--
-- Name: Myadmin_countsectiontopic id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_countsectiontopic" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_countsectiontopic_id_seq"'::regclass);


--
-- Name: Myadmin_enduserpassregistrationrequestdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_enduserpassregistrationrequestdata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_enduserpassregistrationrequestdata_id_seq"'::regclass);


--
-- Name: Myadmin_footerfirstsectionoptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_footerfirstsectionoptions" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_footerfirstsectionoptions_id_seq"'::regclass);


--
-- Name: Myadmin_footeroptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_footeroptions" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_footeroptions_id_seq"'::regclass);


--
-- Name: Myadmin_footersocialmediaoptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_footersocialmediaoptions" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_footersocialmediaoptions_id_seq"'::regclass);


--
-- Name: Myadmin_generalnewspoint id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_generalnewspoint" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_generalnewspoint_id_seq"'::regclass);


--
-- Name: Myadmin_homepagenavlogodata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_homepagenavlogodata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_homepagenavlogodata_id_seq"'::regclass);


--
-- Name: Myadmin_homepagenavmaincategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_homepagenavmaincategories" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_homepagenavmaincategories_id_seq"'::regclass);


--
-- Name: Myadmin_homepagenavsubcategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_homepagenavsubcategories" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_homepagenavsubcategories_id_seq"'::regclass);


--
-- Name: Myadmin_homepagethirdsection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_homepagethirdsection" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_homepagethirdsection_id_seq"'::regclass);


--
-- Name: Myadmin_homepagevideosectioninput id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_homepagevideosectioninput" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_homepagevideosectioninput_id_seq"'::regclass);


--
-- Name: Myadmin_keypointssection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_keypointssection" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_keypointssection_id_seq"'::regclass);


--
-- Name: Myadmin_keypointssectionpoints id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_keypointssectionpoints" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_keypointssectionpoints_id_seq"'::regclass);


--
-- Name: Myadmin_latestnews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_latestnews" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_latestnews_id_seq"'::regclass);


--
-- Name: Myadmin_mediapagehelpers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_mediapagehelpers" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_mediapagehelpers_id_seq"'::regclass);


--
-- Name: Myadmin_newscategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_newscategory" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_newscategory_id_seq"'::regclass);


--
-- Name: Myadmin_pastattandeehomedata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_pastattandeehomedata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_pastattandeehomedata_id_seq"'::regclass);


--
-- Name: Myadmin_pastattandeessection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_pastattandeessection" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_pastattandeessection_id_seq"'::regclass);


--
-- Name: Myadmin_pressmediapageboxdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_pressmediapageboxdata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_pressmediapageboxdata_id_seq"'::regclass);


--
-- Name: Myadmin_pressmediapagedata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_pressmediapagedata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_pressmediapagedata_id_seq"'::regclass);


--
-- Name: Myadmin_quickproposalrequestdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_quickproposalrequestdata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_quickproposalrequestdata_id_seq"'::regclass);


--
-- Name: Myadmin_registerpagesettings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_registerpagesettings" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_registerpagesettings_id_seq"'::regclass);


--
-- Name: Myadmin_sidebarmodule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sidebarmodule" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_sidebarmodule_id_seq"'::regclass);


--
-- Name: Myadmin_sidebarsubmodule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sidebarsubmodule" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_sidebarsubmodule_id_seq"'::regclass);


--
-- Name: Myadmin_speakerpagedata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_speakerpagedata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_speakerpagedata_id_seq"'::regclass);


--
-- Name: Myadmin_speakerpagesectionthreepoints id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_speakerpagesectionthreepoints" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_speakerpagesectionthreepoints_id_seq"'::regclass);


--
-- Name: Myadmin_speakersection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_speakersection" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_speakersection_id_seq"'::regclass);


--
-- Name: Myadmin_sponsorpackagepagedata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sponsorpackagepagedata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_sponsorpackagepagedata_id_seq"'::regclass);


--
-- Name: Myadmin_sponsorpagebulletdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sponsorpagebulletdata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_sponsorpagebulletdata_id_seq"'::regclass);


--
-- Name: Myadmin_sponsorpagedata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sponsorpagedata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_sponsorpagedata_id_seq"'::regclass);


--
-- Name: Myadmin_sponsorsection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sponsorsection" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_sponsorsection_id_seq"'::regclass);


--
-- Name: Myadmin_standoutcrowdrequestdata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_standoutcrowdrequestdata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_standoutcrowdrequestdata_id_seq"'::regclass);


--
-- Name: Myadmin_subscribers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_subscribers" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_subscribers_id_seq"'::regclass);


--
-- Name: Myadmin_testimonialsection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_testimonialsection" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_testimonialsection_id_seq"'::regclass);


--
-- Name: Myadmin_themecolorsettings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_themecolorsettings" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_themecolorsettings_id_seq"'::regclass);


--
-- Name: Myadmin_toemails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_toemails" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_toemails_id_seq"'::regclass);


--
-- Name: Myadmin_topnews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_topnews" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_topnews_id_seq"'::regclass);


--
-- Name: Myadmin_venuepagedata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_venuepagedata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_venuepagedata_id_seq"'::regclass);


--
-- Name: Myadmin_venuepagegallery id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_venuepagegallery" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_venuepagegallery_id_seq"'::regclass);


--
-- Name: Myadmin_videosectionuseroptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_videosectionuseroptions" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_videosectionuseroptions_id_seq"'::regclass);


--
-- Name: Myadmin_whoshouldattendpagedata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_whoshouldattendpagedata" ALTER COLUMN id SET DEFAULT nextval('public."Myadmin_whoshouldattendpagedata_id_seq"'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Data for Name: Event_addonshistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_addonshistory" (id, created_at, updated_at, created_by, updated_by, "isDelete", "addOnId_id", "relatedCompanyId_id") FROM stdin;
2	2025-10-03 11:03:15.518068	2025-10-03 11:03:15.518109	Admin	Admin	No	1	2
3	2026-02-03 14:45:05.789649	2026-02-03 14:45:05.789695	Admin	Admin	No	1	5
4	2026-03-30 12:19:12.557906	2026-03-30 12:19:12.557949	Admin	Admin	No	1	8
5	2026-03-30 12:19:46.315482	2026-03-30 12:19:46.315515	Admin	Admin	No	1	9
6	2026-03-30 12:22:19.973149	2026-03-30 12:22:19.973185	Admin	Admin	No	1	10
7	2026-04-02 10:50:58.530432	2026-04-02 10:50:58.530467	Admin	Admin	No	1	14
8	2026-04-02 10:50:58.556136	2026-04-02 10:50:58.55618	Admin	Admin	No	2	14
9	2026-04-02 10:51:24.726356	2026-04-02 10:51:24.726398	Admin	Admin	No	1	15
10	2026-04-02 10:51:24.752765	2026-04-02 10:51:24.752805	Admin	Admin	No	2	15
11	2026-04-02 10:51:38.072596	2026-04-02 10:51:38.072641	Admin	Admin	No	1	16
12	2026-04-02 10:51:38.100174	2026-04-02 10:51:38.100269	Admin	Admin	No	2	16
13	2026-04-02 10:51:51.262567	2026-04-02 10:51:51.262598	Admin	Admin	No	1	17
14	2026-04-02 10:51:51.289977	2026-04-02 10:51:51.290026	Admin	Admin	No	2	17
15	2026-04-02 10:59:47.88546	2026-04-02 10:59:47.88552	Admin	Admin	No	1	19
16	2026-04-02 11:00:36.675161	2026-04-02 11:00:36.675185	Admin	Admin	No	1	20
17	2026-04-02 11:01:47.111282	2026-04-02 11:01:47.111329	Admin	Admin	No	1	21
18	2026-04-02 11:01:47.131204	2026-04-02 11:01:47.131246	Admin	Admin	No	2	21
19	2026-04-02 11:03:20.364363	2026-04-02 11:03:20.364389	Admin	Admin	No	1	23
20	2026-04-02 11:03:20.391156	2026-04-02 11:03:20.391181	Admin	Admin	No	2	23
21	2026-04-02 11:09:10.296568	2026-04-02 11:09:10.296614	Admin	Admin	No	1	24
22	2026-04-02 11:09:10.321592	2026-04-02 11:09:10.321639	Admin	Admin	No	2	24
23	2026-04-02 11:41:28.203865	2026-04-02 11:41:28.203894	Admin	Admin	No	1	25
24	2026-04-02 11:41:28.227745	2026-04-02 11:41:28.227774	Admin	Admin	No	2	25
25	2026-04-02 11:59:45.560181	2026-04-02 11:59:45.56023	Admin	Admin	No	1	26
26	2026-04-02 11:59:45.584875	2026-04-02 11:59:45.584904	Admin	Admin	No	2	26
\.


--
-- Data for Name: Event_blockedemaildomains; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_blockedemaildomains" (id, "domainName", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	yopmail.com	2026-03-31 15:40:22.246723	2026-03-31 15:40:22.246768	No	No	No
2	gmail..com	2026-04-01 11:31:30.64716	2026-04-01 11:31:41.978773	Admin	Admin	Yes
3	iq-hub.com	2026-04-01 12:20:03.179109	2026-04-01 12:20:03.179169	Admin	Admin	No
\.


--
-- Data for Name: Event_delegatesaddons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_delegatesaddons" (id, "addOnPointName", "additionalPrice", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Add your logo to the website	100	2025-08-25 13:32:20.420177	2025-09-29 15:23:45.308375	Admin	Admin	No
2	 Business cards placement	150	2025-08-25 13:41:12.66346	2025-09-29 15:23:50.883794	Admin	Admin	No
\.


--
-- Data for Name: Event_delegatetransectiondata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_delegatetransectiondata" (id, "invoiceNo", "totalPassAmount", "discountAmount", "addOnsAmount", "taxableCharge", "totalPaidAmount", "transectionId", "transectionType", created_at, updated_at, created_by, updated_by, "isDelete", "relatedCompanyId_id") FROM stdin;
1	WDRM2025220251003	1590.00	318.00	100.00	123.48	1495.48	pi_3SE6laHQBCGmReEP0DShkKPe		2025-10-03 11:03:15.577392	2025-10-03 11:03:15.577445	No	No	No	2
2	WDRM2026320260127	795.00	0.00	0.00	71.55	866.55	pi_3Su9HIHQBCGmReEP162h3sTf		2026-01-27 10:13:45.489675	2026-01-27 10:13:45.489698	No	No	No	3
3	WDRM2026420260127	795.00	0.00	0.00	71.55	866.55	pi_3Su9QLHQBCGmReEP0tQDZuJU		2026-01-27 10:23:06.911577	2026-01-27 10:23:06.911599	No	No	No	4
4	WDRM2026520260203	1590.00	0.00	100.00	152.10	1842.10	pi_3SwkqiHQBCGmReEP0IrwuJwo		2026-02-03 14:45:05.857376	2026-02-03 14:45:05.857423	No	No	No	5
5	WDRM2026620260211	795.00	0.00	0.00	71.55	866.55	pi_3SzbfRHQBCGmReEP1VtCF2fr		2026-02-11 11:33:14.66087	2026-02-11 11:33:14.660907	No	No	No	6
6	WDRM2026720260212	795.00	0.00	0.00	71.55	866.55	pi_3SzzjzHQBCGmReEP1UDtw5Ww		2026-02-12 13:15:32.923898	2026-02-12 13:15:32.923935	No	No	No	7
7	WDRM20261120260331	795.00	0.00	0.00	71.55	866.55	pi_3TH0rcHQBCGmReEP09avod8r		2026-03-31 11:53:45.922978	2026-03-31 11:53:45.923012	No	No	No	11
8	WDRM20261220260331	795.00	0.00	0.00	71.55	866.55	pi_3TH13LHQBCGmReEP0gXtERn3		2026-03-31 12:05:52.660667	2026-03-31 12:05:52.660695	No	No	No	12
9	WDRM20261320260331	795.00	0.00	0.00	71.55	866.55	pi_3TH18FHQBCGmReEP11GIx0rT		2026-03-31 12:10:56.512652	2026-03-31 12:10:56.512701	No	No	No	13
10	WDRM20261820260402	795.00	0.00	0.00	71.55	866.55	pi_3THixWHQBCGmReEP00OE2NrR		2026-04-02 10:58:47.603733	2026-04-02 10:58:47.603762	No	No	No	18
11	WDRM20261920260402	795.00	0.00	100.00	80.55	975.55	pi_3THiyVHQBCGmReEP0UKEYz77		2026-04-02 10:59:47.908431	2026-04-02 10:59:47.908475	No	No	No	19
12	WDRM20262020260402	795.00	0.00	100.00	80.55	975.55	pi_3THizHHQBCGmReEP1P7HWg5h		2026-04-02 11:00:36.697214	2026-04-02 11:00:36.697251	No	No	No	20
13	WDRM20262320260402	795.00	0.00	250.00	94.05	1139.05	pi_3THj1vHQBCGmReEP1f5NLcws		2026-04-02 11:03:20.413945	2026-04-02 11:03:20.413967	No	No	No	23
14	WDRM20262420260402	795.00	0.00	250.00	94.05	1139.05	pi_3THj7ZHQBCGmReEP0XzyNrdz		2026-04-02 11:09:10.346643	2026-04-02 11:09:10.346687	No	No	No	24
15	WDRM20262620260402	795.00	238.50	250.00	72.58	879.09	pi_3THjuWHQBCGmReEP0n2LuZJv		2026-04-02 11:59:45.633611	2026-04-02 11:59:45.633638	No	No	No	26
\.


--
-- Data for Name: Event_deligatepackageinclusionpoints; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_deligatepackageinclusionpoints" (id, "inclusionPointIcon", "inclusionPointDescription", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Event_eventagenda; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventagenda" (id, "startTime", "endTime", created_at, updated_at, created_by, updated_by, "isDelete", "Speaker1AgendaImg", "Speaker1CompanyImg", "Speaker1Id", "Speaker2AgendaImg", "Speaker2CompanyImg", "Speaker2Id", "bulletPoints", day, heading, "industryTrends", "panelModerators", "panelSpeakerIds", "panelSpeakerImages", "selectedSpeakers", "singleSpeakerAgendaImg", "singleSpeakerId", "sortOrder", "speaker1Bullets", "speaker2Bullets", "speakerFormat", "sponsorBy", status, "panelSpeakers", "selectedSpeaker1", "selectedSpeaker2", "singleSpeakerCompanyName", "singleSpeakerName", "speaker1CompanyName", "speaker1Name", "speaker2CompanyName", "speaker2Name", "singleSpeakerCompanyImg") FROM stdin;
54	09:00		2026-03-09 10:19:05.657007	2026-03-09 10:36:20.773228	No	No	Yes							[{"id":1,"value":""}]	Day1	MONDAY, JUNE 15, 2026	null	{}	{}	{}	null			0	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Day	\N	\N	\N							
55	09:30		2026-03-09 10:36:43.606353	2026-03-09 10:44:10.322788	No	No	Yes							[{"id":1,"value":""}]	Day1	MONDAY, JUNE 15, 2026	null	{}	{}	{}	null			0	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Day	\N	\N	\N							
56	10:00		2026-03-09 10:44:16.829141	2026-03-09 10:44:49.583425	No	No	Yes							[{"id":1,"value":""}]	Day1	MONDAY, JUNE 15, 2026	null	{}	{}	{}	null			0	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Day	\N	\N	\N							
57	10:30		2026-03-09 10:44:55.884491	2026-03-09 10:47:31.95674	No	No	Yes							[{"id":1,"value":""}]	Day1	MONDAY, JUNE 15, 2026	null	{}	{}	{}	null			0	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Day	\N	\N	\N							
58	10:00 AM	10:20 PM	2026-03-09 10:45:30.546687	2026-03-09 10:47:34.764231	No	No	Yes							[{"id":1,"value":"fhhjkjk"},{"id":2,"value":""}]	Day1		null	{}	{}	{}	{"value":13,"label":"Alex Morgan","companyName":"Alex Solution"}			0	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	\N	\N	\N							
59	10:20 PM		2026-03-09 10:47:51.625016	2026-03-12 08:02:16.251319	No	No	No							[{"id":1,"value":""}]	Day1	MONDAY, MAY 4, 2026	null	{}	{}	{}	null			0	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Day	\N	\N	\N							
60	08:00	09:00	2026-03-09 10:49:12.25383	2026-04-07 09:42:50.682479	No	No	No							[{"id":1,"value":""}]	Day1	REGISTRATION AND MORNING REFRESHMENTS	null	{}	{}	{}	null			1	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Coffe/Launch	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
61	9:10 AM	9:35 AM	2026-03-09 10:49:18.400074	2026-03-09 10:52:16.744364	No	No	Yes							[{"id":1,"value":""}]	Day1	OPENING ADDRESS	null	{}	{}	{}	null			1	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	\N	\N	\N							
62	09:00	09:10	2026-03-12 08:03:25.007069	2026-03-12 11:57:08.77744	No	No	No							[{"id":1,"value":""}]	Day1	OPENING ADDRESS	null	{}	{}	{}	null			2	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
63	09:10	09:35	2026-03-12 08:06:51.689723	2026-03-12 13:59:17.685162	No	No	No							[{"id":1,"value":"Exploring how decentralization impacts control systems through cognitive and local heuristics"},{"id":3,"value":"Addressing middleware development with a focus on API safety, security, and performance"},{"id":4,"value":"Examining integration challenges between hardware and software in vehicle systems"}]	Day1	SYSTEM ARCHITECTURE FOR DEVELOPMENT OF SOFTWARE-DEFINED VEHICLES	[{"label":"Market Dynamics","value":1},{"label":"Blockchain Technology","value":2}]	{}	{}	{}	null	https://harsh7541.pythonanywhere.com/media/media2%20(%20White%20).png		3	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	Ford Motor Company	Ahsan Qamar					https://harsh7541.pythonanywhere.com/media/mediaFort%20Supply%20Technologies%2C%20LLC.png
64	09:35	09:40	2026-03-12 08:07:33.494524	2026-03-12 12:06:52.043785	No	No	No							[{"id":1,"value":""}]	Day1	Q&A SESSION ON SOFTWARE-DEFINED VEHICLE SYSTEM ARCHITECTURE	null	{}	{}	{}	null			4	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
65	09:40	10:05	2026-03-12 08:09:32.388971	2026-03-12 13:59:34.010591	No	No	No							[{"id":1,"value":"Prioritizing stable, highly available SDV platforms centered on customer experience"},{"id":2,"value":"Integrating digital ecosystems with persona-aware engagement models"},{"id":3,"value":"Delivering predictive, fail-safe OTA as the engine for continuous monetization"}]	Day1	CUSTOMER, SDV, AND DIGITAL ECOSYSTEM - AN ALWAYS-ON EXPERIENCE	[{"label":"Blockchain Technology","value":2},{"label":"Regulatory Reforms","value":5}]	{}	{}	{}	null	https://harsh7541.pythonanywhere.com/media/media1%20%20(%20White%20)_9DXO97v.png		5	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	Lucid Motors	Shrawan Nath Jha					https://harsh7541.pythonanywhere.com/media/mediaLitus%20Inc..png
66	10:05	10:10	2026-03-12 08:09:56.6482	2026-03-12 12:08:32.604807	No	No	No							[{"id":1,"value":""}]	Day1	Q&A SESSION ON BUILDING THE ALWAYS-ON SDV EXPERIENCE	null	{}	{}	{}	null			6	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
67	10:10	10:35	2026-03-12 08:24:58.473709	2026-03-12 14:01:12.329299	No	No	No							[{"id":1,"value":"Understanding how the shift from hardware to software is enabling smarter, scalable vehicles"},{"id":2,"value":"Exploring how zonal architecture, AI, and OTA updates are reshaping vehicle design"},{"id":3,"value":"Learning how OEMs and suppliers must rethink development and software delivery models"}]	Day1	EMERGING TRENDS IN SOFTWARE-CENTRIC ARCHITECTURE FOR NEXT-GEN AUTOMOBILES	[{"label":"Market Dynamics","value":1},{"label":"Mining Security","value":4}]	{}	{}	{}	null	https://harsh7541.pythonanywhere.com/media/media4%20%20(%20White%20)_cvVOxgw.png		7	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	Magna Electronics	Gangadhar Yadiki					https://harsh7541.pythonanywhere.com/media/mediaMagna%20Electronics_ZrqiFzu.png
68	10:35	10:40	2026-03-12 11:38:10.121382	2026-03-12 12:09:19.406896	No	No	No							[{"id":1,"value":""}]	Day1	Q&A SESSION ON SOFTWARE-CENTRIC ARCHITECTURE IN NEXT-GEN AUTOMOBILES	null	{}	{}	{}	null			8	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
69	10:40	11:00	2026-03-12 11:38:53.56489	2026-03-12 12:09:40.894275	No	No	No							[{"id":1,"value":""}]	Day1	MORNING COFFEE BREAK IN THE EXHIBIT AREA	null	{}	{}	{}	null			9	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Coffe/Launch	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
70	11:00	11:30	2026-03-12 11:40:32.751325	2026-03-12 12:36:12.862626	No	No	No							[{"id":1,"value":"In moving towards high-performance central compute, what drives the allocation of functions?"},{"id":2,"value":"How can safe state be conceptualized and defined for centralized computing architecture?"},{"id":3,"value":"How does centralized computing transform development and validation in software-defined vehicles?"}]	Day1	PANEL DISCUSSION ON THE FUTURE OF AUTOMOTIVE ARCHITECTURE - EMBRACING CENTRALIZED COMPUTING	null	{}	{}	{}	null			10	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Panel Speaker		Speaker	[{"id":1,"name":"Ahsan Qamar","companyName":"Ford Motor Company","selectedSpeaker":null,"agendaImage":""},{"id":2,"name":"Manikandan H Menon","companyName":"Lucid Motors","selectedSpeaker":null,"agendaImage":""},{"id":3,"name":"Bernd Graef","companyName":"ETAS","selectedSpeaker":null,"agendaImage":""}]	null	null							
71	11:30	11:55	2026-03-12 11:50:09.363061	2026-03-12 12:10:34.140215	No	No	No							[{"id":1,"value":"Transitioning from ECU sprawl to centralized HPC and zonal architectures"},{"id":2,"value":"Implementing service-oriented microservices with standardized vehicle APIs"},{"id":3,"value":"Integrating cloud-edge CI/CD, fleet telemetry, and OTA-by-design principles"}]	Day1	EMERGING TRENDS IN SOFTWARE-CENTRIC VEHICLE ARCHITECTURE	[{"label":"Network Scalability","value":3},{"label":"Mining Security","value":4}]	{}	{}	{}	null			11	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	ZF Group	Ajay Reddy					https://harsh7541.pythonanywhere.com/media/mediaZF%20Group.png
72	11:55	12:00	2026-03-12 11:50:59.530013	2026-03-12 11:50:59.530057	No	No	No							[{"id":1,"value":""}]	Day1	Q&A SESSION ON ARCHITECTURAL SHIFTS SHAPING NEXT-GEN SDVS	null	{}	{}	{}	null			12	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
73	12:00	12:25	2026-03-12 12:12:15.481121	2026-03-12 12:39:05.838196	No	No	Yes							[{"id":1,"value":"Discovering how AI-defined architectures enable vehicles to adapt and integrate intelligence seamlessly"},{"id":2,"value":"Learning how cloud-native tools shorten silicon and software cycles for faster innovation delivery"},{"id":3,"value":"Understanding how AI acceleration and advanced compute support flexible and safe vehicle design"}]	Day1	BEYOND SOFTWARE-DEFINED – ENGINEERING THE AI-DEFINED VEHICLE REVOLUTION	[{"value":1,"label":"Market Dynamics"},{"value":4,"label":"Mining Security"}]	{}	{}	{}	null			13	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	Amazon Web Services	Stefano Marzani					https://harsh7541.pythonanywhere.com/media/mediaAmazon%20Web%20Services.png
74	12:25	12:30	2026-03-12 12:13:05.727839	2026-03-12 12:40:43.305696	No	No	Yes							[{"id":1,"value":""}]	Day1	Q&A SESSION ON AI-DEFINED VEHICLE ENGINEERING REVOLUTION	null	{}	{}	{}	null			16	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
75	12:30	13:30	2026-03-12 12:14:29.522444	2026-03-12 12:14:29.522489	No	No	No							[{"id":1,"value":""}]	Day1	NETWORKING LUNCH AND VISITING THE SOFTWARE-DEFINED VEHICLES EXHIBITION	null	{}	{}	{}	null			15	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Coffe/Launch	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
76	12:00	12:25	2026-03-12 12:19:16.23803	2026-03-12 12:39:55.544876	No	No	No		https://harsh7541.pythonanywhere.com/media/mediaInfineon%20Technologies.png			https://harsh7541.pythonanywhere.com/media/mediaInfineon%20Technologies_8lR8EKX.png		[{"id":1,"value":"Exploring the rising software complexity in centralized SDV architectures"},{"id":2,"value":"Explaining how simplifying software also reduces hardware design challenges"},{"id":3,"value":"Highlighting the role of configurable software stacks in hardware gateway design"},{"id":4,"value":"Demonstrating how Infineon’s microcontrollers can lower system costs and speed development"}]	Day1	ELIMINATING SOFTWARE IN SOFTWARE-DEFINED VEHICLES	[{"label":"Market Dynamics","value":1},{"label":"Mining Security","value":4}]	{}	{}	{}	null			13	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Two Speakers		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null			Infineon Technologies	Ray Notarantonio	Infineon Technologies	Hugo Ochoa	
77	12:25	12:30	2026-03-12 12:20:11.124666	2026-03-12 12:40:20.570787	No	No	No							[{"id":1,"value":""}]	Day1	Q&A SESSION ON SOFTWARE REDUCTION IN SDV SYSTEM ARCHITECTURE	null	{}	{}	{}	null			14	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
78	14:00	14:25	2026-03-12 12:21:11.388702	2026-03-12 12:44:14.429463	No	No	Yes							[{"id":1,"value":"Detecting vehicle telemetry anomalies using statistical, ML, and hybrid models with clear performance trade-offs"},{"id":2,"value":"Evaluating edge versus cloud processing impacts on latency, accuracy, and fleet-scale deployment costs"},{"id":3,"value":"Quantifying predictive maintenance value through reduced downtime, warranty costs, and improved asset utilization"}]	Day1	ANOMALY DETECTION AND PREDICTIVE MAINTENANCE IN SDVS	[{"label":"Market Dynamics","value":1},{"label":"Mining Security","value":4}]	{}	{}	{}	null			23	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	Volvo Group	Elias Sörstrand					https://harsh7541.pythonanywhere.com/media/mediaVolvo%20Group.png
79	14:25	14:30	2026-03-12 12:21:31.265533	2026-03-12 12:44:02.984066	No	No	Yes							[{"id":1,"value":""}]	Day1	Q&A SESSION ON TELEMETRY ANALYTICS AND MAINTENANCE STRATEGIES	null	{}	{}	{}	null			24	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
80	14:30	14:55	2026-03-12 12:22:36.564511	2026-03-12 12:44:43.007477	No	No	Yes							[{"id":1,"value":"Discovering the potential of software-defined vehicles to boost user experience and innovation"},{"id":2,"value":"Understanding the current roadblocks preventing wide adoption across the automotive industry"},{"id":3,"value":"Evaluating whether SDV strategies are a universal necessity or a niche investment for select OEMs"}]	Day1	SDV - TO BE OR NOT TO BE	[{"value":1,"label":"Market Dynamics"},{"value":4,"label":"Mining Security"}]	{}	{}	{}	null			23	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	Capgemini	Praveen Cherian					https://harsh7541.pythonanywhere.com/media/mediaCapgemini.png
81	14:55	15:00	2026-03-12 12:23:18.15924	2026-03-12 12:44:52.193504	No	No	Yes							[{"id":1,"value":""}]	Day1	Q&A SESSION ON THE VALUE AND CHALLENGES OF SOFTWARE-DEFINED VEHICLES	null	{}	{}	{}	null			23	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
82	15:00	15:30	2026-03-12 12:23:38.957282	2026-03-12 12:23:38.957329	No	No	No							[{"id":1,"value":""}]	Day1	AFTERNOON COFFEE BREAK IN THE EXHIBIT AREA	null	{}	{}	{}	null			17	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Coffe/Launch	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
83	15:30	15:55	2026-03-12 12:26:15.17115	2026-03-12 12:26:15.171194	No	No	No							[{"id":1,"value":"Learn proven tactics for planning and running mission-critical OTA campaigns at a global scale"},{"id":2,"value":"Uncover how update complexity drives hidden costs and how leaders protect uptime and margins"},{"id":3,"value":"Notice how teams move from manual coordination to AI-assisted OTA management using real cases"}]	Day1	FROM COST CENTER TO CATALYST - OPTIMIZING OTA FOR SCALABLE SDV GROWTH	[{"value":1,"label":"Market Dynamics"},{"value":5,"label":"Regulatory Reforms"}]	{}	{}	{}	null			18	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	Encora Inc.	Venkat Swaminathan					https://harsh7541.pythonanywhere.com/media/mediaEncora%20Inc.%20-%20Logo%201.png
84	15:55	16:00	2026-03-12 12:26:35.029717	2026-03-12 12:26:35.029783	No	No	No							[{"id":1,"value":""}]	Day1	Q&A SESSION ON SCALING OTA OPERATIONS FOR SDV GROWTH	null	{}	{}	{}	null			19	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
85	16:00	16:25	2026-03-12 12:33:43.796287	2026-03-12 12:47:23.262188	No	No	No							[{"id":1,"value":"Understanding how to evolve existing vehicle platforms when starting from scratch is not viable"},{"id":2,"value":"Exploring cost-effective strategies to unlock meaningful SDV capabilities under tight budgets"},{"id":3,"value":"Learning practical ways to scale applications across the automotive stack without sacrificing maintainability"}]	Day1	SCALING UP TO SDV LEVEL 5 – A PRACTICAL TRANSITION PLAN FOR OEMS	[{"value":3,"label":"Network Scalability"},{"value":4,"label":"Mining Security"}]	{}	{}	{}	null			20	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	Elektrobit	Ryan Goff					https://harsh7541.pythonanywhere.com/media/mediaeLoaded.png
86	16:25	16:30	2026-03-12 12:34:05.134959	2026-03-12 12:34:05.135013	No	No	No							[{"id":1,"value":""}]	Day1	Q&A SESSION ON SCALING UP TO SDV LEVEL 5 FOR OEMS	null	{}	{}	{}	null			21	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Open/Close	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null							
87	13:30	14:00	2026-03-12 12:43:12.723226	2026-03-12 12:43:42.714566	No	No	No							[{"id":1,"value":"Can OEMs scale autonomous SDVs without rethinking traceability and data infrastructure?"},{"id":2,"value":"How can policy, software, and traffic planning accelerate trust and adoption of AVs?"},{"id":3,"value":"How can OEMs accelerate the shift from traditional ECU-based architectures to SDV platforms?"}]	Day1	PANEL DISCUSSION ON SDVS AND THE TRANSITION TO AUTONOMOUS MOBILITY	null	{}	{}	{}	null			16	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Panel Speaker		Speaker	[{"id":1,"name":"Jose L. Flores","companyName":"Ancor","selectedSpeaker":null,"agendaImage":""},{"id":2,"name":"Ravindra Kondagunta","companyName":"Traction Labs LLC","selectedSpeaker":null,"agendaImage":""},{"id":3,"name":"Ajay Reddy","companyName":"ZF Group","selectedSpeaker":null,"agendaImage":""}]	null	null							
88	14:00	13:55	2026-03-12 12:45:57.675179	2026-03-12 12:46:05.427665	No	No	Yes							[{"id":1,"value":""}]	Day1	rsfdf	null	{}	{}	{}	null			17	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	vbbg	fdfg					
89	14:00	11:11	2026-03-12 12:53:32.76395	2026-03-12 12:53:40.117311	No	No	Yes							[{"id":1,"value":""}]	Day1		null	{}	{}	{}	null			17	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Speaker	\N	\N	\N							
90	14:00	11:00	2026-03-12 12:56:19.597951	2026-03-12 12:56:24.481015	No	No	Yes							[{"id":1,"value":""}]	Day1		null	{}	{}	{}	null			17	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Speaker	\N	\N	\N							
91	14:00	13:00	2026-03-12 13:00:06.268701	2026-03-12 13:00:12.837311	No	No	Yes							[{"id":1,"value":""}]	Day1		null	{}	{}	{}	null			17	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Speaker	\N	\N	\N							
92	14:00		2026-03-12 13:05:26.087351	2026-03-12 13:50:45.321189	No	No	Yes							[{"id":1,"value":""}]	Day1		null	{}	{}	{}	null			17	[{"id":1,"value":""}]	[{"id":1,"value":""}]	undefined		Speaker	\N	\N	\N							
93	14:00	14:10	2026-03-16 12:34:59.431913	2026-03-16 12:36:07.239031	No	No	Yes							[{"id":1,"value":"sdfsds"}]	Day1	dxf	[{"value":2,"label":"Blockchain Technology"}]	{}	{}	{}	null			22	[{"id":1,"value":""}]	[{"id":1,"value":""}]	Single Speaker		Speaker	[{"id":1,"name":"","companyName":"","selectedSpeaker":null,"agendaImage":""}]	null	null	sdfs	sdfsd					
\.


--
-- Data for Name: Event_eventcoreattandees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventcoreattandees" (id, "corAttandeeName", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Capital Allocation	2025-08-14 14:54:59.251117	2026-04-17 12:23:36.950419	Admin	Admin	No
2	Commercial Strategy 	2025-08-14 14:55:09.277544	2026-04-17 12:24:05.196687	Admin	Admin	No
3	Critical Minerals Policy	2025-08-14 14:55:17.613742	2026-04-17 12:24:16.968832	Admin	Admin	No
4	Downstream Processing	2025-08-14 14:55:25.085557	2026-04-17 12:24:46.637767	Admin	Admin	No
5	Economic Development	2025-08-14 14:55:31.652986	2026-04-17 12:24:54.83061	Admin	Admin	No
7	Energy Procurement	2025-08-14 14:55:48.981586	2026-04-17 12:25:15.967046	Admin	Admin	No
8	Energy Transition	2025-08-14 14:56:04.469513	2026-04-17 12:25:28.583212	Admin	Admin	No
9	ESG & Compliance	2025-08-14 14:56:13.43007	2026-04-17 12:25:40.329194	Admin	Admin	No
10	Export Finance	2025-08-14 14:56:21.108445	2026-04-17 12:25:51.011458	Admin	Admin	No
11	Industrial Investment	2025-08-14 14:56:31.821688	2026-04-17 12:26:07.607993	Admin	Admin	No
12	Industrial Operations	2025-08-14 14:56:39.70145	2026-04-17 12:26:43.563839	Admin	Admin	No
13	Infrastructure Planning	2025-08-14 14:56:50.190211	2026-04-17 12:26:54.916167	Admin	Admin	No
14	Lithium Conversion	2025-08-14 14:57:02.541941	2026-04-17 12:27:08.256081	Admin	Admin	No
15	Market Intelligence	2025-08-14 14:57:10.229401	2026-04-17 12:27:18.717507	Admin	Admin	No
16	Offtake & Contracting	2025-08-14 14:57:21.020528	2026-04-17 12:27:29.256714	Admin	Admin	No
17	Power Generation	2025-08-14 14:57:32.597284	2026-04-17 12:27:40.375621	Admin	Admin	No
18	Project Development	2025-08-14 14:57:40.645399	2026-04-17 12:27:54.765665	Admin	Admin	No
19	Project Finance	2025-08-14 14:57:48.260259	2026-04-17 12:28:35.526025	Admin	Admin	No
20	Public Policy	2025-08-14 14:57:56.693483	2026-04-17 12:28:48.218118	Admin	Admin	No
21	Regulatory Affairs	2025-08-14 14:58:05.013287	2026-04-17 12:28:57.636235	Admin	Admin	No
22	Risk Management	2025-08-14 14:58:13.949226	2026-04-17 12:29:07.315405	Admin	Admin	No
23	Strategic Partnerships	2025-08-14 14:58:22.237633	2026-04-17 12:29:20.862781	Admin	Admin	No
24	Supply Chain Strategy	2025-08-14 14:58:31.693271	2026-04-17 12:29:38.365337	Admin	Admin	No
6	Energy Procurement	2025-08-14 14:55:39.645711	2026-04-17 12:30:17.377688	Admin	Admin	Yes
25	Trade & Investment	2026-04-17 12:30:32.797566	2026-04-17 12:30:32.797578	Admin	Admin	No
\.


--
-- Data for Name: Event_eventdeligatepackages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventdeligatepackages" (id, "deligatePackageName", "deligatePackagePrice", "deligatePackageStatus", "deligatePackageShowOrder", "deligatePackageExpiryDate", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
2	Super Early Bird	795	available	1	2025-07-03	2025-07-31 09:51:19.974712	2026-01-13 11:46:23.773129	Admin	Admin	No
3	Early Bird	995	comingSoon	2	2025-07-01	2025-08-01 06:59:15.801343	2026-01-13 11:46:31.401748	Admin	Admin	No
4	Regular Price	1395	comingSoon	3	2025-08-31	2025-08-01 07:00:31.271026	2026-01-13 11:46:36.653738	Admin	Admin	No
\.


--
-- Data for Name: Event_eventdetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventdetails" (id, "eventName", "eventType", "eventYear", "eventDate", "eventLocation", created_at, updated_at, created_by, updated_by, "isDelete", "eventShortCode", "isSeoEnable", "agendaVersion", "contactHubspotId", "eventCityShortCode", "eventColorName", "eventPostponed", "eventShortDate", "eventShortLocation", favicon, "googleTranslate", "hubspotDisposition", "hubspotEmailStatus", "hubspotId", "industryName", "previousAgenda", "recaptchaKey", "stripeMode") FROM stdin;
2	Bitcoin Innovation & Market Evolution 2026	\N	2026	Month Date - Date, YYYY 	City, State, Country	2025-09-24 06:38:26.982278	2026-04-22 11:06:31.642229	Admin	Admin	No	LDZ	Yes	Version-1						City	https://www.australia.lithium-downstream-summit.com/media/mediaFev_ICO.png	false							Test
\.


--
-- Data for Name: Event_eventexpertspeakers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventexpertspeakers" (id, "expertSpeakerName", "expertSpeakerCompany", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Damien Krebs	Damien Krebs	2025-08-20 13:45:02.700722	2026-04-17 10:32:15.019651	Admin	Admin	No
3	Hayley Mcgilivray	Amira Global	2025-08-20 13:45:33.716956	2026-04-17 10:36:17.286675	Admin	Admin	No
2	David Michael	WA Government	2025-08-20 13:45:20.16484	2026-04-17 10:37:14.230173	Admin	Admin	No
\.


--
-- Data for Name: Event_eventfaqs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventfaqs" (id, "faqQuestion", "faqAnswer", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	What Does the Registration Fee Cover?	"<p>Your registration fee includes full access to the conference on all days. It covers meals (including refreshment breaks and lunch), beverages, and, if applicable, access to the Networking Drinks Reception. For further details, refer to our full<a href=\\"https://www.desalination-resource-recovery.com/terms-and-conditions\\"> </a><a href=\\"https://www.desalination-resource-recovery.com/terms-and-conditions\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Terms and Conditions.</a></p>"	2025-08-12 08:09:55.18117	2025-08-12 10:02:46.372244	Admin	Admin	No
2	defgrtht	"<p><a href=\\"https://www.desalination-resource-recovery.com/terms-and-conditions\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">degrtht</a></p>"	2025-08-12 08:35:26.130007	2025-08-12 08:37:02.026716	Admin	Admin	Yes
3	What Costs Are Excluded from the Registration Fee?	"<p>Accommodation and transportation costs are not included in the conference fee.</p>"	2025-08-12 10:17:44.661902	2025-08-12 10:17:44.661931	Admin	Admin	No
4	How Will I Receive My Registration Confirmation?	"<p>Once we receive your completed online registration form, an invoice confirming your registration will be sent to you. This invoice serves as your official confirmation of booking.</p>"	2025-08-12 10:18:26.205883	2025-08-12 10:18:26.205908	Admin	Admin	No
5	Can I Request a Receipt?	"<p>Yes, receipts are available upon request. Please remember that your registration confirmation or invoice does not serve as a receipt. Payment of the invoice should be arranged separately as per the given instructions.</p>"	2025-08-12 10:24:10.614211	2025-08-12 10:24:10.614247	Admin	Admin	No
6	How Do I Pay the Registration Fee by Credit Card?	"<p>For credit card payments, please select this option when registering online. One of our team members will then reach out to you for payment processing. For any assistance, contact <a href=\\"mailto:delegates@iQ-Hub.com\\">delegates@iQ-Hub.com</a></p>"	2025-08-12 10:24:45.17309	2025-08-12 10:31:29.703375	Admin	Admin	No
7	Requesting an Invitation Letter for Visa Applications	"<p>We provide visa support letters after receiving full payment of the registration fee. To request a visa letter application form, email <a href=\\"delegates@iQ-Hub.com\\">delegates@iQ-Hub.com</a> . Please note that refunds will not be issued in cases where a visa or entry to the event country has been denied or delayed. For specific visa advice, consult your local embassy or consulate.</p>"	2025-08-12 10:36:30.549681	2025-08-12 10:37:52.109792	Admin	Admin	No
8	What If I Need to Cancel or Replace a Delegate?	"<p>While bookings are non-cancellable, they are transferable. If you cannot attend, a colleague of similar professional status can take your place. Please notify us at <a href=\\"mailto:delegates@iQ-Hub.com\\"><strong>delegates@iQ-Hub.com</strong></a> to make arrangements.</p>"	2025-08-12 10:37:21.060256	2025-08-12 10:37:21.060288	Admin	Admin	No
9	Conference Hotel Fully Booked	"<p>In case the conference hotel is fully booked, please reach out to us at <a href=\\"mailto:delegates@iQ-Hub.com\\"><strong>delegates@iQ-Hub.com</strong></a>. We will assist you by providing a list of alternative nearby hotels upon request.</p>"	2025-08-12 10:38:25.460593	2025-08-12 10:38:25.460618	Admin	Admin	No
10	Amending Badge Details	"<p>For any changes to your badge details, please contact us at <a href=\\"mailto:delegates@iQ-Hub.com\\"><strong>delegates@iQ-Hub.com</strong></a>. Note that the layout and font size of the badge text are predetermined and cannot be altered.</p>"	2025-08-12 10:38:59.717063	2025-08-12 10:38:59.717096	Admin	Admin	No
11	Access to Conference Papers After the Event	"<p>Attendees will be notified via email on how to access the presentation portal after the event. Be aware that some speakers may choose not to share their presentations, and we cannot guarantee that all presentation slides will be available. We do not offer recordings of sessions.</p>"	2025-08-12 10:39:41.973107	2025-08-12 10:39:41.973131	Admin	Admin	No
12	Dress Code for the Event	"<p>Business attire is required for all conference events to maintain a professional atmosphere.</p>"	2025-08-12 10:45:19.143274	2025-08-12 10:45:19.143308	Admin	Admin	No
13	Networking Opportunities at the Event	"<p>We organize several networking sessions during the event. However, we cannot assure the participation of any specific attendees or companies.</p>"	2025-08-12 10:45:45.286125	2025-08-12 10:45:45.286152	Admin	Admin	No
14	Staying Updated with the Conference Schedule	"<p>The latest event schedule, including session information, is available here. Please note that the schedule is subject to updates, so we recommend checking back regularly.</p>"	2025-08-12 10:46:12.39814	2025-08-12 10:46:12.398164	Admin	Admin	No
15	Dietary Restrictions and Special Food Requests	"<p>We strive to cater to dietary restrictions and allergies. Please inform us of any specific requirements at <a href=\\"mailto:delegates@iQ-Hub.com\\"><strong>delegates@iQ-Hub.com</strong></a> at least 2 working days before the event. We will confirm any special arrangements in writing prior to the event.</p>"	2025-08-12 10:46:38.534399	2025-08-12 10:46:38.534424	Admin	Admin	No
16	Wi-Fi at the Event	"<p>Wi-Fi is available at most of our events. However, its availability is subject to the venue's facilities and specific arrangements for each event. Please be aware that we cannot guarantee Wi-Fi access at all events, and there may be additional charges as per the venue's policy.</p>"	2025-08-12 10:47:11.910325	2025-08-12 10:47:11.91035	Admin	Admin	No
17	Information on Parking and Transportation at the Venue	"<p>For details on parking availability and transportation options at the venue, please contact the venue directly.</p>"	2025-08-12 10:47:35.822819	2025-08-12 10:47:35.822847	Admin	Admin	No
18	Exploring Sponsorship and Exhibition Opportunities	"<p>Interested in sponsoring or exhibiting at our event? Contact our Sponsorship &amp; Media Manager, William Mora, at <a href=\\"mailto:william.mora@iq-hub.com\\"><strong>william.mora@iq-hub.com</strong></a> to discuss various opportunities.</p>"	2025-08-12 10:48:05.926275	2025-08-12 10:48:05.926299	Admin	Admin	No
19	Further Queries and Contact Information	"<p>For any additional questions or information, reach out to our delegate services team at <a href=\\"mailto:delegates@iQ-Hub.com\\"><strong>delegates@iQ-Hub.com</strong></a>.</p>"	2025-08-12 10:48:38.566457	2025-08-12 10:48:38.566483	Admin	Admin	No
\.


--
-- Data for Name: Event_eventgeneralsettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventgeneralsettings" (id, "purchaseTaxPercent", "currencyName", created_at, updated_at, created_by, updated_by, "isDelete", "currencySymbol", "currencyPosition") FROM stdin;
2	9	Australian Dollar (AUD)	2025-09-24 06:38:27.299698	2026-04-22 11:06:31.669571	Admin	Admin	No	AU$	Top-Left
\.


--
-- Data for Name: Event_eventindustrytrends; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventindustrytrends" (id, "trendTitle", "trendRedirectPath", "trendShortDescription", "trendLongDescription", created_at, updated_at, created_by, updated_by, "isDelete", "trendMetaDescription", "trendMetaTitle") FROM stdin;
1	GLOBAL DEMAND	\N	"<p>Lithium has rapidly emerged as one of the most strategic materials for decision-makers across energy, mobility, and advanced manufacturing. What is driving this rise in attention? It stems from the accelerating global demands for batteries used in electric vehicles, stationary energy storage systems, and consumer electronics. As nations pursue electrification and energy security, the lithium downstream sector, including refining, chemical processing, and battery-grade material production, has established itself as a central pillar of the global energy transition.</p>"	"<p>The global battery economy is expanding at an unprecedented pace. Electric vehicle adoption continues to grow, large-scale battery storage is deployed to stabilise renewable energy systems, and electronics manufacturers are increasing battery capacity requirements across multiple product categories. These trends are placing significant pressure on the lithium downstream sector to expand refining capacity and establish reliable processing hubs capable of converting raw lithium resources into battery-grade chemicals such as lithium hydroxide and lithium carbonate.&nbsp;</p><p>Strategic Processing and Industry Collaboration</p><p>&nbsp;As the lithium market matures, the downstream segment is now more complex. Producers, chemical processors, battery manufacturers, and governments are working together to strengthen supply chain resilience and reduce dependence on single processing regions. This involves developing new refining technologies, improving conversion efficiency, and integrating downstream operations closer to battery manufacturing hubs.&nbsp;</p><p>At the same time, companies are assessing new commercial models to ensure a stable material supply. Long-term offtake agreements, joint ventures between mining and chemical companies, and strategic investments from automotive manufacturers are reshaping the economics of lithium processing.&nbsp;</p><p>Transforming Battery Supply Chains&nbsp;</p><p>The rapid expansion of battery manufacturing is reshaping the entire lithium value chain. As battery gigafactories expand globally, demands for refined lithium compounds continue to rise. This shift is encouraging new downstream processing facilities to be established closer to manufacturing centres, reducing logistics risks and strengthening regional supply chains.&nbsp;</p><p>However, scaling downstream capacity presents significant challenges. Processing facilities require advanced chemical expertise, strict environmental management, and substantial capital investment. The industry stakeholders must also address issues such as permitting timelines, workforce development, and infrastructure requirements to ensure that new refining projects can come online in time to meet the demands.&nbsp;</p><p>As the lithium market continues to expand, stakeholders must balance rapid growth with responsible development. Environmental standards, water management, and energy efficiency are now important considerations for refining operations. At the same time, recycling and circular economy initiatives are emerging as complementary sources of lithium supply that can reduce pressure on primary resources.&nbsp;</p><p>The industry leaders recognise that downstream capacity must grow in tandem with these sustainability goals. Strategic planning across the lithium value chain will therefore play a crucial role in ensuring that supply can meet the demands while maintaining environmental and economic stability.</p>"	2025-07-21 14:02:25.383354	2026-04-17 13:11:50.846099	Admin	Admin	No		
2	REFINING AND TECH	\N	"<p>The rapid growth of electric mobility, grid-scale energy storage, and advanced battery manufacturing has positioned lithium refining and downstream processing at the centre of the global energy transition. As demands for battery-grade lithium chemicals continue to accelerate, the competitiveness of the downstream sector now depends on efficient refining technologies, resilient supply chains, and well-managed cost structures. For stakeholders across the lithium value chain, improving refining efficiency and technological capability is no longer optional; it is a strategic necessity.</p>"	"<p>Optimisation of Lithium Refining Processes</p><p>Process efficiency has become one of the most important levers for improving profitability in lithium refining. Advanced purification techniques, improved crystallisation methods, and integrated chemical processing can significantly improve lithium recovery rates while reducing operating costs. Refining facilities that deploy modern hydrometallurgical processes and automated plant controls can improve product consistency and reduce waste streams.&nbsp;</p><p>For stakeholders across the lithium downstream sector, investment in process optimisation also reduces exposure to fluctuations in raw material quality and feedstock supply. Higher recovery yields, improved reagent efficiency, and lower waste generation translate directly into stronger margins and more stable operations. Companies that adopt modern refining technologies are therefore likely to secure a competitive advantage in supplying battery-grade lithium carbonate and lithium hydroxide.&nbsp;</p><p>Energy consumption and reagent inputs represent a substantial share of lithium refining costs. From calcination and leaching to purification and crystallisation, each stage of lithium processing requires careful management of energy and chemical usage. As refining capacity expands globally, producers are now focusing on improving energy efficiency and optimising reagent utilisation to protect operating margins.&nbsp;</p><p>Process integration, heat recovery systems, and improved plant design can reduce overall energy demands while maintaining high-quality output. Efficient reagent management, including recycling and recovery systems, also allows operators to lower chemical input costs and minimise environmental impacts. These improvements not only strengthen economic performance but also support the long-term sustainability of refining operations.&nbsp;</p><p>For governments and investors, efficient processing technologies can help stabilise lithium supply and reduce cost volatility that often affects downstream battery manufacturing. As a result, refining efficiency has now become a key factor in strengthening the entire battery materials supply chain.&nbsp;</p><p>The rapid expansion of global battery manufacturing has intensified the need for large-scale lithium refining capacity. However, scaling production is not simply a matter of increasing plant size. Refiners must deploy advanced technologies capable of handling diverse feedstocks, including spodumene concentrates, brines, and emerging recycled battery materials.&nbsp;</p><p>Technological innovation in lithium refining allows higher throughput, improved product purity, and lower production costs. Modular refining systems, advanced filtration technologies, and improved crystallisation control allow producers to scale operations while maintaining product quality suitable for battery applications.&nbsp;</p><p>For stakeholders attending the Lithium Downstream Summit, understanding these technological developments is essential for identifying new business opportunities. Equipment manufacturers, technology providers, chemical companies, and battery producers all play a role in building an efficient and resilient downstream ecosystem.&nbsp;</p><p>As global demands for lithium chemicals continue to rise, the ability to refine lithium efficiently, at scale, and with stable cost structures will determine which players lead the next phase of battery supply chain development. By bringing together industry leaders, policymakers, capital providers, and technology innovators, the Lithium Downstream Summit provides a platform for addressing the economic challenges of lithium refining while unlocking new opportunities across the downstream value chain.</p>"	2025-07-21 14:22:51.413021	2026-04-17 13:25:39.666137	Admin	Admin	No		
3	FINANCING MODELS	\N	"<p>The next phase of lithium downstream development will be defined by innovative financing models, strategic capital partnerships, integrated supply agreements, and coordinated investment frameworks that connect mining outputs with battery-grade processing and manufacturing capacity. Projects across the lithium value chain are now structured around long-term offtake agreements, strategic equity participation, and blended capital structures that align the interests of producers, battery manufacturers, financial institutions, and governments.</p>"	"<p>The Lithium Downstream Summit reflects the growing recognition that the energy transition depends not only on resource availability but also on the ability to finance and scale downstream processing infrastructure. Demands for lithium chemicals such as lithium hydroxide and lithium carbonate continue to expand with the growth of electric vehicles and stationary energy storage systems. At the same time, downstream projects require substantial upfront investment, long development timelines, and stable supply chain partnerships. The early phase of the lithium industry was characterised by exploration, extraction, and upstream resource development. Today, the focus has shifted towards refining, chemical conversion, cathode material production, and the financial structures required to support these industrial investments.</p><p>As the lithium markets mature, the financial architecture supporting downstream projects is now more sophisticated. Capital providers, governments, and industrial partners are now working together to establish funding mechanisms that improve project bankability and reduce financial risks. Blended finance structures, combining public funding with private investment, help to accelerate the development of processing facilities and battery material plants. Strategic equity stakes from automotive manufacturers and battery producers are also now more common, allowing supply chain partners to secure access to critical materials while sharing investment risks.</p><p>Long-term offtake agreements are another key component of these financing frameworks. By linking financing structures to committed supply contracts, developers can provide lenders with greater certainty around future revenues. This improves the ability of projects to attract debt financing and institutional capital. At the same time, multilateral development banks and export credit agencies are now playing a larger role in supporting critical mineral processing infrastructure, particularly in regions seeking to develop domestic value chains for battery materials.</p><p>For project developers and industry stakeholders, the financial structure of downstream lithium projects is now as important as the underlying resource base. Investment decisions now depend on stable policy frameworks, transparent regulatory environments, and long-term partnerships between producers, manufacturers, and financial institutions. Capital markets are assessing these developments by adopting new financing approaches that support large-scale chemical processing facilities while ensuring resilience in global battery supply chains.</p><p>This new chapter in the lithium industry is defined by the integration of industrial strategy and financial innovation. The Lithium Downstream Summit explores how stakeholders across the battery supply chain are structuring investments that allow the construction of refineries, conversion plants, and advanced materials facilities. These projects are structured to bridge the gap between raw mineral supply and the rapidly growing demands for battery-grade materials required for electric mobility and energy storage.</p><p>For government leaders and policymakers, the development of downstream lithium processing represents an opportunity to capture greater economic value from critical mineral resources. For industry executives and investors, it highlights the importance of collaborative financing models that balance capital intensity with long-term supply security. Strategic partnerships, structured financing, and coordinated investment strategies allow new projects to move forward despite complex market conditions.</p><p>At the same time, the expansion of downstream lithium capacity introduces new challenges for the sector. Price volatility in lithium markets, evolving environmental standards, and the need for sustainable processing technologies are influencing investment decisions. Stakeholders must therefore evaluate projects not only on their technical feasibility but also on their financial resilience and ability to operate within a rapidly evolving global battery ecosystem.</p>"	2025-07-21 14:24:11.418765	2026-04-17 13:28:18.553238	Admin	Admin	No		
4	OFFTAKE SECURITY	\N	"<p>Demands for lithium-based battery materials continue to accelerate as electric mobility, energy storage systems, and advanced manufacturing expand worldwide. According to industry analysis, the global battery market is expected to grow significantly over the coming decades, with lithium remaining a foundational raw material for battery cathodes. As new refining and processing facilities emerge, downstream participants are now focused on securing stable demands through long-term commercial partnerships.</p>"	"<p>One of the defining developments in the sector is the growing importance of offtake security. Long-term offtake agreements between lithium processors, battery manufacturers, and original equipment manufacturers are used to stabilise revenue streams, strengthen project valuations, and provide confidence to capital providers. These agreements allow producers to secure reliable buyers for refined lithium products, while manufacturers gain greater visibility over future supply. As a result, the downstream lithium economy is now structured around strategic partnerships rather than purely spot market transactions.</p><p>In parallel, new downstream applications continue to expand. Lithium chemicals and advanced battery materials support the rapid deployment of electric vehicles, grid-scale storage, consumer electronics, and emerging industrial electrification. Analysts expect the transportation and stationary storage sectors to account for a large share of lithium demand in the coming decades, reinforcing the importance of coordinated supply chain development.</p><p>The lithium downstream industry is transforming significantly as companies invest in refining capacity, battery materials production, and recycling technologies. The ability to convert lithium resources into high-purity chemicals and specialised battery materials has now become a strategic capability within the global battery ecosystem. Companies with expertise in processing, cathode materials, and battery component manufacturing are well-positioned to capture substantial value within the downstream segment.</p><p>Institutional investors and capital markets are also showing strong interest in downstream projects. However, access to finance is often linked to the strength of long-term commercial agreements. Secure offtake arrangements with established battery manufacturers or automotive companies provide the revenue certainty required for project development and expansion. This dynamic encourages closer collaboration across the entire supply chain, from raw material producers to battery cell manufacturers and end-use industries.</p><p>At the same time, competition for lithium supply is intensifying. Governments and the industry leaders seek to strengthen domestic processing capabilities while maintaining diversified global supply networks. Strategic cooperation between producing regions and manufacturing hubs is therefore an essential element of the downstream lithium economy.</p><p>Reliable supply of battery-grade lithium products depends not only on resource availability but also on efficient refining, transparent market structures, and stable commercial partnerships. Long-term offtake agreements are now used to reduce market volatility, provide operational certainty, and support the large capital investments required for downstream processing facilities.</p><p>These agreements also help align incentives between producers, battery manufacturers, and vehicle makers. By establishing predictable supply relationships, stakeholders can plan production, manage risks, and accelerate the expansion of battery manufacturing capacity. For policymakers and financial institutions, strong offtake frameworks signal market maturity and support the development of resilient battery supply chains.</p>"	2025-07-21 14:25:39.514879	2026-04-17 13:43:03.306448	Admin	Admin	No		
5	POLICY ALIGNMENT	\N	"<p>The lithium downstream sector is entering a phase where policy frameworks, industrial investment, and supply chain coordination must progress in step with one another. Governments, the industry leaders, and capital providers now recognise that policy alignment across jurisdictions plays a decisive role in shaping the economics of lithium processing, refining, and battery material production. Clear and coordinated strategies covering critical minerals development, incentives, regulatory pathways, and export frameworks now sit at the centre of downstream capacity expansion.</p>"	"<p>For companies operating in the lithium value chain, the availability of lithium resources is no longer the only strategic consideration. Investors and manufacturers now assess how policy clarity, permitting processes, industrial incentives, and long-term regulatory stability influence the viability of downstream operations. In an environment where global demand for lithium compounds and battery materials continues to grow, the ability of governments and industry to align policies across borders is now emerging as a key determinant of investment confidence.</p><p>At the same time, policymakers are balancing several priorities, including strengthening supply security, encouraging domestic processing capability, supporting responsible resource development, and ensuring that industrial expansion meets environmental and social expectations. The coming years will therefore require coordinated alignment between governments, producers, refiners, battery material manufacturers, and financial institutions. Strategic alignment around regulatory frameworks, industrial incentives, and trade policies will shape how quickly downstream processing ecosystems can scale and where future investments are directed.</p><p>How the Lithium Downstream Sector Is Adapting</p><p>Developing a competitive lithium downstream ecosystem requires more than resource extraction. The downstream sector includes refining lithium into battery-grade chemicals, producing precursor materials, and integrating these into advanced manufacturing supply chains. For many companies, the critical challenge lies in navigating complex policy environments while maintaining commercial competitiveness.</p><p>Policy alignment is a powerful tool for addressing these challenges. When governments coordinate critical minerals strategies, investment incentives, and export regulations, they create the conditions necessary for large-scale industrial development. Such alignment reduces uncertainty for investors and allows companies to plan long-term projects with greater confidence.</p><p>Transparency in regulatory processes and supply chain governance is now gaining importance. Companies are now expected to demonstrate responsible sourcing, traceability of materials, and compliance with evolving sustainability frameworks. These factors shape procurement decisions by battery manufacturers and influence access to international markets.</p><p>In addition, the lithium downstream sector is now witnessing the emergence of new industrial partnerships. Chemical processors, battery material producers, and advanced manufacturing companies are forming collaborative frameworks to accelerate technology deployment and scale up refining capacity. Financial institutions and multilateral organisations are now playing an active role by supporting project development, infrastructure investment, and supply chain diversification.</p><p>For decision-makers, another important consideration is the integration of policy tools that encourage industrial development without distorting market competitiveness. Well-structured incentive programmes, streamlined permitting processes, and transparent regulatory systems can accelerate the development of refining capacity while maintaining investor confidence. At the same time, coordinated export frameworks and trade agreements help ensure that downstream materials move efficiently across global supply chains.</p><p>The future of the lithium downstream sector will be shaped by how effectively governments and industry align their policy frameworks with industrial development strategies. Cross-border coordination of critical minerals policies is now recognised as a mechanism to strengthen supply chains while supporting economic growth.</p><p>For governments, this involves establishing regulatory environments that encourage investment in refining capacity and battery material production while maintaining environmental and social standards. For industry leaders, it means engaging with policymakers to ensure that regulatory frameworks remain practical, predictable, and supportive of large-scale projects.</p><p>Companies are also positioning themselves to play a more integrated role within the lithium value chain. Rather than operating solely as producers or processors, many organisations are expanding into multiple stages of the downstream ecosystem. This approach allows them to capture greater value from lithium resources while strengthening resilience against supply chain disruptions.</p><p>At the same time, capital providers are now paying closer attention to policy coherence when evaluating investment opportunities. Projects located within jurisdictions that demonstrate clear industrial strategies, stable regulatory environments, and strong international partnerships are now viewed as lower-risk investments. This dynamic reinforces the importance of policy alignment in shaping the competitive landscape of the lithium downstream sector.</p>"	2025-07-21 14:27:00.346942	2026-04-17 13:46:45.988397	Admin	Admin	No		
\.


--
-- Data for Name: Event_eventleaders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventleaders" (id, "leaderName", "leaderLogo", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Leader A	https://harsh7541.pythonanywhere.com/media/mediaacme.png	2025-08-21 14:52:14.055585	2026-01-19 12:53:32.986242	Admin	Admin	No
2	Leader B	https://harsh7541.pythonanywhere.com/media/mediaaven.png	2025-08-21 14:52:49.216415	2026-01-19 12:53:47.973808	Admin	Admin	No
3	Leader C	https://harsh7541.pythonanywhere.com/media/medialeader1.png	2025-08-21 14:53:20.95062	2026-01-19 13:13:32.717635	Admin	Admin	No
4	Leader D	https://harsh7541.pythonanywhere.com/media/medialeader2.png	2025-08-21 14:53:59.712446	2026-01-19 13:13:50.424263	Admin	Admin	No
5	Leader E	https://harsh7541.pythonanywhere.com/media/medialeader3.png	2025-08-21 14:54:29.943527	2026-01-19 13:14:06.680864	Admin	Admin	No
6	Leader F	https://harsh7541.pythonanywhere.com/media/medialeader4.png	2025-08-21 14:55:03.671384	2026-01-19 13:14:21.621377	Admin	Admin	No
7	Leader G	https://harsh7541.pythonanywhere.com/media/medialeader5.png	2025-08-21 14:55:42.959468	2026-01-19 13:14:38.647975	Admin	Admin	No
8	Leader H	https://harsh7541.pythonanywhere.com/media/medialeader6.png	2025-08-21 14:56:12.848961	2026-01-19 13:15:04.866934	Admin	Admin	No
9	Leader I	https://harsh7541.pythonanywhere.com/media/medialeader7.png	2025-08-21 14:56:54.711502	2026-01-19 13:15:23.627296	Admin	Admin	No
10	Leader J	https://harsh7541.pythonanywhere.com/media/medialeader8.png	2025-08-21 14:57:24.832328	2026-01-19 13:15:39.43358	Admin	Admin	No
11	Leader K	https://harsh7541.pythonanywhere.com/media/medialeader10.png	2025-08-21 14:58:33.751362	2026-01-19 13:26:23.041053	Admin	Admin	No
12	Leader L	https://harsh7541.pythonanywhere.com/media/medialeader11.png	2025-08-21 14:59:01.87974	2026-01-19 13:26:42.023941	Admin	Admin	No
13	Leader M	https://harsh7541.pythonanywhere.com/media/medialogoDACHUAN1-01.png	2025-08-21 14:59:39.76651	2026-01-19 13:27:08.644686	Admin	Admin	No
14	Leader N	https://harsh7541.pythonanywhere.com/media/mediaEvora-Logo_CMYK_20-09.png	2025-08-21 15:00:14.999496	2026-01-19 13:27:57.454377	Admin	Admin	No
15	Leader O	https://harsh7541.pythonanywhere.com/media/mediaslider1_SL2M6kP.png	2025-08-21 15:00:41.567191	2026-01-19 13:29:25.165045	Admin	Admin	No
16	Leader P	https://harsh7541.pythonanywhere.com/media/mediaslider2_rLBvLNq.png	2025-08-21 15:01:17.558974	2026-01-19 13:29:42.116199	Admin	Admin	No
17	Leader Q	https://harsh7541.pythonanywhere.com/media/mediaslider4_ZImTZcm.png	2025-08-21 15:01:41.887212	2026-01-19 13:30:00.270837	Admin	Admin	No
18	Leader R	https://harsh7541.pythonanywhere.com/media/mediaslider7_NjFjkjm.png	2025-08-21 15:02:09.270892	2026-01-19 13:30:16.395519	Admin	Admin	No
\.


--
-- Data for Name: Event_eventparticipatedindustries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventparticipatedindustries" (id, "industryName", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Automotive Manufacturers	2025-08-14 15:18:09.405181	2026-04-17 12:30:56.891513	Admin	Admin	No
2	Battery Material Producers	2025-08-14 15:18:16.670065	2026-04-17 12:31:06.514886	Admin	Admin	No
3	Cathode Manufacturers	2025-08-14 15:18:24.678321	2026-04-17 12:31:16.743157	Admin	Admin	No
4	Chemical Processing Firms	2025-08-14 15:18:33.749384	2026-04-17 12:31:25.997931	Admin	Admin	No
5	Commercial Banks	2025-08-14 15:18:40.998303	2026-04-17 12:31:35.128628	Admin	Admin	No
6	Environmental Consultancies	2025-08-14 15:18:47.462381	2026-04-17 12:31:54.678748	Admin	Admin	No
7	EPC Contractors	2025-08-14 15:18:54.478336	2026-04-17 12:32:05.142156	Admin	Admin	No
8	Equipment Manufacturers	2025-08-14 15:19:00.902008	2026-04-17 12:32:14.793347	Admin	Admin	No
9	EV Battery Producers	2025-08-14 15:19:07.502204	2026-04-17 12:32:25.281316	Admin	Admin	No
10	Export Credit Agencies	2025-08-14 15:19:15.126991	2026-04-17 12:32:34.535354	Admin	Admin	No
11	Grid Operators	2025-08-14 15:19:22.221262	2026-04-17 12:32:42.879662	Admin	Admin	No
12	Industrial Investment Firms	2025-08-14 15:19:32.97517	2026-04-17 12:32:59.394523	Admin	Admin	No
13	Industrial Power Providers	2025-08-14 15:19:41.750218	2026-04-17 12:33:18.982845	Admin	Admin	No
14	Industry Associations	2025-08-14 15:19:48.39081	2026-04-17 12:33:42.440441	Admin	Admin	No
15	Infrastructure Developers	2025-08-14 15:19:54.774606	2026-04-17 12:34:15.18358	Admin	Admin	No
16	Lithium Conversion Plants	2025-08-14 15:20:02.046478	2026-04-17 12:34:26.815291	Admin	Admin	No
17	Lithium Mining Companies	2025-08-14 15:20:08.758671	2026-04-17 12:35:44.215013	Admin	Admin	No
18	Logistics Companies	2025-08-14 15:20:15.07012	2026-04-17 12:35:53.610308	Admin	Admin	No
19	Port Operators 	2025-08-14 15:20:22.095239	2026-04-17 12:36:02.830431	Admin	Admin	No
20	Private Equity Firms	2025-08-14 15:20:29.278452	2026-04-17 12:36:15.961906	Admin	Admin	No
21	Process Technology Firms	2025-08-14 15:20:36.462252	2026-04-17 12:36:31.462933	Admin	Admin	No
22	Renewable Energy Companies	2025-08-14 15:20:44.975102	2026-04-17 12:36:46.397652	Admin	Admin	No
23	Sovereign Wealth Funds	2025-08-14 15:20:51.630299	2026-04-17 12:37:01.489203	Admin	Admin	No
24	Transmission Companies	2025-08-14 15:20:58.062419	2026-04-17 12:37:17.662792	Admin	Admin	No
\.


--
-- Data for Name: Event_eventpastattandees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventpastattandees" (id, "pastAttandeeName", created_at, updated_at, created_by, updated_by, "isDelete", "pastAttandeeLogo") FROM stdin;
1	Fakery Digital	2025-07-28 15:09:51.481781	2026-03-03 12:28:01.722422	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/mediaslider1_zygekHB.png
2	Liva Solution	2025-07-28 15:24:04.114083	2026-03-03 12:46:51.776167	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/mediaslider3.png
3	Hexa Solution	2025-07-28 15:27:20.898034	2026-03-03 12:47:14.426725	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/mediaslider4.png
4	Foxhub Digital	2025-07-28 15:28:22.017289	2026-03-03 12:47:37.389859	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/mediaslider5.png
5	Logoipsum Digital	2025-07-28 15:29:01.618108	2026-03-03 12:48:50.615255	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/mediaslider6.png
6	Logoip Solution	2025-07-28 15:29:38.338327	2026-03-03 12:49:07.138704	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/mediaslider7.png
7	Circle Enterprise	2025-07-28 15:30:29.514236	2026-03-03 12:49:30.161801	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/mediaslider9.png
8	Amara PVT. LTD.	2025-07-28 15:31:06.466046	2026-03-03 12:49:51.991034	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/mediaslider10.png
9	Dachuan Solution	2025-07-28 15:32:01.170981	2026-03-03 12:50:47.727485	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/medialogoDACHUAN1-01_FDFBbAP.png
10	Greens food suppliers PVT. LTD.	2025-07-29 06:55:37.025712	2026-03-03 12:51:21.281717	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/medialeader2_F9LZPy7.png
11	LGI Solution	2025-07-29 06:56:21.460719	2026-03-03 12:52:08.54419	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/mediaslider8_NtZvrb6.png
12	Company.com Solution	2025-07-29 06:56:59.409538	2026-03-03 12:53:02.759208	Admin	Admin	No	https://harsh7541.pythonanywhere.com/media/mediaslider2_thGGRql.png
\.


--
-- Data for Name: Event_eventproject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventproject" (id, "projectYear", password, created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	2026	BIME2026	2026-04-13 12:59:21.35767	2026-04-13 12:59:21.357707	Admin	Admin	No
\.


--
-- Data for Name: Event_eventslideshares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventslideshares" (id, author, "authorCompany", heading, "pptImage", "pptLink", "projectYear", created_at, updated_at, created_by, updated_by, "isDelete", "projectId_id") FROM stdin;
2	Michael Andronicou	SBRS	HOW TO UNLOCK E-MOBILITY FOR HEAVY-DUTY FLEETS, TODAY	https://harsh7541.pythonanywhere.com/media/media1771923729922_4xPuEKz.jpg	https://www.scribd.com/embeds/1004114031/content?start_page=1&view_mode=scroll&access_key=key-2rRAXsxeZ6ETmXxKGfjN	2026	2026-03-13 14:51:58.460923	2026-04-13 14:43:43.007396	Admin	Admin	No	1
\.


--
-- Data for Name: Event_eventslidesharesattandees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventslidesharesattandees" (id, "companyName", "delegateName", "projectYear", created_at, updated_at, created_by, updated_by, "isDelete", "projectId_id") FROM stdin;
1	EMP LLP.	Chirstiana Mark	2026	2026-03-16 10:21:08.883214	2026-03-16 10:21:22.350145	Admin	Admin	Yes	\N
2	SLB	Adnan Chughtai	2026	2026-03-16 10:22:38.051248	2026-04-13 13:21:11.286698	Admin	Admin	No	1
3	Aixima GmbH	Aida Nonn	2026	2026-03-16 10:23:03.000056	2026-04-13 13:24:53.835275	Admin	Admin	No	1
4	Precise Downhole Solutions	Aleksei Andriianov	2026	2026-03-16 10:23:33.500911	2026-04-13 13:24:58.996405	Admin	Admin	No	1
5	JSC Conexus Baltic Grid	Aleksejs Batrakovs	2026	2026-03-16 10:24:00.349498	2026-04-13 13:25:04.37277	Admin	Admin	No	1
6	Hunton Andrews Kurth LLP	Alexandra Hamilton	2026	2026-03-16 10:24:32.768206	2026-04-13 13:25:09.61488	Admin	Admin	No	1
\.


--
-- Data for Name: Event_eventspeakers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventspeakers" (id, "eventSpeakerName", "eventSpeakerCompany", "eventSpeakerDescription", "viewSpeakerButtonLabel", "speakerProfilePageLink", "eventSpeakerHomePageImage", "eventSpeakerProfilePageImage", "eventSpeakerEmail", "eventSpeakerProposedTitle", "isParticipated", created_at, updated_at, created_by, updated_by, "isDelete", "eventSpeakerProfilePageDescription", "eventSpeakerShortDescription", "eventSpeakerFeaturedPageImage", "eventSpeakerMetaDescription", "eventSpeakerMetaTitle", "eventSpeakerLinkedinFollowers") FROM stdin;
4	Speaker J	Company J	"<p>Speaker J is the Head of Protocol Research at Company J, specializing in Bitcoin scalability, throughput optimization, and enterprise interoperability. She has led initiatives improving system performance, integration workflows, and high-capacity adoption.</p><p>&nbsp;</p><p>Speaker J also collaborates with engineering teams to develop next-generation solutions for global enterprises. Her work strengthens Bitcoin infrastructure and supports innovation across large-scale digital-asset networks.</p>"	\N	\N	https://harsh7541.pythonanywhere.com/media/mediaScott%20Hagen%20-%20original.png	https://harsh7541.pythonanywhere.com/media/mediaScott%20Hagen-%20grey.png	\N	\N	No	2025-07-17 06:56:39.899484	2026-03-03 11:50:00.757326	Admin	Admin	Yes		"<p>Speaker J, Head of Protocol Research at Company J, advances Bitcoin scalability and interoperability through performance-focused strategies that support enterprise-grade digital-asset innovation.</p>"	https://harsh7541.pythonanywhere.com/media/mediaScott%20Hagen%20%20-White.png		\N	0
5	Speaker I	Company I	"<p>Speaker I is the Head of Cybersecurity Architecture at Company I, focusing on the protection of enterprise Bitcoin wallets, exchange platforms, and transaction systems. She has designed frameworks that safeguard high-value digital assets from emerging threats.</p><p>&nbsp;</p><p>Speaker I also collaborates with global partners on real-time monitoring, incident response, and operational risk mitigation. Her leadership strengthens the resilience of Bitcoin infrastructure and supports secure adoption for enterprises.</p>"	\N	\N	https://harsh7541.pythonanywhere.com/media/mediaScott%20Hagen%20-%20original.png	https://harsh7541.pythonanywhere.com/media/mediaScott%20Hagen-%20grey.png	\N	\N	No	2025-07-24 14:46:20.134585	2026-03-03 11:50:03.911334	Admin	Admin	Yes		"<p>Speaker I, Head of Cybersecurity Architecture at Company I, strengthens enterprise Bitcoin security through advanced protection frameworks, threat mitigation, and resilient digital-asset operations.</p>"	https://harsh7541.pythonanywhere.com/media/mediaScott%20Hagen%20%20-White.png		\N	0
7	Deepak Dubal	Queensland University of Technology	"<p>Dr Deepak Dubal is a Professor at Queensland University of Technology, where he leads the Sustainable Energy<br>Materials Lab. Internationally recognised for his pioneering research, he focuses on supercapacitors, advanced</p><p>batteries, and low-carbon processes that support next-generation energy storage.</p><p>Deepak has more than 15 years of experience working across academia and industry collaborations. A highly cited researcher, he has been awarded several prestigious fellowships and continues to drive innovation in sustainable materials for cleaner, more efficient battery manufacturing.</p>"	\N	\N	https://www.australia.lithium-downstream-summit.com/media/mediaDeepak%20Dubal%20-%20original.png	https://www.australia.lithium-downstream-summit.com/media/mediaDeepak%20Dubal%20-%20grey.png	\N	\N	No	2025-07-24 14:53:42.323559	2026-04-17 10:15:45.478932	Admin	Admin	No		"<p>Dr Deepak Dubal, Professor at QUT, advances sustainable energy with expertise in supercapacitors, batteries, and low-carbon materials innovation, driving next-generation storage technologies worldwide.</p>"	https://www.australia.lithium-downstream-summit.com/media/mediaDeepak%20Dubal%20-White.png			200
9	Simon Linge	Livium	"<p>Simon Linge is the Managing Director and the CEO of Livium, a battery technology company supplying critical materials for a circular battery industry. Before joining Livium, he held senior leadership roles at BlueScope across<br>Australia, Asia Pacific, and the United States, including as President of its $1.5 billion ASEAN business.<br>Simon also led global metals manufacturer Bradken as the Managing Director and the CEO, repositioning it for significant growth. Since 2023, Simon has driven Livium’s scale-up across lithium chemicals, battery recycling, and cathode active material technologies.</p>"	\N	\N	https://www.australia.lithium-downstream-summit.com/media/mediaSimon%20Linge%20-%20original.png	https://www.australia.lithium-downstream-summit.com/media/mediaSimon%20Linge%20-%20grey.png	\N	\N	No	2025-07-24 15:05:15.707922	2026-04-17 10:23:27.597273	Admin	Admin	No		"<p>CEO Simon Linge drives innovation at Livium, scaling technologies in lithium, recycling, and CAM to support sustainable battery industry solutions.</p>"	https://www.australia.lithium-downstream-summit.com/media/mediaSimon%20Linge%20-White.png			10
11	Joanne Loh	CSIRO	"<p>Dr. Joanne Loh is the Group Leader for Critical Minerals in the Processing Program at CSIRO Mineral Resources. She<br>oversees major industry collaborations and drives research focused on advancing the processing of resources into higher-value products.<br>Joanne also manages the India–Australia Critical Minerals Research Partnership under the India Economic Strategy for the Australian Federal Government. Her leadership supports innovation across the critical energy minerals sector, strengthening Australia’s position in developing sustainable, technology-driven mineral processing solutions.</p>"	\N	\N	https://www.australia.lithium-downstream-summit.com/media/mediaJoanne%20Loh%20%20%20-%20original.png	https://www.australia.lithium-downstream-summit.com/media/mediaJoanne%20Loh%20%20-%20grey.png	\N	\N	No	2025-07-24 15:11:23.556267	2026-04-17 10:04:56.723751	Admin	Admin	No		"<p>Dr. Joanne Loh, Group Leader at CSIRO, drives cross-sector research in critical minerals processing, fostering</p><p>sustainable innovation and strengthening Australia’s advanced mineral capabilities.</p>"	https://www.australia.lithium-downstream-summit.com/media/mediaJoanne%20Loh%20%20-White.png			79
8	David Michael	Government of Western Australia	"<p>Hon David Michael MLA is the Minister for Mines and Petroleum; Finance; Electoral Affairs; Goldfields-Esperance; and Leader of the House in the Government of Western Australia. He represents the electorate of Balcatta and has<br>served in State Parliament since 2017. David’s leadership spans critical portfolios shaping Western Australia’s economic and resource development. With a background in economics and local government, he continues to advance policies that strengthen the State’s mining sector, fiscal responsibility, and regional growth across key industries.</p>"	\N	\N	https://www.australia.lithium-downstream-summit.com/media/mediaDavid%20Michael%20%20%20-%20original.png	https://www.australia.lithium-downstream-summit.com/media/mediaDavid%20Michael%20%20-%20grey.png	\N	\N	No	2025-07-24 14:57:06.171651	2026-04-17 09:51:54.860788	Admin	Admin	No		"<p>Hon David Michael MLA, Minister for Mines and Petroleum, leads key portfolios driving Western Australia’s mining, finance, and regional economic development.</p>"	https://www.australia.lithium-downstream-summit.com/media/mediaDavid%20Michael%20%20%20-White.png			500
10	Damien Krebs	Primero	"<p>Damien Krebs is a metallurgical engineer at Primero, where he leads lithium refining technology development and advises on critical minerals projects. With more than 25 years of global experience in nickel, cobalt, lithium, and rare earths, he specialises in complex hydrometallurgical processing.<br>Damien spent over a decade with BHP, developing nickel and cobalt technologies across<br>both laterite and sulphide ores. His career includes hands-on work in pressure leaching,<br>uranium, and phosphate, and he holds several international patents related to rare earth<br>and lithium processing.</p>"	\N	\N	https://www.australia.lithium-downstream-summit.com/media/mediaDamien%20Krebs%20-%20original.png	https://www.australia.lithium-downstream-summit.com/media/mediaDamien%20Krebs%20-%20grey.png	\N	\N	No	2025-07-24 15:08:03.540194	2026-04-17 10:14:23.785435	Admin	Admin	No		"<p>Damien Krebs pioneers lithium refining and rare earth processing, leveraging 25+ years in hydrometallurgy and patented innovations in critical minerals.</p>"	https://www.australia.lithium-downstream-summit.com/media/mediaDamien%20Krebs%20(%20White%20).png			800
13	Daniel Cairns	Worley	"<p>Daniel is a materials engineer with over 21 years industrial experience in mineral processing, particle technology, and battery materials projects. He has led product development teams and industrialised innovative processes through scale up and validation.</p><p><br>At Johnson Matthey, he spent 10 years developing heterogeneous catalysts and leading particle technology projects before joining the Battery Materials division, spending 8 years working on pCAM and CAM projects.<br>At Worley Daniel works in the Consulting group as a technical manager, focusing on early-stage engineering<br>studies, technical due diligence, and an SME for all aspects of the battery materials value chain.</p>"	\N	\N	https://www.australia.lithium-downstream-summit.com/media/mediaDaniel%20Cairns%20-%20original.png	https://www.australia.lithium-downstream-summit.com/media/mediaDaniel%20Cairns%20-%20grey.png	\N	\N	No	2025-09-16 11:13:20.004732	2026-04-17 10:15:06.386391	Admin	Admin	No		"<p>Daniel Cairns, Technical Manager at Worley, advances the battery materials value chain with expertise in mineral<br>processing, catalyst development, and large-scale project delivery.</p>"	https://www.australia.lithium-downstream-summit.com/media/mediaDaniel%20Cairns%20(%20White%20).png			500
12	Rebecah Ettridge	Naturaliste Solutions	"<p>Rebecah Ettridge is the Founder and the Director of Naturaliste Solutions, where she helps global companies turn ESG strategy into a source of competitive advantage. She is known for making complex ideas clear and actionable, with insights that connect from boardrooms to operational sites. Rebecah takes a pragmatic, solutions-led approach to advancing sustainability in high-stakes sectors. Her work challenges businesses to reframe ESG from a compliance burden into a powerful lever for innovation, resilience, and long-term value creation across the organisation.</p>"	\N	\N	https://www.australia.lithium-downstream-summit.com/media/mediaRebecah%20Ettridge%20-%20original.png	https://www.australia.lithium-downstream-summit.com/media/mediaRebecah%20Ettridge%20-%20grey.png	\N	\N	No	2025-09-16 10:54:50.179512	2026-04-17 10:16:30.586862	Admin	Admin	No		"<p>Rebecah Ettridge helps global companies turn ESG into a competitive advantage, driving pragmatic, solutions-focused sustainability across complex industries through Naturaliste Solutions.</p>"	https://www.australia.lithium-downstream-summit.com/media/mediaRebecah%20Ettridge%20-White.png			69
6	Richard Simons	Liberate Minerals	"<p>Richard Simons is the Chief Executive Officer and Managing Director of Liberate Minerals Limited. With a career spanning the energy, engineering, defence, infrastructure and transport sectors, he has built extensive expertise in corporate finance and strategy across complex industrial environments.</p><p>&nbsp;</p><p>Richard previously served as theChief Financial Officer for ASX-listed companies Clough, NRW Holdings and Austal Limited, leading major commercial, M&amp;A and compliance initiatives. He now guides Liberate Minerals through its evolution from technology validation to large-scale commercial implementation.</p>"	\N	\N	https://www.australia.lithium-downstream-summit.com/media/mediaRichard%20Simons%20%20-%20original.png	https://www.australia.lithium-downstream-summit.com/media/mediaRichard%20Simons%20-%20grey.png	\N	\N	No	2025-07-24 14:50:36.379854	2026-04-17 10:17:29.896592	Admin	Admin	No		"<p>Richard Simons, CEO of Liberate Minerals, drives the company’s growth with strategic leadership and corporate finance expertise gained across Australia’s energy, defence and infrastructure sectors.</p>"	https://www.australia.lithium-downstream-summit.com/media/mediaRichard%20Simons%20%20-White.png			50
\.


--
-- Data for Name: Event_eventsponsors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventsponsors" (id, "sponsorComapnyName", "sponsorComapnyLogo", "sponsorType", "sponsorComapnyBioDescription", "sponsorComapnyBioLogo", "sponsorEmail", "sponsorMobile", "relateComapnyPersonName", created_at, updated_at, created_by, updated_by, "isDelete", "sponsorWebsite", "eventSponsorMetaDescription", "eventSponsorMetaTitle") FROM stdin;
7	dsws	https://harsh7541.pythonanywhere.com/media/mediaIgnacio_org_CYjuvWB.png	Silver	"<p>fefefe</p>"	\N	\N	\N	\N	2025-07-24 15:18:15.117423	2026-01-09 11:38:13.325344	Admin	Admin	Yes	\N		\N
10	Liva Solution	https://harsh7541.pythonanywhere.com/media/mediamediaslider3.png	Dummy	"<p>Liva Solution Solutions Pvt. Ltd. is a trusted name known for reliability, quality, and customer-centric values. The company has built a reputation for delivering effective and innovative services while maintaining the highest standards of professionalism.</p><p>&nbsp;</p><p>By supporting this event, Liva Solution Solutions demonstrates its commitment to empowering communities, encouraging innovation, and supporting initiatives that inspire progress. We sincerely thank them for their valuable association.</p>"					2025-07-24 15:30:45.597065	2026-04-17 16:05:27.088435	Admin	Admin	No	https://bitcoin-innovation-market-evolution.online/	Liva Solution presents Bitcoin Innovation Market Evolution, exploring new trends and opportunities in Bitcoin, blockchain, and digital markets.	Bitcoin Innovation Market Evolution | Liva Solution
12	Fakery Digital	https://harsh7541.pythonanywhere.com/media/mediamediaslider1_zygekHB.png	Dummy	"<p>Fakery Digital Group is a forward-thinking organization committed to innovation, excellence, and community engagement. With a strong presence across multiple industries, Fakery Digital Group continuously delivers high-quality solutions that create meaningful impact.</p><p>&nbsp;</p><p>Their support for this event reflects their dedication to fostering growth, collaboration, and positive change. We are proud to have Fakery Digital Group as our Title Sponsor, whose vision and leadership add immense value to this occasion.</p>"	\N	\N	\N	\N	2025-07-24 15:32:05.940185	2026-04-17 16:05:38.840867	Admin	Admin	No	https://bitcoin-innovation-market-evolution.online/	Fakery Digital presents Bitcoin Innovation Market Evolution, exploring key Bitcoin trends, blockchain growth, and digital market innovation.	Bitcoin Innovation Market Evolution | Fakery Digital
8	Hexa Solution	https://harsh7541.pythonanywhere.com/media/mediamediaslider4.png	Dummy	"<p>Hexa Solution Foundation believes in giving back to society and supporting initiatives that promote unity, awareness, and development. Their sponsorship of this event highlights their dedication to social responsibility and meaningful engagement with the community.</p><p>&nbsp;</p><p>We are grateful for their generous support and partnership.</p>"	\N	\N	\N	\N	2025-07-24 15:28:57.765294	2026-04-17 16:05:44.122379	Admin	Admin	No	https://bitcoin-innovation-market-evolution.online/	Hexa Solution hosts Bitcoin Innovation Market Evolution, highlighting major Bitcoin trends and blockchain innovation.	Bitcoin Innovation Market Evolution | Hexa Solution
1	METTLER TOLEDO	https://www.australia.lithium-downstream-summit.com/media/mediaMETTLER%20TOLEDO.png	Dummy	""	\N	\N	\N	\N	2025-07-18 07:56:10.738425	2026-04-17 16:08:00.451332	Admin	Admin	No			
9	PSA BDP	https://www.australia.lithium-downstream-summit.com/media/mediaPSA%20BDP.jpg	Dummy	""	\N	\N	\N	\N	2025-07-24 15:29:56.212889	2026-04-17 16:08:27.877368	Admin	Admin	No			
11	Wireless DNA	https://www.australia.lithium-downstream-summit.com/media/mediaWireless%20DNA.jpg	Dummy	""	\N	\N	\N	\N	2025-07-24 15:31:39.853576	2026-04-17 16:08:44.039509	Admin	Admin	No			
\.


--
-- Data for Name: Event_eventtestimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_eventtestimonials" (id, "personName", "personCompany", "personMessage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
6	Stephan Morse	Unchained Solutions Pty Limited	Outstanding lineup of thought leaders, subject matter experts, and industry leaders.	2025-08-12 15:19:22.775327	2026-04-17 10:44:09.050058	Admin	Admin	No
5	Judy McShane	CSIRO	Broad range of engaging topics, with a mix of overviews, techniques, and strategy.	2025-07-19 06:30:50.8147	2026-04-17 10:44:41.849195	Admin	Admin	No
4	Richard Simons	Liberate Minerals Limited	Valuable opportunity to network with industry peers and learn about latest developments.	2025-07-19 06:29:25.940363	2026-04-17 10:45:10.80472	Admin	Admin	No
3	Daniel Cairns	Worley	Wide range of topics on critical minerals and sustainable sector growth pathways.	2025-07-19 06:28:37.812901	2026-04-17 10:47:14.575582	Admin	Admin	No
2	Deepak Dubal	Queensland University of Technology	Strong mix of industry, government, and university perspectives on battery minerals.	2025-07-19 06:25:47.667307	2026-04-17 10:47:53.320338	Admin	Admin	No
1	Muhmmad Rizwan Azhar	Edith Cowan University	The conference offered a great opportunity to meet experts in one place.	2025-07-19 06:12:56.423676	2026-04-17 10:48:31.179633	Admin	Admin	No
\.


--
-- Data for Name: Event_grouppassregistrationrequestdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_grouppassregistrationrequestdata" (id, "requesterName", "requesterCompanyName", "requesterEmail", "requesterMobile", "requesterInterest", "noOfAttandees", "requesterMessage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Event_offercoupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_offercoupon" (id, "couponCode", "discountType", "discountAmount", "couponFor", "eventSpecialWord", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	FRAC20		20			2025-08-22 12:03:11.246179	2026-03-09 09:58:35.287327	Admin	Admin	Yes
2	SPEXPLT		30			2025-08-22 12:03:36.388162	2025-08-22 12:03:36.388182	Admin	Admin	No
3	SPEXGLD		25			2025-08-22 12:04:46.449302	2026-03-09 09:53:07.349013	Admin	Admin	Yes
4	SPEXSLV		20			2025-08-22 12:05:03.453288	2026-03-09 09:32:50.573009	Admin	Admin	Yes
\.


--
-- Data for Name: Event_offercouponhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_offercouponhistory" (id, created_at, updated_at, created_by, updated_by, "isDelete", "offerCouponId_id", "relatedCompanyId_id") FROM stdin;
1	2026-04-02 11:59:45.60791	2026-04-02 11:59:45.607939	No	No	No	2	26
\.


--
-- Data for Name: Event_pageseosettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_pageseosettings" (id, "pageName", "pageMetaTitle", "pageMetaDescription", "pageOgImage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Event_paymentoptionimage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_paymentoptionimage" (id, "paymentOptionImageLink", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Event_payonlinetransectiondata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_payonlinetransectiondata" (id, "invoiceNo", "totalPayAmount", email, "transectionId", "transectionType", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	1234	1500	benny.scott@iq-hub.com			2026-03-18 15:09:50.069332	2026-03-18 15:09:50.071703	Admin	Admin	No
\.


--
-- Data for Name: Event_registeredcompanydetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_registeredcompanydetails" (id, "companyName", "companyWebsite", "companyAddress", "companyCountry", "companyState", "companyCity", "companyPincode", created_at, updated_at, created_by, updated_by, "isDelete", "purchasedDelegatePackageId_id") FROM stdin;
2	Skill Code Hub	www.skillcodehub.com	Novino Road, Makarpura	India	Gujarat	Vadodara	390017	2025-10-03 11:03:14.71675	2025-10-03 11:03:14.716775	Admin	Admin	No	4
3	dwdfere	frfgrgtg	feferfgr	Afghanistan	fefr	eferfgr	523385	2026-01-27 10:13:45.436643	2026-01-27 10:13:45.436676	Admin	Admin	No	2
4	SamComapny	www.sam.com	Vadodara	India	Gujarat	Vadodara	390012	2026-01-27 10:23:06.862925	2026-01-27 10:23:06.862972	Admin	Admin	No	2
5	TEST	www.googler.com	dwdfefe ferfgrg	Andorra		feferfg	456859	2026-02-03 14:45:05.632121	2026-02-03 14:45:05.63343	Admin	Admin	No	2
6	TEST	www.googler.com	dwdfefe ferfgrg	Australia		feferfg	456859	2026-02-11 11:33:14.592163	2026-02-11 11:33:14.592303	Admin	Admin	No	2
7	Abcd Company	www.abcd.in	Test Address	India	Test State	Test City	897485	2026-02-12 13:15:32.862201	2026-02-12 13:15:32.862342	Admin	Admin	No	2
8	TEST	www.googler.com	dwdfefe ferfgrg	Afghanistan		feferfg	456859	2026-03-30 12:19:12.490106	2026-03-30 12:19:12.490163	Admin	Admin	No	2
9	TEST	www.googler.com	dwdfefe ferfgrg	Afghanistan		feferfg	456859	2026-03-30 12:19:46.269815	2026-03-30 12:19:46.269845	Admin	Admin	No	2
10	TEST	www.googler.com	dwdfefe ferfgrg	Afghanistan		feferfg	456859	2026-03-30 12:22:19.925158	2026-03-30 12:22:19.925221	Admin	Admin	No	2
11	asdcs	https://www.desalination-resource-recovery.com	asdcs	Antigua and Barbuda	sdf	vs	345232	2026-03-31 11:53:45.861925	2026-03-31 11:53:45.862365	Admin	Admin	No	2
12	asdcs	https://www.desalination-resource-recovery.com	asdcs	Albania	sdf	vs	345232	2026-03-31 12:05:52.595492	2026-03-31 12:05:52.595524	Admin	Admin	No	2
13	asdcs	https://www.desalination-resource-recovery.com	asdcs	Anguilla	sdf	vs	345232	2026-03-31 12:10:56.459563	2026-03-31 12:10:56.459611	Admin	Admin	No	2
14	LinQ	linq.com	US	United States of America (the)		sdfsdf	sfsdfsdfsdf	2026-04-02 10:50:58.473503	2026-04-02 10:50:58.473537	Admin	Admin	No	2
15	LinQ	linq.com	US	United States of America (the)		sdfsdf	sfsdfsdfsdf	2026-04-02 10:51:24.684243	2026-04-02 10:51:24.684275	Admin	Admin	No	2
16	LinQ	linq.com	US	United States of America (the)		sdfsdf	sfsdfsdfsdf	2026-04-02 10:51:38.021964	2026-04-02 10:51:38.021998	Admin	Admin	No	2
17	LinQ	linq.com	US	United States of America (the)		sdfsdf	sfsdfsdfsdf	2026-04-02 10:51:51.212581	2026-04-02 10:51:51.212611	Admin	Admin	No	2
18	asdcs	https://www.desalination-resource-recovery.com	asdcs	Armenia	sdf	vs	345232	2026-04-02 10:58:47.559474	2026-04-02 10:58:47.559506	Admin	Admin	No	2
19	asdcs	https://www.desalination-resource-recovery.com	asdcs	Armenia	sdf	vs	345232	2026-04-02 10:59:47.84256	2026-04-02 10:59:47.84261	Admin	Admin	No	2
20	asdcs	https://www.desalination-resource-recovery.com	asdcs	Albania	sdf	vs	345232	2026-04-02 11:00:36.628256	2026-04-02 11:00:36.628319	Admin	Admin	No	2
21	LinQ	linq.com	US	United States of America (the)		sdfsdf	sfsdfsdfsdf	2026-04-02 11:01:47.058176	2026-04-02 11:01:47.058223	Admin	Admin	No	2
22	LinQ	linq.com	US	United States of America (the)		sdfsdf	sfsdfsdfsdf	2026-04-02 11:01:55.22809	2026-04-02 11:01:55.228138	Admin	Admin	No	2
23	LinQ	linq.com	US	United Arab Emirates (the)		sdfsdf	23453223	2026-04-02 11:03:20.317253	2026-04-02 11:03:20.317285	Admin	Admin	No	2
24	linq	www.linq.com	vasna	India		vadodara	390019	2026-04-02 11:09:10.251986	2026-04-02 11:09:10.252075	Admin	Admin	No	2
25	TEST	www.googler.com	dwdfefe ferfgrg	Anguilla		feferfg	456859	2026-04-02 11:41:28.16015	2026-04-02 11:41:28.160183	Admin	Admin	No	2
26	TEST	www.googler.com	dwdfefe ferfgrg	Anguilla		feferfg	456859	2026-04-02 11:59:45.514529	2026-04-02 11:59:45.514561	Admin	Admin	No	2
\.


--
-- Data for Name: Event_registereddelegates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_registereddelegates" (id, "firstName", "lastName", mobile, "position", "delegateEmail", created_at, updated_at, created_by, updated_by, "isDelete", "relatedCompanyId_id") FROM stdin;
2	Parth	Patel	+1 851 247 8596	Developer		2025-10-03 11:03:15.392497	2025-10-03 11:03:15.39257	Admin	Admin	No	2
3	Urvisha	Patel	+1 741 236 8596	Developer		2025-10-03 11:03:15.457578	2025-10-03 11:03:15.457618	Admin	Admin	No	2
4	uytuy	tyt6u7	+1 857 485 7485	efer	dvf123@gmail.com	2026-01-27 10:13:45.463756	2026-01-27 10:13:45.463784	Admin	Admin	No	3
5	Sam	Razura	+1 1 234 567 890	Web Developer	samrazura@gmail.com	2026-01-27 10:23:06.887152	2026-01-27 10:23:06.887192	Admin	Admin	No	4
6	efefge	defr	+1 857 485 7485	efer	dvf123@gmail.com	2026-02-03 14:45:05.711745	2026-02-03 14:45:05.711793	Admin	Admin	No	5
7	frfr	frfgr	+1 235 689 7485	hghy	ghy123@gmail.com	2026-02-03 14:45:05.744652	2026-02-03 14:45:05.744706	Admin	Admin	No	5
8	Sam	Razura	+1 857 485 7485	efer	sam.razura@iq-hub.com	2026-02-11 11:33:14.627247	2026-02-11 11:33:14.627275	Admin	Admin	No	6
9	Alfred	Mosco	+1 857 485 7485	Developer	alfred.mosco@iq-hub.com	2026-02-12 13:15:32.892969	2026-02-12 13:15:32.893006	Admin	Admin	No	7
10	Benny	Scott	+8574859685	csdcd	benny.scott@iq-hub.com	2026-03-30 12:19:12.527871	2026-03-30 12:19:12.527924	Admin	Admin	No	8
11	Benny	Scott	+8574859685	csdcd	benny.scott@iq-hub.com	2026-03-30 12:19:46.293023	2026-03-30 12:19:46.293051	Admin	Admin	No	9
12	Benny	Scott	+8574859685	csdcd	benny.scott@iq-hub.com	2026-03-30 12:22:19.949144	2026-03-30 12:22:19.949182	Admin	Admin	No	10
13	dd	dsf	+1 1 236 547 89	000	nolan.powell@iq-hub.com	2026-03-31 11:53:45.893984	2026-03-31 11:53:45.894037	Admin	Admin	No	11
14	dd	dsf	+1 761 879 5351	asc	nolan.powell@iq-hub.com	2026-03-31 12:05:52.627781	2026-03-31 12:05:52.627833	Admin	Admin	No	12
15	dd	dsf	+1 761 879 5351	asc	nolan.powell@iq-hub.com	2026-03-31 12:10:56.483235	2026-03-31 12:10:56.483286	Admin	Admin	No	13
16	Parker	Simpson	+1 234 242 3423	Designation	parker.simpson@iq-hub.com	2026-04-02 10:50:58.500117	2026-04-02 10:50:58.500143	Admin	Admin	No	14
17	Parker	Simpson	+1 234 242 3423	Designation	parker.simpson@iq-hub.com	2026-04-02 10:51:24.703134	2026-04-02 10:51:24.703168	Admin	Admin	No	15
18	Parker	Simpson	+1 234 242 3423	Designation	parker.simpson@iq-hub.com	2026-04-02 10:51:38.046578	2026-04-02 10:51:38.04663	Admin	Admin	No	16
19	Parker	Simpson	+1 234 242 3423	Designation	parker.simpson@iq-hub.com	2026-04-02 10:51:51.237962	2026-04-02 10:51:51.237998	Admin	Admin	No	17
20	dd	dsf	+41 32 354 20 5	000	nolan.powell@iq-hub.com	2026-04-02 10:58:47.580861	2026-04-02 10:58:47.580898	Admin	Admin	No	18
21	dd	dsf	+41 32 354 20 5	asc	nolan.powell@iq-hub.com	2026-04-02 10:59:47.863857	2026-04-02 10:59:47.863908	Admin	Admin	No	19
22	dd	dsf	+41 32 354 20 5	asc	nolan.powell@iq-hub.com	2026-04-02 11:00:36.653859	2026-04-02 11:00:36.653899	Admin	Admin	No	20
23	Parker	Simpson	+1 234 242 3423	Designation	parker.simpson@iq-hub.com	2026-04-02 11:01:47.082795	2026-04-02 11:01:47.082845	Admin	Admin	No	21
24	Parker	Simpson	+1 234 242 3423	Designation	parker.simpson@iq-hub.com	2026-04-02 11:01:55.251463	2026-04-02 11:01:55.251506	Admin	Admin	No	22
25	Parker	Simpson	+1 345 345 5345	sgsdfdgsdfg	parker.simpson@iq-hub.com	2026-04-02 11:03:20.341454	2026-04-02 11:03:20.34148	Admin	Admin	No	23
26	Nolan	Powell	+91 94262 10642	web developer	nolan.powell@iq-hub.com	2026-04-02 11:09:10.273975	2026-04-02 11:09:10.274056	Admin	Admin	No	24
27	Benny	Scott	+8574859685	wefefe	benny.scott@iq-hub.com	2026-04-02 11:41:28.182675	2026-04-02 11:41:28.182709	Admin	Admin	No	25
28	Benny	Scott	+8574859685	wefefe	benny.scott@iq-hub.com	2026-04-02 11:59:45.536815	2026-04-02 11:59:45.536848	Admin	Admin	No	26
\.


--
-- Data for Name: Event_registeredsponsereddelegates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_registeredsponsereddelegates" (id, "firstName", "lastName", mobile, "position", "delegateEmail", created_at, updated_at, created_by, updated_by, "isDelete", "relatedSponsorCompanyId_id") FROM stdin;
3	Kevin	Patel	+1 931 601 9087	Developer	kevin123@gmail.com	2025-10-15 10:11:05.09131	2025-10-15 10:11:05.091345	Admin	Admin	No	2
4	Jaydev	Goswami	+1 856 520 1452	UI-Ux Designer	jaydev123@gmail.com	2025-10-15 10:11:05.173971	2025-10-15 10:11:05.173995	Admin	Admin	No	2
5	Sam	Razura	+1 1 234 567 890	Web Developer	samrazura@gmail.com	2026-01-27 13:10:36.410177	2026-01-27 13:10:36.41023	Admin	Admin	No	3
6	Benny	Scott	+8574859685	dwdwdf	benny.scott@iq-hub.com	2026-03-31 08:56:51.602726	2026-03-31 08:56:51.602777	Admin	Admin	No	4
7	dd	dsf	+41 32 354 20 5	asc	nolan.powell@iq-hub.com	2026-04-14 12:41:45.92427	2026-04-14 12:41:45.924317	Admin	Admin	No	5
8	dd	dsf	+41 32 354 20 5	000	nolan.powell@iq-hub.com	2026-04-14 12:48:52.018136	2026-04-14 12:48:52.018181	Admin	Admin	No	6
9	dd	dsf	+41 32 354 20 5	ad	nolan.powell@iq-hub.com	2026-04-14 13:51:59.084738	2026-04-14 13:51:59.08479	Admin	Admin	No	7
10	dd	dsf	+41 32 354 20 5	ad	nolan.powell@iq-hub.com	2026-04-14 14:05:07.22364	2026-04-14 14:05:07.223704	Admin	Admin	No	8
11	dd	dsf	+41 32 354 20 5	ad	nolan.powell@iq-hub.com	2026-04-14 14:35:39.169594	2026-04-14 14:35:39.169649	Admin	Admin	No	9
\.


--
-- Data for Name: Event_relatedevents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_relatedevents" (id, "eventName", "eventLocation", "eventWebsiteLink", "eventDate", "eventImage", "eventHoverImage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Direct Lithium Extraction Europe 2026	Munich, Germany	https://www.europe.direct-lithium-extraction-show.com/	September 14 - 15, 2026	https://www.australia.lithium-downstream-summit.com/media/media4.png	https://www.australia.lithium-downstream-summit.com/media/media1%20(1).png	2025-07-23 10:24:30.494772	2026-04-22 11:34:10.751888	Admin	Admin	No
2	Battery Minerals Canada 2026	Toronto, Ontario, Canada	https://www.canada.battery-minerals-show.com/	September 28 - 29, 2026	https://www.australia.lithium-downstream-summit.com/media/media5%20(2).png	https://www.australia.lithium-downstream-summit.com/media/media2.png	2025-07-25 12:11:10.044196	2026-04-22 11:34:20.407904	Admin	Admin	No
3	Gigafactory Summit USA 2026	Detroit, Michigan, USA	http://www.usa.gigafactory-summit.com/	September 21 - 22, 2026	https://www.australia.lithium-downstream-summit.com/media/media6.png	https://www.australia.lithium-downstream-summit.com/media/media3%20(1).png	2025-07-25 12:12:03.241748	2026-04-22 11:34:27.410893	Admin	Admin	No
\.


--
-- Data for Name: Event_slidesharesaccesspersons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_slidesharesaccesspersons" (id, email, "eventPassword", "projectYear", created_at, updated_at, created_by, updated_by, "isDelete", "projectId_id") FROM stdin;
1	benny.scott@iq-hub.com	BIME26CSC	2026	2026-03-17 09:15:58.06037	2026-04-13 13:42:48.546127	No	No	No	1
3	nolan.powell@iq-hub.com	BIME26CSC	2026	2026-03-17 11:40:49.343069	2026-04-13 13:42:33.944607	Admin	Admin	No	1
5	sam.razura@iq-hub.com			2026-04-13 13:37:37.472856	2026-04-13 13:37:37.4729	Admin	Admin	No	1
\.


--
-- Data for Name: Event_sponseredcompanydetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_sponseredcompanydetails" (id, "companyName", "companyWebsite", "companyAddress", "companyCountry", "companyState", "companyCity", "companyPincode", created_at, updated_at, created_by, updated_by, "isDelete", "sponsorPackageTypeId_id") FROM stdin;
2	K9 Gaming	www.k9gaming.com	FF-9,Sunrise Shops & Flats, Bapod,Waghodiya Road	India		Vadodara	390019	2025-10-15 10:11:05.011196	2025-10-15 10:11:05.011231	Admin	Admin	No	1
3	SamComapny	www.sam.com	Vadodara	Georgia	Gujarat	Vadodara	390012	2026-01-27 13:10:36.375116	2026-01-27 13:10:36.375289	Admin	Admin	No	3
4	TEST	www.googler.com	dwdfefe ferfgrg	Anguilla		feferfg	456859	2026-03-31 08:56:51.567697	2026-03-31 08:56:51.568164	Admin	Admin	No	1
5	asdcs	https://www.desalination-resource-recovery.com	asdcs	United Arab Emirates (the)	sdf	vs	345232	2026-04-14 12:41:45.897931	2026-04-14 12:41:45.897989	Admin	Admin	No	2
6	asdcs	https://www.desalination-resource-recovery.com	asdcs	Afghanistan	sdf	vs	345232	2026-04-14 12:48:51.990607	2026-04-14 12:48:51.990651	Admin	Admin	No	2
7	asdcs	https://www.desalination-resource-recovery.com	asdcs	Albania	sdf	vs	345232	2026-04-14 13:51:59.046152	2026-04-14 13:51:59.046235	Admin	Admin	No	1
8	asdcs	https://www.desalination-resource-recovery.com	asdcs	Antigua and Barbuda	sdf	vs	345232	2026-04-14 14:05:07.188634	2026-04-14 14:05:07.188668	Admin	Admin	No	1
9	asdcs	https://www.desalination-resource-recovery.com	asdcs	Åland Islands	sdf	vs	345232	2026-04-14 14:35:39.139155	2026-04-14 14:35:39.139206	Admin	Admin	No	1
\.


--
-- Data for Name: Event_sponsorcompanytransectiondata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_sponsorcompanytransectiondata" (id, "invoiceNo", "totalPassAmount", "discountAmount", "addOnsAmount", "taxableCharge", "totalPaidAmount", "transectionId", "transectionType", created_at, updated_at, created_by, updated_by, "isDelete", "relatedSponsorCompanyId_id", "additionalDelegateAmoount") FROM stdin;
1	SPRWDRM2025220251015	2995.00	0.00	500.00	314.55	3809.55	pi_3SIRfgHQBCGmReEP14C64kGt		2025-10-15 10:11:05.316136	2025-10-15 10:11:05.316154	No	No	No	2	0.00
2	SPRWDRM2026320260127	13995.00	0.00	0.00	1259.55	15254.55	pi_3SuC2RHQBCGmReEP1yOPp0n8		2026-01-27 13:10:36.453564	2026-01-27 13:10:36.453615	No	No	No	3	0.00
3	SPRWDRM2026420260331	2995.00	0.00	500.00	314.55	3809.55	pi_3TGy6QHQBCGmReEP0LL6KsNT		2026-03-31 08:56:51.67187	2026-03-31 08:56:51.672114	No	No	No	4	0.00
4	SPRWDRM2026520260414	9995.00	0.00	14750.00	2227.05	26972.05	pi_3TM6HkHQBCGmReEP0KfNReku		2026-04-14 12:41:46.052743	2026-04-14 12:41:46.05279	No	No	No	5	0.00
5	SPRWDRM2026620260414	9995.00	0.00	8900.00	1700.55	20595.55	pi_3TM6OdHQBCGmReEP0Zmi48Rw		2026-04-14 12:48:52.14154	2026-04-14 12:48:52.141569	No	No	No	6	0.00
6	SPRWDRM2026720260414	2995.00	0.00	6900.00	890.55	10785.55	pi_3TM7NiHQBCGmReEP1OokPmKe		2026-04-14 13:51:59.289602	2026-04-14 13:51:59.289667	No	No	No	7	0.00
7	SPRBIME2026820260414	2995.00	0.00	6900.00	890.55	10785.55	pi_3TM7aQHQBCGmReEP0wraoz5o		2026-04-14 14:05:07.385876	2026-04-14 14:05:07.385906	No	No	No	8	0.00
8	SPRBIME2026920260414	2995.00	0.00	8700.00	1052.55	12747.55	pi_3TM83yHQBCGmReEP1E8WApc9		2026-04-14 14:35:39.333274	2026-04-14 14:35:39.333324	No	No	No	9	0.00
\.


--
-- Data for Name: Event_sponsoredcompanyaddonsdetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_sponsoredcompanyaddonsdetails" (id, created_at, updated_at, created_by, updated_by, "isDelete", "relatedSponsorCompanyId_id", "relatedSponsorAddOnsId_id") FROM stdin;
2	2025-10-15 10:11:05.241288	2025-10-15 10:11:05.241307	Admin	Admin	No	2	1
3	2026-03-31 08:56:51.634699	2026-03-31 08:56:51.634745	Admin	Admin	No	4	1
4	2026-04-14 12:41:45.953442	2026-04-14 12:41:45.953474	Admin	Admin	No	5	1
5	2026-04-14 12:41:45.9788	2026-04-14 12:41:45.978844	Admin	Admin	No	5	6
6	2026-04-14 12:41:46.0049	2026-04-14 12:41:46.00493	Admin	Admin	No	5	12
7	2026-04-14 12:41:46.028466	2026-04-14 12:41:46.028516	Admin	Admin	No	5	10
8	2026-04-14 12:48:52.051204	2026-04-14 12:48:52.051247	Admin	Admin	No	6	1
9	2026-04-14 12:48:52.081415	2026-04-14 12:48:52.081441	Admin	Admin	No	6	2
10	2026-04-14 12:48:52.111369	2026-04-14 12:48:52.11141	Admin	Admin	No	6	8
11	2026-04-14 13:51:59.128188	2026-04-14 13:51:59.128234	Admin	Admin	No	7	1
12	2026-04-14 13:51:59.170523	2026-04-14 13:51:59.17057	Admin	Admin	No	7	15
13	2026-04-14 13:51:59.209251	2026-04-14 13:51:59.209299	Admin	Admin	No	7	4
14	2026-04-14 13:51:59.251085	2026-04-14 13:51:59.251118	Admin	Admin	No	7	7
15	2026-04-14 14:05:07.256378	2026-04-14 14:05:07.256424	Admin	Admin	No	8	1
16	2026-04-14 14:05:07.287512	2026-04-14 14:05:07.287544	Admin	Admin	No	8	4
17	2026-04-14 14:05:07.320266	2026-04-14 14:05:07.320314	Admin	Admin	No	8	7
18	2026-04-14 14:05:07.352546	2026-04-14 14:05:07.352579	Admin	Admin	No	8	15
19	2026-04-14 14:35:39.20277	2026-04-14 14:35:39.202823	Admin	Admin	No	9	1
20	2026-04-14 14:35:39.237539	2026-04-14 14:35:39.237588	Admin	Admin	No	9	4
21	2026-04-14 14:35:39.267737	2026-04-14 14:35:39.267786	Admin	Admin	No	9	7
22	2026-04-14 14:35:39.298463	2026-04-14 14:35:39.298512	Admin	Admin	No	9	12
\.


--
-- Data for Name: Event_sponsoroffercoupon; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_sponsoroffercoupon" (id, "couponCode", "discountType", "discountAmount", "couponFor", "eventSpecialWord", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	SPEXTEST		15			2026-04-10 14:53:37.259465	2026-04-10 14:53:37.259501	Admin	Admin	No
\.


--
-- Data for Name: Event_sponsoroffercouponhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_sponsoroffercouponhistory" (id, created_at, updated_at, created_by, updated_by, "isDelete", "offerCouponId_id", "relatedSponsorCompanyId_id") FROM stdin;
\.


--
-- Data for Name: Event_sponsorpackageaddons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_sponsorpackageaddons" (id, "sponsorAddOnName", "sponsorAddOnPrice", created_at, updated_at, created_by, updated_by, "isDelete", "sponsorPackageAddOnTypeId_id") FROM stdin;
1	Larger Logo on Website	500	2025-08-28 05:59:22.135893	2025-10-15 07:37:57.325481	Admin	Admin	No	1
2	Press Release Announcement	5450	2025-08-28 05:59:45.362039	2025-08-28 05:59:45.362057	Admin	Admin	No	1
3	Exclusive Email Blast	6750	2025-08-28 06:00:03.955633	2025-08-28 06:00:03.955658	Admin	Admin	No	1
4	Insertion in Delegate Packs	2950	2025-08-28 06:01:01.599904	2025-08-28 06:01:01.599932	Admin	Admin	No	2
5	Placement on Seats	3750	2025-08-28 06:01:15.298226	2025-08-28 06:01:15.298247	Admin	Admin	No	2
6	Branded Stationery	4750	2025-08-28 06:01:29.113954	2025-08-28 06:01:29.113972	Admin	Admin	No	2
7	Break Sponsor	500	2025-08-28 06:01:46.235021	2025-10-15 07:38:42.780907	Admin	Admin	No	3
8	Session Sponsor	2950	2025-08-28 06:02:02.651078	2025-08-28 06:02:02.6511	Admin	Admin	No	3
9	Raffle Draw Sponsor	3750	2025-08-28 06:02:38.113638	2025-08-28 06:02:38.113656	Admin	Admin	No	3
10	 Luncheon Sponsor	4750	2025-08-28 06:02:53.018892	2025-08-28 06:02:53.018914	Admin	Admin	No	3
11	Drinks Reception Sponsor	5450	2025-08-28 06:03:06.5717	2025-08-28 06:03:06.57173	Admin	Admin	No	3
12	Delegate Pack Sponsor	4750	2025-08-28 06:03:28.195163	2025-08-28 06:03:28.195186	Admin	Admin	No	4
13	Name Badge Sponsor	5450	2025-08-28 06:03:56.507641	2025-08-28 06:03:56.507666	Admin	Admin	No	4
14	 Lanyard Sponsor	6750	2025-08-28 06:04:29.611279	2025-08-28 06:04:29.611302	Admin	Admin	No	4
15	Pull-Up Banner Placement	2950	2025-08-28 06:04:48.075434	2025-08-28 06:04:48.075459	Admin	Admin	No	4
\.


--
-- Data for Name: Event_sponsorpackageaddontypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_sponsorpackageaddontypes" (id, "addOnTypeName", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Pre-event Marketing Add-ons	2025-08-26 10:43:21.425056	2025-08-26 10:46:30.012672	Admin	Admin	No
2	Literature Distribution Add-ons	2025-08-26 10:44:43.684151	2025-08-26 10:44:43.684177	Admin	Admin	No
3	Session Branding Add-ons	2025-08-26 10:45:03.875188	2025-08-26 10:45:03.87521	Admin	Admin	No
4	On Site Branding Add-ons	2025-08-26 10:45:25.283892	2025-08-26 10:45:25.283918	Admin	Admin	No
\.


--
-- Data for Name: Event_sponsorpackagetypes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_sponsorpackagetypes" (id, "sponsorPackageType", "sponsorPackagePrice", "sponsorPackageCuttingPrice", created_at, updated_at, created_by, updated_by, "isDelete", "delegatePassQty", "exhibitSpace", "inviteDiscount", "sponsorPackageShowOrder") FROM stdin;
1	Silver	2995	4995	2025-08-01 13:45:38.504698	2025-10-13 15:23:17.977044	Admin	Admin	No	2	8ft x 8ft	20%	1
2	Gold	9995	15995	2025-08-01 13:46:40.604958	2025-08-01 13:46:40.604984	Admin	Admin	No	3	10ft x 10ft	25%	2
3	Platinum	13995	21995	2025-08-01 13:47:19.397214	2025-08-01 13:47:19.397241	Admin	Admin	No	4	10ft x 20ft	30%	3
\.


--
-- Data for Name: Myadmin_adminrole; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_adminrole" (id, name, detailed_permissions, "isDelete") FROM stdin;
1	Super_Admin	{"eventSpeakers": ["view", "add", "edit", "delete"], "eventSponsors": ["view", "add", "edit", "delete"], "eventKeyPoints": ["view", "add", "edit", "delete"], "eventtestimonials": ["view", "add", "edit", "delete"], "industrytrends": ["view", "add", "edit", "delete"], "relatedevents": ["view", "add", "edit", "delete"], "contactPersons": ["view", "add", "edit", "delete"], "eventpastattandees": ["view", "add", "edit", "delete"], "eventdelpackages": ["view", "add", "edit", "delete"], "eventSpopackages": ["view", "add", "edit", "delete"], "eventStatatics": ["view", "add", "edit", "delete"], "logoSlider": ["view", "add", "edit", "delete"], "newsCategories": ["view", "add", "edit", "delete"], "news": ["view", "add", "edit", "delete"], "faqs": ["view", "add", "edit", "delete"], "coreAttandees": ["view", "add", "edit", "delete"], "industries": ["view", "add", "edit", "delete"], "expertSpeakers": ["view", "add", "edit", "delete"], "eventLeaders": ["view", "add", "edit", "delete"], "offerCoupons": ["view", "add", "edit", "delete"], "navMainCategories": ["view", "add", "edit", "delete"], "navSubCategories": ["view", "add", "edit", "delete"], "eventTagline": ["view", "add", "edit", "delete"], "venuePageData": ["view", "add", "edit", "delete"], "WhoShouldAttendPageData": ["view", "add", "edit", "delete"], "speakerPageData": ["view", "add", "edit", "delete"], "contactUsPageData": ["view", "add", "edit", "delete"], "mediaPageData": ["view", "add", "edit", "delete"], "sponsorPageData": ["view", "add", "edit", "delete"], "homePastAttandeeData": ["view", "add", "edit", "delete"], "delegateAddOns": ["view", "add", "edit", "delete"], "sponsorAddOnTypes": ["view", "add", "edit", "delete"], "sponsorAddOns": ["view", "add", "edit", "delete"], "agendaList": ["view", "add", "edit", "delete"], "eventData": ["view", "add", "edit", "delete"], "socialMediaData": ["view", "add", "edit", "delete"], "contactusresponse": ["view", "add", "edit", "delete"], "eventsubscribers": ["view", "add", "edit", "delete"], "eventCrowdResponse": ["view", "add", "edit", "delete"], "becomeSpeakerResponse": ["view", "add", "edit", "delete"], "quickProposalResponse": ["view", "add", "edit", "delete"], "userPassRegistration": ["view", "add", "edit", "delete"], "joinedCompanies": ["view", "add", "edit", "delete"], "joinedDelegates": ["view", "add", "edit", "delete"], "companyTransections": ["view", "add", "edit", "delete"], "joinedSponsors": ["view", "add", "edit", "delete"], "joinedSponsorDelegates": ["view", "add", "edit", "delete"], "sponsorTransections": ["view", "add", "edit", "delete"], "userManagement": ["view", "add", "edit", "delete"], "roleManagement": ["view", "add", "edit", "delete"], "slideshares": ["view", "add", "edit", "delete"], "eventslideshareattandees": ["view", "add", "edit", "delete"], "eventslideshareaccessors": ["view", "add", "edit", "delete"], "payonlinerequest": ["view", "add", "edit", "delete"], "blockdomain": ["view", "add", "edit", "delete"], "navigation": ["view", "add", "edit", "delete"], "footerNavigation": ["view", "add", "edit", "delete"]}	No
2	User Management	{"userManagement": ["view", "add", "edit", "delete"], "roleManagement": ["view", "add", "edit", "delete"]}	No
\.


--
-- Data for Name: Myadmin_adminrole_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_adminrole_permissions" (id, adminrole_id, sidebarsubmodule_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	1	7
8	1	8
9	1	9
10	1	10
11	1	11
12	1	12
13	1	13
14	1	14
15	1	15
16	1	16
17	1	17
18	1	18
19	1	19
20	1	20
21	1	21
22	1	22
23	1	23
24	1	24
25	1	25
26	1	26
27	1	27
28	1	28
29	1	29
30	1	30
31	1	31
32	1	32
33	1	33
34	1	34
35	1	35
36	1	36
37	1	37
38	1	38
39	1	39
40	1	40
41	1	41
42	1	42
43	1	43
44	1	44
45	1	45
46	1	46
47	1	47
48	1	48
49	1	49
50	1	50
51	2	49
52	2	50
53	1	51
54	1	52
55	1	53
56	1	54
57	1	55
58	1	56
59	1	57
\.


--
-- Data for Name: Myadmin_adminuser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_adminuser" (id, name, username, email, password, detailed_permissions, is_active, created_at, "isDelete", role_id) FROM stdin;
2	\N	Content_Team	contentteam@gmail.com	pbkdf2_sha256$1000000$8chw4FqET36AypnpeAFKwS$JA/2ILGU4+PkNybxFg+1/ftcUqHHjytrmLiY58rXTQI=	{"news": ["view", "add", "edit", "delete"]}	t	2026-03-10 11:07:56.297156	No	\N
3	\N	Harsh	girideep2004v@gmail.com	pbkdf2_sha256$1000000$G0WLrBNJXQubENOaARO2sz$xKTnVpKqBaJRbGSXLcoW79vjFfVrjbcj3Zbp6pwhq3U=	{}	t	2026-03-10 11:57:45.269926	No	2
4	\N	Sam	sam.razura@iq-hub.com	pbkdf2_sha256$1000000$3OYCwlUziEFzwH2J42OJgC$bn8PXho1rAeg/cXOqELIslEaULBAB8m/YuMy6n9dZbs=	{}	t	2026-03-30 10:22:19.142033	No	2
5	\N	Parker	parker.simpson@iq-hub.com	pbkdf2_sha256$1000000$805VFTHePqN74CLuybjPMo$WJvv23WcDCPzUwTbPoPxAa90fstBLYWTNHQpqo8TjwY=	{}	t	2026-04-02 10:55:33.457085	No	1
1	Admin	\N	admin@test.com	pbkdf2_sha256$1000000$tMykhSHkHbBwTyI3olPQRI$GGhOK5S4XmbrhgpAgAdTE4LfLQ3GJEeYA84SecUeu+E=	{"faqs": ["view", "edit", "add", "delete"], "news": ["view", "edit", "add", "delete"], "pageseo": ["view", "add", "edit", "delete"], "toemails": ["view", "add", "edit", "delete"], "eventData": ["view", "edit", "add", "delete"], "agendaList": ["view", "edit", "add", "delete"], "industries": ["view", "edit", "add", "delete"], "logoSlider": ["view", "edit", "add", "delete"], "navigation": ["view", "edit", "add", "delete"], "blockdomain": ["view", "edit", "add", "delete"], "slideshares": ["view", "edit", "add", "delete"], "eventLeaders": ["view", "edit", "add", "delete"], "eventTagline": ["view", "edit", "add", "delete"], "offerCoupons": ["view", "edit", "add", "delete"], "coreAttandees": ["view", "edit", "add", "delete"], "eventSpeakers": ["view", "edit", "add", "delete"], "eventSponsors": ["view", "edit", "add", "delete"], "eventprojects": ["view", "add", "edit", "delete"], "mediaPageData": ["view", "edit", "add", "delete"], "relatedevents": ["view", "edit", "add", "delete"], "sponsorAddOns": ["view", "edit", "add", "delete"], "venuePageData": ["view", "edit", "add", "delete"], "contactPersons": ["view", "edit", "add", "delete"], "delegateAddOns": ["view", "edit", "add", "delete"], "eventKeyPoints": ["view", "edit", "add", "delete"], "eventStatatics": ["view", "edit", "add", "delete"], "expertSpeakers": ["view", "edit", "add", "delete"], "industrytrends": ["view", "edit", "add", "delete"], "joinedSponsors": ["view", "edit", "add", "delete"], "newsCategories": ["view", "edit", "add", "delete"], "roleManagement": ["view", "edit", "add", "delete"], "userManagement": ["view", "edit", "add", "delete"], "joinedCompanies": ["view", "edit", "add", "delete"], "joinedDelegates": ["view", "edit", "add", "delete"], "socialMediaData": ["view", "edit", "add", "delete"], "speakerPageData": ["view", "edit", "add", "delete"], "sponsorPageData": ["view", "edit", "add", "delete"], "eventSpopackages": ["view", "edit", "add", "delete"], "eventdelpackages": ["view", "edit", "add", "delete"], "eventsubscribers": ["view", "edit", "add", "delete"], "footerNavigation": ["view", "edit", "add", "delete"], "navSubCategories": ["view", "edit", "add", "delete"], "payonlinerequest": ["view", "edit", "add", "delete"], "agendasubscribers": ["view", "add", "edit", "delete"], "contactUsPageData": ["view", "edit", "add", "delete"], "contactusresponse": ["view", "edit", "add", "delete"], "eventtestimonials": ["view", "edit", "add", "delete"], "navMainCategories": ["view", "edit", "add", "delete"], "sponsorAddOnTypes": ["view", "edit", "add", "delete"], "eventCrowdResponse": ["view", "edit", "add", "delete"], "eventpastattandees": ["view", "edit", "add", "delete"], "calendersubscribers": ["view", "add", "delete", "edit"], "companyTransections": ["view", "edit", "add", "delete"], "sponsorTransections": ["view", "edit", "add", "delete"], "sponsoroffercoupons": ["view", "add", "edit", "delete"], "homePastAttandeeData": ["view", "edit", "add", "delete"], "userPassRegistration": ["view", "edit", "add", "delete"], "becomeSpeakerResponse": ["view", "edit", "add", "delete"], "quickProposalResponse": ["view", "edit", "add", "delete"], "joinedSponsorDelegates": ["view", "edit", "add", "delete"], "WhoShouldAttendPageData": ["view", "edit", "add", "delete"], "eventslideshareaccessors": ["view", "edit", "add", "delete"], "eventslideshareattandees": ["view", "edit", "add", "delete"]}	t	2026-03-10 10:03:32.564059	No	1
\.


--
-- Data for Name: Myadmin_adminuser_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_adminuser_permissions" (id, adminuser_id, sidebarsubmodule_id) FROM stdin;
1	2	14
2	1	1
3	1	2
4	1	3
5	1	4
6	1	5
7	1	6
8	1	7
9	1	8
10	1	9
11	1	10
12	1	11
13	1	12
14	1	13
15	1	14
16	1	15
17	1	16
18	1	17
19	1	18
20	1	19
21	1	20
22	1	21
23	1	22
24	1	23
25	1	24
26	1	25
27	1	26
28	1	27
29	1	28
30	1	29
31	1	30
32	1	31
33	1	32
34	1	33
35	1	34
36	1	35
37	1	36
38	1	37
39	1	38
40	1	39
41	1	40
42	1	41
43	1	42
44	1	43
45	1	44
46	1	45
47	1	46
48	1	47
49	1	48
50	1	49
51	1	50
52	1	51
53	1	52
54	1	53
55	1	54
57	1	55
58	1	56
59	1	57
60	1	58
61	1	59
62	1	60
63	1	61
64	1	62
65	1	63
\.


--
-- Data for Name: Myadmin_agendasubscriber; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_agendasubscriber" (id, subscriber, created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
3	benny.scott@iq-hub.com	2026-04-10 10:34:32.853738	2026-04-10 10:34:32.853786	Admin	Admin	No
4	benny.scott@gmail.com	2026-04-10 10:34:51.379374	2026-04-10 10:34:51.379428	Admin	Admin	No
5	andy.juarez@iq-hub.com	2026-04-14 14:56:03.537688	2026-04-14 14:56:03.537744	Admin	Admin	No
6	andy.juarez@abc.com	2026-04-14 14:56:24.88322	2026-04-14 14:56:24.883289	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_becomespeakerrequestdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_becomespeakerrequestdata" (id, "requesterName", "requesterCompanyName", "proposedTitle", "requesterEmail", "requesterMessage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Sam	IQhub	BECOME A SPEAKER & JOIN THE CONVERSATION	linqweb@gmail.com	"Interested in BECOME A SPEAKER & JOIN THE CONVERSATION"	2025-08-20 11:22:46.172291	2025-08-20 11:22:46.172329	Admin	Admin	No
2	htyujy	yuyu	yty6yu	yy6yu6u@yyyy.tttt	\N	2026-01-27 13:36:37.049412	2026-01-27 13:36:37.049607	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_calendersubscriber; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_calendersubscriber" (id, "calenderSubscriber", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	benny.scott@iq-hub.com	2026-04-10 09:56:43.012256	2026-04-10 09:56:43.012307	Admin	Admin	No
2	benny.scott@iq-hub.com	2026-04-10 09:56:55.404597	2026-04-10 09:56:55.404657	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_companieslogosection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_companieslogosection" (id, "logoLink", "logoShowOrder", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
10	https://harsh7541.pythonanywhere.com/media/mediaHuobi-logo_OLs10W5.png	\N	2025-08-06 13:57:55.578796	2026-01-19 11:34:30.505033	Admin	Admin	Yes
11	https://harsh7541.pythonanywhere.com/media/mediaKraken-Emblem_Be4jWXt.png	\N	2025-08-06 13:58:03.243698	2026-01-19 11:34:36.784302	Admin	Admin	Yes
1	https://www.australia.lithium-downstream-summit.com/media/mediaAlbemarle%20Corporation.png	\N	2025-08-06 13:51:36.371403	2026-04-17 15:19:10.07465	Admin	Admin	No
2	https://www.australia.lithium-downstream-summit.com/media/mediaAlbemarle%20Corporation-1.png	\N	2025-08-06 13:52:22.977913	2026-04-17 15:19:18.955432	Admin	Admin	No
3	https://www.australia.lithium-downstream-summit.com/media/mediaAMG.png	\N	2025-08-06 13:53:11.121319	2026-04-17 15:19:24.848414	Admin	Admin	No
4	https://www.australia.lithium-downstream-summit.com/media/mediaCentury%20Lithium%20Corp..png	\N	2025-08-06 13:54:32.353894	2026-04-17 15:19:30.946035	Admin	Admin	No
5	https://www.australia.lithium-downstream-summit.com/media/mediaEuropean%20Lithium.png	\N	2025-08-06 13:54:38.80922	2026-04-17 15:19:40.05045	Admin	Admin	No
6	https://www.australia.lithium-downstream-summit.com/media/mediaEuropean%20Metals.png	\N	2025-08-06 13:57:28.906765	2026-04-17 15:19:51.344017	Admin	Admin	No
7	https://www.australia.lithium-downstream-summit.com/media/mediaFrontier%20Lithium.png	\N	2025-08-06 13:57:35.730963	2026-04-17 15:19:59.210365	Admin	Admin	No
8	https://www.australia.lithium-downstream-summit.com/media/mediaImerys.png	\N	2025-08-06 13:57:42.450653	2026-04-17 15:20:07.146253	Admin	Admin	No
9	https://www.australia.lithium-downstream-summit.com/media/mediaKeliber%20Oy.png	\N	2025-08-06 13:57:49.402842	2026-04-17 15:20:15.224563	Admin	Admin	No
12	https://www.australia.lithium-downstream-summit.com/media/mediaLiontown%20Resources.png	\N	2025-08-06 13:58:09.571932	2026-04-17 15:20:22.076528	Admin	Admin	No
13	https://www.australia.lithium-downstream-summit.com/media/mediaLithium%20Americas%20Corp..png		2026-04-17 15:20:32.817116	2026-04-17 15:20:32.817128	Admin	Admin	No
14	https://www.australia.lithium-downstream-summit.com/media/mediaLivent%20Corporation.png		2026-04-17 15:20:40.774042	2026-04-17 15:20:40.774053	Admin	Admin	No
15	https://www.australia.lithium-downstream-summit.com/media/mediaMineral%20Resources.png		2026-04-17 15:20:47.564403	2026-04-17 15:20:47.564416	Admin	Admin	No
16	https://www.australia.lithium-downstream-summit.com/media/mediaMineral%20Resources_DceNSd9.png		2026-04-17 15:20:54.374908	2026-04-17 15:21:04.119338	Admin	Admin	Yes
17	https://www.australia.lithium-downstream-summit.com/media/mediaNemaska%20Lithium.png		2026-04-17 15:21:18.359152	2026-04-17 15:21:18.359165	Admin	Admin	No
18	https://www.australia.lithium-downstream-summit.com/media/mediaPiedmont%20Lithium.png		2026-04-17 15:21:27.352948	2026-04-17 15:21:27.352959	Admin	Admin	No
19	https://www.australia.lithium-downstream-summit.com/media/mediaPilbara%20Minerals.png		2026-04-17 15:21:33.286928	2026-04-17 15:21:33.28694	Admin	Admin	No
20	https://www.australia.lithium-downstream-summit.com/media/mediaRock%20Tech%20Lithium.png		2026-04-17 15:21:39.884541	2026-04-17 15:21:39.884552	Admin	Admin	No
21	https://www.australia.lithium-downstream-summit.com/media/mediaSavannah%20Resources.png		2026-04-17 15:21:46.015928	2026-04-17 15:21:46.015939	Admin	Admin	No
22	https://www.australia.lithium-downstream-summit.com/media/mediaSayona%20Mining.png		2026-04-17 15:21:52.958312	2026-04-17 15:21:52.958332	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_contactusdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_contactusdata" (id, "contactPersonName", "contactPersonCompanyName", "contactPersonEmail", "contactPersonMobile", "contactPersonMessage", "contactUsReason", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	frgtt	eretr	linqweb@gmail.com	7485968596	fdgrtrtghtt	["sponsorship packages","become a speaker","attending the show"]	2025-07-21 10:21:27.673676	2025-07-21 10:21:27.673707	Admin	Admin	No
2	swdfef	frfrgr	admin@themesbrand.com	7485963200		["become a speaker","sponsorship packages"]	2025-07-21 10:27:30.522728	2025-07-21 10:27:30.522762	Admin	Admin	No
3	afc	bsaa	bcc@bcc.com	9999	sss	["speaker_opportunities","sponsorship_options","attending_the_event"]	2026-01-20 19:20:51.558157	2026-01-20 19:20:51.558534	Admin	Admin	No
4	aaa	bbb	vcc	ggg		["sponsorship_options"]	2026-01-20 19:21:09.768615	2026-01-20 19:21:09.768671	Admin	Admin	No
5	aaa	bbb	ddd		\N		2026-01-21 14:40:23.785632	2026-01-21 14:40:23.785684	Admin	Admin	No
6	aaa	bbb	vvv	ddd			2026-01-21 14:43:13.81642	2026-01-21 14:43:13.816473	Admin	Admin	No
7	aaa	fff	sss	bbb		["speaker_opportunities","sponsorship_options","attending_the_event"]	2026-01-21 14:43:48.645866	2026-01-21 14:43:48.645936	Admin	Admin	No
8	y5ty6	y6u6u	u6u7	uy6u7	6u67ui7	["speaker_opportunities"]	2026-01-21 15:36:22.900001	2026-01-21 15:36:22.900102	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_contactushelpdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_contactushelpdata" (id, "reasonToHelp", "helpingPersonName", "helpingPersonDesignation", "helpingPersonEmail", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Delegate Registrations	Person4	Delegates Support Team	delegates@abcd.com	2025-07-24 14:22:03.944085	2026-04-02 10:35:51.457534	Admin	Admin	No
2	Group Sales Team	Person 1	Group Sales Director	person1@abcd.com	2025-07-24 14:22:58.978398	2026-01-13 11:41:41.277655	Admin	Admin	No
3	Sponsorship & Media Partners	Person 2	Event & Marketing Manager	person2@abcd.com	2025-07-24 14:23:36.240817	2026-01-13 11:41:57.135642	Admin	Admin	No
4	Conference Content & Speaking	Person 3	Conference Producer	person3@abcde.com	2025-07-24 14:24:10.098278	2026-03-30 10:43:56.071252	Admin	Admin	No
5	test4	Name 4 	test designation	test4@iq-hub.com	2026-03-30 10:43:23.001509	2026-03-30 10:44:36.783048	Admin	Admin	Yes
\.


--
-- Data for Name: Myadmin_contactuspagedata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_contactuspagedata" (id, "emailLogo", "sectionTitle", "sectionShortParagraph", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1			"<p>Have questions or need assistance? We're just an email away. Simply click an option below to open an email. Our responsive team is committed to providing answers on everything from event details to registration. We're here to help and excited to hear from you!</p>"	2025-08-13 14:00:47.057875	2026-01-07 09:48:30.95332	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_countsection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_countsection" (id, "countSectionBackgroundImage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_countsectiontopic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_countsectiontopic" (id, "topicLabel", "topicCount", "countIcon", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	INDUSTRY TOPICS	100	true	2025-08-06 09:39:56.508535	2025-08-06 10:14:29.674592	Admin	Admin	No
2	NETWORKING EVENTS	8	true	2025-08-06 09:40:13.217287	2026-01-22 16:02:59.070409	Admin	Admin	No
3	LEADING EXPERTS	50	true	2025-08-06 10:02:01.994704	2025-08-06 10:04:35.003671	Admin	Admin	No
4	Q&A SESSIONS	20	true	2025-08-06 10:04:55.922478	2025-08-06 10:05:01.075145	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_enduserpassregistrationrequestdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_enduserpassregistrationrequestdata" (id, "userName", "userCompany", "userEmail", "userMobile", "userInterest", "noOfAttandees", "userMessage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Tobias Schubert	UTHealth Houston	admin@themesbrand.com	+118974857485	Showcasing at the exhibition	1	\N	2025-08-21 10:37:48.075994	2025-08-21 10:45:32.834055	Admin	Admin	Yes
2	Tobias Schubert	UTHealth Houston	admin@themesbrand.com	+118574857485	Speaking on a topic	1	"gthtyjy"	2025-08-21 10:45:35.696646	2025-08-21 10:45:35.696665	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_footerfirstsectionoptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_footerfirstsectionoptions" (id, "optionName", "optionRedirectPath", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_footeroptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_footeroptions" (id, "footerOptionsName", "footerOptionsPath", "isChecked", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
2	Event Details	/	Yes	2026-04-17 11:00:26.470955	2026-04-17 11:07:52.611389	Admin	Admin	No
3	Speakers	/speakers	Yes	2026-04-17 11:01:01.393623	2026-04-17 11:07:52.614743	Admin	Admin	No
4	Sponsors	/sponsors	Yes	2026-04-17 11:01:22.896209	2026-04-17 11:07:52.616512	Admin	Admin	No
5	Program	/agenda	Yes	2026-04-17 11:01:45.684943	2026-04-17 11:07:52.617782	Admin	Admin	No
6	Benefits	/who-should-attend	Yes	2026-04-17 11:05:34.677929	2026-04-17 11:07:52.618924	Admin	Admin	No
7	Media	/media-partners	Yes	2026-04-17 11:06:06.094076	2026-04-17 11:07:52.619935	Admin	Admin	No
8	Contact Us	/contact-us	Yes	2026-04-17 11:06:28.093353	2026-04-17 11:07:52.620878	Admin	Admin	No
9	FAQ	/faq	Yes	2026-04-17 11:07:50.534823	2026-04-17 11:07:52.621824	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_footersocialmediaoptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_footersocialmediaoptions" (id, created_at, updated_at, created_by, updated_by, "isDelete", "emailLink", "facebookLink", "instagramLink", "linkedinLink", "twitterLink") FROM stdin;
1	2025-09-26 11:41:34.667079	2026-04-02 10:41:00.031445	Admin	Admin	No	abcd@gmail.com	#fb	#	https://www.linkedin.com	#
\.


--
-- Data for Name: Myadmin_generalnewspoint; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_generalnewspoint" (id, "newsTitle", "newsDescription", "newsPageUrl", "newsImage", "newsCreatedDate", created_at, updated_at, created_by, updated_by, "isDelete", "newsCategoryId_id", "newsShortDescription", "isTopNews", "newsImageAltText", "newsMetaDescription", "newsMetaTitle") FROM stdin;
2	Australia's Lithium Industry Gets Its First Emissions Report Card	"<p>peer-reviewed study has given Australia's lithium mining industry its most detailed environmental benchmark to date, identifying diesel consumption as the dominant source of emissions and outlining a clear route to reducing them.</p><p>Published in Resources, Conservation and Recycling in January 2026, the research by Macquarie University's Shamsunnahar Setu and Vladimir Strezov applies Life Cycle Impact Assessment methodology to eight operational spodumene mines in Australia. The analysis delivers facility-level data that moves beyond earlier, broader industry estimates.</p><p>The study puts the average global warming potential at 0.4 kg of CO₂ equivalent per kilogram of spodumene produced. Diesel use across mining and processing fleets accounts for roughly three-quarters of total energy consumption, making it the single largest emissions driver. The authors suggest that electrification of fleets, renewable energy integration, and more efficient fleet management could deliver near-term reductions.</p><p>The research also quantifies particulate emissions and material handling impacts, giving operators data to support targeted interventions such as improved dust suppression, optimised beneficiation processes, and better tailings management.</p><p>The findings carry weight beyond the laboratory. Australia supplies around half of global lithium ore, placing it at the centre of battery supply chains that face growing regulatory scrutiny. The EU Battery Regulation, among other frameworks, is increasing demand for verifiable lifecycle emissions data from producers. Facility-level benchmarks of the kind produced by the Macquarie study are becoming tools of commercial relevance, not merely academic interest.</p><p>Several Australian operators are already advancing solar integration and hybrid energy systems alongside broader Scope 1 and 2 reduction programmes. Standardised data of this kind allows those initiatives to be measured and validated more rigorously, which matters as downstream buyers seek greater assurance about the provenance and environmental profile of the materials they purchase.</p><p>The study is limited to upstream extraction and does not extend to refining or battery manufacturing. Whether the methodology will be applied across the full supply chain remains an open question, as does the pace at which individual operators move to act on its findings.</p>"	\N	https://www.australia.lithium-downstream-summit.com/media/media5-LDZ%20-%20VV%20788%20x%20444.jpg	2026-01-19	2025-08-08 11:32:18.262652	2026-04-17 14:17:42.946513	Admin	Admin	No	8	"<p>Macquarie University study delivers first facility-level emissions baseline for Australian lithium, highlighting clear opportunities for lower-impact production</p>"	No			
3	Kwinana Shows Australia Can Do More Than Dig	"<p>Australia has long been content to dig things up and ship them out. For lithium, that arrangement is changing, if slowly. Covalent Lithium's refinery in Kwinana, south of Perth, achieved first battery-grade lithium hydroxide production in mid-2025, making it the most complete mine-to-refinery lithium operation in the country. Whether it becomes a model for others depends on questions the industry is not yet ready to answer.</p><p>The logic of integration is straightforward. Covalent draws its feedstock from the Mount Holland mine, also in Western Australia, where output was running above 80% of capacity through 2025. By processing its own concentrate rather than buying on the open market, the refinery avoids spodumene price swings and keeps feed quality consistent from ore through to finished product. That matters. Lithium hydroxide for electric vehicle batteries must meet stringent purity standards, and controlling every upstream variable helps. Wesfarmers, which co-owns the operation, said in its February 2026 half-year results that commissioning had been \\"pleasing,\\" with the plant producing material to design specification.</p><p>At full tilt, Kwinana is designed to produce around 50,000 tonnes of battery-grade lithium hydroxide per year, enough for roughly one million electric vehicles. The ramp to that level is expected to take 18 months, with commercial samples already being prepared for customer qualification. Covalent's chief executive, Ross Martelli, noted at first production that the plant was \\"performing as expected during early-stage operations.\\" The Australian government, in its February 2026 Critical Minerals Prospectus, listed Kwinana among four lithium processing projects it considers investment-ready.</p><p>The template is appealing. Integration reduces market exposure, simplifies process control, and positions producers to satisfy the traceability requirements that Western battery supply chains are beginning to enforce. But Kwinana is still ramping. Battery-grade production during commissioning is not the same as sustained, cost-competitive output at nameplate volumes. Global lithium hydroxide prices have been under pressure, and the economics of refining in Australia, with its higher labour and energy costs, remain untested at scale.</p><p>Australia has found a way to make battery-grade hydroxide on its own soil. Whether it can make money doing so is a separate question, and a more interesting one.</p>"	\N	https://www.australia.lithium-downstream-summit.com/media/media7-LDZ%20-%20VV%20788%20x%20444.jpg	2026-02-24	2025-08-08 11:33:28.592243	2026-04-17 14:55:41.617411	Admin	Admin	No	7	"<p>Covalent Lithium's Kwinana refinery proves vertical integration can solve cost and quality challenges in Australian lithium hydroxide production</p>"	Yes			
5	Australia's Lithium Just Got a Direct Line to Europe	"<p>Eight years of negotiation ended on March 24, 2026, when Australia and the European Union signed a sweeping free trade agreement eliminating tariffs on nearly all goods moving between the two economies. For the lithium sector, the payoff is concrete: zero tariffs on critical minerals and lithium hydroxide, the battery-grade refined product that commands a premium over raw spodumene and that European manufacturers have been desperately sourcing from outside China.</p><p>The minerals dimension dominated the deal's final stretch. European Commission President Ursula von der Leyen traveled to Canberra for the signing alongside Trade Commissioner Maros Sefcovic, announcing four joint production projects covering rare earths, lithium, and tungsten. Australia's Austrade confirmed that all tariffs on energy and resource products, including hydrogen carriers, will be fully eliminated. The deal also clears duties on environmental goods, among them solar panel components and lithium batteries, creating an integrated clean energy trade corridor between the two economies.</p><p>For European battery manufacturers and automakers racing to build out cell production, the agreement offers more than a tariff cut. It provides a rules-based framework for long-term supply partnerships with Australian producers, rather than reliance on volatile spot markets. The EU is the world's largest consumer of critical raw materials relative to its domestic capacity, and reducing dependence on Chinese-controlled processing networks is explicit policy. Australia, which accounts for close to half of global lithium ore output, is the obvious counterpart.</p><p>The Minerals Council of Australia noted that tariff elimination strengthens competitiveness and cements open trade with the EU, Australia's second-largest source of foreign investment. Analysts expect European capital flows into Australian mining, downstream processing, and critical minerals projects to increase materially once the deal enters force. That ratification process could take up to two years as the agreement works through EU member states, but the commercial and investment signals are already moving.</p>"	\N	https://www.australia.lithium-downstream-summit.com/media/media10-LDZ%20-%20VV%20788%20x%20444.jpg	2026-03-26	2025-08-08 11:36:26.798286	2026-04-17 15:14:02.395454	Admin	Admin	No	3	"<p>An EU-Australia trade deal scraps tariffs on lithium hydroxide, giving Europe a direct supply route outside China</p>"	No			
6	Lithium, Gallium, and a Very Expensive Friendship	"<p>When the US and Australia signed a bilateral investment framework at the White House last October, it marked something genuinely new: a formal, institutionally backed partnership to develop critical minerals together, with real money attached. The deal commits at least $3 billion in near-term joint financing across a project pipeline valued at up to $8.5 billion, covering everything from project selection to permitting to capital deployment through loans, equity stakes, and offtake-backed financing.</p><p>The financial architecture is substantial. The US Export-Import Bank issued seven letters of interest totaling more than $2.2 billion, expected to catalyze up to $5 billion in total investment across qualifying Australian projects. Early named transactions include a $200 million US equity stake in Alcoa's high-purity gallium refinery in Western Australia and a $100 million commitment to Arafura's Nolans rare earths project in the Northern Territory. Both governments pledged at least $1 billion each within six months of signing, with recoverable resources across the identified pipeline estimated at up to $53 billion.</p><p>The strategic rationale is not subtle. Australia holds 680 resource deposits aligned with the US critical minerals list, and the framework is designed to accelerate those assets into production while reducing dependence on Chinese-controlled processing. A bilateral Critical Minerals Supply Security Response Group, co-led by the US Secretary of Energy and Australia's Minister for Resources, has been established to identify vulnerabilities and coordinate delivery. Both governments have also committed to streamlining permitting timelines, targeting a structural bottleneck that has stalled project bankability for years.</p><p>At the domestic level, the same capital logic applies. Australia's National Reconstruction Fund committed AU$50 million in equity to Liontown, supporting the underground ramp-up at Kathleen Valley in Western Australia, deploying government capital to de-risk a strategic asset and draw in private co-investment. Production is forecast to grow 6 percent in 2026 to roughly 120,300 tonnes of lithium, with compound annual growth of 4.9 percent projected through 2035.</p><p>The combination of allied co-investment, domestic equity deployment, and an accelerating project pipeline is reorienting capital flows into Australian lithium. Speculative exposure is giving way to structured, long-term supply chain investment.</p>"	\N	https://www.australia.lithium-downstream-summit.com/media/media3-LDZ%20-%20VV%20788%20x%20444.jpg	2025-12-08	2025-08-08 11:37:57.647798	2026-04-17 14:12:17.175642	Admin	Admin	No	6	"<p>A US-Australia framework commits $3 billion in near-term joint financing across an $8.5 billion critical minerals project pipeline</p>"	Yes			
9	Tax Cuts, Stockpiles, and a Long Game on Lithium	"<p>Australia has enacted what officials and analysts describe as the most consequential domestic policy intervention in its critical minerals sector in a generation, combining a legislated tax incentive with a new strategic reserve designed to shift the country's lithium industry from raw ore exporter toward onshore chemical processing.</p><p>The centerpiece of the overhaul is the Critical Minerals Production Tax Incentive, legislated under the Future Made in Australia Act, which received Royal Assent in February 2025. The incentive offers eligible processors a 10 percent refundable tax offset against Australian processing and refining costs, running from the 2027-28 financial year through 2039-40, available for up to ten years per qualifying project. To qualify, facilities must carry out substantial chemical transformation of a feedstock, producing outputs such as lithium hydroxide or refined carbonate rather than raw spodumene concentrate. Treasury estimates the policy will support more than 2.5 million tonnes of refined critical mineral output over its lifespan, with cumulative production potentially reaching 10 million tonnes by 2039-40.</p><p>A second pillar, announced in January 2026, is a 1.2 billion Australian dollar Critical Minerals Strategic Reserve. The mechanism is designed to secure domestic production rights and on-sell those rights to allied partners during supply disruptions. Of the total allocation, 1 billion Australian dollars will come from an expanded 5 billion dollar Critical Minerals Facility, with a further 185 million dollars earmarked for selective stockpiling and implementation costs. Initial minerals covered include antimony, gallium, and rare earth elements; lithium is flagged as a priority candidate as the reserve scales toward full operational readiness in the second half of 2026.</p><p>The two instruments serve distinct but complementary purposes. The tax incentive is intended to build sovereign refining capacity by improving the long-term commercial case for processing investment; the reserve is a market intervention mechanism that provides supply security during disruption events.</p><p>Yet the structural challenge both instruments are meant to address has proved persistent. As analysts at the law firm Allens have noted, the cost gap between Australian processors and their Chinese counterparts cannot be closed by market forces alone. Whether sustained fiscal commitment will prove sufficient to bridge that divide, or whether the pace of policy implementation will keep step with rapidly shifting global supply chains, remains to be seen.</p>"	\N	https://www.australia.lithium-downstream-summit.com/media/media4-LDZ%20-%20VV%20788%20x%20444.jpg	2026-01-13	2025-08-08 11:41:53.704215	2026-04-17 14:14:45.842276	Admin	Admin	No	1	"<p>Australia pairs a ten percent refining tax offset with a $1.2 billion strategic reserve to drive domestic lithium processing</p>"	No			
7	Pilbara's Deliberate Playbook Positions It for Lithium's Rebound	"<p>Australia's lithium sector is waking up, and the producers who ran tightest through the downturn are first in line to capitalize. Pilbara Minerals has emerged as the clearest example, posting a materially stronger first half of FY2026 while simultaneously unlocking a sequence of growth options it had held deliberately in reserve.</p><p>The numbers tell a confident story. Revenue climbed 47 percent year-on-year to A$624 million, driven by a 40 percent improvement in realized pricing and a seven percent rise in sales volumes to 446,000 tonnes. The P1000 plant expansion at Pilgangoora added production capacity while pulling costs down across the operation. Total liquidity reached over A$1.6 billion, split between A$954 million in cash and A$625 million in undrawn credit. Managing Director Dale Henderson called the results validation of a strategy built on operational discipline, now converting into earnings as conditions improve.</p><p>The most immediate move is the board-approved restart of the Ngungaju processing facility, which had been held in care and maintenance as a deliberate capital preservation call. The 200,000-tonne-per-annum plant is set to resume production in July 2026, backed by customer contracts and funded within existing FY26 capital guidance. Pilbara chose to preserve the asset rather than decommission it, and that decision is now paying off.</p><p>Longer-range ambitions are also taking shape. A P2000 feasibility study is targeting an expansion of Pilgangoora to roughly 2 million tonnes per annum, with results expected in the December quarter of 2026. Separately, the Colina lithium project in Brazil, acquired through the Latin Resources transaction, is moving toward a feasibility study due in late 2027. Both remain subject to final investment decisions.</p><p>The pattern is deliberate: capital preserved during the trough, assets kept intact, and growth options staged to deploy as the market turns. Pilbara Minerals didn't just survive the downturn. It used it.</p>"	\N	https://www.australia.lithium-downstream-summit.com/media/media6-LDZ%20-%20VV%20788%20x%20444.jpg	2026-02-20	2025-08-08 11:39:11.063952	2026-04-17 14:53:44.947775	Admin	Admin	No	5	"<p>Pilbara Minerals' cost discipline, strong balance sheet, and sequenced growth pipeline put it at the front of Australia's lithium recovery</p>"	No			
8	Kiln It Softly: The Electric Upgrade Lithium Needed	"<p>Electric kiln nears test in lithium's carbon push</p><p>An electric calciner in Western Australia could transform battery supply chains, with licensing rights extending globally. Construction is complete on what is claimed to be the world's first electric spodumene calciner, built at the Pilgangoora lithium operation in Western Australia. The project, a joint venture between Pilbara Minerals and Calix, replaces coal-fired rotary kilns with an electrically powered system designed to run on renewable energy. Commissioning is under way following a construction milestone reached in February 2026.</p><p>Spodumene calcination, a heat-intensive process that converts lithium ore into a usable intermediate form, has long been one of the most carbon-heavy steps in battery material production. Life cycle assessments indicate the new process can cut emissions from that step by more than 80 per cent against coal-fired alternatives.</p><p>The commercial logic is direct. European battery manufacturers and automakers now face binding rules on supply chain carbon reporting, and upstream suppliers without low-emissions credentials face pricing pressure and restricted market access in key Western markets.</p><p>The plant is engineered to produce more than 3,000 tonnes per year of lithium phosphate salt, a higher-value intermediate than conventional output, while also reducing waste volumes requiring off-site disposal.</p><p>In February 2026, Pilbara Minerals acquired full ownership of the demonstration plant from Calix for A$11.4 million. Calix retains the intellectual property and continues providing technical support. Both parties retain independent rights to license the technology to third parties across the global primary lithium market, a provision that extends the project's commercial reach well beyond a single site. Hard-rock calcination is a core processing step across emerging lithium operations in the United States, Canada, and Europe.</p><p>The project has drawn A$35 million in combined government funding: A$20 million from the Australian federal government and A$15 million from Western Australia, reflecting a judgment that the technology's relevance extends across the industry rather than to a single operator.</p><p>Whether commissioning confirms the economics at commercial scale remains the open question. The answer will determine whether the electric calciner becomes a replicable standard or remains a well-funded proof of concept.</p>"	\N	https://www.australia.lithium-downstream-summit.com/media/media8-LDZ%20-%20VV%20788%20x%20444.jpg	2026-02-28	2025-08-08 11:40:34.295925	2026-04-17 15:02:27.645063	Admin	Admin	No	7	"<p>The world's first electric spodumene calciner is built and nearing commissioning, promising to cut lithium refining emissions by over 80 percent</p>"	No			
10	Australia Stopped Waiting for Cars to Save Its Lithium	"<p>For a country that digs up more lithium than almost anywhere else, Australia has long been hostage to a single customer: the electric vehicle. That dependence cost it dearly when EV demand softened and spodumene prices collapsed from their 2022 peaks. The solution, it turns out, may have been sitting in Australia's own backyard.</p><p>In 2025, Australia overtook Britain to become the third-largest market for utility-scale battery energy storage systems (BESS), behind only China and the United States. It now holds more such capacity per head than any other nation, according to Rystad Energy. The numbers are striking. Over AUD 2.4 billion was committed to large-scale battery projects in the first quarter of 2025 alone, the second-highest quarterly total on record, per the Clean Energy Council. The national development pipeline expanded from 109 gigawatts in mid-2024 to 154 gigawatts a year later. In August 2025, Akaysha Energy commissioned the first stage of the Waratah Super Battery in New South Wales, an 850-megawatt facility described as the largest of its kind in the world.</p><p>The knock-on effects for lithium have been considerable. BESS demand rose roughly 75% year-on-year in 2025 and is now on course to represent around a fifth of total global battery demand, according to analysts at Argonaut. Combined with supply discipline from producers who had shuttered costly capacity during the downturn, this helped drive spodumene concentrate prices from below $600 per tonne in mid-2025 to above $2,000 per tonne by early 2026. Globally, BESS installations topped 300 gigawatt-hours last year, a 51% increase, according to Benchmark Mineral Intelligence.</p><p>The structural case is persuasive. Grid operators and utilities are treating battery storage as core infrastructure rather than a supplementary service, broadening the lithium demand base in ways that were not foreseeable even five years ago. Australia's miners now face something unfamiliar: a second, domestically anchored source of demand growing independently of car sales in Shenzhen or Stuttgart.</p><p>Whether it holds is another matter. Supply tends to follow price, and a sustained rally above $2,000 per tonne will tempt mothballed producers back into the market. The lithium sector has been here before, mistaking a cyclical reprieve for a structural cure.</p><p>&nbsp;</p><p>&nbsp;</p>"	\N	https://www.australia.lithium-downstream-summit.com/media/media1-LDZ%20-%20VV%20788%20x%20444.jpg	2025-11-04	2025-08-08 11:43:17.424591	2026-04-17 13:52:55.38751	Admin	Admin	No	2	"<p>Australia is now the world's third-largest BESS market, and lithium demand is better for it</p>"	No			
11	Korea Shops Down Under for Its Battery Future	"<p>Mineral Resources and POSCO Holdings have signed a binding joint venture agreement covering the Wodgina and Mt Marion hard-rock lithium mines in Western Australia, with the South Korean conglomerate paying US$765 million for a 30 percent stake in the new entity. Mineral Resources retains a 70 percent majority and continues as operator of both sites.</p><p>The deal grants POSCO proportional access to spodumene concentrate, the raw feedstock for battery-grade lithium chemicals, feeding its processing operations in Korea and elsewhere. Mineral Resources chair Malcolm Bundey called it the first major Korean company investment into Australian hard-rock lithium, describing it as a milestone in bilateral critical minerals cooperation.</p><p>The implied valuation of Mineral Resources' combined 50 percent ownership across both mines stands at roughly US$3.9 billion, a signal of institutional confidence in Australian spodumene assets despite weak near-term prices.</p><p>For Mineral Resources, the proceeds are earmarked for debt reduction. Net debt is projected to fall from approximately A$5.4 billion to around A$3.7 billion by end of 2026, restoring financial headroom at a time when the company has faced significant balance sheet pressure.</p><p>POSCO Holdings' rationale is strategic as much as financial. The transaction extends a raw material security programme spanning hard-rock assets in Australia and brine operations in South America, reducing reliance on spot market purchases. POSCO Holdings chief executive In Hwa Chang described the partnership as combining both companies' capabilities to drive sustainable growth in the energy materials industry, a business line the group has positioned alongside its core steel operations as a primary growth driver.</p><p>The joint venture builds on an existing relationship between the two companies through the Onslow Iron project in Western Australia.</p><p>Completion is subject to final documentation and Foreign Investment Review Board approval, with closing expected in the first half of 2026. Whether the structure becomes a template for other allied-nation equity arrangements in Australia's critical minerals sector will depend in part on how the regulatory and pricing environment evolves over that period.</p>"	\N	https://www.australia.lithium-downstream-summit.com/media/media2-LDZ%20-%20VV%20788%20x%20444.jpg	2025-11-14	2025-08-08 11:44:37.352533	2026-04-17 13:55:19.347402	Admin	Admin	No	3	"<p>MinRes and POSCO's $765M joint venture across two WA lithium mines marks the first major Korean equity stake in Australian hard-rock lithium</p>"	No			
4	Covalent Cracks the Code on Downstream Lithium	"<p>Australia has long been the world's top lithium producer. It has also long watched the real money get made elsewhere. That gap is narrowing.</p><p>In mid-2025, Covalent Lithium confirmed first production of battery-grade lithium hydroxide at its Kwinana refinery in Western Australia, a milestone that shifted one of the country's most complex industrial projects from construction phase into live commissioning. For the first time at commercial scale, Australia's integrated mine-to-refinery model was running for real.</p><p>The Kwinana plant is designed to produce around 50,000 tonnes of battery-grade lithium hydroxide annually, enough to supply batteries for roughly one million electric vehicles. It draws spodumene concentrate from Covalent's own Mount Holland mine, which ran above 80 percent of capacity through 2025. That vertical integration isn't just a supply chain convenience. By controlling feedstock quality from ore to output, Covalent runs continuous process monitoring across the full conversion chain, tracking trace elements like iron, calcium, and magnesium through calcination, leaching, impurity removal, and crystallization. Battery manufacturers set punishing purity standards, and meeting them starts long before the refinery.</p><p>Wesfarmers, Covalent's parent company, described commissioning performance in its February 2026 half-year results as pleasing, with the plant producing hydroxide that meets design specifications. The ramp-up timeline was extended modestly to address intermittent operational issues, while surplus concentrate is sold into the spot market during the transition, a buffer that vertical integration makes possible.</p><p>Kwinana is one of three lithium hydroxide facilities now operating along Western Australia's industrial corridor, alongside the Tianqi Lithium Energy Australia plant and the recently idled Albemarle Kemerton facility. With an 18-month schedule to reach full capacity, Covalent's operation is the most significant live test of Australia's downstream processing ambitions to date. Policymakers and investors have placed a substantial bet on the integrated mine-to-hydroxide model as the country's path to capturing more value from its resources. Kwinana is where that bet gets scored.</p>"	\N	https://www.australia.lithium-downstream-summit.com/media/media9-LDZ%20-%20VV%20788%20x%20444.jpg	2026-03-06	2025-08-08 11:34:58.78327	2026-04-17 15:12:19.255005	Admin	Admin	No	4	"<p>Covalent Lithium's Kwinana refinery has produced its first battery-grade lithium hydroxide, putting Australia's mine-to-market model to the test</p>"	Yes			
\.


--
-- Data for Name: Myadmin_homepagenavlogodata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_homepagenavlogodata" (id, "whiteLogoLink", "blackLogoLink", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
2	https://www.australia.lithium-downstream-summit.com/media/mediaLogo-w-2.png	https://www.australia.lithium-downstream-summit.com/media/mediaLogo-b-2.png	2025-09-24 06:38:27.078716	2026-04-22 11:06:31.665328	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_homepagenavmaincategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_homepagenavmaincategories" (id, "navMainCategoryName", "navMainCategoryPath", created_at, updated_at, created_by, updated_by, "isDelete", "isChecked") FROM stdin;
1	EVENT DETAILS	/booking	2025-05-14 13:05:15.551736	2026-04-09 10:31:26.405313	No	Admin	No	Yes
2	SPEAKERS	/speakers	2025-05-14 13:05:35.82156	2026-04-09 10:31:26.431938	No	Admin	No	Yes
3	SPONSORS	/sponsors	2025-09-19 10:54:27.115352	2026-04-09 10:31:26.456743	Admin	Admin	No	Yes
4	VENUE	/venue	2025-09-19 10:55:31.81105	2026-04-09 10:31:26.482276	Admin	Admin	No	Yes
5	RESOURCES	/news	2025-09-19 11:17:44.131309	2026-04-09 10:31:26.506357	Admin	Admin	No	Yes
6	CONTACT US	/contact-us	2025-09-19 11:18:15.257532	2026-04-09 10:31:26.534643	Admin	Admin	No	Yes
7	test	/test	2026-03-30 11:05:50.559101	2026-03-30 11:06:04.330358	Admin	Admin	Yes	No
\.


--
-- Data for Name: Myadmin_homepagenavsubcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_homepagenavsubcategories" (id, "navSubCategoryName", "navSubCategoryPath", created_at, updated_at, created_by, updated_by, "isDelete", "navMainCategoryId_id", "isChecked") FROM stdin;
1	Register & Book Now	/booking	2025-09-22 08:28:56.897641	2026-04-09 10:31:26.563631	Admin	Admin	No	1	Yes
2	Program 2026	/agenda	2025-09-22 08:29:43.07087	2026-04-09 10:31:26.592438	Admin	Admin	No	1	Yes
3	Who Should Attend	/who-should-attend	2025-09-22 08:30:13.776642	2026-04-09 10:31:26.616326	Admin	Admin	No	1	Yes
4	Call For Presentations	/speakers	2025-09-22 08:31:00.25508	2026-04-09 10:31:26.641444	Admin	Admin	No	2	Yes
5	Featured Speakers	/featured-speakers	2025-09-22 08:31:36.622789	2026-04-09 10:31:26.670215	Admin	Admin	No	2	Yes
6	Latest News	/news	2025-09-22 08:32:17.926245	2026-04-09 10:31:26.694935	Admin	Admin	No	5	Yes
7	Media Partners	/media-partners	2025-09-22 08:39:03.069507	2026-04-09 10:31:26.721572	Admin	Admin	No	5	Yes
8	FAQ	/faq	2025-09-22 08:39:31.238602	2026-04-09 10:31:26.748477	Admin	Admin	No	5	Yes
\.


--
-- Data for Name: Myadmin_homepagethirdsection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_homepagethirdsection" (id, "thirdSectionFirstTitle", "thirdSectionSecondTitle", "thirdSectionDescription", "thirdSectionVideoLink", "thirdSectionBackgroundImage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	THE PREMIER STRATEGIC SUMMIT ON LITHIUM REFINING, BANKABILITY, AND ALLIED SUPPLY CHAINS	\N	"<p>Welcome to the Lithium Downstream Summit, where policymakers, industry leaders, and investors come together to address the commercial and policy challenges shaping the next phase of lithium processing and the global battery value chain.&nbsp;</p><p>The industry faces rising capital costs, price volatility, and refining capacity concentrated in a few regions. Governments and OEMs are seeking secure, compliant supply chains, while investors demand stable returns. The summit will examine financing models, cross-border cooperation, and long-term offtake strategies to support new refining capacity.&nbsp;</p><p>Join us to gain practical insights, strengthen partnerships, and identify viable pathways for building resilient lithium refining and battery supply chains.</p>"		https://www.australia.lithium-downstream-summit.com/media/mediaLayer%201.png	2025-07-23 12:23:03.317492	2026-04-17 08:42:07.881934	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_homepagevideosectioninput; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_homepagevideosectioninput" (id, "eventDetailBackImage", created_at, updated_at, created_by, updated_by, "isDelete", "videoLinkmp4", "videoLinkwebm", "eventExpertSpeakerBackImage", "eventStataticsBackImage", "videoReplaceImage") FROM stdin;
2	https://www.australia.lithium-downstream-summit.com/media/mediaGroup%203382.png	2025-09-24 06:38:27.161965	2026-04-22 11:06:31.666818	Admin	Admin	No	https://www.australia.lithium-downstream-summit.com/media/mediaLDZ-26%20Event%20Video%20(2)%20(1).mp4	https://www.australia.lithium-downstream-summit.com/media/mediaLDZ-26%20Event%20Video%20(2)%20(1).webm	https://www.australia.lithium-downstream-summit.com/media/mediaLayer%203_L7V5YSz.png	https://www.australia.lithium-downstream-summit.com/media/mediaPattern.png	https://www.australia.lithium-downstream-summit.com/media/mediaScreenshot%202026-04-22%20163431-Picsart-AiImageEnhancer.png
\.


--
-- Data for Name: Myadmin_keypointssection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_keypointssection" (id, "keyPointSectionLabel", "keyPointSectionButtonLabel", "keyPointSectionButtonRedirectPath", "isKeyPointSectionButtonEnable", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_keypointssectionpoints; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_keypointssectionpoints" (id, "pointLabel", "pointDescription", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
6	Outlook on global lithium demand growth and downstream capacity expansion	"<p>Analyse market dynamics shaping lithium supply chains and evaluate capacity gaps affecting the expansion of allied refining capacity.</p>"	2025-07-18 12:11:09.335982	2026-04-17 10:28:08.549895	Admin	Admin	No
5	Advancing financing pathways and capital risk mitigation strategies	"<p>Examine funding frameworks, credit enhancement tools, and blended finance solutions supporting large-scale investment.</p>"	2025-07-18 12:10:50.920114	2026-04-17 10:28:28.733686	Admin	Admin	No
4	Managing energy transition challenges in low-carbon lithium processing	"<p>Learn about power costs, infrastructure readiness, and renewable integration in energy-intensive operations.</p>"	2025-07-18 12:10:35.639773	2026-04-17 10:29:02.213937	Admin	Admin	No
3	Cost dynamics and their impact on competitiveness in lithium refining	"<p>Assess operating costs, scale constraints, and structural pressures shaping the competitiveness of projects in allied lithium markets.</p>"	2025-07-18 12:10:17.119246	2026-04-17 10:29:31.392803	Admin	Admin	No
2	Strengthening long-term offtake frameworks to enhance revenue certainty	"<p>Review contract structures and pricing frameworks that strengthen certainty and enhance project bankability.</p>"	2025-07-18 12:10:00.727777	2026-04-17 10:29:56.152319	Admin	Admin	No
1	Harmonising regulatory standards across allied lithium markets globally	"<p>Explore coordinated incentives, regulatory alignment, and cross-border collaboration to accelerate diversified lithium supply chains.</p>"	2025-07-18 12:09:42.633487	2026-04-17 10:30:18.336791	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_latestnews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_latestnews" (id, created_at, updated_at, created_by, updated_by, "isDelete", "generalNewsPointId_id", "newsCategoryId_id") FROM stdin;
\.


--
-- Data for Name: Myadmin_mediapagehelpers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_mediapagehelpers" (id, "companyPersonName", "companyPersonEmail", "companyPersonPhone", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Vince Roja	vince.rojas@iq-hub.com	+1 206 582 0128	2025-08-15 12:50:02.883306	2026-04-17 13:05:28.763923	Admin	Admin	No
2	Sean Collins	sean.collins@iq-hub.com	+1 206 582 0128	2025-08-15 12:50:36.618827	2026-04-17 13:06:21.869776	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_newscategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_newscategory" (id, "categoryName", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	REGULATORY	2025-08-07 12:22:03.921738	2026-01-22 16:06:24.776036	Admin	Admin	No
2	MARKET TRENDS	2025-08-07 13:35:13.743714	2026-01-22 16:06:09.863984	Admin	Admin	No
3	PARTNERSHIPS	2025-08-07 13:36:38.282424	2026-01-22 16:05:57.106976	Admin	Admin	No
4	TECHNOLOGY	2025-08-07 13:36:50.522037	2026-01-22 16:05:46.280775	Admin	Admin	No
5	INSIGHTS	2025-08-07 13:37:02.546119	2026-01-22 16:05:33.74334	Admin	Admin	No
6	INVESTMENT	2025-08-07 13:38:46.930299	2026-01-22 16:05:24.710797	Admin	Admin	No
7	INNOVATION	2025-08-07 13:39:08.818022	2026-01-22 16:05:11.57228	Admin	Admin	No
8	RESEARCH	2025-08-07 13:39:17.201838	2026-01-22 16:05:01.046242	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_pastattandeehomedata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_pastattandeehomedata" (id, "attandeeName", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Amira Global	2025-08-21 11:56:57.891882	2026-04-17 10:39:56.316568	Admin	Admin	No
2	Sedgman	2025-08-21 11:57:08.233845	2026-04-17 10:40:09.055169	Admin	Admin	No
3	Futureproof	2025-08-21 11:57:20.602991	2026-04-17 10:40:18.710576	Admin	Admin	No
4	Hatch Ltd	2025-08-21 11:57:29.491042	2026-04-17 10:40:27.598955	Admin	Admin	No
5	NEUMAN & ESSER	2025-08-21 11:57:37.123026	2026-04-17 10:40:37.070405	Admin	Admin	No
6	Liberate Minerals	2025-08-21 11:57:47.31539	2026-04-17 10:40:55.378917	Admin	Admin	No
7	Austmine Limited	2025-08-21 11:57:56.33076	2026-04-17 10:41:04.308184	Admin	Admin	No
8	NMS Industries	2025-08-21 11:58:04.875661	2026-04-17 10:41:15.34186	Admin	Admin	No
9	Global Lithium Resources	2025-08-21 11:58:13.482773	2026-04-17 10:41:25.476207	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_pastattandeessection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_pastattandeessection" (id, "pastAttandeesSectionackgroundImage", "firstSectionLabel", "firstSectionBottomLabel", "firstSectionBottomIcon", "firstSectionBottomRedirectPath", "secondSectionLabel", "secondSectionBottomLabel", "secondSectionBottomIcon", "secondSectionBottomRedirectPath", "thirdSectionImage", "thirdSectionButtonLabel", "thirdSectionButtonRedirectPath", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_pressmediapageboxdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_pressmediapageboxdata" (id, "boxTitle", "boxDescription", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_pressmediapagedata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_pressmediapagedata" (id, "pressMediaPageTitle", "pressMediaPageDescription", "pressMediaPageSecondTitle", "pressMediaPageSecondSectionImage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_quickproposalrequestdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_quickproposalrequestdata" (id, "requesterName", "requesterCompanyName", "proposedTitle", "requesterEmail", "requesterMessage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Nolan Powell	IQ_HUB	quick proposal	linqweb@gmail.com	"quick proposal"	2025-08-20 12:20:37.661677	2025-08-20 12:20:37.661716	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_registerpagesettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_registerpagesettings" (id, "sectionFirstTitle", "sectionFirstPackageTitle", "sectionFirstPackageDescription", "groupPassSectionTilte", "groupPassSectionButtonTitle", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_sidebarmodule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_sidebarmodule" (id, name, icon, "order", "isDelete") FROM stdin;
1	Dashboards	ri-dashboard-2-line	1	No
2	Modules	ri-apps-2-line	2	No
3	Page Content	ri-apps-2-line	3	No
4	Form Responses	ri-apps-2-line	4	No
5	Permissions	ri-lock-password-line	5	No
\.


--
-- Data for Name: Myadmin_sidebarsubmodule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_sidebarsubmodule" (id, name, link, id_attr, "order", "isDelete", module_id) FROM stdin;
1	Event Speakers	/eventspeakers	eventSpeakers	0	No	2
2	Event Sponsors	/eventsponsors	eventSponsors	0	No	2
3	Event Key Topics	/eventkeytopics	eventKeyPoints	0	No	2
4	Event Testimonials	/eventtestimonials	eventtestimonials	0	No	2
5	Industry Trends	/industrytrends	industrytrends	0	No	2
6	Related Events	/relatedevents	relatedevents	0	No	2
7	Contact Us Persons	/contactusperson	contactPersons	0	No	2
8	Event Past Attendees	/eventpastattandees	eventpastattandees	0	No	2
9	Delegate Packages	/delegatepackages	eventdelpackages	0	No	2
10	Sponsor Packages	/sponsorpackages	eventSpopackages	0	No	2
11	Event Statistics	/eventstatatics	eventStatatics	0	No	2
12	Event Slider Logos	/sliderlogos	logoSlider	0	No	2
13	Event News Categories	/newscategories	newsCategories	0	No	2
14	Event News	/news	news	0	No	2
15	Event Faqs	/faqs	faqs	0	No	2
16	Event Core Attendees	/coreattandees	coreAttandees	0	No	2
17	Event Participated Industries	/industries	industries	0	No	2
18	Event Expert Speakers	/expertspeakers	expertSpeakers	0	No	2
19	Event Leaders/Operators	/eventleaders	eventLeaders	0	No	2
20	Event Offer Coupons	/offercoupons	offerCoupons	0	No	2
21	Navbar Main Categories	/navmaincategories	navMainCategories	0	No	2
22	Navbar Sub Categories	/navsubcategories	navSubCategories	0	No	2
23	Event Tagline	/taglinecontent	eventTagline	0	No	3
24	Venue	/venuecontent	venuePageData	0	No	3
25	Who Should Attend	/whoshouldattend	WhoShouldAttendPageData	0	No	3
26	Speaker Page Data	/speakerpagecontent	speakerPageData	0	No	3
27	Contact Us Page	/contactuspagecontent	contactUsPageData	0	No	3
28	Media Page	/mediapagecompanypersons	mediaPageData	0	No	3
29	Sponsor Page	/sponsorpagecontent	sponsorPageData	0	No	3
30	Home Page Past Attendees	/homepastattandees	homePastAttandeeData	0	No	3
31	Delegate Add Ons	/delegateaddons	delegateAddOns	0	No	3
32	Sponsor Add On Types	/sponsoraddontypes	sponsorAddOnTypes	0	No	3
33	Sponsor Add Ons	/sponsoraddons	sponsorAddOns	0	No	3
34	Agenda List	/agendalist	agendaList	0	No	3
35	Event Data	/eventdata	eventData	0	No	3
36	Social Media Links	/socialmediadata	socialMediaData	0	No	3
37	Contact Us Response	/contactusrespone	contactusresponse	0	No	4
38	Event Subscribers	/eventsubscribers	eventsubscribers	0	No	4
39	Stand Out From The Crowd Response	/standoutcrowdresponse	eventCrowdResponse	0	No	4
40	Become a Speaker Response	/becomespeakerresponse	becomeSpeakerResponse	0	No	4
41	Quick Proposal Response	/quickproposalresponse	quickProposalResponse	0	No	4
42	End User Pass Registration Response	/userpassregistrationrequests	userPassRegistration	0	No	4
43	Joined Companies	/joinedcompanies	joinedCompanies	0	No	4
44	Joined Delegates	/joineddelegates	joinedDelegates	0	No	4
45	Company Transections	/companytransections	companyTransections	0	No	4
46	Joined Sponsors	/joinedsponsors	joinedSponsors	0	No	4
47	Joined Sponsor Delegates	/joinedsponsordelegates	joinedSponsorDelegates	0	No	4
48	Sponsor Transections	/sponsortransections	sponsorTransections	0	No	4
49	User Management	/apps-permissions	userManagement	0	No	5
50	Role Management	/apps-roles	roleManagement	0	No	5
51	Slide Shares	/eventslideshares	slideshares	0	No	2
52	Slide Share Attandees	/eventslideshareattandees	eventslideshareattandees	0	No	2
53	Slide Share Accessors	/eventslideshareaccessors	eventslideshareaccessors	0	No	2
54	Pay Online Requests	/payonlineresponse	payonlinerequest	0	No	4
55	Blocked Domains	/blockdomains	blockdomain	0	No	2
56	Navigation	/navtree	navigation	0	No	2
57	Footer Navigation	/footernavigation	footerNavigation	0	No	2
58	Agenda Subscribers	/agendasubscribers	agendasubscribers	0	No	2
59	Calender Subscribers	/calendersubscribers	calendersubscribers	0	No	2
60	Sponsor Offer Coupons	/sponsoroffercoupons	sponsoroffercoupons	0	No	2
61	Event Projects	/eventprojects	eventprojects	0	No	2
62	Meta Data	/pageseo	pageseo	0	No	2
63	To Emails	/toemails	toemails	0	No	2
\.


--
-- Data for Name: Myadmin_speakerpagedata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_speakerpagedata" (id, "sectionFirstTitle", "sectionFirstDescription", "sectionFirstButtonLabel", "sectionFirstButtonRedirectPath", "sectionFirstLeftImage", "sectionSecondTitle", "sectionSecondDescription", "sectionSecondButtonLabel", "sectionSecondButtonRedirectPath", "sectionSecondRightImage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1		"<p>The Lithium Downstream Summit is seeking presentations focused on the following key topics:</p><ul><li>Outlook on global lithium demand growth and downstream capacity expansion</li><li>Cost dynamics and their impact on competitiveness in lithium refining</li><li>Advancing financing pathways and capital risk mitigation strategies</li><li>Strengthening long-term offtake frameworks to enhance revenue certainty</li><li>Managing energy transition challenges in low-carbon lithium processing</li><li>Harmonising regulatory standards across allied lithium markets globally</li></ul><p>Lithium Downstream Summit provides a clear platform to strengthen the commercial foundations of allied lithium refining, unlock sustainable investment models, and accelerate resilient battery supply chains in an increasingly competitive global landscape.</p>"					"<p>Lithium Downstream Summit provides a platform for policymakers, industry leaders, and capital providers to exchange insights, address refining economics, and advance commercially viable pathways for downstream development. The programme will explore financing models, offtake structures, energy integration, and international coordination that shape diversified supply networks.</p><p>Engage with senior decision-makers, elevate your institutional presence, and contribute to shaping the next phase of competitive lithium value chains.</p>"				2025-08-13 09:23:48.745098	2026-04-17 12:42:21.999361	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_speakerpagesectionthreepoints; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_speakerpagesectionthreepoints" (id, "pointTitle", "pointDescription", "pointIcon", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_speakersection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_speakersection" (id, "speakerSectionFirstTitle", "speakerSectionSecondTitle", "speakerSectionButtonTitle", "speakerSectionButtonIcon", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_sponsorpackagepagedata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_sponsorpackagepagedata" (id, "firstSectionLeftImage", "firstSectionButtonTitle", "secondSectionTitle", "secondSectionShortPara", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_sponsorpagebulletdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_sponsorpagebulletdata" (id, "pointIcon", "pointShortDescription", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_sponsorpagedata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_sponsorpagedata" (id, "introParaHeading", "introParaDescription", "introParaButtonLabel", "introParaButtonRedirectPath", "exhibitSectionTitle", "exhibitSectionFirstBoxTitle", "exhibitSectionFirstBoxShortDescription", "exhibitSectionFirstBoxPoints", "exhibitSectionSecondBoxTitle", "exhibitSectionSecondBoxShortDescription", "exhibitSectionSecondBoxPoints", "exhibitSectionThirdBoxTitle", "exhibitSectionThirdBoxShortDescription", "exhibitSectionThirdBoxPoints", created_at, updated_at, created_by, updated_by, "isDelete", "introParaImage") FROM stdin;
1		"<p>Lithium Downstream Summit brings together senior leaders shaping the commercial future of lithium conversion and diversified supply networks. Participating organisations will have the opportunity to highlight advisory capabilities, funding solutions, infrastructure expertise, and technical services that support downstream advancement.&nbsp;</p><p>We offer sponsorship and partnership packages that position your organisation directly before influential stakeholders responsible for investment decisions, industrial development, and cross-border collaboration.</p>"					\N	\N		\N	\N		\N	\N	2025-08-15 14:20:12.432731	2026-04-17 15:43:37.232479	Admin	Admin	No	
\.


--
-- Data for Name: Myadmin_sponsorsection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_sponsorsection" (id, "sponsorSectionLabel", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_standoutcrowdrequestdata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_standoutcrowdrequestdata" (id, "requesterName", "requesterCompanyName", "requesterMobile", "requesterEmail", "requesterMessage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	fegrgre	swdefgr	fefgre	frgr@hgjy.com	"fefger"	2025-08-19 11:18:07.453462	2025-08-19 11:18:07.453495	Admin	Admin	No
2	Nolan Powell	IQhub	7485968596	linqweb@gmail.com	"stand out from the crowd"	2025-08-19 11:44:47.298374	2025-08-19 11:44:47.298413	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_subscribers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_subscribers" (id, "subscriberName", "subscriberEmail", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	Sam Razura	sam123@gmail.com	2025-07-19 08:06:02.580146	2025-07-19 08:06:02.580188	Admin	Admin	No
2	Benny Scott	admin@themesbrand.com	2025-07-19 08:07:02.037824	2025-07-19 08:07:35.948398	Admin	Admin	No
3	Benny	benny.scott@iq-hub.com	2025-07-19 08:14:42.933632	2025-07-19 08:14:42.933659	Admin	Admin	No
4	aaf	asd	2026-01-21 14:18:00.108039	2026-01-21 14:18:00.108097	Admin	Admin	No
5	asdf	test	2026-01-21 14:18:33.619158	2026-01-21 14:18:33.619217	Admin	Admin	No
6	asdf	asdf	2026-01-21 14:18:50.568364	2026-01-21 14:18:50.5684	Admin	Admin	No
7	aaa	bbb	2026-01-21 14:19:11.189312	2026-01-21 14:19:11.189422	Admin	Admin	No
8	Elena Nikonova	admin@test.com	2026-01-26 11:35:31.111376	2026-01-26 11:35:31.111429	Admin	Admin	No
9	rgrhrr	rfgghthgt@uu.com	2026-01-26 11:36:07.312925	2026-01-26 11:36:16.638602	Admin	Admin	Yes
10	yjyy	htjtt	2026-01-26 11:36:46.896965	2026-01-26 11:40:32.083389	Admin	Admin	Yes
11	Benny Scott	benny.scott@iq-hub.com	2026-01-27 11:05:21.352532	2026-01-27 11:05:21.352593	Admin	Admin	No
12	Benny Scott	benny.scott@iq-hub.com	2026-01-27 11:05:45.49269	2026-01-27 11:05:45.492743	Admin	Admin	No
13	Amgad A. Elgowainy	test@gamil.com	2026-03-04 21:25:50.7655	2026-03-04 21:25:50.765543	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_testimonialsection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_testimonialsection" (id, "testimonialSectionLabel", "testimonialLogo", "firstTestimonialFirstImage", "firstTestimonialSecondImage", "secondTestimonialRightFirstImage", "secondTestimonialRightSecondImage", "secondTestimonialLeftFirstImage", "secondTestimonialLeftSecondImage", "lastTestimonialFirstImage", "lastTestimonialSecondImage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
\.


--
-- Data for Name: Myadmin_themecolorsettings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_themecolorsettings" (id, "primaryColor", "secondaryColor", "lightColor", "darkColor", "gradientColor", created_at, updated_at, created_by, updated_by, "isDelete", "editorStyle", "headerContent", "headerType") FROM stdin;
2	#278dff	#0f0f0f		#2177d8	linear-gradient(107deg, rgba(0, 0, 0, 0.60) -2.13%, rgba(0, 0, 0, 0.60) 35.42%, rgba(39, 141, 255, 0.60) 77.97%, rgba(39, 141, 255, 0.60) 125.13%)	2025-09-24 06:38:27.228102	2026-04-22 11:06:31.668199	Admin	Admin	No	body .home-banner-container .innerContainer .upper .graphic .text div>span sup,\r\nbody .home-banner-container .innerContainer .upper .graphic .text div>span {\r\n    color: #288dff;\r\n}\r\nbody .home-banner-container .innerContainer .upper .graphic .text h1 {\r\n    color: #ffffff\r\n}\r\nbody .home-banner-container .innerContainer .upper .graphic .text:before {\r\n    top: -105px;\r\n    left: -115px;\r\n}\r\n@media only screen and (max-width: 1460px) {\r\n    body .home-banner-container .innerContainer .upper .graphic .text:before {\r\n        top: -56px;\r\n        left: -50px;\r\n    }\r\n}\r\n@media only screen and (max-width: 1023px) {\r\n    body .home-banner-container .innerContainer .upper .graphic .text div>span {\r\n        line-height: 1em;\r\n    }\r\n        body .home-banner-container .innerContainer .upper .graphic .text:before {\r\n        top: -78px;\r\n        left: -48px;\r\n    }\r\n}\r\n@media only screen and (max-width: 768px) {\r\n      body .home-banner-container .innerContainer .upper .graphic .text:before {\r\n        top: -46px;\r\n        left: -67px;\r\n    }\r\n}\r\n@media only screen and (max-width: 650px) {\r\n    body .home-banner-container .innerContainer .upper .graphic .text:before {\r\n        top: -52px;\r\n        left: -67px;\r\n    }\r\n}\r\n@media only screen and (max-width: 517px) {\r\n    body .home-banner-container .innerContainer .upper .graphic .text h1 {\r\n        max-width: 256px;\r\n    }\r\n    body .home-banner-container .innerContainer .upper .graphic .text:before {\r\n        top: -47px;\r\n    }\r\n}	<span>Lithium Downstream</span>&nbsp; <br>Summit 2026	Video
\.


--
-- Data for Name: Myadmin_toemails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_toemails" (id, toemails, created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1	sam.razura@iq-hub.com,benny.scott@iq-hub.com,parker.simpson@iq-hub.com	2026-04-09 13:51:52.619279	2026-04-09 13:51:52.619332	Admin	Admin	No
\.


--
-- Data for Name: Myadmin_topnews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_topnews" (id, created_at, updated_at, created_by, updated_by, "isDelete", "generalNewsPointId_id", "newsCategoryId_id") FROM stdin;
\.


--
-- Data for Name: Myadmin_venuepagedata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_venuepagedata" (id, "venueFirstSectionLeftImage", "venueFirstSectionFirstTitle", "venueFirstSectionSecondTitle", "venueFirstSectionDescription", "venueFirstSectionButtonLabel", "venueSecondSectionLabel", "venueMapSectionLabel", "venueMapSectionBackImage", "venueLocation", "venueContact", "venueWebsiteAddress", created_at, updated_at, created_by, updated_by, "isDelete", "venueAddressLink", "venueMapLink") FROM stdin;
8				"<h4>Event Hotel Full Name, Country</h4><p>This year’s event will be hosted at the Event Hotel Full Name, where modern elegance blends seamlessly with authentic Arabic hospitality. This 5-star venue offers an elevated experience, the Sheraton Club rooms and suites provide stunning creek views and heightened luxury.</p><p>Indulge in award-winning international cuisine at the hotel's on-site dining venues. Savor high-quality Italian dishes at Vivaldi, enjoy classic British pub fare at The Chelsea Arms, or grab small bites and snacks around the clock at the Lobby Café. With a range of world-class culinary options to suit every taste and budget, the Sheraton Dubai Creek Hotel &amp; Towers offers an exceptional setting for the event and a memorable stay in Country.</p><p>More information about the venue and facilities can be found at<br><a href=\\"\\\\&quot;https://www.bitcoin-innovation-market-evolution.online\\\\&quot;\\">Event Hotel Full Name, Country</a></p>"					"<p>Event Hotel Full Name<br>Event Address<br>State, Country</p>"	"<p>+ 1234 5678 90</p>"		2025-08-18 12:08:32.672723	2026-04-10 11:04:40.423004	Admin	Admin	No	"<p><a href=\\"\\\\&quot;https://www.bitcoin-innovation-market-evolution.online\\\\&quot;\\">bitcoin-innovation-market-evolution.online</a></p>"	"<p><a href=\\"\\\\&quot;https://www.google.com/maps/dir//Morbi,+Gujarat/@22.8050519,70.8155956,16171m/data=!3m1!1e3!4m17!1m8!3m7!1s0x39598cd96ce15487:0x294863999340c94e!2sMorbi,+Gujarat!3b1!8m2!3d22.8251874!4d70.8490809!16zL20vMDhnY2d5!4m7!1m0!1m5!1m1!1s0x39598cd96ce15487:0x294863999340c94e!2m2!1d70.8490809!2d22.8251874?entry=ttu&amp;g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D\\\\&quot;\\">https://www.google.com/maps</a></p>"
\.


--
-- Data for Name: Myadmin_venuepagegallery; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_venuepagegallery" (id, "gallerySectionOneBigImage", "gallerySectionOneSmallImage", "gallerySectionTwoBigImage", "gallerySectionTwoSmallImage", "gallerySectionThreeBigImage", "gallerySectionThreeSmallImage", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
8	https://harsh7541.pythonanywhere.com/media/mediaimage%20(14).png	https://harsh7541.pythonanywhere.com/media/mediaimage%20(13).png	https://harsh7541.pythonanywhere.com/media/mediavenue4.jpg	https://harsh7541.pythonanywhere.com/media/mediavenue3.jpg	https://harsh7541.pythonanywhere.com/media/mediavenue5.jpg	https://harsh7541.pythonanywhere.com/media/mediaimage%20(12).png	2025-08-18 12:08:32.770625	2026-04-10 11:04:40.443261	No	No	No
\.


--
-- Data for Name: Myadmin_videosectionuseroptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_videosectionuseroptions" (id, "videoSectionUserOptionName", "videoSectionUserOptionShortDescription", "videoSectionUserOptionOrderNo", "videoSectionUserOptionArrowIcon", created_at, updated_at, created_by, updated_by, "isDelete", "videoSectionUserOptionRedirectRoute") FROM stdin;
\.


--
-- Data for Name: Myadmin_whoshouldattendpagedata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Myadmin_whoshouldattendpagedata" (id, "sectionFirstTitle", "sectionFirstBoldDescription", "sectionFirstPoints", "sectionFirstButtonLabel", "sectionFirstButtonRedirectPath", "sectionFirstLeftImage", "sectionSecondTitle", "sectionSecondPoints", "sectionSecondButtonLabel", "sectionSecondButtonRedirectPath", "sectionSecondRightImage", "sectionThreeTilte", "sectionThreeDescription", "sectionThreeTabOneTitle", "sectionThreeTabOneDescription", "sectionThreeTabTwoTitle", "sectionThreeTabTwoDescription", "sectionFourTilte", created_at, updated_at, created_by, updated_by, "isDelete") FROM stdin;
1		\N	"<p>Lithium Downstream Summit provides market intelligence and strategic insights on commercial trends, policy developments, and refining technologies shaping the global lithium downstream sector.<br><br>Benefits of attending include:</p><ul><li>Two days of high-level dialogues offering critical insights into cost dynamics, pricing volatility, and global market forces shaping downstream development.</li><li>Direct engagement with senior officials, corporate leaders, and institutional investors, addressing shared investment and supply chain challenges.</li><li>Briefings on major industrial initiatives and international efforts shaping mineral value chains across allied economies.</li><li>Executive perspectives from financial institutions and advisory experts on funding structures, risk allocation, and capital mobilisation strategies.</li><li>Real-world case discussions examining operational outcomes, commercial setbacks, and pathways to improved resilience.</li><li>A focused platform connecting cross-border stakeholders to advance coordinated responses to evolving supply chain pressures.</li></ul>"					"<ul><li>Clarity on the structural forces reshaping lithium conversion outside dominant global centres</li><li>Insights into practical levers that improve commercial sustainability under volatile market conditions</li><li>Greater understanding of contractual mechanisms that strengthen long-term revenue certainty</li><li>Perspective on energy cost exposure and infrastructure readiness in lithium refining operations</li><li>A deeper appreciation of coordinated government and industry action is needed to diversify supply pathways</li></ul>"					"<p>This summit brings together government leaders, industry executives, capital providers, and multilateral institutions to support resilient and competitive lithium value chains.</p>"		"<p>Core attendees include CEOs, COOs, CFOs, Presidents, Vice Presidents, Directors, Heads of, Superintendents, and Managers involved in:</p>"		"<p>From the following industry sectors:</p>"		2025-08-12 14:53:49.226501	2026-04-17 12:09:09.727736	Admin	Admin	No
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, content_type_id, codename, name) FROM stdin;
1	1	add_logentry	Can add log entry
2	1	change_logentry	Can change log entry
3	1	delete_logentry	Can delete log entry
4	1	view_logentry	Can view log entry
5	2	add_permission	Can add permission
6	2	change_permission	Can change permission
7	2	delete_permission	Can delete permission
8	2	view_permission	Can view permission
9	3	add_group	Can add group
10	3	change_group	Can change group
11	3	delete_group	Can delete group
12	3	view_group	Can view group
13	4	add_user	Can add user
14	4	change_user	Can change user
15	4	delete_user	Can delete user
16	4	view_user	Can view user
17	5	add_contenttype	Can add content type
18	5	change_contenttype	Can change content type
19	5	delete_contenttype	Can delete content type
20	5	view_contenttype	Can view content type
21	6	add_session	Can add session
22	6	change_session	Can change session
23	6	delete_session	Can delete session
24	6	view_session	Can view session
25	7	add_homepagenavlogodata	Can add home page nav logo data
26	7	change_homepagenavlogodata	Can change home page nav logo data
27	7	delete_homepagenavlogodata	Can delete home page nav logo data
28	7	view_homepagenavlogodata	Can view home page nav logo data
29	8	add_homepagenavmaincategories	Can add home page nav main categories
30	8	change_homepagenavmaincategories	Can change home page nav main categories
31	8	delete_homepagenavmaincategories	Can delete home page nav main categories
32	8	view_homepagenavmaincategories	Can view home page nav main categories
33	9	add_homepagenavsubcategories	Can add home page nav sub categories
34	9	change_homepagenavsubcategories	Can change home page nav sub categories
35	9	delete_homepagenavsubcategories	Can delete home page nav sub categories
36	9	view_homepagenavsubcategories	Can view home page nav sub categories
37	10	add_homepagevideosectioninput	Can add home page video section input
38	10	change_homepagevideosectioninput	Can change home page video section input
39	10	delete_homepagevideosectioninput	Can delete home page video section input
40	10	view_homepagevideosectioninput	Can view home page video section input
41	11	add_videosectionuseroptions	Can add video section user options
42	11	change_videosectionuseroptions	Can change video section user options
43	11	delete_videosectionuseroptions	Can delete video section user options
44	11	view_videosectionuseroptions	Can view video section user options
45	12	add_eventdetails	Can add event details
46	12	change_eventdetails	Can change event details
47	12	delete_eventdetails	Can delete event details
48	12	view_eventdetails	Can view event details
49	13	add_speakersection	Can add speaker section
50	13	change_speakersection	Can change speaker section
51	13	delete_speakersection	Can delete speaker section
52	13	view_speakersection	Can view speaker section
53	14	add_eventspeakers	Can add event speakers
54	14	change_eventspeakers	Can change event speakers
55	14	delete_eventspeakers	Can delete event speakers
56	14	view_eventspeakers	Can view event speakers
57	15	add_companieslogosection	Can add companies logo section
58	15	change_companieslogosection	Can change companies logo section
59	15	delete_companieslogosection	Can delete companies logo section
60	15	view_companieslogosection	Can view companies logo section
61	16	add_contactusdata	Can add contact us data
62	16	change_contactusdata	Can change contact us data
63	16	delete_contactusdata	Can delete contact us data
64	16	view_contactusdata	Can view contact us data
65	17	add_contactushelpdata	Can add contact us help data
66	17	change_contactushelpdata	Can change contact us help data
67	17	delete_contactushelpdata	Can delete contact us help data
68	17	view_contactushelpdata	Can view contact us help data
69	18	add_contactuspagedata	Can add contact us page data
70	18	change_contactuspagedata	Can change contact us page data
71	18	delete_contactuspagedata	Can delete contact us page data
72	18	view_contactuspagedata	Can view contact us page data
73	19	add_countsection	Can add count section
74	19	change_countsection	Can change count section
75	19	delete_countsection	Can delete count section
76	19	view_countsection	Can view count section
77	20	add_countsectiontopic	Can add count section topic
78	20	change_countsectiontopic	Can change count section topic
79	20	delete_countsectiontopic	Can delete count section topic
80	20	view_countsectiontopic	Can view count section topic
81	21	add_footerfirstsectionoptions	Can add footer first section options
82	21	change_footerfirstsectionoptions	Can change footer first section options
83	21	delete_footerfirstsectionoptions	Can delete footer first section options
84	21	view_footerfirstsectionoptions	Can view footer first section options
85	22	add_footersocialmediaoptions	Can add footer social media options
86	22	change_footersocialmediaoptions	Can change footer social media options
87	22	delete_footersocialmediaoptions	Can delete footer social media options
88	22	view_footersocialmediaoptions	Can view footer social media options
89	23	add_homepagethirdsection	Can add home page third section
90	23	change_homepagethirdsection	Can change home page third section
91	23	delete_homepagethirdsection	Can delete home page third section
92	23	view_homepagethirdsection	Can view home page third section
93	24	add_keypointssection	Can add key points section
94	24	change_keypointssection	Can change key points section
95	24	delete_keypointssection	Can delete key points section
96	24	view_keypointssection	Can view key points section
97	25	add_keypointssectionpoints	Can add key points section points
98	25	change_keypointssectionpoints	Can change key points section points
99	25	delete_keypointssectionpoints	Can delete key points section points
100	25	view_keypointssectionpoints	Can view key points section points
101	26	add_pastattandeessection	Can add past attandees section
102	26	change_pastattandeessection	Can change past attandees section
103	26	delete_pastattandeessection	Can delete past attandees section
104	26	view_pastattandeessection	Can view past attandees section
105	27	add_pressmediapageboxdata	Can add press media page box data
106	27	change_pressmediapageboxdata	Can change press media page box data
107	27	delete_pressmediapageboxdata	Can delete press media page box data
108	27	view_pressmediapageboxdata	Can view press media page box data
109	28	add_pressmediapagedata	Can add press media page data
110	28	change_pressmediapagedata	Can change press media page data
111	28	delete_pressmediapagedata	Can delete press media page data
112	28	view_pressmediapagedata	Can view press media page data
113	29	add_registerpagesettings	Can add register page settings
114	29	change_registerpagesettings	Can change register page settings
115	29	delete_registerpagesettings	Can delete register page settings
116	29	view_registerpagesettings	Can view register page settings
117	30	add_speakerpagedata	Can add speaker page data
118	30	change_speakerpagedata	Can change speaker page data
119	30	delete_speakerpagedata	Can delete speaker page data
120	30	view_speakerpagedata	Can view speaker page data
121	31	add_speakerpagesectionthreepoints	Can add speaker page section three points
122	31	change_speakerpagesectionthreepoints	Can change speaker page section three points
123	31	delete_speakerpagesectionthreepoints	Can delete speaker page section three points
124	31	view_speakerpagesectionthreepoints	Can view speaker page section three points
125	32	add_sponsorpackagepagedata	Can add sponsor package page data
126	32	change_sponsorpackagepagedata	Can change sponsor package page data
127	32	delete_sponsorpackagepagedata	Can delete sponsor package page data
128	32	view_sponsorpackagepagedata	Can view sponsor package page data
129	33	add_sponsorpagebulletdata	Can add sponsor page bullet data
130	33	change_sponsorpagebulletdata	Can change sponsor page bullet data
131	33	delete_sponsorpagebulletdata	Can delete sponsor page bullet data
132	33	view_sponsorpagebulletdata	Can view sponsor page bullet data
133	34	add_sponsorpagedata	Can add sponsor page data
134	34	change_sponsorpagedata	Can change sponsor page data
135	34	delete_sponsorpagedata	Can delete sponsor page data
136	34	view_sponsorpagedata	Can view sponsor page data
137	35	add_sponsorsection	Can add sponsor section
138	35	change_sponsorsection	Can change sponsor section
139	35	delete_sponsorsection	Can delete sponsor section
140	35	view_sponsorsection	Can view sponsor section
141	36	add_subscribers	Can add subscribers
142	36	change_subscribers	Can change subscribers
143	36	delete_subscribers	Can delete subscribers
144	36	view_subscribers	Can view subscribers
145	37	add_testimonialsection	Can add testimonial section
146	37	change_testimonialsection	Can change testimonial section
147	37	delete_testimonialsection	Can delete testimonial section
148	37	view_testimonialsection	Can view testimonial section
149	38	add_themecolorsettings	Can add theme color settings
150	38	change_themecolorsettings	Can change theme color settings
151	38	delete_themecolorsettings	Can delete theme color settings
152	38	view_themecolorsettings	Can view theme color settings
153	39	add_venuepagedata	Can add venue page data
154	39	change_venuepagedata	Can change venue page data
155	39	delete_venuepagedata	Can delete venue page data
156	39	view_venuepagedata	Can view venue page data
157	40	add_venuepagegallery	Can add venue page gallery
158	40	change_venuepagegallery	Can change venue page gallery
159	40	delete_venuepagegallery	Can delete venue page gallery
160	40	view_venuepagegallery	Can view venue page gallery
161	41	add_whoshouldattendpagedata	Can add who should attend page data
162	41	change_whoshouldattendpagedata	Can change who should attend page data
163	41	delete_whoshouldattendpagedata	Can delete who should attend page data
164	41	view_whoshouldattendpagedata	Can view who should attend page data
165	42	add_generalnewspoint	Can add general news point
166	42	change_generalnewspoint	Can change general news point
167	42	delete_generalnewspoint	Can delete general news point
168	42	view_generalnewspoint	Can view general news point
169	43	add_newscategory	Can add news category
170	43	change_newscategory	Can change news category
171	43	delete_newscategory	Can delete news category
172	43	view_newscategory	Can view news category
173	44	add_topnews	Can add top news
174	44	change_topnews	Can change top news
175	44	delete_topnews	Can delete top news
176	44	view_topnews	Can view top news
177	45	add_latestnews	Can add latest news
178	45	change_latestnews	Can change latest news
179	45	delete_latestnews	Can delete latest news
180	45	view_latestnews	Can view latest news
181	46	add_deligatepackageinclusionpoints	Can add deligate package inclusion points
182	46	change_deligatepackageinclusionpoints	Can change deligate package inclusion points
183	46	delete_deligatepackageinclusionpoints	Can delete deligate package inclusion points
184	46	view_deligatepackageinclusionpoints	Can view deligate package inclusion points
185	47	add_eventagenda	Can add event agenda
186	47	change_eventagenda	Can change event agenda
187	47	delete_eventagenda	Can delete event agenda
188	47	view_eventagenda	Can view event agenda
189	48	add_eventcoreattandees	Can add event core attandees
190	48	change_eventcoreattandees	Can change event core attandees
191	48	delete_eventcoreattandees	Can delete event core attandees
192	48	view_eventcoreattandees	Can view event core attandees
193	49	add_eventexpertspeakers	Can add event expert speakers
194	49	change_eventexpertspeakers	Can change event expert speakers
195	49	delete_eventexpertspeakers	Can delete event expert speakers
196	49	view_eventexpertspeakers	Can view event expert speakers
197	50	add_eventfaqs	Can add event faqs
198	50	change_eventfaqs	Can change event faqs
199	50	delete_eventfaqs	Can delete event faqs
200	50	view_eventfaqs	Can view event faqs
201	51	add_eventgeneralsettings	Can add event general settings
202	51	change_eventgeneralsettings	Can change event general settings
203	51	delete_eventgeneralsettings	Can delete event general settings
204	51	view_eventgeneralsettings	Can view event general settings
205	52	add_eventindustrytrends	Can add event industry trends
206	52	change_eventindustrytrends	Can change event industry trends
207	52	delete_eventindustrytrends	Can delete event industry trends
208	52	view_eventindustrytrends	Can view event industry trends
209	53	add_eventparticipatedindustries	Can add event participated industries
210	53	change_eventparticipatedindustries	Can change event participated industries
211	53	delete_eventparticipatedindustries	Can delete event participated industries
212	53	view_eventparticipatedindustries	Can view event participated industries
213	54	add_eventpastattandees	Can add event past attandees
214	54	change_eventpastattandees	Can change event past attandees
215	54	delete_eventpastattandees	Can delete event past attandees
216	54	view_eventpastattandees	Can view event past attandees
217	55	add_eventsponsors	Can add event sponsors
218	55	change_eventsponsors	Can change event sponsors
219	55	delete_eventsponsors	Can delete event sponsors
220	55	view_eventsponsors	Can view event sponsors
221	56	add_eventtestimonials	Can add event testimonials
222	56	change_eventtestimonials	Can change event testimonials
223	56	delete_eventtestimonials	Can delete event testimonials
224	56	view_eventtestimonials	Can view event testimonials
225	57	add_grouppassregistrationrequestdata	Can add group pass registration request data
226	57	change_grouppassregistrationrequestdata	Can change group pass registration request data
227	57	delete_grouppassregistrationrequestdata	Can delete group pass registration request data
228	57	view_grouppassregistrationrequestdata	Can view group pass registration request data
229	58	add_paymentoptionimage	Can add payment option image
230	58	change_paymentoptionimage	Can change payment option image
231	58	delete_paymentoptionimage	Can delete payment option image
232	58	view_paymentoptionimage	Can view payment option image
233	59	add_relatedevents	Can add related events
234	59	change_relatedevents	Can change related events
235	59	delete_relatedevents	Can delete related events
236	59	view_relatedevents	Can view related events
237	60	add_registeredcompanydetails	Can add registered company details
238	60	change_registeredcompanydetails	Can change registered company details
239	60	delete_registeredcompanydetails	Can delete registered company details
240	60	view_registeredcompanydetails	Can view registered company details
241	61	add_eventdeligatepackages	Can add event deligate packages
242	61	change_eventdeligatepackages	Can change event deligate packages
243	61	delete_eventdeligatepackages	Can delete event deligate packages
244	61	view_eventdeligatepackages	Can view event deligate packages
245	62	add_delegatetransectiondata	Can add delegate transection data
246	62	change_delegatetransectiondata	Can change delegate transection data
247	62	delete_delegatetransectiondata	Can delete delegate transection data
248	62	view_delegatetransectiondata	Can view delegate transection data
249	63	add_delegatesaddons	Can add delegates add ons
250	63	change_delegatesaddons	Can change delegates add ons
251	63	delete_delegatesaddons	Can delete delegates add ons
252	63	view_delegatesaddons	Can view delegates add ons
253	64	add_registereddelegates	Can add registered delegates
254	64	change_registereddelegates	Can change registered delegates
255	64	delete_registereddelegates	Can delete registered delegates
256	64	view_registereddelegates	Can view registered delegates
257	65	add_addonshistory	Can add add ons history
258	65	change_addonshistory	Can change add ons history
259	65	delete_addonshistory	Can delete add ons history
260	65	view_addonshistory	Can view add ons history
261	66	add_offercouponhistory	Can add offer coupon history
262	66	change_offercouponhistory	Can change offer coupon history
263	66	delete_offercouponhistory	Can delete offer coupon history
264	66	view_offercouponhistory	Can view offer coupon history
265	67	add_offercoupon	Can add offer coupon
266	67	change_offercoupon	Can change offer coupon
267	67	delete_offercoupon	Can delete offer coupon
268	67	view_offercoupon	Can view offer coupon
269	68	add_sponsoredcompanyaddonsdetails	Can add sponsored company add ons details
270	68	change_sponsoredcompanyaddonsdetails	Can change sponsored company add ons details
271	68	delete_sponsoredcompanyaddonsdetails	Can delete sponsored company add ons details
272	68	view_sponsoredcompanyaddonsdetails	Can view sponsored company add ons details
273	69	add_sponsorpackageaddons	Can add sponsor package add ons
274	69	change_sponsorpackageaddons	Can change sponsor package add ons
275	69	delete_sponsorpackageaddons	Can delete sponsor package add ons
276	69	view_sponsorpackageaddons	Can view sponsor package add ons
277	70	add_sponseredcompanydetails	Can add sponsered company details
278	70	change_sponseredcompanydetails	Can change sponsered company details
279	70	delete_sponseredcompanydetails	Can delete sponsered company details
280	70	view_sponseredcompanydetails	Can view sponsered company details
281	71	add_sponsorpackageinclusions	Can add sponsor package inclusions
282	71	change_sponsorpackageinclusions	Can change sponsor package inclusions
283	71	delete_sponsorpackageinclusions	Can delete sponsor package inclusions
284	71	view_sponsorpackageinclusions	Can view sponsor package inclusions
285	72	add_sponsorcompanytransectiondata	Can add sponsor company transection data
286	72	change_sponsorcompanytransectiondata	Can change sponsor company transection data
287	72	delete_sponsorcompanytransectiondata	Can delete sponsor company transection data
288	72	view_sponsorcompanytransectiondata	Can view sponsor company transection data
289	73	add_sponsorpackagetypes	Can add sponsor package types
290	73	change_sponsorpackagetypes	Can change sponsor package types
291	73	delete_sponsorpackagetypes	Can delete sponsor package types
292	73	view_sponsorpackagetypes	Can view sponsor package types
293	74	add_sponsorbenefits	Can add sponsor benefits
294	74	change_sponsorbenefits	Can change sponsor benefits
295	74	delete_sponsorbenefits	Can delete sponsor benefits
296	74	view_sponsorbenefits	Can view sponsor benefits
297	75	add_sponsorpackageaddontypes	Can add sponsor package add on types
298	75	change_sponsorpackageaddontypes	Can change sponsor package add on types
299	75	delete_sponsorpackageaddontypes	Can delete sponsor package add on types
300	75	view_sponsorpackageaddontypes	Can view sponsor package add on types
301	76	add_registeredsponsereddelegates	Can add registered sponsered delegates
302	76	change_registeredsponsereddelegates	Can change registered sponsered delegates
303	76	delete_registeredsponsereddelegates	Can delete registered sponsered delegates
304	76	view_registeredsponsereddelegates	Can view registered sponsered delegates
305	77	add_sponsoroffercouponhistory	Can add sponsor offer coupon history
306	77	change_sponsoroffercouponhistory	Can change sponsor offer coupon history
307	77	delete_sponsoroffercouponhistory	Can delete sponsor offer coupon history
308	77	view_sponsoroffercouponhistory	Can view sponsor offer coupon history
309	78	add_mediapagehelpers	Can add media page helpers
310	78	change_mediapagehelpers	Can change media page helpers
311	78	delete_mediapagehelpers	Can delete media page helpers
312	78	view_mediapagehelpers	Can view media page helpers
313	79	add_standoutcrowdrequestdata	Can add stand out crowd request data
314	79	change_standoutcrowdrequestdata	Can change stand out crowd request data
315	79	delete_standoutcrowdrequestdata	Can delete stand out crowd request data
316	79	view_standoutcrowdrequestdata	Can view stand out crowd request data
317	80	add_becomespeakerrequestdata	Can add become speaker request data
318	80	change_becomespeakerrequestdata	Can change become speaker request data
319	80	delete_becomespeakerrequestdata	Can delete become speaker request data
320	80	view_becomespeakerrequestdata	Can view become speaker request data
321	81	add_quickproposalrequestdata	Can add quick proposal request data
322	81	change_quickproposalrequestdata	Can change quick proposal request data
323	81	delete_quickproposalrequestdata	Can delete quick proposal request data
324	81	view_quickproposalrequestdata	Can view quick proposal request data
325	82	add_enduserpassregistrationrequestdata	Can add end user pass registration request data
326	82	change_enduserpassregistrationrequestdata	Can change end user pass registration request data
327	82	delete_enduserpassregistrationrequestdata	Can delete end user pass registration request data
328	82	view_enduserpassregistrationrequestdata	Can view end user pass registration request data
329	83	add_pastattandeehomedata	Can add past attandee home data
330	83	change_pastattandeehomedata	Can change past attandee home data
331	83	delete_pastattandeehomedata	Can delete past attandee home data
332	83	view_pastattandeehomedata	Can view past attandee home data
333	84	add_eventleaders	Can add event leaders
334	84	change_eventleaders	Can change event leaders
335	84	delete_eventleaders	Can delete event leaders
336	84	view_eventleaders	Can view event leaders
337	86	add_adminuser	Can add admin user
338	86	change_adminuser	Can change admin user
339	86	delete_adminuser	Can delete admin user
340	86	view_adminuser	Can view admin user
341	85	add_adminrole	Can add admin role
342	85	change_adminrole	Can change admin role
343	85	delete_adminrole	Can delete admin role
344	85	view_adminrole	Can view admin role
345	88	add_sidebarsubmodule	Can add sidebar sub module
346	88	change_sidebarsubmodule	Can change sidebar sub module
347	88	delete_sidebarsubmodule	Can delete sidebar sub module
348	88	view_sidebarsubmodule	Can view sidebar sub module
349	87	add_sidebarmodule	Can add sidebar module
350	87	change_sidebarmodule	Can change sidebar module
351	87	delete_sidebarmodule	Can delete sidebar module
352	87	view_sidebarmodule	Can view sidebar module
353	89	add_eventslideshares	Can add event slide shares
354	89	change_eventslideshares	Can change event slide shares
355	89	delete_eventslideshares	Can delete event slide shares
356	89	view_eventslideshares	Can view event slide shares
357	90	add_eventslidesharesattandees	Can add event slide shares attandees
358	90	change_eventslidesharesattandees	Can change event slide shares attandees
359	90	delete_eventslidesharesattandees	Can delete event slide shares attandees
360	90	view_eventslidesharesattandees	Can view event slide shares attandees
361	91	add_slidesharesaccesspersons	Can add slide shares access persons
362	91	change_slidesharesaccesspersons	Can change slide shares access persons
363	91	delete_slidesharesaccesspersons	Can delete slide shares access persons
364	91	view_slidesharesaccesspersons	Can view slide shares access persons
365	92	add_payonlinetransectiondata	Can add pay online transection data
366	92	change_payonlinetransectiondata	Can change pay online transection data
367	92	delete_payonlinetransectiondata	Can delete pay online transection data
368	92	view_payonlinetransectiondata	Can view pay online transection data
369	93	add_blockedemaildomains	Can add blocked email domains
370	93	change_blockedemaildomains	Can change blocked email domains
371	93	delete_blockedemaildomains	Can delete blocked email domains
372	93	view_blockedemaildomains	Can view blocked email domains
373	94	add_footeroptions	Can add footer options
374	94	change_footeroptions	Can change footer options
375	94	delete_footeroptions	Can delete footer options
376	94	view_footeroptions	Can view footer options
377	95	add_toemails	Can add to emails
378	95	change_toemails	Can change to emails
379	95	delete_toemails	Can delete to emails
380	95	view_toemails	Can view to emails
381	96	add_agendasubscriber	Can add agenda subscriber
382	96	change_agendasubscriber	Can change agenda subscriber
383	96	delete_agendasubscriber	Can delete agenda subscriber
384	96	view_agendasubscriber	Can view agenda subscriber
385	97	add_calendersubscriber	Can add calender subscriber
386	97	change_calendersubscriber	Can change calender subscriber
387	97	delete_calendersubscriber	Can delete calender subscriber
388	97	view_calendersubscriber	Can view calender subscriber
389	98	add_sponsoroffercoupon	Can add sponsor offer coupon
390	98	change_sponsoroffercoupon	Can change sponsor offer coupon
391	98	delete_sponsoroffercoupon	Can delete sponsor offer coupon
392	98	view_sponsoroffercoupon	Can view sponsor offer coupon
393	99	add_eventproject	Can add event project
394	99	change_eventproject	Can change event project
395	99	delete_eventproject	Can delete event project
396	99	view_eventproject	Can view event project
397	100	add_pageseosettings	Can add page seo settings
398	100	change_pageseosettings	Can change page seo settings
399	100	delete_pageseosettings	Can delete page seo settings
400	100	view_pageseosettings	Can view page seo settings
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, last_name, email, is_staff, is_active, date_joined, first_name) FROM stdin;
1	pbkdf2_sha256$1000000$ctOHznyq80YXpdutIDeBWo$8pNlkiC9pITPZC3+Bu+N+X5gjlaYIBXXEo9raWeAK7A=	2025-10-08 07:17:18.986122	t	bhargav			t	t	2025-05-14 12:00:34.720618	
2	pbkdf2_sha256$1000000$JqupbYT5qHUVxUixAEZZPW$ggrZ5vYMAGG9FWj5OahuC69g3PdKN1tCdxn2YvWwK7w=	2026-04-10 10:35:45.401258	t	benny			t	t	2025-05-29 07:19:43.879415	
3	pbkdf2_sha256$1000000$XnkXD9V9t2NWyOiNz1all0$byvr+C0zbWwr9p2fcKke/Vi3g4/MNpxyljPGPmQS8+c=	2026-01-16 15:07:58.505732	t	benny1902			t	t	2026-01-09 10:13:45.421386	
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, object_id, object_repr, action_flag, change_message, content_type_id, user_id, action_time) FROM stdin;
1	1	homePageNavMainCategories object (1)	1	[{"added": {}}]	8	1	2025-05-14 13:05:15.552812
2	2	homePageNavMainCategories object (2)	1	[{"added": {}}]	8	1	2025-05-14 13:05:35.822528
3	1	eventSpeakers object (1)	1	[{"added": {}}]	14	2	2025-07-16 08:10:21.822634
4	1	eventSpeakers object (1)	3		14	2	2025-07-16 15:13:21.40754
5	2	eventSpeakers object (2)	3		14	2	2025-07-16 15:19:42.50866
6	3	eventSpeakers object (3)	3		14	2	2025-07-16 15:25:56.234251
7	4	eventSpeakers object (4)	2	[{"changed": {"fields": ["IsDelete"]}}]	14	2	2025-07-17 12:12:58.880232
8	1	eventSponsors object (1)	2	[{"changed": {"fields": ["IsDelete"]}}]	55	2	2025-07-18 08:47:17.929491
9	1	eventSponsors object (1)	2	[{"changed": {"fields": ["IsDelete"]}}]	55	2	2025-07-18 08:47:37.410861
10	6	eventSponsors object (6)	3		55	2	2025-07-18 10:27:51.105012
11	5	eventSponsors object (5)	3		55	2	2025-07-18 10:27:51.105087
12	4	eventSponsors object (4)	3		55	2	2025-07-18 10:27:51.10511
13	3	eventSponsors object (3)	3		55	2	2025-07-18 10:27:51.105129
14	2	eventSponsors object (2)	3		55	2	2025-07-18 10:27:51.105147
15	5	keyPointsSectionPoints object (5)	2	[{"changed": {"fields": ["IsDelete"]}}]	25	2	2025-07-18 12:13:29.038913
16	1	eventTestimonials object (1)	2	[{"changed": {"fields": ["PersonCompany", "IsDelete"]}}]	56	2	2025-07-19 06:23:44.554976
17	2	subscribers object (2)	2	[{"changed": {"fields": ["IsDelete"]}}]	36	2	2025-07-19 08:07:35.949454
18	1	relatedEvents object (1)	2	[{"changed": {"fields": ["EventLocation", "IsDelete"]}}]	59	2	2025-07-23 10:32:18.777533
19	1	homePageThirdSection object (1)	1	[{"added": {}}]	23	2	2025-07-23 12:23:03.31865
20	1	homePageThirdSection object (1)	2	[{"changed": {"fields": ["ThirdSectionDescription"]}}]	23	2	2025-07-23 12:35:37.83703
21	1	eventPastAttandees object (1)	2	[{"changed": {"fields": ["IsDelete"]}}]	54	2	2025-07-28 15:10:29.832156
22	1	eventDeligatePackages object (1)	3		61	2	2025-07-31 09:50:08.879711
23	2	eventDeligatePackages object (2)	2	[{"changed": {"fields": ["IsDelete"]}}]	61	2	2025-07-31 14:59:17.98235
24	2	countSectionTopic object (2)	2	[{"changed": {"fields": ["IsDelete"]}}]	20	2	2025-08-06 10:01:19.475719
25	1	companiesLogoSection object (1)	2	[{"changed": {"fields": ["IsDelete"]}}]	15	2	2025-08-06 13:59:45.301027
26	1	generalNewsPoint object (1)	2	[{"changed": {"fields": ["IsDelete"]}}]	42	2	2025-08-08 11:29:32.124163
27	1	generalNewsPoint object (1)	3		42	2	2025-08-08 11:30:46.704959
28	2	generalNewsPoint object (2)	2	[{"changed": {"fields": ["IsTopNews"]}}]	42	2	2025-08-11 11:32:25.659637
29	3	generalNewsPoint object (3)	2	[{"changed": {"fields": ["IsTopNews"]}}]	42	2	2025-08-11 11:32:34.867602
30	4	generalNewsPoint object (4)	2	[{"changed": {"fields": ["IsTopNews"]}}]	42	2	2025-08-11 11:32:40.542558
31	5	generalNewsPoint object (5)	2	[{"changed": {"fields": ["IsTopNews"]}}]	42	2	2025-08-11 11:32:45.583806
32	6	generalNewsPoint object (6)	2	[{"changed": {"fields": ["IsTopNews"]}}]	42	2	2025-08-11 11:32:50.269471
33	7	generalNewsPoint object (7)	2	[{"changed": {"fields": ["IsTopNews"]}}]	42	2	2025-08-11 11:32:54.652718
34	8	generalNewsPoint object (8)	2	[{"changed": {"fields": ["IsTopNews"]}}]	42	2	2025-08-11 11:33:03.531483
35	9	generalNewsPoint object (9)	2	[{"changed": {"fields": ["IsTopNews"]}}]	42	2	2025-08-11 11:33:08.902324
36	10	generalNewsPoint object (10)	2	[{"changed": {"fields": ["IsTopNews"]}}]	42	2	2025-08-11 11:33:13.549194
37	11	generalNewsPoint object (11)	2	[{"changed": {"fields": ["IsTopNews"]}}]	42	2	2025-08-11 11:33:18.261202
38	7	venuePageData object (7)	3		39	1	2025-08-18 11:24:56.796553
39	6	venuePageData object (6)	3		39	1	2025-08-18 11:24:56.796603
40	5	venuePageData object (5)	3		39	1	2025-08-18 11:24:56.79663
41	4	venuePageData object (4)	3		39	1	2025-08-18 11:24:56.796654
42	3	venuePageData object (3)	3		39	1	2025-08-18 11:24:56.796678
43	2	venuePageData object (2)	3		39	1	2025-08-18 11:24:56.796701
44	1	venuePageData object (1)	3		39	1	2025-08-18 11:24:56.796723
45	7	venuePageGallery object (7)	3		40	1	2025-08-18 11:25:47.382975
46	6	venuePageGallery object (6)	3		40	1	2025-08-18 11:25:47.383032
47	5	venuePageGallery object (5)	3		40	1	2025-08-18 11:25:47.383055
48	4	venuePageGallery object (4)	3		40	1	2025-08-18 11:25:47.383074
49	3	venuePageGallery object (3)	3		40	1	2025-08-18 11:25:47.383091
50	2	venuePageGallery object (2)	3		40	1	2025-08-18 11:25:47.38311
51	1	venuePageGallery object (1)	3		40	1	2025-08-18 11:25:47.383127
52	2	relatedEvents object (2)	2	[{"changed": {"fields": ["EventImage", "EventHoverImage"]}}]	59	1	2025-08-22 08:24:44.187527
53	1	relatedEvents object (1)	2	[{"changed": {"fields": ["EventImage", "EventHoverImage"]}}]	59	1	2025-08-22 08:24:51.552011
54	2	relatedEvents object (2)	2	[{"changed": {"fields": ["EventImage"]}}]	59	1	2025-08-22 08:32:53.682887
55	5	eventAgenda object (5)	2	[{"changed": {"fields": ["SortOrder"]}}]	47	2	2025-09-15 15:10:21.766615
56	1	eventDetails object (1)	3		12	1	2025-09-24 06:31:48.655501
57	1	homePageNavLogoData object (1)	3		7	1	2025-09-24 06:32:07.327867
58	1	homePageVideoSectionInput object (1)	3		10	1	2025-09-24 06:32:21.080349
59	1	themeColorSettings object (1)	3		38	1	2025-09-24 06:32:33.704992
60	1	eventGeneralSettings object (1)	3		51	1	2025-09-24 06:32:53.236584
61	2	eventDetails object (2)	2	[{"changed": {"fields": ["EventLocation"]}}]	12	1	2025-09-24 09:55:17.749697
62	2	eventDetails object (2)	2	[{"changed": {"fields": ["EventShortCode"]}}]	12	1	2025-10-03 07:24:37.017579
63	1	addOnsHistory object (1)	2	[{"changed": {"fields": ["AddOnId"]}}]	65	1	2025-10-03 09:41:27.995464
64	1	registeredCompanyDetails object (1)	3		60	1	2025-10-03 09:47:45.41466
65	48	eventAgenda object (48)	3		47	1	2025-10-06 13:47:37.158054
66	49	eventAgenda object (49)	3		47	1	2025-10-06 14:09:27.154067
67	51	eventAgenda object (51)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:10:41.032717
68	29	eventAgenda object (29)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:29:06.491872
69	30	eventAgenda object (30)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:29:19.899508
70	31	eventAgenda object (31)	2	[]	47	1	2025-10-08 08:29:29.868574
71	32	eventAgenda object (32)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:29:40.251039
72	33	eventAgenda object (33)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:29:51.763589
73	35	eventAgenda object (35)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:30:11.283917
74	36	eventAgenda object (36)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:40:36.89424
75	37	eventAgenda object (37)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:40:42.954409
76	38	eventAgenda object (38)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:40:49.459075
77	39	eventAgenda object (39)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:40:59.907712
78	40	eventAgenda object (40)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:41:07.146282
79	42	eventAgenda object (42)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:41:18.588402
80	45	eventAgenda object (45)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:41:34.689697
81	46	eventAgenda object (46)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:41:42.106015
82	47	eventAgenda object (47)	2	[{"changed": {"fields": ["Day"]}}]	47	1	2025-10-08 08:41:48.833158
83	1	sponseredCompanyDetails object (1)	3		70	1	2025-10-15 09:29:32.194816
84	9	eventAgenda object (9)	2	[{"changed": {"fields": ["SingleSpeakerAgendaImg", "SingleSpeakerCompanyImg"]}}]	47	3	2026-01-09 11:14:23.236206
85	13	eventAgenda object (13)	2	[{"changed": {"fields": ["SingleSpeakerAgendaImg", "SingleSpeakerCompanyImg"]}}]	47	3	2026-01-09 11:16:33.852447
86	16	eventAgenda object (16)	2	[{"changed": {"fields": ["SingleSpeakerAgendaImg", "SingleSpeakerCompanyImg"]}}]	47	3	2026-01-09 11:17:16.652757
87	20	eventAgenda object (20)	2	[{"changed": {"fields": ["SingleSpeakerAgendaImg"]}}]	47	3	2026-01-09 11:18:00.719701
88	23	eventAgenda object (23)	2	[{"changed": {"fields": ["SingleSpeakerAgendaImg", "SingleSpeakerCompanyImg"]}}]	47	3	2026-01-09 11:18:37.725057
89	31	eventAgenda object (31)	2	[{"changed": {"fields": ["SingleSpeakerAgendaImg", "SingleSpeakerCompanyImg"]}}]	47	3	2026-01-09 11:20:09.119817
90	34	eventAgenda object (34)	2	[{"changed": {"fields": ["SingleSpeakerAgendaImg", "SingleSpeakerCompanyImg"]}}]	47	3	2026-01-09 11:20:59.865672
91	38	eventAgenda object (38)	2	[{"changed": {"fields": ["SingleSpeakerAgendaImg", "SingleSpeakerCompanyImg"]}}]	47	3	2026-01-09 11:21:33.855128
92	41	eventAgenda object (41)	2	[{"changed": {"fields": ["SingleSpeakerAgendaImg", "SingleSpeakerCompanyImg"]}}]	47	3	2026-01-09 11:21:58.724454
93	44	eventAgenda object (44)	2	[{"changed": {"fields": ["SingleSpeakerAgendaImg", "SingleSpeakerCompanyImg"]}}]	47	3	2026-01-09 11:22:23.794237
94	50	eventAgenda object (50)	2	[{"changed": {"fields": ["Speaker1AgendaImg", "Speaker1CompanyImg", "Speaker2AgendaImg", "Speaker2CompanyImg"]}}]	47	3	2026-01-09 11:22:59.878606
95	51	eventAgenda object (51)	2	[{"changed": {"fields": ["PanelSpeakerImages"]}}]	47	3	2026-01-09 11:23:51.887435
96	18	eventLeaders object (18)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:26:00.097272
97	17	eventLeaders object (17)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:26:13.837415
98	16	eventLeaders object (16)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:26:21.598632
99	15	eventLeaders object (15)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:26:29.261052
100	14	eventLeaders object (14)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:26:37.445628
101	13	eventLeaders object (13)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:26:44.768566
102	12	eventLeaders object (12)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:26:52.140747
103	11	eventLeaders object (11)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:26:59.462015
104	10	eventLeaders object (10)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:27:07.14556
105	9	eventLeaders object (9)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:27:14.629726
106	8	eventLeaders object (8)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:27:22.631
107	7	eventLeaders object (7)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:27:29.818732
108	6	eventLeaders object (6)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:27:38.239125
109	5	eventLeaders object (5)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:27:46.582085
110	4	eventLeaders object (4)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:27:59.161548
111	3	eventLeaders object (3)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:28:08.084056
112	2	eventLeaders object (2)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:28:16.565003
113	1	eventLeaders object (1)	2	[{"changed": {"fields": ["LeaderLogo"]}}]	84	3	2026-01-09 11:28:24.510226
114	12	eventPastAttandees object (12)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:28:47.860107
115	11	eventPastAttandees object (11)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:28:55.062834
116	10	eventPastAttandees object (10)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:29:01.404067
117	9	eventPastAttandees object (9)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:29:09.722346
118	8	eventPastAttandees object (8)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:29:18.199552
119	7	eventPastAttandees object (7)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:29:25.332952
120	6	eventPastAttandees object (6)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:29:33.243804
121	5	eventPastAttandees object (5)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:29:41.028272
122	4	eventPastAttandees object (4)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:29:48.223985
123	2	eventPastAttandees object (2)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:31:56.404842
124	1	eventPastAttandees object (1)	2	[{"changed": {"fields": ["PastAttandeeLogo"]}}]	54	3	2026-01-09 11:32:05.336684
125	4	eventSpeakers object (4)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-09 11:33:05.785078
126	5	eventSpeakers object (5)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-09 11:33:24.025083
127	6	eventSpeakers object (6)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-09 11:33:57.703377
128	7	eventSpeakers object (7)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-09 11:34:21.442424
129	8	eventSpeakers object (8)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-09 11:34:40.054768
130	9	eventSpeakers object (9)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-09 11:34:57.760114
131	10	eventSpeakers object (10)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-09 11:35:17.030875
132	11	eventSpeakers object (11)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-09 11:35:41.180515
263	2	SidebarModule object (2)	1	[{"added": {}}]	87	2	2026-03-11 08:05:25.48032
133	12	eventSpeakers object (12)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-09 11:35:56.815606
134	13	eventSpeakers object (13)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-09 11:36:14.087524
135	12	eventSponsors object (12)	2	[{"changed": {"fields": ["SponsorComapnyLogo"]}}]	55	3	2026-01-09 11:36:47.573761
136	11	eventSponsors object (11)	2	[{"changed": {"fields": ["SponsorComapnyLogo"]}}]	55	3	2026-01-09 11:36:57.17787
137	9	eventSponsors object (9)	2	[{"changed": {"fields": ["SponsorComapnyLogo"]}}]	55	3	2026-01-09 11:37:54.773715
138	8	eventSponsors object (8)	2	[{"changed": {"fields": ["SponsorComapnyLogo"]}}]	55	3	2026-01-09 11:38:03.360721
139	7	eventSponsors object (7)	2	[{"changed": {"fields": ["SponsorComapnyLogo"]}}]	55	3	2026-01-09 11:38:13.331565
140	1	eventSponsors object (1)	2	[{"changed": {"fields": ["SponsorComapnyLogo"]}}]	55	3	2026-01-09 11:38:22.175052
141	3	relatedEvents object (3)	2	[{"changed": {"fields": ["EventImage", "EventHoverImage"]}}]	59	3	2026-01-09 11:39:31.400213
142	2	relatedEvents object (2)	2	[{"changed": {"fields": ["EventImage", "EventHoverImage"]}}]	59	3	2026-01-09 11:39:44.798498
143	1	relatedEvents object (1)	2	[{"changed": {"fields": ["EventImage", "EventHoverImage"]}}]	59	3	2026-01-09 11:39:58.94151
144	1	companiesLogoSection object (1)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:45:10.810232
145	2	companiesLogoSection object (2)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:45:22.061236
146	3	companiesLogoSection object (3)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:45:29.347501
147	4	companiesLogoSection object (4)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:45:37.213436
148	5	companiesLogoSection object (5)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:45:53.888535
149	6	companiesLogoSection object (6)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:46:00.210255
150	7	companiesLogoSection object (7)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:46:06.790099
151	8	companiesLogoSection object (8)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:46:14.021039
152	9	companiesLogoSection object (9)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:46:22.650813
153	10	companiesLogoSection object (10)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:46:29.836605
154	11	companiesLogoSection object (11)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:46:37.647748
155	12	companiesLogoSection object (12)	2	[{"changed": {"fields": ["LogoLink"]}}]	15	3	2026-01-09 11:46:44.232065
156	2	generalNewsPoint object (2)	2	[{"changed": {"fields": ["NewsImage"]}}]	42	3	2026-01-09 11:47:53.812884
157	3	generalNewsPoint object (3)	2	[{"changed": {"fields": ["NewsImage"]}}]	42	3	2026-01-09 11:48:04.770165
158	4	generalNewsPoint object (4)	2	[{"changed": {"fields": ["NewsImage"]}}]	42	3	2026-01-09 11:48:16.318138
159	5	generalNewsPoint object (5)	2	[{"changed": {"fields": ["NewsImage"]}}]	42	3	2026-01-09 11:48:27.730288
160	6	generalNewsPoint object (6)	2	[{"changed": {"fields": ["NewsImage"]}}]	42	3	2026-01-09 11:48:39.101244
161	7	generalNewsPoint object (7)	2	[{"changed": {"fields": ["NewsImage"]}}]	42	3	2026-01-09 11:48:48.846967
162	8	generalNewsPoint object (8)	2	[{"changed": {"fields": ["NewsImage"]}}]	42	3	2026-01-09 11:49:25.96593
163	9	generalNewsPoint object (9)	2	[{"changed": {"fields": ["NewsImage"]}}]	42	3	2026-01-09 11:49:39.056649
164	10	generalNewsPoint object (10)	2	[{"changed": {"fields": ["NewsImage"]}}]	42	3	2026-01-09 11:49:46.86005
165	11	generalNewsPoint object (11)	2	[{"changed": {"fields": ["NewsImage"]}}]	42	3	2026-01-09 11:49:55.984488
166	2	homePageNavLogoData object (2)	2	[{"changed": {"fields": ["WhiteLogoLink", "BlackLogoLink"]}}]	7	3	2026-01-09 11:50:12.22328
167	1	homePageThirdSection object (1)	2	[{"changed": {"fields": ["ThirdSectionBackgroundImage"]}}]	23	3	2026-01-09 11:50:38.875209
168	2	homePageVideoSectionInput object (2)	2	[{"changed": {"fields": ["VideoLinkmp4", "VideoLinkwebm", "EventDetailBackImage", "VideoReplaceImage", "EventStataticsBackImage", "EventExpertSpeakerBackImage"]}}]	10	3	2026-01-09 11:51:05.629064
169	8	venuePageGallery object (8)	2	[{"changed": {"fields": ["GallerySectionOneBigImage", "GallerySectionOneSmallImage", "GallerySectionTwoBigImage", "GallerySectionTwoSmallImage", "GallerySectionThreeBigImage", "GallerySectionThreeSmallImage"]}}]	40	3	2026-01-09 11:53:51.691018
170	12	eventSpeakers object (12)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-16 15:11:23.918769
171	11	eventSpeakers object (11)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-16 15:12:45.720515
172	10	eventSpeakers object (10)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-16 15:13:10.091634
173	9	eventSpeakers object (9)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-16 15:13:55.918694
174	8	eventSpeakers object (8)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-16 15:14:33.701341
175	7	eventSpeakers object (7)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-16 15:15:14.20195
176	6	eventSpeakers object (6)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-16 15:16:29.945169
177	5	eventSpeakers object (5)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-16 15:16:59.761717
178	4	eventSpeakers object (4)	2	[{"changed": {"fields": ["EventSpeakerHomePageImage", "EventSpeakerProfilePageImage", "EventSpeakerFeaturedPageImage"]}}]	14	3	2026-01-16 15:17:20.54577
179	1	eventExpertSpeakers object (1)	2	[{"changed": {"fields": ["ExpertSpeakerName", "ExpertSpeakerCompany"]}}]	49	3	2026-01-16 15:25:43.781114
180	2	eventExpertSpeakers object (2)	2	[{"changed": {"fields": ["ExpertSpeakerName", "ExpertSpeakerCompany"]}}]	49	3	2026-01-16 15:26:10.642872
181	1	eventExpertSpeakers object (1)	2	[{"changed": {"fields": ["ExpertSpeakerCompany"]}}]	49	3	2026-01-16 15:26:19.730705
182	3	eventExpertSpeakers object (3)	2	[{"changed": {"fields": ["ExpertSpeakerName", "ExpertSpeakerCompany"]}}]	49	3	2026-01-16 15:26:54.534429
183	9	pastAttandeeHomeData object (9)	2	[{"changed": {"fields": ["AttandeeName"]}}]	83	3	2026-01-16 15:30:59.010907
184	8	pastAttandeeHomeData object (8)	2	[{"changed": {"fields": ["AttandeeName"]}}]	83	3	2026-01-16 15:32:14.923703
185	7	pastAttandeeHomeData object (7)	2	[{"changed": {"fields": ["AttandeeName"]}}]	83	3	2026-01-16 15:32:22.763335
186	6	pastAttandeeHomeData object (6)	2	[{"changed": {"fields": ["AttandeeName"]}}]	83	3	2026-01-16 15:32:29.835574
187	5	pastAttandeeHomeData object (5)	2	[{"changed": {"fields": ["AttandeeName"]}}]	83	3	2026-01-16 15:32:37.041198
188	4	pastAttandeeHomeData object (4)	2	[{"changed": {"fields": ["AttandeeName"]}}]	83	3	2026-01-16 15:32:48.409917
189	3	pastAttandeeHomeData object (3)	2	[{"changed": {"fields": ["AttandeeName"]}}]	83	3	2026-01-16 15:32:55.828651
190	2	pastAttandeeHomeData object (2)	2	[{"changed": {"fields": ["AttandeeName"]}}]	83	3	2026-01-16 15:33:03.384242
191	1	pastAttandeeHomeData object (1)	2	[{"changed": {"fields": ["AttandeeName"]}}]	83	3	2026-01-16 15:33:12.265323
192	2	eventPastAttandees object (2)	2	[{"changed": {"fields": ["PastAttandeeName", "PastAttandeeLogo"]}}]	54	3	2026-01-19 13:43:21.911012
193	3	eventPastAttandees object (3)	2	[{"changed": {"fields": ["PastAttandeeName", "PastAttandeeLogo"]}}]	54	3	2026-01-19 13:43:52.839292
194	3	eventPastAttandees object (3)	2	[{"changed": {"fields": ["PastAttandeeName"]}}]	54	3	2026-01-19 13:44:15.899472
195	4	eventPastAttandees object (4)	2	[{"changed": {"fields": ["PastAttandeeName", "PastAttandeeLogo"]}}]	54	3	2026-01-19 13:44:41.364728
196	5	eventPastAttandees object (5)	2	[{"changed": {"fields": ["PastAttandeeName", "PastAttandeeLogo"]}}]	54	3	2026-01-19 13:45:17.357332
197	6	eventPastAttandees object (6)	2	[{"changed": {"fields": ["PastAttandeeName", "PastAttandeeLogo"]}}]	54	3	2026-01-19 13:45:45.029961
198	7	eventPastAttandees object (7)	2	[{"changed": {"fields": ["PastAttandeeName", "PastAttandeeLogo"]}}]	54	3	2026-01-19 13:46:10.374823
199	8	eventPastAttandees object (8)	2	[{"changed": {"fields": ["PastAttandeeName", "PastAttandeeLogo"]}}]	54	3	2026-01-19 13:46:39.224411
200	9	eventPastAttandees object (9)	2	[{"changed": {"fields": ["PastAttandeeName", "PastAttandeeLogo"]}}]	54	3	2026-01-19 13:47:06.563918
201	10	eventPastAttandees object (10)	2	[{"changed": {"fields": ["PastAttandeeName", "PastAttandeeLogo"]}}]	54	3	2026-01-19 13:47:32.733585
202	11	eventPastAttandees object (11)	2	[{"changed": {"fields": ["PastAttandeeName", "PastAttandeeLogo"]}}]	54	3	2026-01-19 13:48:03.087034
203	51	eventAgenda object (51)	3		47	3	2026-01-19 14:35:32.077248
204	50	eventAgenda object (50)	3		47	3	2026-01-19 14:35:43.551545
205	47	eventAgenda object (47)	3		47	3	2026-01-19 14:37:02.745081
206	46	eventAgenda object (46)	3		47	3	2026-01-19 14:37:02.745154
207	2	homePageVideoSectionInput object (2)	2	[{"changed": {"fields": ["EventStataticsBackImage"]}}]	10	2	2026-02-12 15:07:17.936509
208	2	homePageVideoSectionInput object (2)	2	[{"changed": {"fields": ["EventExpertSpeakerBackImage"]}}]	10	2	2026-02-12 15:07:42.081651
209	2	homePageVideoSectionInput object (2)	2	[{"changed": {"fields": ["EventExpertSpeakerBackImage"]}}]	10	2	2026-02-12 15:12:47.065577
210	1	eventIndustryTrends object (1)	2	[{"changed": {"fields": ["TrendMetaTitle", "TrendMetaDescription"]}}]	52	2	2026-03-03 13:42:19.794748
211	2	eventIndustryTrends object (2)	2	[{"changed": {"fields": ["TrendMetaTitle", "TrendMetaDescription"]}}]	52	2	2026-03-03 13:47:28.306827
212	3	eventIndustryTrends object (3)	2	[{"changed": {"fields": ["TrendMetaTitle", "TrendMetaDescription"]}}]	52	2	2026-03-03 13:59:27.072205
213	4	eventIndustryTrends object (4)	2	[{"changed": {"fields": ["TrendMetaTitle", "TrendMetaDescription"]}}]	52	2	2026-03-03 14:00:05.55044
214	5	eventIndustryTrends object (5)	2	[{"changed": {"fields": ["TrendMetaTitle", "TrendMetaDescription"]}}]	52	2	2026-03-03 14:00:50.002985
215	53	eventAgenda object (53)	3		47	2	2026-03-09 10:17:14.950477
216	52	eventAgenda object (52)	3		47	2	2026-03-09 10:17:14.950537
217	45	eventAgenda object (45)	3		47	2	2026-03-09 10:17:14.950559
218	44	eventAgenda object (44)	3		47	2	2026-03-09 10:17:14.950578
219	43	eventAgenda object (43)	3		47	2	2026-03-09 10:17:14.950596
220	42	eventAgenda object (42)	3		47	2	2026-03-09 10:17:14.950614
221	41	eventAgenda object (41)	3		47	2	2026-03-09 10:17:14.950631
222	40	eventAgenda object (40)	3		47	2	2026-03-09 10:17:14.950648
223	39	eventAgenda object (39)	3		47	2	2026-03-09 10:17:14.950665
224	38	eventAgenda object (38)	3		47	2	2026-03-09 10:17:14.950691
225	37	eventAgenda object (37)	3		47	2	2026-03-09 10:17:14.950711
226	36	eventAgenda object (36)	3		47	2	2026-03-09 10:17:14.950728
227	35	eventAgenda object (35)	3		47	2	2026-03-09 10:17:14.950745
228	34	eventAgenda object (34)	3		47	2	2026-03-09 10:17:14.950762
229	33	eventAgenda object (33)	3		47	2	2026-03-09 10:17:14.950779
230	32	eventAgenda object (32)	3		47	2	2026-03-09 10:17:14.950796
231	31	eventAgenda object (31)	3		47	2	2026-03-09 10:17:14.950813
232	30	eventAgenda object (30)	3		47	2	2026-03-09 10:17:14.95083
233	29	eventAgenda object (29)	3		47	2	2026-03-09 10:17:14.950847
234	28	eventAgenda object (28)	3		47	2	2026-03-09 10:17:14.950864
235	27	eventAgenda object (27)	3		47	2	2026-03-09 10:17:14.95088
236	26	eventAgenda object (26)	3		47	2	2026-03-09 10:17:14.950897
237	25	eventAgenda object (25)	3		47	2	2026-03-09 10:17:14.950914
238	24	eventAgenda object (24)	3		47	2	2026-03-09 10:17:14.950931
239	23	eventAgenda object (23)	3		47	2	2026-03-09 10:17:14.950948
240	22	eventAgenda object (22)	3		47	2	2026-03-09 10:17:14.950965
241	21	eventAgenda object (21)	3		47	2	2026-03-09 10:17:14.950982
242	20	eventAgenda object (20)	3		47	2	2026-03-09 10:17:14.950998
243	19	eventAgenda object (19)	3		47	2	2026-03-09 10:17:14.951017
244	18	eventAgenda object (18)	3		47	2	2026-03-09 10:17:14.951042
245	17	eventAgenda object (17)	3		47	2	2026-03-09 10:17:14.951059
246	16	eventAgenda object (16)	3		47	2	2026-03-09 10:17:14.951075
247	15	eventAgenda object (15)	3		47	2	2026-03-09 10:17:14.951092
248	14	eventAgenda object (14)	3		47	2	2026-03-09 10:17:14.951109
249	13	eventAgenda object (13)	3		47	2	2026-03-09 10:17:14.951126
250	12	eventAgenda object (12)	3		47	2	2026-03-09 10:17:14.951143
251	11	eventAgenda object (11)	3		47	2	2026-03-09 10:17:14.951159
252	10	eventAgenda object (10)	3		47	2	2026-03-09 10:17:14.951177
253	9	eventAgenda object (9)	3		47	2	2026-03-09 10:17:14.951194
254	8	eventAgenda object (8)	3		47	2	2026-03-09 10:17:14.951211
255	7	eventAgenda object (7)	3		47	2	2026-03-09 10:17:14.951228
256	6	eventAgenda object (6)	3		47	2	2026-03-09 10:17:14.951246
257	5	eventAgenda object (5)	3		47	2	2026-03-09 10:17:14.951263
258	4	eventAgenda object (4)	3		47	2	2026-03-09 10:17:14.95128
259	3	eventAgenda object (3)	3		47	2	2026-03-09 10:17:14.951297
260	2	eventAgenda object (2)	3		47	2	2026-03-09 10:17:14.951314
261	1	eventAgenda object (1)	3		47	2	2026-03-09 10:17:14.951331
262	1	SidebarModule object (1)	1	[{"added": {}}]	87	2	2026-03-11 08:05:02.271398
264	3	SidebarModule object (3)	1	[{"added": {}}]	87	2	2026-03-11 08:05:41.258128
265	4	SidebarModule object (4)	1	[{"added": {}}]	87	2	2026-03-11 08:05:57.83004
266	5	SidebarModule object (5)	1	[{"added": {}}]	87	2	2026-03-11 08:06:18.28129
267	51	SidebarSubModule object (51)	1	[{"added": {}}]	88	2	2026-03-13 11:54:28.589187
268	51	SidebarSubModule object (51)	2	[]	88	2	2026-03-13 11:56:31.907946
269	52	SidebarSubModule object (52)	1	[{"added": {}}]	88	2	2026-03-13 11:59:26.559588
270	1	slideSharesAccessPersons object (1)	1	[{"added": {}}]	91	2	2026-03-17 09:15:58.069552
271	53	SidebarSubModule object (53)	1	[{"added": {}}]	88	2	2026-03-17 11:16:26.163917
272	54	SidebarSubModule object (54)	1	[{"added": {}}]	88	2	2026-03-18 12:45:06.787068
273	54	SidebarSubModule object (54)	2	[{"changed": {"fields": ["Link"]}}]	88	2	2026-03-18 12:45:22.61615
274	54	SidebarSubModule object (54)	2	[]	88	2	2026-03-18 12:45:32.090314
275	1	blockedEmailDomains object (1)	1	[{"added": {}}]	93	2	2026-03-31 15:40:22.253372
276	55	SidebarSubModule object (55)	1	[{"added": {}}]	88	2	2026-04-01 11:07:37.579463
277	56	SidebarSubModule object (56)	1	[{"added": {}}]	88	2	2026-04-09 09:40:35.404086
278	57	SidebarSubModule object (57)	1	[{"added": {}}]	88	2	2026-04-09 12:25:53.582894
279	2	agendaSubscriber object (2)	3		96	2	2026-04-10 10:33:57.67586
280	1	agendaSubscriber object (1)	3		96	2	2026-04-10 10:33:57.675935
281	58	SidebarSubModule object (58)	1	[{"added": {}}]	88	2	2026-04-10 10:36:22.104203
282	59	SidebarSubModule object (59)	1	[{"added": {}}]	88	2	2026-04-10 10:36:52.08621
283	4	slideSharesAccessPersons object (4)	3		91	2	2026-04-13 13:42:27.242623
284	3	slideSharesAccessPersons object (3)	2	[{"changed": {"fields": ["ProjectId"]}}]	91	2	2026-04-13 13:42:33.949087
285	2	slideSharesAccessPersons object (2)	3		91	2	2026-04-13 13:42:42.202921
286	1	slideSharesAccessPersons object (1)	2	[{"changed": {"fields": ["ProjectId"]}}]	91	2	2026-04-13 13:42:48.549772
287	1	eventSlideShares object (1)	3		89	2	2026-04-13 14:43:34.816363
288	2	eventSlideShares object (2)	2	[{"changed": {"fields": ["ProjectId"]}}]	89	2	2026-04-13 14:43:43.012989
289	3	eventSlideShares object (3)	3		89	2	2026-04-13 14:43:50.125181
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	Myadmin	homepagenavlogodata
8	Myadmin	homepagenavmaincategories
9	Myadmin	homepagenavsubcategories
10	Myadmin	homepagevideosectioninput
11	Myadmin	videosectionuseroptions
12	Event	eventdetails
13	Myadmin	speakersection
14	Event	eventspeakers
15	Myadmin	companieslogosection
16	Myadmin	contactusdata
17	Myadmin	contactushelpdata
18	Myadmin	contactuspagedata
19	Myadmin	countsection
20	Myadmin	countsectiontopic
21	Myadmin	footerfirstsectionoptions
22	Myadmin	footersocialmediaoptions
23	Myadmin	homepagethirdsection
24	Myadmin	keypointssection
25	Myadmin	keypointssectionpoints
26	Myadmin	pastattandeessection
27	Myadmin	pressmediapageboxdata
28	Myadmin	pressmediapagedata
29	Myadmin	registerpagesettings
30	Myadmin	speakerpagedata
31	Myadmin	speakerpagesectionthreepoints
32	Myadmin	sponsorpackagepagedata
33	Myadmin	sponsorpagebulletdata
34	Myadmin	sponsorpagedata
35	Myadmin	sponsorsection
36	Myadmin	subscribers
37	Myadmin	testimonialsection
38	Myadmin	themecolorsettings
39	Myadmin	venuepagedata
40	Myadmin	venuepagegallery
41	Myadmin	whoshouldattendpagedata
42	Myadmin	generalnewspoint
43	Myadmin	newscategory
44	Myadmin	topnews
45	Myadmin	latestnews
46	Event	deligatepackageinclusionpoints
47	Event	eventagenda
48	Event	eventcoreattandees
49	Event	eventexpertspeakers
50	Event	eventfaqs
51	Event	eventgeneralsettings
52	Event	eventindustrytrends
53	Event	eventparticipatedindustries
54	Event	eventpastattandees
55	Event	eventsponsors
56	Event	eventtestimonials
57	Event	grouppassregistrationrequestdata
58	Event	paymentoptionimage
59	Event	relatedevents
60	Event	registeredcompanydetails
61	Event	eventdeligatepackages
62	Event	delegatetransectiondata
63	Event	delegatesaddons
64	Event	registereddelegates
65	Event	addonshistory
66	Event	offercouponhistory
67	Event	offercoupon
68	Event	sponsoredcompanyaddonsdetails
69	Event	sponsorpackageaddons
70	Event	sponseredcompanydetails
71	Event	sponsorpackageinclusions
72	Event	sponsorcompanytransectiondata
73	Event	sponsorpackagetypes
74	Event	sponsorbenefits
75	Event	sponsorpackageaddontypes
76	Event	registeredsponsereddelegates
77	Event	sponsoroffercouponhistory
78	Myadmin	mediapagehelpers
79	Myadmin	standoutcrowdrequestdata
80	Myadmin	becomespeakerrequestdata
81	Myadmin	quickproposalrequestdata
82	Myadmin	enduserpassregistrationrequestdata
83	Myadmin	pastattandeehomedata
84	Event	eventleaders
85	Myadmin	adminrole
86	Myadmin	adminuser
87	Myadmin	sidebarmodule
88	Myadmin	sidebarsubmodule
89	Event	eventslideshares
90	Event	eventslidesharesattandees
91	Event	slidesharesaccesspersons
92	Event	payonlinetransectiondata
93	Event	blockedemaildomains
94	Myadmin	footeroptions
95	Myadmin	toemails
96	Myadmin	agendasubscriber
97	Myadmin	calendersubscriber
98	Event	sponsoroffercoupon
99	Event	eventproject
100	Event	pageseosettings
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2025-05-14 11:59:58.634471
2	auth	0001_initial	2025-05-14 11:59:58.759554
3	admin	0001_initial	2025-05-14 11:59:58.863041
4	admin	0002_logentry_remove_auto_add	2025-05-14 11:59:58.935404
5	admin	0003_logentry_add_action_flag_choices	2025-05-14 11:59:58.994124
6	contenttypes	0002_remove_content_type_name	2025-05-14 11:59:59.074957
7	auth	0002_alter_permission_name_max_length	2025-05-14 11:59:59.139566
8	auth	0003_alter_user_email_max_length	2025-05-14 11:59:59.195879
9	auth	0004_alter_user_username_opts	2025-05-14 11:59:59.251473
10	auth	0005_alter_user_last_login_null	2025-05-14 11:59:59.284813
11	auth	0006_require_contenttypes_0002	2025-05-14 11:59:59.329802
12	auth	0007_alter_validators_add_error_messages	2025-05-14 11:59:59.388691
13	auth	0008_alter_user_username_max_length	2025-05-14 11:59:59.445738
14	auth	0009_alter_user_last_name_max_length	2025-05-14 11:59:59.500192
15	auth	0010_alter_group_name_max_length	2025-05-14 11:59:59.553998
16	auth	0011_update_proxy_permissions	2025-05-14 11:59:59.611336
17	auth	0012_alter_user_first_name_max_length	2025-05-14 11:59:59.675108
18	sessions	0001_initial	2025-05-14 11:59:59.771096
19	Myadmin	0001_initial	2025-05-14 12:28:53.116915
20	Myadmin	0002_homepagenavmaincategories_homepagenavsubcategories	2025-05-14 13:04:10.945852
21	Event	0001_initial	2025-05-21 06:36:42.933004
22	Myadmin	0003_homepagevideosectioninput_videosectionuseroptions	2025-05-21 06:36:43.011089
23	Event	0002_eventspeakers	2025-05-21 07:26:38.380762
24	Myadmin	0004_speakersection_and_more	2025-05-21 07:26:38.446744
25	Event	0003_delegatesaddons_deligatepackageinclusionpoints_and_more	2025-05-29 07:19:09.081186
26	Myadmin	0005_companieslogosection_contactusdata_contactushelpdata_and_more	2025-05-29 07:19:09.292436
27	Event	0004_eventspeakers_eventspeakerprofilepagedescription	2025-06-02 15:26:05.993305
28	Myadmin	0006_sponsorpagedata_introparaimage	2025-06-09 09:40:35.582153
29	Event	0005_sponsoroffercouponhistory	2025-06-18 09:53:46.918646
30	Event	0006_eventspeakers_eventspeakershortdescription	2025-07-16 07:59:36.901794
31	Event	0007_rename_eventspeakeragendapageimage_eventspeakers_eventspeakerfeaturedpageimage	2025-07-16 15:20:08.405091
32	Event	0008_eventsponsors_sponsorwebsite	2025-07-17 13:40:53.802675
33	Myadmin	0007_venuepagedata_venueaddresslink_and_more	2025-07-23 15:03:10.817051
34	Event	0009_eventpastattandees_pastattandeelogo	2025-07-25 12:23:03.172674
35	Event	0010_remove_sponsorpackageinclusions_sponsorbenifitid_and_more	2025-08-01 11:00:20.353486
36	Myadmin	0008_generalnewspoint_newsshortdescription	2025-08-07 13:43:56.054794
37	Myadmin	0009_generalnewspoint_istopnews	2025-08-11 10:10:08.406103
38	Myadmin	0010_mediapagehelpers	2025-08-15 11:12:54.160948
39	Myadmin	0011_alter_venuepagedata_venueaddresslink_and_more	2025-08-18 11:24:20.435109
40	Myadmin	0012_standoutcrowdrequestdata	2025-08-19 11:17:59.058079
41	Myadmin	0013_becomespeakerrequestdata	2025-08-19 12:19:26.774614
42	Myadmin	0014_quickproposalrequestdata	2025-08-20 11:30:48.062694
43	Myadmin	0015_enduserpassregistrationrequestdata	2025-08-21 10:30:21.458747
44	Myadmin	0016_pastattandeehomedata	2025-08-21 11:56:06.163629
45	Event	0011_eventleaders	2025-08-21 12:38:42.918888
46	Event	0012_remove_eventagenda_dayname_and_more	2025-09-12 15:00:16.216789
47	Myadmin	0017_remove_homepagevideosectioninput_videolink_and_more	2025-09-23 08:19:47.419029
48	Event	0013_eventgeneralsettings_currencysymbol	2025-09-23 09:23:07.716805
49	Myadmin	0018_homepagevideosectioninput_eventexpertspeakerbackimage_and_more	2025-09-23 09:50:12.461661
50	Myadmin	0019_homepagevideosectioninput_videoreplaceimage	2025-09-24 13:29:19.858874
51	Myadmin	0020_remove_footersocialmediaoptions_platformicon_and_more	2025-09-26 07:23:58.643707
52	Event	0014_eventdetails_eventshortcode	2025-10-03 07:24:13.334925
53	Event	0015_alter_eventagenda_sortorder	2025-10-08 07:55:29.658961
54	Event	0016_sponsorcompanytransectiondata_additionaldelegateamoount	2025-10-15 09:09:35.600786
55	Event	0017_eventdetails_isseoenable_and_more	2025-12-02 14:30:10.766457
56	Myadmin	0021_generalnewspoint_newsimagealttext_and_more	2025-12-02 14:30:10.876901
57	Event	0018_eventindustrytrends_trendmetadescription_and_more	2026-03-03 13:12:20.777474
58	Myadmin	0022_adminrole_sidebarmodule_sidebarsubmodule_adminuser_and_more	2026-03-11 07:32:03.886797
59	Event	0019_eventagenda_panelspeakers_and_more	2026-03-12 11:31:44.983916
60	Event	0020_eventdetails_agendaversion	2026-03-12 15:26:06.693637
61	Event	0021_eventspeakers_eventspeakerlinkedinfollowers	2026-03-13 10:11:56.693027
62	Event	0022_eventslideshares_eventslidesharesattandees	2026-03-13 14:07:47.503361
63	Event	0023_slidesharesaccesspersons	2026-03-17 07:45:39.003572
64	Event	0024_payonlinetransectiondata	2026-03-18 12:03:27.733891
65	Event	0025_blockedemaildomains	2026-03-31 12:55:02.355557
66	Myadmin	0023_homepagenavmaincategories_ischecked_and_more	2026-04-09 09:57:43.053514
67	Myadmin	0024_footeroptions	2026-04-09 12:07:54.068043
68	Myadmin	0025_toemails	2026-04-09 13:49:44.214809
69	Myadmin	0026_agendasubscriber_calendersubscriber	2026-04-10 09:47:09.617793
70	Event	0026_sponsoroffercoupon	2026-04-10 14:52:47.935421
71	Event	0027_eventproject_eventslideshares_projectid_and_more	2026-04-13 12:13:09.534563
72	Event	0028_eventdetails_contacthubspotid_and_more	2026-04-15 06:46:29.656111
73	Myadmin	0027_themecolorsettings_editorstyle_and_more	2026-04-15 06:46:29.734326
74	Event	0002_sponsoroffercoupon	2026-04-17 07:28:41.06903
75	Event	0003_eventproject	2026-04-17 07:28:41.072708
76	Event	0004_eventslideshares_projectid_and_more	2026-04-17 07:28:41.073437
77	Event	0005_eventdetails_contacthubspotid_and_more	2026-04-17 07:28:41.074146
78	Myadmin	0002_footeroptions	2026-04-17 07:28:41.074792
79	Myadmin	0003_toemails	2026-04-17 07:28:41.075584
80	Myadmin	0004_agendasubscriber_calendersubscriber	2026-04-17 07:28:41.076414
81	Myadmin	0005_themecolorsettings_editorstyle_and_more	2026-04-17 07:28:41.077113
82	Event	0006_pageseosettings	2026-04-22 10:21:51.657318
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
1sst8ew3yrt6zc8b26abqm8xpfjp3v3z	.eJxVjMsOgyAUBf-FdUMAFa5ddu83GO6DYttgIrpq-u8NiYt2e2bmvNUcjz3PR5VtXlhdlVWX3w0jPaU0wI9Y7qumtezbgrop-qRVTyvL63a6fwc51tzqBBESdtYhCgOIcBBkHGl0aK01AxkfKCTueqDoZJDQsw3kjfcAqD5fHo04zA:1uFAnI:J-i8eP82GLgB1VFVmQM_H1QRwXOy9WkmAXxdGeSdkAU	2025-05-28 12:01:04.186013
bh7b2c1zg9wu7gkaaasvql39okykcepj	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1uKXYW:HvyVT-lLk_xo56zyB_3K9ETXRdqPzO1LftHdJLeeNws	2025-06-12 07:20:00.263293
twlvfnedbijetx8dz9fpu9g2c389yurg	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1uPJiY:aWffMkKoDxT2J2zc1XyZBKJQv3KR17ZZYzTLQroaL0o	2025-06-25 11:34:06.695516
yk1e17lywjhruvhjuityz2uoub1dp8ko	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1ubwjv:i7m7slbi-F5s5k1URri04zLdOHOzacs-aBvEckdXbvw	2025-07-30 07:39:43.217906
f7pxmz4lnpt4k4mwbd9fvv6s7truck1f	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1uhPtc:yomm542RufMhZJg0mkjKmPl5Jb6D6gUymbBxfTq5lfI	2025-08-14 09:48:20.66774
gdpy1cyojhpftgil4nrmj2ixohzyim8u	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1uhURS:Cpvo1RkVrSpnc3Dymfd3A7_q24fJyTNsUW9xW-Y5ghU	2025-08-14 14:39:34.651636
r5elz2dnzm9aqdczt02qkadm1ylgq2ds	.eJxVjMsOgyAUBf-FdUMAFa5ddu83GO6DYttgIrpq-u8NiYt2e2bmvNUcjz3PR5VtXlhdlVWX3w0jPaU0wI9Y7qumtezbgrop-qRVTyvL63a6fwc51tzqBBESdtYhCgOIcBBkHGl0aK01AxkfKCTueqDoZJDQsw3kjfcAqD5fHo04zA:1unxyb:Tg3yTqu1fCFzpOBRmxQjja6MGl1fFI2-39fT_NNCPMk	2025-09-01 11:24:33.302859
5hnmwjmjzbilnib7ez69wqlyp94d31xh	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1uvyGf:EkUeviyWTAp2McDpOb4SOC01xEXq3uReV1gDhYJQuXA	2025-09-23 13:20:17.731174
gqmd4m080wee260ca9zumuxb2aio3b8m	.eJxVjMsOgyAUBf-FdUMAFa5ddu83GO6DYttgIrpq-u8NiYt2e2bmvNUcjz3PR5VtXlhdlVWX3w0jPaU0wI9Y7qumtezbgrop-qRVTyvL63a6fwc51tzqBBESdtYhCgOIcBBkHGl0aK01AxkfKCTueqDoZJDQsw3kjfcAqD5fHo04zA:1v14xC:nxoPFUn0viRilOONeLsyQtKmV8UBlv8jwuDmx5_qkz0	2025-10-07 15:29:18.055253
pn2daf5tggms9tkha8r6ihcuzcndr4zr	.eJxVjMsOgyAUBf-FdUMAFa5ddu83GO6DYttgIrpq-u8NiYt2e2bmvNUcjz3PR5VtXlhdlVWX3w0jPaU0wI9Y7qumtezbgrop-qRVTyvL63a6fwc51tzqBBESdtYhCgOIcBBkHGl0aK01AxkfKCTueqDoZJDQsw3kjfcAqD5fHo04zA:1v6OQJ:GKuaHdy62DBMKtpSft4T8mO6O8qUVUdMnyJi6jNx-zo	2025-10-22 07:17:19.051248
lns3jm6j7z6lm9ht807mgds4oaebkm4z	.eJxVjEEOwiAQRe8ya0OAFgou3XsGMjCDVA0kpV0Z765NutDtf-_9FwTc1hK2zkuYCc4wwOl3i5geXHdAd6y3JlKr6zJHsSvioF1cG_Hzcrh_BwV7-daT0mRwyNYgUp48Sx81jylJymwNkfU2ytGSU8ojO0TMmp3TUrFmZeD9AQN_OJE:1ve9kK:xz8GxrLGF3GvJgo9QZtmpnOueZTTMxH85y0LOIi-8WU	2026-01-23 10:29:32.910454
spwdx3e3fla7g1ce2rthykjsd85hw360	.eJxVjEEOwiAQRe8ya0OAFgou3XsGMjCDVA0kpV0Z765NutDtf-_9FwTc1hK2zkuYCc4wwOl3i5geXHdAd6y3JlKr6zJHsSvioF1cG_Hzcrh_BwV7-daT0mRwyNYgUp48Sx81jylJymwNkfU2ytGSU8ojO0TMmp3TUrFmZeD9AQN_OJE:1vglQc:hvdXbA3lraBZQHleSdt3vysG_oJ-94ABA-Nv0Jr3q60	2026-01-30 15:07:58.527656
iurdv24hk42e9knzwk58o2vfmtw3s6m7	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1vpp3G:yxJzVcV8qrK72BBHhvLQ4Xp4g_Fd3Pee5jOtasJRZqo	2026-02-24 14:49:18.501713
h7s21lyt7kunq209je8t5n1j6fxcltc3	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1vxPkP:lAzshUS8jIHJiE_RTOQZkPQI6rQG0iBskKpE3EIbDUY	2026-03-17 13:25:13.559416
gmrjojv73h0w1mdqaq3skm23fxia6ep1	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1vzX49:vHLtQOqEiJYIi7XDgvdj-S0gNMjZN0inoB6x7hAwvGc	2026-03-23 09:38:21.281849
79fm7qk08qakulie6buugw9vggcemsyr	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1w0EWl:iWZuiRZGKa9glo1hsAwr7G-1xbhwYKrxEWcsAndfIo8	2026-03-25 08:02:47.736832
gooi8byvshxtm8bag0d3ebx7nvwrxeaq	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1w2qE3:tRpM9uWQ4vXX4fTiMSa0gAydV1gXvymjGST_o2e7-bw	2026-04-01 12:42:15.078391
3jt02fb227yo6uv6wxoniu97c23olveo	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1w7b9G:fCBteBmKP5rtDGA1HexpLADVIW7vYKpyAKzpezd_IKY	2026-04-14 15:36:58.624519
3vjtrpo2cj8o2y4rul8w3d5bqm6d20z6	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1w7bZg:HEWhqNVMoItXgxkre3bORLrPRyqwYIRFTAIMHfpCmKU	2026-04-14 16:04:16.598411
28tdbp6zyar4zj5fjq72lxax0fzkt9cg	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1wB9BJ:cBsIH-aEsRMXSuyP_nH66S8iKR0hZnTkQ6kbc4jgZpU	2026-04-24 10:33:45.621248
8pyrolhdclolo1wrdr5lbhjjx4o3wzlt	.eJxVjMsOwiAURP-FtSF4ebt07zcQ4F6kaiAp7cr477ZJFzrLOWfmzUJclxrWQXOYkF0YsNNvl2J-UtsBPmK7d557W-Yp8V3hBx381pFe18P9O6hx1G2d0cizyKgcCvQ2eesjkICStoABa0CYWDQQQdEFQBNRMVKBk1o7xT5f7_831Q:1wB9DF:AgVKX2eFU8rkpOYXVreeQakUdAGQLtX-5X94Yenn71Q	2026-04-24 10:35:45.420792
\.


--
-- Name: Event_addonshistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_addonshistory_id_seq"', 26, true);


--
-- Name: Event_blockedemaildomains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_blockedemaildomains_id_seq"', 3, true);


--
-- Name: Event_delegatesaddons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_delegatesaddons_id_seq"', 2, true);


--
-- Name: Event_delegatetransectiondata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_delegatetransectiondata_id_seq"', 15, true);


--
-- Name: Event_deligatepackageinclusionpoints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_deligatepackageinclusionpoints_id_seq"', 1, true);


--
-- Name: Event_eventagenda_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventagenda_id_seq"', 93, true);


--
-- Name: Event_eventcoreattandees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventcoreattandees_id_seq"', 25, true);


--
-- Name: Event_eventdeligatepackages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventdeligatepackages_id_seq"', 4, true);


--
-- Name: Event_eventdetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventdetails_id_seq"', 2, true);


--
-- Name: Event_eventexpertspeakers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventexpertspeakers_id_seq"', 3, true);


--
-- Name: Event_eventfaqs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventfaqs_id_seq"', 19, true);


--
-- Name: Event_eventgeneralsettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventgeneralsettings_id_seq"', 2, true);


--
-- Name: Event_eventindustrytrends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventindustrytrends_id_seq"', 5, true);


--
-- Name: Event_eventleaders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventleaders_id_seq"', 18, true);


--
-- Name: Event_eventparticipatedindustries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventparticipatedindustries_id_seq"', 24, true);


--
-- Name: Event_eventpastattandees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventpastattandees_id_seq"', 12, true);


--
-- Name: Event_eventproject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventproject_id_seq"', 1, true);


--
-- Name: Event_eventslideshares_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventslideshares_id_seq"', 2, true);


--
-- Name: Event_eventslidesharesattandees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventslidesharesattandees_id_seq"', 6, true);


--
-- Name: Event_eventspeakers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventspeakers_id_seq"', 13, true);


--
-- Name: Event_eventsponsors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventsponsors_id_seq"', 12, true);


--
-- Name: Event_eventtestimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_eventtestimonials_id_seq"', 6, true);


--
-- Name: Event_grouppassregistrationrequestdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_grouppassregistrationrequestdata_id_seq"', 1, true);


--
-- Name: Event_offercoupon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_offercoupon_id_seq"', 4, true);


--
-- Name: Event_offercouponhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_offercouponhistory_id_seq"', 1, true);


--
-- Name: Event_pageseosettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_pageseosettings_id_seq"', 1, false);


--
-- Name: Event_paymentoptionimage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_paymentoptionimage_id_seq"', 1, true);


--
-- Name: Event_payonlinetransectiondata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_payonlinetransectiondata_id_seq"', 1, true);


--
-- Name: Event_registeredcompanydetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_registeredcompanydetails_id_seq"', 26, true);


--
-- Name: Event_registereddelegates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_registereddelegates_id_seq"', 28, true);


--
-- Name: Event_registeredsponsereddelegates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_registeredsponsereddelegates_id_seq"', 11, true);


--
-- Name: Event_relatedevents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_relatedevents_id_seq"', 3, true);


--
-- Name: Event_slidesharesaccesspersons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_slidesharesaccesspersons_id_seq"', 5, true);


--
-- Name: Event_sponseredcompanydetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_sponseredcompanydetails_id_seq"', 9, true);


--
-- Name: Event_sponsorcompanytransectiondata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_sponsorcompanytransectiondata_id_seq"', 8, true);


--
-- Name: Event_sponsoredcompanyaddonsdetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_sponsoredcompanyaddonsdetails_id_seq"', 22, true);


--
-- Name: Event_sponsoroffercoupon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_sponsoroffercoupon_id_seq"', 1, true);


--
-- Name: Event_sponsoroffercouponhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_sponsoroffercouponhistory_id_seq"', 1, true);


--
-- Name: Event_sponsorpackageaddons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_sponsorpackageaddons_id_seq"', 15, true);


--
-- Name: Event_sponsorpackageaddontypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_sponsorpackageaddontypes_id_seq"', 4, true);


--
-- Name: Event_sponsorpackagetypes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_sponsorpackagetypes_id_seq"', 3, true);


--
-- Name: Myadmin_adminrole_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_adminrole_id_seq"', 2, true);


--
-- Name: Myadmin_adminrole_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_adminrole_permissions_id_seq"', 59, true);


--
-- Name: Myadmin_adminuser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_adminuser_id_seq"', 5, true);


--
-- Name: Myadmin_adminuser_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_adminuser_permissions_id_seq"', 65, true);


--
-- Name: Myadmin_agendasubscriber_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_agendasubscriber_id_seq"', 6, true);


--
-- Name: Myadmin_becomespeakerrequestdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_becomespeakerrequestdata_id_seq"', 2, true);


--
-- Name: Myadmin_calendersubscriber_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_calendersubscriber_id_seq"', 2, true);


--
-- Name: Myadmin_companieslogosection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_companieslogosection_id_seq"', 22, true);


--
-- Name: Myadmin_contactusdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_contactusdata_id_seq"', 8, true);


--
-- Name: Myadmin_contactushelpdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_contactushelpdata_id_seq"', 5, true);


--
-- Name: Myadmin_contactuspagedata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_contactuspagedata_id_seq"', 1, true);


--
-- Name: Myadmin_countsection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_countsection_id_seq"', 1, true);


--
-- Name: Myadmin_countsectiontopic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_countsectiontopic_id_seq"', 4, true);


--
-- Name: Myadmin_enduserpassregistrationrequestdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_enduserpassregistrationrequestdata_id_seq"', 2, true);


--
-- Name: Myadmin_footerfirstsectionoptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_footerfirstsectionoptions_id_seq"', 1, true);


--
-- Name: Myadmin_footeroptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_footeroptions_id_seq"', 9, true);


--
-- Name: Myadmin_footersocialmediaoptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_footersocialmediaoptions_id_seq"', 1, true);


--
-- Name: Myadmin_generalnewspoint_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_generalnewspoint_id_seq"', 11, true);


--
-- Name: Myadmin_homepagenavlogodata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_homepagenavlogodata_id_seq"', 2, true);


--
-- Name: Myadmin_homepagenavmaincategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_homepagenavmaincategories_id_seq"', 7, true);


--
-- Name: Myadmin_homepagenavsubcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_homepagenavsubcategories_id_seq"', 8, true);


--
-- Name: Myadmin_homepagethirdsection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_homepagethirdsection_id_seq"', 1, true);


--
-- Name: Myadmin_homepagevideosectioninput_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_homepagevideosectioninput_id_seq"', 2, true);


--
-- Name: Myadmin_keypointssection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_keypointssection_id_seq"', 1, true);


--
-- Name: Myadmin_keypointssectionpoints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_keypointssectionpoints_id_seq"', 6, true);


--
-- Name: Myadmin_latestnews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_latestnews_id_seq"', 1, true);


--
-- Name: Myadmin_mediapagehelpers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_mediapagehelpers_id_seq"', 2, true);


--
-- Name: Myadmin_newscategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_newscategory_id_seq"', 8, true);


--
-- Name: Myadmin_pastattandeehomedata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_pastattandeehomedata_id_seq"', 9, true);


--
-- Name: Myadmin_pastattandeessection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_pastattandeessection_id_seq"', 1, true);


--
-- Name: Myadmin_pressmediapageboxdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_pressmediapageboxdata_id_seq"', 1, true);


--
-- Name: Myadmin_pressmediapagedata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_pressmediapagedata_id_seq"', 1, true);


--
-- Name: Myadmin_quickproposalrequestdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_quickproposalrequestdata_id_seq"', 1, true);


--
-- Name: Myadmin_registerpagesettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_registerpagesettings_id_seq"', 1, true);


--
-- Name: Myadmin_sidebarmodule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_sidebarmodule_id_seq"', 5, true);


--
-- Name: Myadmin_sidebarsubmodule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_sidebarsubmodule_id_seq"', 59, true);


--
-- Name: Myadmin_speakerpagedata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_speakerpagedata_id_seq"', 1, true);


--
-- Name: Myadmin_speakerpagesectionthreepoints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_speakerpagesectionthreepoints_id_seq"', 1, true);


--
-- Name: Myadmin_speakersection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_speakersection_id_seq"', 1, true);


--
-- Name: Myadmin_sponsorpackagepagedata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_sponsorpackagepagedata_id_seq"', 1, true);


--
-- Name: Myadmin_sponsorpagebulletdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_sponsorpagebulletdata_id_seq"', 1, true);


--
-- Name: Myadmin_sponsorpagedata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_sponsorpagedata_id_seq"', 1, true);


--
-- Name: Myadmin_sponsorsection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_sponsorsection_id_seq"', 1, true);


--
-- Name: Myadmin_standoutcrowdrequestdata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_standoutcrowdrequestdata_id_seq"', 2, true);


--
-- Name: Myadmin_subscribers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_subscribers_id_seq"', 13, true);


--
-- Name: Myadmin_testimonialsection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_testimonialsection_id_seq"', 1, true);


--
-- Name: Myadmin_themecolorsettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_themecolorsettings_id_seq"', 2, true);


--
-- Name: Myadmin_toemails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_toemails_id_seq"', 1, true);


--
-- Name: Myadmin_topnews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_topnews_id_seq"', 1, true);


--
-- Name: Myadmin_venuepagedata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_venuepagedata_id_seq"', 8, true);


--
-- Name: Myadmin_venuepagegallery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_venuepagegallery_id_seq"', 8, true);


--
-- Name: Myadmin_videosectionuseroptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_videosectionuseroptions_id_seq"', 1, true);


--
-- Name: Myadmin_whoshouldattendpagedata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Myadmin_whoshouldattendpagedata_id_seq"', 1, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, true);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, true);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 400, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, true);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 3, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 289, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 100, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 82, true);


--
-- Name: Event_addonshistory Event_addonshistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_addonshistory"
    ADD CONSTRAINT "Event_addonshistory_pkey" PRIMARY KEY (id);


--
-- Name: Event_blockedemaildomains Event_blockedemaildomains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_blockedemaildomains"
    ADD CONSTRAINT "Event_blockedemaildomains_pkey" PRIMARY KEY (id);


--
-- Name: Event_delegatesaddons Event_delegatesaddons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_delegatesaddons"
    ADD CONSTRAINT "Event_delegatesaddons_pkey" PRIMARY KEY (id);


--
-- Name: Event_delegatetransectiondata Event_delegatetransectiondata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_delegatetransectiondata"
    ADD CONSTRAINT "Event_delegatetransectiondata_pkey" PRIMARY KEY (id);


--
-- Name: Event_deligatepackageinclusionpoints Event_deligatepackageinclusionpoints_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_deligatepackageinclusionpoints"
    ADD CONSTRAINT "Event_deligatepackageinclusionpoints_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventagenda Event_eventagenda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventagenda"
    ADD CONSTRAINT "Event_eventagenda_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventcoreattandees Event_eventcoreattandees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventcoreattandees"
    ADD CONSTRAINT "Event_eventcoreattandees_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventdeligatepackages Event_eventdeligatepackages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventdeligatepackages"
    ADD CONSTRAINT "Event_eventdeligatepackages_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventdetails Event_eventdetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventdetails"
    ADD CONSTRAINT "Event_eventdetails_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventexpertspeakers Event_eventexpertspeakers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventexpertspeakers"
    ADD CONSTRAINT "Event_eventexpertspeakers_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventfaqs Event_eventfaqs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventfaqs"
    ADD CONSTRAINT "Event_eventfaqs_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventgeneralsettings Event_eventgeneralsettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventgeneralsettings"
    ADD CONSTRAINT "Event_eventgeneralsettings_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventindustrytrends Event_eventindustrytrends_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventindustrytrends"
    ADD CONSTRAINT "Event_eventindustrytrends_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventleaders Event_eventleaders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventleaders"
    ADD CONSTRAINT "Event_eventleaders_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventparticipatedindustries Event_eventparticipatedindustries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventparticipatedindustries"
    ADD CONSTRAINT "Event_eventparticipatedindustries_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventpastattandees Event_eventpastattandees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventpastattandees"
    ADD CONSTRAINT "Event_eventpastattandees_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventproject Event_eventproject_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventproject"
    ADD CONSTRAINT "Event_eventproject_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventslideshares Event_eventslideshares_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventslideshares"
    ADD CONSTRAINT "Event_eventslideshares_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventslidesharesattandees Event_eventslidesharesattandees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventslidesharesattandees"
    ADD CONSTRAINT "Event_eventslidesharesattandees_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventspeakers Event_eventspeakers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventspeakers"
    ADD CONSTRAINT "Event_eventspeakers_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventsponsors Event_eventsponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventsponsors"
    ADD CONSTRAINT "Event_eventsponsors_pkey" PRIMARY KEY (id);


--
-- Name: Event_eventtestimonials Event_eventtestimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_eventtestimonials"
    ADD CONSTRAINT "Event_eventtestimonials_pkey" PRIMARY KEY (id);


--
-- Name: Event_grouppassregistrationrequestdata Event_grouppassregistrationrequestdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_grouppassregistrationrequestdata"
    ADD CONSTRAINT "Event_grouppassregistrationrequestdata_pkey" PRIMARY KEY (id);


--
-- Name: Event_offercoupon Event_offercoupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_offercoupon"
    ADD CONSTRAINT "Event_offercoupon_pkey" PRIMARY KEY (id);


--
-- Name: Event_offercouponhistory Event_offercouponhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_offercouponhistory"
    ADD CONSTRAINT "Event_offercouponhistory_pkey" PRIMARY KEY (id);


--
-- Name: Event_pageseosettings Event_pageseosettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_pageseosettings"
    ADD CONSTRAINT "Event_pageseosettings_pkey" PRIMARY KEY (id);


--
-- Name: Event_paymentoptionimage Event_paymentoptionimage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_paymentoptionimage"
    ADD CONSTRAINT "Event_paymentoptionimage_pkey" PRIMARY KEY (id);


--
-- Name: Event_payonlinetransectiondata Event_payonlinetransectiondata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_payonlinetransectiondata"
    ADD CONSTRAINT "Event_payonlinetransectiondata_pkey" PRIMARY KEY (id);


--
-- Name: Event_registeredcompanydetails Event_registeredcompanydetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_registeredcompanydetails"
    ADD CONSTRAINT "Event_registeredcompanydetails_pkey" PRIMARY KEY (id);


--
-- Name: Event_registereddelegates Event_registereddelegates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_registereddelegates"
    ADD CONSTRAINT "Event_registereddelegates_pkey" PRIMARY KEY (id);


--
-- Name: Event_registeredsponsereddelegates Event_registeredsponsereddelegates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_registeredsponsereddelegates"
    ADD CONSTRAINT "Event_registeredsponsereddelegates_pkey" PRIMARY KEY (id);


--
-- Name: Event_relatedevents Event_relatedevents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_relatedevents"
    ADD CONSTRAINT "Event_relatedevents_pkey" PRIMARY KEY (id);


--
-- Name: Event_slidesharesaccesspersons Event_slidesharesaccesspersons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_slidesharesaccesspersons"
    ADD CONSTRAINT "Event_slidesharesaccesspersons_pkey" PRIMARY KEY (id);


--
-- Name: Event_sponseredcompanydetails Event_sponseredcompanydetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponseredcompanydetails"
    ADD CONSTRAINT "Event_sponseredcompanydetails_pkey" PRIMARY KEY (id);


--
-- Name: Event_sponsorcompanytransectiondata Event_sponsorcompanytransectiondata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsorcompanytransectiondata"
    ADD CONSTRAINT "Event_sponsorcompanytransectiondata_pkey" PRIMARY KEY (id);


--
-- Name: Event_sponsoredcompanyaddonsdetails Event_sponsoredcompanyaddonsdetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsoredcompanyaddonsdetails"
    ADD CONSTRAINT "Event_sponsoredcompanyaddonsdetails_pkey" PRIMARY KEY (id);


--
-- Name: Event_sponsoroffercoupon Event_sponsoroffercoupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsoroffercoupon"
    ADD CONSTRAINT "Event_sponsoroffercoupon_pkey" PRIMARY KEY (id);


--
-- Name: Event_sponsoroffercouponhistory Event_sponsoroffercouponhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsoroffercouponhistory"
    ADD CONSTRAINT "Event_sponsoroffercouponhistory_pkey" PRIMARY KEY (id);


--
-- Name: Event_sponsorpackageaddons Event_sponsorpackageaddons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsorpackageaddons"
    ADD CONSTRAINT "Event_sponsorpackageaddons_pkey" PRIMARY KEY (id);


--
-- Name: Event_sponsorpackageaddontypes Event_sponsorpackageaddontypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsorpackageaddontypes"
    ADD CONSTRAINT "Event_sponsorpackageaddontypes_pkey" PRIMARY KEY (id);


--
-- Name: Event_sponsorpackagetypes Event_sponsorpackagetypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_sponsorpackagetypes"
    ADD CONSTRAINT "Event_sponsorpackagetypes_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_adminrole_permissions Myadmin_adminrole_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_adminrole_permissions"
    ADD CONSTRAINT "Myadmin_adminrole_permissions_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_adminrole Myadmin_adminrole_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_adminrole"
    ADD CONSTRAINT "Myadmin_adminrole_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_adminuser_permissions Myadmin_adminuser_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_adminuser_permissions"
    ADD CONSTRAINT "Myadmin_adminuser_permissions_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_adminuser Myadmin_adminuser_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_adminuser"
    ADD CONSTRAINT "Myadmin_adminuser_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_agendasubscriber Myadmin_agendasubscriber_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_agendasubscriber"
    ADD CONSTRAINT "Myadmin_agendasubscriber_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_becomespeakerrequestdata Myadmin_becomespeakerrequestdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_becomespeakerrequestdata"
    ADD CONSTRAINT "Myadmin_becomespeakerrequestdata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_calendersubscriber Myadmin_calendersubscriber_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_calendersubscriber"
    ADD CONSTRAINT "Myadmin_calendersubscriber_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_companieslogosection Myadmin_companieslogosection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_companieslogosection"
    ADD CONSTRAINT "Myadmin_companieslogosection_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_contactusdata Myadmin_contactusdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_contactusdata"
    ADD CONSTRAINT "Myadmin_contactusdata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_contactushelpdata Myadmin_contactushelpdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_contactushelpdata"
    ADD CONSTRAINT "Myadmin_contactushelpdata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_contactuspagedata Myadmin_contactuspagedata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_contactuspagedata"
    ADD CONSTRAINT "Myadmin_contactuspagedata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_countsection Myadmin_countsection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_countsection"
    ADD CONSTRAINT "Myadmin_countsection_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_countsectiontopic Myadmin_countsectiontopic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_countsectiontopic"
    ADD CONSTRAINT "Myadmin_countsectiontopic_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_enduserpassregistrationrequestdata Myadmin_enduserpassregistrationrequestdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_enduserpassregistrationrequestdata"
    ADD CONSTRAINT "Myadmin_enduserpassregistrationrequestdata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_footerfirstsectionoptions Myadmin_footerfirstsectionoptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_footerfirstsectionoptions"
    ADD CONSTRAINT "Myadmin_footerfirstsectionoptions_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_footeroptions Myadmin_footeroptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_footeroptions"
    ADD CONSTRAINT "Myadmin_footeroptions_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_footersocialmediaoptions Myadmin_footersocialmediaoptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_footersocialmediaoptions"
    ADD CONSTRAINT "Myadmin_footersocialmediaoptions_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_generalnewspoint Myadmin_generalnewspoint_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_generalnewspoint"
    ADD CONSTRAINT "Myadmin_generalnewspoint_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_homepagenavlogodata Myadmin_homepagenavlogodata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_homepagenavlogodata"
    ADD CONSTRAINT "Myadmin_homepagenavlogodata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_homepagenavmaincategories Myadmin_homepagenavmaincategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_homepagenavmaincategories"
    ADD CONSTRAINT "Myadmin_homepagenavmaincategories_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_homepagenavsubcategories Myadmin_homepagenavsubcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_homepagenavsubcategories"
    ADD CONSTRAINT "Myadmin_homepagenavsubcategories_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_homepagethirdsection Myadmin_homepagethirdsection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_homepagethirdsection"
    ADD CONSTRAINT "Myadmin_homepagethirdsection_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_homepagevideosectioninput Myadmin_homepagevideosectioninput_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_homepagevideosectioninput"
    ADD CONSTRAINT "Myadmin_homepagevideosectioninput_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_keypointssection Myadmin_keypointssection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_keypointssection"
    ADD CONSTRAINT "Myadmin_keypointssection_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_keypointssectionpoints Myadmin_keypointssectionpoints_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_keypointssectionpoints"
    ADD CONSTRAINT "Myadmin_keypointssectionpoints_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_latestnews Myadmin_latestnews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_latestnews"
    ADD CONSTRAINT "Myadmin_latestnews_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_mediapagehelpers Myadmin_mediapagehelpers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_mediapagehelpers"
    ADD CONSTRAINT "Myadmin_mediapagehelpers_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_newscategory Myadmin_newscategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_newscategory"
    ADD CONSTRAINT "Myadmin_newscategory_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_pastattandeehomedata Myadmin_pastattandeehomedata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_pastattandeehomedata"
    ADD CONSTRAINT "Myadmin_pastattandeehomedata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_pastattandeessection Myadmin_pastattandeessection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_pastattandeessection"
    ADD CONSTRAINT "Myadmin_pastattandeessection_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_pressmediapageboxdata Myadmin_pressmediapageboxdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_pressmediapageboxdata"
    ADD CONSTRAINT "Myadmin_pressmediapageboxdata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_pressmediapagedata Myadmin_pressmediapagedata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_pressmediapagedata"
    ADD CONSTRAINT "Myadmin_pressmediapagedata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_quickproposalrequestdata Myadmin_quickproposalrequestdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_quickproposalrequestdata"
    ADD CONSTRAINT "Myadmin_quickproposalrequestdata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_registerpagesettings Myadmin_registerpagesettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_registerpagesettings"
    ADD CONSTRAINT "Myadmin_registerpagesettings_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_sidebarmodule Myadmin_sidebarmodule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sidebarmodule"
    ADD CONSTRAINT "Myadmin_sidebarmodule_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_sidebarsubmodule Myadmin_sidebarsubmodule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sidebarsubmodule"
    ADD CONSTRAINT "Myadmin_sidebarsubmodule_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_speakerpagedata Myadmin_speakerpagedata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_speakerpagedata"
    ADD CONSTRAINT "Myadmin_speakerpagedata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_speakerpagesectionthreepoints Myadmin_speakerpagesectionthreepoints_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_speakerpagesectionthreepoints"
    ADD CONSTRAINT "Myadmin_speakerpagesectionthreepoints_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_speakersection Myadmin_speakersection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_speakersection"
    ADD CONSTRAINT "Myadmin_speakersection_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_sponsorpackagepagedata Myadmin_sponsorpackagepagedata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sponsorpackagepagedata"
    ADD CONSTRAINT "Myadmin_sponsorpackagepagedata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_sponsorpagebulletdata Myadmin_sponsorpagebulletdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sponsorpagebulletdata"
    ADD CONSTRAINT "Myadmin_sponsorpagebulletdata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_sponsorpagedata Myadmin_sponsorpagedata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sponsorpagedata"
    ADD CONSTRAINT "Myadmin_sponsorpagedata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_sponsorsection Myadmin_sponsorsection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_sponsorsection"
    ADD CONSTRAINT "Myadmin_sponsorsection_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_standoutcrowdrequestdata Myadmin_standoutcrowdrequestdata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_standoutcrowdrequestdata"
    ADD CONSTRAINT "Myadmin_standoutcrowdrequestdata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_subscribers Myadmin_subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_subscribers"
    ADD CONSTRAINT "Myadmin_subscribers_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_testimonialsection Myadmin_testimonialsection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_testimonialsection"
    ADD CONSTRAINT "Myadmin_testimonialsection_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_themecolorsettings Myadmin_themecolorsettings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_themecolorsettings"
    ADD CONSTRAINT "Myadmin_themecolorsettings_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_toemails Myadmin_toemails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_toemails"
    ADD CONSTRAINT "Myadmin_toemails_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_topnews Myadmin_topnews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_topnews"
    ADD CONSTRAINT "Myadmin_topnews_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_venuepagedata Myadmin_venuepagedata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_venuepagedata"
    ADD CONSTRAINT "Myadmin_venuepagedata_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_venuepagegallery Myadmin_venuepagegallery_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_venuepagegallery"
    ADD CONSTRAINT "Myadmin_venuepagegallery_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_videosectionuseroptions Myadmin_videosectionuseroptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_videosectionuseroptions"
    ADD CONSTRAINT "Myadmin_videosectionuseroptions_pkey" PRIMARY KEY (id);


--
-- Name: Myadmin_whoshouldattendpagedata Myadmin_whoshouldattendpagedata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Myadmin_whoshouldattendpagedata"
    ADD CONSTRAINT "Myadmin_whoshouldattendpagedata_pkey" PRIMARY KEY (id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict OJbdHyL4trhcV6cEOtkAFOWt2rOHmJGQ2Sad4i3rjaM3dKByxEfrubgPySI3kHu

