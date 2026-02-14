import React, { useState } from 'react';
import { styles } from './SettingsModal/settingsModalStyles';
import useMicTest from './SettingsModal/useMicTest';

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
  onScreenFPSChange
}) => {
  const [settings, setSettings] = useState(audioSettings);
  const [tempVadSensitivity, setTempVadSensitivity] = useState(vadSensitivity);
  const [tempScreenQuality, setTempScreenQuality] = useState(screenShareQuality);
  const [tempScreenFPS, setTempScreenFPS] = useState(screenShareFPS);
  const { micLevel, isTesting, setIsTesting } = useMicTest();

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>\u2699\ufe0f Ses Ayarlar\u0131</h2>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Mic Test */}
          <div style={{ ...styles.section, border: isTesting ? '2px solid #43b581' : '1px solid rgba(255,255,255,0.1)' }}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionTitleRow}>\ud83c\udfa4 Mikrofon Testi</div>
              <div style={styles.descNoMargin}>Mikrofonunuzun \u00e7al\u0131\u015f\u0131p \u00e7al\u0131\u015fmad\u0131\u011f\u0131n\u0131 test edin</div>
            </div>
            <button onClick={() => setIsTesting(!isTesting)} style={styles.testBtn(isTesting)}>
              {isTesting ? '\u23f9\ufe0f Testi Durdur' : '\u25b6\ufe0f Testi Ba\u015flat'}
            </button>
            {isTesting && (
              <div>
                <div style={styles.levelBar}>
                  <div style={{
                    height: '100%', width: `${micLevel}%`,
                    background: micLevel > 70 ? '#43b581' : micLevel > 40 ? '#faa61a' : '#ed4245',
                    borderRadius: '4px', transition: 'width 0.1s ease',
                  }} />
                </div>
                <div style={{ fontSize: '12px', color: micLevel > 10 ? '#43b581' : '#ed4245', textAlign: 'center', fontWeight: 600 }}>
                  {micLevel > 10 ? '\u2705 Mikrofonunuz \u00e7al\u0131\u015f\u0131yor!' : '\u26a0\ufe0f Konu\u015fun veya ses yap\u0131n'}
                </div>
              </div>
            )}
          </div>

          {/* Echo Cancellation */}
          <div style={styles.section}>
            <label style={styles.checkLabel}>
              <input type="checkbox" checked={settings.echoCancellation}
                onChange={(e) => setSettings({ ...settings, echoCancellation: e.target.checked })}
                style={styles.checkbox} />
              <div>
                <div style={styles.title}>\ud83d\udd0a Yank\u0131 Engelleme</div>
                <div style={styles.desc}>Hoparl\u00f6rden gelen sesi mikrofona almaz</div>
              </div>
            </label>
          </div>

          {/* Noise Suppression */}
          <div style={styles.section}>
            <label style={styles.checkLabel}>
              <input type="checkbox" checked={isNoiseSuppressionEnabled}
                onChange={() => onNoiseToggle && onNoiseToggle()}
                style={styles.checkbox} />
              <div>
                <div style={styles.title}>\ud83c\udfa4\ufe0f G\u00fcr\u00fclt\u00fc Engelleme</div>
                <div style={styles.desc}>
                  Arka plan g\u00fcr\u00fclt\u00fcs\u00fcn\u00fc azalt\u0131r (Klavye, fan vb.)
                  <br />
                  <span style={{ color: '#ff9800', fontWeight: 600 }}>
                    \u26a0\ufe0f M\u00fczik payla\u015f\u0131rken kapat\u0131n!
                  </span>
                </div>
              </div>
            </label>
          </div>

          {/* PTT Mode */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionTitleRow}>\ud83c\udfa4\ufe0f Ses Modu</div>
              <div style={styles.descNoMargin}>Voice Activity veya Push-to-Talk</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <select value={audioSettings?.pttMode ? 'ptt' : 'voice'}
                onChange={(e) => {
                  const isPtt = e.target.value === 'ptt';
                  setSettings({ ...settings, pttMode: isPtt });
                  typeof togglePTTMode !== 'undefined' && togglePTTMode && togglePTTMode();
                }}
                style={styles.select}>
                <option value="voice">\ud83c\udfa4 Voice Activity (Otomatik)</option>
                <option value="ptt">\u2328\ufe0f Push-to-Talk (Tu\u015fa bas\u0131nca)</option>
              </select>
            </div>
            {audioSettings?.pttMode && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                  \u2328\ufe0f PTT Tu\u015fu:
                </div>
                <select value={audioSettings?.pttKey || 'Space'}
                  onChange={(e) => {
                    setSettings({ ...settings, pttKey: e.target.value });
                    typeof updatePTTKey !== 'undefined' && updatePTTKey && updatePTTKey(e.target.value);
                  }}
                  style={{ ...styles.select, padding: '8px', fontSize: '13px' }}>
                  <option value="Space">Space (Bo\u015fluk)</option>
                  <option value="ControlLeft">Ctrl (Sol)</option>
                  <option value="ControlRight">Ctrl (Sa\u011f)</option>
                  <option value="ShiftLeft">Shift (Sol)</option>
                  <option value="AltLeft">Alt (Sol)</option>
                  <option value="KeyV">V</option>
                  <option value="KeyC">C</option>
                </select>
                <div style={{ fontSize: '11px', color: '#43b581', marginTop: '6px', textAlign: 'center' }}>
                  \u2139\ufe0f Tu\u015fa bas\u0131l\u0131 tutunca konu\u015fursunuz
                </div>
              </div>
            )}
          </div>

          {/* VAD Sensitivity */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionTitleRow}>\ud83c\udf9a\ufe0f Mikrofon Hassasiyeti</div>
              <div style={styles.descNoMargin}>Konu\u015fma alg\u0131lama e\u015fi\u011fi (D\u00fc\u015f\u00fck = Hassas, Y\u00fcksek = Az Hassas)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#fff', fontSize: '14px' }}>20</span>
              <input type="range" min="20" max="80" value={tempVadSensitivity}
                onChange={(e) => {
                  setTempVadSensitivity(parseInt(e.target.value));
                  onVadChange && onVadChange(parseInt(e.target.value));
                }}
                style={{
                  flex: 1, height: '6px', borderRadius: '3px', outline: 'none', cursor: 'pointer',
                  background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${((tempVadSensitivity - 20) / 60) * 100}%, rgba(255,255,255,0.2) ${((tempVadSensitivity - 20) / 60) * 100}%, rgba(255,255,255,0.2) 100%)`,
                }} />
              <span style={{ color: '#fff', fontSize: '14px' }}>80</span>
              <span style={{ color: '#5865f2', fontSize: '16px', fontWeight: 'bold', minWidth: '40px', textAlign: 'right' }}>{tempVadSensitivity}</span>
            </div>
            <div style={{
              marginTop: '8px', fontSize: '12px', textAlign: 'center',
              color: tempVadSensitivity < 35 ? '#ff9800' : tempVadSensitivity > 60 ? '#ff9800' : '#43b581',
            }}>
              {tempVadSensitivity < 35 ? '\u26a0\ufe0f \u00c7ok hassas - False positive olabilir'
                : tempVadSensitivity > 60 ? '\u26a0\ufe0f Az hassas - Konu\u015fma alg\u0131lanmayabilir'
                : '\u2705 Optimal hassasiyet'}
            </div>
          </div>

          {/* Screen Share Quality */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionTitleRow}>\ud83d\udcfa Ekran Payla\u015f\u0131m\u0131 Kalitesi</div>
              <div style={styles.descNoMargin}>Y\u00fcksek kalite = Daha fazla bandwidth</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <select value={tempScreenQuality}
                onChange={(e) => { setTempScreenQuality(e.target.value); onScreenQualityChange && onScreenQualityChange(e.target.value); }}
                style={styles.select}>
                <option value="720p">720p (HD) - Az bandwidth</option>
                <option value="1080p">1080p (Full HD) - \u00d6nerilen \u2705</option>
                <option value="4K">4K (Ultra HD) - \u00c7ok bandwidth</option>
              </select>
            </div>
            <div style={{ marginBottom: '8px', color: '#fff' }}>
              <div style={styles.titleSmall}>\ud83c\udfac FPS: {tempScreenFPS}</div>
              <input type="range" min="15" max="60" step="15" value={tempScreenFPS}
                onChange={(e) => { const v = parseInt(e.target.value); setTempScreenFPS(v); onScreenFPSChange && onScreenFPSChange(v); }}
                style={{ width: '100%', cursor: 'pointer' }} />
            </div>
            <div style={{ fontSize: '12px', textAlign: 'center', color: tempScreenFPS === 30 ? '#43b581' : '#faa61a' }}>
              {tempScreenFPS === 30 ? '\u2705 Optimal (\u00d6nerilen)' : tempScreenFPS < 30 ? '\u26a0\ufe0f D\u00fc\u015f\u00fck FPS' : '\u26a0\ufe0f Y\u00fcksek bandwidth'}
            </div>
            <div style={{ marginTop: '12px' }}>
              <label style={{ ...styles.checkLabel, fontSize: '14px' }}>
                <input type="checkbox" checked={audioSettings?.includeSystemAudio || false}
                  onChange={(e) => { setSettings({ ...settings, includeSystemAudio: e.target.checked }); typeof toggleSystemAudio !== 'undefined' && toggleSystemAudio && toggleSystemAudio(e.target.checked); }}
                  style={{ cursor: 'pointer' }} />
                <span>\ud83d\udd0a Sistem sesini dahil et (Oyun/Video sesi)</span>
              </label>
            </div>
          </div>

          {/* Auto Gain Control */}
          <div style={styles.sectionLast}>
            <label style={styles.checkLabel}>
              <input type="checkbox" checked={settings.autoGainControl}
                onChange={(e) => setSettings({ ...settings, autoGainControl: e.target.checked })}
                style={styles.checkbox} />
              <div>
                <div style={styles.title}>\ud83d\udcca Otomatik Ses Seviyesi</div>
                <div style={styles.desc}>Ses seviyesini otomatik ayarlar</div>
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button onClick={onClose} style={styles.cancelBtn}>\u0130ptal</button>
          <button onClick={() => onSave(settings)} style={styles.saveBtn}>Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
