// 🔍 Server Discovery Page - Find & Join Public Servers
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ServerDiscoveryPage.css';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const ServerDiscoveryPage = ({ apiBaseUrl, fetchWithAuth, onJoinServer }) => {
    const { t } = useTranslation();
    const [servers, setServers] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: 'all',
        language: 'all',
        size: 'all',
        search: '',
    });
    const categories = [
        { value: 'all', label: t('discovery.allCategories') },
        { value: 'gaming', label: t('discovery.gaming') },
        { value: 'music', label: t('discovery.music') },
        { value: 'education', label: t('discovery.education') },
        { value: 'technology', label: t('discovery.technology') },
        { value: 'art', label: t('discovery.art') },
        { value: 'anime', label: t('discovery.anime') },
        { value: 'memes', label: t('discovery.memes') },
        { value: 'community', label: t('discovery.community') },
    ];

    useEffect(() => {
        loadServers();
        loadFeatured();
    }, [filters]);

    const loadServers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filters.category !== 'all') params.append('category', filters.category);
            if (filters.language !== 'all') params.append('language', filters.language);
            if (filters.size !== 'all') params.append('size', filters.size);
            if (filters.search) params.append('search', filters.search);

            const res = await fetchWithAuth(`${apiBaseUrl}/discovery/servers/?${params}`);
            if (!res.ok) return;
            const data = await res.json();
            setServers(data.servers || []);
        } catch (error) {
            logger.error('❌ Servers could not be loaded:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadFeatured = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/discovery/featured/`);
            if (!res.ok) return;
            const data = await res.json();
            setFeatured(data.servers || []);
        } catch (error) {
            logger.error('❌ Featured servers could not be loaded:', error);
        }
    };

    const handleJoinServer = async (server) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${server.id}/join/`, {
                method: 'POST',
            });
            if (res.ok) {
                toast.success(t('discovery.joinedSuccess'));
                if (onJoinServer) onJoinServer(server);
            } else {
                toast.error(t('discovery.joinFailed'));
            }
        } catch (error) {
            logger.error('❌ Failed to join server:', error);
            toast.error(t('discovery.joinFailed'));
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
                <div className="loading">🔄 {t('discovery.loading')}</div>
            </div>
        );
    }

    return (
        <div className="discovery-page">
            <div className="page-header">
                <h1>🔍 {t('discovery.title')}</h1>
                <p>{t('discovery.subtitle')}</p>
            </div>

            <div className="search-filters">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder={t('discovery.searchPlaceholder')}
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
                        <option value="all">{t('discovery.allSizes')}</option>
                        <option value="small">{t('discovery.small')}</option>
                        <option value="medium">{t('discovery.medium')}</option>
                        <option value="large">{t('discovery.large')}</option>
                        <option value="huge">{t('discovery.huge')}</option>
                    </select>

                    <select
                        value={filters.language}
                        onChange={(e) => setFilters({ ...filters, language: e.target.value })}
                    >
                        <option value="all">{t('discovery.allLanguages')}</option>
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
                    <h2>⭐ {t('discovery.featured')}</h2>
                    <div className="featured-grid">
                        {featured.map((server) => (
                            <div key={server.id} className="featured-card">
                                <div className="featured-badge">⭐ {t('discovery.featured')}</div>
                                <img
                                    src={server.icon || '/default-server.png'}
                                    alt={server.name}
                                    className="server-icon-large"
                                />
                                <h3>{server.name}</h3>
                                <p className="server-description">{server.description}</p>
                                <div className="server-stats">
                                    <div className="stat">
                                        <span className="stat-icon">👥</span>
                                        <span>
                                            {getMemberCount(server.member_count)}{' '}
                                            {t('discovery.member')}
                                        </span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-icon">🟢</span>
                                        <span>
                                            {getOnlineCount(server.online_count)}{' '}
                                            {t('discovery.online')}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    aria-label={t('discovery.join')}
                                    className="join-btn"
                                    onClick={() => handleJoinServer(server)}
                                >
                                    🚀 {t('discovery.join')}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="servers-section">
                <h2>🌍 {t('discovery.allServers')}</h2>
                {servers.length === 0 ? (
                    <div className="empty-state">
                        <p>{t('discovery.noResults')}</p>
                    </div>
                ) : (
                    <div className="servers-grid">
                        {servers.map((server) => (
                            <div key={server.id} className="server-card">
                                <div className="server-header">
                                    <img
                                        src={server.icon || '/default-server.png'}
                                        alt={server.name}
                                        className="server-icon"
                                    />
                                    <div className="server-info">
                                        <h3>{server.name}</h3>
                                        <div className="server-meta">
                                            <span className="category-badge">
                                                {server.category}
                                            </span>
                                            {server.verified && (
                                                <span className="verified-badge">
                                                    ✓ {t('discovery.verified')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <p className="server-description">
                                    {server.description || t('discovery.noDescription')}
                                </p>

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
                                            <span key={`item-${index}`} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <button
                                    aria-label={t('discovery.join')}
                                    className="join-btn-small"
                                    onClick={() => handleJoinServer(server)}
                                >
                                    {t('discovery.join')}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

ServerDiscoveryPage.propTypes = {
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    onJoinServer: PropTypes.func,
};
export default ServerDiscoveryPage;
