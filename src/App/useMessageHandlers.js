/**
 * useMessageHandlers — Message sending, history, deletion, pinning, search
 * 10/10 Edition: HTTP fallback + temp_id, retry, read receipt dedup, timer cleanup
 */
import { useCallback, useRef, useEffect } from 'react';
import { encryptMessage } from '../utils/encryption';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';
import { getTemporaryId } from '../config/api';
import { offlineQueue } from '../utils/offlineMessageQueue';

// 🚀 Debounced sessionStorage persist — keeps last 8 channels cached across page refreshes
let _persistTimer = null;
function persistHistoryCache(cacheRef) {
    clearTimeout(_persistTimer);
    _persistTimer = setTimeout(() => {
        try {
            const cache = cacheRef.current;
            const keys = Object.keys(cache);
            // 🔧 FIX: Increased from 8×35 to 12×50 for better cache coverage
            const recentKeys = keys.slice(-12);
            const trimmed = {};
            for (const k of recentKeys) {
                const entry = cache[k];
                if (entry?.messages?.length > 0) {
                    trimmed[k] = {
                        messages: entry.messages.slice(-50),
                        hasMore: entry.hasMore,
                        nextCursor: entry.nextCursor,
                    };
                }
            }
            sessionStorage.setItem('pawscord_msg_cache', JSON.stringify(trimmed));
        } catch (e) { /* sessionStorage full or unavailable, silent fail */ }
    }, 2000);
}

