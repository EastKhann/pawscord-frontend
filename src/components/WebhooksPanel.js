import useWebhooks from './WebhooksPanel/useWebhooks';
import './WebhooksPanel.css';

const WebhooksPanel = ({ serverId, onClose }) => {
  const w = useWebhooks(serverId);

  if (w.loading) {
    return <div className="webhooks-overlay"><div className="webhooks-panel"><div className="loading-state"><div className="spinner" /><p>Webhooklar yükleniyor...</p></div></div></div>;
  }

  return (
    <div className="webhooks-overlay" onClick={onClose}>
      <div className="webhooks-panel" onClick={(e) => e.stopPropagation()}>
        <div className="webhooks-header">
          <h2>{'🔗'} Webhook Yönetimi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="webhooks-content">
          {!w.creating && <button className="create-webhook-btn" onClick={() => w.setCreating(true)}>{'➕'} Yeni Webhook Oluştur</button>}

          {w.creating && (
            <div className="create-webhook-form">
              <h3>Yeni Webhook</h3>
              <div className="form-group"><label>Webhook Adı *</label><input type="text" placeholder="Örn: GitHub Bot" value={w.newWebhook.name} onChange={(e) => w.setNewWebhook({ ...w.newWebhook, name: e.target.value })} /></div>
              <div className="form-group"><label>Kanal *</label><select value={w.newWebhook.channel_id} onChange={(e) => w.setNewWebhook({ ...w.newWebhook, channel_id: e.target.value })}><option value="">Kanal seçin...</option>{w.channels.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}</select></div>
              <div className="form-group"><label>Avatar URL (Opsiyonel)</label><input type="text" placeholder="https://example.com/avatar.png" value={w.newWebhook.avatar_url} onChange={(e) => w.setNewWebhook({ ...w.newWebhook, avatar_url: e.target.value })} /></div>
              <div className="form-actions"><button className="cancel-btn" onClick={() => w.setCreating(false)}>İptal</button><button className="submit-btn" onClick={w.createWebhook}>Oluştur</button></div>
            </div>
          )}

          {w.webhooks.length > 0 ? (
            <div className="webhooks-list">
              {w.webhooks.map(wh => (
                <div key={wh.id} className="webhook-card">
                  {w.editingWebhook === wh.id ? (
                    <div className="edit-webhook-form">
                      <div className="form-group"><label>Webhook Adı</label><input type="text" defaultValue={wh.name} id={`edit-name-${wh.id}`} /></div>
                      <div className="form-group"><label>Kanal</label><select defaultValue={wh.channel_id} id={`edit-channel-${wh.id}`}>{w.channels.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}</select></div>
                      <div className="form-group"><label>Avatar URL</label><input type="text" defaultValue={wh.avatar_url || ''} id={`edit-avatar-${wh.id}`} /></div>
                      <div className="form-actions">
                        <button className="cancel-btn" onClick={() => w.setEditingWebhook(null)}>İptal</button>
                        <button className="submit-btn" onClick={() => w.updateWebhook(wh.id, { name: document.getElementById(`edit-name-${wh.id}`).value, channel_id: document.getElementById(`edit-channel-${wh.id}`).value, avatar_url: document.getElementById(`edit-avatar-${wh.id}`).value })}>Kaydet</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="webhook-info">
                        <div className="webhook-avatar">{wh.avatar_url ? <img src={wh.avatar_url} alt={wh.name} /> : <div className="default-avatar">{'🔗'}</div>}</div>
                        <div className="webhook-details">
                          <h4>{wh.name}</h4>
                          <p>{w.channels.find(c => c.id === wh.channel_id)?.name || 'Bilinmeyen Kanal'}</p>
                          <span className="webhook-id">ID: {wh.id}</span>
                        </div>
                      </div>
                      <div className="webhook-url"><label>Webhook URL:</label><div className="url-display"><code>{`${w.apiBaseUrl}/webhooks/${wh.id}/${wh.token}`}</code><button className="copy-btn" onClick={() => w.copyWebhookUrl(wh)} title="URL'yi kopyala">{'📋'}</button></div></div>
                      <div className="webhook-actions">
                        <button className="action-btn test-btn" onClick={() => w.testWebhook(wh.id)} title="Test mesajı gönder">{'🧪'} Test</button>
                        <button className="action-btn logs-btn" onClick={() => w.fetchWebhookLogs(wh.id)} title="Logları görüntüle">{'📊'} Loglar</button>
                        <button className="action-btn edit-btn" onClick={() => w.setEditingWebhook(wh.id)} title="Düzenle">{'✏️'}</button>
                        <button className="action-btn regenerate-btn" onClick={() => w.regenerateToken(wh.id)} title="Token yenile">{'🔄'}</button>
                        <button className="action-btn delete-btn" onClick={() => w.deleteWebhook(wh.id)} title="Sil">{'🗑️'}</button>
                      </div>
                      <div className="webhook-stats">
                        <div className="stat"><span className="stat-label">Toplam Çağrı:</span><span className="stat-value">{wh.total_calls || 0}</span></div>
                        <div className="stat"><span className="stat-label">Başarılı:</span><span className="stat-value success">{wh.successful_calls || 0}</span></div>
                        <div className="stat"><span className="stat-label">Başarısız:</span><span className="stat-value error">{wh.failed_calls || 0}</span></div>
                        <div className="stat"><span className="stat-label">Son Çağrı:</span><span className="stat-value">{wh.last_call ? new Date(wh.last_call).toLocaleString('tr-TR') : 'Hiç'}</span></div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : !w.creating && (
            <div className="empty-state"><div className="empty-icon">{'🔗'}</div><h3>Henüz webhook yok</h3><p>Dış uygulamalardan mesaj göndermek için webhook oluşturun</p></div>
          )}

          {w.viewingLogs && (
            <div className="logs-modal" onClick={() => w.setViewingLogs(null)}>
              <div className="logs-content" onClick={(e) => e.stopPropagation()}>
                <div className="logs-header"><h3>{'📊'} Webhook Logları</h3><button className="close-btn" onClick={() => w.setViewingLogs(null)}>×</button></div>
                <div className="logs-list">
                  {w.logs.length > 0 ? w.logs.map((log, i) => (
                    <div key={i} className={`log-item ${log.status}`}>
                      <div className="log-time">{new Date(log.timestamp).toLocaleString('tr-TR')}</div>
                      <div className="log-status">{log.status === 'success' ? '✅' : '❌'} {log.status}</div>
                      <div className="log-message">{log.message}</div>
                      {log.error && <div className="log-error">Hata: {log.error}</div>}
                    </div>
                  )) : <p className="empty-state">Henüz log kaydı yok</p>}
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
