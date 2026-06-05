import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, Form, Label, Input, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const BASE_URL = "https://www.australia.lithium-downstream-summit.com/admin1";

const FooterNavigation = () => {
  const navigate = useNavigate();

  // ── Data state ─────────────────────────────────────────────────────────────
  const [footerOptionsList, setFooterOptionsList] = useState([]);
  const [loading, setLoading]                     = useState(false);
  const [checked, setChecked]                     = useState({});
  const [submitVisible, setSubmitVisible]         = useState(false);

  // ── Add modal state ────────────────────────────────────────────────────────
  const [addModal, setAddModal]                         = useState(false);
  const [addFooterOptionsName, setAddFooterOptionsName] = useState("");
  const [addFooterOptionsNameError, setAddFooterOptionsNameError] = useState(false);
  const [addFooterOptionsPath, setAddFooterOptionsPath] = useState("");
  const [addVisible, setAddVisible]                     = useState(false);

  // ── Edit modal state ───────────────────────────────────────────────────────
  const [editModal, setEditModal]                           = useState(false);
  const [editData, setEditData]                             = useState(null);
  const [editFooterOptionsName, setEditFooterOptionsName]   = useState("");
  const [editFooterOptionsNameError, setEditFooterOptionsNameError] = useState(false);
  const [editFooterOptionsPath, setEditFooterOptionsPath]   = useState("");
  const [editVisible, setEditVisible]                       = useState(false);

  // ── Delete modal state ─────────────────────────────────────────────────────
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId]       = useState(null);
  const [deleteVisible, setDeleteVisible] = useState(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchData = () => {
    setLoading(true);
    fetch(`${BASE_URL}/footeroptions`)
      .then((res) => res.json())
      .then((data) => {
        const list = data?.footerOptions || [];
        setFooterOptionsList(list);
        const init = {};
        list.forEach((op) => { init[op.id] = op.isChecked === "Yes"; });
        setChecked(init);
      })
      .catch(() => {
        toast.error("Failed to load data. Please try again later.", {
          position: "top-right", autoClose: 5000,
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  // Pre-fill edit form when editData changes
  useEffect(() => {
    if (editData) {
      setEditFooterOptionsName(editData.footerOptionsName || "");
      setEditFooterOptionsPath(editData.footerOptionsPath || "");
      setEditFooterOptionsNameError(false);
      setEditVisible(false);
    }
  }, [editData]);

  // ── Checkbox toggle ────────────────────────────────────────────────────────
  const toggleOption = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ── Add handlers ───────────────────────────────────────────────────────────
  const resetAddForm = () => {
    setAddFooterOptionsName("");
    setAddFooterOptionsPath("");
    setAddFooterOptionsNameError(false);
    setAddVisible(false);
  };

  const addSubmitBtnClk = (e) => {
    e.preventDefault();
    if (addFooterOptionsName === "") {
      toast.error("Footer Option Name is Required", {
        position: "top-right", autoClose: 5000, hideProgressBar: false,
        closeOnClick: true, pauseOnHover: true, draggable: true,
      });
      setAddFooterOptionsNameError(true);
      return;
    }
    setAddVisible(true);
    const finalData = new FormData();
    finalData.append("footerOptionsName", addFooterOptionsName);
    finalData.append("footerOptionsPath", addFooterOptionsPath);

    fetch(`${BASE_URL}/addfooteroption`, { method: "POST", body: finalData })
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.detail === "The Token is expired" || data.message === "Invalid token")) {
          localStorage.clear(); navigate("/logout");
        }
        if (data.status) {
          resetAddForm();
          setAddModal(false);
          fetchData();
          toast.success("Footer Option Added Successfully.", {
            position: "top-right", autoClose: 5000, hideProgressBar: false,
            closeOnClick: true, pauseOnHover: true, draggable: true,
          });
        } else {
          setAddVisible(false);
          toast.error(data?.message);
        }
      })
      .catch(() => {
        setAddVisible(false);
        toast.error("There was an error, Please try again later.", {
          position: "top-right", autoClose: 5000,
        });
      });
  };

  // ── Edit handlers ──────────────────────────────────────────────────────────
  const editSubmitBtnClk = (e) => {
    e.preventDefault();
    if (editFooterOptionsName === "") {
      toast.error("Footer Option Name is Required", {
        position: "top-right", autoClose: 5000, hideProgressBar: false,
        closeOnClick: true, pauseOnHover: true, draggable: true,
      });
      setEditFooterOptionsNameError(true);
      return;
    }
    setEditVisible(true);
    const finalData = new FormData();
    finalData.append("id", editData.id);
    finalData.append("footerOptionsName", editFooterOptionsName);
    finalData.append("footerOptionsPath", editFooterOptionsPath);

    fetch(`${BASE_URL}/editfooteroption`, { method: "POST", body: finalData })
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.detail === "The Token is expired" || data.message === "Invalid token")) {
          localStorage.clear(); navigate("/logout");
        }
        if (data.status) {
          setEditModal(false);
          fetchData();
          toast.success("Footer Option Updated Successfully.", {
            position: "top-right", autoClose: 5000, hideProgressBar: false,
            closeOnClick: true, pauseOnHover: true, draggable: true,
          });
        } else {
          setEditVisible(false);
          toast.error(data?.message);
        }
      })
      .catch(() => {
        setEditVisible(false);
        toast.error("There was an error, Please try again later.", {
          position: "top-right", autoClose: 5000,
        });
      });
  };

  // ── Delete handler ─────────────────────────────────────────────────────────
  const deleteConfirmBtnClk = () => {
    setDeleteVisible(true);
    const finalData = new FormData();
    finalData.append("id", deleteId);
    finalData.append("isDelete", "Yes");

    fetch(`${BASE_URL}/deletefooteroption`, { method: "POST", body: finalData })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setDeleteModal(false);
          fetchData();
          toast.success("Footer Option Deleted Successfully.", {
            position: "top-right", autoClose: 5000, hideProgressBar: false,
            closeOnClick: true, pauseOnHover: true, draggable: true,
          });
        } else {
          setDeleteVisible(false);
          toast.error(data?.message || "Delete failed.");
        }
      })
      .catch(() => {
        setDeleteVisible(false);
        toast.error("There was an error, Please try again later.", {
          position: "top-right", autoClose: 5000,
        });
      });
  };

  // ── Submit checked status ──────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitVisible(true);

    const footerPayload = footerOptionsList.map((op) => ({
      id: op.id,
      isChecked: checked[op.id] ? "Yes" : "No",
    }));

    const finalData = new FormData();
    finalData.append("footerOptions", JSON.stringify(footerPayload));

    fetch(`${BASE_URL}/savefootercheckstatus`, { method: "POST", body: finalData })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success("Footer Navigation Saved Successfully.", {
            position: "top-right", autoClose: 5000, hideProgressBar: false,
            closeOnClick: true, pauseOnHover: true, draggable: true,
          });
        } else {
          toast.error(data?.message || "Something went wrong.", {
            position: "top-right", autoClose: 5000,
          });
        }
      })
      .catch(() => {
        toast.error("There was an error, Please try again later.", {
          position: "top-right", autoClose: 5000,
        });
      })
      .finally(() => setSubmitVisible(false));
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="page-content">
      <div className="container-fluid">

        {/* Page Title */}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Footer Navigation</h4>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => { resetAddForm(); setAddModal(true); }}
              >
                <i className="ri-add-line align-bottom me-1"></i>
                Add Footer Option
              </button>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Footer Navigation</h5>
              </div>

              <div className="card-body">
                {loading ? (
                  <div className="text-center py-5">
                    <ClipLoader color="#405189" loading={loading} size={60} />
                  </div>
                ) : footerOptionsList.length === 0 ? (
                  <p className="text-muted text-center py-4">No footer options found.</p>
                ) : (
                  <Form action="#" onSubmit={handleSubmit}>
                    <div className="footer-tree">
                      {footerOptionsList.map((op) => (
                        <div
                          key={op.id}
                          className="d-flex align-items-center justify-content-between px-3 py-2 mb-1 rounded"
                          style={{ background: checked[op.id] ? "#eef2ff" : "#f8f9fa" }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="checkbox"
                              className="form-check-input mt-0"
                              style={{ width: 18, height: 18, accentColor: "#405189", cursor: "pointer" }}
                              checked={!!checked[op.id]}
                              onChange={() => toggleOption(op.id)}
                            />
                            <span className={checked[op.id] ? "fw-semibold" : "text-muted"}>
                              {op.footerOptionsName}
                            </span>
                            <span className="badge bg-light text-secondary border ms-1">
                              {op.footerOptionsPath}
                            </span>
                          </div>
                          <div className="hstack gap-1">
                            <button
                              type="button"
                              className="btn btn-sm btn-soft-primary"
                              title="Edit"
                              onClick={() => { setEditData(op); setEditModal(true); }}
                            >
                              <i className="ri-pencil-line"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-soft-danger"
                              title="Delete"
                              onClick={() => { setDeleteId(op.id); setDeleteVisible(false); setDeleteModal(true); }}
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-dark w-100 mt-3"
                      disabled={submitVisible}
                    >
                      {submitVisible
                        ? <ClipLoader color="#ffffff" loading={true} size={18} />
                        : "Submit"
                      }
                    </button>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Add Modal ─────────────────────────────────────────────────────── */}
      <Modal id="addFooterModal" size="md" isOpen={addModal}
        toggle={() => { resetAddForm(); setAddModal(false); }} centered>
        <ModalHeader className="bg-light p-3"
          toggle={() => { resetAddForm(); setAddModal(false); }}>
          <h5 className="modal-title">Add Footer Option</h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <Label className="form-label">
                  Footer Option Name <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  className={`form-control ${addFooterOptionsNameError ? "border-danger" : ""}`}
                  placeholder="Enter Footer Option Name"
                  value={addFooterOptionsName}
                  onChange={(e) => { setAddFooterOptionsName(e.target.value); setAddFooterOptionsNameError(false); }}
                />
              </div>
              <div className="col-md-12">
                <Label className="form-label">Path</Label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Enter Path e.g. /contact-us"
                  value={addFooterOptionsPath}
                  onChange={(e) => setAddFooterOptionsPath(e.target.value)}
                />
              </div>
            </div>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button type="button" className="btn btn-light"
                onClick={() => { resetAddForm(); setAddModal(false); }}>
                Close
              </button>
              <button type="submit" className="btn btn-success"
                onClick={addSubmitBtnClk} disabled={addVisible}>
                Add Footer Option
              </button>
            </div>
          </div>
        </Form>
      </Modal>

      {/* ── Edit Modal ────────────────────────────────────────────────────── */}
      <Modal id="editFooterModal" size="md" isOpen={editModal}
        toggle={() => setEditModal(false)} centered>
        <ModalHeader className="bg-light p-3" toggle={() => setEditModal(false)}>
          <h5 className="modal-title">Edit Footer Option</h5>
        </ModalHeader>
        <Form action="#">
          <ModalBody>
            <div className="row gy-4 mb-3">
              <div className="col-md-12">
                <Label className="form-label">
                  Footer Option Name <span className="text-danger">*</span>
                </Label>
                <Input
                  type="text"
                  className={`form-control ${editFooterOptionsNameError ? "border-danger" : ""}`}
                  placeholder="Enter Footer Option Name"
                  value={editFooterOptionsName}
                  onChange={(e) => { setEditFooterOptionsName(e.target.value); setEditFooterOptionsNameError(false); }}
                />
              </div>
              <div className="col-md-12">
                <Label className="form-label">Path</Label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Enter Path e.g. /contact-us"
                  value={editFooterOptionsPath}
                  onChange={(e) => setEditFooterOptionsPath(e.target.value)}
                />
              </div>
            </div>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button type="button" className="btn btn-light"
                onClick={() => setEditModal(false)}>
                Close
              </button>
              <button type="submit" className="btn btn-primary"
                onClick={editSubmitBtnClk} disabled={editVisible}>
                Update Footer Option
              </button>
            </div>
          </div>
        </Form>
      </Modal>

      {/* ── Delete Modal ──────────────────────────────────────────────────── */}
      <Modal id="deleteFooterModal" size="sm" isOpen={deleteModal}
        toggle={() => setDeleteModal(false)} centered>
        <ModalHeader className="bg-light p-3" toggle={() => setDeleteModal(false)}>
          <h5 className="modal-title">Confirm Delete</h5>
        </ModalHeader>
        <ModalBody>
          <p className="mb-0">Are you sure you want to delete this footer option?</p>
        </ModalBody>
        <div className="modal-footer">
          <div className="hstack gap-2 justify-content-end">
            <button type="button" className="btn btn-light"
              onClick={() => setDeleteModal(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger"
              onClick={deleteConfirmBtnClk} disabled={deleteVisible}>
              {deleteVisible ? <Spinner size="sm" /> : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default FooterNavigation;