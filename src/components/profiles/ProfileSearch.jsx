import React, { useState } from 'react';

const ProfileSearch = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    onFilterChange({ location: newLocation });
  };
  
  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </div>
      </form>
      
      <div className="filter-controls">
        <label className="filter-label">
          Filter by Location:
          <select 
            value={location} 
            onChange={handleLocationChange}
            className="filter-select"
          >
            <option value="">All Locations</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Miami">Miami</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default ProfileSearch;