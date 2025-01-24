import React, { useState } from "react";

const Manager = () => {
  const [isDropDown, setIsDropDown] = useState(false); // Controls dropdown visibility
  const [managerData, setManagerData] = useState(""); // Tracks selected employee

  const handleToggle = () => {
    setIsDropDown((prevState) => !prevState); // Toggles dropdown visibility
  };

  const handleManagerData = (event) => {
    setSelectedEmployee(event.target.value); // Updates selected employee
  };

  const ManagerDataOptions = [{ value: "managerName", label: "Manager Name" }];

  return (
    <>
      <button className="filterButton-AssignedByData" onClick={handleToggle}>
        {isDropDown ? "Manager" : "Manager"}
      </button>

      {isDropDown && (
        <div className="dropdown-content-ManagerData">
          <select
            value={managerData}
            onChange={handleManagerData}
            name="employee"
            id="employee-dropdown"
          >
            {ManagerDataOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                style={{ textIndent: "10px" }} // Adds horizontal spacing
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display selected employee */}
      {managerData && <p>Selected Employee: {managerData}</p>}
    </>
  );
};

export default Manager;
