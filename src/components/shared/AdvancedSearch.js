/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
// components/AdvancedSearch.js
// 🔍 Advanced Search Panel - Power User Feature

import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaTimes, FaFilter, FaCalendar, FaUser, FaFile, FaHeart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './AdvancedSearch.css';

const AdvancedSearch = memo(({ messages = [], onClose, onSelectMessage, allUsers = [] }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        user: '',
        dateFrom: '',
        dateTo: '',
        fileType: '',
        hasReaction: false,
        hasMention: false,
        hasFile: false,
        hasImage: false,
    });
    const [showFilters, setShowFilters] = useState(false);
    const [searchHistory, setSearchHistory] = useState(() => {
        const saved = localStorage.getItem('pawscord-search-history');
        return saved ? JSON.parse(saved) : [];
    });

    // Fuzzy search function
    const fuzzyMatch = (text, query) => {
        if (!text || !query) return false;
        text = text.toLowerCase();
        query = query.toLowerCase();

        // Exact match
        if (text.includes(query)) return true;

        // Fuzzy match (allows typos)
        let queryIndex = 0;
        for (let i = 0; i < text.length && queryIndex < query.length; i++) {
            if (text[i] === query[queryIndex]) {
                queryIndex++;
            }
        }
        return queryIndex === query.length;
    };

    // Filter and search messages
    const searchResults = useMemo(() => {
        if (!searchQuery.trim() && !Object.values(filters).some((f) => f)) {
            return [];
        }

        let results = messages;

        // Text search (fuzzy)
        if (searchQuery.trim()) {
            results = results.filter(
                (msg) =>
                    fuzzyMatch(msg.content, searchQuery) || fuzzyMatch(msg.username, searchQuery)
            );
        }

        // Filter by user
        if (filters.user) {
            results = results.filter(
                (msg) => msg.username?.toLowerCase() === filters.user.toLowerCase()
            );
        }

        // Filter by date range
        if (filters.dateFrom) {
            const fromDate = new Date(filters.dateFrom);
            results = results.filter((msg) => {
                const msgDate = new Date(msg.timestamp || msg.created_at);
                return msgDate >= fromDate;
            });
        }

        if (filters.dateTo) {
            const toDate = new Date(filters.dateTo);
            toDate.setHours(23, 59, 59, 999); // End of day
            results = results.filter((msg) => {
                const msgDate = new Date(msg.timestamp || msg.created_at);
                return msgDate <= toDate;
            });
        }

        // Filter by file type
        if (filters.hasFile) {
            results = results.filter((msg) => msg.file_url || msg.file);
        }

        if (filters.hasImage) {
            results = results.filter((msg) => msg.image_url || msg.image);
        }

        // Filter by reactions
        if (filters.hasReaction) {
            results = results.filter((msg) => msg.reactions && msg.reactions.length > 0);
        }

        // Sort by relevance (newest first)
        return results.sort((a, b) => {
            const dateA = new Date(a.timestamp || a.created_at);
            const dateB = new Date(b.timestamp || b.created_at);
            return dateB - dateA;
        });
    }, [searchQuery, filters, messages]);

    // Save to history
    const saveToHistory = (query) => {
        if (!query.trim()) return;

        const newHistory = [query, ...searchHistory.filter((h) => h !== query)].slice(0, 10);
        setSearchHistory(newHistory);
        localStorage.setItem('pawscord-search-history', JSON.stringify(newHistory));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        saveToHistory(searchQuery);
    };

    const handleSelectMessage = (msg) => {
        onSelectMessage(msg);
        onClose();
    };

    const clearFilters = useCallback(() => {
        setFilters({
            user: '',
            dateFrom: '',
            dateTo: '',
            fileType: '',
            hasReaction: false,
            hasMention: false,
            hasFile: false,
            hasImage: false,
        });
    }, []);

    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleSearchQueryChange = useCallback((e) => setSearchQuery(e.target.value), []);
    const handleClearSearch = useCallback(() => setSearchQuery(''), []);
    const handleToggleFilters = useCallback(() => setShowFilters((prev) => !prev), []);
    const handleUserFilter = useCallback(
        (e) => setFilters((prev) => ({ ...prev, user: e.target.value })),
        []
    );
    const handleDateFromFilter = useCallback(
        (e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value })),
        []
    );
    const handleDateToFilter = useCallback(
        (e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value })),
        []
    );
    const handleHasFileFilter = useCallback(
        (e) => setFilters((prev) => ({ ...prev, hasFile: e.target.checked })),
        []
    );
    const handleHasImageFilter = useCallback(
        (e) => setFilters((prev) => ({ ...prev, hasImage: e.target.checked })),
        []
    );
    const handleHasReactionFilter = useCallback(
        (e) => setFilters((prev) => ({ ...prev, hasReaction: e.target.checked })),
        []
    );

    return (
        <div
            className="advanced-search-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="advanced-search-panel"
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* Header */}
                <div className="search-header">
                    <h2>🔍 {t('search.advancedSearch')}</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Search Input */}
                <form onSubmit={handleSearch} className="search-form">
                    <FaSearch className="search-icon" />
                    {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                    <input
                        type="text"
                        placeholder={t('search.searchMessages')}
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        className="search-input"
                        autoFocus
                        aria-label={t('search.searchMessages')}
                    />
                    {searchQuery && (
                        <button
                            aria-label={t('search.clearSearch', 'Clear search')}
                            type="button"
                            className="clear-btn"
                            onClick={handleClearSearch}
                        >
                            <FaTimes />
                        </button>
                    )}
                </form>

                {/* Filter Toggle */}
                <div className="filter-toggle">
                    <button
                        aria-label={t('search.toggleFilters', 'Toggle filters')}
                        className={`filter-btn ${showFilters ? 'active' : ''}`}
                        onClick={handleToggleFilters}
                    >
                        <FaFilter /> {t('search.filter')}
                    </button>
                    {Object.values(filters).some((f) => f) && (
                        <button
                            aria-label={t('search.clearFilters', 'Clear filters')}
                            className="clear-filters-btn"
                            onClick={clearFilters}
                        >
                            {t('search.clearFilters')}
                        </button>
                    )}
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="filters-panel">
                        <div className="filter-row">
                            <label>
                                <FaUser /> {t('search.userLabel')}:
                                <select
                                    value={filters.user}
                                    onChange={handleUserFilter}
                                    aria-label={t('search.userFilter', 'Filter by user')}
                                >
                                    <option value="">{t('search.all')}</option>
                                    {[...new Set(messages.map((m) => m.username))].map((user) => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <FaCalendar /> {t('search.dateFrom')}:
                                <input
                                    type="date"
                                    value={filters.dateFrom}
                                    onChange={handleDateFromFilter}
                                    aria-label={t('search.dateFrom', 'From date')}
                                />
                            </label>
                        </div>

                        <div className="filter-row checkboxes">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters.hasFile}
                                    onChange={handleHasFileFilter}
                                    aria-label={t('search.hasFiles', 'Has files filter')} />
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters.hasImage}
                                    onChange={handleHasImageFilter}
                                    aria-label={t('search.hasImages', 'Has images filter')} />
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters.hasReaction}
                                    onChange={handleHasReactionFilter}
                                    aria-label={t('search.hasReactions', 'Has reactions filter')} />
                            </label>
                        </div>
                    </div>
                )}

                {/* Search History */}
                {!searchQuery && searchHistory.length > 0 && (
                    <div className="search-history">
                        <h4>{t('search.recentSearches')}:</h4>
                        <div className="history-items">
                            {searchHistory.map((query, index) => (
                                <button
                                    aria-label={query}
                                    key={`item-${index}`}
                                    className="history-item"
                                    onClick={() => setSearchQuery(query)}
                                >
                                    <FaSearch /> {query}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results */}
                <div className="search-results">
                    {searchQuery || Object.values(filters).some((f) => f) ? (
                        <>
                            <div className="results-header">
                                {searchResults.length} {t('search.resultsFound')}
                            </div>
                            {searchResults.length > 0 ? (
                                <div className="results-list">
                                    {searchResults.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className="result-item"
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => handleSelectMessage(msg)}
                                            onKeyDown={(e) =>
                                                (e.key === 'Enter' || e.key === ' ') &&
                                                e.currentTarget.click()
                                            }
                                        >
                                            <div className="result-user">{msg.username}</div>
                                            <div className="result-content">
                                                {msg.content?.substring(0, 200)}
                                                {msg.content?.length > 200 && '...'}
                                            </div>
                                            <div className="result-meta">
                                                <span className="result-date">
                                                    {new Date(
                                                        msg.timestamp || msg.created_at
                                                    ).toLocaleString('tr-TR')}
                                                </span>
                                                {msg.image_url && (
                                                    <span className="result-badge">🖼️</span>
                                                )}
                                                {msg.file_url && (
                                                    <span className="result-badge">📎</span>
                                                )}
                                                {msg.reactions?.length > 0 && (
                                                    <span className="result-badge">
                                                        ❤️ {msg.reactions.length}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-results">
                                    <FaSearch size={48} />
                                    <p>{t('search.noResults')}</p>
                                    <small>{t('search.tryDifferent')}</small>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="search-placeholder">
                            <FaSearch size={64} />
                            <h3>{t('search.searchInMessages')}</h3>
                            <p>{t('search.searchDescription')}</p>
                            <div className="shortcut-hint">
                                <kbd>Ctrl</kbd> + <kbd>F</kbd>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

AdvancedSearch.propTypes = {
    fetchWithAuth: PropTypes.func.isRequired,
    apiBaseUrl: PropTypes.string.isRequired,
    serverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func.isRequired,
    onMessageClick: PropTypes.func,
};
export default AdvancedSearch;
