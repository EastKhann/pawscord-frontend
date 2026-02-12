import React from 'react';
import profileStyles from '../styles';

const PremiumTab = ({ premiumStatus }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>💎 Premium Üyelik</h3>

      {premiumStatus?.is_active ? (
        <div>
          <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%)',
            borderRadius: '12px',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            marginBottom: '24px',
          }}>
            <h4 style={{ color: '#ffd700', margin: '0 0 12px 0', fontSize: '20px' }}>
              ⭐ Premium Üye
            </h4>
            <p style={{ color: '#b9bbbe', margin: 0 }}>
              Premium üyeliğiniz aktif! Tüm özel özelliklere erişiminiz var.
            </p>
            {premiumStatus.expires_at && (
              <p style={{ color: '#b9bbbe', margin: '8px 0 0 0', fontSize: '13px' }}>
                📅 Bitiş tarihi: {new Date(premiumStatus.expires_at).toLocaleDateString('tr-TR')}
              </p>
            )}
          </div>

          <h4 style={{ color: '#fff', marginBottom: '16px' }}>✨ Premium Özellikleri</h4>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { icon: '🎨', text: 'Özel temalar ve renkler' },
              { icon: '🎭', text: 'Animasyonlu avatar çerçeveleri' },
              { icon: '💬', text: 'Gelişmiş mesaj araçları' },
              { icon: '🎵', text: 'Özel emoji ve stickerlar' },
              { icon: '🏆', text: 'Özel rozetler' },
              { icon: '🚀', text: 'Öncelikli destek' },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                <span style={{ color: '#fff', fontSize: '14px' }}>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.2) 0%, rgba(88, 101, 242, 0.05) 100%)',
            borderRadius: '12px',
            border: '2px solid rgba(88, 101, 242, 0.3)',
            marginBottom: '24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>💎</div>
            <h4 style={{ color: '#fff', margin: '0 0 12px 0', fontSize: '24px' }}>
              Premium'a Yükselt
            </h4>
            <p style={{ color: '#b9bbbe', margin: '0 0 24px 0' }}>
              Özel özelliklerle deneyiminizi geliştirin
            </p>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#5865f2', marginBottom: '8px' }}>
              $4.99<span style={{ fontSize: '16px', color: '#b9bbbe' }}>/ay</span>
            </div>
            <button
              style={{
                ...styles.button('primary'),
                marginTop: '16px',
                padding: '16px 48px',
                fontSize: '16px',
              }}
            >
              🚀 Şimdi Satın Al
            </button>
          </div>

          <h4 style={{ color: '#fff', marginBottom: '16px' }}>✨ Premium ile Kazanın</h4>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { icon: '🎨', text: 'Özel temalar ve renkler' },
              { icon: '🎭', text: 'Animasyonlu avatar çerçeveleri' },
              { icon: '💬', text: 'Gelişmiş mesaj araçları' },
              { icon: '🎵', text: 'Özel emoji ve stickerlar' },
              { icon: '🏆', text: 'Özel rozetler' },
              { icon: '🚀', text: 'Öncelikli destek' },
              { icon: '📁', text: '100GB bulut depolama' },
              { icon: '🎬', text: 'HD video paylaşımı' },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                <span style={{ color: '#fff', fontSize: '14px' }}>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumTab;
