const STAT_CARDS = [
  { icon: '🏰', key: 'servers_count', label: 'Sunucu' },
  { icon: '👥', key: 'users_count', label: 'Kullanıcı' },
  { icon: '💬', key: 'messages_sent', label: 'Mesaj' },
  { icon: '📡', key: 'api_calls', label: 'API Çağrısı' },
];

const BotDetailsView = ({ selectedBot, analytics, webhooks, showCredentials, setShowCredentials, handleCreateWebhook, handleDeleteBot, copyToClipboard, formatNumber }) => (
  <div className="bot-details">
    {showCredentials && (
      <div className="credentials-alert">
        <h4>{'⚠️'} Bot Kimlik Bilgileri</h4>
        <p>Bu bilgileri g{'ü'}venli bir yerde saklay{'ı'}n! Bir daha g{'ö'}sterilmeyecek.</p>
        {[
          { label: 'Client ID', value: selectedBot.client_id },
          { label: 'Client Secret', value: selectedBot.client_secret },
          { label: 'Bot Token', value: selectedBot.api_token },
        ].map(({ label, value }) => (
          <div key={label} className="credential-item">
            <label>{label}:</label>
            <div className="credential-value">
              <code>{value}</code>
              <button onClick={() => copyToClipboard(value, label)}>{'📋'}</button>
            </div>
          </div>
        ))}
        <button className="dismiss-btn" onClick={() => setShowCredentials(false)}>
          Anlad{'ı'}m
        </button>
      </div>
    )}

    <div className="details-header">
      <div className="bot-info">
        <div className="bot-avatar-large">
          {selectedBot.avatar_url ? (
            <img src={selectedBot.avatar_url} alt={selectedBot.name} />
          ) : (
            <div className="default-avatar">{'🤖'}</div>
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
        <h3>{'📊'} {'İ'}statistikler</h3>
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
        <h3>{'🔗'} Webhooks</h3>
        <button className="add-webhook-btn" onClick={() => handleCreateWebhook(selectedBot.id)}>
          {'➕'} Webhook Ekle
        </button>
      </div>
      {webhooks.length > 0 ? (
        <div className="webhooks-list">
          {webhooks.map((wh, idx) => (
            <div key={idx} className="webhook-item">
              <div className="webhook-icon">{'🔗'}</div>
              <div className="webhook-info">
                <div className="webhook-url">{wh.url}</div>
                <div className="webhook-meta">
                  Olu{'ş'}turulma: {new Date(wh.created_at).toLocaleDateString('tr-TR')}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-webhooks">
          <p>Hen{'ü'}z webhook yok</p>
        </div>
      )}
    </div>

    <div className="danger-zone">
      <h3>{'⚠️'} Tehlikeli B{'ö'}lge</h3>
      <button className="delete-bot-btn" onClick={() => handleDeleteBot(selectedBot.id)}>
        {'🗑️'} Botu Sil
      </button>
    </div>
  </div>
);

export default BotDetailsView;
