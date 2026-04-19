import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/SecuritySettingsPanel/useWebAuthn.js
// WebAuthn (Passkey / FIDO2) registration and management hook.
// Uses the native Web Authentication API (navigator.credentials) — zero extra deps.

import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const [credentials, setCredentials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [supported, setSupported] = useState(false);

    const apiBaseUrl = getApiBase();
    const token = getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const postHeaders = { ...headers, 'Content-Type': 'application/json' };

    // Check WebAuthn browser support
    useEffect(() => {
        setSupported(
            typeof window !== 'undefined' && !!window.PublicKeyCredential && !!navigator.credentials
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
    }, [apiBaseUrl, token]); // fetchCredentials is defined below, not available as dep here

    useEffect(() => {
        fetchCredentials();
    }, [fetchCredentials]);

    // ── Register new passkey ───────────────────────────────────────────────────
    const registerPasskey = useCallback(
        async (deviceName = 'Security Key') => {
            if (!supported) {
                toast.error(t('security.webAuthnNotSupported'));
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
                    throw new Error(err.error || 'Recording could not be started');
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
                if (!credential) throw new Error('Credential could not be created');

                // 4. Encode response for backend
                const payload = {
                    id: credential.id,
                    rawId: arrayBufferToBase64(credential.rawId),
                    type: credential.type,
                    device_name: deviceName,
                    response: {
                        clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
                        attestationObject: arrayBufferToBase64(
                            credential.response.attestationObject
                        ),
                    },
                };

                // 5. Complete registration
                const completeRes = await fetch(`${apiBaseUrl}/webauthn/register/complete/`, {
                    method: 'POST',
                    headers: postHeaders,
                    body: JSON.stringify(payload),
                });
                const result = await completeRes.json();
                if (!completeRes.ok)
                    throw new Error(result.error || 'Recording could not be confirmed');

                toast.success(t('security.passkeyAdded'));
                fetchCredentials();
                return true;
            } catch (err) {
                if (err.name === 'NotAllowedError') {
                    toast.info(t('webauthn.registrationCancelled'));
                } else {
                    toast.error(err.message || t('webAuthn.registrationFailed'));
                }
                return false;
            } finally {
                setRegistering(false);
            }
        },
        [supported, apiBaseUrl, token, fetchCredentials]
    ); // postHeaders derived from token, not a separate dep

    // ── Delete credential ──────────────────────────────────────────────────────
    const deleteCredential = useCallback(
        async (credentialId) => {
            try {
                const res = await fetch(
                    `${apiBaseUrl}/webauthn/credentials/${credentialId}/delete/`,
                    { method: 'DELETE', headers }
                );
                if (res.ok) {
                    toast.success(t('security.passkeyRemoved'));
                    fetchCredentials();
                } else {
                    const err = await res.json().catch(() => ({}));
                    toast.error(err.error || t('webAuthn.deleteFailed'));
                }
            } catch {
                toast.error(t('security.passkeyDeleteFailed'));
            }
        },
        [apiBaseUrl, token, fetchCredentials]
    ); // headers derived from token, not a separate dep

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
