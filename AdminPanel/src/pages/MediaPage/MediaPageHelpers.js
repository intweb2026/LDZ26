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
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddMediaPageHelper from "./AddMediaPageHelper";
import EditMediaPageHelper from "./EditMediaPageHelper";
import DeleteModal from "../../Components/Common/DeleteModal";
import Tooltip from "@mui/material/Tooltip";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const MediaPageHelpers = () => {
  const navigate = useNavigate();

  const [mediaPageHelpersList, setMediaPageHelpersList] = useState([]);
  const [addMediaHelperModal, setAddMediaHelperModal] = useState(false);
  const [loading, setloading] = useState(true);
  const [editMediaHelperModal, setEditMediaHelperModal] = useState(false);
  const [selectedRow, setselectedRow] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  // const [query, setQuery] = useState({
  //   name: "",
  //   mobileNo: "",
  //   email: "",
  // });
  let color = "#405189";

  // const authUser = JSON.parse(localStorage.getItem("authUser"));
  // let sidebarData = authUser?.permission;

  // let permissions = sidebarData?.find(
  //   (er) => er?.subModuleDetails?.path === "/customerlist"
  // );

  // let initialState = {};

  // if (!permissions?.edit && !permissions?.delete) {
  //   initialState.hiddenColumns = ["Action"];
  // }

  const detailedPermissions = JSON.parse(localStorage.getItem("detailed_permissions") || "{}");
  const mediaPermissions = detailedPermissions.mediaPageData || [];
  const canAdd = mediaPermissions.includes("add");
  const canEdit = mediaPermissions.includes("edit");
  const canDelete = mediaPermissions.includes("delete");

  useEffect(() => {
    callMediaHelperListApi();
    // eslint-disable-next-line
  }, []);

  const callMediaHelperListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/mediapagehelpers`, requestOptions)
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
          setMediaPageHelpersList(data["mediaPageHelpers"]);
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

  const toggleUser = useCallback(() => {
    setAddMediaHelperModal(!addMediaHelperModal);
  }, [addMediaHelperModal]);

  const isEditBtnClick = useCallback((row) => {
    setselectedRow(row);
    setEditMediaHelperModal(true);
  }, []);

  const onClickDelete = (value) => {
    setSelectedId(value.id);
    setDeleteModal(true);
  };

  const mediaHelperCol = useMemo(
    () => [
      {
        id: "mediahelperNameId",
        header: "Company Person Name",
        accessorKey: "companyPersonName",
        filterable: false,
      },
      {
        id: "helperemailId",
        header: "Email",
        accessorKey: "companyPersonEmail",
        filterable: false,
      },
      {
        id: "phoneId",
        header: "Phone",
        accessorKey: "companyPersonPhone",
        filterable: false,
      },
      {
        header: "Action",
        cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              {canEdit && (
                <li className="list-inline-item edit">
                  <Link
                    to="#"
                    className="text-primary d-inline-block edit-item-btn"
                    onClick={() => isEditBtnClick(cellProps.row.original)}
                  >
                    <i className="ri-pencil-fill fs-16"></i>
                  </Link>
                </li>
              )}
              {canDelete && (
                <li className="list-inline-item">
                  <Link
                    to="#"
                    className="text-danger d-inline-block remove-item-btn"
                    onClick={() => onClickDelete(cellProps.row.original)}
                  >
                    <i className="ri-delete-bin-5-fill fs-16"></i>
                  </Link>
                </li>
              )}
            </ul>
          );
        },
      },
    ],
    // eslint-disable-next-line
    [canEdit, canDelete]
  );

  const onDeleteButtonClick = (value) => {
    if (value) {
      const finalData = new FormData();
      finalData.append("id", selectedId);
      finalData.append("isDelete", "Yes");
      const requestOptions = {
        method: "POST",
        body: finalData,
      };
      fetch(
        "https://www.australia.lithium-downstream-summit.com/admin1/deletemediapagehelpers",
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
            history.push("/logout");
          }
          if (data.status) {
            setDeleteModal(false);
            toast.success("Record Deleted Successfully.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            callMediaHelperListApi();
          } else {
            toast.error(data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setDeleteModal(false);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
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
    }
  };

  // const handleSubmitFilter = (limit, offset, query) => {
  //   setloading(true);
  //   const token = localStorage.getItem("accessToken");
  //   const authUser = localStorage.getItem("authUser");
  //   let client = JSON.parse(authUser);

  //   let formData = new FormData();

  //   if (query?.name) {
  //     formData.append("customerName", query?.name || "");
  //   }

  //   if (query?.mobileNo) {
  //     formData.append("customerMobile", query?.mobileNo || "");
  //   }

  //   formData.append("clientId", client?.client?.client_id || "");

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Token ${token}`,
  //     },
  //     body: formData,
  //   };
  //   fetch(
  //     `https://api.k9interior.com/customer/customerfilter?clientId=${client?.client?.client_id}&limit=${limit}&offset=${offset}`,
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (
  //         data &&
  //         (data.detail === "The Token is expired" ||
  //           data.message === "Invalid token")
  //       ) {
  //         localStorage.clear();
  //         history.push("/logout");
  //       }
  //       if (data && data.status) {
  //         setCustomerList(data["customerList"]);
  //         setTotalCount(data?.paginationDetails?.count);
  //       }
  //       setloading(false);
  //     })
  //     .catch((error) => {
  //       setloading(false);
  //       setTimeout(() => {
  //         toast.error("There was an error, Please try again later.", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       }, 1000);
  //     });
  // };

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
          <BreadCrumb
            title="Media Page Company Persons"
            pageTitle="Dashboards"
            pageLink="/dashboard"
          />
          <Row>
            <Col lg={12}>
              <Card className="file-manager-content w-100 p-3 pt-0">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0 fs-15">
                        Media Page Company Persons List
                      </h5>
                    </div>
                    {/* {permissions?.create && ( */}
                    {canAdd && (
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="btn btn-primary add-btn"
                          id="create-btn"
                          onClick={toggleUser}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Company Person
                        </button>
                      </div>
                    )}
                    {/* )} */}
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="mt-3">
                    {mediaPageHelpersList &&
                      mediaPageHelpersList?.length > 0 ? (
                      <TableContainer
                        columns={mediaHelperCol}
                        data={mediaPageHelpersList}
                        isGlobalFilter={false}
                        isAddUserList={false}
                        apiCallFunction={callMediaHelperListApi}
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
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {addMediaHelperModal ? (
        <AddMediaPageHelper
          addMediaHelperModal={addMediaHelperModal}
          onCloseModal={() => setAddMediaHelperModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callMediaHelperListApi();
            setAddMediaHelperModal(false);
          }}
        />
      ) : null}

      {editMediaHelperModal ? (
        <EditMediaPageHelper
          row={selectedRow}
          editMediaHelperModal={editMediaHelperModal}
          onCloseModal={() => setEditMediaHelperModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callMediaHelperListApi();
            setEditMediaHelperModal(false);
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
export default MediaPageHelpers;
