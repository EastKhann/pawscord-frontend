// frontend/src/CryptoDashboard.js

// v3.0  Balance/Winrate Mode + 5 Tab  Decomposed Orchestrator

import { useCallback, memo } from 'react';

import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import {
    FaArrowLeft,
    FaBitcoin,
    FaSync,
    FaWallet,
    FaExchangeAlt,
    FaTimes,
    FaBug,
    FaChartLine,
    FaTrophy,
    FaFilter,
} from 'react-icons/fa';

import useCryptoData from './hooks/useCryptoData';

import {
    safeRender,
    formatPrice,
    pnlColor,
    TAB_CONFIG,
    LivePrice,
    SignalBadge,
    StatusBadge,
} from './helpers';

import TradeModal from './TradeModal';

import PortfolioModal from './PortfolioModal';

import styles from './styles';

// -- dynamic style helpers (pass 2) --

// -- extracted inline style constants --

const _st1007 = styles.refreshButton;

const CryptoDashboard = () => {
    const { t } = useTranslation();

    const api = useCryptoData();

    const handleShowPortfolio = useCallback(
        () => api.setShowPortfolio(true),
        [api.setShowPortfolio]
    );

    const handleClosePortfolio = useCallback(
        () => api.setShowPortfolio(false),
        [api.setShowPortfolio]
    );

    const handleSearchChange = useCallback(
        (e) => api.setSearchQuery(e.target.value),
        [api.setSearchQuery]
    );

    const handleClearSearch = useCallback(() => api.setSearchQuery(''), [api.setSearchQuery]);

    const handleBalanceMode = useCallback(
        () => api.setActiveMode('balance_mode'),
        [api.setActiveMode]
    );

    const handleWinrateMode = useCallback(
        () => api.setActiveMode('winrate_mode'),
        [api.setActiveMode]
    );

    const handlePrevPage = useCallback(() => api.setPage((p) => Math.max(1, p - 1)), [api.setPage]);

    const handleNextPage = useCallback(
        () => api.setPage((p) => Math.min(api.totalPages, p + 1)),
        [api.setPage, api.totalPages]
    );

    const handleCloseTradeModal = useCallback(() => api.setTradeData(null), [api.setTradeData]);

    const SortHeader = ({ field, children, style: extraStyle }) => (
        <th
            onClick={() => api.handleSort(field)}
            style={{
                cursor: 'pointer',
                userSelect: 'none',
                whiteSpace: 'nowrap',

                color: api.sortBy === field ? '#f0b232' : '#949ba4',

                ...extraStyle,
            }}
        >
            {children} {api.sortBy === field ? (api.sortDir === 'asc' ? '▲' : '▼') : ''}
        </th>
    );

    return (
        <div
            style={{
                ...styles.pageContainer,
                paddingTop: api.isMobile ? 'max(10px, env(safe-area-inset-top))' : '20px',
            }}
        >
            {/* HEADER */}

            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <Link to="/" style={styles.backButton}>
                        <FaArrowLeft /> {t('common.back')}
                    </Link>

                    <h1 style={styles.title}>
                        <FaBitcoin />
                        Crypto AI Dashboard
                        {api.meta.version && <span>v{api.meta.version}</span>}
                    </h1>
                </div>

                <div>
                    <button
                        onClick={handleShowPortfolio}
                        style={styles.portfolioBtn}
                        aria-label={t('crypto.portfolio')}
                    >
                        <FaWallet /> {t('crypto.portfolio')} ($
                        {formatPrice(api.portfolio?.balance || '0')})
                    </button>

                    <button
                        onClick={api.fetchData}
                        style={styles.refreshButton}
                        aria-label={t('common.retry')}
                    >
                        <FaSync className={api.loading ? 'spin' : ''} />{' '}
                        {api.loading ? '' : t('common.retry')}
                    </button>
                </div>
            </div>

            {/* META BAR */}

            {api.meta.export_date && (
                <div style={styles.metaBar}>
                    <span>
                        📅 Last Updated: <strong>{api.meta.export_date}</strong>
                    </span>

                    <span>
                        📊 Strateji:{' '}
                        <strong>
                            {api.activeMode === 'balance_mode'
                                ? api.meta.balance_strategies
                                : api.meta.winrate_strategies}
                        </strong>
                    </span>

                    {api.positionCoins.length > 0 && (
                        <span>
                            💼 Open Poz: <strong>{api.positionCoins.length} Coin</strong>
                        </span>
                    )}
                </div>
            )}

            {api.loading && !api.data ? (
                <div style={styles.loader}>
                    <div className="spin"></div>

                    <p>{t('common.loading')}</p>
                </div>
            ) : api.errorMsg ? (
                <div role="alert">
                    <h3>⚠ {api.errorMsg}</h3>

                    {api.debugInfo && (
                        <div>
                            <strong>
                                <FaBug /> Error Verisi:
                            </strong>

                            <pre>{api.debugInfo}</pre>
                        </div>
                    )}

                    <button aria-label={t('common.retry', 'Retry')} onClick={api.fetchData} style={_st1007}>
                        {t('common.retry', 'Yeniden Dene')}
                    </button>
                </div>
            ) : (
                <div style={styles.content}>
                    {/* MODE TOGGLE */}

                    <div style={styles.modeToggleContainer}>
                        <button
                            aria-label={t('crypto.balanceMode', 'Switch to balance mode')}
                            onClick={handleBalanceMode}
                            style={{
                                ...styles.modeToggleBtn,

                                ...(api.activeMode === 'balance_mode'
                                    ? styles.modeToggleActive
                                    : {}),

                                borderColor:
                                    api.activeMode === 'balance_mode' ? '#f0b232' : '#1e2024',
                            }}
                        >
                            <FaChartLine />

                            {api.isMobile ? 'Balance' : '💰 Balance Sortma'}
                        </button>

                        <button
                            aria-label={t('crypto.winrateMode', 'Switch to win rate mode')}
                            onClick={handleWinrateMode}
                            style={{
                                ...styles.modeToggleBtn,

                                ...(api.activeMode === 'winrate_mode'
                                    ? styles.modeToggleActive
                                    : {}),

                                borderColor:
                                    api.activeMode === 'winrate_mode' ? '#23a559' : '#1e2024',
                            }}
                        >
                            <FaTrophy />

                            {api.isMobile ? 'Winrate' : ' Winrate Sortma'}
                        </button>
                    </div>

                    {/* TAB BAR */}

                    <div style={styles.tabBar}>
                        <div style={styles.tabs}>
                            {api.modeData &&
                                api.modeData.tabs &&
                                Object.keys(api.modeData.tabs).map((tabKey) => {
                                    const config = TAB_CONFIG[tabKey] || {
                                        icon: '📋',
                                        shortLabel: tabKey,
                                        color: '#949ba4',
                                    };

                                    const tab = api.modeData.tabs[tabKey];

                                    const isActive = api.activeTab === tabKey;

                                    return (
                                        <button
                                            aria-label={config.shortLabel}
                                            key={tabKey}
                                            onClick={() => api.setActiveTab(tabKey)}
                                            style={{
                                                ...styles.tabButton,

                                                ...(isActive
                                                    ? {
                                                        ...styles.activeTab,
                                                        backgroundColor: config.color,
                                                        borderColor: config.color,
                                                    }
                                                    : {}),
                                            }}
                                        >
                                            <span>{config.icon}</span>

                                            <span>
                                                {api.isMobile
                                                    ? config.shortLabel
                                                    : tab.title || tabKey}
                                            </span>

                                            <span
                                                style={{
                                                    backgroundColor: isActive
                                                        ? 'rgba(0,0,0,0.3)'
                                                        : 'rgba(255,255,255,0.1)',

                                                    padding: '1px 6px',
                                                    borderRadius: 10,
                                                    fontSize: '0.75em',
                                                    marginLeft: 4,
                                                }}
                                            >
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
                            <FaFilter />

                            <input
                                type="text"
                                value={api.searchQuery}
                                onChange={handleSearchChange}
                                placeholder={t('crypto.searchPlaceholder', 'Coin search... (BTC, ETH, SOL)')}
                                style={styles.searchInput}
                                aria-label={t('common.searchQuery', 'Search query')}
                            />

                            {api.searchQuery && (
                                <button
                                    aria-label={t('common.clearSearch', 'Clear search')}
                                    onClick={handleClearSearch}
                                    style={styles.clearSearchBtn}
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </div>

                        <div style={styles.resultInfo}>
                            <span>
                                {api.processedData.length} result{' '}
                                {api.searchQuery && `"${api.searchQuery}" for`}
                            </span>
                        </div>
                    </div>

                    {/* POSITION COINS BANNER */}

                    {api.isPositionsTab && api.positionCoins.length > 0 && (
                        <div style={styles.positionBanner}>
                            <strong>💼 Open Pozisyon ({api.positionCoins.length}):</strong>

                            {api.positionCoins.map((c, i) => {
                                const status = api.positionCoinStatus[c];

                                const isTers = status?.hasTersSinyal;

                                return (
                                    <span
                                        key={c}
                                        style={{
                                            ...styles.positionCoinTag,

                                            backgroundColor: isTers
                                                ? 'rgba(218,55,60,0.15)'
                                                : 'rgba(35,165,89,0.15)',

                                            color: isTers ? '#da373c' : '#23a559',

                                            border: `1px solid ${isTers ? 'rgba(218,55,60,0.4)' : 'rgba(35,165,89,0.4)'}`,
                                        }}
                                    >
                                        {i + 1}. {isTers ? '⚠' : '✅'} {c.replace('USDT', '')}
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

                                    <th>TF</th>

                                    <th>Sinyal</th>

                                    {api.isPositionsTab && (
                                        <>
                                            <th>Pos.Dir</th>

                                            <th>Align</th>
                                        </>
                                    )}

                                    <th>Entry</th>

                                    <th>Current</th>

                                    <SortHeader field="pnl">PNL%</SortHeader>

                                    <SortHeader field="win_rate">WR%</SortHeader>

                                    <SortHeader field="trades">Trades</SortHeader>

                                    <SortHeader field="x_kat">X Kat</SortHeader>

                                    <th>Hedef</th>

                                    <th>Status</th>

                                    <th>Al/Sat</th>
                                </tr>
                            </thead>

                            <tbody>
                                {api.pagedData.length === 0 ? (
                                    <tr>
                                        <td colSpan={api.isPositionsTab ? 15 : 13}>
                                            {api.searchQuery
                                                ? t('common.noResults', 'No results found.')
                                                : 'Bu sekmede veri yok.'}
                                        </td>
                                    </tr>
                                ) : (
                                    api.pagedData.map((item, idx) => {
                                        const livePrice = api.getLivePrice(item.coin);

                                        const coinSymbol =
                                            api.extractCoinSymbol(item.coin)?.replace('USDT', '') ||
                                            item.coin;

                                        const rowBg =
                                            idx % 2 === 0
                                                ? 'transparent'
                                                : 'rgba(255,255,255,0.02)';

                                        return (
                                            <tr
                                                key={`${item.rank}-${item.coin}-${item.timeframe}-${idx}`}
                                                style={{
                                                    backgroundColor: rowBg,
                                                    transition: 'background-color 0.2s',
                                                }}
                                                onMouseEnter={(e) =>
                                                (e.currentTarget.style.backgroundColor =
                                                    'rgba(88,101,242,0.08)')
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.backgroundColor = rowBg)
                                                }
                                            >
                                                <td>{item.rank}</td>

                                                <td>
                                                    <div>
                                                        <strong>{coinSymbol}</strong>

                                                        {livePrice && (
                                                            <LivePrice price={livePrice} />
                                                        )}
                                                    </div>
                                                </td>

                                                <td>
                                                    <span style={styles.tfBadge}>
                                                        {item.timeframe}
                                                    </span>
                                                </td>

                                                <td>
                                                    <SignalBadge
                                                        signal={
                                                            item.signal || item.sinyal_yonu || '-'
                                                        }
                                                    />
                                                </td>

                                                {api.isPositionsTab && (
                                                    <>
                                                        <td>
                                                            <SignalBadge
                                                                signal={item.pozisyon_yonu || '-'}
                                                            />
                                                        </td>

                                                        <td>
                                                            <span
                                                                style={{
                                                                    fontSize: '0.8em',

                                                                    color: item.ters_sinyal
                                                                        ? '#da373c'
                                                                        : '#23a559',

                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {item.yon_uyumu || '-'}
                                                            </span>
                                                        </td>
                                                    </>
                                                )}

                                                <td>${formatPrice(item.entry_price)}</td>

                                                <td>${formatPrice(item.current_price)}</td>

                                                <td
                                                    style={{
                                                        color: pnlColor(item.pnl_percent),
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {safeRender(item.pnl_percent)}
                                                </td>

                                                <td
                                                    style={{
                                                        color:
                                                            parseFloat(
                                                                String(
                                                                    item.win_rate || '0'
                                                                ).replace('%', '')
                                                            ) >= 50
                                                                ? '#23a559'
                                                                : '#da373c',

                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {safeRender(item.win_rate)}
                                                </td>

                                                <td>{safeRender(item.trades)}</td>

                                                <td>{safeRender(item.x_kat)}</td>

                                                <td>{safeRender(item.hedef_roe)}</td>

                                                <td>
                                                    <StatusBadge status={item.status} />
                                                </td>

                                                <td>
                                                    <button
                                                        aria-label={`${coinSymbol} ${t('crypto.buySell', 'buy/sell')}`}
                                                        onClick={() =>
                                                            api.setTradeData({
                                                                coin: coinSymbol,
                                                                price: livePrice,
                                                            })
                                                        }
                                                        style={{
                                                            ...styles.miniTradeBtn,

                                                            opacity: livePrice ? 1 : 0.4,

                                                            cursor: livePrice
                                                                ? 'pointer'
                                                                : 'not-allowed',
                                                        }}
                                                        disabled={!livePrice}
                                                        title={
                                                            livePrice
                                                                ? `${coinSymbol} Buy/Sell`
                                                                : 'Waiting for live price'
                                                        }
                                                    >
                                                        <FaExchangeAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}

                    {api.totalPages > 1 && (
                        <div style={styles.pagination}>
                            <button
                                aria-label={t('common.prevPage', 'Previous page')}
                                onClick={handlePrevPage}
                                disabled={api.page === 1}
                                style={{ ...styles.pageBtn, opacity: api.page === 1 ? 0.4 : 1 }}
                            >
                                ◄ Previous
                            </button>

                            <div style={styles.pageNumbers}>
                                {Array.from({ length: Math.min(api.totalPages, 7) }, (_, i) => {
                                    let pageNum;

                                    if (api.totalPages <= 7) pageNum = i + 1;
                                    else if (api.page <= 4) pageNum = i + 1;
                                    else if (api.page >= api.totalPages - 3)
                                        pageNum = api.totalPages - 6 + i;
                                    else pageNum = api.page - 3 + i;

                                    return (
                                        <button
                                            aria-label={t('common.page', 'Page') + ' ' + pageNum}
                                            key={pageNum}
                                            onClick={() => api.setPage(pageNum)}
                                            style={{
                                                ...styles.pageNumBtn,

                                                ...(api.page === pageNum
                                                    ? styles.pageNumActive
                                                    : {}),
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                aria-label={t('common.nextPage', 'Next page')}
                                onClick={handleNextPage}
                                disabled={api.page === api.totalPages}
                                style={{
                                    ...styles.pageBtn,
                                    opacity: api.page === api.totalPages ? 0.4 : 1,
                                }}
                            >
                                Next ►
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* MODALS */}

            {api.showPortfolio && (
                <PortfolioModal portfolio={api.portfolio} onClose={handleClosePortfolio} />
            )}

            {api.tradeData && (
                <TradeModal
                    coin={api.tradeData.coin}
                    initialPrice={api.tradeData.price}
                    livePrices={api.prices}
                    portfolio={api.portfolio}
                    onClose={handleCloseTradeModal}
                    onTrade={api.handleTrade}
                />
            )}
        </div>
    );
};

CryptoDashboard.propTypes = {
    field: PropTypes.object,

    children: PropTypes.array,
};

export default memo(CryptoDashboard);
