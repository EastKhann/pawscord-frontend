// frontend/src/components/AuditLogPanel.js
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FaHistory, FaTimes, FaFilter, FaDownload, FaSearch } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const AuditLogPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState('7days');

    useEffect(() => {
        loadAuditLogs();
    }, [serverId, filterType, dateRange]);

    const loadAuditLogs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                filter: filterType,
                range: dateRange,
            });
            const res = await fetchWithAuth(
                `${apiBaseUrl}/servers/${serverId}/audit-logs/?${params}`
            );
            if (res.ok) {
                const data = await res.json();
                setLogs(data.logs || []);
            }
        } catch (error) {
            logger.error('Audit log fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportLogs = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/audit-logs/export/`);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `audit-log-${serverId}-${Date.now()}.csv`;
            a.click();
        } catch (error) {
            logger.error('Export error:', error);
        }
    };

    const getActionIcon = (action) => {
        const icons = {
            member_join: '👋',
            member_leave: '👋',
            member_kick: '👢',
            member_ban: '🔨',
            channel_create: '➕',
            channel_delete: '🗑️',
            channel_update: '✏️',
            role_create: '🎭',
            role_delete: '🗑️',
            role_update: '✏️',
            message_delete: '🗑️',
            message_bulk_delete: '🗑️',
            server_update: '⚙️',
            invite_create: '🔗',
            webhook_create: '🪝',
            webhook_delete: '🗑️',
        };
        return icons[action] || '📝';
    };

    const getActionColor = (action) => {
        if (action.includes('delete') || action.includes('kick') || action.includes('ban')) {
            return '#f23f42';
        }
        if (action.includes('create') || action.includes('join')) {
            return '#3ba55d';
        }
        return '#f0b232';
    };

    const filteredLogs = useMemo(
        () =>
            logs.filter((log) => {
                const matchesSearch =
                    log.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    log.user?.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesSearch;
            }),
        [logs, searchQuery]
    );

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaHistory size={20} color="#5865f2" />
                        <h2 style={styles.title}>{t('auditLog.title')}</h2>
                    </div>
                    <button aria-label="on Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Filters */}
                <div style={styles.filters}>
                    <div style={styles.searchBox}>
                        <FaSearch size={14} color="#b5bac1" />
                        <input
                            type="text"
                            placeholder={t('common.search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={styles.select}
                    >
                        <option value="all">{t('auditLog.allActions')}</option>
                        <option value="members">{t('auditLog.memberActions')}</option>
                        <option value="channels">{t('auditLog.channelActions')}</option>
                        <option value="roles">{t('auditLog.roleActions')}</option>
                        <option value="messages">{t('auditLog.messageActions')}</option>
                        <option value="server">{t('auditLog.serverActions')}</option>
                    </select>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        style={styles.select}
                    >
                        <option value="1day">{t('auditLog.last24Hours')}</option>
                        <option value="7days">{t('auditLog.last7Days')}</option>
                        <option value="30days">{t('auditLog.last30Days')}</option>
                        <option value="90days">{t('auditLog.last90Days')}</option>
                    </select>
                    <button
                        aria-label="export Logs"
                        onClick={exportLogs}
                        style={styles.exportButton}
                    >
                        <FaDownload size={14} />
                        <span>{t('auditLog.export')}</span>
                    </button>
                </div>

                {/* Logs List */}
                <div style={styles.logsList}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : filteredLogs.length === 0 ? (
                        <div style={styles.empty}>
                            <FaHistory size={48} color="#4e5058" />
                            <p>{t('auditLog.noLogs')}</p>
                        </div>
                    ) : (
                        filteredLogs.map((log, index) => (
                            <div key={`item-${index}`} style={styles.logItem}>
                                <div style={styles.logIcon}>{getActionIcon(log.action)}</div>
                                <div style={styles.logContent}>
                                    <div style={styles.logDescription}>
                                        <span
                                            style={{
                                                color: getActionColor(log.action),
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {log.user}
                                        </span>
                                        {log.description}
                                    </div>
                                    <div style={styles.logMeta}>
                                        <span>
                                            {new Date(log.timestamp).toLocaleString('tr-TR')}
                                        </span>
                                        {log.target && (
                                            <span>
                                                {' '}
                                                • {t('auditLog.target')}: {log.target}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
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
        padding: '20px',
    },
    panel: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        borderBottom: '1px solid #0b0e1b',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'all 0.2s',
    },
    filters: {
        display: 'flex',
        gap: '12px',
        padding: '16px 20px',
        borderBottom: '1px solid #0b0e1b',
        flexWrap: 'wrap',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#0d0e10',
        padding: '8px 12px',
        borderRadius: '4px',
        flex: 1,
        minWidth: '200px',
    },
    searchInput: {
        background: 'none',
        border: 'none',
        color: '#dbdee1',
        fontSize: '14px',
        outline: 'none',
        width: '100%',
    },
    select: {
        backgroundColor: '#0d0e10',
        border: 'none',
        color: '#dbdee1',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
        outline: 'none',
    },
    exportButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    logsList: {
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#b5bac1',
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b5bac1',
    },
    logItem: {
        display: 'flex',
        gap: '12px',
        padding: '12px',
        marginBottom: '8px',
        backgroundColor: '#17191c',
        borderRadius: '4px',
        borderLeft: '3px solid #5865f2',
        transition: 'all 0.2s',
    },
    logIcon: {
        fontSize: '24px',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logContent: {
        flex: 1,
    },
    logDescription: {
        color: '#dbdee1',
        fontSize: '14px',
        marginBottom: '4px',
    },
    logMeta: {
        fontSize: '12px',
        color: '#949ba4',
    },
};

AuditLogPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default AuditLogPanel;
