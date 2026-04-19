/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
// frontend/src/components/ReportsViewer.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import { FaTimes, FaExclamationTriangle, FaCheck, FaTrash } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const ReportsViewer = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/reports/list/`);
            if (res.ok) {
                const data = await res.json();
                setReports(data.reports || []);
            }
        } catch (error) {
            logger.error('Load reports error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReport = async (reportId, action) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/reports/handle/${reportId}/`, {
                method: 'POST',
                body: JSON.stringify({ action }),
            });

            if (res.ok) {
                setReports((prev) => prev.filter((r) => r.id !== reportId));
                toast.success(action === 'approve' ? t('reports.approved') : t('reports.rejected'));
            }
        } catch (error) {
            logger.error('Handle report error:', error);
        }
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
                        <FaExclamationTriangle /> Raporlar ({reports.length})
                    </h2>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : reports.length === 0 ? (
                        <div style={styles.empty}>Bekleyen rapor yok ✅</div>
                    ) : (
                        <div style={styles.reportList}>
                            {reports.map((report) => (
                                <div key={report.id} style={styles.reportItem}>
                                    <div style={styles.reportHeader}>
                                        <span style={styles.reporter}>
                                            Raporlayan: {report.reporter}
                                        </span>
                                        <span style={styles.timestamp}>
                                            {new Date(report.created_at).toLocaleString('tr-TR')}
                                        </span>
                                    </div>
                                    <div style={styles.reportContent}>
                                        <div style={styles.reportedUser}>
                                            Raporlanan: {report.reported_user}
                                        </div>
                                        <div style={styles.reason}>Sebep: {report.reason}</div>
                                        {report.message_preview && (
                                            <div style={styles.messagePreview}>
                                                "{report.message_preview}"
                                            </div>
                                        )}
                                    </div>
                                    <div style={styles.actions}>
                                        <button
                                            aria-label="Raporu onayla"
                                            onClick={() => handleReport(report.id, 'approve')}
                                            style={styles.approveButton}
                                        >
                                            <FaCheck /> Onayla
                                        </button>
                                        <button
                                            aria-label="Raporu reddet"
                                            onClick={() => handleReport(report.id, 'reject')}
                                            style={styles.rejectButton}
                                        >
                                            <FaTrash /> Reddet
                                        </button>
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
        maxWidth: '700px',
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
        color: '#23a559',
        padding: '40px',
        fontSize: '1.2em',
    },
    reportList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    reportItem: {
        backgroundColor: '#1e2024',
        padding: '15px',
        borderRadius: '8px',
        borderLeft: '4px solid #f23f42',
    },
    reportHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    reporter: {
        color: '#5865f2',
        fontWeight: 'bold',
        fontSize: '0.9em',
    },
    timestamp: {
        color: '#949ba4',
        fontSize: '0.75em',
    },
    reportContent: {
        marginBottom: '15px',
    },
    reportedUser: {
        color: '#f23f42',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    reason: {
        color: '#dbdee1',
        marginBottom: '8px',
        fontSize: '0.9em',
    },
    messagePreview: {
        backgroundColor: '#111214',
        padding: '10px',
        borderRadius: '4px',
        color: '#b5bac1',
        fontSize: '0.85em',
        fontStyle: 'italic',
        borderLeft: '3px solid #5865f2',
    },
    actions: {
        display: 'flex',
        gap: '10px',
    },
    approveButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#23a559',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
    },
    rejectButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#f23f42',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
    },
};

ReportsViewer.propTypes = {
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default React.memo(ReportsViewer);
