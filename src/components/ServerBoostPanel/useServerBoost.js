import { useState, useEffect } from 'react';
import { toast } from '../../utils/toast';

export const PERKS = [
  { level: 1, icon: '🎨', name: '128 Emoji Slots', description: 'Upload up to 128 custom emojis' },
  { level: 1, icon: '🎵', name: '128kbps Audio', description: 'Higher quality voice channels' },
  { level: 1, icon: '🖼️', name: 'Animated Icon', description: 'Set an animated server icon' },
  { level: 1, icon: '🌟', name: 'Custom Invite Background', description: 'Customize your invite splash' },
  { level: 2, icon: '😀', name: '256 Emoji Slots', description: 'Even more custom emojis' },
  { level: 2, icon: '🎤', name: '256kbps Audio', description: 'Crystal clear voice quality' },
  { level: 2, icon: '📤', name: '50MB Upload Limit', description: 'Share larger files' },
  { level: 2, icon: '🎬', name: '1080p Screen Share', description: 'HD screen sharing' },
  { level: 3, icon: '🎭', name: '500 Emoji Slots', description: 'Maximum emoji capacity' },
  { level: 3, icon: '🎧', name: '384kbps Audio', description: 'Professional audio quality' },
  { level: 3, icon: '📦', name: '100MB Upload Limit', description: 'Share even larger files' },
  { level: 3, icon: '🔗', name: 'Custom Vanity URL', description: 'Custom server invite link' },
];

export const getBoostLevel = (boostCount) => {
  if (boostCount >= 30) return { level: 3, name: 'Level 3', color: '#9b59b6' };
  if (boostCount >= 15) return { level: 2, name: 'Level 2', color: '#e91e63' };
  if (boostCount >= 2) return { level: 1, name: 'Level 1', color: '#5865f2' };
  return { level: 0, name: 'No Level', color: '#99aab5' };
};

export const getNextLevelProgress = (boostCount) => {
  if (boostCount >= 30) return { current: boostCount, target: 30, percentage: 100 };
  if (boostCount >= 15) return { current: boostCount, target: 30, percentage: ((boostCount - 15) / 15) * 100 };
  if (boostCount >= 2) return { current: boostCount, target: 15, percentage: ((boostCount - 2) / 13) * 100 };
  return { current: boostCount, target: 2, percentage: (boostCount / 2) * 100 };
};

const useServerBoost = (fetchWithAuth, apiBaseUrl, serverId) => {
  const [boosts, setBoosts] = useState([]);
  const [serverStats, setServerStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchBoosts();
    fetchServerStats();
  }, [serverId]);

  const fetchBoosts = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/boosts/`);
      const data = await response.json();
      setBoosts(data.boosts || []);
    } catch (error) {
      toast.error('Failed to load boosts');
    }
  };

  const fetchServerStats = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/boost_stats/`);
      const data = await response.json();
      setServerStats(data);
    } catch (error) {
      toast.error('Failed to load server stats');
    } finally {
      setLoading(false);
    }
  };

  const boostServer = async () => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/servers/boost/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ server_id: serverId })
      });
      toast.success('🚀 Server boosted successfully!');
      fetchBoosts();
      fetchServerStats();
    } catch (error) {
      toast.error('Failed to boost server');
    }
  };

  const currentBoostCount = serverStats?.boost_count || 0;
  const currentLevel = getBoostLevel(currentBoostCount);
  const progress = getNextLevelProgress(currentBoostCount);

  return {
    boosts, serverStats, loading, activeTab, setActiveTab,
    boostServer, currentBoostCount, currentLevel, progress
  };
};

export default useServerBoost;
