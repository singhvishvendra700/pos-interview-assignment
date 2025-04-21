"use client";
import { useState } from "react";
import CandidateList from "./CandidateList";
import HeatMap from "./HeatMap";
import "./comparison.css";

export const Comparison = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCandidatesData, setSelectedCandidateData] = useState({});
  const job_name = "Post_UXdesigner_sr001";
  return (
    <div className="wrapper">
      <div className="header">
        <div className="back-to-jobs">
          <p>Back to My Jobs</p>
        </div>
        <div className="text-wrapper">
          <h2 className="name">{job_name}</h2>
          <p className="count">{selectedCandidates?.length} Candidates</p>
        </div>
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
