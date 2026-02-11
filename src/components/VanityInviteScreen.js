import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function VanityInviteScreen({ vanityPath, fetchWithAuth, onClose, apiBaseUrl }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [serverInfo, setServerInfo] = useState(null);
    const [joining, setJoining] = useState(false);

    useEffect(() => {
        loadServerInfo();
    }, [vanityPath]);

    const loadServerInfo = async () => {
        try {
            setLoading(true);
            // Fast endpoint: /api/vanity/<path>/ (select_related, no Session scan)
            const response = await fetch(`${apiBaseUrl}/vanity/${vanityPath}/`);

            if (!response.ok) {
                throw new Error('Sunucu bulunamadı');
            }

            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                throw new Error('Sunucu bulunamadı');
            }

            const data = await response.json();
            setServerInfo(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async () => {
        if (!serverInfo) return;

        // Giriş yapmamış kullanıcıları login sayfasına yönlendir
        if (!fetchWithAuth) {
            toast.warning('🔐 Sunucuya katılmak için giriş yapmalısınız!');
            window.location.hash = '#/';
            return;
        }

        try {
            setJoining(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverInfo.server_id}/join/`, {
                method: 'POST',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || errorData.message || 'Sunucuya katılınamadı';
                throw new Error(errorMessage);
            }

            // Başarılı katılım mesajı
            toast.success(`✅ ${serverInfo.server_name} sunucusuna katıldınız!`);

            // Sunucuya katıldıktan sonra ana sayfaya dön
            if (onClose) onClose();
            else window.location.hash = '#/';
        } catch (err) {
            // Hata mesajını toast ile göster
            if (err.message.includes('zaten')) {
                toast.info('ℹ️ Zaten bu sunucudasınız!');
            } else {
                toast.error('❌ ' + err.message);
            }
        } finally {
            setJoining(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.loadingSpinner}>🔄</div>
                    <p style={styles.loadingText}>Sunucu bilgileri yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={styles.errorTitle}>❌ Sunucu Bulunamadı</h1>
                    <p style={styles.errorText}>{error}</p>
                    <button
                        style={styles.backButton}
                        onClick={() => {
                            if (onClose) onClose();
                            else window.location.hash = '#/';
                        }}
                    >
                        Ana Sayfaya Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Sunucu Avatar */}
                <div style={styles.avatarContainer}>
                    {serverInfo.server_avatar ? (
                        <img
                            src={serverInfo.server_avatar}
                            alt={serverInfo.server_name}
                            style={styles.avatar}
                        />
                    ) : (
                        <div style={styles.defaultAvatar}>
                            {serverInfo.server_name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Sunucu Adı */}
                <h1 style={styles.serverName}>{serverInfo.server_name}</h1>

                {/* Davet Eden */}
                <p style={styles.inviteText}>
                    seni <strong>{serverInfo.server_name}</strong> sunucusuna davet etti
                </p>

                {/* Üye Sayıları */}
                <div style={styles.statsContainer}>
                    <div style={styles.stat}>
                        <span style={styles.onlineDot}>●</span>
                        <span style={styles.statText}>
                            <strong>{serverInfo.online_count}</strong> Çevrimiçi
                        </span>
                    </div>
                    <div style={styles.stat}>
                        <span style={styles.memberDot}>●</span>
                        <span style={styles.statText}>
                            <strong>{serverInfo.member_count}</strong> Üye
                        </span>
                    </div>
                </div>

                {/* Katıl Butonu */}
                <button
                    style={{
                        ...styles.joinButton,
                        ...(joining ? styles.joinButtonDisabled : {})
                    }}
                    onClick={handleJoin}
                    disabled={joining}
                >
                    {joining ? 'Katılınıyor...' : `${serverInfo.server_name} Sunucusuna Katıl`}
                </button>

                {/* Vanity URL Bilgisi */}
                <p style={styles.vanityInfo}>
                    pawscord.com/join/{serverInfo.vanity_path}
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        overflow: 'auto',
    },
    card: {
        backgroundColor: '#36393f',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '450px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    avatar: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '4px solid #5865f2',
    },
    defaultAvatar: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#fff',
        border: '4px solid #4752c4',
    },
    serverName: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '10px',
    },
    inviteText: {
        fontSize: '16px',
        color: '#b9bbbe',
        marginBottom: '25px',
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        marginBottom: '30px',
        padding: '15px',
        backgroundColor: '#2f3136',
        borderRadius: '8px',
    },
    stat: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    onlineDot: {
        color: '#3ba55d',
        fontSize: '12px',
    },
    memberDot: {
        color: '#747f8d',
        fontSize: '12px',
    },
    statText: {
        color: '#b9bbbe',
        fontSize: '14px',
    },
    joinButton: {
        width: '100%',
        padding: '15px',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s',
        marginBottom: '15px',
    },
    joinButtonDisabled: {
        backgroundColor: '#4752c4',
        cursor: 'not-allowed',
        opacity: 0.6,
    },
    vanityInfo: {
        fontSize: '12px',
        color: '#72767d',
        marginTop: '10px',
    },
    loadingSpinner: {
        fontSize: '48px',
        marginBottom: '20px',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        color: '#b9bbbe',
        fontSize: '16px',
    },
    errorTitle: {
        fontSize: '24px',
        color: '#ed4245',
        marginBottom: '15px',
    },
    errorText: {
        color: '#b9bbbe',
        marginBottom: '20px',
    },
    backButton: {
        padding: '12px 24px',
        backgroundColor: '#4f545c',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer',
    },
};

export default VanityInviteScreen;
