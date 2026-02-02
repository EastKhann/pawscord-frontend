// frontend/src/components/TypingIndicator/TypingIndicator.js

import React, { useState, useEffect } from 'react';
import './TypingIndicator.css';

/**
 * ⌨️ Typing Indicator Component
 * Shows who is currently typing in the channel
 */

const TypingIndicator = ({ roomId, websocket, currentUserId }) => {
    const [typingUsers, setTypingUsers] = useState([]);

    useEffect(() => {
        if (!websocket) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'typing_start' && data.room_id === roomId) {
                    if (data.user_id !== currentUserId) {
                        setTypingUsers(prev => {
                            if (!prev.find(u => u.id === data.user_id)) {
                                return [...prev, {
                                    id: data.user_id,
                                    username: data.username,
                                    avatar: data.avatar,
                                    timestamp: Date.now()
                                }];
                            }
                            return prev;
                        });
                    }
                }

                if (data.type === 'typing_stop' && data.room_id === roomId) {
                    setTypingUsers(prev => prev.filter(u => u.id !== data.user_id));
                }
            } catch (e) {
                console.error('Typing indicator error:', e);
            }
        };

        websocket.addEventListener('message', handleMessage);

        // Clean up stale typing indicators (after 5 seconds)
        const cleanupInterval = setInterval(() => {
            const now = Date.now();
            setTypingUsers(prev => prev.filter(u => now - u.timestamp < 5000));
        }, 1000);

        return () => {
            websocket.removeEventListener('message', handleMessage);
            clearInterval(cleanupInterval);
        };
    }, [websocket, roomId, currentUserId]);

    // Clear when room changes
    useEffect(() => {
        setTypingUsers([]);
    }, [roomId]);

    if (typingUsers.length === 0) return null;

    const formatTypingText = () => {
        if (typingUsers.length === 1) {
            return `${typingUsers[0].username} is typing`;
        } else if (typingUsers.length === 2) {
            return `${typingUsers[0].username} and ${typingUsers[1].username} are typing`;
        } else if (typingUsers.length === 3) {
            return `${typingUsers[0].username}, ${typingUsers[1].username}, and ${typingUsers[2].username} are typing`;
        } else {
            return `${typingUsers.length} users are typing`;
        }
    };

    return (
        <div className="typing-indicator">
            <div className="typing-avatars">
                {typingUsers.slice(0, 3).map(user => (
                    <img
                        key={user.id}
                        src={user.avatar || '/default-avatar.png'}
                        alt={user.username}
                        className="typing-avatar"
                    />
                ))}
            </div>
            <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span className="typing-text">{formatTypingText()}</span>
        </div>
    );
};

/**
 * 👁️ Read Receipts Component
 * Shows who has read a message
 */

export const ReadReceipts = ({ messageId, readers = [], maxDisplay = 5 }) => {
    if (!readers || readers.length === 0) return null;

    const displayReaders = readers.slice(0, maxDisplay);
    const remainingCount = readers.length - maxDisplay;

    return (
        <div className="read-receipts">
            <div className="read-avatars">
                {displayReaders.map(reader => (
                    <img
                        key={reader.id}
                        src={reader.avatar || '/default-avatar.png'}
                        alt={reader.username}
                        title={`Read by ${reader.username}`}
                        className="read-avatar"
                    />
                ))}
                {remainingCount > 0 && (
                    <span className="read-more" title={`+${remainingCount} more`}>
                        +{remainingCount}
                    </span>
                )}
            </div>
        </div>
    );
};

/**
 * 🔔 Send Typing Indicator Hook
 */

export const useTypingIndicator = (websocket, roomId, userId) => {
    const [isTyping, setIsTyping] = useState(false);
    const timeoutRef = React.useRef(null);

    const sendTypingStart = () => {
        if (!isTyping && websocket && websocket.readyState === WebSocket.OPEN) {
            setIsTyping(true);
            websocket.send(JSON.stringify({
                type: 'typing_start',
                room_id: roomId,
                user_id: userId
            }));
        }

        // Reset timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Stop typing after 3 seconds of inactivity
        timeoutRef.current = setTimeout(() => {
            sendTypingStop();
        }, 3000);
    };

    const sendTypingStop = () => {
        if (isTyping && websocket && websocket.readyState === WebSocket.OPEN) {
            setIsTyping(false);
            websocket.send(JSON.stringify({
                type: 'typing_stop',
                room_id: roomId,
                user_id: userId
            }));
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            sendTypingStop();
        };
    }, []);

    return { sendTypingStart, sendTypingStop, isTyping };
};

export default TypingIndicator;
