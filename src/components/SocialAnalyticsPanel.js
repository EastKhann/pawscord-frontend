import React, { useState, useEffect } from 'react';
import { socialAnalyticsApi } from '../services/niceToHaveApi';
import './SocialAnalyticsPanel.css';

function SocialAnalyticsPanel({ onClose }) {
    const [stats, setStats] = useState(null);
    const [days, setDays] = useState(30);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, [days]);

    const loadStats = async () => {
        setLoading(true);
        try {
            const data = await socialAnalyticsApi.getStats(days);
            setStats(data);
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="social-analytics-panel">
                <h2>📊 Social Analytics</h2>
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="social-analytics-panel">
            <h2>📊 Social Analytics</h2>

            <div className="time-range-selector">
                {[7, 14, 30, 90].map(d => (
                    <button
                        key={d}
                        className={days === d ? 'active' : ''}
                        onClick={() => setDays(d)}
                    >
                        {d} Days
                    </button>
                ))}
            </div>

            {stats?.totals && (
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-icon">💬</div>
                        <div className="stat-value">{stats.totals.messages_sent.toLocaleString()}</div>
                        <div className="stat-label">Messages Sent</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">👍</div>
                        <div className="stat-value">{stats.totals.reactions_given.toLocaleString()}</div>
                        <div className="stat-label">Reactions Given</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">❤️</div>
                        <div className="stat-value">{stats.totals.reactions_received.toLocaleString()}</div>
                        <div className="stat-label">Reactions Received</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🎤</div>
                        <div className="stat-value">{Math.round(stats.totals.voice_minutes / 60)}h</div>
                        <div className="stat-label">Voice Time</div>
                    </div>
                </div>
            )}

            {stats?.stats?.length > 0 && (
                <div className="activity-chart">
                    <h3>Daily Activity</h3>
                    <div className="chart-bars">
                        {stats.stats.slice(-14).map((day, idx) => {
                            const max = Math.max(...stats.stats.map(s => s.messages_sent)) || 1;
                            const height = (day.messages_sent / max) * 100;
                            return (
                                <div key={idx} className="chart-bar-wrapper">
                                    <div
                                        className="chart-bar"
                                        style={{ height: `${height}%` }}
                                        title={`${day.messages_sent} messages`}
                                    />
                                    <div className="chart-label">
                                        {new Date(day.date).toLocaleDateString('en', { day: 'numeric' })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="stats-insights">
                <h3>📈 Insights</h3>
                <div className="insight-item">
                    <span className="insight-label">Average messages/day</span>
                    <span className="insight-value">
                        {stats?.totals ? Math.round(stats.totals.messages_sent / days) : 0}
                    </span>
                </div>
                <div className="insight-item">
                    <span className="insight-label">Reaction ratio (received/given)</span>
                    <span className="insight-value">
                        {stats?.totals && stats.totals.reactions_given > 0
                            ? (stats.totals.reactions_received / stats.totals.reactions_given).toFixed(2)
                            : 'N/A'}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SocialAnalyticsPanel;
