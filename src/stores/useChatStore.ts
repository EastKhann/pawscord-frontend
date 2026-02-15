// frontend/src/stores/useChatStore.ts

import { create } from 'zustand';
import type { ChatStore } from '../types/store';

// Basit bir ID üretici (App.js'den alındı)
const getTemporaryId = () => (Date.now() + Math.floor(Math.random() * 1000)).toString();

export const useChatStore = create<ChatStore>((set, get) => ({
    // --- STATE (Veriler) ---
    messages: [],
    encryptionKeys: {},
    activeChat: { type: 'welcome', id: 'welcome', targetUser: null },
    unreadCounts: {},
    typingUsers: [],
    onlineUsers: [],
    voiceUsers: {}, // Sesli odalardaki kullanıcılar
    currentPermissions: {
        is_owner: false,
        can_manage_channels: false,
        can_delete_messages: false,
        can_manage_roles: false,
        can_ban_members: false
    },

    // --- ACTIONS (Fonksiyonlar) ---

    // Sohbet Değiştirme
    // 🔥 FIX: Hem positional (type, id, targetUser) hem object ({type, id, slug}) formatını destekle
    setActiveChat: (typeOrObj, id, targetUser = null) => {
        let type, chatId, chatTargetUser;

        if (typeOrObj && typeof typeOrObj === 'object') {
            // Object format: setActiveChat({ type: 'room', slug: 'xyz' }) veya { type: 'dm', id: 5 }
            type = typeOrObj.type;
            chatId = typeOrObj.id || typeOrObj.slug;
            chatTargetUser = typeOrObj.targetUser || null;
        } else {
            // Positional format: setActiveChat('dm', 5, 'username')
            type = typeOrObj;
            chatId = id;
            chatTargetUser = targetUser;
        }


        // ✅ FIX: messages'ı burada temizleme!
        // Mesajlar fetchMessageHistory veya cache'den yüklenecek
        set({ activeChat: { type, id: chatId, targetUser: chatTargetUser } });

        // Okundu bilgisini sıfırla
        const key = type === 'room' ? `room-${chatId}` : `dm-${chatId}`;
        set((state) => {
            const newCounts = { ...state.unreadCounts };
            delete newCounts[key];
            return { unreadCounts: newCounts };
        });
    },

    // Mesaj Ekleme (Gelen veya Gönderilen)
    // 🛡️ GUARD: Geçersiz mesajı ekleme
    addMessage: (message) => set((state) => {
        // Bozuk mesaj kontrolü
        if (!message || typeof message !== 'object' || !message.id) {
            console.warn('⚠️ [Store] Invalid message rejected:', message);
            return state;
        }

        // Eğer mesaj zaten varsa (temp_id ile kontrol) güncelle
        if (message.temp_id) {
            const exists = state.messages.some(m => m.temp_id === message.temp_id);
            if (exists) {
                return {
                    messages: state.messages.map(m => m.temp_id === message.temp_id ? message : m)
                };
            }
        }
        // ID kontrolü (Çift mesajı önle)
        if (state.messages.some(m => m.id === message.id)) return state;

        return { messages: [...state.messages, message] };
    }),

    // Mesaj Güncelleme (Poll update vb. için)
    updateMessage: (id, updates) => set((state) => ({
        messages: state.messages.map(m => m.id === id ? { ...m, ...updates } : m)
    })),

    // Mesajları Toplu Yükleme (Geçmişi çekerken)
    // 🛡️ GUARD: Bozuk mesajları filtrele
    setMessages: (newMessages) => set((state) => {
        const resolved = typeof newMessages === 'function' ? newMessages(state.messages) : newMessages;
        // Geçersiz mesajları filtrele
        const validMessages = Array.isArray(resolved)
            ? resolved.filter(m => m && typeof m === 'object' && m.id)
            : [];
        return { messages: validMessages };
    }),

    // Geçmiş Mesajları Başa Ekleme (Scroll yukarı yapınca)
    prependMessages: (oldMessages) => set((state) => ({
        messages: [...oldMessages, ...state.messages]
    })),

    // Okunmamış Mesaj Sayısını Artır
    incrementUnread: (key) => set((state) => ({
        unreadCounts: {
            ...state.unreadCounts,
            [key]: (state.unreadCounts[key] || 0) + 1
        }
    })),

    // Online Kullanıcıları Güncelle
    setOnlineUsers: (users) => set({ onlineUsers: users }),

    // Yazıyor... animasyonu
    setTypingUser: (username, isTyping) => set((state) => {
        if (isTyping) {
            return { typingUsers: state.typingUsers.includes(username) ? state.typingUsers : [...state.typingUsers, username] };
        } else {
            return { typingUsers: state.typingUsers.filter(u => u !== username) };
        }
    }),

    // Sesli Sohbet Kullanıcıları
    setVoiceUsers: (usersMap) => set({ voiceUsers: usersMap }),
    setVoiceUsersState: (usersMap) => set({ voiceUsers: usersMap }), // Alias used by App.js

    // Selection mode
    selectedMessages: new Set(),
    setSelectedMessages: (val) => set({ selectedMessages: typeof val === 'function' ? val(get().selectedMessages) : val }),

    setEncryptionKey: (chatId, key) => set((state) => ({
        encryptionKeys: {
            ...state.encryptionKeys,
            [chatId]: key
        }
    })),
    setPermissions: (perms) => set({
        currentPermissions: perms || {
            is_owner: false,
            can_manage_channels: false,
            can_delete_messages: false,
            can_manage_roles: false,
            can_ban_members: false
        }
    }),
}));

