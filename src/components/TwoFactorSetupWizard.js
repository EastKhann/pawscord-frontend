import { useState, useEffect } from 'react';
import { FaTimes, FaShieldAlt, FaQrcode, FaKey, FaCopy } from 'react-icons/fa';
import { toast } from '../utils/toast';

const TwoFactorSetupWizard = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const [step, setStep] = useState(1); // 1: intro, 2: qr, 3: verify, 4: backup
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [backupCodes, setBackupCodes] = useState([]);
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);

    const startSetup = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/enable/`, {
                method: 'POST'
            });
            const data = await response.json();
            setQrCode(data.qr_code);
            setSecret(data.secret);
            setStep(2);
            toast.success('2FA setup initiated');
        } catch (error) {
            toast.error('Failed to start 2FA setup');
        } finally {
            setLoading(false);
        }
    };

    const verifyAndComplete = async () => {
        if (!verificationCode || verificationCode.length !== 6) {
            toast.error('Please enter a 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/auth/2fa/verify-setup/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: verificationCode })
            });
            const data = await response.json();

            if (data.success) {
                setBackupCodes(data.backup_codes || []);
                setStep(4);
                toast.success('2FA enabled successfully!');
            } else {
                toast.error('Invalid verification code');
            }
        } catch (error) {
            toast.error('Failed to verify code');
        } finally {
            setLoading(false);
        }
    };

    const copyBackupCodes = () => {
        navigator.clipboard.writeText(backupCodes.join('\n'));
        toast.success('Backup codes copied to clipboard');
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaShieldAlt style={{ marginRight: '10px', color: '#43b581' }} />
                        <h2 style={styles.title}>Two-Factor Authentication Setup</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {step === 1 && (
                        <div style={styles.stepContainer}>
                            <div style={styles.stepIcon}>🔒</div>
                            <h3 style={styles.stepTitle}>Enhance Your Account Security</h3>
                            <p style={styles.stepDescription}>
                                Two-factor authentication adds an extra layer of security to your account.
                                You'll need your phone's authentication app to complete setup.
                            </p>
                            <div style={styles.requirements}>
                                <div style={styles.requirementItem}>
                                    ✓ Install an authenticator app (Google Authenticator, Authy, etc.)
                                </div>
                                <div style={styles.requirementItem}>
                                    ✓ Have your phone ready to scan a QR code
                                </div>
                                <div style={styles.requirementItem}>
                                    ✓ Save backup codes in a secure location
                                </div>
                            </div>
                            <button onClick={startSetup} style={styles.primaryButton} disabled={loading}>
                                {loading ? 'Starting...' : 'Begin Setup'}
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div style={styles.stepContainer}>
                            <div style={styles.stepIcon}>📱</div>
                            <h3 style={styles.stepTitle}>Scan QR Code</h3>
                            <p style={styles.stepDescription}>
                                Open your authenticator app and scan this QR code.
                            </p>
                            {qrCode && (
                                <div style={styles.qrContainer}>
                                    <img src={qrCode} alt="QR Code" style={styles.qrCode} />
                                </div>
                            )}
                            <div style={styles.manualEntry}>
                                <div style={styles.manualLabel}>Or enter this code manually:</div>
                                <div style={styles.secretCode}>{secret}</div>
                            </div>
                            <button onClick={() => setStep(3)} style={styles.primaryButton}>
                                Next Step
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div style={styles.stepContainer}>
                            <div style={styles.stepIcon}>🔑</div>
                            <h3 style={styles.stepTitle}>Verify Setup</h3>
                            <p style={styles.stepDescription}>
                                Enter the 6-digit code from your authenticator app to complete setup.
                            </p>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="000000"
                                style={styles.codeInput}
                                maxLength={6}
                            />
                            <button onClick={verifyAndComplete} style={styles.primaryButton} disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify & Enable 2FA'}
                            </button>
                        </div>
                    )}

                    {step === 4 && (
                        <div style={styles.stepContainer}>
                            <div style={styles.stepIcon}>✅</div>
                            <h3 style={styles.stepTitle}>Setup Complete!</h3>
                            <p style={styles.stepDescription}>
                                Save these backup codes in a secure location. You can use them if you lose access to your authenticator app.
                            </p>
                            <div style={styles.backupCodesContainer}>
                                {backupCodes.map((code, idx) => (
                                    <div key={idx} style={styles.backupCode}>{code}</div>
                                ))}
                            </div>
                            <button onClick={copyBackupCodes} style={styles.copyButton}>
                                <FaCopy style={{ marginRight: '8px' }} />
                                Copy Backup Codes
                            </button>
                            <button onClick={onClose} style={styles.primaryButton}>
                                Done
                            </button>
                        </div>
                    )}
                </div>
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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '550px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '18px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    content: {
        padding: '32px',
        overflowY: 'auto',
        flex: 1,
    },
    stepContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },
    stepIcon: {
        fontSize: '64px',
    },
    stepTitle: {
        margin: 0,
        fontSize: '22px',
        color: '#ffffff',
        textAlign: 'center',
    },
    stepDescription: {
        margin: 0,
        fontSize: '14px',
        color: '#dcddde',
        textAlign: 'center',
        lineHeight: '1.5',
    },
    requirements: {
        width: '100%',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    requirementItem: {
        fontSize: '14px',
        color: '#dcddde',
    },
    qrContainer: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '16px',
    },
    qrCode: {
        width: '200px',
        height: '200px',
    },
    manualEntry: {
        width: '100%',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
    },
    manualLabel: {
        fontSize: '12px',
        color: '#99aab5',
        marginBottom: '8px',
    },
    secretCode: {
        fontSize: '16px',
        fontFamily: 'monospace',
        color: '#5865f2',
        fontWeight: '600',
        letterSpacing: '2px',
    },
    codeInput: {
        width: '200px',
        padding: '16px',
        fontSize: '24px',
        textAlign: 'center',
        backgroundColor: '#2c2f33',
        border: '2px solid #5865f2',
        borderRadius: '8px',
        color: '#ffffff',
        fontFamily: 'monospace',
        letterSpacing: '8px',
    },
    backupCodesContainer: {
        width: '100%',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
    },
    backupCode: {
        fontSize: '14px',
        fontFamily: 'monospace',
        color: '#dcddde',
        backgroundColor: '#1e1e1e',
        padding: '8px',
        borderRadius: '4px',
        textAlign: 'center',
    },
    primaryButton: {
        padding: '12px 32px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
    },
    copyButton: {
        padding: '10px 24px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
    },
};

export default TwoFactorSetupWizard;
