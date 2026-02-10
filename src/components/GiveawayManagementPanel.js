import React, { useState, useEffect } from 'react';
import {
    FaGift, FaTimes, FaPlus, FaTrophy, FaUsers, FaClock,
    FaCalendar, FaCheck, FaRedo, FaEdit, FaTrash, FaRandom,
    FaUserCheck, FaExclamationTriangle, FaFilter, FaSearch
} from 'react-icons/fa';
import './GiveawayManagementPanel.css';
import { getApiBase } from '../utils/apiEndpoints';
import toast from '../utils/toast';

const GiveawayManagementPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [giveaways, setGiveaways] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedGiveaway, setSelectedGiveaway] = useState(null);

    useEffect(() => {
        loadGiveaways();
    }, [serverId]);

    const loadGiveaways = async () => {
        setLoading(true);
        try {
            // Try to fetch real data from API
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/giveaways/?server_id=${serverId}`);
                if (response.ok) {
                    const data = await response.json();
                    // Convert API format to component format
                    const giveawayList = Array.isArray(data) ? data : (data.giveaways || data.results || []);
                    const formattedGiveaways = giveawayList.map(g => ({
                        id: g.id,
                        title: g.title,
                        prize: g.prize,
                        description: g.description || '',
                        winners_count: g.winner_count || g.winners_count || 1,
                        participants: g.entries_count || g.participants || 0,
                        status: g.is_active ? 'active' : (g.status || 'ended'),
                        start_time: g.start_time || g.created_at,
                        end_time: g.end_time,
                        requirements: g.requirements || {},
                        created_by: g.created_by || 'Admin',
                        winners: g.winners || []
                    }));
                    setGiveaways(formattedGiveaways);
                } else {
                    console.error('Failed to fetch giveaways:', response.status);
                    setGiveaways([]);
                }
            } else {
                console.warn('Giveaways: Missing fetchWithAuth or serverId');
                setGiveaways([]);
            }
        } catch (error) {
            console.error('Error loading giveaways:', error);
            setGiveaways([]);
        }
        setLoading(false);
    };

    const filteredGiveaways = giveaways.filter(g => {
        if (activeTab === 'active') return g.status === 'active';
        if (activeTab === 'ended') return g.status === 'ended';
        return true;
    });

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTimeRemaining = (endTime) => {
        const end = new Date(endTime);
        const now = new Date();
        const diff = end - now;

        if (diff <= 0) return 'Ended';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) return `${days}d ${hours}h remaining`;
        return `${hours}h remaining`;
    };

    const handleEndGiveaway = (id) => {
        setGiveaways(giveaways.map(g =>
            g.id === id ? { ...g, status: 'ended', winners: [{ username: 'RandomWinner', avatar: null }] } : g
        ));
    };

    const handleCancelGiveaway = (id) => {
        setGiveaways(giveaways.filter(g => g.id !== id));
    };

    const handleRerollWinner = (id) => {
        toast.info(`Rerolling winners for giveaway ${id}...`);
    };

    if (loading) {
        return (
            <div className="giveaway-overlay" onClick={onClose}>
                <div className="giveaway-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading giveaways...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="giveaway-overlay" onClick={onClose}>
            <div className="giveaway-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaGift />
                            Giveaway Management
                        </h2>
                        <span className="subtitle">Create and manage server giveaways</span>
                    </div>
                    <div className="header-actions">
                        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
                            <FaPlus /> New Giveaway
                        </button>
                        <button className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="stats-bar">
                    <div className="stat-item">
                        <FaGift className="stat-icon" />
                        <div>
                            <span className="stat-value">{giveaways.filter(g => g.status === 'active').length}</span>
                            <span className="stat-label">Active</span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <FaUsers className="stat-icon" />
                        <div>
                            <span className="stat-value">{giveaways.reduce((sum, g) => sum + g.participants, 0)}</span>
                            <span className="stat-label">Total Entries</span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <FaTrophy className="stat-icon" />
                        <div>
                            <span className="stat-value">{giveaways.filter(g => g.status === 'ended').length}</span>
                            <span className="stat-label">Completed</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs-bar">
                    <button
                        className={activeTab === 'active' ? 'active' : ''}
                        onClick={() => setActiveTab('active')}
                    >
                        Active ({giveaways.filter(g => g.status === 'active').length})
                    </button>
                    <button
                        className={activeTab === 'ended' ? 'active' : ''}
                        onClick={() => setActiveTab('ended')}
                    >
                        Ended ({giveaways.filter(g => g.status === 'ended').length})
                    </button>
                    <button
                        className={activeTab === 'all' ? 'active' : ''}
                        onClick={() => setActiveTab('all')}
                    >
                        All ({giveaways.length})
                    </button>
                </div>

                <div className="content">
                    <div className="giveaways-list">
                        {filteredGiveaways.map(giveaway => (
                            <div key={giveaway.id} className={`giveaway-card ${giveaway.status}`}>
                                <div className="card-header">
                                    <div className="prize-icon">
                                        <FaGift />
                                    </div>
                                    <div className="prize-info">
                                        <h3>{giveaway.title}</h3>
                                        <span className="prize">{giveaway.prize}</span>
                                    </div>
                                    <span className={`status-badge ${giveaway.status}`}>
                                        {giveaway.status}
                                    </span>
                                </div>

                                <p className="description">{giveaway.description}</p>

                                <div className="giveaway-stats">
                                    <div className="stat">
                                        <FaUsers />
                                        <span>{giveaway.participants} entries</span>
                                    </div>
                                    <div className="stat">
                                        <FaTrophy />
                                        <span>{giveaway.winners_count} winner{giveaway.winners_count > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="stat">
                                        <FaClock />
                                        <span>{getTimeRemaining(giveaway.end_time)}</span>
                                    </div>
                                </div>

                                {/* Requirements */}
                                {giveaway.requirements && (
                                    <div className="requirements">
                                        <span className="req-label">Requirements:</span>
                                        {giveaway.requirements.min_level > 0 && (
                                            <span className="req-item">Level {giveaway.requirements.min_level}+</span>
                                        )}
                                        {giveaway.requirements.min_messages > 0 && (
                                            <span className="req-item">{giveaway.requirements.min_messages}+ messages</span>
                                        )}
                                        {giveaway.requirements.roles?.length > 0 && (
                                            <span className="req-item">{giveaway.requirements.roles.join(' or ')}</span>
                                        )}
                                    </div>
                                )}

                                {/* Winners (for ended giveaways) */}
                                {giveaway.status === 'ended' && giveaway.winners.length > 0 && (
                                    <div className="winners-section">
                                        <span className="winners-label"><FaTrophy /> Winners:</span>
                                        <div className="winners-list">
                                            {giveaway.winners.map((winner, i) => (
                                                <div key={i} className="winner-item">
                                                    <div className="winner-avatar">
                                                        {winner.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span>{winner.username}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="card-actions">
                                    <span className="created-by">
                                        Created by {giveaway.created_by}
                                    </span>
                                    <div className="action-buttons">
                                        {giveaway.status === 'active' ? (
                                            <>
                                                <button className="view-btn" onClick={() => setSelectedGiveaway(giveaway)}>
                                                    <FaUsers /> View Entries
                                                </button>
                                                <button className="end-btn" onClick={() => handleEndGiveaway(giveaway.id)}>
                                                    <FaCheck /> End Now
                                                </button>
                                                <button className="cancel-btn" onClick={() => handleCancelGiveaway(giveaway.id)}>
                                                    <FaTrash />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="reroll-btn" onClick={() => handleRerollWinner(giveaway.id)}>
                                                    <FaRedo /> Reroll
                                                </button>
                                                <button className="delete-btn" onClick={() => handleCancelGiveaway(giveaway.id)}>
                                                    <FaTrash />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Time info */}
                                <div className="time-info">
                                    <span><FaCalendar /> Start: {formatDate(giveaway.start_time)}</span>
                                    <span><FaCalendar /> End: {formatDate(giveaway.end_time)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Create Modal */}
                {showCreateModal && (
                    <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                        <div className="create-modal" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3><FaGift /> Create Giveaway</h3>
                                <button onClick={() => setShowCreateModal(false)}><FaTimes /></button>
                            </div>
                            <div className="modal-content">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" placeholder="Giveaway title..." />
                                </div>
                                <div className="form-group">
                                    <label>Prize</label>
                                    <input type="text" placeholder="What are you giving away?" />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea placeholder="Describe the giveaway..." rows={3}></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Winners</label>
                                        <input type="number" min={1} defaultValue={1} />
                                    </div>
                                    <div className="form-group">
                                        <label>Duration</label>
                                        <select>
                                            <option value="1h">1 Hour</option>
                                            <option value="6h">6 Hours</option>
                                            <option value="12h">12 Hours</option>
                                            <option value="1d">1 Day</option>
                                            <option value="3d">3 Days</option>
                                            <option value="7d" selected>7 Days</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Requirements (Optional)</label>
                                    <div className="requirements-form">
                                        <div className="req-item">
                                            <label>Min Level:</label>
                                            <input type="number" min={0} defaultValue={0} />
                                        </div>
                                        <div className="req-item">
                                            <label>Min Messages:</label>
                                            <input type="number" min={0} defaultValue={0} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="cancel-modal" onClick={() => setShowCreateModal(false)}>
                                    Cancel
                                </button>
                                <button className="create-modal-btn">
                                    <FaGift /> Create Giveaway
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GiveawayManagementPanel;
