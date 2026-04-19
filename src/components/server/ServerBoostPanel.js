/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-undef */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaRocket, FaCrown, FaStar, FaGift, FaHistory, FaUsers } from 'react-icons/fa';
import { styles } from '../ServerBoostPanel/serverBoostStyles';
import useServerBoost, { PERKS, getBoostLevel } from '../ServerBoostPanel/useServerBoost';
import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

const S = {
    el: { ...styles.tab, ...(activeTab === t.key && styles.tabActive) },
};

const ServerBoostPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const {
        boosts,
        serverStats,
        loading,
        activeTab,
        setActiveTab,
        boostServer,
        currentBoostCount,
        currentLevel,
        progress,
    } = useServerBoost(fetchWithAuth, apiBaseUrl, serverId);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaRocket className="icon-primary-mr10" />
                        <h2 style={styles.title}>Sunucu Boost</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.tabs}>
                    {[
                        { key: 'overview', icon: <FaRocket className="mr-5" />, label: 'Overview' },
                        {
                            key: 'boosts',
                            icon: <FaHistory className="mr-5" />,
                            label: `Boosts (${boosts.length})`,
                        },
                        { key: 'perks', icon: <FaGift className="mr-5" />, label: 'Perks' },
                    ].map((t) => (
                        <button
                            aria-label="Switch tab"
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            style={S.el}
                        >
                            {t.icon}
                            {t.label}
                        </button>
                    ))}
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : activeTab === 'overview' ? (
                        <div style={styles.overview}>
                            <div style={styles.boostCard}>
                                <div>
                                    <FaCrown className="fs-32" />
                                    <div style={styles.levelText}>{currentLevel.name}</div>
                                    <div style={styles.boostCountText}>
                                        {currentBoostCount} Boosts
                                    </div>
                                </div>
                                <div style={styles.progressSection}>
                                    <div style={styles.progressHeader}>
                                        <span>Bir Sonraki Seviyeye İlerleme</span>
                                        <span>
                                            {progress.current} / {progress.target}
                                        </span>
                                    </div>
                                    <div style={styles.progressBar}>
                                        <div
                                            style={{
                                                ...styles.progressFill,
                                                width: `${Math.min(progress.percentage, 100)}%`,
                                                backgroundColor: currentLevel.color,
                                            }}
                                        />
                                    </div>
                                    {currentBoostCount < 30 && (
                                        <div style={styles.progressFooter}>
                                            {progress.target - progress.current} more boosts needed
                                        </div>
                                    )}
                                </div>
                                <button
                                    aria-label="boost Server"
                                    onClick={boostServer}
                                    style={styles.boostButton}
                                >
                                    <FaRocket className="mr-8" /> Boost This Server
                                </button>
                            </div>
                            <div style={styles.statsGrid}>
                                {[
                                    {
                                        icon: <FaUsers style={styles.statIcon} />,
                                        value: serverStats?.total_boosters || 0,
                                        label: 'Boosters',
                                    },
                                    {
                                        icon: <FaStar style={styles.statIcon} />,
                                        value: serverStats?.total_boosts || 0,
                                        label: 'Total Boosts',
                                    },
                                    {
                                        icon: <FaCrown style={styles.statIcon} />,
                                        value: currentLevel.level,
                                        label: 'Current Level',
                                    },
                                ].map((s, i) => (
                                    <div key={`item-${i}`} style={styles.statCard}>
                                        {s.icon}
                                        <div style={styles.statValue}>{s.value}</div>
                                        <div style={styles.statLabel}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : activeTab === 'boosts' ? (
                        <div style={styles.boostsList}>
                            {boosts.length === 0 ? (
                                <div style={styles.empty}>
                                    Henüz boost yok. Bu sunucuyu destekleyen ilk kişi siz olun!
                                </div>
                            ) : (
                                boosts.map((boost, index) => (
                                    <div key={`item-${index}`} style={styles.boostItem}>
                                        <div style={styles.boostUser}>
                                            <FaRocket className="primary-mr10" />
                                            <div>
                                                <div style={styles.boostUsername}>
                                                    {boost.user?.username || 'Anonymous'}
                                                </div>
                                                <div style={styles.boostDate}>
                                                    Boosted{' '}
                                                    {new Date(
                                                        boost.boosted_at
                                                    ).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        {boost.expires_at && (
                                            <div style={styles.boostExpires}>
                                                Expires{' '}
                                                {new Date(boost.expires_at).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div style={styles.perksList}>
                            {[1, 2, 3].map((level) => (
                                <div key={level} style={styles.perkLevel}>
                                    <div style={styles.perkLevelHeader}>
                                        <FaCrown
                                            style={{
                                                marginRight: '8px',
                                                color: getBoostLevel(
                                                    level === 1 ? 2 : level === 2 ? 15 : 30
                                                ).color,
                                            }}
                                        />
                                        Level {level} Perks
                                        <span style={styles.perkRequirement}>
                                            ({level === 1 ? '2' : level === 2 ? '15' : '30'} boosts
                                            required)
                                        </span>
                                    </div>
                                    <div style={styles.perksGrid}>
                                        {PERKS.filter((p) => p.level === level).map((perk, idx) => (
                                            <div
                                                key={`item-${idx}`}
                                                style={{
                                                    ...styles.perkCard,
                                                    opacity: currentLevel.level >= level ? 1 : 0.5,
                                                }}
                                            >
                                                <div style={styles.perkIcon}>{perk.icon}</div>
                                                <div style={styles.perkName}>{perk.name}</div>
                                                <div style={styles.perkDescription}>
                                                    {perk.description}
                                                </div>
                                                {currentLevel.level >= level && (
                                                    <div style={styles.perkUnlocked}>
                                                        ✓ Unlocked
                                                    </div>
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

ServerBoostPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    serverId: PropTypes.string,
};
export default ServerBoostPanel;
