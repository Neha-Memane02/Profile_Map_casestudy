import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in from previous session
  useEffect(() => {
    const checkAuth = () => {
      const adminToken = localStorage.getItem('admin_token');
      setIsAuthenticated(!!adminToken);
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function - in a real app, this would validate credentials against a backend
  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      // Simple mock authentication
      if (username === 'admin' && password === 'admin123') {
        // Set a mock token in localStorage
        localStorage.setItem('admin_token', 'mock_token_' + Date.now());
        setIsAuthenticated(true);
        resolve(true);
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  // Context value
  const value = {
    isAuthenticated,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};