// frontend/src/components/BookmarkPanel.js
import { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaTags, FaTrash, FaSearch, FaPlus, FaBookmark, FaFolder } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 📚 Bookmark Panel Component
 * Kaydedilen mesajları organize etmek için tag sistemi
 * 
 * Features:
 * - Tag oluşturma/silme
 * - Bookmark'lara tag atama
 * - Tag'e göre filtreleme
 * - Arama
 */

const BookmarkPanel = ({ fetchWithAuth, apiBaseUrl, onClose, onMessageClick }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [showNewTagModal, setShowNewTagModal] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('#5865f2');

    useEffect(() => {
        loadBookmarks();
        loadTags();
    }, []);

    const loadBookmarks = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/list/`);
            if (response.ok) {
                const data = await response.json();
                setBookmarks(data);
            }
        } catch (error) {
            console.error('Bookmark yükleme hatası:', error);
            toast.error('Bookmark\'lar yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const loadTags = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/list/`);
            if (response.ok) {
                const data = await response.json();
                setTags(data);
            }
        } catch (error) {
            console.error('Tag yükleme hatası:', error);
        }
    };

    const createTag = async () => {
        if (!newTagName.trim()) {
            toast.error('Tag adı boş olamaz');
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
                toast.success('Tag oluşturuldu');
                setNewTagName('');
                setNewTagColor('#5865f2');
                setShowNewTagModal(false);
                loadTags();
            } else {
                toast.error('Tag oluşturulamadı');
            }
        } catch (error) {
            console.error('Tag oluşturma hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const deleteBookmark = async (bookmarkId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/${bookmarkId}/delete/`, {
                method: 'DELETE'
            });

            if (response.ok) {
                toast.success('Bookmark silindi');
                loadBookmarks();
            } else {
                toast.error('Bookmark silinemedi');
            }
        } catch (error) {
            console.error('Bookmark silme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const addTagToBookmark = async (bookmarkId, tagId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/${tagId}/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookmark_id: bookmarkId })
            });

            if (response.ok) {
                toast.success('Tag eklendi');
                loadBookmarks();
            } else {
                toast.error('Tag eklenemedi');
            }
        } catch (error) {
            console.error('Tag ekleme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const filteredBookmarks = bookmarks.filter(b => {
        const matchesTag = !selectedTag || b.tags?.some(t => t.id === selectedTag);
        const matchesSearch = !searchQuery ||
            b.message?.content?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTag && matchesSearch;
    });

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaBookmark style={{ color: '#faa61a' }} />
                        <h2 style={{ margin: 0 }}>Kaydedilenler</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                {/* Search & Filters */}
                <div style={styles.toolbar}>
                    <div style={styles.searchBox}>
                        <FaSearch style={{ color: '#888' }} />
                        <input
                            type="text"
                            placeholder="Mesajlarda ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                    <button onClick={() => setShowNewTagModal(true)} style={styles.newTagBtn}>
                        <FaPlus /> Yeni Tag
                    </button>
                </div>

                {/* Tags */}
                <div style={styles.tagsContainer}>
                    <button
                        onClick={() => setSelectedTag(null)}
                        style={{
                            ...styles.tagChip,
                            backgroundColor: !selectedTag ? '#5865f2' : '#2c2f33'
                        }}
                    >
                        <FaFolder /> Tümü ({bookmarks.length})
                    </button>
                    {tags.map(tag => (
                        <button
                            key={tag.id}
                            onClick={() => setSelectedTag(tag.id)}
                            style={{
                                ...styles.tagChip,
                                backgroundColor: selectedTag === tag.id ? tag.color : '#2c2f33',
                                borderLeft: `3px solid ${tag.color}`
                            }}
                        >
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
                                    <div
                                        style={styles.bookmarkText}
                                        onClick={() => onMessageClick?.(bookmark.message)}
                                    >
                                        {bookmark.message?.content || 'Mesaj içeriği yok'}
                                    </div>
                                    <div style={styles.bookmarkTags}>
                                        {bookmark.tags?.map(tag => (
                                            <span
                                                key={tag.id}
                                                style={{
                                                    ...styles.miniTag,
                                                    backgroundColor: tag.color
                                                }}
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                        <select
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    addTagToBookmark(bookmark.id, e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                            style={styles.tagSelect}
                                        >
                                            <option value="">+ Tag Ekle</option>
                                            {tags.map(tag => (
                                                <option key={tag.id} value={tag.id}>
                                                    {tag.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteBookmark(bookmark.id)}
                                    style={styles.deleteBtn}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* New Tag Modal */}
                {showNewTagModal && (
                    <div style={styles.modalOverlay} onClick={() => setShowNewTagModal(false)}>
                        <div style={styles.newTagModal} onClick={(e) => e.stopPropagation()}>
                            <h3>Yeni Tag Oluştur</h3>
                            <input
                                type="text"
                                placeholder="Tag adı..."
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                style={styles.input}
                                autoFocus
                            />
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <label>Renk:</label>
                                <input
                                    type="color"
                                    value={newTagColor}
                                    onChange={(e) => setNewTagColor(e.target.value)}
                                    style={styles.colorPicker}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button onClick={createTag} style={styles.primaryBtn}>
                                    Oluştur
                                </button>
                                <button onClick={() => setShowNewTagModal(false)} style={styles.secondaryBtn}>
                                    İptal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333'
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888',
        transition: 'color 0.2s'
    },
    toolbar: {
        display: 'flex',
        gap: '10px',
        padding: '15px 20px',
        borderBottom: '1px solid #333'
    },
    searchBox: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#2c2f33',
        padding: '10px 15px',
        borderRadius: '8px'
    },
    searchInput: {
        flex: 1,
        background: 'none',
        border: 'none',
        color: '#fff',
        outline: 'none',
        fontSize: '14px'
    },
    newTagBtn: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s'
    },
    tagsContainer: {
        display: 'flex',
        gap: '10px',
        padding: '15px 20px',
        overflowX: 'auto',
        borderBottom: '1px solid #333'
    },
    tagChip: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '16px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        color: '#fff',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s'
    },
    bookmarksList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    bookmarkItem: {
        display: 'flex',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        marginBottom: '10px',
        transition: 'background-color 0.2s'
    },
    bookmarkContent: {
        flex: 1
    },
    bookmarkMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
    },
    bookmarkText: {
        color: '#dcddde',
        marginBottom: '10px',
        cursor: 'pointer',
        lineHeight: '1.5'
    },
    bookmarkTags: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    miniTag: {
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        color: '#fff',
        fontWeight: '500'
    },
    tagSelect: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        border: '1px solid #444',
        borderRadius: '4px',
        padding: '4px 8px',
        fontSize: '12px',
        cursor: 'pointer'
    },
    deleteBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ed4245',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '10px',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#888'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#888'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999999
    },
    newTagModal: {
        backgroundColor: '#2c2f33',
        padding: '30px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px',
        color: '#fff'
    },
    input: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        marginTop: '15px',
        outline: 'none'
    },
    colorPicker: {
        width: '60px',
        height: '40px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    primaryBtn: {
        flex: 1,
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600'
    },
    secondaryBtn: {
        flex: 1,
        backgroundColor: '#4e5058',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600'
    }
};

export default BookmarkPanel;
