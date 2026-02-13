// CryptoSignals/utils.js
// Utility functions extracted from CryptoSignals.js

export const formatPrice = (price) => {
    if (!price || price === '-') return '-';
    const num = parseFloat(String(price).replace(/,/g, ''));
    if (isNaN(num)) return String(price);
    if (num >= 1000) return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (num >= 1) return num.toFixed(4);
    return num.toPrecision(4);
};

export const parsePnl = (pnl) => {
    if (!pnl) return 0;
    return parseFloat(String(pnl).replace('%', '').replace('+', '')) || 0;
};

// === TAB CONFIG - DİNAMİK ===
export const getTabConfig = (tabKey) => {
    const defaults = {
        icon: '📋', label: tabKey.replace(/_/g, ' '), shortLabel: tabKey.slice(0, 8), color: '#5865f2'
    };

    // İsimden icon ve renk tahmin et
    const key = tabKey.toUpperCase();
    if (key.includes('ACIK') || key.includes('POZISYON')) {
        return { icon: '💼', label: tabKey.replace(/_/g, ' '), shortLabel: 'Açık Poz.', color: '#f0b232' };
    }
    if (key.includes('ZARAR')) {
        return { icon: '🔴', label: tabKey.replace(/_/g, ' '), shortLabel: 'Zararda', color: '#da373c' };
    }
    if (key.includes('ALIM') || key.includes('FIRSAT')) {
        return { icon: '💰', label: tabKey.replace(/_/g, ' '), shortLabel: 'Alım Fır.', color: '#23a559' };
    }
    if (key.includes('OLMAYAN') || key.includes('YOK')) {
        return { icon: '🔍', label: tabKey.replace(/_/g, ' '), shortLabel: 'Poz. Yok', color: '#949ba4' };
    }

    return defaults;
};

// === PNL RENK ===
export const pnlColor = (val) => {
    const n = parsePnl(val);
    if (n > 0) return '#23a559';
    if (n < 0) return '#da373c';
    return '#949ba4';
};
