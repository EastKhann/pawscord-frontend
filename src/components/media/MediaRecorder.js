/* eslint-disable jsx-a11y/media-has-caption */
// components/MediaRecorder.js
// 🎤🎥 Voice & Video Recorder - WhatsApp-style

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import { FaMicrophone, FaVideo, FaStop, FaTrash, FaPaperPlane, FaDesktop } from 'react-icons/fa';
import './MediaRecorder.css';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const MediaRecorder = ({
    onSend,
    onCancel,
    type = 'audio', // 'audio' | 'video' | 'screen'
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [duration, setDuration] = useState(0);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        return () => {
            stopRecording();
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            let stream;

            if (type === 'audio') {
                stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            } else if (type === 'video') {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 1280, height: 720 },
                    audio: true,
                });
            } else if (type === 'screen') {
                stream = await navigator.mediaDevices.getDisplayMedia({
                    video: { width: 1920, height: 1080 },
                    audio: true,
                });
            }

            streamRef.current = stream;

            // Show preview for video/screen
            if ((type === 'video' || type === 'screen') && videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            const recorder = new window.MediaRecorder(stream, {
                mimeType: type === 'audio' ? 'audio/webm' : 'video/webm',
            });

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, {
                    type: type === 'audio' ? 'audio/webm' : 'video/webm',
                });
                setRecordedBlob(blob);
                setPreviewUrl(URL.createObjectURL(blob));
                chunksRef.current = [];
            };

            mediaRecorderRef.current = recorder;
            recorder.start(100); // Collect data every 100ms
            setIsRecording(true);

            // Start timer
            timerRef.current = setInterval(() => {
                setDuration((prev) => prev + 1);
            }, 1000);
        } catch (error) {
            logger.error(t('ui.kayit_baslatilamadi'), error);
            toast.error(t('ui.mikrofonkamera_erisimi_rejected'));
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        }
    };

    const pauseRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            if (isPaused) {
                mediaRecorderRef.current.resume();
                timerRef.current = setInterval(() => setDuration((prev) => prev + 1), 1000);
            } else {
                mediaRecorderRef.current.pause();
                clearInterval(timerRef.current);
            }
            setIsPaused(!isPaused);
        }
    };

    const handleSend = () => {
        if (recordedBlob) {
            onSend(recordedBlob, duration, type);
            handleCancel();
        }
    };

    const handleCancel = () => {
        stopRecording();
        setRecordedBlob(null);
        setPreviewUrl(null);
        setDuration(0);
        onCancel?.();
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="media-recorder">
            {!isRecording && !recordedBlob ? (
                /* Start Recording */
                <div className="recorder-start">
                    <button
                        aria-label={t('mediaRec.startRecording', 'Start recording')}
                        className="record-btn"
                        onClick={startRecording}
                    >
                        {type === 'audio' && (
                            <>
                                <FaMicrophone /> {t('mediaRec.audio', 'Audio Recording')}
                            </>
                        )}
                        {type === 'video' && (
                            <>
                                <FaVideo /> {t('mediaRec.video', 'Video Recording')}
                            </>
                        )}
                        {type === 'screen' && (
                            <>
                                <FaDesktop /> {t('mediaRec.screen', 'Screen Recording')}
                            </>
                        )}
                    </button>
                </div>
            ) : isRecording ? (
                /* Recording in Progress */
                <div className="recorder-active">
                    {(type === 'video' || type === 'screen') && (
                        <video ref={videoRef} autoPlay muted className="preview-video">
                            <track kind="captions" />
                        </video>
                    )}

                    <div className="recording-controls">
                        <div className="recording-indicator">
                            <div className="recording-dot pulsing" />
                            <span>{formatDuration(duration)}</span>
                        </div>

                        <div className="control-buttons">
                            <button
                                aria-label={isPaused ? t('mediaRec.resumeRecording', 'Resume recording') : t('mediaRec.pauseRecording', 'Pause recording')}
                                onClick={pauseRecording}
                                className="btn-secondary"
                            >
                                {isPaused ? '▶️ Devam' : '⏸️ Duraklat'}
                            </button>
                            <button
                                aria-label={t('mediaRec.stopRecording', 'Stop recording')}
                                onClick={stopRecording}
                                className="btn-stop"
                            >
                                <FaStop /> Stop
                            </button>
                            <button
                                aria-label={t('mediaRec.cancelRecording', 'Cancel recording')}>
                            </button>
                    </div>
                </div>
                </div>
    ) : (
        /* Preview & Send */
        <div className="recorder-preview">
            {type === 'audio' ? (
                <audio src={previewUrl} controls className="preview-audio" />
            ) : (
                <video src={previewUrl} controls className="preview-video">
                    <track kind="captions" />
                </video>
            )}

            <div className="preview-info">
                <span>Duration: {formatDuration(duration)}</span>
                <span>Size: {(recordedBlob.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>

            <div className="preview-actions">
                <button
                    aria-label={t('mediaRec.deleteRecording', 'Delete recording')}>
                        </button>
            <button aria-label={t('mediaRec.sendRecording', 'Send recording')} onClick={handleSend} className="btn-send">
                <FaPaperPlane /> Send
            </button>
        </div>
                </div >
            )}
        </div >
    );
};

export const VoiceMessageButton = ({ onRecord }) => {
    const [isHolding, setIsHolding] = useState(false);
    const holdTimerRef = useRef(null);

    const handleMouseDown = () => {
        holdTimerRef.current = setTimeout(() => {
            setIsHolding(true);
            onRecord?.('start');
        }, 200); // 200ms hold to start
    };

    const handleMouseUp = () => {
        clearTimeout(holdTimerRef.current);
        if (isHolding) {
            onRecord?.('stop');
            setIsHolding(false);
        }
    };

    return (
        <button
            aria-label={t('mediaRec.voiceMessageBtn', 'Hold to record voice message')}
            className={`voice-message-btn ${isHolding ? 'recording' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
        >
            <FaMicrophone />
            {isHolding && <span className="recording-hint">Kaydediliyor...</span>}
        </button>
    );
};

MediaRecorder.propTypes = {
    onSend: PropTypes.func,
    onCancel: PropTypes.func,
    type: PropTypes.string,
};

VoiceMessageButton.propTypes = {
    onRecord: PropTypes.func,
};

export default MediaRecorder;
