// frontend/src/components/InviteCodeScreen.js
// 🔥 Invite code kabul ekranı - /#/invite/CODE formatı için

import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';

function InviteCodeScreen({ inviteCode, fetchWithAuth, onClose, apiBaseUrl }) {
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
            // GET /api/invites/<code>/ - ServerInvite bilgilerini al
            const response = await fetch(`${apiBaseUrl}/invites/${inviteCode}/`);

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Davet bulunamadı veya süresi dolmuş');
            }

            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                throw new Error('Davet bulunamadı');
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
            toast.warning('🔐 Sunucuya katılmak için giriş yapmalısınız!');
            // Daveti sakla, giriş sonrası işle
            sessionStorage.setItem('pending_invite', inviteCode);
            window.location.hash = '#/';
            return;
        }

        try {
            setJoining(true);
            // POST /api/invites/<code>/accept/ - Daveti kabul et
            const response = await fetchWithAuth(`${apiBaseUrl}/invites/${inviteCode}/accept/`, {
                method: 'POST',
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok || data.success) {
                toast.success(`✅ ${data.server_name || data.message || 'Sunucuya katıldınız!'}`);
                // Ana sayfaya git
                window.location.hash = '#/';
                setTimeout(() => window.location.reload(), 200);
            } else if (data.error && data.error.includes('zaten')) {
                toast.info('ℹ️ Zaten bu sunucudasınız!');
                onClose();
            } else {
                throw new Error(data.error || 'Sunucuya katılınamadı');
            }
        } catch (err) {
            toast.error('❌ ' + err.message);
        } finally {
            setJoining(false);
        }
    };

    // Alternatif: join_via_code endpoint'i ile katıl (code gönder)
    const handleJoinViaCode = async () => {
        if (!fetchWithAuth) {
            toast.warning('🔐 Sunucuya katılmak için giriş yapmalısınız!');
            sessionStorage.setItem('pending_invite', inviteCode);
            window.location.hash = '#/';
            return;
        }

        try {
            setJoining(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/invites/join/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: inviteCode })
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                toast.success(`✅ ${data.server_name ? `"${data.server_name}" sunucusuna katıldınız!` : 'Sunucuya katıldınız!'}`);
                window.location.hash = '#/';
                setTimeout(() => window.location.reload(), 200);
            } else {
                throw new Error(data.error || 'Sunucuya katılınamadı');
            }
        } catch (err) {
            toast.error('❌ ' + err.message);
        } finally {
            setJoining(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.loadingSpinner} />
                    <p style={styles.loadingText}>Davet bilgileri yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.errorIcon}>❌</div>
                    <h2 style={styles.errorTitle}>Davet Bulunamadı</h2>
                    <p style={styles.errorText}>{error}</p>
                    <button onClick={onClose} style={styles.closeButton}>
                        Ana Sayfaya Dön
                    </button>
                </div>
            </div>
        );
    }

    const server = inviteInfo?.server;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Sunucu İkonu */}
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
                    {inviteInfo?.inviter?.username || 'Birisi'} seni davet ediyor:
                </p>

                {/* Sunucu Adı */}
                <h2 style={styles.serverName}>{server?.name || 'Bilinmeyen Sunucu'}</h2>

                {/* Üye Sayısı */}
                <div style={styles.memberInfo}>
                    <span style={styles.memberCount}>
                        👥 {server?.member_count || 0} üye
                    </span>
                </div>

                {/* Katıl Butonu */}
                <button
                    onClick={handleAccept}
                    disabled={joining}
                    style={{
                        ...styles.joinButton,
                        opacity: joining ? 0.7 : 1,
                    }}
                >
                    {joining ? '⏳ Katılınıyor...' : '✅ Sunucuya Katıl'}
                </button>

                {/* Geri Dön */}
                <button onClick={onClose} style={styles.backButton}>
                    ← Geri Dön
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
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        padding: '20px',
    },
    card: {
        background: '#2b2d31',
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

export default InviteCodeScreen;
