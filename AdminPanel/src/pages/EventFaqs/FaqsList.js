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
import AddFaq from "./AddFaq";
import EditFaq from "./EditFaq";
import DeleteModal from "../../Components/Common/DeleteModal";
import Tooltip from "@mui/material/Tooltip";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const FaqsList = () => {
  const navigate = useNavigate();

  const [faqList, setFaqList] = useState([]);
  const [addFaqModal, setAddFaqModal] = useState(false);
  const [loading, setloading] = useState(true);
  const [editFaqModal, setEditFaqModal] = useState(false);
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
    callFaqApi();
    // eslint-disable-next-line
  }, []);

  const callFaqApi = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
    };
    fetch(`https://www.australia.lithium-downstream-summit.com/admin1/eventfaqs`, requestOptions)
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
          setFaqList(data["faqsList"]);
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
    setAddFaqModal(!addFaqModal);
  }, [addFaqModal]);

  const isEditBtnClick = useCallback((row) => {
    setselectedRow(row);
    setEditFaqModal(true);
  }, []);

  const onClickDelete = (value) => {
    setSelectedId(value.id);
    setDeleteModal(true);
  };

  // const faqCol = useMemo(
  //   () => [
  //     {
  //       id: "titleId",
  //       header: "Question",
  //       accessorKey: "faqQuestion",
  //       filterable: false,
  //     },
  //     {
  //       id: "answerId",
  //       header: "Answer",
  //       accessorKey: "faqAnswer",
  //       filterable: false,
  //       cell: (cellProps) => {
  //         const faqAnswer = cellProps.row.original.faqAnswer;
  //         return (
  //           <div
  //             className="faq-answer-cell"
  //             style={{
  //               maxWidth: "800px",
  //               wordWrap: "break-word",
  //               whiteSpace: "normal",
  //               lineHeight: "1.4",
  //             }}
  //             dangerouslySetInnerHTML={{
  //               __html: faqAnswer?.replace(/^"(.*)"$/, "$1") || "",
  //             }}
  //           />
  //         );
  //       },
  //     },
  //     {
  //       header: "Action",
  //       cell: (cellProps) => {
  //         return (
  //           <ul className="list-inline hstack gap-2 mb-0">
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

  const faqCol = useMemo(
    () => [
      {
        id: "titleId",
        header: "Question",
        accessorKey: "faqQuestion",
        filterable: false,
      },
      {
        id: "answerId",
        header: "Answer",
        accessorKey: "faqAnswer",
        filterable: false,
        cell: (cellProps) => {
          const faqAnswer = cellProps.row.original.faqAnswer;

          // Clean the HTML content
          const cleanHtml = (html) => {
            if (!html) return "";

            // Remove outer quotes and unescape HTML
            let cleaned = html.replace(/^"(.*)"$/, "$1");

            // Unescape quotes
            cleaned = cleaned.replace(/\\"/g, '"');

            // Ensure all external links have proper attributes
            cleaned = cleaned.replace(
              /<a\s+href=["']([^"']+)["'][^>]*>/gi,
              (match, url) => {
                // Check if URL is external (starts with http/https)
                if (url.startsWith('http://') || url.startsWith('https://')) {
                  return `<a href="${url}" target="_blank" rel="noopener noreferrer">`;
                }
                return match;
              }
            );

            return cleaned;
          };

          return (
            <div
              className="faq-answer-cell"
              style={{
                maxWidth: "800px",
                wordWrap: "break-word",
                whiteSpace: "normal",
                lineHeight: "1.4",
              }}
              dangerouslySetInnerHTML={{
                __html: cleanHtml(faqAnswer),
              }}
            />
          );
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
      fetch("https://www.australia.lithium-downstream-summit.com/admin1/deletefaq", requestOptions)
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
            callFaqApi();
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
          <BreadCrumb title="Faqs" pageTitle="Dashboards" pageLink="/dashboard" />
          <Row>
            <Col lg={12}>
              <Card className="file-manager-content w-100 p-3 pt-0">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0 fs-15">Faqs</h5>
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
                        Faq
                      </button>
                    </div>
                    {/* )} */}
                  </div>
                </CardHeader>

                <CardBody>
                  <div className="mt-3">
                    {faqList && faqList?.length > 0 ? (
                      <TableContainer
                        columns={faqCol}
                        data={faqList}
                        isGlobalFilter={false}
                        isAddUserList={false}
                        apiCallFunction={callFaqApi}
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

      {addFaqModal ? (
        <AddFaq
          addFaqModal={addFaqModal}
          onCloseModal={() => setAddFaqModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callFaqApi();
            setAddFaqModal(false);
          }}
        />
      ) : null}

      {editFaqModal ? (
        <EditFaq
          row={selectedRow}
          editFaqModal={editFaqModal}
          onCloseModal={() => setEditFaqModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            callFaqApi();
            setEditFaqModal(false);
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
export default FaqsList;
