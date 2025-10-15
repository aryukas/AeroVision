import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import Dashboard from "./Dashboard";
import UploadPage from "../components/UploadPage";
import ResultHistory from "../components/ResultHistory";
import Navbar from "../components/Navbar";
import "../App.css";
import "./../styles.css"; // Make sure path is correct

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Triggered on successful login
  const handleLoginSuccess = () => setIsAuthenticated(true);

  // Triggered when user clicks logout
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      {/* Show Navbar only when authenticated */}
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/upload"
          element={
            isAuthenticated ? <UploadPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/history"
          element={
            isAuthenticated ? <ResultHistory /> : <Navigate to="/" replace />
          }
        />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
