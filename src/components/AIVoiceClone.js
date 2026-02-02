// frontend/src/components/AIVoiceClone.js

/**
 * 🎤 AI Voice Clone
 * ElevenLabs integration for voice cloning
 */

import React, { useState, useEffect, useRef } from 'react';
import FaMicrophone from 'react-icons/fa/FaMicrophone';
import FaStop from 'react-icons/fa/FaStop';
import FaPlay from 'react-icons/fa/FaPlay';
import FaUpload from 'react-icons/fa/FaUpload';
import FaRobot from 'react-icons/fa/FaRobot';
import FaTrash from 'react-icons/fa/FaTrash';
import toast from '../utils/toast';

const AIVoiceClone = ({
    userId,
    apiBaseUrl,
    fetchWithAuth,
    onVoiceCloned
}) => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [recording, setRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [previewAudio, setPreviewAudio] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioContextRef = useRef(null);

    useEffect(() => {
        loadUserVoices();
    }, []);

    const loadUserVoices = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/ai/voices/?user_id=${userId}`
            );

            if (response.ok) {
                const data = await response.json();
                setVoices(data.voices || []);
            }
        } catch (error) {
            console.error('Failed to load voices:', error);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    sampleRate: 44100,
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setAudioChunks(prev => [...prev, event.data]);
                }
            };

            mediaRecorder.onstop = () => {
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start(100); // Collect data every 100ms
            mediaRecorderRef.current = mediaRecorder;
            setRecording(true);
            setAudioChunks([]);

            console.log('✅ [VoiceClone] Recording started');
        } catch (error) {
            console.error('❌ [VoiceClone] Recording failed:', error);
            toast.error('❌ Mikrofon erişimi başarısız');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current = null;
            setRecording(false);
            console.log('⏹️ [VoiceClone] Recording stopped');
        }
    };

    const createVoiceClone = async () => {
        if (audioChunks.length === 0) {
            toast.error('❌ Önce ses kaydı yapın');
            return;
        }

        setProcessing(true);
        try {
            // Create audio blob
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

            // Create form data
            const formData = new FormData();
            formData.append('audio', audioBlob, 'voice_sample.webm');
            formData.append('name', `${userId}_voice_${Date.now()}`);
            formData.append('description', 'Custom voice clone');

            // Send to backend (which calls ElevenLabs API)
            const response = await fetchWithAuth(
                `${apiBaseUrl}/ai/voices/clone/`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (response.ok) {
                const newVoice = await response.json();
                setVoices([...voices, newVoice]);
                setAudioChunks([]);
                toast.success('✅ Ses klonu oluşturuldu!');

                if (onVoiceCloned) {
                    onVoiceCloned(newVoice);
                }
            } else {
                const error = await response.json();
                toast.error(`❌ Hata: ${error.error || 'Voice cloning failed'}`);
            }
        } catch (error) {
            console.error('Voice clone error:', error);
            toast.error('❌ Bir hata oluştu');
        } finally {
            setProcessing(false);
        }
    };

    const generateSpeech = async (text) => {
        if (!selectedVoice) {
            toast.error('❌ Önce bir ses seçin');
            return;
        }

        setProcessing(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/ai/voices/generate/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        voice_id: selectedVoice.id,
                        text: text
                    })
                }
            );

            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                setPreviewAudio(audioUrl);

                // Auto-play
                const audio = new Audio(audioUrl);
                audio.play();
            } else {
                toast.error('❌ Ses oluşturulamadı');
            }
        } catch (error) {
            console.error('Speech generation error:', error);
            toast.error('❌ Bir hata oluştu');
        } finally {
            setProcessing(false);
        }
    };

    const deleteVoice = async (voiceId) => {
        if (!confirm('Bu sesi silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/ai/voices/${voiceId}/`,
                { method: 'DELETE' }
            );

            if (response.ok) {
                setVoices(voices.filter(v => v.id !== voiceId));
                if (selectedVoice?.id === voiceId) {
                    setSelectedVoice(null);
                }
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const uploadAudioFile = async (file) => {
        if (!file.type.startsWith('audio/')) {
            toast.error('❌ Sadece ses dosyaları yüklenebilir');
            return;
        }

        setProcessing(true);
        try {
            const formData = new FormData();
            formData.append('audio', file);
            formData.append('name', file.name.split('.')[0]);

            const response = await fetchWithAuth(
                `${apiBaseUrl}/ai/voices/clone/`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (response.ok) {
                const newVoice = await response.json();
                setVoices([...voices, newVoice]);
                toast.success('✅ Ses yüklendi!');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('❌ Yükleme başarısız');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <FaRobot style={styles.headerIcon} />
                <h2 style={styles.title}>AI Ses Klonlama</h2>
            </div>

            {/* Recording Section */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Yeni Ses Kaydı</h3>

                <div style={styles.recordingControls}>
                    {!recording ? (
                        <button onClick={startRecording} style={styles.recordButton}>
                            <FaMicrophone style={{ marginRight: '8px' }} />
                            Kayıt Başlat
                        </button>
                    ) : (
                        <button onClick={stopRecording} style={styles.stopButton}>
                            <FaStop style={{ marginRight: '8px' }} />
                            Kaydı Durdur
                        </button>
                    )}

                    {recording && (
                        <div style={styles.recordingIndicator}>
                            <span className="pulse-dot" />
                            <span>Kayıt yapılıyor...</span>
                        </div>
                    )}
                </div>

                {audioChunks.length > 0 && !recording && (
                    <div style={styles.previewSection}>
                        <p style={styles.previewText}>
                            ✅ {(audioChunks.reduce((acc, chunk) => acc + chunk.size, 0) / 1024).toFixed(1)} KB kaydedildi
                        </p>
                        <button
                            onClick={createVoiceClone}
                            disabled={processing}
                            style={styles.createButton}
                        >
                            {processing ? 'İşleniyor...' : 'Ses Klonu Oluştur'}
                        </button>
                    </div>
                )}

                {/* File Upload */}
                <div style={styles.uploadSection}>
                    <label style={styles.uploadLabel}>
                        <FaUpload style={{ marginRight: '8px' }} />
                        Ses Dosyası Yükle
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    uploadAudioFile(e.target.files[0]);
                                }
                            }}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
            </div>

            {/* Voice Library */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Ses Kütüphanesi ({voices.length})</h3>

                <div style={styles.voiceList}>
                    {voices.map(voice => (
                        <div
                            key={voice.id}
                            style={{
                                ...styles.voiceCard,
                                border: selectedVoice?.id === voice.id ? '2px solid #5865f2' : '1px solid #40444b'
                            }}
                            onClick={() => setSelectedVoice(voice)}
                        >
                            <div style={styles.voiceInfo}>
                                <span style={styles.voiceName}>{voice.name}</span>
                                <span style={styles.voiceDate}>
                                    {new Date(voice.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteVoice(voice.id);
                                }}
                                style={styles.deleteButton}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Text-to-Speech Generator */}
            {selectedVoice && (
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Metin → Ses</h3>

                    <textarea
                        placeholder="Metni buraya yazın..."
                        style={styles.textArea}
                        id="tts-text"
                    />

                    <button
                        onClick={() => {
                            const text = document.getElementById('tts-text').value;
                            if (text) generateSpeech(text);
                        }}
                        disabled={processing}
                        style={styles.generateButton}
                    >
                        <FaPlay style={{ marginRight: '8px' }} />
                        {processing ? 'Oluşturuluyor...' : 'Ses Oluştur'}
                    </button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '600px'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px'
    },
    headerIcon: {
        color: '#5865f2',
        fontSize: '24px',
        marginRight: '12px'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#fff'
    },
    section: {
        marginBottom: '24px',
        paddingBottom: '24px',
        borderBottom: '1px solid #40444b'
    },
    sectionTitle: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#dcddde',
        marginBottom: '16px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    recordingControls: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '16px'
    },
    recordButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '6px',
        padding: '12px 24px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    stopButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f04747',
        border: 'none',
        borderRadius: '6px',
        padding: '12px 24px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    recordingIndicator: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#f04747',
        fontSize: '14px',
        fontWeight: '500'
    },
    previewSection: {
        backgroundColor: '#36393f',
        borderRadius: '6px',
        padding: '16px',
        textAlign: 'center'
    },
    previewText: {
        margin: '0 0 12px 0',
        color: '#b9bbbe',
        fontSize: '13px'
    },
    createButton: {
        backgroundColor: '#3ba55d',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    uploadSection: {
        marginTop: '16px'
    },
    uploadLabel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4e5058',
        border: '2px dashed #72767d',
        borderRadius: '6px',
        padding: '16px',
        color: '#dcddde',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    voiceList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    voiceCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#36393f',
        borderRadius: '6px',
        padding: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    voiceInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    voiceName: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#dcddde',
        marginBottom: '4px'
    },
    voiceDate: {
        fontSize: '12px',
        color: '#72767d'
    },
    deleteButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#f04747',
        fontSize: '14px',
        cursor: 'pointer',
        padding: '8px'
    },
    textArea: {
        width: '100%',
        minHeight: '120px',
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '6px',
        padding: '12px',
        color: '#dcddde',
        fontSize: '14px',
        fontFamily: 'inherit',
        resize: 'vertical',
        marginBottom: '12px'
    },
    generateButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '6px',
        padding: '12px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer'
    }
};

// Pulse animation for recording indicator
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .pulse-dot {
      width: 10px;
      height: 10px;
      background-color: #f04747;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.2);
      }
    }
  `;
    document.head.appendChild(styleSheet);
}

export default AIVoiceClone;


