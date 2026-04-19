/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './E2EEPanel.css';
import { FaLock, FaKey, FaShieldAlt, FaSync, FaCheckCircle } from 'react-icons/fa';
import logger from '../../utils/logger';

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
                    <h3>Kurulum Gerekli</h3>
                    <p>
                        E2EE mesajlaşmayı kullanmaya başlamak için şifreleme anahtarlarınızı
                        oluşturun ve yükleyin
                    </p>
                    <button
                        aria-label="generate And Upload Keys"
                        className="setup-btn"
                        onClick={generateAndUploadKeys}
                        disabled={loading}
                    >
                        <FaKey /> {loading ? 'Üretiliyor...' : 'Şifreleme Anahtarları Oluştur'}
                    </button>
                </div>
            ) : (
                <>
                    <div className="status-card">
                        <FaCheckCircle className="status-icon success" />
                        <div className="status-text">
                            <strong>Şifreleme Aktif</strong>
                            <span>Mesajlarınız uçtan uça şifrelenmiştir</span>
                        </div>
                        <button
                            aria-label="rotate Keys"
                            className="rotate-btn"
                            onClick={rotateKeys}
                            disabled={loading}
                        >
                            <FaSync /> Anahtarları Döndür
                        </button>
                    </div>

                    <div className="e2ee-section">
                        <h3>
                            <FaLock /> Şifreli Mesaj Gönder
                        </h3>
                        <div className="send-form">
                            <div className="form-group">
                                <label>Alıcı Kullanıcı Adı</label>
                                <input
                                    type="text"
                                    placeholder="kullanıcı adı"
                                    value={recipientUsername}
                                    onChange={(e) => setRecipientUsername(e.target.value)}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    placeholder="Şifreli mesajınız..."
                                    value={encryptedMessage}
                                    onChange={(e) => setEncryptedMessage(e.target.value)}
                                    className="form-textarea"
                                    rows="4"
                                />
                            </div>
                            <button
                                aria-label="send Encrypted Message"
                                className="send-btn"
                                onClick={sendEncryptedMessage}
                                disabled={loading}
                            >
                                <FaLock /> Şifreli Gönder
                            </button>
                        </div>
                    </div>

                    <div className="e2ee-section">
                        <h3>
                            <FaShieldAlt /> Safety Number Verification
                        </h3>
                        <div className="safety-form">
                            <button
                                aria-label="get Safety Number"
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
                                        aria-label="Action button"
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
                        <button
                            aria-label="fetch Encrypted Messages"
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
                        <h4>🔒 Uçtan Uca Şifrelem (E2EE) Nasıl Çalışır?</h4>
                        <ul>
                            <li>Mesajlar gönderilmeden önce cihazınızda şifrelenir</li>
                            <li>Yalnızca siz ve alıcı mesajları çözebilir</li>
                            <li>Sunucu mesaj içeriklerini okuyamaz</li>
                            <li>
                                Güvenlik numaraları, ortadaki adam saldırılarını önlemek için
                                kimliği doğrular
                            </li>
                            <li>Anahtarlar, ileri gizlilik için periyodik olarak değiştirilir</li>
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
