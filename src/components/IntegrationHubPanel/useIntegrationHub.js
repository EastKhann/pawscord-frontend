import { useState, useEffect } from 'react';
import {
    FaPlug, FaGithub, FaSpotify, FaTwitch, FaYoutube,
    FaDiscord, FaSlack, FaGoogle, FaTwitter,
    FaCode, FaMusic, FaGamepad, FaCloud
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import confirmDialog from '../../utils/confirmDialog';

export const integrationIcons = {
    github: FaGithub,
    spotify: FaSpotify,
    twitch: FaTwitch,
    youtube: FaYoutube,
    discord: FaDiscord,
    slack: FaSlack,
    google: FaGoogle,
    twitter: FaTwitter
};

export const integrationColors = {
    github: '#333',
    spotify: '#1db954',
    twitch: '#9146ff',
    youtube: '#ff0000',
    discord: '#5865f2',
    slack: '#4a154b',
    google: '#4285f4',
    twitter: '#1da1f2'
};

export const getCategoryIcon = (category) => {
    switch (category) {
        case 'development': return <FaCode />;
        case 'entertainment': return <FaMusic />;
        case 'streaming': return <FaGamepad />;
        case 'productivity': return <FaCloud />;
        default: return <FaPlug />;
    }
};

const useIntegrationHub = (serverId) => {
    const [activeTab, setActiveTab] = useState('connected');
    const [integrations, setIntegrations] = useState([]);
    const [availableIntegrations, setAvailableIntegrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [configModal, setConfigModal] = useState({ show: false, integration: null });
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchIntegrations();
    }, [serverId]);

    const fetchIntegrations = async () => {
        setLoading(true);
        try {
            const [connectedRes, availableRes] = await Promise.all([
                fetch(`/api/servers/${serverId}/integrations/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`/api/integrations/available/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (connectedRes.ok) {
                const data = await connectedRes.json();
                setIntegrations(data.integrations || []);
            }

            if (availableRes.ok) {
                const data = await availableRes.json();
                setAvailableIntegrations(data.integrations || []);
            } else {
                setAvailableIntegrations([]);
            }
        } catch (error) {
            console.error('Error fetching integrations:', error);
            setAvailableIntegrations([]);
        }
        setLoading(false);
    };

    const handleConnect = async (integrationId) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/integrations/connect/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ integration_type: integrationId })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.oauth_url) {
                    window.open(data.oauth_url, '_blank', 'width=500,height=600');
                }
                toast.success(`${integrationId} entegrasyon ba\u015Flat\u0131ld\u0131`);
                fetchIntegrations();
            } else {
                toast.error('Ba\u011Flant\u0131 ba\u015Flat\u0131lamad\u0131');
            }
        } catch (error) {
            toast.error('Ba\u011Flant\u0131 hatas\u0131');
        }
    };

    const handleDisconnect = async (integrationId) => {
        if (!await confirmDialog('Bu entegrasyonu kald\u0131rmak istedi\u011Finize emin misiniz?')) return;

        try {
            const response = await fetch(`/api/servers/${serverId}/integrations/${integrationId}/disconnect/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('Entegrasyon kald\u0131r\u0131ld\u0131');
                fetchIntegrations();
            }
        } catch (error) {
            toast.error('Entegrasyon kald\u0131r\u0131lamad\u0131');
        }
    };

    const handleSync = async (integrationId) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/integrations/${integrationId}/sync/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('Senkronizasyon ba\u015Flat\u0131ld\u0131');
            }
        } catch (error) {
            toast.error('Senkronizasyon ba\u015Far\u0131s\u0131z');
        }
    };

    const filteredAvailable = availableIntegrations.filter(int =>
        int.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        int.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const connectedIds = integrations.map(i => i.type);
    const notConnected = filteredAvailable.filter(a => !connectedIds.includes(a.id));

    return {
        activeTab, setActiveTab,
        integrations,
        notConnected,
        loading,
        searchTerm, setSearchTerm,
        configModal, setConfigModal,
        token,
        handleConnect,
        handleDisconnect,
        handleSync,
        fetchIntegrations
    };
};

export default useIntegrationHub;
