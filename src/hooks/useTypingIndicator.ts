// frontend/src/hooks/useTypingIndicator.js
// 10/10 Edition: Debounced input, disconnect cleanup, max display, stale pruning
import { useState, useEffect, useCallback, useRef } from 'react';

const TYPING_TIMEOUT_MS = 5000; // Auto-expire after 5s of no updates
const DEBOUNCE_MS = 400; // Debounce input to avoid flooding WS
const MAX_DISPLAY = 4; // Max usernames shown in "typing..." indicator

const useTypingIndicator = (
    ws: WebSocket | null | undefined,
    currentRoom: string | number | null | undefined,
    currentUser: string | null | undefined
) => {
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const typingTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
    const isTyping = useRef(false);
    const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Listen for typing events from WebSocket
    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data as string);

                if (data.type === 'typing_indicator' || data.type === 'typing_status_update') {
                    const username = data.username as string;
                    const isStart = data.action === 'start' || data.is_typing === true;

                    const matchesRoom =
                        !data.room ||
                        data.room === currentRoom ||
                        data.conversation_id === currentRoom;

                    if (username === currentUser) return;
                    if (!matchesRoom) return;

                    if (isStart) {
                        setTypingUsers((prev) => {
                            if (prev.includes(username)) return prev;
                            const next = [...prev, username];
                            return next.length > MAX_DISPLAY ? next.slice(-MAX_DISPLAY) : next;
                        });

                        if (typingTimeouts.current[username]) {
                            clearTimeout(typingTimeouts.current[username]);
                        }

                        typingTimeouts.current[username] = setTimeout(() => {
                            setTypingUsers((prev) => prev.filter((u) => u !== username));
                            delete typingTimeouts.current[username];
                        }, TYPING_TIMEOUT_MS);
                    } else {
                        setTypingUsers((prev) => prev.filter((u) => u !== username));
                        if (typingTimeouts.current[username]) {
                            clearTimeout(typingTimeouts.current[username]);
                            delete typingTimeouts.current[username];
                        }
                    }
                }

                if (data.type === 'user_disconnected' && data.username) {
                    const username = data.username as string;
                    setTypingUsers((prev) => prev.filter((u) => u !== username));
                    if (typingTimeouts.current[username]) {
                        clearTimeout(typingTimeouts.current[username]);
                        delete typingTimeouts.current[username];
                    }
                }
            } catch {
                // Malformed message — ignore silently
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
            Object.values(typingTimeouts.current).forEach((timeout) => clearTimeout(timeout));
            typingTimeouts.current = {};
        };
    }, [ws, currentRoom, currentUser]);

    const _sendTypingStart = useCallback(() => {
        if (!ws || !currentRoom || ws.readyState !== WebSocket.OPEN) return;

        if (!isTyping.current) {
            ws.send(
                JSON.stringify({
                    type: 'typing_start',
                    room: currentRoom,
                })
            );
            isTyping.current = true;
        }

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }
        typingTimeout.current = setTimeout(() => {
            sendTypingStop();
        }, TYPING_TIMEOUT_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ws, currentRoom]);

    const sendTypingStop = useCallback(() => {
        if (!ws || !currentRoom || ws.readyState !== WebSocket.OPEN) return;

        if (isTyping.current) {
            ws.send(
                JSON.stringify({
                    type: 'typing_stop',
                    room: currentRoom,
                })
            );
            isTyping.current = false;
        }

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
            typingTimeout.current = null;
        }

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
            debounceTimer.current = null;
        }
    }, [ws, currentRoom]);

    const handleTyping = useCallback(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(
            () => {
                _sendTypingStart();
                debounceTimer.current = null;
            },
            isTyping.current ? 0 : DEBOUNCE_MS
        );
        if (isTyping.current) {
            if (typingTimeout.current) clearTimeout(typingTimeout.current);
            typingTimeout.current = setTimeout(() => sendTypingStop(), TYPING_TIMEOUT_MS);
        }
    }, [_sendTypingStart, sendTypingStop]);

    useEffect(() => {
        return () => {
            sendTypingStop();
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
                debounceTimer.current = null;
            }
        };
    }, [currentRoom, sendTypingStop]);

    return {
        typingUsers,
        handleTyping,
        sendTypingStop,
    };
};

export default useTypingIndicator;
