import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button,
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Input,
    Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import API_BASE_URL from '../../config/apiConfig';

const EditUserPermissions = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [permissionModules, setPermissionModules] = useState({});
    const [detailedPermissions, setDetailedPermissions] = useState({});
    const [open, setOpen] = useState("");

    const toggleAccordion = (id) => {
        setOpen(open === id ? "" : id);
    };

    useEffect(() => {
        fetchUserData();
        fetchPermissionList();
    }, [id]);

    const fetchUserData = () => {
        fetch(`${API_BASE_URL}/admin1/userlist`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    const foundUser = data.userList.find((u) => u.id.toString() === id);
                    if (foundUser) {
                        setUser(foundUser);
                        setDetailedPermissions(foundUser.detailed_permissions || {});
                    }
                }
            });
    };

    const fetchPermissionList = () => {
        fetch(`${API_BASE_URL}/admin1/permissionlist`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    setPermissionModules(data.permissionModules);
                }
            });
    };

    const handleToggleDetailedPermission = (codename, action) => {
        const current = detailedPermissions[codename] || [];
        let updated;
        if (current.includes(action)) {
            updated = current.filter((a) => a !== action);
        } else {
            updated = [...current, action];
        }

        const newDetailed = { ...detailedPermissions };
        if (updated.length > 0) {
            newDetailed[codename] = updated;
        } else {
            delete newDetailed[codename];
        }
        setDetailedPermissions(newDetailed);
    };

    const handleMainToggle = (codename) => {
        const newDetailed = { ...detailedPermissions };
        if (newDetailed[codename]) {
            delete newDetailed[codename];
        } else {
            newDetailed[codename] = ["view"];
        }
        setDetailedPermissions(newDetailed);
    };

    const handleSave = () => {
        fetch(`${API_BASE_URL}/admin1/updateuserpermissions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                detailed_permissions: detailedPermissions,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status) {
                    toast.success("Permissions updated successfully");
                    setTimeout(() => navigate("/apps-permissions"), 1500);
                } else {
                    toast.error(data.message);
                }
            });
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title={`Edit Permissions: ${user?.username || ""}`} pageTitle="Dashboards" pageLink="/dashboard" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="d-flex align-items-center">
                                    <h5 className="card-title mb-0 flex-grow-1">
                                        Manage Permissions for {user?.username}
                                    </h5>
                                    <div className="flex-shrink-0">
                                        <Button color="soft-secondary" className="me-2" onClick={() => navigate("/apps-permissions")}>
                                            Back
                                        </Button>
                                        <Button color="primary" onClick={handleSave}>
                                            Save Changes
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Accordion open={open} toggle={toggleAccordion}>
                                        {Object.keys(permissionModules).map((module, index) => (
                                            <AccordionItem key={index}>
                                                <AccordionHeader targetId={index.toString()}>
                                                    <span className="text-capitalize">{module} Permissions</span>
                                                </AccordionHeader>
                                                <AccordionBody accordionId={index.toString()}>
                                                    <div className="bg-light p-3 rounded mb-3">
                                                        <Row>
                                                            {permissionModules[module].map((perm) => (
                                                                <Col lg={12} key={perm.id} className="mb-3">
                                                                    <div className="bg-white border rounded p-3 shadow-sm">
                                                                        <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="form-check form-switch form-switch-lg me-3">
                                                                                    <Input
                                                                                        type="checkbox"
                                                                                        className="form-check-input"
                                                                                        id={`main-${perm.id}`}
                                                                                        checked={!!detailedPermissions[perm.codename]}
                                                                                        onChange={() => handleMainToggle(perm.codename)}
                                                                                    />
                                                                                    <Label className="form-check-label fw-bold fs-15 mb-0" htmlFor={`main-${perm.id}`} style={{ cursor: "pointer" }}>
                                                                                        {perm.name}
                                                                                    </Label>
                                                                                </div>
                                                                            </div>
                                                                            {detailedPermissions[perm.codename] && (
                                                                                <span className="badge badge-soft-info fs-12">Permission Active</span>
                                                                            )}
                                                                        </div>
                                                                        {detailedPermissions[perm.codename] && (
                                                                            <div className="d-flex flex-wrap gap-4 ps-2">
                                                                                {["view", "add", "edit", "delete"].map((action) => (
                                                                                    <div key={action} className="form-check form-switch form-switch-md">
                                                                                        <Input
                                                                                            type="checkbox"
                                                                                            className="form-check-input"
                                                                                            id={`${action}-${perm.id}`}
                                                                                            checked={detailedPermissions[perm.codename].includes(action)}
                                                                                            onChange={() => handleToggleDetailedPermission(perm.codename, action)}
                                                                                        />
                                                                                        <Label className="form-check-label text-capitalize fs-13 mb-0" htmlFor={`${action}-${perm.id}`} style={{ cursor: "pointer" }}>
                                                                                            {action}
                                                                                        </Label>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    </div>
                                                </AccordionBody>

                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
            </div>
        </React.Fragment>
    );
};

export default EditUserPermissions;
