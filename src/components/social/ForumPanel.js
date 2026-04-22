import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/ForumPanel.js
import { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import './ForumPanel.css';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const ForumPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
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
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/forums/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setForums(Array.isArray(data) ? data : data.forums || []);
            }
        } catch (error) {
            logger.error('Forum fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPosts = async (forumId) => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/forums/${forumId}/posts/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setPosts(Array.isArray(data) ? data : data.posts || []);
            }
        } catch (error) {
            logger.error('Posts fetch error:', error);
        }
    };

    const handleCreateForum = async () => {
        const name = prompt('Forum channel name:');
        if (!name) return;

        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/forums/create/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                const data = await response.json();
                setForums([...forums, data.forum]);
                toast.success(t('forum.created'));
            } else {
                toast.error(t('ui.forum_olusturulamadi'));
            }
        } catch (error) {
            logger.error('Forum creation error:', error);
            toast.error(t('common.errorOccurred'));
        }
    };

    const handleCreatePost = async () => {
        if (!newPost.title.trim() || !newPost.content.trim()) {
            toast.error(t('ui.title_ve_icerik_gerekli'));
            return;
        }

        setCreating(true);
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/forums/${selectedForum.id}/posts/create/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                const data = await response.json();
                setPosts([data.post, ...posts]);
                setNewPost({ title: '', content: '', tags: [] });
                setShowCreatePost(false);
                toast.success(t('forum.postCreated'));
            } else {
                toast.error(t('ui.sendi_olusturulamadi'));
            }
        } catch (error) {
            logger.error('Post creation error:', error);
            toast.error(t('common.errorOccurred'));
        } finally {
            setCreating(false);
        }
    };

    const handleReply = async (postId) => {
        if (!replyContent.trim()) {
            toast.error(t('ui.yanit_icerigi_gerekli'));
            return;
        }

        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/forums/posts/${postId}/reply/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: replyContent }),
            });

            if (response.ok) {
                const data = await response.json();
                // Refresh post details
                setSelectedPost({
                    ...selectedPost,
                    replies: [...(selectedPost.replies || []), data.reply],
                });
                setReplyContent('');
                toast.success(t('ui.yanit_sent'));
            } else {
                toast.error(t('forum.replyFailed'));
            }
        } catch (error) {
            logger.error('Reply error:', error);
            toast.error(t('common.errorOccurred'));
        }
    };

    const handleVote = async (postId, voteType) => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/forums/posts/${postId}/vote/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vote_type: voteType }),
            });

            if (response.ok) {
                const data = await response.json();
                // Update post votes
                setPosts(posts.map((p) => (p.id === postId ? { ...p, votes: data.votes } : p)));
                toast.success(voteType === 'up' ? '👍 Upvote!' : '👎 Downvote!');
            }
        } catch (error) {
            logger.error('Vote error:', error);
        }
    };

    const handleMarkSolution = async (postId, replyId) => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/forums/posts/${postId}/solve/${replyId}/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                toast.success(t('ui.cozum_olarak_isaretlendi'));
                // Refresh post
                setSelectedPost({ ...selectedPost, solution_id: replyId });
            }
        } catch (error) {
            logger.error('Mark solution error:', error);
        }
    };

    // 🎯 Performance: Memoized event handlers
    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleBackToForums = useCallback(() => setSelectedForum(null), []);
    const handleBackToPosts = useCallback(() => setSelectedPost(null), []);
    const handleToggleCreatePost = useCallback(() => setShowCreatePost((prev) => !prev), []);
    const handleHideCreatePost = useCallback(() => setShowCreatePost(false), []);
    const handleNewPostTitleChange = useCallback(
        (e) => setNewPost((prev) => ({ ...prev, title: e.target.value })),
        []
    );
    const handleNewPostContentChange = useCallback(
        (e) => setNewPost((prev) => ({ ...prev, content: e.target.value })),
        []
    );
    const handleReplyContentChange = useCallback((e) => setReplyContent(e.target.value), []);
    const handleUpvoteSelected = useCallback(
        () => handleVote(selectedPost?.id, 'up'),
        [handleVote, selectedPost?.id]
    );
    const handleDownvoteSelected = useCallback(
        () => handleVote(selectedPost?.id, 'down'),
        [handleVote, selectedPost?.id]
    );
    const handleReplySelected = useCallback(
        () => handleReply(selectedPost?.id),
        [handleReply, selectedPost?.id]
    );

    if (loading) {
        return (
            <div
                className="forum-panel-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="forum-panel"
                    role="button"
                    tabIndex={0}
                    onClick={handleStopPropagation}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="forum-loading">
                        <div className="spinner"></div>
                        <p>{t('common.loading')}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="forum-panel-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="forum-panel"
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="forum-header">
                    <h2>💬 Forum</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {!selectedForum ? (
                    <div className="forum-list">
                        <div className="forum-list-header">
                            <h3>{t('forum.channels', 'Forum Channels')}</h3>
                            <button
                                aria-label={t('forum.createForum', 'Create new forum')}
                                className="create-forum-btn"
                                onClick={handleCreateForum}
                            >
                                ➕ {t('forum.newForum', 'New Forum')}
                            </button>
                        </div>

                        {forums.length > 0 ? (
                            <div className="forums-grid">
                                {forums.map((forum) => (
                                    <div
                                        key={forum.id}
                                        className="forum-card"
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => setSelectedForum(forum)}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="forum-icon">💬</div>
                                        <h4>{forum.name}</h4>
                                        <p className="forum-stats">
                                            {forum.posts_count || 0} {t('forum.posts', 'posts')} •{' '}
                                            {forum.members_count || 0} member
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-forums">
                                <p>{t('forum.noChannels', '📋 No forum channels yet')}</p>
                                <button
                                    aria-label={t('forum.createForum', 'Create forum')}
                                    onClick={handleCreateForum}
                                >
                                    {t('forum.createFirst', 'Create the first forum')}
                                </button>
                            </div>
                        )}
                    </div>
                ) : !selectedPost ? (
                    <div className="posts-view">
                        <div className="posts-header">
                            <button
                                aria-label={t('forum.backToForums', 'Back to forums')}
                                className="back-btn"
                                onClick={handleBackToForums}
                            >
                                ← Geri
                            </button>
                            <h3>{selectedForum.name}</h3>
                            <button
                                aria-label={t('forum.createPost', 'Create new post')}
                                className="new-post-btn"
                                onClick={handleToggleCreatePost}
                            >
                                ➕ {t('forum.newPost', 'New Post')}
                            </button>
                        </div>

                        {showCreatePost && (
                            <div className="create-post-form">
                                <input
                                    type="text"
                                    placeholder={t('ui.sendi_basligi')}
                                    value={newPost.title}
                                    onChange={handleNewPostTitleChange}
                                    maxLength={200}
                                    aria-label={t('ui.sendi_basligi_2')}
                                />
                                <textarea
                                    placeholder={t('forum.contentPlaceholder', 'Post content...')}
                                    value={newPost.content}
                                    onChange={handleNewPostContentChange}
                                    rows={6}
                                    aria-label={t('forum.contentPlaceholder', 'Post content...')}
                                />
                                <div className="form-actions">
                                    <button
                                        aria-label={t('forum.createPost', 'Create post')}
                                        className="submit-btn"
                                        onClick={handleCreatePost}
                                        disabled={creating}
                                    >
                                        {creating ? '⏳ ' + t('common.sending', 'Sending...') : '📤 ' + t('common.send', 'Send')}
                                    </button>
                                    <button
                                        aria-label={t('common.cancel', 'Cancel')}
                                        className="cancel-btn"
                                        onClick={handleHideCreatePost}
                                    >
                                        {t('common.cancel', 'Cancel')}
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="posts-list">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="post-item"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedPost(post)}
                                    onKeyDown={(e) =>
                                        (e.key === 'Enter' || e.key === ' ') &&
                                        e.currentTarget.click()
                                    }
                                >
                                    <div className="post-votes">
                                        <button
                                            aria-label={t('forum.upvote', 'Upvote')}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleVote(post.id, 'up');
                                            }}
                                        >
                                            👍
                                        </button>
                                        <span>{post.votes || 0}</span>
                                        <button
                                            aria-label={t('forum.downvote', 'Downvote')}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleVote(post.id, 'down');
                                            }}
                                        >
                                            👎
                                        </button>
                                    </div>
                                    <div className="post-content">
                                        <h4>{post.title}</h4>
                                        <p className="post-meta">
                                            👤 {post.author} • ⏰{' '}
                                            {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                            {post.is_solved && t('ui.cozuldu')}
                                        </p>
                                        <p className="post-preview">
                                            {post.content?.substring(0, 150)}...
                                        </p>
                                        <div className="post-stats">
                                            {t('forum.replies', '💬 {{count}} replies', { count: post.replies_count || 0 })}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {posts.length === 0 && (
                                <div className="no-posts">
                                    <p>{t('forum.noPosts', '📭 No posts yet')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="post-detail">
                        <div className="detail-header">
                            <button
                                aria-label={t('forum.backToPosts', 'Back to posts')}
                                className="back-btn"
                                onClick={handleBackToPosts}
                            >
                                ← Geri
                            </button>
                        </div>

                        <div className="post-main">
                            <div className="post-votes-vertical">
                                <button
                                    aria-label={t('forum.upvote', 'Upvote')}
                                    onClick={handleUpvoteSelected}
                                >
                                    👍
                                </button>
                                <span>{selectedPost.votes || 0}</span>
                                <button
                                    aria-label={t('forum.downvote', 'Downvote')}
                                    onClick={handleDownvoteSelected}
                                >
                                    👎
                                </button>
                            </div>

                            <div className="post-body">
                                <h2>{selectedPost.title}</h2>
                                <p className="post-meta">
                                    👤 {selectedPost.author} • ⏰{' '}
                                    {new Date(selectedPost.created_at).toLocaleString('tr-TR')}
                                </p>
                                <div className="post-text">{selectedPost.content}</div>
                            </div>
                        </div>

                        <div className="replies-section">
                            <h3>💬 Replyr ({selectedPost.replies?.length || 0})</h3>

                            {(selectedPost.replies || []).map((reply) => (
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
                                            <span className="solution-badge">{t('forum.solution', '✅ Solution')}</span>
                                        )}
                                    </div>
                                    <div className="reply-content">{reply.content}</div>
                                    {!selectedPost.solution_id && (
                                        <button
                                            aria-label={t('forum.markSolution', 'Mark as solution')}
                                        >
                                            {t('forum.markSolution', '✅ Mark as solution')}
                                        </button>
                                    )}
                                </div>
                            ))}

                            <div className="reply-form">
                                <textarea
                                    placeholder={t('ui.write_your_reply')}
                                    value={replyContent}
                                    onChange={handleReplyContentChange}
                                    rows={4}
                                    aria-label={t('ui.write_your_reply_2')}
                                />
                                <button
                                    aria-label={t('forum.submitReply', 'Submit reply')}
                                    className="reply-submit-btn"
                                    onClick={handleReplySelected}
                                >
                                    📤 {t('forum.reply', 'Reply')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

ForumPanel.propTypes = {
    serverId: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default memo(ForumPanel);
