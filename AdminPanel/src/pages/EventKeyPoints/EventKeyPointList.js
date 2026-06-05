import React, { useMemo, useCallback, useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row, Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../Components/Common/DeleteModal";
import AddEventKeyPoint from "./AddEventKeyPoint";
import ViewEventKeyPoint from "./ViewEventKeyPoint";
import EditEventKeyPoint from "./EditEventKeyPoint";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const EventKeyPointList = () => {
  const navigate = useNavigate();

  const [keyPointList, setKeyPointList] = useState([]);
  const [addEventKeyPointModal, setAddEventKeyPointModal] = useState(false);
  const [loading, setloading] = useState(true);
  const [editEventKeyPointModal, setEditEventKeyPointModal] = useState(false);
  const [selectedRow, setselectedRow] = useState();
  const [selectedViewRow, setselectedViewRow] = useState();
  const [viewEventKeyPointModal, setViewEventKeyPointModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  let color = "#405189";

  useEffect(() => {
    callEventKeyPointListApi();
    // eslint-disable-next-line
  }, []);

  const callEventKeyPointListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/eventkeypoints`, requestOptions)
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
          setKeyPointList(data["keyPointsList"]);
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
    setAddEventKeyPointModal(!addEventKeyPointModal);
  }, [addEventKeyPointModal]);

  const isEditBtnClick = useCallback((row) => {
    setselectedRow(row);
    setEditEventKeyPointModal(true);
  }, []);

  const onClickDelete = (value) => {
    setSelectedId(value.id);
    setDeleteModal(true);
  };

  const isViewBtnClick = useCallback((row) => {
    console.log("View clicked:", row);
    setselectedViewRow(row);
    setViewEventKeyPointModal(true);
  }, []);

  const keyPointCol = useMemo(
    () => [
      {
        id: "keyId",
        header: "Topic",
        accessorKey: "pointLabel",
        filterable: false,
      },
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
      fetch("https://www.australia.lithium-downstream-summit.com/admin1/deletekeypoint", requestOptions)
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
            callEventKeyPointListApi();
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
          <BreadCrumb title="Event Key Topics" pageTitle="Dashboards" pageLink="/dashboard" />
          <Row>
            <Col lg={12}>
              <Card className="file-manager-content w-100 p-3 pt-0">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0 fs-15">
                        Event Key Topics List
                      </h5>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="btn btn-primary add-btn"
                        id="create-btn"
                        onClick={toggleUser}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                        Key Topic
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="mt-3">
                    {keyPointList && keyPointList?.length > 0 ? (
                      <TableContainer
                        columns={keyPointCol}
                        data={keyPointList}
                        isGlobalFilter={false}
                        isAddUserList={false}
                        apiCallFunction={callEventKeyPointListApi}
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

      {addEventKeyPointModal ? (
        <AddEventKeyPoint
          addEventKeyPointModal={addEventKeyPointModal}
          onCloseModal={() => setAddEventKeyPointModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callEventKeyPointListApi();
            setAddEventKeyPointModal(false);
          }}
        />
      ) : null}

      {viewEventKeyPointModal ? (
        <ViewEventKeyPoint
          row={selectedViewRow}
          viewEventKeyPointModal={viewEventKeyPointModal}
          onCloseModal={() => setViewEventKeyPointModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callEventKeyPointListApi();
            setViewEventKeyPointModal(false);
          }}
        />
      ) : null}

      {editEventKeyPointModal ? (
        <EditEventKeyPoint
          row={selectedRow}
          editEventKeyPointModal={editEventKeyPointModal}
          onCloseModal={() => setEditEventKeyPointModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callEventKeyPointListApi();
            setEditEventKeyPointModal(false);
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
export default EventKeyPointList;
