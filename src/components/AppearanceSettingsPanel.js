import React, { useState, useEffect } from 'react';
import './AppearanceSettingsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const AppearanceSettingsPanel = ({ onClose }) => {
  const [settings, setSettings] = useState({
    // Theme
    theme: 'dark', // light, dark, auto
    accent_color: '#5865f2', // Discord blue default
    
    // Message Display
    message_display_mode: 'cozy', // cozy, compact
    font_size: 16, // 12-20px
    message_group_spacing: 'default', // compact, default, spacious
    
    // Chat Features
    show_emoji_picker: true,
    show_gif_picker: true,
    animate_emoji: true,
    animate_stickers: true,
    show_embeds: true,
    render_embeds: true,
    inline_embed_media: true,
    inline_attachment_media: true,
    
    // Accessibility
    use_reduced_motion: false,
    high_contrast_mode: false,
    saturate_colors: 100, // 0-200%
    
    // Language
    language: 'tr', // tr, en, de, fr, es
    timezone: 'Europe/Istanbul'
  });

  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  const apiBaseUrl = getApiBase();

  useEffect(() => {
    fetchAppearanceSettings();
  }, []);

  // Fetch appearance settings
  const fetchAppearanceSettings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/appearance/settings/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        applyTheme(data);
      }
    } catch (error) {
      console.error('Error fetching appearance settings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update appearance settings
  const updateSettings = async (newSettings) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/appearance/settings/update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSettings)
      });

      if (response.ok) {
        setSettings(newSettings);
        applyTheme(newSettings);
        toast.success('✅ Görünüm ayarları kaydedildi');
      } else {
        toast.error('❌ Ayarlar kaydedilemedi');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Apply theme to document
  const applyTheme = (themeSettings) => {
    document.documentElement.setAttribute('data-theme', themeSettings.theme);
    document.documentElement.style.setProperty('--accent-color', themeSettings.accent_color);
    document.documentElement.style.setProperty('--font-size', `${themeSettings.font_size}px`);
    document.documentElement.style.setProperty('--saturation', `${themeSettings.saturate_colors}%`);
    
    if (themeSettings.use_reduced_motion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }

    if (themeSettings.high_contrast_mode) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  // Update setting
  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    updateSettings(newSettings);
  };

  // Toggle setting
  const toggleSetting = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    updateSettings(newSettings);
  };

  // Reset to defaults
  const resetToDefaults = async () => {
    if (!window.confirm('Tüm görünüm ayarlarını varsayılana döndürmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/appearance/settings/reset/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        applyTheme(data);
        toast.success('✅ Ayarlar varsayılana döndürüldü');
      }
    } catch (error) {
      console.error('Error resetting settings:', error);
      toast.error('❌ Ayarlar sıfırlanamadı');
    }
  };

  // Preset accent colors
  const accentColors = [
    { name: 'Discord Blue', color: '#5865f2' },
    { name: 'Blurple', color: '#7289da' },
    { name: 'Green', color: '#43b581' },
    { name: 'Yellow', color: '#faa61a' },
    { name: 'Red', color: '#f04747' },
    { name: 'Pink', color: '#ff73fa' },
    { name: 'Purple', color: '#9b59b6' },
    { name: 'Orange', color: '#e67e22' }
  ];

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

        {/* Content */}
        <div className="appearance-settings-content">
          {/* Theme */}
          <div className="settings-section">
            <h3>🌙 Tema</h3>
            <div className="theme-selector">
              <div
                className={`theme-option ${settings.theme === 'light' ? 'active' : ''}`}
                onClick={() => updateSetting('theme', 'light')}
              >
                <div className="theme-preview light-theme">
                  <div className="preview-header"></div>
                  <div className="preview-content"></div>
                </div>
                <span>☀️ Açık</span>
              </div>

              <div
                className={`theme-option ${settings.theme === 'dark' ? 'active' : ''}`}
                onClick={() => updateSetting('theme', 'dark')}
              >
                <div className="theme-preview dark-theme">
                  <div className="preview-header"></div>
                  <div className="preview-content"></div>
                </div>
                <span>🌙 Koyu</span>
              </div>

              <div
                className={`theme-option ${settings.theme === 'auto' ? 'active' : ''}`}
                onClick={() => updateSetting('theme', 'auto')}
              >
                <div className="theme-preview auto-theme">
                  <div className="preview-header"></div>
                  <div className="preview-content"></div>
                </div>
                <span>🔄 Otomatik</span>
              </div>
            </div>
          </div>

          {/* Accent Color */}
          <div className="settings-section">
            <h3>🎨 Vurgu Rengi</h3>
            <div className="color-picker">
              {accentColors.map((colorOption) => (
                <div
                  key={colorOption.color}
                  className={`color-swatch ${settings.accent_color === colorOption.color ? 'active' : ''}`}
                  style={{ background: colorOption.color }}
                  onClick={() => updateSetting('accent_color', colorOption.color)}
                  title={colorOption.name}
                >
                  {settings.accent_color === colorOption.color && <span>✓</span>}
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
                  >
                    Rahat
                  </button>
                  <button
                    className={`mode-btn ${settings.message_display_mode === 'compact' ? 'active' : ''}`}
                    onClick={() => updateSetting('message_display_mode', 'compact')}
                  >
                    Kompakt
                  </button>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Yazı boyutu: {settings.font_size}px</div>
                  <div className="setting-desc">Mesaj yazı tipi boyutu</div>
                </div>
                <input
                  type="range"
                  min="12"
                  max="20"
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
                  <option value="default">Varsayılan</option>
                  <option value="spacious">Geniş</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chat Features */}
          <div className="settings-section">
            <h3>✨ Sohbet Özellikleri</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Emoji seçiciyi göster</div>
                  <div className="setting-desc">Mesaj yazarken emoji seçici</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.show_emoji_picker}
                    onChange={() => toggleSetting('show_emoji_picker')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">GIF seçiciyi göster</div>
                  <div className="setting-desc">Mesaj yazarken GIF seçici</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.show_gif_picker}
                    onChange={() => toggleSetting('show_gif_picker')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Emoji animasyonları</div>
                  <div className="setting-desc">Animasyonlu emojileri oynat</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.animate_emoji}
                    onChange={() => toggleSetting('animate_emoji')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Sticker animasyonları</div>
                  <div className="setting-desc">Animasyonlu stickerleri oynat</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.animate_stickers}
                    onChange={() => toggleSetting('animate_stickers')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Embed göster</div>
                  <div className="setting-desc">Link önizlemelerini göster</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.show_embeds}
                    onChange={() => toggleSetting('show_embeds')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Embed içeriği render et</div>
                  <div className="setting-desc">Embed içindeki medyayı göster</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.render_embeds}
                    onChange={() => toggleSetting('render_embeds')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Satır içi medya</div>
                  <div className="setting-desc">Görselleri ve videoları mesaj içinde göster</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.inline_embed_media}
                    onChange={() => toggleSetting('inline_embed_media')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Satır içi ekler</div>
                  <div className="setting-desc">Dosya eklerini mesaj içinde göster</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.inline_attachment_media}
                    onChange={() => toggleSetting('inline_attachment_media')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div className="settings-section">
            <h3>♿ Erişilebilirlik</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Azaltılmış hareket</div>
                  <div className="setting-desc">Animasyonları ve geçişleri azalt</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.use_reduced_motion}
                    onChange={() => toggleSetting('use_reduced_motion')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Yüksek kontrast modu</div>
                  <div className="setting-desc">Daha belirgin renkler kullan</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.high_contrast_mode}
                    onChange={() => toggleSetting('high_contrast_mode')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Renk doygunluğu: {settings.saturate_colors}%</div>
                  <div className="setting-desc">Renklerin canlılığını ayarla</div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
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

          {/* Reset Button */}
          <div className="settings-section">
            <button className="reset-btn" onClick={resetToDefaults}>
              🔄 Varsayılan Ayarlara Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettingsPanel;

