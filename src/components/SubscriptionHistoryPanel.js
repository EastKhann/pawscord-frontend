import React, { useState, useEffect } from 'react';
import {
    FaCreditCard, FaTimes, FaHistory, FaDownload, FaFilter,
    FaCrown, FaGem, FaRocket, FaCheck, FaExclamationTriangle,
    FaSync, FaCalendar, FaReceipt, FaInfoCircle
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './SubscriptionHistoryPanel.css';
import toast from '../utils/toast';

const SubscriptionHistoryPanel = ({ userId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [currentPlan, setCurrentPlan] = useState(null);
    const [filterPeriod, setFilterPeriod] = useState('all');

    useEffect(() => {
        loadHistory();
    }, [userId]);

    const loadHistory = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth) {
                const response = await fetchWithAuth(`${baseUrl}/api/subscriptions/`);
                if (response.ok) {
                    const data = await response.json();
                    const formattedHistory = (data.subscriptions || data.history || data || []).map(sub => ({
                        id: sub.id,
                        type: sub.type || 'subscription',
                        plan: sub.tier || sub.plan || 'basic',
                        plan_name: sub.plan_name || `PAWSCORD ${sub.tier || 'Basic'}`,
                        amount: sub.amount || 9.99,
                        currency: sub.currency || 'USD',
                        status: sub.status === 'active' ? 'succeeded' : sub.status,
                        period_start: sub.start_date || sub.period_start,
                        period_end: sub.end_date || sub.period_end,
                        payment_method: sub.payment_method || '**** 4242',
                        created_at: sub.created_at || sub.start_date
                    }));
                    setHistory(formattedHistory);
                    setCurrentPlan(data.current_plan || null);
                } else {
                    setHistory([]);
                    setCurrentPlan(null);
                }
            } else {
                setHistory([]);
                setCurrentPlan(null);
            }
        } catch (error) {
            console.error('Error loading subscription history:', error);
            setHistory([]);
            setCurrentPlan(null);
        }
        setLoading(false);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'succeeded': return <FaCheck className="status-icon success" />;
            case 'failed': return <FaExclamationTriangle className="status-icon failed" />;
            case 'refunded': return <FaSync className="status-icon refunded" />;
            case 'pending': return <FaHistory className="status-icon pending" />;
            default: return <FaInfoCircle className="status-icon" />;
        }
    };

    const getPlanIcon = (plan) => {
        switch (plan) {
            case 'nitro': return <FaGem className="plan-icon nitro" />;
            case 'basic': return <FaCrown className="plan-icon basic" />;
            case 'server_boost': return <FaRocket className="plan-icon boost" />;
            default: return <FaCreditCard className="plan-icon" />;
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAmount = (amount, currency) => {
        const symbol = currency === 'USD' ? '$' : currency;
        const prefix = amount < 0 ? '-' : '';
        return `${prefix}${symbol}${Math.abs(amount).toFixed(2)}`;
    };

    const handleDownloadInvoice = (invoiceId) => {
        toast.info(`Downloading invoice ${invoiceId}...`);
    };

    const filteredHistory = history.filter(item => {
        if (activeTab !== 'all' && item.type !== activeTab) return false;

        if (filterPeriod !== 'all') {
            const itemDate = new Date(item.created_at);
            const now = new Date();
            const daysDiff = (now - itemDate) / (1000 * 60 * 60 * 24);

            switch (filterPeriod) {
                case '30': return daysDiff <= 30;
                case '90': return daysDiff <= 90;
                case '365': return daysDiff <= 365;
                default: return true;
            }
        }
        return true;
    });

    const totalSpent = history
        .filter(h => h.status === 'succeeded')
        .reduce((sum, h) => sum + (h.amount > 0 ? h.amount : 0), 0);

    return (
        <div className="subhistory-overlay" onClick={onClose}>
            <div className="subhistory-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2><FaHistory /> Subscription History</h2>
                        <span className="total-spent">Total Spent: {formatAmount(totalSpent, 'USD')}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Current Plan */}
                {currentPlan && (
                    <div className="current-plan">
                        <div className="plan-info">
                            {getPlanIcon(currentPlan.plan)}
                            <div className="plan-details">
                                <h3>{currentPlan.plan_name}</h3>
                                <span className="plan-status active">Active</span>
                            </div>
                        </div>
                        <div className="plan-meta">
                            <div className="meta-item">
                                <FaCreditCard />
                                <span>{formatAmount(currentPlan.amount, currentPlan.currency)}/{currentPlan.billing_cycle}</span>
                            </div>
                            <div className="meta-item">
                                <FaCalendar />
                                <span>Next billing: {formatDate(currentPlan.next_billing_date)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="filter-bar">
                    <div className="tabs">
                        {['all', 'subscription', 'boost', 'refund'].map(tab => (
                            <button
                                key={tab}
                                className={activeTab === tab ? 'active' : ''}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="period-filter">
                        <FaFilter />
                        <select
                            value={filterPeriod}
                            onChange={(e) => setFilterPeriod(e.target.value)}
                        >
                            <option value="all">All Time</option>
                            <option value="30">Last 30 Days</option>
                            <option value="90">Last 90 Days</option>
                            <option value="365">Last Year</option>
                        </select>
                    </div>
                </div>

                {/* History List */}
                <div className="history-content">
                    {loading ? (
                        <div className="loading">Loading payment history...</div>
                    ) : filteredHistory.length === 0 ? (
                        <div className="empty-state">
                            <FaReceipt />
                            <p>No transactions found</p>
                        </div>
                    ) : (
                        <div className="history-list">
                            {filteredHistory.map(item => (
                                <div key={item.id} className={`history-item ${item.status}`}>
                                    <div className="item-icon">
                                        {getPlanIcon(item.plan)}
                                    </div>
                                    <div className="item-info">
                                        <div className="item-header">
                                            <span className="item-name">{item.plan_name}</span>
                                            {item.server_name && (
                                                <span className="server-name">for {item.server_name}</span>
                                            )}
                                        </div>
                                        <div className="item-meta">
                                            <span className="item-date">{formatDate(item.created_at)}</span>
                                            {item.period_start && item.period_end && (
                                                <span className="item-period">
                                                    {formatDate(item.period_start)} - {formatDate(item.period_end)}
                                                </span>
                                            )}
                                            {item.payment_method && (
                                                <span className="payment-method">{item.payment_method}</span>
                                            )}
                                        </div>
                                        {item.error_message && (
                                            <span className="error-message">{item.error_message}</span>
                                        )}
                                        {item.reason && (
                                            <span className="refund-reason">Reason: {item.reason}</span>
                                        )}
                                    </div>
                                    <div className="item-right">
                                        <div className="item-amount" data-negative={item.amount < 0}>
                                            {formatAmount(item.amount, item.currency)}
                                        </div>
                                        <div className="item-status">
                                            {getStatusIcon(item.status)}
                                            <span>{item.status}</span>
                                        </div>
                                        {item.invoice_id && (
                                            <button
                                                className="download-btn"
                                                onClick={() => handleDownloadInvoice(item.invoice_id)}
                                                title="Download Invoice"
                                            >
                                                <FaDownload />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="panel-footer">
                    <div className="footer-info">
                        <FaInfoCircle />
                        <span>Payment issues? Contact support</span>
                    </div>
                    <button className="manage-btn">
                        <FaCreditCard /> Manage Subscription
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionHistoryPanel;
