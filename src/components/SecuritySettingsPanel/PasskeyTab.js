// frontend/src/components/SecuritySettingsPanel/PasskeyTab.js
// Passkey / WebAuthn (FIDO2) management UI.
// Allows users to register biometric keys (Touch ID, Windows Hello, YubiKey).

import React, { useState } from 'react';
import useWebAuthn from './useWebAuthn';

const PasskeyTab = () => {
    const {
        credentials,
        loading,
        registering,
        supported,
        registerPasskey,
        deleteCredential,
    } = useWebAuthn();

    const [deviceName, setDeviceName] = useState('');
    const [showNameInput, setShowNameInput] = useState(false);

    const handleRegister = async () => {
        const name = deviceName.trim() || 'Güvenlik Anahtarı';
        const ok = await registerPasskey(name);
        if (ok) {
            setDeviceName('');
            setShowNameInput(false);
        }
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`"${name}" anahtarını kaldırmak istediğinizden emin misiniz?`)) {
            deleteCredential(id);
        }
    };

    if (!supported) {
        return (
            <div className="tab-content">
                <h3>🔑 Passkey / Güvenlik Anahtarları</h3>
                <div className="info-banner" style={{ color: '#f0b232', background: 'rgba(240,178,50,0.1)', padding: '12px 16px', borderRadius: 8, marginTop: 12 }}>
                    ⚠️ Tarayıcınız WebAuthn / Passkey desteklemiyor. Chrome, Firefox, Safari veya Edge kullanın.
                </div>
            </div>
        );
    }

    return (
        <div className="tab-content">
            <h3>🔑 Passkey / Güvenlik Anahtarları</h3>
            <p>
                Biyometrik kimlik doğrulama (Touch ID, Windows Hello) veya fiziksel güvenlik
                anahtarları (YubiKey) ile oturum açın. Şifreye gerek kalmaz.
            </p>

            {/* ── Registered credentials list ── */}
            {loading ? (
                <div className="loading-text" style={{ color: '#aaa', marginTop: 16 }}>Yükleniyor…</div>
            ) : credentials.length === 0 ? (
                <div style={{ color: '#888', marginTop: 16, padding: '12px 0' }}>
                    Henüz kayıtlı güvenlik anahtarı yok.
                </div>
            ) : (
                <ul className="passkey-list" style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
                    {credentials.map((cred) => (
                        <li
                            key={cred.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 14px',
                                marginBottom: 8,
                                background: 'var(--input-bg, #1e1f22)',
                                borderRadius: 8,
                                border: '1px solid var(--border, #2e2f33)',
                            }}
                        >
                            <div>
                                <span style={{ fontWeight: 600 }}>
                                    🔐 {cred.device_name || 'Güvenlik Anahtarı'}
                                </span>
                                {cred.created_at && (
                                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                                        Eklenme: {new Date(cred.created_at).toLocaleDateString('tr-TR')}
                                    </div>
                                )}
                                {cred.last_used && (
                                    <div style={{ fontSize: 12, color: '#888' }}>
                                        Son kullanım: {new Date(cred.last_used).toLocaleDateString('tr-TR')}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => handleDelete(cred.id, cred.device_name || 'Güvenlik Anahtarı')}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #e74c3c',
                                    color: '#e74c3c',
                                    borderRadius: 6,
                                    padding: '4px 10px',
                                    cursor: 'pointer',
                                    fontSize: 13,
                                }}
                            >
                                Kaldır
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* ── Add passkey ── */}
            <div style={{ marginTop: 20 }}>
                {!showNameInput ? (
                    <button
                        className="enable-btn"
                        onClick={() => setShowNameInput(true)}
                        disabled={registering}
                    >
                        + Yeni Passkey Ekle
                    </button>
                ) : (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="Cihaz adı (örn: MacBook Touch ID)"
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                            maxLength={50}
                            style={{
                                padding: '8px 12px',
                                borderRadius: 6,
                                border: '1px solid var(--border, #2e2f33)',
                                background: 'var(--input-bg, #1e1f22)',
                                color: 'inherit',
                                flex: 1,
                                minWidth: 200,
                            }}
                        />
                        <button
                            className="verify-btn"
                            onClick={handleRegister}
                            disabled={registering}
                        >
                            {registering ? 'Kaydediliyor…' : 'Kaydet'}
                        </button>
                        <button
                            className="disable-btn"
                            onClick={() => { setShowNameInput(false); setDeviceName(''); }}
                            disabled={registering}
                        >
                            İptal
                        </button>
                    </div>
                )}
            </div>

            <div style={{ marginTop: 16, fontSize: 13, color: '#888', lineHeight: 1.5 }}>
                💡 <strong>İpucu:</strong> Passkey desteği Chrome 108+, Safari 16+, Firefox 119+ ve Edge 108+ ile çalışır.
                Fiziksel YubiKey için USB veya NFC bağlantısı gereklidir.
            </div>
        </div>
    );
};

export default PasskeyTab;
