import React, { useState, useEffect } from 'react';
import './PortfolioTradingPanel.css';
import { FaChartLine, FaCoins, FaTrophy, FaBitcoin, FaEthereum } from 'react-icons/fa';

function PortfolioTradingPanel({ apiBaseUrl, fetchWithAuth }) {
  const [portfolio, setPortfolio] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [markets, setMarkets] = useState([
    { symbol: 'BTC', name: 'Bitcoin', price: 45000, change: 2.5, icon: <FaBitcoin /> },
    { symbol: 'ETH', name: 'Ethereum', price: 3200, change: -1.2, icon: <FaEthereum /> },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.08, change: 5.3, icon: <FaCoins /> },
  ]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [amount, setAmount] = useState('');
  const [tradeType, setTradeType] = useState('buy');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPortfolio();
    loadLeaderboard();
  }, []);

  const loadPortfolio = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/portfolio/my/`);
      if (response.ok) {
        const data = await response.json();
        setPortfolio(data);
      }
    } catch (err) {
      console.error('Error loading portfolio:', err);
    }
  };

  const loadLeaderboard = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/portfolio/leaderboard/`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      }
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    }
  };

  const executeTrade = async () => {
    if (!selectedAsset || !amount) {
      setMessage('❌ Please select asset and enter amount');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/portfolio/trade/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: selectedAsset.symbol,
          amount: parseFloat(amount),
          trade_type: tradeType
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ ${tradeType === 'buy' ? 'Bought' : 'Sold'} ${amount} ${selectedAsset.symbol}!`);
        setAmount('');
        loadPortfolio();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Trade failed'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="portfolio-trading-panel">
      <div className="portfolio-header">
        <h2><FaChartLine /> Portfolio Trading</h2>
      </div>

      {message && <div className="trade-message">{message}</div>}

      {portfolio && (
        <div className="portfolio-overview">
          <div className="balance-card">
            <div className="balance-label">Total Balance</div>
            <div className="balance-value">{formatCurrency(portfolio.balance || 0)}</div>
            <div className="balance-change" style={{ color: portfolio.change >= 0 ? '#43b581' : '#f04747' }}>
              {portfolio.change >= 0 ? '↑' : '↓'} {Math.abs(portfolio.change || 0)}%
            </div>
          </div>
        </div>
      )}

      <div className="trading-section">
        <div className="markets-panel">
          <h3><FaBitcoin /> Markets</h3>
          <div className="market-list">
            {markets.map(market => (
              <div
                key={market.symbol}
                className={`market-item ${selectedAsset?.symbol === market.symbol ? 'selected' : ''}`}
                onClick={() => setSelectedAsset(market)}
              >
                <div className="market-icon">{market.icon}</div>
                <div className="market-info">
                  <div className="market-name">{market.name}</div>
                  <div className="market-symbol">{market.symbol}</div>
                </div>
                <div className="market-price">
                  <div className="price-value">{formatCurrency(market.price)}</div>
                  <div className={`price-change ${market.change >= 0 ? 'positive' : 'negative'}`}>
                    {market.change >= 0 ? '↑' : '↓'} {Math.abs(market.change)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="trade-panel">
          <h3><FaCoins /> Trade</h3>
          {selectedAsset ? (
            <>
              <div className="selected-asset">
                <div className="asset-icon">{selectedAsset.icon}</div>
                <div className="asset-name">{selectedAsset.name}</div>
                <div className="asset-price">{formatCurrency(selectedAsset.price)}</div>
              </div>

              <div className="trade-type-selector">
                <button
                  className={`type-btn ${tradeType === 'buy' ? 'active buy' : ''}`}
                  onClick={() => setTradeType('buy')}
                >
                  Buy
                </button>
                <button
                  className={`type-btn ${tradeType === 'sell' ? 'active sell' : ''}`}
                  onClick={() => setTradeType('sell')}
                >
                  Sell
                </button>
              </div>

              <div className="amount-input">
                <label>Amount:</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount..."
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="trade-summary">
                <div className="summary-row">
                  <span>Total:</span>
                  <span>{formatCurrency((amount || 0) * selectedAsset.price)}</span>
                </div>
              </div>

              <button
                className={`execute-btn ${tradeType}`}
                onClick={executeTrade}
                disabled={loading || !amount}
              >
                {loading ? 'Processing...' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} ${selectedAsset.symbol}`}
              </button>
            </>
          ) : (
            <div className="select-asset-prompt">
              <FaChartLine className="prompt-icon" />
              <p>Select an asset to trade</p>
            </div>
          )}
        </div>
      </div>

      <div className="leaderboard-section">
        <h3><FaTrophy /> Leaderboard</h3>
        <div className="leaderboard-list">
          {leaderboard.map((user, idx) => (
            <div key={user.id} className="leaderboard-item">
              <div className="rank">{getRankBadge(idx + 1)}</div>
              <div className="user-info">
                <div className="username">{user.username}</div>
                <div className="user-balance">{formatCurrency(user.portfolio_value)}</div>
              </div>
              <div className={`user-change ${user.change >= 0 ? 'positive' : 'negative'}`}>
                {user.change >= 0 ? '↑' : '↓'} {Math.abs(user.change)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioTradingPanel;
