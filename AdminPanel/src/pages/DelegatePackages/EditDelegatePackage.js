import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import moment from "moment";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const packageStatus_arr = [
  { label: "Sold Out", value: "soldOut" },
  { label: "Available", value: "available" },
  { label: "Coming Soon", value: "comingSoon" },
];
const EditDelegatePackage = ({
  row,
  editDelegatePackageModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const location = useLocation();
  const [delPackageName, setDelPackageName] = useState("");
  const [delPackageNameError, setDelPackageNameError] = useState(false);
  const [delPackagePrice, setDelPackagePrice] = useState("");
  const [delPackagePriceError, setDelPackagePriceError] = useState(false);
  const [delPackageStatus, setDePackageStatus] = useState({});
  const [delPackageOrder, setDelPackageOrder] = useState("");
  const [delPackageOrderError, setDelPackageOrderError] = useState(false);
  const [delPackageExpiry, setDePackageExpiry] = useState("");
  console.log("delPackageExpiry: ", delPackageExpiry);
  const [delPackageExpiryError, setDePackageExpiryError] = useState(false);

  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setDelPackageName(row?.deligatePackageName);
      setDelPackagePrice(row?.deligatePackagePrice);
      setDePackageStatus({
        label: row?.deligatePackageStatus,
        value: row?.deligatePackageStatus,
      });
      setDelPackageOrder(row?.deligatePackageShowOrder);
      if (row?.deligatePackageExpiryDate) {
        const formattedDate = moment(
          row.deligatePackageExpiryDate,
          "YYYY-MM-DD"
        ).format("DD-MM-YYYY");
        setDePackageExpiry(formattedDate);
      }
    }
  }, [location]);

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (delPackageName === "") {
      toast.error("Delegate Package Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDelPackageNameError(true);
      setVisible(false);
    } else if (delPackageName?.length < 3) {
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
      setDelPackageNameError(true);
    } else if (delPackagePrice === "") {
      toast.error("Delegate Package Price is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDelPackagePriceError(true);
      setVisible(false);
    } else if (delPackageOrder === "") {
      toast.error("Delegate Package Show Order is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDelPackageOrderError(true);
      setVisible(false);
    } else if (delPackageExpiry === "") {
      toast.error("Delegate Package Expiry Date is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDePackageExpiryError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("deligatePackageName", delPackageName);
      finalData.append("deligatePackagePrice", delPackagePrice);
      finalData.append("deligatePackageStatus", delPackageStatus?.value);
      finalData.append("deligatePackageShowOrder", delPackageOrder);
      if (delPackageExpiry?.length > 0) {
        let djangoFormatDate = moment(delPackageExpiry, "DD-MM-YYYY").format(
          "YYYY-MM-DD"
        );
        console.log("djangoFormatDate: ", djangoFormatDate);
        finalData.append("deligatePackageExpiryDate", djangoFormatDate);
      }

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch("https://www.australia.lithium-downstream-summit.com/admin1/editdelegatepackage", requestOptions)
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
        isOpen={editDelegatePackageModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Delegate Package
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Delegate Package Name{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${delPackageNameError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Package Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={delPackageName}
                    onChange={(e) => {
                      setDelPackageName(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setDelPackageNameError(false);
                      } else {
                        setDelPackageNameError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Delegate Package Price{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${delPackagePriceError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Package Price"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={delPackagePrice}
                    onChange={(e) => {
                      setDelPackagePrice(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setDelPackagePriceError(false);
                      } else {
                        setDelPackagePriceError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Delegate Package Status{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <div className="input-group">
                    <Select
                      value={delPackageStatus}
                      onChange={(selectedPackageStatus) => {
                        setDePackageStatus(selectedPackageStatus);
                      }}
                      options={packageStatus_arr}
                      name="choices-publish-status-input"
                      classNamePrefix="select2-selection form-select"
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Delegate Package Show Order{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${delPackageOrderError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Show Order"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={delPackageOrder}
                    onChange={(e) => {
                      setDelPackageOrder(e.target.value);
                      setDelPackageOrderError(false);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Delegate Package Expiry Date{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Flatpickr
                    className={`form-control ${delPackageExpiryError ? "border-danger " : ""
                      }`}
                    id="datepicker-publish-input"
                    placeholder="Select Expiry Date"
                    value={delPackageExpiry}
                    options={{
                      dateFormat: "d-m-Y",
                      noCalendar: false,
                    }}
                    onChange={(selectedDates, dateStr, instance) => {
                      const formattedDate = moment(selectedDates[0]).format(
                        "DD-MM-YYYY"
                      );
                      setDePackageExpiry(formattedDate);
                      setDePackageExpiryError(false);
                    }}
                    defaultDate="null"
                    style={{ background: "#fff" }}
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
                Edit Delegate Package
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditDelegatePackage;
