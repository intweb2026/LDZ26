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
import Flatpickr from "react-flatpickr";
import moment from "moment";
import { useApiData } from "../../../src/Components/Common/ApiContext.js";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const EditSlideShare = ({
  row,
  editSlideShareModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const {
    homeVideoSettings,
    eventDetails,
    eventGeneralSettings,
    themeSettings,
  } = useApiData();
  const navigate = useNavigate();
  const location = useLocation();
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectError, setSelectedProjectError] = useState(false);
  const [author, setAuthor] = useState("");
  const [authorError, setAuthorError] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState(false);
  const [slideShareHeading, setSlideShareHeading] = useState("");
  const [slideShareHeadingError, setSlideShareHeadingError] = useState(false);
  const [projectYear, setProjectYear] = useState("");
  const [projectYearError, setProjectYearError] = useState(false);
  const [slideShareFile, setSlideShareFile] = useState("");
  const [pptLink, setPptLink] = useState("");
  const [pptLinkError, setPptLinkError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      let projectObj = {
        value: row?.relatedProjectYear?.id,
        label: row?.relatedProjectYear?.projectYear,
      };
      setSelectedProject(projectObj);
      setAuthor(row?.author);
      setCompanyName(row?.authorCompany);
      setSlideShareHeading(row?.heading);
      setProjectYear(row?.projectYear);
      setSlideShareFile(row?.pptImage);
      setPptLink(row?.pptLink);
    }
  }, [location]);

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

  const getUploadParams = async (file, type) => {
    const finalData = new FormData();
    finalData.append("media", file);

    const token = localStorage.getItem("accessToken");
    const requestOptions = {
      method: "POST",
      body: finalData,
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    try {
      const response = await fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/upload",
        requestOptions,
      );
      const data = await response.json();

      if (
        data.detail === "The Token is expired" ||
        data.message === "Invalid token"
      ) {
        localStorage.clear();
        history.push("/logout");
        return;
      }

      if (data.uploadedURL) {
        slideShareFile(data.uploadedURL);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("There was an error, Please try again later.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
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
    } else if (author === "") {
      toast.error("Author is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAuthorError(true);
      setVisible(false);
    } else if (author?.length < 3) {
      toast.error("minimum 3 characters is Required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAuthorError(true);
      setVisible(false);
    } else if (companyName === "") {
      toast.error("Company Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCompanyNameError(true);
      setVisible(false);
    } else if (companyName?.length < 3) {
      toast.error("minimum 3 characters is Required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCompanyNameError(true);
      setVisible(false);
    } else if (slideShareHeading === "") {
      toast.error("Slide Share Heading is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSlideShareHeadingError(true);
      setVisible(false);
    } else if (slideShareHeading?.length < 3) {
      toast.error("minimum 3 characters is Required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSlideShareHeadingError(true);
      setVisible(false);
    }
    // else if (projectYear === "") {
    //   toast.error("Project Year is Required", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   setProjectYearError(true);
    //   setVisible(false);
    // }
    else if (pptLink === "") {
      toast.error("PPT Link is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPptLinkError(true);
      setVisible(false);
    } else if (pptLink?.length < 3) {
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
      setPptLinkError(true);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("author", author);
      finalData.append("authorCompany", companyName);
      finalData.append("heading", slideShareHeading);
      //   finalData.append("projectYear", projectYear);
      finalData.append("pptLink", pptLink);
      finalData.append("pptImage", slideShareFile);
      finalData.append("projectId", selectedProject?.value);
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/editslideShare",
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
        isOpen={editSlideShareModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Slide Share
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
                    Author <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      authorError ? "border-danger " : ""
                    }`}
                    placeholder="Enter Author Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={author}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setAuthorError(false);
                      } else {
                        setAuthorError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Company Name <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      companyNameError ? "border-danger " : ""
                    }`}
                    placeholder="Enter Company Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setCompanyNameError(false);
                      } else {
                        setCompanyNameError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Heading <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      slideShareHeadingError ? "border-danger " : ""
                    }`}
                    placeholder="Enter Heading"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={slideShareHeading}
                    onChange={(e) => {
                      setSlideShareHeading(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setSlideShareHeadingError(false);
                      } else {
                        setSlideShareHeadingError(true);
                      }
                    }}
                  />
                </div>
              </div>
              {/* <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Project Year <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      projectYearError ? "border-danger " : ""
                    }`}
                    placeholder="Enter Year"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={projectYear}
                    onChange={(e) => {
                      setProjectYear(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setProjectYearError(false);
                      } else {
                        setProjectYearError(true);
                      }
                    }}
                  />
                </div>
              </div> */}
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    PPT Link <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${
                      pptLinkError ? "border-danger " : ""
                    }`}
                    placeholder="Enter PPT Link"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={pptLink}
                    onChange={(e) => {
                      setPptLink(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setPptLinkError(false);
                      } else {
                        setPptLinkError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <Label>
                  Slide Share Image <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) => getUploadParams(e.target.files[0])}
                />
              </div>
              {slideShareFile?.length > 0 && (
                <div className="mt-2">
                  <img
                    src={slideShareFile}
                    alt="uploaded-Logo"
                    height={100}
                    width={100}
                  />
                </div>
              )}
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
                Edit Slide Share
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditSlideShare;
