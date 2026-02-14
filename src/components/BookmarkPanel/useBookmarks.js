import { useState, useEffect } from 'react';
import toast from '../../utils/toast';

const useBookmarks = (fetchWithAuth, apiBaseUrl) => {
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
        body: JSON.stringify({ name: newTagName, color: newTagColor })
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
      const response = await fetchWithAuth(`${apiBaseUrl}/bookmarks/${bookmarkId}/delete/`, { method: 'DELETE' });
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

  return {
    bookmarks, tags, selectedTag, setSelectedTag,
    searchQuery, setSearchQuery, loading,
    showNewTagModal, setShowNewTagModal,
    newTagName, setNewTagName, newTagColor, setNewTagColor,
    createTag, deleteBookmark, addTagToBookmark, filteredBookmarks
  };
};

export default useBookmarks;
