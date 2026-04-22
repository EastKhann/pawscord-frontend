// frontend/src/CryptoSignals/hooks/useCryptoSignals.js
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getApiBase } from '../../utils/apiEndpoints';
import { parsePnl } from '../utils';
import logger from '../../utils/logger';

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

    useEffect(() => {
        setPage(1);
    }, [activeTab, activeMode, searchQuery, activeFileKey]);

    // File list
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(SIGNALS_LIST_URL);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                const files = json.files || [];
                setAvailableFiles(files);
                if (files.length > 0) {
                    setActiveFileKey(files[0].key);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                logger.error('Signal list fetch error:', err);
                setError('Failed to load signal files');
                setLoading(false);
            }
        })();
    }, []);

    const fetchData = useCallback(
        async (fileKey) => {
            const key = fileKey || activeFileKey;
            if (!key) return;
            try {
                if (tableRef.current) scrollRef.current = tableRef.current.scrollTop;
                const res = await fetch(
                    `${SIGNALS_URL}?t=${Date.now()}&file=${encodeURIComponent(key)}`
                );
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                if (json.error) {
                    setError(json.error);
                    setLoading(false);
                    return;
                }
                setData(json);
                setLastUpdate(new Date(json.meta?.export_time || Date.now()));
                setError(null);
                setTimeout(() => {
                    if (tableRef.current && scrollRef.current > 0)
                        tableRef.current.scrollTop = scrollRef.current;
                }, 50);
            } catch (err) {
                logger.error('Signal fetch error:', err);
                if (!data) setError('Could not connect to server: ' + err.message);
            } finally {
                setLoading(false);
            }
        },
        [activeFileKey]
    );

    useEffect(() => {
        if (activeFileKey) {
            setLoading(true);
            setActiveTab(null);
            fetchData(activeFileKey);
        }
    }, [activeFileKey]);

    useEffect(() => {
        if (!autoRefresh || !activeFileKey) return;
        const iv = setInterval(() => fetchData(activeFileKey), 30000);
        return () => clearInterval(iv);
    }, [autoRefresh, fetchData, activeFileKey]);

    const meta = data?.meta || {};
    const positionCoins = meta.position_coins || [];
    const isBL = !!(meta.version && meta.version.includes('BL'));
    const modeData = useMemo(() => {
        if (!data) return null;
        if (isBL) return { tabs: data.tabs || {} };
        return data[activeMode] || null;
    }, [data, activeMode, isBL]);
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
            items = items.filter(
                (item) =>
                    item.coin?.toUpperCase().includes(q) ||
                    item.symbol?.toUpperCase().includes(q) ||
                    item.timeframe?.toUpperCase().includes(q) ||
                    item.signal?.toUpperCase().includes(q)
            );
        }
        items.sort((a, b) => {
            let valA, valB;
            switch (sortBy) {
                case 'coin':
                    valA = a.coin || a.symbol || '';
                    valB = b.coin || b.symbol || '';
                    return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
                case 'pnl':
                    valA = parsePnl(a.pnl_percent);
                    valB = parsePnl(b.pnl_percent);
                    break;
                case 'avantaj_pct':
                    valA = parseFloat(a.avantaj_pct || 0);
                    valB = parseFloat(b.avantaj_pct || 0);
                    break;
                case 'bl_pct':
                    valA = parseFloat(a.bl_pct || 0);
                    valB = parseFloat(b.bl_pct || 0);
                    break;
                case 'balance':
                    valA = parseFloat(a.balance || 0);
                    valB = parseFloat(b.balance || 0);
                    break;
                case 'bl_days':
                    valA = parseInt(a.bl_days || 0);
                    valB = parseInt(b.bl_days || 0);
                    break;
                case 'days_ago':
                    valA = parseInt(a.days_ago ?? 9999);
                    valB = parseInt(b.days_ago ?? 9999);
                    break;
                case 'win_rate':
                    valA = parseFloat(String(a.win_rate || '0').replace('%', ''));
                    valB = parseFloat(String(b.win_rate || '0').replace('%', ''));
                    break;
                case 'x_kat':
                    valA = parseFloat(String(a.x_kat || '0').replace('x', ''));
                    valB = parseFloat(String(b.x_kat || '0').replace('x', ''));
                    break;
                case 'trades':
                    valA = parseInt(a.trades || 0);
                    valB = parseInt(b.trades || 0);
                    break;
                default:
                    valA = a.rank || 9999;
                    valB = b.rank || 9999;
                    break;
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
        if (sortBy === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        else {
            setSortBy(field);
            setSortDir(field === 'rank' ? 'asc' : 'desc');
        }
    };

    const stats = useMemo(() => {
        if (!tabData.length) return null;
        const hasBLFields = tabData[0]?.avantaj_pct !== undefined;
        if (hasBLFields) {
            const profitable = tabData.filter((i) => parseFloat(i.avantaj_pct || 0) > 0);
            const losing = tabData.filter((i) => parseFloat(i.avantaj_pct || 0) < 0);
            const avgAvantaj =
                tabData.reduce((s, i) => s + parseFloat(i.avantaj_pct || 0), 0) / tabData.length;
            const avgWr =
                tabData.reduce((s, i) => s + parseFloat(i.win_rate || 0), 0) / tabData.length;
            const avgBl =
                tabData.reduce((s, i) => s + parseFloat(i.bl_pct || 0), 0) / tabData.length;
            const uniqueCoins = [...new Set(tabData.map((i) => i.symbol))];
            const tersSignal = tabData.filter(
                (i) => i.yon_uyumu && !i.yon_uyumu.includes('✅')
            ).length;
            const uyumluSignal = tabData.filter(
                (i) => !i.yon_uyumu || i.yon_uyumu.includes('✅')
            ).length;
            return {
                profits: profitable.length,
                losses: losing.length,
                avgPnl: avgAvantaj,
                avgWr,
                avgBl,
                uniqueCoins: uniqueCoins.length,
                total: tabData.length,
                tersSignal,
                uyumluSignal,
                isBL: true,
            };
        }
        const profits = tabData.filter((i) => parsePnl(i.pnl_percent) > 0);
        const losses = tabData.filter((i) => parsePnl(i.pnl_percent) < 0);
        const avgPnl = tabData.reduce((s, i) => s + parsePnl(i.pnl_percent), 0) / tabData.length;
        const avgWr =
            tabData.reduce(
                (s, i) => s + parseFloat(String(i.win_rate || '0').replace('%', '')),
                0
            ) / tabData.length;
        const uniqueCoins = [...new Set(tabData.map((i) => i.coin))];
        const tersSignal = tabData.filter((i) => i.ters_sinyal === true).length;
        const uyumluSignal = tabData.filter((i) => i.ters_sinyal !== true).length;
        return {
            profits: profits.length,
            losses: losses.length,
            avgPnl,
            avgWr,
            uniqueCoins: uniqueCoins.length,
            total: tabData.length,
            tersSignal,
            uyumluSignal,
            isBL: false,
        };
    }, [tabData]);

    // Pozisyon detailları: ACIK_POZISYONLAR tab'ından positions + all_positions_signal_view (BL88)
    const positionsRaw = useMemo(() => {
        if (!data) return [];
        // Önce tab fordeki positions alanına bak
        const modes = isBL ? [data] : [data.balance_mode, data.winrate_mode];
        for (const mode of modes) {
            const apTab = mode?.tabs?.ACIK_POZISYONLAR;
            if (apTab?.positions?.length) return apTab.positions;
        }
        return [];
    }, [data, isBL]);

    // BL88 all_positions_signal_view (gelecek alan — bot bunu JSON'a adddiğinde otomatik çalışır)
    const allPositionsView = useMemo(() => data?.all_positions_signal_view || [], [data]);
    const tersSignalSayisi = useMemo(() => {
        if (data?.ters_sinyal_sayisi_tum_pozisyon != null)
            return data.ters_sinyal_sayisi_tum_pozisyon;
        // Fallback: ACIK_POZISYONLAR tab'ındaki ters_sinyal_sayisi
        if (!data) return 0;
        const modes = isBL ? [data] : [data.balance_mode, data.winrate_mode];
        for (const mode of modes) {
            const apTab = mode?.tabs?.ACIK_POZISYONLAR;
            if (apTab?.ters_sinyal_sayisi != null) return apTab.ters_sinyal_sayisi;
        }
        return 0;
    }, [data, isBL]);

    const positionCoinStatus = useMemo(() => {
        const statusMap = {};
        if (positionCoins.length > 0) {
            // BL88 all_positions_signal_view map (varsa)
            const blMap = {};
            allPositionsView.forEach((p) => {
                if (p.coin) blMap[p.coin] = p;
            });

            // positions (hesap verileri) map
            const posMap = {};
            positionsRaw.forEach((p) => {
                if (p.symbol) posMap[p.symbol] = p;
            });

            positionCoins.forEach((coin) => {
                const rows = tabData.filter((r) => (r.coin || r.symbol) === coin);
                const posInfo = posMap[coin] || {};
                const blInfo = blMap[coin] || {};

                const hasTersSignal = blInfo.status_code
                    ? ['TERS_SINYAL', 'TERS_SINYAL_BL_YOK'].includes(blInfo.status_code)
                    : rows.some(
                          (r) =>
                              r.ters_sinyal === true || (r.yon_uyumu && !r.yon_uyumu.includes('✅'))
                      );

                statusMap[coin] = {
                    hasTersSignal,
                    rows,
                    // Hesap pozisyon bilgisi
                    direction: posInfo.direction || null,
                    entry_price: posInfo.entry_price ?? null,
                    mark_price: posInfo.mark_price ?? null,
                    pnl_percent: posInfo.pnl_percent ?? null,
                    // BL88 alanları (bot adddiğinde otomatik gelir)
                    status_code: blInfo.status_code || null,
                    status_text: blInfo.status_text || null,
                    bl_signal: blInfo.bl_signal || '-',
                    bl_entry: blInfo.bl_entry ?? null,
                    bl_avantaj_pct: blInfo.bl_avantaj_pct ?? null,
                };
            });
        }
        return statusMap;
    }, [positionCoins, tabData, positionsRaw, allPositionsView]);

    const coinGroups = useMemo(() => {
        const groups = {};
        processedData.forEach((row) => {
            const coin = row.coin || row.symbol || 'UNKNOWN';
            if (!groups[coin]) groups[coin] = [];
            groups[coin].push(row);
        });
        return groups;
    }, [processedData]);

    return {
        data,
        loading,
        error,
        lastUpdate,
        availableFiles,
        activeFileKey,
        setActiveFileKey,
        activeMode,
        setActiveMode,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        sortBy,
        sortDir,
        viewMode,
        setViewMode,
        page,
        setPage,
        autoRefresh,
        setAutoRefresh,
        selectedCoin,
        setSelectedCoin,
        tableRef,
        meta,
        positionCoins,
        allTabs,
        currentTab,
        tabData,
        processedData,
        pagedData,
        totalPages,
        isPositionsTab,
        handleSort,
        stats,
        positionCoinStatus,
        coinGroups,
        fetchData,
        ITEMS_PER_PAGE,
        isBL,
        tersSignalSayisi,
    };
};

export default useCryptoSignals;
