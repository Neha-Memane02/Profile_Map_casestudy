import React, { useState } from 'react';
import ProfileList from '../components/profiles/ProfileList';
import ProfileSearch from '../components/profiles/ProfileSearch';
import MapView from '../components/map/MapView';
import LoadingIndicator from '../components/common/LoadingIndicator';
import { useProfiles } from '../hooks/useProfiles';

const HomePage = () => {
  const { profiles, loading, error } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Filter profiles based on search term and filters
  const filteredProfiles = profiles.filter(profile => {
    // Simple search by name
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply additional filters if any
    let matchesFilters = true;
    Object.entries(filters).forEach(([key, value]) => {
      if (value && profile[key] !== value) {
        matchesFilters = false;
      }
    });
    
    return matchesSearch && matchesFilters;
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <div className="error-message">Error loading profiles: {error.message}</div>;

  return (
    <div className="home-page">
      <div className="search-section">
        <ProfileSearch 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange}
        />
      </div>
      
      <div className="content-container">
        <div className="profiles-section">
          <h2>USER PROFILES</h2>
          <ProfileList 
            profiles={filteredProfiles} 
            onSelectProfile={handleSelectProfile} 
          />
        </div>
        
        <div className="map-section">
          {selectedProfile ? (
            <MapView 
              profile={selectedProfile} 
              center={[selectedProfile.address.lat, selectedProfile.address.lng]} 
              zoom={13}
            />
          ) : (
            <div className="map-placeholder">
              <p>Select a profile to view on map</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;