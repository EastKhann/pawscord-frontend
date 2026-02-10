import React, { useState, useEffect } from 'react';
import './SecuritySettingsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const SecuritySettingsPanel = ({ onClose }) => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [twoFactorMethods, setTwoFactorMethods] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [ipWhitelist, setIpWhitelist] = useState([]);
    const [backupCodes, setBackupCodes] = useState([]);
    const [qrCode, setQrCode] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newIp, setNewIp] = useState('');
    const [securityStatus, setSecurityStatus] = useState(null);
    const [activeTab, setActiveTab] = useState('2fa'); // 2fa, sessions, ip, alerts
    const apiBaseUrl = getApiBase();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchSecurityStatus();
        fetch2FAMethods();
        fetchSessions();
        fetchIPWhitelist();
    }, []);

    const fetchSecurityStatus = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/security/status/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setSecurityStatus(data);
            setTwoFactorEnabled(data.two_factor_enabled || false);
        } catch (error) {
            console.error('Error fetching security status:', error);
        }
    };

    const fetch2FAMethods = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/2fa/methods/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setTwoFactorMethods(data.methods || []);
        } catch (error) {
            console.error('Error fetching 2FA methods:', error);
        }
    };

    const fetchSessions = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/security/sessions/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setSessions(data.sessions || []);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    const fetchIPWhitelist = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/security/ip-whitelist/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setIpWhitelist(data.whitelist || []);
        } catch (error) {
            console.error('Error fetching IP whitelist:', error);
        }
    };

    const enable2FA = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/security/2fa/enable/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                setQrCode(data.qr_code || '');
                setBackupCodes(data.backup_codes || []);
                toast.info('ℹ️ QR kodu tarayın ve doğrulama kodunu girin');
            } else {
                toast.error(`❌ ${data.error || '2FA etkinleştirilemedi'}`);
            }
        } catch (error) {
            console.error('Error enabling 2FA:', error);
            toast.error('❌ 2FA etkinleştirme hatası');
        }
    };

    const verify2FASetup = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/security/2fa/verify-setup/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: verificationCode
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('✅ 2FA başarıyla etkinleştirildi!');
                setTwoFactorEnabled(true);
                setQrCode('');
                setVerificationCode('');
                fetchSecurityStatus();
            } else {
                toast.error(`❌ ${data.error || 'Geçersiz kod'}`);
            }
        } catch (error) {
            console.error('Error verifying 2FA:', error);
            toast.error('❌ Doğrulama hatası');
        }
    };

    const disable2FA = async () => {
        if (!await confirmDialog('2FA\'yı devre dışı bırakmak istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`${apiBaseUrl}/security/2fa/disable/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.info('ℹ️ 2FA devre dışı bırakıldı');
                setTwoFactorEnabled(false);
                fetchSecurityStatus();
            } else {
                toast.error(`❌ ${data.error || '2FA devre dışı bırakılamadı'}`);
            }
        } catch (error) {
            console.error('Error disabling 2FA:', error);
            toast.error('❌ 2FA devre dışı bırakma hatası');
        }
    };

    const getBackupCodes = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/security/2fa/backup-codes/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                setBackupCodes(data.backup_codes || []);
                toast.success('✅ Yedek kodlar oluşturuldu');
            } else {
                toast.error(`❌ ${data.error || 'Yedek kodlar oluşturulamadı'}`);
            }
        } catch (error) {
            console.error('Error getting backup codes:', error);
            toast.error('❌ Yedek kod hatası');
        }
    };

    const revokeSession = async (sessionId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/security/sessions/${sessionId}/revoke/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('✅ Oturum sonlandırıldı');
                fetchSessions();
            } else {
                toast.error(`❌ ${data.error || 'Oturum sonlandırılamadı'}`);
            }
        } catch (error) {
            console.error('Error revoking session:', error);
            toast.error('❌ Oturum sonlandırma hatası');
        }
    };

    const revokeAllSessions = async () => {
        if (!await confirmDialog('Tüm oturumları sonlandırmak istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`${apiBaseUrl}/security/sessions/revoke-all/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('✅ Tüm oturumlar sonlandırıldı');
                fetchSessions();
            } else {
                toast.error(`❌ ${data.error || 'Oturumlar sonlandırılamadı'}`);
            }
        } catch (error) {
            console.error('Error revoking all sessions:', error);
            toast.error('❌ Toplu sonlandırma hatası');
        }
    };

    const addIPToWhitelist = async () => {
        if (!newIp.trim()) {
            toast.error('❌ IP adresi gerekli');
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/security/ip-whitelist/add/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ip_address: newIp
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('✅ IP beyaz listeye eklendi');
                setNewIp('');
                fetchIPWhitelist();
            } else {
                toast.error(`❌ ${data.error || 'IP eklenemedi'}`);
            }
        } catch (error) {
            console.error('Error adding IP:', error);
            toast.error('❌ IP ekleme hatası');
        }
    };

    const removeIPFromWhitelist = async (whitelistId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/security/ip-whitelist/${whitelistId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success('✅ IP beyaz listeden kaldırıldı');
                fetchIPWhitelist();
            } else {
                toast.error('❌ IP kaldırılamadı');
            }
        } catch (error) {
            console.error('Error removing IP:', error);
            toast.error('❌ IP kaldırma hatası');
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
        toast.success('✅ Yedek kodlar indirildi');
    };

    return (
        <div className="security-overlay" onClick={onClose}>
            <div className="security-panel" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="security-header">
                    <h2>🔒 Güvenlik Ayarları</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Security Status */}
                {securityStatus && (
                    <div className="security-status">
                        <div className="status-item">
                            <span className="status-icon">🔐</span>
                            <span className="status-label">2FA:</span>
                            <span className={`status-value ${twoFactorEnabled ? 'active' : 'inactive'}`}>
                                {twoFactorEnabled ? 'Aktif' : 'Pasif'}
                            </span>
                        </div>
                        <div className="status-item">
                            <span className="status-icon">💻</span>
                            <span className="status-label">Aktif Oturumlar:</span>
                            <span className="status-value">{sessions.length}</span>
                        </div>
                        <div className="status-item">
                            <span className="status-icon">🌐</span>
                            <span className="status-label">IP Whitelist:</span>
                            <span className="status-value">{ipWhitelist.length}</span>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="security-tabs">
                    <button
                        className={`tab-btn ${activeTab === '2fa' ? 'active' : ''}`}
                        onClick={() => setActiveTab('2fa')}
                    >
                        🔐 2FA
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'sessions' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sessions')}
                    >
                        💻 Oturumlar
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'ip' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ip')}
                    >
                        🌐 IP Whitelist
                    </button>
                </div>

                {/* Content */}
                <div className="security-content">
                    {activeTab === '2fa' && (
                        <div className="tab-content">
                            <h3>İki Faktörlü Kimlik Doğrulama (2FA)</h3>
                            <p>Hesabınızı ekstra bir güvenlik katmanıyla koruyun</p>

                            {!twoFactorEnabled && !qrCode ? (
                                <div className="enable-2fa">
                                    <button className="enable-btn" onClick={enable2FA}>
                                        2FA'yı Etkinleştir
                                    </button>
                                </div>
                            ) : twoFactorEnabled ? (
                                <div className="enabled-2fa">
                                    <div className="success-message">
                                        <span className="success-icon">✅</span>
                                        <span>2FA aktif - Hesabınız korunuyor</span>
                                    </div>
                                    <button className="disable-btn" onClick={disable2FA}>
                                        2FA'yı Devre Dışı Bırak
                                    </button>
                                    <button className="backup-btn" onClick={getBackupCodes}>
                                        Yeni Yedek Kodlar Oluştur
                                    </button>
                                </div>
                            ) : (
                                <div className="setup-2fa">
                                    <div className="qr-section">
                                        <h4>1. QR Kodu Tarayın</h4>
                                        {qrCode && <img src={qrCode} alt="2FA QR Code" className="qr-code" />}
                                        <p>Authenticator uygulamanızla QR kodu tarayın</p>
                                    </div>

                                    <div className="verify-section">
                                        <h4>2. Doğrulama Kodunu Girin</h4>
                                        <input
                                            type="text"
                                            placeholder="6 haneli kod"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            maxLength={6}
                                            className="verification-input"
                                        />
                                        <button className="verify-btn" onClick={verify2FASetup}>
                                            Doğrula ve Etkinleştir
                                        </button>
                                    </div>

                                    {backupCodes.length > 0 && (
                                        <div className="backup-codes">
                                            <h4>3. Yedek Kodlarınız</h4>
                                            <p>Bu kodları güvenli bir yerde saklayın!</p>
                                            <div className="codes-grid">
                                                {backupCodes.map((code, index) => (
                                                    <div key={index} className="backup-code">
                                                        {code}
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="download-btn" onClick={downloadBackupCodes}>
                                                📥 Kodları İndir
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'sessions' && (
                        <div className="tab-content">
                            <div className="sessions-header">
                                <h3>Aktif Oturumlar</h3>
                                <button className="revoke-all-btn" onClick={revokeAllSessions}>
                                    Tümünü Sonlandır
                                </button>
                            </div>

                            <div className="sessions-list">
                                {sessions.map((session) => (
                                    <div key={session.id} className="session-card">
                                        <div className="session-info">
                                            <div className="session-device">
                                                <span className="device-icon">
                                                    {session.device_type === 'mobile' ? '📱' : '💻'}
                                                </span>
                                                <div className="device-details">
                                                    <span className="device-name">{session.device_name || 'Bilinmeyen Cihaz'}</span>
                                                    <span className="device-location">{session.location || 'Bilinmeyen Konum'}</span>
                                                </div>
                                            </div>
                                            <div className="session-meta">
                                                <span className="session-ip">IP: {session.ip_address}</span>
                                                <span className="session-time">
                                                    Son Aktivite: {new Date(session.last_activity).toLocaleString('tr-TR')}
                                                </span>
                                            </div>
                                        </div>
                                        {session.is_current ? (
                                            <span className="current-badge">Mevcut Oturum</span>
                                        ) : (
                                            <button
                                                className="revoke-btn"
                                                onClick={() => revokeSession(session.id)}
                                            >
                                                Sonlandır
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'ip' && (
                        <div className="tab-content">
                            <h3>IP Adresi Beyaz Listesi</h3>
                            <p>Sadece izin verilen IP adreslerinden giriş yapın</p>

                            <div className="add-ip">
                                <input
                                    type="text"
                                    placeholder="IP Adresi (örn: 192.168.1.1)"
                                    value={newIp}
                                    onChange={(e) => setNewIp(e.target.value)}
                                    className="ip-input"
                                />
                                <button className="add-btn" onClick={addIPToWhitelist}>
                                    + Ekle
                                </button>
                            </div>

                            <div className="ip-list">
                                {ipWhitelist.map((item) => (
                                    <div key={item.id} className="ip-card">
                                        <div className="ip-info">
                                            <span className="ip-address">{item.ip_address}</span>
                                            <span className="ip-added">
                                                Eklendi: {new Date(item.created_at).toLocaleDateString('tr-TR')}
                                            </span>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeIPFromWhitelist(item.id)}
                                        >
                                            Kaldır
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecuritySettingsPanel;

