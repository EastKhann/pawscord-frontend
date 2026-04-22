import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const S = {
    bg3: {
        flex: 1,
        padding: '10px',
        background: '#1e2024',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
    },
    bg2: {
        marginBottom: '16px',
        padding: '12px',
        background: '#1e2024',
        borderRadius: '8px',
    },
    bg: {
        background: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '18px',
    },
    flex2: {
        padding: '16px',
        borderBottom: '1px solid #0b0e1b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flex: {
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '420px',
        background: '#17191c',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.4)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
    },
};

const ThreadView = ({ parentMessage, onClose, apiBaseUrl, token }) => {
    const { t } = useTranslation();
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
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setReplies(data.replies || []);
        } catch (error) {
            logger.error('Thread fetch error:', error);
        }
        setLoading(false);
    };

    const handleSendReply = async () => {
        if (!newReply.trim()) return;

        try {
            const res = await fetch(`${apiBaseUrl}/messages/${parentMessage.id}/reply/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newReply }),
            });

            if (res.ok) {
                setNewReply('');
                fetchReplies();
            }
        } catch (error) {
            logger.error('Reply error:', error);
        }
    };

    if (!parentMessage) return null;

    return (
        <div style={S.flex}>
            {/* Header */}
            <div style={S.flex2}>
                <h3 className="text-white-m0">💬 {t('thread.title')}</h3>
                <button aria-label={t('common.close', 'Close')} onClick={onClose} style={S.bg}>
                    <FaTimes />
                </button>
            </div>

            {/* Parent Message */}
            <div className="dark-panel-header">
                <div className="flex-align-mb8">
                    <strong className="text-white">
                        {parentMessage.username || parentMessage.sender?.username}
                    </strong>
                    <span className="muted-ml8">
                        {new Date(parentMessage.timestamp).toLocaleString('tr-TR')}
                    </span>
                </div>
                <p className="text-dbd-m0">{parentMessage.content}</p>
                <small className="text-949-12">
                    {replies.length} {t('thread.replies')}
                </small>
            </div>

            {/* Replies */}
            <div className="flex-1-ov">
                {loading ? (
                    <div className="text-aaa-center">{t('common.loading')}</div>
                ) : replies.length === 0 ? (
                    <div className="text-aaa-center">{t('thread.noReplies')}</div>
                ) : (
                    replies.map((reply) => (
                        <div key={reply.id} style={S.bg2}>
                            <div className="flex-align-mb8">
                                <strong className="text-white">
                                    {reply.username || reply.sender?.username}
                                </strong>
                                <span className="muted-ml8">
                                    {new Date(reply.timestamp).toLocaleString('tr-TR')}
                                </span>
                            </div>
                            <p className="text-dbd-m0">{reply.content}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Reply Input */}
            <div className="dark-panel-footer">
                <div className="flex-gap-8">
                    <input
                        type="text"
                        placeholder={t('ui.yanit_yaz')}
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                        style={S.bg3}
                    />
                    <button
                        aria-label={t('common.send')}
                        onClick={handleSendReply}
                        disabled={!newReply.trim()}
                        style={{
                            padding: '10px 20px',
                            background: newReply.trim() ? '#5865f2' : '#4e5058',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#fff',
                            cursor: newReply.trim() ? 'pointer' : 'not-allowed',
                            fontWeight: 600,
                        }}
                    >
                        {t('common.send')}
                    </button>
                </div>
            </div>
        </div>
    );
};

ThreadView.propTypes = {
    parentMessage: PropTypes.object,
    onClose: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    token: PropTypes.string,
};
export default memo(ThreadView);
