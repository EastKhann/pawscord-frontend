// frontend/src/components/SessionManagerModal.js
import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaDesktop, FaMobile, FaTablet, FaTrash, FaCircle } from 'react-icons/fa';

const SessionManagerModal = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/sessions/list/`);
            if (res.ok) {
                const data = await res.json();
                setSessions(data.sessions || []);
            }
        } catch (error) {
            console.error('Load sessions error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRevoke = async (sessionId) => {
        if (!confirm('Bu oturumu sonlandırmak istediğinizden emin misiniz?')) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/sessions/revoke/`, {
                method: 'POST',
                body: JSON.stringify({ session_id: sessionId })
            });

            if (res.ok) {
                setSessions(prev => prev.filter(s => s.id !== sessionId));
                toast.success('✅ Oturum sonlandırıldı');
            } else {
                toast.error('❌ Oturum sonlandırılamadı');
            }
        } catch (error) {
            console.error('Revoke session error:', error);
            toast.error('❌ Bir hata oluştu');
        }
    };

    const getDeviceIcon = (deviceType) => {
        if (deviceType?.includes('mobile') || deviceType?.includes('android') || deviceType?.includes('ios')) {
            return <FaMobile />;
        }
        if (deviceType?.includes('tablet')) return <FaTablet />;
        return <FaDesktop />;
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString('tr-TR');
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        🔐 Aktif Oturumlar
                    </h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : sessions.length === 0 ? (
                        <div style={styles.empty}>Aktif oturum bulunamadı</div>
                    ) : (
                        <div style={styles.sessionList}>
                            {sessions.map(session => (
                                <div key={session.id} style={styles.sessionItem}>
                                    <div style={styles.sessionIcon}>
                                        {getDeviceIcon(session.device_type)}
                                    </div>
                                    <div style={styles.sessionInfo}>
                                        <div style={styles.sessionDevice}>
                                            {session.device_name || session.device_type || 'Bilinmeyen Cihaz'}
                                            {session.is_current && (
                                                <span style={styles.currentBadge}>
                                                    <FaCircle style={{ fontSize: '6px' }} /> Bu Cihaz
                                                </span>
                                            )}
                                        </div>
                                        <div style={styles.sessionDetails}>
                                            {session.ip_address && (
                                                <span>IP: {session.ip_address}</span>
                                            )}
                                            {session.location && (
                                                <span> • {session.location}</span>
                                            )}
                                        </div>
                                        <div style={styles.sessionTime}>
                                            Son Aktivite: {formatDate(session.last_activity || session.created_at)}
                                        </div>
                                    </div>
                                    {!session.is_current && (
                                        <button
                                            onClick={() => handleRevoke(session.id)}
                                            style={styles.revokeButton}
                                            title="Oturumu sonlandır"
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
        zIndex: 10000
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #40444b'
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.5em'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '1.5em',
        padding: '5px'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    loading: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px'
    },
    empty: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px'
    },
    sessionList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    sessionItem: {
        backgroundColor: '#40444b',
        borderRadius: '8px',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    sessionIcon: {
        fontSize: '2em',
        color: '#5865f2',
        minWidth: '40px',
        textAlign: 'center'
    },
    sessionInfo: {
        flex: 1
    },
    sessionDevice: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1em',
        marginBottom: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    currentBadge: {
        backgroundColor: '#3ba55d',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '10px',
        fontSize: '0.7em',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    sessionDetails: {
        color: '#b9bbbe',
        fontSize: '0.85em',
        marginBottom: '3px'
    },
    sessionTime: {
        color: '#72767d',
        fontSize: '0.75em'
    },
    revokeButton: {
        backgroundColor: '#f04747',
        border: 'none',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1em'
    }
};

export default SessionManagerModal;


