import { useState, useEffect } from 'react';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

const useStoreAPI = ({ fetchWithAuth, apiBaseUrl }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    const loadStoreItems = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/store/items/`);
            const data = await response.json();
            setItems(data.items || []);
        } catch (error) {
            console.error('Failed to load store items:', error);
            toast.error('Failed to load store');
        } finally { setLoading(false); }
    };

    const loadBalance = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/balance/`);
            const data = await response.json();
            setBalance(data.balance || 0);
        } catch (error) { console.error('Failed to load balance:', error); }
    };

    const handlePurchase = async (item) => {
        if (balance < item.price) { toast.error('Insufficient coins!'); return; }
        if (!await confirmDialog(`Purchase ${item.name} for ${item.price} coins?`)) return;
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/store/buy/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_id: item.id })
            });
            const data = await response.json();
            if (data.success) { toast.success(`Successfully purchased ${item.name}!`); loadBalance(); setSelectedItem(null); }
            else { toast.error(data.error || 'Purchase failed'); }
        } catch (error) { console.error('Purchase error:', error); toast.error('Purchase failed'); }
    };

    useEffect(() => { loadStoreItems(); loadBalance(); }, []);

    const filteredItems = selectedCategory === 'all' ? items : items.filter(item => item.category === selectedCategory);
    const featuredItems = items.filter(item => item.featured);

    return {
        items, loading, balance, selectedCategory, setSelectedCategory,
        selectedItem, setSelectedItem, filteredItems, featuredItems, handlePurchase
    };
};

export default useStoreAPI;
