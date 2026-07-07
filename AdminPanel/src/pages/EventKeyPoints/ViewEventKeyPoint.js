import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import "../../assets/css/dropzone.css";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const ViewEventKeyPoint = ({ row, viewEventKeyPointModal, onCloseModal }) => {
  const location = useLocation();
  const [topic, setTopic] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setTopic(row?.pointLabel);
      setTopicDescription(
        row?.pointDescription?.replace(/^"(.*)"$/, "$1") || ""
      );
    }
  }, [location]);

  return (
    <>
      <Modal
        id="showModal"
        size="lg"
        isOpen={viewEventKeyPointModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            View Key Topic
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Topic
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Speaker Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={topic}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Topic Description
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={topicDescription}
                        name="topicDescription"
                        disabled
                      />
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
export default ViewEventKeyPoint;
