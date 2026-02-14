import { useEffect, useRef } from 'react';
import useProfileSecurity from './useProfileSecurity';
import useProfileSocial from './useProfileSocial';
import useProfileForm from './useProfileForm';
import useProfileSettings from './useProfileSettings';
import useProfileData from './useProfileData';
import useProfileAdvanced from './useProfileAdvanced';

/**
 * Composed hook that manages all UserProfilePanel state and API operations.
 * Delegates to domain-specific sub-hooks for maintainability.
 */
const useProfileAPI = ({ user, isOwnProfile, onUpdate }) => {
    const security = useProfileSecurity();
    const social = useProfileSocial();
    const form = useProfileForm({ user, onUpdate });
    const settings = useProfileSettings();
    const data = useProfileData({ user });
    const advanced = useProfileAdvanced({ user });
    const lastFetchedUserRef = useRef(null);

    // Fetch data on mount / user change
    useEffect(() => {
        const userId = user?.id || user?.username;
        if (!user || lastFetchedUserRef.current === userId) return;
        lastFetchedUserRef.current = userId;

        form.resetFormData(user);
        security.setEmailVerified(user?.is_active || false);

        if (isOwnProfile) {
            Promise.all([
                data.fetchBadges(),
                data.fetchPremiumStatus(),
                data.fetchStoreBalance(),
                security.check2FAStatus(),
                form.fetchDefaultAvatars(),
                security.checkPasswordStatus(),
            ]).catch(err => console.error('Initial fetch error:', err));
        } else {
            form.fetchDefaultAvatars();
        }
    }, [user?.id, user?.username, isOwnProfile]);

    // Lazy loading: fetch data when category changes
    const fetchDataForCategory = async (activeCategory) => {
        if (!isOwnProfile) return;
        switch (activeCategory) {
            case 'account': break;
            case 'security':
                await Promise.all([security.fetchSessions(), security.fetchEmailVerificationStatus()]);
                break;
            case 'privacy':
                await Promise.all([social.fetchBlockedUsers(), social.fetchFriendRequests()]);
                break;
            case 'advanced':
                await Promise.all([data.fetchGDPRExports(), advanced.fetchOAuthApps(), advanced.fetchWebhooks(), advanced.fetchBotAccounts()]);
                break;
            case 'social':
                await Promise.all([advanced.fetchRichPresence(), advanced.fetchEndorsements()]);
                break;
            case 'customization':
                await Promise.all([settings.fetchThemes(), advanced.fetchInventory(), advanced.fetchNicknameHistory(), advanced.fetchServerOrder()]);
                break;
            case 'notifications': break;
            case 'language':
                await settings.fetchLanguages();
                break;
            default: break;
        }
    };

    return {
        // Merge loading from all sub-hooks
        loading: { ...security.loading, ...social.loading, ...form.loading },

        // Security
        twoFactorData: security.twoFactorData, twoFactorEnabled: security.twoFactorEnabled,
        backupCodes: security.backupCodes, verificationCode: security.verificationCode,
        sessions: security.sessions, emailVerified: security.emailVerified,
        passwordData: security.passwordData, hasPassword: security.hasPassword,
        setVerificationCode: security.setVerificationCode, setPasswordData: security.setPasswordData,
        check2FAStatus: security.check2FAStatus, enable2FA: security.enable2FA,
        verify2FASetup: security.verify2FASetup, disable2FA: security.disable2FA,
        checkPasswordStatus: security.checkPasswordStatus, handlePasswordChange: security.handlePasswordChange,
        fetchEmailVerificationStatus: security.fetchEmailVerificationStatus,
        resendVerificationEmail: security.resendVerificationEmail,
        fetchSessions: security.fetchSessions, revokeSession: security.revokeSession,
        revokeAllSessions: security.revokeAllSessions,

        // Social
        blockedUsers: social.blockedUsers, friendRequests: social.friendRequests, friends: social.friends,
        fetchBlockedUsers: social.fetchBlockedUsers, unblockUser: social.unblockUser,
        fetchFriendRequests: social.fetchFriendRequests, respondToFriendRequest: social.respondToFriendRequest,
        removeFriend: social.removeFriend,

        // Form
        formData: form.formData, defaultAvatars: form.defaultAvatars,
        phoneNumber: form.phoneNumber, showCropper: form.showCropper,
        tempImageFile: form.tempImageFile, fileInputRef: form.fileInputRef,
        setPhoneNumber: form.setPhoneNumber, setShowCropper: form.setShowCropper,
        setTempImageFile: form.setTempImageFile,
        fetchDefaultAvatars: form.fetchDefaultAvatars, selectDefaultAvatar: form.selectDefaultAvatar,
        handlePhoneUpdate: form.handlePhoneUpdate, handleInputChange: form.handleInputChange,
        handleAvatarUpload: form.handleAvatarUpload, handleCropComplete: form.handleCropComplete,
        handleSaveProfile: form.handleSaveProfile,

        // Settings
        themes: settings.themes, currentTheme: settings.currentTheme,
        notificationSettings: settings.notificationSettings, soundSettings: settings.soundSettings,
        language: settings.language, availableLanguages: settings.availableLanguages,
        customStatus: settings.customStatus, setCustomStatus: settings.setCustomStatus,
        fetchThemes: settings.fetchThemes, applyTheme: settings.applyTheme,
        handleNotificationSettingsUpdate: settings.handleNotificationSettingsUpdate,
        handleSoundSettingsUpdate: settings.handleSoundSettingsUpdate,
        fetchLanguages: settings.fetchLanguages, updateLanguage: settings.updateLanguage,
        updateCustomStatus: settings.updateCustomStatus,

        // Data
        badges: data.badges, achievements: data.achievements, userStats: data.userStats,
        premiumStatus: data.premiumStatus, storeBalance: data.storeBalance,
        userActivity: data.userActivity, drafts: data.drafts, bookmarks: data.bookmarks,
        gdprExports: data.gdprExports, exportRequested: data.exportRequested,
        fetchBadges: data.fetchBadges, fetchAchievements: data.fetchAchievements,
        calculateXPProgress: data.calculateXPProgress, fetchPremiumStatus: data.fetchPremiumStatus,
        fetchStoreBalance: data.fetchStoreBalance, fetchUserActivity: data.fetchUserActivity,
        fetchDrafts: data.fetchDrafts, deleteDraft: data.deleteDraft,
        requestGDPRExport: data.requestGDPRExport, fetchGDPRExports: data.fetchGDPRExports,

        // Advanced
        richPresence: advanced.richPresence, endorsements: advanced.endorsements,
        inventory: advanced.inventory, equippedItems: advanced.equippedItems,
        nicknameHistory: advanced.nicknameHistory, serverOrder: advanced.serverOrder,
        oauthApps: advanced.oauthApps, webhooks: advanced.webhooks, botAccounts: advanced.botAccounts,
        fetchRichPresence: advanced.fetchRichPresence, fetchEndorsements: advanced.fetchEndorsements,
        fetchInventory: advanced.fetchInventory, equipItem: advanced.equipItem,
        unequipItem: advanced.unequipItem, fetchNicknameHistory: advanced.fetchNicknameHistory,
        fetchServerOrder: advanced.fetchServerOrder, fetchOAuthApps: advanced.fetchOAuthApps,
        fetchWebhooks: advanced.fetchWebhooks, fetchBotAccounts: advanced.fetchBotAccounts,

        fetchDataForCategory,
    };
};

export default useProfileAPI;
