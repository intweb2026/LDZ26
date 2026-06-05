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
import AddEventSpeaker from "./AddEventSpeaker";
import ViewEventSpeaker from "./ViewSpeaker";
import EditEventSpeaker from "./EditEventSpeaker";
import DeleteModal from "../../Components/Common/DeleteModal";
import Tooltip from "@mui/material/Tooltip";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const EventSpeakerList = () => {
  const navigate = useNavigate();

  const [addEventSpeakerModal, setAddEventSpeakerModal] = useState(false);
  const [speakerList, setSpeakerList] = useState([]);
  const [loading, setloading] = useState(true);
  const [editSpeakerModal, setEditSpeakerModal] = useState(false);
  const [selectedRow, setselectedRow] = useState();
  const [selectedViewRow, setselectedViewRow] = useState();
  const [viewSpeakerModal, setViewSpeakerModal] = useState(false);
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

  useEffect(() => {
    callSpeakerListApi(limit, offset);
    // eslint-disable-next-line
  }, []);

  const callSpeakerListApi = (limit, offset) => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/eventspeakers`, requestOptions)
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
          setSpeakerList(data["eventSpeakersList"]);
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
    setAddEventSpeakerModal(!addEventSpeakerModal);
  }, [addEventSpeakerModal]);

  const isEditBtnClick = useCallback(
    (row) => {
      setselectedRow(row);
      setEditSpeakerModal(true);
    },
    []
  );

  const onClickDelete = (value) => {
    setSelectedId(value.id);
    setDeleteModal(true);
  };

  const isViewBtnClick = useCallback((row) => {
    console.log('View clicked:', row);
    setselectedViewRow(row);
    setViewSpeakerModal(true);
  }, []);

  const speakerCol = useMemo(
    () => [
      {
        id: "eventSpeakerId",
        header: "Speaker Name",
        accessorKey: "eventSpeakerName",
        filterable: false,
      },
      {
        id: "companyId",
        header: "Company",
        accessorKey: "eventSpeakerCompany",
        filterable: false,
      },
      {
        id: "eventSpeakerLinkedinFollowers",
        header: "Linkedin Followers",
        accessorKey: "eventSpeakerLinkedinFollowers",
        filterable: false,
      },

      // {
      //   id: "action",
      //   header: "Action",
      //   Cell: (cellProps) => {
      //     return (
      //       <ul className="list-inline hstack gap-2 mb-0">
      //         <li className="list-inline-item edit">
      //           <Tooltip title={"View"} placement="left" arrow>
      //             <Link
      //               to="#"
      //               // onClick={() => isViewBtnClick(cellProps.row.original)}
      //               className="text-primary d-inline-block edit-item-btn"
      //             >
      //               <i className="ri-eye-fill fs-16"></i>
      //             </Link>
      //           </Tooltip>
      //         </li>

      //           <li className="list-inline-item edit">
      //             <Tooltip title={"Edit"} placement="left" arrow>
      //               <Link
      //                 // to="#"
      //                 // onClick={() => isEditBtnClick(cellProps.row.original)}
      //                 className="text-primary d-inline-block edit-item-btn"
      //               >
      //                 <i className="ri-pencil-fill fs-16"></i>
      //               </Link>
      //             </Tooltip>
      //           </li>


      //           <li className="list-inline-item">
      //             <Tooltip title={"Delete"} placement="right" arrow>
      //               <Link
      //                 to="#"
      //                 className="text-danger d-inline-block remove-item-btn"
      //                 // onClick={() => onClickDelete(cellProps.row.original)}
      //               >
      //                 <i className="ri-delete-bin-5-fill fs-16"></i>
      //               </Link>
      //             </Tooltip>
      //           </li>

      //       </ul>
      //     );
      //   },
      // },
      {
        header: "Action",
        cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Link
                  to="#"
                  onClick={() => isViewBtnClick(cellProps.row.original)}
                  className="text-primary d-inline-block"
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item edit">
                <Link
                  to="#"
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={() => isEditBtnClick(cellProps.row.original)}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => onClickDelete(cellProps.row.original)}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    // eslint-disable-next-line
    []
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
        'https://www.australia.lithium-downstream-summit.com/admin1/deleteeventspeakers',
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
            callSpeakerListApi();
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
          <BreadCrumb title="Event Speakers" pageTitle="Dashboards" pageLink="/dashboard" />
          <Row>
            <Col lg={12}>
              <Card className="file-manager-content w-100 p-3 pt-0">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0 fs-15">
                        Event Speaker List
                      </h5>
                    </div>
                    {/* {permissions?.create && ( */}
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="btn btn-primary add-btn"
                        id="create-btn"
                        onClick={toggleUser}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                        Speaker
                      </button>
                    </div>
                    {/* )} */}
                  </div>
                </CardHeader>
                <CardBody className="bg-soft-light border border-dashed border-start-0 border-end-0">
                  <Form>
                    <Row className="g-3">
                      <Col md={3}>
                        <div className="search-box">
                          <Input
                            type="text"
                            className="form-control search bg-light border-light"
                            placeholder="Search for Speaker Name..."
                            name="name"
                          // value={query?.name}
                          // onChange={(e) => {
                          //   setQuery({ ...query, name: e.target.value });
                          // }}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="search-box">
                          <Input
                            type="number"
                            className="form-control search bg-light border-light"
                            placeholder="Search for Speaker Mobile..."
                            name="name"
                          // value={query?.mobileNo}
                          // onChange={(e) => {
                          //   setQuery({ ...query, mobileNo: e.target.value });
                          // }}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col md={3} sm={3}>
                        <button
                          type="button"
                          className="btn-success btn"
                          id="create-btn"
                        // onClick={() => {
                        //   handleSubmitFilter(10, 0, query);
                        //   setLimit(10);
                        //   setOffset(0);
                        // }}
                        >
                          <i className="ri-equalizer-fill me-1 align-bottom"></i>
                          Filter
                        </button>
                        <button
                          type="button"
                          className="btn-primary btn mx-2"
                          id="create-btn"
                        // onClick={() => {
                        //   setQuery({
                        //     name: "",
                        //     mobileNo: "",
                        //     email: "",
                        //   });
                        //   callCustomerListApi(10, 0);
                        //   setLimit(10);
                        //   setOffset(0);
                        // }}
                        >
                          <i className="ri-chat-delete-line me-1 align-bottom"></i>
                          Clear
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardBody>
                  <div className="mt-3">
                    {speakerList && speakerList?.length > 0 ? (
                      <TableContainer
                        columns={speakerCol}
                        data={speakerList}
                        isGlobalFilter={false}
                        isAddUserList={false}
                        apiCallFunction={callSpeakerListApi}
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

      {addEventSpeakerModal ? (
        <AddEventSpeaker
          addEventSpeakerModal={addEventSpeakerModal}
          onCloseModal={() => setAddEventSpeakerModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callSpeakerListApi();
            setAddEventSpeakerModal(false);
          }}
        />
      ) : null}

      {viewSpeakerModal ? (
        <ViewEventSpeaker
          row={selectedViewRow}
          viewSpeakerModal={viewSpeakerModal}
          onCloseModal={() => setViewSpeakerModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callSpeakerListApi();
            setViewSpeakerModal(false);
          }}
        />
      ) : null}

      {editSpeakerModal ? (
        <EditEventSpeaker
          row={selectedRow}
          editSpeakerModal={editSpeakerModal}
          onCloseModal={() => setEditSpeakerModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callSpeakerListApi();
            setEditSpeakerModal(false);
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

export default EventSpeakerList;
