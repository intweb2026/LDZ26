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
import Select from "react-select";
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const EditMediaPageHelper = ({
  row,
  editMediaHelperModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const location = useLocation();
  const [mediaHelpingPerson, setMediaHelpingPerson] = useState("");
  const [mediaHelpingPersonErr, setMediaHelpingPersonErr] = useState(false);
  const [mediaHelpingPersonMail, setMediaHelpingPersonMail] = useState("");
  const [mediaHelpingPersonMailErr, setMediaHelpingPersonMailErr] =
    useState(false);
  const [mediaHelpingPersonPhone, setMediaHelpingPersonPhone] = useState("");
  const [mediaHelpingPersonPhoneErr, setMediaHelpingPersonPhoneErr] =
    useState(false);

  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setMediaHelpingPerson(row?.companyPersonName);
      setMediaHelpingPersonMail(row?.companyPersonEmail);
      setMediaHelpingPersonPhone(row?.companyPersonPhone);
    }
  }, [location]);

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (mediaHelpingPerson === "") {
      toast.error("Company Person Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setMediaHelpingPersonErr(true);
    } else if (mediaHelpingPersonMail === "") {
      toast.error("Company Person Email is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setMediaHelpingPersonMailErr(true);
    } else if (mediaHelpingPersonPhone === "") {
      toast.error("Company Person Phone is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setMediaHelpingPersonPhoneErr(true);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("companyPersonName", mediaHelpingPerson);
      finalData.append("companyPersonEmail", mediaHelpingPersonMail);
      finalData.append("companyPersonPhone", mediaHelpingPersonPhone);

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(`${API_BASE_URL}/admin1/editmediapagehelpers`, requestOptions)
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
        size="md"
        isOpen={editMediaHelperModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Media Page Company Person
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Company Person Name <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${mediaHelpingPersonErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={mediaHelpingPerson}
                    onChange={(e) => {
                      setMediaHelpingPerson(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setMediaHelpingPersonErr(false);
                      } else {
                        setMediaHelpingPersonErr(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Company Person Email{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${mediaHelpingPersonMailErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Email"
                    aria-label="email"
                    aria-describedby="basic-addon1"
                    value={mediaHelpingPersonMail}
                    onChange={(e) => {
                      setMediaHelpingPersonMail(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setMediaHelpingPersonMailErr(false);
                      } else {
                        setMediaHelpingPersonMailErr(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Company Person Phone{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${mediaHelpingPersonPhoneErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Designation"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={mediaHelpingPersonPhone}
                    onChange={(e) => {
                      setMediaHelpingPersonPhone(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setMediaHelpingPersonPhoneErr(false);
                      } else {
                        setMediaHelpingPersonPhoneErr(true);
                      }
                    }}
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
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={(e) => {
                  submitBtnClk(e);
                }}
                disabled={visible}
              >
                Edit Company Person
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditMediaPageHelper;
