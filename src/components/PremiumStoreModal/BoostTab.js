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
        <div aria-label="boost tab" style={styles.boostTab}>
            <div style={styles.boostHeader}>
                <h3 style={styles.boostTitle}>
                    <span style={styles.boostIcon}>🚀</span>
                    Sunucu Güçlendirme
                </h3>
                <p style={styles.boostSubtitle}>
                    Sevdiğin sunucuları güçlendir ve özel özellikler kazan!
                </p>
            </div>

            <div style={styles.boostTiersContainer}>
                {/* Level 1 */}
                <div style={tierStyles.level1Card}>
                    <div style={tierStyles.level1Badge}>
                        <span style={styles.tierNumber}>1</span>
                    </div>
                    <h4 style={styles.tierTitle}>Seviye 1</h4>
                    <p style={styles.tierRequirement}>2 boost gerekli</p>
                    <ul style={styles.tierFeatureList}>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎨</span>100 Emoji Slot
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎵</span>256 Kbps Ses Kalitesi
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>📁</span>50 MB Dosya Yükleme
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>✨</span>Animasyonlu sunucu ikonu
                        </li>
                    </ul>
                </div>

                {/* Level 2 */}
                <div style={tierStyles.level2Card}>
                    <div style={tierStyles.level2Badge}>
                        <span style={styles.tierNumber}>2</span>
                    </div>
                    <div style={styles.popularBadge}>⭐ Popüler</div>
                    <h4 style={styles.tierTitle}>Seviye 2</h4>
                    <p style={styles.tierRequirement}>7 boost gerekli</p>
                    <ul style={styles.tierFeatureList}>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎨</span>150 Emoji Slot
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎵</span>384 Kbps Ses Kalitesi
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>📁</span>100 MB Dosya Yükleme
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>📺</span>1080p Go Live
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🔗</span>Özel davet linki
                        </li>
                    </ul>
                </div>

                {/* Level 3 */}
                <div style={tierStyles.level3Card}>
                    <div style={tierStyles.level3Badge}>
                        <span style={styles.tierNumber}>3</span>
                    </div>
                    <div style={styles.premiumBadge}>👑 Premium</div>
                    <h4 style={styles.tierTitle}>Seviye 3</h4>
                    <p style={styles.tierRequirement}>14 boost gerekli</p>
                    <ul style={styles.tierFeatureList}>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎨</span>250 Emoji Slot
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🎵</span>384 Kbps Ses Kalitesi
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>📁</span>500 MB Dosya Yükleme
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>📺</span>4K Go Live 60FPS
                        </li>
                        <li style={styles.tierFeature}>
                            <span style={styles.featureIcon}>🔊</span>Özel ses efektleri
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
                {STORE_PURCHASES_ENABLED ? 'Güçlendirme Satın Al (19.99 TL/ay)' : '🔒 Çok Yakında'}
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
