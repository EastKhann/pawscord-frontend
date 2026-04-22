/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import './GiftPremiumPanel.css';
import { FaGift, FaCrown, FaUser } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function GiftPremiumPanel({ apiBaseUrl, fetchWithAuth }) {
    const { t } = useTranslation();
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
                    <FaGift /> {t('premium.giftTitle', 'Gift Premium')}
                </h2>
                <p>{t('premium.giftDesc', 'Gift premium features for someone!')}</p>
            </div>

            {message && <div className="gift-message-alert">{message}</div>}

            <div className="gift-form">
                <div className="form-section">
                    <h3>
                        <FaUser /> {t('premium.recipient', 'Recipient')}
                    </h3>
                    <div className="input-group">
                        <label>{t('premium.username', 'Username')}</label>
                        <input
                            type="text"
                            placeholder={t('common.enterUsername', 'Enter username')}
                            value={recipientUsername}
                            onChange={(e) => setRecipientUsername(e.target.value)}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>
                        <FaCrown /> {t('premium.duration', 'Duration')}
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
                                <div className="plan-duration">{plan.months} {t('common.months', 'months')}</div>
                                <div className="plan-price">${plan.price}</div>
                                <div className="plan-per-month">
                                    ${(plan.price / plan.months).toFixed(2)}/mo
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h3>{t('premium.personalMessage', '💌 Personal Message (Optional)')}</h3>
                    <textarea
                        placeholder={t('premium.giftMessage', 'Add a personal message to your gift...')}
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="message-textarea"
                        rows="4"
                        maxLength="500"
                    />
                    <div className="char-count">{giftMessage.length}/500</div>
                </div>

                <button
                    aria-label={t('giftPremium.giftButton', 'Gift premium')}
                    className="gift-btn"
                    onClick={giftPremium}
                    disabled={loading}
                >
                    <FaGift /> {loading ? t('premium.sending', 'Sending...') : t('premium.giftPremium', 'Gift Premium')}
                </button>
            </div>

            <div className="premium-features">
                <h3>{t('premium.includedFeatures', '✨ Included Premium Features')}</h3>
                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon">🎨</div>
                        <div className="feature-text">{t('premium.customProfileThemes', 'Custom profile themes')}</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">📁</div>
                        <div className="feature-text">{t('premium.upload100mb', '100MB file uploads')}</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">😀</div>
                        <div className="feature-text">{t('premium.unlimitedEmoji', 'Unlimited custom emoji')}</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🎭</div>
                        <div className="feature-text">{t('premium.animatedAvatars', 'Animated avatars')}</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">⚡</div>
                        <div className="feature-text">{t('premium.prioritySupport', 'Priority support')}</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🏷️</div>
                        <div className="feature-text">{t('premium.premiumBadge', 'Premium badge')}</div>
                    </div>
                </div>
            </div>

            <div className="info-box">
                <h4>{t('premium.howItWorks', 'ℹ️ How Gifting Works')}</h4>
                <ul>
                    <li>{t('premium.howBullet1', 'Recipient will receive a notification about your gift')}</li>
                    <li>{t('premium.howBullet2', 'Premium features activate immediately')}</li>
                    <li>{t('premium.howBullet3', 'Your personal message will be included in the notification')}</li>
                    <li>{t('premium.howBullet4', 'Gift subscriptions auto-renew if the recipient chooses')}</li>
                    <li>{t('premium.howBullet5', 'Track your gift history from account settings')}</li>
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
