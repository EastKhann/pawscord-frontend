import { FaSearch, FaStar, FaFire } from 'react-icons/fa';
import styles from './ServerDiscovery/serverDiscoveryStyles';
import useServerDiscovery, { CATEGORIES } from './ServerDiscovery/useServerDiscovery';
import ServerCard from './ServerDiscovery/ServerCard';

const ServerDiscovery = ({ fetchWithAuth, apiBaseUrl, onJoinServer }) => {
  const { servers, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, loading, joinServer } = useServerDiscovery({ fetchWithAuth, apiBaseUrl, onJoinServer });

  const featuredServers = servers.filter(s => s.is_featured);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>\uD83D\uDD0D Sunucu Ke\u015Ffi</h1>
        <p style={styles.subtitle}>\u0130lginizi \u00E7ekebilecek topluluklar\u0131 ke\u015Ffedin</p>
      </div>

      <div style={styles.searchContainer}>
        <div style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <input type="text" placeholder="Sunucu ara..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={styles.searchInput} />
        </div>
      </div>

      <div style={styles.categories}>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={selectedCategory === cat.id ? styles.categoryButtonActive : styles.categoryButton}>
            <span style={styles.categoryIcon}>{cat.icon}</span>{cat.name}
          </button>
        ))}
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}><FaStar style={{ color: '#faa61a' }} /> \u00D6ne \u00C7\u0131kan Sunucular</h2>
        <div style={styles.serverGrid}>
          {loading ? <div style={styles.loading}>Y\u00FCkleniyor...</div> : featuredServers.length === 0 ? <div style={styles.empty}>\u00D6ne \u00E7\u0131kan sunucu bulunamad\u0131</div> : (
            featuredServers.map(server => <ServerCard key={server.id} server={server} onJoin={joinServer} featured />)
          )}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}><FaFire style={{ color: '#ed4245' }} /> Pop\u00FCler Sunucular</h2>
        <div style={styles.serverGrid}>
          {loading ? <div style={styles.loading}>Y\u00FCkleniyor...</div> : servers.length === 0 ? (
            <div style={styles.empty}><FaSearch style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }} /><p>Sunucu bulunamad\u0131</p></div>
          ) : servers.map(server => <ServerCard key={server.id} server={server} onJoin={joinServer} />)}
        </div>
      </div>
    </div>
  );
};

export default ServerDiscovery;
