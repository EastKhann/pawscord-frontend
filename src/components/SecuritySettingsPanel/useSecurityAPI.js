import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

const useSecurityAPI = () => {
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
    const token = localStorage.getItem('access_token');

    const headers = { 'Authorization': `Bearer ${token}` };
    const postHeaders = { ...headers, 'Content-Type': 'application/json' };

    const fetchSecurityStatus = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/status/`, { headers });
            const data = await res.json();
            setSecurityStatus(data);
            setTwoFactorEnabled(data.two_factor_enabled || false);
        } catch (error) { console.error('Error fetching security status:', error); }
    };

    const fetch2FAMethods = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/2fa/methods/`, { headers });
            const data = await res.json();
            setTwoFactorMethods(data.methods || []);
        } catch (error) { console.error('Error fetching 2FA methods:', error); }
    };

    const fetchSessions = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/sessions/`, { headers });
            const data = await res.json();
            setSessions(data.sessions || []);
        } catch (error) { console.error('Error fetching sessions:', error); }
    };

    const fetchIPWhitelist = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/`, { headers });
            const data = await res.json();
            setIpWhitelist(data.whitelist || []);
        } catch (error) { console.error('Error fetching IP whitelist:', error); }
    };

    const enable2FA = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/enable/`, { method: 'POST', headers: postHeaders });
            const data = await res.json();
            if (res.ok) {
                setQrCode(data.qr_code || '');
                setBackupCodes(data.backup_codes || []);
                toast.info('ℹ️ QR kodu tarayın ve doğrulama kodunu girin');
            } else { toast.error(`❌ ${data.error || '2FA etkinleştirilemedi'}`); }
        } catch (error) { console.error('Error enabling 2FA:', error); toast.error('❌ 2FA etkinleştirme hatası'); }
    };

    const verify2FASetup = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/verify-setup/`, {
                method: 'POST', headers: postHeaders, body: JSON.stringify({ code: verificationCode })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('✅ 2FA başarıyla etkinleştirildi!');
                setTwoFactorEnabled(true); setQrCode(''); setVerificationCode('');
                fetchSecurityStatus();
            } else { toast.error(`❌ ${data.error || 'Geçersiz kod'}`); }
        } catch (error) { console.error('Error verifying 2FA:', error); toast.error('❌ Doğrulama hatası'); }
    };

    const disable2FA = async () => {
        if (!await confirmDialog('2FA\'yı devre dışı bırakmak istediğinizden emin misiniz?')) return;
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/disable/`, { method: 'POST', headers: postHeaders });
            const data = await res.json();
            if (res.ok) { toast.info('ℹ️ 2FA devre dışı bırakıldı'); setTwoFactorEnabled(false); fetchSecurityStatus(); }
            else { toast.error(`❌ ${data.error || '2FA devre dışı bırakılamadı'}`); }
        } catch (error) { console.error('Error disabling 2FA:', error); toast.error('❌ 2FA devre dışı bırakma hatası'); }
    };

    const getBackupCodes = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/backup-codes/`, { method: 'POST', headers: postHeaders });
            const data = await res.json();
            if (res.ok) { setBackupCodes(data.backup_codes || []); toast.success('✅ Yedek kodlar oluşturuldu'); }
            else { toast.error(`❌ ${data.error || 'Yedek kodlar oluşturulamadı'}`); }
        } catch (error) { console.error('Error getting backup codes:', error); toast.error('❌ Yedek kod hatası'); }
    };

    const revokeSession = async (sessionId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/sessions/${sessionId}/revoke/`, { method: 'POST', headers: postHeaders });
            const data = await res.json();
            if (res.ok) { toast.success('✅ Oturum sonlandırıldı'); fetchSessions(); }
            else { toast.error(`❌ ${data.error || 'Oturum sonlandırılamadı'}`); }
        } catch (error) { console.error('Error revoking session:', error); toast.error('❌ Oturum sonlandırma hatası'); }
    };

    const revokeAllSessions = async () => {
        if (!await confirmDialog('Tüm oturumları sonlandırmak istediğinizden emin misiniz?')) return;
        try {
            const res = await fetch(`${apiBaseUrl}/security/sessions/revoke-all/`, { method: 'POST', headers: postHeaders });
            const data = await res.json();
            if (res.ok) { toast.success('✅ Tüm oturumlar sonlandırıldı'); fetchSessions(); }
            else { toast.error(`❌ ${data.error || 'Oturumlar sonlandırılamadı'}`); }
        } catch (error) { console.error('Error revoking all sessions:', error); toast.error('❌ Toplu sonlandırma hatası'); }
    };

    const addIPToWhitelist = async () => {
        if (!newIp.trim()) { toast.error('❌ IP adresi gerekli'); return; }
        try {
            const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/add/`, {
                method: 'POST', headers: postHeaders, body: JSON.stringify({ ip_address: newIp })
            });
            const data = await res.json();
            if (res.ok) { toast.success('✅ IP beyaz listeye eklendi'); setNewIp(''); fetchIPWhitelist(); }
            else { toast.error(`❌ ${data.error || 'IP eklenemedi'}`); }
        } catch (error) { console.error('Error adding IP:', error); toast.error('❌ IP ekleme hatası'); }
    };

    const removeIPFromWhitelist = async (whitelistId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/${whitelistId}/`, { method: 'DELETE', headers });
            if (res.ok) { toast.success('✅ IP beyaz listeden kaldırıldı'); fetchIPWhitelist(); }
            else { toast.error('❌ IP kaldırılamadı'); }
        } catch (error) { console.error('Error removing IP:', error); toast.error('❌ IP kaldırma hatası'); }
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
        toast.success('✅ Yedek kodlar indirildi');
    };

    useEffect(() => {
        fetchSecurityStatus(); fetch2FAMethods(); fetchSessions(); fetchIPWhitelist();
    }, []);

    return {
        twoFactorEnabled, twoFactorMethods, sessions, ipWhitelist,
        backupCodes, qrCode, verificationCode, setVerificationCode,
        newIp, setNewIp, securityStatus, activeTab, setActiveTab,
        enable2FA, verify2FASetup, disable2FA, getBackupCodes, downloadBackupCodes,
        revokeSession, revokeAllSessions,
        addIPToWhitelist, removeIPFromWhitelist
    };
};

export default useSecurityAPI;
