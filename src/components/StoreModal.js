// frontend/src/components/StoreModal.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaShoppingCart, FaCoins, FaStar, FaFire, FaCrown, FaPalette, FaMedal, FaGift } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 🛒 Store Modal - Virtual Item Shop
 * Complete store system for purchasing items
 * 
 * Features:
 * - Browse store items by category
 * - Featured items section
 * - Purchase items with coins
 * - Item preview
 * - Balance display
 */
const StoreModal = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    const categories = [
        { id: 'all', name: 'All Items', icon: FaShoppingCart },
        { id: 'cosmetics', name: 'Cosmetics', icon: FaPalette },
        { id: 'badges', name: 'Badges', icon: FaMedal },
        { id: 'boosters', name: 'Boosters', icon: FaFire },
        { id: 'special', name: 'Special', icon: FaCrown }
    ];

    useEffect(() => {
        loadStoreItems();
        loadBalance();
    }, []);

    const loadStoreItems = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/store/items/`);
            const data = await response.json();
            setItems(data.items || []);
        } catch (error) {
            console.error('Failed to load store items:', error);
            toast.error('Failed to load store');
        } finally {
            setLoading(false);
        }
    };

    const loadBalance = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/balance/`);
            const data = await response.json();
            setBalance(data.balance || 0);
        } catch (error) {
            console.error('Failed to load balance:', error);
        }
    };

    const handlePurchase = async (item) => {
        if (balance < item.price) {
            toast.error('Insufficient coins!');
            return;
        }

        if (!window.confirm(`Purchase ${item.name} for ${item.price} coins?`)) {
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/store/buy/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item_id: item.id
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`Successfully purchased ${item.name}!`);
                loadBalance();
                setSelectedItem(null);
            } else {
                toast.error(data.error || 'Purchase failed');
            }
        } catch (error) {
            console.error('Purchase error:', error);
            toast.error('Purchase failed');
        }
    };

    const filteredItems = selectedCategory === 'all'
        ? items
        : items.filter(item => item.category === selectedCategory);

    const featuredItems = items.filter(item => item.featured);

    const getRarityColor = (rarity) => {
        const colors = {
            common: '#b0b0b0',
            uncommon: '#1eff00',
            rare: '#0070dd',
            epic: '#a335ee',
            legendary: '#ff8000'
        };
        return colors[rarity] || colors.common;
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaShoppingCart style={{ fontSize: '24px', color: '#5865f2' }} />
                        <h2 style={{ margin: 0, fontSize: '20px' }}>Item Store</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <div style={styles.balance}>
                            <FaCoins style={{ color: '#faa61a' }} />
                            <span>{balance.toLocaleString()}</span>
                        </div>
                        <button onClick={onClose} style={styles.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div style={styles.categories}>
                    {categories.map(cat => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                style={{
                                    ...styles.categoryBtn,
                                    ...(selectedCategory === cat.id && styles.activeCategoryBtn)
                                }}
                            >
                                <Icon />
                                <span>{cat.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading store...</div>
                    ) : (
                        <>
                            {/* Featured Items */}
                            {selectedCategory === 'all' && featuredItems.length > 0 && (
                                <div style={styles.section}>
                                    <h3 style={styles.sectionTitle}>
                                        <FaFire style={{ color: '#f04747' }} /> Featured Items
                                    </h3>
                                    <div style={styles.itemsGrid}>
                                        {featuredItems.map(item => (
                                            <div
                                                key={item.id}
                                                style={styles.itemCard}
                                                onClick={() => setSelectedItem(item)}
                                            >
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} style={styles.itemImage} />
                                                ) : (
                                                    <div style={styles.itemPlaceholder}>
                                                        <FaGift style={{ fontSize: '48px', color: '#99aab5' }} />
                                                    </div>
                                                )}
                                                <div style={styles.itemInfo}>
                                                    <div
                                                        style={{
                                                            ...styles.itemName,
                                                            color: getRarityColor(item.rarity)
                                                        }}
                                                    >
                                                        {item.name}
                                                    </div>
                                                    <div style={styles.itemPrice}>
                                                        <FaCoins style={{ color: '#faa61a' }} />
                                                        {item.price.toLocaleString()}
                                                    </div>
                                                </div>
                                                {item.limited && (
                                                    <div style={styles.limitedBadge}>LIMITED</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* All Items */}
                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>
                                    {categories.find(c => c.id === selectedCategory)?.name || 'All Items'}
                                </h3>
                                {filteredItems.length === 0 ? (
                                    <div style={styles.empty}>No items in this category</div>
                                ) : (
                                    <div style={styles.itemsGrid}>
                                        {filteredItems.map(item => (
                                            <div
                                                key={item.id}
                                                style={styles.itemCard}
                                                onClick={() => setSelectedItem(item)}
                                            >
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} style={styles.itemImage} />
                                                ) : (
                                                    <div style={styles.itemPlaceholder}>
                                                        <FaGift style={{ fontSize: '48px', color: '#99aab5' }} />
                                                    </div>
                                                )}
                                                <div style={styles.itemInfo}>
                                                    <div
                                                        style={{
                                                            ...styles.itemName,
                                                            color: getRarityColor(item.rarity)
                                                        }}
                                                    >
                                                        {item.name}
                                                    </div>
                                                    <div style={styles.itemPrice}>
                                                        <FaCoins style={{ color: '#faa61a' }} />
                                                        {item.price.toLocaleString()}
                                                    </div>
                                                </div>
                                                {item.limited && (
                                                    <div style={styles.limitedBadge}>LIMITED</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Item Detail Modal */}
                {selectedItem && (
                    <div style={styles.detailOverlay} onClick={() => setSelectedItem(null)}>
                        <div style={styles.detailModal} onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setSelectedItem(null)} style={styles.detailClose}>
                                <FaTimes />
                            </button>

                            {selectedItem.image ? (
                                <img src={selectedItem.image} alt={selectedItem.name} style={styles.detailImage} />
                            ) : (
                                <div style={styles.detailPlaceholder}>
                                    <FaGift style={{ fontSize: '120px', color: '#99aab5' }} />
                                </div>
                            )}

                            <h2
                                style={{
                                    ...styles.detailName,
                                    color: getRarityColor(selectedItem.rarity)
                                }}
                            >
                                {selectedItem.name}
                            </h2>

                            <div style={styles.detailRarity}>
                                {selectedItem.rarity.toUpperCase()}
                            </div>

                            <p style={styles.detailDescription}>
                                {selectedItem.description || 'No description available.'}
                            </p>

                            <div style={styles.detailPrice}>
                                <FaCoins style={{ fontSize: '24px', color: '#faa61a' }} />
                                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>
                                    {selectedItem.price.toLocaleString()}
                                </span>
                            </div>

                            <button
                                onClick={() => handlePurchase(selectedItem)}
                                disabled={balance < selectedItem.price}
                                style={{
                                    ...styles.purchaseBtn,
                                    ...(balance < selectedItem.price && styles.purchaseBtnDisabled)
                                }}
                            >
                                {balance < selectedItem.price ? 'Insufficient Coins' : 'Purchase'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '95%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #444',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    balance: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#2c2f33',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '16px',
        fontWeight: '600'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '8px'
    },
    categories: {
        display: 'flex',
        gap: '8px',
        padding: '16px 20px',
        borderBottom: '1px solid #444',
        overflowX: 'auto'
    },
    categoryBtn: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        padding: '10px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s'
    },
    activeCategoryBtn: {
        backgroundColor: '#5865f2',
        color: '#fff'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    },
    section: {
        marginBottom: '32px'
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    itemsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px'
    },
    itemCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '12px',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        position: 'relative',
        overflow: 'hidden'
    },
    itemImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '6px',
        marginBottom: '8px'
    },
    itemPlaceholder: {
        width: '100%',
        height: '150px',
        backgroundColor: '#202225',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '8px'
    },
    itemInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    itemName: {
        fontSize: '14px',
        fontWeight: '600',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    itemPrice: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    limitedBadge: {
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: '#f04747',
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: 'bold'
    },
    empty: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    },
    detailOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000000
    },
    detailModal: {
        backgroundColor: '#2c2f33',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '500px',
        width: '90%',
        position: 'relative',
        textAlign: 'center'
    },
    detailClose: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer'
    },
    detailImage: {
        width: '100%',
        maxHeight: '300px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '20px'
    },
    detailPlaceholder: {
        width: '100%',
        height: '300px',
        backgroundColor: '#202225',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
    },
    detailName: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '12px'
    },
    detailRarity: {
        display: 'inline-block',
        padding: '6px 12px',
        backgroundColor: '#202225',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 'bold',
        marginBottom: '16px'
    },
    detailDescription: {
        fontSize: '14px',
        color: '#dcddde',
        lineHeight: '1.6',
        marginBottom: '24px'
    },
    detailPrice: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '24px',
        color: '#faa61a'
    },
    purchaseBtn: {
        width: '100%',
        padding: '14px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.2s'
    },
    purchaseBtnDisabled: {
        backgroundColor: '#555',
        cursor: 'not-allowed'
    }
};

export default StoreModal;
