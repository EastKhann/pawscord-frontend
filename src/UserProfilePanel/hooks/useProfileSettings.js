import { useState } from 'react';
import toast from '../../utils/toast';
import { authGet, authPost } from './profileApiUtils';

const useProfileSettings = () => {
    const [themes, setThemes] = useState([{ id: 'dark', name: 'Dark' }, { id: 'light', name: 'Light' }]);
    const [currentTheme, setCurrentTheme] = useState('dark');
    const [notificationSettings, setNotificationSettings] = useState({
        mentions: true, direct_messages: true, server_updates: true,
        friend_requests: true, sound_enabled: true, desktop_notifications: true,
    });
    const [soundSettings, setSoundSettings] = useState({
        message_sound: true, call_sound: true, notification_sound: true,
        voice_join_sound: true, voice_leave_sound: true, master_volume: 100,
        voice_volume: 100, notification_volume: 80, mic_volume: 100,
        input_sensitivity: 50, noise_suppression: true,
    });
    const [language, setLanguage] = useState('tr');
    const [availableLanguages, setAvailableLanguages] = useState([
        { code: 'tr', name: 'T\u00FCrk\u00E7e' }, { code: 'en', name: 'English' },
    ]);
    const [customStatus, setCustomStatus] = useState({
        status: 'online', emoji: '', text: '', expires_at: null,
    });

    const fetchThemes = async () => {
        try {
            const response = await authGet('/themes/list/');
            setThemes(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error('Themes fetch failed:', err);
            setThemes([{ id: 'dark', name: 'Dark' }, { id: 'light', name: 'Light' }]);
        }
    };

    const applyTheme = async (themeName) => {
        try {
            await authPost('/api/users/update_profile/', { theme: themeName });
            setCurrentTheme(themeName);
            toast.success(`\uD83C\uDFA8 Tema "${themeName}" uyguland\u0131!`);
        } catch (err) { toast.error('Tema uygulanamad\u0131.'); }
    };

    const handleNotificationSettingsUpdate = async (setting, value) => {
        try {
            const newSettings = { ...notificationSettings, [setting]: value };
            setNotificationSettings(newSettings);
            await authPost('/api/users/update_profile/', { notification_settings: newSettings });
            toast.success('\u2705 Bildirim ayarlar\u0131 g\u00FCncellendi!');
        } catch (err) { toast.error('Bildirim ayarlar\u0131 g\u00FCncellenemedi.'); }
    };

    const handleSoundSettingsUpdate = async (setting, value) => {
        try {
            const newSettings = { ...soundSettings, [setting]: value };
            setSoundSettings(newSettings);
            await authPost('/api/users/update_profile/', { sound_settings: newSettings });
            toast.success('\u2705 Ses ayarlar\u0131 g\u00FCncellendi!');
        } catch (err) { toast.error('Ses ayarlar\u0131 g\u00FCncellenemedi.'); }
    };

    const fetchLanguages = async () => {
        try {
            const response = await authGet('/translation/languages/');
            setAvailableLanguages(Array.isArray(response.data) ? response.data : [
                { code: 'tr', name: 'T\u00FCrk\u00E7e' }, { code: 'en', name: 'English' },
            ]);
        } catch (err) {
            console.error('Languages fetch failed:', err);
            setAvailableLanguages([{ code: 'tr', name: 'T\u00FCrk\u00E7e' }, { code: 'en', name: 'English' }]);
        }
    };

    const updateLanguage = async (newLanguage) => {
        try {
            await authPost('/api/users/update_profile/', { language: newLanguage });
            setLanguage(newLanguage);
            toast.success('\uD83C\uDF0D Dil de\u011Fi\u015Ftirildi!');
        } catch (err) { toast.error('Dil de\u011Fi\u015Ftirilemedi.'); }
    };

    const updateCustomStatus = async () => {
        try {
            await authPost('/api/users/update_status/', customStatus);
            toast.success('\u2705 Durum g\u00FCncellendi!');
        } catch (err) {
            toast.error('Durum g\u00FCncellenemedi: ' + (err.response?.data?.error || 'Hata'));
        }
    };

    return {
        themes, currentTheme, notificationSettings, soundSettings,
        language, availableLanguages, customStatus,
        setCustomStatus,
        fetchThemes, applyTheme, handleNotificationSettingsUpdate,
        handleSoundSettingsUpdate, fetchLanguages, updateLanguage, updateCustomStatus,
    };
};

export default useProfileSettings;
