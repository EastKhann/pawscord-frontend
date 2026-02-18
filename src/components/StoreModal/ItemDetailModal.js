import React from 'react';
import { FaTimes, FaCoins, FaGift } from 'react-icons/fa';
import styles, { getRarityColor } from './storeModalStyles';
import useModalA11y from '../../hooks/useModalA11y';

const ItemDetailModal = ({ item, balance, onClose, onPurchase }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen: !!item, label: 'Ürün Detay' });
    if (!item) return null;
    return (
        <div style={styles.detailOverlay} {...overlayProps}>
            <div style={styles.detailModal} {...dialogProps}>
                <button onClick={onClose} style={styles.detailClose}><FaTimes /></button>
                {item.image ? (
                    <img src={item.image} alt={item.name} style={styles.detailImage} />
                ) : (
                    <div style={styles.detailPlaceholder}><FaGift style={{ fontSize: '120px', color: '#99aab5' }} /></div>
                )}
                <h2 style={{ ...styles.detailName, color: getRarityColor(item.rarity) }}>{item.name}</h2>
                <div style={styles.detailRarity}>{item.rarity.toUpperCase()}</div>
                <p style={styles.detailDescription}>{item.description || 'No description available.'}</p>
                <div style={styles.detailPrice}>
                    <FaCoins style={{ fontSize: '24px', color: '#faa61a' }} />
                    <span style={{ fontSize: '32px', fontWeight: 'bold' }}>{item.price.toLocaleString()}</span>
                </div>
                <button onClick={() => onPurchase(item)} disabled={balance < item.price}
                    style={{ ...styles.purchaseBtn, ...(balance < item.price && styles.purchaseBtnDisabled) }}>
                    {balance < item.price ? 'Insufficient Coins' : 'Purchase'}
                </button>
            </div>
        </div>
    );
};

export default ItemDetailModal;
