// 💎 Nitro Subscription Panel - Premium Membership Management
import React, { useState, useEffect } from 'react';
import './NitroSubscriptionPanel.css';

const NitroSubscriptionPanel = ({ apiBaseUrl, token }) => {
    const [pricing, setPricing] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTier, setSelectedTier] = useState(null);
    const [giftCode, setGiftCode] = useState('');

    useEffect(() => {
        loadPricing();
        loadSubscription();
        loadHistory();
    }, []);

    const fetchWithAuth = async (url, options = {}) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers,
        };
        const res = await fetch(url, { ...options, headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    };

    const loadPricing = async () => {
        try {
            const data = await fetchWithAuth(`${apiBaseUrl}/nitro/pricing/`);
            setPricing(data.tiers || []);
        } catch (error) {
            console.error('❌ Pricing yüklenemedi:', error);
        }
    };

    const loadSubscription = async () => {
        try {
            setLoading(true);
            const data = await fetchWithAuth(`${apiBaseUrl}/nitro/my-subscription/`);
            setSubscription(data);
        } catch (error) {
            console.error('ℹ️ Aktif abonelik yok');
            setSubscription(null);
        } finally {
            setLoading(false);
        }
    };

    const loadHistory = async () => {
        try {
            const data = await fetchWithAuth(`${apiBaseUrl}/nitro/history/`);
            setHistory(data.history || []);
        } catch (error) {
            console.error('❌ History yüklenemedi:', error);
        }
    };

    const handleSubscribe = async (tierId) => {
        try {
            const data = await fetchWithAuth(`${apiBaseUrl}/nitro/subscribe/`, {
                method: 'POST',
                body: JSON.stringify({ tier_id: tierId }),
            });

            if (data.checkout_url) {
                window.location.href = data.checkout_url;
            } else {
                alert('✅ Abonelik başlatıldı!');
                loadSubscription();
            }
        } catch (error) {
            console.error('❌ Abonelik başlatılamadı:', error);
            alert('❌ Abonelik başlatılamadı!');
        }
    };

    const handleCancel = async () => {
        if (!confirm('Aboneliğinizi iptal etmek istediğinizden emin misiniz?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/nitro/cancel/`, {
                method: 'POST',
            });
            alert('✅ Abonelik iptal edildi!');
            loadSubscription();
        } catch (error) {
            console.error('❌ Abonelik iptal edilemedi:', error);
            alert('❌ Abonelik iptal edilemedi!');
        }
    };

    const handleUpgrade = async (tierId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/nitro/upgrade/`, {
                method: 'POST',
                body: JSON.stringify({ tier_id: tierId }),
            });
            alert('✅ Abonelik yükseltildi!');
            loadSubscription();
        } catch (error) {
            console.error('❌ Abonelik yükseltilemedi:', error);
            alert('❌ Abonelik yükseltilemedi!');
        }
    };

    const handleRedeemGift = async () => {
        if (!giftCode.trim()) return alert('❌ Lütfen bir kod girin!');

        try {
            await fetchWithAuth(`${apiBaseUrl}/nitro/redeem/`, {
                method: 'POST',
                body: JSON.stringify({ code: giftCode }),
            });
            alert('✅ Hediye kodu kullanıldı!');
            setGiftCode('');
            loadSubscription();
        } catch (error) {
            console.error('❌ Kod kullanılamadı:', error);
            alert('❌ Geçersiz veya kullanılmış kod!');
        }
    };

    if (loading) {
        return <div className="nitro-panel"><div className="loading">🔄 Yükleniyor...</div></div>;
    }

    return (
        <div className="nitro-panel">
            <div className="panel-header">
                <div>
                    <h2>💎 Pawscord Nitro</h2>
                    <p>Premium üyelik ile daha fazlası</p>
                </div>
                {subscription && (
                    <div className="current-subscription-badge">
                        <span className="nitro-icon">💎</span>
                        <span>{subscription.tier_name}</span>
                    </div>
                )}
            </div>

            {subscription && (
                <div className="active-subscription">
                    <h3>📋 Aktif Aboneliğiniz</h3>
                    <div className="subscription-card">
                        <div className="subscription-info">
                            <div className="tier-badge" style={{ background: subscription.color || '#5865F2' }}>
                                💎 {subscription.tier_name}
                            </div>
                            <div className="subscription-details">
                                <div><strong>Durum:</strong> <span className="status-active">Aktif</span></div>
                                <div><strong>Başlangıç:</strong> {new Date(subscription.start_date).toLocaleDateString('tr-TR')}</div>
                                <div><strong>Yenileme:</strong> {new Date(subscription.next_billing_date).toLocaleDateString('tr-TR')}</div>
                                <div><strong>Aylık Ücret:</strong> ${subscription.price}</div>
                            </div>
                        </div>
                        <div className="subscription-actions">
                            <button className="cancel-btn" onClick={handleCancel}>
                                🚫 İptal Et
                            </button>
                        </div>
                    </div>

                    <div className="benefits-list">
                        <h4>✨ Avantajlarınız</h4>
                        <div className="benefits-grid">
                            {subscription.benefits?.map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                    <span className="benefit-icon">✓</span>
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="pricing-section">
                <h3>💰 Üyelik Paketleri</h3>
                <div className="pricing-grid">
                    {pricing.map((tier) => (
                        <div
                            key={tier.id}
                            className={`pricing-card ${tier.is_popular ? 'popular' : ''} ${subscription?.tier_id === tier.id ? 'current' : ''
                                }`}
                        >
                            {tier.is_popular && <div className="popular-badge">🌟 Popüler</div>}
                            {subscription?.tier_id === tier.id && (
                                <div className="current-badge">✓ Mevcut Paketiniz</div>
                            )}

                            <div className="tier-icon">💎</div>
                            <h4>{tier.name}</h4>
                            <div className="price">
                                <span className="amount">${tier.price}</span>
                                <span className="period">/ay</span>
                            </div>

                            <ul className="features-list">
                                {tier.features?.map((feature, index) => (
                                    <li key={index}>
                                        <span className="check-icon">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {!subscription && (
                                <button
                                    className="subscribe-btn"
                                    onClick={() => handleSubscribe(tier.id)}
                                >
                                    🚀 Abone Ol
                                </button>
                            )}

                            {subscription && subscription.tier_id !== tier.id && tier.price > subscription.price && (
                                <button
                                    className="upgrade-btn"
                                    onClick={() => handleUpgrade(tier.id)}
                                >
                                    ⬆️ Yükselt
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="gift-section">
                <h3>🎁 Hediye Kodu Kullan</h3>
                <div className="gift-form">
                    <input
                        type="text"
                        placeholder="Hediye kodunu girin..."
                        value={giftCode}
                        onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
                    />
                    <button onClick={handleRedeemGift}>✨ Kullan</button>
                </div>
            </div>

            {history.length > 0 && (
                <div className="history-section">
                    <h3>📜 İşlem Geçmişi</h3>
                    <div className="history-list">
                        {history.map((item, index) => (
                            <div key={index} className="history-item">
                                <div className="history-icon">
                                    {item.type === 'payment' ? '💳' : '🎁'}
                                </div>
                                <div className="history-info">
                                    <strong>{item.description}</strong>
                                    <span>{new Date(item.date).toLocaleString('tr-TR')}</span>
                                </div>
                                <div className="history-amount">${item.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NitroSubscriptionPanel;
