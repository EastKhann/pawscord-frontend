// components/MaintenanceBanner.js
// 🔧 Maintenance Mode Banner

import { useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FaTimes, FaTools } from 'react-icons/fa';

const S = {
    bg: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'background 0.2s',
    },
    mar: { marginLeft: '10px', opacity: 0.7 },
    txt: { color: '#dbdee1', fontSize: '14px', marginTop: '2px' },
};

/**
 * Fixed-position banner displayed during scheduled maintenance windows.
 * Shows a countdown timer and auto-refreshes when maintenance ends.
 * @param {Object} props
 * @param {string} props.message - Maintenance message text
 * @param {string} [props.endTime] - ISO date string for when maintenance ends
 * @param {'info'|'warning'|'critical'} [props.level='info'] - Severity level controlling banner color
 * @param {() => void} [props.onDismiss] - Callback to dismiss the banner
 */
const MaintenanceBanner = ({ message, endTime, level = 'info', onDismiss }) => {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endTime) return;

        const updateTimer = () => {
            const now = new Date();
            const end = new Date(endTime);
            const diff = end - now;

            if (diff <= 0) {
                setTimeLeft('Yakında bitiyor...');
                // Auto-refresh when maintenance ends
                setTimeout(() => window.location.reload(), 5000);
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            setTimeLeft(`${hours}h ${minutes}m remaining`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [endTime]);

    const colors = {
        info: { bg: 'rgba(88, 101, 242, 0.1)', border: '#5865f2', text: '#5865f2' },
        warning: { bg: 'rgba(250, 166, 26, 0.1)', border: '#f0b232', text: '#f0b232' },
        critical: { bg: 'rgba(240, 71, 71, 0.1)', border: '#f23f42', text: '#f23f42' },
    };

    const color = colors[level] || colors.info;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: color.bg,
                borderBottom: `2px solid ${color.border}`,
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 9999,
                animation: 'slideDown 0.3s ease',
            }}
        >
            <div className="flex-align-12">
                <FaTools style={{ color: color.text, fontSize: '18px' }} />
                <div>
                    <div style={{ color: color.text, fontWeight: 'bold' }}>
                        {level === 'critical'
                            ? '🚨 Critical Maintenance'
                            : level === 'warning'
                                ? '⚠️ Scheduled Maintenance'
                                : 'ℹ️ Maintenance Notice'}
                    </div>
                    <div style={S.txt}>
                        {message}
                        {timeLeft && <span style={S.mar}>({timeLeft})</span>}
                    </div>
                </div>
            </div>
            {onDismiss && (
                <button
                    aria-label={t('common.dismiss', 'Dismiss')}
                    onClick={onDismiss}
                    style={S.bg}
                    onMouseEnter={(e) => (e.target.style.background = 'rgba(255,255,255,0.1)')}
                    onMouseLeave={(e) => (e.target.style.background = 'none')}
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

const MemoizedMaintenanceBanner = memo(MaintenanceBanner);
MemoizedMaintenanceBanner.displayName = 'MaintenanceBanner';

MemoizedMaintenanceBanner.propTypes = {
    message: PropTypes.string,
    endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    level: PropTypes.string,
    onDismiss: PropTypes.func,
};
export default MemoizedMaintenanceBanner;
