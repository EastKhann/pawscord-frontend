// frontend/src/components/InviteCodeScreen.js
// 🔥 Invite code kafind ekranı - /#/invite/CODE formatı for

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';

function InviteCodeScreen({ inviteCode, fetchWithAuth, onClose, apiBaseUrl }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inviteInfo, setInviteInfo] = useState(null);
    const [joining, setJoining] = useState(false);

    useEffect(() => {
        loadInviteInfo();
    }, [inviteCode]);

    const loadInviteInfo = async () => {
        try {
            setLoading(true);
            setError(null);
            // GET /api/invites/<code>/ - ServerInvite bilgisini al
            const response = await fetch(`${apiBaseUrl}/invites/${inviteCode}/`);

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || t('ui.invite_not_found_or_suresi_dolmus'));
            }

            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                throw new Error('Invite not found');
            }

            const data = await response.json();
            setInviteInfo(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async () => {
        if (!inviteInfo) return;

        if (!fetchWithAuth) {
            toast.warning(t('ui.login_required_to_join'));
            // Daveti sakla, giriş sonrası işle
            sessionStorage.setItem('pending_invite', inviteCode);
            window.location.hash = '#/';
            return;
        }

        try {
            setJoining(true);
            // Vanity URL ise server join, değilse invite accept endpoint'ini kullan
            const isVanity = inviteInfo?.type === 'vanity';
            const url = isVanity
                ? `${apiBaseUrl}/servers/${inviteInfo.server.id}/join/`
                : `${apiBaseUrl}/invites/${inviteCode}/accept/`;
            const response = await fetchWithAuth(url, {
                method: 'POST',
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok || data.success) {
                toast.success(t('server.joined', { name: data.server_name || data.message || '' }));
                // Ana pageya git - page yenileme yok
                onClose();
            } else if (data.error && data.error.includes('zaten')) {
                toast.info(t('ui.zaten_bu_sunucudasiniz'));
                onClose();
            } else {
                throw new Error(data.error || 'Failed to join server');
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setJoining(false);
        }
    };

    // Alternatif: join_via_code endpoint'i with katıl (code gönder)
    const handleJoinViaCode = async () => {
        if (!fetchWithAuth) {
            toast.warning(t('ui.login_required_to_join_2'));
            sessionStorage.setItem('pending_invite', inviteCode);
            window.location.hash = '#/';
            return;
        }

        try {
            setJoining(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/invites/join/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: inviteCode }),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                toast.success(t('server.joined', { name: data.server_name || '' }));
                // Ana pageya git - page yenileme yok
                onClose();
            } else {
                throw new Error(data.error || 'Failed to join server');
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setJoining(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.loadingSpinner} />
                    <p style={styles.loadingText}>{t('invite.loading', 'Loading invite information...')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.errorIcon}>❌</div>
                    <h2 style={styles.errorTitle}>{t('invite.notFound', 'Invite Not Found')}</h2>
                    <p style={styles.errorText}>{error}</p>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        {t('invite.goHome', 'Go to Home')}
                    </button>
                </div>
            </div>
        );
    }

    const server = inviteInfo?.server;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Server İkonu */}
                <div style={styles.serverIconContainer}>
                    {server?.icon ? (
                        <img src={server.icon} alt={server?.name} style={styles.serverIcon} />
                    ) : (
                        <div style={styles.serverIconPlaceholder}>
                            {server?.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                    )}
                </div>

                {/* Davet Bilgisi */}
                <p style={styles.invitedBy}>
                    {t('invite.invitedBy', {
                        user: inviteInfo?.inviter?.username || t('invite.someone'),
                    })}
                </p>

                {/* Server Adı */}
                <h2 style={styles.serverName}>{server?.name || t('common.unknownServer')}</h2>

                {/* Member Sayısı */}
                <div style={styles.memberInfo}>
                    <span style={styles.memberCount}>👥 {server?.member_count || 0} member</span>
                </div>

                {/* Join Butonu */}
                <button
                    aria-label={t('invite.joinServer', 'Join server')}
                    onClick={handleAccept}
                    disabled={joining}
                    style={{
                        ...styles.joinButton,
                        opacity: joining ? 0.7 : 1,
                    }}
                >
                    {joining ? t('ui.joininiyor') : `✅ ${t('invite.joinServer')}`}
                </button>

                {/* Go Back */}
                <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.backButton}>
                    ← {t('common.back')}
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0d0e10 0%, #0d0e10 50%, #0f3460 100%)',
        padding: '20px',
    },
    card: {
        background: '#111214',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '440px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    },
    serverIconContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    serverIcon: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '3px solid #5865f2',
    },
    serverIconPlaceholder: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#fff',
    },
    invitedBy: {
        color: '#b5bac1',
        fontSize: '14px',
        marginBottom: '8px',
    },
    serverName: {
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '12px',
    },
    memberInfo: {
        marginBottom: '24px',
    },
    memberCount: {
        color: '#b5bac1',
        fontSize: '14px',
    },
    joinButton: {
        width: '100%',
        padding: '14px',
        background: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.2s',
        marginBottom: '12px',
    },
    backButton: {
        width: '100%',
        padding: '10px',
        background: 'transparent',
        color: '#b5bac1',
        border: '1px solid #4e5058',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer',
    },
    loadingSpinner: {
        width: '40px',
        height: '40px',
        border: '3px solid #4e5058',
        borderTop: '3px solid #5865f2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 16px',
    },
    loadingText: {
        color: '#b5bac1',
        fontSize: '16px',
    },
    errorIcon: {
        fontSize: '48px',
        marginBottom: '16px',
    },
    errorTitle: {
        color: '#fff',
        fontSize: '20px',
        marginBottom: '8px',
    },
    errorText: {
        color: '#b5bac1',
        fontSize: '14px',
        marginBottom: '20px',
    },
    closeButton: {
        padding: '12px 24px',
        background: '#4e5058',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer',
    },
};

InviteCodeScreen.propTypes = {
    inviteCode: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    onClose: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default InviteCodeScreen;
