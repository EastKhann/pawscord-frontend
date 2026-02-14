import { useState, useEffect } from 'react';
import { toast } from '../../utils/toast';

const AVAILABLE_SCOPES = ['read_messages', 'send_messages', 'manage_channels', 'manage_roles', 'manage_server', 'read_user', 'modify_user'];

const useOAuthApps = (fetchWithAuth, apiBaseUrl) => {
    const [apps, setApps] = useState([]);
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('apps');
    const [showCreateApp, setShowCreateApp] = useState(false);
    const [showCreateBot, setShowCreateBot] = useState(false);
    const [newApp, setNewApp] = useState({ name: '', description: '', redirect_uris: '', scopes: [] });
    const [newBot, setNewBot] = useState({ name: '', description: '' });

    const fetchApps = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/oauth/apps/list/`);
            const data = await response.json();
            setApps(data.apps || []);
        } catch (error) { toast.error('Failed to load OAuth apps'); }
        finally { setLoading(false); }
    };

    const fetchBots = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bots/list/`);
            const data = await response.json();
            setBots(data.bots || []);
        } catch (error) { toast.error('Failed to load bots'); }
    };

    useEffect(() => { fetchApps(); fetchBots(); }, []);

    const createApp = async () => {
        if (!newApp.name) { toast.error('App name is required'); return; }
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/oauth/apps/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newApp, redirect_uris: newApp.redirect_uris.split('\n').filter(uri => uri.trim()) })
            });
            const data = await response.json();
            toast.success('OAuth app created successfully');
            setShowCreateApp(false);
            setNewApp({ name: '', description: '', redirect_uris: '', scopes: [] });
            fetchApps();
            if (data.client_id && data.client_secret) {
                toast.info(`Client ID: ${data.client_id}\nClient Secret: ${data.client_secret}\n\nSave these credentials securely. The secret will not be shown again.`);
            }
        } catch (error) { toast.error('Failed to create OAuth app'); }
    };

    const createBot = async () => {
        if (!newBot.name) { toast.error('Bot name is required'); return; }
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bots/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBot)
            });
            const data = await response.json();
            toast.success('Bot created successfully');
            setShowCreateBot(false);
            setNewBot({ name: '', description: '' });
            fetchBots();
            if (data.token) {
                toast.info(`Bot Token: ${data.token}\n\nSave this token securely. It will not be shown again.`);
            }
        } catch (error) { toast.error('Failed to create bot'); }
    };

    const deleteApp = async (appId) => {
        if (!confirm('Are you sure you want to delete this app? This cannot be undone.')) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/oauth/apps/${appId}/delete/`, { method: 'DELETE' });
            toast.success('App deleted successfully');
            fetchApps();
        } catch (error) { toast.error('Failed to delete app'); }
    };

    const deleteBot = async (botId) => {
        if (!confirm('Are you sure you want to delete this bot? This cannot be undone.')) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/bots/${botId}/delete/`, { method: 'DELETE' });
            toast.success('Bot deleted successfully');
            fetchBots();
        } catch (error) { toast.error('Failed to delete bot'); }
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard`);
    };

    const toggleScope = (scope) => {
        setNewApp(prev => ({
            ...prev,
            scopes: prev.scopes.includes(scope) ? prev.scopes.filter(s => s !== scope) : [...prev.scopes, scope]
        }));
    };

    return {
        apps, bots, loading, activeTab, setActiveTab,
        showCreateApp, setShowCreateApp, showCreateBot, setShowCreateBot,
        newApp, setNewApp, newBot, setNewBot,
        createApp, createBot, deleteApp, deleteBot,
        copyToClipboard, toggleScope, availableScopes: AVAILABLE_SCOPES
    };
};

export default useOAuthApps;
