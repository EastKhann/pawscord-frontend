import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

const DEFAULT_SETTINGS = {
    allow_dm_from_everyone: true, allow_dm_from_friends_only: false,
    allow_dm_from_server_members: true, allow_friend_requests: true,
    keep_dm_history_on_server_leave: true, show_current_activity: true,
    explicit_content_filter: 'friends', blocked_words_filter_enabled: false,
    show_online_status: true, show_read_receipts: true,
    show_typing_indicator: true, allow_profile_views_from_non_friends: false,
    allow_data_collection: false, allow_personalized_ads: false
};

export default function usePrivacySettings() {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [blockedWords, setBlockedWords] = useState([]);
    const [newWord, setNewWord] = useState('');
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = getApiBase();

    const authHeaders = (json = false) => {
        const h = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` };
        if (json) h['Content-Type'] = 'application/json';
        return h;
    };

    useEffect(() => {
        Promise.all([
            fetch(`${apiBaseUrl}/privacy/settings/`, { headers: authHeaders() }).then(r => r.ok ? r.json() : null),
            fetch(`${apiBaseUrl}/privacy/blocked-words/`, { headers: authHeaders() }).then(r => r.ok ? r.json() : null)
        ]).then(([sData, wData]) => {
            if (sData) setSettings(sData);
            if (wData) setBlockedWords(wData.blocked_words || []);
        }).catch(e => console.error('Error fetching privacy settings:', e))
            .finally(() => setLoading(false));
    }, []);

    const updateSettings = async (newSettings) => {
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/settings/update/`, { method: 'POST', headers: authHeaders(true), body: JSON.stringify(newSettings) });
            if (res.ok) { setSettings(newSettings); toast.success('✅ Gizlilik ayarları kaydedildi'); }
            else toast.error('❌ Ayarlar kaydedilemedi');
        } catch { toast.error('❌ Bağlantı hatası'); }
    };

    const toggleSetting = (key) => updateSettings({ ...settings, [key]: !settings[key] });
    const updateExplicitFilter = (value) => updateSettings({ ...settings, explicit_content_filter: value });

    const addBlockedWord = async () => {
        if (!newWord.trim()) return;
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/blocked-words/add/`, { method: 'POST', headers: authHeaders(true), body: JSON.stringify({ word: newWord.trim() }) });
            if (res.ok) { setBlockedWords(p => [...p, newWord.trim()]); toast.success(`✅ "${newWord.trim()}" engellenmiş kelimeler listesine eklendi`); setNewWord(''); }
            else toast.error('❌ Kelime eklenemedi');
        } catch { toast.error('❌ Bağlantı hatası'); }
    };

    const removeBlockedWord = async (word) => {
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/blocked-words/remove/`, { method: 'POST', headers: authHeaders(true), body: JSON.stringify({ word }) });
            if (res.ok) { setBlockedWords(p => p.filter(w => w !== word)); toast.success(`✅ "${word}" engellenmiş kelimeler listesinden kaldırıldı`); }
            else toast.error('❌ Kelime kaldırılamadı');
        } catch { toast.error('❌ Bağlantı hatası'); }
    };

    const requestDataExport = async () => {
        if (!await confirmDialog('Verilerinizi dışa aktarmak istediğinizden emin misiniz? Bu işlem biraz zaman alabilir.')) return;
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/data-export/request/`, { method: 'POST', headers: authHeaders() });
            res.ok ? toast.success('✅ Veri dışa aktarma işlemi başlatıldı. E-postanıza link gönderilecek.') : toast.error('❌ İstek gönderilemedi');
        } catch { toast.error('❌ Bağlantı hatası'); }
    };

    return { settings, loading, blockedWords, newWord, setNewWord, toggleSetting, updateExplicitFilter, addBlockedWord, removeBlockedWord, requestDataExport };
}

export const SECTIONS = [
    {
        title: '💬 Direkt Mesaj Gizliliği', toggles: [
            { key: 'allow_dm_from_everyone', label: 'Herkesten DM alabilir', desc: 'Sunucu üyesi olmasalar bile' },
            { key: 'allow_dm_from_friends_only', label: 'Sadece arkadaşlardan DM', desc: 'Yalnızca arkadaşlarınızdan mesaj alabilirsiniz' },
            { key: 'allow_dm_from_server_members', label: 'Sunucu üyelerinden DM', desc: 'Aynı sunucudaki üyelerden mesaj alabilirsiniz' },
            { key: 'allow_friend_requests', label: 'Arkadaşlık isteklerini kabul et', desc: 'Diğer kullanıcılar size istek gönderebilir' }
        ]
    },
    {
        title: '🏠 Sunucu Gizliliği', toggles: [
            { key: 'keep_dm_history_on_server_leave', label: 'Sunucudan ayrılırken DM geçmişini sakla', desc: 'Sunucudan ayrıldıktan sonra DM\'ler silinmez' },
            { key: 'show_current_activity', label: 'Mevcut aktiviteyi göster', desc: 'Oynadığınız oyun veya dinlediğiniz müziği gösterin' }
        ]
    },
    {
        title: '👁️ Görünürlük', toggles: [
            { key: 'show_online_status', label: 'Çevrimiçi durumu göster', desc: 'Diğer kullanıcılar çevrimiçi olduğunuzu görebilir' },
            { key: 'show_read_receipts', label: 'Okundu bilgisi gönder', desc: 'Mesajları okudunuzda karşı tarafa bildirim gösterilir' },
            { key: 'show_typing_indicator', label: 'Yazıyor göstergesini göster', desc: 'Mesaj yazarken karşı tarafa bildirim gösterilir' },
            { key: 'allow_profile_views_from_non_friends', label: 'Arkadaş olmayanlar profilimi görebilir', desc: 'Herkes profilinizi görüntüleyebilir' }
        ]
    },
    {
        title: '📊 Veri Gizliliği', toggles: [
            { key: 'allow_data_collection', label: 'Veri toplamaya izin ver', desc: 'Uygulamayı geliştirmek için anonim kullanım verisi toplanır' },
            { key: 'allow_personalized_ads', label: 'Kişiselleştirilmiş reklamlara izin ver', desc: 'Size özel reklamlar gösterilir' }
        ], hasExport: true
    }
];
