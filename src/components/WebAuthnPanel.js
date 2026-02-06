import React, { useState } from 'react';
import './WebAuthnPanel.css';
import { FaKey, FaShieldAlt, FaPlus, FaTrash, FaFingerprint, FaUsb } from 'react-icons/fa';

function WebAuthnPanel({ apiBaseUrl, fetchWithAuth }) {
  const [keys, setKeys] = useState([]);
  const [registering, setRegistering] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadKeys = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/webauthn/keys/list/`);
      if (response.ok) {
        const data = await response.json();
        setKeys(data.keys || []);
      }
    } catch (err) {
      console.error('Error loading keys:', err);
    }
  };

  React.useEffect(() => {
    loadKeys();
  }, []);

  const registerKey = async () => {
    if (!keyName.trim()) {
      setError('Please enter a key name');
      return;
    }

    setRegistering(true);
    setError('');
    try {
      // Begin registration
      const beginResponse = await fetchWithAuth(`${apiBaseUrl}/webauthn/register/begin/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key_name: keyName })
      });

      if (!beginResponse.ok) {
        throw new Error('Failed to begin registration');
      }

      const options = await beginResponse.json();

      // Use WebAuthn API
      const credential = await navigator.credentials.create({
        publicKey: {
          ...options.publicKey,
          challenge: Uint8Array.from(atob(options.publicKey.challenge), c => c.charCodeAt(0)),
          user: {
            ...options.publicKey.user,
            id: Uint8Array.from(atob(options.publicKey.user.id), c => c.charCodeAt(0))
          }
        }
      });

      // Complete registration
      const completeResponse = await fetchWithAuth(`${apiBaseUrl}/webauthn/register/complete/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credential: {
            id: credential.id,
            rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
            response: {
              attestationObject: btoa(String.fromCharCode(...new Uint8Array(credential.response.attestationObject))),
              clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON)))
            },
            type: credential.type
          },
          key_name: keyName
        })
      });

      if (completeResponse.ok) {
        setSuccess('Security key registered successfully!');
        setKeyName('');
        loadKeys();
      }
    } catch (err) {
      setError('Failed to register key: ' + err.message);
    } finally {
      setRegistering(false);
    }
  };

  const removeKey = async (keyId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/webauthn/keys/${keyId}/remove/`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSuccess('Security key removed');
        loadKeys();
      }
    } catch (err) {
      setError('Failed to remove key: ' + err.message);
    }
  };

  return (
    <div className="webauthn-panel">
      <div className="webauthn-header">
        <h2><FaShieldAlt className="shield-icon" /> Security Keys (FIDO2)</h2>
      </div>

      <div className="webauthn-info">
        <FaFingerprint className="info-icon" />
        <div>
          <h3>Hardware Security Keys</h3>
          <p>Use physical security keys (YubiKey, etc.) for maximum account protection</p>
        </div>
      </div>

      {error && <div className="webauthn-error">{error}</div>}
      {success && <div className="webauthn-success">{success}</div>}

      <div className="register-key-section">
        <h3><FaPlus /> Register New Key</h3>
        <div className="register-form">
          <input
            type="text"
            placeholder="Key name (e.g., YubiKey Work)"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className="key-input"
          />
          <button 
            className="register-btn"
            onClick={registerKey}
            disabled={registering}
          >
            {registering ? 'Insert your key...' : 'Register Key'}
          </button>
        </div>
        <div className="register-help">
          <FaUsb />
          <span>Insert your security key when prompted by your browser</span>
        </div>
      </div>

      <div className="keys-list">
        <h3><FaKey /> Registered Keys ({keys.length})</h3>
        {keys.length === 0 ? (
          <div className="empty-keys">
            <p>No security keys registered yet</p>
          </div>
        ) : (
          keys.map(key => (
            <div key={key.id} className="key-item">
              <div className="key-info">
                <FaKey className="key-icon" />
                <div>
                  <div className="key-name">{key.name}</div>
                  <div className="key-date">Added: {new Date(key.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              <button 
                className="remove-key-btn"
                onClick={() => removeKey(key.id)}
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WebAuthnPanel;
