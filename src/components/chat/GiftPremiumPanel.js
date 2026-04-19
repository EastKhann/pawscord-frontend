/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import './GiftPremiumPanel.css';
import { FaGift, FaCrown, FaUser } from 'react-icons/fa';

function GiftPremiumPanel({ apiBaseUrl, fetchWithAuth }) {
    const [recipientUsername, setRecipientUsername] = useState('');
    const [duration, setDuration] = useState('1');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [giftMessage, setGiftMessage] = useState('');

    const giftPremium = async () => {
        if (!recipientUsername.trim()) {
            setMessage('❌ Please enter recipient username');
            return;
        }

        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/adv/gift-premium/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipient_username: recipientUsername,
                    duration_months: parseInt(duration),
                    gift_message: giftMessage || null,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`✅ Premium gifted to ${recipientUsername}!`);
                setRecipientUsername('');
                setGiftMessage('');
            } else {
                const data = await response.json();
                setMessage(`❌ ${data.error || 'Failed to gift premium'}`);
            }
        } catch (err) {
            setMessage('❌ Network error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const plans = [
        { months: 1, price: 9.99, discount: 0 },
        { months: 3, price: 24.99, discount: 17 },
        { months: 6, price: 44.99, discount: 25 },
        { months: 12, price: 79.99, discount: 33 },
    ];

    return (
        <div className="gift-premium-panel">
            <div className="gift-header">
                <h2>
                    <FaGift /> Premium Hediyele
                </h2>
                <p>Birisi için premium özelliklerini hediye et!</p>
            </div>

            {message && <div className="gift-message-alert">{message}</div>}

            <div className="gift-form">
                <div className="form-section">
                    <h3>
                        <FaUser /> Alıcı
                    </h3>
                    <div className="input-group">
                        <label>Kullanıcı Adı</label>
                        <input
                            type="text"
                            placeholder="Kullanıcı adı gir"
                            value={recipientUsername}
                            onChange={(e) => setRecipientUsername(e.target.value)}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>
                        <FaCrown /> Süre
                    </h3>
                    <div className="plans-grid">
                        {plans.map((plan) => (
                            <div
                                key={plan.months}
                                className={`plan-card ${duration === plan.months.toString() ? 'selected' : ''}`}
                                role="button"
                                tabIndex={0}
                                onClick={() => setDuration(plan.months.toString())}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                            >
                                {plan.discount > 0 && (
                                    <div className="discount-badge">{plan.discount}% OFF</div>
                                )}
                                <div className="plan-duration">{plan.months} Ay</div>
                                <div className="plan-price">${plan.price}</div>
                                <div className="plan-per-month">
                                    ${(plan.price / plan.months).toFixed(2)}/mo
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>💌 Kişisel Mesaj (İsteğe Bağlı)</h3>
                    <textarea
                        placeholder="Hediyenize kişisel bir mesaj ekleyin..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="message-textarea"
                        rows="4"
                        maxLength="500"
                    />
                    <div className="char-count">{giftMessage.length}/500</div>
                </div>

                <button
                    aria-label="gift Premium"
                    className="gift-btn"
                    onClick={giftPremium}
                    disabled={loading}
                >
                    <FaGift /> {loading ? 'Gönderiliyor...' : 'Premium Hediyele'}
                </button>
            </div>

            <div className="premium-features">
                <h3>✨ Dahil Premium Özellikler</h3>
                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon">🎨</div>
                        <div className="feature-text">Özel profil temaları</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">📁</div>
                        <div className="feature-text">100MB dosya yüklemeleri</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">😀</div>
                        <div className="feature-text">Sınırsız özel emoji</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🎭</div>
                        <div className="feature-text">Animasyonlu avatarlar</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">⚡</div>
                        <div className="feature-text">Öncelikli destek</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🏷️</div>
                        <div className="feature-text">Premium rozeti</div>
                    </div>
                </div>
            </div>

            <div className="info-box">
                <h4>ℹ️ Hedifyeleme Nasıl Çalışır</h4>
                <ul>
                    <li>Alıcı hediyeniz hakkında bildirim alacak</li>
                    <li>Premium özellikler hemen etkinleşir</li>
                    <li>Kişisel mesajınız bildirime eklenecek</li>
                    <li>Hediye abonelikleri alıcı seçerse otomatik yenilenir</li>
                    <li>Hediye geçmişinizi hesap ayarlarınızdan takip edebilirsiniz</li>
                </ul>
            </div>
        </div>
    );
}

GiftPremiumPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default GiftPremiumPanel;
