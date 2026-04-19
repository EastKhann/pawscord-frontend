import { getRarityColor } from './useStorePage';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useModalA11y from '../../hooks/useModalA11y';

// -- extracted inline style constants --

const ItemDetailModal = ({ item, isOwned, onPurchase, onClose }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: true,
        label: t('store.itemDetail'),
    });
    return (
        <div {...overlayProps}>
            <div
                style={{
                    background: 'linear-gradient(135deg, #111214 0%, #0d0e10 100%)',
                    borderRadius: '20px',
                    padding: '40px',
                    maxWidth: '500px',
                    width: '90%',
                    border: `3px solid ${getRarityColor(item.rarity)}`,
                    boxShadow: `0 0 40px ${getRarityColor(item.rarity)}60`,
                }}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                {...dialogProps}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div>{item.preview_url || '🎁'}</div>
                <h2
                    style={{
                        margin: '0 0 10px',
                        fontSize: '28px',
                        color: getRarityColor(item.rarity),
                    }}
                >
                    {item.name}
                </h2>
                <p>{item.description}</p>
                <div>
                    <button aria-label={t('common.close')} onClick={onClose}>
                        {t('common.close')}
                    </button>
                    {!isOwned && (
                        <button onClick={() => onPurchase(item)}>
                            {t('store.purchase')} ({item.price} 💰)
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

ItemDetailModal.propTypes = {
    item: PropTypes.shape({
        item_id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        rarity: PropTypes.string,
        category: PropTypes.string,
    }),
    isOwned: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onBuy: PropTypes.func.isRequired,
    userCoins: PropTypes.number,
};
export default ItemDetailModal;
