import React, { useState, useEffect } from 'react';
import { profileThemeApi } from '../services/niceToHaveApi';
import './ProfileThemePanel.css';

const PRESETS = [
    { name: 'Ocean', primary: '#0066CC', secondary: '#004080', accent: '#00BFFF' },
    { name: 'Sunset', primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#FFE66D' },
    { name: 'Forest', primary: '#2ECC71', secondary: '#27AE60', accent: '#F1C40F' },
    { name: 'Midnight', primary: '#2C3E50', secondary: '#34495E', accent: '#9B59B6' },
    { name: 'Rose', primary: '#E91E63', secondary: '#AD1457', accent: '#FCE4EC' },
    { name: 'Cyber', primary: '#00FF00', secondary: '#0F0F0F', accent: '#FF00FF' },
    { name: 'Discord', primary: '#5865F2', secondary: '#2D3748', accent: '#7289DA' },
    { name: 'Gold', primary: '#FFD700', secondary: '#B8860B', accent: '#FFF8DC' },
];

const BACKGROUND_TYPES = [
    { id: 'solid', icon: '🎨', label: 'Solid' },
    { id: 'gradient', icon: '🌈', label: 'Gradient' },
    { id: 'image', icon: '🖼️', label: 'Image' },
];

const BORDER_STYLES = ['solid', 'dashed', 'dotted', 'double', 'glow'];

function ProfileThemePanel({ onClose }) {
    const [theme, setTheme] = useState({
        primary_color: '#5865F2',
        secondary_color: '#2D3748',
        accent_color: '#7289DA',
        background_type: 'solid',
        background_value: '',
        avatar_border_color: '#5865F2',
        avatar_border_style: 'solid',
        banner_image: '',
        glow_effect: false,
        animated_background: false
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const data = await profileThemeApi.getTheme();
            if (data.primary_color) {
                setTheme(prev => ({ ...prev, ...data }));
            }
        } catch (err) {
            console.error('Failed to load theme:', err);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await profileThemeApi.setTheme(theme);
            alert('Theme saved! 🎨');
        } catch (err) {
            alert('Failed to save theme: ' + err.message);
        }
        setLoading(false);
    };

    const applyPreset = (preset) => {
        setTheme(prev => ({
            ...prev,
            primary_color: preset.primary,
            secondary_color: preset.secondary,
            accent_color: preset.accent,
            avatar_border_color: preset.accent
        }));
    };

    const updateTheme = (key, value) => {
        setTheme(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="profile-theme-panel">
            <h2>🎨 Profile Theme</h2>

            {/* Preview */}
            <div
                className="theme-preview"
                style={{
                    '--preview-primary': theme.primary_color,
                    '--preview-secondary': theme.secondary_color,
                    '--preview-border': theme.avatar_border_color
                }}
            >
                <div
                    className="theme-preview-banner"
                    style={{
                        background: theme.banner_image
                            ? `url(${theme.banner_image}) center/cover`
                            : `linear-gradient(135deg, ${theme.primary_color}, ${theme.secondary_color})`
                    }}
                />
                <div
                    className="theme-preview-avatar"
                    style={{
                        borderColor: theme.avatar_border_color,
                        borderStyle: theme.avatar_border_style,
                        boxShadow: theme.glow_effect ? `0 0 20px ${theme.avatar_border_color}` : 'none'
                    }}
                >
                    😎
                </div>
                <div className="theme-preview-info">
                    <h3>Your Name</h3>
                    <p>@username</p>
                </div>
            </div>

            {/* Presets */}
            <div className="theme-section">
                <h3>🎯 Quick Presets</h3>
                <div className="theme-presets">
                    {PRESETS.map(preset => (
                        <div
                            key={preset.name}
                            className="theme-preset"
                            style={{ background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})` }}
                            onClick={() => applyPreset(preset)}
                        >
                            <span className="preset-name">{preset.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Colors */}
            <div className="theme-section">
                <h3>🎨 Colors</h3>
                <div className="color-pickers">
                    <div className="color-picker-group">
                        <label>Primary</label>
                        <input
                            type="color"
                            value={theme.primary_color}
                            onChange={(e) => updateTheme('primary_color', e.target.value)}
                        />
                        <div className="color-code">{theme.primary_color}</div>
                    </div>
                    <div className="color-picker-group">
                        <label>Secondary</label>
                        <input
                            type="color"
                            value={theme.secondary_color}
                            onChange={(e) => updateTheme('secondary_color', e.target.value)}
                        />
                        <div className="color-code">{theme.secondary_color}</div>
                    </div>
                    <div className="color-picker-group">
                        <label>Accent</label>
                        <input
                            type="color"
                            value={theme.accent_color}
                            onChange={(e) => updateTheme('accent_color', e.target.value)}
                        />
                        <div className="color-code">{theme.accent_color}</div>
                    </div>
                </div>
            </div>

            {/* Background */}
            <div className="theme-section">
                <h3>🖼️ Background</h3>
                <div className="background-options">
                    {BACKGROUND_TYPES.map(bg => (
                        <div
                            key={bg.id}
                            className={`background-option ${theme.background_type === bg.id ? 'selected' : ''}`}
                            onClick={() => updateTheme('background_type', bg.id)}
                        >
                            <div className="icon">{bg.icon}</div>
                            <div className="label">{bg.label}</div>
                        </div>
                    ))}
                </div>
                {theme.background_type === 'image' && (
                    <div className="background-value-input">
                        <input
                            type="url"
                            placeholder="Enter image URL..."
                            value={theme.banner_image}
                            onChange={(e) => updateTheme('banner_image', e.target.value)}
                        />
                    </div>
                )}
            </div>

            {/* Avatar Border */}
            <div className="theme-section">
                <h3>⭕ Avatar Border</h3>
                <div className="color-pickers" style={{ marginBottom: '15px' }}>
                    <div className="color-picker-group">
                        <label>Border Color</label>
                        <input
                            type="color"
                            value={theme.avatar_border_color}
                            onChange={(e) => updateTheme('avatar_border_color', e.target.value)}
                        />
                    </div>
                </div>
                <div className="border-styles">
                    {BORDER_STYLES.map(style => (
                        <button
                            key={style}
                            className={`border-style ${theme.avatar_border_style === style ? 'selected' : ''}`}
                            onClick={() => updateTheme('avatar_border_style', style)}
                        >
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Effects */}
            <div className="theme-section">
                <h3>✨ Effects</h3>
                <div className="toggle-options">
                    <div className="toggle-option">
                        <div className="info">
                            <h4>Glow Effect</h4>
                            <p>Add a glow around your avatar</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={theme.glow_effect}
                                onChange={(e) => updateTheme('glow_effect', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="toggle-option">
                        <div className="info">
                            <h4>Animated Background</h4>
                            <p>Enable subtle animations</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={theme.animated_background}
                                onChange={(e) => updateTheme('animated_background', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <button
                className="save-theme-btn"
                onClick={handleSave}
                disabled={loading}
            >
                {loading ? 'Saving...' : '💾 Save Theme'}
            </button>
        </div>
    );
}

export default ProfileThemePanel;
