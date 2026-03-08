// frontend/src/hooks/useConnectionStatus.js
// 🔌 WebSocket Connection Status Hook
// Monitors GlobalWebSocketContext and exposes connection/reconnecting state

import { useState, useEffect, useRef } from 'react';
import { useGlobalWebSocket } from '../GlobalWebSocketContext';

/**
 * useConnectionStatus
 *
 * Returns:
 *   isConnected  – live boolean from GlobalWebSocketContext
 *   isReconnecting – true if we lost connection and are trying to recover
 *   reconnectAttempts – how many times we've tried since last disconnect
 *   lastDisconnectedAt – Date | null
 */
export function useConnectionStatus() {
    const { isConnected } = useGlobalWebSocket();

    const [isReconnecting, setIsReconnecting] = useState(false);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const [lastDisconnectedAt, setLastDisconnectedAt] = useState(null);

    // Track previous connection state to detect transitions
    const prevConnectedRef = useRef(isConnected);
    const reconnectTimerRef = useRef(null);

    useEffect(() => {
        const wasConnected = prevConnectedRef.current;
        prevConnectedRef.current = isConnected;

        if (wasConnected && !isConnected) {
            // Just lost connection
            setLastDisconnectedAt(new Date());
            setIsReconnecting(true);
            setReconnectAttempts(0);

            // Increment attempt counter every 3 s while disconnected
            reconnectTimerRef.current = setInterval(() => {
                setReconnectAttempts((n) => n + 1);
            }, 3000);
        }

        if (!wasConnected && isConnected) {
            // Reconnected successfully
            setIsReconnecting(false);
            setReconnectAttempts(0);
            if (reconnectTimerRef.current) {
                clearInterval(reconnectTimerRef.current);
                reconnectTimerRef.current = null;
            }
        }

        return () => {
            if (reconnectTimerRef.current) {
                clearInterval(reconnectTimerRef.current);
            }
        };
    }, [isConnected]);

    return { isConnected, isReconnecting, reconnectAttempts, lastDisconnectedAt };
}

export default useConnectionStatus;
