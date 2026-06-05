import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "../../assets/css/dropzone.css";
import "../../assets/css/ckeditor.css";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const AddEventProject = (props) => {
  const navigate = useNavigate();
  const { addEventProjectModal } = props;
  const [projectYear, setProjectYear] = useState("");
  const [projectYearError, setProjectYearError] = useState(false);
  const [password, setPasssword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (projectYear === "") {
      toast.error("Project Year is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setProjectYearError(true);
      setVisible(false);
    } else if (password === "") {
      toast.error("Password is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPasswordError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("projectYear", projectYear);
      finalData.append("password", password);

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/addeventproject",
        requestOptions,
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
        size="md"
        isOpen={addEventProjectModal}
        toggle={() => props.onCloseModal(false)}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => props.onCloseModal(false)}
        >
          <h5 className="modal-title" id="exampleModalLabel">
            Add Event Project
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Project Year <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      projectYearError ? "border-danger " : ""
                    }`}
                    placeholder="Enter Project Year"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={projectYear}
                    onChange={(e) => {
                      setProjectYear(e.target.value);
                      setProjectYearError(false);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Password <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      passwordError ? "border-danger " : ""
                    }`}
                    placeholder="Enter Password"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={password}
                    onChange={(e) => {
                      setPasssword(e.target.value);
                      setPasswordError(false);
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
                Add Event Project
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default AddEventProject;
