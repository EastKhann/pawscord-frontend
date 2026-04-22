import React, { useState, useEffect, useCallback } from 'react';
import { useAdminAPIContext } from '../AdminAPIContext';
import {
    FaSync,
    FaBitcoin,
    FaClock,
    FaCloud,
    FaExternalLinkAlt,
    FaChartLine,
} from 'react-icons/fa';
import styles from '../styles';
import toast from '../../../utils/toast';
import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';
import logger from '../../../utils/logger';

const S = {
    bg: {
        ...styles.statCard,
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #f0b23210, #5865f210)',
    },
};

const CryptoSignalsTab = () => {
    const { fetchWithAuth, apiBaseUrl } = useAdminAPIContext();
    const { t } = useTranslation();
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const [signalData, setSignalData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);

    const fetchFiles = useCallback(async () => {
        try {
            const res = await fetch(`${apiBaseUrl}/api/crypto/signals/list/`);
            if (res.ok) {
                const data = await res.json();
                setFiles(data.files || []);
                if (data.files?.length > 0 && !activeFile) {
                    setActiveFile(data.files[0].key);
                }
            }
        } catch (err) {
            logger.error('Crypto files error:', err);
        }
    }, [apiBaseUrl, activeFile]);

    const fetchSignals = useCallback(
        async (fileKey) => {
            setLoading(true);
            try {
                const url = fileKey
                    ? `${apiBaseUrl}/api/crypto/signals/?file=${encodeURIComponent(fileKey)}`
                    : `${apiBaseUrl}/api/crypto/signals/`;
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setSignalData(data);
                    setLastUpdate(new Date());
                } else {
                    toast.error(t('admin.panel.signalLoadError'));
                }
            } catch (err) {
                logger.error('Crypto signals error:', err);
                toast.error(t('admin.panel.signalLoadError'));
            }
            setLoading(false);
        },
        [apiBaseUrl]
    );

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);
    useEffect(() => {
        if (activeFile) fetchSignals(activeFile);
    }, [activeFile, fetchSignals]);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (activeFile) fetchSignals(activeFile);
        }, 30000);
        return () => clearInterval(interval);
    }, [activeFile, fetchSignals]);

    const meta = signalData?.meta || {};
    const balanceTabs = signalData?.balance_mode?.tabs || {};
    const winrateTabs = signalData?.winrate_mode?.tabs || {};
    const allTabNames = [...new Set([...Object.keys(balanceTabs), ...Object.keys(winrateTabs)])];

    // Count total strategies across all tabs
    const totalStrategies = Object.values(balanceTabs).reduce((sum, tab) => {
        return sum + (tab.strategies?.length || 0);
    }, 0);

    // Top strategies by PNL
    const topStrategies = [];
    for (const [tabName, tabData] of Object.entries(balanceTabs)) {
        for (const strat of tabData.strategies || []) {
            topStrategies.push({
                ...strat,
                tab: tabName,
            });
        }
    }
    topStrategies.sort((a, b) => parseFloat(b.pnl_pct || 0) - parseFloat(a.pnl_pct || 0));

    return (
        <div>
            {/* Header */}
            <div className={css.headerRow}>
                <h2 className={css.sectionHeader}>
                    <FaBitcoin color="#f0b232" /> Kripto Sinyaller
                </h2>
                <div className={css.flexAlignGap8}>
                    {lastUpdate && (
                        <span className={css.textGray11}>
                            <FaClock size={10} /> {lastUpdate.toLocaleTimeString('tr-TR')}
                        </span>
                    )}
                    <button
                        aria-label={t('crypto.refreshSignals', 'Refresh signals')}
                        onClick={() => {
                            fetchFiles();
                            if (activeFile) fetchSignals(activeFile);
                        }}
                        style={styles.actionBtn('#5865f2')}
                    >
                        <FaSync size={11} /> {t('crypto.refresh', 'Refresh')}
                    </button>
                    <a
                        href="/crypto-signals"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t('crypto.openFullPanel', 'Open Crypto Signals panel in new tab')}
                    >
                        <FaExternalLinkAlt size={10} /> {t('crypto.fullPanel', 'Full Panel')}
                    </a>
                </div>
            </div>

            {/* File selector */}
            {files.length > 0 && (
                <div className="flex-8-mb16-wrap">
                    {files.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setActiveFile(f.key)}
                            style={{
                                ...styles.actionBtn(activeFile === f.key ? '#f0b232' : '#333'),
                                padding: '6px 12px',
                                fontSize: '12px',
                            }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Stats overview */}
            {loading && !signalData ? (
                <div className={css.loadingCenter}>
                    <FaSync className="spin" size={20} /> {t('common.loading', 'Loading...')}
                </div>
            ) : signalData ? (
                <>
                    <div className={css.grid4colGap12}>
                        {[
                            {
                                label: 'Toplam Strateji',
                                value: totalStrategies || meta.total_strategies || 0,
                                color: '#5865f2',
                            },
                            {
                                label: t('admin.panel.fileCount'),
                                value: files.length,
                                color: '#23a559',
                            },
                            {
                                label: t('admin.panel.tabCount'),
                                value: allTabNames.length,
                                color: '#f0b232',
                            },
                            {
                                label: 'Pozisyon Coinler',
                                value: (meta.position_coins || []).length,
                                color: '#e74c3c',
                            },
                        ].map((item, idx) => (
                            <div key={`item-${idx}`} style={styles.statCard}>
                                <div
                                    style={{
                                        fontSize: '28px',
                                        fontWeight: '700',
                                        color: item.color,
                                    }}
                                >
                                    {item.value}
                                </div>
                                <div className={css.cryptoMetaLabel}>{item.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* R2 CDN Info */}
                    <div style={S.bg}>
                        <div className="flex-align-8-mb">
                            <FaCloud color="#5865f2" />
                            <span className={css.labelLg}>{t('r2_cdn_statusu')}</span>
                        </div>
                        <div className="text-b5-12">
                            Signal files are pushed via{' '}
                            <code className="icon-warning">copy_crypto_signals.py</code> script to
                            both local and R2. In production, backend uses R2 CDN fallback.
                        </div>
                        {meta.export_time && (
                            <div className={css.cryptoMetaValue}>
                                Son export: {new Date(meta.export_time).toLocaleString('tr-TR')}
                            </div>
                        )}
                    </div>

                    {/* Top 10 strategies */}
                    {topStrategies.length > 0 && (
                        <>
                            <h3 className={css.cryptoCardTitle}>
                                <FaChartLine color="#23a559" /> {t('admin.panel.topStrategies')}
                            </h3>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>#</th>
                                        <th style={styles.th}>{t('coin')}</th>
                                        <th style={styles.th}>{t('strateji')}</th>
                                        <th style={styles.th}>{t('tab')}</th>
                                        <th style={styles.th}>{t('pnl')}</th>
                                        <th style={styles.th}>{t('win_rate')}</th>
                                        <th style={styles.th}>{t('admin.panel.operation')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topStrategies.slice(0, 10).map((s, idx) => {
                                        const pnl = parseFloat(s.pnl_pct || 0);
                                        const pnlColor =
                                            pnl > 0 ? '#23a559' : pnl < 0 ? '#e74c3c' : '#6b7280';
                                        return (
                                            <tr key={`item-${idx}`}>
                                                <td style={styles.td}>{idx + 1}</td>
                                                <td className={css.tdOrange}>
                                                    {s.symbol || s.coin || '-'}
                                                </td>
                                                <td style={styles.td}>
                                                    {s.strategy || s.name || '-'}
                                                </td>
                                                <td style={styles.td}>
                                                    <span style={styles.badge('#5865f2')}>
                                                        {s.tab}
                                                    </span>
                                                </td>
                                                <td>
                                                    {pnl > 0 ? '+' : ''}
                                                    {pnl.toFixed(2)}%
                                                </td>
                                                <td style={styles.td}>
                                                    {s.win_rate
                                                        ? `${(parseFloat(s.win_rate) * 100).toFixed(1)}%`
                                                        : '-'}
                                                </td>
                                                <td style={styles.td}>
                                                    {s.trades || s.total_trades || '-'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>
                    )}

                    {/* Position coins */}
                    {meta.position_coins?.length > 0 && (
                        <div className="mt-16">
                            <h3 className="white-14-mb8">📌 Pozisyon Coinleri</h3>
                            <div className="flex-wrap-6g">
                                {meta.position_coins.map((coin, idx) => (
                                    <span key={`item-${idx}`}>{coin}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className={css.cryptoEmpty}>
                    <FaBitcoin size={40} className={css.cryptoEmptyIcon} />
                    <p>{t('sinyal_verisi_not_found')}</p>
                    <p className="fs-12">{t('admin.panel.noSignalFiles')}</p>
                </div>
            )}
        </div>
    );
};
export default CryptoSignalsTab;
