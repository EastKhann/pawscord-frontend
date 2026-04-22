import { FaCrown, FaShoppingCart, FaChartLine } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { StatCard, PieItem } from './helpers';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const PremiumTab = ({ stats }) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('admin.premiumTab', 'Premium tab')} style={styles.tabContent}>
            <div style={styles.statsGrid}>
                <StatCard
                    icon={<FaCrown />}
                    label="Premium Kullan\u0131c\u0131lar"
                    value={stats.premium_users || 0}
                    color="#5865f2"
                />
                <StatCard
                    icon={<FaShoppingCart />}
                    label="Ayl\u0131k Gelir"
                    value={`${stats.monthly_revenue || 0} TL`}
                    color="#f0b132"
                />
                <StatCard
                    icon={<FaChartLine />}
                    label="Y\u0131ll\u0131k Tahmin"
                    value={`${(stats.monthly_revenue || 0) * 12} TL`}
                    color="#23a559"
                />
            </div>

            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>{t('premium_distribution')}</h3>
                <div style={styles.pieChart}>
                    <PieItem label="\u00dccretsiz" value={stats.free_users || 0} color="#80848e" />
                    <PieItem label="Nitro Basic" value={stats.basic_users || 0} color="#5865f2" />
                    <PieItem
                        label="Nitro Premium"
                        value={stats.premium_tier_users || 0}
                        color="#5865f2"
                    />
                </div>
            </div>
        </div>
    );
};

PremiumTab.propTypes = {
    stats: PropTypes.array,
};
export default PremiumTab;
