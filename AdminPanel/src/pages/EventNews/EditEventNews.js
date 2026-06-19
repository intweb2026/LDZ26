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
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const topNewsStatus = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
const EditEventNews = ({
  row,
  editEventNewsModal,
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
  const [newsCategoryList, setNewsCategoryList] = useState([]);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [newsImage, setNewsImage] = useState("");
  const [selectedNewsCategory, setSelectedNewsCategory] = useState(null);
  const [newsShortDescription, setNewsShortDescription] = useState("");
  const [newsShortDescriptionErr, setNewsShortDescriptionErr] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsDescriptionErr, setNewsDescriptionErr] = useState("");
  const [newsPublishDate, setNewsPublishDate] = useState("");
  const [isTopNews, setIsTopNews] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [newsMetaTitle, setNewsMetaTitle] = useState("");
  const [newsMetaTitleError, setNewsMetaTitleError] = useState(false);
  const [newsMetaDescription, setNewsMetaDescription] = useState("");
  const [newsMetaDescriptionError, setNewsMetaDescriptionError] =
    useState(false);
  const [newsImgAltText, setNewsImgAltText] = useState("");
  const [newsImgAltTextError, setNewsImgAltTextError] = useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setTitle(row?.newsTitle);
      setNewsImage(row?.newsImage);
      let newsCategoryObj = {
        value: row?.newsCategoryDetails?.id,
        label: row?.newsCategoryDetails?.newsCategory,
      };
      setSelectedNewsCategory(newsCategoryObj);
      setNewsShortDescription(
        row?.newsShortDescription?.replace(/^"(.*)"$/, "$1")
      );
      setNewsDescription(row?.newsDescription?.replace(/^"(.*)"$/, "$1"));
      if (row?.newsCreatedDate) {
        const formattedDate = moment(row.newsCreatedDate, "YYYY-MM-DD").format(
          "DD-MM-YYYY"
        );
        setNewsPublishDate(formattedDate);
      }
      setIsTopNews({ label: row?.isTopNews, value: row?.isTopNews });
      if (eventDetails?.isSeoEnable === "Yes") {
        setNewsMetaTitle(row?.newsMetaTitle || "");
        setNewsMetaDescription(row?.newsMetaDescription || "");
        setNewsImgAltText(row?.newsImageAltText || "");
      }
    }
  }, [location]);

  useEffect(() => {
    callNewsCategoryListApi();
    // eslint-disable-next-line
  }, []);

  const callNewsCategoryListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/newscategories`, requestOptions)
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
          setNewsCategoryList(data["newsCategories"]);
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

  const newsCategoryOptions = (list) => {
    let arr = [];
    list.length > 0 &&
      // eslint-disable-next-line
      list.map((option) => {
        let obj = {
          value: option.id,
          label: option.categoryName,
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
        `${API_BASE_URL}/admin1/upload`,
        requestOptions
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
        setNewsImage(data.uploadedURL);
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
    if (title === "") {
      toast.error("News Title is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTitleError(true);
      setVisible(false);
    } else if (title?.length < 3) {
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
      setTitleError(true);
    } else if (selectedNewsCategory === null) {
      toast.error("News Category is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
    } else if (newsShortDescription === "") {
      toast.error("News Short Description is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setNewsShortDescriptionErr(true);
      setVisible(false);
    } else if (newsDescription === "") {
      toast.error("News Description is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setNewsDescriptionErr(true);
      setVisible(false);
    } else if (
      eventDetails?.isSeoEnable === "Yes" &&
      newsMetaTitle.length > 60
    ) {
      toast.error("Meta Title cannot exceed 60 characters!", {
        position: "top-right",
        autoClose: 5000,
      });
      setNewsMetaTitleError(true);
      setVisible(false);
    } else if (
      eventDetails?.isSeoEnable === "Yes" &&
      newsMetaDescription.length > 160
    ) {
      toast.error("Meta Description cannot exceed 160 characters!", {
        position: "top-right",
        autoClose: 5000,
      });
      setNewsMetaDescriptionError(true);
      setVisible(false);
    } else if (
      eventDetails?.isSeoEnable === "Yes" &&
      newsImgAltText.length > 125
    ) {
      toast.error("Image Alter Text cannot exceed 125 characters!", {
        position: "top-right",
        autoClose: 5000,
      });
      setNewsImgAltTextError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("newsTitle", title);
      finalData.append(
        "newsShortDescription",
        JSON.stringify(newsShortDescription)
      );
      finalData.append("newsDescription", JSON.stringify(newsDescription));
      if (newsPublishDate?.length > 0) {
        let djangoFormatDate = moment(newsPublishDate, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        );
        console.log("djangoFormatDate: ", djangoFormatDate);
        finalData.append("newsCreatedDate", djangoFormatDate);
      }
      finalData.append("newsImage", newsImage);
      finalData.append("newsCategoryId", selectedNewsCategory?.value);
      finalData.append("isTopNews", isTopNews?.value);
      if (eventDetails?.isSeoEnable === "Yes") {
        finalData.append("newsMetaTitle", newsMetaTitle);
        finalData.append("newsMetaDescription", newsMetaDescription);
        finalData.append("newsImageAltText", newsImgAltText);
      }
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(`${API_BASE_URL}/admin1/editgeneralnews`, requestOptions)
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
        isOpen={editEventNewsModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Event News
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    News Title <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${titleError ? "border-danger " : ""
                      }`}
                    placeholder="Enter News Title"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setTitleError(false);
                      } else {
                        setTitleError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    News Category <span className="required_span">*</span>
                  </Label>
                  <div className="input-group">
                    <Select
                      value={selectedNewsCategory}
                      onChange={(selectedNewsCategory) => {
                        setSelectedNewsCategory(selectedNewsCategory);
                      }}
                      options={newsCategoryOptions(newsCategoryList)}
                      name="choices-publish-status-input"
                      classNamePrefix="select2-selection form-select"
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    News Publish Date
                  </Label>
                  <div className="input-group">
                    <Flatpickr
                      className="form-control "
                      id="datepicker-publish-input"
                      placeholder="Select Publish Date"
                      value={newsPublishDate}
                      options={{
                        dateFormat: "d-m-Y",
                        noCalendar: false,
                      }}
                      onChange={(selectedDates, dateStr, instance) => {
                        const formattedDate = moment(selectedDates[0]).format(
                          "DD-MM-YYYY"
                        );
                        setNewsPublishDate(formattedDate);
                      }}
                      defaultDate="null"
                      style={{ background: "#fff" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    News Short Description{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={newsShortDescription}
                        name="newsShortDescription"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setNewsShortDescription(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    News Description <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={newsDescription}
                        name="newsDescription"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setNewsDescription(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <Label>
                  News Image <span className="required_span">*</span>
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
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Is Top News?
                  </Label>
                  <div className="input-group">
                    <Select
                      value={isTopNews}
                      onChange={(selectedType) => {
                        setIsTopNews(selectedType);
                      }}
                      options={topNewsStatus}
                      name="choices-publish-status-input"
                      classNamePrefix="select2-selection form-select"
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
              {newsImage?.length > 0 && (
                <div className="mt-2">
                  <img
                    src={newsImage}
                    alt="uploaded-Logo"
                    height={100}
                    width={100}
                  />
                </div>
              )}
              {eventDetails?.isSeoEnable === "Yes" && (
                <>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        News Meta Title <span className="required_span">*</span>{" "}
                        (Max. Length 60 Characters)
                      </Label>
                      <Input
                        type="text"
                        className={`form-control ${newsMetaTitleError ? "border-danger " : ""
                          }`}
                        placeholder="Enter Meta Title"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={newsMetaTitle}
                        onChange={(e) => {
                          setNewsMetaTitle(e.target.value);
                          if (e.target.value?.length > 60) {
                            setNewsMetaTitleError(true);
                          } else {
                            setNewsMetaTitleError(false);
                          }
                        }}
                      />
                      {/* Character Counter */}
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {newsMetaTitle.length}/60
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        News Meta Description{" "}
                        <span className="required_span">*</span> (Max. Length
                        160 Characters)
                      </Label>
                      <textarea
                        type="text"
                        className={`form-control ${newsMetaDescriptionError ? "border-danger " : ""
                          }`}
                        placeholder="Enter Meta Description"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={newsMetaDescription}
                        rows={4}
                        onChange={(e) => {
                          setNewsMetaDescription(e.target.value);
                          if (e.target.value?.length > 160) {
                            setNewsMetaDescriptionError(true);
                          } else {
                            setNewsMetaDescriptionError(false);
                          }
                        }}
                      />
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {newsMetaDescription.length}/160
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        News Image Alter Text{" "}
                        <span className="required_span">*</span> (Max. Length
                        125 Characters)
                      </Label>
                      <textarea
                        type="text"
                        className={`form-control ${newsImgAltTextError ? "border-danger " : ""
                          }`}
                        placeholder="Enter Alt Text"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={newsImgAltText}
                        rows={2}
                        onChange={(e) => {
                          setNewsImgAltText(e.target.value);
                          if (e.target.value?.length > 125) {
                            setNewsImgAltTextError(true);
                          } else {
                            setNewsImgAltTextError(false);
                          }
                        }}
                      />
                      {/* Character Counter */}
                      <p style={{ fontSize: "12px", marginTop: "3px" }}>
                        Character count: {newsImgAltText.length}/125
                      </p>
                    </div>
                  </div>
                </>
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
                Edit News
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditEventNews;
