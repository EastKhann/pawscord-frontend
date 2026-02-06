import React, { useState, useEffect } from 'react';
import './GrowthWaitlistPanel.css';
import { FaRocket, FaUsers, FaChartLine, FaGift, FaEnvelope } from 'react-icons/fa';

function GrowthWaitlistPanel({ apiBaseUrl, fetchWithAuth }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [stats, setStats] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadStats();
    loadDashboard();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/waitlist/stats/`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const loadDashboard = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/growth/dashboard/`);
      if (response.ok) {
        const data = await response.json();
        setDashboard(data);
      }
    } catch (err) {
      console.error('Error loading dashboard:', err);
    }
  };

  const joinWaitlist = async () => {
    if (!email.trim() || !name.trim()) {
      setMessage('❌ Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/waitlist/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, referral_code: referralCode || null })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Joined waitlist! Your position: #${data.position}`);
        setEmail('');
        setName('');
        setReferralCode('');
        loadStats();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to join waitlist'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const claimReferral = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/referral/claim/`, {
        method: 'POST'
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ ${data.message}`);
        loadDashboard();
      }
    } catch (err) {
      setMessage('❌ Failed to claim referral rewards');
    }
  };

  return (
    <div className="growth-waitlist-panel">
      <div className="growth-header">
        <h2><FaRocket /> Growth & Waitlist</h2>
      </div>

      {message && <div className="growth-message">{message}</div>}

      {stats && (
        <div className="stats-overview">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div className="stat-value">{stats.total_users || 0}</div>
            <div className="stat-label">Total Waitlist</div>
          </div>
          <div className="stat-card">
            <FaChartLine className="stat-icon growth" />
            <div className="stat-value">{stats.growth_rate || 0}%</div>
            <div className="stat-label">Growth Rate</div>
          </div>
          <div className="stat-card">
            <FaGift className="stat-icon reward" />
            <div className="stat-value">{stats.referrals || 0}</div>
            <div className="stat-label">Referrals</div>
          </div>
        </div>
      )}

      <div className="join-waitlist">
        <h3><FaEnvelope /> Join the Waitlist</h3>
        <div className="waitlist-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Referral code (optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="form-input"
            />
          </div>
          <button
            className="join-btn"
            onClick={joinWaitlist}
            disabled={loading}
          >
            <FaRocket /> Join Waitlist
          </button>
        </div>
      </div>

      {dashboard && (
        <div className="growth-dashboard">
          <h3><FaChartLine /> Growth Dashboard</h3>
          <div className="dashboard-metrics">
            <div className="metric">
              <div className="metric-label">Daily Active Users</div>
              <div className="metric-value">{dashboard.dau || 0}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Monthly Active Users</div>
              <div className="metric-value">{dashboard.mau || 0}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Retention Rate</div>
              <div className="metric-value">{dashboard.retention || 0}%</div>
            </div>
            <div className="metric">
              <div className="metric-label">Avg. Session Time</div>
              <div className="metric-value">{dashboard.avg_session || '0m'}</div>
            </div>
          </div>

          {dashboard.pending_referrals > 0 && (
            <div className="referral-rewards">
              <FaGift className="reward-icon" />
              <div className="reward-text">
                You have {dashboard.pending_referrals} pending referral reward(s)!
              </div>
              <button className="claim-btn" onClick={claimReferral}>
                Claim Rewards
              </button>
            </div>
          )}
        </div>
      )}

      <div className="waitlist-benefits">
        <h4>🎁 Early Access Benefits</h4>
        <ul>
          <li>Priority access to new features</li>
          <li>Exclusive beta testing opportunities</li>
          <li>Special founder badge</li>
          <li>Invite friends and move up the waitlist</li>
        </ul>
      </div>
    </div>
  );
}

export default GrowthWaitlistPanel;
