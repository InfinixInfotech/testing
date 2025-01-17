import React, { useState } from "react";

const Segment = () => {
  const [IsDropDown, setIsDropDown] = useState(false);
  const [segment, setSegment] = useState('')

  const handleToggle = () => {
    setIsDropDown((prevState)=>!prevState);
  };
  const handleSegment = (event)=>{
     setSegment(event.target.value)
  }

  const segmentOption = [
    {value : 'gold', lable : 'Gold'},
    {value : 'stockCash', lable : 'Stock Cash'},
    {value : 'stockOption', lable : 'Stock Option'},
  ]
  return (
    <>
      <button className="filterButton-Segment" onClick={handleToggle}>
        {IsDropDown ? 'Segment' : 'Segment'}
      </button>

      {IsDropDown && (
        <div className="dropdown-content-Filter">
           <select value={segment}  onChange={handleSegment} name="segment" id="segment-dropdown">
            {segmentOption.map((option)=>(
              <option key={option.value} value={option.value}>{option.lable}</option>
            ))}
           </select>
        </div>
      )}
      {segment && (
        <p>Selected Segment: {segment}</p>
      )}
    </>
  );
};

export default Segment;
