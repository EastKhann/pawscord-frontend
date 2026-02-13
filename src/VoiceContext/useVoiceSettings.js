import { useState, useCallback, useEffect } from 'react';

export function useVoiceSettings() {
    // 🎚️ Noise Gate State
    const [noiseGateThreshold, setNoiseGateThreshold] = useState(() => {
        try {
            return parseInt(localStorage.getItem('pawscord_noise_gate')) || -50;
        } catch { return -50; }
    });
    const [isNoiseGateEnabled, setIsNoiseGateEnabled] = useState(() => {
        try {
            return localStorage.getItem('pawscord_noise_gate_enabled') !== 'false';
        } catch { return true; }
    });

    // 📊 Audio Visualizer Toggle
    const [isVisualizerEnabled, setIsVisualizerEnabled] = useState(() => {
        try {
            return localStorage.getItem('pawscord_visualizer') === 'true';
        } catch { return false; }
    });

    // Ses Seviyeleri & Mute
    const [remoteVolumes, setRemoteVolumes] = useState(() => {
        try { return JSON.parse(localStorage.getItem('pawscord_user_volumes')) || {}; } catch { return {}; }
    });
    const [mutedUsers, setMutedUsers] = useState(new Set());
    const [isSpatialAudioEnabled, setIsSpatialAudioEnabled] = useState(() => {
        // 🔥 YENİ: Spatial audio ayarını localStorage'dan yükle
        try {
            return localStorage.getItem('pawscord_spatial_audio') === 'true';
        } catch {
            return false; // Varsayılan kapalı (yeni kullanıcılar için)
        }
    });

    // 🔥 YENİ: VAD Sensitivity ve Noise Suppression ayarları
    const [vadSensitivity, setVadSensitivity] = useState(() => {
        try {
            return parseInt(localStorage.getItem('pawscord_vad_sensitivity')) || 45;
        } catch {
            return 45; // Varsayılan threshold
        }
    });

    const [isNoiseSuppressionEnabled, setIsNoiseSuppressionEnabled] = useState(() => {
        try {
            const saved = localStorage.getItem('pawscord_noise_suppression');
            // 🔥 FIX: Varsayılan AÇIK - gürültü engelleme aktif olsun
            return saved === null ? true : saved === 'true';
        } catch {
            return true; // 🔥 FIX: Varsayılan AÇIK
        }
    });

    // 🔥 YENİ: Gürültü Engelleme Seviyesi - Varsayılan 'medium' (ses kısılmasın)
    const [noiseSuppressionLevel, setNoiseSuppressionLevel] = useState(() => {
        try {
            const voiceSettings = JSON.parse(localStorage.getItem('voice_settings') || '{}');
            return voiceSettings.audio?.noiseSuppressionLevel || 'medium';  // 🔥 Varsayılan ORTA
        } catch {
            return 'medium';  // 🔥 Varsayılan ORTA
        }
    });

    // 🔥 YENİ: Screen Share Quality
    const [screenShareQuality, setScreenShareQuality] = useState(() => {
        try {
            return localStorage.getItem('pawscord_screen_quality') || '1080p';
        } catch {
            return '1080p';
        }
    });

    const [screenShareFPS, setScreenShareFPS] = useState(() => {
        try {
            return parseInt(localStorage.getItem('pawscord_screen_fps')) || 30;
        } catch {
            return 30;
        }
    });

    // 🔥 YENİ: System Audio (Ekran paylaşımında sistem sesi)
    const [includeSystemAudio, setIncludeSystemAudio] = useState(() => {
        try {
            return localStorage.getItem('pawscord_system_audio') !== 'false';
        } catch {
            return false;
        }
    });

    // 🔥 YENİ: Push-to-Talk
    const [isPTTMode, setIsPTTMode] = useState(() => {
        try {
            return localStorage.getItem('pawscord_ptt_mode') === 'true';
        } catch {
            return false;
        }
    });

    const [pttKey, setPTTKey] = useState(() => {
        try {
            return localStorage.getItem('pawscord_ptt_key') || 'Space';
        } catch {
            return 'Space';
        }
    });

    const [isPTTActive, setIsPTTActive] = useState(false);

    // Ses Ayarlarını Kaydet
    useEffect(() => {
        localStorage.setItem('pawscord_user_volumes', JSON.stringify(remoteVolumes));
    }, [remoteVolumes]);

    // --- Update / Toggle Functions (pure state + localStorage) ---

    const setRemoteVolume = useCallback((targetUsername, volume) => {
        setRemoteVolumes(prev => ({
            ...prev,
            [targetUsername]: Math.max(0, Math.min(200, volume))
        }));
    }, []);

    // 🔥 YENİ: VAD Sensitivity Güncelleme
    const updateVadSensitivity = useCallback((newSensitivity) => {
        const clamped = Math.max(20, Math.min(80, newSensitivity)); // 20-80 arası
        setVadSensitivity(clamped);
        localStorage.setItem('pawscord_vad_sensitivity', clamped.toString());
    }, []);

    // 🔥 YENİ: Gürültü Engelleme Seviyesini Güncelle
    const updateNoiseSuppressionLevel = useCallback((level) => {
        const validLevels = ['low', 'medium', 'high', 'aggressive'];
        const newLevel = validLevels.includes(level) ? level : 'high';
        setNoiseSuppressionLevel(newLevel);

        // LocalStorage'a kaydet
        try {
            const voiceSettings = JSON.parse(localStorage.getItem('voice_settings') || '{}');
            voiceSettings.audio = { ...voiceSettings.audio, noiseSuppressionLevel: newLevel };
            localStorage.setItem('voice_settings', JSON.stringify(voiceSettings));
        } catch (e) {
            console.error('[Noise Level] Storage error:', e);
        }
    }, []);

    // 🔥 YENİ: Screen Quality Update
    const updateScreenQuality = useCallback((quality) => {
        setScreenShareQuality(quality);
        localStorage.setItem('pawscord_screen_quality', quality);
    }, []);

    // 🔥 YENİ: Screen FPS Update
    const updateScreenFPS = useCallback((fps) => {
        const fpsInt = parseInt(fps);
        setScreenShareFPS(fpsInt);
        localStorage.setItem('pawscord_screen_fps', fpsInt.toString());
    }, []);

    // 🔥 YENİ: System Audio Toggle (Ekran paylaşımında)
    const toggleSystemAudio = useCallback((enabled) => {
        setIncludeSystemAudio(enabled);
        localStorage.setItem('pawscord_system_audio', enabled.toString());
    }, []);

    // 🎚️ YENİ: Noise Gate Toggle
    const toggleNoiseGate = useCallback((enabled) => {
        setIsNoiseGateEnabled(enabled);
        localStorage.setItem('pawscord_noise_gate_enabled', enabled.toString());
    }, []);

    // 🎚️ YENİ: Noise Gate Threshold Güncelleme
    const updateNoiseGateThreshold = useCallback((threshold) => {
        const clamped = Math.max(-80, Math.min(-20, threshold));
        setNoiseGateThreshold(clamped);
        localStorage.setItem('pawscord_noise_gate', clamped.toString());
    }, []);

    // 📊 YENİ: Audio Visualizer Toggle
    const toggleVisualizer = useCallback((enabled) => {
        setIsVisualizerEnabled(enabled);
        localStorage.setItem('pawscord_visualizer', enabled.toString());
    }, []);

    // 🔥 YENİ: PTT Key Update
    const updatePTTKey = useCallback((key) => {
        setPTTKey(key);
        localStorage.setItem('pawscord_ptt_key', key);
    }, []);

    return {
        // State
        noiseGateThreshold,
        isNoiseGateEnabled,
        isVisualizerEnabled,
        remoteVolumes,
        setRemoteVolumes,
        mutedUsers,
        setMutedUsers,
        isSpatialAudioEnabled,
        setIsSpatialAudioEnabled,
        vadSensitivity,
        isNoiseSuppressionEnabled,
        setIsNoiseSuppressionEnabled,
        noiseSuppressionLevel,
        screenShareQuality,
        screenShareFPS,
        includeSystemAudio,
        isPTTMode,
        setIsPTTMode,
        pttKey,
        isPTTActive,
        setIsPTTActive,
        // Updaters
        setRemoteVolume,
        updateVadSensitivity,
        updateNoiseSuppressionLevel,
        updateScreenQuality,
        updateScreenFPS,
        toggleSystemAudio,
        toggleNoiseGate,
        updateNoiseGateThreshold,
        toggleVisualizer,
        updatePTTKey,
    };
}
