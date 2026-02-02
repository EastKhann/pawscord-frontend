import React, { useState, useEffect } from 'react';
import {
    FaComments, FaTimes, FaPlus, FaSearch, FaTag, FaThumbtack,
    FaArchive, FaCheckCircle, FaReply, FaThumbsUp, FaThumbsDown,
    FaEllipsisV, FaClock, FaUser, FaFire, FaLock, FaUnlock
} from 'react-icons/fa';
import './ForumChannelManagementPanel.css';
import { getApiBase } from '../utils/apiEndpoints';

const ForumChannelManagementPanel = ({ serverId, channelId, onClose, fetchWithAuth }) => {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('posts');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [sortBy, setSortBy] = useState('recent');
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const apiBaseUrl = getApiBase();

    // Varsayılan tag renkleri
    const defaultTags = [
        { id: 1, name: 'Bug Report', color: '#f44336', count: 0 },
        { id: 2, name: 'Feature Request', color: '#2196f3', count: 0 },
        { id: 3, name: 'Discussion', color: '#9c27b0', count: 0 },
        { id: 4, name: 'Question', color: '#ff9800', count: 0 },
        { id: 5, name: 'Solved', color: '#4caf50', count: 0 },
        { id: 6, name: 'Announcement', color: '#e91e63', count: 0 }
    ];

    useEffect(() => {
        loadData();
    }, [serverId, channelId]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (fetchWithAuth && channelId) {
                const response = await fetchWithAuth(`${apiBaseUrl}/forums/${channelId}/posts/`);
                if (response.ok) {
                    const data = await response.json();
                    // Backend'den gelen postları normalize et
                    const normalizedPosts = (data.posts || data || []).map(post => ({
                        id: post.id,
                        title: post.title,
                        author: { username: post.author_username || post.author?.username || 'Anonymous', avatar: post.author_avatar || null },
                        tags: post.tags || [],
                        replies: post.reply_count || post.replies || 0,
                        votes: post.vote_count || post.votes || 0,
                        views: post.view_count || post.views || 0,
                        created_at: post.created_at,
                        last_activity: post.last_activity || post.updated_at || post.created_at,
                        is_pinned: post.is_pinned || false,
                        is_locked: post.is_locked || false,
                        is_solved: post.is_solved || false,
                        preview: post.content?.substring(0, 100) || post.preview || ''
                    }));
                    setPosts(normalizedPosts);
                    setTags(data.tags || defaultTags);
                } else {
                    // API hatası - boş liste göster
                    setPosts([]);
                    setTags(defaultTags);
                }
            } else {
                setPosts([]);
                setTags(defaultTags);
            }
        } catch (error) {
            console.error('Error loading forum data:', error);
            setPosts([]);
            setTags(defaultTags);
        }
        setLoading(false);
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'hot':
                return b.votes - a.votes;
            case 'top':
                return b.replies - a.replies;
            case 'recent':
            default:
                return new Date(b.last_activity) - new Date(a.last_activity);
        }
    });

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const handlePinPost = (postId) => {
        setPosts(posts.map(p =>
            p.id === postId ? { ...p, is_pinned: !p.is_pinned } : p
        ));
    };

    const handleLockPost = (postId) => {
        setPosts(posts.map(p =>
            p.id === postId ? { ...p, is_locked: !p.is_locked } : p
        ));
    };

    const handleMarkSolved = (postId) => {
        setPosts(posts.map(p =>
            p.id === postId ? { ...p, is_solved: !p.is_solved } : p
        ));
    };

    if (loading) {
        return (
            <div className="forum-overlay" onClick={onClose}>
                <div className="forum-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading forum...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="forum-overlay" onClick={onClose}>
            <div className="forum-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaComments />
                            Forum Management
                        </h2>
                        <span className="subtitle">Manage forum posts and discussions</span>
                    </div>
                    <div className="header-actions">
                        <button className="new-post-btn" onClick={() => setShowNewPostModal(true)}>
                            <FaPlus /> New Post
                        </button>
                        <button className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs-bar">
                    <div className="tabs">
                        <button
                            className={activeTab === 'posts' ? 'active' : ''}
                            onClick={() => setActiveTab('posts')}
                        >
                            Posts ({posts.length})
                        </button>
                        <button
                            className={activeTab === 'tags' ? 'active' : ''}
                            onClick={() => setActiveTab('tags')}
                        >
                            Tags ({tags.length})
                        </button>
                        <button
                            className={activeTab === 'settings' ? 'active' : ''}
                            onClick={() => setActiveTab('settings')}
                        >
                            Settings
                        </button>
                    </div>
                </div>

                <div className="content">
                    {activeTab === 'posts' && (
                        <>
                            {/* Search & Filter Bar */}
                            <div className="filter-bar">
                                <div className="search-box">
                                    <FaSearch />
                                    <input
                                        type="text"
                                        placeholder="Search posts..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="sort-select">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="recent">Most Recent</option>
                                        <option value="hot">Most Votes</option>
                                        <option value="top">Most Replies</option>
                                    </select>
                                </div>
                            </div>

                            {/* Tags Filter */}
                            <div className="tags-filter">
                                <button
                                    className={!selectedTag ? 'active' : ''}
                                    onClick={() => setSelectedTag(null)}
                                >
                                    All
                                </button>
                                {tags.map(tag => (
                                    <button
                                        key={tag.id}
                                        className={selectedTag === tag.name ? 'active' : ''}
                                        onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
                                        style={{ '--tag-color': tag.color }}
                                    >
                                        {tag.name} ({tag.count})
                                    </button>
                                ))}
                            </div>

                            {/* Posts List */}
                            <div className="posts-list">
                                {filteredPosts.map(post => (
                                    <div
                                        key={post.id}
                                        className={`post-item ${post.is_pinned ? 'pinned' : ''}`}
                                    >
                                        <div className="post-votes">
                                            <button className="vote-btn"><FaThumbsUp /></button>
                                            <span className="vote-count">{post.votes}</span>
                                            <button className="vote-btn"><FaThumbsDown /></button>
                                        </div>
                                        <div className="post-content">
                                            <div className="post-header">
                                                {post.is_pinned && <FaThumbtack className="pin-icon" />}
                                                {post.is_locked && <FaLock className="lock-icon" />}
                                                {post.is_solved && <FaCheckCircle className="solved-icon" />}
                                                <h3 className="post-title">{post.title}</h3>
                                            </div>
                                            <p className="post-preview">{post.preview}</p>
                                            <div className="post-meta">
                                                <div className="post-tags">
                                                    {post.tags.map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="tag"
                                                            style={{ '--tag-color': tags.find(t => t.name === tag)?.color }}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="post-stats">
                                                    <span><FaUser /> {post.author.username}</span>
                                                    <span><FaReply /> {post.replies}</span>
                                                    <span><FaClock /> {formatTime(post.last_activity)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-actions">
                                            <button
                                                className={`action-btn ${post.is_pinned ? 'active' : ''}`}
                                                onClick={() => handlePinPost(post.id)}
                                                title="Pin/Unpin"
                                            >
                                                <FaThumbtack />
                                            </button>
                                            <button
                                                className={`action-btn ${post.is_locked ? 'active' : ''}`}
                                                onClick={() => handleLockPost(post.id)}
                                                title="Lock/Unlock"
                                            >
                                                {post.is_locked ? <FaLock /> : <FaUnlock />}
                                            </button>
                                            <button
                                                className={`action-btn ${post.is_solved ? 'active' : ''}`}
                                                onClick={() => handleMarkSolved(post.id)}
                                                title="Mark Solved"
                                            >
                                                <FaCheckCircle />
                                            </button>
                                            <button className="action-btn" title="Archive">
                                                <FaArchive />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'tags' && (
                        <div className="tags-tab">
                            <div className="tags-header">
                                <h3>Manage Tags</h3>
                                <button className="add-tag-btn">
                                    <FaPlus /> Add Tag
                                </button>
                            </div>
                            <div className="tags-list">
                                {tags.map(tag => (
                                    <div key={tag.id} className="tag-item">
                                        <div
                                            className="tag-color"
                                            style={{ background: tag.color }}
                                        ></div>
                                        <span className="tag-name">{tag.name}</span>
                                        <span className="tag-count">{tag.count} posts</span>
                                        <div className="tag-actions">
                                            <button>Edit</button>
                                            <button className="delete">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="settings-tab">
                            <div className="setting-group">
                                <h3>Forum Settings</h3>
                                <div className="setting-item">
                                    <label>Default Sort</label>
                                    <select>
                                        <option value="recent">Most Recent</option>
                                        <option value="hot">Hot</option>
                                        <option value="top">Top</option>
                                    </select>
                                </div>
                                <div className="setting-item">
                                    <label>Require Tag</label>
                                    <input type="checkbox" defaultChecked />
                                </div>
                                <div className="setting-item">
                                    <label>Post Cooldown (minutes)</label>
                                    <input type="number" defaultValue={5} min={0} />
                                </div>
                                <div className="setting-item">
                                    <label>Auto-archive Solved Posts (days)</label>
                                    <input type="number" defaultValue={30} min={0} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForumChannelManagementPanel;
