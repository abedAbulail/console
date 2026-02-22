"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (pathname === "/login") return null;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style>{`
        :root {
          --dark-blue: #0a192f;
          --light-blue: #112240;
          --accent-orange: #EA7946;
          --text-gray: #a8b2d1;
        }

        .sidebar-custom {
          width: 260px;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          background-color: var(--dark-blue);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          z-index: 1050;
          transition: all 0.3s ease;
        }

        .nav-link-custom {
          color: var(--text-gray);
          transition: all 0.2s ease;
          padding: 0.8rem 1rem;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .nav-link-custom:hover {
          color: #ffffff;
          background-color: var(--light-blue);
        }

        .nav-link-custom.active {
          color: #ffffff;
          background-color: var(--light-blue);
          border-left: 4px solid var(--accent-orange);
          font-weight: 600;
        }

        .brand-section {
          padding: 0 1rem 2rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 2rem;
        }

        .color_theme {
          color: var(--accent-orange);
          font-weight: 700;
          font-size: 1.25rem;
          text-decoration: none;
        }

        .logout-btn-container {
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1rem;
        }

        /* Responsive Logic */
        .mobile-toggle {
          display: none;
          position: fixed;
          top: 15px;
          left: 15px;
          z-index: 1100;
          background: var(--dark-blue);
          color: white;
          border: 1px solid var(--accent-orange);
          padding: 8px 12px;
          border-radius: 5px;
        }

        @media (max-width: 991px) {
          .sidebar-custom {
            left: ${isOpen ? "0" : "-260px"};
            box-shadow: ${isOpen ? "10px 0 30px rgba(0,0,0,0.5)" : "none"};
          }
          .mobile-toggle {
            display: block;
          }
          /* Overlay when sidebar is open on mobile */
          .sidebar-overlay {
            display: ${isOpen ? "block" : "none"};
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            z-index: 1040;
          }
        }
      `}</style>

      {/* Mobile Menu Button */}
      <button className="mobile-toggle" onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </button>

      {/* Overlay for mobile */}
      <div className="sidebar-overlay" onClick={toggleSidebar}></div>

      <div className="sidebar-custom">
        <div className="brand-section d-flex justify-content-between align-items-center">
          <Link href="/" className="color_theme">
            AMT CONSOLE
          </Link>
          {/* Close button inside sidebar for mobile */}
          <button
            className="btn d-lg-none text-white p-0"
            onClick={toggleSidebar}
          >
            ✕
          </button>
        </div>

        <nav className="nav flex-column">
          <Link
            href="/"
            className={`nav-link-custom ${pathname === "/" ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="me-3"
              viewBox="0 0 16 16"
            >
              <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9M3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708z" />
              <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
            </svg>
            Console
          </Link>

          <Link
            href="/history"
            className={`nav-link-custom ${
              pathname === "/history" ? "active" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="me-3"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
            </svg>
            History
          </Link>
        </nav>

        <div className="logout-btn-container">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="nav-link-custom w-100 bg-transparent border-0 text-start text-danger"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="me-3"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V5h-1V3.5A1.5 1.5 0 0 1 10.5 2h3A1.5 1.5 0 0 1 15 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 12.5V11h1z"
              />
              <path
                fillRule="evenodd"
                d="M4.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L5.707 7.5H12.5a.5.5 0 0 1 0 1H5.707l1.147 1.146a.5.5 0 0 1-.708.708z"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
