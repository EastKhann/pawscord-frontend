/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../utils/tokenStorage';
import PropTypes from 'prop-types';
import logger from '../utils/logger';
import './EconomySystemPanel.css';
import { API_BASE_URL } from '../utils/apiEndpoints';


/**
 * EconomySystemPanel Component
 * Server economy system with coin transfers and transaction history
 * @component
 */
const EconomySystemPanel = ({ currentUser, serverId, onClose }) => {
  const { t } = useTranslation();
  const [balance, setBalance] = useState(0);
  const [recipientUsername, setRecipientUsername] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferNote, setTransferNote] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [error, setError] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const animationRef = useRef(null);

  const coinParticles = useMemo(
    () => Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 1 + Math.random(),
    })),
    [showAnimation]
  );

  useEffect(() => {
    fetchEconomyData();
  }, [serverId]);

  /**
   * Fetch economy data
   */
  const fetchEconomyData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchBalance(),
        fetchTransactionHistory(),
        fetchLeaderboard()
      ]);
    } catch (err) {
      logger.error('Failed to fetch economy data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch user balance
   */
  const fetchBalance = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/economy/balance/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance || 0);
      }
    } catch (err) {
      logger.error('Failed to fetch balance:', err);
    }
  };

  /**
   * Fetch transaction history
   */
  const fetchTransactionHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/economy/history/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      }
    } catch (err) {
      logger.error('Failed to fetch transaction history:', err);
    }
  };

  /**
   * Fetch leaderboard
   */
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/economy/leaderboard/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      }
    } catch (err) {
      logger.error('Failed to fetch leaderboard:', err);
    }
  };

  /**
   * Transfer coins
   */
  const transferCoins = async () => {
    if (!recipientUsername.trim()) {
      setError(t('economy.enterRecipient', 'Please enter recipient username'));
      return;
    }

    const amount = parseInt(transferAmount);
    if (!amount || amount <= 0) {
      setError(t('economy.validAmount', 'Please enter a valid amount'));
      return;
    }

    if (amount > balance) {
      setError(t('economy.insufficientBalance', 'Insufficient balance'));
      return;
    }

    setIsTransferring(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/economy/transfer/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          recipient_username: recipientUsername,
          amount: amount,
          note: transferNote
        })
      });

      if (response.ok) {
        const data = await response.json();

        // Update balance
        setBalance(data.new_balance);

        // Show success animation
        triggerCoinAnimation();

        // Reset form
        setRecipientUsername('');
        setTransferAmount('');
        setTransferNote('');

        // Refresh transactions
        await fetchTransactionHistory();

        showToast(t('economy.transferSuccess', 'Successfully sent {{amount}} coins to {{user}}', { amount, user: recipientUsername }), 'success');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Transfer failed');
      }
    } catch (err) {
      logger.error('Transfer error:', err);
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setIsTransferring(false);
    }
  };

  /**
   * Trigger coin animation
   */
  const triggerCoinAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  };

  /**
   * Filter transactions by type
   */
  const getFilteredTransactions = () => {
    if (filterType === 'all') return transactions;
    if (filterType === 'sent') {
      return transactions.filter(t => t.sender_id === currentUser?.id);
    }
    if (filterType === 'received') {
      return transactions.filter(t => t.recipient_id === currentUser?.id);
    }
    return transactions;
  };

  /**
   * Format number with commas
   */
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  /**
   * Get transaction icon
   */
  const getTransactionIcon = (transaction) => {
    if (transaction.type === 'admin') return 'crown';
    if (transaction.type === 'daily') return 'calendar-day';
    if (transaction.type === 'reward') return 'gift';
    if (transaction.sender_id === currentUser?.id) return 'arrow-up';
    return 'arrow-down';
  };

  /**
   * Get transaction color
   */
  const getTransactionColor = (transaction) => {
    if (transaction.sender_id === currentUser?.id) return 'red';
    return 'green';
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type) => {
  };

  return (
    <div aria-label="economy system panel" className="economy-system-panel">
      {/* Coin Animation Overlay */}
      {showAnimation && (
        <div className="coin-animation-overlay">
          {coinParticles.map((p, i) => (
            <div
              key={`item-${i}`}
              className="coin-particle"
              style={{
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            >
              🪙
            </div>
          ))}
        </div>
      )}

      <div className="panel-header">
        <h2>
          <i className="fas fa-coins"></i>
          {t('economy.title', 'Economy System')}
        </h2>
        <button className="close-btn" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="panel-content">
        {/* Balance Display */}
        <div className="balance-section">
          <div className="balance-card">
            <div className="balance-label">{t('economy.yourBalance', 'Your Balance')}</div>
            <div className="balance-amount">
              <i className="fas fa-coins coin-icon"></i>
              <span className="amount">{formatNumber(balance)}</span>
              <span className="currency">{t('economy.coins', 'coins')}</span>
            </div>
            <div className="balance-actions">
              <button className="btn-daily">
                <i className="fas fa-calendar-day"></i>
                {t('economy.dailyReward', 'Daily Reward')}
              </button>
            </div>
          </div>
        </div>

        {/* Transfer Section */}
        <div className="transfer-section">
          <h3>
            <i className="fas fa-paper-plane"></i>
            {t('economy.transferCoins', 'Transfer Coins')}
          </h3>

          <div className="transfer-form">
            <div className="form-group">
              <label>{t('economy.recipientUsername', 'Recipient Username')}</label>
              <input
                type="text"
                className="transfer-input"
                placeholder={t('economy.enterUsername', 'Kullanıcı adı girin...')}
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>{t('economy.amount', 'Amount')}</label>
              <div className="amount-input-container">
                <i className="fas fa-coins"></i>
                <input
                  type="number"
                  className="transfer-input amount-input"
                  placeholder="0"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  min="1"
                  max={balance}
                />
                <button
                  className="btn-max"
                  onClick={() => setTransferAmount(balance.toString())}>
                  MAX
                </button>
              </div>
              <div className="quick-amounts">
                {[100, 500, 1000, 5000].map(amt => (
                  <button
                    key={amt}
                    className="quick-amount-btn"
                    onClick={() => setTransferAmount(amt.toString())}
                    disabled={amt > balance}>
                    {formatNumber(amt)}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>{t('economy.noteOptional', 'Note (Optional)')}</label>
              <input
                type="text"
                className="transfer-input"
                placeholder={t('economy.addNote', 'Not ekle...')}
                value={transferNote}
                onChange={(e) => setTransferNote(e.target.value)}
                maxLength={100}
              />
            </div>

            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}

            <button
              className="btn-transfer"
              onClick={transferCoins}
              disabled={isTransferring || !recipientUsername || !transferAmount}>
              {isTransferring ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  {t('economy.processing', 'İşleniyor...')}
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  {t('economy.sendCoins', 'Send Coins')}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="leaderboard-section">
          <h3>
            <i className="fas fa-trophy"></i>
            {t('economy.topRichest', 'Top Richest')}
          </h3>
          <div className="leaderboard-list">
            {leaderboard.slice(0, 10).map((user, index) => (
              <div key={user.id} className={`leaderboard-item rank-${index + 1}`}>
                <div className="rank">
                  {index === 0 && <i className="fas fa-crown gold"></i>}
                  {index === 1 && <i className="fas fa-medal deletever"></i>}
                  {index === 2 && <i className="fas fa-medal bronze"></i>}
                  {index > 2 && <span>{index + 1}</span>}
                </div>
                <div className="user-info">
                  <div className="user-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.username} />
                    ) : (
                      <i className="fas fa-user"></i>
                    )}
                  </div>
                  <span className="username">{user.username}</span>
                </div>
                <div className="user-balance">
                  <i className="fas fa-coins"></i>
                  {formatNumber(user.balance)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="transactions-section">
          <div className="transactions-header">
            <h3>
              <i className="fas fa-history"></i>
              {t('economy.transactionHistory', 'Transaction History')}
            </h3>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}>
                {t('economy.all', 'All')}
              </button>
              <button
                className={`filter-btn ${filterType === 'sent' ? 'active' : ''}`}
                onClick={() => setFilterType('sent')}>
                {t('economy.sent', 'Sent')}
              </button>
              <button
                className={`filter-btn ${filterType === 'received' ? 'active' : ''}`}
                onClick={() => setFilterType('received')}>
                {t('economy.received', 'Received')}
              </button>
            </div>
          </div>

          <div className="transactions-list">
            {getFilteredTransactions().length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-receipt"></i>
                <p>{t('economy.noTransactions', 'No transactions yet')}</p>
                <p className="hint">{t('economy.transferHint', 'Transfer coins to see your history')}</p>
              </div>
            ) : (
              getFilteredTransactions().map((transaction) => (
                <div
                  key={transaction.id}
                  className={`transaction-item ${getTransactionColor(transaction)}`}>
                  <div className="transaction-icon">
                    <i className={`fas fa-${getTransactionIcon(transaction)}`}></i>
                  </div>

                  <div className="transaction-info">
                    <div className="transaction-title">
                      {transaction.sender_id === currentUser?.id ? (
                        <>{t('economy.sentTo', 'Sent to')} <strong>{transaction.recipient?.username}</strong></>
                      ) : (
                        <>{t('economy.receivedFrom', 'Received from')} <strong>{transaction.sender?.username}</strong></>
                      )}
                    </div>

                    {transaction.note && (
                      <div className="transaction-note">{transaction.note}</div>
                    )}

                    <div className="transaction-time">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </div>
                  </div>

                  <div className="transaction-amount">
                    <span className="sign">
                      {transaction.sender_id === currentUser?.id ? '-' : '+'}
                    </span>
                    <i className="fas fa-coins"></i>
                    {formatNumber(transaction.amount)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Economy Info */}
        <div className="info-section">
          <div className="info-card">
            <i className="fas fa-info-circle"></i>
            <div>
              <strong>{t('economy.howToEarn', 'How to Earn Coins:')}</strong>
              <ul>
                <li>{t('economy.earnDaily', 'Daily login rewards')}</li>
                <li>{t('economy.earnActivities', 'Participating in server activities')}</li>
                <li>{t('economy.earnContests', 'Winning contests and events')}</li>
                <li>{t('economy.earnGifts', 'Receiving gifts from other users')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EconomySystemPanel.propTypes = {
  currentUser: PropTypes.object,
  serverId: PropTypes.string,
  onClose: PropTypes.func,
};
export default EconomySystemPanel;