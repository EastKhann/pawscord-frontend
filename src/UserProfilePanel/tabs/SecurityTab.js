/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import profileStyles from '../styles';

// -- dynamic style helpers (pass 2) --

const _st1117 = { ...profileStyles.button('primary'), marginTop: '12px' };

const _st1118 = { ...profileStyles.button('danger'), marginTop: '16px' };

// -- extracted inline style constants --

const _st1 = { color: '#b5bac1', marginBottom: '16px' };

const _st2 = { width: '200px', height: '200px' };

const _st3 = { color: '#b5bac1', fontSize: '12px', marginTop: '12px' };

const _st4 = { background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px' };

const _st5 = { marginTop: '24px' };

const _st6 = { color: '#fff', marginBottom: '12px' };

const _st7 = { color: '#f0b232', fontSize: '13px', marginBottom: '12px' };

const _st8 = { color: '#23a559', marginBottom: '16px' };

const _st9 = {
    background: 'rgba(88, 101, 242, 0.1)',

    border: '1px solid rgba(88, 101, 242, 0.3)',

    borderRadius: '8px',

    padding: '12px 16px',

    marginBottom: '16px',

    fontSize: '14px',

    color: '#b5bac1',
};

const _st10 = { color: '#5865f2' };

const _st11 = { color: '#80848e', fontSize: '11px', marginTop: '4px', display: 'block' };

const _st12 = { color: '#b5bac1' };

const _st13 = { color: '#fff', margin: 0, fontWeight: '600' };

const SecurityTab = ({
    backupCodes: rawBC,

    disable2FA,

    enable2FA,

    handlePasswordChange,

    hasPassword,

    loading,

    passwordData,

    revokeAllSessions,

    revokeSession,

    sessions: rawSessions,

    setPasswordData,

    setVerificationCode,

    twoFactorData,

    twoFactorEnabled,

    user,

    verificationCode: rawVC,

    verify2FASetup,
}) => {
    const { t } = useTranslation();
    const backupCodes = rawBC || [];

    const sessions = rawSessions || [];

    const verificationCode = rawVC || '';

    const styles = profileStyles;

    const isLoading = loading ? Object.values(loading).some(Boolean) : false;

    const [error, setError] = useState(null);

    return (
        <>
            <div style={styles.card}>
                <h3 style={styles.sectionTitle}>🔒 Two-Factor Authentication (2FA)</h3>

                {!twoFactorEnabled && !twoFactorData && (
                    <div>
                        <p style={_st1}>{t('security.twoFactorDescription')}</p>

                        <button
                            style={styles.button('primary')}
                            aria-label="enable2FA"
                            onClick={enable2FA}
                            disabled={loading.enable2fa}
                        >
                            {loading.enable2fa
                                ? t('security.enabling')
                                : t('security.enableTwoFactor')}
                        </button>
                    </div>
                )}

                {twoFactorData && (
                    <div>
                        <p style={_st1}>{t('security.scanQRCode')}</p>

                        <div style={styles.qrCode}>
                            {twoFactorData.qr_code ? (
                                <img src={twoFactorData.qr_code} alt="QR Code" style={_st2} />
                            ) : (
                                <QRCodeSVG
                                    value={`otpauth://totp/Pawscord:${user.email}?secret=${twoFactorData.secret}&issuer=Pawscord`}
                                    size={200}
                                />
                            )}

                            <p style={_st3}>
                                {t('security.manualCode')}{' '}
                                <code style={_st4}>{twoFactorData.secret}</code>
                            </p>
                        </div>

                        <div style={_st5}>
                            <label style={styles.label}>Doğrulama Kodu</label>

                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="6 haneli kod"
                                style={styles.input}
                                maxLength={6}
                                aria-label="Doğrulama Kodu"
                            />

                            <button
                                style={_st1117}
                                aria-label="verify2FASetup"
                                onClick={verify2FASetup}
                                disabled={loading.verify2fa || verificationCode.length !== 6}
                            >
                                {loading.verify2fa
                                    ? t('security.verifying')
                                    : t('security.verifyAndEnable')}
                            </button>
                        </div>

                        {backupCodes.length > 0 && (
                            <div style={_st5}>
                                <h4 style={_st6}>{t('security.backupCodes')}</h4>

                                <p style={_st7}>{t('security.backupCodesWarning')}</p>

                                <div style={styles.backupCodesGrid}>
                                    {backupCodes.map((code, idx) => (
                                        <div key={`item-${idx}`} style={styles.backupCode}>
                                            {code}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {twoFactorEnabled && (
                    <div>
                        <p style={_st8}>{t('security.twoFactorActive')}</p>

                        <button
                            style={styles.button('danger')}
                            aria-label="2FA devre dışı bırak"
                            onClick={disable2FA}
                            disabled={loading.disable2fa}
                        >
                            {loading.disable2fa
                                ? t('security.disabling')
                                : t('security.disableTwoFactor')}
                        </button>
                    </div>
                )}
            </div>

            <div style={styles.card}>
                <h3 style={styles.sectionTitle}>
                    🔑 {hasPassword ? t('security.changePassword') : t('security.setPassword')}
                </h3>

                {/* 🆕 Google/OAuth kullanıcıları için bilgilendirme */}

                {!hasPassword && (
                    <div style={_st9}>
                        <strong style={_st10}>{t('security.info')}:</strong>{' '}
                        {t('security.googlePasswordInfo')}
                    </div>
                )}

                <form onSubmit={handlePasswordChange}>
                    {/* 🆕 Eski şifre alanı sadece şifresi olan kullanıcılara göster */}

                    {hasPassword && (
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>{t('security.oldPassword')}</label>

                            <input
                                type="password"
                                value={passwordData.old_password}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        old_password: e.target.value,
                                    })
                                }
                                style={styles.input}
                                required={hasPassword}
                                aria-label="Eski Parola"
                            />
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{t('security.newPassword')}</label>

                        <input
                            type="password"
                            value={passwordData.new_password}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, new_password: e.target.value })
                            }
                            style={styles.input}
                            required
                            minLength={12}
                            aria-label="Yeni Parola"
                        />

                        <small style={_st11}>{t('security.passwordRequirements')}</small>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{t('security.confirmPassword')}</label>

                        <input
                            type="password"
                            value={passwordData.confirm_password}
                            onChange={(e) =>
                                setPasswordData({
                                    ...passwordData,
                                    confirm_password: e.target.value,
                                })
                            }
                            style={styles.input}
                            required
                            minLength={12}
                            aria-label="Parolayı Onayla"
                        />

                        {passwordData.confirm_password.length > 0 &&
                            passwordData.new_password !== passwordData.confirm_password && (
                                <div
                                    style={{ color: '#f23f42', fontSize: '12px', marginTop: '4px' }}
                                >
                                    {t('security.passwordMismatch', 'Parolalar eşleşmiyor')}
                                </div>
                            )}
                    </div>

                    <button
                        aria-label="action-button"
                        type="submit"
                        style={styles.button('primary')}
                        disabled={
                            loading.changePassword ||
                            (passwordData.confirm_password.length > 0 &&
                                passwordData.new_password !== passwordData.confirm_password)
                        }
                    >
                        {loading.changePassword
                            ? t('common.saving')
                            : hasPassword
                              ? t('security.changePassword')
                              : t('security.setPassword')}
                    </button>
                </form>
            </div>

            <div style={styles.card}>
                <h3 style={styles.sectionTitle}>🖥 Aktif Oturumlar</h3>

                {sessions.length === 0 && <p style={_st12}>{t('session.noActiveSessions')}</p>}

                {sessions.map((session) => (
                    <div key={session.id} style={styles.sessionCard}>
                        <div>
                            <p style={_st13}>{session.device_name || t('session.unknownDevice')}</p>

                            <p style={styles.settingRowDesc}>
                                IP: {session.ip_address} •{' '}
                                {new Date(session.created_at).toLocaleDateString('tr-TR')}
                            </p>
                        </div>

                        <button
                            style={styles.button('danger')}
                            aria-label="action-button"
                            onClick={() => revokeSession(session.id)}
                        >
                            {t('session.end')}
                        </button>
                    </div>
                ))}

                {sessions.length > 0 && (
                    <button
                        style={_st1118}
                        aria-label="Tüm oturumları sonlandır"
                        onClick={revokeAllSessions}
                    >
                        🔴 {t('session.endAll')}
                    </button>
                )}
            </div>
        </>
    );
};

SecurityTab.propTypes = {
    backupCodes: PropTypes.array,

    disable2FA: PropTypes.func,

    enable2FA: PropTypes.func,

    handlePasswordChange: PropTypes.func,

    hasPassword: PropTypes.bool,

    loading: PropTypes.object,

    passwordData: PropTypes.object,

    revokeAllSessions: PropTypes.func,

    revokeSession: PropTypes.func,

    sessions: PropTypes.array,

    setPasswordData: PropTypes.func,

    setVerificationCode: PropTypes.func,

    twoFactorData: PropTypes.object,

    twoFactorEnabled: PropTypes.bool,

    user: PropTypes.object,

    verificationCode: PropTypes.string,

    verify2FASetup: PropTypes.func,
};

export default SecurityTab;
