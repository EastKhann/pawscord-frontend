// frontend/src/components/PushToTalkIndicator.js
// 🔥 FEATURE 29: Push-to-talk visual indicator
// Shows a pulsing indicator when PTT key is held

import React, { useEffect, useState, memo } from 'react';
import { FaMicrophone } from 'react-icons/fa';

const PushToTalkIndicator = ({ pttKey = 'V', enabled = false }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (e) => {
            if (e.key.toUpperCase() === pttKey.toUpperCase() && !e.repeat) {
                setActive(true);
            }
        };
        const handleKeyUp = (e) => {
            if (e.key.toUpperCase() === pttKey.toUpperCase()) {
                setActive(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [enabled, pttKey]);

    if (!enabled) return null;

    return (
        <div style={{ ...S.container, opacity: active ? 1 : 0.3 }}>
            <div style={{
                ...S.ring,
                animation: active ? 'pttPulse 0.8s ease infinite' : 'none',
                borderColor: active ? '#57f287' : '#4e5058',
            }}>
                <FaMicrophone style={{
                    fontSize: 16,
                    color: active ? '#57f287' : '#4e5058',
                    transition: 'color 0.15s',
                }} />
            </div>
            <span style={{
                ...S.label,
                color: active ? '#57f287' : '#4e5058',
            }}>
                {active ? 'Konuşuluyor...' : `PTT: ${pttKey}`}
            </span>
            <style>{`
                @keyframes pttPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(87, 242, 135, 0.4); }
                    50% { box-shadow: 0 0 0 8px rgba(87, 242, 135, 0); }
                }
            `}</style>
        </div>
    );
};

const S = {
    container: {
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 12px', borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.3)',
        transition: 'opacity 0.2s',
    },
    ring: {
        width: 32, height: 32, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '2px solid', transition: 'border-color 0.15s',
    },
    label: {
        fontSize: 13, fontWeight: 500, transition: 'color 0.15s',
    },
};

export default memo(PushToTalkIndicator);
