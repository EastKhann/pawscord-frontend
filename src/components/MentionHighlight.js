// frontend/src/components/MentionHighlight.js
// 🔥 FEATURE 5: @everyone / @here / @username highlight in message content
// Parses message text and wraps mentions in highlighted spans

import React, { memo, useMemo } from 'react';

const MENTION_REGEX = /@(everyone|here|[\w.]+)/g;

const MentionHighlight = ({ text, currentUser, allUsers = [] }) => {
    const parts = useMemo(() => {
        if (!text || typeof text !== 'string') return [text || ''];

        const result = [];
        let lastIndex = 0;
        let match;

        const regex = new RegExp(MENTION_REGEX.source, 'g');
        while ((match = regex.exec(text)) !== null) {
            // Add text before match
            if (match.index > lastIndex) {
                result.push({ type: 'text', value: text.slice(lastIndex, match.index) });
            }

            const mention = match[1];
            const isEveryone = mention === 'everyone';
            const isHere = mention === 'here';
            const isSelf = mention === currentUser;
            const isUser = !isEveryone && !isHere && allUsers.some(u => u.username === mention);

            if (isEveryone || isHere || isSelf || isUser) {
                result.push({
                    type: 'mention',
                    value: match[0],
                    isEveryone,
                    isHere,
                    isSelf,
                });
            } else {
                result.push({ type: 'text', value: match[0] });
            }

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            result.push({ type: 'text', value: text.slice(lastIndex) });
        }

        return result;
    }, [text, currentUser, allUsers]);

    return (
        <>
            {parts.map((part, i) => {
                if (part.type === 'mention') {
                    const isSelfOrBroadcast = part.isSelf || part.isEveryone || part.isHere;
                    return (
                        <span
                            key={i}
                            style={{
                                backgroundColor: isSelfOrBroadcast
                                    ? 'rgba(88, 101, 242, 0.3)'
                                    : 'rgba(88, 101, 242, 0.15)',
                                color: '#dee0fc',
                                padding: '0 2px',
                                borderRadius: 3,
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'background 0.1s',
                            }}
                            onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(88, 101, 242, 0.5)'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundColor = isSelfOrBroadcast ? 'rgba(88, 101, 242, 0.3)' : 'rgba(88, 101, 242, 0.15)'; }}
                        >
                            {part.value}
                        </span>
                    );
                }
                return <span key={i}>{part.value}</span>;
            })}
        </>
    );
};

export default memo(MentionHighlight);
