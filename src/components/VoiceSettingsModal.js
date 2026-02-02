// frontend/src/components/VoiceSettingsModal.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaMicrophone, FaHeadphones, FaVideo, FaVolumeUp } from 'react-icons/fa';

const VoiceSettingsModal = ({ isOpen, onClose }) => {
    const [devices, setDevices] = useState({
        audioInputs: [],
        audioOutputs: [],
        videoInputs: [],
    });

    const [selectedDevices, setSelectedDevices] = useState({
        audioInput: '',
        audioOutput: '',
        videoInput: '',
    });

    const [audioSettings, setAudioSettings] = useState({
        echoCancellation: true,
        noiseSuppression: true,
        noiseSuppressionLevel: 'medium', // 🔥 Varsayılan: medium (daha güvenli)
        useAdvancedFilters: false, // 🔥 YENİ: Gelişmiş filtreler varsayılan KAPALI
        autoGainControl: true,
        volume: 100,
    });

    const [videoSettings, setVideoSettings] = useState({
        resolution: '720p',
        frameRate: 30,
    });

    const [testAudio, setTestAudio] = useState(null);

    useEffect(() => {
        if (isOpen) {
            loadDevices();
            loadSavedSettings();
        }
    }, [isOpen]);

    // 🔥 OTOMATİK KAYDETME - Her değişiklikte anında kaydet
    useEffect(() => {
        if (isOpen) {
            saveSettings();
        }
    }, [selectedDevices, audioSettings, videoSettings]);

    const loadDevices = async () => {
        try {
            const deviceList = await navigator.mediaDevices.enumerateDevices();

            setDevices({
                audioInputs: deviceList.filter(d => d.kind === 'audioinput'),
                audioOutputs: deviceList.filter(d => d.kind === 'audiooutput'),
                videoInputs: deviceList.filter(d => d.kind === 'videoinput'),
            });
        } catch (err) {
            console.error('Cihaz listesi alınamadı:', err);
        }
    };

    const loadSavedSettings = () => {
        const saved = JSON.parse(localStorage.getItem('voice_settings') || '{}');

        if (saved.devices) {
            setSelectedDevices(saved.devices);
        }
        if (saved.audio) {
            setAudioSettings(saved.audio);
        }
        if (saved.video) {
            setVideoSettings(saved.video);
        }
    };

    const saveSettings = () => {
        localStorage.setItem('voice_settings', JSON.stringify({
            devices: selectedDevices,
            audio: audioSettings,
            video: videoSettings,
        }));
    };

    const handleDeviceChange = (type, deviceId) => {
        setSelectedDevices(prev => ({ ...prev, [type]: deviceId }));
    };

    const handleAudioSettingChange = (setting, value) => {
        setAudioSettings(prev => ({ ...prev, [setting]: value }));
    };

    const handleVideoSettingChange = (setting, value) => {
        setVideoSettings(prev => ({ ...prev, [setting]: value }));
    };

    const testMicrophone = async () => {
        if (testAudio) {
            testAudio.getTracks().forEach(track => track.stop());
            setTestAudio(null);
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: selectedDevices.audioInput ? { exact: selectedDevices.audioInput } : undefined,
                    echoCancellation: audioSettings.echoCancellation,
                    noiseSuppression: audioSettings.noiseSuppression,
                    autoGainControl: audioSettings.autoGainControl,
                }
            });

            setTestAudio(stream);

            // Audio visualizer eklenebilir
            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            source.connect(analyser);

            // Volume meter animation
            // ... (opsiyonel)

        } catch (err) {
            console.error('Mikrofon testi başarısız:', err);
            toast.error('❌ Mikrofon erişimi reddedildi!');
        }
    };

    // 🔥 Artık kaydet butonu yok, otomatik kaydediliyor
    const handleClose = () => {
        if (testAudio) {
            testAudio.getTracks().forEach(track => track.stop());
            setTestAudio(null);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={handleClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2>Ses & Video Ayarları</h2>
                    <button onClick={handleClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {/* Mikrofon Seçimi */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <FaMicrophone />
                            <h3>Mikrofon</h3>
                        </div>
                        <select
                            value={selectedDevices.audioInput}
                            onChange={(e) => handleDeviceChange('audioInput', e.target.value)}
                            style={styles.select}
                        >
                            <option value="">Varsayılan</option>
                            {devices.audioInputs.map(device => (
                                <option key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Mikrofon ${device.deviceId.substring(0, 8)}`}
                                </option>
                            ))}
                        </select>
                        <button onClick={testMicrophone} style={styles.testButton}>
                            {testAudio ? 'Testi Durdur' : 'Mikrofonu Test Et'}
                        </button>
                    </div>

                    {/* Hoparlör Seçimi */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <FaHeadphones />
                            <h3>Hoparlör</h3>
                        </div>
                        <select
                            value={selectedDevices.audioOutput}
                            onChange={(e) => handleDeviceChange('audioOutput', e.target.value)}
                            style={styles.select}
                        >
                            <option value="">Varsayılan</option>
                            {devices.audioOutputs.map(device => (
                                <option key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Hoparlör ${device.deviceId.substring(0, 8)}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Kamera Seçimi */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <FaVideo />
                            <h3>Kamera</h3>
                        </div>
                        <select
                            value={selectedDevices.videoInput}
                            onChange={(e) => handleDeviceChange('videoInput', e.target.value)}
                            style={styles.select}
                        >
                            <option value="">Varsayılan</option>
                            {devices.videoInputs.map(device => (
                                <option key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Kamera ${device.deviceId.substring(0, 8)}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ses Ayarları */}
                    <div style={styles.section}>
                        <h3>Ses İyileştirmeleri</h3>

                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={audioSettings.echoCancellation}
                                onChange={(e) => handleAudioSettingChange('echoCancellation', e.target.checked)}
                            />
                            <span>Yankı Önleme</span>
                        </label>

                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={audioSettings.noiseSuppression}
                                onChange={(e) => handleAudioSettingChange('noiseSuppression', e.target.checked)}
                            />
                            <span>Gürültü Azaltma</span>
                        </label>

                        {/* 🔥 YENİ: Gürültü Engelleme Seviyesi */}
                        {audioSettings.noiseSuppression && (
                            <div style={{ marginLeft: '28px', marginTop: '8px', marginBottom: '12px' }}>
                                <label style={{ fontSize: '13px', color: '#b9bbbe', marginBottom: '4px', display: 'block' }}>
                                    Gürültü Engelleme Seviyesi: <strong style={{ color: '#00b894' }}>{{
                                        'low': 'Düşük',
                                        'medium': 'Orta',
                                        'high': 'Yüksek',
                                        'aggressive': 'Agresif'
                                    }[audioSettings.noiseSuppressionLevel]}</strong>
                                </label>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    {['low', 'medium', 'high', 'aggressive'].map(level => (
                                        <button
                                            key={level}
                                            onClick={() => handleAudioSettingChange('noiseSuppressionLevel', level)}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '4px',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                                fontWeight: audioSettings.noiseSuppressionLevel === level ? 'bold' : 'normal',
                                                backgroundColor: audioSettings.noiseSuppressionLevel === level ? '#5865f2' : '#40444b',
                                                color: '#fff',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {{
                                                'low': '🔈 Düşük',
                                                'medium': '🔉 Orta',
                                                'high': '🔊 Yüksek',
                                                'aggressive': '🚫 Agresif'
                                            }[level]}
                                        </button>
                                    ))}
                                </div>
                                <p style={{ fontSize: '11px', color: '#72767d', marginTop: '6px' }}>
                                    💡 Zırıltı sorunu için "Agresif" seviyeyi deneyin
                                </p>
                            </div>
                        )}

                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={audioSettings.autoGainControl}
                                onChange={(e) => handleAudioSettingChange('autoGainControl', e.target.checked)}
                            />
                            <span>Otomatik Ses Seviyesi</span>
                        </label>

                        {/* 🔥 YENİ: Gelişmiş Filtreler Toggle */}
                        <label style={{ ...styles.checkboxLabel, marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #40444b' }}>
                            <input
                                type="checkbox"
                                checked={audioSettings.useAdvancedFilters}
                                onChange={(e) => handleAudioSettingChange('useAdvancedFilters', e.target.checked)}
                            />
                            <span>🔬 Gelişmiş Ses Filtreleri</span>
                        </label>
                        <p style={{ fontSize: '11px', color: '#72767d', marginLeft: '28px', marginTop: '4px' }}>
                            ⚠️ Bu özellik ses kalitesini artırabilir ama bazı sistemlerde sorun çıkarabilir.
                            <br />Sesiniz karşı tarafa gitmiyorsa bu seçeneği <strong>kapatın</strong>.
                        </p>

                        <div style={styles.sliderContainer}>
                            <label>Ses Seviyesi: {audioSettings.volume}%</label>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={audioSettings.volume}
                                onChange={(e) => handleAudioSettingChange('volume', parseInt(e.target.value))}
                                style={styles.slider}
                            />
                        </div>
                    </div>

                    {/* Video Ayarları */}
                    <div style={styles.section}>
                        <h3>Video Kalitesi</h3>

                        <div style={styles.settingRow}>
                            <label>Çözünürlük:</label>
                            <select
                                value={videoSettings.resolution}
                                onChange={(e) => handleVideoSettingChange('resolution', e.target.value)}
                                style={styles.select}
                            >
                                <option value="480p">480p</option>
                                <option value="720p">720p (HD)</option>
                                <option value="1080p">1080p (Full HD)</option>
                            </select>
                        </div>

                        <div style={styles.settingRow}>
                            <label>FPS:</label>
                            <select
                                value={videoSettings.frameRate}
                                onChange={(e) => handleVideoSettingChange('frameRate', parseInt(e.target.value))}
                                style={styles.select}
                            >
                                <option value="15">15 FPS</option>
                                <option value="30">30 FPS</option>
                                <option value="60">60 FPS</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={styles.footer}>
                    <span style={{ color: '#43b581', fontSize: '14px' }}>✓ Değişiklikler otomatik kaydediliyor</span>
                    <button onClick={handleClose} style={styles.saveButton}>Tamam</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
    },
    modal: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #202225',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '24px',
        cursor: 'pointer',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    section: {
        marginBottom: '30px',
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '15px',
        color: '#fff',
    },
    select: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#202225',
        border: '1px solid #202225',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        marginBottom: '10px',
    },
    testButton: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 0',
        color: '#dcddde',
        cursor: 'pointer',
    },
    sliderContainer: {
        marginTop: '15px',
    },
    slider: {
        width: '100%',
        marginTop: '8px',
    },
    settingRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        color: '#dcddde',
    },
    footer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        padding: '20px',
        borderTop: '1px solid #202225',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: '#4f545c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    saveButton: {
        padding: '10px 20px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default VoiceSettingsModal;



