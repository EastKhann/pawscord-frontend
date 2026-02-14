import {
    FaShieldAlt, FaExclamationTriangle, FaUserSlash, FaRobot
} from 'react-icons/fa';
import { getPatternIcon, getActionColor } from './constants';
import styles from './styles';

const OverviewTab = ({ stats, settings }) => (
    <div style={styles.content}>
        {/* Stats Cards */}
        <div style={styles.statsGrid}>
            <div style={styles.statCard}>
                <div style={styles.statIcon}><FaShieldAlt size={20} color="#43b581" /></div>
                <div style={styles.statInfo}>
                    <div style={styles.statValue}>{stats.totalDetected}</div>
                    <div style={styles.statLabel}>Toplam Tespit</div>
                </div>
            </div>
            <div style={styles.statCard}>
                <div style={styles.statIcon}><FaExclamationTriangle size={20} color="#faa61a" /></div>
                <div style={styles.statInfo}>
                    <div style={styles.statValue}>{stats.todayDetected}</div>
                    <div style={styles.statLabel}>Bugün</div>
                </div>
            </div>
            <div style={styles.statCard}>
                <div style={styles.statIcon}><FaUserSlash size={20} color="#f04747" /></div>
                <div style={styles.statInfo}>
                    <div style={styles.statValue}>{stats.actionsTaken?.ban || 0}</div>
                    <div style={styles.statLabel}>Ban</div>
                </div>
            </div>
            <div style={styles.statCard}>
                <div style={styles.statIcon}><FaRobot size={20} color="#5865f2" /></div>
                <div style={styles.statInfo}>
                    <div style={styles.statValue}>{Object.values(settings.patterns).filter(Boolean).length}</div>
                    <div style={styles.statLabel}>Aktif Kural</div>
                </div>
            </div>
        </div>

        {/* Recent Detections */}
        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Son Tespitler</h3>
            <div style={styles.detectionsList}>
                {stats.recentDetections.map((detection, index) => (
                    <div key={index} style={styles.detectionItem}>
                        <div style={styles.detectionIcon}>{getPatternIcon(detection.type)}</div>
                        <div style={styles.detectionInfo}>
                            <div style={styles.detectionUser}>
                                <strong>{detection.username}</strong>
                                <span style={styles.detectionType}>{detection.type}</span>
                            </div>
                            <div style={styles.detectionMessage}>{detection.message.substring(0, 50)}...</div>
                        </div>
                        <div style={{ ...styles.actionBadge, backgroundColor: getActionColor(detection.action) }}>
                            {detection.action}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Top Offenders */}
        <div style={styles.section}>
            <h3 style={styles.sectionTitle}>En Çok İhlal Edenler</h3>
            <div style={styles.offendersList}>
                {stats.topOffenders.map((offender, index) => (
                    <div key={index} style={styles.offenderItem}>
                        <div style={styles.offenderRank}>#{index + 1}</div>
                        <div style={styles.offenderInfo}>
                            <span style={styles.offenderName}>{offender.username}</span>
                            <span style={styles.offenderCount}>{offender.count} ihlal</span>
                        </div>
                        <div style={{ ...styles.actionBadge, backgroundColor: getActionColor(offender.lastAction) }}>
                            {offender.lastAction}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default OverviewTab;
