// frontend/src/components/MessageInput/VoiceRecordingUI.js
import React from 'react';
import PropTypes from 'prop-types';
import { FaMicrophone, FaPaperPlane, FaTimes, FaTrash } from 'react-icons/fa';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const S = {
    txt: { color: 'white', fontSize: '14px' },
};

const VoiceRecordingUI = ({
    isRecording,
    isRecordingLocked,
    recordingTime,
    slideProgress,
    cancelProgress = 0,
    micButtonRef,
    handleMicMouseDown,
    handleMicTouchStart,
    stopRecording,
    cancelRecording,
    formatTime,
    handleSubmit,
    disabled,
    hasContent,
    pendingFilesCount,
}) => {
    const { t } = useTranslation();

    // No content & not recording → show mic button
    if (!hasContent && !isRecording && pendingFilesCount === 0) {
        return (
            <button
                ref={micButtonRef}
                onMouseDown={handleMicMouseDown}
                onTouchStart={handleMicTouchStart}
                style={styles.micButton}
                className="mic-button action-button"
                title={t('basılı_tut_—_yukarı_kaydır_kilitle')}
                aria-label={t('ui.ses_kaydi_baslat_basili_tut')}
                disabled={disabled}
            >
                <FaMicrophone aria-hidden="true" />
            </button>
        );
    }

    // Recording in progress
    if (isRecording) {
        return (
            <div
                style={styles.recordingContainer}
                className="rec-container-glow"
                role="status"
                aria-label={`Ses kaydediliyor: ${formatTime(recordingTime)}`}
            >
                {/* Cancel gesture indicator — trash icon on the left */}
                <div
                    style={{
                        position: 'absolute',
                        left: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        opacity: cancelProgress,
                        transition: 'opacity 0.1s ease',
                        color: cancelProgress > 0.7 ? '#f23f42' : '#949ba4',
                        fontSize: '18px',
                        pointerEvents: 'none',
                    }}
                >
                    <FaTrash />
                </div>

                <div style={styles.waveformBg} className="rec-waveform">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={`item-${i}`}
                            className="rec-wave-bar"
                            style={{
                                animationDelay: `${i * 0.08}>s`,
                                opacity: 0.4 + Math.random() * 0.6,
                            }}
                        />
                    ))}
                </div>

                <div style={styles.recLeft}>
                    <div style={styles.recordingDot} className="rec-pulse" />
                    <span style={styles.recordingTime}>{formatTime(recordingTime)}</span>
                </div>

                {!isRecordingLocked ? (
                    <div style={styles.slideToLock}>
                        <div
                            style={{
                                ...styles.slideMicCircle,
                                backgroundColor:
                                    slideProgress > 0.7
                                        ? '#23a559'
                                        : `rgba(237, 66, 69, ${0.6 + slideProgress * 0.4})`,
                                transform: `scale(${1 + slideProgress * 0.3}) translateY(${-slideProgress * 20}px)`,
                                boxShadow:
                                    slideProgress > 0.5
                                        ? '0 0 12px rgba(67,181,129,0.5)'
                                        : '0 0 8px rgba(237,66,69,0.3)',
                            }}
                        >
                            {slideProgress > 0.7 ? '🔒' : <FaMicrophone style={S.txt} />}
                        </div>
                        <div style={styles.slideTrack}>
                            <div
                                style={{
                                    ...styles.slideTrackFill,
                                    height: `${slideProgress * 100}%`,
                                    backgroundColor: slideProgress > 0.7 ? '#23a559' : '#f23f42',
                                }}
                            />
                        </div>
                        <span
                            style={{
                                ...styles.slideLabel,
                                color: slideProgress > 0.7 ? '#23a559' : '#949ba4',
                            }}
                        >
                            {slideProgress > 0.7 ? t('ui.birak_kilitle') : '↑ Kilitle'}
                        </span>
                    </div>
                ) : (
                    <div style={styles.lockedActions}>
                        {/* Faz 2.3: lock bounce animation on enter */}
                        <span className="voice-locked-enter" style={styles.lockedBadge}>
                            🔒 Kilitlendi
                        </span>
                        <button
                            onClick={cancelRecording}
                            style={styles.cancelRecButton}
                            title={t('cancel')}
                        >
                            <FaTimes /> Cancel
                        </button>
                        <button
                            onClick={stopRecording}
                            style={styles.sendVoiceButton}
                            title={t('send')}
                        >
                            <FaPaperPlane /> Send
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
            title={t('send_enter')}
            aria-label={t('ui.mesaj_gonder')}
            disabled={disabled}
        >
            <FaPaperPlane aria-hidden="true" />
        </button>
    );
};

VoiceRecordingUI.propTypes = {
    isRecording: PropTypes.bool,
    isRecordingLocked: PropTypes.bool,
    recordingTime: PropTypes.bool,
    slideProgress: PropTypes.array,
    cancelProgress: PropTypes.number,
    micButtonRef: PropTypes.func,
    handleMicMouseDown: PropTypes.func,
    handleMicTouchStart: PropTypes.func,
    stopRecording: PropTypes.object,
    cancelRecording: PropTypes.func,
    formatTime: PropTypes.string,
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    hasContent: PropTypes.bool,
    pendingFilesCount: PropTypes.number,
};
export default React.memo(VoiceRecordingUI);
