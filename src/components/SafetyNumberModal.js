// frontend/src/components/SafetyNumberModal.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaShieldAlt, FaCheck, FaTimes, FaQrcode } from 'react-icons/fa';
import { generateSafetyNumber } from '../utils/e2ee';
import { QRCodeSVG as QRCode } from 'qrcode.react';

/**
 * Safety Number Verification Modal
 * Like WhatsApp/Signal - verify identity keys
 */
const SafetyNumberModal = ({
    username,
    targetUser,
    apiBaseUrl,
    fetchWithAuth,
    onClose
}) => {
    const [safetyNumber, setSafetyNumber] = useState(null);
    const [verified, setVerified] = useState(false);
    const [verifiedByMe, setVerifiedByMe] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        fetchSafetyNumber();
    }, [targetUser]);

    const fetchSafetyNumber = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/e2ee/safety-number/${targetUser}/`
            );
            const data = await response.json();

            setSafetyNumber(data.safetyNumber);
            setVerified(data.verified);
            setVerifiedByMe(data.verifiedByMe);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch safety number:', err);
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/e2ee/verify-safety-number/${targetUser}/`,
                { method: 'POST' }
            );
            const data = await response.json();

            setVerifiedByMe(true);
            setVerified(data.bothVerified);

            toast.success(`✅ Safety number doğrulandı!${data.bothVerified ? '\n\nHer iki taraf da doğruladı! 🎉' : ''}`);
        } catch (err) {
            console.error('Failed to verify safety number:', err);
            toast.error('❌ Doğrulama başarısız!');
        }
    };

    if (loading) {
        return (
            <div style={styles.overlay} onClick={onClose}>
                <div style={styles.modal} onClick={e => e.stopPropagation()}>
                    <p style={styles.loading}>Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <FaShieldAlt size={32} color={verified ? '#43b581' : '#faa61a'} />
                    <h2 style={styles.title}>Safety Number</h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.user}>
                    {targetUser}
                </div>

                {!showQR ? (
                    <>
                        <div style={styles.numberContainer}>
                            {safetyNumber?.split(' ').map((group, i) => (
                                <div key={i} style={styles.numberGroup}>
                                    {group}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowQR(true)}
                            style={styles.qrButton}
                        >
                            <FaQrcode /> QR Kodu Göster
                        </button>
                    </>
                ) : (
                    <>
                        <div style={styles.qrContainer}>
                            <QRCode value={safetyNumber || ''} size={200} />
                        </div>

                        <button
                            onClick={() => setShowQR(false)}
                            style={styles.qrButton}
                        >
                            Numarayı Göster
                        </button>
                    </>
                )}

                <div style={styles.statusContainer}>
                    {verified ? (
                        <div style={styles.statusVerified}>
                            <FaCheck size={20} />
                            <span>Her iki taraf da doğruladı! ✅</span>
                        </div>
                    ) : verifiedByMe ? (
                        <div style={styles.statusPartial}>
                            <FaCheck size={20} />
                            <span>Siz doğruladınız. {targetUser} henüz doğrulamadı.</span>
                        </div>
                    ) : (
                        <div style={styles.statusUnverified}>
                            <FaTimes size={20} />
                            <span>Henüz doğrulanmadı</span>
                        </div>
                    )}
                </div>

                <div style={styles.info}>
                    <h3>Safety Number Nedir?</h3>
                    <p>
                        Safety number, sizin ve {targetUser}'in şifreleme anahtarlarının
                        parmak izidir (fingerprint). Bu numarayı karşılaştırarak identity
                        key'lerini doğrulayabilirsiniz.
                    </p>
                    <h3>Nasıl Doğrulanır?</h3>
                    <ol>
                        <li>{targetUser} ile yüz yüze görüşün veya güvenilir bir kanal kullanın</li>
                        <li>Her ikiniz de safety number'ı açın</li>
                        <li>Numaraları karşılaştırın (aynı olmalı!)</li>
                        <li>Eşleşiyorsa "Doğrula" butonuna basın</li>
                    </ol>
                </div>

                {!verifiedByMe && (
                    <button onClick={handleVerify} style={styles.verifyButton}>
                        <FaCheck /> Bu Numarayı Doğrula
                    </button>
                )}
            </div>
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
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        position: 'relative'
    },
    title: {
        color: '#fff',
        fontSize: '20px',
        fontWeight: '600',
        flex: 1
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '4px',
        fontSize: '20px'
    },
    user: {
        color: '#5865f2',
        fontSize: '18px',
        fontWeight: '500',
        marginBottom: '24px',
        textAlign: 'center'
    },
    numberContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '24px'
    },
    numberGroup: {
        backgroundColor: '#1e1f22',
        color: '#fff',
        padding: '12px',
        borderRadius: '4px',
        textAlign: 'center',
        fontSize: '18px',
        fontFamily: 'monospace',
        letterSpacing: '2px'
    },
    qrContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '24px',
        padding: '16px',
        backgroundColor: '#fff',
        borderRadius: '8px'
    },
    qrButton: {
        backgroundColor: '#4e5058',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '0 auto 24px'
    },
    statusContainer: {
        marginBottom: '24px'
    },
    statusVerified: {
        backgroundColor: '#43b581',
        color: '#fff',
        padding: '12px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'center'
    },
    statusPartial: {
        backgroundColor: '#faa61a',
        color: '#000',
        padding: '12px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'center'
    },
    statusUnverified: {
        backgroundColor: '#ed4245',
        color: '#fff',
        padding: '12px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'center'
    },
    info: {
        backgroundColor: '#1e1f22',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '24px',
        color: '#b9bbbe',
        fontSize: '14px'
    },
    verifyButton: {
        backgroundColor: '#43b581',
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
        gap: '8px'
    },
    loading: {
        color: '#b9bbbe',
        textAlign: 'center',
        padding: '32px'
    }
};

export default SafetyNumberModal;



