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
// import "../../assets/css/ckeditor.css";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Select from "react-select";
// import Flatpickr from "react-flatpickr";
// import { Trash2, Plus } from "lucide-react";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   color: black;
//   height: 100%;
// `;

// const status = [
//   { label: "Day", value: "Day" },
//   { label: "Speaker", value: "Speaker" },
//   { label: "Session", value: "Session" },
//   { label: "Coffe/Launch", value: "Coffe/Launch" },
//   { label: "Open/Close", value: "Open/Close" },
//   { label: "Registration", value: "Registration" },
// ];

// const dayOption = [
//   { label: "Day1", value: "Day1" },
//   { label: "Day2", value: "Day2" },
// ];

// const speakerFormatOptions = [
//   { label: "Single Speaker", value: "Single Speaker" },
//   { label: "Two Speakers", value: "Two Speakers" },
//   { label: "Panel Speaker", value: "Panel Speaker" },
// ];

// const moderatorOptions = [
//   { label: "Yes", value: "yes" },
//   { label: "No", value: "no" },
// ];

// const BASE_URL = "https://www.australia.lithium-downstream-summit.com"; // USE LOCAL FOR DEBUGGING

// const AddAgenda = () => {
//   const navigate = useNavigate();

//   // Existing states
//   const [selectedStatusOption, setSelectedStatusOption] = useState({
//     label: "Speaker",
//     value: "Speaker",
//   });
//   const [selectedStatusOptionErr, setSelectedStatusOptionErr] = useState(false);
//   const [selectedDay, setSelectedDay] = useState({
//     label: "Day1",
//     value: "Day1",
//   });
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [heading, setHeading] = useState("");
//   const [sponsorBy, setSponsorBy] = useState("");
//   const [sortOrder, setSortOrder] = useState("");
//   const [selectMulti, setselectMulti] = useState(null);
//   const [bulletPoints, setBulletPoints] = useState([{ id: 1, value: "" }]);
//   const [nextId, setNextId] = useState(2);
//   const [industriesList, setIndustriesList] = useState([]);
//   const [loading, setloading] = useState(false);

//   const [eventSpeakers, setEventSpeakers] = useState([]);

//   // New states for speaker format
//   const [speakerFormat, setSpeakerFormat] = useState(null);
//   console.log("speakerFormat: ", speakerFormat);
//   const [selectedSpeakers, setSelectedSpeakers] = useState(null);
//   console.log("selectedSpeakers: ", selectedSpeakers);

//   // Single Speaker states
//   const [singleSpeakerAgendaImage, setSingleSpeakerAgendaImage] = useState("");
//   console.log("singleSpeakerAgendaImage: ", singleSpeakerAgendaImage);
//   const [singleSpeakerCompanyLogo, setSingleSpeakerCompanyLogo] = useState("");
//   console.log("singleSpeakerCompanyLogo: ", singleSpeakerCompanyLogo);
//   const [singleSpeakerId, setSingleSpeakerId] = useState("");

//   // Two Speakers states
//   const [speaker1AgendaImage, setSpeaker1AgendaImage] = useState("");
//   const [speaker1CompanyLogo, setSpeaker1CompanyLogo] = useState("");
//   const [speaker1BulletPoints, setSpeaker1BulletPoints] = useState([
//     { id: 1, value: "" },
//   ]);
//   console.log('speaker1BulletPoints: ', speaker1BulletPoints);
//   const [speaker1NextId, setSpeaker1NextId] = useState(2);
//   const [speaker1Id, setSpeaker1Id] = useState("");

//   const [speaker2AgendaImage, setSpeaker2AgendaImage] = useState("");
//   const [speaker2CompanyLogo, setSpeaker2CompanyLogo] = useState("");
//   const [speaker2BulletPoints, setSpeaker2BulletPoints] = useState([
//     { id: 1, value: "" },
//   ]);
//   console.log('speaker2BulletPoints: ', speaker2BulletPoints);
//   const [speaker2NextId, setSpeaker2NextId] = useState(2);
//   const [speaker2Id, setSpeaker2Id] = useState("");

//   // Panel Speaker states
//   const [panelSpeakerImages, setPanelSpeakerImages] = useState({});
//   const [panelSpeakerIds, setPanelSpeakerIds] = useState({});
//   const [panelModeratorSelections, setPanelModeratorSelections] = useState({});
//   console.log('panelModeratorSelections: ', panelModeratorSelections);

//   let color = "#405189";

//   // Existing functions
//   const handleInputChange = (id, value) => {
//     setBulletPoints((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, value } : item))
//     );
//   };

//   const addBulletPoint = () => {
//     setBulletPoints((prev) => [...prev, { id: nextId, value: "" }]);
//     setNextId((prev) => prev + 1);
//   };

//   const deleteBulletPoint = (id) => {
//     if (bulletPoints.length > 1) {
//       setBulletPoints((prev) => prev.filter((item) => item.id !== id));
//     }
//   };

//   // Speaker 1 bullet points functions
//   const handleSpeaker1InputChange = (id, value) => {
//     setSpeaker1BulletPoints((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, value } : item))
//     );
//   };

//   const addSpeaker1BulletPoint = () => {
//     setSpeaker1BulletPoints((prev) => [
//       ...prev,
//       { id: speaker1NextId, value: "" },
//     ]);
//     setSpeaker1NextId((prev) => prev + 1);
//   };

//   const deleteSpeaker1BulletPoint = (id) => {
//     if (speaker1BulletPoints.length > 1) {
//       setSpeaker1BulletPoints((prev) => prev.filter((item) => item.id !== id));
//     }
//   };

//   // Speaker 2 bullet points functions
//   const handleSpeaker2InputChange = (id, value) => {
//     setSpeaker2BulletPoints((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, value } : item))
//     );
//   };

//   const addSpeaker2BulletPoint = () => {
//     setSpeaker2BulletPoints((prev) => [
//       ...prev,
//       { id: speaker2NextId, value: "" },
//     ]);
//     setSpeaker2NextId((prev) => prev + 1);
//   };

//   const deleteSpeaker2BulletPoint = (id) => {
//     if (speaker2BulletPoints.length > 1) {
//       setSpeaker2BulletPoints((prev) => prev.filter((item) => item.id !== id));
//     }
//   };

//   const customStyles = {
//     multiValue: (styles, { data }) => {
//       return {
//         ...styles,
//         backgroundColor: "#3762ea",
//       };
//     },
//     multiValueLabel: (styles, { data }) => ({
//       ...styles,
//       backgroundColor: "#405189",
//       color: "white",
//     }),
//     multiValueRemove: (styles, { data }) => ({
//       ...styles,
//       color: "white",
//       backgroundColor: "#405189",
//       ":hover": {
//         backgroundColor: "#405189",
//         color: "white",
//       },
//     }),
//     option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
//       ...styles,
//       color: isSelected ? "white" : "black",
//       backgroundColor: isSelected ? "#405189" : isFocused ? "#f0f0f0" : "white",
//       ":hover": {
//         backgroundColor: "#f0f0f0",
//         color: "black",
//       },
//     }),
//     control: (styles) => ({
//       ...styles,
//       borderColor: "#ced4da",
//       ":hover": {
//         borderColor: "#405189",
//       },
//     }),
//   };

//   useEffect(() => {
//     callIndustryListApi();
//     callEventSpeakersApi();
//     callAgendaCountApi();
//   }, []);

//   const callAgendaCountApi = () => {
//     fetch(`${BASE_URL}/admin1/getagenda`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.status !== false) {
//           const list = data.agendaList || data;
//           if (list.length > 0) {
//             // Identify the last added item based on the highest ID
//             const lastItem = list.reduce((prev, current) =>
//               prev.id > current.id ? prev : current
//             );

//             if (lastItem) {
//               // Pre-fill fields from the last added item
//               if (lastItem.endTime) setStartTime(lastItem.endTime);
//               if (lastItem.day) {
//                 setSelectedDay({
//                   label: lastItem.day,
//                   value: lastItem.day,
//                 });
//               }
//               // Set next sort order based on the last item's sort order
//               const nextSortOrder = (parseInt(lastItem.sortOrder) || 0) + 1;
//               setSortOrder(nextSortOrder);
//             }
//           } else {
//             setSortOrder(0); // If no items, start from 0
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching agenda count:", error);
//       });
//   };

//   // Reset panel states when speaker selection changes
//   useEffect(() => {
//     if (speakerFormat?.value === "Panel Speaker" && selectedSpeakers && Array.isArray(selectedSpeakers)) {
//       const newImages = { ...panelSpeakerImages };
//       const newIds = { ...panelSpeakerIds };
//       const newModerators = { ...panelModeratorSelections };

//       let changed = false;
//       selectedSpeakers.forEach((speaker) => {
//         if (!(speaker.value in newImages)) {
//           newImages[speaker.value] = "";
//           changed = true;
//         }
//         if (!(speaker.value in newIds)) {
//           newIds[speaker.value] = "";
//           changed = true;
//         }
//         if (!(speaker.value in newModerators)) {
//           newModerators[speaker.value] = null;
//           changed = true;
//         }
//       });

//       if (changed) {
//         setPanelSpeakerImages(newImages);
//         setPanelSpeakerIds(newIds);
//         setPanelModeratorSelections(newModerators);
//       }
//     }
//   }, [selectedSpeakers, speakerFormat]);

//   const callIndustryListApi = () => {
//     setloading(true);

//     const requestOptions = {
//       method: "GET",
//     };
//     fetch(`${BASE_URL}/admin1/eventindustrytrends`, requestOptions)
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
//           setIndustriesList(data["eventIndustryTrends"]);
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

//   const industryTrendOptions = (list) => {
//     let arr = [];
//     list.length > 0 &&
//       list.map((option) => {
//         let obj = {
//           value: option.id,
//           label: option.trendTitle,
//         };
//         arr.push(obj);
//       });
//     return arr;
//   };

//   const callEventSpeakersApi = () => {
//     setloading(true);

//     const requestOptions = {
//       method: "GET",
//     };
//     fetch(`${BASE_URL}/admin1/eventspeakers`, requestOptions)
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
//           setEventSpeakers(data["eventSpeakersList"]);
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

//   const speakerOptions = (list) => {
//     let arr = [];
//     list.length > 0 &&
//       list.map((option) => {
//         let obj = {
//           value: option.id,
//           label: option.eventSpeakerName,
//           companyName: option.eventSpeakerCompany,
//         };
//         arr.push(obj);
//       });
//     return arr;
//   };

//   // Handle panel speaker image change
//   const handlePanelSpeakerImageChange = (speakerId, value) => {
//     setPanelSpeakerImages((prev) => ({
//       ...prev,
//       [speakerId]: value,
//     }));
//   };

