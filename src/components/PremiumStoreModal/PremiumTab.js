import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { STORE_PURCHASES_ENABLED } from '../../constants/featureFlags';

// Premium Plans data
const premiumPlans = {
    basic: {
        tier: 'basic',
        name: 'Pawscord Nitro Basic',
        price: 29.99,
        priceYearly: 299.99,
        color: '#5865f2',
        features: [
            { text: '100 Sunucu', included: true },
            { text: 'Sınırsız Arkadaş', included: true },
            { text: '50 MB Dosya Yükleme', included: true },
            { text: '1080p Video Kalitesi', included: true },
            { text: '50 Özel Emoji', included: true },
            { text: 'Hareketli Avatar', included: true },
            { text: 'HD Ekran Paylaşımı', included: true },
            { text: 'Özel Rozet', included: true },
            { text: 'Sunucu Güçlendirme', included: false },
            { text: '4K Video', included: false },
        ],
    },
    premium: {
        tier: 'premium',
        name: 'Pawscord Nitro Premium',
        price: 49.99,
        priceYearly: 499.99,
        color: '#f0b232',
        popular: true,
        features: [
            { text: 'Sınırsız Sunucu', included: true },
            { text: 'Sınırsız Arkadaş', included: true },
            { text: '500 MB Dosya Yükleme', included: true },
            { text: '4K Video Kalitesi', included: true },
            { text: '200 Özel Emoji', included: true },
            { text: 'Hareketli Avatar + Başlık', included: true },
            { text: '4K Ekran Paylaşımı 60FPS', included: true },
            { text: '2x Sunucu Güçlendirme Dahil', included: true },
            { text: 'AI Asistan', included: true },
            { text: 'Özel Profil Temaları', included: true },
        ],
    },
};

const PremiumTab = ({ styles, handlePurchase }) => {
    const { t } = useTranslation();
    const basicHeaderStyle = { ...styles.planHeader, borderColor: premiumPlans.basic.color };
    const basicBtnStyle = { ...styles.purchaseButton, backgroundColor: premiumPlans.basic.color };
    const premiumHeaderStyle = { ...styles.planHeader, borderColor: premiumPlans.premium.color };
    const premiumBtnStyle = {
        ...styles.purchaseButton,
        backgroundColor: premiumPlans.premium.color,
    };
    const popularPlanStyle = { ...styles.planCard, ...styles.popularCard };
    const mutedFeatureStyle = { ...styles.feature, opacity: 0.5 };

    return (
        <div aria-label="premium tab" style={styles.premiumTab}>
            <h3 style={styles.sectionTitle}>{t('premium_membership_plans')}</h3>
            <div style={styles.plansGrid}>
                {/* Free Plan */}
                <div style={styles.planCard}>
                    <div style={styles.planHeader}>
                        <h4 style={styles.planName}>{t('free')}</h4>
                        <div style={styles.planPrice}>
                            <span style={styles.price}>0</span>
                            <span style={styles.currency}>{t('tl_month')}</span>
                        </div>
                    </div>
                    <div style={styles.featuresList}>
                        <div style={styles.feature}>✅ 50 Sunucu</div>
                        <div style={styles.feature}>✅ 100 Arkadaş</div>
                        <div style={styles.feature}>✅ 8 MB Dosya Yükleme</div>
                        <div style={styles.feature}>✅ 720p Video Kalitesi</div>
                        <div style={mutedFeatureStyle}>❌ Özel Emoji</div>
                        <div style={mutedFeatureStyle}>❌ Animasyonlu Avatar</div>
                    </div>
                    <button style={styles.currentPlanButton} disabled>
                        {t('mevcut_plan', 'Mevcut Plan')}
                    </button>
                </div>

                {/* Basic Plan */}
                <div style={styles.planCard}>
                    <div style={basicHeaderStyle}>
                        <h4 style={styles.planName}>{premiumPlans.basic.name}</h4>
                        <div style={styles.planPrice}>
                            <span style={styles.price}>{premiumPlans.basic.price}</span>
                            <span style={styles.currency}>{t('tl_month')}</span>
                        </div>
                    </div>
                    <div style={styles.featuresList}>
                        {premiumPlans.basic.features.map((feature, i) => {
                            const featureStyle = {
                                ...styles.feature,
                                opacity: feature.included ? 1 : 0.5,
                            };
                            return (
                                <div key={`item-${i}`} style={featureStyle}>
                                    {feature.included ? '✅' : '❌'} {feature.text}
                                </div>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => handlePurchase(premiumPlans.basic, false)}
                        style={basicBtnStyle}
                        disabled={!STORE_PURCHASES_ENABLED}
                    >
                        {STORE_PURCHASES_ENABLED ? 'Satın Al (Aylık)' : '🔒 Çok Yakında'}
                    </button>
                    <button
                        onClick={() => handlePurchase(premiumPlans.basic, true)}
                        style={{
                            ...styles.yearlyButton,
                            ...(!STORE_PURCHASES_ENABLED && {
                                opacity: 0.5,
                                cursor: 'not-allowed',
                            }),
                        }}
                        disabled={!STORE_PURCHASES_ENABLED}
                    >
                        {STORE_PURCHASES_ENABLED
                            ? `Yıllık Satın Al (%16 indirim) - ${premiumPlans.basic.priceYearly} TL`
                            : '🔒 Çok Yakında'}
                    </button>
                </div>

                {/* Premium Plan */}
                <div style={popularPlanStyle}>
                    <div style={styles.popularBadge}>
                        <FaStar /> EN POPÜLER
                    </div>
                    <div style={premiumHeaderStyle}>
                        <h4 style={styles.planName}>{premiumPlans.premium.name}</h4>
                        <div style={styles.planPrice}>
                            <span style={styles.price}>{premiumPlans.premium.price}</span>
                            <span style={styles.currency}>{t('tl_month')}</span>
                        </div>
                    </div>
                    <div style={styles.featuresList}>
                        {premiumPlans.premium.features.map((feature, i) => {
                            const featureStyle = {
                                ...styles.feature,
                                opacity: feature.included ? 1 : 0.5,
                            };
                            return (
                                <div key={`item-${i}`} style={featureStyle}>
                                    {feature.included ? '✅' : '❌'} {feature.text}
                                </div>
                            );
                        })}
                    </div>
                    <button
                        onClick={() => handlePurchase(premiumPlans.premium, false)}
                        style={premiumBtnStyle}
                        disabled={!STORE_PURCHASES_ENABLED}
                    >
                        {STORE_PURCHASES_ENABLED ? 'Satın Al (Aylık)' : '🔒 Çok Yakında'}
                    </button>
                    <button
                        onClick={() => handlePurchase(premiumPlans.premium, true)}
                        style={{
                            ...styles.yearlyButton,
                            ...(!STORE_PURCHASES_ENABLED && {
                                opacity: 0.5,
                                cursor: 'not-allowed',
                            }),
                        }}
                        disabled={!STORE_PURCHASES_ENABLED}
                    >
                        {STORE_PURCHASES_ENABLED
                            ? `Yıllık Satın Al (%16 indirim) - ${premiumPlans.premium.priceYearly} TL`
                            : '🔒 Çok Yakında'}
                    </button>
                </div>
            </div>
        </div>
    );
};

PremiumTab.propTypes = {
    styles: PropTypes.object,
    handlePurchase: PropTypes.func,
};

export default PremiumTab;
