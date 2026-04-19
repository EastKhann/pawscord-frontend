/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ReadLaterPanel.css';
import { FaBookmark, FaTag, FaSearch, FaTrash, FaPlus, FaTimes, FaFilter } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

function ReadLaterPanel({ apiBaseUrl, fetchWithAuth }) {
    const { t } = useTranslation();
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
        '#5865f2',
        '#23a559',
        '#f23f42',
        '#f0b232',
        '#5865f2',
        '#3498db',
        '#e91e63',
        '#00bcd4',
        '#ff9800',
        '#4caf50',
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
            setError('Yer imleri yüklenemedi: ' + err.message);
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
            logger.error('Error loading tags:', err);
        }
    };

    const createTag = async () => {
        if (!newTagName.trim()) {
            setError(t('readLater.tagNameRequired'));
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newTagName,
                    color: newTagColor,
                }),
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
                setError(data.error || 'Etiket oluşturulamadı');
            }
        } catch (err) {
            setError('Ağ hatası: ' + err.message);
        }
    };

    const removeBookmark = async (messageId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/messages/readlater/toggle/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message_id: messageId }),
            });

            if (response.ok) {
                setBookmarks(bookmarks.filter((b) => b.message_id !== messageId));
                setError('');
            }
        } catch (err) {
            setError('Yer imi kaldırılamadı: ' + err.message);
        }
    };

    const addTagToBookmark = async (messageId, tagId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/${tagId}/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message_id: messageId }),
            });

            if (response.ok) {
                loadBookmarks();
                setError('');
            }
        } catch (err) {
            setError('Etiket eklenemedi: ' + err.message);
        }
    };

    const removeTagFromBookmark = async (messageId, tagId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/${tagId}/remove/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message_id: messageId }),
            });

            if (response.ok) {
                loadBookmarks();
                setError('');
            }
        } catch (err) {
            setError('Etiket kaldırılamadı: ' + err.message);
        }
    };

    const toggleTagFilter = (tagId) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter((t) => t !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };

    const filteredBookmarks = bookmarks.filter((bookmark) => {
        const matchesSearch =
            searchQuery === '' ||
            bookmark.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bookmark.author.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTags =
            selectedTags.length === 0 ||
            bookmark.tags?.some((tag) => selectedTags.includes(tag.id));

        return matchesSearch && matchesTags;
    });

    return (
        <div className="readlater-panel">
            <div className="readlater-header">
                <h2>
                    <FaBookmark /> {t('readLater.title')}
                </h2>
                <button
                    aria-label="Toggle visibility"
                    className="create-tag-btn"
                    onClick={() => setShowTagModal(true)}
                >
                    <FaPlus /> {t('readLater.newTag')}
                </button>
            </div>

            {error && <div className="rl-error">{error}</div>}

            <div className="readlater-controls">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder={t('readLater.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="tag-filters">
                    <FaFilter className="filter-icon" />
                    <div className="tag-filter-list">
                        {tags.map((tag) => (
                            <button
                                aria-label="Action button"
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
                    <div className="rl-loading">{t('common.loading')}</div>
                ) : filteredBookmarks.length === 0 ? (
                    <div className="empty-state">
                        <FaBookmark className="empty-icon" />
                        <p>{t('readLater.noBookmarks')}</p>
                        <span>{t('readLater.noBookmarksDesc')}</span>
                    </div>
                ) : (
                    filteredBookmarks.map((bookmark, idx) => (
                        <div key={`item-${idx}`} className="bookmark-item">
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

                            <div className="bookmark-content">{bookmark.content}</div>

                            <div className="bookmark-footer">
                                <div className="bookmark-tags">
                                    {bookmark.tags?.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="bookmark-tag"
                                            style={{ borderColor: tag.color, color: tag.color }}
                                        >
                                            <FaTag />
                                            {tag.name}
                                            <FaTimes
                                                className="remove-tag-icon"
                                                onClick={() =>
                                                    removeTagFromBookmark(
                                                        bookmark.message_id,
                                                        tag.id
                                                    )
                                                }
                                            />
                                        </span>
                                    ))}
                                    <select
                                        className="add-tag-select"
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                addTagToBookmark(
                                                    bookmark.message_id,
                                                    parseInt(e.target.value)
                                                );
                                                e.target.value = '';
                                            }
                                        }}
                                    >
                                        <option value="">+ {t('readLater.addTag')}</option>
                                        {tags
                                            .filter(
                                                (tag) =>
                                                    !bookmark.tags?.find((t) => t.id === tag.id)
                                            )
                                            .map((tag) => (
                                                <option key={tag.id} value={tag.id}>
                                                    {tag.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <button
                                    aria-label="Action button"
                                    className="remove-bookmark-btn"
                                    onClick={() => removeBookmark(bookmark.message_id)}
                                >
                                    <FaTrash /> {t('common.remove')}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showTagModal && (
                <div
                    className="modal-overlay"
                    role="button"
                    tabIndex={0}
                    onClick={() => setShowTagModal(false)}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                    <div
                        className="modal-content"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Create Tag"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h3>
                                <FaTag /> {t('readLater.createTag')}
                            </h3>
                            <button
                                aria-label="Toggle visibility"
                                className="modal-close"
                                onClick={() => setShowTagModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label>{t('readLater.tagName')}</label>
                                <input
                                    type="text"
                                    className="tag-input"
                                    placeholder={t('readLater.tagNamePlaceholder')}
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && createTag()}
                                />
                            </div>

                            <div className="form-group">
                                <label>{t('readLater.tagColor')}</label>
                                <div className="color-picker">
                                    {tagColors.map((color) => (
                                        <button
                                            aria-label="Action button"
                                            key={color}
                                            className={`color-option ${newTagColor === color ? 'selected' : ''}`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => setNewTagColor(color)}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                aria-label="create Tag"
                                className="create-tag-submit"
                                onClick={createTag}
                            >
                                <FaPlus /> {t('readLater.createTag')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

ReadLaterPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default ReadLaterPanel;
