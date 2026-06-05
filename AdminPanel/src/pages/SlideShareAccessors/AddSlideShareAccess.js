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
import Select from "react-select";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const AddSlideShareAccess = (props) => {
  const navigate = useNavigate();
  const { addSlideShareAccessorModal } = props;
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectError, setSelectedProjectError] = useState(false);
  const [accessorEmail, setAccessorEmail] = useState("");
  const [accessorEmailError, setAccessorEmailError] = useState(false);
//   const [accessorPassword, setAccessorPassword] = useState("");
//   const [accessorPasswordError, setAccessorPasswordError] = useState(false);
//   const [projectYear, setProjectYear] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    callProjectListApi();
    // eslint-disable-next-line
  }, []);

  const callProjectListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.australia.lithium-downstream-summit.com/admin1/eventprojects`,
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
        if (data && data.status) {
          setProjectList(data["eventProjects"]);
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
  const projectOptions = (list) => {
    let arr = [];
    list.length > 0 &&
      // eslint-disable-next-line
      list.map((option) => {
        let obj = {
          value: option.id,
          label: option.projectYear,
        };
        arr.push(obj);
      });
    return arr;
  };

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (selectedProject === null) {
      toast.error("Please Select The Project", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSelectedProjectError(true);
      setVisible(false);
    } else if (accessorEmail === "") {
      toast.error("Accessor Email is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAccessorEmailError(true);
      setVisible(false);
    } 
    // else if (accessorPassword === "") {
    //   toast.error("Password is Required", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   setAccessorPasswordError(true);
    //   setVisible(false);
    // } 
    else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("email", accessorEmail);
    //   finalData.append("eventPassword", accessorPassword);
      finalData.append("projectId", selectedProject?.value);

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/addslideShareAccess",
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
        isOpen={addSlideShareAccessorModal}
        toggle={() => props.onCloseModal(false)}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => props.onCloseModal(false)}
        >
          <h5 className="modal-title" id="exampleModalLabel">
            Add SlideShare Access
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Project <span className="required_span">*</span>
                  </Label>
                  <div className="input-group">
                    <Select
                      value={selectedProject}
                      onChange={(selectedOption) => {
                        setSelectedProject(selectedOption);
                        setSelectedProjectError(false);
                      }}
                      options={projectOptions(projectList)}
                      name="choices-publish-status-input"
                      classNamePrefix="select2-selection form-select"
                      className={`w-100 ${
                        selectedProjectError ? "border-danger" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Accessor Email <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      accessorEmailError ? "border-danger " : ""
                    }`}
                    placeholder="Enter Accessor Email"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={accessorEmail}
                    onChange={(e) => {
                      setAccessorEmail(e.target.value);
                      setAccessorEmailError(false);
                    }}
                  />
                </div>
              </div>
              {/* <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Password <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      accessorPasswordError ? "border-danger " : ""
                    }`}
                    placeholder="Enter Password"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={accessorPassword}
                    onChange={(e) => {
                      setAccessorPassword(e.target.value);
                      setAccessorPasswordError(false);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Project Year
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Project Year"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={projectYear}
                    onChange={(e) => {
                      setProjectYear(e.target.value);
                    }}
                  />
                </div>
              </div> */}
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
                Add SlideShare Access
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default AddSlideShareAccess;
