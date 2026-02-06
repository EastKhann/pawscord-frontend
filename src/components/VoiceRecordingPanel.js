import React, { useState, useEffect, useRef } from 'react';
import {
    FaMicrophone, FaTimes, FaPlay, FaPause, FaStop, FaDownload,
    FaTrash, FaShare, FaVolumeUp, FaClock, FaUser, FaHashtag,
    FaFileAudio, FaCircle, FaCog, FaHistory, FaCloud, FaSave,
    FaMicrophoneSlash, FaHeadphones, FaWaveSquare, FaCheck
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import './VoiceRecordingPanel.css';

const VoiceRecordingPanel = ({ serverId, channelId, channelName, onClose }) => {
    const [activeTab, setActiveTab] = useState('record');
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordings, setRecordings] = useState([]);
    const [currentRecording, setCurrentRecording] = useState(null);
    const [playingId, setPlayingId] = useState(null);
    const [settings, setSettings] = useState({
        quality: 'high',
        format: 'mp3',
        auto_transcribe: true,
        save_to_cloud: true,
        noise_suppression: true
    });
    const [audioLevel, setAudioLevel] = useState(0);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchRecordings();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, [serverId, channelId]);

    const fetchRecordings = async () => {
        try {
            const response = await fetch(`${getApiBase()}/api/channels/${channelId}/recordings/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setRecordings(data.recordings || []);
            } else {
                setRecordings([]);
            }
        } catch (error) {
            console.error('Error fetching recordings:', error);
            setRecordings([]);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: settings.noise_suppression,
                    autoGainControl: true
                }
            });

            // Setup audio analyzer
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            analyserRef.current.fftSize = 256;

            // Start monitoring audio level
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            const checkLevel = () => {
                if (isRecording) {
                    analyserRef.current.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    setAudioLevel(average);
                    requestAnimationFrame(checkLevel);
                }
            };

            const mimeType = settings.format === 'webm' ? 'audio/webm' : 'audio/mp3';
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setCurrentRecording({
                    blob: audioBlob,
                    url: audioUrl,
                    duration: recordingTime
                });
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start(1000);
            setIsRecording(true);
            setRecordingTime(0);

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

            checkLevel();
            toast.success('Kayıt başladı');
        } catch (error) {
            console.error('Recording error:', error);
            toast.error('Mikrofon erişimi reddedildi');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPaused(false);
            if (timerRef.current) clearInterval(timerRef.current);
            if (audioContextRef.current) audioContextRef.current.close();
            setAudioLevel(0);
            toast.info('Kayıt durduruldu');
        }
    };

    const pauseRecording = () => {
        if (mediaRecorderRef.current) {
            if (isPaused) {
                mediaRecorderRef.current.resume();
                timerRef.current = setInterval(() => {
                    setRecordingTime(prev => prev + 1);
                }, 1000);
            } else {
                mediaRecorderRef.current.pause();
                clearInterval(timerRef.current);
            }
            setIsPaused(!isPaused);
        }
    };

    const saveRecording = async (name) => {
        if (!currentRecording) return;

        const formData = new FormData();
        formData.append('audio', currentRecording.blob, `recording.webm`);
        formData.append('name', name);
        formData.append('duration', currentRecording.duration);
        formData.append('auto_transcribe', settings.auto_transcribe);

        try {
            const response = await fetch(`${getApiBase()}/api/channels/${channelId}/recordings/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                toast.success('Kayıt kaydedildi');
                fetchRecordings();
            } else {
                toast.error('Kayıt kaydedilemedi');
            }
        } catch (error) {
            console.error('Error saving recording:', error);
            toast.error('Kayıt kaydedilemedi');
        }
        setCurrentRecording(null);
    };

    const deleteRecording = async (recordingId) => {
        if (!window.confirm('Bu kaydı silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`${getApiBase()}/api/channels/${channelId}/recordings/${recordingId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setRecordings(recordings.filter(r => r.id !== recordingId));
                toast.success('Kayıt silindi');
            } else {
                toast.error('Kayıt silinemedi');
            }
        } catch (error) {
            console.error('Error deleting recording:', error);
            toast.error('Kayıt silinemedi');
        }
    };

    const downloadRecording = async (recording) => {
        try {
            const response = await fetch(`${getApiBase()}/api/channels/${channelId}/recordings/${recording.id}/download/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${recording.name}.${settings.format}`;
                a.click();
            } else {
                toast.error('İndirme başarısız');
            }
        } catch (error) {
            console.error('Error downloading recording:', error);
            toast.error('İndirme başarısız');
        }
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatDuration = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hrs > 0) return `${hrs}sa ${mins}dk`;
        return `${mins}dk`;
    };

    return (
        <div className="voice-recording-overlay" onClick={(e) => e.target.className === 'voice-recording-overlay' && onClose()}>
            <div className="voice-recording-panel">
                <div className="panel-header">
                    <h2><FaMicrophone /> Ses Kaydı</h2>
                    <div className="channel-info">
                        <FaHashtag /> {channelName || 'Sesli Kanal'}
                    </div>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="tabs">
                    <button className={`tab ${activeTab === 'record' ? 'active' : ''}`} onClick={() => setActiveTab('record')}>
                        <FaMicrophone /> Kayıt
                    </button>
                    <button className={`tab ${activeTab === 'recordings' ? 'active' : ''}`} onClick={() => setActiveTab('recordings')}>
                        <FaHistory /> Kayıtlar ({recordings.length})
                    </button>
                    <button className={`tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                        <FaCog /> Ayarlar
                    </button>
                </div>

                <div className="panel-content">
                    {activeTab === 'record' && (
                        <RecordView
                            isRecording={isRecording}
                            isPaused={isPaused}
                            recordingTime={recordingTime}
                            audioLevel={audioLevel}
                            currentRecording={currentRecording}
                            onStart={startRecording}
                            onStop={stopRecording}
                            onPause={pauseRecording}
                            onSave={saveRecording}
                            onDiscard={() => setCurrentRecording(null)}
                            formatTime={formatTime}
                        />
                    )}

                    {activeTab === 'recordings' && (
                        <RecordingsView
                            recordings={recordings}
                            playingId={playingId}
                            setPlayingId={setPlayingId}
                            onDownload={downloadRecording}
                            onDelete={deleteRecording}
                            formatDuration={formatDuration}
                        />
                    )}

                    {activeTab === 'settings' && (
                        <SettingsView settings={settings} setSettings={setSettings} />
                    )}
                </div>
            </div>
        </div>
    );
};

const RecordView = ({
    isRecording, isPaused, recordingTime, audioLevel, currentRecording,
    onStart, onStop, onPause, onSave, onDiscard, formatTime
}) => {
    const [saveName, setSaveName] = useState('');
    const [showSaveModal, setShowSaveModal] = useState(false);

    const handleSave = () => {
        if (!saveName.trim()) {
            toast.error('Kayıt adı gerekli');
            return;
        }
        onSave(saveName);
        setShowSaveModal(false);
        setSaveName('');
    };

    return (
        <div className="record-view">
            {!currentRecording ? (
                <>
                    <div className="recording-visualizer">
                        <div className="waveform">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`bar ${isRecording ? 'active' : ''}`}
                                    style={{
                                        height: isRecording ? `${Math.random() * audioLevel + 10}%` : '10%',
                                        animationDelay: `${i * 0.05}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="recording-timer">
                        <FaCircle className={`recording-indicator ${isRecording && !isPaused ? 'active' : ''}`} />
                        <span className="time">{formatTime(recordingTime)}</span>
                    </div>

                    <div className="recording-controls">
                        {!isRecording ? (
                            <button className="record-btn" onClick={onStart}>
                                <FaMicrophone />
                                <span>Kayda Başla</span>
                            </button>
                        ) : (
                            <>
                                <button className="control-btn pause" onClick={onPause}>
                                    {isPaused ? <FaPlay /> : <FaPause />}
                                </button>
                                <button className="control-btn stop" onClick={onStop}>
                                    <FaStop />
                                </button>
                            </>
                        )}
                    </div>

                    {isRecording && (
                        <div className="recording-tips">
                            <p>🎤 Kayıt devam ediyor...</p>
                            <p>Durdurmak için STOP butonuna basın</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="recording-preview">
                    <div className="preview-icon">
                        <FaFileAudio />
                    </div>
                    <h3>Kayıt Tamamlandı</h3>
                    <p>Süre: {formatTime(currentRecording.duration)}</p>

                    <audio src={currentRecording.url} controls className="audio-preview" />

                    <div className="preview-actions">
                        <button className="discard-btn" onClick={onDiscard}>
                            <FaTrash /> İptal
                        </button>
                        <button className="save-btn" onClick={() => setShowSaveModal(true)}>
                            <FaSave /> Kaydet
                        </button>
                    </div>
                </div>
            )}

            {showSaveModal && (
                <div className="save-modal-overlay" onClick={(e) => e.target.className === 'save-modal-overlay' && setShowSaveModal(false)}>
                    <div className="save-modal">
                        <h3>Kaydı Kaydet</h3>
                        <input
                            type="text"
                            placeholder="Kayıt adı..."
                            value={saveName}
                            onChange={(e) => setSaveName(e.target.value)}
                            autoFocus
                        />
                        <div className="modal-actions">
                            <button onClick={() => setShowSaveModal(false)}>İptal</button>
                            <button className="primary" onClick={handleSave}>Kaydet</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const RecordingsView = ({ recordings, playingId, setPlayingId, onDownload, onDelete, formatDuration }) => {
    const audioRef = useRef(null);

    const handlePlay = (recording) => {
        if (playingId === recording.id) {
            setPlayingId(null);
            if (audioRef.current) audioRef.current.pause();
        } else {
            setPlayingId(recording.id);
            // Audio playback is handled by the audio element with recording.url
        }
    };

    if (recordings.length === 0) {
        return (
            <div className="empty-state">
                <FaMicrophoneSlash />
                <p>Henüz kayıt yok</p>
            </div>
        );
    }

    return (
        <div className="recordings-view">
            <div className="recordings-list">
                {recordings.map(recording => (
                    <div key={recording.id} className="recording-item">
                        <div className="recording-icon">
                            <FaFileAudio />
                        </div>
                        <div className="recording-info">
                            <h4>{recording.name}</h4>
                            <div className="recording-meta">
                                <span><FaClock /> {formatDuration(recording.duration)}</span>
                                <span><FaCloud /> {recording.size}</span>
                                <span><FaUser /> {recording.creator}</span>
                            </div>
                            <span className="recording-date">
                                {new Date(recording.created_at).toLocaleDateString('tr-TR')}
                            </span>
                        </div>
                        {recording.has_transcript && (
                            <span className="transcript-badge" title="Transkript mevcut">
                                <FaCheck /> Transkript
                            </span>
                        )}
                        <div className="recording-actions">
                            <button onClick={() => handlePlay(recording)} title="Oynat">
                                {playingId === recording.id ? <FaPause /> : <FaPlay />}
                            </button>
                            <button onClick={() => onDownload(recording)} title="İndir">
                                <FaDownload />
                            </button>
                            <button onClick={() => onDelete(recording.id)} className="delete" title="Sil">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SettingsView = ({ settings, setSettings }) => {
    return (
        <div className="settings-view">
            <div className="setting-group">
                <label>Kayıt Kalitesi</label>
                <select value={settings.quality} onChange={(e) => setSettings({ ...settings, quality: e.target.value })}>
                    <option value="low">Düşük (64 kbps)</option>
                    <option value="medium">Orta (128 kbps)</option>
                    <option value="high">Yüksek (256 kbps)</option>
                    <option value="lossless">Kayıpsız (FLAC)</option>
                </select>
            </div>

            <div className="setting-group">
                <label>Format</label>
                <select value={settings.format} onChange={(e) => setSettings({ ...settings, format: e.target.value })}>
                    <option value="mp3">MP3</option>
                    <option value="webm">WebM</option>
                    <option value="wav">WAV</option>
                    <option value="ogg">OGG</option>
                </select>
            </div>

            <div className="setting-group toggle">
                <div className="toggle-info">
                    <label>Otomatik Transkript</label>
                    <span>Kaydı metne dönüştür</span>
                </div>
                <button
                    className={`toggle-btn ${settings.auto_transcribe ? 'active' : ''}`}
                    onClick={() => setSettings({ ...settings, auto_transcribe: !settings.auto_transcribe })}
                >
                    <span className="toggle-slider" />
                </button>
            </div>

            <div className="setting-group toggle">
                <div className="toggle-info">
                    <label>Buluta Kaydet</label>
                    <span>Kayıtları sunucuya yükle</span>
                </div>
                <button
                    className={`toggle-btn ${settings.save_to_cloud ? 'active' : ''}`}
                    onClick={() => setSettings({ ...settings, save_to_cloud: !settings.save_to_cloud })}
                >
                    <span className="toggle-slider" />
                </button>
            </div>

            <div className="setting-group toggle">
                <div className="toggle-info">
                    <label>Gürültü Bastırma</label>
                    <span>Arka plan gürültüsünü azalt</span>
                </div>
                <button
                    className={`toggle-btn ${settings.noise_suppression ? 'active' : ''}`}
                    onClick={() => setSettings({ ...settings, noise_suppression: !settings.noise_suppression })}
                >
                    <span className="toggle-slider" />
                </button>
            </div>
        </div>
    );
};

export default VoiceRecordingPanel;
