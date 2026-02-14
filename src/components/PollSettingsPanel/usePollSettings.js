import { useState, useEffect } from 'react';
import { getApiBase } from '../../utils/apiEndpoints';

const DEFAULT_SETTINGS = {
  allow_multiple_votes: true, anonymous_voting: false, show_results_before_end: true,
  default_duration_hours: 24, max_options: 10, min_options: 2, require_role_to_create: false,
  creator_role_id: null, allow_add_options: true, notify_on_end: true, pin_active_polls: false,
  max_active_polls: 5, cooldown_minutes: 30
};

export const formatTimeRemaining = (endTime) => {
  const diff = new Date(endTime) - new Date();
  if (diff <= 0) return 'Ended';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${mins}m remaining`;
};

export default function usePollSettings({ serverId, fetchWithAuth, apiBaseUrl }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('settings');
  const [hasChanges, setHasChanges] = useState(false);
  const [pollTemplates, setPollTemplates] = useState([]);
  const [activePolls, setActivePolls] = useState([]);

  useEffect(() => { loadSettings(); }, [serverId]);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const baseUrl = apiBaseUrl || getApiBase();
      if (fetchWithAuth && serverId) {
        const r = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/poll-settings/`);
        if (r.ok) {
          const data = await r.json();
          setSettings(data.settings || DEFAULT_SETTINGS);
          setPollTemplates(data.templates || []);
          setActivePolls(data.active_polls || []);
        } else { setSettings(DEFAULT_SETTINGS); setPollTemplates([]); setActivePolls([]); }
      } else { setSettings(DEFAULT_SETTINGS); setPollTemplates([]); setActivePolls([]); }
    } catch (e) { console.error('Error loading poll settings:', e); setSettings(DEFAULT_SETTINGS); setPollTemplates([]); setActivePolls([]); }
    setLoading(false);
  };

  const handleSettingChange = (key, value) => { setSettings(s => ({ ...s, [key]: value })); setHasChanges(true); };

  const saveSettings = async () => {
    try {
      const baseUrl = apiBaseUrl || getApiBase();
      if (fetchWithAuth && serverId) {
        const r = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/poll-settings/`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
        if (r.ok) setHasChanges(false);
      }
    } catch (e) { console.error('Error saving poll settings:', e); }
  };

  const resetSettings = () => { setSettings(DEFAULT_SETTINGS); setHasChanges(false); };

  return { settings, loading, activeTab, setActiveTab, hasChanges, pollTemplates, activePolls, handleSettingChange, saveSettings, resetSettings };
}
