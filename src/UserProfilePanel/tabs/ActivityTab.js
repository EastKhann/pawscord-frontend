import React from 'react';
import profileStyles from '../styles';

const ActivityTab = ({ userActivity }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>📊 Kullanıcı Aktivitesi</h3>

      {userActivity.length === 0 ? (
        <div style={{
          padding: '48px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '12px',
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
          <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Henüz aktivite yok</h4>
          <p style={{ color: '#b5bac1', margin: 0 }}>
            Aktiviteleriniz burada görünecek
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {userActivity.map((activity, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                borderLeft: '4px solid #5865f2',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>
                  {activity.type === 'message' && '💬 Mesaj gönderildi'}
                  {activity.type === 'join' && '👋 Sunucuya katıldı'}
                  {activity.type === 'voice' && '🎤 Sesli sohbete katıldı'}
                  {activity.type === 'game' && '🎮 Oyun başlatıldı'}
                </h4>
                <span style={{ color: '#b5bac1', fontSize: '12px' }}>
                  {new Date(activity.timestamp).toLocaleString('tr-TR')}
                </span>
              </div>
              {activity.description && (
                <p style={{ color: '#b5bac1', margin: 0, fontSize: '13px' }}>
                  {activity.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityTab;
