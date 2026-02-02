import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import './SmartNotifications.css';

/**
 * Smart Notification Settings with AI Filtering
 */
const SmartNotifications = ({ userId }) => {
    const [settings, setSettings] = useState({
        enabled: true,
        muteEveryone: false,
        muteHere: false,
        keywords: [],
        allowedUsers: [],
        quietHoursEnabled: false,
        quietHoursStart: '22:00',
        quietHoursEnd: '08:00',
        aiFiltering: {
            enabled: false,
            blockSpam: true,
            blockPromotions: true,
            blockNSFW: true,
            onlyImportant: false
        },
        soundEnabled: true,
        desktopEnabled: true,
        mobileEnabled: true
    });

    const [newKeyword, setNewKeyword] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const response = await fetch('/api/notifications/settings/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            const data = await response.json();
            if (data.success && data.settings) {
                setSettings(data.settings);
            }
        } catch (error) {
            console.error('Load notification settings error:', error);
        }
    };

    const saveSettings = async () => {
        setIsSaving(true);

        try {
            const response = await fetch('/api/notifications/settings/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ settings })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('✅ Bildirim ayarları kaydedildi');
            } else {
                toast.error('❌ Ayarlar kaydedilemedi: ' + (data.error || 'Bilinmeyen hata'));
            }
        } catch (error) {
            console.error('Save error:', error);
            toast.error('❌ Ayarlar kaydedilemedi');
        } finally {
            setIsSaving(false);
        }
    };

    const updateSetting = (key, value) => {
        setSettings({ ...settings, [key]: value });
    };

    const updateAISetting = (key, value) => {
        setSettings({
            ...settings,
            aiFiltering: { ...settings.aiFiltering, [key]: value }
        });
    };

    const addKeyword = () => {
        if (newKeyword.trim() && !settings.keywords.includes(newKeyword.trim())) {
            setSettings({
                ...settings,
                keywords: [...settings.keywords, newKeyword.trim()]
            });
            setNewKeyword('');
        }
    };

    const removeKeyword = (keyword) => {
        setSettings({
            ...settings,
            keywords: settings.keywords.filter(k => k !== keyword)
        });
    };

    return (
        <div className="smart-notifications-container">
            <div className="notifications-header">
                <h2>🔔 Smart Notifications</h2>
                <p>AI-powered notification filtering for better focus</p>
            </div>

            <div className="settings-section">
                <h3>General Settings</h3>

                <div className="setting-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.enabled}
                            onChange={(e) => updateSetting('enabled', e.target.checked)}
                        />
                        Enable notifications
                    </label>
                </div>

                <div className="setting-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.muteEveryone}
                            onChange={(e) => updateSetting('muteEveryone', e.target.checked)}
                        />
                        Mute @everyone mentions
                    </label>
                </div>

                <div className="setting-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.muteHere}
                            onChange={(e) => updateSetting('muteHere', e.target.checked)}
                        />
                        Mute @here mentions
                    </label>
                </div>
            </div>

            <div className="settings-section">
                <h3>🤖 AI Filtering (Beta)</h3>
                <p className="section-description">
                    Use AI to automatically filter out unwanted notifications
                </p>

                <div className="setting-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.aiFiltering.enabled}
                            onChange={(e) => updateAISetting('enabled', e.target.checked)}
                        />
                        Enable AI filtering
                    </label>
                </div>

                {settings.aiFiltering.enabled && (
                    <div className="ai-options">
                        <div className="setting-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings.aiFiltering.blockSpam}
                                    onChange={(e) => updateAISetting('blockSpam', e.target.checked)}
                                />
                                Block spam messages
                            </label>
                        </div>

                        <div className="setting-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings.aiFiltering.blockPromotions}
                                    onChange={(e) => updateAISetting('blockPromotions', e.target.checked)}
                                />
                                Block promotional messages
                            </label>
                        </div>

                        <div className="setting-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings.aiFiltering.blockNSFW}
                                    onChange={(e) => updateAISetting('blockNSFW', e.target.checked)}
                                />
                                Block NSFW content
                            </label>
                        </div>

                        <div className="setting-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings.aiFiltering.onlyImportant}
                                    onChange={(e) => updateAISetting('onlyImportant', e.target.checked)}
                                />
                                Only notify for important messages
                            </label>
                        </div>
                    </div>
                )}
            </div>

            <div className="settings-section">
                <h3>⏰ Quiet Hours</h3>

                <div className="setting-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.quietHoursEnabled}
                            onChange={(e) => updateSetting('quietHoursEnabled', e.target.checked)}
                        />
                        Enable quiet hours
                    </label>
                </div>

                {settings.quietHoursEnabled && (
                    <div className="quiet-hours-inputs">
                        <div className="time-input">
                            <label>Start time</label>
                            <input
                                type="time"
                                value={settings.quietHoursStart}
                                onChange={(e) => updateSetting('quietHoursStart', e.target.value)}
                            />
                        </div>
                        <div className="time-input">
                            <label>End time</label>
                            <input
                                type="time"
                                value={settings.quietHoursEnd}
                                onChange={(e) => updateSetting('quietHoursEnd', e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="settings-section">
                <h3>🔑 Keyword Filters</h3>
                <p className="section-description">
                    Get notified only when these keywords appear
                </p>

                <div className="keyword-input">
                    <input
                        type="text"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                        placeholder="Add keyword..."
                    />
                    <button onClick={addKeyword} className="add-btn">+ Add</button>
                </div>

                <div className="keyword-list">
                    {settings.keywords.map((keyword, index) => (
                        <div key={index} className="keyword-tag">
                            {keyword}
                            <button onClick={() => removeKeyword(keyword)}>×</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="settings-section">
                <h3>🔊 Notification Types</h3>

                <div className="setting-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.soundEnabled}
                            onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
                        />
                        Sound notifications
                    </label>
                </div>

                <div className="setting-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.desktopEnabled}
                            onChange={(e) => updateSetting('desktopEnabled', e.target.checked)}
                        />
                        Desktop notifications
                    </label>
                </div>

                <div className="setting-item">
                    <label>
                        <input
                            type="checkbox"
                            checked={settings.mobileEnabled}
                            onChange={(e) => updateSetting('mobileEnabled', e.target.checked)}
                        />
                        Mobile push notifications
                    </label>
                </div>
            </div>

            <div className="settings-footer">
                <button onClick={saveSettings} disabled={isSaving} className="save-btn">
                    {isSaving ? 'Saving...' : '💾 Save Settings'}
                </button>
            </div>
        </div>
    );
};

export default SmartNotifications;


