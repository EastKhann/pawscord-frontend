import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logger from '../utils/logger';

export function useVoiceSettings() {
    // 🎚️ Noise Gate State
    const { t } = useTranslation();
    const [noiseGateThreshold, setNoiseGateThreshold] = useState(() => {
        try {
            return parseInt(localStorage.getItem('pawscord_noise_gate')) || -50;
        } catch {
            return -50;
        }
    });
    const [isNoiseGateEnabled, setIsNoiseGateEnabled] = useState(() => {
        try {
            return localStorage.getItem('pawscord_noise_gate_enabled') !== 'false';
        } catch {
            return true;
        }
    });

    // 📊 Audio Visualizer Toggle
    const [isVisualizerEnabled, setIsVisualizerEnabled] = useState(() => {
        try {
            return localStorage.getItem('pawscord_visualizer') === 'true';
        } catch {
            return false;
        }
    });

    // Ses Levelleri & Mute
    const [remoteVolumes, setRemoteVolumes] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('pawscord_user_volumes')) || {};
        } catch {
            return {};
        }
    });
    const [mutedUsers, setMutedUsers] = useState(new Set());
    const [isSpatialAudioEnabled, setIsSpatialAudioEnabled] = useState(() => {
        // 🔥 YENİ: Spatial audio atomorrowı localStorage'dan upload
        try {
            return localStorage.getItem('pawscord_spatial_audio') === 'true';
        } catch {
            return false; // Default kapalı (yeni kullanıcılar for)
        }
    });

    // 🔥 YENİ: VAD Sensitivity ve Noise Suppression settingsı
    const [vadSensitivity, setVadSensitivity] = useState(() => {
        try {
            return parseInt(localStorage.getItem('pawscord_vad_sensitivity')) || 45;
        } catch {
            return 45; // Default threshold
        }
    });

    const [isNoiseSuppressionEnabled, setIsNoiseSuppressionEnabled] = useState(() => {
        try {
            const saved = localStorage.getItem('pawscord_noise_suppression');
            // 🔥 FIX: Default AÇIK - gürültü engelleme aktif olsun
            return saved === null ? true : saved === 'true';
        } catch {
            return true; // 🔥 FIX: Default AÇIK
        }
    });

    // 🔥 YENİ: Gürültü Blockme Seviyesi - Default 'medium' (audio kısılmasın)
    const [noiseSuppressionLevel, setNoiseSuppressionLevel] = useState(() => {
        try {
            const voiceSettings = JSON.parse(localStorage.getItem('voice_settings') || '{}');
            return voiceSettings.audio?.noiseSuppressionLevel || 'medium'; // 🔥 Default ORTA
        } catch {
            return 'medium'; // 🔥 Default ORTA
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

    // 🔥 YENİ: System Audio (Ekran shareında sistem sesi)
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

    // 🔥 YENİ: Mikrofon ve hoparlör cihaz seçimi
    const [inputDeviceId, setInputDeviceId] = useState(() => {
        try {
            return localStorage.getItem('pawscord_input_device') || 'default';
        } catch {
            return 'default';
        }
    });
    const [outputDeviceId, setOutputDeviceId] = useState(() => {
        try {
            return localStorage.getItem('pawscord_output_device') || 'default';
        } catch {
            return 'default';
        }
    });

    // 🔥 YENİ: Echo cancellation toggle (bazı kulaklıklarda gereksiz)
    const [isEchoCancellationEnabled, setIsEchoCancellationEnabled] = useState(() => {
        try {
            const saved = localStorage.getItem('pawscord_echo_cancel');
            return saved === null ? true : saved === 'true';
        } catch {
            return true;
        }
    });

    // 🔥 YENİ: Auto gain control toggle
    const [isAutoGainEnabled, setIsAutoGainEnabled] = useState(() => {
        try {
            const saved = localStorage.getItem('pawscord_auto_gain');
            return saved === null ? true : saved === 'true';
        } catch {
            return true;
        }
    });

    // Voice Settingsnı Save
    useEffect(() => {
        localStorage.setItem('pawscord_user_volumes', JSON.stringify(remoteVolumes));
    }, [remoteVolumes]);

    // --- Update / Toggle Functions (pure state + localStorage) ---

    const setRemoteVolume = useCallback((targetUsername, volume) => {
        setRemoteVolumes((prev) => ({
            ...prev,
            [targetUsername]: Math.max(0, Math.min(200, volume)),
        }));
    }, []);

    // 🔥 YENİ: VAD Sensitivity Currentleme
    const updateVadSensitivity = useCallback((newSensitivity) => {
        const clamped = Math.max(20, Math.min(80, newSensitivity)); // 20-80 searchsı
        setVadSensitivity(clamped);
        localStorage.setItem('pawscord_vad_sensitivity', clamped.toString());
    }, []);

    // 🔥 YENİ: Gürültü Blockme Seviyesini Currentle
    const updateNoiseSuppressionLevel = useCallback((level) => {
        const validLevels = ['low', 'medium', 'high', 'aggressive'];
        const newLevel = validLevels.includes(level) ? level : 'high';
        setNoiseSuppressionLevel(newLevel);

        // LocalStorage'a save
        try {
            const voiceSettings = JSON.parse(localStorage.getItem('voice_settings') || '{}');
            voiceSettings.audio = { ...voiceSettings.audio, noiseSuppressionLevel: newLevel };
            localStorage.setItem('voice_settings', JSON.stringify(voiceSettings));
        } catch (e) {
            logger.error('[Noise Level] Storage error:', e);
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

    // 🔥 YENİ: System Audio Toggle (Ekran shareında)
    const toggleSystemAudio = useCallback((enabled) => {
        setIncludeSystemAudio(enabled);
        localStorage.setItem('pawscord_system_audio', enabled.toString());
    }, []);

    // 🎚️ YENİ: Noise Gate Toggle
    const toggleNoiseGate = useCallback((enabled) => {
        setIsNoiseGateEnabled(enabled);
        localStorage.setItem('pawscord_noise_gate_enabled', enabled.toString());
    }, []);

    // 🎚️ YENİ: Noise Gate Threshold Currentleme
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

    // 🔥 YENİ: Mikrofon cihaz seçimi
    const updateInputDevice = useCallback((deviceId) => {
        setInputDeviceId(deviceId);
        localStorage.setItem('pawscord_input_device', deviceId);
    }, []);

    // 🔥 YENİ: Hoparlör/kulaklık cihaz seçimi
    const updateOutputDevice = useCallback((deviceId) => {
        setOutputDeviceId(deviceId);
        localStorage.setItem('pawscord_output_device', deviceId);
    }, []);

    // 🔥 YENİ: Echo cancellation toggle
    const toggleEchoCancellation = useCallback((enabled) => {
        setIsEchoCancellationEnabled(enabled);
        localStorage.setItem('pawscord_echo_cancel', enabled.toString());
    }, []);

    // 🔥 YENİ: Auto gain control toggle
    const toggleAutoGain = useCallback((enabled) => {
        setIsAutoGainEnabled(enabled);
        localStorage.setItem('pawscord_auto_gain', enabled.toString());
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
        inputDeviceId,
        outputDeviceId,
        isEchoCancellationEnabled,
        isAutoGainEnabled,
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
        updateInputDevice,
        updateOutputDevice,
        toggleEchoCancellation,
        toggleAutoGain,
    };
}
