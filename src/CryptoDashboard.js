// frontend/src/CryptoDashboard.js
// 🔥 v3.0 — Balance/Winrate Mode + 5 Sekme Desteği

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBitcoin, FaSync, FaWallet, FaExchangeAlt, FaTimes, FaBug, FaChartLine, FaTrophy, FaFilter } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import toast from './utils/toast';
import { getApiBase, getMediaBase } from './utils/apiEndpoints';

// --- EKRAN GENİŞLİĞİ KONTROLÜ ---
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return { isMobile: width <= 768, width };
};

// Güvenli veri yazdırma
const safeRender = (value) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
};

// 🔥 FİYAT FORMATLAYICI
const formatPrice = (price) => {
    if (!price || price === "Yükleniyor..." || price === "Fiyat Bekleniyor...") return price;
    return parseFloat(price).toString();
};

// --- AYARLAR ---
const API_BASE = getApiBase();
const MEDIA_BASE = getMediaBase();
const SIGNALS_URL = `${API_BASE}/crypto/signals/`;

// TAB BİLGİLERİ
const TAB_CONFIG = {
    TUM_STRATEJILER: { icon: '📊', shortLabel: 'Tümü', color: '#5865f2' },
    ACIK_POZISYONLAR: { icon: '💼', shortLabel: 'Açık Poz.', color: '#f0b232' },
    POZISYON_OLMAYAN: { icon: '🔍', shortLabel: 'Poz. Yok', color: '#949ba4' },
    ZARARDA_OLANLAR: { icon: '🔴', shortLabel: 'Zararda', color: '#da373c' },
    ALIM_FIRSATI: { icon: '💰', shortLabel: 'Alım Fır.', color: '#23a559' }
};

// 🔥 CANLI FİYAT BİLEŞENİ
const LivePrice = ({ price }) => {
    const [prevPrice, setPrevPrice] = useState(price);
    const [colorClass, setColorClass] = useState('');

    useEffect(() => {
        if (!price || price === "Yükleniyor..." || price === "Fiyat Bekleniyor..." || price === "...") return;
        const current = parseFloat(price);
        const previous = parseFloat(prevPrice);
        if (current > previous) setColorClass('flash-green');
        else if (current < previous) setColorClass('flash-red');
        setPrevPrice(price);
        const timer = setTimeout(() => setColorClass(''), 1000);
        return () => clearTimeout(timer);
    }, [price]);

    const displayPrice = formatPrice(price);
    return (
        <span className={colorClass} style={{
            fontSize: '0.95em', fontWeight: 'bold',
            color: (price === "Yükleniyor..." || price === "Fiyat Bekleniyor..." || price === "...") ? '#999'
                : (colorClass === 'flash-green' ? '#23a559' : (colorClass === 'flash-red' ? '#da373c' : '#23a559')),
            transition: 'color 0.5s ease'
        }}>
            {(price !== "Yükleniyor..." && price !== "Fiyat Bekleniyor..." && price !== "...") ? `$${displayPrice}` : price}
        </span>
    );
};

