import useRolesManager from './RolesManager/useRolesManager';
import RoleFormModal from './RolesManager/RoleFormModal';
import './RolesManager.css';

const RolesManager = ({ serverId, onClose }) => {
  const s = useRolesManager(serverId);

  if (s.loading) {
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
          <h2>{'🎭'} Server Roles</h2>
          <button className="close-btn" onClick={onClose}>{'✕'}</button>
        </div>

        <div className="roles-manager-content">
          <div className="roles-actions">
            <button className="create-role-btn" onClick={() => s.setShowCreateModal(true)}>{'➕'} Create Role</button>
            <div className="roles-info">
              <span>{s.roles.length} roles</span>
              <span className="info-tip">{'💡'} Drag to reorder hierarchy</span>
            </div>
          </div>

          <div className="roles-list">
            {s.roles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">{'🎭'}</div>
                <h3>No Roles Yet</h3>
                <p>Create roles to organize your server members</p>
              </div>
            ) : s.roles.map(role => (
              <div key={role.id} className={`role-card ${s.draggedRole?.id === role.id ? 'dragging' : ''}`}
                draggable onDragStart={(e) => s.handleDragStart(e, role)} onDragOver={s.handleDragOver} onDrop={(e) => s.handleDrop(e, role)}>
                <div className="role-drag-handle">{'☰'}</div>
                <div className="role-color-badge" style={{ backgroundColor: role.color }} />
                <div className="role-info">
                  <div className="role-name" style={{ color: role.color }}>{role.name}</div>
                  <div className="role-meta">
                    <span className="role-members">{'👥'} {role.member_count || 0} members</span>
                    {role.hoist && <span className="role-badge">{'📌'} Hoisted</span>}
                    {role.mentionable && <span className="role-badge">@ Mentionable</span>}
                  </div>
                </div>
                <div className="role-actions">
                  <button className="role-action-btn edit" onClick={() => s.setEditingRole(role)} title="Edit">{'✏️'}</button>
                  <button className="role-action-btn copy" onClick={() => s.copyRole(role.id)} title="Copy">{'📋'}</button>
                  <button className="role-action-btn delete" onClick={() => s.deleteRole(role.id)} title="Delete">{'🗑️'}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {s.showCreateModal && (
          <RoleFormModal role={s.newRole} setRole={s.setNewRole} onSave={s.createRole} onCancel={() => s.setShowCreateModal(false)} title="Create New Role" saveLabel="Create Role" />
        )}

        {s.editingRole && (
          <RoleFormModal role={s.editingRole} setRole={s.setEditingRole} onSave={() => s.updateRole(s.editingRole.id, s.editingRole)} onCancel={() => s.setEditingRole(null)} title="Edit Role" saveLabel="Save Changes" />
        )}
      </div>
    </div>
  );
};

export default RolesManager;
