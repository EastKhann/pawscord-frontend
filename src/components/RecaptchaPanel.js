import React, { useState } from 'react';
import './RecaptchaPanel.css';
import { FaShieldAlt, FaRobot, FaCheckCircle, FaCog } from 'react-icons/fa';

function RecaptchaPanel({ apiBaseUrl, fetchWithAuth }) {
  const [token, setToken] = useState('');
  const [action, setAction] = useState('login');
  const [siteKey, setSiteKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  const verifyRecaptcha = async () => {
    if (!token.trim()) {
      setMessage('❌ Please enter reCAPTCHA token');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/auth/recaptcha/verify/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, action })
      });

      if (response.ok) {
        const data = await response.json();
        setVerifyResult(data);
        setMessage(`✅ Verified! Score: ${data.score}`);
        setToken('');
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Verification failed'}`);
        setVerifyResult(null);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/auth/recaptcha/settings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          site_key: siteKey, 
          secret_key: secretKey,
          enabled 
        })
      });

      if (response.ok) {
        setMessage('✅ Settings updated successfully');
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to update settings'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recaptcha-panel">
      <div className="recaptcha-header">
        <h2><FaShieldAlt /> reCAPTCHA Protection</h2>
      </div>

      {message && <div className="recaptcha-message">{message}</div>}

      <div className="verify-section">
        <h3><FaRobot /> Verify reCAPTCHA Token</h3>
        <div className="verify-form">
          <div className="form-group">
            <label>Action Type</label>
            <select value={action} onChange={(e) => setAction(e.target.value)} className="form-select">
              <option value="login">Login</option>
              <option value="register">Register</option>
              <option value="submit_form">Submit Form</option>
              <option value="comment">Comment</option>
            </select>
          </div>
          <div className="form-group">
            <label>reCAPTCHA Token</label>
            <textarea
              placeholder="Paste reCAPTCHA v3 token here..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="form-textarea"
              rows="4"
            />
          </div>
          <button
            className="verify-btn"
            onClick={verifyRecaptcha}
            disabled={loading}
          >
            <FaCheckCircle /> Verify Token
          </button>
        </div>

        {verifyResult && (
          <div className="verify-result">
            <div className="result-header">
              <FaCheckCircle className="success-icon" />
              <span>Verification Result</span>
            </div>
            <div className="result-details">
              <div className="result-row">
                <span className="result-label">Success:</span>
                <span className={`result-value ${verifyResult.success ? 'success' : 'failure'}`}>
                  {verifyResult.success ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="result-row">
                <span className="result-label">Score:</span>
                <span className="result-value score">{verifyResult.score}</span>
              </div>
              <div className="result-row">
                <span className="result-label">Action:</span>
                <span className="result-value">{verifyResult.action}</span>
              </div>
              <div className="result-row">
                <span className="result-label">Hostname:</span>
                <span className="result-value">{verifyResult.hostname}</span>
              </div>
            </div>
            <div className="score-info">
              <strong>Score Interpretation:</strong>
              <ul>
                <li>1.0 = Very likely a human</li>
                <li>0.5 = Neutral</li>
                <li>0.0 = Very likely a bot</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="settings-section">
        <h3><FaCog /> reCAPTCHA Settings</h3>
        <div className="settings-form">
          <div className="form-group">
            <label>Site Key</label>
            <input
              type="text"
              placeholder="6Lc..."
              value={siteKey}
              onChange={(e) => setSiteKey(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Secret Key</label>
            <input
              type="password"
              placeholder="6Lc..."
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
              <span>Enable reCAPTCHA Protection</span>
            </label>
          </div>
          <button
            className="save-btn"
            onClick={updateSettings}
            disabled={loading}
          >
            <FaCog /> Save Settings
          </button>
        </div>
      </div>

      <div className="info-section">
        <h4>🔒 About reCAPTCHA v3</h4>
        <p>
          reCAPTCHA v3 helps protect your app from spam and abuse without requiring user interaction.
          It returns a score (1.0 is very likely a good interaction, 0.0 is very likely a bot).
        </p>
        <div className="setup-guide">
          <h5>Setup Guide:</h5>
          <ol>
            <li>Register your site at <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noopener noreferrer">Google reCAPTCHA</a></li>
            <li>Choose reCAPTCHA v3</li>
            <li>Copy your Site Key and Secret Key</li>
            <li>Paste them in the settings above</li>
            <li>Enable protection and save</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecaptchaPanel;
