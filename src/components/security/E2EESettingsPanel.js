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
            !(await confirmDialog(t('e2ee.disableConfirm', 'Are you sure you want to disable E2EE?')))
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
        if (!date) return t('e2ee.never', 'Never');
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
                    <h4>{t('e2ee.disabled', 'E2EE Disabled')}</h4>
                    <p>
                        {t('e2ee.disabledDesc', 'You are not currently using E2EE. Enable it in settings to encrypt your messages.')}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <FaLock size={24} />
                <h3 style={styles.title}>{t('e2ee.settings', 'E2EE Settings')}</h3>
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
                        <span>{t('e2ee.setup', 'Setup:')} {formatDate(setupDate)}</span>
                    </div>
                    {keyRotationDate && (
                        <div style={styles.infoRow}>
                            <FaSync />
                            <span>{t('e2ee.lastRefresh', 'Last Refresh:')} {formatDate(keyRotationDate)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Key Rotation Warning */}
            {needsRotation && (
                <div style={styles.warningCard}>
                    <FaExclamationTriangle />
                    <div>
                        <strong>{t('e2ee.keyRefreshRecommended', 'Key Refresh Recommended')}</strong>
                        <p>
                            {t('e2ee.keyRefreshDesc', '{{days}} days have passed since last key rotation.').replace('{{days}}', daysSince)}
                        </p>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div style={styles.actions}>
                <button
                    aria-label={t('e2ee.rotateKeys', 'Rotate encryption keys')}
                    onClick={handleRotateKeys}
                    disabled={loading}
                    style={styles.rotateButton}
                >
                    <FaSync />
                    {loading ? t('e2ee.refreshing', 'Refreshing...') : t('ui.anahtarlari_refresh')}
                </button>

                <button
                    aria-label={t('e2ee.disable', 'Disable end-to-end encryption')}
                    onClick={handleDisableE2EE}
                    disabled={loading}
                    style={styles.disableButton}
                >
                    <FaTrash />
                    {t('e2ee.disableE2ee', "Disable E2EE")}
                </button>
            </div>

            {/* Info Section */}
            <div style={styles.infoSection}>
                <h4 style={styles.infoTitle}>
                    <FaShieldAlt />
                    E2EE About
                </h4>
                <ul style={styles.infoList}>
                    <li>{t('e2ee.activeFeature1', '✅ Your messages are end-to-end encrypted')}</li>
                    <li>{t('e2ee.activeFeature2', '✅ Only you and the other party can read them')}</li>
                    <li>{t('e2ee.activeFeature3', '✅ Even the server cannot see messages')}</li>
                    <li>{t('e2ee.activeWarning', '⚠️ If you lose your keys, messages become unreadable')}</li>
                    <li>{t('e2ee.rotationRecommended', '🔑 Key rotation every 90 days is recommended')}</li>
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
