// frontend/src/components/SteamRichPresence.js
import React, { useState, useEffect } from 'react';
import { FaSteam, FaGamepad, FaClock, FaTrophy, FaUnlink } from 'react-icons/fa';

const SteamRichPresence = ({ apiBaseUrl, fetchWithAuth }) => {
    const [connected, setConnected] = useState(false);
    const [steamData, setSteamData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSteamConnection();
    }, []);

    const checkSteamConnection = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/integrations/steam/status/`);
            if (res.ok) {
                const data = await res.json();
                setConnected(data.connected);
                if (data.connected) {
                    loadSteamData();
                }
            }
        } catch (error) {
            console.error('Steam check error:', error);
        }
        setLoading(false);
    };

    const loadSteamData = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/integrations/steam/presence/`);
            if (res.ok) {
                const data = await res.json();
                setSteamData(data);
            }
        } catch (error) {
            console.error('Steam data error:', error);
        }
        setLoading(false);
    };

    const connectSteam = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/auth/steam/start/`, {
                method: 'GET'
            });
            if (res.ok) {
                const data = await res.json();
                window.open(data.url, '_blank');
            }
        } catch (error) {
            console.error('Steam connect error:', error);
        }
    };

    const disconnectSteam = async () => {
        if (!confirm('Steam bağlantısını kesmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/integrations/steam/disconnect/`, {
                method: 'POST'
            });
            if (res.ok) {
                setConnected(false);
                setSteamData(null);
            }
        } catch (error) {
            console.error('Steam disconnect error:', error);
        }
    };

    if (!connected) {
        return (
            <div style={styles.connectCard}>
                <FaSteam size={48} color="#66c0f4" />
                <h3 style={styles.title}>Steam Hesabını Bağla</h3>
                <p style={styles.description}>
                    Steam hesabını bağlayarak oyun aktiviteni arkadaşlarınla paylaş!
                </p>
                <button onClick={connectSteam} style={styles.connectButton}>
                    <FaSteam /> Steam ile Bağlan
                </button>
            </div>
        );
    }

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>Yükleniyor...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaSteam size={24} color="#66c0f4" />
                    <h3 style={styles.title}>Steam Bağlantısı</h3>
                </div>
                <button onClick={disconnectSteam} style={styles.disconnectButton}>
                    <FaUnlink /> Bağlantıyı Kes
                </button>
            </div>

            <div style={styles.content}>
                {/* Current Game */}
                {steamData?.current_game && (
                    <div style={styles.currentGame}>
                        <div style={styles.gameHeader}>
                            <FaGamepad /> Şu An Oynuyor
                        </div>
                        <div style={styles.gameInfo}>
                            {steamData.current_game.icon && (
                                <img
                                    src={steamData.current_game.icon}
                                    alt={steamData.current_game.name}
                                    style={styles.gameImage}
                                />
                            )}
                            <div style={styles.gameDetails}>
                                <div style={styles.gameName}>{steamData.current_game.name}</div>
                                {steamData.current_game.playtime && (
                                    <div style={styles.gameTime}>
                                        <FaClock /> {Math.floor(steamData.current_game.playtime / 60)} saat oynandı
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Recent Games */}
                {steamData?.recent_games?.length > 0 && (
                    <div style={styles.recentGames}>
                        <div style={styles.sectionTitle}>
                            <FaGamepad /> Son Oyunlar
                        </div>
                        {steamData.recent_games.slice(0, 5).map((game, idx) => (
                            <div key={idx} style={styles.gameItem}>
                                {game.icon && (
                                    <img src={game.icon} alt={game.name} style={styles.gameThumb} />
                                )}
                                <div style={styles.gameItemInfo}>
                                    <div style={styles.gameItemName}>{game.name}</div>
                                    <div style={styles.gameItemTime}>
                                        {Math.floor(game.playtime / 60)} saat
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Achievements */}
                {steamData?.achievements?.length > 0 && (
                    <div style={styles.achievements}>
                        <div style={styles.sectionTitle}>
                            <FaTrophy /> Son Başarımlar
                        </div>
                        {steamData.achievements.slice(0, 3).map((achievement, idx) => (
                            <div key={idx} style={styles.achievement}>
                                {achievement.icon && (
                                    <img src={achievement.icon} alt="" style={styles.achievementIcon} />
                                )}
                                <div style={styles.achievementInfo}>
                                    <div style={styles.achievementName}>{achievement.name}</div>
                                    <div style={styles.achievementDesc}>{achievement.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!steamData?.current_game && !steamData?.recent_games?.length && (
                    <div style={styles.empty}>Henüz oyun verisi bulunamadı</div>
                )}
            </div>
        </div>
    );
};

const styles = {
    connectCard: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '400px',
        margin: '0 auto'
    },
    container: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '20px'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #202225'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    title: {
        color: '#ffffff',
        fontSize: '18px',
        margin: 0
    },
    description: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: '16px 0'
    },
    connectButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#66c0f4',
        color: '#ffffff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0 auto'
    },
    disconnectButton: {
        backgroundColor: '#ed4245',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#b9bbbe'
    },
    empty: {
        textAlign: 'center',
        padding: '40px',
        color: '#b9bbbe'
    },
    currentGame: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '16px',
        border: '2px solid #66c0f4'
    },
    gameHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#66c0f4',
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '12px'
    },
    gameInfo: {
        display: 'flex',
        gap: '16px'
    },
    gameImage: {
        width: '120px',
        height: '120px',
        borderRadius: '8px',
        objectFit: 'cover'
    },
    gameDetails: {
        flex: 1
    },
    gameName: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px'
    },
    gameTime: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: '#b9bbbe',
        fontSize: '13px'
    },
    recentGames: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '16px'
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    gameItem: {
        display: 'flex',
        gap: '12px',
        padding: '8px',
        borderRadius: '4px',
        marginBottom: '8px',
        transition: 'background 0.2s'
    },
    gameThumb: {
        width: '60px',
        height: '60px',
        borderRadius: '4px',
        objectFit: 'cover'
    },
    gameItemInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    gameItemName: {
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '4px'
    },
    gameItemTime: {
        color: '#b9bbbe',
        fontSize: '12px'
    },
    achievements: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '16px'
    },
    achievement: {
        display: 'flex',
        gap: '12px',
        padding: '8px',
        marginBottom: '8px'
    },
    achievementIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '4px'
    },
    achievementInfo: {
        flex: 1
    },
    achievementName: {
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '4px'
    },
    achievementDesc: {
        color: '#b9bbbe',
        fontSize: '12px'
    }
};

export default SteamRichPresence;



