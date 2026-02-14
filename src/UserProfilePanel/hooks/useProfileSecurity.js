import { useState } from 'react';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import { authGet, authPost } from './profileApiUtils';

const useProfileSecurity = () => {
    const [loading, setLoading] = useState({});
    const [twoFactorData, setTwoFactorData] = useState(null);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [backupCodes, setBackupCodes] = useState([]);
    const [verificationCode, setVerificationCode] = useState('');
    const [sessions, setSessions] = useState([]);
    const [emailVerified, setEmailVerified] = useState(false);
    const [passwordData, setPasswordData] = useState({ old_password: '', new_password: '', confirm_password: '' });
    const [hasPassword, setHasPassword] = useState(true);

    const check2FAStatus = async () => {
        try {
            const response = await authGet('/api/2fa/methods/');
            const enabledMethods = response.data?.enabled || [];
            setTwoFactorEnabled(enabledMethods.includes('totp') || response.data?.totp_enabled || response.data?.is_enabled || false);
        } catch (err) { console.error('2FA status check failed:', err); }
    };

    const enable2FA = async () => {
        try {
            setLoading(l => ({ ...l, enable2fa: true }));
            const response = await authPost('/api/security/2fa/enable/');
            setTwoFactorData(response.data);
            setBackupCodes(response.data.backup_codes || []);
            toast.success('\uD83D\uDCF1 2FA QR kodu olu\u015Fturuldu! L\u00FCtfen telefonunuzdaki authenticator uygulamas\u0131yla taray\u0131n.');
        } catch (err) {
            toast.error('2FA etkinle\u015Ftirme ba\u015Far\u0131s\u0131z: ' + (err.response?.data?.error || 'Bilinmeyen hata'));
        } finally { setLoading(l => ({ ...l, enable2fa: false })); }
    };

    const verify2FASetup = async () => {
        try {
            setLoading(l => ({ ...l, verify2fa: true }));
            await authPost('/api/security/2fa/verify-setup/', { code: verificationCode });
            setTwoFactorEnabled(true);
            setTwoFactorData(null);
            setVerificationCode('');
            toast.success('\u2705 2FA ba\u015Far\u0131yla etkinle\u015Ftirildi!');
        } catch (err) {
            toast.error('Kod yanl\u0131\u015F! L\u00FCtfen tekrar deneyin.');
        } finally { setLoading(l => ({ ...l, verify2fa: false })); }
    };

    const disable2FA = async () => {
        if (!await confirmDialog('2FA\'y\u0131 devre d\u0131\u015F\u0131 b\u0131rakmak istedi\u011Finize emin misiniz?')) return;
        try {
            setLoading(l => ({ ...l, disable2fa: true }));
            await authPost('/api/security/2fa/disable/');
            setTwoFactorEnabled(false);
            toast.success('2FA devre d\u0131\u015F\u0131 b\u0131rak\u0131ld\u0131.');
        } catch (err) {
            toast.error('2FA devre d\u0131\u015F\u0131 b\u0131rakma ba\u015Far\u0131s\u0131z.');
        } finally { setLoading(l => ({ ...l, disable2fa: false })); }
    };

    const checkPasswordStatus = async () => {
        try {
            const response = await authGet('/api/users/password_status/');
            setHasPassword(response.data?.has_password ?? true);
        } catch (err) { console.error('Password status check failed:', err); setHasPassword(true); }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.new_password !== passwordData.confirm_password) {
            toast.error('Yeni \u015Fifreler e\u015Fle\u015Fmiyor!'); return;
        }
        if (passwordData.new_password.length < 8) {
            toast.error('\u015Eifre en az 8 karakter olmal\u0131d\u0131r!'); return;
        }
        try {
            setLoading(l => ({ ...l, changePassword: true }));
            const requestData = { new_password: passwordData.new_password };
            if (hasPassword) requestData.old_password = passwordData.old_password;
            await authPost('/api/users/change_password/', requestData);
            toast.success(hasPassword ? '\u2705 \u015Eifre ba\u015Far\u0131yla de\u011Fi\u015Ftirildi!' : '\u2705 \u015Eifre ba\u015Far\u0131yla belirlendi!');
            setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
            if (!hasPassword) setHasPassword(true);
        } catch (err) {
            toast.error('\u015Eifre de\u011Fi\u015Ftirme ba\u015Far\u0131s\u0131z: ' + (err.response?.data?.error || 'Eski \u015Fifre yanl\u0131\u015F olabilir'));
        } finally { setLoading(l => ({ ...l, changePassword: false })); }
    };

    const fetchEmailVerificationStatus = async () => {
        try {
            const response = await authGet('/auth/check-verification/');
            setEmailVerified(response.data?.is_verified || false);
        } catch (err) { console.error('Email verification check failed:', err); }
    };

    const resendVerificationEmail = async () => {
        try {
            setLoading(l => ({ ...l, resendEmail: true }));
            await authPost('/auth/send-verification/');
            toast.success('\u2709\uFE0F Do\u011Frulama e-postas\u0131 g\u00F6nderildi!');
        } catch (err) {
            toast.error('E-posta g\u00F6nderilemedi.');
        } finally { setLoading(l => ({ ...l, resendEmail: false })); }
    };

    const fetchSessions = async () => {
        try {
            const response = await authGet('/api/security/sessions/');
            setSessions(Array.isArray(response.data) ? response.data : []);
        } catch (err) { console.error('Sessions fetch failed:', err); setSessions([]); }
    };

    const revokeSession = async (sessionId) => {
        try {
            await authPost(`/api/security/sessions/${sessionId}/revoke/`);
            toast.success('Oturum sonland\u0131r\u0131ld\u0131.');
            fetchSessions();
        } catch (err) { toast.error('Oturum sonland\u0131r\u0131lamad\u0131.'); }
    };

    const revokeAllSessions = async () => {
        if (!await confirmDialog('T\u00FCm aktif oturumlar\u0131 sonland\u0131rmak istedi\u011Finize emin misiniz?')) return;
        try {
            await authPost('/api/security/sessions/revoke-all/');
            toast.success('T\u00FCm oturumlar sonland\u0131r\u0131ld\u0131. L\u00FCtfen tekrar giri\u015F yap\u0131n.');
            setTimeout(() => { localStorage.removeItem('access_token'); window.location.reload(); }, 2000);
        } catch (err) { toast.error('Oturumlar sonland\u0131r\u0131lamad\u0131.'); }
    };

    return {
        loading, twoFactorData, twoFactorEnabled, backupCodes, verificationCode,
        sessions, emailVerified, passwordData, hasPassword,
        setVerificationCode, setPasswordData, setEmailVerified,
        check2FAStatus, enable2FA, verify2FASetup, disable2FA,
        checkPasswordStatus, handlePasswordChange,
        fetchEmailVerificationStatus, resendVerificationEmail,
        fetchSessions, revokeSession, revokeAllSessions,
    };
};

export default useProfileSecurity;
