import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { LivePrice, formatPrice } from './helpers';
import styles from './styles';

const TradeModal = ({ coin, initialPrice, livePrices, portfolio, onClose, onTrade }) => {
    const [amount, setAmount] = useState('');
    const [usdtTotal, setUsdtTotal] = useState('');
    const [mode, setMode] = useState('BUY');

    const symbolKey = Object.keys(livePrices).find(k => k === coin || k === `${coin}USDT`) || coin;
    const currentLivePrice = livePrices[symbolKey] || initialPrice;
    const numericPrice = parseFloat(String(currentLivePrice).replace(/,/g, '').replace('$', ''));
    const userBalance = parseFloat(portfolio?.balance || 0);

    const findHolding = () => {
        if (!portfolio?.holdings) return 0;
        const keys = Object.keys(portfolio.holdings);
        const found = keys.find(k => k.includes(coin));
        return found ? parseFloat(portfolio.holdings[found]) : 0;
    };
    const userCoinHolding = findHolding();

    useEffect(() => {
        if (amount && !isNaN(parseFloat(amount))) {
            setUsdtTotal((parseFloat(amount) * numericPrice).toFixed(2));
        }
    }, [numericPrice]);

    const handleAmountChange = (val) => {
        setAmount(val);
        if (!val || isNaN(parseFloat(val))) { setUsdtTotal(''); return; }
        setUsdtTotal((parseFloat(val) * numericPrice).toFixed(2));
    };

    const handleUsdtChange = (val) => {
        setUsdtTotal(val);
        if (!val || isNaN(parseFloat(val))) { setAmount(''); return; }
        setAmount(parseFloat((parseFloat(val) / numericPrice).toFixed(6)).toString());
    };

    const handleMax = () => {
        if (mode === 'BUY') handleUsdtChange(userBalance.toString());
        else handleAmountChange(userCoinHolding.toString());
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                    <h3>{mode === 'BUY' ? '🟢 Alış' : '🔴 Satış'}: {coin}</h3>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>
                <div style={{ backgroundColor: '#2b2d31', padding: 10, borderRadius: 8, marginBottom: 15, textAlign: 'center' }}>
                    <span style={{ color: '#999', fontSize: '0.9em' }}>Canlı Piyasa Fiyatı</span>
                    <div style={{ fontSize: '1.4em', fontWeight: 'bold' }}><LivePrice price={currentLivePrice} /></div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
                    <button onClick={() => { setMode('BUY'); setAmount(''); setUsdtTotal(''); }}
                        style={{ ...styles.modeBtn, backgroundColor: mode === 'BUY' ? '#23a559' : '#2b2d31', opacity: mode === 'BUY' ? 1 : 0.5 }}>AL (Buy)</button>
                    <button onClick={() => { setMode('SELL'); setAmount(''); setUsdtTotal(''); }}
                        style={{ ...styles.modeBtn, backgroundColor: mode === 'SELL' ? '#da373c' : '#2b2d31', opacity: mode === 'SELL' ? 1 : 0.5 }}>SAT (Sell)</button>
                </div>
                <div style={{ marginBottom: 10, fontSize: '0.85em', color: '#dbdee1', display: 'flex', justifyContent: 'space-between', padding: '0 5px' }}>
                    <span>💰 Bakiye: <span style={{ color: '#23a559' }}>${userBalance.toFixed(2)}</span></span>
                    <span>🪙 Varlık: <span style={{ color: '#f0b232' }}>{formatPrice(userCoinHolding)} {coin}</span></span>
                </div>
                <div style={styles.inputWrapper}>
                    <label>Miktar ({coin})</label>
                    <div style={{ display: 'flex' }}>
                        <input type="number" value={amount} onChange={e => handleAmountChange(e.target.value)} style={styles.input} placeholder="0" />
                        {mode === 'SELL' && <button onClick={handleMax} style={styles.maxBtn}>MAX</button>}
                    </div>
                </div>
                <div style={styles.inputWrapper}>
                    <label>Toplam (USDT)</label>
                    <div style={{ display: 'flex' }}>
                        <input type="number" value={usdtTotal} onChange={e => handleUsdtChange(e.target.value)} style={styles.input} placeholder="0" />
                        {mode === 'BUY' && <button onClick={handleMax} style={styles.maxBtn}>MAX</button>}
                    </div>
                </div>
                <button onClick={() => onTrade(mode, coin, amount, numericPrice)}
                    style={{ ...styles.confirmBtn, backgroundColor: mode === 'BUY' ? '#23a559' : '#da373c' }}
                    disabled={!amount || parseFloat(amount) <= 0}>
                    {mode === 'BUY' ? 'SATIN AL' : 'SATIŞ YAP'}
                </button>
            </div>
        </div>
    );
};

export default TradeModal;
