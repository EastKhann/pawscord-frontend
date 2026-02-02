// frontend/src/components/ReportsViewer.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaExclamationTriangle, FaCheck, FaTrash } from 'react-icons/fa';

const ReportsViewer = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
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
            console.error('Load reports error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReport = async (reportId, action) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/reports/handle/${reportId}/`, {
                method: 'POST',
                body: JSON.stringify({ action })
            });

            if (res.ok) {
                setReports(prev => prev.filter(r => r.id !== reportId));
                toast.success(`✅ Rapor ${action === 'approve' ? 'onaylandı' : 'reddedildi'}`);
            }
        } catch (error) {
            console.error('Handle report error:', error);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        <FaExclamationTriangle /> Raporlar ({reports.length})
                    </h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : reports.length === 0 ? (
                        <div style={styles.empty}>Bekleyen rapor yok ✅</div>
                    ) : (
                        <div style={styles.reportList}>
                            {reports.map(report => (
                                <div key={report.id} style={styles.reportItem}>
                                    <div style={styles.reportHeader}>
                                        <span style={styles.reporter}>Raporlayan: {report.reporter}</span>
                                        <span style={styles.timestamp}>{new Date(report.created_at).toLocaleString('tr-TR')}</span>
                                    </div>
                                    <div style={styles.reportContent}>
                                        <div style={styles.reportedUser}>Raporlanan: {report.reported_user}</div>
                                        <div style={styles.reason}>Sebep: {report.reason}</div>
                                        {report.message_preview && (
                                            <div style={styles.messagePreview}>
                                                "{report.message_preview}"
                                            </div>
                                        )}
                                    </div>
                                    <div style={styles.actions}>
                                        <button
                                            onClick={() => handleReport(report.id, 'approve')}
                                            style={styles.approveButton}
                                        >
                                            <FaCheck /> Onayla
                                        </button>
                                        <button
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
        zIndex: 10000
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '700px',
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
        color: '#43b581',
        padding: '40px',
        fontSize: '1.2em'
    },
    reportList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    reportItem: {
        backgroundColor: '#40444b',
        padding: '15px',
        borderRadius: '8px',
        borderLeft: '4px solid #f04747'
    },
    reportHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },
    reporter: {
        color: '#5865f2',
        fontWeight: 'bold',
        fontSize: '0.9em'
    },
    timestamp: {
        color: '#72767d',
        fontSize: '0.75em'
    },
    reportContent: {
        marginBottom: '15px'
    },
    reportedUser: {
        color: '#f04747',
        fontWeight: 'bold',
        marginBottom: '5px'
    },
    reason: {
        color: '#dcddde',
        marginBottom: '8px',
        fontSize: '0.9em'
    },
    messagePreview: {
        backgroundColor: '#2b2d31',
        padding: '10px',
        borderRadius: '4px',
        color: '#b9bbbe',
        fontSize: '0.85em',
        fontStyle: 'italic',
        borderLeft: '3px solid #5865f2'
    },
    actions: {
        display: 'flex',
        gap: '10px'
    },
    approveButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px'
    },
    rejectButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#f04747',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px'
    }
};

export default React.memo(ReportsViewer);


