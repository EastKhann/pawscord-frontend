// frontend/src/components/MessageInput/VoiceRecordingUI.js
import React from 'react';
import { FaMicrophone, FaPaperPlane, FaTimes } from 'react-icons/fa';
import styles from './styles';

const VoiceRecordingUI = ({
    isRecording, isRecordingLocked, recordingTime, slideProgress,
    micButtonRef, handleMicMouseDown, handleMicTouchStart,
    stopRecording, cancelRecording, formatTime,
    handleSubmit, disabled, hasContent, pendingFilesCount
}) => {
    // No content & not recording → show mic button
    if (!hasContent && !isRecording && pendingFilesCount === 0) {
        return (
            <button
                ref={micButtonRef}
                onMouseDown={handleMicMouseDown}
                onTouchStart={handleMicTouchStart}
                style={styles.micButton}
                className="mic-button action-button"
                title="Basılı tut — yukarı kaydır kilitle"
                disabled={disabled}
            >
                <FaMicrophone />
            </button>
        );
    }

    // Recording in progress
    if (isRecording) {
        return (
            <div style={styles.recordingContainer} className="rec-container-glow">
                <div style={styles.waveformBg} className="rec-waveform">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="rec-wave-bar" style={{
                            animationDelay: `${i * 0.08}s`,
                            opacity: 0.4 + Math.random() * 0.6,
                        }} />
                    ))}
                </div>

                <div style={styles.recLeft}>
                    <div style={styles.recordingDot} className="rec-pulse" />
                    <span style={styles.recordingTime}>{formatTime(recordingTime)}</span>
                </div>

                {!isRecordingLocked ? (
                    <div style={styles.slideToLock}>
                        <div style={{
                            ...styles.slideMicCircle,
                            backgroundColor: slideProgress > 0.7 ? '#43b581' : `rgba(237, 66, 69, ${0.6 + slideProgress * 0.4})`,
                            transform: `scale(${1 + slideProgress * 0.3}) translateY(${-slideProgress * 20}px)`,
                            boxShadow: slideProgress > 0.5 ? '0 0 12px rgba(67,181,129,0.5)' : '0 0 8px rgba(237,66,69,0.3)',
                        }}>
                            {slideProgress > 0.7 ? '🔒' : <FaMicrophone style={{ color: 'white', fontSize: '14px' }} />}
                        </div>
                        <div style={styles.slideTrack}>
                            <div style={{
                                ...styles.slideTrackFill,
                                height: `${slideProgress * 100}%`,
                                backgroundColor: slideProgress > 0.7 ? '#43b581' : '#ed4245',
                            }} />
                        </div>
                        <span style={{
                            ...styles.slideLabel,
                            color: slideProgress > 0.7 ? '#43b581' : '#72767d',
                        }}>
                            {slideProgress > 0.7 ? 'Bırak → Kilitle' : '↑ Kilitle'}
                        </span>
                    </div>
                ) : (
                    <div style={styles.lockedActions}>
                        <span style={styles.lockedBadge}>{'🔒'} Kilitlendi</span>
                        <button onClick={cancelRecording} style={styles.cancelRecButton} title="İptal">
                            <FaTimes /> {'İ'}ptal
                        </button>
                        <button onClick={stopRecording} style={styles.sendVoiceButton} title="Gönder">
                            <FaPaperPlane /> G{'ö'}nder
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // Has content → show send button
    return (
        <button
            onClick={handleSubmit}
            style={styles.sendButton}
            title="Gönder (Enter)"
            disabled={disabled}
        >
            <FaPaperPlane />
        </button>
    );
};

export default React.memo(VoiceRecordingUI);
