/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import logger from '../../utils/logger';
import './RaidProtection.css';
import { API_BASE_URL } from '../../utils/apiEndpoints';
import { useTranslation } from 'react-i18next';

/**
 * Raid Protection Settings Panel
 */
const RaidProtection = ({ serverId, isOwner, isAdmin }) => {
    const { t } = useTranslation();
    const [enabled, setEnabled] = useState(false);
    const [settings, setSettings] = useState({
        join_threshold: 10,
        account_age_days: 7,
        require_verification: true,
        auto_kick_suspicious: true,
        lockdown_duration: 60,
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
            const response = await fetch(`${API_BASE_URL}/servers/${serverId}/raid-protection/`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            const data = await response.json();
            if (data.success && data.settings) {
                setEnabled(data.enabled);
                setSettings(data.settings);
            }
        } catch (error) {
            logger.error('Load raid settings error:', error);
        }
    };

    const checkRaidActivity = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/moderation/raid-protection/check/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ server_id: serverId }),
            });

            const data = await response.json();
            if (data.success) {
                setRaidStatus(data);
            }
        } catch (error) {
            logger.error('Check raid activity error:', error);
        }
    };

    const toggleProtection = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/moderation/raid-protection/enable/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    server_id: serverId,
                    settings: enabled ? {} : settings,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setEnabled(!enabled);
            } else {
                toast.error(
                    t('raidProtection.toggleFailed') +
                    ': ' +
                    (data.error || t('common.unknownError'))
                );
            }
        } catch (error) {
            logger.error('Toggle raid protection error:', error);
            toast.error(t('raidProtection.toggleFailed'));
        } finally {
            setIsLoading(false);
        }
    };

    const unlockServer = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/moderation/raid-protection/unlock/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ server_id: serverId }),
            });

            const data = await response.json();

            if (data.success) {
                setRaidStatus({ ...raidStatus, is_locked: false });
            }
        } catch (error) {
            logger.error('Unlock server error:', error);
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
                    <h2>🛡️ {t('raid.title', 'Raid Protection')}</h2>
                    <p>{t('raid.subtitle', 'Protect your server from coordinated raids and mass joins')}</p>
                </div>
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={toggleProtection}
                        disabled={isLoading}
                        aria-label={t('raidProtection.checkbox', 'Toggle option')}
                    />
                    <span className="toggle-slider"></span>
                </label>
            </div>

            {raidStatus?.under_raid && (
                <div className="raid-alert">
                    <div className="alert-header">
                        <span>⚠️ {t('raid.detected', 'RAID DETECTED')}</span>
                        <span className="join-count">
                            {raidStatus.join_count}/{raidStatus.threshold} joins/min
                        </span>
                    </div>
                    {raidStatus.is_locked && (
                        <div className="lockdown-notice">
                            {t('raid.locked', 'Server is in locked mode. New members cannot join.')}
                            <button
                                aria-label={t('moderation.unlockServer', 'Unlock server')}
                                onClick={unlockServer}
                                className="unlock-btn"
                            >
                                {t('raid.unlock', 'Unlock Server')}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {enabled && (
                <div className="raid-settings">
                    <div className="setting-group">
                        <label>
                            {t('raidProt.joinRateLimit', 'Join Rate Limit')}
                            <span className="setting-hint">
                                {t('raidProt.joinRateLimitDesc', 'Maximum number of joins per minute before protection is triggered')}
                            </span>
                        </label>
                        <input
                            type="number"
                            value={settings.join_threshold}
                            onChange={(e) =>
                                updateSetting('join_threshold', parseInt(e.target.value))
                            }
                            min="5"
                            max="50"
                        />
                    </div>

                    <div className="setting-group">
                        <label>
                            {t('raidProt.minAccountAge', 'Minimum Account Age')}
                            <span className="setting-hint">
                                {t('raidProt.minAccountAgeDesc', 'Minimum account age required to join (days)')}
                            </span>
                        </label>
                        <input
                            type="number"
                            value={settings.account_age_days}
                            onChange={(e) =>
                                updateSetting('account_age_days', parseInt(e.target.value))
                            }
                            min="0"
                            max="30"
                        />
                    </div>

                    <div className="setting-group">
                        <label>
                            {t('raidProt.lockDuration', 'Lock Duration')}
                            <span className="setting-hint">
                                {t('raidProt.lockDurationDesc', 'Server lock duration when a raid is detected (minutes)')}
                            </span>
                        </label>
                        <input
                            type="number"
                            value={settings.lockdown_duration}
                            onChange={(e) =>
                                updateSetting('lockdown_duration', parseInt(e.target.value))
                            }
                            min="10"
                            max="1440"
                        />
                    </div>

                    <div className="setting-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.require_verification}
                                onChange={(e) =>
                                    updateSetting('require_verification', e.target.checked)
                                }
                            />
                            Require verification for new members
                        </label>
                    </div>

                    <div className="setting-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={settings.auto_kick_suspicious}
                                onChange={(e) =>
                                    updateSetting('auto_kick_suspicious', e.target.checked)
                                }
                            />
                            Auto-kick suspicious accounts (new accounts, bots)
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

RaidProtection.propTypes = {
    serverId: PropTypes.string,
    isOwner: PropTypes.bool,
    isAdmin: PropTypes.bool,
};
export default RaidProtection;
