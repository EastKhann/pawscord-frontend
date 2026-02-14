/**
 * 📨 useMessageHandlers — Message sending, history, deletion, pinning, search
 * Extracted from App.js
 */
import { useCallback, useRef } from 'react';
import { encryptMessage } from '../utils/encryption';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';
import { getTemporaryId } from '../config/api';

export default function useMessageHandlers({
    activeChat, username, token, ws,
    encryptionKeys, setMessages, scrollToBottom, isNearBottom,
    setEditingMessage, setHasDraftMessage, setDraftText, persistDraft,
    setStickyMessage, richTextRef, fetchWithAuth,
    currentUserProfile, getDeterministicAvatar,
    historyCacheRef, setHasMoreMessages, setMessageHistoryOffset,
    setIsSummaryLoading, setSummaryResult, setPinnedMessages,
    setConversations, setMessageHistoryLoading,
    openModal, closeModal,
    API_BASE_URL, MESSAGE_HISTORY_ROOM_URL, MESSAGE_HISTORY_DM_URL,
}) {
    const readReceiptBufferRef = useRef([]);
    const readReceiptTimerRef = useRef(null);

    // --- 💬 SEND MESSAGE ---
    const sendMessage = useCallback((content) => {
        if (!content) return;
        const trimmed = content.trim();
        if (!trimmed) return;

        // Slash commands
        if (trimmed === '/tema') {
            openModal('themeStore');
            setEditingMessage(null); setHasDraftMessage(false); setDraftText(''); richTextRef.current?.clear?.();
            return;
        }
        if (trimmed === '/sablon') {
            openModal('templateModal');
            setEditingMessage(null); setHasDraftMessage(false); setDraftText(''); richTextRef.current?.clear?.();
            return;
        }
        if (trimmed.startsWith('/duyuru ')) {
            const announcement = trimmed.slice(8).trim();
            if (announcement) {
                const payload = {
                    type: activeChat.type === 'room' ? 'chat_message' : 'dm_message',
                    message: `[ANNOUNCE] ${announcement}`,
                    username: username,
                    temp_id: getTemporaryId(),
                    ...(activeChat.type === 'room' ? { room: activeChat.id } : { conversation: activeChat.id })
                };
                ws.current?.send(JSON.stringify(payload));
                setStickyMessage({ message: announcement, type: 'info', author: username });
                setEditingMessage(null); setHasDraftMessage(false); setDraftText(''); richTextRef.current?.clear?.();
                return;
            }
        }

        setEditingMessage(null); setHasDraftMessage(false); setDraftText(''); persistDraft('');

        const currentChatId = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
        const secretKey = encryptionKeys[currentChatId];
        let finalContent = trimmed;
        if (activeChat.type === 'dm' && secretKey) finalContent = encryptMessage(trimmed, secretKey);

        const payload = {
            type: activeChat.type === 'room' ? 'chat_message' : 'dm_message',
            message: finalContent,
            username: username,
            temp_id: getTemporaryId(),
            ...(activeChat.type === 'room' ? { room: activeChat.id } : { conversation: activeChat.id })
        };
        const jsonPayload = JSON.stringify(payload);

        const sendViaWebSocket = async () => {
            const maxWait = 3000;
            const checkInterval = 100;
            let waited = 0;
            while (ws.current && ws.current.readyState === WebSocket.CONNECTING && waited < maxWait) {
                await new Promise(resolve => setTimeout(resolve, checkInterval));
                waited += checkInterval;
            }
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                try { ws.current.send(jsonPayload); return true; } catch (error) { return false; }
            }
            return false;
        };

        const sendViaHTTP = async () => {
            try {
                const endpoint = activeChat.type === 'dm'
                    ? `${API_BASE_URL}/messages/send_dm/`
                    : `${API_BASE_URL}/messages/send/`;
                const httpPayload = activeChat.type === 'dm'
                    ? { conversation_id: activeChat.id, content: finalContent }
                    : { room: activeChat.id, content: finalContent };
                const response = await fetchWithAuth(endpoint, { method: 'POST', body: JSON.stringify(httpPayload) });
                return response.ok;
            } catch (error) { return false; }
        };

        (async () => {
            const wsSent = await sendViaWebSocket();
            if (!wsSent) await sendViaHTTP();
        })();

        setMessages(prev => {
            const newMessage = {
                ...payload,
                content: finalContent,
                timestamp: new Date().toISOString(),
                id: payload.temp_id,
                avatar: currentUserProfile?.avatar || getDeterministicAvatar(username)
            };
            const updatedMessages = [...prev, newMessage];
            const cacheKey = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
            if (historyCacheRef.current[cacheKey]) historyCacheRef.current[cacheKey].messages = updatedMessages;
            return updatedMessages;
        });

        richTextRef.current?.clear?.();
        scrollToBottom('smooth');
    }, [activeChat, username, encryptionKeys, ws, fetchWithAuth, currentUserProfile, getDeterministicAvatar, persistDraft]);

    // --- 💬 SEND SNIPPET ---
    const handleSendSnippet = useCallback((data) => {
        const payload = {
            type: activeChat.type === 'room' ? 'chat_message' : 'dm_message',
            message: "", username, temp_id: getTemporaryId(), snippet_data: data,
            ...(activeChat.type === 'room' ? { room: activeChat.id } : { conversation: activeChat.id })
        };
        ws.current?.send(JSON.stringify(payload));
        setMessages(prev => [...prev, {
            ...payload, timestamp: new Date().toISOString(), id: payload.temp_id,
            avatar: currentUserProfile?.avatar || getDeterministicAvatar(username)
        }]);
        closeModal('snippetModal');
    }, [activeChat, username, ws, currentUserProfile, getDeterministicAvatar]);

    // --- 📋 FETCH MESSAGE HISTORY ---
    const fetchMessageHistory = useCallback(async (isInitial = true, offset = 0) => {
        if (!activeChat.id) return;
        if (activeChat.type === 'voice') { setMessages([]); setHasMoreMessages(false); return; }

        setMessageHistoryLoading(true);
        const urlBase = activeChat.type === 'room' ? MESSAGE_HISTORY_ROOM_URL : MESSAGE_HISTORY_DM_URL;
        const key = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;

        try {
            const res = await fetchWithAuth(`${urlBase}${activeChat.id}/?limit=50&offset=${offset}`);
            if (res.ok) {
                const data = await res.json();
                const rawMessages = data.results || [];
                const validMessages = rawMessages.filter(msg => msg && typeof msg === 'object' && (msg.id || msg.temp_id));
                const newMsgs = validMessages.reverse();

                let combinedMessages = newMsgs;
                if (isInitial) {
                    setMessages(newMsgs);
                    setTimeout(() => scrollToBottom('auto'), 100);
                } else {
                    setMessages(prev => {
                        combinedMessages = [...newMsgs, ...prev];
                        return combinedMessages;
                    });
                }

                const nextOffset = isInitial ? newMsgs.length : offset + newMsgs.length;
                const hasMore = !!data.next;
                setHasMoreMessages(hasMore);
                if (!isInitial) setMessageHistoryOffset(nextOffset);

                const cachedExisting = historyCacheRef.current[key]?.messages || [];
                const cachedCombined = isInitial ? newMsgs : [...newMsgs, ...cachedExisting];
                historyCacheRef.current[key] = { messages: combinedMessages || cachedCombined, offset: nextOffset, hasMore };
            }
        } catch (e) { console.error('❌ [fetchMessageHistory] Error:', e); }
        setMessageHistoryLoading(false);
    }, [activeChat, fetchWithAuth, scrollToBottom]);

    // --- 🗑️ DELETE MESSAGE ---
    const handleDeleteMessage = useCallback(async (messageId) => {
        if (!await confirmDialog("Bu mesajı silmek istediğine emin misin?")) return;
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/messages/${messageId}/delete/`, { method: 'DELETE' });
            if (res.ok) setMessages(prev => prev.filter(m => m.id !== messageId));
        } catch (e) { console.error(e); }
    }, [fetchWithAuth, API_BASE_URL]);

    // --- 📌 TOGGLE PIN ---
    const handleTogglePin = useCallback(async (messageId) => {
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/messages/${messageId}/pin/`, { method: 'POST' });
            if (res.ok) {
                const data = await res.json();
                const isPinned = data.is_pinned ?? data.pinned ?? true;
                setMessages(prev => prev.map(m => m.id === messageId ? { ...m, is_pinned: isPinned } : m));
                if (isPinned) {
                    setPinnedMessages(prev => {
                        const msg = prev.find(p => p.id === messageId);
                        if (!msg) return prev; // will be added from messages state
                        return prev;
                    });
                    toast.success('📌 Mesaj sabitlendi');
                } else {
                    setPinnedMessages(prev => prev.filter(p => p.id !== messageId));
                    toast.success('📌 Sabitleme kaldırıldı');
                }
            }
        } catch (e) { console.error('Pin toggle error:', e); toast.error('❌ Sabitleme hatası'); }
    }, [fetchWithAuth, API_BASE_URL]);

    // --- 🔍 SEARCH MESSAGES ---
    const handleSearchMessages = useCallback(async (e, debouncedSearchQuery) => {
        e.preventDefault();
        if (!activeChat.id || !debouncedSearchQuery.trim()) {
            if (!debouncedSearchQuery.trim()) fetchMessageHistory(true, 0);
            return;
        }
        setMessageHistoryLoading(true);
        try {
            let url = `${API_BASE_URL}/messages/search/?q=${encodeURIComponent(debouncedSearchQuery)}`;
            if (activeChat.type === 'room') url += `&room=${activeChat.id}`;
            else url += `&dm=${activeChat.id}`;
            const res = await fetchWithAuth(url);
            if (res.ok) { const data = await res.json(); setMessages(data.results || data); }
        } catch (e) { console.error(e); }
        setMessageHistoryLoading(false);
    }, [activeChat, fetchWithAuth, fetchMessageHistory]);

    // --- 📊 SUMMARIZE ---
    const handleSummarize = useCallback(async () => {
        openModal('summary');
        setIsSummaryLoading(true); setSummaryResult("");
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/rooms/${activeChat.id}/summarize/`, { method: 'POST' });
            const data = await res.json();
            setSummaryResult(res.ok ? data.summary : "Hata: " + data.error);
        } catch (e) { setSummaryResult("Bağlantı hatası."); }
        setIsSummaryLoading(false);
    }, [activeChat, fetchWithAuth]);

    // --- 🧹 CLEAR CHAT ---
    const handleClearChat = useCallback(async () => {
        if (!await confirmDialog("Bu odadaki tüm mesajları silmek istediğine emin misin?")) return;
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/rooms/${activeChat.id}/clear/`, { method: 'POST' });
            if (res.ok) setMessages([]);
        } catch (e) { console.error(e); }
    }, [activeChat, fetchWithAuth]);

    // --- 🙈 HIDE CONVERSATION ---
    const handleHideConversation = useCallback(async (conversationId) => {
        if (!await confirmDialog("Bu sohbeti listenizden gizlemek istiyor musunuz?")) return;
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/conversations/${conversationId}/hide/`, { method: 'POST' });
            if (res.ok) {
                setConversations(prev => prev.filter(c => c.id !== conversationId));
                if (activeChat.type === 'dm' && activeChat.id === conversationId) window.dispatchEvent(new CustomEvent('setActiveChatWelcome'));
            }
        } catch (e) { console.error(e); }
    }, [activeChat, fetchWithAuth]);

    // --- ⚠️ ADMIN DELETE CONVERSATION ---
    const handleAdminDeleteConversation = useCallback(async (conversationId) => {
        if (!await confirmDialog("⚠️ ADMİN: Bu konuşmayı HER İKİ TARAFTAN KALICI OLARAK silmek istediğinize emin misiniz?\n\nBu işlem GERİ ALINAMAZ!")) return;
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/conversations/${conversationId}/admin-delete/`, { method: 'DELETE' });
            if (res.ok) {
                const data = await res.json();
                toast.success(`✅ ${data.deleted_messages} mesaj silindi. Katılımcılar: ${data.participants.join(', ')}`);
                setConversations(prev => prev.filter(c => c.id !== conversationId));
                if (activeChat.type === 'dm' && activeChat.id === conversationId) window.dispatchEvent(new CustomEvent('setActiveChatWelcome'));
            } else {
                const errorData = await res.json();
                toast.error(`❌ Hata: ${errorData.error || 'Silme işlemi başarısız'}`);
            }
        } catch (e) { console.error(e); toast.error('❌ Sunucuyla bağlantı hatası'); }
    }, [activeChat, fetchWithAuth]);

    // --- ✅ READ RECEIPTS ---
    const handleMessageVisible = useCallback((messageId) => {
        readReceiptBufferRef.current.push(messageId);
        if (readReceiptTimerRef.current) return;
        readReceiptTimerRef.current = setTimeout(async () => {
            const ids = [...new Set(readReceiptBufferRef.current)];
            readReceiptBufferRef.current = [];
            readReceiptTimerRef.current = null;
            if (ids.length === 0) return;
            try {
                const res = await fetchWithAuth(`${API_BASE_URL}/messages/mark_read/`, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message_ids: ids })
                });
                if (res.ok) {
                    setMessages(prev => prev.map(m =>
                        ids.includes(m.id) ? { ...m, read_by: [...(m.read_by || []), username] } : m
                    ));
                }
            } catch (e) { /* silent */ }
        }, 1500);
    }, [fetchWithAuth, username]);

    // --- 📜 SCROLL TO MESSAGE ---
    const scrollToMessage = useCallback((msgId) => {
        const el = document.getElementById(`message-${msgId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, []);

    return {
        sendMessage,
        handleSendSnippet,
        fetchMessageHistory,
        handleDeleteMessage,
        handleTogglePin,
        handleSearchMessages,
        handleSummarize,
        handleClearChat,
        handleHideConversation,
        handleAdminDeleteConversation,
        handleMessageVisible,
        scrollToMessage,
    };
}
