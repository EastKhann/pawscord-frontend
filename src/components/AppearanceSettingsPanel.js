import './AppearanceSettingsPanel.css';
import useAppearanceSettings, { accentColors } from './AppearanceSettingsPanel/useAppearanceSettings';
import SettingToggle from './AppearanceSettingsPanel/SettingToggle';

const CHAT_TOGGLES = [
  { key: 'show_emoji_picker', label: 'Emoji se\u00e7iciyi g\u00f6ster', desc: 'Mesaj yazarken emoji se\u00e7ici' },
  { key: 'show_gif_picker', label: 'GIF se\u00e7iciyi g\u00f6ster', desc: 'Mesaj yazarken GIF se\u00e7ici' },
  { key: 'animate_emoji', label: 'Emoji animasyonlar\u0131', desc: 'Animasyonlu emojileri oynat' },
  { key: 'animate_stickers', label: 'Sticker animasyonlar\u0131', desc: 'Animasyonlu stickerleri oynat' },
  { key: 'show_embeds', label: 'Embed g\u00f6ster', desc: 'Link \u00f6nizlemelerini g\u00f6ster' },
  { key: 'render_embeds', label: 'Embed i\u00e7eri\u011fi render et', desc: 'Embed i\u00e7indeki medyay\u0131 g\u00f6ster' },
  { key: 'inline_embed_media', label: 'Sat\u0131r i\u00e7i medya', desc: 'G\u00f6rselleri ve videolar\u0131 mesaj i\u00e7inde g\u00f6ster' },
  { key: 'inline_attachment_media', label: 'Sat\u0131r i\u00e7i ekler', desc: 'Dosya eklerini mesaj i\u00e7inde g\u00f6ster' },
];

const ACCESSIBILITY_TOGGLES = [
  { key: 'use_reduced_motion', label: 'Azalt\u0131lm\u0131\u015f hareket', desc: 'Animasyonlar\u0131 ve ge\u00e7i\u015fleri azalt' },
  { key: 'high_contrast_mode', label: 'Y\u00fcksek kontrast modu', desc: 'Daha belirgin renkler kullan' },
];