export default function useMessageHandlers({
    activeChat, username, token, ws,
    encryptionKeys, setMessages, scrollToBottom, isNearBottom,
    setEditingMessage, setHasDraftMessage, setDraftText, persistDraft,
    setStickyMessage, richTextRef, fetchWithAuth,
    currentUserProfile, getDeterministicAvatar,
    historyCacheRef, setHasMoreMessages,
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
            // 🚀 PERF: Keep wait very short — avoid perceivable send lag on flaky sockets
            const maxWait = 250;
            const checkInterval = 50;
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
                    ? { conversation_id: activeChat.id, content: finalContent, temp_id: payload.temp_id }
                    : { room: activeChat.id, content: finalContent, temp_id: payload.temp_id };
                const response = await fetchWithAuth(endpoint, { method: 'POST', body: JSON.stringify(httpPayload) });
                return response.ok;
            } catch (error) { return false; }
        };

        // Send with retry (WS first, then HTTP with 1 retry, then offline queue)
        (async () => {
            const wsSent = await sendViaWebSocket();
            if (!wsSent) {
                const httpOk = await sendViaHTTP();
                if (!httpOk) {
                    // 🚀 PERF: Reduced retry delay from 2s to 500ms
                    await new Promise(r => setTimeout(r, 500));
                    const retryOk = await sendViaHTTP();
                    if (!retryOk) {
                        // Queue for later delivery when connection restores
                        if (offlineQueue.enqueue(payload)) {
                            toast.info('Mesaj çevrimdışı kuyruğa alındı. Bağlantı kurulunca gönderilecek.');
                        } else {
                            toast.error('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
                        }
                    }
                }
            }
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
            if (historyCacheRef.current[cacheKey]) {
                historyCacheRef.current[cacheKey].messages = updatedMessages;
                historyCacheRef.current[cacheKey]._ts = Date.now(); // keep cache fresh after send
            }
            return updatedMessages;
        });

        richTextRef.current?.clear?.();
        scrollToBottom('smooth');
    }, [activeChat, username, encryptionKeys, ws, fetchWithAuth, currentUserProfile, getDeterministicAvatar, persistDraft]);

    // --- 💬 SEND SNIPPET (🔧 FIX: Added WS check + HTTP fallback) ---
    const handleSendSnippet = useCallback(async (data) => {
        const payload = {
            type: activeChat.type === 'room' ? 'chat_message' : 'dm_message',
            message: "", username, temp_id: getTemporaryId(), snippet_data: data,
            ...(activeChat.type === 'room' ? { room: activeChat.id } : { conversation: activeChat.id })
        };

        let sent = false;
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            try { ws.current.send(JSON.stringify(payload)); sent = true; } catch { /* fallback */ }
        }
        if (!sent) {
            // HTTP fallback when WS is not available
            try {
                const endpoint = activeChat.type === 'dm'
                    ? `${API_BASE_URL}/messages/send_dm/`
                    : `${API_BASE_URL}/messages/send/`;
                const httpPayload = activeChat.type === 'dm'
                    ? { conversation_id: activeChat.id, content: '', temp_id: payload.temp_id, snippet_data: data }
                    : { room: activeChat.id, content: '', temp_id: payload.temp_id, snippet_data: data };
                await fetchWithAuth(endpoint, { method: 'POST', body: JSON.stringify(httpPayload) });
            } catch (e) { toast.error('Snippet gönderilemedi'); }
        }

        setMessages(prev => [...prev, {
            ...payload, timestamp: new Date().toISOString(), id: payload.temp_id,
            avatar: currentUserProfile?.avatar || getDeterministicAvatar(username)
        }]);
        closeModal('snippetModal');
    }, [activeChat, username, ws, currentUserProfile, getDeterministicAvatar, fetchWithAuth, API_BASE_URL]);

    // --- 📋 FETCH MESSAGE HISTORY ---
    // 🚀 Cursor-based pagination — no offset needed, uses next cursor URL
    const nextCursorRef = useRef(null);

    const fetchMessageHistory = useCallback(async (isInitial = true, silent = false) => {
        if (!activeChat.id) return;
        if (activeChat.type === 'voice') { setMessages([]); setHasMoreMessages(false); return; }

        const urlBase = activeChat.type === 'room' ? MESSAGE_HISTORY_ROOM_URL : MESSAGE_HISTORY_DM_URL;
        const key = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;

        // 🚀 PERF: Show cached messages instantly, then refresh in background
        if (isInitial) {
            const cached = historyCacheRef.current[key];
            if (cached && cached.messages && cached.messages.length > 0) {
                setMessages(cached.messages);
                setHasMoreMessages(cached.hasMore !== false);
                nextCursorRef.current = cached.nextCursor || null;
                // Background refresh — don't show loading spinner
                silent = true;
            }
        }

        if (isInitial && !silent) setMessageHistoryLoading(true);

        try {
            // Initial: fresh URL. Pagination: use the cursor URL from previous response
            const url = isInitial
                ? `${urlBase}${activeChat.id}/?limit=35`
                : nextCursorRef.current;

            if (!url) { setHasMoreMessages(false); return; }

            const res = await fetchWithAuth(url);
            if (res.ok) {
                const data = await res.json();
                const rawMessages = data.results || [];
                const validMessages = rawMessages.filter(msg => msg && typeof msg === 'object' && (msg.id || msg.temp_id));
                const newMsgs = validMessages.reverse(); // API returns newest-first

                // Store next cursor URL for pagination
                nextCursorRef.current = data.next || null;
                const hasMore = !!data.next;
                setHasMoreMessages(hasMore);

                let combinedMessages = newMsgs;
                if (isInitial) {
                    setMessages(newMsgs);
                    setTimeout(() => scrollToBottom('auto'), 60);
                } else {
                    // Prepend older messages, deduplicate by id
                    setMessages(prev => {
                        const existingIds = new Set(prev.map(m => m.id));
                        const uniqueNew = newMsgs.filter(m => !existingIds.has(m.id));
                        combinedMessages = [...uniqueNew, ...prev];
                        return combinedMessages;
                    });
                }

                // Update cache
                historyCacheRef.current[key] = {
                    messages: combinedMessages,
                    nextCursor: data.next,
                    hasMore,
                    _ts: Date.now(), // freshness timestamp for cache-skip optimization
                };
                persistHistoryCache(historyCacheRef);
            }
        } catch (e) { console.error('❌ [fetchMessageHistory] Error:', e); }
        if (isInitial && !silent) setMessageHistoryLoading(false);
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
                    // Add the pinned message to pinnedMessages panel
                    setPinnedMessages(prev => {
                        if (prev.find(p => p.id === messageId)) return prev;
                        // Find the message from current messages state
                        const pinnedMsg = data.message || { id: messageId, is_pinned: true };
                        return [...prev, pinnedMsg];
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
            if (!debouncedSearchQuery.trim()) fetchMessageHistory(true);
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

    // --- READ RECEIPTS (batched, with dedup + cleanup-safe timer) ---
    const handleMessageVisible = useCallback((messageId) => {
        if (!messageId) return;
        // Dedup: skip if already in buffer
        if (readReceiptBufferRef.current.includes(messageId)) return;
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

    // --- � PREFETCH MESSAGES (hover üzerinde ön belleğe al) ---
    const prefetchInflightRef = useRef(new Set());
    const prefetchMessages = useCallback(async (type, id) => {
        if (!id) return;
        const key = type === 'room' ? `room-${id}` : `dm-${id}`;
        // Zaten cache'de varsa veya uçuşta ise atla
        if (historyCacheRef.current[key]?.messages?.length > 0) return;
        if (prefetchInflightRef.current.has(key)) return;
        prefetchInflightRef.current.add(key);

        try {
            const urlBase = type === 'room' ? MESSAGE_HISTORY_ROOM_URL : MESSAGE_HISTORY_DM_URL;
            const res = await fetchWithAuth(`${urlBase}${id}/?limit=30`);
            if (res.ok) {
                const data = await res.json();
                const rawMessages = data.results || [];
                const validMessages = rawMessages.filter(msg => msg && typeof msg === 'object' && (msg.id || msg.temp_id));
                historyCacheRef.current[key] = {
                    messages: validMessages.reverse(),
                    nextCursor: data.next || null,
                    hasMore: !!data.next
                };
                persistHistoryCache(historyCacheRef);
            }
        } catch (e) { /* prefetch hatası sessizce yutulur */ }
        finally { prefetchInflightRef.current.delete(key); }
    }, [fetchWithAuth, MESSAGE_HISTORY_ROOM_URL, MESSAGE_HISTORY_DM_URL]);

    // --- � PREFETCH ALL CHANNELS IN A SERVER (triggered on server click) ---
    const prefetchServerChannels = useCallback((channels) => {
        if (!channels || channels.length === 0) return;
        // Only prefetch text channels, skip voice. Limit to 6 to avoid flooding.
        const textChannels = channels.filter(ch => ch.room_type !== 'voice').slice(0, 6);
        // Stagger requests to avoid network congestion: 0ms, 100ms, 200ms...
        textChannels.forEach((ch, i) => {
            setTimeout(() => prefetchMessages('room', ch.slug), i * 100);
        });
    }, [prefetchMessages]);

    // --- SCROLL TO MESSAGE ---
    const scrollToMessage = useCallback((msgId) => {
        const el = document.getElementById(`message-${msgId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, []);

    // --- CLEANUP: Flush pending read receipts on unmount ---
    // 🔧 FIX: Use navigator.sendBeacon for unmount flush — doesn't depend on component lifecycle
    // and works even when the page is being unloaded (unlike fetch which may be cancelled)
    useEffect(() => {
        return () => {
            if (readReceiptTimerRef.current) {
                clearTimeout(readReceiptTimerRef.current);
                readReceiptTimerRef.current = null;
            }
            const remaining = [...new Set(readReceiptBufferRef.current)];
            readReceiptBufferRef.current = [];
            if (remaining.length > 0) {
                // sendBeacon is fire-and-forget, survives page unload, and doesn't
                // trigger state updates on unmounted components
                try {
                    const url = `${API_BASE_URL}/messages/mark_read/`;
                    const blob = new Blob(
                        [JSON.stringify({ message_ids: remaining })],
                        { type: 'application/json' }
                    );
                    if (navigator.sendBeacon) {
                        navigator.sendBeacon(url, blob);
                    } else {
                        // Fallback for older browsers — fire and forget
                        fetchWithAuth(url, {
                            method: 'POST', headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ message_ids: remaining })
                        }).catch(() => { });
                    }
                } catch { /* best effort */ }
            }
        };
    }, [fetchWithAuth, API_BASE_URL]);

    return {
        sendMessage,
        handleSendSnippet,
        fetchMessageHistory,
        prefetchMessages,
        prefetchServerChannels,
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
