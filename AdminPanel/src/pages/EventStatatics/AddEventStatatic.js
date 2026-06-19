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
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const AddEventStatatics = (props) => {
  const navigate = useNavigate();
  const { addEventStataticsModal } = props;
  const [countTopic, setCountTopic] = useState("");
  const [countTopicError, setCountTopicError] = useState(false);
  const [count, setCount] = useState("");
  const [countError, setCountError] = useState(false);
  const [plusEnable, setPlusEnable] = useState(false);
  console.log('plusEnable: ', plusEnable);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  const submitBtnClk = (e) => {
    e.preventDefault();
    if (countTopic === "") {
      toast.error("Caption is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCountTopicError(true);
      setVisible(false);
    } else if (countTopic?.length < 3) {
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
      setCountTopicError(true);
    } else if (count === "") {
      toast.error("Figure is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCountError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("topicLabel", countTopic);
      finalData.append("topicCount", count);
      finalData.append("countIcon", plusEnable);

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(`${API_BASE_URL}/admin1/addhomecountpoints`, requestOptions)
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

  const handlePlusEnableChange = (event) => {
    setPlusEnable(event.target.checked);
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
        isOpen={addEventStataticsModal}
        toggle={() => props.onCloseModal(false)}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => props.onCloseModal(false)}
        >
          <h5 className="modal-title" id="exampleModalLabel">
            Add Event Statatic
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Caption <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${countTopicError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Caption"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={countTopic}
                    onChange={(e) => {
                      setCountTopic(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setCountError(false);
                      } else {
                        setCountError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Figure <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${countError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Figure"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={count}
                    onChange={(e) => {
                      setCount(e.target.value);
                      setCountError(false);
                    }}
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="d-flex gap-2">
                  <Label className="form-label">
                    Plus Icon Enable
                  </Label>
                  <div>
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="productBrandRadio2"
                        checked={plusEnable}
                        onChange={handlePlusEnableChange}
                      />
                    </div>
                  </div>
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
                Add Statatic
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default AddEventStatatics;
