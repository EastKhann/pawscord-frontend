import React, { useState, useEffect } from 'react';
import './RetentionPoliciesPanel.css';
import { FaTrash, FaClock, FaPlus, FaHistory } from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

function RetentionPoliciesPanel({ apiBaseUrl, fetchWithAuth }) {
  const [policies, setPolicies] = useState([]);
  const [retentionDays, setRetentionDays] = useState(30);
  const [contentType, setContentType] = useState('messages');
  const [autoDelete, setAutoDelete] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const contentTypes = [
    { value: 'messages', label: 'Messages', icon: '💬' },
    { value: 'attachments', label: 'File Attachments', icon: '📎' },
    { value: 'voice_recordings', label: 'Voice Recordings', icon: '🎙️' },
    { value: 'logs', label: 'Activity Logs', icon: '📋' }
  ];

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/retention/list/`);
      if (response.ok) {
        const data = await response.json();
        setPolicies(data.policies || []);
      }
    } catch (err) {
      console.error('Error loading policies:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPolicy = async () => {
    if (retentionDays < 1) {
      setMessage('❌ Retention days must be at least 1');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/retention/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content_type: contentType,
          retention_days: retentionDays,
          auto_delete: autoDelete
        })
      });

      if (response.ok) {
        setMessage('✅ Retention policy created!');
        setRetentionDays(30);
        loadPolicies();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to create policy'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePolicy = async (policyId) => {
    if (!await confirmDialog('Delete this retention policy?')) return;

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/retention/${policyId}/delete/`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage('✅ Policy deleted');
        loadPolicies();
      }
    } catch (err) {
      setMessage('❌ Failed to delete policy');
    }
  };

  const getContentTypeInfo = (type) => {
    return contentTypes.find(ct => ct.value === type) || { label: type, icon: '📁' };
  };

  return (
    <div className="retention-policies-panel">
      <div className="retention-header">
        <h2><FaClock /> Data Retention Policies</h2>
      </div>

      {message && <div className="retention-message">{message}</div>}

      <div className="create-policy">
        <h3><FaPlus /> Create New Policy</h3>
        <div className="policy-form">
          <div className="form-group">
            <label>Content Type:</label>
            <div className="content-type-selector">
              {contentTypes.map(ct => (
                <button
                  key={ct.value}
                  className={`type-btn ${contentType === ct.value ? 'active' : ''}`}
                  onClick={() => setContentType(ct.value)}
                >
                  {ct.icon} {ct.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Retention Period (days):</label>
            <div className="retention-input">
              <input
                type="number"
                min="1"
                max="3650"
                value={retentionDays}
                onChange={(e) => setRetentionDays(parseInt(e.target.value))}
                className="days-input"
              />
              <div className="retention-preview">
                Data will be kept for <strong>{retentionDays} days</strong>
                {retentionDays >= 365 && ` (~${Math.floor(retentionDays / 365)} years)`}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={autoDelete}
                onChange={(e) => setAutoDelete(e.target.checked)}
              />
              <span>Automatically delete after retention period</span>
            </label>
          </div>

          <button
            className="create-btn"
            onClick={createPolicy}
            disabled={loading}
          >
            <FaPlus /> Create Policy
          </button>
        </div>
      </div>

      <div className="policies-list">
        <h3><FaHistory /> Active Policies ({policies.length})</h3>
        {loading && policies.length === 0 ? (
          <div className="loading">Loading policies...</div>
        ) : policies.length === 0 ? (
          <div className="empty-policies">
            <FaClock className="empty-icon" />
            <p>No retention policies configured</p>
            <p className="empty-hint">Create a policy to automatically manage old data</p>
          </div>
        ) : (
          <div className="policy-items">
            {policies.map((policy, idx) => {
              const typeInfo = getContentTypeInfo(policy.content_type);
              return (
                <div key={idx} className="policy-item">
                  <div className="policy-icon">{typeInfo.icon}</div>
                  <div className="policy-info">
                    <div className="policy-type">{typeInfo.label}</div>
                    <div className="policy-details">
                      <span className="detail-item">
                        <FaClock /> Keep for {policy.retention_days} days
                      </span>
                      {policy.auto_delete && (
                        <span className="detail-item auto-delete">
                          <FaTrash /> Auto-delete enabled
                        </span>
                      )}
                    </div>
                    <div className="policy-meta">
                      Created {new Date(policy.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deletePolicy(policy.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="retention-info">
        <h4>ℹ️ About Retention Policies</h4>
        <ul>
          <li><strong>Compliance:</strong> Meet data retention requirements (GDPR, etc.)</li>
          <li><strong>Storage:</strong> Automatically clean up old data to save space</li>
          <li><strong>Privacy:</strong> Respect user privacy by not keeping data forever</li>
          <li><strong>Auto-Delete:</strong> When enabled, data is permanently deleted after the retention period</li>
        </ul>
      </div>
    </div>
  );
}

export default RetentionPoliciesPanel;
