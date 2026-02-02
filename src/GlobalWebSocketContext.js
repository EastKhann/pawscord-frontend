// frontend/src/GlobalWebSocketContext.js

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { API_URL_BASE_STRING, WS_PROTOCOL, API_HOST } from './utils/constants';

const GlobalWebSocketContext = createContext(null);

export const GlobalWebSocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [globalData, setGlobalData] = useState(null); // Gelen son veri
    const [unreadGlobal, setUnreadGlobal] = useState(0);

    // URL Ayarları - Centralized from constants.js

    const ws = useRef(null);
    const reconnectTimeout = useRef(null);

    const connect = useCallback(() => {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        let username = "Anonymous";
        try {
            const decoded = jwtDecode(token);
            username = decoded.username;
        } catch (e) { console.error("Token decode hatası", e); }

        // Global Status kanalına bağlan
        const url = `${WS_PROTOCOL}://${API_HOST}/ws/status/?username=${encodeURIComponent(username)}&token=${token}`;

        if (ws.current) {
            ws.current.close();
        }

        const socket = new WebSocket(url);
        ws.current = socket;

        socket.onopen = () => {
            console.log("🌐 [GlobalWS] Bağlandı");
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setGlobalData(data);

            // --- ÖZEL BİLDİRİM MANTIĞI ---
            // Eğer Sinyal Botundan mesaj geldiyse ve kullanıcı başka sayfadaysa bildirim göster
            if (data.type === 'chat_message_handler' && data.username === '⚡ Signal Bot') {
                // Tarayıcı bildirimi gönder
                if (Notification.permission === "granted" && document.hidden) {
                    new Notification("🚨 YENİ KRİPTO SİNYALİ!", {
                        body: `${data.content.split('\n')[2]}`, // Coin ismini al
                        icon: '/logo192.png'
                    });
                }
                // Uygulama içi sayaç artır
                setUnreadGlobal(prev => prev + 1);
            }
        };

        socket.onclose = (e) => {
            console.log("🌐 [GlobalWS] Kapandı", e.code);
            setIsConnected(false);
            // Otomatik tekrar bağlan (5 saniye sonra)
            clearTimeout(reconnectTimeout.current);
            reconnectTimeout.current = setTimeout(connect, 5000);
        };

        socket.onerror = (err) => {
            console.error("🌐 [GlobalWS] Hata", err);
            socket.close();
        };

    }, [API_HOST, WS_PROTOCOL]);

    useEffect(() => {
        // Delay WebSocket connection to improve FCP/LCP
        const initTimer = setTimeout(() => {
            connect();
        }, 2000); // Connect after 2 seconds

        return () => {
            clearTimeout(initTimer);
            if (ws.current) ws.current.close();
            clearTimeout(reconnectTimeout.current);
        };
    }, [connect]);

    return (
        <GlobalWebSocketContext.Provider value={{ isConnected, globalData, unreadGlobal, setUnreadGlobal }}>
            {children}
        </GlobalWebSocketContext.Provider>
    );
};

export const useGlobalWebSocket = () => useContext(GlobalWebSocketContext);

