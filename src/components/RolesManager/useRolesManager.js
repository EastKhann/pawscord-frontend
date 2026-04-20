/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

export const INITIAL_ROLE = {
    name: '',
    color: '#5865f2',
    hoist: false,
    mentionable: true,
    permissions: 0,
};

export const COLOR_PRESETS = [
    { name: 'Purple', value: '#5865f2' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#f23f42' },
    { name: 'Yellow', value: '#f59e0b' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Indigo', value: '#4752c4' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Gray', value: '#6b7280' },
];

const useRolesManager = (serverId) => {
    const { t } = useTranslation();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [draggedRole, setDraggedRole] = useState(null);
    const [newRole, setNewRole] = useState(INITIAL_ROLE);

    const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

    useEffect(() => {
        fetchRoles();
    }, [serverId]);

    const fetchRoles = async () => {
        try {
            setLoading(true);
            const r = await fetch(`${API_BASE_URL}/servers/${serverId}/roles/`, {
                headers: authHeaders(),
            });
            if (r.ok) {
                const d = await r.json();
                setRoles(d.roles || []);
            }
        } catch (e) {
            logger.error('Error fetching roles:', e);
        } finally {
            setLoading(false);
        }
    };

    const createRole = async () => {
        if (!newRole.name.trim()) return;
        try {
            const r = await fetch(`${API_BASE_URL}/servers/${serverId}/roles/create/`, {
                method: 'POST',
                headers: { ...authHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify(newRole),
            });
            if (r.ok) {
                const d = await r.json();
                setRoles([...roles, d.role]);
                setShowCreateModal(false);
                setNewRole(INITIAL_ROLE);
            }
        } catch (e) {
            logger.error('Error creating role:', e);
        }
    };

    const updateRole = async (roleId, updates) => {
        try {
            const r = await fetch(`${API_BASE_URL}/servers/${serverId}/roles/create/`, {
                method: 'POST',
                headers: { ...authHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ role_id: roleId, ...updates }),
            });
            if (r.ok) {
                const d = await r.json();
                setRoles(roles.map((ro) => (ro.id === roleId ? d.role : ro)));
                setEditingRole(null);
            }
        } catch (e) {
            logger.error('Error updating role:', e);
        }
    };

    const deleteRole = async (roleId) => {
        if (!(await confirmDialog('Bu rolü silmek istediğinizden emin misiniz?'))) return;
        try {
            const r = await fetch(`${API_BASE_URL}/roles/${roleId}/delete/`, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            if (r.ok) setRoles(roles.filter((ro) => ro.id !== roleId));
        } catch (e) {
            logger.error('Error deleting role:', e);
        }
    };

    const reorderRoles = async (newOrder) => {
        try {
            await fetch(`${API_BASE_URL}/servers/${serverId}/roles/reorder/`, {
                method: 'POST',
                headers: { ...authHeaders(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ order: newOrder }),
            });
            fetchRoles();
        } catch (e) {
            logger.error('Error reordering roles:', e);
        }
    };

    const copyRole = async (_roleId) => {
        // TODO: Backend endpoint not yet implemented
        toast.info(t('common.comingSoon'));
    };

    const handleDragStart = (e, role) => {
        setDraggedRole(role);
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    const handleDrop = (e, targetRole) => {
        e.preventDefault();
        if (!draggedRole || draggedRole.id === targetRole.id) return;
        const newRoles = [...roles];
        const di = newRoles.findIndex((r) => r.id === draggedRole.id);
        const ti = newRoles.findIndex((r) => r.id === targetRole.id);
        newRoles.splice(di, 1);
        newRoles.splice(ti, 0, draggedRole);
        setRoles(newRoles);
        reorderRoles(newRoles.map((r) => r.id));
        setDraggedRole(null);
    };

    return {
        roles,
        loading,
        showCreateModal,
        setShowCreateModal,
        editingRole,
        setEditingRole,
        draggedRole,
        newRole,
        setNewRole,
        createRole,
        updateRole,
        deleteRole,
        copyRole,
        handleDragStart,
        handleDragOver,
        handleDrop,
    };
};

export default useRolesManager;
