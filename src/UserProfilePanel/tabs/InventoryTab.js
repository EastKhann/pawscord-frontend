import React from 'react';
import profileStyles from '../styles';

const InventoryTab = ({ equipItem, equippedItems, inventory, unequipItem }) => {
  const styles = profileStyles;

  return (
    <div style={styles.card}>
      <h3 style={styles.sectionTitle}>🎒 Envanter & Ekipman</h3>

      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ color: '#fff', marginBottom: '12px' }}>⚡ Ekipli İtemler</h4>
        {equippedItems.length === 0 ? (
          <p style={{ color: '#b9bbbe', fontSize: '14px' }}>Henüz ekipli item yok.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {equippedItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)',
                  border: '2px solid #43b581',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>{item.icon || '🎁'}</div>
                <h5 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '14px' }}>{item.name}</h5>
                <button
                  style={{ ...styles.button('secondary'), padding: '6px 12px', fontSize: '12px', marginTop: '8px' }}
                  onClick={() => unequipItem(item.id)}
                >
                  ❌ Çıkar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h4 style={{ color: '#fff', marginBottom: '12px' }}>📦 Tüm İtemler</h4>
        {inventory.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎒</div>
            <h4 style={{ color: '#fff', margin: '0 0 8px 0' }}>Envanter boş</h4>
            <p style={{ color: '#b9bbbe', margin: 0 }}>Premium Store'dan item satın alabilirsiniz</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {inventory.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  background: item.is_equipped
                    ? 'linear-gradient(135deg, rgba(67, 181, 129, 0.2) 0%, rgba(67, 181, 129, 0.05) 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: item.is_equipped ? '2px solid #43b581' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>{item.icon || '🎁'}</div>
                <h5 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '14px' }}>{item.name}</h5>
                <p style={{ color: '#b9bbbe', margin: '4px 0', fontSize: '12px' }}>{item.description}</p>
                {!item.is_equipped && (
                  <button
                    style={{ ...styles.button('primary'), padding: '6px 12px', fontSize: '12px', marginTop: '8px' }}
                    onClick={() => equipItem(item.id)}
                  >
                    ✅ Ekip
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryTab;
