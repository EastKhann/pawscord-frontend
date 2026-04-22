/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './EconomySystemPanel.css';
import { FaCoins, FaPaperPlane, FaHistory, FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

function EconomySystemPanel({ apiBaseUrl, fetchWithAuth }) {
    const { t } = useTranslation();
    const [balance, setBalance] = useState(0);
    const [history, setHistory] = useState([]);
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadBalance();
        loadHistory();
    }, []);

    const loadBalance = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/economy/balance/`);
            if (response.ok) {
                const data = await response.json();
                setBalance(data.balance || 0);
            }
        } catch (err) {
            logger.error('Error loading balance:', err);
        }
    };

    const loadHistory = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/economy/history/`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data.transactions || []);
            }
        } catch (err) {
            logger.error('Error loading history:', err);
        } finally {
            setLoading(false);
        }
    };

    const transferCoins = async () => {
        if (!recipient.trim()) {
            setMessage('❌ Please enter recipient username');
            return;
        }

        if (!amount || parseFloat(amount) <= 0) {
            setMessage('❌ Please enter valid amount');
            return;
        }

        if (parseFloat(amount) > balance) {
            setMessage('❌ Insufficient balance');
            return;
        }

        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/economy/transfer/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to_username: recipient,
                    amount: parseFloat(amount),
                    note: note || null,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`✅ Sent ${amount} coins to ${recipient}!`);
                setRecipient('');
                setAmount('');
                setNote('');
                loadBalance();
                loadHistory();
            } else {
                const data = await response.json();
                setMessage(`❌ ${data.error || 'Transfer failed'}`);
            }
        } catch (err) {
            setMessage('❌ Network error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatCoins = (value) => {
        return new Intl.NumberFormat('en-US').format(value);
    };

    return (
        <div className="economy-system-panel">
            <div className="economy-header">
                <h2>
                    <FaCoins /> Economy System
                </h2>
            </div>

            {message && <div className="economy-message">{message}</div>}

            <div className="balance-section">
                <div className="balance-card">
                    <FaWallet className="balance-icon" />
                    <div className="balance-info">
                        <div className="balance-label">Bakiyeniz</div>
                        <div className="balance-amount">
                            <FaCoins className="coin-icon" />
                            {formatCoins(balance)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="transfer-section">
                <h3>
                    <FaPaperPlane /> {t('economy.sendCoin', 'Send Coin')}
                </h3>
                <div className="transfer-form">
                    <div className="form-group">
                        <label>{t('economy.recipientUsername', 'Recipient Username:')}</label>
                        <input
                            type="text"
                            placeholder={t('common.usernameEnter', 'Enter username...')}
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Miktar:</label>
                        <div className="amount-input-wrapper">
                            <FaCoins className="input-coin-icon" />
                            <input
                                type="number"
                                step="1"
                                min="1"
                                max={balance}
                                placeholder={t('economy.amount', '0')}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="form-input amount-input"
                            />
                        </div>
                        <div className="balance-hint">Mevcut: {formatCoins(balance)} coin</div>
                    </div>
                    <div className="form-group">
                        <label>{t('economy.noteOptional', 'Note (optional):')}</label>
                        <input
                            type="text"
                            placeholder={t('economy.message', 'Add a message...')}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <button
                        aria-label={t('economy.transferCoins', 'Transfer coins')}
                        className="transfer-btn"
                        onClick={transferCoins}
                        disabled={loading || !recipient || !amount}
                    >
                        <FaPaperPlane /> {t('economy.sendCoin', 'Send Coin')}
                    </button>
                </div>
            </div>

            <div className="history-section">
                <h3>
                    <FaHistory /> Transaction History
                </h3>
                {loading && history.length === 0 ? (
                    <div className="loading">{t('economy.historyLoading', 'Loading history...')}</div>
                ) : history.length === 0 ? (
                    <div className="empty-history">
                        <FaHistory className="empty-icon" />
                        <p>{t('economy.noTransactions', 'No transactions yet')}</p>
                    </div>
                ) : (
                    <div className="history-list">
                        {history.map((transaction, idx) => (
                            <div key={`item-${idx}`} className={`history-item ${transaction.type}`}>
                                <div className="transaction-icon">
                                    {transaction.type === 'sent' ? (
                                        <FaArrowUp className="icon-sent" />
                                    ) : (
                                        <FaArrowDown className="icon-received" />
                                    )}
                                </div>
                                <div className="transaction-info">
                                    <div className="transaction-user">
                                        {transaction.type === 'sent'
                                            ? `To: ${transaction.to_username}`
                                            : `From: ${transaction.from_username}`}
                                    </div>
                                    {transaction.note && (
                                        <div className="transaction-note">{transaction.note}</div>
                                    )}
                                    <div className="transaction-date">
                                        {new Date(transaction.created_at).toLocaleString()}
                                    </div>
                                </div>
                                <div className={`transaction-amount ${transaction.type}`}>
                                    {transaction.type === 'sent' ? '-' : '+'}
                                    <FaCoins className="amount-coin" />
                                    {formatCoins(transaction.amount)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

EconomySystemPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default EconomySystemPanel;
