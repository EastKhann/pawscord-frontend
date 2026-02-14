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
        <h1 style={styles.title}>🔍 Sunucu Keşfi</h1>
        <p style={styles.subtitle}>İlginizi çekebilecek toplulukları keşfedin</p>
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
        <h2 style={styles.sectionTitle}><FaStar style={{ color: '#faa61a' }} /> Öne Çıkan Sunucular</h2>
        <div style={styles.serverGrid}>
          {loading ? <div style={styles.loading}>Yükleniyor...</div> : featuredServers.length === 0 ? <div style={styles.empty}>Öne çıkan sunucu bulunamadı</div> : (
            featuredServers.map(server => <ServerCard key={server.id} server={server} onJoin={joinServer} featured />)
          )}
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}><FaFire style={{ color: '#ed4245' }} /> Popüler Sunucular</h2>
        <div style={styles.serverGrid}>
          {loading ? <div style={styles.loading}>Yükleniyor...</div> : servers.length === 0 ? (
            <div style={styles.empty}><FaSearch style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }} /><p>Sunucu bulunamadı</p></div>
          ) : servers.map(server => <ServerCard key={server.id} server={server} onJoin={joinServer} />)}
        </div>
      </div>
    </div>
  );
};

export default ServerDiscovery;