//   // Handle panel speaker ID change
//   const handlePanelSpeakerIdChange = (speakerId, value) => {
//     setPanelSpeakerIds((prev) => ({
//       ...prev,
//       [speakerId]: value,
//     }));
//   };

//   // Handle panel moderator selection change
//   const handlePanelModeratorChange = (speakerId, selectedOption) => {
//     setPanelModeratorSelections((prev) => ({
//       ...prev,
//       [speakerId]: selectedOption,
//     }));
//   };

//   const getUploadParams = async (file) => {
//     const finalData = new FormData();
//     finalData.append("media", file);
//     const requestOptions = {
//       method: "POST",
//       body: finalData,
//     };

//     try {
//       const response = await fetch(
//         `${BASE_URL}/admin1/upload`,
//         requestOptions
//       );
//       const data = await response.json();

//       if (
//         data.detail === "The Token is expired" ||
//         data.message === "Invalid token"
//       ) {
//         localStorage.clear();
//         navigate("/logout");
//         return null;
//       }

//       if (data.uploadedURL) {
//         return data.uploadedURL;
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("There was an error, Please try again later.", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//       return null;
//     }
//   };
//   const formDataToJSON = (formData) => {
//     const obj = {};
//     for (let [key, value] of formData.entries()) {
//       // Handle files specially
//       if (value instanceof File) {
//         obj[key] = {
//           name: value.name,
//           size: value.size,
//           type: value.type,
//           lastModified: value.lastModified,
//         };
//       } else {
//         obj[key] = value;
//       }
//     }
//     return JSON.stringify(obj, null, 2);
//   };

//   const handleSubmitWithFormData = (e) => {
//     e.preventDefault();
//     if (selectedStatusOption === null) {
//       toast.error("Please Select the Status", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       setSelectedStatusOptionErr(true);
//     } else {
//       const formDataObj = new FormData();
//       formDataObj.append("status", selectedStatusOption?.label);
//       formDataObj.append("heading", heading);
//       formDataObj.append("day", selectedDay?.label);
//       formDataObj.append("startTime", startTime);
//       formDataObj.append("endTime", endTime);
//       formDataObj.append("sponsorBy", sponsorBy);
//       formDataObj.append("sortOrder", sortOrder);
//       formDataObj.append("speakerFormat", speakerFormat?.label);
//       formDataObj.append("bulletPoints", JSON.stringify(bulletPoints));
//       formDataObj.append("industryTrends", JSON.stringify(selectMulti));
//       formDataObj.append(
//         "speaker1Bullets",
//         JSON.stringify(speaker1BulletPoints)
//       );
//       formDataObj.append(
//         "speaker2Bullets",
//         JSON.stringify(speaker2BulletPoints)
//       );
//       formDataObj.append(
//         "panelSpeakerImages",
//         JSON.stringify(panelSpeakerImages)
//       );
//       formDataObj.append("panelSpeakerIds", JSON.stringify(panelSpeakerIds));
//       formDataObj.append(
//         "panelModerators",
//         JSON.stringify(panelModeratorSelections)
//       );
//       formDataObj.append("selectedSpeakers", JSON.stringify(selectedSpeakers));

//       // Add JSON stringify fields

//       // Add file fields
//       if (singleSpeakerAgendaImage) {
//         formDataObj.append("singleSpeakerAgendaImg", singleSpeakerAgendaImage);
//       }
//       if (singleSpeakerCompanyLogo) {
//         formDataObj.append("singleSpeakerCompanyImg", singleSpeakerCompanyLogo);
//       }
//       formDataObj.append("singleSpeakerId", singleSpeakerId);

//       if (speaker1AgendaImage) {
//         formDataObj.append("Speaker1AgendaImg", speaker1AgendaImage);
//       }
//       if (speaker1CompanyLogo) {
//         formDataObj.append("Speaker1CompanyImg", speaker1CompanyLogo);
//       }
//       formDataObj.append("Speaker1Id", speaker1Id);

//       if (speaker2AgendaImage) {
//         formDataObj.append("Speaker2AgendaImg", speaker2AgendaImage);
//       }
//       if (speaker2CompanyLogo) {
//         formDataObj.append("Speaker2CompanyImg", speaker2CompanyLogo);
//       }
//       formDataObj.append("Speaker2Id", speaker2Id);
//       // Add panel speaker images (files need special handling)
//       Object.entries(panelSpeakerImages).forEach(([speakerId, file]) => {
//         if (file) {
//           formDataObj.append(`panelSpeakerImage_${speakerId}`, file);
//         }
//       });
//       // const formDataJSON = formDataToJSON(formDataObj);
//       // console.log("FormData as JSON:", formDataJSON);
//       // // Parse it back to object if needed
//       // const formDataObject = JSON.parse(formDataJSON);
//       // console.log("FormData as Object:", formDataObject);
//       // // For debugging FormData content:
//       // for (let pair of formDataObj.entries()) {
//       //   console.log(pair[0] + ": " + pair[1]);
//       // }
//       const requestOptions = {
//         method: "POST",
//         body: formDataObj,
//       };
//       fetch(`${BASE_URL}/admin1/addagenda`, requestOptions)
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.status) {
//             toast.success("Record Added Successfully.", {
//               position: "top-right",
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//             setSelectedStatusOption({
//               label: "Speaker",
//               value: "Speaker",
//             });
//             setSelectedDay({
//               label: "Day1",
//               value: "Day1",
//             });
//             setStartTime("");
//             setEndTime("");
//             setHeading("");
//             setSponsorBy("");
//             setSortOrder("");
//             setselectMulti(null);
//             setSortOrder("");
//             setBulletPoints([{ id: 1, value: "" }]);
//             setNextId(2);
//             setSpeakerFormat(null);
//             setSelectedSpeakers(null);
//             setSingleSpeakerAgendaImage("");
//             setSingleSpeakerCompanyLogo("");
//             setSingleSpeakerId("");
//             setSpeaker1AgendaImage("");
//             setSpeaker1CompanyLogo("");
//             setSpeaker1BulletPoints([{ id: 1, value: "" }]);
//             setSpeaker1NextId(2);
//             setSpeaker1Id("");
//             setSpeaker2AgendaImage("");
//             setSpeaker2CompanyLogo("");
//             setSpeaker2BulletPoints([{ id: 1, value: "" }]);
//             setSpeaker2NextId(2);
//             setSpeaker2Id("");
//             setPanelSpeakerImages({});
//             setPanelSpeakerIds({});
//             setPanelModeratorSelections({});
//             setselectMulti(null);
//             navigate("/agendalist");
//           } else {
//             toast.error(data?.message);
//           }
//         })
//         .catch((error) => {
//           console.log("error: ", error);
//           toast.error("There was an error, Please try again later.", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         });
//     }
//     // console.log("FormData object created for API submission");

//     // return formDataObj;
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
//         <BreadCrumb title="Add Agenda" pageTitle="Agenda List" pageLink="/agendalist" />
//         <Row>
//           <Col lg={12}>
//             <Card>
//               <CardBody>
//                 <div className="col-md-8">
//                   <div>
//                     <Label htmlFor="amount-field" className="form-label">
//                       Status <span className="required_span">*</span>
//                     </Label>
//                     <div className="input-group">
//                       <Select
//                         value={selectedStatusOption}
//                         onChange={(selectedStatus) => {
//                           setSelectedStatusOption(selectedStatus);
//                           if (selectedStatus?.value === "Day") {
//                             setStartTime("");
//                             setEndTime("");
//                           }
//                         }}
//                         options={status}
//                         name="choices-publish-status-input"
//                         classNamePrefix="select2-selection form-select"
//                         className="w-100"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 {selectedStatusOption?.value !== "Speaker" && (
//                   <div className="col-md-8 mt-2">
//                     <div>
//                       <Label
//                         htmlFor="customername-field"
//                         className="form-label"
//                       >
//                         Heading{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Heading"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={heading}
//                         onChange={(e) => {
//                           setHeading(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* {(selectedStatusOption?.value === "Day" ||
//                   selectedStatusOption?.value === "Speaker") && ( */}
//                 <div className="col-md-8 mt-2">
//                   <div>
//                     <Label htmlFor="amount-field" className="form-label">
//                       Select Day <span className="required_span">*</span>
//                     </Label>
//                     <div className="input-group">
//                       <Select
//                         value={selectedDay}
//                         onChange={(selectedDayOption) => {
//                           setSelectedDay(selectedDayOption);
//                         }}
//                         options={dayOption}
//                         name="choices-publish-status-input"
//                         classNamePrefix="select2-selection form-select"
//                         className="w-100"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 {/* )} */}
//                 {(
//                   selectedStatusOption?.value === "Registration" ||
//                   selectedStatusOption?.value === "Open/Close" ||
//                   selectedStatusOption?.value === "Coffe/Launch" ||
//                   selectedStatusOption?.value === "Speaker" ||
//                   // selectedStatusOption?.value === "Day" ||
//                   selectedStatusOption?.value === "Session") && (
//                     <>
//                       <div className="col-md-8 mt-2">
//                         <div>
//                           <Label htmlFor="amount-field" className="form-label">
//                             Start Time <span className="required_span">*</span>
//                           </Label>
//                           <div className="input-group">
//                             <Flatpickr
//                               className="form-control"
//                               options={{
//                                 enableTime: true,
//                                 noCalendar: true,
//                                 dateFormat: "h:i K",
//                                 time_24hr: false,
//                               }}
//                               onReady={(selectedDates, dateStr, instance) => {
//                                 if (instance.hourElement) {
//                                   instance.hourElement.addEventListener("keyup", (e) => {
//                                     if (e.target.value.length === 2) {
//                                       instance.minuteElement?.focus();
//                                     }
//                                   });
//                                 }
//                               }}
//                               value={startTime}
//                               onChange={(date, dateStr) => {
//                                 setStartTime(dateStr);
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-md-8 mt-2">
//                         <div>
//                           <Label htmlFor="amount-field" className="form-label">
//                             End Time <span className="required_span">*</span>
//                           </Label>
//                           <div className="input-group">
//                             <Flatpickr
//                               className="form-control"
//                               options={{
//                                 enableTime: true,
//                                 noCalendar: true,
//                                 dateFormat: "h:i K",
//                                 time_24hr: false,
//                               }}
//                               onReady={(selectedDates, dateStr, instance) => {
//                                 if (instance.hourElement) {
//                                   instance.hourElement.addEventListener("keyup", (e) => {
//                                     if (e.target.value.length === 2) {
//                                       instance.minuteElement?.focus();
//                                     }
//                                   });
//                                 }
//                               }}
//                               value={endTime}
//                               onChange={(date, dateStr) => {
//                                 setEndTime(dateStr);
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                 {selectedStatusOption?.value === "Speaker" && (
//                   <>
//                     <div className="col-md-8 mt-2">
//                       <div>
//                         <Label htmlFor="speaker-format" className="form-label">
//                           Speaker Format{" "}
//                           <span className="required_span">*</span>
//                         </Label>
//                         <div className="input-group">
//                           <Select
//                             value={speakerFormat}
//                             onChange={(selectedFormat) => {
//                               setSpeakerFormat(selectedFormat);
//                               setSelectedSpeakers(null); // Reset speaker selection
//                             }}
//                             options={speakerFormatOptions}
//                             name="speaker-format-input"
//                             classNamePrefix="select2-selection form-select"
//                             className="w-100"
//                             placeholder="Select Speaker Format"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {speakerFormat && (
//                       <div className="col-md-8 mt-2">
//                         <div>
//                           <Label
//                             htmlFor="speaker-select"
//                             className="form-label"
//                           >
//                             Select Speaker(s){" "}
//                             {/* <span className="required_span">*</span> */}
//                           </Label>
//                           <div className="input-group">
//                             <Select
//                               value={selectedSpeakers}
//                               onChange={setSelectedSpeakers}
//                               options={speakerOptions(eventSpeakers)}
//                               isMulti={speakerFormat.value !== "Single Speaker"}
//                               name="speaker-select-input"
//                               classNamePrefix="select2-selection form-select"
//                               className="w-100"
//                               placeholder="Select Speaker(s)"
//                               styles={customStyles}
//                               isOptionDisabled={() =>
//                                 speakerFormat.value === "Two Speakers" &&
//                                 selectedSpeakers &&
//                                 selectedSpeakers.length >= 2
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Single Speaker Fields */}
//                     {speakerFormat?.value === "Single Speaker" &&
//                       // selectedSpeakers && 
//                       (
//                         <>
//                           <div className="col-md-8 mt-2">
//                             <div>
//                               <Label
//                                 htmlFor="speaker-agenda-image"
//                                 className="form-label"
//                               >
//                                 Speaker Agenda Image
//                               </Label>
//                               <Input
//                                 type="file"
//                                 className="form-control"
//                                 accept="image/*"
//                                 onChange={async (e) => {
//                                   const file = e.target.files[0];
//                                   if (file) {
//                                     setloading(true);
//                                     const uploadedUrl = await getUploadParams(
//                                       file
//                                     );
//                                     if (uploadedUrl) {
//                                       setSingleSpeakerAgendaImage(uploadedUrl);
//                                     }
//                                     setloading(false);
//                                   }
//                                 }}
//                               />
//                             </div>
//                             {singleSpeakerAgendaImage?.length > 0 && (
//                               <div className="mt-2">
//                                 <img
//                                   src={singleSpeakerAgendaImage}
//                                   alt="uploaded-Logo"
//                                   height={100}
//                                   width={100}
//                                 />
//                               </div>
//                             )}
//                           </div>

//                           <div className="col-md-8 mt-2">
//                             <div>
//                               <Label
//                                 htmlFor="speaker-company-logo"
//                                 className="form-label"
//                               >
//                                 Speaker Company Logo
//                               </Label>
//                               <Input
//                                 type="file"
//                                 className="form-control"
//                                 accept="image/*"
//                                 onChange={async (e) => {
//                                   const file = e.target.files[0];
//                                   if (file) {
//                                     setloading(true);
//                                     const uploadedUrl = await getUploadParams(
//                                       file
//                                     );
//                                     if (uploadedUrl) {
//                                       setSingleSpeakerCompanyLogo(uploadedUrl);
//                                     }
//                                     setloading(false);
//                                   }
//                                 }}
//                               />
//                             </div>
//                             {singleSpeakerCompanyLogo?.length > 0 && (
//                               <div className="mt-2">
//                                 <img
//                                   src={singleSpeakerCompanyLogo}
//                                   alt="uploaded-Logo"
//                                   height={100}
//                                   width={100}
//                                 />
//                               </div>
//                             )}
//                           </div>

//                           <div className="col-md-8 mt-2">
//                             <div>
//                               <Label
//                                 htmlFor="speaker-id"
//                                 className="form-label"
//                               >
//                                 Speaker ID
//                               </Label>
//                               <Input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Enter Speaker ID"
//                                 value={singleSpeakerId}
//                                 onChange={(e) =>
//                                   setSingleSpeakerId(e.target.value)
//                                 }
//                               />
//                             </div>
//                           </div>

//                           {/* Bullet Points for Single Speaker */}
//                           {bulletPoints.map((bulletPoint, index) => (
//                             <div
//                               key={bulletPoint.id}
//                               className="d-flex mt-2 gap-4 align-items-end"
//                             >
//                               <div className="col-md-8">
//                                 <div>
//                                   <label
//                                     htmlFor={`customername-field-${bulletPoint.id}`}
//                                     className="form-label"
//                                   >
//                                     Bullet Point {index + 1}
//                                   </label>
//                                   <input
//                                     id={`customername-field-${bulletPoint.id}`}
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Enter Detail"
//                                     value={bulletPoint.value}
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         bulletPoint.id,
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                 </div>
//                               </div>

//                               <div className="col-md-4 d-flex gap-2">
//                                 {bulletPoints.length > 1 && (
//                                   <button
//                                     type="button"
//                                     onClick={() =>
//                                       deleteBulletPoint(bulletPoint.id)
//                                     }
//                                     className="btn btn-danger d-flex align-items-center gap-1"
//                                   >
//                                     <Trash2 size={16} />
//                                     Delete
//                                   </button>
//                                 )}

//                                 {index === bulletPoints.length - 1 && (
//                                   <button
//                                     type="button"
//                                     onClick={addBulletPoint}
//                                     className="btn btn-success d-flex align-items-center gap-1"
//                                   >
//                                     <Plus size={16} />
//                                     Add
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           ))}
//                         </>
//                       )}

