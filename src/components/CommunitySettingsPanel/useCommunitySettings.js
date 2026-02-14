import { useState, useEffect } from 'react';
import toast from '../../utils/toast';

const DEFAULT_SETTINGS = {
    is_community: false, rules_channel_id: '', public_updates_channel_id: '',
    verification_level: 'medium', explicit_content_filter: 'medium',
    default_notifications: 'mentions', description: '', preferred_locale: 'tr',
    features: { welcome_screen: true, member_screening: false, discovery: false }
};

export const VERIFICATION_LEVELS = [
    { value: 'none', label: 'Yok', description: 'Herkes mesaj g\u00F6nderebilir' },
    { value: 'low', label: 'D\u00FC\u015F\u00FCk', description: 'E-posta do\u011Frulamas\u0131 gerekli' },
    { value: 'medium', label: 'Orta', description: '5 dakika kay\u0131tl\u0131 olmal\u0131' },
    { value: 'high', label: 'Y\u00FCksek', description: '10 dakika sunucuda olmal\u0131' },
    { value: 'highest', label: 'En Y\u00FCksek', description: 'Telefon do\u011Frulamas\u0131 gerekli' }
];

export const CONTENT_FILTERS = [
    { value: 'disabled', label: 'Kapal\u0131', description: '\u0130\u00E7erik filtresi yok' },
    { value: 'medium', label: 'Orta', description: 'Rols\u00FCz \u00FCyeler i\u00E7in filtrele' },
    { value: 'high', label: 'Y\u00FCksek', description: 'T\u00FCm mesajlar\u0131 filtrele' }
];

const useCommunitySettings = (apiBaseUrl, serverId) => {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [rules, setRules] = useState([]);
    const [screeningQuestions, setScreeningQuestions] = useState([]);
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => { fetchCommunitySettings(); fetchChannels(); }, []);

    const authHeaders = () => ({ 'Authorization': `Bearer ${localStorage.getItem('access_token')}` });

    const fetchCommunitySettings = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/servers/${serverId}/community/settings/`, { headers: authHeaders() });
            if (r.ok) {
                const d = await r.json();
                setSettings(prev => ({ ...prev, ...d }));
                setRules(d.rules || []);
                setScreeningQuestions(d.screening_questions || []);
            }
        } catch (e) { console.error('Fetch settings error:', e); }
        finally { setLoading(false); }
    };

    const fetchChannels = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, { headers: authHeaders() });
            if (r.ok) { const d = await r.json(); setChannels((d.channels || d || []).filter(c => c.type !== 'category')); }
        } catch (e) { console.error('Fetch channels error:', e); }
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            const r = await fetch(`${apiBaseUrl}/servers/${serverId}/community/settings/`, {
                method: 'PUT', headers: { ...authHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...settings, rules, screening_questions: screeningQuestions })
            });
            if (r.ok) toast.success('\u2705 Topluluk ayarlar\u0131 kaydedildi');
        } catch (e) { console.error('Save error:', e); toast.error('Kaydetme ba\u015Far\u0131s\u0131z'); }
        finally { setSaving(false); }
    };

    const addRule = () => setRules(prev => [...prev, { id: Date.now(), title: '', description: '' }]);
    const updateRule = (id, field, value) => setRules(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
    const removeRule = (id) => setRules(prev => prev.filter(r => r.id !== id));

    const addQuestion = () => setScreeningQuestions(prev => [...prev, { id: Date.now(), question: '', required: false }]);
    const updateQuestion = (id, field, value) => setScreeningQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
    const removeQuestion = (id) => setScreeningQuestions(prev => prev.filter(q => q.id !== id));

    return {
        settings, setSettings, rules, screeningQuestions, channels, loading, saving, activeTab, setActiveTab,
        saveSettings, addRule, updateRule, removeRule, addQuestion, updateQuestion, removeQuestion
    };
};

export default useCommunitySettings;
