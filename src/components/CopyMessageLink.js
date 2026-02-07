// frontend/src/components/CopyMessageLink.js
// 🔥 FEATURE 23: Copy message link functionality
// Generates and copies a permalink for any message

import React, { memo, useState, useCallback } from 'react';
import { FaLink, FaCheck } from 'react-icons/fa';

const CopyMessageLink = ({ message, serverId, channelId, style }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        const link = `${window.location.origin}/channels/${serverId || '@me'}/${channelId || ''}/${message?.id || ''}`;
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [message, serverId, channelId]);

    return (
        <button
            type="button"
            style={{ ...S.btn, ...style }}
            onClick={handleCopy}
            title={copied ? 'Kopyalandı!' : 'Mesaj Linkini Kopyala'}
        >
            {copied ? (
                <FaCheck style={{ fontSize: 14, color: '#57f287' }} />
            ) : (
                <FaLink style={{ fontSize: 14, color: '#b5bac1' }} />
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

export default memo(CopyMessageLink);
