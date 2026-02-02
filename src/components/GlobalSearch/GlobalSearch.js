// frontend/src/components/GlobalSearch/GlobalSearch.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './GlobalSearch.css';
import { getApiBase } from '../../utils/apiEndpoints';

/**
 * 🔍 Global Search Component
 * Search across messages, users, servers, and channels
 * Keyboard shortcut: Ctrl+Shift+F
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || getApiBase();

const GlobalSearch = ({
    isOpen,
    onClose,
    token,
    onResultClick,
    currentServerId
}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        messages: [],
        users: [],
        servers: [],
        channels: []
    });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [filters, setFilters] = useState({
        from: '',
        in: '',
        has: '', // link, image, file, embed
        before: '',
        after: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const inputRef = useRef(null);
    const searchTimeout = useRef(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Debounced search
    const performSearch = useCallback(async (searchQuery) => {
        if (!searchQuery || searchQuery.length < 2) {
            setResults({ messages: [], users: [], servers: [], channels: [] });
            return;
        }

        setLoading(true);

        try {
            const params = new URLSearchParams({
                q: searchQuery,
                ...(filters.from && { from: filters.from }),
                ...(filters.in && { in: filters.in }),
                ...(filters.has && { has: filters.has }),
                ...(filters.before && { before: filters.before }),
                ...(filters.after && { after: filters.after }),
                ...(currentServerId && { server_id: currentServerId })
            });

            const response = await fetch(`${API_BASE_URL}/search/global/?${params}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data);
            }
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    }, [token, filters, currentServerId]);

    // Handle query change with debounce
    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            performSearch(query);
        }, 300);

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, [query, performSearch]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const tabs = [
        { id: 'all', label: 'All', icon: '🔍' },
        { id: 'messages', label: 'Messages', icon: '💬' },
        { id: 'users', label: 'Users', icon: '👤' },
        { id: 'servers', label: 'Servers', icon: '🏠' },
        { id: 'channels', label: 'Channels', icon: '#️⃣' }
    ];

    const getFilteredResults = () => {
        if (activeTab === 'all') {
            return [
                ...results.messages.slice(0, 5).map(r => ({ ...r, type: 'message' })),
                ...results.users.slice(0, 3).map(r => ({ ...r, type: 'user' })),
                ...results.servers.slice(0, 3).map(r => ({ ...r, type: 'server' })),
                ...results.channels.slice(0, 3).map(r => ({ ...r, type: 'channel' }))
            ];
        }
        return (results[activeTab] || []).map(r => ({ ...r, type: activeTab.slice(0, -1) }));
    };

    const highlightMatch = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? <mark key={i}>{part}</mark> : part
        );
    };

    const handleResultClick = (result) => {
        onResultClick?.(result);
        onClose();
    };

    if (!isOpen) return null;

    const filteredResults = getFilteredResults();

    return (
        <div className="global-search-overlay" onClick={onClose}>
            <div className="global-search-modal" onClick={e => e.stopPropagation()}>
                {/* Search Header */}
                <div className="search-header">
                    <div className="search-input-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search messages, users, servers..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            autoFocus
                        />
                        {loading && <span className="search-loading">⏳</span>}
                        <button
                            className="filter-toggle"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            🎛️ Filters
                        </button>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="search-filters">
                            <div className="filter-row">
                                <label>
                                    <span>From:</span>
                                    <input
                                        type="text"
                                        placeholder="username"
                                        value={filters.from}
                                        onChange={e => setFilters({ ...filters, from: e.target.value })}
                                    />
                                </label>
                                <label>
                                    <span>In:</span>
                                    <input
                                        type="text"
                                        placeholder="channel"
                                        value={filters.in}
                                        onChange={e => setFilters({ ...filters, in: e.target.value })}
                                    />
                                </label>
                                <label>
                                    <span>Has:</span>
                                    <select
                                        value={filters.has}
                                        onChange={e => setFilters({ ...filters, has: e.target.value })}
                                    >
                                        <option value="">Any</option>
                                        <option value="link">Link</option>
                                        <option value="image">Image</option>
                                        <option value="file">File</option>
                                        <option value="embed">Embed</option>
                                    </select>
                                </label>
                            </div>
                            <div className="filter-row">
                                <label>
                                    <span>Before:</span>
                                    <input
                                        type="date"
                                        value={filters.before}
                                        onChange={e => setFilters({ ...filters, before: e.target.value })}
                                    />
                                </label>
                                <label>
                                    <span>After:</span>
                                    <input
                                        type="date"
                                        value={filters.after}
                                        onChange={e => setFilters({ ...filters, after: e.target.value })}
                                    />
                                </label>
                                <button
                                    className="clear-filters"
                                    onClick={() => setFilters({ from: '', in: '', has: '', before: '', after: '' })}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="search-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`search-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon} {tab.label}
                            {tab.id !== 'all' && results[tab.id]?.length > 0 && (
                                <span className="tab-count">{results[tab.id].length}</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Results */}
                <div className="search-results">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((result, index) => (
                            <div
                                key={`${result.type}-${result.id || index}`}
                                className={`search-result ${result.type}`}
                                onClick={() => handleResultClick(result)}
                            >
                                {result.type === 'message' && (
                                    <>
                                        <img
                                            src={result.author?.avatar || '/default-avatar.png'}
                                            alt=""
                                            className="result-avatar"
                                        />
                                        <div className="result-content">
                                            <div className="result-header">
                                                <span className="result-author">{result.author?.username}</span>
                                                <span className="result-meta">
                                                    in #{result.channel?.name} • {new Date(result.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="result-text">
                                                {highlightMatch(result.content?.substring(0, 200), query)}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {result.type === 'user' && (
                                    <>
                                        <img
                                            src={result.avatar || '/default-avatar.png'}
                                            alt=""
                                            className="result-avatar"
                                        />
                                        <div className="result-content">
                                            <span className="result-name">{highlightMatch(result.username, query)}</span>
                                            {result.discriminator && (
                                                <span className="result-tag">#{result.discriminator}</span>
                                            )}
                                        </div>
                                        <span className="result-type-badge">User</span>
                                    </>
                                )}

                                {result.type === 'server' && (
                                    <>
                                        <img
                                            src={result.icon || '/default-server.png'}
                                            alt=""
                                            className="result-avatar server-icon"
                                        />
                                        <div className="result-content">
                                            <span className="result-name">{highlightMatch(result.name, query)}</span>
                                            <span className="result-meta">{result.member_count} members</span>
                                        </div>
                                        <span className="result-type-badge">Server</span>
                                    </>
                                )}

                                {result.type === 'channel' && (
                                    <>
                                        <span className="channel-icon">#</span>
                                        <div className="result-content">
                                            <span className="result-name">{highlightMatch(result.name, query)}</span>
                                            <span className="result-meta">in {result.server?.name}</span>
                                        </div>
                                        <span className="result-type-badge">Channel</span>
                                    </>
                                )}
                            </div>
                        ))
                    ) : query.length >= 2 && !loading ? (
                        <div className="no-results">
                            <span className="no-results-icon">🔍</span>
                            <p>No results found for "{query}"</p>
                            <p className="no-results-hint">Try different keywords or filters</p>
                        </div>
                    ) : query.length < 2 ? (
                        <div className="search-tips">
                            <h4>🔍 Search Tips</h4>
                            <ul>
                                <li><code>from:username</code> - Messages from a user</li>
                                <li><code>in:channel</code> - Messages in a channel</li>
                                <li><code>has:link</code> - Messages with links</li>
                                <li><code>before:2024-01-01</code> - Before a date</li>
                                <li><code>after:2024-01-01</code> - After a date</li>
                            </ul>
                        </div>
                    ) : null}
                </div>

                {/* Footer */}
                <div className="search-footer">
                    <span>↑↓ Navigate</span>
                    <span>↵ Jump to</span>
                    <span>ESC Close</span>
                </div>
            </div>
        </div>
    );
};

export default GlobalSearch;
