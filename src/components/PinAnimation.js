// frontend/src/components/PinAnimation.js
// 🔥 FEATURE 24: Message pin animation
// Shows a subtle animation when a message is pinned/unpinned

import React, { useEffect, useState, memo } from 'react';
import { FaThumbtack } from 'react-icons/fa';

const PinAnimation = ({ show, type = 'pin' }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!visible) return null;

    const isPinning = type === 'pin';

    return (
        <div style={S.overlay}>
            <div style={{
                ...S.badge,
                animation: 'pinBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                backgroundColor: isPinning ? 'rgba(88,101,242,0.9)' : 'rgba(237,66,69,0.9)',
            }}>
                <FaThumbtack style={{
                    fontSize: 16,
                    transform: isPinning ? 'rotate(0deg)' : 'rotate(45deg)',
                    transition: 'transform 0.3s',
                }} />
                <span>{isPinning ? 'Mesaj Sabitlendi!' : 'Sabitleme Kaldırıldı'}</span>
            </div>
            <style>{`
                @keyframes pinBounce {
                    0% { transform: scale(0) translateY(20px); opacity: 0; }
                    50% { transform: scale(1.1) translateY(-5px); opacity: 1; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

const S = {
    overlay: {
        position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10000, pointerEvents: 'none',
    },
    badge: {
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 20px', borderRadius: 8,
        color: '#fff', fontWeight: 600, fontSize: 14,
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    },
};

export default memo(PinAnimation);
