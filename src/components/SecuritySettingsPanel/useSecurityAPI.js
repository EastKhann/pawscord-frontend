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
                toast.info('\u2139\uFE0F QR kodu taray\u0131n ve do\u011Frulama kodunu girin');
            } else { toast.error(`\u274C ${data.error || '2FA etkinle\u015Ftirilemedi'}`); }
        } catch (error) { console.error('Error enabling 2FA:', error); toast.error('\u274C 2FA etkinle\u015Ftirme hatas\u0131'); }
    };

    const verify2FASetup = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/verify-setup/`, {
                method: 'POST', headers: postHeaders, body: JSON.stringify({ code: verificationCode })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('\u2705 2FA ba\u015Far\u0131yla etkinle\u015Ftirildi!');
                setTwoFactorEnabled(true); setQrCode(''); setVerificationCode('');
                fetchSecurityStatus();
            } else { toast.error(`\u274C ${data.error || 'Ge\u00E7ersiz kod'}`); }
        } catch (error) { console.error('Error verifying 2FA:', error); toast.error('\u274C Do\u011Frulama hatas\u0131'); }
    };

    const disable2FA = async () => {
        if (!await confirmDialog('2FA\'y\u0131 devre d\u0131\u015F\u0131 b\u0131rakmak istedi\u011Finizden emin misiniz?')) return;
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/disable/`, { method: 'POST', headers: postHeaders });
            const data = await res.json();
            if (res.ok) { toast.info('\u2139\uFE0F 2FA devre d\u0131\u015F\u0131 b\u0131rak\u0131ld\u0131'); setTwoFactorEnabled(false); fetchSecurityStatus(); }
            else { toast.error(`\u274C ${data.error || '2FA devre d\u0131\u015F\u0131 b\u0131rak\u0131lamad\u0131'}`); }
        } catch (error) { console.error('Error disabling 2FA:', error); toast.error('\u274C 2FA devre d\u0131\u015F\u0131 b\u0131rakma hatas\u0131'); }
    };

    const getBackupCodes = async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/2fa/backup-codes/`, { method: 'POST', headers: postHeaders });
            const data = await res.json();
            if (res.ok) { setBackupCodes(data.backup_codes || []); toast.success('\u2705 Yedek kodlar olu\u015Fturuldu'); }
            else { toast.error(`\u274C ${data.error || 'Yedek kodlar olu\u015Fturulamad\u0131'}`); }
        } catch (error) { console.error('Error getting backup codes:', error); toast.error('\u274C Yedek kod hatas\u0131'); }
    };

    const revokeSession = async (sessionId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/sessions/${sessionId}/revoke/`, { method: 'POST', headers: postHeaders });
            const data = await res.json();
            if (res.ok) { toast.success('\u2705 Oturum sonland\u0131r\u0131ld\u0131'); fetchSessions(); }
            else { toast.error(`\u274C ${data.error || 'Oturum sonland\u0131r\u0131lamad\u0131'}`); }
        } catch (error) { console.error('Error revoking session:', error); toast.error('\u274C Oturum sonland\u0131rma hatas\u0131'); }
    };

    const revokeAllSessions = async () => {
        if (!await confirmDialog('T\u00FCm oturumlar\u0131 sonland\u0131rmak istedi\u011Finizden emin misiniz?')) return;
        try {
            const res = await fetch(`${apiBaseUrl}/security/sessions/revoke-all/`, { method: 'POST', headers: postHeaders });
            const data = await res.json();
            if (res.ok) { toast.success('\u2705 T\u00FCm oturumlar sonland\u0131r\u0131ld\u0131'); fetchSessions(); }
            else { toast.error(`\u274C ${data.error || 'Oturumlar sonland\u0131r\u0131lamad\u0131'}`); }
        } catch (error) { console.error('Error revoking all sessions:', error); toast.error('\u274C Toplu sonland\u0131rma hatas\u0131'); }
    };

    const addIPToWhitelist = async () => {
        if (!newIp.trim()) { toast.error('\u274C IP adresi gerekli'); return; }
        try {
            const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/add/`, {
                method: 'POST', headers: postHeaders, body: JSON.stringify({ ip_address: newIp })
            });
            const data = await res.json();
            if (res.ok) { toast.success('\u2705 IP beyaz listeye eklendi'); setNewIp(''); fetchIPWhitelist(); }
            else { toast.error(`\u274C ${data.error || 'IP eklenemedi'}`); }
        } catch (error) { console.error('Error adding IP:', error); toast.error('\u274C IP ekleme hatas\u0131'); }
    };

    const removeIPFromWhitelist = async (whitelistId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/security/ip-whitelist/${whitelistId}/`, { method: 'DELETE', headers });
            if (res.ok) { toast.success('\u2705 IP beyaz listeden kald\u0131r\u0131ld\u0131'); fetchIPWhitelist(); }
            else { toast.error('\u274C IP kald\u0131r\u0131lamad\u0131'); }
        } catch (error) { console.error('Error removing IP:', error); toast.error('\u274C IP kald\u0131rma hatas\u0131'); }
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
        toast.success('\u2705 Yedek kodlar indirildi');
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
