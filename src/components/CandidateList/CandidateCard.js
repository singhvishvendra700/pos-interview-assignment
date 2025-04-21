import React from "react";
import "./CandidateList.css";
import { API_URL } from "@/utils/config";

const CandidateCard = ({
  candidate,
  isSelected,
  isPreferred,
  selectedCandidates,
  setSelectedCandidates,
  setSelectedCandidateData,
}) => {
  const updateCandidatesData = async () => {
    try {
      const candidateData = await fetch(`${API_URL}/${candidate.id}`);
      const response = await candidateData.json();

      const resultResponse = response?.data?.data?.skillset?.flatMap(
        (skill) => {
          return skill?.skills?.map((item) => {
            return {
              name: item?.name,
              score: item?.pos[0]?.consensus_score,
            };
          });
        }
      );

      const candidateSkills = {
        [candidate.id]: {
          candidateId: candidate.id,
          candidateName: candidate.name,
          skills: resultResponse,
        },
      };

      setSelectedCandidateData((prev) => ({
        ...prev,
        ...candidateSkills,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const onSelect = (candiateItem) => {
    if (selectedCandidates.some((c) => c.id === candiateItem.id)) {
      setSelectedCandidates((prev) =>
        prev.filter((c) => c.id !== candiateItem.id)
      );
      setSelectedCandidateData((prev) =>
        Object.keys(prev)
          .filter((key) => key !== candiateItem.id)
          .reduce((obj, key) => {
            obj[key] = prev[key];
            return obj;
          }, {})
      );
      return;
    }
    setSelectedCandidates((prev) => [...prev, candiateItem]);
    updateCandidatesData();
  };

  const cardClass = `candidate-card ${
    isPreferred && !isSelected ? "preferred" : ""
  } ${isSelected ? "selected" : ""}`;

  return (
    <div className={cardClass} onClick={() => onSelect(candidate)}>
      <span className="candidate-name">{candidate.name}</span>
      <button className="add-button">+</button>
    </div>
  );
};

export default CandidateCard;
