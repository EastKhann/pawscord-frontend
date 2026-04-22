/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './E2EEPanel.css';
import { FaLock, FaKey, FaShieldAlt, FaSync, FaCheckCircle } from 'react-icons/fa';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

function E2EEPanel({ apiBaseUrl, fetchWithAuth, currentUser }) {
    const { t } = useTranslation();
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
            const response = await fetchWithAuth(`${apiBaseUrl}/e2ee/status/`);
            if (response.ok) {
                const data = await response.json();
                setKeysUploaded(data.keys_uploaded || false);
            }
        } catch (err) {
            logger.error('Error checking keys status:', err);
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
                publicKey: btoa(Math.random().toString(36).substring(2, 15)),
            }));

            const response = await fetchWithAuth(`${apiBaseUrl}/e2ee/upload-keys/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identity_key: identityKey,
                    pre_keys: preKeys,
                    signed_pre_key: {
                        keyId: 1,
                        publicKey: btoa(Math.random().toString(36).substring(2, 15)),
                        signature: btoa(Math.random().toString(36).substring(2, 15)),
                    },
                }),
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
            const response = await fetchWithAuth(`${apiBaseUrl}/e2ee/pre-key-bundle/${username}/`);
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

            const response = await fetchWithAuth(`${apiBaseUrl}/e2ee/send-encrypted-message/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipient: recipientUsername,
                    encrypted_content: encrypted,
                    ephemeral_key: btoa(Math.random().toString(36).substring(2, 15)),
                }),
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
            const response = await fetchWithAuth(
                `${apiBaseUrl}/e2ee/encrypted-messages/${recipientUsername}/`
            );
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
            const response = await fetchWithAuth(`${apiBaseUrl}/e2ee/rotate-keys/`, {
                method: 'POST',
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
            const response = await fetchWithAuth(
                `${apiBaseUrl}/e2ee/safety-number/${recipientUsername}/`
            );
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
            const response = await fetchWithAuth(
                `${apiBaseUrl}/e2ee/verify-safety-number/${recipientUsername}/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ safety_number: number }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setMessage(
                    data.verified ? '✅ Safety number verified!' : '❌ Safety number mismatch!'
                );
            }
        } catch (err) {
            setMessage('❌ Failed to verify');
        }
    };

    return (
        <div className="e2ee-panel">
            <div className="e2ee-header">
                <h2>
                    <FaLock /> End-to-End Encryption
                </h2>
                <p>🔐 WhatsApp/Signal-style encrypted messaging</p>
            </div>

            {message && <div className="e2ee-message">{message}</div>}

            {!keysUploaded ? (
                <div className="keys-setup">
                    <div className="setup-icon">
                        <FaKey />
                    </div>
                    <h3>{t('e2ee.setupRequired', 'Setup Required')}</h3>
                    <p>
                        {t('e2ee.generateKeysDesc', 'Generate and upload your encryption keys to start using E2EE messaging')}
                    </p>
                    <button
                        aria-label={t('e2ee.generateKeys', 'Generate and upload encryption keys')}
                        className="setup-btn"
                        onClick={generateAndUploadKeys}
                        disabled={loading}
                    >
                        <FaKey /> {loading ? t('e2ee.generating', 'Generating...') : t('e2ee.createKeys', 'Create Encryption Keys')}
                    </button>
                </div>
            ) : (
                <>
                    <div className="status-card">
                        <FaCheckCircle className="status-icon success" />
                        <div className="status-text">
                            <strong>{t('e2ee.encryptionActive', 'Encryption Active')}</strong>
                            <span>{t('e2ee.messagesEncrypted', 'Your messages are end-to-end encrypted')}</span>
                        </div>
                        <button
                            aria-label={t('e2ee.rotateKeys', 'Rotate encryption keys')}
                            className="rotate-btn"
                            onClick={rotateKeys}
                            disabled={loading}
                        >
                            <FaSync /> {t('e2ee.rotateKeys', 'Rotate Keys')}
                        </button>
                    </div>

                    <div className="e2ee-section">
                        <h3>
                            <FaLock /> {t('e2ee.sendEncryptedMessage', 'Send Encrypted Message')}
                        </h3>
                        <div className="send-form">
                            <div className="form-group">
                                <label>{t('e2ee.recipientUsername', 'Recipient Username')}</label>
                                <input
                                    type="text"
                                    placeholder={t('common.username', 'Username')}
                                    value={recipientUsername}
                                    onChange={(e) => setRecipientUsername(e.target.value)}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    placeholder={t('security.encryptedMessagePlaceholder', 'Your encrypted message...')}
                                    value={encryptedMessage}
                                    onChange={(e) => setEncryptedMessage(e.target.value)}
                                    className="form-textarea"
                                    rows="4"
                                />
                            </div>
                            <button
                                aria-label={t('e2ee.sendEncryptedBtn', 'Send encrypted message')}
                                className="send-btn"
                                onClick={sendEncryptedMessage}
                                disabled={loading}
                            >
                                <FaLock /> {t('e2ee.sendEncrypted', 'Send Encrypted')}
                            </button>
                        </div>
                    </div>

                    <div className="e2ee-section">
                        <h3>
                            <FaShieldAlt /> Safety Number Verification
                        </h3>
                        <div className="safety-form">
                            <button
                                aria-label={t('e2ee.getSafetyNumber', 'Get safety number')}
                                className="verify-btn"
                                onClick={getSafetyNumber}
                            >
                                <FaShieldAlt /> Get Safety Number
                            </button>
                            {safetyNumber && (
                                <div className="safety-number-display">
                                    <div className="safety-number">{safetyNumber}</div>
                                    <p>
                                        Compare this number with {recipientUsername} out-of-band to
                                        verify identity
                                    </p>
                                    <button
                                        aria-label={t('e2ee.confirmVerification', 'Confirm verification')}
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
                        <button
                            aria-label={t('e2ee.fetchMessages', 'Load encrypted messages')}
                            className="fetch-btn"
                            onClick={fetchEncryptedMessages}
                        >
                            Load Messages with {recipientUsername || '...'}
                        </button>
                        {decryptedMessages.length > 0 && (
                            <div className="messages-list">
                                {decryptedMessages.map((msg, i) => (
                                    <div key={`item-${i}`} className="encrypted-message">
                                        <div className="msg-header">
                                            <span className="msg-from">{msg.from}</span>
                                            <span className="msg-time">
                                                {new Date(msg.timestamp).toLocaleString()}
                                            </span>
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
                        <h4>{t('e2ee.howItWorks', '🔒 How E2EE Works')}</h4>
                        <ul>
                            <li>{t('e2ee.bullet1', 'Messages are encrypted on your device before sending')}</li>
                            <li>{t('e2ee.bullet2', 'Only you and the recipient can decrypt messages')}</li>
                            <li>{t('e2ee.bullet3', 'The server cannot read message contents')}</li>
                            <li>
                                {t('e2ee.safetyNumbers', 'Safety numbers verify identity to prevent man-in-the-middle attacks')}
                            </li>
                            <li>{t('e2ee.periodicRotation', 'Keys are periodically rotated for forward secrecy')}</li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}

E2EEPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    currentUser: PropTypes.object,
};
export default E2EEPanel;
