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
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const EditNavSubCategory = ({
  row,
  editSubCategoryModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const location = useLocation();
  const [navMainCategoryList, setNavMainCategoryList] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryNameError, setSubCategoryNameError] = useState(false);
  const [subCategoryPath, setSubCategoryPath] = useState("");
  const [subCategoryPathError, setSubCategoryPathError] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedMainCategoryError, setSelectedMainCategoryError] =
    useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setSubCategoryName(row?.navSubCategoryName);
      let mainCategoryObj = {
        value: row?.relatedMainCategory?.id,
        label: row?.relatedMainCategory?.navMainCategoryName,
      };
      setSelectedMainCategory(mainCategoryObj);
      setSubCategoryPath(row?.navSubCategoryPath);
    }
  }, [location]);

  useEffect(() => {
    callMainCategoryListApi();
    // eslint-disable-next-line
  }, []);

  const callMainCategoryListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/navmaincategories`, requestOptions)
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
          setNavMainCategoryList(data["navMainategories"]);
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

  const mainCategoryOptions = (list) => {
    let arr = [];
    list.length > 0 &&
      // eslint-disable-next-line
      list.map((option) => {
        let obj = {
          value: option.id,
          label: option.navMainCategoryName,
        };
        arr.push(obj);
      });
    return arr;
  };

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (selectedMainCategory === null) {
      toast.error("Please Select The Main Category", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSelectedMainCategoryError(true);
      setVisible(false);
    } else if (subCategoryName === "") {
      toast.error("Sub Category Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSubCategoryNameError(true);
      setVisible(false);
    } else if (subCategoryPath === "") {
      toast.error("Path is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSubCategoryPathError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("navSubCategoryName", subCategoryName);
      finalData.append("navSubCategoryPath", subCategoryPath);
      finalData.append("navMainCategoryId", selectedMainCategory?.value);
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(`${API_BASE_URL}/admin1/editnavsubcategory`, requestOptions)
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
        isOpen={editSubCategoryModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Nav Sub Category
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Main Category <span className="required_span">*</span>
                  </Label>
                  <div className="input-group">
                    <Select
                      value={selectedMainCategory}
                      onChange={(selecteMainCat) => {
                        setSelectedMainCategory(selecteMainCat);
                        setSelectedMainCategoryError(false);
                      }}
                      options={mainCategoryOptions(navMainCategoryList)}
                      name="choices-publish-status-input"
                      classNamePrefix="select2-selection form-select"
                      className={`w-100 ${selectedMainCategoryError ? "border-danger" : ""
                        }`}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sub Category Name <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${subCategoryNameError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Sub Category Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={subCategoryName}
                    onChange={(e) => {
                      setSubCategoryName(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setSubCategoryNameError(false);
                      } else {
                        setSubCategoryNameError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Path<span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${subCategoryPathError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Sub Category Path"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={subCategoryPath}
                    onChange={(e) => {
                      setSubCategoryPath(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setSubCategoryPathError(false);
                      } else {
                        setSubCategoryPathError(true);
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
                Edit Sub Category
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditNavSubCategory;
