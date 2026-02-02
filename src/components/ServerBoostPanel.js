import React, { useState, useEffect } from 'react';
import { FaTimes, FaRocket, FaCrown, FaStar, FaGift, FaHistory, FaUsers } from 'react-icons/fa';
import { toast } from '../utils/toast';

const ServerBoostPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const [boosts, setBoosts] = useState([]);
    const [serverStats, setServerStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview'); // overview, boosts, perks

    useEffect(() => {
        fetchBoosts();
        fetchServerStats();
    }, [serverId]);

    const fetchBoosts = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/servers/${serverId}/boosts/`);
            const data = await response.json();
            setBoosts(data.boosts || []);
        } catch (error) {
            toast.error('Failed to load boosts');
        }
    };

    const fetchServerStats = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/servers/${serverId}/boost_stats/`);
            const data = await response.json();
            setServerStats(data);
        } catch (error) {
            toast.error('Failed to load server stats');
        } finally {
            setLoading(false);
        }
    };

    const boostServer = async () => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/api/servers/boost/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_id: serverId })
            });

            toast.success('🚀 Server boosted successfully!');
            fetchBoosts();
            fetchServerStats();
        } catch (error) {
            toast.error('Failed to boost server');
        }
    };

    const getBoostLevel = (boostCount) => {
        if (boostCount >= 30) return { level: 3, name: 'Level 3', color: '#9b59b6' };
        if (boostCount >= 15) return { level: 2, name: 'Level 2', color: '#e91e63' };
        if (boostCount >= 2) return { level: 1, name: 'Level 1', color: '#5865f2' };
        return { level: 0, name: 'No Level', color: '#99aab5' };
    };

    const getNextLevelProgress = (boostCount) => {
        if (boostCount >= 30) return { current: boostCount, target: 30, percentage: 100 };
        if (boostCount >= 15) return { current: boostCount, target: 30, percentage: ((boostCount - 15) / 15) * 100 };
        if (boostCount >= 2) return { current: boostCount, target: 15, percentage: ((boostCount - 2) / 13) * 100 };
        return { current: boostCount, target: 2, percentage: (boostCount / 2) * 100 };
    };

    const perks = [
        { level: 1, icon: '🎨', name: '128 Emoji Slots', description: 'Upload up to 128 custom emojis' },
        { level: 1, icon: '🎵', name: '128kbps Audio', description: 'Higher quality voice channels' },
        { level: 1, icon: '🖼️', name: 'Animated Icon', description: 'Set an animated server icon' },
        { level: 1, icon: '🌟', name: 'Custom Invite Background', description: 'Customize your invite splash' },
        { level: 2, icon: '😀', name: '256 Emoji Slots', description: 'Even more custom emojis' },
        { level: 2, icon: '🎤', name: '256kbps Audio', description: 'Crystal clear voice quality' },
        { level: 2, icon: '📤', name: '50MB Upload Limit', description: 'Share larger files' },
        { level: 2, icon: '🎬', name: '1080p Screen Share', description: 'HD screen sharing' },
        { level: 3, icon: '🎭', name: '500 Emoji Slots', description: 'Maximum emoji capacity' },
        { level: 3, icon: '🎧', name: '384kbps Audio', description: 'Professional audio quality' },
        { level: 3, icon: '📦', name: '100MB Upload Limit', description: 'Share even larger files' },
        { level: 3, icon: '🔗', name: 'Custom Vanity URL', description: 'Custom server invite link' },
    ];

    const currentBoostCount = serverStats?.boost_count || 0;
    const currentLevel = getBoostLevel(currentBoostCount);
    const progress = getNextLevelProgress(currentBoostCount);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaRocket style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Server Boost</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.tabs}>
                    <button
                        onClick={() => setActiveTab('overview')}
                        style={{ ...styles.tab, ...(activeTab === 'overview' && styles.tabActive) }}
                    >
                        <FaRocket style={{ marginRight: '5px' }} />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('boosts')}
                        style={{ ...styles.tab, ...(activeTab === 'boosts' && styles.tabActive) }}
                    >
                        <FaHistory style={{ marginRight: '5px' }} />
                        Boosts ({boosts.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('perks')}
                        style={{ ...styles.tab, ...(activeTab === 'perks' && styles.tabActive) }}
                    >
                        <FaGift style={{ marginRight: '5px' }} />
                        Perks
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading...</div>
                    ) : activeTab === 'overview' ? (
                        <div style={styles.overview}>
                            <div style={styles.boostCard}>
                                <div style={{ ...styles.boostLevel, backgroundColor: currentLevel.color }}>
                                    <FaCrown style={{ fontSize: '32px' }} />
                                    <div style={styles.levelText}>{currentLevel.name}</div>
                                    <div style={styles.boostCountText}>{currentBoostCount} Boosts</div>
                                </div>

                                <div style={styles.progressSection}>
                                    <div style={styles.progressHeader}>
                                        <span>Progress to Next Level</span>
                                        <span>{progress.current} / {progress.target}</span>
                                    </div>
                                    <div style={styles.progressBar}>
                                        <div
                                            style={{
                                                ...styles.progressFill,
                                                width: `${Math.min(progress.percentage, 100)}%`,
                                                backgroundColor: currentLevel.color
                                            }}
                                        />
                                    </div>
                                    {currentBoostCount < 30 && (
                                        <div style={styles.progressFooter}>
                                            {progress.target - progress.current} more boosts needed
                                        </div>
                                    )}
                                </div>

                                <button onClick={boostServer} style={styles.boostButton}>
                                    <FaRocket style={{ marginRight: '8px' }} />
                                    Boost This Server
                                </button>
                            </div>

                            <div style={styles.statsGrid}>
                                <div style={styles.statCard}>
                                    <FaUsers style={styles.statIcon} />
                                    <div style={styles.statValue}>{serverStats?.total_boosters || 0}</div>
                                    <div style={styles.statLabel}>Boosters</div>
                                </div>
                                <div style={styles.statCard}>
                                    <FaStar style={styles.statIcon} />
                                    <div style={styles.statValue}>{serverStats?.total_boosts || 0}</div>
                                    <div style={styles.statLabel}>Total Boosts</div>
                                </div>
                                <div style={styles.statCard}>
                                    <FaCrown style={styles.statIcon} />
                                    <div style={styles.statValue}>{currentLevel.level}</div>
                                    <div style={styles.statLabel}>Current Level</div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'boosts' ? (
                        <div style={styles.boostsList}>
                            {boosts.length === 0 ? (
                                <div style={styles.empty}>No boosts yet. Be the first to boost this server!</div>
                            ) : (
                                boosts.map((boost, index) => (
                                    <div key={index} style={styles.boostItem}>
                                        <div style={styles.boostUser}>
                                            <FaRocket style={{ color: '#5865f2', marginRight: '10px' }} />
                                            <div>
                                                <div style={styles.boostUsername}>{boost.user?.username || 'Anonymous'}</div>
                                                <div style={styles.boostDate}>
                                                    Boosted {new Date(boost.boosted_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        {boost.expires_at && (
                                            <div style={styles.boostExpires}>
                                                Expires {new Date(boost.expires_at).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div style={styles.perksList}>
                            {[1, 2, 3].map(level => (
                                <div key={level} style={styles.perkLevel}>
                                    <div style={styles.perkLevelHeader}>
                                        <FaCrown style={{ marginRight: '8px', color: getBoostLevel(level === 1 ? 2 : level === 2 ? 15 : 30).color }} />
                                        Level {level} Perks
                                        <span style={styles.perkRequirement}>
                                            ({level === 1 ? '2' : level === 2 ? '15' : '30'} boosts required)
                                        </span>
                                    </div>
                                    <div style={styles.perksGrid}>
                                        {perks.filter(p => p.level === level).map((perk, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    ...styles.perkCard,
                                                    opacity: currentLevel.level >= level ? 1 : 0.5
                                                }}
                                            >
                                                <div style={styles.perkIcon}>{perk.icon}</div>
                                                <div style={styles.perkName}>{perk.name}</div>
                                                <div style={styles.perkDescription}>{perk.description}</div>
                                                {currentLevel.level >= level && (
                                                    <div style={styles.perkUnlocked}>✓ Unlocked</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    tabs: {
        display: 'flex',
        borderBottom: '1px solid #2c2f33',
        padding: '0 20px',
    },
    tab: {
        padding: '12px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid transparent',
        transition: 'all 0.2s',
    },
    tabActive: {
        color: '#5865f2',
        borderBottom: '2px solid #5865f2',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    overview: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    boostCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    boostLevel: {
        textAlign: 'center',
        padding: '24px',
        borderRadius: '8px',
        color: '#ffffff',
    },
    levelText: {
        fontSize: '24px',
        fontWeight: '600',
        marginTop: '8px',
    },
    boostCountText: {
        fontSize: '14px',
        opacity: 0.9,
        marginTop: '4px',
    },
    progressSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    progressHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#dcddde',
    },
    progressBar: {
        height: '8px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        transition: 'width 0.3s',
    },
    progressFooter: {
        fontSize: '12px',
        color: '#99aab5',
        textAlign: 'center',
    },
    boostButton: {
        padding: '12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
    },
    statCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
    },
    statIcon: {
        fontSize: '24px',
        color: '#5865f2',
        marginBottom: '8px',
    },
    statValue: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '4px',
    },
    statLabel: {
        fontSize: '12px',
        color: '#99aab5',
    },
    boostsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    boostItem: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boostUser: {
        display: 'flex',
        alignItems: 'center',
    },
    boostUsername: {
        color: '#ffffff',
        fontWeight: '500',
    },
    boostDate: {
        fontSize: '12px',
        color: '#99aab5',
        marginTop: '2px',
    },
    boostExpires: {
        fontSize: '12px',
        color: '#faa61a',
    },
    perksList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    perkLevel: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    perkLevelHeader: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
    },
    perkRequirement: {
        fontSize: '12px',
        color: '#99aab5',
        marginLeft: '8px',
        fontWeight: '400',
    },
    perksGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '12px',
    },
    perkCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    perkIcon: {
        fontSize: '32px',
    },
    perkName: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
    },
    perkDescription: {
        fontSize: '12px',
        color: '#99aab5',
    },
    perkUnlocked: {
        fontSize: '12px',
        color: '#43b581',
        fontWeight: '600',
        marginTop: '4px',
    },
};

export default ServerBoostPanel;
