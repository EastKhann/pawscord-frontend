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
            if (res.ok) { setSettings(newSettings); toast.success('\u2705 Gizlilik ayarlar\u0131 kaydedildi'); }
            else toast.error('\u274C Ayarlar kaydedilemedi');
        } catch { toast.error('\u274C Ba\u011flant\u0131 hatas\u0131'); }
    };

    const toggleSetting = (key) => updateSettings({ ...settings, [key]: !settings[key] });
    const updateExplicitFilter = (value) => updateSettings({ ...settings, explicit_content_filter: value });

    const addBlockedWord = async () => {
        if (!newWord.trim()) return;
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/blocked-words/add/`, { method: 'POST', headers: authHeaders(true), body: JSON.stringify({ word: newWord.trim() }) });
            if (res.ok) { setBlockedWords(p => [...p, newWord.trim()]); toast.success(`\u2705 "${newWord.trim()}" engellenmi\u015f kelimeler listesine eklendi`); setNewWord(''); }
            else toast.error('\u274C Kelime eklenemedi');
        } catch { toast.error('\u274C Ba\u011flant\u0131 hatas\u0131'); }
    };

    const removeBlockedWord = async (word) => {
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/blocked-words/remove/`, { method: 'POST', headers: authHeaders(true), body: JSON.stringify({ word }) });
            if (res.ok) { setBlockedWords(p => p.filter(w => w !== word)); toast.success(`\u2705 "${word}" engellenmi\u015f kelimeler listesinden kald\u0131r\u0131ld\u0131`); }
            else toast.error('\u274C Kelime kald\u0131r\u0131lamad\u0131');
        } catch { toast.error('\u274C Ba\u011flant\u0131 hatas\u0131'); }
    };

    const requestDataExport = async () => {
        if (!await confirmDialog('Verilerinizi d\u0131\u015fa aktarmak istedi\u011finizden emin misiniz? Bu i\u015flem biraz zaman alabilir.')) return;
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/data-export/request/`, { method: 'POST', headers: authHeaders() });
            res.ok ? toast.success('\u2705 Veri d\u0131\u015fa aktarma i\u015flemi ba\u015flat\u0131ld\u0131. E-postan\u0131za link g\u00f6nderilecek.') : toast.error('\u274C \u0130stek g\u00f6nderilemedi');
        } catch { toast.error('\u274C Ba\u011flant\u0131 hatas\u0131'); }
    };

    return { settings, loading, blockedWords, newWord, setNewWord, toggleSetting, updateExplicitFilter, addBlockedWord, removeBlockedWord, requestDataExport };
}

export const SECTIONS = [
    {
        title: '\uD83D\uDCAC Direkt Mesaj Gizlili\u011fi', toggles: [
            { key: 'allow_dm_from_everyone', label: 'Herkesten DM alabilir', desc: 'Sunucu \u00fcyesi olmasalar bile' },
            { key: 'allow_dm_from_friends_only', label: 'Sadece arkada\u015flardan DM', desc: 'Yaln\u0131zca arkada\u015flar\u0131n\u0131zdan mesaj alabilirsiniz' },
            { key: 'allow_dm_from_server_members', label: 'Sunucu \u00fcyelerinden DM', desc: 'Ayn\u0131 sunucudaki \u00fcyelerden mesaj alabilirsiniz' },
            { key: 'allow_friend_requests', label: 'Arkada\u015fl\u0131k isteklerini kabul et', desc: 'Di\u011fer kullan\u0131c\u0131lar size istek g\u00f6nderebilir' }
        ]
    },
    {
        title: '\uD83C\uDFE0 Sunucu Gizlili\u011fi', toggles: [
            { key: 'keep_dm_history_on_server_leave', label: 'Sunucudan ayr\u0131l\u0131rken DM ge\u00e7mi\u015fini sakla', desc: 'Sunucudan ayr\u0131ld\u0131ktan sonra DM\'ler silinmez' },
            { key: 'show_current_activity', label: 'Mevcut aktiviteyi g\u00f6ster', desc: 'Oynad\u0131\u011f\u0131n\u0131z oyun veya dinledi\u011finiz m\u00fczi\u011fi g\u00f6sterin' }
        ]
    },
    {
        title: '\uD83D\uDC41\uFE0F G\u00f6r\u00fcn\u00fcrl\u00fck', toggles: [
            { key: 'show_online_status', label: '\u00c7evrimi\u00e7i durumu g\u00f6ster', desc: 'Di\u011fer kullan\u0131c\u0131lar \u00e7evrimi\u00e7i oldu\u011funuzu g\u00f6rebilir' },
            { key: 'show_read_receipts', label: 'Okundu bilgisi g\u00f6nder', desc: 'Mesajlar\u0131 okudunuzda kar\u015f\u0131 tarafa bildirim g\u00f6sterilir' },
            { key: 'show_typing_indicator', label: 'Yaz\u0131yor g\u00f6stergesini g\u00f6ster', desc: 'Mesaj yazarken kar\u015f\u0131 tarafa bildirim g\u00f6sterilir' },
            { key: 'allow_profile_views_from_non_friends', label: 'Arkada\u015f olmayanlar profilimi g\u00f6rebilir', desc: 'Herkes profilinizi g\u00f6r\u00fcnt\u00fcleyebilir' }
        ]
    },
    {
        title: '\uD83D\uDCCA Veri Gizlili\u011fi', toggles: [
            { key: 'allow_data_collection', label: 'Veri toplamaya izin ver', desc: 'Uygulamay\u0131 geli\u015ftirmek i\u00e7in anonim kullan\u0131m verisi toplan\u0131r' },
            { key: 'allow_personalized_ads', label: 'Ki\u015fiselle\u015ftirilmi\u015f reklamlara izin ver', desc: 'Size \u00f6zel reklamlar g\u00f6sterilir' }
        ], hasExport: true
    }
];
