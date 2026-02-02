import React, { useState, useEffect } from 'react';
import { FaTimes, FaSearch, FaFilter, FaCalendar, FaUser, FaFile } from 'react-icons/fa';
import { toast } from '../utils/toast';

const AdvancedSearchPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId, roomSlug }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        author: '',
        dateFrom: '',
        dateTo: '',
        hasImage: false,
        hasVideo: false,
        hasLink: false,
        hasEmbed: false,
    });

    const search = async () => {
        if (!query.trim()) {
            toast.error('Please enter a search query');
            return;
        }

        setLoading(true);
        try {
            const params = new URLSearchParams({
                q: query,
                server_id: serverId || '',
                room_slug: roomSlug || '',
                author: filters.author || '',
                date_from: filters.dateFrom || '',
                date_to: filters.dateTo || '',
                has_image: filters.hasImage || '',
                has_video: filters.hasVideo || '',
                has_link: filters.hasLink || '',
                has_embed: filters.hasEmbed || '',
            });

            const response = await fetchWithAuth(`${apiBaseUrl}/api/search/advanced/?${params}`);
            const data = await response.json();
            setResults(data.results || []);
            toast.success(`Found ${data.results?.length || 0} results`);
        } catch (error) {
            toast.error('Search failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaSearch style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Advanced Search</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.searchBar}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && search()}
                        placeholder="Search messages..."
                        style={styles.searchInput}
                    />
                    <button onClick={search} style={styles.searchButton} disabled={loading}>
                        <FaSearch /> {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>

                <div style={styles.filtersSection}>
                    <div style={styles.filterHeader}>
                        <FaFilter style={{ marginRight: '8px' }} />
                        Filters
                    </div>

                    <div style={styles.filtersGrid}>
                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}>
                                <FaUser style={{ marginRight: '6px' }} />
                                Author
                            </label>
                            <input
                                type="text"
                                value={filters.author}
                                onChange={(e) => setFilters({ ...filters, author: e.target.value })}
                                placeholder="Username"
                                style={styles.filterInput}
                            />
                        </div>

                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}>
                                <FaCalendar style={{ marginRight: '6px' }} />
                                Date From
                            </label>
                            <input
                                type="date"
                                value={filters.dateFrom}
                                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                                style={styles.filterInput}
                            />
                        </div>

                        <div style={styles.filterGroup}>
                            <label style={styles.filterLabel}>
                                <FaCalendar style={{ marginRight: '6px' }} />
                                Date To
                            </label>
                            <input
                                type="date"
                                value={filters.dateTo}
                                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                                style={styles.filterInput}
                            />
                        </div>
                    </div>

                    <div style={styles.checkboxGrid}>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={filters.hasImage}
                                onChange={(e) => setFilters({ ...filters, hasImage: e.target.checked })}
                            />
                            Has Image
                        </label>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={filters.hasVideo}
                                onChange={(e) => setFilters({ ...filters, hasVideo: e.target.checked })}
                            />
                            Has Video
                        </label>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={filters.hasLink}
                                onChange={(e) => setFilters({ ...filters, hasLink: e.target.checked })}
                            />
                            Has Link
                        </label>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={filters.hasEmbed}
                                onChange={(e) => setFilters({ ...filters, hasEmbed: e.target.checked })}
                            />
                            Has Embed
                        </label>
                    </div>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Searching...</div>
                    ) : results.length === 0 ? (
                        <div style={styles.empty}>
                            {query ? 'No results found' : 'Enter a query and press search'}
                        </div>
                    ) : (
                        <div style={styles.resultsList}>
                            {results.map((result, idx) => (
                                <div key={idx} style={styles.resultCard}>
                                    <div style={styles.resultHeader}>
                                        <span style={styles.resultAuthor}>{result.author_username}</span>
                                        <span style={styles.resultDate}>
                                            {new Date(result.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                    <div style={styles.resultContent}>{result.content}</div>
                                    {result.room_name && (
                                        <div style={styles.resultMeta}>
                                            #{result.room_name}
                                        </div>
                                    )}
                                    {(result.has_image || result.has_video || result.has_link) && (
                                        <div style={styles.resultAttachments}>
                                            {result.has_image && <span style={styles.badge}>📷 Image</span>}
                                            {result.has_video && <span style={styles.badge}>🎥 Video</span>}
                                            {result.has_link && <span style={styles.badge}>🔗 Link</span>}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    searchBar: {
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
        display: 'flex',
        gap: '12px',
    },
    searchInput: {
        flex: 1,
        padding: '12px',
        backgroundColor: '#2c2f33',
        border: '1px solid #2c2f33',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '14px',
    },
    searchButton: {
        padding: '12px 24px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    filtersSection: {
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
        backgroundColor: '#2c2f33',
    },
    filterHeader: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
    },
    filtersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '16px',
    },
    filterGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    filterLabel: {
        fontSize: '13px',
        color: '#dcddde',
        display: 'flex',
        alignItems: 'center',
    },
    filterInput: {
        padding: '8px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #1e1e1e',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '13px',
    },
    checkboxGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '12px',
    },
    checkbox: {
        fontSize: '13px',
        color: '#dcddde',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    resultsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    resultCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
    },
    resultHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
    },
    resultAuthor: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#5865f2',
    },
    resultDate: {
        fontSize: '12px',
        color: '#99aab5',
    },
    resultContent: {
        fontSize: '14px',
        color: '#dcddde',
        marginBottom: '8px',
        lineHeight: '1.5',
    },
    resultMeta: {
        fontSize: '12px',
        color: '#99aab5',
        marginBottom: '8px',
    },
    resultAttachments: {
        display: 'flex',
        gap: '8px',
    },
    badge: {
        fontSize: '11px',
        padding: '4px 8px',
        backgroundColor: '#5865f2',
        borderRadius: '4px',
        color: '#ffffff',
    },
};

export default AdvancedSearchPanel;
