// frontend/src/components/PremiumMarketplace.js
// 💎 Premium Marketplace - Strategic Pricing & Discounts

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import { authFetch } from '../../utils/authFetch';
import logger from '../../utils/logger';
import './PremiumMarketplace.css';

const PremiumMarketplace = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [billingCycle, setBillingCycle] = useState('yearly'); // yearly saves money!
    const [promotion, setPromotion] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const res = await authFetch('/api/premium/plans/');
            const json = await res.json();
            setPlans(json.plans);
            setPromotion(json.promotion);
            setLoading(false);
        } catch (error) {
            logger.error('Failed to fetch plans:', error);
            setLoading(false);
        }
    };

    const handlePurchase = async (plan) => {
        setSelectedPlan(plan);

        try {
            const res = await authFetch('/api/premium/purchase/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan_id: plan.id, billing_cycle: billingCycle }),
            });

            const json = await res.json();
            // Redirect to backend-generated checkout URL (Stripe Checkout Session)
            if (json.checkout_url) {
                window.location.href = json.checkout_url;
                return;
            }

            toast.info(t('premium.purchasing', { name: plan.name, cycle: billingCycle }));
        } catch (error) {
            logger.error('Purchase failed:', error);
            toast.error(t('premium.purchaseFailed'));
        }
    };

    const calculateSavings = (plan) => {
        const monthlyTotal = plan.monthly_price * 12;
        const yearlyPrice = plan.yearly_price;
        const savings = monthlyTotal - yearlyPrice;
        const percentage = Math.round((savings / monthlyTotal) * 100);
        return { amount: savings.toFixed(2), percentage };
    };

    if (loading) {
        return <div className="loading">{t('premium.loadingPlans')}</div>;
    }

    return (
        <div className="premium-marketplace">
            {/* Promotion Banner */}
            {promotion && (
                <div className="promotion-banner">
                    <h2>{promotion.name}</h2>
                    <p>🔥 {t('premium.savePercent', { percent: promotion.discount_percent })}</p>
                    <p className="promotion-ends">
                        Ends: {new Date(promotion.ends_at).toLocaleDateString()}
                    </p>
                </div>
            )}

            {/* Billing Toggle */}
            <div className="billing-toggle">
                <button
                    aria-label="Action button"
                    className={billingCycle === 'monthly' ? 'active' : ''}
                    onClick={() => setBillingCycle('monthly')}
                >
                    {t('premium.monthly')}
                </button>
                <button
                    aria-label="Action button"
                    className={billingCycle === 'yearly' ? 'active' : ''}
                    onClick={() => setBillingCycle('yearly')}
                >
                    {t('premium.yearly')} <span className="save-badge">{t('premium.save17')}</span>
                </button>
            </div>

            {/* Plans Grid */}
            <div className="plans-grid">
                {plans.map((plan, index) => {
                    const savings = calculateSavings(plan);
                    const price =
                        billingCycle === 'yearly' ? plan.yearly_price : plan.monthly_price;
                    const originalPrice = plan.original_yearly_price || plan.original_monthly_price;

                    return (
                        <PremiumPlanCard
                            key={plan.id}
                            plan={plan}
                            price={price}
                            originalPrice={originalPrice}
                            billingCycle={billingCycle}
                            savings={savings}
                            promotion={promotion}
                            onPurchase={() => handlePurchase(plan)}
                            featured={index === 1} // Premium is featured
                        />
                    );
                })}
            </div>

            {/* FAQ */}
            <div className="premium-faq">
                <h3>{t('premium.faqTitle')}</h3>
                <div className="faq-item">
                    <h4>{t('premium.faqCancel')}</h4>
                    <p>{t('premium.faqCancelAnswer')}</p>
                </div>
                <div className="faq-item">
                    <h4>{t('premium.faqPayment')}</h4>
                    <p>{t('premium.faqPaymentAnswer')}</p>
                </div>
                <div className="faq-item">
                    <h4>{t('premium.faqTrial')}</h4>
                    <p>{t('premium.faqTrialAnswer')}</p>
                </div>
            </div>
        </div>
    );
};

const PremiumPlanCard = ({
    plan,
    price,
    originalPrice,
    billingCycle,
    savings,
    promotion,
    onPurchase,
    featured,
}) => {
    const { t } = useTranslation();
    return (
        <div className={`premium-plan-card ${featured ? 'featured' : ''}`}>
            {featured && <div className="featured-badge">{t('premium.mostPopular')}</div>}

            <div className="plan-header">
                <h3>{plan.name}</h3>

                <div className="plan-price">
                    {originalPrice && promotion && (
                        <span className="original-price">${originalPrice}</span>
                    )}
                    <span className="current-price">
                        ${price}
                        <span className="billing-period">
                            /{billingCycle === 'yearly' ? t('premium.year') : t('premium.month')}
                        </span>
                    </span>

                    {billingCycle === 'yearly' && (
                        <div className="savings-badge">
                            {t('premium.savingsBadge', {
                                amount: savings.amount,
                                percentage: savings.percentage,
                            })}
                        </div>
                    )}
                </div>
            </div>

            <ul className="plan-features">
                {plan.features.map((feature, i) => (
                    <li key={`item-${i}`}>
                        <span className="check">✓</span> {feature}
                    </li>
                ))}
            </ul>

            <button aria-label="on Purchase" className="purchase-btn" onClick={onPurchase}>
                {featured ? t('premium.upgradeNow') : t('premium.getStarted')}
            </button>

            {billingCycle === 'yearly' && (
                <p className="monthly-equivalent">
                    {t('premium.monthlyEquivalent', { price: (price / 12).toFixed(2) })}
                </p>
            )}
        </div>
    );
};

PremiumMarketplace.propTypes = {
    plan: PropTypes.string,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
    billingCycle: PropTypes.string,
    savings: PropTypes.number,
    promotion: PropTypes.string,
    onPurchase: PropTypes.func,
    featured: PropTypes.bool,
};

PremiumPlanCard.propTypes = {
    plan: PropTypes.string,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
    billingCycle: PropTypes.string,
    savings: PropTypes.number,
    promotion: PropTypes.string,
    onPurchase: PropTypes.func,
    featured: PropTypes.bool,
};

export default PremiumMarketplace;
