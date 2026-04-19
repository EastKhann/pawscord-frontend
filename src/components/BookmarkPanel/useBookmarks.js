import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import logger from '../../utils/logger';

const useBookmarks = (fetchWithAuth, apiBaseUrl) => {
    const { t } = useTranslation();
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
            logger.error('Bookmark load error:', error);
            toast.error(t('bookmarks.loadError', 'Yer imleri yüklenemedi'));
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
            logger.error('Tag load error:', error);
        }
    };

    const createTag = async () => {
        if (!newTagName.trim()) {
            toast.error(t('bookmarks.tagNameEmpty', 'Etiket adı boş olamaz'));
            return;
        }
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newTagName, color: newTagColor }),
            });
            if (response.ok) {
                toast.success(t('bookmarks.tagCreated', 'Etiket oluşturuldu'));
                setNewTagName('');
                setNewTagColor('#5865f2');
                setShowNewTagModal(false);
                loadTags();
            } else {
                toast.error(t('bookmarks.tagCreateError', 'Etiket oluşturulamadı'));
            }
        } catch (error) {
            logger.error('Tag creation error:', error);
            toast.error(t('common.error', 'Bir hata oluştu'));
        }
    };

    const deleteBookmark = async (bookmarkId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/${bookmarkId}/delete/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success(t('bookmarks.deleted', 'Yer imi silindi'));
                loadBookmarks();
            } else {
                toast.error(t('bookmarks.deleteError', 'Yer imi silinemedi'));
            }
        } catch (error) {
            logger.error('Bookmark deletion error:', error);
            toast.error(t('common.error', 'Bir hata oluştu'));
        }
    };

    const addTagToBookmark = async (bookmarkId, tagId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/tags/${tagId}/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookmark_id: bookmarkId }),
            });
            if (response.ok) {
                toast.success(t('bookmarks.tagAdded', 'Etiket eklendi'));
                loadBookmarks();
            } else {
                toast.error(t('bookmarks.tagAddError', 'Etiket eklenemedi'));
            }
        } catch (error) {
            logger.error('Tag add error:', error);
            toast.error(t('common.error', 'Bir hata oluştu'));
        }
    };

    const filteredBookmarks = bookmarks.filter((b) => {
        const matchesTag = !selectedTag || b.tags?.some((t) => t.id === selectedTag);
        const matchesSearch =
            !searchQuery || b.message?.content?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTag && matchesSearch;
    });

    return {
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
    };
};

export default useBookmarks;
