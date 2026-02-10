import React, { useState, useEffect } from 'react';
import './VoiceSettings.css';
import { FaMicrophone, FaTimes, FaHeadphones, FaVolumeUp, FaVideo, FaCog, FaExclamationTriangle } from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const VoiceSettings = ({ userId, onClose }) => {
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

    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem('access_token');
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
    };

    const fetchDevices = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            const allDevices = await navigator.mediaDevices.enumerateDevices();

            setDevices({
                input: allDevices.filter(d => d.kind === 'audioinput'),
                output: allDevices.filter(d => d.kind === 'audiooutput'),
                video: allDevices.filter(d => d.kind === 'videoinput')
            });

            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            console.error('Device enumeration error:', error);
        }
    };

    const fetchSettings = async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/voice/${userId}/settings/`);
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
            console.error('Settings fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/voice/${userId}/settings/update/`, {
                method: 'PUT',
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
            showToast('Voice settings updated!');
        } catch (error) {
            console.error('Settings update error:', error);
            showToast('Failed to update settings', 'error');
        }
    };

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
            console.error('Microphone test error:', error);
            showToast('Failed to test microphone', 'error');
            setTesting(false);
        }
    };

    const stopTesting = () => {
        setTesting(false);
        setInputLevel(0);
    };

    const resetToDefaults = async () => {
        if (!await confirmDialog('Are you sure you want to reset all voice settings to defaults?')) return;

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

            showToast('Settings reset to defaults!');
        } catch (error) {
            console.error('Reset error:', error);
            showToast('Failed to reset settings', 'error');
        }
    };

    const showToast = (message, type = 'success') => {
    };

    if (loading) {
        return (
            <div className="voice-settings-overlay">
                <div className="voice-settings-panel loading">
                    <div className="spinner" />
                    <p>Loading Voice Settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="voice-settings-overlay">
            <div className="voice-settings-panel">
                <div className="panel-header">
                    <h2><FaMicrophone /> Voice & Video Settings</h2>
                    <button onClick={onClose} className="btn-close">
                        <FaTimes />
                    </button>
                </div>

                <div className="settings-content">
                    {/* Input Device */}
                    <div className="setting-section">
                        <h3><FaMicrophone /> Input Device</h3>

                        <div className="form-group">
                            <label>Microphone</label>
                            <select value={selectedInput} onChange={(e) => setSelectedInput(e.target.value)}>
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
                                onClick={testing ? stopTesting : testMicrophone}
                                className={`btn-test ${testing ? 'active' : ''}`}
                            >
                                {testing ? 'Stop Testing' : 'Test Microphone'}
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
                            <select value={selectedOutput} onChange={(e) => setSelectedOutput(e.target.value)}>
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
                            <label>Camera</label>
                            <select value={selectedVideo} onChange={(e) => setSelectedVideo(e.target.value)}>
                                <option value="">No Camera</option>
                                {devices.video.map(device => (
                                    <option key={device.deviceId} value={device.deviceId}>
                                        {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="video-settings-grid">
                            <div className="form-group">
                                <label>Video Quality</label>
                                <select value={videoQuality} onChange={(e) => setVideoQuality(e.target.value)}>
                                    <option value="480p">480p</option>
                                    <option value="720p">720p (HD)</option>
                                    <option value="1080p">1080p (Full HD)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Frame Rate</label>
                                <select value={frameRate} onChange={(e) => setFrameRate(Number(e.target.value))}>
                                    <option value={15}>15 FPS</option>
                                    <option value={30}>30 FPS</option>
                                    <option value={60}>60 FPS</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Audio Processing */}
                    <div className="setting-section">
                        <h3><FaCog /> Audio Processing</h3>

                        <div className="toggle-group">
                            <div className="toggle-item">
                                <div>
                                    <h4>Noise Suppression</h4>
                                    <p>Reduce background noise</p>
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

                            {/* 🔥 YENİ: Gürültü Engelleme Seviyesi */}
                            {noiseSupression && (
                                <div className="form-group" style={{ marginLeft: '20px', marginTop: '10px' }}>
                                    <label>Noise Suppression Level</label>
                                    <select
                                        value={localStorage.getItem('pawscord_noise_level') || 'medium'}
                                        onChange={(e) => {
                                            localStorage.setItem('pawscord_noise_level', e.target.value);
                                            // voice_settings içine de kaydet
                                            const vs = JSON.parse(localStorage.getItem('voice_settings') || '{}');
                                            vs.audio = vs.audio || {};
                                            vs.audio.noiseSuppressionLevel = e.target.value;
                                            localStorage.setItem('voice_settings', JSON.stringify(vs));
                                        }}
                                        style={{ width: '100%', padding: '8px', borderRadius: '6px', background: '#2f3136', color: '#fff', border: '1px solid #40444b' }}
                                    >
                                        <option value="low">Low (Best Voice Quality)</option>
                                        <option value="medium">Medium (Balanced)</option>
                                        <option value="high">High (More Noise Reduction)</option>
                                        <option value="aggressive">Aggressive (Maximum Noise Reduction)</option>
                                    </select>
                                    <small style={{ color: '#72767d', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                                        💡 If you hear crackling, try "Low" or "Medium"
                                    </small>
                                </div>
                            )}

                            <div className="toggle-item">
                                <div>
                                    <h4>Echo Cancellation</h4>
                                    <p>Prevent audio feedback</p>
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
                                    <h4>Automatic Gain Control</h4>
                                    <p>Automatically adjust volume</p>
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
                    </div>

                    {/* Warning */}
                    {devices.input.length === 0 && (
                        <div className="warning-box">
                            <FaExclamationTriangle />
                            <div>
                                <h4>No Microphone Detected</h4>
                                <p>Please connect a microphone to use voice features</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="settings-actions">
                    <button onClick={resetToDefaults} className="btn-reset">
                        Reset to Defaults
                    </button>
                    <button onClick={updateSettings} className="btn-save">
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoiceSettings;
