import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, ModalHeader, Form, ModalBody, Label, Input } from "reactstrap";
import "../../assets/css/ApplicationMain.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "../../assets/css/dropzone.css";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const EditRelatedEvent = ({
  row,
  editRelatedEventModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const location = useLocation();
  const [eventName, setEventName] = useState("");
  const [eventNameErr, setEventNameErr] = useState("");

  const [eventDate, setEventDate] = useState("");
  const [eventDateErr, setEventDateErr] = useState("");

  const [eventLoation, setEventLocation] = useState("");
  const [eventLocationErr, setEventLocationErr] = useState("");

  const [eventWebsite, setEventWebsite] = useState("");
  const [eventWebsiteErr, setEventWebsiteErr] = useState("");

  const [eventImage, setEventImage] = useState("");
  const [eventHoverImage, setEventHoverImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setEventName(row?.eventName);
      setEventDate(row?.eventDate);
      setEventLocation(row?.eventLocation);
      setEventWebsite(row?.eventWebsiteLink);
      setEventImage(row?.eventImage);
      setEventHoverImage(row?.eventHoverImage);
    }
  }, [location]);

  const getUploadParams = async (file, type) => {
    const finalData = new FormData();
    finalData.append("media", file);
    const requestOptions = {
      method: "POST",
      body: finalData,
    };

    try {
      const response = await fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/upload",
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
        switch (type) {
          case "eventImage":
            setEventImage(data.uploadedURL);
            break;
          case "eventHoverImage":
            setEventHoverImage(data.uploadedURL);
            break;
          default:
            break;
        }
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
    if (eventName === "") {
      toast.error("Releted Event Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEventNameErr(true);
      setVisible(false);
    } else if (eventName?.length < 3) {
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
      setEventNameErr(true);
    } else if (eventDate === "") {
      toast.error("Releted Event Date is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEventDateErr(true);
      setVisible(false);
    } else if (eventLoation === "") {
      toast.error("Releted Event Location is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEventLocationErr(true);
      setVisible(false);
    } else if (eventWebsite === "") {
      toast.error("Releted Event Website is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEventWebsiteErr(true);
      setVisible(false);
    } else if (eventImage === "") {
      toast.error("Please upload Related Event Image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
    } else if (eventHoverImage === "") {
      toast.error("Please upload Related Event Hover Image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("eventName", eventName);
      finalData.append("eventLocation", eventLoation);
      finalData.append("eventWebsiteLink", eventWebsite);
      finalData.append("eventDate", eventDate);
      finalData.append("eventImage", eventImage);
      finalData.append("eventHoverImage", eventHoverImage);

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch("https://www.australia.lithium-downstream-summit.com/admin1/editrelatedevent", requestOptions)
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
        isOpen={editRelatedEventModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Related Event
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Related Event Name <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${eventNameErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Related Event Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={eventName}
                    onChange={(e) => {
                      setEventName(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setEventNameErr(false);
                      } else {
                        setEventNameErr(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Related Event Date <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${eventDateErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Related Event Date"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={eventDate}
                    onChange={(e) => {
                      setEventDate(e.target.value);
                      setEventDateErr(false);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Related Event Location{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${eventLocationErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Related Event Location"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={eventLoation}
                    onChange={(e) => {
                      setEventLocation(e.target.value);
                      setEventLocationErr(false);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Related Event Website{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${eventWebsiteErr ? "border-danger " : ""
                      }`}
                    placeholder="Enter Related Event Website"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={eventWebsite}
                    onChange={(e) => {
                      setEventWebsite(e.target.value);
                      setEventWebsiteErr(false);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <Label>
                  Related Event Logo <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) =>
                    getUploadParams(e.target.files[0], "eventImage")
                  }
                />
                {eventImage?.length > 0 && (
                  <div className="mt-2">
                    <img
                      src={eventImage}
                      alt="uploaded-Logo"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <Label>
                  Related Event Hover Image{" "}
                  <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) =>
                    getUploadParams(e.target.files[0], "eventHoverImage")
                  }
                />
                {eventHoverImage?.length > 0 && (
                  <div className="mt-2">
                    <img
                      src={eventHoverImage}
                      alt="uploaded-Logo"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
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
                Edit Related Event
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditRelatedEvent;
