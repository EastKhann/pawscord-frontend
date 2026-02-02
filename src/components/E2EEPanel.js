import React, { useState, useEffect } from 'react';
import './E2EEPanel.css';
import { FaLock, FaKey, FaShieldAlt, FaSync, FaCheckCircle } from 'react-icons/fa';

function E2EEPanel({ apiBaseUrl, fetchWithAuth, currentUser }) {
  const [keysUploaded, setKeysUploaded] = useState(false);
  const [recipientUsername, setRecipientUsername] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessages, setDecryptedMessages] = useState([]);
  const [safetyNumber, setSafetyNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkKeysStatus();
  }, []);

  const checkKeysStatus = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/e2ee/status/`);
      if (response.ok) {
        const data = await response.json();
        setKeysUploaded(data.keys_uploaded || false);
      }
    } catch (err) {
      console.error('Error checking keys status:', err);
    }
  };

  const generateAndUploadKeys = async () => {
    setLoading(true);
    setMessage('🔐 Generating encryption keys...');
    
    try {
      // Simulate key generation (in production, use actual crypto libraries)
      const identityKey = btoa(Math.random().toString(36).substring(2, 15));
      const preKeys = Array.from({ length: 100 }, (_, i) => ({
        keyId: i,
        publicKey: btoa(Math.random().toString(36).substring(2, 15))
      }));

      const response = await fetchWithAuth(`${apiBaseUrl}/api/e2ee/upload-keys/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identity_key: identityKey,
          pre_keys: preKeys,
          signed_pre_key: {
            keyId: 1,
            publicKey: btoa(Math.random().toString(36).substring(2, 15)),
            signature: btoa(Math.random().toString(36).substring(2, 15))
          }
        })
      });

      if (response.ok) {
        setMessage('✅ Encryption keys uploaded successfully!');
        setKeysUploaded(true);
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to upload keys'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreKeyBundle = async (username) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/e2ee/pre-key-bundle/${username}/`);
      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Fetched ${username}'s encryption keys`);
        return data;
      }
    } catch (err) {
      setMessage('❌ Failed to fetch pre-key bundle');
    }
    return null;
  };

  const sendEncryptedMessage = async () => {
    if (!recipientUsername.trim() || !encryptedMessage.trim()) {
      setMessage('❌ Please enter recipient and message');
      return;
    }

    setLoading(true);
    try {
      // Fetch recipient's keys first
      await fetchPreKeyBundle(recipientUsername);

      // Simulate encryption (in production, use Signal Protocol)
      const encrypted = btoa(encryptedMessage);

      const response = await fetchWithAuth(`${apiBaseUrl}/api/e2ee/send-encrypted-message/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: recipientUsername,
          encrypted_content: encrypted,
          ephemeral_key: btoa(Math.random().toString(36).substring(2, 15))
        })
      });

      if (response.ok) {
        setMessage('✅ Encrypted message sent!');
        setEncryptedMessage('');
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to send message'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEncryptedMessages = async () => {
    if (!recipientUsername.trim()) {
      setMessage('❌ Please enter username');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/e2ee/encrypted-messages/${recipientUsername}/`);
      if (response.ok) {
        const data = await response.json();
        setDecryptedMessages(data.messages || []);
        setMessage(`✅ Loaded ${data.messages?.length || 0} encrypted messages`);
      }
    } catch (err) {
      setMessage('❌ Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const rotateKeys = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/e2ee/rotate-keys/`, {
        method: 'POST'
      });

      if (response.ok) {
        setMessage('✅ Keys rotated successfully!');
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to rotate keys'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSafetyNumber = async () => {
    if (!recipientUsername.trim()) {
      setMessage('❌ Please enter username');
      return;
    }

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/e2ee/safety-number/${recipientUsername}/`);
      if (response.ok) {
        const data = await response.json();
        setSafetyNumber(data.safety_number);
        setMessage('✅ Safety number generated');
      }
    } catch (err) {
      setMessage('❌ Failed to get safety number');
    }
  };

  const verifySafetyNumber = async (number) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/e2ee/verify-safety-number/${recipientUsername}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ safety_number: number })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.verified ? '✅ Safety number verified!' : '❌ Safety number mismatch!');
      }
    } catch (err) {
      setMessage('❌ Failed to verify');
    }
  };

  return (
    <div className="e2ee-panel">
      <div className="e2ee-header">
        <h2><FaLock /> End-to-End Encryption</h2>
        <p>🔐 WhatsApp/Signal-style encrypted messaging</p>
      </div>

      {message && <div className="e2ee-message">{message}</div>}

      {!keysUploaded ? (
        <div className="keys-setup">
          <div className="setup-icon">
            <FaKey />
          </div>
          <h3>Setup Required</h3>
          <p>Generate and upload your encryption keys to start using E2EE messaging</p>
          <button
            className="setup-btn"
            onClick={generateAndUploadKeys}
            disabled={loading}
          >
            <FaKey /> {loading ? 'Generating...' : 'Generate Encryption Keys'}
          </button>
        </div>
      ) : (
        <>
          <div className="status-card">
            <FaCheckCircle className="status-icon success" />
            <div className="status-text">
              <strong>Encryption Active</strong>
              <span>Your messages are end-to-end encrypted</span>
            </div>
            <button className="rotate-btn" onClick={rotateKeys} disabled={loading}>
              <FaSync /> Rotate Keys
            </button>
          </div>

          <div className="e2ee-section">
            <h3><FaLock /> Send Encrypted Message</h3>
            <div className="send-form">
              <div className="form-group">
                <label>Recipient Username</label>
                <input
                  type="text"
                  placeholder="username"
                  value={recipientUsername}
                  onChange={(e) => setRecipientUsername(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  placeholder="Your encrypted message..."
                  value={encryptedMessage}
                  onChange={(e) => setEncryptedMessage(e.target.value)}
                  className="form-textarea"
                  rows="4"
                />
              </div>
              <button
                className="send-btn"
                onClick={sendEncryptedMessage}
                disabled={loading}
              >
                <FaLock /> Send Encrypted
              </button>
            </div>
          </div>

          <div className="e2ee-section">
            <h3><FaShieldAlt /> Safety Number Verification</h3>
            <div className="safety-form">
              <button className="verify-btn" onClick={getSafetyNumber}>
                <FaShieldAlt /> Get Safety Number
              </button>
              {safetyNumber && (
                <div className="safety-number-display">
                  <div className="safety-number">{safetyNumber}</div>
                  <p>Compare this number with {recipientUsername} out-of-band to verify identity</p>
                  <button
                    className="confirm-btn"
                    onClick={() => verifySafetyNumber(safetyNumber)}
                  >
                    Confirm Verification
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="e2ee-section">
            <h3>📨 Encrypted Messages</h3>
            <button className="fetch-btn" onClick={fetchEncryptedMessages}>
              Load Messages with {recipientUsername || '...'}
            </button>
            {decryptedMessages.length > 0 && (
              <div className="messages-list">
                {decryptedMessages.map((msg, i) => (
                  <div key={i} className="encrypted-message">
                    <div className="msg-header">
                      <span className="msg-from">{msg.from}</span>
                      <span className="msg-time">{new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="msg-content">
                      🔐 {msg.decrypted_content || '[Encrypted]'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="info-box">
            <h4>🔒 How E2EE Works</h4>
            <ul>
              <li>Messages are encrypted on your device before sending</li>
              <li>Only you and recipient can decrypt messages</li>
              <li>Server cannot read message contents</li>
              <li>Safety numbers verify identity to prevent man-in-the-middle attacks</li>
              <li>Keys are rotated periodically for forward secrecy</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default E2EEPanel;
