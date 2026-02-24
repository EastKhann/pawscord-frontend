// frontend/src/hooks/useReadReceipts.js
// 10/10 Edition: Batched sends, room cleanup, bounded state, dedup, timeout cleanup
import { useState, useEffect, useCallback, useRef } from 'react';

const MAX_TRACKED_MESSAGES = 500;  // Limit state size to prevent memory leak
const VISIBILITY_DELAY_MS = 800;   // Time message must be visible before marking read
const BATCH_INTERVAL_MS = 1200;    // Batch read receipts every 1.2s

const useReadReceipts = (ws, currentRoom, currentUser) => {
    const [messageStatuses, setMessageStatuses] = useState({});
    const observerRef = useRef(null);
    const sentReceiptIds = useRef(new Set());  // Track what we've already sent to prevent duplicate sends
    const pendingReads = useRef([]);           // Batch buffer
    const batchTimerRef = useRef(null);
    const visibilityTimers = useRef(new Map()); // Track individual message visibility timers

    // Listen for read receipt events from WebSocket
    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Handle read receipts
                if (data.type === 'read_receipt') {
                    const { message_id, username, read_at } = data;

                    // Don't track own reads
                    if (username === currentUser) return;

                    setMessageStatuses(prev => {
                        const current = prev[message_id] || { status: 'sent', readBy: [] };
                        const readBy = current.readBy || [];
                        // Dedup reader
                        if (readBy.includes(username)) return prev;

                        const updated = {
                            ...prev,
                            [message_id]: {
                                status: 'read',
                                readBy: [...readBy, username],
                                readAt: read_at
                            }
                        };

                        // Prune oldest entries if beyond max
                        const keys = Object.keys(updated);
                        if (keys.length > MAX_TRACKED_MESSAGES) {
                            const toRemove = keys.slice(0, keys.length - MAX_TRACKED_MESSAGES);
                            for (const k of toRemove) delete updated[k];
                        }

                        return updated;
                    });
                }

                // Handle new messages sent by current user
                if (data.type === 'chat_message' || data.type === 'dm_message') {
                    const { id, username } = data;
                    if (username === currentUser && id) {
                        setMessageStatuses(prev => ({
                            ...prev,
                            [id]: { status: 'sent', readBy: [] }
                        }));
                    }
                }
            } catch (error) {
                // Malformed message — ignore
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [ws, currentUser]);

    // Flush pending batch
    const flushBatch = useCallback(() => {
        if (pendingReads.current.length === 0) return;

        const toSend = [...pendingReads.current];
        pendingReads.current = [];

        if (!ws || ws.readyState !== WebSocket.OPEN) return;

        // Send each as individual message_read via WS
        for (const { messageId } of toSend) {
            ws.send(JSON.stringify({
                type: 'message_read',
                message_id: messageId,
                room: currentRoom,
            }));
        }
    }, [ws, currentRoom]);

    // Send read receipt when message is visible (batched + deduped)
    const markMessageAsRead = useCallback((messageId, messageUsername) => {
        if (!ws || !currentRoom || ws.readyState !== WebSocket.OPEN) return;
        // Don't send read receipt for own messages
        if (messageUsername === currentUser) return;
        // Dedup: don't send again for this message
        if (sentReceiptIds.current.has(messageId)) return;

        sentReceiptIds.current.add(messageId);

        // Add to batch buffer
        pendingReads.current.push({ messageId });

        // Schedule batch flush
        if (!batchTimerRef.current) {
            batchTimerRef.current = setTimeout(() => {
                batchTimerRef.current = null;
                flushBatch();
            }, BATCH_INTERVAL_MS);
        }

        // Optimistic update
        setMessageStatuses(prev => ({
            ...prev,
            [messageId]: {
                ...prev[messageId],
                status: 'delivered'
            }
        }));
    }, [ws, currentRoom, currentUser, flushBatch]);

    // Intersection Observer for auto-marking messages as read
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const messageId = entry.target.dataset?.messageId;
                    const messageUsername = entry.target.dataset?.messageUsername;

                    if (entry.isIntersecting && messageId && messageUsername) {
                        // Dedup check before even scheduling
                        if (sentReceiptIds.current.has(messageId)) return;

                        // Use a tracked timer per message
                        if (!visibilityTimers.current.has(messageId)) {
                            const timer = setTimeout(() => {
                                visibilityTimers.current.delete(messageId);
                                markMessageAsRead(messageId, messageUsername);
                            }, VISIBILITY_DELAY_MS);
                            visibilityTimers.current.set(messageId, timer);
                        }
                    } else if (!entry.isIntersecting && messageId) {
                        // Message left viewport — cancel pending timer
                        const timer = visibilityTimers.current.get(messageId);
                        if (timer) {
                            clearTimeout(timer);
                            visibilityTimers.current.delete(messageId);
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
            // Clear all pending visibility timers
            for (const timer of visibilityTimers.current.values()) {
                clearTimeout(timer);
            }
            visibilityTimers.current.clear();
        };
    }, [markMessageAsRead]);

    // Cleanup on room change: flush batch, clear dedup set, reset state
    useEffect(() => {
        return () => {
            flushBatch();
            if (batchTimerRef.current) {
                clearTimeout(batchTimerRef.current);
                batchTimerRef.current = null;
            }
            sentReceiptIds.current.clear();
            pendingReads.current = [];
        };
    }, [currentRoom, flushBatch]);

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



