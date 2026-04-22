import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import { FaTimes, FaCrown, FaShoppingCart, FaRocket } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import CoinStoreModal from './CoinStoreModal';
import { getApiBase } from '../../utils/apiEndpoints';
import styles from '../PremiumStoreModal/styles';
import PremiumTab from '../PremiumStoreModal/PremiumTab';
import StoreTab from '../PremiumStoreModal/StoreTab';
import BoostTab from '../PremiumStoreModal/BoostTab';
import useModalA11y from '../../hooks/useModalA11y';
import logger from '../../utils/logger';

// Preview items shown when store API returns no items
const PREVIEW_ITEMS = [
    { id: 'p1', name: 'Neon Paw Badge', category: 'badges', price: 500, rarity: 'rare', featured: true, preview: true, icon: '🐾' },
    { id: 'p2', name: 'Galaxy Theme', category: 'cosmetics', price: 1200, rarity: 'epic', featured: true, preview: true, icon: '🌌' },
    { id: 'p3', name: 'Gold Crown', category: 'special', price: 2500, rarity: 'legendary', featured: false, preview: true, icon: '👑' },
    { id: 'p4', name: 'Retro Profile Frame', category: 'cosmetics', price: 800, rarity: 'uncommon', featured: false, preview: true, icon: '🖼️' },
    { id: 'p5', name: 'Rainbow Banner', category: 'cosmetics', price: 600, rarity: 'uncommon', featured: false, preview: true, icon: '🌈' },
    { id: 'p6', name: 'VIP Star Badge', category: 'badges', price: 1500, rarity: 'epic', featured: false, preview: true, icon: '⭐' },
    { id: 'p7', name: 'XP Booster Pack', category: 'boosters', price: 250, rarity: 'common', featured: false, preview: true, icon: '🚀' },
    { id: 'p8', name: 'Dark Matter Pack', category: 'special', price: 999, rarity: 'rare', featured: false, preview: true, icon: '🌑' },
];

const UI_STYLES = {
    balanceText: { fontWeight: 'bold', color: '#000', fontSize: '14px' },
    balanceBadge: {
        background: 'linear-gradient(135deg, #f0b232 0%, #c79100 100%)',
        padding: '8px 16px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
    },
    crownIcon: { color: '#f0b232', marginRight: '10px' },
};

const PremiumStoreModal = ({ onClose }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        label: t('premium.premiumStore'),
    });
    const { token } = useAuth();
    const [activeTab, setActiveTab] = useState('premium');
    const [premiumStatus, setPremiumStatus] = useState(null);
    const [storeItems, setStoreItems] = useState([]);
    const [userInventory, setUserInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCoinStore, setShowCoinStore] = useState(false);
    const tabStyles = {
        premium: { ...styles.tab, ...(activeTab === 'premium' ? styles.activeTab : {}) },
        store: { ...styles.tab, ...(activeTab === 'store' ? styles.activeTab : {}) },
        boost: { ...styles.tab, ...(activeTab === 'boost' ? styles.activeTab : {}) },
    };

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || getApiBase();

    useEffect(() => {
        fetchPremiumStatus();
        fetchStoreItems();
        fetchUserInventory();
    }, []);

    const fetchPremiumStatus = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/premium/status/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPremiumStatus(await response.json());
        } catch (error) {
            logger.error('Premium status error:', error);
        }
    };

    const fetchStoreItems = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/store/items/`);
            const data = await response.json();
            const apiItems = data.items || [];
            setStoreItems(apiItems.length > 0 ? apiItems : PREVIEW_ITEMS);
        } catch (error) {
            logger.error('Store items error:', error);
            setStoreItems(PREVIEW_ITEMS);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserInventory = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/store/inventory/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setUserInventory(Array.isArray(data) ? data : []);
        } catch (error) {
            logger.error('Inventory error:', error);
            setUserInventory([]);
        }
    };

    const handlePurchase = async (plan, isYearly = false) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/premium/subscribe/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tier: plan.tier,
                    is_yearly: isYearly,
                    payment_method: 'test',
                }),
            });
            const data = await response.json();

            if (data.success) {
                toast.success(t('premium.planActivated', { name: plan.name }));
                await fetchPremiumStatus();
                onClose();
            } else {
                toast.error(data.message || t('common.unknownError'));
            }
        } catch (error) {
            toast.error(t('errors.generic_retry'));
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
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: item.id, payment_method: 'test' }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(t('store.purchased', { name: item.name }));
                await fetchUserInventory();
            } else if (data.insufficient_coins) {
                setShowCoinStore(true);
            } else {
                toast.error(data.message || t('common.unknownError'));
            }
        } catch (error) {
            toast.error(t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} {...overlayProps}>
            {showCoinStore && (
                <CoinStoreModal
                    onClose={() => setShowCoinStore(false)}
                    currentCoins={premiumStatus?.coins || 0}
                    onPurchaseComplete={(newBalance) => {
                        setPremiumStatus((prev) => (prev ? { ...prev, coins: newBalance } : null));
                        fetchPremiumStatus();
                    }}
                />
            )}

            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaCrown style={UI_STYLES.crownIcon} />
                        <h2 style={styles.title}>{t('premiumStore.title', 'Premium Store')}</h2>
                    </div>
                    <div className="flex-align-12">
                        <div
                            style={UI_STYLES.balanceBadge}
                            role="button"
                            tabIndex={0}
                            onClick={() => setShowCoinStore(true)}
                            title={t('premium.buyCoins')}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <span className="fs-18">💰</span>
                            <span style={UI_STYLES.balanceText}>
                                {(premiumStatus?.coins || 0).toLocaleString()}
                            </span>
                        </div>
                        <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div style={styles.tabs}>
                    <button
                        aria-label={t('premium.premium')}
                        onClick={() => setActiveTab('premium')}
                        style={tabStyles.premium}
                    >
                        <FaCrown /> {t('premium.premium')}
                    </button>
                    <button
                        aria-label={t('premium.store')}
                        onClick={() => setActiveTab('store')}
                        style={tabStyles.store}
                    >
                        <FaShoppingCart /> {t('premium.store')}
                    </button>
                    <button
                        aria-label={t('premium.serverBoost')}
                        onClick={() => setActiveTab('boost')}
                        style={tabStyles.boost}
                    >
                        <FaRocket /> {t('premium.serverBoost')}
                    </button>
                </div>

                <div style={styles.content}>
                    {activeTab === 'premium' && (
                        <PremiumTab styles={styles} handlePurchase={handlePurchase} />
                    )}
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

PremiumStoreModal.propTypes = {
    onClose: PropTypes.func,
};

export default PremiumStoreModal;
