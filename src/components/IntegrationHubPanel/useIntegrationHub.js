/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import {
    FaPlug,
    FaGithub,
    FaSpotify,
    FaTwitch,
    FaYoutube,
    FaSlack,
    FaGoogle,
    FaTwitter,
    FaCode,
    FaMusic,
    FaGamepad,
    FaCloud,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import confirmDialog from '../../utils/confirmDialog';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

export const integrationIcons = {
    github: FaGithub,
    spotify: FaSpotify,
    twitch: FaTwitch,
    youtube: FaYoutube,
    slack: FaSlack,
    google: FaGoogle,
    twitter: FaTwitter,
};

export const integrationColors = {
    github: '#333',
    spotify: '#1db954',
    twitch: '#9146ff',
    youtube: '#ff0000',
    slack: '#4a154b',
    google: '#4285f4',
    twitter: '#1da1f2',
};

export const getCategoryIcon = (category) => {
    switch (category) {
        case 'development':
            return <FaCode />;
        case 'entertainment':
            return <FaMusic />;
        case 'streaming':
            return <FaGamepad />;
        case 'productivity':
            return <FaCloud />;
        default:
            return <FaPlug />;
    }
};

const useIntegrationHub = (serverId) => {
    const [activeTab, setActiveTab] = useState('connected');
    const [integrations, setIntegrations] = useState([]);
    const [availableIntegrations, setAvailableIntegrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [configModal, setConfigModal] = useState({ show: false, integration: null });
    const token = getToken();

    useEffect(() => {
        fetchIntegrations();
    }, [serverId]);

    const fetchIntegrations = async () => {
        setLoading(true);
        try {
            const [connectedRes, availableRes] = await Promise.all([
                fetch(`${API_BASE_URL}/servers/${serverId}/integrations/`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${API_BASE_URL}/integrations/available/`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
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
            logger.error('Error fetching integrations:', error);
            setAvailableIntegrations([]);
        }
        setLoading(false);
    };

    const handleConnect = async (integrationId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/servers/${serverId}/integrations/connect/`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ integration_type: integrationId }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.oauth_url) {
                    const popup = window.open(data.oauth_url, '_blank', 'width=500,height=600');
                    // Close popup when OAuth completes (postMessage from success page)
                    const handleMessage = (event) => {
                        if (event.data?.type === 'oauth_success') {
                            try {
                                popup?.close();
                            } catch (e) {}
                            window.removeEventListener('message', handleMessage);
                            fetchIntegrations();
                        }
                    };
                    window.addEventListener('message', handleMessage);
                    // Fallback: clean up listner after 5 minutes
                    setTimeout(() => window.removeEventListener('message', handleMessage), 300000);
                } else {
                    toast.success(t('integrations.started', { id: integrationId }));
                    fetchIntegrations();
                }
            } else {
                toast.error(t('ui.baglanti_baslatilamadi'));
            }
        } catch (error) {
            toast.error(t('common.connectionError'));
        }
    };

    const handleDisconnect = async (integrationId) => {
        if (!(await confirmDialog('Bu entegrasyonu kaldırmak istediğinizden emin misiniz?')))
            return;

        try {
            const response = await fetch(
                `${API_BASE_URL}/servers/${serverId}/integrations/${integrationId}/disconnect/`,
                {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                toast.success(t('integrations.removed'));
                fetchIntegrations();
            }
        } catch (error) {
            toast.error(t('ui.entegrasyon_kaldirilamadi'));
        }
    };

    const handleSync = async (integrationId) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/servers/${serverId}/integrations/${integrationId}/sync/`,
                {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                toast.success(t('ui.senkronizasyon_baslatildi'));
            }
        } catch (error) {
            toast.error(t('ui.sync_failed'));
        }
    };

    const filteredAvailable = availableIntegrations.filter(
        (int) =>
            int.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            int.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const connectedIds = integrations.map((i) => i.type);
    const notConnected = filteredAvailable.filter((a) => !connectedIds.includes(a.id));

    return {
        activeTab,
        setActiveTab,
        integrations,
        notConnected,
        loading,
        searchTerm,
        setSearchTerm,
        configModal,
        setConfigModal,
        token,
        handleConnect,
        handleDisconnect,
        handleSync,
        fetchIntegrations,
    };
};

export default useIntegrationHub;
