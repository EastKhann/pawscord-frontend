import React from 'react';
import { FaLock } from 'react-icons/fa';
import styles from './cryptoStoreStyles';

const StoreTab = ({ storeItems, loading, balance, handleBuy }) => (
    <div style={styles.grid}>
        {storeItems.map(item => (
            <div key={item.id} style={styles.itemCard}>
                <div style={styles.iconPlace}>
                    {item.preview_image
                        ? <img src={item.preview_image} alt={item.name} style={{ width: 50, height: 50 }} />
                        : <span style={{ fontSize: '2em' }}>{'🎁'}</span>}
                </div>
                <h4>{item.name}</h4>
                <p style={{ fontSize: '0.8em', color: '#999' }}>{item.description}</p>
                {item.rarity && <span style={{ fontSize: '0.75em', color: '#b9bbbe', marginBottom: 6 }}>Nadirlik: {item.rarity}</span>}
                {item.is_owned ? (
                    <button style={styles.ownedBtn} disabled>Sahipsin</button>
                ) : (
                    <button onClick={() => handleBuy(item.id)} style={styles.buyBtn} disabled={loading || balance < item.price}>
                        {balance < item.price ? <FaLock /> : null} {item.price} Coin
                    </button>
                )}
            </div>
        ))}
        {storeItems.length === 0 && <p style={{ color: '#ccc' }}>Mağazada ürün yok.</p>}
    </div>
);

export default StoreTab;
