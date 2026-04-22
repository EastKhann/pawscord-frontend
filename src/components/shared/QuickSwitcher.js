// components/QuickSwitcher.js
// ⚡ Quick Switcher - Ctrl+K Feature

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaTimes, FaHashtag, FaAt, FaHistory } from 'react-icons/fa';
import './QuickSwitcher.css';

const RECENT_KEY = 'pawscord_recent_searches';
const MAX_RECENT = 10;

function loadRecentSearches() {
    try {
        return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveRecentSearch(item) {
    try {
        const existing = loadRecentSearches().filter(
            (r) => !(r.type === item.type && (r.id || r.username) === (item.id || item.username))
        );
        const updated = [item, ...existing].slice(0, MAX_RECENT);
        localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    } catch {
        /* ignore */
    }
}

const QuickSwitcher = ({ onClose, onNavigate, channels = [], users = [], conversations = [] }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [recentSearches, setRecentSearches] = useState(loadRecentSearches);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Fuzzy search
    const fuzzyMatch = (text, query) => {
        if (!text || !query) return false;
        text = text.toLowerCase();
        query = query.toLowerCase();

        if (text.includes(query)) return true;

        let queryIndex = 0;
        for (let i = 0; i < text.length && queryIndex < query.length; i++) {
            if (text[i] === query[queryIndex]) {
                queryIndex++;
            }
        }
        return queryIndex === query.length;
    };

    // Grouped results: { channels, users, dms }
    const grouped = useMemo(() => {
        if (!query.trim()) return null;

        return {
            channels: channels
                .filter((c) => fuzzyMatch(c.name, query))
                .slice(0, 5)
                .map((c) => ({ type: 'channel', ...c })),
            users: users
                .filter((u) => fuzzyMatch(u.username, query))
                .slice(0, 5)
                .map((u) => ({ type: 'user', ...u })),
            dms: conversations
                .filter((c) => fuzzyMatch(c.target_user, query))
                .slice(0, 5)
                .map((c) => ({ type: 'dm', ...c })),
        };
    }, [query, channels, users, conversations]);

    // Flat list for keyboard navigation
    const results = useMemo(() => {
        if (!grouped) return recentSearches;
        return [...grouped.channels, ...grouped.users, ...grouped.dms];
    }, [grouped, recentSearches]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            e.preventDefault();
            handleSelect(results[selectedIndex]);
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    const handleSelect = useCallback((item) => {
        saveRecentSearch(item);
        setRecentSearches(loadRecentSearches());
        onNavigate(item);
        onClose();
    }, [onNavigate, onClose]);

    const clearRecent = useCallback(() => {
        localStorage.removeItem(RECENT_KEY);
        setRecentSearches([]);
    }, []);

    const renderItem = (item, index) => (
        <div
            key={`${item.type}-${item.id || item.username}`}
            className={`quick-result-item ${index === selectedIndex ? 'selected' : ''}`}
            role="option"
            aria-selected={index === selectedIndex}
            tabIndex={0}
            onClick={() => handleSelect(item)}
            onMouseEnter={() => setSelectedIndex(index)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelect(item)}
        >
            <div className="result-icon">
                {item.type === 'channel' && <FaHashtag />}
                {(item.type === 'user' || item.type === 'dm') && <FaAt />}
            </div>
            <div className="result-content">
                <div className="result-name">
                    {item.type === 'channel' && item.name}
                    {item.type === 'user' && item.username}
                    {item.type === 'dm' && item.target_user}
                </div>
                <div className="result-type">
                    {item.type === 'channel' && t('search.channel')}
                    {item.type === 'user' && t('search.user')}
                    {item.type === 'dm' && t('search.directMessage')}
                </div>
            </div>
        </div>
    );

    const hasResults = grouped
        ? grouped.channels.length + grouped.users.length + grouped.dms.length > 0
        : recentSearches.length > 0;

    return (
        <div
            className="quick-switcher-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="quick-switcher-panel"
                role="listbox"
                aria-label={t('ui.channel_or_kullanici_search_ctrlk')}
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <div className="quick-switcher-search">
                    <FaSearch className="search-icon" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={t('ui.channel_or_kullanici_search_ctrlk')}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                        className="search-input"
                        aria-autocomplete="list"
                        aria-controls="quick-switcher-results"
                    />
                    {query && (
                        <button
                            aria-label={t('quickSwitcher.clear', 'Clear search')}
                            className="clear-btn"
                            onClick={() => { setQuery(''); setSelectedIndex(0); }}
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>

                <div className="quick-switcher-results" id="quick-switcher-results" role="group">
                    {!query.trim() && recentSearches.length > 0 && (
                        <>
                            <div className="result-group-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span><FaHistory style={{ marginRight: 6, fontSize: '11px' }} />{t('search.recent', 'Recent')}</span>
                                <button
                                    onClick={clearRecent}
                                    style={{ background: 'none', border: 'none', color: '#949ba4', cursor: 'pointer', fontSize: '11px' }}
                                    aria-label={t('search.clearRecent', 'Clear recent')}
                                >
                                    {t('search.clear', 'Clear')}
                                </button>
                            </div>
                            {recentSearches.map((item, i) => renderItem(item, i))}
                        </>
                    )}

                    {query.trim() && grouped && (
                        <>
                            {grouped.channels.length > 0 && (
                                <>
                                    <div className="result-group-header">
                                        <FaHashtag style={{ marginRight: 6, fontSize: '11px' }} />
                                        {t('search.channels', 'Channels')}
                                    </div>
                                    {grouped.channels.map((item, i) => renderItem(item, i))}
                                </>
                            )}
                            {grouped.users.length > 0 && (
                                <>
                                    <div className="result-group-header">
                                        <FaAt style={{ marginRight: 6, fontSize: '11px' }} />
                                        {t('search.users', 'Users')}
                                    </div>
                                    {grouped.users.map((item, i) =>
                                        renderItem(item, grouped.channels.length + i)
                                    )}
                                </>
                            )}
                            {grouped.dms.length > 0 && (
                                <>
                                    <div className="result-group-header">
                                        <FaAt style={{ marginRight: 6, fontSize: '11px' }} />
                                        {t('search.directMessages', 'DMs')}
                                    </div>
                                    {grouped.dms.map((item, i) =>
                                        renderItem(item, grouped.channels.length + grouped.users.length + i)
                                    )}
                                </>
                            )}
                            {!hasResults && (
                                <div className="no-results">
                                    <FaSearch size={32} />
                                    <p>{t('search.noResults')}</p>
                                </div>
                            )}
                        </>
                    )}

                    {!query.trim() && recentSearches.length === 0 && (
                        <div className="no-results">
                            <FaSearch size={32} />
                            <p>{t('search.typeToSearch', 'Type to search channels and users')}</p>
                        </div>
                    )}
                </div>

                <div className="quick-switcher-footer">
                    <div className="shortcut-hints">
                        <span>
                            <kbd>↑↓</kbd> {t('search.navigate')}
                        </span>
                        <span>
                            <kbd>Enter</kbd> {t('search.select')}
                        </span>
                        <span>
                            <kbd>Esc</kbd> {t('search.close')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

QuickSwitcher.propTypes = {
    onClose: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
    channels: PropTypes.array,
    users: PropTypes.array,
    conversations: PropTypes.array,
};
export default React.memo(QuickSwitcher);
