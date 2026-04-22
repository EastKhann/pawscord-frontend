import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import profileStyles from '../styles';
const _s = (o) => o;

// -- dynamic style helpers (pass 2) --
const _st1108 = { ...profileStyles.progressBar, height: '6px' };

// -- extracted inline style constants --
const _st1 = { marginBottom: '32px' };
const _st2 = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
};
const _st3 = { color: '#fff', fontSize: '16px', fontWeight: '600' };
const _st4 = { color: '#b5bac1', fontSize: '14px' };
const _st5 = { marginBottom: '24px' };
const _st6 = { color: '#fff', marginBottom: '12px' };
const _st7 = { color: '#fff', marginBottom: '16px' };
const _st8 = { color: '#b5bac1' };
const _st9 = { display: 'flex', flexWrap: 'wrap', gap: '8px' };
const _st10 = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginTop: '16px',
};
const _st11 = { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' };
const _st12 = { fontSize: '32px' };
const _st13 = { flex: 1 };
const _st14 = { marginLeft: '8px', color: '#23a559' };
const _st15 = { color: '#b5bac1', margin: '4px 0 0 0', fontSize: '12px' };
const _st16 = { color: '#b5bac1', fontSize: '11px', marginTop: '4px' };

const BadgesTab = ({
    achievements: rawAch,
    badges: rawBadges,
    calculateXPProgress,
    storeBalance,
    userStats,
}) => {
    const { t } = useTranslation();
    const badges = rawBadges || [];
    const achievements = rawAch || [];
    const styles = profileStyles;
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <>
            <div aria-label={t('aria.badgesTab', 'Badges')} style={styles.card}>
                <h3 style={styles.sectionTitle}>🏆 Rozetler & XP</h3>

                <div style={_st1}>
                    <div style={_st2}>
                        <span style={_st3}>Level {userStats.level}</span>
                        <span style={_st4}>
                            {userStats.xp} / {userStats.next_level_xp} XP
                        </span>
                    </div>
                    <div style={styles.progressBar}>
                        <div style={styles.progressFill(calculateXPProgress())} />
                    </div>
                </div>

                <div style={_st5}>
                    <h4 style={_st6}>💰 Coin: {userStats.coins}</h4>
                    <h4 style={_st6}>🏪 Store Balance: ${storeBalance.toFixed(2)}</h4>
                </div>

                <h4 style={_st7}>🎖️ Earned Badges</h4>

                {badges.length === 0 && (
                    <p style={_st8}>{t('badgesTab.noBadges', 'No badges earned yet. Show more activity!')}</p>
                )}

                <div style={_st9}>
                    {badges.map((badge, idx) => (
                        <div key={`item-${idx}`} style={styles.badge} title={badge.description}>
                            {badge.icon} {badge.name}
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.card}>
                <h3 style={styles.sectionTitle}>🎯 Achievements</h3>

                {achievements.length === 0 && <p style={_st8}>{t('badgesTab.noAchievements', 'No achievements earned yet.')}</p>}

                <div style={_st10}>
                    {achievements.map((achievement, idx) => (
                        <div
                            key={`item-${idx}`}
                            style={_s({
                                padding: '16px',
                                background: achievement.completed
                                    ? 'linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)'
                                    : 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '12px',
                                border: achievement.completed
                                    ? '1px solid rgba(67, 181, 129, 0.3)'
                                    : '1px solid rgba(255, 255, 255, 0.05)',
                            })}
                        >
                            <div style={_st11}>
                                <div style={_st12}>{achievement.icon || '🏆'}</div>
                                <div style={_st13}>
                                    <h4 style={styles.settingRowTitle}>
                                        {achievement.name}
                                        {achievement.completed && <span style={_st14}>✅</span>}
                                    </h4>
                                    <p style={_st15}>{achievement.description}</p>
                                </div>
                            </div>
                            {achievement.progress !== undefined && (
                                <div>
                                    <div style={_st1108}>
                                        <div
                                            style={styles.progressFill(
                                                (achievement.progress / achievement.target) * 100
                                            )}
                                        />
                                    </div>
                                    <p style={_st16}>
                                        {achievement.progress} / {achievement.target}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

BadgesTab.propTypes = {
    achievements: PropTypes.array,
    badges: PropTypes.array,
    calculateXPProgress: PropTypes.array,
    storeBalance: PropTypes.object,
    userStats: PropTypes.array,
};
export default BadgesTab;
