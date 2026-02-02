// frontend/src/components/VanityHistoryPanel.js - Vanity URL Change History
import React, { useState, useEffect } from 'react';
import {
    FaLink, FaTimes, FaSearch, FaClock, FaUser, FaHistory,
    FaArrowRight, FaUndo, FaCopy, FaCheck, FaExternalLinkAlt,
    FaCalendar, FaFilter
} from 'react-icons/fa';
import toast from '../utils/toast';
import './VanityHistoryPanel.css';

const VanityHistoryPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [history, setHistory] = useState([]);
    const [currentVanity, setCurrentVanity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        fetchVanityHistory();
        fetchCurrentVanity();
    }, [serverId]);

    const fetchVanityHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/vanity-history/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data.history || []);
            }
        } catch (error) {
            console.error('Fetch vanity history error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentVanity = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/vanity/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setCurrentVanity(data.vanity_url);
            }
        } catch (error) {
            console.error('Fetch current vanity error:', error);
        }
    };

    const handleRevert = async (vanityUrl) => {
        if (!window.confirm(`"${vanityUrl}" vanity URL'sine geri dönmek istiyor musunuz?`)) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/vanity/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vanity_url: vanityUrl })
            });

            if (response.ok) {
                toast.success(`✅ Vanity URL "${vanityUrl}" olarak değiştirildi`);
                setCurrentVanity(vanityUrl);
                fetchVanityHistory();
            } else {
                const err = await response.json();
                toast.error(err.error || 'Vanity URL değiştirilemedi');
            }
        } catch (error) {
            console.error('Revert vanity error:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const handleCopy = (url, id) => {
        const fullUrl = `https://pawscord.app/invite/${url}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedId(id);
        toast.success('📋 URL kopyalandı');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const getFilteredHistory = () => {
        let filtered = history;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(h =>
                h.vanity_url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                h.changed_by_username?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Date filter
        if (dateFilter !== 'all') {
            const now = new Date();
            const filterDates = {
                '24h': 24 * 60 * 60 * 1000,
                '7d': 7 * 24 * 60 * 60 * 1000,
                '30d': 30 * 24 * 60 * 60 * 1000
            };
            filtered = filtered.filter(h => {
                const changeDate = new Date(h.changed_at);
                return (now - changeDate) <= filterDates[dateFilter];
            });
        }

        return filtered;
    };

    const filteredHistory = getFilteredHistory();

    return (
        <div className="vanity-history-overlay" onClick={onClose}>
            <div className="vanity-history-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaLink /> Vanity URL Geçmişi</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Current Vanity URL */}
                {currentVanity && (
                    <div className="current-vanity">
                        <div className="current-label">
                            <FaLink /> Mevcut Vanity URL
                        </div>
                        <div className="current-url">
                            <span className="url-text">pawscord.app/invite/<strong>{currentVanity}</strong></span>
                            <div className="url-actions">
                                <button
                                    className="copy-btn"
                                    onClick={() => handleCopy(currentVanity, 'current')}
                                >
                                    {copiedId === 'current' ? <FaCheck /> : <FaCopy />}
                                </button>
                                <a
                                    href={`https://pawscord.app/invite/${currentVanity}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="open-btn"
                                >
                                    <FaExternalLinkAlt />
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="filters-section">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="URL veya kullanıcı ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="date-filter">
                        <FaFilter />
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        >
                            <option value="all">Tüm Zamanlar</option>
                            <option value="24h">Son 24 Saat</option>
                            <option value="7d">Son 7 Gün</option>
                            <option value="30d">Son 30 Gün</option>
                        </select>
                    </div>
                </div>

                {/* History List */}
                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredHistory.length > 0 ? (
                        <div className="history-list">
                            {filteredHistory.map((item, idx) => (
                                <div key={idx} className="history-item">
                                    <div className="history-icon">
                                        <FaHistory />
                                    </div>

                                    <div className="history-content">
                                        <div className="url-change">
                                            <span className="old-url">
                                                {item.old_vanity_url || '(URL yok)'}
                                            </span>
                                            <FaArrowRight className="arrow" />
                                            <span className="new-url">
                                                {item.new_vanity_url || '(URL yok)'}
                                            </span>
                                        </div>

                                        <div className="history-meta">
                                            <span className="changed-by">
                                                <FaUser /> {item.changed_by_username || 'Sistem'}
                                            </span>
                                            <span className="changed-at">
                                                <FaCalendar /> {new Date(item.changed_at).toLocaleString('tr-TR')}
                                            </span>
                                        </div>

                                        {item.reason && (
                                            <div className="change-reason">
                                                Sebep: {item.reason}
                                            </div>
                                        )}
                                    </div>

                                    <div className="history-actions">
                                        {item.old_vanity_url && item.old_vanity_url !== currentVanity && (
                                            <button
                                                className="revert-btn"
                                                onClick={() => handleRevert(item.old_vanity_url)}
                                                title="Bu URL'ye geri dön"
                                            >
                                                <FaUndo /> Geri Al
                                            </button>
                                        )}
                                        {item.new_vanity_url && (
                                            <button
                                                className="copy-btn"
                                                onClick={() => handleCopy(item.new_vanity_url, idx)}
                                                title="Kopyala"
                                            >
                                                {copiedId === idx ? <FaCheck /> : <FaCopy />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-history">
                            <FaLink className="empty-icon" />
                            <p>Vanity URL değişiklik geçmişi bulunamadı</p>
                        </div>
                    )}
                </div>

                {/* Stats Footer */}
                <div className="panel-footer">
                    <div className="stat">
                        <span className="stat-value">{history.length}</span>
                        <span className="stat-label">Toplam Değişiklik</span>
                    </div>
                    <div className="stat">
                        <span className="stat-value">
                            {history.length > 0 ?
                                new Date(history[0].changed_at).toLocaleDateString('tr-TR') :
                                '-'
                            }
                        </span>
                        <span className="stat-label">Son Değişiklik</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VanityHistoryPanel;
