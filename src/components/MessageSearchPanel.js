// frontend/src/components/MessageSearchPanel.js
import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaFilter, FaCalendar, FaUser } from 'react-icons/fa';
import toast from '../utils/toast';
import './MessageSearchPanel.css';

const MessageSearchPanel = ({ serverId, channelId, onClose, onSelectMessage }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        author: '',
        dateFrom: '',
        dateTo: '',
        hasAttachment: false,
        hasLink: false
    });
    const [showFilters, setShowFilters] = useState(false);
    const searchTimeout = useRef(null);

    useEffect(() => {
        // Auto-search when query changes (debounced)
        if (query.length >= 3) {
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
            searchTimeout.current = setTimeout(() => {
                searchMessages();
            }, 500);
        }
        
        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
        };
    }, [query, filters]);

    const searchMessages = async () => {
        if (!query.trim()) {
            toast.error('❌ Arama terimi girin');
            return;
        }

        setLoading(true);
        try {
            const params = new URLSearchParams({
                q: query,
                ...(serverId && { server: serverId }),
                ...(channelId && { channel: channelId }),
                ...(filters.author && { author: filters.author }),
                ...(filters.dateFrom && { date_from: filters.dateFrom }),
                ...(filters.dateTo && { date_to: filters.dateTo }),
                ...(filters.hasAttachment && { has_attachment: true }),
                ...(filters.hasLink && { has_link: true })
            });

            const response = await fetch(`/api/messages/search/?${params}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.results);
                if (data.results.length === 0) {
                    toast.info('ℹ️ Sonuç bulunamadı');
                }
            } else {
                toast.error('❌ Arama hatası');
            }
        } catch (error) {
            console.error('Search error:', error);
            toast.error('❌ Bağlantı hatası');
        } finally {
            setLoading(false);
        }
    };

    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) => 
            part.toLowerCase() === query.toLowerCase() 
                ? <mark key={index}>{part}</mark> 
                : part
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleMessageClick = (message) => {
        if (onSelectMessage) {
            onSelectMessage(message);
        }
        onClose();
    };

    return (
        <div className="message-search-panel-overlay" onClick={onClose}>
            <div className="message-search-panel" onClick={(e) => e.stopPropagation()}>
                <div className="search-header">
                    <FaSearch className="header-icon" />
                    <h2>Mesaj Ara</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="search-input-container">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Mesaj ara..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && searchMessages()}
                        autoFocus
                    />
                    {query && (
                        <button className="clear-btn" onClick={() => setQuery('')}>
                            <FaTimes />
                        </button>
                    )}
                    <button 
                        className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                        onClick={() => setShowFilters(!showFilters)}
                        title="Filtreler"
                    >
                        <FaFilter />
                    </button>
                </div>

                {showFilters && (
                    <div className="filters-section">
                        <div className="filter-row">
                            <div className="filter-group">
                                <label><FaUser /> Kullanıcı</label>
                                <input
                                    type="text"
                                    placeholder="@kullanıcıadı"
                                    value={filters.author}
                                    onChange={(e) => setFilters({...filters, author: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="filter-row">
                            <div className="filter-group">
                                <label><FaCalendar /> Başlangıç</label>
                                <input
                                    type="date"
                                    value={filters.dateFrom}
                                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                                />
                            </div>
                            <div className="filter-group">
                                <label><FaCalendar /> Bitiş</label>
                                <input
                                    type="date"
                                    value={filters.dateTo}
                                    onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="filter-row">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.hasAttachment}
                                    onChange={(e) => setFilters({...filters, hasAttachment: e.target.checked})}
                                />
                                <span>Ekli dosya içeren</span>
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.hasLink}
                                    onChange={(e) => setFilters({...filters, hasLink: e.target.checked})}
                                />
                                <span>Link içeren</span>
                            </label>
                        </div>
                    </div>
                )}

                <div className="search-results">
                    {loading && (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Aranıyor...</p>
                        </div>
                    )}

                    {!loading && results.length === 0 && query && (
                        <div className="empty-state">
                            <FaSearch size={48} />
                            <h3>Sonuç Bulunamadı</h3>
                            <p>"{query}" için mesaj bulunamadı</p>
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <>
                            <div className="results-count">
                                {results.length} sonuç bulundu
                            </div>
                            <div className="results-list">
                                {results.map((message) => (
                                    <div
                                        key={message.id}
                                        className="result-item"
                                        onClick={() => handleMessageClick(message)}
                                    >
                                        <div className="result-header">
                                            <img
                                                src={message.author.avatar || '/default-avatar.png'}
                                                alt={message.author.username}
                                                className="author-avatar"
                                            />
                                            <div className="author-info">
                                                <span className="author-name">{message.author.username}</span>
                                                <span className="message-date">{formatDate(message.created_at)}</span>
                                            </div>
                                            {message.channel && (
                                                <span className="channel-tag">#{message.channel.name}</span>
                                            )}
                                        </div>
                                        <div className="message-content">
                                            {highlightText(message.content, query)}
                                        </div>
                                        {message.attachments && message.attachments.length > 0 && (
                                            <div className="message-attachments">
                                                📎 {message.attachments.length} dosya
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {!loading && !query && (
                        <div className="empty-state">
                            <FaSearch size={48} />
                            <h3>Mesaj Ara</h3>
                            <p>Sunucudaki tüm mesajları arayın</p>
                            <ul className="search-tips">
                                <li>En az 3 karakter girin</li>
                                <li>Filtreleri kullanarak sonuçları daraltın</li>
                                <li>Kullanıcıya göre filtreleyin</li>
                                <li>Tarih aralığı belirleyin</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageSearchPanel;
