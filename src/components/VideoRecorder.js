// frontend/src/components/VideoRecorder.js
import React, { useState, useRef, useEffect } from 'react';
import { FaVideo, FaStop, FaPause, FaPlay, FaDownload, FaTrash, FaMicrophone, FaVideoSlash } from 'react-icons/fa';
import toast from '../utils/toast';

const VideoRecorder = ({ onClose, onSave }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [micEnabled, setMicEnabled] = useState(true);

    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
            // 🔥 FIX: Clear timer interval on unmount to prevent memory leak
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 },
                audio: true
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Camera error:', error);
            toast.error('❌ Kamera erişimi reddedildi');
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    const startRecording = () => {
        if (!streamRef.current) return;

        const options = { mimeType: 'video/webm;codecs=vp9' };
        const mediaRecorder = new MediaRecorder(streamRef.current, options);
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            setRecordedBlob(blob);
            setRecordedChunks(chunks);
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
        setRecordingTime(0);

        timerRef.current = setInterval(() => {
            setRecordingTime(prev => prev + 1);
        }, 1000);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPaused(false);
            clearInterval(timerRef.current);
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

    const downloadRecording = () => {
        if (recordedBlob) {
            const url = URL.createObjectURL(recordedBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `recording-${Date.now()}.webm`;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const saveRecording = () => {
        if (recordedBlob && onSave) {
            onSave(recordedBlob);
            onClose();
        }
    };

    const discardRecording = () => {
        if (confirm('Kaydı silmek istediğinize emin misiniz?')) {
            setRecordedBlob(null);
            setRecordedChunks([]);
            setRecordingTime(0);
        }
    };

    const toggleCamera = () => {
        if (streamRef.current) {
            const videoTrack = streamRef.current.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            setCameraEnabled(videoTrack.enabled);
        }
    };

    const toggleMic = () => {
        if (streamRef.current) {
            const audioTrack = streamRef.current.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setMicEnabled(audioTrack.enabled);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Video Kaydı</h2>
                    <button onClick={onClose} style={styles.closeButton}>×</button>
                </div>

                <div style={styles.content}>
                    <div style={styles.videoContainer}>
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            style={styles.video}
                        />
                        {isRecording && (
                            <div style={styles.recordingIndicator}>
                                <div style={styles.recDot} />
                                <span>REC {formatTime(recordingTime)}</span>
                            </div>
                        )}
                    </div>

                    <div style={styles.controls}>
                        {!recordedBlob ? (
                            <>
                                <button
                                    onClick={toggleCamera}
                                    style={{
                                        ...styles.controlButton,
                                        backgroundColor: cameraEnabled ? '#36393f' : '#ed4245'
                                    }}
                                >
                                    {cameraEnabled ? <FaVideo size={18} /> : <FaVideoSlash size={18} />}
                                </button>

                                <button
                                    onClick={toggleMic}
                                    style={{
                                        ...styles.controlButton,
                                        backgroundColor: micEnabled ? '#36393f' : '#ed4245'
                                    }}
                                >
                                    <FaMicrophone size={18} />
                                </button>

                                {!isRecording ? (
                                    <button onClick={startRecording} style={styles.recordButton}>
                                        <FaVideo size={20} />
                                        <span>Kayda Başla</span>
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={pauseRecording} style={styles.pauseButton}>
                                            {isPaused ? <FaPlay size={18} /> : <FaPause size={18} />}
                                        </button>
                                        <button onClick={stopRecording} style={styles.stopButton}>
                                            <FaStop size={18} />
                                            <span>Durdur</span>
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <button onClick={discardRecording} style={styles.discardButton}>
                                    <FaTrash size={16} />
                                    <span>Sil</span>
                                </button>
                                <button onClick={downloadRecording} style={styles.downloadButton}>
                                    <FaDownload size={16} />
                                    <span>İndir</span>
                                </button>
                                <button onClick={saveRecording} style={styles.saveButton}>
                                    <span>Gönder</span>
                                </button>
                            </>
                        )}
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
        maxWidth: '800px',
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
        fontSize: '28px'
    },
    content: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
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
        objectFit: 'contain'
    },
    recordingIndicator: {
        position: 'absolute',
        top: '16px',
        left: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '8px 12px',
        borderRadius: '20px',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    recDot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#ed4245',
        animation: 'pulse 1.5s infinite'
    },
    controls: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    controlButton: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#36393f',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s'
    },
    recordButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#ed4245',
        color: '#ffffff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '24px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    pauseButton: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#faa61a',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    stopButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#ed4245',
        color: '#ffffff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '24px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    discardButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#ed4245',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    downloadButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#36393f',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    saveButton: {
        backgroundColor: '#3ba55d',
        color: '#ffffff',
        border: 'none',
        padding: '10px 24px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    }
};

export default VideoRecorder;



