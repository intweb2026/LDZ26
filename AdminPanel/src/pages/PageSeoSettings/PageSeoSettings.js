import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, CardBody, Label, Input } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../../config/apiConfig';

const override = css`
  display: block;
  margin: 0 auto;
  color: black;
`;


const PAGES = [
  { label: "Home", key: "home" },
  { label: "Speakers", key: "speakers" },
  { label: "Featured Speakers", key: "featured-speakers" },
  { label: "Who Should Attend", key: "who-should-attend" },
  { label: "FAQ", key: "faq" },
  { label: "Media Partners", key: "media-partners" },
  { label: "Contact Us", key: "contact-us" },
  { label: "Agenda", key: "agenda" },
  { label: "Agenda Page", key: "agenda-page" }, 
  { label: "Venue", key: "venue" },
  { label: "Sponsors", key: "sponsors" },
  { label: "Booking", key: "booking" },
  { label: "Booking Form", key: "booking-form" },
  { label: "Pay Online", key: "pay-online" },
  { label: "Sponsor Packages", key: "sponsor-packages" },
  { label: "Sponsor Booking", key: "sponsor-booking" },
  { label: "Attendees", key: "attandees" },
  { label: "Remind me Later", key: "remind-me" },
  { label: "Privacy Policy", key: "privacy-policy" },
  { label: "Terms & Conditions", key: "terms-conditions" },
  { label: "News", key: "news" },
  { label: "Cookie Policy", key: "cookie-policy" },
  // { label: "Slide Share",       key: "slide-share" },
];

const META_TITLE_MAX = 60;
const META_DESC_MAX = 160;

