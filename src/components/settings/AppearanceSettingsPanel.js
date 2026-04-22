import { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './AppearanceSettingsPanel.css';
import useAppearanceSettings, {
    accentColors,
} from '../AppearanceSettingsPanel/useAppearanceSettings';
import SettingToggle from '../AppearanceSettingsPanel/SettingToggle';

const CHAT_TOGGLES = [
    {
        key: 'show_emoji_picker',
        label: 'Show emoji picker',
        desc: 'Emoji picker while composing messages',
    },
    {
        key: 'show_gif_picker',
        label: 'Show GIF picker',
        desc: 'GIF picker while composing messages',
    },
    { key: 'animate_emoji', label: 'Emoji animations', desc: 'Play animated emojis' },
    { key: 'animate_stickers', label: 'Sticker animations', desc: 'Play animated stickers' },
    { key: 'show_embeds', label: 'Show embeds', desc: 'Show link previews' },
    { key: 'render_embeds', label: 'Render embed content', desc: 'Show media in embeds' },
    { key: 'inline_embed_media', label: 'Inline media', desc: 'Show images and videos inline' },
    {
        key: 'inline_attachment_media',
        label: 'Inline attachments',
        desc: 'Show file attachments inline',
    },
];

const ACCESSIBILITY_TOGGLES = [
    {
        key: 'use_reduced_motion',
        label: 'Reduced motion',
        desc: 'Reduce animations and transitions',
    },
    { key: 'high_contrast_mode', label: 'High contrast mode', desc: 'Use more distinct colors' },
];

const AppearanceSettingsPanel = ({ onClose }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const { settings, loading, updateSetting, toggleSetting, resetToDefaults } =
        useAppearanceSettings();

    // useCallback handlers
    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleAccentColorChange = useCallback(
        (e) => updateSetting('accent_color', e.target.value),
        [updateSetting]
    );
    const handleSetCozyMode = useCallback(
        () => updateSetting('message_display_mode', 'cozy'),
        [updateSetting]
    );
    const handleSetCompactMode = useCallback(
        () => updateSetting('message_display_mode', 'compact'),
        [updateSetting]
    );
    const handleFontSizeChange = useCallback(
        (e) => updateSetting('font_size', parseInt(e.target.value)),
        [updateSetting]
    );
    const handleSpacingChange = useCallback(
        (e) => updateSetting('message_group_spacing', e.target.value),
        [updateSetting]
    );
    const handleSaturationChange = useCallback(
        (e) => updateSetting('saturate_colors', parseInt(e.target.value)),
        [updateSetting]
    );
    const handleLanguageChange = useCallback(
        (e) => updateSetting('language', e.target.value),
        [updateSetting]
    );
    const handleTimezoneChange = useCallback(
        (e) => updateSetting('timezone', e.target.value),
        [updateSetting]
    );

    if (loading) {
        return (
            <div className="appearance-settings-overlay">
                <div className="appearance-settings-panel">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>{t('appearance.loading', 'Loading appearance settings...')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="appearance-settings-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="appearance-settings-panel"
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* Header */}
                <div className="appearance-settings-header">
                    <h2>🎨 {t('appearance.title', 'Appearance Settings')}</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="appearance-settings-content">
                    {/* Theme */}
                    <div className="settings-section">
                        <h3>🌙 Tema</h3>
                        <div className="theme-selector">
                            {[
                                { value: 'light', icon: '☀️', label: 'Open', cls: 'light-theme' },
                                { value: 'dark', icon: '🌙', label: 'Koyu', cls: 'dark-theme' },
                                { value: 'auto', icon: '🔄', label: 'Auto', cls: 'auto-theme' },
                            ].map((t) => (
                                <div
                                    key={t.value}
                                    className={`theme-option ${settings.theme === t.value ? 'active' : ''}`}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => updateSetting('theme', t.value)}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    <div className={`theme-preview ${t.cls}`}>
                                        <div className="preview-header"></div>
                                        <div className="preview-content"></div>
                                    </div>
                                    <span>
                                        {t.icon} {t.label}
                                    </span>
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
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => updateSetting('accent_color', c.color)}
                                    title={c.name}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    {settings.accent_color === c.color && <span>✓</span>}
                                </div>
                            ))}
                            <input
                                type="color"
                                value={settings.accent_color}
                                onChange={handleAccentColorChange}
                                className="custom-color-input"
                                title={t('common.pickCustomColor', 'Pick custom color')}
                                aria-label={t('common.colorPicker', 'Color picker')}
                            />
                        </div>
                    </div>

                    {/* Message Display */}
                    <div className="settings-section">
                        <h3>💬 {t('appearance.messageDisplay', 'Message Display')}</h3>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-label">Mesaj Modu</div>
                                    <div className="setting-desc">
                                        Mesajlar\u0131n nas\u0131l
                                        g\u00f6r\u00fcnt\u00fclendi\u011fini se\u00e7in
                                    </div>
                                </div>
                                <div className="display-mode-selector">
                                    <button
                                        aria-label={t('appearance.cozyMode', 'Cozy mode')}
                                        className={`mode-btn ${settings.message_display_mode === 'cozy' ? 'active' : ''}`}
                                        onClick={handleSetCozyMode}
                                    >
                                        Cozy
                                    </button>
                                    <button
                                        aria-label={t('appearance.compactMode', 'Compact mode')}
                                        className={`mode-btn ${settings.message_display_mode === 'compact' ? 'active' : ''}`}
                                        onClick={handleSetCompactMode}
                                    >
                                        Compact
                                    </button>
                                </div>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <div className="setting-label">
                                        Font size: {settings.font_size}px
                                    </div>
                                    <div className="setting-desc">{t('appearance.fontSize', 'Message font size')}</div>
                                </div>
                                <input
                                    type="range"
                                    min="12"
                                    max="20"
                                    value={settings.font_size}
                                    onChange={handleFontSizeChange}
                                    className="font-size-slider"
                                    aria-label={t('appearance.fontSizeSlider', 'Font size')}
                                />
                            </div>
                            <div className="setting-desc">{t('appearance.messageSpacing', 'Message spacing')}</div>
                        </div>
                        <select
                            value={settings.message_group_spacing}
                            onChange={handleSpacingChange}
                            className="spacing-select"
                            aria-label={t('appearance.spacingSelect', 'Select message spacing')}>
                            <option value="default">Default</option>
                            <option value="spacious">Spacious</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Chat Features */}
            <div className="settings-section">
                <h3>✨ {t('appearance.chatFeatures', 'Chat Features')}</h3>
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
                <h3>♿ Accessibility</h3>
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
                            <div className="setting-label">
                                Color saturation: {settings.saturate_colors}%
                            </div>
                            <div className="setting-desc">{t('appearance.colorVibrance', 'Adjust color vibrance')}</div>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="200"
                            value={settings.saturate_colors}
                            onChange={handleSaturationChange}
                            className="saturation-slider"
                            aria-label={t('appearance.saturationSlider', 'Color saturation')}
                        />
                        <div className="settings-section">
                            <h3>🌍 Language & Region</h3>
                            <div className="settings-group">
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <div className="setting-label">Language</div>
                                        <div className="setting-desc">Uygulama dili</div>
                                    </div>
                                    <select
                                        value={settings.language}
                                        onChange={handleLanguageChange}
                                        className="language-select"
                                        aria-label={t('appearance.languageSelect', 'Select language')}
                                    >
                                        <option value="tr">🇹🇷 Turkish</option>
                                        <option value="en">🇺🇸 English</option>
                                        <option value="de">🇩🇪 Deutsch</option>
                                        <option value="fr">{t('lang.fr', '🇫🇷 French')}</option>
                                        <option value="es">🇪🇸 Español</option>
                                    </select>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <div className="setting-label">Timezone</div>
                                        <div className="setting-desc">
                                            {t('appearance.timestampTimezone', 'Message timestamp timezone')}
                                        </div>
                                    </div>
                                    <select
                                        value={settings.timezone}
                                        onChange={handleTimezoneChange}
                                        className="timezone-select"
                                        aria-label={t('appearance.timezoneSelect', 'Select timezone')}
                                    >
                                        <option value="Europe/Istanbul">Istanbul (UTC+3)</option>
                                        <option value="Europe/London">London (UTC+0)</option>
                                        <option value="America/New_York">New York (UTC-5)</option>
                                        <option value="America/Los_Angeles">Los Angeles (UTC-8)</option>
                                        <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Reset */}
                        <div className="settings-section">
                            <button
                                aria-label={t('appearance.resetDefaults', 'Reset to defaults')}
                                className="reset-btn"
                                onClick={resetToDefaults}
                            >
                                🔄 Reset to Defaults
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AppearanceSettingsPanel.propTypes = {
    onClose: PropTypes.func,
};
export default memo(AppearanceSettingsPanel);
