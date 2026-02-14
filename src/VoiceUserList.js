// frontend/src/VoiceUserList.js
import React, { useState, useEffect, useCallback } from 'react';
import { useGlobalWebSocket } from './GlobalWebSocketContext';
import SparkMD5 from 'spark-md5';
import styles from './VoiceUserList/styles';
import VoiceUserItem from './VoiceUserList/VoiceUserItem';
import VoiceUserContextMenu from './VoiceUserList/VoiceUserContextMenu';

const getDeterministicAvatar = (username) => {
    if (!username) return 'https://ui-avatars.com/api/?name=User&background=5865f2&color=fff&bold=true&size=128';
    const hash = SparkMD5.hash(username);
    const hue = parseInt(hash.substring(0, 8), 16) % 360;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${hue.toString(16).padStart(2, '0')}${((hue + 60) % 360).toString(16).padStart(2, '0')}${((hue + 120) % 360).toString(16).padStart(2, '0')}&color=fff&bold=true&size=128`;
};

const VoiceUserList = ({
    voiceUsers: propVoiceUsers, roomName, currentUsername,
    remoteVolumes, setRemoteVolume, isClientInThisChannel, isPttActive,
    onUserAction, isAdmin, voiceChannels,
    friendsList = [], getDeterministicAvatar: propGetDeterministicAvatar, allUsers = []
}) => {
    const getAvatar = propGetDeterministicAvatar || getDeterministicAvatar;

    const [contextMenu, setContextMenu] = useState(null);
    const [showMoveMenu, setShowMoveMenu] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedUser, setDraggedUser] = useState(null);

    const { globalData } = useGlobalWebSocket();

    useEffect(() => {
        if (contextMenu) {
            const handleClick = () => setContextMenu(null);
            window.addEventListener('click', handleClick);
            return () => window.removeEventListener('click', handleClick);
        }
    }, [contextMenu]);

    const voiceUsers = propVoiceUsers || globalData?.voice_users || {};
    const usersInRoom = (voiceUsers && typeof voiceUsers === 'object' && !Array.isArray(voiceUsers))
        ? (voiceUsers[roomName] || []) : [];

    const handleVolumeChange = useCallback((user, event) => {
        setRemoteVolume(user, parseInt(event.target.value, 10));
    }, [setRemoteVolume]);

    const handleContextMenu = useCallback((e, userObj) => {
        e.preventDefault();
        if (userObj.username !== currentUsername)
            setContextMenu({ x: e.clientX, y: e.clientY, user: userObj });
    }, [currentUsername]);

    const closeContextMenu = useCallback(() => {
        setContextMenu(null); setShowMoveMenu(false);
    }, []);

    const handleMenuAction = useCallback((action, targetChannel) => {
        if (contextMenu && onUserAction) {
            if (action === 'move' && targetChannel) onUserAction(action, contextMenu.user.username, targetChannel);
            else onUserAction(action, contextMenu.user.username);
        }
        closeContextMenu();
    }, [contextMenu, onUserAction, closeContextMenu]);

    const handleUserClick = useCallback((userObj) => {
        if (userObj.username !== currentUsername && onUserAction) onUserAction('profile', userObj.username);
    }, [currentUsername, onUserAction]);

    const handleDragStart = useCallback((e, userObj) => {
        if (!isAdmin) return;
        setIsDragging(true); setDraggedUser(userObj.username);
        e.dataTransfer.setData('application/json', JSON.stringify({ username: userObj.username, fromChannel: roomName }));
        e.dataTransfer.effectAllowed = 'move';
        const ghost = document.createElement('div');
        ghost.style.cssText = 'position:fixed;top:-1000px;background:linear-gradient(135deg,#5865f2,#7289da);color:#fff;padding:8px 16px;border-radius:10px;font-size:13px;font-weight:600;box-shadow:0 4px 20px rgba(88,101,242,0.6);display:flex;align-items:center;gap:8px;z-index:99999;';
        ghost.textContent = '\uD83D\uDD00 ' + userObj.username;
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 60, 20);
        setTimeout(() => document.body.removeChild(ghost), 0);
    }, [isAdmin, roomName]);

    const handleDragEnd = useCallback(() => { setIsDragging(false); setDraggedUser(null); }, []);

    if (!voiceUsers || typeof voiceUsers !== 'object' || Array.isArray(voiceUsers)) return null;
    if (!Array.isArray(usersInRoom) || usersInRoom.length === 0) return null;

    return (
        <div style={styles.container}>
            <div style={styles.userList}>
                {usersInRoom.map((userObj) => (
                    <VoiceUserItem
                        key={userObj.username}
                        userObj={userObj}
                        isSelf={userObj.username === currentUsername}
                        getAvatar={getAvatar}
                        allUsers={allUsers}
                        isAdmin={isAdmin}
                        isDragging={isDragging}
                        draggedUser={draggedUser}
                        isClientInThisChannel={isClientInThisChannel}
                        isPttActive={isPttActive}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onContextMenu={handleContextMenu}
                        onClick={handleUserClick}
                    />
                ))}
            </div>

            <VoiceUserContextMenu
                contextMenu={contextMenu}
                currentUsername={currentUsername}
                isAdmin={isAdmin}
                isClientInThisChannel={isClientInThisChannel}
                remoteVolumes={remoteVolumes}
                handleVolumeChange={handleVolumeChange}
                handleMenuAction={handleMenuAction}
                showMoveMenu={showMoveMenu}
                setShowMoveMenu={setShowMoveMenu}
                voiceChannels={voiceChannels}
                roomName={roomName}
                getAvatar={getAvatar}
                allUsers={allUsers}
                friendsList={friendsList}
            />
        </div>
    );
};

export default React.memo(VoiceUserList);