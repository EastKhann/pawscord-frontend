import { useState, useEffect } from 'react';
import toast from '../../utils/toast';

export const CATEGORIES = [
  { id: 'all', name: 'T\u00FCm\u00FC', icon: '\uD83C\uDF10' },
  { id: 'gaming', name: 'Oyun', icon: '\uD83C\uDFAE' },
  { id: 'music', name: 'M\u00FCzik', icon: '\uD83C\uDFB5' },
  { id: 'anime', name: 'Anime', icon: '\uD83C\uDFCC' },
  { id: 'tech', name: 'Teknoloji', icon: '\uD83D\uDCBB' },
  { id: 'study', name: 'E\u011Fitim', icon: '\uD83D\uDCDA' },
  { id: 'creative', name: 'Yarat\u0131c\u0131', icon: '\uD83C\uDFA8' },
  { id: 'community', name: 'Topluluk', icon: '\uD83C\uDF1F' },
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
      if (r.ok) { toast.success('\u2705 Sunucuya kat\u0131ld\u0131n\u0131z! \uD83C\uDF89'); if (onJoinServer) onJoinServer(serverId); }
    } catch (e) { console.error('Failed to join server:', e); }
  };

  return { servers, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, loading, joinServer };
}
