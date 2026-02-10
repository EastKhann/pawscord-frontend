import React, { useState, useEffect } from 'react';
import { viewPreferencesApi } from '../services/niceToHaveApi';
import './ViewPreferencesPanel.css';
import toast from '../utils/toast';

const VIEW_MODES = [
    { id: 'cozy', name: 'Cozy', icon: '🛋️', desc: 'Spacious layout with large avatars' },
    { id: 'compact', name: 'Compact', icon: '📱', desc: 'More messages visible at once' },
    { id: 'minimal', name: 'Minimal', icon: '✨', desc: 'Clean, distraction-free' },
];

const AVATAR_SIZES = ['small', 'medium', 'large'];
const TIMESTAMP_FORMATS = ['relative', 'short', 'full'];

function ViewPreferencesPanel({ onClose }) {
    const [prefs, setPrefs] = useState({
        view_mode: 'cozy',
        avatar_size: 'medium',
        message_spacing: 16,
        show_timestamps: true,
        timestamp_format: 'relative',
        group_messages: true,
        show_avatars: true,
        channel_overrides: {}
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPrefs();
    }, []);

    const loadPrefs = async () => {
        try {
            const data = await viewPreferencesApi.getPreferences();
            if (data.view_mode) {
                setPrefs(prev => ({ ...prev, ...data }));
            }
        } catch (err) {
            console.error('Failed to load preferences:', err);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await viewPreferencesApi.updatePreferences(prefs);
            toast.success('Preferences saved! 🎨');
        } catch (err) {
            toast.error('Failed to save: ' + err.message);
        }
        setLoading(false);
    };

    const updatePref = (key, value) => {
        setPrefs(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="view-preferences-panel">
            <h2>🖼️ View Preferences</h2>

            {/* View Mode */}
            <div className="pref-section">
                <h3>Display Mode</h3>
                <div className="view-mode-options">
                    {VIEW_MODES.map(mode => (
                        <div
                            key={mode.id}
                            className={`view-mode-card ${prefs.view_mode === mode.id ? 'selected' : ''}`}
                            onClick={() => updatePref('view_mode', mode.id)}
                        >
                            <span className="mode-icon">{mode.icon}</span>
                            <span className="mode-name">{mode.name}</span>
                            <span className="mode-desc">{mode.desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Avatar Settings */}
            <div className="pref-section">
                <h3>Avatar</h3>
                <div className="pref-row">
                    <div className="pref-label">
                        <span>Show Avatars</span>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={prefs.show_avatars}
                            onChange={(e) => updatePref('show_avatars', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                {prefs.show_avatars && (
                    <div className="pref-row">
                        <div className="pref-label">
                            <span>Avatar Size</span>
                        </div>
                        <div className="button-group">
                            {AVATAR_SIZES.map(size => (
                                <button
                                    key={size}
                                    className={prefs.avatar_size === size ? 'active' : ''}
                                    onClick={() => updatePref('avatar_size', size)}
                                >
                                    {size.charAt(0).toUpperCase() + size.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Message Settings */}
            <div className="pref-section">
                <h3>Messages</h3>

                <div className="pref-row">
                    <div className="pref-label">
                        <span>Message Spacing</span>
                        <span className="pref-value">{prefs.message_spacing}px</span>
                    </div>
                    <input
                        type="range"
                        min="8"
                        max="32"
                        value={prefs.message_spacing}
                        onChange={(e) => updatePref('message_spacing', parseInt(e.target.value))}
                    />
                </div>

                <div className="pref-row">
                    <div className="pref-label">
                        <span>Group Messages</span>
                        <span className="pref-desc">Combine consecutive messages from same user</span>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={prefs.group_messages}
                            onChange={(e) => updatePref('group_messages', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>

            {/* Timestamp Settings */}
            <div className="pref-section">
                <h3>Timestamps</h3>

                <div className="pref-row">
                    <div className="pref-label">
                        <span>Show Timestamps</span>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={prefs.show_timestamps}
                            onChange={(e) => updatePref('show_timestamps', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                {prefs.show_timestamps && (
                    <div className="pref-row">
                        <div className="pref-label">
                            <span>Timestamp Format</span>
                        </div>
                        <div className="button-group">
                            {TIMESTAMP_FORMATS.map(format => (
                                <button
                                    key={format}
                                    className={prefs.timestamp_format === format ? 'active' : ''}
                                    onClick={() => updatePref('timestamp_format', format)}
                                >
                                    {format.charAt(0).toUpperCase() + format.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Preview */}
            <div className="pref-section preview-section">
                <h3>Preview</h3>
                <div
                    className={`message-preview ${prefs.view_mode}`}
                    style={{ '--msg-spacing': `${prefs.message_spacing}px` }}
                >
                    <div className="preview-message">
                        {prefs.show_avatars && (
                            <div className={`preview-avatar ${prefs.avatar_size}`}>😎</div>
                        )}
                        <div className="preview-content">
                            <div className="preview-header">
                                <span className="preview-name">Username</span>
                                {prefs.show_timestamps && (
                                    <span className="preview-time">
                                        {prefs.timestamp_format === 'relative' ? '2m ago' :
                                            prefs.timestamp_format === 'short' ? '14:32' :
                                                '02/04/2026 14:32:15'}
                                    </span>
                                )}
                            </div>
                            <div className="preview-text">Hello, this is a preview message!</div>
                        </div>
                    </div>
                    {prefs.group_messages && (
                        <div className="preview-message grouped">
                            {prefs.show_avatars && <div className={`preview-avatar ${prefs.avatar_size} hidden`}></div>}
                            <div className="preview-content">
                                <div className="preview-text">This message is grouped with the previous one.</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <button
                className="save-btn"
                onClick={handleSave}
                disabled={loading}
            >
                {loading ? 'Saving...' : '💾 Save Preferences'}
            </button>
        </div>
    );
}

export default ViewPreferencesPanel;
