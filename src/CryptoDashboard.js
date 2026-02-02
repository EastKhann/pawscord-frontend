// frontend/src/CryptoDashboard.js

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBitcoin, FaSync, FaSortAmountDown, FaWallet, FaExchangeAlt, FaTimes, FaBug } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import toast from './utils/toast';
import { getApiBase, getMediaBase } from './utils/apiEndpoints';

// --- EKRAN GENİŞLİĞİ KONTROLÜ ---
const useWindowWidth = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return isMobile;
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
const DATA_URL = `${API_BASE}/trading/dashboard/`;

// PYTHON VERİSİNİ TEMİZLEME
const cleanPythonData = (text) => {
    if (!text) return "{}";
    let cleaned = text;
    cleaned = cleaned.replace(/:\s*None/g, ': null');
    cleaned = cleaned.replace(/:\s*True/g, ': true');
    cleaned = cleaned.replace(/:\s*False/g, ': false');
    cleaned = cleaned.replace(/:\s*Infinity/g, ': 0');
    cleaned = cleaned.replace(/:\s*NaN/g, ': 0');
    if (cleaned.includes("'")) {
        try { cleaned = cleaned.replace(/'/g, '"'); } catch (e) { }
    }
    return cleaned;
};

// 🔥 CANLI FİYAT BİLEŞENİ
const LivePrice = ({ price }) => {
    const [prevPrice, setPrevPrice] = useState(price);
    const [colorClass, setColorClass] = useState('');

    useEffect(() => {
        if (!price || price === "Yükleniyor..." || price === "Fiyat Bekleniyor...") return;

        const current = parseFloat(price);
        const previous = parseFloat(prevPrice);

        if (current > previous) {
            setColorClass('flash-green');
        } else if (current < previous) {
            setColorClass('flash-red');
        }

        setPrevPrice(price);
        const timer = setTimeout(() => setColorClass(''), 1000);
        return () => clearTimeout(timer);
    }, [price]);

    const displayPrice = formatPrice(price);

    return (
        <span className={colorClass} style={{
            fontSize: '1em',
            fontWeight: 'bold',
            color: (price === "Yükleniyor..." || price === "Fiyat Bekleniyor...") ? '#999' : (colorClass === 'flash-green' ? '#23a559' : (colorClass === 'flash-red' ? '#da373c' : '#23a559')),
            transition: 'color 0.5s ease',
            display: 'block',
            marginTop: 2
        }}>
            {(price !== "Yükleniyor..." && price !== "Fiyat Bekleniyor...") ? `$${displayPrice}` : price}
        </span>
    );
};

// --- GÜNCELLENMİŞ TİCARET MODALI (CANLI FİYAT DESTEKLİ) ---
const TradeModal = ({ coin, initialPrice, livePrices, portfolio, onClose, onTrade }) => {
    const [amount, setAmount] = useState('');
    const [usdtTotal, setUsdtTotal] = useState('');
    const [mode, setMode] = useState('BUY');

    // 🔥 DÜZELTME 1: Fiyatı canlı veriden al, yoksa initial kullan
    // Coin sembolünü USDT ile eşleştir (Örn: BTC -> BTCUSDT)
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

    // Fiyat değiştikçe toplam tutarı güncelle (Eğer miktar girilmişse)
    useEffect(() => {
        if (amount && !isNaN(parseFloat(amount))) {
            const total = (parseFloat(amount) * numericPrice).toFixed(2);
            setUsdtTotal(total);
        }
    }, [numericPrice]);

    const handleAmountChange = (val) => {
        setAmount(val);
        if (!val || isNaN(parseFloat(val))) { setUsdtTotal(''); return; }
        const total = (parseFloat(val) * numericPrice).toFixed(2);
        setUsdtTotal(total);
    };

    const handleUsdtChange = (val) => {
        setUsdtTotal(val);
        if (!val || isNaN(parseFloat(val))) { setAmount(''); return; }
        const count = (parseFloat(val) / numericPrice).toFixed(6);
        setAmount(parseFloat(count).toString());
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
                    {/* 🔥 CANLI FİYAT BİLEŞENİ BURADA */}
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

                <button
                    onClick={() => onTrade(mode, coin, amount, numericPrice)}
                    style={{ ...styles.confirmBtn, backgroundColor: mode === 'BUY' ? '#23a559' : '#da373c' }}
                    disabled={!amount || parseFloat(amount) <= 0}
                >
                    {mode === 'BUY' ? 'SATIN AL' : 'SATIŞ YAP'}
                </button>
            </div>
        </div>
    );
};

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

const CryptoDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [debugInfo, setDebugInfo] = useState("");
    const [activeTimeframe, setActiveTimeframe] = useState('');
    const [sortBy, setSortBy] = useState('balance');
    const [expandedCoins, setExpandedCoins] = useState({});
    const [showPortfolio, setShowPortfolio] = useState(false);
    const [tradeData, setTradeData] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [prices, setPrices] = useState({});
    const activeTimeframeRef = useRef(activeTimeframe);
    const dataRef = useRef(data);

    const { token } = useAuth();
    const isMobile = useWindowWidth();

    // 1. Verileri Çek
    // 1. Verileri Çek
    const fetchData = async () => {
        // 🔥 DÜZELTME: Doğrudan state yerine Ref kontrol ediyoruz
        // Böylece interval içindeki fonksiyon güncel veriyi görebiliyor.
        if (!dataRef.current) setLoading(true);

        setErrorMsg(null);
        try {
            const response = await fetch(DATA_URL);
            const text = await response.text();

            if (!text || text.length < 50) {
                if (!dataRef.current) setErrorMsg("Veri dosyası boş. Bot çalışıyor mu?");
                setLoading(false);
                return;
            }

            const cleanText = cleanPythonData(text);

            try {
                // Hatalı JSON karakterlerini temizle
                let validJson = cleanText
                    .replace(/:\s*NaN/g, ': null')
                    .replace(/:\s*Infinity/g, ': null')
                    .replace(/:\s*-Infinity/g, ': null');

                const result = JSON.parse(validJson);
                setData(result);
                const keys = Object.keys(result);

                // 🔥 DÜZELTME: Burada da Ref kullanıyoruz.
                // Eğer kullanıcı bir timeframe seçmişse (activeTimeframeRef.current doluysa),
                // onu EZMİYORUZ. Sadece boşsa ilkini seçiyoruz.
                if (keys.length > 0 && !activeTimeframeRef.current) {
                    setActiveTimeframe(keys[0]);
                }
            } catch (jsonError) {
                console.error("JSON Hatası:", jsonError, cleanText); // Konsola detaylı hata bas
                if (!dataRef.current) {
                    setDebugInfo("JSON Parse Hatası: " + jsonError.message + "\n\nVeri Özeti: " + cleanText.substring(0, 100));
                    setErrorMsg("Veri formatı bozuk.");
                }
            }
        } catch (error) {
            console.error("Fetch Hatası:", error);
            if (!dataRef.current) setErrorMsg("Sunucuya bağlanılamadı.");
        } finally {
            setLoading(false);
        }
    };

    const fetchPortfolio = async () => {
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/portfolio/my/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) setPortfolio(await res.json());
        } catch (e) { console.debug('[CryptoDashboard] Portfolio fetch skipped:', e.message); }
    };

    const fetchPricesFromLocal = async () => {
        if (!token) return;
        try {
            const url = `${MEDIA_BASE}/crypto_prices.json?t=${Date.now()}`;
            const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });

            if (res.ok) {
                const newPrices = await res.json();
                setPrices(newPrices);
            }
        } catch (e) {
            console.error("Fiyat Okuma Hatası:", e);
        }
    };

    useEffect(() => {
        fetchData();
        fetchPortfolio();
        fetchPricesFromLocal();

        const priceInterval = setInterval(fetchPricesFromLocal, 1500);
        const dataInterval = setInterval(fetchData, 10000);

        return () => {
            clearInterval(priceInterval);
            clearInterval(dataInterval);
        };
    }, [token]);

    // KESİN EŞLEŞTİRME (Regex)
    const extractCoinSymbol = (rawName) => {
        if (!rawName) return null;
        const upperName = rawName.toUpperCase();
        const match = upperName.match(/([A-Z0-9]+USDT)/);
        if (match && match[0]) return match[0];
        return upperName.split(' ')[0].replace(/[^A-Z0-9]/g, '');
    };

    const getLivePrice = (rawName) => {
        const exactSymbol = extractCoinSymbol(rawName);
        if (exactSymbol && prices[exactSymbol]) return prices[exactSymbol];
        const shortSymbol = exactSymbol?.replace('USDT', '');
        if (shortSymbol && prices[shortSymbol]) return prices[shortSymbol];
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
            const data = await res.json();
            if (res.ok) {
                toast.success(`✅ İşlem Başarılı!`);
                setPortfolio(data);
                setTradeData(null);
            } else { toast.error(`❌ Hata: ${data.error}`); }
        } catch (e) { toast.error("❌ Sunucu hatası."); }
    };

    const sortedCoins = useMemo(() => {
        if (!data || !activeTimeframe || !data[activeTimeframe]) return [];
        const coinsArray = Object.entries(data[activeTimeframe]);
        return coinsArray.sort((a, b) => {
            const tA = a[1][0] || {};
            const tB = b[1][0] || {};
            if (sortBy === 'balance') return parseFloat(tB.balance || 0) - parseFloat(tA.balance || 0);
            if (sortBy === 'win_rate') return parseFloat(tB.win_rate || 0) - parseFloat(tA.win_rate || 0);
            return parseInt(tB.trade_count || 0) - parseInt(tA.trade_count || 0);
        });
    }, [data, activeTimeframe, sortBy]);
    useEffect(() => {
        activeTimeframeRef.current = activeTimeframe;
    }, [activeTimeframe]);

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    const toggleExpand = (coin) => setExpandedCoins(p => ({ ...p, [coin]: !p[coin] }));

    return (
        <div style={{ ...styles.pageContainer, paddingTop: isMobile ? 'max(10px, env(safe-area-inset-top))' : '20px' }}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <Link to="/" style={styles.backButton}><FaArrowLeft /> Ana Menü</Link>
                    <h1 style={styles.title}><FaBitcoin style={{ color: '#f0b232', marginRight: '10px' }} /> Crypto AI Dashboard</h1>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setShowPortfolio(true)} style={styles.portfolioBtn}>
                        <FaWallet /> Cüzdan (${formatPrice(portfolio?.balance || '0')})
                    </button>
                    <button onClick={fetchData} style={styles.refreshButton}>
                        <FaSync className={loading ? 'spin' : ''} /> {loading ? '' : 'Yenile'}
                    </button>
                </div>
            </div>

            {loading && !data ? (
                <div style={styles.loader}>Veriler Yükleniyor...</div>
            ) : errorMsg ? (
                <div style={{ textAlign: 'center', marginTop: 50 }}>
                    <h3 style={{ color: '#da373c' }}>⚠️ {errorMsg}</h3>
                    {debugInfo && (
                        <div style={{ backgroundColor: '#2b2d31', padding: 10, margin: '20px auto', maxWidth: 600, borderRadius: 8, textAlign: 'left' }}>
                            <strong style={{ color: '#f0b232' }}><FaBug /> Hata Verisi:</strong>
                            <pre style={{ color: '#dbdee1', fontSize: '0.8em', whiteSpace: 'pre-wrap' }}>{debugInfo}</pre>
                        </div>
                    )}
                    <button onClick={fetchData} style={styles.confirmBtn}>Tekrar Dene</button>
                </div>
            ) : (
                <div style={styles.content}>
                    <div style={styles.controlsContainer}>
                        <div style={styles.tabs}>
                            {data && Object.keys(data).map(tf => (
                                <button key={tf} onClick={() => setActiveTimeframe(tf)} style={{ ...styles.tabButton, ...(activeTimeframe === tf ? styles.activeTab : {}) }}>
                                    {String(tf).trim() || tf}
                                </button>
                            ))}
                        </div>
                        <div style={styles.sortContainer}>
                            <button onClick={() => setSortBy('balance')} style={{ ...styles.sortButton, ...(sortBy === 'balance' ? styles.activeSort : {}) }}>PNL</button>
                            <button onClick={() => setSortBy('win_rate')} style={{ ...styles.sortButton, ...(sortBy === 'win_rate' ? styles.activeSort : {}) }}>WR</button>
                        </div>
                    </div>

                    <div style={styles.grid}>
                        {sortedCoins.map(([rawCoinName, trades]) => {
                            const isExpanded = !!expandedCoins[rawCoinName];
                            const visibleTrades = isExpanded ? trades : trades.slice(0, 5);
                            const bestTrade = trades[0] || {};
                            const livePrice = getLivePrice(rawCoinName);
                            const coinSymbol = extractCoinSymbol(rawCoinName)?.replace('USDT', '') || "UNK";

                            return (
                                <div key={rawCoinName} style={styles.coinCard}>
                                    <div style={styles.cardHeader}>
                                        <div style={{ flex: 1, overflow: 'hidden' }}>
                                            <h3 style={styles.coinTitle} title={rawCoinName}>{rawCoinName}</h3>
                                            <LivePrice price={livePrice || "Fiyat Bekleniyor..."} />
                                        </div>
                                        <button
                                            onClick={() => setTradeData({ coin: coinSymbol, price: livePrice })}
                                            style={{ ...styles.tradeBtn, opacity: livePrice ? 1 : 0.5, cursor: livePrice ? 'pointer' : 'not-allowed' }}
                                            disabled={!livePrice}
                                        >
                                            <FaExchangeAlt /> İşlem
                                        </button>
                                    </div>

                                    <div style={styles.statsSummary}>
                                        <div style={styles.statItem}>
                                            <span style={styles.statLabel}>PNL</span>
                                            <span style={{ color: '#f0b232' }}>{safeRender(bestTrade.balance)}</span>
                                        </div>
                                        <div style={styles.statItem}>
                                            <span style={styles.statLabel}>WR</span>
                                            <span style={{ color: bestTrade.win_rate > 50 ? '#23a559' : '#da373c' }}>%{safeRender(bestTrade.win_rate)}</span>
                                        </div>
                                    </div>

                                    <div style={styles.tableWrapper}>
                                        <table style={styles.table}>
                                            <thead><tr><th>PNL</th><th>WR%</th><th>İşlem</th><th>TP/SL</th></tr></thead>
                                            <tbody>
                                                {visibleTrades.map((trade, idx) => (
                                                    <tr key={idx} style={{ backgroundColor: idx === 0 ? 'rgba(240,178,50,0.08)' : 'transparent' }}>
                                                        <td style={{ color: '#f0b232' }}>{safeRender(trade.balance)}</td>
                                                        <td style={{ color: trade.win_rate > 50 ? '#23a559' : '#da373c' }}>%{safeRender(trade.win_rate)}</td>
                                                        <td>{safeRender(trade.trade_count)}</td>
                                                        <td>{safeRender(trade.tp)}/{safeRender(trade.sl)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {trades.length > 5 && (
                                        <button onClick={() => setExpandedCoins(p => ({ ...p, [rawCoinName]: !p[rawCoinName] }))} style={styles.expandButton}>
                                            {isExpanded ? 'Kapat' : `+${trades.length - 5} Daha`}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {showPortfolio && <PortfolioModal portfolio={portfolio} onClose={() => setShowPortfolio(false)} />}

            {tradeData && (
                <TradeModal
                    coin={tradeData.coin}
                    initialPrice={tradeData.price}
                    livePrices={prices} // 🔥 CANLI FİYATLAR MODALA GÖNDERİLİYOR
                    portfolio={portfolio}
                    onClose={() => setTradeData(null)}
                    onTrade={handleTrade}
                />
            )}
        </div>
    );
};

const styles = {
    pageContainer: { minHeight: '100%', backgroundColor: '#1e1f22', color: '#dbdee1', padding: '20px', boxSizing: 'border-box' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #2b2d31' },
    headerLeft: { display: 'flex', flexDirection: 'column', gap: '5px' },
    title: { margin: 0, fontSize: '1.4em', display: 'flex', alignItems: 'center', fontWeight: '700', color: '#fff' },
    backButton: { textDecoration: 'none', color: '#949ba4', fontSize: '0.9em', display: 'flex', alignItems: 'center', gap: '5px' },
    refreshButton: { backgroundColor: '#5865f2', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' },
    portfolioBtn: { backgroundColor: '#2b2d31', border: '1px solid #f0b232', color: '#f0b232', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' },
    controlsContainer: { display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    tabs: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' },
    tabButton: { backgroundColor: '#2b2d31', border: '1px solid #40444b', color: '#949ba4', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '0.9em' },
    activeTab: { backgroundColor: '#f0b232', color: '#000', borderColor: '#f0b232', fontWeight: '700' },
    sortContainer: { display: 'flex', alignItems: 'center', gap: '8px' },
    sortButton: { backgroundColor: 'transparent', border: '1px solid #40444b', color: '#dcddde', padding: '4px 10px', borderRadius: '15px', cursor: 'pointer', fontSize: '0.8em' },
    activeSort: { backgroundColor: '#5865f2', borderColor: '#5865f2', color: 'white' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '15px', paddingBottom: '50px' },
    coinCard: { backgroundColor: '#2b2d31', borderRadius: '10px', overflow: 'hidden', border: '1px solid #1f2023', boxShadow: '0 4px 6px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' },
    cardHeader: { backgroundColor: '#202225', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2f3136' },
    coinTitle: { margin: 0, color: '#fff', fontSize: '1em', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' },
    tradeBtn: { backgroundColor: '#23a559', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85em', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 },
    statsSummary: { display: 'flex', gap: '15px', padding: '10px 15px' },
    statItem: { display: 'flex', flexDirection: 'column' },
    statLabel: { fontSize: '0.7em', color: '#949ba4' },
    tableWrapper: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85em' },
    expandButton: { width: '100%', padding: '8px', backgroundColor: '#232428', border: 'none', borderTop: '1px solid #2f3136', color: '#949ba4', cursor: 'pointer' },

    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
    modalContent: { backgroundColor: '#313338', padding: '25px', borderRadius: '12px', width: '90%', maxWidth: '400px', border: '1px solid #40444b', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' },
    modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, color: 'white', borderBottom: '1px solid #444', paddingBottom: 10 },
    closeBtn: { background: 'none', border: 'none', color: '#bbb', fontSize: '1.2em', cursor: 'pointer' },
    modeBtn: { flex: 1, padding: '12px', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1em' },
    inputWrapper: { marginBottom: 15 },
    input: { flex: 1, padding: '12px', borderRadius: '6px 0 0 6px', border: '1px solid #40444b', backgroundColor: '#202225', color: 'white', fontSize: '1.1em', outline: 'none', width: '100%' },
    maxBtn: { padding: '0 15px', backgroundColor: '#40444b', border: '1px solid #40444b', borderRadius: '0 6px 6px 0', color: '#f0b232', fontWeight: 'bold', cursor: 'pointer' },
    confirmBtn: { width: '100%', padding: '15px', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', fontSize: '1.1em', cursor: 'pointer', marginTop: 10 },
    balanceCard: { backgroundColor: '#202225', padding: '15px', borderRadius: '8px', textAlign: 'center', marginBottom: '20px', border: '1px solid #f0b232' },
    holdingsList: { maxHeight: '250px', overflowY: 'auto', margin: '10px 0' },
    holdingItem: { display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #40444b', alignItems: 'center' }
};

const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes flashGreen { 0% { color: #fff; background: rgba(35, 165, 89, 0.5); } 100% { color: #23a559; background: transparent; } }
  @keyframes flashRed { 0% { color: #fff; background: rgba(218, 55, 60, 0.5); } 100% { color: #da373c; background: transparent; } }
  .flash-green { animation: flashGreen 1s ease-out; }
  .flash-red { animation: flashRed 1s ease-out; }
  .spin { animation: spin 1s linear infinite; } 
  @keyframes spin { 100% { transform: rotate(360deg); } } 
  td, th { padding: 8px 10px; text-align: center; border-bottom: 1px solid #2f3136; } 
  th { color: '#949ba4'; font-weight: 600; font-size: 0.8em; } 
  input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
`;
document.head.appendChild(styleSheet);

export default CryptoDashboard;

