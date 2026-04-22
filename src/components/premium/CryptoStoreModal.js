import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaCoins, FaShoppingBag, FaTshirt, FaBitcoin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import useCryptoStore from '../CryptoStoreModal/useCryptoStore';
import StoreTab from '../CryptoStoreModal/StoreTab';
import InventoryTab from '../CryptoStoreModal/InventoryTab';
import DepositTab from '../CryptoStoreModal/DepositTab';
import styles from '../CryptoStoreModal/cryptoStoreStyles';
import useModalA11y from '../../hooks/useModalA11y';

const S = {
    txt4: { color: '#ff5d5d' },
    txt3: { marginLeft: 8, color: '#b5bac1' },
    bg: { padding: '10px 20px', borderTop: '1px solid #0b0e1b', backgroundColor: '#0d0e10' },
    txt2: { color: '#f0b232', fontSize: '1.2em' },
    txt: { margin: 0, color: 'white' },
};

const CryptoStoreModal = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const [error, setError] = useState(null);
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Crypto Store' });
    const store = useCryptoStore({ fetchWithAuth, apiBaseUrl, onClose });
    const { t } = useTranslation();

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <div className="flex-align-10">
                        <FaCoins color="#f0b232" size={24} />
                        <h2 style={S.txt}>{t('store.title', 'Pawscord Store')}</h2>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.balanceBar}>
                    <div className="flex-align-8">
                        <span>{t('store.currentBalance', 'Mevcut Bakiye')}:</span>
                        <strong style={S.txt2}>{store.balance} Coin</strong>
                        <button
                            aria-label={t('cryptoStore.dailyClaim', 'Claim daily reward')}
                            onClick={store.handleDailyClaim}
                            style={styles.dailyBtn}
                            disabled={store.loading}
                        >
                            🎁 +10
                        </button>
                    </div>
                </div>

                <div style={styles.tabs}>
                    <button
                        aria-label={t('store.shop', 'Store')}
                        style={store.activeTab === 'store' ? styles.activeTab : styles.tab}
                        onClick={() => store.setActiveTab('store')}
                    >
                        <FaShoppingBag /> {t('store.shop', 'Store')}
                    </button>
                    <button
                        aria-label={t('store.buyPawsCoin', 'PawsCoin Satın Al')}
                        style={store.activeTab === 'deposit' ? styles.activeTab : styles.tab}
                        onClick={() => store.setActiveTab('deposit')}
                    >
                        <FaBitcoin /> {t('store.buyPawsCoin', 'PawsCoin Satın Al')}
                    </button>
                    <button
                        aria-label={t('store.myInventory', 'Envanterim')}
                        style={store.activeTab === 'inventory' ? styles.activeTab : styles.tab}
                        onClick={() => store.setActiveTab('inventory')}
                    >
                        <FaTshirt /> {t('store.myInventory', 'Envanterim')}
                    </button>
                </div>

                <div style={styles.content}>
                    {store.activeTab === 'store' && (
                        <StoreTab
                            storeItems={store.storeItems}
                            loading={store.loading}
                            balance={store.balance}
                            handleBuy={store.handleBuy}
                        />
                    )}
                    {store.activeTab === 'inventory' && (
                        <InventoryTab
                            inventory={store.inventory}
                            loading={store.loading}
                            handleEquip={store.handleEquip}
                        />
                    )}
                    {store.activeTab === 'deposit' && <DepositTab {...store} />}
                </div>

                {store.dailyInfo && (
                    <div style={S.bg}>
                        {store.dailyInfo.claimed ? (
                            <div className="icon-success">
                                🎁{' '}
                                {t(
                                    'store.dailyClaimed',
                                    '{{coins}} coins received! New balance: {{balance}}.',
                                    {
                                        coins: store.dailyInfo.added_coins ?? 0,
                                        balance: store.dailyInfo.new_balance ?? store.balance,
                                    }
                                )}
                                {typeof store.dailyInfo.streak !== 'undefined' && (
                                    <span style={S.txt3}>
                                        {t('store.streak', 'Streak')}: {store.dailyInfo.streak}
                                    </span>
                                )}
                            </div>
                        ) : store.dailyInfo.reason === 'cooldown' ? (
                            <div className="icon-chat">
                                ⏳{' '}
                                {t('store.dailyCooldown', 'Wait for daily reward: {{seconds}}s', {
                                    seconds: Math.max(0, store.dailyInfo.remaining_seconds ?? 0),
                                })}
                            </div>
                        ) : (
                            <div style={S.txt4}>
                                ⚠️{' '}
                                {store.dailyInfo.error || t('store.claimFailed', 'Ödül alınamadı.')}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

CryptoStoreModal.propTypes = {
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default CryptoStoreModal;
