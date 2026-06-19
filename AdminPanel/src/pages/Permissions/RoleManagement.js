import React, { useState, useEffect, useMemo } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Input,
    FormFeedback,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../../config/apiConfig';

const RoleManagement = () => {
    document.title = "Role Management | Admin Panel";
    const navigate = useNavigate();

    const [roleList, setRoleList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const detailedPermissions = JSON.parse(localStorage.getItem("detailed_permissions") || "{}");
    const rolePermissions = detailedPermissions.roleManagement || [];
    const canAdd = rolePermissions.includes("add");
    const canEdit = rolePermissions.includes("edit");
    const canDelete = rolePermissions.includes("delete");

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = () => {
        setLoading(true);
        fetch(`${API_BASE_URL}/admin1/rolelist`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setRoleList(data.roleList);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    const toggle = () => setModal(!modal);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Role Name"),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            fetch(`${API_BASE_URL}/admin1/addrole`, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        toast.success("Role created successfully");
                        validation.resetForm();
                        toggle();
                        fetchRoles();
                    } else {
                        toast.error(data.message);
                    }
                });
        },
    });

    const handleDeleteRole = (id) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            fetch(`${API_BASE_URL}/admin1/deleterole`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        toast.success("Role deleted successfully");
                        fetchRoles();
                    } else {
                        toast.error(data.message);
                    }
                });
        }
    };

    const columns = useMemo(
        () => [
            {
                header: "ID",
                accessorKey: "id",
            },
            {
                header: "Role Name",
                accessorKey: "name",
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
                                    onClick={() => navigate(`/apps-roles/edit/${cellProps.row.original.id}`)}
                                >
                                    Perms
                                </Button>
                            )}
                            {canDelete && (
                                <Button
                                    color="danger"
                                    size="sm"
                                    onClick={() => handleDeleteRole(cellProps.row.original.id)}
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
                    <BreadCrumb title="Role Management" pageTitle="Dashboards" pageLink="/dashboard" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <div className="d-flex align-items-center">
                                        <h5 className="card-title mb-0 flex-grow-1">Role List</h5>
                                        {canAdd && (
                                            <Button color="success" onClick={toggle}>
                                                Add Role
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <TableContainer
                                        columns={columns}
                                        data={roleList}
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

                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>Add New Role</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                        }}>
                            <div className="mb-3">
                                <Label htmlFor="name" className="form-label">Role Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="Enter Role Name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name || ""}
                                    invalid={validation.touched.name && validation.errors.name ? true : false}
                                />
                                {validation.touched.name && validation.errors.name ? (
                                    <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                ) : null}
                            </div>
                            <div className="text-end">
                                <Button color="success" type="submit">Create Role</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
                <ToastContainer />
            </div>
        </React.Fragment>
    );
};

export default RoleManagement;
