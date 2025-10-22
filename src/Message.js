// frontend/src/Message.js (REAKSİYON SEÇİCİ EKLENDİ)

import React, { useState, useMemo } from 'react';
import ReactionPicker from './ReactionPicker';

const formatTimestamp = (timestamp) => {
    const messageDate = new Date(timestamp);
    const now = new Date();
    const isToday = messageDate.toDateString() === now.toDateString();
    if (isToday) {
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        return messageDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
    }
};

const Message = ({ msg, currentUser, onDelete, onStartEdit, onToggleReaction, onSetReply, onImageClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showReactionPicker, setShowReactionPicker] = useState(false);
    const isMyMessage = msg.username === currentUser;

    const groupedReactions = useMemo(() => {
        if (!msg.reactions) return [];
        const groups = {};
        msg.reactions.forEach(reaction => {
            if (!groups[reaction.emoji]) {
                groups[reaction.emoji] = [];
            }
            groups[reaction.emoji].push(reaction.username);
        });
        return Object.entries(groups).map(([emoji, users]) => ({ emoji, users, count: users.length }));
    }, [msg.reactions]);

    if (!msg) {
        return null;
    }

    const myReaction = (emoji) => msg.reactions?.some(r => r.username === currentUser && r.emoji === emoji);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setShowReactionPicker(false);
    };

    return (
        <div 
            style={{...styles.chatMessage, backgroundColor: isHovered ? '#32353b' : 'transparent'}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {msg.reply_to && (
                <div style={styles.replyContainer}>
                    <div style={styles.replyLine}></div>
                    <span style={styles.replyUsername}>@{msg.reply_to.username}</span>
                    <span style={styles.replyContent}>{msg.reply_to.content}</span>
                </div>
            )}

            <div style={styles.messageHeader}>
                <strong>{msg.username}</strong>
                <span style={styles.timestamp}>
                    ({msg.timestamp ? formatTimestamp(msg.timestamp) : 'Şimdi'})
                    {msg.is_edited && <span style={styles.editedText}> (düzenlendi)</span>}
                </span>
            </div>
            
            {(msg.content) && <p style={styles.messageContent}>{msg.content}</p>}
            {msg.image_url && <img src={msg.image_url} alt="Yüklenen Resim" style={styles.messageImage} onClick={() => onImageClick(msg.image_url)} />}

            {groupedReactions.length > 0 && (
                <div style={styles.reactionsContainer}>
                    {groupedReactions.map(({ emoji, users, count }) => (
                        <div 
                            key={emoji} 
                            style={{...styles.reaction, backgroundColor: myReaction(emoji) ? '#5865f2' : '#40444b' }} 
                            title={users.join(', ')}
                            onClick={() => onToggleReaction(msg.id, emoji)}
                        >
                            {emoji} {count}
                        </div>
                    ))}
                </div>
            )}

            {isHovered && (
                <div style={styles.messageActions}>
                    {showReactionPicker && (
                        <ReactionPicker 
                            onEmojiSelect={(emoji) => onToggleReaction(msg.id, emoji)}
                            onClose={() => setShowReactionPicker(false)}
                        />
                    )}
                    <button onClick={() => setShowReactionPicker(true)} style={styles.actionButton}>🙂</button>
                    <button onClick={() => onSetReply(msg)} style={styles.actionButton}>↩️</button>
                    {isMyMessage && msg.content && <button onClick={() => onStartEdit(msg)} style={styles.actionButton}>✏️</button>}
                    {isMyMessage && <button onClick={() => onDelete(msg.id)} style={styles.actionButton}>🗑️</button>}
                </div>
            )}
        </div>
    );
};

const styles = {
    chatMessage: {
        wordWrap: 'break-word',
        backgroundColor: 'transparent',
        flex: 1,
        padding: '8px',
        borderBottom: '1px dotted #444',
        position: 'relative',
        borderRadius: '5px',
        paddingLeft: '15px'
    },
    messageHeader: { display: 'flex', alignItems: 'center', marginBottom: '3px' },
    timestamp: { fontSize: '0.75em', color: '#888', marginLeft: '10px' },
    editedText: { fontStyle: 'italic', color: '#a0a0a0', marginLeft: '5px' },
    messageContent: { margin: '0 0 5px 0', color: '#dcddde', whiteSpace: 'pre-wrap' },
    messageImage: { maxWidth: '100%', maxHeight: '300px', height: 'auto', borderRadius: '5px', marginTop: '5px', cursor: 'pointer' },
    messageActions: {
        position: 'absolute',
        top: '-15px',
        right: '10px',
        backgroundColor: '#40444b',
        borderRadius: '5px',
        padding: '2px 5px',
        display: 'flex',
        gap: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        zIndex: 50,
    },
    actionButton: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', fontSize: '1em' },
    replyContainer: {
        fontSize: '0.85em',
        color: '#b9bbbe',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '4px',
        marginLeft: '-5px',
    },
    replyLine: {
        width: '20px',
        height: '10px',
        borderLeft: '2px solid #4f545c',
        borderBottom: '2px solid #4f545c',
        borderBottomLeftRadius: '5px',
        marginRight: '8px',
    },
    replyUsername: { fontWeight: 'bold', marginRight: '5px' },
    replyContent: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    reactionsContainer: { display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' },
    reaction: {
        padding: '2px 8px',
        borderRadius: '10px',
        fontSize: '0.8em',
        cursor: 'pointer',
        color: 'white',
        border: '1px solid transparent',
    }
};

export default Message;