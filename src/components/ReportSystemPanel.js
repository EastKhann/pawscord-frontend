// frontend/src/components/ReportSystemPanel.js
import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaFlag, FaCheck, FaTimes, FaEye, FaBan, FaTrash, FaFilter, FaUser, FaComment } from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

/**
 * 🚩 Report System Panel
 * Handle user reports for messages, users, and servers
 */
const ReportSystemPanel = ({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
    const [reports, setReports] = useState([]);
    const [filter, setFilter] = useState('pending'); // pending, resolved, all
    const [typeFilter, setTypeFilter] = useState('all'); // all, message, user, server
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        pending: 0,
        resolved: 0,
        dismissed: 0,
        total: 0
    });

    useEffect(() => {
        loadReports();
        loadStats();
    }, [serverId, filter, typeFilter]);

    const loadReports = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                server: serverId,
                status: filter !== 'all' ? filter : '',
                report_type: typeFilter !== 'all' ? typeFilter : ''
            });

            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/reports/?${queryParams}`);
            if (res.ok) {
                const data = await res.json();
                setReports(data.results || data);
            }
        } catch (error) {
            console.error('Failed to load reports:', error);
        }
        setLoading(false);
    };

    const loadStats = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/reports/stats/${serverId}/`);
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    };

    const handleReport = async (reportId, action, reason = '') => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/reports/${reportId}/handle/`, {
                method: 'POST',
                body: JSON.stringify({
                    action, // 'resolve', 'dismiss', 'ban_user', 'delete_message'
                    reason,
                    moderator_notes: reason
                })
            });

            if (res.ok) {
                loadReports();
                loadStats();
                setSelectedReport(null);
            } else {
                toast.error('❌ Failed to handle report');
            }
        } catch (error) {
            console.error('Failed to handle report:', error);
        }
    };

    const getReportIcon = (type) => {
        switch (type) {
            case 'message': return <FaComment />;
            case 'user': return <FaUser />;
            case 'server': return <FaFlag />;
            default: return <FaFlag />;
        }
    };

    const getReportBadgeColor = (status) => {
        switch (status) {
            case 'pending': return '#f0b132';
            case 'resolved': return '#43b581';
            case 'dismissed': return '#72767d';
            default: return '#5865f2';
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'low': return '#43b581';
            case 'medium': return '#f0b132';
            case 'high': return '#ed4245';
            case 'critical': return '#a12929';
            default: return '#72767d';
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaFlag style={styles.headerIcon} />
                        <h2 style={styles.title}>Report System</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {/* Stats */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaFlag style={{ ...styles.statIcon, color: '#f0b132' }} />
                        <div style={styles.statValue}>{stats.pending}</div>
                        <div style={styles.statLabel}>Pending</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaCheck style={{ ...styles.statIcon, color: '#43b581' }} />
                        <div style={styles.statValue}>{stats.resolved}</div>
                        <div style={styles.statLabel}>Resolved</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaTimes style={{ ...styles.statIcon, color: '#72767d' }} />
                        <div style={styles.statValue}>{stats.dismissed}</div>
                        <div style={styles.statLabel}>Dismissed</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaEye style={{ ...styles.statIcon, color: '#5865f2' }} />
                        <div style={styles.statValue}>{stats.total}</div>
                        <div style={styles.statLabel}>Total Reports</div>
                    </div>
                </div>

                {/* Filters */}
                <div style={styles.filters}>
                    <div style={styles.filterGroup}>
                        <FaFilter style={styles.filterIcon} />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={styles.filterSelect}
                        >
                            <option value="all">All Reports</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                            <option value="dismissed">Dismissed</option>
                        </select>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            style={styles.filterSelect}
                        >
                            <option value="all">All Types</option>
                            <option value="message">Messages</option>
                            <option value="user">Users</option>
                            <option value="server">Server</option>
                        </select>
                    </div>
                </div>

                {/* Reports List */}
                <div style={styles.reportsList}>
                    {loading ? (
                        <div style={styles.loading}>Loading reports...</div>
                    ) : reports.length === 0 ? (
                        <div style={styles.empty}>
                            <FaFlag style={styles.emptyIcon} />
                            <p>No reports found</p>
                        </div>
                    ) : (
                        reports.map((report) => (
                            <div
                                key={report.id}
                                style={styles.reportCard}
                                onClick={() => setSelectedReport(report)}
                            >
                                <div style={styles.reportHeader}>
                                    <div style={styles.reportIcon}>
                                        {getReportIcon(report.report_type)}
                                    </div>
                                    <div style={styles.reportInfo}>
                                        <div style={styles.reportTitle}>
                                            {report.reason || `${report.report_type} Report`}
                                        </div>
                                        <div style={styles.reportMeta}>
                                            <span>By: {report.reporter_username || 'Unknown'}</span>
                                            <span>•</span>
                                            <span>{new Date(report.created_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div style={styles.reportBadges}>
                                        <span
                                            style={{
                                                ...styles.badge,
                                                backgroundColor: getReportBadgeColor(report.status)
                                            }}
                                        >
                                            {report.status}
                                        </span>
                                        {report.severity && (
                                            <span
                                                style={{
                                                    ...styles.badge,
                                                    backgroundColor: getSeverityColor(report.severity)
                                                }}
                                            >
                                                {report.severity}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div style={styles.reportContent}>
                                    <p style={styles.reportText}>{report.description}</p>
                                    {report.message_content && (
                                        <div style={styles.reportedContent}>
                                            <strong>Reported Content:</strong>
                                            <p>{report.message_content}</p>
                                        </div>
                                    )}
                                    {report.reported_username && (
                                        <div style={styles.reportedUser}>
                                            <FaUser />
                                            <span>Reported User: {report.reported_username}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Report Detail Modal */}
                {selectedReport && (
                    <div style={styles.modalOverlay} onClick={() => setSelectedReport(null)}>
                        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <div style={styles.modalHeader}>
                                <h3 style={styles.modalTitle}>Report Details</h3>
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    style={styles.modalClose}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                            <div style={styles.modalContent}>
                                <div style={styles.detailRow}>
                                    <strong>Report Type:</strong>
                                    <span>{selectedReport.report_type}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <strong>Status:</strong>
                                    <span
                                        style={{
                                            ...styles.badge,
                                            backgroundColor: getReportBadgeColor(selectedReport.status)
                                        }}
                                    >
                                        {selectedReport.status}
                                    </span>
                                </div>
                                <div style={styles.detailRow}>
                                    <strong>Severity:</strong>
                                    <span
                                        style={{
                                            ...styles.badge,
                                            backgroundColor: getSeverityColor(selectedReport.severity)
                                        }}
                                    >
                                        {selectedReport.severity || 'N/A'}
                                    </span>
                                </div>
                                <div style={styles.detailRow}>
                                    <strong>Reporter:</strong>
                                    <span>{selectedReport.reporter_username}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <strong>Reported User:</strong>
                                    <span>{selectedReport.reported_username || 'N/A'}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <strong>Created:</strong>
                                    <span>{new Date(selectedReport.created_at).toLocaleString()}</span>
                                </div>
                                <div style={styles.detailSection}>
                                    <strong>Reason:</strong>
                                    <p style={styles.detailText}>{selectedReport.reason}</p>
                                </div>
                                <div style={styles.detailSection}>
                                    <strong>Description:</strong>
                                    <p style={styles.detailText}>{selectedReport.description}</p>
                                </div>
                                {selectedReport.message_content && (
                                    <div style={styles.detailSection}>
                                        <strong>Reported Message:</strong>
                                        <div style={styles.messageBox}>
                                            {selectedReport.message_content}
                                        </div>
                                    </div>
                                )}
                                {selectedReport.moderator_notes && (
                                    <div style={styles.detailSection}>
                                        <strong>Moderator Notes:</strong>
                                        <p style={styles.detailText}>{selectedReport.moderator_notes}</p>
                                    </div>
                                )}
                            </div>
                            {selectedReport.status === 'pending' && (
                                <div style={styles.modalActions}>
                                    <button
                                        onClick={() => {
                                            const reason = prompt('Resolution notes (optional):');
                                            handleReport(selectedReport.id, 'resolve', reason || '');
                                        }}
                                        style={styles.actionBtn}
                                    >
                                        <FaCheck /> Resolve
                                    </button>
                                    {selectedReport.message_id && (
                                        <button
                                            onClick={async () => {
                                                if (await confirmDialog('Delete this message?')) {
                                                    handleReport(selectedReport.id, 'delete_message');
                                                }
                                            }}
                                            style={{ ...styles.actionBtn, backgroundColor: '#ed4245' }}
                                        >
                                            <FaTrash /> Delete Message
                                        </button>
                                    )}
                                    {selectedReport.reported_user && (
                                        <button
                                            onClick={async () => {
                                                if (await confirmDialog('Ban this user?')) {
                                                    const reason = prompt('Ban reason:');
                                                    if (reason) {
                                                        handleReport(selectedReport.id, 'ban_user', reason);
                                                    }
                                                }
                                            }}
                                            style={{ ...styles.actionBtn, backgroundColor: '#a12929' }}
                                        >
                                            <FaBan /> Ban User
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            const reason = prompt('Dismiss reason:');
                                            if (reason) {
                                                handleReport(selectedReport.id, 'dismiss', reason);
                                            }
                                        }}
                                        style={{ ...styles.actionBtn, backgroundColor: '#72767d' }}
                                    >
                                        <FaTimes /> Dismiss
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
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
        backdropFilter: 'blur(5px)'
    },
    panel: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #1e1f22'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerIcon: {
        fontSize: '24px',
        color: '#f0b132'
    },
    title: {
        margin: 0,
        color: '#fff',
        fontSize: '24px',
        fontWeight: '600'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '24px',
        padding: '8px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        padding: '20px',
        borderBottom: '1px solid #1e1f22'
    },
    statCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center'
    },
    statIcon: {
        fontSize: '32px',
        marginBottom: '8px'
    },
    statValue: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '4px'
    },
    statLabel: {
        fontSize: '13px',
        color: '#b9bbbe'
    },
    filters: {
        padding: '16px 20px',
        borderBottom: '1px solid #1e1f22',
        backgroundColor: '#1e1f22'
    },
    filterGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    filterIcon: {
        color: '#b9bbbe',
        fontSize: '16px'
    },
    filterSelect: {
        backgroundColor: '#2b2d31',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '8px 12px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer'
    },
    reportsList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    loading: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px',
        fontSize: '14px'
    },
    empty: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '60px'
    },
    emptyIcon: {
        fontSize: '48px',
        marginBottom: '16px',
        opacity: 0.5
    },
    reportCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#2b2d31'
        }
    },
    reportHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '12px'
    },
    reportIcon: {
        fontSize: '20px',
        color: '#f0b132',
        marginTop: '4px'
    },
    reportInfo: {
        flex: 1
    },
    reportTitle: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '4px'
    },
    reportMeta: {
        color: '#72767d',
        fontSize: '13px',
        display: 'flex',
        gap: '8px'
    },
    reportBadges: {
        display: 'flex',
        gap: '8px'
    },
    badge: {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600',
        color: '#fff',
        textTransform: 'uppercase'
    },
    reportContent: {
        paddingLeft: '32px'
    },
    reportText: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: '0 0 12px 0'
    },
    reportedContent: {
        backgroundColor: '#2b2d31',
        padding: '12px',
        borderRadius: '6px',
        borderLeft: '3px solid #ed4245',
        marginBottom: '12px'
    },
    reportedUser: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#b9bbbe',
        fontSize: '13px'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #1e1f22'
    },
    modalTitle: {
        margin: 0,
        color: '#fff',
        fontSize: '20px',
        fontWeight: '600'
    },
    modalClose: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '20px'
    },
    modalContent: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid #1e1f22',
        color: '#fff',
        fontSize: '14px'
    },
    detailSection: {
        marginTop: '20px'
    },
    detailText: {
        color: '#b9bbbe',
        fontSize: '14px',
        marginTop: '8px',
        lineHeight: '1.5'
    },
    messageBox: {
        backgroundColor: '#1e1f22',
        padding: '12px',
        borderRadius: '6px',
        borderLeft: '3px solid #ed4245',
        color: '#fff',
        fontSize: '14px',
        marginTop: '8px'
    },
    modalActions: {
        display: 'flex',
        gap: '12px',
        padding: '16px 20px',
        borderTop: '1px solid #1e1f22',
        flexWrap: 'wrap'
    },
    actionBtn: {
        flex: 1,
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minWidth: '120px'
    }
};

export default ReportSystemPanel;


