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
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const sponsorTypes = [
  { label: "Silver", value: "Silver" },
  { label: "Gold", value: "Gold" },
  { label: "Platinum", value: "Platinum" },
];
const EditContactUsHelper = ({
  row,
  editContactUsHelperModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const location = useLocation();
  const [helpSubject, setHelpSubject] = useState("");
  const [helpSubjectErr, setHelpSubjectErr] = useState(false);

  const [helpingPerson, setHelpingPerson] = useState("");
  const [helpingPersonErr, setHelpingPersonErr] = useState(false);

  const [helpingPersonDesignation, setHelpingPersonDesignation] = useState("");
  const [helpingPersonDesignationErr, setHelpingPersonDesignationErr] = useState(false);
  const [helperMail, setHelperMail] = useState("");
  const [helperMailErr, setHelperMailErr] = useState(false);

  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setHelpSubject(row?.reasonToHelp);
      setHelpingPerson(row?.helpingPersonName);
      setHelpingPersonDesignation(row?.helpingPersonDesignation);
      setHelperMail(row?.helpingPersonEmail);
    }
  }, [location]);

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (helpSubject === "") {
      toast.error("Reason To Help is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setHelpSubjectErr(true);
    } 
    // else if (helpingPersonDesignation === "") {
    //   toast.error("Person Designation is Required", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   setVisible(false);
    //   setHelpingPersonDesignationErr(true);
    // } 
    else if (helperMail === "") {
      toast.error("Person Email is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setHelperMailErr(true);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("reasonToHelp", helpSubject);
      finalData.append("helpingPersonName", helpingPerson);
      finalData.append("helpingPersonDesignation", helpingPersonDesignation);
      finalData.append("helpingPersonEmail", helperMail);

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://www.linq-staging-site.com/admin1/editcontactuspagehelper",
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
        isOpen={editContactUsHelperModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Contact Us Person
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Reason To Help <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${helpSubjectErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Title"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={helpSubject}
                    onChange={(e) => {
                      setHelpSubject(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setHelpSubjectErr(false);
                      } else {
                        setHelpSubjectErr(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Person Name
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${helpingPersonErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={helpingPerson}
                    onChange={(e) => {
                      setHelpingPerson(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setHelpingPersonErr(false);
                      } else {
                        setHelpingPersonErr(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Person Designation
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${helpingPersonDesignationErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Designation"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={helpingPersonDesignation}
                    onChange={(e) => {
                      setHelpingPersonDesignation(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setHelpingPersonDesignationErr(false);
                      } else {
                        setHelpingPersonDesignationErr(true);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Person Email<span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${helperMailErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Email"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={helperMail}
                    onChange={(e) => {
                      setHelperMail(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setHelperMailErr(false);
                      } else {
                        setHelperMailErr(true);
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
                Edit Contact Us Person
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditContactUsHelper;
