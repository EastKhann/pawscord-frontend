import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    FaTimes,
    FaLaptop,
    FaMobile,
    FaTablet,
    FaTrash,
    FaMapMarkerAlt,
    FaClock,
} from 'react-icons/fa';
import { toast } from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

// -- dynamic style helpers (pass 2) --

const _st1163 = {
    backgroundColor: '#111214',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
};

const SessionManagementPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
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
            toast.error(t('security.sessionsLoadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const revokeSession = async (sessionId) => {
        if (!(await confirmDialog(t('security.revokeSessionConfirm')))) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/sessions/revoke/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session_id: sessionId }),
            });

            toast.success(t('security.sessionRevoked'));
            fetchSessions();
        } catch (error) {
            toast.error(t('security.sessionRevokeFailed'));
        }
    };

    const revokeAllSessions = async () => {
        if (!(await confirmDialog(t('security.revokeAllSessionsConfirm')))) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/security/sessions/revoke-all/`, {
                method: 'POST',
            });

            toast.success(t('security.allSessionsRevoked'));
            fetchSessions();
        } catch (error) {
            toast.error(t('security.allSessionsRevokeFailed'));
        }
    };

    const getDeviceIcon = (deviceType) => {
        switch (deviceType) {
            case 'mobile':
                return <FaMobile className="icon-primary-24" />;
            case 'tablet':
                return <FaTablet className="icon-primary-24" />;
            default:
                return <FaLaptop className="icon-primary-24" />;
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaLaptop className="icon-primary-mr10" />
                        <h2 style={styles.title}>Aktif Oturumlar</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <div style={styles.sessionCount}>
                        {sessions.length} active {sessions.length === 1 ? 'session' : 'sessions'}
                    </div>
                    <button
                        aria-label="revoke All Sessions"
                        onClick={revokeAllSessions}
                        style={styles.revokeAllButton}
                    >
                        Sign Out All Other Devices
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Oturumlar yükleniyor...</div>
                    ) : sessions.length === 0 ? (
                        <div style={styles.empty}>Aktif oturum bulunamadı</div>
                    ) : (
                        <div style={styles.sessionsList}>
                            {sessions.map((session, idx) => (
                                <div key={`item-${idx}`} style={_st1163}>
                                    <div style={styles.sessionIcon}>
                                        {getDeviceIcon(session.device_type)}
                                    </div>
                                    <div style={styles.sessionInfo}>
                                        <div style={styles.sessionDevice}>
                                            {session.device_name || 'Unknown Device'}
                                            {session.is_current && (
                                                <span style={styles.currentBadge}>
                                                    Mevcut Oturum
                                                </span>
                                            )}
                                        </div>
                                        <div style={styles.sessionDetails}>
                                            <div style={styles.detailItem}>
                                                <FaMapMarkerAlt className="mr5-fs12" />
                                                {session.location || 'Unknown Location'}
                                            </div>
                                            <div style={styles.detailItem}>
                                                <FaClock className="mr5-fs12" />
                                                Last active:{' '}
                                                {new Date(session.last_activity).toLocaleString()}
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
                                            aria-label="Action button"
                                            onClick={() => revokeSession(session.id)}
                                            style={styles.revokeButton}
                                            title="Oturumu Kapat"
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
        borderBottom: '1px solid #0e1222',
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
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        borderBottom: '1px solid #0e1222',
    },
    sessionCount: {
        fontSize: '14px',
        color: '#dbdee1',
    },
    revokeAllButton: {
        padding: '8px 16px',
        backgroundColor: '#f23f42',
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
        color: '#949ba4',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    sessionsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    sessionCard: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
    },
    currentSession: {
        border: '2px solid #23a559',
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
        backgroundColor: '#23a559',
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
        color: '#949ba4',
        display: 'flex',
        alignItems: 'center',
    },
    revokeButton: {
        background: 'none',
        border: 'none',
        color: '#f23f42',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '8px',
    },
};

SessionManagementPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default SessionManagementPanel;
