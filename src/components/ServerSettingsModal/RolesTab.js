/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { ChromePicker } from 'react-color';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import css from './ServerTabs.module.css';
import logger from '../../utils/logger';

const S = {
    abs: { position: 'absolute', zIndex: 1000, marginTop: '10px' },
    font: { opacity: 0.5, fontSize: '0.8em' },
    flex: { display: 'flex', height: '100%', gap: '20px' },
};

const RolesTab = ({ server, fetchWithAuth, apiBaseUrl, onRolesChange }) => {
    const { t } = useTranslation();
    const [roles, setRolesLocal] = useState(server.roles || []);
    const setRoles = (updater) => {
        setRolesLocal((prev) => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            if (onRolesChange) onRolesChange(next);
            return next;
        });
    };
    const [editingRole, setEditingRole] = useState(null);
    const [roleName, setRoleName] = useState('');
    const [roleColor, setRoleColor] = useState('#949ba4');
    const [permissions, setPermissions] = useState({
        is_admin: false,
        can_manage_channels: false,
        can_delete_messages: false,
        can_manage_roles: false,
        can_ban_members: false,
    });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const startEditRole = (role) => {
        setEditingRole(role);
        setRoleName(role.name);
        setRoleColor(role.color);
        setPermissions({
            is_admin: !!role.is_admin,
            can_manage_channels: !!role.can_manage_channels,
            can_delete_messages: !!role.can_delete_messages,
            can_manage_roles: !!role.can_manage_roles,
            can_ban_members: !!role.can_ban_members,
        });
    };

    const resetForm = () => {
        setEditingRole(null);
        setRoleName('');
        setRoleColor('#949ba4');
        setPermissions({
            is_admin: false,
            can_manage_channels: false,
            can_delete_messages: false,
            can_manage_roles: false,
            can_ban_members: false,
        });
    };

    const handleSaveRole = async (e) => {
        e.preventDefault();
        if (!roleName.trim()) return;
        setLoading(true);
        const payload = {
            role_id: editingRole ? editingRole.id : null,
            name: roleName,
            color: roleColor,
            is_admin: permissions.is_admin,
            can_manage_channels: permissions.can_manage_channels,
            can_delete_messages: permissions.can_delete_messages,
            can_manage_roles: permissions.can_manage_roles,
            can_ban_members: permissions.can_ban_members,
        };
        try {
            const url = editingRole
                ? `${apiBaseUrl}/roles/${editingRole.id}/update/`
                : `${apiBaseUrl}/servers/${server.id}/roles/create/`;
            const res = await fetchWithAuth(url, {
                method: editingRole ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                const savedRole = await res.json();
                setRoles((prev) =>
                    editingRole
                        ? prev.map((r) => (r.id === savedRole.id ? savedRole : r))
                        : [...prev, savedRole]
                );
                resetForm();
                setShowColorPicker(false);
            } else {
                toast.error('Rol kaydedilemedi.');
            }
        } catch (error) {
            logger.error('Role error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRole = async (roleId) => {
        if (!(await confirmDialog(t('roles.deleteConfirm', 'Are you sure you want to delete this role?')))) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/roles/${roleId}/delete/`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setRoles((prev) => prev.filter((r) => r.id !== roleId));
                if (editingRole?.id === roleId) resetForm();
            }
        } catch (e) {
            logger.error(e);
        }
    };

    const colorPreviewStyle = { ...styles.colorPreview, backgroundColor: roleColor };

    return (
        <div style={S.flex}>
            {/* SOL: ROL LİSTESİ */}
            <div style={styles.rolesSidebar}>
                <button onClick={resetForm} aria-label={t('rolesTab.createRole', 'Create new role')} style={styles.newRoleBtn}>
                    <FaPlus />
                    {t('new_role')}
                </button>
                <div style={styles.rolesList}>
                    {roles.map((role) => {
                        const roleItemStyle = {
                            ...styles.roleItem,
                            backgroundColor:
                                editingRole?.id === role.id ? '#1e2024' : 'transparent',
                            borderLeft: `4px solid ${role.color}`,
                        };
                        return (
                            <div
                                key={role.id}
                                style={roleItemStyle}
                                role="button"
                                tabIndex={0}
                                onClick={() => startEditRole(role)}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                            >
                                <span>{role.name}</span>
                                <FaEdit style={S.font} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* SAĞ: EDİTÖR */}
            <div style={styles.roleEditor}>
                <h3 style={styles.editorTitle}>{editingRole ? 'Edit Role' : 'New Role'}</h3>
                <div style={styles.inputGroup}>
                    <label>{t('role_name')}</label>
                    <input
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        style={styles.input}
                        placeholder={t('example_moderator')}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>{t('role_color')}</label>
                    <div className={css.flexAlignGap10}>
                        <div
                            style={colorPreviewStyle}
                            role="button"
                            tabIndex={0}
                            aria-label={t('rolesTab.selectColor', 'Select role color')}
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') &&
                                setShowColorPicker(!showColorPicker)
                            }
                        />
                        <span className="text-b5-09em">{roleColor}</span>
                    </div>
                    {showColorPicker && (
                        <>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                            <div
                                style={styles.cover}
                                role="presentation"
                                onClick={() => setShowColorPicker(false)}
                            />
                            <div style={S.abs}>
                                <ChromePicker
                                    color={roleColor}
                                    onChange={(c) => setRoleColor(c.hex)}
                                    disableAlpha={true}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div style={styles.permissionsGrid}>
                    <label style={styles.permLabel}>
                        <input
                            type="checkbox"
                            checked={permissions.is_admin || false}
                            onChange={(e) =>
                                setPermissions({ ...permissions, is_admin: e.target.checked })
                            }
                        />
                        <span className="icon-warning">
                            {t('👑_administrator_all_permissions')}
                        </span>
                    </label>
                    <label style={styles.permLabel}>
                        <input
                            type="checkbox"
                            checked={permissions.can_manage_channels || false}
                            onChange={(e) =>
                                setPermissions({
                                    ...permissions,
                                    can_manage_channels: e.target.checked,
                                })
                            }
                        />
                        Manage Channels (Open/Delete/Edit)
                    </label>
                    <label style={styles.permLabel}>
                        <input
                            type="checkbox"
                            checked={permissions.can_delete_messages || false}
                            onChange={(e) =>
                                setPermissions({
                                    ...permissions,
                                    can_delete_messages: e.target.checked,
                                })
                            }
                        />
                        Delete Messages
                    </label>
                    <label style={styles.permLabel}>
                        <input
                            type="checkbox"
                            checked={permissions.can_manage_roles || false}
                            onChange={(e) =>
                                setPermissions({
                                    ...permissions,
                                    can_manage_roles: e.target.checked,
                                })
                            }
                        />
                        Manage Roles (Create/Edit/Delete)
                    </label>
                    <label style={styles.permLabel}>
                        <input
                            type="checkbox"
                            checked={permissions.can_ban_members || false}
                            onChange={(e) =>
                                setPermissions({
                                    ...permissions,
                                    can_ban_members: e.target.checked,
                                })
                            }
                        />
                        Ban/Kick Members
                    </label>
                </div>
                <div style={styles.editorFooter}>
                    {editingRole && (
                        <button
                            onClick={() => handleDeleteRole(editingRole.id)}
                            aria-label={t('rolesTab.deleteRole', 'Delete role')}
                            style={styles.deleteBtn}
                        >
                            <FaTrash />
                            {t('delete')}
                        </button>
                    )}
                    <button
                        onClick={handleSaveRole}
                        aria-label={t('serverSettings.saveRole', 'Save role')}
                        style={styles.saveBtn}
                        disabled={loading}
                    >
                        {loading ? (
                            '...'
                        ) : (
                            <>
                                <FaCheck />
                                {t('save')}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

RolesTab.propTypes = {
    server: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onRolesChange: PropTypes.func,
};
export default RolesTab;
