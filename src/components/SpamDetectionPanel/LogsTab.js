import { getActionColor } from './constants';
import styles from './styles';

const LogsTab = ({ stats }) => (
    <div style={styles.content}>
        <div style={styles.logsHeader}>
            <h3 style={styles.sectionTitle}>Spam Kayıtları</h3>
            <select style={styles.filterSelect}>
                <option value="all">Tüm Eylemler</option>
                <option value="warn">Uyarılar</option>
                <option value="mute">Susturmalar</option>
                <option value="kick">Atmalar</option>
                <option value="ban">Yasaklamalar</option>
            </select>
        </div>
        <div style={styles.logsList}>
            {stats.recentDetections.map((log, index) => (
                <div key={index} style={styles.logItem}>
                    <div style={styles.logTime}>
                        {new Date(log.timestamp).toLocaleString('tr-TR')}
                    </div>
                    <div style={styles.logContent}>
                        <strong>{log.username}</strong> - {log.type}
                        <div style={styles.logMessage}>"{log.message}"</div>
                    </div>
                    <div style={{ ...styles.actionBadge, backgroundColor: getActionColor(log.action) }}>
                        {log.action}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default LogsTab;
