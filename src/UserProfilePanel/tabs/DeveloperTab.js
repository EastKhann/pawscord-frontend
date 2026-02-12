import React from 'react';
import profileStyles from '../styles';

const DeveloperTab = ({ botAccounts, oauthApps, webhooks }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>🔧 Geliştirici Araçları</h3>

      {/* OAuth Apps */}
      <div style={{ marginBottom: '32px' }}>
        <h4 style={{ color: '#fff', marginBottom: '12px' }}>🔑 OAuth Uygulamalar</h4>
        {oauthApps.length === 0 ? (
          <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz OAuth uygulamanız yok.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {oauthApps.map((app, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                }}
              >
                <h5 style={{ color: '#fff', margin: '0 0 8px 0' }}>{app.name}</h5>
                <p style={{ color: '#b9bbbe', margin: 0, fontSize: '13px' }}>
                  Client ID: <code>{app.client_id}</code>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Webhooks */}
      <div style={{ marginBottom: '32px' }}>
        <h4 style={{ color: '#fff', marginBottom: '12px' }}>🪝 Webhook'lar</h4>
        {webhooks.length === 0 ? (
          <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz webhook'unuz yok.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {webhooks.map((webhook, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                }}
              >
                <h5 style={{ color: '#fff', margin: '0 0 8px 0' }}>{webhook.name}</h5>
                <p style={{ color: '#b9bbbe', margin: 0, fontSize: '13px' }}>
                  URL: <code style={{ wordBreak: 'break-all' }}>{webhook.url}</code>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bot Accounts */}
      <div>
        <h4 style={{ color: '#fff', marginBottom: '12px' }}>🤖 Bot Hesapları</h4>
        {botAccounts.length === 0 ? (
          <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz bot hesabınız yok.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {botAccounts.map((bot, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <img
                  src={bot.avatar_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"%3E%3Crect fill="%235865f2" width="48" height="48" rx="24"/%3E%3Ctext x="24" y="24" font-size="22" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E🤖%3C/text%3E%3C/svg%3E'}
                  alt={bot.username}
                  style={{ width: '48px', height: '48px', borderRadius: '50%' }}
                />
                <div>
                  <h5 style={{ color: '#fff', margin: '0 0 4px 0' }}>{bot.username}</h5>
                  <p style={{ color: '#b9bbbe', margin: 0, fontSize: '13px' }}>
                    Token: <code>{bot.token?.substring(0, 20)}...</code>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperTab;
