/* eslint-disable no-misleading-character-class */
// CryptoSignals/components.js
// Sub-components extracted from CryptoSignals.js
import PropTypes from 'prop-types';
import i18n from '../i18n';
const _s = (o) => o;

// -- extracted inline style constants --
const _st1 = { color: '#949ba4' };

// === SİNYAL BADGE ===
export const SignalBadge = ({ value }) => {
    if (!value || value === '-') return <span style={_st1}>-</span>;
    const isLong = String(value).toUpperCase() === 'LONG';
    return (
        <span
            aria-label={i18n.t('aria.signalBadge', { defaultValue: 'Signal Badge' })}
            style={_s({
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '3px 10px',
                borderRadius: 6,
                fontWeight: 700,
                fontSize: '0.82em',
                backgroundColor: isLong ? 'rgba(35,165,89,0.12)' : 'rgba(218,55,60,0.12)',
                color: isLong ? '#23a559' : '#da373c',
                border: `1px solid ${isLong ? 'rgba(35,165,89,0.25)' : 'rgba(218,55,60,0.25)'}`,
            })}
        >
            {isLong ? '▲' : '▼'} {value}
        </span>
    );
};

SignalBadge.propTypes = {
    value: PropTypes.string,
};

// === DURUM BADGE ===
export const StatusBadge = ({ status }) => {
    if (!status) return <span style={_st1}>-</span>;
    const s = String(status);
    const isProfit = s.includes('KAR') || s.includes('UYUYOR');
    const isLoss = s.includes('ZARAR') || s.includes('TERS');
    const clean = s.replace(/[\u{1F7E2}\u{1F534}\u{2705}\u{26A0}\u{FE0F}]/gu, '').trim();
    return (
        <span
            style={_s({
                padding: '3px 10px',
                borderRadius: 6,
                fontWeight: 700,
                fontSize: '0.82em',
                backgroundColor: isProfit
                    ? 'rgba(35,165,89,0.12)'
                    : isLoss
                      ? 'rgba(218,55,60,0.12)'
                      : 'rgba(240,178,50,0.12)',
                color: isProfit ? '#23a559' : isLoss ? '#f23f42' : '#f0b232',
            })}
        >
            {isProfit ? '✅' : isLoss ? '🔴' : '⚪'} {clean}
        </span>
    );
};

StatusBadge.propTypes = {
    status: PropTypes.string,
};
