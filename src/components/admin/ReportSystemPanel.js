// frontend/src/components/ReportSystemPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaFlag, FaCheck, FaTimes, FaEye, FaFilter, FaUser } from 'react-icons/fa';
import { useReportSystem } from '../ReportSystemPanel/hooks/useReportSystem';
import ReportDetailModal from '../ReportSystemPanel/ReportDetailModal';
import styles from '../ReportSystemPanel/styles';

// -- dynamic style helpers (pass 2) --
const _st1122 = styles.badge;
const _st1123 = styles.badge;

const S = {
    txt4: { ...styles.statIcon, color: '#5865f2' },
    txt3: { ...styles.statIcon, color: '#949ba4' },
    txt2: { ...styles.statIcon, color: '#23a559' },
    txt: { ...styles.statIcon, color: '#f0b132' },
};

const ReportSystemPanel = ({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
    const [error, setError] = useState(null);
    const {
        reports,
        filter,
        setFilter,
        typeFilter,
        setTypeFilter,
        selectedReport,
        setSelectedReport,
        loading,
        stats,
        loadReports,
        loadStats,
        handleReport,
        getReportIcon,
        getReportBadgeColor,
        getSeverityColor,
    } = useReportSystem({ serverId, fetchWithAuth, apiBaseUrl });

    useEffect(() => {
        loadReports();
        loadStats();
    }, [serverId, filter, typeFilter]);

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.panel}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaFlag style={styles.headerIcon} />
                        <h2 style={styles.title}>Rapor Sistemi</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <FaFlag style={S.txt} />
                        <div style={styles.statValue}>{stats.pending}</div>
                        <div style={styles.statLabel}>Bekliyor</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaCheck style={S.txt2} />
                        <div style={styles.statValue}>{stats.resolved}</div>
                        <div style={styles.statLabel}>Çözüldü</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaTimes style={S.txt3} />
                        <div style={styles.statValue}>{stats.dismissed}</div>
                        <div style={styles.statLabel}>Reddedildi</div>
                    </div>
                    <div style={styles.statCard}>
                        <FaEye style={S.txt4} />
                        <div style={styles.statValue}>{stats.total}</div>
                        <div style={styles.statLabel}>Toplam Rapor</div>
                    </div>
                </div>

                <div style={styles.filters}>
                    <div style={styles.filterGroup}>
                        <FaFilter style={styles.filterIcon} />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={styles.filterSelect}
                        >
                            <option value="all">Tüm Raporlar</option>
                            <option value="pending">Bekliyor</option>
                            <option value="resolved">Çözüldü</option>
                            <option value="dismissed">Reddedildi</option>
                        </select>
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            style={styles.filterSelect}
                        >
                            <option value="all">Tüm Türler</option>
                            <option value="message">Mesajlar</option>
                            <option value="user">Kullanıcılar</option>
                            <option value="server">Sunucu</option>
                        </select>
                    </div>
                </div>

                <div style={styles.reportsList}>
                    {loading ? (
                        <div style={styles.loading}>Raporlar yükleniyor...</div>
                    ) : reports.length === 0 ? (
                        <div style={styles.empty}>
                            <FaFlag style={styles.emptyIcon} />
                            <p>Rapor bulunamadı</p>
                        </div>
                    ) : (
                        reports.map((report) => (
                            <div
                                key={report.id}
                                style={styles.reportCard}
                                role="button"
                                tabIndex={0}
                                onClick={() => setSelectedReport(report)}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
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
                                            <span>
                                                {new Date(report.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={styles.reportBadges}>
                                        <span style={_st1122}>{report.status}</span>
                                        {report.severity && (
                                            <span style={_st1123}>{report.severity}</span>
                                        )}
                                    </div>
                                </div>
                                <div style={styles.reportContent}>
                                    <p style={styles.reportText}>{report.description}</p>
                                    {report.message_content && (
                                        <div style={styles.reportedContent}>
                                            <strong>Şikayet Edilen İçerik:</strong>
                                            <p>{report.message_content}</p>
                                        </div>
                                    )}
                                    {report.reported_username && (
                                        <div style={styles.reportedUser}>
                                            <FaUser />
                                            <span>
                                                Şikayet Edilen Kullanıcı: {report.reported_username}
                                            </span>
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

ReportSystemPanel.propTypes = {
    serverId: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default ReportSystemPanel;
