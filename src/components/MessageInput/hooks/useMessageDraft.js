// frontend/src/components/MessageInput/hooks/useMessageDraft.js
import { useState, useEffect, useRef } from 'react';

const useMessageDraft = (activeChat, fetchWithAuth, apiBaseUrl, message, setMessage) => {
    const [draftSaved, setDraftSaved] = useState(false);
    const draftTimerRef = useRef(null);

    // Draft loading on chat change
    useEffect(() => {
        if (!activeChat || !fetchWithAuth || !apiBaseUrl) return;
        if (activeChat.type !== 'room' && activeChat.type !== 'dm') return;

        const loadDraft = async () => {
            try {
                const chatKey = activeChat.type === 'room' ? `room_${activeChat.id}` : `dm_${activeChat.id}`;
                const response = await fetchWithAuth(`${apiBaseUrl}/api/drafts/${chatKey}/`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.content) {
                        setMessage(data.content);
                        setDraftSaved(true);
                    }
                }
            } catch (error) { /* silent */ }
        };

        loadDraft();
    }, [activeChat, fetchWithAuth, apiBaseUrl, setMessage]);

    // Draft auto-save every 2s
    useEffect(() => {
        if (!activeChat || !fetchWithAuth || !apiBaseUrl) return;
        if (activeChat.type !== 'room' && activeChat.type !== 'dm') return;
        if (!message.trim()) return;

        if (draftTimerRef.current) clearTimeout(draftTimerRef.current);

        draftTimerRef.current = setTimeout(async () => {
            try {
                const chatKey = activeChat.type === 'room' ? `room_${activeChat.id}` : `dm_${activeChat.id}`;
                await fetchWithAuth(`${apiBaseUrl}/api/drafts/save/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_key: chatKey, content: message })
                });
                setDraftSaved(true);
                setTimeout(() => setDraftSaved(false), 1000);
            } catch (error) { /* silent */ }
        }, 2000);

        return () => { if (draftTimerRef.current) clearTimeout(draftTimerRef.current); };
    }, [message, activeChat, fetchWithAuth, apiBaseUrl]);

    // Delete draft on send
    const clearDraft = () => {
        if (activeChat && fetchWithAuth && apiBaseUrl && (activeChat.type === 'room' || activeChat.type === 'dm')) {
            const chatKey = activeChat.type === 'room' ? `room_${activeChat.id}` : `dm_${activeChat.id}`;
            fetchWithAuth(`${apiBaseUrl}/api/drafts/${chatKey}/`, { method: 'DELETE' }).catch(console.error);
        }
    };

    return { draftSaved, clearDraft };
};

export default useMessageDraft;
