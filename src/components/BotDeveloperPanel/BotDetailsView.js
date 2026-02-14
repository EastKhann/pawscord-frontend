const STAT_CARDS = [
  { icon: '\uD83C\uDFF0', key: 'servers_count', label: 'Sunucu' },
  { icon: '\uD83D\uDC65', key: 'users_count', label: 'Kullan\u0131c\u0131' },
  { icon: '\uD83D\uDCAC', key: 'messages_sent', label: 'Mesaj' },
  { icon: '\uD83D\uDCE1', key: 'api_calls', label: 'API \u00C7a\u011Fr\u0131s\u0131' },
];

const BotDetailsView = ({ selectedBot, analytics, webhooks, showCredentials, setShowCredentials, handleCreateWebhook, handleDeleteBot, copyToClipboard, formatNumber }) => (
  <div className="bot-details">
    {showCredentials && (
      <div className="credentials-alert">
        <h4>{'\u26A0\uFE0F'} Bot Kimlik Bilgileri</h4>
        <p>Bu bilgileri g{'\u00FC'}venli bir yerde saklay{'\u0131'}n! Bir daha g{'\u00F6'}sterilmeyecek.</p>
        {[
          { label: 'Client ID', value: selectedBot.client_id },
          { label: 'Client Secret', value: selectedBot.client_secret },
          { label: 'Bot Token', value: selectedBot.api_token },
        ].map(({ label, value }) => (
          <div key={label} className="credential-item">
            <label>{label}:</label>
            <div className="credential-value">
              <code>{value}</code>
              <button onClick={() => copyToClipboard(value, label)}>{'\uD83D\uDCCB'}</button>
            </div>
          </div>
        ))}
        <button className="dismiss-btn" onClick={() => setShowCredentials(false)}>
          Anlad{'\u0131'}m
        </button>
      </div>
    )}

    <div className="details-header">
      <div className="bot-info">
        <div className="bot-avatar-large">
          {selectedBot.avatar_url ? (
            <img src={selectedBot.avatar_url} alt={selectedBot.name} />
          ) : (
            <div className="default-avatar">{'\uD83E\uDD16'}</div>
          )}
        </div>
        <div>
          <h2>{selectedBot.name}</h2>
          <p>{selectedBot.description}</p>
          <div className="bot-id">ID: {selectedBot.client_id?.substring(0, 16)}...</div>
        </div>
      </div>
    </div>

    {analytics && (
      <div className="analytics-section">
        <h3>{'\uD83D\uDCCA'} {'\u0130'}statistikler</h3>
        <div className="analytics-grid">
          {STAT_CARDS.map(s => (
            <div key={s.key} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">{formatNumber(analytics[s.key])}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="webhooks-section">
      <div className="section-header">
        <h3>{'\uD83D\uDD17'} Webhooks</h3>
        <button className="add-webhook-btn" onClick={() => handleCreateWebhook(selectedBot.id)}>
          {'\u2795'} Webhook Ekle
        </button>
      </div>
      {webhooks.length > 0 ? (
        <div className="webhooks-list">
          {webhooks.map((wh, idx) => (
            <div key={idx} className="webhook-item">
              <div className="webhook-icon">{'\uD83D\uDD17'}</div>
              <div className="webhook-info">
                <div className="webhook-url">{wh.url}</div>
                <div className="webhook-meta">
                  Olu{'\u015F'}turulma: {new Date(wh.created_at).toLocaleDateString('tr-TR')}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-webhooks">
          <p>Hen{'\u00FC'}z webhook yok</p>
        </div>
      )}
    </div>

    <div className="danger-zone">
      <h3>{'\u26A0\uFE0F'} Tehlikeli B{'\u00F6'}lge</h3>
      <button className="delete-bot-btn" onClick={() => handleDeleteBot(selectedBot.id)}>
        {'\uD83D\uDDD1\uFE0F'} Botu Sil
      </button>
    </div>
  </div>
);

export default BotDetailsView;
