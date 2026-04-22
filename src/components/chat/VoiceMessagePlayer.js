/* eslint-disable jsx-a11y/media-has-caption */
// frontend/src/components/VoiceMessagePlayer.js
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaPause, FaDownload } from 'react-icons/fa';
import logger from '../../utils/logger';

const S = {
    txt: { fontSize: '10px', color: '#949ba4', marginTop: '4px', wordBreak: 'break-all' },
};

const VoiceMessagePlayer = ({
    audioUrl,
    duration,
    onDownload,
    messageId,
    fetchWithAuth,
    apiBaseUrl,
}) => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(duration || 0);
    const [waveformData, setWaveformData] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [transcription, setTranscription] = useState(null);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [currentAudioUrl, setCurrentAudioUrl] = useState(audioUrl); // 🔥 Proxy fallback for
    const [triedProxy, setTriedProxy] = useState(false); // 🔥 Proxy denendi mi?
    const audioRef = useRef(null);
    const animationRef = useRef(null);

    // 🔥 DEBUG: İlk render'da ve URL değişimlerinde log
    useEffect(() => { }, [audioUrl, currentAudioUrl, triedProxy, apiBaseUrl]);

    // 🔥 audioUrl değiştiğinde state'i sıfırla
    useEffect(() => {
        if (audioUrl && audioUrl !== currentAudioUrl && !triedProxy) {
            setCurrentAudioUrl(audioUrl);
            setTriedProxy(false);
            setHasError(false);
        }
    }, [audioUrl]);

    // 🎙️ Transcription işlevi
    const handleTranscribe = async () => {
        if (isTranscribing || transcription) return;

        setIsTranscribing(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/messages/${messageId}/transcribe/`,
                {
                    method: 'POST',
                }
            );

            if (response.ok) {
                const data = await response.json();
                setTranscription(data.transcription || t('ui.translation_yapilamadi'));
            } else {
                setTranscription(t('ui.translation_failed'));
            }
        } catch (error) {
            logger.error('Transcription error:', error);
            setTranscription('❌ An error occurred');
        } finally {
            setIsTranscribing(false);
        }
    };

    // 🎵 Waveform oluştur (audio yüklendikinde)
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setAudioDuration(audio.duration);
            generateWaveform();
            setHasError(false);
        };

        const handleError = (e) => {
            // 🔥 Detaylı hata log'u
            const error = audio.error;
            const errorCode = error ? error.code : 'unknown';
            const errorMessage = error ? error.message : 'No error info';
            logger.warn('[VoicePlayer] ❌ Audio file could not be loaded:', {
                url: currentAudioUrl,
                errorCode,
                errorMessage,
                networkState: audio.networkState,
                readyState: audio.readyState,
            });

            // 🔥 FIX: R2 hatası durumunda proxy'ye fallback yap
            if (!triedProxy && currentAudioUrl) {
                // URL'den file path kar (birden fazla format destekle)
                let filePath = null;

                // Format 1: https://xxx.r2.dev/attachments/voice_xxx.webm
                if (currentAudioUrl.includes('.r2.dev/')) {
                    filePath = currentAudioUrl.split('.r2.dev/')[1];
                }
                // Format 2: https://pub-xxx.r2.dev/attachments/voice_xxx.webm
                else if (currentAudioUrl.includes('r2.dev/')) {
                    const parts = currentAudioUrl.split('r2.dev/');
                    filePath = parts[parts.length - 1];
                }
                // Format 3: /media/attachments/voice_xxx.webm
                else if (currentAudioUrl.includes('/attachments/')) {
                    const parts = currentAudioUrl.split('/attachments/');
                    filePath = 'attachments/' + parts[parts.length - 1];
                }

                if (filePath) {
                    // /api/ prefix add
                    const proxyUrl = `${apiBaseUrl || window.location.origin}/api/voice-proxy/${filePath}`;
                    setCurrentAudioUrl(proxyUrl);
                    setTriedProxy(true);
                    setHasError(false);
                    return; // Error state'ini ayarlamadan k - yeni URL denenecek
                }
            }

            setHasError(true);
        };

        const handleCanPlay = () => { };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('error', handleError);
        audio.addEventListener('canplay', handleCanPlay);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('canplay', handleCanPlay);
        };
    }, [currentAudioUrl, triedProxy, apiBaseUrl]); // 🔥 FIX: dependency updated

    // 🌊 Basit waveform verisi oluştur (gerçek analiz for Web Audio API kullanılabilir)
    const generateWaveform = useCallback(() => {
        const bars = 40; // 40 çubuk
        const data = [];

        // Rastgele ama gerçekçi görünen waveform
        for (let i = 0; i < bars; i++) {
            const baseHeight = Math.random() * 0.5 + 0.3; // 0.3-0.8 searchsı
            const variance = Math.sin(i / 5) * 0.2; // Dalga efekti
            data.push(Math.max(0.2, Math.min(1, baseHeight + variance)));
        }

        setWaveformData(data);
    }, []);

    // ▶️ Oynatma/Stopma
    const togglePlayPause = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            cancelAnimationFrame(animationRef.current);
        } else {
            audio.play();
            updateProgress();
        }

        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    // ⏱️ Progress daycelle
    const updateProgress = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        setCurrentTime(audio.currentTime);

        if (!audio.paused) {
            animationRef.current = requestAnimationFrame(updateProgress);
        }
    }, []);

    // 🎯 Waveform'a tıklayarak zaman atla
    const handleWaveformClick = useCallback(
        (e) => {
            const audio = audioRef.current;
            if (!audio) return;

            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;

            audio.currentTime = percentage * audioDuration;
            setCurrentTime(audio.currentTime);
        },
        [audioDuration]
    );

    // 🔚 Ses bittiğinde
    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            cancelAnimationFrame(animationRef.current);
        };

        if (audio) {
            audio.addEventListener('ended', handleEnded);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('ended', handleEnded);
            }
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    // ⏰ Duration formatla (0:00)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={styles.container}>
            {hasError ? (
                /* 📛 Error State */
                <div style={styles.errorContainer}>
                    <div style={styles.errorIcon}>🔇</div>
                    <div style={styles.errorText}>{t('voiceMsgPlayer.fileNotFound', 'Audio file not found (old message)')}</div>
                    {/* 🔥 Debug: URL'yi göster */}
                    <div style={S.txt}>{audioUrl?.substring(0, 80)}...</div>
                </div>
            ) : (
                <>
                    {/* 🔥 FIX: crossOrigin add R2/CDN CORS for + currentAudioUrl kullan */}
                    <audio
                        ref={audioRef}
                        src={currentAudioUrl}
                        preload="metadata"
                        crossOrigin="anonymous"
                    />

                    {/* Play/Pause Button */}
                    <button
                        aria-label={isPlaying ? t('voicePlayer.pause', 'Pause') : t('voicePlayer.play', 'Play')}
                        onClick={togglePlayPause}
                        style={styles.playButton}
                    >
                        {isPlaying ? <FaPause /> : <FaPlay className="ml-2" />}
                    </button>

                    {/* Waveform */}
                    <div
                        style={styles.waveformContainer}
                        role="button"
                        tabIndex={0}
                        onClick={handleWaveformClick}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div style={styles.waveform}>
                            {waveformData.map((height, index) => {
                                const progress = currentTime / audioDuration;
                                const barProgress = index / waveformData.length;
                                const isActive = barProgress <= progress;

                                return (
                                    <div
                                        key={`item-${index}`}
                                        style={{
                                            ...styles.waveBar,
                                            height: `${height * 100}%`,
                                            backgroundColor: isActive ? '#5865f2' : '#4e5058',
                                            opacity: isActive ? 1 : 0.5,
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* Time Display */}
                        <div style={styles.timeDisplay}>
                            <span>{formatTime(currentTime)}</span>
                            <span className="icon-muted"> / {formatTime(audioDuration)}</span>
                        </div>
                    </div>

                    {/* Download Button */}
                    {onDownload && (
                        <button
                            aria-label={t('common.download', 'Download')}
                            onClick={onDownload}
                            style={styles.downloadButton}
                            title={t('common.download', 'Download')}
                        >
                            <FaDownload />
                        </button>
                    )}

                    {/* Transcription Button */}
                    {messageId && fetchWithAuth && (
                        <button
                            aria-label={t('voicePlayer.transcribe', 'Transcribe voice message')}
                            onClick={handleTranscribe}
                            disabled={isTranscribing || !!transcription}
                            style={{
                                ...styles.downloadButton,
                                backgroundColor: transcription
                                    ? 'rgba(67, 181, 129, 0.1)'
                                    : 'transparent',
                                color: isTranscribing
                                    ? '#f0b232'
                                    : transcription
                                        ? '#23a559'
                                        : '#b5bac1',
                                cursor: isTranscribing || transcription ? 'default' : 'pointer',
                            }}
                            title={transcription ? t('ui.cevrildi') : 'Metne Dönüştür'}
                        >
                            {isTranscribing ? '⏳' : transcription ? '✅' : '📝'}
                        </button>
                    )}
                </>
            )}

            {/* Transcription Text */}
            {transcription && <div style={styles.transcriptionText}>{transcription}</div>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: 'rgba(88, 101, 242, 0.08)',
        border: '1px solid rgba(88, 101, 242, 0.2)',
        borderRadius: '12px',
        padding: '12px 16px',
        maxWidth: '400px',
        transition: 'all 0.2s',
    },
    playButton: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#5865f2',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s',
        flexShrink: 0,
    },
    waveformContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        cursor: 'pointer',
        minWidth: 0,
    },
    waveform: {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        height: '32px',
    },
    waveBar: {
        flex: 1,
        minWidth: '2px',
        borderRadius: '2px',
        transition: 'all 0.15s ease-out',
    },
    timeDisplay: {
        fontSize: '11px',
        color: '#dbdee1',
        fontWeight: '500',
    },
    downloadButton: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'transparent',
        color: '#b5bac1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s',
        flexShrink: 0,
    },
    errorContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px',
        width: '100%',
    },
    errorIcon: {
        fontSize: '20px',
        opacity: 0.5,
    },
    errorText: {
        fontSize: '12px',
        color: '#949ba4',
        fontStyle: 'italic',
    },
    transcriptionText: {
        marginTop: '8px',
        padding: '8px 12px',
        backgroundColor: 'rgba(79, 84, 92, 0.3)',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#dbdee1',
        lineHeight: '1.4',
        fontStyle: 'italic',
    },
};

VoiceMessagePlayer.propTypes = {
    audioUrl: PropTypes.string,
    duration: PropTypes.number,
    onDownload: PropTypes.func,
    messageId: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default React.memo(VoiceMessagePlayer);
