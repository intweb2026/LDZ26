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
const EditSponsorPageContent = (props) => {
  const navigate = useNavigate();
  const { editSponsorDataModal } = props;
  const [sponsorPageData, setSponsorPageData] = useState([]);
  const [paraDes, setParaDes] = useState("");
  const [paraDesError, setParaDesError] = useState(false);
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
    callSponsorPageDataApi();
    // eslint-disable-next-line
  }, []);
  const callSponsorPageDataApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/getsponsorpagedata`, requestOptions)
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
          setSponsorPageData(data["sponsorPageStaticData"]);
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
    if (sponsorPageData?.length > 0) {
      setParaDes(
        sponsorPageData[0]?.introParaDescription?.replace(/^"(.*)"$/, "$1")
      );
    }
    // eslint-disable-next-line
  }, [sponsorPageData]);

  const submitBtnClk = (e) => {
    e.preventDefault();
    const descriptionLength = getPlainTextLength(paraDes);
    setParaDesError(false);
    if (paraDes === "") {
      toast.error("Introduction Paragraph Description is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
    } else if (descriptionLength > 550) {
      toast.error(
        "Introduction Paragraph Description cannot exceed 550 characters!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setParaDesError(true);
      setVisible(false);
      return; // Stop execution - THIS WAS THE KEY ISSUE
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("introParaDescription", JSON.stringify(paraDes));
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        `${API_BASE_URL}/admin1/addsponsorpagestaticdata`,
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
        isOpen={editSponsorDataModal}
        toggle={() => props.onCloseModal(false)}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => props.onCloseModal(false)}
        >
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Sponsor Page Data
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Sponsor Page Data <span className="required_span">*</span>{" "}
                    (Max. length 550 characters)
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={paraDes}
                        name="paraDes"
                        className={paraDesError ? "border-danger" : ""}
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          const plainTextLength = getPlainTextLength(ipdata);
                          console.log("plainTextLength: ", plainTextLength);

                          if (plainTextLength <= 550) {
                            setParaDes(ipdata);
                            if (plainTextLength >= 3) {
                              setParaDesError(false);
                            }
                          } else {
                            // Optionally prevent further input
                            toast.error("Character limit reached!", {
                              position: "top-right",
                              autoClose: 2000,
                            });
                            setParaDes(ipdata);
                            setParaDesError(true);
                          }
                        }}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          marginTop: "3px",
                          color:
                            getPlainTextLength(paraDes) > 550
                              ? "red"
                              : "inherit",
                        }}
                      >
                        Character count: {getPlainTextLength(paraDes)}
                        /550
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
                Edit Sponsor Page Data
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditSponsorPageContent;
