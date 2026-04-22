import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './WebAuthnPanel.css';
import { FaKey, FaShieldAlt, FaPlus, FaTrash, FaFingerprint, FaUsb } from 'react-icons/fa';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

function WebAuthnPanel({ apiBaseUrl, fetchWithAuth }) {
    const { t } = useTranslation();
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
            setError(t('webauthn.enterKeyName', 'Please enter a key name'));
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
                setSuccess(t('webauthn.keyRegistered', 'Security key registered successfully!'));
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
                setSuccess(t('webauthn.keyRemoved', 'Security key removed'));
                loadKeys();
            }
        } catch (err) {
            setError(t('webauthn.removeError', 'Key could not be removed: ') + err.message);
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
                    <h3>{t('webauthn.title', 'Hardware Security Keys')}</h3>
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
                        placeholder={t('security.keyNamePlaceholder', 'Key name (e.g. YubiKey Work)')}
                        value={keyName}
                        onChange={(e) => setKeyName(e.target.value)}
                        className="key-input"
                    />
                    <button
                        aria-label={t('webAuthn.registerKey', 'Register security key')}
                        className="register-btn"
                        onClick={registerKey}
                        disabled={registering}
                    >
                        {registering ? t('webauthn.insertKey', 'Insert your key...') : t('webauthn.registerKey', 'Register Key')}
                    </button>
                </div>
                <div className="register-help">
                    <FaUsb />
                    <span>{t('webauthn.insertHint', 'Insert your security key when your browser prompts you')}</span>
                </div>
            </div>

            <div className="keys-list">
                <h3>
                    <FaKey /> {t('webauthn.registeredKeys', 'Registered Keys')} ({keys.length})
                </h3>
                {keys.length === 0 ? (
                    <div className="empty-keys">
                        <p>{t('webauthn.noKeys', 'No security keys registered yet')}</p>
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
                                aria-label={t('webAuthn.removeKey', 'Remove security key')}
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
