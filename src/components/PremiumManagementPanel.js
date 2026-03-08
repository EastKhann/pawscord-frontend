import { useState, useEffect } from 'react';
import './PremiumManagementPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const PremiumManagementPanel = ({ onClose }) => {
    const [pricingTiers, setPricingTiers] = useState([]);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTier, setSelectedTier] = useState('classic');
    const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or yearly
    const apiBaseUrl = getApiBase();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchPricingTiers();
        fetchCurrentSubscription();
    }, []);

    const fetchPricingTiers = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/nitro/pricing/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setPricingTiers(data.tiers || []);
        } catch (error) {
            console.error('Error fetching pricing:', error);
            toast.error('❌ Fiyatlandırma bilgileri yüklenemedi');
        }
    };

    const fetchCurrentSubscription = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/nitro/my-subscription/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setCurrentSubscription(data.subscription || null);
        } catch (error) {
            console.error('Error fetching subscription:', error);
        } finally {
            setLoading(false);
        }
    };

    const subscribe = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/nitro/subscribe/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tier: selectedTier,
                    billing_cycle: billingCycle,
                    payment_method: 'stripe' // or 'test' for testing
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('🎉 Abonelik başarıyla başlatıldı!');
                fetchCurrentSubscription();
            } else {
                toast.error(`❌ ${data.error || 'Abonelik başlatılamadı'}`);
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            toast.error('❌ Abonelik hatası');
        }
    };

    const cancelSubscription = async () => {
        if (!await confirmDialog('Aboneliğinizi iptal etmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`${apiBaseUrl}/nitro/cancel/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.info('ℹ️ Abonelik iptal edildi');
                fetchCurrentSubscription();
            } else {
                toast.error(`❌ ${data.error || 'İptal edilemedi'}`);
            }
        } catch (error) {
            console.error('Error canceling:', error);
            toast.error('❌ İptal hatası');
        }
    };

    const upgradeSubscription = async (newTier) => {
        try {
            const response = await fetch(`${apiBaseUrl}/nitro/upgrade/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    new_tier: newTier
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('⬆️ Abonelik yükseltildi!');
                fetchCurrentSubscription();
            } else {
                toast.error(`❌ ${data.error || 'Yükseltilemedi'}`);
            }
        } catch (error) {
            console.error('Error upgrading:', error);
            toast.error('❌ Yükseltme hatası');
        }
    };

    const getTierColor = (tier) => {
        const colors = {
            'basic': '#3b82f6',
            'classic': '#5865f2',
            'elite': '#f59e0b'
        };
        return colors[tier] || colors.classic;
    };

    const getTierIcon = (tier) => {
        const icons = {
            'basic': '🌟',
            'classic': '💎',
            'elite': '👑'
        };
        return icons[tier] || icons.classic;
    };

    const getFeatureIcon = (featureName) => {
        const iconMap = {
            'upload_limit_mb': '📤',
            'video_quality': '🎥',
            'emoji_slots': '😀',
            'custom_tag': '🏷️',
            'animated_avatar': '🎭',
            'server_boosts': '🚀',
            'custom_profiles': '✨',
            'hd_video': '📺',
            'screen_share_quality': '🖥️',
            'profile_banner': '🎨',
            'custom_discriminator': '#️⃣',
            'badge': '🏆',
            'early_access': '🔓',
            'priority_support': '💬'
        };
        return iconMap[featureName] || '✓';
    };

    const formatFeatureValue = (key, value) => {
        if (typeof value === 'boolean') return value ? 'Evet' : 'Hayır';
        if (key === 'upload_limit_mb') return `${value} MB`;
        if (key.includes('quality')) return value;
        return value;
    };

    if (loading) {
        return (
            <div className="premium-overlay">
                <div className="premium-panel">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <span>Yükleniyor...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="premium-overlay" onClick={onClose}>
            <div className="premium-panel" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="premium-header">
                    <h2>💎 Pawscord Premium</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Current Subscription */}
                {currentSubscription ? (
                    <div className="current-subscription">
                        <div className="subscription-header">
                            <span className="subscription-icon">{getTierIcon(currentSubscription.tier)}</span>
                            <div className="subscription-info">
                                <h3>{currentSubscription.tier_name || currentSubscription.tier.toUpperCase()}</h3>
                                <span className="subscription-status">
                                    {currentSubscription.is_active ? '✓ Aktif' : '⏸ Durdurulmuş'}
                                </span>
                            </div>
                            <div className="subscription-actions">
                                <button className="cancel-btn" onClick={cancelSubscription}>
                                    İptal Et
                                </button>
                            </div>
                        </div>
                        <div className="subscription-details">
                            <div className="detail-item">
                                <span className="detail-label">Başlangıç:</span>
                                <span className="detail-value">
                                    {new Date(currentSubscription.start_date).toLocaleDateString('tr-TR')}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Bitiş:</span>
                                <span className="detail-value">
                                    {new Date(currentSubscription.end_date).toLocaleDateString('tr-TR')}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Otomatik Yenileme:</span>
                                <span className="detail-value">
                                    {currentSubscription.auto_renew ? 'Açık' : 'Kapalı'}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="no-subscription">
                        <div className="no-subscription-icon">💎</div>
                        <h3>Premium Üyelik Yok</h3>
                        <p>Premium özelliklerden yararlanmak için aşağıdaki planlardan birini seçin</p>
                    </div>
                )}

                {/* Billing Cycle Toggle */}
                <div className="billing-toggle">
                    <button
                        className={`billing-option ${billingCycle === 'monthly' ? 'active' : ''}`}
                        onClick={() => setBillingCycle('monthly')}
                    >
                        Aylık
                    </button>
                    <button
                        className={`billing-option ${billingCycle === 'yearly' ? 'active' : ''}`}
                        onClick={() => setBillingCycle('yearly')}
                    >
                        Yıllık <span className="save-badge">%17 İndirim</span>
                    </button>
                </div>

                {/* Pricing Tiers */}
                <div className="pricing-tiers">
                    {Object.keys(pricingTiers).map(tierKey => {
                        const tier = pricingTiers[tierKey];
                        const isCurrentTier = currentSubscription?.tier === tierKey;
                        const price = billingCycle === 'yearly' ? tier.price_yearly : tier.price_monthly;

                        return (
                            <div 
                                key={tierKey}
                                className={`tier-card ${selectedTier === tierKey ? 'selected' : ''} ${isCurrentTier ? 'current' : ''}`}
                                style={{ borderColor: getTierColor(tierKey) }}
                                onClick={() => !isCurrentTier && setSelectedTier(tierKey)}
                            >
                                <div className="tier-header" style={{ background: `linear-gradient(135deg, ${getTierColor(tierKey)}, ${getTierColor(tierKey)}99)` }}>
                                    <span className="tier-icon">{getTierIcon(tierKey)}</span>
                                    <h3>{tier.name}</h3>
                                    {isCurrentTier && <span className="current-badge">Mevcut Plan</span>}
                                </div>

                                <div className="tier-price">
                                    <span className="price-amount">${price}</span>
                                    <span className="price-period">/{billingCycle === 'yearly' ? 'yıl' : 'ay'}</span>
                                </div>

                                <div className="tier-features">
                                    {Object.entries(tier.features).map(([key, value]) => (
                                        <div key={key} className="feature-item">
                                            <span className="feature-icon">{getFeatureIcon(key)}</span>
                                            <span className="feature-label">
                                                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                                            </span>
                                            <span className="feature-value">{formatFeatureValue(key, value)}</span>
                                        </div>
                                    ))}
                                </div>

                                {!isCurrentTier && (
                                    <div className="tier-actions">
                                        {currentSubscription ? (
                                            <button 
                                                className="upgrade-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    upgradeSubscription(tierKey);
                                                }}
                                                style={{ background: `linear-gradient(135deg, ${getTierColor(tierKey)}, ${getTierColor(tierKey)}dd)` }}
                                            >
                                                Yükselt
                                            </button>
                                        ) : (
                                            <button 
                                                className="subscribe-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    subscribe();
                                                }}
                                                style={{ background: `linear-gradient(135deg, ${getTierColor(tierKey)}, ${getTierColor(tierKey)}dd)` }}
                                            >
                                                Abone Ol
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Info Banner */}
                <div className="info-banner">
                    <span className="info-icon">ℹ️</span>
                    <p>
                        Premium abonelikler Stripe ile güvenli şekilde işlenir. 
                        İstediğiniz zaman iptal edebilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PremiumManagementPanel;

