// frontend/src/components/SlowModeIndicator.js
import React from 'react';
import { FaClock } from 'react-icons/fa';

const SlowModeIndicator = ({ cooldownSeconds, remainingSeconds }) => {
    if (!cooldownSeconds) return null;

    const formatTime = (seconds) => {
        if (seconds < 60) return `${seconds}s`;
        return `${Math.floor(seconds / 60)}dk`;
    };

    return (
        <div style={styles.container}>
            <FaClock style={styles.icon} />
            <span style={styles.text}>
                Yavaş Mod: {formatTime(cooldownSeconds)}
                {remainingSeconds > 0 && (
                    <span style={styles.countdown}> ({remainingSeconds}s kaldı)</span>
                )}
            </span>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: 'rgba(240, 177, 50, 0.1)',
        border: '1px solid rgba(240, 177, 50, 0.3)',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#f0b132',
        margin: '8px 16px'
    },
    icon: {
        fontSize: '14px'
    },
    text: {
        fontWeight: '500'
    },
    countdown: {
        opacity: 0.7
    }
};

export default SlowModeIndicator;



