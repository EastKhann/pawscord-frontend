// components/UserNicknameModal.js
// 👤 Server-Specific Nickname Modal

import React, { useState } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaUser } from 'react-icons/fa';
import './UserNicknameModal.css';

const UserNicknameModal = ({ user, serverId, currentNickname, onClose, onSave }) => {
    const [nickname, setNickname] = useState(currentNickname || '');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch('/api/servers/nickname/set/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                    server_id: serverId,
                    user_id: user.id,
                    nickname: nickname.trim()
                })
            });

            if (response.ok) {
                onSave(nickname.trim());
                onClose();
            } else {
                throw new Error('Failed to set nickname');
            }
        } catch (error) {
            console.error('Nickname error:', error);
            toast.error('❌ Failed to set nickname');
        } finally {
            setSaving(false);
        }
    };

    const handleClear = () => {
        setNickname('');
    };

    return (
        <div className="nickname-modal-overlay" onClick={onClose}>
            <div className="nickname-modal" onClick={(e) => e.stopPropagation()}>
                <div className="nickname-header">
                    <div className="header-title">
                        <FaUser />
                        <h3>Change Nickname</h3>
                    </div>
                    <button onClick={onClose} className="close-btn">
                        <FaTimes />
                    </button>
                </div>

                <div className="nickname-body">
                    <div className="user-info">
                        <img
                            src={user.avatar || '/default-avatar.png'}
                            alt={user.username}
                            className="user-avatar"
                        />
                        <div className="user-details">
                            <div className="username">{user.username}</div>
                            <div className="current-nick">
                                Current: {currentNickname || user.username}
                            </div>
                        </div>
                    </div>

                    <div className="nickname-input-section">
                        <label>Server Nickname</label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder={user.username}
                            maxLength={32}
                        />
                        <div className="char-count">{nickname.length}/32</div>
                        <p className="hint">
                            Leave empty to use the default username
                        </p>
                    </div>
                </div>

                <div className="nickname-footer">
                    <button className="clear-btn" onClick={handleClear}>
                        Reset
                    </button>
                    <div className="action-buttons">
                        <button className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className="save-btn"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserNicknameModal;



