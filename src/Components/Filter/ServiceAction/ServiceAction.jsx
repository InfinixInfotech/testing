import React, { useState } from "react";

const ServiceAction = () => {
  const [IsDropDown, setIsDropDown] = useState(false);
  const handleToggle = () => {
    setIsDropDown((prevState)=>!prevState);
  };
  return (
    <>
      <button className="filterButton-ServiceAction" onClick={handleToggle}>
        {IsDropDown ? 'Service Action' : 'Service Action'}
      </button>

      {IsDropDown && (
        <div className="dropdown-content-Filter">
          {/* <ul><li>this is Service Action</li></ul>  */}
        </div>
      )}
    </>
  );
};

export default ServiceAction;
