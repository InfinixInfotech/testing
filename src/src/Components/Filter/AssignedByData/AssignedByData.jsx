import React, { useState } from "react";

const AssignedByDate = () => {
  const [isDropDown, setIsDropDown] = useState(false); // Controls dropdown visibility
  const [selectedEmployee, setSelectedEmployee] = useState(""); // Tracks selected employee

  const handleToggle = () => {
    setIsDropDown((prevState) => !prevState); // Toggles dropdown visibility
  };

  const handleEmployeeSelect = (event) => {
    setSelectedEmployee(event.target.value); // Updates selected employee
  };

  const employeeOptions = [
    { value: "johnDoe", label: "John Doe" },
    { value: "janeSmith", label: "Jane Smith" },
    { value: "michaelBrown", label: "Michael Brown" },
    { value: "emilyDavis", label: "Emily Davis" },
  ];

  return (
    <>
      <button className="filterButton-AssignedByData" onClick={handleToggle}>
        {isDropDown ? "Assined By Date" : "Assined By Date"}
      </button>

      {isDropDown && (
        <div className="dropdown-content-AssignedByDate">
          <select
            value={selectedEmployee}
            onChange={handleEmployeeSelect}
            name="employee"
            id="employee-dropdown"
          >
            {employeeOptions.map((option) => (
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
      {selectedEmployee && <p>Selected Employee: {selectedEmployee}</p>}
    </>
  );
};

export default AssignedByDate;
