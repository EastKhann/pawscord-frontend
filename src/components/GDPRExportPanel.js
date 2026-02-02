import React, { useState, useEffect } from 'react';
import { FaTimes, FaDownload, FaFileArchive, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { toast } from '../utils/toast';

const GDPRExportPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const [exports, setExports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [requesting, setRequesting] = useState(false);

    useEffect(() => {
        fetchExports();
    }, []);

    const fetchExports = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/gdpr/exports/`);
            const data = await response.json();
            setExports(data.exports || []);
        } catch (error) {
            toast.error('Failed to load exports');
        } finally {
            setLoading(false);
        }
    };

    const requestExport = async () => {
        setRequesting(true);
        try {
            await fetchWithAuth(`${apiBaseUrl}/api/gdpr/request-export/`, {
                method: 'POST'
            });

            toast.success('Export requested. You will be notified when it\'s ready (usually within 24 hours)');
            fetchExports();
        } catch (error) {
            toast.error('Failed to request export');
        } finally {
            setRequesting(false);
        }
    };

    const downloadExport = async (exportId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/gdpr/exports/${exportId}/download/`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `pawscord_data_export_${exportId}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success('Export downloaded');
        } catch (error) {
            toast.error('Failed to download export');
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle style={{ color: '#43b581' }} />;
            case 'failed':
                return <FaExclamationCircle style={{ color: '#f04747' }} />;
            default:
                return <FaClock style={{ color: '#faa61a' }} />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Processing...';
            case 'completed':
                return 'Ready to Download';
            case 'failed':
                return 'Failed';
            default:
                return status;
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaFileArchive style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>GDPR Data Export</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.info}>
                    <p style={styles.infoText}>
                        Request a complete archive of your data. This includes messages, media, profile information, and activity logs.
                        Exports are usually ready within 24 hours.
                    </p>
                    <button onClick={requestExport} disabled={requesting} style={styles.requestButton}>
                        {requesting ? 'Requesting...' : 'Request New Export'}
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading exports...</div>
                    ) : exports.length === 0 ? (
                        <div style={styles.empty}>
                            <FaFileArchive style={{ fontSize: '48px', color: '#2c2f33', marginBottom: '16px' }} />
                            <div>No exports yet</div>
                            <div style={styles.emptySubtext}>Request your first data export above</div>
                        </div>
                    ) : (
                        <div style={styles.exportsList}>
                            {exports.map((exp, idx) => (
                                <div key={idx} style={styles.exportCard}>
                                    <div style={styles.exportIcon}>
                                        {getStatusIcon(exp.status)}
                                    </div>
                                    <div style={styles.exportInfo}>
                                        <div style={styles.exportStatus}>
                                            {getStatusText(exp.status)}
                                        </div>
                                        <div style={styles.exportMeta}>
                                            Requested: {new Date(exp.created_at).toLocaleString()}
                                        </div>
                                        {exp.completed_at && (
                                            <div style={styles.exportMeta}>
                                                Completed: {new Date(exp.completed_at).toLocaleString()}
                                            </div>
                                        )}
                                        {exp.file_size && (
                                            <div style={styles.exportMeta}>
                                                Size: {(exp.file_size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                        )}
                                        {exp.expires_at && (
                                            <div style={styles.exportMeta}>
                                                Expires: {new Date(exp.expires_at).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                    {exp.status === 'completed' && (
                                        <button
                                            onClick={() => downloadExport(exp.id)}
                                            style={styles.downloadButton}
                                            title="Download"
                                        >
                                            <FaDownload style={{ marginRight: '6px' }} />
                                            Download
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
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '700px',
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
        borderBottom: '1px solid #2c2f33',
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
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    info: {
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    infoText: {
        fontSize: '14px',
        color: '#dcddde',
        lineHeight: '1.6',
        margin: '0 0 16px 0',
    },
    requestButton: {
        padding: '10px 20px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        width: '100%',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    emptySubtext: {
        fontSize: '13px',
        marginTop: '8px',
    },
    exportsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    exportCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
    },
    exportIcon: {
        fontSize: '24px',
        minWidth: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exportInfo: {
        flex: 1,
    },
    exportStatus: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '6px',
    },
    exportMeta: {
        fontSize: '13px',
        color: '#99aab5',
        marginTop: '4px',
    },
    downloadButton: {
        padding: '8px 16px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
    },
};

export default GDPRExportPanel;
