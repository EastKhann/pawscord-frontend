import React, { useState, useEffect } from 'react';
import {
    FaFileInvoiceDollar, FaTimes, FaDownload, FaFilter, FaSearch,
    FaCalendar, FaCheck, FaClock, FaExclamationTriangle, FaEye,
    FaFilePdf, FaPrint, FaEnvelope, FaHistory, FaCreditCard
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './InvoiceHistoryPanel.css';

const InvoiceHistoryPanel = ({ userId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPeriod, setFilterPeriod] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [downloading, setDownloading] = useState(null);

    useEffect(() => {
        loadInvoices();
    }, [userId]);

    const loadInvoices = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth) {
                const response = await fetchWithAuth(`${baseUrl}/api/invoices/`);
                if (response.ok) {
                    const data = await response.json();
                    const formattedInvoices = (data.invoices || data || []).map(inv => ({
                        id: `INV-${inv.id}`,
                        number: `INV-${inv.id}`,
                        date: inv.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
                        due_date: inv.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
                        status: inv.status || 'paid',
                        amount: inv.amount || 0,
                        tax: (inv.amount || 0) * 0.08,
                        total: (inv.amount || 0) * 1.08,
                        currency: inv.currency || 'USD',
                        description: inv.description || 'PAWSCORD Payment',
                        payment_method: inv.payment_method || '**** 4242',
                        items: inv.items || [{ name: inv.description || 'Payment', quantity: 1, price: inv.amount || 0 }]
                    }));
                    setInvoices(formattedInvoices);
                } else {
                    setInvoices([]);
                }
            } else {
                setInvoices([]);
            }
        } catch (error) {
            console.error('Error loading invoices:', error);
            setInvoices([]);
        }
        setLoading(false);
    };

    const handleDownload = async (invoiceId, format = 'pdf') => {
        setDownloading(invoiceId);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            const response = await fetchWithAuth(`${baseUrl}/invoices/${invoiceId}/download/?format=${format}`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `invoice-${invoiceId}.${format}`;
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Error downloading invoice:', error);
        }
        setDownloading(null);
    };

    const handleEmail = async (invoiceId) => {
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            await fetchWithAuth(`${baseUrl}/invoices/${invoiceId}/email/`, { method: 'POST' });
            alert('Fatura e-posta adresinize gönderildi!');
        } catch (error) {
            console.error('Error emailing invoice:', error);
        }
    };

    const handlePrint = (invoiceId) => {
        alert(`Opening print dialog for invoice ${invoiceId}`);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'paid': return <FaCheck className="status-icon paid" />;
            case 'pending': return <FaClock className="status-icon pending" />;
            case 'overdue': return <FaExclamationTriangle className="status-icon overdue" />;
            case 'refunded': return <FaHistory className="status-icon refunded" />;
            default: return null;
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAmount = (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    const filteredInvoices = invoices.filter(inv => {
        const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
        const matchesSearch = inv.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.description.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterPeriod !== 'all') {
            const invDate = new Date(inv.date);
            const now = new Date();
            const monthsDiff = (now.getFullYear() - invDate.getFullYear()) * 12 +
                (now.getMonth() - invDate.getMonth());

            switch (filterPeriod) {
                case '3': return monthsDiff <= 3 && matchesStatus && matchesSearch;
                case '6': return monthsDiff <= 6 && matchesStatus && matchesSearch;
                case '12': return monthsDiff <= 12 && matchesStatus && matchesSearch;
                default: break;
            }
        }
        return matchesStatus && matchesSearch;
    });

    const totalPaid = invoices
        .filter(i => i.status === 'paid')
        .reduce((sum, i) => sum + i.total, 0);

    return (
        <div className="invoice-overlay" onClick={onClose}>
            <div className="invoice-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2><FaFileInvoiceDollar /> Invoice History</h2>
                        <span className="total-paid">Total Paid: {formatAmount(totalPaid)}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Filters */}
                <div className="filter-bar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filters">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="overdue">Overdue</option>
                            <option value="refunded">Refunded</option>
                        </select>
                        <select
                            value={filterPeriod}
                            onChange={(e) => setFilterPeriod(e.target.value)}
                        >
                            <option value="all">All Time</option>
                            <option value="3">Last 3 Months</option>
                            <option value="6">Last 6 Months</option>
                            <option value="12">Last Year</option>
                        </select>
                    </div>
                </div>

                {/* Content */}
                <div className="content">
                    {loading ? (
                        <div className="loading">Loading invoices...</div>
                    ) : selectedInvoice ? (
                        <div className="invoice-detail">
                            <button
                                className="back-btn"
                                onClick={() => setSelectedInvoice(null)}
                            >
                                ← Back to list
                            </button>

                            <div className="invoice-header">
                                <div className="invoice-title">
                                    <h3>Invoice #{selectedInvoice.number}</h3>
                                    <span className={`status-badge ${selectedInvoice.status}`}>
                                        {getStatusIcon(selectedInvoice.status)}
                                        {selectedInvoice.status}
                                    </span>
                                </div>
                                <div className="invoice-actions">
                                    <button
                                        className="action-btn"
                                        onClick={() => handleDownload(selectedInvoice.id, 'pdf')}
                                        disabled={downloading === selectedInvoice.id}
                                    >
                                        <FaFilePdf /> PDF
                                    </button>
                                    <button
                                        className="action-btn"
                                        onClick={() => handlePrint(selectedInvoice.id)}
                                    >
                                        <FaPrint /> Print
                                    </button>
                                    <button
                                        className="action-btn"
                                        onClick={() => handleEmail(selectedInvoice.id)}
                                    >
                                        <FaEnvelope /> Email
                                    </button>
                                </div>
                            </div>

                            <div className="invoice-info-grid">
                                <div className="info-card">
                                    <span className="label">Invoice Date</span>
                                    <span className="value">{formatDate(selectedInvoice.date)}</span>
                                </div>
                                <div className="info-card">
                                    <span className="label">Due Date</span>
                                    <span className="value">{formatDate(selectedInvoice.due_date)}</span>
                                </div>
                                <div className="info-card">
                                    <span className="label">Payment Method</span>
                                    <span className="value">
                                        <FaCreditCard /> {selectedInvoice.payment_method}
                                    </span>
                                </div>
                            </div>

                            {selectedInvoice.billing_address && (
                                <div className="billing-address">
                                    <h4>Billing Address</h4>
                                    <p>{selectedInvoice.billing_address.name}</p>
                                    <p>{selectedInvoice.billing_address.email}</p>
                                    {selectedInvoice.billing_address.address && (
                                        <p>{selectedInvoice.billing_address.address}</p>
                                    )}
                                    {selectedInvoice.billing_address.city && (
                                        <p>{selectedInvoice.billing_address.city}, {selectedInvoice.billing_address.country}</p>
                                    )}
                                </div>
                            )}

                            {selectedInvoice.gift_recipient && (
                                <div className="gift-info">
                                    <span className="gift-label">🎁 Gift To:</span>
                                    <span className="gift-recipient">{selectedInvoice.gift_recipient}</span>
                                </div>
                            )}

                            <div className="invoice-items">
                                <h4>Items</h4>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedInvoice.items.map((item, i) => (
                                            <tr key={i}>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{formatAmount(item.price)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="invoice-totals">
                                <div className="total-row">
                                    <span>Subtotal</span>
                                    <span>{formatAmount(selectedInvoice.amount)}</span>
                                </div>
                                <div className="total-row">
                                    <span>Tax</span>
                                    <span>{formatAmount(selectedInvoice.tax)}</span>
                                </div>
                                <div className="total-row grand-total">
                                    <span>Total</span>
                                    <span>{formatAmount(selectedInvoice.total)}</span>
                                </div>
                            </div>

                            {selectedInvoice.refund_reason && (
                                <div className="refund-notice">
                                    <FaHistory />
                                    <span>Refund Reason: {selectedInvoice.refund_reason}</span>
                                </div>
                            )}
                        </div>
                    ) : filteredInvoices.length === 0 ? (
                        <div className="empty-state">
                            <FaFileInvoiceDollar />
                            <p>No invoices found</p>
                        </div>
                    ) : (
                        <div className="invoices-list">
                            {filteredInvoices.map(invoice => (
                                <div
                                    key={invoice.id}
                                    className={`invoice-item ${invoice.status}`}
                                    onClick={() => setSelectedInvoice(invoice)}
                                >
                                    <div className="invoice-icon">
                                        <FaFileInvoiceDollar />
                                    </div>
                                    <div className="invoice-info">
                                        <div className="invoice-main">
                                            <span className="invoice-number">{invoice.number}</span>
                                            <span className="invoice-desc">{invoice.description}</span>
                                        </div>
                                        <div className="invoice-meta">
                                            <span className="invoice-date">
                                                <FaCalendar /> {formatDate(invoice.date)}
                                            </span>
                                            {invoice.gift_recipient && (
                                                <span className="gift-tag">🎁 Gift</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="invoice-right">
                                        <span className="invoice-amount">
                                            {formatAmount(invoice.total)}
                                        </span>
                                        <span className={`status-badge ${invoice.status}`}>
                                            {getStatusIcon(invoice.status)}
                                            {invoice.status}
                                        </span>
                                    </div>
                                    <button
                                        className="download-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload(invoice.id);
                                        }}
                                        disabled={downloading === invoice.id}
                                    >
                                        <FaDownload />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvoiceHistoryPanel;
