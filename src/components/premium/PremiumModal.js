/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useAuth } from '../../AuthContext';
import toast from '../../utils/toast';
import { getApiBase } from '../../utils/apiEndpoints';
import useModalA11y from '../../hooks/useModalA11y';
import logger from '../../utils/logger';

const PremiumModal = ({ isOpen, onClose }) => {
    const { token } = useAuth();
    const { t } = useTranslation();
    const [tiers, setTiers] = useState([]);
    const [currentTier, setCurrentTier] = useState('free');
    const [selectedTier, setSelectedTier] = useState('premium');
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || getApiBase().replace('/api', '');

    useEffect(() => {
        if (isOpen) {
            fetchPremiumTiers();
        }
    }, [isOpen]);

    const fetchPremiumTiers = async () => {
        try {
            const response = await fetch(`${API_URL}/api/store/premium/tiers/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setTiers(data.tiers);
            setCurrentTier(data.current_tier);
        } catch (error) {
            logger.error('Error fetching tiers:', error);
        }
    };

    const handleSubscribe = async () => {
        if (selectedTier === 'free') return;

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/store/premium/subscribe/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tier: selectedTier,
                    billing_cycle: billingCycle,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(
                    t('premium.membershipStarted', {
                        tier: selectedTier === 'elite' ? 'Elite' : 'Premium',
                    })
                );
                onClose();
                window.location.reload(); // Refresh to update premium status
            } else {
                toast.error(data.error || t('common.error'));
            }
        } catch (error) {
            logger.error('Subscribe error:', error);
            toast.error(t('premium.error'));
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    const getTierColor = (tierId) => {
        const colors = {
            free: '#7F8C8D',
            premium: '#5865F2',
            elite: '#E74C3C',
        };
        return colors[tierId] || '#fff';
    };

    const getTierIcon = (tierId) => {
        const icons = {
            free: '🌟',
            premium: '💎',
            elite: '👑',
        };
        return icons[tierId] || '';
    };

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Premium' });

    const S = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px',
        },
        modal: {
            background: 'linear-gradient(135deg, #111214 0%, #0d0e10 100%)',
            borderRadius: '24px',
            maxWidth: '1200px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '40px',
            position: 'relative',
        },
        closeBtn: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
        },
        title: {
            margin: '0 0 10px',
            fontSize: '36px',
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #5865F2 0%, #E74C3C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        toggleRow: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' },
        saveBadge: {
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: '#23a559',
            padding: '2px 8px',
            borderRadius: '8px',
            fontSize: '10px',
            fontWeight: 700,
        },
        tierGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
        },
        currentBadge: {
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#23a559',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
        },
        featureList: { listStyle: 'none', padding: 0, margin: '0 0 20px' },
        featureItem: {
            padding: '8px 0',
            fontSize: '14px',
            color: '#ddd',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        subscribeRow: { marginTop: '40px', textAlign: 'center' },
        priceBox: { textAlign: 'center', marginBottom: '20px' },
    };
    const monthlyBtnStyle = {
        background: billingCycle === 'monthly' ? '#5865F2' : 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 600,
    };
    const yearlyBtnStyle = {
        background: billingCycle === 'yearly' ? '#5865F2' : 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 600,
        position: 'relative',
    };
    const subscribeBtnStyle = {
        background: loading
            ? 'rgba(255, 255, 255, 0.2)'
            : `linear-gradient(135deg, ${getTierColor(selectedTier)} 0%, ${getTierColor(selectedTier)}CC 100%)`,
        border: 'none',
        color: '#fff',
        padding: '18px 60px',
        borderRadius: '14px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontWeight: 700,
        fontSize: '18px',
        boxShadow: `0 8px 24px ${getTierColor(selectedTier)}40`,
    };
    return (
        <div style={S.overlay} {...overlayProps}>
            <div style={S.modal} {...dialogProps}>
                {/* Close Button */}
                <button aria-label={t('common.close', 'Close')} onClick={onClose} style={S.closeBtn}>
                    ✕
                </button>

                {/* Header */}
                <h1 style={S.title}>{t('premium.title', 'Upgrade to Pawscord Premium! 💎')}</h1>
                <p className="text-aaa-center-mb40">
                    {t('premium.subtitle', 'Privatize your profile and access premium features!')}
                </p>

                {/* Billing Cycle Toggle */}
                <div style={S.toggleRow}>
                    <button
                        aria-label={t('premiumModal.monthlyBilling', 'Monthly billing')}
                        style={monthlyBtnStyle}
                    >
                        Monthly
                    </button>
                    <button
                        aria-label={t('premiumModal.yearlyBilling', 'Yearly billing')}
                        style={yearlyBtnStyle}
                    >
                        Yearly
                        <span style={S.saveBadge}>%17 Downloadim</span>
                    </button>
                </div>

                {/* Tier Cards */}
                <div style={S.tierGrid}>
                    {tiers.map((tier) => {
                        const isCurrentTier = tier.id === currentTier;
                        const isSelected = tier.id === selectedTier;
                        const price = billingCycle === 'yearly' ? tier.price_yearly : tier.price;
                        const tierCardStyle = {
                            background: isSelected
                                ? `linear-gradient(135deg, ${getTierColor(tier.id)}20 0%, ${getTierColor(tier.id)}10 100%)`
                                : 'rgba(255, 255, 255, 0.05)',
                            border: isSelected
                                ? `3px solid ${getTierColor(tier.id)}`
                                : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '30px',
                            cursor: tier.id !== 'free' ? 'pointer' : 'default',
                            transition: 'all 0.3s',
                            position: 'relative',
                        };
                        const tierNameStyle = {
                            margin: '0 0 10px',
                            fontSize: '28px',
                            fontWeight: 700,
                            textAlign: 'center',
                            color: getTierColor(tier.id),
                        };
                        const tierBtnStyle = {
                            width: '100%',
                            background: isSelected
                                ? `linear-gradient(135deg, ${getTierColor(tier.id)} 0%, ${getTierColor(tier.id)}CC 100%)`
                                : 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            color: '#fff',
                            padding: '14px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: '16px',
                        };
                        return (
                            <div
                                key={tier.id}
                                style={tierCardStyle}
                                role="button"
                                tabIndex={0}
                                onClick={() => tier.id !== 'free' && setSelectedTier(tier.id)}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                            >
                                {/* Current Badge */}
                                {isCurrentTier && (
                                    <div style={S.currentBadge}>✅ Mevcut Paketiniz</div>
                                )}

                                {/* Icon */}
                                <div className="icon-60-center-mb20">{getTierIcon(tier.id)}</div>

                                {/* Name */}
                                <h2 style={tierNameStyle}>{tier.name}</h2>

                                {/* Price */}
                                <div style={S.priceBox}>
                                    {tier.id === 'free' ? (
                                        <div className="white-bold-32">{t('premium.free', 'FREE')}</div>
                                    ) : (
                                        <>
                                            <div className="white-bold-32">₺{price.toFixed(2)}</div>
                                            <div className="text-888-14">
                                                {billingCycle === 'yearly' ? '/year' : '/month'}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Features */}
                                <ul style={S.featureList}>
                                    {tier.features.map((feature, index) => (
                                        <li key={`item-${index}`} style={S.featureItem}>
                                            <span className="icon-success">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                {tier.id !== 'free' && !isCurrentTier && (
                                    <button
                                        aria-label={t('premiumModal.selectTier', 'Select tier')}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTier(tier.id);
                                        }}
                                        style={tierBtnStyle}
                                    >
                                        {isSelected ? 'Selectildi ✓' : 'Select'}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Subscribe Button */}
                {selectedTier !== 'free' && selectedTier !== currentTier && (
                    <div style={S.subscribeRow}>
                        <button
                            aria-label={t('premiumModal.subscribe', 'Subscribe')}
                            onClick={handleSubscribe}
                            disabled={loading}
                            style={subscribeBtnStyle}
                        >
                            {loading
                                ? '⏳ Processing...'
                                : `${selectedTier === 'elite' ? '👑 Elite' : '💎 Premium'} Purchase`}
                        </button>
                        <p className="text-888-10t">
                            {t('premium.prototypeNotice', '⚠️ This is a prototype - real payment integration has not been implemented')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

PremiumModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};
export default PremiumModal;
