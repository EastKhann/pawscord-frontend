// frontend/src/CryptoSignals.js
import { FaArrowLeft, FaSync, FaBitcoin, FaClock, FaChartLine, FaTrophy, FaFilter, FaTimes, FaExternalLinkAlt, FaSortAmountDown, FaSortAmountUp, FaWallet } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useWindowWidth from './hooks/useWindowWidth';
import { formatPrice, parsePnl, getTabConfig, pnlColor } from './CryptoSignals/utils';
import { SignalBadge, StatusBadge } from './CryptoSignals/components';
import S from './CryptoSignals/styles';
import useCryptoSignals from './CryptoSignals/hooks/useCryptoSignals';
import CoinDetailModal from './CryptoSignals/CoinDetailModal';

const CryptoSignals = () => {
    const { isMobile } = useWindowWidth();
    const {
        data, loading, error, lastUpdate, availableFiles, activeFileKey, setActiveFileKey,
        activeMode, setActiveMode, activeTab, setActiveTab, searchQuery, setSearchQuery,
        sortBy, sortDir, viewMode, setViewMode, page, setPage, autoRefresh, setAutoRefresh,
        selectedCoin, setSelectedCoin, tableRef, meta, positionCoins, allTabs, currentTab,
        tabData, processedData, pagedData, totalPages, isPositionsTab, handleSort, stats,
        positionCoinStatus, coinGroups, fetchData
    } = useCryptoSignals();

    const SortHeader = ({ field, children, style: extra }) => (
        <th onClick={() => handleSort(field)} style={{
            ...S.th, cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
            color: sortBy === field ? '#f0b232' : '#b9bbbe', ...extra
        }}>
            {children} {sortBy === field && (sortDir === 'asc' ? <FaSortAmountUp style={{ fontSize: '0.7em' }} /> : <FaSortAmountDown style={{ fontSize: '0.7em' }} />)}
        </th>
    );

    if (loading && !data) {
        return (<div style={S.page}><div style={S.loadingBox}>
            <div className="crypto-spin" style={{ fontSize: 48 }}>{'\u20BF'}</div>
            <p style={{ color: '#f0b232', fontSize: '1.1em', marginTop: 16 }}>Kripto Verileri Yükleniyor...</p>
        </div></div>);
    }

    if (error && !data) {
        return (<div style={S.page}><div style={{ textAlign: 'center', marginTop: 80 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>{'\u26A0\uFE0F'}</div>
            <h3 style={{ color: '#da373c', marginBottom: 8 }}>{error}</h3>
            <button onClick={() => fetchData(activeFileKey)} style={S.primaryBtn}>Tekrar Dene</button>
        </div></div>);
    }

    return (
        <div style={S.page}>
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
                    {lastUpdate && <span style={S.updateTime}><FaClock /> {lastUpdate.toLocaleTimeString('tr-TR')}</span>}
                    <label style={S.checkboxLabel}><input type="checkbox" checked={autoRefresh} onChange={e => setAutoRefresh(e.target.checked)} /> Oto</label>
                    <button onClick={() => fetchData(activeFileKey)} style={S.primaryBtn}>
                        <FaSync className={loading ? 'crypto-spin' : ''} /> Yenile
                    </button>
                </div>
            </header>

            {availableFiles.length > 1 && (
                <div style={S.fileTabBar}>
                    {availableFiles.map(f => (
                        <button key={f.key} onClick={() => { if (activeFileKey !== f.key) setActiveFileKey(f.key); }}
                            style={{ ...S.fileTabBtn, ...(activeFileKey === f.key ? S.fileTabBtnActive : {}) }}>
                            {'\uD83D\uDCCA'} {f.label}
                            {activeFileKey === f.key && loading && <span className="crypto-spin" style={{ marginLeft: 6, fontSize: '0.85em' }}>{'\u23F3'}</span>}
                        </button>
                    ))}
                </div>
            )}

            <div style={S.modeToggle}>
                {[{ key: 'balance_mode', icon: <FaChartLine />, label: isMobile ? 'Balance' : '\uD83D\uDCB0 Balance Sıralama', color: '#f0b232' },
                  { key: 'winrate_mode', icon: <FaTrophy />, label: isMobile ? 'Winrate' : '\uD83C\uDFC6 Winrate Sıralama', color: '#23a559' }
                ].map(m => (
                    <button key={m.key} onClick={() => setActiveMode(m.key)}
                        style={{ ...S.modeBtn, ...(activeMode === m.key ? S.modeBtnActive : {}), borderColor: activeMode === m.key ? m.color : '#40444b' }}>
                        {m.icon} {m.label}
                    </button>
                ))}
            </div>

            {stats && (
                <div style={S.statsBar}>
                    {[
                        { num: stats.total, label: 'Strateji' },
                        { num: stats.uniqueCoins, label: 'Coin' },
                        { num: isPositionsTab ? stats.uyumluSinyal : stats.profits, label: isPositionsTab ? '\u2705 Uyumlu' : 'Kârda', color: '#23a559' },
                        { num: isPositionsTab ? stats.tersSinyal : stats.losses, label: isPositionsTab ? '\u26A0\uFE0F Ters Sinyal' : 'Zararda', color: '#da373c' },
                        { num: `${stats.avgPnl >= 0 ? '+' : ''}${stats.avgPnl.toFixed(2)}%`, label: 'Ort. PNL', color: stats.avgPnl >= 0 ? '#23a559' : '#da373c' },
                        { num: `${stats.avgWr.toFixed(1)}%`, label: 'Ort. WR', color: stats.avgWr >= 50 ? '#23a559' : '#f0b232' },
                    ].map(({ num, label, color }) => (
                        <div key={label} style={S.statCard}>
                            <span style={{ ...S.statNum, ...(color ? { color } : {}) }}>{num}</span>
                            <span style={S.statLabel}>{label}</span>
                        </div>
                    ))}
                </div>
            )}

            <div style={S.tabBar}>
                {Object.keys(allTabs).map(tabKey => {
                    const cfg = getTabConfig(tabKey);
                    const tab = allTabs[tabKey];
                    const isActive = activeTab === tabKey;
                    return (
                        <button key={tabKey} onClick={() => setActiveTab(tabKey)}
                            style={{ ...S.tabBtn, ...(isActive ? { backgroundColor: cfg.color, borderColor: cfg.color, color: '#fff', boxShadow: `0 4px 14px ${cfg.color}44` } : {}) }}>
                            <span>{cfg.icon}</span>
                            <span>{isMobile ? cfg.shortLabel : cfg.label}</span>
                            <span style={{ backgroundColor: isActive ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: 12, fontSize: '0.75em', fontWeight: 700 }}>
                                {tab?.count || 0}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div style={S.filterBar}>
                <div style={S.searchBox}>
                    <FaFilter style={{ color: '#949ba4', flexShrink: 0 }} />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Coin ara... (BTC, ETH, SOL)" style={S.searchInput} />
                    {searchQuery && <button onClick={() => setSearchQuery('')} style={S.clearBtn}><FaTimes /></button>}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#949ba4', fontSize: '0.85em' }}>{processedData.length} sonuç</span>
                    <button onClick={() => setViewMode(v => v === 'table' ? 'cards' : 'table')} style={S.viewToggle}
                        title={viewMode === 'table' ? 'Kart görünümü' : 'Tablo görünümü'}>
                        {viewMode === 'table' ? '\uD83C\uDCCF ' : '\uD83D\uDCCB '}
                    </button>
                </div>
            </div>

            {isPositionsTab && positionCoins.length > 0 && (
                <div style={S.posBanner}>
                    <strong><FaWallet style={{ marginRight: 6 }} />Açık Pozisyon ({positionCoins.length}):</strong>
                    {positionCoins.map((c, i) => {
                        const isTers = positionCoinStatus[c]?.hasTersSinyal;
                        return (
                            <span key={c} style={{
                                ...S.posTag,
                                backgroundColor: isTers ? 'rgba(218,55,60,0.15)' : 'rgba(35,165,89,0.15)',
                                color: isTers ? '#da373c' : '#23a559',
                                border: `1px solid ${isTers ? 'rgba(218,55,60,0.4)' : 'rgba(35,165,89,0.4)'}`,
                            }}>
                                {i + 1}. {isTers ? '\u26A0\uFE0F ' : '\u2705 '} {c.replace('USDT', '')}
                            </span>
                        );
                    })}
                </div>
            )}

            {!currentTab ? (
                <div style={S.emptyState}><div style={{ fontSize: 48, marginBottom: 12 }}>{'\uD83D\uDCED'}</div><p>Bu modda veri bulunamadı</p></div>
            ) : viewMode === 'cards' ? (
                <div style={S.cardGrid}>
                    {Object.entries(coinGroups).map(([coin, rows]) => {
                        const goodRows = isPositionsTab ? rows.filter(r => r.ters_sinyal !== true) : rows.filter(r => parsePnl(r.pnl_percent) > 0);
                        const badRows = isPositionsTab ? rows.filter(r => r.ters_sinyal === true) : rows.filter(r => parsePnl(r.pnl_percent) < 0);
                        const avgPnl = rows.reduce((s, r) => s + parsePnl(r.pnl_percent), 0) / rows.length;
                        const bestWr = Math.max(...rows.map(r => parseFloat(String(r.win_rate || '0').replace('%', ''))));
                        const firstRow = rows[0] || {};
                        return (
                            <div key={coin} style={S.coinCard}
                                onClick={() => setSelectedCoin({ name: coin, data: rows })}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = '#f0b232'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#2f3136'; }}>
                                <div style={S.cardHeader}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={S.cardCoinName}>{coin.replace('USDT', '')}</span>
                                        <SignalBadge value={firstRow.signal || firstRow.sinyal_yonu || '-'} />
                                    </div>
                                    <span style={{ color: '#949ba4', fontSize: '0.78em' }}>{rows.length} str.</span>
                                </div>
                                <div style={S.cardBody}>
                                    <div style={S.cardRow}><span style={S.cardRowLabel}>Fiyat</span><span style={S.cardRowValue}>${formatPrice(firstRow.current_price)}</span></div>
                                    <div style={S.cardRow}><span style={S.cardRowLabel}>Ort. PNL</span><span style={{ ...S.cardRowValue, color: pnlColor(avgPnl.toString()), fontWeight: 700 }}>{avgPnl >= 0 ? '+' : ''}{avgPnl.toFixed(2)}%</span></div>
                                    <div style={S.cardRow}><span style={S.cardRowLabel}>En İyi WR</span><span style={{ ...S.cardRowValue, color: bestWr >= 50 ? '#23a559' : '#da373c' }}>{bestWr.toFixed(1)}%</span></div>
                                </div>
                                <div style={S.cardFooter}>
                                    <div style={S.miniBarBg}><div style={{ ...S.miniBar, width: `${(goodRows.length / Math.max(rows.length, 1)) * 100}%` }} /></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75em', marginTop: 4 }}>
                                        <span style={{ color: '#23a559' }}>{isPositionsTab ? '\u2705 ' : '\u2713 '} {goodRows.length}</span>
                                        <span style={{ color: '#da373c' }}>{isPositionsTab ? '\u26A0\uFE0F ' : '\u2717 '} {badRows.length}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <>
                    <div ref={tableRef} style={S.tableWrap}>
                        <table style={S.table}>
                            <thead><tr>
                                <SortHeader field="rank">#</SortHeader>
                                <SortHeader field="coin">Coin</SortHeader>
                                <th style={S.th}>TF</th><th style={S.th}>Sinyal</th>
                                {isPositionsTab && <th style={S.th}>Poz.Yönü</th>}
                                {isPositionsTab && <th style={S.th}>Uyum</th>}
                                <th style={S.th}>Giriş</th><th style={S.th}>Güncel</th>
                                <SortHeader field="pnl">PNL%</SortHeader>
                                <SortHeader field="win_rate">WR%</SortHeader>
                                <SortHeader field="trades">İşlem</SortHeader>
                                <SortHeader field="x_kat">X Kat</SortHeader>
                                <th style={S.th}>Hedef ROE</th><th style={S.th}>Durum</th><th style={S.th}>Link</th>
                            </tr></thead>
                            <tbody>
                                {pagedData.length === 0 ? (
                                    <tr><td colSpan={isPositionsTab ? 15 : 13} style={{ textAlign: 'center', padding: 40, color: '#949ba4' }}>
                                        {searchQuery ? `"${searchQuery}" için sonuç bulunamadı` : 'Bu sekmede veri yok'}
                                    </td></tr>
                                ) : pagedData.map((item, idx) => {
                                    const coinShort = (item.coin || '').replace('USDT', '');
                                    const binanceSymbol = item.coin?.endsWith('USDT') ? item.coin : `${item.coin}USDT`;
                                    const rowBg = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)';
                                    return (
                                        <tr key={`${item.rank}-${item.coin}-${item.timeframe}-${idx}`}
                                            style={{ backgroundColor: rowBg, transition: 'background-color 0.15s' }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(88,101,242,0.06)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = rowBg}>
                                            <td style={S.td}><span style={{ color: '#949ba4', fontWeight: 600 }}>{item.rank}</span></td>
                                            <td style={S.td}><span style={{ color: '#f0b232', fontWeight: 700, cursor: 'pointer' }}
                                                onClick={() => setSelectedCoin({ name: item.coin, data: tabData.filter(r => r.coin === item.coin) })}>{coinShort}</span></td>
                                            <td style={S.td}><span style={S.tfBadge}>{item.timeframe}</span></td>
                                            <td style={S.td}><SignalBadge value={item.signal || item.sinyal_yonu || '-'} /></td>
                                            {isPositionsTab && <td style={S.td}><SignalBadge value={item.pozisyon_yonu || '-'} /></td>}
                                            {isPositionsTab && <td style={S.td}><span style={{ fontSize: '0.8em', fontWeight: 600, color: item.ters_sinyal ? '#da373c' : '#23a559' }}>{item.ters_sinyal ? '\u26A0\uFE0F Ters' : '\u2705 Uyumlu'}</span></td>}
                                            <td style={{ ...S.td, color: '#b9bbbe', fontSize: '0.85em' }}>${formatPrice(item.entry_price)}</td>
                                            <td style={{ ...S.td, color: '#dbdee1', fontSize: '0.85em' }}>${formatPrice(item.current_price)}</td>
                                            <td style={{ ...S.td, color: pnlColor(item.pnl_percent), fontWeight: 700 }}>{item.pnl_percent || '-'}</td>
                                            <td style={{ ...S.td, fontWeight: 600, color: parseFloat(String(item.win_rate || '0').replace('%', '')) >= 50 ? '#23a559' : '#da373c' }}>{item.win_rate || '-'}</td>
                                            <td style={S.td}>{item.trades || '-'}</td>
                                            <td style={{ ...S.td, color: '#f0b232', fontWeight: 700 }}>{item.x_kat || '-'}</td>
                                            <td style={{ ...S.td, color: '#5865f2', fontWeight: 600 }}>{item.hedef_roe || '-'}</td>
                                            <td style={S.td}><StatusBadge status={item.status} /></td>
                                            <td style={S.td}><a href={`https://www.binance.com/en/futures/${binanceSymbol}`} target="_blank" rel="noopener noreferrer" style={S.linkBtn} title={`${coinShort} Binance Futures`}><FaExternalLinkAlt /></a></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 1 && (
                        <div style={S.pagination}>
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ ...S.pageBtn, opacity: page === 1 ? 0.4 : 1 }}>{'\u25C4'}</button>
                            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                let num; if (totalPages <= 7) num = i + 1; else if (page <= 4) num = i + 1; else if (page >= totalPages - 3) num = totalPages - 6 + i; else num = page - 3 + i;
                                return (<button key={num} onClick={() => setPage(num)} style={{ ...S.pageNumBtn, ...(page === num ? S.pageNumActive : {}) }}>{num}</button>);
                            })}
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ ...S.pageBtn, opacity: page === totalPages ? 0.4 : 1 }}>{'\u25BA'}</button>
                        </div>
                    )}
                </>
            )}

            <CoinDetailModal selectedCoin={selectedCoin} isPositionsTab={isPositionsTab} onClose={() => setSelectedCoin(null)} />
        </div>
    );
};

export default CryptoSignals;