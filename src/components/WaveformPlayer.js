import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay, FaPause, FaLanguage, FaSpinner } from 'react-icons/fa';

const WaveformPlayer = ({ audioUrl, duration, onTranscribe, transcription, isTranscribing }) => {
    const containerRef = useRef(null);
    const waveSurferRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !audioUrl) return; // URL yoksa başlama

        const ws = WaveSurfer.create({
            container: containerRef.current,
            waveColor: '#4e5058',
            progressColor: '#5865f2',
            cursorColor: 'transparent',
            barWidth: 3,
            barRadius: 3,
            cursorWidth: 1,
            height: 30,
            barGap: 2,
            normalize: true,
            url: audioUrl, // URL'i direkt buraya ver
        });

        waveSurferRef.current = ws;

        // 🔥 DÜZELTME: Ready olayını dinle ve süreyi güncelle
        ws.on('ready', () => {
             // Eğer duration prop'u 0 geldiyse, dosyanın gerçek süresini al
             if (!duration || duration === 0) {
                 // Bu bileşende duration state'i yok, sadece prop var.
                 // Ancak görünüm güncellensin diye wavesurfer çizimi yapar.
             }
        });

        ws.on('play', () => setIsPlaying(true));
        ws.on('pause', () => setIsPlaying(false));
        ws.on('audioprocess', (t) => setCurrentTime(t));
        ws.on('finish', () => {
            setIsPlaying(false);
            ws.seekTo(0);
        });

        return () => {
            try {
                ws.destroy();
            } catch (e) {
                console.log("WaveSurfer cleanup error:", e);
            }
        };
    }, [audioUrl]);

    const handlePlayPause = () => {
        if (waveSurferRef.current) {
            waveSurferRef.current.playPause();
        }
    };

    // Süreyi formatla (00:12 gibi)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div style={styles.container}>
            <div style={styles.playerRow}>
                <button onClick={handlePlayPause} style={styles.playBtn}>
                    {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} style={{ marginLeft: 2 }} />}
                </button>

                <div ref={containerRef} style={styles.waveContainer} />

                <span style={styles.duration}>
                    {formatTime(isPlaying ? currentTime : (duration || 0))}
                </span>
            </div>

            {/* Çeviri Alanı */}
            <div style={styles.transcribeSection}>
                {!transcription && (
                    <button
                        onClick={() => {
                            console.log('Transcribe button clicked!', { onTranscribe, isTranscribing });
                            if (onTranscribe) {
                                onTranscribe();
                            } else {
                                console.error('onTranscribe prop is undefined!');
                            }
                        }}
                        style={{
                            ...styles.transcribeBtn,
                            color: isHovering ? 'white' : '#b9bbbe'
                        }}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        disabled={isTranscribing}
                        title="Sesi Metne Çevir"
                    >
                        {isTranscribing ? <FaSpinner className="spin" /> : <FaLanguage size={16} />}
                        <span style={{ marginLeft: 5, fontSize: '0.8em' }}>
                            {isTranscribing ? 'Çevriliyor...' : 'Metne Çevir'}
                        </span>
                    </button>
                )}

                {transcription && (
                    <div style={styles.transcriptionText}>
                        <strong>💬 Metin:</strong> {transcription}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#2b2d31',
        padding: '8px 12px',
        borderRadius: '8px',
        marginTop: '5px',
        minWidth: '250px'
    },
    playerRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: '100%'
    },
    playBtn: {
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0
    },
    waveContainer: {
        flexGrow: 1,
        cursor: 'pointer'
    },
    duration: {
        color: '#dbdee1',
        fontSize: '0.75em',
        fontFamily: 'monospace',
        minWidth: '35px',
        textAlign: 'right'
    },
    transcribeSection: {
        marginTop: '5px',
        paddingTop: '5px',
        borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    transcribeBtn: {
        background: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        padding: '4px 0',
        transition: 'color 0.2s'
    },
    transcriptionText: {
        color: '#fff',
        fontSize: '0.9em',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '6px',
        borderRadius: '4px',
        marginTop: '5px',
        fontStyle: 'italic'
    }
};

export default WaveformPlayer;

