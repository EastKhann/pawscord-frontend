// frontend/src/components/StageChannelPanel.js
import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import './StageChannelPanel.css';

const StageChannelPanel = ({ roomId, apiBaseUrl, onClose, currentUser }) => {
    const [activeStages, setActiveStages] = useState([]);
    const [selectedStage, setSelectedStage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('list'); // 'list' or 'create'
    const [newStage, setNewStage] = useState({
        topic: '',
        description: '',
        max_speakers: 10,
        max_audience: 1000,
        is_public: true
    });

    useEffect(() => {
        fetchActiveStages();
        const interval = setInterval(fetchActiveStages, 5000); // Refresh every 5s
        return () => clearInterval(interval);
    }, [roomId]);

    const fetchActiveStages = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const url = roomId 
                ? `${apiBaseUrl}/stages/active/` 
                : `${apiBaseUrl}/stages/active/`;
            
            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setActiveStages(Array.isArray(data) ? data : data.stages || []);
            }
        } catch (error) {
            console.error('Stages fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateStage = async () => {
        if (!newStage.topic.trim()) {
            toast.error('⚠️ Konu başlığı gerekli');
            return;
        }

        if (!roomId) {
            toast.error('⚠️ Lütfen bir ses kanalında olun');
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/stages/create/${roomId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStage)
            });

            if (response.ok) {
                const data = await response.json();
                setActiveStages([...activeStages, data.stage]);
                setNewStage({ topic: '', description: '', max_speakers: 10, max_audience: 1000, is_public: true });
                setView('list');
                toast.success('✅ Stage oluşturuldu!');
            } else {
                const error = await response.json();
                toast.error(error.error || '❌ Stage oluşturulamadı');
            }
        } catch (error) {
            console.error('Stage creation error:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    const handleJoinStage = async (stageId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/stages/${stageId}/join/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('🎙️ Stage\'e katıldın!');
                fetchActiveStages();
            } else {
                const error = await response.json();
                toast.error(error.error || '❌ Stage\'e katılamadın');
            }
        } catch (error) {
            console.error('Join stage error:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    const handleLeaveStage = async (stageId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/stages/${stageId}/leave/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('👋 Stage\'den ayrıldın');
                fetchActiveStages();
            }
        } catch (error) {
            console.error('Leave stage error:', error);
        }
    };

    const handleRequestToSpeak = async (stageId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/stages/${stageId}/request-speak/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('✋ Konuşma talebi gönderildi');
            }
        } catch (error) {
            console.error('Request speak error:', error);
        }
    };

    const handleInviteSpeaker = async (stageId, username) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/stages/${stageId}/invite-speaker/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });

            if (response.ok) {
                toast.success(`✅ ${username} konuşmacı olarak davet edildi`);
            }
        } catch (error) {
            console.error('Invite speaker error:', error);
        }
    };

    const getRoleIcon = (role) => {
        const icons = {
            host: '👑',
            moderator: '🛡️',
            speaker: '🎙️',
            listener: '👂'
        };
        return icons[role] || '👤';
    };

    const getRoleColor = (role) => {
        const colors = {
            host: '#faa61a',
            moderator: '#8b5cf6',
            speaker: '#34c759',
            listener: '#6c6d7d'
        };
        return colors[role] || '#6c6d7d';
    };

    if (loading) {
        return (
            <div className="stage-overlay" onClick={onClose}>
                <div className="stage-panel" onClick={e => e.stopPropagation()}>
                    <div className="stage-loading">
                        <div className="spinner"></div>
                        <p>Yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="stage-overlay" onClick={onClose}>
            <div className="stage-panel" onClick={e => e.stopPropagation()}>
                <div className="stage-header">
                    <h2>🎙️ Stage Kanalları</h2>
                    <div className="header-actions">
                        {roomId && (
                            <>
                                <button 
                                    className={`view-toggle ${view === 'list' ? 'active' : ''}`}
                                    onClick={() => setView('list')}
                                >
                                    📋 Aktif Stage'ler
                                </button>
                                <button 
                                    className={`view-toggle ${view === 'create' ? 'active' : ''}`}
                                    onClick={() => setView('create')}
                                >
                                    ➕ Oluştur
                                </button>
                            </>
                        )}
                        <button className="close-btn" onClick={onClose}>✕</button>
                    </div>
                </div>

                <div className="stage-content">
                    {view === 'list' ? (
                        <div className="stages-list">
                            {activeStages.length > 0 ? (
                                activeStages.map(stage => (
                                    <div key={stage.id} className="stage-card">
                                        <div className="stage-info">
                                            <div className="stage-icon">🎙️</div>
                                            <div className="stage-details">
                                                <h3>{stage.topic}</h3>
                                                {stage.description && (
                                                    <p className="stage-description">{stage.description}</p>
                                                )}
                                                <div className="stage-meta">
                                                    <span>👑 Host: {stage.host_username}</span>
                                                    <span>🎙️ {stage.speakers_count || 0} konuşmacı</span>
                                                    <span>👂 {stage.audience_count || 0} dinleyici</span>
                                                </div>
                                            </div>
                                        </div>

                                        {stage.speakers && stage.speakers.length > 0 && (
                                            <div className="speakers-list">
                                                <h4>Konuşmacılar</h4>
                                                <div className="speakers-grid">
                                                    {stage.speakers.slice(0, 6).map((speaker, idx) => (
                                                        <div key={idx} className="speaker-badge">
                                                            <span 
                                                                className="role-icon"
                                                                style={{ color: getRoleColor(speaker.role) }}
                                                            >
                                                                {getRoleIcon(speaker.role)}
                                                            </span>
                                                            <span className="speaker-name">{speaker.username}</span>
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
                                                    className="join-stage-btn"
                                                    onClick={() => handleJoinStage(stage.id)}
                                                >
                                                    🎧 Dinle
                                                </button>
                                            ) : (
                                                <>
                                                    <button 
                                                        className="leave-stage-btn"
                                                        onClick={() => handleLeaveStage(stage.id)}
                                                    >
                                                        👋 Ayrıl
                                                    </button>
                                                    {stage.user_role === 'listener' && (
                                                        <button 
                                                            className="request-speak-btn"
                                                            onClick={() => handleRequestToSpeak(stage.id)}
                                                        >
                                                            ✋ Konuşmak İstiyorum
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-stages">
                                    <p>🎙️ Aktif stage yok</p>
                                    {roomId && (
                                        <button onClick={() => setView('create')}>
                                            İlk stage'i oluştur
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="create-stage-form">
                            <h3>🎙️ Yeni Stage Oluştur</h3>

                            <div className="form-group">
                                <label>Konu Başlığı *</label>
                                <input
                                    type="text"
                                    placeholder="Konuşma konusu..."
                                    value={newStage.topic}
                                    onChange={(e) => setNewStage({ ...newStage, topic: e.target.value })}
                                    maxLength={100}
                                />
                            </div>

                            <div className="form-group">
                                <label>Açıklama</label>
                                <textarea
                                    placeholder="Stage hakkında detaylar..."
                                    value={newStage.description}
                                    onChange={(e) => setNewStage({ ...newStage, description: e.target.value })}
                                    rows={4}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Maks. Konuşmacı (1-10)</label>
                                    <input
                                        type="number"
                                        value={newStage.max_speakers}
                                        onChange={(e) => setNewStage({ ...newStage, max_speakers: Math.min(10, Math.max(1, parseInt(e.target.value) || 1)) })}
                                        min="1"
                                        max="10"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Maks. Dinleyici</label>
                                    <input
                                        type="number"
                                        value={newStage.max_audience}
                                        onChange={(e) => setNewStage({ ...newStage, max_audience: Math.min(1000, Math.max(1, parseInt(e.target.value) || 100)) })}
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
                                        onChange={(e) => setNewStage({ ...newStage, is_public: e.target.checked })}
                                    />
                                    <span>🌍 Herkese Açık</span>
                                </label>
                            </div>

                            <div className="form-actions">
                                <button className="submit-btn" onClick={handleCreateStage}>
                                    ✨ Stage Oluştur
                                </button>
                                <button className="cancel-btn" onClick={() => setView('list')}>
                                    İptal
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StageChannelPanel;
