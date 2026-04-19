// frontend/src/CryptoSignals.js
import { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
    FaArrowLeft,
    FaSync,
    FaBitcoin,
    FaClock,
    FaChartLine,
    FaTrophy,
    FaFilter,
    FaTimes,
    FaExternalLinkAlt,
    FaSortAmountDown,
    FaSortAmountUp,
    FaWallet,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useWindowWidth from '../hooks/useWindowWidth';
import { formatPrice, parsePnl, getTabConfig, pnlColor } from './utils';
import { SignalBadge, StatusBadge } from './components';
import S from './styles';
import useCryptoSignals from './hooks/useCryptoSignals';
import CoinDetailModal from './CoinDetailModal';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const _st1008 = { ...S.modeBtn, color: '#f0b232', borderColor: '#f0b232', fontWeight: 700 };
const _st1009 = { ...S.cardRowValue, fontWeight: 700 };
const _st1010 = { ...S.cardRowValue, fontWeight: 700 };
const _st1011 = S.td;
const _st1012 = S.td;
const _st1013 = S.td;
const _st1014 = S.td;
const _st1015 = S.td;
const _st1016 = S.td;
const _st1017 = S.td;
const _st1018 = S.td;
const _st1019 = S.td;
const _st1020 = S.td;

const formatBalance = (val) => {
    const n = parseFloat(val || 0);
    if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
    return n.toFixed(0);
};

const CryptoSignals = () => {
    const { t } = useTranslation();
    const { isMobile } = useWindowWidth();
    const {
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
        isBL,
        tersSignalSayisi,
    } = useCryptoSignals();

    const handleAutoRefreshChange = useCallback(
        (e) => setAutoRefresh(e.target.checked),
        [setAutoRefresh]
    );
    const handleRefresh = useCallback(() => fetchData(activeFileKey), [fetchData, activeFileKey]);
    const handleSearchChange = useCallback((e) => setSearchQuery(e.target.value), [setSearchQuery]);
    const handleClearSearch = useCallback(() => setSearchQuery(''), [setSearchQuery]);
    const handleToggleView = useCallback(
        () => setViewMode((v) => (v === 'table' ? 'cards' : 'table')),
        [setViewMode]
    );
    const handleCloseModal = useCallback(() => setSelectedCoin(null), [setSelectedCoin]);
    const handlePrevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), [setPage]);
    const handleNextPage = useCallback(
        () => setPage((p) => Math.min(totalPages, p + 1)),
        [setPage, totalPages]
    );

    const SortHeader = ({ field, children, style: extra }) => (
        <th
            onClick={() => handleSort(field)}
            style={{
                ...S.th,
                cursor: 'pointer',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                color: sortBy === field ? '#f0b232' : '#b5bac1',
                ...extra,
            }}
        >
            {children}{' '}
            {sortBy === field && (sortDir === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />)}
        </th>
    );

    if (loading && !data) {
        return (
            <div style={S.page}>
                <div style={S.loadingBox}>
                    <div aria-label="format balance" className="crypto-spin">
                        ₿
                    </div>
                    <p>{t('crypto.loading', 'Kripto Verileri Yükleniyor...')}</p>
                </div>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div style={S.page}>
                <div>
                    <div>⚠️</div>
                    <h3>{error}</h3>
                    <button onClick={handleRefresh} style={S.primaryBtn}>
                        {t('crypto.retry', 'Tekrar Dene')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={S.page}>
            <header style={S.header}>
                <div style={S.headerLeft}>
                    <Link to="/" style={S.backBtn}>
                        <FaArrowLeft /> {t('crypto.back', 'Geri')}
                    </Link>
                    <h1 style={S.title}>
                        <FaBitcoin />
                        <span>{t('crypto.title', 'Kripto Sinyalleri')}</span>
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
                        <input
                            type="checkbox"
                            checked={autoRefresh}
                            onChange={handleAutoRefreshChange}
                        />{' '}
                        {t('crypto.auto', 'Otomatik')}
                    </label>
                    <button onClick={handleRefresh} style={S.primaryBtn}>
                        <FaSync className={loading ? 'crypto-spin' : ''} />{' '}
                        {t('crypto.refresh', 'Yenile')}
                    </button>
                </div>
            </header>

            {availableFiles.length > 1 && (
                <div style={S.fileTabBar}>
                    {availableFiles.map((f) => {
                        const isBoss = /Final Boss|Tanrı|Poseidon/.test(f.label);
                        const isActive = activeFileKey === f.key;
                        return (
                            <button
                                key={f.key}
                                onClick={() => {
                                    if (!isActive) setActiveFileKey(f.key);
                                }}
                                style={{
                                    ...S.fileTabBtn,
                                    ...(isBoss && !isActive ? S.fileTabBtnBoss : {}),
                                    ...(isActive
                                        ? isBoss
                                            ? S.fileTabBtnBossActive
                                            : S.fileTabBtnActive
                                        : {}),
                                }}
                            >
                                {f.label}
                                {isActive && loading && <span className="crypto-spin">⏳</span>}
                            </button>
                        );
                    })}
                </div>
            )}

            <div style={S.modeToggle}>
                {isBL ? (
                    <div style={_st1008}>🎯 {t('crypto.blSignalMode', 'BL Sinyal Modu')}</div>
                ) : (
                    [
                        {
                            key: 'balance_mode',
                            icon: <FaChartLine />,
                            label: isMobile
                                ? 'Bakiye'
                                : `💰 ${t('crypto.balanceSort', 'Bakiye Sıralaması')}`,
                            color: '#f0b232',
                        },
                        {
                            key: 'winrate_mode',
                            icon: <FaTrophy />,
                            label: isMobile
                                ? 'Kazan Oranı'
                                : `🏆 ${t('crypto.winrateSort', 'Kazanma Oranı Sıralaması')}`,
                            color: '#23a559',
                        },
                    ].map((m) => (
                        <button
                            key={m.key}
                            onClick={() => setActiveMode(m.key)}
                            style={{
                                ...S.modeBtn,
                                ...(activeMode === m.key ? S.modeBtnActive : {}),
                                borderColor: activeMode === m.key ? m.color : '#1e2024',
                            }}
                        >
                            {m.icon} {m.label}
                        </button>
                    ))
                )}
            </div>

            {stats && (
                <div style={S.statsBar}>
                    {(stats.isBL
                        ? [
                              { num: stats.total, label: t('crypto.signal', 'Signal') },
                              { num: stats.uniqueCoins, label: t('crypto.coin', 'Coin') },
                              {
                                  num: stats.profits,
                                  label: t('crypto.inAdvantage', 'In Advantage'),
                                  color: '#23a559',
                              },
                              {
                                  num: stats.losses,
                                  label: t('crypto.disadvantage', 'Disadvantage'),
                                  color: '#da373c',
                              },
                              {
                                  num: `${stats.avgPnl >= 0 ? '+' : ''}${stats.avgPnl.toFixed(2)}%`,
                                  label: t('crypto.avgAdvantage', 'Avg Advantage'),
                                  color: stats.avgPnl >= 0 ? '#23a559' : '#da373c',
                              },
                              {
                                  num: `${stats.avgWr.toFixed(1)}%`,
                                  label: t('crypto.avgWR', 'Avg WR'),
                                  color: stats.avgWr >= 50 ? '#23a559' : '#f0b232',
                              },
                              {
                                  num: `${(stats.avgBl || 0).toFixed(2)}%`,
                                  label: t('crypto.avgBL', 'Avg BL%'),
                                  color: '#e74c3c',
                              },
                          ]
                        : [
                              { num: stats.total, label: t('crypto.strategy', 'Strategy') },
                              { num: stats.uniqueCoins, label: t('crypto.coin', 'Coin') },
                              {
                                  num: isPositionsTab ? stats.uyumluSignal : stats.profits,
                                  label: isPositionsTab
                                      ? `✅ ${t('crypto.aligned', 'Aligned')}`
                                      : t('crypto.inProfit', 'In Profit'),
                                  color: '#23a559',
                              },
                              {
                                  num: isPositionsTab ? stats.tersSignal : stats.losses,
                                  label: isPositionsTab
                                      ? `⚠️ ${t('crypto.counterSignals', 'Counter Signals')}`
                                      : t('crypto.inLoss', 'In Loss'),
                                  color: '#da373c',
                              },
                              {
                                  num: `${stats.avgPnl >= 0 ? '+' : ''}${stats.avgPnl.toFixed(2)}%`,
                                  label: t('crypto.avgPNL', 'Avg PNL'),
                                  color: stats.avgPnl >= 0 ? '#23a559' : '#da373c',
                              },
                              {
                                  num: `${stats.avgWr.toFixed(1)}%`,
                                  label: t('crypto.avgWR', 'Avg WR'),
                                  color: stats.avgWr >= 50 ? '#23a559' : '#f0b232',
                              },
                          ]
                    ).map(({ num, label, color }) => (
                        <div key={label} style={S.statCard}>
                            <span style={{ ...S.statNum, ...(color ? { color } : {}) }}>{num}</span>
                            <span style={S.statLabel}>{label}</span>
                        </div>
                    ))}
                </div>
            )}

            <div style={S.tabBar}>
                {Object.keys(allTabs).map((tabKey) => {
                    const cfg = getTabConfig(tabKey);
                    const tab = allTabs[tabKey];
                    const isActive = activeTab === tabKey;
                    return (
                        <button
                            key={tabKey}
                            onClick={() => setActiveTab(tabKey)}
                            style={{
                                ...S.tabBtn,
                                ...(isActive
                                    ? {
                                          backgroundColor: cfg.color,
                                          borderColor: cfg.color,
                                          color: '#fff',
                                          boxShadow: `0 4px 14px ${cfg.color}44`,
                                      }
                                    : {}),
                            }}
                        >
                            <span>{cfg.icon}</span>
                            <span>{isMobile ? cfg.shortLabel : cfg.label}</span>
                            <span
                                style={{
                                    backgroundColor: isActive
                                        ? 'rgba(0,0,0,0.3)'
                                        : 'rgba(255,255,255,0.08)',
                                    padding: '2px 8px',
                                    borderRadius: 12,
                                    fontSize: '0.75em',
                                    fontWeight: 700,
                                }}
                            >
                                {tab?.count || 0}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div style={S.filterBar}>
                <div style={S.searchBox}>
                    <FaFilter />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder={t(
                            'crypto.searchPlaceholder',
                            'Coin search... (BTC, ETH, SOL)'
                        )}
                        style={S.searchInput}
                    />
                    {searchQuery && (
                        <button onClick={handleClearSearch} style={S.clearBtn}>
                            <FaTimes />
                        </button>
                    )}
                </div>
                <div>
                    <span>
                        {processedData.length} {t('crypto.result', 'result')}
                    </span>
                    <button
                        onClick={handleToggleView}
                        style={S.viewToggle}
                        title={
                            viewMode === 'table'
                                ? t('crypto.cardView', 'Card view')
                                : t('crypto.tableView', 'Table view')
                        }
                    >
                        {viewMode === 'table' ? '🃏 ' : '📋 '}
                    </button>
                </div>
            </div>

            {isPositionsTab && positionCoins.length > 0 && (
                <div style={S.posBanner}>
                    <div>
                        <strong>
                            <FaWallet />
                            {t('crypto.openPositions', 'Open Positions')} ({positionCoins.length})
                        </strong>
                        {tersSignalSayisi > 0 && (
                            <span>
                                ⚠️ {tersSignalSayisi} {t('crypto.counterSignal', 'Counter Signal')}
                            </span>
                        )}
                    </div>
                    <div>
                        {positionCoins.map((c, i) => {
                            const ps = positionCoinStatus[c] || {};
                            const isTers = ps.hasTersSignal;
                            const dir = ps.direction;
                            const pnl = ps.pnl_percent;
                            const pnlStr =
                                pnl != null ? `${pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}%` : null;
                            const pnlClr =
                                pnl != null ? (pnl >= 0 ? '#23a559' : '#da373c') : '#949ba4';
                            // BL88 alanları (bot export ettiğinde görünür)
                            const sc = ps.status_code;
                            const st = ps.status_text;
                            const blSig = ps.bl_signal;
                            const blAvt = ps.bl_avantaj_pct;
                            // Tooltip
                            const tip = [
                                dir ? `${t('crypto.direction', 'Direction')}: ${dir}` : null,
                                pnlStr ? `PNL: ${pnlStr}` : null,
                                st || (sc ? sc.replace(/_/g, ' ') : null),
                                blSig && blSig !== '-' ? `BL Signal: ${blSig}` : null,
                                blAvt != null
                                    ? `${t('crypto.blAdvantage', 'BL Advantage')}: ${blAvt >= 0 ? '+' : ''}${blAvt.toFixed(2)}%`
                                    : null,
                            ]
                                .filter(Boolean)
                                .join(' | ');
                            return (
                                <span
                                    key={c}
                                    title={tip}
                                    style={{
                                        ...S.posTag,
                                        backgroundColor: isTers
                                            ? 'rgba(218,55,60,0.15)'
                                            : 'rgba(35,165,89,0.15)',
                                        color: isTers ? '#da373c' : '#23a559',
                                        border: `1px solid ${isTers ? 'rgba(218,55,60,0.4)' : 'rgba(35,165,89,0.4)'}`,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        padding: '3px 8px',
                                    }}
                                >
                                    <span>{i + 1}.</span>
                                    {isTers ? '⚠️' : '✅'}
                                    <span> {c.replace('USDT', '')}</span>
                                    {dir && (
                                        <span
                                            style={{
                                                fontSize: '0.75em',
                                                opacity: 0.85,
                                                fontWeight: 600,
                                                color: dir === 'LONG' ? '#23a559' : '#da373c',
                                            }}
                                        >
                                            {dir === 'LONG' ? '🟢' : '🔴'}
                                        </span>
                                    )}
                                    {pnlStr && (
                                        <span
                                            style={{
                                                fontSize: '0.78em',
                                                fontWeight: 700,
                                                color: pnlClr,
                                            }}
                                        >
                                            {' '}
                                            {pnlStr}
                                        </span>
                                    )}
                                    {sc && (
                                        <span>
                                            {sc === 'YON_UYUYOR'
                                                ? '✅'
                                                : sc === 'TERS_SINYAL'
                                                  ? '🔴'
                                                  : sc === 'YON_AYNI_BL_DOLMADI'
                                                    ? '🟡'
                                                    : sc === 'BL_YOK'
                                                      ? '⚪'
                                                      : '⚠️'}
                                        </span>
                                    )}
                                    {blAvt != null && (
                                        <span
                                            style={{
                                                fontSize: '0.72em',
                                                fontWeight: 600,
                                                color: blAvt >= 0 ? '#23a559' : '#e74c3c',
                                            }}
                                        >
                                            {' '}
                                            BL: {blAvt >= 0 ? '+' : ''} {blAvt.toFixed(1)}%
                                        </span>
                                    )}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {!currentTab ? (
                <div style={S.emptyState}>
                    <div>📭</div>
                    <p>{t('crypto.noData', 'No data in this mode')}</p>
                </div>
            ) : viewMode === 'cards' ? (
                <div style={S.cardGrid}>
                    {Object.entries(coinGroups).map(([coin, rows]) => {
                        const isBLData = rows[0]?.avantaj_pct !== undefined;
                        const goodRows = isBLData
                            ? rows.filter((r) => parseFloat(r.avantaj_pct || 0) > 0)
                            : isPositionsTab
                              ? rows.filter((r) => r.ters_sinyal !== true)
                              : rows.filter((r) => parsePnl(r.pnl_percent) > 0);
                        const badRows = isBLData
                            ? rows.filter((r) => parseFloat(r.avantaj_pct || 0) < 0)
                            : isPositionsTab
                              ? rows.filter((r) => r.ters_sinyal === true)
                              : rows.filter((r) => parsePnl(r.pnl_percent) < 0);
                        const avgPnl = isBLData
                            ? rows.length
                                ? rows.reduce((s, r) => s + parseFloat(r.avantaj_pct || 0), 0) /
                                  rows.length
                                : 0
                            : rows.length
                              ? rows.reduce((s, r) => s + parsePnl(r.pnl_percent), 0) / rows.length
                              : 0;
                        // Use reduce instead of Math.max(...spread) to avoid call stack issues with large arrays
                        const bestWr = rows.reduce(
                            (m, r) =>
                                Math.max(
                                    m,
                                    parseFloat(String(r.win_rate || '0').replace('%', '')) || 0
                                ),
                            0
                        );
                        const firstRow = rows[0] || {};
                        return (
                            <div
                                key={coin}
                                style={S.coinCard}
                                role="button"
                                tabIndex={0}
                                aria-label={`${coin} signal card`}
                                onKeyDown={(e) =>
                                    (e.key === 'Enter' || e.key === ' ') &&
                                    setSelectedCoin({ name: coin, data: rows, isBL: isBLData })
                                }
                                onClick={() =>
                                    setSelectedCoin({ name: coin, data: rows, isBL: isBLData })
                                }
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.borderColor = isBLData
                                        ? 'rgba(231,76,60,0.5)'
                                        : 'rgba(240,178,50,0.5)';
                                    e.currentTarget.style.boxShadow = `0 12px 28px rgba(0,0,0,0.4), 0 0 0 1px ${isBLData ? 'rgba(231,76,60,0.2)' : 'rgba(240,178,50,0.2)'}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                                }}
                            >
                                <div style={S.cardHeader}>
                                    <div>
                                        <span style={S.cardCoinName}>
                                            {coin.replace('USDT', '')}
                                        </span>
                                        <SignalBadge
                                            value={firstRow.signal || firstRow.sinyal_yonu || '-'}
                                        />
                                    </div>
                                    <span>
                                        {rows.length} {t('crypto.str', 'str.')}
                                    </span>
                                </div>
                                <div style={S.cardBody}>
                                    <div style={S.cardRow}>
                                        <span style={S.cardRowLabel}>
                                            {t('crypto.price', 'Price')}
                                        </span>
                                        <span style={S.cardRowValue}>
                                            ${formatPrice(firstRow.current_price)}
                                        </span>
                                    </div>
                                    {isBLData ? (
                                        <>
                                            <div style={S.cardRow}>
                                                <span style={S.cardRowLabel}>
                                                    {t('crypto.advantage', 'Advantage')}
                                                </span>
                                                <span style={_st1009}>
                                                    {avgPnl >= 0 ? '+' : ''}
                                                    {avgPnl.toFixed(2)}%
                                                </span>
                                            </div>
                                            <div style={S.cardRow}>
                                                <span style={S.cardRowLabel}>BL%</span>
                                                <span style={_st1010}>
                                                    {parseFloat(firstRow.bl_pct || 0).toFixed(2)}%
                                                </span>
                                            </div>
                                            <div style={S.cardRow}>
                                                <span style={S.cardRowLabel}>
                                                    {t('crypto.blDays', 'BL Days')}
                                                </span>
                                                <span style={S.cardRowValue}>
                                                    {firstRow.bl_days}
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div style={S.cardRow}>
                                                <span style={S.cardRowLabel}>
                                                    {t('crypto.avgPNL', 'Avg PNL')}
                                                </span>
                                                <span style={_st1009}>
                                                    {avgPnl >= 0 ? '+' : ''}
                                                    {avgPnl.toFixed(2)}%
                                                </span>
                                            </div>
                                            <div style={S.cardRow}>
                                                <span style={S.cardRowLabel}>
                                                    {t('crypto.bestWR', 'Best WR')}
                                                </span>
                                                <span
                                                    style={{
                                                        ...S.cardRowValue,
                                                        color: bestWr >= 50 ? '#23a559' : '#da373c',
                                                    }}
                                                >
                                                    {bestWr.toFixed(1)}%
                                                </span>
                                            </div>
                                            {firstRow.days_ago != null && (
                                                <div style={S.cardRow}>
                                                    <span style={S.cardRowLabel}>
                                                        {t('crypto.signalAge', 'Signal Age')}
                                                    </span>
                                                    <span
                                                        style={{
                                                            ...S.cardRowValue,
                                                            color:
                                                                firstRow.days_ago > 30
                                                                    ? '#da373c'
                                                                    : firstRow.days_ago > 14
                                                                      ? '#f0b232'
                                                                      : '#23a559',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {firstRow.days_ago}d
                                                    </span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div style={S.cardFooter}>
                                    <div style={S.miniBarBg}>
                                        <div
                                            style={{
                                                ...S.miniBar,
                                                width: `${(goodRows.length / Math.max(rows.length, 1)) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <span>
                                            {isPositionsTab ? '✅ ' : '✓ '} {goodRows.length}
                                        </span>
                                        <span>
                                            {isPositionsTab ? '⚠️ ' : '✗ '} {badRows.length}
                                        </span>
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
                            <thead>
                                <tr>
                                    <SortHeader field="rank">#</SortHeader>
                                    <SortHeader field="coin">Coin</SortHeader>
                                    <th style={S.th}>TF</th>
                                    <th style={S.th}>Signal</th>
                                    {isBL ? (
                                        <>
                                            <th style={S.th}>
                                                {t('crypto.signalPrice', 'Signal Price')}
                                            </th>
                                            <th style={S.th}>{t('crypto.blPrice', 'BL Price')}</th>
                                            <SortHeader field="bl_pct">BL%</SortHeader>
                                            <SortHeader field="bl_days">
                                                {t('crypto.blDays', 'BL Days')}
                                            </SortHeader>
                                            <th style={S.th}>{t('crypto.current', 'Current')}</th>
                                            <SortHeader field="avantaj_pct">
                                                {t('crypto.advantagePct', 'Advantage%')}
                                            </SortHeader>
                                            <th style={S.th}>TP%</th>
                                            <th style={S.th}>SL%</th>
                                            <SortHeader field="win_rate">WR%</SortHeader>
                                            <SortHeader field="trades">
                                                {t('crypto.trades', 'Trades')}
                                            </SortHeader>
                                            <SortHeader field="balance">Balance</SortHeader>
                                            {isPositionsTab && (
                                                <th style={S.th}>
                                                    {t('crypto.posDirection', 'Pos. Direction')}
                                                </th>
                                            )}
                                            {isPositionsTab && (
                                                <th style={S.th}>
                                                    {t('crypto.alignment', 'Alignment')}
                                                </th>
                                            )}
                                            {isPositionsTab && <th style={S.th}>Status</th>}
                                            <th style={S.th}>Link</th>
                                        </>
                                    ) : (
                                        <>
                                            {isPositionsTab && (
                                                <th style={S.th}>
                                                    {t('crypto.posDirection', 'Pos. Direction')}
                                                </th>
                                            )}
                                            {isPositionsTab && (
                                                <th style={S.th}>
                                                    {t('crypto.alignment', 'Alignment')}
                                                </th>
                                            )}
                                            {isPositionsTab && <th style={S.th}>Status</th>}
                                            <th style={S.th}>Entry</th>
                                            <th style={S.th}>{t('crypto.current', 'Current')}</th>
                                            <SortHeader field="pnl">PNL%</SortHeader>
                                            <SortHeader field="win_rate">WR%</SortHeader>
                                            <SortHeader field="trades">
                                                {t('crypto.trades', 'Trades')}
                                            </SortHeader>
                                            <SortHeader field="x_kat">
                                                {t('crypto.xMultiplier', 'X Mult')}
                                            </SortHeader>
                                            <SortHeader field="days_ago">
                                                {t('crypto.days', 'Days')}
                                            </SortHeader>
                                            <th style={S.th}>
                                                {t('crypto.targetROE', 'Target ROE')}
                                            </th>
                                            <th style={S.th}>Status</th>
                                            <th style={S.th}>Link</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {pagedData.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={
                                                isBL
                                                    ? isPositionsTab
                                                        ? 19
                                                        : 16
                                                    : isPositionsTab
                                                      ? 17
                                                      : 14
                                            }
                                        >
                                            {searchQuery
                                                ? t('crypto.noResults', {
                                                      query: searchQuery,
                                                      defaultValue: `No results for "${searchQuery}"`,
                                                  })
                                                : t('crypto.noDataInTab', 'No data in this tab')}
                                        </td>
                                    </tr>
                                ) : (
                                    pagedData.map((item, idx) => {
                                        const coinName = item.coin || item.symbol || '';
                                        const coinShort = coinName.replace('USDT', '');
                                        const binanceSymbol = coinName.endsWith('USDT')
                                            ? coinName
                                            : `${coinName}USDT`;
                                        const rowBg =
                                            idx % 2 === 0
                                                ? 'transparent'
                                                : 'rgba(255,255,255,0.015)';
                                        const isBLRow = item.avantaj_pct !== undefined;
                                        return (
                                            <tr
                                                key={`${item.rank}-${coinName}-${item.timeframe}-${idx}`}
                                                style={{
                                                    backgroundColor: rowBg,
                                                    transition: 'background-color 0.15s',
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.backgroundColor =
                                                        'rgba(88,101,242,0.06)')
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.backgroundColor = rowBg)
                                                }
                                            >
                                                <td style={S.td}>
                                                    <span>{item.rank}</span>
                                                </td>
                                                <td style={S.td}>
                                                    <span
                                                        role="button"
                                                        tabIndex={0}
                                                        onKeyDown={(e) =>
                                                            (e.key === 'Enter' || e.key === ' ') &&
                                                            setSelectedCoin({
                                                                name: coinName,
                                                                data: tabData.filter(
                                                                    (r) =>
                                                                        (r.coin || r.symbol) ===
                                                                        coinName
                                                                ),
                                                                isBL: isBLRow,
                                                            })
                                                        }
                                                        onClick={() =>
                                                            setSelectedCoin({
                                                                name: coinName,
                                                                data: tabData.filter(
                                                                    (r) =>
                                                                        (r.coin || r.symbol) ===
                                                                        coinName
                                                                ),
                                                                isBL: isBLRow,
                                                            })
                                                        }
                                                    >
                                                        {coinShort}
                                                    </span>
                                                </td>
                                                <td style={S.td}>
                                                    <span style={S.tfBadge}>{item.timeframe}</span>
                                                </td>
                                                <td style={S.td}>
                                                    <SignalBadge
                                                        value={
                                                            item.signal || item.sinyal_yonu || '-'
                                                        }
                                                    />
                                                </td>
                                                {isBLRow ? (
                                                    <>
                                                        <td style={_st1011}>
                                                            ${formatPrice(item.signal_price)}
                                                        </td>
                                                        <td style={_st1012}>
                                                            ${formatPrice(item.bl_price)}
                                                        </td>
                                                        <td style={_st1013}>
                                                            {parseFloat(item.bl_pct || 0).toFixed(
                                                                2
                                                            )}
                                                            %
                                                        </td>
                                                        <td
                                                            style={{
                                                                ...S.td,
                                                                color:
                                                                    item.bl_days > 5
                                                                        ? '#da373c'
                                                                        : item.bl_days > 2
                                                                          ? '#f0b232'
                                                                          : '#23a559',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {item.bl_days}g
                                                        </td>
                                                        <td style={_st1014}>
                                                            ${formatPrice(item.current_price)}
                                                        </td>
                                                        <td
                                                            style={{
                                                                ...S.td,
                                                                color:
                                                                    parseFloat(
                                                                        item.avantaj_pct || 0
                                                                    ) >= 0
                                                                        ? '#23a559'
                                                                        : '#da373c',
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            {parseFloat(item.avantaj_pct || 0) >= 0
                                                                ? '+'
                                                                : ''}
                                                            {parseFloat(
                                                                item.avantaj_pct || 0
                                                            ).toFixed(2)}
                                                            %
                                                        </td>
                                                        <td style={_st1015}>
                                                            {parseFloat(item.tp_pct || 0).toFixed(
                                                                0
                                                            )}
                                                            %
                                                        </td>
                                                        <td style={_st1016}>
                                                            {parseFloat(item.sl_pct || 0).toFixed(
                                                                0
                                                            )}
                                                            %
                                                        </td>
                                                        <td
                                                            style={{
                                                                ...S.td,
                                                                fontWeight: 600,
                                                                color:
                                                                    parseFloat(
                                                                        item.win_rate || 0
                                                                    ) >= 50
                                                                        ? '#23a559'
                                                                        : '#da373c',
                                                            }}
                                                        >
                                                            {parseFloat(item.win_rate || 0).toFixed(
                                                                1
                                                            )}
                                                            %
                                                        </td>
                                                        <td style={S.td}>{item.trades || '-'}</td>
                                                        <td style={_st1017}>
                                                            {formatBalance(item.balance)}
                                                        </td>
                                                        {isPositionsTab && (
                                                            <td style={S.td}>
                                                                <SignalBadge
                                                                    value={
                                                                        item.pozisyon_yonu || '-'
                                                                    }
                                                                />
                                                            </td>
                                                        )}
                                                        {isPositionsTab && (
                                                            <td style={S.td}>
                                                                <span
                                                                    style={{
                                                                        fontSize: '0.8em',
                                                                        fontWeight: 600,
                                                                        color: item.yon_uyumu?.includes(
                                                                            '✅'
                                                                        )
                                                                            ? '#23a559'
                                                                            : '#da373c',
                                                                    }}
                                                                >
                                                                    {item.yon_uyumu || '-'}
                                                                </span>
                                                            </td>
                                                        )}
                                                        {isPositionsTab && (
                                                            <td style={S.td}>
                                                                <span
                                                                    style={{
                                                                        fontSize: '0.78em',
                                                                        fontWeight: 600,
                                                                        whiteSpace: 'nowrap',
                                                                        color:
                                                                            positionCoinStatus[
                                                                                coinName
                                                                            ]?.status_code ===
                                                                                'YON_UYUYOR' ||
                                                                            (!positionCoinStatus[
                                                                                coinName
                                                                            ]?.status_code &&
                                                                                !item.ters_sinyal &&
                                                                                item.yon_uyumu?.includes(
                                                                                    '✅'
                                                                                ))
                                                                                ? '#23a559'
                                                                                : positionCoinStatus[
                                                                                        coinName
                                                                                    ]
                                                                                        ?.status_code ===
                                                                                        'YON_AYNI_BL_DOLMADI' ||
                                                                                    positionCoinStatus[
                                                                                        coinName
                                                                                    ]
                                                                                        ?.status_code ===
                                                                                        'BL_YOK'
                                                                                  ? '#f0b232'
                                                                                  : '#da373c',
                                                                    }}
                                                                >
                                                                    {positionCoinStatus[coinName]
                                                                        ?.status_code ===
                                                                    'YON_UYUYOR'
                                                                        ? 'Sleeping'
                                                                        : positionCoinStatus[
                                                                                coinName
                                                                            ]?.status_code ===
                                                                            'TERS_SINYAL'
                                                                          ? 'Counter Signals'
                                                                          : positionCoinStatus[
                                                                                  coinName
                                                                              ]?.status_code ===
                                                                              'YON_AYNI_BL_DOLMADI'
                                                                            ? 'Not filled'
                                                                            : positionCoinStatus[
                                                                                    coinName
                                                                                ]?.status_code ===
                                                                                'TERS_SINYAL_BL_YOK'
                                                                              ? 'Counter (No BL)'
                                                                              : positionCoinStatus[
                                                                                      coinName
                                                                                  ]?.status_code ===
                                                                                  'BL_YOK'
                                                                                ? 'No BL'
                                                                                : item.ters_sinyal
                                                                                  ? 'Counter Signals'
                                                                                  : item.yon_uyumu?.includes(
                                                                                          '✅'
                                                                                      )
                                                                                    ? 'Sleeping'
                                                                                    : item.yon_uyumu?.includes(
                                                                                            '⚠️'
                                                                                        )
                                                                                      ? 'Counter Signals'
                                                                                      : '-'}
                                                                </span>
                                                            </td>
                                                        )}
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
                                                    </>
                                                ) : (
                                                    <>
                                                        {isPositionsTab && (
                                                            <td style={S.td}>
                                                                <SignalBadge
                                                                    value={
                                                                        item.pozisyon_yonu || '-'
                                                                    }
                                                                />
                                                            </td>
                                                        )}
                                                        {isPositionsTab && (
                                                            <td style={S.td}>
                                                                <span
                                                                    style={{
                                                                        fontSize: '0.8em',
                                                                        fontWeight: 600,
                                                                        color: item.ters_sinyal
                                                                            ? '#da373c'
                                                                            : '#23a559',
                                                                    }}
                                                                >
                                                                    {item.ters_sinyal
                                                                        ? '⚠️ Counter'
                                                                        : '✅ Aligned'}
                                                                </span>
                                                            </td>
                                                        )}
                                                        {isPositionsTab && (
                                                            <td style={S.td}>
                                                                <span
                                                                    style={{
                                                                        fontSize: '0.78em',
                                                                        fontWeight: 600,
                                                                        whiteSpace: 'nowrap',
                                                                        color:
                                                                            positionCoinStatus[
                                                                                coinName
                                                                            ]?.status_code ===
                                                                                'YON_UYUYOR' ||
                                                                            (!positionCoinStatus[
                                                                                coinName
                                                                            ]?.status_code &&
                                                                                !item.ters_sinyal)
                                                                                ? '#23a559'
                                                                                : positionCoinStatus[
                                                                                        coinName
                                                                                    ]
                                                                                        ?.status_code ===
                                                                                        'YON_AYNI_BL_DOLMADI' ||
                                                                                    positionCoinStatus[
                                                                                        coinName
                                                                                    ]
                                                                                        ?.status_code ===
                                                                                        'BL_YOK'
                                                                                  ? '#f0b232'
                                                                                  : '#da373c',
                                                                    }}
                                                                >
                                                                    {positionCoinStatus[coinName]
                                                                        ?.status_code ===
                                                                    'YON_UYUYOR'
                                                                        ? 'Sleeping'
                                                                        : positionCoinStatus[
                                                                                coinName
                                                                            ]?.status_code ===
                                                                            'TERS_SINYAL'
                                                                          ? 'Counter Signals'
                                                                          : positionCoinStatus[
                                                                                  coinName
                                                                              ]?.status_code ===
                                                                              'YON_AYNI_BL_DOLMADI'
                                                                            ? 'Not filled'
                                                                            : positionCoinStatus[
                                                                                    coinName
                                                                                ]?.status_code ===
                                                                                'TERS_SINYAL_BL_YOK'
                                                                              ? 'Counter (No BL)'
                                                                              : positionCoinStatus[
                                                                                      coinName
                                                                                  ]?.status_code ===
                                                                                  'BL_YOK'
                                                                                ? 'No BL'
                                                                                : item.ters_sinyal
                                                                                  ? 'Counter Signals'
                                                                                  : 'Sleeping'}
                                                                </span>
                                                            </td>
                                                        )}
                                                        <td style={_st1011}>
                                                            ${formatPrice(item.entry_price)}
                                                        </td>
                                                        <td style={_st1014}>
                                                            ${formatPrice(item.current_price)}
                                                        </td>
                                                        <td style={_st1018}>
                                                            {item.pnl_percent || '-'}
                                                        </td>
                                                        <td
                                                            style={{
                                                                ...S.td,
                                                                fontWeight: 600,
                                                                color:
                                                                    parseFloat(
                                                                        String(
                                                                            item.win_rate || '0'
                                                                        ).replace('%', '')
                                                                    ) >= 50
                                                                        ? '#23a559'
                                                                        : '#da373c',
                                                            }}
                                                        >
                                                            {item.win_rate || '-'}
                                                        </td>
                                                        <td style={S.td}>{item.trades || '-'}</td>
                                                        <td style={_st1019}>{item.x_kat || '-'}</td>
                                                        <td
                                                            style={{
                                                                ...S.td,
                                                                color:
                                                                    item.days_ago == null
                                                                        ? '#949ba4'
                                                                        : item.days_ago > 30
                                                                          ? '#da373c'
                                                                          : item.days_ago > 14
                                                                            ? '#f0b232'
                                                                            : '#23a559',
                                                                fontWeight: 600,
                                                                fontSize: '0.85em',
                                                            }}
                                                        >
                                                            {item.days_ago != null
                                                                ? `${item.days_ago}d`
                                                                : '-'}
                                                        </td>
                                                        <td style={_st1020}>
                                                            {item.hedef_roe || '-'}
                                                        </td>
                                                        <td style={S.td}>
                                                            <StatusBadge status={item.status} />
                                                        </td>
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
                                                    </>
                                                )}
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 1 && (
                        <div style={S.pagination}>
                            <button
                                onClick={handlePrevPage}
                                disabled={page === 1}
                                style={{ ...S.pageBtn, opacity: page === 1 ? 0.4 : 1 }}
                            >
                                ◄
                            </button>
                            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                let num;
                                if (totalPages <= 7) num = i + 1;
                                else if (page <= 4) num = i + 1;
                                else if (page >= totalPages - 3) num = totalPages - 6 + i;
                                else num = page - 3 + i;
                                return (
                                    <button
                                        key={num}
                                        onClick={() => setPage(num)}
                                        style={{
                                            ...S.pageNumBtn,
                                            ...(page === num ? S.pageNumActive : {}),
                                        }}
                                    >
                                        {' '}
                                        {num}
                                    </button>
                                );
                            })}
                            <button
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                                style={{ ...S.pageBtn, opacity: page === totalPages ? 0.4 : 1 }}
                            >
                                ►
                            </button>
                        </div>
                    )}
                </>
            )}

            <CoinDetailModal
                selectedCoin={selectedCoin}
                isPositionsTab={isPositionsTab}
                onClose={handleCloseModal}
            />
        </div>
    );
};

CryptoSignals.propTypes = {
    field: PropTypes.object,
    children: PropTypes.array,
};
export default memo(CryptoSignals);
