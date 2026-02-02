import React, { useState, useEffect, useMemo } from 'react';
import './UserActivityGraph.css';

// GitHub-style activity graph component
const UserActivityGraph = ({
    userId,
    username,
    activityData = [],
    weeks = 52,
    onDayClick
}) => {
    const [hoveredDay, setHoveredDay] = useState(null);
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, data: null });

    // Generate calendar data for the past N weeks
    const calendarData = useMemo(() => {
        const today = new Date();
        const data = [];

        // Create a map of activity data by date
        const activityMap = new Map();
        activityData.forEach(item => {
            const date = new Date(item.date).toISOString().split('T')[0];
            activityMap.set(date, item);
        });

        // Generate days for the past N weeks
        const totalDays = weeks * 7;
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - totalDays + 1);

        // Adjust to start from Sunday
        const dayOfWeek = startDate.getDay();
        startDate.setDate(startDate.getDate() - dayOfWeek);

        for (let i = 0; i < totalDays + dayOfWeek; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);

            const dateStr = currentDate.toISOString().split('T')[0];
            const activity = activityMap.get(dateStr);

            data.push({
                date: currentDate,
                dateStr,
                count: activity?.count || 0,
                messages: activity?.messages || 0,
                reactions: activity?.reactions || 0,
                voiceMinutes: activity?.voiceMinutes || 0,
                level: getActivityLevel(activity?.count || 0)
            });
        }

        return data;
    }, [activityData, weeks]);

    // Split data into weeks
    const weeklyData = useMemo(() => {
        const weeks = [];
        for (let i = 0; i < calendarData.length; i += 7) {
            weeks.push(calendarData.slice(i, i + 7));
        }
        return weeks;
    }, [calendarData]);

    // Get activity level (0-4) based on count
    function getActivityLevel(count) {
        if (count === 0) return 0;
        if (count < 5) return 1;
        if (count < 15) return 2;
        if (count < 30) return 3;
        return 4;
    }

    const handleMouseEnter = (day, event) => {
        const rect = event.target.getBoundingClientRect();
        setTooltip({
            visible: true,
            x: rect.left + rect.width / 2,
            y: rect.top,
            data: day
        });
        setHoveredDay(day.dateStr);
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, data: null });
        setHoveredDay(null);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

    // Calculate month labels
    const monthLabels = useMemo(() => {
        const labels = [];
        let lastMonth = -1;

        weeklyData.forEach((week, weekIndex) => {
            const firstDay = week[0];
            if (firstDay) {
                const month = firstDay.date.getMonth();
                if (month !== lastMonth) {
                    labels.push({
                        month: months[month],
                        weekIndex
                    });
                    lastMonth = month;
                }
            }
        });

        return labels;
    }, [weeklyData]);

    // Calculate total stats
    const stats = useMemo(() => {
        return calendarData.reduce((acc, day) => {
            acc.totalMessages += day.messages;
            acc.totalReactions += day.reactions;
            acc.totalVoice += day.voiceMinutes;
            acc.activeDays += day.count > 0 ? 1 : 0;
            return acc;
        }, { totalMessages: 0, totalReactions: 0, totalVoice: 0, activeDays: 0 });
    }, [calendarData]);

    return (
        <div className="activity-graph-container">
            {username && (
                <div className="activity-header">
                    <h3>📊 {username}'ın Aktivite Grafiği</h3>
                    <span className="activity-period">Son {weeks} hafta</span>
                </div>
            )}

            <div className="activity-stats">
                <div className="stat-item">
                    <span className="stat-value">{stats.totalMessages.toLocaleString()}</span>
                    <span className="stat-label">Mesaj</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{stats.totalReactions.toLocaleString()}</span>
                    <span className="stat-label">Reaksiyon</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{Math.floor(stats.totalVoice / 60)}s {stats.totalVoice % 60}dk</span>
                    <span className="stat-label">Sesli</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{stats.activeDays}</span>
                    <span className="stat-label">Aktif Gün</span>
                </div>
            </div>

            <div className="graph-wrapper">
                {/* Month labels */}
                <div className="month-labels">
                    {monthLabels.map((label, i) => (
                        <span
                            key={i}
                            className="month-label"
                            style={{ gridColumn: label.weekIndex + 2 }}
                        >
                            {label.month}
                        </span>
                    ))}
                </div>

                <div className="graph-body">
                    {/* Day labels */}
                    <div className="day-labels">
                        {days.map((day, i) => (
                            <span key={i} className="day-label">
                                {i % 2 === 1 ? day : ''}
                            </span>
                        ))}
                    </div>

                    {/* Activity grid */}
                    <div className="activity-grid">
                        {weeklyData.map((week, weekIndex) => (
                            <div key={weekIndex} className="week-column">
                                {week.map((day, dayIndex) => (
                                    <div
                                        key={dayIndex}
                                        className={`day-cell level-${day.level} ${hoveredDay === day.dateStr ? 'hovered' : ''}`}
                                        onMouseEnter={(e) => handleMouseEnter(day, e)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => onDayClick?.(day)}
                                        title=""
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="activity-legend">
                <span>Az</span>
                <div className="legend-cells">
                    {[0, 1, 2, 3, 4].map(level => (
                        <div key={level} className={`legend-cell level-${level}`} />
                    ))}
                </div>
                <span>Çok</span>
            </div>

            {/* Tooltip */}
            {tooltip.visible && tooltip.data && (
                <div
                    className="activity-tooltip"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y - 10
                    }}
                >
                    <div className="tooltip-date">{formatDate(tooltip.data.date)}</div>
                    {tooltip.data.count > 0 ? (
                        <>
                            <div className="tooltip-stat">💬 {tooltip.data.messages} mesaj</div>
                            <div className="tooltip-stat">❤️ {tooltip.data.reactions} reaksiyon</div>
                            <div className="tooltip-stat">🎤 {tooltip.data.voiceMinutes} dk sesli</div>
                        </>
                    ) : (
                        <div className="tooltip-empty">Aktivite yok</div>
                    )}
                </div>
            )}
        </div>
    );
};

// Mini activity bar for profiles
export const MiniActivityBar = ({ activityData = [], days = 30 }) => {
    const barData = useMemo(() => {
        const today = new Date();
        const data = [];

        const activityMap = new Map();
        activityData.forEach(item => {
            const date = new Date(item.date).toISOString().split('T')[0];
            activityMap.set(date, item.count || 0);
        });

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            data.push(activityMap.get(dateStr) || 0);
        }

        return data;
    }, [activityData, days]);

    const maxCount = Math.max(...barData, 1);

    return (
        <div className="mini-activity-bar">
            {barData.map((count, i) => (
                <div
                    key={i}
                    className="mini-bar"
                    style={{
                        height: `${Math.max((count / maxCount) * 100, 5)}%`,
                        opacity: count === 0 ? 0.2 : 1
                    }}
                />
            ))}
        </div>
    );
};

// Activity streak counter
export const ActivityStreak = ({ activityData = [] }) => {
    const { currentStreak, longestStreak } = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const activitySet = new Set(
            activityData
                .filter(item => item.count > 0)
                .map(item => new Date(item.date).toISOString().split('T')[0])
        );

        let current = 0;
        let longest = 0;
        let tempStreak = 0;

        // Check backwards from today for current streak
        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            if (activitySet.has(dateStr)) {
                if (i === 0 || i === current + 1) {
                    current++;
                }
                tempStreak++;
            } else {
                longest = Math.max(longest, tempStreak);
                tempStreak = 0;
            }
        }
        longest = Math.max(longest, tempStreak);

        return { currentStreak: current, longestStreak: longest };
    }, [activityData]);

    return (
        <div className="activity-streak">
            <div className="streak-item current">
                <span className="streak-icon">🔥</span>
                <span className="streak-value">{currentStreak}</span>
                <span className="streak-label">Günlük Seri</span>
            </div>
            <div className="streak-item longest">
                <span className="streak-icon">🏆</span>
                <span className="streak-value">{longestStreak}</span>
                <span className="streak-label">En Uzun</span>
            </div>
        </div>
    );
};

export default UserActivityGraph;
