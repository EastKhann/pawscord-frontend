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
    const [listners, setListeners] = useState([]);
    const [requests, setRequests] = useState([]);
    const [userRole, setUserRole] = useState('listner'); // speaker, listner, moderator
    const [isMuted, setIsMuted] = useState(false);
    const [hasRequested, setHasRequested] = useState(false);

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
                setListeners(data.listners || []);
                setRequests(data.requests || []);
                setUserRole(data.user_role);
            }
        } catch (error) {
            logger.error('Failed to fetch stage info:', error);
        }
    };

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
                setIsMuted(!isMuted);
                toast.success(isMuted ? t('ui.mikrofon_acildi') : '🔇 Mikrofon muted');
            }
        } catch (error) {
            toast.error(t('stage.micChangeFailed'));
        }
    };

    const inviteToSpeak = async (listnerId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/stages/${channelId}/invite/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: listnerId })
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
            <div className="stage-header">
                <div className="stage-info">
                    <h2>{stageInfo?.topic || t('ui.stage_channeli')</h2>
                    <p>{speakers.length} konuşmacı • {listners.length} dinleyici</p>
                </div>
                <button aria-label="Close" className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="stage-body">
                {/* Speakers Section */}
                <div className="speakers-section">
                    <h3>
                        <FaMicrophone /> Konuşmacılar
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
                                            <FaUserShield /> Moderator
                                        </span>
                                    )}
                                </div>
                                {userRole === 'moderator' && speaker.id !== userId && (
                                    <button
                                        aria-label="Action button"
                                        className="action-btn remove"
                                        onClick={() => removeSpeaker(speaker.id)}
                                        title="Dinleyiciye Al"
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
                            <FaHandPaper /> Konuşma İstaddri ({requests.length})>
                        </h3>
                        <div className="requests-list">
                            {requests.map(request => (
                                <div key={request.id} className="request-item">
                                    <img src={request.user.avatar} alt={request.user.username} />
                                    <span>{request.user.username}</span>
                                    <button
                                        aria-label="Action button"
                                        className="btn-approve"
                                        onClick={() => approveRequest(request.user.id)}>
                                        Confirm
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Listeners Section */}
                <div className="listners-section">
                    <h3>Dinleyicwithr</h3>
                    <div className="participants-grid">
                        {listners.map(listner => (
                            <div key={listner.id} className="participant-card listner">
                                <div className="participant-avatar">
                                    <img src={listner.avatar || '/default-avatar.png'} alt={listner.username} />
                                </div>
                                <div className="participant-info">
                                    <span className="participant-name">{listner.username}</span>
                                </div>
                                {userRole === 'moderator' && (
                                    <button
                                        aria-label="Action button"
                                        className="action-btn invite"
                                        onClick={() => inviteToSpeak(listner.id)}
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
                        aria-label="toggle Mute"
                        className={`control-btn ${isMuted ? 'muted' : ''}`}
                        onClick={toggleMute}>
                        {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                        {isMuted ? 'Mikrofonu Open' : 'Mute'}
                    </button>
                )}

                {userRole === 'listner' && !hasRequested && (
                    <button
                        aria-label="request To Speak" className="control-btn request" onClick={requestToSpeak}>
                        <FaHandPaper /> Konuşma İsteği Gönder
                    </button>
                )}

                {userRole === 'listner' && hasRequested && (
                    <button
                        aria-label="cancel Request" className="control-btn cancel-request" onClick={cancelRequest}>
                        ✋ İsteği İptal Et
                    </button>
                )}
            </div>
        </div>
    );
};

StageChannel.propTypes = {
    channelId: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
};
export default StageChannel;
