import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import toast from '../../utils/toast';
import logger from '../../utils/logger';
import confirmDialog from '../../utils/confirmDialog';

const useBotDeveloper = (apiBaseUrl) => {
    const { t } = useTranslation();
    const [bots, setBots] = useState([]);
    const [selectedBot, setSelectedBot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list');
    const [newBot, setNewBot] = useState({ name: '', description: '', avatar_url: '' });
    const [analytics, setAnalytics] = useState(null);
    const [webhooks, setWebhooks] = useState([]);
    const [showCredentials, setShowCredentials] = useState(false);

    const headers = () => ({ Authorization: `Bearer ${getToken()}` });
    const jsonHeaders = () => ({ ...headers(), 'Content-Type': 'application/json' });

    const loadBots = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/bots/my/`, { headers: headers() });
            if (res.ok) {
                const data = await res.json();
                setBots(Array.isArray(data) ? data : []);
            }
        } catch (e) {
            logger.error('Bots fetch error:', e);
        } finally {
            setLoading(false);
        }
    };

    const fetchBotAnalytics = async (botId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/bots/${botId}/analytics/`, {
                headers: headers(),
            });
            if (res.ok) setAnalytics(await res.json());
        } catch (e) {
            logger.error('Analytics fetch error:', e);
        }
    };

    const fetchBotWebhooks = async (botId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/bots/${botId}/webhooks/`, {
                headers: headers(),
            });
            if (res.ok) {
                const data = await res.json();
                setWebhooks(Array.isArray(data) ? data : data.webhooks || []);
            }
        } catch (e) {
            logger.error('Webhooks fetch error:', e);
        }
    };

    useEffect(() => {
        loadBots();
    }, []);
    useEffect(() => {
        if (selectedBot && view === 'details') {
            fetchBotAnalytics(selectedBot.id);
            fetchBotWebhooks(selectedBot.id);
        }
    }, [selectedBot, view]);

    const handleCreateBot = async () => {
        if (!newBot.name.trim()) {
            toast.error(t('bot.nameRequired'));
            return;
        }
        try {
            const res = await fetch(`${apiBaseUrl}/bots/create/`, {
                method: 'POST',
                headers: jsonHeaders(),
                body: JSON.stringify(newBot),
            });
            if (res.ok) {
                const data = await res.json();
                setBots([...bots, data]);
                setSelectedBot(data);
                setShowCredentials(true);
                setView('details');
                toast.success(t('bot.created'));
                setNewBot({ name: '', description: '', avatar_url: '' });
            } else {
                const err = await res.json();
                toast.error(err.error || t('bot.createFailed'));
            }
        } catch (e) {
            logger.error('Bot creation error:', e);
            toast.error(t('bot.error'));
        }
    };

    const handleCreateWebhook = async (botId) => {
        const url = prompt('Webhook URL:');
        if (!url) return;
        try {
            const res = await fetch(`${apiBaseUrl}/bots/${botId}/webhook/`, {
                method: 'POST',
                headers: jsonHeaders(),
                body: JSON.stringify({ url }),
            });
            if (res.ok) {
                const data = await res.json();
                setWebhooks([...webhooks, data.webhook]);
                toast.success(t('bot.webhookCreated'));
            } else toast.error(t('bot.webhookCreateFailed'));
        } catch (e) {
            logger.error('Webhook creation error:', e);
        }
    };

    const handleDeleteBot = async (botId) => {
        if (!(await confirmDialog(t('bot.deleteConfirm')))) return;
        try {
            const res = await fetch(`${apiBaseUrl}/bots/${botId}/delete/`, {
                method: 'DELETE',
                headers: headers(),
            });
            if (res.ok) {
                setBots(bots.filter((b) => b.id !== botId));
                setSelectedBot(null);
                setView('list');
                toast.success(t('bot.deleted'));
            }
        } catch (e) {
            logger.error('Delete error:', e);
        }
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(t('bot.copied', { label }));
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num?.toString() || '0';
    };

    return {
        bots,
        selectedBot,
        setSelectedBot,
        loading,
        view,
        setView,
        newBot,
        setNewBot,
        analytics,
        webhooks,
        showCredentials,
        setShowCredentials,
        handleCreateBot,
        handleCreateWebhook,
        handleDeleteBot,
        copyToClipboard,
        formatNumber,
    };
};

export default useBotDeveloper;
