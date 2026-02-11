// frontend/src/components/StageChannel.js
import { useState, useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaHandPaper, FaUserShield, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import toast from '../utils/toast';
import './StageChannel.css';

const StageChannel = ({ channelId, userId, onClose }) => {
    const [stageInfo, setStageInfo] = useState(null);
    const [speakers, setSpeakers] = useState([]);
    const [listeners, setListeners] = useState([]);
    const [requests, setRequests] = useState([]);
    const [userRole, setUserRole] = useState('listener'); // speaker, listener, moderator
    const [isMuted, setIsMuted] = useState(false);
    const [hasRequested, setHasRequested] = useState(false);

    useEffect(() => {
        fetchStageInfo();
        const interval = setInterval(fetchStageInfo, 5000);
        return () => clearInterval(interval);
    }, [channelId]);

    const fetchStageInfo = async () => {
        try {
            const response = await fetch(`/api/stage/${channelId}/info/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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
            console.error('Failed to fetch stage info:', error);
        }
    };

    const requestToSpeak = async () => {
        try {
            const response = await fetch(`/api/stage/${channelId}/request/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                setHasRequested(true);
                toast.success('🎤 Konuşma isteği gönderildi');
            }
        } catch (error) {
            toast.error('❌ İstek gönderilemedi');
        }
    };

    const cancelRequest = async () => {
        try {
            const response = await fetch(`/api/stage/${channelId}/cancel-request/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                setHasRequested(false);
                toast.success('❌ İstek iptal edildi');
            }
        } catch (error) {
            toast.error('❌ İptal edilemedi');
        }
    };

    const approveRequest = async (requestUserId) => {
        try {
            const response = await fetch(`/api/stage/${channelId}/approve/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: requestUserId })
            });
            
            if (response.ok) {
                fetchStageInfo();
                toast.success('✅ Konuşmacı onaylandı');
            }
        } catch (error) {
            toast.error('❌ Onaylama başarısız');
        }
    };

    const removeSpeaker = async (speakerId) => {
        try {
            const response = await fetch(`/api/stage/${channelId}/remove-speaker/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: speakerId })
            });
            
            if (response.ok) {
                fetchStageInfo();
                toast.success('✅ Konuşmacı dinleyiciye alındı');
            }
        } catch (error) {
            toast.error('❌ İşlem başarısız');
        }
    };

    const toggleMute = async () => {
        try {
            const response = await fetch(`/api/stage/${channelId}/mute/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ muted: !isMuted })
            });
            
            if (response.ok) {
                setIsMuted(!isMuted);
                toast.success(isMuted ? '🎤 Mikrofon açıldı' : '🔇 Mikrofon kapatıldı');
            }
        } catch (error) {
            toast.error('❌ Mikrofon değiştirilemedi');
        }
    };

    const inviteToSpeak = async (listenerId) => {
        try {
            const response = await fetch(`/api/stage/${channelId}/invite/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: listenerId })
            });
            
            if (response.ok) {
                toast.success('✅ Davet gönderildi');
            }
        } catch (error) {
            toast.error('❌ Davet gönderilemedi');
        }
    };

    return (
        <div className="stage-channel">
            <div className="stage-header">
                <div className="stage-info">
                    <h2>{stageInfo?.topic || 'Stage Kanalı'}</h2>
                    <p>{speakers.length} konuşmacı • {listeners.length} dinleyici</p>
                </div>
                <button className="close-btn" onClick={onClose}>×</button>
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
                                            <FaUserShield /> Moderatör
                                        </span>
                                    )}
                                </div>
                                {userRole === 'moderator' && speaker.id !== userId && (
                                    <button 
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
                            <FaHandPaper /> Konuşma İstekleri ({requests.length})
                        </h3>
                        <div className="requests-list">
                            {requests.map(request => (
                                <div key={request.id} className="request-item">
                                    <img src={request.user.avatar} alt={request.user.username} />
                                    <span>{request.user.username}</span>
                                    <button 
                                        className="btn-approve"
                                        onClick={() => approveRequest(request.user.id)}
                                    >
                                        Onayla
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Listeners Section */}
                <div className="listeners-section">
                    <h3>Dinleyiciler</h3>
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
                                        className="action-btn invite"
                                        onClick={() => inviteToSpeak(listener.id)}
                                        title="Konuşmacı Olarak Davet Et"
                                    >
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
                        className={`control-btn ${isMuted ? 'muted' : ''}`}
                        onClick={toggleMute}
                    >
                        {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                        {isMuted ? 'Mikrofonu Aç' : 'Sustur'}
                    </button>
                )}
                
                {userRole === 'listener' && !hasRequested && (
                    <button className="control-btn request" onClick={requestToSpeak}>
                        <FaHandPaper /> Konuşma İsteği Gönder
                    </button>
                )}
                
                {userRole === 'listener' && hasRequested && (
                    <button className="control-btn cancel-request" onClick={cancelRequest}>
                        ✋ İsteği İptal Et
                    </button>
                )}
            </div>
        </div>
    );
};

export default StageChannel;
