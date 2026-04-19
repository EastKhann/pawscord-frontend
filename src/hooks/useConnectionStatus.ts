// frontend/src/hooks/useConnectionStatus.ts
// 🔌 WebSocket Connection Status Hook
// Monitors GlobalWebSocketContext and exposes connection/reconnecting state

import { useState, useEffect, useRef } from 'react';
import { useGlobalWebSocket } from '../GlobalWebSocketContext';

interface ConnectionStatus {
    isConnected: boolean;
    isReconnecting: boolean;
    reconnectAttempts: number;
    lastDisconnectedAt: Date | null;
}

export function useConnectionStatus(): ConnectionStatus {
    const { isConnected } = useGlobalWebSocket();

    const [isReconnecting, setIsReconnecting] = useState(false);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const [lastDisconnectedAt, setLastDisconnectedAt] = useState<Date | null>(null);

    const prevConnectedRef = useRef(isConnected);
    const reconnectTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const wasConnected = prevConnectedRef.current;
        prevConnectedRef.current = isConnected;

        if (wasConnected && !isConnected) {
            setLastDisconnectedAt(new Date());
            setIsReconnecting(true);
            setReconnectAttempts(0);
            reconnectTimerRef.current = setInterval(() => {
                setReconnectAttempts((n) => n + 1);
            }, 3000);
        }

        if (!wasConnected && isConnected) {
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
