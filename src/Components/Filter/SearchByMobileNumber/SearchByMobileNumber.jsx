import React, { useState } from "react";

const SearchByMobileNumber = () => {
  const [searchByMob, setSearchByMob] = useState('');

  const handleSearchByMobChange = (event) => {
    setSearchByMob(event.target.value); // Track the value of the input field
  };

  const SearchByMobileNumberOptions = [
    { value: '9389856565', label: '9389856565' },
    { value: '4559856565', label: '4559856565' },
    { value: '1234567890', label: '1234567890' },
    { value: '9876543210', label: '9876543210' },
  ];

  // Filter options based on the input value
  const filteredOptions = SearchByMobileNumberOptions.filter(option =>
    option.label.includes(searchByMob) // Check if input value matches any option
  );
 
  return (
    <>
      <input
        type="text"
        className="searchByMob-input"
        placeholder="Search By Mobile Number"
        value={searchByMob}
        onChange={handleSearchByMobChange}
      />
      
      {/* Show dropdown only if there are filtered options */}
      {searchByMob && filteredOptions.length > 0 && (
        <div className="dropdown-content-Filter">
          <ul>
            {filteredOptions.map(option => (
              <li key={option.value}>{option.label}</li>
            ))}
          </ul>
        </div>
      )}
      
      {searchByMob && <p>Selected Mobile Number: {searchByMob}</p>}
    </>
  );
};

export default SearchByMobileNumber;
