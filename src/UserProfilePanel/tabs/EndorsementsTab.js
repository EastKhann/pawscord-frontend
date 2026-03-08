import React from 'react';
import profileStyles from '../styles';

const EndorsementsTab = ({ endorsements }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>⭐ Kullanıcı Onayları</h3>

      {endorsements.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>⭐</div>
          <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Henüz onay yok</h4>
          <p style={{ color: '#b5bac1', margin: 0 }}>Diğer kullanıcılar sizi onayladığında burada görünecek</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {endorsements.map((endorsement, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                borderLeft: '4px solid #ffd700',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <img
                  src={endorsement.endorser_avatar || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Crect fill="%235865f2" width="32" height="32" rx="16"/%3E%3Ctext x="16" y="16" font-size="14" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'}
                  alt={endorsement.endorser_name}
                  style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ color: '#fff', margin: 0, fontSize: '14px' }}>{endorsement.endorser_name}</h4>
                  <span style={{ color: '#b5bac1', fontSize: '12px' }}>
                    {new Date(endorsement.created_at).toLocaleString('tr-TR')}
                  </span>
                </div>
              </div>
              {endorsement.message && (
                <p style={{ color: '#dbdee1', margin: 0, fontSize: '14px', fontStyle: 'italic' }}>
                  "{endorsement.message}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EndorsementsTab;
