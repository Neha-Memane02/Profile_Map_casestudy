import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile, onSelectProfile }) => {
  const { id, name, photo, description } = profile;

  return (
    <div className="profile-card">
      <div className="profile-photo">
        <img src={photo} alt={`${name}'s profile`} />
      </div>
      <div className="profile-info">
        <h3>{name}</h3>
        <p className="profile-description">{description}</p>
        <div className="profile-actions">
          <button 
            className="summary-btn"
            onClick={() => onSelectProfile(profile)}
          >
            <b>Summary</b>
          </button>
          <Link to={`/profile/${id}`} className="details-link">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;