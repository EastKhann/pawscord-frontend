import { useState, useEffect } from 'react';
import toast from '../../utils/toast';
import { useAuth } from '../../AuthContext';
import { getApiBase } from '../../utils/apiEndpoints';

export const CATEGORIES = [
  { id: 'frames', name: '🖼️ Çerçeveler', icon: '🖼️' },
  { id: 'badges', name: '🏆 Rozetler', icon: '🏆' },
  { id: 'banners', name: '🎨 Banner', icon: '🎨' },
  { id: 'emojis', name: '😎 Emoji', icon: '😎' },
  { id: 'voices', name: '🎙️ Ses Efekti', icon: '🎙️' },
  { id: 'themes', name: '🌈 Tema', icon: '🌈' }
];

const RARITY_COLORS = { common: '#FFFFFF', rare: '#5865F2', epic: '#9B59B6', legendary: '#F1C40F', unique: '#E74C3C' };

export const getRarityColor = (rarity) => RARITY_COLORS[rarity] || '#FFFFFF';

const useStorePage = () => {
  const { token } = useAuth();
  const [activeCategory, setActiveCategory] = useState('frames');
  const [items, setItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [userCoins, setUserCoins] = useState(0);
  const [premiumTier, setPremiumTier] = useState('free');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || getApiBase().replace('/api', '');

  useEffect(() => { fetchUserData(); fetchItems(); fetchInventory(); }, [activeCategory]);

  const fetchUserData = async () => {
    try {
      const r = await fetch(`${API_URL}/api/store/coins/balance/`, { headers: { 'Authorization': `Bearer ${token}` } });
      const d = await r.json(); setUserCoins(d.coins); setPremiumTier(d.premium_tier);
    } catch (e) { console.error('Error fetching user data:', e); }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_URL}/api/store/items/?category=${activeCategory}`, { headers: { 'Authorization': `Bearer ${token}` } });
      const d = await r.json(); setItems(d.results || d);
    } catch (e) { console.error('Error fetching items:', e); }
    setLoading(false);
  };

  const fetchInventory = async () => {
    try {
      const r = await fetch(`${API_URL}/api/store/inventory/`, { headers: { 'Authorization': `Bearer ${token}` } });
      const d = await r.json(); setInventory(d.results || d);
    } catch (e) { console.error('Error fetching inventory:', e); }
  };

  const handlePurchase = async (item) => {
    if (userCoins < item.price) { toast.error(`❌ Yetersiz coin! ${item.price} coin gerekli, ${userCoins} coin var.`); return; }
    if (item.premium_required && premiumTier === 'free') { toast.error(`❌ ${item.premium_required} üyelik gerekli!`); return; }
    try {
      const r = await fetch(`${API_URL}/api/store/items/${item.id}/purchase/`, {
        method: 'POST', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      const d = await r.json();
      if (r.ok) { toast.success(`✅ ${item.name} satın alındı!`); setUserCoins(d.coins_remaining); fetchInventory(); setSelectedItem(null); }
      else toast.error(`❌ ${d.error || 'Satın alma başarısız'}`);
    } catch (e) { console.error('Purchase error:', e); toast.error('❌ Bir hata oluştu'); }
  };

  const isOwned = (itemId) => inventory.some(inv => inv.item.item_id === itemId);

  return {
    activeCategory, setActiveCategory, items, userCoins, premiumTier, loading,
    selectedItem, setSelectedItem, handlePurchase, isOwned
  };
};

export default useStorePage;
