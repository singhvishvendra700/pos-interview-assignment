import { useState } from "react";
import { allSkills } from "@/utils/skills";

export const useHeatmap = ({ data }) => {
  const candidateIds = Object.keys(data);
  const [selectedSkills, setSelectedSkills] = useState(allSkills);
  const [filteredSkills, setFilteredSkills] = useState(allSkills);
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
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredSkills(
      allSkills.filter((skill) => skill.toLowerCase().includes(query))
    );
  };

  return {
    candidateIds,
    selectedSkills,
    filteredSkills,
    anchorEl,
    handleCheckboxChange,
    toggleFilterDropdown,
    closeFilterDropdown,
    handleSearchChange,
  };
};
