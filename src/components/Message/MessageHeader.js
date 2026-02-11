// frontend/src/components/Message/MessageHeader.js
// 📋 MESSAGE HEADER - Username, timestamp, badges

import { memo } from 'react';
import { FaLock, FaThumbtack } from 'react-icons/fa';
import { EditHistory } from './EditHistory';

// Zaman Formatlayıcı
export const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const messageDate = new Date(timestamp);
    const now = new Date();
    return messageDate.toDateString() === now.toDateString()
        ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : messageDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
};

export const MessageHeader = memo(({
    msg,
    isAdmin,
    isAIMessage,
    onViewProfile,
    messageEditHistoryUrl,
    fetchWithAuth
}) => {
    return (
        <div style={styles.messageHeader}>
            <strong style={{
                cursor: 'pointer',
                color: msg.username === '⚡ Signal Bot' ? '#5865f2' : (isAdmin ? '#f0b232' : '#fff')
            }} onClick={() => onViewProfile(msg.username)}>
                {isAIMessage && '🤖 '} {msg.username}
            </strong>

            {/* Lock Icon - Mesaj kilitli ise */}
            {msg.is_locked && (
                <FaLock
                    style={{
                        marginLeft: 8,
                        color: '#f0b232',
                        fontSize: '0.9em'
                    }}
                    title="Locked by moderator - Cannot be edited or deleted"
                />
            )}

            <span style={styles.timestamp}>
                {formatTimestamp(msg.timestamp)}
                {msg.is_edited && (
                    <EditHistory
                        messageId={msg.id}
                        messageEditHistoryUrl={messageEditHistoryUrl}
                        fetchWithAuth={fetchWithAuth}
                    />
                )}
                {msg.is_pinned && (
                    <FaThumbtack style={{ marginLeft: 5, color: '#f0b232', fontSize: '0.8em' }} />
                )}
            </span>
        </div>
    );
});

const styles = {
    messageHeader: {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: '4px',
        gap: '8px'
    },
    timestamp: {
        fontSize: '0.75rem',
        color: '#949ba4',
        fontWeight: '400'
    }
};

MessageHeader.displayName = 'MessageHeader';
export default MessageHeader;
