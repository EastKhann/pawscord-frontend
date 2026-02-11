import { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import { API_URL_BASE_STRING } from './utils/constants';

const AuthContext = createContext(null);

// API URL Configuration - Centralized from constants.js
const API_URL_BASE = API_URL_BASE_STRING;

export const AuthProvider = ({ children }) => {
    // 🔥 PERFORMANCE: Token varsa başlangıçta authenticated olarak başla
    const storedToken = localStorage.getItem('access_token');
    const initialAuth = (() => {
        if (!storedToken) return false;
        try {
            const decoded = jwtDecode(storedToken);
            // Sadece gerçekten geçerli token'lar için true (grace period yok)
            return decoded.exp > (Date.now() / 1000);
        } catch { return false; }
    })();

    const [user, setUser] = useState(initialAuth ? { username: localStorage.getItem('chat_username') || '' } : null);
    const [token, setToken] = useState(storedToken);
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
    const [isLoading, setIsLoading] = useState(false);
    const refreshTimerRef = useRef(null);

    // 🔄 Token Refresh Function
    const refreshAccessToken = useCallback(async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            console.warn('⚠️ [Auth] No refresh token available');
            logout();
            return false;
        }

        try {
            const response = await fetch(`${API_URL_BASE}/api/auth/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access);

                // Eğer yeni refresh token dönerse onu da kaydet
                if (data.refresh) {
                    localStorage.setItem('refresh_token', data.refresh);
                }

                const decoded = jwtDecode(data.access);
                setToken(data.access);
                setUser({ username: decoded.username });
                setIsAuthenticated(true);

                scheduleTokenRefresh(data.access);
                return true;
            } else {
                console.error('❌ [Auth] Token refresh failed:', response.status);
                logout();
                return false;
            }
        } catch (error) {
            console.error('❌ [Auth] Token refresh error:', error);
            logout();
            return false;
        }
    }, []);

    // 📅 Schedule next token refresh
    const scheduleTokenRefresh = useCallback((accessToken) => {
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
        }

        try {
            const decoded = jwtDecode(accessToken);
            const currentTime = Date.now() / 1000;
            const expiresIn = decoded.exp - currentTime;

            // Token süresi dolmadan 5 dakika önce yenile
            const refreshTime = Math.max((expiresIn - 300) * 1000, 60000); // En az 1 dakika


            refreshTimerRef.current = setTimeout(() => {
                refreshAccessToken();
            }, refreshTime);
        } catch (error) {
            console.error('❌ [Auth] Failed to schedule token refresh:', error);
        }
    }, [refreshAccessToken]);

    // Token kontrolü ve Kullanıcı set etme
    useEffect(() => {
        const checkToken = async () => {
            const storedToken = localStorage.getItem('access_token');
            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    const currentTime = Date.now() / 1000;
                    const gracePeriod = 5 * 60; // 5 dakika tolerans
                    const isTokenActuallyValid = decoded.exp > currentTime;
                    const isWithinGrace = decoded.exp > (currentTime - gracePeriod);


                    if (isTokenActuallyValid) {
                        // Token hala geçerli — direkt kullan
                        setToken(storedToken);
                        setUser({ username: decoded.username });
                        setIsAuthenticated(true);
                        localStorage.setItem('chat_username', decoded.username);

                        // Auto-refresh schedule
                        scheduleTokenRefresh(storedToken);

                    } else if (isWithinGrace) {
                        // Token expired ama grace period içinde — önce refresh et
                        console.warn('⚠️ [Auth] Token expired but within grace, refreshing first...');
                        const refreshed = await refreshAccessToken();
                        if (!refreshed) {
                            console.error('❌ [Auth] Grace period refresh failed');
                        }
                    } else {
                        console.warn('⚠️ [Auth] Token expired beyond grace period, attempting refresh...');
                        refreshAccessToken();
                    }
                } catch (e) {
                    console.error('❌ [Auth] Invalid token:', e);
                    logout();
                }
            } else {
            }
        };
        checkToken();

        // Cleanup on unmount
        return () => {
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
            }
        };
    }, [scheduleTokenRefresh, refreshAccessToken]);

    const login = (accessToken, refreshToken) => {
        try {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            const decoded = jwtDecode(accessToken);

            localStorage.setItem('chat_username', decoded.username);

            setToken(accessToken);
            setUser({ username: decoded.username });
            setIsAuthenticated(true);

            // Schedule auto-refresh
            scheduleTokenRefresh(accessToken);
        } catch (error) {
            console.error('❌ [Auth] Login failed:', error);
            logout();
        }
    };

    const logout = useCallback(() => {
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('chat_username');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    const authValue = useMemo(() => ({
        user, token, isAuthenticated, login, logout, isLoading, refreshAccessToken
    }), [user, token, isAuthenticated, login, logout, isLoading, refreshAccessToken]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

