// frontend/src/components/ServerDiscovery.js
/**
 * 🔍 SERVER DISCOVERY - Public server discovery system
 */

import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaSearch, FaStar, FaCheckCircle, FaUsers, FaGlobe, FaFire } from 'react-icons/fa';

const ServerDiscovery = ({ fetchWithAuth, apiBaseUrl, onJoinServer }) => {
    const [servers, setServers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    const categories = [
        { id: 'all', name: 'Tümü', icon: '🌐' },
        { id: 'gaming', name: 'Oyun', icon: '🎮' },
        { id: 'music', name: 'Müzik', icon: '🎵' },
        { id: 'anime', name: 'Anime', icon: '🎌' },
        { id: 'tech', name: 'Teknoloji', icon: '💻' },
        { id: 'study', name: 'Eğitim', icon: '📚' },
        { id: 'creative', name: 'Yaratıcı', icon: '🎨' },
        { id: 'community', name: 'Topluluk', icon: '🌟' },
    ];

    useEffect(() => {
        loadServers();
    }, [selectedCategory, searchQuery]);

    const loadServers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (selectedCategory !== 'all') params.append('category', selectedCategory);
            if (searchQuery) params.append('search', searchQuery);

            const response = await fetchWithAuth(`${apiBaseUrl}/discovery/servers/?${params}`);
            const data = await response.json();
            setServers(data.servers || []);
        } catch (error) {
            console.error('Failed to load servers:', error);
        } finally {
            setLoading(false);
        }
    };

    const joinServer = async (serverId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/join/`, {
                method: 'POST'
            });

            if (response.ok) {
                toast.success('✅ Sunucuya katıldınız! 🎉');
                if (onJoinServer) onJoinServer(serverId);
            }
        } catch (error) {
            console.error('Failed to join server:', error);
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>🔍 Sunucu Keşfi</h1>
                <p style={styles.subtitle}>İlginizi çekebilecek toplulukları keşfedin</p>
            </div>

            {/* Search Bar */}
            <div style={styles.searchContainer}>
                <div style={styles.searchBar}>
                    <FaSearch style={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Sunucu ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>
            </div>

            {/* Category Filter */}
            <div style={styles.categories}>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={selectedCategory === cat.id ? styles.categoryButtonActive : styles.categoryButton}
                    >
                        <span style={styles.categoryIcon}>{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Featured Servers */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <FaStar style={{ color: '#faa61a' }} /> Öne Çıkan Sunucular
                </h2>
                <div style={styles.serverGrid}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : servers.filter(s => s.is_featured).length === 0 ? (
                        <div style={styles.empty}>Öne çıkan sunucu bulunamadı</div>
                    ) : (
                        servers.filter(s => s.is_featured).map(server => (
                            <ServerCard key={server.id} server={server} onJoin={joinServer} featured />
                        ))
                    )}
                </div>
            </div>

            {/* All Servers */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <FaFire style={{ color: '#ed4245' }} /> Popüler Sunucular
                </h2>
                <div style={styles.serverGrid}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : servers.length === 0 ? (
                        <div style={styles.empty}>
                            <FaSearch style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }} />
                            <p>Sunucu bulunamadı</p>
                        </div>
                    ) : (
                        servers.map(server => (
                            <ServerCard key={server.id} server={server} onJoin={joinServer} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const ServerCard = ({ server, onJoin, featured }) => (
    <div style={featured ? styles.serverCardFeatured : styles.serverCard}>
        {/* Server Icon */}
        <div style={styles.serverIcon}>
            {server.icon ? (
                <img src={server.icon} alt={server.name} style={styles.serverIconImage} />
            ) : (
                <div style={styles.serverIconPlaceholder}>
                    {server.name.charAt(0).toUpperCase()}
                </div>
            )}
        </div>

        {/* Server Info */}
        <div style={styles.serverInfo}>
            <div style={styles.serverHeader}>
                <h3 style={styles.serverName}>
                    {server.name}
                    {server.is_verified && (
                        <FaCheckCircle style={styles.verifiedBadge} title="Doğrulanmış" />
                    )}
                </h3>
            </div>

            <p style={styles.serverDescription}>{server.short_description}</p>

            {/* Tags */}
            {server.keywords && server.keywords.length > 0 && (
                <div style={styles.tags}>
                    {server.keywords.slice(0, 3).map((tag, idx) => (
                        <span key={idx} style={styles.tag}>{tag}</span>
                    ))}
                </div>
            )}

            {/* Stats */}
            <div style={styles.serverStats}>
                <div style={styles.stat}>
                    <FaUsers style={{ color: '#3ba55d' }} />
                    <span>{server.member_count?.toLocaleString() || 0} üye</span>
                </div>
                <div style={styles.stat}>
                    <div style={styles.onlineDot}></div>
                    <span>{server.online_count?.toLocaleString() || 0} çevrimiçi</span>
                </div>
            </div>
        </div>

        {/* Join Button */}
        <button onClick={() => onJoin(server.id)} style={styles.joinButton}>
            Katıl
        </button>
    </div>
);

const styles = {
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#313338',
        overflowY: 'auto',
        padding: '40px 60px'
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px'
    },
    title: {
        color: '#fff',
        fontSize: '32px',
        fontWeight: '700',
        margin: '0 0 8px 0'
    },
    subtitle: {
        color: '#b5bac1',
        fontSize: '16px',
        margin: 0
    },
    searchContainer: {
        maxWidth: '800px',
        margin: '0 auto 32px'
    },
    searchBar: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    searchIcon: {
        position: 'absolute',
        left: '16px',
        color: '#b5bac1',
        fontSize: '18px'
    },
    searchInput: {
        width: '100%',
        padding: '14px 14px 14px 48px',
        backgroundColor: '#1e1f22',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '16px'
    },
    categories: {
        display: 'flex',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    categoryButton: {
        backgroundColor: '#2b2d31',
        border: 'none',
        color: '#b5bac1',
        padding: '10px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
    },
    categoryButtonActive: {
        backgroundColor: '#5865f2',
        border: 'none',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    categoryIcon: {
        fontSize: '18px'
    },
    section: {
        marginBottom: '48px'
    },
    sectionTitle: {
        color: '#fff',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    serverGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
    },
    serverCard: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #1e1f22',
        transition: 'all 0.2s',
        cursor: 'pointer'
    },
    serverCardFeatured: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        padding: '20px',
        border: '2px solid #faa61a',
        transition: 'all 0.2s',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
    },
    serverIcon: {
        marginBottom: '16px'
    },
    serverIconImage: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    serverIconPlaceholder: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '28px',
        fontWeight: '700'
    },
    serverInfo: {
        marginBottom: '16px'
    },
    serverHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
    },
    serverName: {
        color: '#fff',
        fontSize: '18px',
        fontWeight: '600',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    verifiedBadge: {
        color: '#5865f2',
        fontSize: '16px'
    },
    serverDescription: {
        color: '#b5bac1',
        fontSize: '14px',
        margin: '0 0 12px 0',
        lineHeight: '1.5'
    },
    tags: {
        display: 'flex',
        gap: '6px',
        marginBottom: '12px',
        flexWrap: 'wrap'
    },
    tag: {
        backgroundColor: '#383a40',
        color: '#b5bac1',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '500'
    },
    serverStats: {
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        color: '#b5bac1',
        fontSize: '13px'
    },
    stat: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    onlineDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#3ba55d'
    },
    joinButton: {
        width: '100%',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        marginTop: '16px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#b5bac1'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b5bac1',
        gridColumn: '1 / -1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
};

export default ServerDiscovery;


