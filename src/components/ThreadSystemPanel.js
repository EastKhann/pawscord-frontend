import React, { useState, useEffect } from 'react';
import './ThreadSystemPanel.css';
import { FaComments, FaPlus, FaBell, FaBellSlash, FaUsers, FaReply } from 'react-icons/fa';

function ThreadSystemPanel({ apiBaseUrl, fetchWithAuth, currentMessageId }) {
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [threadMessages, setThreadMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [subscriptions, setSubscriptions] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadThreads();
    loadSubscriptions();
  }, []);

  const loadThreads = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/threads/list/`);
      if (response.ok) {
        const data = await response.json();
        setThreads(data.threads || []);
      }
    } catch (err) {
      console.error('Error loading threads:', err);
    }
  };

  const loadSubscriptions = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/threads/subscriptions/`);
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(new Set(data.thread_ids || []));
      }
    } catch (err) {
      console.error('Error loading subscriptions:', err);
    }
  };

  const createThread = async () => {
    if (!currentMessageId) {
      setError('Select a message to create thread from');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/adv/create-thread/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: currentMessageId })
      });

      if (response.ok) {
        const data = await response.json();
        loadThreads();
        setCurrentThread(data.thread);
        setError('');
      }
    } catch (err) {
      setError('Failed to create thread: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadThreadMessages = async (threadId) => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/${threadId}/thread/`);
      if (response.ok) {
        const data = await response.json();
        setThreadMessages(data.messages || []);
      }
    } catch (err) {
      setError('Failed to load thread messages: ' + err.message);
    }
  };

  const toggleSubscription = async (threadId) => {
    try {
      const isSubscribed = subscriptions.has(threadId);
      const url = isSubscribed 
        ? `${apiBaseUrl}/threads/unsubscribe/`
        : `${apiBaseUrl}/threads/subscribe/`;

      const response = await fetchWithAuth(url, {
        method: isSubscribed ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thread_id: threadId })
      });

      if (response.ok) {
        const newSubs = new Set(subscriptions);
        if (isSubscribed) {
          newSubs.delete(threadId);
        } else {
          newSubs.add(threadId);
        }
        setSubscriptions(newSubs);
      }
    } catch (err) {
      setError('Failed to update subscription: ' + err.message);
    }
  };

  const viewThread = (thread) => {
    setCurrentThread(thread);
    loadThreadMessages(thread.id);
  };

  return (
    <div className="thread-system-panel">
      <div className="thread-header">
        <h2><FaComments /> Threads</h2>
        <button className="create-thread-btn" onClick={createThread} disabled={loading || !currentMessageId}>
          <FaPlus /> Create Thread
        </button>
      </div>

      {error && <div className="thread-error">{error}</div>}

      <div className="thread-content">
        <div className="threads-list">
          <h3>Active Threads</h3>
          {threads.length === 0 ? (
            <div className="empty-threads">
              <FaComments className="empty-icon" />
              <p>No threads yet</p>
            </div>
          ) : (
            threads.map(thread => (
              <div 
                key={thread.id} 
                className={`thread-item ${currentThread?.id === thread.id ? 'active' : ''}`}
                onClick={() => viewThread(thread)}
              >
                <div className="thread-info">
                  <div className="thread-title">{thread.title || 'Untitled Thread'}</div>
                  <div className="thread-meta">
                    <FaUsers /> {thread.participant_count} participants
                    <span className="thread-messages">{thread.message_count} messages</span>
                  </div>
                </div>
                <button
                  className={`subscribe-btn ${subscriptions.has(thread.id) ? 'subscribed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubscription(thread.id);
                  }}
                >
                  {subscriptions.has(thread.id) ? <FaBellSlash /> : <FaBell />}
                </button>
              </div>
            ))
          )}
        </div>

        {currentThread && (
          <div className="thread-view">
            <div className="thread-view-header">
              <h3>{currentThread.title || 'Thread'}</h3>
              <span className="thread-participants">
                <FaUsers /> {currentThread.participant_count} participants
              </span>
            </div>
            <div className="thread-messages">
              {threadMessages.map((msg, idx) => (
                <div key={idx} className="thread-message">
                  <img src={msg.author_avatar} alt={msg.author} className="msg-avatar" />
                  <div className="msg-content">
                    <div className="msg-header">
                      <span className="msg-author">{msg.author}</span>
                      <span className="msg-time">{new Date(msg.created_at).toLocaleTimeString()}</span>
                    </div>
                    <div className="msg-text">{msg.content}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="thread-reply">
              <input
                type="text"
                placeholder="Reply to thread..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="reply-input"
              />
              <button className="send-btn">
                <FaReply /> Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThreadSystemPanel;
