import './AppearanceSettingsPanel.css';
import useAppearanceSettings, { accentColors } from './AppearanceSettingsPanel/useAppearanceSettings';
import SettingToggle from './AppearanceSettingsPanel/SettingToggle';

const CHAT_TOGGLES = [
  { key: 'show_emoji_picker', label: 'Emoji seçiciyi göster', desc: 'Mesaj yazarken emoji seçici' },
  { key: 'show_gif_picker', label: 'GIF seçiciyi göster', desc: 'Mesaj yazarken GIF seçici' },
  { key: 'animate_emoji', label: 'Emoji animasyonları', desc: 'Animasyonlu emojileri oynat' },
  { key: 'animate_stickers', label: 'Sticker animasyonları', desc: 'Animasyonlu stickerleri oynat' },
  { key: 'show_embeds', label: 'Embed göster', desc: 'Link önizlemelerini göster' },
  { key: 'render_embeds', label: 'Embed içeriği render et', desc: 'Embed içindeki medyayı göster' },
  { key: 'inline_embed_media', label: 'Satır içi medya', desc: 'Görselleri ve videoları mesaj içinde göster' },
  { key: 'inline_attachment_media', label: 'Satır içi ekler', desc: 'Dosya eklerini mesaj içinde göster' },
];

const ACCESSIBILITY_TOGGLES = [
  { key: 'use_reduced_motion', label: 'Azaltılmış hareket', desc: 'Animasyonları ve geçişleri azalt' },
  { key: 'high_contrast_mode', label: 'Yüksek kontrast modu', desc: 'Daha belirgin renkler kullan' },
];

const AppearanceSettingsPanel = ({ onClose }) => {
  const { settings, loading, updateSetting, toggleSetting, resetToDefaults } = useAppearanceSettings();

  if (loading) {
    return (
      <div className="appearance-settings-overlay">
        <div className="appearance-settings-panel">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Görünüm ayarları yükleniyor...</p>
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
          <h2>🎨 Görünüm Ayarları</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="appearance-settings-content">
          {/* Theme */}
          <div className="settings-section">
            <h3>🌙 Tema</h3>
            <div className="theme-selector">
              {[
                { value: 'light', icon: '☀️', label: 'Açık', cls: 'light-theme' },
                { value: 'dark', icon: '🌙', label: 'Koyu', cls: 'dark-theme' },
                { value: 'auto', icon: '🔄', label: 'Otomatik', cls: 'auto-theme' },
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
            <h3>🎨 Vurgu Rengi</h3>
            <div className="color-picker">
              {accentColors.map((c) => (
                <div
                  key={c.color}
                  className={`color-swatch ${settings.accent_color === c.color ? 'active' : ''}`}
                  style={{ background: c.color }}
                  onClick={() => updateSetting('accent_color', c.color)}
                  title={c.name}
                >
                  {settings.accent_color === c.color && <span>✓</span>}
                </div>
              ))}
              <input
                type="color"
                value={settings.accent_color}
                onChange={(e) => updateSetting('accent_color', e.target.value)}
                className="custom-color-input"
                title="Özel renk seç"
              />
            </div>
          </div>

          {/* Message Display */}
          <div className="settings-section">
            <h3>💬 Mesaj Görünümü</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Mesaj modu</div>
                  <div className="setting-desc">Mesajların nasıl görüntüleneceğini seçin</div>
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
                  <div className="setting-label">Yazı boyutu: {settings.font_size}px</div>
                  <div className="setting-desc">Mesaj yazı tipi boyutu</div>
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
                  <div className="setting-label">Mesaj aralığı</div>
                  <div className="setting-desc">Mesajlar arası boşluk</div>
                </div>
                <select
                  value={settings.message_group_spacing}
                  onChange={(e) => updateSetting('message_group_spacing', e.target.value)}
                  className="spacing-select"
                >
                  <option value="compact">Sıkışık</option>
                  <option value="default">Varsıyılan</option>
                  <option value="spacious">Geniş</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chat Features */}
          <div className="settings-section">
            <h3>✨ Sohbet Özellikleri</h3>
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
            <h3>♿ Erişilebilirlik</h3>
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
                  <div className="setting-label">Renk doygunluğu: {settings.saturate_colors}%</div>
                  <div className="setting-desc">Renklerin canlılığını ayarla</div>
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
            <h3>🌍 Dil ve Bölge</h3>
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
                  <option value="tr">🇹🇷 Türkçe</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="de">🇩🇪 Deutsch</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="es">🇪🇸 Español</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Saat dilimi</div>
                  <div className="setting-desc">Mesaj zaman damgaları için</div>
                </div>
                <select
                  value={settings.timezone}
                  onChange={(e) => updateSetting('timezone', e.target.value)}
                  className="timezone-select"
                >
                  <option value="Europe/Istanbul">İstanbul (UTC+3)</option>
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
              🔄 Varsıyılan Ayarlara Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettingsPanel;
