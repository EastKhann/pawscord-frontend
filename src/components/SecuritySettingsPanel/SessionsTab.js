import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const SessionsTab = ({ sessions, revokeSession, revokeAllSessions }) => {
    const { t } = useTranslation();
    return (
        <div aria-label="sessions tab" className="tab-content">
            <div className="sessions-header">
                <h3>{t('active_oturumlar')}</h3>
                <button className="revoke-all-btn" onClick={revokeAllSessions}>
                    {t('allnü_sonlandır')}
                </button>
            </div>
            <div className="sessions-list">
                {sessions.map((session) => (
                    <div key={session.id} className="session-card">
                        <div className="session-info">
                            <div className="session-device">
                                <span className="device-icon">
                                    {session.device_type === 'mobile' ? '📱' : '💻'}
                                </span>
                                <div className="device-details">
                                    <span className="device-name">
                                        {session.device_name || t('session.unknownDevice')}
                                    </span>
                                    <span className="device-location">
                                        {session.location || t('session.unknownLocation')}
                                    </span>
                                </div>
                            </div>
                            <div className="session-meta">
                                <span className="session-ip">IP: {session.ip_address}</span>
                                <span className="session-time">
                                    {t('session.lastActivity')}:{' '}
                                    {new Date(session.last_activity).toLocaleString()}
                                </span>
                            </div>
                        </div>
                        {session.is_current ? (
                            <span className="current-badge">{t('mevcut_oturum')}</span>
                        ) : (
                            <button
                                className="revoke-btn"
                                onClick={() => revokeSession(session.id)}
                            >
                                {t('sonlandır')}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

SessionsTab.propTypes = {
    sessions: PropTypes.array,
    revokeSession: PropTypes.object,
    revokeAllSessions: PropTypes.array,
};
export default SessionsTab;
