import React from 'react';
import profileStyles from '../styles';

const GDPRTab = ({ exportRequested, gdprExports, requestGDPRExport }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>🔒 GDPR & Veri Gizliliği</h3>

      <div style={{
        padding: '16px',
        background: 'rgba(88, 101, 242, 0.1)',
        borderRadius: '8px',
        borderLeft: '4px solid #5865f2',
        marginBottom: '24px',
      }}>
        <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '14px' }}>
          ℹ️ Veri Dışa Aktarma Hakkı
        </h4>
        <p style={{ color: '#b5bac1', margin: 0, fontSize: '13px' }}>
          GDPR (Genel Veri Koruma Yönetmeliği) kapsamında tüm kişisel verilerinizi dışa aktarabilirsiniz.
          Bu işlem, mesajlar, profil bilgileri, aktiviteler ve daha fazlasını içerir.
        </p>
      </div>

      <button
        style={styles.button('primary')}
        onClick={requestGDPRExport}
        disabled={exportRequested}
      >
        {exportRequested ? '⏳ İşleniyor...' : '📥 GDPR Dışa Aktarma Talebi Oluştur'}
      </button>

      {gdprExports.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h4 style={{ color: '#fff', marginBottom: '12px' }}>📋 Dışa Aktarma Geçmişi</h4>
          {gdprExports.map((exp, idx) => (
            <div
              key={idx}
              style={{
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ color: '#fff', margin: 0, fontSize: '14px' }}>
                    {exp.status === 'pending' && '⏳ İşleniyor'}
                    {exp.status === 'completed' && '✅ Tamamlandı'}
                    {exp.status === 'failed' && '❌ Başarısız'}
                  </p>
                  <p style={{ color: '#b5bac1', margin: '4px 0 0 0', fontSize: '12px' }}>
                    {new Date(exp.created_at).toLocaleString('tr-TR')}
                  </p>
                </div>
                {exp.status === 'completed' && exp.download_url && (
                  <a
                    href={exp.download_url}
                    style={{
                      ...styles.button('secondary'),
                      padding: '8px 16px',
                      fontSize: '12px',
                      textDecoration: 'none',
                    }}
                  >
                    📥 İndir
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GDPRTab;
