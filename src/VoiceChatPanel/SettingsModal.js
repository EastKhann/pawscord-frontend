import React, { useState } from 'react';
import { styles } from './SettingsModal/settingsModalStyles';
import useMicTest from './SettingsModal/useMicTest';
import useModalA11y from '../hooks/useModalA11y';

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
  const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Ses Ayarları' });

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
          <div style={{ ...styles.section, border: isTesting ? '2px solid #23a559' : '1px solid rgba(255,255,255,0.1)' }}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionTitleRow}>🎤 Mikrofon Testi</div>
              <div style={styles.descNoMargin}>Mikrofonunuzun çalışıp çalışmadığını test edin</div>
            </div>
            <button onClick={() => setIsTesting(!isTesting)} style={styles.testBtn(isTesting)}>
              {isTesting ? '⏹️ Testi Durdur' : '▶️ Testi Başlat'}
            </button>
            {isTesting && (
              <div>
                <div style={styles.levelBar}>
                  <div style={{
                    height: '100%', width: `${micLevel}%`,
                    background: micLevel > 70 ? '#23a559' : micLevel > 40 ? '#f0b232' : '#f23f42',
                    borderRadius: '4px', transition: 'width 0.1s ease',
                  }} />
                </div>
                <div style={{ fontSize: '12px', color: micLevel > 10 ? '#23a559' : '#f23f42', textAlign: 'center', fontWeight: 600 }}>
                  {micLevel > 10 ? '✅ Mikrofonunuz çalışıyor!' : '⚠️ Konuşun veya ses yapın'}
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
                <div style={styles.title}>🔊 Yankı Engelleme</div>
                <div style={styles.desc}>Hoparlörden gelen sesi mikrofona almaz</div>
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
                <div style={styles.title}>🎤️ Gürültü Engelleme</div>
                <div style={styles.desc}>
                  Arka plan gürültüsünü azaltır (Klavye, fan vb.)
                  <br />
                  <span style={{ color: '#ff9800', fontWeight: 600 }}>
                    ⚠️ Müzik paylaşırken kapatın!
                  </span>
                </div>
              </div>
            </label>
          </div>

          {/* PTT Mode */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionTitleRow}>🎤️ Ses Modu</div>
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
                <option value="voice">🎤 Voice Activity (Otomatik)</option>
                <option value="ptt">⌨️ Push-to-Talk (Tuşa basınca)</option>
              </select>
            </div>
            {audioSettings?.pttMode && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                  ⌨️ PTT Tuşu:
                </div>
                <select value={audioSettings?.pttKey || 'Space'}
                  onChange={(e) => {
                    setSettings({ ...settings, pttKey: e.target.value });
                    typeof updatePTTKey !== 'undefined' && updatePTTKey && updatePTTKey(e.target.value);
                  }}
                  style={{ ...styles.select, padding: '8px', fontSize: '13px' }}>
                  <option value="Space">Space (Boşluk)</option>
                  <option value="ControlLeft">Ctrl (Sol)</option>
                  <option value="ControlRight">Ctrl (Sağ)</option>
                  <option value="ShiftLeft">Shift (Sol)</option>
                  <option value="AltLeft">Alt (Sol)</option>
                  <option value="KeyV">V</option>
                  <option value="KeyC">C</option>
                </select>
                <div style={{ fontSize: '11px', color: '#23a559', marginTop: '6px', textAlign: 'center' }}>
                  ℹ️ Tuşa basılı tutunca konuşursunuz
                </div>
              </div>
            )}
          </div>

          {/* VAD Sensitivity */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionTitleRow}>🎚️ Mikrofon Hassasiyeti</div>
              <div style={styles.descNoMargin}>Konuşma algılama eşiği (Düşük = Hassas, Yüksek = Az Hassas)</div>
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
              color: tempVadSensitivity < 35 ? '#ff9800' : tempVadSensitivity > 60 ? '#ff9800' : '#23a559',
            }}>
              {tempVadSensitivity < 35 ? '⚠️ Çok hassas - False positive olabilir'
                : tempVadSensitivity > 60 ? '⚠️ Az hassas - Konuşma algılanmayabilir'
                  : '✅ Optimal hassasiyet'}
            </div>
          </div>

          {/* Screen Share Quality */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionTitleRow}>📺 Ekran Paylaşımı Kalitesi</div>
              <div style={styles.descNoMargin}>Yüksek kalite = Daha fazla bandwidth</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <select value={tempScreenQuality}
                onChange={(e) => { setTempScreenQuality(e.target.value); onScreenQualityChange && onScreenQualityChange(e.target.value); }}
                style={styles.select}>
                <option value="720p">720p (HD) - Az bandwidth</option>
                <option value="1080p">1080p (Full HD) - Önerilen ✅</option>
                <option value="4K">4K (Ultra HD) - Çok bandwidth</option>
              </select>
            </div>
            <div style={{ marginBottom: '8px', color: '#fff' }}>
              <div style={styles.titleSmall}>🎬 FPS: {tempScreenFPS}</div>
              <input type="range" min="15" max="60" step="15" value={tempScreenFPS}
                onChange={(e) => { const v = parseInt(e.target.value); setTempScreenFPS(v); onScreenFPSChange && onScreenFPSChange(v); }}
                style={{ width: '100%', cursor: 'pointer' }} />
            </div>
            <div style={{ fontSize: '12px', textAlign: 'center', color: tempScreenFPS === 30 ? '#23a559' : '#f0b232' }}>
              {tempScreenFPS === 30 ? '✅ Optimal (Önerilen)' : tempScreenFPS < 30 ? '⚠️ Düşük FPS' : '⚠️ Yüksek bandwidth'}
            </div>
            <div style={{ marginTop: '12px' }}>
              <label style={{ ...styles.checkLabel, fontSize: '14px' }}>
                <input type="checkbox" checked={audioSettings?.includeSystemAudio || false}
                  onChange={(e) => { setSettings({ ...settings, includeSystemAudio: e.target.checked }); typeof toggleSystemAudio !== 'undefined' && toggleSystemAudio && toggleSystemAudio(e.target.checked); }}
                  style={{ cursor: 'pointer' }} />
                <span>🔊 Sistem sesini dahil et (Oyun/Video sesi)</span>
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
                <div style={styles.title}>📊 Otomatik Ses Seviyesi</div>
                <div style={styles.desc}>Ses seviyesini otomatik ayarlar</div>
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button onClick={onClose} style={styles.cancelBtn}>İptal</button>
          <button onClick={() => onSave(settings)} style={styles.saveBtn}>Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
