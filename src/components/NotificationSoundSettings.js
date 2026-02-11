// frontend/src/components/NotificationSoundSettings.js
// 🔥 FEATURE 50: Notification sound settings UI
// Configure notification sounds per event type

import { useState, memo, useCallback, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute, FaBell, FaComment, FaAt, FaUserPlus, FaPhoneAlt, FaPlay, FaPause, FaToggleOn, FaToggleOff, FaSave } from 'react-icons/fa';

const SOUND_EVENTS = [
    { key: 'message', label: 'Yeni Mesaj', icon: FaComment, defaultSound: 'message.mp3' },
    { key: 'mention', label: '@Bahsetme', icon: FaAt, defaultSound: 'mention.mp3' },
    { key: 'dm', label: 'Özel Mesaj', icon: FaComment, defaultSound: 'dm.mp3' },
    { key: 'notification', label: 'Bildirim', icon: FaBell, defaultSound: 'notification.mp3' },
    { key: 'join', label: 'Kullanıcı Katıldı', icon: FaUserPlus, defaultSound: 'join.mp3' },
    { key: 'leave', label: 'Kullanıcı Ayrıldı', icon: FaUserPlus, defaultSound: 'leave.mp3' },
    { key: 'call', label: 'Gelen Arama', icon: FaPhoneAlt, defaultSound: 'call.mp3' },
    { key: 'deafen', label: 'Sessize Al/Aç', icon: FaVolumeMute, defaultSound: 'deafen.mp3' },
];

const SOUND_PRESETS = [
    { name: 'Varsayılan', value: 'default' },
    { name: 'Discord Klasik', value: 'classic' },
    { name: 'Yumuşak', value: 'soft' },
    { name: 'Retro', value: 'retro' },
    { name: 'Minimal', value: 'minimal' },
    { name: 'Sessiz', value: 'none' },
];

