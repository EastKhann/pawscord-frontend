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
import styles from '../styles';

import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';
import { useAdminAPIContext } from '../AdminAPIContext';

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

const UsersTab = () => {
    const { t } = useTranslation();
    const {
        currentPage,
        fetchUsers,
        filterStatus,
        handleUserAction,
        openEditUserModal,
        searchQuery,
        setActionModal,
        setCurrentPage,
        setFilterStatus,
        setPasswordResetModal,
        setSearchQuery,
        setSelectedUser,
        setSortField,
        sortField,
        totalPages,
        users,
    } = useAdminAPIContext();
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
            <h2 className={css.sectionTitle}>{t('admin.panel.users')}</h2>

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
                    <option value="banned">{t('admin.panel.banned')}</option>
                </select>
                <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    className={css.siMW150}
                >
                    <option value="created">{t('admin.panel.registrationDate')}</option>
                    <option value="username">{t('username')}</option>
                    <option value="message_count">{t('admin.panel.messageCount')}</option>
                </select>
                <button
                    aria-label="Search users"
                    onClick={fetchUsers}
                    style={styles.actionBtn('#5865f2')}
                >
                    <FaSearch /> Search
                </button>
                <button aria-label="Export users" style={styles.actionBtn('#23a559')}>
                    <FaFileExport /> Export
                </button>
            </div>

            {/* Table */}
            <div className="rounded-hidden-2a">
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>{t('user')}</th>
                            <th style={styles.th}>{t('admin.panel.referralCode')}</th>
                            <th style={styles.th}>{t('level_xp')}</th>
                            <th style={styles.th}>{t('coin')}</th>
                            <th style={styles.th}>{t('mesaj')}</th>
                            <th style={styles.th}>{t('serverLabel')}</th>
                            <th style={styles.th}>{t('friend')}</th>
                            <th style={styles.th}>{t('status')}</th>
                            <th style={styles.th}>{t('tip')}</th>
                            <th style={styles.th}>{t('admin.panel.actions')}</th>
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
                                            <div className="fw-600-13">{user.username}</div>
                                            <div className={css.labelSm}>{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.tdCode}>#{user.friend_code || 'N/A'}</td>
                                <td style={styles.td}>
                                    <div className="flex-align-6">
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
                                    <div className="flex-wrap-4">
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
                                    <div className="flex-wrap-4g">
                                        <button
                                            aria-label="View user details"
                                            style={styles.actionBtn('#5865f2')}
                                            onClick={() => setSelectedUser(user)}
                                            title={t('common.view')}
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            aria-label="Edit user"
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
                                            aria-label="Change password"
                                        >
                                            <FaKey />
                                        </button>
                                        {user.is_active !== false ? (
                                            <button
                                                style={styles.actionBtn('#e74c3c')}
                                                onClick={() =>
                                                    setActionModal({ type: 'ban', user })
                                                }
                                                title={t('ban_user')}
                                                aria-label="Ban user"
                                            >
                                                <FaBan />
                                            </button>
                                        ) : (
                                            <button
                                                style={styles.actionBtn('#23a559')}
                                                onClick={() => handleUserAction('unban', user.id)}
                                                title={t('unban_user')}
                                                aria-label="Unban user"
                                            >
                                                <FaCheckCircle />
                                            </button>
                                        )}
                                        <button
                                            style={styles.actionBtn('#dc2626')}
                                            onClick={() => setActionModal({ type: 'delete', user })}
                                            title={t('delete_user')}
                                            aria-label="Delete user"
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
            <div className="flex-center-8-mt16">
                <button
                    aria-label="Previous page"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    style={prevPageBtnStyle}
                >
                    {t('admin.panel.prevPage')}
                </button>
                <span className="text-fff-p6-12">
                    {t('admin.panel.pageOf', { current: currentPage, total: totalPages })}
                </span>
                <button
                    aria-label="Next page"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    style={nextPageBtnStyle}
                >
                    {t('admin.panel.nextPage')}
                </button>
            </div>
        </div>
    );
};
export default UsersTab;
