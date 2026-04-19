// frontend/src/CryptoChartModal.js

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import useModalA11y from '../hooks/useModalA11y';

const CryptoChartModal = ({ symbol, onClose }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Crypto Chart' });
    const containerRef = useRef();

    // Sembol temizligi (USDT yoksa addyelim, varsa oldugu gibi kalsin)
    const rawSymbol = symbol.toUpperCase().trim();
    const cleanSymbol = rawSymbol.includes('USDT')
        ? `BINANCE:${rawSymbol}`
        : `BINANCE:${rawSymbol}USDT`;

    useEffect(() => {
        if (!containerRef.current) return;

        // TradingView Scriptini Manuel Create
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: cleanSymbol,
            interval: '15',
            timezone: 'Etc/UTC',
            theme: 'dark',
            style: '1',
            locale: 'tr',
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            calendar: false,
            support_host: 'https://www.tradingview.com',
        });

        containerRef.current.appendChild(script);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = ''; // Clear
            }
        };
    }, [cleanSymbol]);

    return (
        <div aria-label="crypto chart modal" style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <h3>?? {rawSymbol} Chart</h3>
                    <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
                        <FaTimes />
                    </button>
                </div>
                <div style={styles.chartContainer} ref={containerRef}>
                    {/* Grafik buraya uploadnecek */}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 3000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        height: '80%',
        backgroundColor: '#0d0e10',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    },
    header: {
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #0e1222',
        backgroundColor: '#111214',
        color: 'white',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        fontSize: '1.5em',
        cursor: 'pointer',
    },
    chartContainer: { flex: 1, width: '100%', height: '100%' },
};

CryptoChartModal.propTypes = {
    symbol: PropTypes.object,
    onClose: PropTypes.func,
};
export default CryptoChartModal;
