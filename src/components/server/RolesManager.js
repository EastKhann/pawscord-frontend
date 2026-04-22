import { useState } from 'react';
import PropTypes from 'prop-types';
import useRolesManager from '../RolesManager/useRolesManager';
import RoleFormModal from '../RolesManager/RoleFormModal';
import './RolesManager.css';

import { useTranslation } from 'react-i18next';

const RolesManager = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const s = useRolesManager(serverId);

    if (s.loading) {
        return (
            <div className="roles-manager-overlay">
                <div className="roles-manager-modal">
                    <div className="loading-spinner">{t('roles.loading')}</div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="roles-manager-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="roles-manager-modal"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="roles-manager-header">
                    <h2>?? {t('roles.title')}</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ?
                    </button>
                </div>

                <div className="roles-manager-content">
                    <div className="roles-actions">
                        <button
                            aria-label={t('roles.createRole')}
                            className="create-role-btn"
                            onClick={() => s.setShowCreateModal(true)}
                        >
                            ? {t('roles.createRole')}
                        </button>
                        <div className="roles-info">
                            <span>{t('roles.rolesCount', { count: s.roles.length })}</span>
                            <span className="info-tip">?? {t('roles.dragToReorder')}</span>
                        </div>
                    </div>

                    <div className="roles-list">
                        {s.roles.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">??</div>
                                <h3>{t('roles.noRolesYet')}</h3>
                                <p>{t('roles.createRolesDesc')}</p>
                            </div>
                        ) : (
                            s.roles.map((role) => (
                                <div
                                    key={role.id}
                                    className={`role-card ${s.draggedRole?.id === role.id ? 'dragging' : ''}`}
                                    draggable
                                    onDragStart={(e) => s.handleDragStart(e, role)}
                                    onDragOver={s.handleDragOver}
                                    onDrop={(e) => s.handleDrop(e, role)}
                                >
                                    <div className="role-drag-handle">?</div>
                                    <div
                                        className="role-color-badge"
                                        style={{ backgroundColor: role.color }}
                                    />
                                    <div className="role-info">
                                        <div className="role-name" style={{ color: role.color }}>
                                            {role.name}
                                        </div>
                                        <div className="role-meta">
                                            <span className="role-members">
                                                ??{' '}
                                                {t('roles.membersCount', {
                                                    count: role.member_count || 0,
                                                })}
                                            </span>
                                            {role.hoist && (
                                                <span className="role-badge">
                                                    ?? {t('roles.hoisted')}
                                                </span>
                                            )}
                                            {role.mentionable && (
                                                <span className="role-badge">
                                                    @ {t('roles.mentionable')}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="role-actions">
                                        <button
                                            aria-label={t('common.edit')}
                                            className="role-action-btn edit"
                                            onClick={() => s.setEditingRole(role)}
                                            title={t('common.edit')}
                                        >
                                            ??
                                        </button>
                                        <button
                                            aria-label={t('roles.copy', 'Copy role')}
                                            className="role-action-btn copy"
                                            onClick={() => s.copyRole(role.id)}
                                            title={t('roles.copy')}
                                        >
                                            ??
                                        </button>
                                        <button
                                            aria-label={t('common.delete')}
                                            className="role-action-btn delete"
                                            onClick={() => s.deleteRole(role.id)}
                                            title={t('common.delete')}
                                        >
                                            ???
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {s.showCreateModal && (
                    <RoleFormModal
                        role={s.newRole}
                        setRole={s.setNewRole}
                        onSave={s.createRole}
                        onCancel={() => s.setShowCreateModal(false)}
                        title={t('roles.createNewRole')}
                        saveLabel={t('roles.createRole')}
                    />
                )}

                {s.editingRole && (
                    <RoleFormModal
                        role={s.editingRole}
                        setRole={s.setEditingRole}
                        onSave={() => s.updateRole(s.editingRole.id, s.editingRole)}
                        onCancel={() => s.setEditingRole(null)}
                        title={t('roles.editRole')}
                        saveLabel={t('roles.saveChanges')}
                    />
                )}
            </div>
        </div>
    );
};

RolesManager.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default RolesManager;
