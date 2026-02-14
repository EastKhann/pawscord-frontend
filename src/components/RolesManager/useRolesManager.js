import { useState, useEffect } from 'react';
import confirmDialog from '../../utils/confirmDialog';

export const INITIAL_ROLE = { name: '', color: '#8b5cf6', hoist: false, mentionable: true, permissions: 0 };

export const COLOR_PRESETS = [
  { name: 'Purple', value: '#8b5cf6' }, { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' }, { name: 'Red', value: '#ef4444' },
  { name: 'Yellow', value: '#f59e0b' }, { name: 'Pink', value: '#ec4899' },
  { name: 'Indigo', value: '#6366f1' }, { name: 'Teal', value: '#14b8a6' },
  { name: 'Orange', value: '#f97316' }, { name: 'Gray', value: '#6b7280' }
];

const useRolesManager = (serverId) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [draggedRole, setDraggedRole] = useState(null);
  const [newRole, setNewRole] = useState(INITIAL_ROLE);

  const authHeaders = () => ({ 'Authorization': `Bearer ${localStorage.getItem('access_token')}` });

  useEffect(() => { fetchRoles(); }, [serverId]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const r = await fetch(`/api/roles/${serverId}/list/`, { headers: authHeaders() });
      if (r.ok) { const d = await r.json(); setRoles(d.roles || []); }
    } catch (e) { console.error('Error fetching roles:', e); }
    finally { setLoading(false); }
  };

  const createRole = async () => {
    if (!newRole.name.trim()) return;
    try {
      const r = await fetch(`/api/roles/${serverId}/create/`, {
        method: 'POST', headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole)
      });
      if (r.ok) { const d = await r.json(); setRoles([...roles, d.role]); setShowCreateModal(false); setNewRole(INITIAL_ROLE); }
    } catch (e) { console.error('Error creating role:', e); }
  };

  const updateRole = async (roleId, updates) => {
    try {
      const r = await fetch(`/api/roles/${serverId}/${roleId}/update/`, {
        method: 'PUT', headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (r.ok) { const d = await r.json(); setRoles(roles.map(ro => ro.id === roleId ? d.role : ro)); setEditingRole(null); }
    } catch (e) { console.error('Error updating role:', e); }
  };

  const deleteRole = async (roleId) => {
    if (!await confirmDialog('Are you sure you want to delete this role?')) return;
    try {
      const r = await fetch(`/api/roles/${serverId}/${roleId}/delete/`, { method: 'DELETE', headers: authHeaders() });
      if (r.ok) setRoles(roles.filter(ro => ro.id !== roleId));
    } catch (e) { console.error('Error deleting role:', e); }
  };

  const reorderRoles = async (newOrder) => {
    try {
      await fetch(`/api/roles/${serverId}/reorder/`, {
        method: 'POST', headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder })
      });
      fetchRoles();
    } catch (e) { console.error('Error reordering roles:', e); }
  };

  const copyRole = async (roleId) => {
    try {
      const r = await fetch(`/api/roles/${serverId}/${roleId}/copy/`, { method: 'POST', headers: authHeaders() });
      if (r.ok) { const d = await r.json(); setRoles([...roles, d.role]); }
    } catch (e) { console.error('Error copying role:', e); }
  };

  const handleDragStart = (e, role) => { setDraggedRole(role); e.dataTransfer.effectAllowed = 'move'; };
  const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
  const handleDrop = (e, targetRole) => {
    e.preventDefault();
    if (!draggedRole || draggedRole.id === targetRole.id) return;
    const newRoles = [...roles];
    const di = newRoles.findIndex(r => r.id === draggedRole.id);
    const ti = newRoles.findIndex(r => r.id === targetRole.id);
    newRoles.splice(di, 1); newRoles.splice(ti, 0, draggedRole);
    setRoles(newRoles); reorderRoles(newRoles.map(r => r.id)); setDraggedRole(null);
  };

  return {
    roles, loading, showCreateModal, setShowCreateModal, editingRole, setEditingRole,
    draggedRole, newRole, setNewRole, createRole, updateRole, deleteRole, copyRole,
    handleDragStart, handleDragOver, handleDrop
  };
};

export default useRolesManager;
