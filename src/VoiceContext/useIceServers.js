import { useState, useCallback, useEffect } from 'react';
import { API_URL_BASE_STRING } from '../utils/constants';
import { authFetch } from '../utils/authFetch';
import { DEFAULT_ICE_SERVERS, setRtcIceServers } from './constants';

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
        // TURN server backend'den credentials alır (coturn HMAC-SHA1 ile)
        // Fallback olarak STUN-only kullanılır

        try {
            // 🔥 authFetch kullanarak otomatik token refresh
            const res = await authFetch(`${API_URL_BASE_STRING}/api/voice/turn-credentials/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                // 401 = token expired, 403 = permission denied
                if (res.status === 401 || res.status === 403) {
                    console.warn('🧊 [RTC] Auth failed, using STUN only');
                } else {
                    console.warn(`🧊 [RTC] TURN fetch failed (${res.status}), using STUN only`);
                }
                throw new Error(`TURN fetch failed ${res.status}`);
            }

            const data = await res.json();
            const newServers = [...DEFAULT_ICE_SERVERS, ...(data?.iceServers || [])];
            setIceServers(newServers);
            setRtcIceServers(newServers);
        } catch (err) {
            // Fallback to STUN-only (always works)
            console.warn('🧊 [RTC] Using STUN-only mode:', err.message);
            setIceServers(DEFAULT_ICE_SERVERS);
            setRtcIceServers(DEFAULT_ICE_SERVERS);
        }
    }, [token]);

    useEffect(() => {
        refreshIceServers();
    }, [refreshIceServers]);

    return { iceServers };
}
