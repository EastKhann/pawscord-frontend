/**
 * 🔐 useFetchWithAuth — Authenticated fetch with token refresh
 * Extracted from App.js
 */
import { useRef, useCallback } from 'react';
import { useAuth } from '../AuthContext';
import logger from '../utils/logger';

export default function useFetchWithAuth() {
    const { token, logout, refreshAccessToken } = useAuth();

    const isRefreshingRef = useRef(false);
    const refreshPromiseRef = useRef(null);
    const tokenRef = useRef(token);

    // Keep tokenRef in sync
    tokenRef.current = token;

    const fetchWithAuth = useCallback(
        async (url, options = {}, _isRetry = false) => {
            const currentToken = tokenRef.current || token;
            const headers = { ...(options.headers || {}) };
            if (currentToken) headers['Authorization'] = `Bearer ${currentToken}`;
            if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';

            const isUpload = url.includes('upload') || options.body instanceof FormData;
            const timeout = isUpload ? 300000 : 30000;

            const MAX_RETRIES = 3;
            const BACKOFF_BASE_MS = 1000;

            const attemptFetch = async (attempt) => {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);

                let response;
                try {
                    response = await fetch(url, { ...options, headers, signal: controller.signal });
                } catch (err) {
                    clearTimeout(timeoutId);
                    if (err.name === 'AbortError') throw new Error('Request timed out');
                    // Retry on network error with backoff
                    if (attempt < MAX_RETRIES) {
                        await new Promise((r) =>
                            setTimeout(r, BACKOFF_BASE_MS * Math.pow(2, attempt - 1))
                        );
                        return attemptFetch(attempt + 1);
                    }
                    throw err;
                }
                clearTimeout(timeoutId);

                // Retry on 503 or 429 with backoff
                if ((response.status === 503 || response.status === 429) && attempt < MAX_RETRIES) {
                    const retryAfter = response.headers.get('Retry-After');
                    const delay = retryAfter
                        ? parseInt(retryAfter, 10) * 1000
                        : BACKOFF_BASE_MS * Math.pow(2, attempt - 1);
                    await new Promise((r) => setTimeout(r, delay));
                    return attemptFetch(attempt + 1);
                }

                return response;
            };

            try {
                const response = await attemptFetch(1);

                if (response.status === 401 && !_isRetry) {
                    if (url.includes('/auth/') || url.includes('/login')) {
                        logout();
                        throw new Error('Unauthorized');
                    }

                    if (!isRefreshingRef.current) {
                        isRefreshingRef.current = true;
                        refreshPromiseRef.current = refreshAccessToken().finally(() => {
                            isRefreshingRef.current = false;
                        });
                    }

                    const refreshed = await refreshPromiseRef.current;
                    if (refreshed) return fetchWithAuth(url, options, true);
                    else throw new Error('Unauthorized');
                }

                return response;
            } catch (err) {
                if (err.message === 'Unauthorized') throw err;
                logger.error('Fetch error:', err);
                throw err;
            }
        },
        [token, logout, refreshAccessToken]
    );

    return { fetchWithAuth, tokenRef };
}
