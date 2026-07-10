import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import "../../assets/css/dropzone.css";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useApiData } from "../../../src/Components/Common/ApiContext.js";
import { getMediaUrl } from '../../config/apiConfig';
const ViewEventSpeaker = ({ row, viewSpeakerModal, onCloseModal }) => {
  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();
  const location = useLocation();
  const [speakerName, setSpeakerName] = useState("");
  const [speakerCompany, setSpeakerCompany] = useState("");
  const [speakerShortBio, setSpeakerShortBio] = useState("");
  const [speakerBio, setSpeakerBio] = useState("");
  const [greyBgUrl, setGreyBgUrl] = useState("");
  const [whiteBgUrl, setWhiteBgUrl] = useState("");
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState("");
  const [speakerMetaTitle, setSpeakerMetaTitle] = useState("");
  const [speakerMetaDescription, setSpeakerMetaDescription] = useState("");
  const [speakerLinkedinFollowers, setSpeakerLinkedinFollowers] = useState("");
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setSpeakerName(row?.eventSpeakerName);
      setSpeakerCompany(row?.eventSpeakerCompany);
      setSpeakerShortBio(
        row?.eventSpeakerShortDescription?.replace(/^"(.*)"$/, "$1") || ""
      );
      setSpeakerBio(row?.eventSpeakerDescription?.replace(/^"(.*)"$/, "$1") || "");
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

  return (
    <>
      <Modal
        id="showModal"
        size="lg"
        isOpen={viewSpeakerModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            View Event Speaker
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Speaker Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Speaker Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={speakerName}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Speaker Company
                  </Label>
                  <div className="input-group">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Speaker Company"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      required
                      value={speakerCompany}
                      disabled
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Speaker Short Bio
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={speakerShortBio}
                        name="speakerShortBio"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Speaker Description
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={speakerBio}
                        name="speakerBio"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div><div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Speaker Linkedin Followers
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Speaker Linkedin Followers"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={speakerLinkedinFollowers}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-12 d-flex justify-content-around">
                <div>
                  {originalPhotoUrl?.length > 0 && (
                    <div className="mt-2">
                      <img
                        src={getMediaUrl(originalPhotoUrl)}
                        alt="uploaded-Logo"
                        height={100}
                        width={100}
                      />
                    </div>
                  )}
                  <p className="mt-3">Original Photo</p>
                </div>
                <div>
                  {whiteBgUrl?.length > 0 && (
                    <div className="mt-2">
                      <img
                        src={getMediaUrl(whiteBgUrl)}
                        alt="uploaded-Logo"
                        height={100}
                        width={100}
                      />
                    </div>
                  )}
                  <p className="mt-3">White Photo</p>
                </div>
                <div>
                  {greyBgUrl?.length > 0 && (
                    <div className="mt-2">
                      <img
                        src={getMediaUrl(greyBgUrl)}
                        alt="uploaded-Logo"
                        height={100}
                        width={100}
                      />
                    </div>
                  )}
                  <p className="mt-3">Grey Photo</p>
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
                        Speaker Meta Title{" "}
                        <span className="required_span">*</span> (Max. Length 60
                        Characters)
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Meta Title"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={speakerMetaTitle}
                        disabled
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
                        className="form-control"
                        placeholder="Enter Meta Description"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={speakerMetaDescription}
                        rows={4}
                        disabled
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
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ViewEventSpeaker;
