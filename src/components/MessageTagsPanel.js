import React, { useState, useEffect } from 'react';
import './MessageTagsPanel.css';
import { FaTag, FaPlus, FaTimes, FaEdit, FaPalette } from 'react-icons/fa';

function MessageTagsPanel({ apiBaseUrl, fetchWithAuth, currentMessageId }) {
  const [tags, setTags] = useState([]);
  const [messageTags, setMessageTags] = useState([]);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#5865f2');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const colorOptions = [
    '#5865f2', '#43b581', '#f04747', '#faa61a', '#9b59b6',
    '#3498db', '#e91e63', '#00bcd4', '#ff9800', '#4caf50'
  ];

  useEffect(() => {
    loadAllTags();
    if (currentMessageId) {
      loadMessageTags();
    }
  }, [currentMessageId]);

  const loadAllTags = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/tags/list/`);
      if (response.ok) {
        const data = await response.json();
        setTags(data.tags || []);
      }
    } catch (err) {
      console.error('Error loading tags:', err);
    }
  };

  const loadMessageTags = async () => {
    if (!currentMessageId) return;
    
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/messages/${currentMessageId}/tags/`);
      if (response.ok) {
        const data = await response.json();
        setMessageTags(data.tags || []);
      }
    } catch (err) {
      setError('Failed to load message tags: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTag = async () => {
    if (!newTagName.trim()) {
      setError('Tag name is required');
      return;
    }

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/tags/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTagName,
          color: newTagColor
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTags([...tags, data.tag]);
        setNewTagName('');
        setShowCreateTag(false);
        setError('');
      }
    } catch (err) {
      setError('Failed to create tag: ' + err.message);
    }
  };

  const addTagToMessage = async (tagId) => {
    if (!currentMessageId) return;

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/messages/${currentMessageId}/tags/add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag_id: tagId })
      });

      if (response.ok) {
        loadMessageTags();
        setError('');
      }
    } catch (err) {
      setError('Failed to add tag: ' + err.message);
    }
  };

  const removeTagFromMessage = async (tagId) => {
    if (!currentMessageId) return;

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/api/messages/${currentMessageId}/tags/remove/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag_id: tagId })
      });

      if (response.ok) {
        loadMessageTags();
        setError('');
      }
    } catch (err) {
      setError('Failed to remove tag: ' + err.message);
    }
  };

  return (
    <div className="message-tags-panel">
      <div className="tags-header">
        <h2><FaTag /> Message Tags</h2>
        <button className="create-tag-btn" onClick={() => setShowCreateTag(!showCreateTag)}>
          <FaPlus /> New Tag
        </button>
      </div>

      {error && <div className="tags-error">{error}</div>}

      {showCreateTag && (
        <div className="create-tag-form">
          <input
            type="text"
            placeholder="Tag name..."
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="tag-name-input"
          />
          <div className="color-selector">
            {colorOptions.map(color => (
              <button
                key={color}
                className={`color-btn ${newTagColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setNewTagColor(color)}
              />
            ))}
          </div>
          <button className="save-tag-btn" onClick={createTag}>
            Save Tag
          </button>
        </div>
      )}

      {currentMessageId && (
        <div className="current-message-tags">
          <h3>Tags on this message:</h3>
          <div className="message-tag-list">
            {messageTags.length === 0 ? (
              <p className="no-tags">No tags yet</p>
            ) : (
              messageTags.map(tag => (
                <span
                  key={tag.id}
                  className="message-tag"
                  style={{ borderColor: tag.color, color: tag.color }}
                >
                  <FaTag />
                  {tag.name}
                  <FaTimes
                    className="remove-tag"
                    onClick={() => removeTagFromMessage(tag.id)}
                  />
                </span>
              ))
            )}
          </div>
        </div>
      )}

      <div className="available-tags">
        <h3>Available Tags:</h3>
        <div className="tags-grid">
          {tags.map(tag => (
            <button
              key={tag.id}
              className="tag-item"
              style={{ borderColor: tag.color }}
              onClick={() => currentMessageId && addTagToMessage(tag.id)}
              disabled={!currentMessageId || messageTags.some(t => t.id === tag.id)}
            >
              <FaTag style={{ color: tag.color }} />
              <span style={{ color: tag.color }}>{tag.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessageTagsPanel;
