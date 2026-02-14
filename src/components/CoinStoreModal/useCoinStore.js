import { useState, useEffect } from 'react';
import { FaCoins, FaStar, FaCrown } from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import toast from '../../utils/toast';
import { getApiBase } from '../../utils/apiEndpoints';

const ICON_MAP = { '💰': FaCoins, '💎': GiSparkles, '👑': FaCrown, '🌟': FaStar };

export const getPackageIcon = (icon) => ICON_MAP[icon] || FaCoins;

export default function useCoinStore(onPurchaseComplete, onClose) {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || getApiBase();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/coins/packages/`);
                const data = await res.json();
                if (data.success) setPackages(data.packages);
            } catch (err) {
                console.error('❌ Coin paketleri yüklenemedi:', err);
            }
        })();
    }, []);

    const handlePurchase = async (pkg) => {
        setSelectedPackage(pkg.id);
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/coins/checkout/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ package_id: pkg.id, payment_method: 'stripe' })
            });
            const data = await res.json();
            if (data.success) {
                if (data.test_mode) {
                    toast.success(`✅ ${pkg.coins + (pkg.bonus || 0)} coin eklendi!\n\nYeni bakiye: ${data.new_balance} coin`, { duration: 4000 });
                    if (onPurchaseComplete) onPurchaseComplete(data.new_balance);
                    onClose();
                } else {
                    window.location.href = data.checkout_url;
                }
            }
        } catch (err) {
            console.error('❌ Satın alma hatası:', err);
            toast.error('Satın alma başarısız oldu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
            setSelectedPackage(null);
        }
    };

    return { packages, loading, selectedPackage, handlePurchase };
}
