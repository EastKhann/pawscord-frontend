import { useState, useCallback, useEffect } from 'react';
import { API_URL_BASE_STRING } from '../utils/constants';
import { authFetch } from '../utils/authFetch';
import { DEFAULT_ICE_SERVERS, setRtcIceServers } from './constants';
import logger from '../utils/logger';

/**
 * ICE/TURN server hook — fetches TURN credentials from backend
 * and falls back to STUN-only mode on failure.
 */
export function useIceServers({ token }) {
    const [iceServers, setIceServers] = useState(DEFAULT_ICE_SERVERS);

    const refreshIceServers = useCallback(async () => {
        // Skip if no token (not authenticated)
        if (!token) {
            setIceServers(DEFAULT_ICE_SERVERS);
            setRtcIceServers(DEFAULT_ICE_SERVERS);
            return;
        }

        // 🔥 TURN SERVER ENABLED - Production-ready
        // TURN server backend'den credentials alır (coturn HMAC-SHA1 with)
        // Fallback olarak STUN-only kullanılır

        try {
            // 🔥 authFetch kullanarak otomatik token refresh
            const res = await authFetch(`${API_URL_BASE_STRING}/api/voice/turn-credentials/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                // 401 = token expired, 403 = permission denied
                if (res.status === 401 || res.status === 403) {
                    logger.warn('🧊 [RTC] Auth failed, using STUN only');
                } else {
                    logger.warn(`🧊 [RTC] TURN fetch failed (${res.status}), using STUN only`);
                }
                throw new Error(`TURN fetch failed ${res.status}`);
            }

            const data = await res.json();
            const newServers = [...DEFAULT_ICE_SERVERS, ...(data?.iceServers || [])];
            setIceServers(newServers);
            setRtcIceServers(newServers);
        } catch (err) {
            // Fallback to STUN-only (always works)
            logger.warn('🧊 [RTC] Using STUN-only mode:', err.message);
            setIceServers(DEFAULT_ICE_SERVERS);
            setRtcIceServers(DEFAULT_ICE_SERVERS);
        }
    }, [token]);

    // 🔥 PERF: Don't fetch TURN on app mount — fetch lazily when joining voice.
    // STUN-only (DEFAULT_ICE_SERVERS) works as fallback until then.

    return { iceServers, refreshIceServers };
}
