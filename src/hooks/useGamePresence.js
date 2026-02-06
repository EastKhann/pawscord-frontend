// frontend/src/hooks/useGamePresence.js
/**
 * 🎮 GAME PRESENCE HOOK
 * Electron'dan oyun tespiti alır ve sunucuya bildirir
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getApiBase } from '../utils/apiClient';
import { isElectron } from '../utils/constants';

const useGamePresence = () => {
    const [currentGame, setCurrentGame] = useState(null);
    const [isDetecting, setIsDetecting] = useState(false);
    const lastReportedGame = useRef(null);

    // Report game activity to server
    const reportGameActivity = useCallback(async (game) => {
        if (!game) {
            // Game closed - clear activity
            if (lastReportedGame.current) {
                try {
                    const token = localStorage.getItem('access_token');
                    await fetch(`${getApiBase()}/activity/game/clear/`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    lastReportedGame.current = null;
                } catch (err) {
                    console.error('Failed to clear game activity:', err);
                }
            }
            return;
        }

        // Same game - don't report again
        if (lastReportedGame.current?.id === game.id) {
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            await fetch(`${getApiBase()}/activity/game/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    game_name: game.name,
                    game_id: game.id,
                    platform: 'desktop'
                })
            });
            lastReportedGame.current = game;
            console.log('🎮 Game activity reported:', game.name);
        } catch (err) {
            console.error('Failed to report game activity:', err);
        }
    }, []);

    // Handle game detection from Electron
    useEffect(() => {
        if (!isElectron || typeof window.electron === 'undefined') {
            return;
        }

        const handleGameDetected = (game) => {
            setCurrentGame(game);
            reportGameActivity(game);
        };

        // Listen for game detection events
        window.electron.onGameDetected(handleGameDetected);

        // Initial detection
        window.electron.detectGames();

        // Cleanup on unmount
        return () => {
            // Report game closed when leaving
            if (lastReportedGame.current) {
                reportGameActivity(null);
            }
        };
    }, [reportGameActivity]);

    // Manual detection trigger
    const detectGames = useCallback(async () => {
        if (!isElectron || typeof window.electron === 'undefined') {
            return;
        }

        setIsDetecting(true);
        try {
            await window.electron.detectGames();
        } finally {
            setIsDetecting(false);
        }
    }, []);

    // Get list of running processes (for custom game selection)
    const getRunningProcesses = useCallback(async () => {
        if (!isElectron || typeof window.electron === 'undefined') {
            return [];
        }

        try {
            return await window.electron.getRunningProcesses();
        } catch (err) {
            console.error('Failed to get running processes:', err);
            return [];
        }
    }, []);

    // Set custom game activity
    const setCustomGame = useCallback(async (gameName, gameId = null) => {
        const game = { name: gameName, id: gameId || gameName.toLowerCase().replace(/\s+/g, '-') };
        setCurrentGame(game);
        await reportGameActivity(game);
    }, [reportGameActivity]);

    // Clear game activity
    const clearGame = useCallback(async () => {
        setCurrentGame(null);
        await reportGameActivity(null);
    }, [reportGameActivity]);

    return {
        currentGame,
        isDetecting,
        isElectron,
        detectGames,
        getRunningProcesses,
        setCustomGame,
        clearGame
    };
};

export default useGamePresence;
