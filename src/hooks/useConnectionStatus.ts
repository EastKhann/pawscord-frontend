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

/** Shape returned by the JS-authored GlobalWebSocketContext provider. */
interface GlobalWebSocketContextValue {
    isConnected: boolean;
    setIsConnected: (value: boolean) => void;
    globalData: unknown;
    setGlobalData: (data: unknown) => void;
    unreadGlobal: number;
    setUnreadGlobal: (value: number) => void;
}

export function useConnectionStatus(): ConnectionStatus {
    // useGlobalWebSocket is from a JS context with `null` as createContext default;
    // the runtime value is always the provider object.
    const { isConnected } = (useGlobalWebSocket() as GlobalWebSocketContextValue | null) ?? { isConnected: false };

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
