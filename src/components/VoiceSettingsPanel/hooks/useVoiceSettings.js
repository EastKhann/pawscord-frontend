import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useVoice } from '../../../VoiceContext';
import { getApiBase } from '../../../utils/apiEndpoints';
import confirmDialog from '../../../utils/confirmDialog';

const useVoiceSettings = ({ channelId }) => {
    const voice = useVoice();

    const [activeTab, setActiveTab] = useState('input');
    const [settings, setSettings] = useState({
        input_device: 'default',
        output_device: 'default',
        input_volume: 100,
        output_volume: 100,
        noise_suppression: true,
        noise_suppression_level: 'high',
        echo_cancellation: true,
        echo_cancellation_level: 'high',
        automatic_gain_control: true,
        agc_level: 'moderate',
        noise_gate: true,
        noise_gate_threshold: -50,
        noise_gate_attack: 10,
        noise_gate_release: 100,
        voice_activity: true,
        input_sensitivity: 50,
        voice_threshold: -45,
        push_to_talk: false,
        push_to_talk_key: 'Space',
        ptt_release_delay: 200,
        high_pass_filter: true,
        high_pass_frequency: 80,
        audio_bitrate: 64000,
        sample_rate: 48000,
        stereo_audio: false,
        attenuation: 50,
        attenuation_while_speaking: true
    });

    const [devices, setDevices] = useState({ input: [], output: [] });
    const [equalizerPreset, setEqualizerPreset] = useState('default');
    const [voiceEffect, setVoiceEffect] = useState(null);
    const [availableEffects, setAvailableEffects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [micLevel, setMicLevel] = useState(0);
    const [isTesting, setIsTesting] = useState(false);

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const mediaStreamRef = useRef(null);
    const animationRef = useRef(null);
    const gainNodeRef = useRef(null);

    const apiBaseUrl = getApiBase();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        setLoading(false);
        Promise.all([
            fetchDevices(),
            fetchVoiceEffects(),
            channelId ? fetchVoiceSettings() : Promise.resolve()
        ]).catch(err => console.warn('[VoiceSettings] Load error:', err));

        return () => stopMicTest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchVoiceSettings = async () => {
        if (!channelId) return;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const response = await fetch(`${apiBaseUrl}/voice/${channelId}/settings/`, {
                headers: { 'Authorization': `Bearer ${token}` },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const data = await response.json();
            if (data.settings) {
                setSettings(prev => ({ ...prev, ...data.settings }));
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error fetching voice settings:', error);
            }
        }
    };

    const fetchDevices = async () => {
        try {
            const mediaDevices = await navigator.mediaDevices.enumerateDevices();
            setDevices({
                input: mediaDevices.filter(d => d.kind === 'audioinput'),
                output: mediaDevices.filter(d => d.kind === 'audiooutput')
            });
        } catch (error) {
            toast.error('❌ Cihazlar yüklenemedi');
        }
    };

    const fetchVoiceEffects = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/voice/effects/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setAvailableEffects(data.effects || [
                { id: 'robot', name: 'Robot', icon: '🤖' },
                { id: 'deep', name: 'Derin Ses', icon: '🎭' },
                { id: 'high', name: 'Yüksek Ses', icon: '🎵' },
                { id: 'echo', name: 'Yankı', icon: '🔊' },
                { id: 'radio', name: 'Radyo', icon: '📻' }
            ]);
        } catch (error) {
            console.error('Error fetching effects:', error);
        }
    };

    const updateSettings = async (newSettings) => {
        setSettings(newSettings);
        if (!channelId) return;
        try {
            await fetch(`${apiBaseUrl}/voice/${channelId}/settings/update/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(newSettings)
            });
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    };

    const updateSetting = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        updateSettings(newSettings);
    };

    const applyAudioConstraints = async (constraints) => {
        if (!voice.localAudioStream) return;
        const audioTrack = voice.localAudioStream.getAudioTracks()[0];
        if (audioTrack && audioTrack.applyConstraints) {
            try {
                await audioTrack.applyConstraints(constraints);
            } catch (err) {
                console.warn('⚠️ [Settings] Could not apply constraints:', err);
            }
        }
    };

    const startMicTest = async () => {
        try {
            // 🔥 Mic test'te gürültü engelleme KAPALI — gerçek ses seviyesini göster
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: settings.input_device !== 'default' ? settings.input_device : undefined,
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                }
            });
            mediaStreamRef.current = stream;
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();

            // 🔥 Input volume boost (GainNode) — ref ile sakla, slider değişince güncellenecek
            const gainNode = audioContextRef.current.createGain();
            gainNode.gain.value = (settings.input_volume || 100) / 100;
            gainNodeRef.current = gainNode;

            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(gainNode);
            gainNode.connect(analyserRef.current);

            // 🔥 Time-domain peak + RMS hybrid analiz
            analyserRef.current.fftSize = 2048;
            analyserRef.current.smoothingTimeConstant = 0.3;
            const dataArray = new Uint8Array(analyserRef.current.fftSize);

            const updateLevel = () => {
                analyserRef.current.getByteTimeDomainData(dataArray);
                // RMS (Root Mean Square) — daha stabil ölçüm
                let sumSquares = 0;
                let peak = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    const amplitude = (dataArray[i] - 128) / 128; // -1 to +1
                    sumSquares += amplitude * amplitude;
                    const abs = Math.abs(amplitude);
                    if (abs > peak) peak = abs;
                }
                const rms = Math.sqrt(sumSquares / dataArray.length);
                // Hybrid: %70 RMS + %30 peak (RMS stabil, peak tepkisel)
                const hybrid = rms * 0.7 + peak * 0.3;
                // 🔥 Perceptual scaling (power curve 0.35)
                // Normal konuşma hybrid ~0.02-0.15 → %40-70 gösterir
                const scaled = Math.min(100, Math.pow(hybrid, 0.35) * 100);
                // Smooth
                setMicLevel(prev => prev * 0.2 + scaled * 0.8);
                animationRef.current = requestAnimationFrame(updateLevel);
            };
            updateLevel();
            setIsTesting(true);
            toast.success('🎙️ Mikrofon testi başladı');
        } catch (error) {
            toast.error('❌ Mikrofon erişimi sağlanamadı');
        }
    };

    // 🔥 Volume slider değişince GainNode'u canlı güncelle
    useEffect(() => {
        if (gainNodeRef.current && isTesting) {
            gainNodeRef.current.gain.value = (settings.input_volume || 100) / 100;
        }
    }, [settings.input_volume, isTesting]);

    const stopMicTest = () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(track => track.stop());
        if (audioContextRef.current) audioContextRef.current.close();
        gainNodeRef.current = null;
        setIsTesting(false);
        setMicLevel(0);
    };

    const resetSettings = async () => {
        if (!await confirmDialog('Tüm ayarları varsayılana döndürmek istiyor musunuz?')) return;
        const defaults = {
            input_device: 'default', output_device: 'default',
            input_volume: 100, output_volume: 100,
            noise_suppression: true, noise_suppression_level: 'high',
            echo_cancellation: true, echo_cancellation_level: 'high',
            automatic_gain_control: true, agc_level: 'moderate',
            noise_gate: true, noise_gate_threshold: -50,
            voice_activity: true, input_sensitivity: 50,
            push_to_talk: false, push_to_talk_key: 'Space',
            high_pass_filter: true, high_pass_frequency: 80, attenuation: 50
        };
        updateSettings({ ...settings, ...defaults });
        toast.success('✅ Ayarlar sıfırlandı');
    };

    return {
        activeTab, setActiveTab,
        settings, updateSetting, updateSettings,
        devices, equalizerPreset, setEqualizerPreset,
        voiceEffect, setVoiceEffect, availableEffects,
        loading, micLevel, isTesting,
        startMicTest, stopMicTest, resetSettings,
        applyAudioConstraints, voice,
    };
};

export default useVoiceSettings;
