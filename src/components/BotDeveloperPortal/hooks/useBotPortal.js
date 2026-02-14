// BotDeveloperPortal/hooks/useBotPortal.js
import { useState, useEffect } from 'react';
import toast from '../../../utils/toast';
import confirmDialog from '../../../utils/confirmDialog';

const DEFAULT_INTENTS = { messages: true, reactions: true, presence: false, members: false, voice: false };
const DEFAULT_FORM = { name: '', description: '', avatar_url: '', prefix: '!', is_public: false, intents: { ...DEFAULT_INTENTS } };

export const webhookEventOptions = [
    { id: 'message_create', label: 'Mesaj G\u00F6nderildi' },
    { id: 'message_edit', label: 'Mesaj D\u00FCzenlendi' },
    { id: 'message_delete', label: 'Mesaj Silindi' },
    { id: 'reaction_add', label: 'Reaction Eklendi' },
    { id: 'reaction_remove', label: 'Reaction Kald\u0131r\u0131ld\u0131' },
    { id: 'member_join', label: '\u00DCye Kat\u0131ld\u0131' },
    { id: 'member_leave', label: '\u00DCye Ayr\u0131ld\u0131' },
    { id: 'voice_join', label: 'Ses Kanal\u0131na Kat\u0131ld\u0131' },
    { id: 'voice_leave', label: 'Ses Kanal\u0131ndan Ayr\u0131ld\u0131' }
];

export const useBotPortal = (apiBaseUrl) => {
    const [view, setView] = useState('list');
    const [bots, setBots] = useState([]);
    const [selectedBot, setSelectedBot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showToken, setShowToken] = useState({});
    const [botForm, setBotForm] = useState({ ...DEFAULT_FORM });
    const [showWebhookForm, setShowWebhookForm] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState('');
    const [webhookEvents, setWebhookEvents] = useState([]);

    useEffect(() => { fetchBots(); }, []);

    const getToken = () => localStorage.getItem('access_token');
    const authHeaders = () => ({ 'Authorization': `Bearer ${getToken()}` });
    const jsonHeaders = () => ({ ...authHeaders(), 'Content-Type': 'application/json' });

    const fetchBots = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/bots/my/`, { headers: authHeaders() });
            if (response.ok) { const data = await response.json(); setBots(data.bots || []); }
        } catch (error) { console.error('Fetch bots error:', error); }
        finally { setLoading(false); }
    };

    const handleCreateBot = async () => {
        if (!botForm.name.trim()) { toast.error('\u26A0\uFE0F Bot ad\u0131 gerekli'); return; }
        try {
            const response = await fetch(`${apiBaseUrl}/bots/create/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(botForm) });
            if (response.ok) {
                const data = await response.json();
                setBots([...bots, data.bot]); setBotForm({ ...DEFAULT_FORM }); setView('list');
                toast.success('\u2705 Bot olu\u015Fturuldu!');
                setSelectedBot(data.bot); setShowToken({ [data.bot.id]: true });
            } else { const error = await response.json(); toast.error(error.error || '\u274C Bot olu\u015Fturulamad\u0131'); }
        } catch (error) { console.error('Create bot error:', error); toast.error('\u274C Hata olu\u015Ftu'); }
    };

    const handleUpdateBot = async () => {
        if (!selectedBot) return;
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${selectedBot.id}/update/`, { method: 'PUT', headers: jsonHeaders(), body: JSON.stringify(botForm) });
            if (response.ok) { const data = await response.json(); setBots(bots.map(b => b.id === selectedBot.id ? data.bot : b)); setView('list'); toast.success('\u2705 Bot g\u00FCncellendi!'); }
        } catch (error) { console.error('Update bot error:', error); }
    };

    const handleDeleteBot = async (botId) => {
        if (!await confirmDialog('Bu botu silmek istedi\u011Finizden emin misiniz? Bu i\u015Flem geri al\u0131namaz.')) return;
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/delete/`, { method: 'DELETE', headers: authHeaders() });
            if (response.ok) { setBots(bots.filter(b => b.id !== botId)); if (selectedBot?.id === botId) setSelectedBot(null); toast.success('\u2705 Bot silindi'); }
        } catch (error) { console.error('Delete bot error:', error); }
    };

    const handleRegenerateToken = async (botId) => {
        if (!await confirmDialog('Token yenilenecek. Eski token ge\u00E7ersiz olacak. Devam?')) return;
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/regenerate-token/`, { method: 'POST', headers: authHeaders() });
            if (response.ok) { const data = await response.json(); setBots(bots.map(b => b.id === botId ? { ...b, token: data.token } : b)); setShowToken({ ...showToken, [botId]: true }); toast.success('\u2705 Token yenilendi!'); }
        } catch (error) { console.error('Regenerate token error:', error); }
    };

    const handleCreateWebhook = async (botId) => {
        if (!webhookUrl.trim()) { toast.error('\u26A0\uFE0F Webhook URL gerekli'); return; }
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/webhook/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ url: webhookUrl, events: webhookEvents }) });
            if (response.ok) { toast.success('\u2705 Webhook olu\u015Fturuldu!'); setShowWebhookForm(false); setWebhookUrl(''); setWebhookEvents([]); }
        } catch (error) { console.error('Create webhook error:', error); }
    };

    const handleToggleBotStatus = async (botId, currentStatus) => {
        try {
            const endpoint = currentStatus === 'online' ? 'pause' : 'start';
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/${endpoint}/`, { method: 'POST', headers: authHeaders() });
            if (response.ok) {
                const newStatus = currentStatus === 'online' ? 'offline' : 'online';
                setBots(bots.map(b => b.id === botId ? { ...b, status: newStatus } : b));
                toast.success(newStatus === 'online' ? '\u2705 Bot ba\u015Flat\u0131ld\u0131!' : '\u23F8\uFE0F Bot durduruldu');
            }
        } catch (error) { console.error('Toggle bot status error:', error); }
    };

    const copyToClipboard = (text) => { navigator.clipboard.writeText(text); toast.success('\uD83D\uDCCB Panoya kopyaland\u0131!'); };

    const editBot = (bot) => {
        setBotForm({ name: bot.name, description: bot.description || '', avatar_url: bot.avatar_url || '', prefix: bot.prefix || '!', is_public: bot.is_public || false, intents: bot.intents || { ...DEFAULT_INTENTS } });
        setSelectedBot(bot); setView('edit');
    };

    const resetForm = () => { setBotForm({ ...DEFAULT_FORM }); setSelectedBot(null); };

    return {
        view, setView, bots, selectedBot, setSelectedBot, loading,
        showToken, setShowToken, botForm, setBotForm,
        showWebhookForm, setShowWebhookForm, webhookUrl, setWebhookUrl,
        webhookEvents, setWebhookEvents,
        handleCreateBot, handleUpdateBot, handleDeleteBot,
        handleRegenerateToken, handleCreateWebhook, handleToggleBotStatus,
        copyToClipboard, editBot, resetForm
    };
};
