// frontend/src/hooks/useRoomManager.js
// 🏠 Room and conversation management

import { useEffect, useCallback } from 'react';
import logger from '../utils/logger';

export const useRoomManager = ({
    activeChat,
    setActiveRoom,
    setActiveConversation,
    fetchMessages,
    joinRoom
}) => {
    // Handle room changes
    useEffect(() => {
        if (!activeChat) return;

        if (activeChat.type === 'room') {
            setActiveRoom(activeChat.id);
            setActiveConversation(null);

            if (fetchMessages) {
                fetchMessages(activeChat.id, 'room');
            }

            if (joinRoom) {
                joinRoom(activeChat.id);
            }

            logger.log('📍 Switched to room:', activeChat.id);
        } else if (activeChat.type === 'dm') {
            setActiveConversation(activeChat.id);
            setActiveRoom(null);

            if (fetchMessages) {
                fetchMessages(activeChat.id, 'dm');
            }

            logger.log('💬 Switched to DM:', activeChat.id);
        }
    }, [activeChat, setActiveRoom, setActiveConversation, fetchMessages, joinRoom]);

    return {
        switchToRoom: useCallback((roomId) => {
            logger.log('🔄 Switching to room:', roomId);
            // Implement room switching logic
        }, []),

        switchToDM: useCallback((conversationId) => {
            logger.log('🔄 Switching to DM:', conversationId);
            // Implement DM switching logic
        }, [])
    };
};



