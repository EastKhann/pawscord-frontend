// frontend/src/components/ServerBoostMetrics.js
// 🚀 Server Boost Metrics Widget - Full Implementation
// ⚡ OPTIMIZED: React.memo, useMemo, useCallback

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { FaRocket, FaGem, FaCrown, FaStar, FaArrowUp, FaChartLine, FaUsers, FaGift } from 'react-icons/fa';

/**
 * Server Boost Metrics Widget
 * Shows boost level, progress, and perks
 */
const ServerBoostMetrics = ({ serverId, fetchWithAuth, apiBaseUrl }) => {
    const [boostData, setBoostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Boost level thresholds
    const BOOST_LEVELS = {
        0: { name: 'Seviye 0', boosts: 0, color: '#72767d' },
        1: { name: 'Seviye 1', boosts: 2, color: '#ff73fa' },
        2: { name: 'Seviye 2', boosts: 7, color: '#ff73fa' },
        3: { name: 'Seviye 3', boosts: 14, color: '#ff73fa' }
    };

    // Perks per level
    const PERKS = {
        1: [
            '🎨 50 ekstra emoji slotu (+50)',
            '🔊 128kbps ses kalitesi',
            '📹 Go Live 720p 30fps',
            '🖼️ Animasyonlu sunucu ikonu',
            '📎 50MB dosya yükleme'
        ],
        2: [
            '🎨 100 ekstra emoji slotu (+100)',
            '🔊 256kbps ses kalitesi',
            '📹 Go Live 1080p 30fps',
            '🌐 Özel sunucu banner',
            '📎 100MB dosya yükleme',
            '💬 50 sticker slotu'
        ],
        3: [
            '🎨 250 ekstra emoji slotu (+250)',
            '🔊 384kbps ses kalitesi',
            '📹 Go Live 1080p 60fps',
            '🔗 Vanity URL',
            '📎 100MB dosya yükleme',
            '💬 100 sticker slotu',
            '🎉 Animasyonlu banner'
        ]
    };

    const fetchBoostData = useCallback(async () => {
        if (!serverId) return;

        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/boost-stats/`);
            if (response.ok) {
                const data = await response.json();
                // Backend'den gelen veriyi normalize et
                setBoostData({
                    boost_count: data.boost_count || 0,
                    boost_level: data.boost_level || getCurrentLevel(data.boost_count || 0),
                    boosters: data.boosters || [],
                    next_level_at: data.next_level_at || getNextLevelBoosts(data.boost_level || 0),
                    perks_unlocked: data.perks_unlocked || PERKS[data.boost_level] || []
                });
            } else {
                // API hatası - boş veri göster
                setBoostData({
                    boost_count: 0,
                    boost_level: 0,
                    boosters: [],
                    next_level_at: 2,
                    perks_unlocked: []
                });
            }
        } catch (err) {
            console.error('Failed to fetch boost data:', err);
            setError('Boost verileri yüklenemedi');
        } finally {
            setLoading(false);
        }
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    useEffect(() => {
        fetchBoostData();
    }, [fetchBoostData]);

    // ⚡ Memoize expensive calculations
    const getCurrentLevel = useCallback((boostCount) => {
        if (boostCount >= 14) return 3;
        if (boostCount >= 7) return 2;
        if (boostCount >= 2) return 1;
        return 0;
    }, []);

    const getNextLevelBoosts = useCallback((currentLevel) => {
        if (currentLevel >= 3) return null;
        return BOOST_LEVELS[currentLevel + 1].boosts;
    }, []);

    const getProgressPercentage = useCallback((boostCount, currentLevel) => {
        const currentThreshold = BOOST_LEVELS[currentLevel].boosts;
        const nextThreshold = getNextLevelBoosts(currentLevel);

        if (!nextThreshold) return 100; // Max level

        const progress = boostCount - currentThreshold;
        const needed = nextThreshold - currentThreshold;
        return Math.min(100, (progress / needed) * 100);
    }, [getNextLevelBoosts]);

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <FaRocket className="pulse" size={24} color="#ff73fa" />
                    <span>Boost verileri yükleniyor...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.error}>{error}</div>
            </div>
        );
    }

    // ⚡ useMemo for derived state
    const boostCount = boostData?.boost_count || 0;

    const { currentLevel, nextLevelBoosts, progress, levelInfo, currentPerks, boosters } = useMemo(() => {
        const level = getCurrentLevel(boostCount);
        const nextBoosts = getNextLevelBoosts(level);
        const progressPercent = getProgressPercentage(boostCount, level);
        return {
            currentLevel: level,
            nextLevelBoosts: nextBoosts,
            progress: progressPercent,
            levelInfo: BOOST_LEVELS[level],
            currentPerks: PERKS[level] || [],
            boosters: boostData?.boosters || []
        };
    }, [boostCount, boostData?.boosters, getCurrentLevel, getNextLevelBoosts, getProgressPercentage]);

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerIcon}>
                    <FaRocket size={20} color="#ff73fa" />
                </div>
                <h3 style={styles.headerTitle}>Sunucu Boost</h3>
                <div style={{ ...styles.levelBadge, backgroundColor: levelInfo.color }}>
                    {levelInfo.name}
                </div>
            </div>

            {/* Main Stats */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <FaGem size={24} color="#ff73fa" />
                    <div style={styles.statValue}>{boostCount}</div>
                    <div style={styles.statLabel}>Toplam Boost</div>
                </div>
                <div style={styles.statCard}>
                    <FaCrown size={24} color="#faa61a" />
                    <div style={styles.statValue}>{currentLevel}</div>
                    <div style={styles.statLabel}>Mevcut Seviye</div>
                </div>
                <div style={styles.statCard}>
                    <FaUsers size={24} color="#43b581" />
                    <div style={styles.statValue}>{boosters.length}</div>
                    <div style={styles.statLabel}>Booster</div>
                </div>
            </div>

            {/* Progress Bar */}
            {currentLevel < 3 && (
                <div style={styles.progressSection}>
                    <div style={styles.progressHeader}>
                        <span style={styles.progressLabel}>
                            Seviye {currentLevel + 1} için ilerleme
                        </span>
                        <span style={styles.progressCount}>
                            {boostCount} / {nextLevelBoosts}
                        </span>
                    </div>
                    <div style={styles.progressBar}>
                        <div
                            style={{
                                ...styles.progressFill,
                                width: `${progress}%`
                            }}
                        />
                    </div>
                    <div style={styles.progressHint}>
                        <FaArrowUp size={12} />
                        <span>{nextLevelBoosts - boostCount} boost daha gerekli</span>
                    </div>
                </div>
            )}

            {/* Current Perks */}
            {currentLevel > 0 && (
                <div style={styles.perksSection}>
                    <h4 style={styles.perksTitle}>
                        <FaStar size={14} color="#faa61a" />
                        Aktif Ayrıcalıklar
                    </h4>
                    <ul style={styles.perksList}>
                        {currentPerks.map((perk, index) => (
                            <li key={index} style={styles.perkItem}>{perk}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Recent Boosters */}
            {boosters.length > 0 && (
                <div style={styles.boostersSection}>
                    <h4 style={styles.boostersTitle}>
                        <FaGift size={14} color="#ff73fa" />
                        Son Boosterlar
                    </h4>
                    <div style={styles.boostersList}>
                        {boosters.slice(0, 5).map((booster, index) => (
                            <div key={index} style={styles.boosterItem}>
                                <div style={styles.boosterAvatar}>
                                    {booster.avatar ? (
                                        <img src={booster.avatar} alt={booster.username} style={styles.avatarImg} />
                                    ) : (
                                        <div style={styles.avatarPlaceholder}>
                                            {booster.username[0].toUpperCase()}
                                        </div>
                                    )}
                                    <FaGem size={10} color="#ff73fa" style={styles.boostIcon} />
                                </div>
                                <div style={styles.boosterInfo}>
                                    <span style={styles.boosterName}>{booster.username}</span>
                                    <span style={styles.boosterDate}>
                                        {new Date(booster.boosted_at).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Next Level Preview */}
            {currentLevel < 3 && (
                <div style={styles.nextLevelSection}>
                    <h4 style={styles.nextLevelTitle}>
                        <FaChartLine size={14} color="#7289da" />
                        Seviye {currentLevel + 1} Ayrıcalıkları
                    </h4>
                    <ul style={styles.nextPerksList}>
                        {(PERKS[currentLevel + 1] || []).map((perk, index) => (
                            <li key={index} style={styles.nextPerkItem}>{perk}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Max Level Badge */}
            {currentLevel === 3 && (
                <div style={styles.maxLevelBadge}>
                    <FaCrown size={24} color="#faa61a" />
                    <span>Maksimum Seviyeye Ulaştınız! 🎉</span>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '20px',
        color: '#dcddde'
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '40px',
        color: '#b9bbbe'
    },
    error: {
        color: '#f04747',
        textAlign: 'center',
        padding: '20px'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
    },
    headerIcon: {
        display: 'flex',
        alignItems: 'center'
    },
    headerTitle: {
        margin: 0,
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff',
        flex: 1
    },
    levelBadge: {
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#ff73fa'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px'
    },
    statCard: {
        backgroundColor: '#202225',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
    },
    statValue: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#fff'
    },
    statLabel: {
        fontSize: '12px',
        color: '#72767d'
    },
    progressSection: {
        backgroundColor: '#202225',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px'
    },
    progressHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
    },
    progressLabel: {
        fontSize: '13px',
        color: '#b9bbbe'
    },
    progressCount: {
        fontSize: '13px',
        color: '#ff73fa',
        fontWeight: '600'
    },
    progressBar: {
        height: '8px',
        backgroundColor: '#40444b',
        borderRadius: '4px',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #ff73fa, #7289da)',
        borderRadius: '4px',
        transition: 'width 0.3s ease'
    },
    progressHint: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginTop: '8px',
        fontSize: '12px',
        color: '#72767d'
    },
    perksSection: {
        backgroundColor: 'rgba(255, 115, 250, 0.1)',
        border: '1px solid rgba(255, 115, 250, 0.3)',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px'
    },
    perksTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '0 0 12px 0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff'
    },
    perksList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    perkItem: {
        padding: '6px 0',
        fontSize: '13px',
        color: '#b9bbbe'
    },
    boostersSection: {
        marginBottom: '16px'
    },
    boostersTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '0 0 12px 0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff'
    },
    boostersList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    boosterItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        backgroundColor: '#202225',
        borderRadius: '6px'
    },
    boosterAvatar: {
        position: 'relative',
        width: '32px',
        height: '32px'
    },
    avatarImg: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    avatarPlaceholder: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600'
    },
    boostIcon: {
        position: 'absolute',
        bottom: '-2px',
        right: '-2px',
        backgroundColor: '#36393f',
        borderRadius: '50%',
        padding: '2px'
    },
    boosterInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    boosterName: {
        fontSize: '13px',
        color: '#fff',
        fontWeight: '500'
    },
    boosterDate: {
        fontSize: '11px',
        color: '#72767d'
    },
    nextLevelSection: {
        backgroundColor: 'rgba(114, 137, 218, 0.1)',
        border: '1px dashed rgba(114, 137, 218, 0.4)',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px'
    },
    nextLevelTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '0 0 12px 0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#7289da'
    },
    nextPerksList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    nextPerkItem: {
        padding: '4px 0',
        fontSize: '12px',
        color: '#72767d'
    },
    maxLevelBadge: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '20px',
        background: 'linear-gradient(135deg, rgba(250, 166, 26, 0.2), rgba(255, 115, 250, 0.2))',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600'
    }
};

// CSS Animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .pulse {
        animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(styleSheet);

// ⚡ Memoized sub-components
const StatCard = memo(({ icon: Icon, iconColor, value, label }) => (
    <div style={styles.statCard} role="group" aria-label={label}>
        <Icon size={24} color={iconColor} aria-hidden="true" />
        <div style={styles.statValue}>{value}</div>
        <div style={styles.statLabel}>{label}</div>
    </div>
));

const BoosterItem = memo(({ booster }) => (
    <div style={styles.boosterItem}>
        <div style={styles.boosterAvatar}>
            {booster.avatar ? (
                <img
                    src={booster.avatar}
                    alt={`${booster.username} avatar`}
                    style={styles.avatarImg}
                    loading="lazy"
                />
            ) : (
                <div style={styles.avatarPlaceholder} aria-hidden="true">
                    {booster.username[0].toUpperCase()}
                </div>
            )}
            <FaGem size={10} color="#ff73fa" style={styles.boostIcon} aria-hidden="true" />
        </div>
        <div style={styles.boosterInfo}>
            <span style={styles.boosterName}>{booster.username}</span>
            <span style={styles.boosterDate}>
                {new Date(booster.boosted_at).toLocaleDateString('tr-TR')}
            </span>
        </div>
    </div>
));

const PerkItem = memo(({ perk }) => (
    <li style={styles.perkItem}>{perk}</li>
));

export default memo(ServerBoostMetrics);
