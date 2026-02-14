import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from '../../utils/toast';
import { getApiBase } from '../../utils/apiEndpoints';

const DEFAULT_SETTINGS = {
  spamDetection: true, profanityFilter: true, nsfwDetection: true,
  toxicityThreshold: 70, autoTimeout: false, autoDelete: false, warningCount: 3,
};

const useAIModeration = (serverSlug, token) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [recentFlags, setRecentFlags] = useState([]);
  const [stats, setStats] = useState({ messagesScanned: 0, flaggedToday: 0, autoModActions: 0, accuracy: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const loadModeration = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${getApiBase()}/moderation/${serverSlug}/`, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.settings) setSettings(response.data.settings);
      if (response.data.recent_flags) setRecentFlags(response.data.recent_flags);
      if (response.data.stats) setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to load moderation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadModeration(); }, []);

  const saveSettings = async () => {
    try {
      await axios.post(`${getApiBase()}/moderation/${serverSlug}/update/`, { settings }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('✅ Moderation settings saved!');
    } catch (error) {
      console.error('Failed to save:', error);
      toast.error('❌ Failed to save settings');
    }
  };

  const handleAction = async (flagId, action) => {
    try {
      await axios.post(`${getApiBase()}/moderation/flag/${flagId}/action/`, { action }, { headers: { Authorization: `Bearer ${token}` } });
      loadModeration();
    } catch (error) {
      console.error('Action failed:', error);
    }
  };

  return { settings, setSettings, recentFlags, stats, isLoading, saveSettings, handleAction };
};

export default useAIModeration;
