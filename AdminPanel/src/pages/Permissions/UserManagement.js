import React, { useState, useEffect, useMemo } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { toast, ToastContainer } from "react-toastify";
import AddUserModal from "./AddUserModal";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
    document.title = "User Management | Admin Panel";
    const navigate = useNavigate();

    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAddUserModal, setIsAddUserModal] = useState(false);

    const detailedPermissions = JSON.parse(localStorage.getItem("detailed_permissions") || "{}");
    const userPermissions = detailedPermissions.userManagement || [];
    const canAdd = userPermissions.includes("add");
    const canEdit = userPermissions.includes("edit");
    const canDelete = userPermissions.includes("delete");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setLoading(true);
        fetch("https://www.australia.lithium-downstream-summit.com/admin1/userlist")
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setUserList(data.userList);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    const toggleAddUserModal = () => setIsAddUserModal(!isAddUserModal);

    const handleEditPermissions = (user) => {
        navigate(`/apps-permissions/edit/${user.id}`);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            fetch("https://www.australia.lithium-downstream-summit.com/admin1/deleteuser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        toast.success("User deleted successfully");
                        fetchUsers();
                    } else {
                        toast.error(data.message);
                    }
                });
        }
    };

    const columns = useMemo(
        () => [
            {
                header: "Username",
                accessorKey: "username",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: (cell) => (
                    <span className={`badge bg-${cell.getValue() ? "success" : "danger"}-subtle text-${cell.getValue() ? "success" : "danger"}`}>
                        {cell.getValue() ? "Active" : "Inactive"}
                    </span>
                ),
            },
            {
                header: "Role",
                accessorKey: "role",
            },

            {
                header: "Permissions",
                accessorKey: "permissions",
                cell: (cell) => (
                    <div className="d-flex flex-wrap gap-1">
                        {cell.getValue().map((p, i) => (
                            <span key={i} className="badge bg-info-subtle text-info">
                                {p}
                            </span>
                        ))}
                    </div>
                ),
            },
            {
                header: "Action",
                cell: (cellProps) => {
                    return (
                        <div className="hstack gap-2">
                            {canEdit && (
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => handleEditPermissions(cellProps.row.original)}
                                >
                                    Perms
                                </Button>
                            )}
                            {canDelete && (
                                <Button
                                    color="danger"
                                    size="sm"
                                    onClick={() => handleDeleteUser(cellProps.row.original.id)}
                                >
                                    Delete
                                </Button>
                            )}
                        </div>
                    );
                },
            },
        ],
        [canEdit, canDelete]
    );

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="User Management" pageTitle="Dashboards" pageLink="/dashboard" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">User List</h5>
                                        {canAdd && (
                                            <Button color="success" onClick={toggleAddUserModal}>
                                                Add User
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <TableContainer
                                        columns={columns}
                                        data={userList}
                                        isGlobalFilter={true}
                                        customPageSize={10}
                                        divClass="table-responsive table-card"
                                        tableClass="align-middle table-nowrap"
                                        theadClass="table-light"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <AddUserModal
                    show={isAddUserModal}
                    onCloseClick={toggleAddUserModal}
                    onSuccess={() => {
                        toggleAddUserModal();
                        fetchUsers();
                    }}
                />
                <ToastContainer />
            </div>
        </React.Fragment>
    );
};

export default UserManagement;
