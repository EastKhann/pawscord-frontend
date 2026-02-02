// frontend/src/components/GamingIntegration.js

/**
 * 🎮 Gaming Integration
 * Rich Presence + Activity Detection + Overlay
 */

import React, { useState, useEffect, useRef } from 'react';
import FaGamepad from 'react-icons/fa/FaGamepad';
import FaTrophy from 'react-icons/fa/FaTrophy';
import FaClock from 'react-icons/fa/FaClock';
import FaUsers from 'react-icons/fa/FaUsers';

const GamingIntegration = ({
    userId,
    apiBaseUrl,
    fetchWithAuth,
    onActivityChange
}) => {
    const [currentGame, setCurrentGame] = useState(null);
    const [gameHistory, setGameHistory] = useState([]);
    const [stats, setStats] = useState({
        totalPlaytime: 0,
        gamesPlayed: 0,
        achievements: 0
    });
    const [overlayEnabled, setOverlayEnabled] = useState(false);
    const detectionInterval = useRef(null);

    useEffect(() => {
        loadGameHistory();
        startActivityDetection();

        return () => stopActivityDetection();
    }, []);

    // Activity Detection
    const startActivityDetection = () => {
        detectCurrentGame();

        detectionInterval.current = setInterval(() => {
            detectCurrentGame();
        }, 10000); // Check every 10 seconds
    };

    const stopActivityDetection = () => {
        if (detectionInterval.current) {
            clearInterval(detectionInterval.current);
        }
    };

    const detectCurrentGame = async () => {
        try {
            // Check if running in Electron
            if (window.electron?.getRunningProcesses) {
                const processes = await window.electron.getRunningProcesses();
                const detectedGame = matchGameFromProcesses(processes);

                if (detectedGame) {
                    updateCurrentGame(detectedGame);
                } else if (currentGame) {
                    // Game closed
                    endGameSession();
                }
            }
        } catch (error) {
            console.error('Activity detection error:', error);
        }
    };

    const matchGameFromProcesses = (processes) => {
        // Known game executables
        const gameList = [
            { name: 'League of Legends', exe: 'LeagueClient.exe', icon: '🎮' },
            { name: 'Valorant', exe: 'VALORANT.exe', icon: '🔫' },
            { name: 'Counter-Strike 2', exe: 'cs2.exe', icon: '💣' },
            { name: 'Dota 2', exe: 'dota2.exe', icon: '⚔️' },
            { name: 'Apex Legends', exe: 'r5apex.exe', icon: '🏆' },
            { name: 'Fortnite', exe: 'FortniteClient-Win64-Shipping.exe', icon: '🪓' },
            { name: 'Minecraft', exe: 'javaw.exe', icon: '⛏️' },
            { name: 'GTA V', exe: 'GTA5.exe', icon: '🚗' },
            { name: 'Elden Ring', exe: 'eldenring.exe', icon: '🗡️' },
            { name: 'Cyberpunk 2077', exe: 'Cyberpunk2077.exe', icon: '🤖' }
        ];

        for (const game of gameList) {
            if (processes.includes(game.exe)) {
                return game;
            }
        }

        return null;
    };

    const updateCurrentGame = async (game) => {
        if (currentGame?.name === game.name) return;

        setCurrentGame({
            ...game,
            startTime: Date.now()
        });

        // Send to backend
        try {
            await fetchWithAuth(`${apiBaseUrl}/gaming/activity/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    game_name: game.name,
                    started_at: new Date().toISOString()
                })
            });

            if (onActivityChange) {
                onActivityChange({
                    type: 'gaming',
                    name: game.name,
                    details: 'Şu anda oynuyor',
                    icon: game.icon
                });
            }
        } catch (error) {
            console.error('Failed to update game activity:', error);
        }
    };

    const endGameSession = async () => {
        if (!currentGame) return;

        const playtime = Math.floor((Date.now() - currentGame.startTime) / 1000);

        try {
            await fetchWithAuth(`${apiBaseUrl}/gaming/activity/end/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    game_name: currentGame.name,
                    playtime_seconds: playtime
                })
            });

            setCurrentGame(null);

            if (onActivityChange) {
                onActivityChange(null);
            }

            loadGameHistory();
        } catch (error) {
            console.error('Failed to end game session:', error);
        }
    };

    const loadGameHistory = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/gaming/history/?user_id=${userId}`
            );

            if (response.ok) {
                const data = await response.json();
                setGameHistory(data.history || []);
                setStats({
                    totalPlaytime: data.total_playtime || 0,
                    gamesPlayed: data.games_played || 0,
                    achievements: data.achievements || 0
                });
            }
        } catch (error) {
            console.error('Failed to load game history:', error);
        }
    };

    const toggleOverlay = () => {
        setOverlayEnabled(!overlayEnabled);

        if (window.electron?.toggleGamingOverlay) {
            window.electron.toggleGamingOverlay(!overlayEnabled);
        }
    };

    const formatPlaytime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}s ${minutes}d`;
    };

    return (
        <div style={styles.container}>
            {/* Current Game */}
            {currentGame && (
                <div style={styles.currentGame}>
                    <div style={styles.gameIcon}>{currentGame.icon}</div>
                    <div style={styles.gameInfo}>
                        <span style={styles.gameName}>{currentGame.name}</span>
                        <span style={styles.gameStatus}>Şu anda oynuyor</span>
                    </div>
                    <div style={styles.gameDuration}>
                        <FaClock style={{ marginRight: '4px' }} />
                        {formatPlaytime(Math.floor((Date.now() - currentGame.startTime) / 1000))}
                    </div>
                </div>
            )}

            {/* Stats */}
            <div style={styles.stats}>
                <div style={styles.statCard}>
                    <FaGamepad style={styles.statIcon} />
                    <div style={styles.statInfo}>
                        <span style={styles.statValue}>{stats.gamesPlayed}</span>
                        <span style={styles.statLabel}>Oyun</span>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <FaClock style={styles.statIcon} />
                    <div style={styles.statInfo}>
                        <span style={styles.statValue}>{formatPlaytime(stats.totalPlaytime)}</span>
                        <span style={styles.statLabel}>Toplam Süre</span>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <FaTrophy style={styles.statIcon} />
                    <div style={styles.statInfo}>
                        <span style={styles.statValue}>{stats.achievements}</span>
                        <span style={styles.statLabel}>Başarım</span>
                    </div>
                </div>
            </div>

            {/* Overlay Toggle */}
            <div style={styles.overlaySection}>
                <div style={styles.overlayInfo}>
                    <span style={styles.overlayTitle}>Oyun İçi Overlay</span>
                    <span style={styles.overlayDesc}>
                        Oyun oynarken bildirim ve mesaj al
                    </span>
                </div>
                <button
                    onClick={toggleOverlay}
                    style={{
                        ...styles.overlayToggle,
                        backgroundColor: overlayEnabled ? '#3ba55d' : '#4e5058'
                    }}
                >
                    {overlayEnabled ? 'AÇIK' : 'KAPALI'}
                </button>
            </div>

            {/* Recent Games */}
            <div style={styles.historySection}>
                <h3 style={styles.historyTitle}>Son Oynanan Oyunlar</h3>
                <div style={styles.historyList}>
                    {gameHistory.slice(0, 5).map((session, index) => (
                        <div key={index} style={styles.historyItem}>
                            <span style={styles.historyGameName}>{session.game_name}</span>
                            <span style={styles.historyPlaytime}>
                                {formatPlaytime(session.playtime_seconds)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '16px'
    },
    currentGame: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#5865f2',
        borderRadius: '8px',
        marginBottom: '16px'
    },
    gameIcon: {
        fontSize: '32px',
        marginRight: '12px'
    },
    gameInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    gameName: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff'
    },
    gameStatus: {
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.8)'
    },
    gameDuration: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        color: '#fff',
        fontWeight: '600'
    },
    stats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '16px'
    },
    statCard: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#36393f',
        borderRadius: '6px'
    },
    statIcon: {
        fontSize: '24px',
        color: '#5865f2',
        marginRight: '10px'
    },
    statInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    statValue: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff'
    },
    statLabel: {
        fontSize: '11px',
        color: '#b9bbbe'
    },
    overlaySection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#36393f',
        borderRadius: '8px',
        marginBottom: '16px'
    },
    overlayInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    overlayTitle: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff',
        marginBottom: '4px'
    },
    overlayDesc: {
        fontSize: '12px',
        color: '#b9bbbe'
    },
    overlayToggle: {
        border: 'none',
        borderRadius: '20px',
        padding: '8px 20px',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    historySection: {
        marginTop: '16px'
    },
    historyTitle: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#dcddde',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    historyList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    historyItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 12px',
        backgroundColor: '#36393f',
        borderRadius: '4px'
    },
    historyGameName: {
        fontSize: '13px',
        color: '#dcddde'
    },
    historyPlaytime: {
        fontSize: '12px',
        color: '#72767d'
    }
};

export default GamingIntegration;


