/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/MessageExportPanel.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaDownload, FaFileExport, FaCalendar } from 'react-icons/fa';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

/**
 * 📦 Message Export Panel
 * Chat geçmişini dışa aktarma
 */

const MessageExportPanel = ({ fetchWithAuth, apiBaseUrl, roomSlug, onClose }) => {
    const { t } = useTranslation();
    const [format, setFormat] = useState('json');
    const [dateRange, setDateRange] = useState({
        start_date: '',
        end_date: '',
    });
    const [includeAttachments, setIncludeAttachments] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [jobId, setJobId] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);

    const formats = [
        { value: 'json', label: 'JSON', icon: '📋' },
        { value: 'csv', label: 'CSV (Excel)', icon: '📊' },
        { value: 'txt', label: 'Text', icon: '📄' },
        { value: 'html', label: 'HTML', icon: '🌐' },
    ];

    const startExport = async () => {
        try {
            setProcessing(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/exports/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    room_slug: roomSlug,
                    format,
                    start_date: dateRange.start_date || null,
                    end_date: dateRange.end_date || null,
                    include_attachments: includeAttachments,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setJobId(data.job_id);
                toast.success(t('ui.disa_aktarma_baslatildi'));
                checkExportStatus(data.job_id);
            } else {
                toast.error(t('ui.disa_aktarma_baslatilamadi'));
                setProcessing(false);
            }
        } catch (error) {
            logger.error(t('ui.export_baslatma_hatasi'), error);
            toast.error(t('common.error'));
            setProcessing(false);
        }
    };

    const checkExportStatus = async (jId) => {
        const interval = setInterval(async () => {
            try {
                const response = await fetchWithAuth(`${apiBaseUrl}/exports/${jId}/status/`);
                if (response.ok) {
                    const data = await response.json();

                    if (data.status === 'completed') {
                        clearInterval(interval);
                        setProcessing(false);
                        setDownloadUrl(data.download_url);
                        toast.success(t('ui.disa_aktarma_oklandi'));
                    } else if (data.status === 'failed') {
                        clearInterval(interval);
                        setProcessing(false);
                        toast.error(t('messageExport.failed'));
                    }
                }
            } catch (error) {
                clearInterval(interval);
                setProcessing(false);
                logger.error(t('ui.status_kontrol_hatasi'), error);
            }
        }, 2000);
    };

    const downloadExport = () => {
        if (downloadUrl) {
            window.open(downloadUrl, '_blank');
            toast.success(t('ui.downloadme_baslatildi'));
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
                    <div className="flex-align-10">
                        <FaFileExport className="icon-success" />
                        <h2 className="m-0">Sohbet Geçmişini Dışa Aktar</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    {!downloadUrl ? (
                        <>
                            <div style={styles.field}>
                                <label style={styles.label}>
                                    <FaDownload className="mr-8" />
                                    File Formatı
                                </label>
                                <div style={styles.formatGrid}>
                                    {formats.map((fmt) => (
                                        <button
                                            aria-label="Action button"
                                            key={fmt.value}
                                            onClick={() => setFormat(fmt.value)}
                                            style={{
                                                ...styles.formatBtn,
                                                backgroundColor:
                                                    format === fmt.value ? '#5865f2' : '#111214',
                                            }}
                                        >
                                            <span className="fs-24">{fmt.icon}</span>
                                            <span>{fmt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>
                                    <FaCalendar className="mr-8" />
                                    Tarih Aralığı (opsiyonel)
                                </label>
                                <div style={styles.dateRange}>
                                    <input
                                        type="date"
                                        value={dateRange.start_date}
                                        onChange={(e) =>
                                            setDateRange({
                                                ...dateRange,
                                                start_date: e.target.value,
                                            })
                                        }
                                        style={styles.dateInput}
                                        placeholder={t('ui.baslangic')}
                                    />
                                    <span className="icon-gray">→</span>
                                    <input
                                        type="date"
                                        value={dateRange.end_date}
                                        onChange={(e) =>
                                            setDateRange({ ...dateRange, end_date: e.target.value })
                                        }
                                        style={styles.dateInput}
                                        placeholder={t('ui.bitis')}
                                    />
                                </div>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={includeAttachments}
                                        onChange={(e) => setIncludeAttachments(e.target.checked)}
                                    />
                                    <span>Ekleri de dahil et (dosya boyutu artabilir)</span>
                                </label>
                            </div>

                            {processing && (
                                <div style={styles.progress}>
                                    <div style={styles.progressSpinner}></div>
                                    <p>Mesajlar işleniyor...</p>
                                    <p className="text-gray-12">Bu işlem birkaç dakika sürebilir</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={styles.success}>
                            <div style={styles.successIcon}>✅</div>
                            <h3>Dışa Aktarma Tamamlandı!</h3>
                            <p>Dosyanız hazır ve indirilebilir.</p>
                            <button
                                aria-label="download Export"
                                onClick={downloadExport}
                                style={styles.downloadBtn}
                            >
                                <FaDownload /> Dosyayı İndir
                            </button>
                        </div>
                    )}
                </div>

                {!downloadUrl && (
                    <div style={styles.footer}>
                        <button aria-label="on Close" onClick={onClose} style={styles.cancelBtn}>
                            İptal
                        </button>
                        <button
                            aria-label="start Export"
                            onClick={startExport}
                            disabled={processing}
                            style={styles.exportBtn}
                        >
                            {processing ? 'İşleniyor...' : 'Dışa Aktar'}
                        </button>
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
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333',
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    field: {
        marginBottom: '25px',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        color: '#dbdee1',
        fontSize: '15px',
        fontWeight: '600',
    },
    formatGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
    },
    formatBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '20px',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s',
    },
    dateRange: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    dateInput: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    progress: {
        textAlign: 'center',
        padding: '30px',
        backgroundColor: '#111214',
        borderRadius: '8px',
    },
    progressSpinner: {
        width: '50px',
        height: '50px',
        border: '4px solid #333',
        borderTop: '4px solid #5865f2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 15px',
    },
    success: {
        textAlign: 'center',
        padding: '40px',
    },
    successIcon: {
        fontSize: '64px',
        marginBottom: '20px',
    },
    downloadBtn: {
        backgroundColor: '#23a559',
        color: '#fff',
        border: 'none',
        padding: '15px 30px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
    },
    footer: {
        display: 'flex',
        gap: '10px',
        padding: '20px',
        borderTop: '1px solid #333',
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: '#111214',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
    },
    exportBtn: {
        flex: 1,
        backgroundColor: '#23a559',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
    },
};

MessageExportPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    roomSlug: PropTypes.string,
    onClose: PropTypes.func,
};
export default MessageExportPanel;
