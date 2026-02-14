// BotDeveloperPortal/hooks/useBotPortal.js
import { useState, useEffect } from 'react';
import toast from '../../../utils/toast';
import confirmDialog from '../../../utils/confirmDialog';

const DEFAULT_INTENTS = { messages: true, reactions: true, presence: false, members: false, voice: false };
const DEFAULT_FORM = { name: '', description: '', avatar_url: '', prefix: '!', is_public: false, intents: { ...DEFAULT_INTENTS } };

export const webhookEventOptions = [
    { id: 'message_create', label: 'Mesaj Gönderildi' },
    { id: 'message_edit', label: 'Mesaj Düzenlendi' },
    { id: 'message_delete', label: 'Mesaj Silindi' },
    { id: 'reaction_add', label: 'Reaction Eklendi' },
    { id: 'reaction_remove', label: 'Reaction Kaldırıldı' },
    { id: 'member_join', label: 'Üye Katıldı' },
    { id: 'member_leave', label: 'Üye Ayrıldı' },
    { id: 'voice_join', label: 'Ses Kanalına Katıldı' },
    { id: 'voice_leave', label: 'Ses Kanalından Ayrıldı' }
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
        if (!botForm.name.trim()) { toast.error('⚠️ Bot adı gerekli'); return; }
        try {
            const response = await fetch(`${apiBaseUrl}/bots/create/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(botForm) });
            if (response.ok) {
                const data = await response.json();
                setBots([...bots, data.bot]); setBotForm({ ...DEFAULT_FORM }); setView('list');
                toast.success('✅ Bot oluşturuldu!');
                setSelectedBot(data.bot); setShowToken({ [data.bot.id]: true });
            } else { const error = await response.json(); toast.error(error.error || '❌ Bot oluşturulamadı'); }
        } catch (error) { console.error('Create bot error:', error); toast.error('❌ Hata oluştu'); }
    };

    const handleUpdateBot = async () => {
        if (!selectedBot) return;
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${selectedBot.id}/update/`, { method: 'PUT', headers: jsonHeaders(), body: JSON.stringify(botForm) });
            if (response.ok) { const data = await response.json(); setBots(bots.map(b => b.id === selectedBot.id ? data.bot : b)); setView('list'); toast.success('✅ Bot güncellendi!'); }
        } catch (error) { console.error('Update bot error:', error); }
    };

    const handleDeleteBot = async (botId) => {
        if (!await confirmDialog('Bu botu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) return;
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/delete/`, { method: 'DELETE', headers: authHeaders() });
            if (response.ok) { setBots(bots.filter(b => b.id !== botId)); if (selectedBot?.id === botId) setSelectedBot(null); toast.success('✅ Bot silindi'); }
        } catch (error) { console.error('Delete bot error:', error); }
    };

    const handleRegenerateToken = async (botId) => {
        if (!await confirmDialog('Token yenilenecek. Eski token geçersiz olacak. Devam?')) return;
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/regenerate-token/`, { method: 'POST', headers: authHeaders() });
            if (response.ok) { const data = await response.json(); setBots(bots.map(b => b.id === botId ? { ...b, token: data.token } : b)); setShowToken({ ...showToken, [botId]: true }); toast.success('✅ Token yenilendi!'); }
        } catch (error) { console.error('Regenerate token error:', error); }
    };

    const handleCreateWebhook = async (botId) => {
        if (!webhookUrl.trim()) { toast.error('⚠️ Webhook URL gerekli'); return; }
        try {
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/webhook/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ url: webhookUrl, events: webhookEvents }) });
            if (response.ok) { toast.success('✅ Webhook oluşturuldu!'); setShowWebhookForm(false); setWebhookUrl(''); setWebhookEvents([]); }
        } catch (error) { console.error('Create webhook error:', error); }
    };

    const handleToggleBotStatus = async (botId, currentStatus) => {
        try {
            const endpoint = currentStatus === 'online' ? 'pause' : 'start';
            const response = await fetch(`${apiBaseUrl}/bots/${botId}/${endpoint}/`, { method: 'POST', headers: authHeaders() });
            if (response.ok) {
                const newStatus = currentStatus === 'online' ? 'offline' : 'online';
                setBots(bots.map(b => b.id === botId ? { ...b, status: newStatus } : b));
                toast.success(newStatus === 'online' ? '✅ Bot başlatıldı!' : '⏸️ Bot durduruldu');
            }
        } catch (error) { console.error('Toggle bot status error:', error); }
    };

    const copyToClipboard = (text) => { navigator.clipboard.writeText(text); toast.success('📋 Panoya kopyalandı!'); };

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
