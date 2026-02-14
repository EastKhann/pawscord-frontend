import { COLOR_PRESETS } from './useRolesManager';

const RoleFormModal = ({ role, setRole, onSave, onCancel, title, saveLabel }) => (
    <div className="role-modal-overlay" onClick={onCancel}>
        <div className="role-modal" onClick={e => e.stopPropagation()}>
            <h3>{title}</h3>

            <div className="form-group">
                <label>Role Name</label>
                <input type="text" value={role.name} onChange={(e) => setRole({ ...role, name: e.target.value })} placeholder="Enter role name..." maxLength={32} />
            </div>

            <div className="form-group">
                <label>Role Color</label>
                <div className="color-picker">
                    {COLOR_PRESETS.map(preset => (
                        <button key={preset.value} className={`color-preset ${role.color === preset.value ? 'active' : ''}`} style={{ backgroundColor: preset.value }} onClick={() => setRole({ ...role, color: preset.value })} title={preset.name} />
                    ))}
                    <input type="color" value={role.color} onChange={(e) => setRole({ ...role, color: e.target.value })} className="color-input" />
                </div>
            </div>

            <div className="form-group">
                <label className="checkbox-label">
                    <input type="checkbox" checked={role.hoist} onChange={(e) => setRole({ ...role, hoist: e.target.checked })} />
                    <span>Display role members separately from online members</span>
                </label>
            </div>

            <div className="form-group">
                <label className="checkbox-label">
                    <input type="checkbox" checked={role.mentionable} onChange={(e) => setRole({ ...role, mentionable: e.target.checked })} />
                    <span>Allow anyone to @mention this role</span>
                </label>
            </div>

            <div className="modal-actions">
                <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                <button className={title.includes('Edit') ? 'save-btn' : 'create-btn'} onClick={onSave}>{saveLabel}</button>
            </div>
        </div>
    </div>
);

export default RoleFormModal;
