import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const AddSponsorPackage = (props) => {
  const navigate = useNavigate();
  const { addSponsorPackageModal } = props;
  const [spoPackageName, setSpoPackageName] = useState("");
  const [SpoPackageNameError, setSpoPackageNameError] = useState(false);
  const [spoPackageOldPrice, setSpoPackageOldPrice] = useState("");
  const [spoPackageOldPriceError, setSpoPackageOldPriceError] = useState(false);
  const [spoPackagePrice, setSpoPackagePrice] = useState("");
  const [spoPackagePriceError, setSpoPackagePriceError] = useState(false);
  const [spoPackagePassQty, setSpoPackagePassQty] = useState("");
  const [spoPackagePassQtyError, setSpoPackagePassQtyError] = useState(false);
  const [spoPackageDiscount, setSpoPackageDiscount] = useState("");
  const [spoPackageDiscountError, setSpoPackageDiscountError] = useState(false);
  const [spoPackageSpace, setSpoPackageSpace] = useState("");
  const [spoPackageSpaceError, setSpoPackageSpaceError] = useState(false);
  const [sponsorPackageShowOrder, setSponsorPackageShowOrder] = useState("");
  const [sponsorPackageShowOrderError, setSponsorPackageShowOrderError] =
    useState(false);

  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (spoPackageName === "") {
      toast.error("Sponsor Package Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpoPackageNameError(true);
      setVisible(false);
    } else if (spoPackageOldPrice === "") {
      toast.error("Sponsor Package Old Price is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpoPackageOldPriceError(true);
      setVisible(false);
    } else if (spoPackagePrice === "") {
      toast.error("Sponsor Package Price is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpoPackagePriceError(true);
      setVisible(false);
    } else if (spoPackagePassQty === "") {
      toast.error("Sponsor Package Pass Qty is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpoPackagePassQtyError(true);
      setVisible(false);
    } else if (spoPackageDiscount === "") {
      toast.error("Sponsor Package Discount is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpoPackageDiscountError(true);
      setVisible(false);
    } else if (spoPackageSpace === "") {
      toast.error("Sponsor Package Exihibit Space is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSpoPackageSpaceError(true);
      setVisible(false);
    } else if (sponsorPackageShowOrder === "") {
      toast.error("Sponsor Package Show Order is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSponsorPackageShowOrderError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("sponsorPackageType", spoPackageName);
      finalData.append("sponsorPackagePrice", spoPackagePrice);
      finalData.append("sponsorPackageCuttingPrice", spoPackageOldPrice);
      finalData.append("delegatePassQty", spoPackagePassQty);
      finalData.append("inviteDiscount", spoPackageDiscount);
      finalData.append("exhibitSpace", spoPackageSpace);
      finalData.append("sponsorPackageShowOrder", sponsorPackageShowOrder);

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(`${API_BASE_URL}/admin1/addsponsorpackage`, requestOptions)
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
        size="lg"
        isOpen={addSponsorPackageModal}
        toggle={() => props.onCloseModal(false)}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => props.onCloseModal(false)}
        >
          <h5 className="modal-title" id="exampleModalLabel">
            Add Sponsor Package
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sponsor Package Name{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${SpoPackageNameError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Package Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={spoPackageName}
                    onChange={(e) => {
                      setSpoPackageName(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setSpoPackageNameError(false);
                      } else {
                        setSpoPackageNameError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sponsor Package Price{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${spoPackagePriceError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Package Price"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={spoPackagePrice}
                    onChange={(e) => {
                      setSpoPackagePrice(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setSpoPackagePriceError(false);
                      } else {
                        setSpoPackagePriceError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sponsor Package Old Price{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${spoPackageOldPriceError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Package Old Price"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={spoPackageOldPrice}
                    onChange={(e) => {
                      setSpoPackageOldPrice(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setSpoPackageOldPriceError(false);
                      } else {
                        setSpoPackageOldPriceError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Delegate Pass Qty <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${spoPackagePassQtyError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Delegate Pass Qty"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={spoPackagePassQty}
                    onChange={(e) => {
                      setSpoPackagePassQty(e.target.value);
                      setSpoPackagePassQtyError(false);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sponsor Package Discount{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${spoPackageDiscountError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Package Old Price"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={spoPackageDiscount}
                    onChange={(e) => {
                      setSpoPackageDiscount(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setSpoPackageDiscountError(false);
                      } else {
                        setSpoPackageDiscountError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sponsor Exhibit Space{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${spoPackageSpaceError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Package Old Price"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={spoPackageSpace}
                    onChange={(e) => {
                      setSpoPackageSpace(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setSpoPackageSpaceError(false);
                      } else {
                        setSpoPackageSpaceError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sponsor Package Show Order{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${sponsorPackageShowOrderError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Show Order"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={sponsorPackageShowOrder}
                    onChange={(e) => {
                      setSponsorPackageShowOrder(e.target.value);
                      setSponsorPackageShowOrderError(false);
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
                Add Sponsor Package
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default AddSponsorPackage;
