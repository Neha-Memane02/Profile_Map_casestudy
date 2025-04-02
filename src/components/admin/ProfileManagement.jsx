import React, { useState, useEffect } from 'react';
import ProfileForm from '../profiles/ProfileForm';
import LoadingIndicator from '../common/LoadingIndicator';
import { fetchProfiles, createProfile, updateProfile, deleteProfile } from '../../services/api';

const ProfileManagement = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const data = await fetchProfiles();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  const handleCreateProfile = async (profileData) => {
    try {
      setLoading(true);
      const newProfile = await createProfile(profileData);
      setProfiles([...profiles, newProfile]);
      setIsFormOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (profileData) => {
    try {
      setLoading(true);
      const updatedProfile = await updateProfile(profileData.id, profileData);
      setProfiles(profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p));
      setSelectedProfile(null);
      setIsFormOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        setLoading(true);
        await deleteProfile(id);
        setProfiles(profiles.filter(p => p.id !== id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const openCreateForm = () => {
    setSelectedProfile(null);
    setIsFormOpen(true);
  };

  const openEditForm = (profile) => {
    setSelectedProfile(profile);
    setIsFormOpen(true);
  };

  if (loading && !isFormOpen) return <LoadingIndicator />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="profile-management">
      <div className="management-header">
        <h2>Profile Management</h2>
        <button 
          className="create-profile-btn"
          onClick={openCreateForm}
        >
          Create New Profile
        </button>
      </div>
      
      {isFormOpen ? (
        <ProfileForm 
          profile={selectedProfile}
          onSubmit={selectedProfile ? handleUpdateProfile : handleCreateProfile}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : (
        <div className="profiles-table-container">
          <table className="profiles-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map(profile => (
                <tr key={profile.id}>
                  <td>
                    <img 
                      src={profile.photo} 
                      alt={profile.name} 
                      className="profile-thumbnail" 
                    />
                  </td>
                  <td>{profile.name}</td>
                  <td>{profile.address.city}, {profile.address.country}</td>
                  <td className="action-buttons">
                    <button 
                      className="edit-btn"
                      onClick={() => openEditForm(profile)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteProfile(profile.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileManagement;