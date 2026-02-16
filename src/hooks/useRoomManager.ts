// frontend/src/hooks/useRoomManager.ts
// Room and conversation management

import { useEffect, useCallback } from 'react';
import logger from '../utils/logger';

interface ActiveChat {
    type: 'room' | 'dm' | 'welcome';
    id: string | number;
    targetUser?: string | null;
}

interface UseRoomManagerOptions {
    activeChat: ActiveChat | null;
    setActiveRoom: (roomId: string | number | null) => void;
    setActiveConversation: (convId: string | number | null) => void;
    fetchMessages?: (id: string | number, type: string) => void;
    joinRoom?: (roomId: string | number) => void;
}

interface UseRoomManagerResult {
    switchToRoom: (roomId: string | number) => void;
    switchToDM: (conversationId: string | number) => void;
}

export const useRoomManager = ({
    activeChat,
    setActiveRoom,
    setActiveConversation,
    fetchMessages,
    joinRoom
}: UseRoomManagerOptions): UseRoomManagerResult => {
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



