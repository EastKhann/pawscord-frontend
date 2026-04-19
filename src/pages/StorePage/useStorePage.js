import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import { useAuth } from '../../AuthContext';
import { getApiBase } from '../../utils/apiEndpoints';
import logger from '../../utils/logger';

export const CATEGORIES = [
    { id: 'frames', name: '🖼️ Frames', icon: '🖼️' },
    { id: 'badges', name: '🏆 Rozetler', icon: '🏆' },
    { id: 'banners', name: '🎨 Banner', icon: '🎨' },
    { id: 'emojis', name: '😎 Emoji', icon: '😎' },
    { id: 'voices', name: '🎙️ Ses Efekti', icon: '🎙️' },
    { id: 'themes', name: '🌈 Tema', icon: '🌈' },
];

const RARITY_COLORS = {
    common: '#FFFFFF',
    rare: '#5865F2',
    epic: '#9B59B6',
    legendary: '#F1C40F',
    unique: '#E74C3C',
};

export const getRarityColor = (rarity) => RARITY_COLORS[rarity] || '#FFFFFF';

const useStorePage = () => {
    const { t } = useTranslation();
    const { token } = useAuth();
    const [activeCategory, setActiveCategory] = useState('frames');
    const [items, setItems] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [userCoins, setUserCoins] = useState(0);
    const [premiumTier, setPremiumTier] = useState('free');
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || getApiBase().replace('/api', '');

    useEffect(() => {
        fetchItems();
        if (token) {
            fetchUserData();
            fetchInventory();
        }
    }, [activeCategory, token]);

    const fetchUserData = async () => {
        if (!token) return;
        try {
            const r = await fetch(`${API_URL}/api/users/balance/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!r.ok) return;
            const d = await r.json();
            setUserCoins(d.coins ?? d.balance ?? 0);
            setPremiumTier(d.premium_tier || 'free');
        } catch (e) {
            logger.error('Error fetching user data:', e);
        }
    };

    const fetchItems = async () => {
        setLoading(true);
        try {
            const r = await fetch(`${API_URL}/api/store/items/?category=${activeCategory}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!r.ok) {
                setItems([]);
                setLoading(false);
                return;
            }
            const d = await r.json();
            setItems(Array.isArray(d.results) ? d.results : Array.isArray(d) ? d : []);
        } catch (e) {
            logger.error('Error fetching items:', e);
        }
        setLoading(false);
    };

    const fetchInventory = async () => {
        if (!token) return;
        try {
            const r = await fetch(`${API_URL}/api/store/inventory/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!r.ok) return;
            const d = await r.json();
            setInventory(d.results || d);
        } catch (e) {
            logger.error('Error fetching inventory:', e);
        }
    };

    const handlePurchase = async (item) => {
        if (userCoins < item.price) {
            toast.error(
                t(
                    'store.insufficientCoins',
                    '❌ Yetersiz coin! {{required}} coin gerekli, {{available}} coin mevcut.',
                    { required: item.price, available: userCoins }
                )
            );
            return;
        }
        if (item.premium_required && premiumTier === 'free') {
            toast.error(
                t('store.membershipRequired', '❌ {{tier}} üyelik gerekli!', {
                    tier: item.premium_required,
                })
            );
            return;
        }
        try {
            const r = await fetch(`${API_URL}/api/store/purchase/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_id: item.id }),
            });
            const d = await r.json();
            if (r.ok) {
                toast.success(
                    t('store.purchaseSuccess', '✅ {{name}} satın alındı!', { name: item.name })
                );
                setUserCoins(d.coins_remaining);
                fetchInventory();
                setSelectedItem(null);
            } else toast.error(d.error || t('store.purchaseFailed', 'Satın alma başarısız'));
        } catch (e) {
            logger.error('Purchase error:', e);
            toast.error(t('common.error', '❌ Bir hata oluştu'));
        }
    };

    const isOwned = (itemId) => inventory.some((inv) => inv.item.item_id === itemId);

    return {
        activeCategory,
        setActiveCategory,
        items,
        userCoins,
        premiumTier,
        loading,
        selectedItem,
        setSelectedItem,
        handlePurchase,
        isOwned,
    };
};

export default useStorePage;
