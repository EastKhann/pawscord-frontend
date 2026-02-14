import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useAuth } from '../../AuthContext';
import toast from '../../utils/toast';
import { getApiBase, getMediaBase } from '../../utils/apiEndpoints';
import useWindowWidth from '../../hooks/useWindowWidth';

const API_BASE = getApiBase();
const MEDIA_BASE = getMediaBase();
const SIGNALS_URL = `${API_BASE}/api/crypto/signals/`;

const useCryptoData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [debugInfo, setDebugInfo] = useState("");

    const [activeMode, setActiveMode] = useState('balance_mode');
    const [activeTab, setActiveTab] = useState('TUM_STRATEJILER');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rank');
    const [sortDir, setSortDir] = useState('asc');
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 50;

    const [showPortfolio, setShowPortfolio] = useState(false);
    const [tradeData, setTradeData] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [prices, setPrices] = useState({});

    const dataRef = useRef(data);
    const { token } = useAuth();
    const { isMobile } = useWindowWidth();

    useEffect(() => { dataRef.current = data; }, [data]);
    useEffect(() => { setPage(1); }, [activeTab, activeMode, searchQuery]);

    const fetchData = useCallback(async () => {
        if (!dataRef.current) setLoading(true);
        setErrorMsg(null);
        try {
            const response = await fetch(SIGNALS_URL);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const result = await response.json();
            if (result.error) { setErrorMsg(result.error); setLoading(false); return; }
            setData(result);
        } catch (error) {
            console.error("Fetch Hatası:", error);
            if (!dataRef.current) setErrorMsg("Sunucuya bağlanılamadı: " + error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPortfolio = useCallback(async () => {
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/portfolio/my/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setPortfolio(await res.json());
        } catch (e) { console.debug('[CryptoDashboard] Portfolio fetch skipped:', e.message); }
    }, [token]);

    const fetchPricesFromLocal = useCallback(async () => {
        try {
            const url = `${MEDIA_BASE}/crypto_prices.json?t=${Date.now()}`;
            const res = await fetch(url);
            if (res.ok) setPrices(await res.json());
        } catch (e) { console.error("Fiyat Okuma Hatası:", e); }
    }, []);

    useEffect(() => {
        fetchData();
        fetchPortfolio();
        fetchPricesFromLocal();
        const priceInterval = setInterval(fetchPricesFromLocal, 1500);
        const dataInterval = setInterval(fetchData, 10000);
        return () => { clearInterval(priceInterval); clearInterval(dataInterval); };
    }, [token, fetchData, fetchPortfolio, fetchPricesFromLocal]);

    const extractCoinSymbol = (rawName) => {
        if (!rawName) return null;
        const upper = rawName.toUpperCase();
        const match = upper.match(/([A-Z0-9]+USDT)/);
        return match ? match[0] : upper.replace(/[^A-Z0-9]/g, '');
    };

    const getLivePrice = (coin) => {
        const symbol = extractCoinSymbol(coin);
        if (symbol && prices[symbol]) return prices[symbol];
        const short = symbol?.replace('USDT', '');
        if (short && prices[short]) return prices[short];
        return null;
    };

    const handleTrade = async (action, symbol, amount, price) => {
        if (!token) return toast.error("❌ Giriş yapmalısınız!");
        let finalSymbol = symbol.toUpperCase();
        if (!finalSymbol.endsWith('USDT')) finalSymbol += 'USDT';
        try {
            const res = await fetch(`${API_BASE}/portfolio/trade/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ symbol: finalSymbol, action, amount, price })
            });
            const resData = await res.json();
            if (res.ok) {
                toast.success('✅ İşlem Başarılı!');
                setPortfolio(resData);
                setTradeData(null);
            } else { toast.error(`❌ Hata: ${resData.error}`); }
        } catch (e) { toast.error("❌ Sunucu hatası."); }
    };

    const modeData = useMemo(() => {
        if (!data || !data[activeMode]) return null;
        return data[activeMode];
    }, [data, activeMode]);

    const tabData = useMemo(() => {
        if (!modeData || !modeData.tabs || !modeData.tabs[activeTab]) return [];
        return modeData.tabs[activeTab].data || [];
    }, [modeData, activeTab]);

    const tabInfo = useMemo(() => {
        if (!modeData || !modeData.tabs || !modeData.tabs[activeTab]) return null;
        return modeData.tabs[activeTab];
    }, [modeData, activeTab]);

    const processedData = useMemo(() => {
        let items = [...tabData];
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toUpperCase();
            items = items.filter(item =>
                (item.coin && item.coin.toUpperCase().includes(q)) ||
                (item.timeframe && item.timeframe.toUpperCase().includes(q)) ||
                (item.signal && item.signal.toUpperCase().includes(q))
            );
        }
        items.sort((a, b) => {
            let valA, valB;
            switch (sortBy) {
                case 'rank': valA = a.rank || 9999; valB = b.rank || 9999; break;
                case 'coin':
                    valA = a.coin || ''; valB = b.coin || '';
                    return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
                case 'pnl':
                    valA = parseFloat(String(a.pnl_percent || '0').replace('%', '').replace('+', ''));
                    valB = parseFloat(String(b.pnl_percent || '0').replace('%', '').replace('+', '')); break;
                case 'win_rate':
                    valA = parseFloat(String(a.win_rate || '0').replace('%', ''));
                    valB = parseFloat(String(b.win_rate || '0').replace('%', '')); break;
                case 'x_kat':
                    valA = parseFloat(String(a.x_kat || '0').replace('x', ''));
                    valB = parseFloat(String(b.x_kat || '0').replace('x', '')); break;
                case 'trades': valA = parseInt(a.trades || 0); valB = parseInt(b.trades || 0); break;
                default: valA = a.rank || 9999; valB = b.rank || 9999;
            }
            return sortDir === 'asc' ? valA - valB : valB - valA;
        });
        return items;
    }, [tabData, searchQuery, sortBy, sortDir]);

    const totalPages = Math.max(1, Math.ceil(processedData.length / ITEMS_PER_PAGE));
    const pagedData = processedData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
    const isPositionsTab = activeTab === 'ACIK_POZISYONLAR';
    const meta = data?.meta || {};
    const positionCoins = meta.position_coins || [];

    const positionCoinStatus = useMemo(() => {
        const statusMap = {};
        if (positionCoins.length > 0 && processedData.length > 0) {
            positionCoins.forEach(coin => {
                const rows = processedData.filter(r => r.coin === coin);
                const hasTersSinyal = rows.some(r => r.ters_sinyal === true);
                statusMap[coin] = { hasTersSinyal, rows };
            });
        }
        return statusMap;
    }, [positionCoins, processedData]);

    const handleSort = (field) => {
        if (sortBy === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortBy(field); setSortDir(field === 'rank' ? 'asc' : 'desc'); }
    };

    return {
        data, loading, errorMsg, debugInfo,
        activeMode, setActiveMode,
        activeTab, setActiveTab,
        searchQuery, setSearchQuery,
        sortBy, sortDir, handleSort,
        page, setPage,
        showPortfolio, setShowPortfolio,
        tradeData, setTradeData,
        portfolio, prices,
        fetchData, handleTrade,
        modeData, tabInfo, processedData, pagedData,
        totalPages, isPositionsTab,
        meta, positionCoins, positionCoinStatus,
        extractCoinSymbol, getLivePrice,
        isMobile,
    };
};

export default useCryptoData;
