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
const EditSponsorAddOns = ({
  row,
  editSponsorAddOnsModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const location = useLocation();
  const [sponsorAddOnTypesList, setSponsorAddOnTypesList] = useState([]);
  const [addOnName, setAddOnName] = useState("");
  const [addOnNameError, setAddOnNameError] = useState(false);
  const [selectedAddOnType, setSelectedAddOnType] = useState(null);
  const [selectedAddOnTypeError, setSelectedAddOnTypeError] = useState(false);
  const [addOnPrice, setAddOnPrice] = useState("");
  const [addOnPriceError, setAddOnPriceError] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setAddOnName(row?.sponsorAddOnName);
      let addOnTypeObj = {
        value: row?.addOnTypeDetails?.id,
        label: row?.addOnTypeDetails?.addOnTypeName,
      };
      setSelectedAddOnType(addOnTypeObj);
      setAddOnPrice(row?.sponsorAddOnPrice);
    }
  }, [location]);

  useEffect(() => {
    callSponsorAddOnsTypeListApi();
    // eslint-disable-next-line
  }, []);

  const callSponsorAddOnsTypeListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(
      `${API_BASE_URL}/admin1/sponsorpackageaddontypes`,
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
        if (data && data.status) {
          setSponsorAddOnTypesList(data["sponsorPackageAddOnTypes"]);
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

  const AddOnTypeOptions = (list) => {
    let arr = [];
    list.length > 0 &&
      // eslint-disable-next-line
      list.map((option) => {
        let obj = {
          value: option.id,
          label: option.addOnTypeName,
        };
        arr.push(obj);
      });
    return arr;
  };

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (selectedAddOnType === null) {
      toast.error("Add On Type is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSelectedAddOnTypeError(true);
      setVisible(false);
    } else if (addOnName === "") {
      toast.error("Add On Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAddOnNameError(true);
      setVisible(false);
    } else if (addOnPrice === "") {
      toast.error("Add On Price is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setAddOnPriceError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("sponsorAddOnName", addOnName);
      finalData.append("sponsorAddOnPrice", addOnPrice);
      finalData.append("sponsorPackageAddOnTypeId", selectedAddOnType?.value);
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        `${API_BASE_URL}/admin1/editsponsoraddons`,
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
        isOpen={editSponsorAddOnsModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Sponsor Add-On
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Sponsor Add On Type <span className="required_span">*</span>
                  </Label>
                  <div className="input-group">
                    <Select
                      value={selectedAddOnType}
                      onChange={(selectedAddOnType) => {
                        setSelectedAddOnType(selectedAddOnType);
                        setSelectedAddOnTypeError(false);
                      }}
                      options={AddOnTypeOptions(sponsorAddOnTypesList)}
                      name="choices-publish-status-input"
                      classNamePrefix="select2-selection form-select"
                      className={`w-100 ${selectedAddOnTypeError ? "border-danger" : ""
                        }`}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Add On Name <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${addOnNameError ? "border-danger " : ""
                      }`}
                    placeholder="Enter News Title"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={addOnName}
                    onChange={(e) => {
                      setAddOnName(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setAddOnNameError(false);
                      } else {
                        setAddOnNameError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Add On Price <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${addOnPriceError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Add On Price"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={addOnPrice}
                    onChange={(e) => {
                      setAddOnPrice(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setAddOnPriceError(false);
                      } else {
                        setAddOnPriceError(true);
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
                Edit Add-On
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditSponsorAddOns;
