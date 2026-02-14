import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styles from './styles';

export const StatCard = ({ icon, label, value, subtext, change, color }) => (
    <div style={styles.statCard}>
        <div style={{ ...styles.statIcon, backgroundColor: color }}>{icon}</div>
        <div style={styles.statInfo}>
            <span style={styles.statLabel}>{label}</span>
            <span style={styles.statValue}>{typeof value === 'number' ? value.toLocaleString() : value}</span>
            {subtext && <span style={styles.statSubtext}>{subtext}</span>}
            {change !== undefined && (
                <span style={{
                    ...styles.statChange,
                    color: change >= 0 ? '#43b581' : '#f04747'
                }}>
                    {change >= 0 ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(change)}%
                </span>
            )}
        </div>
    </div>
);

export const ContentBar = ({ label, value, total, color }) => {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    return (
        <div style={styles.contentBarContainer}>
            <div style={styles.contentBarLabel}>
                <span>{label}</span>
                <span>{value} ({percentage}%)</span>
            </div>
            <div style={styles.contentBarTrack}>
                <div style={{
                    ...styles.contentBarFill,
                    width: `${percentage}%`,
                    backgroundColor: color
                }} />
            </div>
        </div>
    );
};

export const ComparisonCard = ({ label, thisWeek, lastWeek, change }) => (
    <div style={styles.comparisonCard}>
        <span style={styles.comparisonLabel}>{label}</span>
        <div style={styles.comparisonValues}>
            <div style={styles.comparisonValue}>
                <span style={styles.comparisonPeriod}>Bu Hafta</span>
                <span style={styles.comparisonNumber}>{thisWeek?.toLocaleString() || 0}</span>
            </div>
            <div style={styles.comparisonValue}>
                <span style={styles.comparisonPeriod}>Ge{'\u00E7'}en Hafta</span>
                <span style={styles.comparisonNumber}>{lastWeek?.toLocaleString() || 0}</span>
            </div>
        </div>
        {change !== undefined && (
            <span style={{
                ...styles.comparisonChange,
                color: change >= 0 ? '#43b581' : '#f04747'
            }}>
                {change >= 0 ? '\uD83D\uDCC8' : '\uD83D\uDCC9'} {change >= 0 ? '+' : ''}{change}%
            </span>
        )}
    </div>
);
