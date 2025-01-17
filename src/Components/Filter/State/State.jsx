import React, { useState } from "react";

const State = () => {
  const [IsDropDown, setIsDropDown] = useState(false);
  const [selectState, setSelectState] = useState("");

  const handleToggle = () => {
    setIsDropDown((prevState) => !prevState);
  };
  const handleStateChange = (event) => {
    setSelectState(event.target.value);
  };

  const StateOptions = [
    { value: "madhyaPradesh", lable: "Madhya Pradesh" },
    { value: "maharashtra", lable: "Maharashtra" },
    { value: "gujarat", lable: "Gujarat" },
    { value: "haryana", lable: "Haryana" },
  ];

  return (
    <>
      <button onClick={handleToggle}>
        {IsDropDown ? "Select State" : "Select State"}
      </button>

      {IsDropDown && (
        <div className="dropdown-content-Filter">
          <select
            value={selectState}
            onChange={handleStateChange}
            name="state"
            id="state-dropDown"
          >
            {StateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.lable}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectState && <p>Selected State: {selectState}</p>}
    </>
  );
};

export default State;
