import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import toast from '../utils/toast';
import { getApiBase } from '../utils/apiEndpoints';

const PremiumModal = ({ isOpen, onClose }) => {
    const { token } = useAuth();
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
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setTiers(data.tiers);
            setCurrentTier(data.current_tier);
        } catch (error) {
            console.error('Error fetching tiers:', error);
        }
    };

    const handleSubscribe = async () => {
        if (selectedTier === 'free') return;

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/store/premium/subscribe/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tier: selectedTier,
                    billing_cycle: billingCycle
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`✅ ${selectedTier === 'elite' ? 'Elite' : 'Premium'} üyeliğiniz başladı!`);
                onClose();
                window.location.reload(); // Refresh to update premium status
            } else {
                toast.error(`❌ ${data.error || 'Bir hata oluştu'}`);
            }
        } catch (error) {
            console.error('Subscribe error:', error);
            toast.error('❌ Bir hata oluştu');
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

    return (
        <div style={{
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
        }} onClick={onClose}>
            <div style={{
                background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)',
                borderRadius: '24px',
                maxWidth: '1200px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '40px',
                position: 'relative',
            }} onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
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
                    }}
                >
                    ✕
                </button>

                {/* Header */}
                <h1 style={{
                    margin: '0 0 10px',
                    fontSize: '36px',
                    fontWeight: 700,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #5865F2 0%, #E74C3C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    Pawscord Premium'a Geçin! 💎
                </h1>
                <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>
                    Profilinizi özelleştirin ve premium özelliklere erişin!
                </p>

                {/* Billing Cycle Toggle */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '30px',
                }}>
                    <button
                        onClick={() => setBillingCycle('monthly')}
                        style={{
                            background: billingCycle === 'monthly' ? '#5865F2' : 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 600,
                        }}
                    >
                        Aylık
                    </button>
                    <button
                        onClick={() => setBillingCycle('yearly')}
                        style={{
                            background: billingCycle === 'yearly' ? '#5865F2' : 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            position: 'relative',
                        }}
                    >
                        Yıllık
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#43b581',
                            padding: '2px 8px',
                            borderRadius: '8px',
                            fontSize: '10px',
                            fontWeight: 700,
                        }}>
                            %17 İndirim
                        </span>
                    </button>
                </div>

                {/* Tier Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                }}>
                    {tiers.map(tier => {
                        const isCurrentTier = tier.id === currentTier;
                        const isSelected = tier.id === selectedTier;
                        const price = billingCycle === 'yearly' ? tier.price_yearly : tier.price;

                        return (
                            <div
                                key={tier.id}
                                style={{
                                    background: isSelected ?
                                        `linear-gradient(135deg, ${getTierColor(tier.id)}20 0%, ${getTierColor(tier.id)}10 100%)` :
                                        'rgba(255, 255, 255, 0.05)',
                                    border: isSelected ?
                                        `3px solid ${getTierColor(tier.id)}` :
                                        '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '16px',
                                    padding: '30px',
                                    cursor: tier.id !== 'free' ? 'pointer' : 'default',
                                    transition: 'all 0.3s',
                                    position: 'relative',
                                }}
                                onClick={() => tier.id !== 'free' && setSelectedTier(tier.id)}
                            >
                                {/* Current Badge */}
                                {isCurrentTier && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-12px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: '#43b581',
                                        padding: '6px 16px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                    }}>
                                        ✅ Mevcut Paketiniz
                                    </div>
                                )}

                                {/* Icon */}
                                <div style={{ fontSize: '60px', textAlign: 'center', marginBottom: '20px' }}>
                                    {getTierIcon(tier.id)}
                                </div>

                                {/* Name */}
                                <h2 style={{
                                    margin: '0 0 10px',
                                    fontSize: '28px',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    color: getTierColor(tier.id),
                                }}>
                                    {tier.name}
                                </h2>

                                {/* Price */}
                                <div style={{
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                }}>
                                    {tier.id === 'free' ? (
                                        <div style={{ fontSize: '32px', fontWeight: 700, color: '#fff' }}>
                                            ÜCRETSİZ
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{ fontSize: '32px', fontWeight: 700, color: '#fff' }}>
                                                ₺{price.toFixed(2)}
                                            </div>
                                            <div style={{ fontSize: '14px', color: '#888' }}>
                                                {billingCycle === 'yearly' ? '/yıl' : '/ay'}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Features */}
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: '0 0 20px',
                                }}>
                                    {tier.features.map((feature, index) => (
                                        <li key={index} style={{
                                            padding: '8px 0',
                                            fontSize: '14px',
                                            color: '#ddd',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}>
                                            <span style={{ color: '#43b581' }}>✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                {tier.id !== 'free' && !isCurrentTier && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedTier(tier.id);
                                        }}
                                        style={{
                                            width: '100%',
                                            background: isSelected ?
                                                `linear-gradient(135deg, ${getTierColor(tier.id)} 0%, ${getTierColor(tier.id)}CC 100%)` :
                                                'rgba(255, 255, 255, 0.1)',
                                            border: 'none',
                                            color: '#fff',
                                            padding: '14px',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                            fontWeight: 700,
                                            fontSize: '16px',
                                        }}
                                    >
                                        {isSelected ? 'Seçildi ✓' : 'Seç'}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Subscribe Button */}
                {selectedTier !== 'free' && selectedTier !== currentTier && (
                    <div style={{
                        marginTop: '40px',
                        textAlign: 'center',
                    }}>
                        <button
                            onClick={handleSubscribe}
                            disabled={loading}
                            style={{
                                background: loading ?
                                    'rgba(255, 255, 255, 0.2)' :
                                    `linear-gradient(135deg, ${getTierColor(selectedTier)} 0%, ${getTierColor(selectedTier)}CC 100%)`,
                                border: 'none',
                                color: '#fff',
                                padding: '18px 60px',
                                borderRadius: '14px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: 700,
                                fontSize: '18px',
                                boxShadow: `0 8px 24px ${getTierColor(selectedTier)}40`,
                            }}
                        >
                            {loading ? '⏳ İşleniyor...' : `${selectedTier === 'elite' ? '👑 Elite' : '💎 Premium'} Satın Al`}
                        </button>
                        <p style={{ color: '#888', fontSize: '12px', marginTop: '10px' }}>
                            ⚠️ Bu bir prototip - gerçek ödeme entegrasyonu yapılmamıştır
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PremiumModal;



