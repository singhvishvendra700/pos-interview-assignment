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
  const [preferredCandidates, setPreferredCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCandidates = async () => {
    setLoading(true);
    try {
      const candidateData = await fetch(API_URL);
      const response = await candidateData.json();
      setCandidates(response);
      const shuffled = [...response].sort(() => 0.5 - Math.random());
      const preferred = shuffled.slice(0, 3);
      setPreferredCandidates(preferred);
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
        <div className="candidate-wrapper">
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        <div className="candidate-wrapper">
          <div className="candidate-group selected-group">
            {preferredCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={selectedCandidates.some(
                  (c) => c.id === candidate.id
                )}
                isPreferred={true}
                selectedCandidates={selectedCandidates}
                setSelectedCandidates={setSelectedCandidates}
                selectedCandidatesData={selectedCandidatesData}
                setSelectedCandidateData={setSelectedCandidateData}
              />
            ))}

            <p className="recommendation-note">
              Recommendations are based on your skill requirements and
              candidates performance.
            </p>
          </div>

          <div className="candidate-group">
            {candidates
              .filter(
                (candidate) =>
                  !preferredCandidates.some((p) => p.id === candidate.id)
              )
              .map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={selectedCandidates.some(
                    (c) => c.id === candidate.id
                  )}
                  isPreferred={false}
                  selectedCandidates={selectedCandidates}
                  setSelectedCandidates={setSelectedCandidates}
                  selectedCandidatesData={selectedCandidatesData}
                  setSelectedCandidateData={setSelectedCandidateData}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
