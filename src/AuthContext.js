import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef,
    useMemo,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { API_URL_BASE_STRING } from './utils/constants';
import { getToken, setToken as storeToken, clearToken } from './utils/tokenStorage';
import PropTypes from 'prop-types';
import logger from './utils/logger';

const AuthContext = createContext(null);

// API URL Configuration - Centralized from constants.js
const API_URL_BASE = API_URL_BASE_STRING;

export const AuthProvider = ({ children }) => {
    // 🔥 PERFORMANCE: Token varsa başlangıçta authenticated olarak başla
    const storedToken = getToken();
    const initialAuth = (() => {
        if (!storedToken) return false;
        try {
            const decoded = jwtDecode(storedToken);
            // Sadece gerçekten geçerli token'lar for true (grace period yok)
            return decoded.exp > Date.now() / 1000;
        } catch {
            return false;
        }
    })();

    const [user, setUser] = useState(
        initialAuth ? { username: localStorage.getItem('chat_username') || '' } : null
    );
    const [token, setToken] = useState(getToken());
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuth);
    const [isLoading, setIsLoading] = useState(false);
    const refreshTimerRef = useRef(null);

    // 🔄 Token Refresh Function (uses httpOnly cookie — no JS access to refresh token)
    const refreshAccessToken = useCallback(async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
        try {
            const response = await fetch(`${API_URL_BASE}/api/auth/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // 🔒 Send httpOnly refresh_token cookie
                body: JSON.stringify({}), // Refresh token comes from cookie
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                storeToken(data.access);

                const decoded = jwtDecode(data.access);
                setToken(data.access);
                setUser({ username: decoded.username });
                setIsAuthenticated(true);

                scheduleTokenRefresh(data.access);
                return true;
            } else {
                // 401/403 = refresh token genuinely expired or blacklistd → must logout
                // Any other status (500, 502 etc.) = server/network issue → don't logout
                if (response.status === 401 || response.status === 403) {
                    logger.error('❌ [Auth] Refresh token expired/invalid, logging out');
                    logout();
                } else {
                    logger.warn(
                        `⚠️ [Auth] Token refresh server error (${response.status}), will retry on next request`
                    );
                }
                return false;
            }
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                logger.warn('⚠️ [Auth] Token refresh timed out (staying logged in)');
                return false;
            }
            // Network error (offline, DNS fail, etc.) — do NOT logout, user will recover when back online
            logger.warn(
                '⚠️ [Auth] Token refresh network error (staying logged in):',
                error.message
            );
            return false;
        }
    }, []);

    // 📅 Schedule next token refresh
    const scheduleTokenRefresh = useCallback(
        (accessToken) => {
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
            }

            try {
                const decoded = jwtDecode(accessToken);
                const currentTime = Date.now() / 1000;
                const expiresIn = decoded.exp - currentTime;

                // Token süresi dolmadan 5 minutes ago yenile
                const refreshTime = Math.max((expiresIn - 300) * 1000, 60000); // En az 1 minute

                refreshTimerRef.current = setTimeout(() => {
                    refreshAccessToken();
                }, refreshTime);
            } catch (error) {
                logger.error('❌ [Auth] Failed to schedule token refresh:', error);
            }
        },
        [refreshAccessToken]
    );

    // Token kontrolü ve User set etme
    useEffect(() => {
        const checkToken = async () => {
            const storedToken = getToken();
            if (storedToken) {
                try {
                    const decoded = jwtDecode(storedToken);
                    const currentTime = Date.now() / 1000;
                    const gracePeriod = 5 * 60; // 5 minute tolerans
                    const isTokenActuallyValid = decoded.exp > currentTime;
                    const isWithinGrace = decoded.exp > currentTime - gracePeriod;

                    if (isTokenActuallyValid) {
                        // Token hala geçerli — direkt kullan
                        setToken(storedToken);
                        setUser({ username: decoded.username });
                        setIsAuthenticated(true);
                        localStorage.setItem('chat_username', decoded.username);

                        // Auto-refresh schedule
                        scheduleTokenRefresh(getToken());
                    } else if (isWithinGrace) {
                        // Token expired ama grace period forde — önce refresh et
                        logger.warn(
                            '⚠️ [Auth] Token expired but within grace, refreshing first...'
                        );
                        const refreshed = await refreshAccessToken();
                        if (!refreshed) {
                            logger.error('❌ [Auth] Grace period refresh failed');
                        }
                    } else {
                        logger.warn(
                            '⚠️ [Auth] Token expired beyond grace period, attempting refresh...'
                        );
                        refreshAccessToken();
                    }
                } catch (e) {
                    logger.error('❌ [Auth] Invalid token:', e);
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
            storeToken(accessToken);
            // 🔒 refresh_token is now stored as httpOnly cookie by the backend
            // No longer stored in localStorage (XSS protection)
            const decoded = jwtDecode(accessToken);

            localStorage.setItem('chat_username', decoded.username);

            setToken(accessToken);
            setUser({ username: decoded.username });
            setIsAuthenticated(true);

            // Schedule auto-refresh
            scheduleTokenRefresh(accessToken);
        } catch (error) {
            logger.error('❌ [Auth] Login failed:', error);
            logout();
        }
    };

    // 🔗 ELECTRON DEEP-LINK & OAUTH-TOKENS LISTENERS
    // The OAuth callback returns via `pawscord://auth?access=…&refresh=…` which
    // the main process forwards as IPC events. Previously LoginPage handled this
    // via localStorage.setItem + window.location.reload(), but the reload races
    // were fragile in production: the listener was registered too late, the
    // `persist:pawscord` partition didn't always preserve writes across reload,
    // and the user saw "token alındı ama login ekranındayım" symptoms.
    //
    // Listening here in AuthContext (mounted at app root for the entire session)
    // and calling `login()` directly updates state synchronously — no reload,
    // no race, no lost listener.
    useEffect(() => {
        if (typeof window === 'undefined' || !window.electron) return;

        const handleTokens = ({ access, refresh } = {}) => {
            if (!access) {
                logger.warn('[Auth/Electron] OAuth tokens IPC received without access token');
                return;
            }
            try {
                login(access, refresh);
                window.electron.focusWindow?.();
            } catch (e) {
                logger.error('[Auth/Electron] login() from OAuth tokens failed:', e);
            }
        };

        const handleDeepLink = (url) => {
            try {
                const u = new URL(url);
                const access = u.searchParams.get('access');
                const refresh = u.searchParams.get('refresh');
                if (access) handleTokens({ access, refresh });
            } catch (e) {
                logger.error('[Auth/Electron] deep-link parse failed:', e);
            }
        };

        try {
            window.electron.onOAuthTokens?.(handleTokens);
            window.electron.onDeepLinkAuth?.(handleDeepLink);
            window.electron.onGoogleAuthSuccess?.(handleTokens);
        } catch (e) {
            logger.warn('[Auth/Electron] Failed to register IPC listeners:', e);
        }
        // Listeners are registered once for the lifetime of the AuthProvider.
        // ipcRenderer.on accumulates if remounted, but AuthProvider is at app
        // root and never unmounts during a session.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = useCallback(() => {
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
        }
        // Call backend to blacklist refresh token & delete httpOnly cookie
        fetch(`${API_URL_BASE}/api/auth/logout/`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }).catch(() => {}); // fire-and-forget, don't block logout on network error
        clearToken();
        localStorage.removeItem('chat_username');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    const authValue = useMemo(
        () => ({
            user,
            token,
            isAuthenticated,
            login,
            logout,
            isLoading,
            refreshAccessToken,
        }),
        [user, token, isAuthenticated, login, logout, isLoading, refreshAccessToken]
    );

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

AuthContext.propTypes = {
    children: PropTypes.array,
};
