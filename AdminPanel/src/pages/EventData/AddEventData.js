// import React, { useState, useEffect } from "react";
// import BreadCrumb from "../../../src/Components/Common/BreadCrumb";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Modal,
//   ModalHeader,
//   Form,
//   ModalBody,
//   Label,
//   Input,
//   Breadcrumb,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardHeader,
//   Container,
// } from "reactstrap";
// import "../../assets/css/ApplicationMain.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ClipLoader from "react-spinners/ClipLoader";
// import { css } from "@emotion/react";
// import "../../assets/css/dropzone.css";
// import Select from "react-select";
// const override = css`
//   display: block;
//   margin: 0 auto;
//   color: black;
//   height: 100%;
// `;
// const AddEventData = () => {
//   const navigate = useNavigate();
//   const [eventData, setEventData] = useState([]);
//   const [eventName, setEventName] = useState("");
//   const [eventYear, setEventYear] = useState("");
//   const [eventDate, setEventDate] = useState("");
//   const [eventLocation, setEventLocation] = useState("");
//   const [navWhiteLogo, setNavWhiteLogo] = useState("");
//   const [navBlackLogo, setNavBlackLogo] = useState("");
//   const [videomp4, setVideomp4] = useState("");
//   console.log("videomp4: ", videomp4);
//   const [videoWebm, setVideoWebm] = useState("");
//   console.log("videoWebm: ", videoWebm);
//   const [eventDetailBackImage, setEventDetailBackImage] = useState("");
//   const [stataticBgPattern, setStataticBgPattern] = useState("");
//   const [expertSpeakerBgPattern, setExpertSpeakerBgPattern] = useState("");
//   const [purchaseTax, setPurchaseTax] = useState("");
//   const [currencyName, setCurrencyName] = useState("");
//   const [currencySymbol, setCurrencySymbol] = useState("");
//   const [primaryColor, setPrimaryColor] = useState("");
//   const [secondaryColor, setSeconaryColor] = useState("");
//   const [lightColor, setLightColor] = useState("");
//   const [darkColor, setDarkColor] = useState("");
//   const [gradientColor, setGradientColor] = useState("");
//   const [videoReplaceImage, setVideoReplaceImage] = useState("");
//   const [isSeoEnable, setIsSeoEnable] = useState("No");
//   const [selectedAgendaVersion, setSelectedAgendaVersion] = useState({
//     label: "Version-1",
//     value: "Version-1",
//   });

//   const agendaVersionOption = [
//     { label: "Version-1", value: "Version-1" },
//     { label: "Version-2", value: "Version-2" },
//   ];
//   const [loading, setloading] = useState(false);
//   let color = "#405189";

//   useEffect(() => {
//     callGetEventDataApi();
//     // eslint-disable-next-line
//   }, []);

//   const callGetEventDataApi = () => {
//     setloading(true);

//     const requestOptions = {
//       method: "GET",
//     };
//     fetch(`${API_BASE_URL}/admin1/homepagedata`, requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         if (
//           data &&
//           (data.detail === "The Token is expired" ||
//             data.message === "Invalid token")
//         ) {
//           localStorage.clear();
//           navigate("/logout");
//         }
//         if (data && data.status) {
//           setEventData(data["homePageSettings"]);
//           // setTotalCount(data?.paginationDetails?.count);
//         }
//         setloading(false);
//       })
//       .catch((error) => {
//         setloading(false);
//         setTimeout(() => {
//           toast.error("There was an error, Please try again later.", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }, 1000);
//       });
//   };
//   useEffect(() => {
//     if (eventData && Object.keys(eventData).length > 0) {
//       if (eventData?.homeVideoSctionEventDetails?.length > 0) {
//         setEventName(eventData?.homeVideoSctionEventDetails[0]?.eventName);
//         setEventYear(eventData?.homeVideoSctionEventDetails[0]?.eventYear);
//         setEventDate(eventData?.homeVideoSctionEventDetails[0]?.eventDate);
//         setEventLocation(
//           eventData?.homeVideoSctionEventDetails[0]?.eventLocation
//         );
//         setIsSeoEnable(
//           eventData?.homeVideoSctionEventDetails[0]?.isSeoEnable
//         );
//       }
//       if (eventData?.navLogos?.length > 0) {
//         setNavWhiteLogo(eventData?.navLogos[0]?.whiteLogo);
//         setNavBlackLogo(eventData?.navLogos[0]?.blackLogo);
//       }

