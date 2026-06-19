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
import DeleteModal from "../../Components/Common/DeleteModal";
import Tooltip from "@mui/material/Tooltip";
import API_BASE_URL from '../../config/apiConfig';
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;


const AgendaList = () => {
  const navigate = useNavigate();

  const [agendaList, setAgendaList] = useState([]);
  const [loading, setloading] = useState(true);
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

  useEffect(() => {
    callAgendaListApi();
    // eslint-disable-next-line
  }, []);

  const handleEdit = useCallback((row) => {
    navigate("/editagenda", { state: row });
  }, [navigate]);

  const callAgendaListApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`${API_BASE_URL}/admin1/getagenda`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (
          data &&
          (data.detail === "The Token is expired" ||
            data.message === "Invalid token")
        ) {
          localStorage.clear();
          navigate("/logout");
        } else if (data && data.status !== false) {
          // DRF response might be direct array or status wrapped
          setAgendaList(data.agendaList || data);
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
  const onClickDelete = (value) => {
    setSelectedId(value.id);
    setDeleteModal(true);
  };

  const agendaCol = useMemo(
    () => [
      {
        id: "sortOrderId",
        header: "Sort Order",
        accessorKey: "sortOrder",
        filterable: false,
      },
      {
        id: "dayId",
        header: "Day",
        accessorKey: "day",
        filterable: false,
      },
      {
        id: "statusId",
        header: "Status",
        accessorKey: "status",
        filterable: false,
      },
      {
        id: "headingId",
        header: "Heading",
        accessorKey: "heading",
        filterable: false,
      },
      {
        id: "startTime",
        header: "Start Time",
        accessorKey: "startTime",
        filterable: false,
        cell: (cellProps) => {
          return cellProps.row.original.status === "Day" ? "" : cellProps.getValue();
        },
      },
      {
        id: "endTime",
        header: "End Time",
        accessorKey: "endTime",
        filterable: false,
        cell: (cellProps) => {
          return cellProps.row.original.status === "Day" ? "" : cellProps.getValue();
        },
      },
      {
        header: "Action",
        cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item edit">
                <Link
                  to="#"
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={(e) => {
                    e.preventDefault(); // Add this to prevent default link behavior
                    handleEdit(cellProps.row.original);
                  }}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={(e) => {
                    e.preventDefault(); // Add this too
                    onClickDelete(cellProps.row.original);
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleEdit, onClickDelete] // ⚠️ CHANGE THIS - Remove eslint-disable and add dependencies!
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
      fetch(`${API_BASE_URL}/admin1/deleteagenda`, requestOptions)
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
          if (data.status === true || (data.status !== false && data.message === "Deleted successfully")) {
            setDeleteModal(false);
            toast.success(data.message || "Record Deleted Successfully.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            callAgendaListApi();
          } else {
            toast.error(data.message || data.error || "Failed to delete record", {
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(agendaList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update sortOrder visually for all items (Zero-indexed)
    const updatedItems = items.map((item, index) => ({
      ...item,
      sortOrder: index,
    }));

    setAgendaList(updatedItems);

    // Call API to persist reorder
    const requestData = {
      items: updatedItems.map((item) => ({
        id: item.id,
        sortOrder: item.sortOrder // Include updated sortOrder in API call
      })),
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    };

    fetch(`${API_BASE_URL}/admin1/reorder-agenda`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === false) {
          toast.error(data.message || "Failed to reorder items");
          // Optionally revert state if API fails
          callAgendaListApi();
        } else {
          toast.success("Items reordered successfully");
        }
      })
      .catch((error) => {
        console.error("Error reordering items:", error);
        toast.error("An error occurred while reordering");
        callAgendaListApi(); // Revert to server state on error
      });
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
          <BreadCrumb title="Agenda List" pageTitle="Dashboards" pageLink="/dashboard" />
          <Row>
            <Col lg={12}>
              <Card className="file-manager-content w-100 p-3 pt-0">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0 fs-15">Agenda List</h5>
                    </div>
                    {/* {permissions?.create && ( */}
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="btn btn-primary add-btn"
                        id="create-btn"
                        onClick={() => navigate("/addagenda")}
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                        Agenda Item
                      </button>
                    </div>
                    {/* )} */}
                  </div>
                </CardHeader>

                <CardBody>
                  <div className="mt-3">
                    {agendaList && agendaList?.length > 0 ? (
                      <TableContainer
                        columns={agendaCol}
                        data={agendaList}
                        isGlobalFilter={false}
                        isAddUserList={false}
                        apiCallFunction={callAgendaListApi}
                        customPageSize={80}
                        className="custom-header-css"
                        divClass="table-responsive table-card mb-0"
                        tableClass="align-middle table-nowrap"
                        theadClass="table-light"
                        isLeadsFilter={false}
                        SearchPlaceholder="Search for"
                        isRowDnD={true}
                        onDragEnd={handleDragEnd}
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
export default AgendaList;
