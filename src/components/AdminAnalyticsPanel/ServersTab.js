import { FaServer, FaEye, FaUsers } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { StatCard } from './helpers';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const ServersTab = ({ stats }) => {
    const { t } = useTranslation();
    return (
        <div aria-label="servers tab" style={styles.tabContent}>
            <div style={styles.statsGrid}>
                <StatCard
                    icon={<FaServer />}
                    label={t('analytics.totalServers')}
                    value={stats.total_servers || 0}
                    color="#5865f2"
                />
                <StatCard
                    icon={<FaEye />}
                    label={t('analytics.publicServers')}
                    value={stats.public_servers || 0}
                    color="#23a559"
                />
                <StatCard
                    icon={<FaUsers />}
                    label={t('analytics.avgMembers')}
                    value={stats.avg_server_members || 0}
                    color="#f0b132"
                />
            </div>

            {stats.top_servers && stats.top_servers.length > 0 && (
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>{t('en_büyük_serverlar')}</h3>
                    <div style={styles.list}>
                        {stats.top_servers.map((server, index) => (
                            <div key={`item-${index}`} style={styles.listItem}>
                                <span>
                                    {index + 1} {server.name}
                                </span>
                                <span>
                                    {server.member_count} {t('analytics.member')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

ServersTab.propTypes = {
    stats: PropTypes.array,
};
export default ServersTab;
