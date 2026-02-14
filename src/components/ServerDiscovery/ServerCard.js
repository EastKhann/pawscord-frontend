import { FaCheckCircle, FaUsers } from 'react-icons/fa';
import styles from './serverDiscoveryStyles';

const ServerCard = ({ server, onJoin, featured }) => (
    <div style={featured ? styles.serverCardFeatured : styles.serverCard}>
        <div style={styles.serverIcon}>
            {server.icon ? <img src={server.icon} alt={server.name} style={styles.serverIconImage} /> : (
                <div style={styles.serverIconPlaceholder}>{server.name.charAt(0).toUpperCase()}</div>
            )}
        </div>
        <div style={styles.serverInfo}>
            <div style={styles.serverHeader}>
                <h3 style={styles.serverName}>{server.name}{server.is_verified && <FaCheckCircle style={styles.verifiedBadge} title="Doğrulanmış" />}</h3>
            </div>
            <p style={styles.serverDescription}>{server.short_description}</p>
            {server.keywords && server.keywords.length > 0 && (
                <div style={styles.tags}>{server.keywords.slice(0, 3).map((tag, idx) => <span key={idx} style={styles.tag}>{tag}</span>)}</div>
            )}
            <div style={styles.serverStats}>
                <div style={styles.stat}><FaUsers style={{ color: '#3ba55d' }} /><span>{server.member_count?.toLocaleString() || 0} üye</span></div>
                <div style={styles.stat}><div style={styles.onlineDot}></div><span>{server.online_count?.toLocaleString() || 0} çevrimiçi</span></div>
            </div>
        </div>
        <button onClick={() => onJoin(server.id)} style={styles.joinButton}>Katıl</button>
    </div>
);

export default ServerCard;
