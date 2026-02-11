// 🤖 BOT MARKETPLACE - Bot Keşfi, Yükleme, Review
// Discord App Directory benzeri

import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../utils/apiEndpoints';
import './BotMarketplace.css';
import toast from '../utils/toast';

// Bot Card Component
const BotCard = ({ bot, onClick }) => (
    <div className="bot-card" onClick={() => onClick(bot)}>
        <div className="bot-avatar">
            <img src={bot.avatar || '/default-bot.png'} alt={bot.name} />
            {bot.is_verified && <span className="verified-badge">✓</span>}
        </div>
        <div className="bot-info">
            <h3 className="bot-name">
                {bot.name}
                {bot.is_featured && <span className="featured-tag">⭐ Öne Çıkan</span>}
            </h3>
            <p className="bot-description">{bot.short_description}</p>
            <div className="bot-meta">
                <span className="bot-installs">
                    <i>📥</i> {bot.install_count?.toLocaleString() || 0}
                </span>
                <span className="bot-rating">
                    <i>⭐</i> {bot.avg_rating || 0}
                </span>
                {bot.category && (
                    <span className="bot-category">{bot.category}</span>
                )}
            </div>
            {bot.tags && bot.tags.length > 0 && (
                <div className="bot-tags">
                    {bot.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                    ))}
                </div>
            )}
        </div>
    </div>
);