const PageSeoSettings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activePage, setActivePage] = useState(PAGES[0].key);
  const [allSeoData, setAllSeoData] = useState([]);

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [ogImagePreview, setOgImagePreview] = useState("");
  const [recordId, setRecordId] = useState(null);

  const [listLoading, setListLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  let color = "#405189";

  // ─── Auth check helper ──────────────────────────────────────────────────────
  const checkAuth = (data) => {
    if (
      data &&
      (data.detail === "The Token is expired" ||
        data.message === "Invalid token")
    ) {
      localStorage.clear();
      navigate("/logout");
      return true;
    }
    return false;
  };

  // ─── Load all page SEO records on mount ─────────────────────────────────────
  useEffect(() => {
    fetchAllSeoData();
    // eslint-disable-next-line
  }, []);

  const fetchAllSeoData = () => {
    setListLoading(true);
    fetch(`${API_BASE_URL}/pageseo`, { method: "GET" })
      .then((r) => r.json())
      .then((data) => {
        if (checkAuth(data)) return;
        if (data?.status) {
          setAllSeoData(data.pageSeoSettings || []);
          populateForm(PAGES[0].key, data.pageSeoSettings || []);
        }
        setListLoading(false);
      })
      .catch(() => {
        setListLoading(false);
        toast.error("Failed to load SEO data.");
      });
  };

  // ─── Populate form fields when active page changes ──────────────────────────
  const populateForm = (pageKey, dataList) => {
    const record = dataList.find((s) => s.pageName === pageKey);
    setMetaTitle(record?.pageMetaTitle || "");
    setMetaDesc(record?.pageMetaDescription || "");
    setOgImageUrl(record?.pageOgImage || "");
    setOgImagePreview(record?.pageOgImage || "");
    setRecordId(record?.id || null);
  };

  const handleTabClick = (pageKey) => {
    setActivePage(pageKey);
    populateForm(pageKey, allSeoData);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ─── Image upload ────────────────────────────────────────────────────────────
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, WEBP or GIF images are allowed.");
      return;
    }

    setUploadLoading(true);
    const formData = new FormData();
    formData.append("media", file);

    try {
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (checkAuth(data)) return;

      if (data?.uploadedURL) {
        setOgImageUrl(data.uploadedURL);
        setOgImagePreview(data.uploadedURL);
        toast.success("Image uploaded successfully.");
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch {
      toast.error("Upload error. Please try again.");
    } finally {
      setUploadLoading(false);
    }
  };

  // ─── Save / Update ───────────────────────────────────────────────────────────
  const handleSave = () => {
    if (metaTitle.trim() === "") {
      toast.error("Meta Title is required.");
      return;
    }
    if (metaTitle.trim().length > META_TITLE_MAX) {
      toast.error(`Meta Title cannot exceed ${META_TITLE_MAX} characters.`);
      return;
    }
    if (metaDesc.trim() === "") {
      toast.error("Meta Description is required.");
      return;
    }
    if (metaDesc.trim().length > META_DESC_MAX) {
      toast.error(
        `Meta Description cannot exceed ${META_DESC_MAX} characters.`,
      );
      return;
    }

    setSaveLoading(true);

    const formData = new FormData();
    formData.append("pageName", activePage);
    formData.append("pageMetaTitle", metaTitle.trim());
    formData.append("pageMetaDescription", metaDesc.trim());
    formData.append("pageOgImage", ogImageUrl);

    const isEdit = !!recordId;
    const method = isEdit ? "PATCH" : "POST";
    const endpoint = isEdit ? "editpageseo" : "addpageseo";

    if (isEdit) formData.append("id", recordId);

    fetch(`${API_BASE_URL}/${endpoint}`, { method, body: formData })
      .then((r) => r.json())
      .then((data) => {
        if (checkAuth(data)) return;
        if (data?.status) {
          toast.success("Meta settings saved successfully.");
          // Update local cache so tab switches stay consistent
          setAllSeoData((prev) => {
            const updated = prev.filter((s) => s.pageName !== activePage);
            const newId = isEdit ? recordId : data.id;
            return [
              ...updated,
              {
                id: newId,
                pageName: activePage,
                pageMetaTitle: metaTitle.trim(),
                pageMetaDescription: metaDesc.trim(),
                pageOgImage: ogImageUrl,
              },
            ];
          });
          if (!isEdit && data.id) setRecordId(data.id);
        } else {
          toast.error(data?.message || "Failed to save. Please try again.");
        }
        setSaveLoading(false);
      })
      .catch(() => {
        setSaveLoading(false);
        toast.error("There was an error. Please try again later.");
      });
  };

  // ─── Derived ─────────────────────────────────────────────────────────────────
  const activePageLabel = PAGES.find((p) => p.key === activePage)?.label || "";
  const titleCount = metaTitle.length;
  const descCount = metaDesc.length;
  const titleOver = titleCount > META_TITLE_MAX;
  const descOver = descCount > META_DESC_MAX;

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="Page SEO Settings"
          pageTitle="Dashboards"
          pageLink="/dashboard"
        />

        {listLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: 200 }}
          >
            <ClipLoader
              color={color}
              loading={listLoading}
              css={override}
              size={40}
            />
          </div>
        ) : (
          <>
            {/* ── Tab Navigation ── */}
            <div className="page-seo-tabs-wrapper mb-3">
              <div className="page-seo-tabs d-flex flex-wrap gap-2">
                {PAGES.map((page) => {
                  const isActive = activePage === page.key;
                  const hasSavedData = allSeoData.some(
                    (s) => s.pageName === page.key && s.pageMetaTitle,
                  );
                  return (
                    <button
                      key={page.key}
                      onClick={() => handleTabClick(page.key)}
                      className={`btn btn-sm ${
                        isActive
                          ? "btn-primary"
                          : hasSavedData
                            ? "btn-soft-success"
                            : "btn-soft-secondary"
                      }`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {hasSavedData && !isActive && (
                        <i
                          className="ri-check-line me-1"
                          style={{ fontSize: 11 }}
                        />
                      )}
                      {page.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Form Card ── */}
            <Card>
              <div className="px-4 pt-3 pb-2 border-bottom d-flex align-items-center justify-content-between">
                <h5 className="mb-0 fw-semibold">
                  {activePageLabel} – Meta Settings
                </h5>
                {recordId && (
                  <span className="badge bg-success-subtle text-success">
                    <i className="ri-checkbox-circle-line me-1" />
                    Saved
                  </span>
                )}
              </div>

              <CardBody>
                <Row className="g-3">
                  {/* ── Meta Title ── */}
                  <Col xs={12}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <Label className="form-label mb-0 fw-medium">
                        Meta Title
                      </Label>
                      <span
                        className={`small ${titleOver ? "text-danger fw-semibold" : "text-muted"}`}
                      >
                        {titleCount}/{META_TITLE_MAX}
                      </span>
                    </div>
                    <Input
                      type="text"
                      className={`form-control ${titleOver ? "is-invalid" : ""}`}
                      placeholder="Enter meta title…"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                    />
                    <div className="form-text text-muted">
                      Max {META_TITLE_MAX} characters
                    </div>
                  </Col>

                  {/* ── Meta Description ── */}
                  <Col xs={12}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <Label className="form-label mb-0 fw-medium">
                        Meta Description
                      </Label>
                      <span
                        className={`small ${descOver ? "text-danger fw-semibold" : "text-muted"}`}
                      >
                        {descCount}/{META_DESC_MAX}
                      </span>
                    </div>
                    <Input
                      type="textarea"
                      rows={4}
                      className={`form-control ${descOver ? "is-invalid" : ""}`}
                      placeholder="Enter meta description…"
                      value={metaDesc}
                      onChange={(e) => setMetaDesc(e.target.value)}
                    />
                    <div className="form-text text-muted">
                      Max {META_DESC_MAX} characters
                    </div>
                  </Col>

                  {/* ── OG Image ── */}
                  <Col xs={12}>
                    <Label className="form-label fw-medium">
                      Upload OG Image
                    </Label>
                    <Row className="align-items-start g-3">
                      <Col xs={12} md={5}>
                        <div className="input-group">
                          <Input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="form-control"
                            innerRef={fileInputRef}
                            onChange={handleImageChange}
                            disabled={uploadLoading}
                          />
                        </div>
                        {uploadLoading && (
                          <div className="d-flex align-items-center gap-2 mt-2 text-muted small">
                            <ClipLoader
                              color={color}
                              loading
                              size={14}
                              css={override}
                            />
                            Uploading…
                          </div>
                        )}
                        {ogImageUrl && !uploadLoading && (
                          <div className="mt-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-soft-danger"
                              onClick={() => {
                                setOgImageUrl("");
                                setOgImagePreview("");
                                if (fileInputRef.current)
                                  fileInputRef.current.value = "";
                              }}
                            >
                              <i className="ri-delete-bin-line me-1" />
                              Remove Image
                            </button>
                          </div>
                        )}
                      </Col>

                      {/* Preview */}
                      <Col xs={12} md={7}>
                        {ogImagePreview ? (
                          <div>
                            <p className="text-muted small mb-1 fw-medium">
                              OG Image Preview
                            </p>
                            <div
                              style={{
                                border: "1px solid #e9ebec",
                                borderRadius: 8,
                                overflow: "hidden",
                                maxWidth: 360,
                                backgroundColor: "#f3f6f9",
                              }}
                            >
                              <img
                                src={ogImagePreview}
                                alt="OG Preview"
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  maxHeight: 200,
                                  objectFit: "cover",
                                  display: "block",
                                }}
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            </div>
                            <p
                              className="text-muted mt-1"
                              style={{ fontSize: 11 }}
                            >
                              Recommended: 1200 × 630 px
                            </p>
                          </div>
                        ) : (
                          <div
                            className="d-flex flex-column align-items-center justify-content-center text-muted"
                            style={{
                              border: "2px dashed #ced4da",
                              borderRadius: 8,
                              minHeight: 120,
                              padding: "16px 24px",
                              maxWidth: 360,
                              backgroundColor: "#f8f9fa",
                            }}
                          >
                            <i
                              className="ri-image-line"
                              style={{ fontSize: 32, marginBottom: 6 }}
                            />
                            <span className="small text-center">
                              No OG image uploaded yet.
                              <br />
                              Recommended: 1200 × 630 px
                            </span>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/* ── Save Button ── */}
                <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={handleSave}
                    disabled={
                      saveLoading || uploadLoading || titleOver || descOver
                    }
                  >
                    {saveLoading ? (
                      <>
                        <ClipLoader
                          color="#fff"
                          loading
                          size={14}
                          css={override}
                        />
                        <span className="ms-2">Saving…</span>
                      </>
                    ) : (
                      <>
                        <i className="ri-save-line me-1" />
                        Save Meta for This Page
                      </>
                    )}
                  </button>
                </div>
              </CardBody>
            </Card>
          </>
        )}
      </Container>
    </div>
  );
};

export default PageSeoSettings;
