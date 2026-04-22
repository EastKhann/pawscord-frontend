/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import useWelcomeMessages from '../WelcomeMessagesPanel/useWelcomeMessages';
import MessageSection from '../WelcomeMessagesPanel/MessageSection';
import './WelcomeMessagesPanel.css';
import { useTranslation } from 'react-i18next';

const STAT_ITEMS = [
    { icon: '👋', key: 'total_welcomes', label: t('welcomeMessages.totalWelcomes', 'Total Welcomes') },
    { icon: '😢', key: 'total_goodbyes', label: 'Toplam Veda' },
    { icon: '📅', key: 'welcomes_today', label: 'Today Joinan' },
];

const WelcomeMessagesPanel = ({ serverId, onClose }) => {
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const {
        welcomeConfig,
        updateConfig,
        insertVariable,
        channels,
        roles,
        stats,
        loading,
        saveConfig,
        testWelcomeMessage,
    } = useWelcomeMessages(serverId);

    if (loading) {
        return (
            <div className="welcome-messages-overlay">
                <div className="welcome-messages-panel">
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>{t('welcomeMessages.loading', 'Loading welcome messages...')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="welcome-messages-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="welcome-messages-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="welcome-header">
                    <h2>{t('welcomeMessages.title', '👋 Welcome & Farewell Messages')}</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                {stats && (
                    <div className="stats-overview">
                        {STAT_ITEMS.map((s) => (
                            <div key={s.key} className="stat-card">
                                <span className="stat-icon">{s.icon}</span>
                                <span className="stat-value">{stats[s.key] || 0}</span>
                                <span className="stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="config-content">
                    <MessageSection
                        title={t('ui.hos_geldin_mesajlari')}
                        icon="👋"
                        config={welcomeConfig}
                        enabledKey="welcome_enabled"
                        channelKey="welcome_channel_id"
                        messageKey="welcome_message"
                        embedKey="welcome_embed"
                        embedColorKey="welcome_embed_color"
                        embedTitleKey="welcome_embed_title"
                        embedDescKey="welcome_embed_description"
                        dmKey="welcome_dm"
                        dmMessageKey="welcome_dm_message"
                        channels={channels}
                        updateConfig={updateConfig}
                        insertVariable={insertVariable}
                        onTest={testWelcomeMessage}
                    />

                    <MessageSection
                        title={t('ui.veda_mesajlari')}
                        icon="😢"
                        config={welcomeConfig}
                        enabledKey="goodbye_enabled"
                        channelKey="goodbye_channel_id"
                        messageKey="goodbye_message"
                        embedKey="goodbye_embed"
                        embedColorKey="goodbye_embed_color"
                        channels={channels}
                        updateConfig={updateConfig}
                        insertVariable={insertVariable}
                    />

                    <div className="config-section">
                        <div className="section-header">
                            <h3>⭐ Auto Role</h3>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={welcomeConfig.auto_role_enabled}
                                    onChange={(e) =>
                                        updateConfig('auto_role_enabled', e.target.checked)
                                    }
                                />
                                <span className="slider"></span>
                                <span className="toggle-label">
                                    {welcomeConfig.auto_role_enabled ? '✓ Active' : '✗ Inactive'}
                                </span>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Otomatik Verilecek Roller</label>
                            <div className="roles-selector">
                                {roles.map((role) => (
                                    <label key={role.id} className="role-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={welcomeConfig.auto_role_ids.includes(role.id)}
                                            onChange={(e) => {
                                                const newRoles = e.target.checked
                                                    ? [...welcomeConfig.auto_role_ids, role.id]
                                                    : welcomeConfig.auto_role_ids.filter(
                                                        (id) => id !== role.id
                                                    );
                                                updateConfig('auto_role_ids', newRoles);
                                            }}
                                            disabled={!welcomeConfig.auto_role_enabled}
                                        />
                                        <span>{role.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button aria-label={t('welcomeMessages.saveConfig', 'Save configuration')} className="save-btn" onClick={saveConfig}>
                        {t('common.saveSettings', '💾 Save Settings')}
                    </button>
                </div>
            </div>
        </div>
    );
};

WelcomeMessagesPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default WelcomeMessagesPanel;
