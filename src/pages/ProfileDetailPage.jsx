import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MapView from '../components/map/MapView';
import LoadingIndicator from '../components/common/LoadingIndicator';
import { fetchProfileById } from '../services/api';

const ProfileDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchProfileById(id);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProfileDetails();
  }, [id]);

  if (loading) return <LoadingIndicator />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!profile) return <div className="not-found">Profile not found</div>;

  return (
    <div className="profile-detail-page">
      <button 
        className="back-button"
        onClick={() => navigate(-1)}
      >
        Back to List
      </button>
      
      <div className="profile-header">
        <div className="profile-photo-large">
          <img src={profile.photo} alt={`${profile.name}'s profile`} />
        </div>
        <div className="profile-header-info">
          <h1>{profile.name}</h1>
          <p className="profile-title">{profile.title}</p>
          <p className="profile-contact">Email: {profile.email}</p>
          <p className="profile-contact">Phone: {profile.phone}</p>
        </div>
      </div>
      
      <div className="profile-detail-content">
        <div className="profile-about">
          <h2>About</h2>
          <p>{profile.description}</p>
          
          <h3>Interests</h3>
          <ul className="interest-list">
            {profile.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
          
          <h3>Skills</h3>
          <div className="skills-container">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
        
        <div className="profile-location">
          <h2>Location</h2>
          <MapView 
            profile={profile} 
            center={[profile.address.lat, profile.address.lng]} 
            zoom={14}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;