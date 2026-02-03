// frontend/src/CryptoSignals.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaArrowLeft, FaSync, FaBitcoin, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8888'
    : 'https://api.pawscord.com';

const SIGNAL_JSON_URL = `${API_URL}/api/crypto/signals/`;

const CryptoSignals = () => {
    const [signalData, setSignalData] = useState(null);
    const [activeTab, setActiveTab] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const tableContainerRef = useRef(null);
    const scrollPositionRef = useRef(0);

    // Sütun başlıklarını Türkçeleştir
    const translateColumn = (col) => {
        const translations = {
            'rank': 'Sıra',
            'coin': 'Coin',
            'timeframe': 'Zaman',
            'signal': 'Sinyal',
            'pozisyon_yonu': 'Pozisyon',
            'sinyal_yonu': 'Yeni Sinyal',
            'yon_uyumu': 'Durum',
            'ters_sinyal': 'Ters?',
            'entry_price': 'Giriş',
            'current_price': 'Şu An',
            'pnl_percent': 'Kar/Zarar %',
            'bars_ago': 'Bar',
            'days_ago': 'Gün',
            'trades': 'İşlem',
            'win_rate': 'Başarı %',
            'x_kat': 'X Kat',
            'hedef_roe': 'Hedef ROE',
            'status': 'Durum'
        };
        return translations[col] || col;
    };

    // Hücre içeriğini formatla
    const formatCell = (key, value) => {
        if (value === null || value === undefined) return '-';

        // Ters sinyal sütununu gizle (zaten yon_uyumu'nda gösteriliyor)
        if (key === 'ters_sinyal') return null;

        // Pozisyon yönü (LONG/SHORT)
        if (key === 'pozisyon_yonu') {
            return (
                <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    backgroundColor: value === 'LONG' ? '#23a55922' : '#ed424222',
                    color: value === 'LONG' ? '#23a559' : '#ed4245'
                }}>
                    {value === 'LONG' ? '📈 LONG' : '📉 SHORT'}
                </span>
            );
        }

        // Yeni sinyal yönü
        if (key === 'sinyal_yonu' || key === 'signal') {
            return (
                <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    backgroundColor: value === 'LONG' ? '#5865f222' : '#faa61a22',
                    color: value === 'LONG' ? '#5865f2' : '#faa61a'
                }}>
                    {value === 'LONG' ? '⬆️ LONG' : '⬇️ SHORT'}
                </span>
            );
        }

        // Yön uyumu (AÇIK POZİSYONLAR sekmesinde önemli!)
        // YÖN UYUYOR = Yeşil ✅, TERS SİNYAL = Kırmızı 🔴
        if (key === 'yon_uyumu') {
            const isMatching = value.includes('UYUYOR') || value.includes('AYNI');
            return (
                <span style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '0.95em',
                    backgroundColor: isMatching ? '#23a55944' : '#ed424544',
                    color: isMatching ? '#57F287' : '#ED4245',
                    border: `2px solid ${isMatching ? '#57F287' : '#ED4245'}`,
                    textShadow: isMatching ? '0 0 8px #57F287' : '0 0 8px #ED4245'
                }}>
                    {isMatching ? '✅ YÖN UYUYOR' : '⚠️ TERS SİNYAL'}
                </span>
            );
        }

        // Durum (KAR/ZARAR)
        // YÖN UYUYOR = Yeşil, TERS SİNYAL = Kırmızı
        if (key === 'status') {
            const isMatching = value.includes('UYUYOR') || value.includes('AYNI');
            const isProfit = value.includes('KAR');
            const isTersSignal = value.includes('TERS');

            let bgColor, textColor, displayText;

            if (isMatching) {
                bgColor = '#23a55944';
                textColor = '#57F287';
                displayText = '✅ YÖN UYUYOR';
            } else if (isTersSignal) {
                bgColor = '#ed424544';
                textColor = '#ED4245';
                displayText = '⚠️ TERS SİNYAL';
            } else if (isProfit) {
                bgColor = '#23a55933';
                textColor = '#57F287';
                displayText = value;
            } else {
                bgColor = '#ed424533';
                textColor = '#ED4245';
                displayText = value;
            }

            return (
                <span style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    backgroundColor: bgColor,
                    color: textColor,
                    border: `2px solid ${textColor}`,
                    textShadow: `0 0 8px ${textColor}`
                }}>
                    {displayText}
                </span>
            );
        }

        // Kar/Zarar yüzdesi
        if (key === 'pnl_percent') {
            const isPositive = String(value).includes('+');
            return (
                <span style={{
                    fontWeight: 'bold',
                    color: isPositive ? '#23a559' : '#ed4245'
                }}>
                    {value}
                </span>
            );
        }

        // Coin ismi (Binance Futures linki ile)
        if (key === 'coin') {
            // Eğer coin zaten USDT ile bitiyorsa, tekrar ekleme
            const symbol = value.endsWith('USDT') ? value : `${value}USDT`;
            return (
                <a
                    href={`https://www.binance.com/en/futures/${symbol}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontWeight: 'bold',
                        color: '#f0b232',
                        textDecoration: 'none',
                        cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                    {value}
                </a>
            );
        }

        return String(value);
    };

    // JSON'u yükle - scroll pozisyonunu koru
    const loadSignals = useCallback(async () => {
        try {
            // Mevcut scroll pozisyonunu kaydet
            if (tableContainerRef.current) {
                scrollPositionRef.current = tableContainerRef.current.scrollTop;
            }

            const response = await fetch(`${SIGNAL_JSON_URL}?t=${Date.now()}`);
            const data = await response.json();
            setSignalData(data);
            setLastUpdate(new Date(data.meta.export_time));

            // İlk sekmeyi aktif yap
            if (!activeTab && data.tabs) {
                const firstTab = Object.keys(data.tabs)[0];
                setActiveTab(firstTab);
            }

            // Scroll pozisyonunu geri yükle (kısa gecikme ile DOM güncellensin)
            setTimeout(() => {
                if (tableContainerRef.current && scrollPositionRef.current > 0) {
                    tableContainerRef.current.scrollTop = scrollPositionRef.current;
                }
            }, 50);
        } catch (error) {
            console.error('Signal yükleme hatası:', error);
        }
    }, [activeTab]);

    // İlk yükleme
    useEffect(() => {
        loadSignals();
    }, []);

    // Otomatik yenileme (30 saniyede bir)
    useEffect(() => {
        if (!autoRefresh) return;

        const interval = setInterval(() => {
            loadSignals();
        }, 30000);

        return () => clearInterval(interval);
    }, [autoRefresh]);

    if (!signalData) {
        return (
            <div style={styles.container}>
                <div style={styles.loadingContainer}>
                    <FaSync className="spin" size={40} color="#f0b232" />
                    <p>Sinyaller yükleniyor...</p>
                </div>
            </div>
        );
    }

    const currentTabData = signalData?.tabs?.[activeTab];

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <Link to="/" style={styles.backButton}>
                        <FaArrowLeft /> Ana Menü
                    </Link>
                    <h1 style={styles.title}>
                        <FaBitcoin style={{ color: '#f0b232', marginRight: '10px' }} />
                        Kripto Sinyaller
                    </h1>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {lastUpdate && (
                        <div style={styles.updateTime}>
                            <FaClock /> {lastUpdate.toLocaleTimeString('tr-TR')}
                        </div>
                    )}
                    <label style={styles.autoRefreshLabel}>
                        <input
                            type="checkbox"
                            checked={autoRefresh}
                            onChange={(e) => setAutoRefresh(e.target.checked)}
                            style={{ marginRight: '5px' }}
                        />
                        Otomatik Yenile
                    </label>
                    <button onClick={loadSignals} style={styles.refreshButton}>
                        <FaSync /> Yenile
                    </button>
                </div>
            </div>

            {/* Meta Bilgisi */}
            {signalData?.meta && (
                <div style={styles.metaBar}>
                    <div style={styles.metaItem}>
                        <strong>Toplam Strateji:</strong> {signalData.meta.total_strategies}
                    </div>
                    {signalData.meta.position_coins?.length > 0 && (
                        <div style={styles.metaItem}>
                            <strong>Pozisyondaki Coinler:</strong>{' '}
                            <span style={{ color: '#23a559' }}>
                                {signalData.meta.position_coins.join(', ')}
                            </span>
                        </div>
                    )}
                    <div style={styles.metaItem}>
                        <strong>Versiyon:</strong> {signalData.meta.version}
                    </div>
                </div>
            )}

            {/* Sekmeler */}
            {signalData?.tabs && (
                <div style={styles.tabsContainer}>
                    {Object.entries(signalData.tabs).map(([key, tab]) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            style={{
                                ...styles.tab,
                                ...(activeTab === key ? styles.activeTab : {})
                            }}
                        >
                            <div style={styles.tabTitle}>{tab.title}</div>
                            <div style={styles.tabDesc}>{tab.description}</div>
                            <div style={styles.tabCount}>{tab.count} kayıt</div>
                        </button>
                    ))}
                </div>
            )}

            {/* İçerik */}
            {currentTabData && (
                <div style={styles.content}>
                    <h2 style={styles.contentTitle}>{currentTabData.title}</h2>
                    <p style={styles.contentDesc}>{currentTabData.description}</p>

                    {/* Tablo */}
                    {currentTabData.data?.length > 0 && (
                        <div ref={tableContainerRef} style={styles.tableContainer}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        {Object.keys(currentTabData.data[0])
                                            .filter(col => col !== 'ters_sinyal') // Ters sinyal sütununu gizle
                                            .map((col) => (
                                                <th key={col} style={styles.th}>
                                                    {translateColumn(col)}
                                                </th>
                                            ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTabData.data.map((row, idx) => (
                                        <tr key={idx} style={styles.tr}>
                                            {Object.entries(row)
                                                .filter(([key]) => key !== 'ters_sinyal')
                                                .map(([key, val], colIdx) => (
                                                    <td key={colIdx} style={styles.td}>
                                                        {formatCell(key, val)}
                                                    </td>
                                                ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {(!currentTabData.data || currentTabData.data.length === 0) && (
                        <div style={styles.emptyState}>
                            <p>Bu sekmede henüz veri yok</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#1e1f22',
        minHeight: '100vh',
        color: '#dcddde',
        padding: '20px',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        gap: '20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    backButton: {
        textDecoration: 'none',
        color: '#949ba4',
        fontSize: '0.9em',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    title: {
        margin: 0,
        fontSize: '1.8em',
        display: 'flex',
        alignItems: 'center',
    },
    updateTime: {
        fontSize: '0.85em',
        color: '#949ba4',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    autoRefreshLabel: {
        fontSize: '0.85em',
        color: '#dcddde',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    refreshButton: {
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600',
    },
    metaBar: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        border: '1px solid #1f2023',
    },
    metaItem: {
        fontSize: '0.9em',
        color: '#b9bbbe',
    },
    tabsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '15px',
        marginBottom: '20px',
    },
    tab: {
        backgroundColor: '#2b2d31',
        border: '1px solid #1f2023',
        borderRadius: '8px',
        padding: '15px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s',
    },
    activeTab: {
        backgroundColor: '#5865f2',
        borderColor: '#5865f2',
        boxShadow: '0 4px 12px rgba(88, 101, 242, 0.4)',
    },
    tabTitle: {
        fontSize: '1em',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#fff',
    },
    tabDesc: {
        fontSize: '0.8em',
        color: '#b9bbbe',
        marginBottom: '8px',
    },
    tabCount: {
        fontSize: '0.75em',
        color: '#f0b232',
        fontWeight: 'bold',
    },
    content: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #1f2023',
    },
    contentTitle: {
        margin: '0 0 10px 0',
        color: '#fff',
        fontSize: '1.5em',
    },
    contentDesc: {
        margin: '0 0 20px 0',
        color: '#b9bbbe',
    },
    tableContainer: {
        overflowX: 'auto',
        borderRadius: '6px',
        border: '1px solid #1f2023',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.85em',
    },
    th: {
        backgroundColor: '#202225',
        color: '#fff',
        padding: '12px',
        textAlign: 'left',
        borderBottom: '2px solid #f0b232',
        fontWeight: 'bold',
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },
    tr: {
        borderBottom: '1px solid #1f2023',
    },
    td: {
        padding: '10px 12px',
        color: '#dcddde',
    },
    emptyState: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#949ba4',
        fontSize: '1.1em',
    },
};

export default CryptoSignals;