const NotificationSoundSettings = ({ settings, onSave }) => {
    const [masterVolume, setMasterVolume] = useState(settings?.masterVolume ?? 80);
    const [masterEnabled, setMasterEnabled] = useState(settings?.masterEnabled !== false);
    const [eventSettings, setEventSettings] = useState(
        settings?.events || SOUND_EVENTS.reduce((acc, e) => ({
            ...acc,
            [e.key]: { enabled: true, volume: 100, sound: 'default' },
        }), {})
    );
    const [playingSound, setPlayingSound] = useState(null);

    const updateEvent = useCallback((key, field, value) => {
        setEventSettings(prev => ({
            ...prev,
            [key]: { ...prev[key], [field]: value },
        }));
    }, []);

    const handlePlaySound = useCallback((key) => {
        if (playingSound === key) {
            setPlayingSound(null);
            return;
        }
        setPlayingSound(key);
        // Simulate sound play (in real app, would use Audio API)
        setTimeout(() => setPlayingSound(null), 1500);
    }, [playingSound]);

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
                <FaVolumeUp style={{ fontSize: 18, color: '#5865f2' }} />
                <h3 style={S.title}>Bildirim Sesleri</h3>
            </div>

            {/* Master Volume */}
            <div style={S.masterSection}>
                <div style={S.masterRow}>
                    <button
                        type="button"
                        style={S.toggleBtn}
                        onClick={() => setMasterEnabled(!masterEnabled)}
                    >
                        {masterEnabled ? (
                            <FaToggleOn style={{ fontSize: 24, color: '#5865f2' }} />
                        ) : (
                            <FaToggleOff style={{ fontSize: 24, color: '#4e5058' }} />
                        )}
                    </button>
                    <span style={S.masterLabel}>Tüm Sesler</span>
                    <div style={S.volumeSlider}>
                        <FaVolumeMute style={{ fontSize: 12, color: '#4e5058' }} />
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={masterVolume}
                            onChange={e => setMasterVolume(Number(e.target.value))}
                            style={S.slider}
                            disabled={!masterEnabled}
                        />
                        <FaVolumeUp style={{ fontSize: 12, color: '#4e5058' }} />
                        <span style={S.volumeValue}>{masterVolume}%</span>
                    </div>
                </div>
            </div>

            {/* Per-Event Settings */}
            <div style={S.eventList}>
                {SOUND_EVENTS.map(event => {
                    const Icon = event.icon;
                    const es = eventSettings[event.key] || { enabled: true, volume: 100, sound: 'default' };
                    const isPlaying = playingSound === event.key;

                    return (
                        <div key={event.key} style={{
                            ...S.eventItem,
                            opacity: masterEnabled && es.enabled ? 1 : 0.5,
                        }}>
                            <div style={S.eventInfo}>
                                <Icon style={{ fontSize: 14, color: '#5865f2' }} />
                                <span style={S.eventLabel}>{event.label}</span>
                            </div>

                            <div style={S.eventControls}>
                                {/* Sound Preset */}
                                <select
                                    style={S.soundSelect}
                                    value={es.sound}
                                    onChange={e => updateEvent(event.key, 'sound', e.target.value)}
                                    disabled={!masterEnabled || !es.enabled}
                                >
                                    {SOUND_PRESETS.map(p => (
                                        <option key={p.value} value={p.value}>{p.name}</option>
                                    ))}
                                </select>

                                {/* Volume */}
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={es.volume}
                                    onChange={e => updateEvent(event.key, 'volume', Number(e.target.value))}
                                    style={{ ...S.miniSlider }}
                                    disabled={!masterEnabled || !es.enabled}
                                />

                                {/* Play button */}
                                <button
                                    type="button"
                                    style={S.playBtn}
                                    onClick={() => handlePlaySound(event.key)}
                                    disabled={!masterEnabled || !es.enabled}
                                >
                                    {isPlaying ? <FaPause style={{ fontSize: 10 }} /> : <FaPlay style={{ fontSize: 10 }} />}
                                </button>

                                {/* Toggle */}
                                <button
                                    type="button"
                                    style={S.toggleSmall}
                                    onClick={() => updateEvent(event.key, 'enabled', !es.enabled)}
                                    disabled={!masterEnabled}
                                >
                                    {es.enabled ? (
                                        <FaToggleOn style={{ fontSize: 18, color: '#57f287' }} />
                                    ) : (
                                        <FaToggleOff style={{ fontSize: 18, color: '#4e5058' }} />
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button type="button" style={S.saveBtn} onClick={handleSave}>
                <FaSave /> Ayarları Kaydet
            </button>
        </div>
    );
};

const S = {
    container: { padding: 16 },
    header: {
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20,
    },
    title: { fontSize: 16, fontWeight: 700, color: '#f2f3f5', margin: 0 },
    masterSection: {
        padding: 14, backgroundColor: '#2b2d31', borderRadius: 8,
        marginBottom: 16,
    },
    masterRow: {
        display: 'flex', alignItems: 'center', gap: 10,
    },
    masterLabel: {
        fontSize: 14, fontWeight: 600, color: '#f2f3f5',
    },
    volumeSlider: {
        display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto',
    },
    slider: {
        width: 120, height: 4, appearance: 'none',
        backgroundColor: '#1e1f22', borderRadius: 2,
        outline: 'none', cursor: 'pointer',
    },
    volumeValue: {
        fontSize: 12, color: '#b5bac1', fontWeight: 500, minWidth: 32, textAlign: 'right',
    },
    toggleBtn: {
        background: 'transparent', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center',
    },
    eventList: {
        display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16,
    },
    eventItem: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 12px', backgroundColor: '#2b2d31', borderRadius: 6,
        transition: 'opacity 0.2s',
    },
    eventInfo: {
        display: 'flex', alignItems: 'center', gap: 8, minWidth: 120,
    },
    eventLabel: {
        fontSize: 14, color: '#dcddde', fontWeight: 500,
    },
    eventControls: {
        display: 'flex', alignItems: 'center', gap: 8,
    },
    soundSelect: {
        backgroundColor: '#1e1f22', border: 'none', borderRadius: 4,
        color: '#dcddde', fontSize: 12, padding: '4px 8px', outline: 'none',
        minWidth: 90,
    },
    miniSlider: {
        width: 60, height: 3, appearance: 'none',
        backgroundColor: '#1e1f22', borderRadius: 2,
        outline: 'none', cursor: 'pointer',
    },
    playBtn: {
        width: 24, height: 24, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', backgroundColor: 'rgba(88,101,242,0.2)',
        color: '#5865f2', cursor: 'pointer',
    },
    toggleSmall: {
        background: 'transparent', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center',
    },
    saveBtn: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        padding: '10px 24px', borderRadius: 4,
        border: 'none', backgroundColor: '#5865f2',
        color: '#fff', fontSize: 14, fontWeight: 500,
        cursor: 'pointer', width: '100%',
    },
};

export default memo(NotificationSoundSettings);
