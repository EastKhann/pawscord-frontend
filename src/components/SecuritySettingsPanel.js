import React from 'react';
import useSecurityAPI from './SecuritySettingsPanel/useSecurityAPI';
import TwoFactorTab from './SecuritySettingsPanel/TwoFactorTab';
import SessionsTab from './SecuritySettingsPanel/SessionsTab';
import IPWhitelistTab from './SecuritySettingsPanel/IPWhitelistTab';
import './SecuritySettingsPanel.css';

const SecuritySettingsPanel = ({ onClose }) => {
    const api = useSecurityAPI();

    return (
        <div className="security-overlay" onClick={onClose}>
            <div className="security-panel" onClick={(e) => e.stopPropagation()}>
                <div className="security-header">
                    <h2>{'🔒'} Güvenlik Ayarları</h2>
                    <button className="close-btn" onClick={onClose}>{'✕'}</button>
                </div>

                {api.securityStatus && (
                    <div className="security-status">
                        <div className="status-item">
                            <span className="status-icon">{'🔐'}</span>
                            <span className="status-label">2FA:</span>
                            <span className={`status-value ${api.twoFactorEnabled ? 'active' : 'inactive'}`}>
                                {api.twoFactorEnabled ? 'Aktif' : 'Pasif'}
                            </span>
                        </div>
                        <div className="status-item">
                            <span className="status-icon">{'💻'}</span>
                            <span className="status-label">Aktif Oturumlar:</span>
                            <span className="status-value">{api.sessions.length}</span>
                        </div>
                        <div className="status-item">
                            <span className="status-icon">{'🌐'}</span>
                            <span className="status-label">IP Whitelist:</span>
                            <span className="status-value">{api.ipWhitelist.length}</span>
                        </div>
                    </div>
                )}

                <div className="security-tabs">
                    {[['2fa', '🔐 2FA'], ['sessions', '💻 Oturumlar'], ['ip', '🌐 IP Whitelist']].map(([key, label]) => (
                        <button key={key} className={`tab-btn ${api.activeTab === key ? 'active' : ''}`}
                            onClick={() => api.setActiveTab(key)}>{label}</button>
                    ))}
                </div>

                <div className="security-content">
                    {api.activeTab === '2fa' && <TwoFactorTab {...api} />}
                    {api.activeTab === 'sessions' && <SessionsTab {...api} />}
                    {api.activeTab === 'ip' && <IPWhitelistTab {...api} />}
                </div>
            </div>
        </div>
    );
};

export default SecuritySettingsPanel;
