import React, { useState, useEffect } from 'react';
import {
    FaChartLine, FaTimes, FaSearch, FaFilter, FaCalendar,
    FaComments, FaMicrophone, FaSmile, FaClock, FaArrowUp,
    FaArrowDown, FaUser, FaMedal, FaDownload, FaSortAmountDown
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './MemberActivityDashboard.css';

const MemberActivityDashboard = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('messages');
    const [sortOrder, setSortOrder] = useState('desc');
    const [timeRange, setTimeRange] = useState('week');
    const [selectedMember, setSelectedMember] = useState(null);
    const [serverStats, setServerStats] = useState(null);

    useEffect(() => {
        loadData();
    }, [serverId, timeRange]);

    const loadData = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/member-activity/?range=${timeRange}`);
                if (response.ok) {
                    const data = await response.json();
                    setServerStats({
                        total_messages: data.total_messages || data.total_members || 0,
                        total_voice_minutes: data.total_voice_minutes || 0,
                        total_reactions: data.total_reactions || 0,
                        active_members: data.active_this_week || data.active_members || 0,
                        message_trend: data.activity_rate || data.message_trend || 0,
                        voice_trend: data.voice_trend || 0,
                        reaction_trend: data.reaction_trend || 0
                    });
                    const membersData = (data.top_members || data.members || []).map((m, i) => ({
                        id: m.id || i + 1,
                        username: m.sender__user__username || m.username || 'Unknown',
                        avatar: m.avatar || null,
                        stats: {
                            messages: m.message_count || m.messages || 0,
                            voice_minutes: m.voice_minutes || 0,
                            reactions_given: m.reactions_given || 0,
                            reactions_received: m.reactions_received || 0,
                            last_active: m.last_active || new Date().toISOString(),
                            trend: m.trend || 'stable'
                        },
                        activity_history: m.activity_history || [0, 0, 0, 0, 0, 0, 0]
                    }));
                    setMembers(membersData);
                } else {
                    setServerStats({ total_messages: 0, total_voice_minutes: 0, total_reactions: 0, active_members: 0, message_trend: 0, voice_trend: 0, reaction_trend: 0 });
                    setMembers([]);
                }
            } else {
                setServerStats({ total_messages: 0, total_voice_minutes: 0, total_reactions: 0, active_members: 0, message_trend: 0, voice_trend: 0, reaction_trend: 0 });
                setMembers([]);
            }
        } catch (error) {
            console.error('Error loading activity data:', error);
            setServerStats({ total_messages: 0, total_voice_minutes: 0, total_reactions: 0, active_members: 0, message_trend: 0, voice_trend: 0, reaction_trend: 0 });
            setMembers([]);
        }
        setLoading(false);
    };

    const formatTime = (minutes) => {
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };

    const formatLastActive = (timestamp) => {
        const diff = Date.now() - new Date(timestamp).getTime();
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return <FaArrowUp className="trend-icon up" />;
            case 'down': return <FaArrowDown className="trend-icon down" />;
            default: return null;
        }
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const handleExport = () => {
        alert('Exporting member activity data...');
    };

    const sortedMembers = [...members]
        .filter(m => m.username.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            let aVal, bVal;
            switch (sortBy) {
                case 'messages': aVal = a.stats.messages; bVal = b.stats.messages; break;
                case 'voice': aVal = a.stats.voice_minutes; bVal = b.stats.voice_minutes; break;
                case 'reactions': aVal = a.stats.reactions_given; bVal = b.stats.reactions_given; break;
                case 'last_active':
                    aVal = new Date(a.stats.last_active).getTime();
                    bVal = new Date(b.stats.last_active).getTime();
                    break;
                default: aVal = a.stats.messages; bVal = b.stats.messages;
            }
            return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
        });

    const renderMiniChart = (data) => {
        const max = Math.max(...data);
        return (
            <div className="mini-chart">
                {data.map((val, i) => (
                    <div
                        key={i}
                        className="chart-bar"
                        style={{ height: `${(val / max) * 100}%` }}
                    ></div>
                ))}
            </div>
        );
    };

    return (
        <div className="activity-overlay" onClick={onClose}>
            <div className="activity-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2><FaChartLine /> Member Activity Dashboard</h2>
                        <span className="active-count">{serverStats?.active_members || 0} active members</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Server Stats Overview */}
                {serverStats && (
                    <div className="stats-overview">
                        <div className="stat-card">
                            <FaComments className="stat-icon messages" />
                            <div className="stat-info">
                                <span className="stat-value">{serverStats.total_messages.toLocaleString()}</span>
                                <span className="stat-label">Total Messages</span>
                            </div>
                            <span className={`trend ${serverStats.message_trend >= 0 ? 'up' : 'down'}`}>
                                {serverStats.message_trend >= 0 ? '+' : ''}{serverStats.message_trend}%
                            </span>
                        </div>
                        <div className="stat-card">
                            <FaMicrophone className="stat-icon voice" />
                            <div className="stat-info">
                                <span className="stat-value">{formatTime(serverStats.total_voice_minutes)}</span>
                                <span className="stat-label">Voice Time</span>
                            </div>
                            <span className={`trend ${serverStats.voice_trend >= 0 ? 'up' : 'down'}`}>
                                {serverStats.voice_trend >= 0 ? '+' : ''}{serverStats.voice_trend}%
                            </span>
                        </div>
                        <div className="stat-card">
                            <FaSmile className="stat-icon reactions" />
                            <div className="stat-info">
                                <span className="stat-value">{serverStats.total_reactions.toLocaleString()}</span>
                                <span className="stat-label">Reactions</span>
                            </div>
                            <span className={`trend ${serverStats.reaction_trend >= 0 ? 'up' : 'down'}`}>
                                {serverStats.reaction_trend >= 0 ? '+' : ''}{serverStats.reaction_trend}%
                            </span>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="filter-bar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <FaCalendar />
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="day">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>
                    <button className="export-btn" onClick={handleExport}>
                        <FaDownload /> Export
                    </button>
                </div>

                {/* Members Table */}
                <div className="content">
                    {loading ? (
                        <div className="loading">Loading activity data...</div>
                    ) : selectedMember ? (
                        <div className="member-detail">
                            <button
                                className="back-btn"
                                onClick={() => setSelectedMember(null)}
                            >
                                ← Back to list
                            </button>

                            <div className="detail-header">
                                <div className="member-avatar large">
                                    <FaUser />
                                </div>
                                <div className="member-info">
                                    <h3>{selectedMember.username}</h3>
                                    <span className="last-active">
                                        Last active: {formatLastActive(selectedMember.stats.last_active)}
                                    </span>
                                </div>
                                {getTrendIcon(selectedMember.stats.trend)}
                            </div>

                            <div className="detail-stats">
                                <div className="detail-stat">
                                    <FaComments />
                                    <span className="value">{selectedMember.stats.messages.toLocaleString()}</span>
                                    <span className="label">Messages</span>
                                </div>
                                <div className="detail-stat">
                                    <FaMicrophone />
                                    <span className="value">{formatTime(selectedMember.stats.voice_minutes)}</span>
                                    <span className="label">Voice Time</span>
                                </div>
                                <div className="detail-stat">
                                    <FaSmile />
                                    <span className="value">{selectedMember.stats.reactions_given}</span>
                                    <span className="label">Reactions Given</span>
                                </div>
                                <div className="detail-stat">
                                    <FaMedal />
                                    <span className="value">{selectedMember.stats.reactions_received}</span>
                                    <span className="label">Reactions Received</span>
                                </div>
                            </div>

                            <div className="activity-chart">
                                <h4>Activity Trend (Last 7 days)</h4>
                                <div className="chart-container">
                                    {selectedMember.activity_history.map((val, i) => (
                                        <div key={i} className="chart-column">
                                            <div
                                                className="chart-fill"
                                                style={{ height: `${(val / Math.max(...selectedMember.activity_history)) * 100}%` }}
                                            >
                                                <span className="chart-value">{val}</span>
                                            </div>
                                            <span className="chart-label">Day {i + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="members-table">
                            <div className="table-header">
                                <div className="col col-member">Member</div>
                                <div
                                    className={`col col-messages sortable ${sortBy === 'messages' ? 'active' : ''}`}
                                    onClick={() => handleSort('messages')}
                                >
                                    <FaComments /> Messages
                                    {sortBy === 'messages' && <FaSortAmountDown className={sortOrder} />}
                                </div>
                                <div
                                    className={`col col-voice sortable ${sortBy === 'voice' ? 'active' : ''}`}
                                    onClick={() => handleSort('voice')}
                                >
                                    <FaMicrophone /> Voice
                                    {sortBy === 'voice' && <FaSortAmountDown className={sortOrder} />}
                                </div>
                                <div
                                    className={`col col-reactions sortable ${sortBy === 'reactions' ? 'active' : ''}`}
                                    onClick={() => handleSort('reactions')}
                                >
                                    <FaSmile /> Reactions
                                    {sortBy === 'reactions' && <FaSortAmountDown className={sortOrder} />}
                                </div>
                                <div className="col col-trend">Trend</div>
                                <div
                                    className={`col col-last sortable ${sortBy === 'last_active' ? 'active' : ''}`}
                                    onClick={() => handleSort('last_active')}
                                >
                                    <FaClock /> Last Active
                                </div>
                            </div>
                            <div className="table-body">
                                {sortedMembers.map((member, index) => (
                                    <div
                                        key={member.id}
                                        className="table-row"
                                        onClick={() => setSelectedMember(member)}
                                    >
                                        <div className="col col-member">
                                            <span className="rank">#{index + 1}</span>
                                            <div className="member-avatar">
                                                <FaUser />
                                            </div>
                                            <span className="member-name">{member.username}</span>
                                        </div>
                                        <div className="col col-messages">
                                            {member.stats.messages.toLocaleString()}
                                        </div>
                                        <div className="col col-voice">
                                            {formatTime(member.stats.voice_minutes)}
                                        </div>
                                        <div className="col col-reactions">
                                            {member.stats.reactions_given}
                                        </div>
                                        <div className="col col-trend">
                                            {renderMiniChart(member.activity_history)}
                                        </div>
                                        <div className="col col-last">
                                            {formatLastActive(member.stats.last_active)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemberActivityDashboard;
