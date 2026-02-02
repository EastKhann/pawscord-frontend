// frontend/src/components/VoiceTranscription.js

/**
 * 🎙️ Voice Message Transcription
 * Automatic speech-to-text for voice messages
 */

import React, { useState, useEffect } from 'react';
import FaMicrophone from 'react-icons/fa/FaMicrophone';
import FaClosedCaptioning from 'react-icons/fa/FaClosedCaptioning';
import FaSpinner from 'react-icons/fa/FaSpinner';

const VoiceTranscription = ({
    audioUrl,
    messageId,
    apiBaseUrl,
    fetchWithAuth,
    autoTranscribe = true
}) => {
    const [transcript, setTranscript] = useState('');
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (autoTranscribe && audioUrl && !transcript) {
            transcribeAudio();
        }
    }, [audioUrl, autoTranscribe]);

    const transcribeAudio = async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch audio file
            const audioResponse = await fetch(audioUrl);
            const audioBlob = await audioResponse.blob();

            // Create FormData
            const formData = new FormData();
            formData.append('audio', audioBlob, 'voice.webm');
            formData.append('message_id', messageId);

            // Send to backend
            const response = await fetchWithAuth(
                `${apiBaseUrl}/ai/transcribe-audio/`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (response.ok) {
                const data = await response.json();
                setTranscript(data.transcript || 'Transkript oluşturulamadı');
            } else {
                setError('Transkript oluşturulamadı');
            }
        } catch (err) {
            console.error('Transcription error:', err);
            setError('Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    if (!audioUrl) return null;

    return (
        <div style={styles.container}>
            {loading ? (
                <div style={styles.loading}>
                    <FaSpinner className="fa-spin" style={{ marginRight: '6px' }} />
                    <span>Transkript oluşturuluyor...</span>
                </div>
            ) : transcript ? (
                <div style={styles.transcriptContainer}>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        style={styles.toggleButton}
                    >
                        <FaClosedCaptioning style={{ marginRight: '6px' }} />
                        <span>{expanded ? 'Gizle' : 'Metin'}</span>
                    </button>

                    {expanded && (
                        <div style={styles.transcriptText}>
                            <FaMicrophone style={styles.icon} />
                            <span>"{transcript}"</span>
                        </div>
                    )}
                </div>
            ) : error ? (
                <div style={styles.error}>
                    <span>{error}</span>
                    <button onClick={transcribeAudio} style={styles.retryButton}>
                        Tekrar Dene
                    </button>
                </div>
            ) : (
                <button onClick={transcribeAudio} style={styles.transcribeButton}>
                    <FaClosedCaptioning style={{ marginRight: '6px' }} />
                    Transkript Oluştur
                </button>
            )}
        </div>
    );
};

const styles = {
    container: {
        marginTop: '8px'
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '12px',
        color: '#b9bbbe',
        padding: '6px 10px',
        backgroundColor: '#2f3136',
        borderRadius: '4px'
    },
    transcriptContainer: {
        marginTop: '4px'
    },
    toggleButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#4752c4',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '6px 12px',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    transcriptText: {
        marginTop: '8px',
        padding: '10px',
        backgroundColor: '#2f3136',
        borderRadius: '6px',
        borderLeft: '3px solid #5865f2',
        fontSize: '13px',
        color: '#dcddde',
        fontStyle: 'italic',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px'
    },
    icon: {
        color: '#5865f2',
        marginTop: '2px',
        flexShrink: 0
    },
    error: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 10px',
        backgroundColor: '#f04747',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#fff'
    },
    retryButton: {
        backgroundColor: '#fff',
        color: '#f04747',
        border: 'none',
        borderRadius: '3px',
        padding: '4px 10px',
        fontSize: '11px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    transcribeButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        color: '#b9bbbe',
        border: '1px solid #4e5058',
        borderRadius: '4px',
        padding: '6px 12px',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    }
};

export default VoiceTranscription;


