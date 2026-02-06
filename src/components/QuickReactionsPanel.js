import React, { useState } from 'react';
import './QuickReactionsPanel.css';
import { FaHeart, FaThumbsUp, FaFire, FaStar, FaPlus, FaEdit } from 'react-icons/fa';

function QuickReactionsPanel({ apiBaseUrl, fetchWithAuth, messageId }) {
  const [quickReactions, setQuickReactions] = useState([
    { emoji: '❤️', name: 'heart', count: 0 },
    { emoji: '👍', name: 'thumbs_up', count: 0 },
    { emoji: '🔥', name: 'fire', count: 0 },
    { emoji: '⭐', name: 'star', count: 0 },
    { emoji: '😂', name: 'laugh', count: 0 },
    { emoji: '🎉', name: 'party', count: 0 }
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const addQuickReaction = async (emoji) => {
    if (!messageId) {
      setMessage('❌ No message selected');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/quick_reaction/add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message_id: messageId,
          emoji: emoji
        })
      });

      if (response.ok) {
        setMessage(`✅ Added ${emoji} reaction!`);
        loadQuickReactions();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to add reaction'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadQuickReactions = async () => {
    if (!messageId) return;

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/${messageId}/quick_reactions/`);
      if (response.ok) {
        const data = await response.json();
        // Update counts based on response
        const updated = quickReactions.map(qr => {
          const found = data.reactions?.find(r => r.emoji === qr.emoji);
          return { ...qr, count: found?.count || 0 };
        });
        setQuickReactions(updated);
      }
    } catch (err) {
      console.error('Error loading reactions:', err);
    }
  };

  return (
    <div className="quick-reactions-panel">
      <div className="quick-header">
        <h3>⚡ Quick Reactions</h3>
      </div>

      {message && <div className="quick-message">{message}</div>}

      <div className="reactions-grid">
        {quickReactions.map((reaction, idx) => (
          <button
            key={idx}
            className="reaction-btn"
            onClick={() => addQuickReaction(reaction.emoji)}
            disabled={loading || !messageId}
          >
            <span className="reaction-emoji">{reaction.emoji}</span>
            {reaction.count > 0 && (
              <span className="reaction-count">{reaction.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="quick-info">
        <p>💡 Click to instantly react to messages!</p>
      </div>
    </div>
  );
}

export default QuickReactionsPanel;
