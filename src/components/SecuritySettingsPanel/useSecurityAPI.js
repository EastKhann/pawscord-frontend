import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';

const useSecurityAPI = () => {
    const { t } = useTranslation();
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [twoFactorMethods, setTwoFactorMethods] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [ipWhitelist, setIpWhitelist] = useState([]);
    const [backupCodes, setBackupCodes] = useState([]);
    const [qrCode, setQrCode] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newIp, setNewIp] = useState('');
    const [securityStatus, setSecurityStatus] = useState(null);
    const [activeTab, setActiveTab] = useState('2fa');
    const apiBaseUrl = getApiBase();
    const token = getToken();

    const headers = { Authorization: `Bearer ${token}` };
    const postHeaders = { ...headers, 'Content-Type': 'application/json' };

    const fetchSecurityStatus = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/status/`, { headers });
            const data = await res.json();
            setSecurityStatus(data);
            setTwoFactorEnabled(data.two_factor_enabled || false);
        } catch (error) {
            logger.error('Error fetching security status:', error);
        }
    };

    const fetch2FAMethods = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/2fa/methods/`, { headers });
            const data = await res.json();
            setTwoFactorMethods(data.methods || []);
        } catch (error) {
            logger.error('Error fetching 2FA methods:', error);
        }
    };

    const fetchSessions = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/sessions/`, { headers });
            const data = await res.json();
            setSessions(data.sessions || []);
        } catch (error) {
            logger.error('Error fetching sessions:', error);
        }
    };

    const fetchIPWhitelist = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/`, { headers });
            const data = await res.json();
            setIpWhitelist(data.whitelist || []);
        } catch (error) {
            logger.error('Error fetching IP whitelist:', error);
        }
    };

    const enable2FA = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/enable/`, {
                method: 'POST',
                headers: postHeaders,
            });
            const data = await res.json();
            if (res.ok) {
                setQrCode(data.qr_code || '');
                setBackupCodes(data.backup_codes || []);
                toast.info(t('ui.qr_kodu_tarayin_ve_dogrulama_kodunu_giri'));
            } else {
                toast.error(data.error || t('security.2faEnableFailed'));
            }
        } catch (error) {
            logger.error('Error enabling 2FA:', error);
            toast.error(t('ui.2fa_etkinlestirme_hatasi'));
        }
    };

    const verify2FASetup = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/verify-setup/`, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify({ code: verificationCode }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(t('auth.2faEnabled'));
                setTwoFactorEnabled(true);
                setQrCode('');
                setVerificationCode('');
                fetchSecurityStatus();
            } else {
                toast.error(data.error || t('common.invalidCode'));
            }
        } catch (error) {
            logger.error('Error verifying 2FA:', error);
            toast.error(t('security.validationError'));
        }
    };

    const disable2FA = async () => {
        if (!(await confirmDialog("2FA'are you sure you want to disable?"))) return;
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/disable/`, {
                method: 'POST',
                headers: postHeaders,
            });
            const data = await res.json();
            if (res.ok) {
                toast.info(t('ui.2fa_devre_disi_birakildi_2'));
                setTwoFactorEnabled(false);
                fetchSecurityStatus();
            } else {
                toast.error(data.error || t('ui.2fa_devre_disi_birakilamadi'));
            }
        } catch (error) {
            logger.error('Error disabling 2FA:', error);
            toast.error(t('ui.2fa_devre_disi_birakma_hatasi'));
        }
    };

    const getBackupCodes = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/backup-codes/`, {
                method: 'POST',
                headers: postHeaders,
            });
            const data = await res.json();
            if (res.ok) {
                setBackupCodes(data.backup_codes || []);
                toast.success(t('security.backupCodesCreated'));
            } else {
                toast.error(data.error || t('ui.yedek_kodlar_olusturulamadi'));
            }
        } catch (error) {
            logger.error('Error getting backup codes:', error);
            toast.error(t('ui.yedek_kod_hatasi'));
        }
    };

    const revokeSession = async (sessionId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/sessions/${sessionId}/revoke/`, {
                method: 'POST',
                headers: postHeaders,
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(t('auth.sessionEnded'));
                fetchSessions();
            } else {
                toast.error(data.error || t('ui.oturum_sonlandirilamadi_2'));
            }
        } catch (error) {
            logger.error('Error revoking session:', error);
            toast.error(t('ui.oturum_sonlandirma_hatasi'));
        }
    };

    const revokeAllSessions = async () => {
        if (!(await confirmDialog(t('security.revokeAllConfirm','Are you sure you want to terminate all sessions?'))))
            return;
        try {
            const res = await fetch(`${apiBaseUrl}/security/sessions/revoke-all/`, {
                method: 'POST',
                headers: postHeaders,
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(t('ui.tum_oturumlar_sonlandirildi'));
                fetchSessions();
            } else {
                toast.error(data.error || t('ui.oturumlar_sonlandirilamadi'));
            }
        } catch (error) {
            logger.error('Error revoking all sessions:', error);
            toast.error(t('ui.toplu_sonlandirma_hatasi'));
        }
    };

    const addIPToWhitelist = async () => {
        if (!newIp.trim()) {
            toast.error(t('security.ipRequired'));
            return;
        }
        try {
            const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/add/`, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify({ ip_address: newIp }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(t('security.ipAdded'));
                setNewIp('');
                fetchIPWhitelist();
            } else {
                toast.error(data.error || t('security.ipAddFailed'));
            }
        } catch (error) {
            logger.error('Error adding IP:', error);
            toast.error(t('ui.ip_addme_hatasi'));
        }
    };

    const removeIPFromWhitelist = async (whitelistId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/${whitelistId}/`, {
                method: 'DELETE',
                headers,
            });
            if (res.ok) {
                toast.success(t('security.ipRemoved'));
                fetchIPWhitelist();
            } else {
                toast.error(t('ui.ip_kaldirilamadi'));
            }
        } catch (error) {
            logger.error('Error removing IP:', error);
            toast.error(t('ui.ip_kaldirma_hatasi'));
        }
    };

    const downloadBackupCodes = () => {
        const text = backupCodes.join('\n');
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pawscord_backup_codes_${new Date().toISOString()}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success(t('security.backupCodesDownloaded'));
    };

    useEffect(() => {
        fetchSecurityStatus();
        fetch2FAMethods();
        fetchSessions();
        fetchIPWhitelist();
    }, []);

    return {
        twoFactorEnabled,
        twoFactorMethods,
        sessions,
        ipWhitelist,
        backupCodes,
        qrCode,
        verificationCode,
        setVerificationCode,
        newIp,
        setNewIp,
        securityStatus,
        activeTab,
        setActiveTab,
        enable2FA,
        verify2FASetup,
        disable2FA,
        getBackupCodes,
        downloadBackupCodes,
        revokeSession,
        revokeAllSessions,
        addIPToWhitelist,
        removeIPFromWhitelist,
    };
};

export default useSecurityAPI;
