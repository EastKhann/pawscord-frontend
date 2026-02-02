// frontend/src/components/VoiceEffectsTranscriptionPanel.js
import React, { useState, useRef } from 'react';
import toast from '../utils/toast';
import { FaMicrophone, FaRobot, FaFileAudio, FaDownload, FaPlay, FaStop, FaMagic } from 'react-icons/fa';
import './VoiceEffectsTranscriptionPanel.css';

/**
 * Voice Effects & Transcription Panel
 * Apply voice effects (robot, echo, pitch) and transcribe audio to text
 */
const VoiceEffectsTranscriptionPanel = ({ username, apiBaseUrl, fetchWithAuth }) => {
    const [activeTab, setActiveTab] = useState('effects'); // effects, transcription
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [selectedEffect, setSelectedEffect] = useState('robot');
    const [processedAudioUrl, setProcessedAudioUrl] = useState(null);
    const [transcription, setTranscription] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const effects = [
        { id: 'robot', name: '🤖 Robot', description: 'Robotik ses efekti' },
        { id: 'echo', name: '🔊 Echo', description: 'Yankı efekti' },
        { id: 'pitch_high', name: '⬆️ Yüksek Pitch', description: 'Sesini tizleştir' },
        { id: 'pitch_low', name: '⬇️ Düşük Pitch', description: 'Sesini kalınlaştır' },
        { id: 'reverb', name: '🎵 Reverb', description: 'Yankı ve derinlik ekle' },
        { id: 'chipmunk', name: '🐿️ Chipmunk', description: 'Sincap sesi' }
    ];

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setRecording(true);
            toast.success('🎙️ Kayıt başladı!');
        } catch (err) {
            console.error('Recording error:', err);
            toast.error('❌ Mikrofon erişimi reddedildi!');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            toast.info('⏹️ Kayıt durduruldu!');
        }
    };

    const applyVoiceEffect = async () => {
        if (!audioBlob) {
            toast.error('❌ Önce ses kaydı yapın!');
            return;
        }

        setProcessing(true);
        try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.wav');
            formData.append('effect', selectedEffect);

            const response = await fetchWithAuth(`${apiBaseUrl}/adv/voice-effect/`, {
                method: 'POST',
                body: formData,
                headers: {} // Let browser set Content-Type with boundary
            });

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setProcessedAudioUrl(url);

            toast.success(`✨ ${effects.find(e => e.id === selectedEffect)?.name} efekti uygulandı!`);
        } catch (err) {
            console.error('Voice effect error:', err);
            toast.error('❌ Ses efekti uygulanamadı!');
        } finally {
            setProcessing(false);
        }
    };

    const transcribeAudio = async (audioFile = null) => {
        const fileToTranscribe = audioFile || audioBlob;
        if (!fileToTranscribe) {
            toast.error('❌ Ses dosyası bulunamadı!');
            return;
        }

        setProcessing(true);
        try {
            const formData = new FormData();
            formData.append('audio', fileToTranscribe, 'audio.wav');
            formData.append('language', 'tr');

            const response = await fetchWithAuth(`${apiBaseUrl}/adv/voice-transcription/`, {
                method: 'POST',
                body: formData,
                headers: {}
            });

            const data = await response.json();
            setTranscription(data.text || data.transcription || '');

            toast.success('📝 Ses metne dönüştürüldü!');
        } catch (err) {
            console.error('Transcription error:', err);
            toast.error('❌ Ses metne dönüştürülemedi!');
        } finally {
            setProcessing(false);
        }
    };

    const transcribeMessage = async (messageId) => {
        setProcessing(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/messages/${messageId}/transcribe/`,
                { method: 'POST' }
            );

            const data = await response.json();
            setTranscription(data.text || data.transcription || '');

            toast.success('📝 Mesaj metne dönüştürüldü!');
        } catch (err) {
            console.error('Message transcription error:', err);
            toast.error('❌ Mesaj dönüştürülemedi!');
        } finally {
            setProcessing(false);
        }
    };

    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setAudioBlob(file);
            setAudioUrl(URL.createObjectURL(file));
            
            if (type === 'transcribe') {
                transcribeAudio(file);
            }
        }
    };

    return (
        <div className="voice-effects-panel">
            <div className="voice-header">
                <FaMicrophone size={28} />
                <div>
                    <h3 className="voice-title">Voice Effects & Transcription</h3>
                    <p className="voice-subtitle">Ses efektleri ve metne dönüştürme</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="voice-tabs">
                <button 
                    className={activeTab === 'effects' ? 'active' : ''}
                    onClick={() => setActiveTab('effects')}
                >
                    <FaMagic /> Ses Efektleri
                </button>
                <button 
                    className={activeTab === 'transcription' ? 'active' : ''}
                    onClick={() => setActiveTab('transcription')}
                >
                    <FaFileAudio /> Ses → Metin
                </button>
            </div>

            {/* Voice Effects Tab */}
            {activeTab === 'effects' && (
                <div className="voice-content">
                    {/* Recording Controls */}
                    <div className="voice-recorder">
                        <button 
                            onClick={recording ? stopRecording : startRecording}
                            className={`voice-record-btn ${recording ? 'recording' : ''}`}
                        >
                            {recording ? (
                                <>
                                    <FaStop /> Kaydı Durdur
                                </>
                            ) : (
                                <>
                                    <FaMicrophone /> Kayıt Başlat
                                </>
                            )}
                        </button>

                        <label className="voice-upload-btn">
                            <FaFileAudio /> Dosya Yükle
                            <input 
                                type="file" 
                                accept="audio/*" 
                                onChange={(e) => handleFileUpload(e, 'effect')}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>

                    {/* Audio Preview */}
                    {audioUrl && (
                        <div className="voice-audio-preview">
                            <h4>🎵 Orijinal Ses:</h4>
                            <audio src={audioUrl} controls className="voice-audio-player" />
                        </div>
                    )}

                    {/* Effect Selection */}
                    <div className="voice-effects-grid">
                        <h4>Ses Efekti Seç:</h4>
                        <div className="voice-effects-list">
                            {effects.map(effect => (
                                <div 
                                    key={effect.id}
                                    className={`voice-effect-card ${selectedEffect === effect.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedEffect(effect.id)}
                                >
                                    <div className="voice-effect-name">{effect.name}</div>
                                    <div className="voice-effect-desc">{effect.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Apply Button */}
                    <button 
                        onClick={applyVoiceEffect}
                        disabled={!audioBlob || processing}
                        className="voice-apply-btn"
                    >
                        {processing ? '⏳ İşleniyor...' : '✨ Efekti Uygula'}
                    </button>

                    {/* Processed Audio */}
                    {processedAudioUrl && (
                        <div className="voice-audio-preview">
                            <h4>🎉 Efekt Uygulanmış Ses:</h4>
                            <audio src={processedAudioUrl} controls className="voice-audio-player" />
                            <a 
                                href={processedAudioUrl} 
                                download={`voice-effect-${selectedEffect}.wav`}
                                className="voice-download-btn"
                            >
                                <FaDownload /> İndir
                            </a>
                        </div>
                    )}
                </div>
            )}

            {/* Transcription Tab */}
            {activeTab === 'transcription' && (
                <div className="voice-content">
                    <div className="voice-transcription-options">
                        <button 
                            onClick={recording ? stopRecording : startRecording}
                            className={`voice-record-btn ${recording ? 'recording' : ''}`}
                        >
                            {recording ? (
                                <>
                                    <FaStop /> Kaydı Durdur
                                </>
                            ) : (
                                <>
                                    <FaMicrophone /> Kayıt Başlat
                                </>
                            )}
                        </button>

                        <label className="voice-upload-btn">
                            <FaFileAudio /> Dosya Yükle
                            <input 
                                type="file" 
                                accept="audio/*" 
                                onChange={(e) => handleFileUpload(e, 'transcribe')}
                                style={{ display: 'none' }}
                            />
                        </label>

                        {audioBlob && (
                            <button 
                                onClick={() => transcribeAudio()}
                                disabled={processing}
                                className="voice-transcribe-btn"
                            >
                                {processing ? '⏳ Dönüştürülüyor...' : '📝 Metne Dönüştür'}
                            </button>
                        )}
                    </div>

                    {audioUrl && (
                        <div className="voice-audio-preview">
                            <audio src={audioUrl} controls className="voice-audio-player" />
                        </div>
                    )}

                    {transcription && (
                        <div className="voice-transcription-result">
                            <h4>📝 Metin:</h4>
                            <div className="voice-transcription-text">
                                {transcription}
                            </div>
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(transcription);
                                    toast.success('📋 Metin kopyalandı!');
                                }}
                                className="voice-copy-btn"
                            >
                                📋 Kopyala
                            </button>
                        </div>
                    )}

                    <div className="voice-info-box">
                        <FaRobot size={24} />
                        <div>
                            <strong>AI Powered Transcription</strong>
                            <p>Türkçe ve İngilizce ses kayıtlarını otomatik olarak metne dönüştürür.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceEffectsTranscriptionPanel;
