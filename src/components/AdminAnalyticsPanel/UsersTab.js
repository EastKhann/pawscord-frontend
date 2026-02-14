import { FaUsers, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { StatCard } from './helpers';
import styles from './styles';

const UsersTab = ({ stats }) => (
    <div style={styles.tabContent}>
        <div style={styles.statsGrid}>
            <StatCard icon={<FaUsers />} label="Toplam Kullanıcı" value={stats.total_users || 0} color="#5865f2" />
            <StatCard icon={<FaUserPlus />} label="Online" value={stats.online_users || 0} color="#23a559" />
            <StatCard icon={<FaUserMinus />} label="Offline" value={(stats.total_users - stats.online_users) || 0} color="#747f8d" />
        </div>

        {stats.top_users && stats.top_users.length > 0 && (
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>En Aktif Kullanıcılar</h3>
                <div style={styles.list}>
                    {stats.top_users.map((user, index) => (
                        <div key={index} style={styles.listItem}>
                            <span>#{index + 1} {user.username}</span>
                            <span>{user.message_count} mesaj</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

export default UsersTab;
