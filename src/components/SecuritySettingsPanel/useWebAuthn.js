// frontend/src/components/SecuritySettingsPanel/useWebAuthn.js
// WebAuthn (Passkey / FIDO2) registration and management hook.
// Uses the native Web Authentication API (navigator.credentials) — zero extra deps.

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';

// ── Base64 ↔ ArrayBuffer utilities ────────────────────────────────────────────

/** Standard base64 string → Uint8Array */
function base64ToUint8Array(base64) {
    // Handle base64url (replace - and _)
    const b64 = base64.replace(/-/g, '+').replace(/_/g, '/');
    const binary = window.atob(b64);
    return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

/** ArrayBuffer / Uint8Array → standard base64 string */
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
}

// ── Hook ───────────────────────────────────────────────────────────────────────

const useWebAuthn = () => {
    const [credentials, setCredentials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [supported, setSupported] = useState(false);

    const apiBaseUrl = getApiBase();
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };
    const postHeaders = { ...headers, 'Content-Type': 'application/json' };

    // Check WebAuthn browser support
    useEffect(() => {
        setSupported(
            typeof window !== 'undefined' &&
            !!window.PublicKeyCredential &&
            !!navigator.credentials
        );
    }, []);

    // ── Fetch registered credentials ──────────────────────────────────────────
    const fetchCredentials = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiBaseUrl}/webauthn/credentials/`, { headers });
            if (!res.ok) throw new Error('Failed to load');
            const data = await res.json();
            setCredentials(data.credentials || []);
        } catch {
            // silently fail on load
        } finally {
            setLoading(false);
        }
    }, [apiBaseUrl, token]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchCredentials();
    }, [fetchCredentials]);

    // ── Register new passkey ───────────────────────────────────────────────────
    const registerPasskey = useCallback(async (deviceName = 'Security Key') => {
        if (!supported) {
            toast.error('❌ Tarayıcınız WebAuthn desteklemiyor');
            return;
        }
        setRegistering(true);
        try {
            // 1. Get challenge from backend
            const beginRes = await fetch(`${apiBaseUrl}/webauthn/register/begin/`, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify({}),
            });
            if (!beginRes.ok) {
                const err = await beginRes.json().catch(() => ({}));
                throw new Error(err.error || 'Kayıt başlatılamadı');
            }
            const options = await beginRes.json();

            // 2. Decode challenge & user.id from base64 → ArrayBuffer
            const publicKey = {
                ...options,
                challenge: base64ToUint8Array(options.challenge).buffer,
                user: {
                    ...options.user,
                    id: base64ToUint8Array(options.user.id).buffer,
                },
                // Exclude existing credentials if provided
                excludeCredentials: (options.excludeCredentials || []).map((c) => ({
                    ...c,
                    id: base64ToUint8Array(c.id).buffer,
                })),
            };

            // 3. Prompt browser native dialog (Touch ID / Windows Hello / YubiKey)
            const credential = await navigator.credentials.create({ publicKey });
            if (!credential) throw new Error('Credential oluşturulamadı');

            // 4. Encode response for backend
            const payload = {
                id: credential.id,
                rawId: arrayBufferToBase64(credential.rawId),
                type: credential.type,
                device_name: deviceName,
                response: {
                    clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
                    attestationObject: arrayBufferToBase64(credential.response.attestationObject),
                },
            };

            // 5. Complete registration
            const completeRes = await fetch(`${apiBaseUrl}/webauthn/register/complete/`, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify(payload),
            });
            const result = await completeRes.json();
            if (!completeRes.ok) throw new Error(result.error || 'Kayıt tamamlanamadı');

            toast.success('✅ Güvenlik anahtarı başarıyla eklendi!');
            fetchCredentials();
            return true;
        } catch (err) {
            if (err.name === 'NotAllowedError') {
                toast.info('ℹ️ Paskey kaydı iptal edildi');
            } else {
                toast.error(`❌ ${err.message || 'Passkey kaydı başarısız'}`);
            }
            return false;
        } finally {
            setRegistering(false);
        }
    }, [supported, apiBaseUrl, token, fetchCredentials]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Delete credential ──────────────────────────────────────────────────────
    const deleteCredential = useCallback(async (credentialId) => {
        try {
            const res = await fetch(
                `${apiBaseUrl}/webauthn/credentials/${credentialId}/delete/`,
                { method: 'DELETE', headers }
            );
            if (res.ok) {
                toast.success('✅ Güvenlik anahtarı kaldırıldı');
                fetchCredentials();
            } else {
                const err = await res.json().catch(() => ({}));
                toast.error(`❌ ${err.error || 'Silinemedi'}`);
            }
        } catch {
            toast.error('❌ Silme işlemi başarısız');
        }
    }, [apiBaseUrl, token, fetchCredentials]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        credentials,
        loading,
        registering,
        supported,
        registerPasskey,
        deleteCredential,
        refetch: fetchCredentials,
    };
};

export default useWebAuthn;
