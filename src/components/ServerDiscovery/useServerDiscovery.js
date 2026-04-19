import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import logger from '../../utils/logger';

export const CATEGORIES = [
    { id: 'all', name: 'All', icon: '🌐' },
    { id: 'gaming', name: 'Oyun', icon: '🎮' },
    { id: 'music', name: 'Music', icon: '🎵' },
    { id: 'anime', name: 'Anime', icon: '🏌' },
    { id: 'tech', name: 'Teknoloji', icon: '💻' },
    { id: 'study', name: 'Education', icon: '📚' },
    { id: 'creative', name: 'Creative', icon: '🎨' },
    { id: 'community', name: 'Community', icon: '🌟' },
];

export default function useServerDiscovery({ fetchWithAuth, apiBaseUrl, onJoinServer }) {
    const { t } = useTranslation();
    const [servers, setServers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServers();
    }, [selectedCategory, searchQuery]);

    const loadServers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedCategory !== 'all') params.append('category', selectedCategory);
            if (searchQuery) params.append('search', searchQuery);
            const r = await fetchWithAuth(`${apiBaseUrl}/discovery/servers/?${params}`);
            const data = await r.json();
            setServers(data.servers || []);
        } catch (e) {
            logger.error('Failed to load servers:', e);
        } finally {
            setLoading(false);
        }
    };

    const joinServer = async (serverId) => {
        try {
            const r = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/join/`, {
                method: 'POST',
            });
            if (r.ok) {
                toast.success(t('serverDiscovery.joined'));
                if (onJoinServer) onJoinServer(serverId);
            }
        } catch (e) {
            logger.error('Failed to join server:', e);
        }
    };

    return {
        servers,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        loading,
        joinServer,
    };
}
