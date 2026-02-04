import React, { useState, useEffect } from 'react';
import { autoDeleteApi } from '../services/niceToHaveApi';
import './MessageAutoDeletePanel.css';

const TIME_OPTIONS = [
    { value: 0, label: 'Disabled' },
    { value: 3600, label: '1 Hour' },
    { value: 14400, label: '4 Hours' },
    { value: 86400, label: '24 Hours' },
    { value: 604800, label: '7 Days' },
    { value: 2592000, label: '30 Days' },
    { value: 7776000, label: '90 Days' },
];

function MessageAutoDeletePanel({ onClose }) {
    const [settings, setSettings] = useState({
        enabled: false,
        delete_after_seconds: 0,
        exclude_pinned: true,
        exclude_with_reactions: true
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await autoDeleteApi.getSettings();
            if (data.enabled !== undefined) {
                setSettings(data);
            }
        } catch (err) {
            console.error('Failed to load settings:', err);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await autoDeleteApi.updateSettings(settings);
            alert('Settings saved! 💾');
        } catch (err) {
            alert('Failed to save settings: ' + err.message);
        }
        setLoading(false);
    };

    const updateSettings = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="message-auto-delete-panel">
            <h2>🗑️ Auto-Delete Messages</h2>

            <div className="warning-banner">
                <span className="warning-icon">⚠️</span>
                <div className="warning-text">
                    <strong>Warning:</strong> This will permanently delete your sent messages after the specified time.
                    This action cannot be undone.
                </div>
            </div>

            <div className="settings-section">
                <div className="toggle-row">
                    <div className="toggle-info">
                        <h3>Enable Auto-Delete</h3>
                        <p>Automatically delete your messages after a set time</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.enabled}
                            onChange={(e) => updateSettings('enabled', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                {settings.enabled && (
                    <>
                        <div className="setting-group">
                            <label>Delete messages after</label>
                            <div className="time-options">
                                {TIME_OPTIONS.filter(t => t.value > 0).map(opt => (
                                    <button
                                        key={opt.value}
                                        className={settings.delete_after_seconds === opt.value ? 'active' : ''}
                                        onClick={() => updateSettings('delete_after_seconds', opt.value)}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="setting-group">
                            <h3>Exclusions</h3>

                            <div className="checkbox-option">
                                <input
                                    type="checkbox"
                                    id="exclude-pinned"
                                    checked={settings.exclude_pinned}
                                    onChange={(e) => updateSettings('exclude_pinned', e.target.checked)}
                                />
                                <label htmlFor="exclude-pinned">
                                    <span className="option-title">Exclude Pinned Messages</span>
                                    <span className="option-desc">Don't delete messages that are pinned</span>
                                </label>
                            </div>

                            <div className="checkbox-option">
                                <input
                                    type="checkbox"
                                    id="exclude-reactions"
                                    checked={settings.exclude_with_reactions}
                                    onChange={(e) => updateSettings('exclude_with_reactions', e.target.checked)}
                                />
                                <label htmlFor="exclude-reactions">
                                    <span className="option-title">Exclude Messages with Reactions</span>
                                    <span className="option-desc">Keep messages that have received reactions</span>
                                </label>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <button
                className="save-btn"
                onClick={handleSave}
                disabled={loading}
            >
                {loading ? 'Saving...' : '💾 Save Settings'}
            </button>
        </div>
    );
}

export default MessageAutoDeletePanel;
