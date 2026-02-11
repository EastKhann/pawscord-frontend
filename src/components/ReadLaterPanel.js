import { useState, useEffect } from 'react';
import './ReadLaterPanel.css';
import { FaBookmark, FaTag, FaSearch, FaTrash, FaPlus, FaTimes, FaFilter } from 'react-icons/fa';

function ReadLaterPanel({ apiBaseUrl, fetchWithAuth }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTagModal, setShowTagModal] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#5865f2');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tagColors = [
    '#5865f2', '#43b581', '#f04747', '#faa61a', '#9b59b6',
    '#3498db', '#e91e63', '#00bcd4', '#ff9800', '#4caf50'
  ];

  useEffect(() => {
    loadBookmarks();
    loadTags();
  }, []);

  const loadBookmarks = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/readlater/list/`);
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.bookmarks || []);
      }
    } catch (err) {
      setError('Failed to load bookmarks: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTags = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/list/`);
      if (response.ok) {
        const data = await response.json();
        setTags(data.tags || []);
      }
    } catch (err) {
      console.error('Error loading tags:', err);
    }
  };

  const createTag = async () => {
    if (!newTagName.trim()) {
      setError('Tag name cannot be empty');
      return;
    }

    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/create/`, {
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
        setNewTagColor('#5865f2');
        setShowTagModal(false);
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create tag');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  const removeBookmark = async (messageId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/readlater/toggle/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: messageId })
      });

      if (response.ok) {
        setBookmarks(bookmarks.filter(b => b.message_id !== messageId));
        setError('');
      }
    } catch (err) {
      setError('Failed to remove bookmark: ' + err.message);
    }
  };

  const addTagToBookmark = async (messageId, tagId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/${tagId}/add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: messageId })
      });

      if (response.ok) {
        loadBookmarks();
        setError('');
      }
    } catch (err) {
      setError('Failed to add tag: ' + err.message);
    }
  };

  const removeTagFromBookmark = async (messageId, tagId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/${tagId}/remove/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: messageId })
      });

      if (response.ok) {
        loadBookmarks();
        setError('');
      }
    } catch (err) {
      setError('Failed to remove tag: ' + err.message);
    }
  };

  const toggleTagFilter = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(t => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = searchQuery === '' || 
      bookmark.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      bookmark.tags?.some(tag => selectedTags.includes(tag.id));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="readlater-panel">
      <div className="readlater-header">
        <h2><FaBookmark /> Read Later</h2>
        <button className="create-tag-btn" onClick={() => setShowTagModal(true)}>
          <FaPlus /> New Tag
        </button>
      </div>

      {error && <div className="rl-error">{error}</div>}

      <div className="readlater-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="tag-filters">
          <FaFilter className="filter-icon" />
          <div className="tag-filter-list">
            {tags.map(tag => (
              <button
                key={tag.id}
                className={`tag-filter ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                style={{ borderColor: tag.color }}
                onClick={() => toggleTagFilter(tag.id)}
              >
                <FaTag style={{ color: tag.color }} />
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bookmarks-list">
        {loading ? (
          <div className="rl-loading">Loading bookmarks...</div>
        ) : filteredBookmarks.length === 0 ? (
          <div className="empty-state">
            <FaBookmark className="empty-icon" />
            <p>No bookmarks found</p>
            <span>Save messages with the bookmark button to read them later</span>
          </div>
        ) : (
          filteredBookmarks.map((bookmark, idx) => (
            <div key={idx} className="bookmark-item">
              <div className="bookmark-header">
                <div className="bookmark-author">
                  <img 
                    src={bookmark.author_avatar || '/default-avatar.png'} 
                    alt={bookmark.author}
                    className="author-avatar"
                  />
                  <span className="author-name">{bookmark.author}</span>
                </div>
                <div className="bookmark-date">
                  {new Date(bookmark.saved_at).toLocaleDateString()}
                </div>
              </div>

              <div className="bookmark-content">
                {bookmark.content}
              </div>

              <div className="bookmark-footer">
                <div className="bookmark-tags">
                  {bookmark.tags?.map(tag => (
                    <span 
                      key={tag.id} 
                      className="bookmark-tag"
                      style={{ borderColor: tag.color, color: tag.color }}
                    >
                      <FaTag />
                      {tag.name}
                      <FaTimes 
                        className="remove-tag-icon"
                        onClick={() => removeTagFromBookmark(bookmark.message_id, tag.id)}
                      />
                    </span>
                  ))}
                  <select
                    className="add-tag-select"
                    onChange={(e) => {
                      if (e.target.value) {
                        addTagToBookmark(bookmark.message_id, parseInt(e.target.value));
                        e.target.value = '';
                      }
                    }}
                  >
                    <option value="">+ Add Tag</option>
                    {tags.filter(tag => !bookmark.tags?.find(t => t.id === tag.id)).map(tag => (
                      <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                  </select>
                </div>

                <button 
                  className="remove-bookmark-btn"
                  onClick={() => removeBookmark(bookmark.message_id)}
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showTagModal && (
        <div className="modal-overlay" onClick={() => setShowTagModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaTag /> Create New Tag</h3>
              <button className="modal-close" onClick={() => setShowTagModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Tag Name</label>
                <input
                  type="text"
                  className="tag-input"
                  placeholder="Enter tag name..."
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && createTag()}
                />
              </div>

              <div className="form-group">
                <label>Tag Color</label>
                <div className="color-picker">
                  {tagColors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${newTagColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewTagColor(color)}
                    />
                  ))}
                </div>
              </div>

              <button className="create-tag-submit" onClick={createTag}>
                <FaPlus /> Create Tag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReadLaterPanel;
