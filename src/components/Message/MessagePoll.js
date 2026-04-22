// frontend/src/components/Message/MessagePoll.js
// 📊 MESSAGE POLL - Poll display and voting

import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';


const S = {
    txt2: { fontSize: '0.75em', color: '#949ba4', marginTop: 5 },
    font: { zIndex: 3, fontWeight: 'bold' },
    zIndex: { zIndex: 3, textShadow: '0 1px 2px rgba(0,0,0,0.5)' },
    rel: { position: 'relative', marginBottom: 6 },
    txt: { fontSize: '0.8em', color: '#b5bac1', marginBottom: 8 },
    mar: { marginTop: 0, marginBottom: 10 },
};

export const MessagePoll = memo(({
    poll,
    onVote,
    fetchWithAuth,
    absoluteHostUrl
}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    if (!poll) return null;

    const handleVote = useCallback(async (optionId) => {
        try {
            await fetchWithAuth(`${absoluteHostUrl}/api/polls/${poll.id}/vote/`, {
                method: 'POST',
                body: JSON.stringify({ option_id: optionId })
            });
        } catch (error) {
            logger.error('Vote error:', error);
        }
    }, [poll.id, fetchWithAuth, absoluteHostUrl]);

    return (
        <div style={styles.pollContainer}>
            <h4 style={S.mar}>{poll.question}</h4>
            <div style={S.txt}>
                {poll.allow_multiple_votes ? 'Multiple Choice' : 'Single Choice'} • {poll.total_votes || 0} Votes
            </div>

            {poll.options.map(opt => {
                const voted = opt.is_voted;
                const total = poll.total_votes || 0;
                const percent = total > 0 ? Math.round((opt.vote_count / total) * 100) : 0;

                return (
                    <div key={opt.id} style={S.rel}>
                        <button
                            aria-label={t('polls.vote', 'Vote for option')}
                            onClick={() => handleVote(opt.id)}
                            style={{
                                ...styles.pollOption,
                                backgroundColor: voted ? '#4752c4' : 'rgba(255,255,255,0.05)',
                                border: voted ? '1px solid #5865f2' : '1px solid transparent',
                            }}
                        >
                            <span style={S.zIndex}>
                                {opt.text}
                            </span>
                            <span style={S.font}>
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
            })}>

            {poll.expires_at && (
                <div style={S.txt2}>
                    Ends: {new Date(poll.expires_at).toLocaleString()}
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
MessagePoll.propTypes = {
    poll: PropTypes.object,
    onVote: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    absoluteHostUrl: PropTypes.string,
};
export default MessagePoll;