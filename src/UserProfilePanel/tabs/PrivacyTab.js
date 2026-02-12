import React from 'react';
import profileStyles from '../styles';

const PrivacyTab = ({ blockedUsers, unblockUser }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>🚫 Engellenmiş Kullanıcılar</h3>

      <p style={{ color: '#b9bbbe', marginBottom: '24px' }}>
        Engellenmiş kullanıcılar sizinle iletişime geçemez ve mesajlarınızı göremez.
      </p>

      {blockedUsers.length === 0 && (
        <p style={{ color: '#b9bbbe', textAlign: 'center', padding: '32px' }}>
          Engellenmiş kullanıcı yok.
        </p>
      )}

      {blockedUsers.map((blockedUser) => (
        <div key={blockedUser.id} style={styles.sessionCard}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={blockedUser.avatar_url || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%235865f2" width="40" height="40" rx="20"/%3E%3Ctext x="20" y="20" font-size="18" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'}
              alt={blockedUser.username}
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
            <div>
              <p style={{ color: '#fff', margin: 0, fontWeight: '600' }}>
                {blockedUser.username}
              </p>
              <p style={{ color: '#b9bbbe', fontSize: '12px', margin: '4px 0 0 0' }}>
                Engellenme: {new Date(blockedUser.blocked_at).toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>
          <button
            style={styles.button('secondary')}
            onClick={() => unblockUser(blockedUser.user_id)}
          >
            ✅ Engeli Kaldır
          </button>
        </div>
      ))}

      <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(250, 166, 26, 0.1)', borderRadius: '8px', border: '1px solid rgba(250, 166, 26, 0.3)' }}>
        <h4 style={{ color: '#faa61a', margin: '0 0 8px 0', fontSize: '14px' }}>ℹ️ Gizlilik İpucu</h4>
        <p style={{ color: '#b9bbbe', margin: 0, fontSize: '13px' }}>
          Bir kullanıcıyı engellemek için profil sayfasından "Engelle" butonunu kullanabilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default PrivacyTab;
