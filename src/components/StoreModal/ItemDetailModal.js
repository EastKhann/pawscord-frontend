/* eslint-disable no-irregular-whitespace */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaCoins, FaGift } from 'react-icons/fa';
import styles, { getRarityColor } from './storeModalStyles';
import useModalA11y from '../../hooks/useModalA11y';
import { STORE_PURCHASES_ENABLED } from '../../constants/featureFlags';

// -- dynamic style helpers (pass 2) --

const S = {
    font: { fontSize: '32px', fontWeight: 'bold' },
    txt: { fontSize: '120px', color: '#949ba4' },
};

const ItemDetailModal = ({ item, balance, onClose, onPurchase }) => {
    const { t } = useTranslation();

    if (!item) return null;

    const purchaseButtonStyle = {
        ...styles.purchaseBtn,
        ...(balance < item.price ? styles.purchaseBtnDisabled : {}),
    };

    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: !!item,
        label: 'Item Detail',
    });
    return (
        <div aria-label="item detail modal" style={styles.detailOverlay} {...overlayProps}>
            <div style={styles.detailModal} {...dialogProps}>
                <button onClick={onClose} style={styles.detailClose}>
                    <FaTimes />
                </button>
                {item.image ? (
                    <img src={item.image} alt={item.name} style={styles.detailImage} />
                ) : (
                    <div style={styles.detailPlaceholder}>
                        <FaGift style={S.txt} />
                    </div>
                )}
                <h2>{item.name}</h2>
                <div style={styles.detailRarity}>{item.rarity.toUpperCase()}</div>
                <p style={styles.detailDescription}>
                    {item.description || t('store.noDescription')}
                </p>
                <div style={styles.detailPrice}>
                    <FaCoins className="text-f0b-24" />
                    <span style={S.font}>{item.price.toLocaleString()}</span>
                </div>
                <button
                    onClick={() => STORE_PURCHASES_ENABLED && onPurchase(item)}
                    disabled={!STORE_PURCHASES_ENABLED || balance < item.price}
                    style={{
                        ...purchaseButtonStyle,
                        ...(!STORE_PURCHASES_ENABLED && {
                            opacity: 0.5,
                            cursor: 'not-allowed',
                            background: '#444',
                        }),
                    }}
                >
                    {!STORE_PURCHASES_ENABLED
                        ? t('store.comingSoon')
                        : balance < item.price
                          ? t('store.insufficientCoins')
                          : t('store.purchase')}
                </button>
            </div>
        </div>
    );
};

ItemDetailModal.propTypes = {
    item: PropTypes.object,
    balance: PropTypes.number,
    onClose: PropTypes.func,
    onPurchase: PropTypes.func,
};
export default ItemDetailModal;
