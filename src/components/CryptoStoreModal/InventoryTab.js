import React from 'react';
import { FaCheck } from 'react-icons/fa';
import styles from './cryptoStoreStyles';

const InventoryTab = ({ inventory, loading, handleEquip }) => (
    <div style={styles.grid}>
        {inventory.map(entry => (
            <div key={entry.id} style={{ ...styles.itemCard, border: entry.is_equipped ? '1px solid #23a559' : '1px solid #1e1f22' }}>
                <div style={styles.iconPlace}>
                    {entry.preview_image
                        ? <img src={entry.preview_image} alt={entry.name} style={{ width: 50, height: 50 }} />
                        : <span style={{ fontSize: '2em' }}>{'\uD83C\uDF92'}</span>}
                </div>
                <h4>{entry.name}</h4>
                <p style={{ fontSize: '0.8em', color: '#999' }}>{entry.item_type}</p>
                {entry.is_equipped ? (
                    <button style={styles.equippedBtn} disabled><FaCheck /> Ku\u015Fan\u0131ld\u0131</button>
                ) : (
                    <button onClick={() => handleEquip(entry.id)} style={styles.useBtn} disabled={loading}>Ku\u015Fan</button>
                )}
            </div>
        ))}
        {inventory.length === 0 && <p style={{ color: '#ccc' }}>Hen\u00FCz bir \u015Fey sat\u0131n almad\u0131n.</p>}
    </div>
);

export default InventoryTab;
