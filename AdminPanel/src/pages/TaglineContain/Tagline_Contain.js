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
import EditTagline from "./EditTagline_Contain";
// import ViewEventSponsor from "./ViewTagline_Contain";
// import EditEventSponsor from "./EditTagline_Contain";
import DeleteModal from "../../Components/Common/DeleteModal";
import Tooltip from "@mui/material/Tooltip";
import "../../assets/css/ckeditor.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const Tagline_Contain = () => {
  const navigate = useNavigate();
  const [taglineData, setTaglineData] = useState([]);
  console.log("taglineData: ", taglineData);
  const [tagline, setTagline] = useState("");
  console.log("tagline: ", tagline);
  const [taglineDescription, setTaglineDescription] = useState("");
  const [taglineBackImage, setTaglineBackImage] = useState("");
  // const [addEventSponsorModal, setAddEventSponsorModal] = useState(false);
  const [loading, setloading] = useState(true);
  const [editTaglineModal, setEditTaglineModal] = useState(false);
  // const [selectedRow, setselectedRow] = useState();
  // const [selectedViewRow, setselectedViewRow] = useState();
  // const [viewSponsorModal, setViewSponsorModal] = useState(false);
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
  const taglinePermissions = detailedPermissions.eventTagline || [];
  const canEdit = taglinePermissions.includes("edit");

  useEffect(() => {
    callTaglineListApi();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (taglineData.length > 0) {
      setTagline(taglineData[0]?.thirdSectionFirstTitle);
      setTaglineDescription(
        taglineData[0]?.thirdSectionDescription?.replace(/^"(.*)"$/, "$1")
      );
      setTaglineBackImage(taglineData[0]?.thirdSectionBackgroundImage);
    }
    // eslint-disable-next-line
  }, [taglineData]);

  const callTaglineListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/taglinedata`, requestOptions)
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
          setTaglineData(data["taglineData"]);
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
  const toggleEditTagline = useCallback(() => {
    setEditTaglineModal(!editTaglineModal);
  }, [editTaglineModal]);
  // const toggleUser = useCallback(() => {
  //   setAddEventSponsorModal(!addEventSponsorModal);
  // }, [addEventSponsorModal]);

  // const isEditBtnClick = useCallback(
  //   (row) => {
  //     setselectedRow(row);
  //     setEditSponsorModal(true);
  //   },
  //   []
  // );

  // const onClickDelete = (value) => {
  //   setSelectedId(value.id);
  //   setDeleteModal(true);
  // };

  //   const isViewBtnClick = useCallback((row) => {
  //   console.log('View clicked:', row);
  //   setselectedViewRow(row);
  //   setViewSponsorModal(true);
  // }, []);

  // const sponsorCol = useMemo(
  //   () => [
  //     {
  //       id: "eventSponsorId",
  //       header: "Sponsor Name",
  //       accessorKey: "sponsorComapnyName",
  //       filterable: false,
  //     },
  //     {
  //       id: "eventSponsorTypeId",
  //       header: "Sponsor Type",
  //       accessorKey: "sponsorType",
  //       filterable: false,
  //     },
  //     {
  //       id: "eventSponsorWebsiteId",
  //       header: "Sponsor Website",
  //       accessorKey: "sponsorWebsite",
  //       filterable: false,
  //     },
  //     {
  //       header: "Action",
  //       cell: (cellProps) => {
  //         return (
  //           <ul className="list-inline hstack gap-2 mb-0">
  //             <li className="list-inline-item">
  //               <Link
  //                 to="#"
  //                 onClick={() => isViewBtnClick(cellProps.row.original)}
  //                 className="text-primary d-inline-block"
  //               >
  //                 <i className="ri-eye-fill fs-16"></i>
  //               </Link>
  //             </li>
  //             <li className="list-inline-item edit">
  //               <Link
  //                 to="#"
  //                 className="text-primary d-inline-block edit-item-btn"
  //                 onClick={() => isEditBtnClick(cellProps.row.original)}
  //               >
  //                 <i className="ri-pencil-fill fs-16"></i>
  //               </Link>
  //             </li>
  //             <li className="list-inline-item">
  //               <Link
  //                 to="#"
  //                 className="text-danger d-inline-block remove-item-btn"
  //                 onClick={() => onClickDelete(cellProps.row.original)}
  //               >
  //                 <i className="ri-delete-bin-5-fill fs-16"></i>
  //               </Link>
  //             </li>
  //           </ul>
  //         );
  //       },
  //     },
  //   ],
  //   // eslint-disable-next-line
  //   []
  // );

  // const onDeleteButtonClick = (value) => {
  //   if (value) {
  //     const finalData = new FormData();
  //     finalData.append("id", selectedId);
  //     finalData.append("isDelete", "Yes");
  //     const requestOptions = {
  //       method: "POST",
  //       body: finalData,
  //     };
  //     fetch(
  //       'https://www.australia.lithium-downstream-summit.com/admin1/deletesponsor',
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (
  //           data &&
  //           (data.detail === "The Token is expired" ||
  //             data.message === "Invalid token")
  //         ) {
  //           localStorage.clear();
  //           history.push("/logout");
  //         }
  //         if (data.status) {
  //           setDeleteModal(false);
  //           toast.success("Record Deleted Successfully.", {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //           callSponsorListApi();
  //         } else {
  //           toast.error(data.message, {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //           setDeleteModal(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error: ", error);
  //         setloading(false);
  //         setTimeout(() => {
  //           toast.error("There was an error, Please try again later.", {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });
  //         }, 1000);
  //       });
  //   }
  // };

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
          <BreadCrumb title="Tagline Content" pageTitle="Dashboards" pageLink="/dashboard" />
          <Row>
            <Col lg={12}>
              <Card className="file-manager-content w-100 p-3 pt-0">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0 fs-15">
                        Event Tagline Data
                      </h5>
                    </div>
                    {/* {permissions?.create && ( */}
                    {canEdit && (
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="btn btn-primary add-btn"
                          id="create-btn"
                          onClick={toggleEditTagline}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Edit
                          Tagline Data
                        </button>
                      </div>
                    )}
                    {/* )} */}
                  </div>
                </CardHeader>

                <CardBody>
                  <div className="col-md-12">
                    <div>
                      <Label
                        htmlFor="customername-field"
                        className="form-label"
                      >
                        Event Tagline
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Enter Tagline"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                        value={tagline}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div>
                      <Label htmlFor="amount-field" className="form-label">
                        Tagline Description{" "}
                      </Label>
                      <div className="input-group" style={{ width: "100%" }}>
                        <div style={{ width: "100%" }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={taglineDescription}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {taglineBackImage?.length > 0 && (
                      <div className="mt-2">
                        <img
                          src={taglineBackImage}
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

      {editTaglineModal ? (
        <EditTagline
          editTaglineModal={editTaglineModal}
          onCloseModal={() => setEditTaglineModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callTaglineListApi();
            setEditTaglineModal(false);
          }}
        />
      ) : null}

      {/* {viewSponsorModal ? (
        <ViewEventSponsor
          row={selectedViewRow}
          viewSponsorModal={viewSponsorModal}
          onCloseModal={() => setViewSponsorModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callSponsorListApi();
            setViewSponsorModal(false);
          }}
        />
      ) : null}

      {editSponsorModal ? (
        <EditEventSponsor
          row={selectedRow}
          editSponsorModal={editSponsorModal}
          onCloseModal={() => setEditSponsorModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callSponsorListApi();
            setEditSponsorModal(false);
          }}
        />
      ) : null} */}

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
export default Tagline_Contain;
