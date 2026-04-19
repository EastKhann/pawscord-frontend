// frontend/src/CryptoSignals/CoinDetailModal.js
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FaBitcoin, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { formatPrice, parsePnl } from './utils';
import { SignalBadge, StatusBadge } from './components';
import S from './styles';
import useModalA11y from '../hooks/useModalA11y';

// -- extracted inline style constants --

const CoinDetailModal = ({ selectedCoin, isPositionsTab, onClose }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: !!selectedCoin,
        label: 'Coin Detail',
    });

    // ⚠️ useMemo MUST be called before any early return (Rules of Hooks)
    const rows = selectedCoin?.data || [];
    const isBLModal = selectedCoin?.isBL || rows[0]?.avantaj_pct !== undefined;
    const coinStats = useMemo(() => {
        if (!rows.length)
            return {
                profits: 0,
                losses: 0,
                tersCount: 0,
                uyumluCount: 0,
                avgPnl: 0,
                avgWr: 0,
                avgBl: 0,
                price: null,
                isBL: false,
            };
        if (rows[0]?.avantaj_pct !== undefined) {
            const profits = rows.filter((r) => parseFloat(r.avantaj_pct || 0) > 0).length;
            const losses = rows.filter((r) => parseFloat(r.avantaj_pct || 0) < 0).length;
            const avgPnl =
                rows.reduce((s, r) => s + parseFloat(r.avantaj_pct || 0), 0) / rows.length;
            const avgWr = rows.reduce((s, r) => s + parseFloat(r.win_rate || 0), 0) / rows.length;
            const avgBl = rows.reduce((s, r) => s + parseFloat(r.bl_pct || 0), 0) / rows.length;
            const price = rows[0]?.current_price;
            return {
                profits,
                losses,
                tersCount: 0,
                uyumluCount: 0,
                avgPnl: isNaN(avgPnl) ? 0 : avgPnl,
                avgWr: isNaN(avgWr) ? 0 : avgWr,
                avgBl: isNaN(avgBl) ? 0 : avgBl,
                price,
                isBL: true,
            };
        }
        const profits = rows.filter((r) => parsePnl(r.pnl_percent) > 0).length;
        const losses = rows.filter((r) => parsePnl(r.pnl_percent) < 0).length;
        const tersCount = rows.filter((r) => r.ters_sinyal === true).length;
        const uyumluCount = rows.filter((r) => r.ters_sinyal !== true).length;
        const avgPnl = rows.reduce((s, r) => s + parsePnl(r.pnl_percent), 0) / rows.length;
        const avgWr =
            rows.reduce((s, r) => s + parseFloat(String(r.win_rate || '0').replace('%', '')), 0) /
            rows.length;
        const price = rows[0]?.current_price;
        return {
            profits,
            losses,
            tersCount,
            uyumluCount,
            avgPnl: isNaN(avgPnl) ? 0 : avgPnl,
            avgWr: isNaN(avgWr) ? 0 : avgWr,
            avgBl: 0,
            price,
            isBL: false,
        };
    }, [rows]);

    // Early return AFTER all hooks
    if (!selectedCoin) return null;

    const binanceUrl = `https://www.binance.com/en/futures/${selectedCoin.name.endsWith('USDT') ? selectedCoin.name : selectedCoin.name + 'USDT'}`;

    return (
        <div aria-label="coin detail modal" style={S.modalOverlay} {...overlayProps}>
            <div style={S.modal} {...dialogProps}>
                <div style={S.modalHeader}>
                    <div>
                        <FaBitcoin />
                        <h2>{selectedCoin.name.replace('USDT', '')}</h2>
                        <span style={S.modalBadge}>
                            {rows.length} {t('crypto.strategy', 'Strateji')}
                        </span>
                    </div>
                    <button onClick={onClose} style={S.modalCloseBtn}>
                        ✕
                    </button>
                </div>

                <div style={S.modalStats}>
                    {coinStats.isBL ? (
                        <>
                            <div style={S.mStatCard}>
                                <span>{coinStats.profits}</span>
                                <span style={S.mStatLabel}>
                                    {t('crypto.inAdvantage', 'Avantajda')}
                                </span>
                            </div>
                            <div style={S.mStatCard}>
                                <span>{coinStats.losses}</span>
                                <span style={S.mStatLabel}>
                                    {t('crypto.disadvantage', 'Dezavantajda')}
                                </span>
                            </div>
                            <div style={S.mStatCard}>
                                <span
                                    style={{
                                        fontSize: '1.3em',
                                        fontWeight: 700,
                                        color: coinStats.avgPnl >= 0 ? '#23a559' : '#da373c',
                                    }}
                                >
                                    {coinStats.avgPnl >= 0 ? '+' : ''}
                                    {coinStats.avgPnl.toFixed(2)}%
                                </span>
                                <span style={S.mStatLabel}>
                                    {t('crypto.avgAdvantage', 'Ort. Avantaj')}
                                </span>
                            </div>
                            <div style={S.mStatCard}>
                                <span>{coinStats.avgBl.toFixed(2)}%</span>
                                <span style={S.mStatLabel}>{t('crypto.avgBL', 'Avg BL%')}</span>
                            </div>
                            <div style={S.mStatCard}>
                                <span>{coinStats.avgWr.toFixed(1)}%</span>
                                <span style={S.mStatLabel}>{t('crypto.avgWR', 'Avg WR')}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={S.mStatCard}>
                                <span>
                                    {isPositionsTab ? coinStats.uyumluCount : coinStats.profits}
                                </span>
                                <span style={S.mStatLabel}>
                                    {isPositionsTab
                                        ? `✅ ${t('crypto.aligned', 'Aligned')}`
                                        : t('crypto.inProfit', 'In Profit')}
                                </span>
                            </div>
                            <div style={S.mStatCard}>
                                <span>
                                    {isPositionsTab ? coinStats.tersCount : coinStats.losses}
                                </span>
                                <span style={S.mStatLabel}>
                                    {isPositionsTab
                                        ? `⚠️ ${t('crypto.counterSignal', 'Counter Signal')}`
                                        : t('crypto.inLoss', 'In Loss')}
                                </span>
                            </div>
                            <div style={S.mStatCard}>
                                <span
                                    style={{
                                        fontSize: '1.3em',
                                        fontWeight: 700,
                                        color: coinStats.avgPnl >= 0 ? '#23a559' : '#da373c',
                                    }}
                                >
                                    {coinStats.avgPnl >= 0 ? '+' : ''}
                                    {coinStats.avgPnl.toFixed(2)}%
                                </span>
                                <span style={S.mStatLabel}>{t('crypto.avgPNL', 'Avg PNL')}</span>
                            </div>
                            <div style={S.mStatCard}>
                                <span>{coinStats.avgWr.toFixed(1)}%</span>
                                <span style={S.mStatLabel}>{t('crypto.avgWR', 'Avg WR')}</span>
                            </div>
                        </>
                    )}
                    {coinStats.price && (
                        <div style={S.mStatCard}>
                            <span>${formatPrice(coinStats.price)}</span>
                            <span style={S.mStatLabel}>{t('crypto.price', 'Price')}</span>
                        </div>
                    )}
                </div>

                <div style={S.modalBody}>
                    <h3>📊 {t('crypto.strategyDetails', 'Strategy Details')}</h3>
                    <div style={S.strategyList}>
                        {rows.map((row, idx) => {
                            const isBLRow = row.avantaj_pct !== undefined;
                            const pnl = isBLRow
                                ? parseFloat(row.avantaj_pct || 0)
                                : parsePnl(row.pnl_percent);
                            const isProfit = pnl > 0;
                            return (
                                <div
                                    key={`item-${idx}`}
                                    style={{
                                        ...S.strategyCard,
                                        borderLeft: `4px solid ${isProfit ? '#23a559' : '#da373c'}`,
                                        animationDelay: `${idx * 0.04}s`,
                                    }}
                                >
                                    <div>
                                        <span>{row.timeframe}</span>
                                        <SignalBadge
                                            value={
                                                row.signal ||
                                                row.sinyal_yonu ||
                                                row.pozisyon_yonu ||
                                                '-'
                                            }
                                        />
                                    </div>
                                    <div style={S.strategyGrid}>
                                        {(isBLRow
                                            ? [
                                                  {
                                                      label: t(
                                                          'crypto.signalPrice',
                                                          'Signal Price'
                                                      ),
                                                      val: `$${formatPrice(row.signal_price)}`,
                                                  },
                                                  {
                                                      label: t('crypto.blPrice', 'BL Price'),
                                                      val: `$${formatPrice(row.bl_price)}`,
                                                      color: '#e74c3c',
                                                  },
                                                  {
                                                      label: t('crypto.current', 'Current'),
                                                      val: `$${formatPrice(row.current_price)}`,
                                                  },
                                                  {
                                                      label: t('crypto.advantage', 'Advantage'),
                                                      val: `${pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}%`,
                                                      color: isProfit ? '#23a559' : '#da373c',
                                                      bold: true,
                                                  },
                                                  {
                                                      label: 'BL%',
                                                      val: `${parseFloat(row.bl_pct || 0).toFixed(2)}%`,
                                                      color: '#e74c3c',
                                                  },
                                                  {
                                                      label: t('crypto.day', 'Day'),
                                                      val: `${row.bl_days}g`,
                                                      color:
                                                          row.bl_days > 5
                                                              ? '#da373c'
                                                              : row.bl_days > 2
                                                                ? '#f0b232'
                                                                : '#23a559',
                                                  },
                                                  {
                                                      label: 'TP%',
                                                      val: `${parseFloat(row.tp_pct || 0).toFixed(0)}%`,
                                                      color: '#23a559',
                                                  },
                                                  {
                                                      label: 'SL%',
                                                      val: `${parseFloat(row.sl_pct || 0).toFixed(0)}%`,
                                                      color: '#da373c',
                                                  },
                                                  {
                                                      label: 'WR',
                                                      val: `${parseFloat(row.win_rate || 0).toFixed(1)}%`,
                                                  },
                                                  {
                                                      label: t('crypto.trades', 'Trades'),
                                                      val: row.trades || '-',
                                                  },
                                              ]
                                            : [
                                                  {
                                                      label: 'Entry',
                                                      val: `$${formatPrice(row.entry_price)}`,
                                                  },
                                                  {
                                                      label: t('crypto.current', 'Current'),
                                                      val: `$${formatPrice(row.current_price)}`,
                                                  },
                                                  {
                                                      label: 'PNL',
                                                      val: row.pnl_percent || '-',
                                                      color: isProfit ? '#23a559' : '#da373c',
                                                      bold: true,
                                                  },
                                                  { label: 'WR', val: row.win_rate || '-' },
                                                  {
                                                      label: t('crypto.xMultiplier', 'X Mult'),
                                                      val: row.x_kat || '-',
                                                      color: '#f0b232',
                                                  },
                                                  {
                                                      label: t('crypto.target', 'Target'),
                                                      val: row.hedef_roe || '-',
                                                      color: '#5865f2',
                                                  },
                                                  ...(row.days_ago != null
                                                      ? [
                                                            {
                                                                label: t(
                                                                    'crypto.daysAgo',
                                                                    'Days Ago'
                                                                ),
                                                                val: `${row.days_ago}d`,
                                                                color:
                                                                    row.days_ago > 30
                                                                        ? '#da373c'
                                                                        : row.days_ago > 14
                                                                          ? '#f0b232'
                                                                          : '#23a559',
                                                            },
                                                        ]
                                                      : []),
                                                  ...(row.bars_ago != null
                                                      ? [
                                                            {
                                                                label: t(
                                                                    'crypto.barsAgo',
                                                                    'Bars Ago'
                                                                ),
                                                                val: `${row.bars_ago}`,
                                                                color: '#949ba4',
                                                            },
                                                        ]
                                                      : []),
                                              ]
                                        ).map(({ label, val, color, bold }, i) => (
                                            <div key={`item-${Math.random()}`} style={S.stratItem}>
                                                <span style={S.stratItemLabel}>{label}</span>
                                                <span
                                                    style={{
                                                        ...S.stratItemVal,
                                                        ...(color ? { color } : {}),
                                                        ...(bold ? { fontWeight: 700 } : {}),
                                                    }}
                                                >
                                                    {val}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        {isBLRow ? (
                                            <span
                                                style={{
                                                    color:
                                                        parseFloat(row.avantaj_pct || 0) >= 0
                                                            ? '#23a559'
                                                            : '#da373c',
                                                    fontWeight: 600,
                                                    fontSize: '0.82em',
                                                }}
                                            >
                                                {parseFloat(row.avantaj_pct || 0) >= 0
                                                    ? `✅ ${t('crypto.inAdvantage', 'In Advantage')}`
                                                    : `🔴 ${t('crypto.inDisadvantage', 'In Disadvantage')}`}
                                            </span>
                                        ) : (
                                            <StatusBadge status={row.status} />
                                        )}
                                        {row.days_ago !== undefined && (
                                            <span>
                                                {row.days_ago} {t('crypto.daysUnit', 'days')} ·{' '}
                                                {row.bars_ago} {t('crypto.barsUnit', 'bars')}
                                            </span>
                                        )}
                                        {isBLRow && row.bl_days !== undefined && (
                                            <span>
                                                BL: {row.bl_days}{' '}
                                                {t('crypto.daysAgoUnit', 'days ago')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <a href={binanceUrl} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt /> {t('crypto.openOnBinance', 'Open on Binance Futures')}
                    </a>
                </div>
            </div>
        </div>
    );
};

CoinDetailModal.propTypes = {
    selectedCoin: PropTypes.bool,
    isPositionsTab: PropTypes.bool,
    onClose: PropTypes.func,
};
export default React.memo(CoinDetailModal);