//                     {/* Two Speakers Fields */}
//                     {speakerFormat?.value === "Two Speakers" &&
//                       selectedSpeakers &&
//                       selectedSpeakers.length > 0 && (
//                         <>
//                           {/* Speaker 1 */}
//                           <div className="mt-4">
//                             <h5>Speaker 1: {selectedSpeakers[0]?.label}</h5>

//                             <div className="col-md-8 mt-2">
//                               <div>
//                                 <Label
//                                   htmlFor="speaker1-agenda-image"
//                                   className="form-label"
//                                 >
//                                   Speaker 1 Agenda Image
//                                 </Label>
//                                 <Input
//                                   type="file"
//                                   className="form-control"
//                                   accept="image/*"
//                                   onChange={async (e) => {
//                                     const file = e.target.files[0];
//                                     if (file) {
//                                       setloading(true);
//                                       const uploadedUrl = await getUploadParams(
//                                         file
//                                       );
//                                       if (uploadedUrl) {
//                                         setSpeaker1AgendaImage(uploadedUrl);
//                                       }
//                                       setloading(false);
//                                     }
//                                   }}
//                                 />
//                               </div>
//                               {speaker1AgendaImage?.length > 0 && (
//                                 <div className="mt-2">
//                                   <img
//                                     src={speaker1AgendaImage}
//                                     alt="uploaded-Logo"
//                                     height={100}
//                                     width={100}
//                                   />
//                                 </div>
//                               )}
//                             </div>

//                             <div className="col-md-8 mt-2">
//                               <div>
//                                 <Label
//                                   htmlFor="speaker1-company-logo"
//                                   className="form-label"
//                                 >
//                                   Speaker 1 Company Logo
//                                 </Label>
//                                 <Input
//                                   type="file"
//                                   className="form-control"
//                                   accept="image/*"
//                                   onChange={async (e) => {
//                                     const file = e.target.files[0];
//                                     if (file) {
//                                       setloading(true);
//                                       const uploadedUrl = await getUploadParams(
//                                         file
//                                       );
//                                       if (uploadedUrl) {
//                                         setSpeaker1CompanyLogo(uploadedUrl);
//                                       }
//                                       setloading(false);
//                                     }
//                                   }}
//                                 />
//                               </div>
//                               {speaker1CompanyLogo?.length > 0 && (
//                                 <div className="mt-2">
//                                   <img
//                                     src={speaker1CompanyLogo}
//                                     alt="uploaded-Logo"
//                                     height={100}
//                                     width={100}
//                                   />
//                                 </div>
//                               )}
//                             </div>

//                             <div className="col-md-8 mt-2">
//                               <div>
//                                 <Label
//                                   htmlFor="speaker1-id"
//                                   className="form-label"
//                                 >
//                                   Speaker 1 ID
//                                 </Label>
//                                 <Input
//                                   type="text"
//                                   className="form-control"
//                                   placeholder="Enter Speaker 1 ID"
//                                   value={speaker1Id}
//                                   onChange={(e) =>
//                                     setSpeaker1Id(e.target.value)
//                                   }
//                                 />
//                               </div>
//                             </div>

//                             {/* Speaker 1 Bullet Points */}
//                             {speaker1BulletPoints.map((bulletPoint, index) => (
//                               <div
//                                 key={bulletPoint.id}
//                                 className="d-flex mt-2 gap-4 align-items-end"
//                               >
//                                 <div className="col-md-8">
//                                   <div>
//                                     <label
//                                       htmlFor={`speaker1-bullet-${bulletPoint.id}`}
//                                       className="form-label"
//                                     >
//                                       Speaker 1 Bullet Point {index + 1}
//                                     </label>
//                                     <input
//                                       id={`speaker1-bullet-${bulletPoint.id}`}
//                                       type="text"
//                                       className="form-control"
//                                       placeholder="Enter Detail"
//                                       value={bulletPoint.value}
//                                       onChange={(e) =>
//                                         handleSpeaker1InputChange(
//                                           bulletPoint.id,
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="col-md-4 d-flex gap-2">
//                                   {speaker1BulletPoints.length > 1 && (
//                                     <button
//                                       type="button"
//                                       onClick={() =>
//                                         deleteSpeaker1BulletPoint(
//                                           bulletPoint.id
//                                         )
//                                       }
//                                       className="btn btn-danger d-flex align-items-center gap-1"
//                                     >
//                                       <Trash2 size={16} />
//                                       Delete
//                                     </button>
//                                   )}

//                                   {index ===
//                                     speaker1BulletPoints.length - 1 && (
//                                       <button
//                                         type="button"
//                                         onClick={addSpeaker1BulletPoint}
//                                         className="btn btn-success d-flex align-items-center gap-1"
//                                       >
//                                         <Plus size={16} />
//                                         Add
//                                       </button>
//                                     )}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>

