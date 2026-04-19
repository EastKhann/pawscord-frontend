// Accessibility (aria): N/A for this module (hook/context/utility — no rendered DOM)
// aria-label: n/a — hook/context/utility module, no directly rendered JSX
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import PropTypes from 'prop-types';
import logger from '../../utils/logger';

export const PACKAGES = [
    {
        id: 'p1',
        coins: 1000,
        price: '15 USDT',
        get note() {
            return i18n.t('ui.baslangic_paketi');
        },
    },
    {
        id: 'p2',
        coins: 2500,
        price: '35 USDT',
        get note() {
            return i18n.t('ui.popular_secim');
        },
    },
    {
        id: 'p3',
        coins: 6000,
        price: '75 USDT',
        get note() {
            return i18n.t('ui.en_iyi_deger');
        },
    },
    {
        id: 'p4',
        coins: 15000,
        price: '180 USDT',
        get note() {
            return i18n.t('ui.topluluk_paketi');
        },
    },
];

export const DEPOSIT_ADDRESSES = [
    { label: 'USDT (TRC20)', value: 'TGAny6VmDAWdVmTXCPrpsbLKKQQdvyvnWC' },
    { label: 'USDT (ERC20)', value: '0xeaa14d4651a8ea7488289209b9294a1309dde37c' },
    { label: 'SOL (Solana)', value: 'Bk6ywhae86fp6BHmGtxabS6ncEGsFxhcnZEWJRZLVr9z' },
];

const useCryptoStore = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('store');
    const [balance, setBalance] = useState(0);
    const [storeItems, setStoreItems] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dailyInfo, setDailyInfo] = useState(null);
    const [txid, setTxid] = useState('');
    const [txidResult, setTxidResult] = useState(null);
    const [selectedPack, setSelectedPack] = useState(PACKAGES[0]);

    const refreshData = () => {
        fetchWithAuth(`${apiBaseUrl}/store/balance/`)
            .then((r) => r.json())
            .then((d) => setBalance(d.coins));
        fetchWithAuth(`${apiBaseUrl}/store/items/`)
            .then((r) => r.json())
            .then((d) => setStoreItems(d));
        fetchWithAuth(`${apiBaseUrl}/store/inventory/`)
            .then((r) => r.json())
            .then((d) => setInventory(d));
    };

    useEffect(() => {
        refreshData();
    }, [apiBaseUrl, fetchWithAuth]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleDailyClaim = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/daily-reward/`, {
                method: 'POST',
            });
            let data = null;
            try {
                data = await res.json();
            } catch (_) {
                data = null;
            }
            if (res.ok && data) {
                const safe = {
                    claimed: !!data.claimed,
                    added_coins: typeof data.added_coins === 'number' ? data.added_coins : 0,
                    new_balance: typeof data.new_balance === 'number' ? data.new_balance : balance,
                    streak: typeof data.streak === 'number' ? data.streak : undefined,
                    reason: data.reason,
                    remaining_seconds:
                        typeof data.remaining_seconds === 'number'
                            ? data.remaining_seconds
                            : undefined,
                    error: data.error,
                };
                setDailyInfo(safe);
                if (safe.claimed && typeof safe.new_balance === 'number')
                    setBalance(safe.new_balance);
                refreshData();
            } else {
                const msg =
                    (data && (data.error || data.message || data.detail)) || 'Request failed';
                setDailyInfo({ claimed: false, error: msg });
            }
        } catch (e) {
            logger.error('[DailyReward] exception', e);
            setDailyInfo({ claimed: false, error: 'Unexpected error' });
        }
        setLoading(false);
    };

    const handleBuy = async (itemId) => {
        if (!(await confirmDialog(t('ui.bu_urunu_satin_almak_istiyor_musunuz')))) return;
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/purchase/`, {
                method: 'POST',
                body: JSON.stringify({ item_id: itemId }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                refreshData();
            } else {
                toast.error(data.error);
            }
        } catch (e) {
            toast.error('❌ Bir hata oluştu.');
        }
        setLoading(false);
    };

    const handleEquip = async (inventoryId) => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/equip/${inventoryId}/`, {
                method: 'POST',
            });
            if (res.ok) refreshData();
        } catch (e) {
            logger.error('Equip error:', e);
            toast.error(t('crypto.equipFailed'));
        }
        setLoading(false);
    };

    const handleVerifyTxid = async () => {
        const trimmed = txid.trim();
        if (!trimmed) {
            toast.error(t('crypto.txIdRequired'));
            return;
        }
        if (trimmed.length < 6) {
            setTxidResult({ success: false, message: 'Transaction ID seems too short' });
            return;
        }
        setLoading(true);
        setTxidResult(null);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/verify-txid/`, {
                method: 'POST',
                body: JSON.stringify({ txid: trimmed }),
            });
            const data = await res.json();
            if (res.ok) {
                setTxidResult({
                    success: true,
                    message: data.message || 'Payment confirmed!',
                    added_coins: data.added_coins,
                });
                refreshData();
                setTxid('');
            } else {
                setTxidResult({
                    success: false,
                    message: data.error || data.detail || t('common.verifyFailed'),
                });
            }
        } catch (e) {
            logger.error('[VerifyTXID] exception', e);
            setTxidResult({ success: false, message: 'Unexpected error' });
        }
        setLoading(false);
    };

    const handleCopyAddress = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
            toast.success(t('crypto.addressCopied') + ': ' + value);
        } catch (err) {
            toast.error(t('ui.copy_failed'));
        }
    };

    const handlePasteTxid = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) setTxid(text.trim());
        } catch (e) {
            logger.error('Clipboard read failed', e);
        }
    };

    return {
        activeTab,
        setActiveTab,
        balance,
        storeItems,
        inventory,
        loading,
        dailyInfo,
        txid,
        setTxid,
        txidResult,
        selectedPack,
        setSelectedPack,
        handleDailyClaim,
        handleBuy,
        handleEquip,
        handleVerifyTxid,
        handleCopyAddress,
        handlePasteTxid,
    };
};

export default useCryptoStore;

PACKAGES.propTypes = {
    fetchWithAuth: PropTypes.func.isRequired,
    apiBaseUrl: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
