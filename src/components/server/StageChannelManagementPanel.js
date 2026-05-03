/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    FaMicrophone,
    FaTimes,
    FaPlus,
    FaPlay,
    FaStop,
    FaHandPaper,
    FaUserPlus,
    FaUserMinus,
    FaVolumeMute,
    FaVolumeUp,
    FaUsers,
    FaCrown,
    FaCalendar,
    FaClock,
    FaEdit,
    FaTrash,
    FaEye,
} from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import logger from '../../utils/logger';
import './StageChannelManagementPanel.css';

const StageChannelManagementPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
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
                    const liveStage = allStages.find((s) => s.status === 'live');
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
            logger.error('Error loading stages:', error);
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
            minute: '2-digit',
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
        const user = activeStage.hand_raises.find((u) => u.id === userId);
        if (user) {
            setActiveStage({
                ...activeStage,
                speakers: [
                    ...activeStage.speakers,
                    { ...user, isMuted: false, isModerator: false },
                ],
                hand_raises: activeStage.hand_raises.filter((u) => u.id !== userId),
            });
        }
    };

    const handleDenyHandRaise = (userId) => {
        if (!activeStage) return;
        setActiveStage({
            ...activeStage,
            hand_raises: activeStage.hand_raises.filter((u) => u.id !== userId),
        });
    };

    const handleRemoveSpeaker = (userId) => {
        if (!activeStage) return;
        setActiveStage({
            ...activeStage,
            speakers: activeStage.speakers.filter((s) => s.id !== userId),
        });
    };

    const handleToggleMute = (userId) => {
        if (!activeStage) return;
        setActiveStage({
            ...activeStage,
            speakers: activeStage.speakers.map((s) =>
                s.id === userId ? { ...s, isMuted: !s.isMuted } : s
            ),
        });
    };

    const handleEndStage = (stageId) => {
        setStages(
            stages.map((s) =>
                s.id === stageId ? { ...s, status: 'ended', ended_at: new Date().toISOString() } : s
            )
        );
        if (activeStage?.id === stageId) {
            setActiveStage(null);
        }
    };

    const handleStartStage = (stageId) => {
        setStages(
            stages.map((s) =>
                s.id === stageId
                    ? { ...s, status: 'live', started_at: new Date().toISOString() }
                    : s
            )
        );
    };

    const liveStages = stages.filter((s) => s.status === 'live');
    const scheduledStages = stages.filter((s) => s.status === 'scheduled');
    const pastStages = stages.filter((s) => s.status === 'ended');

    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleOpenCreateModal = useCallback(() => setShowCreateModal(true), []);
    const handleCloseCreateModal = useCallback(() => setShowCreateModal(false), []);
    const handleTabActive = useCallback(() => setActiveTab('active'), []);
    const handleTabScheduled = useCallback(() => setActiveTab('scheduled'), []);
    const handleTabPast = useCallback(() => setActiveTab('past'), []);
    const handleEndActiveStage = useCallback(() => {
        if (activeStage) handleEndStage(activeStage.id);
    }, [activeStage]);
    const handleStartActiveStage = useCallback(() => {
        if (activeStage) handleStartStage(activeStage.id);
    }, [activeStage]);

    if (loading) {
        return (
            <div
                className="stage-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="stage-panel"
                    role="button"
                    tabIndex={0}
                    onClick={handleStopPropagation}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="loading">{t('stage.loading', 'Loading stages...')}</div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="stage-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="stage-panel"
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaMicrophone />
                            Stage Channel Management
                        </h2>
                        <span className="subtitle">
                            {t('stage.subtitle', 'Manage stage events and speakers')}
                        </span>
                    </div>
                    <div className="header-actions">
                        <button
                            aria-label={t('stage.openCreate', 'Create stage event')}
                            className="create-btn"
                            onClick={handleOpenCreateModal}
                        >
                            <FaPlus /> {t('stage.create', 'Create Stage')}
                        </button>
                        <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="stage-content">
                    {/* Left: Stage List */}
                    <div className="stages-sidebar">
                        <div className="tabs">
                            <button
                                aria-label={t('stage.tabActive', 'Active stages')}
                                className={activeTab === 'active' ? 'active' : ''}
                                onClick={handleTabActive}
                            >
                                Live ({liveStages.length})
                            </button>
                            <button
                                aria-label={t('stage.tabScheduled', 'Scheduled stages')}
                                className={activeTab === 'scheduled' ? 'active' : ''}
                                onClick={handleTabScheduled}
                            >
                                Scheduled ({scheduledStages.length})
                            </button>
                            <button
                                aria-label={t('stage.tabPast', 'Past stages')}
                                className={activeTab === 'past' ? 'active' : ''}
                                onClick={handleTabPast}
                            >
                                Past
                            </button>
                        </div>

                        <div className="stages-list">
                            {activeTab === 'active' &&
                                liveStages.map((stage) => (
                                    <div
                                        key={stage.id}
                                        className={`stage-item ${activeStage?.id === stage.id ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => setActiveStage(stage)}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="stage-status live">
                                            <span className="pulse"></span>
                                            LIVE
                                        </div>
                                        <h4>{stage.topic}</h4>
                                        <div className="stage-meta">
                                            <span>
                                                <FaUsers /> {stage.audience}
                                            </span>
                                            <span>
                                                <FaMicrophone /> {stage.speakers.length}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                            {activeTab === 'scheduled' &&
                                scheduledStages.map((stage) => (
                                    <div
                                        key={stage.id}
                                        className={`stage-item ${activeStage?.id === stage.id ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => setActiveStage(stage)}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div className="stage-status scheduled">SCHEDULED</div>
                                        <h4>{stage.topic}</h4>
                                        <div className="stage-meta">
                                            <span>
                                                <FaCalendar /> {formatTime(stage.scheduled_start)}
                                            </span>
                                        </div>
                                        <button
                                            aria-label={t('stage.startStage', 'Start stage now')}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleStartStage(stage.id);
                                            }}
                                        >
                                            <FaPlay /> Start Now
                                        </button>
                                    </div>
                                ))}

                            {activeTab === 'past' &&
                                pastStages.map((stage) => (
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
                                        aria-label={t('stage.endStage', 'End active stage')}
                                        className="end-stage-btn"
                                        onClick={handleEndActiveStage}
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
                                        <span className="stat-value">
                                            {activeStage.speakers.length}
                                        </span>
                                        <span className="stat-label">Speakers</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-value">
                                            {activeStage.hand_raises.length}
                                        </span>
                                        <span className="stat-label">{t('stage.handRaised', 'Hand Raised')}</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-value">
                                            {getDuration(activeStage.started_at)}
                                        </span>
                                        <span className="stat-label">Duration</span>
                                    </div>
                                </div>

                                {/* Speakers */}
                                <div className="section">
                                    <h4>
                                        <FaMicrophone /> Speakers ({activeStage.speakers.length}/
                                        {activeStage.max_speakers})
                                    </h4>
                                    <div className="speakers-list">
                                        {activeStage.speakers.map((speaker) => (
                                            <div
                                                key={speaker.id}
                                                className={`speaker-item ${speaker.isMuted ? 'muted' : ''}`}
                                            >
                                                <div className="speaker-avatar">
                                                    {speaker.username.charAt(0).toUpperCase()}
                                                    {speaker.isModerator && (
                                                        <FaCrown className="mod-badge" />
                                                    )}
                                                </div>
                                                <span className="speaker-name">
                                                    {speaker.username}
                                                </span>
                                                <div className="speaker-actions">
                                                    <button
                                                        aria-label={speaker.isMuted ? t('common.unmute', 'Unmute') : t('common.mute', 'Mute')}
                                                        onClick={() => handleToggleMute(speaker.id)}
                                                    >
                                                        {speaker.isMuted ? (
                                                            <FaVolumeMute />
                                                        ) : (
                                                            <FaVolumeUp />
                                                        )}
                                                    </button>
                                                    {!speaker.isModerator && (
                                                        <button
                                                            aria-label={t('stage.removeSpeaker', 'Remove speaker')}
                                                            onClick={() =>
                                                                handleRemoveSpeaker(speaker.id)
                                                            }
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
                                    <h4>
                                        <FaHandPaper /> {t('stage.handRaisings', 'Hand Raisings')} (
                                        {activeStage.hand_raises.length})
                                    </h4>
                                    {activeStage.hand_raises.length > 0 ? (
                                        <div className="hand-raises-list">
                                            {activeStage.hand_raises.map((user) => (
                                                <div key={user.id} className="hand-raise-item">
                                                    <div className="user-avatar">
                                                        {user.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="user-info">
                                                        <span className="user-name">
                                                            {user.username}
                                                        </span>
                                                        <span className="raised-time">
                                                            <FaClock /> {formatTime(user.raised_at)}
                                                        </span>
                                                    </div>
                                                    <div className="hand-raise-actions">
                                                        <button
                                                            aria-label={t('stage.inviteSpeaker', 'Invite as speaker')}
                                                            onClick={() =>
                                                                handlePromoteToSpeaker(user.id)
                                                            }
                                                        >
                                                            <FaUserPlus /> Invite
                                                        </button>
                                                        <button
                                                            aria-label={t('stage.denyHandRaise', 'Deny hand raise')}
                                                            onClick={() =>
                                                                handleDenyHandRaise(user.id)
                                                            }
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="empty-state">{t('stage.noHandRaisings', 'No hands raised yet')}</div>
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
                                    aria-label={t('stage.startStageNow', 'Start stage now')}
                                    className="start-now-btn"
                                    onClick={handleStartActiveStage}
                                >
                                    <FaPlay /> Start Stage Now
                                </button>
                            </div>
                        ) : (
                            <div className="no-stage-selected">
                                <FaMicrophone className="no-stage-icon" />
                                <h3>{t('stage.noneSelected', 'No Stage Selected')}</h3>
                                <p>{t('stage.selectOrCreate', 'Select a stage from the list or create a new one')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Create Modal */}
                {showCreateModal && (
                    <div
                        className="modal-overlay"
                        role="button"
                        tabIndex={0}
                        onClick={handleCloseCreateModal}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div
                            className="create-modal"
                            role="button"
                            tabIndex={0}
                            onClick={handleStopPropagation}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <div className="modal-header">
                                <h3>
                                    <FaMicrophone /> {t('stage.create', 'Create Stage')}
                                </h3>
                                <button aria-label={t('common.close', 'Close')} onClick={handleCloseCreateModal}>
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="modal-content">
                                <div className="form-group">
                                    <label>Konu</label>
                                    <input
                                        type="text"
                                        placeholder={t('stage.topicPlaceholder', 'What is this stage about?')}
                                        aria-label={t('stage.topicPlaceholder', 'What is this stage about?')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{t('stage.description', 'Description')}</label>
                                    <textarea
                                        placeholder={t('stage.descriptionPlaceholder', 'Describe your stage event...')}
                                        rows={3}
                                        aria-label={t('stage.descriptionPlaceholder', 'Describe your stage event...')}></textarea>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Zamanla</label>
                                        <select aria-label={t('stage.schedule', 'Stage schedule')}>
                                            <option value="now">{t('stage.startNow', 'Start Now')}</option>
                                            <option value="later">Sonraya Zamanla</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>{t('stage.maxSpeakers', 'Max Speakers')}</label>
                                        <input
                                            type="number"
                                            min={1}
                                            max={25}
                                            defaultValue={10}
                                            aria-label={t('stage.maxSpeakers', 'Max Speakers')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    aria-label={t('common.cancel', 'Cancel')}
                                    className="cancel-modal"
                                    onClick={handleCloseCreateModal}
                                >
                                    {t('stage.cancel', 'Cancel')}
                                </button>
                                <button aria-label={t('stage.create', 'Create Stage')} className="create-modal-btn">
                                    <FaMicrophone /> {t('stage.create', 'Create Stage')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

StageChannelManagementPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default memo(StageChannelManagementPanel);
