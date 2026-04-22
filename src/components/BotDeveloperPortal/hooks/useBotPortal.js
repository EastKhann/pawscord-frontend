import { getToken } from '../../../utils/tokenStorage';
// BotDeveloperPortal/hooks/useBotPortal.js
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../../utils/toast';
import confirmDialog from '../../../utils/confirmDialog';
import logger from '../../../utils/logger';

const DEFAULT_INTENTS = {
    messages: true,
    reactions: true,
    presence: false,
    members: false,
    voice: false,
};
const DEFAULT_FORM = {
    name: '',
    description: '',
    avatar_url: '',
    prefix: '!',
    is_public: false,
    intents: { ...DEFAULT_INTENTS },
};

export const webhookEventOptions = [
    { id: 'message_create', label: t('bot.eventMessageCreate','Message Sent') },
    { id: 'message_edit', label: t('bot.eventMessageEdit','Message Edited') },
    { id: 'message_delete', label: 'Mesaj Silindi' },
    { id: 'reaction_add', label: 'Tepki Eklendi' },
    { id: 'reaction_remove', label: t('bot.eventReactionRemove','Reaction Removed') },
    { id: 'member_join', label: t('bot.eventMemberJoin','Member Joined') },
    { id: 'member_leave', label: t('bot.eventMemberLeave','Member Left') },
    { id: 'voice_join', label: t('bot.eventVoiceJoin','Joined Voice Channel') },
    { id: 'voice_leave', label: t('bot.eventVoiceLeave','Left Voice Channel') },
];

export const useBotPortal = (apiBaseUrl) => {
    const { t } = useTranslation();
    const [view, setView] = useState('list');
    const [bots, setBots] = useState([]);
    const [selectedBot, setSelectedBot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showToken, setShowToken] = useState({});
    const [botForm, setBotForm] = useState({ ...DEFAULT_FORM });
    const [showWebhookForm, setShowWebhookForm] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState('');
    const [webhookEvents, setWebhookEvents] = useState([]);

    useEffect(() => {
        fetchBots();
    }, []);

    const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });
    const jsonHeaders = () => ({ ...authHeaders(), 'Content-Type': 'application/json' });

    const fetchBots = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/bots/my/`, { headers: authHeaders() });
            if (response.ok) {
                const data = await response.json();
                setBots(data.bots || []);
            }
        } catch (error) {
            logger.error('Fetch bots error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBot = async () => {
        if (!botForm.name.trim()) {
            toast.error(t('bot.nameRequired'));
            return;
        }
        try {
            const response = await fetch(`${apiBaseUrl}/bots/create/`, {
                method: 'POST',
                headers: jsonHeaders(),
                body: JSON.stringify(botForm),
            });
            if (response.ok) {
                const data = await response.json();
                setBots([...bots, data.bot]);
                setBotForm({ ...DEFAULT_FORM });
                setView('list');
                toast.success(t('bot.created'));
                setSelectedBot(data.bot);
                setShowToken({ [data.bot.id]: true });
            } else {
                const error = await response.json();
                toast.error(error.error || t('bot.createFailed'));
            }
        } catch (error) {
            logger.error('Create bot error:', error);
            toast.error(t('bot.error'));
        }
    };

    const handleUpdateBot = async () => {
        if (!selectedBot) return;
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${selectedBot.id}/update/`, {
                method: 'PUT',
                headers: jsonHeaders(),
                body: JSON.stringify(botForm),
            });
            if (response.ok) {
                const data = await response.json();
                setBots(bots.map((b) => (b.id === selectedBot.id ? data.bot : b)));
                setView('list');
                toast.success(t('bot.updated'));
            }
        } catch (error) {
            logger.error('Update bot error:', error);
        }
    };

    const handleDeleteBot = async (botId) => {
        if (
            !(await confirmDialog(
                t('bot.deleteConfirm','Are you sure you want to delete this bot? This action cannot be undone.')
            ))
        )
            return;
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/delete/`, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            if (response.ok) {
                setBots(bots.filter((b) => b.id !== botId));
                if (selectedBot?.id === botId) setSelectedBot(null);
                toast.success(t('bot.deleted'));
            }
        } catch (error) {
            logger.error('Delete bot error:', error);
        }
    };

    const handleRegenerateToken = async (botId) => {
        if (
            !(await confirmDialog(
                t('bot.refreshTokenConfirm','Token will be refreshed. The old token will become invalid. Do you want to continue?')
            ))
        )
            return;
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/regenerate-token/`, {
                method: 'POST',
                headers: authHeaders(),
            });
            if (response.ok) {
                const data = await response.json();
                setBots(bots.map((b) => (b.id === botId ? { ...b, token: data.token } : b)));
                setShowToken({ ...showToken, [botId]: true });
                toast.success(t('bot.tokenRefreshed'));
            }
        } catch (error) {
            logger.error('Regenerate token error:', error);
        }
    };

    const handleCreateWebhook = async (botId) => {
        if (!webhookUrl.trim()) {
            toast.error(t('bot.webhookRequired'));
            return;
        }
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/webhook/`, {
                method: 'POST',
                headers: jsonHeaders(),
                body: JSON.stringify({ url: webhookUrl, events: webhookEvents }),
            });
            if (response.ok) {
                toast.success(t('bot.webhookCreated'));
                setShowWebhookForm(false);
                setWebhookUrl('');
                setWebhookEvents([]);
            }
        } catch (error) {
            logger.error('Create webhook error:', error);
        }
    };

    const handleToggleBotStatus = async (botId, currentStatus) => {
        try {
            const endpoint = currentStatus === 'online' ? 'pause' : 'start';
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/${endpoint}/`, {
                method: 'POST',
                headers: authHeaders(),
            });
            if (response.ok) {
                const newStatus = currentStatus === 'online' ? 'offline' : 'online';
                setBots(bots.map((b) => (b.id === botId ? { ...b, status: newStatus } : b)));
                toast.success(newStatus === 'online' ? t('bot.started') : t('bot.paused'));
            }
        } catch (error) {
            logger.error('Toggle bot status error:', error);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success(t('common.copied'));
    };

    const editBot = (bot) => {
        setBotForm({
            name: bot.name,
            description: bot.description || '',
            avatar_url: bot.avatar_url || '',
            prefix: bot.prefix || '!',
            is_public: bot.is_public || false,
            intents: bot.intents || { ...DEFAULT_INTENTS },
        });
        setSelectedBot(bot);
        setView('edit');
    };

    const resetForm = () => {
        setBotForm({ ...DEFAULT_FORM });
        setSelectedBot(null);
    };

    return {
        view,
        setView,
        bots,
        selectedBot,
        setSelectedBot,
        loading,
        showToken,
        setShowToken,
        botForm,
        setBotForm,
        showWebhookForm,
        setShowWebhookForm,
        webhookUrl,
        setWebhookUrl,
        webhookEvents,
        setWebhookEvents,
        handleCreateBot,
        handleUpdateBot,
        handleDeleteBot,
        handleRegenerateToken,
        handleCreateWebhook,
        handleToggleBotStatus,
        copyToClipboard,
        editBot,
        resetForm,
    };
};
