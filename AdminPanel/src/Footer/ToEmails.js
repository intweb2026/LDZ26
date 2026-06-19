import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../config/apiConfig";

const ToEmails = () => {
  const [emailInput, setEmailInput] = useState("");
  const [recordId, setRecordId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [emailTags, setEmailTags] = useState([]);

  // ─── Fetch existing emails on mount ───────────────────────────
  useEffect(() => {
    fetchToEmails();
  }, []);

  // Sync tags whenever emailInput changes (comma-separated → tags)
  useEffect(() => {
    const tags = emailInput
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    setEmailTags(tags);
  }, [emailInput]);

  const fetchToEmails = () => {
    setFetching(true);
    fetch(`${API_BASE_URL}/admin1/toemails`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status) {
          setEmailInput(data.toemails || "");
          setRecordId(data.id || null);
        } else {
          toast.error(data?.message || "Failed to load emails.");
        }
      })
      .catch(() => {
        toast.error("Error fetching emails. Please try again.");
      })
      .finally(() => setFetching(false));
  };

  // ─── Remove a single tag ──────────────────────────────────────
  const removeEmail = (indexToRemove) => {
    const updated = emailTags.filter((_, i) => i !== indexToRemove);
    setEmailInput(updated.join(","));
  };

  // ─── Handle key events in the textarea ───────────────────────
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = emailInput.trim();
      if (val && !val.endsWith(",")) {
        setEmailInput(val + ",");
      }
    }
  };

  // ─── Validate emails before save ─────────────────────────────
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    const tags = emailInput
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    const invalid = tags.filter((e) => !isValidEmail(e));
    if (invalid.length > 0) {
      toast.error(`Invalid email(s): ${invalid.join(", ")}`);
      return;
    }

    const payload = {
      toemails: tags.join(","),
      updated_by: "Admin",
      id: recordId,
    };

    setLoading(true);
    fetch(`${API_BASE_URL}/admin1/savetoemails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status) {
          toast.success(data.message || "Emails saved successfully.");
          if (data.id) setRecordId(data.id);
        } else {
          toast.error(data?.message || "Failed to save emails.");
        }
      })
      .catch(() => {
        toast.error("Error saving emails. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  // ─── UI ───────────────────────────────────────────────────────
  return (
    <div className="page-content">
      <div className="container-fluid">

        {/* Page Title */}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Manage To Emails</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="/dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">To Emails</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                  <i className="ri-mail-settings-line me-2 text-primary"></i>
                  Booking Form — Recipient Emails
                </h4>
                <button
                  className="btn btn-soft-secondary btn-sm"
                  onClick={fetchToEmails}
                  disabled={fetching}
                  title="Refresh"
                >
                  <i className={`ri-refresh-line ${fetching ? "spin" : ""}`}></i>
                </button>
              </div>

              <div className="card-body">

                {fetching ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 text-muted">Fetching emails...</p>
                  </div>
                ) : (
                  <>
                    {/* Info alert */}
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                      <i className="ri-information-line me-1"></i>
                      All booking form submissions will be sent to the emails listed below.
                      Separate multiple emails with a <strong>comma</strong> or press <kbd>Enter</kbd>.
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>

                    {/* Email Tags Preview */}
                    {emailTags.length > 0 && (
                      <div className="mb-3">
                        <label className="form-label fw-semibold text-muted small text-uppercase mb-2">
                          Current Recipients ({emailTags.length})
                        </label>
                        <div
                          className="d-flex flex-wrap gap-2 p-3 rounded"
                          style={{ background: "#f3f6f9", minHeight: "52px", border: "1px solid #e9ebec" }}
                        >
                          {emailTags.map((email, idx) => (
                            <span
                              key={idx}
                              className="badge d-inline-flex align-items-center gap-1 px-3 py-2"
                              style={{
                                background: "#fff",
                                color: "#405189",
                                border: "1px solid #c5cbe8",
                                fontSize: "12.5px",
                                fontWeight: 500,
                                borderRadius: "6px",
                              }}
                            >
                              <i className="ri-mail-line" style={{ fontSize: "12px" }}></i>
                              {email}
                              <button
                                type="button"
                                onClick={() => removeEmail(idx)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: "0 0 0 4px",
                                  cursor: "pointer",
                                  color: "#f06548",
                                  lineHeight: 1,
                                  fontSize: "14px",
                                }}
                                title={`Remove ${email}`}
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Textarea input */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Email Addresses
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="e.g. alice@example.com, bob@example.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{ fontSize: "14px", resize: "vertical" }}
                      />
                      <div className="form-text text-muted">
                        <i className="ri-lightbulb-line me-1"></i>
                        Tip: You can paste a comma-separated list of emails all at once.
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={fetchToEmails}
                        disabled={fetching || loading}
                      >
                        <i className="ri-close-line me-1"></i>
                        Reset
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={loading || emailTags.length === 0}
                        style={{ minWidth: "130px" }}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <i className="ri-save-line me-1"></i>
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { display: inline-block; animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default ToEmails;