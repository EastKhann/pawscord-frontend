// 🔍 Server Discovery Page - Find & Join Public Servers
import { useState, useEffect } from 'react';
import './ServerDiscoveryPage.css';
import toast from '../utils/toast';

const ServerDiscoveryPage = ({ apiBaseUrl, token, onJoinServer }) => {
    const [servers, setServers] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: 'all',
        language: 'all',
        size: 'all',
        search: '',
    });
    const [categories] = useState([
        { value: 'all', label: '🌍 Tümü' },
        { value: 'gaming', label: '🎮 Oyun' },
        { value: 'music', label: '🎵 Müzik' },
        { value: 'education', label: '📚 Eğitim' },
        { value: 'technology', label: '💻 Teknoloji' },
        { value: 'art', label: '🎨 Sanat' },
        { value: 'anime', label: '🎭 Anime' },
        { value: 'memes', label: '😂 Meme' },
        { value: 'community', label: '👥 Topluluk' },
    ]);

    useEffect(() => {
        loadServers();
        loadFeatured();
    }, [filters]);

    const fetchWithAuth = async (url, options = {}) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers,
        };
        const res = await fetch(url, { ...options, headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    };

    const loadServers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filters.category !== 'all') params.append('category', filters.category);
            if (filters.language !== 'all') params.append('language', filters.language);
            if (filters.size !== 'all') params.append('size', filters.size);
            if (filters.search) params.append('search', filters.search);

            const data = await fetchWithAuth(`${apiBaseUrl}/discovery/servers/?${params}`);
            setServers(data.servers || []);
        } catch (error) {
            console.error('❌ Servers yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadFeatured = async () => {
        try {
            const data = await fetchWithAuth(`${apiBaseUrl}/discovery/featured/`);
            setFeatured(data.servers || []);
        } catch (error) {
            console.error('❌ Featured servers yüklenemedi:', error);
        }
    };

    const handleJoinServer = async (serverId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/join/`, {
                method: 'POST',
            });
            toast.success('✅ Sunucuya katıldınız!');
            if (onJoinServer) onJoinServer(serverId);
        } catch (error) {
            console.error('❌ Sunucuya katılınamadı:', error);
            toast.error('❌ Sunucuya katılınamadı!');
        }
    };

    const getMemberCount = (count) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count;
    };

    const getOnlineCount = (count) => {
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count;
    };

    if (loading && servers.length === 0) {
        return (
            <div className="discovery-page">
                <div className="loading">🔄 Sunucular yükleniyor...</div>
            </div>
        );
    }

    return (
        <div className="discovery-page">
            <div className="page-header">
                <h1>🔍 Sunucu Keşfet</h1>
                <p>İlgi alanlarına uygun yeni topluluklar bul ve katıl</p>
            </div>

            <div className="search-filters">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="🔍 Sunucu ara..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                </div>

                <div className="filters-row">
                    <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    >
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.size}
                        onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                    >
                        <option value="all">👥 Tüm Boyutlar</option>
                        <option value="small">Küçük (0-100)</option>
                        <option value="medium">Orta (100-1K)</option>
                        <option value="large">Büyük (1K-10K)</option>
                        <option value="huge">Çok Büyük (10K+)</option>
                    </select>

                    <select
                        value={filters.language}
                        onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                    >
                        <option value="all">🌐 Tüm Diller</option>
                        <option value="tr">🇹🇷 Türkçe</option>
                        <option value="en">🇺🇸 English</option>
                        <option value="de">🇩🇪 Deutsch</option>
                        <option value="fr">🇫🇷 Français</option>
                        <option value="es">🇪🇸 Español</option>
                    </select>
                </div>
            </div>

            {featured.length > 0 && (
                <div className="featured-section">
                    <h2>⭐ Öne Çıkanlar</h2>
                    <div className="featured-grid">
                        {featured.map((server) => (
                            <div key={server.id} className="featured-card">
                                <div className="featured-badge">⭐ Öne Çıkan</div>
                                <img src={server.icon || '/default-server.png'} alt={server.name} className="server-icon-large" />
                                <h3>{server.name}</h3>
                                <p className="server-description">{server.description}</p>
                                <div className="server-stats">
                                    <div className="stat">
                                        <span className="stat-icon">👥</span>
                                        <span>{getMemberCount(server.member_count)} üye</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-icon">🟢</span>
                                        <span>{getOnlineCount(server.online_count)} çevrimiçi</span>
                                    </div>
                                </div>
                                <button className="join-btn" onClick={() => handleJoinServer(server.id)}>
                                    🚀 Katıl
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="servers-section">
                <h2>🌍 Tüm Sunucular</h2>
                {servers.length === 0 ? (
                    <div className="empty-state">
                        <p>Aramanıza uygun sunucu bulunamadı</p>
                    </div>
                ) : (
                    <div className="servers-grid">
                        {servers.map((server) => (
                            <div key={server.id} className="server-card">
                                <div className="server-header">
                                    <img src={server.icon || '/default-server.png'} alt={server.name} className="server-icon" />
                                    <div className="server-info">
                                        <h3>{server.name}</h3>
                                        <div className="server-meta">
                                            <span className="category-badge">{server.category}</span>
                                            {server.verified && <span className="verified-badge">✓ Doğrulanmış</span>}
                                        </div>
                                    </div>
                                </div>

                                <p className="server-description">{server.description || 'Açıklama yok'}</p>

                                <div className="server-stats-row">
                                    <div className="stat-item">
                                        <span className="stat-icon">👥</span>
                                        <span>{getMemberCount(server.member_count)}</span>
                                    </div>
                                    <div className="stat-item online">
                                        <span className="stat-icon">🟢</span>
                                        <span>{getOnlineCount(server.online_count)}</span>
                                    </div>
                                </div>

                                {server.tags && server.tags.length > 0 && (
                                    <div className="server-tags">
                                        {server.tags.slice(0, 3).map((tag, index) => (
                                            <span key={index} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <button className="join-btn-small" onClick={() => handleJoinServer(server.id)}>
                                    Katıl
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServerDiscoveryPage;
