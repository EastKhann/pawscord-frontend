import React, { useState } from 'react';
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
          gift_message: giftMessage || null
        })
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
    { months: 12, price: 79.99, discount: 33 }
  ];

  return (
    <div className="gift-premium-panel">
      <div className="gift-header">
        <h2><FaGift /> Gift Premium</h2>
        <p>Give the gift of premium features to someone special!</p>
      </div>

      {message && <div className="gift-message-alert">{message}</div>}

      <div className="gift-form">
        <div className="form-section">
          <h3><FaUser /> Recipient</h3>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={recipientUsername}
              onChange={(e) => setRecipientUsername(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h3><FaCrown /> Duration</h3>
          <div className="plans-grid">
            {plans.map(plan => (
              <div
                key={plan.months}
                className={`plan-card ${duration === plan.months.toString() ? 'selected' : ''}`}
                onClick={() => setDuration(plan.months.toString())}
              >
                {plan.discount > 0 && (
                  <div className="discount-badge">{plan.discount}% OFF</div>
                )}
                <div className="plan-duration">{plan.months} Month{plan.months > 1 ? 's' : ''}</div>
                <div className="plan-price">${plan.price}</div>
                <div className="plan-per-month">${(plan.price / plan.months).toFixed(2)}/mo</div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>💌 Personal Message (Optional)</h3>
          <textarea
            placeholder="Add a personal message to your gift..."
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            className="message-textarea"
            rows="4"
            maxLength="500"
          />
          <div className="char-count">{giftMessage.length}/500</div>
        </div>

        <button
          className="gift-btn"
          onClick={giftPremium}
          disabled={loading}
        >
          <FaGift /> {loading ? 'Sending Gift...' : 'Gift Premium'}
        </button>
      </div>

      <div className="premium-features">
        <h3>✨ Premium Features Included</h3>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🎨</div>
            <div className="feature-text">Custom profile themes</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📁</div>
            <div className="feature-text">100MB file uploads</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">😀</div>
            <div className="feature-text">Unlimited custom emojis</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎭</div>
            <div className="feature-text">Animated avatars</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <div className="feature-text">Priority support</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🏷️</div>
            <div className="feature-text">Premium badge</div>
          </div>
        </div>
      </div>

      <div className="info-box">
        <h4>ℹ️ How Gifting Works</h4>
        <ul>
          <li>Recipient will receive a notification about your gift</li>
          <li>Premium features activate immediately</li>
          <li>Your personal message will be included in the notification</li>
          <li>Gift subscriptions auto-renew for the recipient if they choose</li>
          <li>You can track your gift history in your account settings</li>
        </ul>
      </div>
    </div>
  );
}

export default GiftPremiumPanel;
