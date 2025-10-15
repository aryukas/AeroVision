// src/pages/Dashboard.jsx
import React from "react";
import { FaChartLine, FaUpload, FaHistory } from "react-icons/fa";
import "../styles.css"; // make sure path is correct

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to AeroVision Dashboard</h1>
      <p className="dashboard-subtitle">
        Manage predictions, uploads, and results efficiently.
      </p>

      <div className="dashboard-grid">
        {/* Analytics Card */}
        <div className="dashboard-card analytics-card">
          <FaChartLine className="dashboard-icon" />
          <h2>Analytics</h2>
          <p>We can predict aircraft here Airbus Boeing f16 KAI Sukhoi and Cargo planes .</p>
        </div>

        {/* Upload Card */}
        <div className="dashboard-card upload-card">
          <FaUpload className="dashboard-icon" />
          <h2>Upload</h2>
          <p>Upload images in jpg & png file format we can predict them.</p>
        </div>

        {/* History Card */}
        <div className="dashboard-card history-card">
          <FaHistory className="dashboard-icon" />
          <h2>History</h2>
          <p>Currently we are working on it.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