//                           {/* Speaker 2 */}
//                           {selectedSpeakers.length > 1 && (
//                             <div className="mt-4">
//                               <h5>Speaker 2: {selectedSpeakers[1]?.label}</h5>

//                               <div className="col-md-8 mt-2">
//                                 <div>
//                                   <Label
//                                     htmlFor="speaker2-agenda-image"
//                                     className="form-label"
//                                   >
//                                     Speaker 2 Agenda Image
//                                   </Label>
//                                   <Input
//                                     type="file"
//                                     className="form-control"
//                                     accept="image/*"
//                                     onChange={async (e) => {
//                                       const file = e.target.files[0];
//                                       if (file) {
//                                         setloading(true);
//                                         const uploadedUrl =
//                                           await getUploadParams(file);
//                                         if (uploadedUrl) {
//                                           setSpeaker2AgendaImage(uploadedUrl);
//                                         }
//                                         setloading(false);
//                                       }
//                                     }}
//                                   />
//                                 </div>
//                                 {speaker2AgendaImage?.length > 0 && (
//                                   <div className="mt-2">
//                                     <img
//                                       src={speaker2AgendaImage}
//                                       alt="uploaded-Logo"
//                                       height={100}
//                                       width={100}
//                                     />
//                                   </div>
//                                 )}
//                               </div>

//                               <div className="col-md-8 mt-2">
//                                 <div>
//                                   <Label
//                                     htmlFor="speaker2-company-logo"
//                                     className="form-label"
//                                   >
//                                     Speaker 2 Company Logo
//                                   </Label>
//                                   <Input
//                                     type="file"
//                                     className="form-control"
//                                     accept="image/*"
//                                     onChange={async (e) => {
//                                       const file = e.target.files[0];
//                                       if (file) {
//                                         setloading(true);
//                                         const uploadedUrl =
//                                           await getUploadParams(file);
//                                         if (uploadedUrl) {
//                                           setSpeaker2CompanyLogo(uploadedUrl);
//                                         }
//                                         setloading(false);
//                                       }
//                                     }}
//                                   />
//                                 </div>
//                                 {speaker2CompanyLogo?.length > 0 && (
//                                   <div className="mt-2">
//                                     <img
//                                       src={speaker2CompanyLogo}
//                                       alt="uploaded-Logo"
//                                       height={100}
//                                       width={100}
//                                     />
//                                   </div>
//                                 )}
//                               </div>

//                               <div className="col-md-8 mt-2">
//                                 <div>
//                                   <Label
//                                     htmlFor="speaker2-id"
//                                     className="form-label"
//                                   >
//                                     Speaker 2 ID
//                                   </Label>
//                                   <Input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Enter Speaker 2 ID"
//                                     value={speaker2Id}
//                                     onChange={(e) =>
//                                       setSpeaker2Id(e.target.value)
//                                     }
//                                   />
//                                 </div>
//                               </div>

//                               {/* Speaker 2 Bullet Points */}
//                               {speaker2BulletPoints.map(
//                                 (bulletPoint, index) => (
//                                   <div
//                                     key={bulletPoint.id}
//                                     className="d-flex mt-2 gap-4 align-items-end"
//                                   >
//                                     <div className="col-md-8">
//                                       <div>
//                                         <label
//                                           htmlFor={`speaker2-bullet-${bulletPoint.id}`}
//                                           className="form-label"
//                                         >
//                                           Speaker 2 Bullet Point {index + 1}
//                                         </label>
//                                         <input
//                                           id={`speaker2-bullet-${bulletPoint.id}`}
//                                           type="text"
//                                           className="form-control"
//                                           placeholder="Enter Detail"
//                                           value={bulletPoint.value}
//                                           onChange={(e) =>
//                                             handleSpeaker2InputChange(
//                                               bulletPoint.id,
//                                               e.target.value
//                                             )
//                                           }
//                                         />
//                                       </div>
//                                     </div>

//                                     <div className="col-md-4 d-flex gap-2">
//                                       {speaker2BulletPoints.length > 1 && (
//                                         <button
//                                           type="button"
//                                           onClick={() =>
//                                             deleteSpeaker2BulletPoint(
//                                               bulletPoint.id
//                                             )
//                                           }
//                                           className="btn btn-danger d-flex align-items-center gap-1"
//                                         >
//                                           <Trash2 size={16} />
//                                           Delete
//                                         </button>
//                                       )}

//                                       {index ===
//                                         speaker2BulletPoints.length - 1 && (
//                                           <button
//                                             type="button"
//                                             onClick={addSpeaker2BulletPoint}
//                                             className="btn btn-success d-flex align-items-center gap-1"
//                                           >
//                                             <Plus size={16} />
//                                             Add
//                                           </button>
//                                         )}
//                                     </div>
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           )}
//                         </>
//                       )}

//                     {/* Panel Speakers Fields */}
//                     {speakerFormat?.value === "Panel Speaker" &&
//                       selectedSpeakers &&
//                       selectedSpeakers.length > 0 && (
//                         <>
//                           <div className="mt-4">
//                             <h5>Panel Speakers</h5>

//                             {selectedSpeakers.map((speaker, index) => (
//                               <div
//                                 key={speaker.value}
//                                 className="mt-3 p-3 border rounded"
//                               >
//                                 <h6>{speaker.label}</h6>

//                                 <div className="col-md-8 mt-2">
//                                   <div>
//                                     <Label
//                                       htmlFor={`panel-speaker-${speaker.value}-image`}
//                                       className="form-label"
//                                     >
//                                       Speaker Agenda Image
//                                     </Label>
//                                     <Input
//                                       type="file"
//                                       className="form-control"
//                                       accept="image/*"
//                                       onChange={async (e) => {
//                                         const file = e.target.files[0];
//                                         if (file) {
//                                           setloading(true);
//                                           const uploadedUrl =
//                                             await getUploadParams(file);
//                                           if (uploadedUrl) {
//                                             handlePanelSpeakerImageChange(
//                                               speaker.value,
//                                               uploadedUrl
//                                             );
//                                           }
//                                           setloading(false);
//                                         }
//                                       }}
//                                     />
//                                   </div>
//                                   {panelSpeakerImages?.[speaker.value] && (
//                                     <div className="mt-2">
//                                       <img
//                                         src={panelSpeakerImages[speaker.value]}
//                                         alt="uploaded-speaker-image"
//                                         height={100}
//                                         width={100}
//                                         style={{ objectFit: "cover" }}
//                                       />
//                                     </div>
//                                   )}
//                                 </div>

//                                 <div className="col-md-8 mt-2">
//                                   <div>
//                                     <Label
//                                       htmlFor={`panel-speaker-${speaker.value}-id`}
//                                       className="form-label"
//                                     >
//                                       Speaker ID
//                                     </Label>
//                                     <Input
//                                       type="text"
//                                       className="form-control"
//                                       placeholder="Enter Speaker ID"
//                                       value={
//                                         panelSpeakerIds[speaker.value] || ""
//                                       }
//                                       onChange={(e) =>
//                                         handlePanelSpeakerIdChange(
//                                           speaker.value,
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                   </div>
//                                 </div>

//                                 <div className="col-md-8 mt-2">
//                                   <div>
//                                     <Label
//                                       htmlFor={`panel-speaker-${speaker.value}-moderator`}
//                                       className="form-label"
//                                     >
//                                       Is Moderator
//                                     </Label>
//                                     <div className="input-group">
//                                       <Select
//                                         value={
//                                           panelModeratorSelections[
//                                           speaker.value
//                                           ] || null
//                                         }
//                                         onChange={(selectedOption) =>
//                                           handlePanelModeratorChange(
//                                             speaker.value,
//                                             selectedOption
//                                           )
//                                         }
//                                         options={moderatorOptions}
//                                         name={`panel-speaker-${speaker.value}-moderator`}
//                                         classNamePrefix="select2-selection form-select"
//                                         className="w-100"
//                                         placeholder="Select Yes or No"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}

//                             {/* Common Bullet Points for Panel */}
//                             <div className="mt-4">
//                               <h6>
//                                 Common Bullet Points (for all panel speakers)
//                               </h6>
//                               {bulletPoints.map((bulletPoint, index) => (
//                                 <div
//                                   key={bulletPoint.id}
//                                   className="d-flex mt-2 gap-4 align-items-end"
//                                 >
//                                   <div className="col-md-8">
//                                     <div>
//                                       <label
//                                         htmlFor={`panel-bullet-${bulletPoint.id}`}
//                                         className="form-label"
//                                       >
//                                         Bullet Point {index + 1}
//                                       </label>
//                                       <input
//                                         id={`panel-bullet-${bulletPoint.id}`}
//                                         type="text"
//                                         className="form-control"
//                                         placeholder="Enter Detail"
//                                         value={bulletPoint.value}
//                                         onChange={(e) =>
//                                           handleInputChange(
//                                             bulletPoint.id,
//                                             e.target.value
//                                           )
//                                         }
//                                       />
//                                     </div>
//                                   </div>

//                                   <div className="col-md-4 d-flex gap-2">
//                                     {bulletPoints.length > 1 && (
//                                       <button
//                                         type="button"
//                                         onClick={() =>
//                                           deleteBulletPoint(bulletPoint.id)
//                                         }
//                                         className="btn btn-danger d-flex align-items-center gap-1"
//                                       >
//                                         <Trash2 size={16} />
//                                         Delete
//                                       </button>
//                                     )}

//                                     {index === bulletPoints.length - 1 && (
//                                       <button
//                                         type="button"
//                                         onClick={addBulletPoint}
//                                         className="btn btn-success d-flex align-items-center gap-1"
//                                       >
//                                         <Plus size={16} />
//                                         Add
//                                       </button>
//                                     )}
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </>
//                       )}

