import React from 'react';
import profileStyles from '../styles';

const DraftsTab = ({ deleteDraft, drafts }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>📝 Mesaj Taslakları</h3>

      {drafts.length === 0 ? (
        <div style={{
          padding: '48px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '12px',
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📝</div>
          <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Taslak yok</h4>
          <p style={{ color: '#b9bbbe', margin: 0 }}>
            Mesaj taslakları otomatik olarak kaydedilir
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {drafts.map((draft, idx) => (
            <div
              key={idx}
              style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flex: 1 }}>
                <h4 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '14px' }}>
                  {draft.channel_name || `Kanal #${draft.channel_id}`}
                </h4>
                <p style={{
                  color: '#b9bbbe',
                  margin: 0,
                  fontSize: '13px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {draft.content}
                </p>
                <span style={{ color: '#72767d', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                  {new Date(draft.updated_at).toLocaleString('tr-TR')}
                </span>
              </div>
              <button
                style={{
                  ...styles.button('danger'),
                  padding: '8px 16px',
                  fontSize: '12px',
                  marginLeft: '12px',
                }}
                onClick={() => deleteDraft(draft.key)}
              >
                🗑️ Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DraftsTab;
