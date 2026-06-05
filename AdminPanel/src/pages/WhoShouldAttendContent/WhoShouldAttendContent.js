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
import EditWhoShouldAttendContent from "./EditWhoShouldAttendContent";
import DeleteModal from "../../Components/Common/DeleteModal";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Tooltip from "@mui/material/Tooltip";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const WhoShouldAttendContent = () => {
  const navigate = useNavigate();
  const [whoShouldAttendData, setWhoShouldAttendData] = useState([]);
  const [benifits, setBenifits] = useState("");
  const [keyTakeaways, setKeyTakeaways] = useState("");
  const [whoAttend, setWhoAttend] = useState("");
  const [coreAttendeeDes, setCoreAttendeeDes] = useState("");
  const [industriesDes, setIndustriesDes] = useState("");
  const [editWhoShouldAttendModal, setEditWhoShouldAttendModal] =
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
  const whoAttendPermissions = detailedPermissions.WhoShouldAttendPageData || [];
  const canEdit = whoAttendPermissions.includes("edit");

  useEffect(() => {
    callWhoShouldAttendDataApi();
    // eslint-disable-next-line
  }, []);

  const callWhoShouldAttendDataApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(
      `https://www.australia.lithium-downstream-summit.com/admin1/whoshouldattendpagedata`,
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
          setWhoShouldAttendData(data["whoShouldAttendPageData"]);
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
    if (whoShouldAttendData?.length > 0) {
      setBenifits(
        whoShouldAttendData[0]?.sectionFirstPoints?.replace(/^"(.*)"$/, "$1")
      );
      setKeyTakeaways(
        whoShouldAttendData[0]?.sectionSecondPoints?.replace(/^"(.*)"$/, "$1")
      );
      setWhoAttend(
        whoShouldAttendData[0]?.sectionThreeDescription?.replace(/^"(.*)"$/, "$1")
      );
      setCoreAttendeeDes(
        whoShouldAttendData[0]?.sectionThreeTabOneDescription?.replace(/^"(.*)"$/, "$1")
      );
      setIndustriesDes(
        whoShouldAttendData[0]?.sectionThreeTabTwoDescription?.replace(/^"(.*)"$/, "$1")
      );
    }
    // eslint-disable-next-line
  }, [whoShouldAttendData]);

  const toggleEditWhoShouldAttendDataData = useCallback(() => {
    setEditWhoShouldAttendModal(!editWhoShouldAttendModal);
  }, [editWhoShouldAttendModal]);

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
          <BreadCrumb title="Who Should Attend Data" pageTitle="Dashboards" pageLink="/dashboard" />
          <Row>
            <Col lg={12}>
              <Card className="file-manager-content w-100 p-3 pt-0">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0 fs-15">
                        Who Should Attend Data
                      </h5>
                    </div>
                    {/* {permissions?.create && ( */}
                    {canEdit && (
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="btn btn-primary add-btn"
                          id="create-btn"
                          onClick={toggleEditWhoShouldAttendDataData}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Edit
                          Who Should Attend Page Data
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
                        Paragraph-1{" "}
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={benifits}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div>
                      <Label htmlFor="amount-field" className="form-label">
                        Paragraph-2{" "}
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={keyTakeaways}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div>
                      <Label htmlFor="amount-field" className="form-label">
                        Who Should Attend Content{" "}
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={whoAttend}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div>
                      <Label htmlFor="amount-field" className="form-label">
                        Core Attandes Content{" "}
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={coreAttendeeDes}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div>
                      <Label htmlFor="amount-field" className="form-label">
                        Industries & Companies Content{" "}
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={industriesDes}
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

      {editWhoShouldAttendModal ? (
        <EditWhoShouldAttendContent
          editWhoShouldAttendModal={editWhoShouldAttendModal}
          onCloseModal={() => setEditWhoShouldAttendModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callWhoShouldAttendDataApi();
            setEditWhoShouldAttendModal(false);
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
export default WhoShouldAttendContent;
