// frontend/src/components/ForumPanel.js
import { useState, useEffect, useCallback, memo } from 'react';
import toast from '../utils/toast';
import './ForumPanel.css';

const ForumPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [forums, setForums] = useState([]);
    const [selectedForum, setSelectedForum] = useState(null);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        fetchForums();
    }, [serverId]);

    useEffect(() => {
        if (selectedForum) {
            fetchPosts(selectedForum.id);
        }
    }, [selectedForum]);

    const fetchForums = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/forums/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setForums(Array.isArray(data) ? data : data.forums || []);
            }
        } catch (error) {
            console.error('Forum fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPosts = async (forumId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/forums/${forumId}/posts/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setPosts(Array.isArray(data) ? data : data.posts || []);
            }
        } catch (error) {
            console.error('Posts fetch error:', error);
        }
    };

    const handleCreateForum = async () => {
        const name = prompt('Forum kanalı adı:');
        if (!name) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/forums/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            });

            if (response.ok) {
                const data = await response.json();
                setForums([...forums, data.forum]);
                toast.success('✅ Forum oluşturuldu!');
            } else {
                toast.error('❌ Forum oluşturulamadı');
            }
        } catch (error) {
            console.error('Forum creation error:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    const handleCreatePost = async () => {
        if (!newPost.title.trim() || !newPost.content.trim()) {
            toast.error('⚠️ Başlık ve içerik gerekli');
            return;
        }

        setCreating(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/forums/${selectedForum.id}/posts/create/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                const data = await response.json();
                setPosts([data.post, ...posts]);
                setNewPost({ title: '', content: '', tags: [] });
                setShowCreatePost(false);
                toast.success('✅ Gönderi oluşturuldu!');
            } else {
                toast.error('❌ Gönderi oluşturulamadı');
            }
        } catch (error) {
            console.error('Post creation error:', error);
            toast.error('❌ Hata oluştu');
        } finally {
            setCreating(false);
        }
    };

    const handleReply = async (postId) => {
        if (!replyContent.trim()) {
            toast.error('⚠️ Yanıt içeriği gerekli');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/forums/posts/${postId}/reply/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: replyContent })
            });

            if (response.ok) {
                const data = await response.json();
                // Refresh post details
                setSelectedPost({ ...selectedPost, replies: [...(selectedPost.replies || []), data.reply] });
                setReplyContent('');
                toast.success('✅ Yanıt gönderildi!');
            } else {
                toast.error('❌ Yanıt gönderilemedi');
            }
        } catch (error) {
            console.error('Reply error:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    const handleVote = async (postId, voteType) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/forums/posts/${postId}/vote/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vote_type: voteType })
            });

            if (response.ok) {
                const data = await response.json();
                // Update post votes
                setPosts(posts.map(p => p.id === postId ? { ...p, votes: data.votes } : p));
                toast.success(voteType === 'up' ? '👍 Upvote!' : '👎 Downvote!');
            }
        } catch (error) {
            console.error('Vote error:', error);
        }
    };

    const handleMarkSolution = async (postId, replyId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/forums/posts/${postId}/solve/${replyId}/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('✅ Çözüm olarak işaretlendi!');
                // Refresh post
                setSelectedPost({ ...selectedPost, solution_id: replyId });
            }
        } catch (error) {
            console.error('Mark solution error:', error);
        }
    };

    // 🎯 Performance: Memoized event handlers
    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleBackToForums = useCallback(() => setSelectedForum(null), []);
    const handleBackToPosts = useCallback(() => setSelectedPost(null), []);
    const handleToggleCreatePost = useCallback(() => setShowCreatePost(prev => !prev), []);
    const handleHideCreatePost = useCallback(() => setShowCreatePost(false), []);
    const handleNewPostTitleChange = useCallback((e) => setNewPost(prev => ({ ...prev, title: e.target.value })), []);
    const handleNewPostContentChange = useCallback((e) => setNewPost(prev => ({ ...prev, content: e.target.value })), []);
    const handleReplyContentChange = useCallback((e) => setReplyContent(e.target.value), []);
    const handleUpvoteSelected = useCallback(() => handleVote(selectedPost?.id, 'up'), [handleVote, selectedPost?.id]);
    const handleDownvoteSelected = useCallback(() => handleVote(selectedPost?.id, 'down'), [handleVote, selectedPost?.id]);
    const handleReplySelected = useCallback(() => handleReply(selectedPost?.id), [handleReply, selectedPost?.id]);

    if (loading) {
        return (
            <div className="forum-panel-overlay" onClick={onClose}>
                <div className="forum-panel" onClick={handleStopPropagation}>
                    <div className="forum-loading">
                        <div className="spinner"></div>
                        <p>Yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="forum-panel-overlay" onClick={onClose}>
            <div className="forum-panel" onClick={handleStopPropagation}>
                <div className="forum-header">
                    <h2>💬 Forum</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {!selectedForum ? (
                    <div className="forum-list">
                        <div className="forum-list-header">
                            <h3>Forum Kanalları</h3>
                            <button className="create-forum-btn" onClick={handleCreateForum}>
                                ➕ Yeni Forum
                            </button>
                        </div>

                        {forums.length > 0 ? (
                            <div className="forums-grid">
                                {forums.map(forum => (
                                    <div
                                        key={forum.id}
                                        className="forum-card"
                                        onClick={() => setSelectedForum(forum)}
                                    >
                                        <div className="forum-icon">💬</div>
                                        <h4>{forum.name}</h4>
                                        <p className="forum-stats">
                                            {forum.posts_count || 0} gönderi • {forum.members_count || 0} üye
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-forums">
                                <p>📋 Henüz forum kanalı yok</p>
                                <button onClick={handleCreateForum}>İlk forumu oluştur</button>
                            </div>
                        )}
                    </div>
                ) : !selectedPost ? (
                    <div className="posts-view">
                        <div className="posts-header">
                            <button className="back-btn" onClick={handleBackToForums}>
                                ← Geri
                            </button>
                            <h3>{selectedForum.name}</h3>
                            <button
                                className="new-post-btn"
                                onClick={handleToggleCreatePost}
                            >
                                ➕ Yeni Gönderi
                            </button>
                        </div>

                        {showCreatePost && (
                            <div className="create-post-form">
                                <input
                                    type="text"
                                    placeholder="Gönderi başlığı..."
                                    value={newPost.title}
                                    onChange={handleNewPostTitleChange}
                                    maxLength={200}
                                />
                                <textarea
                                    placeholder="İçerik..."
                                    value={newPost.content}
                                    onChange={handleNewPostContentChange}
                                    rows={6}
                                />
                                <div className="form-actions">
                                    <button
                                        className="submit-btn"
                                        onClick={handleCreatePost}
                                        disabled={creating}
                                    >
                                        {creating ? '⏳ Gönderiliyor...' : '📤 Gönder'}
                                    </button>
                                    <button
                                        className="cancel-btn"
                                        onClick={handleHideCreatePost}
                                    >
                                        İptal
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="posts-list">
                            {posts.map(post => (
                                <div
                                    key={post.id}
                                    className="post-item"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    <div className="post-votes">
                                        <button onClick={(e) => { e.stopPropagation(); handleVote(post.id, 'up'); }}>
                                            👍
                                        </button>
                                        <span>{post.votes || 0}</span>
                                        <button onClick={(e) => { e.stopPropagation(); handleVote(post.id, 'down'); }}>
                                            👎
                                        </button>
                                    </div>
                                    <div className="post-content">
                                        <h4>{post.title}</h4>
                                        <p className="post-meta">
                                            👤 {post.author} • ⏰ {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                            {post.is_solved && ' • ✅ Çözüldü'}
                                        </p>
                                        <p className="post-preview">{post.content?.substring(0, 150)}...</p>
                                        <div className="post-stats">
                                            💬 {post.replies_count || 0} yanıt
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {posts.length === 0 && (
                                <div className="no-posts">
                                    <p>📭 Henüz gönderi yok</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="post-detail">
                        <div className="detail-header">
                            <button className="back-btn" onClick={handleBackToPosts}>
                                ← Geri
                            </button>
                        </div>

                        <div className="post-main">
                            <div className="post-votes-vertical">
                                <button onClick={handleUpvoteSelected}>👍</button>
                                <span>{selectedPost.votes || 0}</span>
                                <button onClick={handleDownvoteSelected}>👎</button>
                            </div>

                            <div className="post-body">
                                <h2>{selectedPost.title}</h2>
                                <p className="post-meta">
                                    👤 {selectedPost.author} • ⏰ {new Date(selectedPost.created_at).toLocaleString('tr-TR')}
                                </p>
                                <div className="post-text">{selectedPost.content}</div>
                            </div>
                        </div>

                        <div className="replies-section">
                            <h3>💬 Yanıtlar ({selectedPost.replies?.length || 0})</h3>

                            {(selectedPost.replies || []).map(reply => (
                                <div
                                    key={reply.id}
                                    className={`reply-item ${reply.id === selectedPost.solution_id ? 'solution' : ''}`}
                                >
                                    <div className="reply-header">
                                        <span className="reply-author">👤 {reply.author}</span>
                                        <span className="reply-time">
                                            {new Date(reply.created_at).toLocaleString('tr-TR')}
                                        </span>
                                        {reply.id === selectedPost.solution_id && (
                                            <span className="solution-badge">✅ Çözüm</span>
                                        )}
                                    </div>
                                    <div className="reply-content">{reply.content}</div>
                                    {!selectedPost.solution_id && (
                                        <button
                                            className="mark-solution-btn"
                                            onClick={() => handleMarkSolution(selectedPost.id, reply.id)}
                                        >
                                            ✅ Çözüm olarak işaretle
                                        </button>
                                    )}
                                </div>
                            ))}

                            <div className="reply-form">
                                <textarea
                                    placeholder="Yanıtınızı yazın..."
                                    value={replyContent}
                                    onChange={handleReplyContentChange}
                                    rows={4}
                                />
                                <button
                                    className="reply-submit-btn"
                                    onClick={handleReplySelected}
                                >
                                    📤 Yanıtla
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(ForumPanel);
