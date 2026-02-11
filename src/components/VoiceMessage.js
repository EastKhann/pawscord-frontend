import { useState, useEffect, useRef } from 'react';
import './VoiceMessage.css';
import toast from '../utils/toast';

/**
 * Voice Message Recorder Component with Hold-to-Record and Swipe-to-Lock
 */
const VoiceMessage = ({ onSend, onCancel }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [waveformData, setWaveformData] = useState([]);

    // Touch/Mouse tracking for swipe-to-lock
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [swipeDistance, setSwipeDistance] = useState(0);
    const recordButtonRef = useRef(null);

    const SWIPE_LOCK_THRESHOLD = -80; // 80px yukarı kaydırınca kilitle

    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
                // Generate waveform visualization
                updateWaveform();
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                setAudioBlob(blob);
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start(100); // Collect data every 100ms
            setMediaRecorder(recorder);
            setIsRecording(true);
            setIsLocked(false);
            setRecordingTime(0);
        } catch (error) {
            console.error('Microphone access error:', error);
            toast.error('❌ Mikrofon erişimi reddedildi');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
            setIsLocked(false);
        }
    };

    const cancelRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
        }
        setIsRecording(false);
        setIsLocked(false);
        setAudioBlob(null);
        setRecordingTime(0);
        setWaveformData([]);
        setSwipeDistance(0);
        onCancel?.();
    };

    // 🎯 MOUSE/TOUCH EVENT HANDLERS
    const handleRecordStart = (e) => {
        e.preventDefault();
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setStartY(clientY);
        setCurrentY(clientY);
        setSwipeDistance(0);
        startRecording();
    };

    const handleRecordMove = (e) => {
        if (!isRecording || isLocked) return;

        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        setCurrentY(clientY);
        const distance = clientY - startY;
        setSwipeDistance(distance);

        // Yukarı kaydırma mesafesi threshold'u geçti mi?
        if (distance < SWIPE_LOCK_THRESHOLD) {
            setIsLocked(true);
            toast.success('🔒 Kayıt kilitlendi');
        }
    };

    const handleRecordEnd = (e) => {
        e.preventDefault();

        // Eğer kilitli değilse, kaydı durdur (iptal et)
        if (!isLocked && isRecording) {
            cancelRecording();
            toast.info('Kayıt iptal edildi');
        }

        setSwipeDistance(0);
    };

    const sendVoiceMessage = () => {
        if (audioBlob) {
            onSend?.(audioBlob, recordingTime);
            setAudioBlob(null);
            setRecordingTime(0);
            setWaveformData([]);
        }
    };

    const updateWaveform = () => {
        // Simple random waveform visualization
        setWaveformData(prev => {
            const newData = [...prev, Math.random() * 100];
            return newData.slice(-50); // Keep last 50 samples
        });
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="voice-message-container">
            {!isRecording && !audioBlob && (
                <button
                    ref={recordButtonRef}
                    className="btn-start-recording"
                    onMouseDown={handleRecordStart}
                    onMouseMove={handleRecordMove}
                    onMouseUp={handleRecordEnd}
                    onMouseLeave={handleRecordEnd}
                    onTouchStart={handleRecordStart}
                    onTouchMove={handleRecordMove}
                    onTouchEnd={handleRecordEnd}
                    style={{
                        cursor: 'pointer',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        touchAction: 'none'
                    }}
                >
                    <span className="mic-icon">🎤</span>
                    <span>Basılı Tut</span>
                </button>
            )}

            {isRecording && (
                <div className="recording-ui">
                    {/* Swipe-to-Lock Indicator */}
                    {!isLocked && (
                        <div
                            className="swipe-indicator"
                            style={{
                                opacity: Math.max(0, Math.min(1, -swipeDistance / 80)),
                                transform: `translateY(${Math.max(swipeDistance, -100)}px)`
                            }}
                        >
                            <div className="lock-icon">🔒</div>
                            <div className="swipe-text">Yukarı kaydır</div>
                        </div>
                    )}

                    {isLocked && (
                        <div className="locked-indicator">
                            <span className="lock-icon">🔒</span>
                            <span>Kilitli</span>
                        </div>
                    )}

                    <div className="waveform">
                        {waveformData.map((value, index) => (
                            <div
                                key={index}
                                className="waveform-bar"
                                style={{ height: `${value}%` }}
                            />
                        ))}
                    </div>

                    <div className="recording-info">
                        <span className="recording-indicator">🔴</span>
                        <span className="recording-time">{formatTime(recordingTime)}</span>
                    </div>

                    <div className="recording-controls">
                        <button
                            className="btn-cancel"
                            onClick={cancelRecording}
                        >
                            İptal
                        </button>
                        {isLocked && (
                            <button
                                className="btn-stop"
                                onClick={stopRecording}
                            >
                                Durdur
                            </button>
                        )}
                    </div>
                </div>
            )}

            {audioBlob && !isRecording && (
                <div className="preview-ui">
                    <audio controls src={URL.createObjectURL(audioBlob)} />
                    <div className="preview-info">
                        <span>Sesli mesaj • {formatTime(recordingTime)}</span>
                    </div>
                    <div className="preview-controls">
                        <button
                            className="btn-cancel"
                            onClick={cancelRecording}
                        >
                            Sil
                        </button>
                        <button
                            className="btn-send"
                            onClick={sendVoiceMessage}
                        >
                            Gönder 📤
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceMessage;