const AppearanceSettingsPanel = ({ onClose }) => {
  const { settings, loading, updateSetting, toggleSetting, resetToDefaults } = useAppearanceSettings();

  if (loading) {
    return (
      <div className="appearance-settings-overlay">
        <div className="appearance-settings-panel">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>G\u00f6r\u00fcn\u00fcm ayarlar\u0131 y\u00fckleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="appearance-settings-overlay" onClick={onClose}>
      <div className="appearance-settings-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="appearance-settings-header">
          <h2>\ud83c\udfa8 G\u00f6r\u00fcn\u00fcm Ayarlar\u0131</h2>
          <button className="close-btn" onClick={onClose}>\u00d7</button>
        </div>

        <div className="appearance-settings-content">
          {/* Theme */}
          <div className="settings-section">
            <h3>\ud83c\udf19 Tema</h3>
            <div className="theme-selector">
              {[
                { value: 'light', icon: '\u2600\ufe0f', label: 'A\u00e7\u0131k', cls: 'light-theme' },
                { value: 'dark', icon: '\ud83c\udf19', label: 'Koyu', cls: 'dark-theme' },
                { value: 'auto', icon: '\ud83d\udd04', label: 'Otomatik', cls: 'auto-theme' },
              ].map((t) => (
                <div
                  key={t.value}
                  className={`theme-option ${settings.theme === t.value ? 'active' : ''}`}
                  onClick={() => updateSetting('theme', t.value)}
                >
                  <div className={`theme-preview ${t.cls}`}>
                    <div className="preview-header"></div>
                    <div className="preview-content"></div>
                  </div>
                  <span>{t.icon} {t.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div className="settings-section">
            <h3>\ud83c\udfa8 Vurgu Rengi</h3>
            <div className="color-picker">
              {accentColors.map((c) => (
                <div
                  key={c.color}
                  className={`color-swatch ${settings.accent_color === c.color ? 'active' : ''}`}
                  style={{ background: c.color }}
                  onClick={() => updateSetting('accent_color', c.color)}
                  title={c.name}
                >
                  {settings.accent_color === c.color && <span>\u2713</span>}
                </div>
              ))}
              <input
                type="color"
                value={settings.accent_color}
                onChange={(e) => updateSetting('accent_color', e.target.value)}
                className="custom-color-input"
                title="\u00d6zel renk se\u00e7"
              />
            </div>
          </div>

          {/* Message Display */}
          <div className="settings-section">
            <h3>\ud83d\udcac Mesaj G\u00f6r\u00fcn\u00fcm\u00fc</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Mesaj modu</div>
                  <div className="setting-desc">Mesajlar\u0131n nas\u0131l g\u00f6r\u00fcnt\u00fclenece\u011fini se\u00e7in</div>
                </div>
                <div className="display-mode-selector">
                  <button
                    className={`mode-btn ${settings.message_display_mode === 'cozy' ? 'active' : ''}`}
                    onClick={() => updateSetting('message_display_mode', 'cozy')}
                  >Rahat</button>
                  <button
                    className={`mode-btn ${settings.message_display_mode === 'compact' ? 'active' : ''}`}
                    onClick={() => updateSetting('message_display_mode', 'compact')}
                  >Kompakt</button>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Yaz\u0131 boyutu: {settings.font_size}px</div>
                  <div className="setting-desc">Mesaj yaz\u0131 tipi boyutu</div>
                </div>
                <input
                  type="range" min="12" max="20"
                  value={settings.font_size}
                  onChange={(e) => updateSetting('font_size', parseInt(e.target.value))}
                  className="font-size-slider"
                />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Mesaj aral\u0131\u011f\u0131</div>
                  <div className="setting-desc">Mesajlar aras\u0131 bo\u015fluk</div>
                </div>
                <select
                  value={settings.message_group_spacing}
                  onChange={(e) => updateSetting('message_group_spacing', e.target.value)}
                  className="spacing-select"
                >
                  <option value="compact">S\u0131k\u0131\u015f\u0131k</option>
                  <option value="default">Vars\u0131y\u0131lan</option>
                  <option value="spacious">Geni\u015f</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chat Features */}
          <div className="settings-section">
            <h3>\u2728 Sohbet \u00d6zellikleri</h3>
            <div className="settings-group">
              {CHAT_TOGGLES.map((t) => (
                <SettingToggle
                  key={t.key}
                  label={t.label}
                  desc={t.desc}
                  checked={settings[t.key]}
                  onChange={() => toggleSetting(t.key)}
                />
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div className="settings-section">
            <h3>\u267f Eri\u015filebilirlik</h3>
            <div className="settings-group">
              {ACCESSIBILITY_TOGGLES.map((t) => (
                <SettingToggle
                  key={t.key}
                  label={t.label}
                  desc={t.desc}
                  checked={settings[t.key]}
                  onChange={() => toggleSetting(t.key)}
                />
              ))}

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Renk doygunlu\u011fu: {settings.saturate_colors}%</div>
                  <div className="setting-desc">Renklerin canl\u0131l\u0131\u011f\u0131n\u0131 ayarla</div>
                </div>
                <input
                  type="range" min="0" max="200"
                  value={settings.saturate_colors}
                  onChange={(e) => updateSetting('saturate_colors', parseInt(e.target.value))}
                  className="saturation-slider"
                />
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="settings-section">
            <h3>\ud83c\udf0d Dil ve B\u00f6lge</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Dil</div>
                  <div className="setting-desc">Uygulama dili</div>
                </div>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting('language', e.target.value)}
                  className="language-select"
                >
                  <option value="tr">\ud83c\uddf9\ud83c\uddf7 T\u00fcrk\u00e7e</option>
                  <option value="en">\ud83c\uddfa\ud83c\uddf8 English</option>
                  <option value="de">\ud83c\udde9\ud83c\uddea Deutsch</option>
                  <option value="fr">\ud83c\uddeb\ud83c\uddf7 Fran\u00e7ais</option>
                  <option value="es">\ud83c\uddea\ud83c\uddf8 Espa\u00f1ol</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Saat dilimi</div>
                  <div className="setting-desc">Mesaj zaman damgalar\u0131 i\u00e7in</div>
                </div>
                <select
                  value={settings.timezone}
                  onChange={(e) => updateSetting('timezone', e.target.value)}
                  className="timezone-select"
                >
                  <option value="Europe/Istanbul">\u0130stanbul (UTC+3)</option>
                  <option value="Europe/London">Londra (UTC+0)</option>
                  <option value="America/New_York">New York (UTC-5)</option>
                  <option value="America/Los_Angeles">Los Angeles (UTC-8)</option>
                  <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reset */}
          <div className="settings-section">
            <button className="reset-btn" onClick={resetToDefaults}>
              \ud83d\udd04 Vars\u0131y\u0131lan Ayarlara D\u00f6n
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettingsPanel;
