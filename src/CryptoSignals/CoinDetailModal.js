// frontend/src/CryptoSignals/CoinDetailModal.js
import React, { useMemo } from 'react';
import { FaBitcoin, FaExternalLinkAlt } from 'react-icons/fa';
import { formatPrice, parsePnl } from './utils';
import { SignalBadge, StatusBadge } from './components';
import S from './styles';
import useModalA11y from '../hooks/useModalA11y';

const CoinDetailModal = ({ selectedCoin, isPositionsTab, onClose }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen: !!selectedCoin, label: 'Coin Detay' });

    // ⚠️ useMemo MUST be called before any early return (Rules of Hooks)
    const rows = selectedCoin?.data || [];
    const coinStats = useMemo(() => {
        if (!rows.length) return { profits: 0, losses: 0, tersCount: 0, uyumluCount: 0, avgPnl: 0, avgWr: 0, price: null };
        const profits = rows.filter(r => parsePnl(r.pnl_percent) > 0).length;
        const losses = rows.filter(r => parsePnl(r.pnl_percent) < 0).length;
        const tersCount = rows.filter(r => r.ters_sinyal === true).length;
        const uyumluCount = rows.filter(r => r.ters_sinyal !== true).length;
        const avgPnl = rows.reduce((s, r) => s + parsePnl(r.pnl_percent), 0) / rows.length;
        const avgWr = rows.reduce((s, r) => s + parseFloat(String(r.win_rate || '0').replace('%', '')), 0) / rows.length;
        const price = rows[0]?.current_price;
        return { profits, losses, tersCount, uyumluCount, avgPnl: isNaN(avgPnl) ? 0 : avgPnl, avgWr: isNaN(avgWr) ? 0 : avgWr, price };
    }, [rows]);

    // Early return AFTER all hooks
    if (!selectedCoin) return null;

    const binanceUrl = `https://www.binance.com/en/futures/${selectedCoin.name.endsWith('USDT') ? selectedCoin.name : selectedCoin.name + 'USDT'}`;

    return (
        <div style={S.modalOverlay} {...overlayProps}>
            <div style={S.modal} {...dialogProps}>
                <div style={S.modalHeader}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <FaBitcoin style={{ fontSize: 28, color: '#f0b232' }} />
                        <h2 style={{ margin: 0, color: '#f0b232', fontWeight: 700 }}>{selectedCoin.name.replace('USDT', '')}</h2>
                        <span style={S.modalBadge}>{rows.length} Strateji</span>
                    </div>
                    <button onClick={onClose} style={S.modalCloseBtn}>{'✕'}</button>
                </div>

                <div style={S.modalStats}>
                    <div style={S.mStatCard}>
                        <span style={{ fontSize: '1.3em', fontWeight: 700, color: '#23a559' }}>
                            {isPositionsTab ? coinStats.uyumluCount : coinStats.profits}
                        </span>
                        <span style={S.mStatLabel}>{isPositionsTab ? '✅ Uyumlu' : 'Kârda'}</span>
                    </div>
                    <div style={S.mStatCard}>
                        <span style={{ fontSize: '1.3em', fontWeight: 700, color: '#da373c' }}>
                            {isPositionsTab ? coinStats.tersCount : coinStats.losses}
                        </span>
                        <span style={S.mStatLabel}>{isPositionsTab ? '⚠️ Ters Sinyal' : 'Zararda'}</span>
                    </div>
                    <div style={S.mStatCard}>
                        <span style={{ fontSize: '1.3em', fontWeight: 700, color: coinStats.avgPnl >= 0 ? '#23a559' : '#da373c' }}>
                            {coinStats.avgPnl >= 0 ? '+' : ''}{coinStats.avgPnl.toFixed(2)}%
                        </span>
                        <span style={S.mStatLabel}>Ort. PNL</span>
                    </div>
                    <div style={S.mStatCard}>
                        <span style={{ fontSize: '1.3em', fontWeight: 700, color: '#f0b232' }}>{coinStats.avgWr.toFixed(1)}%</span>
                        <span style={S.mStatLabel}>Ort. WR</span>
                    </div>
                    {coinStats.price && (
                        <div style={S.mStatCard}>
                            <span style={{ fontSize: '1.3em', fontWeight: 700, color: '#fff' }}>${formatPrice(coinStats.price)}</span>
                            <span style={S.mStatLabel}>Fiyat</span>
                        </div>
                    )}
                </div>

                <div style={S.modalBody}>
                    <h3 style={{ margin: '0 0 12px', color: '#fff', fontSize: '1em' }}>{'📊'} Strateji Detaylar{'ı'}</h3>
                    <div style={S.strategyList}>
                        {rows.map((row, idx) => {
                            const pnl = parsePnl(row.pnl_percent);
                            const isProfit = pnl > 0;
                            return (
                                <div key={idx} style={{ ...S.strategyCard, borderLeft: `4px solid ${isProfit ? '#23a559' : '#da373c'}`, animationDelay: `${idx * 0.04}s` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                        <span style={{ color: '#5865f2', fontWeight: 700, fontSize: '1.05em' }}>{row.timeframe}</span>
                                        <SignalBadge value={row.signal || row.sinyal_yonu || row.pozisyon_yonu || '-'} />
                                    </div>
                                    <div style={S.strategyGrid}>
                                        {[
                                            { label: 'Giriş', val: `$${formatPrice(row.entry_price)}` },
                                            { label: 'Güncel', val: `$${formatPrice(row.current_price)}` },
                                            { label: 'PNL', val: row.pnl_percent || '-', color: isProfit ? '#23a559' : '#da373c', bold: true },
                                            { label: 'WR', val: row.win_rate || '-' },
                                            { label: 'X Kat', val: row.x_kat || '-', color: '#f0b232' },
                                            { label: 'Hedef', val: row.hedef_roe || '-', color: '#5865f2' },
                                        ].map(({ label, val, color, bold }, i) => (
                                            <div key={i} style={S.stratItem}>
                                                <span style={S.stratItemLabel}>{label}</span>
                                                <span style={{ ...S.stratItemVal, ...(color ? { color } : {}), ...(bold ? { fontWeight: 700 } : {}) }}>{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: '1px solid #182135' }}>
                                        <StatusBadge status={row.status} />
                                        {row.days_ago !== undefined && (
                                            <span style={{ color: '#949ba4', fontSize: '0.78em' }}>{row.days_ago} g{'ü'}n {'·'} {row.bars_ago} bar</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{ padding: '12px 20px', borderTop: '1px solid #0e1222', textAlign: 'center' }}>
                    <a href={binanceUrl} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#f0b232', textDecoration: 'none', fontWeight: 600, fontSize: '0.9em' }}>
                        <FaExternalLinkAlt /> Binance Futures'da A{'ç'}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CoinDetailModal);
