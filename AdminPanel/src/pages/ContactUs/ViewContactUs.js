import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import "../../assets/css/dropzone.css";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const ViewTagline_Contain = ({ row, viewSponsorModal, onCloseModal }) => {
  const location = useLocation();
  const [sponsorComapnyName, setSponsorCompanyName] = useState("");
  const [sponsorComapnyLogo, setSponsorComapnyLogo] = useState("");
  const [sponsorType, setSponsorType] = useState("");
  const [sponsorComapnyBioDescription, setSponsorComapnyBioDescription] =
    useState("");
  const [sponsorWebsite, setSponsorWebsite] = useState("");
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setSponsorCompanyName(row?.sponsorComapnyName);
      setSponsorType(row?.sponsorType);
      setSponsorWebsite(row?.sponsorWebsite);
      setSponsorComapnyBioDescription(
        row?.sponsorComapnyBioDescription?.replace(/^"(.*)"$/, "$1") || ""
      );
      setSponsorComapnyLogo(row?.sponsorComapnyLogo);
    }
  }, [location]);

  return (
    <>
      <Modal
        id="showModal"
        size="lg"
        isOpen={viewSponsorModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            View Event Sponsor
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sponsor Company Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Speaker Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={sponsorComapnyName}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Sponsor Type
                  </Label>
                  <div className="input-group">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Speaker Company"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      required
                      value={sponsorType}
                      disabled
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Speaker Bio Description
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={sponsorComapnyBioDescription}
                        name="sponsorComapnyBioDescription"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Sponsor Website Link
                  </Label>
                  <div className="input-group">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Speaker Company"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      required
                      value={sponsorWebsite}
                      disabled
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-12 d-flex justify-content-around">
                <div>
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
                  <p className="mt-3">Sponsor Logo</p>
                </div>
              </div>
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
export default ViewTagline_Contain;
