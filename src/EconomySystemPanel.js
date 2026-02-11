import { useState, useEffect, useRef } from 'react';
import './EconomySystemPanel.css';

/**
 * EconomySystemPanel Component
 * Server economy system with coin transfers and transaction history
 * @component
 */
const EconomySystemPanel = ({ currentUser, serverId, onClose }) => {
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
      console.error('Failed to fetch economy data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch user balance
   */
  const fetchBalance = async () => {
    try {
      const response = await fetch(`/api/economy/balance/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance || 0);
      }
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  };

  /**
   * Fetch transaction history
   */
  const fetchTransactionHistory = async () => {
    try {
      const response = await fetch(`/api/economy/history/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
      }
    } catch (err) {
      console.error('Failed to fetch transaction history:', err);
    }
  };

  /**
   * Fetch leaderboard
   */
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`/api/economy/leaderboard/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      }
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  /**
   * Transfer coins
   */
  const transferCoins = async () => {
    if (!recipientUsername.trim()) {
      setError('Please enter recipient username');
      return;
    }

    const amount = parseInt(transferAmount);
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (amount > balance) {
      setError('Insufficient balance');
      return;
    }

    setIsTransferring(true);
    setError(null);

    try {
      const response = await fetch('/api/economy/transfer/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
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
        
        showToast(`Successfully sent ${amount} coins to ${recipientUsername}`, 'success');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Transfer failed');
      }
    } catch (err) {
      console.error('Transfer error:', err);
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
    <div className="economy-system-panel">
      {/* Coin Animation Overlay */}
      {showAnimation && (
        <div className="coin-animation-overlay">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="coin-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`
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
          Economy System
        </h2>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="panel-content">
        {/* Balance Display */}
        <div className="balance-section">
          <div className="balance-card">
            <div className="balance-label">Your Balance</div>
            <div className="balance-amount">
              <i className="fas fa-coins coin-icon"></i>
              <span className="amount">{formatNumber(balance)}</span>
              <span className="currency">coins</span>
            </div>
            <div className="balance-actions">
              <button className="btn-daily">
                <i className="fas fa-calendar-day"></i>
                Daily Reward
              </button>
            </div>
          </div>
        </div>

        {/* Transfer Section */}
        <div className="transfer-section">
          <h3>
            <i className="fas fa-paper-plane"></i>
            Transfer Coins
          </h3>
          
          <div className="transfer-form">
            <div className="form-group">
              <label>Recipient Username</label>
              <input
                type="text"
                className="transfer-input"
                placeholder="Enter username..."
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
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
                  onClick={() => setTransferAmount(balance.toString())}
                >
                  MAX
                </button>
              </div>
              <div className="quick-amounts">
                {[100, 500, 1000, 5000].map(amt => (
                  <button
                    key={amt}
                    className="quick-amount-btn"
                    onClick={() => setTransferAmount(amt.toString())}
                    disabled={amt > balance}
                  >
                    {formatNumber(amt)}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Note (Optional)</label>
              <input
                type="text"
                className="transfer-input"
                placeholder="Add a note..."
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
              disabled={isTransferring || !recipientUsername || !transferAmount}
            >
              {isTransferring ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Send Coins
                </>
              )}
            </button>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="leaderboard-section">
          <h3>
            <i className="fas fa-trophy"></i>
            Top Richest
          </h3>
          <div className="leaderboard-list">
            {leaderboard.slice(0, 10).map((user, index) => (
              <div key={user.id} className={`leaderboard-item rank-${index + 1}`}>
                <div className="rank">
                  {index === 0 && <i className="fas fa-crown gold"></i>}
                  {index === 1 && <i className="fas fa-medal silver"></i>}
                  {index === 2 && <i className="fas fa-medal bronze"></i>}
                  {index > 2 && <span>#{index + 1}</span>}
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
              Transaction History
            </h3>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${filterType === 'sent' ? 'active' : ''}`}
                onClick={() => setFilterType('sent')}
              >
                Sent
              </button>
              <button
                className={`filter-btn ${filterType === 'received' ? 'active' : ''}`}
                onClick={() => setFilterType('received')}
              >
                Received
              </button>
            </div>
          </div>

          <div className="transactions-list">
            {getFilteredTransactions().length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-receipt"></i>
                <p>No transactions yet</p>
                <p className="hint">Transfer coins to see your history</p>
              </div>
            ) : (
              getFilteredTransactions().map((transaction) => (
                <div 
                  key={transaction.id} 
                  className={`transaction-item ${getTransactionColor(transaction)}`}
                >
                  <div className="transaction-icon">
                    <i className={`fas fa-${getTransactionIcon(transaction)}`}></i>
                  </div>
                  
                  <div className="transaction-info">
                    <div className="transaction-title">
                      {transaction.sender_id === currentUser?.id ? (
                        <>Sent to <strong>{transaction.recipient?.username}</strong></>
                      ) : (
                        <>Received from <strong>{transaction.sender?.username}</strong></>
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
              <strong>How to Earn Coins:</strong>
              <ul>
                <li>Daily login rewards</li>
                <li>Participating in server activities</li>
                <li>Winning contests and events</li>
                <li>Receiving gifts from other users</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomySystemPanel;
