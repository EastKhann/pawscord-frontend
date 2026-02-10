// frontend/src/utils/apiEndpoints.js

/**
 * 🔗 API Endpoints Mapper
 * Centralized API endpoint definitions for consistency between frontend and backend
 */

// Determine API base URL dynamically
const getApiBaseUrl = () => {
    // 1. Environment variable (highest priority)
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // 2. Capacitor (mobil) detection
    const isCapacitor = window.Capacitor?.isNativePlatform?.() ||
        window.location.protocol === 'capacitor:' ||
        window.location.protocol === 'ionic:';

    if (isCapacitor) {
        return 'https://api.pawscord.com';
    }

    // 3. Production detection (Electron or pawscord.com)
    const isElectron = window.navigator?.userAgent?.toLowerCase().includes('electron');
    const isPawscordDomain = window.location.hostname.includes('pawscord.com');
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isElectron || isPawscordDomain) {
        return 'https://api.pawscord.com';
    }

    // 4. Environment variable override
    const envApiUrl = import.meta.env.VITE_API_BASE_URL;
    if (envApiUrl) return envApiUrl.replace(/\/api\/?$/, '');

    // 5. Development fallback
    if (isLocalhost) {
        return 'http://localhost:8888';
    }

    // 6. Default to production
    return 'https://api.pawscord.com';
};

const API_BASE = getApiBaseUrl();

// Get media base URL (same domain, /media path)
const getMediaBaseUrl = () => {
    const apiBase = getApiBaseUrl();
    // Replace /api with /media
    return apiBase.replace('/api', '/media');
};

// Export for use in other files
export const getApiBase = getApiBaseUrl;
export const getMediaBase = getMediaBaseUrl;
export { API_BASE };

// API_BASE_URL includes /api suffix (for components that need it)
// e.g., https://api.pawscord.com/api
export const API_BASE_URL = `${API_BASE}/api`;

