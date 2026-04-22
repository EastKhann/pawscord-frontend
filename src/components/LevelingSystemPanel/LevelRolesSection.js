import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const LevelRolesSection = ({
    levelRoles,
    newRole,
    setNewRole,
    roles,
    addLevelRole,
    removeLevelRole,
}) => {
    const { t } = useTranslation();
    return (
        <div className="level-roles-section">
            <h3>{'\u{1F3AF}'} Seviye Rolleri</h3>
            <div className="add-role-form">
                <input
                    type="number"
                    min="1"
                    max="100"
                    value={newRole.level}
                    onChange={(e) =>
                        setNewRole({ ...newRole, level: parseInt(e.target.value) || 1 })
                    }
                    placeholder={t('level')}
                    className="level-input"
                />
                <select
                    value={newRole.role_id}
                    onChange={(e) => setNewRole({ ...newRole, role_id: e.target.value })}
                    className="role-select"
                >
                    <option value="">{t('leveling.selectRole','Select role')}</option>
                    {roles.map((r) => (
                        <option key={r.id} value={r.id}>
                            {r.name}
                        </option>
                    ))}
                </select>
                <button className="add-role-btn" onClick={addLevelRole}>
                    ➕ Add
                </button>
            </div>
            {levelRoles.length > 0 ? (
                <div className="level-roles-list">
                    {levelRoles.map((lr) => (
                        <div key={lr.id} className="level-role-item">
                            <span className="level-badge">Lv. {lr.level}</span>
                            <span className="role-name">{lr.role_name || 'Role'}</span>
                            <button
                                className="remove-role-btn"
                                onClick={() => removeLevelRole(lr.id)}
                            >
                                ✖
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-data">{t('leveling.noLevelRoles','No level roles yet')}</p>
            )}
        </div>
    );
};

LevelRolesSection.propTypes = {
    levelRoles: PropTypes.array,
    newRole: PropTypes.object,
    setNewRole: PropTypes.func,
    roles: PropTypes.array,
    addLevelRole: PropTypes.func,
    removeLevelRole: PropTypes.func,
};
export default LevelRolesSection;
