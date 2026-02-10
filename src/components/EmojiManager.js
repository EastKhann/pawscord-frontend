import React, { useState, useEffect, useRef } from 'react';
import './EmojiManager.css';
import confirmDialog from '../utils/confirmDialog';

const EmojiManager = ({ serverId, onClose }) => {
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [emojiName, setEmojiName] = useState('');
  const [emojiFile, setEmojiFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchEmojis();
    fetchStats();
  }, [serverId]);

  const fetchEmojis = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/emoji/${serverId}/list/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setEmojis(data.emojis || []);
      } else {
        console.error('Failed to fetch emojis');
      }
    } catch (error) {
      console.error('Error fetching emojis:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/emoji/${serverId}/stats/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('❌ Please select an image file');
      return;
    }

    // Validate file size (max 256KB)
    if (file.size > 256 * 1024) {
      console.error('❌ File size must be less than 256KB');
      return;
    }

    setEmojiFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadEmoji = async () => {
    if (!emojiName.trim() || !emojiFile) {
      console.error('❌ Please provide emoji name and file');
      return;
    }

    const formData = new FormData();
    formData.append('name', emojiName);
    formData.append('emoji', emojiFile);

    try {
      setUploading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/emoji/${serverId}/upload/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        console.log('✅ Emoji uploaded successfully');
        setShowUploadModal(false);
        setEmojiName('');
        setEmojiFile(null);
        setPreviewUrl('');
        fetchEmojis();
        fetchStats();
      } else {
        const data = await response.json();
        console.error('❌', data.error || 'Failed to upload emoji');
      }
    } catch (error) {
      console.error('Error uploading emoji:', error);
    } finally {
      setUploading(false);
    }
  };

  const deleteEmoji = async (emojiId) => {
    if (!await confirmDialog('Delete this emoji?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/emoji/${serverId}/${emojiId}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        console.log('✅ Emoji deleted');
        setEmojis(emojis.filter(e => e.id !== emojiId));
        fetchStats();
      } else {
        console.error('❌ Failed to delete emoji');
      }
    } catch (error) {
      console.error('Error deleting emoji:', error);
    }
  };

  const copyEmojiCode = (emojiName) => {
    const code = `:${emojiName}:`;
    navigator.clipboard.writeText(code);
    console.log('✅ Emoji code copied');
  };

  if (loading) {
    return (
      <div className="emoji-manager-overlay">
        <div className="emoji-manager-modal">
          <div className="loading-spinner">Loading emojis...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="emoji-manager-overlay" onClick={onClose}>
      <div className="emoji-manager-modal" onClick={e => e.stopPropagation()}>
        <div className="emoji-manager-header">
          <h2>😀 Emoji Manager</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="emoji-manager-content">
          {/* Stats */}
          {stats && (
            <div className="emoji-stats">
              <div className="stat-card">
                <div className="stat-icon">😀</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.total_emojis || 0}</div>
                  <div className="stat-label">Total Emojis</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.total_uses || 0}</div>
                  <div className="stat-label">Total Uses</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔥</div>
                <div className="stat-info">
                  <div className="stat-value">{stats.most_popular || 'N/A'}</div>
                  <div className="stat-label">Most Popular</div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="emoji-actions">
            <button className="upload-emoji-btn" onClick={() => setShowUploadModal(true)}>
              ➕ Upload Emoji
            </button>
            <p className="emoji-limit">
              {emojis.length} / {stats?.max_emojis || 50} emojis used
            </p>
          </div>

          {/* Emoji Grid */}
          <div className="emoji-grid">
            {emojis.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">😕</div>
                <h3>No Custom Emojis</h3>
                <p>Upload your first emoji to get started</p>
              </div>
            ) : (
              emojis.map(emoji => (
                <div key={emoji.id} className="emoji-card">
                  <img src={emoji.url} alt={emoji.name} className="emoji-image" />
                  <div className="emoji-info">
                    <div className="emoji-name">:{emoji.name}:</div>
                    <div className="emoji-meta">
                      <span className="emoji-uses">🔥 {emoji.uses || 0} uses</span>
                    </div>
                  </div>
                  <div className="emoji-actions-btn">
                    <button
                      className="copy-code-btn"
                      onClick={() => copyEmojiCode(emoji.name)}
                      title="Copy Code"
                    >
                      📋
                    </button>
                    <button
                      className="delete-emoji-btn"
                      onClick={() => deleteEmoji(emoji.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="upload-modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="upload-modal" onClick={e => e.stopPropagation()}>
              <h3>➕ Upload Emoji</h3>
              
              <div className="form-group">
                <label>Emoji Name</label>
                <input
                  type="text"
                  value={emojiName}
                  onChange={(e) => setEmojiName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  placeholder="myemoji"
                  maxLength={32}
                  className="emoji-name-input"
                />
                <p className="input-hint">Letters, numbers, and underscores only</p>
              </div>

              <div className="form-group">
                <label>Emoji Image</label>
                <div className="file-upload-area" onClick={() => fileInputRef.current?.click()}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="upload-preview" />
                  ) : (
                    <>
                      <div className="upload-icon">📤</div>
                      <p>Click to select image</p>
                      <p className="upload-hint">PNG, GIF, JPG • Max 256KB • 128x128px recommended</p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </button>
                <button 
                  className="upload-btn" 
                  onClick={uploadEmoji}
                  disabled={uploading || !emojiName || !emojiFile}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiManager;
