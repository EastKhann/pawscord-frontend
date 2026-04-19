import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import { FaCoins, FaStar, FaCrown } from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import toast from '../../utils/toast';
import { getApiBase } from '../../utils/apiEndpoints';
import logger from '../../utils/logger';

const ICON_MAP = { '💰': FaCoins, '💎': GiSparkles, '👑': FaCrown, '🌟': FaStar };

export const getPackageIcon = (icon) => ICON_MAP[icon] || FaCoins;

export default function useCoinStore(onPurchaseComplete, onClose) {
    const { t } = useTranslation();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || getApiBase();
    const token = getToken();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/coins/packages/`);
                const data = await res.json();
                if (data.success) setPackages(data.packages);
            } catch (err) {
                logger.error('❌ Coin packages could not be loaded:', err);
            }
        })();
    }, []);

    const handlePurchase = async (pkg) => {
        setSelectedPackage(pkg.id);
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/coins/checkout/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ package_id: pkg.id, payment_method: 'stripe' }),
            });
            const data = await res.json();
            if (data.success) {
                if (data.test_mode) {
                    toast.success(t('coinStore.coinAdded', { balance: data.new_balance }), {
                        duration: 4000,
                    });
                    if (onPurchaseComplete) onPurchaseComplete(data.new_balance);
                    onClose();
                } else {
                    window.location.href = data.checkout_url;
                }
            }
        } catch (err) {
            logger.error('❌ Purchase error:', err);
            toast.error(t('coinStore.purchaseFailed'));
        } finally {
            setLoading(false);
            setSelectedPackage(null);
        }
    };

    return { packages, loading, selectedPackage, handlePurchase };
}
