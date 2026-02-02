// components/MaintenanceBanner.js
// 🔧 Maintenance Mode Banner

import React, { useState, useEffect } from 'react';
import { FaTimes, FaTools } from 'react-icons/fa';

const MaintenanceBanner = ({ message, endTime, level = 'info', onDismiss }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (!endTime) return;

        const updateTimer = () => {
            const now = new Date();
            const end = new Date(endTime);
            const diff = end - now;

            if (diff <= 0) {
                setTimeLeft('Ending soon...');
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
        warning: { bg: 'rgba(250, 166, 26, 0.1)', border: '#faa61a', text: '#faa61a' },
        critical: { bg: 'rgba(240, 71, 71, 0.1)', border: '#f04747', text: '#f04747' }
    };

    const color = colors[level] || colors.info;

    return (
        <div style={{
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
            animation: 'slideDown 0.3s ease'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaTools style={{ color: color.text, fontSize: '18px' }} />
                <div>
                    <div style={{ color: color.text, fontWeight: 'bold' }}>
                        {level === 'critical' ? '🚨 Critical Maintenance' :
                         level === 'warning' ? '⚠️ Scheduled Maintenance' :
                         'ℹ️ Maintenance Notice'}
                    </div>
                    <div style={{ color: '#dcddde', fontSize: '14px', marginTop: '2px' }}>
                        {message}
                        {timeLeft && <span style={{ marginLeft: '10px', opacity: 0.7 }}>({timeLeft})</span>}
                    </div>
                </div>
            </div>
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#b9bbbe',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '4px',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'none'}
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

export default MaintenanceBanner;



