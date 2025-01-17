import React, { useState } from "react";

const Status = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [status, setStatus] = useState(""); // Track selected status

  const handleToggle = () => {
    setIsDropDown((prevState) => !prevState);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Update status based on the selection
  };

  const statusOptions = [
    { value: "futureFollow", label: "Future Follow" },
    { value: "interested", label: "Interested" },
    { value: "notInterested", label: "Not Interested" },
    { value: "notReachable", label: "Not Reachable" },
    { value: "npe", label: "Npe" },
    { value: "paidClient", label: "Paid Client" },
    { value: "switchOff", label: "Switch Off" },
  ];

  return (
    <>
      <button className="filterButton-Status" onClick={handleToggle}>
        {isDropDown ? "Status" : "Status"}
      </button>

      {isDropDown && (
        <div className="dropdown-content-Status">
          <select
            value={status}
            onChange={handleStatusChange}
            name="status"
            id="status-dropdown"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {status && <p>Selected status: {status}</p>}
    </>
  );
};

export default Status;
