import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const ThreadView = ({ parentMessage, onClose, apiBaseUrl, token }) => {
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (parentMessage?.id) fetchReplies();
    }, [parentMessage?.id]);

    const fetchReplies = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiBaseUrl}/messages/${parentMessage.id}/thread/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setReplies(data.replies || []);
        } catch (error) {
            console.error('Thread fetch error:', error);
        }
        setLoading(false);
    };

    const handleSendReply = async () => {
        if (!newReply.trim()) return;

        try {
            const res = await fetch(`${apiBaseUrl}/messages/${parentMessage.id}/reply/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: newReply })
            });

            if (res.ok) {
                setNewReply('');
                fetchReplies();
            }
        } catch (error) {
            console.error('Reply error:', error);
        }
    };

    if (!parentMessage) return null;

    return (
        <div style={{
            position: 'fixed', right: 0, top: 0, bottom: 0, width: '420px',
            background: '#36393f', boxShadow: '-2px 0 8px rgba(0,0,0,0.4)',
            zIndex: 100, display: 'flex', flexDirection: 'column'
        }}>
            {/* Header */}
            <div style={{
                padding: '16px', borderBottom: '1px solid #202225',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <h3 style={{ margin: 0, color: '#fff' }}>💬 Thread</h3>
                <button onClick={onClose} style={{
                    background: 'transparent', border: 'none', color: '#fff',
                    cursor: 'pointer', fontSize: '18px'
                }}><FaTimes /></button>
            </div>

            {/* Parent Message */}
            <div style={{ padding: '16px', background: '#2f3136', borderBottom: '1px solid #202225' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ color: '#fff' }}>{parentMessage.username || parentMessage.sender?.username}</strong>
                    <span style={{ marginLeft: '8px', fontSize: '12px', color: '#72767d' }}>
                        {new Date(parentMessage.timestamp).toLocaleString('tr-TR')}
                    </span>
                </div>
                <p style={{ margin: 0, color: '#dcddde' }}>{parentMessage.content}</p>
                <small style={{ color: '#72767d', fontSize: '12px' }}>
                    {replies.length} yanıt
                </small>
            </div>

            {/* Replies */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', color: '#aaa', padding: '20px' }}>
                        Yükleniyor...
                    </div>
                ) : replies.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#aaa', padding: '20px' }}>
                        Henüz yanıt yok
                    </div>
                ) : (
                    replies.map(reply => (
                        <div key={reply.id} style={{
                            marginBottom: '16px', padding: '12px',
                            background: '#40444b', borderRadius: '8px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <strong style={{ color: '#fff' }}>{reply.username || reply.sender?.username}</strong>
                                <span style={{ marginLeft: '8px', fontSize: '12px', color: '#72767d' }}>
                                    {new Date(reply.timestamp).toLocaleString('tr-TR')}
                                </span>
                            </div>
                            <p style={{ margin: 0, color: '#dcddde' }}>{reply.content}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Reply Input */}
            <div style={{ padding: '16px', borderTop: '1px solid #202225' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        placeholder="Yanıt yaz..."
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                        style={{
                            flex: 1, padding: '10px', background: '#40444b',
                            border: 'none', borderRadius: '6px', color: '#fff'
                        }}
                    />
                    <button
                        onClick={handleSendReply}
                        disabled={!newReply.trim()}
                        style={{
                            padding: '10px 20px', background: newReply.trim() ? '#5865f2' : '#4f545c',
                            border: 'none', borderRadius: '6px', color: '#fff',
                            cursor: newReply.trim() ? 'pointer' : 'not-allowed',
                            fontWeight: 600
                        }}
                    >
                        Gönder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThreadView;


