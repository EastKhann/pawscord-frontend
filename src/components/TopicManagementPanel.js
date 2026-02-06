import React, { useState, useEffect } from 'react';
import './TopicManagementPanel.css';
import { FaHashtag, FaEdit, FaSave, FaHistory } from 'react-icons/fa';

function TopicManagementPanel({ apiBaseUrl, fetchWithAuth, roomSlug }) {
  const [topic, setTopic] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');
  const [topicHistory, setTopicHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (roomSlug) {
      loadTopic();
    }
  }, [roomSlug]);

  const loadTopic = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/topics/${roomSlug}/`);
      if (response.ok) {
        const data = await response.json();
        setCurrentTopic(data.topic || '');
        setTopic(data.topic || '');
        setTopicHistory(data.history || []);
      }
    } catch (err) {
      console.error('Error loading topic:', err);
    }
  };

  const saveTopic = async () => {
    if (!roomSlug) {
      setMessage('❌ No room selected');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/topics/set/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_slug: roomSlug,
          topic: topic
        })
      });

      if (response.ok) {
        setMessage('✅ Topic updated!');
        setCurrentTopic(topic);
        loadTopic();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to update topic'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="topic-management-panel">
      <div className="topic-header">
        <h3><FaHashtag /> Channel Topic</h3>
      </div>

      {message && <div className="topic-message">{message}</div>}

      <div className="current-topic">
        <div className="topic-label">Current Topic:</div>
        <div className="topic-display">
          {currentTopic || <em>No topic set</em>}
        </div>
      </div>

      <div className="topic-editor">
        <label>Edit Topic:</label>
        <textarea
          placeholder="Describe what this channel is about..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="topic-textarea"
          rows={3}
          maxLength={500}
        />
        <div className="char-count">{topic.length}/500</div>
        <button
          className="save-topic-btn"
          onClick={saveTopic}
          disabled={loading || !roomSlug || topic === currentTopic}
        >
          <FaSave /> Save Topic
        </button>
      </div>

      {topicHistory.length > 0 && (
        <div className="topic-history">
          <h4><FaHistory /> Topic History</h4>
          <div className="history-list">
            {topicHistory.map((item, idx) => (
              <div key={idx} className="history-item">
                <div className="history-topic">{item.topic || <em>Removed</em>}</div>
                <div className="history-meta">
                  <span>by {item.user}</span>
                  <span>{new Date(item.updated_at).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicManagementPanel;
