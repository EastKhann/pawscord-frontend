import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';
import { STORE_PURCHASES_ENABLED } from '../../constants/featureFlags';

// Preview items shown when store is in "Coming Soon" mode
const PREVIEW_ITEMS = [
    { id: 'p1', name: 'Neon Paw Badge', category: 'badges', price: 500, rarity: 'rare', featured: true, preview: true, emoji: '🐾' },
    { id: 'p2', name: 'Galaxy Theme', category: 'themes', price: 1200, rarity: 'epic', featured: true, preview: true, emoji: '🌌' },
    { id: 'p3', name: 'Gold Crown', category: 'accessories', price: 2500, rarity: 'legendary', featured: false, preview: true, emoji: '👑' },
    { id: 'p4', name: 'Retro Profile Frame', category: 'accessories', price: 800, rarity: 'uncommon', featured: false, preview: true, emoji: '🖼️' },
    { id: 'p5', name: 'Rainbow Banner', category: 'themes', price: 600, rarity: 'uncommon', featured: false, preview: true, emoji: '🌈' },
    { id: 'p6', name: 'VIP Star Badge', category: 'badges', price: 1500, rarity: 'epic', featured: false, preview: true, emoji: '⭐' },
    { id: 'p7', name: 'Pixel Cat Sticker', category: 'stickers', price: 250, rarity: 'common', featured: false, preview: true, emoji: '🐱' },
    { id: 'p8', name: 'Dark Matter Pack', category: 'stickers', price: 999, rarity: 'rare', featured: false, preview: true, emoji: '🌑' },
];

const useStoreAPI = ({ fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    const loadStoreItems = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/store/items/`);
            if (!response.ok) {
                // Show preview items when store API unavailable or purchases disabled
                if (!STORE_PURCHASES_ENABLED) setItems(PREVIEW_ITEMS);
                else setItems([]);
                return;
            }
            const data = await response.json();
            const apiItems = data.items || [];
            // If API returns no items and store is in preview mode, show previews
            setItems(apiItems.length === 0 && !STORE_PURCHASES_ENABLED ? PREVIEW_ITEMS : apiItems);
        } catch (error) {
            logger.error('Failed to load store items:', error);
            if (!STORE_PURCHASES_ENABLED) setItems(PREVIEW_ITEMS);
        } finally {
            setLoading(false);
        }
    };

    const loadBalance = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/balance/`);
            if (!response.ok) return;
            const data = await response.json();
            setBalance(data.balance || 0);
        } catch (error) {
            logger.error('Failed to load balance:', error);
        }
    };

    const handlePurchase = async (item) => {
        if (balance < item.price) {
            toast.error(t('storeAPI.insufficientCoins'));
            return;
        }
        if (!(await confirmDialog(`Purchase ${item.name} for ${item.price} coins?`))) return;
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/store/purchase/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_id: item.id }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(t('store.purchased', { name: item.name }));
                loadBalance();
                setSelectedItem(null);
            } else {
                toast.error(data.error || t('storeAPI.purchaseFailed'));
            }
        } catch (error) {
            logger.error('Purchase error:', error);
            toast.error(t('storeAPI.purchaseFailed'));
        }
    };

    useEffect(() => {
        loadStoreItems();
        loadBalance();
    }, []);

    const filteredItems =
        selectedCategory === 'all'
            ? items
            : items.filter((item) => item.category === selectedCategory);
    const featuredItems = items.filter((item) => item.featured);

    return {
        items,
        loading,
        balance,
        selectedCategory,
        setSelectedCategory,
        selectedItem,
        setSelectedItem,
        filteredItems,
        featuredItems,
        handlePurchase,
    };
};

export default useStoreAPI;
