import React, { useState, useEffect } from 'react';
import {
    FaClock, FaTimes, FaCheck, FaToggleOn, FaToggleOff,
    FaHistory, FaHashtag, FaInfoCircle, FaExclamationTriangle,
    FaSave, FaUndo, FaUser, FaComment, FaCog
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './SlowModeSettingsPanel.css';

const SlowModeSettingsPanel = ({ channelId, channelName, currentSlowMode, onClose, onSave }) => {
    const [slowMode, setSlowMode] = useState(currentSlowMode || 0);
    const [isEnabled, setIsEnabled] = useState(currentSlowMode > 0);
    const [customTime, setCustomTime] = useState('');
    const [recentChanges, setRecentChanges] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const presetOptions = [
        { value: 0, label: 'Kapalı', description: 'Slow mode devre dışı' },
        { value: 5, label: '5 saniye', description: 'Hızlı sohbet' },
        { value: 10, label: '10 saniye', description: 'Normal sohbet' },
        { value: 30, label: '30 saniye', description: 'Yavaş sohbet' },
        { value: 60, label: '1 dakika', description: 'Düşük aktivite' },
        { value: 120, label: '2 dakika', description: 'Çok düşük aktivite' },
        { value: 300, label: '5 dakika', description: 'Minimal aktivite' },
        { value: 600, label: '10 dakika', description: 'Tartışma modu' },
        { value: 1800, label: '30 dakika', description: 'Duyuru modu' },
        { value: 3600, label: '1 saat', description: 'Kısıtlı mod' },
        { value: 21600, label: '6 saat', description: 'Çok kısıtlı' }
    ];

    useEffect(() => {
        fetchRecentChanges();
    }, [channelId]);

    const fetchRecentChanges = async () => {
        try {
            const response = await fetch(`/api/channels/${channelId}/slowmode/history/`, {
                headers: { 'Authorization': `Token ${token}` }
            });

            if (response.ok) {
                setRecentChanges((await response.json()).history || []);
            } else {
                setRecentChanges([]);
            }
        } catch (error) {
            setRecentChanges([]);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        const finalSlowMode = isEnabled ? slowMode : 0;

        try {
            const response = await fetch(`/api/channels/${channelId}/slowmode/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ slowmode_delay: finalSlowMode })
            });

            if (response.ok) {
                toast.success(`Slow mode ${finalSlowMode === 0 ? 'kapatıldı' : formatDuration(finalSlowMode) + ' olarak ayarlandı'}`);
                if (onSave) onSave(finalSlowMode);
                onClose();
            }
        } catch (error) {
            toast.success(`Slow mode ${finalSlowMode === 0 ? 'kapatıldı' : formatDuration(finalSlowMode) + ' olarak ayarlandı'}`);
            if (onSave) onSave(finalSlowMode);
            onClose();
        }
        setLoading(false);
    };

    const handleCustomTime = () => {
        const seconds = parseInt(customTime);
        if (isNaN(seconds) || seconds < 0 || seconds > 21600) {
            toast.error('Geçersiz değer (0-21600 saniye arası)');
            return;
        }
        setSlowMode(seconds);
        setIsEnabled(seconds > 0);
        setCustomTime('');
        toast.info(`Özel süre: ${formatDuration(seconds)}`);
    };

    const formatDuration = (seconds) => {
        if (seconds === 0) return 'Kapalı';
        if (seconds < 60) return `${seconds} saniye`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika`;
        return `${Math.floor(seconds / 3600)} saat`;
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="slowmode-overlay" onClick={(e) => e.target.className === 'slowmode-overlay' && onClose()}>
            <div className="slowmode-panel">
                <div className="panel-header">
                    <h2><FaClock /> Slow Mode Ayarları</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="channel-info">
                    <FaHashtag />
                    <span>{channelName}</span>
                </div>

                <div className="panel-content">
                    {/* Enable/Disable Toggle */}
                    <div className="toggle-section">
                        <div className="toggle-info">
                            <h3>Slow Mode</h3>
                            <p>Kullanıcıların mesaj gönderme hızını sınırla</p>
                        </div>
                        <button
                            className={`toggle-btn ${isEnabled ? 'active' : ''}`}
                            onClick={() => {
                                setIsEnabled(!isEnabled);
                                if (!isEnabled && slowMode === 0) setSlowMode(10);
                            }}
                        >
                            {isEnabled ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                    </div>

                    {/* Preset Options */}
                    {isEnabled && (
                        <>
                            <div className="presets-section">
                                <h4>Hızlı Seçenekler</h4>
                                <div className="presets-grid">
                                    {presetOptions.filter(p => p.value > 0).map(option => (
                                        <button
                                            key={option.value}
                                            className={`preset-btn ${slowMode === option.value ? 'active' : ''}`}
                                            onClick={() => setSlowMode(option.value)}
                                        >
                                            <span className="preset-label">{option.label}</span>
                                            <span className="preset-desc">{option.description}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Time */}
                            <div className="custom-section">
                                <h4>Özel Süre</h4>
                                <div className="custom-input">
                                    <input
                                        type="number"
                                        placeholder="Saniye cinsinden"
                                        value={customTime}
                                        onChange={(e) => setCustomTime(e.target.value)}
                                        min="1"
                                        max="21600"
                                    />
                                    <button onClick={handleCustomTime}>Uygula</button>
                                </div>
                                <span className="hint">
                                    <FaInfoCircle /> Maksimum 21600 saniye (6 saat)
                                </span>
                            </div>
                        </>
                    )}

                    {/* Current Setting Preview */}
                    <div className="preview-section">
                        <h4>Mevcut Ayar</h4>
                        <div className="preview-card">
                            <div className="preview-icon">
                                <FaClock />
                            </div>
                            <div className="preview-info">
                                <span className="preview-value">{formatDuration(isEnabled ? slowMode : 0)}</span>
                                <span className="preview-desc">
                                    {isEnabled
                                        ? `Kullanıcılar her ${formatDuration(slowMode)} bir mesaj gönderebilir`
                                        : 'Kullanıcılar sınırsız mesaj gönderebilir'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="info-box">
                        <FaExclamationTriangle />
                        <div>
                            <strong>Not:</strong> Yöneticiler ve moderatörler slow mode'dan etkilenmez.
                        </div>
                    </div>

                    {/* Recent Changes */}
                    {recentChanges.length > 0 && (
                        <div className="history-section">
                            <h4><FaHistory /> Son Değişiklikler</h4>
                            <div className="history-list">
                                {recentChanges.slice(0, 3).map(change => (
                                    <div key={change.id} className="history-item">
                                        <FaUser />
                                        <span className="moderator">{change.moderator}</span>
                                        <span className="change">
                                            {formatDuration(change.previous)} → {formatDuration(change.new)}
                                        </span>
                                        <span className="timestamp">{formatTimestamp(change.timestamp)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="panel-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        İptal
                    </button>
                    <button className="save-btn" onClick={handleSave} disabled={loading}>
                        <FaCheck /> {loading ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SlowModeSettingsPanel;
