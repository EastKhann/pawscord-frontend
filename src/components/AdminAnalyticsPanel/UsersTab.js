import { FaUsers, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { StatCard } from './helpers';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const UsersTab = ({ stats }) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('admin.usersTab', 'Users tab')} style={styles.tabContent}>
            <div style={styles.statsGrid}>
                <StatCard
                    icon={<FaUsers />}
                    label={t('analytics.totalUsers')}
                    value={stats.total_users || 0}
                    color="#5865f2"
                />
                <StatCard
                    icon={<FaUserPlus />}
                    label={t('analytics.online')}
                    value={stats.online_users || 0}
                    color="#23a559"
                />
                <StatCard
                    icon={<FaUserMinus />}
                    label={t('analytics.offline')}
                    value={stats.total_users - stats.online_users || 0}
                    color="#80848e"
                />
            </div>

            {stats.top_users && stats.top_users.length > 0 && (
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>{t('en_active_users')}</h3>
                    <div style={styles.list}>
                        {stats.top_users.map((user, index) => (
                            <div key={`item-${index}`} style={styles.listItem}>
                                <span>
                                    {index + 1} {user.username}
                                </span>
                                <span>
                                    {user.message_count} {t('analytics.message')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

UsersTab.propTypes = {
    stats: PropTypes.array,
};
export default UsersTab;
