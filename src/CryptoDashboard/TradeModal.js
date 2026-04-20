/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { LivePrice, formatPrice } from './helpers';
import useModalA11y from '../hooks/useModalA11y';
import styles from './styles';

// -- extracted inline style constants --

const TradeModal = ({ coin, initialPrice, livePrices, portfolio, onClose, onTrade }) => {
    const { t } = useTranslation();
    const [amount, setAmount] = useState('');
    const [usdtTotal, setUsdtTotal] = useState('');
    const [mode, setMode] = useState('BUY');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const symbolKey =
        Object.keys(livePrices).find((k) => k === coin || k === `${coin}USDT`) || coin;
    const currentLivePrice = livePrices[symbolKey] || initialPrice;
    const numericPrice = parseFloat(String(currentLivePrice).replace(/,/g, '').replace('$', ''));
    const userBalance = parseFloat(portfolio?.balance || 0);

    const findHolding = () => {
        if (!portfolio?.holdings) return 0;
        const keys = Object.keys(portfolio.holdings);
        const found = keys.find((k) => k.includes(coin));
        return found ? parseFloat(portfolio.holdings[found]) : 0;
    };
    const userCoinHolding = findHolding();
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: true,
        label: t('crypto.trade'),
    });

    useEffect(() => {
        if (amount && !isNaN(parseFloat(amount))) {
            setUsdtTotal((parseFloat(amount) * numericPrice).toFixed(2));
        }
    }, [numericPrice]);

    const handleAmountChange = (val) => {
        setAmount(val);
        if (!val || isNaN(parseFloat(val))) {
            setUsdtTotal('');
            return;
        }
        setUsdtTotal((parseFloat(val) * numericPrice).toFixed(2));
    };

    const handleUsdtChange = (val) => {
        setUsdtTotal(val);
        if (!val || isNaN(parseFloat(val))) {
            setAmount('');
            return;
        }
        setAmount(parseFloat((parseFloat(val) / numericPrice).toFixed(6)).toString());
    };

    const handleMax = () => {
        if (mode === 'BUY') handleUsdtChange(userBalance.toString());
        else handleAmountChange(userCoinHolding.toString());
    };

    return (
        <div style={styles.modalOverlay} {...overlayProps}>
            <div style={styles.modalContent} {...dialogProps}>
                <div style={styles.modalHeader}>
                    <h3>
                        {mode === 'BUY' ? '🟢 Buy' : '🔴 Sell'}: {coin}
                    </h3>
                    <button
                        onClick={onClose}
                        style={styles.closeBtn}
                        aria-label={t('common.close')}
                    >
                        <FaTimes />
                    </button>
                </div>
                <div>
                    <span>{t('crypto.livePrice')}</span>
                    <div>
                        <LivePrice price={currentLivePrice} />
                    </div>
                </div>
                <div>
                    <button
                        aria-label="AL (Buy)"
                        onClick={() => {
                            setMode('BUY');
                            setAmount('');
                            setUsdtTotal('');
                        }}
                        style={{
                            ...styles.modeBtn,
                            backgroundColor: mode === 'BUY' ? '#23a559' : '#111214',
                            opacity: mode === 'BUY' ? 1 : 0.5,
                        }}
                    >
                        AL (Buy)
                    </button>
                    <button
                        aria-label="SAT (Sell)"
                        onClick={() => {
                            setMode('SELL');
                            setAmount('');
                            setUsdtTotal('');
                        }}
                        style={{
                            ...styles.modeBtn,
                            backgroundColor: mode === 'SELL' ? '#da373c' : '#111214',
                            opacity: mode === 'SELL' ? 1 : 0.5,
                        }}
                    >
                        SAT (Sell)
                    </button>
                </div>
                <div>
                    <span>
                        💰 Bakiye: <span>${userBalance.toFixed(2)}</span>
                    </span>
                    <span>
                        🪙 Sahip Olunan:{' '}
                        <span>
                            {formatPrice(userCoinHolding)} {coin}
                        </span>
                    </span>
                </div>
                <div style={styles.inputWrapper}>
                    <label>Miktar ({coin})</label>
                    <div>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => handleAmountChange(e.target.value)}
                            style={styles.input}
                            placeholder="0"
                        />
                        {mode === 'SELL' && (
                            <button aria-label="Maksimum" onClick={handleMax} style={styles.maxBtn}>
                                MAX
                            </button>
                        )}
                    </div>
                </div>
                <div style={styles.inputWrapper}>
                    <label>{t('crypto.total')}</label>
                    <div>
                        <input
                            type="number"
                            value={usdtTotal}
                            onChange={(e) => handleUsdtChange(e.target.value)}
                            style={styles.input}
                            placeholder="0"
                        />
                        {mode === 'BUY' && (
                            <button aria-label="Maksimum" onClick={handleMax} style={styles.maxBtn}>
                                MAX
                            </button>
                        )}
                    </div>
                </div>
                <button
                    aria-label="İşlem yap"
                    onClick={() => onTrade(mode, coin, amount, numericPrice)}
                    style={{
                        ...styles.confirmBtn,
                        backgroundColor: mode === 'BUY' ? '#23a559' : '#da373c',
                    }}
                    disabled={!amount || parseFloat(amount) <= 0}
                >
                    {mode === 'BUY' ? 'BUY' : 'SELL'}
                </button>
            </div>
        </div>
    );
};

TradeModal.propTypes = {
    coin: PropTypes.object,
    initialPrice: PropTypes.object,
    livePrices: PropTypes.array,
    portfolio: PropTypes.number,
    onClose: PropTypes.func,
    onTrade: PropTypes.func,
};
export default TradeModal;
