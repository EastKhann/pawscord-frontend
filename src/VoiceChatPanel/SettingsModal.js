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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { micLevel, isTesting, setIsTesting } = useMicTest();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Voice Settings' });

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.panel} {...dialogProps}>
                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>⚙️ Ses Ayarları</h2>
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
                            <div style={styles.sectionTitleRow}>🎤 Mikrofon Testi</div>
                            <div style={styles.descNoMargin}>
                                Mikrofonunuzun çalışıp çalışmadığını test edin
                            </div>
                        </div>
                        <button
                            aria-label={isTesting ? 'Testi durdur' : 'Mikrofon testini başlat'}
                            onClick={() => setIsTesting(!isTesting)}
                            style={styles.testBtn(isTesting)}
                        >
                            {isTesting ? '⏹️ Testi Durdur' : '▶️ Testi Başlat'}
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
                                        ? '✅ Mikrofonunuz çalışıyor!'
                                        : '⚠️ Konuşun veya ses çıkarın'}
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
                                <div style={styles.title}>🔊 Eko İptali</div>
                                <div style={styles.desc}>
                                    Hoparlör sesinin mikrofona ulaşmasını engeller
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
                                <div style={styles.title}>🎤️ Gürültü Bastırma</div>
                                <div style={styles.desc}>
                                    Arka plan gürültüsünü azaltır (klavye, fan, vb.)
                                    <br />
                                    <span>⚠️ Müzik paylaşırken devre dışı bırakın!</span>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* PTT Mode */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionTitleRow}>🎤️ Ses Modu</div>
                            <div style={styles.descNoMargin}>Ses Aktivitesi veya Bas-Konuş</div>
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
                                <option value="voice">🎤 Voice Activity (Otomatik)</option>
                                <option value="ptt">⌨️ Bas-Konuş (Tutarak konuş)</option>
                            </select>
                        </div>
                        {audioSettings?.pttMode && (
                            <div>
                                <div>⌨️ PTT Tuşu:</div>
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
                                    <option value="ControlLeft">Ctrl (Sol)</option>
                                    <option value="ControlRight">Ctrl (Right)</option>
                                    <option value="ShiftLeft">Shift (Sol)</option>
                                    <option value="AltLeft">Alt (Sol)</option>
                                    <option value="KeyV">V</option>
                                    <option value="KeyC">C</option>
                                </select>
                                <div>ℹ️ Konuşmak için tuşu basılı tutun</div>
                            </div>
                        )}
                    </div>

                    {/* VAD Sensitivity */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionTitleRow}>🎚️ Mikrofon Hassasiyeti</div>
                            <div style={styles.descNoMargin}>
                                Ses algılama eşiği (Düşük = Hassas, Yüksek = Az Hassas)
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
                                ? '⚠️ Çok hassas - yanlış pozitifler olabilir'
                                : tempVadSensitivity > 60
                                  ? '⚠️ Az hassas - konuşma algılanmayabilir'
                                  : '✅ Optimal hassasiyet'}
                        </div>
                    </div>

                    {/* Screen Share Quality */}
                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <div style={styles.sectionTitleRow}>📺 Ekran Paylaşım Kalitesi</div>
                            <div style={styles.descNoMargin}>
                                Yüksek kalite = Daha fazla bant genişliği
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
                                <option value="720p">720p (HD) - Az bandwidth</option>
                                <option value="1080p">1080p (Full HD) - Önerilen ✅</option>
                                <option value="4K">4K (Ultra HD) - Yüksek bant genişliği</option>
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
                                ? '✅ Optimal (Önerilen)'
                                : tempScreenFPS < 30
                                  ? '⚠️ Düşük FPS'
                                  : '⚠️ Yüksek bant genişliği'}
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
                                <span>🔊 Sistem sesini dahil et (Oyun/Video sesi)</span>
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
                                <div style={styles.title}>📊 Otomatik Ses Seviyesi</div>
                                <div style={styles.desc}>Ses seviyesini otomatik ayarlar</div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button aria-label="Kapat" onClick={onClose} style={styles.cancelBtn}>
                        {t('common.cancel')}
                    </button>
                    <button
                        aria-label="Kaydet"
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
