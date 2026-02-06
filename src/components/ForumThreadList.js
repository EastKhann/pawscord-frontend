// frontend/src/components/ForumThreadList.js
import React, { useState, useEffect } from 'react';
import { FaComments, FaThumbsUp, FaEye, FaClock, FaThumbtack, FaLock, FaPlus, FaTag, FaFire } from 'react-icons/fa';
import toast from '../utils/toast';
import './ForumThreadList.css';

const ForumThreadList = ({ serverId, channelId, onThreadSelect }) => {
    const [threads, setThreads] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [loading, setLoading] = useState(true);
    const [showCreateThread, setShowCreateThread] = useState(false);
    const [newThread, setNewThread] = useState({
        title: '',
        content: '',
        tags: []
    });

    useEffect(() => {
        fetchThreads();
        fetchTags();
    }, [channelId, sortBy, selectedTag]);

    const fetchThreads = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                sort: sortBy,
                ...(selectedTag !== 'all' && { tag: selectedTag })
            });

            const response = await fetch(`/api/forum/threads/${channelId}/?${params}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setThreads(data.threads || []);
            }
        } catch (error) {
            toast.error('❌ Konular yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await fetch(`/api/forum/tags/${channelId}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setTags(data.tags || []);
            }
        } catch (error) {
            console.error('Failed to fetch tags:', error);
        }
    };

    const createThread = async () => {
        if (!newThread.title.trim() || !newThread.content.trim()) {
            toast.error('❌ Başlık ve içerik gerekli');
            return;
        }

        try {
            const response = await fetch(`/api/forum/threads/${channelId}/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newThread)
            });

            if (response.ok) {
                const data = await response.json();
                setThreads([data.thread, ...threads]);
                setShowCreateThread(false);
                setNewThread({ title: '', content: '', tags: [] });
                toast.success('✅ Konu oluşturuldu');
            } else {
                toast.error('❌ Konu oluşturulamadı');
            }
        } catch (error) {
            toast.error('❌ Bağlantı hatası');
        }
    };

    const togglePin = async (threadId, isPinned) => {
        try {
            const response = await fetch(`/api/forum/threads/${threadId}/pin/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pinned: !isPinned })
            });

            if (response.ok) {
                setThreads(threads.map(t => 
                    t.id === threadId ? {...t, is_pinned: !isPinned} : t
                ));
                toast.success(isPinned ? '📌 Sabitleme kaldırıldı' : '📌 Sabitlendi');
            }
        } catch (error) {
            toast.error('❌ İşlem başarısız');
        }
    };

    const toggleLock = async (threadId, isLocked) => {
        try {
            const response = await fetch(`/api/forum/threads/${threadId}/lock/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ locked: !isLocked })
            });

            if (response.ok) {
                setThreads(threads.map(t => 
                    t.id === threadId ? {...t, is_locked: !isLocked} : t
                ));
                toast.success(isLocked ? '🔓 Kilit açıldı' : '🔒 Kilitlendi');
            }
        } catch (error) {
            toast.error('❌ İşlem başarısız');
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes}dk önce`;
        if (hours < 24) return `${hours}sa önce`;
        if (days < 7) return `${days}g önce`;
        return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
    };

    const addTagToNewThread = (tag) => {
        if (!newThread.tags.includes(tag)) {
            setNewThread({
                ...newThread,
                tags: [...newThread.tags, tag]
            });
        }
    };

    const removeTagFromNewThread = (tag) => {
        setNewThread({
            ...newThread,
            tags: newThread.tags.filter(t => t !== tag)
        });
    };

    return (
        <div className="forum-thread-list">
            <div className="forum-header">
                <div className="forum-controls">
                    <div className="tag-filters">
                        <button 
                            className={`tag-btn ${selectedTag === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedTag('all')}
                        >
                            Tümü
                        </button>
                        {tags.map(tag => (
                            <button
                                key={tag.id}
                                className={`tag-btn ${selectedTag === tag.id ? 'active' : ''}`}
                                onClick={() => setSelectedTag(tag.id)}
                                style={{ borderColor: tag.color }}
                            >
                                <FaTag /> {tag.name}
                            </button>
                        ))}
                    </div>

                    <div className="sort-controls">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="recent">En Yeni</option>
                            <option value="popular">Popüler</option>
                            <option value="active">Aktif</option>
                            <option value="unanswered">Cevaplanmamış</option>
                        </select>
                        <button className="btn-create" onClick={() => setShowCreateThread(true)}>
                            <FaPlus /> Yeni Konu
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Yükleniyor...</p>
                </div>
            ) : (
                <div className="threads-container">
                    {threads.length === 0 ? (
                        <div className="empty-state">
                            <FaComments size={48} />
                            <h3>Henüz Konu Yok</h3>
                            <p>İlk konuyu sen oluştur!</p>
                            <button className="btn-create-large" onClick={() => setShowCreateThread(true)}>
                                <FaPlus /> Konu Oluştur
                            </button>
                        </div>
                    ) : (
                        threads.map(thread => (
                            <div 
                                key={thread.id} 
                                className={`thread-card ${thread.is_pinned ? 'pinned' : ''} ${thread.is_locked ? 'locked' : ''}`}
                                onClick={() => onThreadSelect && onThreadSelect(thread)}
                            >
                                <div className="thread-status">
                                    {thread.is_pinned && <FaThumbtack className="pin-icon" title="Sabitlenmiş" />}
                                    {thread.is_locked && <FaLock className="lock-icon" title="Kilitli" />}
                                </div>

                                <div className="thread-avatar">
                                    <img src={thread.author.avatar || '/default-avatar.png'} alt={thread.author.username} />
                                </div>

                                <div className="thread-content">
                                    <h3 className="thread-title">{thread.title}</h3>
                                    <div className="thread-meta">
                                        <span className="author">{thread.author.username}</span>
                                        <span className="separator">•</span>
                                        <span className="time">
                                            <FaClock /> {formatTime(thread.created_at)}
                                        </span>
                                        {thread.tags && thread.tags.length > 0 && (
                                            <>
                                                <span className="separator">•</span>
                                                <div className="thread-tags">
                                                    {thread.tags.map(tag => (
                                                        <span 
                                                            key={tag.id} 
                                                            className="thread-tag"
                                                            style={{ backgroundColor: tag.color }}
                                                        >
                                                            {tag.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="thread-stats">
                                    <div className="stat">
                                        <FaComments />
                                        <span>{thread.replies_count || 0}</span>
                                    </div>
                                    <div className="stat">
                                        <FaEye />
                                        <span>{thread.views_count || 0}</span>
                                    </div>
                                    <div className="stat">
                                        <FaThumbsUp />
                                        <span>{thread.likes_count || 0}</span>
                                    </div>
                                </div>

                                {thread.last_reply && (
                                    <div className="thread-last-reply">
                                        <img src={thread.last_reply.author.avatar} alt="" />
                                        <div>
                                            <span className="reply-author">{thread.last_reply.author.username}</span>
                                            <span className="reply-time">{formatTime(thread.last_reply.created_at)}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="thread-actions" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                        className="action-btn"
                                        onClick={() => togglePin(thread.id, thread.is_pinned)}
                                        title={thread.is_pinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}
                                    >
                                        <FaThumbtack />
                                    </button>
                                    <button 
                                        className="action-btn"
                                        onClick={() => toggleLock(thread.id, thread.is_locked)}
                                        title={thread.is_locked ? 'Kilidi Aç' : 'Kilitle'}
                                    >
                                        <FaLock />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {showCreateThread && (
                <div className="create-thread-modal" onClick={() => setShowCreateThread(false)}>
                    <div className="create-thread-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Yeni Konu Oluştur</h3>
                            <button onClick={() => setShowCreateThread(false)}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label>Başlık</label>
                                <input
                                    type="text"
                                    value={newThread.title}
                                    onChange={(e) => setNewThread({...newThread, title: e.target.value})}
                                    placeholder="Konu başlığı..."
                                    maxLength={200}
                                />
                            </div>

                            <div className="form-group">
                                <label>İçerik</label>
                                <textarea
                                    value={newThread.content}
                                    onChange={(e) => setNewThread({...newThread, content: e.target.value})}
                                    placeholder="Konunu detaylandır..."
                                    rows={8}
                                />
                            </div>

                            <div className="form-group">
                                <label>Etiketler</label>
                                <div className="available-tags">
                                    {tags.map(tag => (
                                        <button
                                            key={tag.id}
                                            className={`tag-chip ${newThread.tags.includes(tag.id) ? 'selected' : ''}`}
                                            onClick={() => newThread.tags.includes(tag.id) 
                                                ? removeTagFromNewThread(tag.id) 
                                                : addTagToNewThread(tag.id)
                                            }
                                            style={{ borderColor: tag.color }}
                                        >
                                            {tag.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowCreateThread(false)}>
                                İptal
                            </button>
                            <button className="btn-submit" onClick={createThread}>
                                Oluştur
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForumThreadList;
