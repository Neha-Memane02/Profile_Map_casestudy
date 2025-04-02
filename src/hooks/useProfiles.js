import { useState, useEffect } from 'react';
import { fetchProfiles } from '../services/api';

export const useProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        setLoading(true);
        const data = await fetchProfiles();
        setProfiles(data);
        setError(null);
      } catch (err) {
        setError(err);
        console.error('Error fetching profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    getProfiles();
  }, [refreshTrigger]);

  const refreshProfiles = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return { profiles, loading, error, refreshProfiles };
};