/* eslint-disable jsx-a11y/label-has-associated-control */
import { COLOR_PRESETS } from './useRolesManager';
import PropTypes from 'prop-types';
import useModalA11y from '../../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';

const RoleFormModal = ({ role, setRole, onSave, onCancel, title, saveLabel }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ onClose: onCancel, label: 'Role Formu' });
    return (
        <div className="role-modal-overlay" {...overlayProps}>
            <div className="role-modal" {...dialogProps}>
                <h3>{title}</h3>

                <div className="form-group">
                    <label>{t('roles.roleName','Role Name')}</label>
                    <input
                        type="text"
                        value={role.name}
                        onChange={(e) => setRole({ ...role, name: e.target.value })}
                        placeholder={t('roles.namePlaceholder', 'Enter role name...')}
                        maxLength={32}
                    />
                </div>

                <div className="form-group">
                    <label>Rol Rengi</label>
                    <div className="color-picker">
                        {COLOR_PRESETS.map((preset) => (
                            <button
                                key={preset.value}
                                className={`color-preset ${role.color === preset.value ? 'active' : ''}`}
                                style={{ backgroundColor: preset.value }}
                                onClick={() => setRole({ ...role, color: preset.value })}
                                title={preset.name}
                            />
                        ))}
                        <input
                            type="color"
                            value={role.color}
                            onChange={(e) => setRole({ ...role, color: e.target.value })}
                            className="color-input"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={role.hoist}
                            onChange={(e) => setRole({ ...role, hoist: e.target.checked })}
                        />
                        <span>{t('roles.hoistDesc','Show role members separately from online members')}</span>
                    </label>
                </div>

                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={role.mentionable}
                            onChange={(e) => setRole({ ...role, mentionable: e.target.checked })}
                        />
                        <span>{t('roles.mentionableDesc','Everyone can use @mention for this role')}</span>
                    </label>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onCancel}>
                        {t('common.cancel')}
                    </button>
                    <button
                        className={title.includes('Edit') ? 'save-btn' : 'create-btn'}
                        onClick={onSave}
                    >
                        {saveLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

RoleFormModal.propTypes = {
    role: PropTypes.string,
    setRole: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    title: PropTypes.string,
    saveLabel: PropTypes.func,
};
export default RoleFormModal;
