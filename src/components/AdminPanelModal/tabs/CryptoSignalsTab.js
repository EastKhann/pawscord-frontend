import React, { useState, useEffect, useCallback } from 'react';
import { FaSync, FaBitcoin, FaClock, FaCloud, FaExternalLinkAlt, FaChartLine } from 'react-icons/fa';
import styles from '../styles';
import toast from '../../../utils/toast';

const CryptoSignalsTab = ({ fetchWithAuth, apiBaseUrl }) => {
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
            console.error('Crypto files error:', err);
        }
    }, [apiBaseUrl, activeFile]);

    const fetchSignals = useCallback(async (fileKey) => {
        setLoading(true);
        try {
            const url = fileKey
                ? `${apiBaseUrl}/api/crypto/signals/?file=${fileKey}`
                : `${apiBaseUrl}/api/crypto/signals/`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setSignalData(data);
                setLastUpdate(new Date());
            } else {
                toast.error('Sinyal verisi yüklenemedi');
            }
        } catch (err) {
            console.error('Crypto signals error:', err);
            toast.error('Sinyal verisi yüklenemedi');
        }
        setLoading(false);
    }, [apiBaseUrl]);

    useEffect(() => { fetchFiles(); }, [fetchFiles]);
    useEffect(() => { if (activeFile) fetchSignals(activeFile); }, [activeFile, fetchSignals]);

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
        for (const strat of (tabData.strategies || [])) {
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#fff', fontSize: '18px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaBitcoin color="#f0b232" /> Kripto Sinyaller
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {lastUpdate && (
                        <span style={{ color: '#6b7280', fontSize: '11px' }}>
                            <FaClock size={10} /> {lastUpdate.toLocaleTimeString('tr-TR')}
                        </span>
                    )}
                    <button
                        onClick={() => { fetchFiles(); if (activeFile) fetchSignals(activeFile); }}
                        style={styles.actionBtn('#5865f2')}
                    >
                        <FaSync size={11} /> Yenile
                    </button>
                    <a
                        href="/crypto-signals"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ ...styles.actionBtn('#23a559'), textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                        <FaExternalLinkAlt size={10} /> Tam Panel
                    </a>
                </div>
            </div>

            {/* File selector */}
            {files.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {files.map(f => (
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
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                    <FaSync className="spin" size={20} /> Yükleniyor...
                </div>
            ) : signalData ? (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                        {[
                            { label: 'Toplam Strateji', value: totalStrategies || meta.total_strategies || 0, color: '#5865f2' },
                            { label: 'Dosya Sayısı', value: files.length, color: '#23a559' },
                            { label: 'Tab Sayısı', value: allTabNames.length, color: '#f0b232' },
                            { label: 'Pozisyon Coinler', value: (meta.position_coins || []).length, color: '#e74c3c' },
                        ].map((item, idx) => (
                            <div key={idx} style={styles.statCard}>
                                <div style={{ fontSize: '28px', fontWeight: '700', color: item.color }}>{item.value}</div>
                                <div style={{ color: '#8b8d91', fontSize: '11px', textTransform: 'uppercase' }}>{item.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* R2 CDN Info */}
                    <div style={{
                        ...styles.statCard,
                        marginBottom: '16px',
                        background: 'linear-gradient(135deg, #f0b23210, #5865f210)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <FaCloud color="#5865f2" />
                            <span style={{ color: '#fff', fontWeight: '600', fontSize: '13px' }}>R2 CDN Durumu</span>
                        </div>
                        <div style={{ color: '#b5bac1', fontSize: '12px' }}>
                            Sinyal dosyaları <code style={{ color: '#f0b232' }}>copy_crypto_signals.py</code> scripti ile
                            hem yerel hem R2'ye push ediliyor. Production'da backend R2 CDN fallback kullanır.
                        </div>
                        {meta.export_time && (
                            <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '4px' }}>
                                Son export: {new Date(meta.export_time).toLocaleString('tr-TR')}
                            </div>
                        )}
                    </div>

                    {/* Top 10 strategies */}
                    {topStrategies.length > 0 && (
                        <>
                            <h3 style={{ color: '#fff', fontSize: '14px', marginBottom: '12px' }}>
                                <FaChartLine color="#23a559" /> En İyi 10 Strateji (PNL%)
                            </h3>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>#</th>
                                        <th style={styles.th}>Coin</th>
                                        <th style={styles.th}>Strateji</th>
                                        <th style={styles.th}>Tab</th>
                                        <th style={styles.th}>PNL%</th>
                                        <th style={styles.th}>Win Rate</th>
                                        <th style={styles.th}>İşlem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topStrategies.slice(0, 10).map((s, idx) => {
                                        const pnl = parseFloat(s.pnl_pct || 0);
                                        const pnlColor = pnl > 0 ? '#23a559' : pnl < 0 ? '#e74c3c' : '#6b7280';
                                        return (
                                            <tr key={idx}>
                                                <td style={styles.td}>{idx + 1}</td>
                                                <td style={{ ...styles.td, color: '#f0b232', fontWeight: '600' }}>
                                                    {s.symbol || s.coin || '-'}
                                                </td>
                                                <td style={styles.td}>{s.strategy || s.name || '-'}</td>
                                                <td style={styles.td}>
                                                    <span style={styles.badge('#5865f2')}>{s.tab}</span>
                                                </td>
                                                <td style={{ ...styles.td, color: pnlColor, fontWeight: '700' }}>
                                                    {pnl > 0 ? '+' : ''}{pnl.toFixed(2)}%
                                                </td>
                                                <td style={styles.td}>
                                                    {s.win_rate ? `${(parseFloat(s.win_rate) * 100).toFixed(1)}%` : '-'}
                                                </td>
                                                <td style={styles.td}>{s.trades || s.total_trades || '-'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>
                    )}

                    {/* Position coins */}
                    {meta.position_coins?.length > 0 && (
                        <div style={{ marginTop: '16px' }}>
                            <h3 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>
                                📌 Pozisyon Coinleri
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {meta.position_coins.map((coin, idx) => (
                                    <span key={idx} style={{
                                        ...styles.badge('#f0b232'),
                                        padding: '4px 10px',
                                        fontSize: '12px',
                                    }}>
                                        {coin}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
                    <FaBitcoin size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
                    <p>Sinyal verisi bulunamadı</p>
                    <p style={{ fontSize: '12px' }}>
                        <code>copy_crypto_signals.py</code> scriptini çalıştırın veya R2'ye signal JSON'larını push edin.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CryptoSignalsTab;