// --- TİCARET MODALI ---
const TradeModal = ({ coin, initialPrice, livePrices, portfolio, onClose, onTrade }) => {
    const [amount, setAmount] = useState('');
    const [usdtTotal, setUsdtTotal] = useState('');
    const [mode, setMode] = useState('BUY');

    const symbolKey = Object.keys(livePrices).find(k => k === coin || k === `${coin}USDT`) || coin;
    const currentLivePrice = livePrices[symbolKey] || initialPrice;
    const numericPrice = parseFloat(String(currentLivePrice).replace(/,/g, '').replace('$', ''));
    const userBalance = parseFloat(portfolio?.balance || 0);

    const findHolding = () => {
        if (!portfolio?.holdings) return 0;
        const keys = Object.keys(portfolio.holdings);
        const found = keys.find(k => k.includes(coin));
        return found ? parseFloat(portfolio.holdings[found]) : 0;
    };
    const userCoinHolding = findHolding();

    useEffect(() => {
        if (amount && !isNaN(parseFloat(amount))) {
            setUsdtTotal((parseFloat(amount) * numericPrice).toFixed(2));
        }
    }, [numericPrice]);

    const handleAmountChange = (val) => {
        setAmount(val);
        if (!val || isNaN(parseFloat(val))) { setUsdtTotal(''); return; }
        setUsdtTotal((parseFloat(val) * numericPrice).toFixed(2));
    };

    const handleUsdtChange = (val) => {
        setUsdtTotal(val);
        if (!val || isNaN(parseFloat(val))) { setAmount(''); return; }
        setAmount(parseFloat((parseFloat(val) / numericPrice).toFixed(6)).toString());
    };

    const handleMax = () => {
        if (mode === 'BUY') handleUsdtChange(userBalance.toString());
        else handleAmountChange(userCoinHolding.toString());
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                    <h3>{mode === 'BUY' ? '🟢 Alış' : '🔴 Satış'}: {coin}</h3>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>
                <div style={{ backgroundColor: '#2b2d31', padding: 10, borderRadius: 8, marginBottom: 15, textAlign: 'center' }}>
                    <span style={{ color: '#999', fontSize: '0.9em' }}>Canlı Piyasa Fiyatı</span>
                    <div style={{ fontSize: '1.4em', fontWeight: 'bold' }}>
                        <LivePrice price={currentLivePrice} />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
                    <button onClick={() => { setMode('BUY'); setAmount(''); setUsdtTotal(''); }} style={{ ...styles.modeBtn, backgroundColor: mode === 'BUY' ? '#23a559' : '#2b2d31', opacity: mode === 'BUY' ? 1 : 0.5 }}>AL (Buy)</button>
                    <button onClick={() => { setMode('SELL'); setAmount(''); setUsdtTotal(''); }} style={{ ...styles.modeBtn, backgroundColor: mode === 'SELL' ? '#da373c' : '#2b2d31', opacity: mode === 'SELL' ? 1 : 0.5 }}>SAT (Sell)</button>
                </div>
                <div style={{ marginBottom: 10, fontSize: '0.85em', color: '#dbdee1', display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>
                    <span>💰 Bakiye: <span style={{ color: '#23a559' }}>${userBalance.toFixed(2)}</span></span>
                    <span>🪙 Varlık: <span style={{ color: '#f0b232' }}>{formatPrice(userCoinHolding)} {coin}</span></span>
                </div>
                <div style={styles.inputWrapper}>
                    <label>Miktar ({coin})</label>
                    <div style={{ display: 'flex' }}>
                        <input type="number" value={amount} onChange={e => handleAmountChange(e.target.value)} style={styles.input} placeholder="0" />
                        {mode === 'SELL' && <button onClick={handleMax} style={styles.maxBtn}>MAX</button>}
                    </div>
                </div>
                <div style={styles.inputWrapper}>
                    <label>Toplam (USDT)</label>
                    <div style={{ display: 'flex' }}>
                        <input type="number" value={usdtTotal} onChange={e => handleUsdtChange(e.target.value)} style={styles.input} placeholder="0" />
                        {mode === 'BUY' && <button onClick={handleMax} style={styles.maxBtn}>MAX</button>}
                    </div>
                </div>
                <button onClick={() => onTrade(mode, coin, amount, numericPrice)}
                    style={{ ...styles.confirmBtn, backgroundColor: mode === 'BUY' ? '#23a559' : '#da373c' }}
                    disabled={!amount || parseFloat(amount) <= 0}>
                    {mode === 'BUY' ? 'SATIN AL' : 'SATIŞ YAP'}
                </button>
            </div>
        </div>
    );
};

// --- PORTFÖY MODALI ---
const PortfolioModal = ({ portfolio, onClose }) => {
    if (!portfolio) return null;
    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                    <h2>💼 Cüzdanım</h2>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>
                <div style={styles.balanceCard}>
                    <span>Toplam Bakiye (USDT)</span>
                    <h1 style={{ color: '#23a559', margin: '5px 0' }}>${formatPrice(portfolio.balance)}</h1>
                </div>
                <h4 style={{ borderBottom: '1px solid #444', paddingBottom: 5, marginBottom: 10 }}>Varlıklarım</h4>
                <div style={styles.holdingsList}>
                    {(!portfolio.holdings || Object.keys(portfolio.holdings).length === 0) ? (
                        <p style={{ color: '#999', textAlign: 'center' }}>Henüz coin almadınız.</p>
                    ) : (
                        Object.entries(portfolio.holdings).map(([symbol, qty]) => (
                            <div key={symbol} style={styles.holdingItem}>
                                <strong style={{ color: '#fff', fontSize: '1.1em' }}>{symbol.replace('USDT', '')}</strong>
                                <span style={{ color: '#f0b232' }}>{formatPrice(qty)} Adet</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

// --- PNL RENK YARDIMCISI ---
const pnlColor = (pnl) => {
    if (!pnl) return '#949ba4';
    const str = String(pnl);
    if (str.startsWith('+')) return '#23a559';
    if (str.startsWith('-')) return '#da373c';
    return '#f0b232';
};

// --- SİNYAL BADGE ---
const SignalBadge = ({ signal }) => {
    if (!signal || signal === '-') return <span style={{ color: '#949ba4' }}>-</span>;
    const isLong = signal === 'LONG';
    return (
        <span style={{
            backgroundColor: isLong ? 'rgba(35,165,89,0.15)' : 'rgba(218,55,60,0.15)',
            color: isLong ? '#23a559' : '#da373c',
            padding: '2px 8px', borderRadius: 4, fontWeight: 700, fontSize: '0.8em',
            border: `1px solid ${isLong ? 'rgba(35,165,89,0.3)' : 'rgba(218,55,60,0.3)'}`
        }}>
            {isLong ? '▲' : '▼'} {signal}
        </span>
    );
};

// --- STATUS BADGE ---
const StatusBadge = ({ status }) => {
    if (!status) return <span style={{ color: '#949ba4' }}>-</span>;
    const str = String(status);
    const isProfit = str.includes('KAR') || str.includes('UYUYOR');
    const isLoss = str.includes('ZARAR') || str.includes('TERS');
    return (
        <span style={{
            fontSize: '0.8em', fontWeight: 600,
            color: isProfit ? '#23a559' : isLoss ? '#da373c' : '#f0b232'
        }}>
            {str}
        </span>
    );
};

// =====================================================
// 🔥 ANA BİLEŞEN
// =====================================================
const CryptoDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [debugInfo, setDebugInfo] = useState("");

    // v3.0: Mode & Tab
    const [activeMode, setActiveMode] = useState('balance_mode');
    const [activeTab, setActiveTab] = useState('TUM_STRATEJILER');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rank');
    const [sortDir, setSortDir] = useState('asc');
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 50;

    // Portfolio & Trading
    const [showPortfolio, setShowPortfolio] = useState(false);
    const [tradeData, setTradeData] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [prices, setPrices] = useState({});

    const dataRef = useRef(data);
    const { token } = useAuth();
    const { isMobile } = useWindowWidth();

    useEffect(() => { dataRef.current = data; }, [data]);

    // Tab değişince sayfayı sıfırla
    useEffect(() => { setPage(1); }, [activeTab, activeMode, searchQuery]);

    // 1. Verileri Çek (v3.0 endpoint)
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

    // Coin sembolü çıkar
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

    // =========================================
    // v3.0: Aktif mod ve sekme verisi
    // =========================================
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

    // Filtrelenmiş & sıralanmış veri
    const processedData = useMemo(() => {
        let items = [...tabData];

        // Arama filtresi
        if (searchQuery.trim()) {
            const q = searchQuery.trim().toUpperCase();
            items = items.filter(item =>
                (item.coin && item.coin.toUpperCase().includes(q)) ||
                (item.timeframe && item.timeframe.toUpperCase().includes(q)) ||
                (item.signal && item.signal.toUpperCase().includes(q))
            );
        }

        // Sıralama
        items.sort((a, b) => {
            let valA, valB;
            switch (sortBy) {
                case 'rank':
                    valA = a.rank || 9999; valB = b.rank || 9999; break;
                case 'coin':
                    valA = a.coin || ''; valB = b.coin || '';
                    return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
                case 'pnl':
                    valA = parseFloat(String(a.pnl_percent || '0').replace('%', '').replace('+', ''));
                    valB = parseFloat(String(b.pnl_percent || '0').replace('%', '').replace('+', ''));
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
                    valA = parseInt(a.trades || 0); valB = parseInt(b.trades || 0); break;
                default:
                    valA = a.rank || 9999; valB = b.rank || 9999;
            }
            return sortDir === 'asc' ? valA - valB : valB - valA;
        });

        return items;
    }, [tabData, searchQuery, sortBy, sortDir]);

    // Pagination
    const totalPages = Math.max(1, Math.ceil(processedData.length / ITEMS_PER_PAGE));
    const pagedData = processedData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const isPositionsTab = activeTab === 'ACIK_POZISYONLAR';

    // Meta info
    const meta = data?.meta || {};
    const positionCoins = meta.position_coins || [];

    const handleSort = (field) => {
        if (sortBy === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortBy(field); setSortDir(field === 'rank' ? 'asc' : 'desc'); }
    };

    const SortHeader = ({ field, children, style: extraStyle }) => (
        <th onClick={() => handleSort(field)} style={{
            cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
            color: sortBy === field ? '#f0b232' : '#949ba4',
            ...extraStyle
        }}>
            {children} {sortBy === field ? (sortDir === 'asc' ? '▲' : '▼') : ''}
        </th>
    );

    // =========================================
    // RENDER
    // =========================================
    return (
        <div style={{ ...styles.pageContainer, paddingTop: isMobile ? 'max(10px, env(safe-area-inset-top))' : '20px' }}>

            {/* ===== HEADER ===== */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <Link to="/" style={styles.backButton}><FaArrowLeft /> Ana Menü</Link>
                    <h1 style={styles.title}>
                        <FaBitcoin style={{ color: '#f0b232', marginRight: '10px' }} />
                        Crypto AI Dashboard
                        {meta.version && <span style={{ fontSize: '0.5em', color: '#949ba4', marginLeft: 10 }}>v{meta.version}</span>}
                    </h1>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button onClick={() => setShowPortfolio(true)} style={styles.portfolioBtn}>
                        <FaWallet /> Cüzdan (${formatPrice(portfolio?.balance || '0')})
                    </button>
                    <button onClick={fetchData} style={styles.refreshButton}>
                        <FaSync className={loading ? 'spin' : ''} /> {loading ? '' : 'Yenile'}
                    </button>
                </div>
            </div>

            {/* ===== META BAR ===== */}
            {meta.export_date && (
                <div style={styles.metaBar}>
                    <span>📅 Son Güncelleme: <strong>{meta.export_date}</strong></span>
                    <span>📊 Strateji: <strong>{activeMode === 'balance_mode' ? meta.balance_strategies : meta.winrate_strategies}</strong></span>
                    {positionCoins.length > 0 && (
                        <span>💼 Açık Poz: <strong style={{ color: '#f0b232' }}>{positionCoins.length} Coin</strong></span>
                    )}
                </div>
            )}

            {loading && !data ? (
                <div style={styles.loader}>
                    <div className="spin" style={{ fontSize: 40, display: 'inline-block' }}>⏳</div>
                    <p>Kripto Verileri Yükleniyor...</p>
                </div>
            ) : errorMsg ? (
                <div style={{ textAlign: 'center', marginTop: 50 }}>
                    <h3 style={{ color: '#da373c' }}>⚠️ {errorMsg}</h3>
                    {debugInfo && (
                        <div style={{ backgroundColor: '#2b2d31', padding: 10, margin: '20px auto', maxWidth: 600, borderRadius: 8, textAlign: 'left' }}>
                            <strong style={{ color: '#f0b232' }}><FaBug /> Hata Verisi:</strong>
                            <pre style={{ color: '#dbdee1', fontSize: '0.8em', whiteSpace: 'pre-wrap' }}>{debugInfo}</pre>
                        </div>
                    )}
                    <button onClick={fetchData} style={{ ...styles.confirmBtn, maxWidth: 200, margin: '20px auto' }}>Tekrar Dene</button>
                </div>
            ) : (
                <div style={styles.content}>

                    {/* ===== MODE TOGGLE (Balance / Winrate) ===== */}
                    <div style={styles.modeToggleContainer}>
                        <button
                            onClick={() => setActiveMode('balance_mode')}
                            style={{
                                ...styles.modeToggleBtn,
                                ...(activeMode === 'balance_mode' ? styles.modeToggleActive : {}),
                                borderColor: activeMode === 'balance_mode' ? '#f0b232' : '#40444b'
                            }}
                        >
                            <FaChartLine style={{ marginRight: 6 }} />
                            {isMobile ? 'Balance' : '💰 Balance Sıralama'}
                        </button>
                        <button
                            onClick={() => setActiveMode('winrate_mode')}
                            style={{
                                ...styles.modeToggleBtn,
                                ...(activeMode === 'winrate_mode' ? styles.modeToggleActive : {}),
                                borderColor: activeMode === 'winrate_mode' ? '#23a559' : '#40444b'
                            }}
                        >
                            <FaTrophy style={{ marginRight: 6 }} />
                            {isMobile ? 'Winrate' : '🏆 Winrate Sıralama'}
                        </button>
                    </div>

                    {/* ===== TAB BAR ===== */}
                    <div style={styles.tabBar}>
                        <div style={styles.tabs}>
                            {modeData && modeData.tabs && Object.keys(modeData.tabs).map(tabKey => {
                                const config = TAB_CONFIG[tabKey] || { icon: '📋', shortLabel: tabKey, color: '#949ba4' };
                                const tab = modeData.tabs[tabKey];
                                const isActive = activeTab === tabKey;
                                return (
                                    <button
                                        key={tabKey}
                                        onClick={() => setActiveTab(tabKey)}
                                        style={{
                                            ...styles.tabButton,
                                            ...(isActive ? { ...styles.activeTab, backgroundColor: config.color, borderColor: config.color } : {})
                                        }}
                                    >
                                        <span>{config.icon}</span>
                                        <span>{isMobile ? config.shortLabel : (tab.title || tabKey)}</span>
                                        <span style={{
                                            backgroundColor: isActive ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.1)',
                                            padding: '1px 6px', borderRadius: 10, fontSize: '0.75em', marginLeft: 4
                                        }}>
                                            {tab.count || 0}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ===== ARAMA & FİLTRE ===== */}
                    <div style={styles.filterBar}>
                        <div style={styles.searchBox}>
                            <FaFilter style={{ color: '#949ba4', marginRight: 8 }} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Coin ara... (BTC, ETH, SOL)"
                                style={styles.searchInput}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} style={styles.clearSearchBtn}><FaTimes /></button>
                            )}
                        </div>
                        <div style={styles.resultInfo}>
                            <span style={{ color: '#949ba4', fontSize: '0.85em' }}>
                                {processedData.length} sonuç {searchQuery && `"${searchQuery}" için`}
                            </span>
                        </div>
                    </div>

                    {/* ===== POZİSYON COİNLERİ BANNER ===== */}
                    {isPositionsTab && positionCoins.length > 0 && (
                        <div style={styles.positionBanner}>
                            <strong>💼 Açık Pozisyon Coinleri:</strong>{' '}
                            {positionCoins.map((c) => (
                                <span key={c} style={styles.positionCoinTag}>
                                    {c.replace('USDT', '')}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* ===== VERİ TABLOSU ===== */}
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeaderRow}>
                                    <SortHeader field="rank">#</SortHeader>
                                    <SortHeader field="coin">Coin</SortHeader>
                                    <th style={{ color: '#949ba4' }}>TF</th>
                                    <th style={{ color: '#949ba4' }}>Sinyal</th>
                                    {isPositionsTab && <>
                                        <th style={{ color: '#949ba4' }}>Poz.Yönü</th>
                                        <th style={{ color: '#949ba4' }}>Uyum</th>
                                    </>}
                                    <th style={{ color: '#949ba4' }}>Giriş</th>
                                    <th style={{ color: '#949ba4' }}>Güncel</th>
                                    <SortHeader field="pnl">PNL%</SortHeader>
                                    <SortHeader field="win_rate">WR%</SortHeader>
                                    <SortHeader field="trades">İşlem</SortHeader>
                                    <SortHeader field="x_kat">X Kat</SortHeader>
                                    <th style={{ color: '#949ba4' }}>Hedef</th>
                                    <th style={{ color: '#949ba4' }}>Durum</th>
                                    <th style={{ color: '#949ba4' }}>Al/Sat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagedData.length === 0 ? (
                                    <tr>
                                        <td colSpan={isPositionsTab ? 15 : 13} style={{ textAlign: 'center', padding: 40, color: '#949ba4' }}>
                                            {searchQuery ? 'Arama sonucu bulunamadı.' : 'Bu sekmede veri yok.'}
                                        </td>
                                    </tr>
                                ) : pagedData.map((item, idx) => {
                                    const livePrice = getLivePrice(item.coin);
                                    const coinSymbol = extractCoinSymbol(item.coin)?.replace('USDT', '') || item.coin;
                                    const rowBg = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)';
                                    return (
                                        <tr key={`${item.rank}-${item.coin}-${item.timeframe}-${idx}`} style={{
                                            backgroundColor: rowBg,
                                            transition: 'background-color 0.2s'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(88,101,242,0.08)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = rowBg}
                                        >
                                            <td style={{ color: '#949ba4', fontWeight: 600 }}>{item.rank}</td>
                                            <td>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                                    <strong style={{ color: '#fff', fontSize: '0.9em' }}>{coinSymbol}</strong>
                                                    {livePrice && <LivePrice price={livePrice} />}
                                                </div>
                                            </td>
                                            <td><span style={styles.tfBadge}>{item.timeframe}</span></td>
                                            <td><SignalBadge signal={item.signal || item.sinyal_yonu || '-'} /></td>

                                            {isPositionsTab && <>
                                                <td><SignalBadge signal={item.pozisyon_yonu || '-'} /></td>
                                                <td>
                                                    <span style={{
                                                        fontSize: '0.8em',
                                                        color: item.ters_sinyal ? '#da373c' : '#23a559',
                                                        fontWeight: 600
                                                    }}>
                                                        {item.yon_uyumu || '-'}
                                                    </span>
                                                </td>
                                            </>}

                                            <td style={{ color: '#dbdee1', fontSize: '0.85em' }}>${formatPrice(item.entry_price)}</td>
                                            <td style={{ color: '#dbdee1', fontSize: '0.85em' }}>${formatPrice(item.current_price)}</td>
                                            <td style={{ color: pnlColor(item.pnl_percent), fontWeight: 700 }}>{safeRender(item.pnl_percent)}</td>
                                            <td style={{
                                                color: parseFloat(String(item.win_rate || '0').replace('%', '')) >= 50 ? '#23a559' : '#da373c',
                                                fontWeight: 600
                                            }}>
                                                {safeRender(item.win_rate)}
                                            </td>
                                            <td style={{ color: '#dbdee1' }}>{safeRender(item.trades)}</td>
                                            <td style={{ color: '#f0b232', fontWeight: 700 }}>{safeRender(item.x_kat)}</td>
                                            <td style={{ color: '#5865f2', fontWeight: 600 }}>{safeRender(item.hedef_roe)}</td>
                                            <td><StatusBadge status={item.status} /></td>
                                            <td>
                                                <button
                                                    onClick={() => setTradeData({ coin: coinSymbol, price: livePrice })}
                                                    style={{
                                                        ...styles.miniTradeBtn,
                                                        opacity: livePrice ? 1 : 0.4,
                                                        cursor: livePrice ? 'pointer' : 'not-allowed'
                                                    }}
                                                    disabled={!livePrice}
                                                    title={livePrice ? `${coinSymbol} Al/Sat` : 'Canlı fiyat bekleniyor'}
                                                >
                                                    <FaExchangeAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* ===== PAGINATION ===== */}
                    {totalPages > 1 && (
                        <div style={styles.pagination}>
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                style={{ ...styles.pageBtn, opacity: page === 1 ? 0.4 : 1 }}
                            >
                                ◄ Önceki
                            </button>
                            <div style={styles.pageNumbers}>
                                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 7) pageNum = i + 1;
                                    else if (page <= 4) pageNum = i + 1;
                                    else if (page >= totalPages - 3) pageNum = totalPages - 6 + i;
                                    else pageNum = page - 3 + i;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            style={{
                                                ...styles.pageNumBtn,
                                                ...(page === pageNum ? styles.pageNumActive : {})
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                style={{ ...styles.pageBtn, opacity: page === totalPages ? 0.4 : 1 }}
                            >
                                Sonraki ►
                            </button>
                        </div>
                    )}

                </div>
            )}

            {/* MODALS */}
            {showPortfolio && <PortfolioModal portfolio={portfolio} onClose={() => setShowPortfolio(false)} />}
            {tradeData && (
                <TradeModal
                    coin={tradeData.coin}
                    initialPrice={tradeData.price}
                    livePrices={prices}
                    portfolio={portfolio}
                    onClose={() => setTradeData(null)}
                    onTrade={handleTrade}
                />
            )}
        </div>
    );
};


// =====================================================
// 🎨 STİLLER
// =====================================================
const styles = {
    pageContainer: {
        minHeight: '100%', backgroundColor: '#1e1f22', color: '#dbdee1',
        padding: '20px', boxSizing: 'border-box'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #2b2d31',
        flexWrap: 'wrap', gap: 10
    },
    headerLeft: { display: 'flex', flexDirection: 'column', gap: '5px' },
    title: {
        margin: 0, fontSize: '1.4em', display: 'flex', alignItems: 'center',
        fontWeight: '700', color: '#fff'
    },
    backButton: {
        textDecoration: 'none', color: '#949ba4', fontSize: '0.9em',
        display: 'flex', alignItems: 'center', gap: '5px'
    },
    refreshButton: {
        backgroundColor: '#5865f2', color: 'white', border: 'none',
        padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600'
    },
    portfolioBtn: {
        backgroundColor: '#2b2d31', border: '1px solid #f0b232', color: '#f0b232',
        padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
        fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px'
    },

    // META BAR
    metaBar: {
        display: 'flex', gap: 20, flexWrap: 'wrap', padding: '8px 12px',
        backgroundColor: '#2b2d31', borderRadius: 8, marginBottom: 15,
        fontSize: '0.85em', color: '#dbdee1', alignItems: 'center'
    },

    // MODE TOGGLE
    modeToggleContainer: { display: 'flex', gap: 10, marginBottom: 15 },
    modeToggleBtn: {
        flex: 1, padding: '12px 20px', borderRadius: 8,
        border: '2px solid #40444b', backgroundColor: '#2b2d31',
        color: '#949ba4', cursor: 'pointer', fontWeight: 700,
        fontSize: '0.95em', display: 'flex', alignItems: 'center',
        justifyContent: 'center', transition: 'all 0.2s'
    },
    modeToggleActive: {
        backgroundColor: '#313338', color: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
    },

    // TABS
    tabBar: { marginBottom: 15, overflowX: 'auto' },
    tabs: {
        display: 'flex', gap: '6px', paddingBottom: '5px',
        minWidth: 'max-content'
    },
    tabButton: {
        backgroundColor: '#2b2d31', border: '1px solid #40444b',
        color: '#949ba4', padding: '8px 14px', borderRadius: '8px',
        cursor: 'pointer', fontWeight: '500', fontSize: '0.85em',
        display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
        transition: 'all 0.2s'
    },
    activeTab: {
        color: '#fff', fontWeight: '700',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
    },

    // FILTER BAR
    filterBar: {
        display: 'flex', gap: 15, marginBottom: 15, alignItems: 'center',
        flexWrap: 'wrap'
    },
    searchBox: {
        display: 'flex', alignItems: 'center', backgroundColor: '#2b2d31',
        borderRadius: 8, padding: '6px 12px', border: '1px solid #40444b',
        flex: 1, maxWidth: 400
    },
    searchInput: {
        backgroundColor: 'transparent', border: 'none', outline: 'none',
        color: '#dbdee1', fontSize: '0.9em', flex: 1
    },
    clearSearchBtn: {
        background: 'none', border: 'none', color: '#949ba4', cursor: 'pointer',
        padding: '2px 5px'
    },
    resultInfo: { display: 'flex', alignItems: 'center', gap: 10 },

    // POSITION BANNER
    positionBanner: {
        padding: '10px 15px', backgroundColor: 'rgba(240,178,50,0.08)',
        border: '1px solid rgba(240,178,50,0.2)', borderRadius: 8,
        marginBottom: 15, fontSize: '0.85em', color: '#dbdee1',
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'
    },
    positionCoinTag: {
        backgroundColor: '#f0b232', color: '#000', padding: '2px 8px',
        borderRadius: 4, fontWeight: 700, fontSize: '0.8em'
    },

    // TABLE
    content: {},
    tableContainer: {
        overflowX: 'auto', borderRadius: 10, border: '1px solid #2f3136',
        backgroundColor: '#2b2d31'
    },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85em' },
    tableHeaderRow: { backgroundColor: '#202225', borderBottom: '2px solid #40444b' },
    tfBadge: {
        backgroundColor: '#40444b', color: '#dbdee1', padding: '2px 6px',
        borderRadius: 4, fontSize: '0.8em', fontWeight: 600
    },
    miniTradeBtn: {
        backgroundColor: '#23a559', color: 'white', border: 'none',
        padding: '5px 8px', borderRadius: 4, cursor: 'pointer',
        fontSize: '0.8em', display: 'flex', alignItems: 'center'
    },

    // PAGINATION
    pagination: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 10, marginTop: 20, paddingBottom: 30
    },
    pageBtn: {
        backgroundColor: '#2b2d31', border: '1px solid #40444b', color: '#dbdee1',
        padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontWeight: 600,
        fontSize: '0.85em'
    },
    pageNumbers: { display: 'flex', gap: 4 },
    pageNumBtn: {
        backgroundColor: '#2b2d31', border: '1px solid #40444b', color: '#949ba4',
        padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: '0.85em',
        minWidth: 32, textAlign: 'center'
    },
    pageNumActive: {
        backgroundColor: '#5865f2', borderColor: '#5865f2', color: '#fff', fontWeight: 700
    },

    // LOADER
    loader: { textAlign: 'center', marginTop: 80, color: '#949ba4', fontSize: '1.1em' },

    // MODALS (shared)
    modalOverlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 2000
    },
    modalContent: {
        backgroundColor: '#313338', padding: '25px', borderRadius: '12px',
        width: '90%', maxWidth: '400px', border: '1px solid #40444b',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
    },
    modalHeader: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 20, color: 'white', borderBottom: '1px solid #444', paddingBottom: 10
    },
    closeBtn: { background: 'none', border: 'none', color: '#bbb', fontSize: '1.2em', cursor: 'pointer' },
    modeBtn: {
        flex: 1, padding: '12px', color: 'white', border: 'none',
        borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1em'
    },
    inputWrapper: { marginBottom: 15 },
    input: {
        flex: 1, padding: '12px', borderRadius: '6px 0 0 6px',
        border: '1px solid #40444b', backgroundColor: '#202225', color: 'white',
        fontSize: '1.1em', outline: 'none', width: '100%'
    },
    maxBtn: {
        padding: '0 15px', backgroundColor: '#40444b', border: '1px solid #40444b',
        borderRadius: '0 6px 6px 0', color: '#f0b232', fontWeight: 'bold', cursor: 'pointer'
    },
    confirmBtn: {
        width: '100%', padding: '15px', border: 'none', borderRadius: '6px',
        color: 'white', fontWeight: 'bold', fontSize: '1.1em', cursor: 'pointer', marginTop: 10
    },
    balanceCard: {
        backgroundColor: '#202225', padding: '15px', borderRadius: '8px',
        textAlign: 'center', marginBottom: '20px', border: '1px solid #f0b232'
    },
    holdingsList: { maxHeight: '250px', overflowY: 'auto', margin: '10px 0' },
    holdingItem: {
        display: 'flex', justifyContent: 'space-between', padding: '10px',
        borderBottom: '1px solid #40444b', alignItems: 'center'
    }
};

// Global CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes flashGreen { 0% { color: #fff; background: rgba(35, 165, 89, 0.5); } 100% { color: #23a559; background: transparent; } }
  @keyframes flashRed { 0% { color: #fff; background: rgba(218, 55, 60, 0.5); } 100% { color: #da373c; background: transparent; } }
  .flash-green { animation: flashGreen 1s ease-out; }
  .flash-red { animation: flashRed 1s ease-out; }
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }
  td, th { padding: 8px 10px; text-align: center; border-bottom: 1px solid #2f3136; }
  th { color: #949ba4; font-weight: 600; font-size: 0.8em; }
  input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
`;
document.head.appendChild(styleSheet);

export default CryptoDashboard;

