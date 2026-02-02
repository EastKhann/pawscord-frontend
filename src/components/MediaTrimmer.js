// frontend/src/components/MediaTrimmer.js

/**
 * ✂️ Video/Audio Trimmer
 * In-app media editing with waveform visualization
 */

import React, { useState, useEffect, useRef } from 'react';
import FaPlay from 'react-icons/fa/FaPlay';
import FaPause from 'react-icons/fa/FaPause';
import FaCut from 'react-icons/fa/FaCut';
import FaSave from 'react-icons/fa/FaSave';
import FaUndo from 'react-icons/fa/FaUndo';
import FaRedo from 'react-icons/fa/FaRedo';

const MediaTrimmer = ({
    mediaUrl,
    mediaType = 'audio', // 'audio' or 'video'
    onSave,
    onCancel
}) => {
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [trimStart, setTrimStart] = useState(0);
    const [trimEnd, setTrimEnd] = useState(0);
    const [waveformData, setWaveformData] = useState([]);
    const [processing, setProcessing] = useState(false);

    const mediaRef = useRef(null);
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);

    useEffect(() => {
        if (mediaUrl) {
            loadMedia();
            if (mediaType === 'audio') {
                generateWaveform();
            }
        }

        return () => {
            cleanup();
        };
    }, [mediaUrl]);

    useEffect(() => {
        if (canvasRef.current && waveformData.length > 0) {
            drawWaveform();
        }
    }, [waveformData, trimStart, trimEnd, currentTime]);

    const loadMedia = () => {
        const media = mediaRef.current;
        if (!media) return;

        media.addEventListener('loadedmetadata', () => {
            setDuration(media.duration);
            setTrimEnd(media.duration);
        });

        media.addEventListener('timeupdate', () => {
            setCurrentTime(media.currentTime);
        });

        media.addEventListener('ended', () => {
            setPlaying(false);
            media.currentTime = trimStart;
        });
    };

    const generateWaveform = async () => {
        try {
            const response = await fetch(mediaUrl);
            const arrayBuffer = await response.arrayBuffer();

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;

            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const rawData = audioBuffer.getChannelData(0);

            // Sample the data to get ~1000 points
            const samples = 1000;
            const blockSize = Math.floor(rawData.length / samples);
            const filteredData = [];

            for (let i = 0; i < samples; i++) {
                let blockStart = blockSize * i;
                let sum = 0;

                for (let j = 0; j < blockSize; j++) {
                    sum += Math.abs(rawData[blockStart + j]);
                }

                filteredData.push(sum / blockSize);
            }

            // Normalize
            const max = Math.max(...filteredData);
            const normalizedData = filteredData.map(n => n / max);

            setWaveformData(normalizedData);
        } catch (error) {
            console.error('Waveform generation failed:', error);
        }
    };

    const drawWaveform = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.fillStyle = '#202225';
        ctx.fillRect(0, 0, width, height);

        // Draw waveform
        const barWidth = width / waveformData.length;
        const centerY = height / 2;

        waveformData.forEach((value, index) => {
            const x = index * barWidth;
            const barHeight = value * (height / 2);
            const progress = (index / waveformData.length) * duration;

            // Determine color
            let color = '#4e5058'; // Default (not selected)

            if (progress >= trimStart && progress <= trimEnd) {
                color = '#5865f2'; // Selected region
            }

            if (progress < currentTime && progress >= trimStart && progress <= trimEnd) {
                color = '#3ba55d'; // Played region
            }

            ctx.fillStyle = color;
            ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight * 2);
        });

        // Draw trim markers
        const startX = (trimStart / duration) * width;
        const endX = (trimEnd / duration) * width;

        // Start marker
        ctx.fillStyle = '#faa61a';
        ctx.fillRect(startX - 2, 0, 4, height);

        // End marker
        ctx.fillStyle = '#f04747';
        ctx.fillRect(endX - 2, 0, 4, height);

        // Playhead
        const playheadX = (currentTime / duration) * width;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(playheadX - 1, 0, 2, height);
    };

    const togglePlayPause = () => {
        const media = mediaRef.current;
        if (!media) return;

        if (playing) {
            media.pause();
        } else {
            // Ensure playback stays within trim range
            if (media.currentTime < trimStart || media.currentTime > trimEnd) {
                media.currentTime = trimStart;
            }
            media.play();
        }

        setPlaying(!playing);
    };

    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current;
        const media = mediaRef.current;
        if (!canvas || !media) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const clickTime = (x / canvas.width) * duration;

        media.currentTime = Math.max(trimStart, Math.min(trimEnd, clickTime));
    };

    const handleCanvasDrag = (e) => {
        if (e.buttons !== 1) return; // Only on left mouse button

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const dragTime = (x / canvas.width) * duration;

        // Snap to nearest marker (start/end)
        const snapThreshold = duration * 0.02; // 2% of duration

        if (Math.abs(dragTime - trimStart) < snapThreshold) {
            setTrimStart(Math.max(0, dragTime));
        } else if (Math.abs(dragTime - trimEnd) < snapThreshold) {
            setTrimEnd(Math.min(duration, dragTime));
        }
    };

    const trimMedia = async () => {
        setProcessing(true);

        try {
            // For audio: use Web Audio API to trim
            if (mediaType === 'audio') {
                const trimmedBlob = await trimAudio();
                onSave(trimmedBlob);
            } else {
                // For video: send to backend for processing
                const response = await fetch('/api/media/trim/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        media_url: mediaUrl,
                        start_time: trimStart,
                        end_time: trimEnd
                    })
                });

                if (response.ok) {
                    const blob = await response.blob();
                    onSave(blob);
                }
            }
        } catch (error) {
            console.error('Trim failed:', error);
            toast.error('❌ Kesme işlemi başarısız');
        } finally {
            setProcessing(false);
        }
    };

    const trimAudio = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(mediaUrl);
                const arrayBuffer = await response.arrayBuffer();

                const audioContext = new AudioContext();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                // Calculate sample positions
                const sampleRate = audioBuffer.sampleRate;
                const startSample = Math.floor(trimStart * sampleRate);
                const endSample = Math.floor(trimEnd * sampleRate);
                const trimmedLength = endSample - startSample;

                // Create new buffer with trimmed data
                const trimmedBuffer = audioContext.createBuffer(
                    audioBuffer.numberOfChannels,
                    trimmedLength,
                    sampleRate
                );

                for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                    const sourceData = audioBuffer.getChannelData(channel);
                    const trimmedData = trimmedBuffer.getChannelData(channel);

                    for (let i = 0; i < trimmedLength; i++) {
                        trimmedData[i] = sourceData[startSample + i];
                    }
                }

                // Convert to WAV blob
                const wavBlob = audioBufferToWav(trimmedBuffer);
                resolve(wavBlob);
            } catch (error) {
                reject(error);
            }
        });
    };

    const audioBufferToWav = (buffer) => {
        const length = buffer.length * buffer.numberOfChannels * 2 + 44;
        const arrayBuffer = new ArrayBuffer(length);
        const view = new DataView(arrayBuffer);
        const channels = [];
        let offset = 0;
        let pos = 0;

        // Write WAV header
        const setUint16 = (data) => {
            view.setUint16(pos, data, true);
            pos += 2;
        };

        const setUint32 = (data) => {
            view.setUint32(pos, data, true);
            pos += 4;
        };

        // "RIFF" chunk descriptor
        setUint32(0x46464952);
        setUint32(length - 8);
        setUint32(0x45564157);

        // "fmt" sub-chunk
        setUint32(0x20746d66);
        setUint32(16);
        setUint16(1);
        setUint16(buffer.numberOfChannels);
        setUint32(buffer.sampleRate);
        setUint32(buffer.sampleRate * 2 * buffer.numberOfChannels);
        setUint16(buffer.numberOfChannels * 2);
        setUint16(16);

        // "data" sub-chunk
        setUint32(0x61746164);
        setUint32(length - pos - 4);

        // Write interleaved data
        for (let i = 0; i < buffer.numberOfChannels; i++) {
            channels.push(buffer.getChannelData(i));
        }

        while (pos < length) {
            for (let i = 0; i < buffer.numberOfChannels; i++) {
                let sample = Math.max(-1, Math.min(1, channels[i][offset]));
                sample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
                view.setInt16(pos, sample, true);
                pos += 2;
            }
            offset++;
        }

        return new Blob([arrayBuffer], { type: 'audio/wav' });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const cleanup = () => {
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.title}>
                    <FaCut style={{ marginRight: '8px' }} />
                    {mediaType === 'audio' ? 'Ses' : 'Video'} Düzenleyici
                </h2>
            </div>

            {/* Media Player */}
            <div style={styles.mediaContainer}>
                {mediaType === 'video' ? (
                    <video
                        ref={mediaRef}
                        src={mediaUrl}
                        style={styles.video}
                        controls={false}
                    />
                ) : (
                    <audio
                        ref={mediaRef}
                        src={mediaUrl}
                        style={{ display: 'none' }}
                    />
                )}
            </div>

            {/* Waveform/Timeline */}
            <div style={styles.waveformContainer}>
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={120}
                    style={styles.canvas}
                    onClick={handleCanvasClick}
                    onMouseMove={handleCanvasDrag}
                />
            </div>

            {/* Time Display */}
            <div style={styles.timeDisplay}>
                <span>{formatTime(trimStart)}</span>
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                <span>{formatTime(trimEnd)}</span>
            </div>

            {/* Controls */}
            <div style={styles.controls}>
                <button onClick={togglePlayPause} style={styles.playButton}>
                    {playing ? <FaPause /> : <FaPlay />}
                </button>

                <div style={styles.trimControls}>
                    <div style={styles.trimInput}>
                        <label style={styles.label}>Başlangıç</label>
                        <input
                            type="number"
                            min={0}
                            max={trimEnd}
                            step={0.1}
                            value={trimStart.toFixed(1)}
                            onChange={(e) => setTrimStart(parseFloat(e.target.value))}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.trimInput}>
                        <label style={styles.label}>Bitiş</label>
                        <input
                            type="number"
                            min={trimStart}
                            max={duration}
                            step={0.1}
                            value={trimEnd.toFixed(1)}
                            onChange={(e) => setTrimEnd(parseFloat(e.target.value))}
                            style={styles.input}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.actions}>
                <button onClick={onCancel} style={styles.cancelButton}>
                    İptal
                </button>
                <button
                    onClick={trimMedia}
                    disabled={processing}
                    style={styles.saveButton}
                >
                    <FaSave style={{ marginRight: '8px' }} />
                    {processing ? 'İşleniyor...' : 'Kaydet'}
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '850px',
        margin: '0 auto'
    },
    header: {
        marginBottom: '20px'
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#fff'
    },
    mediaContainer: {
        marginBottom: '20px',
        backgroundColor: '#202225',
        borderRadius: '6px',
        overflow: 'hidden'
    },
    video: {
        width: '100%',
        maxHeight: '400px',
        display: 'block'
    },
    waveformContainer: {
        marginBottom: '12px',
        backgroundColor: '#202225',
        borderRadius: '6px',
        overflow: 'hidden'
    },
    canvas: {
        width: '100%',
        height: 'auto',
        display: 'block',
        cursor: 'pointer'
    },
    timeDisplay: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        fontSize: '13px',
        color: '#b9bbbe',
        fontFamily: 'monospace'
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #40444b'
    },
    playButton: {
        width: '50px',
        height: '50px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '50%',
        color: '#fff',
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    },
    trimControls: {
        display: 'flex',
        gap: '16px',
        flex: 1
    },
    trimInput: {
        flex: 1
    },
    label: {
        display: 'block',
        marginBottom: '6px',
        fontSize: '12px',
        fontWeight: '600',
        color: '#b9bbbe',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        fontFamily: 'monospace'
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px'
    },
    cancelButton: {
        padding: '10px 24px',
        backgroundColor: 'transparent',
        border: '1px solid #4e5058',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer'
    },
    saveButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 24px',
        backgroundColor: '#3ba55d',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer'
    }
};

export default MediaTrimmer;


