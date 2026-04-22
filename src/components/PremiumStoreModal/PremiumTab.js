import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { STORE_PURCHASES_ENABLED } from '../../constants/featureFlags';

// Premium Plans data
const PLAN_PRICES = {
    basic: { monthly: 29.99, yearly: 299.99, color: '#5865f2' },
    premium: { monthly: 49.99, yearly: 499.99, color: '#f0b232' },
};

const PremiumTab = ({ styles, handlePurchase }) => {
    const { t } = useTranslation();

    // Plans defined inside component so feature text uses t()
    const premiumPlans = {
        basic: {
            tier: 'basic',
            name: 'Pawscord Nitro Basic',
            price: PLAN_PRICES.basic.monthly,
            priceYearly: PLAN_PRICES.basic.yearly,
            color: PLAN_PRICES.basic.color,
            features: [
                { text: t('premium.servers100'), included: true },
                { text: t('premium.unlimitedFriends'), included: true },
                { text: t('premium.fileUpload50'), included: true },
                { text: t('premium.video1080p'), included: true },
                { text: t('premium.emoji50'), included: true },
                { text: t('premium.animatedAvatar'), included: true },
                { text: t('premium.hdScreenShare'), included: true },
                { text: t('ui.ozel_rozet'), included: true },
                { text: t('premium.serverBoostFeature'), included: false },
                { text: t('premium.video4kFeature'), included: false },
            ],
        },
        premium: {
            tier: 'premium',
            name: 'Pawscord Nitro Premium',
            price: PLAN_PRICES.premium.monthly,
            priceYearly: PLAN_PRICES.premium.yearly,
            color: PLAN_PRICES.premium.color,
            popular: true,
            features: [
                { text: t('premium.unlimitedServers'), included: true },
                { text: t('premium.unlimitedFriends'), included: true },
                { text: t('premium.fileUpload500'), included: true },
                { text: t('premium.video4kQuality'), included: true },
                { text: t('premium.emoji200'), included: true },
                { text: t('premium.animatedAvatarTitle'), included: true },
                { text: t('premium.screen4k60fps'), included: true },
                { text: t('premium.serverBoost2x'), included: true },
                { text: t('premium.aiAssistant'), included: true },
                { text: t('premium.customProfileThemes'), included: true },
            ],
        },
    };
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
        <div aria-label={t('premiumStore.premiumTab', 'Premium tab')} style={styles.premiumTab}>
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
                        <div style={styles.feature}>✅ {t('premium.servers50Free')}</div>
                        <div style={styles.feature}>✅ {t('premium.friends100Free')}</div>
                        <div style={styles.feature}>✅ {t('premium.fileUpload8')}</div>
                        <div style={styles.feature}>✅ {t('premium.video720p')}</div>
                        <div style={mutedFeatureStyle}>❌ {t('premium.customEmoji')}</div>
                        <div style={mutedFeatureStyle}>❌ {t('premium.animatedAvatar')}</div>
                    </div>
                    <button style={styles.currentPlanButton} disabled>
                        {t('premium.currentPlan')}
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
                        {STORE_PURCHASES_ENABLED ? `${t('premium.purchase')} (${t('premium.monthly')})` : t('boost.comingSoon')}
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
                            ? `${t('premium.purchase')} (${t('premium.save17')}) - ${premiumPlans.basic.priceYearly} TL`
                            : t('boost.comingSoon')}
                    </button>
                </div>

                {/* Premium Plan */}
                <div style={popularPlanStyle}>
                    <div style={styles.popularBadge}>
                        <FaStar /> {t('premium.mostPopular')}
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
                        {STORE_PURCHASES_ENABLED ? `${t('premium.purchase')} (${t('premium.monthly')})` : t('boost.comingSoon')}
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
                            ? `${t('premium.purchase')} (${t('premium.save17')}) - ${premiumPlans.premium.priceYearly} TL`
                            : t('boost.comingSoon')}
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
