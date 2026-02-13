// CryptoSignals/components.js
// Sub-components extracted from CryptoSignals.js

// === SİNYAL BADGE ===
export const SignalBadge = ({ value }) => {
    if (!value || value === '-') return <span style={{ color: '#949ba4' }}>-</span>;
    const isLong = String(value).toUpperCase() === 'LONG';
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 10px', borderRadius: 6, fontWeight: 700, fontSize: '0.82em',
            backgroundColor: isLong ? 'rgba(35,165,89,0.12)' : 'rgba(218,55,60,0.12)',
            color: isLong ? '#23a559' : '#da373c',
            border: `1px solid ${isLong ? 'rgba(35,165,89,0.25)' : 'rgba(218,55,60,0.25)'}`
        }}>
            {isLong ? '▲' : '▼'} {value}
        </span>
    );
};

// === DURUM BADGE ===
export const StatusBadge = ({ status }) => {
    if (!status) return <span style={{ color: '#949ba4' }}>-</span>;
    const s = String(status);
    const isProfit = s.includes('KAR') || s.includes('UYUYOR');
    const isLoss = s.includes('ZARAR') || s.includes('TERS');
    const clean = s.replace(/[\u{1F7E2}\u{1F534}\u{2705}\u{26A0}\u{FE0F}]/gu, '').trim();
    return (
        <span style={{
            padding: '3px 10px', borderRadius: 6, fontWeight: 700, fontSize: '0.82em',
            backgroundColor: isProfit ? 'rgba(35,165,89,0.12)' : isLoss ? 'rgba(218,55,60,0.12)' : 'rgba(240,178,50,0.12)',
            color: isProfit ? '#57F287' : isLoss ? '#ED4245' : '#f0b232',
        }}>
            {isProfit ? '✅' : isLoss ? '🔴' : '⚪'} {clean}
        </span>
    );
};
