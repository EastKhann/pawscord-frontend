import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { STORE_PURCHASES_ENABLED } from '../../constants/featureFlags';

const StoreTab = ({ styles, storeItems, userInventory, handleBuyItem, loading }) => {
    const { t } = useTranslation();
    const inventoryItems = Array.isArray(userInventory) ? userInventory : [];
    const ownedButtonStyle = {
        ...styles.buyButton,
        backgroundColor: '#23a559',
        cursor: 'not-allowed',
        opacity: 0.7,
    };
    const comingSoonButtonStyle = {
        ...styles.buyButton,
        cursor: 'not-allowed',
        opacity: 0.7,
    };
    const defaultStoreItems = [
        {
            id: 1,
            name: t('store.emojiPack'),
            price: 9.99,
            description: t('store.emojiPackDesc'),
            icon: '😎',
            type: 'one_time',
        },
        {
            id: 2,
            name: t('store.profileTheme'),
            price: 14.99,
            description: t('ui.ozel_profile_arka_plani', t('store.profileTheme')),
            icon: '🎨',
            type: 'one_time',
        },
        {
            id: 3,
            name: t('store.serverBoostItem'),
            price: 19.99,
            description: t('store.serverBoostDesc'),
            icon: '🚀',
            type: 'subscription',
        },
        {
            id: 4,
            name: t('ui.ozel_rozet'),
            price: 24.99,
            description: t('store.customBadgeDesc'),
            icon: '⭐',
            type: 'one_time',
        },
        {
            id: 5,
            name: t('store.soundEffects'),
            price: 12.99,
            description: t('store.soundEffectsDesc'),
            icon: '🎵',
            type: 'one_time',
        },
        {
            id: 6,
            name: t('store.animatedStickers'),
            price: 16.99,
            description: t('store.animatedStickersDesc'),
            icon: '✨',
            type: 'one_time',
        },
    ];
    const displayItems = storeItems.length > 0 ? storeItems : defaultStoreItems;

    return (
        <div aria-label={t('premiumStore.storeTab', 'Store tab')} style={styles.storeTab}>
            <h3 style={styles.sectionTitle}>{t('store.storeItems')}</h3>
            <div style={styles.storeGrid}>
                {displayItems.map((item) => {
                    const isOwned = inventoryItems.some(
                        (inv) => inv.item_details?.id === item.id || inv.item === item.id
                    );
                    const storeItemStyle = {
                        ...styles.storeItem,
                        ...(isOwned && { opacity: 0.6, borderColor: '#23a559' }),
                    };

                    return (
                        <div key={item.id} style={storeItemStyle}>
                            <div style={styles.itemIcon}>{item.icon || '🎁'}</div>
                            <h4 style={styles.itemName}>{item.name}</h4>
                            <p style={styles.itemDescription}>{item.description}</p>
                            <div style={styles.itemPrice}>{item.price} TL</div>

                            {isOwned ? (
                                <button disabled style={ownedButtonStyle}>
                                    ✓ {t('store.owned', 'Owned')}
                                </button>
                            ) : STORE_PURCHASES_ENABLED ? (
                                <button
                                    onClick={() => handleBuyItem(item)}
                                    style={styles.buyButton}
                                    disabled={loading}
                                >
                                    {loading ? t('common.loading') : t('store.buyNow', 'Buy Now')}
                                </button>
                            ) : (
                                <button disabled style={comingSoonButtonStyle}>
                                    {t('store.comingSoonBtn')}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

StoreTab.propTypes = {
    styles: PropTypes.object,
    storeItems: PropTypes.array,
    userInventory: PropTypes.array,
    handleBuyItem: PropTypes.func,
    loading: PropTypes.bool,
};

export default StoreTab;
