import { FaCrown, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import { StatCard, PieItem } from './helpers';
import styles from './styles';

const PremiumTab = ({ stats }) => (
    <div style={styles.tabContent}>
        <div style={styles.statsGrid}>
            <StatCard icon={<FaCrown />} label="Premium Kullanıcı" value={stats.premium_users || 0} color="#9b59b6" />
            <StatCard icon={<FaShoppingCart />} label="Aylık Gelir" value={`${stats.monthly_revenue || 0} TL`} color="#f0b132" />
            <StatCard icon={<FaChartLine />} label="Yıllık Tahmin" value={`${(stats.monthly_revenue || 0) * 12} TL`} color="#23a559" />
        </div>

        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Premium Dağılımı</h3>
            <div style={styles.pieChart}>
                <PieItem label="Ücretsiz" value={stats.free_users || 0} color="#747f8d" />
                <PieItem label="Nitro Basic" value={stats.basic_users || 0} color="#5865f2" />
                <PieItem label="Nitro Premium" value={stats.premium_tier_users || 0} color="#9b59b6" />
            </div>
        </div>
    </div>
);

export default PremiumTab;
