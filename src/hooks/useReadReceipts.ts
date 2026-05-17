// frontend/src/hooks/useReadReceipts.js
// 10/10 Edition: Batched sends, room cleanup, bounded state, dedup, timeout cleanup
import { useState, useEffect, useCallback, useRef } from 'react';

const MAX_TRACKED_MESSAGES = 500;
const VISIBILITY_DELAY_MS = 800;
const BATCH_INTERVAL_MS = 1200;

interface MessageStatus {
    status: 'sent' | 'delivered' | 'read';
    readBy: string[];
    readAt?: string;
}

interface PendingRead {
    messageId: string;
}

const useReadReceipts = (
    ws: WebSocket | null | undefined,
    currentRoom: string | number | null | undefined,
    currentUser: string | null | undefined
) => {
    const [messageStatuses, setMessageStatuses] = useState<Record<string, MessageStatus>>({});
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentReceiptIds = useRef(new Set<string>());
    const pendingReads = useRef<PendingRead[]>([]);
    const batchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const visibilityTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data as string);

                if (data.type === 'read_receipt') {
                    const { message_id, username, read_at } = data as { message_id: string; username: string; read_at: string };

                    if (username === currentUser) return;

                    setMessageStatuses((prev) => {
                        const current = prev[message_id] || { status: 'sent', readBy: [] };
                        const readBy = current.readBy || [];
                        if (readBy.includes(username)) return prev;

                        const updated: Record<string, MessageStatus> = {
                            ...prev,
                            [message_id]: {
                                status: 'read',
                                readBy: [...readBy, username],
                                readAt: read_at,
                            },
                        };

                        const keys = Object.keys(updated);
                        if (keys.length > MAX_TRACKED_MESSAGES) {
                            const toRemove = keys.slice(0, keys.length - MAX_TRACKED_MESSAGES);
                            for (const k of toRemove) delete updated[k];
                        }

                        return updated;
                    });
                }

                if (data.type === 'chat_message' || data.type === 'dm_message') {
                    const { id, username } = data as { id: string | number; username: string };
                    if (username === currentUser && id) {
                        setMessageStatuses((prev) => ({
                            ...prev,
                            [String(id)]: { status: 'sent', readBy: [] },
                        }));
                    }
                }
            } catch {
                // Malformed message — ignore
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [ws, currentUser]);

    const flushBatch = useCallback(() => {
        if (pendingReads.current.length === 0) return;

        const toSend = [...pendingReads.current];
        pendingReads.current = [];

        if (!ws || ws.readyState !== WebSocket.OPEN) return;

        for (const { messageId } of toSend) {
            ws.send(
                JSON.stringify({
                    type: 'message_read',
                    message_id: messageId,
                    room: currentRoom,
                })
            );
        }
    }, [ws, currentRoom]);

    const markMessageAsRead = useCallback(
        (messageId: string, messageUsername: string) => {
            if (!ws || !currentRoom || ws.readyState !== WebSocket.OPEN) return;
            if (messageUsername === currentUser) return;
            if (sentReceiptIds.current.has(messageId)) return;

            sentReceiptIds.current.add(messageId);
            pendingReads.current.push({ messageId });

            if (!batchTimerRef.current) {
                batchTimerRef.current = setTimeout(() => {
                    batchTimerRef.current = null;
                    flushBatch();
                }, BATCH_INTERVAL_MS);
            }

            setMessageStatuses((prev) => ({
                ...prev,
                [messageId]: {
                    ...prev[messageId],
                    status: 'delivered',
                },
            }));
        },
        [ws, currentRoom, currentUser, flushBatch]
    );

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLElement;
                    const messageId = target.dataset?.messageId;
                    const messageUsername = target.dataset?.messageUsername;

                    if (entry.isIntersecting && messageId && messageUsername) {
                        if (sentReceiptIds.current.has(messageId)) return;

                        if (!visibilityTimers.current.has(messageId)) {
                            const timer = setTimeout(() => {
                                visibilityTimers.current.delete(messageId);
                                markMessageAsRead(messageId, messageUsername);
                            }, VISIBILITY_DELAY_MS);
                            visibilityTimers.current.set(messageId, timer);
                        }
                    } else if (!entry.isIntersecting && messageId) {
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
                rootMargin: '0px',
            }
        );

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            for (const timer of visibilityTimers.current.values()) {
                clearTimeout(timer);
            }
            visibilityTimers.current.clear();
        };
    }, [markMessageAsRead]);

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

    const observeMessage = useCallback((element: Element | null) => {
        if (element && observerRef.current) {
            observerRef.current.observe(element);
        }
    }, []);

    const getMessageStatus = useCallback(
        (messageId: string): MessageStatus => {
            return messageStatuses[messageId] || { status: 'sent', readBy: [] };
        },
        [messageStatuses]
    );

    return {
        messageStatuses,
        getMessageStatus,
        markMessageAsRead,
        observeMessage,
    };
};

export default useReadReceipts;
