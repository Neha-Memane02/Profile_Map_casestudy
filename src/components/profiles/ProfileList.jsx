import React from 'react';
import ProfileCard from './ProfileCard';
import { Link } from 'react-router-dom';

const ProfileList = ({ profiles, onSelectProfile }) => {
  if (!profiles.length) {
    return <div className="no-profiles">No profiles found.</div>;
  }

  return (
    <div className="profile-list">
      {profiles.map(profile => (
        <ProfileCard 
          key={profile.id} 
          profile={profile}
          onSelectProfile={onSelectProfile}
        />
      ))}
    </div>
  );
};

export default ProfileList;