"use client";

import { useState, useEffect } from "react";

export default function DeveloperTestingPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showCorrectAnswerInput, setShowCorrectAnswerInput] = useState(false);
  const [collection_name, setCollectionName] = useState("AMT");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setResponse("");
    setFeedback(null);
    setShowCorrectAnswerInput(false);
    setCorrectAnswer("");

    try {
      const res = await fetch(
        "https://n8n.srv1004057.hstgr.cloud/webhook/AMT_console",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: question,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setResponse(
        data.answer || data.output || data.message || JSON.stringify(data)
      );
    } catch (error) {
      setResponse(
        "Error: Failed to connect to the AI engine. Please verify the webhook status."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    setFeedback("like");
    try {
      await fetch("http://165.227.11.150/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, response, like: true }),
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = () => {
    setFeedback("dislike");
    setShowCorrectAnswerInput(true);
  };

  const handleCorrectAnswerSubmit = async () => {
    if (!correctAnswer.trim()) return;
    setIsLoading(true); // تفعيل حالة التحميل هنا
    try {
      await fetch("http://165.227.11.150/dislike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          response,
          like: false,
          correct_answer: correctAnswer,
        }),
      });
      // إشعار بالنجاح قبل إعادة التحميل
      setFeedback("submitted");
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    // ملاحظة: لا نضع setIsLoading(false) في الـ finally لأن الصفحة ستعيد تحميل نفسها
  };

  if (!isAuthorized) return null;

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style>{`
        body { background-color: #ffffff; color: #212529; font-family: 'Inter', sans-serif; }
        .main-container { padding-top: 50px; padding-bottom: 50px; }
        .header-title { color: #001f3f; font-weight: 800; letter-spacing: -1px; }
        .accent-line { width: 60px; height: 4px; background: #001f3f; margin: 20px auto; border-radius: 2px; }
        .info-box { background-color: #f8f9fa; border-left: 5px solid #001f3f; border-radius: 8px; padding: 20px; }
        .testing-card { background: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); overflow: hidden; }
        .card-label { font-weight: 700; text-transform: uppercase; font-size: 0.75rem; color: #6c757d; letter-spacing: 1px; }
        .form-control-custom { border: 1px solid #dee2e6; padding: 15px; font-size: 1rem; border-radius: 8px; transition: all 0.2s; }
        .form-control-custom:focus { border-color: #001f3f; box-shadow: 0 0 0 4px rgba(0, 31, 63, 0.05); }
        .btn-navy { background-color: #001f3f; color: white; font-weight: 600; border-radius: 8px; padding: 12px; transition: transform 0.1s; border: none; }
        .btn-navy:hover { background-color: #003366; color: white; transform: translateY(-1px); }
        .btn-navy:disabled { background-color: #cccccc; }
        .response-area { background-color: #fcfcfc; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; font-size: 1.05rem; line-height: 1.6; color: #2c3e50; }
        .rl-badge { background: #e9ecef; color: #001f3f; padding: 2px 8px; border-radius: 4px; font-family: monospace; font-size: 0.85rem; }
      `}</style>

      <div className="main-container container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h1 className="header-title">Developer Console</h1>
              <p className="text-muted">
                Testing environment for <strong>{collection_name}</strong>
              </p>
              <div className="accent-line"></div>
            </div>

            <div className="info-box mb-5">
              <h6 className="fw-bold mb-2">Instructions</h6>
              <p className="small text-secondary mb-0">
                Interact with the AI model below. Your feedback directly trains
                the system via
                <span className="rl-badge ms-1">Reinforcement Learning</span>.
              </p>
            </div>

            <div className="testing-card p-4 mb-4">
              <label className="card-label mb-2 d-block">
                Prompt Configuration
              </label>
              <textarea
                className="form-control form-control-custom mb-3"
                rows="4"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your AI model a technical or logical question..."
                disabled={isLoading}
              />
              <button
                className="btn btn-navy w-100 shadow-sm"
                onClick={handleSubmit}
                disabled={isLoading || !question.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Synthesizing...
                  </>
                ) : (
                  "Execute Test"
                )}
              </button>
            </div>

            {response && (
              <div className="testing-card p-4 animate__animated animate__fadeIn">
                <label className="card-label mb-3 d-block">AI Output</label>
                <div className="response-area mb-4 shadow-sm" dir="auto">
                  {response}
                </div>

                <div className="d-flex gap-3 justify-content-center">
                  <button
                    className={`btn ${
                      feedback === "like"
                        ? "btn-success"
                        : "btn-outline-success"
                    } px-4`}
                    onClick={handleLike}
                    disabled={feedback !== null || isLoading}
                  >
                    Accept Response
                  </button>
                  <button
                    className={`btn ${
                      feedback === "dislike"
                        ? "btn-danger"
                        : "btn-outline-danger"
                    } px-4`}
                    onClick={handleDislike}
                    disabled={feedback !== null || isLoading}
                  >
                    Flag Error
                  </button>
                </div>

                {showCorrectAnswerInput && (
                  <div className="mt-4 pt-4 border-top">
                    <label
                      className="card-label mb-2 d-block"
                      style={{ color: "#001f3f" }}
                    >
                      Ground Truth Correction
                    </label>
                    <textarea
                      className="form-control form-control-custom mb-3"
                      rows="3"
                      value={correctAnswer}
                      onChange={(e) => setCorrectAnswer(e.target.value)}
                      placeholder="Enter the correct response..."
                      disabled={isLoading}
                    />
                    <button
                      className="btn btn-navy w-100"
                      onClick={handleCorrectAnswerSubmit}
                      disabled={isLoading || !correctAnswer.trim()}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Updating Weights...
                        </>
                      ) : (
                        "Update Model Weights"
                      )}
                    </button>
                  </div>
                )}

                {(feedback === "like" || feedback === "submitted") && (
                  <div className="alert alert-success mt-4 border-0 text-center">
                    Data logged successfully. Proceeding to next iteration.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
