import useWebhooks from './WebhooksPanel/useWebhooks';
import './WebhooksPanel.css';

const WebhooksPanel = ({ serverId, onClose }) => {
  const w = useWebhooks(serverId);

  if (w.loading) {
    return <div className="webhooks-overlay"><div className="webhooks-panel"><div className="loading-state"><div className="spinner" /><p>Webhooklar y\u00fckleniyor...</p></div></div></div>;
  }

  return (
    <div className="webhooks-overlay" onClick={onClose}>
      <div className="webhooks-panel" onClick={(e) => e.stopPropagation()}>
        <div className="webhooks-header">
          <h2>{'\uD83D\uDD17'} Webhook Y\u00f6netimi</h2>
          <button className="close-btn" onClick={onClose}>\u00d7</button>
        </div>

        <div className="webhooks-content">
          {!w.creating && <button className="create-webhook-btn" onClick={() => w.setCreating(true)}>{'\u2795'} Yeni Webhook Olu\u015ftur</button>}

          {w.creating && (
            <div className="create-webhook-form">
              <h3>Yeni Webhook</h3>
              <div className="form-group"><label>Webhook Ad\u0131 *</label><input type="text" placeholder="\u00d6rn: GitHub Bot" value={w.newWebhook.name} onChange={(e) => w.setNewWebhook({ ...w.newWebhook, name: e.target.value })} /></div>
              <div className="form-group"><label>Kanal *</label><select value={w.newWebhook.channel_id} onChange={(e) => w.setNewWebhook({ ...w.newWebhook, channel_id: e.target.value })}><option value="">Kanal se\u00e7in...</option>{w.channels.map(ch => <option key={ch.id} value={ch.id}>#{ch.name}</option>)}</select></div>
              <div className="form-group"><label>Avatar URL (Opsiyonel)</label><input type="text" placeholder="https://example.com/avatar.png" value={w.newWebhook.avatar_url} onChange={(e) => w.setNewWebhook({ ...w.newWebhook, avatar_url: e.target.value })} /></div>
              <div className="form-actions"><button className="cancel-btn" onClick={() => w.setCreating(false)}>\u0130ptal</button><button className="submit-btn" onClick={w.createWebhook}>Olu\u015ftur</button></div>
            </div>
          )}

          {w.webhooks.length > 0 ? (
            <div className="webhooks-list">
              {w.webhooks.map(wh => (
                <div key={wh.id} className="webhook-card">
                  {w.editingWebhook === wh.id ? (
                    <div className="edit-webhook-form">
                      <div className="form-group"><label>Webhook Ad\u0131</label><input type="text" defaultValue={wh.name} id={`edit-name-${wh.id}`} /></div>
                      <div className="form-group"><label>Kanal</label><select defaultValue={wh.channel_id} id={`edit-channel-${wh.id}`}>{w.channels.map(ch => <option key={ch.id} value={ch.id}>#{ch.name}</option>)}</select></div>
                      <div className="form-group"><label>Avatar URL</label><input type="text" defaultValue={wh.avatar_url || ''} id={`edit-avatar-${wh.id}`} /></div>
                      <div className="form-actions">
                        <button className="cancel-btn" onClick={() => w.setEditingWebhook(null)}>\u0130ptal</button>
                        <button className="submit-btn" onClick={() => w.updateWebhook(wh.id, { name: document.getElementById(`edit-name-${wh.id}`).value, channel_id: document.getElementById(`edit-channel-${wh.id}`).value, avatar_url: document.getElementById(`edit-avatar-${wh.id}`).value })}>Kaydet</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="webhook-info">
                        <div className="webhook-avatar">{wh.avatar_url ? <img src={wh.avatar_url} alt={wh.name} /> : <div className="default-avatar">{'\uD83D\uDD17'}</div>}</div>
                        <div className="webhook-details">
                          <h4>{wh.name}</h4>
                          <p>#{w.channels.find(c => c.id === wh.channel_id)?.name || 'Bilinmeyen Kanal'}</p>
                          <span className="webhook-id">ID: {wh.id}</span>
                        </div>
                      </div>
                      <div className="webhook-url"><label>Webhook URL:</label><div className="url-display"><code>{`${w.apiBaseUrl}/webhooks/${wh.id}/${wh.token}`}</code><button className="copy-btn" onClick={() => w.copyWebhookUrl(wh)} title="URL'yi kopyala">{'\uD83D\uDCCB'}</button></div></div>
                      <div className="webhook-actions">
                        <button className="action-btn test-btn" onClick={() => w.testWebhook(wh.id)} title="Test mesaj\u0131 g\u00f6nder">{'\uD83E\uDDEA'} Test</button>
                        <button className="action-btn logs-btn" onClick={() => w.fetchWebhookLogs(wh.id)} title="Loglar\u0131 g\u00f6r\u00fcnt\u00fcle">{'\uD83D\uDCCA'} Loglar</button>
                        <button className="action-btn edit-btn" onClick={() => w.setEditingWebhook(wh.id)} title="D\u00fczenle">{'\u270F\uFE0F'}</button>
                        <button className="action-btn regenerate-btn" onClick={() => w.regenerateToken(wh.id)} title="Token yenile">{'\uD83D\uDD04'}</button>
                        <button className="action-btn delete-btn" onClick={() => w.deleteWebhook(wh.id)} title="Sil">{'\uD83D\uDDD1\uFE0F'}</button>
                      </div>
                      <div className="webhook-stats">
                        <div className="stat"><span className="stat-label">Toplam \u00c7a\u011fr\u0131:</span><span className="stat-value">{wh.total_calls || 0}</span></div>
                        <div className="stat"><span className="stat-label">Ba\u015far\u0131l\u0131:</span><span className="stat-value success">{wh.successful_calls || 0}</span></div>
                        <div className="stat"><span className="stat-label">Ba\u015far\u0131s\u0131z:</span><span className="stat-value error">{wh.failed_calls || 0}</span></div>
                        <div className="stat"><span className="stat-label">Son \u00c7a\u011fr\u0131:</span><span className="stat-value">{wh.last_call ? new Date(wh.last_call).toLocaleString('tr-TR') : 'Hi\u00e7'}</span></div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : !w.creating && (
            <div className="empty-state"><div className="empty-icon">{'\uD83D\uDD17'}</div><h3>Hen\u00fcz webhook yok</h3><p>D\u0131\u015f uygulamalardan mesaj g\u00f6ndermek i\u00e7in webhook olu\u015fturun</p></div>
          )}

          {w.viewingLogs && (
            <div className="logs-modal" onClick={() => w.setViewingLogs(null)}>
              <div className="logs-content" onClick={(e) => e.stopPropagation()}>
                <div className="logs-header"><h3>{'\uD83D\uDCCA'} Webhook Loglar\u0131</h3><button className="close-btn" onClick={() => w.setViewingLogs(null)}>\u00d7</button></div>
                <div className="logs-list">
                  {w.logs.length > 0 ? w.logs.map((log, i) => (
                    <div key={i} className={`log-item ${log.status}`}>
                      <div className="log-time">{new Date(log.timestamp).toLocaleString('tr-TR')}</div>
                      <div className="log-status">{log.status === 'success' ? '\u2705' : '\u274C'} {log.status}</div>
                      <div className="log-message">{log.message}</div>
                      {log.error && <div className="log-error">Hata: {log.error}</div>}
                    </div>
                  )) : <p className="empty-state">Hen\u00fcz log kayd\u0131 yok</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebhooksPanel;
