import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { authFetch } from '../../utils/authFetch';
import toast from '../../utils/toast';
import { getApiBase } from '../../utils/apiEndpoints';
import logger from '../../utils/logger';

const DEFAULT_SETTINGS = {
    spamDetection: true,
    profanityFilter: true,
    nsfwDetection: true,
    toxicityThreshold: 70,
    autoTimeout: false,
    autoDelete: false,
    warningCount: 3,
};

const useAIModeration = (serverSlug, token) => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [recentFlags, setRecentFlags] = useState([]);
    const [stats, setStats] = useState({
        messagesScanned: 0,
        flaggedToday: 0,
        autoModActions: 0,
        accuracy: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    const loadModeration = async () => {
        setIsLoading(true);
        try {
            const res = await authFetch(`${getApiBase()}/moderation/${serverSlug}/`);
            const json = await res.json();
            if (json.settings) setSettings(json.settings);
            if (json.recent_flags) setRecentFlags(json.recent_flags);
            if (json.stats) setStats(json.stats);
        } catch (error) {
            logger.error('Failed to load moderation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadModeration();
    }, []);

    const saveSettings = async () => {
        try {
            await authFetch(`${getApiBase()}/moderation/${serverSlug}/update/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ settings }),
            });
            toast.success(t('moderation.settingsSaved'));
        } catch (error) {
            logger.error('Failed to save:', error);
            toast.error(t('moderation.settingsFailed'));
        }
    };

    const handleAction = async (flagId, action) => {
        try {
            await authFetch(`${getApiBase()}/moderation/flag/${flagId}/action/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action }),
            });
            loadModeration();
        } catch (error) {
            logger.error('Action failed:', error);
        }
    };

    return { settings, setSettings, recentFlags, stats, isLoading, saveSettings, handleAction };
};

export default useAIModeration;
