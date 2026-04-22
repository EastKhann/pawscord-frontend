// frontend/src/components/NotificationSoundSettings.js
// 🔥 FEATURE 50: Notification sound settings UI
// Configure notification sounds per event type

import { useState, memo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    FaVolumeUp,
    FaVolumeMute,
    FaBell,
    FaComment,
    FaAt,
    FaUserPlus,
    FaPhoneAlt,
    FaPlay,
    FaPause,
    FaToggleOn,
    FaToggleOff,
    FaSave,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const SOUND_EVENTS = [
    {
        key: 'message',
        labelKey: 'notifications.sounds.newMessage',
        icon: FaComment,
        defaultSound: 'message.mp3',
    },
    {
        key: 'mention',
        labelKey: 'notifications.sounds.mention',
        icon: FaAt,
        defaultSound: 'mention.mp3',
    },
    {
        key: 'dm',
        labelKey: 'notifications.sounds.directMessage',
        icon: FaComment,
        defaultSound: 'dm.mp3',
    },
    {
        key: 'notification',
        labelKey: 'notifications.sounds.notification',
        icon: FaBell,
        defaultSound: 'notification.mp3',
    },
    {
        key: 'join',
        labelKey: 'notifications.sounds.userJoined',
        icon: FaUserPlus,
        defaultSound: 'join.mp3',
    },
    {
        key: 'leave',
        labelKey: 'notifications.sounds.userLeft',
        icon: FaUserPlus,
        defaultSound: 'leave.mp3',
    },
    {
        key: 'call',
        labelKey: 'notifications.sounds.incomingCall',
        icon: FaPhoneAlt,
        defaultSound: 'call.mp3',
    },
    {
        key: 'deafen',
        labelKey: 'notifications.sounds.muteToggle',
        icon: FaVolumeMute,
        defaultSound: 'deafen.mp3',
    },
];

const SOUND_PRESETS = [
    { nameKey: 'notifications.sounds.presetDefault', value: 'default' },
    { nameKey: 'notifications.sounds.presetClassic', value: 'classic' },
    { nameKey: 'notifications.sounds.presetSoft', value: 'soft' },
    { nameKey: 'notifications.sounds.presetRetro', value: 'retro' },
    { nameKey: 'notifications.sounds.presetMinimal', value: 'minimal' },
    { nameKey: 'notifications.sounds.presetSilent', value: 'none' },
];

const NotificationSoundSettings = ({ settings, onSave }) => {
    const { t } = useTranslation();
    const [masterVolume, setMasterVolume] = useState(settings?.masterVolume ?? 80);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [masterEnabled, setMasterEnabled] = useState(settings?.masterEnabled !== false);
    const [eventSettings, setEventSettings] = useState(
        settings?.events ||
        SOUND_EVENTS.reduce(
            (acc, e) => ({
                ...acc,
                [e.key]: { enabled: true, volume: 100, sound: 'default' },
            }),
            {}
        )
    );
    const [playingSound, setPlayingSound] = useState(null);

    const updateEvent = useCallback((key, field, value) => {
        setEventSettings((prev) => ({
            ...prev,
            [key]: { ...prev[key], [field]: value },
        }));
    }, []);

    const handlePlaySound = useCallback(
        (key) => {
            if (playingSound === key) {
                setPlayingSound(null);
                return;
            }
            setPlayingSound(key);
            // Simulate sound play (in real app, would use Audio API)
            setTimeout(() => setPlayingSound(null), 1500);
        },
        [playingSound]
    );

    const handleSave = useCallback(() => {
        onSave?.({
            masterVolume,
            masterEnabled,
            events: eventSettings,
        });
    }, [masterVolume, masterEnabled, eventSettings, onSave]);

    return (
        <div style={S.container}>
            <div style={S.header}>
                <FaVolumeUp className="icon-primary-18" />
                <h3 style={S.title}>{t('notifications.sounds.title')}</h3>
            </div>

            {/* Master Volume */}
            <div style={S.masterSection}>
                <div style={S.masterRow}>
                    <button
                        aria-label={t('notifSound.masterToggle', 'Toggle all sounds')}
                        onClick={() => setMasterEnabled(!masterEnabled)}
                    >
                        {masterEnabled ? <FaToggleOn /> : <FaToggleOff className="icon-gray-24" />}
                    </button>
                    <span style={S.masterLabel}>{t('notifications.sounds.allSounds')}</span>
                    <div style={S.volumeSlider}>
                        <FaVolumeMute className="text-4e-12" />
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={masterVolume}
                            onChange={(e) => setMasterVolume(Number(e.target.value))}
                            style={S.slider}
                            disabled={!masterEnabled}
                        />
                        <FaVolumeUp className="text-4e-12" />
                        <span style={S.volumeValue}>{masterVolume}%</span>
                    </div>
                </div>
            </div>

            {/* Thu-Event Settings */}
            <div style={S.eventList}>
                {SOUND_EVENTS.map((event) => {
                    const Icon = event.icon;
                    const es = eventSettings[event.key] || {
                        enabled: true,
                        volume: 100,
                        sound: 'default',
                    };
                    const isPlaying = playingSound === event.key;

                    return (
                        <div
                            key={event.key}
                            style={{
                                ...S.eventItem,
                                opacity: masterEnabled && es.enabled ? 1 : 0.5,
                            }}
                        >
                            <div style={S.eventInfo}>
                                <Icon />
                                <span style={S.eventLabel}>{t(event.labelKey)}</span>
                            </div>

                            <div style={S.eventControls}>
                                {/* Sound Preset */}
                                <select
                                    style={S.soundSelect}
                                    value={es.sound}
                                    onChange={(e) =>
                                        updateEvent(event.key, 'sound', e.target.value)
                                    }
                                    disabled={!masterEnabled || !es.enabled}
                                >
                                    {SOUND_PRESETS.map((p) => (
                                        <option key={p.value} value={p.value}>
                                            {t(p.nameKey)}
                                        </option>
                                    ))}
                                </select>

                                {/* Volume */}
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={es.volume}
                                    onChange={(e) =>
                                        updateEvent(event.key, 'volume', Number(e.target.value))
                                    }
                                    disabled={!masterEnabled || !es.enabled}
                                />

                                {/* Play button */}
                                <button
                                    aria-label={isPlaying ? t('notifSound.stopPreview', 'Stop preview') : t('notifSound.playPreview', 'Play preview')}
                                    onClick={() => handlePlaySound(event.key)}
                                    disabled={!masterEnabled || !es.enabled}
                                >
                                    {isPlaying ? (
                                        <FaPause className="icon-tiny" />
                                    ) : (
                                        <FaPlay className="icon-tiny" />
                                    )}
                                </button>

                                {/* Toggle */}
                                <button
                                    aria-label={t('notifSound.toggleEvent', 'Toggle sound event')}
                                    onClick={() => updateEvent(event.key, 'enabled', !es.enabled)}
                                    disabled={!masterEnabled}
                                >
                                    {es.enabled ? <FaToggleOn /> : <FaToggleOff />}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button aria-label={t('notifSound.saveSettings', 'Save sound settings')} type="button" style={S.saveBtn} onClick={handleSave}>
                <FaSave /> {t('notifications.sounds.saveSettings')}
            </button>
        </div>
    );
};

const S = {
    container: { padding: 16 },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    title: { fontSize: 16, fontWeight: 700, color: '#f2f3f5', margin: 0 },
    masterSection: {
        padding: 14,
        backgroundColor: '#111214',
        borderRadius: 8,
        marginBottom: 16,
    },
    masterRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    masterLabel: {
        fontSize: 14,
        fontWeight: 600,
        color: '#f2f3f5',
    },
    volumeSlider: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginLeft: 'auto',
    },
    slider: {
        width: 120,
        height: 4,
        appearance: 'none',
        backgroundColor: '#0d0e10',
        borderRadius: 2,
        outline: 'none',
        cursor: 'pointer',
    },
    volumeValue: {
        fontSize: 12,
        color: '#b5bac1',
        fontWeight: 500,
        minWidth: 32,
        textAlign: 'right',
    },
    toggleBtn: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    eventList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        marginBottom: 16,
    },
    eventItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        backgroundColor: '#111214',
        borderRadius: 6,
        transition: 'opacity 0.2s',
    },
    eventInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minWidth: 120,
    },
    eventLabel: {
        fontSize: 14,
        color: '#dbdee1',
        fontWeight: 500,
    },
    eventControls: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    soundSelect: {
        backgroundColor: '#0d0e10',
        border: 'none',
        borderRadius: 4,
        color: '#dbdee1',
        fontSize: 12,
        padding: '4px 8px',
        outline: 'none',
        minWidth: 90,
    },
    miniSlider: {
        width: 60,
        height: 3,
        appearance: 'none',
        backgroundColor: '#0d0e10',
        borderRadius: 2,
        outline: 'none',
        cursor: 'pointer',
    },
    playBtn: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        backgroundColor: 'rgba(88,101,242,0.2)',
        color: '#5865f2',
        cursor: 'pointer',
    },
    toggleSmall: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    saveBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: '10px 24px',
        borderRadius: 4,
        border: 'none',
        backgroundColor: '#5865f2',
        color: '#fff',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        width: '100%',
    },
};

NotificationSoundSettings.propTypes = {
    settings: PropTypes.object,
    onSave: PropTypes.func,
};
export default memo(NotificationSoundSettings);
