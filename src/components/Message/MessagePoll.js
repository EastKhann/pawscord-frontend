// frontend/src/components/Message/MessagePoll.js
// 📊 MESSAGE POLL - Poll display and voting

import { memo, useCallback } from 'react';

export const MessagePoll = memo(({
    poll,
    onVote,
    fetchWithAuth,
    absoluteHostUrl
}) => {
    if (!poll) return null;

    const handleVote = useCallback(async (optionId) => {
        try {
            await fetchWithAuth(`${absoluteHostUrl}/api/polls/${poll.id}/vote/`, {
                method: 'POST',
                body: JSON.stringify({ option_id: optionId })
            });
        } catch (error) {
            console.error("Oy hatası:", error);
        }
    }, [poll.id, fetchWithAuth, absoluteHostUrl]);

    return (
        <div style={styles.pollContainer}>
            <h4 style={{ marginTop: 0, marginBottom: 10 }}>{poll.question}</h4>
            <div style={{ fontSize: '0.8em', color: '#b9bbbe', marginBottom: 8 }}>
                {poll.allow_multiple_votes ? 'Çoklu Seçim' : 'Tek Seçim'} • {poll.total_votes || 0} Oy
            </div>

            {poll.options.map(opt => {
                const voted = opt.is_voted;
                const total = poll.total_votes || 0;
                const percent = total > 0 ? Math.round((opt.vote_count / total) * 100) : 0;

                return (
                    <div key={opt.id} style={{ position: 'relative', marginBottom: 6 }}>
                        <button
                            onClick={() => handleVote(opt.id)}
                            style={{
                                ...styles.pollOption,
                                backgroundColor: voted ? '#4752c4' : 'rgba(255,255,255,0.05)',
                                border: voted ? '1px solid #5865f2' : '1px solid transparent',
                            }}
                        >
                            <span style={{ zIndex: 3, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                                {opt.text}
                            </span>
                            <span style={{ zIndex: 3, fontWeight: 'bold' }}>
                                {opt.vote_count} ({percent}%)
                            </span>

                            {/* Progress Bar Background */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, bottom: 0,
                                width: `${percent}%`,
                                backgroundColor: voted ? 'rgba(255,255,255,0.2)' : 'rgba(88, 101, 242, 0.3)',
                                zIndex: 1,
                                transition: 'width 0.3s ease'
                            }} />
                        </button>
                    </div>
                );
            })}

            {poll.expires_at && (
                <div style={{ fontSize: '0.75em', color: '#72767d', marginTop: 5 }}>
                    Bitiş: {new Date(poll.expires_at).toLocaleString()}
                </div>
            )}
        </div>
    );
});

const styles = {
    pollContainer: {
        marginTop: '10px',
        padding: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    pollOption: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '10px 12px',
        margin: '6px 0',
        border: 'none',
        borderRadius: '6px',
        color: 'white',
        cursor: 'pointer',
        textAlign: 'left',
        backgroundColor: 'rgba(255,255,255,0.05)',
        transition: 'background 0.2s',
        position: 'relative',
        overflow: 'hidden'
    }
};

MessagePoll.displayName = 'MessagePoll';
export default MessagePoll;
