import React, { useState, useEffect } from 'react';
import AdminAuth from '../components/admin/AdminAuth';
import ProfileManagement from '../components/admin/ProfileManagement';
import { useAuth } from '../contexts/AuthContext';

const AdminPage = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      
      {!isAuthenticated ? (
        <AdminAuth />
      ) : (
        <ProfileManagement />
      )}
    </div>
  );
};

export default AdminPage;