//       if (eventData?.homeVideoSctionSettings?.length > 0) {
//         setVideomp4(eventData?.homeVideoSctionSettings[0]?.videoLinkmp4);
//         setVideoWebm(eventData?.homeVideoSctionSettings[0]?.videoLinkwebm);
//         setEventDetailBackImage(
//           eventData?.homeVideoSctionSettings[0]?.eventDetailBackImage
//         );
//         setStataticBgPattern(
//           eventData?.homeVideoSctionSettings[0]?.eventStataticsBackImage
//         );
//         setExpertSpeakerBgPattern(
//           eventData?.homeVideoSctionSettings[0]?.eventExpertSpeakerBackImage
//         );
//         setVideoReplaceImage(
//           eventData?.homeVideoSctionSettings[0]?.videoReplaceImage
//         );
//       }

//       if (eventData?.eventGeneralSettings?.length > 0) {
//         setPurchaseTax(eventData?.eventGeneralSettings[0]?.purchaseTaxPercent);
//         setCurrencyName(eventData?.eventGeneralSettings[0]?.currencyName);
//         setCurrencySymbol(eventData?.eventGeneralSettings[0]?.currencySymbol);
//       }

//       if (eventData?.themeSetting?.length > 0) {
//         setPrimaryColor(eventData?.themeSetting[0]?.primaryColor);
//         setSeconaryColor(eventData?.themeSetting[0]?.secondaryColor);
//         setLightColor(eventData?.themeSetting[0]?.lightColor);
//         setDarkColor(eventData?.themeSetting[0]?.darkColor);
//         setGradientColor(eventData?.themeSetting[0]?.gradientColor);
//       }
//     }

//     // eslint-disable-next-line
//   }, [eventData]);

//   const getUploadParams = async (file, type) => {
//     const finalData = new FormData();
//     finalData.append("media", file);
//     const requestOptions = {
//       method: "POST",
//       body: finalData,
//     };

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/admin1/upload`,
//         requestOptions
//       );
//       const data = await response.json();

//       if (
//         data.detail === "The Token is expired" ||
//         data.message === "Invalid token"
//       ) {
//         localStorage.clear();
//         history.push("/logout");
//         return;
//       }

//       if (data.uploadedURL) {
//         switch (type) {
//           case "whiteLogo":
//             setNavWhiteLogo(data.uploadedURL);
//             break;
//           case "blackLogo":
//             setNavBlackLogo(data.uploadedURL);
//             break;
//           case "mp4Video":
//             setVideomp4(data.uploadedURL);
//             break;
//           case "webmVideo":
//             setVideoWebm(data.uploadedURL);
//             break;
//           case "eventDetailBackImage":
//             setEventDetailBackImage(data.uploadedURL);
//             break;
//           case "stataticBgPattern":
//             setStataticBgPattern(data.uploadedURL);
//             break;
//           case "expertSpeakerBgPattern":
//             setExpertSpeakerBgPattern(data.uploadedURL);
//             break;
//           case "videoReplaceImage":
//             setVideoReplaceImage(data.uploadedURL);
//             break;
//           default:
//             break;
//         }
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("There was an error, Please try again later.", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//     }
//   };

//   const handleSubmitWithFormData = (e) => {
//     e.preventDefault();
//     setloading(true);
//     const formDataObj = new FormData();
//     formDataObj.append("eventName", eventName);
//     formDataObj.append("eventYear", eventYear);
//     formDataObj.append("eventDate", eventDate);
//     formDataObj.append("eventLocation", eventLocation);
//     formDataObj.append("whiteLogoLink", navWhiteLogo);
//     formDataObj.append("blackLogoLink", navBlackLogo);
//     formDataObj.append("videoLinkmp4", videomp4);
//     formDataObj.append("videoLinkwebm", videoWebm);
//     formDataObj.append("eventDetailBackImage", eventDetailBackImage);
//     formDataObj.append("eventStataticsBackImage", stataticBgPattern);
//     formDataObj.append("eventExpertSpeakerBackImage", expertSpeakerBgPattern);
//     formDataObj.append("purchaseTaxPercent", purchaseTax);
//     formDataObj.append("currencyName", currencyName);
//     formDataObj.append("currencySymbol", currencySymbol);
//     formDataObj.append("primaryColor", primaryColor);
//     formDataObj.append("secondaryColor", secondaryColor);
//     formDataObj.append("lightColor", lightColor);
//     formDataObj.append("darkColor", darkColor);
//     formDataObj.append("gradientColor", gradientColor);
//     formDataObj.append("videoReplaceImage", videoReplaceImage);
//     formDataObj.append("isSeoEnable", isSeoEnable);
//     formDataObj.append("agendaVersion", selectedAgendaVersion?.value);

//     const requestOptions = {
//       method: "POST",
//       body: formDataObj,
//     };
//     fetch(`${API_BASE_URL}/admin1/addeventdata`, requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status) {
//           toast.success("Record Added Successfully.", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//           setloading(false);
//           navigate("/eventdata");
//         } else {
//           setloading(false);
//           toast.error(data?.message);
//         }
//       })
//       .catch((error) => {
//         console.log("error: ", error);
//         setloading(false);
//         toast.error("There was an error, Please try again later.", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       });
//   };

//   if (loading)
//     return (
//       <div className="loaderClass" style={{ textAlign: "center" }}>
//         <ClipLoader color={color} loading={loading} css={override} size={100} />
//       </div>
//     );

//   return (
//     <div className="page-content">
//       <Container fluid>
//         <BreadCrumb title="Event General Detail" pageTitle="Event General Detail" pageLink="/eventdata" />
//         <Row>
//           <Col lg={12}>
//             <Card>
//               <CardBody>
//                 <Row>
//                   <div className="col-md-6 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Event Name{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Event Name"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={eventName}
//                         onChange={(e) => {
//                           setEventName(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-2 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Event Year{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Event Year"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={eventYear}
//                         onChange={(e) => {
//                           setEventYear(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-2 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Agenda Version{" "}
//                       </Label>
//                       <div className="input-group">
//                         <Select
//                           value={selectedAgendaVersion}
//                           onChange={(selectedAgendaVersionOption) => {
//                             setSelectedAgendaVersion(selectedAgendaVersionOption);
//                           }}
//                           options={agendaVersionOption}
//                           name="choices-publish-status-input"
//                           classNamePrefix="select2-selection form-select"
//                           className="w-100"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-2 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Is SEO Enable?{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Is SEO Enable"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={isSeoEnable}
//                         onChange={(e) => {
//                           setIsSeoEnable(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </Row>
//                 <Row>
//                   <div className="col-md-6 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Event Date{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Event Date"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={eventDate}
//                         onChange={(e) => {
//                           setEventDate(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Event Location{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Event Location"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={eventLocation}
//                         onChange={(e) => {
//                           setEventLocation(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </Row>
//                 <Row>
//                   <div className="col-md-6 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Nav White Logo{" "}
//                       </Label>
//                       <Input
//                         id="profile-img-file-input"
//                         type="file"
//                         className="profile-img-file-input"
//                         accept="image/png, image/jpg, image/jpeg,"
//                         name="photo"
//                         onChange={(e) =>
//                           getUploadParams(e.target.files[0], "whiteLogo")
//                         }
//                       />
//                     </div>
//                     {navWhiteLogo?.length > 0 && (
//                       <div className="mt-2">
//                         <img
//                           src={navWhiteLogo}
//                           alt="uploaded-Logo"
//                           height={100}
//                           width={100}
//                         />
//                       </div>
//                     )}
//                   </div>
//                   <div className="col-md-6 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Nav Black Logo{" "}
//                       </Label>
//                       <Input
//                         id="profile-img-file-input"
//                         type="file"
//                         className="profile-img-file-input"
//                         accept="image/png, image/jpg, image/jpeg,"
//                         name="photo"
//                         onChange={(e) =>
//                           getUploadParams(e.target.files[0], "blackLogo")
//                         }
//                       />
//                     </div>
//                     {navBlackLogo?.length > 0 && (
//                       <div className="mt-2">
//                         <img
//                           src={navBlackLogo}
//                           alt="uploaded-Logo"
//                           height={100}
//                           width={100}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </Row>
//                 <Row>
//                   <div className="col-md-6 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Video MP4{" "}
//                       </Label>
//                       <Input
//                         id="profile-img-file-input"
//                         type="file"
//                         className="profile-img-file-input"
//                         accept="video/mp4, video/avi, video/mov, video/wmv, video/flv, video/webm, video/mkv"
//                         name="video"
//                         onChange={(e) =>
//                           getUploadParams(e.target.files[0], "mp4Video")
//                         }
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Video Webm{" "}
//                       </Label>
//                       <Input
//                         id="profile-img-file-input"
//                         type="file"
//                         className="profile-img-file-input"
//                         accept="video/mp4, video/avi, video/mov, video/wmv, video/flv, video/webm, video/mkv"
//                         name="video"
//                         onChange={(e) =>
//                           getUploadParams(e.target.files[0], "webmVideo")
//                         }
//                       />
//                     </div>
//                   </div>
//                 </Row>
//                 <Row>
//                   <div className="col-md-4 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Event Detail Back Image{" "}
//                       </Label>
//                       <Input
//                         id="profile-img-file-input"
//                         type="file"
//                         className="profile-img-file-input"
//                         accept="image/png, image/jpg, image/jpeg,"
//                         name="photo"
//                         onChange={(e) =>
//                           getUploadParams(
//                             e.target.files[0],
//                             "eventDetailBackImage"
//                           )
//                         }
//                       />
//                     </div>
//                     {eventDetailBackImage?.length > 0 && (
//                       <div className="mt-2">
//                         <img
//                           src={eventDetailBackImage}
//                           alt="uploaded-Logo"
//                           height={100}
//                           width={100}
//                         />
//                       </div>
//                     )}
//                   </div>
//                   <div className="col-md-4 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Statatics Bg Pattern{" "}
//                       </Label>
//                       <Input
//                         id="profile-img-file-input"
//                         type="file"
//                         className="profile-img-file-input"
//                         accept="image/png, image/jpg, image/jpeg,"
//                         name="photo"
//                         onChange={(e) =>
//                           getUploadParams(
//                             e.target.files[0],
//                             "stataticBgPattern"
//                           )
//                         }
//                       />
//                     </div>
//                     {stataticBgPattern?.length > 0 && (
//                       <div className="mt-2">
//                         <img
//                           src={stataticBgPattern}
//                           alt="uploaded-Logo"
//                           height={100}
//                           width={100}
//                         />
//                       </div>
//                     )}
//                   </div>
//                   <div className="col-md-4 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Expert Speaker Bg Pattern{" "}
//                       </Label>
//                       <Input
//                         id="profile-img-file-input"
//                         type="file"
//                         className="profile-img-file-input"
//                         accept="image/png, image/jpg, image/jpeg,"
//                         name="photo"
//                         onChange={(e) =>
//                           getUploadParams(
//                             e.target.files[0],
//                             "expertSpeakerBgPattern"
//                           )
//                         }
//                       />
//                     </div>
//                     {expertSpeakerBgPattern?.length > 0 && (
//                       <div className="mt-2">
//                         <img
//                           src={expertSpeakerBgPattern}
//                           alt="uploaded-Logo"
//                           height={100}
//                           width={100}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </Row>
//                 <Row>
//                   <div className="col-md-4 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Purchase Tax(%){" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Purchase Tax"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={purchaseTax}
//                         onChange={(e) => {
//                           setPurchaseTax(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Currency Name{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Currency Name"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={currencyName}
//                         onChange={(e) => {
//                           setCurrencyName(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Currency Symbol{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Currency Symbol"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={currencySymbol}
//                         onChange={(e) => {
//                           setCurrencySymbol(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </Row>
//                 <Row>
//                   <div className="col-md-3 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Primary Color{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Primary Color"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={primaryColor}
//                         onChange={(e) => {
//                           setPrimaryColor(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-3 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Secondary Color{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Secondary Color"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={secondaryColor}
//                         onChange={(e) => {
//                           setSeconaryColor(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-3 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Light Color{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Light Color"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={lightColor}
//                         onChange={(e) => {
//                           setLightColor(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-3 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Dark Color{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Dark Color"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={darkColor}
//                         onChange={(e) => {
//                           setDarkColor(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </Row>
//                 <Row>
//                   <div className="col-md-8 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Gradient Color{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Gradient Color"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={gradientColor}
//                         onChange={(e) => {
//                           setGradientColor(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4 mt-2">
//                     <div>
//                       <Label htmlFor="sort-order" className="form-label">
//                         Video Replace Image{" "}
//                       </Label>
//                       <Input
//                         id="profile-img-file-input"
//                         type="file"
//                         className="profile-img-file-input"
//                         accept="image/png, image/jpg, image/jpeg,"
//                         name="photo"
//                         onChange={(e) =>
//                           getUploadParams(
//                             e.target.files[0],
//                             "videoReplaceImage"
//                           )
//                         }
//                       />
//                     </div>
//                     {videoReplaceImage?.length > 0 && (
//                       <div className="mt-2">
//                         <img
//                           src={videoReplaceImage}
//                           alt="uploaded-Logo"
//                           height={100}
//                           width={100}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </Row>

//                 <button
//                   type="submit"
//                   className="btn btn-success mt-3"
//                   id="add-btn"
//                   onClick={handleSubmitWithFormData}
//                 >
//                   Submit
//                 </button>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default AddEventData;
import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../src/Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  Input,
  Breadcrumb,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Container,
} from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "../../assets/css/dropzone.css";
import Select from "react-select";
import currencyList from "currency-list";
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const AddEventData = () => {
  const navigate = useNavigate();
  const allCurrencies = currencyList.currencyList["en"];
  const currencyOptions = Object.entries(allCurrencies).map(
    ([code, details]) => ({
      label: `${details.name} (${code})`,
      value: code,
      symbol: details.symbol_native, // ✅ this works fine
    }),
  );
  console.log("currencyOptions: ", currencyOptions);

  const [eventData, setEventData] = useState([]);
  // Existing states
  const [eventName, setEventName] = useState("");
  const [eventYear, setEventYear] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [navWhiteLogo, setNavWhiteLogo] = useState("");
  const [navBlackLogo, setNavBlackLogo] = useState("");
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
  const [isSeoEnable, setIsSeoEnable] = useState("No");
  const [selectedAgendaVersion, setSelectedAgendaVersion] = useState({
    label: "Version-1",
    value: "Version-1",
  });

  // New states
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

  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    callGetEventDataApi();
    // eslint-disable-next-line
  }, []);

  const callGetEventDataApi = () => {
    setloading(true);
    const requestOptions = { method: "GET" };
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
            // eventData?.homeVideoSctionEventDetails[0]?.agendaVersion,
            agendaVersionOption.find(
              (o) => o.value === evDetail.agendaVersion,
            ) || {
              label: "Test",
              value: "Test",
            },
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

  const getUploadParams = async (file, type) => {
    const finalData = new FormData();
    finalData.append("media", file);
    const requestOptions = { method: "POST", body: finalData };
    try {
      const response = await fetch(
        `${API_BASE_URL}/admin1/upload`,
        requestOptions,
      );
      const data = await response.json();
      if (
        data.detail === "The Token is expired" ||
        data.message === "Invalid token"
      ) {
        localStorage.clear();
        history.push("/logout");
        return;
      }
      if (data.uploadedURL) {
        switch (type) {
          case "whiteLogo":
            setNavWhiteLogo(data.uploadedURL);
            break;
          case "blackLogo":
            setNavBlackLogo(data.uploadedURL);
            break;
          case "mp4Video":
            setVideomp4(data.uploadedURL);
            break;
          case "webmVideo":
            setVideoWebm(data.uploadedURL);
            break;
          case "eventDetailBackImage":
            setEventDetailBackImage(data.uploadedURL);
            break;
          case "stataticBgPattern":
            setStataticBgPattern(data.uploadedURL);
            break;
          case "expertSpeakerBgPattern":
            setExpertSpeakerBgPattern(data.uploadedURL);
            break;
          case "videoReplaceImage":
            setVideoReplaceImage(data.uploadedURL);
            break;
          case "favicon":
            setFavicon(data.uploadedURL);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("There was an error, Please try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleSubmitWithFormData = (e) => {
    e.preventDefault();
    setloading(true);
    const formDataObj = new FormData();

    // Existing fields
    formDataObj.append("eventName", eventName);
    formDataObj.append("eventYear", eventYear);
    formDataObj.append("eventDate", eventDate);
    formDataObj.append("eventLocation", eventLocation);
    formDataObj.append("whiteLogoLink", navWhiteLogo);
    formDataObj.append("blackLogoLink", navBlackLogo);
    formDataObj.append("videoLinkmp4", videomp4);
    formDataObj.append("videoLinkwebm", videoWebm);
    formDataObj.append("eventDetailBackImage", eventDetailBackImage);
    formDataObj.append("eventStataticsBackImage", stataticBgPattern);
    formDataObj.append("eventExpertSpeakerBackImage", expertSpeakerBgPattern);
    formDataObj.append("purchaseTaxPercent", purchaseTax);
    formDataObj.append("currencyName", currencyName);
    formDataObj.append("currencySymbol", currencySymbol);
    formDataObj.append("primaryColor", primaryColor);
    formDataObj.append("secondaryColor", secondaryColor);
    formDataObj.append("lightColor", lightColor);
    formDataObj.append("darkColor", darkColor);
    formDataObj.append("gradientColor", gradientColor);
    formDataObj.append("videoReplaceImage", videoReplaceImage);
    formDataObj.append("isSeoEnable", isSeoEnable);
    formDataObj.append("agendaVersion", selectedAgendaVersion?.value);

    // New fields
    formDataObj.append("contactHubspotId", contactHubspotId);
    formDataObj.append("eventCityShortCode", eventCityShortCode);
    formDataObj.append("eventColorName", eventColorName);
    formDataObj.append("eventPostponed", eventPostponed);
    formDataObj.append("eventShortDate", eventShortDate);
    formDataObj.append("eventShortLocation", eventShortLocation);
    formDataObj.append("favicon", favicon);
    formDataObj.append("googleTranslate", googleTranslate?.value);
    formDataObj.append("hubspotDisposition", hubspotDisposition);
    formDataObj.append("hubspotEmailStatus", hubspotEmailStatus);
    formDataObj.append("hubspotId", hubspotId);
    formDataObj.append("industryName", industryName);
    formDataObj.append("previousAgenda", previousAgenda);
    formDataObj.append("recaptchaKey", recaptchaKey);
    formDataObj.append("stripeMode", stripeMode?.value);
    formDataObj.append("currencyPosition", currencyPosition?.value);
    formDataObj.append("editorStyle", editorStyle);
    formDataObj.append("headerContent", headerContent);
    formDataObj.append("headerType", headerType?.value);
    formDataObj.append("eventShortCode", eventShortCode);

    const requestOptions = { method: "POST", body: formDataObj };
    fetch(
      `${API_BASE_URL}/admin1/addeventdata`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          toast.success("Record Added Successfully.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setloading(false);
          navigate("/eventdata");
        } else {
          setloading(false);
          toast.error(data?.message);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        setloading(false);
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
          pageTitle="Event General Detail"
          pageLink="/eventdata"
        />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                {/* ── Row 1: Event Name / Year / Agenda Version / SEO ── */}
                <Row>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Event Name</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Name"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 mt-2">
                    <Label className="form-label">Event Year</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Year"
                      value={eventYear}
                      onChange={(e) => setEventYear(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 mt-2">
                    <Label className="form-label">Agenda Version</Label>
                    <Select
                      value={selectedAgendaVersion}
                      onChange={setSelectedAgendaVersion}
                      options={agendaVersionOption}
                      classNamePrefix="select2-selection form-select"
                      className="w-100"
                    />
                  </div>
                  <div className="col-md-2 mt-2">
                    <Label className="form-label">Is SEO Enable?</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Is SEO Enable"
                      value={isSeoEnable}
                      onChange={(e) => setIsSeoEnable(e.target.value)}
                    />
                  </div>
                </Row>

                {/* ── Row 2: Event Date / Location ── */}
                <Row>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Event Date</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 mt-2">
                    <Label className="form-label">Event Short Code</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Short Code"
                      value={eventShortCode}
                      onChange={(e) => setEventShortCode(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Event Location</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Location"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                    />
                  </div>
                </Row>

                {/* ── NEW: Event Short Date / Short Location ── */}
                <Row>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Event Short Date</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Short Date"
                      value={eventShortDate}
                      onChange={(e) => setEventShortDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Event Short Location</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Short Location"
                      value={eventShortLocation}
                      onChange={(e) => setEventShortLocation(e.target.value)}
                    />
                  </div>
                </Row>

                {/* ── NEW: Event Color Name / City Short Code / Event Postponed ── */}
                <Row>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Event Color Name</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Color Name"
                      value={eventColorName}
                      onChange={(e) => setEventColorName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Event City Short Code</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event City Short Code"
                      value={eventCityShortCode}
                      onChange={(e) => setEventCityShortCode(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Event Postponed</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Event Postponed"
                      value={eventPostponed}
                      onChange={(e) => setEventPostponed(e.target.value)}
                    />
                  </div>
                </Row>

                {/* ── Row: Nav Logos ── */}
                <Row>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Nav White Logo</Label>
                    <Input
                      type="file"
                      className="profile-img-file-input"
                      accept="image/png, image/jpg, image/jpeg"
                      name="photo"
                      onChange={(e) =>
                        getUploadParams(e.target.files[0], "whiteLogo")
                      }
                    />
                    {navWhiteLogo?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={navWhiteLogo}
                          alt="white-logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Nav Black Logo</Label>
                    <Input
                      type="file"
                      className="profile-img-file-input"
                      accept="image/png, image/jpg, image/jpeg"
                      name="photo"
                      onChange={(e) =>
                        getUploadParams(e.target.files[0], "blackLogo")
                      }
                    />
                    {navBlackLogo?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={navBlackLogo}
                          alt="black-logo"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                </Row>

                {/* ── NEW: Favicon ── */}
                <Row>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Favicon</Label>
                    <Input
                      type="file"
                      className="profile-img-file-input"
                      accept="image/png, image/jpg, image/jpeg, image/x-icon, image/svg+xml"
                      name="favicon"
                      onChange={(e) =>
                        getUploadParams(e.target.files[0], "favicon")
                      }
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

                {/* ── Row: Videos ── */}
                <Row>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Video MP4</Label>
                    <Input
                      type="file"
                      className="profile-img-file-input"
                      accept="video/mp4, video/avi, video/mov, video/wmv, video/flv, video/webm, video/mkv"
                      name="video"
                      onChange={(e) =>
                        getUploadParams(e.target.files[0], "mp4Video")
                      }
                    />
                  </div>
                  <div className="col-md-6 mt-2">
                    <Label className="form-label">Video Webm</Label>
                    <Input
                      type="file"
                      className="profile-img-file-input"
                      accept="video/mp4, video/avi, video/mov, video/wmv, video/flv, video/webm, video/mkv"
                      name="video"
                      onChange={(e) =>
                        getUploadParams(e.target.files[0], "webmVideo")
                      }
                    />
                  </div>
                </Row>

                {/* ── Row: Background Images ── */}
                <Row>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">
                      Event Detail Back Image
                    </Label>
                    <Input
                      type="file"
                      className="profile-img-file-input"
                      accept="image/png, image/jpg, image/jpeg"
                      name="photo"
                      onChange={(e) =>
                        getUploadParams(
                          e.target.files[0],
                          "eventDetailBackImage",
                        )
                      }
                    />
                    {eventDetailBackImage?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={eventDetailBackImage}
                          alt="event-detail-back"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Statatics Bg Pattern</Label>
                    <Input
                      type="file"
                      className="profile-img-file-input"
                      accept="image/png, image/jpg, image/jpeg"
                      name="photo"
                      onChange={(e) =>
                        getUploadParams(e.target.files[0], "stataticBgPattern")
                      }
                    />
                    {stataticBgPattern?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={stataticBgPattern}
                          alt="statatic-bg"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">
                      Expert Speaker Bg Pattern
                    </Label>
                    <Input
                      type="file"
                      className="profile-img-file-input"
                      accept="image/png, image/jpg, image/jpeg"
                      name="photo"
                      onChange={(e) =>
                        getUploadParams(
                          e.target.files[0],
                          "expertSpeakerBgPattern",
                        )
                      }
                    />
                    {expertSpeakerBgPattern?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={expertSpeakerBgPattern}
                          alt="expert-speaker-bg"
                          height={100}
                          width={100}
                        />
                      </div>
                    )}
                  </div>
                </Row>

                {/* ── Row: Purchase Tax / Currency ── */}
                <Row>
                  <div className="col-md-3 mt-2">
                    <Label className="form-label">Purchase Tax(%)</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Purchase Tax"
                      value={purchaseTax}
                      onChange={(e) => setPurchaseTax(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mt-2">
                    <Label className="form-label">Currency Name</Label>
                    {/* <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Currency Name"
                      value={currencyName}
                      onChange={(e) => setCurrencyName(e.target.value)}
                    /> */}
                    <Select
                      value={
                        currencyOptions.find((o) => o.label === currencyName) ||
                        null
                      }
                      onChange={(selected) => {
                        console.log("selected: ", selected);
                        setCurrencyName(selected?.label || "");
                        // setCurrencySymbol(selected?.symbol || "");
                      }}
                      options={currencyOptions}
                      classNamePrefix="select2-selection form-select"
                      className="w-100"
                      placeholder="Select Currency"
                    />
                  </div>
                  <div className="col-md-3 mt-2">
                    <Label className="form-label">Currency Symbol</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Currency Symbol"
                      value={currencySymbol}
                      onChange={(e) => setCurrencySymbol(e.target.value)}
                    />
                  </div>
                  {/* ── NEW: Currency Position ── */}
                  <div className="col-md-3 mt-2">
                    <Label className="form-label">Currency Position</Label>
                    <Select
                      value={currencyPosition}
                      onChange={setCurrencyPosition}
                      options={currencyPositionOptions}
                      classNamePrefix="select2-selection form-select"
                      className="w-100"
                    />
                  </div>
                </Row>

                {/* ── Row: Theme Colors ── */}
                <Row>
                  <div className="col-md-3 mt-2">
                    <Label className="form-label">Primary Color</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Primary Color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mt-2">
                    <Label className="form-label">Secondary Color</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Secondary Color"
                      value={secondaryColor}
                      onChange={(e) => setSeconaryColor(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mt-2">
                    <Label className="form-label">Light Color</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Light Color"
                      value={lightColor}
                      onChange={(e) => setLightColor(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 mt-2">
                    <Label className="form-label">Dark Color</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Dark Color"
                      value={darkColor}
                      onChange={(e) => setDarkColor(e.target.value)}
                    />
                  </div>
                </Row>

                {/* ── Row: Gradient Color / Video Replace Image ── */}
                <Row>
                  <div className="col-md-8 mt-2">
                    <Label className="form-label">Gradient Color</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Gradient Color"
                      value={gradientColor}
                      onChange={(e) => setGradientColor(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Video Replace Image</Label>
                    <Input
                      type="file"
                      className="profile-img-file-input"
                      accept="image/png, image/jpg, image/jpeg, image/webp"
                      name="photo"
                      onChange={(e) =>
                        getUploadParams(e.target.files[0], "videoReplaceImage")
                      }
                    />
                    {videoReplaceImage?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={videoReplaceImage}
                          alt="video-replace"
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
                    <Select
                      value={headerType}
                      onChange={setHeaderType}
                      options={headerTypeOptions}
                      classNamePrefix="select2-selection form-select"
                      className="w-100"
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Google Translate</Label>
                    <Select
                      value={googleTranslate}
                      onChange={setGoogleTranslate}
                      options={googleTranslateOptions}
                      classNamePrefix="select2-selection form-select"
                      className="w-100"
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Stripe Mode</Label>
                    <Select
                      value={stripeMode}
                      onChange={setStripeMode}
                      options={stripeModeOptions}
                      classNamePrefix="select2-selection form-select"
                      className="w-100"
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
                      onChange={(e) => setHubspotId(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Contact Hubspot Id</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Contact Hubspot Id"
                      value={contactHubspotId}
                      onChange={(e) => setContactHubspotId(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Hubspot Disposition</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Hubspot Disposition"
                      value={hubspotDisposition}
                      onChange={(e) => setHubspotDisposition(e.target.value)}
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
                      onChange={(e) => setHubspotEmailStatus(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Industry Name</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Industry Name"
                      value={industryName}
                      onChange={(e) => setIndustryName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <Label className="form-label">Previous Agenda</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Previous Agenda"
                      value={previousAgenda}
                      onChange={(e) => setPreviousAgenda(e.target.value)}
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
                      onChange={(e) => setRecaptchaKey(e.target.value)}
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
                      onChange={(e) => setEditorStyle(e.target.value)}
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
                      onChange={(e) => setHeaderContent(e.target.value)}
                      style={{
                        height: "120px",
                        resize: "vertical",
                      }}
                    />
                  </div>
                </Row>

                <button
                  type="submit"
                  className="btn btn-success mt-3"
                  id="add-btn"
                  onClick={handleSubmitWithFormData}
                >
                  Submit
                </button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddEventData;
