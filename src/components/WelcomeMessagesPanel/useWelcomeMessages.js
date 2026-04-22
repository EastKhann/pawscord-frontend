import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import logger from '../../utils/logger';

const DEFAULT_CONFIG = {
    welcome_enabled: false,
    welcome_channel_id: '',
    welcome_message: 'Welcome {user}! {server} joined the server!',
    welcome_embed: false,
    welcome_embed_color: '#5865f2',
    welcome_embed_title: 'Welcome!',
    welcome_embed_description: '{user} joined the server!',
    welcome_dm: false,
    welcome_dm_message: 'Merhaba {user}! {server} Welcome!',
    goodbye_enabled: false,
    goodbye_channel_id: '',
    goodbye_message: '{user} left the server. Goodbye!',
    goodbye_embed: false,
    goodbye_embed_color: '#f23f42',
    auto_role_enabled: false,
    auto_role_ids: [],
};

export const VARIABLES = [
    { code: '{user}', desc: t('welcomeMsg.codeUser','Username') },
    { code: '{user_mention}', desc: t('welcomeMsg.codeUserMention','User Mention') },
    { code: '{server}', desc: t('welcomeMsg.codeServer','Server Name') },
    { code: '{member_count}', desc: t('welcomeMsg.codeMemberCount','Member Count') },
    { code: '{user_id}', desc: t('welcomeMsg.codeUserId','User ID') },
];

const useWelcomeMessages = (serverId) => {
    const [welcomeConfig, setWelcomeConfig] = useState(DEFAULT_CONFIG);
    const [channels, setChannels] = useState([]);
    const [roles, setRoles] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = getApiBase();
    const headers = () => ({ Authorization: `Bearer ${getToken()}` });
    const { t } = useTranslation();

    const fetchConfig = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/`, {
                headers: headers(),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.config) setWelcomeConfig(data.config);
            }
        } catch (e) {
            logger.error('Error fetching config:', e);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannels = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
                headers: headers(),
            });
            if (res.ok) {
                const d = await res.json();
                setChannels(d.channels || []);
            }
        } catch (e) {
            logger.error('Error fetching channels:', e);
        }
    };

    const fetchRoles = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/servers/${serverId}/roles/`, {
                headers: headers(),
            });
            if (res.ok) {
                const d = await res.json();
                setRoles(d.roles || []);
            }
        } catch (e) {
            logger.error('Error fetching roles:', e);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/stats/`, {
                headers: headers(),
            });
            if (res.ok) setStats(await res.json());
        } catch (e) {
            logger.error('Error fetching stats:', e);
        }
    };

    useEffect(() => {
        if (serverId) {
            fetchConfig();
            fetchChannels();
            fetchRoles();
            fetchStats();
        }
    }, [serverId]);

    const saveConfig = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/update/`, {
                method: 'POST',
                headers: { ...headers(), 'Content-Type': 'application/json' },
                body: JSON.stringify(welcomeConfig),
            });
            if (res.ok) {
                toast.success(t('settings.settingsSaved'));
                fetchStats();
            } else toast.error(t('common.saveFailed'));
        } catch (e) {
            logger.error('Error saving config:', e);
            toast.error(t('common.saveFailed'));
        }
    };

    const testWelcomeMessage = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/test/`, {
                method: 'POST',
                headers: { ...headers(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'welcome' }),
            });
            if (res.ok) toast.success(t('birthdays.testSent'));
            else toast.error(t('common.saveFailed'));
        } catch (e) {
            logger.error('Error testing message:', e);
            toast.error(t('common.saveFailed'));
        }
    };

    const updateConfig = (field, value) => setWelcomeConfig({ ...welcomeConfig, [field]: value });
    const insertVariable = (field, variable) =>
        setWelcomeConfig({ ...welcomeConfig, [field]: welcomeConfig[field] + ` ${variable}` });

    return {
        welcomeConfig,
        updateConfig,
        insertVariable,
        channels,
        roles,
        stats,
        loading,
        saveConfig,
        testWelcomeMessage,
    };
};

export default useWelcomeMessages;
