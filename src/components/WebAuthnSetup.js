// frontend/src/components/WebAuthnSetup.js
import React, { useState, useEffect } from 'react';
import { FaKey, FaUsb, FaFingerprint, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import './WebAuthnSetup.css';

/**
 * 🔐 WebAuthn/FIDO2 Hardware Key Setup
 * Passwordless authentication with security keys (YubiKey, TouchID, Windows Hello)
 */
const WebAuthnSetup = ({ apiBaseUrl, fetchWithAuth, onClose }) => {
    const [credentials, setCredentials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [newDeviceName, setNewDeviceName] = useState('');
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        // Check WebAuthn support
        if (!window.PublicKeyCredential) {
            setIsSupported(false);
            setError('WebAuthn is not supported in this browser. Please use Chrome, Edge, or Safari.');
            return;
        }

        loadCredentials();
    }, []);

    const loadCredentials = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/webauthn/credentials/`);
            if (response.ok) {
                const data = await response.json();
                setCredentials(data);
            }
        } catch (err) {
            console.error('Failed to load credentials:', err);
        }
    };

    const handleRegister = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Step 1: Get challenge from server
            const beginResponse = await fetchWithAuth(`${apiBaseUrl}/webauthn/register/begin/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });

            if (!beginResponse.ok) {
                throw new Error('Failed to start registration');
            }

            const options = await beginResponse.json();

            // Step 2: Create credential with WebAuthn API
            const publicKeyCredentialCreationOptions = {
                challenge: Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0)),
                rp: options.rp,
                user: {
                    id: Uint8Array.from(atob(options.user.id), c => c.charCodeAt(0)),
                    name: options.user.name,
                    displayName: options.user.displayName
                },
                pubKeyCredParams: options.pubKeyCredParams,
                timeout: options.timeout,
                authenticatorSelection: options.authenticatorSelection,
                attestation: options.attestation
            };

            console.log('Creating credential...', publicKeyCredentialCreationOptions);

            const credential = await navigator.credentials.create({
                publicKey: publicKeyCredentialCreationOptions
            });

            console.log('Credential created:', credential);

            // Step 3: Send credential to server
            const credentialData = {
                id: credential.id,
                rawId: btoa(String.fromCharCode(...new Uint8Array(credential.rawId))),
                response: {
                    attestationObject: btoa(String.fromCharCode(...new Uint8Array(credential.response.attestationObject))),
                    clientDataJSON: btoa(String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON)))
                },
                type: credential.type,
                device_name: `Security Key ${credentials.length + 1}`
            };

            const completeResponse = await fetchWithAuth(`${apiBaseUrl}/webauthn/register/complete/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentialData)
            });

            if (!completeResponse.ok) {
                const errorData = await completeResponse.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            setSuccess('✅ Security key registered successfully!');
            loadCredentials();

        } catch (err) {
            console.error('Registration error:', err);

            if (err.name === 'NotAllowedError') {
                setError('❌ Registration was cancelled or timed out. Please try again.');
            } else if (err.name === 'InvalidStateError') {
                setError('❌ This security key is already registered.');
            } else {
                setError(`❌ ${err.message || 'Registration failed. Please try again.'}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (credentialId) => {
        if (!window.confirm('Are you sure you want to remove this security key?')) {
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/webauthn/credentials/${credentialId}/delete/`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setSuccess('✅ Security key removed');
                loadCredentials();
            } else {
                throw new Error('Failed to delete credential');
            }
        } catch (err) {
            setError(`❌ ${err.message}`);
        }
    };

    const handleRename = async (credentialId) => {
        if (!newDeviceName.trim()) {
            setError('Device name cannot be empty');
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/webauthn/credentials/${credentialId}/rename/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ device_name: newDeviceName })
            });

            if (response.ok) {
                setSuccess('✅ Device renamed');
                setEditingId(null);
                setNewDeviceName('');
                loadCredentials();
            } else {
                throw new Error('Failed to rename device');
            }
        } catch (err) {
            setError(`❌ ${err.message}`);
        }
    };

    const startEdit = (credential) => {
        setEditingId(credential.id);
        setNewDeviceName(credential.device_name);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setNewDeviceName('');
    };

    if (!isSupported) {
        return (
            <div className="webauthn-setup-overlay" onClick={onClose}>
                <div className="webauthn-setup-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="webauthn-setup-header">
                        <h2><FaKey /> WebAuthn Not Supported</h2>
                        <button className="webauthn-setup-close" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                    <div className="webauthn-setup-content">
                        <div className="webauthn-setup-error-box">
                            {error}
                        </div>
                        <p>Please use a modern browser like Chrome, Edge, Firefox, or Safari.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="webauthn-setup-overlay" onClick={onClose}>
            <div className="webauthn-setup-modal" onClick={(e) => e.stopPropagation()}>
                <div className="webauthn-setup-header">
                    <h2><FaKey /> Hardware Key Authentication</h2>
                    <button className="webauthn-setup-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="webauthn-setup-content">
                    {/* Info Box */}
                    <div className="webauthn-setup-info">
                        <FaFingerprint size={40} />
                        <h3>Passwordless Login</h3>
                        <p>Use security keys like YubiKey, TouchID, or Windows Hello for secure authentication.</p>
                    </div>

                    {/* Error/Success Messages */}
                    {error && <div className="webauthn-setup-error">{error}</div>}
                    {success && <div className="webauthn-setup-success">{success}</div>}

                    {/* Register Button */}
                    <button
                        className="webauthn-setup-register-btn"
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <>⏳ Waiting for security key...</>
                        ) : (
                            <><FaUsb /> Register New Security Key</>
                        )}
                    </button>

                    {/* Credentials List */}
                    {credentials.length > 0 && (
                        <div className="webauthn-setup-credentials">
                            <h3>Your Security Keys ({credentials.length})</h3>
                            {credentials.map(cred => (
                                <div key={cred.id} className="webauthn-setup-credential-item">
                                    {editingId === cred.id ? (
                                        <div className="webauthn-setup-edit-row">
                                            <input
                                                type="text"
                                                value={newDeviceName}
                                                onChange={(e) => setNewDeviceName(e.target.value)}
                                                className="webauthn-setup-edit-input"
                                                autoFocus
                                            />
                                            <button
                                                className="webauthn-setup-btn-save"
                                                onClick={() => handleRename(cred.id)}
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                className="webauthn-setup-btn-cancel"
                                                onClick={cancelEdit}
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="webauthn-setup-credential-info">
                                                <FaKey className="webauthn-setup-credential-icon" />
                                                <div>
                                                    <strong>{cred.device_name}</strong>
                                                    <div className="webauthn-setup-credential-meta">
                                                        Added: {new Date(cred.created_at).toLocaleDateString()}
                                                        {cred.last_used && (
                                                            <> • Last used: {new Date(cred.last_used).toLocaleDateString()}</>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="webauthn-setup-credential-actions">
                                                <button
                                                    className="webauthn-setup-btn-edit"
                                                    onClick={() => startEdit(cred)}
                                                    title="Rename"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="webauthn-setup-btn-delete"
                                                    onClick={() => handleDelete(cred.id)}
                                                    title="Remove"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="webauthn-setup-instructions">
                        <h4>How it works:</h4>
                        <ol>
                            <li>Click "Register New Security Key"</li>
                            <li>Insert your security key or use biometric (TouchID/Windows Hello)</li>
                            <li>Follow browser prompts to register</li>
                            <li>Next time, login with your key instead of password!</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebAuthnSetup;