export const ENDPOINTS = {
    // ==========================================
    // 🔐 AUTH
    // ==========================================
    AUTH: {
        LOGIN: `${API_BASE}/auth/token/`,
        REGISTER: `${API_BASE}/auth/register/`,
        REFRESH: `${API_BASE}/auth/token/refresh/`,
        LOGOUT: `${API_BASE}/auth/logout/`,
        PASSWORD_RESET: `${API_BASE}/auth/password/reset/`,
        PASSWORD_RESET_CONFIRM: `${API_BASE}/auth/password/reset/confirm/`,
        GOOGLE: `${API_BASE}/auth/google/`,
        VERIFY_EMAIL: `${API_BASE}/auth/verify-email/`,
    },

    // ==========================================
    // 👤 USER & PROFILE
    // ==========================================
    USER: {
        PROFILE: (userId) => `${API_BASE}/profile/${userId}/`,
        UPDATE_PROFILE: `${API_BASE}/users/update_profile/`,
        EXTENDED_PROFILE: `${API_BASE}/profile/extended/`,
        AVATAR_UPLOAD: `${API_BASE}/users/avatar/`,
        BANNER_UPLOAD: `${API_BASE}/users/banner/`,
        ONLINE_STATUS: `${API_BASE}/users/online-status/`,
        PRESENCE: `${API_BASE}/presence/custom-status/`,
    },

    // ==========================================
    // 🏠 SERVERS
    // ==========================================
    SERVERS: {
        LIST: `${API_BASE}/servers/`,
        CREATE: `${API_BASE}/servers/create/`,
        DETAIL: (id) => `${API_BASE}/servers/${id}/`,
        JOIN: (id) => `${API_BASE}/servers/${id}/join/`,
        LEAVE: (id) => `${API_BASE}/servers/${id}/leave/`,
        DISCOVER: `${API_BASE}/servers/discover/`,
        MEMBERS: (id) => `${API_BASE}/servers/${id}/members/`,
        SETTINGS: (id) => `${API_BASE}/servers/${id}/settings/`,
        ROLES: (id) => `${API_BASE}/servers/${id}/roles/`,
        INVITES: (id) => `${API_BASE}/servers/${id}/invites/`,
    },

    // ==========================================
    // 💬 ROOMS & MESSAGES
    // ==========================================
    ROOMS: {
        LIST: (serverId) => `${API_BASE}/servers/${serverId}/rooms/`,
        CREATE: (serverId) => `${API_BASE}/servers/${serverId}/rooms/create/`,
        DETAIL: (roomId) => `${API_BASE}/rooms/${roomId}/`,
        MESSAGES: (roomId) => `${API_BASE}/rooms/${roomId}/messages/`,
    },

    MESSAGES: {
        SEND: (roomId) => `${API_BASE}/rooms/${roomId}/messages/send/`,
        EDIT: (messageId) => `${API_BASE}/messages/${messageId}/edit/`,
        DELETE: (messageId) => `${API_BASE}/messages/${messageId}/delete/`,
        REACT: (messageId) => `${API_BASE}/messages/${messageId}/react/`,
        PIN: (messageId) => `${API_BASE}/messages/${messageId}/pin/`,
        UNPIN: (messageId) => `${API_BASE}/messages/${messageId}/unpin/`,
        MARK_READ: (messageId) => `${API_BASE}/messages/${messageId}/mark_read/`,
        READ_RECEIPTS: (messageId) => `${API_BASE}/messages/${messageId}/read_receipts/`,
        TRANSLATE: `${API_BASE}/translate/message/`,
        TRANSCRIBE: (messageId) => `${API_BASE}/messages/${messageId}/transcribe/`,
    },

    // ==========================================
    // 📌 PINNED MESSAGES
    // ==========================================
    PINNED: {
        LIST: (roomId) => `${API_BASE}/rooms/${roomId}/pinned/`,
        CATEGORIES: (roomId) => `${API_BASE}/rooms/${roomId}/pin-categories/`,
    },

    // ==========================================
    // 🗳️ POLLS
    // ==========================================
    POLLS: {
        CREATE: `${API_BASE}/polls/create/`,
        CREATE_IN_ROOM: (roomId) => `${API_BASE}/rooms/${roomId}/polls/create/`,
        VOTE: (pollId) => `${API_BASE}/polls/${pollId}/vote/`,
        RESULTS: (pollId) => `${API_BASE}/polls/${pollId}/results/`,
        CLOSE: (pollId) => `${API_BASE}/polls/${pollId}/close/`,
        LIST: `${API_BASE}/polls/`,
        LIST_BY_ROOM: (roomId) => `${API_BASE}/rooms/${roomId}/polls/`,
        DELETE: (pollId) => `${API_BASE}/polls/${pollId}/delete/`,
    },

    // ==========================================
    // 📝 USER NOTES
    // ==========================================
    USER_NOTES: {
        GET: (username) => `${API_BASE}/user-notes/${username}/`,
        SAVE: (username) => `${API_BASE}/user-notes/${username}/`,
    },

    // ==========================================
    // 🎁 GIVEAWAY
    // ==========================================
    GIVEAWAY: {
        LIST: (serverId) => `${API_BASE}/servers/${serverId}/giveaways/`,
        CREATE: (serverId) => `${API_BASE}/servers/${serverId}/giveaways/create/`,
        DETAIL: (giveawayId) => `${API_BASE}/giveaways/${giveawayId}/`,
        ENTER: (giveawayId) => `${API_BASE}/giveaways/${giveawayId}/enter/`,
        END: (giveawayId) => `${API_BASE}/giveaways/${giveawayId}/end/`,
        REROLL: (giveawayId) => `${API_BASE}/giveaways/${giveawayId}/reroll/`,
    },

    // ==========================================
    // 🎫 TICKETS
    // ==========================================
    TICKETS: {
        LIST: `${API_BASE}/tickets/list/`,
        CREATE: `${API_BASE}/tickets/create/`,
        DETAIL: (ticketId) => `${API_BASE}/tickets/${ticketId}/`,
        CLOSE: (ticketId) => `${API_BASE}/tickets/${ticketId}/close/`,
        REPLY: (ticketId) => `${API_BASE}/tickets/${ticketId}/reply/`,
        ASSIGN: (ticketId) => `${API_BASE}/tickets/${ticketId}/assign/`,
        STATS: `${API_BASE}/tickets/stats/`,
    },

    // ==========================================
    // 📊 LEVELING
    // ==========================================
    LEVELING: {
        PROFILE: (serverId) => `${API_BASE}/servers/${serverId}/leveling/profile/`,
        LEADERBOARD: (serverId) => `${API_BASE}/servers/${serverId}/leveling/leaderboard/`,
        SETTINGS: (serverId) => `${API_BASE}/servers/${serverId}/leveling/settings/`,
        REWARDS: (serverId) => `${API_BASE}/servers/${serverId}/leveling/rewards/`,
        ADD_XP: (serverId) => `${API_BASE}/servers/${serverId}/leveling/add-xp/`,
    },

    // ==========================================
    // 🎂 BIRTHDAY
    // ==========================================
    BIRTHDAY: {
        SET: `${API_BASE}/birthday/set/`,
        GET: `${API_BASE}/birthday/get/`,
        UPCOMING: (serverId) => `${API_BASE}/servers/${serverId}/birthdays/upcoming/`,
        CONFIGURE: (serverId) => `${API_BASE}/servers/${serverId}/birthday/configure/`,
        CELEBRATE: (serverId) => `${API_BASE}/servers/${serverId}/birthday/celebrate/`,
    },

    // ==========================================
    // 💤 AFK
    // ==========================================
    AFK: {
        SET: `${API_BASE}/afk/set/`,
        CLEAR: `${API_BASE}/afk/clear/`,
        CHECK: (userId) => `${API_BASE}/afk/check/${userId}/`,
        STATUS: `${API_BASE}/afk/status/`,
    },

    // ==========================================
    // ⭐ STARBOARD
    // ==========================================
    STARBOARD: {
        CONFIGURE: (serverId) => `${API_BASE}/servers/${serverId}/starboard/configure/`,
        ADD_STAR: `${API_BASE}/starboard/star/`,
        REMOVE_STAR: `${API_BASE}/starboard/unstar/`,
        LIST: (serverId) => `${API_BASE}/servers/${serverId}/starboard/`,
        LEADERBOARD: (serverId) => `${API_BASE}/servers/${serverId}/starboard/leaderboard/`,
    },

    // ==========================================
    // 💡 SUGGESTIONS
    // ==========================================
    SUGGESTIONS: {
        LIST: (serverId) => `${API_BASE}/servers/${serverId}/suggestions/`,
        CREATE: (serverId) => `${API_BASE}/servers/${serverId}/suggestions/create/`,
        VOTE: (suggestionId) => `${API_BASE}/suggestions/${suggestionId}/vote/`,
        STATUS: (suggestionId) => `${API_BASE}/suggestions/${suggestionId}/status/`,
        CONFIGURE: (serverId) => `${API_BASE}/servers/${serverId}/suggestions/configure/`,
    },

    // ==========================================
    // 🤖 AUTO ROLES
    // ==========================================
    AUTO_ROLES: {
        LIST: (serverId) => `${API_BASE}/servers/${serverId}/autoroles/`,
        CREATE: (serverId) => `${API_BASE}/servers/${serverId}/autoroles/create/`,
        DELETE: (serverId, roleId) => `${API_BASE}/servers/${serverId}/autoroles/${roleId}/delete/`,
        TOGGLE: (serverId, roleId) => `${API_BASE}/servers/${serverId}/autoroles/${roleId}/toggle/`,
        GET: (serverId) => `${API_BASE}/servers/${serverId}/auto-roles/`,
        SET: (serverId) => `${API_BASE}/servers/${serverId}/auto-roles/`,
    },

    // ==========================================
    // 🎭 REACTION ROLES
    // ==========================================
    REACTION_ROLES: {
        LIST: (serverId) => `${API_BASE}/servers/${serverId}/reaction-roles/`,
        CREATE: (serverId) => `${API_BASE}/servers/${serverId}/reaction-roles/create/`,
        DELETE: (id) => `${API_BASE}/reaction-roles/${id}/delete/`,
        REACT: `${API_BASE}/reaction-roles/react/`,
    },

    // ==========================================
    //  BOOKMARKS
    // ==========================================
    BOOKMARKS: {
        LIST: `${API_BASE}/bookmarks/`,
        ADD: `${API_BASE}/bookmarks/add/`,
        REMOVE: (bookmarkId) => `${API_BASE}/bookmarks/${bookmarkId}/remove/`,
        TAGS: `${API_BASE}/bookmarks/tags/`,
        BY_TAG: (tag) => `${API_BASE}/bookmarks/tag/${tag}/`,
    },

    // ==========================================
    // 🤖 AI FEATURES
    // ==========================================
    AI: {
        ASK: `${API_BASE}/ai/ask/`,
        SUMMARIZE: `${API_BASE}/ai/summarize/`,
        SMART_REPLY: `${API_BASE}/ai/smart-reply/`,
        MODERATE: `${API_BASE}/ai/moderate/`,
        CHAT: `${API_BASE}/ai/chat/`,
    },

    // ==========================================
    // 🌐 TRANSLATION
    // ==========================================
    TRANSLATION: {
        TRANSLATE: `${API_BASE}/translate/`,
        LANGUAGES: `${API_BASE}/translate/languages/`,
        PREFERENCES: `${API_BASE}/translate/preferences/`,
        BATCH: `${API_BASE}/translate/batch/`,
    },

    // ==========================================
    // 🎤 VOICE & TRANSCRIPTION
    // ==========================================
    VOICE: {
        TRANSCRIBE: (messageId) => `${API_BASE}/messages/${messageId}/transcribe/`,
        TRANSCRIPTS: `${API_BASE}/voice/transcripts/list/`,
    },

    // ==========================================
    // 🎮 GAMING
    // ==========================================
    GAMING: {
        PRESENCE: `${API_BASE}/gaming/presence/`,
        LINK_STEAM: `${API_BASE}/gaming/link/steam/`,
        LINK_XBOX: `${API_BASE}/gaming/link/xbox/`,
        ACTIVITY: (userId) => `${API_BASE}/gaming/activity/${userId}/`,
    },

    // ==========================================
    // 🎵 MUSIC
    // ==========================================
    MUSIC: {
        QUEUE: (roomId) => `${API_BASE}/rooms/${roomId}/music/queue/`,
        ADD: (roomId) => `${API_BASE}/rooms/${roomId}/music/add/`,
        SKIP: (roomId) => `${API_BASE}/rooms/${roomId}/music/skip/`,
        PAUSE: (roomId) => `${API_BASE}/rooms/${roomId}/music/pause/`,
        CLEAR: (roomId) => `${API_BASE}/rooms/${roomId}/music/clear/`,
        DJ_MODE: (roomId) => `${API_BASE}/rooms/${roomId}/music/dj-mode/`,
    },

    // ==========================================
    // 📅 EVENTS
    // ==========================================
    EVENTS: {
        LIST: (serverId) => `${API_BASE}/servers/${serverId}/events/`,
        CREATE: (serverId) => `${API_BASE}/servers/${serverId}/events/create/`,
        DETAIL: (eventId) => `${API_BASE}/events/${eventId}/`,
        RSVP: (eventId) => `${API_BASE}/events/${eventId}/rsvp/`,
        CANCEL: (eventId) => `${API_BASE}/events/${eventId}/cancel/`,
    },

    // ==========================================
    // 🛡️ MODERATION
    // ==========================================
    MODERATION: {
        RULES: (serverId) => `${API_BASE}/servers/${serverId}/moderation/rules/`,
        CREATE_RULE: (serverId) => `${API_BASE}/servers/${serverId}/moderation/rules/create/`,
        CHECK: `${API_BASE}/moderation/check/`,
        LOGS: (serverId) => `${API_BASE}/servers/${serverId}/moderation/logs/`,
        BAN: (serverId) => `${API_BASE}/servers/${serverId}/moderation/ban/`,
        KICK: (serverId) => `${API_BASE}/servers/${serverId}/moderation/kick/`,
        MUTE: (serverId) => `${API_BASE}/servers/${serverId}/moderation/mute/`,
        WARN: (serverId) => `${API_BASE}/servers/${serverId}/moderation/warn/`,
    },

    // ==========================================
    // 💰 ECONOMY
    // ==========================================
    ECONOMY: {
        BALANCE: (serverId) => `${API_BASE}/economy/balance/${serverId}/`,
        TRANSFER: `${API_BASE}/economy/transfer/`,
        LEADERBOARD: (serverId) => `${API_BASE}/economy/leaderboard/${serverId}/`,
        HISTORY: (serverId) => `${API_BASE}/economy/history/${serverId}/`,
        DAILY: (serverId) => `${API_BASE}/economy/daily/${serverId}/`,
    },

    // ==========================================
    // 🏆 ACHIEVEMENTS
    // ==========================================
    ACHIEVEMENTS: {
        LIST: `${API_BASE}/achievements/`,
        USER: (userId) => `${API_BASE}/achievements/user/${userId}/`,
        CLAIM: (achievementId) => `${API_BASE}/achievements/${achievementId}/claim/`,
    },

    // ==========================================
    // 🔔 NOTIFICATIONS
    // ==========================================
    NOTIFICATIONS: {
        LIST: `${API_BASE}/notifications/`,
        MARK_READ: (notificationId) => `${API_BASE}/notifications/${notificationId}/read/`,
        MARK_ALL_READ: `${API_BASE}/notifications/read-all/`,
        SETTINGS: `${API_BASE}/notifications/settings/`,
    },

    // ==========================================
    // ⚙️ SETTINGS
    // ==========================================
    SETTINGS: {
        APPEARANCE: `${API_BASE}/appearance/settings/`,
        PRIVACY: `${API_BASE}/settings/privacy/`,
        NOTIFICATIONS: `${API_BASE}/settings/notifications/`,
        SECURITY: `${API_BASE}/security/settings/`,
    },

    // ==========================================
    // 💎 PREMIUM
    // ==========================================
    PREMIUM: {
        STATUS: `${API_BASE}/premium/status/`,
        SUBSCRIBE: `${API_BASE}/premium/subscribe/`,
        CANCEL: `${API_BASE}/premium/cancel/`,
        FEATURES: `${API_BASE}/premium/features/`,
        BOOSTS: `${API_BASE}/premium/boosts/`,
    },

    // ==========================================
    // 📬 MENTIONS INBOX
    // ==========================================
    MENTIONS: {
        INBOX: `${API_BASE}/mentions/inbox/`,
        GROUP_SETTING: `${API_BASE}/mentions/group/setting/`,
        GROUP_SETTING_SET: `${API_BASE}/mentions/group/setting/set/`,
    },

    // ==========================================
    // 🎭 CUSTOM STATUS
    // ==========================================
    STATUS: {
        CUSTOM: `${API_BASE}/status/custom/`,
    },


};

/**
 * Helper function to get endpoint with parameters
 */
export const getEndpoint = (path, params = {}) => {
    let endpoint = path;
    Object.keys(params).forEach(key => {
        endpoint = endpoint.replace(`:${key}`, params[key]);
    });
    return endpoint;
};

export default ENDPOINTS;
