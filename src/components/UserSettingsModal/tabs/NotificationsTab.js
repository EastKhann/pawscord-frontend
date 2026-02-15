import { useState, useEffect, useCallback } from 'react';
import SettingSection from '../components/SettingSection';
import ToggleSwitch from '../components/ToggleSwitch';

const STORAGE_KEY = 'pawscord_notification_prefs';

const DEFAULT_PREFS = {
    desktop: true,
    sound: true,
    mentions: true,
    dms: true,
    everyone: false,
};

/** Load prefs from localStorage (Faz 6 — state persistence) */
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
    } catch { /* quota exceeded — silently ignore */ }
}

const NotificationsTab = () => {
    const [prefs, setPrefs] = useState(loadPrefs);

    // Persist on change
    useEffect(() => {
        savePrefs(prefs);
    }, [prefs]);

    const toggle = useCallback((key) => {
        setPrefs((p) => ({ ...p, [key]: !p[key] }));
    }, []);

    return (
        <div>
            <SettingSection title="Bildirim Ayarları">
                <ToggleSwitch label="Masaüstü Bildirimleri" value={prefs.desktop} onChange={() => toggle('desktop')} />
                <ToggleSwitch label="Bildirim Sesleri" value={prefs.sound} onChange={() => toggle('sound')} />
                <ToggleSwitch label="Mention Bildirimleri" value={prefs.mentions} onChange={() => toggle('mentions')} />
                <ToggleSwitch label="DM Bildirimleri" value={prefs.dms} onChange={() => toggle('dms')} />
                <ToggleSwitch label="@everyone / @here Bildirimleri" value={prefs.everyone} onChange={() => toggle('everyone')} />
            </SettingSection>
        </div>
    );
};

export default NotificationsTab;

/**
 * Utility: read notification prefs from anywhere in the app.
 * e.g.: import { getNotificationPrefs } from '...NotificationsTab';
 */
export function getNotificationPrefs() {
    return loadPrefs();
}
