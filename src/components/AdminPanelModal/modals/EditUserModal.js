import React, { useCallback } from 'react';

import PropTypes from 'prop-types';

import { FaEdit, FaTimes } from 'react-icons/fa';

import styles from '../styles';

import useModalA11y from '../../../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';

import css from '../tabs/AdminTabs.module.css';

// -- dynamic style helpers (pass 2) --

const S = {
    flex: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',

        background: 'linear-gradient(135deg, #f0b132, #e67e22)',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        color: '#fff',
        fontWeight: '700',
        fontSize: '20px',
    },

    bg: {
        backgroundColor: '#1a1a1e',
        borderRadius: '12px',

        padding: '24px',
        width: '600px',
        maxHeight: '85vh',
        overflowY: 'auto',

        border: '1px solid #2a2a2e',
    },
};

const EditUserModal = ({
    editUserForm,

    editUserLoading,

    editUserModal,

    handleUpdateUser,

    setEditUserForm,

    setEditUserModal,
}) => {
    const { t } = useTranslation();

    const onClose = useCallback(() => setEditUserModal(null), [setEditUserModal]);

    const { modalRef, overlayProps, dialogProps } = useModalA11y({
        onClose,
        label: 'Kullanıcıyı Düzenle',
    });

    return (
        <div className={css.fixedOverlay85} {...overlayProps}>
            <div style={S.bg} {...dialogProps}>
                {/* Header */}

                <div className={css.editUserHeader}>
                    <div style={S.flex}>
                        <FaEdit />
                    </div>

                    <div>
                        <h3 className="text-fff-m0-18">{t('_user_edit')}</h3>

                        <div className="text-gray6b-12">
                            ID: {editUserModal.id} | {editUserModal.username}
                        </div>
                    </div>

                    <button onClick={() => setEditUserModal(null)}>
                        <FaTimes />
                    </button>
                </div>

                {/* Form */}

                <div className={css.editUserGrid}>
                    {/* Username */}

                    <div>
                        <label className="form-label-sm">{t('👤_username')}</label>

                        <input
                            type="text"
                            value={editUserForm.username || ''}
                            onChange={(e) =>
                                setEditUserForm((f) => ({ ...f, username: e.target.value }))
                            }
                            style={styles.searchInput}
                            aria-label="Kullanıcı adı"
                        />
                    </div>

                    {/* Email */}

                    <div>
                        <label className="form-label-sm">{t('📧_email')}</label>

                        <input
                            type="email"
                            value={editUserForm.email || ''}
                            onChange={(e) =>
                                setEditUserForm((f) => ({ ...f, email: e.target.value }))
                            }
                            style={styles.searchInput}
                            aria-label="E-posta"
                        />
                    </div>

                    {/* Coins */}

                    <div>
                        <label className="form-label-sm">{t('💰_coin')}</label>

                        <input
                            type="number"
                            value={editUserForm.coins || 0}
                            onChange={(e) =>
                                setEditUserForm((f) => ({
                                    ...f,
                                    coins: parseInt(e.target.value) || 0,
                                }))
                            }
                            style={styles.searchInput}
                        />
                    </div>

                    {/* Level */}

                    <div>
                        <label className="form-label-sm">{t('⭐_level')}</label>

                        <input
                            type="number"
                            value={editUserForm.level || 1}
                            onChange={(e) =>
                                setEditUserForm((f) => ({
                                    ...f,
                                    level: parseInt(e.target.value) || 1,
                                }))
                            }
                            style={styles.searchInput}
                        />
                    </div>

                    {/* XP */}

                    <div>
                        <label className="form-label-sm">{t('🎮_xp')}</label>

                        <input
                            type="number"
                            value={editUserForm.xp || 0}
                            onChange={(e) =>
                                setEditUserForm((f) => ({
                                    ...f,
                                    xp: parseInt(e.target.value) || 0,
                                }))
                            }
                            style={styles.searchInput}
                        />
                    </div>

                    {/* Role */}

                    <div>
                        <label className="form-label-sm">{t('🎭_role')}</label>

                        <select
                            value={editUserForm.role || 'member'}
                            onChange={(e) =>
                                setEditUserForm((f) => ({ ...f, role: e.target.value }))
                            }
                            style={styles.searchInput}
                        >
                            <option value="member">{t('member')}</option>

                            <option value="admin">{t('administrator')}</option>
                        </select>
                    </div>

                    {/* Status Message */}

                    <div className="grid-col-full">
                        <label className="form-label-sm">{t('📝_status_mesaı')}</label>

                        <input
                            type="text"
                            value={editUserForm.status_message || ''}
                            onChange={(e) =>
                                setEditUserForm((f) => ({ ...f, status_message: e.target.value }))
                            }
                            style={styles.searchInput}
                            placeholder={t('ui.status_messagei')}
                            aria-label="Status Message"
                        />
                    </div>
                </div>

                {/* Toggles */}

                <div className={css.editUserToggleGrid}>
                    {[
                        { key: 'is_active', label: '✅ Active', color: '#23a559' },

                        { key: 'is_staff', label: '👑 Admin', color: '#e74c3c' },

                        { key: 'is_premium', label: '⭐ Premium', color: '#ffd700' },

                        { key: 'email_verified', label: '📧 Verified', color: '#5865f2' },
                    ].map((toggle) => (
                        <div
                            key={toggle.key}
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                                setEditUserForm((f) => ({ ...f, [toggle.key]: !f[toggle.key] }))
                            }
                            style={{
                                padding: '10px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                textAlign: 'center',

                                backgroundColor: editUserForm[toggle.key]
                                    ? `${toggle.color}20`
                                    : '#2a2a2e',

                                border: `1px solid ${editUserForm[toggle.key] ? toggle.color : '#3a3a3e'}`,

                                transition: 'all 0.2s',
                            }}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <div
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: editUserForm[toggle.key] ? toggle.color : '#6b7280',
                                }}
                            >
                                {toggle.label}
                            </div>

                            <div
                                style={{
                                    fontSize: '10px',
                                    color: editUserForm[toggle.key] ? '#fff' : '#6b7280',
                                    marginTop: '2px',
                                }}
                            >
                                {editUserForm[toggle.key] ? 'Open' : 'Closed'}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Buttons */}

                <div className={css.editUserFooter}>
                    <button style={styles.actionBtnGrayLg} onClick={() => setEditUserModal(null)}>
                        Cancel
                    </button>

                    <button
                        style={{
                            ...styles.actionBtn('#23a559'),
                            padding: '10px 20px',
                            opacity: editUserLoading ? 0.6 : 1,
                        }}
                        onClick={handleUpdateUser}
                        disabled={editUserLoading}
                    >
                        {editUserLoading ? '⏳ Kaydediliyor...' : '💾 Kaydet'}
                    </button>
                </div>
            </div>
        </div>
    );
};

EditUserModal.propTypes = {
    editUserForm: PropTypes.object,

    editUserLoading: PropTypes.object,

    editUserModal: PropTypes.object,

    handleUpdateUser: PropTypes.func,

    setEditUserForm: PropTypes.func,

    setEditUserModal: PropTypes.func,
};

export default EditUserModal;
