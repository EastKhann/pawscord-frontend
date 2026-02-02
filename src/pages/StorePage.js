import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { useAuth } from '../AuthContext';
import { getApiBase } from '../utils/apiEndpoints';

const StorePage = () => {
    const { token } = useAuth();
    const [activeCategory, setActiveCategory] = useState('frames');
    const [items, setItems] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [userCoins, setUserCoins] = useState(0);
    const [premiumTier, setPremiumTier] = useState('free');
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || getApiBase().replace('/api', '');

    const categories = [
        { id: 'frames', name: '🖼️ Çerçeveler', icon: '🖼️' },
        { id: 'badges', name: '🏆 Rozetler', icon: '🏆' },
        { id: 'banners', name: '🎨 Banner', icon: '🎨' },
        { id: 'emojis', name: '😎 Emoji', icon: '😎' },
        { id: 'voices', name: '🎙️ Ses Efekti', icon: '🎙️' },
        { id: 'themes', name: '🌈 Tema', icon: '🌈' },
    ];

    useEffect(() => {
        fetchUserData();
        fetchItems();
        fetchInventory();
    }, [activeCategory]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/store/coins/balance/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setUserCoins(data.coins);
            setPremiumTier(data.premium_tier);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${API_URL}/api/store/items/?category=${activeCategory}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            const data = await response.json();
            setItems(data.results || data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
        setLoading(false);
    };

    const fetchInventory = async () => {
        try {
            const response = await fetch(`${API_URL}/api/store/inventory/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setInventory(data.results || data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handlePurchase = async (item) => {
        if (userCoins < item.price) {
            toast.error(`❌ Yetersiz coin! ${item.price} coin gerekli, ${userCoins} coin var.`);
            return;
        }

        if (item.premium_required && premiumTier === 'free') {
            toast.error(`❌ ${item.premium_required} üyelik gerekli!`);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/store/items/${item.id}/purchase/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`✅ ${item.name} satın alındı!`);
                setUserCoins(data.coins_remaining);
                fetchInventory();
                setSelectedItem(null);
            } else {
                toast.error(`❌ ${data.error || 'Satın alma başarısız'}`);
            }
        } catch (error) {
            console.error('Purchase error:', error);
            toast.error('❌ Bir hata oluştu');
        }
    };

    const getRarityColor = (rarity) => {
        const colors = {
            common: '#FFFFFF',
            rare: '#5865F2',
            epic: '#9B59B6',
            legendary: '#F1C40F',
            unique: '#E74C3C',
        };
        return colors[rarity] || '#FFFFFF';
    };

    const isOwned = (itemId) => {
        return inventory.some(inv => inv.item.item_id === itemId);
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)',
            color: '#fff',
        }}>
            {/* HEADER */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '20px 40px',
                borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700 }}>
                    🛒 Pawscord Mağaza
                </h1>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #F1C40F 0%, #F39C12 100%)',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: 700,
                        fontSize: '18px',
                    }}>
                        <span>💰</span>
                        <span>{userCoins.toLocaleString()} Coins</span>
                    </div>
                    {premiumTier !== 'free' && (
                        <div style={{
                            background: premiumTier === 'elite' ?
                                'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)' :
                                'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontWeight: 700,
                        }}>
                            {premiumTier === 'elite' ? '👑 Elite' : '💎 Premium'}
                        </div>
                    )}
                </div>
            </div>

            {/* CATEGORIES */}
            <div style={{
                padding: '30px 40px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            style={{
                                background: activeCategory === cat.id ?
                                    'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)' :
                                    'rgba(255, 255, 255, 0.05)',
                                border: activeCategory === cat.id ?
                                    '2px solid #5865F2' :
                                    '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                padding: '12px 24px',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 600,
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={(e) => {
                                if (activeCategory !== cat.id) {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeCategory !== cat.id) {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                }
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* ITEMS GRID */}
            <div style={{ padding: '40px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px', fontSize: '20px' }}>
                        ⏳ Yükleniyor...
                    </div>
                ) : items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px', color: '#888' }}>
                        Bu kategoride henüz öğe yok
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '24px',
                    }}>
                        {items.map(item => {
                            const owned = isOwned(item.item_id);
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        border: `2px solid ${getRarityColor(item.rarity)}`,
                                        boxShadow: `0 0 20px ${getRarityColor(item.rarity)}40`,
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s',
                                        position: 'relative',
                                    }}
                                    onClick={() => setSelectedItem(item)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {/* Owned Badge */}
                                    {owned && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            background: '#43b581',
                                            padding: '4px 12px',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                        }}>
                                            ✅ Sahip
                                        </div>
                                    )}

                                    {/* Premium Badge */}
                                    {item.premium_required && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            left: '10px',
                                            background: item.premium_required === 'elite' ? '#E74C3C' : '#5865F2',
                                            padding: '4px 12px',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                        }}>
                                            {item.premium_required === 'elite' ? '👑 Elite' : '💎 Premium'}
                                        </div>
                                    )}

                                    {/* Preview */}
                                    <div style={{
                                        height: '150px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '80px',
                                        marginTop: item.premium_required ? '30px' : '0',
                                    }}>
                                        {item.preview_url || '🎁'}
                                    </div>

                                    {/* Name */}
                                    <h3 style={{
                                        margin: '16px 0 8px',
                                        fontSize: '20px',
                                        color: getRarityColor(item.rarity),
                                    }}>
                                        {item.name}
                                    </h3>

                                    {/* Description */}
                                    <p style={{
                                        margin: '0 0 16px',
                                        fontSize: '14px',
                                        color: '#aaa',
                                        minHeight: '40px',
                                    }}>
                                        {item.description}
                                    </p>

                                    {/* Rarity */}
                                    <div style={{
                                        fontSize: '12px',
                                        color: getRarityColor(item.rarity),
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        marginBottom: '12px',
                                    }}>
                                        {item.rarity}
                                    </div>

                                    {/* Price */}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <div style={{
                                            fontSize: '24px',
                                            fontWeight: 700,
                                            color: '#F1C40F',
                                        }}>
                                            {item.price === 0 ? 'ÜCRETSIZ' : `${item.price} 💰`}
                                        </div>
                                        {!owned && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePurchase(item);
                                                }}
                                                style={{
                                                    background: 'linear-gradient(135deg, #43b581 0%, #3ca374 100%)',
                                                    border: 'none',
                                                    color: '#fff',
                                                    padding: '10px 20px',
                                                    borderRadius: '8px',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.transform = 'scale(1.05)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = 'scale(1)';
                                                }}
                                            >
                                                Satın Al
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ITEM DETAILS MODAL */}
            {selectedItem && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                    }}
                    onClick={() => setSelectedItem(null)}
                >
                    <div
                        style={{
                            background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)',
                            borderRadius: '20px',
                            padding: '40px',
                            maxWidth: '500px',
                            width: '90%',
                            border: `3px solid ${getRarityColor(selectedItem.rarity)}`,
                            boxShadow: `0 0 40px ${getRarityColor(selectedItem.rarity)}60`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ textAlign: 'center', fontSize: '100px', marginBottom: '20px' }}>
                            {selectedItem.preview_url || '🎁'}
                        </div>
                        <h2 style={{
                            margin: '0 0 10px',
                            fontSize: '28px',
                            color: getRarityColor(selectedItem.rarity),
                        }}>
                            {selectedItem.name}
                        </h2>
                        <p style={{ margin: '0 0 20px', color: '#aaa', fontSize: '16px' }}>
                            {selectedItem.description}
                        </p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '30px',
                        }}>
                            <button
                                onClick={() => setSelectedItem(null)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: '#fff',
                                    padding: '12px 24px',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                }}
                            >
                                Kapat
                            </button>
                            {!isOwned(selectedItem.item_id) && (
                                <button
                                    onClick={() => handlePurchase(selectedItem)}
                                    style={{
                                        background: 'linear-gradient(135deg, #43b581 0%, #3ca374 100%)',
                                        border: 'none',
                                        color: '#fff',
                                        padding: '12px 32px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        fontWeight: 700,
                                        fontSize: '16px',
                                    }}
                                >
                                    Satın Al ({selectedItem.price} 💰)
                                    </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StorePage;



