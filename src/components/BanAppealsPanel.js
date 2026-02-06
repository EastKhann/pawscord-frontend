import React, { useState, useEffect } from 'react';
import './BanAppealsPanel.css';
import { FaGavel, FaPaperPlane, FaHistory, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function BanAppealsPanel({ apiBaseUrl, fetchWithAuth }) {
  const [appeals, setAppeals] = useState([]);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [banInfo, setBanInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadAppeals();
    loadBanInfo();
  }, []);

  const loadAppeals = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/ban-appeals/list/`);
      if (response.ok) {
        const data = await response.json();
        setAppeals(data.appeals || []);
      }
    } catch (err) {
      console.error('Error loading appeals:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadBanInfo = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/ban-appeals/status/`);
      if (response.ok) {
        const data = await response.json();
        setBanInfo(data);
      }
    } catch (err) {
      console.error('Error loading ban info:', err);
    }
  };

  const submitAppeal = async () => {
    if (!reason.trim()) {
      setMessage('❌ Please provide a reason');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/adv/ban-appeal/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason,
          details: details || null
        })
      });

      if (response.ok) {
        setMessage('✅ Appeal submitted successfully!');
        setReason('');
        setDetails('');
        loadAppeals();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to submit appeal'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { icon: <FaHistory />, color: '#faa61a', text: 'Pending' },
      approved: { icon: <FaCheckCircle />, color: '#43b581', text: 'Approved' },
      rejected: { icon: <FaTimesCircle />, color: '#f04747', text: 'Rejected' }
    };
    return badges[status] || badges.pending;
  };

  return (
    <div className="ban-appeals-panel">
      <div className="appeals-header">
        <h2><FaGavel /> Ban Appeals</h2>
      </div>

      {message && <div className="appeal-message">{message}</div>}

      {banInfo && banInfo.is_banned && (
        <div className="ban-info-card">
          <div className="ban-warning">
            <FaTimesCircle className="warning-icon" />
            <div className="warning-text">
              <h3>You are currently banned</h3>
              <p>{banInfo.ban_reason || 'No reason provided'}</p>
              <div className="ban-meta">
                <span>Banned on: {new Date(banInfo.banned_at).toLocaleDateString()}</span>
                {banInfo.expires_at && (
                  <span>Expires: {new Date(banInfo.expires_at).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="submit-appeal-section">
        <h3><FaPaperPlane /> Submit New Appeal</h3>
        <div className="appeal-form">
          <div className="form-group">
            <label>Reason for Appeal:</label>
            <input
              type="text"
              placeholder="Why should you be unbanned?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-input"
              maxLength={200}
            />
            <div className="char-count">{reason.length}/200</div>
          </div>
          <div className="form-group">
            <label>Additional Details (optional):</label>
            <textarea
              placeholder="Provide any additional context or evidence..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="form-textarea"
              rows={5}
              maxLength={1000}
            />
            <div className="char-count">{details.length}/1000</div>
          </div>
          <button
            className="submit-btn"
            onClick={submitAppeal}
            disabled={loading || !reason.trim()}
          >
            <FaPaperPlane /> Submit Appeal
          </button>
        </div>
        <div className="appeal-guidelines">
          <h4>📋 Guidelines:</h4>
          <ul>
            <li>Be honest and respectful in your appeal</li>
            <li>Explain why you believe the ban was unfair or a mistake</li>
            <li>Provide evidence if available</li>
            <li>Appeals are reviewed within 24-48 hours</li>
          </ul>
        </div>
      </div>

      <div className="appeals-history">
        <h3><FaHistory /> Your Appeals ({appeals.length})</h3>
        {loading && appeals.length === 0 ? (
          <div className="loading">Loading appeals...</div>
        ) : appeals.length === 0 ? (
          <div className="empty-appeals">
            <FaGavel className="empty-icon" />
            <p>No appeals submitted yet</p>
          </div>
        ) : (
          <div className="appeals-list">
            {appeals.map((appeal, idx) => {
              const statusBadge = getStatusBadge(appeal.status);
              return (
                <div key={idx} className={`appeal-item status-${appeal.status}`}>
                  <div className="appeal-header">
                    <div className="appeal-date">
                      {new Date(appeal.created_at).toLocaleString()}
                    </div>
                    <div className="appeal-status" style={{ background: statusBadge.color }}>
                      {statusBadge.icon} {statusBadge.text}
                    </div>
                  </div>
                  <div className="appeal-content">
                    <div className="appeal-reason">
                      <strong>Reason:</strong> {appeal.reason}
                    </div>
                    {appeal.details && (
                      <div className="appeal-details">
                        <strong>Details:</strong> {appeal.details}
                      </div>
                    )}
                  </div>
                  {appeal.admin_response && (
                    <div className="admin-response">
                      <strong>Admin Response:</strong> {appeal.admin_response}
                      <div className="response-date">
                        Reviewed: {new Date(appeal.reviewed_at).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default BanAppealsPanel;
