import { useState } from 'react';
import { FaPlus, FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { ChromePicker } from 'react-color';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import styles from './styles';

const RolesTab = ({ server, fetchWithAuth, apiBaseUrl, onRolesChange }) => {
    const [roles, setRolesLocal] = useState(server.roles || []);
    const setRoles = (updater) => {
        setRolesLocal(prev => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            if (onRolesChange) onRolesChange(next);
            return next;
        });
    };
    const [editingRole, setEditingRole] = useState(null);
    const [roleName, setRoleName] = useState('');
    const [roleColor, setRoleColor] = useState('#99aab5');
    const [permissions, setPermissions] = useState({
        is_admin: false, can_manage_channels: false, can_delete_messages: false,
        can_manage_roles: false, can_ban_members: false
    });
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const startEditRole = (role) => {
        setEditingRole(role);
        setRoleName(role.name);
        setRoleColor(role.color);
        setPermissions({
            is_admin: !!role.is_admin, can_manage_channels: !!role.can_manage_channels,
            can_delete_messages: !!role.can_delete_messages, can_manage_roles: !!role.can_manage_roles,
            can_ban_members: !!role.can_ban_members
        });
    };

    const resetForm = () => {
        setEditingRole(null); setRoleName(''); setRoleColor('#99aab5');
        setPermissions({ is_admin: false, can_manage_channels: false, can_delete_messages: false, can_manage_roles: false, can_ban_members: false });
    };

    const handleSaveRole = async (e) => {
        e.preventDefault();
        if (!roleName.trim()) return;
        setLoading(true);
        const payload = {
            role_id: editingRole ? editingRole.id : null, name: roleName, color: roleColor,
            is_admin: permissions.is_admin, can_manage_channels: permissions.can_manage_channels,
            can_delete_messages: permissions.can_delete_messages, can_manage_roles: permissions.can_manage_roles,
            can_ban_members: permissions.can_ban_members
        };
        try {
            const url = editingRole ? `${apiBaseUrl}/roles/${editingRole.id}/update/` : `${apiBaseUrl}/servers/${server.id}/roles/create/`;
            const res = await fetchWithAuth(url, {
                method: editingRole ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const savedRole = await res.json();
                setRoles(prev => editingRole ? prev.map(r => r.id === savedRole.id ? savedRole : r) : [...prev, savedRole]);
                resetForm(); setShowColorPicker(false);
            } else { toast.error("Rol kaydedilemedi."); }
        } catch (error) { console.error("Rol hatası:", error); }
        finally { setLoading(false); }
    };

    const handleDeleteRole = async (roleId) => {
        if (!await confirmDialog("Bu rolü silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/roles/${roleId}/delete/`, { method: 'DELETE' });
            if (res.ok) {
                setRoles(prev => prev.filter(r => r.id !== roleId));
                if (editingRole?.id === roleId) resetForm();
            }
        } catch (e) { console.error(e); }
    };

    return (
        <div style={{ display: 'flex', height: '100%', gap: '20px' }}>
            {/* SOL: ROL LİSTESİ */}
            <div style={styles.rolesSidebar}>
                <button onClick={resetForm} style={styles.newRoleBtn}><FaPlus /> Yeni Rol Oluştur</button>
                <div style={styles.rolesList}>
                    {roles.map(role => (
                        <div key={role.id}
                            style={{ ...styles.roleItem, backgroundColor: editingRole?.id === role.id ? '#40444b' : 'transparent', borderLeft: `4px solid ${role.color}` }}
                            onClick={() => startEditRole(role)}>
                            <span>{role.name}</span>
                            <FaEdit style={{ opacity: 0.5, fontSize: '0.8em' }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* SAĞ: EDİTÖR */}
            <div style={styles.roleEditor}>
                <h3 style={styles.editorTitle}>{editingRole ? 'Rolü Düzenle' : 'Yeni Rol'}</h3>
                <div style={styles.inputGroup}>
                    <label>Rol Adı</label>
                    <input value={roleName} onChange={e => setRoleName(e.target.value)} style={styles.input} placeholder="Örn: Moderatör" />
                </div>
                <div style={styles.inputGroup}>
                    <label>Rol Rengi</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ ...styles.colorPreview, backgroundColor: roleColor }} onClick={() => setShowColorPicker(!showColorPicker)} />
                        <span style={{ fontSize: '0.9em', color: '#b9bbbe' }}>{roleColor}</span>
                    </div>
                    {showColorPicker && (
                        <>
                            <div style={styles.cover} onClick={() => setShowColorPicker(false)} />
                            <div style={{ position: 'absolute', zIndex: 1000, marginTop: '10px' }}>
                                <ChromePicker color={roleColor} onChange={c => setRoleColor(c.hex)} disableAlpha={true} />
                            </div>
                        </>
                    )}
                </div>
                <div style={styles.permissionsGrid}>
                    <label style={styles.permLabel}>
                        <input type="checkbox" checked={permissions.is_admin || false} onChange={e => setPermissions({ ...permissions, is_admin: e.target.checked })} />
                        <span style={{ color: '#f0b232' }}>👑 Yönetici (Her yetkiye sahip)</span>
                    </label>
                    <label style={styles.permLabel}>
                        <input type="checkbox" checked={permissions.can_manage_channels || false} onChange={e => setPermissions({ ...permissions, can_manage_channels: e.target.checked })} />
                        Kanal Yönet (Aç/Sil/Düzenle)
                    </label>
                    <label style={styles.permLabel}>
                        <input type="checkbox" checked={permissions.can_delete_messages || false} onChange={e => setPermissions({ ...permissions, can_delete_messages: e.target.checked })} />
                        Mesajları Sil
                    </label>
                    <label style={styles.permLabel}>
                        <input type="checkbox" checked={permissions.can_manage_roles || false} onChange={e => setPermissions({ ...permissions, can_manage_roles: e.target.checked })} />
                        Rolleri Yönet (Oluştur/Düzenle/Sil)
                    </label>
                    <label style={styles.permLabel}>
                        <input type="checkbox" checked={permissions.can_ban_members || false} onChange={e => setPermissions({ ...permissions, can_ban_members: e.target.checked })} />
                        Üyeleri Yasakla/At
                    </label>
                </div>
                <div style={styles.editorFooter}>
                    {editingRole && (
                        <button onClick={() => handleDeleteRole(editingRole.id)} style={styles.deleteBtn}><FaTrash /> Sil</button>
                    )}
                    <button onClick={handleSaveRole} style={styles.saveBtn} disabled={loading}>
                        {loading ? '...' : <><FaCheck /> Kaydet</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RolesTab;
