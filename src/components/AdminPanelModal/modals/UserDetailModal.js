import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
    FaBan,
    FaCheckCircle,
    FaEdit,
    FaEnvelope,
    FaExclamationTriangle,
    FaImage,
    FaKey,
    FaLock,
    FaStar,
    FaTrash,
} from 'react-icons/fa';
import styles from '../styles';
import useModalA11y from '../../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';
import css from '../tabs/AdminTabs.module.css';

// -- dynamic style helpers (pass 2) --

const S = {
    grid2: {
        display: 'grid',
        gap: '12px',
        marginBottom: '20px',
        fontSize: '13px',
    },
    grid: {
        display: 'grid',
        gap: '12px',
        marginBottom: '20px',
        padding: '16px',
        backgroundColor: '#2a2a2e',
        borderRadius: '10px',
    },
    txt: { color: '#fff', margin: 0, fontSize: '20px' },
    flex: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #5865f2, #7c3aed)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: '700',
        fontSize: '24px',
    },
    bg: {
        backgroundColor: '#1a1a1e',
        borderRadius: '12px',
        padding: '24px',
        width: '550px',
        maxHeight: '80vh',
        overflowY: 'auto',
        border: '1px solid #2a2a2e',
    },
};

const _st1185 = {
    backgroundColor: 'rgba(88,101,242,0.15)',
    color: '#5865f2',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    display: 'inline-block',
    marginRight: '8px',
};
const _st1186 = {
    backgroundColor: '#949ba4',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
};

