import React, { useState, useEffect } from 'react';
import './StickersPanel.css';
import confirmDialog from '../utils/confirmDialog';

const StickersPanel = ({ serverId, onClose }) => {
  const [stickers, setStickers] = useState([]);
  const [stickerPacks, setStickerPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my-stickers');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stickerName, setStickerName] = useState('');
  const [stickerFile, setStickerFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (activeTab === 'my-stickers') {
      fetchStickers();
    } else {
      fetchStickerPacks();
    }
  }, [activeTab, serverId]);

  const fetchStickers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/stickers/${serverId}/list/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStickers(data.stickers || []);
      }
    } catch (error) {
      console.error('Error fetching stickers:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStickerPacks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/stickers/packs/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStickerPacks(data.packs || []);
      }
    } catch (error) {
      console.error('Error fetching sticker packs:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadSticker = async () => {
    if (!stickerName.trim() || !stickerFile) {
      console.error('❌ Please provide sticker name and file');
      return;
    }

    const formData = new FormData();
    formData.append('name', stickerName);
    formData.append('sticker', stickerFile);

    try {
      setUploading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/stickers/${serverId}/upload/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        setShowUploadModal(false);
        setStickerName('');
        setStickerFile(null);
        setPreviewUrl('');
        fetchStickers();
      } else {
        const data = await response.json();
        console.error('❌', data.error || 'Failed to upload sticker');
      }
    } catch (error) {
      console.error('Error uploading sticker:', error);
    } finally {
      setUploading(false);
    }
  };

  const deleteSticker = async (stickerId) => {
    if (!await confirmDialog('Delete this sticker?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/stickers/${serverId}/${stickerId}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setStickers(stickers.filter(s => s.id !== stickerId));
      } else {
        console.error('❌ Failed to delete sticker');
      }
    } catch (error) {
      console.error('Error deleting sticker:', error);
    }
  };

  const installPack = async (packId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/stickers/${serverId}/install-pack/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pack_id: packId })
      });

      if (response.ok) {
        fetchStickerPacks();
      } else {
        console.error('❌ Failed to install pack');
      }
    } catch (error) {
      console.error('Error installing pack:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      console.error('❌ Please select an image file');
      return;
    }

    // Max 512KB for stickers
    if (file.size > 512 * 1024) {
      console.error('❌ File size must be less than 512KB');
      return;
    }

    setStickerFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="stickers-panel-overlay" onClick={onClose}>
      <div className="stickers-panel-modal" onClick={e => e.stopPropagation()}>
        <div className="stickers-panel-header">
          <h2>🎨 Stickers</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="stickers-tabs">
          <button
            className={`tab-btn ${activeTab === 'my-stickers' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-stickers')}
          >
            📁 My Stickers
          </button>
          <button
            className={`tab-btn ${activeTab === 'packs' ? 'active' : ''}`}
            onClick={() => setActiveTab('packs')}
          >
            📦 Sticker Packs
          </button>
        </div>

        <div className="stickers-panel-content">
          {activeTab === 'my-stickers' && (
            <>
              <div className="sticker-actions">
                <button className="upload-sticker-btn" onClick={() => setShowUploadModal(true)}>
                  ➕ Upload Sticker
                </button>
                <p className="sticker-count">{stickers.length} stickers</p>
              </div>

              {loading ? (
                <div className="loading-spinner">Loading stickers...</div>
              ) : stickers.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🎨</div>
                  <h3>No Stickers Yet</h3>
                  <p>Upload your first custom sticker</p>
                </div>
              ) : (
                <div className="stickers-grid">
                  {stickers.map(sticker => (
                    <div key={sticker.id} className="sticker-card">
                      <img src={sticker.url} alt={sticker.name} className="sticker-image" />
                      <div className="sticker-name">{sticker.name}</div>
                      <button
                        className="delete-sticker-btn"
                        onClick={() => deleteSticker(sticker.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'packs' && (
            <>
              {loading ? (
                <div className="loading-spinner">Loading packs...</div>
              ) : stickerPacks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📦</div>
                  <h3>No Packs Available</h3>
                  <p>Check back later for new sticker packs</p>
                </div>
              ) : (
                <div className="packs-grid">
                  {stickerPacks.map(pack => (
                    <div key={pack.id} className="pack-card">
                      <div className="pack-preview">
                        {pack.preview_stickers?.slice(0, 4).map((sticker, idx) => (
                          <img key={idx} src={sticker.url} alt="" className="pack-preview-img" />
                        ))}
                      </div>
                      <div className="pack-info">
                        <h3>{pack.name}</h3>
                        <p>{pack.sticker_count} stickers</p>
                      </div>
                      <button
                        className={`install-pack-btn ${pack.installed ? 'installed' : ''}`}
                        onClick={() => !pack.installed && installPack(pack.id)}
                        disabled={pack.installed}
                      >
                        {pack.installed ? '✓ Installed' : '➕ Install'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="upload-modal-overlay" onClick={() => setShowUploadModal(false)}>
            <div className="upload-modal" onClick={e => e.stopPropagation()}>
              <h3>➕ Upload Sticker</h3>

              <div className="form-group">
                <label>Sticker Name</label>
                <input
                  type="text"
                  value={stickerName}
                  onChange={(e) => setStickerName(e.target.value)}
                  placeholder="My Sticker"
                  maxLength={32}
                  className="sticker-name-input"
                />
              </div>

              <div className="form-group">
                <label>Sticker Image</label>
                <div className="file-upload-area" onClick={() => document.getElementById('sticker-file').click()}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="upload-preview" />
                  ) : (
                    <>
                      <div className="upload-icon">📤</div>
                      <p>Click to select image</p>
                      <p className="upload-hint">PNG, GIF • Max 512KB • 512x512px recommended</p>
                    </>
                  )}
                </div>
                <input
                  id="sticker-file"
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
                  onClick={uploadSticker}
                  disabled={uploading || !stickerName || !stickerFile}
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

export default StickersPanel;
