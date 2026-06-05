import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "../../assets/css/dropzone.css";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useApiData } from "../../../src/Components/Common/ApiContext.js";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const EditEventSpeaker = ({
  row,
  editSpeakerModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();
  console.log("eventDetails: ", eventDetails);
  const location = useLocation();
  const [speakerName, setSpeakerName] = useState("");
  const [speakerNameError, setSpeakerNameError] = useState(false);
  const [speakerCompany, setSpeakerCompany] = useState("");
  const [speakerCompanyError, setSpeakerCompanyError] = useState(false);
  const [speakerShortBio, setSpeakerShortBio] = useState("");
  const [speakerShortBioError, setSpeakerShortBioError] = useState(false);
  const [speakerBio, setSpeakerBio] = useState("");
  const [speakerBioError, setSpeakerBioError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [greyBgUrl, setGreyBgUrl] = useState("");
  console.log("greyBgUrl: ", greyBgUrl);
  const [whiteBgUrl, setWhiteBgUrl] = useState("");
  console.log("whiteBgUrl: ", whiteBgUrl);
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState("");
  console.log("originalPhotoUrl: ", originalPhotoUrl);
  const [speakerMetaTitle, setSpeakerMetaTitle] = useState("");
  const [speakerMetaTitleError, setSpeakerMetaTitleError] = useState(false);
  const [speakerMetaDescription, setSpeakerMetaDescription] = useState("");
  const [speakerMetaDescriptionError, setSpeakerMetaDescriptionError] =
    useState(false);
  const [speakerLinkedinFollowers, setSpeakerLinkedinFollowers] = useState("");
  const [speakerLinkedinFollowersError, setSpeakerLinkedinFollowersError] =
    useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setSpeakerName(row?.eventSpeakerName);
      setSpeakerCompany(row?.eventSpeakerCompany);
      setSpeakerShortBio(
        row?.eventSpeakerShortDescription?.replace(/^"(.*)"$/, "$1")
      );
      setSpeakerBio(row?.eventSpeakerDescription?.replace(/^"(.*)"$/, "$1"));
      setGreyBgUrl(row?.eventSpeakerProfilePageImage);
      setWhiteBgUrl(row?.eventSpeakerFeaturedPageImage);
      setOriginalPhotoUrl(row?.eventSpeakerHomePageImage);
      setSpeakerLinkedinFollowers(row?.eventSpeakerLinkedinFollowers);
      if (eventDetails?.isSeoEnable === "Yes") {
        setSpeakerMetaTitle(row?.eventSpeakerMetaTitle || "");
        setSpeakerMetaDescription(row?.eventSpeakerMetaDescription || "");
      }
    }
  }, [location]);

  const getUploadParams = async (file, type) => {
    const finalData = new FormData();
    finalData.append("media", file);

    const requestOptions = {
      method: "POST",
      body: finalData,
    };

    try {
      const response = await fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/upload",
        requestOptions
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
          case "grey":
            setGreyBgUrl(data.uploadedURL);
            break;
          case "white":
            setWhiteBgUrl(data.uploadedURL);
            break;
          case "original":
            setOriginalPhotoUrl(data.uploadedURL);
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

  // Helper function to get plain text length from HTML content
  const getPlainTextLength = (html) => {
    if (!html || html.trim() === "") return 0;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.trim().length;
  };

  const submitBtnClk = (e) => {
    e.preventDefault();
    const descriptionLength = getPlainTextLength(speakerShortBio);
    const longDescriptionLength = getPlainTextLength(speakerBio);
    // Reset errors
    setSpeakerShortBioError(false);
    setSpeakerBioError(false);
    if (speakerName === "") {
      toast.error("Speaker Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpeakerNameError(true);
      setVisible(false);
    } else if (speakerName?.length < 3) {
      toast.error("minimum 3 characters is Required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setSpeakerNameError(true);
    } else if (speakerLinkedinFollowers === "") {
      toast.error("Speaker Linkedin Followers is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpeakerLinkedinFollowersError(true);
      setVisible(false);
    } else if (longDescriptionLength === 0 || speakerBio.trim() === "") {
      toast.error("Speaker Bio. is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpeakerBioError(true);
      setVisible(false);
      return; // Stop execution
    } else if (longDescriptionLength > 700) {
      toast.error("Speaker Bio. cannot exceed 700 characters!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpeakerBioError(true);
      setVisible(false);
      return; // Stop execution - THIS WAS THE KEY ISSUE
    } else if (descriptionLength === 0 || speakerShortBio.trim() === "") {
      toast.error("Speaker Short Bio. is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpeakerShortBioError(true);
      setVisible(false);
      return; // Stop execution
    } else if (descriptionLength > 243) {
      toast.error("Speaker Short Bio. cannot exceed 243 characters!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpeakerShortBioError(true);
      setVisible(false);
      return; // Stop execution - THIS WAS THE KEY ISSUE
    } else if (
      eventDetails?.isSeoEnable === "Yes" &&
      speakerMetaTitle.length > 60
    ) {
      toast.error("Meta Title cannot exceed 60 characters!", {
        position: "top-right",
        autoClose: 5000,
      });
      setSpeakerMetaTitleError(true);
      setVisible(false);
    } else if (
      eventDetails?.isSeoEnable === "Yes" &&
      speakerMetaDescription.length > 160
    ) {
      toast.error("Meta Description cannot exceed 160 characters!", {
        position: "top-right",
        autoClose: 5000,
      });
      setSpeakerMetaDescriptionError(true);
      setVisible(false);

      // ----- ALL VALIDATIONS PASSED -----
    } else {
      setVisible(true);
      const authUser = localStorage.getItem("authUser");
      let client = JSON.parse(authUser);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("eventSpeakerName", speakerName);
      finalData.append("eventSpeakerCompany", speakerCompany);
      finalData.append(
        "eventSpeakerShortDescription",
        JSON.stringify(speakerShortBio)
      );
      finalData.append("eventSpeakerDescription", JSON.stringify(speakerBio));
      finalData.append("eventSpeakerHomePageImage", originalPhotoUrl);
      finalData.append("eventSpeakerProfilePageImage", greyBgUrl);
      finalData.append("eventSpeakerFeaturedPageImage", whiteBgUrl);
      finalData.append("eventSpeakerLinkedinFollowers", speakerLinkedinFollowers);
      if (eventDetails?.isSeoEnable === "Yes") {
        finalData.append("eventSpeakerMetaTitle", speakerMetaTitle);
        finalData.append("eventSpeakerMetaDescription", speakerMetaDescription);
      }
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/editeventspeakers",
        requestOptions
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
          if (data.status) {
            setVisible(true);
            onModalSubmitBtnClk();
            toast.success("Record Added Successfully.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            setloading(false);
            setVisible(false);
            toast.error(data?.message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          setVisible(false);
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
    }
  };

  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );

  return (
    <>
      <Modal
        id="showModal"
        size="lg"
        isOpen={editSpeakerModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Event Speaker
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Speaker Name <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${speakerNameError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Speaker Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={speakerName}
                    onChange={(e) => {
                      const nonNumericRegex = /^[A-Za-z\s]+$/;
                      if (
                        nonNumericRegex.test(e.target.value) ||
                        e.target.value === ""
                      ) {
                        setSpeakerName(e.target.value);
                        if (e.target.value?.length >= 3) {
                          setSpeakerNameError(false);
                        } else {
                          setSpeakerNameError(true);
                        }
                      } else {
                        toast.error("Type characters only");
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Speaker Company <span className="required_span">*</span>
                  </Label>
                  <div className="input-group">
                    <Input
                      type="text"
                      className={`form-control ${speakerCompanyError ? "border-danger" : ""
                        }`}
                      placeholder="Speaker Company"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      required
                      value={speakerCompany}
                      onChange={(e) => {
                        const nonNumericRegex = /^[A-Za-z\s]+$/;
                        if (
                          nonNumericRegex.test(e.target.value) ||
                          e.target.value === ""
                        ) {
                          setSpeakerCompany(e.target.value);
                          if (e.target.value?.length >= 3) {
                            setSpeakerCompanyError(false);
                          } else {
                            setSpeakerCompanyError(true);
                          }
                        } else {
                          toast.error("Type characters only");
                        }
                      }}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Speaker Short Bio <span className="required_span">*</span>{" "}
                    (Max. length 243 characters)
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={speakerShortBio}
                        name="speakerShortBio"
                        className={speakerShortBioError ? "border-danger" : ""}
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          const plainTextLength = getPlainTextLength(ipdata);
                          console.log("plainTextLength: ", plainTextLength);

                          if (plainTextLength <= 243) {
                            setSpeakerShortBio(ipdata);
                            if (plainTextLength >= 3) {
                              setSpeakerShortBioError(false);
                            }
                          } else {
                            // Optionally prevent further input
                            toast.error("Character limit reached!", {
                              position: "top-right",
                              autoClose: 2000,
                            });
                            setSpeakerShortBio(ipdata);
                            setSpeakerShortBioError(true);
                          }
                        }}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "3px",
                          color:
                            getPlainTextLength(speakerShortBio) > 243
                              ? "red"
                              : "inherit",
                        }}
                      >
                        Character count: {getPlainTextLength(speakerShortBio)}
                        /243
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Speaker Description <span className="required_span">*</span>{" "}
                    (Max. length 700 characters)
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={speakerBio}
                        name="speakerBio"
                        className={speakerBioError ? "border-danger" : ""}
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          const bioLength = getPlainTextLength(ipdata);
                          if (bioLength <= 700) {
                            setSpeakerBio(ipdata);
                            if (bioLength >= 3) {
                              setSpeakerBioError(false);
                            }
                          } else {
                            // Optionally prevent further input
                            toast.error("Character limit reached!", {
                              position: "top-right",
                              autoClose: 2000,
                            });
                            setSpeakerBio(ipdata);
                            setSpeakerBioError(true);
                          }
                        }}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "3px",
                          color:
                            getPlainTextLength(speakerBio) > 700
                              ? "red"
                              : "inherit",
                        }}
                      >
                        Character count: {getPlainTextLength(speakerBio)}
                        /700
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Speaker Linkedin Followers <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${speakerLinkedinFollowersError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Speaker Linkedin Followers"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={speakerLinkedinFollowers}
                    onChange={(e) => {
                      setSpeakerLinkedinFollowers(e.target.value);
                      setSpeakerLinkedinFollowersError(false);
                    }}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <Label>
                  Speaker Original Photo{" "}
                  <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) =>
                    getUploadParams(e.target.files[0], "original")
                  }
                />
              </div>
              {originalPhotoUrl?.length > 0 && (
                <div className="mt-2">
                  <img
                    src={originalPhotoUrl}
                    alt="uploaded-Logo"
                    height={100}
                    width={100}
                  />
                </div>
              )}
              <div className="col-md-12">
                <Label>
                  Speaker White Background Image{" "}
                  <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) => getUploadParams(e.target.files[0], "white")}
                />
              </div>
              {whiteBgUrl?.length > 0 && (
                <div className="mt-2">
                  <img
                    src={whiteBgUrl}
                    alt="uploaded-Logo"
                    height={100}
                    width={100}
                  />
                </div>
              )}
              <div className="col-md-12">
                <Label>
                  Speaker Grey Background Image{" "}
                  <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) => getUploadParams(e.target.files[0], "grey")}
                />
              </div>
              {greyBgUrl?.length > 0 && (
                <div className="mt-2">
                  <img
                    src={greyBgUrl}
                    alt="uploaded-Logo"
                    height={100}
                    width={100}
                  />
                </div>
              )}
              {eventDetails?.isSeoEnable === "Yes" && (
                <>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Speaker Meta Title{" "}
                        <span className="required_span">*</span> (Max. Length 60
                        Characters)
                      </Label>
                      <Input
                        type="text"
                        className={`form-control ${speakerMetaTitleError ? "border-danger " : ""
                          }`}
                        placeholder="Enter Meta Title"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={speakerMetaTitle}
                        onChange={(e) => {
                          setSpeakerMetaTitle(e.target.value);
                          if (e.target.value?.length > 60) {
                            setSpeakerMetaTitleError(true);
                          } else {
                            setSpeakerMetaTitleError(false);
                          }
                        }}
                      />
                      {/* Character Counter */}
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {speakerMetaTitle.length}/60
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Speaker Meta Description{" "}
                        <span className="required_span">*</span> (Max. Length
                        160 Characters)
                      </Label>
                      <textarea
                        type="text"
                        className={`form-control ${speakerMetaDescriptionError ? "border-danger " : ""
                          }`}
                        placeholder="Enter Meta Description"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={speakerMetaDescription}
                        rows={4}
                        onChange={(e) => {
                          setSpeakerMetaDescription(e.target.value);
                          if (e.target.value?.length > 160) {
                            setSpeakerMetaDescriptionError(true);
                          } else {
                            setSpeakerMetaDescriptionError(false);
                          }
                        }}
                      />
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {speakerMetaDescription.length}/160
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light border"
                onClick={() => {
                  onCloseModal();
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={(e) => {
                  submitBtnClk(e);
                }}
                disabled={visible}
              >
                Edit Speaker
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditEventSpeaker;
