import React from 'react';
import { FaTimes, FaCoins, FaShoppingBag, FaTshirt, FaBitcoin } from 'react-icons/fa';
import useCryptoStore from './CryptoStoreModal/useCryptoStore';
import StoreTab from './CryptoStoreModal/StoreTab';
import InventoryTab from './CryptoStoreModal/InventoryTab';
import DepositTab from './CryptoStoreModal/DepositTab';
import styles from './CryptoStoreModal/cryptoStoreStyles';
import useModalA11y from '../hooks/useModalA11y';

const CryptoStoreModal = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Kripto Mağaza' });
    const store = useCryptoStore({ fetchWithAuth, apiBaseUrl, onClose });

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaCoins color="#f0b232" size={24} />
                        <h2 style={{ margin: 0, color: 'white' }}>Pawscord Ma{'ğ'}aza</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                <div style={styles.balanceBar}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>Mevcut Bakiye:</span>
                        <strong style={{ color: '#f0b232', fontSize: '1.2em' }}>{store.balance} Coin</strong>
                        <button onClick={store.handleDailyClaim} style={styles.dailyBtn} disabled={store.loading}>
                            {'🎁'} +10
                        </button>
                    </div>
                </div>

                <div style={styles.tabs}>
                    <button style={store.activeTab === 'store' ? styles.activeTab : styles.tab} onClick={() => store.setActiveTab('store')}><FaShoppingBag /> Ma{'ğ'}aza</button>
                    <button style={store.activeTab === 'deposit' ? styles.activeTab : styles.tab} onClick={() => store.setActiveTab('deposit')}><FaBitcoin /> PawsCoin Sat{'ı'}n Al</button>
                    <button style={store.activeTab === 'inventory' ? styles.activeTab : styles.tab} onClick={() => store.setActiveTab('inventory')}><FaTshirt /> Envanterim</button>
                </div>

                <div style={styles.content}>
                    {store.activeTab === 'store' && <StoreTab storeItems={store.storeItems} loading={store.loading} balance={store.balance} handleBuy={store.handleBuy} />}
                    {store.activeTab === 'inventory' && <InventoryTab inventory={store.inventory} loading={store.loading} handleEquip={store.handleEquip} />}
                    {store.activeTab === 'deposit' && <DepositTab {...store} />}
                </div>

                {store.dailyInfo && (
                    <div style={{ padding: '10px 20px', borderTop: '1px solid #1e1f22', backgroundColor: '#202225' }}>
                        {store.dailyInfo.claimed ? (
                            <div style={{ color: '#23a559' }}>
                                {'🎁'} {(store.dailyInfo.added_coins ?? 0)} coin ald{'ı'}n! Yeni bakiye: <strong>{store.dailyInfo.new_balance ?? store.balance}</strong>.
                                {typeof store.dailyInfo.streak !== 'undefined' && <span style={{ marginLeft: 8, color: '#b9bbbe' }}>Streak: {store.dailyInfo.streak}</span>}
                            </div>
                        ) : store.dailyInfo.reason === 'cooldown' ? (
                            <div style={{ color: '#b9bbbe' }}>{'⏳'} G{'ü'}nl{'ü'}k {'ö'}d{'ü'}l i{'ç'}in bekle: <strong>{Math.max(0, store.dailyInfo.remaining_seconds ?? 0)}</strong> sn</div>
                        ) : (
                            <div style={{ color: '#ff5d5d' }}>{'⚠️'} {(store.dailyInfo.error || 'Ödül alınamadı.')}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CryptoStoreModal;
