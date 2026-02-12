import React from 'react';
import profileStyles from '../styles';

const NicknameHistoryTab = ({ nicknameHistory }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>📜 İsim Değişiklik Geçmişi</h3>

      {nicknameHistory.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📜</div>
          <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Değişiklik yok</h4>
          <p style={{ color: '#b9bbbe', margin: 0 }}>İsim değişiklikleriniz burada görünecek</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {nicknameHistory.map((history, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#fff', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                    {history.old_nickname} → {history.new_nickname}
                  </p>
                  <p style={{ color: '#b9bbbe', margin: '4px 0 0 0', fontSize: '12px' }}>
                    {history.server_name}
                  </p>
                </div>
                <span style={{ color: '#b9bbbe', fontSize: '12px' }}>
                  {new Date(history.changed_at).toLocaleString('tr-TR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NicknameHistoryTab;
