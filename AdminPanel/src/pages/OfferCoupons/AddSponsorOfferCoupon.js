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
const AddSponsorOfferCoupon = (props) => {
  const navigate = useNavigate();
  const { addSponsorCouponModal } = props;
  const [sponsorCode, setSponsorCode] = useState("");
  const [sponsorCodeError, setSponsorCodeError] = useState(false);
  const [discount, setDiscount] = useState("");
  const [discountError, setDiscountError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (sponsorCode === "") {
      toast.error("Sponsor Code is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSponsorCodeError(true);
      setVisible(false);
    } else if (discount === "") {
      toast.error("Discount is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDiscountError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("couponCode", sponsorCode);
      finalData.append("discountAmount", discount);

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch("https://www.australia.lithium-downstream-summit.com/admin1/addsponsoroffercoupon", requestOptions)
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
        isOpen={addSponsorCouponModal}
        toggle={() => props.onCloseModal(false)}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => props.onCloseModal(false)}
        >
          <h5 className="modal-title" id="exampleModalLabel">
            Add Sponsor Coupon
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Sponsor Code <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${sponsorCodeError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Sponsor Code"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={sponsorCode}
                    onChange={(e) => {
                      setSponsorCode(e.target.value);
                      setSponsorCodeError(false);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Discount Amount{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${discountError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Discount Amount"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={discount}
                    onChange={(e) => {
                      setDiscount(e.target.value);
                      setDiscountError(false);
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
                Add Sponsor Coupon
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default AddSponsorOfferCoupon;
