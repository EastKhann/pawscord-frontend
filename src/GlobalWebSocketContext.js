// frontend/src/GlobalWebSocketContext.js
// 🚀 PERF: This context NO LONGER opens its own WebSocket.
// App.js statusWS is the SINGLE connection to /ws/status/.
// App.js forwards messages here via setGlobalData so consumers still work.

// Accessibility (aria): N/A for this module (hook/context/utility — no rendered DOM)
// aria-label: n/a — hook/context/utility module, no directly rendered JSX
import { createContext, useContext, useState, useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';
import logger from './utils/logger';

const GlobalWebSocketContext = createContext(null);

export const GlobalWebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [globalData, setGlobalData] = useState(null);
    const [unreadGlobal, setUnreadGlobal] = useState(0);

    // 🚀 PERF: Signal Bot notification logic — called by App.js when forwarding WS messages
    const handleGlobalData = useCallback((data) => {
        try {
            setGlobalData(data);

            if (data?.type === 'chat_message_handler' && data?.username === '⚡ Signal Bot') {
                if (
                    typeof Notification !== 'undefined' &&
                    Notification.permission === 'granted' &&
                    document.hidden
                ) {
                    const bodyLine = data.content?.split('\n')?.[2] || '';
                    new Notification('🚨 New Crypto Signal!', {
                        body: bodyLine,
                        icon: '/logo192.png',
                    });
                }
                setUnreadGlobal((prev) => prev + 1);
            }
        } catch (err) {
            if (import.meta.env.DEV) logger.error('handleGlobalData error:', err);
        }
    }, []);

    const contextValue = useMemo(
        () => ({
            isConnected,
            setIsConnected,
            globalData,
            setGlobalData: handleGlobalData,
            unreadGlobal,
            setUnreadGlobal,
        }),
        [isConnected, globalData, unreadGlobal, handleGlobalData]
    );

    return (
        <GlobalWebSocketContext.Provider value={contextValue}>
            {children}
        </GlobalWebSocketContext.Provider>
    );
};

export const useGlobalWebSocket = () => useContext(GlobalWebSocketContext);

GlobalWebSocketContext.propTypes = {
    children: PropTypes.array,
};
