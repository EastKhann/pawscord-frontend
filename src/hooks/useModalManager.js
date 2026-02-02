// frontend/src/hooks/useModalManager.js
// 🚀 OPTIMIZATION: Centralized modal state management
// Bu hook, 70+ modal state'ini tek bir yerde yönetir ve performansı artırır

import { useState, useCallback, useMemo } from 'react';

/**
 * 🎯 Modal Manager Hook
 * Tek bir state objesi ile tüm modalleri yönetir
 * Avantajları:
 * - 70+ useState yerine tek state
 * - Daha az re-render
 * - Kolay modal yönetimi
 * - Otomatik backdrop/overlay handling
 */
const useModalManager = () => {
    // Tek bir state objesi ile tüm modaller
    const [activeModals, setActiveModals] = useState({});

    // ⚡ Modal açma - memoized
    const openModal = useCallback((modalName, data = null) => {
        setActiveModals(prev => ({
            ...prev,
            [modalName]: { isOpen: true, data }
        }));
    }, []);

    // ⚡ Modal kapama - memoized
    const closeModal = useCallback((modalName) => {
        setActiveModals(prev => ({
            ...prev,
            [modalName]: { isOpen: false, data: null }
        }));
    }, []);

    // ⚡ Modal toggle - memoized
    const toggleModal = useCallback((modalName, data = null) => {
        setActiveModals(prev => ({
            ...prev,
            [modalName]: {
                isOpen: !prev[modalName]?.isOpen,
                data: prev[modalName]?.isOpen ? null : data
            }
        }));
    }, []);

    // ⚡ Tüm modalları kapat - memoized
    const closeAllModals = useCallback(() => {
        setActiveModals({});
    }, []);

    // ⚡ Modal açık mı kontrol et - memoized
    const isModalOpen = useCallback((modalName) => {
        return !!activeModals[modalName]?.isOpen;
    }, [activeModals]);

    // ⚡ Modal data al - memoized
    const getModalData = useCallback((modalName) => {
        return activeModals[modalName]?.data;
    }, [activeModals]);

    // ⚡ Herhangi bir modal açık mı - memoized
    const hasOpenModal = useMemo(() => {
        return Object.values(activeModals).some(modal => modal?.isOpen);
    }, [activeModals]);

    // ⚡ Açık modal sayısı - memoized
    const openModalCount = useMemo(() => {
        return Object.values(activeModals).filter(modal => modal?.isOpen).length;
    }, [activeModals]);

    // 🎯 Modal listesi (App.js'deki tüm modaller için kullanılabilir)
    const MODAL_NAMES = {
        // Auth & User
        LOGIN: 'login',
        PROFILE: 'profile',
        AVATAR_CROPPER: 'avatarCropper',
        PASSWORD_SETUP: 'passwordSetup',
        TWO_FACTOR: 'twoFactor',
        SESSION_MANAGEMENT: 'sessionManagement',

        // Server & Channels
        SERVER_SETTINGS: 'serverSettings',
        CREATE_GROUP: 'createGroup',
        CHANNEL_PERMISSIONS: 'channelPermissions',
        SERVER_ROLES: 'serverRoles',
        SERVER_BOOST: 'serverBoost',
        VANITY_URL: 'vanityUrl',
        SERVER_THEMES: 'serverThemes',

        // Messaging
        POLL: 'poll',
        SNIPPET: 'snippet',
        TEMPLATE: 'template',
        MESSAGE_THREADS: 'messageThreads',
        MESSAGE_TEMPLATES: 'messageTemplates',
        MESSAGE_EXPORT: 'messageExport',
        MESSAGE_OCR: 'messageOcr',
        STICKY_MESSAGES: 'stickyMessages',

        // Media & Entertainment
        CINEMA: 'cinema',
        DJ: 'dj',
        WHITEBOARD: 'whiteboard',
        SOUNDBOARD: 'soundboard',
        GIF_PICKER: 'gifPicker',
        STICKER_PICKER: 'stickerPicker',
        IMAGE_ZOOM: 'imageZoom',

        // Store & Economy
        STORE: 'store',
        THEME_STORE: 'themeStore',
        CRYPTO_STORE: 'cryptoStore',
        PREMIUM_STORE: 'premiumStore',
        INVENTORY: 'inventory',
        NFT: 'nft',

        // Moderation
        AUTO_MODERATION: 'autoModeration',
        RAID_PROTECTION: 'raidProtection',
        REPORT_SYSTEM: 'reportSystem',
        AUDIT_LOG: 'auditLog',
        USER_WARNINGS: 'userWarnings',
        MASS_ACTIONS: 'massActions',
        TIMEOUT_MUTE: 'timeoutMute',
        KEYWORD_MUTES: 'keywordMutes',

        // Analytics
        ADMIN_ANALYTICS: 'adminAnalytics',
        REACTION_ANALYTICS: 'reactionAnalytics',
        LINK_CLICK_TRACKING: 'linkClickTracking',
        INVITE_ANALYTICS: 'inviteAnalytics',
        GROWTH_METRICS: 'growthMetrics',
        USER_ACTIVITY: 'userActivity',

        // Features
        BOOKMARKS: 'bookmarks',
        READ_LATER: 'readLater',
        DRAFTS: 'drafts',
        NOTIFICATIONS: 'notifications',
        DOWNLOAD: 'download',
        ENCRYPTION: 'encryption',
        SUMMARY: 'summary',

        // Admin
        ADMIN_PANEL: 'adminPanel',
        WEBHOOKS: 'webhooks',
        AUTO_RESPONDERS: 'autoResponders',
        OAUTH_APPS: 'oauthApps',

        // Privacy & Security
        GDPR_EXPORT: 'gdprExport',
        DATA_RETENTION: 'dataRetention',

        // Other
        ARCHIVED_ROOMS: 'archivedRooms',
        SLOW_MODE: 'slowMode',
        EMOJI_MANAGEMENT: 'emojiManagement',
        WELCOME_TEMPLATES: 'welcomeTemplates',
        CHART: 'chart',
    };

    return {
        // State
        activeModals,
        hasOpenModal,
        openModalCount,

        // Actions
        openModal,
        closeModal,
        toggleModal,
        closeAllModals,

        // Helpers
        isModalOpen,
        getModalData,

        // Constants
        MODAL_NAMES
    };
};

export default useModalManager;

// 🎯 Utility: Legacy state uyumluluğu için helper
export const createModalState = (modalManager, modalName) => ({
    show: modalManager.isModalOpen(modalName),
    setShow: (value) => {
        if (value) {
            modalManager.openModal(modalName);
        } else {
            modalManager.closeModal(modalName);
        }
    },
    data: modalManager.getModalData(modalName),
    open: (data) => modalManager.openModal(modalName, data),
    close: () => modalManager.closeModal(modalName),
    toggle: (data) => modalManager.toggleModal(modalName, data)
});
