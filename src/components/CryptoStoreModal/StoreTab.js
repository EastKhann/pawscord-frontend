import React from 'react';
import PropTypes from 'prop-types';
import { FaLock } from 'react-icons/fa';
import styles from './cryptoStoreStyles';
import { useTranslation } from 'react-i18next';
import { STORE_PURCHASES_ENABLED } from '../../constants/featureFlags';

// -- dynamic style helpers (pass 2) --
const _st1135 = { ...styles.ownedBtn, cursor: 'not-allowed', opacity: 0.7 };

const S = {
    txt: { fontSize: '0.75em', color: '#b5bac1', marginBottom: 6 },
};

const StoreTab = ({ storeItems, loading, balance, handleBuy }) => {
    const { t } = useTranslation();
    return (
        <div aria-label="store tab" style={styles.grid}>
            {storeItems.map((item) => (
                <div key={item.id} style={styles.itemCard}>
                    <div style={styles.iconPlace}>
                        {item.preview_image ? (
                            <img src={item.preview_image} alt={item.name} className="size-50" />
                        ) : (
                            <span className="fs-2em">🎁</span>
                        )}
                    </div>
                    <h4>{item.name}</h4>
                    <p className="text-999-08em">{item.description}</p>
                    {item.rarity && (
                        <span style={S.txt}>
                            {t('store.rarity', 'Rarity')}: {item.rarity}
                        </span>
                    )}
                    {item.is_owned ? (
                        <button style={styles.ownedBtn} disabled>
                            {t('store.owned', 'Owned')}
                        </button>
                    ) : STORE_PURCHASES_ENABLED ? (
                        <button
                            onClick={() => handleBuy(item.id)}
                            style={styles.buyBtn}
                            disabled={loading || balance < item.price}
                        >
                            {balance < item.price ? <FaLock /> : null} {item.price} Coin
                        </button>
                    ) : (
                        <button disabled style={_st1135}>
                            🔒 {t('coming_soon', 'Yakında')}
                        </button>
                    )}
                </div>
            ))}
            {storeItems.length === 0 && (
                <p className="text-ccc">{t('store.emptyStore', 'Mağazada ürün yok')}</p>
            )}
        </div>
    );
};

StoreTab.propTypes = {
    storeItems: PropTypes.array,
    loading: PropTypes.bool,
    balance: PropTypes.number,
    handleBuy: PropTypes.func,
};
export default StoreTab;
