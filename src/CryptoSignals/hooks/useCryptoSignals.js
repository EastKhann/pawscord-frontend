// frontend/src/CryptoSignals/hooks/useCryptoSignals.js
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getApiBase } from '../../utils/apiEndpoints';
import { parsePnl } from '../utils';

const API_BASE = getApiBase();
const SIGNALS_URL = `${API_BASE}/api/crypto/signals/`;
const SIGNALS_LIST_URL = `${API_BASE}/api/crypto/signals/list/`;

const useCryptoSignals = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [availableFiles, setAvailableFiles] = useState([]);
    const [activeFileKey, setActiveFileKey] = useState('');
    const [activeMode, setActiveMode] = useState('balance_mode');
    const [activeTab, setActiveTab] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rank');
    const [sortDir, setSortDir] = useState('asc');
    const [viewMode, setViewMode] = useState('table');
    const [page, setPage] = useState(1);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const ITEMS_PER_PAGE = 50;

    const tableRef = useRef(null);
    const scrollRef = useRef(0);

    useEffect(() => { setPage(1); }, [activeTab, activeMode, searchQuery, activeFileKey]);

    // File list
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(SIGNALS_LIST_URL);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                const files = json.files || [];
                setAvailableFiles(files);
                if (files.length > 0) setActiveFileKey(files[0].key);
            } catch (err) {
                console.error('Signal list fetch error:', err);
                setError('Sinyal dosyaları yüklenemedi');
            }
        })();
    }, []);

    const fetchData = useCallback(async (fileKey) => {
        const key = fileKey || activeFileKey;
        if (!key) return;
        try {
            if (tableRef.current) scrollRef.current = tableRef.current.scrollTop;
            const res = await fetch(`${SIGNALS_URL}?t=${Date.now()}&file=${key}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            if (json.error) { setError(json.error); setLoading(false); return; }
            setData(json);
            setLastUpdate(new Date(json.meta?.export_time || Date.now()));
            setError(null);
            setTimeout(() => { if (tableRef.current && scrollRef.current > 0) tableRef.current.scrollTop = scrollRef.current; }, 50);
        } catch (err) {
            console.error('Signal fetch error:', err);
            if (!data) setError('Sunucuya bağlanılamadı: ' + err.message);
        } finally { setLoading(false); }
    }, [activeFileKey]);

    useEffect(() => {
        if (activeFileKey) { setLoading(true); setActiveTab(null); fetchData(activeFileKey); }
    }, [activeFileKey]);

    useEffect(() => {
        if (!autoRefresh || !activeFileKey) return;
        const iv = setInterval(() => fetchData(activeFileKey), 30000);
        return () => clearInterval(iv);
    }, [autoRefresh, fetchData, activeFileKey]);

    const meta = data?.meta || {};
    const positionCoins = meta.position_coins || [];
    const modeData = useMemo(() => data?.[activeMode] || null, [data, activeMode]);
    const allTabs = useMemo(() => modeData?.tabs || {}, [modeData]);
    const currentTab = useMemo(() => allTabs[activeTab] || null, [allTabs, activeTab]);
    const tabData = useMemo(() => currentTab?.data || [], [currentTab]);

    useEffect(() => {
        const tabKeys = Object.keys(allTabs);
        if (tabKeys.length > 0 && (!activeTab || !allTabs[activeTab])) setActiveTab(tabKeys[0]);
    }, [allTabs, activeTab]);

    const processedData = useMemo(() => {
        let items = [...tabData];
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toUpperCase();
            items = items.filter(item =>
                (item.coin?.toUpperCase().includes(q)) ||
                (item.timeframe?.toUpperCase().includes(q)) ||
                (item.signal?.toUpperCase().includes(q))
            );
        }
        items.sort((a, b) => {
            let valA, valB;
            switch (sortBy) {
                case 'coin': valA = a.coin || ''; valB = b.coin || '';
                    return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
                case 'pnl': valA = parsePnl(a.pnl_percent); valB = parsePnl(b.pnl_percent); break;
                case 'win_rate': valA = parseFloat(String(a.win_rate || '0').replace('%', '')); valB = parseFloat(String(b.win_rate || '0').replace('%', '')); break;
                case 'x_kat': valA = parseFloat(String(a.x_kat || '0').replace('x', '')); valB = parseFloat(String(b.x_kat || '0').replace('x', '')); break;
                case 'trades': valA = parseInt(a.trades || 0); valB = parseInt(b.trades || 0); break;
                default: valA = a.rank || 9999; valB = b.rank || 9999; break;
            }
            if (typeof valA === 'string') return 0;
            return sortDir === 'asc' ? valA - valB : valB - valA;
        });
        return items;
    }, [tabData, searchQuery, sortBy, sortDir]);

    const totalPages = Math.max(1, Math.ceil(processedData.length / ITEMS_PER_PAGE));
    const pagedData = processedData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
    const isPositionsTab = activeTab === 'ACIK_POZISYONLAR';

    const handleSort = (field) => {
        if (sortBy === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortBy(field); setSortDir(field === 'rank' ? 'asc' : 'desc'); }
    };

    const stats = useMemo(() => {
        if (!tabData.length) return null;
        const profits = tabData.filter(i => parsePnl(i.pnl_percent) > 0);
        const losses = tabData.filter(i => parsePnl(i.pnl_percent) < 0);
        const avgPnl = tabData.reduce((s, i) => s + parsePnl(i.pnl_percent), 0) / tabData.length;
        const avgWr = tabData.reduce((s, i) => s + parseFloat(String(i.win_rate || '0').replace('%', '')), 0) / tabData.length;
        const uniqueCoins = [...new Set(tabData.map(i => i.coin))];
        const tersSinyal = tabData.filter(i => i.ters_sinyal === true).length;
        const uyumluSinyal = tabData.filter(i => i.ters_sinyal !== true).length;
        return { profits: profits.length, losses: losses.length, avgPnl, avgWr, uniqueCoins: uniqueCoins.length, total: tabData.length, tersSinyal, uyumluSinyal };
    }, [tabData]);

    const positionCoinStatus = useMemo(() => {
        const statusMap = {};
        if (positionCoins.length > 0 && tabData.length > 0) {
            positionCoins.forEach(coin => {
                const rows = tabData.filter(r => r.coin === coin);
                statusMap[coin] = { hasTersSinyal: rows.some(r => r.ters_sinyal === true), rows };
            });
        }
        return statusMap;
    }, [positionCoins, tabData]);

    const coinGroups = useMemo(() => {
        const groups = {};
        processedData.forEach(row => {
            const coin = row.coin || 'UNKNOWN';
            if (!groups[coin]) groups[coin] = [];
            groups[coin].push(row);
        });
        return groups;
    }, [processedData]);

    return {
        data, loading, error, lastUpdate, availableFiles, activeFileKey, setActiveFileKey,
        activeMode, setActiveMode, activeTab, setActiveTab, searchQuery, setSearchQuery,
        sortBy, sortDir, viewMode, setViewMode, page, setPage, autoRefresh, setAutoRefresh,
        selectedCoin, setSelectedCoin, tableRef, meta, positionCoins, allTabs, currentTab,
        tabData, processedData, pagedData, totalPages, isPositionsTab, handleSort, stats,
        positionCoinStatus, coinGroups, fetchData, ITEMS_PER_PAGE
    };
};

export default useCryptoSignals;
