import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WebAuthnPanel.css';
import { FaKey, FaShieldAlt, FaPlus, FaTrash, FaFingerprint, FaUsb } from 'react-icons/fa';
import logger from '../../utils/logger';

function WebAuthnPanel({ apiBaseUrl, fetchWithAuth }) {
    const [keys, setKeys] = useState([]);
    const [registering, setRegistering] = useState(false);
    const [keyName, setKeyName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const loadKeys = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/webauthn/credentials/`);
            if (response.ok) {
                const data = await response.json();
                setKeys(data.keys || []);
            }
        } catch (err) {
            logger.error('Error loading keys:', err);
        }
    };

    React.useEffect(() => {
        loadKeys();
    }, []);

    const registerKey = async () => {
        if (!keyName.trim()) {
            setError('Lütfen bir anahtar adı girin');
            return;
        }

        setRegistering(true);
        setError('');
        try {
            // Begin registration
            const beginResponse = await fetchWithAuth(`${apiBaseUrl}/webauthn/register/begin/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key_name: keyName }),
            });

            if (!beginResponse.ok) {
                throw new Error('Failed to begin registration');
            }

            const options = await beginResponse.json();

            // Use WebAuthn API
            const credential = await navigator.credentials.create({
                publicKey: {
                    ...options.publicKey,
                    challenge: Uint8Array.from(atob(options.publicKey.challenge), (c) =>
                        c.charCodeAt(0)
                    ),
                    user: {
                        ...options.publicKey.user,
                        id: Uint8Array.from(atob(options.publicKey.user.id), (c) =>
                            c.charCodeAt(0)
                        ),
                    },
                },
            });

            // Complete registration
            const completeResponse = await fetchWithAuth(
                `${apiBaseUrl}/webauthn/register/complete/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        credential: {
                            id: credential.id,
                            rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
                            response: {
                                attestationObject: btoa(
                                    String.fromCharCode(
                                        ...new Uint8Array(credential.response.attestationObject)
                                    )
                                ),
                                clientDataJSON: btoa(
                                    String.fromCharCode(
                                        ...new Uint8Array(credential.response.clientDataJSON)
                                    )
                                ),
                            },
                            type: credential.type,
                        },
                        key_name: keyName,
                    }),
                }
            );

            if (completeResponse.ok) {
                setSuccess('Güvenlik anahtarı başarıyla kaydedildi!');
                setKeyName('');
                loadKeys();
            }
        } catch (err) {
            setError('Anahtar kaydedilemedi: ' + err.message);
        } finally {
            setRegistering(false);
        }
    };

    const removeKey = async (keyId) => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/webauthn/credentials/${keyId}/delete/`,
                {
                    method: 'DELETE',
                }
            );

            if (response.ok) {
                setSuccess('Güvenlik anahtarı kaldırıldı');
                loadKeys();
            }
        } catch (err) {
            setError('Anahtar kaldırılamadı: ' + err.message);
        }
    };

    return (
        <div className="webauthn-panel">
            <div className="webauthn-header">
                <h2>
                    <FaShieldAlt className="shield-icon" /> Security Keys (FIDO2)
                </h2>
            </div>

            <div className="webauthn-info">
                <FaFingerprint className="info-icon" />
                <div>
                    <h3>Donanım Güvenlik Anahtarları</h3>
                    <p>Use physical security keys (YubiKey, etc.) for maximum account protection</p>
                </div>
            </div>

            {error && <div className="webauthn-error">{error}</div>}
            {success && <div className="webauthn-success">{success}</div>}

            <div className="register-key-section">
                <h3>
                    <FaPlus /> Register New Key
                </h3>
                <div className="register-form">
                    <input
                        type="text"
                        placeholder="Anahtar adı (örn: YubiKey Work)"
                        value={keyName}
                        onChange={(e) => setKeyName(e.target.value)}
                        className="key-input"
                    />
                    <button
                        aria-label="register Key"
                        className="register-btn"
                        onClick={registerKey}
                        disabled={registering}
                    >
                        {registering ? 'Anahtarınızı takın...' : 'Anahtar Kaydet'}
                    </button>
                </div>
                <div className="register-help">
                    <FaUsb />
                    <span>Tarayıcınız istemde bulunduğunda güvenlik anahtarınızı takın</span>
                </div>
            </div>

            <div className="keys-list">
                <h3>
                    <FaKey /> Kayıtlı Anahtarlar ({keys.length})
                </h3>
                {keys.length === 0 ? (
                    <div className="empty-keys">
                        <p>Henüz kayıtlı güvenlik anahtarı yok</p>
                    </div>
                ) : (
                    keys.map((key) => (
                        <div key={key.id} className="key-item">
                            <div className="key-info">
                                <FaKey className="key-icon" />
                                <div>
                                    <div className="key-name">{key.name}</div>
                                    <div className="key-date">
                                        Eklendi: {new Date(key.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <button
                                aria-label="Action button"
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

WebAuthnPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default WebAuthnPanel;
