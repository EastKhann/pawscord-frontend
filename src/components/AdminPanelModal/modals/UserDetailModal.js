import React, { useCallback, memo } from 'react';
import { FaBan, FaCheckCircle, FaEdit, FaEnvelope, FaExclamationTriangle, FaImage, FaKey, FaLock, FaStar, FaTrash } from 'react-icons/fa';
import styles from '../styles';
import useModalA11y from '../../../hooks/useModalA11y';

const UserDetailModal = ({
    handleUserAction,
    openEditUserModal,
    selectedUser,
    setActionModal,
    setPasswordResetModal,
    setSelectedUser
}) => {
    const onClose = useCallback(() => setSelectedUser(null), [setSelectedUser]);
    const { modalRef, overlayProps, dialogProps } = useModalA11y({ onClose, label: 'User Detail' });
    const handleEditUser = useCallback(() => { openEditUserModal(selectedUser); setSelectedUser(null); }, [openEditUserModal, selectedUser, setSelectedUser]);
    const handlePasswordReset = useCallback(() => { setPasswordResetModal(selectedUser); setSelectedUser(null); }, [setPasswordResetModal, selectedUser, setSelectedUser]);
    const handleWarn = useCallback(() => handleUserAction('warn', selectedUser.id), [handleUserAction, selectedUser?.id]);
    const handleReset2FA = useCallback(() => handleUserAction('reset_2fa', selectedUser.id), [handleUserAction, selectedUser?.id]);
    const handleVerifyEmail = useCallback(() => handleUserAction('verify_email', selectedUser.id), [handleUserAction, selectedUser?.id]);
    const handleGivePremium = useCallback(() => handleUserAction('give_premium', selectedUser.id), [handleUserAction, selectedUser?.id]);
    const handleRemovePremium = useCallback(() => handleUserAction('remove_premium', selectedUser.id), [handleUserAction, selectedUser?.id]);
    const handleForceLogout = useCallback(() => handleUserAction('force_logout', selectedUser.id), [handleUserAction, selectedUser?.id]);
    const handleResetAvatar = useCallback(() => handleUserAction('reset_avatar', selectedUser.id), [handleUserAction, selectedUser?.id]);
    const handleBan = useCallback(() => setActionModal({ type: 'ban', user: selectedUser }), [setActionModal, selectedUser]);
    const handleUnban = useCallback(() => handleUserAction('unban', selectedUser.id), [handleUserAction, selectedUser?.id]);
    const handleDelete = useCallback(() => setActionModal({ type: 'delete', user: selectedUser }), [setActionModal, selectedUser]);
    return (
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 10
        }} {...overlayProps}>
            <div style={{
                backgroundColor: '#1a1a1e', borderRadius: '12px',
                padding: '24px', width: '550px', maxHeight: '80vh', overflowY: 'auto',
                border: '1px solid #2a2a2e'
            }} {...dialogProps}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                    <div style={{
                        width: '64px', height: '64px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #5865f2, #7c3aed)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: '700', fontSize: '24px'
                    }}>
                        {selectedUser.username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 style={{ color: '#fff', margin: 0, fontSize: '20px' }}>{selectedUser.username}</h3>
                        <div style={{ color: '#6b7280', fontSize: '13px' }}>{selectedUser.email}</div>
                        <div style={{ color: '#5865f2', fontSize: '14px', fontFamily: 'monospace', marginTop: '4px' }}>
                            🎫 #{selectedUser.friend_code || 'N/A'}
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {selectedUser.is_staff && <span style={styles.badge('#e74c3c')}>👑 Admin</span>}
                        {selectedUser.is_premium && <span style={styles.badge('#ffd700')}>⭐ Premium</span>}
                        {selectedUser.is_whitelisted && <span style={styles.badge('#9b59b6')}>💎 Whitelist</span>}
                        {selectedUser.has_spotify && <span style={styles.badge('#1db954')}>🎵 Spotify</span>}
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px',
                    padding: '16px', backgroundColor: '#2a2a2e', borderRadius: '10px'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#23a559' }}>{selectedUser.level || 1}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>Seviye</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#5865f2' }}>{(selectedUser.xp || 0).toLocaleString()}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>XP</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#ffd700' }}>{(selectedUser.coins || 0).toLocaleString()}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>Coin</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#f0b132' }}>{(selectedUser.total_messages || 0).toLocaleString()}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>Mesaj</div>
                    </div>
                </div>

                {/* Detail Grid */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px',
                    fontSize: '13px'
                }}>
                    <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                        <span style={{ color: '#6b7280' }}>🆔 ID:</span>
                        <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.id}</span>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                        <span style={{ color: '#6b7280' }}>📅 Kayıt:</span>
                        <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.created?.split('T')[0]}</span>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                        <span style={{ color: '#6b7280' }}>🏠 Sunucu:</span>
                        <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.servers_joined || 0}</span>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                        <span style={{ color: '#6b7280' }}>👥 Arkadaş:</span>
                        <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.friends_count || 0}</span>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                        <span style={{ color: '#6b7280' }}>🕐 Son Giriş:</span>
                        <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.last_login?.split('T')[0] || 'N/A'}</span>
                    </div>
                    <div style={{ padding: '10px', backgroundColor: '#2a2a2e', borderRadius: '8px' }}>
                        <span style={{ color: '#6b7280' }}>👁️ Son Görülme:</span>
                        <span style={{ color: '#fff', marginLeft: '8px' }}>{selectedUser.last_seen?.split('T')[0] || 'N/A'}</span>
                    </div>
                </div>

                {/* Status Message */}
                {selectedUser.status_message && (
                    <div style={{ padding: '12px', backgroundColor: '#2a2a2e', borderRadius: '8px', marginBottom: '20px' }}>
                        <div style={{ color: '#6b7280', fontSize: '11px', marginBottom: '4px' }}>📝 Durum Mesajı</div>
                        <div style={{ color: '#fff', fontSize: '14px' }}>"{selectedUser.status_message}"</div>
                    </div>
                )}

                {/* Social Links */}
                {selectedUser.social_links && Object.keys(selectedUser.social_links).length > 0 && (
                    <div style={{ padding: '12px', backgroundColor: '#2a2a2e', borderRadius: '8px', marginBottom: '20px' }}>
                        <div style={{ color: '#6b7280', fontSize: '11px', marginBottom: '8px' }}>🔗 Sosyal Bağlantılar</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {Object.entries(selectedUser.social_links).map(([key, value]) => (
                                value && <span key={key} style={{ ...styles.badge('#5865f2'), fontSize: '12px' }}>
                                    {key}: {value}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button style={styles.actionBtn('#5865f2')} onClick={handleEditUser}>
                        <FaEdit /> Düzenle
                    </button>
                    <button style={styles.actionBtn('#f59e0b')} onClick={handlePasswordReset}>
                        <FaKey /> Şifre Değiştir
                    </button>
                    <button style={styles.actionBtn('#f0b132')} onClick={handleWarn}>
                        <FaExclamationTriangle /> Uyar
                    </button>
                    <button style={styles.actionBtn('#8b5cf6')} onClick={handleReset2FA}>
                        <FaLock /> 2FA Sıfırla
                    </button>
                    <button style={styles.actionBtn('#06b6d4')} onClick={handleVerifyEmail}>
                        <FaEnvelope /> Email Doğrula
                    </button>
                    <button style={styles.actionBtn('#10b981')} onClick={handleGivePremium}>
                        <FaStar /> Premium Ver
                    </button>
                    <button style={styles.actionBtn('#ec4899')} onClick={handleRemovePremium}>
                        <FaStar /> Premium Kaldır
                    </button>
                    <button style={styles.actionBtn('#6366f1')} onClick={handleForceLogout}>
                        <FaLock /> Oturumu Sonlandır
                    </button>
                    <button style={styles.actionBtn('#f97316')} onClick={handleResetAvatar}>
                        <FaImage /> Avatar Sıfırla
                    </button>
                    {selectedUser.is_active !== false ? (
                        <button style={styles.actionBtn('#e74c3c')} onClick={handleBan}>
                            <FaBan /> Yasakla
                        </button>
                    ) : (
                        <button style={styles.actionBtn('#23a559')} onClick={handleUnban}>
                            <FaCheckCircle /> Yasağı Kaldır
                        </button>
                    )}
                    <button style={styles.actionBtn('#dc2626')} onClick={handleDelete}>
                        <FaTrash /> Kullanıcıyı Sil
                    </button>
                    <button style={{ ...styles.actionBtn('#6b7280'), marginLeft: 'auto' }} onClick={() => setSelectedUser(null)}>
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(UserDetailModal);
