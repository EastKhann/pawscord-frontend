import React, { useState, useEffect } from 'react';
import './RolesManager.css';
import confirmDialog from '../utils/confirmDialog';

const RolesManager = ({ serverId, onClose }) => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [draggedRole, setDraggedRole] = useState(null);
  
  // New role form
  const [newRole, setNewRole] = useState({
    name: '',
    color: '#8b5cf6',
    hoist: false,
    mentionable: true,
    permissions: 0
  });

  // Color presets
  const colorPresets = [
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Yellow', value: '#f59e0b' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Gray', value: '#6b7280' }
  ];

  useEffect(() => {
    fetchRoles();
  }, [serverId]);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/roles/${serverId}/list/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles || []);
      } else {
        console.error('Failed to fetch roles');
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRole = async () => {
    if (!newRole.name.trim()) {
      console.log('⚠️ Role name required');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/roles/${serverId}/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRole)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Role created successfully');
        setRoles([...roles, data.role]);
        setShowCreateModal(false);
        setNewRole({ name: '', color: '#8b5cf6', hoist: false, mentionable: true, permissions: 0 });
      } else {
        console.error('❌ Failed to create role');
      }
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const updateRole = async (roleId, updates) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/roles/${serverId}/${roleId}/update/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Role updated');
        setRoles(roles.map(r => r.id === roleId ? data.role : r));
        setEditingRole(null);
      } else {
        console.error('❌ Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const deleteRole = async (roleId) => {
    if (!await confirmDialog('Are you sure you want to delete this role?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/roles/${serverId}/${roleId}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        console.log('✅ Role deleted');
        setRoles(roles.filter(r => r.id !== roleId));
      } else {
        console.error('❌ Failed to delete role');
      }
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const reorderRoles = async (newOrder) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/roles/${serverId}/reorder/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order: newOrder })
      });

      if (response.ok) {
        console.log('✅ Roles reordered');
        fetchRoles();
      } else {
        console.error('❌ Failed to reorder roles');
      }
    } catch (error) {
      console.error('Error reordering roles:', error);
    }
  };

  const assignRole = async (roleId, userId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/roles/${serverId}/${roleId}/assign/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });

      if (response.ok) {
        console.log('✅ Role assigned');
      } else {
        console.error('❌ Failed to assign role');
      }
    } catch (error) {
      console.error('Error assigning role:', error);
    }
  };

  const removeRole = async (roleId, userId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/roles/${serverId}/${roleId}/remove/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });

      if (response.ok) {
        console.log('✅ Role removed');
      } else {
        console.error('❌ Failed to remove role');
      }
    } catch (error) {
      console.error('Error removing role:', error);
    }
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

    const draggedIndex = roles.findIndex(r => r.id === draggedRole.id);
    const targetIndex = roles.findIndex(r => r.id === targetRole.id);

    const newRoles = [...roles];
    newRoles.splice(draggedIndex, 1);
    newRoles.splice(targetIndex, 0, draggedRole);

    setRoles(newRoles);
    reorderRoles(newRoles.map(r => r.id));
    setDraggedRole(null);
  };

  const copyRole = async (roleId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/roles/${serverId}/${roleId}/copy/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Role copied');
        setRoles([...roles, data.role]);
      } else {
        console.error('❌ Failed to copy role');
      }
    } catch (error) {
      console.error('Error copying role:', error);
    }
  };

  if (loading) {
    return (
      <div className="roles-manager-overlay">
        <div className="roles-manager-modal">
          <div className="loading-spinner">Loading roles...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="roles-manager-overlay" onClick={onClose}>
      <div className="roles-manager-modal" onClick={e => e.stopPropagation()}>
        <div className="roles-manager-header">
          <h2>🎭 Server Roles</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="roles-manager-content">
          <div className="roles-actions">
            <button className="create-role-btn" onClick={() => setShowCreateModal(true)}>
              ➕ Create Role
            </button>
            <div className="roles-info">
              <span>{roles.length} roles</span>
              <span className="info-tip">💡 Drag to reorder hierarchy</span>
            </div>
          </div>

          <div className="roles-list">
            {roles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎭</div>
                <h3>No Roles Yet</h3>
                <p>Create roles to organize your server members</p>
              </div>
            ) : (
              roles.map(role => (
                <div
                  key={role.id}
                  className={`role-card ${draggedRole?.id === role.id ? 'dragging' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, role)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, role)}
                >
                  <div className="role-drag-handle">☰</div>
                  
                  <div className="role-color-badge" style={{ backgroundColor: role.color }}></div>
                  
                  <div className="role-info">
                    <div className="role-name" style={{ color: role.color }}>
                      {role.name}
                    </div>
                    <div className="role-meta">
                      <span className="role-members">👥 {role.member_count || 0} members</span>
                      {role.hoist && <span className="role-badge">📌 Hoisted</span>}
                      {role.mentionable && <span className="role-badge">@ Mentionable</span>}
                    </div>
                  </div>

                  <div className="role-actions">
                    <button
                      className="role-action-btn edit"
                      onClick={() => setEditingRole(role)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="role-action-btn copy"
                      onClick={() => copyRole(role.id)}
                      title="Copy"
                    >
                      📋
                    </button>
                    <button
                      className="role-action-btn delete"
                      onClick={() => deleteRole(role.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Create Role Modal */}
        {showCreateModal && (
          <div className="role-modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="role-modal" onClick={e => e.stopPropagation()}>
              <h3>Create New Role</h3>
              
              <div className="form-group">
                <label>Role Name</label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="Enter role name..."
                  maxLength={32}
                />
              </div>

              <div className="form-group">
                <label>Role Color</label>
                <div className="color-picker">
                  {colorPresets.map(preset => (
                    <button
                      key={preset.value}
                      className={`color-preset ${newRole.color === preset.value ? 'active' : ''}`}
                      style={{ backgroundColor: preset.value }}
                      onClick={() => setNewRole({ ...newRole, color: preset.value })}
                      title={preset.name}
                    />
                  ))}
                  <input
                    type="color"
                    value={newRole.color}
                    onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
                    className="color-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newRole.hoist}
                    onChange={(e) => setNewRole({ ...newRole, hoist: e.target.checked })}
                  />
                  <span>Display role members separately from online members</span>
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newRole.mentionable}
                    onChange={(e) => setNewRole({ ...newRole, mentionable: e.target.checked })}
                  />
                  <span>Allow anyone to @mention this role</span>
                </label>
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button className="create-btn" onClick={createRole}>
                  Create Role
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Role Modal */}
        {editingRole && (
          <div className="role-modal-overlay" onClick={() => setEditingRole(null)}>
            <div className="role-modal" onClick={e => e.stopPropagation()}>
              <h3>Edit Role</h3>
              
              <div className="form-group">
                <label>Role Name</label>
                <input
                  type="text"
                  value={editingRole.name}
                  onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                  placeholder="Enter role name..."
                  maxLength={32}
                />
              </div>

              <div className="form-group">
                <label>Role Color</label>
                <div className="color-picker">
                  {colorPresets.map(preset => (
                    <button
                      key={preset.value}
                      className={`color-preset ${editingRole.color === preset.value ? 'active' : ''}`}
                      style={{ backgroundColor: preset.value }}
                      onClick={() => setEditingRole({ ...editingRole, color: preset.value })}
                      title={preset.name}
                    />
                  ))}
                  <input
                    type="color"
                    value={editingRole.color}
                    onChange={(e) => setEditingRole({ ...editingRole, color: e.target.value })}
                    className="color-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingRole.hoist}
                    onChange={(e) => setEditingRole({ ...editingRole, hoist: e.target.checked })}
                  />
                  <span>Display role members separately</span>
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingRole.mentionable}
                    onChange={(e) => setEditingRole({ ...editingRole, mentionable: e.target.checked })}
                  />
                  <span>Allow anyone to @mention this role</span>
                </label>
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setEditingRole(null)}>
                  Cancel
                </button>
                <button className="save-btn" onClick={() => updateRole(editingRole.id, editingRole)}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesManager;
