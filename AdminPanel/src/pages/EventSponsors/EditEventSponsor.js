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
import Select from "react-select";
import { useApiData } from "../../../src/Components/Common/ApiContext.js";
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const sponsorTypes = [
  { label: "Dummy", value: "Dummy" },
  { label: "Silver", value: "Silver" },
  { label: "Gold", value: "Gold" },
  { label: "Platinum", value: "Platinum" },
  { label: "Lead", value: "Lead" },
  { label: "Associated", value: "Associated" },
];
const EditEventSponsor = ({
  row,
  editSponsorModal,
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
  const location = useLocation();
  const [sponsorComapnyName, setSponsorCompanyName] = useState("");
  const [sponsorComapnyNameError, setSponsorComapnyNameError] = useState(false);
  const [sponsorComapnyLogo, setSponsorComapnyLogo] = useState("");
  const [sponsorType, setSponsorType] = useState({});
  const [sponsorComapnyBioDescription, setSponsorComapnyBioDescription] =
    useState("");
  const [sponsorWebsite, setSponsorWebsite] = useState("");

  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [sponsorMetaTitle, setSponsorMetaTitle] = useState("");
  const [sponsorMetaTitleError, setSponsorMetaTitleError] = useState(false);
  const [sponsorMetaDescription, setSponsorMetaDescription] = useState("");
  const [sponsorMetaDescriptionError, setSponsorMetaDescriptionError] =
    useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setSponsorCompanyName(row?.sponsorComapnyName);
      setSponsorType({ label: row?.sponsorType, value: row?.sponsorType });
      setSponsorWebsite(row?.sponsorWebsite);
      setSponsorComapnyBioDescription(
        row?.sponsorComapnyBioDescription?.replace(/^"(.*)"$/, "$1")
      );
      setSponsorComapnyLogo(row?.sponsorComapnyLogo);
      if (eventDetails?.isSeoEnable === "Yes") {
        setSponsorMetaTitle(row?.eventSponsorMetaTitle || "");
        setSponsorMetaDescription(row?.eventSponsorMetaDescription || "");
      }
    }
  }, [location]);

  const getUploadParams = async (file, type) => {
    const finalData = new FormData();
    finalData.append("media", file);

    const token = localStorage.getItem("accessToken");
    const requestOptions = {
      method: "POST",
      body: finalData,
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin1/upload`,
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
        setSponsorComapnyLogo(data.uploadedURL);
        // switch (type) {
        //   case "grey":
        //     setGreyBgUrl(data.uploadedURL);
        //     break;
        //   case "white":
        //     setWhiteBgUrl(data.uploadedURL);
        //     break;
        //   case "original":
        //     setOriginalPhotoUrl(data.uploadedURL);
        //     break;
        //   default:
        //     break;
        // }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("There was an error, Please try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (sponsorComapnyName === "") {
      toast.error("Speaker Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSponsorComapnyNameError(true);
      setVisible(false);
    } else if (sponsorComapnyName?.length < 3) {
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
      setSponsorComapnyNameError(true);
    } else if (
      eventDetails?.isSeoEnable === "Yes" &&
      sponsorMetaTitle.length > 60
    ) {
      toast.error("Meta Title cannot exceed 60 characters!", {
        position: "top-right",
        autoClose: 5000,
      });
      setSponsorMetaTitleError(true);
      setVisible(false);
    } else if (
      eventDetails?.isSeoEnable === "Yes" &&
      sponsorMetaDescription.length > 160
    ) {
      toast.error("Meta Description cannot exceed 160 characters!", {
        position: "top-right",
        autoClose: 5000,
      });
      setSponsorMetaDescriptionError(true);
      setVisible(false);

      // ----- ALL VALIDATIONS PASSED -----
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("sponsorComapnyName", sponsorComapnyName);
      finalData.append("sponsorComapnyLogo", sponsorComapnyLogo);
      finalData.append("sponsorType", sponsorType?.value);
      finalData.append(
        "sponsorComapnyBioDescription",
        JSON.stringify(sponsorComapnyBioDescription)
      );
      finalData.append("sponsorWebsite", sponsorWebsite);
      if (eventDetails?.isSeoEnable === "Yes") {
        finalData.append("eventSponsorMetaTitle", sponsorMetaTitle);
        finalData.append("eventSponsorMetaDescription", sponsorMetaDescription);
      }
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(`${API_BASE_URL}/admin1/editsponsor`, requestOptions)
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
        isOpen={editSponsorModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Event Sponsor
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sponsor Company Name{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${sponsorComapnyNameError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Sponsor Company Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={sponsorComapnyName}
                    onChange={(e) => {
                      setSponsorCompanyName(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setSponsorComapnyNameError(false);
                      } else {
                        setSponsorComapnyNameError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Sponsor Type <span className="required_span">*</span>
                  </Label>
                  <div className="input-group">
                    <Select
                      value={sponsorType}
                      onChange={(selectedSponsorType) => {
                        setSponsorType(selectedSponsorType);
                      }}
                      options={sponsorTypes}
                      name="choices-publish-status-input"
                      classNamePrefix="select2-selection form-select"
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Speaker Bio Description{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={sponsorComapnyBioDescription}
                        name="sponsorComapnyBioDescription"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setSponsorComapnyBioDescription(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sponsor Website Link{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Sponsor Website Link"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={sponsorWebsite}
                    onChange={(e) => {
                      setSponsorWebsite(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <Label>
                  Sponsor Logo <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) => getUploadParams(e.target.files[0])}
                />
              </div>
              {sponsorComapnyLogo?.length > 0 && (
                <div className="mt-2">
                  <img
                    src={sponsorComapnyLogo}
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
                        Sponsor Meta Title{" "}
                        <span className="required_span">*</span> (Max. Length 60
                        Characters)
                      </Label>
                      <Input
                        type="text"
                        className={`form-control ${sponsorMetaTitleError ? "border-danger " : ""
                          }`}
                        placeholder="Enter Meta Title"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={sponsorMetaTitle}
                        onChange={(e) => {
                          setSponsorMetaTitle(e.target.value);
                          if (e.target.value?.length > 60) {
                            setSponsorMetaTitleError(true);
                          } else {
                            setSponsorMetaTitleError(false);
                          }
                        }}
                      />
                      {/* Character Counter */}
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {sponsorMetaTitle.length}/60
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Sponsor Meta Description{" "}
                        <span className="required_span">*</span> (Max. Length
                        160 Characters)
                      </Label>
                      <textarea
                        type="text"
                        className={`form-control ${sponsorMetaDescriptionError ? "border-danger " : ""
                          }`}
                        placeholder="Enter Meta Description"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={sponsorMetaDescription}
                        rows={4}
                        onChange={(e) => {
                          setSponsorMetaDescription(e.target.value);
                          if (e.target.value?.length > 160) {
                            setSponsorMetaDescriptionError(true);
                          } else {
                            setSponsorMetaDescriptionError(false);
                          }
                        }}
                      />
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {sponsorMetaDescription.length}/160
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
                Edit Sponsor
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditEventSponsor;
