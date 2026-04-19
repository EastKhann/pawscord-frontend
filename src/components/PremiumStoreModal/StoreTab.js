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
            name: 'Özel Emoji Paketi',
            price: 9.99,
            description: '50 premium emoji',
            icon: '😎',
            type: 'one_time',
        },
        {
            id: 2,
            name: 'Profil Teması',
            price: 14.99,
            description: t('ui.ozel_profile_arka_plani', 'Özel profil arka planı'),
            icon: '🎨',
            type: 'one_time',
        },
        {
            id: 3,
            name: 'Sunucu Güçlendirme',
            price: 19.99,
            description: t('ui.servernu_guclendir_1_month', '1 aylık sunucu güçlendirme'),
            icon: '🚀',
            type: 'subscription',
        },
        {
            id: 4,
            name: t('ui.ozel_rozet', 'Özel Rozet'),
            price: 24.99,
            description: 'Kendi rozetini yükle',
            icon: '⭐',
            type: 'one_time',
        },
        {
            id: 5,
            name: 'Ses Efektleri',
            price: 12.99,
            description: '10 ses efekti paketi',
            icon: '🎵',
            type: 'one_time',
        },
        {
            id: 6,
            name: 'Hareketli Çıkartma Paketi',
            price: 16.99,
            description: '30 hareketli çıkartma',
            icon: '✨',
            type: 'one_time',
        },
    ];
    const displayItems = storeItems.length > 0 ? storeItems : defaultStoreItems;

    return (
        <div aria-label="store tab" style={styles.storeTab}>
            <h3 style={styles.sectionTitle}>{t('mağaza_ürünleri')}</h3>
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
                                    ✓ Sahip
                                </button>
                            ) : STORE_PURCHASES_ENABLED ? (
                                <button
                                    onClick={() => handleBuyItem(item)}
                                    style={styles.buyButton}
                                    disabled={loading}
                                >
                                    {loading ? 'Yükleniyor...' : 'Satın Al'}
                                </button>
                            ) : (
                                <button disabled style={comingSoonButtonStyle}>
                                    🔒 Çok Yakında
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
