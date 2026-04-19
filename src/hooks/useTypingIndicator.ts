// frontend/src/hooks/useTypingIndicator.js
// 10/10 Edition: Debounced input, disconnect cleanup, max display, stale pruning
import { useState, useEffect, useCallback, useRef } from 'react';

const TYPING_TIMEOUT_MS = 5000; // Auto-expire after 5s of no updates
const DEBOUNCE_MS = 400; // Debounce input to avoid flooding WS
const MAX_DISPLAY = 4; // Max usernames shown in "typing..." indicator

const useTypingIndicator = (ws, currentRoom, currentUser) => {
    const [typingUsers, setTypingUsers] = useState([]);
    const typingTimeouts = useRef({});
    const isTyping = useRef(false);
    const typingTimeout = useRef(null);
    const debounceTimer = useRef(null);

    // Listen for typing events from WebSocket
    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'typing_indicator' || data.type === 'typing_status_update') {
                    // Normalize from both typing_indicator and typing_status_update shapes
                    const username = data.username;
                    const isStart = data.action === 'start' || data.is_typing === true;

                    // Derive room/conversation match — accept if room matches or conversation_id matches or no room specified
                    const matchesRoom =
                        !data.room ||
                        data.room === currentRoom ||
                        data.conversation_id === currentRoom;

                    // Don't show own typing
                    if (username === currentUser) return;
                    if (!matchesRoom) return;

                    if (isStart) {
                        setTypingUsers((prev) => {
                            if (prev.includes(username)) return prev;
                            const next = [...prev, username];
                            return next.length > MAX_DISPLAY ? next.slice(-MAX_DISPLAY) : next;
                        });

                        // Clear existing timeout for this user
                        if (typingTimeouts.current[username]) {
                            clearTimeout(typingTimeouts.current[username]);
                        }

                        // Auto-remove after TYPING_TIMEOUT_MS
                        typingTimeouts.current[username] = setTimeout(() => {
                            setTypingUsers((prev) => prev.filter((u) => u !== username));
                            delete typingTimeouts.current[username];
                        }, TYPING_TIMEOUT_MS);
                    } else {
                        // Stop
                        setTypingUsers((prev) => prev.filter((u) => u !== username));
                        if (typingTimeouts.current[username]) {
                            clearTimeout(typingTimeouts.current[username]);
                            delete typingTimeouts.current[username];
                        }
                    }
                }

                // Handle user disconnect — remove from typing list
                if (data.type === 'user_disconnected' && data.username) {
                    setTypingUsers((prev) => prev.filter((u) => u !== data.username));
                    if (typingTimeouts.current[data.username]) {
                        clearTimeout(typingTimeouts.current[data.username]);
                        delete typingTimeouts.current[data.username];
                    }
                }
            } catch (error) {
                // Malformed message — ignore silently
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
            // Cleanup all timeouts
            Object.values(typingTimeouts.current).forEach((timeout) => clearTimeout(timeout));
            typingTimeouts.current = {};
        };
    }, [ws, currentRoom, currentUser]);

    // Send typing start event (called by debounced handler, not directly)
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

        // Reset auto-stop timer
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }
        typingTimeout.current = setTimeout(() => {
            sendTypingStop();
        }, TYPING_TIMEOUT_MS);
    }, [ws, currentRoom]);

    // Send typing stop event
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

    // Handle input change — DEBOUNCED to avoid flooding WS with typing events
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
        // If already flagged as typing, send immediately; otherwisee debounce first keystroke
        if (isTyping.current) {
            // Already typing — just reset the auto-stop timer
            if (typingTimeout.current) clearTimeout(typingTimeout.current);
            typingTimeout.current = setTimeout(() => sendTypingStop(), TYPING_TIMEOUT_MS);
        }
    }, [_sendTypingStart, sendTypingStop]);

    // Cleanup on unmount or room change
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
