import React, { useMemo, useCallback, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
  Container,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditVenue from "./EditVenueContain";
import DeleteModal from "../../Components/Common/DeleteModal";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Tooltip from "@mui/material/Tooltip";
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const VenueContain = () => {
  const navigate = useNavigate();
  const [venueData, setVenueData] = useState([]);
  const [venueGalleryData, setVenueGalleryData] = useState([]);
  // const [venuePlace, setVenuePlace] = useState("");
  const [venueDescription, setVenueDescription] = useState("");
  const [venueWebsiteLink, setVenueWebsiteLink] = useState("");
  const [venueGalleryImg1, setVenueGalleryImg1] = useState("");
  const [venueGalleryImg2, setvenueGalleryImg2] = useState("");
  const [venueGalleryImg3, setvenueGalleryImg3] = useState("");
  const [venueGalleryImg4, setvenueGalleryImg4] = useState("");
  const [venueGalleryImg5, setvenueGalleryImg5] = useState("");
  const [venueGalleryImg6, setvenueGalleryImg6] = useState("");
  const [venueLocation, setVenueLocation] = useState("");
  const [venueContact, setVenueContact] = useState("");
  const [venueMapLink, setVenueMapLink] = useState("");
  // const [venueWebAddress, setVenueWebAddress] = useState("");
  const [editVenueModal, setEditVenueModal] = useState(false);
  const [loading, setloading] = useState(true);
  const [selectedRow, setselectedRow] = useState();
  const [selectedViewRow, setselectedViewRow] = useState();
  const [viewSponsorModal, setViewSponsorModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  let color = "#405189";

  const detailedPermissions = JSON.parse(localStorage.getItem("detailed_permissions") || "{}");
  const venuePermissions = detailedPermissions.venuePageData || [];
  const canEdit = venuePermissions.includes("edit");

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
    fetch(`${API_BASE_URL}/admin1/getvenuedata`, requestOptions)
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
    fetch(`${API_BASE_URL}/admin1/venuegalleryimages`, requestOptions)
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

  const toggleEditVenueData = useCallback(() => {
    setEditVenueModal(!editVenueModal);
  }, [editVenueModal]);

  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Venue Content" pageTitle="Dashboards" pageLink="/dashboard" />
          <Row>
            <Col lg={12}>
              <Card className="file-manager-content w-100 p-3 pt-0">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0 fs-15">
                        Event Venue Data
                      </h5>
                    </div>
                    {/* {permissions?.create && ( */}
                    {canEdit && (
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="btn btn-primary add-btn"
                          id="create-btn"
                          onClick={toggleEditVenueData}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Edit
                          Venue Data
                        </button>
                      </div>
                    )}
                    {/* )} */}
                  </div>
                </CardHeader>
                <CardBody>
                  {/* <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Venue Place
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Venue Place"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={venuePlace}
                        disabled
                      />
                    </div>
                  </div> */}
                  <div className="col-md-12">
                    <div>
                      <Label htmlFor="amount-field" className="form-label">
                        Venue Description{" "}
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={venueDescription}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-2">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Venue Location
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={venueLocation}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-2">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Venue Contact
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={venueContact}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-2">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Venue Website
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={venueWebsiteLink}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-2">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Venue Map Link
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={venueMapLink}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Venue Web Showing Address
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Google Map Link"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={venueWebAddress}
                        disabled
                      />
                    </div>
                  </div> */}

                  <div className="mt-2 d-flex">
                    {venueGalleryImg1?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={venueGalleryImg1}
                          alt="uploaded-Logo"
                          height={200}
                          width={200}
                        />
                      </div>
                    )}
                    {venueGalleryImg2?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={venueGalleryImg2}
                          alt="uploaded-Logo"
                          height={200}
                          width={200}
                        />
                      </div>
                    )}
                    {venueGalleryImg3?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={venueGalleryImg3}
                          alt="uploaded-Logo"
                          height={200}
                          width={200}
                        />
                      </div>
                    )}
                    {venueGalleryImg4?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={venueGalleryImg4}
                          alt="uploaded-Logo"
                          height={200}
                          width={200}
                        />
                      </div>
                    )}
                    {venueGalleryImg5?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={venueGalleryImg5}
                          alt="uploaded-Logo"
                          height={200}
                          width={200}
                        />
                      </div>
                    )}
                    {venueGalleryImg6?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={venueGalleryImg6}
                          alt="uploaded-Logo"
                          height={200}
                          width={200}
                        />
                      </div>
                    )}
                  </div>
                  {/* <div className="mt-3">
                    {sponsorList && sponsorList?.length > 0 ? (
                      <TableContainer
                        columns={sponsorCol}
                        data={sponsorList}
                        isGlobalFilter={false}
                        isAddUserList={false}
                        apiCallFunction={callSponsorListApi}
                        customPageSize={10}
                        className="custom-header-css"
                        divClass="table-responsive table-card mb-0"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light"
                        isLeadsFilter={false}
                        SearchPlaceholder="Search for"
                      />
                    ) : (
                      "No Records Found!!"
                    )}
                  </div> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {editVenueModal ? (
        <EditVenue
          editVenueModal={editVenueModal}
          onCloseModal={() => setEditVenueModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callVenueContentListApi();
            callVenueGalleryListApi();
            setEditVenueModal(false);
          }}
        />
      ) : null}

      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => {
          onDeleteButtonClick(true);
        }}
        onCloseClick={() => setDeleteModal(false)}
      />
    </React.Fragment>
  );
};
export default VenueContain;
