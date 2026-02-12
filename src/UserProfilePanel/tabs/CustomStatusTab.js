import React from 'react';
import profileStyles from '../styles';

const CustomStatusTab = ({ customStatus, setCustomStatus, updateCustomStatus }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>🎨 Özel Durum</h3>

      <div style={{ marginBottom: '24px' }}>
        <label style={styles.label}>Durum</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '8px' }}>
          {[
            { value: 'online', icon: '🟢', label: 'Çevrimiçi', color: '#43b581' },
            { value: 'idle', icon: '🟡', label: 'Boşta', color: '#faa61a' },
            { value: 'dnd', icon: '🔴', label: 'Rahatsız Etmeyin', color: '#f04747' },
            { value: 'invisible', icon: '⚫', label: 'Görünmez', color: '#747f8d' },
          ].map(status => (
            <button
              key={status.value}
              onClick={() => setCustomStatus({ ...customStatus, status: status.value })}
              style={{
                padding: '16px 12px',
                background: customStatus.status === status.value
                  ? `linear-gradient(135deg, ${status.color}33 0%, ${status.color}11 100%)`
                  : 'rgba(255, 255, 255, 0.03)',
                border: customStatus.status === status.value ? `2px solid ${status.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{status.icon}</div>
              <div style={{ color: '#fff', fontSize: '12px', fontWeight: '500' }}>{status.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Özel Mesaj</label>
        <input
          type="text"
          value={customStatus.custom_status}
          onChange={(e) => setCustomStatus({ ...customStatus, custom_status: e.target.value })}
          placeholder="Ne yapıyorsun?"
          style={styles.input}
          maxLength={128}
        />
        <p style={{ color: '#b9bbbe', fontSize: '12px', marginTop: '4px' }}>
          {customStatus.custom_status.length}/128 karakter
        </p>
      </div>

      <button
        style={{ ...styles.button('primary'), marginTop: '16px' }}
        onClick={updateCustomStatus}
      >
        💾 Durumu Kaydet
      </button>
    </div>
  );
};

export default CustomStatusTab;
