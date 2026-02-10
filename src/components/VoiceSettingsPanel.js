import React, { useState, useEffect, useRef } from 'react';
import './VoiceSettingsPanel.css';
import { toast } from 'react-toastify';
import { useVoice } from '../VoiceContext'; // 🔥 VoiceContext entegrasyonu
import { getApiBase } from '../utils/apiEndpoints';
import {
    FaMicrophone, FaVolumeUp, FaHeadphones, FaCog, FaWaveSquare,
    FaShieldAlt, FaMagic, FaSlidersH, FaKeyboard, FaSync,
    FaTimes, FaPlay, FaStop, FaMicrophoneSlash,
    FaExclamationTriangle, FaBolt, FaMusic
} from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

const VoiceSettingsPanel = ({ onClose, channelId }) => {
    // 🔥 VoiceContext'ten gerçek zamanlı ayarları al
    const {
        isNoiseSuppressionEnabled,
        toggleNoiseSuppression,
        updateNoiseSuppressionLevel,
        noiseSuppressionLevel,
        vadSensitivity,
        updateVadSensitivity,
        isPTTMode,
        togglePTTMode,
        pttKey,
        updatePTTKey,
        localAudioStream
    } = useVoice();

    const [activeTab, setActiveTab] = useState('input');
    const [settings, setSettings] = useState({
        input_device: 'default',
        output_device: 'default',
        input_volume: 100,
        output_volume: 100,
        // Gelişmiş Gürültü Engelleme
        noise_suppression: true,
        noise_suppression_level: 'high', // 'low', 'medium', 'high', 'aggressive'
        echo_cancellation: true,
        echo_cancellation_level: 'high',
        automatic_gain_control: true,
        agc_level: 'moderate', // 'off', 'moderate', 'aggressive'
        // Ses Gate (Silence Detection)
        noise_gate: true,
        noise_gate_threshold: -50, // dB
        noise_gate_attack: 10, // ms
        noise_gate_release: 100, // ms
        // Konuşma Algılama
        voice_activity: true,
        input_sensitivity: 50,
        voice_threshold: -45, // dB
        // Bas Konuş
        push_to_talk: false,
        push_to_talk_key: 'Space',
        ptt_release_delay: 200, // ms
        // Gelişmiş
        high_pass_filter: true,
        high_pass_frequency: 80, // Hz
        audio_bitrate: 64000, // bps
        sample_rate: 48000,
        stereo_audio: false,
        // Attenuation
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

    const apiBaseUrl = getApiBase();
    const token = localStorage.getItem('access_token');

    const tabs = [
        { id: 'input', icon: <FaMicrophone />, label: 'Giriş' },
        { id: 'output', icon: <FaHeadphones />, label: 'Çıkış' },
        { id: 'noise', icon: <FaShieldAlt />, label: 'Gürültü Engelleme' },
        { id: 'voice', icon: <FaWaveSquare />, label: 'Ses Algılama' },
        { id: 'effects', icon: <FaMagic />, label: 'Efektler' },
        { id: 'advanced', icon: <FaCog />, label: 'Gelişmiş' }
    ];

    // 🔥 PERFORMANS: Panel hemen açılsın, veriler paralel yüklensin
    useEffect(() => {
        // Hemen loading'i kapat - panel anında görünsün
        setLoading(false);

        // Paralel olarak verileri yükle (Promise.all)
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
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

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
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
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

    // 🔥 Gerçek zamanlı ses ayarları uygula
    const applyAudioConstraints = async (constraints) => {
        if (!localAudioStream) return;

        const audioTrack = localAudioStream.getAudioTracks()[0];
        if (audioTrack && audioTrack.applyConstraints) {
            try {
                await audioTrack.applyConstraints(constraints);
            } catch (err) {
                console.warn('⚠️ [Settings] Could not apply constraints:', err);
            }
        }
    };

    // Mikrofon Test
    const startMicTest = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: settings.input_device !== 'default' ? settings.input_device : undefined,
                    echoCancellation: settings.echo_cancellation,
                    noiseSuppression: settings.noise_suppression,
                    autoGainControl: settings.automatic_gain_control
                }
            });

            mediaStreamRef.current = stream;
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();

            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);

            analyserRef.current.fftSize = 256;
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

            const updateLevel = () => {
                analyserRef.current.getByteFrequencyData(dataArray);
                const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
                setMicLevel(avg / 255 * 100);
                animationRef.current = requestAnimationFrame(updateLevel);
            };

            updateLevel();
            setIsTesting(true);
            toast.success('🎙️ Mikrofon testi başladı');
        } catch (error) {
            toast.error('❌ Mikrofon erişimi sağlanamadı');
        }
    };

    const stopMicTest = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        setIsTesting(false);
        setMicLevel(0);
    };

    const resetSettings = async () => {
        if (!await confirmDialog('Tüm ayarları varsayılana döndürmek istiyor musunuz?')) return;

        const defaults = {
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
            voice_activity: true,
            input_sensitivity: 50,
            push_to_talk: false,
            push_to_talk_key: 'Space',
            high_pass_filter: true,
            high_pass_frequency: 80,
            attenuation: 50
        };

        updateSettings({ ...settings, ...defaults });
        toast.success('✅ Ayarlar sıfırlandı');
    };

    // 🔥 Loading spinner kaldırıldı - panel anında açılıyor

    const renderInputTab = () => (
        <div className="tab-content">
            {/* Cihaz Seçimi */}
            <div className="settings-card">
                <div className="card-header">
                    <FaMicrophone className="card-icon" />
                    <h3>Mikrofon Cihazı</h3>
                </div>
                <select
                    value={settings.input_device}
                    onChange={(e) => updateSetting('input_device', e.target.value)}
                    className="device-select"
                >
                    <option value="default">🎙️ Varsayılan Mikrofon</option>
                    {devices.input.map(device => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || 'Bilinmeyen Mikrofon'}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mikrofon Seviyesi */}
            <div className="settings-card">
                <div className="card-header">
                    <FaSlidersH className="card-icon" />
                    <h3>Mikrofon Seviyesi</h3>
                    <span className="value-badge">{settings.input_volume}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={settings.input_volume}
                    onChange={(e) => updateSetting('input_volume', parseInt(e.target.value))}
                    className="premium-slider"
                />
                <div className="slider-labels">
                    <span>0%</span>
                    <span>100%</span>
                    <span>200%</span>
                </div>
            </div>

            {/* Mikrofon Test */}
            <div className="settings-card mic-test-card">
                <div className="card-header">
                    <FaWaveSquare className="card-icon" />
                    <h3>Mikrofon Testi</h3>
                </div>
                <div className="mic-test-area">
                    <div className="mic-level-container">
                        <div className="mic-level-bar" style={{ width: `${micLevel}%` }}>
                            <div className="mic-level-glow"></div>
                        </div>
                        <div className="mic-level-markers">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className={`marker ${micLevel > i * 10 ? 'active' : ''}`} />
                            ))}
                        </div>
                    </div>
                    <div className="mic-level-info">
                        <span className="level-text">{Math.round(micLevel)}%</span>
                        {micLevel > 80 && <FaExclamationTriangle className="warning-icon" />}
                    </div>
                    <button
                        className={`test-btn ${isTesting ? 'testing' : ''}`}
                        onClick={isTesting ? stopMicTest : startMicTest}
                    >
                        {isTesting ? <><FaStop /> Testi Durdur</> : <><FaPlay /> Mikrofonu Test Et</>}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderOutputTab = () => (
        <div className="tab-content">
            {/* Hoparlör Seçimi */}
            <div className="settings-card">
                <div className="card-header">
                    <FaHeadphones className="card-icon" />
                    <h3>Çıkış Cihazı</h3>
                </div>
                <select
                    value={settings.output_device}
                    onChange={(e) => updateSetting('output_device', e.target.value)}
                    className="device-select"
                >
                    <option value="default">🔊 Varsayılan Hoparlör</option>
                    {devices.output.map(device => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || 'Bilinmeyen Hoparlör'}
                        </option>
                    ))}
                </select>
            </div>

            {/* Çıkış Seviyesi */}
            <div className="settings-card">
                <div className="card-header">
                    <FaVolumeUp className="card-icon" />
                    <h3>Çıkış Seviyesi</h3>
                    <span className="value-badge">{settings.output_volume}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={settings.output_volume}
                    onChange={(e) => updateSetting('output_volume', parseInt(e.target.value))}
                    className="premium-slider"
                />
            </div>

            {/* Attenuation */}
            <div className="settings-card">
                <div className="card-header">
                    <FaMusic className="card-icon" />
                    <h3>Uygulama Sesi Azaltma</h3>
                    <span className="value-badge">{settings.attenuation}%</span>
                </div>
                <p className="card-description">
                    Biri konuşurken diğer uygulama seslerini azalt
                </p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.attenuation}
                    onChange={(e) => updateSetting('attenuation', parseInt(e.target.value))}
                    className="premium-slider"
                />
                <div className="toggle-row">
                    <span>Konuşurken Aktif</span>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.attenuation_while_speaking}
                            onChange={(e) => updateSetting('attenuation_while_speaking', e.target.checked)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderNoiseTab = () => (
        <div className="tab-content">
            {/* Gürültü Bastırma */}
            <div className="settings-card highlight-card">
                <div className="card-header">
                    <FaShieldAlt className="card-icon premium" />
                    <h3>🛡️ Gürültü Bastırma</h3>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isNoiseSuppressionEnabled ?? settings.noise_suppression}
                            onChange={(e) => {
                                updateSetting('noise_suppression', e.target.checked);
                                // 🔥 VoiceContext'e de uygula (gerçek zamanlı)
                                if (toggleNoiseSuppression && isNoiseSuppressionEnabled !== e.target.checked) {
                                    toggleNoiseSuppression();
                                }
                                toast.success(e.target.checked ? '🛡️ Gürültü engelleme açıldı' : '🔇 Gürültü engelleme kapatıldı');
                            }}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">
                    Fan sesi, klima, klavye sesi gibi arka plan gürültülerini engeller
                </p>

                {(isNoiseSuppressionEnabled ?? settings.noise_suppression) && (
                    <div className="noise-levels">
                        <span className="level-label">Seviye:</span>
                        <div className="level-buttons">
                            {[
                                { id: 'low', label: 'Düşük', desc: 'Minimal işleme' },
                                { id: 'medium', label: 'Orta', desc: 'Dengeli' },
                                { id: 'high', label: 'Yüksek', desc: 'Önerilen' },
                                { id: 'aggressive', label: 'Agresif', desc: 'Maksimum' }
                            ].map(level => (
                                <button
                                    key={level.id}
                                    className={`level-btn ${(noiseSuppressionLevel || settings.noise_suppression_level) === level.id ? 'active' : ''}`}
                                    onClick={() => {
                                        updateSetting('noise_suppression_level', level.id);
                                        // 🔥 VoiceContext'e de uygula
                                        if (updateNoiseSuppressionLevel) {
                                            updateNoiseSuppressionLevel(level.id);
                                        }
                                        toast.info(`🎚️ Gürültü seviyesi: ${level.label}`);
                                    }}
                                >
                                    <span className="level-name">{level.label}</span>
                                    <span className="level-desc">{level.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Yankı Önleme */}
            <div className="settings-card">
                <div className="card-header">
                    <FaWaveSquare className="card-icon" />
                    <h3>🔇 Yankı Önleme</h3>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.echo_cancellation}
                            onChange={(e) => {
                                updateSetting('echo_cancellation', e.target.checked);
                                // 🔥 Gerçek zamanlı uygula
                                applyAudioConstraints({ echoCancellation: e.target.checked });
                            }}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">
                    Hoparlörden gelen sesin mikrofona geri dönmesini engeller
                </p>

                {settings.echo_cancellation && (
                    <div className="level-selector">
                        <select
                            value={settings.echo_cancellation_level}
                            onChange={(e) => updateSetting('echo_cancellation_level', e.target.value)}
                            className="inline-select"
                        >
                            <option value="low">Düşük</option>
                            <option value="medium">Orta</option>
                            <option value="high">Yüksek (Önerilen)</option>
                        </select>
                    </div>
                )}
            </div>

            {/* Noise Gate */}
            <div className="settings-card">
                <div className="card-header">
                    <FaBolt className="card-icon" />
                    <h3>⚡ Gürültü Kapısı (Noise Gate)</h3>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.noise_gate}
                            onChange={(e) => updateSetting('noise_gate', e.target.checked)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">
                    Belirli ses seviyesinin altındaki sesleri tamamen engeller (sessizlik anlarındaki gürültüyü önler)
                </p>

                {settings.noise_gate && (
                    <div className="gate-settings">
                        <div className="gate-slider">
                            <label>
                                Eşik Değeri: <strong>{settings.noise_gate_threshold} dB</strong>
                            </label>
                            <input
                                type="range"
                                min="-80"
                                max="-20"
                                value={settings.noise_gate_threshold}
                                onChange={(e) => updateSetting('noise_gate_threshold', parseInt(e.target.value))}
                                className="premium-slider"
                            />
                            <div className="slider-hint">
                                <span>Hassas (-80)</span>
                                <span>Sert (-20)</span>
                            </div>
                        </div>

                        <div className="gate-timing">
                            <div className="timing-item">
                                <label>Açılış Süresi</label>
                                <select
                                    value={settings.noise_gate_attack}
                                    onChange={(e) => updateSetting('noise_gate_attack', parseInt(e.target.value))}
                                >
                                    <option value="5">5ms (Hızlı)</option>
                                    <option value="10">10ms (Normal)</option>
                                    <option value="20">20ms (Yumuşak)</option>
                                </select>
                            </div>
                            <div className="timing-item">
                                <label>Kapanış Süresi</label>
                                <select
                                    value={settings.noise_gate_release}
                                    onChange={(e) => updateSetting('noise_gate_release', parseInt(e.target.value))}
                                >
                                    <option value="50">50ms (Hızlı)</option>
                                    <option value="100">100ms (Normal)</option>
                                    <option value="200">200ms (Yumuşak)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* AGC */}
            <div className="settings-card">
                <div className="card-header">
                    <FaSlidersH className="card-icon" />
                    <h3>🎚️ Otomatik Ses Ayarlama (AGC)</h3>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.automatic_gain_control}
                            onChange={(e) => updateSetting('automatic_gain_control', e.target.checked)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">
                    Ses seviyenizi otomatik olarak dengeler - çok sessiz veya çok yüksek konuşmanızı düzeltir
                </p>

                {settings.automatic_gain_control && (
                    <div className="agc-options">
                        {[
                            { id: 'moderate', label: 'Dengeli', desc: 'Doğal ses' },
                            { id: 'aggressive', label: 'Agresif', desc: 'Sabit seviye' }
                        ].map(opt => (
                            <label key={opt.id} className={`radio-card ${settings.agc_level === opt.id ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    checked={settings.agc_level === opt.id}
                                    onChange={() => updateSetting('agc_level', opt.id)}
                                />
                                <div className="radio-content">
                                    <span className="radio-label">{opt.label}</span>
                                    <span className="radio-desc">{opt.desc}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* High Pass Filter */}
            <div className="settings-card">
                <div className="card-header">
                    <FaWaveSquare className="card-icon" />
                    <h3>🔉 Düşük Frekans Filtresi</h3>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.high_pass_filter}
                            onChange={(e) => updateSetting('high_pass_filter', e.target.checked)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <p className="card-description">
                    Düşük frekanslı gürültüleri (uğultu, hum sesi) keser
                </p>

                {settings.high_pass_filter && (
                    <div className="frequency-selector">
                        <label>Kesim Frekansı:</label>
                        <select
                            value={settings.high_pass_frequency}
                            onChange={(e) => updateSetting('high_pass_frequency', parseInt(e.target.value))}
                        >
                            <option value="50">50 Hz (Minimal)</option>
                            <option value="80">80 Hz (Önerilen)</option>
                            <option value="100">100 Hz (Agresif)</option>
                            <option value="150">150 Hz (Çok Agresif)</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    );

    const renderVoiceTab = () => (
        <div className="tab-content">
            {/* Ses Aktivasyonu vs Bas Konuş */}
            <div className="settings-card">
                <div className="card-header">
                    <FaMicrophone className="card-icon" />
                    <h3>🎙️ Giriş Modu</h3>
                </div>
                <div className="input-mode-selector">
                    <label className={`mode-card ${!isPTTMode && settings.voice_activity ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            checked={!isPTTMode}
                            onChange={() => {
                                updateSettings({
                                    ...settings,
                                    voice_activity: true,
                                    push_to_talk: false
                                });
                                // 🔥 VoiceContext'e uygula
                                if (isPTTMode && togglePTTMode) {
                                    togglePTTMode();
                                }
                                toast.success('🎤 Ses aktivasyonu açıldı');
                            }}
                        />
                        <div className="mode-content">
                            <FaWaveSquare className="mode-icon" />
                            <span className="mode-title">Ses Aktivasyonu</span>
                            <span className="mode-desc">Konuştuğunuzda otomatik aktif olur</span>
                        </div>
                    </label>

                    <label className={`mode-card ${isPTTMode || settings.push_to_talk ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            checked={isPTTMode}
                            onChange={() => {
                                updateSettings({
                                    ...settings,
                                    voice_activity: false,
                                    push_to_talk: true
                                });
                                // 🔥 VoiceContext'e uygula
                                if (!isPTTMode && togglePTTMode) {
                                    togglePTTMode();
                                }
                                toast.success('⌨️ Bas Konuş modu açıldı');
                            }}
                        />
                        <div className="mode-content">
                            <FaKeyboard className="mode-icon" />
                            <span className="mode-title">Bas Konuş</span>
                            <span className="mode-desc">Tuşa basılı tutarak konuşun</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Ses Aktivasyonu Ayarları */}
            {!isPTTMode && (
                <div className="settings-card">
                    <div className="card-header">
                        <FaSlidersH className="card-icon" />
                        <h3>Hassasiyet Ayarları</h3>
                    </div>

                    <div className="sensitivity-control">
                        <div className="sensitivity-header">
                            <span>Mikrofon Hassasiyeti</span>
                            <span className="value-badge">{vadSensitivity || settings.input_sensitivity}%</span>
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="80"
                            value={vadSensitivity || settings.input_sensitivity}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                updateSetting('input_sensitivity', val);
                                // 🔥 VoiceContext'e uygula
                                if (updateVadSensitivity) {
                                    updateVadSensitivity(val);
                                }
                            }}
                            className="premium-slider sensitivity"
                        />
                        <div className="sensitivity-hint">
                            <FaMicrophoneSlash />
                            <span>Düşük = Daha sessiz sesleri algılar</span>
                        </div>

                        {/* Görsel Gösterge */}
                        <div className="sensitivity-visualizer">
                            <div className="threshold-line" style={{ left: `${((vadSensitivity || settings.input_sensitivity) - 20) / 60 * 100}%` }} />
                            <div className="level-indicator" style={{ width: `${micLevel}%` }} />
                        </div>
                        <div className="visualizer-labels">
                            <span>Sessiz</span>
                            <span>Yüksek</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Bas Konuş Ayarları */}
            {isPTTMode && (
                <div className="settings-card">
                    <div className="card-header">
                        <FaKeyboard className="card-icon" />
                        <h3>Bas Konuş Ayarları</h3>
                    </div>

                    <div className="ptt-settings">
                        <div className="ptt-key-bind">
                            <label>Tuş Ataması</label>
                            <input
                                type="text"
                                value={pttKey || settings.push_to_talk_key}
                                onKeyDown={(e) => {
                                    e.preventDefault();
                                    updateSetting('push_to_talk_key', e.code);
                                    // 🔥 VoiceContext'e uygula
                                    if (updatePTTKey) {
                                        updatePTTKey(e.code);
                                    }
                                    toast.info(`⌨️ Tuş: ${e.code}`);
                                }}
                                placeholder="Bir tuşa basın..."
                                className="key-input"
                                readOnly
                            />
                        </div>

                        <div className="ptt-delay">
                            <label>Bırakma Gecikmesi</label>
                            <select
                                value={settings.ptt_release_delay}
                                onChange={(e) => updateSetting('ptt_release_delay', parseInt(e.target.value))}
                            >
                                <option value="0">0ms (Anında)</option>
                                <option value="100">100ms</option>
                                <option value="200">200ms (Önerilen)</option>
                                <option value="300">300ms</option>
                                <option value="500">500ms</option>
                            </select>
                            <span className="hint">Tuşu bıraktıktan sonra mikrofon açık kalma süresi</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderEffectsTab = () => (
        <div className="tab-content">
            {/* Equalizer */}
            <div className="settings-card">
                <div className="card-header">
                    <FaMusic className="card-icon" />
                    <h3>🎚️ Equalizer</h3>
                </div>
                <div className="equalizer-presets">
                    {[
                        { id: 'default', label: 'Varsayılan', icon: '🎵' },
                        { id: 'bass_boost', label: 'Bass Boost', icon: '🔊' },
                        { id: 'treble_boost', label: 'Treble Boost', icon: '🎼' },
                        { id: 'voice', label: 'Ses İyileştirme', icon: '🗣️' },
                        { id: 'crisp', label: 'Kristal Netlik', icon: '✨' }
                    ].map(preset => (
                        <button
                            key={preset.id}
                            className={`eq-preset-btn ${equalizerPreset === preset.id ? 'active' : ''}`}
                            onClick={() => setEqualizerPreset(preset.id)}
                        >
                            <span className="preset-icon">{preset.icon}</span>
                            <span className="preset-label">{preset.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Ses Efektleri */}
            <div className="settings-card">
                <div className="card-header">
                    <FaMagic className="card-icon" />
                    <h3>🎭 Ses Efektleri</h3>
                    {voiceEffect && (
                        <button className="remove-effect-btn" onClick={() => setVoiceEffect(null)}>
                            <FaTimes /> Kaldır
                        </button>
                    )}
                </div>
                <div className="effects-grid">
                    {availableEffects.map(effect => (
                        <button
                            key={effect.id}
                            className={`effect-btn ${voiceEffect === effect.id ? 'active' : ''}`}
                            onClick={() => setVoiceEffect(effect.id)}
                        >
                            <span className="effect-icon">{effect.icon}</span>
                            <span className="effect-name">{effect.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderAdvancedTab = () => (
        <div className="tab-content">
            {/* Ses Kalitesi */}
            <div className="settings-card">
                <div className="card-header">
                    <FaCog className="card-icon" />
                    <h3>🔧 Ses Kalitesi</h3>
                </div>

                <div className="advanced-options">
                    <div className="option-row">
                        <label>Bit Hızı (Bitrate)</label>
                        <select
                            value={settings.audio_bitrate}
                            onChange={(e) => updateSetting('audio_bitrate', parseInt(e.target.value))}
                        >
                            <option value="32000">32 kbps (Düşük)</option>
                            <option value="64000">64 kbps (Normal)</option>
                            <option value="96000">96 kbps (Yüksek)</option>
                            <option value="128000">128 kbps (En İyi)</option>
                        </select>
                    </div>

                    <div className="option-row">
                        <label>Örnekleme Hızı</label>
                        <select
                            value={settings.sample_rate}
                            onChange={(e) => updateSetting('sample_rate', parseInt(e.target.value))}
                        >
                            <option value="24000">24 kHz</option>
                            <option value="48000">48 kHz (Önerilen)</option>
                        </select>
                    </div>

                    <div className="toggle-row">
                        <div>
                            <span>Stereo Ses</span>
                            <span className="option-desc">Müzik paylaşımı için</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.stereo_audio}
                                onChange={(e) => updateSetting('stereo_audio', e.target.checked)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Reset */}
            <div className="settings-card danger-card">
                <div className="card-header">
                    <FaSync className="card-icon" />
                    <h3>🔄 Ayarları Sıfırla</h3>
                </div>
                <p className="card-description">
                    Tüm ses ayarlarını varsayılan değerlerine döndürür
                </p>
                <button className="reset-btn" onClick={resetSettings}>
                    <FaSync /> Varsayılana Dön
                </button>
            </div>
        </div>
    );

    return (
        <div className="voice-settings-overlay" onClick={onClose}>
            <div className="voice-settings-panel premium" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="voice-settings-header">
                    <h2>🎙️ Ses Ayarları</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="settings-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="voice-settings-content">
                    {activeTab === 'input' && renderInputTab()}
                    {activeTab === 'output' && renderOutputTab()}
                    {activeTab === 'noise' && renderNoiseTab()}
                    {activeTab === 'voice' && renderVoiceTab()}
                    {activeTab === 'effects' && renderEffectsTab()}
                    {activeTab === 'advanced' && renderAdvancedTab()}
                </div>
            </div>
        </div>
    );
};

export default VoiceSettingsPanel;

