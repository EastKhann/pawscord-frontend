import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaStar, FaFire } from 'react-icons/fa';
import styles from '../ServerDiscovery/serverDiscoveryStyles';
import useServerDiscovery, { CATEGORIES } from '../ServerDiscovery/useServerDiscovery';
import ServerCard from '../ServerDiscovery/ServerCard';

import { useTranslation } from 'react-i18next';

const S = {
    mar: { fontSize: '48px', marginBottom: '16px', opacity: 0.3 },
};

const ServerDiscovery = ({ fetchWithAuth, apiBaseUrl, onJoinServer }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const {
        servers,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        loading,
        joinServer,
    } = useServerDiscovery({ fetchWithAuth, apiBaseUrl, onJoinServer });

    const featuredServers = servers.filter((s) => s.is_featured);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>{t('discovery.title', '🔍 Server Discovery')}</h1>
                <p style={styles.subtitle}>{t('serverDiscovery.subtitle', 'Discover communities you might enjoy')}</p>
            </div>

            <div style={styles.searchContainer}>
                <div style={styles.searchBar}>
                    <FaSearch style={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder={t('serverDiscovery.searchPlaceholder', 'Search servers...')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                        aria-label={t('common.search', 'Search')}
                    />
                </div>
            </div>

            <div style={styles.categories}>
                {CATEGORIES.map((cat) => (
                    <button
                        aria-label={t('serverDiscovery.categoryBtn', 'Filter by {{cat}}', { cat: cat.name })}
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={
                            selectedCategory === cat.id
                                ? styles.categoryButtonActive
                                : styles.categoryButton
                        }
                    >
                        <span style={styles.categoryIcon}>{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <FaStar className="icon-warning" /> {t('discovery.featured', 'Featured Servers')}
                </h2>
                <div style={styles.serverGrid}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : featuredServers.length === 0 ? (
                        <div style={styles.empty}>{t('discovery.noFeatured', 'No featured servers')}</div>
                    ) : (
                        featuredServers.map((server) => (
                            <ServerCard
                                key={server.id}
                                server={server}
                                onJoin={joinServer}
                                featured
                            />
                        ))
                    )}
                </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <FaFire className="icon-danger" /> {t('discovery.popular', 'Popular Servers')}
                </h2>
                <div style={styles.serverGrid}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : servers.length === 0 ? (
                        <div style={styles.empty}>
                            <FaSearch style={S.mar} />
                            <p>{t('discovery.noResults', 'No servers found')}</p>
                        </div>
                    ) : (
                        servers.map((server) => (
                            <ServerCard key={server.id} server={server} onJoin={joinServer} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

ServerDiscovery.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onJoinServer: PropTypes.func,
};
export default ServerDiscovery;
