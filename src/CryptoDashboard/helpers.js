/* eslint-disable react-hooks/rules-of-hooks */
// PropTypes validation: N/A for this module (hook/utility — no React props interface)
import { useState, useEffect } from 'react';
import i18n from '../i18n';

// -- extracted inline style constants --

// Güvenli veri yazdırma
export const safeRender = (value) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
};

// Fiyat formatlayıcı
export const formatPrice = (price) => {
    if (!price || price === 'Loading...' || price === 'Fiyat Waiting...') return price;
    return parseFloat(price).toString();
};

// PNL renk yardımcısı
export const pnlColor = (pnl) => {
    if (!pnl) return '#949ba4';
    const str = String(pnl);
    if (str.startsWith('+')) return '#23a559';
    if (str.startsWith('-')) return '#da373c';
    return '#f0b232';
};

// Tab bilgileri
export const TAB_CONFIG = {
    TUM_STRATEJILER: { icon: '📊', shortLabel: 'All', color: '#5865f2' },
    ACIK_POZISYONLAR: { icon: '💼', shortLabel: 'Open Poz.', color: '#f0b232' },
    POZISYON_OLMAYAN: { icon: '🔍', shortLabel: 'Poz. Yok', color: '#949ba4' },
    ZARARDA_OLANLAR: { icon: '🔴', shortLabel: 'In Loss', color: '#da373c' },
    ALIM_FIRSATI: { icon: '💰', shortLabel: 'Buy Opp.', color: '#23a559' },
};

// Canlı fiyat bileşeni
export const LivePrice = ({ price }) => {
    const [prevPrice, setPrevPrice] = useState(price);
    const [colorClass, setColorClass] = useState('');

    useEffect(() => {
        if (!price || price === 'Loading...' || price === 'Fiyat Waiting...' || price === '...')
            return;
        const current = parseFloat(price);
        const previous = parseFloat(prevPrice);
        if (current > previous) setColorClass('flash-green');
        else if (current < previous) setColorClass('flash-red');
        setPrevPrice(price);
        const timer = setTimeout(() => setColorClass(''), 1000);
        return () => clearTimeout(timer);
    }, [price]);

    const displayPrice = formatPrice(price);
    return (
        <span
            aria-label={i18n.t('aria.priceDisplay', { defaultValue: 'Price' })}
            className={colorClass}
            style={{
                fontSize: '0.95em',
                fontWeight: 'bold',
                color:
                    price === 'Loading...' || price === 'Fiyat Waiting...' || price === '...'
                        ? '#999'
                        : colorClass === 'flash-green'
                          ? '#23a559'
                          : colorClass === 'flash-red'
                            ? '#da373c'
                            : '#23a559',
                transition: 'color 0.5s ease',
            }}
        >
            {price !== 'Loading...' && price !== 'Fiyat Waiting...' && price !== '...'
                ? `$${displayPrice}`
                : price}
        </span>
    );
};

// Signal badge
export const SignalBadge = ({ signal }) => {
    if (!signal || signal === '-') return <span>-</span>;
    const isLong = signal === 'LONG';
    return (
        <span
            style={{
                backgroundColor: isLong ? 'rgba(35,165,89,0.15)' : 'rgba(218,55,60,0.15)',
                color: isLong ? '#23a559' : '#da373c',
                padding: '2px 8px',
                borderRadius: 4,
                fontWeight: 700,
                fontSize: '0.8em',
                border: `1px solid ${isLong ? 'rgba(35,165,89,0.3)' : 'rgba(218,55,60,0.3)'}`,
            }}
        >
            {isLong ? '▲' : '▼'} {signal}
        </span>
    );
};

// Status badge
export const StatusBadge = ({ status }) => {
    if (!status) return <span>-</span>;
    const str = String(status);
    const isProfit = str.includes('KAR') || str.includes('UYUYOR');
    const isLoss = str.includes('ZARAR') || str.includes('TERS');
    return (
        <span
            style={{
                fontSize: '0.8em',
                fontWeight: 600,
                color: isProfit ? '#23a559' : isLoss ? '#da373c' : '#f0b232',
            }}
        >
            {str}
        </span>
    );
};
