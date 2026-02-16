// frontend/src/hooks/useReadReceipts.js
import { useState, useEffect, useCallback, useRef } from 'react';

const useReadReceipts = (ws, currentRoom, currentUser) => {
    const [messageStatuses, setMessageStatuses] = useState({});
    const observerRef = useRef(null);
    const sentMessageIds = useRef(new Set());

    // Listen for read receipt events from WebSocket
    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Handle read receipts
                if (data.type === 'read_receipt') {
                    const { message_id, username, read_at } = data;

                    setMessageStatuses(prev => {
                        const current = prev[message_id] || { status: 'sent', readBy: [] };

                        // Don't track own reads
                        if (username === currentUser) return prev;

                        // Add to readBy list if not already there
                        const readBy = current.readBy || [];
                        if (!readBy.includes(username)) {
                            return {
                                ...prev,
                                [message_id]: {
                                    status: 'read',
                                    readBy: [...readBy, username],
                                    readAt: read_at
                                }
                            };
                        }

                        return prev;
                    });
                }

                // Handle new messages (mark as sent)
                if (data.type === 'chat_message') {
                    const { id, username } = data;

                    // Only track messages sent by current user
                    if (username === currentUser) {
                        setMessageStatuses(prev => ({
                            ...prev,
                            [id]: {
                                status: 'sent',
                                readBy: []
                            }
                        }));
                        sentMessageIds.current.add(id);
                    }
                }
            } catch (error) {
                console.error('Read receipt error:', error);
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [ws, currentUser]);

    // Send read receipt when message is visible
    const markMessageAsRead = useCallback((messageId, messageUsername) => {
        if (!ws || !currentRoom || ws.readyState !== WebSocket.OPEN) return;

        // Don't send read receipt for own messages
        if (messageUsername === currentUser) return;

        // Don't send duplicate read receipts
        if (messageStatuses[messageId]?.status === 'read') return;

        ws.send(JSON.stringify({
            type: 'message_read',
            message_id: messageId,
            room: currentRoom
        }));

        // Optimistic update
        setMessageStatuses(prev => ({
            ...prev,
            [messageId]: {
                ...prev[messageId],
                status: 'delivered'
            }
        }));
    }, [ws, currentRoom, currentUser, messageStatuses]);

    // Intersection Observer for auto-marking messages as read
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const messageId = entry.target.dataset.messageId;
                        const messageUsername = entry.target.dataset.messageUsername;

                        if (messageId && messageUsername) {
                            // Delay to ensure user actually saw it
                            setTimeout(() => {
                                markMessageAsRead(messageId, messageUsername);
                            }, 1000);
                        }
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: '0px'
            }
        );

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [markMessageAsRead]);

    // Observe message element
    const observeMessage = useCallback((element) => {
        if (element && observerRef.current) {
            observerRef.current.observe(element);
        }
    }, []);

    // Get status for a message
    const getMessageStatus = useCallback((messageId) => {
        return messageStatuses[messageId] || { status: 'sent', readBy: [] };
    }, [messageStatuses]);

    return {
        messageStatuses,
        getMessageStatus,
        markMessageAsRead,
        observeMessage
    };
};

export default useReadReceipts;



