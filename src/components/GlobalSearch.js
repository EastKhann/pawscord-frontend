// frontend/src/components/GlobalSearch.js

/**
 * 🔍 Global Search Component
 * Ctrl+K / Cmd+K keyboard shortcut
 * Search messages, users, channels
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import FaSearch from 'react-icons/fa/FaSearch';
import FaTimes from 'react-icons/fa/FaTimes';
import FaHashtag from 'react-icons/fa/FaHashtag';
import FaUser from 'react-icons/fa/FaUser';
import FaComment from 'react-icons/fa/FaComment';
import FaCalendar from 'react-icons/fa/FaCalendar';

const GlobalSearch = ({ isOpen, onClose, onNavigate, apiBaseUrl, fetchWithAuth }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filter, setFilter] = useState('all'); // all, messages, users, channels
    const inputRef = useRef(null);
    const searchTimeout = useRef(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % results.length);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (results[selectedIndex]) {
                        handleSelect(results[selectedIndex]);
                    }
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex]);

    // Debounced search
    const performSearch = useCallback(async (searchQuery, searchFilter) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);

        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/search/?q=${encodeURIComponent(searchQuery)}&filter=${searchFilter}`
            );

            if (response.ok) {
                const data = await response.json();
                setResults(data.results || []);
            }
        } catch (error) {
            console.error('Search failed:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, [apiBaseUrl, fetchWithAuth]);

    // Handle query change with debounce
    useEffect(() => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            performSearch(query, filter);
        }, 300);

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, [query, filter, performSearch]);

    const handleSelect = (result) => {
        onNavigate(result);
        onClose();
        setQuery('');
        setResults([]);
    };

    const getResultIcon = (type) => {
        switch (type) {
            case 'message':
                return <FaComment />;
            case 'user':
                return <FaUser />;
            case 'channel':
                return <FaHashtag />;
            default:
                return <FaSearch />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Az önce';
        if (diffMins < 60) return `${diffMins} dakika önce`;
        if (diffHours < 24) return `${diffHours} saat önce`;
        if (diffDays < 7) return `${diffDays} gün önce`;
        return date.toLocaleDateString('tr-TR');
    };

    // 🚀 PERFORMANCE: Filtered results with useMemo
    const filteredResults = useMemo(() => {
        if (filter === 'all') return results;
        return results.filter(r => r.type === filter.slice(0, -1)); // 'messages' -> 'message'
    }, [results, filter]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div style={styles.backdrop} onClick={onClose} />

            {/* Search Modal */}
            <div style={styles.modal}>
                {/* Search Input */}
                <div style={styles.searchContainer}>
                    <FaSearch style={styles.searchIcon} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Mesaj, kullanıcı veya kanal ara... (Ctrl+K)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                    {query && (
                        <button onClick={() => setQuery('')} style={styles.clearButton}>
                            <FaTimes />
                        </button>
                    )}
                </div>

                {/* Filter Tabs */}
                <div style={styles.filterTabs}>
                    {['all', 'messages', 'users', 'channels'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                ...styles.filterTab,
                                ...(filter === f && styles.filterTabActive)
                            }}
                        >
                            {f === 'all' ? 'Tümü' :
                                f === 'messages' ? 'Mesajlar' :
                                    f === 'users' ? 'Kullanıcılar' : 'Kanallar'}
                        </button>
                    ))}
                </div>

                {/* Results */}
                <div style={styles.resultsContainer}>
                    {loading ? (
                        <div style={styles.loadingState}>
                            <div style={styles.spinner} />
                            <span>Aranıyor...</span>
                        </div>
                    ) : filteredResults.length === 0 ? (
                        <div style={styles.emptyState}>
                            {query ? (
                                <>
                                    <FaSearch style={styles.emptyIcon} />
                                    <p>Sonuç bulunamadı</p>
                                </>
                            ) : (
                                <>
                                    <FaSearch style={styles.emptyIcon} />
                                    <p>Aramaya başlamak için yazmaya başlayın</p>
                                    <div style={styles.tips}>
                                        <p><strong>İpuçları:</strong></p>
                                        <p>• Kullanıcı ara: @kullaniciadi</p>
                                        <p>• Kanal ara: #kanal</p>
                                        <p>• Tarih filtresi: tarih:2026-01-13</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        filteredResults.map((result, index) => (
                            <div
                                key={result.id}
                                onClick={() => handleSelect(result)}
                                style={{
                                    ...styles.resultItem,
                                    ...(index === selectedIndex && styles.resultItemSelected)
                                }}
                            >
                                <div style={styles.resultIcon}>
                                    {getResultIcon(result.type)}
                                </div>
                                <div style={styles.resultContent}>
                                    <div style={styles.resultTitle}>
                                        {result.type === 'message' && (
                                            <>
                                                <span style={styles.resultUser}>{result.username}</span>
                                                <span style={styles.resultChannel}>#{result.channel}</span>
                                            </>
                                        )}
                                        {result.type === 'user' && (
                                            <span style={styles.resultUser}>{result.username}</span>
                                        )}
                                        {result.type === 'channel' && (
                                            <span style={styles.resultChannel}>#{result.name}</span>
                                        )}
                                    </div>
                                    <div style={styles.resultDescription}>
                                        {result.content || result.description}
                                    </div>
                                    {result.created_at && (
                                        <div style={styles.resultDate}>
                                            <FaCalendar style={{ fontSize: '10px' }} />
                                            {formatDate(result.created_at)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Keyboard Hints */}
                <div style={styles.footer}>
                    <span style={styles.hint}>↑↓ Hareket</span>
                    <span style={styles.hint}>Enter Seç</span>
                    <span style={styles.hint}>Esc Kapat</span>
                </div>
            </div>
        </>
    );
};

const styles = {
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999,
        backdropFilter: 'blur(4px)'
    },
    modal: {
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '640px',
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        zIndex: 10000,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh'
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid #1e1f22',
        gap: '12px'
    },
    searchIcon: {
        color: '#b9bbbe',
        fontSize: '18px'
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '16px',
        outline: 'none'
    },
    clearButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px'
    },
    filterTabs: {
        display: 'flex',
        gap: '8px',
        padding: '12px 16px',
        borderBottom: '1px solid #1e1f22',
        overflowX: 'auto'
    },
    filterTab: {
        padding: '6px 12px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '13px',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap'
    },
    filterTabActive: {
        backgroundColor: '#5865f2',
        color: '#fff'
    },
    resultsContainer: {
        flex: 1,
        overflowY: 'auto',
        padding: '8px'
    },
    resultItem: {
        display: 'flex',
        gap: '12px',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        color: '#dcddde'
    },
    resultItemSelected: {
        backgroundColor: '#404249'
    },
    resultIcon: {
        color: '#b9bbbe',
        fontSize: '16px',
        marginTop: '2px'
    },
    resultContent: {
        flex: 1,
        minWidth: 0
    },
    resultTitle: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        marginBottom: '4px',
        flexWrap: 'wrap'
    },
    resultUser: {
        fontWeight: 'bold',
        color: '#fff'
    },
    resultChannel: {
        color: '#b9bbbe',
        fontSize: '13px'
    },
    resultDescription: {
        fontSize: '13px',
        color: '#b9bbbe',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    resultDate: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        color: '#72767d',
        marginTop: '4px'
    },
    loadingState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        color: '#b9bbbe',
        gap: '12px'
    },
    spinner: {
        width: '32px',
        height: '32px',
        border: '3px solid #404249',
        borderTop: '3px solid #5865f2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        color: '#b9bbbe',
        textAlign: 'center'
    },
    emptyIcon: {
        fontSize: '48px',
        marginBottom: '16px',
        opacity: 0.5
    },
    tips: {
        marginTop: '24px',
        textAlign: 'left',
        fontSize: '13px',
        color: '#72767d',
        padding: '16px',
        backgroundColor: '#1e1f22',
        borderRadius: '4px'
    },
    footer: {
        display: 'flex',
        gap: '16px',
        padding: '12px 16px',
        borderTop: '1px solid #1e1f22',
        fontSize: '12px',
        color: '#72767d',
        justifyContent: 'center'
    },
    hint: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    }
};

// Add spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default React.memo(GlobalSearch);


