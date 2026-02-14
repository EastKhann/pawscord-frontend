import { FaServer, FaEye, FaUsers } from 'react-icons/fa';
import { StatCard } from './helpers';
import styles from './styles';

const ServersTab = ({ stats }) => (
    <div style={styles.tabContent}>
        <div style={styles.statsGrid}>
            <StatCard icon={<FaServer />} label="Toplam Sunucu" value={stats.total_servers || 0} color="#5865f2" />
            <StatCard icon={<FaEye />} label="Genel Sunucu" value={stats.public_servers || 0} color="#23a559" />
            <StatCard icon={<FaUsers />} label="Ortalama Üye" value={stats.avg_server_members || 0} color="#f0b132" />
        </div>

        {stats.top_servers && stats.top_servers.length > 0 && (
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>En Büyük Sunucular</h3>
                <div style={styles.list}>
                    {stats.top_servers.map((server, index) => (
                        <div key={index} style={styles.listItem}>
                            <span>#{index + 1} {server.name}</span>
                            <span>{server.member_count} üye</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

export default ServersTab;
