/* eslint-disable jsx-a11y/label-has-associated-control */
import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/StageChannelPanel.js
import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import './StageChannelPanel.css';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const StageChannelPanel = ({ roomId, apiBaseUrl, onClose, currentUser }) => {
    const { t } = useTranslation();
    const [activeStages, setActiveStages] = useState([]);
    const [selectedStage, setSelectedStage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list'); // 'list' or 'create'
    const [newStage, setNewStage] = useState({
        topic: '',
        description: '',
        max_speakers: 10,
        max_audience: 1000,
        is_public: true,
    });

    useEffect(() => {
        fetchActiveStages();
        const interval = setInterval(fetchActiveStages, 5000); // Refresh every 5s
        return () => clearInterval(interval);
    }, [roomId]);

    const fetchActiveStages = useCallback(async () => {
        try {
            const token = getToken();
            const url = roomId ? `${apiBaseUrl}/stages/active/` : `${apiBaseUrl}/stages/active/`;

            const response = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setActiveStages(Array.isArray(data) ? data : data.stages || []);
            }
        } catch (error) {
            logger.error('Stages fetch error:', error);
        } finally {
            setLoading(false);
        }
    }, [roomId, apiBaseUrl]);

    const handleCreateStage = useCallback(async () => {
        if (!newStage.topic.trim()) {
            toast.error(t('ui.konu_basligi_gerekli'));
            return;
        }

        if (!roomId) {
            toast.error(t('ui.please_bir_audio_kanalinda_olun'));
            return;
        }

        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/stages/create/${roomId}/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStage),
            });

            if (response.ok) {
                const data = await response.json();
                setActiveStages([...activeStages, data.stage]);
                setNewStage({
                    topic: '',
                    description: '',
                    max_speakers: 10,
                    max_audience: 1000,
                    is_public: true,
                });
                setView('list');
                toast.success(t('stage.created'));
            } else {
                const error = await response.json();
                toast.error(error.error || t('ui.stage_olusturulamadi'));
            }
        } catch (error) {
            logger.error('Stage creation error:', error);
            toast.error(t('stage.error'));
        }
    }, [newStage, activeStages, roomId, apiBaseUrl]);

    const handleJoinStage = useCallback(
        async (stageId) => {
            try {
                const token = getToken();
                const response = await fetch(`${apiBaseUrl}/stages/${stageId}/join/`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    toast.success(t('stage.joined'));
                    fetchActiveStages();
                } else {
                    const error = await response.json();
                    toast.error(error.error || t('stage.joinFailed'));
                }
            } catch (error) {
                logger.error('Join stage error:', error);
                toast.error(t('stage.error'));
            }
        },
        [apiBaseUrl, fetchActiveStages]
    );

    const handleLeaveStage = useCallback(
        async (stageId) => {
            try {
                const token = getToken();
                const response = await fetch(`${apiBaseUrl}/stages/${stageId}/leave/`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    toast.success(t('stage.removed'));
                    fetchActiveStages();
                }
            } catch (error) {
                logger.error('Leave stage error:', error);
            }
        },
        [apiBaseUrl, fetchActiveStages]
    );

    const handleRequestToSpeak = useCallback(
        async (stageId) => {
            try {
                const token = getToken();
                const response = await fetch(`${apiBaseUrl}/stages/${stageId}/request-speak/`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    toast.success(t('ui.konusma_talebi_sent'));
                }
            } catch (error) {
                logger.error('Request speak error:', error);
            }
        },
        [apiBaseUrl]
    );

    const handleInviteSpeaker = useCallback(
        async (stageId, username) => {
            try {
                const token = getToken();
                const response = await fetch(`${apiBaseUrl}/stages/${stageId}/invite-speaker/`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username }),
                });

                if (response.ok) {
                    toast.success(t('stage.speakerInvited', { username }));
                }
            } catch (error) {
                logger.error('Invite speaker error:', error);
            }
        },
        [apiBaseUrl]
    );

    const getRoleIcon = (role) => {
        const icons = {
            host: '👑',
            moderator: '🛡️',
            speaker: '🎙️',
            listner: '👂',
        };
        return icons[role] || '👤';
    };

    const getRoleColor = (role) => {
        const colors = {
            host: '#f0b232',
            moderator: '#5865f2',
            speaker: '#23a559',
            listner: '#949ba4',
        };
        return colors[role] || '#949ba4';
    };

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
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="stage-loading">
                        <div className="spinner"></div>
                        <p>{t('common.loading')}</p>
                    </div>
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
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="stage-header">
                    <h2>🎙️ Stage Channelları</h2>
                    <div className="header-actions">
                        {roomId && (
                            <>
                                <button
                                    aria-label="Action button"
                                    className={`view-toggle ${view === 'list' ? 'active' : ''}`}
                                    onClick={() => setView('list')}
                                >
                                    📋 Active Stage'ler
                                </button>
                                <button
                                    aria-label="Action button"
                                    className={`view-toggle ${view === 'create' ? 'active' : ''}`}
                                    onClick={() => setView('create')}
                                >
                                    ➕ Create
                                </button>
                            </>
                        )}
                        <button aria-label="Close" className="close-btn" onClick={onClose}>
                            ✕
                        </button>
                    </div>
                </div>

                <div className="stage-content">
                    {view === 'list' ? (
                        <div className="stages-list">
                            {activeStages.length > 0 ? (
                                activeStages.map((stage) => (
                                    <div key={stage.id} className="stage-card">
                                        <div className="stage-info">
                                            <div className="stage-icon">🎙️</div>
                                            <div className="stage-details">
                                                <h3>{stage.topic}</h3>
                                                {stage.description && (
                                                    <p className="stage-description">
                                                        {stage.description}
                                                    </p>
                                                )}
                                                <div className="stage-meta">
                                                    <span>👑 Host: {stage.host_username}</span>
                                                    <span>
                                                        🎙️ {stage.speakers_count || 0} konuşmacı
                                                    </span>
                                                    <span>
                                                        👂 {stage.audience_count || 0} dinleyici
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {stage.speakers && stage.speakers.length > 0 && (
                                            <div className="speakers-list">
                                                <h4>Konuşmacılar</h4>
                                                <div className="speakers-grid">
                                                    {stage.speakers
                                                        .slice(0, 6)
                                                        .map((speaker, idx) => (
                                                            <div
                                                                key={`item-${idx}`}
                                                                className="speaker-badge"
                                                            >
                                                                <span
                                                                    className="role-icon"
                                                                    style={{
                                                                        color: getRoleColor(
                                                                            speaker.role
                                                                        ),
                                                                    }}
                                                                >
                                                                    {getRoleIcon(speaker.role)}
                                                                </span>
                                                                <span className="speaker-name">
                                                                    {speaker.username}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    {stage.speakers.length > 6 && (
                                                        <div className="speaker-badge more">
                                                            +{stage.speakers.length - 6}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="stage-actions">
                                            {!stage.is_member ? (
                                                <button
                                                    aria-label="Action button"
                                                    className="join-stage-btn"
                                                    onClick={() => handleJoinStage(stage.id)}
                                                >
                                                    🎧 Dinle
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        aria-label="Action button"
                                                        className="leave-stage-btn"
                                                        onClick={() => handleLeaveStage(stage.id)}
                                                    >
                                                        👋 Leave
                                                    </button>
                                                    {stage.user_role === 'listner' && (
                                                        <button
                                                            aria-label="Action button"
                                                            className="request-speak-btn"
                                                            onClick={() =>
                                                                handleRequestToSpeak(stage.id)
                                                            }
                                                        >
                                                            ✋ Konuşmak İsticomment
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-stages">
                                    <p>🎤 Aktif sahne yok</p>
                                    {roomId && (
                                        <button
                                            aria-label="Create"
                                            onClick={() => setView('create')}
                                        >
                                            İlk stage'i oluştur
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="create-stage-form">
                            <h3>🎙️ Yeni Stage Create</h3>

                            <div className="form-group">
                                <label>Konu Başlığı *</label>
                                <input
                                    type="text"
                                    placeholder={t('ui.konusma_konusu')}
                                    value={newStage.topic}
                                    onChange={(e) =>
                                        setNewStage({ ...newStage, topic: e.target.value })
                                    }
                                    maxLength={100}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    placeholder={t('ui.stage_hakkinda_detaillar')}
                                    value={newStage.description}
                                    onChange={(e) =>
                                        setNewStage({ ...newStage, description: e.target.value })
                                    }
                                    rows={4}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Maks. Konuşmacı (1-10)</label>
                                    <input
                                        type="number"
                                        value={newStage.max_speakers}
                                        onChange={(e) =>
                                            setNewStage({
                                                ...newStage,
                                                max_speakers: Math.min(
                                                    10,
                                                    Math.max(1, parseInt(e.target.value) || 1)
                                                ),
                                            })
                                        }
                                        min="1"
                                        max="10"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Maks. Dinleyici</label>
                                    <input
                                        type="number"
                                        value={newStage.max_audience}
                                        onChange={(e) =>
                                            setNewStage({
                                                ...newStage,
                                                max_audience: Math.min(
                                                    1000,
                                                    Math.max(1, parseInt(e.target.value) || 100)
                                                ),
                                            })
                                        }
                                        min="1"
                                        max="1000"
                                    />
                                </div>
                            </div>

                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={newStage.is_public}
                                        onChange={(e) =>
                                            setNewStage({
                                                ...newStage,
                                                is_public: e.target.checked,
                                            })
                                        }
                                    />
                                    <span>🌍 Public</span>
                                </label>
                            </div>

                            <div className="form-actions">
                                <button
                                    aria-label="handle Create Stage"
                                    className="submit-btn"
                                    onClick={handleCreateStage}
                                >
                                    ✨ Stage Create
                                </button>
                                <button
                                    aria-label="Switch view"
                                    className="cancel-btn"
                                    onClick={() => setView('list')}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

StageChannelPanel.propTypes = {
    roomId: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    currentUser: PropTypes.object,
};
export default memo(StageChannelPanel);
