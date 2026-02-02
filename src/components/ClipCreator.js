// frontend/src/components/ClipCreator.js
import React, { useState, useRef, useEffect } from 'react';
import { FaScissors, FaPlay, FaPause, FaCut, FaDownload, FaTimes } from 'react-icons/fa';
import toast from '../utils/toast';

const ClipCreator = ({ videoUrl, onClose, onSave }) => {
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(30);
    const [clipName, setClipName] = useState('');

    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
            setEndTime(Math.min(30, video.duration));
        };

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (playing) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setPlaying(!playing);
        }
    };

    const seekTo = (time) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const setStart = () => {
        setStartTime(currentTime);
        if (currentTime >= endTime) {
            setEndTime(Math.min(currentTime + 30, duration));
        }
    };

    const setEnd = () => {
        setEndTime(currentTime);
        if (currentTime <= startTime) {
            setStartTime(Math.max(0, currentTime - 30));
        }
    };

    const createClip = async () => {
        if (!clipName.trim()) {
            toast.error('❌ Lütfen clip için bir isim girin');
            return;
        }

        // Create clip using canvas and MediaRecorder
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        video.currentTime = startTime;

        const stream = canvas.captureStream();
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            if (onSave) {
                onSave({
                    blob,
                    name: clipName,
                    startTime,
                    endTime,
                    duration: endTime - startTime
                });
            }
        };

        mediaRecorder.start();

        const drawFrame = () => {
            if (video.currentTime < endTime) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                requestAnimationFrame(drawFrame);
            } else {
                mediaRecorder.stop();
                video.pause();
            }
        };

        video.play();
        drawFrame();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaScissors size={20} color="#5865f2" />
                        <h2 style={styles.title}>Clip Oluştur</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes size={20} />
                    </button>
                </div>

                <div style={styles.content}>
                    {/* Video Player */}
                    <div style={styles.videoContainer}>
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            style={styles.video}
                            onClick={togglePlay}
                        />
                        <button onClick={togglePlay} style={styles.playButton}>
                            {playing ? <FaPause size={32} /> : <FaPlay size={32} />}
                        </button>
                    </div>

                    {/* Timeline */}
                    <div style={styles.timeline}>
                        <div style={styles.timeDisplay}>{formatTime(currentTime)}</div>
                        <div style={styles.timelineTrack}>
                            {/* Progress bar */}
                            <div
                                style={{
                                    ...styles.timelineProgress,
                                    width: `${(currentTime / duration) * 100}%`
                                }}
                            />
                            {/* Selection range */}
                            <div
                                style={{
                                    ...styles.selectionRange,
                                    left: `${(startTime / duration) * 100}%`,
                                    width: `${((endTime - startTime) / duration) * 100}%`
                                }}
                            />
                            {/* Seek slider */}
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                step="0.1"
                                value={currentTime}
                                onChange={(e) => seekTo(parseFloat(e.target.value))}
                                style={styles.seekSlider}
                            />
                        </div>
                        <div style={styles.timeDisplay}>{formatTime(duration)}</div>
                    </div>

                    {/* Clip Controls */}
                    <div style={styles.clipControls}>
                        <div style={styles.controlGroup}>
                            <label style={styles.label}>Başlangıç:</label>
                            <div style={styles.timeControl}>
                                <input
                                    type="number"
                                    value={Math.floor(startTime)}
                                    onChange={(e) => setStartTime(parseFloat(e.target.value))}
                                    style={styles.timeInput}
                                    min="0"
                                    max={duration}
                                />
                                <button onClick={setStart} style={styles.setButton}>
                                    <FaCut size={14} />
                                    <span>Ayarla</span>
                                </button>
                            </div>
                        </div>

                        <div style={styles.controlGroup}>
                            <label style={styles.label}>Bitiş:</label>
                            <div style={styles.timeControl}>
                                <input
                                    type="number"
                                    value={Math.floor(endTime)}
                                    onChange={(e) => setEndTime(parseFloat(e.target.value))}
                                    style={styles.timeInput}
                                    min="0"
                                    max={duration}
                                />
                                <button onClick={setEnd} style={styles.setButton}>
                                    <FaCut size={14} />
                                    <span>Ayarla</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Clip Info */}
                    <div style={styles.clipInfo}>
                        <input
                            type="text"
                            placeholder="Clip adı"
                            value={clipName}
                            onChange={(e) => setClipName(e.target.value)}
                            style={styles.clipNameInput}
                        />
                        <div style={styles.clipDuration}>
                            Süre: {formatTime(endTime - startTime)}
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={styles.actions}>
                        <button onClick={onClose} style={styles.cancelButton}>
                            İptal
                        </button>
                        <button onClick={createClip} style={styles.createButton}>
                            <FaScissors size={16} />
                            <span>Clip Oluştur</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
    },
    panel: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderBottom: '1px solid #202225'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    title: {
        margin: 0,
        fontSize: '18px',
        color: '#ffffff'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px'
    },
    content: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflowY: 'auto'
    },
    videoContainer: {
        position: 'relative',
        backgroundColor: '#000000',
        borderRadius: '8px',
        overflow: 'hidden',
        aspectRatio: '16/9'
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        cursor: 'pointer'
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: '#ffffff',
        border: 'none',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s'
    },
    timeline: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    timeDisplay: {
        color: '#dcddde',
        fontSize: '14px',
        fontFamily: 'monospace',
        minWidth: '45px'
    },
    timelineTrack: {
        flex: 1,
        height: '32px',
        backgroundColor: '#202225',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden'
    },
    timelineProgress: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: '#5865f2',
        opacity: 0.3,
        pointerEvents: 'none'
    },
    selectionRange: {
        position: 'absolute',
        top: 0,
        height: '100%',
        backgroundColor: '#3ba55d',
        opacity: 0.4,
        pointerEvents: 'none'
    },
    seekSlider: {
        width: '100%',
        height: '100%',
        opacity: 0,
        cursor: 'pointer',
        position: 'relative',
        zIndex: 1
    },
    clipControls: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
    },
    controlGroup: {
        flex: 1,
        minWidth: '200px'
    },
    label: {
        color: '#b9bbbe',
        fontSize: '13px',
        marginBottom: '8px',
        display: 'block'
    },
    timeControl: {
        display: 'flex',
        gap: '8px'
    },
    timeInput: {
        flex: 1,
        backgroundColor: '#202225',
        border: 'none',
        color: '#dcddde',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '14px',
        outline: 'none'
    },
    setButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: '#36393f',
        color: '#ffffff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px'
    },
    clipInfo: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
    },
    clipNameInput: {
        flex: 1,
        backgroundColor: '#202225',
        border: 'none',
        color: '#dcddde',
        padding: '10px 12px',
        borderRadius: '4px',
        fontSize: '14px',
        outline: 'none'
    },
    clipDuration: {
        color: '#b9bbbe',
        fontSize: '14px',
        fontFamily: 'monospace'
    },
    actions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end'
    },
    cancelButton: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    createButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold'
    }
};

export default ClipCreator;



