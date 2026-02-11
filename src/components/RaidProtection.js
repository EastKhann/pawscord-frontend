import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import './RaidProtection.css';

/**
 * Raid Protection Settings Panel
 */
const RaidProtection = ({ serverId, isOwner, isAdmin }) => {
    const [enabled, setEnabled] = useState(false);
    const [settings, setSettings] = useState({
        join_threshold: 10,
        account_age_days: 7,
        require_verification: true,
        auto_kick_suspicious: true,
        lockdown_duration: 60
    });
    const [raidStatus, setRaidStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadSettings();
        const interval = setInterval(checkRaidActivity, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, [serverId]);

    const loadSettings = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/raid-protection/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            const data = await response.json();
            if (data.success && data.settings) {
                setEnabled(data.enabled);
                setSettings(data.settings);
            }
        } catch (error) {
            console.error('Load raid settings error:', error);
        }
    };

    const checkRaidActivity = async () => {
        try {
            const response = await fetch('/api/moderation/raid-protection/check/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ server_id: serverId })
            });

            const data = await response.json();
            if (data.success) {
                setRaidStatus(data);
            }
        } catch (error) {
            console.error('Check raid activity error:', error);
        }
    };

    const toggleProtection = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('/api/moderation/raid-protection/enable/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    server_id: serverId,
                    settings: enabled ? {} : settings
                })
            });

            const data = await response.json();

            if (data.success) {
                setEnabled(!enabled);
            } else {
                toast.error('❌ Failed to toggle raid protection: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Toggle raid protection error:', error);
            toast.error('❌ Failed to toggle raid protection');
        } finally {
            setIsLoading(false);
        }
    };

    const unlockServer = async () => {
        try {
            const response = await fetch('/api/moderation/raid-protection/unlock/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ server_id: serverId })
            });

            const data = await response.json();

            if (data.success) {
                setRaidStatus({ ...raidStatus, is_locked: false });
            }
        } catch (error) {
            console.error('Unlock server error:', error);
        }
    };

    const updateSetting = (key, value) => {
        setSettings({ ...settings, [key]: value });
    };

    if (!isOwner && !isAdmin) {
        return (
            <div className="raid-protection-container">
                <div className="permission-denied">
                    🔒 Only server owner and admins can manage raid protection
                </div>
            </div>
        );
    }

    return (
        <div className="raid-protection-container">
            <div className="raid-header">
                <div>
                    <h2>🛡️ Raid Protection</h2>
                    <p>Protect your server from coordinated raids and mass joins</p>
                </div>
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={toggleProtection}
                        disabled={isLoading}
                    />
                    <span className="toggle-slider"></span>
                </label>
            </div>

            {raidStatus?.under_raid && (
                <div className="raid-alert">
                    <div className="alert-header">
                        <span>⚠️ RAID DETECTED</span>
                        <span className="join-count">
                            {raidStatus.join_count}/{raidStatus.threshold} joins/min
                        </span>
                    </div>
                    {raidStatus.is_locked && (
                        <div className="lockdown-notice">
                            🔒 Server is in lockdown mode. New members cannot join.
                            <button onClick={unlockServer} className="unlock-btn">
                                Unlock Server
                            </button>
                        </div>
                    )}
                </div>
            )}

            {enabled && (
                <div className="raid-settings">
                    <div className="setting-group">
                        <label>
                            Join Rate Limit
                            <span className="setting-hint">Max joins per minute before triggering protection</span>
                        </label>
                        <input
                            type="number"
                            value={settings.join_threshold}
                            onChange={(e) => updateSetting('join_threshold', parseInt(e.target.value))}
                            min="5"
                            max="50"
                        />
                    </div>

                    <div className="setting-group">
                        <label>
                            Minimum Account Age
                            <span className="setting-hint">Days old account must be to join</span>
                        </label>
                        <input
                            type="number"
                            value={settings.account_age_days}
                            onChange={(e) => updateSetting('account_age_days', parseInt(e.target.value))}
                            min="0"
                            max="30"
                        />
                    </div>

                    <div className="setting-group">
                        <label>
                            Lockdown Duration
                            <span className="setting-hint">Minutes to lock server when raid detected</span>
                        </label>
                        <input
                            type="number"
                            value={settings.lockdown_duration}
                            onChange={(e) => updateSetting('lockdown_duration', parseInt(e.target.value))}
                            min="10"
                            max="1440"
                        />
                    </div>

                    <div className="setting-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.require_verification}
                                onChange={(e) => updateSetting('require_verification', e.target.checked)}
                            />
                            Require verification for new members
                        </label>
                    </div>

                    <div className="setting-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.auto_kick_suspicious}
                                onChange={(e) => updateSetting('auto_kick_suspicious', e.target.checked)}
                            />
                            Auto-kick suspicious accounts (new accounts, bots)
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RaidProtection;


