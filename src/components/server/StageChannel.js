import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/StageChannel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaMicrophone, FaMicrophoneSlash, FaHandPaper, FaUserShield, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import toast from '../../utils/toast';
import './StageChannel.css';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

const StageChannel = ({ channelId, userId, onClose }) => {
    const { t } = useTranslation();
    const [stageInfo, setStageInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [speakers, setSpeakers] = useState([]);
    const [listeners, setListeners] = useState([]);
    const [requests, setRequests] = useState([]);
    const [userRole, setUserRole] = useState('listener'); // speaker, listener, moderator
    const [isMuted, setIsMuted] = useState(false);
    const [hasRequested, setHasRequested] = useState(false);
    const [liveAnnouncement, setLiveAnnouncement] = useState('');

    useEffect(() => {
        fetchStageInfo();
        const interval = setInterval(fetchStageInfo, 5000);
        return () => clearInterval(interval);
    }, [channelId]);

    const fetchStageInfo = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/stages/${channelId}/info/`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setStageInfo(data.stage);
                setSpeakers(data.speakers || []);
                setListeners(data.listeners || []);
                setRequests(data.requests || []);
                setUserRole(data.user_role);
            }
        } catch (error) {
            logger.error('Failed to fetch stage info:', error);
            toast.error(t('stage.fetchFailed', 'Sahne bilgileri yüklenemedi'));
        }
    };

    const announce = (msg) => setLiveAnnouncement(msg);

    const requestToSpeak = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/stages/${channelId}/raise-hand/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            if (response.ok) {
                setHasRequested(true);
                announce(t('stage.a11y.handRaised', 'Speak request sent'));
                toast.success(t('ui.konusma_istegi_sent'));
            }
        } catch (error) {
            toast.error(t('stage.requestFailed'));
        }
    };

    const cancelRequest = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/stages/${channelId}/cancel-request/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            if (response.ok) {
                setHasRequested(false);
                announce(t('stage.a11y.requestCancelled', 'Speak request cancelled'));
                toast.success(t('ui.istek_cancel_edildi'));
            }
        } catch (error) {
            toast.error(t('stage.cancelFailed'));
        }
    };

    const approveRequest = async (requestUserId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/stages/${channelId}/promote/${requestUserId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            if (response.ok) {
                fetchStageInfo();
                toast.success(t('ui.konusmaci_approved'));
            }
        } catch (error) {
            toast.error(t('ui.confirmation_failed'));
        }
    };

    const removeSpeaker = async (speakerId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/stages/${channelId}/remove/${speakerId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`
                }
            });

            if (response.ok) {
                fetchStageInfo();
                toast.success(t('ui.konusmaci_dinleyiciye_alindi'));
            }
        } catch (error) {
            toast.error(t('stage.operationFailed'));
        }
    };

    const toggleMute = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/stages/${channelId}/mute/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ muted: !isMuted })
            });

            if (response.ok) {
                const nowMuted = !isMuted;
                setIsMuted(nowMuted);
                announce(nowMuted
                    ? t('stage.a11y.muted', 'Microphone muted')
                    : t('stage.a11y.unmuted', 'Microphone unmuted'));
                toast.success(isMuted ? t('ui.mikrofon_acildi') : t('stage.a11y.muted', 'Microphone muted'));
            }
        } catch (error) {
            toast.error(t('stage.micChangeFailed'));
        }
    };

    const inviteToSpeak = async (listenerId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/stages/${channelId}/invite/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: listenerId })
            });

            if (response.ok) {
                toast.success(t('stage.inviteSent'));
            }
        } catch (error) {
            toast.error(t('stage.inviteFailed'));
        }
    };

    return (
        <div className="stage-channel">
            {/* Screen-reader live region: announces mute/unmute, hand-raise, invite events */}
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {liveAnnouncement}
            </div>
            <div className="stage-header">
                <div className="stage-info">
                    <h2>{stageInfo?.topic || t('ui.stage_channeli')}</h2>
                    <p>{speakers.length} {t('stage.speakers', 'speakers')} • {listeners.length} {t('stage.listeners', 'listeners')}</p>
                </div>
                <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="stage-body">
                {/* Speakers Section */}
                <div className="speakers-section">
                    <h3>
                        <FaMicrophone /> {t('stage.speakersLabel', 'Speakers')}
                    </h3>
                    <div className="participants-grid">
                        {speakers.map(speaker => (
                            <div key={speaker.id} className="participant-card speaker">
                                <div className="participant-avatar">
                                    <img src={speaker.avatar || '/default-avatar.png'} alt={speaker.username} />
                                    {speaker.is_muted && (
                                        <div className="muted-indicator">
                                            <FaMicrophoneSlash />
                                        </div>
                                    )}
                                </div>
                                <div className="participant-info">
                                    <span className="participant-name">{speaker.username}</span>
                                    {speaker.is_moderator && (
                                        <span className="moderator-badge">
                                            <FaUserShield /> {t('stage.moderatorBadge', 'Moderator')}
                                        </span>
                                    )}
                                </div>
                                {userRole === 'moderator' && speaker.id !== userId && (
                                    <button
                                        aria-label={t('stage.removeSpeaker', 'Move to audience')}
                                        onClick={() => removeSpeaker(speaker.id)}
                                        title={t('stage.moveToAudience', 'Move to Audience')}
                                    >
                                        <FaUserMinus />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requests Section (Moderators Only) */}
                {userRole === 'moderator' && requests.length > 0 && (
                    <div className="requests-section">
                        <h3>
                            <FaHandPaper /> {t('stage.requests', 'Speak Requests ({count})', { count: requests.length })}
                        </h3>
                        <div className="requests-list">
                            {requests.map(request => (
                                <div key={request.id} className="request-item">
                                    <img src={request.user.avatar} alt={request.user.username} />
                                    <span>{request.user.username}</span>
                                    <button
                                        aria-label={t('stage.approveRequest', 'Approve speak request')}
                                        onClick={() => approveRequest(request.user.id)}>
                                        {t('stage.confirm', 'Confirm')}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Listeners Section */}
                <div className="listeners-section">
                    <h3>{t('stage.listenersLabel', 'Listeners')}</h3>
                    <div className="participants-grid">
                        {listeners.map(listener => (
                            <div key={listener.id} className="participant-card listener">
                                <div className="participant-avatar">
                                    <img src={listener.avatar || '/default-avatar.png'} alt={listener.username} />
                                </div>
                                <div className="participant-info">
                                    <span className="participant-name">{listener.username}</span>
                                </div>
                                {userRole === 'moderator' && (
                                    <button
                                        aria-label={t('stage.inviteToSpeak', 'Invite to speak')}
                                        onClick={() => inviteToSpeak(listener.id)}
                                        title={t('ui.konusmaci_olarak_invite')}>
                                        <FaUserPlus />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="stage-controls">
                {userRole === 'speaker' && (
                    <button
                        aria-label={isMuted ? t('stage.unmute', 'Unmute') : t('stage.mute', 'Mute')}
                        className={`control-btn ${isMuted ? 'muted' : ''}`}
                        onClick={toggleMute}>
                        {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                        {isMuted ? t('stage.a11y.unmuted', 'Unmute') : t('stage.a11y.muted', 'Mute')}
                    </button>
                )}

                {userRole === 'listener' && !hasRequested && (
                    <button
                        aria-label={t('stage.requestToSpeak', 'Request to speak')} className="control-btn request" onClick={requestToSpeak}>
                        <FaHandPaper /> {t('stage.requestToSpeak', 'Request to Speak')}
                    </button>
                )}

                {userRole === 'listener' && hasRequested && (
                    <button
                        aria-label={t('stage.cancelRequest', 'Cancel speak request')} className="control-btn cancel-request" onClick={cancelRequest}>
                        {t('stage.cancelRequest', '✋ Cancel Request')}
                    </button>
                )}
            </div>
        </div>
    );
};

StageChannel.propTypes = {
    channelId: PropTypes.number,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
};
export default StageChannel;
