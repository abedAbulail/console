"use client";

import { useState, useEffect } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      const res = await fetch("/api-proxy/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setHistory(data.data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(`/api-proxy/delete-history/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setHistory(history.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style>{`
        body { background-color: #ffffff; color: #212529; font-family: 'Inter', sans-serif; }
        
        .main-content {
          padding-top: 3rem;
          padding-bottom: 3rem;
          transition: all 0.3s ease;
        }

        @media (min-width: 992px) {
          .main-content {
            margin-left: 260px;
            width: calc(100% - 260px);
          }
        }

        @media (max-width: 991px) {
          .main-content {
            margin-left: 0;
            width: 100%;
            padding-top: 5rem; 
          }
        }

        /* تغيير اللون الأحمر إلى الكحلي الداكن */
        .header-title { color: #001f3f; font-weight: 800; letter-spacing: -1px; }
        .accent-line { width: 50px; height: 3px; background: #001f3f; margin: 15px auto; }
        
        .history-card {
          background: #ffffff;
          border: 1px solid #eef0f2;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          margin-bottom: 1.5rem;
        }

        .label-caps {
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.7rem;
          color: #adb5bd;
          margin-bottom: 4px;
        }

        .content-box {
          background-color: #f8f9fa;
          padding: 12px 15px;
          border-radius: 8px;
          font-size: 0.95rem;
          border: 1px solid #f1f3f5;
        }

        .status-badge {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 600;
        }

        .badge-verified { background: #e6f4ea; color: #1e7e34; }
        /* تغيير لون حالة التصحيح لتناسب الكحلي */
        .badge-corrected { background: #eef2ff; color: #001f3f; }

        .btn-delete {
          color: #adb5bd;
          border: none;
          background: none;
        }
        .btn-delete:hover { color: #dc3545; }
      `}</style>

      <div className="main-content container-fluid">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="header-title">Audit History</h1>
            <p className="text-muted">
              Review and manage past AI model interactions
            </p>
            <div className="accent-line"></div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              {isLoading ? (
                <div className="text-center p-5">
                  <div
                    className="spinner-border text-secondary"
                    role="status"
                  ></div>
                </div>
              ) : history.length === 0 ? (
                <div className="text-center p-5 border rounded bg-light">
                  <p className="text-muted mb-0">
                    No records found in history.
                  </p>
                </div>
              ) : (
                history.map((item, index) => (
                  <div key={item.id || index} className="history-card p-4">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold text-secondary">
                          #{history.length - index}
                        </span>
                        <span
                          className={`status-badge ${
                            item.corrected_response
                              ? "badge-corrected"
                              : "badge-verified"
                          }`}
                        >
                          {item.corrected_response ? "CORRECTED" : "VERIFIED"}
                        </span>
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                        </svg>
                      </button>
                    </div>

                    <div className="row g-3">
                      <div className="col-12">
                        <div className="label-caps">Prompt</div>
                        <div className="content-box fw-semibold">
                          {item.question}
                        </div>
                      </div>
                      <div
                        className={
                          item.corrected_response ? "col-md-6" : "col-12"
                        }
                      >
                        <div className="label-caps">AI Output</div>
                        <div className="content-box text-secondary">
                          {item.response}
                        </div>
                      </div>
                      {item.corrected_response && (
                        <div className="col-md-6">
                          <div
                            className="label-caps"
                            style={{ color: "#001f3f" }}
                          >
                            Correction Provided
                          </div>
                          <div
                            className="content-box"
                            style={{
                              backgroundColor: "#f0f4f8",
                              borderColor: "#d1d9e6",
                              color: "#001f3f",
                            }}
                          >
                            {item.corrected_response}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
