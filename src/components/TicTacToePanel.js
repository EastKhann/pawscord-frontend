import React, { useState, useEffect, useRef } from 'react';
import './TicTacToePanel.css';
import { FaGamepad, FaTrophy, FaHistory, FaPlay, FaRedo, FaTimes, FaCircle, FaUserFriends } from 'react-icons/fa';

function TicTacToePanel({ apiBaseUrl, fetchWithAuth }) {
  const [activeTab, setActiveTab] = useState('play'); // play, history, invite
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameId, setGameId] = useState(null);
  const [gameStatus, setGameStatus] = useState('waiting'); // waiting, playing, finished
  const [winner, setWinner] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [inviteUsername, setInviteUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ wins: 0, losses: 0, draws: 0 });

  useEffect(() => {
    loadGameHistory();
    loadStats();
  }, []);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const loadGameHistory = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/games/xox/history/`);
      if (response.ok) {
        const data = await response.json();
        setGameHistory(data.games || []);
      }
    } catch (err) {
      console.error('Error loading game history:', err);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/games/xox/stats/`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const startNewGame = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/games/xox/start/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opponent_username: opponent,
          mode: opponent ? 'multiplayer' : 'solo'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setGameId(data.game_id);
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setGameStatus('playing');
        setWinner(null);
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to start game');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const makeMove = async (index) => {
    if (board[index] || winner || gameStatus !== 'playing') return;

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/games/xox/move/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: gameId,
          position: index,
          player: isXNext ? 'X' : 'O'
        })
      });

      if (response.ok) {
        const data = await response.json();
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);

        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) {
          setWinner(gameWinner);
          setGameStatus('finished');
          loadGameHistory();
          loadStats();
        } else if (newBoard.every(cell => cell !== null)) {
          setWinner('Draw');
          setGameStatus('finished');
          loadGameHistory();
          loadStats();
        }

        setIsXNext(!isXNext);
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid move');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameId(null);
    setGameStatus('waiting');
    setWinner(null);
    setOpponent(null);
    setError('');
  };

  const invitePlayer = async () => {
    if (!inviteUsername.trim()) {
      setError('Please enter a username');
      return;
    }
    setOpponent(inviteUsername);
    setActiveTab('play');
    setInviteUsername('');
  };

  const renderSquare = (index) => {
    const value = board[index];
    return (
      <button
        className={`xox-square ${value ? 'filled' : ''}`}
        onClick={() => makeMove(index)}
        disabled={loading || gameStatus !== 'playing'}
      >
        {value === 'X' && <FaTimes className="xox-icon x-icon" />}
        {value === 'O' && <FaCircle className="xox-icon o-icon" />}
      </button>
    );
  };

  return (
    <div className="tictactoe-panel">
      <div className="tictactoe-header">
        <h2><FaGamepad /> TicTacToe Game</h2>
        <div className="xox-stats-mini">
          <span className="stat-wins">{stats.wins}W</span>
          <span className="stat-losses">{stats.losses}L</span>
          <span className="stat-draws">{stats.draws}D</span>
        </div>
      </div>

      <div className="tictactoe-tabs">
        <button
          className={`tab-btn ${activeTab === 'play' ? 'active' : ''}`}
          onClick={() => setActiveTab('play')}
        >
          <FaPlay /> Play
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory /> History
        </button>
        <button
          className={`tab-btn ${activeTab === 'invite' ? 'active' : ''}`}
          onClick={() => setActiveTab('invite')}
        >
          <FaUserFriends /> Invite
        </button>
      </div>

      <div className="tictactoe-content">
        {error && <div className="xox-error">{error}</div>}

        {activeTab === 'play' && (
          <div className="xox-play-tab">
            <div className="xox-game-info">
              {gameStatus === 'waiting' && (
                <div className="xox-waiting">
                  <h3>Ready to Play?</h3>
                  <p>{opponent ? `Playing against: ${opponent}` : 'Solo Game'}</p>
                  <button className="xox-start-btn" onClick={startNewGame} disabled={loading}>
                    <FaPlay /> Start Game
                  </button>
                </div>
              )}

              {gameStatus === 'playing' && (
                <div className="xox-status">
                  <p className="xox-turn">
                    Next Player: <span className={isXNext ? 'x-turn' : 'o-turn'}>
                      {isXNext ? 'X' : 'O'}
                    </span>
                  </p>
                </div>
              )}

              {gameStatus === 'finished' && winner && (
                <div className="xox-winner">
                  <FaTrophy className="trophy-icon" />
                  <h3>{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</h3>
                  <button className="xox-reset-btn" onClick={resetGame}>
                    <FaRedo /> New Game
                  </button>
                </div>
              )}
            </div>

            <div className="xox-board">
              <div className="xox-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
              </div>
              <div className="xox-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
              </div>
              <div className="xox-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="xox-history-tab">
            <h3>Game History</h3>
            {gameHistory.length === 0 ? (
              <p className="empty-state">No games played yet</p>
            ) : (
              <div className="xox-history-list">
                {gameHistory.map((game, idx) => (
                  <div key={idx} className="xox-history-item">
                    <div className="game-date">
                      {new Date(game.created_at).toLocaleDateString()}
                    </div>
                    <div className="game-result">
                      {game.winner === 'Draw' ? (
                        <span className="draw-badge">Draw</span>
                      ) : game.winner === game.current_user ? (
                        <span className="win-badge">Won</span>
                      ) : (
                        <span className="loss-badge">Lost</span>
                      )}
                    </div>
                    <div className="game-opponent">
                      vs {game.opponent || 'Solo'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'invite' && (
          <div className="xox-invite-tab">
            <h3>Invite a Player</h3>
            <div className="invite-form">
              <input
                type="text"
                className="invite-input"
                placeholder="Enter username..."
                value={inviteUsername}
                onChange={(e) => setInviteUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && invitePlayer()}
              />
              <button className="invite-btn" onClick={invitePlayer}>
                <FaUserFriends /> Send Invite
              </button>
            </div>
            <div className="invite-info">
              <p>💡 Invite friends to play multiplayer TicTacToe!</p>
              <p>They will receive a notification to join your game.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicTacToePanel;
