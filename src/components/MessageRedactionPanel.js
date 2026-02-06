import React, { useState } from 'react';
import './MessageRedactionPanel.css';
import { FaEraser, FaEyeSlash, FaLock } from 'react-icons/fa';

function MessageRedactionPanel({ apiBaseUrl, fetchWithAuth, messageId, onRedact }) {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const redactMessage = async () => {
    if (!messageId) {
      setMessage('❌ No message selected');
      return;
    }

    if (!reason.trim()) {
      setMessage('❌ Please provide a reason');
      return;
    }

    if (!window.confirm('Redact this message? This action cannot be undone!')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/redact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message_id: messageId,
          reason: reason
        })
      });

      if (response.ok) {
        setMessage('✅ Message redacted successfully!');
        setReason('');
        if (onRedact) onRedact();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to redact message'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="message-redaction-panel">
      <div className="redaction-header">
        <h3><FaEraser /> Redact Message</h3>
      </div>

      {message && <div className="redaction-message">{message}</div>}

      <div className="redaction-warning">
        <FaLock className="warning-icon" />
        <div className="warning-text">
          <strong>Warning:</strong> Redacting a message will permanently hide its content
          for security/privacy reasons. This action is irreversible!
        </div>
      </div>

      <div className="redaction-form">
        <div className="form-group">
          <label>Reason for Redaction:</label>
          <textarea
            placeholder="Why is this message being redacted? (e.g., sensitive data, legal requirement)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="reason-textarea"
            rows={3}
          />
        </div>

        <button
          className="redact-btn"
          onClick={redactMessage}
          disabled={loading || !messageId || !reason.trim()}
        >
          <FaEyeSlash /> Redact Message
        </button>
      </div>

      <div className="redaction-info">
        <h4>ℹ️ About Message Redaction</h4>
        <ul>
          <li>Original content will be replaced with "[REDACTED]"</li>
          <li>Redaction reason will be logged for audit purposes</li>
          <li>Only admins/moderators can redact messages</li>
          <li>Use for: PII, sensitive data, legal compliance</li>
        </ul>
      </div>
    </div>
  );
}

export default MessageRedactionPanel;
