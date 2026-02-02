// frontend/src/CryptoChartModal.js

import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const CryptoChartModal = ({ symbol, onClose }) => {
    const containerRef = useRef();

    // Sembol temizliği (USDT yoksa ekleyelim, varsa olduğu gibi kalsın)
    const rawSymbol = symbol.toUpperCase().trim();
    const cleanSymbol = rawSymbol.includes('USDT')
        ? `BINANCE:${rawSymbol}`
        : `BINANCE:${rawSymbol}USDT`;

    useEffect(() => {
        if (!containerRef.current) return;

        // TradingView Scriptini Manuel Oluştur
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "autosize": true,
            "symbol": cleanSymbol,
            "interval": "15",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "tr",
            "enable_publishing": false,
            "hide_side_toolbar": false,
            "allow_symbol_change": true,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
        });

        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = ''; // Temizle
            }
        };
    }, [cleanSymbol]);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3>📈 {rawSymbol} Grafiği</h3>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>
                <div style={styles.chartContainer} ref={containerRef}>
                    {/* Grafik buraya yüklenecek */}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 3000,
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    modal: {
        width: '90%', height: '80%', backgroundColor: '#1e1f22',
        borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
    },
    header: {
        padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid #2b2d31', backgroundColor: '#2b2d31', color: 'white'
    },
    closeBtn: {
        background: 'none', border: 'none', color: '#b9bbbe', fontSize: '1.5em', cursor: 'pointer'
    },
    chartContainer: { flex: 1, width: '100%', height: '100%' }
};

export default CryptoChartModal;

