import React, { useState, useEffect } from 'react';
import {
    FaTerminal, FaTimes, FaSearch, FaCalendar, FaDownload,
    FaFilter, FaUser, FaClock, FaCheckCircle, FaExclamationTriangle,
    FaTimesCircle, FaChevronDown, FaChevronUp, FaServer, FaCode
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './CommandUsageLogsPanel.css';

const CommandUsageLogsPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('logs');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedLog, setExpandedLog] = useState(null);
    const [timeRange, setTimeRange] = useState('week');
    const [topCommands, setTopCommands] = useState([]);

    useEffect(() => {
        loadData();
    }, [serverId, timeRange]);

    const loadData = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/command-logs/?range=${timeRange}`);
                if (response.ok) {
                    const data = await response.json();
                    setStats(data.stats || { total_executions: 0, successful: 0, failed: 0, unique_commands: 0, unique_users: 0, avg_response_time: 0 });
                    setLogs(data.logs || []);
                    setTopCommands(data.top_commands || []);
                } else {
                    setStats({ total_executions: 0, successful: 0, failed: 0, unique_commands: 0, unique_users: 0, avg_response_time: 0 });
                    setLogs([]);
                    setTopCommands([]);
                }
            } else {
                setStats({ total_executions: 0, successful: 0, failed: 0, unique_commands: 0, unique_users: 0, avg_response_time: 0 });
                setLogs([]);
                setTopCommands([]);
            }
        } catch (error) {
            console.error('Error loading command logs:', error);
            setStats({ total_executions: 0, successful: 0, failed: 0, unique_commands: 0, unique_users: 0, avg_response_time: 0 });
            setLogs([]);
            setTopCommands([]);
        }
        setLoading(false);
    };

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.user.username.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success': return <FaCheckCircle className="status-icon success" />;
            case 'error': return <FaTimesCircle className="status-icon error" />;
            case 'warning': return <FaExclamationTriangle className="status-icon warning" />;
            default: return null;
        }
    };

    const handleExport = () => {
        alert('Exporting command logs...');
    };

    if (loading) {
        return (
            <div className="cmdlogs-overlay" onClick={onClose}>
                <div className="cmdlogs-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading command logs...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="cmdlogs-overlay" onClick={onClose}>
            <div className="cmdlogs-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaTerminal />
                            Command Usage Logs
                        </h2>
                        <span className="subtitle">Track and analyze slash command usage</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Stats Overview */}
                {stats && (
                    <div className="stats-bar">
                        <div className="stat-item">
                            <span className="stat-value">{stats.total_executions.toLocaleString()}</span>
                            <span className="stat-label">Total</span>
                        </div>
                        <div className="stat-item success">
                            <span className="stat-value">{stats.successful.toLocaleString()}</span>
                            <span className="stat-label">Success</span>
                        </div>
                        <div className="stat-item error">
                            <span className="stat-value">{stats.failed}</span>
                            <span className="stat-label">Failed</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{stats.unique_commands}</span>
                            <span className="stat-label">Commands</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{stats.avg_response_time}ms</span>
                            <span className="stat-label">Avg Time</span>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="tabs-bar">
                    <div className="tabs">
                        <button
                            className={activeTab === 'logs' ? 'active' : ''}
                            onClick={() => setActiveTab('logs')}
                        >
                            <FaTerminal /> Logs
                        </button>
                        <button
                            className={activeTab === 'commands' ? 'active' : ''}
                            onClick={() => setActiveTab('commands')}
                        >
                            <FaCode /> Top Commands
                        </button>
                    </div>
                    <div className="actions">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="day">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                        <button className="export-btn" onClick={handleExport}>
                            <FaDownload /> Export
                        </button>
                    </div>
                </div>

                <div className="content">
                    {activeTab === 'logs' && (
                        <>
                            {/* Filter Bar */}
                            <div className="filter-bar">
                                <div className="search-box">
                                    <FaSearch />
                                    <input
                                        type="text"
                                        placeholder="Search commands or users..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="status-filter">
                                    <FaFilter />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="success">Success</option>
                                        <option value="error">Error</option>
                                        <option value="warning">Warning</option>
                                    </select>
                                </div>
                            </div>

                            {/* Logs List */}
                            <div className="logs-list">
                                {filteredLogs.map(log => (
                                    <div
                                        key={log.id}
                                        className={`log-item ${expandedLog === log.id ? 'expanded' : ''}`}
                                        onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                                    >
                                        <div className="log-main">
                                            {getStatusIcon(log.status)}
                                            <div className="command-info">
                                                <span className="command-name">{log.command}</span>
                                                <span className="command-args">{log.args}</span>
                                            </div>
                                            <div className="log-meta">
                                                <span className="user">
                                                    <FaUser /> {log.user.username}
                                                </span>
                                                <span className="channel">#{log.channel}</span>
                                            </div>
                                            <div className="log-timing">
                                                <span className="response-time">{log.response_time}ms</span>
                                                <span className="timestamp">
                                                    <FaClock /> {formatTime(log.timestamp)}
                                                </span>
                                            </div>
                                            <span className="expand-icon">
                                                {expandedLog === log.id ? <FaChevronUp /> : <FaChevronDown />}
                                            </span>
                                        </div>
                                        {expandedLog === log.id && (
                                            <div className="log-details">
                                                <div className="detail-row">
                                                    <span className="detail-label">Response:</span>
                                                    <span className={`detail-value ${log.status}`}>
                                                        {log.response || log.error}
                                                    </span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">Full Command:</span>
                                                    <code>{log.command} {log.args}</code>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'commands' && (
                        <div className="commands-tab">
                            {topCommands.length > 0 ? (
                                <div className="commands-list">
                                    {topCommands.map((cmd, i) => (
                                        <div key={i} className="command-item">
                                            <span className="rank">#{i + 1}</span>
                                            <div className="command-details">
                                                <span className="cmd-name">{cmd.name}</span>
                                                <div className="cmd-bar-bg">
                                                    <div
                                                        className="cmd-bar"
                                                        style={{ width: `${topCommands[0]?.count > 0 ? (cmd.count / topCommands[0].count) * 100 : 0}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="cmd-count">{cmd.count.toLocaleString()}</span>
                                            <span className={`success-rate ${cmd.success_rate >= 95 ? 'high' : 'medium'}`}>
                                                {cmd.success_rate}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">No command data available</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandUsageLogsPanel;
