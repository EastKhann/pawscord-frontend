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
                title="Bas\u0131l\u0131 tut \u2014 yukar\u0131 kayd\u0131r kilitle"
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
                            {slideProgress > 0.7 ? '\uD83D\uDD12' : <FaMicrophone style={{ color: 'white', fontSize: '14px' }} />}
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
                            {slideProgress > 0.7 ? 'B\u0131rak \u2192 Kilitle' : '\u2191 Kilitle'}
                        </span>
                    </div>
                ) : (
                    <div style={styles.lockedActions}>
                        <span style={styles.lockedBadge}>{'\uD83D\uDD12'} Kilitlendi</span>
                        <button onClick={cancelRecording} style={styles.cancelRecButton} title="\u0130ptal">
                            <FaTimes /> {'\u0130'}ptal
                        </button>
                        <button onClick={stopRecording} style={styles.sendVoiceButton} title="G\u00F6nder">
                            <FaPaperPlane /> G{'\u00F6'}nder
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
            title="G\u00F6nder (Enter)"
            disabled={disabled}
        >
            <FaPaperPlane />
        </button>
    );
};

export default React.memo(VoiceRecordingUI);
