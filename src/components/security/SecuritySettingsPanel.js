import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useSecurityAPI from '../SecuritySettingsPanel/useSecurityAPI';
import TwoFactorTab from '../SecuritySettingsPanel/TwoFactorTab';
import SessionsTab from '../SecuritySettingsPanel/SessionsTab';
import IPWhitelistTab from '../SecuritySettingsPanel/IPWhitelistTab';
import PasskeyTab from '../SecuritySettingsPanel/PasskeyTab';
import './SecuritySettingsPanel.css';

const SecuritySettingsPanel = ({ onClose }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const api = useSecurityAPI();

    return (
        <div
            className="security-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="security-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="security-header">
                    <h2>🔒 {t('security.title')}</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {api.securityStatus && (
                    <div className="security-status">
                        <div className="status-item">
                            <span className="status-icon">🔐</span>
                            <span className="status-label">2FA:</span>
                            <span
                                className={`status-value ${api.twoFactorEnabled ? 'active' : 'inactive'}`}
                            >
                                {api.twoFactorEnabled
                                    ? t('security.active')
                                    : t('security.inactive')}
                            </span>
                        </div>
                        <div className="status-item">
                            <span className="status-icon">💻</span>
                            <span className="status-label">{t('security.activeSessions')}:</span>
                            <span className="status-value">{api.sessions.length}</span>
                        </div>
                        <div className="status-item">
                            <span className="status-icon">🌐</span>
                            <span className="status-label">IP Whitelist:</span>
                            <span className="status-value">{api.ipWhitelist.length}</span>
                        </div>
                    </div>
                )}

                <div className="security-tabs">
                    {[
                        ['2fa', `🔐 ${t('security.twoFA')}`],
                        ['passkey', `🔑 ${t('security.passkey')}`],
                        ['sessions', `💻 ${t('security.sessions')}`],
                        ['ip', `🌐 ${t('security.ipWhitelist')}`],
                    ].map(([key, label]) => (
                        <button
                            aria-label={label}
                            key={key}
                            className={`tab-btn ${api.activeTab === key ? 'active' : ''}`}
                            onClick={() => api.setActiveTab(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="security-content">
                    {api.activeTab === '2fa' && <TwoFactorTab {...api} />}
                    {api.activeTab === 'passkey' && <PasskeyTab />}
                    {api.activeTab === 'sessions' && <SessionsTab {...api} />}
                    {api.activeTab === 'ip' && <IPWhitelistTab {...api} />}
                </div>
            </div>
        </div>
    );
};

SecuritySettingsPanel.propTypes = {
    onClose: PropTypes.func,
};
export default SecuritySettingsPanel;
