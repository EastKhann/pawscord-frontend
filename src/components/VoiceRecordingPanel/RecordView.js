/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    FaMicrophone,
    FaPlay,
    FaPause,
    FaStop,
    FaTrash,
    FaFileAudio,
    FaCircle,
    FaSave,
} from 'react-icons/fa';
const _s = (o) => o;
import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';
const RecordView = ({
    isRecording,
    isPaused,
    recordingTime,
    audioLevel,
    currentRecording,
    onStart,
    onStop,
    onPause,
    onSave,
    onDiscard,
    formatTime,
}) => {
    const { t } = useTranslation();
    const [saveName, setSaveName] = useState('');
    const [showSaveModal, setShowSaveModal] = useState(false);

    const handleSave = () => {
        if (!saveName.trim()) {
            toast.error(t('ui.kayit_adi_gerekli'));
            return;
        }
        onSave(saveName);
        setShowSaveModal(false);
        setSaveName('');
    };

    return (
        <div className="record-view">
            {!currentRecording ? (
                <>
                    <div className="recording-visualizer">
                        <div className="waveform">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={`item-${i}`}
                                    className={`bar ${isRecording ? 'active' : ''}`}
                                    style={_s({
                                        height: isRecording
                                            ? `${Math.random() * audioLevel + 10}%`
                                            : '10%',
                                        animationDelay: `${i * 0.05}s`,
                                    })}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="recording-timer">
                        <FaCircle
                            className={`recording-indicator ${isRecording && !isPaused ? 'active' : ''}`}
                        />
                        <span className="time">{formatTime(recordingTime)}</span>
                    </div>

                    <div className="recording-controls">
                        {!isRecording ? (
                            <button className="record-btn" onClick={onStart}>
                                <FaMicrophone />
                                <span>{t('kayda_başla')}</span>
                            </button>
                        ) : (
                            <>
                                <button className="control-btn pause" onClick={onPause}>
                                    {isPaused ? <FaPlay /> : <FaPause />}
                                </button>
                                <button className="control-btn stop" onClick={onStop}>
                                    <FaStop />
                                </button>
                            </>
                        )}
                    </div>

                    {isRecording && (
                        <div className="recording-tips">
                            <p>{t('🎤_kayıt_devam_ediyor')}</p>
                            <p>{t('stopmak_for_stop_butonuna_basın')}</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="recording-preview">
                    <div className="preview-icon">
                        <FaFileAudio />
                    </div>
                    <h3>{t('kayıt_completed')}</h3>
                    <p>Duration: {formatTime(currentRecording.duration)}</p>
                    <audio src={currentRecording.url} controls className="audio-preview" />
                    <div className="preview-actions">
                        <button className="discard-btn" onClick={onDiscard}>
                            <FaTrash />
                            {t('cancel')}
                        </button>
                        <button className="save-btn" onClick={() => setShowSaveModal(true)}>
                            <FaSave />
                            {t('save')}
                        </button>
                    </div>
                </div>
            )}

            {showSaveModal && (
                <div
                    className="save-modal-overlay"
                    role="button"
                    tabIndex={0}
                    onClick={(e) =>
                        e.target.className === 'save-modal-overlay' && setShowSaveModal(false)
                    }
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div
                        className="save-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label={t('voiceRecording.saveRecording', 'Save recording')}
                    >
                        <h3>{t('kaydı_save')}</h3>
                        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                        <input
                            type="text"
                            placeholder={t('kayıt_adı')}
                            value={saveName}
                            onChange={(e) => setSaveName(e.target.value)}
                            autoFocus
                        />
                        <div className="modal-actions">
                            <button onClick={() => setShowSaveModal(false)}>
                                {t('common.cancel')}
                            </button>
                            <button className="primary" onClick={handleSave}>
                                {t('common.save')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

RecordView.propTypes = {
    isRecording: PropTypes.bool,
    isPaused: PropTypes.bool,
    recordingTime: PropTypes.bool,
    audioLevel: PropTypes.object,
    currentRecording: PropTypes.object,
    onStart: PropTypes.func,
    onStop: PropTypes.func,
    onPause: PropTypes.func,
    onSave: PropTypes.func,
    onDiscard: PropTypes.func,
    formatTime: PropTypes.string,
};
export default RecordView;
