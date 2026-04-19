// frontend/src/InvitePage.js

import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FaServer, FaUsers, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { API_BASE_URL, PRODUCTION_URL } from '../utils/constants';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import logger from '../utils/logger';

const InvitePage = () => {
    const { t } = useTranslation();
    const { code } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, token } = useAuth();

    const [inviteInfo, setInviteInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [joining, setJoining] = useState(false);
    const [joined, setJoined] = useState(false);

    // API URL logic - use centralized constants
    // (PRODUCTION_URL used for display/share links, API_BASE_URL for API calls)

    useEffect(() => {
        fetchInviteInfo();
    }, [code]);

    const fetchInviteInfo = async () => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BASE_URL}/invites/${code}/`);

            // 🛡️ HTML response koruması (Cloudflare/nginx 404 pagesı olabilir)
            const contentType = res.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                logger.error('❌ [Invite Page] Non-JSON response:', contentType);
                setError('Davet bulunamadı veya geçersiz');
                setLoading(false);
                return;
            }

            const data = await res.json();

            if (res.ok) {
                setInviteInfo(data);
            } else {
                setError(data.error || 'Davet bulunamadı');
                logger.error('❌ [Invite Page] Error:', data.error);
            }
        } catch (err) {
            logger.error('❌ [Invite Page] Network error:', err);
            setError(t('errors.connection_error'));
        }
        setLoading(false);
    };

    const handleAccept = async () => {
        if (!isAuthenticated) {
            toast.error(t('invite.loginRequired'));
            sessionStorage.setItem('pending_invite', code);
            navigate('/');
            return;
        }

        if (!token) {
            logger.error('❌ [Invite Page] No token found!');
            toast.error(t('invite.tokenNotFound'));
            navigate('/');
            return;
        }

        setJoining(true);
        setError('');

        try {
            // Vanity URL ise server join endpoint'ini, değilse invite accept endpoint'ini kullan
            const isVanity = inviteInfo?.type === 'vanity';
            const url = isVanity
                ? `${API_BASE_URL}/servers/${inviteInfo.server.id}/join/`
                : `${API_BASE_URL}/invites/${code}/accept/`;

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(t('invite.joinSuccess', { server: data.server_name || 'Server' }));
                setJoined(true);

                // Backend'den redirect URL geliyorsa ona, yoksa ana pageya yönlendir
                const redirectUrl = data.redirect || '/';

                setTimeout(() => {
                    if (redirectUrl.startsWith('http')) {
                        // External URL (ör: https://pawscord.com)
                        window.location.href = redirectUrl;
                    } else {
                        // Internal route (ör: /)
                        navigate(redirectUrl);
                    }
                }, 2000);
            } else {
                const errorMsg = data.error || data.message || 'Error joining server';
                logger.error('❌ [Invite Page] Join failed:', errorMsg, data);
                setError(errorMsg);
                toast.error(errorMsg);
            }
        } catch (err) {
            logger.error('❌ [Invite Page] Exception:', err);
            const errorMsg = err.message || 'Connection error';
            setError(errorMsg);
            toast.error(errorMsg);
        }
        setJoining(false);
    };

    if (loading) {
        return (
            <div aria-label="invite page" style={styles.container}>
                <div style={styles.backgroundGradient}></div>
                <div style={styles.card}>
                    <div style={styles.spinner}></div>
                    <p style={styles.loadingText}>Davet yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.backgroundGradient}></div>
                <div style={styles.card}>
                    <FaTimesCircle size={64} color="var(--error)" />
                    <h2 style={styles.errorTitle}>{t('common.error')}</h2>
                    <p style={styles.errorText}>{error}</p>
                    <button onClick={() => navigate('/')} style={styles.homeButton}>
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    if (joined) {
        return (
            <div style={styles.container}>
                <div style={styles.backgroundGradient}></div>
                <div style={styles.card}>
                    <FaCheckCircle size={64} color="var(--success)" />
                    <h2 style={styles.successTitle}>Successful!</h2>
                    <p style={styles.successText}>
                        <strong>{inviteInfo.server.name}</strong> !
                    </p>
                    <p style={styles.redirectText}>Redirecting to homepage...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.backgroundGradient}></div>
            <div style={styles.card}>
                {inviteInfo.server.icon && (
                    <img
                        src={inviteInfo.server.icon}
                        alt={inviteInfo.server.name}
                        style={styles.serverIcon}
                    />
                )}

                <h1 style={styles.serverName}>
                    <FaServer style={styles.icon} />
                    {inviteInfo.server.name}
                </h1>

                <div style={styles.infoRow}>
                    <FaUsers style={styles.infoIcon} />
                    <span>{inviteInfo.server.member_count} Member</span>
                </div>

                {inviteInfo.expires_at && (
                    <div style={styles.infoRow}>
                        <FaClock style={styles.infoIcon} />
                        <span>
                            Duration: {new Date(inviteInfo.expires_at).toLocaleString('tr-TR')}
                        </span>
                    </div>
                )}

                {inviteInfo.max_uses > 0 && (
                    <div style={styles.infoRow}>
                        <span>
                            Kullanım: {inviteInfo.uses} / {inviteInfo.max_uses}
                        </span>
                    </div>
                )}

                <div style={styles.inviterInfo}>
                    Davet Eden: <strong>{inviteInfo.inviter.username}</strong>
                </div>

                <button
                    onClick={handleAccept}
                    disabled={joining}
                    style={{
                        ...styles.joinButton,
                        ...(joining ? styles.joinButtonDisabled : {}),
                    }}
                >
                    {joining ? 'Joining...' : !isAuthenticated ? 'Login ve Join' : 'Join Server'}
                </button>

                {!isAuthenticated && (
                    <p style={styles.loginHint}>* Serverya katılmak for giriş yapmanız gerekiyor</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'var(--bg-app)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
            'radial-gradient(ellipse at top, rgba(88, 101, 242, 0.15), transparent 50%), radial-gradient(ellipse at bottom, rgba(118, 75, 162, 0.15), transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0,
    },
    card: {
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        padding: '48px',
        borderRadius: 'var(--radius-2xl)',
        textAlign: 'center',
        color: 'var(--text-primary)',
        maxWidth: '560px',
        width: '100%',
        boxShadow: 'var(--shadow-2xl)',
        border: '1px solid var(--glass-border)',
        position: 'relative',
        zIndex: 1,
        animation: 'scaleIn 0.4s ease-out',
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '3px solid var(--glass-border)',
        borderTop: '3px solid var(--brand-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        margin: '0 auto',
    },
    loadingText: {
        marginTop: '24px',
        color: 'var(--text-tertiary)',
        fontSize: '15px',
        fontWeight: 500,
    },
    serverIcon: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        marginBottom: '24px',
        objectFit: 'cover',
        border: '2px solid var(--glass-border)',
        boxShadow: '0 0 0 4px rgba(88,101,242,0.15), 0 8px 24px rgba(0,0,0,0.3)',
        transition: 'var(--transition-normal)',
    },
    serverName: {
        fontSize: '32px',
        fontWeight: 800,
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    icon: {
        fontSize: '28px',
        color: 'var(--brand-primary)',
    },
    infoRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        margin: '16px 0',
        color: 'var(--text-secondary)',
        fontSize: '16px',
        fontWeight: 500,
        padding: '12px 20px',
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
    },
    infoIcon: {
        fontSize: '20px',
        color: 'var(--brand-primary)',
    },
    inviterInfo: {
        marginTop: '24px',
        marginBottom: '32px',
        color: 'var(--text-tertiary)',
        fontSize: '14px',
        padding: '16px',
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
    },
    joinButton: {
        background: 'var(--gradient-primary)',
        color: 'white',
        border: 'none',
        padding: '16px 32px',
        borderRadius: '13px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 700,
        marginTop: '16px',
        width: '100%',
        transition: 'var(--transition-normal)',
        boxShadow: '0 4px 0 rgba(59,69,199,0.8), 0 8px 24px rgba(88,101,242,0.40)',
        position: 'relative',
        overflow: 'hidden',
    },
    joinButtonDisabled: {
        background: 'var(--bg-tertiary)',
        cursor: 'not-allowed',
        opacity: 0.6,
        boxShadow: 'none',
    },
    loginHint: {
        marginTop: '20px',
        fontSize: '13px',
        color: 'var(--warning)',
        fontStyle: 'italic',
        fontWeight: 500,
    },
    errorTitle: {
        color: 'var(--error)',
        marginTop: '24px',
        fontSize: '28px',
        fontWeight: 700,
    },
    errorText: {
        color: 'var(--text-tertiary)',
        margin: '24px 0',
        fontSize: '15px',
        lineHeight: 1.6,
    },
    successTitle: {
        color: 'var(--success)',
        marginTop: '24px',
        fontSize: '28px',
        fontWeight: 700,
    },
    successText: {
        color: 'var(--text-primary)',
        margin: '24px 0',
        fontSize: '18px',
        fontWeight: 600,
    },
    redirectText: {
        color: 'var(--text-tertiary)',
        fontSize: '14px',
        marginTop: '12px',
        fontStyle: 'italic',
    },
    homeButton: {
        background: 'rgba(255,255,255,0.06)',
        color: 'var(--text-primary)',
        border: '1px solid rgba(255,255,255,0.10)',
        padding: '14px 28px',
        borderRadius: '13px',
        cursor: 'pointer',
        fontSize: '15px',
        fontWeight: 600,
        marginTop: '24px',
        transition: 'var(--transition-normal)',
        backdropFilter: 'blur(12px)',
    },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.92) translateY(12px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
`;
document.head.appendChild(styleSheet);

InvitePage.propTypes = {};

export default InvitePage;
