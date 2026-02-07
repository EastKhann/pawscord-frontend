// frontend/src/components/PremiumMarketplace.js
// 💎 Premium Marketplace - Strategic Pricing & Discounts

import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import axios from 'axios';
import './PremiumMarketplace.css';

const PremiumMarketplace = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [billingCycle, setBillingCycle] = useState('yearly'); // yearly saves money!
    const [promotion, setPromotion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await axios.get('/api/premium/plans/');
            setPlans(response.data.plans);
            setPromotion(response.data.promotion);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch plans:', error);
            setLoading(false);
        }
    };

    const handlePurchase = async (plan) => {
        setSelectedPlan(plan);

        try {
            const response = await axios.post('/api/premium/purchase/', {
                plan_id: plan.id,
                billing_cycle: billingCycle
            });

            // Redirect to backend-generated checkout URL (Stripe Checkout Session)
            if (response.data.checkout_url) {
                window.location.href = response.data.checkout_url;
                return;
            }

            toast.info(`📋 Purchasing ${plan.name} - ${billingCycle} plan`);
        } catch (error) {
            console.error('Purchase failed:', error);
            toast.error('❌ Purchase failed. Please try again.');
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
        return <div className="loading">Loading premium plans...</div>;
    }

    return (
        <div className="premium-marketplace">
            {/* Promotion Banner */}
            {promotion && (
                <div className="promotion-banner">
                    <h2>{promotion.name}</h2>
                    <p>🔥 Save {promotion.discount_percent}% on all plans!</p>
                    <p className="promotion-ends">Ends: {new Date(promotion.ends_at).toLocaleDateString()}</p>
                </div>
            )}

            {/* Billing Toggle */}
            <div className="billing-toggle">
                <button
                    className={billingCycle === 'monthly' ? 'active' : ''}
                    onClick={() => setBillingCycle('monthly')}
                >
                    Monthly
                </button>
                <button
                    className={billingCycle === 'yearly' ? 'active' : ''}
                    onClick={() => setBillingCycle('yearly')}
                >
                    Yearly <span className="save-badge">Save 17%</span>
                </button>
            </div>

            {/* Plans Grid */}
            <div className="plans-grid">
                {plans.map((plan, index) => {
                    const savings = calculateSavings(plan);
                    const price = billingCycle === 'yearly' ? plan.yearly_price : plan.monthly_price;
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
                <h3>Frequently Asked Questions</h3>
                <div className="faq-item">
                    <h4>Can I cancel anytime?</h4>
                    <p>Yes! Cancel anytime and keep your benefits until the end of the billing period.</p>
                </div>
                <div className="faq-item">
                    <h4>What payment methods do you accept?</h4>
                    <p>We accept all major credit cards, PayPal, and cryptocurrencies.</p>
                </div>
                <div className="faq-item">
                    <h4>Is there a free trial?</h4>
                    <p>Yes! 7-day free trial on all plans. No credit card required.</p>
                </div>
            </div>
        </div>
    );
};

const PremiumPlanCard = ({ plan, price, originalPrice, billingCycle, savings, promotion, onPurchase, featured }) => {
    return (
        <div className={`premium-plan-card ${featured ? 'featured' : ''}`}>
            {featured && <div className="featured-badge">🌟 Most Popular</div>}

            <div className="plan-header">
                <h3>{plan.name}</h3>

                <div className="plan-price">
                    {originalPrice && promotion && (
                        <span className="original-price">${originalPrice}</span>
                    )}
                    <span className="current-price">
                        ${price}
                        <span className="billing-period">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                    </span>

                    {billingCycle === 'yearly' && (
                        <div className="savings-badge">
                            💰 Save ${savings.amount}/year ({savings.percentage}% off)
                        </div>
                    )}
                </div>
            </div>

            <ul className="plan-features">
                {plan.features.map((feature, i) => (
                    <li key={i}>
                        <span className="check">✓</span> {feature}
                    </li>
                ))}
            </ul>

            <button className="purchase-btn" onClick={onPurchase}>
                {featured ? '🚀 Upgrade Now' : 'Get Started'}
            </button>

            {billingCycle === 'yearly' && (
                <p className="monthly-equivalent">
                    Just ${(price / 12).toFixed(2)}/month
                </p>
            )}
        </div>
    );
};

export default PremiumMarketplace;


