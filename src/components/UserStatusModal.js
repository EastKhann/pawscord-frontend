// components/UserStatusModal.js
// 🎨 Custom User Status Modal (Discord-style)

import React, { useState } from 'react';
import { FaTimes, FaSmile } from 'react-icons/fa';
import './UserStatusModal.css';

const UserStatusModal = ({ onClose, onSetStatus, currentStatus = '' }) => {
    const [statusText, setStatusText] = useState(currentStatus);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [clearAfter, setClearAfter] = useState('dont_clear');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const statusPresets = [
        { emoji: '🎮', text: 'Playing a game' },
        { emoji: '📺', text: 'Watching a movie' },
        { emoji: '🎵', text: 'Listening to music' },
        { emoji: '💼', text: 'Working' },
        { emoji: '📚', text: 'Studying' },
        { emoji: '🏃', text: 'Exercising' },
        { emoji: '🍕', text: 'Eating' },
        { emoji: '🌙', text: 'Sleeping' },
        { emoji: '🎉', text: 'Celebrating' },
        { emoji: '😎', text: 'Chilling' },
    ];

    const commonEmojis = [
        '😀', '😂', '🥰', '😎', '🤔', '😴', '🎮', '🎵',
        '💼', '📚', '☕', '🍕', '🎉', '🔥', '💪', '🌙'
    ];

    const handlePresetClick = (preset) => {
        setSelectedEmoji(preset.emoji);
        setStatusText(preset.text);
    };

    const handleSave = () => {
        onSetStatus({
            emoji: selectedEmoji,
            text: statusText,
            clearAfter: clearAfter
        });
        onClose();
    };

    const handleClear = () => {
        onSetStatus(null);
        onClose();
    };

    return (
        <div className="user-status-modal-overlay" onClick={onClose}>
            <div className="user-status-modal" onClick={(e) => e.stopPropagation()}>
                <div className="status-modal-header">
                    <h3>Set Custom Status</h3>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>

                <div className="status-modal-body">
                    {/* Status Presets */}
                    <div className="status-presets">
                        <h4>Quick Select</h4>
                        <div className="presets-grid">
                            {statusPresets.map((preset, idx) => (
                                <button
                                    key={idx}
                                    className="preset-btn"
                                    onClick={() => handlePresetClick(preset)}
                                >
                                    <span className="preset-emoji">{preset.emoji}</span>
                                    <span className="preset-text">{preset.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Status Input */}
                    <div className="status-input-section">
                        <h4>Custom Status</h4>
                        <div className="status-input-container">
                            <button
                                className="emoji-picker-btn"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                {selectedEmoji || <FaSmile />}
                            </button>
                            <input
                                type="text"
                                className="status-input"
                                placeholder="What's happening?"
                                value={statusText}
                                onChange={(e) => setStatusText(e.target.value)}
                                maxLength={128}
                            />
                            <span className="char-count">{statusText.length}/128</span>
                        </div>

                        {/* Simple Emoji Picker */}
                        {showEmojiPicker && (
                            <div className="simple-emoji-picker">
                                {commonEmojis.map((emoji, idx) => (
                                    <button
                                        key={idx}
                                        className="emoji-btn"
                                        onClick={() => {
                                            setSelectedEmoji(emoji);
                                            setShowEmojiPicker(false);
                                        }}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Clear After */}
                    <div className="clear-after-section">
                        <h4>Clear After</h4>
                        <select
                            value={clearAfter}
                            onChange={(e) => setClearAfter(e.target.value)}
                            className="clear-after-select"
                        >
                            <option value="dont_clear">Don't clear</option>
                            <option value="30min">30 minutes</option>
                            <option value="1h">1 hour</option>
                            <option value="4h">4 hours</option>
                            <option value="today">Today</option>
                        </select>
                    </div>
                </div>

                <div className="status-modal-footer">
                    <button
                        className="clear-status-btn"
                        onClick={handleClear}
                    >
                        Clear Status
                    </button>
                    <div className="action-buttons">
                        <button className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className="save-btn"
                            onClick={handleSave}
                            disabled={!statusText.trim()}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStatusModal;



