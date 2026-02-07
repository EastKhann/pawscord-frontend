// frontend/src/components/UnreadBadge.js
// 🔥 FEATURE 14: Unread dot badges for sidebar channels
// Shows dot or count badge next to channel name

import React, { memo } from 'react';

const UnreadBadge = ({ count = 0, hasMention = false, dot = false }) => {
    if (count <= 0 && !dot) return null;

    if (dot && count === 0) {
        return (
            <div style={{
                width: 8, height: 8, borderRadius: '50%',
                backgroundColor: '#fff', flexShrink: 0,
                position: 'absolute', left: -3, top: '50%', transform: 'translateY(-50%)',
            }} />
        );
    }

    return (
        <div style={{
            minWidth: 16, height: 16, borderRadius: 8,
            backgroundColor: hasMention ? '#ed4245' : '#949ba4',
            color: '#fff', fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0 5px', flexShrink: 0, lineHeight: 1,
        }}>
            {count > 99 ? '99+' : count}
        </div>
    );
};

export default memo(UnreadBadge);
