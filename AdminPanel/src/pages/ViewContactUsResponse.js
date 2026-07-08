import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";

const ViewContactUsResponse = ({ row, viewContactusModal, onCloseModal }) => {
  const location = useLocation();
  const [personName, setPersonName] = useState("");
  const [personCompany, setPersonCompany] = useState("");
  const [personEmail, setPersonEmail] = useState("");
  const [personMobile, setPersonMobile] = useState("");
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");
  console.log("reason: ", reason);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setPersonName(row?.contactPersonName);
      setPersonCompany(row?.contactPersonCompanyName);
      setPersonEmail(row?.contactPersonEmail);
      setPersonMobile(row?.contactPersonMobile);
      setMessage(row?.contactPersonMessage);
      let parsedReason = row?.contactUsReason;
      try {
        parsedReason = JSON.parse(parsedReason);
      } catch (e) {
        // It's probably already a string or malformed JSON
      }
      if (Array.isArray(parsedReason)) {
        setReason(parsedReason.join(", "));
      } else {
        setReason(parsedReason?.replace(/^"(.*)"$/, "$1") || "");
      }
    }
  }, [location]);

  return (
    <>
      <Modal
        id="showModal"
        size="md"
        isOpen={viewContactusModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            View Contact Us Response
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Person Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={personName}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Person Company
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={personCompany}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Person Email
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={personEmail}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Person Mobile
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={personMobile}
                    disabled
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Message
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <textarea
                        className="form-control"
                        placeholder="Enter Review Message"
                        rows="2"
                        autoComplete="off"
                        value={message}
                        disabled
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Reason for contact
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={Array.isArray(reason) ? reason.join(", ") : reason}
                    disabled
                  />
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
export default ViewContactUsResponse;
