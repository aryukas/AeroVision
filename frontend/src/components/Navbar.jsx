import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaHistory, FaUpload, FaSignOutAlt } from "react-icons/fa";
import "../styles.css";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">AeroVision</div>
      <ul className="navbar-links">
        <li>
          <Link to="/dashboard">
            <FaHome className="icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/upload">
            <FaUpload className="icon" /> Upload
          </Link>
        </li>
        <li>
          <Link to="/history">
            <FaHistory className="icon" /> History
          </Link>
        </li>
      </ul>
      <button className="logout-btn" onClick={onLogout}>
        <FaSignOutAlt className="icon" /> Logout
      </button>
    </nav>
  );
}

export default Navbar;
