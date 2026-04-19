// frontend/src/components/MessageOCRPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaImage, FaFileAlt, FaCopy, FaDownload } from 'react-icons/fa';
import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
/**
 * 🔍 Message OCR Panel
 * Extract text from images
 */

const MessageOCRPanel = ({ fetchWithAuth, apiBaseUrl, messageId, onClose }) => {
    const { t } = useTranslation();
    const [ocrText, setOcrText] = useState('');
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        loadOCRText();
    }, [messageId]);

    const loadOCRText = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/messages/${messageId}/ocr/`);
            if (response.ok) {
                const data = await response.json();
                setOcrText(data.text || '');
            }
        } catch (error) {
            logger.error(t('ui.ocr_load_hatasi'), error);
        } finally {
            setLoading(false);
        }
    };

    const requestOCR = async () => {
        try {
            setProcessing(true);
            const response = await fetchWithAuth(
                `${apiBaseUrl}/messages/${messageId}/ocr/request/`,
                {
                    method: 'POST',
                }
            );

            if (response.ok) {
                toast.success(t('messageOCR.started'));
                setTimeout(loadOCRText, 3000); // 3 seconds later, reload
            } else {
                toast.error(t('messageOCR.startFailed'));
            }
        } catch (error) {
            logger.error(t('ui.ocr_istegi_hatasi'), error);
            toast.error(t('common.error'));
        } finally {
            setProcessing(false);
        }
    };

    const copyText = () => {
        navigator.clipboard.writeText(ocrText);
        toast.success(t('messageOCR.textCopied'));
    };

    const downloadText = () => {
        const blob = new Blob([ocrText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ocr_${messageId}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success(t('messageOCR.textDownloaded'));
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
                        <FaImage className="icon-primary" />
                        <h2 className="m-0">OCR - Text from Image</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>
                            <FaFileAlt className="icon-48-888-mb10" />
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : ocrText ? (
                        <>
                            <div style={styles.toolbar}>
                                <button
                                    aria-label="copy Text"
                                    onClick={copyText}
                                    style={styles.toolBtn}
                                >
                                    <FaCopy /> Copy
                                </button>
                                <button
                                    aria-label="download Text"
                                    onClick={downloadText}
                                    style={styles.toolBtn}
                                >
                                    <FaDownload /> Download
                                </button>
                            </div>
                            <div style={styles.textArea}>
                                <pre style={styles.textContent}>{ocrText}</pre>
                            </div>
                        </>
                    ) : (
                        <div style={styles.empty}>
                            <FaImage className="icon-lg-mb15" />
                            <p>Bu mesajda OCR metni yok</p>
                            <button
                                aria-label="request O C R"
                                onClick={requestOCR}
                                disabled={processing}
                                style={styles.requestBtn}
                            >
                                {processing ? 'İşleniyor...' : 'OCR İşlemini Başlat'}
                            </button>
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
        maxWidth: '700px',
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
        display: 'flex',
        flexDirection: 'column',
    },
    toolbar: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px',
    },
    toolBtn: {
        backgroundColor: '#111214',
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
    },
    textArea: {
        flex: 1,
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '15px',
        overflow: 'auto',
    },
    textContent: {
        color: '#dbdee1',
        fontSize: '14px',
        lineHeight: '1.6',
        margin: 0,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontFamily: 'monospace',
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        color: '#888',
    },
    empty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        color: '#888',
    },
    requestBtn: {
        marginTop: '20px',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
    },
};

MessageOCRPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    messageId: PropTypes.string,
    onClose: PropTypes.func,
};
export default MessageOCRPanel;
