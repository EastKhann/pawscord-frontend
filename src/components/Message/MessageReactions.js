// frontend/src/components/Message/MessageReactions.js
// ❤️ MESSAGE REACTIONS - Emoji reactions display

import React, { memo, useCallback } from 'react';

export const MessageReactions = memo(({
    reactions,
    currentUser,
    onToggleReaction,
    messageId
}) => {
    // Group reactions by emoji
    const groupedReactions = useCallback(() => {
        if (!reactions) return [];
        const groups = {};
        reactions.forEach(r => {
            if (!groups[r.emoji]) groups[r.emoji] = [];
            groups[r.emoji].push(r.username);
        });
        return Object.entries(groups).map(([emoji, users]) => ({
            emoji,
            users,
            count: users.length
        }));
    }, [reactions])();

    // Check if current user reacted with this emoji
    const myReaction = useCallback((emoji) =>
        reactions?.some(r => r.username === currentUser && r.emoji === emoji),
        [reactions, currentUser]
    );

    if (groupedReactions.length === 0) return null;

    return (
        <div style={styles.reactionsRow}>
            {groupedReactions.map(({ emoji, count }) => (
                <span
                    key={emoji}
                    onClick={() => onToggleReaction(messageId, emoji)}
                    style={{
                        ...styles.reactionTag,
                        border: myReaction(emoji) ? '1px solid #5865f2' : '1px solid transparent',
                        backgroundColor: myReaction(emoji) ? 'rgba(88, 101, 242, 0.15)' : '#2b2d31'
                    }}
                    title={`${emoji} tepkisi ekle/kaldır`}
                >
                    {emoji} {count}
                </span>
            ))}
        </div>
    );
});

const styles = {
    reactionsRow: {
        display: 'flex',
        gap: '4px',
        marginTop: '6px',
        flexWrap: 'wrap'
    },
    reactionTag: {
        backgroundColor: '#2b2d31',
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '0.85em',
        cursor: 'pointer',
        color: '#b9bbbe',
        border: '1px solid transparent',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        transition: 'all 0.15s ease'
    }
};

MessageReactions.displayName = 'MessageReactions';
export default MessageReactions;
