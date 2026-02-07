// frontend/src/components/VoiceChannelLimit.js
// 🔥 FEATURE 27: Voice channel user limit UI
// Shows current/max users and prevents joining if full

import React, { memo } from 'react';
import { FaUsers, FaLock } from 'react-icons/fa';

const VoiceChannelLimit = ({ currentUsers = 0, maxUsers = 0, style }) => {
    if (!maxUsers || maxUsers <= 0) return null;

    const isFull = currentUsers >= maxUsers;
    const percentage = Math.min((currentUsers / maxUsers) * 100, 100);

    return (
        <div style={{ ...S.container, ...style }}>
            <div style={S.bar}>
                <div style={{
                    ...S.fill,
                    width: `${percentage}%`,
                    backgroundColor: isFull ? '#ed4245' : percentage > 80 ? '#fee75c' : '#57f287',
                }} />
            </div>
            <div style={S.label}>
                {isFull ? (
                    <FaLock style={{ fontSize: 10, color: '#ed4245' }} />
                ) : (
                    <FaUsers style={{ fontSize: 10, color: '#b5bac1' }} />
                )}
                <span style={{ color: isFull ? '#ed4245' : '#b5bac1' }}>
                    {currentUsers}/{maxUsers}
                </span>
            </div>
        </div>
    );
};

const S = {
    container: {
        display: 'flex', alignItems: 'center', gap: 6,
    },
    bar: {
        width: 40, height: 4, borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
    },
    fill: {
        height: '100%', borderRadius: 2,
        transition: 'width 0.3s, background-color 0.3s',
    },
    label: {
        display: 'flex', alignItems: 'center', gap: 3,
        fontSize: 11, whiteSpace: 'nowrap',
    },
};

export default memo(VoiceChannelLimit);
