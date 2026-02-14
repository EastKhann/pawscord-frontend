import { useState, useEffect } from 'react';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

export const PACKAGES = [
    { id: 'p1', coins: 1000, price: '15 USDT', note: 'Ba\u015Flang\u0131\u00E7 paketi' },
    { id: 'p2', coins: 2500, price: '35 USDT', note: 'Pop\u00FCler se\u00E7im' },
    { id: 'p3', coins: 6000, price: '75 USDT', note: 'En iyi de\u011Fer' },
    { id: 'p4', coins: 15000, price: '180 USDT', note: 'Topluluk paketi' }
];

export const DEPOSIT_ADDRESSES = [
    { label: 'USDT (TRC20)', value: 'TGAny6VmDAWdVmTXCPrpsbLKKQQdvyvnWC' },
    { label: 'USDT (ERC20)', value: '0xeaa14d4651a8ea7488289209b9294a1309dde37c' },
    { label: 'SOL (Solana)', value: 'Bk6ywhae86fp6BHmGtxabS6ncEGsFxhcnZEWJRZLVr9z' }
];

const useCryptoStore = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
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
        fetchWithAuth(`${apiBaseUrl}/store/balance/`).then(r => r.json()).then(d => setBalance(d.coins));
        fetchWithAuth(`${apiBaseUrl}/store/items/`).then(r => r.json()).then(d => setStoreItems(d));
        fetchWithAuth(`${apiBaseUrl}/store/inventory/`).then(r => r.json()).then(d => setInventory(d));
    };

    useEffect(() => { refreshData(); }, [apiBaseUrl, fetchWithAuth]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleDailyClaim = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/daily-reward/`, { method: 'POST' });
            let data = null;
            try { data = await res.json(); } catch (_) { data = null; }
            if (res.ok && data) {
                const safe = {
                    claimed: !!data.claimed,
                    added_coins: typeof data.added_coins === 'number' ? data.added_coins : 0,
                    new_balance: typeof data.new_balance === 'number' ? data.new_balance : balance,
                    streak: typeof data.streak === 'number' ? data.streak : undefined,
                    reason: data.reason,
                    remaining_seconds: typeof data.remaining_seconds === 'number' ? data.remaining_seconds : undefined,
                    error: data.error,
                };
                setDailyInfo(safe);
                if (safe.claimed && typeof safe.new_balance === 'number') setBalance(safe.new_balance);
                refreshData();
            } else {
                const msg = (data && (data.error || data.message || data.detail)) || '\u0130stek ba\u015Far\u0131s\u0131z';
                setDailyInfo({ claimed: false, error: msg });
            }
        } catch (e) {
            console.error('[DailyReward] exception', e);
            setDailyInfo({ claimed: false, error: 'Beklenmeyen hata' });
        }
        setLoading(false);
    };

    const handleBuy = async (itemId) => {
        if (!await confirmDialog("Bu \u00FCr\u00FCn\u00FC sat\u0131n almak istiyor musunuz?")) return;
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/buy/`, { method: 'POST', body: JSON.stringify({ item_id: itemId }) });
            const data = await res.json();
            if (res.ok) { toast.success(data.message); refreshData(); }
            else { toast.error(data.error); }
        } catch (e) { toast.error("\u274C Hata olu\u015Ftu."); }
        setLoading(false);
    };

    const handleEquip = async (inventoryId) => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/equip/${inventoryId}/`, { method: 'POST' });
            if (res.ok) refreshData();
        } catch (e) { console.error('Equip error:', e); toast.error('Item equip failed'); }
        setLoading(false);
    };

    const handleVerifyTxid = async () => {
        const trimmed = txid.trim();
        if (!trimmed) { toast.error('\u274C L\u00FCtfen i\u015Flem ID girin'); return; }
        if (trimmed.length < 6) { setTxidResult({ success: false, message: '\u0130\u015Flem ID \u00E7ok k\u0131sa g\u00F6r\u00FCn\u00FCyor' }); return; }
        setLoading(true); setTxidResult(null);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/verify-txid/`, { method: 'POST', body: JSON.stringify({ txid: trimmed }) });
            const data = await res.json();
            if (res.ok) {
                setTxidResult({ success: true, message: data.message || '\u00D6deme do\u011Fruland\u0131!', added_coins: data.added_coins });
                refreshData(); setTxid('');
            } else { setTxidResult({ success: false, message: data.error || data.detail || 'Do\u011Frulama ba\u015Far\u0131s\u0131z' }); }
        } catch (e) { console.error('[VerifyTXID] exception', e); setTxidResult({ success: false, message: 'Beklenmeyen hata' }); }
        setLoading(false);
    };

    const handleCopyAddress = async (value) => {
        try { await navigator.clipboard.writeText(value); toast.success('\u2705 Adres kopyaland\u0131: ' + value); }
        catch (err) { toast.error('\u274C Kopyalama ba\u015Far\u0131s\u0131z oldu'); }
    };

    const handlePasteTxid = async () => {
        try { const text = await navigator.clipboard.readText(); if (text) setTxid(text.trim()); }
        catch (e) { console.error('Clipboard read failed', e); }
    };

    return {
        activeTab, setActiveTab, balance, storeItems, inventory, loading,
        dailyInfo, txid, setTxid, txidResult, selectedPack, setSelectedPack,
        handleDailyClaim, handleBuy, handleEquip, handleVerifyTxid,
        handleCopyAddress, handlePasteTxid
    };
};

export default useCryptoStore;
