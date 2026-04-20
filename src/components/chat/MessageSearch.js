/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/MessageSearch.js
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const MessageSearch = ({ messages, onResultClick, onClose }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({
        from: '',
        has: [], // file, image, video, link
        during: 'all', // today, week, month, all
    });
    const [showFilters, setShowFilters] = useState(false);
    const inputRef = useRef(null);
    const filterButtonStyle = {
        ...styles.filterButton,
        ...(showFilters ? styles.filterButtonActive : {}),
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (searchQuery.length > 0) {
            performSearch();
        } else {
            setResults([]);
        }
    }, [searchQuery, filters]);

    const performSearch = () => {
        let filtered = messages.filter((msg) => {
            // Text search
            const matchesText = msg.content?.toLowerCase().includes(searchQuery.toLowerCase());

            // From filter
            const matchesFrom =
                !filters.from || msg.author?.toLowerCase().includes(filters.from.toLowerCase());

            // Has filter
            const matchesHas =
                filters.has.length === 0 ||
                filters.has.some((type) => {
                    if (type === 'file' && msg.file_url) return true;
                    if (type === 'image' && msg.file_url?.match(/\.(jpg|jpeg|png|gif|webp)/i))
                        return true;
                    if (type === 'video' && msg.file_url?.match(/\.(mp4|webm|mov)/i)) return true;
                    if (type === 'link' && msg.content?.includes('http')) return true;
                    return false;
                });

            // During filter
            const matchesDuring = (() => {
                if (filters.during === 'all') return true;

                const msgDate = new Date(msg.created_at || msg.timestamp);
                const now = new Date();
                const diffDays = (now - msgDate) / (1000 * 60 * 60 * 24);

                if (filters.during === 'today') return diffDays < 1;
                if (filters.during === 'week') return diffDays < 7;
                if (filters.during === 'month') return diffDays < 30;

                return true;
            })();

            return matchesText && matchesFrom && matchesHas && matchesDuring;
        });

        setResults(filtered.slice(0, 50)); // Limit to 50 results
    };

    const toggleHasFilter = (type) => {
        setFilters((prev) => ({
            ...prev,
            has: prev.has.includes(type) ? prev.has.filter((t) => t !== type) : [...prev.has, type],
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} ${t('search.minutesAgo')}`;
        if (diffHours < 24) return `${diffHours} ${t('search.hoursAgo')}`;
        if (diffDays < 7) return `${diffDays} ${t('search.daysAgo')}`;

        return date.toLocaleDateString('tr-TR');
    };

    const highlightText = (text, query) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <mark key={`item-${i}`} style={styles.highlight}>
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.searchBar}>
                    <FaSearch style={styles.searchIcon} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={t('search.placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                    {searchQuery && (
                        <button
                            aria-label="Close"
                            onClick={() => setSearchQuery('')}
                            style={styles.clearButton}
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
                <button
                    aria-label="Filter"
                    onClick={() => setShowFilters(!showFilters)}
                    style={filterButtonStyle}
                >
                    <FaFilter />
                </button>
                <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                    <FaTimes />
                </button>
            </div>

            {/* Filters */}
            {showFilters && (
                <div style={styles.filters}>
                    <div style={styles.filterGroup}>
                        <label style={styles.filterLabel}>{t('search.from')}:</label>
                        <input
                            type="text"
                            placeholder={t('search.usernamePlaceholder')}
                            value={filters.from}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, from: e.target.value }))
                            }
                            style={styles.filterInput}
                        />
                    </div>

                    <div style={styles.filterGroup}>
                        <label style={styles.filterLabel}>{t('search.contentType')}:</label>
                        <div style={styles.checkboxGroup}>
                            {['file', 'image', 'video', 'link'].map((type) => (
                                <label key={type} style={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={filters.has.includes(type)}
                                        onChange={() => toggleHasFilter(type)}
                                    />
                                    <span>
                                        {type === 'file'
                                            ? t('search.file')
                                            : type === 'image'
                                              ? t('search.image')
                                              : type === 'video'
                                                ? t('search.video')
                                                : t('search.link')}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={styles.filterGroup}>
                        <label style={styles.filterLabel}>{t('search.time')}:</label>
                        <select
                            value={filters.during}
                            onChange={(e) =>
                                setFilters((prev) => ({ ...prev, during: e.target.value }))
                            }
                            style={styles.filterSelect}
                        >
                            <option value="all">{t('search.allTime')}</option>
                            <option value="today">{t('search.today')}</option>
                            <option value="week">{t('search.lastWeek')}</option>
                            <option value="month">{t('search.lastMonth')}</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Results */}
            <div style={styles.results}>
                {searchQuery.length === 0 ? (
                    <div style={styles.emptyState}>
                        <FaSearch style={styles.emptyIcon} />
                        <p>{t('search.startTyping')}</p>
                    </div>
                ) : results.length === 0 ? (
                    <div style={styles.emptyState}>
                        <p>{t('search.noResults')}</p>
                    </div>
                ) : (
                    <>
                        <div style={styles.resultCount}>
                            {results.length} {t('search.resultsFound')}
                        </div>
                        {results.map((msg, index) => (
                            <div
                                key={`item-${index}`}
                                role="button"
                                tabIndex={0}
                                onClick={() => onResultClick(msg)}
                                style={styles.resultItem}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                            >
                                <div style={styles.resultHeader}>
                                    <strong>{msg.author}</strong>
                                    <span style={styles.resultDate}>
                                        {formatDate(msg.created_at || msg.timestamp)}
                                    </span>
                                </div>
                                <div style={styles.resultContent}>
                                    {highlightText(msg.content || '', searchQuery)}
                                </div>
                                {msg.file_url && (
                                    <div style={styles.resultAttachment}>
                                        📎 {t('search.hasAttachment')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#111214',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px',
        borderBottom: '1px solid #0b0e1b',
    },
    searchBar: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#0d0e10',
        borderRadius: '4px',
        padding: '8px 12px',
    },
    searchIcon: {
        color: '#b5bac1',
        fontSize: '16px',
    },
    searchInput: {
        flex: 1,
        background: 'none',
        border: 'none',
        color: '#dbdee1',
        fontSize: '14px',
        outline: 'none',
    },
    clearButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '4px',
    },
    filterButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '8px',
        borderRadius: '4px',
    },
    filterButtonActive: {
        color: '#5865f2',
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '8px',
    },
    filters: {
        padding: '16px',
        borderBottom: '1px solid #0b0e1b',
        backgroundColor: '#17191c',
    },
    filterGroup: {
        marginBottom: '12px',
    },
    filterLabel: {
        display: 'block',
        color: '#b5bac1',
        fontSize: '12px',
        fontWeight: 'bold',
        marginBottom: '6px',
        textTransform: 'uppercase',
    },
    filterInput: {
        width: '100%',
        padding: '8px',
        backgroundColor: '#0d0e10',
        border: 'none',
        borderRadius: '4px',
        color: '#dbdee1',
        fontSize: '14px',
    },
    filterSelect: {
        width: '100%',
        padding: '8px',
        backgroundColor: '#0d0e10',
        border: 'none',
        borderRadius: '4px',
        color: '#dbdee1',
        fontSize: '14px',
    },
    checkboxGroup: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#dbdee1',
        fontSize: '14px',
        cursor: 'pointer',
    },
    results: {
        flex: 1,
        overflowY: 'auto',
        padding: '12px',
    },
    resultCount: {
        color: '#b5bac1',
        fontSize: '12px',
        marginBottom: '12px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    resultItem: {
        padding: '12px',
        marginBottom: '8px',
        backgroundColor: '#17191c',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    resultHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
        color: '#fff',
        fontSize: '14px',
    },
    resultDate: {
        color: '#949ba4',
        fontSize: '12px',
    },
    resultContent: {
        color: '#dbdee1',
        fontSize: '14px',
        lineHeight: '1.4',
    },
    resultAttachment: {
        marginTop: '6px',
        color: '#00b0f4',
        fontSize: '12px',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#949ba4',
        textAlign: 'center',
    },
    emptyIcon: {
        fontSize: '48px',
        marginBottom: '16px',
        opacity: 0.5,
    },
    highlight: {
        backgroundColor: '#f0b232',
        color: '#000',
        padding: '2px 4px',
        borderRadius: '2px',
    },
};

MessageSearch.propTypes = {
    messages: PropTypes.array,
    onResultClick: PropTypes.func,
    onClose: PropTypes.func,
};
export default React.memo(MessageSearch);
