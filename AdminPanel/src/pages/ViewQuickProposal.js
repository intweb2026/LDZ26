import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";

const ViewQuickProposal = ({ row, viewModal, onCloseModal }) => {
  const location = useLocation();
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [prposedTitle, setProposedTitle] = useState("");
  const [message, setMessage] = useState("");
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setFullName(row?.requesterName);
      setCompany(row?.requesterCompanyName);
      setEmail(row?.requesterEmail);
      setProposedTitle(row?.proposedTitle);
      if (row?.requesterMessage.length > 0) {
        setMessage(row?.requesterMessage?.replace(/^"(.*)"$/, "$1") || "");
      }else{
        setMessage("");
      }
    }
  }, [location]);

  return (
    <>
      <Modal
        id="showModal"
        size="md"
        isOpen={viewModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            View Become Speaker Response
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={fullName}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Company
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={company}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Email
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={email}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Proposed Title
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={prposedTitle}
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
export default ViewQuickProposal;
