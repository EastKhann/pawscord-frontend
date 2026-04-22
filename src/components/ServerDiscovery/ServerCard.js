import { FaCheckCircle, FaUsers } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './serverDiscoveryStyles';
import { useTranslation } from 'react-i18next';

// -- extracted inline style constants --
const _st1 = { marginRight: '6px', fontSize: '16px', color: '#5865f2' };

const ServerCard = ({ server, onJoin, featured }) => {
    const { t } = useTranslation();
    return (
        <div
            aria-label={t('serverDiscovery.serverCard', 'Server card')}
            style={featured ? styles.serverCardFeatured : styles.serverCard}
        >
            <div style={styles.serverIcon}>
                {server.icon ? (
                    <img src={server.icon} alt={server.name} style={styles.serverIconImage} />
                ) : (
                    <div style={styles.serverIconPlaceholder}>
                        {server.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>
            <div style={styles.serverInfo}>
                <div style={styles.serverHeader}>
                    <h3 style={styles.serverName}>
                        {server.name}
                        {server.is_verified && (
                            <FaCheckCircle style={styles.verifiedBadge} title={t('verified')} />
                        )}
                    </h3>
                </div>
                <p style={styles.serverDescription}>{server.short_description}</p>
                {server.keywords && server.keywords.length > 0 && (
                    <div style={styles.tags}>
                        {server.keywords.slice(0, 3).map((tag, idx) => (
                            <span key={`item-${idx}`} style={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <div style={styles.serverStats}>
                    <div style={styles.stat}>
                        <FaUsers style={_st1} />
                        <span>{server.member_count?.toLocaleString() || 0} member</span>
                    </div>
                    <div style={styles.stat}>
                        <div style={styles.onlineDot}></div>
                        <span>{server.online_count?.toLocaleString() || 0} online</span>
                    </div>
                </div>
            </div>
            <button onClick={() => onJoin(server.id)} style={styles.joinButton}>
                {t('join')}
            </button>
        </div>
    );
};

ServerCard.propTypes = {
    server: PropTypes.string,
    onJoin: PropTypes.func,
    featured: PropTypes.bool,
};
export default ServerCard;
