import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styles from './styles';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const StatCard = ({ icon, label, value, subtext, change, color }) => {
    const statIconStyle = { ...styles.statIcon, backgroundColor: color };
    const statChangeStyle =
        change !== undefined
            ? { ...styles.statChange, color: change >= 0 ? '#23a559' : '#f23f42' }
            : null;
    return (
        <div aria-label={t('analytics.statCard', 'Statistics card')} style={styles.statCard}>
            <div style={statIconStyle}>{icon}</div>
            <div style={styles.statInfo}>
                <span style={styles.statLabel}>{label}</span>
                <span style={styles.statValue}>
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </span>
                {subtext && <span style={styles.statSubtext}>{subtext}</span>}
                {change !== undefined && (
                    <span style={statChangeStyle}>
                        {change >= 0 ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(change)}%
                    </span>
                )}
            </div>
        </div>
    );
};

export const ContentBar = ({ label, value, total, color }) => {
    const { t } = useTranslation();

    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    const fillStyle = { ...styles.contentBarFill, width: `${percentage}%`, backgroundColor: color };
    return (
        <div style={styles.contentBarContainer}>
            <div style={styles.contentBarLabel}>
                <span>{label}</span>
                <span>
                    {value} ({percentage}%)
                </span>
            </div>
            <div style={styles.contentBarTrack}>
                <div style={fillStyle} />
            </div>
        </div>
    );
};

export const ComparisonCard = ({ label, thisWeek, lastWeek, change }) => {
    const { t } = useTranslation();
    const compChangeStyle =
        change !== undefined
            ? { ...styles.comparisonChange, color: change >= 0 ? '#23a559' : '#f23f42' }
            : null;
    return (
        <div style={styles.comparisonCard}>
            <span style={styles.comparisonLabel}>{label}</span>
            <div style={styles.comparisonValues}>
                <div style={styles.comparisonValue}>
                    <span style={styles.comparisonThuiod}>{t('bu_hafta')}</span>
                    <span style={styles.comparisonNumber}>{thisWeek?.toLocaleString() || 0}</span>
                </div>
                <div style={styles.comparisonValue}>
                    <span style={styles.comparisonThuiod}>{t('analytics.lastWeek', 'Last Week')}</span>
                    <span style={styles.comparisonNumber}>{lastWeek?.toLocaleString() || 0}</span>
                </div>
            </div>
            {change !== undefined && (
                <span style={compChangeStyle}>
                    {change >= 0 ? '📈' : '📉'} {change >= 0 ? '+' : ''}
                    {change}%
                </span>
            )}
        </div>
    );
};

StatCard.propTypes = {
    icon: PropTypes.node,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subtext: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
};

ContentBar.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    total: PropTypes.number,
    color: PropTypes.string,
};

ComparisonCard.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    thisWeek: PropTypes.number,
    lastWeek: PropTypes.number,
    change: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
