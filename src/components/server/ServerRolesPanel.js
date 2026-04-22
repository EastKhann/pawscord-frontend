// frontend/src/components/ServerRolesPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaUserShield, FaPlus, FaTrash, FaGripVertical, FaPalette } from 'react-icons/fa';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import confirmDialog from '../../utils/confirmDialog';

// -- dynamic style helpers (pass 2) --
const S = {
    flex: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' },
};

/**
 * 🛡️ Server Roles Panel
 * Drag & drop rol hiyerarşisi
 */

const ServerRolesPanel = ({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
    const { t } = useTranslation();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewRole, setShowNewRole] = useState(false);
    const [newRole, setNewRole] = useState({ name: '', color: '#5865f2', permissions: [] });
    const [draggedRole, setDraggedRole] = useState(null);

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/roles/list/`);
            if (response.ok) {
                const data = await response.json();
                setRoles(data.sort((a, b) => (b.position || 0) - (a.position || 0)));
            }
        } catch (error) {
            logger.error(t('ui.role_load_hatasi_2'), error);
            toast.error(t('roles.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const createRole = async () => {
        if (!newRole.name.trim()) {
            toast.error(t('ui.role_adi_gerekli'));
            return;
        }

        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/servers/${serverId}/roles/create/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newRole),
                }
            );

            if (response.ok) {
                toast.success(t('roles.created'));
                setNewRole({ name: '', color: '#5865f2', permissions: [] });
                setShowNewRole(false);
                loadRoles();
            } else {
                toast.error(t('ui.role_olusturulamadi'));
            }
        } catch (error) {
            logger.error(t('ui.role_olusturma_hatasi'), error);
            toast.error(t('roles.error'));
        }
    };

    const deleteRole = async (roleId) => {
        if (!(await confirmDialog(t('roles.deleteConfirm')))) return;

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/roles/${roleId}/delete/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success(t('roles.deleted'));
                loadRoles();
            } else {
                toast.error(t('roles.deleteFailed'));
            }
        } catch (error) {
            logger.error(t('ui.role_silme_hatasi'), error);
            toast.error(t('roles.error'));
        }
    };

    const handleDragStart = (role) => {
        setDraggedRole(role);
    };

    const handleDragOver = (e, targetRole) => {
        e.preventDefault();
        if (!draggedRole || draggedRole.id === targetRole.id) return;

        const newRoles = [...roles];
        const draggedIndex = newRoles.findIndex((r) => r.id === draggedRole.id);
        const targetIndex = newRoles.findIndex((r) => r.id === targetRole.id);

        newRoles.splice(draggedIndex, 1);
        newRoles.splice(targetIndex, 0, draggedRole);

        setRoles(newRoles);
    };

    const handleDragEnd = async () => {
        if (!draggedRole) return;

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/roles/reorder/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roles: roles.map((role, index) => ({
                        id: role.id,
                        position: roles.length - index,
                    })),
                }),
            });

            if (response.ok) {
                toast.success(t('ui.role_sortsi_updated'));
            }
        } catch (error) {
            logger.error(t('ui.sortma_hatasi'), error);
            toast.error(t('common.errorOccurred'));
        }

        setDraggedRole(null);
    };

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div className="flex-align-10">
                        <FaUserShield className="icon-primary" />
                        <h2 className="m-0">{t('roles.title')}</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.toolbar}>
                    <button
                        aria-label={showNewRole ? t('serverRoles.hideNewRole', 'Hide new role form') : t('serverRoles.createRole', 'Create new role')}
                    style={styles.newRoleBtn}
                    >
                    <FaPlus /> {t('roles.newRole')}
                </button>
                <p className="text-888-12">💡 {t('roles.dragTip')}</p>
            </div>

            {showNewRole && (
                <div style={styles.newRoleForm}>
                    <input
                        type="text"
                        placeholder={t('ui.role_adi')}
                        value={newRole.name}
                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                        style={styles.input}
                    />
                    <div style={S.flex}>
                        <FaPalette className="icon-gray" />
                        <input
                            type="color"
                            value={newRole.color}
                            onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
                            style={styles.colorPicker}
                        />
                        <span className="text-dbd-14">{newRole.color}</span>
                    </div>
                    <div className="flex-gap-10">
                        <button
                            aria-label={t('roles.create')}
                            onClick={createRole}
                            style={styles.saveBtn}
                        >
                            {t('roles.create')}
                        </button>
                        <button
                            aria-label={t('common.cancel', 'Cancel')}
                        style={styles.cancelBtn}
                            >
                        {t('common.cancel')}
                    </button>
                </div>
                    </div>
    )
}

<div style={styles.rolesList}>
    {loading ? (
        <div style={styles.loading}>{t('common.loading')}</div>
    ) : roles.length === 0 ? (
        <div style={styles.empty}>
            <FaUserShield className="icon-lg" />
            <p>{t('roles.empty')}</p>
        </div>
    ) : (
        roles.map((role, index) => (
            <div
                key={role.id}
                draggable
                onDragStart={() => handleDragStart(role)}
                onDragOver={(e) => handleDragOver(e, role)}
                onDragEnd={handleDragEnd}
                style={{
                    ...styles.roleItem,
                    opacity: draggedRole?.id === role.id ? 0.5 : 1,
                }}
            >
                <div style={styles.dragHandle}>
                    <FaGripVertical className="icon-gray" />
                </div>
                <div />
                <div style={styles.roleContent}>
                    <div style={styles.roleName}>{role.name}</div>
                    <div style={styles.roleMeta}>
                        Pozisyon: {index + 1} • {role.member_count || 0} member
                    </div>
                </div>
                {!role.is_default && (
                    <button
                        aria-label={t('serverRoles.deleteRole', 'Delete role')}
                        style={styles.deleteBtn}
                        title="Sil"
                    >
                        <FaTrash />
                    </button>
                )}
            </div>
        ))
    )}
</div>
            </div> 
        </div >
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333',
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888',
    },
    toolbar: {
        padding: '15px 20px',
        borderBottom: '1px solid #333',
    },
    newRoleBtn: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500',
    },
    newRoleForm: {
        padding: '20px',
        backgroundColor: '#111214',
        borderBottom: '1px solid #333',
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        marginBottom: '15px',
    },
    colorPicker: {
        width: '60px',
        height: '40px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    saveBtn: {
        flex: 1,
        backgroundColor: '#23a559',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: '#4e5058',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    rolesList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    roleItem: {
        display: 'flex',
        gap: '15px',
        padding: '12px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        marginBottom: '8px',
        alignItems: 'center',
        cursor: 'move',
        transition: 'opacity 0.2s',
    },
    dragHandle: {
        cursor: 'grab',
        padding: '5px',
    },
    roleColor: {
        width: '4px',
        height: '40px',
        borderRadius: '2px',
    },
    roleContent: {
        flex: 1,
    },
    roleName: {
        fontWeight: '600',
        marginBottom: '4px',
    },
    roleMeta: {
        fontSize: '12px',
        color: '#888',
    },
    deleteBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#f23f42',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '8px',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#888',
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#888',
    },
};

ServerRolesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default ServerRolesPanel;
