import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function VanityInviteScreen({ vanityPath, fetchWithAuth, onClose, apiBaseUrl }) {
    const { t } = useTranslation();
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
                throw new Error('Server not found');
            }

            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                throw new Error('Server not found');
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

        // Entry yapmamış kullanıcıları login pagesına yönlendir
        if (!fetchWithAuth) {
            toast.warning(t('ui.login_required_to_join_3'));
            window.location.hash = '#/';
            return;
        }

        try {
            setJoining(true);
            const response = await fetchWithAuth(
                `${apiBaseUrl}/servers/${serverInfo.server_id}/join/`,
                {
                    method: 'POST',
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage =
                    errorData.error || errorData.message || 'Failed to join server';
                throw new Error(errorMessage);
            }

            // Successfully joined
            toast.success(t('server.joined', { name: serverInfo.server_name }));

            // Redirect to home after joining
            if (onClose) onClose();
            else window.location.hash = '#/';
        } catch (err) {
            // Show error via toast
            if (err.message.includes('already')) {
                toast.info(t('ui.zaten_bu_sunucudasiniz_2'));
            } else {
                toast.error(t('common.errorPrefix') + ': ' + err.message);
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
                    <h1 style={styles.errorTitle}>❌ Find Serverunamadı</h1>
                    <p style={styles.errorText}>{error}</p>
                    <button
                        aria-label="Action button"
                        style={styles.backButton}
                        onClick={() => {
                            if (onClose) onClose();
                            else window.location.hash = '#/';
                        }}
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Server Avatar */}
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

                {/* Server Adı */}
                <h1 style={styles.serverName}>{serverInfo.server_name}</h1>

                {/* Davet Eden */}
                <p style={styles.inviteText}>
                    seni <strong>{serverInfo.server_name}</strong> sunucusuna davet etti
                </p>

                {/* Member Saiları */}
                <div style={styles.statsContainer}>
                    <div style={styles.stat}>
                        <span style={styles.onlineDot}>●</span>
                        <span style={styles.statText}>
                            <strong>{serverInfo.online_count}</strong> Online
                        </span>
                    </div>
                    <div style={styles.stat}>
                        <span style={styles.memberDot}>●</span>
                        <span style={styles.statText}>
                            <strong>{serverInfo.member_count}</strong> Member
                        </span>
                    </div>
                </div>

                {/* Join Butonu */}
                <button
                    aria-label="handle Join"
                    style={{
                        ...styles.joinButton,
                        ...(joining ? styles.joinButtonDisabled : {}),
                    }}
                    onClick={handleJoin}
                    disabled={joining}
                >
                    {joining
                        ? t('ui.joininiyor_2')
                        : t('vanity.joinServer', { name: serverInfo.server_name })}
                </button>

                {/* Vanity URL Bilgisi */}
                <p style={styles.vanityInfo}>pawscord.com/join/{serverInfo.vanity_path}</p>
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
        background: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)',
        padding: '20px',
        overflow: 'auto',
    },
    card: {
        backgroundColor: '#17191c',
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
        color: '#b5bac1',
        marginBottom: '25px',
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        marginBottom: '30px',
        padding: '15px',
        backgroundColor: '#111214',
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
        color: '#80848e',
        fontSize: '12px',
    },
    statText: {
        color: '#b5bac1',
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
        color: '#949ba4',
        marginTop: '10px',
    },
    loadingSpinner: {
        fontSize: '48px',
        marginBottom: '20px',
        animation: 'spin 1s linear infinite',
    },
    loadingText: {
        color: '#b5bac1',
        fontSize: '16px',
    },
    errorTitle: {
        fontSize: '24px',
        color: '#f23f42',
        marginBottom: '15px',
    },
    errorText: {
        color: '#b5bac1',
        marginBottom: '20px',
    },
    backButton: {
        padding: '12px 24px',
        backgroundColor: '#4e5058',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer',
    },
};

VanityInviteScreen.propTypes = {
    vanityPath: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    onClose: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default VanityInviteScreen;
