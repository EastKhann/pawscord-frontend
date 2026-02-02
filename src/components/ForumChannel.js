// frontend/src/components/ForumChannel.js
/**
 * 💬 FORUM CHANNEL - Discord-style forum system
 */

import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaPlus, FaThumbsUp, FaThumbsDown, FaCheckCircle, FaLock, FaThumbtack, FaEye, FaCommentAlt, FaTags } from 'react-icons/fa';

const ForumChannel = ({ forumId, fetchWithAuth, apiBaseUrl, currentUser }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewPost, setShowNewPost] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });
    const [selectedPost, setSelectedPost] = useState(null);
    const [sortBy, setSortBy] = useState('latest_activity'); // latest_activity, newest, top

    useEffect(() => {
        loadPosts();
    }, [forumId, sortBy]);

    const loadPosts = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/forums/${forumId}/posts/?sort=${sortBy}`);
            const data = await response.json();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Failed to load posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const createPost = async () => {
        if (!newPost.title.trim() || !newPost.content.trim()) {
            toast.error('❌ Başlık ve içerik gerekli!');
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/forums/${forumId}/posts/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                setShowNewPost(false);
                setNewPost({ title: '', content: '', tags: [] });
                loadPosts();
            }
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    const voteOnPost = async (postId, voteType) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/forums/posts/${postId}/vote/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vote_type: voteType })
            });

            if (response.ok) {
                loadPosts();
            }
        } catch (error) {
            console.error('Failed to vote:', error);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'solved':
                return <span style={styles.statusBadge}><FaCheckCircle /> Çözüldü</span>;
            case 'locked':
                return <span style={{ ...styles.statusBadge, backgroundColor: '#ed4245' }}><FaLock /> Kilitli</span>;
            default:
                return null;
        }
    };

    if (loading) return <div style={styles.loading}>Yükleniyor...</div>;

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <h2 style={styles.title}>💬 Forum</h2>
                    <div style={styles.sortButtons}>
                        <button
                            onClick={() => setSortBy('latest_activity')}
                            style={sortBy === 'latest_activity' ? styles.sortButtonActive : styles.sortButton}
                        >
                            Son Aktivite
                        </button>
                        <button
                            onClick={() => setSortBy('newest')}
                            style={sortBy === 'newest' ? styles.sortButtonActive : styles.sortButton}
                        >
                            En Yeni
                        </button>
                        <button
                            onClick={() => setSortBy('top')}
                            style={sortBy === 'top' ? styles.sortButtonActive : styles.sortButton}
                        >
                            En Popüler
                        </button>
                    </div>
                </div>
                <button onClick={() => setShowNewPost(true)} style={styles.newPostButton}>
                    <FaPlus /> Yeni Gönderi
                </button>
            </div>

            {/* New Post Modal */}
            {showNewPost && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h3 style={styles.modalTitle}>Yeni Gönderi Oluştur</h3>
                        <input
                            type="text"
                            placeholder="Başlık"
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            style={styles.input}
                        />
                        <textarea
                            placeholder="İçerik"
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            style={styles.textarea}
                            rows={8}
                        />
                        <input
                            type="text"
                            placeholder="Etiketler (virgülle ayırın: Bug, Feature, Help)"
                            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(',').map(t => t.trim()) })}
                            style={styles.input}
                        />
                        <div style={styles.modalActions}>
                            <button onClick={createPost} style={styles.createButton}>Oluştur</button>
                            <button onClick={() => setShowNewPost(false)} style={styles.cancelButton}>İptal</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Posts List */}
            <div style={styles.postsList}>
                {posts.length === 0 ? (
                    <div style={styles.empty}>
                        <p>Henüz gönderi yok. İlk göndericiyi siz olun! 🎉</p>
                    </div>
                ) : (
                    posts.map(post => (
                        <div key={post.id} style={styles.postCard} onClick={() => setSelectedPost(post)}>
                            {/* Post Header */}
                            <div style={styles.postHeader}>
                                <div style={styles.postHeaderLeft}>
                                    {post.is_pinned && <FaThumbtack style={styles.pinnedIcon} />}
                                    <h3 style={styles.postTitle}>{post.title}</h3>
                                    {getStatusBadge(post.status)}
                                </div>
                                <div style={styles.postAuthor}>
                                    <img
                                        src={post.author_avatar || '/default-avatar.png'}
                                        alt={post.author}
                                        style={styles.avatar}
                                    />
                                    <span>{post.author}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div style={styles.tags}>
                                    <FaTags style={{ marginRight: '6px', fontSize: '12px' }} />
                                    {post.tags.map((tag, idx) => (
                                        <span key={idx} style={styles.tag}>{tag}</span>
                                    ))}
                                </div>
                            )}

                            {/* Post Stats */}
                            <div style={styles.postStats}>
                                <div style={styles.stat}>
                                    <FaEye />
                                    <span>{post.view_count} görüntüleme</span>
                                </div>
                                <div style={styles.stat}>
                                    <FaCommentAlt />
                                    <span>{post.reply_count} yanıt</span>
                                </div>
                                <div style={styles.stat}>
                                    <FaThumbsUp />
                                    <span>{post.upvote_count || 0}</span>
                                </div>
                                <div style={styles.statDate}>
                                    {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                </div>
                            </div>

                            {/* Vote Buttons */}
                            <div style={styles.voteButtons}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); voteOnPost(post.id, 'up'); }}
                                    style={styles.voteButton}
                                >
                                    <FaThumbsUp /> {post.upvote_count || 0}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); voteOnPost(post.id, 'down'); }}
                                    style={styles.voteButton}
                                >
                                    <FaThumbsDown /> {post.downvote_count || 0}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#313338',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #1e1f22',
        backgroundColor: '#2b2d31'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    title: {
        margin: 0,
        color: '#fff',
        fontSize: '20px',
        fontWeight: '600'
    },
    sortButtons: {
        display: 'flex',
        gap: '8px'
    },
    sortButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b5bac1',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px'
    },
    sortButtonActive: {
        backgroundColor: '#5865f2',
        border: 'none',
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500'
    },
    newPostButton: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
    },
    modalContent: {
        backgroundColor: '#313338',
        borderRadius: '8px',
        padding: '24px',
        width: '90%',
        maxWidth: '600px'
    },
    modalTitle: {
        color: '#fff',
        fontSize: '20px',
        marginBottom: '20px'
    },
    input: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        marginBottom: '12px'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        marginBottom: '12px',
        resize: 'vertical',
        fontFamily: 'inherit'
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '20px'
    },
    createButton: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '10px 24px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    cancelButton: {
        backgroundColor: 'transparent',
        color: '#b5bac1',
        border: '1px solid #4e5058',
        padding: '10px 24px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    postsList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    postCard: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        border: '1px solid #1e1f22'
    },
    postHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    postHeaderLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: 1
    },
    pinnedIcon: {
        color: '#f0b232',
        fontSize: '16px'
    },
    postTitle: {
        margin: 0,
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600'
    },
    statusBadge: {
        backgroundColor: '#3ba55d',
        color: '#fff',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px'
    },
    postAuthor: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#b5bac1',
        fontSize: '13px'
    },
    avatar: {
        width: '24px',
        height: '24px',
        borderRadius: '50%'
    },
    tags: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        color: '#b5bac1',
        fontSize: '12px'
    },
    tag: {
        backgroundColor: '#5865f2',
        color: '#fff',
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '11px'
    },
    postStats: {
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        color: '#b5bac1',
        fontSize: '13px',
        marginBottom: '12px'
    },
    stat: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    statDate: {
        marginLeft: 'auto'
    },
    voteButtons: {
        display: 'flex',
        gap: '8px'
    },
    voteButton: {
        backgroundColor: '#383a40',
        border: 'none',
        color: '#b5bac1',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#b5bac1'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b5bac1'
    }
};

export default ForumChannel;


