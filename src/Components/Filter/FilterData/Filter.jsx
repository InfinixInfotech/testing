import React, { useState } from "react";

const Filter = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [filter, setFilter] = useState(""); // State to track the selected filter

  const handleToggle = () => {
    setIsDropDown((prevState) => !prevState);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update filter based on selection
  };

  const filterOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "thisWeek", label: "This Week" },
    { value: "lastWeek", label: "Last Week" },
    { value: "thisMonth", label: "This Month" },
  ];

  return (
    <>
      <button className="filterButton-Filter" onClick={handleToggle}>
        {isDropDown ? "Filter" : "Filter"}
      </button>

      {isDropDown && (
        <div className="dropdown-content-Filter">
          <select
            value={filter}
            onChange={handleFilterChange}
            name="filter"
            id="filter-dropdown"
          >
            {filterOptions.map((option) => (
              <option
                style={{ textIndent: "10px" }} // Adds horizontal space inside options
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display selected filter */}
      {filter && <p>Selected filter: {filter}</p>}
    </>
  );
};

export default Filter;
