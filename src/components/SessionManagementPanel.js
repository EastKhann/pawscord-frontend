import React, { useState, useEffect } from 'react';
import { FaTimes, FaLaptop, FaMobile, FaTablet, FaTrash, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { toast } from '../utils/toast';

const SessionManagementPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/sessions/list/`);
            const data = await response.json();
            setSessions(data.sessions || []);
        } catch (error) {
            toast.error('Failed to load sessions');
        } finally {
            setLoading(false);
        }
    };

    const revokeSession = async (sessionId) => {
        if (!confirm('Are you sure you want to sign out this device?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/sessions/revoke/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId })
            });

            toast.success('Session revoked successfully');
            fetchSessions();
        } catch (error) {
            toast.error('Failed to revoke session');
        }
    };

    const revokeAllSessions = async () => {
        if (!confirm('This will sign you out from ALL devices except this one. Continue?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/security/sessions/revoke-all/`, {
                method: 'POST'
            });

            toast.success('All other sessions revoked');
            fetchSessions();
        } catch (error) {
            toast.error('Failed to revoke sessions');
        }
    };

    const getDeviceIcon = (deviceType) => {
        switch (deviceType) {
            case 'mobile':
                return <FaMobile style={{ fontSize: '24px', color: '#5865f2' }} />;
            case 'tablet':
                return <FaTablet style={{ fontSize: '24px', color: '#5865f2' }} />;
            default:
                return <FaLaptop style={{ fontSize: '24px', color: '#5865f2' }} />;
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaLaptop style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Active Sessions</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <div style={styles.sessionCount}>{sessions.length} active {sessions.length === 1 ? 'session' : 'sessions'}</div>
                    <button onClick={revokeAllSessions} style={styles.revokeAllButton}>
                        Sign Out All Other Devices
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading sessions...</div>
                    ) : sessions.length === 0 ? (
                        <div style={styles.empty}>No active sessions found</div>
                    ) : (
                        <div style={styles.sessionsList}>
                            {sessions.map((session, idx) => (
                                <div key={idx} style={{ ...styles.sessionCard, ...(session.is_current && styles.currentSession) }}>
                                    <div style={styles.sessionIcon}>
                                        {getDeviceIcon(session.device_type)}
                                    </div>
                                    <div style={styles.sessionInfo}>
                                        <div style={styles.sessionDevice}>
                                            {session.device_name || 'Unknown Device'}
                                            {session.is_current && (
                                                <span style={styles.currentBadge}>Current Session</span>
                                            )}
                                        </div>
                                        <div style={styles.sessionDetails}>
                                            <div style={styles.detailItem}>
                                                <FaMapMarkerAlt style={{ marginRight: '5px', fontSize: '12px' }} />
                                                {session.location || 'Unknown Location'}
                                            </div>
                                            <div style={styles.detailItem}>
                                                <FaClock style={{ marginRight: '5px', fontSize: '12px' }} />
                                                Last active: {new Date(session.last_activity).toLocaleString()}
                                            </div>
                                            {session.ip_address && (
                                                <div style={styles.detailItem}>
                                                    IP: {session.ip_address}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {!session.is_current && (
                                        <button
                                            onClick={() => revokeSession(session.id)}
                                            style={styles.revokeButton}
                                            title="Sign Out"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        borderBottom: '1px solid #2c2f33',
    },
    sessionCount: {
        fontSize: '14px',
        color: '#dcddde',
    },
    revokeAllButton: {
        padding: '8px 16px',
        backgroundColor: '#f04747',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    sessionsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    sessionCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
    },
    currentSession: {
        border: '2px solid #43b581',
    },
    sessionIcon: {
        minWidth: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sessionInfo: {
        flex: 1,
    },
    sessionDevice: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    currentBadge: {
        fontSize: '11px',
        padding: '4px 8px',
        backgroundColor: '#43b581',
        borderRadius: '4px',
        fontWeight: '600',
    },
    sessionDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    detailItem: {
        fontSize: '13px',
        color: '#99aab5',
        display: 'flex',
        alignItems: 'center',
    },
    revokeButton: {
        background: 'none',
        border: 'none',
        color: '#f04747',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '8px',
    },
};

export default SessionManagementPanel;
