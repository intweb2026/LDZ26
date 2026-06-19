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
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const EditFaq = ({ row, editFaqModal, onCloseModal, onModalSubmitBtnClk }) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const location = useLocation();
  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerError, setAnswerError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";
  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "blockQuote",
      "insertTable",
      "|",
      "undo",
      "redo",
    ],
    link: {
      defaultProtocol: "https://",
      decorators: {
        openInNewTab: {
          mode: "manual",
          label: "Open in a new tab",
          attributes: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        },
      },
    },
  };

  useEffect(() => {
    if (row) {
      setQuestion(row?.faqQuestion);
      setAnswer(row?.faqAnswer?.replace(/^"(.*)"$/, "$1"));
    }
  }, [location]);

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (question === "") {
      toast.error("Question is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setQuestionError(true);
      setVisible(false);
    } else if (question?.length < 3) {
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
      setQuestionError(true);
    } else if (answer === "") {
      toast.error("Answer is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAnswerError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("faqQuestion", question);
      finalData.append("faqAnswer", JSON.stringify(answer));

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(`${API_BASE_URL}/admin1/editfaq`, requestOptions)
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
        isOpen={editFaqModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Faq
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Question <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${questionError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Question"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setQuestionError(false);
                      } else {
                        setQuestionError(true);
                      }
                    }}
                  />
                </div>
              </div>
              {/* <div className="col-md-12">
                            <div>
                              <Label htmlFor="amount-field" className="form-label">
                                Answer <span className="required_span">*</span>
                              </Label>
                              <div className="input-group" style={{ width: "100%" }}>
                                <div style={{ width: "100%" }}>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    config={editorConfiguration}
                                    data={answer}
                                    name="answer"
                                    onChange={(event, editor) => {
                                      const ipdata = editor.getData();
                                      setAnswer(ipdata);
                                      setAnswerError(false);
                                    }}
                                    onReady={(editor) => {
                                      console.log(
                                        "Link command:",
                                        editor.commands.get("link")
                                      );
                                      console.log(
                                        "Link command is enabled:",
                                        editor.commands.get("link").isEnabled
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div> */}
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Answer <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={answer}
                        name="answer"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setAnswer(ipdata);
                          setAnswerError(false);
                        }}
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
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={(e) => {
                  submitBtnClk(e);
                }}
                disabled={visible}
              >
                Edit Faq
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditFaq;
