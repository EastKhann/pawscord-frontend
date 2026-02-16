// frontend/src/hooks/useActivityPolling.js
// Extracted from App.js - polls Spotify/Steam rich presence and broadcasts via WS
import { useEffect } from 'react';

/**
 * Polls the rich presence API every 30s to get Spotify/Steam activity.
 * Compares with previous activity to avoid spamming WebSocket.
 * Sends activity updates via the status WebSocket when changes detected.
 *
 * @param {Object} options
 * @param {boolean} options.isAuthenticated
 * @param {string} options.username
 * @param {Function} options.fetchWithAuth
 * @param {string} options.apiBaseUrl
 * @param {React.RefObject} options.statusWsRef - Ref to the status WebSocket
 */
export default function useActivityPolling({ isAuthenticated, username, fetchWithAuth, apiBaseUrl, statusWsRef }) {
    useEffect(() => {
        if (!isAuthenticated || !username) return;

        const prevActivityRef = { current: null };

        const checkActivity = async () => {
            try {
                const res = await fetchWithAuth(`${apiBaseUrl}/users/rich_presence/${username}/`);
                if (res.ok) {
                    const data = await res.json();

                    let newActivity = {};

                    // Check if timestamp is fresh (within 2 minutes)
                    const isTimestampFresh = (timestamp) => {
                        if (!timestamp) return true;
                        const activityTime = new Date(timestamp);
                        const now = new Date();
                        const diffMinutes = (now - activityTime) / 1000 / 60;
                        return diffMinutes < 2;
                    };

                    if (data.spotify && isTimestampFresh(data.spotify.timestamp)) {
                        newActivity.spotify = {
                            type: 'listening',
                            name: data.spotify.track,
                            details: data.spotify.artist,
                            album_art: data.spotify.album_art
                        };
                    }

                    if (data.steam && isTimestampFresh(data.steam.timestamp)) {
                        newActivity.steam = {
                            type: 'playing',
                            name: data.steam.game,
                            state: data.steam.state
                        };
                    }

                    if (Object.keys(newActivity).length === 0) newActivity = null;

                    // Compare with previous to avoid spamming WS
                    const prevStr = JSON.stringify(prevActivityRef.current);
                    const newStr = JSON.stringify(newActivity);

                    if (prevStr !== newStr) {
                        prevActivityRef.current = newActivity;

                        if (statusWsRef.current && statusWsRef.current.readyState === WebSocket.OPEN) {
                            statusWsRef.current.send(JSON.stringify({
                                type: 'update_activity',
                                activity: newActivity
                            }));
                        }
                    }
                }
            } catch (e) {
                // Silent fail - rich presence is non-critical
            }
        };

        const interval = setInterval(checkActivity, 30000);
        checkActivity();

        return () => clearInterval(interval);
    }, [isAuthenticated, username, fetchWithAuth, apiBaseUrl, statusWsRef]);
}
