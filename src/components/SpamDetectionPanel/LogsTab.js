import { getActionColor } from './constants';
import PropTypes from 'prop-types';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const LogsTab = ({ stats }) => {
    const { t } = useTranslation();
    return (
        <div style={styles.content}>
            <div style={styles.logsHeader}>
                <h3 style={styles.sectionTitle}>{t('spam_kayıtları')}</h3>
                <select style={styles.filterSelect} aria-label="select">
                    <option value="all">{t('all_actions')}</option>
                    <option value="warn">{t('uyarılar')}</option>
                    <option value="mute">{t('sessize_almalar')}</option>
                    <option value="kick">{t('atmalar')}</option>
                    <option value="ban">{t('banmalar')}</option>
                </select>
            </div>
            <div style={styles.logsList}>
                {stats.recentDetections.map((log, index) => {
                    const logBadgeStyle = {
                        ...styles.actionBadge,
                        backgroundColor: getActionColor(log.action),
                    };
                    return (
                        <div key={`item-${index}`} style={styles.logItem}>
                            <div style={styles.logTime}>
                                {new Date(log.timestamp).toLocaleString('tr-TR')}
                            </div>
                            <div style={styles.logContent}>
                                <strong>{log.username}</strong> - {log.type}
                                <div style={styles.logMessage}>"{log.message}"</div>
                            </div>
                            <div style={logBadgeStyle}>{log.action}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

LogsTab.propTypes = {
    stats: PropTypes.array,
};
export default LogsTab;
