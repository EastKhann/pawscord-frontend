/**
 * 🔐 useFetchWithAuth — Authenticated fetch with token refresh
 * Extracted from App.js
 */
import { useRef, useCallback } from 'react';
import { useAuth } from '../AuthContext';

export default function useFetchWithAuth() {
    const { token, logout, refreshAccessToken } = useAuth();

    const isRefreshingRef = useRef(false);
    const refreshPromiseRef = useRef(null);
    const tokenRef = useRef(token);

    // Keep tokenRef in sync
    tokenRef.current = token;

    const fetchWithAuth = useCallback(async (url, options = {}, _isRetry = false) => {
        const currentToken = tokenRef.current || token;
        const headers = { ...(options.headers || {}) };
        if (currentToken) headers['Authorization'] = `Bearer ${currentToken}`;
        if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';

        try {
            const isUpload = url.includes('upload') || (options.body instanceof FormData);
            const timeout = isUpload ? 300000 : 30000;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, { ...options, headers, signal: controller.signal });
            clearTimeout(timeoutId);

            if (response.status === 401 && !_isRetry) {
                if (url.includes('/auth/') || url.includes('/login')) {
                    logout();
                    throw new Error("Unauthorized");
                }

                if (!isRefreshingRef.current) {
                    isRefreshingRef.current = true;
                    refreshPromiseRef.current = refreshAccessToken().finally(() => {
                        isRefreshingRef.current = false;
                    });
                }

                const refreshed = await refreshPromiseRef.current;
                if (refreshed) return fetchWithAuth(url, options, true);
                else throw new Error("Unauthorized");
            }

            return response;
        } catch (err) {
            if (err.name === 'AbortError') throw new Error('İstek zaman aşımına uğradı');
            if (err.message === 'Unauthorized') throw err;
            console.error("Fetch error:", err);
            throw err;
        }
    }, [token, logout, refreshAccessToken]);

    return { fetchWithAuth, tokenRef };
}
