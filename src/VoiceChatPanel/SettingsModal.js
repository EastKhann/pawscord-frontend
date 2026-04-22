/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styles } from './SettingsModal/settingsModalStyles';
import useMicTest from './SettingsModal/useMicTest';
import useModalA11y from '../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const SettingsModal = ({
    audioSettings,
    vadSensitivity,
    isNoiseSuppressionEnabled,
    screenShareQuality,
    screenShareFPS,
    onClose,
    onSave,
    onVadChange,
    onNoiseToggle,
    onScreenQualityChange,
    onScreenFPSChange,
}) => {
    const { t } = useTranslation();
    const [settings, setSettings] = useState(audioSettings);
    const [tempVadSensitivity, setTempVadSensitivity] = useState(vadSensitivity);
    const [tempScreenQuality, setTempScreenQuality] = useState(screenShareQuality);
    const [tempScreenFPS, setTempScreenFPS] = useState(screenShareFPS);
    const { micLevel, isTesting, setIsTesting } = useMicTest();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Voice Settings' });

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.panel} {...dialogProps}>
                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>{t('voice.audioSettings', '⚙️ Audio Settings')}</h2>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {/* Mic Test */}
                    <div
                        style={{
                            ...styles.section,
                            border: isTesting
                                ? '2px solid #23a559'
                                : '1px solid rgba(255,255,255,0.1)',
                        }}
                    >
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionTitleRow}>{t('voice.microphoneTest', '🎤 Microphone Test')}</div>
                            <div style={styles.descNoMargin}>
                                {t('voice.micTestDesc', 'Test if your microphone is working')}
                            </div>
                        </div>
                        <button
                            aria-label={isTesting ? t('voice.stopTest', 'Stop Test') : t('voice.startTest', 'Start Test')}
                            onClick={() => setIsTesting(!isTesting)}
                            style={styles.testBtn(isTesting)}
                        >
                            {isTesting ? t('settingsModal.stopTest', '⏹️ Stop Test') : t('settingsModal.startTest', '▶️ Start Test')}
                        </button>
                        {isTesting && (
                            <div>
                                <div style={styles.levelBar}>
                                    <div
                                        style={{
                                            height: '100%',
                                            width: `${micLevel}%`,
                                            background:
                                                micLevel > 70
                                                    ? '#23a559'
                                                    : micLevel > 40
                                                        ? '#f0b232'
                                                        : '#f23f42',
                                            borderRadius: '4px',
                                            transition: 'width 0.1s ease',
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        color: micLevel > 10 ? '#23a559' : '#f23f42',
                                        textAlign: 'center',
                                        fontWeight: 600,
                                    }}
                                >
                                    {micLevel > 10
                                        ? t('voice.micWorking', '✅ Your microphone is working!')
                                        : t('voice.speakOrMakeSound', '⚠️ Speak or make a sound')}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Echo Cancellation */}
                    <div style={styles.section}>
                        <label style={styles.checkLabel}>
                            <input
                                type="checkbox"
                                checked={settings.echoCancellation}
                                onChange={(e) =>
                                    setSettings({ ...settings, echoCancellation: e.target.checked })
                                }
                                style={styles.checkbox}
                            />
                            <div>
                                <div style={styles.title}>{t('voice.echoCancellation', '🔊 Echo Cancellation')}</div>
                                <div style={styles.desc}>
                                    {t('voice.echoCancellationDesc', 'Prevents speaker sound from reaching microphone')}
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Noise Suppression */}
                    <div style={styles.section}>
                        <label style={styles.checkLabel}>
                            <input
                                type="checkbox"
                                checked={isNoiseSuppressionEnabled}
                                onChange={() => onNoiseToggle && onNoiseToggle()}
                                style={styles.checkbox}
                            />
                            <div>
                                <div style={styles.title}>{t('voice.noiseSuppression', '🎤️ Noise Suppression')}</div>
                                <div style={styles.desc}>
                                    {t('voice.noiseSuppressionDesc', 'Reduces background noise (keyboard, fan, etc.)')}
                                    <br />
                                    <span>{t('voice.disableWhenSharing', '⚠️ Disable when sharing music!')}</span>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* PTT Mode */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionTitleRow}>{t('voice.audioMode', '🎤️ Audio Mode')}</div>
                            <div style={styles.descNoMargin}>{t('voice.audioModeDesc', 'Voice Activity or Push-to-Talk')}</div>
                        </div>
                        <div>
                            <select
                                value={audioSettings?.pttMode ? 'ptt' : 'voice'}
                                onChange={(e) => {
                                    const isPtt = e.target.value === 'ptt';
                                    setSettings({ ...settings, pttMode: isPtt });
                                    typeof togglePTTMode !== 'undefined' &&
                                        togglePTTMode &&
                                        togglePTTMode();
                                }}
                                style={styles.select}
                            >
                                <option value="voice">{t('voice.voiceActivity', '🎤 Voice Activity (Automatic)')}</option>
                                <option value="ptt">{t('voice.pushToTalk', '⌨️ Push-to-Talk (Hold to speak)')}</option>
                            </select>
                        </div>
                        {audioSettings?.pttMode && (
                            <div>
                                <div>{t('voice.pttKey', '⌨️ PTT Key:')}</div>
                                <select
                                    value={audioSettings?.pttKey || 'Space'}
                                    onChange={(e) => {
                                        setSettings({ ...settings, pttKey: e.target.value });
                                        typeof updatePTTKey !== 'undefined' &&
                                            updatePTTKey &&
                                            updatePTTKey(e.target.value);
                                    }}
                                >
                                    <option value="Space">Space (Spacebar)</option>
                                    <option value="ControlLeft">{t('voice.ctrlLeft', 'Ctrl (Left)')}</option>
                                    <option value="ControlRight">Ctrl (Right)</option>
                                    <option value="ShiftLeft">{t('voice.shiftLeft', 'Shift (Left)')}</option>
                                    <option value="AltLeft">{t('voice.altLeft', 'Alt (Left)')}</option>
                                    <option value="KeyV">V</option>
                                    <option value="KeyC">C</option>
                                </select>
                                <div>{t('voice.pttHoldHint', 'ℹ️ Hold the key to speak')}</div>
                            </div>
                        )}
                    </div>

                    {/* VAD Sensitivity */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionTitleRow}>{t('voice.micSensitivity', '🎚️ Microphone Sensitivity')}</div>
                            <div style={styles.descNoMargin}>
                                {t('voice.micSensitivityDesc', 'Detection threshold (Low = Sensitive, High = Less Sensitive)')}
                            </div>
                        </div>
                        <div>
                            <span>20</span>
                            <input
                                type="range"
                                min="20"
                                max="80"
                                value={tempVadSensitivity}
                                onChange={(e) => {
                                    setTempVadSensitivity(parseInt(e.target.value));
                                    onVadChange && onVadChange(parseInt(e.target.value));
                                }}
                                style={{
                                    flex: 1,
                                    height: '6px',
                                    borderRadius: '3px',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${((tempVadSensitivity - 20) / 60) * 100}%, rgba(255,255,255,0.2) ${((tempVadSensitivity - 20) / 60) * 100}%, rgba(255,255,255,0.2) 100%)`,
                                }}
                            />
                            <span>80</span>
                            <span>{tempVadSensitivity}</span>
                        </div>
                        <div
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                textAlign: 'center',
                                color:
                                    tempVadSensitivity < 35
                                        ? '#ff9800'
                                        : tempVadSensitivity > 60
                                            ? '#ff9800'
                                            : '#23a559',
                            }}
                        >
                            {tempVadSensitivity < 35
                                ? t('voice.tooSensitive', '⚠️ Too sensitive - false positives may occur')
                                : tempVadSensitivity > 60
                                    ? t('voice.lessSensitive', '⚠️ Less sensitive - speech may not be detected')
                                    : t('voice.optimalSensitivity', '✅ Optimal sensitivity')}
                        </div>
                    </div>

                    {/* Screen Share Quality */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionTitleRow}>{t('voice.screenShareQuality', '📺 Screen Share Quality')}</div>
                            <div style={styles.descNoMargin}>
                                {t('voice.highQualityBandwidthDesc', 'High quality = More bandwidth')}
                            </div>
                        </div>
                        <div>
                            <select
                                value={tempScreenQuality}
                                onChange={(e) => {
                                    setTempScreenQuality(e.target.value);
                                    onScreenQualityChange && onScreenQualityChange(e.target.value);
                                }}
                                style={styles.select}
                            >
                                <option value="720p">{t('voice.quality720p', '720p (HD) - Low bandwidth')}</option>
                                <option value="1080p">{t('voice.quality1080p', '1080p (Full HD) - Recommended ✅')}</option>
                                <option value="4K">{t('voice.quality4K', '4K (Ultra HD) - High bandwidth')}</option>
                            </select>
                        </div>
                        <div>
                            <div style={styles.titleSmall}>🎬 FPS: {tempScreenFPS}</div>
                            <input
                                type="range"
                                min="15"
                                max="60"
                                step="15"
                                value={tempScreenFPS}
                                onChange={(e) => {
                                    const v = parseInt(e.target.value);
                                    setTempScreenFPS(v);
                                    onScreenFPSChange && onScreenFPSChange(v);
                                }}
                            />
                        </div>
                        <div
                            style={{
                                fontSize: '12px',
                                textAlign: 'center',
                                color: tempScreenFPS === 30 ? '#23a559' : '#f0b232',
                            }}
                        >
                            {tempScreenFPS === 30
                                ? t('voice.optimalFPS', '✅ Optimal (Recommended)')
                                : tempScreenFPS < 30
                                    ? t('voice.lowFPS', '⚠️ Low FPS')
                                    : t('voice.highBandwidth', '⚠️ High bandwidth')}
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={audioSettings?.includeSystemAudio || false}
                                    onChange={(e) => {
                                        setSettings({
                                            ...settings,
                                            includeSystemAudio: e.target.checked,
                                        });
                                        typeof toggleSystemAudio !== 'undefined' &&
                                            toggleSystemAudio &&
                                            toggleSystemAudio(e.target.checked);
                                    }}
                                />
                                <span>{t('voice.includeSystemAudio', '🔊 Include system audio (Game/Video)')}</span>
                            </label>
                        </div>
                    </div>

                    {/* Auto Gain Control */}
                    <div style={styles.sectionLast}>
                        <label style={styles.checkLabel}>
                            <input
                                type="checkbox"
                                checked={settings.autoGainControl}
                                onChange={(e) =>
                                    setSettings({ ...settings, autoGainControl: e.target.checked })
                                }
                                style={styles.checkbox}
                            />
                            <div>
                                <div style={styles.title}>{t('voice.autoGainControl', '📊 Auto Gain Control')}</div>
                                <div style={styles.desc}>{t('voice.autoGainDesc', 'Automatically adjusts volume')}</div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.cancelBtn}>
                        {t('common.cancel')}
                    </button>
                    <button
                        aria-label={t('common.save', 'Save')}
                        onClick={() => onSave(settings)}
                        style={styles.saveBtn}
                    >
                        {t('common.save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

SettingsModal.propTypes = {
    audioSettings: PropTypes.array,
    vadSensitivity: PropTypes.object,
    isNoiseSuppressionEnabled: PropTypes.func,
    screenShareQuality: PropTypes.object,
    screenShareFPS: PropTypes.array,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    onVadChange: PropTypes.func,
    onNoiseToggle: PropTypes.func,
    onScreenQualityChange: PropTypes.func,
    onScreenFPSChange: PropTypes.func,
};
export default SettingsModal;
