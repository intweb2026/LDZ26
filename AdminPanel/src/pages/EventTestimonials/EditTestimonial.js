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
const EditTestimonial = ({
  row,
  editTestimonialModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const location = useLocation();
  const [personName, setPersonName] = useState("");
  const [personNameError, setPersonNameError] = useState(false);
  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState(false);
  const [review, setReview] = useState("");
  const [reviewError, setReviewError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setPersonName(row?.personName);
      setCompany(row?.personCompany);
      setReview(row?.personMessage);
    }
  }, [location]);

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (personName === "") {
      toast.error("Person is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPersonNameError(true);
      setVisible(false);
    } else if (personName?.length < 3) {
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
      setPersonNameError(true);
    } else if (company === "") {
      toast.error("Company is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCompanyError(true);
      setVisible(false);
    } else if (review === "") {
      toast.error("Review Message is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setReviewError(true);
      setVisible(false);
    } else if (review?.length > 100) {
      toast.error("Review Message cannot exceed 100 characters!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setReviewError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("personName", personName);
      finalData.append("personCompany", company);
      finalData.append("personMessage", review);

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/edittestimonial",
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
        isOpen={editTestimonialModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Testimonial
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Person Name <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${personNameError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={personName}
                    onChange={(e) => {
                      setPersonName(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setPersonNameError(false);
                      } else {
                        setPersonNameError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Company <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${companyError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Topic"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setCompanyError(false);
                      } else {
                        setCompanyError(true);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Review <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <textarea
                        className={`form-control ${reviewError ? "border-danger " : ""
                          }`}
                        placeholder="Enter Review Message"
                        rows="2"
                        autoComplete="off"
                        value={review}
                        onChange={(e) => {
                          setReview(e.target.value);
                          if (e.target.value?.length > 100) {
                            setReviewError(true);
                          } else {
                            setReviewError(false);
                          }
                        }}
                      ></textarea>
                      {/* Character Counter */}
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {review.length}/100
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
                Edit Testimonial
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditTestimonial;
