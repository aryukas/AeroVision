import React from "react";
import ResultCard from "./ResultCard";
import HistoryIcon from "@mui/icons-material/History";
import "../styles.css"; // make sure your global CSS is imported

const sampleResults = [
  {
    id: 1,
    aircraft: "F-22 Raptor",
    country: "USA",
    missile: "AIM-120 AMRAAM",
    fileURL: "https://via.placeholder.com/300x180.png?text=F-22+Raptor"
  },
  {
    id: 2,
    aircraft: "Su-57",
    country: "Russia",
    missile: "R-77",
    fileURL: "https://via.placeholder.com/300x180.png?text=Su-57"
  }
];

const ResultHistory = () => {
  return (
    <div className="history-container">
      <div className="history-header">
        <HistoryIcon className="history-icon" />
        <h2 className="history-title">Previous Predictions</h2>
      </div>
      <div className="history-grid">
        {sampleResults.map((result) => (
          <ResultCard key={result.id} result={result} onLearnMore={() => alert(`Details for ${result.aircraft}`)} />
        ))}
      </div>
      {sampleResults.length === 0 && (
        <p className="history-empty">No previous results available.</p>
      )}
    </div>
  );
};

export default ResultHistory;
