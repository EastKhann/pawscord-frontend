import { useCallback, memo } from 'react';
import { FaTimes, FaTags, FaTrash, FaSearch, FaPlus, FaBookmark, FaFolder } from 'react-icons/fa';
import { styles } from './BookmarkPanel/bookmarkPanelStyles';
import useBookmarks from './BookmarkPanel/useBookmarks';

const BookmarkPanel = ({ fetchWithAuth, apiBaseUrl, onClose, onMessageClick }) => {
  const {
    bookmarks, tags, selectedTag, setSelectedTag,
    searchQuery, setSearchQuery, loading,
    showNewTagModal, setShowNewTagModal,
    newTagName, setNewTagName, newTagColor, setNewTagColor,
    createTag, deleteBookmark, addTagToBookmark, filteredBookmarks
  } = useBookmarks(fetchWithAuth, apiBaseUrl);

  // useCallback handlers
  const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
  const handleSearchChange = useCallback((e) => setSearchQuery(e.target.value), [setSearchQuery]);
  const handleShowNewTag = useCallback(() => setShowNewTagModal(true), [setShowNewTagModal]);
  const handleSelectAllTags = useCallback(() => setSelectedTag(null), [setSelectedTag]);
  const handleHideNewTagModal = useCallback(() => setShowNewTagModal(false), [setShowNewTagModal]);
  const handleNewTagNameChange = useCallback((e) => setNewTagName(e.target.value), [setNewTagName]);
  const handleNewTagColorChange = useCallback((e) => setNewTagColor(e.target.value), [setNewTagColor]);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={handleStopPropagation}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaBookmark style={{ color: '#faa61a' }} />
            <h2 style={{ margin: 0 }}>Kaydedilenler</h2>
          </div>
          <FaTimes onClick={onClose} style={styles.closeBtn} />
        </div>

        {/* Toolbar */}
        <div style={styles.toolbar}>
          <div style={styles.searchBox}>
            <FaSearch style={{ color: '#888' }} />
            <input type="text" placeholder="Mesajlarda ara..." value={searchQuery}
              onChange={handleSearchChange} style={styles.searchInput} />
          </div>
          <button onClick={handleShowNewTag} style={styles.newTagBtn}>
            <FaPlus /> Yeni Tag
          </button>
        </div>

        {/* Tags */}
        <div style={styles.tagsContainer}>
          <button onClick={handleSelectAllTags}
            style={{ ...styles.tagChip, backgroundColor: !selectedTag ? '#5865f2' : '#2c2f33' }}>
            <FaFolder /> Tümü ({bookmarks.length})
          </button>
          {tags.map(tag => (
            <button key={tag.id} onClick={() => setSelectedTag(tag.id)}
              style={{ ...styles.tagChip, backgroundColor: selectedTag === tag.id ? tag.color : '#2c2f33', borderLeft: `3px solid ${tag.color}` }}>
              <FaTags /> {tag.name} ({tag.bookmark_count || 0})
            </button>
          ))}
        </div>

        {/* Bookmarks List */}
        <div style={styles.bookmarksList}>
          {loading ? (
            <div style={styles.loading}>Yükleniyor...</div>
          ) : filteredBookmarks.length === 0 ? (
            <div style={styles.empty}>
              <FaBookmark style={{ fontSize: '48px', color: '#555' }} />
              <p>Henüz bookmark yok</p>
            </div>
          ) : (
            filteredBookmarks.map(bookmark => (
              <div key={bookmark.id} style={styles.bookmarkItem}>
                <div style={styles.bookmarkContent}>
                  <div style={styles.bookmarkMeta}>
                    <strong>{bookmark.message?.username}</strong>
                    <span style={{ color: '#888', fontSize: '12px' }}>
                      {new Date(bookmark.created_at).toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div style={styles.bookmarkText} onClick={() => onMessageClick?.(bookmark.message)}>
                    {bookmark.message?.content || 'Mesaj içeriği yok'}
                  </div>
                  <div style={styles.bookmarkTags}>
                    {bookmark.tags?.map(tag => (
                      <span key={tag.id} style={{ ...styles.miniTag, backgroundColor: tag.color }}>{tag.name}</span>
                    ))}
                    <select onChange={(e) => { if (e.target.value) { addTagToBookmark(bookmark.id, e.target.value); e.target.value = ''; } }}
                      style={styles.tagSelect}>
                      <option value="">+ Tag Ekle</option>
                      {tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={() => deleteBookmark(bookmark.id)} style={styles.deleteBtn}><FaTrash /></button>
              </div>
            ))
          )}
        </div>

        {/* New Tag Modal */}
        {showNewTagModal && (
          <div style={styles.modalOverlay} onClick={handleHideNewTagModal}>
            <div style={styles.newTagModal} onClick={handleStopPropagation}>
              <h3>Yeni Tag Oluştur</h3>
              <input type="text" placeholder="Tag adı..." value={newTagName}
                onChange={handleNewTagNameChange} style={styles.input} autoFocus />
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label>Renk:</label>
                <input type="color" value={newTagColor} onChange={handleNewTagColorChange} style={styles.colorPicker} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={createTag} style={styles.primaryBtn}>Oluştur</button>
                <button onClick={handleHideNewTagModal} style={styles.secondaryBtn}>İptal</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(BookmarkPanel);
