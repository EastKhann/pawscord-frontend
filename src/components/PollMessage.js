// frontend/src/components/PollMessage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiBase } from '../utils/apiEndpoints';

const PollMessage = ({ poll, messageId, token, isMobile }) => {
    const [pollData, setPollData] = useState(poll);
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [isVoting, setIsVoting] = useState(false);

    useEffect(() => {
        // Check if user already voted
        const userVote = pollData.options?.find(opt =>
            opt.voters?.some(voter => voter.id === getCurrentUserId())
        );
        if (userVote) {
            setSelectedOption(userVote.id);
            setHasVoted(true);
        }
    }, [pollData]);

    const getCurrentUserId = () => {
        // Get user ID from localStorage or context
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        return userData.id;
    };

    const handleVote = async (optionId) => {
        if (hasVoted || isVoting) return;

        setIsVoting(true);
        try {
            const response = await axios.post(
                `${getApiBase()}/polls/${pollData.id}/vote/`,
                { option_id: optionId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPollData(response.data.poll);
            setSelectedOption(optionId);
            setHasVoted(true);
        } catch (error) {
            console.error('Vote failed:', error);
            toast.error('❌ Failed to vote. Please try again.');
        } finally {
            setIsVoting(false);
        }
    };

    const getTotalVotes = () => {
        return pollData.options?.reduce((sum, opt) => sum + (opt.vote_count || 0), 0) || 0;
    };

    const getPercentage = (voteCount) => {
        const total = getTotalVotes();
        return total > 0 ? Math.round((voteCount / total) * 100) : 0;
    };

    const styles = {
        pollContainer: {
            background: 'linear-gradient(135deg, rgba(30, 31, 34, 0.95), rgba(35, 36, 40, 0.95))',
            borderRadius: '12px',
            padding: isMobile ? '14px' : '18px',
            marginTop: '12px',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        },
        pollHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
        },
        pollIcon: {
            fontSize: '20px',
            filter: 'drop-shadow(0 0 6px rgba(88, 101, 242, 0.6))',
        },
        pollQuestion: {
            fontSize: isMobile ? '15px' : '16px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.95)',
            margin: 0,
        },
        optionsContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        optionButton: {
            position: 'relative',
            padding: '14px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            background: 'rgba(30, 31, 34, 0.6)',
            cursor: hasVoted ? 'default' : 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            minHeight: '44px', // Touch target
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        optionButtonHover: {
            transform: hasVoted ? 'none' : 'translateY(-2px)',
            borderColor: 'rgba(88, 101, 242, 0.6)',
            boxShadow: '0 4px 15px rgba(88, 101, 242, 0.3)',
        },
        optionProgress: (percentage, isSelected) => ({
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${percentage}%`,
            background: isSelected
                ? 'linear-gradient(90deg, rgba(88, 101, 242, 0.5), rgba(114, 137, 218, 0.5))'
                : 'rgba(88, 101, 242, 0.2)',
            transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: '8px',
        }),
        optionContent: {
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
        },
        optionText: {
            flex: 1,
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: isMobile ? '14px' : '15px',
            fontWeight: '500',
            textAlign: 'left',
        },
        optionStats: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        votePercentage: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: '600',
        },
        voteCount: {
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: isMobile ? '12px' : '13px',
        },
        checkmark: {
            fontSize: '18px',
            color: '#23a559',
        },
        pollFooter: {
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(88, 101, 242, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        totalVotes: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: isMobile ? '12px' : '13px',
        },
        endTime: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: isMobile ? '11px' : '12px',
        },
    };

    if (!pollData || !pollData.options) {
        return null;
    }

    return (
        <div style={styles.pollContainer}>
            {/* Header */}
            <div style={styles.pollHeader}>
                <span style={styles.pollIcon}>📊</span>
                <h3 style={styles.pollQuestion}>{pollData.question}</h3>
            </div>

            {/* Options */}
            <div style={styles.optionsContainer}>
                {pollData.options.map((option) => {
                    const isSelected = selectedOption === option.id;
                    const percentage = getPercentage(option.vote_count || 0);
                    const [isHovered, setIsHovered] = useState(false);

                    return (
                        <button
                            key={option.id}
                            onClick={() => handleVote(option.id)}
                            disabled={hasVoted || isVoting}
                            style={{
                                ...styles.optionButton,
                                ...(isHovered && !hasVoted ? styles.optionButtonHover : {}),
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Progress Bar */}
                            {hasVoted && (
                                <div style={styles.optionProgress(percentage, isSelected)} />
                            )}

                            {/* Content */}
                            <div style={styles.optionContent}>
                                <span style={styles.optionText}>{option.text}</span>

                                {hasVoted && (
                                    <div style={styles.optionStats}>
                                        <span style={styles.votePercentage}>{percentage}%</span>
                                        <span style={styles.voteCount}>
                                            ({option.vote_count || 0})
                                        </span>
                                        {isSelected && <span style={styles.checkmark}>✓</span>}
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Footer */}
            <div style={styles.pollFooter}>
                <span style={styles.totalVotes}>
                    {getTotalVotes()} {getTotalVotes() === 1 ? 'vote' : 'votes'}
                </span>
                {pollData.ends_at && (
                    <span style={styles.endTime}>
                        Ends: {new Date(pollData.ends_at).toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
    );
};

export default React.memo(PollMessage);



