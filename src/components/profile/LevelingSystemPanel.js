/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useLevelingSystem from '../LevelingSystemPanel/useLevelingSystem';
import LevelRolesSection from '../LevelingSystemPanel/LevelRolesSection';
import LeaderboardSection from '../LevelingSystemPanel/LeaderboardSection';
import './LevelingSystemPanel.css';

const LevelingSystemPanel = ({ serverId, onClose }) => {
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const {
        config,
        updateConfig,
        levelRoles,
        newRole,
        setNewRole,
        roles,
        channels,
        leaderboard,
        loading,
        saveConfig,
        addLevelRole,
        removeLevelRole,
        resetUserXP,
    } = useLevelingSystem(serverId);

    if (loading) {
        return (
            <div className="leveling-overlay">
                <div className="leveling-panel">
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>{t('common.loading')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="leveling-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="leveling-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="leveling-header">
                    <h2>⭐ {t('leveling.title')}</h2>
                    <button aria-label="on Close" className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="leveling-content">
                    <div className="config-section">
                        <div className="section-header">
                            <h3>⚙️ {t('leveling.generalSettings')}</h3>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={config.enabled}
                                    onChange={(e) => updateConfig('enabled', e.target.checked)}
                                />
                                <span className="slider"></span>
                                <span className="toggle-label">
                                    {config.enabled ? t('common.active') : t('common.inactive')}
                                </span>
                            </label>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>{t('leveling.xpPerMessage')}</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={config.xp_per_message}
                                    onChange={(e) =>
                                        updateConfig('xp_per_message', parseInt(e.target.value))
                                    }
                                    disabled={!config.enabled}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('leveling.xpCooldown')}</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="300"
                                    value={config.xp_cooldown}
                                    onChange={(e) =>
                                        updateConfig('xp_cooldown', parseInt(e.target.value))
                                    }
                                    disabled={!config.enabled}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>{t('leveling.announceChannel')}</label>
                                <select
                                    value={config.announce_channel_id}
                                    onChange={(e) =>
                                        updateConfig('announce_channel_id', e.target.value)
                                    }
                                    disabled={!config.enabled}
                                >
                                    <option value="">{t('leveling.selectOptional')}</option>
                                    {channels.map((ch) => (
                                        <option key={ch.id} value={ch.id}>
                                            {ch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>{t('leveling.levelUpMessage')}</label>
                                <textarea
                                    value={config.level_up_message}
                                    onChange={(e) =>
                                        updateConfig('level_up_message', e.target.value)
                                    }
                                    disabled={!config.enabled}
                                    rows="2"
                                />
                                <span className="hint">
                                    {t('leveling.availableVars')}: {'{user}'}, {'{level}'}
                                </span>
                            </div>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={config.stack_roles}
                                        onChange={(e) =>
                                            updateConfig('stack_roles', e.target.checked)
                                        }
                                        disabled={!config.enabled}
                                    />
                                    <span>{t('leveling.stackRoles')}</span>
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={config.reset_on_leave}
                                        onChange={(e) =>
                                            updateConfig('reset_on_leave', e.target.checked)
                                        }
                                        disabled={!config.enabled}
                                    />
                                    <span>{t('leveling.resetOnLeave')}</span>
                                </label>
                            </div>
                        </div>
                        <button aria-label="save Config" className="save-btn" onClick={saveConfig}>
                            💾 {t('leveling.saveSettings')}
                        </button>
                    </div>

                    <LevelRolesSection
                        levelRoles={levelRoles}
                        newRole={newRole}
                        setNewRole={setNewRole}
                        roles={roles}
                        addLevelRole={addLevelRole}
                        removeLevelRole={removeLevelRole}
                    />
                    <LeaderboardSection leaderboard={leaderboard} resetUserXP={resetUserXP} />
                </div>
            </div>
        </div>
    );
};

LevelingSystemPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default LevelingSystemPanel;
