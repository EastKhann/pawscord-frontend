import React, { useState, useEffect } from 'react';
import './ReactionWeightsPanel.css';
import { FaBalanceScale, FaStar, FaHeart, FaFire, FaThumbsUp } from 'react-icons/fa';

function ReactionWeightsPanel({ apiBaseUrl, fetchWithAuth }) {
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingWeight, setEditingWeight] = useState(null);

  useEffect(() => {
    loadWeights();
  }, []);

  const loadWeights = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/reactions/weights/list/`);
      if (response.ok) {
        const data = await response.json();
        setWeights(data.weights || []);
      }
    } catch (err) {
      console.error('Error loading weights:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateWeight = async (emoji, xp, points) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/reactions/weights/set/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji, xp, points })
      });

      if (response.ok) {
        setMessage(`✅ Updated ${emoji} weights`);
        loadWeights();
        setEditingWeight(null);
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to update'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    }
  };

  const getEmojiIcon = (emoji) => {
    if (emoji === '⭐') return <FaStar />;
    if (emoji === '❤️') return <FaHeart />;
    if (emoji === '🔥') return <FaFire />;
    if (emoji === '👍') return <FaThumbsUp />;
    return null;
  };

  return (
    <div className="reaction-weights-panel">
      <div className="weights-header">
        <h2><FaBalanceScale /> Reaction Weights</h2>
        <p className="header-description">Configure XP and points awarded for each reaction type</p>
      </div>

      {message && <div className="weights-message">{message}</div>}

      {loading ? (
        <div className="loading">Loading weights...</div>
      ) : (
        <div className="weights-grid">
          {weights.map((weight, index) => (
            <div key={index} className="weight-card">
              <div className="weight-header-section">
                <div className="emoji-display">
                  {getEmojiIcon(weight.emoji) && (
                    <div className="emoji-icon">{getEmojiIcon(weight.emoji)}</div>
                  )}
                  <span className="emoji-char">{weight.emoji}</span>
                </div>
                <div className="weight-name">{weight.name || 'Reaction'}</div>
              </div>
              
              {editingWeight === weight.emoji ? (
                <div className="weight-edit">
                  <div className="edit-group">
                    <label>XP Value</label>
                    <input
                      type="number"
                      defaultValue={weight.xp}
                      id={`xp-${weight.emoji}`}
                      className="edit-input"
                      min="0"
                      max="1000"
                    />
                  </div>
                  <div className="edit-group">
                    <label>Points Value</label>
                    <input
                      type="number"
                      defaultValue={weight.points}
                      id={`points-${weight.emoji}`}
                      className="edit-input"
                      min="0"
                      max="1000"
                    />
                  </div>
                  <div className="edit-actions">
                    <button
                      className="save-btn"
                      onClick={() => {
                        const xp = parseInt(document.getElementById(`xp-${weight.emoji}`).value);
                        const points = parseInt(document.getElementById(`points-${weight.emoji}`).value);
                        updateWeight(weight.emoji, xp, points);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setEditingWeight(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="weight-display">
                  <div className="weight-stat">
                    <div className="stat-label">XP</div>
                    <div className="stat-value xp">{weight.xp}</div>
                  </div>
                  <div className="weight-stat">
                    <div className="stat-label">Points</div>
                    <div className="stat-value points">{weight.points}</div>
                  </div>
                  <button
                    className="edit-btn"
                    onClick={() => setEditingWeight(weight.emoji)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="weights-info">
        <h4>ℹ️ How Reaction Weights Work</h4>
        <ul>
          <li><strong>XP:</strong> Experience points awarded to the message author when someone reacts</li>
          <li><strong>Points:</strong> Currency/coins awarded to the message author</li>
          <li>Higher weights = more valuable reactions</li>
          <li>Use this to encourage specific types of engagement</li>
          <li>Changes take effect immediately for new reactions</li>
        </ul>
      </div>
    </div>
  );
}

export default ReactionWeightsPanel;
