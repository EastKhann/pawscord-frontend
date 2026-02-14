// frontend/src/components/ReportSystemPanel.js
import { useEffect } from 'react';
import { FaFlag, FaCheck, FaTimes, FaEye, FaFilter, FaUser } from 'react-icons/fa';
import { useReportSystem } from './ReportSystemPanel/hooks/useReportSystem';
import ReportDetailModal from './ReportSystemPanel/ReportDetailModal';
import styles from './ReportSystemPanel/styles';

const ReportSystemPanel = ({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
    const {
        reports, filter, setFilter, typeFilter, setTypeFilter,
        selectedReport, setSelectedReport, loading, stats,
        loadReports, loadStats, handleReport,
        getReportIcon, getReportBadgeColor, getSeverityColor
    } = useReportSystem({ serverId, fetchWithAuth, apiBaseUrl });

    useEffect(() => { loadReports(); loadStats(); }, [serverId, filter, typeFilter]);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaFlag style={styles.headerIcon} />
                        <h2 style={styles.title}>Report System</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
                </div>

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

                <div style={styles.filters}>
                    <div style={styles.filterGroup}>
                        <FaFilter style={styles.filterIcon} />
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={styles.filterSelect}>
                            <option value="all">All Reports</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                            <option value="dismissed">Dismissed</option>
                        </select>
                        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={styles.filterSelect}>
                            <option value="all">All Types</option>
                            <option value="message">Messages</option>
                            <option value="user">Users</option>
                            <option value="server">Server</option>
                        </select>
                    </div>
                </div>

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
                            <div key={report.id} style={styles.reportCard} onClick={() => setSelectedReport(report)}>
                                <div style={styles.reportHeader}>
                                    <div style={styles.reportIcon}>{getReportIcon(report.report_type)}</div>
                                    <div style={styles.reportInfo}>
                                        <div style={styles.reportTitle}>{report.reason || `${report.report_type} Report`}</div>
                                        <div style={styles.reportMeta}>
                                            <span>By: {report.reporter_username || 'Unknown'}</span>
                                            <span>{'\u2022'}</span>
                                            <span>{new Date(report.created_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div style={styles.reportBadges}>
                                        <span style={{ ...styles.badge, backgroundColor: getReportBadgeColor(report.status) }}>{report.status}</span>
                                        {report.severity && (
                                            <span style={{ ...styles.badge, backgroundColor: getSeverityColor(report.severity) }}>{report.severity}</span>
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

                <ReportDetailModal
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                    onHandle={handleReport}
                    getReportBadgeColor={getReportBadgeColor}
                    getSeverityColor={getSeverityColor}
                />
            </div>
        </div>
    );
};

export default ReportSystemPanel;


