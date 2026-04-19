import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

const AVAILABLE_SCOPES = [
    'read_messages',
    'send_messages',
    'manage_channels',
    'manage_roles',
    'manage_server',
    'read_user',
    'modify_user',
];

const useOAuthApps = (fetchWithAuth, apiBaseUrl) => {
    const { t } = useTranslation();
    const [apps, setApps] = useState([]);
    const [bots, setBots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('apps');
    const [showCreateApp, setShowCreateApp] = useState(false);
    const [showCreateBot, setShowCreateBot] = useState(false);
    const [newApp, setNewApp] = useState({
        name: '',
        description: '',
        redirect_uris: '',
        scopes: [],
    });
    const [newBot, setNewBot] = useState({ name: '', description: '' });

    const fetchApps = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/oauth/apps/list/`);
            const data = await response.json();
            setApps(data.apps || []);
        } catch (error) {
            toast.error(t('oauthApps.appsLoadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const fetchBots = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bots/list/`);
            const data = await response.json();
            setBots(data.bots || []);
        } catch (error) {
            toast.error(t('oauthApps.botsLoadFailed'));
        }
    };

    useEffect(() => {
        fetchApps();
        fetchBots();
    }, []);

    const createApp = async () => {
        if (!newApp.name) {
            toast.error(t('oauthApps.nameRequired'));
            return;
        }
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/oauth/apps/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newApp,
                    redirect_uris: newApp.redirect_uris.split('\n').filter((uri) => uri.trim()),
                }),
            });
            const data = await response.json();
            toast.success(t('oauthApps.appCreated'));
            setShowCreateApp(false);
            setNewApp({ name: '', description: '', redirect_uris: '', scopes: [] });
            fetchApps();
            if (data.client_id && data.client_secret) {
                toast.info(
                    t('oauthApps.credentials', {
                        clientId: data.client_id,
                        clientSecret: data.client_secret,
                    })
                );
            }
        } catch (error) {
            toast.error(t('oauthApps.appCreateFailed'));
        }
    };

    const createBot = async () => {
        if (!newBot.name) {
            toast.error(t('oauthApps.botNameRequired'));
            return;
        }
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bots/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBot),
            });
            const data = await response.json();
            toast.success(t('oauthApps.botCreated'));
            setShowCreateBot(false);
            setNewBot({ name: '', description: '' });
            fetchBots();
            if (data.token) {
                toast.info(t('oauthApps.botToken', { token: data.token }));
            }
        } catch (error) {
            toast.error(t('oauthApps.botCreateFailed'));
        }
    };

    const deleteApp = async (appId) => {
        if (!(await confirmDialog(t('oauthApps.deleteAppConfirm')))) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/oauth/apps/${appId}/delete/`, { method: 'DELETE' });
            toast.success(t('oauthApps.appDeleted'));
            fetchApps();
        } catch (error) {
            toast.error(t('oauthApps.appDeleteFailed'));
        }
    };

    const deleteBot = async (botId) => {
        if (!(await confirmDialog(t('oauthApps.deleteBotConfirm')))) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/bots/${botId}/delete/`, { method: 'DELETE' });
            toast.success(t('oauthApps.botDeleted'));
            fetchBots();
        } catch (error) {
            toast.error(t('oauthApps.botDeleteFailed'));
        }
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(t('oauthApps.copied', { label }));
    };

    const toggleScope = (scope) => {
        setNewApp((prev) => ({
            ...prev,
            scopes: prev.scopes.includes(scope)
                ? prev.scopes.filter((s) => s !== scope)
                : [...prev.scopes, scope],
        }));
    };

    return {
        apps,
        bots,
        loading,
        activeTab,
        setActiveTab,
        showCreateApp,
        setShowCreateApp,
        showCreateBot,
        setShowCreateBot,
        newApp,
        setNewApp,
        newBot,
        setNewBot,
        createApp,
        createBot,
        deleteApp,
        deleteBot,
        copyToClipboard,
        toggleScope,
        availableScopes: AVAILABLE_SCOPES,
    };
};

export default useOAuthApps;
