// hooks/useDraftMessages.js
// 💾 Auto-save Draft Messages Hook

import { useState, useEffect } from 'react';

const DRAFT_PREFIX = 'pawscord_draft_';
const AUTO_SAVE_DELAY = 1000; // 1 second

interface DraftData {
    content: string;
    timestamp: string;
    roomId: string | number | null;
    conversationId: string | number | null;
}

export const useDraftMessages = (
    roomId: string | number | null,
    conversationId: string | number | null = null
) => {
    const draftKey = conversationId
        ? `${DRAFT_PREFIX}conv_${conversationId}`
        : `${DRAFT_PREFIX}room_${roomId}`;

    const [draft, setDraft] = useState('');
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Load draft on mount or when room/conversation changes
    useEffect(() => {
        const savedDraft = localStorage.getItem(draftKey);
        if (savedDraft) {
            try {
                const parsed = JSON.parse(savedDraft) as DraftData;
                setDraft(parsed.content || '');
                setLastSaved(new Date(parsed.timestamp));
            } catch (_e) {
                // Fallback to plain text
                setDraft(savedDraft);
            }
        } else {
            setDraft('');
        }
    }, [draftKey]);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            if (draft.trim()) {
                const draftData: DraftData = {
                    content: draft,
                    timestamp: new Date().toISOString(),
                    roomId,
                    conversationId,
                };
                localStorage.setItem(draftKey, JSON.stringify(draftData));
                setLastSaved(new Date());
            } else {
                // Clear draft if empty
                localStorage.removeItem(draftKey);
                setLastSaved(null);
            }
        }, AUTO_SAVE_DELAY);

        return () => clearTimeout(timer);
    }, [draft, draftKey, roomId, conversationId]);

    const clearDraft = () => {
        localStorage.removeItem(draftKey);
        setDraft('');
        setLastSaved(null);
    };

    const hasDraft = draft.trim().length > 0;

    return {
        draft,
        setDraft,
        clearDraft,
        hasDraft,
        lastSaved,
    };
};

// Get all drafts (for drafts list)
export const getAllDrafts = (): (DraftData & { key: string })[] => {
    const drafts: (DraftData & { key: string })[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(DRAFT_PREFIX)) {
            try {
                const raw = localStorage.getItem(key);
                if (!raw) continue;
                const draft = JSON.parse(raw) as DraftData;
                drafts.push({
                    key,
                    ...draft,
                });
            } catch (_e) {
                // Skip invalid drafts
            }
        }
    }
    return drafts.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
};

// Clear all drafts
export const clearAllDrafts = () => {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(DRAFT_PREFIX)) {
            keys.push(key);
        }
    }
    keys.forEach((key) => localStorage.removeItem(key));
};

export default useDraftMessages;
