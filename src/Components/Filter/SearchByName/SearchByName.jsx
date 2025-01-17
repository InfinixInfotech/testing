import React, { useState } from "react";

const SearchByName = () => {
  const [searchByName, setSearchByName] = useState('');

  const handleSearchByNameChange = (event) => {
    setSearchByName(event.target.value); // Track the value of the input field
  };

  const names = [
    { value: 'John Doe', label: 'John Doe' },
    { value: 'Jane Smith', label: 'Jane Smith' },
    { value: 'Michael Johnson', label: 'Michael Johnson' },
    { value: 'Emily Davis', label: 'Emily Davis' },
    { value: 'Chris Brown', label: 'Chris Brown' },
  ];

  // Filter names based on the input value
  const filteredNames = names.filter((option) =>
    option.label.toLowerCase().includes(searchByName.toLowerCase()) // Case insensitive search
  );

  return (
    <>
      <input
        type="text"
        className="searchByName-input"
        placeholder="Search By Name"
        value={searchByName}
        onChange={handleSearchByNameChange}
      />
      
      {/* Show dropdown only if there are filtered names */}
      {searchByName && filteredNames.length > 0 && (
        <div className="dropdown-content-Filter">
          <ul>
            {filteredNames.map((option) => (
              <li key={option.value}>{option.label}</li>
            ))}
          </ul>
        </div>
      )}
      
      {searchByName && <p>Selected Name: {searchByName}</p>}
    </>
  );
};

export default SearchByName;
