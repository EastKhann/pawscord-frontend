import { useState, useEffect } from 'react';
import toast from '../../utils/toast';

export const CATEGORIES = [
  { id: 'all', name: 'Tümü', icon: '🌐' },
  { id: 'gaming', name: 'Oyun', icon: '🎮' },
  { id: 'music', name: 'Müzik', icon: '🎵' },
  { id: 'anime', name: 'Anime', icon: '🏌' },
  { id: 'tech', name: 'Teknoloji', icon: '💻' },
  { id: 'study', name: 'Eğitim', icon: '📚' },
  { id: 'creative', name: 'Yaratıcı', icon: '🎨' },
  { id: 'community', name: 'Topluluk', icon: '🌟' },
];

export default function useServerDiscovery({ fetchWithAuth, apiBaseUrl, onJoinServer }) {
  const [servers, setServers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadServers(); }, [selectedCategory, searchQuery]);

  const loadServers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      const r = await fetchWithAuth(`${apiBaseUrl}/discovery/servers/?${params}`);
      const data = await r.json();
      setServers(data.servers || []);
    } catch (e) { console.error('Failed to load servers:', e); }
    finally { setLoading(false); }
  };

  const joinServer = async (serverId) => {
    try {
      const r = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/join/`, { method: 'POST' });
      if (r.ok) { toast.success('✅ Sunucuya katıldınız! 🎉'); if (onJoinServer) onJoinServer(serverId); }
    } catch (e) { console.error('Failed to join server:', e); }
  };

  return { servers, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, loading, joinServer };
}
