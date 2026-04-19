import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';

const DEFAULT_SETTINGS = {
    allow_dm_from_everyone: true,
    allow_dm_from_friends_only: false,
    allow_dm_from_server_members: true,
    allow_friend_requests: true,
    keep_dm_history_on_server_leave: true,
    show_current_activity: true,
    explicit_content_filter: 'friends',
    blocked_words_filter_enabled: false,
    show_online_status: true,
    show_read_receipts: true,
    show_typing_indicator: true,
    allow_profile_views_from_non_friends: false,
    allow_data_collection: false,
    allow_personalized_ads: false,
};

export default function usePrivacySettings() {
    const { t } = useTranslation();
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [blockedWords, setBlockedWords] = useState([]);
    const [newWord, setNewWord] = useState('');
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = getApiBase();

    const authHeaders = (json = false) => {
        const h = { Authorization: `Bearer ${getToken()}` };
        if (json) h['Content-Type'] = 'application/json';
        return h;
    };

    useEffect(() => {
        Promise.all([
            fetch(`${apiBaseUrl}/privacy/settings/`, { headers: authHeaders() }).then((r) =>
                r.ok ? r.json() : null
            ),
            fetch(`${apiBaseUrl}/privacy/blocked-words/`, { headers: authHeaders() }).then((r) =>
                r.ok ? r.json() : null
            ),
        ])
            .then(([sData, wData]) => {
                if (sData) setSettings(sData);
                if (wData) setBlockedWords(wData.blocked_words || []);
            })
            .catch((e) => logger.error('Error fetching privacy settings:', e))
            .finally(() => setLoading(false));
    }, []);

    const updateSettings = async (newSettings) => {
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/settings/update/`, {
                method: 'POST',
                headers: authHeaders(true),
                body: JSON.stringify(newSettings),
            });
            if (res.ok) {
                setSettings(newSettings);
                toast.success(t('privacy.saved'));
            } else toast.error(t('privacy.saveFailed'));
        } catch {
            toast.error(t('privacy.connectionError'));
        }
    };

    const toggleSetting = (key) => updateSettings({ ...settings, [key]: !settings[key] });
    const updateExplicitFilter = (value) =>
        updateSettings({ ...settings, explicit_content_filter: value });

    const addBlockedWord = async () => {
        if (!newWord.trim()) return;
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/blocked-words/add/`, {
                method: 'POST',
                headers: authHeaders(true),
                body: JSON.stringify({ word: newWord.trim() }),
            });
            if (res.ok) {
                setBlockedWords((p) => [...p, newWord.trim()]);
                toast.success(t('privacy.wordAdded', { word: newWord.trim() }));
                setNewWord('');
            } else toast.error(t('privacy.wordAddFailed'));
        } catch {
            toast.error(t('privacy.connectionError'));
        }
    };

    const removeBlockedWord = async (word) => {
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/blocked-words/remove/`, {
                method: 'POST',
                headers: authHeaders(true),
                body: JSON.stringify({ word }),
            });
            if (res.ok) {
                setBlockedWords((p) => p.filter((w) => w !== word));
                toast.success(t('privacy.wordRemoved', { word }));
            } else toast.error(t('privacy.wordRemoveFailed'));
        } catch {
            toast.error(t('privacy.connectionError'));
        }
    };

    const requestDataExport = async () => {
        if (
            !(await confirmDialog(
                'Verilerinizi dışa aktarmak istediğinizden emin misiniz? Bu biraz zaman alabilir.'
            ))
        )
            return;
        try {
            const res = await fetch(`${apiBaseUrl}/privacy/data-export/request/`, {
                method: 'POST',
                headers: authHeaders(),
            });
            res.ok
                ? toast.success(t('privacy.exportStarted'))
                : toast.error(t('privacy.exportFailed'));
        } catch {
            toast.error(t('privacy.connectionError'));
        }
    };

    return {
        settings,
        loading,
        blockedWords,
        newWord,
        setNewWord,
        toggleSetting,
        updateExplicitFilter,
        addBlockedWord,
        removeBlockedWord,
        requestDataExport,
    };
}

export const SECTIONS = [
    {
        titleKey: 'privacy.dmPrivacy',
        titleIcon: '💬',
        toggles: [
            {
                key: 'allow_dm_from_everyone',
                labelKey: 'privacy.allowDmEveryone',
                descKey: 'privacy.allowDmEveryoneDesc',
            },
            {
                key: 'allow_dm_from_friends_only',
                labelKey: 'privacy.dmFriendsOnly',
                descKey: 'privacy.dmFriendsOnlyDesc',
            },
            {
                key: 'allow_dm_from_server_members',
                labelKey: 'privacy.dmFromServerMembers',
                descKey: 'privacy.dmFromServerMembersDesc',
            },
            {
                key: 'allow_friend_requests',
                labelKey: 'privacy.allowFriendRequests',
                descKey: 'privacy.allowFriendRequestsDesc',
            },
        ],
    },
    {
        titleKey: 'privacy.serverPrivacy',
        titleIcon: '🏠',
        toggles: [
            {
                key: 'keep_dm_history_on_server_leave',
                labelKey: 'privacy.keepDmHistory',
                descKey: 'privacy.keepDmHistoryDesc',
            },
            {
                key: 'show_current_activity',
                labelKey: 'privacy.showActivity',
                descKey: 'privacy.showActivityDesc',
            },
        ],
    },
    {
        titleKey: 'privacy.visibility',
        titleIcon: '👁️',
        toggles: [
            {
                key: 'show_online_status',
                labelKey: 'privacy.showOnline',
                descKey: 'privacy.showOnlineDesc',
            },
            {
                key: 'show_read_receipts',
                labelKey: 'privacy.readReceipts',
                descKey: 'privacy.readReceiptsDesc',
            },
            {
                key: 'show_typing_indicator',
                labelKey: 'privacy.typingIndicator',
                descKey: 'privacy.typingIndicatorDesc',
            },
            {
                key: 'allow_profile_views_from_non_friends',
                labelKey: 'privacy.profileViews',
                descKey: 'privacy.profileViewsDesc',
            },
        ],
    },
    {
        titleKey: 'privacy.dataPrivacy',
        titleIcon: '📊',
        toggles: [
            {
                key: 'allow_data_collection',
                labelKey: 'privacy.allowDataCollection',
                descKey: 'privacy.allowDataCollectionDesc',
            },
            {
                key: 'allow_personalized_ads',
                labelKey: 'privacy.personalizedAds',
                descKey: 'privacy.personalizedAdsDesc',
            },
        ],
        hasExport: true,
    },
];
