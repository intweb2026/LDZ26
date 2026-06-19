import React, { useState, useEffect, useRef } from "react";
import { Form } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import API_BASE_URL from '../../config/apiConfig';


const NavCategoryTree = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories]   = useState([]);
  const [loading, setLoading]               = useState(false);
  const [submitVisible, setSubmitVisible]   = useState(false);
  const [checked, setChecked]               = useState({});
  const cbRefs = useRef({});

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchAllData = () => {
    setLoading(true);
    Promise.all([
      fetch(`${API_BASE_URL}/navmaincategories`).then((r) => r.json()),
      fetch(`${API_BASE_URL}/navsubcategories`).then((r) => r.json()),
    ])
      .then(([mData, sData]) => {
        const mains = mData?.navMainategories || [];
        const subs  = sData?.navSubCategories  || [];
        setMainCategories(mains);
        setSubCategories(subs);

        // Restore checked state from isChecked field saved in DB
        const init = {};
        mains.forEach((m) => {
          const children = subs.filter((s) => s.relatedMainCategory?.id === m.id);
          if (children.length) {
            init[m.id] = {};
            children.forEach((s) => {
              // restore from DB: isChecked "Yes" → true, "No" → false
              init[m.id][s.id] = s.isChecked === "Yes";
            });
          } else {
            init[m.id] = m.isChecked === "Yes";
          }
        });
        setChecked(init);
      })
      .catch(() => {
        toast.error("Failed to load data. Please try again later.", {
          position: "top-right", autoClose: 5000,
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAllData(); }, []);

  // Sync indeterminate attribute on main checkboxes
  useEffect(() => {
    mainCategories.forEach((m) => {
      const el = cbRefs.current[m.id];
      if (el) el.indeterminate = isIndeterminate(m.id);
    });
  });

  // ── Helpers ────────────────────────────────────────────────────────────────
  const subsOf = (mId) => subCategories.filter((s) => s.relatedMainCategory?.id === mId);

  const isMainChecked = (mId) => {
    const v = checked[mId];
    if (typeof v === "boolean") return v;
    if (typeof v === "object" && v) return Object.values(v).some(Boolean);
    return false;
  };

  const isIndeterminate = (mId) => {
    const v = checked[mId];
    if (typeof v !== "object" || !v) return false;
    const vals = Object.values(v);
    return vals.some(Boolean) && !vals.every(Boolean);
  };

  // ── Check any main or sub programmatically ─────────────────────────────────
  // Usage anywhere in code: isMainCategoryChecked(1) → true/false
  const isMainCategoryChecked = (mainId) => isMainChecked(mainId);

  // Usage: isSubCategoryChecked(1, 3) or isSubCategoryChecked(null, 3)
  const isSubCategoryChecked = (mainId, subId) => {
    if (mainId) return !!checked[mainId]?.[subId];
    for (const mId of Object.keys(checked)) {
      if (typeof checked[mId] === "object" && checked[mId][subId] !== undefined) {
        return !!checked[mId][subId];
      }
    }
    return false;
  };

  // ── Toggle ─────────────────────────────────────────────────────────────────
  const toggleMain = (mId) => {
    setChecked((prev) => {
      const cur = prev[mId];
      if (typeof cur === "object" && cur) {
        const allOn = Object.values(cur).every(Boolean);
        const next  = {};
        Object.keys(cur).forEach((k) => { next[k] = !allOn; });
        return { ...prev, [mId]: next };
      }
      return { ...prev, [mId]: !cur };
    });
  };

  const toggleSub = (mId, sId) => {
    setChecked((prev) => ({
      ...prev,
      [mId]: { ...prev[mId], [sId]: !prev[mId]?.[sId] },
    }));
  };

  // ── Submit — build payload & call API ──────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitVisible(true);

    // Build main payload — every main category with its current isChecked status
    const mainPayload = mainCategories.map((m) => ({
      id: m.id,
      isChecked: isMainChecked(m.id) ? "Yes" : "No",
    }));

    // Build sub payload — every sub category with its current isChecked status
    const subPayload = subCategories.map((s) => {
      const mId = s.relatedMainCategory?.id;
      return {
        id: s.id,
        isChecked: isSubCategoryChecked(mId, s.id) ? "Yes" : "No",
      };
    });

    const finalData = new FormData();
    // Send as JSON string — parse on Django side with request.data
    finalData.append("mainCategories", JSON.stringify(mainPayload));
    finalData.append("subCategories",  JSON.stringify(subPayload));

    fetch(`${API_BASE_URL}/savenavcheckstatus`, {
      method: "POST",
      body: finalData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success("Navigation Saved Successfully.", {
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
        <div className="row">
          <div className="col-lg-12">
            <div className="card">

              <div className="card-header">
                <h5 className="card-title mb-0">Navigation</h5>
              </div>

              <div className="card-body">
                {loading ? (
                  <div className="text-center py-5">
                    <ClipLoader color="#405189" loading={loading} size={60} />
                  </div>
                ) : mainCategories.length === 0 ? (
                  <p className="text-muted text-center py-4">No categories found.</p>
                ) : (
                  <Form action="#" onSubmit={handleSubmit}>

                    <div className="nav-tree">
                      {mainCategories.map((main) => {
                        const children = subsOf(main.id);
                        return (
                          <div key={main.id} className="mb-3">

                            {/* Main Category Row */}
                            <div
                              className="d-flex align-items-center px-3 py-2 rounded"
                              style={{ background: "#eef2ff" }}
                            >
                              <input
                                type="checkbox"
                                className="form-check-input mt-0 me-2"
                                style={{ width: 18, height: 18, accentColor: "#405189", cursor: "pointer" }}
                                checked={isMainChecked(main.id)}
                                ref={(el) => { cbRefs.current[main.id] = el; }}
                                onChange={() => toggleMain(main.id)}
                              />
                              <span className="fw-semibold" style={{ color: "#405189" }}>
                                Main: {main.navMainCategoryName}
                              </span>
                              <span className="badge bg-light text-secondary border ms-2">
                                {main.navMainCategoryPath}
                              </span>
                            </div>

                            {/* Sub Category Rows */}
                            {children.map((sub) => (
                              <div
                                key={sub.id}
                                className="d-flex align-items-center px-3 py-2 ms-4 border-start border-2"
                                style={{ borderColor: "#405189" }}
                              >
                                <span className="text-muted me-2" style={{ fontSize: 13 }}>↳</span>
                                <input
                                  type="checkbox"
                                  className="form-check-input mt-0 me-2"
                                  style={{ width: 16, height: 16, accentColor: "#405189", cursor: "pointer" }}
                                  checked={!!checked[main.id]?.[sub.id]}
                                  onChange={() => toggleSub(main.id, sub.id)}
                                />
                                <span>Sub: {sub.navSubCategoryName}</span>
                                <span className="badge bg-light text-secondary border ms-2">
                                  {sub.navSubCategoryPath}
                                </span>
                              </div>
                            ))}

                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-dark w-100 mt-3"
                      disabled={submitVisible}
                    >
                      {submitVisible ? (
                        <ClipLoader color="#ffffff" loading={true} size={18} />
                      ) : (
                        "Submit"
                      )}
                    </button>

                  </Form>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavCategoryTree;