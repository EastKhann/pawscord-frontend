// components/MessageThreads.js
// 💬 Message Threads - Discord-style conversation threads

import { useState, useEffect } from 'react';
import { FaComments, FaTimes, FaReply, FaPaperPlane } from 'react-icons/fa';
import './MessageThread.css';

const MessageThread = ({
  parentMessage,
  onClose,
  onSendReply,
  fetchWithAuth,
  apiBaseUrl,
  currentUser
}) => {
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadThreadReplies();
  }, [parentMessage.id]);

  const loadThreadReplies = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/${parentMessage.id}/thread/`);
      if (response.ok) {
        const data = await response.json();
        setReplies(data.replies || []);
      }
    } catch (error) {
      console.error('Thread yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || sending) return;

    setSending(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/${parentMessage.id}/thread/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyText })
      });

      if (response.ok) {
        const newReply = await response.json();
        setReplies([...replies, newReply]);
        setReplyText('');
        onSendReply?.(newReply);
      }
    } catch (error) {
      console.error('Cevap gönderilemedi:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="thread-panel">
      {/* Header */}
      <div className="thread-header">
        <div className="thread-title">
          <FaComments /> Thread
        </div>
        <button className="thread-close" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      {/* Parent Message */}
      <div className="thread-parent">
        <div className="parent-user">{parentMessage.username}</div>
        <div className="parent-content">{parentMessage.content}</div>
        <div className="parent-meta">
          {new Date(parentMessage.timestamp).toLocaleString('tr-TR')}
        </div>
      </div>

      {/* Replies */}
      <div className="thread-replies">
        {loading ? (
          <div className="thread-loading">Yükleniyor...</div>
        ) : replies.length > 0 ? (
          replies.map((reply, index) => (
            <div key={reply.id || index} className="thread-reply">
              <div className="reply-user">{reply.username}</div>
              <div className="reply-content">{reply.content}</div>
              <div className="reply-meta">
                {new Date(reply.timestamp || reply.created_at).toLocaleString('tr-TR')}
              </div>
            </div>
          ))
        ) : (
          <div className="thread-empty">
            <FaComments size={48} />
            <p>Henüz cevap yok</p>
            <small>İlk cevabı sen yaz!</small>
          </div>
        )}
      </div>

      {/* Reply Input */}
      <form className="thread-input" onSubmit={handleSendReply}>
        <input
          type="text"
          placeholder="Thread'e cevap yaz..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          disabled={sending}
        />
        <button type="submit" disabled={!replyText.trim() || sending}>
          {sending ? '...' : <FaPaperPlane />}
        </button>
      </form>

      {/* Reply Count Badge */}
      {replies.length > 0 && (
        <div className="thread-count-badge">
          {replies.length} cevap
        </div>
      )}
    </div>
  );
};

export const ThreadPreview = ({ message, onClick }) => {
  const replyCount = message.thread_reply_count || 0;

  if (replyCount === 0) return null;

  return (
    <div className="thread-preview" onClick={onClick}>
      <FaComments /> {replyCount} cevap
    </div>
  );
};

export default MessageThread;



