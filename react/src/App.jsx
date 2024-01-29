import React, { useState, useEffect } from 'react';
import PlaceData from './resources/countryData.json';

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Reset suggestions and show dropdown when input is not empty
    if (value.trim() !== '') {
      setShowSuggestions(true);

      // Filter suggestions based on the input value
      const filteredSuggestions = PlaceData.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );

      // Update the suggestions state
      setSuggestions(filteredSuggestions);
    } else {
      // Reset suggestions and hide dropdown when input is empty
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    // Implement the logic to perform the search with the selected suggestion or the entered term
    console.log('Search', searchTerm);
  };

  const handleKeyDown = (event) => {
    // Hide suggestions on Escape key press
    if (event.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    // Add event listener for the Escape key
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className='txt'>
        <h1>Search</h1>
        <input
          type='text'
          className='box'
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className='search' onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Display suggestions in a dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className='dropdown'>
          <select
            size={suggestions.length > 5 ? 5 : suggestions.length}
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            {suggestions.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}