const UserDetailModal = ({
    handleUserAction,
    openEditUserModal,
    selectedUser,
    setActionModal,
    setPasswordResetModal,
    setSelectedUser,
}) => {
    const { t } = useTranslation();

    const onClose = useCallback(() => setSelectedUser(null), [setSelectedUser]);
    const { modalRef, overlayProps, dialogProps } = useModalA11y({ onClose, label: 'User Detail' });
    const handleEditUser = useCallback(() => {
        openEditUserModal(selectedUser);
        setSelectedUser(null);
    }, [openEditUserModal, selectedUser, setSelectedUser]);
    const handlePasswordReset = useCallback(() => {
        setPasswordResetModal(selectedUser);
        setSelectedUser(null);
    }, [setPasswordResetModal, selectedUser, setSelectedUser]);
    const handleWarn = useCallback(
        () => handleUserAction('warn', selectedUser.id),
        [handleUserAction, selectedUser?.id]
    );
    const handleReset2FA = useCallback(
        () => handleUserAction('reset_2fa', selectedUser.id),
        [handleUserAction, selectedUser?.id]
    );
    const handleVerifyEmail = useCallback(
        () => handleUserAction('verify_email', selectedUser.id),
        [handleUserAction, selectedUser?.id]
    );
    const handleGivePremium = useCallback(
        () => handleUserAction('give_premium', selectedUser.id),
        [handleUserAction, selectedUser?.id]
    );
    const handleRemovePremium = useCallback(
        () => handleUserAction('remove_premium', selectedUser.id),
        [handleUserAction, selectedUser?.id]
    );
    const handleForceLogout = useCallback(
        () => handleUserAction('force_logout', selectedUser.id),
        [handleUserAction, selectedUser?.id]
    );
    const handleResetAvatar = useCallback(
        () => handleUserAction('reset_avatar', selectedUser.id),
        [handleUserAction, selectedUser?.id]
    );
    const handleBan = useCallback(
        () => setActionModal({ type: 'ban', user: selectedUser }),
        [setActionModal, selectedUser]
    );
    const handleUnban = useCallback(
        () => handleUserAction('unban', selectedUser.id),
        [handleUserAction, selectedUser?.id]
    );
    const handleDelete = useCallback(
        () => setActionModal({ type: 'delete', user: selectedUser }),
        [setActionModal, selectedUser]
    );
    return (
        <div aria-label="user detail modal" className={css.absoOverlay8} {...overlayProps}>
            <div style={S.bg} {...dialogProps}>
                {/* Header */}
                <div className={css.flexAlignGap14Mb20}>
                    <div style={S.flex}>{selectedUser.username?.charAt(0).toUpperCase()}</div>
                    <div>
                        <h3 style={S.txt}>{selectedUser.username}</h3>
                        <div className={css.textGray6b11}>{selectedUser.email}</div>
                        <div className={css.textPrimary12}>
                            🎫 #{selectedUser.friend_code || 'N/A'}
                        </div>
                    </div>
                    <div className={css.flexWrapGap4MlAuto}>
                        {selectedUser.is_staff && (
                            <span style={styles.badge('#e74c3c')}>{t('👑_admin')}</span>
                        )}
                        {selectedUser.is_premium && (
                            <span style={styles.badge('#ffd700')}>{t('⭐_premium')}</span>
                        )}
                        {selectedUser.is_whitelistd && (
                            <span style={styles.badge('#5865f2')}>{t('💎_whitelist')}</span>
                        )}
                        {selectedUser.has_spotify && (
                            <span style={styles.badge('#1db954')}>{t('🎵_spotify')}</span>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="admin-grid-4" style={S.grid}>
                    <div className={css.textCenter}>
                        <div className={css.valueLgGreen24}>{selectedUser.level || 1}</div>
                        <div className="text-gray6b-11">{t('level')}</div>
                    </div>
                    <div className={css.textCenter}>
                        <div className={css.valuePrimary24}>
                            {(selectedUser.xp || 0).toLocaleString()}
                        </div>
                        <div className="text-gray6b-11">{t('xp')}</div>
                    </div>
                    <div className={css.textCenter}>
                        <div className={css.valueGold24}>
                            {(selectedUser.coins || 0).toLocaleString()}
                        </div>
                        <div className="text-gray6b-11">{t('coin')}</div>
                    </div>
                    <div className={css.textCenter}>
                        <div className={css.valueOrange24}>
                            {(selectedUser.total_messages || 0).toLocaleString()}
                        </div>
                        <div className="text-gray6b-11">{t('mesaj')}</div>
                    </div>
                </div>

                {/* Detail Grid */}
                <div className="admin-grid-2" style={S.grid2}>
                    <div className={css.cardPad10}>
                        <span className="icon-gray6b">{t('🆔_id')}</span>
                        <span className="white-ml8">{selectedUser.id}</span>
                    </div>
                    <div className={css.cardPad10}>
                        <span className="icon-gray6b">{t('📅_kayıt')}</span>
                        <span className="white-ml8">{selectedUser.created?.split('T')[0]}</span>
                    </div>
                    <div className={css.cardPad10}>
                        <span className="icon-gray6b">{t('🏠_server')}</span>
                        <span className="white-ml8">{selectedUser.servers_joined || 0}</span>
                    </div>
                    <div className={css.cardPad10}>
                        <span className="icon-gray6b">{t('👥_friend')}</span>
                        <span className="white-ml8">{selectedUser.friends_count || 0}</span>
                    </div>
                    <div className={css.cardPad10}>
                        <span className="icon-gray6b">{t('🕐_son_entry')}</span>
                        <span className="white-ml8">
                            {selectedUser.last_login?.split('T')[0] || 'N/A'}
                        </span>
                    </div>
                    <div className={css.cardPad10}>
                        <span className="icon-gray6b">{t('👁️_son_görülme')}</span>
                        <span className="white-ml8">
                            {selectedUser.last_seen?.split('T')[0] || 'N/A'}
                        </span>
                    </div>
                </div>

                {/* Status Message */}
                {selectedUser.status_message && (
                    <div className={css.cardPad12Mb20}>
                        <div className="text-gray6b-11">{t('📝_status_mesajı')}</div>
                        <div className={css.textWhiteBold14}>"{selectedUser.status_message}"</div>
                    </div>
                )}

                {/* Social Links */}
                {selectedUser.social_links && Object.keys(selectedUser.social_links).length > 0 && (
                    <div className={css.cardPad12Mb20}>
                        <div className="text-gray6b-11">{t('🔗_sosyal_baglantilar')}</div>
                        <div className={css.flexWrapGap8}>
                            {Object.entries(selectedUser.social_links).map(
                                ([key, value]) =>
                                    value && (
                                        <span key={key} style={_st1185}>
                                            {key}: {value}
                                        </span>
                                    )
                            )}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className={css.flexWrapGap8}>
                    <button style={styles.actionBtn('#5865f2')} onClick={handleEditUser}>
                        <FaEdit /> Edit
                    </button>
                    <button style={styles.actionBtn('#f59e0b')} onClick={handlePasswordReset}>
                        <FaKey /> Change Password
                    </button>
                    <button style={styles.actionBtn('#f0b132')} onClick={handleWarn}>
                        <FaExclamationTriangle /> Uyar
                    </button>
                    <button style={styles.actionBtn('#5865f2')} onClick={handleReset2FA}>
                        <FaLock /> Reset 2FA
                    </button>
                    <button style={styles.actionBtn('#06b6d4')} onClick={handleVerifyEmail}>
                        <FaEnvelope /> Verify Email
                    </button>
                    <button style={styles.actionBtn('#10b981')} onClick={handleGivePremium}>
                        <FaStar /> Premium Ver
                    </button>
                    <button style={styles.actionBtn('#ec4899')} onClick={handleRemovePremium}>
                        <FaStar /> Premium Remove
                    </button>
                    <button style={styles.actionBtn('#4752c4')} onClick={handleForceLogout}>
                        <FaLock /> End Session
                    </button>
                    <button style={styles.actionBtn('#f97316')} onClick={handleResetAvatar}>
                        <FaImage /> Reset Avatar
                    </button>
                    {selectedUser.is_active !== false ? (
                        <button style={styles.actionBtn('#e74c3c')} onClick={handleBan}>
                            <FaBan /> Ban
                        </button>
                    ) : (
                        <button style={styles.actionBtn('#23a559')} onClick={handleUnban}>
                            <FaCheckCircle /> Yasağı Kaldır
                        </button>
                    )}
                    <button style={styles.actionBtn('#dc2626')} onClick={handleDelete}>
                        <FaTrash /> Kullanıcıyı Sil
                    </button>
                    <button style={_st1186} onClick={() => setSelectedUser(null)}>
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
};

UserDetailModal.propTypes = {
    handleUserAction: PropTypes.func,
    openEditUserModal: PropTypes.func,
    selectedUser: PropTypes.object,
    setActionModal: PropTypes.func,
    setPasswordResetModal: PropTypes.func,
    setSelectedUser: PropTypes.func,
};
export default memo(UserDetailModal);
