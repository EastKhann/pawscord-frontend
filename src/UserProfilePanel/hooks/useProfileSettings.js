import { useState } from 'react';
import i18n from 'i18next';
import toast from '../../utils/toast';
import { authGet, authPost } from './profileApiUtils';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

const useProfileSettings = () => {
    const { t } = useTranslation();
    const [themes, setThemes] = useState([
        { id: 'dark', name: 'Dark' },
        { id: 'light', name: 'Light' },
    ]);
    const [currentTheme, setCurrentTheme] = useState('dark');
    const [notificationSettings, setNotificationSettings] = useState({
        mentions: true,
        direct_messages: true,
        server_updates: true,
        friend_requests: true,
        sound_enabled: true,
        desktop_notifications: true,
    });
    const [soundSettings, setSoundSettings] = useState({
        message_sound: true,
        call_sound: true,
        notification_sound: true,
        voice_join_sound: true,
        voice_leave_sound: true,
        master_volume: 100,
        voice_volume: 100,
        notification_volume: 80,
        mic_volume: 100,
        input_sensitivity: 50,
        noise_suppression: true,
    });
    const [language, setLanguage] = useState(
        () => localStorage.getItem('pawscord_language') || 'en'
    );
    const [availableLanguages, setAvailableLanguages] = useState([
        { code: 'tr', name: 'Turkish' },
        { code: 'en', name: 'English' },
    ]);
    const [customStatus, setCustomStatus] = useState({
        status: 'online',
        emoji: '',
        text: '',
        expires_at: null,
    });

    const fetchThemes = async () => {
        try {
            const response = await authGet('/themes/list/');
            setThemes(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            logger.error('Themes fetch failed:', err);
            setThemes([
                { id: 'dark', name: 'Dark' },
                { id: 'light', name: 'Light' },
            ]);
        }
    };

    const applyTheme = async (themeName) => {
        try {
            await authPost('/api/users/update_profile/', { theme: themeName });
            setCurrentTheme(themeName);
            toast.success(t('theme.applied'));
        } catch (err) {
            toast.error(t('profile.themeApplyFailed'));
        }
    };

    const handleNotificationSettingsUpdate = async (setting, value) => {
        try {
            const newSettings = { ...notificationSettings, [setting]: value };
            setNotificationSettings(newSettings);
            await authPost('/api/users/update_profile/', { notification_settings: newSettings });
            toast.success(t('profile.notificationsUpdated'));
        } catch (err) {
            toast.error(t('profile.notificationsUpdateFailed'));
        }
    };

    const handleSoundSettingsUpdate = async (setting, value) => {
        try {
            const newSettings = { ...soundSettings, [setting]: value };
            setSoundSettings(newSettings);
            await authPost('/api/users/update_profile/', { sound_settings: newSettings });
            toast.success(t('profile.audioUpdated'));
        } catch (err) {
            toast.error(t('profile.audioUpdateFailed'));
        }
    };

    const fetchLanguages = async () => {
        try {
            const response = await authGet('/translation/languages/');
            setAvailableLanguages(
                Array.isArray(response.data)
                    ? response.data
                    : [
                          { code: 'tr', name: 'Turkish' },
                          { code: 'en', name: 'English' },
                      ]
            );
        } catch (err) {
            logger.error('Languages fetch failed:', err);
            setAvailableLanguages([
                { code: 'tr', name: 'Turkish' },
                { code: 'en', name: 'English' },
            ]);
        }
    };

    const updateLanguage = async (newLanguage) => {
        try {
            await authPost('/api/users/update_profile/', { language: newLanguage });
            setLanguage(newLanguage);
            localStorage.setItem('pawscord_language', newLanguage);
            i18n.changeLanguage(newLanguage);
            toast.success(t('profile.languageChanged'));
        } catch (err) {
            toast.error(t('profile.languageChangeFailed'));
        }
    };

    const updateCustomStatus = async () => {
        try {
            await authPost('/api/users/update_status/', customStatus);
            toast.success(t('profile.statusUpdated'));
        } catch (err) {
            toast.error(
                t('profile.statusUpdateFailed', {
                    error: err.response?.data?.error || t('common.error'),
                })
            );
        }
    };

    return {
        themes,
        currentTheme,
        notificationSettings,
        soundSettings,
        language,
        availableLanguages,
        customStatus,
        setCustomStatus,
        fetchThemes,
        applyTheme,
        handleNotificationSettingsUpdate,
        handleSoundSettingsUpdate,
        fetchLanguages,
        updateLanguage,
        updateCustomStatus,
    };
};

export default useProfileSettings;
