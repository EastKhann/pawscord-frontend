// frontend/src/components/PremiumStoreModal.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaCrown, FaShoppingCart, FaRocket, FaCheck, FaStar } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import CoinStoreModal from './CoinStoreModal';
import { getApiBase } from '../utils/apiEndpoints';

const PremiumStoreModal = ({ onClose }) => {
    const { user, token } = useAuth();
    const [activeTab, setActiveTab] = useState('premium'); // premium, store, boost
    const [premiumStatus, setPremiumStatus] = useState(null);
    const [storeItems, setStoreItems] = useState([]);
    const [userInventory, setUserInventory] = useState([]); // 🆕 Kullanıcının envanteri
    const [loading, setLoading] = useState(true);
    const [showCoinStore, setShowCoinStore] = useState(false); // 💰 Coin mağazası modal

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || getApiBase();

    // Premium durumunu yükle
    useEffect(() => {
        fetchPremiumStatus();
        fetchStoreItems();
        fetchUserInventory(); // 🆕 Envanteri çek
    }, []);

    const fetchPremiumStatus = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/premium/status/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setPremiumStatus(data);
        } catch (error) {
            console.error('Premium status hatası:', error);
        }
    };

    const fetchStoreItems = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/store/items/`);
            const data = await response.json();
            setStoreItems(data);
            setLoading(false);
        } catch (error) {
            console.error('Store items hatası:', error);
            setLoading(false);
        }
    };

    // 🆕 Kullanıcının envanterini çek
    const fetchUserInventory = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/store/inventory/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            // ✅ Array kontrolü ekle
            const inventoryArray = Array.isArray(data) ? data : [];
            setUserInventory(inventoryArray);
            console.log('📦 [INVENTORY] Kullanıcı envanteri:', inventoryArray);
        } catch (error) {
            console.error('Inventory hatası:', error);
            setUserInventory([]); // Hata durumunda boş array
        }
    };

    // Premium Plans
    const premiumPlans = {
        basic: {
            tier: 'basic',
            name: "Pawscord Nitro Basic",
            price: 29.99,
            priceYearly: 299.99,
            color: "#5865f2",
            features: [
                { text: "100 sunucu", included: true },
                { text: "Sınırsız arkadaş", included: true },
                { text: "50 MB dosya yükleme", included: true },
                { text: "1080p video kalitesi", included: true },
                { text: "50 özel emoji", included: true },
                { text: "Animated avatar", included: true },
                { text: "HD ekran paylaşımı", included: true },
                { text: "Özel rozet", included: true },
                { text: "Server boosting", included: false },
                { text: "4K video", included: false }
            ]
        },
        premium: {
            tier: 'premium',
            name: "Pawscord Nitro Premium",
            price: 49.99,
            priceYearly: 499.99,
            color: "#f0b232",
            popular: true,
            features: [
                { text: "Sınırsız sunucu", included: true },
                { text: "Sınırsız arkadaş", included: true },
                { text: "500 MB dosya yükleme", included: true },
                { text: "4K video kalitesi", included: true },
                { text: "200 özel emoji", included: true },
                { text: "Animated avatar + banner", included: true },
                { text: "4K ekran paylaşımı 60FPS", included: true },
                { text: "2x Server boost dahil", included: true },
                { text: "AI asistan", included: true },
                { text: "Özel profil temaları", included: true }
            ]
        }
    };

    // Default store items (backend'den gelmezse)
    const defaultStoreItems = [
        {
            id: 1,
            name: "Özel Emoji Paketi",
            price: 9.99,
            description: "50 premium emoji",
            icon: "😎",
            type: "one_time"
        },
        {
            id: 2,
            name: "Profil Teması",
            price: 14.99,
            description: "Özel profil arka planı",
            icon: "🎨",
            type: "one_time"
        },
        {
            id: 3,
            name: "Server Boost",
            price: 19.99,
            description: "Sunucunu güçlendir (1 ay)",
            icon: "🚀",
            type: "subscription"
        },
        {
            id: 4,
            name: "Özel Rozet",
            price: 24.99,
            description: "Kendi rozetini yükle",
            icon: "⭐",
            type: "one_time"
        },
        {
            id: 5,
            name: "Ses Efektleri",
            price: 12.99,
            description: "10 ses efekti paketi",
            icon: "🎵",
            type: "one_time"
        },
        {
            id: 6,
            name: "Animated Sticker Paketi",
            price: 16.99,
            description: "30 animated sticker",
            icon: "✨",
            type: "one_time"
        }
    ];

    // Backend'den gelen items veya default items kullan
    const displayItems = storeItems.length > 0 ? storeItems : defaultStoreItems;

    const handlePurchase = async (plan, isYearly = false) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/premium/subscribe/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tier: plan.tier,
                    is_yearly: isYearly,
                    payment_method: 'test'  // Test modu - gerçek ödeme için 'iyzico' kullanılacak
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`🎉 ${plan.name} başarıyla aktif edildi!\n\nFiyat: ${isYearly ? plan.priceYearly : plan.price} TL`);
                await fetchPremiumStatus(); // Durumu güncelle
                onClose();
            } else {
                toast.error(`❌ Hata: ${data.message}`);
            }
        } catch (error) {
            console.error('Satın alma hatası:', error);
            toast.error('❌ Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const handleBuyItem = async (item) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/store/purchase/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    item_id: item.id,
                    payment_method: 'test'
                })
            });

            const data = await response.json();
            console.log('🛒 [PURCHASE] Response:', data); // Debug için

            if (data.success) {
                toast.success(`🎉 ${item.name} başarıyla satın alındı!\n\nYeni bakiye: ${data.new_balance} coin`);
                await fetchUserInventory(); // 🔥 Envanteri güncelle
            } else if (data.insufficient_coins) {
                // 💰 Yetersiz coin - coin store'u aç
                const buyCoins = window.confirm(
                    `❌ Yetersiz bakiye!\n\n` +
                    `Gerekli: ${data.required} coin\n` +
                    `Mevcut: ${data.current} coin\n` +
                    `Eksik: ${data.needed} coin\n\n` +
                    `Coin satın almak ister misiniz?`
                );
                if (buyCoins) {
                    setShowCoinStore(true);
                }
            } else {
                toast.error(`❌ Hata: ${data.message || 'Bilinmeyen hata'}`);
            }
        } catch (error) {
            console.error('❌ [PURCHASE] Satın alma hatası:', error);
            toast.error('❌ Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            {showCoinStore && (
                <CoinStoreModal 
                    onClose={() => setShowCoinStore(false)}
                    currentCoins={premiumStatus?.coins || 0}
                    onPurchaseComplete={(newBalance) => {
                        // Bakiyeyi güncelle
                        setPremiumStatus(prev => prev ? {...prev, coins: newBalance} : null);
                        fetchPremiumStatus();
                    }}
                />
            )}
            
            <div style={styles.modal}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaCrown style={{ color: '#f0b232', marginRight: '10px' }} />
                        <h2 style={styles.title}>Premium Mağaza</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Coin Balance */}
                        <div style={{
                            background: 'linear-gradient(135deg, #f0b232 0%, #c79100 100%)',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        onClick={() => setShowCoinStore(true)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        title="Coin satın al"
                        >
                            <span style={{ fontSize: '18px' }}>💰</span>
                            <span style={{ 
                                fontWeight: 'bold', 
                                color: '#000',
                                fontSize: '14px'
                            }}>
                                {(premiumStatus?.coins || 0).toLocaleString()}
                            </span>
                        </div>
                        <button onClick={onClose} style={styles.closeButton}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div style={styles.tabs}>
                    <button
                        onClick={() => setActiveTab('premium')}
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'premium' && styles.activeTab)
                        }}
                    >
                        <FaCrown /> Premium
                    </button>
                    <button
                        onClick={() => setActiveTab('store')}
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'store' && styles.activeTab)
                        }}
                    >
                        <FaShoppingCart /> Mağaza
                    </button>
                    <button
                        onClick={() => setActiveTab('boost')}
                        style={{
                            ...styles.tab,
                            ...(activeTab === 'boost' && styles.activeTab)
                        }}
                    >
                        <FaRocket /> Server Boost
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {activeTab === 'premium' && (
                        <div style={styles.premiumTab}>
                            <h3 style={styles.sectionTitle}>Premium Üyelik Planları</h3>
                            <div style={styles.plansGrid}>
                                {/* Free Plan */}
                                <div style={styles.planCard}>
                                    <div style={styles.planHeader}>
                                        <h4 style={styles.planName}>Ücretsiz</h4>
                                        <div style={styles.planPrice}>
                                            <span style={styles.price}>0</span>
                                            <span style={styles.currency}>TL/ay</span>
                                        </div>
                                    </div>
                                    <div style={styles.featuresList}>
                                        <div style={styles.feature}>✅ 50 sunucu</div>
                                        <div style={styles.feature}>✅ 100 arkadaş</div>
                                        <div style={styles.feature}>✅ 8 MB dosya yükleme</div>
                                        <div style={styles.feature}>✅ 720p video</div>
                                        <div style={{ ...styles.feature, opacity: 0.5 }}>❌ Özel emoji</div>
                                        <div style={{ ...styles.feature, opacity: 0.5 }}>❌ Animated avatar</div>
                                    </div>
                                    <button style={styles.currentPlanButton} disabled>
                                        Mevcut Plan
                                    </button>
                                </div>

                                {/* Basic Plan */}
                                <div style={styles.planCard}>
                                    <div style={{ ...styles.planHeader, borderColor: premiumPlans.basic.color }}>
                                        <h4 style={styles.planName}>{premiumPlans.basic.name}</h4>
                                        <div style={styles.planPrice}>
                                            <span style={styles.price}>{premiumPlans.basic.price}</span>
                                            <span style={styles.currency}>TL/ay</span>
                                        </div>
                                    </div>
                                    <div style={styles.featuresList}>
                                        {premiumPlans.basic.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    ...styles.feature,
                                                    opacity: feature.included ? 1 : 0.5
                                                }}
                                            >
                                                {feature.included ? '✅' : '❌'} {feature.text}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handlePurchase(premiumPlans.basic, false)}
                                        style={{ ...styles.purchaseButton, backgroundColor: premiumPlans.basic.color }}
                                    >
                                        Satın Al (Aylık)
                                    </button>
                                    <button
                                        onClick={() => handlePurchase(premiumPlans.basic, true)}
                                        style={styles.yearlyButton}
                                    >
                                        Yıllık Al (%16 İndirim) - {premiumPlans.basic.priceYearly} TL
                                    </button>
                                </div>

                                {/* Premium Plan */}
                                <div style={{ ...styles.planCard, ...styles.popularCard }}>
                                    <div style={styles.popularBadge}>
                                        <FaStar /> EN POPÜLER
                                    </div>
                                    <div style={{ ...styles.planHeader, borderColor: premiumPlans.premium.color }}>
                                        <h4 style={styles.planName}>{premiumPlans.premium.name}</h4>
                                        <div style={styles.planPrice}>
                                            <span style={styles.price}>{premiumPlans.premium.price}</span>
                                            <span style={styles.currency}>TL/ay</span>
                                        </div>
                                    </div>
                                    <div style={styles.featuresList}>
                                        {premiumPlans.premium.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    ...styles.feature,
                                                    opacity: feature.included ? 1 : 0.5
                                                }}
                                            >
                                                {feature.included ? '✅' : '❌'} {feature.text}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handlePurchase(premiumPlans.premium, false)}
                                        style={{ ...styles.purchaseButton, backgroundColor: premiumPlans.premium.color }}
                                    >
                                        Satın Al (Aylık)
                                    </button>
                                    <button
                                        onClick={() => handlePurchase(premiumPlans.premium, true)}
                                        style={styles.yearlyButton}
                                    >
                                        Yıllık Al (%16 İndirim) - {premiumPlans.premium.priceYearly} TL
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'store' && (
                        <div style={styles.storeTab}>
                            <h3 style={styles.sectionTitle}>Mağaza Ürünleri</h3>
                            <div style={styles.storeGrid}>
                                {displayItems.map(item => {
                                    // 🔥 Ownership kontrolü: Envanterde var mı?
                                    // Backend'den gelen inventory item'larda item_details var
                                    const isOwned = userInventory.some(inv => 
                                        inv.item_details?.id === item.id || inv.item === item.id
                                    );
                                    
                                    return (
                                        <div key={item.id} style={{
                                            ...styles.storeItem,
                                            ...(isOwned && { opacity: 0.6, borderColor: '#43b581' })
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
                                                        backgroundColor: '#43b581',
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
                    )}

                    {activeTab === 'boost' && (
                        <div style={styles.boostTab}>
                            <h3 style={styles.sectionTitle}>Server Boosting</h3>
                            <p style={styles.boostDescription}>
                                Sevdiğin sunucuları güçlendir ve özel özellikler kazan!
                            </p>

                            <div style={styles.boostTiers}>
                                <div style={styles.boostTier}>
                                    <h4>🥉 Seviye 1</h4>
                                    <p>2 Boost gerekli</p>
                                    <ul>
                                        <li>100 emoji slot</li>
                                        <li>256 kbps ses kalitesi</li>
                                        <li>50 MB dosya yükleme</li>
                                        <li>Animated sunucu ikonu</li>
                                    </ul>
                                </div>

                                <div style={styles.boostTier}>
                                    <h4>🥈 Seviye 2</h4>
                                    <p>7 Boost gerekli</p>
                                    <ul>
                                        <li>150 emoji slot</li>
                                        <li>384 kbps ses kalitesi</li>
                                        <li>100 MB dosya yükleme</li>
                                        <li>1080p Go Live stream</li>
                                        <li>Özel davet linki</li>
                                    </ul>
                                </div>

                                <div style={styles.boostTier}>
                                    <h4>🥇 Seviye 3</h4>
                                    <p>14 Boost gerekli</p>
                                    <ul>
                                        <li>250 emoji slot</li>
                                        <li>384 kbps ses kalitesi</li>
                                        <li>500 MB dosya yükleme</li>
                                        <li>4K Go Live 60FPS</li>
                                        <li>Özel ses efektleri</li>
                                    </ul>
                                </div>
                            </div>

                            <button
                                onClick={() => alert('Server boost özelliği yakında!')}
                                style={styles.boostButton}
                            >
                                Boost Satın Al (19.99 TL/ay)
                            </button>
                        </div>
                    )}
                </div>
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
        zIndex: 10000,
        padding: '20px',
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
    },
    header: {
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '8px',
        transition: 'color 0.2s',
    },
    tabs: {
        display: 'flex',
        padding: '0 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        gap: '8px',
    },
    tab: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        padding: '12px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '2px solid transparent',
        transition: 'all 0.2s',
    },
    activeTab: {
        color: '#fff',
        borderBottomColor: '#5865f2',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: '20px',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    plansGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
    },
    planCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '12px',
        padding: '20px',
        border: '2px solid transparent',
        transition: 'all 0.3s',
        position: 'relative',
    },
    popularCard: {
        border: '2px solid #f0b232',
        transform: 'scale(1.05)',
    },
    popularBadge: {
        position: 'absolute',
        top: '-12px',
        right: '20px',
        backgroundColor: '#f0b232',
        color: '#000',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    planHeader: {
        borderBottom: '2px solid #5865f2',
        paddingBottom: '16px',
        marginBottom: '16px',
    },
    planName: {
        color: '#fff',
        fontSize: '18px',
        margin: '0 0 8px 0',
        fontWeight: 'bold',
    },
    planPrice: {
        display: 'flex',
        alignItems: 'baseline',
        gap: '4px',
    },
    price: {
        color: '#fff',
        fontSize: '32px',
        fontWeight: 'bold',
    },
    currency: {
        color: '#b9bbbe',
        fontSize: '14px',
    },
    featuresList: {
        marginBottom: '20px',
    },
    feature: {
        color: '#dcddde',
        fontSize: '14px',
        padding: '8px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    },
    purchaseButton: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: 'none',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        marginBottom: '8px',
        transition: 'transform 0.2s',
    },
    yearlyButton: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #5865f2',
        backgroundColor: 'transparent',
        color: '#5865f2',
        fontWeight: '600',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    currentPlanButton: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #4e5058',
        backgroundColor: 'transparent',
        color: '#4e5058',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'not-allowed',
    },
    storeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
    },
    storeItem: {
        backgroundColor: '#1e1f22',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s',
    },
    itemIcon: {
        fontSize: '48px',
        marginBottom: '12px',
    },
    itemName: {
        color: '#fff',
        fontSize: '16px',
        margin: '0 0 8px 0',
        fontWeight: 'bold',
    },
    itemDescription: {
        color: '#b9bbbe',
        fontSize: '13px',
        margin: '0 0 12px 0',
    },
    itemPrice: {
        color: '#f0b232',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '12px',
    },
    buyButton: {
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#5865f2',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    boostDescription: {
        color: '#b9bbbe',
        fontSize: '14px',
        marginBottom: '24px',
    },
    boostTiers: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
    },
    boostTier: {
        backgroundColor: '#1e1f22',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    boostButton: {
        width: '100%',
        maxWidth: '400px',
        padding: '16px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#f0b232',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '16px',
        cursor: 'pointer',
        display: 'block',
        margin: '0 auto',
    },
};

export default PremiumStoreModal;



