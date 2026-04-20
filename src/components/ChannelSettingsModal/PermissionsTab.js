/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/ChannelSettingsModal/PermissionsTab.js

import { FaUserShield, FaPlus, FaLock } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import css from './ChannelTabs.module.css';

const S = {
    txt2: { color: '#fff', fontSize: '0.95em' },
    bg: {
        background: '#0d0e10',
        borderRadius: '6px',
        marginTop: '8px',
        maxHeight: '200px',
        overflowY: 'auto',
        border: '1px solid #4e5058',
    },
    txt: { color: '#fff', marginBottom: '15px' },
    font: { fontSize: '0.85em' },
    mar: { opacity: 0.3, marginBottom: '10px' },
};

const PermissionsTab = ({
    permissions,
    showAddPermission,
    setShowAddPermission,
    permissionType,
    setPermissionType,
    selectedRoleForThum,
    setSelectedRoleForThum,
    selectedUserForThum,
    setSelectedUserForThum,
    searchUser,
    setSearchUser,
    searchResults,
    setSearchResults,
    searchUsers,
    removePermission,
    addPermission,
}) => {
    const { t } = useTranslation();
    return (
        <>
            <div style={styles.permissionsHeader}>
                <h4 className={css.headingWhite}>
                    <FaUserShield /> Channel Permissions
                </h4>
                <button
                    aria-label="Add permission"
                    onClick={() => setShowAddPermission(true)}
                    style={styles.addThumBtn}
                >
                    <FaPlus /> İzin Ekle
                </button>
            </div>

            {/* Role İzinleri */}
            {permissions.role_permissions?.length > 0 && (
                <div style={styles.permSection}>
                    <h5 className={css.sectionTitle}>{t('role_permissions')}</h5>
                    {permissions.role_permissions.map((perm) => (
                        <div key={perm.id} style={styles.permissionItem}>
                            <div className={css.flexAlignGap10}>
                                <div
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        backgroundColor: perm.role_color,
                                    }}
                                ></div>
                                <span className={css.bold}>{perm.role_name}</span>
                            </div>
                            <div className={css.permissionMeta}>
                                {perm.can_view && '👁 View '}
                                {perm.can_send_messages && '✏️ Mesaj '}
                                {perm.can_connect && '🎤 Connect '}
                                {perm.can_speak && t('ui.konus')}
                            </div>
                            <button
                                onClick={() => removePermission(perm.id)}
                                style={styles.removeBtn}
                            >
                                {t('remove')}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* User İzinleri */}
            {permissions.user_permissions?.length > 0 && (
                <div style={styles.permSection}>
                    <h5 className={css.sectionTitle}>{t('user_permissions')}</h5>
                    {permissions.user_permissions.map((perm) => (
                        <div key={perm.id} style={styles.permissionItem}>
                            <div className={css.flexAlignGap10}>
                                <img
                                    src={perm.avatar || '/default-avatar.png'}
                                    alt={perm.username}
                                    className={css.avatar24}
                                />
                                <span>{perm.username}</span>
                            </div>
                            <div className={css.permissionMeta}>
                                {perm.can_view && '👁 View '}
                                {perm.can_send_messages && '✏️ Mesaj '}
                                {perm.can_connect && '🎤 Connect '}
                            </div>
                            <button
                                onClick={() => removePermission(perm.id)}
                                style={styles.removeBtn}
                            >
                                {t('remove')}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {permissions.role_permissions?.length === 0 &&
                permissions.user_permissions?.length === 0 && (
                    <div className={css.emptyState}>
                        <FaLock size={40} style={S.mar} />
                        <p>{t('no_custom_permissions_defined_yet')}</p>
                        <p style={S.font}>
                            {t('you_can_define_custom_permissions_for_specific_roles_or_user')}
                        </p>
                    </div>
                )}

            {/* Add Permissionme Modalı */}
            {showAddPermission && (
                <div style={styles.addThumModal}>
                    <h5 style={S.txt}>{t('add_permission')}</h5>

                    <div className={css.mb15}>
                        <label className={css.labelSmall}>{t('permission_type')}</label>
                        <select
                            value={permissionType}
                            onChange={(e) => setPermissionType(e.target.value)}
                            style={styles.input}
                        >
                            <option value="role">{t('role')}</option>
                            <option value="user">{t('user')}</option>
                        </select>
                    </div>

                    {permissionType === 'role' && (
                        <div className={css.mb15}>
                            <label className={css.labelSmall}>{t('select_role')}</label>
                            <select
                                value={selectedRoleForThum || ''}
                                onChange={(e) => setSelectedRoleForThum(e.target.value)}
                                style={styles.input}
                            >
                                <option value="">{t('select_role_label')}</option>
                                {permissions.available_roles?.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {permissionType === 'user' && (
                        <div className={css.mb15}>
                            <label className={css.labelSmall}>{t('user_search')}</label>
                            <input
                                type="text"
                                placeholder={t('enter_username_min_2_characters')}
                                value={searchUser}
                                onChange={(e) => {
                                    setSearchUser(e.target.value);
                                    searchUsers(e.target.value);
                                }}
                                style={styles.input}
                            />

                            {/* Search Resultsı */}
                            {searchResults.length > 0 && (
                                <div style={S.bg}>
                                    {searchResults.map((user) => (
                                        <div
                                            key={user.id}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => {
                                                setSelectedUserForThum(user.id);
                                                setSearchUser(user.username);
                                                setSearchResults([]);
                                            }}
                                            style={{
                                                padding: '10px 12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #0e1222',
                                                backgroundColor:
                                                    selectedUserForThum === user.id
                                                        ? '#5865f2'
                                                        : 'transparent',
                                                transition: 'background-color 0.2s',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (selectedUserForThum !== user.id) {
                                                    e.currentTarget.style.backgroundColor =
                                                        '#111214';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedUserForThum !== user.id) {
                                                    e.currentTarget.style.backgroundColor =
                                                        'transparent';
                                                }
                                            }}
                                            onKeyDown={(e) =>
                                                (e.key === 'Enter' || e.key === ' ') &&
                                                e.currentTarget.click()
                                            }
                                        >
                                            <img
                                                src={user.avatar || '/default-avatar.png'}
                                                alt={user.username}
                                                className={css.avatar24}
                                            />
                                            <span style={S.txt2}>{user.username}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {searchUser && searchResults.length === 0 && (
                                <p className={css.textXs}>
                                    {searchUser.length < 2
                                        ? 'Enter at least 2 characters'
                                        : 'Kullanıcı bulunamadı'}
                                </p>
                            )}

                            {selectedUserForThum && (
                                <p className={css.textSuccess}>
                                    ✅ User selected: <strong>{searchUser}</strong>
                                </p>
                            )}
                        </div>
                    )}

                    <div className={css.flexEndGap10}>
                        <button
                            onClick={() => {
                                setShowAddPermission(false);
                                setSearchUser('');
                                setSearchResults([]);
                                setSelectedUserForThum(null);
                                setSelectedRoleForThum(null);
                            }}
                            style={styles.cancelBtn}
                        >
                            Cancel
                        </button>
                        <button onClick={addPermission} style={styles.confirmBtn}>
                            Add
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

PermissionsTab.propTypes = {
    permissions: PropTypes.array,
    showAddPermission: PropTypes.bool,
    setShowAddPermission: PropTypes.func,
    permissionType: PropTypes.func,
    setPermissionType: PropTypes.func,
    selectedRoleForThum: PropTypes.bool,
    setSelectedRoleForThum: PropTypes.func,
    selectedUserForThum: PropTypes.bool,
    setSelectedUserForThum: PropTypes.func,
    searchUser: PropTypes.string,
    setSearchUser: PropTypes.func,
    searchResults: PropTypes.array,
    setSearchResults: PropTypes.func,
    searchUsers: PropTypes.array,
    removePermission: PropTypes.func,
    addPermission: PropTypes.func,
};
export default PermissionsTab;
