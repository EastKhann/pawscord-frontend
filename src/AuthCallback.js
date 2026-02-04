import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from './AuthContext';
import api from './api';
import './AuthCallback.css';

/**
 * 🔐 Auth Callback Page
 * Handles OAuth callback with secure auth code exchange
 * Tokens are NOT passed in URL - instead a short-lived code is exchanged
 */
const AuthCallback = ({ apiBaseUrl }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [status, setStatus] = useState('processing');
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get('code');
            const errorParam = searchParams.get('error');
            const needsPassword = searchParams.get('needs_password') === 'true';

            console.log('🔐 [AuthCallback] Starting...', { code: code?.substring(0, 10) + '...', apiBaseUrl });

            // Check for error
            if (errorParam) {
                console.error('🔐 [AuthCallback] Error param:', errorParam);
                setStatus('error');
                setError('Google giriş başarısız oldu. Lütfen tekrar deneyin.');
                setTimeout(() => navigate('/'), 3000);
                return;
            }

            // Check for auth code
            if (!code) {
                console.error('🔐 [AuthCallback] No code found');
                setStatus('error');
                setError('Yetkilendirme kodu bulunamadı.');
                setTimeout(() => navigate('/'), 3000);
                return;
            }

            try {
                setStatus('exchanging');
                
                const exchangeUrl = `${apiBaseUrl}/api/auth/exchange-code/`;
                console.log('🔐 [AuthCallback] Exchanging code at:', exchangeUrl);

                // Exchange auth code for tokens (secure exchange)
                const response = await api.post(exchangeUrl, {
                    code: code
                });
                
                console.log('🔐 [AuthCallback] Response:', response.data);

                if (response.data.success) {
                    const { access_token, refresh_token, user_id, needs_password } = response.data;

                    // Store tokens securely
                    localStorage.setItem('accessToken', access_token);
                    localStorage.setItem('refreshToken', refresh_token);

                    // Update auth context
                    if (login) {
                        await login(access_token, refresh_token);
                    }

                    setStatus('success');

                    // Redirect based on password status
                    if (needs_password) {
                        // User needs to set a password (new Google user)
                        setTimeout(() => {
                            navigate('/settings?section=security&action=set-password');
                        }, 1500);
                    } else {
                        // Existing user, go to main app
                        setTimeout(() => {
                            navigate('/');
                        }, 1500);
                    }
                } else {
                    throw new Error(response.data.error || 'Token exchange failed');
                }
            } catch (err) {
                console.error('Auth callback error:', err);
                setStatus('error');
                setError(err.response?.data?.error || 'Giriş işlemi başarısız oldu.');
                setTimeout(() => navigate('/'), 3000);
            }
        };

        handleCallback();
    }, [searchParams, navigate, login, apiBaseUrl]);

    return (
        <div className="auth-callback-container">
            <div className="auth-callback-card">
                {status === 'processing' && (
                    <>
                        <div className="auth-spinner"></div>
                        <h2>İşleniyor...</h2>
                        <p>Google hesabınız doğrulanıyor</p>
                    </>
                )}

                {status === 'exchanging' && (
                    <>
                        <div className="auth-spinner"></div>
                        <h2>Giriş Yapılıyor...</h2>
                        <p>Güvenli bağlantı kuruluyor</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="auth-success-icon">✓</div>
                        <h2>Giriş Başarılı!</h2>
                        <p>Yönlendiriliyorsunuz...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="auth-error-icon">✕</div>
                        <h2>Hata</h2>
                        <p>{error}</p>
                        <p className="auth-redirect-text">Ana sayfaya yönlendiriliyorsunuz...</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthCallback;
