import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';
import ut from './UserTabs.module.css';

const STORAGE_KEY = 'pawscord_notification_prefs';

const DEFAULT_PREFS = {
    desktop: true,
    sound: true,
    mentions: true,
    dms: true,
    everyone: false,
};

function loadPrefs() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? { ...DEFAULT_PREFS, ...JSON.parse(raw) } : { ...DEFAULT_PREFS };
    } catch {
        return { ...DEFAULT_PREFS };
    }
}

function savePrefs(prefs) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
        /* quota exceeded */
    }
}

const NotificationsTab = () => {
    const { t } = useTranslation();
    const [prefs, setPrefs] = useState(loadPrefs);

    useEffect(() => {
        savePrefs(prefs);
    }, [prefs]);

    const toggle = useCallback((key) => {
        setPrefs((p) => ({ ...p, [key]: !p[key] }));
    }, []);

    return (
        <div aria-label="notifications tab">
            <SettingSection title={t('settings.tabs.notifications.notificationSettings')}>
                <ToggleSwitch
                    label={t('settings.tabs.notifications.desktopNotifications')}
                    value={prefs.desktop}
                    onChange={() => toggle('desktop')}
                />
                <ToggleSwitch
                    label={t('settings.tabs.notifications.notificationSounds')}
                    value={prefs.sound}
                    onChange={() => toggle('sound')}
                />
                <ToggleSwitch
                    label={t('settings.tabs.notifications.mentionNotifications')}
                    value={prefs.mentions}
                    onChange={() => toggle('mentions')}
                />
                <ToggleSwitch
                    label={t('settings.tabs.notifications.dmNotifications')}
                    value={prefs.dms}
                    onChange={() => toggle('dms')}
                />
                <ToggleSwitch
                    label={t('settings.tabs.notifications.everyoneNotifications')}
                    value={prefs.everyone}
                    onChange={() => toggle('everyone')}
                />
            </SettingSection>
        </div>
    );
};

NotificationsTab.propTypes = {};
export default NotificationsTab;

export function getNotificationPrefs() {
    return loadPrefs();
}
