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
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const EditEventKeyPoint = ({
  row,
  editEventKeyPointModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const location = useLocation();
  const [topic, setTopic] = useState("");
  const [topicError, setTopicError] = useState(false);
  const [topicDescription, setTopicDescription] = useState("");
  const [topicDescriptionError, setDescriptionTopicError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  // Helper function to get plain text length from HTML content
  const getPlainTextLength = (html) => {
    if (!html || html.trim() === "") return 0;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.trim().length;
  };

  useEffect(() => {
    if (row) {
      setTopic(row?.pointLabel);
      setTopicDescription(row?.pointDescription?.replace(/^"(.*)"$/, "$1"));
    }
  }, [location]);

  const submitBtnClk = (e) => {
    e.preventDefault();
    const descriptionLength = getPlainTextLength(topicDescription);
    console.log("descriptionLength: ", descriptionLength);

    // Reset errors
    setTopicError(false);
    setDescriptionTopicError(false);

    // Validate Topic
    if (topic === "") {
      toast.error("Topic is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTopicError(true);
      setVisible(false);
      return; // Stop execution
    } else if (topic?.length < 3) {
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
      setTopicError(true);
      return; // Stop execution
    } else if (topic?.length > 75) {
      toast.error("Topic cannot exceed 75 characters!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setTopicError(true);
      return; // Stop execution
    }

    // Validate Topic Description
    if (descriptionLength === 0 || topicDescription.trim() === "") {
      toast.error("Topic Description is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDescriptionTopicError(true);
      setVisible(false);
      return; // Stop execution
    } else if (descriptionLength > 160) {
      toast.error("Topic Description cannot exceed 160 characters!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDescriptionTopicError(true);
      setVisible(false);
      return; // Stop execution - THIS WAS THE KEY ISSUE
    }

    // All validations passed, proceed with API call
    const finalData = new FormData();
    finalData.append("id", row?.id);
    finalData.append("pointLabel", topic);
    finalData.append("pointDescription", JSON.stringify(topicDescription));

    const requestOptions = {
      method: "POST",
      body: finalData,
    };

    setloading(true); // Set loading before API call

    fetch("https://www.australia.lithium-downstream-summit.com/admin1/editkeypoint", requestOptions)
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
        isOpen={editEventKeyPointModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Key Topic
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Topic (Max. length 75 characters)
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${topicError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={topic}
                    onChange={(e) => {
                      setTopic(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setTopicError(false);
                      } else if (e.target.value?.length > 75) {
                        setTopicError(true);
                      } else {
                        setTopicError(true);
                      }
                    }}
                  />
                  <p style={{ fontSize: "12px", marginTop: "3px" }}>
                    Character count: {topic.length}/75
                  </p>
                </div>
              </div>

              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Topic Description (Max. length 160 characters)
                    <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={topicDescription}
                        name="topicDescription"
                        className={topicDescriptionError ? "border-danger" : ""}
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          const plainTextLength = getPlainTextLength(ipdata);
                          console.log("plainTextLength: ", plainTextLength);

                          if (plainTextLength <= 160) {
                            setTopicDescription(ipdata);
                            if (plainTextLength >= 3) {
                              setDescriptionTopicError(false);
                            }
                          } else {
                            // Optionally prevent further input
                            toast.error("Character limit reached!", {
                              position: "top-right",
                              autoClose: 2000,
                            });
                            setTopicDescription(ipdata);
                            setDescriptionTopicError(true);
                          }
                        }}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "3px",
                          color:
                            getPlainTextLength(topicDescription) > 160
                              ? "red"
                              : "inherit",
                        }}
                      >
                        Character count: {getPlainTextLength(topicDescription)}
                        /160
                      </p>
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
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={(e) => {
                  submitBtnClk(e);
                }}
                disabled={visible}
              >
                Edit Key Topic
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditEventKeyPoint;
