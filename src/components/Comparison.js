"use client";
import { useState } from "react";
import CandidateList from "./CandidateList";
import HeatMap from "./HeatMap";
import "./comparison.css";

export const Comparison = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCandidatesData, setSelectedCandidateData] = useState({});

  return (
    <div className="wrapper">
      <div className="candidates">
        <p>{selectedCandidates?.length} Candidates</p>
      </div>
      <div className="content-wrapper">
        <CandidateList
          selectedCandidates={selectedCandidates}
          setSelectedCandidates={setSelectedCandidates}
          selectedCandidatesData={selectedCandidatesData}
          setSelectedCandidateData={setSelectedCandidateData}
        />
        <HeatMap data={selectedCandidatesData} />
      </div>
    </div>
  );
};
