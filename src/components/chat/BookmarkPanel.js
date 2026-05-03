/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaTags, FaTrash, FaSearch, FaPlus, FaBookmark, FaFolder } from 'react-icons/fa';
import { styles } from '../BookmarkPanel/bookmarkPanelStyles';
import useBookmarks from '../BookmarkPanel/useBookmarks';

import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

const S = {
    flex: { display: 'flex', gap: '10px', alignItems: 'center' },
};

const BookmarkPanel = ({ fetchWithAuth, apiBaseUrl, onClose, onMessageClick }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const {
        bookmarks,
        tags,
        selectedTag,
        setSelectedTag,
        searchQuery,
        setSearchQuery,
        loading,
        showNewTagModal,
        setShowNewTagModal,
        newTagName,
        setNewTagName,
        newTagColor,
        setNewTagColor,
        createTag,
        deleteBookmark,
        addTagToBookmark,
        filteredBookmarks,
    } = useBookmarks(fetchWithAuth, apiBaseUrl);

    // useCallback handlers
    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleSearchChange = useCallback((e) => setSearchQuery(e.target.value), [setSearchQuery]);
    const handleShowNewTag = useCallback(() => setShowNewTagModal(true), [setShowNewTagModal]);
    const handleSelectAllTags = useCallback(() => setSelectedTag(null), [setSelectedTag]);
    const handleHideNewTagModal = useCallback(
        () => setShowNewTagModal(false),
        [setShowNewTagModal]
    );
    const handleNewTagNameChange = useCallback(
        (e) => setNewTagName(e.target.value),
        [setNewTagName]
    );
    const handleNewTagColorChange = useCallback(
        (e) => setNewTagColor(e.target.value),
        [setNewTagColor]
    );

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* Header */}
                <div style={styles.header}>
                    <div className="flex-align-10">
                        <FaBookmark className="icon-warning" />
                        <h2 className="m-0">Kaydedilenler</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                {/* Toolbar */}
                <div style={styles.toolbar}>
                    <div style={styles.searchBox}>
                        <FaSearch className="icon-gray" />
                        <input
                            type="text"
                            placeholder={t('bookmark.searchPlaceholder', 'Search messages...')}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={styles.searchInput}
                            aria-label={t('common.search', 'Search')}
                        />
                    </div>
                    <button
                        aria-label={t('bookmark.newTag', 'New tag')}
                        onClick={handleShowNewTag}
                        style={styles.newTagBtn}
                    >
                        <FaPlus /> {t('bookmark.newTag', 'New Tag')}
                    </button>
                </div>

                {/* Tags */}
                <div style={styles.tagsContainer}>
                    <button
                        aria-label={t('bookmarks.allTags', 'All tags')}
                        onClick={handleSelectAllTags}
                        style={{
                            ...styles.tagChip,
                            backgroundColor: !selectedTag ? '#5865f2' : '#111214',
                        }}
                    >
                        <FaFolder /> All ({bookmarks.length})
                    </button>
                    {tags.map((tag) => (
                        <button
                            key={tag.id}
                            aria-label={tag.name}
                            onClick={() => setSelectedTag(tag.id)}
                            style={{
                                ...styles.tagChip,
                                backgroundColor: selectedTag === tag.id ? tag.color : '#111214',
                                borderLeft: `3px solid ${tag.color}`,
                            }}
                        >
                            <FaTags /> {tag.name} ({tag.bookmark_count || 0})
                        </button>
                    ))}
                </div>

                {/* Bookmarks List */}
                <div style={styles.bookmarksList}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : filteredBookmarks.length === 0 ? (
                        <div style={styles.empty}>
                            <FaBookmark className="icon-lg" />
                            <p>{t('bookmarks.noBookmarks', 'No bookmarks yet')}</p>
                        </div>
                    ) : (
                        filteredBookmarks.map((bookmark) => (
                            <div key={bookmark.id} style={styles.bookmarkItem}>
                                <div style={styles.bookmarkContent}>
                                    <div style={styles.bookmarkMeta}>
                                        <strong>{bookmark.message?.username}</strong>
                                        <span className="text-gray-sm">
                                            {new Date(bookmark.created_at).toLocaleString('tr-TR')}
                                        </span>
                                    </div>
                                    <div
                                        style={styles.bookmarkText}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => onMessageClick?.(bookmark.message)}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        {bookmark.message?.content || t('ui.mesaj_icerigi_yok')}
                                    </div>
                                    <div style={styles.bookmarkTags}>
                                        {bookmark.tags?.map((tag) => (
                                            <span key={tag.id}>{tag.name}</span>
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
                                            <option value="">+ Etiket Ekle</option>
                                            {tags.map((tag) => (
                                                <option key={tag.id} value={tag.id}>
                                                    {tag.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    aria-label={t('common.delete')}
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
                    <div
                        style={styles.modalOverlay}
                        role="button"
                        tabIndex={0}
                        onClick={handleHideNewTagModal}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div
                            style={styles.newTagModal}
                            role="button"
                            tabIndex={0}
                            onClick={handleStopPropagation}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <h3>{t('bookmarks.createTag', 'Create New Tag')}</h3>
                            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                            <input
                                type="text"
                                placeholder={t('ui.tag_adi')}
                                value={newTagName}
                                onChange={handleNewTagNameChange}
                                style={styles.input}
                                autoFocus
                                aria-label={t('ui.tag_adi_2')}
                            />
                            <div style={S.flex}>
                                <label>Renk:</label>
                                <input
                                    type="color"
                                    value={newTagColor}
                                    onChange={handleNewTagColorChange}
                                    style={styles.colorPicker}
                                    aria-label={t('bookmarks.tagColor', 'Tag color')}
                                />
                            </div>
                            <div className="flex-10-mt20">
                                <button
                                    aria-label={t('bookmarks.createTagBtn', 'Create tag')}
                                    onClick={createTag}
                                    style={styles.primaryBtn}
                                >
                                    {t('common.create', 'Create')}
                                </button>
                                <button
                                    aria-label={t('common.cancel', 'Cancel')}
                                    onClick={handleHideNewTagModal}
                                    style={styles.secondaryBtn}
                                >
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

BookmarkPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    onMessageClick: PropTypes.func,
};
export default memo(BookmarkPanel);
