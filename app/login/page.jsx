"use client";

import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://165.227.11.150/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setSuccess("Login successful! Redirecting...");
      localStorage.setItem("token", data.access_token);

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style>{`
        body { 
          background-color: #f8f9fa; 
          color: #333333; 
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-card { 
          background-color: #ffffff; 
          border: 1px solid #e0e0e0; 
          border-top: 5px solid #001f3f; /* Dark Blue Accent Bar */
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          width: 100%;
          max-width: 400px;
        }

        .title-dark-blue {
          color: #001f3f; /* Dark Blue Title */
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .form-label { 
          color: #555; 
          font-weight: 600; 
          font-size: 0.9rem; 
        }
        
        .form-control { 
          border: 1px solid #ced4da;
          padding: 0.6rem 0.75rem;
          border-radius: 4px;
        }

        .form-control:focus { 
          border-color: #001f3f; /* Blue focus border */
          box-shadow: 0 0 0 0.2rem rgba(0, 31, 63, 0.1);
        }
        
        .btn-dark-blue { 
          background-color: #001f3f; 
          color: #ffffff; 
          border: none; 
          border-radius: 4px;
          padding: 10px;
          font-weight: 600;
          transition: background-color 0.2s ease;
        }

        .btn-dark-blue:hover { 
          background-color: #003366; 
          color: #ffffff;
        }

        .btn-dark-blue:disabled { 
          background-color: #cccccc; 
        }

        .footer-text {
          color: #999;
          font-size: 0.85rem;
        }
      `}</style>

      <div className="login-container px-3">
        <div className="login-card p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="title-dark-blue mb-1">Account Login</h2>
            <p className="text-muted small">Please enter your details to sign in</p>
          </div>

          {error && <div className="alert alert-danger py-2 small border-0 bg-light text-danger">{error}</div>}
          {success && <div className="alert alert-success py-2 small border-0 bg-light text-success">{success}</div>}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="e.g. user@domain.com"
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button
            type="button"
            className="btn btn-dark-blue w-100 mb-3"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <><span style={{color:"#EA7946"}} className="spinner-border spinner-border-sm me-2"></span>Signing in...</>
            ) : "Login"}
          </button>

          <div className="text-center">
            <small className="footer-text">
              &copy; 2026 Zuccess - AMT
            </small>
          </div>
        </div>
      </div>
    </>
  );
}