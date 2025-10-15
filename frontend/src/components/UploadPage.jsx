import React, { useState } from "react";
import { predictFile } from "../api/api";
import { FaCloudUploadAlt, FaFileAlt, FaCheckCircle } from "react-icons/fa";
import "../styles.css";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    setLoading(true);
    setResult(null);

    try {
      const res = await predictFile(file);
      setResult(res);
    } catch (err) {
      alert("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2 className="upload-title">Upload Image for Prediction</h2>
        <FaCloudUploadAlt className="upload-icon" />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="upload-btn"
        >
          {loading ? "Analyzing..." : "Predict"}
        </button>

        {result && (
          <div className="result-card">
            <FaCheckCircle className="result-icon" />
            <p><strong>Filename:</strong> {result.filename}</p>
            <p><strong>Prediction:</strong> {result.prediction}</p>
            <p><strong>Confidence:</strong> {result.confidence}</p>
          </div>
        )}
      </div>
    </div>
  );
}
