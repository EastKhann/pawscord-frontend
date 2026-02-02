import React, { useState, useEffect } from 'react';
import './EndorsementsPanel.css';
import { FaThumbsUp, FaStar, FaTrophy, FaUserFriends } from 'react-icons/fa';

function EndorsementsPanel({ apiBaseUrl, fetchWithAuth }) {
  const [endorsements, setEndorsements] = useState([]);
  const [receivedEndorsements, setReceivedEndorsements] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [category, setCategory] = useState('helpful');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    { value: 'helpful', label: 'Helpful', icon: '🤝', color: '#43b581' },
    { value: 'friendly', label: 'Friendly', icon: '😊', color: '#5865f2' },
    { value: 'expert', label: 'Expert', icon: '🎓', color: '#faa61a' },
    { value: 'creative', label: 'Creative', icon: '🎨', color: '#f04747' },
    { value: 'leader', label: 'Leader', icon: '👑', color: '#7289da' }
  ];

  useEffect(() => {
    loadEndorsements();
  }, []);

  const loadEndorsements = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/endorsements/list/`);
      if (response.ok) {
        const data = await response.json();
        setReceivedEndorsements(data.received || []);
      }
    } catch (err) {
      console.error('Error loading endorsements:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEndorsement = async () => {
    if (!selectedUser.trim()) {
      setMessage('❌ Please enter username');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/adv/endorsement/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_username: selectedUser,
          category,
          comment: comment || null
        })
      });

      if (response.ok) {
        setMessage(`✅ Endorsed ${selectedUser} as ${category}!`);
        setSelectedUser('');
        setComment('');
        loadEndorsements();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to create endorsement'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryStats = () => {
    const stats = {};
    categories.forEach(cat => {
      stats[cat.value] = receivedEndorsements.filter(e => e.category === cat.value).length;
    });
    return stats;
  };

  const stats = getCategoryStats();

  return (
    <div className="endorsements-panel">
      <div className="endorsements-header">
        <h2><FaThumbsUp /> Endorsements</h2>
      </div>

      {message && <div className="endorsement-message">{message}</div>}

      <div className="stats-overview">
        <div className="total-card">
          <FaTrophy className="total-icon" />
          <div className="total-info">
            <div className="total-value">{receivedEndorsements.length}</div>
            <div className="total-label">Total Endorsements</div>
          </div>
        </div>
      </div>

      <div className="category-stats">
        {categories.map(cat => (
          <div key={cat.value} className="category-card" style={{ borderColor: cat.color }}>
            <div className="category-icon">{cat.icon}</div>
            <div className="category-name">{cat.label}</div>
            <div className="category-count" style={{ color: cat.color }}>
              {stats[cat.value] || 0}
            </div>
          </div>
        ))}
      </div>

      <div className="create-endorsement">
        <h3><FaStar /> Give Endorsement</h3>
        <div className="endorsement-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter username to endorse..."
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <div className="category-selector">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  className={`category-btn ${category === cat.value ? 'active' : ''}`}
                  style={category === cat.value ? { background: cat.color } : {}}
                  onClick={() => setCategory(cat.value)}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Comment (optional):</label>
            <textarea
              placeholder="Why do you endorse this person?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-textarea"
              rows={3}
            />
          </div>
          <button
            className="endorse-btn"
            onClick={createEndorsement}
            disabled={loading || !selectedUser}
          >
            <FaThumbsUp /> Give Endorsement
          </button>
        </div>
      </div>

      <div className="received-endorsements">
        <h3><FaUserFriends /> Received Endorsements ({receivedEndorsements.length})</h3>
        {loading && receivedEndorsements.length === 0 ? (
          <div className="loading">Loading...</div>
        ) : receivedEndorsements.length === 0 ? (
          <div className="empty-endorsements">
            <FaThumbsUp className="empty-icon" />
            <p>No endorsements yet</p>
          </div>
        ) : (
          <div className="endorsements-list">
            {receivedEndorsements.map((endorsement, idx) => {
              const cat = categories.find(c => c.value === endorsement.category);
              return (
                <div key={idx} className="endorsement-item" style={{ borderLeftColor: cat?.color }}>
                  <div className="endorsement-icon">{cat?.icon}</div>
                  <div className="endorsement-content">
                    <div className="endorsement-header">
                      <span className="endorser-name">{endorsement.from_username}</span>
                      <span className="endorsement-category" style={{ background: cat?.color }}>
                        {cat?.label}
                      </span>
                    </div>
                    {endorsement.comment && (
                      <div className="endorsement-comment">"{endorsement.comment}"</div>
                    )}
                    <div className="endorsement-date">
                      {new Date(endorsement.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default EndorsementsPanel;
