import { Checkbox, FormControlLabel, Menu } from "@mui/material";
import "./HeatMap.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useHeatmap } from "./useHeatmap";

const HeatMap = ({ data }) => {
  const {
    candidateIds,
    selectedSkills,
    filteredSkills,
    anchorEl,
    handleCheckboxChange,
    toggleFilterDropdown,
    closeFilterDropdown,
    handleSearchChange,
  } = useHeatmap({ data });

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
              onChange={handleSearchChange}
            />
            <div className="skill-checkbox-grid">
              {filteredSkills.map((skill) => (
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
