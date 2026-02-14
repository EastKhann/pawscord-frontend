import { FaStar } from 'react-icons/fa';

// Premium Plans data
const premiumPlans = {
    basic: {
        tier: 'basic',
        name: "Pawscord Nitro Basic",
        price: 29.99,
        priceYearly: 299.99,
        color: "#5865f2",
        features: [
            { text: "100 sunucu", included: true },
            { text: "Sınırsız arkadaş", included: true },
            { text: "50 MB dosya yükleme", included: true },
            { text: "1080p video kalitesi", included: true },
            { text: "50 özel emoji", included: true },
            { text: "Animated avatar", included: true },
            { text: "HD ekran paylaşımı", included: true },
            { text: "Özel rozet", included: true },
            { text: "Server boosting", included: false },
            { text: "4K video", included: false }
        ]
    },
    premium: {
        tier: 'premium',
        name: "Pawscord Nitro Premium",
        price: 49.99,
        priceYearly: 499.99,
        color: "#f0b232",
        popular: true,
        features: [
            { text: "Sınırsız sunucu", included: true },
            { text: "Sınırsız arkadaş", included: true },
            { text: "500 MB dosya yükleme", included: true },
            { text: "4K video kalitesi", included: true },
            { text: "200 özel emoji", included: true },
            { text: "Animated avatar + banner", included: true },
            { text: "4K ekran paylaşımı 60FPS", included: true },
            { text: "2x Server boost dahil", included: true },
            { text: "AI asistan", included: true },
            { text: "Özel profil temaları", included: true }
        ]
    }
};

const PremiumTab = ({ styles, handlePurchase }) => (
    <div style={styles.premiumTab}>
        <h3 style={styles.sectionTitle}>Premium Üyelik Planları</h3>
        <div style={styles.plansGrid}>
            {/* Free Plan */}
            <div style={styles.planCard}>
                <div style={styles.planHeader}>
                    <h4 style={styles.planName}>Ücretsiz</h4>
                    <div style={styles.planPrice}>
                        <span style={styles.price}>0</span>
                        <span style={styles.currency}>TL/ay</span>
                    </div>
                </div>
                <div style={styles.featuresList}>
                    <div style={styles.feature}>✅ 50 sunucu</div>
                    <div style={styles.feature}>✅ 100 arkadaş</div>
                    <div style={styles.feature}>✅ 8 MB dosya yükleme</div>
                    <div style={styles.feature}>✅ 720p video</div>
                    <div style={{ ...styles.feature, opacity: 0.5 }}>❌ Özel emoji</div>
                    <div style={{ ...styles.feature, opacity: 0.5 }}>❌ Animated avatar</div>
                </div>
                <button style={styles.currentPlanButton} disabled>
                    Mevcut Plan
                </button>
            </div>

            {/* Basic Plan */}
            <div style={styles.planCard}>
                <div style={{ ...styles.planHeader, borderColor: premiumPlans.basic.color }}>
                    <h4 style={styles.planName}>{premiumPlans.basic.name}</h4>
                    <div style={styles.planPrice}>
                        <span style={styles.price}>{premiumPlans.basic.price}</span>
                        <span style={styles.currency}>TL/ay</span>
                    </div>
                </div>
                <div style={styles.featuresList}>
                    {premiumPlans.basic.features.map((feature, i) => (
                        <div key={i} style={{ ...styles.feature, opacity: feature.included ? 1 : 0.5 }}>
                            {feature.included ? '✅' : '❌'} {feature.text}
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => handlePurchase(premiumPlans.basic, false)}
                    style={{ ...styles.purchaseButton, backgroundColor: premiumPlans.basic.color }}
                >
                    Satın Al (Aylık)
                </button>
                <button
                    onClick={() => handlePurchase(premiumPlans.basic, true)}
                    style={styles.yearlyButton}
                >
                    Yıllık Al (%16 İndirim) - {premiumPlans.basic.priceYearly} TL
                </button>
            </div>

            {/* Premium Plan */}
            <div style={{ ...styles.planCard, ...styles.popularCard }}>
                <div style={styles.popularBadge}>
                    <FaStar /> EN POPÜLER
                </div>
                <div style={{ ...styles.planHeader, borderColor: premiumPlans.premium.color }}>
                    <h4 style={styles.planName}>{premiumPlans.premium.name}</h4>
                    <div style={styles.planPrice}>
                        <span style={styles.price}>{premiumPlans.premium.price}</span>
                        <span style={styles.currency}>TL/ay</span>
                    </div>
                </div>
                <div style={styles.featuresList}>
                    {premiumPlans.premium.features.map((feature, i) => (
                        <div key={i} style={{ ...styles.feature, opacity: feature.included ? 1 : 0.5 }}>
                            {feature.included ? '✅' : '❌'} {feature.text}
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => handlePurchase(premiumPlans.premium, false)}
                    style={{ ...styles.purchaseButton, backgroundColor: premiumPlans.premium.color }}
                >
                    Satın Al (Aylık)
                </button>
                <button
                    onClick={() => handlePurchase(premiumPlans.premium, true)}
                    style={styles.yearlyButton}
                >
                    Yıllık Al (%16 İndirim) - {premiumPlans.premium.priceYearly} TL
                </button>
            </div>
        </div>
    </div>
);

export default PremiumTab;