//                     {/* Industry Trends - Common for all speaker formats */}
//                     {speakerFormat && selectedSpeakers && (
//                       <div className="col-md-8 mt-2">
//                         <div>
//                           <Label
//                             htmlFor="industry-trends"
//                             className="form-label"
//                           >
//                             Industry Trends{" "}
//                           </Label>
//                           <Select
//                             value={selectMulti}
//                             isMulti={true}
//                             onChange={(sortBy) => {
//                               setselectMulti(sortBy);
//                             }}
//                             options={industryTrendOptions(industriesList)}
//                             classNamePrefix="js-example-basic-multiple mb-0"
//                             styles={customStyles}
//                           />
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 )}
//                 {selectedStatusOption?.value === "Coffe/Launch" && (
//                   <div className="col-md-8 mt-2">
//                     <div>
//                       <Label
//                         htmlFor="customername-field"
//                         className="form-label"
//                       >
//                         Sponsored By{" "}
//                       </Label>
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Sponsor Name"
//                         aria-label="name"
//                         aria-describedby="basic-addon1"
//                         value={sponsorBy}
//                         onChange={(e) => {
//                           setSponsorBy(e.target.value);
//                         }}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {selectedStatusOption?.value === "Session" && (
//                   <div className="mt-4">
//                     <h6>Bullet Points</h6>
//                     {bulletPoints.map((bulletPoint, index) => (
//                       <div
//                         key={bulletPoint.id}
//                         className="d-flex mt-2 gap-4 align-items-end"
//                       >
//                         <div className="col-md-8">
//                           <div>
//                             <label
//                               htmlFor={`panel-bullet-${bulletPoint.id}`}
//                               className="form-label"
//                             >
//                               Bullet Point {index + 1}
//                             </label>
//                             <input
//                               id={`panel-bullet-${bulletPoint.id}`}
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter Detail"
//                               value={bulletPoint.value}
//                               onChange={(e) =>
//                                 handleInputChange(
//                                   bulletPoint.id,
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           </div>
//                         </div>

//                         <div className="col-md-4 d-flex gap-2">
//                           {bulletPoints.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => deleteBulletPoint(bulletPoint.id)}
//                               className="btn btn-danger d-flex align-items-center gap-1"
//                             >
//                               <Trash2 size={16} />
//                               Delete
//                             </button>
//                           )}

//                           {index === bulletPoints.length - 1 && (
//                             <button
//                               type="button"
//                               onClick={addBulletPoint}
//                               className="btn btn-success d-flex align-items-center gap-1"
//                             >
//                               <Plus size={16} />
//                               Add
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="col-md-8 mt-2">
//                   <div>
//                     <Label htmlFor="sort-order" className="form-label">
//                       Sort Order{" "}
//                     </Label>
//                     <Input
//                       type="text"
//                       className="form-control"
//                       placeholder="Enter Sort Order"
//                       aria-label="name"
//                       aria-describedby="basic-addon1"
//                       value={sortOrder}
//                       disabled
//                       onChange={(e) => {
//                         setSortOrder(e.target.value);
//                       }}
//                     />
//                   </div>
//                 </div>

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

// export default AddAgenda;
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
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { Trash2, Plus } from "lucide-react";

const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const status = [
  { label: "Day", value: "Day" },
  { label: "Speaker", value: "Speaker" },
  { label: "Session", value: "Session" },
  { label: "Coffe/Launch", value: "Coffe/Launch" },
  { label: "Open/Close", value: "Open/Close" },
  { label: "Registration", value: "Registration" },
];

const dayOption = [
  { label: "Day1", value: "Day1" },
  { label: "Day2", value: "Day2" },
];

const speakerFormatOptions = [
  { label: "Single Speaker", value: "Single Speaker" },
  { label: "Two Speakers", value: "Two Speakers" },
  { label: "Panel Speaker", value: "Panel Speaker" },
];

const moderatorOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const BASE_URL = "https://www.australia.lithium-downstream-summit.com"; // USE LOCAL FOR DEBUGGING

