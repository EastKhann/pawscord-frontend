import React, { useState, useEffect } from 'react';
import './RichPresence.css';
import { FaCrown, FaGamepad, FaMusic, FaFilm, FaTimes, FaClock, FaEdit } from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';

const RichPresence = ({ userId, onClose }) => {
    const [customStatus, setCustomStatus] = useState('');
    const [statusEmoji, setStatusEmoji] = useState('');
    const [activityType, setActivityType] = useState('playing'); // playing, listening, watching, streaming
    const [activityName, setActivityName] = useState('');
    const [activityDetails, setActivityDetails] = useState('');
    const [activityState, setActivityState] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [largeImage, setLargeImage] = useState('');
    const [largeText, setLargeText] = useState('');
    const [smallImage, setSmallImage] = useState('');
    const [smallText, setSmallText] = useState('');
    const [currentPresence, setCurrentPresence] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPresence();
    }, [userId]);

    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    };

    const fetchPresence = async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/presence/${userId}/`);
            setCurrentPresence(data);
            if (data.custom_status) {
                setCustomStatus(data.custom_status.text || '');
                setStatusEmoji(data.custom_status.emoji || '');
            }
            if (data.activity) {
                setActivityType(data.activity.type || 'playing');
                setActivityName(data.activity.name || '');
                setActivityDetails(data.activity.details || '');
                setActivityState(data.activity.state || '');
                setStartTime(data.activity.start_time);
                setLargeImage(data.activity.large_image || '');
                setLargeText(data.activity.large_text || '');
                setSmallImage(data.activity.small_image || '');
                setSmallText(data.activity.small_text || '');
            }
        } catch (error) {
            console.error('Presence fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateCustomStatus = async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/presence/${userId}/status/`, {
                method: 'POST',
                body: JSON.stringify({
                    text: customStatus,
                    emoji: statusEmoji,
                    expires_at: null
                })
            });
            showToast('Custom status updated!');
        } catch (error) {
            console.error('Status update error:', error);
            showToast('Failed to update status', 'error');
        }
    };

    const clearCustomStatus = async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/presence/${userId}/status/clear/`, {
                method: 'POST'
            });
            setCustomStatus('');
            setStatusEmoji('');
            showToast('Custom status cleared!');
        } catch (error) {
            console.error('Status clear error:', error);
            showToast('Failed to clear status', 'error');
        }
    };

    const updateActivity = async () => {
        try {
            const activity = {
                type: activityType,
                name: activityName,
                details: activityDetails,
                state: activityState,
                start_time: startTime || new Date().toISOString(),
                assets: {
                    large_image: largeImage,
                    large_text: largeText,
                    small_image: smallImage,
                    small_text: smallText
                }
            };

            await fetchWithAuth(`${getApiBase()}/presence/${userId}/activity/`, {
                method: 'POST',
                body: JSON.stringify(activity)
            });
            showToast('Activity updated!');
        } catch (error) {
            console.error('Activity update error:', error);
            showToast('Failed to update activity', 'error');
        }
    };

    const clearActivity = async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/presence/${userId}/activity/clear/`, {
                method: 'POST'
            });
            setActivityName('');
            setActivityDetails('');
            setActivityState('');
            setStartTime(null);
            showToast('Activity cleared!');
        } catch (error) {
            console.error('Activity clear error:', error);
            showToast('Failed to clear activity', 'error');
        }
    };

    const showToast = (message, type = 'success') => {
        // Implement toast notification
        console.log(`[${type}] ${message}`);
    };

    const getActivityIcon = () => {
        switch (activityType) {
            case 'playing': return <FaGamepad />;
            case 'listening': return <FaMusic />;
            case 'watching': return <FaFilm />;
            case 'streaming': return <FaCrown />;
            default: return <FaGamepad />;
        }
    };

    const getActivityText = () => {
        switch (activityType) {
            case 'playing': return 'Playing';
            case 'listening': return 'Listening to';
            case 'watching': return 'Watching';
            case 'streaming': return 'Streaming';
            default: return 'Playing';
        }
    };

    const formatElapsedTime = (startTime) => {
        if (!startTime) return '00:00';
        const start = new Date(startTime);
        const now = new Date();
        const diff = Math.floor((now - start) / 1000);
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="presence-overlay">
                <div className="presence-panel loading">
                    <div className="spinner" />
                    <p>Loading Presence...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="presence-overlay">
            <div className="presence-panel">
                <div className="panel-header">
                    <h2><FaEdit /> Rich Presence</h2>
                    <button onClick={onClose} className="btn-close">
                        <FaTimes />
                    </button>
                </div>

                <div className="presence-content">
                    {/* Custom Status Section */}
                    <div className="section">
                        <h3>Custom Status</h3>
                        <div className="status-inputs">
                            <input
                                type="text"
                                placeholder="Emoji (e.g., 😊)"
                                value={statusEmoji}
                                onChange={(e) => setStatusEmoji(e.target.value)}
                                maxLength={2}
                                className="emoji-input"
                            />
                            <input
                                type="text"
                                placeholder="What's happening?"
                                value={customStatus}
                                onChange={(e) => setCustomStatus(e.target.value)}
                                maxLength={128}
                                className="status-input"
                            />
                        </div>
                        <div className="status-actions">
                            <button onClick={updateCustomStatus} className="btn-save">
                                Save Status
                            </button>
                            <button onClick={clearCustomStatus} className="btn-clear">
                                Clear
                            </button>
                        </div>
                        {(customStatus || statusEmoji) && (
                            <div className="status-preview">
                                <span className="preview-emoji">{statusEmoji}</span>
                                <span className="preview-text">{customStatus}</span>
                            </div>
                        )}
                    </div>

                    {/* Activity Section */}
                    <div className="section">
                        <h3>Activity</h3>
                        
                        <div className="activity-type-selector">
                            <button
                                className={activityType === 'playing' ? 'active' : ''}
                                onClick={() => setActivityType('playing')}
                            >
                                <FaGamepad /> Playing
                            </button>
                            <button
                                className={activityType === 'listening' ? 'active' : ''}
                                onClick={() => setActivityType('listening')}
                            >
                                <FaMusic /> Listening
                            </button>
                            <button
                                className={activityType === 'watching' ? 'active' : ''}
                                onClick={() => setActivityType('watching')}
                            >
                                <FaFilm /> Watching
                            </button>
                            <button
                                className={activityType === 'streaming' ? 'active' : ''}
                                onClick={() => setActivityType('streaming')}
                            >
                                <FaCrown /> Streaming
                            </button>
                        </div>

                        <div className="form-group">
                            <label>Activity Name *</label>
                            <input
                                type="text"
                                placeholder="e.g., Valorant, Spotify, YouTube"
                                value={activityName}
                                onChange={(e) => setActivityName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Details</label>
                            <input
                                type="text"
                                placeholder="e.g., In Queue, Episode 5"
                                value={activityDetails}
                                onChange={(e) => setActivityDetails(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>State</label>
                            <input
                                type="text"
                                placeholder="e.g., In Lobby, Competitive"
                                value={activityState}
                                onChange={(e) => setActivityState(e.target.value)}
                            />
                        </div>

                        <div className="assets-grid">
                            <div className="form-group">
                                <label>Large Image URL</label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={largeImage}
                                    onChange={(e) => setLargeImage(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Large Image Text</label>
                                <input
                                    type="text"
                                    placeholder="Hover text"
                                    value={largeText}
                                    onChange={(e) => setLargeText(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Small Image URL</label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    value={smallImage}
                                    onChange={(e) => setSmallImage(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Small Image Text</label>
                                <input
                                    type="text"
                                    placeholder="Hover text"
                                    value={smallText}
                                    onChange={(e) => setSmallText(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="activity-actions">
                            <button onClick={updateActivity} className="btn-save">
                                Save Activity
                            </button>
                            <button onClick={clearActivity} className="btn-clear">
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* Live Preview */}
                    {activityName && (
                        <div className="section preview-section">
                            <h3>Preview</h3>
                            <div className="activity-preview">
                                <div className="activity-icon">
                                    {getActivityIcon()}
                                </div>
                                <div className="activity-info">
                                    <div className="activity-header">
                                        <span className="activity-type">{getActivityText()}</span>
                                        <span className="activity-time">
                                            <FaClock /> {formatElapsedTime(startTime)} elapsed
                                        </span>
                                    </div>
                                    <div className="activity-name">{activityName}</div>
                                    {activityDetails && <div className="activity-details">{activityDetails}</div>}
                                    {activityState && <div className="activity-state">{activityState}</div>}
                                    {largeImage && (
                                        <div className="activity-images">
                                            <img src={largeImage} alt={largeText || 'Activity'} className="large-image" />
                                            {smallImage && <img src={smallImage} alt={smallText || 'Status'} className="small-image" />}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RichPresence;
