/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './VoiceSettings.css';
import { FaMicrophone, FaTimes, FaHeadphones, FaVolumeUp, FaVideo, FaCog, FaExclamationTriangle } from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';


// -- extracted inline style constants --


const VoiceSettings = ({ userId, onClose }) => {
    const { t } = useTranslation();
    const [devices, setDevices] = useState({ input: [], output: [], video: [] });
    const [selectedInput, setSelectedInput] = useState('');
    const [selectedOutput, setSelectedOutput] = useState('');
    const [selectedVideo, setSelectedVideo] = useState('');
    const [inputVolume, setInputVolume] = useState(100);
    const [outputVolume, setOutputVolume] = useState(100);
    const [noiseSupression, setNoiseSupression] = useState(true);
    const [echoCancellation, setEchoCancellation] = useState(true);
    const [autoGainControl, setAutoGainControl] = useState(true);
    const [videoQuality, setVideoQuality] = useState('720p');
    const [frameRate, setFrameRate] = useState(30);
    const [testing, setTesting] = useState(false);
    const [inputLevel, setInputLevel] = useState(0);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDevices();
        fetchSettings();
    }, [userId]);

    const fetchWithAuth = useCallback(async (url, options = {}) => {
        const token = getToken();
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    }, []);

    const fetchDevices = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            const allDevices = await navigator.mediaDevices.enumerateDevices();

            setDevices({
                input: allDevices.filter(d => d.kind === 'sesinput'),
                output: allDevices.filter(d => d.kind === 'sesoutput'),
                video: allDevices.filter(d => d.kind === 'videoinput')
            });

            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            logger.error('Device enumeration error:', error);
        }
    }, []);

    const fetchSettings = useCallback(async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/api/voice/${userId}/settings/`);
            setSettings(data);
            setSelectedInput(data.input_device || '');
            setSelectedOutput(data.output_device || '');
            setSelectedVideo(data.video_device || '');
            setInputVolume(data.input_volume || 100);
            setOutputVolume(data.output_volume || 100);
            setNoiseSupression(data.noise_suppression !== false);
            setEchoCancellation(data.echo_cancellation !== false);
            setAutoGainControl(data.auto_gain_control !== false);
            setVideoQuality(data.video_quality || '720p');
            setFrameRate(data.frame_rate || 30);
        } catch (error) {
            logger.error('Settings fetch error:', error);
        } finally {
            setLoading(false);
        }
    }, [userId, fetchWithAuth]);

    const updateSettings = useCallback(async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/api/voice/${userId}/settings/update/`, {
                method: 'POST',
                body: JSON.stringify({
                    input_device: selectedInput,
                    output_device: selectedOutput,
                    video_device: selectedVideo,
                    input_volume: inputVolume,
                    output_volume: outputVolume,
                    noise_suppression: noiseSupression,
                    echo_cancellation: echoCancellation,
                    auto_gain_control: autoGainControl,
                    video_quality: videoQuality,
                    frame_rate: frameRate
                })
            });
            showToast('Ses ayarları güncellendi!');
        } catch (error) {
            logger.error('Settings update error:', error);
            showToast('Ayarlar güncellenemedi', 'error');
        }
    }, [userId, selectedInput, selectedOutput, selectedVideo, inputVolume, outputVolume, noiseSupression, echoCancellation, autoGainControl, videoQuality, frameRate, fetchWithAuth]);

    const testMicrophone = async () => {
        setTesting(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: selectedInput ? { exact: selectedInput } : undefined,
                    echoCancellation,
                    noiseSuppression: noiseSupression,
                    autoGainControl
                }
            });

            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 256;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateLevel = () => {
                if (!testing) {
                    stream.getTracks().forEach(track => track.stop());
                    audioContext.close();
                    return;
                }

                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / bufferLength;
                setInputLevel(Math.min(100, (average / 255) * 100 * (inputVolume / 100)));
                requestAnimationFrame(updateLevel);
            };

            updateLevel();
        } catch (error) {
            logger.error('Microphone test error:', error);
            showToast('Mikrofon test edilemedi', 'error');
            setTesting(false);
        }
    };

    const stopTesting = useCallback(() => {
        setTesting(false);
        setInputLevel(0);
    }, []);

    const resetToDefaults = async () => {
        if (!await confirmDialog(t('voice.resetConfirm', 'Reset all audio settings to defaults?'))) return;

        try {
            const data = await fetchWithAuth(`${getApiBase()}/voice/${userId}/reset/`, {
                method: 'POST'
            });

            setSelectedInput('');
            setSelectedOutput('');
            setSelectedVideo('');
            setInputVolume(100);
            setOutputVolume(100);
            setNoiseSupression(true);
            setEchoCancellation(true);
            setAutoGainControl(true);
            setVideoQuality('720p');
            setFrameRate(30);

            showToast('Ayarlar varsayılana sıfırlandı!');
        } catch (error) {
            logger.error('Reset error:', error);
            showToast('Ayarlar sıfırlanamadı', 'error');
        }
    };

    const showToast = (message, type = 'success') => {
    };

    if (loading) {
        return (
            <div className="voice-settings-overlay">
                <div className="voice-settings-panel loading">
                    <div className="spinner" />
                    <p>{t('voice.loading', 'Loading Voice Settings...')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="voice-settings-overlay">
            <div className="voice-settings-panel">
                <div className="panel-header">
                    <h2><FaMicrophone /> Voice & Video Settings</h2>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} className="btn-close">
                        <FaTimes />
                    </button>
                </div>

                <div className="settings-content">
                    {/* Input Device */}
                    <div className="setting-section">
                        <h3><FaMicrophone /> Input Device</h3>

                        <div className="form-group">
                            <label>Mikrofon</label>
                            <select value={selectedInput} onChange={(e) => setSelectedInput(e.target.value)}
                                <option value="">Default</option>
                            {devices.input.map(device => (
                                <option key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Microphone ${device.deviceId.slice(0, 8)}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Input Volume: {inputVolume}%</label>
                        <input
                            type="range"
                            min="0"
                            max="200"
                            value={inputVolume}
                            onChange={(e) => setInputVolume(Number(e.target.value))}
                            className="volume-slider"
                        />
                    </div>

                    <div className="mic-test">
                        <button
                            aria-label={testing ? t('voiceSettings.stopMicTest', 'Stop microphone test') : t('voiceSettings.testMic', 'Test microphone')}
                            onClick={testing ? stopTesting : testMicrophone}
                            className={`btn-test ${testing ? 'active' : ''}`}>
                            {testing ? 'Testi Durdur' : 'Mikrofonu Test Et'}
                        </button>
                        <div className="level-meter">
                            <div className="level-fill" style={{ width: `${inputLevel}%` }} />
                        </div>
                    </div>
                </div>

                {/* Output Device */}
                <div className="setting-section">
                    <h3><FaHeadphones /> Output Device</h3>

                    <div className="form-group">
                        <label>Speakers/Headphones</label>
                        <select value={selectedOutput} onChange={(e) => setSelectedOutput(e.target.value)}
                                <option value="">Default</option>
                        {devices.output.map(device => (
                            <option key={device.deviceId} value={device.deviceId}>
                                {device.label || `Speaker ${device.deviceId.slice(0, 8)}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Output Volume: {outputVolume}%</label>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={outputVolume}
                        onChange={(e) => setOutputVolume(Number(e.target.value))}
                        className="volume-slider"
                    />
                </div>
            </div>

            {/* Video Device */}
            <div className="setting-section">
                <h3><FaVideo /> Video Device</h3>

                <div className="form-group">
                    <label>Kamera</label>
                    <select value={selectedVideo} onChange={(e) => setSelectedVideo(e.target.value)}
                                <option value="">Kamera Yok</option>
                    {devices.video.map(device => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
                        </option>
                    ))}
                </select>
            </div>

            <div className="video-settings-grid">
                <div className="form-group">
                    <label>Video Kalitesi</label>
                    <select value={videoQuality} onChange={(e) => setVideoQuality(e.target.value)}
                                    <option value="480p">480p</option>
                    <option value="720p">720p (HD)</option>
                    <option value="1080p">1080p (Full HD)</option>
                </select>
            </div>

            <div className="form-group">
                <label>{t('voice.frameRate', 'Frame Rate')}</label>
                <select value={frameRate} onChange={(e) => setFrameRate(Number(e.target.value))}
                                    <option value={15}>15 FPS</option>
                <option value={30}>30 FPS</option>
                <option value={60}>60 FPS</option>
            </select>
        </div>
                        </div >
                    </div >

    {/* Audio Processing */ }
    < div className = "setting-section" >
                        <h3><FaCog /> Audio Processing</h3>

                        <div className="toggle-group">
                            <div className="toggle-item">
                                <div>
                                    <h4>{t('voice.noiseSuppTitle', 'Noise Suppression')}</h4>
                                    <p>{t('voice.noiseSuppDesc', 'Reduce background noise')}</p>
                                </div>
                                <label className="toggle">
                                    <input
                                        type="checkbox"
                                        checked={noiseSupression}
                                        onChange={(e) => setNoiseSupression(e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            {/* 🔥 YENİ: Gürültü Blockme Seviyesi */}
                            {noiseSupression && (
                                <div className="form-group">
                                    <label>{t('voice.noiseBlockLevel', 'Noise Suppression Level')}</label>
                                    <select
                                        value={localStorage.getItem('pawscord_noise_level') || 'medium'}
                                        onChange={(e) => {
                                            localStorage.setItem('pawscord_noise_level', e.target.value);
                                            // voice_settings fore de save
                                            const vs = JSON.parse(localStorage.getItem('voice_settings') || '{}');
                                            vs.audio = vs.audio || {};
                                            vs.audio.noiseSuppressionLevel = e.target.value;
                                            localStorage.setItem('voice_settings', JSON.stringify(vs));
                                        }}>
                                        <option value="low">{t('voice.noiseLow', 'Low (Best Audio Quality)')}</option>
                                        <option value="medium">Orta (Dengeli)</option>
                                        <option value="high">{t('voice.noiseHigh', 'High (More Noise Reduction)')}</option>
                                        <option value="aggressive">{t('voice.noiseAggressive', 'Aggressive (Maximum Noise Reduction)')}</option>
                                    </select>
                                    <small>
                                        💡 If you hear crackling, try "Low" or "Medium"
                                    </small>
                                </div>
                            )}

                            <div className="toggle-item">
                                <div>
                                    <h4>{t('voice.echoCancelTitle', '🔇 Echo Cancellation')}</h4>
                                    <p>{t('voice.echoCancelDesc', 'Prevent audio feedback')}</p>
                                </div>
                                <label className="toggle">
                                    <input
                                        type="checkbox"
                                        checked={echoCancellation}
                                        onChange={(e) => setEchoCancellation(e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="toggle-item">
                                <div>
                                    <h4>{t('voice.autoGainTitle', '📊 Auto Gain Control')}</h4>
                                    <p>Ses seviyesini otomatik olarak ayarla</p>
                                </div>
                                <label className="toggle">
                                    <input
                                        type="checkbox"
                                        checked={autoGainControl}
                                        onChange={(e) => setAutoGainControl(e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div >

    {/* Warning */ }
{
    devices.input.length === 0 && (
        <div className="warning-box">
            <FaExclamationTriangle />
            <div>
                <h4>{t('voice.noMicTitle', '🎤 Microphone Not Found')}</h4>
                <p>{t('voice.noMicDesc', 'Connect a microphone to use audio features')}</p>
            </div>
        </div>
    )
}
                </div >

    <div className="settings-actions">
        <button
            aria-label={t('voiceSettings.resetDefaults', 'Reset to defaults')} onClick={resetToDefaults} className="btn-reset">
            {t('voice.resetToDefault', 'Reset to Default')}
        </button>
        <button
            aria-label={t('voiceSettings.saveSettings', 'Save settings')} onClick={updateSettings} className="btn-save">
            {t('voice.saveSettings', 'Save Settings')}
        </button>
    </div>
            </div >
        </div >
    );
};

VoiceSettings.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
};
export default memo(VoiceSettings);
