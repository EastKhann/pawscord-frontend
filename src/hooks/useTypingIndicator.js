// frontend/src/hooks/useTypingIndicator.js
import { useState, useEffect, useCallback, useRef } from 'react';

const useTypingIndicator = (ws, currentRoom, currentUser) => {
    const [typingUsers, setTypingUsers] = useState([]);
    const typingTimeouts = useRef({});
    const isTyping = useRef(false);
    const typingTimeout = useRef(null);

    // Listen for typing events from WebSocket
    useEffect(() => {
        if (!ws) return;

        const handleMessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === 'typing_indicator' && data.room === currentRoom) {
                    const { username, action } = data;

                    // Don't show own typing
                    if (username === currentUser) return;

                    if (action === 'start') {
                        // Add user to typing list
                        setTypingUsers(prev => {
                            if (!prev.includes(username)) {
                                return [...prev, username];
                            }
                            return prev;
                        });

                        // Clear existing timeout for this user
                        if (typingTimeouts.current[username]) {
                            clearTimeout(typingTimeouts.current[username]);
                        }

                        // Auto-remove after 5 seconds
                        typingTimeouts.current[username] = setTimeout(() => {
                            setTypingUsers(prev => prev.filter(u => u !== username));
                            delete typingTimeouts.current[username];
                        }, 5000);
                    } else if (action === 'stop') {
                        // Remove user from typing list
                        setTypingUsers(prev => prev.filter(u => u !== username));
                        if (typingTimeouts.current[username]) {
                            clearTimeout(typingTimeouts.current[username]);
                            delete typingTimeouts.current[username];
                        }
                    }
                }
            } catch (error) {
                console.error('Typing indicator error:', error);
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
            // Cleanup all timeouts
            Object.values(typingTimeouts.current).forEach(timeout => clearTimeout(timeout));
            typingTimeouts.current = {};
        };
    }, [ws, currentRoom, currentUser]);

    // Send typing start event
    const sendTypingStart = useCallback(() => {
        if (!ws || !currentRoom || ws.readyState !== WebSocket.OPEN) return;

        if (!isTyping.current) {
            ws.send(JSON.stringify({
                type: 'typing_start',
                room: currentRoom
            }));
            isTyping.current = true;
        }

        // Clear existing timeout
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }

        // Auto-stop after 5 seconds
        typingTimeout.current = setTimeout(() => {
            sendTypingStop();
        }, 5000);
    }, [ws, currentRoom]);

    // Send typing stop event
    const sendTypingStop = useCallback(() => {
        if (!ws || !currentRoom || ws.readyState !== WebSocket.OPEN) return;

        if (isTyping.current) {
            ws.send(JSON.stringify({
                type: 'typing_stop',
                room: currentRoom
            }));
            isTyping.current = false;
        }

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
            typingTimeout.current = null;
        }
    }, [ws, currentRoom]);

    // Handle input change (call this from message input onChange)
    const handleTyping = useCallback(() => {
        sendTypingStart();
    }, [sendTypingStart]);

    // Cleanup on unmount or room change
    useEffect(() => {
        return () => {
            sendTypingStop();
        };
    }, [currentRoom, sendTypingStop]);

    return {
        typingUsers,
        handleTyping,
        sendTypingStop
    };
};

export default useTypingIndicator;



