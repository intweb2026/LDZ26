import React, { useMemo, useCallback, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
  Container,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../Components/Common/DeleteModal";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Tooltip from "@mui/material/Tooltip";
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const EventData = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  console.log("eventData: ", eventData);
  const [eventName, setEventName] = useState("");
  const [eventYear, setEventYear] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [navWhiteLogo, setNavWhiteLogo] = useState("");
  console.log("navWhiteLogo: ", navWhiteLogo);
  const [navBlackLogo, setNavBlackLogo] = useState("");
  console.log("navBlackLogo: ", navBlackLogo);
  const [videomp4, setVideomp4] = useState("");
  const [videoWebm, setVideoWebm] = useState("");
  const [eventDetailBackImage, setEventDetailBackImage] = useState("");
  const [stataticBgPattern, setStataticBgPattern] = useState("");
  const [expertSpeakerBgPattern, setExpertSpeakerBgPattern] = useState("");
  const [purchaseTax, setPurchaseTax] = useState("");
  const [currencyName, setCurrencyName] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSeconaryColor] = useState("");
  const [lightColor, setLightColor] = useState("");
  const [darkColor, setDarkColor] = useState("");
  const [gradientColor, setGradientColor] = useState("");
  const [videoReplaceImage, setVideoReplaceImage] = useState("");
  const [isSeoEnable, setIsSeoEnable] = useState("");
  const [selectedAgendaVersion, setSelectedAgendaVersion] = useState({
    label: "Version-1",
    value: "Version-1",
  });
  const [loading, setloading] = useState(false);
  let color = "#405189";

  const [contactHubspotId, setContactHubspotId] = useState("");
  const [eventCityShortCode, setEventCityShortCode] = useState("");
  const [eventColorName, setEventColorName] = useState("");
  const [eventPostponed, setEventPostponed] = useState("");
  const [eventShortDate, setEventShortDate] = useState("");
  const [eventShortLocation, setEventShortLocation] = useState("");
  const [favicon, setFavicon] = useState("");
  const [googleTranslate, setGoogleTranslate] = useState({
    label: "False",
    value: "false",
  });
  const [hubspotDisposition, setHubspotDisposition] = useState("");
  const [hubspotEmailStatus, setHubspotEmailStatus] = useState("");
  const [hubspotId, setHubspotId] = useState("");
  const [industryName, setIndustryName] = useState("");
  const [previousAgenda, setPreviousAgenda] = useState("");
  const [recaptchaKey, setRecaptchaKey] = useState("");
  const [stripeMode, setStripeMode] = useState({
    label: "Test",
    value: "Test",
  });
  const [currencyPosition, setCurrencyPosition] = useState({
    label: "Top-Left",
    value: "Top-Left",
  });
  const [editorStyle, setEditorStyle] = useState("");
  const [headerContent, setHeaderContent] = useState("");
  const [headerType, setHeaderType] = useState({
    label: "Video",
    value: "Video",
  });
  const [eventShortCode, setEventShortCode] = useState("");

  // Dropdown options
  const agendaVersionOption = [
    { label: "ReleasedSoon", value: "ReleasedSoon" },
    { label: "RollingOutSoon", value: "RollingOutSoon" },
    { label: "Version-1", value: "Version-1" },
    { label: "Version-2", value: "Version-2" },
  ];

  const googleTranslateOptions = [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ];

  const stripeModeOptions = [
    { label: "Live", value: "Live" },
    { label: "Test", value: "Test" },
  ];

  const currencyPositionOptions = [
    { label: "Top-Left", value: "Top-Left" },
    { label: "Top-Right", value: "Top-Right" },
    { label: "Bottom-Left", value: "Bottom-Left" },
    { label: "Bottom-Right", value: "Bottom-Right" },
  ];

  const headerTypeOptions = [
    { label: "Video", value: "Video" },
    { label: "Image", value: "Image" },
  ];
  useEffect(() => {
    callGetEventDataApi();
    // eslint-disable-next-line
  }, []);

  const callGetEventDataApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(
      `${API_BASE_URL}/admin1/homepagedata`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          localStorage.clear();
          navigate("/logout");
        }
        if (data && data.status) {
          setEventData(data["homePageSettings"]);
          // setTotalCount(data?.paginationDetails?.count);
        }
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setTimeout(() => {
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      });
  };
  // useEffect(() => {
  //   if (eventData && Object.keys(eventData).length > 0) {
  //     console.log("eventData: ", eventData);
  //     if (eventData?.homeVideoSctionEventDetails?.length > 0) {
  //       setEventName(eventData?.homeVideoSctionEventDetails[0]?.eventName);
  //       setEventYear(eventData?.homeVideoSctionEventDetails[0]?.eventYear);
  //       setEventDate(eventData?.homeVideoSctionEventDetails[0]?.eventDate);
  //       setEventLocation(
  //         eventData?.homeVideoSctionEventDetails[0]?.eventLocation
  //       );
  //       setIsSeoEnable(
  //         eventData?.homeVideoSctionEventDetails[0]?.isSeoEnable
  //       );
  //       setSelectedAgendaVersion(
  //         eventData?.homeVideoSctionEventDetails[0]?.agendaVersion,
  //       );
  //     }
  //     if (eventData?.navLogos?.length > 0) {
  //       setNavWhiteLogo(eventData?.navLogos[0]?.whiteLogo);
  //       setNavBlackLogo(eventData?.navLogos[0]?.blackLogo);
  //     }

  //     if (eventData?.homeVideoSctionSettings?.length > 0) {
  //       setVideomp4(eventData?.homeVideoSctionSettings[0]?.videoLinkmp4);
  //       setVideoWebm(eventData?.homeVideoSctionSettings[0]?.videoLinkwebm);
  //       setEventDetailBackImage(
  //         eventData?.homeVideoSctionSettings[0]?.eventDetailBackImage
  //       );
  //       setStataticBgPattern(
  //         eventData?.homeVideoSctionSettings[0]?.eventStataticsBackImage
  //       );
  //       setExpertSpeakerBgPattern(
  //         eventData?.homeVideoSctionSettings[0]?.eventExpertSpeakerBackImage
  //       );
  //       setVideoReplaceImage(
  //         eventData?.homeVideoSctionSettings[0]?.videoReplaceImage
  //       );
  //     }

  //     if (eventData?.eventGeneralSettings?.length > 0) {
  //       setPurchaseTax(eventData?.eventGeneralSettings[0]?.purchaseTaxPercent);
  //       setCurrencyName(eventData?.eventGeneralSettings[0]?.currencyName);
  //       setCurrencySymbol(eventData?.eventGeneralSettings[0]?.currencySymbol);
  //     }

  //     if (eventData?.themeSetting?.length > 0) {
  //       setPrimaryColor(eventData?.themeSetting[0]?.primaryColor);
  //       setSeconaryColor(eventData?.themeSetting[0]?.secondaryColor);
  //       setLightColor(eventData?.themeSetting[0]?.lightColor);
  //       setDarkColor(eventData?.themeSetting[0]?.darkColor);
  //       setGradientColor(eventData?.themeSetting[0]?.gradientColor);
  //     }
  //   }

  //   // eslint-disable-next-line
  // }, [eventData]);

  useEffect(() => {
    if (eventData && Object.keys(eventData).length > 0) {
      if (eventData?.homeVideoSctionEventDetails?.length > 0) {
        const evDetail = eventData.homeVideoSctionEventDetails[0];
        setEventName(evDetail?.eventName);
        setEventYear(evDetail?.eventYear);
        setEventDate(evDetail?.eventDate);
        setEventLocation(evDetail?.eventLocation);
        setIsSeoEnable(evDetail?.isSeoEnable);
        setContactHubspotId(evDetail?.contactHubspotId || "");
        setEventCityShortCode(evDetail?.eventCityShortCode || "");
        setEventColorName(evDetail?.eventColorName || "");
        setEventPostponed(evDetail?.eventPostponed || "");
        setEventShortDate(evDetail?.eventShortDate || "");
        setEventShortLocation(evDetail?.eventShortLocation || "");
        setHubspotDisposition(evDetail?.hubspotDisposition || "");
        setHubspotEmailStatus(evDetail?.hubspotEmailStatus || "");
        setHubspotId(evDetail?.hubspotId || "");
        setIndustryName(evDetail?.industryName || "");
        setPreviousAgenda(evDetail?.previousAgenda || "");
        setRecaptchaKey(evDetail?.recaptchaKey || "");
        setEventShortCode(evDetail?.eventShortCode || "");
        if (evDetail?.favicon) setFavicon(evDetail.favicon);
        if (evDetail?.googleTranslate) {
          const val = evDetail.googleTranslate;
          setGoogleTranslate(
            googleTranslateOptions.find((o) => o.value === val) || {
              label: "False",
              value: "false",
            },
          );
        }
        if (evDetail?.stripeMode) {
          setStripeMode(
            stripeModeOptions.find((o) => o.value === evDetail.stripeMode) || {
              label: "Test",
              value: "Test",
            },
          );
        }
        if (evDetail?.agendaVersion) {
          setSelectedAgendaVersion(
            eventData?.homeVideoSctionEventDetails[0]?.agendaVersion,
          );
        }
      }

      if (eventData?.navLogos?.length > 0) {
        setNavWhiteLogo(eventData?.navLogos[0]?.whiteLogo);
        setNavBlackLogo(eventData?.navLogos[0]?.blackLogo);
      }

      if (eventData?.homeVideoSctionSettings?.length > 0) {
        const vidSetting = eventData.homeVideoSctionSettings[0];
        setVideomp4(vidSetting?.videoLinkmp4);
        setVideoWebm(vidSetting?.videoLinkwebm);
        setEventDetailBackImage(vidSetting?.eventDetailBackImage);
        setStataticBgPattern(vidSetting?.eventStataticsBackImage);
        setExpertSpeakerBgPattern(vidSetting?.eventExpertSpeakerBackImage);
        setVideoReplaceImage(vidSetting?.videoReplaceImage);
      }

      if (eventData?.eventGeneralSettings?.length > 0) {
        const genSetting = eventData.eventGeneralSettings[0];
        setPurchaseTax(genSetting?.purchaseTaxPercent);
        setCurrencyName(genSetting?.currencyName);
        setCurrencySymbol(genSetting?.currencySymbol);
        if (genSetting?.currencyPosition) {
          setCurrencyPosition(
            currencyPositionOptions.find(
              (o) => o.value === genSetting.currencyPosition,
            ) || { label: "Top-Left", value: "Top-Left" },
          );
        }
      }

      if (eventData?.themeSetting?.length > 0) {
        const theme = eventData.themeSetting[0];
        setPrimaryColor(theme?.primaryColor);
        setSeconaryColor(theme?.secondaryColor);
        setLightColor(theme?.lightColor);
        setDarkColor(theme?.darkColor);
        setGradientColor(theme?.gradientColor);
        setEditorStyle(theme?.editorStyle || "");
        setHeaderContent(theme?.headerContent || "");
        if (theme?.headerType) {
          setHeaderType(
            headerTypeOptions.find((o) => o.value === theme.headerType) || {
              label: "Video",
              value: "Video",
            },
          );
        }
      }
    }
    // eslint-disable-next-line
  }, [eventData]);

  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="Event General Detail"
          pageTitle="Dashboards"
          pageLink="/dashboard"
        />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <button
                  type="submit"
                  className="btn btn-success mt-3"
                  id="add-btn"
                  onClick={() => navigate("/addeventdata")}
                >
                  Edit Event General Detail
                </button>
                <Row>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Name{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Name"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventName}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Year{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Year"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventYear}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Agenda Version{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Name"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={selectedAgendaVersion}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Is SEO Enable?{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Is SEO Enable"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={isSeoEnable}
                        disabled
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Date{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Date"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventDate}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-2 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Short Code{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Short Code"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventShortCode}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Location{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventLocation}
                        disabled
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Event Short Date</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Short Date"
                      value={eventShortDate}
                      disabled
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Event Short Location</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Short Location"
                      value={eventShortLocation}
                      disabled
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Event Color Name</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Color Name"
                      value={eventColorName}
                      disabled
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Event City Short Code</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event City Short Code"
                      value={eventCityShortCode}
                      disabled
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Event Postponed</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Postponed"
                      value={eventPostponed}
                      disabled
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Nav White Logo{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={navWhiteLogo}
                        disabled
                      />
                    </div>
                    {navWhiteLogo?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={navWhiteLogo}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Nav Black Logo{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={navBlackLogo}
                        disabled
                      />
                    </div>
                    {navBlackLogo?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={navBlackLogo}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                </Row>
                <Row>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Favicon</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Location"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      value={favicon}
                      disabled
                    />
                    {favicon?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={favicon}
                          alt="favicon"
                          height={50}
                          width={50}
                        />
                      </div>
                    )}
                  </div>
                </Row>
                <Row>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Video MP4{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={videomp4}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Video Webm{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={videoWebm}
                        disabled
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Event Detail Back Image{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={eventDetailBackImage}
                        disabled
                      />
                    </div>
                    {eventDetailBackImage?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={eventDetailBackImage}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Statatics Bg Pattern{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={stataticBgPattern}
                        disabled
                      />
                    </div>
                    {stataticBgPattern?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={stataticBgPattern}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Expert Speaker Bg Pattern{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Event Location"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={expertSpeakerBgPattern}
                        disabled
                      />
                    </div>
                    {expertSpeakerBgPattern?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={expertSpeakerBgPattern}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                </Row>
                <Row>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Purchase Tax(%){" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Purchase Tax"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={purchaseTax}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Currency Name{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Currency Name"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={currencyName}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Currency Symbol{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Currency Symbol"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={currencySymbol}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2">
                    <Label className="form-label">Currency Position</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Currency Symbol"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      value={currencyPosition?.label}
                      disabled
                    />
                  </div>
                </Row>
                <Row>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Primary Color{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Primary Color"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={primaryColor}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Secondary Color{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Secondary Color"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={secondaryColor}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Light Color{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Light Color"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={lightColor}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-3 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Dark Color{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Dark Color"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={darkColor}
                        disabled
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className="col-md-8 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Gradient Color{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Gradient Color"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={gradientColor}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mt-2">
                    <div>
                      <Label htmlFor="sort-order" className="form-label">
                        Video Replace Image{" "}
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Video Replace Image"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={videoReplaceImage}
                        disabled
                      />
                    </div>
                    {videoReplaceImage?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={videoReplaceImage}
                          alt="uploaded-Logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                </Row>
                {/* ── NEW: Header Type / Google Translate / Stripe Mode ── */}
                <Row>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Header Type</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Video Replace Image"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      value={headerType?.label}
                      disabled
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Google Translate</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Video Replace Image"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      value={googleTranslate?.label}
                      disabled
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Stripe Mode</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Video Replace Image"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      value={stripeMode?.label}
                      disabled
                    />
                  </div>
                </Row>

                {/* ── NEW: Hubspot fields ── */}
                <Row>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Hubspot Id</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Hubspot Id"
                      value={hubspotId}
                      disabled
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Contact Hubspot Id</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Contact Hubspot Id"
                      value={contactHubspotId}
                      disabled
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Hubspot Disposition</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Hubspot Disposition"
                      value={hubspotDisposition}
                      disabled
                    />
                  </div>
                </Row>

                <Row>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Hubspot Email Status</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Hubspot Email Status"
                      value={hubspotEmailStatus}
                      disabled
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Industry Name</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Industry Name"
                      value={industryName}
                      disabled
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Previous Agenda</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Previous Agenda"
                      value={previousAgenda}
                      disabled
                    />
                  </div>
                </Row>

                {/* ── NEW: Recaptcha Key ── */}
                <Row>
                  <div className="col-md-12 mt-2">
                    <Label className="form-label">Recaptcha Key</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Recaptcha Key"
                      value={recaptchaKey}
                      disabled
                    />
                  </div>
                </Row>

                {/* ── NEW: Editor Style (scrollable textarea) ── */}
                <Row>
                  <div className="col-md-12 mt-2">
                    <Label className="form-label">Style EditorStyle</Label>
                    <Input
                      type="textarea"
                      className="form-control"
                      placeholder="Enter Editor Style CSS"
                      value={editorStyle}
                      disabled
                      style={{
                        height: "160px",
                        resize: "vertical",
                        overflowY: "scroll",
                        fontFamily: "monospace",
                        fontSize: "13px",
                      }}
                    />
                  </div>
                </Row>

                {/* ── NEW: Header Content (textarea) ── */}
                <Row>
                  <div className="col-md-12 mt-2">
                    <Label className="form-label">Header Content</Label>
                    <Input
                      type="textarea"
                      className="form-control"
                      placeholder="Enter Header Content"
                      value={headerContent}
                      disabled
                      style={{
                        height: "120px",
                        resize: "vertical",
                      }}
                    />
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default EventData;
