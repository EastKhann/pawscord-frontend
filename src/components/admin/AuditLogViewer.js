// frontend/src/components/AuditLogViewer.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaHistory, FaFilter } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

// -- dynamic style helpers (pass 2) --
const _st1121 = {
    padding: '4px 8px',
    borderRadius: '4px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.75em',
    height: 'fit-content',
    textTransform: 'uppercase',
};

const AuditLogViewer = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
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
            logger.error('Load audit logs error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getActionColor = (action) => {
        if (action.includes('delete') || action.includes('ban')) return '#f23f42';
        if (action.includes('create') || action.includes('add')) return '#23a559';
        if (action.includes('update') || action.includes('edit')) return '#f0b232';
        return '#5865f2';
    };

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        <FaHistory /> Audit Logs
                    </h2>
                    <button aria-label={t('common.close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.filters}>
                    <button
                        aria-label={t('common.filter', 'Filter')}
                        onClick={() => setFilter('all')}
                        style={{
                            ...styles.filterButton,
                            backgroundColor: filter === 'all' ? '#5865f2' : '#1e2024',
                        }}
                    >
                        All
                    </button>
                    <button
                        aria-label={t('common.filter', 'Filter')}
                        onClick={() => setFilter('moderation')}
                        style={{
                            ...styles.filterButton,
                            backgroundColor: filter === 'moderation' ? '#5865f2' : '#1e2024',
                        }}
                    >
                        Moderasyon
                    </button>
                    <button
                        aria-label={t('common.filter', 'Filter')}
                        onClick={() => setFilter('server')}
                        style={{
                            ...styles.filterButton,
                            backgroundColor: filter === 'server' ? '#5865f2' : '#1e2024',
                        }}
                    >
                        Server
                    </button>
                    <button
                        aria-label={t('common.filter', 'Filter')}
                        onClick={() => setFilter('user')}
                        style={{
                            ...styles.filterButton,
                            backgroundColor: filter === 'user' ? '#5865f2' : '#1e2024',
                        }}
                    >
                        User
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : logs.length === 0 ? (
                        <div style={styles.empty}>{t('admin.logs.noLogs', 'Kayıt bulunamadı')}</div>
                    ) : (
                        <div style={styles.logList}>
                            {logs.map((log, idx) => (
                                <div key={`item-${idx}`} style={styles.logItem}>
                                    <div style={_st1121}>{log.action}</div>
                                    <div style={styles.logDetails}>
                                        <div style={styles.logUser}>{log.user}</div>
                                        <div style={styles.logDescription}>{log.description}</div>
                                        <div style={styles.logTime}>
                                            {new Date(log.timestamp).toLocaleString('tr-TR')}
                                        </div>
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
        zIndex: 10000,
    },
    modal: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #182135',
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.5em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '1.5em',
    },
    filters: {
        display: 'flex',
        gap: '8px',
        padding: '15px',
        borderBottom: '1px solid #182135',
    },
    filterButton: {
        padding: '8px 15px',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '0.85em',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#b5bac1',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#b5bac1',
        padding: '40px',
    },
    logList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    logItem: {
        backgroundColor: '#1e2024',
        padding: '12px',
        borderRadius: '8px',
        display: 'flex',
        gap: '12px',
    },
    actionBadge: {
        padding: '4px 8px',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.75em',
        height: 'fit-content',
        textTransform: 'uppercase',
    },
    logDetails: {
        flex: 1,
    },
    logUser: {
        color: '#5865f2',
        fontWeight: 'bold',
        marginBottom: '4px',
    },
    logDescription: {
        color: '#dbdee1',
        fontSize: '0.9em',
        marginBottom: '4px',
    },
    logTime: {
        color: '#949ba4',
        fontSize: '0.75em',
    },
};

AuditLogViewer.propTypes = {
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default AuditLogViewer;
