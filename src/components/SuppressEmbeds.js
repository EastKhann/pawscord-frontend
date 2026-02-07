// frontend/src/components/SuppressEmbeds.js
// 🔥 FEATURE 26: Suppress embeds toggle on messages
// Toggle button to hide/show link embeds on a message

import React, { useState, memo, useCallback } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const SuppressEmbeds = ({ messageId, initialSuppressed = false, onToggle, style }) => {
    const [suppressed, setSuppressed] = useState(initialSuppressed);

    const handleToggle = useCallback(() => {
        const newState = !suppressed;
        setSuppressed(newState);
        onToggle?.(messageId, newState);
    }, [suppressed, messageId, onToggle]);

    return (
        <button
            type="button"
            style={{ ...S.btn, ...style }}
            onClick={handleToggle}
            title={suppressed ? 'Gömülü içerikleri göster' : 'Gömülü içerikleri gizle'}
        >
            {suppressed ? (
                <FaEye style={{ fontSize: 14, color: '#57f287' }} />
            ) : (
                <FaEyeSlash style={{ fontSize: 14, color: '#b5bac1' }} />
            )}
        </button>
    );
};

const S = {
    btn: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 28, height: 28, borderRadius: 4,
        border: 'none', background: 'transparent',
        cursor: 'pointer', transition: 'all 0.15s',
    },
};

export default memo(SuppressEmbeds);
