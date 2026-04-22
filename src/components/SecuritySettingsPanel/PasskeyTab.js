// frontend/src/components/SecuritySettingsPanel/PasskeyTab.js
// Passkey / WebAuthn (FIDO2) management UI.
// Allows users to register biometric keys (Touch ID, Windows Hello, YubiKey).

import React, { useState } from 'react';
import useWebAuthn from './useWebAuthn';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import confirmDialog from '../../utils/confirmDialog';

const S = {
    txt5: { marginTop: 16, fontSize: 13, color: '#888', lineHeight: 1.5 },
    bg3: {
        padding: '8px 12px',
        borderRadius: 6,
        border: '1px solid var(--border, #2e2f33)',
        background: 'var(--input-bg, #1e1f22)',
        color: 'inherit',
        flex: 1,
        minWidth: 200,
    },
    flex2: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
    mar: { marginTop: 20 },
    bg2: {
        background: 'transparent',
        border: '1px solid #e74c3c',
        color: '#e74c3c',
        borderRadius: 6,
        padding: '4px 10px',
        cursor: 'pointer',
        fontSize: 13,
    },
    txt4: { fontSize: 12, color: '#888' },
    txt3: { fontSize: 12, color: '#888', marginTop: 2 },
    font: { fontWeight: 600 },
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        marginBottom: 8,
        background: 'var(--input-bg, #1e1f22)',
        borderRadius: 8,
        border: '1px solid var(--border, #2e2f33)',
    },
    pad: { listStyle: 'none', padding: 0, marginTop: 16 },
    txt2: { color: '#888', marginTop: 16, padding: '12px 0' },
    txt: { color: '#aaa', marginTop: 16 },
    bg: {
        color: '#f0b232',
        background: 'rgba(240,178,50,0.1)',
        padding: '12px 16px',
        borderRadius: 8,
        marginTop: 12,
    },
};

const PasskeyTab = () => {
    const { t } = useTranslation();

    const { credentials, loading, registering, supported, registerPasskey, deleteCredential } =
        useWebAuthn();

    const [deviceName, setDeviceName] = useState('');
    const [showNameInput, setShowNameInput] = useState(false);

    const handleRegister = async () => {
        const name = deviceName.trim() || 'Security Key';
        const ok = await registerPasskey(name);
        if (ok) {
            setDeviceName('');
            setShowNameInput(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (await confirmDialog(t('passkey.deleteConfirm', { name }))) {
            deleteCredential(id);
        }
    };

    if (!supported) {
        return (
            <div className="tab-content">
                <h3>{t('🔑_passkey_security_anahtarları')}</h3>
                <div className="info-banner" style={S.bg}>
                    {t('passkey.noSupport','⚠️ Your browser does not support WebAuthn / Passkey. Use Chrome, Firefox, Safari or Edge')}
                    {t('passkey.noSupportCont','to use this feature.')}
                </div>
            </div>
        );
    }

    return (
        <div className="tab-content">
            <h3>{t('🔑_passkey_security_anahtarları')}</h3>
            <p>
                {t('passkey.biometricDesc','Biometric authentication (Touch ID, Windows Hello) or physical security')}
                {t('passkey.biometricDesc2','keys (YubiKey) to sign in. No password needed.')}
            </p>

            {/* ── Registered credentials list ── */}
            {loading ? (
                <div className="loading-text" style={S.txt}>
                    {t('loading…')}
                </div>
            ) : credentials.length === 0 ? (
                <div style={S.txt2}>{t('webauthn.noKeys','No security keys registered yet.')}</div>
            ) : (
                <ul className="passkey-list" style={S.pad}>
                    {credentials.map((cred) => (
                        <li key={cred.id} style={S.flex}>
                            <div>
                                <span style={S.font}>
                                    🔐 {cred.device_name || t('ui.security_anahtari')}
                                </span>
                                {cred.created_at && (
                                    <div style={S.txt3}>
                                        Addnme:{' '}
                                        {new Date(cred.created_at).toLocaleDateString('tr-TR')}
                                    </div>
                                )}
                                {cred.last_used && (
                                    <div style={S.txt4}>
                                        {t('apiKeys.lastUsed','Last used:')}{' '}
                                        {new Date(cred.last_used).toLocaleDateString('tr-TR')}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() =>
                                    handleDelete(
                                        cred.id,
                                        cred.device_name || t('ui.security_anahtari_2')
                                    )
                                }
                                style={S.bg2}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* ── Add passkey ── */}
            <div style={S.mar}>
                {!showNameInput ? (
                    <button
                        className="enable-btn"
                        onClick={() => setShowNameInput(true)}
                        disabled={registering}
                    >
                        + Yeni Passkey Add
                    </button>
                ) : (
                    <div style={S.flex2}>
                        <input
                            type="text"
                            placeholder={t('cihaz_adı_örn_macbook_touch_id')}
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                            maxLength={50}
                            style={S.bg3}
                        />
                        <button
                            className="verify-btn"
                            onClick={handleRegister}
                            disabled={registering}
                        >
                            {registering ? 'Saving…' : 'Save'}
                        </button>
                        <button
                            className="disable-btn"
                            onClick={() => {
                                setShowNameInput(false);
                                setDeviceName('');
                            }}
                            disabled={registering}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div style={S.txt5}>
                💡 <strong>{t('i̇pucu')}</strong> Passkey desteği Chrome 108+, Safari 16+, Firefox
                {t('passkey.compatibility','Works with Chrome 119+ and Edge 108+. Physical YubiKey requires USB or NFC connection.')}
            </div>
        </div>
    );
};

PasskeyTab.propTypes = {};

export default PasskeyTab;
