// frontend/src/components/InvoicePanel.js
import React, { useState, useEffect } from 'react';
import { FaFileInvoice, FaTimes, FaDownload, FaEye } from 'react-icons/fa';

const InvoicePanel = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invoices/`);
            if (res.ok) {
                const data = await res.json();
                setInvoices(data.invoices || []);
            }
        } catch (error) {
            console.error('Invoice load error:', error);
        }
        setLoading(false);
    };

    const downloadInvoice = async (invoiceId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invoices/${invoiceId}/download/`);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${invoiceId}.pdf`;
            a.click();
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            paid: '#3ba55d',
            pending: '#faa61a',
            failed: '#ed4245',
            refunded: '#72767d'
        };
        return colors[status] || '#b9bbbe';
    };

    const getStatusText = (status) => {
        const texts = {
            paid: 'Ödendi',
            pending: 'Beklemede',
            failed: 'Başarısız',
            refunded: 'İade Edildi'
        };
        return texts[status] || status;
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaFileInvoice size={20} color="#5865f2" />
                        <h2 style={styles.title}>Faturalar</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes size={20} />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : invoices.length === 0 ? (
                        <div style={styles.empty}>
                            <FaFileInvoice size={48} color="#4e5058" />
                            <p>Henüz fatura yok</p>
                        </div>
                    ) : (
                        <div style={styles.invoiceList}>
                            {invoices.map(invoice => (
                                <div key={invoice.id} style={styles.invoiceItem}>
                                    <div style={styles.invoiceInfo}>
                                        <div style={styles.invoiceNumber}>
                                            Fatura #{invoice.invoice_number}
                                        </div>
                                        <div style={styles.invoiceMeta}>
                                            {invoice.description}
                                        </div>
                                        <div style={styles.invoiceMeta}>
                                            {new Date(invoice.date).toLocaleDateString('tr-TR')}
                                        </div>
                                    </div>

                                    <div style={styles.invoiceAmount}>
                                        ${invoice.amount.toFixed(2)}
                                    </div>

                                    <div style={{
                                        ...styles.invoiceStatus,
                                        backgroundColor: getStatusColor(invoice.status) + '20',
                                        color: getStatusColor(invoice.status)
                                    }}>
                                        {getStatusText(invoice.status)}
                                    </div>

                                    <div style={styles.invoiceActions}>
                                        <button
                                            onClick={() => setSelectedInvoice(invoice)}
                                            style={styles.actionButton}
                                            title="Görüntüle"
                                        >
                                            <FaEye size={16} />
                                        </button>
                                        <button
                                            onClick={() => downloadInvoice(invoice.id)}
                                            style={styles.actionButton}
                                            title="İndir"
                                        >
                                            <FaDownload size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedInvoice && (
                    <InvoiceDetailModal
                        invoice={selectedInvoice}
                        onClose={() => setSelectedInvoice(null)}
                        onDownload={() => downloadInvoice(selectedInvoice.id)}
                    />
                )}
            </div>
        </div>
    );
};

const InvoiceDetailModal = ({ invoice, onClose, onDownload }) => {
    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <div style={styles.modalHeader}>
                    <h3 style={styles.modalTitle}>Fatura Detayı</h3>
                    <button onClick={onClose} style={styles.modalClose}>
                        <FaTimes size={18} />
                    </button>
                </div>

                <div style={styles.modalContent}>
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>Fatura No:</span>
                        <span style={styles.detailValue}>{invoice.invoice_number}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>Tarih:</span>
                        <span style={styles.detailValue}>
                            {new Date(invoice.date).toLocaleDateString('tr-TR')}
                        </span>
                    </div>
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>Açıklama:</span>
                        <span style={styles.detailValue}>{invoice.description}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>Tutar:</span>
                        <span style={styles.detailValue}>${invoice.amount.toFixed(2)}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>Durum:</span>
                        <span style={styles.detailValue}>{invoice.status}</span>
                    </div>

                    {invoice.items && invoice.items.length > 0 && (
                        <div style={styles.itemsSection}>
                            <h4 style={styles.itemsTitle}>Kalemler:</h4>
                            {invoice.items.map((item, idx) => (
                                <div key={idx} style={styles.itemRow}>
                                    <span>{item.description}</span>
                                    <span>${item.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={styles.modalFooter}>
                    <button onClick={onDownload} style={styles.downloadButton}>
                        <FaDownload size={14} />
                        <span>PDF İndir</span>
                    </button>
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
        padding: '20px'
    },
    panel: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        borderBottom: '1px solid #202225'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#b9bbbe'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b9bbbe'
    },
    invoiceList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    invoiceItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: '#36393f',
        padding: '16px',
        borderRadius: '8px'
    },
    invoiceInfo: {
        flex: 1
    },
    invoiceNumber: {
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '4px'
    },
    invoiceMeta: {
        color: '#72767d',
        fontSize: '13px',
        marginBottom: '2px'
    },
    invoiceAmount: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold',
        minWidth: '100px',
        textAlign: 'right'
    },
    invoiceStatus: {
        padding: '6px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        minWidth: '100px',
        textAlign: 'center'
    },
    invoiceActions: {
        display: 'flex',
        gap: '8px'
    },
    actionButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'all 0.2s'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001
    },
    modal: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
    },
    modalHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        borderBottom: '1px solid #202225'
    },
    modalTitle: {
        margin: 0,
        color: '#ffffff',
        fontSize: '18px'
    },
    modalClose: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px'
    },
    modalContent: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid #202225'
    },
    detailLabel: {
        color: '#b9bbbe',
        fontSize: '14px'
    },
    detailValue: {
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '500'
    },
    itemsSection: {
        marginTop: '20px'
    },
    itemsTitle: {
        color: '#ffffff',
        fontSize: '16px',
        marginBottom: '12px'
    },
    itemRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        color: '#dcddde',
        fontSize: '14px'
    },
    modalFooter: {
        padding: '16px 20px',
        borderTop: '1px solid #202225',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    downloadButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    }
};

export default InvoicePanel;



