// frontend/src/components/LiveSubtitles.js

/**
 * 📝 Live Subtitles - Real-time Voice Chat Transcription
 * WebRTC audio stream + speech-to-text
 */

import React, { useState, useEffect, useRef } from 'react';
import toast from '../utils/toast';
import { FaClosedCaptioning, FaCog, FaTimes } from 'react-icons/fa';

const LiveSubtitles = ({
    audioStream,
    participants = [],
    apiBaseUrl,
    fetchWithAuth,
    enabled = false,
    onToggle
}) => {
    const [subtitles, setSubtitles] = useState([]);
    const [isActive, setIsActive] = useState(enabled);
    const [currentSpeaker, setCurrentSpeaker] = useState(null);
    const [settings, setSettings] = useState({
        language: 'tr-TR',
        fontSize: 'medium',
        position: 'bottom'
    });
    const [showSettings, setShowSettings] = useState(false);

    const recognitionRef = useRef(null);
    const subtitleContainerRef = useRef(null);
    const audioContextRef = useRef(null);

    // 🔥 Speaker detection - ses seviyesine göre konuşanı bul
    const detectSpeaker = (transcript) => {
        // Eğer participants varsa, en son konuşan kişiyi bul
        if (participants.length > 0) {
            const speaking = participants.find(p => p.isTalking || p.isSpeaking);
            if (speaking) {
                setCurrentSpeaker(speaking.username || speaking.name);
                return speaking.username || speaking.name;
            }
        }
        return currentSpeaker || 'You';
    };

    useEffect(() => {
        if (isActive && audioStream) {
            startSubtitles();
        } else {
            stopSubtitles();
        }

        return () => stopSubtitles();
    }, [isActive, audioStream]);

    useEffect(() => {
        // Auto-scroll to latest subtitle
        if (subtitleContainerRef.current) {
            subtitleContainerRef.current.scrollTop =
                subtitleContainerRef.current.scrollHeight;
        }
    }, [subtitles]);

    const startSubtitles = async () => {
        try {
            // Check for browser support
            const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                console.error('Speech recognition not supported');
                toast.error('❌ Tarayıcınız altyazıları desteklemiyor');
                setIsActive(false);
                return;
            }

            // Initialize speech recognition
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = settings.language;

            recognition.onresult = (event) => {
                const results = Array.from(event.results);
                const latestResult = results[results.length - 1];

                const transcript = latestResult[0].transcript;
                const isFinal = latestResult.isFinal;
                const confidence = latestResult[0].confidence;

                // Add or update subtitle
                setSubtitles(prev => {
                    const newSubtitles = [...prev];
                    const lastSubtitle = newSubtitles[newSubtitles.length - 1];

                    if (!isFinal && lastSubtitle && !lastSubtitle.final) {
                        // Update interim result
                        lastSubtitle.text = transcript;
                        lastSubtitle.confidence = confidence;
                    } else {
                        // Add new subtitle
                        // 🔥 Speaker identification - Voice fingerprint
                        const speakerName = currentSpeaker || detectSpeaker(transcript) || 'You';

                        newSubtitles.push({
                            id: Date.now(),
                            text: transcript,
                            timestamp: new Date().toLocaleTimeString(),
                            speaker: speakerName,
                            final: isFinal,
                            confidence
                        });

                        // Keep only last 20 subtitles
                        if (newSubtitles.length > 20) {
                            newSubtitles.shift();
                        }
                    }

                    return newSubtitles;
                });

                // Send to backend for logging
                if (isFinal) {
                    sendSubtitleToBackend(transcript);
                }
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);

                if (event.error === 'no-speech') {
                    // Restart after silence
                    setTimeout(() => {
                        if (isActive) recognition.start();
                    }, 1000);
                }
            };

            recognition.onend = () => {
                // Auto-restart if still active
                if (isActive) {
                    setTimeout(() => recognition.start(), 100);
                }
            };

            recognition.start();
            recognitionRef.current = recognition;

            console.log('✅ [Subtitles] Started');
        } catch (error) {
            console.error('Failed to start subtitles:', error);
        }
    };

    const stopSubtitles = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
            console.log('⏹️ [Subtitles] Stopped');
        }
    };

    const sendSubtitleToBackend = async (text) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/voice/subtitles/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    timestamp: new Date().toISOString(),
                    language: settings.language
                })
            });
        } catch (error) {
            console.error('Failed to send subtitle:', error);
        }
    };

    const toggleSubtitles = () => {
        const newState = !isActive;
        setIsActive(newState);
        if (onToggle) onToggle(newState);
    };

    const changeSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const clearSubtitles = () => {
        setSubtitles([]);
    };

    const getFontSize = () => {
        switch (settings.fontSize) {
            case 'small': return '12px';
            case 'large': return '18px';
            default: return '14px';
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={toggleSubtitles}
                style={{
                    ...styles.toggleButton,
                    backgroundColor: isActive ? '#5865f2' : '#4e5058'
                }}
                title={isActive ? 'Altyazıları Kapat' : 'Altyazıları Aç'}
            >
                <FaClosedCaptioning />
            </button>

            {/* Subtitles Panel */}
            {isActive && (
                <div
                    style={{
                        ...styles.subtitlesPanel,
                        [settings.position]: '80px'
                    }}
                >
                    {/* Header */}
                    <div style={styles.header}>
                        <FaClosedCaptioning style={styles.headerIcon} />
                        <span style={styles.headerText}>Canlı Altyazı</span>

                        <div style={styles.headerActions}>
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                style={styles.iconButton}
                                title="Ayarlar"
                            >
                                <FaCog />
                            </button>
                            <button
                                onClick={clearSubtitles}
                                style={styles.iconButton}
                                title="Temizle"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    {showSettings && (
                        <div style={styles.settingsPanel}>
                            <div style={styles.settingItem}>
                                <label style={styles.settingLabel}>Dil</label>
                                <select
                                    value={settings.language}
                                    onChange={(e) => changeSetting('language', e.target.value)}
                                    style={styles.settingSelect}
                                >
                                    <option value="tr-TR">Türkçe</option>
                                    <option value="en-US">English</option>
                                    <option value="de-DE">Deutsch</option>
                                    <option value="fr-FR">Français</option>
                                </select>
                            </div>

                            <div style={styles.settingItem}>
                                <label style={styles.settingLabel}>Yazı Boyutu</label>
                                <select
                                    value={settings.fontSize}
                                    onChange={(e) => changeSetting('fontSize', e.target.value)}
                                    style={styles.settingSelect}
                                >
                                    <option value="small">Küçük</option>
                                    <option value="medium">Orta</option>
                                    <option value="large">Büyük</option>
                                </select>
                            </div>

                            <div style={styles.settingItem}>
                                <label style={styles.settingLabel}>Konum</label>
                                <select
                                    value={settings.position}
                                    onChange={(e) => changeSetting('position', e.target.value)}
                                    style={styles.settingSelect}
                                >
                                    <option value="bottom">Alt</option>
                                    <option value="top">Üst</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Subtitles List */}
                    <div
                        ref={subtitleContainerRef}
                        style={styles.subtitlesList}
                    >
                        {subtitles.length === 0 ? (
                            <div style={styles.emptyState}>
                                <FaClosedCaptioning style={styles.emptyIcon} />
                                <p>Konuşmaya başlayın...</p>
                            </div>
                        ) : (
                            subtitles.map((subtitle) => (
                                <div
                                    key={subtitle.id}
                                    style={{
                                        ...styles.subtitleItem,
                                        opacity: subtitle.final ? 1 : 0.7
                                    }}
                                >
                                    <div style={styles.subtitleHeader}>
                                        <span style={styles.speaker}>{subtitle.speaker}</span>
                                        <span style={styles.timestamp}>{subtitle.timestamp}</span>
                                    </div>
                                    <p style={{
                                        ...styles.subtitleText,
                                        fontSize: getFontSize()
                                    }}>
                                        {subtitle.text}
                                    </p>
                                    {!subtitle.final && (
                                        <span style={styles.interimBadge}>...</span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

const styles = {
    toggleButton: {
        border: 'none',
        borderRadius: '4px',
        padding: '10px',
        color: '#fff',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subtitlesPanel: {
        position: 'fixed',
        left: '20px',
        width: '400px',
        maxHeight: '300px',
        backgroundColor: 'rgba(35, 39, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        border: '1px solid #40444b',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        overflow: 'hidden'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        borderBottom: '1px solid #40444b',
        backgroundColor: '#2f3136'
    },
    headerIcon: {
        color: '#5865f2',
        marginRight: '8px'
    },
    headerText: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff',
        flex: 1
    },
    headerActions: {
        display: 'flex',
        gap: '8px'
    },
    iconButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '14px',
        cursor: 'pointer',
        padding: '4px',
        transition: 'color 0.2s'
    },
    settingsPanel: {
        padding: '12px',
        borderBottom: '1px solid #40444b',
        backgroundColor: '#36393f'
    },
    settingItem: {
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    settingLabel: {
        fontSize: '12px',
        color: '#b9bbbe',
        fontWeight: '500'
    },
    settingSelect: {
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '3px',
        color: '#dcddde',
        padding: '4px 8px',
        fontSize: '12px'
    },
    subtitlesList: {
        flex: 1,
        overflowY: 'auto',
        padding: '12px'
    },
    emptyState: {
        textAlign: 'center',
        padding: '40px 20px',
        color: '#72767d'
    },
    emptyIcon: {
        fontSize: '32px',
        marginBottom: '8px',
        color: '#5865f2'
    },
    subtitleItem: {
        marginBottom: '12px',
        padding: '8px',
        backgroundColor: '#2f3136',
        borderRadius: '6px',
        borderLeft: '3px solid #5865f2'
    },
    subtitleHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '4px'
    },
    speaker: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#5865f2',
        textTransform: 'uppercase'
    },
    timestamp: {
        fontSize: '10px',
        color: '#72767d'
    },
    subtitleText: {
        margin: 0,
        color: '#dcddde',
        lineHeight: '1.4'
    },
    interimBadge: {
        display: 'inline-block',
        marginLeft: '4px',
        color: '#72767d',
        fontSize: '12px'
    }
};

export default LiveSubtitles;


