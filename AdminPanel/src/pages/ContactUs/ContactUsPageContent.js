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
import EditContactUsPageContent from "./EditContactUsPageContent";
import DeleteModal from "../../Components/Common/DeleteModal";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Tooltip from "@mui/material/Tooltip";
import EditSpeakerPageContent from "../SpeakerPageContent/EditSpeakerPageContent";
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const ContactUsPageContent = () => {
  const navigate = useNavigate();
  const [contactUsPageData, setContactUsPageData] = useState([]);
  const [emailDes, setEmailDes] = useState("");
  const [editContactUsDataModal, setEditContactUsDataModal] =
    useState(false);
  const [loading, setloading] = useState(true);
  const [selectedRow, setselectedRow] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  let color = "#405189";

  const detailedPermissions = JSON.parse(localStorage.getItem("detailed_permissions") || "{}");
  const contactPermissions = detailedPermissions.contactUsPageData || [];
  const canEdit = contactPermissions.includes("edit");

  useEffect(() => {
    callContactUsPageDataApi();
    // eslint-disable-next-line
  }, []);

  const callContactUsPageDataApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(
      `${API_BASE_URL}/admin1/contactusstaticdata`,
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
          setContactUsPageData(data["contatusPageStaticData"]);
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
    if (contactUsPageData?.length > 0) {
      setEmailDes(
        contactUsPageData[0]?.sectionShortParagraph?.replace(/^"(.*)"$/, "$1")
      );
    }
    // eslint-disable-next-line
  }, [contactUsPageData]);

  const toggleEditContactUsPageData = useCallback(() => {
    setEditContactUsDataModal(!editContactUsDataModal);
  }, [editContactUsDataModal]);

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
          <BreadCrumb title="Contact Us Page Data" pageTitle="Dashboards" pageLink="/dashboard" />
          <Row>
            <Col lg={12}>
              <Card className="file-manager-content w-100 p-3 pt-0">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0 fs-15">
                        Contact Us Page Data
                      </h5>
                    </div>
                    {/* {permissions?.create && ( */}
                    {canEdit && (
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="btn btn-primary add-btn"
                          id="create-btn"
                          onClick={toggleEditContactUsPageData}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Edit
                          Contact Us Page Data
                        </button>
                      </div>
                    )}
                    {/* )} */}
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="col-md-12">
                    <div>
                      <Label htmlFor="amount-field" className="form-label">
                        Email Us Description{" "}
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={emailDes}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {editContactUsDataModal ? (
        <EditContactUsPageContent
          editContactUsDataModal={editContactUsDataModal}
          onCloseModal={() => setEditContactUsDataModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callContactUsPageDataApi();
            setEditContactUsDataModal(false);
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
export default ContactUsPageContent;
