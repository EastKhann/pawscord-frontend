import React, { useState, useEffect } from 'react';
import {
    FaCheckDouble, FaTimes, FaCheck, FaEye, FaUser,
    FaClock, FaEnvelope, FaEnvelopeOpen, FaSearch,
    FaFilter, FaChevronDown, FaChevronUp, FaUsers,
    FaCheckCircle, FaTimesCircle, FaSpinner
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './MessageReceiptsPanel.css';

const MessageReceiptsPanel = ({ messageId, messageContent, channelName, onClose }) => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('all'); // all, delivered, read
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('time');
    const [stats, setStats] = useState({ total: 0, delivered: 0, read: 0 });
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchReceipts();
    }, [messageId]);

    const fetchReceipts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/messages/${messageId}/receipts/`, {
                headers: { 'Authorization': `Token ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setReceipts(data.receipts || []);
                setStats(data.stats || calculateStats([]));
            } else {
                setReceipts([]);
                setStats(calculateStats([]));
            }
        } catch (error) {
            setReceipts([]);
            setStats(calculateStats([]));
        }
        setLoading(false);
    };

    const calculateStats = (receiptList) => ({
        total: receiptList.length,
        delivered: receiptList.filter(r => r.delivered_at).length,
        read: receiptList.filter(r => r.read_at).length
    });

    const getFilteredReceipts = () => {
        let filtered = [...receipts];

        // Filter by view
        if (view === 'delivered') {
            filtered = filtered.filter(r => r.delivered_at && !r.read_at);
        } else if (view === 'read') {
            filtered = filtered.filter(r => r.read_at);
        }

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(r =>
                r.user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'time') {
                const timeA = a.read_at || a.delivered_at || '';
                const timeB = b.read_at || b.delivered_at || '';
                return new Date(timeB) - new Date(timeA);
            }
            return a.user.username.localeCompare(b.user.username);
        });

        return filtered;
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return null;
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Şimdi';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}dk önce`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}sa önce`;

        return date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusIcon = (receipt) => {
        if (receipt.read_at) {
            return <FaCheckDouble className="status-icon read" />;
        }
        if (receipt.delivered_at) {
            return <FaCheck className="status-icon delivered" />;
        }
        return <FaSpinner className="status-icon pending spin" />;
    };

    const getStatusColor = (status) => {
        const colors = {
            online: '#4caf50',
            idle: '#ffc107',
            dnd: '#f44336',
            offline: '#666'
        };
        return colors[status] || '#666';
    };

    const filteredReceipts = getFilteredReceipts();

    return (
        <div className="receipts-overlay" onClick={(e) => e.target.className === 'receipts-overlay' && onClose()}>
            <div className="receipts-panel">
                <div className="panel-header">
                    <h2><FaCheckDouble /> Mesaj Durumu</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* Message Preview */}
                <div className="message-preview">
                    <div className="channel-info">
                        <span>#{channelName}</span>
                    </div>
                    <div className="message-content">
                        {messageContent?.substring(0, 100)}
                        {messageContent?.length > 100 && '...'}
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-row">
                    <div className={`stat-card ${view === 'all' ? 'active' : ''}`} onClick={() => setView('all')}>
                        <FaUsers className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{stats.total}</span>
                            <span className="stat-label">Toplam</span>
                        </div>
                    </div>
                    <div className={`stat-card delivered ${view === 'delivered' ? 'active' : ''}`} onClick={() => setView('delivered')}>
                        <FaCheck className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{stats.delivered}</span>
                            <span className="stat-label">Teslim Edildi</span>
                        </div>
                    </div>
                    <div className={`stat-card read ${view === 'read' ? 'active' : ''}`} onClick={() => setView('read')}>
                        <FaCheckDouble className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{stats.read}</span>
                            <span className="stat-label">Okundu</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-row">
                    <div className="search-input">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Kullanıcı ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="time">Zamana Göre</option>
                        <option value="name">İsme Göre</option>
                    </select>
                </div>

                {/* Progress Bar */}
                <div className="progress-section">
                    <div className="progress-bar">
                        <div
                            className="progress-read"
                            style={{ width: `${(stats.read / stats.total) * 100}%` }}
                        />
                        <div
                            className="progress-delivered"
                            style={{ width: `${((stats.delivered - stats.read) / stats.total) * 100}%` }}
                        />
                    </div>
                    <div className="progress-labels">
                        <span><FaCheckDouble /> %{Math.round((stats.read / stats.total) * 100)} Okundu</span>
                        <span><FaCheck /> %{Math.round((stats.delivered / stats.total) * 100)} Teslim</span>
                    </div>
                </div>

                {/* Receipts List */}
                <div className="receipts-list">
                    {loading ? (
                        <div className="loading">
                            <FaSpinner className="spin" />
                            <span>Yükleniyor...</span>
                        </div>
                    ) : filteredReceipts.length === 0 ? (
                        <div className="empty-state">
                            <FaEnvelope />
                            <p>Alıcı bulunamadı</p>
                        </div>
                    ) : (
                        filteredReceipts.map(receipt => (
                            <div key={receipt.id} className="receipt-item">
                                <div className="user-avatar">
                                    {receipt.user.avatar ? (
                                        <img src={receipt.user.avatar} alt="" />
                                    ) : (
                                        <FaUser />
                                    )}
                                    <span
                                        className="status-dot"
                                        style={{ background: getStatusColor(receipt.user.status) }}
                                    />
                                </div>
                                <div className="user-info">
                                    <span className="username">{receipt.user.username}</span>
                                    <span className="status-text">
                                        {receipt.read_at ? (
                                            <>Okundu • {formatTime(receipt.read_at)}</>
                                        ) : receipt.delivered_at ? (
                                            <>Teslim edildi • {formatTime(receipt.delivered_at)}</>
                                        ) : (
                                            'Bekliyor...'
                                        )}
                                    </span>
                                </div>
                                <div className="receipt-status">
                                    {getStatusIcon(receipt)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Legend */}
                <div className="legend">
                    <div className="legend-item">
                        <FaSpinner className="pending" /> Bekliyor
                    </div>
                    <div className="legend-item">
                        <FaCheck className="delivered" /> Teslim Edildi
                    </div>
                    <div className="legend-item">
                        <FaCheckDouble className="read" /> Okundu
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageReceiptsPanel;
