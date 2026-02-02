// frontend/src/components/MessageOCRPanel.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaImage, FaFileAlt, FaCopy, FaDownload } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 🔍 Message OCR Panel
 * Resimlerden metin çıkarma
 */

const MessageOCRPanel = ({ fetchWithAuth, apiBaseUrl, messageId, onClose }) => {
    const [ocrText, setOcrText] = useState('');
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        loadOCRText();
    }, [messageId]);

    const loadOCRText = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/api/messages/${messageId}/ocr/`);
            if (response.ok) {
                const data = await response.json();
                setOcrText(data.text || '');
            }
        } catch (error) {
            console.error('OCR yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const requestOCR = async () => {
        try {
            setProcessing(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/api/messages/${messageId}/ocr/request/`, {
                method: 'POST'
            });

            if (response.ok) {
                toast.success('OCR işlemi başlatıldı');
                setTimeout(loadOCRText, 3000); // 3 saniye sonra tekrar yükle
            } else {
                toast.error('OCR işlemi başlatılamadı');
            }
        } catch (error) {
            console.error('OCR isteği hatası:', error);
            toast.error('Bir hata oluştu');
        } finally {
            setProcessing(false);
        }
    };

    const copyText = () => {
        navigator.clipboard.writeText(ocrText);
        toast.success('Metin kopyalandı');
    };

    const downloadText = () => {
        const blob = new Blob([ocrText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ocr_${messageId}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Metin indirildi');
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaImage style={{ color: '#5865f2' }} />
                        <h2 style={{ margin: 0 }}>OCR - Görüntüden Metin</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>
                            <FaFileAlt style={{ fontSize: '48px', color: '#888', marginBottom: '10px' }} />
                            <p>Yükleniyor...</p>
                        </div>
                    ) : ocrText ? (
                        <>
                            <div style={styles.toolbar}>
                                <button onClick={copyText} style={styles.toolBtn}>
                                    <FaCopy /> Kopyala
                                </button>
                                <button onClick={downloadText} style={styles.toolBtn}>
                                    <FaDownload /> İndir
                                </button>
                            </div>
                            <div style={styles.textArea}>
                                <pre style={styles.textContent}>{ocrText}</pre>
                            </div>
                        </>
                    ) : (
                        <div style={styles.empty}>
                            <FaImage style={{ fontSize: '64px', color: '#555', marginBottom: '15px' }} />
                            <p>Bu mesajda OCR metni yok</p>
                            <button
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
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333'
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
    },
    toolbar: {
        display: 'flex',
        gap: '10px',
        marginBottom: '15px'
    },
    toolBtn: {
        backgroundColor: '#2c2f33',
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px'
    },
    textArea: {
        flex: 1,
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '15px',
        overflow: 'auto'
    },
    textContent: {
        color: '#dcddde',
        fontSize: '14px',
        lineHeight: '1.6',
        margin: 0,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontFamily: 'monospace'
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        color: '#888'
    },
    empty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        color: '#888'
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
        fontWeight: '600'
    }
};

export default MessageOCRPanel;
