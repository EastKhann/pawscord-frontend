import { useState, useEffect } from 'react';
import toast from '../../utils/toast';

const DEFAULT_SETTINGS = {
    is_community: false, rules_channel_id: '', public_updates_channel_id: '',
    verification_level: 'medium', explicit_content_filter: 'medium',
    default_notifications: 'mentions', description: '', preferred_locale: 'tr',
    features: { welcome_screen: true, member_screening: false, discovery: false }
};

export const VERIFICATION_LEVELS = [
    { value: 'none', label: 'Yok', description: 'Herkes mesaj gönderebilir' },
    { value: 'low', label: 'Düşük', description: 'E-posta doğrulaması gerekli' },
    { value: 'medium', label: 'Orta', description: '5 dakika kayıtlı olmalı' },
    { value: 'high', label: 'Yüksek', description: '10 dakika sunucuda olmalı' },
    { value: 'highest', label: 'En Yüksek', description: 'Telefon doğrulaması gerekli' }
];

export const CONTENT_FILTERS = [
    { value: 'disabled', label: 'Kapalı', description: 'İçerik filtresi yok' },
    { value: 'medium', label: 'Orta', description: 'Rolsüz üyeler için filtrele' },
    { value: 'high', label: 'Yüksek', description: 'Tüm mesajları filtrele' }
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
            if (r.ok) toast.success('✅ Topluluk ayarları kaydedildi');
        } catch (e) { console.error('Save error:', e); toast.error('Kaydetme başarısız'); }
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
