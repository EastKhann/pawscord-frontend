import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styles from './styles';
import PropTypes from 'prop-types';

// -- dynamic style helpers (pass 2) --
const _st1124 = styles.pieColor;

const getStatIconStyle = (color) => ({ ...styles.statIcon, color });
const getActivityIconStyle = (color) => ({ ...styles.activityIcon, color });
const getActivityValueStyle = (color) => ({ ...styles.activityValue, color });

export const formatNumber = (num) => {
    if (num === undefined || num === null) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
};

export const StatCard = ({ icon, label, value, color, subtitle }) => (
    <div aria-label="helpers" style={{ ...styles.statCard, borderTop: `3px solid ${color}` }}>
        <div style={getStatIconStyle(color)}>{icon}</div>
        <div style={styles.statContent}>
            <div style={styles.statLabel}>{label}</div>
            <div style={styles.statValue}>{value}</div>
            {subtitle && <div style={styles.statSubtitle}>{subtitle}</div>}
        </div>
    </div>
);

export const GrowthCard = ({ label, value, isPositive, suffix = '%', icon }) => (
    <div
        style={{
            ...styles.growthCard,
            borderLeft: `4px solid ${isPositive ? '#23a559' : '#f23f42'}`,
        }}
    >
        <div style={styles.growthLabel}>{label}</div>
        <div style={{ ...styles.growthValue, color: isPositive ? '#23a559' : '#f23f42' }}>
            {icon || (isPositive ? <FaArrowUp /> : <FaArrowDown />)}
            <span>
                {typeof value === 'number' ? value.toFixed(1) : value}
                {suffix}
            </span>
        </div>
    </div>
);

export const ActivityItem = ({ icon, label, value, color = '#5865f2' }) => (
    <div style={styles.activityItem}>
        <div style={getActivityIconStyle(color)}>{icon}</div>
        <div style={styles.activityLabel}>{label}</div>
        <div style={getActivityValueStyle(color)}>{value}</div>
    </div>
);

export const PieItem = ({ label, value, color }) => (
    <div style={styles.pieItem}>
        <div style={{ ..._st1124, backgroundColor: color }}></div>
        <div style={styles.pieLabel}>{label}</div>
        <div style={styles.pieValue}>{value}</div>
    </div>
);

StatCard.propTypes = {};
