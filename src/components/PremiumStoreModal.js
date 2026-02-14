import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaCrown, FaShoppingCart, FaRocket } from 'react-icons/fa';
import { useAuth } from '../AuthContext';
import CoinStoreModal from './CoinStoreModal';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';
import styles from './PremiumStoreModal/styles';
import PremiumTab from './PremiumStoreModal/PremiumTab';
import StoreTab from './PremiumStoreModal/StoreTab';
import BoostTab from './PremiumStoreModal/BoostTab';

const PremiumStoreModal = ({ onClose }) => {
    const { user, token } = useAuth();
    const [activeTab, setActiveTab] = useState('premium');
    const [premiumStatus, setPremiumStatus] = useState(null);
    const [storeItems, setStoreItems] = useState([]);
    const [userInventory, setUserInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCoinStore, setShowCoinStore] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || getApiBase();

    useEffect(() => {
        fetchPremiumStatus();
        fetchStoreItems();
        fetchUserInventory();
    }, []);

    const fetchPremiumStatus = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/premium/status/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPremiumStatus(await response.json());
        } catch (error) {
            console.error('Premium status error:', error);
        }
    };

    const fetchStoreItems = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/store/items/`);
            setStoreItems(await response.json());
        } catch (error) {
            console.error('Store items error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserInventory = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/store/inventory/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setUserInventory(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Inventory error:', error);
            setUserInventory([]);
        }
    };

    const handlePurchase = async (plan, isYearly = false) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/premium/subscribe/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tier: plan.tier,
                    is_yearly: isYearly,
                    payment_method: 'test'
                })
            });
            const data = await response.json();
            if (data.success) {
                toast.success(`${plan.name} basariyla aktif edildi!`);
                await fetchPremiumStatus();
                onClose();
            } else {
                toast.error(`Hata: ${data.message}`);
            }
        } catch (error) {
            toast.error('Bir hata olustu. Lutfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const handleBuyItem = async (item) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/store/purchase/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_id: item.id, payment_method: 'test' })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(`${item.name} satin alindi!`);
                await fetchUserInventory();
            } else if (data.insufficient_coins) {
                const buyCoins = await confirmDialog(
                    `Yetersiz bakiye!\nGerekli: ${data.required} coin\nMevcut: ${data.current} coin\nCoin satin almak ister misiniz?`
                );
                if (buyCoins) setShowCoinStore(true);
            } else {
                toast.error(`Hata: ${data.message || 'Bilinmeyen hata'}`);
            }
        } catch (error) {
            toast.error('Bir hata olustu.');
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
                        setPremiumStatus(prev => prev ? { ...prev, coins: newBalance } : null);
                        fetchPremiumStatus();
                    }}
                />
            )}

            <div style={styles.modal}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaCrown style={{ color: '#f0b232', marginRight: '10px' }} />
                        <h2 style={styles.title}>Premium Magaza</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #f0b232 0%, #c79100 100%)',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                        }}
                            onClick={() => setShowCoinStore(true)}
                            title="Coin satin al"
                        >
                            <span style={{ fontSize: '18px' }}>💰</span>
                            <span style={{ fontWeight: 'bold', color: '#000', fontSize: '14px' }}>
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
                    <button onClick={() => setActiveTab('premium')} style={{ ...styles.tab, ...(activeTab === 'premium' && styles.activeTab) }}>
                        <FaCrown /> Premium
                    </button>
                    <button onClick={() => setActiveTab('store')} style={{ ...styles.tab, ...(activeTab === 'store' && styles.activeTab) }}>
                        <FaShoppingCart /> Magaza
                    </button>
                    <button onClick={() => setActiveTab('boost')} style={{ ...styles.tab, ...(activeTab === 'boost' && styles.activeTab) }}>
                        <FaRocket /> Server Boost
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {activeTab === 'premium' && <PremiumTab styles={styles} handlePurchase={handlePurchase} />}
                    {activeTab === 'store' && (
                        <StoreTab
                            styles={styles}
                            storeItems={storeItems}
                            userInventory={userInventory}
                            handleBuyItem={handleBuyItem}
                            loading={loading}
                        />
                    )}
                    {activeTab === 'boost' && (
                        <BoostTab
                            styles={styles}
                            loading={loading}
                            setLoading={setLoading}
                            token={token}
                            API_BASE_URL={API_BASE_URL}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PremiumStoreModal;