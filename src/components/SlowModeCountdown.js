// frontend/src/components/SlowModeCountdown.js
// ⏱️ FEATURE — Enhanced Slow Mode Countdown Timer
// Shows visual countdown after sending in slow-mode channel

import React, { useState, useEffect, useCallback, memo } from 'react';
import { FaClock } from 'react-icons/fa';

const SlowModeCountdown = ({ interval, lastSentAt, onReady }) => {
    const [remaining, setRemaining] = useState(0);

    const calculateRemaining = useCallback(() => {
        if (!interval || !lastSentAt) return 0;
        const elapsed = Math.floor((Date.now() - new Date(lastSentAt).getTime()) / 1000);
        return Math.max(0, interval - elapsed);
    }, [interval, lastSentAt]);

    useEffect(() => {
        let timer;
        const r = calculateRemaining();
        setRemaining(r);

        if (r > 0) {
            timer = setInterval(() => {
                const nr = calculateRemaining();
                setRemaining(nr);
                if (nr <= 0) {
                    clearInterval(timer);
                    onReady?.();
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [calculateRemaining, onReady]);

    if (remaining <= 0) return null;

    const progress = 1 - (remaining / interval);
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    const timeStr = minutes > 0 ? `${minutes}:${String(seconds).padStart(2, '0')}` : `${seconds}s`;

    return (
        <div style={S.container}>
            <div style={S.progressBg}>
                <div style={{ ...S.progressBar, width: `${progress * 100}%` }} />
            </div>
            <div style={S.info}>
                <FaClock style={S.icon} />
                <span style={S.text}>
                    Yavaş mod aktif — <strong>{timeStr}</strong> bekleyin
                </span>
            </div>
        </div>
    );
};

const S = {
    container: {
        padding: '6px 16px',
        backgroundColor: 'rgba(240,178,50,0.08)',
        borderTop: '1px solid rgba(240,178,50,0.15)',
    },
    progressBg: {
        width: '100%',
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 4,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#f0b232',
        borderRadius: 2,
        transition: 'width 1s linear',
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
    },
    icon: { color: '#f0b232', fontSize: 11 },
    text: { color: '#f0b232', fontSize: 11 },
};

export default memo(SlowModeCountdown);
