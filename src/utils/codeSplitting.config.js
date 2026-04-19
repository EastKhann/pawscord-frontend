// frontend/src/utils/codeSplitting.config.js
// 🚀 Code Splitting Configuration - Route & Vendor Based

/**
 * Route-based code splitting configuration
 * Her route for ayrı bundle oluşturur
 */

// Route chunks
export const RouteChunks = {
    // Auth pages (bunlar pages/ altında)
    verifyEmail: () => import('../pages/VerifyEmailPage'),
    forgotPassword: () => import('../pages/ForgotPasswordPage'),
    resetPassword: () => import('../pages/ResetPasswordPage'),
    twoFactor: () => import('../pages/TwoFactorLoginPage'),

    // Main pages (bunlar src/ altında direkt)
    login: () => import('../pages/LoginPage'),
    welcome: () => import('../pages/WelcomeScreen'),

    // Admin
    analytics: () => import('../components/admin/AdminAnalyticsPanel'),
    analyticsMain: () => import('../pages/AnalyticsDashboard'),

    // Special features
    crypto: () => import('../features/CryptoChartModal'),
    cryptoDashboard: () => import('../CryptoDashboard'),
    englishLearn: () => import('../EnglishLearningPage'),
    englishHub: () => import('../pages/EnglishHub'),
    kanban: () => import('../components/moderation/KanbanBoard'),

    // Premium
    premiumStore: () => import('../components/premium/PremiumStoreModal'),
    themeStore: () => import('../components/premium/ThemeStoreModal'),
    cryptoStore: () => import('../components/premium/CryptoStoreModal'),
};

/**
 * Component-based lazy loading
 * On-demand modal ve component load
 */
export const ComponentChunks = {
    // Modals (heavy)
    serverSettings: () => import('../components/server/ServerSettingsModal'),
    userProfile: () => import('../UserProfileModal'),
    imageModal: () => import('../features/ImageModal'),

    // Media
    gifPicker: () => import('../features/GifPicker'),
    stickerPicker: () => import('../features/StickerPicker'),
    soundboard: () => import('../components/media/SoundboardModal'),

    // Communication
    watchParty: () => import('../components/media/WatchPartyEnhanced'),
    cinema: () => import('../features/CinemaModal'),
    whiteboard: () => import('../components/media/WhiteboardModal'),

    // Tools
    poll: () => import('../components/chat/PollCreateModal'),
    codeSnippet: () => import('../components/chat/CodeSnippetModal'),
    messageTemplate: () => import('../components/server/MessageTemplateModal'),

    // Admin & Moderation (frequently used by admins)
    adminPanel: () => import('../components/admin/AdminPanelModal'),
    adminAnalytics: () => import('../components/admin/AdminAnalyticsPanel'),
    rolesManager: () => import('../components/server/RolesManager'),
    auditLogs: () => import('../components/admin/AuditLogsPanel'),

    // User settings & profile
    userSettings: () => import('../components/profile/UserSettingsModal'),
    channelSettings: () => import('../components/server/ChannelSettingsModal'),
    inviteModal: () => import('../components/server/InviteModal'),

    // Voice
    voiceSettings: () => import('../components/media/VoiceSettingsPanel'),
    screenShare: () => import('../components/media/ScreenShare'),
};

/**
 * Preloading strategy
 * 🚀 User etkleşiminden ÖNCE en çok kullanılan chunk'ları upload
 */
export const preloadCriticalChunks = () => {
    // En sık openılan bileşenler — hemen preload et (500ms sonra çağrılıyor)
    const criticalChunks = [
        ComponentChunks.userProfile,
        ComponentChunks.imageModal,
        ComponentChunks.serverSettings,
        ComponentChunks.userSettings,
        ComponentChunks.inviteModal,
    ];
    criticalChunks.forEach((chunk) => {
        try {
            chunk().catch(() => {});
        } catch (e) {
            /* ignore */
        }
    });
};

/**
 * Prefetch strategy
 * Idle time'da gelecek chunks'ı prefetch et
 */
export const prefetchNextChunks = () => {
    const secondaryChunks = [
        ComponentChunks.gifPicker,
        ComponentChunks.stickerPicker,
        ComponentChunks.poll,
        ComponentChunks.codeSnippet,
        ComponentChunks.messageTemplate,
        ComponentChunks.channelSettings,
        ComponentChunks.voiceSettings,
        ComponentChunks.soundboard,
    ];
    secondaryChunks.forEach((chunk) => {
        try {
            chunk().catch(() => {});
        } catch (e) {
            /* ignore */
        }
    });
};

/**
 * Admin prefetch strategy
 * Admin kullanıcıları for ek chunk'ları prefetch et
 */
export const prefetchAdminChunks = () => {
    const adminChunks = [
        ComponentChunks.adminPanel,
        ComponentChunks.adminAnalytics,
        ComponentChunks.rolesManager,
        ComponentChunks.auditLogs,
    ];
    adminChunks.forEach((chunk) => {
        try {
            chunk().catch(() => {});
        } catch (e) {
            /* ignore */
        }
    });
};

export default {
    RouteChunks,
    ComponentChunks,
    preloadCriticalChunks,
    prefetchNextChunks,
    prefetchAdminChunks,
};
