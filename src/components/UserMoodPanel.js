import React, { useState, useEffect } from 'react';
import { moodApi } from '../services/niceToHaveApi';
import './UserMoodPanel.css';

const MOOD_OPTIONS = [
    { id: 'happy', emoji: '😊', label: 'Happy' },
    { id: 'sad', emoji: '😢', label: 'Sad' },
    { id: 'excited', emoji: '🤩', label: 'Excited' },
    { id: 'tired', emoji: '😴', label: 'Tired' },
    { id: 'focused', emoji: '🎯', label: 'Focused' },
    { id: 'creative', emoji: '🎨', label: 'Creative' },
    { id: 'gaming', emoji: '🎮', label: 'Gaming' },
    { id: 'working', emoji: '💼', label: 'Working' },
    { id: 'chill', emoji: '😎', label: 'Chill' },
    { id: 'music', emoji: '🎵', label: 'Music' },
    { id: 'coding', emoji: '💻', label: 'Coding' },
    { id: 'eating', emoji: '🍔', label: 'Eating' },
];

const DURATION_OPTIONS = [
    { hours: 1, label: '1h' },
    { hours: 4, label: '4h' },
    { hours: 8, label: '8h' },
    { hours: 24, label: '24h' },
    { hours: 0, label: 'Forever' },
];

function UserMoodPanel({ onClose }) {
    const [currentMood, setCurrentMood] = useState(null);
    const [selectedMood, setSelectedMood] = useState('happy');
    const [customEmoji, setCustomEmoji] = useState('');
    const [customText, setCustomText] = useState('');
    const [activity, setActivity] = useState('');
    const [expiresHours, setExpiresHours] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadMood();
    }, []);

    const loadMood = async () => {
        try {
            const data = await moodApi.getMood();
            if (data.mood) {
                setCurrentMood(data);
                setSelectedMood(data.mood);
                setCustomEmoji(data.custom_emoji || '');
                setCustomText(data.custom_text || '');
                setActivity(data.activity || '');
            }
        } catch (err) {
            console.error('Failed to load mood:', err);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await moodApi.setMood({
                mood: selectedMood,
                custom_emoji: customEmoji,
                custom_text: customText,
                activity: activity,
                expires_hours: expiresHours || null
            });

            loadMood();
            alert('Mood updated! 🎭');
        } catch (err) {
            alert('Failed to update mood: ' + err.message);
        }
        setLoading(false);
    };

    const handleClear = async () => {
        setLoading(true);
        try {
            await moodApi.setMood({
                mood: '',
                custom_emoji: '',
                custom_text: '',
                activity: ''
            });

            setCurrentMood(null);
            setSelectedMood('happy');
            setCustomEmoji('');
            setCustomText('');
            setActivity('');
        } catch (err) {
            alert('Failed to clear mood');
        }
        setLoading(false);
    };

    const getMoodEmoji = (moodId) => {
        return MOOD_OPTIONS.find(m => m.id === moodId)?.emoji || '😊';
    };

    const getMoodLabel = (moodId) => {
        return MOOD_OPTIONS.find(m => m.id === moodId)?.label || 'Unknown';
    };

    const previewEmoji = customEmoji || getMoodEmoji(selectedMood);
    const previewText = customText || getMoodLabel(selectedMood);

    return (
        <div className="user-mood-panel">
            <h2>🎭 Set Your Mood</h2>

            {currentMood && (
                <div className="current-mood">
                    <div className="mood-emoji">
                        {currentMood.custom_emoji || getMoodEmoji(currentMood.mood)}
                    </div>
                    <div className="mood-info">
                        <h3>{currentMood.custom_text || getMoodLabel(currentMood.mood)}</h3>
                        {currentMood.activity && <p>🎮 {currentMood.activity}</p>}
                        {currentMood.expires_at && (
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                Expires: {new Date(currentMood.expires_at).toLocaleString()}
                            </p>
                        )}
                    </div>
                </div>
            )}

            <div className="mood-selector">
                <label>Choose a Mood</label>
                <div className="mood-options">
                    {MOOD_OPTIONS.map(mood => (
                        <div
                            key={mood.id}
                            className={`mood-option ${selectedMood === mood.id ? 'selected' : ''}`}
                            onClick={() => setSelectedMood(mood.id)}
                        >
                            <div className="emoji">{mood.emoji}</div>
                            <div className="label">{mood.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mood-form">
                <div className="form-group">
                    <label>Custom Emoji (Optional)</label>
                    <div className="emoji-input-group">
                        <input
                            type="text"
                            value={customEmoji}
                            onChange={(e) => setCustomEmoji(e.target.value)}
                            placeholder="Paste an emoji..."
                            maxLength={4}
                        />
                        <button className="emoji-picker-btn">😀</button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Custom Status Text (Optional)</label>
                    <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="What are you up to?"
                        maxLength={100}
                    />
                </div>

                <div className="form-group">
                    <label>Current Activity (Optional)</label>
                    <input
                        type="text"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        placeholder="Playing Valorant, Watching Netflix..."
                        maxLength={100}
                    />
                </div>

                <div className="form-group">
                    <label>Duration</label>
                    <div className="duration-presets">
                        {DURATION_OPTIONS.map(opt => (
                            <button
                                key={opt.hours}
                                className={`duration-preset ${expiresHours === opt.hours ? 'selected' : ''}`}
                                onClick={() => setExpiresHours(opt.hours)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mood-preview">
                    <div className="preview-label">Preview</div>
                    <div className="preview-content">
                        <span className="preview-emoji">{previewEmoji}</span>
                        <span className="preview-text">{previewText}</span>
                    </div>
                </div>

                <button
                    className="save-mood-btn"
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : '✨ Update Mood'}
                </button>

                {currentMood && (
                    <button
                        className="clear-mood-btn"
                        onClick={handleClear}
                        disabled={loading}
                    >
                        Clear Mood
                    </button>
                )}
            </div>
        </div>
    );
}

export default UserMoodPanel;
