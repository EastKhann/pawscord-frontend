// frontend/src/CryptoSignals.js
// 🔥 v4.0 — Tamamen yeniden tasarlandı — JSON v3.0 yapısına uyumlu
// ÖNCEKİ SORUN: data.tabs arıyordu, ama JSON: data.balance_mode.tabs / data.winrate_mode.tabs

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { FaArrowLeft, FaSync, FaBitcoin, FaClock, FaChartLine, FaTrophy, FaFilter, FaTimes, FaExternalLinkAlt, FaSortAmountDown, FaSortAmountUp, FaWallet } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getApiBase } from './utils/apiEndpoints';
import useWindowWidth from './hooks/useWindowWidth';
import { formatPrice, parsePnl, getTabConfig, pnlColor } from './CryptoSignals/utils';
import { SignalBadge, StatusBadge } from './CryptoSignals/components';
import S from './CryptoSignals/styles';

const API_BASE = getApiBase();
const SIGNALS_URL = `${API_BASE}/api/crypto/signals/`;
const SIGNALS_LIST_URL = `${API_BASE}/api/crypto/signals/list/`;

// ================================================================
// 🔥 ANA BİLEŞEN
// ================================================================
const CryptoSignals = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);

    // 🔥 İşlem Sayısı (Parent Tab) — signal dosya seçimi
    const [availableFiles, setAvailableFiles] = useState([]);
    const [activeFileKey, setActiveFileKey] = useState(''); // '' = henüz yüklenmedi

    // Mode & Tab
    const [activeMode, setActiveMode] = useState('balance_mode');
    const [activeTab, setActiveTab] = useState(null); // İlk tab JSON'dan gelince otomatik seçilecek

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rank');
    const [sortDir, setSortDir] = useState('asc');

    // View & Pagination
    const [viewMode, setViewMode] = useState('table');
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 50;

    // Coin Detail Modal
    const [selectedCoin, setSelectedCoin] = useState(null);

    // Auto refresh
    const [autoRefresh, setAutoRefresh] = useState(true);
    const tableRef = useRef(null);
    const scrollRef = useRef(0);
    const { isMobile } = useWindowWidth();

    // Tab/mode/file değişince sayfa sıfırla
    useEffect(() => { setPage(1); }, [activeTab, activeMode, searchQuery, activeFileKey]);

    // ===== MEVCUT DOSYA LİSTESİ =====
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(SIGNALS_LIST_URL);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                const files = json.files || [];
                setAvailableFiles(files);
                if (files.length > 0) {
                    // İlk dosyayı seç
                    setActiveFileKey(files[0].key);
                }
            } catch (err) {
                console.error('Signal list fetch error:', err);
                setError('Sinyal dosyaları yüklenemedi');
            }
        })();
    }, []);

    // ===== VERİ ÇEKME =====
    const fetchData = useCallback(async (fileKey) => {
        const key = fileKey || activeFileKey;
        if (!key) return;
        try {
            if (tableRef.current) scrollRef.current = tableRef.current.scrollTop;

            const fileParam = `&file=${key}`;
            const res = await fetch(`${SIGNALS_URL}?t=${Date.now()}${fileParam}`);
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
                if (tableRef.current && scrollRef.current > 0) {
                    tableRef.current.scrollTop = scrollRef.current;
                }
            }, 50);
        } catch (err) {
            console.error('Signal fetch error:', err);
            if (!data) setError('Sunucuya bağlanılamadı: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, [activeFileKey]);

    // activeFileKey değişince veri çek ve tab'ı sıfırla
    useEffect(() => {
        if (activeFileKey) {
            setLoading(true);
            setActiveTab(null); // Yeni dosya gelince tab sıfırla — ilk tab otomatik seçilir
            fetchData(activeFileKey);
        }
    }, [activeFileKey]);

    useEffect(() => {
        if (!autoRefresh || !activeFileKey) return;
        const iv = setInterval(() => fetchData(activeFileKey), 30000);
        return () => clearInterval(iv);
    }, [autoRefresh, fetchData, activeFileKey]);

    // ===== VERİ ERİŞİMİ (v3.0 JSON YAPISI) =====
    // ✅ KRİTİK FİX: data.balance_mode.tabs / data.winrate_mode.tabs
    const meta = data?.meta || {};
    const positionCoins = meta.position_coins || [];

    const modeData = useMemo(() => {
        if (!data || !data[activeMode]) return null;
        return data[activeMode];
    }, [data, activeMode]);

    const allTabs = useMemo(() => {
        if (!modeData || !modeData.tabs) return {};
        return modeData.tabs;
    }, [modeData]);

    const currentTab = useMemo(() => {
        if (!allTabs[activeTab]) return null;
        return allTabs[activeTab];
    }, [allTabs, activeTab]);

    const tabData = useMemo(() => {
        return currentTab?.data || [];
    }, [currentTab]);

    // İlk tab'ı otomatik seç (data yüklenince veya mevcut tab geçersizse)
    useEffect(() => {
        const tabKeys = Object.keys(allTabs);
        if (tabKeys.length > 0 && (!activeTab || !allTabs[activeTab])) {
            setActiveTab(tabKeys[0]);
        }
    }, [allTabs, activeTab]);

    // ===== FİLTRE & SIRALAMA =====
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
                case 'coin':
                    valA = a.coin || ''; valB = b.coin || '';
                    return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
                case 'pnl':
                    valA = parsePnl(a.pnl_percent); valB = parsePnl(b.pnl_percent); break;
                case 'win_rate':
                    valA = parseFloat(String(a.win_rate || '0').replace('%', ''));
                    valB = parseFloat(String(b.win_rate || '0').replace('%', '')); break;
                case 'x_kat':
                    valA = parseFloat(String(a.x_kat || '0').replace('x', ''));
                    valB = parseFloat(String(b.x_kat || '0').replace('x', '')); break;
                case 'trades':
                    valA = parseInt(a.trades || 0); valB = parseInt(b.trades || 0); break;
                default:
                    valA = a.rank || 9999; valB = b.rank || 9999; break;
            }
            if (typeof valA === 'string') return 0;
            return sortDir === 'asc' ? valA - valB : valB - valA;
        });

        return items;
    }, [tabData, searchQuery, sortBy, sortDir]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(processedData.length / ITEMS_PER_PAGE));
    const pagedData = processedData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
    const isPositionsTab = activeTab === 'ACIK_POZISYONLAR';

    const handleSort = (field) => {
        if (sortBy === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortBy(field); setSortDir(field === 'rank' ? 'asc' : 'desc'); }
    };

    // Özet istatistikler
    const stats = useMemo(() => {
        if (!tabData.length) return null;
        const profits = tabData.filter(i => parsePnl(i.pnl_percent) > 0);
        const losses = tabData.filter(i => parsePnl(i.pnl_percent) < 0);
        const avgPnl = tabData.reduce((s, i) => s + parsePnl(i.pnl_percent), 0) / tabData.length;
        const avgWr = tabData.reduce((s, i) => s + parseFloat(String(i.win_rate || '0').replace('%', '')), 0) / tabData.length;
        const uniqueCoins = [...new Set(tabData.map(i => i.coin))];
        // Ters sinyal / uyumlu sayıları (pozisyon tabında kullanılır)
        const tersSinyal = tabData.filter(i => i.ters_sinyal === true).length;
        const uyumluSinyal = tabData.filter(i => i.ters_sinyal !== true).length;
        return { profits: profits.length, losses: losses.length, avgPnl, avgWr, uniqueCoins: uniqueCoins.length, total: tabData.length, tersSinyal, uyumluSinyal };
    }, [tabData]);

    // Pozisyon coinleri için ters sinyal durumu hesapla
    const positionCoinStatus = useMemo(() => {
        const statusMap = {};
        if (positionCoins.length > 0 && tabData.length > 0) {
            positionCoins.forEach(coin => {
                const rows = tabData.filter(r => r.coin === coin);
                // Herhangi bir timeframe'de ters sinyal varsa kırmızı
                const hasTersSinyal = rows.some(r => r.ters_sinyal === true);
                statusMap[coin] = { hasTersSinyal, rows };
            });
        }
        return statusMap;
    }, [positionCoins, tabData]);

    // Coin grupları (card view)
    const coinGroups = useMemo(() => {
        const groups = {};
        processedData.forEach(row => {
            const coin = row.coin || 'UNKNOWN';
            if (!groups[coin]) groups[coin] = [];
            groups[coin].push(row);
        });
        return groups;
    }, [processedData]);

    // SortHeader bileşeni
    const SortHeader = ({ field, children, style: extra }) => (
        <th onClick={() => handleSort(field)} style={{
            ...S.th, cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
            color: sortBy === field ? '#f0b232' : '#b9bbbe', ...extra
        }}>
            {children} {sortBy === field && (sortDir === 'asc' ? <FaSortAmountUp style={{ fontSize: '0.7em' }} /> : <FaSortAmountDown style={{ fontSize: '0.7em' }} />)}
        </th>
    );

    // ================================================================
    // RENDER
    // ================================================================

    if (loading && !data) {
        return (
            <div style={S.page}>
                <div style={S.loadingBox}>
                    <div className="crypto-spin" style={{ fontSize: 48 }}>₿</div>
                    <p style={{ color: '#f0b232', fontSize: '1.1em', marginTop: 16 }}>Kripto Verileri Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div style={S.page}>
                <div style={{ textAlign: 'center', marginTop: 80 }}>
                    <div style={{ fontSize: 60, marginBottom: 16 }}>⚠️</div>
                    <h3 style={{ color: '#da373c', marginBottom: 8 }}>{error}</h3>
                    <button onClick={() => fetchData(activeFileKey)} style={S.primaryBtn}>Tekrar Dene</button>
                </div>
            </div>
        );
    }

    return (
        <div style={S.page}>

            {/* ====== HEADER ====== */}
            <header style={S.header}>
                <div style={S.headerLeft}>
                    <Link to="/" style={S.backBtn}><FaArrowLeft /> Geri</Link>
                    <h1 style={S.title}>
                        <FaBitcoin style={{ color: '#f0b232' }} />
                        <span>Kripto Sinyaller</span>
                        {meta.version && <span style={S.versionBadge}>v{meta.version}</span>}
                    </h1>
                </div>
                <div style={S.headerRight}>
                    {lastUpdate && (
                        <span style={S.updateTime}>
                            <FaClock /> {lastUpdate.toLocaleTimeString('tr-TR')}
                        </span>
                    )}
                    <label style={S.checkboxLabel}>
                        <input type="checkbox" checked={autoRefresh} onChange={e => setAutoRefresh(e.target.checked)} />
                        Oto
                    </label>
                    <button onClick={() => fetchData(activeFileKey)} style={S.primaryBtn}>
                        <FaSync className={loading ? 'crypto-spin' : ''} /> Yenile
                    </button>
                </div>
            </header>

            {/* ====== DOSYA SEKMELERİ (İşlem Sayısı) ====== */}
            {availableFiles.length > 1 && (
                <div style={S.fileTabBar}>
                    {availableFiles.map(f => {
                        const isActive = activeFileKey === f.key;
                        return (
                            <button
                                key={f.key}
                                onClick={() => { if (!isActive) { setActiveFileKey(f.key); } }}
                                style={{
                                    ...S.fileTabBtn,
                                    ...(isActive ? S.fileTabBtnActive : {})
                                }}
                            >
                                📊 {f.label}
                                {isActive && loading && <span className="crypto-spin" style={{ marginLeft: 6, fontSize: '0.85em' }}>⏳</span>}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* ====== MODE TOGGLE (Balance / Winrate) ====== */}
            <div style={S.modeToggle}>
                <button
                    onClick={() => setActiveMode('balance_mode')}
                    style={{
                        ...S.modeBtn,
                        ...(activeMode === 'balance_mode' ? S.modeBtnActive : {}),
                        borderColor: activeMode === 'balance_mode' ? '#f0b232' : '#40444b'
                    }}
                >
                    <FaChartLine /> {isMobile ? 'Balance' : '💰 Balance Sıralama'}
                </button>
                <button
                    onClick={() => setActiveMode('winrate_mode')}
                    style={{
                        ...S.modeBtn,
                        ...(activeMode === 'winrate_mode' ? S.modeBtnActive : {}),
                        borderColor: activeMode === 'winrate_mode' ? '#23a559' : '#40444b'
                    }}
                >
                    <FaTrophy /> {isMobile ? 'Winrate' : '🏆 Winrate Sıralama'}
                </button>
            </div>

            {/* ====== ÖZET İSTATİSTİK BAR ====== */}
            {stats && (
                <div style={S.statsBar}>
                    <div style={S.statCard}>
                        <span style={S.statNum}>{stats.total}</span>
                        <span style={S.statLabel}>Strateji</span>
                    </div>
                    <div style={S.statCard}>
                        <span style={S.statNum}>{stats.uniqueCoins}</span>
                        <span style={S.statLabel}>Coin</span>
                    </div>
                    <div style={S.statCard}>
                        <span style={{ ...S.statNum, color: '#23a559' }}>
                            {isPositionsTab ? stats.uyumluSinyal : stats.profits}
                        </span>
                        <span style={S.statLabel}>{isPositionsTab ? '✅ Uyumlu' : 'Kârda'}</span>
                    </div>
                    <div style={S.statCard}>
                        <span style={{ ...S.statNum, color: '#da373c' }}>
                            {isPositionsTab ? stats.tersSinyal : stats.losses}
                        </span>
                        <span style={S.statLabel}>{isPositionsTab ? '⚠️ Ters Sinyal' : 'Zararda'}</span>
                    </div>
                    <div style={S.statCard}>
                        <span style={{ ...S.statNum, color: stats.avgPnl >= 0 ? '#23a559' : '#da373c' }}>
                            {stats.avgPnl >= 0 ? '+' : ''}{stats.avgPnl.toFixed(2)}%
                        </span>
                        <span style={S.statLabel}>Ort. PNL</span>
                    </div>
                    <div style={S.statCard}>
                        <span style={{ ...S.statNum, color: stats.avgWr >= 50 ? '#23a559' : '#f0b232' }}>
                            {stats.avgWr.toFixed(1)}%
                        </span>
                        <span style={S.statLabel}>Ort. WR</span>
                    </div>
                </div>
            )}

            {/* ====== TAB BAR ====== */}
            <div style={S.tabBar}>
                {Object.keys(allTabs).map(tabKey => {
                    const cfg = getTabConfig(tabKey);
                    const tab = allTabs[tabKey];
                    const isActive = activeTab === tabKey;
                    return (
                        <button
                            key={tabKey}
                            onClick={() => setActiveTab(tabKey)}
                            style={{
                                ...S.tabBtn,
                                ...(isActive ? { backgroundColor: cfg.color, borderColor: cfg.color, color: '#fff', boxShadow: `0 4px 14px ${cfg.color}44` } : {})
                            }}
                        >
                            <span>{cfg.icon}</span>
                            <span>{isMobile ? cfg.shortLabel : cfg.label}</span>
                            <span style={{
                                backgroundColor: isActive ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.08)',
                                padding: '2px 8px', borderRadius: 12, fontSize: '0.75em', fontWeight: 700
                            }}>
                                {tab?.count || 0}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ====== FİLTRE BAR ====== */}
            <div style={S.filterBar}>
                <div style={S.searchBox}>
                    <FaFilter style={{ color: '#949ba4', flexShrink: 0 }} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Coin ara... (BTC, ETH, SOL)"
                        style={S.searchInput}
                    />
                    {searchQuery && <button onClick={() => setSearchQuery('')} style={S.clearBtn}><FaTimes /></button>}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#949ba4', fontSize: '0.85em' }}>
                        {processedData.length} sonuç
                    </span>
                    <button
                        onClick={() => setViewMode(v => v === 'table' ? 'cards' : 'table')}
                        style={S.viewToggle}
                        title={viewMode === 'table' ? 'Kart görünümü' : 'Tablo görünümü'}
                    >
                        {viewMode === 'table' ? '🃏' : '📋'}
                    </button>
                </div>
            </div>

            {/* ====== POZİSYON COİNLERİ BANNER ====== */}
            {isPositionsTab && positionCoins.length > 0 && (
                <div style={S.posBanner}>
                    <strong><FaWallet style={{ marginRight: 6 }} />Açık Pozisyon ({positionCoins.length}):</strong>
                    {positionCoins.map((c, i) => {
                        const status = positionCoinStatus[c];
                        const isTers = status?.hasTersSinyal;
                        return (
                            <span key={c} style={{
                                ...S.posTag,
                                backgroundColor: isTers ? 'rgba(218,55,60,0.15)' : 'rgba(35,165,89,0.15)',
                                color: isTers ? '#da373c' : '#23a559',
                                border: `1px solid ${isTers ? 'rgba(218,55,60,0.4)' : 'rgba(35,165,89,0.4)'}`,
                            }}>
                                {i + 1}. {isTers ? '⚠️' : '✅'} {c.replace('USDT', '')}
                            </span>
                        );
                    })}
                </div>
            )}

            {/* ====== İÇERİK ====== */}
            {!currentTab ? (
                <div style={S.emptyState}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                    <p>Bu modda veri bulunamadı</p>
                </div>
            ) : viewMode === 'cards' ? (
                /* ====== KART GÖRÜNÜMÜ ====== */
                <div style={S.cardGrid}>
                    {Object.entries(coinGroups).map(([coin, rows]) => {
                        const profitRows = rows.filter(r => parsePnl(r.pnl_percent) > 0);
                        const lossRows = rows.filter(r => parsePnl(r.pnl_percent) < 0);
                        const uyumluRows = rows.filter(r => r.ters_sinyal !== true);
                        const tersRows = rows.filter(r => r.ters_sinyal === true);
                        const goodRows = isPositionsTab ? uyumluRows : profitRows;
                        const badRows = isPositionsTab ? tersRows : lossRows;
                        const avgPnl = rows.reduce((s, r) => s + parsePnl(r.pnl_percent), 0) / rows.length;
                        const bestWr = Math.max(...rows.map(r => parseFloat(String(r.win_rate || '0').replace('%', ''))));
                        const firstRow = rows[0] || {};
                        const mainSignal = firstRow.signal || firstRow.sinyal_yonu || '-';

                        return (
                            <div
                                key={coin}
                                style={S.coinCard}
                                onClick={() => setSelectedCoin({ name: coin, data: rows })}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = '#f0b232'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#2f3136'; }}
                            >
                                <div style={S.cardHeader}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={S.cardCoinName}>{coin.replace('USDT', '')}</span>
                                        <SignalBadge value={mainSignal} />
                                    </div>
                                    <span style={{ color: '#949ba4', fontSize: '0.78em' }}>{rows.length} str.</span>
                                </div>
                                <div style={S.cardBody}>
                                    <div style={S.cardRow}>
                                        <span style={S.cardRowLabel}>Fiyat</span>
                                        <span style={S.cardRowValue}>${formatPrice(firstRow.current_price)}</span>
                                    </div>
                                    <div style={S.cardRow}>
                                        <span style={S.cardRowLabel}>Ort. PNL</span>
                                        <span style={{ ...S.cardRowValue, color: pnlColor(avgPnl.toString()), fontWeight: 700 }}>
                                            {avgPnl >= 0 ? '+' : ''}{avgPnl.toFixed(2)}%
                                        </span>
                                    </div>
                                    <div style={S.cardRow}>
                                        <span style={S.cardRowLabel}>En İyi WR</span>
                                        <span style={{ ...S.cardRowValue, color: bestWr >= 50 ? '#23a559' : '#da373c' }}>
                                            {bestWr.toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                                <div style={S.cardFooter}>
                                    <div style={S.miniBarBg}>
                                        <div style={{ ...S.miniBar, width: `${(goodRows.length / Math.max(rows.length, 1)) * 100}%` }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75em', marginTop: 4 }}>
                                        <span style={{ color: '#23a559' }}>{isPositionsTab ? '✅' : '✓'} {goodRows.length}</span>
                                        <span style={{ color: '#da373c' }}>{isPositionsTab ? '⚠️' : '✗'} {badRows.length}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* ====== TABLO GÖRÜNÜMÜ ====== */
                <>
                    <div ref={tableRef} style={S.tableWrap}>
                        <table style={S.table}>
                            <thead>
                                <tr>
                                    <SortHeader field="rank">#</SortHeader>
                                    <SortHeader field="coin">Coin</SortHeader>
                                    <th style={S.th}>TF</th>
                                    <th style={S.th}>Sinyal</th>
                                    {isPositionsTab && <th style={S.th}>Poz.Yönü</th>}
                                    {isPositionsTab && <th style={S.th}>Uyum</th>}
                                    <th style={S.th}>Giriş</th>
                                    <th style={S.th}>Güncel</th>
                                    <SortHeader field="pnl">PNL%</SortHeader>
                                    <SortHeader field="win_rate">WR%</SortHeader>
                                    <SortHeader field="trades">İşlem</SortHeader>
                                    <SortHeader field="x_kat">X Kat</SortHeader>
                                    <th style={S.th}>Hedef ROE</th>
                                    <th style={S.th}>Durum</th>
                                    <th style={S.th}>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagedData.length === 0 ? (
                                    <tr>
                                        <td colSpan={isPositionsTab ? 15 : 13} style={{ textAlign: 'center', padding: 40, color: '#949ba4' }}>
                                            {searchQuery ? `"${searchQuery}" için sonuç bulunamadı` : 'Bu sekmede veri yok'}
                                        </td>
                                    </tr>
                                ) : pagedData.map((item, idx) => {
                                    const coinShort = (item.coin || '').replace('USDT', '');
                                    const binanceSymbol = item.coin?.endsWith('USDT') ? item.coin : `${item.coin}USDT`;
                                    const rowBg = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)';

                                    return (
                                        <tr
                                            key={`${item.rank}-${item.coin}-${item.timeframe}-${idx}`}
                                            style={{ backgroundColor: rowBg, transition: 'background-color 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(88,101,242,0.06)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = rowBg}
                                        >
                                            <td style={S.td}><span style={{ color: '#949ba4', fontWeight: 600 }}>{item.rank}</span></td>
                                            <td style={S.td}>
                                                <span
                                                    style={{ color: '#f0b232', fontWeight: 700, cursor: 'pointer' }}
                                                    onClick={() => {
                                                        const allRows = tabData.filter(r => r.coin === item.coin);
                                                        setSelectedCoin({ name: item.coin, data: allRows });
                                                    }}
                                                >
                                                    {coinShort}
                                                </span>
                                            </td>
                                            <td style={S.td}><span style={S.tfBadge}>{item.timeframe}</span></td>
                                            <td style={S.td}><SignalBadge value={item.signal || item.sinyal_yonu || '-'} /></td>

                                            {isPositionsTab && (
                                                <td style={S.td}><SignalBadge value={item.pozisyon_yonu || '-'} /></td>
                                            )}
                                            {isPositionsTab && (
                                                <td style={S.td}>
                                                    <span style={{
                                                        fontSize: '0.8em', fontWeight: 600,
                                                        color: item.ters_sinyal ? '#da373c' : '#23a559'
                                                    }}>
                                                        {item.ters_sinyal ? '⚠️ Ters' : '✅ Uyumlu'}
                                                    </span>
                                                </td>
                                            )}

                                            <td style={{ ...S.td, color: '#b9bbbe', fontSize: '0.85em' }}>${formatPrice(item.entry_price)}</td>
                                            <td style={{ ...S.td, color: '#dbdee1', fontSize: '0.85em' }}>${formatPrice(item.current_price)}</td>
                                            <td style={{ ...S.td, color: pnlColor(item.pnl_percent), fontWeight: 700 }}>{item.pnl_percent || '-'}</td>
                                            <td style={{
                                                ...S.td, fontWeight: 600,
                                                color: parseFloat(String(item.win_rate || '0').replace('%', '')) >= 50 ? '#23a559' : '#da373c'
                                            }}>
                                                {item.win_rate || '-'}
                                            </td>
                                            <td style={S.td}>{item.trades || '-'}</td>
                                            <td style={{ ...S.td, color: '#f0b232', fontWeight: 700 }}>{item.x_kat || '-'}</td>
                                            <td style={{ ...S.td, color: '#5865f2', fontWeight: 600 }}>{item.hedef_roe || '-'}</td>
                                            <td style={S.td}><StatusBadge status={item.status} /></td>
                                            <td style={S.td}>
                                                <a
                                                    href={`https://www.binance.com/en/futures/${binanceSymbol}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={S.linkBtn}
                                                    title={`${coinShort} Binance Futures`}
                                                >
                                                    <FaExternalLinkAlt />
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={S.pagination}>
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                style={{ ...S.pageBtn, opacity: page === 1 ? 0.4 : 1 }}>◄</button>
                            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                let num;
                                if (totalPages <= 7) num = i + 1;
                                else if (page <= 4) num = i + 1;
                                else if (page >= totalPages - 3) num = totalPages - 6 + i;
                                else num = page - 3 + i;
                                return (
                                    <button key={num} onClick={() => setPage(num)}
                                        style={{ ...S.pageNumBtn, ...(page === num ? S.pageNumActive : {}) }}>
                                        {num}
                                    </button>
                                );
                            })}
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                style={{ ...S.pageBtn, opacity: page === totalPages ? 0.4 : 1 }}>►</button>
                        </div>
                    )}
                </>
            )}

            {/* ====== COİN DETAY MODAL ====== */}
            {selectedCoin && (
                <div style={S.modalOverlay} onClick={() => setSelectedCoin(null)}>
                    <div style={S.modal} onClick={e => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div style={S.modalHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <FaBitcoin style={{ fontSize: 28, color: '#f0b232' }} />
                                <h2 style={{ margin: 0, color: '#f0b232', fontWeight: 700 }}>
                                    {selectedCoin.name.replace('USDT', '')}
                                </h2>
                                <span style={S.modalBadge}>{selectedCoin.data.length} Strateji</span>
                            </div>
                            <button onClick={() => setSelectedCoin(null)} style={S.modalCloseBtn}>✕</button>
                        </div>

                        {/* Modal Stats */}
                        <div style={S.modalStats}>
                            {(() => {
                                const rows = selectedCoin.data;
                                const profits = rows.filter(r => parsePnl(r.pnl_percent) > 0).length;
                                const losses = rows.filter(r => parsePnl(r.pnl_percent) < 0).length;
                                const tersCount = rows.filter(r => r.ters_sinyal === true).length;
                                const uyumluCount = rows.filter(r => r.ters_sinyal !== true).length;
                                const avgPnl = rows.reduce((s, r) => s + parsePnl(r.pnl_percent), 0) / rows.length;
                                const avgWr = rows.reduce((s, r) => s + parseFloat(String(r.win_rate || '0').replace('%', '')), 0) / rows.length;
                                const price = rows[0]?.current_price;

                                return (
                                    <>
                                        <div style={S.mStatCard}>
                                            <span style={{ fontSize: '1.3em', fontWeight: 700, color: '#23a559' }}>
                                                {isPositionsTab ? uyumluCount : profits}
                                            </span>
                                            <span style={S.mStatLabel}>{isPositionsTab ? '✅ Uyumlu' : 'Kârda'}</span>
                                        </div>
                                        <div style={S.mStatCard}>
                                            <span style={{ fontSize: '1.3em', fontWeight: 700, color: '#da373c' }}>
                                                {isPositionsTab ? tersCount : losses}
                                            </span>
                                            <span style={S.mStatLabel}>{isPositionsTab ? '⚠️ Ters Sinyal' : 'Zararda'}</span>
                                        </div>
                                        <div style={S.mStatCard}>
                                            <span style={{ fontSize: '1.3em', fontWeight: 700, color: avgPnl >= 0 ? '#23a559' : '#da373c' }}>
                                                {avgPnl >= 0 ? '+' : ''}{avgPnl.toFixed(2)}%
                                            </span>
                                            <span style={S.mStatLabel}>Ort. PNL</span>
                                        </div>
                                        <div style={S.mStatCard}>
                                            <span style={{ fontSize: '1.3em', fontWeight: 700, color: '#f0b232' }}>
                                                {avgWr.toFixed(1)}%
                                            </span>
                                            <span style={S.mStatLabel}>Ort. WR</span>
                                        </div>
                                        {price && (
                                            <div style={S.mStatCard}>
                                                <span style={{ fontSize: '1.3em', fontWeight: 700, color: '#fff' }}>
                                                    ${formatPrice(price)}
                                                </span>
                                                <span style={S.mStatLabel}>Fiyat</span>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </div>

                        {/* Modal Strateji Listesi */}
                        <div style={S.modalBody}>
                            <h3 style={{ margin: '0 0 12px', color: '#fff', fontSize: '1em' }}>📊 Strateji Detayları</h3>
                            <div style={S.strategyList}>
                                {selectedCoin.data.map((row, idx) => {
                                    const pnl = parsePnl(row.pnl_percent);
                                    const isProfit = pnl > 0;
                                    return (
                                        <div key={idx} style={{
                                            ...S.strategyCard,
                                            borderLeft: `4px solid ${isProfit ? '#23a559' : '#da373c'}`,
                                            animationDelay: `${idx * 0.04}s`
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                                <span style={{ color: '#5865f2', fontWeight: 700, fontSize: '1.05em' }}>{row.timeframe}</span>
                                                <SignalBadge value={row.signal || row.sinyal_yonu || row.pozisyon_yonu || '-'} />
                                            </div>
                                            <div style={S.strategyGrid}>
                                                <div style={S.stratItem}>
                                                    <span style={S.stratItemLabel}>Giriş</span>
                                                    <span style={S.stratItemVal}>${formatPrice(row.entry_price)}</span>
                                                </div>
                                                <div style={S.stratItem}>
                                                    <span style={S.stratItemLabel}>Güncel</span>
                                                    <span style={S.stratItemVal}>${formatPrice(row.current_price)}</span>
                                                </div>
                                                <div style={S.stratItem}>
                                                    <span style={S.stratItemLabel}>PNL</span>
                                                    <span style={{ ...S.stratItemVal, color: isProfit ? '#23a559' : '#da373c', fontWeight: 700 }}>
                                                        {row.pnl_percent || '-'}
                                                    </span>
                                                </div>
                                                <div style={S.stratItem}>
                                                    <span style={S.stratItemLabel}>WR</span>
                                                    <span style={S.stratItemVal}>{row.win_rate || '-'}</span>
                                                </div>
                                                <div style={S.stratItem}>
                                                    <span style={S.stratItemLabel}>X Kat</span>
                                                    <span style={{ ...S.stratItemVal, color: '#f0b232' }}>{row.x_kat || '-'}</span>
                                                </div>
                                                <div style={S.stratItem}>
                                                    <span style={S.stratItemLabel}>Hedef</span>
                                                    <span style={{ ...S.stratItemVal, color: '#5865f2' }}>{row.hedef_roe || '-'}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: '1px solid #40444b' }}>
                                                <StatusBadge status={row.status} />
                                                {row.days_ago !== undefined && (
                                                    <span style={{ color: '#949ba4', fontSize: '0.78em' }}>{row.days_ago} gün · {row.bars_ago} bar</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Binance Link */}
                        <div style={{ padding: '12px 20px', borderTop: '1px solid #2f3136', textAlign: 'center' }}>
                            <a
                                href={`https://www.binance.com/en/futures/${selectedCoin.name.endsWith('USDT') ? selectedCoin.name : selectedCoin.name + 'USDT'}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#f0b232', textDecoration: 'none', fontWeight: 600, fontSize: '0.9em' }}
                            >
                                <FaExternalLinkAlt /> Binance Futures'da Aç
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CryptoSignals;
