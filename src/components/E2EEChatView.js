// frontend/src/components/E2EEChatView.js
import React, { useState, useEffect, useRef } from 'react';
import toast from '../utils/toast';
import { FaLock, FaPaperPlane, FaShieldAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import {
    deriveSharedSecret,
    encryptMessage,
    decryptMessage,
    fetchUserPublicKeys,
} from '../utils/e2ee';

/**
 * E2EE Chat View
 * Encrypted direct messaging interface
 */
const E2EEChatView = ({ username, targetUser, apiBaseUrl, fetchWithAuth, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [sharedSecret, setSharedSecret] = useState(null);
    const [e2eeReady, setE2eeReady] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        initializeE2EE();
        fetchEncryptedMessages();
    }, [targetUser]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const initializeE2EE = async () => {
        try {
            // Get my private key
            const myPrivateKey = localStorage.getItem(`e2ee_identity_private_${username}`);
            if (!myPrivateKey) {
                toast.error('❌ E2EE anahtarlarınız bulunamadı! Lütfen E2EE ayarlarından kurulum yapın.');
                return;
            }

            // Fetch target user's public key bundle
            const response = await fetchWithAuth(
                `${apiBaseUrl}/e2ee/pre-key-bundle/${targetUser}/`
            );
            const bundle = await response.json();

            // Derive shared secret using ECDH
            const secret = await deriveSharedSecret(myPrivateKey, bundle.identityPublicKey);
            setSharedSecret(secret);
            setE2eeReady(true);

            console.log('✅ E2EE initialized with', targetUser);
        } catch (err) {
            console.error('E2EE initialization error:', err);
            toast.error('❌ E2EE başlatılamadı!');
        }
    };

    const fetchEncryptedMessages = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/e2ee/encrypted-messages/${targetUser}/`
            );
            const data = await response.json();

            setMessages(data.messages || []);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch encrypted messages:', err);
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !e2eeReady || sending) return;

        setSending(true);
        try {
            // Encrypt message
            const encrypted = await encryptMessage(newMessage, sharedSecret);

            // Send encrypted message to server
            const response = await fetchWithAuth(
                `${apiBaseUrl}/e2ee/send-encrypted-message/`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        recipient: targetUser,
                        ciphertext: encrypted.ciphertext,
                        iv: encrypted.iv,
                        timestamp: new Date().toISOString()
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();

                // Add to local messages
                setMessages(prev => [...prev, {
                    id: data.id,
                    sender: username,
                    recipient: targetUser,
                    plaintext: newMessage, // Store decrypted locally for display
                    timestamp: new Date().toISOString(),
                    encrypted: true
                }]);

                setNewMessage('');
                toast.success('🔐 Şifreli mesaj gönderildi!');
            } else {
                throw new Error('Failed to send encrypted message');
            }
        } catch (err) {
            console.error('Send encrypted message error:', err);
            toast.error('❌ Mesaj gönderilemedi!');
        } finally {
            setSending(false);
        }
    };

    const decryptAndRenderMessage = async (message) => {
        if (message.plaintext) {
            return message.plaintext; // Already decrypted
        }

        try {
            const plaintext = await decryptMessage(
                message.ciphertext,
                message.iv,
                sharedSecret
            );
            return plaintext;
        } catch (err) {
            console.error('Decryption error:', err);
            return '[Şifre çözülemedi]';
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <FaLock size={32} />
                    <p>Şifreli mesajlar yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!e2eeReady) {
        return (
            <div style={styles.container}>
                <div style={styles.error}>
                    <FaExclamationTriangle size={48} color="#ed4245" />
                    <h3>E2EE Başlatılamadı</h3>
                    <p>Şifreli mesajlaşma için gerekli anahtarlar bulunamadı.</p>
                    <button onClick={onClose} style={styles.closeBtn}>
                        Kapat
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaShieldAlt size={24} color="#43b581" />
                    <div>
                        <h3 style={styles.headerTitle}>
                            {targetUser}
                        </h3>
                        <span style={styles.headerSubtitle}>
                            <FaLock size={12} /> Uçtan Uca Şifreli
                        </span>
                    </div>
                </div>
                <button onClick={onClose} style={styles.closeButton}>
                    ×
                </button>
            </div>

            {/* E2EE Status Banner */}
            <div style={styles.banner}>
                <FaCheckCircle color="#43b581" />
                <span>
                    Mesajlar uçtan uca şifrelenmiştir. Sadece siz ve {targetUser} okuyabilir.
                </span>
            </div>

            {/* Messages */}
            <div style={styles.messages}>
                {messages.length === 0 ? (
                    <div style={styles.emptyState}>
                        <FaLock size={48} color="#5865f2" />
                        <p>Henüz şifreli mesaj yok</p>
                        <p style={styles.emptyHint}>
                            İlk şifreli mesajınızı gönderin!
                        </p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <MessageBubble
                            key={msg.id || index}
                            message={msg}
                            isOwn={msg.sender === username}
                            decryptFn={decryptAndRenderMessage}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} style={styles.inputForm}>
                <div style={styles.inputContainer}>
                    <FaLock size={16} color="#43b581" />
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Şifreli mesaj yaz..."
                        style={styles.input}
                        disabled={sending}
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || sending}
                        style={styles.sendButton}
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </form>
        </div>
    );
};

const MessageBubble = ({ message, isOwn, decryptFn }) => {
    const [plaintext, setPlaintext] = useState(message.plaintext || '');
    const [decrypting, setDecrypting] = useState(!message.plaintext);

    useEffect(() => {
        if (!message.plaintext && message.ciphertext) {
            decryptFn(message).then(text => {
                setPlaintext(text);
                setDecrypting(false);
            });
        }
    }, [message]);

    return (
        <div style={{
            ...styles.messageBubble,
            alignSelf: isOwn ? 'flex-end' : 'flex-start',
            backgroundColor: isOwn ? '#5865f2' : '#40444b',
        }}>
            {decrypting ? (
                <span style={styles.decryptingText}>🔓 Şifre çözülüyor...</span>
            ) : (
                <>
                    <div style={styles.messageText}>{plaintext}</div>
                    <div style={styles.messageTime}>
                        <FaLock size={10} />
                        {new Date(message.timestamp).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#36393f',
        color: '#dcddde',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        backgroundColor: '#202225',
        borderBottom: '2px solid #43b581',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    headerTitle: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: '12px',
        color: '#43b581',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#dcddde',
        fontSize: '32px',
        cursor: 'pointer',
        padding: '4px 12px',
    },
    banner: {
        backgroundColor: '#43b58120',
        border: '1px solid #43b581',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        color: '#43b581',
    },
    messages: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    emptyState: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#72767d',
        gap: '8px',
    },
    emptyHint: {
        fontSize: '14px',
        marginTop: '8px',
    },
    messageBubble: {
        maxWidth: '70%',
        padding: '12px 16px',
        borderRadius: '12px',
        wordWrap: 'break-word',
    },
    messageText: {
        fontSize: '14px',
        lineHeight: '1.4',
    },
    messageTime: {
        fontSize: '11px',
        marginTop: '6px',
        opacity: 0.7,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    decryptingText: {
        fontSize: '13px',
        fontStyle: 'italic',
        opacity: 0.7,
    },
    inputForm: {
        padding: '16px 20px',
        backgroundColor: '#202225',
        borderTop: '1px solid #40444b',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#40444b',
        borderRadius: '8px',
        padding: '8px 12px',
    },
    input: {
        flex: 1,
        background: 'none',
        border: 'none',
        outline: 'none',
        color: '#dcddde',
        fontSize: '14px',
        padding: '8px',
    },
    sendButton: {
        background: '#5865f2',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 14px',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.2s',
    },
    loading: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        color: '#72767d',
    },
    error: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '40px',
        textAlign: 'center',
    },
    closeBtn: {
        marginTop: '16px',
        padding: '10px 24px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    }
};

export default E2EEChatView;
