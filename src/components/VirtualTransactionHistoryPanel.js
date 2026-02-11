import { useState, useEffect } from 'react';
import {
    FaWallet, FaTimes, FaSearch, FaFilter, FaDownload,
    FaArrowUp, FaArrowDown, FaExchangeAlt, FaCoins, FaGift,
    FaShoppingCart, FaCalendar, FaChartLine, FaHistory, FaTrophy
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './VirtualTransactionHistoryPanel.css';

const VirtualTransactionHistoryPanel = ({ userId, onClose, fetchWithAuth, apiBaseUrl }) => {
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
            console.error('Error loading transactions:', error);
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
            <div className="vth-overlay" onClick={onClose}>
                <div className="vth-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading transactions...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="vth-overlay" onClick={onClose}>
            <div className="vth-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaWallet />
                            Transaction History
                        </h2>
                        <span className="subtitle">Virtual currency activity log</span>
                    </div>
                    <div className="header-actions">
                        <button className="export-btn" onClick={exportTransactions}>
                            <FaDownload /> Export
                        </button>
                        <button className="close-btn" onClick={onClose}>
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
                            <span className="balance-label">Current Balance</span>
                            <span className="balance-value">{stats.current_balance.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="balance-card earned">
                        <div className="balance-icon">
                            <FaArrowDown />
                        </div>
                        <div className="balance-info">
                            <span className="balance-label">This Month Earned</span>
                            <span className="balance-value positive">+{stats.this_month_earned.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="balance-card spent">
                        <div className="balance-icon">
                            <FaArrowUp />
                        </div>
                        <div className="balance-info">
                            <span className="balance-label">This Month Spent</span>
                            <span className="balance-value negative">-{stats.this_month_spent.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="balance-card total">
                        <div className="balance-icon">
                            <FaHistory />
                        </div>
                        <div className="balance-info">
                            <span className="balance-label">Total Transactions</span>
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
                            placeholder="Search transactions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <FaFilter />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="earn">Earned</option>
                            <option value="spend">Spent</option>
                            <option value="transfer">Transfers</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <FaCalendar />
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                            <option value="all">All Time</option>
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
                            <p>No transactions found</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                            >
                                Previous
                            </button>
                            <span className="page-info">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VirtualTransactionHistoryPanel;
