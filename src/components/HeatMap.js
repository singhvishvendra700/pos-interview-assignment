import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import "./heatmap.css";
import { allSkills } from "@/utils/skills";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
const HeatMap = ({ data }) => {
  const candidateIds = Object.keys(data);
  const [selectedSkills, setSelectedSkills] = useState(allSkills);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCheckboxChange = (skill) => {
    setSelectedSkills((prevSelected) =>
      prevSelected.includes(skill)
        ? prevSelected.filter((s) => s !== skill)
        : [...prevSelected, skill]
    );
  };

  const toggleFilterDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeFilterDropdown = () => {
    setAnchorEl(null);
  };

  return (
    <div className="heatmap-container">
      <div className={candidateIds.length === 0 ? "overlay" : ""}>
        <div className="heatmap-tabs">
          <button className="tab-button active">Compare View</button>
          <button className="tab-button">Individual View</button>
          <button className="tab-button">Shortlisted Candidates</button>
        </div>

        <button
          variant="outlined"
          onClick={toggleFilterDropdown}
          disabled={candidateIds.length === 0}
          size="small"
          className="filter-button"
        >
          Filters <FilterAltIcon />
        </button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeFilterDropdown}
          PaperProps={{
            sx: {
              boxShadow: "none",
              border: "1px solid #ccc",
            },
          }}
        >
          <div className="skill-filter-container">
            <input
              type="text"
              placeholder="Search skill..."
              className="skill-search"
              onChange={(e) => {
                const query = e.target.value.toLowerCase();
                setSelectedSkills(
                  allSkills.filter((skill) =>
                    skill.toLowerCase().includes(query)
                  )
                );
              }}
            />
            <div className="skill-checkbox-grid">
              {allSkills.map((skill) => (
                <FormControlLabel
                  key={skill}
                  control={
                    <Checkbox
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleCheckboxChange(skill)}
                      color="primary"
                    />
                  }
                  label={skill}
                />
              ))}
            </div>
          </div>
        </Menu>

        <table className="heatmap-table">
          <thead>
            <tr>
              <th className="skill-header"></th>
              {candidateIds.map((id) => (
                <th key={id} className="candidate-header">
                  {data[id].candidateName
                    .split(" ")
                    .map((part) => part[0])
                    .join(".")
                    .toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedSkills.map((skill) => (
              <tr key={skill} className="heatmap-row">
                <td className="skill-cell">{skill}</td>
                {candidateIds.map((candidateId) => {
                  const skillData = data[candidateId].skills.find(
                    (item) => item.name === skill
                  );
                  const score = skillData ? skillData.score : 0;

                  const intensityClass =
                    score === 0
                      ? "empty"
                      : score === 1
                      ? "low"
                      : score === 2
                      ? "medium"
                      : score === 3
                      ? "high"
                      : "very-high";

                  return (
                    <td key={`${candidateId}-${skill}`} className="heat-cell">
                      <div className={`heat-block ${intensityClass}`}></div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {candidateIds.length === 0 && (
        <div className="no-candidate-cell">
          <p className="select-candidate-btn">
            Please select candidate to proceed
          </p>
        </div>
      )}
    </div>
  );
};

export default HeatMap;
