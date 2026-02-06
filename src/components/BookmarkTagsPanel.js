// frontend/src/components/BookmarkTagsPanel.js - Bookmark Tags System
import React, { useState, useEffect } from 'react';
import {
    FaBookmark, FaTimes, FaPlus, FaTag, FaTrash, FaEdit,
    FaSearch, FaFolder, FaHashtag, FaLink, FaCheck, FaStar,
    FaFilter, FaSortAmountDown, FaClock, FaEllipsisV
} from 'react-icons/fa';
import toast from '../utils/toast';
import './BookmarkTagsPanel.css';

const BookmarkTagsPanel = ({ apiBaseUrl, onClose }) => {
    const [activeView, setActiveView] = useState('bookmarks'); // 'bookmarks', 'tags'
    const [bookmarks, setBookmarks] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [showTagModal, setShowTagModal] = useState(false);
    const [editingTag, setEditingTag] = useState(null);

    // Tag form
    const [tagForm, setTagForm] = useState({
        name: '',
        color: '#6366f1'
    });

    const tagColors = [
        '#ef4444', '#f97316', '#f59e0b', '#84cc16',
        '#10b981', '#06b6d4', '#3b82f6', '#6366f1',
        '#8b5cf6', '#ec4899', '#f43f5e', '#78716c'
    ];

    useEffect(() => {
        fetchBookmarks();
        fetchTags();
    }, []);

    const fetchBookmarks = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bookmarks/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setBookmarks(data.bookmarks || []);
            }
        } catch (error) {
            console.error('Fetch bookmarks error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTags = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bookmarks/tags/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setTags(data.tags || []);
            }
        } catch (error) {
            console.error('Fetch tags error:', error);
        }
    };

    const createTag = async () => {
        if (!tagForm.name.trim()) {
            toast.error('Etiket adı gerekli');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bookmarks/tags/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tagForm)
            });

            if (response.ok) {
                toast.success('🏷️ Etiket oluşturuldu');
                fetchTags();
                setShowTagModal(false);
                setTagForm({ name: '', color: '#6366f1' });
            }
        } catch (error) {
            console.error('Create tag error:', error);
        }
    };

    const updateTag = async () => {
        if (!editingTag) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bookmarks/tags/${editingTag.id}/update/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tagForm)
            });

            if (response.ok) {
                toast.success('✅ Etiket güncellendi');
                fetchTags();
                setShowTagModal(false);
                setEditingTag(null);
                setTagForm({ name: '', color: '#6366f1' });
            }
        } catch (error) {
            console.error('Update tag error:', error);
        }
    };

    const deleteTag = async (tagId) => {
        if (!window.confirm('Bu etiketi silmek istiyor musunuz?')) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bookmarks/tags/${tagId}/delete/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('🗑️ Etiket silindi');
                setTags(prev => prev.filter(t => t.id !== tagId));
            }
        } catch (error) {
            console.error('Delete tag error:', error);
        }
    };

    const deleteBookmark = async (bookmarkId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bookmarks/${bookmarkId}/delete/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('Yer imi kaldırıldı');
                setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
            }
        } catch (error) {
            console.error('Delete bookmark error:', error);
        }
    };

    const addTagToBookmark = async (bookmarkId, tagId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bookmarks/${bookmarkId}/tags/add/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tag_id: tagId })
            });

            if (response.ok) {
                fetchBookmarks();
            }
        } catch (error) {
            console.error('Add tag error:', error);
        }
    };

    const removeTagFromBookmark = async (bookmarkId, tagId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/bookmarks/${bookmarkId}/tags/${tagId}/remove/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                fetchBookmarks();
            }
        } catch (error) {
            console.error('Remove tag error:', error);
        }
    };

    const openEditTag = (tag) => {
        setEditingTag(tag);
        setTagForm({ name: tag.name, color: tag.color });
        setShowTagModal(true);
    };

    const filteredBookmarks = bookmarks.filter(bookmark => {
        const matchesSearch =
            bookmark.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bookmark.channel_name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = !selectedTag || bookmark.tags?.some(t => t.id === selectedTag);
        return matchesSearch && matchesTag;
    });

    return (
        <div className="bookmark-tags-overlay" onClick={onClose}>
            <div className="bookmark-tags-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaBookmark /> Yer İmleri & Etiketler</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-tabs">
                    <button
                        className={`tab ${activeView === 'bookmarks' ? 'active' : ''}`}
                        onClick={() => setActiveView('bookmarks')}
                    >
                        <FaBookmark /> Yer İmleri
                        <span className="badge">{bookmarks.length}</span>
                    </button>
                    <button
                        className={`tab ${activeView === 'tags' ? 'active' : ''}`}
                        onClick={() => setActiveView('tags')}
                    >
                        <FaTag /> Etiketler
                        <span className="badge">{tags.length}</span>
                    </button>
                </div>

                {activeView === 'bookmarks' && (
                    <div className="toolbar">
                        <div className="search-box">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Yer imlerinde ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="tag-filter">
                            <button
                                className={`tag-pill ${!selectedTag ? 'active' : ''}`}
                                onClick={() => setSelectedTag(null)}
                            >
                                Tümü
                            </button>
                            {tags.map(tag => (
                                <button
                                    key={tag.id}
                                    className={`tag-pill ${selectedTag === tag.id ? 'active' : ''}`}
                                    onClick={() => setSelectedTag(tag.id)}
                                    style={{
                                        '--tag-color': tag.color,
                                        borderColor: selectedTag === tag.id ? tag.color : undefined
                                    }}
                                >
                                    <span className="tag-dot" style={{ background: tag.color }} />
                                    {tag.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : activeView === 'bookmarks' ? (
                        <BookmarksList
                            bookmarks={filteredBookmarks}
                            tags={tags}
                            onDelete={deleteBookmark}
                            onAddTag={addTagToBookmark}
                            onRemoveTag={removeTagFromBookmark}
                        />
                    ) : (
                        <TagsList
                            tags={tags}
                            bookmarks={bookmarks}
                            onEdit={openEditTag}
                            onDelete={deleteTag}
                            onCreate={() => { setEditingTag(null); setTagForm({ name: '', color: '#6366f1' }); setShowTagModal(true); }}
                        />
                    )}
                </div>

                {showTagModal && (
                    <TagModal
                        form={tagForm}
                        setForm={setTagForm}
                        colors={tagColors}
                        editing={!!editingTag}
                        onSave={editingTag ? updateTag : createTag}
                        onClose={() => { setShowTagModal(false); setEditingTag(null); }}
                    />
                )}
            </div>
        </div>
    );
};

// Bookmarks List
const BookmarksList = ({ bookmarks, tags, onDelete, onAddTag, onRemoveTag }) => {
    const [openMenu, setOpenMenu] = useState(null);

    if (bookmarks.length === 0) {
        return (
            <div className="empty-state">
                <FaBookmark />
                <p>Yer imi bulunmuyor</p>
                <span>Mesajları kaydederek yer imi oluşturabilirsiniz</span>
            </div>
        );
    }

    return (
        <div className="bookmarks-list">
            {bookmarks.map(bookmark => (
                <div key={bookmark.id} className="bookmark-item">
                    <div className="bookmark-content">
                        <div className="bookmark-header">
                            <span className="channel-name">
                                <FaHashtag /> {bookmark.channel_name}
                            </span>
                            <span className="bookmark-time">
                                <FaClock /> {new Date(bookmark.created_at).toLocaleDateString('tr-TR')}
                            </span>
                        </div>
                        <p className="message-content">{bookmark.content}</p>

                        <div className="bookmark-tags">
                            {bookmark.tags?.map(tag => (
                                <span
                                    key={tag.id}
                                    className="bookmark-tag"
                                    style={{ background: `${tag.color}20`, color: tag.color, borderColor: tag.color }}
                                >
                                    {tag.name}
                                    <button onClick={() => onRemoveTag(bookmark.id, tag.id)}>
                                        <FaTimes />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bookmark-actions">
                        <div className="menu-wrapper">
                            <button
                                className="menu-btn"
                                onClick={() => setOpenMenu(openMenu === bookmark.id ? null : bookmark.id)}
                            >
                                <FaEllipsisV />
                            </button>
                            {openMenu === bookmark.id && (
                                <div className="dropdown-menu">
                                    <div className="menu-section">
                                        <span className="menu-label">Etiket Ekle</span>
                                        {tags.filter(t => !bookmark.tags?.some(bt => bt.id === t.id)).map(tag => (
                                            <button
                                                key={tag.id}
                                                onClick={() => { onAddTag(bookmark.id, tag.id); setOpenMenu(null); }}
                                            >
                                                <span className="tag-dot" style={{ background: tag.color }} />
                                                {tag.name}
                                            </button>
                                        ))}
                                    </div>
                                    <button className="delete" onClick={() => onDelete(bookmark.id)}>
                                        <FaTrash /> Yer İmini Sil
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Tags List
const TagsList = ({ tags, bookmarks, onEdit, onDelete, onCreate }) => {
    const getTagCount = (tagId) => {
        return bookmarks.filter(b => b.tags?.some(t => t.id === tagId)).length;
    };

    return (
        <div className="tags-list">
            <button className="create-tag-btn" onClick={onCreate}>
                <FaPlus /> Yeni Etiket Oluştur
            </button>

            {tags.length === 0 ? (
                <div className="empty-state">
                    <FaTag />
                    <p>Henüz etiket oluşturmadınız</p>
                </div>
            ) : (
                tags.map(tag => (
                    <div key={tag.id} className="tag-item">
                        <div className="tag-color" style={{ background: tag.color }} />
                        <div className="tag-info">
                            <span className="tag-name">{tag.name}</span>
                            <span className="tag-count">{getTagCount(tag.id)} yer imi</span>
                        </div>
                        <div className="tag-actions">
                            <button className="edit-btn" onClick={() => onEdit(tag)}>
                                <FaEdit />
                            </button>
                            <button className="delete-btn" onClick={() => onDelete(tag.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

// Tag Modal
const TagModal = ({ form, setForm, colors, editing, onSave, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="tag-modal" onClick={e => e.stopPropagation()}>
                <h3>{editing ? 'Etiketi Düzenle' : 'Yeni Etiket'}</h3>

                <div className="form-group">
                    <label>Etiket Adı</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="örn: Önemli, Sonra Oku"
                    />
                </div>

                <div className="form-group">
                    <label>Renk</label>
                    <div className="color-picker">
                        {colors.map(color => (
                            <button
                                key={color}
                                className={`color-option ${form.color === color ? 'selected' : ''}`}
                                style={{ background: color }}
                                onClick={() => setForm(prev => ({ ...prev, color }))}
                            >
                                {form.color === color && <FaCheck />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="preview">
                    <span className="preview-label">Önizleme:</span>
                    <span
                        className="tag-preview"
                        style={{ background: `${form.color}20`, color: form.color, borderColor: form.color }}
                    >
                        {form.name || 'Etiket'}
                    </span>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="save-btn" onClick={onSave}>
                        {editing ? 'Güncelle' : 'Oluştur'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookmarkTagsPanel;
