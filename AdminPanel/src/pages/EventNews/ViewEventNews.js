import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import "../../assets/css/dropzone.css";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { useApiData } from "../../../src/Components/Common/ApiContext.js";
const ViewEventNews = ({ row, viewEventNewsModal, onCloseModal }) => {
  console.log("row: ", row);
  const location = useLocation();
  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();
  const [title, setTitle] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [selectedNewsCategory, setSelectedNewsCategory] = useState(null);
  const [newsShortDescription, setNewsShortDescription] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsPublishDate, setNewsPublishDate] = useState("");
  const [newsMetaTitle, setNewsMetaTitle] = useState("");
  const [newsMetaDescription, setNewsMetaDescription] = useState("");
  const [newsImgAltText, setNewsImgAltText] = useState("");
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setTitle(row?.newsTitle);
      setNewsImage(row?.newsImage);
      setSelectedNewsCategory(row?.newsCategoryDetails?.newsCategory);
      setNewsShortDescription(
        row?.newsShortDescription?.replace(/^"(.*)"$/, "$1") || ""
      );
      setNewsDescription(row?.newsDescription?.replace(/^"(.*)"$/, "$1") || "");
      if (row?.newsCreatedDate) {
        const formattedDate = moment(row.newsCreatedDate, "YYYY-MM-DD").format(
          "DD-MM-YYYY"
        );
        setNewsPublishDate(formattedDate);
      }
      if (eventDetails?.isSeoEnable === "Yes") {
        setNewsMetaTitle(row?.newsMetaTitle || "");
        setNewsMetaDescription(row?.newsMetaDescription || "");
        setNewsImgAltText(row?.newsImageAltText || "");
      }
    }
  }, [location]);

  return (
    <>
      <Modal
        id="showModal"
        size="lg"
        isOpen={viewEventNewsModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            View Event News
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    News Title
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={title}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    News Category
                  </Label>
                  <div className="input-group">
                    <Input
                      type="text"
                      className="form-control"
                      aria-label="name"
                      aria-describedby="basic-addon1"
                      value={selectedNewsCategory}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    News Publish Date
                  </Label>
                  <div className="input-group">
                    <Flatpickr
                      className="form-control "
                      id="datepicker-publish-input"
                      value={newsPublishDate}
                      options={{
                        dateFormat: "d-m-Y",
                        noCalendar: false,
                      }}
                      disabled
                      defaultDate="null"
                      style={{ background: "#fff" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    News Short Description{" "}
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={newsShortDescription}
                        name="newsShortDescription"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    News Description
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={newsDescription}
                        name="newsDescription"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <Label>News Image</Label>
              </div>
              {newsImage?.length > 0 && (
                <div className="mt-2">
                  <img
                    src={newsImage}
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
                        News Meta Title <span className="required_span">*</span>{" "}
                        (Max. Length 60 Characters)
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Meta Title"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={newsMetaTitle}
                        disabled
                      />
                      {/* Character Counter */}
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {newsMetaTitle.length}/60
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        News Meta Description{" "}
                        <span className="required_span">*</span> (Max. Length
                        160 Characters)
                      </Label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Meta Description"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={newsMetaDescription}
                        rows={4}
                        disabled
                      />
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {newsMetaDescription.length}/160
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        News Image Alter Text{" "}
                        <span className="required_span">*</span> (Max. Length
                        125 Characters)
                      </Label>
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter Alt Text"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={newsImgAltText}
                        rows={2}
                        disabled
                      />
                      {/* Character Counter */}
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {newsImgAltText.length}/125
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
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ViewEventNews;
