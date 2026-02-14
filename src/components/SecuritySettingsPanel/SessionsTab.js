import React from 'react';

const SessionsTab = ({ sessions, revokeSession, revokeAllSessions }) => (
    <div className="tab-content">
        <div className="sessions-header">
            <h3>Aktif Oturumlar</h3>
            <button className="revoke-all-btn" onClick={revokeAllSessions}>T\u00FCm\u00FCn\u00FC Sonland\u0131r</button>
        </div>
        <div className="sessions-list">
            {sessions.map((session) => (
                <div key={session.id} className="session-card">
                    <div className="session-info">
                        <div className="session-device">
                            <span className="device-icon">{session.device_type === 'mobile' ? '\uD83D\uDCF1' : '\uD83D\uDCBB'}</span>
                            <div className="device-details">
                                <span className="device-name">{session.device_name || 'Bilinmeyen Cihaz'}</span>
                                <span className="device-location">{session.location || 'Bilinmeyen Konum'}</span>
                            </div>
                        </div>
                        <div className="session-meta">
                            <span className="session-ip">IP: {session.ip_address}</span>
                            <span className="session-time">Son Aktivite: {new Date(session.last_activity).toLocaleString('tr-TR')}</span>
                        </div>
                    </div>
                    {session.is_current ? (
                        <span className="current-badge">Mevcut Oturum</span>
                    ) : (
                        <button className="revoke-btn" onClick={() => revokeSession(session.id)}>Sonland\u0131r</button>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default SessionsTab;
