import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaSignInAlt, FaSignOutAlt, FaDownload } from 'react-icons/fa';
import { toast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

const _st1177 = {
    padding: '8px 16px',
    backgroundColor: '#5865f2',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    border: 'none',
};
const _st1178 = {
    padding: '8px 16px',
    backgroundColor: '#111214',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
};
const _st1179 = {
    padding: '8px 16px',
    backgroundColor: '#111214',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
};

const JoinLeaveLogsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all'); // all, joins, leaves

    useEffect(() => {
        fetchLogs();
    }, [serverId]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/logs/`);
            const data = await response.json();
            setLogs(data.logs || []);
        } catch (error) {
            toast.error(t('logs.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const exportLogs = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/logs/export/`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `join_leave_logs_${new Date().toISOString()}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            toast.success(t('logs.exported'));
        } catch (error) {
            toast.error(t('logs.exportFailed'));
        }
    };

    const filteredLogs = logs.filter((log) => {
        if (filter === 'all') return true;
        return log.action === filter;
    });

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaSignInAlt className="icon-primary-mr10" />
                        <h2 style={styles.title}>Katılma/Ayrılma Günlükleri</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.filters}>
                    <button aria-label="Filter" onClick={() => setFilter('all')} style={_st1177}>
                        All ({logs.length})
                    </button>
                    <button aria-label="Filter" onClick={() => setFilter('joined')} style={_st1178}>
                        🟢 Joins ({logs.filter((l) => l.action === 'joined').length})
                    </button>
                    <button aria-label="Filter" onClick={() => setFilter('left')} style={_st1179}>
                        🔴 Leaves ({logs.filter((l) => l.action === 'left').length})
                    </button>
                    <button
                        aria-label="export Logs"
                        onClick={exportLogs}
                        style={styles.exportButton}
                    >
                        <FaDownload className="mr-5" />
                        Export
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loglar yükleniyor...</div>
                    ) : filteredLogs.length === 0 ? (
                        <div style={styles.empty}>Log bulunamadı</div>
                    ) : (
                        <div style={styles.logsList}>
                            {filteredLogs.map((log, idx) => (
                                <div key={`item-${idx}`} style={styles.logItem}>
                                    <div style={styles.logIcon}>
                                        {log.action === 'joined' ? (
                                            <FaSignInAlt className="icon-success" />
                                        ) : (
                                            <FaSignOutAlt className="icon-danger" />
                                        )}
                                    </div>
                                    <div style={styles.logInfo}>
                                        <div style={styles.logUser}>
                                            {log.user?.username || 'Unknown User'}
                                        </div>
                                        <div style={styles.logAction}>
                                            {log.action === 'joined'
                                                ? 'Joined the server'
                                                : 'Left the server'}
                                        </div>
                                        {log.invite_code && (
                                            <div style={styles.logMeta}>
                                                via invite: {log.invite_code}
                                            </div>
                                        )}
                                    </div>
                                    <div style={styles.logTime}>
                                        {new Date(log.timestamp).toLocaleString()}
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
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
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
    filters: {
        display: 'flex',
        gap: '10px',
        padding: '15px 20px',
        borderBottom: '1px solid #0e1222',
        flexWrap: 'wrap',
    },
    filterButton: {
        padding: '8px 16px',
        backgroundColor: '#111214',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
    },
    filterButtonActive: {
        backgroundColor: '#5865f2',
    },
    exportButton: {
        marginLeft: 'auto',
        padding: '8px 16px',
        backgroundColor: '#23a559',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
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
    logsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    logItem: {
        backgroundColor: '#111214',
        borderRadius: '6px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    logIcon: {
        fontSize: '20px',
    },
    logInfo: {
        flex: 1,
    },
    logUser: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '4px',
    },
    logAction: {
        fontSize: '14px',
        color: '#dbdee1',
        marginBottom: '2px',
    },
    logMeta: {
        fontSize: '12px',
        color: '#949ba4',
    },
    logTime: {
        fontSize: '13px',
        color: '#949ba4',
    },
};

JoinLeaveLogsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    serverId: PropTypes.string,
};
export default JoinLeaveLogsPanel;
