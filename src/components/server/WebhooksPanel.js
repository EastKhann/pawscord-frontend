/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import useWebhooks from '../WebhooksPanel/useWebhooks';
import './WebhooksPanel.css';

import { useTranslation } from 'react-i18next';
const WebhooksPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const w = useWebhooks(serverId);

    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleStartCreating = useCallback(() => w.setCreating(true), [w.setCreating]);
    const handleCancelCreating = useCallback(() => w.setCreating(false), [w.setCreating]);
    const handleCancelEditing = useCallback(() => w.cancelEditing(), [w.cancelEditing]);
    const handleCloseLogs = useCallback(() => w.setViewingLogs(null), [w.setViewingLogs]);
    const handleNameChange = useCallback(
        (e) => w.setNewWebhook((prev) => ({ ...prev, name: e.target.value })),
        [w.setNewWebhook]
    );
    const handleChannelChange = useCallback(
        (e) => w.setNewWebhook((prev) => ({ ...prev, channel_id: e.target.value })),
        [w.setNewWebhook]
    );
    const handleAvatarChange = useCallback(
        (e) => w.setNewWebhook((prev) => ({ ...prev, avatar_url: e.target.value })),
        [w.setNewWebhook]
    );

    if (w.loading) {
        return (
            <div className="webhooks-overlay">
                <div className="webhooks-panel">
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>{t('webhooks.loading', 'Loading webhooks...')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="webhooks-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="webhooks-panel"
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="webhooks-header">
                    <h2>🔗 {t('webhooks.management', 'Webhook Management')}</h2>
                    <button
                        aria-label={t('common.close', 'Close')}
                        className="close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="webhooks-content">
                    {!w.creating && (
                        <button
                            aria-label={t('webhooks.create', 'Create new webhook')}
                            className="create-webhook-btn"
                            onClick={handleStartCreating}
                        >
                            ➕ {t('webhooks.createNew', 'Create New Webhook')}
                        </button>
                    )}

                    {w.creating && (
                        <div className="create-webhook-form">
                            <h3>{t('webhooks.newWebhook', 'New Webhook')}</h3>
                            <div className="form-group">
                                <label>{t('webhooks.webhookNameRequired', 'Webhook Name *')}</label>
                                <input
                                    type="text"
                                    placeholder={t('webhooksPanel.webhookName', 'e.g. GitHub Bot')}
                                    value={w.newWebhook.name}
                                    onChange={handleNameChange}
                                    aria-label={t('webhooks.nameInput', 'Webhook name')}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('webhooks.channelRequired', 'Channel *')}</label>
                                <select
                                    value={w.newWebhook.channel_id}
                                    onChange={handleChannelChange}
                                    aria-label={t('webhooks.channelSelect', 'Select channel')}
                                >
                                    {w.channels.map((ch) => (
                                        <option key={ch.id} value={ch.id}>
                                            {ch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>{t('webhooks.avatarUrlOptional', 'Avatar URL (Optional)')}</label>
                                <input
                                    type="text"
                                    placeholder={t(
                                        'webhooksPanel.webhookAvatarUrl',
                                        'https://example.com/avatar.png'
                                    )}
                                    value={w.newWebhook.avatar_url}
                                    onChange={handleAvatarChange}
                                    aria-label={t('webhooks.avatarInput', 'Avatar URL')}
                                />
                            </div>
                            <div className="form-actions">
                                <button
                                    aria-label={t('common.cancel', 'Cancel')}
                                    className="cancel-btn"
                                    onClick={handleCancelCreating}
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    aria-label={t('webhooks.create', 'Create webhook')}
                                    className="submit-btn"
                                    onClick={w.createWebhook}
                                >
                                    {t('common.create', 'Create')}
                                </button>
                            </div>
                        </div>
                    )}

                    {w.webhooks.length > 0 ? (
                        <div className="webhooks-list">
                            {w.webhooks.map((wh) => (
                                <div key={wh.id} className="webhook-card">
                                    {w.editingWebhook === wh.id ? (
                                        <div className="edit-webhook-form">
                                            <div className="form-group">
                                                <label>{t('webhooks.nameInput', 'Webhook Name')}</label>
                                                <input
                                                    type="text"
                                                    value={w.editDraft.name}
                                                    onChange={(e) =>
                                                        w.setEditDraft((prev) => ({
                                                            ...prev,
                                                            name: e.target.value,
                                                        }))
                                                    }
                                                    aria-label={t(
                                                        'webhooks.editName',
                                                        'Webhook name'
                                                    )}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>{t('webhooks.channel', 'Channel')}</label>
                                                <select
                                                    value={w.editDraft.channel_id}
                                                    onChange={(e) =>
                                                        w.setEditDraft((prev) => ({
                                                            ...prev,
                                                            channel_id: e.target.value,
                                                        }))
                                                    }
                                                    aria-label={t(
                                                        'webhooks.editChannel',
                                                        'Select channel'
                                                    )}
                                                >
                                                    {w.channels.map((ch) => (
                                                        <option key={ch.id} value={ch.id}>
                                                            {ch.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>{t('webhooks.avatarUrl', 'Avatar URL')}</label>
                                                <input
                                                    type="text"
                                                    value={w.editDraft.avatar_url}
                                                    onChange={(e) =>
                                                        w.setEditDraft((prev) => ({
                                                            ...prev,
                                                            avatar_url: e.target.value,
                                                        }))
                                                    }
                                                    aria-label={t(
                                                        'webhooks.editAvatar',
                                                        'Avatar URL'
                                                    )}
                                                />
                                                <button
                                                    aria-label={t('common.cancel', 'Cancel')}
                                                    className="cancel-btn"
                                                    onClick={handleCancelEditing}
                                                >
                                                    {t('common.cancel')}
                                                </button>
                                                <button
                                                    aria-label={t('common.save', 'Save')}
                                                    onClick={() =>
                                                        w.updateWebhook(wh.id, w.editDraft)
                                                    }
                                                >
                                                    {t('common.save')}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="webhook-info">
                                                <div className="webhook-avatar">
                                                    {wh.avatar_url ? (
                                                        <img src={wh.avatar_url} alt={wh.name} />
                                                    ) : (
                                                        <div className="default-avatar">🔗</div>
                                                    )}
                                                </div>
                                                <div className="webhook-details">
                                                    <h4>{wh.name}</h4>
                                                    <p>
                                                        {w.channels.find(
                                                            (c) => c.id === wh.channel_id
                                                        )?.name || t('common.unknownChannel')}
                                                    </p>
                                                    <span className="webhook-id">ID: {wh.id}</span>
                                                </div>
                                            </div>
                                            <div className="webhook-url">
                                                <label>{t('webhooks.webhookUrl', 'Webhook URL')}:</label>
                                                <div className="url-display">
                                                    <code>{`${w.apiBaseUrl}/webhooks/${wh.id}/${wh.token}`}</code>
                                                    <button
                                                        aria-label={t(
                                                            'webhooks.copyUrl',
                                                            'Copy webhook URL'
                                                        )}
                                                        className="copy-btn"
                                                        onClick={() => w.copyWebhookUrl(wh)}
                                                        title={t('webhooks.copyUrl', 'Copy URL')}
                                                    >
                                                        📋
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="webhook-actions">
                                                <button
                                                    aria-label={t(
                                                        'webhooks.testWebhook',
                                                        'Send test message'
                                                    )}
                                                    className="action-btn test-btn"
                                                    onClick={() => w.testWebhook(wh.id)}
                                                    title={t('webhooks.testWebhook', 'Send test message')}
                                                >
                                                    🧪 {t('webhooks.test', 'Test')}
                                                </button>
                                                <button
                                                    aria-label={t('webhooks.viewLogs', 'View logs')}
                                                    className="action-btn logs-btn"
                                                    onClick={() => w.fetchWebhookLogs(wh.id)}
                                                    title={t('webhooks.viewLogs', 'View logs')}
                                                >
                                                    📋 {t('webhooks.logs', 'Logs')}
                                                </button>
                                                <button
                                                    aria-label={t('common.edit')}
                                                    className="action-btn edit-btn"
                                                    onClick={() => w.startEditing(wh)}
                                                    title={t('common.edit')}
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    aria-label={t(
                                                        'webhooks.regenerateToken',
                                                        'Regenerate token'
                                                    )}
                                                    className="action-btn regenerate-btn"
                                                    onClick={() => w.regenerateToken(wh.id)}
                                                    title={t('webhooks.regenerateToken', 'Regenerate token')}
                                                >
                                                    🔄
                                                </button>
                                                <button
                                                    aria-label={t('common.delete', 'Delete')}
                                                    className="action-btn delete-btn"
                                                    onClick={() => w.deleteWebhook(wh.id)}
                                                    title={t('common.delete', 'Delete')}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                            <div className="webhook-stats">
                                                <div className="stat">
                                                    <span className="stat-label">
                                                        {t('webhooks.totalCalls', 'Total Calls:')}
                                                    </span>
                                                    <span className="stat-value">
                                                        {wh.total_calls || 0}
                                                    </span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">{t('webhooks.successful', 'Successful:')}</span>
                                                    <span className="stat-value success">
                                                        {wh.successful_calls || 0}
                                                    </span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">{t('webhooks.failed', 'Failed:')}</span>
                                                    <span className="stat-value error">
                                                        {wh.failed_calls || 0}
                                                    </span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">{t('webhooks.lastCall', 'Last Call:')}</span>
                                                    <span className="stat-value">
                                                        {wh.last_call
                                                            ? new Date(wh.last_call).toLocaleString(
                                                                  'tr-TR'
                                                              )
                                                            : t('admin.logs.never', 'Never')}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        !w.creating && (
                            <div className="empty-state">
                                <div className="empty-icon">🔗</div>
                                <h3>{t('webhooks.noWebhooksYet', 'No webhooks yet')}</h3>
                                <p>{t('webhooks.createToReceive', 'Create a webhook to receive messages from external apps')}</p>
                            </div>
                        )
                    )}

                    {w.viewingLogs && (
                        <div
                            className="logs-modal"
                            role="button"
                            tabIndex={0}
                            onClick={handleCloseLogs}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <div
                                className="logs-content"
                                role="button"
                                tabIndex={0}
                                onClick={handleStopPropagation}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                                }
                            >
                                <div className="logs-header">
                                    <h3>📋 {t('webhooks.webhookLogs', 'Webhook Logs')}</h3>
                                    <button
                                        aria-label={t('common.close', 'Close')}
                                        className="close-btn"
                                        onClick={handleCloseLogs}
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="logs-list">
                                    {w.logs.length > 0 ? (
                                        w.logs.map((log, i) => (
                                            <div
                                                key={`item-${i}`}
                                                className={`log-item ${log.status}`}
                                            >
                                                <div className="log-time">
                                                    {new Date(log.timestamp).toLocaleString(
                                                        'tr-TR'
                                                    )}
                                                </div>
                                                <div className="log-status">
                                                    {log.status === 'success' ? '✅' : '❌'}{' '}
                                                    {log.status}
                                                </div>
                                                <div className="log-message">{log.message}</div>
                                                {log.error && (
                                                    <div className="log-error">
                                                        Error: {log.error}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="empty-state">{t('webhooks.noLogsYet', 'No logs yet')}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

WebhooksPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default memo(WebhooksPanel);
