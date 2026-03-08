// Default store items (fallback when backend returns empty)
const defaultStoreItems = [
    { id: 1, name: "Özel Emoji Paketi", price: 9.99, description: "50 premium emoji", icon: "😎", type: "one_time" },
    { id: 2, name: "Profil Teması", price: 14.99, description: "Özel profil arka planı", icon: "🎨", type: "one_time" },
    { id: 3, name: "Server Boost", price: 19.99, description: "Sunucunu güçlendir (1 ay)", icon: "🚀", type: "subscription" },
    { id: 4, name: "Özel Rozet", price: 24.99, description: "Kendi rozetini yükle", icon: "⭐", type: "one_time" },
    { id: 5, name: "Ses Efektleri", price: 12.99, description: "10 ses efekti paketi", icon: "🎵", type: "one_time" },
    { id: 6, name: "Animated Sticker Paketi", price: 16.99, description: "30 animated sticker", icon: "✨", type: "one_time" },
];

const StoreTab = ({ styles, storeItems, userInventory, handleBuyItem, loading }) => {
    const displayItems = storeItems.length > 0 ? storeItems : defaultStoreItems;

    return (
        <div style={styles.storeTab}>
            <h3 style={styles.sectionTitle}>Mağaza Ürünleri</h3>
            <div style={styles.storeGrid}>
                {displayItems.map(item => {
                    const isOwned = userInventory.some(inv =>
                        inv.item_details?.id === item.id || inv.item === item.id
                    );

                    return (
                        <div key={item.id} style={{
                            ...styles.storeItem,
                            ...(isOwned && { opacity: 0.6, borderColor: '#23a559' })
                        }}>
                            <div style={styles.itemIcon}>{item.icon || '🎁'}</div>
                            <h4 style={styles.itemName}>{item.name}</h4>
                            <p style={styles.itemDescription}>{item.description}</p>
                            <div style={styles.itemPrice}>{item.price} TL</div>

                            {isOwned ? (
                                <button
                                    disabled
                                    style={{
                                        ...styles.buyButton,
                                        backgroundColor: '#23a559',
                                        cursor: 'not-allowed',
                                        opacity: 0.7
                                    }}
                                >
                                    ✓ Sahip
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleBuyItem(item)}
                                    style={styles.buyButton}
                                    disabled={loading}
                                >
                                    {loading ? 'Yükleniyor...' : 'Satın Al'}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StoreTab;
