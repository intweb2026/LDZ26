import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
const EditSpeakerPageContent = (props) => {
  const navigate = useNavigate();
  const { editSpeakerDataModal } = props;
  const [speakerPageData, setSpeakerPageData] = useState([]);
  const [paraOne, setParaOne] = useState("");
  const [paraOneError, setParaOneError] = useState(false);
  const [paraTwo, setParaTwo] = useState("");
  const [paraTwoError, setParaTwoError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";
  useEffect(() => {
    callSpeakerPageDataApi();
    // eslint-disable-next-line
  }, []);
  const callSpeakerPageDataApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/getspeakerpagedata`, requestOptions)
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
        if (data && data.status) {
          setSpeakerPageData(data["speakerPageStaticData"]);
          // setTotalCount(data?.paginationDetails?.count);
        }
        setloading(false);
      })
      .catch((error) => {
        setloading(false);
        setTimeout(() => {
          toast.error("There was an error, Please try again later.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 1000);
      });
  };
  useEffect(() => {
    if (speakerPageData?.length > 0) {
      setParaOne(
        speakerPageData[0]?.sectionFirstDescription?.replace(/^"(.*)"$/, "$1")
      );
      setParaTwo(
        speakerPageData[0]?.sectionSecondDescription?.replace(/^"(.*)"$/, "$1")
      );
    }
    // eslint-disable-next-line
  }, [speakerPageData]);

  // Helper function to get plain text length from HTML content
  const getPlainTextLength = (html) => {
    if (!html || html.trim() === "") return 0;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.trim().length;
  };

  const submitBtnClk = (e) => {
    e.preventDefault();
    const paraOneLength = getPlainTextLength(paraOne);
    const paraTwoLength = getPlainTextLength(paraTwo);
    setParaOneError(false);
    setParaTwoError(false);
    if (paraOneLength === 0 || paraOne.trim() === "") {
      toast.error(" Paragraph-1 Content is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setParaOneError(true);
      setVisible(false);
      return;
    } else if (paraOneLength > 2000) {
      toast.error("Speaker Bio. cannot exceed 2000 characters!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setParaOneError(true);
      setVisible(false);
      return; // Stop execution - THIS WAS THE KEY ISSUE
    } else if (paraTwoLength === 0 || paraTwo.trim() === "") {
      toast.error("Paragraph-2 Content is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setParaTwoError(true);
      setVisible(false);
    } else if (paraTwoLength > 1000) {
      toast.error("Speaker Bio. cannot exceed 1000 characters!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setParaTwoError(true);
      setVisible(false);
      return; // Stop execution - THIS WAS THE KEY ISSUE
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("sectionFirstDescription", JSON.stringify(paraOne));
      finalData.append("sectionSecondDescription", JSON.stringify(paraTwo));
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        `${API_BASE_URL}/admin1/addspeakerpagestaticdata`,
        requestOptions
      )
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
            props.onModalSubmitBtnClk();
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
        isOpen={editSpeakerDataModal}
        toggle={() => props.onCloseModal(false)}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => props.onCloseModal(false)}
        >
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Speaker Page Data
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Paragraph-1 <span className="required_span">*</span> (Max.
                    length 2000 characters)
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      {/* <CKEditor
                        editor={ClassicEditor}
                        data={paraOne}
                        name="praOne"
                        className={paraOneError ? "border-danger" : ""}
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setParaOne(ipdata);
                        }}
                      /> */}
                      <CKEditor
                        editor={ClassicEditor}
                        data={paraOne}
                        name="praOne"
                        className={paraOneError ? "border-danger" : ""}
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          const plainTextLength = getPlainTextLength(ipdata);
                          console.log("plainTextLength: ", plainTextLength);

                          if (plainTextLength <= 2000) {
                            setParaOne(ipdata);
                            if (plainTextLength >= 3) {
                              setParaOneError(false);
                            }
                          } else {
                            // Optionally prevent further input
                            toast.error("Character limit reached!", {
                              position: "top-right",
                              autoClose: 2000,
                            });
                            setParaOne(ipdata);
                            setParaOneError(true);
                          }
                        }}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "3px",
                          color:
                            getPlainTextLength(paraOne) > 2000
                              ? "red"
                              : "inherit",
                        }}
                      >
                        Character count: {getPlainTextLength(paraOne)}
                        /2000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Paragraph-2 <span className="required_span">*</span> (Max.
                    length 1000 characters)
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      {/* <CKEditor
                        editor={ClassicEditor}
                        data={paraTwo}
                        name="paraTwo"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setParaTwo(ipdata);
                        }}
                      /> */}
                      <CKEditor
                        editor={ClassicEditor}
                        data={paraTwo}
                        name="paraTwo"
                        className={paraTwoError ? "border-danger" : ""}
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          const plainTextLength = getPlainTextLength(ipdata);
                          console.log("plainTextLength: ", plainTextLength);

                          if (plainTextLength <= 1000) {
                            setParaTwo(ipdata);
                            if (plainTextLength >= 3) {
                              setParaTwoError(false);
                            }
                          } else {
                            // Optionally prevent further input
                            toast.error("Character limit reached!", {
                              position: "top-right",
                              autoClose: 2000,
                            });
                            setParaTwo(ipdata);
                            setParaTwoError(true);
                          }
                        }}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "3px",
                          color:
                            getPlainTextLength(paraTwo) > 1000
                              ? "red"
                              : "inherit",
                        }}
                      >
                        Character count: {getPlainTextLength(paraTwo)}
                        /1000
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
                className="btn btn-light"
                onClick={() => {
                  props.onCloseModal(false);
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
                Edit Speaker Page Data
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditSpeakerPageContent;
