// frontend/src/components/AuditLogViewer.js
import { useState, useEffect } from 'react';
import { FaTimes, FaHistory, FaFilter } from 'react-icons/fa';

const AuditLogViewer = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadLogs();
    }, [filter]);

    const loadLogs = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/audit/logs/?filter=${filter}`);
            if (res.ok) {
                const data = await res.json();
                setLogs(data.logs || []);
            }
        } catch (error) {
            console.error('Load audit logs error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getActionColor = (action) => {
        if (action.includes('delete') || action.includes('ban')) return '#f04747';
        if (action.includes('create') || action.includes('add')) return '#43b581';
        if (action.includes('update') || action.includes('edit')) return '#faa61a';
        return '#5865f2';
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        <FaHistory /> Audit Logları
                    </h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.filters}>
                    <button onClick={() => setFilter('all')} style={{ ...styles.filterButton, backgroundColor: filter === 'all' ? '#5865f2' : '#40444b' }}>
                        Tümü
                    </button>
                    <button onClick={() => setFilter('moderation')} style={{ ...styles.filterButton, backgroundColor: filter === 'moderation' ? '#5865f2' : '#40444b' }}>
                        Moderasyon
                    </button>
                    <button onClick={() => setFilter('server')} style={{ ...styles.filterButton, backgroundColor: filter === 'server' ? '#5865f2' : '#40444b' }}>
                        Sunucu
                    </button>
                    <button onClick={() => setFilter('user')} style={{ ...styles.filterButton, backgroundColor: filter === 'user' ? '#5865f2' : '#40444b' }}>
                        Kullanıcı
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : logs.length === 0 ? (
                        <div style={styles.empty}>Log bulunamadı</div>
                    ) : (
                        <div style={styles.logList}>
                            {logs.map((log, idx) => (
                                <div key={idx} style={styles.logItem}>
                                    <div style={{ ...styles.actionBadge, backgroundColor: getActionColor(log.action) }}>
                                        {log.action}
                                    </div>
                                    <div style={styles.logDetails}>
                                        <div style={styles.logUser}>{log.user}</div>
                                        <div style={styles.logDescription}>{log.description}</div>
                                        <div style={styles.logTime}>{new Date(log.timestamp).toLocaleString('tr-TR')}</div>
                                    </div>
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
        maxWidth: '800px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
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
        fontSize: '1.5em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '1.5em'
    },
    filters: {
        display: 'flex',
        gap: '8px',
        padding: '15px',
        borderBottom: '1px solid #40444b'
    },
    filterButton: {
        padding: '8px 15px',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '0.85em'
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
    logList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    logItem: {
        backgroundColor: '#40444b',
        padding: '12px',
        borderRadius: '8px',
        display: 'flex',
        gap: '12px'
    },
    actionBadge: {
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.75em',
        height: 'fit-content',
        textTransform: 'uppercase'
    },
    logDetails: {
        flex: 1
    },
    logUser: {
        color: '#5865f2',
        fontWeight: 'bold',
        marginBottom: '4px'
    },
    logDescription: {
        color: '#dcddde',
        fontSize: '0.9em',
        marginBottom: '4px'
    },
    logTime: {
        color: '#72767d',
        fontSize: '0.75em'
    }
};

export default AuditLogViewer;