// Bot Detail Modal
const BotDetailModal = ({ bot, onClose, onInstall }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showServerSelect, setShowServerSelect] = useState(false);
    const [servers, setServers] = useState([]);
    const [selectedServer, setSelectedServer] = useState(null);
    const [installing, setInstalling] = useState(false);

    const API_URL = API_BASE_URL;

    const loadServers = useCallback(async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${API_URL}/bots/my-servers/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setServers(data.servers || []);
            }
        } catch (e) {
            console.error('Failed to load servers:', e);
        }
    }, [API_URL]);

    const handleInstall = async () => {
        if (!selectedServer) return;
        setInstalling(true);

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${API_URL}/bots/${bot.id}/install/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ server_id: selectedServer.id })
            });

            if (response.ok) {
                onInstall?.(bot, selectedServer);
                setShowServerSelect(false);
                toast.success(`${bot.name} başarıyla ${selectedServer.name} sunucusuna eklendi!`);
            } else {
                const error = await response.json();
                toast.error(error.error || 'Yükleme başarısız');
            }
        } catch (e) {
            console.error('Install failed:', e);
        }
        setInstalling(false);
    };

    useEffect(() => {
        loadServers();
    }, [loadServers]);

    if (!bot) return null;

    return (
        <div className="bot-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="bot-modal">
                {/* Header */}
                <div className="bot-modal-header" style={{ backgroundImage: bot.banner ? `url(${bot.banner})` : undefined }}>
                    <button className="modal-close" onClick={onClose}>×</button>
                    <div className="bot-header-content">
                        <img src={bot.avatar || '/default-bot.png'} alt={bot.name} className="bot-large-avatar" />
                        <div className="bot-header-info">
                            <h2>
                                {bot.name}
                                {bot.is_verified && <span className="verified">✓ Doğrulanmış</span>}
                            </h2>
                            <p>{bot.short_description}</p>
                            <div className="bot-stats">
                                <span>📥 {bot.install_count?.toLocaleString()} sunucu</span>
                                <span>⭐ {bot.avg_rating} ({bot.review_count} yorum)</span>
                            </div>
                        </div>
                        <button
                            className="add-bot-btn"
                            onClick={() => setShowServerSelect(true)}
                        >
                            Sunucuya Ekle
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bot-modal-tabs">
                    <button
                        className={activeTab === 'overview' ? 'active' : ''}
                        onClick={() => setActiveTab('overview')}
                    >
                        Genel Bakış
                    </button>
                    <button
                        className={activeTab === 'commands' ? 'active' : ''}
                        onClick={() => setActiveTab('commands')}
                    >
                        Komutlar
                    </button>
                    <button
                        className={activeTab === 'reviews' ? 'active' : ''}
                        onClick={() => setActiveTab('reviews')}
                    >
                        Yorumlar
                    </button>
                </div>

                {/* Content */}
                <div className="bot-modal-content">
                    {activeTab === 'overview' && (
                        <div className="overview-tab">
                            <div className="description-section">
                                <h3>Açıklama</h3>
                                <div className="description-content">
                                    {bot.description}
                                </div>
                            </div>

                            {bot.features && bot.features.length > 0 && (
                                <div className="features-section">
                                    <h3>Özellikler</h3>
                                    <div className="features-list">
                                        {bot.features.map((feature, idx) => (
                                            <div key={idx} className="feature-item">
                                                ✅ {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="links-section">
                                <h3>Bağlantılar</h3>
                                <div className="links-list">
                                    {bot.website && (
                                        <a href={bot.website} target="_blank" rel="noopener noreferrer">
                                            🌐 Web Sitesi
                                        </a>
                                    )}
                                    {bot.support_server && (
                                        <a href={`/invite/${bot.support_server}`}>
                                            💬 Destek Sunucusu
                                        </a>
                                    )}
                                    {bot.privacy_policy && (
                                        <a href={bot.privacy_policy} target="_blank" rel="noopener noreferrer">
                                            🔒 Gizlilik Politikası
                                        </a>
                                    )}
                                </div>
                            </div>

                            {bot.developer && (
                                <div className="developer-section">
                                    <h3>Geliştirici</h3>
                                    <div className="developer-info">
                                        <img src={bot.developer.avatar || '/default-avatar.png'} alt="" />
                                        <span>{bot.developer.username}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'commands' && (
                        <div className="commands-tab">
                            {bot.commands && bot.commands.length > 0 ? (
                                <div className="commands-list">
                                    {bot.commands.map((cmd, idx) => (
                                        <div key={idx} className="command-item">
                                            <code className="command-name">{bot.prefix}{cmd.name}</code>
                                            <p className="command-desc">{cmd.description}</p>
                                            {cmd.usage && (
                                                <code className="command-usage">{cmd.usage}</code>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data">Komut listesi mevcut değil</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="reviews-tab">
                            {bot.reviews && bot.reviews.length > 0 ? (
                                <div className="reviews-list">
                                    {bot.reviews.map((review) => (
                                        <div key={review.id} className="review-item">
                                            <div className="review-header">
                                                <img src={review.avatar || '/default-avatar.png'} alt="" />
                                                <span className="reviewer-name">{review.user}</span>
                                                <span className="review-rating">
                                                    {'⭐'.repeat(review.rating)}
                                                </span>
                                            </div>
                                            <p className="review-content">{review.content}</p>
                                            <span className="review-date">
                                                {new Date(review.created_at).toLocaleDateString('tr-TR')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data">Henüz yorum yok</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Server Select Modal */}
                {showServerSelect && (
                    <div className="server-select-overlay">
                        <div className="server-select-modal">
                            <h3>Sunucu Seç</h3>
                            <p>{bot.name} botunu hangi sunucuya eklemek istiyorsunuz?</p>

                            <div className="server-list">
                                {servers.length === 0 ? (
                                    <p className="no-servers">Admin olduğunuz sunucu bulunamadı</p>
                                ) : (
                                    servers.map((server) => (
                                        <div
                                            key={server.id}
                                            className={`server-item ${selectedServer?.id === server.id ? 'selected' : ''}`}
                                            onClick={() => setSelectedServer(server)}
                                        >
                                            <img src={server.icon || '/default-server.png'} alt="" />
                                            <span>{server.name}</span>
                                            <span className="member-count">{server.member_count} üye</span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="server-select-actions">
                                <button className="cancel-btn" onClick={() => setShowServerSelect(false)}>
                                    İptal
                                </button>
                                <button
                                    className="install-btn"
                                    disabled={!selectedServer || installing}
                                    onClick={handleInstall}
                                >
                                    {installing ? 'Yükleniyor...' : 'Ekle'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main Marketplace Component
const BotMarketplace = ({ onClose }) => {
    const [bots, setBots] = useState([]);
    const [featuredBots, setFeaturedBots] = useState([]);
    const [trendingBots, setTrendingBots] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');
    const [selectedBot, setSelectedBot] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const API_URL = API_BASE_URL;

    const loadBots = useCallback(async () => {
        try {
            const params = new URLSearchParams({
                page,
                sort: sortBy,
                limit: 20
            });
            if (selectedCategory) params.append('category', selectedCategory);
            if (searchQuery) params.append('search', searchQuery);

            const response = await fetch(`${API_URL}/bots/?${params}`);
            if (response.ok) {
                const data = await response.json();
                setBots(data.bots || []);
                setTotalPages(data.pages || 1);
            }
        } catch (e) {
            console.error('Failed to load bots:', e);
        }
    }, [API_URL, page, sortBy, selectedCategory, searchQuery]);

    const loadInitialData = useCallback(async () => {
        setLoading(true);
        try {
            const [categoriesRes, featuredRes, trendingRes] = await Promise.all([
                fetch(`${API_URL}/bots/categories/`),
                fetch(`${API_URL}/bots/featured/`),
                fetch(`${API_URL}/bots/trending/`)
            ]);

            if (categoriesRes.ok) {
                const data = await categoriesRes.json();
                setCategories(data.categories || []);
            }

            if (featuredRes.ok) {
                const data = await featuredRes.json();
                setFeaturedBots(data.bots || []);
            }

            if (trendingRes.ok) {
                const data = await trendingRes.json();
                setTrendingBots(data.bots || []);
            }
        } catch (e) {
            console.error('Failed to load initial data:', e);
        }
        setLoading(false);
    }, [API_URL]);

    const loadBotDetail = async (bot) => {
        try {
            const response = await fetch(`${API_URL}/bots/${bot.id}/`);
            if (response.ok) {
                const data = await response.json();
                setSelectedBot(data);
            }
        } catch (e) {
            console.error('Failed to load bot detail:', e);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    useEffect(() => {
        loadBots();
    }, [loadBots]);

    if (loading) {
        return (
            <div className="bot-marketplace">
                <div className="marketplace-loading">
                    <div className="loading-spinner" />
                    <p>Bot Marketplace yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bot-marketplace">
            {/* Header */}
            <div className="marketplace-header">
                <div className="header-content">
                    <h1>🤖 Bot Marketplace</h1>
                    <p>Sunucunuzu güçlendirecek binlerce bot keşfedin</p>
                </div>
                {onClose && <button className="close-btn" onClick={onClose}>×</button>}
            </div>

            {/* Search & Filters */}
            <div className="marketplace-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Bot ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="filter-group">
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                    >
                        <option value="">Tüm Kategoriler</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.slug}>
                                {cat.icon} {cat.name} ({cat.bot_count})
                            </option>
                        ))}
                    </select>

                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="popular">Popüler</option>
                        <option value="new">Yeni</option>
                        <option value="rated">En İyi Puan</option>
                    </select>
                </div>
            </div>

            <div className="marketplace-content">
                {/* Featured Section */}
                {featuredBots.length > 0 && !searchQuery && !selectedCategory && (
                    <section className="featured-section">
                        <h2>⭐ Öne Çıkan Botlar</h2>
                        <div className="featured-grid">
                            {featuredBots.map((bot) => (
                                <BotCard key={bot.id} bot={bot} onClick={loadBotDetail} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Trending Section */}
                {trendingBots.length > 0 && !searchQuery && !selectedCategory && (
                    <section className="trending-section">
                        <h2>📈 Yükselen Botlar</h2>
                        <div className="trending-grid">
                            {trendingBots.map((bot) => (
                                <BotCard key={bot.id} bot={bot} onClick={loadBotDetail} />
                            ))}
                        </div>
                    </section>
                )}

                {/* All Bots */}
                <section className="all-bots-section">
                    <h2>
                        {selectedCategory
                            ? categories.find(c => c.slug === selectedCategory)?.name || 'Botlar'
                            : searchQuery
                                ? `"${searchQuery}" için sonuçlar`
                                : 'Tüm Botlar'
                        }
                    </h2>

                    {bots.length === 0 ? (
                        <div className="no-results">
                            <p>Bot bulunamadı</p>
                        </div>
                    ) : (
                        <>
                            <div className="bots-grid">
                                {bots.map((bot) => (
                                    <BotCard key={bot.id} bot={bot} onClick={loadBotDetail} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        disabled={page <= 1}
                                        onClick={() => setPage(p => p - 1)}
                                    >
                                        ← Önceki
                                    </button>
                                    <span>Sayfa {page} / {totalPages}</span>
                                    <button
                                        disabled={page >= totalPages}
                                        onClick={() => setPage(p => p + 1)}
                                    >
                                        Sonraki →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>

            {/* Bot Detail Modal */}
            {selectedBot && (
                <BotDetailModal
                    bot={selectedBot}
                    onClose={() => setSelectedBot(null)}
                />
            )}
        </div>
    );
};

export default BotMarketplace;
