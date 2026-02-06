import React, { useState, useEffect, useRef } from 'react';
import './DMPanel.css';

// 🔧 FIX: Avatar URL helper function
const getFullAvatarUrl = (avatar) => {
  if (!avatar) return '/default-avatar.png';
  if (avatar.startsWith('http') || avatar.startsWith('blob:') || avatar.startsWith('data:')) {
    return avatar;
  }
  // Relatif URL'i tam URL'e çevir
  const baseUrl = import.meta.env.VITE_API_URL || window.location.origin;
  return `${baseUrl.replace(/\/$/, '')}/${avatar.replace(/^\//, '')}`;
};

const DMPanel = ({ currentUserId, onClose }) => {
  const [activeTab, setActiveTab] = useState('conversations'); // conversations, friends, pending
  const [conversations, setConversations] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendUsername, setFriendUsername] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // 🔥 Dosya yükleme için
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null); // 🔥 File input ref

  useEffect(() => {
    fetchConversations();
    fetchFriends();
    fetchPendingRequests();
  }, [currentUserId]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
      const interval = setInterval(() => fetchMessages(selectedConversation.id), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/dm/${currentUserId}/list/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/friends/${currentUserId}/list/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setFriends(data.friends || []);
      }
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/friends/${currentUserId}/requests/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setPendingRequests(data.requests || []);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/dm/${conversationId}/messages/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if ((!messageInput.trim() && !selectedFile) || !selectedConversation) return;

    try {
      const token = localStorage.getItem('access_token');

      // 🔥 Dosya varsa FormData kullan
      if (selectedFile) {
        const formData = new FormData();
        if (messageInput.trim()) {
          formData.append('content', messageInput);
        }
        formData.append('file', selectedFile);
        formData.append('conversation_id', selectedConversation.id);

        const response = await fetch(`/api/messages/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (response.ok) {
          setMessageInput('');
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
          fetchMessages(selectedConversation.id);
        } else {
          console.error('❌ Failed to send message with file');
        }
      } else {
        // Sadece text mesaj
        const response = await fetch(`/api/dm/${selectedConversation.id}/send/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: messageInput })
        });

        if (response.ok) {
          setMessageInput('');
          fetchMessages(selectedConversation.id);
        } else {
          console.error('❌ Failed to send message');
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const createConversation = async (userId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/dm/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Conversation created');
        setSelectedConversation(data.conversation);
        fetchConversations();
      } else {
        console.error('❌ Failed to create conversation');
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const sendFriendRequest = async () => {
    if (!friendUsername.trim()) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/friends/send-request/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: friendUsername })
      });

      if (response.ok) {
        console.log('✅ Friend request sent');
        setFriendUsername('');
        setShowAddFriend(false);
      } else {
        const data = await response.json();
        console.error('❌', data.error || 'Failed to send request');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/friends/accept/${requestId}/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        console.log('✅ Friend request accepted');
        fetchFriends();
        fetchPendingRequests();
      } else {
        console.error('❌ Failed to accept request');
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const rejectFriendRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/friends/reject/${requestId}/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        console.log('✅ Friend request rejected');
        fetchPendingRequests();
      } else {
        console.error('❌ Failed to reject request');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const removeFriend = async (friendId) => {
    if (!window.confirm('Remove this friend?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/friends/remove/${friendId}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        console.log('✅ Friend removed');
        fetchFriends();
      } else {
        console.error('❌ Failed to remove friend');
      }
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Delete this message?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`/api/dm/messages/${messageId}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        console.log('✅ Message deleted');
        fetchMessages(selectedConversation.id);
      } else {
        console.error('❌ Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="dm-panel-overlay" onClick={onClose}>
      <div className="dm-panel-modal" onClick={e => e.stopPropagation()}>
        <div className="dm-panel-header">
          <h2>💬 Direct Messages</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="dm-panel-content">
          <div className="dm-sidebar">
            <div className="dm-tabs">
              <button
                className={`dm-tab ${activeTab === 'conversations' ? 'active' : ''}`}
                onClick={() => setActiveTab('conversations')}
              >
                💬 Chats
                {conversations.length > 0 && <span className="tab-badge">{conversations.length}</span>}
              </button>
              <button
                className={`dm-tab ${activeTab === 'friends' ? 'active' : ''}`}
                onClick={() => setActiveTab('friends')}
              >
                👥 Friends
                {friends.length > 0 && <span className="tab-badge">{friends.length}</span>}
              </button>
              <button
                className={`dm-tab ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                ⏳ Pending
                {pendingRequests.length > 0 && <span className="tab-badge danger">{pendingRequests.length}</span>}
              </button>
            </div>

            <div className="dm-list">
              {activeTab === 'conversations' && (
                <>
                  <button className="add-friend-btn" onClick={() => setShowAddFriend(true)}>
                    ➕ New Conversation
                  </button>
                  {conversations.length === 0 ? (
                    <div className="empty-state-small">
                      <div className="empty-icon-small">💬</div>
                      <p>No conversations yet</p>
                    </div>
                  ) : (
                    conversations.map(conv => (
                      <div
                        key={conv.id}
                        className={`dm-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                        onClick={() => setSelectedConversation(conv)}
                      >
                        <img src={getFullAvatarUrl(conv.avatar)} alt="" className="dm-avatar" />
                        <div className="dm-item-info">
                          <div className="dm-item-name">{conv.username}</div>
                          <div className="dm-item-preview">{conv.last_message || 'Start conversation'}</div>
                        </div>
                        {conv.unread_count > 0 && (
                          <span className="unread-badge">{conv.unread_count}</span>
                        )}
                      </div>
                    ))
                  )}
                </>
              )}

              {activeTab === 'friends' && (
                <>
                  <button className="add-friend-btn" onClick={() => setShowAddFriend(true)}>
                    ➕ Add Friend
                  </button>
                  {friends.length === 0 ? (
                    <div className="empty-state-small">
                      <div className="empty-icon-small">👥</div>
                      <p>No friends yet</p>
                    </div>
                  ) : (
                    friends.map(friend => (
                      <div key={friend.id} className="dm-item">
                        <img src={getFullAvatarUrl(friend.avatar)} alt="" className="dm-avatar" />
                        <div className="dm-item-info">
                          <div className="dm-item-name">{friend.username}</div>
                          <div className={`status-indicator ${friend.online ? 'online' : 'offline'}`}>
                            {friend.online ? '🟢 Online' : '⚫ Offline'}
                          </div>
                        </div>
                        <div className="dm-item-actions">
                          <button
                            className="dm-action-btn message"
                            onClick={() => createConversation(friend.id)}
                            title="Send Message"
                          >
                            💬
                          </button>
                          <button
                            className="dm-action-btn remove"
                            onClick={() => removeFriend(friend.id)}
                            title="Remove Friend"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}

              {activeTab === 'pending' && (
                <>
                  {pendingRequests.length === 0 ? (
                    <div className="empty-state-small">
                      <div className="empty-icon-small">⏳</div>
                      <p>No pending requests</p>
                    </div>
                  ) : (
                    pendingRequests.map(request => (
                      <div key={request.id} className="dm-item request">
                        <img src={getFullAvatarUrl(request.avatar)} alt="" className="dm-avatar" />
                        <div className="dm-item-info">
                          <div className="dm-item-name">{request.username}</div>
                          <div className="request-type">
                            {request.type === 'incoming' ? '📩 Incoming' : '📤 Outgoing'}
                          </div>
                        </div>
                        {request.type === 'incoming' && (
                          <div className="dm-item-actions">
                            <button
                              className="dm-action-btn accept"
                              onClick={() => acceptFriendRequest(request.id)}
                              title="Accept"
                            >
                              ✓
                            </button>
                            <button
                              className="dm-action-btn reject"
                              onClick={() => rejectFriendRequest(request.id)}
                              title="Reject"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>

          <div className="dm-chat-area">
            {selectedConversation ? (
              <>
                <div className="dm-chat-header">
                  <img src={selectedConversation.avatar || '/default-avatar.png'} alt="" className="chat-avatar" />
                  <div className="chat-user-info">
                    <div className="chat-username">{selectedConversation.username}</div>
                    <div className="chat-status">
                      {selectedConversation.online ? '🟢 Online' : '⚫ Offline'}
                    </div>
                  </div>
                </div>

                <div className="dm-messages">
                  {messages.length === 0 ? (
                    <div className="empty-chat">
                      <div className="empty-chat-icon">💭</div>
                      <p>No messages yet. Say hi! 👋</p>
                    </div>
                  ) : (
                    messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`message ${msg.author_id === currentUserId || msg.username === localStorage.getItem('username') ? 'sent' : 'received'}`}
                      >
                        <img
                          src={msg.avatar || '/default-avatar.png'}
                          alt={msg.username || msg.author || 'User'}
                          className="message-avatar"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-avatar.png';
                          }}
                        />
                        <div className="message-content">
                          <div className="message-header">
                            <span className="message-author">{msg.username || msg.author}</span>
                            <span className="message-time">{formatTimestamp(msg.created_at || msg.timestamp)}</span>
                          </div>

                          {/* 🔥 Mesaj içeriği */}
                          {msg.content && <div className="message-text">{msg.content}</div>}

                          {/* 🔥 Resim attachment */}
                          {msg.image_url && (
                            <div className="message-image-wrapper">
                              <img
                                src={msg.image_url}
                                alt="Attachment"
                                className="message-image"
                                onClick={() => window.open(msg.image_url, '_blank')}
                                onError={(e) => {
                                  console.error('❌ Resim yüklenemedi:', msg.image_url);
                                  e.target.style.display = 'none';
                                }}
                                style={{
                                  maxWidth: '300px',
                                  maxHeight: '300px',
                                  borderRadius: '8px',
                                  marginTop: '8px',
                                  cursor: 'pointer'
                                }}
                              />
                            </div>
                          )}

                          {/* 🔥 Dosya attachment */}
                          {msg.file_url && !msg.image_url && (
                            <div className="message-file" style={{ marginTop: '8px' }}>
                              <a
                                href={msg.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '8px 12px',
                                  background: 'rgba(88, 101, 242, 0.1)',
                                  borderRadius: '8px',
                                  color: '#5865f2',
                                  textDecoration: 'none',
                                  fontSize: '14px'
                                }}
                              >
                                📎 {msg.file_name || 'Attachment'}
                              </a>
                            </div>
                          )}
                        </div>
                        {(msg.author_id === currentUserId || msg.username === localStorage.getItem('username')) && (
                          <button
                            className="message-delete"
                            onClick={() => deleteMessage(msg.id)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="dm-input-area">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    style={{ display: 'none' }}
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                  />
                  <button
                    className="file-upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                    title="Dosya ekle"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      fontSize: '20px',
                      cursor: 'pointer',
                      padding: '8px'
                    }}
                  >
                    📎
                  </button>
                  {selectedFile && (
                    <span style={{ fontSize: '12px', color: '#aaa', marginRight: '8px' }}>
                      {selectedFile.name}
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#f04747',
                          marginLeft: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder={`Message @${selectedConversation.username}...`}
                    className="message-input"
                  />
                  <button className="send-btn" onClick={sendMessage}>
                    📤
                  </button>
                </div>
              </>
            ) : (
              <div className="no-conversation-selected">
                <div className="no-conv-icon">💬</div>
                <h3>Select a conversation</h3>
                <p>Choose a friend to start chatting</p>
              </div>
            )}
          </div>
        </div>

        {/* Add Friend Modal */}
        {showAddFriend && (
          <div className="friend-modal-overlay" onClick={() => setShowAddFriend(false)}>
            <div className="friend-modal" onClick={e => e.stopPropagation()}>
              <h3>➕ Add Friend</h3>
              <p className="modal-description">Enter username to send friend request</p>

              <input
                type="text"
                value={friendUsername}
                onChange={(e) => setFriendUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendFriendRequest()}
                placeholder="Username#1234"
                className="friend-input"
                autoFocus
              />

              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowAddFriend(false)}>
                  Cancel
                </button>
                <button className="send-request-btn" onClick={sendFriendRequest}>
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DMPanel;
