/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/MessageSearchPanel.js
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaTimes, FaFilter, FaCalendar, FaUser } from 'react-icons/fa';
import toast from '../../utils/toast';
import './MessageSearchPanel.css';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

const MessageSearchPanel = ({ serverId, channelId, onClose, onSelectMessage }) => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        author: '',
        dateFrom: '',
        dateTo: '',
        hasAttachment: false,
        hasLink: false,
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
            toast.error(t('search.enterSearchTerm'));
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
                ...(filters.hasLink && { has_link: true }),
            });

            const response = await fetch(`${API_BASE_URL}/messages/search/?${params}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.results);
                if (data.results.length === 0) {
                    toast.info(t('ui.sonuc_not_found'));
                }
            } else {
                toast.error(t('ui.search_hatasi'));
            }
        } catch (error) {
            logger.error('Search error:', error);
            toast.error(t('common.connectionError'));
        } finally {
            setLoading(false);
        }
    };

    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <mark key={`item-${index}`}>{part}</mark>
            ) : (
                part
            )
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleMessageClick = (message) => {
        if (onSelectMessage) {
            onSelectMessage(message);
        }
        onClose();
    };

    return (
        <div
            className="message-search-panel-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="message-search-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="search-header">
                    <FaSearch className="header-icon" />
                    <h2>{t('search.messageSearch')}</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="search-input-container">
                    <FaSearch className="search-icon" />
                    {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                    <input
                        type="text"
                        className="search-input"
                        placeholder={t('search.searchMessages')}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && searchMessages()}
                        autoFocus
                    />
                    {query && (
                        <button
                            aria-label={t('search.clearQuery', 'Clear search')}
                            className="clear-btn"
                            onClick={() => setQuery('')}
                        >
                            <FaTimes />
                        </button>
                    )}
                    <button
                        aria-label={showFilters ? t('search.hideFilters', 'Hide filters') : t('search.showFilters', 'Show filters')}
                        onClick={() => setShowFilters(!showFilters)}
                        title={t('search.filter')}
                    >
                        <FaFilter />
                    </button>
                </div>

                {showFilters && (
                    <div className="filters-section">
                        <div className="filter-row">
                            <div className="filter-group">
                                <label>
                                    <FaUser /> {t('search.userLabel')}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('ui.kullaniciadi')}
                                    value={filters.author}
                                    onChange={(e) =>
                                        setFilters({ ...filters, author: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <div className="filter-row">
                            <div className="filter-group">
                                <label>
                                    <FaCalendar /> {t('search.dateFrom')}
                                </label>
                                <input
                                    type="date"
                                    value={filters.dateFrom}
                                    onChange={(e) =>
                                        setFilters({ ...filters, dateFrom: e.target.value })
                                    }
                                />
                            </div>
                            <div className="filter-group">
                                <label>
                                    <FaCalendar /> {t('search.dateTo')}
                                </label>
                                <input
                                    type="date"
                                    value={filters.dateTo}
                                    onChange={(e) =>
                                        setFilters({ ...filters, dateTo: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <div className="filter-row">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.hasAttachment}
                                    onChange={(e) =>
                                        setFilters({ ...filters, hasAttachment: e.target.checked })
                                    }
                                />
                                <span>{t('search.hasFiles')}</span>
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={filters.hasLink}
                                    onChange={(e) =>
                                        setFilters({ ...filters, hasLink: e.target.checked })
                                    }
                                />
                                <span>{t('search.hasLinks')}</span>
                            </label>
                        </div>
                    </div>
                )}

                <div className="search-results">
                    {loading && (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('search.searching')}</p>
                        </div>
                    )}

                    {!loading && results.length === 0 && query && (
                        <div className="empty-state">
                            <FaSearch size={48} />
                            <h3>{t('search.noResults')}</h3>
                            <p>{t('search.noMessagesFor', { query })}</p>
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <>
                            <div className="results-count">
                                {results.length} {t('search.resultsFound')}
                            </div>
                            <div className="results-list">
                                {results.map((message) => (
                                    <div
                                        key={message.id}
                                        className="result-item"
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleMessageClick(message)}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="result-header">
                                            <img
                                                src={message.author.avatar || '/default-avatar.png'}
                                                alt={message.author.username}
                                                className="author-avatar"
                                            />
                                            <div className="author-info">
                                                <span className="author-name">
                                                    {message.author.username}
                                                </span>
                                                <span className="message-date">
                                                    {formatDate(message.created_at)}
                                                </span>
                                            </div>
                                            {message.channel && (
                                                <span className="channel-tag">
                                                    {message.channel.name}
                                                </span>
                                            )}
                                        </div>
                                        <div className="message-content">
                                            {highlightText(message.content, query)}
                                        </div>
                                        {message.attachments && message.attachments.length > 0 && (
                                            <div className="message-attachments">
                                                📎 {message.attachments.length} {t('search.files')}
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
                            <h3>{t('search.messageSearch')}</h3>
                            <p>{t('search.searchAllMessages')}</p>
                            <ul className="search-tips">
                                <li>{t('search.tipMinChars')}</li>
                                <li>{t('search.tipUseFilters')}</li>
                                <li>{t('search.tipFilterByUser')}</li>
                                <li>{t('search.tipDateRange')}</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

MessageSearchPanel.propTypes = {
    serverId: PropTypes.string,
    channelId: PropTypes.string,
    onClose: PropTypes.func,
    onSelectMessage: PropTypes.func,
};
export default MessageSearchPanel;
