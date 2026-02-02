// frontend/src/WebSocketContext.js
import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children, username, isAuthenticated, activeChat }) => {
    const ws = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);

    // URL Ayarları (App.js'den alınan sabitler veya parametreler)
    const WS_PROTOCOL = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const API_HOST = window.location.host.replace('3000', '8888'); // Basit bir hack, App.js'deki logic daha iyi

    useEffect(() => {
        if (!isAuthenticated || !activeChat.id || !username) return;

        // Önceki bağlantıyı kapat
        if (ws.current) ws.current.close();

        const token = localStorage.getItem('access_token');
        const tokenParam = token ? `&token=${token}` : '';
        const encodedUsername = encodeURIComponent(username);

        let url = '';
        if (activeChat.type === 'room') {
            url = `${WS_PROTOCOL}://${API_HOST}/ws/chat/${activeChat.id}/?username=${encodedUsername}${tokenParam}`;
        } else if (activeChat.type === 'dm') {
            url = `${WS_PROTOCOL}://${API_HOST}/ws/dm/${activeChat.id}/?username=${encodedUsername}${tokenParam}`;
        }

        const newWs = new WebSocket(url);
        ws.current = newWs;

        newWs.onopen = () => setIsConnected(true);
        newWs.onclose = () => setIsConnected(false);
        newWs.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setLastMessage(data); // Gelen mesajı state'e at, App.js bunu useEffect ile dinleyecek
        };

        return () => {
            if (newWs) newWs.close();
        };
    }, [activeChat, isAuthenticated, username, API_HOST, WS_PROTOCOL]);

    const sendMessage = useCallback((payload) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(payload));
        } else {
            console.warn("WebSocket bağlı değil, mesaj gönderilemedi.");
        }
    }, []);

    return (
        <WebSocketContext.Provider value={{ isConnected, lastMessage, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);

