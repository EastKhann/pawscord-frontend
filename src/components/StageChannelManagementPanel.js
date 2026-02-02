import React, { useState, useEffect } from 'react';
import {
    FaMicrophone, FaTimes, FaPlus, FaPlay, FaStop, FaHandPaper,
    FaUserPlus, FaUserMinus, FaVolumeMute, FaVolumeUp, FaUsers,
    FaCrown, FaCalendar, FaClock, FaEdit, FaTrash, FaEye
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './StageChannelManagementPanel.css';

const StageChannelManagementPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [stages, setStages] = useState([]);
    const [activeStage, setActiveStage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active');
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        loadStages();
    }, [serverId]);

    const loadStages = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/stages/`);
                if (response.ok) {
                    const data = await response.json();
                    const allStages = data.stages || data || [];
                    setStages(allStages);
                    const liveStage = allStages.find(s => s.status === 'live');
                    setActiveStage(liveStage || null);
                } else {
                    setStages([]);
                    setActiveStage(null);
                }
            } else {
                setStages([]);
                setActiveStage(null);
            }
        } catch (error) {
            console.error('Error loading stages:', error);
            setStages([]);
            setActiveStage(null);
        }
        setLoading(false);
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getDuration = (start, end) => {
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : new Date();
        const diff = endDate - startDate;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${mins}m`;
    };

    const handlePromoteToSpeaker = (userId) => {
        if (!activeStage) return;
        const user = activeStage.hand_raises.find(u => u.id === userId);
        if (user) {
            setActiveStage({
                ...activeStage,
                speakers: [...activeStage.speakers, { ...user, isMuted: false, isModerator: false }],
                hand_raises: activeStage.hand_raises.filter(u => u.id !== userId)
            });
        }
    };

    const handleDenyHandRaise = (userId) => {
        if (!activeStage) return;
        setActiveStage({
            ...activeStage,
            hand_raises: activeStage.hand_raises.filter(u => u.id !== userId)
        });
    };

    const handleRemoveSpeaker = (userId) => {
        if (!activeStage) return;
        setActiveStage({
            ...activeStage,
            speakers: activeStage.speakers.filter(s => s.id !== userId)
        });
    };

    const handleToggleMute = (userId) => {
        if (!activeStage) return;
        setActiveStage({
            ...activeStage,
            speakers: activeStage.speakers.map(s =>
                s.id === userId ? { ...s, isMuted: !s.isMuted } : s
            )
        });
    };

    const handleEndStage = (stageId) => {
        setStages(stages.map(s =>
            s.id === stageId ? { ...s, status: 'ended', ended_at: new Date().toISOString() } : s
        ));
        if (activeStage?.id === stageId) {
            setActiveStage(null);
        }
    };

    const handleStartStage = (stageId) => {
        setStages(stages.map(s =>
            s.id === stageId ? { ...s, status: 'live', started_at: new Date().toISOString() } : s
        ));
    };

    const liveStages = stages.filter(s => s.status === 'live');
    const scheduledStages = stages.filter(s => s.status === 'scheduled');
    const pastStages = stages.filter(s => s.status === 'ended');

    if (loading) {
        return (
            <div className="stage-overlay" onClick={onClose}>
                <div className="stage-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading stages...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="stage-overlay" onClick={onClose}>
            <div className="stage-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaMicrophone />
                            Stage Channel Management
                        </h2>
                        <span className="subtitle">Manage stage events and speakers</span>
                    </div>
                    <div className="header-actions">
                        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
                            <FaPlus /> Create Stage
                        </button>
                        <button className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="stage-content">
                    {/* Left: Stage List */}
                    <div className="stages-sidebar">
                        <div className="tabs">
                            <button
                                className={activeTab === 'active' ? 'active' : ''}
                                onClick={() => setActiveTab('active')}
                            >
                                Live ({liveStages.length})
                            </button>
                            <button
                                className={activeTab === 'scheduled' ? 'active' : ''}
                                onClick={() => setActiveTab('scheduled')}
                            >
                                Scheduled ({scheduledStages.length})
                            </button>
                            <button
                                className={activeTab === 'past' ? 'active' : ''}
                                onClick={() => setActiveTab('past')}
                            >
                                Past
                            </button>
                        </div>

                        <div className="stages-list">
                            {activeTab === 'active' && liveStages.map(stage => (
                                <div
                                    key={stage.id}
                                    className={`stage-item ${activeStage?.id === stage.id ? 'selected' : ''}`}
                                    onClick={() => setActiveStage(stage)}
                                >
                                    <div className="stage-status live">
                                        <span className="pulse"></span>
                                        LIVE
                                    </div>
                                    <h4>{stage.topic}</h4>
                                    <div className="stage-meta">
                                        <span><FaUsers /> {stage.audience}</span>
                                        <span><FaMicrophone /> {stage.speakers.length}</span>
                                    </div>
                                </div>
                            ))}

                            {activeTab === 'scheduled' && scheduledStages.map(stage => (
                                <div
                                    key={stage.id}
                                    className={`stage-item ${activeStage?.id === stage.id ? 'selected' : ''}`}
                                    onClick={() => setActiveStage(stage)}
                                >
                                    <div className="stage-status scheduled">SCHEDULED</div>
                                    <h4>{stage.topic}</h4>
                                    <div className="stage-meta">
                                        <span><FaCalendar /> {formatTime(stage.scheduled_start)}</span>
                                    </div>
                                    <button
                                        className="start-btn"
                                        onClick={(e) => { e.stopPropagation(); handleStartStage(stage.id); }}
                                    >
                                        <FaPlay /> Start Now
                                    </button>
                                </div>
                            ))}

                            {activeTab === 'past' && pastStages.map(stage => (
                                <div key={stage.id} className="stage-item past">
                                    <div className="stage-status ended">ENDED</div>
                                    <h4>{stage.topic}</h4>
                                    <div className="stage-meta">
                                        <span>Peak: {stage.peak_audience} viewers</span>
                                        <span>{stage.total_speakers} speakers</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Active Stage Management */}
                    <div className="stage-details">
                        {activeStage && activeStage.status === 'live' ? (
                            <>
                                <div className="details-header">
                                    <div>
                                        <h3>{activeStage.topic}</h3>
                                        <p>{activeStage.description}</p>
                                    </div>
                                    <button
                                        className="end-stage-btn"
                                        onClick={() => handleEndStage(activeStage.id)}
                                    >
                                        <FaStop /> End Stage
                                    </button>
                                </div>

                                <div className="stage-stats">
                                    <div className="stat">
                                        <span className="stat-value">{activeStage.audience}</span>
                                        <span className="stat-label">Audience</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-value">{activeStage.speakers.length}</span>
                                        <span className="stat-label">Speakers</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-value">{activeStage.hand_raises.length}</span>
                                        <span className="stat-label">Hand Raised</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-value">{getDuration(activeStage.started_at)}</span>
                                        <span className="stat-label">Duration</span>
                                    </div>
                                </div>

                                {/* Speakers */}
                                <div className="section">
                                    <h4><FaMicrophone /> Speakers ({activeStage.speakers.length}/{activeStage.max_speakers})</h4>
                                    <div className="speakers-list">
                                        {activeStage.speakers.map(speaker => (
                                            <div key={speaker.id} className={`speaker-item ${speaker.isMuted ? 'muted' : ''}`}>
                                                <div className="speaker-avatar">
                                                    {speaker.username.charAt(0).toUpperCase()}
                                                    {speaker.isModerator && <FaCrown className="mod-badge" />}
                                                </div>
                                                <span className="speaker-name">{speaker.username}</span>
                                                <div className="speaker-actions">
                                                    <button
                                                        className={`mute-btn ${speaker.isMuted ? 'muted' : ''}`}
                                                        onClick={() => handleToggleMute(speaker.id)}
                                                    >
                                                        {speaker.isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                                                    </button>
                                                    {!speaker.isModerator && (
                                                        <button
                                                            className="remove-btn"
                                                            onClick={() => handleRemoveSpeaker(speaker.id)}
                                                        >
                                                            <FaUserMinus />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Hand Raises */}
                                <div className="section">
                                    <h4><FaHandPaper /> Hand Raises ({activeStage.hand_raises.length})</h4>
                                    {activeStage.hand_raises.length > 0 ? (
                                        <div className="hand-raises-list">
                                            {activeStage.hand_raises.map(user => (
                                                <div key={user.id} className="hand-raise-item">
                                                    <div className="user-avatar">
                                                        {user.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="user-info">
                                                        <span className="user-name">{user.username}</span>
                                                        <span className="raised-time">
                                                            <FaClock /> {formatTime(user.raised_at)}
                                                        </span>
                                                    </div>
                                                    <div className="hand-raise-actions">
                                                        <button
                                                            className="approve-btn"
                                                            onClick={() => handlePromoteToSpeaker(user.id)}
                                                        >
                                                            <FaUserPlus /> Invite
                                                        </button>
                                                        <button
                                                            className="deny-btn"
                                                            onClick={() => handleDenyHandRaise(user.id)}
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="empty-state">
                                            No hand raises yet
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : activeStage && activeStage.status === 'scheduled' ? (
                            <div className="scheduled-details">
                                <div className="scheduled-icon">
                                    <FaCalendar />
                                </div>
                                <h3>{activeStage.topic}</h3>
                                <p>{activeStage.description}</p>
                                <div className="scheduled-time">
                                    <span>Starts: {formatTime(activeStage.scheduled_start)}</span>
                                    <span>Ends: {formatTime(activeStage.scheduled_end)}</span>
                                </div>
                                <button
                                    className="start-now-btn"
                                    onClick={() => handleStartStage(activeStage.id)}
                                >
                                    <FaPlay /> Start Stage Now
                                </button>
                            </div>
                        ) : (
                            <div className="no-stage-selected">
                                <FaMicrophone className="no-stage-icon" />
                                <h3>No Stage Selected</h3>
                                <p>Select a stage from the list or create a new one</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Create Modal */}
                {showCreateModal && (
                    <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                        <div className="create-modal" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3><FaMicrophone /> Create Stage</h3>
                                <button onClick={() => setShowCreateModal(false)}><FaTimes /></button>
                            </div>
                            <div className="modal-content">
                                <div className="form-group">
                                    <label>Topic</label>
                                    <input type="text" placeholder="What's this stage about?" />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea placeholder="Describe your stage event..." rows={3}></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Schedule</label>
                                        <select>
                                            <option value="now">Start Now</option>
                                            <option value="later">Schedule for Later</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Max Speakers</label>
                                        <input type="number" min={1} max={25} defaultValue={10} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="cancel-modal" onClick={() => setShowCreateModal(false)}>
                                    Cancel
                                </button>
                                <button className="create-modal-btn">
                                    <FaMicrophone /> Create Stage
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StageChannelManagementPanel;
