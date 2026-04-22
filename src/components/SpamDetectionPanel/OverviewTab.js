import PropTypes from 'prop-types';
import { FaShieldAlt, FaExclamationTriangle, FaUserSlash, FaRobot } from 'react-icons/fa';
import { getPatternIcon, getActionColor } from './constants';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const OverviewTab = ({ stats, settings }) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('spamDetection.overviewTab', 'Overview tab')} style={styles.content}>
            {/* Stats Cards */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>
                        <FaShieldAlt size={20} color="#23a559" />
                    </div>
                    <div style={styles.statInfo}>
                        <div style={styles.statValue}>{stats.totalDetected}</div>
                        <div style={styles.statLabel}>{t('toplam_tespit')}</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>
                        <FaExclamationTriangle size={20} color="#f0b232" />
                    </div>
                    <div style={styles.statInfo}>
                        <div style={styles.statValue}>{stats.todayDetected}</div>
                        <div style={styles.statLabel}>{t('today')}</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>
                        <FaUserSlash size={20} color="#f23f42" />
                    </div>
                    <div style={styles.statInfo}>
                        <div style={styles.statValue}>{stats.actionsTaken?.ban || 0}</div>
                        <div style={styles.statLabel}>{t('ban')}</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>
                        <FaRobot size={20} color="#5865f2" />
                    </div>
                    <div style={styles.statInfo}>
                        <div style={styles.statValue}>
                            {Object.values(settings.patterns).filter(Boolean).length}
                        </div>
                        <div style={styles.statLabel}>{t('active_kural')}</div>
                    </div>
                </div>
            </div>

            {/* Recent Detections */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>{t('son_tespitler')}</h3>
                <div style={styles.detectionsList}>
                    {stats.recentDetections.map((detection, index) => {
                        const actionBadgeStyle = {
                            ...styles.actionBadge,
                            backgroundColor: getActionColor(detection.action),
                        };
                        return (
                            <div key={`item-${index}`} style={styles.detectionItem}>
                                <div style={styles.detectionIcon}>
                                    {getPatternIcon(detection.type)}
                                </div>
                                <div style={styles.detectionInfo}>
                                    <div style={styles.detectionUser}>
                                        <strong>{detection.username}</strong>
                                        <span style={styles.detectionType}>{detection.type}</span>
                                    </div>
                                    <div style={styles.detectionMessage}>
                                        {detection.message.substring(0, 50)}...
                                    </div>
                                </div>
                                <div style={actionBadgeStyle}>{detection.action}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Top Offenders */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>{t('en_çok_i̇hlal_edenler')}</h3>
                <div style={styles.offendersList}>
                    {stats.topOffenders.map((offender, index) => {
                        const offenderBadgeStyle = {
                            ...styles.actionBadge,
                            backgroundColor: getActionColor(offender.lastAction),
                        };
                        return (
                            <div key={`item-${index}`} style={styles.offenderItem}>
                                <div style={styles.offenderRank}>{index + 1}</div>
                                <div style={styles.offenderInfo}>
                                    <span style={styles.offenderName}>{offender.username}</span>
                                    <span style={styles.offenderCount}>{offender.count} ihlal</span>
                                </div>
                                <div style={offenderBadgeStyle}>{offender.lastAction}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

OverviewTab.propTypes = {
    stats: PropTypes.array,
    settings: PropTypes.object,
};
export default OverviewTab;
