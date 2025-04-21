"use client";
import React, { useEffect, useState } from "react";
import CandidateCard from "./CandidateCard";
import "./CandidateList.css";
import { API_URL } from "@/utils/config";

const CandidateList = ({
  selectedCandidates,
  setSelectedCandidates,
  selectedCandidatesData,
  setSelectedCandidateData,
}) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCandidates = async () => {
    setLoading(true);
    try {
      const candidateData = await fetch(API_URL);
      const response = await candidateData.json();
      setCandidates(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <div className="candidate-list-container">
      <h2 className="title">Most recommended</h2>

      {loading ? (
        <div className="loading-container">Loading</div>
      ) : (
        <div className="candidate-list">
          {candidates?.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isSelected={selectedCandidates.some((c) => c.id === candidate.id)}
              selectedCandidates={selectedCandidates}
              setSelectedCandidates={setSelectedCandidates}
              selectedCandidatesData={selectedCandidatesData}
              setSelectedCandidateData={setSelectedCandidateData}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateList;
