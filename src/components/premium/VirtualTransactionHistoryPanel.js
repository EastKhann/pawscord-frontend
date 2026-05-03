import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    FaWallet, FaTimes, FaSearch, FaFilter, FaDownload,
    FaArrowUp, FaArrowDown, FaExchangeAlt, FaCoins, FaGift,
    FaShoppingCart, FaCalendar, FaChartLine, FaHistory, FaTrophy
} from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import logger from '../../utils/logger';
import './VirtualTransactionHistoryPanel.css';
import { useTranslation } from 'react-i18next';

const VirtualTransactionHistoryPanel = ({ userId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [dateRange, setDateRange] = useState('month');
    const [stats, setStats] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        loadTransactions();
    }, [userId, dateRange]);

    const loadTransactions = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth) {
                const response = await fetchWithAuth(`${baseUrl}/api/virtual-currency/transactions/?range=${dateRange}`);
                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data.transactions || data || []);
                    setStats(data.stats || {
                        current_balance: data.balance || 0,
                        total_earned: data.total_earned || 0,
                        total_spent: data.total_spent || 0,
                        transactions_count: (data.transactions || data || []).length,
                        this_month_earned: 0,
                        this_month_spent: 0
                    });
                } else {
                    setTransactions([]);
                    setStats({ current_balance: 0, total_earned: 0, total_spent: 0, transactions_count: 0, this_month_earned: 0, this_month_spent: 0 });
                }
            } else {
                setTransactions([]);
                setStats({ current_balance: 0, total_earned: 0, total_spent: 0, transactions_count: 0, this_month_earned: 0, this_month_spent: 0 });
            }
        } catch (error) {
            logger.error('Error loading transactions:', error);
            setTransactions([]);
            setStats({ current_balance: 0, total_earned: 0, total_spent: 0, transactions_count: 0, this_month_earned: 0, this_month_spent: 0 });
        }
        setLoading(false);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 86400000) { // Less than 24 hours
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (diff < 604800000) { // Less than 7 days
            return date.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatAmount = (amount) => {
        const absAmount = Math.abs(amount);
        if (amount > 0) return `+${absAmount.toLocaleString()}`;
        return `-${absAmount.toLocaleString()}`;
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'daily': return <FaCalendar />;
            case 'shop': return <FaShoppingCart />;
            case 'message': case 'voice': return <FaChartLine />;
            case 'received': return <FaArrowDown />;
            case 'sent': return <FaArrowUp />;
            case 'gambling': case 'bet': return <FaCoins />;
            case 'level': case 'achievement': return <FaTrophy />;
            case 'quest': return <FaGift />;
            case 'referral': return <FaGift />;
            default: return <FaExchangeAlt />;
        }
    };

    const exportTransactions = () => {
        const csv = transactions.map(t => ({
            date: t.timestamp,
            type: t.type,
            category: t.category,
            amount: t.amount,
            description: t.description,
            balance: t.balance_after
        }));
    };

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
    });

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return (
            <div className="vth-overlay" role="button" tabIndex={0} onClick={onClose} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
                <div className="vth-panel" role="button" tabIndex={0} onClick={e => e.stopPropagation()} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
                    <div className="loading">{t('virtualTx.loading', 'Loading transactions...')}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="vth-overlay" role="button" tabIndex={0} onClick={onClose} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
            <div className="vth-panel" role="button" tabIndex={0} onClick={e => e.stopPropagation()} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaWallet />
                            Transaction History
                        </h2>
                        <span className="subtitle">{t('virtualTx.subtitle', 'Virtual currency activity log')}</span>
                    </div>
                    <div className="header-actions">
                        <button
                            aria-label={t('transactions.exportBtn', 'Export transactions')} className="export-btn" onClick={exportTransactions}>
                            <FaDownload /> Export
                        </button>
                        <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Balance Card */}
                <div className="balance-section">
                    <div className="balance-card main">
                        <div className="balance-icon">
                            <FaCoins />
                        </div>
                        <div className="balance-info">
                            <span className="balance-label">Mevcut Bakiye</span>
                            <span className="balance-value">{stats.current_balance.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="balance-card earned">
                        <div className="balance-icon">
                            <FaArrowDown />
                        </div>
                        <div className="balance-info">
                            <span className="balance-label">{t('virtualTx.earnedThisMonth', 'Earned This Month')}</span>
                            <span className="balance-value positive">+{stats.this_month_earned.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="balance-card spent">
                        <div className="balance-icon">
                            <FaArrowUp />
                        </div>
                        <div className="balance-info">
                            <span className="balance-label">Bu Ay Harcanan</span>
                            <span className="balance-value negative">-{stats.this_month_spent.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="balance-card total">
                        <div className="balance-icon">
                            <FaHistory />
                        </div>
                        <div className="balance-info">
                            <span className="balance-label">{t('virtualTx.totalTransactions', 'Total Transactions')}</span>
                            <span className="balance-value">{stats.transactions_count}</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-row">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder={t('common.searchTransactions', 'Search transactions...')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <FaFilter />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}>
                            <option value="all">{t('common.allTypes', 'All Types')}</option>
                            <option value="earn">Earned</option>
                            <option value="spend">Spent</option>
                            <option value="transfer">Transfers</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <FaCalendar />
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}>
                            <option value="week">Bu Hafta</option>
                            <option value="month">Bu Ay</option>
                            <option value="year">{t('common.thisYear', 'This Year')}</option>
                            <option value="all">{t('admin.allTime', 'All Time')}</option>
                        </select>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="transactions-container">
                    {paginatedTransactions.length > 0 ? (
                        <div className="transactions-list">
                            {paginatedTransactions.map(transaction => (
                                <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
                                    <div className={`transaction-icon ${transaction.category}`}>
                                        {getCategoryIcon(transaction.category)}
                                    </div>
                                    <div className="transaction-info">
                                        <span className="transaction-desc">{transaction.description}</span>
                                        <span className="transaction-time">{formatDate(transaction.timestamp)}</span>
                                    </div>
                                    <div className="transaction-amount">
                                        <span className={`amount ${transaction.amount >= 0 ? 'positive' : 'negative'}`}>
                                            {formatAmount(transaction.amount)}
                                        </span>
                                        <span className="balance-after">
                                            Balance: {transaction.balance_after.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <FaHistory />
                            <p>{t('virtualTx.notFound', 'No transactions found')}</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                aria-label={t('common.previousPage', 'Previous page')}
                                onClick={() => setCurrentPage(p => p - 1)}>
                                {t('common.previous', 'Previous')}
                            </button>
                            <span className="page-info">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                aria-label={t('common.nextPage', 'Next page')}
                                onClick={() => setCurrentPage(p => p + 1)}>
                                {t('common.next', 'Next')}
                            </button>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
};

VirtualTransactionHistoryPanel.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default VirtualTransactionHistoryPanel;
