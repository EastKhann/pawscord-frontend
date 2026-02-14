const LevelRolesSection = ({ levelRoles, newRole, setNewRole, roles, addLevelRole, removeLevelRole }) => (
  <div className="level-roles-section">
    <h3>{'\u{1F3AF}'} Seviye Rolleri</h3>
    <div className="add-role-form">
      <input type="number" min="1" max="100" value={newRole.level} onChange={e => setNewRole({ ...newRole, level: parseInt(e.target.value) || 1 })} placeholder="Seviye" className="level-input" />
      <select value={newRole.role_id} onChange={e => setNewRole({ ...newRole, role_id: e.target.value })} className="role-select">
        <option value="">Rol se{'\u00E7'}in</option>
        {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
      </select>
      <button className="add-role-btn" onClick={addLevelRole}>{'\u2795'} Ekle</button>
    </div>
    {levelRoles.length > 0 ? (
      <div className="level-roles-list">
        {levelRoles.map(lr => (
          <div key={lr.id} className="level-role-item">
            <span className="level-badge">Lv. {lr.level}</span>
            <span className="role-name">{lr.role_name || 'Rol'}</span>
            <button className="remove-role-btn" onClick={() => removeLevelRole(lr.id)}>{'\u2716'}</button>
          </div>
        ))}
      </div>
    ) : (
      <p className="no-data">Hen{'\u00FC'}z seviye rol{'\u00FC'} yok</p>
    )}
  </div>
);

export default LevelRolesSection;
