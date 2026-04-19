import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    FaTimes,
    FaDownload,
    FaFileArchive,
    FaClock,
    FaCheckCircle,
    FaExclamationCircle,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { toast } from '../../utils/toast';

const GDPRExportPanel = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
    const [exports, setExports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [requesting, setRequesting] = useState(false);

    useEffect(() => {
        fetchExports();
    }, []);

    const fetchExports = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/gdpr/exports/`);
            const data = await response.json();
            setExports(data.exports || []);
        } catch (error) {
            toast.error(t('gdpr.failedToLoadExports'));
        } finally {
            setLoading(false);
        }
    };

    const requestExport = async () => {
        setRequesting(true);
        try {
            await fetchWithAuth(`${apiBaseUrl}/gdpr/request-export/`, {
                method: 'POST',
            });

            toast.success(t('gdpr.exportRequested'));
            fetchExports();
        } catch (error) {
            toast.error(t('gdpr.failedToRequestExport'));
        } finally {
            setRequesting(false);
        }
    };

    const downloadExport = async (exportId) => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/gdpr/exports/${exportId}/download/`
            );
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `pawscord_data_export_${exportId}.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success(t('gdpr.exportDownloaded'));
        } catch (error) {
            toast.error(t('gdpr.failedToDownloadExport'));
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <FaCheckCircle className="icon-success" />;
            case 'failed':
                return <FaExclamationCircle className="icon-danger" />;
            default:
                return <FaClock className="icon-warning" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return t('gdpr.statusProcessing');
            case 'completed':
                return t('gdpr.statusReady');
            case 'failed':
                return t('gdpr.statusFailed');
            default:
                return status;
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaFileArchive className="icon-primary-mr10" />
                        <h2 style={styles.title}>{t('gdpr.title')}</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.info}>
                    <p style={styles.infoText}>{t('gdpr.infoText')}</p>
                    <button
                        aria-label="request Export"
                        onClick={requestExport}
                        disabled={requesting}
                        style={styles.requestButton}
                    >
                        {requesting ? t('gdpr.requesting') : t('gdpr.requestNewExport')}
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('gdpr.loadingExports')}</div>
                    ) : exports.length === 0 ? (
                        <div style={styles.empty}>
                            <FaFileArchive className="icon-48-111-mb16" />
                            <div>{t('gdpr.noExportsYet')}</div>
                            <div style={styles.emptySubtext}>{t('gdpr.requestFirstExport')}</div>
                        </div>
                    ) : (
                        <div style={styles.exportsList}>
                            {exports.map((exp, idx) => (
                                <div key={`item-${idx}`} style={styles.exportCard}>
                                    <div style={styles.exportIcon}>{getStatusIcon(exp.status)}</div>
                                    <div style={styles.exportInfo}>
                                        <div style={styles.exportStatus}>
                                            {getStatusText(exp.status)}
                                        </div>
                                        <div style={styles.exportMeta}>
                                            {t('gdpr.requested')}:{' '}
                                            {new Date(exp.created_at).toLocaleString()}
                                        </div>
                                        {exp.completed_at && (
                                            <div style={styles.exportMeta}>
                                                {t('gdpr.completed')}:{' '}
                                                {new Date(exp.completed_at).toLocaleString()}
                                            </div>
                                        )}
                                        {exp.file_size && (
                                            <div style={styles.exportMeta}>
                                                {t('gdpr.size')}:{' '}
                                                {(exp.file_size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                        )}
                                        {exp.expires_at && (
                                            <div style={styles.exportMeta}>
                                                {t('gdpr.expires')}:{' '}
                                                {new Date(exp.expires_at).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                    {exp.status === 'completed' && (
                                        <button
                                            aria-label="Action button"
                                            onClick={() => downloadExport(exp.id)}
                                            style={styles.downloadButton}
                                            title="İndir"
                                        >
                                            <FaDownload className="mr-6" />
                                            {t('gdpr.download')}
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
    info: {
        padding: '20px',
        borderBottom: '1px solid #0e1222',
    },
    infoText: {
        fontSize: '14px',
        color: '#dbdee1',
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
        color: '#949ba4',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#949ba4',
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
        backgroundColor: '#111214',
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
        color: '#949ba4',
        marginTop: '4px',
    },
    downloadButton: {
        padding: '8px 16px',
        backgroundColor: '#23a559',
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

GDPRExportPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default GDPRExportPanel;
