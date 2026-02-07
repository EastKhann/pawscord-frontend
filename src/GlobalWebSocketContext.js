// frontend/src/GlobalWebSocketContext.js
// 🚀 PERF: This context NO LONGER opens its own WebSocket.
// App.js statusWS is the SINGLE connection to /ws/status/.
// App.js forwards messages here via setGlobalData so consumers still work.

import React, { createContext, useContext, useState, useCallback } from 'react';

const GlobalWebSocketContext = createContext(null);

export const GlobalWebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [globalData, setGlobalData] = useState(null);
    const [unreadGlobal, setUnreadGlobal] = useState(0);

    // 🚀 PERF: Signal Bot notification logic — called by App.js when forwarding WS messages
    const handleGlobalData = useCallback((data) => {
        setGlobalData(data);

        // --- ÖZEL BİLDİRİM MANTIĞI ---
        if (data.type === 'chat_message_handler' && data.username === '⚡ Signal Bot') {
            if (typeof Notification !== 'undefined' && Notification.permission === "granted" && document.hidden) {
                new Notification("🚨 YENİ KRİPTO SİNYALİ!", {
                    body: `${data.content.split('\n')[2]}`,
                    icon: '/logo192.png'
                });
            }
            setUnreadGlobal(prev => prev + 1);
        }
    }, []);

    return (
        <GlobalWebSocketContext.Provider value={{
            isConnected, setIsConnected,
            globalData, setGlobalData: handleGlobalData,
            unreadGlobal, setUnreadGlobal
        }}>
            {children}
        </GlobalWebSocketContext.Provider>
    );
};

export const useGlobalWebSocket = () => useContext(GlobalWebSocketContext);

