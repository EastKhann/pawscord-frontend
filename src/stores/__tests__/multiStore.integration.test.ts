import { describe, expect, it, beforeEach } from 'vitest';

import { useChatStore } from '../useChatStore';
import { useServerStore } from '../useServerStore';
import { useUIStore } from '../useUIStore';
import { useUserStore } from '../useUserStore';
import { useVoiceStore } from '../useVoiceStore';

describe('multi-store integration', () => {
    beforeEach(() => {
        useChatStore.getState().reset();
        useServerStore.getState().reset();
        useUIStore.getState().resetTransient();
        useUserStore.getState().reset();
        useVoiceStore.getState().reset();
    });

    it('keeps user, server, chat, and UI state coherent during room join flow', () => {
        useUserStore.getState().setUser({ id: 7, username: 'alice' } as any);
        useUserStore.getState().setProfile({ username: 'alice' });

        useServerStore.getState().addServer({ id: 42, name: 'Pawscord HQ' } as any);
        useServerStore.getState().selectServer({ id: 42, name: 'Pawscord HQ' } as any);

        useChatStore.getState().setActiveChat('room', 1001, null);
        useChatStore.getState().incrementUnread('room-1001');

        useVoiceStore.getState().joinVoiceRoom('voice-1001', 42);
        useUIStore.getState().openModal('voicePanel', { roomId: 'voice-1001' });

        expect(useUserStore.getState().isAuthenticated).toBe(true);
        expect(useServerStore.getState().selectedServer?.id).toBe(42);
        expect(useChatStore.getState().activeChat.id).toBe(1001);
        expect(useChatStore.getState().unreadCounts['room-1001']).toBe(1);
        expect(useVoiceStore.getState().isInVoiceChat).toBe(true);
        expect(useUIStore.getState().modals.voicePanel).toBe(true);
    });
});
