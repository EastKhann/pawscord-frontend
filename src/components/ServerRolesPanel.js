// frontend/src/components/ServerRolesPanel.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaUserShield, FaPlus, FaTrash, FaGripVertical, FaPalette } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 🛡️ Server Roles Panel
 * Drag & drop rol hiyerarşisi
 */

const ServerRolesPanel = ({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
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
            const response = await fetchWithAuth(`${apiBaseUrl}/api/servers/${serverId}/roles/list/`);
            if (response.ok) {
                const data = await response.json();
                setRoles(data.sort((a, b) => (b.position || 0) - (a.position || 0)));
            }
        } catch (error) {
            console.error('Rol yükleme hatası:', error);
            toast.error('Roller yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const createRole = async () => {
        if (!newRole.name.trim()) {
            toast.error('Rol adı gerekli');
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/servers/${serverId}/roles/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRole)
            });

            if (response.ok) {
                toast.success('Rol oluşturuldu');
                setNewRole({ name: '', color: '#5865f2', permissions: [] });
                setShowNewRole(false);
                loadRoles();
            } else {
                toast.error('Rol oluşturulamadı');
            }
        } catch (error) {
            console.error('Rol oluşturma hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const deleteRole = async (roleId) => {
        if (!confirm('Bu rolü silmek istediğinize emin misiniz?')) return;

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/roles/${roleId}/delete/`, {
                method: 'DELETE'
            });

            if (response.ok) {
                toast.success('Rol silindi');
                loadRoles();
            } else {
                toast.error('Rol silinemedi');
            }
        } catch (error) {
            console.error('Rol silme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const handleDragStart = (role) => {
        setDraggedRole(role);
    };

    const handleDragOver = (e, targetRole) => {
        e.preventDefault();
        if (!draggedRole || draggedRole.id === targetRole.id) return;

        const newRoles = [...roles];
        const draggedIndex = newRoles.findIndex(r => r.id === draggedRole.id);
        const targetIndex = newRoles.findIndex(r => r.id === targetRole.id);

        newRoles.splice(draggedIndex, 1);
        newRoles.splice(targetIndex, 0, draggedRole);

        setRoles(newRoles);
    };

    const handleDragEnd = async () => {
        if (!draggedRole) return;

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/roles/reorder/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roles: roles.map((role, index) => ({ id: role.id, position: roles.length - index }))
                })
            });

            if (response.ok) {
                toast.success('Rol sıralaması güncellendi');
            }
        } catch (error) {
            console.error('Sıralama hatası:', error);
            toast.error('Bir hata oluştu');
        }

        setDraggedRole(null);
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaUserShield style={{ color: '#5865f2' }} />
                        <h2 style={{ margin: 0 }}>Sunucu Rolleri</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.toolbar}>
                    <button onClick={() => setShowNewRole(!showNewRole)} style={styles.newRoleBtn}>
                        <FaPlus /> Yeni Rol
                    </button>
                    <p style={{ fontSize: '12px', color: '#888', margin: '10px 0 0 0' }}>
                        💡 Rolleri sürükleyerek hiyerarşiyi değiştirebilirsiniz
                    </p>
                </div>

                {showNewRole && (
                    <div style={styles.newRoleForm}>
                        <input
                            type="text"
                            placeholder="Rol adı..."
                            value={newRole.name}
                            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                            style={styles.input}
                        />
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
                            <FaPalette style={{ color: '#888' }} />
                            <input
                                type="color"
                                value={newRole.color}
                                onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
                                style={styles.colorPicker}
                            />
                            <span style={{ color: '#dcddde', fontSize: '14px' }}>{newRole.color}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={createRole} style={styles.saveBtn}>Oluştur</button>
                            <button onClick={() => setShowNewRole(false)} style={styles.cancelBtn}>İptal</button>
                        </div>
                    </div>
                )}

                <div style={styles.rolesList}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : roles.length === 0 ? (
                        <div style={styles.empty}>
                            <FaUserShield style={{ fontSize: '48px', color: '#555' }} />
                            <p>Henüz rol yok</p>
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
                                    opacity: draggedRole?.id === role.id ? 0.5 : 1
                                }}
                            >
                                <div style={styles.dragHandle}>
                                    <FaGripVertical style={{ color: '#888' }} />
                                </div>
                                <div
                                    style={{
                                        ...styles.roleColor,
                                        backgroundColor: role.color || '#5865f2'
                                    }}
                                />
                                <div style={styles.roleContent}>
                                    <div style={styles.roleName}>{role.name}</div>
                                    <div style={styles.roleMeta}>
                                        Pozisyon: {index + 1} • {role.member_count || 0} üye
                                    </div>
                                </div>
                                {!role.is_default && (
                                    <button
                                        onClick={() => deleteRole(role.id)}
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
        </div>
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
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333'
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888'
    },
    toolbar: {
        padding: '15px 20px',
        borderBottom: '1px solid #333'
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
        fontWeight: '500'
    },
    newRoleForm: {
        padding: '20px',
        backgroundColor: '#2c2f33',
        borderBottom: '1px solid #333'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        marginBottom: '15px'
    },
    colorPicker: {
        width: '60px',
        height: '40px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    saveBtn: {
        flex: 1,
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
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
        fontWeight: '500'
    },
    rolesList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    roleItem: {
        display: 'flex',
        gap: '15px',
        padding: '12px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        marginBottom: '8px',
        alignItems: 'center',
        cursor: 'move',
        transition: 'opacity 0.2s'
    },
    dragHandle: {
        cursor: 'grab',
        padding: '5px'
    },
    roleColor: {
        width: '4px',
        height: '40px',
        borderRadius: '2px'
    },
    roleContent: {
        flex: 1
    },
    roleName: {
        fontWeight: '600',
        marginBottom: '4px'
    },
    roleMeta: {
        fontSize: '12px',
        color: '#888'
    },
    deleteBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ed4245',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '8px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#888'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#888'
    }
};

export default ServerRolesPanel;
