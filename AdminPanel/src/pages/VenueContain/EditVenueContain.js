import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
const EditVenueContain = (props) => {
  const navigate = useNavigate();
  const { editVenueModal } = props;
  const [venueData, setVenueData] = useState([]);
  const [venueGalleryData, setVenueGalleryData] = useState([]);
  // const [venuePlace, setVenuePlace] = useState("");
  // const [venuePlaceErr, setVenuePlaceErr] = useState(false);

  const [venueDescription, setVenueDescription] = useState("");
  const [venueDescriptionErr, setVenueDescriptionErr] = useState(false);
  const [venueWebsiteLink, setVenueWebsiteLink] = useState("");
  const [venueWebsiteLinkErr, setVenueWebsiteLinkErr] = useState(false);
  const [venueGalleryImg1, setVenueGalleryImg1] = useState("");
  const [venueGalleryImg2, setvenueGalleryImg2] = useState("");
  const [venueGalleryImg3, setvenueGalleryImg3] = useState("");
  const [venueGalleryImg4, setvenueGalleryImg4] = useState("");
  const [venueGalleryImg5, setvenueGalleryImg5] = useState("");
  const [venueGalleryImg6, setvenueGalleryImg6] = useState("");
  const [venueLocation, setVenueLocation] = useState("");
  const [venueLocationErr, setVenueLocationErr] = useState(false);
  const [venueContact, setVenueContact] = useState("");
  const [venueContactErr, setVenueContactErr] = useState(false);
  const [venueMapLink, setVenueMapLink] = useState("");
  const [venueMapLinkErr, setVenueMapLinkErr] = useState(false);
  // const [venueWebAddress, setVenueWebAddress] = useState("");
  // const [venueWebAddressErr, setVenueWebAddressErr] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "|",
      "bulletedList",
      "numberedList",
      "|",
      "blockQuote",
      "insertTable",
      "|",
      "undo",
      "redo",
    ],
    link: {
      defaultProtocol: "https://",
      decorators: {
        openInNewTab: {
          mode: "manual",
          label: "Open in a new tab",
          attributes: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        },
      },
    },
    // Disable media embed and auto media embed to prevent Google Maps links 
    // from being converted to oembed format
    removePlugins: ['MediaEmbed', 'AutoMediaEmbed'],
  };
  let color = "#405189";
  useEffect(() => {
    callVenueContentListApi();
    callVenueGalleryListApi();

    // eslint-disable-next-line
  }, []);
  const callVenueContentListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/getvenuedata`, requestOptions)
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
          setVenueData(data["venuePageStaticData"]);
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
  const callVenueGalleryListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/venuegalleryimages`, requestOptions)
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
          setVenueGalleryData(data["venueGalleryImages"]);
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
  useEffect(() => {
    if (venueData.length > 0) {
      // setVenuePlace(venueData[0]?.venueFirstSectionFirstTitle);
      setVenueDescription(
        venueData[0]?.venueFirstSectionDescription?.replace(/^"(.*)"$/, "$1")
      );
      setVenueWebsiteLink(venueData[0]?.venueAddressLink?.replace(/^"(.*)"$/, "$1"));
      setVenueLocation(venueData[0]?.venueLocation?.replace(/^"(.*)"$/, "$1"));
      setVenueContact(venueData[0]?.venueContact?.replace(/^"(.*)"$/, "$1"));
      setVenueMapLink(venueData[0]?.venueMapLink?.replace(/^"(.*)"$/, "$1"));
      // setVenueWebAddress(venueData[0]?.venueWebsiteAddress);
    }
    if (venueGalleryData?.length > 0) {
      setVenueGalleryImg1(venueGalleryData[0].gallerySectionOneBigImage);
      setvenueGalleryImg2(venueGalleryData[0].gallerySectionOneSmallImage);
      setvenueGalleryImg3(venueGalleryData[0].gallerySectionTwoBigImage);
      setvenueGalleryImg4(venueGalleryData[0].gallerySectionTwoSmallImage);
      setvenueGalleryImg5(venueGalleryData[0].gallerySectionThreeBigImage);
      setvenueGalleryImg6(venueGalleryData[0].gallerySectionThreeSmallImage);
    }
    // eslint-disable-next-line
  }, [venueData, venueGalleryData]);

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
          case "img1":
            setVenueGalleryImg1(data.uploadedURL);
            break;
          case "img2":
            setvenueGalleryImg2(data.uploadedURL);
            break;
          case "img3":
            setvenueGalleryImg3(data.uploadedURL);
            break;
          case "img4":
            setvenueGalleryImg4(data.uploadedURL);
            break;
          case "img5":
            setvenueGalleryImg5(data.uploadedURL);
            break;
          case "img6":
            setvenueGalleryImg6(data.uploadedURL);
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
    // if (venuePlace === "") {
    //   toast.error("Venue Place is Required", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   setVisible(false);
    //   setVenuePlaceErr(true);
    // } else 
    if (venueDescription === "") {
      toast.error("Venue Description is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setVenueDescriptionErr(true);
    } else if (venueLocation === "") {
      toast.error("Venue Location is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setVenueLocationErr(true);
    } else if (venueWebsiteLink === "") {
      toast.error("Venue Website Link is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setVenueWebsiteLinkErr(true);
    } else if (venueContact === "") {
      toast.error("Venue Contact is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setVenueContactErr(true);
    } else if (venueMapLink === "") {
      toast.error("Venue Map Link is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setVisible(false);
      setVenueMapLinkErr(true);
    }
    // else if (venueWebAddress === "") {
    //   toast.error("Venue Web Address is Required", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   setVisible(false); 
    //   setVenueWebAddressErr(true);
    // }
    else {
      setVisible(true);
      const finalData = new FormData();
      // finalData.append("venueFirstSectionFirstTitle", venuePlace);
      finalData.append("venueFirstSectionDescription", JSON.stringify(venueDescription));
      finalData.append("venueLocation", JSON.stringify(venueLocation));
      finalData.append("venueContact", JSON.stringify(venueContact));
      finalData.append("venueAddressLink", JSON.stringify(venueWebsiteLink));
      finalData.append("venueMapLink", JSON.stringify(venueMapLink));
      // finalData.append("venueWebsiteAddress", venueWebAddress);

      finalData.append("gallerySectionOneBigImage", venueGalleryImg1);
      finalData.append("gallerySectionOneSmallImage", venueGalleryImg2);
      finalData.append("gallerySectionTwoBigImage", venueGalleryImg3);
      finalData.append("gallerySectionTwoSmallImage", venueGalleryImg4);
      finalData.append("gallerySectionThreeBigImage", venueGalleryImg5);
      finalData.append("gallerySectionThreeSmallImage", venueGalleryImg6);
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/addvenuepagestaticdata",
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
        isOpen={editVenueModal}
        toggle={() => props.onCloseModal(false)}
        centered
      >
        <ModalHeader
          className="bg-light p-3"
          toggle={() => props.onCloseModal(false)}
        >
          <h5 className="modal-title" id="exampleModalLabel">
            Edit Venue Content
          </h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <input type="hidden" id="id-field" />
            <div className="row gy-4 mb-3">
              {/* <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Venue Place <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Tagline"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={venuePlace}
                    onChange={(e) => {
                      setVenuePlace(e.target.value);
                    }}
                  />
                </div>
              </div> */}
              <div className="col-md-12">
                <div>
                  <Label htmlFor="amount-field" className="form-label">
                    Venue Description <span className="required_span">*</span>
                  </Label>
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={venueDescription}
                        name="venueDescription"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setVenueDescription(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Venue Location <span className="required_span">*</span>
                  </Label>
                  {/* <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Tagline"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={venueLocation}
                    onChange={(e) => {
                      setVenueLocation(e.target.value);
                    }}
                  /> */}
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={venueLocation}
                        config={editorConfiguration}
                        name="venueLocation"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setVenueLocation(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Venue Website <span className="required_span">*</span>
                  </Label>
                  {/* <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Tagline"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={venueWebsiteLink}
                    onChange={(e) => {
                      setVenueWebsiteLink(e.target.value);
                    }}
                  /> */}
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={venueWebsiteLink}
                        config={editorConfiguration}
                        name="venueWebsiteLink"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setVenueWebsiteLink(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Venue Contact <span className="required_span">*</span>
                  </Label>
                  {/* <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Tagline"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={venueContact}
                    onChange={(e) => {
                      setVenueContact(e.target.value);
                    }}
                  /> */}
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={venueContact}
                        config={editorConfiguration}
                        name="venueContact"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setVenueContact(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Venue Google Map Link{" "}
                    <span className="required_span">*</span>
                  </Label>
                  {/* <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Tagline"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={venueMapLink}
                    onChange={(e) => {
                      setVenueMapLink(e.target.value);
                    }}
                  /> */}
                  <div className="input-group" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={venueMapLink}
                        name="venueMapLink"
                        onChange={(event, editor) => {
                          const ipdata = editor.getData();
                          setVenueMapLink(ipdata);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div>
                  <Label htmlFor="customername-field" className="form-label">
                    Venue Web Showing Address{" "}
                    <span className="required_span">*</span>
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter Tagline"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={venueWebAddress}
                    onChange={(e) => {
                      setVenueWebAddress(e.target.value);
                    }}
                  />
                </div>
              </div> */}
              <div className="col-md-6">
                <Label>
                  Venue Gallery Img 1 <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) => getUploadParams(e.target.files[0], "img1")}
                />
              </div>
              <div className="col-md-6">
                <Label>
                  Venue Gallery Img 2 <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) => getUploadParams(e.target.files[0], "img2")}
                />
              </div>
              <div className="col-md-6">
                <Label>
                  Venue Gallery Img 3 <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) => getUploadParams(e.target.files[0], "img3")}
                />
              </div>
              <div className="col-md-6">
                <Label>
                  Venue Gallery Img 4 <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) => getUploadParams(e.target.files[0], "img4")}
                />
              </div>
              <div className="col-md-6">
                <Label>
                  Venue Gallery Img 5 <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) => getUploadParams(e.target.files[0], "img5")}
                />
              </div>
              <div className="col-md-6">
                <Label>
                  Venue Gallery Img 6 <span className="required_span">*</span>
                </Label>
                <Input
                  id="profile-img-file-input"
                  type="file"
                  className="profile-img-file-input"
                  accept="image/png, image/jpg, image/jpeg,"
                  name="photo"
                  onChange={(e) => getUploadParams(e.target.files[0], "img6")}
                />
              </div>
              <div className="d-flex">
                {venueGalleryImg1?.length > 0 && (
                  <div className="mt-2">
                    <img
                      src={venueGalleryImg1}
                      alt="uploaded-Logo"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
                {venueGalleryImg2?.length > 0 && (
                  <div className="mt-2">
                    <img
                      src={venueGalleryImg2}
                      alt="uploaded-Logo"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
                {venueGalleryImg3?.length > 0 && (
                  <div className="mt-2">
                    <img
                      src={venueGalleryImg3}
                      alt="uploaded-Logo"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
                {venueGalleryImg4?.length > 0 && (
                  <div className="mt-2">
                    <img
                      src={venueGalleryImg4}
                      alt="uploaded-Logo"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
                {venueGalleryImg5?.length > 0 && (
                  <div className="mt-2">
                    <img
                      src={venueGalleryImg5}
                      alt="uploaded-Logo"
                      height={100}
                      width={100}
                    />
                  </div>
                )}
                {venueGalleryImg6?.length > 0 && (
                  <div className="mt-2">
                    <img
                      src={venueGalleryImg6}
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
                Edit Venue
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default EditVenueContain;
