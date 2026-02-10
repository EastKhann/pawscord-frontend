// frontend/src/components/GrowthWaitlist/GrowthWaitlist.js
import React, { useState } from 'react';
import axios from 'axios';
import './GrowthWaitlist.css';
import { getApiBase } from '../../utils/apiEndpoints';
import toast from '../../utils/toast';

const API_URL = getApiBase();

function GrowthWaitlist() {
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [myReferralCode, setMyReferralCode] = useState('');
  const [position, setPosition] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/waitlist/`, {
        email,
        referral_code: referralCode || null
      });

      setSuccess(true);
      setMyReferralCode(response.data.referral_code);
      setPosition(response.data.position);
      setEmail('');
      setReferralCode('');
    } catch (err) {
      setError(err.response?.data?.error || 'Kayıt başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/?ref=${myReferralCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link kopyalandı!');
  };

  if (success) {
    return (
      <div className="waitlist-success">
        <h2>🎉 Waitlist'e Katıldın!</h2>
        <p className="position">Sıran: <strong>#{position}</strong></p>

        <div className="referral-section">
          <h3>📢 Arkadaşlarını Davet Et, Sırada İlerle!</h3>
          <p>Her davet için sırada 1 yukarı çıkarsın</p>

          <div className="referral-code">
            <label>Senin Referral Kodin:</label>
            <input
              type="text"
              value={myReferralCode}
              readOnly
              onClick={(e) => e.target.select()}
            />
            <button onClick={copyReferralLink}>
              📋 Link Kopyala
            </button>
          </div>

          <div className="referral-stats">
            <p>🎁 Hediyeler:</p>
            <ul>
              <li>5 davet: 1 ay premium</li>
              <li>10 davet: 3 ay premium</li>
              <li>25 davet: 1 yıl premium</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="growth-waitlist">
      <div className="waitlist-container">
        <h1>🚀 PAWSCORD Launch Waitlist</h1>
        <p className="subtitle">Discord'a alternatif, open-source chat platformu</p>

        <form onSubmit={handleSubmit} className="waitlist-form">
          <div className="form-group">
            <label>📧 Email Adresin</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="senin@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>🎁 Referral Kodu (opsiyonel)</label>
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              placeholder="ABCD1234"
              maxLength={8}
            />
            <small>Arkadaşının kodunu gir, ikiniız de sırada ilerlesin!</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? '⏳ Kaydediliyor...' : '🎉 Waitlist\'e Katıl'}
          </button>
        </form>

        <div className="features">
          <h3>✨ Özellikler</h3>
          <div className="feature-grid">
            <div className="feature">
              <span className="icon">💬</span>
              <span>Real-time Chat</span>
            </div>
            <div className="feature">
              <span className="icon">🎤</span>
              <span>Voice & Video</span>
            </div>
            <div className="feature">
              <span className="icon">🤖</span>
              <span>AI Chatbot (GPT-4)</span>
            </div>
            <div className="feature">
              <span className="icon">🔐</span>
              <span>End-to-End Encryption</span>
            </div>
            <div className="feature">
              <span className="icon">📱</span>
              <span>Multi-Platform</span>
            </div>
            <div className="feature">
              <span className="icon">🎮</span>
              <span>Gaming Integration</span>
            </div>
          </div>
        </div>

        <div className="stats">
          <p>🔥 Launch: 22 Ocak 2026</p>
          <p>📊 Hedef: 1000+ kullanıcı (ilk ay)</p>
        </div>
      </div>
    </div>
  );
}

export default GrowthWaitlist;
