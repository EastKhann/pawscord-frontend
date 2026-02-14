import React from 'react';
import { FaTimes, FaShoppingCart, FaCoins, FaFire, FaCrown, FaPalette, FaMedal, FaGift } from 'react-icons/fa';
import useStoreAPI from './StoreModal/useStoreAPI';
import ItemDetailModal from './StoreModal/ItemDetailModal';
import s, { CATEGORIES, getRarityColor } from './StoreModal/storeModalStyles';

const ICON_MAP = { FaShoppingCart, FaPalette, FaMedal, FaFire, FaCrown };

const ItemCard = ({ item, onClick }) => (
    <div style={s.itemCard} onClick={() => onClick(item)}>
        {item.image ? <img src={item.image} alt={item.name} style={s.itemImage} />
            : <div style={s.itemPlaceholder}><FaGift style={{ fontSize: '48px', color: '#99aab5' }} /></div>}
        <div style={s.itemInfo}>
            <div style={{ ...s.itemName, color: getRarityColor(item.rarity) }}>{item.name}</div>
            <div style={s.itemPrice}><FaCoins style={{ color: '#faa61a' }} />{item.price.toLocaleString()}</div>
        </div>
        {item.limited && <div style={s.limitedBadge}>LIMITED</div>}
    </div>
);

const StoreModal = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const store = useStoreAPI({ fetchWithAuth, apiBaseUrl });

    return (
        <div style={s.overlay} onClick={onClose}>
            <div style={s.modal} onClick={(e) => e.stopPropagation()}>
                <div style={s.header}>
                    <div style={s.headerLeft}>
                        <FaShoppingCart style={{ fontSize: '24px', color: '#5865f2' }} />
                        <h2 style={{ margin: 0, fontSize: '20px' }}>Item Store</h2>
                    </div>
                    <div style={s.headerRight}>
                        <div style={s.balance}><FaCoins style={{ color: '#faa61a' }} /><span>{store.balance.toLocaleString()}</span></div>
                        <button onClick={onClose} style={s.closeBtn}><FaTimes /></button>
                    </div>
                </div>

                <div style={s.categories}>
                    {CATEGORIES.map(cat => {
                        const Icon = ICON_MAP[cat.icon];
                        return (
                            <button key={cat.id} onClick={() => store.setSelectedCategory(cat.id)}
                                style={{ ...s.categoryBtn, ...(store.selectedCategory === cat.id && s.activeCategoryBtn) }}>
                                <Icon /><span>{cat.name}</span>
                            </button>
                        );
                    })}
                </div>

                <div style={s.content}>
                    {store.loading ? <div style={s.loading}>Loading store...</div> : (
                        <>
                            {store.selectedCategory === 'all' && store.featuredItems.length > 0 && (
                                <div style={s.section}>
                                    <h3 style={s.sectionTitle}><FaFire style={{ color: '#f04747' }} /> Featured Items</h3>
                                    <div style={s.itemsGrid}>
                                        {store.featuredItems.map(item => <ItemCard key={item.id} item={item} onClick={store.setSelectedItem} />)}
                                    </div>
                                </div>
                            )}
                            <div style={s.section}>
                                <h3 style={s.sectionTitle}>{CATEGORIES.find(c => c.id === store.selectedCategory)?.name || 'All Items'}</h3>
                                {store.filteredItems.length === 0 ? <div style={s.empty}>No items in this category</div> : (
                                    <div style={s.itemsGrid}>
                                        {store.filteredItems.map(item => <ItemCard key={item.id} item={item} onClick={store.setSelectedItem} />)}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <ItemDetailModal item={store.selectedItem} balance={store.balance}
                    onClose={() => store.setSelectedItem(null)} onPurchase={store.handlePurchase} />
            </div>
        </div>
    );
};

export default StoreModal;
