// frontend/src/components/MessageReactions.js
import React, { useState, useCallback, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';

const QUICK_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '🔥'];

const MessageReactions = ({
    reactions = [],
    currentUserId,
    onAddReaction,
    onRemoveReaction,
    messageId
}) => {
    const [showPicker, setShowPicker] = useState(false);

    // 🎯 Reaction'ları grupla ve say
    const groupedReactions = useMemo(() => {
        const grouped = {};

        reactions.forEach(reaction => {
            if (!grouped[reaction.emoji]) {
                grouped[reaction.emoji] = {
                    emoji: reaction.emoji,
                    count: 0,
                    users: [],
                    hasCurrentUser: false
                };
            }

            grouped[reaction.emoji].count++;
            grouped[reaction.emoji].users.push(reaction.user);

            if (reaction.user_id === currentUserId) {
                grouped[reaction.emoji].hasCurrentUser = true;
            }
        });

        return Object.values(grouped);
    }, [reactions, currentUserId]);

    // ✨ Reaction ekle/çıkar toggle
    const handleReactionClick = useCallback((emoji) => {
        const existingReaction = groupedReactions.find(r => r.emoji === emoji);

        if (existingReaction?.hasCurrentUser) {
            // Mevcut reaction'ı kaldır
            const userReaction = reactions.find(
                r => r.emoji === emoji && r.user_id === currentUserId
            );
            if (userReaction && onRemoveReaction) {
                onRemoveReaction(messageId, userReaction.id);
            }
        } else {
            // Yeni reaction ekle
            if (onAddReaction) {
                onAddReaction(messageId, emoji);
            }
        }

        setShowPicker(false);
    }, [groupedReactions, reactions, currentUserId, messageId, onAddReaction, onRemoveReaction]);

    // 🎨 Kullanıcı listesi tooltip metni oluştur
    const getTooltipText = (reactionGroup) => {
        const userNames = reactionGroup.users.map(u => u.display_name || u.username);

        if (userNames.length === 1) {
            return userNames[0];
        } else if (userNames.length === 2) {
            return `${userNames[0]} ve ${userNames[1]}`;
        } else if (userNames.length <= 5) {
            return userNames.join(', ');
        } else {
            const shown = userNames.slice(0, 3).join(', ');
            return `${shown} ve ${userNames.length - 3} kişi daha`;
        }
    };

    if (groupedReactions.length === 0 && !showPicker) {
        return null;
    }

    return (
        <div style={styles.container}>
            {/* Mevcut Reactions */}
            {groupedReactions.map((reactionGroup, index) => (
                <button
                    key={index}
                    onClick={() => handleReactionClick(reactionGroup.emoji)}
                    style={{
                        ...styles.reactionButton,
                        ...(reactionGroup.hasCurrentUser ? styles.reactionButtonActive : {})
                    }}
                    title={getTooltipText(reactionGroup)}
                >
                    <span style={styles.emoji}>{reactionGroup.emoji}</span>
                    <span style={styles.count}>{reactionGroup.count}</span>
                </button>
            ))}

            {/* Add Reaction Button */}
            <button
                onClick={() => setShowPicker(!showPicker)}
                style={styles.addButton}
                title="Tepki ekle"
            >
                <FaPlus style={{ fontSize: '10px' }} />
            </button>

            {/* Quick Emoji Picker */}
            {showPicker && (
                <div style={styles.quickPicker}>
                    {QUICK_REACTIONS.map((emoji, index) => (
                        <button
                            key={index}
                            onClick={() => handleReactionClick(emoji)}
                            style={styles.quickEmoji}
                            title={emoji}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        marginTop: '6px',
        position: 'relative',
    },
    reactionButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 8px',
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        border: '1px solid rgba(88, 101, 242, 0.3)',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '13px',
        color: '#dcddde',
    },
    reactionButtonActive: {
        backgroundColor: 'rgba(88, 101, 242, 0.25)',
        borderColor: '#5865f2',
        boxShadow: '0 0 8px rgba(88, 101, 242, 0.3)',
    },
    emoji: {
        fontSize: '14px',
        lineHeight: 1,
    },
    count: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#dcddde',
    },
    addButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        backgroundColor: 'rgba(185, 187, 190, 0.1)',
        border: '1px solid rgba(185, 187, 190, 0.3)',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all 0.2s',
        color: '#b9bbbe',
    },
    quickPicker: {
        position: 'absolute',
        top: '100%',
        left: 0,
        marginTop: '4px',
        display: 'flex',
        gap: '4px',
        padding: '8px',
        backgroundColor: '#2b2d31',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        zIndex: 100,
        animation: 'fadeIn 0.15s ease-out',
    },
    quickEmoji: {
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
};

// Add animation
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        button:hover {
            transform: scale(1.05);
        }
    `;
    if (!document.head.querySelector('style[data-reactions]')) {
        styleSheet.setAttribute('data-reactions', 'true');
        document.head.appendChild(styleSheet);
    }
}

export default React.memo(MessageReactions);


