/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import './CustomCommandsPanel.css';
import useCustomCommands from '../CustomCommandsPanel/useCustomCommands';
import CommandForm from '../CustomCommandsPanel/CommandForm';
import { useTranslation } from 'react-i18next';

const CustomCommandsPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const {
        commands,
        creating,
        setCreating,
        editingCommand,
        setEditingCommand,
        newCommand,
        setNewCommand,
        loading,
        stats,
        createCommand,
        updateCommand,
        deleteCommand,
        toggleCommand,
        exportCommands,
        importCommands,
    } = useCustomCommands(serverId);

    if (loading)
        return (
            <div className="custom-commands-overlay">
                <div className="custom-commands-panel">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>{t('customCmds.loading', 'Loading commands...')}</p>
                    </div>
                </div>
            </div>
        );

    return (
        <div
            className="custom-commands-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="custom-commands-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="commands-header">
                    <h2>⚡ Custom Commands</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="commands-content">
                    {stats && (
                        <div className="stats-overview">
                            <div className="stat-card">
                                <span className="stat-value">{stats.total_commands || 0}</span>
                                <span className="stat-label">Toplam Komutlar</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{stats.enabled_commands || 0}</span>
                                <span className="stat-label">Active</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{stats.total_uses || 0}</span>
                                <span className="stat-label">Usage</span>
                            </div>
                        </div>
                    )}

                    <div className="action-buttons">
                        <button
                            aria-label={t('customCmds.newCommand', 'New command')}
                            className="create-btn"
                            onClick={() => setCreating(true)}
                        >
                            ➕ New Command
                        </button>
                        <button
                            aria-label={t('customCmds.exportCommands', 'Export commands')}
                            className="export-btn"
                            onClick={exportCommands}
                        >
                            📤 Export
                        </button>
                        <label className="import-btn">
                            📥 Import
                            <input
                                type="file"
                                accept=".json"
                                onChange={(e) =>
                                    e.target.files[0] && importCommands(e.target.files[0])
                                }
                                className="display-none"
                            />
                        </label>
                    </div>

                    {creating && (
                        <CommandForm
                            newCommand={newCommand}
                            setNewCommand={setNewCommand}
                            createCommand={createCommand}
                            onCancel={() => setCreating(false)}
                        />
                    )}

                    <div className="commands-list">
                        {commands.length > 0
                            ? commands.map((cmd) => (
                                <div
                                    key={cmd.id}
                                    className={`command-card ${!cmd.enabled ? 'disabled' : ''}`}
                                >
                                    <div className="command-header">
                                        <div className="command-info">
                                            <h4>{cmd.name}</h4>
                                            {cmd.description && <p>{cmd.description}</p>}
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={cmd.enabled}
                                                onChange={(e) =>
                                                    toggleCommand(cmd.id, e.target.checked)
                                                }
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="command-response">
                                        <strong>Response:</strong> {cmd.response}
                                    </div>
                                    <div className="command-meta">
                                        <span className="meta-item">🎯 {cmd.trigger_type}</span>
                                        <span className="meta-item">👥 {cmd.permissions}</span>
                                        {cmd.cooldown > 0 && (
                                            <span className="meta-item">⏱️ {cmd.cooldown}s</span>
                                        )}
                                        <span className="meta-item">
                                            📊 {cmd.use_count || 0} uses
                                        </span>
                                    </div>
                                    <div className="command-actions">
                                        <button
                                            aria-label={t('customCmds.editCommand', 'Edit command')}
                                            className="edit-btn"
                                            onClick={() => {
                                                setEditingCommand(cmd);
                                                setNewCommand({
                                                    name: cmd.name,
                                                    description: cmd.description,
                                                    response: cmd.response,
                                                    trigger_type: cmd.trigger_type,
                                                    enabled: cmd.enabled,
                                                    cooldown: cmd.cooldown,
                                                    permissions: cmd.permissions,
                                                    delete_trigger: cmd.delete_trigger,
                                                    embed: cmd.embed,
                                                    embed_color: cmd.embed_color,
                                                });
                                                setCreating(true);
                                            }}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            aria-label={t('customCmds.deleteCommand', 'Delete command')}
                                            className="delete-btn"
                                            onClick={() => deleteCommand(cmd.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))
                            : !creating && (
                                <div className="empty-state">
                                    <div className="empty-icon">⚡</div>
                                    <h3>{t('customCmds.noCommands', 'No custom commands yet')}</h3>
                                    <p>{t('customCmds.hint', 'Create custom commands for your server')}</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

CustomCommandsPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default CustomCommandsPanel;
