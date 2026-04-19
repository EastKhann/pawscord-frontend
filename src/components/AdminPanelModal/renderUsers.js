/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React from 'react';
import {
    FaBan,
    FaCheckCircle,
    FaEdit,
    FaEye,
    FaFileExport,
    FaKey,
    FaSearch,
    FaTrash,
} from 'react-icons/fa';

import { useTranslation } from 'react-i18next';
import css from './tabs/AdminTabs.module.css';
import PropTypes from 'prop-types';
import styles from './styles';

function getUserAvatarStyle(userId) {
    return {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, hsl(${userId * 40}, 70%, 50%), hsl(${userId * 40 + 30}, 70%, 40%))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: '600',
        fontSize: '12px',
    };
}

// Extracted from AdminPanelModal.js
const renderUsers = () => {
    const { t } = useTranslation();
    const prevPageBtnStyle = {
        ...styles.actionBtn('#3d3f44'),
        opacity: currentPage === 1 ? 0.5 : 1,
    };
    const nextPageBtnStyle = {
        ...styles.actionBtn('#3d3f44'),
        opacity: currentPage === totalPages ? 0.5 : 1,
    };
    return (
        <div>
            <h2 className={css.headerWhite18Mb16}>{t('👥_user_yönetimi')}</h2>

            {/* Search & Filters */}
            <div className="flex-gap-10-mb16">
                <input
                    type="text"
                    placeholder={t('user_search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={css.siMW300}
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={css.siMW150}
                >
                    <option value="all">{t('all')}</option>
                    <option value="online">{t('online')}</option>
                    <option value="offline">{t('offline')}</option>
                    <option value="premium">{t('premium')}</option>
                    <option value="banned">{t('banned')}</option>
                </select>
                <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    className={css.siMW150}
                >
                    <option value="created">{t('join_date')}</option>
                    <option value="username">{t('username')}</option>
                    <option value="message_count">{t('message_count')}</option>
                </select>
                <button onClick={fetchUsers} style={styles.actionBtn('#5865f2')}>
                    <FaSearch /> {t('admin.users.search', 'Ara')}
                </button>
                <button style={styles.actionBtn('#23a559')}>
                    <FaFileExport /> {t('admin.users.export', 'Dışa Aktar')}
                </button>
            </div>

            {/* Table */}
            <div className="rounded-hidden-2a">
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>{t('user')}</th>
                            <th style={styles.th}>{t('referral_code')}</th>
                            <th style={styles.th}>{t('level_xp')}</th>
                            <th style={styles.th}>{t('coin')}</th>
                            <th style={styles.th}>{t('mesaj')}</th>
                            <th style={styles.th}>{t('serverLabel')}</th>
                            <th style={styles.th}>{t('friend')}</th>
                            <th style={styles.th}>{t('status')}</th>
                            <th style={styles.th}>{t('tip')}</th>
                            <th style={styles.th}>{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                style={user.is_admin ? { backgroundColor: '#0d0e1020' } : undefined}
                            >
                                <td style={styles.td}>
                                    <div className={css.flexAlignGap10}>
                                        <div style={getUserAvatarStyle(user.id)}>
                                            {user.username?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className={css.textBold13}>{user.username}</div>
                                            <div className={css.textGray6b10}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.tdCode}>#{user.friend_code || 'N/A'}</td>
                                <td style={styles.td}>
                                    <div className={css.flexAlignGap6}>
                                        <span style={styles.badgeGreenWide}>
                                            Lv.{user.level || 1}
                                        </span>
                                        <span className="text-a3-11">
                                            {(user.xp || 0).toLocaleString()} XP
                                        </span>
                                    </div>
                                </td>
                                <td className={css.tdGold}>
                                    🪙 {(user.coins || 0).toLocaleString()}
                                </td>
                                <td style={styles.td}>
                                    💬 {(user.total_messages || 0).toLocaleString()}
                                </td>
                                <td style={styles.td}>🏠 {user.servers_joined || 0}</td>
                                <td style={styles.td}>👥 {user.friends_count || 0}</td>
                                <td style={styles.td}>
                                    <span
                                        style={styles.badge(
                                            user.status === 'online'
                                                ? '#23a559'
                                                : user.status === 'idle'
                                                  ? '#f0b132'
                                                  : user.status === 'dnd'
                                                    ? '#e74c3c'
                                                    : '#6b7280'
                                        )}
                                    >
                                        {user.status === 'online'
                                            ? '🟢'
                                            : user.status === 'idle'
                                              ? '🌙'
                                              : user.status === 'dnd'
                                                ? '⛔'
                                                : '⚫'}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <div className={css.flexWrapGap4}>
                                        {user.is_staff && (
                                            <span style={styles.badge('#e74c3c')}>👑</span>
                                        )}
                                        {user.is_premium && (
                                            <span style={styles.badge('#ffd700')}>⭐</span>
                                        )}
                                        {user.is_whitelistd && (
                                            <span style={styles.badge('#5865f2')}>💎</span>
                                        )}
                                        {user.has_spotify && (
                                            <span style={styles.badge('#1db954')}>🎵</span>
                                        )}
                                        {!user.is_staff &&
                                            !user.is_premium &&
                                            !user.is_whitelistd && (
                                                <span style={styles.badge('#6b7280')}>
                                                    {t('free')}
                                                </span>
                                            )}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div className={css.flexWrapGap4}>
                                        <button
                                            style={styles.actionBtn('#5865f2')}
                                            onClick={() => setSelectedUser(user)}
                                            title={t('common.view')}
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            style={styles.actionBtn('#f0b132')}
                                            onClick={() => openEditUserModal(user)}
                                            title={t('common.edit')}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            style={styles.actionBtn('#f59e0b')}
                                            onClick={() => setPasswordResetModal(user)}
                                            title={t('change_password')}
                                        >
                                            <FaKey />
                                        </button>
                                        {user.is_active !== false ? (
                                            <button
                                                style={styles.actionBtn('#e74c3c')}
                                                onClick={() =>
                                                    setActionModal({ type: 'ban', user })
                                                }
                                                title={t('ban')}
                                            >
                                                <FaBan />
                                            </button>
                                        ) : (
                                            <button
                                                style={styles.actionBtn('#23a559')}
                                                onClick={() => handleUserAction('unban', user.id)}
                                                title={t('yasağı_remove')}
                                            >
                                                <FaCheckCircle />
                                            </button>
                                        )}
                                        <button
                                            style={styles.actionBtn('#dc2626')}
                                            onClick={() => setActionModal({ type: 'delete', user })}
                                            title={t('delete')}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className={css.flexCenterGap8Mt16}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    style={prevPageBtnStyle}
                >
                    ◀ {t('admin.users.previous', 'Önceki')}
                </button>
                <span className="text-fff-p6-12">
                    {t('admin.users.page', 'Sayfa')} {currentPage} / {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    style={nextPageBtnStyle}
                >
                    Sonraki ▶
                </button>
            </div>
        </div>
    );
};

renderUsers.propTypes = {};
