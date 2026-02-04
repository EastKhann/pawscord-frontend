// 🎉 Nice-to-Have Features API Service (29 Özellik)
// 4 Şubat 2026

import { API_BASE } from '../config';

const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json'
});

// ==========================================
// 🎂 #2 - Birthday Calendar
// ==========================================

export const birthdayApi = {
    getBirthday: async () => {
        const res = await fetch(`${API_BASE}/api/birthday/`, { headers: getAuthHeaders() });
        return res.json();
    },
    setBirthday: async (data) => {
        const res = await fetch(`${API_BASE}/api/birthday/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    getBirthdaysToday: async () => {
        const res = await fetch(`${API_BASE}/api/birthdays/today/`, { headers: getAuthHeaders() });
        return res.json();
    },
    getServerBirthdays: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/birthdays/`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 💝 #5 - Gift System
// ==========================================

export const giftApi = {
    sendGift: async (data) => {
        const res = await fetch(`${API_BASE}/api/gifts/send/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    getMyGifts: async () => {
        const res = await fetch(`${API_BASE}/api/gifts/`, { headers: getAuthHeaders() });
        return res.json();
    },
    openGift: async (giftId) => {
        const res = await fetch(`${API_BASE}/api/gifts/${giftId}/open/`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🏆 #6 - Leaderboard
// ==========================================

export const leaderboardApi = {
    getServerLeaderboard: async (serverId, type = 'xp', limit = 10) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/leaderboard/?type=${type}&limit=${limit}`, { headers: getAuthHeaders() });
        return res.json();
    },
    getGlobalLeaderboard: async (type = 'xp', limit = 10) => {
        const res = await fetch(`${API_BASE}/api/leaderboard/global/?type=${type}&limit=${limit}`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 🎭 #7 - User Mood
// ==========================================

export const moodApi = {
    getMood: async () => {
        const res = await fetch(`${API_BASE}/api/mood/`, { headers: getAuthHeaders() });
        return res.json();
    },
    setMood: async (data) => {
        const res = await fetch(`${API_BASE}/api/mood/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    getUserStatus: async (userId) => {
        const res = await fetch(`${API_BASE}/api/users/${userId}/status/`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 🎨 #10 - Profile Themes
// ==========================================

export const profileThemeApi = {
    getTheme: async () => {
        const res = await fetch(`${API_BASE}/api/profile/theme/`, { headers: getAuthHeaders() });
        return res.json();
    },
    setTheme: async (data) => {
        const res = await fetch(`${API_BASE}/api/profile/theme/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 📊 #11 - Social Analytics
// ==========================================

export const socialAnalyticsApi = {
    getStats: async (days = 30) => {
        const res = await fetch(`${API_BASE}/api/analytics/social/?days=${days}`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 🎤 #12 - Voice Transcription
// ==========================================

export const voiceTranscriptionApi = {
    transcribe: async (messageId) => {
        const res = await fetch(`${API_BASE}/api/messages/${messageId}/transcribe/`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🎮 #14 - Game Events
// ==========================================

export const gameEventsApi = {
    getServerEvents: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/events/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createEvent: async (serverId, data) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/events/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    rsvp: async (eventId, status) => {
        const res = await fetch(`${API_BASE}/api/events/${eventId}/rsvp/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status })
        });
        return res.json();
    },
    cancelRsvp: async (eventId) => {
        const res = await fetch(`${API_BASE}/api/events/${eventId}/rsvp/`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🏅 #15 - Achievement Showcase
// ==========================================

export const achievementShowcaseApi = {
    getShowcase: async () => {
        const res = await fetch(`${API_BASE}/api/achievements/showcase/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateShowcase: async (data) => {
        const res = await fetch(`${API_BASE}/api/achievements/showcase/`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 💌 #16 - Anonymous Feedback
// ==========================================

export const feedbackApi = {
    sendFeedback: async (data) => {
        const res = await fetch(`${API_BASE}/api/feedback/send/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    getMyFeedbacks: async () => {
        const res = await fetch(`${API_BASE}/api/feedback/`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 🔮 #18 - Time Capsule
// ==========================================

export const timeCapsuleApi = {
    getCapsules: async () => {
        const res = await fetch(`${API_BASE}/api/time-capsule/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createCapsule: async (data) => {
        const res = await fetch(`${API_BASE}/api/time-capsule/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 📱 #20 - QR Codes
// ==========================================

export const qrCodeApi = {
    generate: async (data) => {
        const res = await fetch(`${API_BASE}/api/qr/generate/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    scan: async (code) => {
        const res = await fetch(`${API_BASE}/api/qr/${code}/`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 🧵 #21 - Advanced Threading
// ==========================================

export const threadingApi = {
    getSettings: async (threadId) => {
        const res = await fetch(`${API_BASE}/api/threads/${threadId}/settings/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateSettings: async (threadId, data) => {
        const res = await fetch(`${API_BASE}/api/threads/${threadId}/settings/`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    subscribe: async (threadId, level = 'all') => {
        const res = await fetch(`${API_BASE}/api/threads/${threadId}/subscribe/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ notification_level: level })
        });
        return res.json();
    },
    unsubscribe: async (threadId) => {
        const res = await fetch(`${API_BASE}/api/threads/${threadId}/subscribe/`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 📝 #23 - Message Templates
// ==========================================

export const messageTemplatesApi = {
    getTemplates: async (serverId = null) => {
        const url = serverId
            ? `${API_BASE}/api/templates/?server_id=${serverId}`
            : `${API_BASE}/api/templates/`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        return res.json();
    },
    createTemplate: async (data) => {
        const res = await fetch(`${API_BASE}/api/templates/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 🔍 #25 - Advanced Search
// ==========================================

export const advancedSearchApi = {
    search: async (query, filters = {}) => {
        const res = await fetch(`${API_BASE}/api/search/advanced/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ query, filters })
        });
        return res.json();
    }
};

// ==========================================
// 💾 #27 - Message Auto-Delete
// ==========================================

export const autoDeleteApi = {
    getSettings: async () => {
        const res = await fetch(`${API_BASE}/api/settings/auto-delete/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateSettings: async (data) => {
        const res = await fetch(`${API_BASE}/api/settings/auto-delete/`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 🔗 #29 - Link Preview
// ==========================================

export const linkPreviewApi = {
    fetchPreview: async (url) => {
        const res = await fetch(`${API_BASE}/api/link-preview/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ url })
        });
        return res.json();
    }
};

// ==========================================
// 🗣️ #31 - TTS Settings
// ==========================================

export const ttsApi = {
    getSettings: async () => {
        const res = await fetch(`${API_BASE}/api/tts/settings/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateSettings: async (data) => {
        const res = await fetch(`${API_BASE}/api/tts/settings/`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 📦 #32 - Message Bundles
// ==========================================

export const messageBundlesApi = {
    getBundles: async () => {
        const res = await fetch(`${API_BASE}/api/bundles/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createBundle: async (data) => {
        const res = await fetch(`${API_BASE}/api/bundles/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 🔐 #34 - Ephemeral Messages
// ==========================================

export const ephemeralApi = {
    getSettings: async (conversationId = null, roomId = null) => {
        let url = `${API_BASE}/api/ephemeral/settings/`;
        if (conversationId) url += `?conversation_id=${conversationId}`;
        if (roomId) url += `?room_id=${roomId}`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        return res.json();
    },
    updateSettings: async (data) => {
        const res = await fetch(`${API_BASE}/api/ephemeral/settings/`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 💬 #35 - Translation
// ==========================================

export const translationApi = {
    translate: async (text, targetLanguage = 'en') => {
        const res = await fetch(`${API_BASE}/api/translate/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ text, target_language: targetLanguage })
        });
        return res.json();
    },
    getPreference: async () => {
        const res = await fetch(`${API_BASE}/api/translation/preference/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updatePreference: async (data) => {
        const res = await fetch(`${API_BASE}/api/translation/preference/`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 🕵️ #40 - Security Activity
// ==========================================

export const securityApi = {
    getActivityLog: async () => {
        const res = await fetch(`${API_BASE}/api/security/activity/`, { headers: getAuthHeaders() });
        return res.json();
    },
    getTrustedDevices: async () => {
        const res = await fetch(`${API_BASE}/api/security/devices/`, { headers: getAuthHeaders() });
        return res.json();
    },
    removeDevice: async (deviceId) => {
        const res = await fetch(`${API_BASE}/api/security/devices/${deviceId}/`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 📜 #42 - Audit Log Retention
// ==========================================

export const auditRetentionApi = {
    getPolicy: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/audit/policy/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updatePolicy: async (serverId, data) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/audit/policy/`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    getArchives: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/audit/archives/`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// ⚖️ #43 - Appeal System
// ==========================================

export const appealApi = {
    getMyAppeals: async () => {
        const res = await fetch(`${API_BASE}/api/appeals/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createAppeal: async (data) => {
        const res = await fetch(`${API_BASE}/api/appeals/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    getAppealDetails: async (appealId) => {
        const res = await fetch(`${API_BASE}/api/appeals/${appealId}/`, { headers: getAuthHeaders() });
        return res.json();
    },
    reviewAppeal: async (appealId, data) => {
        const res = await fetch(`${API_BASE}/api/appeals/${appealId}/`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 🔐 #44 - E2EE Keys
// ==========================================

export const e2eeKeysApi = {
    getMyKeys: async () => {
        const res = await fetch(`${API_BASE}/api/e2ee/keys/`, { headers: getAuthHeaders() });
        return res.json();
    },
    registerKeys: async (data) => {
        const res = await fetch(`${API_BASE}/api/e2ee/keys/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    getUserPublicKey: async (userId) => {
        const res = await fetch(`${API_BASE}/api/e2ee/keys/${userId}/`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 🚨 #45 - Emergency Broadcast
// ==========================================

export const emergencyBroadcastApi = {
    getBroadcasts: async (serverId = null) => {
        const url = serverId
            ? `${API_BASE}/api/servers/${serverId}/emergency/`
            : `${API_BASE}/api/emergency/`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        return res.json();
    },
    createBroadcast: async (serverId, data) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/emergency/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    acknowledge: async (broadcastId) => {
        const res = await fetch(`${API_BASE}/api/emergency/${broadcastId}/ack/`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🌓 #46 - Custom Themes
// ==========================================

export const customThemesApi = {
    getThemes: async () => {
        const res = await fetch(`${API_BASE}/api/themes/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createTheme: async (data) => {
        const res = await fetch(`${API_BASE}/api/themes/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    installTheme: async (themeId) => {
        const res = await fetch(`${API_BASE}/api/themes/${themeId}/install/`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return res.json();
    },
    uninstallTheme: async (themeId) => {
        const res = await fetch(`${API_BASE}/api/themes/${themeId}/install/`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🖼️ #50 - View Preferences
// ==========================================

export const viewPreferencesApi = {
    getPreferences: async () => {
        const res = await fetch(`${API_BASE}/api/preferences/view/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updatePreferences: async (data) => {
        const res = await fetch(`${API_BASE}/api/preferences/view/`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    }
};

// ==========================================
// 📈 #96 - Advanced User Analytics
// ==========================================

export const userAnalyticsApi = {
    getSummary: async (userId = null) => {
        const url = userId
            ? `${API_BASE}/api/analytics/user/summary/?user_id=${userId}`
            : `${API_BASE}/api/analytics/user/summary/`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        return res.json();
    },
    getHistory: async (days = 30, userId = null) => {
        let url = `${API_BASE}/api/analytics/user/history/?days=${days}`;
        if (userId) url += `&user_id=${userId}`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        return res.json();
    },
    getWordCloud: async (days = 30, userId = null) => {
        let url = `${API_BASE}/api/analytics/user/wordcloud/?days=${days}`;
        if (userId) url += `&user_id=${userId}`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 📊 #97 - Server Growth Metrics
// ==========================================

export const serverGrowthApi = {
    getMetrics: async (serverId, days = 30) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/growth/?days=${days}`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    getRetention: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/retention/`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    getConversionFunnel: async (serverId, days = 30) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/funnel/?days=${days}`, {
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🗂️ #98 - Data Export Tools (GDPR)
// ==========================================

export const dataExportApi = {
    getRequests: async () => {
        const res = await fetch(`${API_BASE}/api/export/requests/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createRequest: async (data) => {
        const res = await fetch(`${API_BASE}/api/export/requests/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    download: async (exportId) => {
        const res = await fetch(`${API_BASE}/api/export/${exportId}/download/`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    getScheduled: async () => {
        const res = await fetch(`${API_BASE}/api/export/scheduled/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createScheduled: async (data) => {
        const res = await fetch(`${API_BASE}/api/export/scheduled/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    deleteScheduled: async (scheduleId) => {
        const res = await fetch(`${API_BASE}/api/export/scheduled/`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
            body: JSON.stringify({ schedule_id: scheduleId })
        });
        return res.json();
    }
};

// ==========================================
// 📉 #99 - Performance Monitoring Dashboard
// ==========================================

export const performanceApi = {
    getSystemMetrics: async () => {
        const res = await fetch(`${API_BASE}/api/admin/metrics/`, { headers: getAuthHeaders() });
        return res.json();
    },
    getErrorLogs: async (options = {}) => {
        const params = new URLSearchParams();
        if (options.severity) params.append('severity', options.severity);
        if (options.resolved !== undefined) params.append('resolved', options.resolved);
        if (options.limit) params.append('limit', options.limit);

        const url = `${API_BASE}/api/admin/errors/?${params.toString()}`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        return res.json();
    },
    resolveError: async (errorId, note = '') => {
        const res = await fetch(`${API_BASE}/api/admin/errors/${errorId}/resolve/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ note })
        });
        return res.json();
    },
    getEndpointMetrics: async (days = 7) => {
        const res = await fetch(`${API_BASE}/api/admin/endpoints/?days=${days}`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    getHealthStatus: async () => {
        const res = await fetch(`${API_BASE}/api/admin/health/`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 🤖 #79 - Custom Bot Builder (No-Code)
// ==========================================

export const botBuilderApi = {
    getBots: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/bots/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createBot: async (serverId, botData) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/bots/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(botData)
        });
        return res.json();
    },
    getBot: async (botId) => {
        const res = await fetch(`${API_BASE}/api/bots/${botId}/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateBot: async (botId, data) => {
        const res = await fetch(`${API_BASE}/api/bots/${botId}/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    deleteBot: async (botId) => {
        const res = await fetch(`${API_BASE}/api/bots/${botId}/`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    },
    addTrigger: async (botId, triggerData) => {
        const res = await fetch(`${API_BASE}/api/bots/${botId}/triggers/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(triggerData)
        });
        return res.json();
    },
    getLogs: async (botId, limit = 50) => {
        const res = await fetch(`${API_BASE}/api/bots/${botId}/logs/?limit=${limit}`, {
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🚨 #36 - AI-Powered Toxicity Detection
// ==========================================

export const toxicityApi = {
    checkContent: async (content, context = {}) => {
        const res = await fetch(`${API_BASE}/api/moderation/toxicity/check/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ content, context })
        });
        return res.json();
    },
    getSettings: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/toxicity/settings/`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    updateSettings: async (serverId, settings) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/toxicity/settings/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    },
    reportFalsePositive: async (checkId, reason) => {
        const res = await fetch(`${API_BASE}/api/toxicity/${checkId}/false-positive/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ reason })
        });
        return res.json();
    }
};

// ==========================================
// 🔒 #37 - Two-Factor Hardware Key Support
// ==========================================

export const hardwareKeyApi = {
    getKeys: async () => {
        const res = await fetch(`${API_BASE}/api/auth/2fa/hardware-keys/`, { headers: getAuthHeaders() });
        return res.json();
    },
    registerKey: async (keyData) => {
        const res = await fetch(`${API_BASE}/api/auth/2fa/hardware-keys/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(keyData)
        });
        return res.json();
    },
    deleteKey: async (keyId) => {
        const res = await fetch(`${API_BASE}/api/auth/2fa/hardware-keys/`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
            body: JSON.stringify({ key_id: keyId })
        });
        return res.json();
    },
    generateBackupCodes: async () => {
        const res = await fetch(`${API_BASE}/api/auth/2fa/backup-codes/`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return res.json();
    },
    useBackupCode: async (code) => {
        const res = await fetch(`${API_BASE}/api/auth/2fa/backup-codes/`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ code })
        });
        return res.json();
    },
    getSettings: async () => {
        const res = await fetch(`${API_BASE}/api/auth/2fa/settings/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateSettings: async (settings) => {
        const res = await fetch(`${API_BASE}/api/auth/2fa/settings/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    }
};

// ==========================================
// 📸 #38 - Image Moderation AI
// ==========================================

export const imageModerationApi = {
    scanImage: async (imageUrl) => {
        const res = await fetch(`${API_BASE}/api/moderation/image/scan/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ image_url: imageUrl })
        });
        return res.json();
    },
    getSettings: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/image-moderation/settings/`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    updateSettings: async (serverId, settings) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/image-moderation/settings/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    },
    getQueue: async (serverId, status = 'pending') => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/image-moderation/queue/?status=${status}`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    reviewImage: async (serverId, itemId, action) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/image-moderation/queue/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ item_id: itemId, action })
        });
        return res.json();
    }
};

// ==========================================
// 🚫 #39 - Advanced Spam Detection
// ==========================================

export const spamDetectionApi = {
    checkContent: async (data) => {
        const res = await fetch(`${API_BASE}/api/moderation/spam/check/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        return res.json();
    },
    getSettings: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/spam/settings/`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    updateSettings: async (serverId, settings) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/spam/settings/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    }
};

// ==========================================
// ♿ #47 - Screen Reader Optimization (Accessibility)
// ==========================================

export const accessibilityApi = {
    getSettings: async () => {
        const res = await fetch(`${API_BASE}/api/preferences/accessibility/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateSettings: async (settings) => {
        const res = await fetch(`${API_BASE}/api/preferences/accessibility/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    }
};

// ==========================================
// 🧠 #74 - AI Chat Summarization
// ==========================================

export const chatSummaryApi = {
    generateSummary: async (roomId, options = {}) => {
        const res = await fetch(`${API_BASE}/api/summaries/generate/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ room_id: roomId, ...options })
        });
        return res.json();
    },
    getSummaries: async (roomId) => {
        const res = await fetch(`${API_BASE}/api/rooms/${roomId}/summaries/`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    getSharedSummary: async (shareToken) => {
        const res = await fetch(`${API_BASE}/api/summaries/shared/${shareToken}/`);
        return res.json();
    }
};

// ==========================================
// 🧩 #81 - AI Content Moderation Assistant
// ==========================================

export const moderationAssistantApi = {
    getSuggestions: async (serverId, status = 'pending') => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/moderation/suggestions/?status=${status}`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    reviewSuggestion: async (suggestionId, action, note = '') => {
        const res = await fetch(`${API_BASE}/api/moderation/suggestions/${suggestionId}/review/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action, note })
        });
        return res.json();
    },
    getSettings: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/moderation/assistant/settings/`, {
            headers: getAuthHeaders()
        });
        return res.json();
    },
    updateSettings: async (serverId, settings) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/moderation/assistant/settings/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    },
    getEfficiency: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/moderation/efficiency/`, {
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ============================================================================
// 🟡 MEDIUM PRIORITY FEATURES - 20 Yeni Özellik Frontend API
// ============================================================================

// ==========================================
// 👫 #1 - User Relationship System
// ==========================================

export const relationshipApi = {
    getAll: async () => {
        const res = await fetch(`${API_BASE}/api/relationships/`, { headers: getAuthHeaders() });
        return res.json();
    },
    create: async (targetUserId, type = 'friend', nickname = null) => {
        const res = await fetch(`${API_BASE}/api/relationships/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ target_user_id: targetUserId, relationship_type: type, nickname })
        });
        return res.json();
    },
    getDetail: async (relationshipId) => {
        const res = await fetch(`${API_BASE}/api/relationships/${relationshipId}/`, { headers: getAuthHeaders() });
        return res.json();
    },
    delete: async (relationshipId) => {
        const res = await fetch(`${API_BASE}/api/relationships/${relationshipId}/`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 📸 #3 - Story/Status System
// ==========================================

export const storyApi = {
    getFeed: async () => {
        const res = await fetch(`${API_BASE}/api/stories/`, { headers: getAuthHeaders() });
        return res.json();
    },
    create: async (storyData) => {
        const res = await fetch(`${API_BASE}/api/stories/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(storyData)
        });
        return res.json();
    },
    view: async (storyId) => {
        const res = await fetch(`${API_BASE}/api/stories/${storyId}/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'view' })
        });
        return res.json();
    },
    react: async (storyId, emoji) => {
        const res = await fetch(`${API_BASE}/api/stories/${storyId}/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'react', emoji })
        });
        return res.json();
    },
    delete: async (storyId) => {
        const res = await fetch(`${API_BASE}/api/stories/${storyId}/`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    },
    getHighlights: async () => {
        const res = await fetch(`${API_BASE}/api/stories/highlights/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createHighlight: async (title, storyIds) => {
        const res = await fetch(`${API_BASE}/api/stories/highlights/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ title, story_ids: storyIds })
        });
        return res.json();
    }
};

// ==========================================
// 🔔 #9 - Smart Notification Scheduling
// ==========================================

export const notificationScheduleApi = {
    getSchedules: async () => {
        const res = await fetch(`${API_BASE}/api/notifications/schedules/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createSchedule: async (scheduleData) => {
        const res = await fetch(`${API_BASE}/api/notifications/schedules/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(scheduleData)
        });
        return res.json();
    },
    getFocusMode: async () => {
        const res = await fetch(`${API_BASE}/api/focus-mode/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateFocusMode: async (settings) => {
        const res = await fetch(`${API_BASE}/api/focus-mode/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    },
    toggleFocusMode: async () => {
        const res = await fetch(`${API_BASE}/api/focus-mode/`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🎯 #17 - Interest Tags & Matching
// ==========================================

export const interestApi = {
    getTags: async (category = null) => {
        const url = category ? `${API_BASE}/api/interests/tags/?category=${category}` : `${API_BASE}/api/interests/tags/`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        return res.json();
    },
    getUserInterests: async () => {
        const res = await fetch(`${API_BASE}/api/interests/`, { headers: getAuthHeaders() });
        return res.json();
    },
    addInterest: async (tagId, skillLevel = 'intermediate') => {
        const res = await fetch(`${API_BASE}/api/interests/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ tag_id: tagId, skill_level: skillLevel })
        });
        return res.json();
    },
    removeInterest: async (interestId) => {
        const res = await fetch(`${API_BASE}/api/interests/`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
            body: JSON.stringify({ interest_id: interestId })
        });
        return res.json();
    },
    getMatches: async () => {
        const res = await fetch(`${API_BASE}/api/interests/matches/`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 📌 #22 - Smart Pinned Messages
// ==========================================

export const smartPinApi = {
    getPins: async (roomId) => {
        const res = await fetch(`${API_BASE}/api/rooms/${roomId}/pins/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createPin: async (roomId, messageId, options = {}) => {
        const res = await fetch(`${API_BASE}/api/rooms/${roomId}/pins/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ message_id: messageId, ...options })
        });
        return res.json();
    },
    deletePin: async (pinId) => {
        const res = await fetch(`${API_BASE}/api/pins/${pinId}/`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 📅 #26 - Message Scheduling with Recurrence
// ==========================================

export const messageSchedulingApi = {
    getScheduled: async () => {
        const res = await fetch(`${API_BASE}/api/scheduled-messages/`, { headers: getAuthHeaders() });
        return res.json();
    },
    scheduleMessage: async (roomId, content, scheduledAt, recurrence = {}) => {
        const res = await fetch(`${API_BASE}/api/scheduled-messages/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ room_id: roomId, content, scheduled_at: scheduledAt, ...recurrence })
        });
        return res.json();
    },
    cancelScheduled: async (messageId) => {
        const res = await fetch(`${API_BASE}/api/scheduled-messages/${messageId}/`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🎯 #33 - Smart Mention Suggestions
// ==========================================

export const mentionSuggestionApi = {
    getSuggestions: async (roomId, query = '') => {
        const res = await fetch(`${API_BASE}/api/rooms/${roomId}/mention-suggestions/?q=${query}`, {
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🎭 #41 - Alt Account Detection
// ==========================================

export const altAccountApi = {
    recordFingerprint: async (fingerprintData) => {
        const res = await fetch(`${API_BASE}/api/fingerprint/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(fingerprintData)
        });
        return res.json();
    },
    getSuspicions: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/alt-accounts/`, { headers: getAuthHeaders() });
        return res.json();
    },
    reviewSuspicion: async (suspicionId, result) => {
        const res = await fetch(`${API_BASE}/api/alt-accounts/${suspicionId}/review/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ result })
        });
        return res.json();
    }
};

// ==========================================
// 🔠 #48 - Dyslexia-Friendly Font
// ==========================================

export const dyslexiaApi = {
    getSettings: async () => {
        const res = await fetch(`${API_BASE}/api/preferences/dyslexia/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateSettings: async (settings) => {
        const res = await fetch(`${API_BASE}/api/preferences/dyslexia/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    }
};

// ==========================================
// 📱 #49 - Gesture Controls
// ==========================================

export const gestureApi = {
    getSettings: async () => {
        const res = await fetch(`${API_BASE}/api/preferences/gestures/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateSettings: async (settings) => {
        const res = await fetch(`${API_BASE}/api/preferences/gestures/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    }
};

// ==========================================
// 🌍 #53 - RTL Language Support
// ==========================================

export const rtlApi = {
    getSettings: async () => {
        const res = await fetch(`${API_BASE}/api/preferences/rtl/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateSettings: async (settings) => {
        const res = await fetch(`${API_BASE}/api/preferences/rtl/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    }
};

// ==========================================
// 🎙️ #56 - Voice Channel Recording
// ==========================================

export const voiceRecordingApi = {
    getRecordings: async (channelId) => {
        const res = await fetch(`${API_BASE}/api/voice-channels/${channelId}/recordings/`, { headers: getAuthHeaders() });
        return res.json();
    },
    startRecording: async (channelId) => {
        const res = await fetch(`${API_BASE}/api/voice-channels/${channelId}/recordings/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'start' })
        });
        return res.json();
    },
    stopRecording: async (channelId, recordingId) => {
        const res = await fetch(`${API_BASE}/api/voice-channels/${channelId}/recordings/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'stop', recording_id: recordingId })
        });
        return res.json();
    },
    giveConsent: async (recordingId, consent = true) => {
        const res = await fetch(`${API_BASE}/api/recordings/${recordingId}/consent/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ consent })
        });
        return res.json();
    }
};

// ==========================================
// 🎬 #61 - Screen Share Annotations
// ==========================================

export const annotationApi = {
    getAnnotations: async (sessionId) => {
        const res = await fetch(`${API_BASE}/api/screen-share/${sessionId}/annotations/`, { headers: getAuthHeaders() });
        return res.json();
    },
    addAnnotation: async (sessionId, annotationData) => {
        const res = await fetch(`${API_BASE}/api/screen-share/${sessionId}/annotations/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(annotationData)
        });
        return res.json();
    },
    clearAnnotations: async (sessionId) => {
        const res = await fetch(`${API_BASE}/api/screen-share/${sessionId}/annotations/clear/`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 📞 #62 - Call Recording with Transcription
// ==========================================

export const callTranscriptApi = {
    getTranscript: async (recordingId) => {
        const res = await fetch(`${API_BASE}/api/recordings/${recordingId}/transcript/`, { headers: getAuthHeaders() });
        return res.json();
    },
    requestTranscription: async (recordingId) => {
        const res = await fetch(`${API_BASE}/api/recordings/${recordingId}/transcribe/`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

// ==========================================
// 🎤 #63 - Voice Channel Queue System
// ==========================================

export const voiceQueueApi = {
    getQueue: async (channelId) => {
        const res = await fetch(`${API_BASE}/api/voice-channels/${channelId}/queue/`, { headers: getAuthHeaders() });
        return res.json();
    },
    toggleQueue: async (channelId) => {
        const res = await fetch(`${API_BASE}/api/voice-channels/${channelId}/queue/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'toggle' })
        });
        return res.json();
    },
    raiseHand: async (channelId) => {
        const res = await fetch(`${API_BASE}/api/voice-channels/${channelId}/queue/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'raise_hand' })
        });
        return res.json();
    },
    lowerHand: async (channelId) => {
        const res = await fetch(`${API_BASE}/api/voice-channels/${channelId}/queue/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'lower_hand' })
        });
        return res.json();
    },
    nextSpeaker: async (channelId) => {
        const res = await fetch(`${API_BASE}/api/voice-channels/${channelId}/queue/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'next_speaker' })
        });
        return res.json();
    }
};

// ==========================================
// 🎨 #75 - AI Image Generation
// ==========================================

export const aiImageApi = {
    generate: async (prompt, options = {}) => {
        const res = await fetch(`${API_BASE}/api/ai/generate-image/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ prompt, ...options })
        });
        return res.json();
    },
    getHistory: async () => {
        const res = await fetch(`${API_BASE}/api/ai/images/`, { headers: getAuthHeaders() });
        return res.json();
    },
    getSettings: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/ai-image/settings/`, { headers: getAuthHeaders() });
        return res.json();
    },
    updateSettings: async (serverId, settings) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/ai-image/settings/`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(settings)
        });
        return res.json();
    }
};

// ==========================================
// 🔍 #78 - Content Recommendation Engine
// ==========================================

export const recommendationApi = {
    get: async (type = 'all') => {
        const res = await fetch(`${API_BASE}/api/recommendations/?type=${type}`, { headers: getAuthHeaders() });
        return res.json();
    },
    feedback: async (recId, action) => {
        const res = await fetch(`${API_BASE}/api/recommendations/${recId}/feedback/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action })
        });
        return res.json();
    }
};

// ==========================================
// 🗨️ #82 - Language Learning Chatbot
// ==========================================

export const languageLearningApi = {
    startSession: async (nativeLanguage, targetLanguage, level = 'beginner') => {
        const res = await fetch(`${API_BASE}/api/language-learning/start/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ native_language: nativeLanguage, target_language: targetLanguage, proficiency_level: level })
        });
        return res.json();
    },
    chat: async (sessionId, message) => {
        const res = await fetch(`${API_BASE}/api/language-learning/sessions/${sessionId}/chat/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ message })
        });
        return res.json();
    },
    getProgress: async (language) => {
        const res = await fetch(`${API_BASE}/api/language-learning/progress/${language}/`, { headers: getAuthHeaders() });
        return res.json();
    }
};

// ==========================================
// 🎲 #84 - Built-in Mini Games
// ==========================================

export const miniGamesApi = {
    getGames: async () => {
        const res = await fetch(`${API_BASE}/api/games/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createMatch: async (gameId, roomId = null) => {
        const res = await fetch(`${API_BASE}/api/games/match/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ game_id: gameId, room_id: roomId })
        });
        return res.json();
    },
    getMatch: async (matchId) => {
        const res = await fetch(`${API_BASE}/api/games/matches/${matchId}/`, { headers: getAuthHeaders() });
        return res.json();
    },
    joinMatch: async (matchId) => {
        const res = await fetch(`${API_BASE}/api/games/matches/${matchId}/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'join' })
        });
        return res.json();
    },
    makeMove: async (matchId, move) => {
        const res = await fetch(`${API_BASE}/api/games/matches/${matchId}/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'move', move })
        });
        return res.json();
    },
    endMatch: async (matchId, winnerId = null, isDraw = false) => {
        const res = await fetch(`${API_BASE}/api/games/matches/${matchId}/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ action: 'end', winner_id: winnerId, is_draw: isDraw })
        });
        return res.json();
    },
    getStats: async (gameId = null) => {
        const url = gameId ? `${API_BASE}/api/games/stats/${gameId}/` : `${API_BASE}/api/games/stats/`;
        const res = await fetch(url, { headers: getAuthHeaders() });
        return res.json();
    },
    getTournaments: async (serverId) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/games/tournaments/`, { headers: getAuthHeaders() });
        return res.json();
    },
    createTournament: async (serverId, tournamentData) => {
        const res = await fetch(`${API_BASE}/api/servers/${serverId}/games/tournaments/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(tournamentData)
        });
        return res.json();
    },
    joinTournament: async (tournamentId) => {
        const res = await fetch(`${API_BASE}/api/games/tournaments/${tournamentId}/join/`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        return res.json();
    }
};

export default {
    birthday: birthdayApi,
    gift: giftApi,
    leaderboard: leaderboardApi,
    mood: moodApi,
    profileTheme: profileThemeApi,
    socialAnalytics: socialAnalyticsApi,
    voiceTranscription: voiceTranscriptionApi,
    gameEvents: gameEventsApi,
    achievementShowcase: achievementShowcaseApi,
    feedback: feedbackApi,
    timeCapsule: timeCapsuleApi,
    qrCode: qrCodeApi,
    threading: threadingApi,
    messageTemplates: messageTemplatesApi,
    advancedSearch: advancedSearchApi,
    autoDelete: autoDeleteApi,
    linkPreview: linkPreviewApi,
    tts: ttsApi,
    messageBundles: messageBundlesApi,
    ephemeral: ephemeralApi,
    translation: translationApi,
    security: securityApi,
    auditRetention: auditRetentionApi,
    appeal: appealApi,
    e2eeKeys: e2eeKeysApi,
    emergencyBroadcast: emergencyBroadcastApi,
    customThemes: customThemesApi,
    viewPreferences: viewPreferencesApi,
    // NEW: 96-99
    userAnalytics: userAnalyticsApi,
    serverGrowth: serverGrowthApi,
    dataExport: dataExportApi,
    performance: performanceApi,
    // NEW: 79, 36-39, 47, 74, 81
    botBuilder: botBuilderApi,
    toxicity: toxicityApi,
    hardwareKey: hardwareKeyApi,
    imageModeration: imageModerationApi,
    spamDetection: spamDetectionApi,
    accessibility: accessibilityApi,
    chatSummary: chatSummaryApi,
    moderationAssistant: moderationAssistantApi,
    // NEW: Medium Priority (20 features)
    relationship: relationshipApi,
    story: storyApi,
    notificationSchedule: notificationScheduleApi,
    interest: interestApi,
    smartPin: smartPinApi,
    messageScheduling: messageSchedulingApi,
    mentionSuggestion: mentionSuggestionApi,
    altAccount: altAccountApi,
    dyslexia: dyslexiaApi,
    gesture: gestureApi,
    rtl: rtlApi,
    voiceRecording: voiceRecordingApi,
    annotation: annotationApi,
    callTranscript: callTranscriptApi,
    voiceQueue: voiceQueueApi,
    aiImage: aiImageApi,
    recommendation: recommendationApi,
    languageLearning: languageLearningApi,
    miniGames: miniGamesApi,
    // 🛡️ Advanced Admin APIs
    adminPanel: adminPanelApi
};

// ==========================================
// 🛡️ ADVANCED ADMIN PANEL API
// ==========================================

const adminPanelApi = {
    // System Logs - Tüm log tiplerini birleştirir
    getSystemLogs: async (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.type) queryParams.append('type', params.type);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.offset) queryParams.append('offset', params.offset);
        if (params.search) queryParams.append('search', params.search);
        if (params.severity) queryParams.append('severity', params.severity);
        if (params.date_from) queryParams.append('date_from', params.date_from);
        if (params.date_to) queryParams.append('date_to', params.date_to);

        const res = await fetch(`${BASE}/admin/system-logs/?${queryParams}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        return res.json();
    },

    // Realtime Metrics
    getRealtimeMetrics: async () => {
        const res = await fetch(`${BASE}/admin/realtime-metrics/`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        return res.json();
    },

    // User Activity Timeline
    getUserActivity: async (userId, limit = 50) => {
        const res = await fetch(`${BASE}/admin/users/${userId}/activity/?limit=${limit}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        return res.json();
    },

    // Batch User Actions
    batchUserAction: async (action, userIds, reason = '') => {
        const res = await fetch(`${BASE}/admin/batch-action/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({ action, user_ids: userIds, reason })
        });
        return res.json();
    },

    // IP Blacklist
    getIPBlacklist: async (search = '', limit = 50) => {
        const res = await fetch(`${BASE}/admin/ip-blacklist/?search=${search}&limit=${limit}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        return res.json();
    },

    addIPToBlacklist: async (ipAddress, reason = '', durationHours = null) => {
        const res = await fetch(`${BASE}/admin/ip-blacklist/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({ ip_address: ipAddress, reason, duration_hours: durationHours })
        });
        return res.json();
    },

    removeIPFromBlacklist: async (blacklistId) => {
        const res = await fetch(`${BASE}/admin/ip-blacklist/${blacklistId}/remove/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        return res.json();
    },

    // Appeals
    getAppeals: async (status = 'pending', limit = 50) => {
        const res = await fetch(`${BASE}/admin/appeals/?status=${status}&limit=${limit}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        return res.json();
    },

    reviewAppeal: async (appealId, decision, response = '') => {
        const res = await fetch(`${BASE}/admin/appeals/${appealId}/review/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({ decision, response })
        });
        return res.json();
    },

    // Feature Flags
    getFeatureFlags: async () => {
        const res = await fetch(`${BASE}/admin/feature-flags/`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        return res.json();
    },

    // Log Export
    exportLogs: async (type = 'audit', format = 'json', dateFrom = null, dateTo = null, limit = 1000) => {
        const res = await fetch(`${BASE}/admin/logs/export/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({ type, format, date_from: dateFrom, date_to: dateTo, limit })
        });

        if (format === 'csv') {
            return res.blob();
        }
        return res.json();
    },

    // Rate Limits
    getRateLimitDashboard: async () => {
        const res = await fetch(`${BASE}/admin/rate-limits/`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        return res.json();
    },

    // Scheduled Tasks
    getScheduledTasks: async () => {
        const res = await fetch(`${BASE}/admin/scheduled-tasks/`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        return res.json();
    }
};
