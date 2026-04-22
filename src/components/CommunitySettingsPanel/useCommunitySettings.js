import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import toast from '../../utils/toast';
import logger from '../../utils/logger';

const DEFAULT_SETTINGS = {
    is_community: false,
    rules_channel_id: '',
    public_updates_channel_id: '',
    verification_level: 'medium',
    explicit_content_filter: 'medium',
    default_notifications: 'mentions',
    description: '',
    preferred_locale: 'tr',
    features: { welcome_screen: true, member_screening: false, discovery: false },
};

export const VERIFICATION_LEVELS = [
    { value: 'none', label: t('verif.none','None'), description: t('verif.noneDesc','Anyone can send messages') },
    { value: 'low', label: t('verif.low','Low'), description: t('verif.lowDesc','Email verification required') },
    { value: 'medium', label: t('verif.medium','Medium'), description: t('verif.mediumDesc','Must be registered for 5 minutes') },
    { value: 'high', label: t('verif.high','High'), description: t('verif.highDesc','Must be on server for 10 minutes') },
    { value: 'highest', label: t('verif.highest','Highest'), description: t('verif.highestDesc','Phone verification required') },
];

export const CONTENT_FILTERS = [
    { value: 'disabled', label: t('contentFilter.disabled','Off'), description: t('contentFilter.disabledDesc','No content filter') },
    { value: 'medium', label: t('contentFilter.medium','Medium'), description: t('contentFilter.mediumDesc','Filter members without roles') },
    { value: 'high', label: t('contentFilter.high','High'), description: t('contentFilter.highDesc','Filter all messages') },
];

const useCommunitySettings = (apiBaseUrl, serverId) => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [rules, setRules] = useState([]);
    const [screeningQuestions, setScreeningQuestions] = useState([]);
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        fetchCommunitySettings();
        fetchChannels();
    }, []);

    const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

    const fetchCommunitySettings = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/servers/${serverId}/community/settings/`, {
                headers: authHeaders(),
            });
            if (r.ok) {
                const d = await r.json();
                setSettings((prev) => ({ ...prev, ...d }));
                setRules(d.rules || []);
                setScreeningQuestions(d.screening_questions || []);
            }
        } catch (e) {
            logger.error('Fetch settings error:', e);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannels = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
                headers: authHeaders(),
            });
            if (r.ok) {
                const d = await r.json();
                setChannels((d.channels || d || []).filter((c) => c.type !== 'category'));
            }
        } catch (e) {
            logger.error('Fetch channels error:', e);
        }
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            const r = await fetch(`${apiBaseUrl}/servers/${serverId}/community/settings/`, {
                method: 'PUT',
                headers: { ...authHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...settings,
                    rules,
                    screening_questions: screeningQuestions,
                }),
            });
            if (r.ok) toast.success(t('communitySettings.saved'));
        } catch (e) {
            logger.error('Save error:', e);
            toast.error(t('communitySettings.saveFailed'));
        } finally {
            setSaving(false);
        }
    };

    const addRule = () =>
        setRules((prev) => [...prev, { id: Date.now(), title: '', description: '' }]);
    const updateRule = (id, field, value) =>
        setRules((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    const removeRule = (id) => setRules((prev) => prev.filter((r) => r.id !== id));

    const addQuestion = () =>
        setScreeningQuestions((prev) => [
            ...prev,
            { id: Date.now(), question: '', required: false },
        ]);
    const updateQuestion = (id, field, value) =>
        setScreeningQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
        );
    const removeQuestion = (id) => setScreeningQuestions((prev) => prev.filter((q) => q.id !== id));

    return {
        settings,
        setSettings,
        rules,
        screeningQuestions,
        channels,
        loading,
        saving,
        activeTab,
        setActiveTab,
        saveSettings,
        addRule,
        updateRule,
        removeRule,
        addQuestion,
        updateQuestion,
        removeQuestion,
    };
};

export default useCommunitySettings;
