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
    const handleCancelEditing = useCallback(() => w.setEditingWebhook(null), [w.setEditingWebhook]);
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
                        <p>Webhook'lar yükleniyor...</p>
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
                    <h2>🔗 Webhook Yönetimi</h2>
                    <button aria-label="Close" className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="webhooks-content">
                    {!w.creating && (
                        <button
                            aria-label="handle Start Creating"
                            className="create-webhook-btn"
                            onClick={handleStartCreating}
                        >
                            ➕ Yeni Webhook Oluştur
                        </button>
                    )}

                    {w.creating && (
                        <div className="create-webhook-form">
                            <h3>Yeni Webhook</h3>
                            <div className="form-group">
                                <label>Webhook Adı *</label>
                                <input
                                    type="text"
                                    placeholder="örn. GitHub Bot"
                                    value={w.newWebhook.name}
                                    onChange={handleNameChange}
                                    aria-label="örn. GitHub Bot"
                                />
                            </div>
                            <div className="form-group">
                                <label>Kanal *</label>
                                <select
                                    value={w.newWebhook.channel_id}
                                    onChange={handleChannelChange}
                                    aria-label="select"
                                >
                                    <option value="">Kanal seç...</option>
                                    {w.channels.map((ch) => (
                                        <option key={ch.id} value={ch.id}>
                                            {ch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Avatar URL (Opsiyonel)</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/avatar.png"
                                    value={w.newWebhook.avatar_url}
                                    onChange={handleAvatarChange}
                                    aria-label="https://example.com/avatar.png"
                                />
                            </div>
                            <div className="form-actions">
                                <button
                                    aria-label="handle Cancel Creating"
                                    className="cancel-btn"
                                    onClick={handleCancelCreating}
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    aria-label="w create Webhook"
                                    className="submit-btn"
                                    onClick={w.createWebhook}
                                >
                                    Oluştur
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
                                                <label>Webhook Adı</label>
                                                <input
                                                    type="text"
                                                    defaultValue={wh.name}
                                                    id={`edit-name-${wh.id}`}
                                                    aria-label="text"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Channel</label>
                                                <select
                                                    defaultValue={wh.channel_id}
                                                    id={`edit-channel-${wh.id}`}
                                                    aria-label="select"
                                                >
                                                    {w.channels.map((ch) => (
                                                        <option key={ch.id} value={ch.id}>
                                                            {ch.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Avatar URL</label>
                                                <input
                                                    type="text"
                                                    defaultValue={wh.avatar_url || ''}
                                                    id={`edit-avatar-${wh.id}`}
                                                    aria-label="text"
                                                />
                                            </div>
                                            <div className="form-actions">
                                                <button
                                                    aria-label="handle Cancel Editing"
                                                    className="cancel-btn"
                                                    onClick={handleCancelEditing}
                                                >
                                                    {t('common.cancel')}
                                                </button>
                                                <button
                                                    aria-label="Action button"
                                                    className="submit-btn"
                                                    onClick={() =>
                                                        w.updateWebhook(wh.id, {
                                                            name: document.getElementById(
                                                                `edit-name-${wh.id}`
                                                            ).value,
                                                            channel_id: document.getElementById(
                                                                `edit-channel-${wh.id}`
                                                            ).value,
                                                            avatar_url: document.getElementById(
                                                                `edit-avatar-${wh.id}`
                                                            ).value,
                                                        })
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
                                                <label>Webhook URL:</label>
                                                <div className="url-display">
                                                    <code>{`${w.apiBaseUrl}/webhooks/${wh.id}/${wh.token}`}</code>
                                                    <button
                                                        aria-label="URL'yi kopyala"
                                                        className="copy-btn"
                                                        onClick={() => w.copyWebhookUrl(wh)}
                                                        title="URL'yi kopyala"
                                                    >
                                                        📋
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="webhook-actions">
                                                <button
                                                    aria-label="Test mesajı gönder"
                                                    className="action-btn test-btn"
                                                    onClick={() => w.testWebhook(wh.id)}
                                                    title="Test mesajı gönder"
                                                >
                                                    🧪 Test
                                                </button>
                                                <button
                                                    aria-label="Logları görüntüle"
                                                    className="action-btn logs-btn"
                                                    onClick={() => w.fetchWebhookLogs(wh.id)}
                                                    title="Logları görüntüle"
                                                >
                                                    📊 Loglar
                                                </button>
                                                <button
                                                    aria-label="Edit"
                                                    className="action-btn edit-btn"
                                                    onClick={() => w.setEditingWebhook(wh.id)}
                                                    title={t('common.edit')}
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    aria-label="Token yenile"
                                                    className="action-btn regenerate-btn"
                                                    onClick={() => w.regenerateToken(wh.id)}
                                                    title="Token yenile"
                                                >
                                                    🔄
                                                </button>
                                                <button
                                                    aria-label="Sil"
                                                    className="action-btn delete-btn"
                                                    onClick={() => w.deleteWebhook(wh.id)}
                                                    title="Sil"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                            <div className="webhook-stats">
                                                <div className="stat">
                                                    <span className="stat-label">
                                                        Toplam Çağrı:
                                                    </span>
                                                    <span className="stat-value">
                                                        {wh.total_calls || 0}
                                                    </span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">Başarılı:</span>
                                                    <span className="stat-value success">
                                                        {wh.successful_calls || 0}
                                                    </span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">Başarısız:</span>
                                                    <span className="stat-value error">
                                                        {wh.failed_calls || 0}
                                                    </span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">Son Çağrı:</span>
                                                    <span className="stat-value">
                                                        {wh.last_call
                                                            ? new Date(wh.last_call).toLocaleString(
                                                                  'tr-TR'
                                                              )
                                                            : 'Hiçbir zaman'}
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
                                <h3>Henüz webhook yok</h3>
                                <p>Dış uygulamalardan mesaj almak için webhook oluşturun</p>
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
                                    <h3>📊 Webhook Kayıtları</h3>
                                    <button
                                        aria-label="Close"
                                        className="close-btn"
                                        onClick={handleCloseLogs}
                                    >
                                        ×
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
                                        <p className="empty-state">Henüz kayıt yok</p>
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
