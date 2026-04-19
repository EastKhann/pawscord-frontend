import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import { authGet, authPost } from './profileApiUtils';
import logger from '../../utils/logger';

const useProfileSecurity = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState({});
    const [twoFactorData, setTwoFactorData] = useState(null);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [backupCodes, setBackupCodes] = useState([]);
    const [verificationCode, setVerificationCode] = useState('');
    const [sessions, setSessions] = useState([]);
    const [emailVerified, setEmailVerified] = useState(false);
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    });
    const [hasPassword, setHasPassword] = useState(true);

    const check2FAStatus = async () => {
        try {
            const response = await authGet('/api/2fa/methods/');
            const enabledMethods = response.data?.enabled || [];
            setTwoFactorEnabled(
                enabledMethods.includes('totp') ||
                    response.data?.totp_enabled ||
                    response.data?.is_enabled ||
                    false
            );
        } catch (err) {
            logger.error('2FA status check failed:', err);
        }
    };

    const enable2FA = async () => {
        try {
            setLoading((l) => ({ ...l, enable2fa: true }));
            const response = await authPost('/api/security/2fa/enable/');
            setTwoFactorData(response.data);
            setBackupCodes(response.data.backup_codes || []);
            toast.success(t('profile.twoFAQRCreated'));
        } catch (err) {
            toast.error(
                t('profile.twoFAEnableFailed', {
                    error: err.response?.data?.error || t('common.unknownError'),
                })
            );
        } finally {
            setLoading((l) => ({ ...l, enable2fa: false }));
        }
    };

    const verify2FASetup = async () => {
        try {
            setLoading((l) => ({ ...l, verify2fa: true }));
            await authPost('/api/security/2fa/verify-setup/', { code: verificationCode });
            setTwoFactorEnabled(true);
            setTwoFactorData(null);
            setVerificationCode('');
            toast.success(t('auth.2faEnabled'));
        } catch (err) {
            toast.error(t('profile.wrongCode'));
        } finally {
            setLoading((l) => ({ ...l, verify2fa: false }));
        }
    };

    const disable2FA = async () => {
        if (!(await confirmDialog("2FA'yı devre dışı bırakmak istediğinize emin misiniz?"))) return;
        try {
            setLoading((l) => ({ ...l, disable2fa: true }));
            await authPost('/api/security/2fa/disable/');
            setTwoFactorEnabled(false);
            toast.success(t('profile.twoFADisabled'));
        } catch (err) {
            toast.error(t('profile.twoFADisableFailed'));
        } finally {
            setLoading((l) => ({ ...l, disable2fa: false }));
        }
    };

    const checkPasswordStatus = async () => {
        try {
            const response = await authGet('/api/users/password_status/');
            setHasPassword(response.data?.has_password ?? true);
        } catch (err) {
            logger.error('Password status check failed:', err);
            setHasPassword(true);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.new_password !== passwordData.confirm_password) {
            toast.error(t('profile.passwordMismatch'));
            return;
        }
        if (passwordData.new_password.length < 12) {
            toast.error(t('profile.passwordTooShort'));
            return;
        }
        try {
            setLoading((l) => ({ ...l, changePassword: true }));
            const requestData = { new_password: passwordData.new_password };
            if (hasPassword) requestData.old_password = passwordData.old_password;
            await authPost('/api/users/change_password/', requestData);
            toast.success(
                hasPassword
                    ? '✅ Password successfully changed!'
                    : '✅ Password successfully belirlendi!'
            );
            setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
            if (!hasPassword) setHasPassword(true);
        } catch (err) {
            const details = err.response?.data?.details;
            if (details && Array.isArray(details) && details.length > 0) {
                toast.error(t('profileSecurity.passwordReq') + '\n• ' + details.join('\n• '));
            } else {
                toast.error(
                    t('profile.passwordChangeFailed', {
                        error: err.response?.data?.error || 'Old password may be incorrect',
                    })
                );
            }
        } finally {
            setLoading((l) => ({ ...l, changePassword: false }));
        }
    };

    const fetchEmailVerificationStatus = async () => {
        try {
            const response = await authGet('/auth/check-verification/');
            setEmailVerified(response.data?.is_verified || false);
        } catch (err) {
            logger.error('Email verification check failed:', err);
        }
    };

    const resendVerificationEmail = async () => {
        try {
            setLoading((l) => ({ ...l, resendEmail: true }));
            await authPost('/auth/send-verification/');
            toast.success(t('profile.verificationEmailSent'));
        } catch (err) {
            toast.error(t('profile.verificationEmailFailed'));
        } finally {
            setLoading((l) => ({ ...l, resendEmail: false }));
        }
    };

    const fetchSessions = async () => {
        try {
            const response = await authGet('/api/security/sessions/');
            setSessions(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            logger.error('Sessions fetch failed:', err);
            setSessions([]);
        }
    };

    const revokeSession = async (sessionId) => {
        try {
            await authPost(`/api/security/sessions/${sessionId}/revoke/`);
            toast.success(t('profile.sessionTerminated'));
            fetchSessions();
        } catch (err) {
            toast.error(t('profile.sessionTerminateFailed'));
        }
    };

    const revokeAllSessions = async () => {
        if (!(await confirmDialog('Are you sure you want to end all active sessions?'))) return;
        try {
            await authPost('/api/security/sessions/revoke-all/');
            toast.success(t('profile.allSessionsEnded'));
            setTimeout(() => {
                localStorage.removeItem('access_token');
                window.location.reload();
            }, 2000);
        } catch (err) {
            toast.error(t('profile.allSessionsFailed'));
        }
    };

    return {
        loading,
        twoFactorData,
        twoFactorEnabled,
        backupCodes,
        verificationCode,
        sessions,
        emailVerified,
        passwordData,
        hasPassword,
        setVerificationCode,
        setPasswordData,
        setEmailVerified,
        check2FAStatus,
        enable2FA,
        verify2FASetup,
        disable2FA,
        checkPasswordStatus,
        handlePasswordChange,
        fetchEmailVerificationStatus,
        resendVerificationEmail,
        fetchSessions,
        revokeSession,
        revokeAllSessions,
    };
};

export default useProfileSecurity;
