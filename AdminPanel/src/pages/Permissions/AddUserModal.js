import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Row,
    Col,
    Label,
    Input,
    FormFeedback,
    Button,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import API_BASE_URL from '../../config/apiConfig';

const AddUserModal = ({ show, onCloseClick, onSuccess }) => {
    const [roleList, setRoleList] = useState([]);

    useEffect(() => {
        if (show) {
            fetchRoles();
        }
    }, [show]);

    const fetchRoles = () => {
        fetch(`${API_BASE_URL}/admin1/rolelist`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setRoleList(data.roleList);
                }
            })
            .catch((err) => console.error(err));
    };

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
            email: "",
            password: "",
            role_id: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Please Enter Username"),
            email: Yup.string().email().required("Please Enter Email"),
            password: Yup.string().required("Please Enter Password").min(6, "Password must be at least 6 characters"),
            role_id: Yup.string().required("Please Select Role"),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("username", values.username);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("role_id", values.role_id);

            fetch(`${API_BASE_URL}/admin1/adduser`, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status) {
                        toast.success("User created successfully");
                        validation.resetForm();
                        onSuccess();
                    } else {
                        toast.error(data.message || "Failed to create user");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Error creating user");
                });
        },
    });

    return (
        <Modal isOpen={show} toggle={onCloseClick} centered>
            <ModalHeader toggle={onCloseClick}>Add New User</ModalHeader>
            <ModalBody>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                    }}
                >
                    <Row>
                        <Col lg={12}>
                            <div className="mb-3">
                                <Label htmlFor="username" className="form-label">
                                    Username
                                </Label>
                                <Input
                                    name="username"
                                    type="text"
                                    placeholder="Enter Username"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.username || ""}
                                    invalid={
                                        validation.touched.username && validation.errors.username ? true : false
                                    }
                                />
                                {validation.touched.username && validation.errors.username ? (
                                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="email" className="form-label">
                                    Email
                                </Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Enter Email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email || ""}
                                    invalid={
                                        validation.touched.email && validation.errors.email ? true : false
                                    }
                                />
                                {validation.touched.email && validation.errors.email ? (
                                    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="password-input" className="form-label">
                                    Password
                                </Label>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.password || ""}
                                    invalid={
                                        validation.touched.password && validation.errors.password ? true : false
                                    }
                                />
                                {validation.touched.password && validation.errors.password ? (
                                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="role_id" className="form-label">
                                    Role
                                </Label>
                                <Input
                                    name="role_id"
                                    type="select"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.role_id || ""}
                                    invalid={
                                        validation.touched.role_id && validation.errors.role_id ? true : false
                                    }
                                >
                                    <option value="">Select Role</option>
                                    {roleList.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </Input>
                                {validation.touched.role_id && validation.errors.role_id ? (
                                    <FormFeedback type="invalid">{validation.errors.role_id}</FormFeedback>
                                ) : null}
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="hstack gap-2 justify-content-end">
                                <Button color="light" onClick={onCloseClick}>
                                    Close
                                </Button>
                                <Button color="success" type="submit">
                                    Add User
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default AddUserModal;
