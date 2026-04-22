import toast from '../../utils/toast';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { STORE_PURCHASES_ENABLED } from '../../constants/featureFlags';

const BoostTab = ({ styles, loading, setLoading, token, API_BASE_URL }) => {
    const { t } = useTranslation();
    const tierStyles = {
        level1Badge: {
            ...styles.tierBadge,
            background: 'linear-gradient(135deg, #cd7f32, #a0522d)',
        },
        level1Card: { ...styles.boostTierCard, borderColor: '#cd7f32' },
        level2Badge: {
            ...styles.tierBadge,
            background: 'linear-gradient(135deg, #c0c0c0, #808080)',
        },
        level2Card: { ...styles.boostTierCard, borderColor: '#c0c0c0', transform: 'scale(1.02)' },
        level3Badge: {
            ...styles.tierBadge,
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
        },
        level3Card: {
            ...styles.boostTierCard,
            borderColor: '#ffd700',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
        },
    };

    const handleBoost = async () => {
        const serverId = prompt("Güçlendirilecek Sunucu ID'sini girin:");
        if (!serverId) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/servers/boost/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_id: serverId, level: 1 }),
            });
            const data = await res.json();

            if (data.status === 'boosted') {
                toast.success(t('boost.boosted'));
            } else {
                toast.error(data.error || t('ui.boost_yapilamadi'));
            }
        } catch (err) {
            toast.error(t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div aria-label={t('premiumStore.boostTab', 'Server boost tab')} style={styles.boostTab}>
            <div style={styles.boostHeader}>
                <h3 style={styles.boostTitle}>
                    <span style={styles.boostIcon}>🚀</span>
                    {t('boost.serverBoost')}
                </h3>
                <p style={styles.boostSubtitle}>
                    {t('boost.boostSubtitle')}
                </p>
            </div>

            <div style={styles.boostTiersContainer}>
                {/* Level 1 */}
                <div style={tierStyles.level1Card}>
                    <div style={tierStyles.level1Badge}>
                        <span style={styles.tierNumber}>1</span>
                    </div>
                    <h4 style={styles.tierTitle}>{t('boost.level1')}</h4>
                    <p style={styles.tierRequirement}>{t('boost.boostsRequired', { count: 2 })}</p>
                    <ul style={styles.tierFeatureList}>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎨</span>{t('boost.emojiSlots', { count: 100 })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎵</span>{t('boost.voiceQuality', { kbps: 256 })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>📁</span>{t('boost.fileUpload', { size: 50 })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>✨</span>{t('boost.animatedIcon')}
                        </li>
                    </ul>
                </div>

                {/* Level 2 */}
                <div style={tierStyles.level2Card}>
                    <div style={tierStyles.level2Badge}>
                        <span style={styles.tierNumber}>2</span>
                    </div>
                    <div style={styles.popularBadge}>{t('boost.popular')}</div>
                    <h4 style={styles.tierTitle}>{t('boost.level2')}</h4>
                    <p style={styles.tierRequirement}>{t('boost.boostsRequired', { count: 7 })}</p>
                    <ul style={styles.tierFeatureList}>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎨</span>{t('boost.emojiSlots', { count: 150 })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎵</span>{t('boost.voiceQuality', { kbps: 384 })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>📁</span>{t('boost.fileUpload', { size: 100 })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>📺</span>{t('boost.goLive', { res: '1080p' })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🔗</span>{t('boost.customInvite')}
                        </li>
                    </ul>
                </div>

                {/* Level 3 */}
                <div style={tierStyles.level3Card}>
                    <div style={tierStyles.level3Badge}>
                        <span style={styles.tierNumber}>3</span>
                    </div>
                    <div style={styles.premiumBadge}>👑 Premium</div>
                    <h4 style={styles.tierTitle}>{t('boost.level3')}</h4>
                    <p style={styles.tierRequirement}>{t('boost.boostsRequired', { count: 14 })}</p>
                    <ul style={styles.tierFeatureList}>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎨</span>{t('boost.emojiSlots', { count: 250 })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎵</span>{t('boost.voiceQuality', { kbps: 384 })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>📁</span>{t('boost.fileUpload', { size: 500 })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>📺</span>{t('boost.goLive', { res: '4K 60FPS' })}
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🔊</span>{t('boost.soundEffects')}
                        </li>
                    </ul>
                </div>
            </div>

            <button
                onClick={STORE_PURCHASES_ENABLED ? handleBoost : undefined}
                style={{
                    ...styles.boostPurchaseButton,
                    ...(!STORE_PURCHASES_ENABLED && {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                        background: '#444',
                    }),
                }}
                disabled={loading || !STORE_PURCHASES_ENABLED}
            >
                <span style={styles.boostButtonIcon}>🚀</span>
                {STORE_PURCHASES_ENABLED ? t('boost.purchaseBoost') : t('boost.comingSoon')}
            </button>
        </div>
    );
};

BoostTab.propTypes = {
    styles: PropTypes.object,
    loading: PropTypes.bool,
    setLoading: PropTypes.func,
    token: PropTypes.string,
    API_BASE_URL: PropTypes.string,
};

export default BoostTab;
