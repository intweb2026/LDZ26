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
const EditIndustryTrend = ({
  row,
  editIndustryTrendModal,
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
  const [trendTitle, setTrendTitle] = useState("");
  const [trendTitleError, setTrendTitleError] = useState(false);
  const [trendShortDescription, setTrendShortDescription] = useState("");
  const [trendShortDescriptionError, setTrendShortDescriptionError] =
    useState(false);
  const [trendLongDescription, setTrendLongDescription] = useState("");
  const [trendLongDescriptionError, setTrendLongDescriptionError] =
    useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [trendMetaTitle, setTrendMetaTitle] = useState("");
  const [trendMetaTitleError, setTrendMetaTitleError] = useState(false);
  const [trendMetaDescription, setTrendMetaDescription] = useState("");
  const [trendMetaDescriptionError, setTrendMetaDescriptionError] =
    useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setTrendTitle(row?.trendTitle);
      setTrendShortDescription(
        row?.trendShortDescription?.replace(/^"(.*)"$/, "$1")
      );
      setTrendLongDescription(
        row?.trendLongDescription?.replace(/^"(.*)"$/, "$1")
      );
      if (eventDetails?.isSeoEnable === "Yes") {
        setTrendMetaTitle(row?.trendMetaTitle || "");
        setTrendMetaDescription(row?.trendMetaDescription || "");
      }
    }
  }, [location]);

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (trendTitle === "") {
      toast.error("Trend Title is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTrendTitleError(true);
      setVisible(false);
    } else if (trendTitle?.length < 3) {
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
      setTrendTitleError(true);
    } else if (trendShortDescription === "") {
      toast.error("Short Description is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTrendShortDescriptionError(true);
      setVisible(false);
    } else if (trendLongDescription === "") {
      toast.error("Review Message is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTrendLongDescriptionError(true);
      setVisible(false);
    } else if (
      eventDetails?.isSeoEnable === "Yes" &&
      trendMetaTitle.length > 60
    ) {
      toast.error("Meta Title cannot exceed 60 characters!", {
        position: "top-right",
        autoClose: 5000,
      });
      setTrendMetaTitleError(true);
      setVisible(false);
    } else if (
      eventDetails?.isSeoEnable === "Yes" &&
      trendMetaDescription.length > 160
    ) {
      toast.error("Meta Description cannot exceed 160 characters!", {
        position: "top-right",
        autoClose: 5000,
      });
      setTrendMetaDescriptionError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("trendTitle", trendTitle);
      finalData.append(
        "trendShortDescription",
        JSON.stringify(trendShortDescription)
      );
      finalData.append(
        "trendLongDescription",
        JSON.stringify(trendLongDescription)
      );
      if (eventDetails?.isSeoEnable === "Yes") {
        finalData.append("trendMetaTitle", trendMetaTitle);
        finalData.append("trendMetaDescription", trendMetaDescription);
      }

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch("https://www.australia.lithium-downstream-summit.com/admin1/editindustrytrends", requestOptions)
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
        isOpen={editIndustryTrendModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Industry Trend
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Trend Title <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${trendTitleError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={trendTitle}
                    onChange={(e) => {
                      setTrendTitle(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setTrendTitleError(false);
                      } else {
                        setTrendTitleError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Trend Short Description{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={trendShortDescription}
                        name="trendShortDescription"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setTrendShortDescription(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Trend Long Description{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={trendLongDescription}
                        name="trendLongDescription"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setTrendLongDescription(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {eventDetails?.isSeoEnable === "Yes" && (
                <>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Trend Meta Title <span className="required_span">*</span>{" "}
                        (Max. Length 60 Characters)
                      </Label>
                      <Input
                        type="text"
                        className={`form-control ${trendMetaTitleError ? "border-danger " : ""
                          }`}
                        placeholder="Enter Meta Title"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={trendMetaTitle}
                        onChange={(e) => {
                          setTrendMetaTitle(e.target.value);
                          if (e.target.value?.length > 60) {
                            setTrendMetaTitleError(true);
                          } else {
                            setTrendMetaTitleError(false);
                          }
                        }}
                      />
                      {/* Character Counter */}
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {trendMetaTitle.length}/60
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Trend Meta Description{" "}
                        <span className="required_span">*</span> (Max. Length
                        160 Characters)
                      </Label>
                      <textarea
                        type="text"
                        className={`form-control ${trendMetaDescriptionError ? "border-danger " : ""
                          }`}
                        placeholder="Enter Meta Description"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={trendMetaDescription}
                        rows={4}
                        onChange={(e) => {
                          setTrendMetaDescription(e.target.value);
                          if (e.target.value?.length > 160) {
                            setTrendMetaDescriptionError(true);
                          } else {
                            setTrendMetaDescriptionError(false);
                          }
                        }}
                      />
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {trendMetaDescription.length}/160
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
                Edit Industry Trend
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditIndustryTrend;
