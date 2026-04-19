/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
// frontend/src/components/E2EESettingsPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import {
    FaLock,
    FaKey,
    FaSync,
    FaTrash,
    FaShieldAlt,
    FaCheckCircle,
    FaClock,
    FaExclamationTriangle,
} from 'react-icons/fa';
import SafetyNumberModal from './SafetyNumberModal';
import confirmDialog from '../../utils/confirmDialog';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

/**
 * E2EE Settings Panel
 * Manage encryption keys, rotate keys, view safety numbers
 */
const E2EESettingsPanel = ({ username, apiBaseUrl, fetchWithAuth }) => {
    const { t } = useTranslation();
    const [e2eeEnabled, setE2eeEnabled] = useState(false);
    const [setupDate, setSetupDate] = useState(null);
    const [keyRotationDate, setKeyRotationDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        encryptedMessagesCount: 0,
        trustedContacts: 0,
        lastKeyRotation: null,
    });
    const [showSafetyModal, setShowSafetyModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        loadE2EEStatus();
    }, []);

    const loadE2EEStatus = () => {
        const enabled = localStorage.getItem('e2ee_enabled') === 'true';
        const setup = localStorage.getItem('e2ee_setup_date');
        const rotation = localStorage.getItem('e2ee_last_rotation');

        setE2eeEnabled(enabled);
        setSetupDate(setup ? new Date(setup) : null);
        setKeyRotationDate(rotation ? new Date(rotation) : null);
    };

    const handleRotateKeys = async () => {
        if (
            !(await confirmDialog(
                '🔑 Are you sure you want to regenerate keys?\n\nThis will:\n• Generate new identity keys\n• Make old encrypted messages unreadable\n• All contacts will need to re-verify security'
            ))
        ) {
            return;
        }

        setLoading(true);
        try {
            const {
                generateIdentityKeyPair,
                generateSignedPreKeyPair,
                generateOneTimePreKeys,
                storePrivateKeys,
            } = await import('../../utils/e2ee');

            // Generate new keys
            toast.info(t('ui.yeni_anahtarlar_olusturuluyor'));
            const identityKeyPair = await generateIdentityKeyPair();
            const signedPreKey = await generateSignedPreKeyPair(
                Date.now(),
                identityKeyPair.privateKey
            );
            const oneTimePreKeys = await generateOneTimePreKeys(100);

            // Store new private keys
            await storePrivateKeys(username, identityKeyPair.privateKey, signedPreKey.privateKey);

            // Upload new public keys
            toast.info(t('ui.serverya_yukleniyor'));
            const response = await fetchWithAuth(`${apiBaseUrl}/e2ee/rotate-keys/`, {
                method: 'POST',
                body: JSON.stringify({
                    identityPublicKey: identityKeyPair.publicKey,
                    signedPreKeyId: signedPreKey.keyId,
                    signedPreKeyPublic: signedPreKey.publicKey,
                    signedPreKeySignature: signedPreKey.signature,
                    oneTimePreKeys: oneTimePreKeys.map((k) => ({
                        keyId: k.keyId,
                        publicKey: k.publicKey,
                    })),
                }),
            });

            if (response.ok) {
                const now = new Date().toISOString();
                localStorage.setItem('e2ee_last_rotation', now);
                setKeyRotationDate(new Date(now));
                toast.success(t('e2ee.keysRenewed'));
            } else {
                throw new Error('Key rotation failed');
            }
        } catch (err) {
            logger.error('Key rotation error:', err);
            toast.error(t('e2ee.keyRenewalFailed'));
        } finally {
            setLoading(false);
        }
    };

    const handleDisableE2EE = async () => {
        if (
            !(await confirmDialog(
                "⚠️ E2EE'yi devre dı bırakmak istediğinizden emin misiniz?\n\nBu işlem:\n• Tüm şifreli mesajlarınızı siler\n• Anahtarlarınızı kaldırır\n• Geri alınamaz!"
            ))
        ) {
            return;
        }

        setLoading(true);
        try {
            // Clear local keys
            localStorage.removeItem('e2ee_enabled');
            localStorage.removeItem('e2ee_setup_date');
            localStorage.removeItem('e2ee_last_rotation');
            localStorage.removeItem(`e2ee_identity_private_${username}`);
            localStorage.removeItem(`e2ee_signed_pre_key_private_${username}`);

            setE2eeEnabled(false);
            toast.success(t('ui.e2ee_devre_disi_birakildi'));
        } catch (err) {
            logger.error('E2EE disable error:', err);
            toast.error(t('e2ee.operationFailed'));
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return 'Hiçbir zaman';
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getDaysSinceRotation = () => {
        if (!keyRotationDate) {
            if (!setupDate) return null;
            return Math.floor((new Date() - setupDate) / (1000 * 60 * 60 * 24));
        }
        return Math.floor((new Date() - keyRotationDate) / (1000 * 60 * 60 * 24));
    };

    const daysSince = getDaysSinceRotation();
    const needsRotation = daysSince && daysSince > 90; // Recommend rotation every 90 days

    if (!e2eeEnabled) {
        return (
            <div style={styles.container}>
                <div style={styles.header}>
                    <FaLock size={24} />
                    <h3 style={styles.title}>End-to-End Encryption</h3>
                </div>

                <div style={styles.disabledState}>
                    <FaExclamationTriangle size={48} color="#f0b232" />
                    <h4>E2EE Devre Dışı</h4>
                    <p>
                        Şu anda E2EE kullanmıyorsunuz. Mesajlarınızı şifrelemek için ayarlardan
                        etkinleştirin.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <FaLock size={24} />
                <h3 style={styles.title}>E2EE Ayarları</h3>
            </div>

            {/* Status Card */}
            <div style={styles.statusCard}>
                <div style={styles.statusHeader}>
                    <FaCheckCircle size={32} color="#23a559" />
                    <span style={styles.statusText}>E2EE Active</span>
                </div>
                <div style={styles.statusInfo}>
                    <div style={styles.infoRow}>
                        <FaClock />
                        <span>Kurulum: {formatDate(setupDate)}</span>
                    </div>
                    {keyRotationDate && (
                        <div style={styles.infoRow}>
                            <FaSync />
                            <span>Son Refreshme: {formatDate(keyRotationDate)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Key Rotation Warning */}
            {needsRotation && (
                <div style={styles.warningCard}>
                    <FaExclamationTriangle />
                    <div>
                        <strong>Anahtar Refreshme Önerilir</strong>
                        <p>
                            Son anahtar yenilemeden {daysSince} day geçti. Security for
                            anahtarlarınızı yenileyin.
                        </p>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div style={styles.actions}>
                <button
                    aria-label="handle Rotate Keys"
                    onClick={handleRotateKeys}
                    disabled={loading}
                    style={styles.rotateButton}
                >
                    <FaSync />
                    {loading ? 'Refreshniyor...' : t('ui.anahtarlari_refresh')}
                </button>

                <button
                    aria-label="handle Disable E2 E E"
                    onClick={handleDisableE2EE}
                    disabled={loading}
                    style={styles.disableButton}
                >
                    <FaTrash />
                    E2EE\'yi Devre Dı Bırak
                </button>
            </div>

            {/* Info Section */}
            <div style={styles.infoSection}>
                <h4 style={styles.infoTitle}>
                    <FaShieldAlt />
                    E2EE About
                </h4>
                <ul style={styles.infoList}>
                    <li>✅ Mesajlarınız uçtan uca şifrelenir</li>
                    <li>✅ Sadece siz ve karşınızdaki kişi okuyabilir</li>
                    <li>✅ Sunucu bile mesajları göremez</li>
                    <li>⚠️ Anahtarlarınızı if you lose your keys messages become unreadable</li>
                    <li>🔑 90 dayde bir anahtar yenileme önerilir</li>
                </ul>
            </div>

            {/* Safety Number Modal */}
            {showSafetyModal && (
                <SafetyNumberModal
                    username={username}
                    targetUser={selectedUser}
                    apiBaseUrl={apiBaseUrl}
                    fetchWithAuth={fetchWithAuth}
                    onClose={() => setShowSafetyModal(false)}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        color: '#dbdee1',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '2px solid #182135',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        fontWeight: 'bold',
    },
    statusCard: {
        backgroundColor: '#0d0e10',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '16px',
        border: '2px solid #23a559',
    },
    statusHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
    },
    statusText: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#23a559',
    },
    statusInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    infoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#b5bac1',
    },
    warningCard: {
        backgroundColor: '#f0b23220',
        border: '2px solid #f0b232',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        color: '#f0b232',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '24px',
    },
    rotateButton: {
        padding: '12px 20px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'background-color 0.2s',
    },
    disableButton: {
        padding: '12px 20px',
        backgroundColor: '#f23f42',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'background-color 0.2s',
    },
    disabledState: {
        textAlign: 'center',
        padding: '40px 20px',
        color: '#b5bac1',
    },
    infoSection: {
        backgroundColor: '#0d0e10',
        borderRadius: '8px',
        padding: '20px',
    },
    infoTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        fontSize: '16px',
    },
    infoList: {
        margin: 0,
        paddingLeft: '20px',
        color: '#b5bac1',
        fontSize: '14px',
        lineHeight: '1.8',
    },
};

E2EESettingsPanel.propTypes = {
    username: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default E2EESettingsPanel;
