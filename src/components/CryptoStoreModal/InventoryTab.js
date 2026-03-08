import React from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './cryptoStoreStyles';

const InventoryTab = ({ inventory, loading, handleEquip }) => (
    <div style={styles.grid}>
        {inventory.map(entry => (
            <div key={entry.id} style={{ ...styles.itemCard, border: entry.is_equipped ? '1px solid #23a559' : '1px solid #0b0e1b' }}>
                <div style={styles.iconPlace}>
                    {entry.preview_image
                        ? <img src={entry.preview_image} alt={entry.name} style={{ width: 50, height: 50 }} />
                        : <span style={{ fontSize: '2em' }}>{'🎒'}</span>}
                </div>
                <h4>{entry.name}</h4>
                <p style={{ fontSize: '0.8em', color: '#999' }}>{entry.item_type}</p>
                {entry.is_equipped ? (
                    <button style={styles.equippedBtn} disabled><FaCheck /> Kuşanıldı</button>
                ) : (
                    <button onClick={() => handleEquip(entry.id)} style={styles.useBtn} disabled={loading}>Kuşan</button>
                )}
            </div>
        ))}
        {inventory.length === 0 && <p style={{ color: '#ccc' }}>Henüz bir şey satın almadın.</p>}
    </div>
);

export default InventoryTab;
