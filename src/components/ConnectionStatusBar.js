// frontend/src/components/ConnectionStatusBar.js
// 🌐 FEATURE 5: Connection Status Indicator
// Shows online/offline/reconnecting status

import { useState, useEffect, memo, useCallback } from 'react';
import { FaWifi, FaExclamationTriangle, FaSync } from 'react-icons/fa';

const ConnectionStatusBar = () => {
    const [status, setStatus] = useState('online'); // online | offline | reconnecting
    const [visible, setVisible] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const handleOffline = useCallback(() => {
        setStatus('offline');
        setVisible(true);
        setFadeOut(false);
    }, []);

    const handleOnline = useCallback(() => {
        setStatus('reconnecting');
        setVisible(true);
        setFadeOut(false);
        // Brief "reconnecting" then show "connected" then fade out
        setTimeout(() => {
            setStatus('online');
            setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => setVisible(false), 500);
            }, 2000);
        }, 1000);
    }, []);

    useEffect(() => {
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Check initial state
        if (!navigator.onLine) handleOffline();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [handleOnline, handleOffline]);

    if (!visible) return null;

    const config = {
        offline: {
            bg: 'linear-gradient(135deg, #da373c, #a12d2f)',
            icon: <FaExclamationTriangle />,
            text: 'İnternet bağlantısı yok',
            pulse: false,
        },
        reconnecting: {
            bg: 'linear-gradient(135deg, #f0b232, #d4982a)',
            icon: <FaSync className="conn-status-spin" />,
            text: 'Yeniden bağlanılıyor...',
            pulse: true,
        },
        online: {
            bg: 'linear-gradient(135deg, #23a559, #1e8e4a)',
            icon: <FaWifi />,
            text: 'Bağlantı sağlandı!',
            pulse: false,
        },
    };

    const c = config[status];

    return (
        <div
            style={{
                ...S.bar,
                background: c.bg,
                opacity: fadeOut ? 0 : 1,
                transform: fadeOut ? 'translateY(-100%)' : 'translateY(0)',
            }}
        >
            <span style={S.icon}>{c.icon}</span>
            <span style={S.text}>{c.text}</span>
        </div>
    );
};

const S = {
    bar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        zIndex: 99999,
        transition: 'all 0.5s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    },
    icon: { color: '#fff', fontSize: 14, display: 'flex', alignItems: 'center' },
    text: { color: '#fff', fontSize: 13, fontWeight: 600 },
};

if (typeof document !== 'undefined') {
    const id = 'conn-status-css';
    if (!document.getElementById(id)) {
        const s = document.createElement('style');
        s.id = id;
        s.textContent = `@keyframes connSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.conn-status-spin { animation: connSpin 1s linear infinite; }`;
        document.head.appendChild(s);
    }
}

export default memo(ConnectionStatusBar);
