// frontend/src/CryptoDashboard.js
// v3.0 — Balance/Winrate Mode + 5 Tab — Decomposed Orchestrator

import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBitcoin, FaSync, FaWallet, FaExchangeAlt, FaTimes, FaBug, FaChartLine, FaTrophy, FaFilter } from 'react-icons/fa';
import useCryptoData from './CryptoDashboard/hooks/useCryptoData';
import { safeRender, formatPrice, pnlColor, TAB_CONFIG, LivePrice, SignalBadge, StatusBadge } from './CryptoDashboard/helpers';
import TradeModal from './CryptoDashboard/TradeModal';
import PortfolioModal from './CryptoDashboard/PortfolioModal';
import styles from './CryptoDashboard/styles';

const CryptoDashboard = () => {
    const api = useCryptoData();

    const SortHeader = ({ field, children, style: extraStyle }) => (
        <th onClick={() => api.handleSort(field)} style={{
            cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
            color: api.sortBy === field ? '#f0b232' : '#949ba4',
            ...extraStyle
        }}>
            {children} {api.sortBy === field ? (api.sortDir === 'asc' ? '\u25B2' : '\u25BC') : ''}
        </th>
    );

    return (
        <div style={{ ...styles.pageContainer, paddingTop: api.isMobile ? 'max(10px, env(safe-area-inset-top))' : '20px' }}>

            {/* HEADER */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <Link to="/" style={styles.backButton}><FaArrowLeft /> Ana Men\u00FC</Link>
                    <h1 style={styles.title}>
                        <FaBitcoin style={{ color: '#f0b232', marginRight: '10px' }} />
                        Crypto AI Dashboard
                        {api.meta.version && <span style={{ fontSize: '0.5em', color: '#949ba4', marginLeft: 10 }}>v{api.meta.version}</span>}
                    </h1>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button onClick={() => api.setShowPortfolio(true)} style={styles.portfolioBtn}>
                        <FaWallet /> C\u00FCzdan (${formatPrice(api.portfolio?.balance || '0')})
                    </button>
                    <button onClick={api.fetchData} style={styles.refreshButton}>
                        <FaSync className={api.loading ? 'spin' : ''} /> {api.loading ? '' : 'Yenile'}
                    </button>
                </div>
            </div>

            {/* META BAR */}
            {api.meta.export_date && (
                <div style={styles.metaBar}>
                    <span>\uD83D\uDCC5 Son G\u00FCncelleme: <strong>{api.meta.export_date}</strong></span>
                    <span>\uD83D\uDCCA Strateji: <strong>{api.activeMode === 'balance_mode' ? api.meta.balance_strategies : api.meta.winrate_strategies}</strong></span>
                    {api.positionCoins.length > 0 && (
                        <span>\uD83D\uDCBC A\u00E7\u0131k Poz: <strong style={{ color: '#f0b232' }}>{api.positionCoins.length} Coin</strong></span>
                    )}
                </div>
            )}

            {api.loading && !api.data ? (
                <div style={styles.loader}>
                    <div className="spin" style={{ fontSize: 40, display: 'inline-block' }}>\u23F3</div>
                    <p>Kripto Verileri Y\u00FCkleniyor...</p>
                </div>
            ) : api.errorMsg ? (
                <div style={{ textAlign: 'center', marginTop: 50 }}>
                    <h3 style={{ color: '#da373c' }}>\u26A0\uFE0F {api.errorMsg}</h3>
                    {api.debugInfo && (
                        <div style={{ backgroundColor: '#2b2d31', padding: 10, margin: '20px auto', maxWidth: 600, borderRadius: 8, textAlign: 'left' }}>
                            <strong style={{ color: '#f0b232' }}><FaBug /> Hata Verisi:</strong>
                            <pre style={{ color: '#dbdee1', fontSize: '0.8em', whiteSpace: 'pre-wrap' }}>{api.debugInfo}</pre>
                        </div>
                    )}
                    <button onClick={api.fetchData} style={{ ...styles.confirmBtn, maxWidth: 200, margin: '20px auto' }}>Tekrar Dene</button>
                </div>
            ) : (
                <div style={styles.content}>

                    {/* MODE TOGGLE */}
                    <div style={styles.modeToggleContainer}>
                        <button
                            onClick={() => api.setActiveMode('balance_mode')}
                            style={{
                                ...styles.modeToggleBtn,
                                ...(api.activeMode === 'balance_mode' ? styles.modeToggleActive : {}),
                                borderColor: api.activeMode === 'balance_mode' ? '#f0b232' : '#40444b'
                            }}
                        >
                            <FaChartLine style={{ marginRight: 6 }} />
                            {api.isMobile ? 'Balance' : '\uD83D\uDCB0 Balance S\u0131ralama'}
                        </button>
                        <button
                            onClick={() => api.setActiveMode('winrate_mode')}
                            style={{
                                ...styles.modeToggleBtn,
                                ...(api.activeMode === 'winrate_mode' ? styles.modeToggleActive : {}),
                                borderColor: api.activeMode === 'winrate_mode' ? '#23a559' : '#40444b'
                            }}
                        >
                            <FaTrophy style={{ marginRight: 6 }} />
                            {api.isMobile ? 'Winrate' : '\uD83C\uDFC6 Winrate S\u0131ralama'}
                        </button>
                    </div>

                    {/* TAB BAR */}
                    <div style={styles.tabBar}>
                        <div style={styles.tabs}>
                            {api.modeData && api.modeData.tabs && Object.keys(api.modeData.tabs).map(tabKey => {
                                const config = TAB_CONFIG[tabKey] || { icon: '\uD83D\uDCCB', shortLabel: tabKey, color: '#949ba4' };
                                const tab = api.modeData.tabs[tabKey];
                                const isActive = api.activeTab === tabKey;
                                return (
                                    <button
                                        key={tabKey}
                                        onClick={() => api.setActiveTab(tabKey)}
                                        style={{
                                            ...styles.tabButton,
                                            ...(isActive ? { ...styles.activeTab, backgroundColor: config.color, borderColor: config.color } : {})
                                        }}
                                    >
                                        <span>{config.icon}</span>
                                        <span>{api.isMobile ? config.shortLabel : (tab.title || tabKey)}</span>
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

                    {/* SEARCH & FILTER */}
                    <div style={styles.filterBar}>
                        <div style={styles.searchBox}>
                            <FaFilter style={{ color: '#949ba4', marginRight: 8 }} />
                            <input
                                type="text"
                                value={api.searchQuery}
                                onChange={e => api.setSearchQuery(e.target.value)}
                                placeholder="Coin ara... (BTC, ETH, SOL)"
                                style={styles.searchInput}
                            />
                            {api.searchQuery && (
                                <button onClick={() => api.setSearchQuery('')} style={styles.clearSearchBtn}><FaTimes /></button>
                            )}
                        </div>
                        <div style={styles.resultInfo}>
                            <span style={{ color: '#949ba4', fontSize: '0.85em' }}>
                                {api.processedData.length} sonu\u00E7 {api.searchQuery && `"${api.searchQuery}" i\u00E7in`}
                            </span>
                        </div>
                    </div>

                    {/* POSITION COINS BANNER */}
                    {api.isPositionsTab && api.positionCoins.length > 0 && (
                        <div style={styles.positionBanner}>
                            <strong>\uD83D\uDCBC A\u00E7\u0131k Pozisyon ({api.positionCoins.length}):</strong>{' '}
                            {api.positionCoins.map((c, i) => {
                                const status = api.positionCoinStatus[c];
                                const isTers = status?.hasTersSinyal;
                                return (
                                    <span key={c} style={{
                                        ...styles.positionCoinTag,
                                        backgroundColor: isTers ? 'rgba(218,55,60,0.15)' : 'rgba(35,165,89,0.15)',
                                        color: isTers ? '#da373c' : '#23a559',
                                        border: `1px solid ${isTers ? 'rgba(218,55,60,0.4)' : 'rgba(35,165,89,0.4)'}`,
                                    }}>
                                        {i + 1}. {isTers ? '\u26A0\uFE0F' : '\u2705'} {c.replace('USDT', '')}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                    {/* DATA TABLE */}
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeaderRow}>
                                    <SortHeader field="rank">#</SortHeader>
                                    <SortHeader field="coin">Coin</SortHeader>
                                    <th style={{ color: '#949ba4' }}>TF</th>
                                    <th style={{ color: '#949ba4' }}>Sinyal</th>
                                    {api.isPositionsTab && <>
                                        <th style={{ color: '#949ba4' }}>Poz.Y\u00F6n\u00FC</th>
                                        <th style={{ color: '#949ba4' }}>Uyum</th>
                                    </>}
                                    <th style={{ color: '#949ba4' }}>Giri\u015F</th>
                                    <th style={{ color: '#949ba4' }}>G\u00FCncel</th>
                                    <SortHeader field="pnl">PNL%</SortHeader>
                                    <SortHeader field="win_rate">WR%</SortHeader>
                                    <SortHeader field="trades">\u0130\u015Flem</SortHeader>
                                    <SortHeader field="x_kat">X Kat</SortHeader>
                                    <th style={{ color: '#949ba4' }}>Hedef</th>
                                    <th style={{ color: '#949ba4' }}>Durum</th>
                                    <th style={{ color: '#949ba4' }}>Al/Sat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {api.pagedData.length === 0 ? (
                                    <tr>
                                        <td colSpan={api.isPositionsTab ? 15 : 13} style={{ textAlign: 'center', padding: 40, color: '#949ba4' }}>
                                            {api.searchQuery ? 'Arama sonucu bulunamad\u0131.' : 'Bu sekmede veri yok.'}
                                        </td>
                                    </tr>
                                ) : api.pagedData.map((item, idx) => {
                                    const livePrice = api.getLivePrice(item.coin);
                                    const coinSymbol = api.extractCoinSymbol(item.coin)?.replace('USDT', '') || item.coin;
                                    const rowBg = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)';
                                    return (
                                        <tr key={`${item.rank}-${item.coin}-${item.timeframe}-${idx}`} style={{
                                            backgroundColor: rowBg, transition: 'background-color 0.2s'
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
                                            {api.isPositionsTab && <>
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
                                                    onClick={() => api.setTradeData({ coin: coinSymbol, price: livePrice })}
                                                    style={{
                                                        ...styles.miniTradeBtn,
                                                        opacity: livePrice ? 1 : 0.4,
                                                        cursor: livePrice ? 'pointer' : 'not-allowed'
                                                    }}
                                                    disabled={!livePrice}
                                                    title={livePrice ? `${coinSymbol} Al/Sat` : 'Canl\u0131 fiyat bekleniyor'}
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

                    {/* PAGINATION */}
                    {api.totalPages > 1 && (
                        <div style={styles.pagination}>
                            <button
                                onClick={() => api.setPage(p => Math.max(1, p - 1))}
                                disabled={api.page === 1}
                                style={{ ...styles.pageBtn, opacity: api.page === 1 ? 0.4 : 1 }}
                            >
                                \u25C4 \u00D6nceki
                            </button>
                            <div style={styles.pageNumbers}>
                                {Array.from({ length: Math.min(api.totalPages, 7) }, (_, i) => {
                                    let pageNum;
                                    if (api.totalPages <= 7) pageNum = i + 1;
                                    else if (api.page <= 4) pageNum = i + 1;
                                    else if (api.page >= api.totalPages - 3) pageNum = api.totalPages - 6 + i;
                                    else pageNum = api.page - 3 + i;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => api.setPage(pageNum)}
                                            style={{
                                                ...styles.pageNumBtn,
                                                ...(api.page === pageNum ? styles.pageNumActive : {})
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>
                            <button
                                onClick={() => api.setPage(p => Math.min(api.totalPages, p + 1))}
                                disabled={api.page === api.totalPages}
                                style={{ ...styles.pageBtn, opacity: api.page === api.totalPages ? 0.4 : 1 }}
                            >
                                Sonraki \u25BA
                            </button>
                        </div>
                    )}

                </div>
            )}

            {/* MODALS */}
            {api.showPortfolio && <PortfolioModal portfolio={api.portfolio} onClose={() => api.setShowPortfolio(false)} />}
            {api.tradeData && (
                <TradeModal
                    coin={api.tradeData.coin}
                    initialPrice={api.tradeData.price}
                    livePrices={api.prices}
                    portfolio={api.portfolio}
                    onClose={() => api.setTradeData(null)}
                    onTrade={api.handleTrade}
                />
            )}
        </div>
    );
};

export default CryptoDashboard;