// frontend/src/components/EditedIndicator.js
// 🔥 FEATURE 25: Edited message indicator
// Shows "(düzenlendi)" label with hover tooltip showing edit time

import React, { memo, useState } from 'react';

const EditedIndicator = ({ editedAt, style }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    if (!editedAt) return null;

    const editDate = new Date(editedAt);
    const formatted = editDate.toLocaleString('tr-TR', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });

    return (
        <span
            style={{ ...S.indicator, ...style }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            (düzenlendi)
            {showTooltip && (
                <span style={S.tooltip}>
                    {formatted}
                </span>
            )}
        </span>
    );
};

const S = {
    indicator: {
        position: 'relative',
        fontSize: 11, color: '#4e5058',
        marginLeft: 4, cursor: 'default',
        userSelect: 'none',
    },
    tooltip: {
        position: 'absolute', bottom: '100%', left: '50%',
        transform: 'translateX(-50%)', marginBottom: 6,
        padding: '6px 10px', borderRadius: 6,
        backgroundColor: '#111214', color: '#dcddde',
        fontSize: 12, fontWeight: 500,
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        zIndex: 100,
        pointerEvents: 'none',
    },
};

export default memo(EditedIndicator);
