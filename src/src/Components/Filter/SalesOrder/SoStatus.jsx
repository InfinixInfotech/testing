import React, { useState } from "react";

const SoStatus = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [soStatus, setSoStatus] = useState(""); // State to track the selected SoStatus

  const handleToggle = () => {
    setIsDropDown((prevState) => !prevState); // Toggle dropdown visibility
  };

  const handleSoStatusChange = (event) => {
    setSoStatus(event.target.value); // Update soStatus based on the selected option
  };

  const statusOptions = [
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "expired", label: "Expired" },
    { value: "all", label: "All" },
  ];

  return (
    <>
      <button className="filterButton-SoStatus" onClick={handleToggle}>
        {isDropDown ? "Sales Order" : "Sales Order"}
      </button>

      {isDropDown && (
        <div className="dropdown-content-SoStatus">
          <select
            value={soStatus}
            onChange={handleSoStatusChange}
            name="soStatus"
            id="so-status-dropdown"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display selected soStatus */}
      {soStatus && <p>Selected SoStatus: {soStatus}</p>}
    </>
  );
};

export default SoStatus;