const AddAgenda = () => {
  const navigate = useNavigate();

  // Existing states
  const [selectedStatusOption, setSelectedStatusOption] = useState({
    label: "Speaker",
    value: "Speaker",
  });
  const [selectedStatusOptionErr, setSelectedStatusOptionErr] = useState(false);
  const [selectedDay, setSelectedDay] = useState({
    label: "Day1",
    value: "Day1",
  });
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [heading, setHeading] = useState("");
  const [sponsorBy, setSponsorBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectMulti, setselectMulti] = useState(null);
  const [bulletPoints, setBulletPoints] = useState([{ id: 1, value: "" }]);
  const [nextId, setNextId] = useState(2);
  const [industriesList, setIndustriesList] = useState([]);
  const [loading, setloading] = useState(false);

  const [eventSpeakers, setEventSpeakers] = useState([]);

  // New states for speaker format
  const [speakerFormat, setSpeakerFormat] = useState(null);
  const [selectedSpeakers, setSelectedSpeakers] = useState(null);

  // Single Speaker states
  const [singleSpeakerAgendaImage, setSingleSpeakerAgendaImage] = useState("");
  const [singleSpeakerCompanyLogo, setSingleSpeakerCompanyLogo] = useState("");
  const [singleSpeakerId, setSingleSpeakerId] = useState("");
  const [singleSpeakerName, setSingleSpeakerName] = useState("");
  const [singleSpeakerCompanyName, setSingleSpeakerCompanyName] = useState("");

  // Two Speakers states
  const [speaker1AgendaImage, setSpeaker1AgendaImage] = useState("");
  const [speaker1CompanyLogo, setSpeaker1CompanyLogo] = useState("");
  const [speaker1BulletPoints, setSpeaker1BulletPoints] = useState([
    { id: 1, value: "" },
  ]);
  const [speaker1NextId, setSpeaker1NextId] = useState(2);
  const [speaker1Id, setSpeaker1Id] = useState("");
  const [speaker1Name, setSpeaker1Name] = useState("");
  const [speaker1CompanyName, setSpeaker1CompanyName] = useState("");
  const [selectedSpeaker1, setSelectedSpeaker1] = useState(null);

  const [speaker2AgendaImage, setSpeaker2AgendaImage] = useState("");
  const [speaker2CompanyLogo, setSpeaker2CompanyLogo] = useState("");
  const [speaker2BulletPoints, setSpeaker2BulletPoints] = useState([
    { id: 1, value: "" },
  ]);
  const [speaker2NextId, setSpeaker2NextId] = useState(2);
  const [speaker2Id, setSpeaker2Id] = useState("");
  const [speaker2Name, setSpeaker2Name] = useState("");
  const [speaker2CompanyName, setSpeaker2CompanyName] = useState("");
  const [selectedSpeaker2, setSelectedSpeaker2] = useState(null);

  // Panel Speaker states
  const [panelSpeakerImages, setPanelSpeakerImages] = useState({});
  const [panelSpeakerIds, setPanelSpeakerIds] = useState({});
  const [panelModeratorSelections, setPanelModeratorSelections] = useState({});

  // Dynamic panel speakers list (add/remove like bullet points)
  const [panelSpeakers, setPanelSpeakers] = useState([
    { id: 1, name: "", companyName: "", selectedSpeaker: null, agendaImage: "" },
  ]);
  const [panelNextId, setPanelNextId] = useState(2);

  let color = "#405189";

  // Existing functions
  const handleInputChange = (id, value) => {
    setBulletPoints((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const addBulletPoint = () => {
    setBulletPoints((prev) => [...prev, { id: nextId, value: "" }]);
    setNextId((prev) => prev + 1);
  };

  const deleteBulletPoint = (id) => {
    if (bulletPoints.length > 1) {
      setBulletPoints((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Speaker 1 bullet points functions
  const handleSpeaker1InputChange = (id, value) => {
    setSpeaker1BulletPoints((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const addSpeaker1BulletPoint = () => {
    setSpeaker1BulletPoints((prev) => [
      ...prev,
      { id: speaker1NextId, value: "" },
    ]);
    setSpeaker1NextId((prev) => prev + 1);
  };

  const deleteSpeaker1BulletPoint = (id) => {
    if (speaker1BulletPoints.length > 1) {
      setSpeaker1BulletPoints((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Speaker 2 bullet points functions
  const handleSpeaker2InputChange = (id, value) => {
    setSpeaker2BulletPoints((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const addSpeaker2BulletPoint = () => {
    setSpeaker2BulletPoints((prev) => [
      ...prev,
      { id: speaker2NextId, value: "" },
    ]);
    setSpeaker2NextId((prev) => prev + 1);
  };

  const deleteSpeaker2BulletPoint = (id) => {
    if (speaker2BulletPoints.length > 1) {
      setSpeaker2BulletPoints((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const customStyles = {
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#3762ea",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#405189",
      color: "white",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "white",
      backgroundColor: "#405189",
      ":hover": {
        backgroundColor: "#405189",
        color: "white",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: isSelected ? "white" : "black",
      backgroundColor: isSelected ? "#405189" : isFocused ? "#f0f0f0" : "white",
      ":hover": {
        backgroundColor: "#f0f0f0",
        color: "black",
      },
    }),
    control: (styles) => ({
      ...styles,
      borderColor: "#ced4da",
      ":hover": {
        borderColor: "#405189",
      },
    }),
  };

  useEffect(() => {
    callIndustryListApi();
    callEventSpeakersApi();
    callAgendaCountApi();
  }, []);

  const callAgendaCountApi = () => {
    fetch(`${BASE_URL}/admin1/getagenda`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.status !== false) {
          const list = data.agendaList || data;
          if (list.length > 0) {
            const lastItem = list.reduce((prev, current) =>
              prev.id > current.id ? prev : current
            );

            if (lastItem) {
              if (lastItem.endTime) setStartTime(lastItem.endTime);
              if (lastItem.day) {
                setSelectedDay({
                  label: lastItem.day,
                  value: lastItem.day,
                });
              }
              const nextSortOrder = (parseInt(lastItem.sortOrder) || 0) + 1;
              setSortOrder(nextSortOrder);
            }
          } else {
            setSortOrder(0);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching agenda count:", error);
      });
  };

  // Reset panel states when speaker selection changes
  useEffect(() => {
    if (speakerFormat?.value === "Panel Speaker" && selectedSpeakers && Array.isArray(selectedSpeakers)) {
      const newImages = { ...panelSpeakerImages };
      const newIds = { ...panelSpeakerIds };
      const newModerators = { ...panelModeratorSelections };

      let changed = false;
      selectedSpeakers.forEach((speaker) => {
        if (!(speaker.value in newImages)) {
          newImages[speaker.value] = "";
          changed = true;
        }
        if (!(speaker.value in newIds)) {
          newIds[speaker.value] = "";
          changed = true;
        }
        if (!(speaker.value in newModerators)) {
          newModerators[speaker.value] = null;
          changed = true;
        }
      });

      if (changed) {
        setPanelSpeakerImages(newImages);
        setPanelSpeakerIds(newIds);
        setPanelModeratorSelections(newModerators);
      }
    }
  }, [selectedSpeakers, speakerFormat]);

  const callIndustryListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`${BASE_URL}/admin1/eventindustrytrends`, requestOptions)
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
          setIndustriesList(data["eventIndustryTrends"]);
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

  const industryTrendOptions = (list) => {
    let arr = [];
    list.length > 0 &&
      list.map((option) => {
        let obj = {
          value: option.id,
          label: option.trendTitle,
        };
        arr.push(obj);
      });
    return arr;
  };

  const callEventSpeakersApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`${BASE_URL}/admin1/eventspeakers`, requestOptions)
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
          setEventSpeakers(data["eventSpeakersList"]);
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

  const speakerOptions = (list) => {
    let arr = [];
    list.length > 0 &&
      list.map((option) => {
        let obj = {
          value: option.id,
          label: option.eventSpeakerName,
          companyName: option.eventSpeakerCompany,
        };
        arr.push(obj);
      });
    return arr;
  };

  // Handle panel speaker image change
  const handlePanelSpeakerImageChange = (speakerId, value) => {
    setPanelSpeakerImages((prev) => ({
      ...prev,
      [speakerId]: value,
    }));
  };

  // Handle panel speaker ID change
  const handlePanelSpeakerIdChange = (speakerId, value) => {
    setPanelSpeakerIds((prev) => ({
      ...prev,
      [speakerId]: value,
    }));
  };

  // Handle panel moderator selection change
  const handlePanelModeratorChange = (speakerId, selectedOption) => {
    setPanelModeratorSelections((prev) => ({
      ...prev,
      [speakerId]: selectedOption,
    }));
  };

  // Dynamic panel speakers functions
  const addPanelSpeaker = () => {
    setPanelSpeakers((prev) => [
      ...prev,
      { id: panelNextId, name: "", companyName: "", selectedSpeaker: null, agendaImage: "" },
    ]);
    setPanelNextId((prev) => prev + 1);
  };

  const removePanelSpeaker = (id) => {
    if (panelSpeakers.length > 1) {
      setPanelSpeakers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const updatePanelSpeaker = (id, field, value) => {
    setPanelSpeakers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const getUploadParams = async (file) => {
    const finalData = new FormData();
    finalData.append("media", file);
    const requestOptions = {
      method: "POST",
      body: finalData,
    };

    try {
      const response = await fetch(
        `${BASE_URL}/admin1/upload`,
        requestOptions
      );
      const data = await response.json();

      if (
        data.detail === "The Token is expired" ||
        data.message === "Invalid token"
      ) {
        localStorage.clear();
        navigate("/logout");
        return null;
      }

      if (data.uploadedURL) {
        return data.uploadedURL;
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("There was an error, Please try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
      return null;
    }
  };

  const formDataToJSON = (formData) => {
    const obj = {};
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        obj[key] = {
          name: value.name,
          size: value.size,
          type: value.type,
          lastModified: value.lastModified,
        };
      } else {
        obj[key] = value;
      }
    }
    return JSON.stringify(obj, null, 2);
  };

  const handleSubmitWithFormData = (e) => {
    e.preventDefault();
    if (selectedStatusOption === null) {
      toast.error("Please Select the Status", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSelectedStatusOptionErr(true);
    } else {
      const formDataObj = new FormData();
      formDataObj.append("status", selectedStatusOption?.label);
      formDataObj.append("heading", heading);
      formDataObj.append("day", selectedDay?.label);
      formDataObj.append("startTime", startTime);
      formDataObj.append("endTime", endTime);
      formDataObj.append("sponsorBy", sponsorBy);
      formDataObj.append("sortOrder", sortOrder);
      formDataObj.append("speakerFormat", speakerFormat?.label);
      formDataObj.append("bulletPoints", JSON.stringify(bulletPoints));
      formDataObj.append("industryTrends", JSON.stringify(selectMulti));
      formDataObj.append(
        "speaker1Bullets",
        JSON.stringify(speaker1BulletPoints)
      );
      formDataObj.append(
        "speaker2Bullets",
        JSON.stringify(speaker2BulletPoints)
      );
      formDataObj.append("panelSpeakers", JSON.stringify(panelSpeakers.map(s => ({
        id: s.id,
        name: s.name,
        companyName: s.companyName,
        selectedSpeaker: s.selectedSpeaker,
        agendaImage: s.agendaImage,
      }))));
      formDataObj.append(
        "panelSpeakerImages",
        JSON.stringify(panelSpeakerImages)
      );
      formDataObj.append("panelSpeakerIds", JSON.stringify(panelSpeakerIds));
      formDataObj.append(
        "panelModerators",
        JSON.stringify(panelModeratorSelections)
      );
      formDataObj.append("selectedSpeakers", JSON.stringify(selectedSpeakers));
      formDataObj.append("singleSpeakerName", singleSpeakerName);
      formDataObj.append("singleSpeakerCompanyName", singleSpeakerCompanyName);
      formDataObj.append("speaker1Name", speaker1Name);
      formDataObj.append("speaker1CompanyName", speaker1CompanyName);
      formDataObj.append("selectedSpeaker1", JSON.stringify(selectedSpeaker1));
      formDataObj.append("speaker2Name", speaker2Name);
      formDataObj.append("speaker2CompanyName", speaker2CompanyName);
      formDataObj.append("selectedSpeaker2", JSON.stringify(selectedSpeaker2));

      if (singleSpeakerAgendaImage) {
        formDataObj.append("singleSpeakerAgendaImg", singleSpeakerAgendaImage);
      }
      if (singleSpeakerCompanyLogo) {
        formDataObj.append("singleSpeakerCompanyImg", singleSpeakerCompanyLogo);
      }
      formDataObj.append("singleSpeakerId", singleSpeakerId);

      if (speaker1AgendaImage) {
        formDataObj.append("Speaker1AgendaImg", speaker1AgendaImage);
      }
      if (speaker1CompanyLogo) {
        formDataObj.append("Speaker1CompanyImg", speaker1CompanyLogo);
      }
      formDataObj.append("Speaker1Id", speaker1Id);

      if (speaker2AgendaImage) {
        formDataObj.append("Speaker2AgendaImg", speaker2AgendaImage);
      }
      if (speaker2CompanyLogo) {
        formDataObj.append("Speaker2CompanyImg", speaker2CompanyLogo);
      }
      formDataObj.append("Speaker2Id", speaker2Id);

      Object.entries(panelSpeakerImages).forEach(([speakerId, file]) => {
        if (file) {
          formDataObj.append(`panelSpeakerImage_${speakerId}`, file);
        }
      });

      const requestOptions = {
        method: "POST",
        body: formDataObj,
      };
      fetch(`${BASE_URL}/admin1/addagenda`, requestOptions)
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
            setSelectedStatusOption({
              label: "Speaker",
              value: "Speaker",
            });
            setSelectedDay({
              label: "Day1",
              value: "Day1",
            });
            setStartTime("");
            setEndTime("");
            setHeading("");
            setSponsorBy("");
            setSortOrder("");
            setselectMulti(null);
            setSortOrder("");
            setBulletPoints([{ id: 1, value: "" }]);
            setNextId(2);
            setSpeakerFormat(null);
            setSelectedSpeakers(null);
            setSingleSpeakerAgendaImage("");
            setSingleSpeakerCompanyLogo("");
            setSingleSpeakerId("");
            setSingleSpeakerName("");
            setSingleSpeakerCompanyName("");
            setSpeaker1AgendaImage("");
            setSpeaker1CompanyLogo("");
            setSpeaker1BulletPoints([{ id: 1, value: "" }]);
            setSpeaker1NextId(2);
            setSpeaker1Id("");
            setSpeaker1Name("");
            setSpeaker1CompanyName("");
            setSelectedSpeaker1(null);
            setSpeaker2AgendaImage("");
            setSpeaker2CompanyLogo("");
            setSpeaker2BulletPoints([{ id: 1, value: "" }]);
            setSpeaker2NextId(2);
            setSpeaker2Id("");
            setSpeaker2Name("");
            setSpeaker2CompanyName("");
            setSelectedSpeaker2(null);
            setPanelSpeakerImages({});
            setPanelSpeakerIds({});
            setPanelModeratorSelections({});
            setPanelSpeakers([{ id: 1, name: "", companyName: "", selectedSpeaker: null, agendaImage: "" }]);
            setPanelNextId(2);
            setselectMulti(null);
            navigate("/agendalist");
          } else {
            toast.error(data?.message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
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
    }
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
        <BreadCrumb title="Add Agenda" pageTitle="Agenda List" pageLink="/agendalist" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>

                {/* ── 1. Status ── */}
                <div className="col-md-8">
                  <div>
                    <Label htmlFor="amount-field" className="form-label">
                      Status <span className="required_span">*</span>
                    </Label>
                    <div className="input-group">
                      <Select
                        value={selectedStatusOption}
                        onChange={(selectedStatus) => {
                          setSelectedStatusOption(selectedStatus);
                          if (selectedStatus?.value === "Day") {
                            setStartTime("");
                            setEndTime("");
                          }
                        }}
                        options={status}
                        name="choices-publish-status-input"
                        classNamePrefix="select2-selection form-select"
                        className="w-100"
                      />
                    </div>
                  </div>
                </div>

                {/* ── 2. Select Day (always visible) ── */}
                <div className="col-md-8 mt-2">
                  <div>
                    <Label htmlFor="amount-field" className="form-label">
                      Select Day <span className="required_span">*</span>
                    </Label>
                    <div className="input-group">
                      <Select
                        value={selectedDay}
                        onChange={(selectedDayOption) => {
                          setSelectedDay(selectedDayOption);
                        }}
                        options={dayOption}
                        name="choices-publish-status-input"
                        classNamePrefix="select2-selection form-select"
                        className="w-100"
                      />
                    </div>
                  </div>
                </div>

                {/* ── 3. Start Time & End Time ── */}
                {(
                  selectedStatusOption?.value === "Registration" ||
                  selectedStatusOption?.value === "Open/Close" ||
                  selectedStatusOption?.value === "Coffe/Launch" ||
                  selectedStatusOption?.value === "Speaker" ||
                  selectedStatusOption?.value === "Session") && (
                    <>
                      <div className="col-md-8 mt-2">
                        <div>
                          <Label htmlFor="amount-field" className="form-label">
                            Start Time <span className="required_span">*</span>
                          </Label>
                          <div className="input-group">
                            <Flatpickr
                              className="form-control"
                              options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                                time_24hr: true,
                              }}
                              onReady={(selectedDates, dateStr, instance) => {
                                if (instance.hourElement) {
                                  instance.hourElement.addEventListener("keyup", (e) => {
                                    if (e.target.value.length === 2) {
                                      instance.minuteElement?.focus();
                                    }
                                  });
                                }
                              }}
                              value={startTime}
                              onChange={(date, dateStr) => {
                                setStartTime(dateStr);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-8 mt-2">
                        <div>
                          <Label htmlFor="amount-field" className="form-label">
                            End Time <span className="required_span">*</span>
                          </Label>
                          <div className="input-group">
                            <Flatpickr
                              className="form-control"
                              options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                                time_24hr: true,
                              }}
                              onReady={(selectedDates, dateStr, instance) => {
                                if (instance.hourElement) {
                                  instance.hourElement.addEventListener("keyup", (e) => {
                                    if (e.target.value.length === 2) {
                                      instance.minuteElement?.focus();
                                    }
                                  });
                                }
                              }}
                              value={endTime}
                              onChange={(date, dateStr) => {
                                setEndTime(dateStr);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                {/* ── 4. Heading (non-Speaker OR Single/Two/Panel Speaker) ── */}
                {(selectedStatusOption?.value !== "Speaker" ||
                  speakerFormat?.value === "Single Speaker" ||
                  speakerFormat?.value === "Two Speakers" ||
                  speakerFormat?.value === "Panel Speaker") && (
                    <div className="col-md-8 mt-2">
                      <div>
                        <Label htmlFor="customername-field" className="form-label">
                          Heading
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Enter Heading"
                          aria-label="name"
                          aria-describedby="basic-addon1"
                          value={heading}
                          onChange={(e) => setHeading(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                {/* ── Speaker Status Sections ── */}
                {selectedStatusOption?.value === "Speaker" && (
                  <>
                    {/* ── 5. Speaker Format ── */}
                    <div className="col-md-8 mt-2">
                      <div>
                        <Label htmlFor="speaker-format" className="form-label">
                          Speaker Format <span className="required_span">*</span>
                        </Label>
                        <div className="input-group">
                          <Select
                            value={speakerFormat}
                            onChange={(selectedFormat) => {
                              setSpeakerFormat(selectedFormat);
                              setSelectedSpeakers(null);
                              setPanelSpeakers([{ id: 1, name: "", companyName: "", selectedSpeaker: null, agendaImage: "" }]);
                              setPanelNextId(2);
                            }}
                            options={speakerFormatOptions}
                            name="speaker-format-input"
                            classNamePrefix="select2-selection form-select"
                            className="w-100"
                            placeholder="Select Speaker Format"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ────────────────────────────────────────────────
                        SINGLE SPEAKER FLOW
                    ──────────────────────────────────────────────── */}
                    {speakerFormat?.value === "Single Speaker" && (
                      <>
                        {/* ── 6. Speaker Name ── */}
                        <div className="col-md-8 mt-2">
                          <div>
                            <Label htmlFor="speaker-name-field" className="form-label">
                              Speaker Name
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Speaker Name"
                              value={singleSpeakerName}
                              onChange={(e) => setSingleSpeakerName(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* ── 7. Company Name ── */}
                        <div className="col-md-8 mt-2">
                          <div>
                            <Label htmlFor="company-name-field" className="form-label">
                              Company Name
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Company Name"
                              value={singleSpeakerCompanyName}
                              onChange={(e) => setSingleSpeakerCompanyName(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* ── 8. Select Speaker(s) ── */}
                        <div className="col-md-8 mt-2">
                          <div>
                            <Label htmlFor="speaker-select" className="form-label">
                              Select Speaker(s)
                            </Label>
                            <div className="input-group">
                              <Select
                                value={selectedSpeakers}
                                onChange={(val) => {
                                  setSelectedSpeakers(val);
                                }}
                                options={speakerOptions(eventSpeakers)}
                                isMulti={false}
                                name="speaker-select-input"
                                classNamePrefix="select2-selection form-select"
                                className="w-100"
                                placeholder="Select Speaker"
                                styles={customStyles}
                              />
                            </div>
                          </div>
                        </div>

                        {/* ── 9. Speaker Agenda Image ── */}
                        <div className="col-md-8 mt-2">
                          <div>
                            <Label htmlFor="speaker-agenda-image" className="form-label">
                              Speaker Agenda Image
                            </Label>
                            <Input
                              type="file"
                              className="form-control"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setloading(true);
                                  const uploadedUrl = await getUploadParams(file);
                                  if (uploadedUrl) {
                                    setSingleSpeakerAgendaImage(uploadedUrl);
                                  }
                                  setloading(false);
                                }
                              }}
                            />
                          </div>
                          {singleSpeakerAgendaImage?.length > 0 && (
                            <div className="mt-2">
                              <img
                                src={singleSpeakerAgendaImage}
                                alt="uploaded-Logo"
                                height={100}
                                width={100}
                              />
                            </div>
                          )}
                        </div>

                        {/* ── 10. Speaker Company Logo ── */}
                        <div className="col-md-8 mt-2">
                          <div>
                            <Label htmlFor="speaker-company-logo" className="form-label">
                              Speaker Company Logo
                            </Label>
                            <Input
                              type="file"
                              className="form-control"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setloading(true);
                                  const uploadedUrl = await getUploadParams(file);
                                  if (uploadedUrl) {
                                    setSingleSpeakerCompanyLogo(uploadedUrl);
                                  }
                                  setloading(false);
                                }
                              }}
                            />
                          </div>
                          {singleSpeakerCompanyLogo?.length > 0 && (
                            <div className="mt-2">
                              <img
                                src={singleSpeakerCompanyLogo}
                                alt="uploaded-Logo"
                                height={100}
                                width={100}
                              />
                            </div>
                          )}
                        </div>

                        {/* ── 11. Speaker ID (hidden field kept for API) ── */}
                        <div className="col-md-8 mt-2" style={{ display: "none" }}>
                          <Input
                            type="text"
                            value={singleSpeakerId}
                            onChange={(e) => setSingleSpeakerId(e.target.value)}
                          />
                        </div>

                        {/* ── 12. Bullet Points ── */}
                        <div className="mt-3">
                          {bulletPoints.map((bulletPoint, index) => (
                            <div
                              key={bulletPoint.id}
                              className="d-flex mt-2 gap-4 align-items-end"
                            >
                              <div className="col-md-8">
                                <label
                                  htmlFor={`customername-field-${bulletPoint.id}`}
                                  className="form-label"
                                >
                                  Bullet Point {index + 1}
                                </label>
                                <input
                                  id={`customername-field-${bulletPoint.id}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Detail"
                                  value={bulletPoint.value}
                                  onChange={(e) =>
                                    handleInputChange(bulletPoint.id, e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-md-4 d-flex gap-2">
                                {bulletPoints.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => deleteBulletPoint(bulletPoint.id)}
                                    className="btn btn-danger d-flex align-items-center gap-1"
                                  >
                                    <Trash2 size={16} />
                                    Delete
                                  </button>
                                )}
                                {index === bulletPoints.length - 1 && (
                                  <button
                                    type="button"
                                    onClick={addBulletPoint}
                                    className="btn btn-success d-flex align-items-center gap-1"
                                  >
                                    <Plus size={16} />
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* ── 13. Industry Trends ── */}
                        <div className="col-md-8 mt-2">
                          <div>
                            <Label htmlFor="industry-trends" className="form-label">
                              Industry Trends
                            </Label>
                            <Select
                              value={selectMulti}
                              isMulti={true}
                              onChange={(sortBy) => setselectMulti(sortBy)}
                              options={industryTrendOptions(industriesList)}
                              classNamePrefix="js-example-basic-multiple mb-0"
                              styles={customStyles}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* ────────────────────────────────────────────────
                        TWO SPEAKERS FLOW
                    ──────────────────────────────────────────────── */}
                    {speakerFormat?.value === "Two Speakers" && (
                      <>
                        {/* Bullet Points (common) */}
                        <div className="mt-3">
                          {bulletPoints.map((bulletPoint, index) => (
                            <div key={bulletPoint.id} className="d-flex mt-2 gap-4 align-items-end">
                              <div className="col-md-8">
                                <label htmlFor={`two-bullet-${bulletPoint.id}`} className="form-label">
                                  Bullet Point {index + 1}
                                </label>
                                <input
                                  id={`two-bullet-${bulletPoint.id}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Detail"
                                  value={bulletPoint.value}
                                  onChange={(e) => handleInputChange(bulletPoint.id, e.target.value)}
                                />
                              </div>
                              <div className="col-md-4 d-flex gap-2">
                                {bulletPoints.length > 1 && (
                                  <button type="button" onClick={() => deleteBulletPoint(bulletPoint.id)} className="btn btn-danger d-flex align-items-center gap-1">
                                    <Trash2 size={16} />Delete
                                  </button>
                                )}
                                {index === bulletPoints.length - 1 && (
                                  <button type="button" onClick={addBulletPoint} className="btn btn-success d-flex align-items-center gap-1">
                                    <Plus size={16} />Add
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Industry Trends */}
                        <div className="col-md-8 mt-2">
                          <div>
                            <Label htmlFor="industry-trends" className="form-label">
                              Industry Trends
                            </Label>
                            <Select
                              value={selectMulti}
                              isMulti={true}
                              onChange={(sortBy) => setselectMulti(sortBy)}
                              options={industryTrendOptions(industriesList)}
                              classNamePrefix="js-example-basic-multiple mb-0"
                              styles={customStyles}
                            />
                          </div>
                        </div>

                        {/* ── Speaker 1 block ── */}
                        <div className="mt-4 p-3 border rounded">
                          <h5 className="mb-3">Speaker 1</h5>

                          <div className="col-md-8 mt-2">
                            <Label htmlFor="speaker1-name" className="form-label">Speaker1 Name</Label>
                            <Input
                              type="text"
                              id="speaker1-name"
                              className="form-control"
                              placeholder="Enter Speaker 1 Name"
                              value={speaker1Name}
                              onChange={(e) => setSpeaker1Name(e.target.value)}
                            />
                          </div>

                          <div className="col-md-8 mt-2">
                            <Label htmlFor="company1-name" className="form-label">Company1 Name</Label>
                            <Input
                              type="text"
                              id="company1-name"
                              className="form-control"
                              placeholder="Enter Company 1 Name"
                              value={speaker1CompanyName}
                              onChange={(e) => setSpeaker1CompanyName(e.target.value)}
                            />
                          </div>

                          <div className="col-md-8 mt-2">
                            <Label htmlFor="speaker1-select" className="form-label">Select Speaker1(s)</Label>
                            <div className="input-group">
                              <Select
                                value={selectedSpeaker1}
                                onChange={setSelectedSpeaker1}
                                options={speakerOptions(eventSpeakers)}
                                isMulti={false}
                                name="speaker1-select-input"
                                classNamePrefix="select2-selection form-select"
                                className="w-100"
                                placeholder="Select Speaker 1"
                                styles={customStyles}
                              />
                            </div>
                          </div>

                          <div className="col-md-8 mt-2">
                            <Label htmlFor="speaker1-agenda-image" className="form-label">Speaker1 Agenda Image</Label>
                            <Input
                              type="file"
                              id="speaker1-agenda-image"
                              className="form-control"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setloading(true);
                                  const uploadedUrl = await getUploadParams(file);
                                  if (uploadedUrl) setSpeaker1AgendaImage(uploadedUrl);
                                  setloading(false);
                                }
                              }}
                            />
                            {speaker1AgendaImage?.length > 0 && (
                              <div className="mt-2">
                                <img src={speaker1AgendaImage} alt="speaker1-agenda" height={100} width={100} />
                              </div>
                            )}
                          </div>

                          <div className="col-md-8 mt-2">
                            <Label htmlFor="speaker1-company-logo" className="form-label">Speaker1 Company Logo</Label>
                            <Input
                              type="file"
                              id="speaker1-company-logo"
                              className="form-control"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setloading(true);
                                  const uploadedUrl = await getUploadParams(file);
                                  if (uploadedUrl) setSpeaker1CompanyLogo(uploadedUrl);
                                  setloading(false);
                                }
                              }}
                            />
                            {speaker1CompanyLogo?.length > 0 && (
                              <div className="mt-2">
                                <img src={speaker1CompanyLogo} alt="speaker1-company" height={100} width={100} />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* ── Speaker 2 block ── */}
                        <div className="mt-4 p-3 border rounded">
                          <h5 className="mb-3">Speaker 2</h5>

                          <div className="col-md-8 mt-2">
                            <Label htmlFor="speaker2-name" className="form-label">Speaker2 Name</Label>
                            <Input
                              type="text"
                              id="speaker2-name"
                              className="form-control"
                              placeholder="Enter Speaker 2 Name"
                              value={speaker2Name}
                              onChange={(e) => setSpeaker2Name(e.target.value)}
                            />
                          </div>

                          <div className="col-md-8 mt-2">
                            <Label htmlFor="company2-name" className="form-label">Company2 Name</Label>
                            <Input
                              type="text"
                              id="company2-name"
                              className="form-control"
                              placeholder="Enter Company 2 Name"
                              value={speaker2CompanyName}
                              onChange={(e) => setSpeaker2CompanyName(e.target.value)}
                            />
                          </div>

                          <div className="col-md-8 mt-2">
                            <Label htmlFor="speaker2-select" className="form-label">Select Speaker2(s)</Label>
                            <div className="input-group">
                              <Select
                                value={selectedSpeaker2}
                                onChange={setSelectedSpeaker2}
                                options={speakerOptions(eventSpeakers)}
                                isMulti={false}
                                name="speaker2-select-input"
                                classNamePrefix="select2-selection form-select"
                                className="w-100"
                                placeholder="Select Speaker 2"
                                styles={customStyles}
                              />
                            </div>
                          </div>

                          <div className="col-md-8 mt-2">
                            <Label htmlFor="speaker2-agenda-image" className="form-label">Speaker2 Agenda Image</Label>
                            <Input
                              type="file"
                              id="speaker2-agenda-image"
                              className="form-control"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setloading(true);
                                  const uploadedUrl = await getUploadParams(file);
                                  if (uploadedUrl) setSpeaker2AgendaImage(uploadedUrl);
                                  setloading(false);
                                }
                              }}
                            />
                            {speaker2AgendaImage?.length > 0 && (
                              <div className="mt-2">
                                <img src={speaker2AgendaImage} alt="speaker2-agenda" height={100} width={100} />
                              </div>
                            )}
                          </div>

                          <div className="col-md-8 mt-2">
                            <Label htmlFor="speaker2-company-logo" className="form-label">Speaker2 Company Logo</Label>
                            <Input
                              type="file"
                              id="speaker2-company-logo"
                              className="form-control"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setloading(true);
                                  const uploadedUrl = await getUploadParams(file);
                                  if (uploadedUrl) setSpeaker2CompanyLogo(uploadedUrl);
                                  setloading(false);
                                }
                              }}
                            />
                            {speaker2CompanyLogo?.length > 0 && (
                              <div className="mt-2">
                                <img src={speaker2CompanyLogo} alt="speaker2-company" height={100} width={100} />
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* ────────────────────────────────────────────────
                        PANEL SPEAKER FLOW
                    ──────────────────────────────────────────────── */}
                    {speakerFormat?.value === "Panel Speaker" && (
                      <>
                        {/* Bullet Points (common) */}
                        <div className="mt-3">
                          {bulletPoints.map((bulletPoint, index) => (
                            <div key={bulletPoint.id} className="d-flex mt-2 gap-4 align-items-end">
                              <div className="col-md-8">
                                <label htmlFor={`panel-bullet-${bulletPoint.id}`} className="form-label">
                                  Bullet Point {index + 1}
                                </label>
                                <input
                                  id={`panel-bullet-${bulletPoint.id}`}
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Detail"
                                  value={bulletPoint.value}
                                  onChange={(e) => handleInputChange(bulletPoint.id, e.target.value)}
                                />
                              </div>
                              <div className="col-md-4 d-flex gap-2">
                                {bulletPoints.length > 1 && (
                                  <button type="button" onClick={() => deleteBulletPoint(bulletPoint.id)} className="btn btn-danger d-flex align-items-center gap-1">
                                    <Trash2 size={16} />Delete
                                  </button>
                                )}
                                {index === bulletPoints.length - 1 && (
                                  <button type="button" onClick={addBulletPoint} className="btn btn-success d-flex align-items-center gap-1">
                                    <Plus size={16} />Add
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Industry Trends */}
                        <div className="col-md-8 mt-2">
                          <div>
                            <Label htmlFor="panel-industry-trends" className="form-label">
                              Industry Trends
                            </Label>
                            <Select
                              value={selectMulti}
                              isMulti={true}
                              onChange={(sortBy) => setselectMulti(sortBy)}
                              options={industryTrendOptions(industriesList)}
                              classNamePrefix="js-example-basic-multiple mb-0"
                              styles={customStyles}
                            />
                          </div>
                        </div>

                        {/* Dynamic Panel Speakers */}
                        <div className="mt-3">
                          {panelSpeakers.map((speaker, index) => (
                            <div key={speaker.id} className="mt-3 p-3 border rounded">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="mb-0">Speaker {index + 1}</h6>
                                {panelSpeakers.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removePanelSpeaker(speaker.id)}
                                    className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                                  >
                                    <Trash2 size={14} />Remove
                                  </button>
                                )}
                              </div>

                              {/* Speaker Name */}
                              <div className="col-md-8 mt-2">
                                <Label className="form-label">Speaker{index + 1} Name</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder={`Enter Speaker ${index + 1} Name`}
                                  value={speaker.name}
                                  onChange={(e) => updatePanelSpeaker(speaker.id, "name", e.target.value)}
                                />
                              </div>

                              {/* Company Name */}
                              <div className="col-md-8 mt-2">
                                <Label className="form-label">Company{index + 1} Name</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder={`Enter Company ${index + 1} Name`}
                                  value={speaker.companyName}
                                  onChange={(e) => updatePanelSpeaker(speaker.id, "companyName", e.target.value)}
                                />
                              </div>

                              {/* Select Speaker */}
                              <div className="col-md-8 mt-2">
                                <Label className="form-label">Select Speaker{index + 1}(s)</Label>
                                <div className="input-group">
                                  <Select
                                    value={speaker.selectedSpeaker}
                                    onChange={(val) => updatePanelSpeaker(speaker.id, "selectedSpeaker", val)}
                                    options={speakerOptions(eventSpeakers)}
                                    isMulti={false}
                                    classNamePrefix="select2-selection form-select"
                                    className="w-100"
                                    placeholder={`Select Speaker ${index + 1}`}
                                    styles={customStyles}
                                  />
                                </div>
                              </div>

                              {/* Agenda Image */}
                              <div className="col-md-8 mt-2">
                                <Label className="form-label">Speaker{index + 1} Agenda Image</Label>
                                <Input
                                  type="file"
                                  className="form-control"
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      setloading(true);
                                      const uploadedUrl = await getUploadParams(file);
                                      if (uploadedUrl) {
                                        updatePanelSpeaker(speaker.id, "agendaImage", uploadedUrl);
                                      }
                                      setloading(false);
                                    }
                                  }}
                                />
                                {speaker.agendaImage?.length > 0 && (
                                  <div className="mt-2">
                                    <img src={speaker.agendaImage} alt="agenda" height={100} width={100} style={{ objectFit: "cover" }} />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}

                          {/* Add Speaker Button */}
                          <button
                            type="button"
                            onClick={addPanelSpeaker}
                            className="btn btn-success mt-3 d-flex align-items-center gap-1"
                          >
                            <Plus size={16} />Add Speaker
                          </button>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* ── Coffe/Launch: Sponsored By ── */}
                {selectedStatusOption?.value === "Coffe/Launch" && (
                  <div className="col-md-8 mt-2">
                    <div>
                      <Label htmlFor="customername-field" className="form-label">
                        Sponsored By
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Sponsor Name"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={sponsorBy}
                        onChange={(e) => setSponsorBy(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* ── Session: Bullet Points ── */}
                {selectedStatusOption?.value === "Session" && (
                  <div className="mt-4">
                    <h6>Bullet Points</h6>
                    {bulletPoints.map((bulletPoint, index) => (
                      <div key={bulletPoint.id} className="d-flex mt-2 gap-4 align-items-end">
                        <div className="col-md-8">
                          <label htmlFor={`panel-bullet-${bulletPoint.id}`} className="form-label">
                            Bullet Point {index + 1}
                          </label>
                          <input
                            id={`panel-bullet-${bulletPoint.id}`}
                            type="text"
                            className="form-control"
                            placeholder="Enter Detail"
                            value={bulletPoint.value}
                            onChange={(e) => handleInputChange(bulletPoint.id, e.target.value)}
                          />
                        </div>
                        <div className="col-md-4 d-flex gap-2">
                          {bulletPoints.length > 1 && (
                            <button type="button" onClick={() => deleteBulletPoint(bulletPoint.id)} className="btn btn-danger d-flex align-items-center gap-1">
                              <Trash2 size={16} />Delete
                            </button>
                          )}
                          {index === bulletPoints.length - 1 && (
                            <button type="button" onClick={addBulletPoint} className="btn btn-success d-flex align-items-center gap-1">
                              <Plus size={16} />Add
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Sort Order (always at bottom) ── */}
                <div className="col-md-8 mt-2">
                  <div>
                    <Label htmlFor="sort-order" className="form-label">
                      Sort Order
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Enter Sort Order"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      value={sortOrder}
                      disabled
                      onChange={(e) => setSortOrder(e.target.value)}
                    />
                  </div>
                </div>

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

export default AddAgenda;