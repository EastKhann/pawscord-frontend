import React, { useState, useEffect } from 'react';
import './MuteKeywordsPanel.css';
import { FaVolumeMute, FaPlus, FaTrash, FaRegex, FaFont } from 'react-icons/fa';

function MuteKeywordsPanel({ apiBaseUrl, fetchWithAuth }) {
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadKeywords();
  }, []);

  const loadKeywords = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/mutekeyword/list/`);
      if (response.ok) {
        const data = await response.json();
        setKeywords(data.keywords || []);
      }
    } catch (err) {
      setError('Failed to load keywords: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addKeyword = async () => {
    if (!newKeyword.trim()) {
      setError('Keyword cannot be empty');
      return;
    }

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/mutekeyword/add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: newKeyword,
          case_sensitive: caseSensitive,
          is_regex: useRegex
        })
      });

      if (response.ok) {
        setNewKeyword('');
        setCaseSensitive(false);
        setUseRegex(false);
        loadKeywords();
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add keyword');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  const removeKeyword = async (keywordId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/mutekeyword/remove/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword_id: keywordId })
      });

      if (response.ok) {
        loadKeywords();
        setError('');
      }
    } catch (err) {
      setError('Failed to remove keyword: ' + err.message);
    }
  };

  return (
    <div className="mute-keywords-panel">
      <div className="mute-header">
        <h2><FaVolumeMute /> Mute Keywords</h2>
      </div>

      {error && <div className="mute-error">{error}</div>}

      <div className="add-keyword-section">
        <h3><FaPlus /> Add Mute Keyword</h3>
        <div className="keyword-input-group">
          <input
            type="text"
            placeholder="Enter keyword or regex pattern..."
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
            className="keyword-input"
          />
          <button className="add-btn" onClick={addKeyword}>
            <FaPlus /> Add
          </button>
        </div>

        <div className="keyword-options">
          <label className="option-label">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
            />
            <FaFont className="option-icon" />
            <span>Case Sensitive</span>
          </label>
          <label className="option-label">
            <input
              type="checkbox"
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
            />
            <FaRegex className="option-icon" />
            <span>Use Regex</span>
          </label>
        </div>

        <div className="keyword-help">
          <h4>💡 Tips:</h4>
          <ul>
            <li>Messages containing these keywords will be hidden</li>
            <li>Enable regex for advanced pattern matching</li>
            <li>Example regex: <code>spam|scam|phishing</code></li>
          </ul>
        </div>
      </div>

      <div className="keywords-list">
        <h3>Muted Keywords ({keywords.length})</h3>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : keywords.length === 0 ? (
          <div className="empty-keywords">
            <FaVolumeMute className="empty-icon" />
            <p>No muted keywords yet</p>
          </div>
        ) : (
          <div className="keyword-items">
            {keywords.map(keyword => (
              <div key={keyword.id} className="keyword-item">
                <div className="keyword-info">
                  <div className="keyword-text">
                    {keyword.is_regex && <FaRegex className="regex-badge" />}
                    <code>{keyword.keyword}</code>
                  </div>
                  <div className="keyword-meta">
                    {keyword.case_sensitive && (
                      <span className="meta-badge">Case Sensitive</span>
                    )}
                    {keyword.is_regex && (
                      <span className="meta-badge regex">Regex</span>
                    )}
                    <span className="meta-date">
                      Added {new Date(keyword.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeKeyword(keyword.id)}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MuteKeywordsPanel;
