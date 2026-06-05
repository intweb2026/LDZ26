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
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;
const sponsorTypes = [
  { label: "Silver", value: "Silver" },
  { label: "Gold", value: "Gold" },
  { label: "Platinum", value: "Platinum" },
];
const EditEventLeader = ({
  row,
  editLeaderModal,
  onCloseModal,
  onModalSubmitBtnClk,
}) => {
  console.log("row: ", row);
  const navigate = useNavigate();
  const location = useLocation();
  const [leaderName, setLeaderName] = useState("");
  const [leaderNameError, setLeaderNameError] = useState(false);
  const [leaderLogo, setLeaderLogo] = useState("");
  const [leaderLogoError, setLeaderLogoError] = useState(false);

  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  let color = "#405189";

  useEffect(() => {
    if (row) {
      setLeaderName(row?.leaderName);
      setLeaderLogo(row?.leaderLogo);
    }
  }, [location]);

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
        setLeaderLogo(data.uploadedURL);
        setLeaderLogoError(false);
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
    if (leaderName === "") {
      toast.error("Leader Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLeaderNameError(true);
      setVisible(false);
    } else if (leaderName?.length < 3) {
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
      setLeaderNameError(true);
    } else if (leaderLogo === "") {
      toast.error("Leader Logo is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLeaderLogoError(true);
      setVisible(false);
    } else {
      setVisible(true);
      const finalData = new FormData();
      finalData.append("id", row?.id);
      finalData.append("leaderName", leaderName);
      finalData.append("leaderLogo", leaderLogo);

      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch("https://www.australia.lithium-downstream-summit.com/admin1/editeventleader", requestOptions)
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
        isOpen={editLeaderModal}
        toggle={onCloseModal}
        centered
      >
        <ModalHeader className="bg-light p-3" toggle={onCloseModal}>
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Event Leader
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Leader Name <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className={`form-control ${leaderNameError ? "border-danger " : ""
                      }`}
                    placeholder="Enter Leader Name"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={leaderName}
                    onChange={(e) => {
                      setLeaderName(e.target.value);
                      if (e.target.value?.length >= 3) {
                        setLeaderNameError(false);
                      } else {
                        setLeaderNameError(true);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <Label>
                  Leader Logo <span className="required_span">*</span>
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
              {leaderLogo?.length > 0 && (
                <div className="mt-2">
                  <img
                    src={leaderLogo}
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
                Edit Event Leader
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditEventLeader;
