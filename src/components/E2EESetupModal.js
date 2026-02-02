// frontend/src/components/E2EESetupModal.js
import React, { useState } from 'react';
import { FaLock, FaKey, FaCheck, FaSpinner } from 'react-icons/fa';
import {
    generateIdentityKeyPair,
    generateSignedPreKeyPair,
    generateOneTimePreKeys,
    storePrivateKeys
} from '../utils/e2ee';

/**
 * E2EE Setup Modal
 * Shown on first login - generates and uploads keys
 */
const E2EESetupModal = ({ username, apiBaseUrl, fetchWithAuth, onComplete }) => {
    const [step, setStep] = useState(1); // 1: Info, 2: Generating, 3: Uploading, 4: Complete
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);

    const setupE2EE = async () => {
        try {
            setStep(2);
            setProgress(10);

            // Step 1: Generate Identity Key Pair
            console.log('🔐 Generating identity key pair...');
            const identityKeyPair = await generateIdentityKeyPair();
            setProgress(30);

            // Step 2: Generate Signed Pre-Key
            console.log('🔑 Generating signed pre-key...');
            const signedPreKey = await generateSignedPreKeyPair(1, identityKeyPair.privateKey);
            setProgress(50);

            // Step 3: Generate One-Time Pre-Keys (100 keys)
            console.log('📦 Generating 100 one-time pre-keys...');
            const oneTimePreKeys = await generateOneTimePreKeys(100);
            setProgress(70);

            // Step 4: Store private keys locally (NEVER send to server!)
            console.log('💾 Storing private keys locally...');
            await storePrivateKeys(
                username,
                identityKeyPair.privateKey,
                signedPreKey.privateKey
            );
            setProgress(80);

            // Step 5: Upload public keys to server
            setStep(3);
            console.log('☁️ Uploading public keys to server...');
            const response = await fetchWithAuth(`${apiBaseUrl}/e2ee/upload-keys/`, {
                method: 'POST',
                body: JSON.stringify({
                    identityPublicKey: identityKeyPair.publicKey,
                    signedPreKeyId: signedPreKey.keyId,
                    signedPreKeyPublic: signedPreKey.publicKey,
                    signedPreKeySignature: signedPreKey.signature,
                    oneTimePreKeys: oneTimePreKeys.map(k => ({
                        keyId: k.keyId,
                        publicKey: k.publicKey
                    }))
                })
            });

            if (response.ok) {
                setProgress(100);
                setStep(4);
                console.log('✅ E2EE setup complete!');

                // Mark E2EE as enabled in local storage
                localStorage.setItem('e2ee_enabled', 'true');
                localStorage.setItem('e2ee_setup_date', new Date().toISOString());

                setTimeout(() => onComplete(), 2000);
            } else {
                throw new Error('Failed to upload keys');
            }

        } catch (err) {
            console.error('❌ E2EE setup error:', err);
            setError(err.message);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {step === 1 && (
                    <>
                        <div style={styles.icon}>
                            <FaLock size={64} color="#5865f2" />
                        </div>
                        <h2 style={styles.title}>End-to-End Encryption (E2EE)</h2>
                        <p style={styles.description}>
                            Mesajlarınızı tamamen güvenli hale getirin!
                        </p>
                        <div style={styles.features}>
                            <div style={styles.feature}>
                                <FaCheck color="#43b581" />
                                <span>Mesajlarınız sadece siz ve alıcı tarafından okunabilir</span>
                            </div>
                            <div style={styles.feature}>
                                <FaCheck color="#43b581" />
                                <span>Sunucu bile mesajlarınızı göremez</span>
                            </div>
                            <div style={styles.feature}>
                                <FaCheck color="#43b581" />
                                <span>Signal Protocol ile endüstri standardı güvenlik</span>
                            </div>
                            <div style={styles.feature}>
                                <FaCheck color="#43b581" />
                                <span>Perfect forward secrecy</span>
                            </div>
                        </div>
                        <button onClick={setupE2EE} style={styles.button}>
                            <FaKey /> E2EE'yi Etkinleştir
                        </button>
                        <button onClick={() => onComplete()} style={styles.skipButton}>
                            Şimdi Değil
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div style={styles.icon}>
                            <FaSpinner className="spin" size={64} color="#5865f2" />
                        </div>
                        <h2 style={styles.title}>Şifreleme Anahtarları Oluşturuluyor...</h2>
                        <div style={styles.progressBar}>
                            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                        </div>
                        <p style={styles.progressText}>{progress}%</p>
                        <p style={styles.infoText}>
                            🔐 Identity key, signed pre-key ve 100 one-time pre-key oluşturuluyor...
                        </p>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div style={styles.icon}>
                            <FaSpinner className="spin" size={64} color="#5865f2" />
                        </div>
                        <h2 style={styles.title}>Sunucuya Yükleniyor...</h2>
                        <div style={styles.progressBar}>
                            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                        </div>
                        <p style={styles.infoText}>
                            ☁️ Public keyler sunucuya yükleniyor (private keyler cihazınızda kalıyor!)
                        </p>
                    </>
                )}

                {step === 4 && (
                    <>
                        <div style={styles.icon}>
                            <FaCheck size={64} color="#43b581" />
                        </div>
                        <h2 style={styles.title}>E2EE Etkinleştirildi! ✅</h2>
                        <p style={styles.description}>
                            Artık mesajlarınız tamamen güvenli! 🔒
                        </p>
                        <div style={styles.securityInfo}>
                            <p>✅ Şifreleme anahtarları oluşturuldu</p>
                            <p>✅ Private keyler cihazınızda güvende</p>
                            <p>✅ Public keyler sunucuya yüklendi</p>
                            <p>✅ Hazırsınız!</p>
                        </div>
                    </>
                )}

                {error && (
                    <div style={styles.error}>
                        ❌ Hata: {error}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100000
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        padding: '32px',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center'
    },
    icon: {
        marginBottom: '24px'
    },
    title: {
        color: '#fff',
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '16px'
    },
    description: {
        color: '#b9bbbe',
        fontSize: '16px',
        marginBottom: '24px'
    },
    features: {
        textAlign: 'left',
        marginBottom: '24px'
    },
    feature: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#dcddde',
        marginBottom: '12px',
        fontSize: '14px'
    },
    button: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '12px'
    },
    skipButton: {
        backgroundColor: 'transparent',
        color: '#b9bbbe',
        border: 'none',
        padding: '8px',
        fontSize: '14px',
        cursor: 'pointer'
    },
    progressBar: {
        width: '100%',
        height: '8px',
        backgroundColor: '#1e1f22',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '12px'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#5865f2',
        transition: 'width 0.3s ease'
    },
    progressText: {
        color: '#5865f2',
        fontSize: '24px',
        fontWeight: '600',
        marginBottom: '16px'
    },
    infoText: {
        color: '#b9bbbe',
        fontSize: '14px'
    },
    securityInfo: {
        textAlign: 'left',
        color: '#43b581',
        fontSize: '14px'
    },
    error: {
        backgroundColor: '#ed4245',
        color: '#fff',
        padding: '12px',
        borderRadius: '4px',
        marginTop: '16px'
    }
};

export default E2EESetupModal;



