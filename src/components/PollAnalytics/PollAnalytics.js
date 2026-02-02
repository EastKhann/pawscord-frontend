import React, { useState, useEffect, useMemo } from 'react';
import './PollAnalytics.css';

// Poll Analytics Component
const PollAnalytics = ({ poll, votes = [], showDetails = true }) => {
    const analytics = useMemo(() => {
        if (!poll || !votes.length) {
            return {
                totalVotes: 0,
                options: [],
                participationRate: 0,
                mostPopular: null,
                voteTimeline: []
            };
        }

        // Count votes per option
        const optionCounts = {};
        poll.options.forEach((opt, i) => {
            optionCounts[i] = {
                text: opt,
                count: 0,
                percentage: 0,
                voters: []
            };
        });

        votes.forEach(vote => {
            if (optionCounts[vote.optionIndex]) {
                optionCounts[vote.optionIndex].count++;
                optionCounts[vote.optionIndex].voters.push(vote.user);
            }
        });

        const totalVotes = votes.length;

        // Calculate percentages
        Object.values(optionCounts).forEach(opt => {
            opt.percentage = totalVotes > 0 ? (opt.count / totalVotes) * 100 : 0;
        });

        // Find most popular
        const options = Object.values(optionCounts);
        const mostPopular = options.reduce((a, b) => a.count > b.count ? a : b, options[0]);

        // Vote timeline (votes per hour)
        const timeline = [];
        if (votes.length > 0) {
            const sorted = [...votes].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            const startTime = new Date(sorted[0].timestamp);
            const endTime = new Date(sorted[sorted.length - 1].timestamp);

            let currentHour = new Date(startTime);
            currentHour.setMinutes(0, 0, 0);

            while (currentHour <= endTime) {
                const nextHour = new Date(currentHour.getTime() + 3600000);
                const count = votes.filter(v => {
                    const t = new Date(v.timestamp);
                    return t >= currentHour && t < nextHour;
                }).length;

                timeline.push({
                    time: currentHour.toISOString(),
                    label: currentHour.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                    count
                });

                currentHour = nextHour;
            }
        }

        return {
            totalVotes,
            options,
            participationRate: poll.eligibleVoters ? (totalVotes / poll.eligibleVoters) * 100 : 0,
            mostPopular,
            voteTimeline: timeline
        };
    }, [poll, votes]);

    if (!poll) {
        return <div className="poll-analytics empty">Anket verisi yok</div>;
    }

    return (
        <div className="poll-analytics">
            <div className="analytics-header">
                <h3>📊 Anket Sonuçları</h3>
                <span className="poll-title">{poll.question}</span>
            </div>

            {/* Summary Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-value">{analytics.totalVotes}</span>
                    <span className="stat-label">Toplam Oy</span>
                </div>
                {poll.eligibleVoters && (
                    <div className="stat-card">
                        <span className="stat-value">{analytics.participationRate.toFixed(1)}%</span>
                        <span className="stat-label">Katılım</span>
                    </div>
                )}
                <div className="stat-card">
                    <span className="stat-value">{poll.options.length}</span>
                    <span className="stat-label">Seçenek</span>
                </div>
            </div>

            {/* Results Chart */}
            <div className="results-chart">
                {analytics.options.map((option, index) => (
                    <ResultBar
                        key={index}
                        option={option}
                        isWinner={option === analytics.mostPopular && analytics.totalVotes > 0}
                        showVoters={showDetails}
                    />
                ))}
            </div>

            {/* Vote Timeline */}
            {showDetails && analytics.voteTimeline.length > 1 && (
                <div className="vote-timeline">
                    <h4>📈 Oy Zaman Çizelgesi</h4>
                    <div className="timeline-chart">
                        {analytics.voteTimeline.map((point, i) => {
                            const maxCount = Math.max(...analytics.voteTimeline.map(p => p.count), 1);
                            const height = (point.count / maxCount) * 100;
                            return (
                                <div
                                    key={i}
                                    className="timeline-bar"
                                    title={`${point.label}: ${point.count} oy`}
                                >
                                    <div
                                        className="bar-fill"
                                        style={{ height: `${Math.max(height, 5)}%` }}
                                    />
                                    <span className="bar-label">{point.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Pie Chart */}
            {analytics.totalVotes > 0 && (
                <div className="pie-chart-container">
                    <h4>🥧 Dağılım</h4>
                    <PieChart options={analytics.options} />
                </div>
            )}
        </div>
    );
};

// Result Bar Component
const ResultBar = ({ option, isWinner, showVoters }) => {
    const [showVoterList, setShowVoterList] = useState(false);

    return (
        <div className={`result-bar ${isWinner ? 'winner' : ''}`}>
            <div className="bar-header">
                <span className="option-text">
                    {isWinner && '👑 '}
                    {option.text}
                </span>
                <span className="vote-count">
                    {option.count} oy ({option.percentage.toFixed(1)}%)
                </span>
            </div>
            <div className="bar-track">
                <div
                    className="bar-fill"
                    style={{ width: `${option.percentage}%` }}
                />
            </div>
            {showVoters && option.voters.length > 0 && (
                <div className="voters-section">
                    <button
                        className="show-voters-btn"
                        onClick={() => setShowVoterList(!showVoterList)}
                    >
                        {showVoterList ? '▲ Gizle' : '▼ Oy verenleri göster'}
                    </button>
                    {showVoterList && (
                        <div className="voters-list">
                            {option.voters.slice(0, 10).map((voter, i) => (
                                <span key={i} className="voter-chip">
                                    {voter.username || voter.name || `User ${voter.id}`}
                                </span>
                            ))}
                            {option.voters.length > 10 && (
                                <span className="more-voters">
                                    +{option.voters.length - 10} kişi daha
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Simple Pie Chart using CSS
const PieChart = ({ options }) => {
    const colors = [
        '#5865f2', '#57f287', '#fee75c', '#ed4245', '#eb459e',
        '#9b59b6', '#3498db', '#1abc9c', '#e67e22', '#2ecc71'
    ];

    let cumulative = 0;
    const segments = options.map((opt, i) => {
        const start = cumulative;
        cumulative += opt.percentage;
        return {
            ...opt,
            color: colors[i % colors.length],
            start,
            end: cumulative
        };
    });

    // Create conic gradient
    const gradientStops = segments.map(seg =>
        `${seg.color} ${seg.start}% ${seg.end}%`
    ).join(', ');

    return (
        <div className="pie-chart-wrapper">
            <div
                className="pie-chart"
                style={{ background: `conic-gradient(${gradientStops})` }}
            />
            <div className="pie-legend">
                {segments.filter(s => s.percentage > 0).map((seg, i) => (
                    <div key={i} className="legend-item">
                        <span
                            className="legend-color"
                            style={{ background: seg.color }}
                        />
                        <span className="legend-text">{seg.text}</span>
                        <span className="legend-value">{seg.percentage.toFixed(1)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Poll Results Summary (for message preview)
export const PollResultsSummary = ({ poll, votes = [] }) => {
    const totalVotes = votes.length;

    if (totalVotes === 0) {
        return (
            <div className="poll-summary empty">
                Henüz oy verilmedi
            </div>
        );
    }

    // Find winning option
    const counts = {};
    votes.forEach(v => {
        counts[v.optionIndex] = (counts[v.optionIndex] || 0) + 1;
    });

    const winnerIndex = Object.entries(counts).reduce(
        (a, b) => b[1] > a[1] ? b : a,
        [0, 0]
    )[0];

    const winnerText = poll.options[winnerIndex];
    const winnerCount = counts[winnerIndex];
    const winnerPercent = ((winnerCount / totalVotes) * 100).toFixed(0);

    return (
        <div className="poll-summary">
            <div className="winner-badge">
                👑 {winnerText}
            </div>
            <div className="summary-stats">
                <span>{winnerPercent}%</span>
                <span>•</span>
                <span>{totalVotes} oy</span>
            </div>
        </div>
    );
};

// Export poll endpoint
export const exportPollResults = (poll, votes) => {
    const analytics = {
        question: poll.question,
        totalVotes: votes.length,
        options: poll.options.map((opt, i) => ({
            text: opt,
            votes: votes.filter(v => v.optionIndex === i).length
        })),
        exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(analytics, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poll_results_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
};

export default PollAnalytics;
